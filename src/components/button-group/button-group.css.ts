import { css } from 'lit';

export const buttonGroupStyles = css`
  :host {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    gap: var(--md-button-group-gap, 8px);
    box-sizing: border-box;
    vertical-align: middle;
  }

  :host([hidden]) {
    display: none;
  }

  :host([orientation='vertical']) {
    flex-direction: column;
    align-items: stretch;
  }

  :host([full-width]) {
    display: flex;
    width: 100%;
  }

  :host([full-width]:not([orientation='vertical'])) ::slotted(*) {
    flex: 1 1 0;
    width: 100%;
  }

  :host([full-width][orientation='vertical']) ::slotted(*) {
    width: 100%;
  }

  /* --- Connected Button Group --- */
  :host([connected]) {
    gap: 0;
  }

  :host([connected]:not([orientation='vertical'])) ::slotted(*:not(:first-child)) {
    margin-inline-start: -1px;
  }

  :host([connected][orientation='vertical']) ::slotted(*:not(:first-child)) {
    margin-top: -1px;
  }

  ::slotted(*) {
    position: relative;
    z-index: 0;
  }

  ::slotted(*:hover),
  ::slotted(*:focus-within),
  ::slotted(*:active) {
    z-index: 1;
  }

  :host([disabled]) {
    pointer-events: none;
  }
`;
