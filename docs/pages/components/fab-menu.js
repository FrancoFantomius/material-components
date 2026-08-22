export default {
  id: 'fab-menu',
  title: 'FAB Menu',
  icon: 'menu_open',
  tag: 'md-fab-menu',
  category: 'Actions',
  description: 'A Floating Action Button Menu (FAB Menu / Speed Dial) expands a primary FAB into a stack of contextual sub-actions with text labels, animated transitions, and optional modal scrim overlay.',
  subpath: '@francofantomius/material-components/fab-menu',
  interactiveType: 'fab',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the menu stack is open' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Displays a scrim backdrop overlay behind the open menu' },
    { name: 'direction', type: "'up' | 'down' | 'left' | 'right'", default: "'up'", description: 'Direction the sub-action stack expands' },
    { name: 'icon', type: 'string', default: "'add'", description: 'Material Symbols icon for the trigger FAB' },
    { name: 'open-icon', type: 'string', default: "''", description: 'Optional distinct icon shown when opened (defaults to 45° rotation)' },
    { name: 'label', type: 'string', default: "''", description: 'Extended text label for the trigger FAB' },
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Trigger FAB button size' },
    { name: 'lowered', type: 'boolean', default: 'false', description: 'Applies lower elevation level 1 instead of level 3' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables menu trigger and interactions' },
    { name: 'close-on-item-click', type: 'boolean', default: 'true', description: 'Automatically closes menu when a sub-item is clicked' }
  ],
  examples: [
    {
      title: 'Standard FAB Menu',
      description: 'Default vertical upward expansion with labeled sub-actions.',
      html: `<md-fab-menu icon="add">
  <md-fab-menu-item icon="edit" label="Create Post" value="post"></md-fab-menu-item>
  <md-fab-menu-item icon="photo_camera" label="Upload Photo" value="photo"></md-fab-menu-item>
  <md-fab-menu-item icon="videocam" label="Go Live" value="live"></md-fab-menu-item>
</md-fab-menu>`
    },
    {
      title: 'Modal Mode with Scrim',
      description: 'Modal FAB menu dimming the background with a scrim overlay.',
      html: `<md-fab-menu modal icon="add">
  <md-fab-menu-item icon="mail" label="New Message" value="email"></md-fab-menu-item>
  <md-fab-menu-item icon="event" label="Schedule Event" value="event"></md-fab-menu-item>
  <md-fab-menu-item icon="alarm" label="Set Reminder" value="reminder"></md-fab-menu-item>
</md-fab-menu>`
    },
    {
      title: 'Extended FAB Trigger',
      description: 'Extended FAB trigger with text label expanding to sub-actions.',
      html: `<md-fab-menu icon="add" label="New Action">
  <md-fab-menu-item icon="description" label="Document" value="doc"></md-fab-menu-item>
  <md-fab-menu-item icon="folder" label="Folder" value="folder"></md-fab-menu-item>
  <md-fab-menu-item icon="cloud_upload" label="File Upload" value="upload"></md-fab-menu-item>
</md-fab-menu>`
    },
    {
      title: 'Horizontal Directions',
      description: 'FAB menu expanding to the right or left.',
      html: `<div style="display: flex; gap: 48px; align-items: center;">
  <md-fab-menu direction="right" icon="share">
    <md-fab-menu-item icon="link" label="Copy Link"></md-fab-menu-item>
    <md-fab-menu-item icon="chat" label="Message"></md-fab-menu-item>
    <md-fab-menu-item icon="mail" label="Email"></md-fab-menu-item>
  </md-fab-menu>
</div>`
    }
  ]
};
