import { css } from 'lit';

export const searchBarStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    position: relative;
    width: 100%;
    max-width: var(--md-search-bar-max-width, 100%);
    font-family: var(--md-sys-typescale-font-family, inherit);
    color: var(--md-sys-color-on-surface, #1D1B20);
    vertical-align: middle;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .scrim {
    display: none;
  }

  /* Scrim when active in docked mode to catch outside clicks */
  :host([active]) .scrim {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 40;
    background: transparent;
  }

  .search-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background-color: var(--md-search-bar-container-color, var(--md-sys-color-surface-container-high, #ECE6F0));
    border-radius: var(--md-sys-shape-corner-full, 28px);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                border-radius 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .search-bar-header {
    display: flex;
    align-items: center;
    min-height: 56px;
    height: 56px;
    padding: 0 8px 0 16px;
    box-sizing: border-box;
    gap: 8px;
  }

  .leading-slot, .trailing-slot {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    border-radius: 50%;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    padding: 0;
    outline: none;
    position: relative;
    transition: background-color 150ms ease;
  }

  .icon-btn:hover {
    background-color: rgba(73, 69, 79, 0.08);
  }

  .icon-btn:focus-visible {
    background-color: rgba(73, 69, 79, 0.12);
  }

  .input-wrapper {
    display: flex;
    flex: 1;
    min-width: 0;
    align-items: center;
    position: relative;
  }

  input {
    width: 100%;
    border: none;
    background: transparent;
    outline: none;
    font-family: inherit;
    font-size: var(--md-sys-typescale-body-large-size, 16px);
    line-height: var(--md-sys-typescale-body-large-line-height, 24px);
    color: var(--md-sys-color-on-surface, #1D1B20);
    padding: 0 4px;
    margin: 0;
    box-sizing: border-box;
  }

  input::placeholder {
    color: var(--md-sys-color-on-surface-variant, #49454F);
    opacity: 0.8;
  }

  /* Active Docked Mode */
  :host([active]) .search-container {
    z-index: 50;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px 28px 16px 16px);
    box-shadow: var(--md-sys-elevation-level3, 0px 4px 8px 3px rgba(0, 0, 0, 0.15));
  }

  /* Divider when active */
  .divider {
    display: none;
    height: 1px;
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    margin: 0 16px;
  }

  :host([active]) .divider {
    display: block;
  }

  /* Suggestions / Content Container */
  .suggestions-container {
    display: none;
    flex-direction: column;
    max-height: 360px;
    overflow-y: auto;
    padding: 8px 0;
    box-sizing: border-box;
  }

  :host([active]) .suggestions-container {
    display: flex;
  }

  .suggestion-item {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: 0 16px;
    gap: 16px;
    box-sizing: border-box;
    cursor: pointer;
    position: relative;
    user-select: none;
    color: var(--md-sys-color-on-surface, #1D1B20);
    transition: background-color 150ms ease;
  }

  .suggestion-item:hover,
  .suggestion-item.highlighted {
    background-color: rgba(73, 69, 79, 0.08);
  }

  .suggestion-item.selected {
    background-color: rgba(73, 69, 79, 0.12);
  }

  .suggestion-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    flex-shrink: 0;
  }

  .suggestion-text {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    overflow: hidden;
  }

  .suggestion-label {
    font-size: var(--md-sys-typescale-body-large-size, 16px);
    line-height: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .suggestion-supporting {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 2px;
  }

  .suggestion-trailing {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    flex-shrink: 0;
  }

  .extra-content {
    box-sizing: border-box;
  }

  /* Responsive Fullscreen / Mobile Mode */
  @media (max-width: 600px) {
    :host([responsive][active]) .scrim {
      display: none;
    }

    :host([responsive][active]) .search-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      border-radius: 0;
      box-shadow: none;
      z-index: 9999;
      background-color: var(--md-search-bar-container-color, var(--md-sys-color-surface-container-high, #ECE6F0));
    }

    :host([responsive][active]) .suggestions-container {
      flex: 1;
      max-height: calc(100vh - 57px);
    }
  }

  /* Forced Fullscreen attribute */
  :host([fullscreen][active]) .scrim {
    display: none;
  }

  :host([fullscreen][active]) .search-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    border-radius: 0;
    box-shadow: none;
    z-index: 9999;
    background-color: var(--md-search-bar-container-color, var(--md-sys-color-surface-container-high, #ECE6F0));
  }

  :host([fullscreen][active]) .suggestions-container {
    flex: 1;
    max-height: calc(100vh - 57px);
  }
`;

