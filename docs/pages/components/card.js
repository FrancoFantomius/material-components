export default {
  id: 'card',
  title: 'Card',
  icon: 'crop_landscape',
  tag: 'md-card',
  category: 'Surfaces & Containment',
  description: 'Cards contain content and actions about a single subject, available in elevated, filled, and outlined styles with optional ripple interactivity.',
  subpath: '@francofantomius/material-components/card',
  interactiveType: 'card',
  properties: [
    { name: 'variant', type: "'elevated' | 'filled' | 'outlined'", default: "'elevated'", description: 'Card visual style' },
    { name: 'interactive', type: 'boolean', default: 'false', description: 'Enables hover elevation and ripple effect' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables card interactions' },
    { name: 'href', type: 'string', default: "''", description: 'Renders card as anchor link' },
    { name: 'target', type: 'string', default: "''", description: 'Anchor target when href is provided' }
  ],
  slots: [
    { name: 'header', description: 'Top card header content' },
    { name: 'actions', description: 'Bottom actions button container' },
    { name: '(default)', description: 'Main card body content' }
  ],
  examples: [
    {
      title: 'Card Variants',
      description: 'Elevated, filled, and outlined cards with action buttons.',
      html: `<md-card variant="outlined" style="max-width: 340px;">
  <div slot="header">
    <h3 style="margin: 0; font-size: 18px;">Outlined Card</h3>
  </div>
  Explore our Material Design 3 component library with built-in interactive feedback.
  <div slot="actions">
    <md-button variant="text">Dismiss</md-button>
    <md-button variant="filled">Learn More</md-button>
  </div>
</md-card>`
    }
  ]
};

