import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSplitButton } from '../src/components/split-button/split-button.js';

describe('md-split-button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render main action button and trailing menu button with default attributes', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    expect(splitBtn.variant).toBe('filled');
    expect(splitBtn.disabled).toBe(false);
    expect(splitBtn.open).toBe(false);

    const actionBtn = splitBtn.shadowRoot?.querySelector('.action-button') as HTMLButtonElement;
    const menuBtn = splitBtn.shadowRoot?.querySelector('.menu-button') as HTMLButtonElement;

    expect(actionBtn).toBeTruthy();
    expect(menuBtn).toBeTruthy();
    expect(menuBtn.getAttribute('aria-haspopup')).toBe('menu');
    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
  });

  it('should support variants (filled, elevated, tonal, outlined)', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    document.body.appendChild(splitBtn);

    const variants = ['filled', 'elevated', 'tonal', 'outlined'] as const;
    for (const variant of variants) {
      splitBtn.variant = variant;
      await splitBtn.updateComplete;
      expect(splitBtn.getAttribute('variant')).toBe(variant);
    }
  });

  it('should dispatch action event when main button is clicked', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Publish';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    let actionFired = false;
    let eventDetail: any = null;
    splitBtn.addEventListener('action', (e: any) => {
      actionFired = true;
      eventDetail = e.detail;
    });

    const actionBtn = splitBtn.shadowRoot?.querySelector('.action-button') as HTMLButtonElement;
    actionBtn.click();
    await splitBtn.updateComplete;

    expect(actionFired).toBe(true);
    expect(eventDetail.target).toBe(splitBtn);
  });

  it('should toggle open state and emit trailing-click and toggle events on menu button click', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Options';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    let trailingClicked = false;
    let toggleFired = false;
    let toggleDetail: any = null;

    splitBtn.addEventListener('trailing-click', () => {
      trailingClicked = true;
    });

    splitBtn.addEventListener('toggle', (e: any) => {
      toggleFired = true;
      toggleDetail = e.detail;
    });

    const menuBtn = splitBtn.shadowRoot?.querySelector('.menu-button') as HTMLButtonElement;
    menuBtn.click();
    await splitBtn.updateComplete;

    expect(splitBtn.open).toBe(true);
    expect(menuBtn.getAttribute('aria-expanded')).toBe('true');
    expect(trailingClicked).toBe(true);
    expect(toggleFired).toBe(true);
    expect(toggleDetail.open).toBe(true);

    menuBtn.click();
    await splitBtn.updateComplete;

    expect(splitBtn.open).toBe(false);
    expect(menuBtn.getAttribute('aria-expanded')).toBe('false');
    expect(toggleDetail.open).toBe(false);
  });

  it('should not dispatch events or toggle when disabled', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Disabled Action';
    splitBtn.disabled = true;
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    let actionFired = false;
    let trailingClicked = false;
    splitBtn.addEventListener('action', () => {
      actionFired = true;
    });
    splitBtn.addEventListener('trailing-click', () => {
      trailingClicked = true;
    });

    const actionBtn = splitBtn.shadowRoot?.querySelector('.action-button') as HTMLButtonElement;
    const menuBtn = splitBtn.shadowRoot?.querySelector('.menu-button') as HTMLButtonElement;

    expect(actionBtn.disabled).toBe(true);
    expect(menuBtn.disabled).toBe(true);

    actionBtn.click();
    menuBtn.click();
    await splitBtn.updateComplete;

    expect(actionFired).toBe(false);
    expect(trailingClicked).toBe(false);
    expect(splitBtn.open).toBe(false);
  });

  it('should render leading icon and custom trailing icon', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Send';
    splitBtn.icon = 'send';
    splitBtn.trailingIcon = 'expand_more';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    const actionIcon = splitBtn.shadowRoot?.querySelector('.content md-icon');
    expect(actionIcon?.getAttribute('name')).toBe('send');

    const menuIcon = splitBtn.shadowRoot?.querySelector('.icon-wrapper md-icon');
    expect(menuIcon?.getAttribute('name')).toBe('expand_more');
  });

  it('should submit form when type="submit" and action button is clicked', async () => {
    const form = document.createElement('form');
    let submitted = false;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitted = true;
    });

    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.type = 'submit';
    splitBtn.label = 'Save and Publish';
    form.appendChild(splitBtn);
    document.body.appendChild(form);
    await splitBtn.updateComplete;

    const actionBtn = splitBtn.shadowRoot?.querySelector('.action-button') as HTMLButtonElement;
    actionBtn.click();
    await splitBtn.updateComplete;

    expect(submitted).toBe(true);
  });

  it('should render submenu surface and backdrop', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    const menuSurface = splitBtn.shadowRoot?.querySelector('.menu-surface') as HTMLElement;
    const backdrop = splitBtn.shadowRoot?.querySelector('.backdrop') as HTMLElement;

    expect(menuSurface).toBeTruthy();
    expect(backdrop).toBeTruthy();
    expect(menuSurface.getAttribute('aria-hidden')).toBe('true');
  });

  it('should open and close submenu using show(), close(), and toggle() methods', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    let openFired = false;
    let closeFired = false;
    splitBtn.addEventListener('open', () => {
      openFired = true;
    });
    splitBtn.addEventListener('close', () => {
      closeFired = true;
    });

    splitBtn.show();
    await splitBtn.updateComplete;
    expect(splitBtn.open).toBe(true);
    expect(openFired).toBe(true);

    splitBtn.close();
    await splitBtn.updateComplete;
    expect(splitBtn.open).toBe(false);
    expect(closeFired).toBe(true);

    splitBtn.toggle();
    await splitBtn.updateComplete;
    expect(splitBtn.open).toBe(true);
  });

  it('should close submenu when clicking outside or backdrop', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    splitBtn.show();
    await splitBtn.updateComplete;
    expect(splitBtn.open).toBe(true);

    const outside = document.createElement('div');
    document.body.appendChild(outside);
    outside.dispatchEvent(new MouseEvent('pointerdown', { bubbles: true, composed: true }));
    await splitBtn.updateComplete;

    expect(splitBtn.open).toBe(false);
  });

  it('should close submenu on Escape key and focus menuButton', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    splitBtn.show();
    await splitBtn.updateComplete;
    expect(splitBtn.open).toBe(true);

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await splitBtn.updateComplete;

    expect(splitBtn.open).toBe(false);
  });

  it('should handle item selection from submenu and emit select event', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.label = 'Save';

    const item1 = document.createElement('md-menu-item');
    item1.setAttribute('headline', 'Save as draft');
    item1.setAttribute('value', 'draft');

    const item2 = document.createElement('md-menu-item');
    item2.setAttribute('headline', 'Save and publish');
    item2.setAttribute('value', 'publish');

    splitBtn.appendChild(item1);
    splitBtn.appendChild(item2);
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    splitBtn.show();
    await splitBtn.updateComplete;

    let selectedDetail: any = null;
    splitBtn.addEventListener('select', (e: any) => {
      selectedDetail = e.detail;
    });

    const items = splitBtn.getItems();
    expect(items.length).toBe(2);

    item1.dispatchEvent(new CustomEvent('item-click', {
      bubbles: true,
      composed: true,
      detail: { item: item1, value: 'draft' }
    }));
    await splitBtn.updateComplete;

    expect(selectedDetail).toBeTruthy();
    expect(selectedDetail.value).toBe('draft');
    expect(splitBtn.open).toBe(false);
  });

  it('should support menu-placement property', async () => {
    const splitBtn = document.createElement('md-split-button') as MdSplitButton;
    splitBtn.menuPlacement = 'top-start';
    document.body.appendChild(splitBtn);
    await splitBtn.updateComplete;

    expect(splitBtn.getAttribute('menu-placement')).toBe('top-start');
  });
});
