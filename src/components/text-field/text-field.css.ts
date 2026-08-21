import { css } from 'lit';

export const textFieldStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    min-width: 240px;
    vertical-align: top;
    align-self: flex-start;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .container {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 56px;
    padding: 0 16px;
    box-sizing: border-box;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                border-color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* --- Filled Variant (Default) --- */
  :host(:not([variant])) .container,
  :host([variant="filled"]) .container {
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    border-radius: var(--md-sys-shape-corner-extra-small, 4px) var(--md-sys-shape-corner-extra-small, 4px) 0 0;
    border-bottom: 1px solid var(--md-sys-color-on-surface-variant, #49454F);
  }

  :host(:not([variant])[focused]) .container,
  :host([variant="filled"][focused]) .container {
    border-bottom: 2px solid var(--md-sys-color-primary, #6750A4);
  }

  :host(:not([variant])[error]) .container,
  :host([variant="filled"][error]) .container {
    border-bottom-color: var(--md-sys-color-error, #B3261E);
  }

  /* --- Outlined Variant --- */
  :host([variant="outlined"]) .container {
    background-color: transparent;
    border: 1px solid var(--md-sys-color-outline, #79747E);
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
  }

  :host([variant="outlined"][focused]) .container {
    border: 2px solid var(--md-sys-color-primary, #6750A4);
    padding: 0 15px; /* Offset for 2px border */
  }

  :host([variant="outlined"][error]) .container {
    border-color: var(--md-sys-color-error, #B3261E);
  }

  /* Floating Label */
  .label {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    line-height: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    pointer-events: none;
    transition: transform 150ms cubic-bezier(0.2, 0, 0, 1),
                font-size 150ms cubic-bezier(0.2, 0, 0, 1),
                color 150ms cubic-bezier(0.2, 0, 0, 1),
                left 150ms cubic-bezier(0.2, 0, 0, 1),
                top 150ms cubic-bezier(0.2, 0, 0, 1);
    transform-origin: top left;
    white-space: nowrap;
    max-width: calc(100% - 32px);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([has-leading-icon]) .label {
    left: 52px;
    max-width: calc(100% - 68px);
  }

  /* Filled Variant Floating Label */
  :host(:not([variant])[focused]) .label,
  :host(:not([variant])[has-value]) .label,
  :host(:not([variant])[has-placeholder]) .label,
  :host([variant="filled"][focused]) .label,
  :host([variant="filled"][has-value]) .label,
  :host([variant="filled"][has-placeholder]) .label {
    top: 8px;
    transform: translateY(0) scale(0.75);
    transform-origin: top left;
  }

  /* Outlined Variant Floating Label */
  :host([variant="outlined"][focused]) .label,
  :host([variant="outlined"][has-value]) .label,
  :host([variant="outlined"][has-placeholder]) .label {
    top: 0;
    left: 12px;
    transform: translateY(-50%) scale(0.75);
    transform-origin: left center;
    background-color: var(--md-sys-color-surface, #FEF7FF);
    padding: 0 4px;
    max-width: calc(100% - 24px);
    z-index: 1;
  }

  :host([focused]) .label {
    color: var(--md-sys-color-primary, #6750A4);
  }

  :host([error]) .label {
    color: var(--md-sys-color-error, #B3261E);
  }

  .input-wrapper {
    display: flex;
    align-items: center;
    flex: 1;
    height: 100%;
    min-width: 0;
  }

  :host(:not([variant])) .input-wrapper,
  :host([variant="filled"]) .input-wrapper {
    padding-top: 18px;
  }

  input {
    flex: 1;
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-family: inherit;
    font-size: 16px;
    line-height: 24px;
    color: var(--md-sys-color-on-surface, #1D1B20);
    padding: 0;
  }

  input::placeholder {
    color: var(--md-sys-color-on-surface-variant, #49454F);
    opacity: 0.6;
  }

  .affix {
    font-size: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    user-select: none;
    transition: opacity 150ms ease;
  }

  :host(:not([focused]):not([has-value]):not([has-placeholder])) .affix {
    opacity: 0;
  }

  .prefix { margin-right: 4px; }
  .suffix { margin-left: 4px; }

  .icon-slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    flex-shrink: 0;
  }

  .leading-icon { margin-right: 12px; }
  .trailing-icon { margin-left: 12px; }

  :host([error]) .trailing-icon {
    color: var(--md-sys-color-error, #B3261E);
  }

  /* Supporting / Error text */
  .supporting-text {
    display: flex;
    justify-content: space-between;
    padding: 4px 16px 0;
    font-size: 12px;
    line-height: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  :host([error]) .supporting-text {
    color: var(--md-sys-color-error, #B3261E);
  }
`;

