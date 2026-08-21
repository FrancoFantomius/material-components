export default {
  id: 'button',
  title: 'Button',
  icon: 'smart_button',
  tag: 'md-button',
  category: 'Actions',
  description: 'Buttons help users initiate actions and choices with five distinct levels of visual emphasis: filled, elevated, tonal, outlined, and text.',
  subpath: '@francofantomius/material-components/button',
  interactiveType: 'button',
  properties: [
    { name: 'variant', type: "'filled' | 'elevated' | 'tonal' | 'outlined' | 'text'", default: "'filled'", description: 'Visual emphasis style of the button' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the button is interactive or disabled' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Displays an internal circular progress spinner and disables click' },
    { name: 'icon', type: 'string', default: "''", description: 'Leading Material Symbols icon name' },
    { name: 'trailing-icon', type: 'string', default: "''", description: 'Trailing Material Symbols icon name' },
    { name: 'type', type: "'button' | 'submit' | 'reset'", default: "'button'", description: 'HTML form button type' },
    { name: 'href', type: 'string', default: "''", description: 'When provided, renders as an accessible anchor link' },
    { name: 'target', type: 'string', default: "''", description: 'Link target attribute (e.g., _blank)' }
  ],
  examples: [
    {
      title: 'Button Variants',
      description: 'Five distinct emphasis levels for guiding user priority.',
      html: `<md-button variant="filled">Filled</md-button>
<md-button variant="elevated">Elevated</md-button>
<md-button variant="tonal">Tonal</md-button>
<md-button variant="outlined">Outlined</md-button>
<md-button variant="text">Text</md-button>`
    },
    {
      title: 'Icons and Loading State',
      description: 'Buttons with leading icons, trailing icons, and loading spinners.',
      html: `<md-button variant="filled" icon="add">Create New</md-button>
<md-button variant="outlined" trailing-icon="arrow_forward">Next Step</md-button>
<md-button variant="tonal" loading>Saving...</md-button>`
    },
    {
      title: 'Link Mode',
      description: 'Renders an accessible hyperlink while maintaining button styling.',
      html: `<md-button variant="outlined" href="https://material.io" target="_blank" trailing-icon="open_in_new">
  Material Design Docs
</md-button>`
    }
  ]
};

