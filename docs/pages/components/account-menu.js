export default {
  id: 'account-menu',
  title: 'Account Menu',
  tag: 'md-account-menu',
  category: 'Navigation',
  description: 'Profile menu and account switcher that displays user credentials, role details, security status, storage quotas, and multiple account management.',
  subpath: '@francofantomius/material-components/account-menu',
  interactiveType: 'account-menu',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Controls whether the account menu popover is open' },
    { name: 'name', type: 'string', default: "'Franco Fantomius'", description: 'Display name of the active user' },
    { name: 'email', type: 'string', default: "'franco.fantomius@example.com'", description: 'Primary email address' },
    { name: 'avatar', type: 'string', default: "''", description: 'URL to avatar image' },
    { name: 'initials', type: 'string', default: "''", description: 'Fallback initials if avatar is not set' },
    { name: 'headline', type: 'string', default: "'Account'", description: 'Header text' },
    { name: 'manage-text', type: 'string', default: "'Manage your Account'", description: 'Label for the main account management button' },
    { name: 'manage-url', type: 'string', default: "''", description: 'Navigation URL for account management' },
    { name: 'organization', type: 'string', default: "'Material Components'", description: 'Company or organization name' },
    { name: 'role-title', type: 'string', default: "'Lead Architect'", description: 'User role or job title' },
    { name: 'status', type: 'string', default: "'Active'", description: 'Account status badge' },
    { name: 'storage-used', type: 'string', default: "'10.4 GB'", description: 'Storage amount currently used' },
    { name: 'storage-total', type: 'string', default: "'15 GB'", description: 'Total storage capacity' },
    { name: 'storage-progress', type: 'number', default: '0.69', description: 'Storage usage ratio between 0 and 1' },
    { name: 'security-status', type: 'string', default: "'Protected'", description: 'Security and 2FA status' },
    { name: 'show-tabs', type: 'boolean', default: 'true', description: 'Renders interactive Overview, Security, Storage, and Accounts tabs' },
    { name: 'alignment', type: "'start' | 'end'", default: "'end'", description: 'Horizontal alignment of the popover relative to the trigger' },
    { name: 'pivot', type: "'left' | 'right'", default: "'right'", description: 'Anchor pivot edge' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Shows a dimming modal backdrop when open' }
  ],
  subComponentProperties: [
    {
      name: 'md-account-item',
      properties: [
        { name: 'name', type: 'string', default: "''", description: 'Account profile name' },
        { name: 'email', type: 'string', default: "''", description: 'Account email address' },
        { name: 'avatar', type: 'string', default: "''", description: 'Avatar image URL' },
        { name: 'initials', type: 'string', default: "''", description: 'Avatar initials' },
        { name: 'icon', type: 'string', default: "''", description: 'Icon name' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Marks account as currently active' },
        { name: 'action', type: 'boolean', default: 'false', description: 'Action item mode (e.g. Add another account)' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction' }
      ]
    }
  ],
  slots: [
    { name: 'trigger', description: 'Custom trigger element replacing the default avatar button' },
    { name: 'header', description: 'Custom header content' },
    { name: 'overview', description: 'Custom content for the Overview tab' },
    { name: 'security', description: 'Custom content for the Security tab' },
    { name: 'storage', description: 'Custom content for the Storage tab' },
    { name: 'accounts', description: 'Container for md-account-item instances' },
    { name: 'footer', description: 'Custom footer content (e.g. Sign out action)' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when the account menu opens' },
    { name: 'close', description: 'Dispatched when the account menu closes' },
    { name: 'tab-change', description: 'Dispatched when user switches tabs (detail: { tab })' },
    { name: 'account-select', description: 'Dispatched when an account profile is chosen' },
    { name: 'manage-click', description: 'Dispatched when the Manage Account button is clicked' },
    { name: 'sign-out', description: 'Dispatched when the Sign out button is clicked' },
    { name: 'edit-avatar', description: 'Dispatched when the avatar photo camera button is clicked' }
  ],
  examples: [
    {
      title: 'Account Profile Menu',
      description: 'Account button with user avatar that reveals profile details, tabs for security and cloud storage, and multi-account switcher.',
      html: `<div style="display: flex; justify-content: flex-end; width: 100%; padding: 16px;">
  <md-account-menu
    id="demo-account-menu"
    name="Franco Fantomius"
    email="franco.fantomius@example.com"
    initials="F"
    role-title="Lead Architect"
    organization="Material Components Team"
    storage-used="10.4 GB"
    storage-total="15 GB"
    storage-progress="0.69"
  >
    <md-account-item
      slot="accounts"
      name="Franco Fantomius"
      email="franco.fantomius@example.com"
      initials="F"
      active
    ></md-account-item>
    <md-account-item
      slot="accounts"
      name="Work Workspace"
      email="franco.dev@work.corp"
      initials="W"
    ></md-account-item>
    <md-account-item
      slot="accounts"
      name="Add another account"
      icon="person_add"
      action
    ></md-account-item>
  </md-account-menu>
</div>`
    }
  ]
};

