import { css } from 'lit';

export const menuStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--md-sys-typescale-font-family, inherit);
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none;
  }

  .trigger-wrapper {
    display: inline-flex;
    align-items: center;
  }

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

  .menu-surface {
    display: none;
    position: absolute;
    z-index: 999;
    min-width: var(--md-menu-min-width, 112px);
    max-width: var(--md-menu-max-width, 280px);
    max-height: var(--md-menu-max-height, calc(100vh - 32px));
    box-sizing: border-box;
    padding: 8px 0;
    margin: 0;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    background-color: var(--md-sys-color-surface-container, #F3EDF7);
    color: var(--md-sys-color-on-surface, #1D1B20);
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.30));
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    outline: none;
    user-select: none;
    -webkit-overflow-scrolling: touch;
    transform-origin: top left;
  }

  :host([open]) .menu-surface {
    display: flex;
    flex-direction: column;
    animation: md-menu-fade-in 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  :host([quick]) .menu-surface {
    animation: none;
  }

  :host([placement^='top']) .menu-surface {
    transform-origin: bottom left;
  }

  :host([placement$='end']) .menu-surface,
  :host([alignment='end']) .menu-surface {
    transform-origin: top right;
  }

  :host([placement='top-end']) .menu-surface {
    transform-origin: bottom right;
  }

  @keyframes md-menu-fade-in {
    from {
      opacity: 0;
      transform: scale(0.92, 0.8);
    }
    to {
      opacity: 1;
      transform: scale(1, 1);
    }
  }

  /* Fixed positioning when anchored to external elements */
  :host([positioning='fixed']) .menu-surface,
  .menu-surface.is-fixed {
    position: fixed;
  }

  /* Scrollbar styles */
  .menu-surface::-webkit-scrollbar {
    width: 6px;
  }

  .menu-surface::-webkit-scrollbar-thumb {
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: 3px;
  }
`;

export const menuItemStyles = css`
  :host {
    display: flex;
    outline: none;
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  :host([hidden]) {
    display: none;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
    cursor: not-allowed;
  }

  .item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 48px;
    padding: 0 12px;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: var(--md-sys-color-on-surface, #1D1B20);
    background: transparent;
    border: none;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    gap: 12px;
    transition: background-color 150ms ease, color 150ms ease;
    outline: none;
  }

  :host([dense]) .item {
    min-height: 36px;
    font-size: 13px;
    padding: 0 8px;
    gap: 8px;
  }

  .item:hover {
    background-color: var(--md-sys-color-surface-container-highest, rgba(29, 27, 32, 0.08));
  }

  :host([selected]) .item,
  :host([active]) .item {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
    font-weight: 500;
  }

  :host(:focus-visible) .item,
  .item:focus-visible {
    background-color: var(--md-sys-color-surface-container-highest, rgba(29, 27, 32, 0.12));
  }

  .start {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: 24px;
    --md-icon-size: 24px;
    flex-shrink: 0;
    min-width: 24px;
  }

  :host([dense]) .start {
    font-size: 20px;
    --md-icon-size: 20px;
    min-width: 20px;
  }

  :host([selected]) .start,
  :host([active]) .start {
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }

  .headline {
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .supporting-text {
    font-size: var(--md-sys-typescale-body-small-size, 12px);
    line-height: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host([selected]) .supporting-text,
  :host([active]) .supporting-text {
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  .headline:empty,
  .supporting-text:empty,
  .trailing-supporting-text:empty {
    display: none;
  }

  .end {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: var(--md-sys-typescale-label-small-size, 11px);
    flex-shrink: 0;
    gap: 8px;
    margin-left: auto;
  }

  .trailing-supporting-text {
    font-size: 11px;
    letter-spacing: 0.5px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  :host([selected]) .end,
  :host([selected]) .trailing-supporting-text,
  :host([active]) .end,
  :host([active]) .trailing-supporting-text {
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  .trailing-icon {
    font-size: 20px;
    --md-icon-size: 20px;
  }

  .check-icon {
    font-size: 20px;
    --md-icon-size: 20px;
    color: var(--md-sys-color-primary, #6750A4);
  }
`;
