import { css } from 'lit';

export const topAppBarStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    background-color: var(--md-top-app-bar-container-color, var(--md-sys-color-surface, #FEF7FF));
    color: var(--md-top-app-bar-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    font-family: var(--md-sys-typescale-font-family, inherit);
    transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([fixed]) {
    position: sticky;
    top: 0;
    z-index: 8;
  }

  :host([elevated]) {
    background-color: var(--md-top-app-bar-container-color, var(--md-sys-color-surface-container, #F3EDF7));
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
  }

  .top-app-bar {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }

  .row {
    display: flex;
    align-items: center;
    height: 64px;
    padding: 0 4px;
    box-sizing: border-box;
    position: relative;
  }

  .leading {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 48px;
    min-height: 48px;
    flex-shrink: 0;
  }

  .trailing {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 48px;
    flex-shrink: 0;
    gap: 4px;
    margin-left: auto;
  }

  .title-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    flex: 1;
    min-width: 0;
    padding: 0 12px;
  }

  .headline {
    margin: 0;
    font-size: var(--md-sys-typescale-title-large-size, 22px);
    line-height: 28px;
    font-weight: 400;
    color: var(--md-top-app-bar-headline-color, var(--md-sys-color-on-surface, #1D1B20));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .subtitle {
    margin: 0;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    font-weight: 400;
    color: var(--md-top-app-bar-subtitle-color, var(--md-sys-color-on-surface-variant, #49454F));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Center-aligned variant (Default) */
  :host([variant="center-aligned"]) .title-container,
  :host(:not([variant])) .title-container {
    text-align: center;
    align-items: center;
  }

  /* Small variant */
  :host([variant="small"]) .title-container {
    text-align: start;
    align-items: flex-start;
  }

  /* Medium variant */
  :host([variant="medium"]) .headline-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 48px;
    padding: 0 16px 16px 16px;
    box-sizing: border-box;
  }

  :host([variant="medium"]) .headline-row .headline {
    font-size: 24px;
    line-height: 32px;
    font-weight: 400;
  }

  /* Large variant */
  :host([variant="large"]) .headline-row {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    min-height: 88px;
    padding: 0 16px 20px 16px;
    box-sizing: border-box;
  }

  :host([variant="large"]) .headline-row .headline {
    font-size: 28px;
    line-height: 36px;
    font-weight: 400;
  }
`;

