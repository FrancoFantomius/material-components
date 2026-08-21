export default {
  id: 'list',
  title: 'List & List Item',
  tag: 'md-list',
  category: 'Surfaces & Containment',
  description: 'Lists are continuous, vertical indexes of text and images, supporting 1-line, 2-line, and 3-line items with icons, avatars, and trailing text.',
  subpath: '@francofantomius/material-components/list',
  interactiveType: 'list',
  properties: [],
  subComponentProperties: [
    {
      name: 'md-list-item',
      properties: [
        { name: 'headline', type: 'string', default: "''", description: 'Primary headline text' },
        { name: 'supporting-text', type: 'string', default: "''", description: 'Secondary supporting text description' },
        { name: 'trailing-supporting-text', type: 'string', default: "''", description: 'Metadata timestamp or trailing text' },
        { name: 'interactive', type: 'boolean', default: 'false', description: 'Enables ripple hover and click response' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables item' },
        { name: 'href', type: 'string', default: "''", description: 'Renders item as hyperlink' }
      ]
    }
  ],
  slots: [
    { name: 'start', description: 'Leading icon, checkbox, or avatar' },
    { name: 'end', description: 'Trailing icon, button, or switch' }
  ],
  examples: [
    {
      title: 'Interactive List with Icons',
      description: 'Multi-line list items with leading icons and trailing timestamps.',
      html: `<md-list style="width: 100%; max-width: 400px; background: var(--md-sys-color-surface-container-low); border-radius: 12px;">
  <md-list-item headline="Sarah Connor" supporting-text="Uploaded project roadmap" trailing-supporting-text="10:30 AM" interactive>
    <md-icon slot="start" name="account_circle" size="32"></md-icon>
  </md-list-item>
  <md-divider inset></md-divider>
  <md-list-item headline="Security Update" supporting-text="All packages upgraded to v2.0" trailing-supporting-text="Yesterday" interactive>
    <md-icon slot="start" name="shield" size="32"></md-icon>
  </md-list-item>
</md-list>`
    }
  ]
};

