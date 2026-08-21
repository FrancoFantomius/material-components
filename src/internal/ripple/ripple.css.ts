import { css } from 'lit';

export const rippleStyles = css`
  :host {
    display: inline-flex;
    position: absolute;
    inset: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([unbounded]) {
    overflow: visible;
  }

  :host([disabled]) {
    opacity: 0;
  }

  .surface {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    transition: opacity 150ms linear;
  }

  :host(:hover) .surface,
  .surface.hovered {
    opacity: var(--md-sys-state-hover-opacity, 0.08);
  }

  :host(:focus-visible) .surface,
  .surface.focused {
    opacity: var(--md-sys-state-focus-opacity, 0.12);
  }

  .ripple {
    position: absolute;
    border-radius: 50%;
    background-color: currentColor;
    opacity: var(--md-sys-state-pressed-opacity, 0.12);
    transform: scale(0);
    pointer-events: none;
    animation: md-ripple-expand 350ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  .ripple.fading {
    animation: md-ripple-fade-out 250ms linear forwards;
  }

  @keyframes md-ripple-expand {
    from {
      transform: scale(0);
      opacity: var(--md-sys-state-pressed-opacity, 0.12);
    }
    to {
      transform: scale(2.5);
      opacity: var(--md-sys-state-pressed-opacity, 0.12);
    }
  }

  @keyframes md-ripple-fade-out {
    from {
      opacity: var(--md-sys-state-pressed-opacity, 0.12);
    }
    to {
      opacity: 0;
    }
  }
`;

