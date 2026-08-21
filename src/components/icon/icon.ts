import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { iconStyles } from './icon.css.js';

@customElement('md-icon')
export class MdIcon extends MdBaseElement {
  static override styles = [MdBaseElement.styles, iconStyles];

  @property({ type: String })
  name = '';

  @property({ type: Boolean, reflect: true })
  filled = false;

  @property({ type: String })
  size = '';

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('size')) {
      if (this.size) {
        this.style.setProperty('--md-icon-size', isNaN(Number(this.size)) ? this.size : `${this.size}px`);
      } else {
        this.style.removeProperty('--md-icon-size');
      }
    }
  }

  override render() {
    return html`<slot>${this.name}</slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-icon': MdIcon;
  }
}

