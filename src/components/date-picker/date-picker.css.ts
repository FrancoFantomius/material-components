import { css } from 'lit';

export const datePickerStyles = css`
  :host {
    display: inline-block;
    font-family: var(--md-sys-typescale-font-family, Roboto, sans-serif);
    color: var(--md-sys-color-on-surface, #1D1B20);
    box-sizing: border-box;
  }

  :host([variant="modal"]) {
    display: contents;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* --- Picker Surface Container --- */
  .picker-surface {
    display: flex;
    flex-direction: column;
    width: 328px;
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
    overflow: hidden;
    position: relative;
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
    user-select: none;
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([variant="docked"]) .picker-surface {
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  :host([disabled]) {
    pointer-events: none;
    opacity: 0.38;
  }

  /* --- Header --- */
  .header {
    padding: 20px 24px 16px 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    position: relative;
  }

  .header-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .subhead {
    font-size: var(--md-sys-typescale-label-medium-size, 12px);
    line-height: 16px;
    font-weight: 500;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .headline {
    font-size: var(--md-sys-typescale-headline-large-size, 28px);
    line-height: 36px;
    font-weight: 400;
    color: var(--md-sys-color-on-surface, #1D1B20);
    min-height: 36px;
    display: flex;
    align-items: center;
    word-break: break-word;
  }

  .headline.placeholder {
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: 24px;
  }

  .header-divider {
    height: 1px;
    background-color: var(--md-sys-color-outline-variant, #CAC4D0);
    margin: 0 16px;
  }

  /* --- Navigation Controls --- */
  .navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 4px 16px;
  }

  .month-year-btn {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    background: transparent;
    border: none;
    padding: 8px 12px;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    font-family: inherit;
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    font-weight: 500;
    color: var(--md-sys-color-on-surface-variant, #49454F);
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .month-year-btn:hover {
    background-color: rgba(73, 69, 79, 0.08);
    color: var(--md-sys-color-on-surface, #1D1B20);
  }

  .month-year-btn .dropdown-icon {
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  .month-year-btn.open .dropdown-icon {
    transform: rotate(180deg);
  }

  .nav-arrows {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  /* --- Calendar View --- */
  .calendar-content {
    padding: 0 12px 12px 12px;
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
    padding: 8px 0;
  }

  .weekday {
    font-size: var(--md-sys-typescale-body-small-size, 12px);
    font-weight: 500;
    color: var(--md-sys-color-on-surface, #1D1B20);
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .days-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    row-gap: 4px;
  }

  .day-cell {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Range Highlight Band */
  .range-band {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: var(--md-sys-color-primary-container, #EADDFF);
    z-index: 0;
  }

  .day-cell.range-start .range-band {
    left: 50%;
  }

  .day-cell.range-end .range-band {
    right: 50%;
  }

  .day-cell.range-start.range-end .range-band {
    display: none;
  }

  /* Day Button */
  .day-btn {
    position: relative;
    z-index: 1;
    width: 36px;
    height: 36px;
    border-radius: var(--md-sys-shape-corner-full, 50%);
    border: 1px solid transparent;
    background: transparent;
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-family: inherit;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    font-weight: 400;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    outline: none;
    transition: background-color 150ms ease, color 150ms ease, border-color 150ms ease;
  }

  .day-btn:hover:not(.disabled):not(.selected):not(.range-start):not(.range-end) {
    background-color: rgba(103, 80, 164, 0.08);
  }

  /* Today state */
  .day-btn.today {
    border-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-primary, #6750A4);
    font-weight: 500;
  }

  /* In range middle state */
  .day-cell.in-range .day-btn {
    color: var(--md-sys-color-on-primary-container, #21005D);
    background-color: transparent;
  }

  /* Selected / Range Start / Range End */
  .day-btn.selected,
  .day-btn.range-start,
  .day-btn.range-end {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
    font-weight: 500;
  }

  .day-btn.disabled {
    color: var(--md-sys-color-on-surface, #1D1B20);
    opacity: 0.38;
    cursor: not-allowed;
    pointer-events: none;
  }

  /* --- Year Picker View --- */
  .year-picker-view {
    height: 280px;
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px 16px;
    align-content: start;
  }

  .year-btn {
    background: transparent;
    border: 1px solid transparent;
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    padding: 10px 0;
    font-family: inherit;
    font-size: var(--md-sys-typescale-label-large-size, 14px);
    color: var(--md-sys-color-on-surface, #1D1B20);
    cursor: pointer;
    text-align: center;
    transition: background-color 150ms ease, color 150ms ease;
  }

  .year-btn:hover:not(.selected) {
    background-color: rgba(103, 80, 164, 0.08);
  }

  .year-btn.selected {
    background-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-on-primary, #FFFFFF);
    font-weight: 500;
  }

  .year-btn.current {
    border-color: var(--md-sys-color-primary, #6750A4);
    color: var(--md-sys-color-primary, #6750A4);
  }

  /* --- Actions Footer --- */
  .actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 16px 16px 16px;
  }

  /* --- Supporting / Error Text --- */
  .supporting-text {
    padding: 4px 16px 0;
    font-size: var(--md-sys-typescale-body-small-size, 12px);
    line-height: 16px;
    color: var(--md-sys-color-on-surface-variant, #49454F);
  }

  :host([error]) .supporting-text {
    color: var(--md-sys-color-error, #B3261E);
  }

  /* --- Modal Scrim & Dialog Container --- */
  dialog {
    padding: 0;
    border: none;
    border-radius: var(--md-sys-shape-corner-extra-large, 28px);
    background: transparent;
    color: inherit;
    box-shadow: var(--md-sys-elevation-level3, 0px 1px 3px 0px rgba(0, 0, 0, 0.30));
    position: fixed;
    inset: 0;
    margin: auto;
    z-index: 1000;
    overflow: visible;
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
`;
