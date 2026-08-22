export default {
  id: 'toolbar',
  title: 'Toolbar',
  icon: 'build',
  tag: 'md-toolbar',
  category: 'Actions',
  description: 'Toolbars provide quick access to common actions, tools, and controls in floating island or docked layouts according to Material Design 3 Expressive guidelines.',
  subpath: '@francofantomius/material-components/toolbar',
  interactiveType: 'toolbar',
  properties: [
    { name: 'mode', type: "'floating' | 'docked'", default: "'floating'", description: 'Layout mode: floating island pill or docked edge-to-edge container' },
    { name: 'docked', type: 'boolean', default: 'false', description: 'Shorthand boolean to enable docked mode' },
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Orientation layout of controls: horizontal or vertical' },
    { name: 'elevated', type: 'boolean', default: 'false', description: 'Increases elevation level / shadow depth' },
    { name: 'fixed', type: 'boolean', default: 'false', description: 'Pins toolbar position relative to viewport' },
    { name: 'dock-position', type: "'none' | 'top' | 'bottom' | 'left' | 'right'", default: "'none'", description: 'When docked and fixed, specifies the pinned viewport edge' },
    { name: 'aria-label', type: 'string', default: "''", description: 'Accessible label for screen readers' }
  ],
  examples: [
    {
      title: 'Floating Action Toolbar',
      description: 'Standard M3 Expressive floating action toolbar containing icon buttons, dividers, and actions.',
      html: `<md-toolbar aria-label="Editor Toolbar">
  <md-icon-button icon="format_bold" aria-label="Bold"></md-icon-button>
  <md-icon-button icon="format_italic" aria-label="Italic"></md-icon-button>
  <md-icon-button icon="format_underlined" aria-label="Underline"></md-icon-button>
  <md-divider vertical></md-divider>
  <md-icon-button icon="format_align_left" aria-label="Align left"></md-icon-button>
  <md-icon-button icon="format_align_center" aria-label="Align center"></md-icon-button>
  <md-icon-button icon="format_align_right" aria-label="Align right"></md-icon-button>
</md-toolbar>`
    },
    {
      title: 'Toolbar with Floating Action Button (FAB)',
      description: 'Expressive toolbar integrating tools and a slotted Primary Action / FAB button.',
      html: `<md-toolbar aria-label="Canvas Toolbar">
  <md-icon-button icon="undo" aria-label="Undo"></md-icon-button>
  <md-icon-button icon="redo" aria-label="Redo"></md-icon-button>
  <md-divider vertical></md-divider>
  <md-icon-button icon="palette" aria-label="Colors"></md-icon-button>
  <md-icon-button icon="brush" aria-label="Brush"></md-icon-button>
  <md-fab slot="fab" size="small" icon="add" aria-label="Add Element"></md-fab>
</md-toolbar>`
    },
    {
      title: 'Vertical Toolbar',
      description: 'Vertical orientation suitable for side toolboxes or painting palettes.',
      html: `<md-toolbar orientation="vertical" aria-label="Vertical Tools">
  <md-icon-button icon="pan_tool" aria-label="Pan"></md-icon-button>
  <md-icon-button icon="edit" aria-label="Edit"></md-icon-button>
  <md-icon-button icon="colorize" aria-label="Color Picker"></md-icon-button>
  <md-divider></md-divider>
  <md-icon-button icon="delete" aria-label="Delete"></md-icon-button>
</md-toolbar>`
    },
    {
      title: 'Docked Bottom Toolbar',
      description: 'Docked edge-to-edge toolbar with background containment and action groups.',
      html: `<md-toolbar mode="docked" aria-label="Document Actions">
  <div slot="leading">
    <md-icon-button icon="attach_file" aria-label="Attach File"></md-icon-button>
    <md-icon-button icon="image" aria-label="Insert Image"></md-icon-button>
  </div>
  <div slot="trailing">
    <md-button variant="outlined" label="Save Draft"></md-button>
    <md-button variant="filled" label="Publish"></md-button>
  </div>
</md-toolbar>`
    }
  ]
};
