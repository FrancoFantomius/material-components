import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { dividerStyles } from './divider.css.js';

@customElement('md-divider')
export class MdDivider extends MdBaseElement {
  static override styles = [MdBaseElement.styles, dividerStyles];

  @property({ type: Boolean, reflect: true })
  vertical = false;

  @property({ type: Boolean, reflect: true })
  inset = false;

  @property({ type: Boolean, reflect: true, attribute: 'inset-start' })
  insetStart = false;

  @property({ type: Boolean, reflect: true, attribute: 'inset-end' })
  insetEnd = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'separator');
    this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
  }

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-divider': MdDivider;
  }
}

