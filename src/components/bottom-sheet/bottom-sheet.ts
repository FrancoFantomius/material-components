import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import { bottomSheetStyles } from './bottom-sheet.css.js';

export type BottomSheetType = 'standard' | 'modal';

/**
 * Material Design 3 Bottom Sheet component.
 *
 * Bottom sheets display supplementary content anchored to the bottom of the screen,
 * supporting standard (in-flow / docked panel) and modal (overlay with scrim) modes,
 * drag handle gestures, touch swipe-to-dismiss, and customizable headers and footers.
 *
 * @slot - Default slot for main sheet body content.
 * @slot drag-handle - Custom drag handle element.
 * @slot header - Full header area replacement.
 * @slot headline - Custom title / headline content.
 * @slot subhead - Custom subtitle / subhead content.
 * @slot header-actions - Additional actions next to the close button in the header.
 * @slot close-button - Custom close button element.
 * @slot footer - Bottom actions / footer area.
 * @slot actions - Action buttons container inside the default footer.
 */
@customElement('md-bottom-sheet')
export class MdBottomSheet extends MdBaseElement {
  static override styles = [MdBaseElement.styles, bottomSheetStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  type: BottomSheetType = 'standard';

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: String })
  headline = '';

  @property({ type: String })
  subhead = '';

  @property({ type: Boolean, reflect: true, attribute: 'hide-drag-handle' })
  hideDragHandle = false;

  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton = false;

  @property({ type: Boolean, reflect: true })
  divider = false;

  @property({ type: Boolean, reflect: true })
  fullscreen = false;

  @query('.sheet')
  private sheetElement?: HTMLElement;

  @state()
  private isDragging = false;

  private dragStartY = 0;
  private currentDragY = 0;
  private activePointerId: number | null = null;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    this.cleanupDragListeners();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
      } else {
        this.emitEvent('close');
      }
    }
  }

  /**
   * Returns whether the bottom sheet is currently functioning in modal mode.
   */
  isModalMode(): boolean {
    return this.modal || this.type === 'modal';
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open && this.isModalMode()) {
      this.close();
      this.emitEvent('cancel');
    }
  };

  private handleScrimClick = () => {
    this.close();
    this.emitEvent('scrim-click');
  };

  private handleCloseClick = () => {
    this.close();
    this.emitEvent('close-click');
  };

  private handleDragPointerDown = (event: PointerEvent) => {
    if (event.button !== 0) return; // Only main button
    const target = event.target as HTMLElement;
    if (target.closest('button, md-icon-button, md-button, a, input, [role="button"]')) {
      return;
    }

    this.isDragging = true;
    this.dragStartY = event.clientY;
    this.currentDragY = 0;
    this.activePointerId = event.pointerId;

    if (this.sheetElement) {
      this.sheetElement.classList.add('is-dragging');
    }

    window.addEventListener('pointermove', this.handlePointerMove);
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);

    this.emitEvent('drag-start', { startY: this.dragStartY });
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.isDragging) return;

    const deltaY = event.clientY - this.dragStartY;
    // Allow dragging downwards; apply resistance if dragged upwards
    this.currentDragY = deltaY > 0 ? deltaY : deltaY * 0.15;

    if (this.sheetElement) {
      const translateY = Math.max(0, this.currentDragY);
      this.sheetElement.style.transform = `translateY(${translateY}px)`;
    }

    this.emitEvent('drag', { deltaY: this.currentDragY });
  };

  private handlePointerUp = (_event?: PointerEvent) => {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.cleanupDragListeners();

    if (this.sheetElement) {
      this.sheetElement.classList.remove('is-dragging');
      this.sheetElement.style.transform = '';
    }

    const sheetHeight = this.sheetElement?.offsetHeight || 300;
    const threshold = Math.min(100, sheetHeight * 0.25);

    if (this.currentDragY > threshold) {
      this.close();
      this.emitEvent('drag-dismiss');
    }

    this.emitEvent('drag-end', { deltaY: this.currentDragY });
    this.currentDragY = 0;
    this.activePointerId = null;
  };

  private cleanupDragListeners() {
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }

  /**
   * Opens the bottom sheet.
   */
  show() {
    this.open = true;
  }

  /**
   * Closes the bottom sheet.
   */
  close() {
    this.open = false;
  }

  /**
   * Toggles the open/closed state of the bottom sheet.
   */
  toggle() {
    this.open = !this.open;
  }

  override render() {
    const isModal = this.isModalMode();

    const dragHandleContent = !this.hideDragHandle
      ? html`
          <div
            class="drag-handle-container"
            @pointerdown=${this.handleDragPointerDown}
            aria-hidden="true"
          >
            <slot name="drag-handle">
              <div class="drag-handle"></div>
            </slot>
          </div>
        `
      : nothing;

    const headlineContent = this.headline
      ? html`<h2 class="headline">${this.headline}</h2>`
      : nothing;

    const subheadContent = this.subhead
      ? html`<p class="subhead">${this.subhead}</p>`
      : nothing;

    const closeBtnContent = !this.hideCloseButton
      ? html`
          <slot name="close-button">
            <md-icon-button
              class="close-button"
              icon="close"
              aria-label="Close bottom sheet"
              @click=${this.handleCloseClick}
            ></md-icon-button>
          </slot>
        `
      : nothing;

    return html`
      <div class="scrim" @click=${this.handleScrimClick}></div>

      <aside
        class="sheet"
        role=${isModal ? 'dialog' : 'region'}
        aria-modal=${isModal ? 'true' : nothing}
        aria-hidden=${this.open ? 'false' : 'true'}
        aria-label=${this.headline || 'Bottom sheet'}
      >
        ${dragHandleContent}

        <slot name="header">
          <div class="header" @pointerdown=${this.handleDragPointerDown}>
            <div class="header-content">
              <slot name="headline">
                ${headlineContent}
              </slot>
              <slot name="subhead">
                ${subheadContent}
              </slot>
            </div>

            <div class="header-actions">
              <slot name="header-actions"></slot>
              ${closeBtnContent}
            </div>
          </div>
        </slot>

        ${this.divider ? html`<div class="divider"></div>` : nothing}

        <div class="content">
          <slot></slot>
        </div>

        <slot name="footer">
          <div class="footer">
            <slot name="actions"></slot>
          </div>
        </slot>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-bottom-sheet': MdBottomSheet;
  }
}
