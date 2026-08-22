import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { sliderStyles } from './slider.css.js';

@customElement('md-slider')
export class MdSlider extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, sliderStyles];

  @property({ type: Number })
  min = 0;

  @property({ type: Number })
  max = 100;

  @property({ type: Number })
  step = 1;

  @property({ type: Number })
  value = 50;

  @property({ type: Number, attribute: 'value-start' })
  valueStart = 0;

  @property({ type: Number, attribute: 'value-end' })
  valueEnd = 100;

  @property({ type: Boolean, reflect: true })
  range = false;

  @property({ type: Boolean, reflect: true })
  ticks = false;

  @property({ type: Boolean, reflect: true })
  labeled = false;

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'leading-icon' })
  leadingIcon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @property({ type: String, attribute: 'name-start' })
  nameStart = '';

  @property({ type: String, attribute: 'name-end' })
  nameEnd = '';

  @property({ type: String, attribute: 'value-text' })
  valueText = '';

  @property({ type: String, attribute: 'value-start-text' })
  valueStartText = '';

  @property({ type: String, attribute: 'value-end-text' })
  valueEndText = '';

  @query('.slider-wrapper')
  private sliderWrapper!: HTMLElement;

  @query('.start-thumb')
  private startThumb?: HTMLElement;

  @query('.end-thumb')
  private endThumb?: HTMLElement;

  @state()
  private activeThumb: 'start' | 'end' | null = null;

  @state()
  private isDragging = false;

  private initialValue = 50;
  private initialValueStart = 0;
  private initialValueEnd = 100;

  override connectedCallback() {
    super.connectedCallback();
    this.initialValue = this.value;
    this.initialValueStart = this.valueStart;
    this.initialValueEnd = this.valueEnd;
    this.clampValues();
    this.updateFormValue();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (
      changedProperties.has('value') ||
      changedProperties.has('valueStart') ||
      changedProperties.has('valueEnd') ||
      changedProperties.has('min') ||
      changedProperties.has('max') ||
      changedProperties.has('step') ||
      changedProperties.has('range')
    ) {
      this.clampValues();
      this.updateFormValue();
    }
  }

  override formResetCallback() {
    this.value = this.initialValue;
    this.valueStart = this.initialValueStart;
    this.valueEnd = this.initialValueEnd;
    this.clampValues();
    this.updateFormValue();
  }

  private clampValues() {
    const min = this.min;
    const max = this.max > min ? this.max : min + 1;
    const step = this.step > 0 ? this.step : 1;

    const roundToStep = (val: number) => {
      const steps = Math.round((val - min) / step);
      const rounded = min + steps * step;
      // Handle floating point inaccuracies
      return Number(Math.min(Math.max(rounded, min), max).toFixed(6));
    };

    if (this.range) {
      let start = roundToStep(this.valueStart ?? min);
      let end = roundToStep(this.valueEnd ?? max);

      if (start > end) {
        start = end;
      }
      this.valueStart = start;
      this.valueEnd = end;
    } else {
      this.value = roundToStep(this.value ?? min);
    }
  }

  private updateFormValue() {
    if (this.range) {
      if (this.nameStart || this.nameEnd) {
        const formData = new FormData();
        if (this.nameStart) formData.append(this.nameStart, String(this.valueStart));
        if (this.nameEnd) formData.append(this.nameEnd, String(this.valueEnd));
        this.setFormValue(formData);
      } else {
        this.setFormValue(`${this.valueStart},${this.valueEnd}`);
      }
    } else {
      this.setFormValue(this.value !== null && this.value !== undefined ? String(this.value) : null);
    }

    if (this.required) {
      const isMissing = this.range
        ? this.valueStart === undefined || this.valueEnd === undefined
        : this.value === undefined || this.value === null;
      if (isMissing) {
        this.setValidity({ valueMissing: true }, 'Please select a value');
      } else {
        this.setValidity({});
      }
    } else {
      this.setValidity({});
    }
  }

  private getPercentage(val: number): number {
    const range = this.max - this.min;
    if (range <= 0) return 0;
    return Math.min(Math.max((val - this.min) / range, 0), 1) * 100;
  }

  private getValueFromPosition(clientX: number): number {
    if (!this.sliderWrapper) return this.min;
    const rect = this.sliderWrapper.getBoundingClientRect();
    if (rect.width <= 0) return this.min;

    const fraction = (clientX - rect.left) / rect.width;
    const clampedFraction = Math.min(Math.max(fraction, 0), 1);
    const rawValue = this.min + clampedFraction * (this.max - this.min);

    const step = this.step > 0 ? this.step : 1;
    const steps = Math.round((rawValue - this.min) / step);
    const steppedValue = this.min + steps * step;
    return Number(Math.min(Math.max(steppedValue, this.min), this.max).toFixed(6));
  }

  private handlePointerDown = (event: PointerEvent) => {
    if (this.disabled) return;
    event.preventDefault();
    this.sliderWrapper.setPointerCapture(event.pointerId);
    this.isDragging = true;

    const clickValue = this.getValueFromPosition(event.clientX);

    if (this.range) {
      const distToStart = Math.abs(clickValue - this.valueStart);
      const distToEnd = Math.abs(clickValue - this.valueEnd);

      if (distToStart < distToEnd) {
        this.activeThumb = 'start';
        this.valueStart = Math.min(clickValue, this.valueEnd);
      } else if (distToEnd < distToStart) {
        this.activeThumb = 'end';
        this.valueEnd = Math.max(clickValue, this.valueStart);
      } else {
        // Equal distance - move whichever allows direction of motion
        if (clickValue < this.valueStart) {
          this.activeThumb = 'start';
          this.valueStart = clickValue;
        } else {
          this.activeThumb = 'end';
          this.valueEnd = clickValue;
        }
      }
    } else {
      this.activeThumb = 'end';
      this.value = clickValue;
    }

    this.clampValues();
    this.updateFormValue();
    this.dispatchInputEvent();
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.isDragging || this.disabled) return;
    const nextValue = this.getValueFromPosition(event.clientX);

    if (this.range) {
      if (this.activeThumb === 'start') {
        this.valueStart = Math.min(nextValue, this.valueEnd);
      } else if (this.activeThumb === 'end') {
        this.valueEnd = Math.max(nextValue, this.valueStart);
      }
    } else {
      this.value = nextValue;
    }

    this.clampValues();
    this.updateFormValue();
    this.dispatchInputEvent();
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.isDragging) return;
    try {
      this.sliderWrapper.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore if pointer was not captured
    }
    this.isDragging = false;
    this.activeThumb = null;
    this.dispatchChangeEvent();
  };

  private dispatchInputEvent() {
    this.emitEvent('input', {
      value: this.value,
      valueStart: this.valueStart,
      valueEnd: this.valueEnd,
    });
  }

  private dispatchChangeEvent() {
    this.emitEvent('change', {
      value: this.value,
      valueStart: this.valueStart,
      valueEnd: this.valueEnd,
    });
  }

  private handleKeyDown = (event: KeyboardEvent, thumb: 'start' | 'end') => {
    if (this.disabled) return;

    const step = this.step > 0 ? this.step : 1;
    const bigStep = Math.max(step * 10, (this.max - this.min) / 10);
    let delta = 0;

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowDown':
        delta = -step;
        break;
      case 'ArrowRight':
      case 'ArrowUp':
        delta = step;
        break;
      case 'PageDown':
        delta = -bigStep;
        break;
      case 'PageUp':
        delta = bigStep;
        break;
      case 'Home':
        if (this.range) {
          if (thumb === 'start') this.valueStart = this.min;
          else this.valueEnd = this.valueStart;
        } else {
          this.value = this.min;
        }
        event.preventDefault();
        this.clampValues();
        this.updateFormValue();
        this.dispatchInputEvent();
        this.dispatchChangeEvent();
        return;
      case 'End':
        if (this.range) {
          if (thumb === 'end') this.valueEnd = this.max;
          else this.valueStart = this.valueEnd;
        } else {
          this.value = this.max;
        }
        event.preventDefault();
        this.clampValues();
        this.updateFormValue();
        this.dispatchInputEvent();
        this.dispatchChangeEvent();
        return;
      default:
        return;
    }

    event.preventDefault();

    if (this.range) {
      if (thumb === 'start') {
        this.valueStart = Math.min(Math.max(this.valueStart + delta, this.min), this.valueEnd);
      } else {
        this.valueEnd = Math.min(Math.max(this.valueEnd + delta, this.valueStart), this.max);
      }
    } else {
      this.value = Math.min(Math.max(this.value + delta, this.min), this.max);
    }

    this.clampValues();
    this.updateFormValue();
    this.dispatchInputEvent();
    this.dispatchChangeEvent();
  };

  private renderTicks() {
    if (!this.ticks) return nothing;

    const step = this.step > 0 ? this.step : 1;
    const count = Math.floor((this.max - this.min) / step);
    if (count <= 0 || count > 200) return nothing; // Avoid rendering thousands of DOM elements

    const tickElements = [];
    const startPct = this.range ? this.getPercentage(this.valueStart) : 0;
    const endPct = this.range ? this.getPercentage(this.valueEnd) : this.getPercentage(this.value);

    for (let i = 0; i <= count; i++) {
      const val = this.min + i * step;
      const pct = this.getPercentage(val);
      const isActive = pct >= startPct && pct <= endPct;

      tickElements.push(html`
        <div
          class="tick-mark ${isActive ? 'active' : ''}"
          style="left: ${pct}%"
        ></div>
      `);
    }

    return html`<div class="tick-marks-container">${tickElements}</div>`;
  }

  private renderThumb(thumb: 'start' | 'end') {
    const isStart = thumb === 'start';
    const val = isStart ? this.valueStart : (this.range ? this.valueEnd : this.value);
    const pct = this.getPercentage(val);
    const labelText = isStart
      ? (this.valueStartText || String(this.valueStart))
      : (this.range ? (this.valueEndText || String(this.valueEnd)) : (this.valueText || String(this.value)));
    const isThumbDragging = this.isDragging && this.activeThumb === thumb;

    return html`
      <div
        class="thumb-container ${isStart ? 'start-thumb' : 'end-thumb'} ${isThumbDragging ? 'dragging' : ''} ${this.labeled ? 'active-label' : ''}"
        style="left: ${pct}%"
        tabindex=${this.disabled ? -1 : 0}
        role="slider"
        aria-valuemin=${isStart ? this.min : (this.range ? this.valueStart : this.min)}
        aria-valuemax=${isStart ? (this.range ? this.valueEnd : this.max) : this.max}
        aria-valuenow=${val}
        aria-label=${isStart ? 'Start value' : (this.range ? 'End value' : 'Value')}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        @keydown=${(e: KeyboardEvent) => this.handleKeyDown(e, thumb)}
      >
        <md-ripple ?disabled=${this.disabled} unbounded></md-ripple>
        <md-focus-ring></md-focus-ring>
        <div class="thumb-handle"></div>
        ${this.labeled
          ? html`<div class="value-label">${labelText}</div>`
          : nothing}
      </div>
    `;
  }

  override render() {
    const startPct = this.range ? this.getPercentage(this.valueStart) : 0;
    const endPct = this.range ? this.getPercentage(this.valueEnd) : this.getPercentage(this.value);
    const activeWidth = Math.max(endPct - startPct, 0);

    const leadIcon = this.leadingIcon || this.icon;

    return html`
      <div class="container">
        ${leadIcon
          ? html`<md-icon class="icon-slot">${leadIcon}</md-icon>`
          : html`<slot name="leading-icon"><slot name="icon"></slot></slot>`}

        <div
          class="slider-wrapper"
          @pointerdown=${this.handlePointerDown}
          @pointermove=${this.handlePointerMove}
          @pointerup=${this.handlePointerUp}
          @pointercancel=${this.handlePointerUp}
        >
          <div class="track-container">
            <div
              class="track-active"
              style="left: ${startPct}%; width: ${activeWidth}%"
            ></div>
            ${this.renderTicks()}
          </div>

          ${this.range ? this.renderThumb('start') : nothing}
          ${this.renderThumb('end')}
        </div>

        ${this.trailingIcon
          ? html`<md-icon class="icon-slot">${this.trailingIcon}</md-icon>`
          : html`<slot name="trailing-icon"></slot>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-slider': MdSlider;
  }
}
