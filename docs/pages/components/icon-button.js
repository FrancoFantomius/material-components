export default {
  id: 'icon-button',
  title: 'Icon Button',
  icon: 'touch_app',
  tag: 'md-icon-button',
  category: 'Actions',
  description: 'Icon buttons allow users to take compact actions and toggle choices with a single tap, supporting standard, filled, tonal, and outlined variants.',
  subpath: '@francofantomius/material-components/icon-button',
  interactiveType: 'icon-button',
  properties: [
    { name: 'variant', type: "'standard' | 'filled' | 'tonal' | 'outlined'", default: "'standard'", description: 'Visual style container' },
    { name: 'icon', type: 'string', default: "''", description: 'Material Symbols icon name' },
    { name: 'selected-icon', type: 'string', default: "''", description: 'Icon displayed when toggle button is active' },
    { name: 'toggle', type: 'boolean', default: 'false', description: 'Enables two-state toggle behavior' },
    { name: 'selected', type: 'boolean', default: 'false', description: 'Active selection state for toggle buttons' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables button interactions' },
    { name: 'href', type: 'string', default: "''", description: 'Renders as hyperlink when present' }
  ],
  examples: [
    {
      title: 'Variants',
      description: 'Standard, filled, tonal, and outlined icon buttons.',
      html: `<md-icon-button icon="favorite" variant="standard" aria-label="Favorite"></md-icon-button>
<md-icon-button icon="star" variant="filled" aria-label="Bookmark"></md-icon-button>
<md-icon-button icon="settings" variant="tonal" aria-label="Settings"></md-icon-button>
<md-icon-button icon="share" variant="outlined" aria-label="Share"></md-icon-button>`
    },
    {
      title: 'Toggle Icon Buttons',
      description: 'Switch between active and inactive states with morphing icons.',
      html: `<md-icon-button toggle icon="bookmark_border" selected-icon="bookmark" aria-label="Bookmark"></md-icon-button>
<md-icon-button toggle variant="tonal" icon="notifications_none" selected-icon="notifications" aria-label="Alerts"></md-icon-button>`
    }
  ]
};

