import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { splitButtonStyles } from './split-button.css.js';
import { MdMenuItem } from '../menu/menu-item.js';

export type SplitButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined';
export type SplitButtonMenuPlacement = 'bottom-end' | 'bottom-start' | 'top-end' | 'top-start';

/**
 * Material Design 3 Split Button component.
 * Pairs a primary action button with a connected trailing dropdown button that opens a submenu of related secondary actions.
 *
 * @element md-split-button
 *
 * @slot - Default slot for `md-menu-item` submenu choices.
 * @slot menu - Slotted submenu items or custom menu container.
 * @slot label - Primary action button text label.
 * @slot icon - Leading icon for the primary action button.
 * @slot trailing-icon - Dropdown indicator icon for the menu button.
 *
 * @fires action - Dispatched when the leading primary action button is clicked.
 * @fires trailing-click - Dispatched when the trailing menu button is clicked.
 * @fires toggle - Dispatched when the trailing menu trigger is toggled with the new open state.
 * @fires open - Dispatched when the submenu opens.
 * @fires close - Dispatched when the submenu closes.
 * @fires select - Dispatched when a submenu item is selected.
 */
@customElement('md-split-button')
export class MdSplitButton extends MdBaseElement {
  static override styles = [MdBaseElement.styles, splitButtonStyles];

