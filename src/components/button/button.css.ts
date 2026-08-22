import { css } from 'lit';

export const buttonStyles = css`
  :host {
    display: inline-flex;
    outline: none;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button, a {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 100%;
    min-width: 64px;
    height: 40px;
    padding: 0 24px;
    border: none;
    border-radius: var(--md-button-border-radius, var(--md-button-shape, var(--md-sys-shape-corner-full, 9999px)));
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

  :host([has-icon]) button,
  :host([has-icon]) a {
    padding-left: 16px;
  }

  :host([has-trailing-icon]) button,
  :host([has-trailing-icon]) a {
    padding-right: 16px;
  }

  /* --- Filled (Default) --- */
  :host(:not([variant])) button,
  :host(:not([variant])) a,
  :host([variant="filled"]) button,
  :host([variant="filled"]) a {
    background-color: var(--md-sys-color-primary, #6750a4);
    color: var(--md-sys-color-on-primary, #ffffff);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="filled"]:hover) button,
  :host([variant="filled"]:hover) a,
  :host(:not([variant]):hover) button,
  :host(:not([variant]):hover) a {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  /* --- Elevated --- */
  :host([variant="elevated"]) button,
  :host([variant="elevated"]) a {
    background-color: var(--md-sys-color-surface-container-low, #f7f2fa);
    color: var(--md-sys-color-primary, #6750a4);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  :host([variant="elevated"]:hover) button,
  :host([variant="elevated"]:hover) a {
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0,0,0,0.15));
  }

  /* --- Filled Tonal --- */
  :host([variant="tonal"]) button,
  :host([variant="tonal"]) a {
    background-color: var(--md-sys-color-secondary-container, #e8def8);
    color: var(--md-sys-color-on-secondary-container, #1d192b);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="tonal"]:hover) button,
  :host([variant="tonal"]:hover) a {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  /* --- Outlined --- */
  :host([variant="outlined"]) button,
  :host([variant="outlined"]) a {
    background-color: transparent;
    color: var(--md-sys-color-primary, #6750a4);
    border: 1px solid var(--md-sys-color-outline, #79747e);
  }

  /* --- Text --- */
  :host([variant="text"]) button,
  :host([variant="text"]) a {
    background-color: transparent;
    color: var(--md-sys-color-primary, #6750a4);
    padding: 0 12px;
  }

  /* --- Disabled --- */
  :host([disabled]) button,
  :host([disabled]) a {
    cursor: not-allowed;
    box-shadow: none;
  }

  :host([disabled]:not([variant="outlined"]):not([variant="text"])) button,
  :host([disabled]:not([variant="outlined"]):not([variant="text"])) a {
    background-color: rgba(29, 27, 32, 0.12);
    color: rgba(29, 27, 32, 0.38);
  }

  :host([disabled][variant="outlined"]) button,
  :host([disabled][variant="outlined"]) a {
    border-color: rgba(29, 27, 32, 0.12);
    color: rgba(29, 27, 32, 0.38);
  }

  :host([disabled][variant="text"]) button,
  :host([disabled][variant="text"]) a {
    color: rgba(29, 27, 32, 0.38);
  }

  .content {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }

  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: md-spin 800ms linear infinite;
  }

  @keyframes md-spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

