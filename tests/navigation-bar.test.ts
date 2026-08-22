import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import {
  MdNavigationBar,
  MdNavigationBarItem,
  MdNavBar,
  MdNavBarItem,
} from '../src/components/navigation-bar/navigation-bar.js';

describe('md-navigation-bar & md-navigation-bar-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render navigation bar with default items', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.icon = 'home';
    item1.label = 'Home';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.icon = 'explore';
    item2.label = 'Explore';
    const item3 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item3.icon = 'person';
    item3.label = 'Profile';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    navBar.appendChild(item3);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    expect(navBar.activeIndex).toBe(0);
    expect(item1.active).toBe(true);
    expect(item1.getAttribute('aria-selected')).toBe('true');
    expect(item2.active).toBe(false);
    expect(item2.getAttribute('aria-selected')).toBe('false');
  });

  it('should switch active destination and emit change event on click', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.icon = 'mail';
    item1.label = 'Mail';
    item1.value = 'mail';

    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.icon = 'chat';
    item2.label = 'Chat';
    item2.value = 'chat';

    const item3 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item3.icon = 'people';
    item3.label = 'Spaces';
    item3.value = 'spaces';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    navBar.appendChild(item3);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    let changeDetail: any = null;
    navBar.addEventListener('change', (e: any) => {
      changeDetail = e.detail;
    });

    item2.click();
    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(navBar.activeIndex).toBe(1);
    expect(navBar.value).toBe('chat');
    expect(item1.active).toBe(false);
    expect(item2.active).toBe(true);
    expect(changeDetail).not.toBeNull();
    expect(changeDetail.activeIndex).toBe(1);
    expect(changeDetail.value).toBe('chat');
    expect(changeDetail.item).toBe(item2);
  });

  it('should support programmatic selection via select() and activeIndex', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Tab 1';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Tab 2';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    let changeDetail: any = null;
    navBar.addEventListener('change', (e: any) => {
      changeDetail = e.detail;
    });

    navBar.select(1);
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(1);
    expect(item2.active).toBe(true);
    expect(changeDetail?.activeIndex).toBe(1);

    navBar.activeIndex = 0;
    await navBar.updateComplete;
    expect(item1.active).toBe(true);
    expect(item2.active).toBe(false);
  });

  it('should support selection by value attribute', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Home';
    item1.value = 'home';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Settings';
    item2.value = 'settings';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    navBar.value = 'settings';
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(1);
    expect(item2.active).toBe(true);
  });

  it('should render active indicator pill and icon', async () => {
    const item = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item.icon = 'star';
    item.activeIcon = 'star_filled';
    item.label = 'Favorites';
    item.active = true;
    document.body.appendChild(item);
    await item.updateComplete;

    const indicator = item.shadowRoot?.querySelector('.indicator');
    expect(indicator).not.toBeNull();

    const activeIcon = item.shadowRoot?.querySelector('.active-icon md-icon');
    expect(activeIcon?.getAttribute('name')).toBe('star_filled');
  });

  it('should render badge with value or dot', async () => {
    const itemWithBadge = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    itemWithBadge.icon = 'notifications';
    itemWithBadge.badge = '99+';
    document.body.appendChild(itemWithBadge);
    await itemWithBadge.updateComplete;

    const badge = itemWithBadge.shadowRoot?.querySelector('.badge');
    expect(badge).not.toBeNull();
    expect(badge?.textContent?.trim()).toBe('99+');

    const itemWithDot = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    itemWithDot.icon = 'mail';
    itemWithDot.badge = 'dot';
    document.body.appendChild(itemWithDot);
    await itemWithDot.updateComplete;

    const dotBadge = itemWithDot.shadowRoot?.querySelector('.badge.dot');
    expect(dotBadge).not.toBeNull();
  });

  it('should handle label visibility modes: alwaysShow, selectedShow, hidden', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    navBar.labelMode = 'selectedShow';

    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Item 1';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Item 2';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(item1.labelMode).toBe('selectedShow');
    expect(item2.labelMode).toBe('selectedShow');

    navBar.labelMode = 'hidden';
    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(item1.labelMode).toBe('hidden');
    expect(item2.labelMode).toBe('hidden');
  });

  it('should handle hideInactiveLabels property', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    navBar.hideInactiveLabels = true;

    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Item 1';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Item 2';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(item1.hideInactiveLabels).toBe(true);
    expect(item2.hideInactiveLabels).toBe(true);
  });

  it('should not allow selecting disabled items', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Active';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Disabled';
    item2.disabled = true;

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(item2.hasAttribute('disabled')).toBe(true);
    expect(item2.getAttribute('aria-disabled')).toBe('true');

    item2.click();
    await navBar.updateComplete;

    expect(navBar.activeIndex).toBe(0);
    expect(item1.active).toBe(true);
    expect(item2.active).toBe(false);
  });

  it('should support disabled property on navigation bar', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    navBar.disabled = true;

    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'Item 1';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Item 2';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(item1.disabled).toBe(true);
    expect(item2.disabled).toBe(true);
  });

  it('should support keyboard navigation (ArrowRight, ArrowLeft, Home, End)', async () => {
    const navBar = document.createElement('md-navigation-bar') as MdNavigationBar;
    const item1 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item1.label = 'First';
    const item2 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item2.label = 'Second';
    const item3 = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item3.label = 'Third';

    navBar.appendChild(item1);
    navBar.appendChild(item2);
    navBar.appendChild(item3);
    document.body.appendChild(navBar);

    await navBar.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    // ArrowRight
    navBar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(1);
    expect(item2.active).toBe(true);

    // End
    navBar.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(2);
    expect(item3.active).toBe(true);

    // Home
    navBar.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(0);
    expect(item1.active).toBe(true);

    // ArrowLeft wraps to last
    navBar.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await navBar.updateComplete;
    expect(navBar.activeIndex).toBe(2);
    expect(item3.active).toBe(true);
  });

  it('should emit item-click on navigation-bar-item', async () => {
    const item = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item.label = 'Search';
    item.value = 'search';
    document.body.appendChild(item);
    await item.updateComplete;

    let itemClickDetail: any = null;
    item.addEventListener('item-click', (e: any) => {
      itemClickDetail = e.detail;
    });

    const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
    inner.click();
    await item.updateComplete;

    expect(itemClickDetail).not.toBeNull();
    expect(itemClickDetail.value).toBe('search');
  });

  it('should support href and target on navigation-bar-item', async () => {
    const item = document.createElement('md-navigation-bar-item') as MdNavigationBarItem;
    item.label = 'Docs';
    item.href = 'https://example.com';
    item.target = '_blank';
    document.body.appendChild(item);
    await item.updateComplete;

    const link = item.shadowRoot?.querySelector('a.item') as HTMLAnchorElement;
    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toBe('https://example.com');
    expect(link.getAttribute('target')).toBe('_blank');
  });

  it('should work with aliases md-nav-bar and md-nav-bar-item', async () => {
    const bar = document.createElement('md-nav-bar') as MdNavBar;
    const item = document.createElement('md-nav-bar-item') as MdNavBarItem;
    item.label = 'Home';

    bar.appendChild(item);
    document.body.appendChild(bar);

    await bar.updateComplete;
    await item.updateComplete;

    expect(bar).toBeInstanceOf(MdNavigationBar);
    expect(item).toBeInstanceOf(MdNavigationBarItem);
  });
});
