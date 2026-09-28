import type { ReactiveController } from 'lit';
import type { MdBaseElement } from './base-component.js';

export type AriaTooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

const TOOLTIP_STYLE_ID = 'md-aria-label-tooltip-styles';

let tooltipElement: HTMLElement | null = null;
let activeHost: HTMLElement | null = null;
let showTimeout: ReturnType<typeof setTimeout> | null = null;
let hideTimeout: ReturnType<typeof setTimeout> | null = null;

function ensureTooltipStyles(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(TOOLTIP_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = TOOLTIP_STYLE_ID;
  style.textContent = `
    .md-aria-label-tooltip {
      position: fixed;
      z-index: 10000;
      pointer-events: none;
      box-sizing: border-box;
      background-color: var(--md-sys-color-inverse-surface, #313033);
      color: var(--md-sys-color-inverse-on-surface, #F4EFF4);
      border-radius: var(--md-sys-shape-corner-extra-small, 4px);
      padding: 4px 8px;
      font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif);
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      letter-spacing: 0.4px;
      min-height: 24px;
      max-width: 240px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-shadow: var(--md-sys-elevation-level1, 0 1px 3px rgba(0, 0, 0, 0.2));
      user-select: none;
      word-wrap: break-word;
      opacity: 0;
      visibility: hidden;
      transform: scale(0.92);
      transition:
        opacity 150ms cubic-bezier(0, 0, 0.2, 1),
        transform 150ms cubic-bezier(0, 0, 0.2, 1),
        visibility 150ms linear;
    }

    .md-aria-label-tooltip.md-tooltip-visible {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  `;
  document.head.appendChild(style);
}

function getTooltipElement(): HTMLElement {
  ensureTooltipStyles();
  if (typeof document !== 'undefined') {
    if (!tooltipElement) {
      tooltipElement = document.createElement('div');
      tooltipElement.className = 'md-aria-label-tooltip';
      tooltipElement.setAttribute('role', 'tooltip');
      tooltipElement.setAttribute('aria-hidden', 'true');
    }
    if (!document.body.contains(tooltipElement)) {
      document.body.appendChild(tooltipElement);
    }
  }
  return tooltipElement!;
}

/**
 * Calculates and applies fixed viewport coordinates for the tooltip relative to an anchor.
 */
export function positionTooltip(
  anchor: HTMLElement,
  tooltip: HTMLElement,
  preferredPosition: AriaTooltipPosition = 'bottom'
): void {
  const anchorRect = anchor.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();

  const tWidth = tooltipRect.width || 80;
  const tHeight = tooltipRect.height || 24;
  const offset = 4;
  const padding = 8;

  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

  let pos = preferredPosition === 'auto' ? 'bottom' : preferredPosition;

  // Auto-flip if placement overflows the viewport
  if (
    pos === 'bottom' &&
    anchorRect.bottom + tHeight + offset > viewportHeight - padding &&
    anchorRect.top - tHeight - offset > padding
  ) {
    pos = 'top';
  } else if (
    pos === 'top' &&
    anchorRect.top - tHeight - offset < padding &&
    anchorRect.bottom + tHeight + offset < viewportHeight - padding
  ) {
    pos = 'bottom';
  } else if (
    pos === 'left' &&
    anchorRect.left - tWidth - offset < padding &&
    anchorRect.right + tWidth + offset < viewportWidth - padding
  ) {
    pos = 'right';
  } else if (
    pos === 'right' &&
    anchorRect.right + tWidth + offset > viewportWidth - padding &&
    anchorRect.left - tWidth - offset > padding
  ) {
    pos = 'left';
  }

  let top = 0;
  let left = 0;

  switch (pos) {
    case 'top':
      top = anchorRect.top - tHeight - offset;
      left = anchorRect.left + (anchorRect.width - tWidth) / 2;
      break;
    case 'bottom':
      top = anchorRect.bottom + offset;
      left = anchorRect.left + (anchorRect.width - tWidth) / 2;
      break;
    case 'left':
      top = anchorRect.top + (anchorRect.height - tHeight) / 2;
      left = anchorRect.left - tWidth - offset;
      break;
    case 'right':
      top = anchorRect.top + (anchorRect.height - tHeight) / 2;
      left = anchorRect.right + offset;
      break;
  }

  // Clamping into viewport boundaries
  left = Math.max(padding, Math.min(left, viewportWidth - tWidth - padding));
  top = Math.max(padding, Math.min(top, viewportHeight - tHeight - padding));

  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;
}

/**
 * Displays the Material Design tooltip for an anchor element with the given text.
 */
export function showAriaTooltip(
  host: HTMLElement,
  text: string,
  position: AriaTooltipPosition = 'bottom'
): void {
  if (!text || typeof document === 'undefined') return;

  if (hideTimeout !== null) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }

  const tooltip = getTooltipElement();
  tooltip.textContent = text;
  tooltip.setAttribute('aria-hidden', 'false');
  activeHost = host;

  positionTooltip(host, tooltip, position);
  tooltip.classList.add('md-tooltip-visible');

  // Recalculate position once dimensions are rendered
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      if (activeHost === host && tooltipElement) {
        positionTooltip(host, tooltipElement, position);
      }
    });
  }
}

/**
 * Hides the active Material Design aria-label tooltip.
 */
export function hideAriaTooltip(host?: HTMLElement): void {
  if (host && activeHost !== host) return;

  if (showTimeout !== null) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }

  if (!tooltipElement) return;

  tooltipElement.classList.remove('md-tooltip-visible');
  tooltipElement.setAttribute('aria-hidden', 'true');
  activeHost = null;
}

