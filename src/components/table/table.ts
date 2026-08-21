import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../progress/progress.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import '../checkbox/checkbox.js';
import {
  tableStyles,
  tableHeadStyles,
  tableBodyStyles,
  tableRowStyles,
  tableHeaderCellStyles,
  tableCellStyles,
  tablePaginationStyles,
} from './table.css.js';

export type SortDirection = 'asc' | 'desc' | 'none';
export type TableCellAlignment = 'start' | 'center' | 'end' | 'left' | 'right';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  sortable?: boolean;
  align?: TableCellAlignment;
  width?: string;
  numeric?: boolean;
  render?: (row: T, index: number) => unknown;
}

export interface SortChangeEventDetail {
  column: string;
  direction: SortDirection;
}

export interface PageChangeEventDetail {
  page: number;
  pageSize: number;
}

export interface RowSelectEventDetail<T = any> {
  row: T;
  index: number;
  selected: boolean;
  selectedRows: T[];
}

/**
 * Material Design 3 Table Header Cell
 */
@customElement('md-table-header-cell')
export class MdTableHeaderCell extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableHeaderCellStyles];

  @property({ type: Boolean, reflect: true })
  sortable = false;

  @property({ type: String, reflect: true, attribute: 'sort-direction' })
  sortDirection: SortDirection = 'none';

  @property({ type: String, reflect: true })
  align: TableCellAlignment = 'start';

  @property({ type: String, attribute: 'column-key' })
  columnKey = '';

  @property({ type: String })
  width = '';

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'columnheader');
    this.addEventListener('click', this.handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('width') && this.width) {
      this.style.width = this.width;
    }
    if (changedProperties.has('sortDirection')) {
      if (this.sortDirection === 'asc') {
        this.setAttribute('aria-sort', 'ascending');
      } else if (this.sortDirection === 'desc') {
        this.setAttribute('aria-sort', 'descending');
      } else {
        this.removeAttribute('aria-sort');
      }
    }
  }

  private handleClick = () => {
    if (!this.sortable) return;
    let nextDirection: SortDirection = 'asc';
    if (this.sortDirection === 'asc') {
      nextDirection = 'desc';
    } else if (this.sortDirection === 'desc') {
      nextDirection = 'none';
    }
    this.sortDirection = nextDirection;
    this.emitEvent<SortChangeEventDetail>('sort-change', {
      column: this.columnKey,
      direction: this.sortDirection,
    });
  };

  override render() {
    return html`
      <div class="cell-content">
        <slot></slot>
        ${this.sortable
          ? html`<span class="sort-icon" aria-hidden="true"><md-icon name="arrow_upward" size="18"></md-icon></span>`
          : nothing}
      </div>
    `;
  }
}

/**
 * Material Design 3 Table Cell
 */
@customElement('md-table-cell')
export class MdTableCell extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableCellStyles];

  @property({ type: String, reflect: true })
  align: TableCellAlignment = 'start';

  @property({ type: Boolean, reflect: true })
  numeric = false;

  @property({ type: Boolean, reflect: true })
  truncate = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'cell');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Material Design 3 Table Row
 */
@customElement('md-table-row')
export class MdTableRow extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableRowStyles];

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  hoverable = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'row');
    this.addEventListener('click', this.handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (changedProperties.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.emitEvent('row-click', { row: this });

    if (this.selectable) {
      this.selected = !this.selected;
      this.emitEvent('row-select', { selected: this.selected, row: this });
    }
  };

  override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Material Design 3 Table Head
 */
@customElement('md-table-head')
export class MdTableHead extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableHeadStyles];

  @property({ type: Boolean, reflect: true })
  sticky = false;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Material Design 3 Table Body
 */
@customElement('md-table-body')
export class MdTableBody extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableBodyStyles];

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Material Design 3 Table Pagination
 */
