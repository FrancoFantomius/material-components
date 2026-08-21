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
    color: rgba(29, 27, 32, 0.38);
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
    background-color: rgba(29, 27, 32, 0.12);
    border-color: rgba(29, 27, 32, 0.12);
  }

  .thumb-container {
    position: absolute;
    left: 4px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([selected]) .thumb-container {
    transform: translateX(20px);
  }

  .thumb {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: var(--md-sys-color-outline, #79747E);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: width 200ms cubic-bezier(0.2, 0, 0, 1),
                height 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([selected]) .thumb {
    width: 24px;
    height: 24px;
    background-color: var(--md-sys-color-on-primary, #FFFFFF);
  }

  :host([disabled]) .thumb {
    background-color: rgba(29, 27, 32, 0.38);
  }

  .icon {
    font-size: 16px;
    color: var(--md-sys-color-on-primary-container, #21005D);
    opacity: 0;
    transition: opacity 150ms ease;
  }

  :host([selected]) .icon.check {
    opacity: 1;
  }

  :host([icons]:not([selected])) .icon.cross {
    opacity: 1;
    color: var(--md-sys-color-surface-container-highest, #E6E0E9);
  }
`;

