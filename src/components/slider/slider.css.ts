import { css } from 'lit';

export const sliderStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    width: 100%;
    min-width: 200px;
    height: 48px;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, sans-serif);
    user-select: none;
    -webkit-user-select: none;
    touch-action: pan-y;
  }

  :host([disabled]) {
    opacity: 0.38;
    pointer-events: none;
    cursor: not-allowed;
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: 16px;
  }

  .icon-slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: 24px;
    flex-shrink: 0;
  }

  .slider-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    cursor: pointer;
    touch-action: none;
  }

  :host([disabled]) .slider-wrapper {
    cursor: not-allowed;
  }

  /* Track */
  .track-container {
    position: absolute;
    left: 0;
    right: 0;
    height: 6px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    overflow: hidden;
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
  }

  .track-active {
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: var(--md-sys-color-primary, #6750A4);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    transition: left 50ms linear, width 50ms linear;
  }

  :host([disabled]) .track-active {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
  }

  :host([disabled]) .track-container {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
    opacity: 0.12;
  }

  /* Tick marks */
  .tick-marks-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
  }

  .tick-mark {
    position: absolute;
    top: 50%;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--md-sys-color-on-surface-variant, #49454F);
    opacity: 0.38;
  }

  .tick-mark.active {
    background-color: var(--md-sys-color-on-primary, #FFFFFF);
    opacity: 0.7;
  }

  /* Thumbs */
  .thumb-container {
    position: absolute;
    top: 50%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    z-index: 2;
    cursor: grab;
    color: var(--md-sys-color-primary, #6750A4);
  }

  .thumb-container:active,
  .thumb-container.dragging {
    cursor: grabbing;
    z-index: 3;
  }

  .thumb-handle {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750A4);
    transition: transform 150ms cubic-bezier(0.2, 0, 0, 1),
                background-color 150ms ease,
                box-shadow 150ms ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }

  :host([disabled]) .thumb-handle {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
    box-shadow: none;
  }

  .thumb-container:hover .thumb-handle,
  .thumb-container:active .thumb-handle,
  .thumb-container:focus-visible .thumb-handle,
  .thumb-container.dragging .thumb-handle {
    transform: scale(1.3);
  }

  /* Value indicator label (balloon) */
  .value-label {
    position: absolute;
    bottom: calc(50% + 15px);
    left: 50%;
    transform: translateX(-50%) translateY(4px) scale(0.6);
    transform-origin: bottom center;
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    min-width: 28px;
    height: 28px;
    box-sizing: border-box;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 150ms cubic-bezier(0.2, 0, 0, 1),
                opacity 150ms ease;
  }

  .value-label::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--md-sys-color-primary, #6750A4);
  }

  .thumb-container:hover .value-label,
  .thumb-container:focus-visible .value-label,
  .thumb-container.dragging .value-label,
  .thumb-container.active-label .value-label {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 1;
  }
`;
