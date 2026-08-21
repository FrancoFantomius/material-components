import { css } from 'lit';

export const chipStyles = css`
  :host {
    display: inline-flex;
    outline: none;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .chip {
    position: relative;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    height: 32px;
    padding: 0 12px;
    border-radius: var(--md-sys-shape-corner-small, 8px);
    border: 1px solid var(--md-sys-color-outline, #79747E);
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
    gap: 8px;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                border-color 150ms cubic-bezier(0.2, 0, 0, 1),
                box-shadow 150ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  }

  :host([selected]) .chip {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
    border-color: transparent;
  }

  :host([variant="elevated"]) .chip {
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    border: none;
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  .icon {
    display: inline-flex;
    align-items: center;
    color: var(--md-sys-color-primary, #6750A4);
  }

  .remove-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    margin-left: 2px;
  }

  .remove-btn:hover {
    background-color: rgba(29, 27, 32, 0.12);
  }
`;

export const chipSetStyles = css`
  :host {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }
`;

