import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import '../src/index.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';
import { MdButton } from '../src/components/button/button.js';
import { MdFab } from '../src/components/fab/fab.js';
import { positionTooltip, type AriaTooltipPosition } from '../src/internal/aria-label-tooltip.js';

describe('aria-label tooltip feature', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    document.body.innerHTML = '';
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should show Material tooltip on hover for components with aria-label', async () => {
    const iconButton = document.createElement('md-icon-button') as MdIconButton;
    iconButton.setAttribute('aria-label', 'Bookmark item');
    document.body.appendChild(iconButton);
    await iconButton.updateComplete;

    // Hover starts show timer
    iconButton.dispatchEvent(new MouseEvent('mouseenter'));

    const tooltipBefore = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltipBefore?.classList.contains('md-tooltip-visible')).toBeFalsy();

    // Advance 300ms show delay
    vi.advanceTimersByTime(300);

    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toBe('Bookmark item');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(true);

    // Mouse leave hides tooltip
    iconButton.dispatchEvent(new MouseEvent('mouseleave'));
    vi.advanceTimersByTime(100);

    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(false);
  });

  it('should show tooltip immediately on focusin and hide on focusout', async () => {
    const button = document.createElement('md-button') as MdButton;
    button.setAttribute('aria-label', 'Submit feedback');
    document.body.appendChild(button);
    await button.updateComplete;

    button.dispatchEvent(new FocusEvent('focusin'));

    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toBe('Submit feedback');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(true);

    button.dispatchEvent(new FocusEvent('focusout'));
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(false);
  });

  it('should suppress native title attribute to prevent default OS browser tooltip UI', async () => {
    const fab = document.createElement('md-fab') as MdFab;
    fab.setAttribute('title', 'Add new contact');
    document.body.appendChild(fab);
    await fab.updateComplete;

    // Native title should be removed and migrated to aria-label to avoid default tooltip
    expect(fab.hasAttribute('title')).toBe(false);
    expect(fab.getAttribute('aria-label')).toBe('Add new contact');

    fab.dispatchEvent(new FocusEvent('focusin'));
    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip?.textContent).toBe('Add new contact');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(true);
  });

  it('should support arial-label attribute typo gracefully', async () => {
    const iconBtn = document.createElement('md-icon-button') as MdIconButton;
    iconBtn.setAttribute('arial-label', 'Delete item');
    document.body.appendChild(iconBtn);
    await iconBtn.updateComplete;

    iconBtn.dispatchEvent(new FocusEvent('focusin'));
    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip?.textContent).toBe('Delete item');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(true);
  });

  it('should not show tooltip when no-tooltip or disable-tooltip is present', async () => {
    const button = document.createElement('md-button') as MdButton;
    button.setAttribute('aria-label', 'Hidden description');
    button.setAttribute('no-tooltip', '');
    document.body.appendChild(button);
    await button.updateComplete;

    button.dispatchEvent(new FocusEvent('focusin'));
    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBeFalsy();
  });

  it('should hide tooltip when Escape key is pressed', async () => {
    const iconBtn = document.createElement('md-icon-button') as MdIconButton;
    iconBtn.setAttribute('aria-label', 'Help dialog');
    document.body.appendChild(iconBtn);
    await iconBtn.updateComplete;

    iconBtn.dispatchEvent(new FocusEvent('focusin'));
    const tooltip = document.body.querySelector('.md-aria-label-tooltip');
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(tooltip?.classList.contains('md-tooltip-visible')).toBe(false);
  });

  it('should correctly position and clamp tooltip in viewport', () => {
    const anchor = document.createElement('div');
    const tooltip = document.createElement('div');
    document.body.appendChild(anchor);
    document.body.appendChild(tooltip);

    vi.spyOn(anchor, 'getBoundingClientRect').mockReturnValue({
      top: 100,
      bottom: 140,
      left: 200,
      right: 280,
      width: 80,
      height: 40,
      x: 200,
      y: 100,
      toJSON: () => {},
    });

    vi.spyOn(tooltip, 'getBoundingClientRect').mockReturnValue({
      top: 0,
      bottom: 24,
      left: 0,
      right: 80,
      width: 80,
      height: 24,
      x: 0,
      y: 0,
      toJSON: () => {},
    });

    const positions: AriaTooltipPosition[] = ['bottom', 'top', 'left', 'right'];
    for (const pos of positions) {
      positionTooltip(anchor, tooltip, pos);
      expect(tooltip.style.top).not.toBe('');
      expect(tooltip.style.left).not.toBe('');
    }
  });
});
