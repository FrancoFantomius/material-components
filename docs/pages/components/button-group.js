export default {
  id: 'button-group',
  title: 'Button Group',
  icon: 'view_week',
  tag: 'md-button-group',
  category: 'Actions',
  description: 'Button groups organize related action buttons into cohesive sets with standard or connected shape-shifting layouts according to Material Design 3 specifications.',
  subpath: '@francofantomius/material-components/button-group',
  interactiveType: 'button',
  properties: [
    { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Layout orientation of the button group' },
    { name: 'connected', type: 'boolean', default: 'false', description: 'Connects adjacent buttons with seamless shared borders and shape-shifting corner radii' },
    { name: 'shape', type: "'pill' | 'rounded' | 'square'", default: "'pill'", description: 'Corner shape morphing style when connected' },
    { name: 'variant', type: "'filled' | 'elevated' | 'tonal' | 'outlined' | 'text'", default: "''", description: 'Cascades a visual emphasis style to child buttons' },
    { name: 'full-width', type: 'boolean', default: 'false', description: 'Stretches child buttons evenly to fill available container width' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables all child buttons in the group' }
  ],
  examples: [
    {
      title: 'Standard Button Group',
      description: 'Groups multiple action buttons with standard spacing.',
      html: `<md-button-group>
  <md-button variant="outlined" icon="edit">Edit</md-button>
  <md-button variant="outlined" icon="content_copy">Copy</md-button>
  <md-button variant="filled" icon="share">Share</md-button>
</md-button-group>`
    },
    {
      title: 'Connected Shape-Shifting Group',
      description: 'Adjacent buttons connect seamlessly with outer pill curves and inner adaptive corner radii.',
      html: `<md-button-group connected variant="outlined">
  <md-button icon="format_align_left">Left</md-button>
  <md-button icon="format_align_center">Center</md-button>
  <md-button icon="format_align_right">Right</md-button>
</md-button-group>`
    },
    {
      title: 'Vertical Connected Group',
      description: 'Arranges connected shape-shifting buttons in a vertical stack.',
      html: `<md-button-group connected orientation="vertical" variant="outlined">
  <md-button icon="zoom_in">Zoom In</md-button>
  <md-button icon="zoom_out">Zoom Out</md-button>
  <md-button icon="fit_screen">Reset</md-button>
</md-button-group>`
    },
    {
      title: 'Full Width & Rounded Shape',
      description: 'Stretches buttons evenly across the width with rounded corner presets.',
      html: `<md-button-group connected full-width shape="rounded" variant="tonal" style="width: 100%; max-width: 480px;">
  <md-button icon="favorite">Like</md-button>
  <md-button icon="bookmark">Save</md-button>
  <md-button icon="send">Send</md-button>
</md-button-group>`
    }
  ]
};
