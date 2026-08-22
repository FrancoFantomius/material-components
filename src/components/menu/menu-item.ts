import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { menuItemStyles } from './menu.css.js';

/**
 * Material Design 3 Menu Item component.
 * Represents an individual choice or action inside an `md-menu`.
 *
 * @element md-menu-item
 *
 * @slot start / icon - Leading icon or custom graphic.
 * @slot - Default slot for item headline / label text.
 * @slot end / trailing - Trailing content, shortcut text, or checkmark.
 *
 * @fires item-click - Dispatched when the menu item is clicked or activated.
 * @fires select - Dispatched when the menu item is selected.
 */
@customElement('md-menu-item')
export class MdMenuItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, menuItemStyles];

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: String })
  headline = '';

  @property({ type: String, attribute: 'supporting-text' })
  supportingText = '';

  @property({ type: String, attribute: 'trailing-supporting-text' })
  trailingSupportingText = '';

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean, attribute: 'keep-open' })
  keepOpen = false;

  @property({ type: Boolean, reflect: true })
  dense = false;

  @query('.item')
  private itemElement!: HTMLElement;

  override connectedCallback(): void {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menuitem');
    }
  }

  override focus(options?: FocusOptions): void {
    if (this.itemElement) {
      this.itemElement.focus(options);
    } else {
      super.focus(options);
    }
  }

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const detail = {
      item: this,
      value: this.value,
      keepOpen: this.keepOpen,
    };

    this.emitEvent('item-click', detail);
    this.emitEvent('menu-item-click', detail);
    this.emitEvent('select', detail);
  };

  private handleKeyDown = (event: KeyboardEvent): void => {
    if (this.disabled) return;

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.itemElement?.click();
    }
  };

  override render() {
    const hasLeading = Boolean(this.icon);
    const hasTrailing = Boolean(this.trailingIcon || this.trailingSupportingText || this.selected);

    const leadingContent = this.icon
      ? html`<md-icon name=${this.icon}></md-icon>`
      : nothing;

    const trailingContent = this.selected
      ? html`<md-icon name="check" class="check-icon"></md-icon>`
      : this.trailingIcon
        ? html`<md-icon name=${this.trailingIcon} class="trailing-icon"></md-icon>`
        : nothing;

    const inner = html`
      <md-ripple ?disabled=${this.disabled}></md-ripple>
      <md-focus-ring></md-focus-ring>

      <div class="start">
        <slot name="start">
          <slot name="icon">${leadingContent}</slot>
        </slot>
      </div>

      <div class="content">
        <span class="headline">
          <slot>${this.headline}</slot>
        </span>
        ${this.supportingText ? html`<span class="supporting-text">${this.supportingText}</span>` : nothing}
      </div>

      <div class="end">
        ${this.trailingSupportingText
          ? html`<span class="trailing-supporting-text">${this.trailingSupportingText}</span>`
          : nothing}
        <slot name="end">
          <slot name="trailing">${trailingContent}</slot>
        </slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleClick}
          @keydown=${this.handleKeyDown}
        >
          ${inner}
        </a>
      `;
    }

    return html`
      <button
        type="button"
        class="item"
        ?disabled=${this.disabled}
        aria-disabled=${this.disabled ? 'true' : nothing}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        ${inner}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-menu-item': MdMenuItem;
  }
}
