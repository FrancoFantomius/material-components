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
import { MdCode, MdCodeBlock } from '../src/components/code/code.js';
import { MdPlayer, MdMediaPlayer, MdAudioPlayer, MdVideoPlayer } from '../src/components/player/player.js';
import {
  MdAppDrawer,
  MdAppDrawerItem,
  MdAppLauncher,
  MdAppsMenu,
  MdAppItem,
  MdAppLauncherItem,
} from '../src/components/app-drawer/app-drawer.js';
import {
  MdAccountMenu,
  MdAccountItem,
  MdAccountDrawer,
  MdAccountProfile,
  MdAccountProfileItem,
} from '../src/components/account-menu/account-menu.js';



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

  describe('md-code', () => {
    it('should render code block from code property and language badge', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'javascript';
      codeEl.label = 'app.js';
      codeEl.code = 'const greeting = "Hello world";';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      expect(codeEl.effectiveLanguage).toBe('javascript');
      expect(codeEl.effectiveLabel).toBe('app.js');

      const badge = codeEl.shadowRoot?.querySelector('.lang-badge');
      expect(badge?.textContent?.trim().toLowerCase()).toBe('javascript');

      const filename = codeEl.shadowRoot?.querySelector('.code-filename');
      expect(filename?.textContent?.trim()).toBe('app.js');

      const codeContent = codeEl.shadowRoot?.querySelector('code');
      expect(codeContent?.textContent).toContain('const greeting = "Hello world";');
    });

    it('should highlight syntax tokens for common languages', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'typescript';
      codeEl.code = 'const count: number = 42;\nfunction run() { return true; }';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const keywords = codeEl.shadowRoot?.querySelectorAll('.token-keyword');
      expect(keywords?.length).toBeGreaterThan(0);

      const functions = codeEl.shadowRoot?.querySelectorAll('.token-function');
      expect(functions?.length).toBeGreaterThan(0);

      const numbers = codeEl.shadowRoot?.querySelectorAll('.token-number');
      expect(numbers?.length).toBeGreaterThan(0);
    });

    it('should perform built-in linting for JSON with syntax errors', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'json';
      codeEl.lint = true;
      codeEl.code = '{\n  \'name\': "test",\n  "trailing": true,\n}';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.length).toBeGreaterThan(0);
      await codeEl.updateComplete;

      const errorMarkers = codeEl.shadowRoot?.querySelectorAll('.gutter-marker.error');
      expect(errorMarkers?.length).toBeGreaterThan(0);

      const summary = codeEl.shadowRoot?.querySelector('.lint-count-item.errors');
      expect(summary).not.toBeNull();
    });

    it('should perform built-in linting for JavaScript unmatched brackets', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'javascript';
      codeEl.lint = true;
      codeEl.code = 'function test() {\n  const x = [1, 2, 3;\n}';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.message.includes('Mismatched closing') || d.message.includes('Unclosed'))).toBe(true);
    });

    it('should perform built-in linting for HTML unclosed tags', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'html';
      codeEl.lint = true;
      codeEl.code = '<div><span>Hello</div>';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.rule === 'html-mismatched-tag' || d.message.includes('Mismatched'))).toBe(true);
    });

    it('should perform built-in linting for Python indentation and missing colons', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'python';
      codeEl.lint = true;
      codeEl.code = 'def greet(name)\n\tprint("Hello")\n    print("World")';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.rule === 'python-missing-colon')).toBe(true);
      expect(diags.some(d => d.rule === 'python-mixed-indentation')).toBe(true);
    });

    it('should support custom external diagnostics', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.code = 'const unused = 1;';
      codeEl.diagnostics = [
        { line: 1, column: 7, message: '"unused" is defined but never used', severity: 'warning', rule: 'no-unused-vars' }
      ];
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.length).toBe(1);
      expect(diags[0]?.rule).toBe('no-unused-vars');
      await codeEl.updateComplete;

      const warnMarker = codeEl.shadowRoot?.querySelector('.gutter-marker.warning');
      expect(warnMarker).not.toBeNull();
    });

    it('should render line numbers and highlight designated lines', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.lineNumbers = true;
      codeEl.highlightLines = '2, 4-5';
      codeEl.code = 'line 1\nline 2\nline 3\nline 4\nline 5';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const gutter = codeEl.shadowRoot?.querySelector('.code-gutter');
      expect(gutter).not.toBeNull();

      const line2 = codeEl.shadowRoot?.querySelector('[data-line="2"]');
      expect(line2?.classList.contains('highlighted')).toBe(true);

      const line3 = codeEl.shadowRoot?.querySelector('[data-line="3"]');
      expect(line3?.classList.contains('highlighted')).toBe(false);

      const line4 = codeEl.shadowRoot?.querySelector('[data-line="4"]');
      expect(line4?.classList.contains('highlighted')).toBe(true);
    });

    it('should support copy button and emit copy event', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.code = 'console.log("copy test");';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      let copiedText = '';
      codeEl.addEventListener('copy', (e: any) => {
        copiedText = e.detail.code;
      });

      const success = await codeEl.copy();
      expect(success).toBe(true);
      expect(copiedText).toBe('console.log("copy test");');
    });

    it('should support md-code-block alias', async () => {
      const codeBlock = document.createElement('md-code-block') as MdCodeBlock;
      codeBlock.code = 'test alias';
      codeBlock.wrapLines = true;
      document.body.appendChild(codeBlock);
      await codeBlock.updateComplete;

      expect(codeBlock).toBeInstanceOf(MdCode);
      expect(codeBlock.hasAttribute('wrap-lines')).toBe(true);
    });

    it('should perform built-in linting for CSS syntax errors', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'css';
      codeEl.lint = true;
      codeEl.code = '.container {\n  color: red\n  background: blue;\n';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.rule === 'css-missing-semicolon' || d.rule === 'css-unclosed-brace')).toBe(true);
    });

    it('should perform built-in linting for Bash unclosed control blocks', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'bash';
      codeEl.lint = true;
      codeEl.code = 'if [ "$1" = "test" ]; then\n  echo "hello"\n';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.rule === 'bash-unclosed-block')).toBe(true);
    });

    it('should perform built-in linting for YAML tab indentation', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'yaml';
      codeEl.lint = true;
      codeEl.code = 'server:\n\tport: 8080';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const diags = codeEl.runLint();
      expect(diags.some(d => d.rule === 'yaml-no-tabs')).toBe(true);
    });

    it('should read code from textContent/slot when code property is omitted', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'javascript';
      codeEl.textContent = '  const a = 10;\n  const b = 20;';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const codeContent = codeEl.shadowRoot?.querySelector('code');
      expect(codeContent?.textContent).toContain('const a = 10;');
    });

    it('should hide copy button when hide-copy-button is set', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.code = 'const hidden = true;';
      codeEl.hideCopyButton = true;
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const copyBtn = codeEl.shadowRoot?.querySelector('.action-btn');
      expect(copyBtn).toBeNull();
    });

    it('should preserve spaces between HTML tags and attribute names', async () => {
      const codeEl = document.createElement('md-code') as MdCode;
      codeEl.language = 'html';
      codeEl.code = '<md-button variant="filled">Filled</md-button>';
      document.body.appendChild(codeEl);
      await codeEl.updateComplete;

      const codeContent = codeEl.shadowRoot?.querySelector('code');
      expect(codeContent?.textContent).toContain('<md-button variant="filled">Filled</md-button>');

      const tag = codeEl.shadowRoot?.querySelector('.token-tag');
      const attr = codeEl.shadowRoot?.querySelector('.token-attr-name');
      expect(tag?.textContent).toBe('md-button');
      expect(attr?.textContent).toBe('variant');
    });
  });

  describe('md-player', () => {
    it('should render default audio player with track info and controls', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      player.trackTitle = 'Test Track';
      player.artist = 'Test Artist';
      player.album = 'Test Album';
      player.duration = 200;
      player.currentTime = 50;
      document.body.appendChild(player);
      await player.updateComplete;

      expect(player.type).toBe('audio');
      expect(player.variant).toBe('elevated');
      expect(player.paused).toBe(true);

      const title = player.shadowRoot?.querySelector('.track-title');
      expect(title?.textContent).toBe('Test Track');

      const artist = player.shadowRoot?.querySelector('.track-artist');
      expect(artist?.textContent).toBe('Test Artist');

      const album = player.shadowRoot?.querySelector('.track-album');
      expect(album?.textContent).toBe('Test Album');

      const playBtn = player.shadowRoot?.querySelector('.play-pause-btn');
      expect(playBtn).not.toBeNull();
      expect(playBtn?.getAttribute('aria-label')).toBe('Play');
    });

    it('should toggle play and pause states and emit events', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      document.body.appendChild(player);
      await player.updateComplete;

      let played = false;
      let paused = false;
      player.addEventListener('play', () => { played = true; });
      player.addEventListener('pause', () => { paused = true; });

      player.togglePlay();
      await player.updateComplete;
      expect(player.paused).toBe(false);
      expect(played).toBe(true);

      player.togglePlay();
      await player.updateComplete;
      expect(player.paused).toBe(true);
      expect(paused).toBe(true);
    });

    it('should seek to specific timestamps and seek relative delta', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      player.duration = 300;
      document.body.appendChild(player);
      await player.updateComplete;

      let seekedTime = -1;
      player.addEventListener('seeked', (e: any) => {
        seekedTime = e.detail?.currentTime;
      });

      player.seek(120);
      expect(player.currentTime).toBe(120);
      expect(seekedTime).toBe(120);

      player.seekBy(30);
      expect(player.currentTime).toBe(150);
      expect(seekedTime).toBe(150);

      player.seekBy(-50);
      expect(player.currentTime).toBe(100);
      expect(seekedTime).toBe(100);
    });

    it('should adjust volume and toggle mute state', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      document.body.appendChild(player);
      await player.updateComplete;

      let volChanged = false;
      player.addEventListener('volumechange', () => { volChanged = true; });

      player.setVolume(0.4);
      expect(player.volume).toBe(0.4);
      expect(volChanged).toBe(true);

      player.toggleMute();
      expect(player.muted).toBe(true);

      player.toggleMute();
      expect(player.muted).toBe(false);
    });

    it('should cycle playback speeds and emit ratechange', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      document.body.appendChild(player);
      await player.updateComplete;

      let rateChanged = false;
      player.addEventListener('ratechange', () => { rateChanged = true; });

      expect(player.playbackRate).toBe(1);
      player.cyclePlaybackRate();
      expect(player.playbackRate).toBe(1.25);
      expect(rateChanged).toBe(true);

      player.setPlaybackRate(2);
      expect(player.playbackRate).toBe(2);
    });

    it('should support loop and shuffle toggles', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      document.body.appendChild(player);
      await player.updateComplete;

      let shuffled = false;
      player.addEventListener('shuffle', (e: any) => {
        shuffled = e.detail?.shuffle;
      });

      player.toggleLoop();
      expect(player.loop).toBe(true);

      player.toggleShuffle();
      expect(player.shuffle).toBe(true);
      expect(shuffled).toBe(true);
    });

    it('should emit previous and next events', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      document.body.appendChild(player);
      await player.updateComplete;

      let prevFired = false;
      let nextFired = false;
      player.addEventListener('previous', () => { prevFired = true; });
      player.addEventListener('next', () => { nextFired = true; });

      player.previous();
      expect(prevFired).toBe(true);

      player.next();
      expect(nextFired).toBe(true);
    });

    it('should render in video mode with video viewport and overlays', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      player.type = 'video';
      player.trackTitle = 'Trailer Clip';
      player.poster = 'https://example.com/poster.jpg';
      player.src = 'https://example.com/video.mp4';
      document.body.appendChild(player);
      await player.updateComplete;

      expect(player.type).toBe('video');
      const viewport = player.shadowRoot?.querySelector('.video-viewport');
      expect(viewport).not.toBeNull();

      const title = player.shadowRoot?.querySelector('.video-title');
      expect(title?.textContent).toBe('Trailer Clip');
    });

    it('should support compact layout mode and variant', async () => {
      const player = document.createElement('md-player') as MdPlayer;
      player.compact = true;
      player.trackTitle = 'Compact Track';
      player.artist = 'Compact Artist';
      document.body.appendChild(player);
      await player.updateComplete;

      expect(player.hasAttribute('compact')).toBe(true);

      const compactControls = player.shadowRoot?.querySelector('.compact-controls-right');
      expect(compactControls).not.toBeNull();

      const prevBtn = compactControls?.querySelector('button[aria-label="Previous song"]');
      const playBtn = compactControls?.querySelector('.compact-play-btn');
      const nextBtn = compactControls?.querySelector('button[aria-label="Next song"]');

      expect(prevBtn).not.toBeNull();
      expect(playBtn).not.toBeNull();
      expect(nextBtn).not.toBeNull();

      const fullScrubber = player.shadowRoot?.querySelector('.full-player-scrubber');
      expect(fullScrubber).not.toBeNull();
    });

    it('should instantiate aliases md-media-player, md-audio-player, md-video-player', async () => {
      const mediaP = document.createElement('md-media-player') as MdMediaPlayer;
      const audioP = document.createElement('md-audio-player') as MdAudioPlayer;
      const videoP = document.createElement('md-video-player') as MdVideoPlayer;

      document.body.appendChild(mediaP);
      document.body.appendChild(audioP);
      document.body.appendChild(videoP);

      await Promise.all([mediaP.updateComplete, audioP.updateComplete, videoP.updateComplete]);

      expect(mediaP instanceof MdPlayer).toBe(true);
      expect(audioP instanceof MdPlayer).toBe(true);
      expect(videoP instanceof MdPlayer).toBe(true);
      expect(videoP.type).toBe('video');
    });

    it('should transition between squiggly line and straight line on play/pause, and remain straight for video player', async () => {
      const audioPlayer = document.createElement('md-player') as MdPlayer;
      audioPlayer.type = 'audio';
      audioPlayer.duration = 100;
      audioPlayer.currentTime = 30;
      document.body.appendChild(audioPlayer);
      await audioPlayer.updateComplete;

      // Initially paused: container is not playing-wave
      expect(audioPlayer.paused).toBe(true);
      expect(audioPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).not.toBeNull();
      expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);

      // When playing: playing-wave class is added for smooth transition to squiggly line
      audioPlayer.togglePlay();
      await audioPlayer.updateComplete;
      expect(audioPlayer.paused).toBe(false);
      expect(audioPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).not.toBeNull();
      expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(true);

      // When paused: playing-wave class is removed for smooth transition to straight line
      audioPlayer.togglePlay();
      await audioPlayer.updateComplete;
      expect(audioPlayer.paused).toBe(true);
      expect(audioPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);

      // Video player: should never render sinus wave or have playing-wave, even when playing
      const videoPlayer = document.createElement('md-player') as MdPlayer;
      videoPlayer.type = 'video';
      videoPlayer.duration = 100;
      videoPlayer.currentTime = 30;
      document.body.appendChild(videoPlayer);
      await videoPlayer.updateComplete;

      videoPlayer.togglePlay();
      await videoPlayer.updateComplete;
      expect(videoPlayer.paused).toBe(false);
      expect(videoPlayer.shadowRoot?.querySelector('.slider-sinus-wave')).toBeNull();
      expect(videoPlayer.shadowRoot?.querySelector('.progress-slider-container')?.classList.contains('playing-wave')).toBe(false);
    });
  });

  describe('md-app-drawer and md-app-drawer-item', () => {
    it('should render default app drawer with trigger button', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      expect(drawer.open).toBe(false);
      expect(drawer.trigger).toBe(true);
      expect(drawer.columns).toBe(3);

      const triggerBtn = drawer.shadowRoot?.querySelector('md-icon-button');
      expect(triggerBtn).not.toBeNull();
      expect(triggerBtn?.getAttribute('icon')).toBe('apps');
    });

    it('should open and close via methods and dispatch open/close events', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      let openCalled = false;
      let closeCalled = false;

      drawer.addEventListener('open', () => {
        openCalled = true;
      });
      drawer.addEventListener('close', () => {
        closeCalled = true;
      });

      drawer.show();
      await drawer.updateComplete;

      expect(drawer.open).toBe(true);
      expect(drawer.hasAttribute('open')).toBe(true);
      expect(openCalled).toBe(true);

      drawer.close();
      await drawer.updateComplete;

      expect(drawer.open).toBe(false);
      expect(drawer.hasAttribute('open')).toBe(false);
      expect(closeCalled).toBe(true);
    });

    it('should toggle open state on trigger click', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      const triggerContainer = drawer.shadowRoot?.querySelector('.trigger-container') as HTMLElement;
      expect(triggerContainer).not.toBeNull();

      triggerContainer.click();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);

      triggerContainer.click();
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);
    });

    it('should close on Escape key and backdrop click', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      drawer.show();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);

      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);

      drawer.show();
      await drawer.updateComplete;
      expect(drawer.open).toBe(true);

      const backdrop = drawer.shadowRoot?.querySelector('.backdrop') as HTMLElement;
      backdrop.click();
      await drawer.updateComplete;
      expect(drawer.open).toBe(false);
    });

    it('should render headline in header when provided', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.headline = 'Apps';
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      const headlineEl = drawer.shadowRoot?.querySelector('.headline');
      expect(headlineEl?.textContent).toBe('Apps');
    });

    it('should render app-drawer-item with icon, label, badge, and link', async () => {
      const item = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item.icon = 'mail';
      item.label = 'Mail';
      item.badge = '9';
      item.href = 'https://example.com/mail';
      item.target = '_blank';
      document.body.appendChild(item);
      await item.updateComplete;

      const link = item.shadowRoot?.querySelector('a.item');
      expect(link).not.toBeNull();
      expect(link?.getAttribute('href')).toBe('https://example.com/mail');
      expect(link?.getAttribute('target')).toBe('_blank');

      const icon = item.shadowRoot?.querySelector('md-icon');
      expect(icon?.getAttribute('name')).toBe('mail');

      const label = item.shadowRoot?.querySelector('.label');
      expect(label?.textContent).toContain('Mail');

      const badge = item.shadowRoot?.querySelector('.badge');
      expect(badge?.textContent).toBe('9');
    });

    it('should render app-drawer-item with image src', async () => {
      const item = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item.src = 'https://example.com/icon.png';
      item.label = 'Custom App';
      document.body.appendChild(item);
      await item.updateComplete;

      const img = item.shadowRoot?.querySelector('img.icon-image');
      expect(img).not.toBeNull();
      expect(img?.getAttribute('src')).toBe('https://example.com/icon.png');
    });

    it('should dispatch item-click event when clicked', async () => {
      const item = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item.label = 'Calendar';
      item.icon = 'calendar_today';
      document.body.appendChild(item);
      await item.updateComplete;

      let eventDetail: any = null;
      item.addEventListener('item-click', (e: any) => {
        eventDetail = e.detail;
      });

      const btn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
      btn.click();

      expect(eventDetail).not.toBeNull();
      expect(eventDetail?.label).toBe('Calendar');
      expect(eventDetail?.icon).toBe('calendar_today');
    });

    it('should not dispatch item-click when disabled', async () => {
      const item = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item.label = 'Disabled App';
      item.disabled = true;
      document.body.appendChild(item);
      await item.updateComplete;

      let called = false;
      item.addEventListener('item-click', () => {
        called = true;
      });

      const btn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
      btn.click();

      expect(called).toBe(false);
    });

    it('should support aliases for app drawer and items', async () => {
      const launcher = document.createElement('md-app-launcher') as MdAppLauncher;
      const appsMenu = document.createElement('md-apps-menu') as MdAppsMenu;
      const appItem = document.createElement('md-app-item') as MdAppItem;
      const launcherItem = document.createElement('md-app-launcher-item') as MdAppLauncherItem;

      expect(launcher).toBeInstanceOf(MdAppDrawer);
      expect(appsMenu).toBeInstanceOf(MdAppDrawer);
      expect(appItem).toBeInstanceOf(MdAppDrawerItem);
      expect(launcherItem).toBeInstanceOf(MdAppDrawerItem);
    });

    it('should allow reordering items programmatically and emit reorder event', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.id = 'test-drawer-1';
      localStorage.removeItem('md-app-drawer-order-test-drawer-1');

      const item1 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item1.label = 'App 1';
      const item2 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item2.label = 'App 2';
      const item3 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item3.label = 'App 3';

      drawer.appendChild(item1);
      drawer.appendChild(item2);
      drawer.appendChild(item3);
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      expect(drawer.getOrder()).toEqual(['App 1', 'App 2', 'App 3']);

      let reorderEvent: any = null;
      drawer.addEventListener('reorder', (e: any) => {
        reorderEvent = e.detail;
      });

      drawer.reorderItem(0, 2);
      await drawer.updateComplete;

      expect(drawer.getOrder()).toEqual(['App 2', 'App 3', 'App 1']);
      expect(reorderEvent).not.toBeNull();
      expect(reorderEvent.order).toEqual(['App 2', 'App 3', 'App 1']);
      expect(reorderEvent.oldIndex).toBe(0);
      expect(reorderEvent.newIndex).toBe(2);

      // Verify persistent storage in localStorage
      const stored = JSON.parse(localStorage.getItem('md-app-drawer-order-test-drawer-1') || '[]');
      expect(stored).toEqual(['App 2', 'App 3', 'App 1']);
    });

    it('should restore saved order from persistent storage on load', async () => {
      localStorage.setItem('my-custom-apps-key', JSON.stringify(['Photos', 'Mail', 'Drive']));

      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.storageKey = 'my-custom-apps-key';

      const item1 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item1.label = 'Mail';
      const item2 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item2.label = 'Drive';
      const item3 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item3.label = 'Photos';

      drawer.appendChild(item1);
      drawer.appendChild(item2);
      drawer.appendChild(item3);
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      drawer.applySavedOrder();
      expect(drawer.getOrder()).toEqual(['Photos', 'Mail', 'Drive']);
      localStorage.removeItem('my-custom-apps-key');
    });

    it('should support setOrder, resetOrder, and disable-storage', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.id = 'test-drawer-reset';
      localStorage.removeItem('md-app-drawer-order-test-drawer-reset');

      const itemA = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      itemA.label = 'A';
      const itemB = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      itemB.label = 'B';
      const itemC = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      itemC.label = 'C';

      drawer.appendChild(itemA);
      drawer.appendChild(itemB);
      drawer.appendChild(itemC);
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      drawer.setOrder(['C', 'A', 'B']);
      drawer.saveOrder();
      expect(drawer.getOrder()).toEqual(['C', 'A', 'B']);
      expect(localStorage.getItem('md-app-drawer-order-test-drawer-reset')).toBe(JSON.stringify(['C', 'A', 'B']));

      drawer.resetOrder();
      expect(localStorage.getItem('md-app-drawer-order-test-drawer-reset')).toBeNull();
    });

    it('should support keyboard reordering with Alt+Arrow keys when editing', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.id = 'test-drawer-kb';
      drawer.columns = 3;
      drawer.editing = true;
      localStorage.removeItem('md-app-drawer-order-test-drawer-kb');

      const item1 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item1.label = 'Item 1';
      const item2 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item2.label = 'Item 2';

      drawer.appendChild(item1);
      drawer.appendChild(item2);
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      item1.dispatchEvent(
        new KeyboardEvent('keydown', {
          key: 'ArrowRight',
          altKey: true,
          bubbles: true,
          composed: true,
        })
      );
      await drawer.updateComplete;

      expect(drawer.getOrder()).toEqual(['Item 2', 'Item 1']);
      localStorage.removeItem('md-app-drawer-order-test-drawer-kb');
    });

    it('should render edit button on top-right corner to enable/disable reordering', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.headline = 'Apps';
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      expect(drawer.editable).toBe(true);
      expect(drawer.editing).toBe(false);

      const editBtn = drawer.shadowRoot?.querySelector('.edit-btn') as HTMLElement;
      expect(editBtn).not.toBeNull();
      expect(editBtn.getAttribute('icon')).toBe('edit');

      let editToggleDetail: any = null;
      drawer.addEventListener('edit-toggle', (e: any) => {
        editToggleDetail = e.detail;
      });

      editBtn.click();
      await drawer.updateComplete;

      expect(drawer.editing).toBe(true);
      expect(drawer.hasAttribute('editing')).toBe(true);
      expect(editToggleDetail).toEqual({ editing: true });
      expect(editBtn.getAttribute('icon')).toBe('check');

      editBtn.click();
      await drawer.updateComplete;

      expect(drawer.editing).toBe(false);
      expect(drawer.hasAttribute('editing')).toBe(false);
      expect(editToggleDetail).toEqual({ editing: false });
      expect(editBtn.getAttribute('icon')).toBe('edit');
    });

    it('should support startEditing, stopEditing, toggleEdit methods and hide edit button when editable is false', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      drawer.startEditing();
      await drawer.updateComplete;
      expect(drawer.editing).toBe(true);

      drawer.stopEditing();
      await drawer.updateComplete;
      expect(drawer.editing).toBe(false);

      drawer.toggleEdit();
      await drawer.updateComplete;
      expect(drawer.editing).toBe(true);

      drawer.editable = false;
      await drawer.updateComplete;

      const editBtn = drawer.shadowRoot?.querySelector('.edit-btn');
      expect(editBtn).toBeNull();
    });

    it('should render a back/reset button next to tick button when editing to restore default order', async () => {
      const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
      drawer.id = 'test-drawer-reset-btn';
      localStorage.removeItem('md-app-drawer-order-test-drawer-reset-btn');

      const item1 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item1.label = 'First';
      const item2 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item2.label = 'Second';
      const item3 = document.createElement('md-app-drawer-item') as MdAppDrawerItem;
      item3.label = 'Third';

      drawer.appendChild(item1);
      drawer.appendChild(item2);
      drawer.appendChild(item3);
      document.body.appendChild(drawer);
      await drawer.updateComplete;

      // In normal mode, reset-btn is not rendered
      expect(drawer.shadowRoot?.querySelector('.reset-btn')).toBeNull();

      // Enter editing mode
      drawer.startEditing();
      await drawer.updateComplete;

      const resetBtn = drawer.shadowRoot?.querySelector('.reset-btn') as HTMLElement;
      expect(resetBtn).not.toBeNull();
      expect(resetBtn.getAttribute('icon')).toBe('arrow_back');

      // Reorder items
      drawer.reorderItem(0, 2);
      expect(drawer.getOrder()).toEqual(['Second', 'Third', 'First']);

      let resetEventFired = false;
      drawer.addEventListener('reset', () => {
        resetEventFired = true;
      });

      // Click reset back button
      resetBtn.click();
      await drawer.updateComplete;

      expect(drawer.getOrder()).toEqual(['First', 'Second', 'Third']);
      expect(resetEventFired).toBe(true);
      expect(localStorage.getItem('md-app-drawer-order-test-drawer-reset-btn')).toBeNull();
    });
  });

  describe('md-account-menu & md-account-item', () => {
    it('should render default account menu trigger with initials and name', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.name = 'Franco Fantomius';
      accountMenu.email = 'franco.fantomius@example.com';
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      expect(accountMenu.open).toBe(false);
      const avatarBtn = accountMenu.shadowRoot?.querySelector('.avatar-btn');
      expect(avatarBtn).not.toBeNull();
      expect(avatarBtn?.textContent).toContain('F');
    });

    it('should open, close, and toggle account menu popover', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      accountMenu.show();
      await accountMenu.updateComplete;
      expect(accountMenu.open).toBe(true);

      accountMenu.close();
      await accountMenu.updateComplete;
      expect(accountMenu.open).toBe(false);

      accountMenu.toggle();
      await accountMenu.updateComplete;
      expect(accountMenu.open).toBe(true);
    });

    it('should close when backdrop is clicked or Escape key is pressed', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.open = true;
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      const backdrop = accountMenu.shadowRoot?.querySelector('.backdrop') as HTMLElement;
      expect(backdrop).not.toBeNull();
      backdrop.click();
      await accountMenu.updateComplete;
      expect(accountMenu.open).toBe(false);

      accountMenu.open = true;
      await accountMenu.updateComplete;
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      await accountMenu.updateComplete;
      expect(accountMenu.open).toBe(false);
    });

    it('should switch tabs inside the account menu', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.open = true;
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      let tabDetail: any = null;
      accountMenu.addEventListener('tab-change', (e: any) => {
        tabDetail = e.detail;
      });

      const tabButtons = accountMenu.shadowRoot?.querySelectorAll('.tab-btn');
      expect(tabButtons?.length).toBe(4);

      // Click Security tab
      (tabButtons?.[1] as HTMLElement).click();
      await accountMenu.updateComplete;

      expect(accountMenu.activeTab).toBe('security');
      expect(tabDetail).toEqual({ tab: 'security' });
    });

    it('should dispatch manage-click and sign-out events', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.open = true;
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      let manageFired = false;
      accountMenu.addEventListener('manage-click', () => {
        manageFired = true;
      });

      let signOutFired = false;
      accountMenu.addEventListener('sign-out', () => {
        signOutFired = true;
      });

      const manageBtn = accountMenu.shadowRoot?.querySelector('.manage-btn') as HTMLElement;
      manageBtn.click();
      expect(manageFired).toBe(true);

      const signOutBtn = accountMenu.shadowRoot?.querySelector('.signout-btn') as HTMLElement;
      signOutBtn.click();
      expect(signOutFired).toBe(true);
      expect(accountMenu.open).toBe(false);
    });

    it('should render account item and handle account-select', async () => {
      const item = document.createElement('md-account-item') as MdAccountItem;
      item.name = 'Work Profile';
      item.email = 'work@company.com';
      item.initials = 'W';
      document.body.appendChild(item);
      await item.updateComplete;

      let eventDetail: any = null;
      item.addEventListener('account-click', (e: any) => {
        eventDetail = e.detail;
      });

      const btn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
      btn.click();

      expect(eventDetail).not.toBeNull();
      expect(eventDetail?.name).toBe('Work Profile');
      expect(eventDetail?.email).toBe('work@company.com');
    });

    it('should support aliases for account menu and items', async () => {
      const drawer = document.createElement('md-account-drawer') as MdAccountDrawer;
      const profile = document.createElement('md-account-profile') as MdAccountProfile;
      const profileItem = document.createElement('md-account-profile-item') as MdAccountProfileItem;

      expect(drawer).toBeInstanceOf(MdAccountMenu);
      expect(profile).toBeInstanceOf(MdAccountMenu);
      expect(profileItem).toBeInstanceOf(MdAccountItem);
    });

    it('should not render status-badge dot on trigger or email chip in header', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.name = 'Franco Fantomius';
      accountMenu.email = 'franco.fantomius@example.com';
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      const badge = accountMenu.shadowRoot?.querySelector('.status-badge');
      expect(badge).toBeNull();

      const headerChip = accountMenu.shadowRoot?.querySelector('.header-email-chip');
      expect(headerChip).toBeNull();
    });

    it('should isolate ripple animation to clicked control only', async () => {
      const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
      accountMenu.open = true;
      document.body.appendChild(accountMenu);
      await accountMenu.updateComplete;

      const avatarBtn = accountMenu.shadowRoot?.querySelector('.avatar-btn') as HTMLElement;
      const avatarRipple = avatarBtn.querySelector('md-ripple') as HTMLElement;
      const manageBtn = accountMenu.shadowRoot?.querySelector('.manage-btn') as HTMLElement;
      const manageRipple = manageBtn.querySelector('md-ripple') as HTMLElement;

      avatarBtn.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, button: 0 }));
      await accountMenu.updateComplete;

      const avatarRippleEl = avatarRipple.shadowRoot?.querySelector('.ripple');
      const manageRippleEl = manageRipple.shadowRoot?.querySelector('.ripple');

      expect(avatarRippleEl).not.toBeNull();
      expect(manageRippleEl).toBeNull();
    });
  });
});




