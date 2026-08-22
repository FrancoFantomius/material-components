export default {
  id: 'segmented-button',
  title: 'Segmented Button',
  icon: 'view_week',
  tag: 'md-segmented-button-set',
  category: 'Actions',
  description: 'Segmented buttons help users select options, switch views, or sort elements in compact single-select or multi-select groups.',
  subpath: '@francofantomius/material-components/segmented-button',
  interactiveType: 'button',
  properties: [
    { name: 'multiselect', type: 'boolean', default: 'false', description: 'Enables multi-selection mode across segments' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all segmented buttons in the set' },
    { name: 'selected', type: 'boolean', default: 'false', description: 'Whether an individual segmented button is selected' },
    { name: 'value', type: 'string', default: "''", description: 'Value representing the button in form/change events' },
    { name: 'label', type: 'string', default: "''", description: 'Label text of the segmented button' },
    { name: 'icon', type: 'string', default: "''", description: 'Leading icon name' },
    { name: 'no-checkmark', type: 'boolean', default: 'false', description: 'Disables automatic checkmark icon when selected' }
  ],
  examples: [
    {
      title: 'Single-Select Segmented Button',
      description: 'Single-select mode where choosing one option deselects others (matching the downloads view selector).',
      html: `<md-segmented-button-set>
  <md-segmented-button selected label="Songs"></md-segmented-button>
  <md-segmented-button label="Albums"></md-segmented-button>
  <md-segmented-button label="Podcasts"></md-segmented-button>
</md-segmented-button-set>`
    },
    {
      title: 'With Custom Icons',
      description: 'Segmented buttons with leading icons for visual cues.',
      html: `<md-segmented-button-set>
  <md-segmented-button icon="format_align_left" label="Left" selected></md-segmented-button>
  <md-segmented-button icon="format_align_center" label="Center"></md-segmented-button>
  <md-segmented-button icon="format_align_right" label="Right"></md-segmented-button>
</md-segmented-button-set>`
    },
    {
      title: 'Multi-Select Mode',
      description: 'Allows toggling multiple independent options simultaneously.',
      html: `<md-segmented-button-set multiselect>
  <md-segmented-button label="Bold" selected></md-segmented-button>
  <md-segmented-button label="Italic" selected></md-segmented-button>
  <md-segmented-button label="Underline"></md-segmented-button>
</md-segmented-button-set>`
    }
  ]
};

