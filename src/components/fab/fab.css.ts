import { css } from 'lit';

export const fabStyles = css`
  :host {
    display: inline-flex;
    outline: none;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    user-select: none;
    outline: none;
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    color: var(--md-sys-color-on-primary-container, #21005D);
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0,0,0,0.30));
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  }

  button:hover {
    box-shadow: var(--md-sys-elevation-level4, 0px 2px 3px 0px rgba(0,0,0,0.30));
  }

  :host([lowered]) button {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0,0,0,0.15));
  }

  :host([lowered]) button:hover {
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0,0,0,0.15));
  }

  /* --- Sizes --- */
  :host(:not([size])) button,
  :host([size="medium"]) button {
    width: 56px;
    height: 56px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
  }

  :host([size="small"]) button {
    width: 40px;
    height: 40px;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
  }

  :host([size="large"]) button {
    width: 96px;
    height: 96px;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
  }

  :host([size="large"]) md-icon {
    --md-icon-size: 36px;
  }

  /* --- Extended FAB --- */
  :host([extended]) button {
    width: auto;
    min-width: 80px;
    height: 56px;
    padding: 0 20px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
    gap: 12px;
  }

  .label {
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    white-space: nowrap;
  }

  .content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }
`;

