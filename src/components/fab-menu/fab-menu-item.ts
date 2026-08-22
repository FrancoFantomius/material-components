import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { fabMenuItemStyles } from './fab-menu.css.js';

export type FabMenuItemSize = 'small' | 'medium';
export type FabMenuItemLabelPlacement = 'start' | 'end' | 'top' | 'bottom';

/**
 * Material Design 3 FAB Menu Item component.
 * Represents a single action item inside an `md-fab-menu` stack.
 *
 * @element md-fab-menu-item
 *
 * @slot - Default slot for item text label.
 * @slot label - Explicit slot for custom label content.
 * @slot icon - Custom icon replacement.
 *
 * @fires action - Dispatched when the item is clicked or activated.
 */
@customElement('md-fab-menu-item')
export class MdFabMenuItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, fabMenuItemStyles];

  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = '';

  @property({ type: String, attribute: 'label-placement', reflect: true })
  labelPlacement: FabMenuItemLabelPlacement = 'start';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String, reflect: true })
  size: FabMenuItemSize = 'small';

  @property({ type: Boolean, reflect: true })
  lowered = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = '';

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.emitEvent('action', {
      item: this,
      value: this.value,
      label: this.label,
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick(event as unknown as MouseEvent);
    }
  };

  override render() {
    const hasLabel = Boolean(this.label);
    const labelMarkup = html`
      <slot name="label">
        ${hasLabel ? html`<span class="label-pill">${this.label}</span>` : html`<slot class="label-pill"></slot>`}
      </slot>
    `;

    return html`
      <div
        class="item-container"
        role="menuitem"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-label=${this.ariaLabelText || this.label || nothing}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        ${labelMarkup}

        <button
          type="button"
          class="mini-fab"
          tabindex="-1"
          ?disabled=${this.disabled}
          aria-hidden="true"
        >
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <span class="icon-wrapper">
            <slot name="icon">
              ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
            </slot>
          </span>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-fab-menu-item': MdFabMenuItem;
  }
}
