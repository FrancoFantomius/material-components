import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    position: relative;
    overflow: hidden;
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* --- Elevated (Default) --- */
  :host(:not([variant])),
  :host([variant="elevated"]) {
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  :host(:not([variant])[interactive]:hover),
  :host([variant="elevated"][interactive]:hover) {
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0,0,0,0.15));
  }

  /* --- Filled --- */
  :host([variant="filled"]) {
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="filled"][interactive]:hover) {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  /* --- Outlined --- */
  :host([variant="outlined"]) {
    background-color: var(--md-sys-color-surface, #FEF7FF);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-shadow: var(--md-sys-elevation-level0, none);
  }

  :host([variant="outlined"][interactive]:hover) {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  :host([interactive]) {
    cursor: pointer;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .card-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    text-decoration: none;
    color: inherit;
  }

  ::slotted([slot="media"]) {
    width: 100%;
    max-height: 200px;
    object-fit: cover;
    display: block;
  }

  .header {
    padding: 16px 16px 0;
  }

  .body {
    padding: 16px;
    flex: 1;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 16px 16px;
  }
`;

