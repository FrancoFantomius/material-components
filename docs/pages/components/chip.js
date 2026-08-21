export default {
  id: 'chip',
  title: 'Chip & Chip Set',
  icon: 'label',
  tag: 'md-chip',
  category: 'Inputs & Controls',
  description: 'Chips help users enter information, make selections, filter content, or trigger actions across assist, filter, input, and suggestion variants.',
  subpath: '@francofantomius/material-components/chip',
  interactiveType: 'chip',
  properties: [
    { name: 'variant', type: "'assist' | 'filter' | 'input' | 'suggestion'", default: "'assist'", description: 'Chip visual and interaction style' },
    { name: 'label', type: 'string', default: "''", description: 'Chip text content' },
    { name: 'icon', type: 'string', default: "''", description: 'Material Symbols leading icon' },
    { name: 'selected', type: 'boolean', default: 'false', description: 'Selected state for filter chips' },
    { name: 'removable', type: 'boolean', default: 'false', description: 'Shows trailing remove button for input chips' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables chip interactions' }
  ],
  examples: [
    {
      title: 'Chip Set with All Variants',
      description: 'Assist, filter, input, and suggestion chips in a responsive chip set.',
      html: `<md-chip-set>
  <md-chip variant="assist" icon="event" label="Add to Calendar"></md-chip>
  <md-chip variant="filter" selected label="Material 3"></md-chip>
  <md-chip variant="input" label="Removable Tag" removable></md-chip>
  <md-chip variant="suggestion" label="Suggested Query"></md-chip>
</md-chip-set>`
    }
  ]
};

