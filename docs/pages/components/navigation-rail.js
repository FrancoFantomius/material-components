export default {
  id: 'navigation-rail',
  title: 'Navigation Rail',
  icon: 'vertical_split',
  tag: 'md-navigation-rail',
  category: 'Navigation',
  description: 'Navigation rails provide access to primary destinations in apps on mid-sized to large screens, featuring vertical destination strips, header/menu/fab slots, and active indicator pills.',
  subpath: '@francofantomius/material-components/navigation-rail',
  interactiveType: 'navigation-rail',
  properties: [
    { name: 'alignment', type: "'top' | 'center' | 'bottom'", default: "'top'", description: 'Vertical alignment of destination items' },
    { name: 'hide-labels', type: 'boolean', default: 'false', description: 'Hides all destination text labels' },
    { name: 'active-index', type: 'number', default: '-1', description: 'Zero-based index of the currently active destination' }
  ],
  subComponentProperties: [
    {
      name: 'md-navigation-rail-item',
      properties: [
        { name: 'icon', type: 'string', default: "''", description: 'Material Symbols destination icon' },
        { name: 'active-icon', type: 'string', default: "''", description: 'Material Symbols icon displayed when item is active' },
        { name: 'label', type: 'string', default: "''", description: 'Destination title text' },
        { name: 'badge', type: 'string', default: "''", description: 'Numeric or text badge indicator' },
        { name: 'badge-dot', type: 'boolean', default: 'false', description: 'Renders a small circular dot badge' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Highlights item with active pill indicator' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables item interactions' },
        { name: 'hide-label', type: 'boolean', default: 'false', description: 'Hides the label for this specific item' },
        { name: 'href', type: 'string', default: "''", description: 'Optional navigation hyperlink' },
        { name: 'value', type: 'string', default: "''", description: 'Custom value associated with destination' }
      ]
    }
  ],
  events: [
    { name: 'change', description: 'Dispatched when active destination changes in the rail' },
    { name: 'item-click', description: 'Dispatched when an individual rail destination is clicked' }
  ],
  examples: [
    {
      title: 'Standard Navigation Rail',
      description: 'Vertical rail with menu icon button, Floating Action Button (FAB), active indicator pills, badges, and top alignment.',
      html: `<div style="display: flex; height: 420px; border: 1px solid var(--md-sys-color-outline-variant); border-radius: 12px; overflow: hidden;">
  <md-navigation-rail alignment="top">
    <md-icon-button slot="menu" icon="menu" aria-label="Open navigation menu"></md-icon-button>
    <md-fab slot="fab" size="small" icon="edit" aria-label="Compose"></md-fab>

    <md-navigation-rail-item icon="inbox" label="Inbox" badge="3" active></md-navigation-rail-item>
    <md-navigation-rail-item icon="star" label="Starred"></md-navigation-rail-item>
    <md-navigation-rail-item icon="send" label="Sent"></md-navigation-rail-item>
    <md-navigation-rail-item icon="chat" label="Chat" badge-dot></md-navigation-rail-item>

    <div slot="footer">
      <md-icon-button icon="settings" aria-label="Settings"></md-icon-button>
    </div>
  </md-navigation-rail>

  <div style="flex: 1; padding: 24px; background: var(--md-sys-color-surface-container-low);">
    <h3 style="margin-top: 0;">Main View Content</h3>
    <p>Select a destination in the navigation rail on the left.</p>
  </div>
</div>`
    },
    {
      title: 'Center Aligned Rail',
      description: 'Rail with center-aligned destinations and label suppression.',
      html: `<div style="display: flex; height: 360px; border: 1px solid var(--md-sys-color-outline-variant); border-radius: 12px; overflow: hidden;">
  <md-navigation-rail alignment="center" hide-labels>
    <md-navigation-rail-item icon="home" label="Home" active></md-navigation-rail-item>
    <md-navigation-rail-item icon="search" label="Search"></md-navigation-rail-item>
    <md-navigation-rail-item icon="folder" label="Library"></md-navigation-rail-item>
  </md-navigation-rail>

  <div style="flex: 1; padding: 24px; background: var(--md-sys-color-surface-container-low);">
    <p>Center aligned destinations with hidden labels for compact icon-only view.</p>
  </div>
</div>`
    }
  ]
};
