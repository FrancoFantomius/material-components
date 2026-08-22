import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import { sideSheetStyles } from './side-sheet.css.js';

export type SideSheetType = 'standard' | 'modal';
export type SideSheetPlacement = 'start' | 'end' | 'left' | 'right';

/**
 * Material Design 3 Side Sheet component.
 *
 * Side sheets display secondary content anchored to the side of the screen,
 * supporting standard (in-flow side panel) and modal (overlay with scrim) modes.
 *
 * @slot - Default slot for main sheet body content.
 * @slot header - Full header area replacement.
 * @slot headline - Custom title / headline content.
 * @slot subhead - Custom subtitle / subhead content.
 * @slot header-actions - Additional actions next to the close button in the header.
 * @slot close-button - Custom close button element.
 * @slot footer - Bottom actions / footer area.
 */
@customElement('md-side-sheet')
export class MdSideSheet extends MdBaseElement {
  static override styles = [MdBaseElement.styles, sideSheetStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  type: SideSheetType = 'standard';

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: String, reflect: true })
  side: SideSheetPlacement = 'end';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  subhead = '';

  @property({ type: Boolean, reflect: true, attribute: 'hide-close-button' })
  hideCloseButton = false;

  @property({ type: Boolean, reflect: true })
  divider = false;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
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
   * Returns whether the side sheet is currently functioning in modal mode.
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

  /**
   * Opens the side sheet.
   */
  show() {
    this.open = true;
  }

  /**
   * Closes the side sheet.
   */
  close() {
    this.open = false;
  }

  /**
   * Toggles the open/closed state of the side sheet.
   */
  toggle() {
    this.open = !this.open;
  }

  override render() {
    const isModal = this.isModalMode();

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
              aria-label="Close side sheet"
              @click=${this.handleCloseClick}
            ></md-icon-button>
          </slot>
        `
      : nothing;

    return html`
      <div class="scrim" @click=${this.handleScrimClick}></div>

      <aside
        class="sheet"
        role=${isModal ? 'dialog' : 'complementary'}
        aria-modal=${isModal ? 'true' : nothing}
        aria-hidden=${this.open ? 'false' : 'true'}
        aria-label=${this.headline || 'Side sheet'}
      >
        <slot name="header">
          <div class="header">
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
    'md-side-sheet': MdSideSheet;
  }
}
