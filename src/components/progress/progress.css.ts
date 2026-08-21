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
    height: 20px;
    position: relative;
    overflow: hidden;
  }

  .linear-track-bg {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 4px;
    transform: translateY(-50%);
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    overflow: hidden;
    transition: clip-path 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .linear-buffer {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    border-radius: inherit;
    transition: width 200ms cubic-bezier(0.2, 0, 0, 1);
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

  /* Wavy Sinus Line for Linear Determinate Progress */
  .linear-sinus-wave {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    background-color: var(--md-sys-color-primary, #6750A4);
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Cpath d='M 0 10 C 4.5 4.5, 11.5 4.5, 16 10 S 27.5 15.5, 32 10' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 20'%3E%3Cpath d='M 0 10 C 4.5 4.5, 11.5 4.5, 16 10 S 27.5 15.5, 32 10' fill='none' stroke='black' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E");
    -webkit-mask-repeat: repeat-x;
    mask-repeat: repeat-x;
    -webkit-mask-size: 32px 20px;
    mask-size: 32px 20px;
    animation: sinus-wave-anim 1.2s linear infinite;
    transition: width 200ms cubic-bezier(0.2, 0, 0, 1);
    pointer-events: none;
    z-index: 1;
  }

  @keyframes sinus-wave-anim {
    0% {
      -webkit-mask-position: 0 0;
      mask-position: 0 0;
    }
    100% {
      -webkit-mask-position: -32px 0;
      mask-position: -32px 0;
    }
  }

  :host([indeterminate]:not([type])) .linear-bar,
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

  circle, path {
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

  .circle-wave-indicator {
    stroke: var(--md-sys-color-primary, #6750A4);
    transition: stroke-dashoffset 200ms cubic-bezier(0.2, 0, 0, 1);
    transform-origin: 24px 24px;
    animation: md-circular-wave-rotate 6s linear infinite;
  }

  @keyframes md-circular-wave-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
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

  @media (prefers-reduced-motion: reduce) {
    .linear-sinus-wave,
    .circle-wave-indicator {
      animation: none;
      transition: none;
    }
  }
`;

