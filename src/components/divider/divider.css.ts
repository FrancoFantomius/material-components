import { css } from 'lit';

export const dividerStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
  }

  :host(:not([vertical])) {
    width: 100%;
    height: 1px;
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([vertical]) {
    display: inline-block;
    width: 1px;
    height: 100%;
    vertical-align: middle;
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([inset]:not([vertical])) {
    margin-left: 16px;
    margin-right: 16px;
    width: calc(100% - 32px);
  }

  :host([inset-start]:not([vertical])) {
    margin-left: 16px;
    width: calc(100% - 16px);
  }

  :host([inset-end]:not([vertical])) {
    margin-right: 16px;
    width: calc(100% - 16px);
  }

  :host([inset][vertical]) {
    margin-top: 8px;
    margin-bottom: 8px;
    height: calc(100% - 16px);
  }
`;

