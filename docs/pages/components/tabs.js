export default {
  id: 'tabs',
  title: 'Tabs',
  tag: 'md-tabs',
  category: 'Navigation',
  description: 'Tabs organize content across different screens, data sets, and other interactions with smooth sliding active indicator bars.',
  subpath: '@francofantomius/material-components/tabs',
  interactiveType: 'tabs',
  properties: [
    { name: 'active-index', type: 'number', default: '0', description: '0-based index of the currently active tab' }
  ],
  subComponentProperties: [
    {
      name: 'md-tab',
      properties: [
        { name: 'label', type: 'string', default: "''", description: 'Tab text title' },
        { name: 'icon', type: 'string', default: "''", description: 'Material Symbols icon' },
        { name: 'active', type: 'boolean', default: 'false', description: 'Active selection state' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables tab selection' }
      ]
    }
  ],
  events: [
    { name: 'change', detail: '{ activeIndex: number }', description: 'Fired when the active tab selection changes' }
  ],
  examples: [
    {
      title: 'Tabs with Icons and Labels',
      description: 'Interactive tab bar with icon and label destinations.',
      html: `<md-tabs active-index="0" id="demo-tab-bar">
  <md-tab icon="home" label="Home"></md-tab>
  <md-tab icon="explore" label="Explore"></md-tab>
  <md-tab icon="person" label="Profile"></md-tab>
  <md-tab icon="settings" label="Settings"></md-tab>
</md-tabs>`
    }
  ]
};

