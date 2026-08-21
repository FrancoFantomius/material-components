import { html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import { accountMenuStyles, accountItemStyles } from './account-menu.css.js';

export type AccountMenuAlignment = 'start' | 'end';
export type AccountMenuPivot = 'left' | 'right';
export type AccountMenuTab = 'overview' | 'security' | 'storage' | 'accounts';

/**
 * Material Design 3 Account Item component.
 * Represents a single account profile in the account switcher or an account action item.
 *
 * @slot icon - Custom icon or graphic.
 * @slot - Default slot for account name/details.
 * @slot trailing - Custom trailing content or checkmark.
 */
@customElement('md-account-item')
export class MdAccountItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, accountItemStyles];

  @property({ type: String })
  name = '';

  @property({ type: String })
  email = '';

  @property({ type: String })
  avatar = '';

  @property({ type: String })
  initials = '';

  @property({ type: String })
  icon = '';

  @property({ type: String })
  badge = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean })
  action = false;

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.emitEvent('account-click', {
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      initials: this.initials,
      active: this.active,
      action: this.action,
    });
  };

  override render() {
    const displayInitials = this.initials || (this.name ? this.name.charAt(0).toUpperCase() : '');

    const avatarContent = this.avatar
      ? html`<img class="item-avatar-img" src=${this.avatar} alt=${this.name || 'Account avatar'} />`
      : this.icon
        ? html`<md-icon name=${this.icon}></md-icon>`
        : displayInitials
          ? html`<span>${displayInitials}</span>`
          : html`<md-icon name="person"></md-icon>`;

    const trailingContent = this.active
      ? html`<md-icon name="check" class="check-icon"></md-icon>`
      : this.action
        ? html`<md-icon name="chevron_right" class="action-icon"></md-icon>`
        : nothing;

    const inner = html`
      <md-ripple ?disabled=${this.disabled}></md-ripple>
      <md-focus-ring></md-focus-ring>

      <div class="item-avatar">
        <slot name="icon">${avatarContent}</slot>
      </div>

      <div class="item-content">
        <span class="item-name"><slot name="name">${this.name || 'Account'}</slot></span>
        ${this.email ? html`<span class="item-email"><slot name="email">${this.email}</slot></span>` : nothing}
      </div>

      <div class="item-trailing">
        <slot name="trailing">${trailingContent}</slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleClick}
        >
          ${inner}
        </a>
      `;
    }

    return html`
      <button
        class="item"
        type="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${inner}
      </button>
    `;
  }
}

/**
 * Material Design 3 Account Menu (Account Profile Switcher) component.
 * Displays a profile menu with rich user info, storage usage, security overview, and multi-account switcher.
 *
 * @slot trigger - Custom trigger element replacing the default avatar button.
 * @slot header - Custom header element.
 * @slot overview - Custom overview info content.
 * @slot security - Custom security info content.
 * @slot storage - Custom storage info content.
 * @slot accounts - Container for md-account-item instances.
 * @slot footer - Custom footer content.
 */
