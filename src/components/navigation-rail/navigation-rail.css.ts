import { css } from 'lit';

export const navigationRailStyles = css`
  :host {
    display: inline-flex;
    flex-direction: column;
    width: var(--md-navigation-rail-width, 80px);
    min-width: var(--md-navigation-rail-width, 80px);
    height: var(--md-navigation-rail-height, 100%);
    min-height: 100%;
    box-sizing: border-box;
    background-color: var(--md-navigation-rail-container-color, var(--md-sys-color-surface, #FEF7FF));
    color: var(--md-navigation-rail-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    border-right: var(--md-navigation-rail-border, 1px solid var(--md-sys-color-outline-variant, #CAC4D0));
    font-family: var(--md-sys-typescale-font-family, inherit);
    user-select: none;
    position: relative;
  }

  .rail {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 12px 0;
    box-sizing: border-box;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .rail::-webkit-scrollbar {
    width: 4px;
  }

  .rail::-webkit-scrollbar-thumb {
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: 4px;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
    width: 100%;
    flex-shrink: 0;
  }

  .destinations {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    width: 100%;
    flex: 1;
  }

  /* Alignment Variants */
  :host([alignment="top"]) .destinations {
    justify-content: flex-start;
  }

  :host([alignment="center"]) .destinations {
    justify-content: center;
  }

  :host([alignment="bottom"]) .destinations {
    justify-content: flex-end;
  }

  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    width: 100%;
    padding-top: 12px;
    flex-shrink: 0;
  }
`;

export const navigationRailItemStyles = css`
  :host {
    display: block;
    width: 100%;
    box-sizing: border-box;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 56px;
    padding: 4px 0 8px 0;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    text-decoration: none;
    cursor: pointer;
    outline: none;
    border-radius: 12px;
    transition: color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  .indicator-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active-indicator {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--md-navigation-rail-indicator-width, 56px);
    height: var(--md-navigation-rail-indicator-height, 32px);
    border-radius: var(--md-navigation-rail-indicator-shape, 16px);
    background-color: transparent;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                color 200ms cubic-bezier(0.2, 0, 0, 1);
    overflow: hidden;
  }

  .item:hover .active-indicator {
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
  }

  /* Active / Selected State */
  :host([active]) .active-indicator,
  :host([selected]) .active-indicator {
    background-color: var(--md-navigation-rail-active-indicator-color, var(--md-sys-color-secondary-container, #E8DEF8));
    color: var(--md-navigation-rail-active-icon-color, var(--md-sys-color-on-secondary-container, #1D192B));
  }

  :host([active]) .item:hover .active-indicator,
  :host([selected]) .item:hover .active-indicator {
    background-color: var(--md-navigation-rail-active-indicator-hover-color, var(--md-sys-color-secondary-container, #E8DEF8));
  }

  .icon-slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: inherit;
    font-size: 24px;
    line-height: 1;
    z-index: 1;
  }

  .label-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 4px;
    box-sizing: border-box;
  }

  .label {
    font-size: var(--md-sys-typescale-label-medium-size, 12px);
    line-height: var(--md-sys-typescale-label-medium-line-height, 16px);
    font-weight: 500;
    letter-spacing: 0.5px;
    text-align: center;
    max-width: 72px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--md-navigation-rail-label-color, var(--md-sys-color-on-surface-variant, #49454F));
    transition: color 150ms cubic-bezier(0.2, 0, 0, 1),
                font-weight 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([active]) .label,
  :host([selected]) .label {
    color: var(--md-navigation-rail-active-label-color, var(--md-sys-color-on-surface, #1D1B20));
    font-weight: 700;
  }

  :host([hide-label]) .label-container,
  :host([hide-labels]) .label-container {
    display: none;
  }

  /* Badge styling */
  .badge-slot {
    position: absolute;
    top: -2px;
    right: 4px;
    z-index: 2;
    pointer-events: none;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    background-color: var(--md-sys-color-error, #B3261E);
    color: var(--md-sys-color-on-error, #FFFFFF);
    box-sizing: border-box;
  }

  .badge.dot {
    min-width: 6px;
    width: 6px;
    height: 6px;
    padding: 0;
    border-radius: 50%;
  }

  :host([active]) .badge,
  :host([selected]) .badge {
    background-color: var(--md-sys-color-error, #B3261E);
    color: var(--md-sys-color-on-error, #FFFFFF);
  }
`;
