import { css } from 'lit';

export const radioStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    gap: 8px;
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-body-large-size, 16px);
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.38;
    pointer-events: none;
  }

  .container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .outer-circle {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 2px solid var(--md-sys-color-on-surface-variant, #49454F);
    border-radius: 50%;
    background-color: transparent;
    transition: border-color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .outer-circle md-ripple {
    inset: -2px;
  }

  :host([checked]) .outer-circle {
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  :host([disabled]) .outer-circle {
    border-color: var(--md-sys-color-on-surface, #1D1B20);
  }

  .inner-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750A4);
    transform: scale(0);
    transition: transform 150ms cubic-bezier(0.2, 0, 0, 1);
    z-index: 1;
  }

  :host([checked]) .inner-circle {
    transform: scale(1);
  }

  :host([disabled][checked]) .inner-circle {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
  }
`;

export const radioGroupStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  :host([row]) {
    flex-direction: row;
    align-items: center;
    gap: 16px;
  }
`;

