import { css } from 'lit';

export const tableStyles = css`
  :host {
    display: block;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    font-family: var(--md-sys-typescale-font-family, inherit);
    background-color: var(--md-sys-color-surface, #FEF7FF);
    color: var(--md-sys-color-on-surface, #1D1B20);
    border-radius: var(--md-sys-shape-corner-medium, 12px);
    overflow: hidden;
    transition: box-shadow 200ms cubic-bezier(0.2, 0, 0, 1),
                background-color 200ms cubic-bezier(0.2, 0, 0, 1);
  }

  :host([bordered]) {
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host([elevated]) {
    box-shadow: var(--md-sys-elevation-level1, 0px 1px 3px 1px rgba(0, 0, 0, 0.15));
  }

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    position: relative;
  }

  .progress-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    height: 4px;
  }

  .table {
    display: table;
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    text-align: left;
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    line-height: 20px;
  }

  /* Dense table variant */
  :host([dense]) {
    --md-table-cell-padding-y: 8px;
    --md-table-cell-padding-x: 12px;
    --md-table-header-padding-y: 10px;
  }

  /* Default cell padding variables */
  :host {
    --md-table-cell-padding-y: 14px;
    --md-table-cell-padding-x: 16px;
    --md-table-header-padding-y: 16px;
    --md-table-header-padding-x: 16px;
  }
`;

export const tableHeadStyles = css`
  :host {
    display: table-header-group;
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host-context([sticky-header]),
  :host([sticky]) {
    position: sticky;
    top: 0;
    z-index: 2;
  }
`;

export const tableBodyStyles = css`
  :host {
    display: table-row-group;
  }
`;

export const tableRowStyles = css`
  :host {
    display: table-row;
    position: relative;
    transition: background-color 150ms cubic-bezier(0.2, 0, 0, 1);
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
  }

  :host(:last-of-type) {
    border-bottom: none;
  }

  /* Hoverable rows */
  :host-context([hoverable]):hover,
  :host([hoverable]:hover),
  :host([interactive]:hover) {
    background-color: var(--md-sys-color-surface-container-high, #ECE6F0);
  }

  /* Striped rows */
  :host-context([striped]):host(:nth-of-type(even)) {
    background-color: var(--md-sys-color-surface-container-lowest, #FFFFFF);
  }

  :host-context([striped]):host(:nth-of-type(odd)) {
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
  }

  /* Selected row */
  :host([selected]) {
    background-color: var(--md-sys-color-secondary-container, #E8DEF8) !important;
  }

  :host([interactive]) {
    cursor: pointer;
  }

  :host([disabled]) {
    opacity: 0.38;
    pointer-events: none;
  }
`;

export const tableHeaderCellStyles = css`
  :host {
    display: table-cell;
    vertical-align: middle;
    padding: var(--md-table-header-padding-y, 16px) var(--md-table-header-padding-x, 16px);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    font-size: var(--md-sys-typescale-title-small-size, 14px);
    font-weight: 600;
    letter-spacing: 0.1px;
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    user-select: none;
    box-sizing: border-box;
    white-space: nowrap;
  }

  :host([sortable]) {
    cursor: pointer;
  }

  :host([sortable]:hover) {
    color: var(--md-sys-color-on-surface, #1D1B20);
    background-color: rgba(0, 0, 0, 0.04);
  }

  :host([align="start"]),
  :host([align="left"]) {
    text-align: left;
  }

  :host([align="center"]) {
    text-align: center;
  }

  :host([align="end"]),
  :host([align="right"]) {
    text-align: right;
  }

  .cell-content {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    width: 100%;
  }

  :host([align="center"]) .cell-content {
    justify-content: center;
  }

  :host([align="end"]) .cell-content,
  :host([align="right"]) .cell-content {
    justify-content: flex-end;
  }

  .sort-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    color: var(--md-sys-color-primary, #6750A4);
    opacity: 0;
    transition: transform 200ms cubic-bezier(0.2, 0, 0, 1), opacity 150ms ease;
  }

  :host([sort-direction="asc"]) .sort-icon {
    opacity: 1;
    transform: rotate(0deg);
  }

  :host([sort-direction="desc"]) .sort-icon {
    opacity: 1;
    transform: rotate(180deg);
  }

  :host([sortable]:hover:not([sort-direction="asc"]):not([sort-direction="desc"])) .sort-icon {
    opacity: 0.5;
  }
`;

export const tableCellStyles = css`
  :host {
    display: table-cell;
    vertical-align: middle;
    padding: var(--md-table-cell-padding-y, 14px) var(--md-table-cell-padding-x, 16px);
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-size: var(--md-sys-typescale-body-medium-size, 14px);
    border-bottom: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    box-sizing: border-box;
  }

  :host([align="start"]),
  :host([align="left"]) {
    text-align: left;
  }

  :host([align="center"]) {
    text-align: center;
  }

  :host([align="end"]),
  :host([align="right"]) {
    text-align: right;
  }

  :host([numeric]) {
    font-variant-numeric: tabular-nums;
    text-align: right;
  }

  :host([truncate]) {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const tablePaginationStyles = css`
  :host {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 8px 16px;
    border-top: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    background-color: var(--md-sys-color-surface, #FEF7FF);
    font-size: var(--md-sys-typescale-body-small-size, 12px);
    color: var(--md-sys-color-on-surface-variant, #49454F);
    box-sizing: border-box;
  }

  .rows-per-page {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  select {
    padding: 4px 8px;
    border: 1px solid var(--md-sys-color-outline-variant, #CAC4D0);
    border-radius: var(--md-sys-shape-corner-extra-small, 4px);
    background-color: var(--md-sys-color-surface-container-low, #F7F2FA);
    color: var(--md-sys-color-on-surface, #1D1B20);
    font-family: inherit;
    font-size: inherit;
    outline: none;
    cursor: pointer;
  }

  select:focus {
    border-color: var(--md-sys-color-primary, #6750A4);
  }

  .range-label {
    user-select: none;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

