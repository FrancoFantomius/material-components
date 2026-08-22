import { css } from 'lit';

export const bottomSheetStyles = css`
  :host {
    display: contents;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  /* Scrim for modal variant */
  .scrim {
    position: fixed;
    inset: 0;
    background-color: var(--md-bottom-sheet-scrim-color, var(--md-sys-color-scrim, rgba(0, 0, 0, 0.32)));
    backdrop-filter: blur(1px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 250ms cubic-bezier(0.2, 0, 0, 1),
                visibility 250ms cubic-bezier(0.2, 0, 0, 1);
    z-index: 999;
  }

  :host([open][modal]) .scrim,
  :host([open][type="modal"]) .scrim {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  /* Bottom Sheet Container */
  .sheet {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--md-bottom-sheet-container-color, var(--md-sys-color-surface-container-low, #F7F2FA));
    color: var(--md-bottom-sheet-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    overflow: hidden;
    z-index: 1000;
    border-top-left-radius: var(--md-bottom-sheet-shape, 28px);
    border-top-right-radius: var(--md-bottom-sheet-shape, 28px);
  }

  /* Modal Mode (Default overlay or when type="modal" or [modal]) */
  :host([type="modal"]) .sheet,
  :host([modal]) .sheet {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    max-width: var(--md-bottom-sheet-max-width, 640px);
    margin: 0 auto;
    max-height: var(--md-bottom-sheet-max-height, calc(100dvh - 56px));
    box-shadow: var(--md-bottom-sheet-elevation, var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15)));
    transform: translateY(100%);
    visibility: hidden;
    transition: transform 300ms cubic-bezier(0.2, 0, 0, 1),
                visibility 300ms cubic-bezier(0.2, 0, 0, 1);
    will-change: transform;
  }

  :host([open][type="modal"]) .sheet,
  :host([open][modal]) .sheet {
    transform: translateY(0);
    visibility: visible;
  }

  .sheet.is-dragging {
    transition: none !important;
    user-select: none;
  }

  /* Fullscreen Mode */
  :host([fullscreen][type="modal"]) .sheet,
  :host([fullscreen][modal]) .sheet {
    max-width: 100%;
    max-height: 100dvh;
    border-radius: 0;
  }

  /* Standard Mode (In-flow / docked panel) */
  :host(:not([type="modal"]):not([modal])) {
    display: block;
    width: 100%;
    overflow: hidden;
    transition: max-height 300ms cubic-bezier(0.2, 0, 0, 1),
                opacity 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host(:not([type="modal"]):not([modal]):not([open])) {
    max-height: 0 !important;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  :host(:not([type="modal"]):not([modal])[open]) {
    max-height: var(--md-bottom-sheet-standard-max-height, 600px);
    opacity: 1;
    visibility: visible;
  }

  :host(:not([type="modal"]):not([modal])) .scrim {
    display: none;
  }

  :host(:not([type="modal"]):not([modal])) .sheet {
    position: relative;
    width: 100%;
    max-width: 100%;
    transform: none;
    visibility: visible;
    box-shadow: none;
    border-top: 1px solid var(--md-bottom-sheet-divider-color, var(--md-sys-color-outline-variant, #CAC4D0));
    background-color: var(--md-bottom-sheet-container-color, var(--md-sys-color-surface, #FEF7FF));
  }

  /* Drag Handle Section */
  .drag-handle-container {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px 0 8px 0;
    width: 100%;
    cursor: grab;
    touch-action: none;
    flex-shrink: 0;
    user-select: none;
  }

  .drag-handle-container:active,
  .sheet.is-dragging .drag-handle-container {
    cursor: grabbing;
  }

  .drag-handle {
    width: 32px;
    height: 4px;
    border-radius: 2px;
    background-color: var(--md-bottom-sheet-drag-handle-color, var(--md-sys-color-outline, #79747E));
    transition: background-color 150ms ease;
  }

  :host([hide-drag-handle]) .drag-handle-container {
    display: none;
  }

  /* Header Section */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px 12px 24px;
    min-height: 48px;
    box-sizing: border-box;
    gap: 8px;
    flex-shrink: 0;
  }

  .header-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    gap: 2px;
  }

  .headline {
    margin: 0;
    font-size: var(--md-sys-typescale-title-large-size, 20px);
    line-height: 28px;
    font-weight: 500;
    color: var(--md-bottom-sheet-headline-color, var(--md-sys-color-on-surface, #1D1B20));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subhead {
    margin: 0;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    color: var(--md-bottom-sheet-subhead-color, var(--md-sys-color-on-surface-variant, #49454F));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .close-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Divider */
  .divider {
    height: 1px;
    background-color: var(--md-bottom-sheet-divider-color, var(--md-sys-color-outline-variant, #CAC4D0));
    width: 100%;
    flex-shrink: 0;
  }

  /* Content Section */
  .content {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 16px 24px;
    box-sizing: border-box;
    gap: 16px;
    -webkit-overflow-scrolling: touch;
  }

  .content::-webkit-scrollbar {
    width: 6px;
  }

  .content::-webkit-scrollbar-thumb {
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: 4px;
  }

  /* Footer Section */
  .footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 16px 24px;
    box-sizing: border-box;
    gap: 8px;
    flex-shrink: 0;
  }
`;
