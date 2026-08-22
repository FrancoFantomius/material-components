import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import '../button/button.js';
import { datePickerStyles } from './date-picker.css.js';

export type DatePickerVariant = 'docked' | 'modal';
export type DatePickerViewMode = 'calendar' | 'year';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES_SUNDAY_FIRST = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEKDAY_NAMES_MONDAY_FIRST = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}

function formatDateString(year: number, month: number, day: number): string {
  return `${year}-${padZero(month + 1)}-${padZero(day)}`;
}

function parseDateString(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr || typeof dateStr !== 'string') return null;
  const parts = dateStr.split('-');
  if (parts.length !== 3) return null;
  const year = parseInt(parts[0]!, 10);
  const month = parseInt(parts[1]!, 10) - 1;
  const day = parseInt(parts[2]!, 10);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  return { year, month, day };
}

function getTodayString(): string {
  const now = new Date();
  return formatDateString(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDisplayDate(dateStr: string): string {
  const parsed = parseDateString(dateStr);
  if (!parsed) return '';
  const d = new Date(parsed.year, parsed.month, parsed.day);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

function formatShortMonthDay(dateStr: string): string {
  const parsed = parseDateString(dateStr);
  if (!parsed) return '';
  const d = new Date(parsed.year, parsed.month, parsed.day);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

@customElement('md-date-picker')
export class MdDatePicker extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, datePickerStyles];

  @property({ type: String, reflect: true })
  variant: DatePickerVariant = 'docked';

  @property({ type: Boolean, reflect: true })
  range = false;

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, attribute: 'start-date' })
  startDate = '';

  @property({ type: String, attribute: 'end-date' })
  endDate = '';

  @property({ type: String })
  min = '';

  @property({ type: String })
  max = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  headline = '';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, attribute: 'error-text' })
  errorText = '';

  @property({ type: String, attribute: 'supporting-text' })
  supportingText = '';

  @property({ type: Number, attribute: 'first-day-of-week' })
  firstDayOfWeek = 0;

  @property({ type: Boolean, attribute: 'show-actions' })
  showActions = false;

  @state()
  private viewYear: number = new Date().getFullYear();

  @state()
  private viewMonth: number = new Date().getMonth();

  @state()
  private viewMode: DatePickerViewMode = 'calendar';

  @state()
  private hoverDate: string | null = null;

  @state()
  private selectingEnd = false;

  @query('dialog')
  private dialogElement?: HTMLDialogElement;

  override connectedCallback() {
    super.connectedCallback();
    this.syncInitialState();
    this.setFormValue(this.value);
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);

    if (changedProperties.has('value')) {
      this.handleValueChange();
      this.setFormValue(this.value);
      this.validateInput();
    }

    if (changedProperties.has('startDate') || changedProperties.has('endDate')) {
      if (this.range) {
        const newVal = this.startDate && this.endDate ? `${this.startDate}/${this.endDate}` : (this.startDate || '');
        if (this.value !== newVal) {
          this.value = newVal;
          this.setFormValue(this.value);
        }
      }
    }

    if (changedProperties.has('min') || changedProperties.has('max') || changedProperties.has('required')) {
      this.validateInput();
    }
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('open') && this.variant === 'modal') {
      if (this.open) {
        if (this.dialogElement && !this.dialogElement.open) {
          this.dialogElement.showModal();
        }
        this.emitEvent('open');
      } else {
        if (this.dialogElement && this.dialogElement.open) {
          this.dialogElement.close();
        }
        this.emitEvent('close');
      }
    }
  }

  private syncInitialState() {
    const targetDate = this.startDate || (this.range ? (this.value.split('/')[0] ?? '') : this.value);
    const parsed = parseDateString(targetDate);
    if (parsed) {
      this.viewYear = parsed.year;
      this.viewMonth = parsed.month;
    } else {
      const now = new Date();
      this.viewYear = now.getFullYear();
      this.viewMonth = now.getMonth();
    }

    if (this.range && this.value && this.value.includes('/')) {
      const [s, e] = this.value.split('/');
      this.startDate = s || '';
      this.endDate = e || '';
    }
  }

  private handleValueChange() {
    if (this.range) {
      if (this.value.includes('/')) {
        const [s, e] = this.value.split('/');
        this.startDate = s || '';
        this.endDate = e || '';
      } else {
        this.startDate = this.value;
        this.endDate = '';
      }
    } else {
      const parsed = parseDateString(this.value);
      if (parsed) {
        this.viewYear = parsed.year;
        this.viewMonth = parsed.month;
      }
    }
  }

  override formResetCallback() {
    this.value = '';
    this.startDate = '';
    this.endDate = '';
    this.error = false;
    this.selectingEnd = false;
    this.setFormValue(null);
    const now = new Date();
    this.viewYear = now.getFullYear();
    this.viewMonth = now.getMonth();
    this.viewMode = 'calendar';
  }

  showModal() {
    this.open = true;
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

  reset() {
    this.formResetCallback();
  }

  private validateInput() {
    if (this.required && !this.value) {
      this.setValidity({ valueMissing: true }, this.errorText || 'A date is required');
      this.error = true;
      return;
    }

    if (this.min && this.value) {
      const checkVal = this.range ? this.startDate : this.value;
      if (checkVal && checkVal < this.min) {
        this.setValidity({ rangeUnderflow: true }, this.errorText || `Date must be after ${this.min}`);
        this.error = true;
        return;
      }
    }

    if (this.max && this.value) {
      const checkVal = this.range ? (this.endDate || this.startDate) : this.value;
      if (checkVal && checkVal > this.max) {
        this.setValidity({ rangeOverflow: true }, this.errorText || `Date must be before ${this.max}`);
        this.error = true;
        return;
      }
    }

    this.setValidity({});
    if (!this.errorText) {
      this.error = false;
    }
  }

  private handlePrevMonth = () => {
    if (this.viewMonth === 0) {
      this.viewMonth = 11;
      this.viewYear -= 1;
    } else {
      this.viewMonth -= 1;
    }
  };

  private handleNextMonth = () => {
    if (this.viewMonth === 11) {
      this.viewMonth = 0;
      this.viewYear += 1;
    } else {
      this.viewMonth += 1;
    }
  };

  private toggleViewMode = () => {
    this.viewMode = this.viewMode === 'calendar' ? 'year' : 'calendar';
  };

  private selectYear = (year: number) => {
    this.viewYear = year;
    this.viewMode = 'calendar';
  };

  private isDateDisabled(dateStr: string): boolean {
    if (this.disabled) return true;
    if (this.min && dateStr < this.min) return true;
    if (this.max && dateStr > this.max) return true;
    return false;
  }

  private handleDayClick = (dateStr: string) => {
    if (this.isDateDisabled(dateStr)) return;

    if (!this.range) {
      this.value = dateStr;
      this.setFormValue(this.value);
      this.emitEvent('input', { value: this.value });
      this.emitEvent('change', { value: this.value });
      this.emitEvent('select', { date: dateStr, type: 'single' });
      return;
    }

    // Range selection mode
    if (!this.selectingEnd || !this.startDate) {
      // Start fresh range selection
      this.startDate = dateStr;
      this.endDate = '';
      this.value = dateStr;
      this.selectingEnd = true;
      this.setFormValue(this.value);
      this.emitEvent('select', { date: dateStr, type: 'start' });
      this.emitEvent('input', { value: this.value });
    } else {
      // Selecting end date
      if (dateStr < this.startDate) {
        // Clicked a date before start date, restart range
        this.startDate = dateStr;
        this.endDate = '';
        this.value = dateStr;
        this.selectingEnd = true;
        this.setFormValue(this.value);
        this.emitEvent('select', { date: dateStr, type: 'start' });
        this.emitEvent('input', { value: this.value });
      } else {
        this.endDate = dateStr;
        this.value = `${this.startDate}/${this.endDate}`;
        this.selectingEnd = false;
        this.setFormValue(this.value);
        this.emitEvent('select', { date: dateStr, type: 'end' });
        this.emitEvent('input', { value: this.value });
        this.emitEvent('change', {
          value: this.value,
          startDate: this.startDate,
          endDate: this.endDate,
        });
      }
    }
  };

  private handleDayMouseEnter = (dateStr: string) => {
    if (this.range && this.selectingEnd && this.startDate) {
      this.hoverDate = dateStr;
    }
  };

  private handleDayMouseLeave = () => {
    this.hoverDate = null;
  };

  private handleCancel = (event?: Event) => {
    if (event) event.preventDefault();
    this.emitEvent('cancel');
    this.close();
  };

  private handleConfirm = () => {
    this.emitEvent('change', {
      value: this.value,
      startDate: this.startDate,
      endDate: this.endDate,
    });
    this.close();
  };

  private getFormattedHeadline(): string {
    if (this.headline) return this.headline;

    if (!this.range) {
      if (!this.value) return 'Select date';
      return formatDisplayDate(this.value);
    }

    // Range mode
    if (!this.startDate && !this.endDate) {
      return 'Select range';
    }

    if (this.startDate && !this.endDate) {
      return `${formatShortMonthDay(this.startDate)} – End date`;
    }

    if (this.startDate && this.endDate) {
      const s = parseDateString(this.startDate);
      const e = parseDateString(this.endDate);
      if (s && e && s.year === e.year) {
        return `${formatShortMonthDay(this.startDate)} – ${formatShortMonthDay(this.endDate)}, ${s.year}`;
      }
      return `${formatShortMonthDay(this.startDate)} – ${formatShortMonthDay(this.endDate)}`;
    }

    return 'Select range';
  }

  private renderCalendarGrid() {
    const year = this.viewYear;
    const month = this.viewMonth;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayIndex = new Date(year, month, 1).getDay();

    if (this.firstDayOfWeek === 1) {
      firstDayIndex = (firstDayIndex + 6) % 7;
    }

    const weekdays = this.firstDayOfWeek === 1
      ? WEEKDAY_NAMES_MONDAY_FIRST
      : WEEKDAY_NAMES_SUNDAY_FIRST;

    const todayStr = getTodayString();

    const days = [];
    // Blank padding days
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(html`<div class="day-cell empty"></div>`);
    }

    // Days of current month
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = formatDateString(year, month, d);
      const isToday = dateStr === todayStr;
      const isDisabled = this.isDateDisabled(dateStr);

      let isSelected = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isInRange = false;

      if (!this.range) {
        isSelected = this.value === dateStr;
      } else {
        const effectiveEnd = this.endDate || (this.selectingEnd ? this.hoverDate : null);
        isRangeStart = this.startDate === dateStr;
        isRangeEnd = effectiveEnd === dateStr;
        isSelected = isRangeStart || isRangeEnd;

        if (this.startDate && effectiveEnd && effectiveEnd > this.startDate) {
          isInRange = dateStr >= this.startDate && dateStr <= effectiveEnd;
        }
      }

      const cellClasses = [
        'day-cell',
        isRangeStart ? 'range-start' : '',
        isRangeEnd ? 'range-end' : '',
        isInRange ? 'in-range' : '',
      ].filter(Boolean).join(' ');

      const btnClasses = [
        'day-btn',
        isSelected ? 'selected' : '',
        isToday ? 'today' : '',
        isRangeStart ? 'range-start' : '',
        isRangeEnd ? 'range-end' : '',
        isDisabled ? 'disabled' : '',
      ].filter(Boolean).join(' ');

      days.push(html`
        <div class=${cellClasses}>
          ${isInRange ? html`<div class="range-band"></div>` : nothing}
          <button
            type="button"
            class=${btnClasses}
            ?disabled=${isDisabled}
            aria-label=${dateStr}
            aria-selected=${isSelected ? 'true' : 'false'}
            @click=${() => this.handleDayClick(dateStr)}
            @mouseenter=${() => this.handleDayMouseEnter(dateStr)}
            @mouseleave=${this.handleDayMouseLeave}
          >
            <md-ripple ?disabled=${isDisabled}></md-ripple>
            ${d}
          </button>
        </div>
      `);
    }

    return html`
      <div class="calendar-content">
        <div class="weekdays" role="row">
          ${weekdays.map(
            (w) => html`<div class="weekday" role="columnheader">${w}</div>`
          )}
        </div>
        <div class="days-grid" role="grid">
          ${days}
        </div>
      </div>
    `;
  }

  private renderYearPicker() {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 50;
    const endYear = currentYear + 50;
    const years = [];

    for (let y = startYear; y <= endYear; y++) {
      const isSelected = y === this.viewYear;
      const isCurrent = y === currentYear;
      years.push(html`
        <button
          type="button"
          class="year-btn ${isSelected ? 'selected' : ''} ${isCurrent ? 'current' : ''}"
          @click=${() => this.selectYear(y)}
        >
          <md-ripple></md-ripple>
          ${y}
        </button>
      `);
    }

    return html`
      <div class="year-picker-view">
        ${years}
      </div>
    `;
  }

  private renderPickerSurface() {
    const isYearMode = this.viewMode === 'year';
    const subheadText = this.label || (this.range ? 'Select range' : 'Select date');
    const headlineText = this.getFormattedHeadline();
    const hasValue = Boolean(this.range ? this.startDate : this.value);
    const shouldShowActions = this.showActions || this.variant === 'modal';

    return html`
      <div class="picker-surface">
        <div class="header">
          <div class="header-top">
            <span class="subhead">${subheadText}</span>
            <md-icon-button
              icon=${isYearMode ? 'calendar_month' : 'edit_calendar'}
              aria-label=${isYearMode ? 'Switch to calendar view' : 'Switch to year view'}
              @click=${this.toggleViewMode}
            ></md-icon-button>
          </div>
          <div class="headline ${!hasValue ? 'placeholder' : ''}">
            ${headlineText}
          </div>
        </div>

        <div class="header-divider"></div>

        <div class="navigation">
          <button
            type="button"
            class="month-year-btn ${isYearMode ? 'open' : ''}"
            @click=${this.toggleViewMode}
            aria-label="Toggle year selection"
          >
            <span>${MONTH_NAMES[this.viewMonth]} ${this.viewYear}</span>
            <md-icon class="dropdown-icon" name="arrow_drop_down"></md-icon>
          </button>

          ${!isYearMode
            ? html`
                <div class="nav-arrows">
                  <md-icon-button
                    icon="chevron_left"
                    aria-label="Previous month"
                    @click=${this.handlePrevMonth}
                  ></md-icon-button>
                  <md-icon-button
                    icon="chevron_right"
                    aria-label="Next month"
                    @click=${this.handleNextMonth}
                  ></md-icon-button>
                </div>
              `
            : nothing}
        </div>

        ${isYearMode ? this.renderYearPicker() : this.renderCalendarGrid()}

        ${shouldShowActions
          ? html`
              <div class="actions">
                <slot name="actions">
                  <md-button variant="text" @click=${this.handleCancel}>Cancel</md-button>
                  <md-button variant="text" @click=${this.handleConfirm}>OK</md-button>
                </slot>
              </div>
            `
          : nothing}
      </div>

      ${this.supportingText || this.errorText
        ? html`
            <div class="supporting-text">
              ${this.error ? (this.errorText || this.supportingText) : this.supportingText}
            </div>
          `
        : nothing}
    `;
  }

  override render() {
    if (this.variant === 'modal') {
      return html`
        <dialog
          @cancel=${this.handleCancel}
          @click=${(e: MouseEvent) => {
            if (e.target === this.dialogElement) {
              this.handleCancel();
            }
          }}
        >
          ${this.renderPickerSurface()}
        </dialog>
      `;
    }

    return this.renderPickerSurface();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-date-picker': MdDatePicker;
  }
}
