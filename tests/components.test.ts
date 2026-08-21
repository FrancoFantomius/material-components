import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdButton } from '../src/components/button/button.js';
import { MdTextField } from '../src/components/text-field/text-field.js';
import { MdCheckbox } from '../src/components/checkbox/checkbox.js';
import { MdSwitch } from '../src/components/switch/switch.js';
import { MdRadio, MdRadioGroup } from '../src/components/radio/radio.js';
import { MdProgress } from '../src/components/progress/progress.js';
import { MdBadge } from '../src/components/badge/badge.js';
import { MdChip } from '../src/components/chip/chip.js';
import { MdTabs, MdTab } from '../src/components/tabs/tabs.js';
import { MdDialog } from '../src/components/dialog/dialog.js';
import { MdTopAppBar } from '../src/components/top-app-bar/top-app-bar.js';
import { MdNavigationDrawer, MdNavigationDrawerItem, MdDrawer, MdMenuBar } from '../src/components/navigation-drawer/navigation-drawer.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';
import { MdList, MdListItem } from '../src/components/list/list.js';
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
import { MdSearchBar, MdSearch } from '../src/components/search-bar/search-bar.js';


describe('Material Design Web Components Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('md-button', () => {
    it('should render default filled button with text', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.textContent = 'Click me';
      document.body.appendChild(button);
      await button.updateComplete;

      expect(button.variant).toBe('filled');
      expect(button.disabled).toBe(false);
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton).not.toBeNull();
    });

    it('should support link mode when href is provided', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.href = 'https://example.com';
      button.textContent = 'Navigate';
      document.body.appendChild(button);
      await button.updateComplete;

      const innerLink = button.shadowRoot?.querySelector('a');
      expect(innerLink).not.toBeNull();
      expect(innerLink?.getAttribute('href')).toBe('https://example.com');
    });

    it('should reflect disabled state', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.disabled = true;
      document.body.appendChild(button);
      await button.updateComplete;

      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('md-text-field', () => {
    it('should render with label and update value', async () => {
      const textField = document.createElement('md-text-field') as MdTextField;
      textField.label = 'Username';
      textField.value = 'JohnDoe';
      document.body.appendChild(textField);
      await textField.updateComplete;

      const input = textField.shadowRoot?.querySelector('input');
      expect(input?.value).toBe('JohnDoe');
      const label = textField.shadowRoot?.querySelector('.label');
      expect(label?.textContent).toBe('Username');
    });

    it('should participate in form submission and validation', async () => {
      const form = document.createElement('form');
      const textField = document.createElement('md-text-field') as MdTextField;
      textField.name = 'email';
      textField.value = 'test@example.com';
      textField.required = true;
      form.appendChild(textField);
      document.body.appendChild(form);
      await textField.updateComplete;

      expect(textField.checkValidity()).toBe(true);

      textField.value = '';
      await textField.updateComplete;
      expect(textField.checkValidity()).toBe(false);
    });

    it('should reflect has-leading-icon and has-value attributes', async () => {
      const textField = document.createElement('md-text-field') as MdTextField;
      textField.leadingIcon = 'email';
      textField.value = 'user@example.com';
      document.body.appendChild(textField);
      await textField.updateComplete;

      expect(textField.hasAttribute('has-leading-icon')).toBe(true);
      expect(textField.hasAttribute('has-value')).toBe(true);

      textField.value = '';
      await textField.updateComplete;
      expect(textField.hasAttribute('has-value')).toBe(false);
      expect(textField.hasAttribute('has-leading-icon')).toBe(true);
    });
  });

  describe('md-checkbox', () => {
    it('should toggle checked state on click', async () => {
      const checkbox = document.createElement('md-checkbox') as MdCheckbox;
      document.body.appendChild(checkbox);
      await checkbox.updateComplete;

      expect(checkbox.checked).toBe(false);
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked).toBe(true);
    });

    it('should support indeterminate state', async () => {
      const checkbox = document.createElement('md-checkbox') as MdCheckbox;
      checkbox.indeterminate = true;
      document.body.appendChild(checkbox);
      await checkbox.updateComplete;

      expect(checkbox.indeterminate).toBe(true);
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('md-switch', () => {
    it('should toggle selected state on click', async () => {
      const sw = document.createElement('md-switch') as MdSwitch;
      document.body.appendChild(sw);
      await sw.updateComplete;

      expect(sw.selected).toBe(false);
      sw.click();
      await sw.updateComplete;
      expect(sw.selected).toBe(true);
    });

    it('should render icons when icons property is enabled', async () => {
      const sw = document.createElement('md-switch') as MdSwitch;
      sw.icons = true;
      document.body.appendChild(sw);
      await sw.updateComplete;

      const icons = sw.shadowRoot?.querySelectorAll('md-icon');
      expect(icons?.length).toBe(2);
    });
  });

  describe('md-radio & md-radio-group', () => {
    it('should enforce single selection in radio group', async () => {
      const group = document.createElement('md-radio-group') as MdRadioGroup;
      group.name = 'fruit';

      const r1 = document.createElement('md-radio') as MdRadio;
      r1.value = 'apple';
      const r2 = document.createElement('md-radio') as MdRadio;
      r2.value = 'banana';

      group.appendChild(r1);
      group.appendChild(r2);
      document.body.appendChild(group);

      await group.updateComplete;
      await r1.updateComplete;
      await r2.updateComplete;

      r1.click();
      await r1.updateComplete;
      await r2.updateComplete;
      expect(r1.checked).toBe(true);
      expect(r2.checked).toBe(false);

      r2.click();
      await r1.updateComplete;
      await r2.updateComplete;
      expect(r1.checked).toBe(false);
      expect(r2.checked).toBe(true);
    });
  });

  describe('md-progress', () => {
    it('should render linear progress determinate & indeterminate', async () => {
      const progress = document.createElement('md-progress') as MdProgress;
      progress.type = 'linear';
      document.body.appendChild(progress);
      await progress.updateComplete;

      expect(progress.indeterminate).toBe(true);

      progress.value = 0.5;
      await progress.updateComplete;
      expect(progress.indeterminate).toBe(false);
      expect(progress.getAttribute('aria-valuenow')).toBe('0.5');
    });

    it('should render circular progress', async () => {
      const progress = document.createElement('md-progress') as MdProgress;
      progress.type = 'circular';
      document.body.appendChild(progress);
      await progress.updateComplete;

      const svg = progress.shadowRoot?.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('md-badge', () => {
    it('should render value and dot states', async () => {
      const badge = document.createElement('md-badge') as MdBadge;
      badge.value = '5';
      document.body.appendChild(badge);
      await badge.updateComplete;

      const badgeSpan = badge.shadowRoot?.querySelector('.badge');
      expect(badgeSpan?.textContent?.trim()).toBe('5');
    });
  });

  describe('md-chip', () => {
    it('should trigger change event in filter mode', async () => {
      const chip = document.createElement('md-chip') as MdChip;
      chip.variant = 'filter';
      chip.label = 'Filter Item';
      document.body.appendChild(chip);
      await chip.updateComplete;

      let eventFired = false;
      chip.addEventListener('change', () => {
        eventFired = true;
      });

      chip.click();
      await chip.updateComplete;
      expect(chip.selected).toBe(true);
      expect(eventFired).toBe(true);
    });
  });

  describe('md-tabs', () => {
    it('should switch active tab on click', async () => {
      const tabs = document.createElement('md-tabs') as MdTabs;
      const tab1 = document.createElement('md-tab') as MdTab;
      tab1.label = 'Tab 1';
      const tab2 = document.createElement('md-tab') as MdTab;
      tab2.label = 'Tab 2';

      tabs.appendChild(tab1);
      tabs.appendChild(tab2);
      document.body.appendChild(tabs);

      await tabs.updateComplete;
      await tab1.updateComplete;
      await tab2.updateComplete;

      expect(tabs.activeIndex).toBe(0);
      tab2.click();
      await tabs.updateComplete;
      expect(tabs.activeIndex).toBe(1);
    });
  });

  describe('md-top-app-bar & md-top-bar', () => {
    it('should render default center-aligned top app bar with headline and subtitle', async () => {
      const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
      topBar.headline = 'Page Title';
      topBar.subtitle = 'Page Subtitle';
      document.body.appendChild(topBar);
      await topBar.updateComplete;

      expect(topBar.variant).toBe('center-aligned');
      const headline = topBar.shadowRoot?.querySelector('.headline');
      const subtitle = topBar.shadowRoot?.querySelector('.subtitle');
      expect(headline?.textContent).toBe('Page Title');
      expect(subtitle?.textContent).toBe('Page Subtitle');
    });

    it('should support medium and large multi-row variants', async () => {
      const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
      topBar.variant = 'medium';
      topBar.headline = 'Medium Title';
      document.body.appendChild(topBar);
      await topBar.updateComplete;

      let headlineRow = topBar.shadowRoot?.querySelector('.headline-row');
      expect(headlineRow).not.toBeNull();
      expect(headlineRow?.querySelector('.headline')?.textContent).toBe('Medium Title');

      topBar.variant = 'large';
      await topBar.updateComplete;
      headlineRow = topBar.shadowRoot?.querySelector('.headline-row');
      expect(headlineRow).not.toBeNull();
    });

    it('should reflect elevated and fixed attributes', async () => {
      const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
      topBar.elevated = true;
      topBar.fixed = true;
      document.body.appendChild(topBar);
      await topBar.updateComplete;

      expect(topBar.hasAttribute('elevated')).toBe(true);
      expect(topBar.hasAttribute('fixed')).toBe(true);
    });

    it('should work with md-top-bar alias element', async () => {
      const topBar = document.createElement('md-top-bar') as MdTopAppBar;
      topBar.headline = 'Alias Bar';
      document.body.appendChild(topBar);
      await topBar.updateComplete;

      const headline = topBar.shadowRoot?.querySelector('.headline');
      expect(headline?.textContent).toBe('Alias Bar');
    });
  });

  describe('md-navigation-drawer & md-navigation-drawer-item', () => {
    it('should render default modal navigation drawer with headline', async () => {
      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      drawer.headline = 'Navigation';
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      expect(drawer.open).toBe(false);
      expect(drawer.type).toBe('modal');
      expect(drawer.pivot).toBe('left');

      const headline = drawer.shadowRoot?.querySelector('.headline');
      expect(headline?.textContent).toBe('Navigation');
    });

    it('should show, close, and toggle drawer', async () => {
      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      drawer.show();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);
      expect(drawer.hasAttribute('open')).toBe(true);

      drawer.close();
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);
      expect(drawer.hasAttribute('open')).toBe(false);

      drawer.toggle();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);

      drawer.toggle();
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);
    });

    it('should close when scrim is clicked', async () => {
      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      drawer.open = true;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      const scrim = drawer.shadowRoot?.querySelector('.scrim') as HTMLElement;
      expect(scrim).not.toBeNull();
      scrim.click();
      await drawer.updateComplete;

      expect(drawer.open).toBe(false);
    });

    it('should close on Escape keydown in modal mode', async () => {
      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      drawer.open = true;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await drawer.updateComplete;

      expect(drawer.open).toBe(false);
    });

    it('should render navigation drawer item with icon, label, badge, and active state', async () => {
      const item = document.createElement('md-navigation-drawer-item') as MdNavigationDrawerItem;
      item.icon = 'inbox';
      item.label = 'Inbox';
      item.badge = '15';
      item.active = true;
      document.body.appendChild(item);
      await item.updateComplete;

      expect(item.hasAttribute('active')).toBe(true);
      const icon = item.shadowRoot?.querySelector('md-icon');
      expect(icon?.getAttribute('name')).toBe('inbox');
      const label = item.shadowRoot?.querySelector('.label');
      expect(label?.textContent).toBe('Inbox');
      const badge = item.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent).toBe('15');
    });

    it('should fire item-click event on click', async () => {
      const item = document.createElement('md-navigation-drawer-item') as MdNavigationDrawerItem;
      item.label = 'Starred';
      document.body.appendChild(item);
      await item.updateComplete;

      let eventDetail: any = null;
      item.addEventListener('item-click', (e: any) => {
        eventDetail = e.detail;
      });

      const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
      inner.click();
      await item.updateComplete;

      expect(eventDetail).not.toBeNull();
      expect(eventDetail?.label).toBe('Starred');
    });

    it('should work with aliases md-drawer, md-menu-bar, md-drawer-item', async () => {
      const drawer = document.createElement('md-drawer') as MdDrawer;
      const menuBar = document.createElement('md-menu-bar') as MdMenuBar;
      const drawerItem = document.createElement('md-drawer-item') as MdNavigationDrawerItem;

      expect(drawer).toBeInstanceOf(MdNavigationDrawer);
      expect(menuBar).toBeInstanceOf(MdNavigationDrawer);
      expect(drawerItem).toBeInstanceOf(MdNavigationDrawerItem);
    });

    it('should interact with top app bar menu icon button', async () => {
      const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
      const menuBtn = document.createElement('md-icon-button') as MdIconButton;
      menuBtn.setAttribute('slot', 'navigation');
      menuBtn.setAttribute('icon', 'menu');
      menuBtn.setAttribute('aria-label', 'Open menu');
      topBar.appendChild(menuBtn);

      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      const item = document.createElement('md-navigation-drawer-item') as MdNavigationDrawerItem;
      item.label = 'Home';
      drawer.appendChild(item);

      document.body.appendChild(topBar);
      document.body.appendChild(drawer);

      await topBar.updateComplete;
      await menuBtn.updateComplete;
      await drawer.updateComplete;
      await item.updateComplete;

      menuBtn.addEventListener('click', () => {
        drawer.toggle();
      });

      expect(drawer.open).toBe(false);
      menuBtn.click();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);

      menuBtn.click();
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);
    });

    it('should support responsive property and type', async () => {
      const drawer = document.createElement('md-navigation-drawer') as MdNavigationDrawer;
      drawer.responsive = true;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      expect(drawer.hasAttribute('responsive')).toBe(true);
      expect(drawer.responsive).toBe(true);
      expect(drawer.closed).toBe(false);

      drawer.type = 'responsive';
      await drawer.updateComplete;
      expect(drawer.type).toBe('responsive');

      drawer.closed = true;
      await drawer.updateComplete;
      expect(drawer.closed).toBe(true);
      expect(drawer.hasAttribute('closed')).toBe(true);

      drawer.closed = false;
      await drawer.updateComplete;

      // In happy-dom window.innerWidth defaults to 1024 (>960), so toggle() should toggle closed
      drawer.toggle();
      await drawer.updateComplete;
      expect(drawer.closed).toBe(true);

      drawer.toggle();
      await drawer.updateComplete;
      expect(drawer.closed).toBe(false);
    });
  });

  describe('md-table & md-data-table', () => {
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

  describe('md-list & md-list-item', () => {
    it('should render headline, supporting-text, and trailing-supporting-text', async () => {
      const item = document.createElement('md-list-item') as MdListItem;
      item.headline = 'Sarah Connor';
      item.supportingText = 'Uploaded project roadmap';
      item.trailingSupportingText = '10:30 AM';
      document.body.appendChild(item);

      await item.updateComplete;

      const headlineEl = item.shadowRoot?.querySelector('.headline');
      const supportingTextEl = item.shadowRoot?.querySelector('.supporting-text');
      const trailingEl = item.shadowRoot?.querySelector('.trailing-supporting-text');

      expect(headlineEl).not.toBeNull();
      expect(headlineEl?.textContent).toBe('Sarah Connor');
      expect(supportingTextEl).not.toBeNull();
      expect(supportingTextEl?.textContent).toBe('Uploaded project roadmap');
      expect(trailingEl).not.toBeNull();
      expect(trailingEl?.textContent).toBe('10:30 AM');
    });

    it('should emit item-click on interactive list item click', async () => {
      const item = document.createElement('md-list-item') as MdListItem;
      item.interactive = true;
      item.headline = 'Item Title';
      document.body.appendChild(item);
      await item.updateComplete;

      let clicked = false;
      item.addEventListener('item-click', () => {
        clicked = true;
      });

      const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
      inner.click();
      await item.updateComplete;

      expect(clicked).toBe(true);
    });
  });

  describe('md-search-bar & md-search', () => {
    it('should render default search bar with placeholder and search icon', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      searchBar.placeholder = 'Search items...';
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      expect(searchBar.active).toBe(false);
      expect(searchBar.value).toBe('');

      const input = searchBar.shadowRoot?.querySelector('input');
      expect(input).not.toBeNull();
      expect(input?.placeholder).toBe('Search items...');

      const leadingIcon = searchBar.shadowRoot?.querySelector('.leading-slot md-icon');
      expect(leadingIcon?.getAttribute('name')).toBe('search');
    });

    it('should manage active state and show/hide suggestions', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      searchBar.suggestions = ['Apple', 'Banana', 'Cherry'];
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      expect(searchBar.active).toBe(false);
      expect(searchBar.hasAttribute('active')).toBe(false);

      // Suggestions container is hidden by CSS when inactive, but let's test show/close APIs
      let activeDetail: any = null;
      searchBar.addEventListener('active-change', (e: any) => {
        activeDetail = e.detail;
      });

      searchBar.show();
      await searchBar.updateComplete;

      expect(searchBar.active).toBe(true);
      expect(searchBar.hasAttribute('active')).toBe(true);
      expect(activeDetail).toEqual({ active: true });

      // Back icon should now be shown in leading slot
      const backBtn = searchBar.shadowRoot?.querySelector('.leading-slot button');
      expect(backBtn).not.toBeNull();

      // Suggestions should be rendered in shadow DOM
      const suggestionItems = searchBar.shadowRoot?.querySelectorAll('.suggestion-item');
      expect(suggestionItems?.length).toBe(3);
      expect(suggestionItems?.[0].textContent).toContain('Apple');

      searchBar.close();
      await searchBar.updateComplete;

      expect(searchBar.active).toBe(false);
      expect(searchBar.hasAttribute('active')).toBe(false);
      expect(activeDetail).toEqual({ active: false });
    });

    it('should handle input, clear button, and events', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;

      let inputDetail: any = null;
      searchBar.addEventListener('input', (e: any) => {
        inputDetail = e.detail;
      });

      input.value = 'Material 3';
      input.dispatchEvent(new Event('input'));
      await searchBar.updateComplete;

      expect(searchBar.value).toBe('Material 3');
      expect(searchBar.hasAttribute('has-value')).toBe(true);
      expect(inputDetail).toEqual({ value: 'Material 3' });

      // Clear button should be visible
      const clearBtn = searchBar.shadowRoot?.querySelector('.clear-btn') as HTMLButtonElement;
      expect(clearBtn).not.toBeNull();

      let clearFired = false;
      searchBar.addEventListener('clear', () => {
        clearFired = true;
      });

      clearBtn.click();
      await searchBar.updateComplete;

      expect(searchBar.value).toBe('');
      expect(searchBar.hasAttribute('has-value')).toBe(false);
      expect(clearFired).toBe(true);
    });

    it('should select suggestion on click, emit events, and update value', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      searchBar.suggestions = [
        { id: '1', label: 'London, UK', supportingText: 'Capital of England' },
        { id: '2', label: 'Tokyo, Japan', supportingText: 'Capital of Japan' },
      ];
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      searchBar.show();
      await searchBar.updateComplete;

      let selectedDetail: any = null;
      let searchDetail: any = null;

      searchBar.addEventListener('suggestion-select', (e: any) => {
        selectedDetail = e.detail;
      });
      searchBar.addEventListener('search', (e: any) => {
        searchDetail = e.detail;
      });

      const suggestionItems = searchBar.shadowRoot?.querySelectorAll('.suggestion-item') as NodeListOf<HTMLElement>;
      expect(suggestionItems.length).toBe(2);

      suggestionItems[1].click();
      await searchBar.updateComplete;

      expect(searchBar.value).toBe('Tokyo, Japan');
      expect(selectedDetail?.label).toBe('Tokyo, Japan');
      expect(selectedDetail?.index).toBe(1);
      expect(searchDetail?.value).toBe('Tokyo, Japan');
      // By default autoDeactivateOnSelect is true, so it should close
      expect(searchBar.active).toBe(false);
    });

    it('should support keyboard navigation across suggestions', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      searchBar.suggestions = ['First', 'Second', 'Third'];
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      searchBar.show();
      await searchBar.updateComplete;

      const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;

      // Press ArrowDown to highlight first suggestion
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await searchBar.updateComplete;

      let highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
      expect(highlighted?.length).toBe(1);
      expect(highlighted?.[0].textContent).toContain('First');

      // Press ArrowDown again for second
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      await searchBar.updateComplete;

      highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
      expect(highlighted?.[0].textContent).toContain('Second');

      // Press ArrowUp to go back to first
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
      await searchBar.updateComplete;

      highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
      expect(highlighted?.[0].textContent).toContain('First');

      // Press Enter to select highlighted
      let selectedDetail: any = null;
      searchBar.addEventListener('suggestion-select', (e: any) => {
        selectedDetail = e.detail;
      });

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
      await searchBar.updateComplete;

      expect(searchBar.value).toBe('First');
      expect(selectedDetail?.label).toBe('First');
    });

    it('should close active state on Escape key or Scrim click', async () => {
      const searchBar = document.createElement('md-search-bar') as MdSearchBar;
      document.body.appendChild(searchBar);
      await searchBar.updateComplete;

      searchBar.show();
      await searchBar.updateComplete;
      expect(searchBar.active).toBe(true);

      const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
      await searchBar.updateComplete;
      expect(searchBar.active).toBe(false);

      searchBar.show();
      await searchBar.updateComplete;
      expect(searchBar.active).toBe(true);

      const scrim = searchBar.shadowRoot?.querySelector('.scrim') as HTMLElement;
      scrim.click();
      await searchBar.updateComplete;
      expect(searchBar.active).toBe(false);
    });

    it('should support md-search alias and responsive/fullscreen properties', async () => {
      const search = document.createElement('md-search') as MdSearch;
      search.responsive = true;
      search.fullscreen = true;
      document.body.appendChild(search);
      await search.updateComplete;

      expect(search).toBeInstanceOf(MdSearchBar);
      expect(search.hasAttribute('responsive')).toBe(true);
      expect(search.hasAttribute('fullscreen')).toBe(true);
    });
  });
});




