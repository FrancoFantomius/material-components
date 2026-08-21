import { css } from 'lit';

export const listStyles = css`
  :host {
    display: flex;
    flex-direction: column;
    padding: 8px 0;
    box-sizing: border-box;
  }
`;

export const listItemStyles = css`
  :host {
    display: flex;
    outline: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 56px;
    padding: 8px 16px;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    color: var(--md-sys-color-on-surface, #1D1B20);
    text-decoration: none;
    gap: 16px;
    user-select: none;
    overflow: hidden;
  }

  :host([interactive]) .item {
    cursor: pointer;
  }

  .start {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    flex-shrink: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }

  .headline {
    font-size: var(--md-sys-typescale-body-large-size, 16px);
    line-height: 24px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface, #1D1B20);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .supporting-text {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .end {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: var(--md-sys-typescale-label-small-size, 11px);
    flex-shrink: 0;
  }
`;

