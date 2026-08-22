export default {
  id: 'menu',
  title: 'Menu',
  icon: 'menu_open',
  tag: 'md-menu',
  category: 'Surfaces & Containment',
  description: 'Menus display a list of choices on temporary surfaces when users interact with a trigger or contextual control.',
  subpath: '@francofantomius/material-components/menu',
  interactiveType: 'menu',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Whether the menu is visible and expanded' },
    { name: 'anchor', type: 'string | HTMLElement | null', default: 'null', description: 'Anchor element ID or element reference to align the menu against' },
    { name: 'positioning', type: "'absolute' | 'fixed'", default: "'absolute'", description: 'Positioning strategy relative to trigger or viewport' },
    { name: 'placement', type: "'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'", default: "'bottom-start'", description: 'Anchor edge placement for the menu surface' },
    { name: 'alignment', type: "'start' | 'end' | 'center'", default: "'start'", description: 'Alignment of the menu relative to the anchor' },
    { name: 'x-offset', type: 'number', default: '0', description: 'Horizontal pixel offset from the anchor' },
    { name: 'y-offset', type: 'number', default: '4', description: 'Vertical pixel offset from the anchor' },
    { name: 'quick', type: 'boolean', default: 'false', description: 'Disables open/close transition animations' },
    { name: 'dense', type: 'boolean', default: 'false', description: 'Applies compact vertical spacing and smaller icon sizing' },
    { name: 'stay-open-on-focusout', type: 'boolean', default: 'false', description: 'Prevents menu from closing when focus leaves the surface' }
  ],
  slots: [
    { name: 'trigger', description: 'Trigger button or icon-button activating the menu' },
    { name: '(default)', description: 'Container for md-menu-item elements or dividers' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when the menu opens' },
    { name: 'close', description: 'Dispatched when the menu closes' },
    { name: 'select', detail: '{ item: MdMenuItem, value: string }', description: 'Dispatched when a menu item is clicked and selected' }
  ],
  examples: [
    {
      title: 'Basic Action Menu',
      description: 'Standard menu attached to a trigger button with leading icons and keyboard shortcuts.',
      html: `<md-menu>
  <md-button slot="trigger" variant="filled" icon="menu">Options</md-button>
  <md-menu-item icon="content_cut" headline="Cut" trailing-supporting-text="⌘X" value="cut"></md-menu-item>
  <md-menu-item icon="content_copy" headline="Copy" trailing-supporting-text="⌘C" value="copy"></md-menu-item>
  <md-menu-item icon="content_paste" headline="Paste" trailing-supporting-text="⌘V" value="paste"></md-menu-item>
  <md-divider></md-divider>
  <md-menu-item icon="delete" headline="Delete" trailing-supporting-text="⌫" value="delete"></md-menu-item>
</md-menu>`
    },
    {
      title: 'Menu with Selection & Supporting Text',
      description: 'Menu items with supporting subtext, selection checkmarks, and disabled states.',
      html: `<md-menu>
  <md-icon-button slot="trigger" icon="more_vert" aria-label="More options"></md-icon-button>
  <md-menu-item headline="Single view" supporting-text="Standard layout" selected value="single"></md-menu-item>
  <md-menu-item headline="Grid view" supporting-text="Compact card layout" value="grid"></md-menu-item>
  <md-menu-item headline="Table view" supporting-text="Detailed table row layout" disabled value="table"></md-menu-item>
</md-menu>`
    },
    {
      title: 'Dense Menu',
      description: 'Compact density menu suitable for desktop toolbars and contextual popups.',
      html: `<md-menu dense>
  <md-button slot="trigger" variant="outlined" trailing-icon="arrow_drop_down">Sort By</md-button>
  <md-menu-item icon="schedule" headline="Recent first" value="recent"></md-menu-item>
  <md-menu-item icon="sort_by_alpha" headline="Alphabetical" value="alphabetical"></md-menu-item>
  <md-menu-item icon="star" headline="Highest rated" value="rating"></md-menu-item>
</md-menu>`
    }
  ]
};
