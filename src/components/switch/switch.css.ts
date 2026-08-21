import { css } from 'lit';

export const switchStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    cursor: pointer;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    gap: 12px;
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-body-large-size, 16px);
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  :host([disabled]) {
    cursor: not-allowed;
    opacity: 0.38;
    pointer-events: none;
  }

  .switch {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: 52px;
    height: 32px;
    box-sizing: border-box;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    border: 2px solid var(--md-sys-color-outline, #79747E);
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                border-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([selected]) .switch {
    background-color: var(--md-sys-color-primary, #6750A4);
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  :host([disabled]) .switch {
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border-color: var(--md-sys-color-outline, #79747E);
  }

  :host([disabled][selected]) .switch {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
    border-color: transparent;
  }

  .thumb-container {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([selected]) .thumb-container {
    transform: translateX(20px);
  }

  .thumb {
    position: relative;
    width: 16px;
    height: 16px;
    flex-shrink: 0;
    border-radius: 50%;
    background-color: var(--md-sys-color-outline, #79747E);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 200ms cubic-bezier(0.2, 0, 0, 1),
                height 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([icons]) .thumb,
  :host([selected]) .thumb {
    width: 24px;
    height: 24px;
  }

  :host([selected]) .thumb {
    background-color: var(--md-sys-color-on-primary, #FFFFFF);
  }

  :host([disabled]) .thumb {
    background-color: var(--md-sys-color-on-surface, #1D1B20);
  }

  :host([disabled][selected]) .thumb {
    background-color: var(--md-sys-color-surface, #FEF7FF);
  }

  .icon {
    position: absolute;
    inset: 0;
    margin: auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: var(--md-sys-color-on-primary-container, #21005D);
    opacity: 0;
    transition: opacity 150ms ease;
    pointer-events: none;
  }

  :host([selected]) .icon.check {
    opacity: 1;
  }

  :host([icons]:not([selected])) .icon.cross {
    opacity: 1;
    color: var(--md-sys-color-surface-container-highest, #E6E0E9);
  }
`;

