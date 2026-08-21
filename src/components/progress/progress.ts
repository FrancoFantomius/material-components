import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { progressStyles } from './progress.css.js';

export type ProgressType = 'linear' | 'circular';

export const WAVY_CIRCLE_PATH =
  'M 44.000 24.000 C 44.942 25.309, 45.659 26.854, 45.381 28.253 C 45.103 29.652, 43.849 30.805, 42.478 31.654 C 41.106 32.502, 39.795 33.121, 39.133 34.111 C 38.471 35.102, 38.401 36.550, 38.142 38.142 C 37.883 39.734, 37.298 41.333, 36.111 42.126 C 34.925 42.919, 33.224 42.847, 31.654 42.478 C 30.084 42.108, 28.719 41.618, 27.551 41.850 C 26.382 42.083, 25.309 43.058, 24.000 44.000 C 22.691 44.942, 21.146 45.659, 19.747 45.381 C 18.348 45.103, 17.195 43.849, 16.346 42.478 C 15.498 41.106, 14.879 39.795, 13.889 39.133 C 12.898 38.471, 11.450 38.401, 9.858 38.142 C 8.266 37.883, 6.667 37.298, 5.874 36.111 C 5.081 34.925, 5.153 33.224, 5.522 31.654 C 5.892 30.084, 6.382 28.719, 6.150 27.551 C 5.917 26.382, 4.942 25.309, 4.000 24.000 C 3.058 22.691, 2.341 21.146, 2.619 19.747 C 2.897 18.348, 4.151 17.195, 5.522 16.346 C 6.894 15.498, 8.205 14.879, 8.867 13.889 C 9.529 12.898, 9.599 11.450, 9.858 9.858 C 10.117 8.266, 10.702 6.667, 11.889 5.874 C 13.075 5.081, 14.776 5.153, 16.346 5.522 C 17.916 5.892, 19.281 6.382, 20.449 6.150 C 21.618 5.917, 22.691 4.942, 24.000 4.000 C 25.309 3.058, 26.854 2.341, 28.253 2.619 C 29.652 2.897, 30.805 4.151, 31.654 5.522 C 32.502 6.894, 33.121 8.205, 34.111 8.867 C 35.102 9.529, 36.550 9.599, 38.142 9.858 C 39.734 10.117, 41.333 10.702, 42.126 11.889 C 42.919 13.075, 42.847 14.776, 42.478 16.346 C 42.108 17.916, 41.618 19.281, 41.850 20.449 C 42.083 21.618, 43.058 22.691, 44.000 24.000 Z';

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

  @property({ type: Boolean })
  wavy = true;

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.indeterminate = this.value === null || this.value === undefined;
    } else if (this.value !== null && this.value !== undefined && !changedProperties.has('indeterminate')) {
      this.indeterminate = false;
    }

    if (!this.indeterminate && this.value !== null && this.value !== undefined) {
      this.setAttribute('aria-valuenow', String(this.value));
    } else {
      this.removeAttribute('aria-valuenow');
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'progressbar');
    this.setAttribute('aria-valuemin', '0');
    this.setAttribute('aria-valuemax', String(this.max));
  }

  override render() {
    const maxVal = this.max || 1;
    const fraction = this.value !== null && this.value !== undefined ? Math.min(Math.max(this.value / maxVal, 0), 1) : 0;
    const bufferFraction = Math.min(Math.max((this.buffer ?? 1) / maxVal, 0), 1);
    const hasValue = !this.indeterminate && this.value !== null && this.value !== undefined;
    const isWavy = this.wavy && hasValue;

    if (this.type === 'circular') {
      const radius = 20;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - fraction * circumference;

      if (isWavy) {
        return html`
          <svg viewBox="0 0 48 48">
            <circle class="circle-track" cx="24" cy="24" r=${radius}></circle>
            <path
              class="circle-wave-indicator"
              d=${WAVY_CIRCLE_PATH}
              pathLength="100"
              stroke-dasharray="100"
              stroke-dashoffset=${(1 - fraction) * 100}
            ></path>
          </svg>
        `;
      }

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

    // Linear progress
    const progressPercent = fraction * 100;
    const bufferPercent = bufferFraction * 100;

    if (isWavy) {
      return html`
        <div
          class="linear-track-bg"
          style="clip-path: inset(0 0 0 ${progressPercent}%);"
        >
          ${this.buffer < 1 ? html`<div class="linear-buffer" style="width: ${bufferPercent}%"></div>` : nothing}
        </div>
        <div class="linear-sinus-wave" style="width: ${progressPercent}%"></div>
      `;
    }

    return html`
      <div class="linear-track-bg">
        ${this.buffer < 1 ? html`<div class="linear-buffer" style="width: ${bufferPercent}%"></div>` : nothing}
        <div
          class="linear-bar"
          style=${this.indeterminate ? '' : `transform: scaleX(${fraction})`}
        ></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-progress': MdProgress;
  }
}

