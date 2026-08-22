import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../src/index.js';
import { MdMenu, MdMenuItem } from '../src/components/menu/menu.js';
import { MdButton } from '../src/components/button/button.js';

describe('md-menu & md-menu-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default menu and menu items', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item1 = document.createElement('md-menu-item') as MdMenuItem;
    item1.headline = 'Cut';
    item1.icon = 'content_cut';
    item1.trailingSupportingText = 'Ctrl+X';

    const item2 = document.createElement('md-menu-item') as MdMenuItem;
    item2.headline = 'Copy';
    item2.icon = 'content_copy';
    item2.trailingSupportingText = 'Ctrl+C';

    menu.appendChild(item1);
    menu.appendChild(item2);
    document.body.appendChild(menu);

    await menu.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(menu.open).toBe(false);
    expect(menu.getItems().length).toBe(2);

    const headlineEl = item1.shadowRoot?.querySelector('.headline');
    expect(headlineEl?.textContent?.trim()).toBe('Cut');

    const iconEl = item1.shadowRoot?.querySelector('md-icon');
    expect(iconEl?.getAttribute('name')).toBe('content_cut');

    const trailingEl = item1.shadowRoot?.querySelector('.trailing-supporting-text');
    expect(trailingEl?.textContent?.trim()).toBe('Ctrl+X');
  });

  it('should open, close, and toggle menu', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Option 1';
    menu.appendChild(item);
    document.body.appendChild(menu);

    let openFired = false;
    let closeFired = false;
    menu.addEventListener('open', () => {
      openFired = true;
    });
    menu.addEventListener('close', () => {
      closeFired = true;
    });

    menu.show();
    await menu.updateComplete;
    expect(menu.open).toBe(true);
    expect(openFired).toBe(true);

    menu.close();
    await menu.updateComplete;
    expect(menu.open).toBe(false);
    expect(closeFired).toBe(true);

    menu.toggle();
    await menu.updateComplete;
    expect(menu.open).toBe(true);
  });

  it('should handle trigger slot click to toggle menu', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const button = document.createElement('button');
    button.setAttribute('slot', 'trigger');
    button.textContent = 'Menu Trigger';
    menu.appendChild(button);

    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Item 1';
    menu.appendChild(item);

    document.body.appendChild(menu);
    await menu.updateComplete;

    const triggerWrapper = menu.shadowRoot?.querySelector('.trigger-wrapper') as HTMLElement;
    expect(triggerWrapper).not.toBeNull();

    triggerWrapper.click();
    await menu.updateComplete;
    expect(menu.open).toBe(true);

    triggerWrapper.click();
    await menu.updateComplete;
    expect(menu.open).toBe(false);
  });

  it('should resolve external anchor element by id and update positioning', async () => {
    const anchorBtn = document.createElement('button');
    anchorBtn.id = 'anchor-btn';
    anchorBtn.textContent = 'External Anchor';
    document.body.appendChild(anchorBtn);

    const menu = document.createElement('md-menu') as MdMenu;
    menu.anchor = 'anchor-btn';
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Item 1';
    menu.appendChild(item);
    document.body.appendChild(menu);

    await menu.updateComplete;
    expect(menu.anchorElement).toBe(anchorBtn);

    menu.show();
    await menu.updateComplete;
    expect(menu.open).toBe(true);
  });

  it('should close when clicking backdrop or outside the menu', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    menu.open = true;
    document.body.appendChild(menu);
    await menu.updateComplete;

    const backdrop = menu.shadowRoot?.querySelector('.backdrop') as HTMLElement;
    expect(backdrop).not.toBeNull();
    backdrop.click();
    await menu.updateComplete;
    expect(menu.open).toBe(false);

    menu.open = true;
    await menu.updateComplete;

    const outsideEl = document.createElement('div');
    document.body.appendChild(outsideEl);
    outsideEl.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
    await menu.updateComplete;
    expect(menu.open).toBe(false);
  });

  it('should close on Escape key', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    menu.open = true;
    document.body.appendChild(menu);
    await menu.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await menu.updateComplete;
    expect(menu.open).toBe(false);
  });

  it('should support item click selection and close menu', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Select Option';
    item.value = 'option_1';
    menu.appendChild(item);
    document.body.appendChild(menu);
    menu.open = true;

    await menu.updateComplete;
    await item.updateComplete;

    let selectedDetail: any = null;
    menu.addEventListener('select', (e: any) => {
      selectedDetail = e.detail;
    });

    const itemBtn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
    itemBtn.click();
    await menu.updateComplete;

    expect(selectedDetail).not.toBeNull();
    expect(selectedDetail.value).toBe('option_1');
    expect(selectedDetail.item).toBe(item);
    expect(menu.open).toBe(false);
  });

  it('should not close menu when item has keep-open attribute', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Toggle Option';
    item.value = 'toggle_1';
    item.keepOpen = true;
    menu.appendChild(item);
    document.body.appendChild(menu);
    menu.open = true;

    await menu.updateComplete;
    await item.updateComplete;

    let selectFired = false;
    menu.addEventListener('select', () => {
      selectFired = true;
    });

    const itemBtn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
    itemBtn.click();
    await menu.updateComplete;

    expect(selectFired).toBe(true);
    expect(menu.open).toBe(true);
  });

  it('should not emit events or close when clicking a disabled item', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Disabled Option';
    item.disabled = true;
    menu.appendChild(item);
    document.body.appendChild(menu);
    menu.open = true;

    await menu.updateComplete;
    await item.updateComplete;

    let selectFired = false;
    menu.addEventListener('select', () => {
      selectFired = true;
    });

    const itemBtn = item.shadowRoot?.querySelector('button.item') as HTMLElement;
    itemBtn.click();
    await menu.updateComplete;

    expect(selectFired).toBe(false);
    expect(menu.open).toBe(true);
  });

  it('should render link item when href is provided', async () => {
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Docs Link';
    item.href = 'https://material.io';
    item.target = '_blank';
    document.body.appendChild(item);
    await item.updateComplete;

    const anchorEl = item.shadowRoot?.querySelector('a.item');
    expect(anchorEl).not.toBeNull();
    expect(anchorEl?.getAttribute('href')).toBe('https://material.io');
    expect(anchorEl?.getAttribute('target')).toBe('_blank');
  });

  it('should support selected state with checkmark', async () => {
    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Checked Item';
    item.selected = true;
    document.body.appendChild(item);
    await item.updateComplete;

    expect(item.hasAttribute('selected')).toBe(true);
    const checkIcon = item.shadowRoot?.querySelector('.check-icon');
    expect(checkIcon).not.toBeNull();
  });

  it('should support supporting text and dense mode', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    menu.dense = true;

    const item = document.createElement('md-menu-item') as MdMenuItem;
    item.headline = 'Profile';
    item.supportingText = 'Manage personal preferences';
    menu.appendChild(item);
    document.body.appendChild(menu);

    await menu.updateComplete;
    await item.updateComplete;

    expect(menu.hasAttribute('dense')).toBe(true);
    expect(item.dense).toBe(true);

    const supportingTextEl = item.shadowRoot?.querySelector('.supporting-text');
    expect(supportingTextEl?.textContent?.trim()).toBe('Manage personal preferences');
  });

  it('should handle keyboard navigation with Arrow keys', async () => {
    const menu = document.createElement('md-menu') as MdMenu;
    const item1 = document.createElement('md-menu-item') as MdMenuItem;
    item1.headline = 'First';
    const item2 = document.createElement('md-menu-item') as MdMenuItem;
    item2.headline = 'Second';
    const item3 = document.createElement('md-menu-item') as MdMenuItem;
    item3.headline = 'Third';

    menu.appendChild(item1);
    menu.appendChild(item2);
    menu.appendChild(item3);
    document.body.appendChild(menu);

    menu.show();
    await menu.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;
    await item3.updateComplete;

    const surface = menu.shadowRoot?.querySelector('.menu-surface') as HTMLElement;
    expect(surface).not.toBeNull();

    const focusSpy1 = vi.spyOn(item1, 'focus');
    const focusSpy2 = vi.spyOn(item2, 'focus');
    const focusSpy3 = vi.spyOn(item3, 'focus');

    // Arrow down
    surface.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(focusSpy1).toHaveBeenCalled();

    // Home / End
    surface.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(focusSpy3).toHaveBeenCalled();

    surface.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(focusSpy1).toHaveBeenCalledTimes(2);
  });
});
