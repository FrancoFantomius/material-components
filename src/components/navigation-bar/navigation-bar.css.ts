import { css } from 'lit';

export const navigationBarStyles = css`
  :host {
    display: flex;
    flex-direction: row;
    position: relative;
    width: 100%;
    height: var(--md-navigation-bar-container-height, 80px);
    min-height: 80px;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    background-color: var(--md-navigation-bar-container-color, var(--md-sys-color-surface-container, #F3EDF7));
    color: var(--md-navigation-bar-container-text-color, var(--md-sys-color-on-surface, #1D1B20));
    box-shadow: var(--md-navigation-bar-elevation, none);
    align-items: center;
    justify-content: space-evenly;
    user-select: none;
    overflow: hidden;
    z-index: 1;
  }

  .nav-bar-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    max-width: var(--md-navigation-bar-max-width, 100%);
    margin: 0 auto;
    box-sizing: border-box;
  }

  /* When hidden label mode is applied to bar */
  :host([label-mode="hidden"]) ::slotted(md-navigation-bar-item),
  :host([label-mode="none"]) ::slotted(md-navigation-bar-item) {
    --md-navigation-bar-label-display: none;
  }
`;

export const navigationBarItemStyles = css`
  :host {
    display: flex;
    flex: 1 1 0px;
    min-width: 48px;
    max-width: 168px;
    height: 100%;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    position: relative;
    outline: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    color: var(--md-navigation-bar-item-icon-color, var(--md-sys-color-on-surface-variant, #49454F));
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
    cursor: default;
  }

  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 12px 0 16px 0;
    box-sizing: border-box;
    text-decoration: none;
    color: inherit;
    position: relative;
    outline: none;
    gap: 4px;
  }

  /* Active Indicator Pill */
  .icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--md-navigation-bar-indicator-width, 64px);
    height: var(--md-navigation-bar-indicator-height, 32px);
    border-radius: var(--md-navigation-bar-indicator-shape, 16px);
    position: relative;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .indicator {
    position: absolute;
    inset: 0;
    border-radius: var(--md-navigation-bar-indicator-shape, 16px);
    background-color: var(--md-navigation-bar-indicator-color, var(--md-sys-color-secondary-container, #E8DEF8));
    opacity: 0;
    transform: scaleX(0.5);
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1),
                opacity 200ms cubic-bezier(0.2, 0, 0, 1);
    pointer-events: none;
    z-index: 0;
  }

  :host([active]) .indicator,
  :host([selected]) .indicator {
    opacity: 1;
    transform: scaleX(1);
  }

  .icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: 24px;
    z-index: 1;
    color: var(--md-navigation-bar-item-icon-color, var(--md-sys-color-on-surface-variant, #49454F));
    transition: color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([active]) .icon,
  :host([selected]) .icon {
    color: var(--md-navigation-bar-item-active-icon-color, var(--md-sys-color-on-secondary-container, #1D192B));
  }

  .active-icon {
    display: none;
  }

  :host([active]) .inactive-icon,
  :host([selected]) .inactive-icon {
    display: none;
  }

  :host([active]) .active-icon,
  :host([selected]) .active-icon {
    display: inline-flex;
  }

  /* Badge */
  .badge-slot {
    position: absolute;
    top: 2px;
    right: calc(50% - 24px);
    z-index: 2;
    pointer-events: none;
  }

  .badge {
    position: absolute;
    top: 2px;
    right: calc(50% - 24px);
    z-index: 2;
    pointer-events: none;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--md-sys-color-error, #B3261E);
    color: var(--md-sys-color-on-error, #FFFFFF);
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: 11px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.2px;
    border-radius: 8px;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
  }

  .badge.dot {
    min-width: 6px;
    width: 6px;
    height: 6px;
    padding: 0;
    border-radius: 50%;
    top: 4px;
    right: calc(50% - 16px);
  }

  /* Label */
  .label-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    transition: opacity 150ms cubic-bezier(0.2, 0, 0, 1),
                transform 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .label {
    font-size: var(--md-sys-typescale-label-medium-size, 12px);
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.5px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--md-navigation-bar-item-label-color, var(--md-sys-color-on-surface-variant, #49454F));
    transition: color 200ms cubic-bezier(0.2, 0, 0, 1),
                font-weight 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([active]) .label,
  :host([selected]) .label {
    color: var(--md-navigation-bar-item-active-label-color, var(--md-sys-color-on-surface, #1D1B20));
    font-weight: 700;
  }

  /* Label Mode: hidden */
  :host([label-mode="hidden"]) .label-container,
  :host([label-mode="none"]) .label-container {
    display: none;
  }

  /* Label Mode: selectedShow (only show label when active/selected) */
  :host([label-mode="selectedShow"]:not([active]):not([selected])) .label-container,
  :host([label-mode="selected-show"]:not([active]):not([selected])) .label-container,
  :host([label-mode="selected"]:not([active]):not([selected])) .label-container,
  :host([hide-inactive-labels]:not([active]):not([selected])) .label-container {
    display: none;
  }

  /* Ripple and focus */
  md-ripple {
    border-radius: var(--md-navigation-bar-indicator-shape, 16px);
  }

  md-focus-ring {
    --md-focus-ring-shape: var(--md-navigation-bar-indicator-shape, 16px);
  }
`;
