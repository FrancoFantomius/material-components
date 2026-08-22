import { css } from 'lit';

export const carouselStyles = css`
  :host {
    display: block;
    position: relative;
    box-sizing: border-box;
    width: 100%;
    --md-carousel-spacing: 8px;
    --md-carousel-height: auto;
    --md-carousel-item-shape: var(--md-sys-shape-corner-extra-large, 28px);
    --md-carousel-control-size: 44px;
    --md-carousel-control-bg: var(--md-sys-color-surface-container-highest, rgba(255, 255, 255, 0.9));
    --md-carousel-control-color: var(--md-sys-color-on-surface, #1d1b20);
    --md-carousel-indicator-color: var(--md-sys-color-outline-variant, #cac4d0);
    --md-carousel-indicator-active-color: var(--md-sys-color-primary, #6750a4);
  }

  .carousel-root {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .carousel-viewport-wrapper {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: var(--md-carousel-radius, 0px);
  }

  .carousel-scroller {
    display: flex;
    gap: var(--md-carousel-spacing, 8px);
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    scroll-snap-type: x mandatory;
    padding: 4px 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
    height: var(--md-carousel-height, auto);
    touch-action: pan-y pinch-zoom;
    user-select: none;
    -webkit-user-select: none;
  }

  .carousel-scroller::-webkit-scrollbar {
    display: none;
  }

  .carousel-scroller.is-dragging {
    scroll-snap-type: none;
    cursor: grabbing;
  }

  /* Layout variations applied on items via CSS variables */
  :host([layout="full-width"]) {
    --md-carousel-item-width: 100%;
  }

  :host([layout="hero"]) {
    --md-carousel-item-width: clamp(280px, 80%, 720px);
  }

  :host([layout="multi-browse"]),
  :host(:not([layout])) {
    --md-carousel-item-width: clamp(220px, 32%, 360px);
  }

  :host([layout="uncontained"]) {
    --md-carousel-item-width: auto;
  }

  /* Controls (Previous & Next buttons) */
  .control-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 3;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--md-carousel-control-size, 44px);
    height: var(--md-carousel-control-size, 44px);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background-color: var(--md-carousel-control-bg, rgba(255, 255, 255, 0.9));
    color: var(--md-carousel-control-color, #1d1b20);
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
    transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1),
                background-color 0.2s,
                transform 0.2s;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  .control-button:hover:not(:disabled) {
    background-color: var(--md-sys-color-surface-container-high, #e6e0e9);
    box-shadow: var(--md-sys-elevation-level3, 0px 4px 8px 3px rgba(0, 0, 0, 0.15));
  }

  .control-button:active:not(:disabled) {
    transform: translateY(-50%) scale(0.94);
  }

  .control-button:disabled {
    opacity: 0;
    pointer-events: none;
  }

  .control-button.prev {
    left: 12px;
  }

  .control-button.next {
    right: 12px;
  }

  /* Indicators / Pagination Dots */
  .indicators {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 12px;
    padding: 4px 0;
  }

  .indicator-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    background-color: var(--md-carousel-indicator-color, #cac4d0);
    border: none;
    padding: 0;
    cursor: pointer;
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1),
                background-color 0.3s cubic-bezier(0.2, 0, 0, 1),
                border-radius 0.3s;
  }

  .indicator-dot::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
    height: 28px;
  }

  .indicator-dot.active {
    width: 24px;
    border-radius: 4px;
    background-color: var(--md-carousel-indicator-active-color, #6750a4);
  }

  .indicator-dot:focus-visible {
    outline: 2px solid var(--md-carousel-indicator-active-color, #6750a4);
    outline-offset: 2px;
  }
`;

export const carouselItemStyles = css`
  :host {
    display: inline-block;
    flex: 0 0 auto;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
    scroll-snap-align: start;
    scroll-snap-stop: normal;
    border-radius: var(--md-carousel-item-shape, var(--md-sys-shape-corner-extra-large, 28px));
    background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
    width: var(--md-carousel-item-width, clamp(220px, 32%, 360px));
    height: var(--md-carousel-item-height, 100%);
    min-height: 180px;
    transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
                box-shadow 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([snap-align="center"]) {
    scroll-snap-align: center;
  }

  :host([snap-align="end"]) {
    scroll-snap-align: end;
  }

  :host([snap-align="start"]) {
    scroll-snap-align: start;
  }

  :host([interactive]) {
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .item-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    box-sizing: border-box;
  }

  .media-container {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
  }

  .media-container img,
  ::slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .scrim {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    padding: 20px 16px 16px;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.8) 0%,
      rgba(0, 0, 0, 0.4) 60%,
      transparent 100%
    );
    color: #ffffff;
    display: flex;
    flex-direction: column;
    gap: 4px;
    pointer-events: none;
  }

  .headline {
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.4;
    margin: 0;
    color: inherit;
  }

  .subhead {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.3;
    margin: 0;
    opacity: 0.88;
    color: inherit;
  }

  .content-slot {
    position: relative;
    z-index: 2;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
`;
