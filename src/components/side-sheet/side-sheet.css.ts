import { css } from 'lit';

export const sideSheetStyles = css`
  :host {
    display: contents;
    font-family: var(--md-sys-typescale-font-family, inherit);
  }

  /* Scrim for modal variant */
  .scrim {
    position: fixed;
    inset: 0;
    background-color: var(--md-side-sheet-scrim-color, var(--md-sys-color-scrim, rgba(0, 0, 0, 0.32)));
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

  /* Side Sheet Container */
  .sheet {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: var(--md-side-sheet-width, 400px);
    max-width: calc(100vw - 56px);
    background-color: var(--md-side-sheet-container-color, var(--md-sys-color-surface-container-low, #F7F2FA));
    color: var(--md-side-sheet-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    overflow: hidden;
    z-index: 1000;
  }

  /* Modal Mode (Overlay with scrim) */
  :host([type="modal"]) .sheet,
  :host([modal]) .sheet {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: auto;
    height: 100dvh;
    border-radius: var(--md-side-sheet-shape, 16px) 0 0 var(--md-side-sheet-shape, 16px);
    box-shadow: var(--md-side-sheet-elevation, var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15)));
    transform: translateX(100%);
    visibility: hidden;
    transition: transform 300ms cubic-bezier(0.2, 0, 0, 1),
                visibility 300ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([open][type="modal"]) .sheet,
  :host([open][modal]) .sheet {
    transform: translateX(0);
    visibility: visible;
  }

  /* Start / Left placement for Modal */
  :host([type="modal"][side="start"]) .sheet,
  :host([modal][side="start"]) .sheet,
  :host([type="modal"][side="left"]) .sheet,
  :host([modal][side="left"]) .sheet {
    left: 0;
    right: auto;
    border-radius: 0 var(--md-side-sheet-shape, 16px) var(--md-side-sheet-shape, 16px) 0;
    transform: translateX(-100%);
  }

  :host([open][type="modal"][side="start"]) .sheet,
  :host([open][modal][side="start"]) .sheet,
  :host([open][type="modal"][side="left"]) .sheet,
  :host([open][modal][side="left"]) .sheet {
    transform: translateX(0);
    visibility: visible;
  }

  /* Standard Mode (In-flow side panel) */
  :host(:not([type="modal"]):not([modal])),
  :host([type="standard"]) {
    display: block;
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: hidden;
    transition: width 300ms cubic-bezier(0.2, 0, 0, 1),
                min-width 300ms cubic-bezier(0.2, 0, 0, 1),
                max-width 300ms cubic-bezier(0.2, 0, 0, 1),
                opacity 250ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host(:not([type="modal"]):not([modal]):not([open])),
  :host([type="standard"]:not([open])) {
    width: 0 !important;
    min-width: 0 !important;
    max-width: 0 !important;
    opacity: 0;
    pointer-events: none;
    visibility: hidden;
  }

  :host(:not([type="modal"]):not([modal])[open]),
  :host([type="standard"][open]) {
    width: var(--md-side-sheet-width, 400px);
    opacity: 1;
    visibility: visible;
  }

  :host(:not([type="modal"]):not([modal])) .scrim,
  :host([type="standard"]) .scrim {
    display: none;
  }

  :host(:not([type="modal"]):not([modal])) .sheet,
  :host([type="standard"]) .sheet {
    position: relative;
    height: 100%;
    width: var(--md-side-sheet-width, 400px);
    min-width: var(--md-side-sheet-width, 400px);
    transform: none;
    visibility: visible;
    box-shadow: none;
    background-color: var(--md-side-sheet-container-color, var(--md-sys-color-surface, #FEF7FF));
    border-left: 1px solid var(--md-side-sheet-divider-color, var(--md-sys-color-outline-variant, #CAC4D0));
    border-right: none;
  }

  /* Start placement border (Standard) */
  :host(:not([type="modal"]):not([modal])[side="start"]) .sheet,
  :host(:not([type="modal"]):not([modal])[side="left"]) .sheet,
  :host([type="standard"][side="start"]) .sheet,
  :host([type="standard"][side="left"]) .sheet {
    border-right: 1px solid var(--md-side-sheet-divider-color, var(--md-sys-color-outline-variant, #CAC4D0));
    border-left: none;
  }

  /* Header Section */
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px 16px 24px;
    min-height: 56px;
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
    color: var(--md-side-sheet-headline-color, var(--md-sys-color-on-surface, #1D1B20));
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subhead {
    margin: 0;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    color: var(--md-side-sheet-subhead-color, var(--md-sys-color-on-surface-variant, #49454F));
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
    background-color: var(--md-side-sheet-divider-color, var(--md-sys-color-outline-variant, #CAC4D0));
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
