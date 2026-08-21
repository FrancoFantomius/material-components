export default {
  id: 'app-drawer',
  title: 'App Drawer',
  icon: 'apps',
  tag: 'md-app-drawer',
  category: 'Navigation',
  description: 'App drawers provide a popover grid menu of applications, shortcuts, and services, typically positioned next to the account avatar or in top app bars.',
  subpath: '@francofantomius/material-components/app-drawer',
  interactiveType: 'app-drawer',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Controls whether the app drawer popover is open' },
    { name: 'headline', type: 'string', default: "''", description: 'Optional header title displayed at the top of the drawer' },
    { name: 'icon', type: 'string', default: "'apps'", description: 'Material icon name for the default trigger button' },
    { name: 'aria-label', type: 'string', default: "'App launcher'", description: 'Accessible label for the trigger button and popover' },
    { name: 'trigger', type: 'boolean', default: 'true', description: 'Whether to render the built-in trigger icon button' },
    { name: 'alignment', type: "'start' | 'end'", default: "'end'", description: 'Horizontal alignment of the popover relative to the trigger' },
    { name: 'pivot', type: "'left' | 'right'", default: "'right'", description: 'Anchor pivot edge' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Shows a dimming modal backdrop when open' },
    { name: 'fullscreen', type: 'boolean', default: 'false', description: 'Forces full-screen display (automatic on mobile viewports)' },
    { name: 'columns', type: 'number', default: '3', description: 'Number of columns in the app grid' },
    { name: 'reorderable', type: 'boolean', default: 'true', description: 'Enables drag-and-drop and keyboard reordering of apps' },
    { name: 'editable', type: 'boolean', default: 'true', description: 'Shows an edit icon button on the top-right corner to toggle reordering' },
    { name: 'editing', type: 'boolean', default: 'false', description: 'Controls whether the app drawer is currently in reordering / editing mode' },
    { name: 'storage-key', type: 'string', default: "''", description: 'Custom localStorage key for persisting app order' },
    { name: 'disable-storage', type: 'boolean', default: 'false', description: 'Disables automatic saving and loading of app order' }
  ],
  subComponentProperties: [
    {
      name: 'md-app-drawer-item',
      properties: [
        { name: 'label', type: 'string', default: "''", description: 'Primary label for the app' },
        { name: 'headline', type: 'string', default: "''", description: 'Alias for label' },
        { name: 'icon', type: 'string', default: "''", description: 'Material Symbols icon name' },
        { name: 'src', type: 'string', default: "''", description: 'Optional image or logo URL' },
        { name: 'badge', type: 'string', default: "''", description: 'Optional counter or notification badge' },
        { name: 'href', type: 'string', default: "''", description: 'Navigation URL' },
        { name: 'target', type: 'string', default: "''", description: 'Link target attribute' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Active / highlighted state' }
      ]
    }
  ],
  slots: [
    { name: 'trigger', description: 'Custom trigger element replacing the default icon button' },
    { name: 'back-button', description: 'Custom back/close button element for full-screen / mobile view' },
    { name: 'header', description: 'Header content above the app grid' },
    { name: 'edit-button', description: 'Custom edit button replacing the default header reorder toggle button' },
    { name: 'reset-button', description: 'Custom reset/back button replacing the default button to restore default order' },
    { name: '(default)', description: 'Container for md-app-drawer-item elements' },
    { name: 'footer', description: 'Footer content below the app grid (e.g. More apps action)' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when the app drawer opens' },
    { name: 'close', description: 'Dispatched when the app drawer closes' },
    { name: 'item-click', description: 'Dispatched when an app item is selected' },
    { name: 'reorder', description: 'Dispatched when apps are reordered with new order and item metadata' },
    { name: 'reset', description: 'Dispatched when app order is reset to the original default layout' },
    { name: 'edit-toggle', description: 'Dispatched when reordering edit mode is toggled on or off' }
  ],
  examples: [
    {
      title: 'Standard App Launcher Menu',
      description: 'Nine-dot application launcher grid with icons, badges, and navigation links.',
      html: `<div style="display: flex; justify-content: flex-end; width: 100%; padding: 16px;">
  <md-app-drawer id="demo-app-drawer" headline="Apps">
    <md-app-drawer-item icon="mail" label="Mail" badge="5"></md-app-drawer-item>
    <md-app-drawer-item icon="calendar_today" label="Calendar"></md-app-drawer-item>
    <md-app-drawer-item icon="folder" label="Drive"></md-app-drawer-item>
    <md-app-drawer-item icon="chat" label="Chat"></md-app-drawer-item>
    <md-app-drawer-item icon="videocam" label="Meet"></md-app-drawer-item>
    <md-app-drawer-item icon="contacts" label="Contacts"></md-app-drawer-item>
    <md-app-drawer-item icon="map" label="Maps"></md-app-drawer-item>
    <md-app-drawer-item icon="photo" label="Photos"></md-app-drawer-item>
    <md-app-drawer-item icon="settings" label="Settings"></md-app-drawer-item>
    <div slot="footer" style="padding: 4px 0; width: 100%; display: flex; justify-content: center;">
      <md-button variant="outlined">More apps</md-button>
    </div>
  </md-app-drawer>
</div>`
    }
  ]
};
