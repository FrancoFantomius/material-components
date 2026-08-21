import { css } from 'lit';

export const dialogStyles = css`
  :host {
    display: contents;
  }

  dialog {
    box-sizing: border-box;
    min-width: 280px;
    max-width: 560px;
    padding: 24px;
    border: none;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    color: var(--md-sys-color-on-surface, #1D1B20);
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0,0,0,0.30));
    font-family: var(--md-sys-typescale-font-family, inherit);
    position: fixed;
    inset: 0;
    margin: auto;
    overflow: auto;
    z-index: 1000;
  }

  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.32);
    backdrop-filter: blur(2px);
    animation: md-fade-in 150ms ease-out forwards;
  }

  dialog[open] {
    animation: md-dialog-in 150ms cubic-bezier(0.2, 0, 0, 1) forwards;
  }

  @keyframes md-fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes md-dialog-in {
    from {
      opacity: 0;
      transform: scale(0.92);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .dialog-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .icon {
    display: flex;
    justify-content: center;
    color: var(--md-sys-color-secondary, #625B71);
  }

  .headline {
    font-size: var(--md-sys-typescale-headline-small-size, 24px);
    line-height: 32px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface, #1D1B20);
    margin: 0;
  }

  .content {
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
  }
`;

