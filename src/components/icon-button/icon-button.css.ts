import { css } from 'lit';

export const iconButtonStyles = css`
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
    width: 40px;
    height: 40px;
    padding: 0;
    border: none;
    border-radius: var(--md-sys-shape-corner-full, 50%);
    overflow: hidden;
    background-color: transparent;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    user-select: none;
    outline: none;
    text-decoration: none;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* --- Filled --- */
  :host([variant="filled"]) button,
  :host([variant="filled"]) a {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
  }

  :host([variant="filled"][selected]) button,
  :host([variant="filled"][selected]) a {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
  }

  /* --- Tonal --- */
  :host([variant="tonal"]) button,
  :host([variant="tonal"]) a {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  /* --- Outlined --- */
  :host([variant="outlined"]) button,
  :host([variant="outlined"]) a {
    border: 1px solid var(--md-sys-color-outline, #79747E);
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  :host([variant="outlined"][selected]) button,
  :host([variant="outlined"][selected]) a {
    background-color: var(--md-sys-color-inverse-surface, #313033);
    color: var(--md-sys-color-inverse-on-surface, #F4EFF4);
    border: none;
  }

  /* --- Toggle / Selected for Standard --- */
  :host(:not([variant])[selected]) button,
  :host(:not([variant])[selected]) a,
  :host([variant="standard"][selected]) button,
  :host([variant="standard"][selected]) a {
    color: var(--md-sys-color-primary, #6750A4);
  }

  /* --- Disabled --- */
  :host([disabled]) button,
  :host([disabled]) a {
    cursor: not-allowed;
    color: rgba(29, 27, 32, 0.38);
  }

  :host([disabled][variant="filled"]) button,
  :host([disabled][variant="filled"]) a,
  :host([disabled][variant="tonal"]) button,
  :host([disabled][variant="tonal"]) a {
    background-color: rgba(29, 27, 32, 0.12);
  }

  :host([disabled][variant="outlined"]) button,
  :host([disabled][variant="outlined"]) a {
    border-color: rgba(29, 27, 32, 0.12);
  }

  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
`;

