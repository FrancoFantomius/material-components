export default {
  id: 'fab',
  title: 'Floating Action Button (FAB)',
  icon: 'add_circle',
  tag: 'md-fab',
  category: 'Actions',
  description: 'A Floating Action Button (FAB) performs the primary, most common action on a screen. Supports small, medium, large, and extended modes.',
  subpath: '@francofantomius/material-components/fab',
  interactiveType: 'fab',
  properties: [
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Container dimension' },
    { name: 'icon', type: 'string', default: "''", description: 'Material Symbols icon name' },
    { name: 'label', type: 'string', default: "''", description: 'Extended text label (renders extended FAB)' },
    { name: 'lowered', type: 'boolean', default: 'false', description: 'Applies lower elevation level 1 instead of level 3' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables button interaction' }
  ],
  examples: [
    {
      title: 'FAB Sizes & Extended',
      description: 'Small, standard medium, large, and extended FABs with text labels.',
      html: `<md-fab size="small" icon="edit" aria-label="Edit"></md-fab>
<md-fab icon="add" label="New Message"></md-fab>
<md-fab size="large" icon="palette" aria-label="Palette"></md-fab>
<md-fab icon="download" lowered aria-label="Download"></md-fab>`
    }
  ]
};

