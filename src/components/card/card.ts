import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import { cardStyles } from './card.css.js';

export type CardVariant = 'elevated' | 'filled' | 'outlined';

@customElement('md-card')
export class MdCard extends MdBaseElement {
  static override styles = [MdBaseElement.styles, cardStyles];

  @property({ type: String, reflect: true })
  variant: CardVariant = 'elevated';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.interactive) {
      this.emitEvent('card-click');
    }
  };

  override render() {
    const innerContent = html`
      ${this.interactive ? html`<md-ripple ?disabled=${this.disabled}></md-ripple><md-focus-ring></md-focus-ring>` : nothing}
      <slot name="media"></slot>
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="body">
        <slot></slot>
      </div>
      <div class="actions">
        <slot name="actions"></slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="card-container"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : (this.interactive ? '0' : nothing)}
          @click=${this.handleClick}
        >
          ${innerContent}
        </a>
      `;
    }

    return html`
      <div
        class="card-container"
        tabindex=${this.interactive && !this.disabled ? '0' : nothing}
        @click=${this.handleClick}
      >
        ${innerContent}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-card': MdCard;
  }
}

