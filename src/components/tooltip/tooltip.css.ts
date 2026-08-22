import { css } from 'lit';

export const tooltipStyles = css`
  :host {
    display: inline-block;
    position: relative;
  }

  .tooltip {
    box-sizing: border-box;
    position: fixed;
    z-index: 1000;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transform: scale(0.92);
    transition:
      opacity 150ms cubic-bezier(0, 0, 0.2, 1),
      transform 150ms cubic-bezier(0, 0, 0.2, 1),
      visibility 150ms linear;
    word-wrap: break-word;
    font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif);
  }

  :host([open]) .tooltip {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
  }

  /* Plain Tooltip */
  :host(:not([rich])) .tooltip {
    background-color: var(--md-sys-color-inverse-surface, #313033);
    color: var(--md-sys-color-inverse-on-surface, #F4EFF4);
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    padding: 4px 8px;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.4px;
    min-height: 24px;
    max-width: 240px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: var(--md-sys-elevation-level1, 0 1px 3px rgba(0, 0, 0, 0.2));
    user-select: none;
    text-align: center;
  }

  /* Rich Tooltip */
  :host([rich]) .tooltip {
    background-color: var(--md-sys-color-surface-container, #EDE7EE);
    color: var(--md-sys-color-on-surface-variant, #49454E);
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    padding: 12px 16px;
    min-width: 180px;
    max-width: 320px;
    box-shadow: var(--md-sys-elevation-level2, 0 2px 6px 2px rgba(0, 0, 0, 0.15));
    display: flex;
    flex-direction: column;
    gap: 6px;
    text-align: left;
  }

  :host([rich][open]) .tooltip {
    pointer-events: auto;
  }

  .subhead,
  .headline {
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    margin: 0;
  }

  .supporting-text,
  .content {
    color: var(--md-sys-color-on-surface-variant, #49454E);
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 6px;
  }

  .action-button {
    background: transparent;
    border: none;
    cursor: pointer;
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    color: var(--md-sys-color-primary, #6750A4);
    padding: 4px 8px;
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    transition: background-color 150ms ease;
  }

  .action-button:hover {
    background-color: rgba(103, 80, 164, 0.08);
  }

  .action-button:focus-visible {
    outline: 2px solid var(--md-sys-color-primary, #6750A4);
    outline-offset: 1px;
  }

  /* Caret Arrow */
  .caret {
    display: none;
    position: absolute;
    width: 0;
    height: 0;
  }

  :host([has-caret]) .caret {
    display: block;
  }

  :host([position='top'][has-caret]) .caret {
    bottom: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid var(--md-sys-color-inverse-surface, #313033);
  }

  :host([rich][position='top'][has-caret]) .caret {
    border-top-color: var(--md-sys-color-surface-container, #EDE7EE);
  }

  :host([position='bottom'][has-caret]) .caret {
    top: -6px;
    left: 50%;
    transform: translateX(-50%);
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid var(--md-sys-color-inverse-surface, #313033);
  }

  :host([rich][position='bottom'][has-caret]) .caret {
    border-bottom-color: var(--md-sys-color-surface-container, #EDE7EE);
  }

  :host([position='left'][has-caret]) .caret {
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid var(--md-sys-color-inverse-surface, #313033);
  }

  :host([rich][position='left'][has-caret]) .caret {
    border-left-color: var(--md-sys-color-surface-container, #EDE7EE);
  }

  :host([position='right'][has-caret]) .caret {
    left: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid var(--md-sys-color-inverse-surface, #313033);
  }

  :host([rich][position='right'][has-caret]) .caret {
    border-right-color: var(--md-sys-color-surface-container, #EDE7EE);
  }
`;
