export default {
  id: 'navigation-bar',
  title: 'Navigation Bar',
  icon: 'dock',
  tag: 'md-navigation-bar',
  category: 'Navigation',
  description: 'Navigation bars provide access to 3 to 5 top-level destinations at the bottom of the screen, featuring active indicator pills, icon badges, and customizable label visibility modes.',
  subpath: '@francofantomius/material-components/navigation-bar',
  interactiveType: 'navigation-bar',
  properties: [
    { name: 'active-index', type: 'number', default: '0', description: 'Zero-based index of the active destination' },
    { name: 'value', type: 'string', default: "''", description: 'Value of the currently active destination' },
    { name: 'label-mode', type: "'alwaysShow' | 'selectedShow' | 'hidden'", default: "'alwaysShow'", description: 'Controls label visibility behavior across items' },
    { name: 'hide-inactive-labels', type: 'boolean', default: 'false', description: 'Hides text labels on inactive items (selectedShow behavior)' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction on all destination items' }
  ],
  subComponentProperties: [
    {
      name: 'md-navigation-bar-item',
      properties: [
        { name: 'icon', type: 'string', default: "''", description: 'Material Symbols destination icon' },
        { name: 'active-icon', type: 'string', default: "''", description: 'Optional icon shown when the item is active' },
        { name: 'label', type: 'string', default: "''", description: 'Destination title text' },
        { name: 'badge', type: 'string', default: "''", description: 'Numeric, text, or "dot" badge indicator' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Highlights item with active indicator pill' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables item interactions' },
        { name: 'value', type: 'string', default: "''", description: 'Value identifier associated with destination' },
        { name: 'href', type: 'string', default: "''", description: 'Optional navigation hyperlink' },
        { name: 'label-mode', type: "'alwaysShow' | 'selectedShow' | 'hidden'", default: "'alwaysShow'", description: 'Per-item label visibility mode' }
      ]
    }
  ],
  events: [
    { name: 'change', detail: '{ activeIndex, selectedIndex, index, value, item }', description: 'Dispatched when active destination changes' },
    { name: 'item-click', detail: '{ item, value, label, active }', description: 'Dispatched when an individual item is clicked' }
  ],
  examples: [
    {
      title: 'Standard Navigation Bar (3-5 Destinations)',
      description: 'M3 Navigation Bar with active indicator pills, icons, badges, and text labels.',
      html: `<md-navigation-bar active-index="0" id="demo-nav-bar">
  <md-navigation-bar-item icon="home" label="Home" value="home"></md-navigation-bar-item>
  <md-navigation-bar-item icon="search" label="Search" value="search"></md-navigation-bar-item>
  <md-navigation-bar-item icon="mail" label="Mail" badge="12" value="mail"></md-navigation-bar-item>
  <md-navigation-bar-item icon="chat" label="Chat" badge="dot" value="chat"></md-navigation-bar-item>
  <md-navigation-bar-item icon="person" label="Profile" value="profile"></md-navigation-bar-item>
</md-navigation-bar>`
    },
    {
      title: 'Label Visibility Modes',
      description: 'Navigation bar displaying labels only for the currently active/selected destination.',
      html: `<md-navigation-bar label-mode="selectedShow" active-index="1">
  <md-navigation-bar-item icon="explore" label="Explore"></md-navigation-bar-item>
  <md-navigation-bar-item icon="favorite" label="Favorites"></md-navigation-bar-item>
  <md-navigation-bar-item icon="bookmark" label="Saved"></md-navigation-bar-item>
  <md-navigation-bar-item icon="settings" label="Settings"></md-navigation-bar-item>
</md-navigation-bar>`
    },
    {
      title: 'Active Icons & Badges',
      description: 'Items switching between outlined and filled active icons with badge count notifications.',
      html: `<md-navigation-bar active-index="0">
  <md-navigation-bar-item icon="star_outline" active-icon="star" label="Starred" badge="3"></md-navigation-bar-item>
  <md-navigation-bar-item icon="notifications_none" active-icon="notifications" label="Alerts" badge="99+"></md-navigation-bar-item>
  <md-navigation-bar-item icon="inbox" active-icon="move_to_inbox" label="Inbox"></md-navigation-bar-item>
</md-navigation-bar>`
    }
  ]
};