  @property({ type: String, reflect: true })
  variant: SplitButtonVariant = 'filled';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  label = '';

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = 'arrow_drop_down';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String, attribute: 'action-aria-label' })
  actionAriaLabel = '';

  @property({ type: String, attribute: 'menu-aria-label' })
  menuAriaLabel = 'More options';

  @property({ type: String, attribute: 'menu-placement', reflect: true })
  menuPlacement: SplitButtonMenuPlacement = 'bottom-end';

  @property({ type: Boolean, attribute: 'stay-open-on-focusout' })
  stayOpenOnFocusout = false;

  @property({ type: Boolean, attribute: 'close-on-item-click' })
  closeOnItemClick = true;

  @query('.action-button')
  actionButton!: HTMLButtonElement;

  @query('.menu-button')
  menuButton!: HTMLButtonElement;

  @query('.menu-surface')
  private menuSurfaceElement?: HTMLElement;

  @queryAssignedElements({ slot: 'icon' })
  private assignedIcons!: HTMLElement[];

  private handleSlotChange(): void {
    const hasLeading = Boolean(this.icon || (this.assignedIcons && this.assignedIcons.length > 0));
    this.toggleAttribute('has-icon', hasLeading);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleWindowKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    this.addEventListener('item-click', this.handleItemSelection as EventListener);
    this.addEventListener('menu-item-click', this.handleItemSelection as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    this.removeEventListener('item-click', this.handleItemSelection as EventListener);
    this.removeEventListener('menu-item-click', this.handleItemSelection as EventListener);
  }

  override firstUpdated() {
    this.handleSlotChange();
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
        setTimeout(() => {
          this.focusFirstItem();
        }, 16);
      } else {
        this.emitEvent('close');
      }
    }
  }

  private handleDocumentClick = (event: MouseEvent | PointerEvent): void => {
    if (!this.open) return;
    const path = event.composedPath();
    if (path.includes(this)) return;
    this.close();
  };

  private handleWindowKeyDown = (event: KeyboardEvent): void => {
    if (!this.open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.menuButton?.focus();
    }
  };

  private handleSurfaceKeyDown = (event: KeyboardEvent): void => {
    const items = this.getItems(true);
    if (items.length === 0) return;

    let activeEl: Element | null = null;
    try {
      activeEl = document.activeElement;
    } catch {
      activeEl = null;
    }

    const currentIndex = items.findIndex(
      (item) => item === activeEl || item.contains(activeEl)
    );

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = currentIndex >= 0 && currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        event.preventDefault();
        items[0]?.focus();
        break;
      }
      case 'End': {
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      }
      case 'Tab': {
        if (!this.stayOpenOnFocusout) {
          this.close();
        }
        break;
      }
    }
  };

  private handleItemSelection = (event: CustomEvent): void => {
    const detail = event.detail;
    this.emitEvent('select', detail);

    if (!detail?.keepOpen && this.closeOnItemClick) {
      this.close();
      this.menuButton?.focus();
    }
  };

  private handleActionClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.type === 'submit' || this.type === 'reset') {
      const form = this.closest('form');
      if (form) {
        if (this.type === 'submit') {
          form.requestSubmit();
        } else {
          form.reset();
        }
      }
    }

    this.emitEvent('action', {
      target: this,
      open: this.open,
    });
  };

  private handleMenuClick = (event: MouseEvent): void => {
    event.stopPropagation();
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.open = !this.open;

    this.emitEvent('trailing-click', {
      target: this,
      open: this.open,
    });

    this.emitEvent('toggle', {
      target: this,
      open: this.open,
    });
  };

  private handleBackdropClick = (event: MouseEvent): void => {
    event.stopPropagation();
    this.close();
  };

  /**
   * Opens the submenu.
   */
  show(): void {
    if (!this.open) {
      this.open = true;
    }
  }

  /**
   * Closes the submenu.
   */
  close(): void {
    if (this.open) {
      this.open = false;
    }
  }

  /**
   * Toggles the submenu open/closed state.
   */
  toggle(): void {
    this.open = !this.open;
  }

  /**
   * Returns all menu items inside the split button submenu.
   * @param onlyEnabled - If true, filters out disabled items.
   */
  getItems(onlyEnabled = false): HTMLElement[] {
    const items = Array.from(
      this.querySelectorAll('md-menu-item, [role="menuitem"], button.menu-item')
    ) as HTMLElement[];

    if (onlyEnabled) {
      return items.filter((item) => {
        const isDisabled = item.hasAttribute('disabled') || (item as any).disabled;
        return !isDisabled;
      });
    }
    return items;
  }

  /**
   * Focuses the first non-disabled menu item.
   */
  focusFirstItem(): void {
    const items = this.getItems(true);
    if (items.length > 0) {
      items[0]!.focus();
    } else if (this.menuSurfaceElement) {
      this.menuSurfaceElement.focus();
    }
  }

  /**
   * Focuses the last non-disabled menu item.
   */
  focusLastItem(): void {
    const items = this.getItems(true);
    if (items.length > 0) {
      items[items.length - 1]!.focus();
    }
  }

  /**
   * Focuses the menu item at the specified index.
   */
  focusItemAtIndex(index: number): void {
    const items = this.getItems(true);
    if (index >= 0 && index < items.length) {
      items[index]!.focus();
    }
  }

  override render() {
    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}></div>

      <div class="container" role="group">
        <button
          type=${this.type}
          class="action-button"
          ?disabled=${this.disabled}
          aria-label=${this.actionAriaLabel || nothing}
          @click=${this.handleActionClick}
        >
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <span class="content">
            <slot name="icon" @slotchange=${this.handleSlotChange}>
              ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
            </slot>
            <slot name="label">${this.label}</slot>
          </span>
        </button>

        <button
          type="button"
          class="menu-button"
          ?disabled=${this.disabled}
          aria-haspopup="menu"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-label=${this.menuAriaLabel}
          @click=${this.handleMenuClick}
        >
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <span class="icon-wrapper">
            <slot name="trailing-icon">
              <md-icon name=${this.trailingIcon || 'arrow_drop_down'}></md-icon>
            </slot>
          </span>
        </button>

        <!-- Submenu Surface -->
        <div
          class="menu-surface"
          role="menu"
          tabindex="-1"
          aria-label=${this.menuAriaLabel}
          aria-hidden=${this.open ? 'false' : 'true'}
          @keydown=${this.handleSurfaceKeyDown}
        >
          <slot name="menu"></slot>
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-split-button': MdSplitButton;
  }
}
