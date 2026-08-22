import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { fabMenuStyles } from './fab-menu.css.js';
import { MdFabMenuItem } from './fab-menu-item.js';

export type FabMenuDirection = 'up' | 'down' | 'left' | 'right';
export type FabMenuSize = 'small' | 'medium' | 'large';

/**
 * Material Design 3 Floating Action Button Menu (FAB Menu / Speed Dial) component.
 * Expands a floating action button into a vertical or horizontal stack of related sub-actions with labels.
 *
 * @element md-fab-menu
 *
 * @slot - Default slot for md-fab-menu-item sub-actions.
 * @slot trigger - Custom trigger element replacing the default FAB.
 * @slot icon - Custom icon when closed.
 * @slot open-icon - Custom icon when opened.
 *
 * @fires open - Dispatched when the FAB menu opens.
 * @fires close - Dispatched when the FAB menu closes.
 * @fires toggle - Dispatched when the menu toggles open/close state.
 * @fires scrim-click - Dispatched when the modal scrim backdrop is clicked.
 * @fires action - Dispatched when any child md-fab-menu-item is activated.
 */
@customElement('md-fab-menu')
export class MdFabMenu extends MdBaseElement {
  static override styles = [MdBaseElement.styles, fabMenuStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: String, reflect: true })
  direction: FabMenuDirection = 'up';

  @property({ type: String })
  icon = 'add';

  @property({ type: String, attribute: 'open-icon' })
  openIcon = '';

  @property({ type: String })
  label = '';

  @property({ type: Boolean, reflect: true })
  extended = false;

  @property({ type: String, reflect: true })
  size: FabMenuSize = 'medium';

  @property({ type: Boolean, reflect: true })
  lowered = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, attribute: 'close-on-item-click' })
  closeOnItemClick = true;

  @property({ type: Boolean, attribute: 'close-on-outside-click' })
  closeOnOutsideClick = true;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'Floating action menu';

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    this.addEventListener('action', this.handleItemAction as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    this.removeEventListener('action', this.handleItemAction as EventListener);
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('label')) {
      this.extended = Boolean(this.label);
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
      } else {
        this.emitEvent('close');
      }
      this.emitEvent('toggle', { open: this.open });
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.close();
    }
  };

  private handleDocumentClick = (event: MouseEvent | PointerEvent) => {
    if (!this.open || !this.closeOnOutsideClick) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  };

  private handleScrimClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.emitEvent('scrim-click');
    this.close();
  };

  private handleTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (this.disabled) return;
    this.toggle();
  };

  private handleItemAction = (event: CustomEvent) => {
    // If the event came from a child md-fab-menu-item, close menu if closeOnItemClick is true
    if (this.closeOnItemClick) {
      this.close();
    }
  };

  /**
   * Opens the FAB menu.
   */
  show() {
    if (!this.open) {
      this.open = true;
    }
  }

  /**
   * Opens the FAB menu (alias).
   */
  openMenu() {
    this.show();
  }

  /**
   * Closes the FAB menu.
   */
  close() {
    if (this.open) {
      this.open = false;
    }
  }

  /**
   * Closes the FAB menu (alias).
   */
  closeMenu() {
    this.close();
  }

  /**
   * Toggles the FAB menu open/closed state.
   */
  toggle() {
    this.open = !this.open;
  }

  override render() {
    const hasCustomOpenIcon = Boolean(this.openIcon);
    const activeIcon = this.open && hasCustomOpenIcon ? this.openIcon : this.icon;

    return html`
      ${this.modal
        ? html`<div class="scrim" @click=${this.handleScrimClick}></div>`
        : nothing}

      <div class="container">
        <!-- Sub-FAB Action Items Stack -->
        <div
          class="items"
          role="menu"
          aria-hidden=${this.open ? 'false' : 'true'}
          aria-orientation=${this.direction === 'left' || this.direction === 'right' ? 'horizontal' : 'vertical'}
        >
          <slot></slot>
        </div>

        <!-- Main FAB Trigger -->
        <slot name="trigger" @click=${this.handleTriggerClick}>
          <button
            type="button"
            class="trigger-btn"
            ?disabled=${this.disabled}
            aria-haspopup="menu"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-label=${this.ariaLabelText || this.label || nothing}
            @click=${this.handleTriggerClick}
          >
            <md-ripple ?disabled=${this.disabled}></md-ripple>
            <md-focus-ring></md-focus-ring>
            <span class="trigger-content">
              <span class="trigger-icon ${hasCustomOpenIcon ? '' : 'rotate'}">
                <slot name=${this.open && hasCustomOpenIcon ? 'open-icon' : 'icon'}>
                  ${activeIcon ? html`<md-icon name=${activeIcon}></md-icon>` : nothing}
                </slot>
              </span>
              <slot name="label">
                ${this.label ? html`<span class="trigger-label">${this.label}</span>` : nothing}
              </slot>
            </span>
          </button>
        </slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-fab-menu': MdFabMenu;
  }
}
