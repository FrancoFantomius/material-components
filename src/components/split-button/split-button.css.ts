import { css } from 'lit';

export const splitButtonStyles = css`
  :host {
    display: inline-flex;
    vertical-align: middle;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  .container {
    display: inline-flex;
    align-items: stretch;
    gap: var(--md-split-button-gap, 2px);
    position: relative;
  }

  button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 40px;
    border: none;
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    text-decoration: none;
    text-align: center;
    cursor: pointer;
    user-select: none;
    outline: none;
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                color 200ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  }

  .action-button {
    min-width: 48px;
    padding: 0 16px 0 24px;
    border-radius: var(--md-sys-shape-corner-full, 9999px)
                   var(--md-sys-shape-corner-extra-small, 4px)
                   var(--md-sys-shape-corner-extra-small, 4px)
                   var(--md-sys-shape-corner-full, 9999px);
  }

  :host([has-icon]) .action-button {
    padding-left: 16px;
  }

  .menu-button {
    width: 40px;
    min-width: 40px;
    padding: 0;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px)
                   var(--md-sys-shape-corner-full, 9999px)
                   var(--md-sys-shape-corner-full, 9999px)
                   var(--md-sys-shape-corner-extra-small, 4px);
  }

  .content {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }

  /* --- Filled Variant (Default) --- */
  :host(:not([variant])) button,
  :host([variant="filled"]) button {
    background-color: var(--md-sys-color-primary, #6750a4);
    color: var(--md-sys-color-on-primary, #ffffff);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="filled"]:hover) button,
  :host(:not([variant]):hover) button {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  /* --- Elevated Variant --- */
  :host([variant="elevated"]) button {
    background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
    color: var(--md-sys-color-primary, #6750a4);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  :host([variant="elevated"]:hover) button {
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
  }

  /* --- Tonal Variant --- */
  :host([variant="tonal"]) button {
    background-color: var(--md-sys-color-secondary-container, #e8def8);
    color: var(--md-sys-color-on-secondary-container, #1d192b);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="tonal"]:hover) button {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  /* --- Outlined Variant --- */
  :host([variant="outlined"]) button {
    background-color: transparent;
    color: var(--md-sys-color-primary, #6750a4);
    border: 1px solid var(--md-sys-color-outline, #79747e);
  }

  /* --- Disabled State --- */
  :host([disabled]) button {
    cursor: not-allowed;
    box-shadow: none;
  }

  :host([disabled]:not([variant="outlined"])) button {
    background-color: rgba(29, 27, 32, 0.12);
    color: rgba(29, 27, 32, 0.38);
  }

  :host([disabled][variant="outlined"]) button {
    border-color: rgba(29, 27, 32, 0.12);
    color: rgba(29, 27, 32, 0.38);
  }

  /* --- Backdrop --- */
  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 998;
    background-color: transparent;
  }

  :host([open]) .backdrop {
    display: block;
  }

  /* --- Submenu Surface --- */
  .menu-surface {
    display: none;
    position: absolute;
    z-index: 999;
    min-width: var(--md-menu-min-width, 140px);
    max-width: var(--md-menu-max-width, 280px);
    max-height: var(--md-menu-max-height, calc(100vh - 32px));
    box-sizing: border-box;
    padding: 8px 0;
    margin: 0;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    background-color: var(--md-sys-color-surface-container, #f3edf7);
    color: var(--md-sys-color-on-surface, #1d1b20);
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30));
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    outline: none;
    user-select: none;
    -webkit-overflow-scrolling: touch;
    top: calc(100% + var(--md-split-button-menu-offset, 4px));
    right: 0;
    transform-origin: top right;
  }

  :host([menu-placement="bottom-start"]) .menu-surface,
  :host([menu-placement="bottom"]) .menu-surface {
    left: 0;
    right: auto;
    transform-origin: top left;
  }

  :host([menu-placement="top-end"]) .menu-surface {
    top: auto;
    bottom: calc(100% + var(--md-split-button-menu-offset, 4px));
    right: 0;
    left: auto;
    transform-origin: bottom right;
  }

  :host([menu-placement="top-start"]) .menu-surface,
  :host([menu-placement="top"]) .menu-surface {
    top: auto;
    bottom: calc(100% + var(--md-split-button-menu-offset, 4px));
    left: 0;
    right: auto;
    transform-origin: bottom left;
  }

  :host([open]) .menu-surface {
    display: flex;
    flex-direction: column;
    animation: md-split-menu-fade-in 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  @keyframes md-split-menu-fade-in {
    from {
      opacity: 0;
      transform: scale(0.92, 0.8);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  .menu-surface::-webkit-scrollbar {
    width: 6px;
  }

  .menu-surface::-webkit-scrollbar-thumb {
    background-color: var(--md-sys-color-outline-variant, #cac4d0);
    border-radius: 3px;
  }
`;
