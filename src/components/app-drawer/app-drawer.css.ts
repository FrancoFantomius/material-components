import { css } from 'lit';

export const appDrawerStyles = css`
  :host {
    display: inline-block;
    position: relative;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  :host([hidden]) {
    display: none;
  }

  .trigger-container {
    display: inline-flex;
  }

  .backdrop {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 990;
    background-color: transparent;
  }

  :host([modal]) .backdrop {
    background-color: rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(1px);
  }

  :host([open][modal]) .backdrop {
    display: block;
  }

  .popover {
    display: none;
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    z-index: 1000;
    width: var(--md-app-drawer-width, 328px);
    max-width: calc(100vw - 24px);
    max-height: var(--md-app-drawer-max-height, 460px);
    box-sizing: border-box;
    padding: 16px;
    border-radius: var(--md-sys-shape-corner-extra-large, 24px);
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    color: var(--md-sys-color-on-surface, #1D1B20);
    box-shadow: var(--md-sys-elevation-level3, 0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px rgba(0, 0, 0, 0.3));
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: var(--md-sys-color-outline-variant, #CAC4D0) transparent;
  }

  :host([alignment='start']) .popover,
  :host([pivot='left']) .popover {
    right: auto;
    left: 0;
  }

  :host([open]) .popover {
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: md-app-drawer-in 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  @keyframes md-app-drawer-in {
    from {
      opacity: 0;
      transform: scale(0.92) translateY(-8px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px;
    min-height: 40px;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }

  .edit-btn,
  .reset-btn {
    --md-icon-size: 20px;
    font-size: 20px;
  }

  :host([editing]) .grid ::slotted(md-app-drawer-item),
  :host([editing]) .grid ::slotted(md-app-item),
  :host([editing]) .grid ::slotted(md-app-launcher-item) {
    cursor: grab;
  }

  .headline {
    margin: 0;
    font-size: var(--md-sys-typescale-title-medium-size, 16px);
    font-weight: 500;
    line-height: 24px;
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var(--md-app-drawer-columns, 3), 1fr);
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }

  ::slotted([draggable='true']) {
    cursor: grab;
  }

  ::slotted([dragging]),
  ::slotted(.is-dragging) {
    opacity: 0.4;
    transform: scale(0.95);
    cursor: grabbing !important;
  }

  ::slotted([drag-over]),
  ::slotted(.drag-over) {
    outline: 2px dashed var(--md-sys-color-primary, #6750A4);
    outline-offset: -2px;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    background-color: var(--md-sys-color-surface-container-highest, rgba(103, 80, 164, 0.08));
  }

  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    padding-top: 12px;
    margin-top: 4px;
    border-top: 1px solid var(--md-sys-color-outline-variant, rgba(0, 0, 0, 0.1));
  }

  .footer ::slotted(*) {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }

  .footer:empty {
    display: none;
  }
`;

export const appDrawerItemStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  :host([hidden]) {
    display: none;
  }

  .item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    min-height: 84px;
    padding: 8px 4px;
    box-sizing: border-box;
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    color: var(--md-sys-color-on-surface, #1D1B20);
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    transition: background-color 150ms ease;
    background: transparent;
    border: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
  }

  .item:hover {
    background-color: var(--md-sys-color-surface-container-highest, rgba(0, 0, 0, 0.06));
  }

  :host([active]) .item,
  :host([selected]) .item {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8);
    color: var(--md-sys-color-on-secondary-container, #1D192B);
  }

  :host([disabled]) .item {
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }

  :host([draggable='true']) .item {
    cursor: grab;
  }

  :host([dragging]) {
    opacity: 0.4;
    transform: scale(0.95);
  }

  :host([dragging]) .item {
    cursor: grabbing;
  }

  :host([drag-over]) .item {
    outline: 2px dashed var(--md-sys-color-primary, #6750A4);
    outline-offset: -2px;
    background-color: var(--md-sys-color-surface-container-highest, rgba(103, 80, 164, 0.08));
  }

  .icon-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    margin-bottom: 4px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    color: var(--md-sys-color-primary, #6750A4);
  }

  .icon-wrapper md-icon {
    --md-icon-size: 28px;
    font-size: 28px;
  }

  .icon-image {
    width: 32px;
    height: 32px;
    object-fit: contain;
    border-radius: 4px;
  }

  .label {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 12px;
    line-height: 16px;
    font-weight: 500;
    max-width: 100%;
    word-break: break-word;
  }

  .badge-container {
    position: absolute;
    top: 2px;
    right: 2px;
  }
`;
