export default {
  id: 'loading-indicator',
  title: 'Loading Indicator',
  icon: 'hourglass_empty',
  tag: 'md-loading-indicator',
  category: 'Communication & Feedback',
  description: 'Loading indicators express an unspecified wait time for short operations with Material Design 3 Expressive animated morphing shapes and optional contained containers.',
  subpath: '@francofantomius/material-components/loading-indicator',
  interactiveType: 'loading-indicator',
  properties: [
    { name: 'size', type: "'small' | 'medium' | 'large'", default: "'medium'", description: 'Visual size of the loading indicator' },
    { name: 'contained', type: 'boolean', default: 'false', description: 'Encloses the indicator within a contained surface container' },
    { name: 'shape', type: "'morph' | 'square' | 'circle' | 'clover' | 'star'", default: "'morph'", description: 'Shape animation style' },
    { name: 'paused', type: 'boolean', default: 'false', description: 'Pauses the shape animation' },
    { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible label for screen readers' }
  ],
  examples: [
    {
      title: 'Contained & Standard Loading Indicators',
      description: 'M3 Expressive loading indicators with continuous animated shape morphing across different sizes.',
      html: `<!-- Standard morphing loading indicators -->
<div style="display: flex; align-items: center; gap: 24px;">
  <md-loading-indicator size="small"></md-loading-indicator>
  <md-loading-indicator size="medium"></md-loading-indicator>
  <md-loading-indicator size="large"></md-loading-indicator>
</div>

<!-- Contained loading indicators -->
<div style="display: flex; align-items: center; gap: 24px; margin-top: 24px;">
  <md-loading-indicator contained size="small"></md-loading-indicator>
  <md-loading-indicator contained size="medium"></md-loading-indicator>
  <md-loading-indicator contained size="large"></md-loading-indicator>
</div>

<!-- Shape variants -->
<div style="display: flex; align-items: center; gap: 24px; margin-top: 24px;">
  <md-loading-indicator contained shape="square" size="medium"></md-loading-indicator>
  <md-loading-indicator contained shape="circle" size="medium"></md-loading-indicator>
  <md-loading-indicator contained shape="clover" size="medium"></md-loading-indicator>
</div>`
    }
  ]
};