@customElement('md-table-pagination')
export class MdTablePagination extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tablePaginationStyles];

  @property({ type: Number })
  page = 1;

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  @property({ type: Number })
  total = 0;

  @property({ type: Array, attribute: 'page-size-options' })
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @property({ type: Boolean, attribute: 'show-first-last' })
  showFirstLast = true;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / Math.max(1, this.pageSize)));
  }

  private handlePageSizeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    const newSize = Number(select.value);
    this.pageSize = newSize;
    this.page = 1;
    this.emitEvent<PageChangeEventDetail>('page-size-change', {
      page: this.page,
      pageSize: this.pageSize,
    });
    this.emitEvent<PageChangeEventDetail>('page-change', {
      page: this.page,
      pageSize: this.pageSize,
    });
  };

  public firstPage = () => {
    if (this.page <= 1) return;
    this.page = 1;
    this.notifyPageChange();
  };

  public prevPage = () => {
    if (this.page <= 1) return;
    this.page -= 1;
    this.notifyPageChange();
  };

  public nextPage = () => {
    if (this.page >= this.totalPages) return;
    this.page += 1;
    this.notifyPageChange();
  };

  public lastPage = () => {
    if (this.page >= this.totalPages) return;
    this.page = this.totalPages;
    this.notifyPageChange();
  };

  private notifyPageChange() {
    this.emitEvent<PageChangeEventDetail>('page-change', {
      page: this.page,
      pageSize: this.pageSize,
    });
  }

  override render() {
    const start = this.total === 0 ? 0 : (this.page - 1) * this.pageSize + 1;
    const end = Math.min(this.page * this.pageSize, this.total);
    const rangeText = `${start}–${end} of ${this.total}`;

    return html`
      <div class="rows-per-page">
        <span>Rows per page:</span>
        <select .value=${String(this.pageSize)} @change=${this.handlePageSizeChange}>
          ${this.pageSizeOptions.map(
            (opt) => html`<option value=${opt} ?selected=${opt === this.pageSize}>${opt}</option>`
          )}
        </select>
      </div>

      <div class="range-label">${rangeText}</div>

      <div class="actions">
        ${this.showFirstLast
          ? html`
              <md-icon-button
                icon="first_page"
                aria-label="First page"
                ?disabled=${this.page <= 1}
                @click=${this.firstPage}
              ></md-icon-button>
            `
          : nothing}
        <md-icon-button
          icon="chevron_left"
          aria-label="Previous page"
          ?disabled=${this.page <= 1}
          @click=${this.prevPage}
        ></md-icon-button>
        <md-icon-button
          icon="chevron_right"
          aria-label="Next page"
          ?disabled=${this.page >= this.totalPages}
          @click=${this.nextPage}
        ></md-icon-button>
        ${this.showFirstLast
          ? html`
              <md-icon-button
                icon="last_page"
                aria-label="Last page"
                ?disabled=${this.page >= this.totalPages}
                @click=${this.lastPage}
              ></md-icon-button>
            `
          : nothing}
      </div>
    `;
  }
}

/**
 * Material Design 3 Table / Data Table
 */
