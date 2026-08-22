import { css } from 'lit';

export const loadingIndicatorStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    box-sizing: border-box;
    --md-loading-indicator-color: var(--md-sys-color-primary, #6750A4);
    --md-loading-indicator-container-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    --md-loading-indicator-container-shape: var(--md-sys-shape-corner-medium, 16px);
  }

  :host([size="small"]) {
    --_size: var(--md-loading-indicator-size, 36px);
    --_shape-size: var(--md-loading-indicator-shape-size, 18px);
  }

  :host(:not([size])),
  :host([size="medium"]) {
    --_size: var(--md-loading-indicator-size, 48px);
    --_shape-size: var(--md-loading-indicator-shape-size, 24px);
  }

  :host([size="large"]) {
    --_size: var(--md-loading-indicator-size, 64px);
    --_shape-size: var(--md-loading-indicator-shape-size, 32px);
  }

  :host(:not([contained])) {
    width: var(--_shape-size);
    height: var(--_shape-size);
  }

  :host([contained]) {
    width: var(--_size);
    height: var(--_size);
    background-color: var(--md-loading-indicator-container-color);
    border-radius: var(--md-loading-indicator-container-shape);
  }

  :host([hidden]),
  :host([active="false"]) {
    display: none;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }

  .shape {
    width: var(--_shape-size);
    height: var(--_shape-size);
    background-color: var(--md-loading-indicator-color);
    transform-origin: center center;
    will-change: transform, border-radius;
  }

  /* Morphing shape animation */
  :host([shape="morph"]:not([paused])) .shape,
  :host(:not([shape]):not([paused])) .shape {
    animation: md-loading-morph 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  :host([shape="square"]:not([paused])) .shape {
    border-radius: 4px;
    animation: md-loading-spin 1.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }

  :host([shape="circle"]:not([paused])) .shape {
    border-radius: 50%;
    animation: md-loading-pulse 1.4s ease-in-out infinite alternate;
  }

  :host([shape="clover"]:not([paused])) .shape,
  :host([shape="star"]:not([paused])) .shape {
    border-radius: 50% 15% 50% 15%;
    animation: md-loading-spin 2s linear infinite;
  }

  :host([paused]) .shape {
    animation-play-state: paused;
  }

  @keyframes md-loading-morph {
    0% {
      border-radius: 50%;
      transform: rotate(0deg) scale(1);
    }
    20% {
      border-radius: 12%;
      transform: rotate(90deg) scale(0.85);
    }
    40% {
      border-radius: 50% 15% 50% 15%;
      transform: rotate(180deg) scale(1.05);
    }
    60% {
      border-radius: 15% 50% 15% 50%;
      transform: rotate(270deg) scale(0.85);
    }
    80% {
      border-radius: 40% 60% 60% 40% / 40% 40% 60% 60%;
      transform: rotate(315deg) scale(0.95);
    }
    100% {
      border-radius: 50%;
      transform: rotate(360deg) scale(1);
    }
  }

  @keyframes md-loading-spin {
    0% {
      transform: rotate(0deg) scale(0.9);
    }
    50% {
      transform: rotate(180deg) scale(1.05);
    }
    100% {
      transform: rotate(360deg) scale(0.9);
    }
  }

  @keyframes md-loading-pulse {
    0% {
      transform: scale(0.75);
      opacity: 0.7;
    }
    100% {
      transform: scale(1.05);
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shape {
      animation: none !important;
    }
  }
`;
