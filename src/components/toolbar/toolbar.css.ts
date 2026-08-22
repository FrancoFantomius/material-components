import { css } from 'lit';

export const toolbarStyles = css`
  :host {
    display: inline-flex;
    box-sizing: border-box;
    position: relative;
    font-family: var(--md-sys-typescale-font-family, inherit);
    color: var(--md-toolbar-on-container-color, var(--md-sys-color-on-surface, #1D1B20));
    --_bg: var(--md-toolbar-container-color, var(--md-sys-color-surface-container, #F3EDF7));
    --_elevation: var(--md-toolbar-elevation, var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15)));
    --_shape: var(--md-toolbar-shape, var(--md-sys-shape-corner-full, 9999px));
    --_gap: var(--md-toolbar-gap, 8px);
    --_padding: var(--md-toolbar-padding, 8px 12px);
    transition: background-color 200ms cubic-bezier(0.2, 0, 0, 1),
                box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                border-radius 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* --- Floating Mode (Default) --- */
  :host(:not([mode="docked"]):not([docked])) {
    background-color: var(--_bg);
    box-shadow: var(--_elevation);
    border-radius: var(--_shape);
    padding: var(--_padding);
  }

  :host([elevated]:not([mode="docked"]):not([docked])) {
    --_elevation: var(--md-toolbar-elevation, var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)));
  }

  /* --- Docked Mode --- */
  :host([mode="docked"]),
  :host([docked]) {
    display: flex;
    width: 100%;
    background-color: var(--md-toolbar-container-color, var(--md-sys-color-surface, #FEF7FF));
    border-radius: 0;
    box-shadow: var(--md-sys-elevation-level0, none);
    border-top: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    padding: var(--md-toolbar-padding, 8px 16px);
  }

  :host([mode="docked"][dock-position="top"]),
  :host([docked][dock-position="top"]) {
    border-top: none;
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([mode="docked"][dock-position="left"]),
  :host([docked][dock-position="left"]) {
    width: auto;
    height: 100%;
    border-top: none;
    border-right: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([mode="docked"][dock-position="right"]),
  :host([docked][dock-position="right"]) {
    width: auto;
    height: 100%;
    border-top: none;
    border-left: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([mode="docked"][elevated]),
  :host([docked][elevated]) {
    background-color: var(--md-toolbar-container-color, var(--md-sys-color-surface-container, #F3EDF7));
    box-shadow: var(--md-sys-elevation-level2, 0px 2px 6px 2px rgba(0, 0, 0, 0.15));
    border: none;
  }

  /* --- Fixed Positioning --- */
  :host([fixed]) {
    position: fixed;
    z-index: 8;
  }

  :host([fixed]:not([mode="docked"]):not([docked])) {
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
  }

  :host([fixed][mode="docked"]),
  :host([fixed][docked]) {
    bottom: 0;
    left: 0;
    right: 0;
  }

  :host([fixed][mode="docked"][dock-position="top"]),
  :host([fixed][docked][dock-position="top"]) {
    top: 0;
    bottom: auto;
    left: 0;
    right: 0;
  }

  :host([fixed][mode="docked"][dock-position="left"]),
  :host([fixed][docked][dock-position="left"]) {
    top: 0;
    bottom: 0;
    left: 0;
    right: auto;
  }

  :host([fixed][mode="docked"][dock-position="right"]),
  :host([fixed][docked][dock-position="right"]) {
    top: 0;
    bottom: 0;
    right: 0;
    left: auto;
  }

  /* --- Container & Orientation --- */
  .toolbar-container {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    gap: var(--_gap);
    box-sizing: border-box;
  }

  :host(:not([orientation="vertical"])) .toolbar-container,
  :host([orientation="horizontal"]) .toolbar-container {
    flex-direction: row;
    min-height: 48px;
  }

  :host([orientation="vertical"]) {
    --_padding: var(--md-toolbar-padding, 12px 8px);
    width: auto;
  }

  :host([orientation="vertical"]) .toolbar-container {
    flex-direction: column;
    min-width: 48px;
  }

  /* --- Slot sections --- */
  .leading,
  .trailing,
  .fab-container {
    display: inline-flex;
    align-items: center;
    gap: var(--_gap);
    flex-shrink: 0;
  }

  :host([orientation="vertical"]) .leading,
  :host([orientation="vertical"]) .trailing,
  :host([orientation="vertical"]) .fab-container {
    flex-direction: column;
  }

  .content {
    display: inline-flex;
    align-items: center;
    gap: var(--_gap);
    flex: 1;
    min-width: 0;
  }

  :host([orientation="vertical"]) .content {
    flex-direction: column;
    min-height: 0;
  }

  /* Empty slot containers collapse nicely */
  .leading:empty,
  .trailing:empty,
  .fab-container:empty {
    display: none;
  }

  /* Slotted element styles */
  ::slotted(md-divider) {
    align-self: stretch;
  }

  :host(:not([orientation="vertical"])) ::slotted(md-divider) {
    height: 24px;
    align-self: center;
  }

  :host([orientation="vertical"]) ::slotted(md-divider) {
    width: 24px;
    align-self: center;
  }

  ::slotted(md-icon-button),
  ::slotted(md-button),
  ::slotted(md-fab) {
    flex-shrink: 0;
  }
`;
