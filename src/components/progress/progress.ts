import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { progressStyles } from './progress.css.js';

export type ProgressType = 'linear' | 'circular';

@customElement('md-progress')
export class MdProgress extends MdBaseElement {
  static override styles = [MdBaseElement.styles, progressStyles];

  @property({ type: String, reflect: true })
  type: ProgressType = 'linear';

  @property({ type: Number })
  value: number | null = null;

  @property({ type: Number })
  max = 1;

  @property({ type: Number })
  buffer = 1;

  @property({ type: Boolean, reflect: true })
  indeterminate = true;

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.indeterminate = this.value === null || this.value === undefined;
      if (!this.indeterminate && this.value !== null) {
        this.setAttribute('aria-valuenow', String(this.value));
      } else {
        this.removeAttribute('aria-valuenow');
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', String(this.max));
  }

  override render() {
    const fraction = this.value !== null ? Math.min(Math.max(this.value / this.max, 0), 1) : 0;
    const bufferFraction = Math.min(Math.max(this.buffer / this.max, 0), 1);

    if (this.type === 'circular') {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - fraction * circumference;

      return html`
        <svg viewBox="0 0 48 48">
          <circle class="circle-track" cx="24" cy="24" r=${radius}></circle>
          <circle
            class="circle-indicator"
            cx="24"
            cy="24"
            r=${radius}
            stroke-dasharray=${this.indeterminate ? nothing : `${circumference}`}
            stroke-dashoffset=${this.indeterminate ? nothing : `${offset}`}
          ></circle>
        </svg>
      `;
    }

    return html`
      ${this.buffer < 1 ? html`<div class="linear-buffer" style="transform: scaleX(${bufferFraction})"></div>` : nothing}
      <div
        class="linear-bar"
        style=${this.indeterminate ? '' : `transform: scaleX(${fraction})`}
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-progress': MdProgress;
  }
}

