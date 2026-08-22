import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../icon/icon.js';
import '../button/button.js';
import '../icon-button/icon-button.js';
import { timePickerStyles } from './time-picker.css.js';

export type TimePickerFormat = '12h' | '24h';
export type TimePickerView = 'dial' | 'input';
export type TimePickerField = 'hour' | 'minute';
export type TimePeriod = 'AM' | 'PM';

@customElement('md-time-picker')
export class MdTimePicker extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, timePickerStyles];

  @property({ type: String })
  value = '';

  @property({ type: String })
  format: TimePickerFormat = '12h';

  @property({ type: String })
  view: TimePickerView = 'dial';

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  headline = 'Select time';

  @property({ type: String, attribute: 'return-value' })
  returnValue = '';

  @property({ type: Boolean, attribute: 'auto-switch-to-minute' })
  autoSwitchToMinute = true;

  @property({ type: String, attribute: 'cancel-label' })
  cancelLabel = 'Cancel';

  @property({ type: String, attribute: 'confirm-label' })
  confirmLabel = 'OK';

  @state()
  activeField: TimePickerField = 'hour';

  @state()
  selectedHour = 12;

  @state()
  selectedMinute = 0;

  @state()
  selectedPeriod: TimePeriod = 'AM';

  @state()
  private isDragging = false;

  @query('.dial-container')
  private dialContainer?: HTMLElement;

  @query('#hour-input')
  private hourInputElement?: HTMLInputElement;

  @query('#minute-input')
  private minuteInputElement?: HTMLInputElement;

  override connectedCallback() {
    super.connectedCallback();
    this.parseValue(this.value);
    this.syncFormValue();
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.parseValue(this.value);
      this.syncFormValue();
    }
  }

  /**
   * Parses time string (e.g. "14:30", "02:30 PM", "2:30", "09:15 AM") into components.
   */
  private parseValue(val: string) {
    if (!val || typeof val !== 'string') {
      const now = new Date();
      let h = now.getHours();
      const m = now.getMinutes();
      let p: TimePeriod = 'AM';

      if (this.format === '12h') {
        p = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
      }
      this.selectedHour = h;
      this.selectedMinute = m;
      this.selectedPeriod = p;
      return;
    }

    const trimmed = val.trim();
    const is12hMatch = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    const is24hMatch = trimmed.match(/^(\d{1,2}):(\d{2})$/);

    if (is12hMatch) {
      let h = parseInt(is12hMatch[1], 10);
      const m = Math.min(59, Math.max(0, parseInt(is12hMatch[2], 10)));
      const p = (is12hMatch[3].toUpperCase() as TimePeriod);
      if (this.format === '24h') {
        if (p === 'PM' && h < 12) h += 12;
        if (p === 'AM' && h === 12) h = 0;
      } else {
        h = Math.min(12, Math.max(1, h));
      }
      this.selectedHour = h;
      this.selectedMinute = m;
      this.selectedPeriod = p;
    } else if (is24hMatch) {
      let h = parseInt(is24hMatch[1], 10);
      const m = Math.min(59, Math.max(0, parseInt(is24hMatch[2], 10)));
      if (this.format === '12h') {
        const p: TimePeriod = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        this.selectedPeriod = p;
      } else {
        h = Math.min(23, Math.max(0, h));
      }
      this.selectedHour = h;
      this.selectedMinute = m;
    }
  }

  /**
   * Formats the current time state into a string according to format.
   */
  getFormattedTime(): string {
    const minStr = this.selectedMinute.toString().padStart(2, '0');
    if (this.format === '24h') {
      const hrStr = this.selectedHour.toString().padStart(2, '0');
      return `${hrStr}:${minStr}`;
    } else {
      const hrStr = this.selectedHour.toString().padStart(2, '0');
      return `${hrStr}:${minStr} ${this.selectedPeriod}`;
    }
  }

  /**
   * Formats current time into standard 24h "HH:MM" string.
   */
  getFormatted24(): string {
    const minStr = this.selectedMinute.toString().padStart(2, '0');
    let h = this.selectedHour;
    if (this.format === '12h') {
      if (this.selectedPeriod === 'PM' && h < 12) h += 12;
      if (this.selectedPeriod === 'AM' && h === 12) h = 0;
    }
    return `${h.toString().padStart(2, '0')}:${minStr}`;
  }

  /**
   * Formats current time into 12h "hh:mm A" string.
   */
  getFormatted12(): string {
    const minStr = this.selectedMinute.toString().padStart(2, '0');
    let h = this.selectedHour;
    let p = this.selectedPeriod;
    if (this.format === '24h') {
      p = h >= 12 ? 'PM' : 'AM';
      h = h % 12 || 12;
    }
    return `${h.toString().padStart(2, '0')}:${minStr} ${p}`;
  }

  private syncFormValue() {
    const val = this.getFormattedTime();
    this.value = val;
    this.setFormValue(val);
  }

  override formResetCallback() {
    this.parseValue('');
    this.syncFormValue();
    this.activeField = 'hour';
  }

  /**
   * Shows the time picker dialog modal.
   */
  showModal() {
    this.modal = true;
    this.open = true;
    this.emitEvent('open');
  }

  /**
   * Shows the time picker.
   */
  show() {
    this.open = true;
    this.emitEvent('open');
  }

  /**
   * Closes the modal time picker.
   */
  close(returnValue?: string) {
    if (returnValue !== undefined) {
      this.returnValue = returnValue;
    }
    this.open = false;
    this.emitEvent('close', { returnValue: this.returnValue });
  }

  /**
   * Confirms the selected time and fires change event.
   */
  confirm() {
    this.syncFormValue();
    const detail = {
      value: this.value,
      hour: this.selectedHour,
      minute: this.selectedMinute,
      period: this.selectedPeriod,
      formatted24: this.getFormatted24(),
      formatted12: this.getFormatted12(),
    };
    this.emitEvent('change', detail);
    this.emitEvent('confirm', detail);
    if (this.modal) {
      this.close('confirm');
    }
  }

  /**
   * Cancels selection and closes modal if opened.
   */
  cancel() {
    this.emitEvent('cancel');
    if (this.modal) {
      this.close('cancel');
    }
  }

  private toggleView() {
    this.view = this.view === 'dial' ? 'input' : 'dial';
  }

  private setField(field: TimePickerField) {
    this.activeField = field;
  }

  private setPeriod(period: TimePeriod) {
    if (this.selectedPeriod !== period) {
      this.selectedPeriod = period;
      this.syncFormValue();
      this.notifyInput();
    }
  }

  private notifyInput() {
    this.emitEvent('input', {
      value: this.getFormattedTime(),
      hour: this.selectedHour,
      minute: this.selectedMinute,
      period: this.selectedPeriod,
      formatted24: this.getFormatted24(),
      formatted12: this.getFormatted12(),
    });
  }

  /* ------------------- Clock Dial Calculations ------------------- */

  private handleDialPointerDown = (e: PointerEvent) => {
    if (this.disabled) return;
    this.isDragging = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.updateDialFromPointer(e);
  };

  private handleDialPointerMove = (e: PointerEvent) => {
    if (!this.isDragging || this.disabled) return;
    this.updateDialFromPointer(e);
  };

  private handleDialPointerUp = (e: PointerEvent) => {
    if (!this.isDragging || this.disabled) return;
    this.isDragging = false;
    this.updateDialFromPointer(e);
    this.syncFormValue();
    this.emitEvent('change', {
      value: this.value,
      hour: this.selectedHour,
      minute: this.selectedMinute,
      period: this.selectedPeriod,
      formatted24: this.getFormatted24(),
      formatted12: this.getFormatted12(),
    });

    if (this.activeField === 'hour' && this.autoSwitchToMinute) {
      this.activeField = 'minute';
    }
  };

  private updateDialFromPointer(e: PointerEvent) {
    if (!this.dialContainer) return;
    const rect = this.dialContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;

    const distance = Math.hypot(x, y);

    if (this.activeField === 'hour') {
      if (this.format === '24h') {
        const isInner = distance < 80;
        let step = Math.round(angle / 30) % 12;
        if (step === 0) step = 12;

        if (isInner) {
          this.selectedHour = step; // 1 to 12
        } else {
          this.selectedHour = step === 12 ? 0 : step + 12; // 00, 13 to 23
        }
      } else {
        let step = Math.round(angle / 30) % 12;
        if (step === 0) step = 12;
        this.selectedHour = step;
      }
    } else {
      const step = Math.round(angle / 6) % 60;
      this.selectedMinute = step;
    }

    this.notifyInput();
  }

  /* ------------------- Text Input Mode Handlers ------------------- */

  private handleHourInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    if (isNaN(val)) return;

    if (this.format === '24h') {
      val = Math.min(23, Math.max(0, val));
    } else {
      val = Math.min(12, Math.max(1, val));
    }
    this.selectedHour = val;
    this.syncFormValue();
    this.notifyInput();

    if (input.value.length >= 2 && this.minuteInputElement) {
      this.minuteInputElement.focus();
      this.minuteInputElement.select();
    }
  };

  private handleMinuteInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    let val = parseInt(input.value, 10);
    if (isNaN(val)) return;

    val = Math.min(59, Math.max(0, val));
    this.selectedMinute = val;
    this.syncFormValue();
    this.notifyInput();
  };

  private handleHourBlur = () => {
    if (this.hourInputElement) {
      this.hourInputElement.value = this.selectedHour.toString().padStart(2, '0');
    }
    this.syncFormValue();
    this.emitEvent('change', {
      value: this.value,
      hour: this.selectedHour,
      minute: this.selectedMinute,
      period: this.selectedPeriod,
    });
  };

  private handleMinuteBlur = () => {
    if (this.minuteInputElement) {
      this.minuteInputElement.value = this.selectedMinute.toString().padStart(2, '0');
    }
    this.syncFormValue();
    this.emitEvent('change', {
      value: this.value,
      hour: this.selectedHour,
      minute: this.selectedMinute,
      period: this.selectedPeriod,
    });
  };

  /* ------------------- Rendering ------------------- */

  private renderDialHand() {
    let angle = 0;
    let length = 96; // radius in px

    if (this.activeField === 'hour') {
      if (this.format === '24h') {
        if (this.selectedHour >= 1 && this.selectedHour <= 12) {
          angle = (this.selectedHour % 12) * 30;
          length = 64; // inner ring
        } else {
          const h = this.selectedHour === 0 ? 12 : this.selectedHour - 12;
          angle = (h % 12) * 30;
          length = 98; // outer ring
        }
      } else {
        angle = (this.selectedHour % 12) * 30;
        length = 96;
      }
    } else {
      angle = this.selectedMinute * 6;
      length = 96;
    }

    const isNonFiveMinute = this.activeField === 'minute' && this.selectedMinute % 5 !== 0;

    return html`
      <div
        class="dial-hand"
        style="transform: rotate(${angle}deg); height: ${length}px;"
      >
        <div class="dial-selector-head">
          ${isNonFiveMinute ? html`<div class="dial-inner-dot"></div>` : nothing}
        </div>
      </div>
    `;
  }

  private renderDialNumbers() {
    const center = 128; // half of 256px
    const numbers = [];

    if (this.activeField === 'hour') {
      if (this.format === '24h') {
        // Outer ring: 00, 13..23
        const outerRadius = 98;
        const outerHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (let i = 0; i < 12; i++) {
          const hVal = outerHours[i] === 12 ? 0 : outerHours[i] + 12;
          const display = hVal.toString().padStart(2, '0');
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = center + outerRadius * Math.cos(angle);
          const y = center + outerRadius * Math.sin(angle);
          const isSelected = this.selectedHour === hVal;
          numbers.push(html`
            <span
              class="dial-number small ${isSelected ? 'selected' : ''}"
              style="left: ${x}px; top: ${y}px;"
            >
              ${display}
            </span>
          `);
        }

        // Inner ring: 1..12
        const innerRadius = 64;
        const innerHours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (let i = 0; i < 12; i++) {
          const hVal = innerHours[i];
          const display = hVal.toString();
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = center + innerRadius * Math.cos(angle);
          const y = center + innerRadius * Math.sin(angle);
          const isSelected = this.selectedHour === hVal;
          numbers.push(html`
            <span
              class="dial-number ${isSelected ? 'selected' : ''}"
              style="left: ${x}px; top: ${y}px;"
            >
              ${display}
            </span>
          `);
        }
      } else {
        // 12-hour dial
        const radius = 96;
        const hours = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        for (let i = 0; i < 12; i++) {
          const hVal = hours[i];
          const angle = (i * 30 - 90) * (Math.PI / 180);
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);
          const isSelected = this.selectedHour === hVal;
          numbers.push(html`
            <span
              class="dial-number ${isSelected ? 'selected' : ''}"
              style="left: ${x}px; top: ${y}px;"
            >
              ${hVal}
            </span>
          `);
        }
      }
    } else {
      // Minutes dial: 00, 05, 10, ... 55
      const radius = 96;
      for (let i = 0; i < 12; i++) {
        const mVal = i * 5;
        const display = mVal.toString().padStart(2, '0');
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        const isSelected = this.selectedMinute === mVal;
        numbers.push(html`
          <span
            class="dial-number ${isSelected ? 'selected' : ''}"
            style="left: ${x}px; top: ${y}px;"
          >
            ${display}
          </span>
        `);
      }
    }

    return numbers;
  }

  override render() {
    const hourFormatted = this.selectedHour.toString().padStart(2, '0');
    const minuteFormatted = this.selectedMinute.toString().padStart(2, '0');

    return html`
      ${this.modal ? html`<div class="scrim" @click=${this.cancel}></div>` : nothing}

      <div class="picker-surface" role="dialog" aria-modal=${this.modal ? 'true' : 'false'}>
        <div class="header">
          <h2 class="headline">${this.headline}</h2>
        </div>

        <div class="time-display-row">
          <div class="time-card-wrapper">
            ${this.view === 'input'
              ? html`
                  <div class="time-card ${this.activeField === 'hour' ? 'active' : ''}">
                    <input
                      id="hour-input"
                      class="time-input"
                      type="text"
                      inputmode="numeric"
                      maxlength="2"
                      .value=${hourFormatted}
                      @input=${this.handleHourInput}
                      @blur=${this.handleHourBlur}
                      @focus=${() => this.setField('hour')}
                      aria-label="Hour"
                    />
                  </div>
                `
              : html`
                  <button
                    type="button"
                    class="time-card ${this.activeField === 'hour' ? 'active' : ''}"
                    @click=${() => this.setField('hour')}
                    aria-label="Select hour"
                  >
                    ${hourFormatted}
                  </button>
                `}
            ${this.view === 'input' ? html`<span class="time-card-label">Hour</span>` : nothing}
          </div>

          <span class="time-separator" aria-hidden="true">:</span>

          <div class="time-card-wrapper">
            ${this.view === 'input'
              ? html`
                  <div class="time-card ${this.activeField === 'minute' ? 'active' : ''}">
                    <input
                      id="minute-input"
                      class="time-input"
                      type="text"
                      inputmode="numeric"
                      maxlength="2"
                      .value=${minuteFormatted}
                      @input=${this.handleMinuteInput}
                      @blur=${this.handleMinuteBlur}
                      @focus=${() => this.setField('minute')}
                      aria-label="Minute"
                    />
                  </div>
                `
              : html`
                  <button
                    type="button"
                    class="time-card ${this.activeField === 'minute' ? 'active' : ''}"
                    @click=${() => this.setField('minute')}
                    aria-label="Select minute"
                  >
                    ${minuteFormatted}
                  </button>
                `}
            ${this.view === 'input' ? html`<span class="time-card-label">Minute</span>` : nothing}
          </div>

          ${this.format === '12h'
            ? html`
                <div class="period-toggle" role="group" aria-label="Period selector">
                  <button
                    type="button"
                    class="period-button ${this.selectedPeriod === 'AM' ? 'selected' : ''}"
                    @click=${() => this.setPeriod('AM')}
                    aria-pressed=${this.selectedPeriod === 'AM'}
                  >
                    AM
                  </button>
                  <button
                    type="button"
                    class="period-button ${this.selectedPeriod === 'PM' ? 'selected' : ''}"
                    @click=${() => this.setPeriod('PM')}
                    aria-pressed=${this.selectedPeriod === 'PM'}
                  >
                    PM
                  </button>
                </div>
              `
            : nothing}
        </div>

        ${this.view === 'dial'
          ? html`
              <div
                class="dial-container"
                @pointerdown=${this.handleDialPointerDown}
                @pointermove=${this.handleDialPointerMove}
                @pointerup=${this.handleDialPointerUp}
              >
                <div class="dial-center-pin"></div>
                ${this.renderDialHand()}
                ${this.renderDialNumbers()}
              </div>
            `
          : nothing}

        <div class="actions-row">
          <button
            type="button"
            class="mode-switch-btn"
            aria-label=${this.view === 'dial' ? 'Switch to text input' : 'Switch to clock dial'}
            @click=${this.toggleView}
          >
            <md-icon name=${this.view === 'dial' ? 'keyboard' : 'schedule'}></md-icon>
          </button>

          <div class="dialog-buttons">
            <md-button variant="text" @click=${this.cancel}>${this.cancelLabel}</md-button>
            <md-button variant="text" @click=${this.confirm}>${this.confirmLabel}</md-button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-time-picker': MdTimePicker;
  }
}
