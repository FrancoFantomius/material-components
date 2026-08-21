import { css } from 'lit';

export const checkboxStyles = css`
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

  .box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    border: 2px solid var(--md-sys-color-on-surface-variant, #49454F);
    border-radius: var(--md-sys-shape-corner-extra-small, 2px);
    background-color: transparent;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                border-color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .box md-ripple {
    inset: -2px;
  }

  :host([checked]) .box,
  :host([indeterminate]) .box {
    background-color: var(--md-sys-color-primary, #6750A4);
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  :host([error]) .box {
    border-color: var(--md-sys-color-error, #B3261E);
  }

  :host([error][checked]) .box,
  :host([error][indeterminate]) .box {
    background-color: var(--md-sys-color-error, #B3261E);
    border-color: var(--md-sys-color-error, #B3261E);
  }

  :host([disabled]) .box {
    border-color: var(--md-sys-color-on-surface, #1D1B20);
  }

  :host([disabled][checked]) .box,
  :host([disabled][indeterminate]) .box {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
    border-color: transparent;
  }

  .mark {
    position: absolute;
    width: 14px;
    height: 14px;
    fill: none;
    stroke: var(--md-sys-color-on-primary, #FFFFFF);
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
    opacity: 0;
    transition: opacity 150ms ease;
    z-index: 1;
  }

  :host([checked]) .mark.check {
    opacity: 1;
  }

  :host([indeterminate]) .mark.dash {
    opacity: 1;
  }

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
  }
`;

