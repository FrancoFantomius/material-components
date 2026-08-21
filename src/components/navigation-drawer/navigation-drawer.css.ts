import { css } from 'lit';

export const navigationDrawerStyles = css`
  :host {
    display: contents;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  .scrim {
    position: fixed;
    inset: 0;
    background-color: var(--md-navigation-drawer-scrim-color, rgba(0, 0, 0, 0.32));
    backdrop-filter: blur(1px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1),
                visibility 250ms cubic-bezier(0.2, 0, 0, 1);
    z-index: 999;
  }

  :host([open]) .scrim {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  .drawer {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: var(--md-navigation-drawer-width, 360px);
    max-width: calc(100vw - 56px);
    background-color: var(--md-navigation-drawer-container-color, var(--md-sys-color-surface-container-low, #F7F2FA));
    color: var(--md-navigation-drawer-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    overflow: hidden;
    z-index: 1000;
  }

  /* Modal Variant (Default) */
  :host(:not([type="standard"])) .drawer,
  :host([type="modal"]) .drawer {
    position: fixed;
    top: 0;
    bottom: 0;
    height: 100dvh;
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
    transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
                visibility 250ms cubic-bezier(0.2, 0, 0, 1);
    visibility: hidden;
  }

  /* Left Pivot (Default) */
  :host(:not([pivot="right"])) .drawer {
    left: 0;
    border-radius: 0 16px 16px 0;
    transform: translateX(-100%);
  }

  :host([open]:not([pivot="right"])) .drawer {
    transform: translateX(0);
    visibility: visible;
  }

  /* Right Pivot */
  :host([pivot="right"]) .drawer {
    right: 0;
    border-radius: 16px 0 0 16px;
    transform: translateX(100%);
  }

  :host([pivot="right"][open]) .drawer {
    transform: translateX(0);
    visibility: visible;
  }

  /* Standard Variant */
  :host([type="standard"]) {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  :host([type="standard"]) .scrim {
    display: none;
  }

  :host([type="standard"]) .drawer {
    position: relative;
    height: 100%;
    border-right: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: 0;
    transform: none;
    visibility: visible;
  }

  :host([type="standard"][pivot="right"]) .drawer {
    border-right: none;
    border-left: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([type="standard"]:not([open])) {
    display: none;
  }

  /* Responsive Variant (Docked standard drawer on large screens, modal on mobile) */
  @media (min-width: 961px) {
    :host([responsive]),
    :host([type="responsive"]) {
      display: block;
      width: var(--md-navigation-drawer-width, 280px);
      flex-shrink: 0;
      height: calc(100vh - var(--md-top-app-bar-height, 64px));
      position: sticky;
      top: var(--md-top-app-bar-height, 64px);
      z-index: 10;
    }

    :host([responsive][closed]),
    :host([type="responsive"][closed]) {
      display: none !important;
    }

    :host([responsive]) .scrim,
    :host([type="responsive"]) .scrim {
      display: none !important;
    }

    :host([responsive]) .drawer,
    :host([type="responsive"]) .drawer {
      position: relative;
      top: auto;
      left: auto;
      right: auto;
      bottom: auto;
      height: 100%;
      width: 100%;
      max-width: none;
      border-right: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
      border-radius: 0;
      transform: none !important;
      visibility: visible !important;
      box-shadow: none;
      background-color: var(--md-navigation-drawer-container-color, var(--md-sys-color-surface, #FEF7FF));
    }

    :host([responsive][pivot="right"]) .drawer,
    :host([type="responsive"][pivot="right"]) .drawer {
      border-right: none;
      border-left: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    }
  }

  @media (max-width: 960px) {
    :host([responsive]),
    :host([type="responsive"]) {
      display: contents;
    }

    :host([responsive]) .drawer,
    :host([type="responsive"]) .drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      height: 100dvh;
      box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
      transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
                  visibility 250ms cubic-bezier(0.2, 0, 0, 1);
      visibility: hidden;
    }

    :host([responsive]:not([pivot="right"])) .drawer,
    :host([type="responsive"]:not([pivot="right"])) .drawer {
      left: 0;
      border-radius: 0 16px 16px 0;
      transform: translateX(-100%);
    }

    :host([responsive][open]:not([pivot="right"])) .drawer,
    :host([type="responsive"][open]:not([pivot="right"])) .drawer {
      transform: translateX(0);
      visibility: visible;
    }

    :host([responsive][pivot="right"]) .drawer,
    :host([type="responsive"][pivot="right"]) .drawer {
      right: 0;
      border-radius: 16px 0 0 16px;
      transform: translateX(100%);
    }

    :host([responsive][pivot="right"][open]) .drawer,
    :host([type="responsive"][pivot="right"][open]) .drawer {
      transform: translateX(0);
      visibility: visible;
    }
  }

  .header {
    display: flex;
    flex-direction: column;
    padding: 24px 28px 16px 28px;
    box-sizing: border-box;
    gap: 4px;
  }

  .headline {
    margin: 0;
    font-size: var(--md-sys-typescale-title-small-size, 14px);
    line-height: 20px;
    font-weight: 500;
    color: var(--md-navigation-drawer-headline-color, var(--md-sys-color-on-surface-variant, #49454F));
    text-transform: uppercase;
    letter-spacing: 0.1px;
  }

  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 12px;
    box-sizing: border-box;
    gap: 2px;
  }

  .content::-webkit-scrollbar {
    width: 6px;
  }

  .content::-webkit-scrollbar-thumb {
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: 4px;
  }

  .footer {
    display: flex;
    flex-direction: column;
    padding: 12px 16px 16px 16px;
    box-sizing: border-box;
    gap: 8px;
  }
`;

export const navigationDrawerItemStyles = css`
  :host {
    display: block;
    outline: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    margin-bottom: 4px;
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
    padding: 0 24px 0 16px;
    box-sizing: border-box;
    border-radius: var(--md-navigation-drawer-item-shape, 28px);
    font-family: var(--md-sys-typescale-font-family, inherit);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    text-decoration: none;
    gap: 12px;
    user-select: none;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1),
                color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .item:hover {
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
  }

  /* Active / Selected State */
  :host([active]) .item,
  :host([selected]) .item {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
    font-weight: 500;
  }

  :host([active]) .start,
  :host([selected]) .start {
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  .start {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    flex-shrink: 0;
  }

  .label-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    justify-content: center;
  }

  .label {
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .end {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: var(--md-sys-typescale-label-medium-size, 12px);
    font-weight: 500;
    color: inherit;
    flex-shrink: 0;
  }

  .badge {
    padding: 2px 8px;
    font-size: 11px;
    font-weight: 500;
    line-height: 16px;
    border-radius: 8px;
    background-color: var(--md-sys-color-surface-container-highest, #E6E0E9);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    letter-spacing: 0.2px;
  }

  :host([active]) .badge,
  :host([selected]) .badge {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
  }
`;
