import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import {
  MdAppDrawer,
  MdAppDrawerItem,
  MdAppLauncher,
  MdAppsMenu,
  MdAppItem,
  MdAppLauncherItem,
} from '../src/components/app-drawer/app-drawer.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';

describe('md-app-drawer and md-app-drawer-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

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

  it('should render a back button in header and close on back button click', async () => {
    const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
    drawer.headline = 'Apps';
    document.body.appendChild(drawer);
    await drawer.updateComplete;

    drawer.show();
    await drawer.updateComplete;
    expect(drawer.open).toBe(true);

    const backBtn = drawer.shadowRoot?.querySelector('.back-btn') as HTMLElement;
    expect(backBtn).not.toBeNull();
    expect(backBtn.getAttribute('icon')).toBe('arrow_back');

    let closeEventFired = false;
    drawer.addEventListener('close', () => {
      closeEventFired = true;
    });

    backBtn.click();
    await drawer.updateComplete;

    expect(drawer.open).toBe(false);
    expect(closeEventFired).toBe(true);
  });

  it('should support fullscreen property and custom back-button slot', async () => {
    const drawer = document.createElement('md-app-drawer') as MdAppDrawer;
    drawer.fullscreen = true;

    const customBackBtn = document.createElement('md-icon-button') as MdIconButton;
    customBackBtn.setAttribute('slot', 'back-button');
    customBackBtn.setAttribute('icon', 'close');
    customBackBtn.setAttribute('aria-label', 'Dismiss');
    drawer.appendChild(customBackBtn);

    document.body.appendChild(drawer);
    await drawer.updateComplete;
    await customBackBtn.updateComplete;

    expect(drawer.hasAttribute('fullscreen')).toBe(true);
    expect(drawer.fullscreen).toBe(true);

    const slot = drawer.shadowRoot?.querySelector('slot[name="back-button"]') as HTMLSlotElement;
    expect(slot).not.toBeNull();
    const assigned = slot.assignedElements();
    expect(assigned.length).toBe(1);
    expect(assigned[0]).toBe(customBackBtn);
  });
});
