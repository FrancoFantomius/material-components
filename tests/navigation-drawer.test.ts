import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdNavigationDrawer, MdNavigationDrawerItem, MdDrawer, MdMenuBar } from '../src/components/navigation-drawer/navigation-drawer.js';
import { MdTopAppBar } from '../src/components/top-app-bar/top-app-bar.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';

describe('md-navigation-drawer & md-navigation-drawer-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

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
