export default {
  id: 'icon',
  title: 'Icon',
  icon: 'category',
  tag: 'md-icon',
  category: 'Utilities',
  description: 'Icons visually communicate meaning, actions, and status using Google Material Symbols variable font glyphs or custom slotted SVGs.',
  subpath: '@francofantomius/material-components/icon',
  interactiveType: 'icon',
  properties: [
    { name: 'name', type: 'string', default: "''", description: 'Material Symbols font glyph identifier' },
    { name: 'filled', type: 'boolean', default: 'false', description: 'Enables filled variation in variable font' },
    { name: 'size', type: 'string', default: "''", description: 'Custom CSS font size (e.g. 32, 2rem)' }
  ],
  examples: [
    {
      title: 'Material Symbols & Sizes',
      description: 'Outlined, filled, and custom-sized icons.',
      html: `<div style="display: flex; gap: 20px; align-items: center;">
  <md-icon name="favorite"></md-icon>
  <md-icon name="favorite" filled style="color: var(--md-sys-color-error);"></md-icon>
  <md-icon name="settings" size="32"></md-icon>
  <md-icon name="rocket_launch" size="48" style="color: var(--md-sys-color-primary);"></md-icon>
</div>`
    }
  ]
};

