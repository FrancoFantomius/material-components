import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import {
  MdAccountMenu,
  MdAccountItem,
  MdAccountDrawer,
  MdAccountProfile,
  MdAccountProfileItem,
} from '../src/components/account-menu/account-menu.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';

describe('md-account-menu & md-account-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

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

  it('should render a back button in header and close on back button click', async () => {
    const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
    document.body.appendChild(accountMenu);
    await accountMenu.updateComplete;

    accountMenu.show();
    await accountMenu.updateComplete;
    expect(accountMenu.open).toBe(true);

    const backBtn = accountMenu.shadowRoot?.querySelector('.back-btn') as HTMLElement;
    expect(backBtn).not.toBeNull();
    expect(backBtn.getAttribute('icon')).toBe('arrow_back');

    let closeEventFired = false;
    accountMenu.addEventListener('close', () => {
      closeEventFired = true;
    });

    backBtn.click();
    await accountMenu.updateComplete;

    expect(accountMenu.open).toBe(false);
    expect(closeEventFired).toBe(true);
  });

  it('should support fullscreen property and custom back-button slot', async () => {
    const accountMenu = document.createElement('md-account-menu') as MdAccountMenu;
    accountMenu.fullscreen = true;

    const customBackBtn = document.createElement('md-icon-button') as MdIconButton;
    customBackBtn.setAttribute('slot', 'back-button');
    customBackBtn.setAttribute('icon', 'arrow_back');
    customBackBtn.setAttribute('aria-label', 'Back');
    accountMenu.appendChild(customBackBtn);

    document.body.appendChild(accountMenu);
    await accountMenu.updateComplete;
    await customBackBtn.updateComplete;

    expect(accountMenu.hasAttribute('fullscreen')).toBe(true);
    expect(accountMenu.fullscreen).toBe(true);

    const slot = accountMenu.shadowRoot?.querySelector('slot[name="back-button"]') as HTMLSlotElement;
    expect(slot).not.toBeNull();
    const assigned = slot.assignedElements();
    expect(assigned.length).toBe(1);
    expect(assigned[0]).toBe(customBackBtn);
  });
});
