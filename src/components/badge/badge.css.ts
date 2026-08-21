import { css } from 'lit';

export const badgeStyles = css`
  :host {
    display: inline-flex;
    position: relative;
    vertical-align: middle;
  }

  .badge {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: var(--md-sys-color-error, #B3261E);
    color: var(--md-sys-color-on-error, #FFFFFF);
    font-family: var(--md-sys-typescale-font-family, inherit);
    font-weight: 500;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    transition: transform 150ms cubic-bezier(0.2, 0, 0, 1),
                opacity 150ms cubic-bezier(0.2, 0, 0, 1);
  }

  /* Small Dot Badge */
  :host(:not([value])) .badge,
  :host([dot]) .badge {
    width: 6px;
    height: 6px;
    padding: 0;
  }

  /* Large Badge with text */
  :host([value]:not([dot])) .badge {
    min-width: 16px;
    height: 16px;
    padding: 0 4px;
    font-size: 11px;
    letter-spacing: 0.5px;
  }

  /* Anchored Positioning over slotted element */
  :host([anchored]) .badge {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    z-index: 10;
  }
`;

