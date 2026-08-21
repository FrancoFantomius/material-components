import { css } from 'lit';

export const tabsStyles = css`
  :host {
    display: flex;
    position: relative;
    box-sizing: border-box;
    border-bottom: 1px solid var(--md-sys-color-surface-variant, #E7E0EC);
    overflow-x: auto;
    scrollbar-width: none; /* Firefox */
  }

  :host::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }

  .tabs-container {
    display: flex;
    position: relative;
    width: 100%;
  }

  .indicator {
    position: absolute;
    bottom: 0;
    height: 3px;
    background-color: var(--md-sys-color-primary, #6750A4);
    border-radius: 3px 3px 0 0;
    transition: transform 250ms cubic-bezier(0.2, 0, 0, 1),
                width 250ms cubic-bezier(0.2, 0, 0, 1);
    pointer-events: none;
  }
`;

export const tabStyles = css`
  :host {
    display: inline-flex;
    flex: 1;
    min-width: 90px;
    height: 48px;
    outline: none;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  .tab {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0 16px;
    gap: 8px;
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-size: var(--md-sys-typescale-title-small-size, 14px);
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.1px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    transition: color 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([active]) .tab {
    color: var(--md-sys-color-primary, #6750A4);
  }

  .content {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 1;
  }
`;

