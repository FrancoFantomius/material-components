import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdNavigationRail, MdNavigationRailItem, MdNavRail, MdNavRailItem } from '../src/components/navigation-rail/navigation-rail.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';
import { MdFab } from '../src/components/fab/fab.js';

describe('md-navigation-rail & md-navigation-rail-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default navigation rail with default properties', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    document.body.appendChild(rail);
    await rail.updateComplete;

    expect(rail.alignment).toBe('top');
    expect(rail.hideLabels).toBe(false);
    expect(rail.getAttribute('role')).toBe('navigation');
    expect(rail.getAttribute('aria-label')).toBe('Navigation rail');
  });

  it('should support alignment property and reflect to attribute', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    rail.alignment = 'center';
    document.body.appendChild(rail);
    await rail.updateComplete;

    expect(rail.alignment).toBe('center');
    expect(rail.getAttribute('alignment')).toBe('center');

    rail.alignment = 'bottom';
    await rail.updateComplete;
    expect(rail.alignment).toBe('bottom');
    expect(rail.getAttribute('alignment')).toBe('bottom');
  });

  it('should render navigation rail item with icon, label, badge, and active state', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.icon = 'inbox';
    item.label = 'Inbox';
    item.badge = '5';
    item.active = true;
    document.body.appendChild(item);
    await item.updateComplete;

    expect(item.hasAttribute('active')).toBe(true);
    expect(item.selected).toBe(true);

    const icon = item.shadowRoot?.querySelector('md-icon');
    expect(icon?.getAttribute('name')).toBe('inbox');

    const label = item.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Inbox');

    const badge = item.shadowRoot?.querySelector('.badge');
    expect(badge?.textContent).toBe('5');
  });

  it('should render active-icon when active', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.icon = 'star_outline';
    item.activeIcon = 'star';
    item.label = 'Starred';
    document.body.appendChild(item);
    await item.updateComplete;

    let icon = item.shadowRoot?.querySelector('md-icon');
    expect(icon?.getAttribute('name')).toBe('star_outline');

    item.active = true;
    await item.updateComplete;

    icon = item.shadowRoot?.querySelector('md-icon');
    expect(icon?.getAttribute('name')).toBe('star');
  });

  it('should support badge-dot on navigation rail item', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.badgeDot = true;
    document.body.appendChild(item);
    await item.updateComplete;

    const badge = item.shadowRoot?.querySelector('.badge.dot');
    expect(badge).not.toBeNull();
  });

  it('should support href anchor link rendering', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.href = 'https://example.com';
    item.target = '_blank';
    document.body.appendChild(item);
    await item.updateComplete;

    const anchor = item.shadowRoot?.querySelector('a.item');
    expect(anchor).not.toBeNull();
    expect(anchor?.getAttribute('href')).toBe('https://example.com');
    expect(anchor?.getAttribute('target')).toBe('_blank');
  });

  it('should fire item-click event on destination click', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.label = 'Sent';
    item.icon = 'send';
    item.value = 'sent-dest';
    document.body.appendChild(item);
    await item.updateComplete;

    let clickDetail: any = null;
    item.addEventListener('item-click', (e: any) => {
      clickDetail = e.detail;
    });

    const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
    inner.click();
    await item.updateComplete;

    expect(clickDetail).not.toBeNull();
    expect(clickDetail.label).toBe('Sent');
    expect(clickDetail.icon).toBe('send');
    expect(clickDetail.value).toBe('sent-dest');
  });

  it('should not fire click event or navigate when disabled', async () => {
    const item = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item.disabled = true;
    item.label = 'Drafts';
    document.body.appendChild(item);
    await item.updateComplete;

    let fired = false;
    item.addEventListener('item-click', () => {
      fired = true;
    });

    const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
    inner.click();
    await item.updateComplete;

    expect(fired).toBe(false);
  });

  it('should coordinate item selection and emit change event on rail', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    const item1 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item1.label = 'Inbox';
    const item2 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item2.label = 'Starred';
    const item3 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item3.label = 'Sent';

    rail.appendChild(item1);
    rail.appendChild(item2);
    rail.appendChild(item3);
    document.body.appendChild(rail);

    await rail.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    let changeDetail: any = null;
    rail.addEventListener('change', (e: any) => {
      changeDetail = e.detail;
    });

    // Click item 2
    const inner2 = item2.shadowRoot?.querySelector('.item') as HTMLElement;
    inner2.click();
    await rail.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(rail.activeIndex).toBe(1);
    expect(item1.active).toBe(false);
    expect(item2.active).toBe(true);
    expect(changeDetail?.activeIndex).toBe(1);
    expect(changeDetail?.item).toBe(item2);

    // Setting activeIndex programmatically
    rail.activeIndex = 2;
    await rail.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    expect(item2.active).toBe(false);
    expect(item3.active).toBe(true);
  });

  it('should support hide-labels on rail and propagate to items', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    rail.hideLabels = true;
    const item1 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    item1.label = 'Home';
    rail.appendChild(item1);
    document.body.appendChild(rail);

    await rail.updateComplete;
    await item1.updateComplete;

    expect(rail.hasAttribute('hide-labels')).toBe(true);
    expect(item1.hasAttribute('hide-label')).toBe(true);

    rail.hideLabels = false;
    await rail.updateComplete;
    await item1.updateComplete;

    expect(item1.hasAttribute('hide-label')).toBe(false);
  });

  it('should handle keyboard navigation with ArrowDown, ArrowUp, Home, End', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    const item1 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    const item2 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;
    const item3 = document.createElement('md-navigation-rail-item') as MdNavigationRailItem;

    rail.appendChild(item1);
    rail.appendChild(item2);
    rail.appendChild(item3);
    document.body.appendChild(rail);

    await rail.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    rail.activeIndex = 0;
    await rail.updateComplete;

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(1);

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(2);

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(0); // wraps around

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(2);

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(0);

    rail.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await rail.updateComplete;
    expect(rail.activeIndex).toBe(2);
  });

  it('should support aliases md-nav-rail and md-nav-rail-item', async () => {
    const rail = document.createElement('md-nav-rail') as MdNavRail;
    const item = document.createElement('md-nav-rail-item') as MdNavRailItem;

    expect(rail).toBeInstanceOf(MdNavigationRail);
    expect(item).toBeInstanceOf(MdNavigationRailItem);
  });

  it('should support menu, fab, and footer slots', async () => {
    const rail = document.createElement('md-navigation-rail') as MdNavigationRail;
    const menuBtn = document.createElement('md-icon-button') as MdIconButton;
    menuBtn.setAttribute('slot', 'menu');
    menuBtn.setAttribute('icon', 'menu');

    const fab = document.createElement('md-fab') as MdFab;
    fab.setAttribute('slot', 'fab');
    fab.setAttribute('icon', 'edit');

    const footerBtn = document.createElement('md-icon-button') as MdIconButton;
    footerBtn.setAttribute('slot', 'footer');
    footerBtn.setAttribute('icon', 'settings');

    rail.appendChild(menuBtn);
    rail.appendChild(fab);
    rail.appendChild(footerBtn);
    document.body.appendChild(rail);

    await rail.updateComplete;
    await menuBtn.updateComplete;
    await fab.updateComplete;
    await footerBtn.updateComplete;

    expect(menuBtn.getAttribute('slot')).toBe('menu');
    expect(fab.getAttribute('slot')).toBe('fab');
    expect(footerBtn.getAttribute('slot')).toBe('footer');
  });
});
