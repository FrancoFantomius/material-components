import { css } from 'lit';

export const segmentedButtonStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    height: 40px;
    min-height: 40px;
    padding: 0 16px;
    background-color: transparent;
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    cursor: pointer;
    user-select: none;
    outline: none;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([selected]) {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  :host(:hover:not([disabled])) {
    background-color: rgba(29, 27, 32, 0.08);
  }

  :host([selected]:hover:not([disabled])) {
    background-color: color-mix(in srgb, var(--md-sys-color-secondary-container, #E8DEF8) 90%, #1D192B 10%);
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
    cursor: not-allowed;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    gap: 8px;
    position: relative;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    --md-icon-size: 18px;
  }

  .checkmark-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    animation: checkmark-pop 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  @keyframes checkmark-pop {
    0% {
      transform: scale(0.6);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .label {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const segmentedButtonSetStyles = css`
  :host {
    display: inline-flex;
    align-items: stretch;
    position: relative;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    border: 1px solid var(--md-sys-color-outline, #79747E);
    background-color: transparent;
    overflow: hidden;
    box-sizing: border-box;
    vertical-align: middle;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  ::slotted(md-segmented-button:not(:first-child)) {
    border-left: 1px solid var(--md-sys-color-outline, #79747E);
  }
`;

