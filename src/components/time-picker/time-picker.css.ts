import { css } from 'lit';

export const timePickerStyles = css`
  :host {
    display: inline-block;
    color: var(--md-sys-color-on-surface, #1d1b20);
    font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif);
    user-select: none;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([modal]) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  :host([modal][open]) {
    pointer-events: auto;
  }

  :host([modal]:not([open])) {
    display: none;
  }

  /* Scrim Backdrop for Modal */
  .scrim {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.32);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.2s cubic-bezier(0.2, 0, 0, 1);
  }

  :host([modal][open]) .scrim {
    opacity: 1;
  }

  /* Picker Container / Surface */
  .picker-surface {
    background-color: var(--md-sys-color-surface-container-high, #ece6f0);
    color: var(--md-sys-color-on-surface, #1d1b20);
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: var(--md-sys-elevation-3, 0 4px 8px 3px rgba(0, 0, 0, 0.15), 0 1px 3px 0 rgba(0, 0, 0, 0.3));
    max-width: 360px;
    width: 100%;
    box-sizing: border-box;
    position: relative;
  }

  :host(:not([modal])) .picker-surface {
    box-shadow: var(--md-sys-elevation-1, 0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.3));
    border: 1px solid var(--md-sys-color-outline-variant, #cac4d0);
    background-color: var(--md-sys-color-surface, #fef7ff);
  }

  /* Headline / Header */
  .header {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .headline {
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.1px;
    line-height: 20px;
    color: var(--md-sys-color-on-surface-variant, #49454f);
    margin: 0;
  }

  /* Time Display Input / Cards Row */
  .time-display-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-bottom: 24px;
    width: 100%;
  }

  .time-card-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .time-card {
    width: 96px;
    height: 72px;
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
    color: var(--md-sys-color-on-surface, #1d1b20);
    border-radius: var(--md-sys-shape-corner-medium, 8px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 45px;
    font-weight: 400;
    line-height: 52px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.2s cubic-bezier(0.2, 0, 0, 1);
    box-sizing: border-box;
    position: relative;
    outline: none;
  }

  .time-card:focus-visible {
    border-color: var(--md-sys-color-primary, #6750a4);
  }

  .time-card.active {
    background-color: var(--md-sys-color-primary-container, #eaddff);
    color: var(--md-sys-color-on-primary-container, #21005d);
    border-color: var(--md-sys-color-primary, #6750a4);
  }

  .time-input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    outline: none;
    text-align: center;
    font-size: 45px;
    font-weight: 400;
    line-height: 52px;
    color: inherit;
    font-family: inherit;
    padding: 0;
    box-sizing: border-box;
  }

  .time-card-label {
    font-size: 12px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface-variant, #49454f);
    text-transform: capitalize;
  }

  .time-separator {
    font-size: 45px;
    font-weight: 400;
    line-height: 52px;
    color: var(--md-sys-color-on-surface, #1d1b20);
    margin: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 20px;
  }

  /* Period Toggle (AM / PM) */
  .period-toggle {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--md-sys-color-outline, #79747e);
    border-radius: var(--md-sys-shape-corner-medium, 8px);
    overflow: hidden;
    height: 72px;
    width: 48px;
    margin-left: 4px;
    box-sizing: border-box;
  }

  .period-button {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    font-size: 14px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface-variant, #49454f);
    cursor: pointer;
    outline: none;
    transition: background-color 0.15s, color 0.15s;
    user-select: none;
  }

  .period-button:first-child {
    border-bottom: 1px solid var(--md-sys-color-outline, #79747e);
  }

  .period-button.selected {
    background-color: var(--md-sys-color-tertiary-container, #ffd8e4);
    color: var(--md-sys-color-on-tertiary-container, #31111d);
  }

  .period-button:focus-visible {
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
  }

  /* Clock Dial Surface */
  .dial-container {
    width: 256px;
    height: 256px;
    border-radius: 50%;
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    cursor: pointer;
    margin: 8px 0;
  }

  .dial-center-pin {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750a4);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    pointer-events: none;
  }

  .dial-hand {
    position: absolute;
    bottom: 50%;
    left: 50%;
    width: 2px;
    background-color: var(--md-sys-color-primary, #6750a4);
    transform-origin: bottom center;
    z-index: 2;
    pointer-events: none;
    transition: height 0.15s cubic-bezier(0.2, 0, 0, 1);
  }

  .dial-selector-head {
    position: absolute;
    top: -24px;
    left: -23px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--md-sys-color-primary, #6750a4);
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .dial-inner-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--md-sys-color-on-primary, #ffffff);
  }

  .dial-number {
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface, #1d1b20);
    transform: translate(-50%, -50%);
    z-index: 4;
    pointer-events: none;
    transition: color 0.15s ease;
  }

  .dial-number.small {
    font-size: 13px;
    color: var(--md-sys-color-on-surface-variant, #49454f);
  }

  .dial-number.selected {
    color: var(--md-sys-color-on-primary, #ffffff);
  }

  /* Actions Row */
  .actions-row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 16px;
  }

  .mode-switch-btn {
    background: transparent;
    border: none;
    color: var(--md-sys-color-on-surface-variant, #49454f);
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    transition: background-color 0.15s;
  }

  .mode-switch-btn:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  .mode-switch-btn:focus-visible {
    background-color: rgba(0, 0, 0, 0.12);
  }

  .dialog-buttons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  /* Disabled state */
  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }
`;