/**
 * Reactive controller attached to MdBaseElement that displays an accessible,
 * floating Material Design tooltip for components with aria-label/arial-label/title,
 * while preventing default browser tooltip UI from showing.
 */
export class AriaLabelTooltipController implements ReactiveController {
  private host: MdBaseElement;
  private observer: MutationObserver | null = null;
  public showDelay = 300;
  public hideDelay = 100;

  constructor(host: MdBaseElement) {
    this.host = host;
    host.addController(this);
  }

  /**
   * Retrieves the label string and suppresses default browser tooltip UI if title is used.
   */
  public getLabelText(): string {
    if (this.host.localName === 'md-tooltip') return '';
    if (this.host.hasAttribute('no-tooltip') || this.host.hasAttribute('disable-tooltip')) return '';

    // Suppress browser native title tooltip and migrate to aria-label
    if (this.host.hasAttribute('title')) {
      const titleVal = this.host.getAttribute('title');
      if (titleVal) {
        if (!this.host.hasAttribute('aria-label')) {
          this.host.setAttribute('aria-label', titleVal);
        }
        this.host.removeAttribute('title');
      }
    }

    const attrVal =
      this.host.getAttribute('aria-label') ||
      this.host.getAttribute('arial-label') ||
      (this.host as unknown as { ariaLabelText?: string }).ariaLabelText ||
      (this.host as unknown as { ariaLabel?: string }).ariaLabel ||
      this.host.getAttribute('data-tooltip') ||
      '';

    return typeof attrVal === 'string' ? attrVal.trim() : '';
  }

  public getTooltipPosition(): AriaTooltipPosition {
    const pos = (
      this.host.getAttribute('tooltip-position') ||
      this.host.getAttribute('data-tooltip-position') ||
      'bottom'
    ).toLowerCase();

    if (pos === 'top' || pos === 'bottom' || pos === 'left' || pos === 'right' || pos === 'auto') {
      return pos as AriaTooltipPosition;
    }
    return 'bottom';
  }

  private handleMouseEnter = (): void => {
    const text = this.getLabelText();
    if (!text) return;

    if (hideTimeout !== null) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    if (showTimeout !== null) {
      clearTimeout(showTimeout);
    }

    if (this.showDelay > 0) {
      showTimeout = setTimeout(() => {
        showAriaTooltip(this.host, text, this.getTooltipPosition());
      }, this.showDelay);
    } else {
      showAriaTooltip(this.host, text, this.getTooltipPosition());
    }
  };

  private handleMouseLeave = (): void => {
    if (showTimeout !== null) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }

    if (this.hideDelay > 0) {
      if (hideTimeout !== null) {
        clearTimeout(hideTimeout);
      }
      hideTimeout = setTimeout(() => {
        hideAriaTooltip(this.host);
      }, this.hideDelay);
    } else {
      hideAriaTooltip(this.host);
    }
  };

  private handleFocusIn = (): void => {
    const text = this.getLabelText();
    if (!text) return;

    if (showTimeout !== null) {
      clearTimeout(showTimeout);
      showTimeout = null;
    }

    showAriaTooltip(this.host, text, this.getTooltipPosition());
  };

  private handleFocusOut = (): void => {
    hideAriaTooltip(this.host);
  };

  private handlePointerDown = (): void => {
    hideAriaTooltip(this.host);
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') {
      hideAriaTooltip(this.host);
    }
  };

  private handleWindowChange = (): void => {
    if (activeHost === this.host && tooltipElement) {
      positionTooltip(this.host, tooltipElement, this.getTooltipPosition());
    }
  };

  private sanitizeTitle(): void {
    if (this.host.hasAttribute('title')) {
      const titleVal = this.host.getAttribute('title');
      if (titleVal) {
        if (!this.host.hasAttribute('aria-label')) {
          this.host.setAttribute('aria-label', titleVal);
        }
        this.host.removeAttribute('title');
      }
    }
  }

  hostConnected(): void {
    this.host.addEventListener('mouseenter', this.handleMouseEnter);
    this.host.addEventListener('mouseleave', this.handleMouseLeave);
    this.host.addEventListener('focusin', this.handleFocusIn);
    this.host.addEventListener('focusout', this.handleFocusOut);
    this.host.addEventListener('pointerdown', this.handlePointerDown);

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('resize', this.handleWindowChange);
      window.addEventListener('scroll', this.handleWindowChange, true);
    }

    this.sanitizeTitle();

    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(() => {
        this.sanitizeTitle();
        if (activeHost === this.host) {
          const text = this.getLabelText();
          if (text) {
            showAriaTooltip(this.host, text, this.getTooltipPosition());
          } else {
            hideAriaTooltip(this.host);
          }
        }
      });
      this.observer.observe(this.host, {
        attributes: true,
        attributeFilter: ['aria-label', 'arial-label', 'title', 'tooltip-position', 'no-tooltip', 'disable-tooltip'],
      });
    }
  }

  hostDisconnected(): void {
    this.host.removeEventListener('mouseenter', this.handleMouseEnter);
    this.host.removeEventListener('mouseleave', this.handleMouseLeave);
    this.host.removeEventListener('focusin', this.handleFocusIn);
    this.host.removeEventListener('focusout', this.handleFocusOut);
    this.host.removeEventListener('pointerdown', this.handlePointerDown);

    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('resize', this.handleWindowChange);
      window.removeEventListener('scroll', this.handleWindowChange, true);
    }

    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    hideAriaTooltip(this.host);
  }
}