@customElement('md-table')
export class MdTable extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tableStyles];

  @property({ type: Boolean, reflect: true })
  bordered = false;

  @property({ type: Boolean, reflect: true })
  elevated = false;

  @property({ type: Boolean, reflect: true })
  striped = false;

  @property({ type: Boolean, reflect: true })
  hoverable = true;

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: Boolean, reflect: true, attribute: 'sticky-header' })
  stickyHeader = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  selectable = false;

  @property({ type: Array })
  columns: TableColumn[] = [];

  @property({ type: Array })
  rows: Record<string, any>[] = [];

  @property({ type: Array })
  selectedRows: Record<string, any>[] = [];

  @property({ type: String, attribute: 'sort-column' })
  sortColumn = '';

  @property({ type: String, attribute: 'sort-direction' })
  sortDirection: SortDirection = 'none';

  @property({ type: Boolean })
  paginated = false;

  @property({ type: Number })
  page = 1;

  @property({ type: Number, attribute: 'page-size' })
  pageSize = 10;

  @property({ type: Array, attribute: 'page-size-options' })
  pageSizeOptions: number[] = [5, 10, 25, 50];

  @property({ type: Number })
  total = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  private handleHeaderSortChange = (event: CustomEvent<SortChangeEventDetail>) => {
    this.sortColumn = event.detail.column;
    this.sortDirection = event.detail.direction;
    this.emitEvent<SortChangeEventDetail>('sort-change', event.detail);
  };

  private handleSelectAllToggle = (event: CustomEvent<{ checked: boolean }>) => {
    const isChecked = event.detail.checked;
    const currentRows = this.getProcessedRows();
    if (isChecked) {
      const newSelections = [...this.selectedRows];
      currentRows.forEach((r) => {
        if (!newSelections.includes(r)) {
          newSelections.push(r);
        }
      });
      this.selectedRows = newSelections;
    } else {
      this.selectedRows = this.selectedRows.filter((r) => !currentRows.includes(r));
    }

    this.emitEvent('selection-change', {
      selectedRows: this.selectedRows,
      allSelected: isChecked,
    });
  };

  private handleRowSelectToggle = (row: Record<string, any>, index: number) => {
    const isSelected = this.selectedRows.includes(row);
    if (isSelected) {
      this.selectedRows = this.selectedRows.filter((r) => r !== row);
    } else {
      this.selectedRows = [...this.selectedRows, row];
    }

    this.emitEvent<RowSelectEventDetail>('row-select', {
      row,
      index,
      selected: !isSelected,
      selectedRows: this.selectedRows,
    });
    this.emitEvent('selection-change', {
      selectedRows: this.selectedRows,
    });
  };

  private handlePaginationChange = (event: CustomEvent<PageChangeEventDetail>) => {
    this.page = event.detail.page;
    this.pageSize = event.detail.pageSize;
    this.emitEvent<PageChangeEventDetail>('page-change', event.detail);
  };

  private getProcessedRows(): Record<string, any>[] {
    if (!this.rows || this.rows.length === 0) return [];
    let processed = [...this.rows];

    // Sorting
    if (this.sortColumn && this.sortDirection !== 'none') {
      const dir = this.sortDirection === 'asc' ? 1 : -1;
      processed.sort((a, b) => {
        const valA = a[this.sortColumn];
        const valB = b[this.sortColumn];
        if (valA == null && valB == null) return 0;
        if (valA == null) return 1;
        if (valB == null) return -1;
        if (typeof valA === 'number' && typeof valB === 'number') {
          return (valA - valB) * dir;
        }
        return String(valA).localeCompare(String(valB)) * dir;
      });
    }

    // Pagination (if data-driven rows & paginated)
    if (this.paginated) {
      const startIndex = (this.page - 1) * this.pageSize;
      processed = processed.slice(startIndex, startIndex + this.pageSize);
    }

    return processed;
  }

  override render() {
    const isDataDriven = this.columns && this.columns.length > 0;
    const currentRows = isDataDriven ? this.getProcessedRows() : [];
    const totalCount = this.total || (this.rows ? this.rows.length : 0);

    const allCurrentSelected =
      currentRows.length > 0 && currentRows.every((r) => this.selectedRows.includes(r));
    const someCurrentSelected =
      !allCurrentSelected && currentRows.some((r) => this.selectedRows.includes(r));

    return html`
      <div class="table-wrapper">
        ${this.loading
          ? html`<div class="progress-container"><md-linear-progress indeterminate></md-linear-progress></div>`
          : nothing}

        <div class="table" role="table">
          ${isDataDriven
            ? html`
                <md-table-head ?sticky=${this.stickyHeader}>
                  <md-table-row>
                    ${this.selectable
                      ? html`
                          <md-table-header-cell style="width: 48px; padding-right: 0;">
                            <md-checkbox
                              .checked=${allCurrentSelected}
                              .indeterminate=${someCurrentSelected}
                              aria-label="Select all rows"
                              @change=${this.handleSelectAllToggle}
                            ></md-checkbox>
                          </md-table-header-cell>
                        `
                      : nothing}
                    ${this.columns.map((col) => {
                      const isSorted = this.sortColumn === col.key;
                      const dir = isSorted ? this.sortDirection : 'none';
                      return html`
                        <md-table-header-cell
                          column-key=${col.key}
                          ?sortable=${Boolean(col.sortable)}
                          sort-direction=${dir}
                          align=${col.align || (col.numeric ? 'end' : 'start')}
                          width=${col.width || ''}
                          @sort-change=${this.handleHeaderSortChange}
                        >
                          ${col.label}
                        </md-table-header-cell>
                      `;
                    })}
                  </md-table-row>
                </md-table-head>

                <md-table-body>
                  ${currentRows.map((row, index) => {
                    const isSelected = this.selectedRows.includes(row);
                    return html`
                      <md-table-row
                        ?selected=${isSelected}
                        ?hoverable=${this.hoverable}
                        @click=${() => this.emitEvent('row-click', { row, index })}
                      >
                        ${this.selectable
                          ? html`
                              <md-table-cell style="width: 48px; padding-right: 0;">
                                <md-checkbox
                                  .checked=${isSelected}
                                  aria-label="Select row"
                                  @change=${(e: Event) => {
                                    e.stopPropagation();
                                    this.handleRowSelectToggle(row, index);
                                  }}
                                ></md-checkbox>
                              </md-table-cell>
                            `
                          : nothing}
                        ${this.columns.map((col) => {
                          const cellContent = col.render ? col.render(row, index) : row[col.key];
                          return html`
                            <md-table-cell
                              align=${col.align || (col.numeric ? 'end' : 'start')}
                              ?numeric=${Boolean(col.numeric)}
                            >
                              ${cellContent}
                            </md-table-cell>
                          `;
                        })}
                      </md-table-row>
                    `;
                  })}
                </md-table-body>
              `
            : html`<slot></slot>`}
        </div>
      </div>

      ${this.paginated || isDataDriven && this.rows.length > 0 && this.paginated
        ? html`
            <md-table-pagination
              .page=${this.page}
              .pageSize=${this.pageSize}
              .total=${totalCount}
              .pageSizeOptions=${this.pageSizeOptions}
              @page-change=${this.handlePaginationChange}
              @page-size-change=${this.handlePaginationChange}
            ></md-table-pagination>
          `
        : nothing}
      <slot name="pagination"></slot>
    `;
  }
}

// Aliases
@customElement('md-data-table')
export class MdDataTable extends MdTable {}

@customElement('md-table-header')
export class MdTableHeader extends MdTableHead {}

@customElement('md-table-head-cell')
export class MdTableHeadCell extends MdTableHeaderCell {}

declare global {
  interface HTMLElementTagNameMap {
    'md-table': MdTable;
    'md-data-table': MdDataTable;
    'md-table-head': MdTableHead;
    'md-table-header': MdTableHeader;
    'md-table-body': MdTableBody;
    'md-table-row': MdTableRow;
    'md-table-cell': MdTableCell;
    'md-table-header-cell': MdTableHeaderCell;
    'md-table-head-cell': MdTableHeadCell;
    'md-table-pagination': MdTablePagination;
  }
}

