import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import {
  MdTable,
  MdDataTable,
  MdTableRow,
  MdTableCell,
  MdTableHeaderCell,
  MdTableHead,
  MdTableBody,
  MdTablePagination,
} from '../src/components/table/table.js';

describe('md-table & md-data-table', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render compositional table structure with head, body, rows, and cells', async () => {
    const table = document.createElement('md-table') as MdTable;
    table.bordered = true;
    table.striped = true;

    const thead = document.createElement('md-table-head') as MdTableHead;
    const headRow = document.createElement('md-table-row') as MdTableRow;
    const th1 = document.createElement('md-table-header-cell') as MdTableHeaderCell;
    th1.textContent = 'Name';
    const th2 = document.createElement('md-table-header-cell') as MdTableHeaderCell;
    th2.textContent = 'Role';
    headRow.appendChild(th1);
    headRow.appendChild(th2);
    thead.appendChild(headRow);

    const tbody = document.createElement('md-table-body') as MdTableBody;
    const row1 = document.createElement('md-table-row') as MdTableRow;
    const td1 = document.createElement('md-table-cell') as MdTableCell;
    td1.textContent = 'Alice';
    const td2 = document.createElement('md-table-cell') as MdTableCell;
    td2.textContent = 'Admin';
    row1.appendChild(td1);
    row1.appendChild(td2);
    tbody.appendChild(row1);

    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);

    await table.updateComplete;
    await thead.updateComplete;
    await headRow.updateComplete;
    await th1.updateComplete;
    await th2.updateComplete;
    await tbody.updateComplete;
    await row1.updateComplete;
    await td1.updateComplete;
    await td2.updateComplete;

    expect(table.hasAttribute('bordered')).toBe(true);
    expect(table.hasAttribute('striped')).toBe(true);
    expect(th1.textContent).toBe('Name');
    expect(td1.textContent).toBe('Alice');
    expect(table.getAttribute('role')).toBe('table');
    expect(thead.getAttribute('role')).toBe('rowgroup');
    expect(tbody.getAttribute('role')).toBe('rowgroup');
    expect(row1.getAttribute('role')).toBe('row');
    expect(th1.getAttribute('role')).toBe('columnheader');
    expect(td1.getAttribute('role')).toBe('cell');
  });

  it('should cycle sort direction and emit sort-change on sortable header cell click', async () => {
    const th = document.createElement('md-table-header-cell') as MdTableHeaderCell;
    th.sortable = true;
    th.columnKey = 'age';
    th.textContent = 'Age';
    document.body.appendChild(th);
    await th.updateComplete;

    let sortEventDetail: any = null;
    th.addEventListener('sort-change', (e: any) => {
      sortEventDetail = e.detail;
    });

    expect(th.sortDirection).toBe('none');

    th.click();
    await th.updateComplete;
    expect(th.sortDirection).toBe('asc');
    expect(th.getAttribute('aria-sort')).toBe('ascending');
    expect(sortEventDetail).toEqual({ column: 'age', direction: 'asc' });

    th.click();
    await th.updateComplete;
    expect(th.sortDirection).toBe('desc');
    expect(th.getAttribute('aria-sort')).toBe('descending');
    expect(sortEventDetail).toEqual({ column: 'age', direction: 'desc' });

    th.click();
    await th.updateComplete;
    expect(th.sortDirection).toBe('none');
    expect(th.hasAttribute('aria-sort')).toBe(false);
    expect(sortEventDetail).toEqual({ column: 'age', direction: 'none' });
  });

  it('should support row selection and toggle state', async () => {
    const row = document.createElement('md-table-row') as MdTableRow;
    row.selectable = true;
    document.body.appendChild(row);
    await row.updateComplete;

    let rowSelectEventDetail: any = null;
    row.addEventListener('row-select', (e: any) => {
      rowSelectEventDetail = e.detail;
    });

    expect(row.selected).toBe(false);

    row.click();
    await row.updateComplete;
    expect(row.selected).toBe(true);
    expect(row.getAttribute('aria-selected')).toBe('true');
    expect(rowSelectEventDetail?.selected).toBe(true);

    row.click();
    await row.updateComplete;
    expect(row.selected).toBe(false);
    expect(row.getAttribute('aria-selected')).toBe('false');
    expect(rowSelectEventDetail?.selected).toBe(false);
  });

  it('should render data-driven table with columns and rows', async () => {
    const table = document.createElement('md-table') as MdTable;
    table.columns = [
      { key: 'name', label: 'User Name', sortable: true },
      { key: 'score', label: 'Score', numeric: true },
    ];
    table.rows = [
      { name: 'Charlie', score: 95 },
      { name: 'Bob', score: 80 },
      { name: 'Alice', score: 100 },
    ];
    table.selectable = true;
    document.body.appendChild(table);
    await table.updateComplete;

    const headerCells = table.shadowRoot?.querySelectorAll('md-table-header-cell');
    // 1 checkbox column + 2 data columns = 3
    expect(headerCells?.length).toBe(3);

    const rows = table.shadowRoot?.querySelectorAll('md-table-body md-table-row');
    expect(rows?.length).toBe(3);

    // Trigger sorting programmatically or via header click
    const nameHeader = headerCells?.[1] as MdTableHeaderCell;
    nameHeader.click();
    await table.updateComplete;

    expect(table.sortColumn).toBe('name');
    expect(table.sortDirection).toBe('asc');

    const sortedRows = table.shadowRoot?.querySelectorAll('md-table-body md-table-row');
    expect(sortedRows?.length).toBe(3);
  });

  it('should paginate items with md-table-pagination', async () => {
    const pagination = document.createElement('md-table-pagination') as MdTablePagination;
    pagination.page = 1;
    pagination.pageSize = 10;
    pagination.total = 45;
    document.body.appendChild(pagination);
    await pagination.updateComplete;

    expect(pagination.totalPages).toBe(5);

    let pageChangeDetail: any = null;
    pagination.addEventListener('page-change', (e: any) => {
      pageChangeDetail = e.detail;
    });

    pagination.nextPage();
    await pagination.updateComplete;
    expect(pagination.page).toBe(2);
    expect(pageChangeDetail).toEqual({ page: 2, pageSize: 10 });

    pagination.lastPage();
    await pagination.updateComplete;
    expect(pagination.page).toBe(5);

    pagination.prevPage();
    await pagination.updateComplete;
    expect(pagination.page).toBe(4);

    pagination.firstPage();
    await pagination.updateComplete;
    expect(pagination.page).toBe(1);
  });

  it('should support md-data-table alias', async () => {
    const dataTable = document.createElement('md-data-table') as MdDataTable;
    expect(dataTable).toBeInstanceOf(MdTable);
  });
});
