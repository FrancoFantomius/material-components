export default {
  id: 'navigation-drawer',
  title: 'Navigation Drawer',
  tag: 'md-navigation-drawer',
  category: 'Navigation',
  description: 'Navigation drawers provide side navigation access to top-level destinations and app features in standard or modal configurations.',
  subpath: '@francofantomius/material-components/navigation-drawer',
  interactiveType: 'navigation-drawer',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Reflects open/closed state' },
    { name: 'type', type: "'modal' | 'standard' | 'responsive'", default: "'modal'", description: 'Drawer presentation mode' },
    { name: 'responsive', type: 'boolean', default: 'false', description: 'Enables responsive behavior (docked on desktop >960px, modal on mobile)' },
    { name: 'pivot', type: "'left' | 'right'", default: "'left'", description: 'Anchoring screen edge' },
    { name: 'headline', type: 'string', default: "''", description: 'Drawer title header' }
  ],
  subComponentProperties: [
    {
      name: 'md-navigation-drawer-item',
      properties: [
        { name: 'icon', type: 'string', default: "''", description: 'Material Symbols destination icon' },
        { name: 'label', type: 'string', default: "''", description: 'Destination title' },
        { name: 'badge', type: 'string', default: "''", description: 'Trailing counter or status badge' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Highlights item with active pill indicator' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables item' },
        { name: 'href', type: 'string', default: "''", description: 'Optional navigation link' }
      ]
    }
  ],
  events: [
    { name: 'open', description: 'Dispatched when drawer opens' },
    { name: 'close', description: 'Dispatched when drawer closes' },
    { name: 'item-click', description: 'Dispatched when a drawer item is selected' }
  ],
  examples: [
    {
      title: 'Drawer Destinations',
      description: 'Navigation drawer with header, items with badges, and footer slot.',
      html: `<md-button variant="filled" id="open-demo-drawer-btn">Toggle Navigation Drawer</md-button>

<md-navigation-drawer id="demo-doc-drawer" headline="Mail Destinations">
  <md-navigation-drawer-item icon="inbox" label="Inbox" badge="12" active></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="star" label="Starred"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="send" label="Sent"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="drafts" label="Drafts" badge="2"></md-navigation-drawer-item>
  <div slot="footer">
    <md-navigation-drawer-item icon="settings" label="Settings"></md-navigation-drawer-item>
  </div>
</md-navigation-drawer>`
    }
  ]
};

