export default {
  id: 'top-app-bar',
  title: 'Top App Bar',
  icon: 'view_headline',
  tag: 'md-top-app-bar',
  category: 'Navigation',
  description: 'Top app bars display branding, titles, navigation controls, and actions at the top of a screen across small, center-aligned, medium, and large variants.',
  subpath: '@francofantomius/material-components/top-app-bar',
  interactiveType: 'top-app-bar',
  properties: [
    { name: 'variant', type: "'center-aligned' | 'small' | 'medium' | 'large'", default: "'center-aligned'", description: 'Layout format of the top bar' },
    { name: 'headline', type: 'string', default: "''", description: 'Main title headline' },
    { name: 'subtitle', type: 'string', default: "''", description: 'Secondary supporting text' },
    { name: 'elevated', type: 'boolean', default: 'false', description: 'Applies elevation shadow and surface container color' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Pins the app bar to the top of the viewport (sticky)' }
  ],
  slots: [
    { name: 'navigation', description: 'Leading icon button (e.g. Hamburger menu or back arrow)' },
    { name: 'actions', description: 'Trailing action buttons and overflow menu triggers' }
  ],
  examples: [
    {
      title: 'Top App Bar Layouts',
      description: 'Center-aligned and small top app bars.',
      html: `<div style="border: 1px solid var(--md-sys-color-outline-variant); border-radius: 12px; overflow: hidden; margin-bottom: 16px;">
  <md-top-app-bar variant="small" headline="Inbox" subtitle="3 unread messages">
    <md-icon-button slot="navigation" icon="menu" aria-label="Menu"></md-icon-button>
    <md-icon-button slot="actions" icon="search" aria-label="Search"></md-icon-button>
    <md-icon-button slot="actions" icon="more_vert" aria-label="More"></md-icon-button>
  </md-top-app-bar>
</div>

<div style="border: 1px solid var(--md-sys-color-outline-variant); border-radius: 12px; overflow: hidden;">
  <md-top-app-bar variant="center-aligned" headline="Settings" elevated>
    <md-icon-button slot="navigation" icon="arrow_back" aria-label="Back"></md-icon-button>
    <md-icon-button slot="actions" icon="help" aria-label="Help"></md-icon-button>
  </md-top-app-bar>
</div>`
    }
  ]
};

