import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSegmentedButton, MdSegmentedButtonSet } from '../src/components/segmented-button/segmented-button.js';

describe('md-segmented-button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render label and toggle selected state when clicked standalone', async () => {
    const btn = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn.label = 'Songs';
    document.body.appendChild(btn);
    await btn.updateComplete;

    expect(btn.selected).toBe(false);
    expect(btn.getAttribute('aria-pressed')).toBe('false');

    let changeFired = false;
    btn.addEventListener('change', () => {
      changeFired = true;
    });

    btn.click();
    await btn.updateComplete;

    expect(btn.selected).toBe(true);
    expect(btn.getAttribute('aria-pressed')).toBe('true');
    expect(changeFired).toBe(true);
  });

  it('should render checkmark when selected unless noCheckmark is true', async () => {
    const btn = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn.label = 'Albums';
    btn.selected = true;
    document.body.appendChild(btn);
    await btn.updateComplete;

    const checkmark = btn.shadowRoot?.querySelector('.checkmark-icon');
    expect(checkmark).toBeTruthy();

    btn.noCheckmark = true;
    await btn.updateComplete;
    const checkmarkAfter = btn.shadowRoot?.querySelector('.checkmark-icon');
    expect(checkmarkAfter).toBeNull();
  });

  it('should not be clickable when disabled', async () => {
    const btn = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn.label = 'Podcasts';
    btn.disabled = true;
    document.body.appendChild(btn);
    await btn.updateComplete;

    let clicked = false;
    btn.addEventListener('change', () => {
      clicked = true;
    });

    btn.click();
    await btn.updateComplete;

    expect(btn.selected).toBe(false);
    expect(clicked).toBe(false);
  });
});

describe('md-segmented-button-set', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should support single-select mode and toggle active segment', async () => {
    const set = document.createElement('md-segmented-button-set') as MdSegmentedButtonSet;
    const btn1 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn1.label = 'Songs';
    btn1.selected = true;

    const btn2 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn2.label = 'Albums';

    const btn3 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn3.label = 'Podcasts';

    set.appendChild(btn1);
    set.appendChild(btn2);
    set.appendChild(btn3);
    document.body.appendChild(set);

    await set.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;
    await btn3.updateComplete;

    expect(btn1.selected).toBe(true);
    expect(btn2.selected).toBe(false);
    expect(btn3.selected).toBe(false);

    let eventDetail: any = null;
    set.addEventListener('change', (e: any) => {
      eventDetail = e.detail;
    });

    btn2.click();
    await set.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;
    await btn3.updateComplete;

    expect(btn1.selected).toBe(false);
    expect(btn2.selected).toBe(true);
    expect(btn3.selected).toBe(false);
    expect(eventDetail.value).toBe('Albums');
    expect(eventDetail.index).toBe(1);
    expect(eventDetail.values).toEqual(['Albums']);
  });

  it('should support multi-select mode', async () => {
    const set = document.createElement('md-segmented-button-set') as MdSegmentedButtonSet;
    set.multiselect = true;

    const btn1 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn1.label = 'Option 1';
    btn1.selected = true;

    const btn2 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn2.label = 'Option 2';

    set.appendChild(btn1);
    set.appendChild(btn2);
    document.body.appendChild(set);

    await set.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    btn2.click();
    await set.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    expect(btn1.selected).toBe(true);
    expect(btn2.selected).toBe(true);

    btn1.click();
    await set.updateComplete;
    await btn1.updateComplete;

    expect(btn1.selected).toBe(false);
    expect(btn2.selected).toBe(true);
  });

  it('should cascade disabled state when set is disabled', async () => {
    const set = document.createElement('md-segmented-button-set') as MdSegmentedButtonSet;
    set.disabled = true;

    const btn1 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn1.label = 'Songs';
    set.appendChild(btn1);
    document.body.appendChild(set);

    await set.updateComplete;
    await btn1.updateComplete;

    expect(btn1.disabled).toBe(true);
  });

  it('should handle keyboard navigation with arrow keys', async () => {
    const set = document.createElement('md-segmented-button-set') as MdSegmentedButtonSet;
    const btn1 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn1.label = 'One';
    const btn2 = document.createElement('md-segmented-button') as MdSegmentedButton;
    btn2.label = 'Two';

    set.appendChild(btn1);
    set.appendChild(btn2);
    document.body.appendChild(set);

    await set.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    btn1.focus();
    set.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    expect(btn2.tabIndex).toBe(0);
    expect(btn1.tabIndex).toBe(-1);
  });
});

