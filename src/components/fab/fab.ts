import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { fabStyles } from './fab.css.js';

export type FabSize = 'small' | 'medium' | 'large';

@customElement('md-fab')
export class MdFab extends MdBaseElement {
  static override styles = [MdBaseElement.styles, fabStyles];

  @property({ type: String, reflect: true })
  size: FabSize = 'medium';

  @property({ type: String })
  label = '';

  @property({ type: String })
  icon = '';

  @property({ type: Boolean, reflect: true })
  lowered = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  extended = false;

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      this.extended = Boolean(this.label);
    }
  }

  override render() {
    return html`
      <button ?disabled=${this.disabled}>
        <md-ripple ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring></md-focus-ring>
        <span class="content">
          <slot name="icon">
            ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
          </slot>
          <slot>
            ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
          </slot>
        </span>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-fab': MdFab;
  }
}

