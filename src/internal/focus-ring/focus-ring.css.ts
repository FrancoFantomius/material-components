import { css } from 'lit';

export const focusRingStyles = css`
  :host {
    display: none;
    position: absolute;
    inset: -4px;
    border: 3px solid var(--md-sys-color-secondary, #625B71);
    border-radius: inherit;
    pointer-events: none;
    box-sizing: border-box;
  }

  :host([visible]) {
    display: block;
    animation: md-focus-ring-in 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([inward]) {
    inset: 0px;
  }

  @keyframes md-focus-ring-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

