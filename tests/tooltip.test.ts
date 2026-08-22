import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '../src/index.js';
import { MdTooltip } from '../src/components/tooltip/tooltip.js';

describe('md-tooltip', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render plain tooltip with default attributes', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.value = 'Favorite item';
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    expect(tooltip.open).toBe(false);
    expect(tooltip.rich).toBe(false);
    expect(tooltip.position).toBe('bottom');

    const panel = tooltip.shadowRoot?.querySelector('.tooltip');
    expect(panel).toBeTruthy();
    expect(panel?.getAttribute('role')).toBe('tooltip');
  });

  it('should support position variants (top, bottom, left, right)', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.value = 'Description';
    document.body.appendChild(tooltip);

    const positions = ['top', 'bottom', 'left', 'right'] as const;
    for (const pos of positions) {
      tooltip.position = pos;
      await tooltip.updateComplete;
      expect(tooltip.getAttribute('position')).toBe(pos);
    }
  });

  it('should render rich tooltip with headline, text, and action text', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.rich = true;
    tooltip.headline = 'Rich Tooltip Title';
    tooltip.text = 'Detailed supporting explanation goes here.';
    tooltip.actionText = 'Learn more';
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    expect(tooltip.rich).toBe(true);

    const headline = tooltip.shadowRoot?.querySelector('.headline');
    const supportingText = tooltip.shadowRoot?.querySelector('.supporting-text');
    const actionBtn = tooltip.shadowRoot?.querySelector('.action-button');

    expect(headline?.textContent).toContain('Rich Tooltip Title');
    expect(supportingText?.textContent).toContain('Detailed supporting explanation goes here.');
    expect(actionBtn?.textContent?.trim()).toBe('Learn more');
  });

  it('should show and hide programmatically and emit open and close events', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.value = 'Information';
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    let openFired = false;
    let closeFired = false;
    tooltip.addEventListener('open', () => {
      openFired = true;
    });
    tooltip.addEventListener('close', () => {
      closeFired = true;
    });

    tooltip.show();
    await tooltip.updateComplete;

    expect(tooltip.open).toBe(true);
    expect(openFired).toBe(true);

    tooltip.close();
    await tooltip.updateComplete;

    expect(tooltip.open).toBe(false);
    expect(closeFired).toBe(true);
  });

  it('should toggle open state with toggle()', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    tooltip.toggle();
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(true);

    tooltip.toggle();
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(false);
  });

  it('should associate with target element using for attribute and respond to hover events with delay', async () => {
    const btn = document.createElement('button');
    btn.id = 'target-btn';
    btn.textContent = 'Hover me';
    document.body.appendChild(btn);

    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.for = 'target-btn';
    tooltip.value = 'Button tooltip';
    tooltip.showDelay = 300;
    tooltip.hideDelay = 100;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    // Anchor mouseenter starts show delay
    btn.dispatchEvent(new MouseEvent('mouseenter'));
    expect(tooltip.open).toBe(false);

    vi.advanceTimersByTime(300);
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(true);

    // Anchor mouseleave starts hide delay
    btn.dispatchEvent(new MouseEvent('mouseleave'));
    expect(tooltip.open).toBe(true);

    vi.advanceTimersByTime(100);
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(false);
  });

  it('should show immediately on anchor focusin and hide on anchor focusout', async () => {
    const btn = document.createElement('button');
    btn.id = 'focus-btn';
    document.body.appendChild(btn);

    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.for = 'focus-btn';
    tooltip.value = 'Focus tooltip';
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    btn.dispatchEvent(new FocusEvent('focusin'));
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(true);

    btn.dispatchEvent(new FocusEvent('focusout'));
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(false);
  });

  it('should associate with target using direct anchor property', async () => {
    const customDiv = document.createElement('div');
    document.body.appendChild(customDiv);

    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.anchor = customDiv;
    tooltip.value = 'Custom Anchor';
    tooltip.showDelay = 0;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    customDiv.dispatchEvent(new MouseEvent('mouseenter'));
    await tooltip.updateComplete;
    expect(tooltip.open).toBe(true);
  });

  it('should dispatch action event when rich tooltip action button is clicked', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.rich = true;
    tooltip.actionText = 'Dismiss';
    tooltip.open = true;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    let actionFired = false;
    tooltip.addEventListener('action', () => {
      actionFired = true;
    });

    const actionBtn = tooltip.shadowRoot?.querySelector('.action-button') as HTMLButtonElement;
    actionBtn.click();
    await tooltip.updateComplete;

    expect(actionFired).toBe(true);
    expect(tooltip.open).toBe(false);
  });

  it('should close on Escape key press when open', async () => {
    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.open = true;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await tooltip.updateComplete;

    expect(tooltip.open).toBe(false);
  });

  it('should not show when disabled', async () => {
    const btn = document.createElement('button');
    btn.id = 'disabled-btn';
    document.body.appendChild(btn);

    const tooltip = document.createElement('md-tooltip') as MdTooltip;
    tooltip.for = 'disabled-btn';
    tooltip.disabled = true;
    tooltip.showDelay = 0;
    document.body.appendChild(tooltip);
    await tooltip.updateComplete;

    btn.dispatchEvent(new MouseEvent('mouseenter'));
    tooltip.show();
    await tooltip.updateComplete;

    expect(tooltip.open).toBe(false);
  });
});
