import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSlider } from '../src/components/slider/slider.js';

describe('md-slider', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default slider with initial value', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect(slider.value).toBe(50);
    expect(slider.min).toBe(0);
    expect(slider.max).toBe(100);

    const endThumb = slider.shadowRoot?.querySelector('.end-thumb');
    expect(endThumb).not.toBeNull();
    expect(endThumb?.getAttribute('role')).toBe('slider');
    expect(endThumb?.getAttribute('aria-valuenow')).toBe('50');
  });

  it('should update value and clamp within min and max', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.min = 10;
    slider.max = 50;
    slider.value = 5;
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect(slider.value).toBe(10);

    slider.value = 60;
    await slider.updateComplete;
    expect(slider.value).toBe(50);
  });

  it('should snap value to step', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.min = 0;
    slider.max = 100;
    slider.step = 10;
    slider.value = 23;
    document.body.appendChild(slider);
    await slider.updateComplete;

    expect(slider.value).toBe(20);
  });

  it('should support range slider with start and end thumbs', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.range = true;
    slider.min = 0;
    slider.max = 100;
    slider.valueStart = 25;
    slider.valueEnd = 75;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const startThumb = slider.shadowRoot?.querySelector('.start-thumb');
    const endThumb = slider.shadowRoot?.querySelector('.end-thumb');

    expect(startThumb).not.toBeNull();
    expect(endThumb).not.toBeNull();
    expect(startThumb?.getAttribute('aria-valuenow')).toBe('25');
    expect(endThumb?.getAttribute('aria-valuenow')).toBe('75');
  });

  it('should render tick marks when ticks is enabled', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.min = 0;
    slider.max = 10;
    slider.step = 2;
    slider.ticks = true;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const tickMarks = slider.shadowRoot?.querySelectorAll('.tick-mark');
    expect(tickMarks?.length).toBe(6); // 0, 2, 4, 6, 8, 10
  });

  it('should render value labels when labeled is enabled', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.labeled = true;
    slider.value = 42;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const label = slider.shadowRoot?.querySelector('.value-label');
    expect(label).not.toBeNull();
    expect(label?.textContent?.trim()).toBe('42');
  });

  it('should render leading and trailing icons', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.icon = 'volume_mute';
    slider.trailingIcon = 'volume_up';
    document.body.appendChild(slider);
    await slider.updateComplete;

    const icons = slider.shadowRoot?.querySelectorAll('md-icon');
    expect(icons?.length).toBe(2);
    expect(icons?.[0].textContent?.trim()).toBe('volume_mute');
    expect(icons?.[1].textContent?.trim()).toBe('volume_up');
  });

  it('should participate in form submission and reset', async () => {
    const form = document.createElement('form');
    const slider = document.createElement('md-slider') as MdSlider;
    slider.name = 'volume';
    slider.value = 70;
    form.appendChild(slider);
    document.body.appendChild(form);
    await slider.updateComplete;

    slider.value = 90;
    await slider.updateComplete;
    expect(slider.value).toBe(90);

    slider.formResetCallback();
    await slider.updateComplete;
    expect(slider.value).toBe(70);
  });

  it('should handle keyboard navigation for single slider', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.min = 0;
    slider.max = 100;
    slider.step = 5;
    slider.value = 50;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const thumb = slider.shadowRoot?.querySelector('.end-thumb') as HTMLElement;
    expect(thumb).not.toBeNull();

    // ArrowRight increases
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await slider.updateComplete;
    expect(slider.value).toBe(55);

    // ArrowLeft decreases
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await slider.updateComplete;
    expect(slider.value).toBe(50);

    // Home sets to min
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await slider.updateComplete;
    expect(slider.value).toBe(0);

    // End sets to max
    thumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await slider.updateComplete;
    expect(slider.value).toBe(100);
  });

  it('should handle keyboard navigation for range slider', async () => {
    const slider = document.createElement('md-slider') as MdSlider;
    slider.range = true;
    slider.min = 0;
    slider.max = 100;
    slider.step = 10;
    slider.valueStart = 30;
    slider.valueEnd = 70;
    document.body.appendChild(slider);
    await slider.updateComplete;

    const startThumb = slider.shadowRoot?.querySelector('.start-thumb') as HTMLElement;
    const endThumb = slider.shadowRoot?.querySelector('.end-thumb') as HTMLElement;

    // Move start thumb right
    startThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await slider.updateComplete;
    expect(slider.valueStart).toBe(40);

    // Move end thumb left
    endThumb.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await slider.updateComplete;
    expect(slider.valueEnd).toBe(60);
  });

  it('should support range slider form participation and validation', async () => {
    const form = document.createElement('form');
    const slider = document.createElement('md-slider') as MdSlider;
    slider.range = true;
    slider.nameStart = 'min_price';
    slider.nameEnd = 'max_price';
    slider.valueStart = 20;
    slider.valueEnd = 80;
    slider.required = true;
    form.appendChild(slider);
    document.body.appendChild(form);
    await slider.updateComplete;

    expect(slider.checkValidity()).toBe(true);

    // Disable slider
    slider.disabled = true;
    await slider.updateComplete;
    expect(slider.willValidate).toBe(false);

    slider.disabled = false;
    await slider.updateComplete;
    expect(slider.checkValidity()).toBe(true);

    // Form reset restores initial values
    slider.valueStart = 40;
    slider.valueEnd = 90;
    await slider.updateComplete;

    slider.formResetCallback();
    await slider.updateComplete;
    expect(slider.valueStart).toBe(20);
    expect(slider.valueEnd).toBe(80);
  });
});

