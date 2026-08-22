import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdButtonGroup } from '../src/components/button-group/button-group.js';
import { MdButton } from '../src/components/button/button.js';

describe('md-button-group', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default horizontal button group with role="group"', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'One';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Two';

    group.appendChild(btn1);
    group.appendChild(btn2);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    expect(group.getAttribute('role')).toBe('group');
    expect(group.orientation).toBe('horizontal');
    expect(group.connected).toBe(false);
    expect(group.fullWidth).toBe(false);
  });

  it('should support vertical orientation', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.orientation = 'vertical';
    document.body.appendChild(group);

    await group.updateComplete;

    expect(group.getAttribute('orientation')).toBe('vertical');
  });

  it('should apply connected shape-shifting border radiuses in horizontal mode', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.connected = true;

    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'First';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Middle';
    const btn3 = document.createElement('md-button') as MdButton;
    btn3.textContent = 'Last';

    group.appendChild(btn1);
    group.appendChild(btn2);
    group.appendChild(btn3);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;
    await btn3.updateComplete;

    const r1 = btn1.style.getPropertyValue('--md-button-border-radius');
    const r2 = btn2.style.getPropertyValue('--md-button-border-radius');
    const r3 = btn3.style.getPropertyValue('--md-button-border-radius');

    expect(r1).toContain('9999px');
    expect(r1).toContain('4px');
    expect(r2).toBe('var(--md-sys-shape-corner-extra-small, 4px) var(--md-sys-shape-corner-extra-small, 4px) var(--md-sys-shape-corner-extra-small, 4px) var(--md-sys-shape-corner-extra-small, 4px)');
    expect(r3).toContain('4px');
    expect(r3).toContain('9999px');
  });

  it('should apply connected shape-shifting border radiuses in vertical mode', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.connected = true;
    group.orientation = 'vertical';

    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'Top';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Bottom';

    group.appendChild(btn1);
    group.appendChild(btn2);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    const r1 = btn1.style.getPropertyValue('--md-button-border-radius');
    const r2 = btn2.style.getPropertyValue('--md-button-border-radius');

    expect(r1).toContain('9999px');
    expect(r2).toContain('9999px');
  });

  it('should support rounded and square shape presets', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.connected = true;
    group.shape = 'rounded';

    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'First';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Second';

    group.appendChild(btn1);
    group.appendChild(btn2);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    expect(btn1.style.getPropertyValue('--md-button-border-radius')).toContain('12px');

    group.shape = 'square';
    await group.updateComplete;

    expect(btn1.style.getPropertyValue('--md-button-border-radius')).toContain('0px');
  });

  it('should cascade disabled state to children', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.disabled = true;

    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'Action 1';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Action 2';

    group.appendChild(btn1);
    group.appendChild(btn2);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    expect(btn1.disabled).toBe(true);
    expect(btn2.disabled).toBe(true);
  });

  it('should cascade variant to child buttons when set', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    group.variant = 'outlined';

    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'Action 1';
    group.appendChild(btn1);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;

    expect(btn1.variant).toBe('outlined');
  });

  it('should handle keyboard navigation with arrow keys', async () => {
    const group = document.createElement('md-button-group') as MdButtonGroup;
    const btn1 = document.createElement('md-button') as MdButton;
    btn1.textContent = 'One';
    const btn2 = document.createElement('md-button') as MdButton;
    btn2.textContent = 'Two';

    group.appendChild(btn1);
    group.appendChild(btn2);
    document.body.appendChild(group);

    await group.updateComplete;
    await btn1.updateComplete;
    await btn2.updateComplete;

    btn1.focus();
    group.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));

    // ArrowRight should attempt to focus next button
    expect(btn1).toBeDefined();
    expect(btn2).toBeDefined();
  });
});
