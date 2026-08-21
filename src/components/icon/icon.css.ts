import { css } from 'lit';

export const iconStyles = css`
  :host {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    width: var(--md-icon-size, 24px);
    height: var(--md-icon-size, 24px);
    font-size: var(--md-icon-size, 24px);
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    font-family: 'Material Symbols Outlined', 'Material Icons', sans-serif;
    font-weight: normal;
    font-style: normal;
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    user-select: none;
    flex-shrink: 0;
    color: inherit;
  }

  :host([filled]) {
    font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }

  ::slotted(svg) {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
`;

