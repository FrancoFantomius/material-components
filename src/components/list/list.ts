import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import { listStyles, listItemStyles } from './list.css.js';

@customElement('md-list-item')
export class MdListItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, listItemStyles];

  @property({ type: String })
  headline = '';

  @property({ type: String, attribute: 'supporting-text' })
  supportingText = '';

  @property({ type: String, attribute: 'trailing-supporting-text' })
  trailingSupportingText = '';

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
      this.emitEvent('item-click');
    }
  };

  override render() {
    const inner = html`
      ${this.interactive ? html`<md-ripple ?disabled=${this.disabled}></md-ripple><md-focus-ring></md-focus-ring>` : nothing}

      <div class="start">
        <slot name="start"></slot>
      </div>

      <div class="content">
        <slot>
          ${this.headline ? html`<span class="headline">${this.headline}</span>` : nothing}
          ${this.supportingText ? html`<span class="supporting-text">${this.supportingText}</span>` : nothing}
        </slot>
      </div>

      <div class="end">
        <slot name="end">
          ${this.trailingSupportingText ? html`<span>${this.trailingSupportingText}</span>` : nothing}
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
        >
          ${inner}
        </a>
      `;
    }

    return html`
      <div
        class="item"
        tabindex=${this.interactive && !this.disabled ? '0' : nothing}
        @click=${this.handleClick}
      >
        ${inner}
      </div>
    `;
  }
}

@customElement('md-list')
export class MdList extends MdBaseElement {
  static override styles = [MdBaseElement.styles, listStyles];

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'list');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-list': MdList;
    'md-list-item': MdListItem;
  }
}

