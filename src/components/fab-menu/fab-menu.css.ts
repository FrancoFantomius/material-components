import { css } from 'lit';

export const fabMenuStyles = css`
  :host {
    display: inline-flex;
    position: relative;
    outline: none;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  /* --- Scrim Overlay for Modal Mode --- */
  .scrim {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--md-sys-color-scrim, rgba(0, 0, 0, 0.32));
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    z-index: 99;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1),
                visibility 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([modal][open]) .scrim {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  /* --- Main Container & Stacking --- */
  .container {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }

  /* --- Trigger FAB Button --- */
  .trigger-btn {
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
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0, 0, 0, 0.30));
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                transform 250ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
    z-index: 2;
  }

  .trigger-btn:hover {
    box-shadow: var(--md-sys-elevation-level4, 0px 2px 3px 0px rgba(0, 0, 0, 0.30));
  }

  :host([lowered]) .trigger-btn {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  :host([lowered]) .trigger-btn:hover {
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
  }

  /* --- Trigger Sizes --- */
  :host(:not([size])) .trigger-btn,
  :host([size="medium"]) .trigger-btn {
    width: 56px;
    height: 56px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
  }

  :host([size="small"]) .trigger-btn {
    width: 40px;
    height: 40px;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
  }

  :host([size="large"]) .trigger-btn {
    width: 96px;
    height: 96px;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
  }

  :host([size="large"]) md-icon {
    --md-icon-size: 36px;
  }

  /* --- Extended Trigger FAB --- */
  :host([extended]) .trigger-btn {
    width: auto;
    min-width: 80px;
    height: 56px;
    padding: 0 20px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
    gap: 12px;
  }

  .trigger-content {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    position: relative;
    z-index: 1;
  }

  .trigger-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: transform 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([open]:not([open-icon])) .trigger-icon.rotate {
    transform: rotate(45deg);
  }

  .trigger-label {
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    white-space: nowrap;
  }

  /* --- Sub-FAB Items Stack Container --- */
  .items {
    position: absolute;
    display: flex;
    gap: 14px;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1),
                visibility 250ms cubic-bezier(0.2, 0, 0, 1),
                transform 250ms cubic-bezier(0.2, 0, 0, 1);
    z-index: 1;
  }

  :host([open]) .items {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none !important;
  }

  /* Directions */
  :host(:not([direction])) .items,
  :host([direction="up"]) .items {
    flex-direction: column-reverse;
    bottom: calc(100% + 14px);
    right: 0;
    align-items: flex-end;
    transform: translateY(16px) scale(0.9);
  }

  :host([direction="down"]) .items {
    flex-direction: column;
    top: calc(100% + 14px);
    right: 0;
    align-items: flex-end;
    transform: translateY(-16px) scale(0.9);
  }

  :host([direction="left"]) .items {
    flex-direction: row-reverse;
    right: calc(100% + 14px);
    top: 50%;
    transform: translateY(-50%) translateX(16px) scale(0.9);
    align-items: center;
  }

  :host([direction="left"][open]) .items {
    transform: translateY(-50%) !important;
  }

  :host([direction="right"]) .items {
    flex-direction: row;
    left: calc(100% + 14px);
    top: 50%;
    transform: translateY(-50%) translateX(-16px) scale(0.9);
    align-items: center;
  }

  :host([direction="right"][open]) .items {
    transform: translateY(-50%) !important;
  }
`;

export const fabMenuItemStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    outline: none;
    vertical-align: middle;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    user-select: none;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .item-container {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    cursor: pointer;
  }

  :host([label-placement="end"]) .item-container {
    flex-direction: row-reverse;
  }

  :host([label-placement="top"]) .item-container {
    flex-direction: column-reverse;
    gap: 6px;
  }

  :host([label-placement="bottom"]) .item-container {
    flex-direction: column;
    gap: 6px;
  }

  /* --- Item Label Pill --- */
  .label-pill {
    display: inline-flex;
    align-items: center;
    padding: 6px 12px;
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    color: var(--md-sys-color-on-surface, #1D1B20);
    border-radius: var(--md-sys-shape-corner-small, 8px);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    white-space: nowrap;
    transition: background-color 150ms ease, box-shadow 150ms ease;
  }

  .item-container:hover .label-pill {
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
  }

  /* --- Sub-FAB Mini Button --- */
  .mini-fab {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
    box-shadow: var(--md-sys-elevation-level2, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  }

  .item-container:hover .mini-fab {
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0, 0, 0, 0.30));
  }

  :host(:not([size])) .mini-fab,
  :host([size="small"]) .mini-fab {
    width: 40px;
    height: 40px;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
  }

  :host([size="medium"]) .mini-fab {
    width: 56px;
    height: 56px;
    border-radius: var(--md-sys-shape-corner-large, 16px);
  }

  :host([lowered]) .mini-fab {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  .icon-wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 1;
  }
`;
