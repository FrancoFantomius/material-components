import { css } from 'lit';

export const progressStyles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
  }

  /* --- Linear Progress --- */
  :host(:not([type])),
  :host([type="linear"]) {
    display: block;
    width: 100%;
    height: 4px;
    position: relative;
    overflow: hidden;
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
  }

  .linear-buffer {
    position: absolute;
    inset: 0;
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    transform-origin: left;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .linear-bar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--md-sys-color-primary, #6750A4);
    border-radius: inherit;
    transform-origin: left;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([indeterminate]:not([type])),
  :host([indeterminate][type="linear"]) .linear-bar {
    animation: md-linear-indeterminate 2s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
  }

  @keyframes md-linear-indeterminate {
    0% {
      left: -35%;
      right: 100%;
    }
    60% {
      left: 100%;
      right: -90%;
    }
    100% {
      left: 100%;
      right: -90%;
    }
  }

  /* --- Circular Progress --- */
  :host([type="circular"]) {
    width: 48px;
    height: 48px;
    position: relative;
  }

  svg {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  circle {
    fill: none;
    stroke-width: 4px;
    stroke-linecap: round;
  }

  .circle-track {
    stroke: var(--md-sys-color-surface-container-highest, #E6E0E9);
  }

  .circle-indicator {
    stroke: var(--md-sys-color-primary, #6750A4);
    transition: stroke-dashoffset 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([indeterminate][type="circular"]) svg {
    animation: md-circular-rotate 1.4s linear infinite;
  }

  :host([indeterminate][type="circular"]) .circle-indicator {
    animation: md-circular-dash 1.4s ease-in-out infinite;
  }

  @keyframes md-circular-rotate {
    100% {
      transform: rotate(270deg);
    }
  }

  @keyframes md-circular-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
`;

