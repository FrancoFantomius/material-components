import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../src/index.js';
import { MdFabMenu } from '../src/components/fab-menu/fab-menu.js';
import { MdFabMenuItem } from '../src/components/fab-menu/fab-menu-item.js';

describe('md-fab-menu and md-fab-menu-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default FAB menu', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    expect(fabMenu.open).toBe(false);
    expect(fabMenu.modal).toBe(false);
    expect(fabMenu.direction).toBe('up');
    expect(fabMenu.icon).toBe('add');
    expect(fabMenu.size).toBe('medium');
    expect(fabMenu.disabled).toBe(false);

    const triggerBtn = fabMenu.shadowRoot?.querySelector('.trigger-btn');
    expect(triggerBtn).not.toBeNull();
    expect(triggerBtn?.getAttribute('aria-expanded')).toBe('false');
  });

  it('should toggle, show, and close menu with appropriate events', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    let openCount = 0;
    let closeCount = 0;
    let toggleCount = 0;

    fabMenu.addEventListener('open', () => openCount++);
    fabMenu.addEventListener('close', () => closeCount++);
    fabMenu.addEventListener('toggle', (e: any) => {
      toggleCount++;
      expect(e.detail.open).toBe(fabMenu.open);
    });

    // Test show()
    fabMenu.show();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(true);
    expect(fabMenu.hasAttribute('open')).toBe(true);
    expect(openCount).toBe(1);
    expect(toggleCount).toBe(1);

    // Test close()
    fabMenu.close();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(false);
    expect(fabMenu.hasAttribute('open')).toBe(false);
    expect(closeCount).toBe(1);
    expect(toggleCount).toBe(2);

    // Test toggle()
    fabMenu.toggle();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(true);
    expect(openCount).toBe(2);
    expect(toggleCount).toBe(3);

    // Test alias openMenu / closeMenu
    fabMenu.closeMenu();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(false);

    fabMenu.openMenu();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(true);
  });

  it('should toggle on trigger button click', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    const triggerBtn = fabMenu.shadowRoot?.querySelector('.trigger-btn') as HTMLButtonElement;
    triggerBtn.click();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(true);

    triggerBtn.click();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(false);
  });

  it('should support modal mode and handle scrim click', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.modal = true;
    fabMenu.open = true;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    let scrimClicked = false;
    fabMenu.addEventListener('scrim-click', () => {
      scrimClicked = true;
    });

    const scrim = fabMenu.shadowRoot?.querySelector('.scrim') as HTMLElement;
    expect(scrim).not.toBeNull();

    scrim.click();
    await fabMenu.updateComplete;

    expect(scrimClicked).toBe(true);
    expect(fabMenu.open).toBe(false);
  });

  it('should close on Escape key when open', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.open = true;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fabMenu.updateComplete;

    expect(fabMenu.open).toBe(false);
  });

  it('should close on click outside when open', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.open = true;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);

    outsideElement.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
    await fabMenu.updateComplete;

    expect(fabMenu.open).toBe(false);
  });

  it('should support extended FAB label', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.label = 'Compose';
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    expect(fabMenu.extended).toBe(true);
    expect(fabMenu.hasAttribute('extended')).toBe(true);

    const labelSpan = fabMenu.shadowRoot?.querySelector('.trigger-label');
    expect(labelSpan?.textContent).toBe('Compose');
  });

  it('should render md-fab-menu-item with icon and label', async () => {
    const item = document.createElement('md-fab-menu-item') as MdFabMenuItem;
    item.icon = 'email';
    item.label = 'Send Email';
    item.value = 'email-action';
    document.body.appendChild(item);
    await item.updateComplete;

    expect(item.icon).toBe('email');
    expect(item.label).toBe('Send Email');
    expect(item.value).toBe('email-action');
    expect(item.size).toBe('small');
    expect(item.labelPlacement).toBe('start');

    const labelPill = item.shadowRoot?.querySelector('.label-pill');
    expect(labelPill?.textContent).toBe('Send Email');

    const icon = item.shadowRoot?.querySelector('md-icon');
    expect(icon?.getAttribute('name')).toBe('email');
  });

  it('should dispatch action event when md-fab-menu-item is clicked and close menu', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.open = true;

    const item = document.createElement('md-fab-menu-item') as MdFabMenuItem;
    item.icon = 'edit';
    item.label = 'Edit Document';
    item.value = 'edit';

    fabMenu.appendChild(item);
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;
    await item.updateComplete;

    let actionDetail: any = null;
    item.addEventListener('action', (e: any) => {
      actionDetail = e.detail;
    });

    const itemContainer = item.shadowRoot?.querySelector('.item-container') as HTMLElement;
    itemContainer.click();
    await item.updateComplete;
    await fabMenu.updateComplete;

    expect(actionDetail).not.toBeNull();
    expect(actionDetail.item).toBe(item);
    expect(actionDetail.value).toBe('edit');
    expect(actionDetail.label).toBe('Edit Document');
    expect(fabMenu.open).toBe(false);
  });

  it('should support keyboard activation on md-fab-menu-item', async () => {
    const item = document.createElement('md-fab-menu-item') as MdFabMenuItem;
    item.label = 'Print';
    item.value = 'print';
    document.body.appendChild(item);
    await item.updateComplete;

    let activated = false;
    item.addEventListener('action', () => {
      activated = true;
    });

    const itemContainer = item.shadowRoot?.querySelector('.item-container') as HTMLElement;
    itemContainer.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await item.updateComplete;

    expect(activated).toBe(true);
  });

  it('should not trigger actions when disabled', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.disabled = true;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    const triggerBtn = fabMenu.shadowRoot?.querySelector('.trigger-btn') as HTMLButtonElement;
    triggerBtn.click();
    await fabMenu.updateComplete;
    expect(fabMenu.open).toBe(false);

    const item = document.createElement('md-fab-menu-item') as MdFabMenuItem;
    item.disabled = true;
    item.value = 'disabled-action';
    document.body.appendChild(item);
    await item.updateComplete;

    let itemActivated = false;
    item.addEventListener('action', () => {
      itemActivated = true;
    });

    const itemContainer = item.shadowRoot?.querySelector('.item-container') as HTMLElement;
    itemContainer.click();
    await item.updateComplete;

    expect(itemActivated).toBe(false);
  });

  it('should support directions and custom openIcon', async () => {
    const fabMenu = document.createElement('md-fab-menu') as MdFabMenu;
    fabMenu.direction = 'down';
    fabMenu.openIcon = 'close';
    fabMenu.open = true;
    document.body.appendChild(fabMenu);
    await fabMenu.updateComplete;

    expect(fabMenu.getAttribute('direction')).toBe('down');

    const icon = fabMenu.shadowRoot?.querySelector('md-icon');
    expect(icon?.getAttribute('name')).toBe('close');
  });
});
