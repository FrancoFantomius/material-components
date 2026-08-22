import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdDatePicker } from '../src/components/date-picker/date-picker.js';

describe('md-date-picker', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render docked date picker with header and calendar grid', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.value = '2026-08-22';
    picker.label = 'Select date';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const surface = picker.shadowRoot?.querySelector('.picker-surface');
    expect(surface).toBeTruthy();

    const subhead = picker.shadowRoot?.querySelector('.subhead');
    expect(subhead?.textContent?.trim()).toBe('Select date');

    const headline = picker.shadowRoot?.querySelector('.headline');
    expect(headline?.textContent).toContain('Aug 22');

    const weekdays = picker.shadowRoot?.querySelectorAll('.weekday');
    expect(weekdays?.length).toBe(7);

    const dayBtns = picker.shadowRoot?.querySelectorAll('.day-btn');
    expect(dayBtns && dayBtns.length > 0).toBe(true);

    const selectedBtn = picker.shadowRoot?.querySelector('.day-btn.selected');
    expect(selectedBtn?.getAttribute('aria-label')).toBe('2026-08-22');
  });

  it('should update value and dispatch events when clicking a day in single mode', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.value = '2026-08-10';
    document.body.appendChild(picker);
    await picker.updateComplete;

    let changeFired = false;
    let inputFired = false;
    let selectFired = false;
    let selectedDate = '';

    picker.addEventListener('change', (e: any) => {
      changeFired = true;
      selectedDate = e.detail?.value;
    });
    picker.addEventListener('input', () => {
      inputFired = true;
    });
    picker.addEventListener('select', () => {
      selectFired = true;
    });

    const targetBtn = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-15"]') as HTMLButtonElement;
    expect(targetBtn).toBeTruthy();
    targetBtn.click();
    await picker.updateComplete;

    expect(picker.value).toBe('2026-08-15');
    expect(changeFired).toBe(true);
    expect(inputFired).toBe(true);
    expect(selectFired).toBe(true);
    expect(selectedDate).toBe('2026-08-15');
  });

  it('should navigate months correctly', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.value = '2026-08-15';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const monthYearText = picker.shadowRoot?.querySelector('.month-year-btn span');
    expect(monthYearText?.textContent).toBe('August 2026');

    const nextBtn = picker.shadowRoot?.querySelector('md-icon-button[icon="chevron_right"]') as HTMLElement;
    nextBtn.click();
    await picker.updateComplete;

    expect(monthYearText?.textContent).toBe('September 2026');

    const prevBtn = picker.shadowRoot?.querySelector('md-icon-button[icon="chevron_left"]') as HTMLElement;
    prevBtn.click();
    await picker.updateComplete;

    expect(monthYearText?.textContent).toBe('August 2026');
  });

  it('should toggle year picker view and select a year', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.value = '2026-08-15';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const toggleBtn = picker.shadowRoot?.querySelector('.month-year-btn') as HTMLButtonElement;
    toggleBtn.click();
    await picker.updateComplete;

    const yearPickerView = picker.shadowRoot?.querySelector('.year-picker-view');
    expect(yearPickerView).toBeTruthy();

    const targetYearBtn = Array.from(picker.shadowRoot?.querySelectorAll('.year-btn') || [])
      .find(btn => btn.textContent?.trim() === '2028') as HTMLButtonElement;
    expect(targetYearBtn).toBeTruthy();
    targetYearBtn.click();
    await picker.updateComplete;

    // Returns to calendar view with 2028
    const monthYearText = picker.shadowRoot?.querySelector('.month-year-btn span');
    expect(monthYearText?.textContent).toBe('August 2028');
  });

  it('should handle date range selection mode', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.range = true;
    picker.value = '2026-08-10/2026-08-20';
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.startDate).toBe('2026-08-10');
    expect(picker.endDate).toBe('2026-08-20');

    const startBtn = picker.shadowRoot?.querySelector('.day-btn.range-start');
    const endBtn = picker.shadowRoot?.querySelector('.day-btn.range-end');
    expect(startBtn?.getAttribute('aria-label')).toBe('2026-08-10');
    expect(endBtn?.getAttribute('aria-label')).toBe('2026-08-20');

    const inRangeBands = picker.shadowRoot?.querySelectorAll('.range-band');
    expect(inRangeBands && inRangeBands.length > 0).toBe(true);

    // Test clicking new start and end date
    const day12 = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-12"]') as HTMLButtonElement;
    day12.click();
    await picker.updateComplete;

    expect(picker.startDate).toBe('2026-08-12');
    expect(picker.endDate).toBe('');

    let rangeChangeFired = false;
    picker.addEventListener('change', (e: any) => {
      rangeChangeFired = true;
      expect(e.detail.startDate).toBe('2026-08-12');
      expect(e.detail.endDate).toBe('2026-08-25');
    });

    const day25 = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-25"]') as HTMLButtonElement;
    day25.click();
    await picker.updateComplete;

    expect(picker.startDate).toBe('2026-08-12');
    expect(picker.endDate).toBe('2026-08-25');
    expect(picker.value).toBe('2026-08-12/2026-08-25');
    expect(rangeChangeFired).toBe(true);
  });

  it('should enforce min and max date constraints', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.min = '2026-08-10';
    picker.max = '2026-08-20';
    picker.value = '2026-08-15';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const beforeMin = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-05"]') as HTMLButtonElement;
    expect(beforeMin.disabled).toBe(true);
    expect(beforeMin.classList.contains('disabled')).toBe(true);

    const afterMax = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-25"]') as HTMLButtonElement;
    expect(afterMax.disabled).toBe(true);
    expect(afterMax.classList.contains('disabled')).toBe(true);

    const validDay = picker.shadowRoot?.querySelector('button.day-btn[aria-label="2026-08-15"]') as HTMLButtonElement;
    expect(validDay.disabled).toBe(false);
  });

  it('should participate in form submission and validation (FACE)', async () => {
    const form = document.createElement('form');
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.name = 'birthday';
    picker.required = true;
    form.appendChild(picker);
    document.body.appendChild(form);
    await picker.updateComplete;

    expect(picker.checkValidity()).toBe(false);

    picker.value = '2026-08-22';
    await picker.updateComplete;
    expect(picker.checkValidity()).toBe(true);

    // Form reset
    picker.reset();
    await picker.updateComplete;
    expect(picker.value).toBe('');
    expect(picker.checkValidity()).toBe(false);
  });

  it('should support modal dialog variant', async () => {
    const picker = document.createElement('md-date-picker') as MdDatePicker;
    picker.variant = 'modal';
    picker.value = '2026-08-22';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const dialog = picker.shadowRoot?.querySelector('dialog');
    expect(dialog).toBeTruthy();

    let openFired = false;
    let closeFired = false;
    picker.addEventListener('open', () => {
      openFired = true;
    });
    picker.addEventListener('close', () => {
      closeFired = true;
    });

    picker.show();
    await picker.updateComplete;
    expect(picker.open).toBe(true);
    expect(openFired).toBe(true);

    picker.close();
    await picker.updateComplete;
    expect(picker.open).toBe(false);
    expect(closeFired).toBe(true);
  });
});