@customElement('md-account-menu')
export class MdAccountMenu extends MdBaseElement {
  static override styles = [MdBaseElement.styles, accountMenuStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  name = 'Franco Fantomius';

  @property({ type: String })
  email = 'franco.fantomius@example.com';

  @property({ type: String })
  avatar = '';

  @property({ type: String })
  initials = '';

  @property({ type: String })
  icon = 'account_circle';

  @property({ type: String, attribute: 'headline' })
  headline = 'Account';

  @property({ type: String, attribute: 'manage-text' })
  manageText = 'Manage your Account';

  @property({ type: String, attribute: 'manage-url' })
  manageUrl = '';

  @property({ type: String, attribute: 'organization' })
  organization = 'Material Components';

  @property({ type: String, attribute: 'role-title' })
  roleTitle = 'Lead Architect';

  @property({ type: String, attribute: 'status' })
  status = 'Active';

  @property({ type: String, attribute: 'storage-used' })
  storageUsed = '10.4 GB';

  @property({ type: String, attribute: 'storage-total' })
  storageTotal = '15 GB';

  @property({ type: Number, attribute: 'storage-progress' })
  storageProgress = 0.69;

  @property({ type: String, attribute: 'security-status' })
  securityStatus = 'Protected';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'Account info';

  @property({ type: Boolean, attribute: 'no-trigger' })
  noTrigger = false;

  get trigger(): boolean {
    return !this.noTrigger;
  }

  set trigger(value: boolean) {
    this.noTrigger = !value;
    this.requestUpdate('noTrigger');
  }

  @property({ type: String, reflect: true })
  alignment: AccountMenuAlignment = 'end';

  @property({ type: String, reflect: true })
  pivot: AccountMenuPivot = 'right';

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: Boolean, reflect: true })
  fullscreen = false;

  @property({ type: Boolean, attribute: 'show-tabs' })
  showTabs = true;

  @state()
  activeTab: AccountMenuTab = 'overview';

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    this.addEventListener('account-click', this.handleAccountItemClick as EventListener);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    this.removeEventListener('account-click', this.handleAccountItemClick as EventListener);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
      } else {
        this.emitEvent('close');
      }
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.close();
    }
  };

  private handleDocumentClick = (event: MouseEvent | PointerEvent) => {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  };

  private handleBackdropClick = () => {
    this.close();
  };

  private handleBackClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.close();
  };

  private handleTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.toggle();
  };

  private handleTabClick = (tab: AccountMenuTab) => {
    this.activeTab = tab;
    this.emitEvent('tab-change', { tab });
  };

  private handleManageClick = (event: MouseEvent) => {
    this.emitEvent('manage-click', {
      name: this.name,
      email: this.email,
      manageUrl: this.manageUrl,
    });
  };

  private handleSignOutClick = () => {
    this.emitEvent('sign-out', {
      email: this.email,
    });
    this.close();
  };

  private handleEditAvatarClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.emitEvent('edit-avatar', {
      email: this.email,
    });
  };

  private handleAccountItemClick = (e: CustomEvent) => {
    const detail = e.detail;
    if (!detail.action && detail.email) {
      this.name = detail.name || this.name;
      this.email = detail.email;
      if (detail.avatar) this.avatar = detail.avatar;
      if (detail.initials) this.initials = detail.initials;
    }
    this.emitEvent('account-select', detail);
  };

  /**
   * Opens the account menu popover.
   */
  show() {
    if (!this.open) {
      this.open = true;
    }
  }

  /**
   * Closes the account menu popover.
   */
  close() {
    if (this.open) {
      this.open = false;
    }
  }

  /**
   * Toggles the account menu open/closed state.
   */
  toggle() {
    this.open = !this.open;
  }

  override render() {
    const displayInitials = this.initials || (this.name ? this.name.charAt(0).toUpperCase() : 'G');

    const triggerAvatar = this.avatar
      ? html`<img class="avatar-img" src=${this.avatar} alt=${this.name || 'User Profile'} />`
      : displayInitials
        ? html`<span class="avatar-initials">${displayInitials}</span>`
        : html`<md-icon name=${this.icon}></md-icon>`;

    const triggerContent = !this.noTrigger
      ? html`
          <div class="trigger-container" @click=${this.handleTriggerClick}>
            <slot name="trigger">
              <button
                type="button"
                class="avatar-btn"
                aria-label=${this.ariaLabelText}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="dialog"
                title="${this.name} (${this.email})"
              >
                <md-ripple></md-ripple>
                <md-focus-ring></md-focus-ring>
                ${triggerAvatar}
              </button>
            </slot>
          </div>
        `
      : html`<slot name="trigger" @click=${this.handleTriggerClick}></slot>`;

    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}></div>

      <div class="trigger-wrapper">
        ${triggerContent}
      </div>

      <div
        class="popover"
        role="dialog"
        aria-modal=${this.modal ? 'true' : 'false'}
        aria-label=${this.headline || this.ariaLabelText}
        aria-hidden=${this.open ? 'false' : 'true'}
      >
        <!-- Popover Header -->
        <div class="popover-header">
          <div class="header-leading">
            <slot name="back-button">
              <md-icon-button
                class="back-btn"
                variant="standard"
                icon="arrow_back"
                aria-label="Back"
                title="Back"
                @click=${this.handleBackClick}
              ></md-icon-button>
            </slot>
            ${this.headline ? html`<span class="headline">${this.headline}</span>` : nothing}
          </div>
          <slot name="header">
            <button
              type="button"
              class="close-btn"
              aria-label="Close account menu"
              @click=${this.close}
            >
              <md-icon name="close"></md-icon>
            </button>
          </slot>
        </div>

        <!-- Central Profile Card -->
        <div class="profile-card">
          <div class="profile-avatar-wrapper">
            <div class="profile-avatar">
              ${this.avatar
                ? html`<img src=${this.avatar} alt=${this.name} />`
                : html`<span>${displayInitials}</span>`}
            </div>
            <button
              type="button"
              class="avatar-edit-badge"
              aria-label="Change profile picture"
              title="Change profile picture"
              @click=${this.handleEditAvatarClick}
            >
              <md-icon name="photo_camera"></md-icon>
            </button>
          </div>

          <h2 class="profile-name">${this.name}</h2>
          <span class="profile-email">${this.email}</span>

          <a
            class="manage-btn"
            href=${this.manageUrl || 'javascript:void(0)'}
            @click=${this.handleManageClick}
          >
            <md-ripple></md-ripple>
            <md-focus-ring></md-focus-ring>
            <md-icon name="manage_accounts"></md-icon>
            <span>${this.manageText}</span>
          </a>
        </div>

        <!-- Account Info Tabs -->
        ${this.showTabs
          ? html`
              <nav class="account-tabs" role="tablist" aria-label="Account information tabs">
                <button
                  type="button"
                  class="tab-btn ${this.activeTab === 'overview' ? 'active' : ''}"
                  role="tab"
                  aria-selected=${this.activeTab === 'overview' ? 'true' : 'false'}
                  @click=${() => this.handleTabClick('overview')}
                >
                  <md-icon name="badge"></md-icon>
                  <span>Overview</span>
                </button>
                <button
                  type="button"
                  class="tab-btn ${this.activeTab === 'security' ? 'active' : ''}"
                  role="tab"
                  aria-selected=${this.activeTab === 'security' ? 'true' : 'false'}
                  @click=${() => this.handleTabClick('security')}
                >
                  <md-icon name="shield"></md-icon>
                  <span>Security</span>
                </button>
                <button
                  type="button"
                  class="tab-btn ${this.activeTab === 'storage' ? 'active' : ''}"
                  role="tab"
                  aria-selected=${this.activeTab === 'storage' ? 'true' : 'false'}
                  @click=${() => this.handleTabClick('storage')}
                >
                  <md-icon name="cloud"></md-icon>
                  <span>Storage</span>
                </button>
                <button
                  type="button"
                  class="tab-btn ${this.activeTab === 'accounts' ? 'active' : ''}"
                  role="tab"
                  aria-selected=${this.activeTab === 'accounts' ? 'true' : 'false'}
                  @click=${() => this.handleTabClick('accounts')}
                >
                  <md-icon name="people"></md-icon>
                  <span>Accounts</span>
                </button>
              </nav>
            `
          : nothing}

        <!-- Tab Panels -->
        <!-- 1. Overview Tab Panel -->
        <div class="tab-panel ${this.activeTab === 'overview' ? 'active' : ''}" role="tabpanel">
          <slot name="overview">
            <div class="info-card">
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="apartment"></md-icon>
                  <span>Organization</span>
                </div>
                <span class="info-value">${this.organization}</span>
              </div>
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="engineering"></md-icon>
                  <span>Role</span>
                </div>
                <span class="info-value">${this.roleTitle}</span>
              </div>
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="verified_user"></md-icon>
                  <span>Status</span>
                </div>
                <span class="info-value">
                  <span class="badge-chip success">
                    <md-icon name="check_circle" style="font-size: 13px;"></md-icon>
                    ${this.status}
                  </span>
                </span>
              </div>
            </div>
          </slot>
        </div>

        <!-- 2. Security Tab Panel -->
        <div class="tab-panel ${this.activeTab === 'security' ? 'active' : ''}" role="tabpanel">
          <slot name="security">
            <div class="info-card">
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="security"></md-icon>
                  <span>2-Step Verification</span>
                </div>
                <span class="info-value">
                  <span class="badge-chip success">Enabled</span>
                </span>
              </div>
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="devices"></md-icon>
                  <span>Active Sessions</span>
                </div>
                <span class="info-value">2 devices (PC, Mobile)</span>
              </div>
              <div class="info-row">
                <div class="info-label">
                  <md-icon name="lock_reset"></md-icon>
                  <span>Password Changed</span>
                </div>
                <span class="info-value">3 months ago</span>
              </div>
            </div>
          </slot>
        </div>

        <!-- 3. Storage Tab Panel -->
        <div class="tab-panel ${this.activeTab === 'storage' ? 'active' : ''}" role="tabpanel">
          <slot name="storage">
            <div class="storage-box">
              <div class="storage-header">
                <div class="storage-title">
                  <md-icon name="cloud"></md-icon>
                  <span>Account Storage</span>
                </div>
                <span class="storage-meta">${this.storageUsed} of ${this.storageTotal} used</span>
              </div>
              <div class="storage-bar-track">
                <div
                  class="storage-bar-fill"
                  style="width: ${Math.min(100, Math.max(0, this.storageProgress * 100))}%;"
                ></div>
              </div>
              <div class="storage-breakdown">
                <div class="storage-item">
                  <span class="storage-dot" style="background-color: var(--md-sys-color-primary, #6750A4);"></span>
                  <span>Files: 6.2 GB</span>
                <div class="storage-item">
                  <span class="storage-dot" style="background-color: var(--md-sys-color-tertiary, #7D5260);"></span>
                  <span>Mail: 3.1 GB</span>
                </div>
                  <span class="storage-dot" style="background-color: var(--md-sys-color-secondary, #625B71);"></span>
                  <span>Media: 1.1 GB</span>
                </div>
                <div class="storage-item">
                  <span>Free: 4.6 GB</span>
                </div>
              </div>
            </div>
          </slot>
        </div>

        <!-- 4. Accounts Multi-switcher Tab Panel -->
        <div class="tab-panel ${this.activeTab === 'accounts' ? 'active' : ''}" role="tabpanel">
          <div class="accounts-list">
            <slot name="accounts">
              <md-account-item
                name=${this.name}
                email=${this.email}
                initials=${displayInitials}
                active
              ></md-account-item>
              <md-account-item
                name="Work Workspace"
                email="franco.dev@work.corp"
                initials="W"
              ></md-account-item>
              <md-account-item
                name="Add another account"
                icon="person_add"
                action
              ></md-account-item>
            </slot>
          </div>
        </div>

        <!-- Default Slot for Custom Extensions -->
        <slot></slot>

        <!-- Popover Footer -->
        <div class="popover-footer">
          <slot name="footer">
            <button type="button" class="signout-btn" @click=${this.handleSignOutClick}>
              <md-ripple></md-ripple>
              <md-focus-ring></md-focus-ring>
              <md-icon name="logout"></md-icon>
              <span>Sign out of all accounts</span>
            </button>
            <div class="footer-links">
              <a href="#/privacy">Privacy Policy</a>
              <span class="footer-dot">&bull;</span>
              <a href="#/terms">Terms of Service</a>
            </div>
          </slot>
        </div>
      </div>
    `;
  }
}

// Aliases
@customElement('md-account-drawer')
export class MdAccountDrawer extends MdAccountMenu {}

@customElement('md-account-profile')
export class MdAccountProfile extends MdAccountMenu {}

@customElement('md-account-profile-item')
export class MdAccountProfileItem extends MdAccountItem {}

declare global {
  interface HTMLElementTagNameMap {
    'md-account-menu': MdAccountMenu;
    'md-account-drawer': MdAccountDrawer;
    'md-account-profile': MdAccountProfile;
    'md-account-item': MdAccountItem;
    'md-account-profile-item': MdAccountProfileItem;
  }
}

