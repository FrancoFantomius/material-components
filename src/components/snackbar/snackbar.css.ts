import { css } from 'lit';

export const snackbarStyles = css`
  :host {
    display: block;
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    opacity: 0;
    pointer-events: none;
    z-index: 2000;
    transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
                opacity 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([open]) {
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    pointer-events: auto;
  }

  .snackbar {
    display: flex;
    align-items: center;
    min-width: 288px;
    max-width: 568px;
    min-height: 48px;
    padding: 8px 16px;
    box-sizing: border-box;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    background-color: var(--md-sys-color-inverse-surface, #313033);
    color: var(--md-sys-color-inverse-on-surface, #F4EFF4);
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0,0,0,0.30));
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    gap: 12px;
  }

  .message {
    flex: 1;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .action-btn {
    background: transparent;
    border: none;
    color: var(--md-sys-color-inverse-primary, #D0BCFF);
    font-family: inherit;
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    cursor: pointer;
    padding: 0 8px;
    height: 36px;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    outline: none;
  }

  .action-btn:hover {
    background-color: rgba(208, 188, 255, 0.08);
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: var(--md-sys-color-inverse-on-surface, #F4EFF4);
    cursor: pointer;
    padding: 4px;
    border-radius: 50%;
    outline: none;
  }

  .close-btn:hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

