import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdTimePicker } from '../src/components/time-picker/time-picker.js';

describe('md-time-picker', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should initialize with default time and format', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.format).toBe('12h');
    expect(picker.view).toBe('dial');
    expect(picker.activeField).toBe('hour');
    expect(picker.value).toBeTruthy();
  });

  it('should parse 12h format values with AM and PM', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.format = '12h';
    picker.value = '08:45 AM';
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.selectedHour).toBe(8);
    expect(picker.selectedMinute).toBe(45);
    expect(picker.selectedPeriod).toBe('AM');
    expect(picker.getFormattedTime()).toBe('08:45 AM');
    expect(picker.getFormatted24()).toBe('08:45');
    expect(picker.getFormatted12()).toBe('08:45 AM');

    picker.value = '09:15 PM';
    await picker.updateComplete;

    expect(picker.selectedHour).toBe(9);
    expect(picker.selectedMinute).toBe(15);
    expect(picker.selectedPeriod).toBe('PM');
    expect(picker.getFormatted24()).toBe('21:15');
    expect(picker.getFormatted12()).toBe('09:15 PM');
  });

  it('should parse 24h format values', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.format = '24h';
    picker.value = '17:30';
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.selectedHour).toBe(17);
    expect(picker.selectedMinute).toBe(30);
    expect(picker.getFormattedTime()).toBe('17:30');
    expect(picker.getFormatted24()).toBe('17:30');
    expect(picker.getFormatted12()).toBe('05:30 PM');
  });

  it('should toggle period when AM/PM buttons are clicked in 12h mode', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.format = '12h';
    picker.value = '10:00 AM';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const pmBtn = picker.shadowRoot?.querySelectorAll<HTMLButtonElement>('.period-button')[1];
    expect(pmBtn).toBeTruthy();

    let inputFired = false;
    picker.addEventListener('input', () => {
      inputFired = true;
    });

    pmBtn?.click();
    await picker.updateComplete;

    expect(picker.selectedPeriod).toBe('PM');
    expect(picker.value).toBe('10:00 PM');
    expect(inputFired).toBe(true);
  });

  it('should toggle between clock dial and text input views', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.view).toBe('dial');
    expect(picker.shadowRoot?.querySelector('.dial-container')).toBeTruthy();

    const switchBtn = picker.shadowRoot?.querySelector<HTMLButtonElement>('.mode-switch-btn');
    switchBtn?.click();
    await picker.updateComplete;

    expect(picker.view).toBe('input');
    expect(picker.shadowRoot?.querySelector('.time-input')).toBeTruthy();

    switchBtn?.click();
    await picker.updateComplete;

    expect(picker.view).toBe('dial');
  });

  it('should switch active field between hour and minute', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.activeField).toBe('hour');

    const minuteCard = picker.shadowRoot?.querySelectorAll<HTMLButtonElement>('.time-card')[1];
    minuteCard?.click();
    await picker.updateComplete;

    expect(picker.activeField).toBe('minute');
  });

  it('should handle text inputs in input mode', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.view = 'input';
    picker.format = '24h';
    picker.value = '10:15';
    document.body.appendChild(picker);
    await picker.updateComplete;

    const hourInput = picker.shadowRoot?.querySelector<HTMLInputElement>('#hour-input');
    const minuteInput = picker.shadowRoot?.querySelector<HTMLInputElement>('#minute-input');

    expect(hourInput?.value).toBe('10');
    expect(minuteInput?.value).toBe('15');

    if (hourInput) {
      hourInput.value = '18';
      hourInput.dispatchEvent(new Event('input'));
    }
    if (minuteInput) {
      minuteInput.value = '45';
      minuteInput.dispatchEvent(new Event('input'));
    }
    await picker.updateComplete;

    expect(picker.selectedHour).toBe(18);
    expect(picker.selectedMinute).toBe(45);
    expect(picker.value).toBe('18:45');
  });

  it('should support modal open, close, confirm and cancel actions', async () => {
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.modal = true;
    document.body.appendChild(picker);
    await picker.updateComplete;

    expect(picker.open).toBe(false);

    let openFired = false;
    picker.addEventListener('open', () => {
      openFired = true;
    });

    picker.showModal();
    await picker.updateComplete;

    expect(picker.open).toBe(true);
    expect(openFired).toBe(true);

    let confirmFired = false;
    let changeFired = false;
    picker.addEventListener('confirm', () => {
      confirmFired = true;
    });
    picker.addEventListener('change', () => {
      changeFired = true;
    });

    picker.confirm();
    await picker.updateComplete;

    expect(confirmFired).toBe(true);
    expect(changeFired).toBe(true);
    expect(picker.open).toBe(false);

    let cancelFired = false;
    picker.addEventListener('cancel', () => {
      cancelFired = true;
    });

    picker.show();
    await picker.updateComplete;
    expect(picker.open).toBe(true);

    picker.cancel();
    await picker.updateComplete;
    expect(cancelFired).toBe(true);
    expect(picker.open).toBe(false);
  });

  it('should participate in form reset', async () => {
    const form = document.createElement('form');
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.name = 'meeting_time';
    picker.value = '04:15 PM';
    form.appendChild(picker);
    document.body.appendChild(form);
    await picker.updateComplete;

    expect(picker.name).toBe('meeting_time');
    picker.value = '08:00 AM';
    await picker.updateComplete;

    picker.formResetCallback();
    await picker.updateComplete;

    expect(picker.value).toBe('04:15 PM');
  });

  it('should participate in constraint validation (FACE)', async () => {
    const form = document.createElement('form');
    const picker = document.createElement('md-time-picker') as MdTimePicker;
    picker.name = 'shift_time';
    picker.format = '24h';
    picker.required = true;
    picker.min = '09:00';
    picker.max = '17:00';
    picker.value = '10:00';
    form.appendChild(picker);
    document.body.appendChild(form);
    await picker.updateComplete;

    expect(picker.checkValidity()).toBe(true);

    // Value before min
    picker.value = '08:30';
    await picker.updateComplete;
    expect(picker.checkValidity()).toBe(false);

    // Value after max
    picker.value = '18:00';
    await picker.updateComplete;
    expect(picker.checkValidity()).toBe(false);

    // Value within range
    picker.value = '14:30';
    await picker.updateComplete;
    expect(picker.checkValidity()).toBe(true);

    // Empty value with required
    picker.value = '';
    await picker.updateComplete;
    expect(picker.checkValidity()).toBe(false);

    // Disabled state bypasses validation
    picker.disabled = true;
    await picker.updateComplete;
    expect(picker.willValidate).toBe(false);
  });
});

