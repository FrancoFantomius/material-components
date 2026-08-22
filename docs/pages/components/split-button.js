export default {
  id: 'split-button',
  title: 'Split Button',
  icon: 'call_split',
  tag: 'md-split-button',
  category: 'Actions',
  description: 'Split buttons combine a primary action button with a connected dropdown trigger button that opens a submenu for related contextual options.',
  subpath: '@francofantomius/material-components/split-button',
  interactiveType: 'button',
  properties: [
    { name: 'variant', type: "'filled' | 'elevated' | 'tonal' | 'outlined'", default: "'filled'", description: 'Visual emphasis style of the split button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables both action and menu trigger buttons' },
    { name: 'label', type: 'string', default: "''", description: 'Primary action button text label' },
    { name: 'icon', type: 'string', default: "''", description: 'Leading icon for the primary action button' },
    { name: 'trailing-icon', type: 'string', default: "'arrow_drop_down'", description: 'Dropdown trigger icon name' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the associated submenu dropdown is open' },
    { name: 'menu-placement', type: "'bottom-end' | 'bottom-start' | 'top-end' | 'top-start'", default: "'bottom-end'", description: 'Alignment and placement of the submenu surface' },
    { name: 'close-on-item-click', type: 'boolean', default: 'true', description: 'Whether the submenu automatically closes when an item is selected' },
    { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML form button type for the main action' },
    { name: 'action-aria-label', type: 'string', default: "''", description: 'Accessible label for the main action button' },
    { name: 'menu-aria-label', type: 'string', default: "'More options'", description: 'Accessible label for the trailing menu trigger button' }
  ],
  events: [
    { name: 'action', description: 'Dispatched when the primary action button is clicked' },
    { name: 'trailing-click', description: 'Dispatched when the trailing menu button is clicked' },
    { name: 'toggle', description: 'Dispatched when submenu open state toggles ({ open: boolean })' },
    { name: 'open', description: 'Dispatched when the submenu opens' },
    { name: 'close', description: 'Dispatched when the submenu closes' },
    { name: 'select', description: 'Dispatched when a submenu item is selected' }
  ],
  slots: [
    { name: '', description: 'Default slot for md-menu-item components in the submenu' },
    { name: 'menu', description: 'Explicit slot for custom submenu items' },
    { name: 'label', description: 'Custom action button label' },
    { name: 'icon', description: 'Custom leading icon for the action button' },
    { name: 'trailing-icon', description: 'Custom dropdown icon for the trailing button' }
  ],
  examples: [
    {
      title: 'Split Button with Submenu',
      description: 'Split button with a dropdown submenu containing secondary actions.',
      html: `<md-split-button variant="filled" label="Save" icon="save">
  <md-menu-item icon="edit" headline="Save and edit"></md-menu-item>
  <md-menu-item icon="send" headline="Save and publish"></md-menu-item>
  <md-menu-item icon="cloud_download" headline="Export as PDF"></md-menu-item>
</md-split-button>`
    },
    {
      title: 'Split Button Variants',
      description: 'Filled, elevated, tonal, and outlined split button styles.',
      html: `<div style="display: flex; flex-wrap: wrap; gap: 16px;">
  <md-split-button variant="filled" label="Save">
    <md-menu-item headline="Save draft"></md-menu-item>
    <md-menu-item headline="Save and exit"></md-menu-item>
  </md-split-button>
  <md-split-button variant="elevated" label="Send">
    <md-menu-item headline="Send now"></md-menu-item>
    <md-menu-item headline="Schedule send"></md-menu-item>
  </md-split-button>
  <md-split-button variant="tonal" label="Draft">
    <md-menu-item headline="New draft"></md-menu-item>
    <md-menu-item headline="Discard draft"></md-menu-item>
  </md-split-button>
  <md-split-button variant="outlined" label="Export">
    <md-menu-item headline="Export JSON"></md-menu-item>
    <md-menu-item headline="Export CSV"></md-menu-item>
  </md-split-button>
</div>`
    },
    {
      title: 'With Icons',
      description: 'Split buttons with leading action icons and custom dropdown indicators.',
      html: `<div style="display: flex; flex-wrap: wrap; gap: 16px;">
  <md-split-button variant="filled" icon="edit" label="Edit Document">
    <md-menu-item icon="content_copy" headline="Duplicate"></md-menu-item>
    <md-menu-item icon="delete" headline="Delete"></md-menu-item>
  </md-split-button>
  <md-split-button variant="tonal" icon="cloud_upload" label="Upload" trailing-icon="expand_more">
    <md-menu-item icon="folder" headline="Upload folder"></md-menu-item>
    <md-menu-item icon="link" headline="Import from URL"></md-menu-item>
  </md-split-button>
</div>`
    },
    {
      title: 'Disabled State',
      description: 'Split buttons in disabled state.',
      html: `<md-split-button disabled label="Action Disabled" icon="block">
  <md-menu-item headline="Option 1"></md-menu-item>
</md-split-button>`
    }
  ]
};
