export default {
  id: 'slider',
  title: 'Slider',
  icon: 'linear_scale',
  tag: 'md-slider',
  category: 'Inputs & Controls',
  description: 'Sliders allow users to view and select a value (or range of values) from a range along a track, supporting continuous or discrete steps, range handles, value balloons, and icons.',
  subpath: '@francofantomius/material-components/slider',
  interactiveType: 'slider',
  properties: [
    { name: 'value', type: 'number', default: '50', description: 'Current value for single slider mode' },
    { name: 'value-start', type: 'number', default: '0', description: 'Start value for dual thumb range mode' },
    { name: 'value-end', type: 'number', default: '100', description: 'End value for dual thumb range mode' },
    { name: 'min', type: 'number', default: '0', description: 'Minimum allowed value' },
    { name: 'max', type: 'number', default: '100', description: 'Maximum allowed value' },
    { name: 'step', type: 'number', default: '1', description: 'Granularity step increment' },
    { name: 'range', type: 'boolean', default: 'false', description: 'Enables dual-thumb range selection mode' },
    { name: 'ticks', type: 'boolean', default: 'false', description: 'Displays discrete step tick marks along the track' },
    { name: 'labeled', type: 'boolean', default: 'false', description: 'Shows value indicator balloon tooltip above thumb' },
    { name: 'icon', type: 'string', default: "''", description: 'Leading icon name' },
    { name: 'leading-icon', type: 'string', default: "''", description: 'Leading icon name' },
    { name: 'trailing-icon', type: 'string', default: "''", description: 'Trailing icon name' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' },
    { name: 'name', type: 'string', default: "''", description: 'HTML form input name' }
  ],
  examples: [
    {
      title: 'Continuous Slider',
      description: 'Standard single-thumb continuous slider with leading and trailing icons.',
      html: `<div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px;">
  <md-slider value="60" icon="volume_down" trailing-icon="volume_up"></md-slider>
  <md-slider value="30" icon="brightness_low" trailing-icon="brightness_high"></md-slider>
</div>`
    },
    {
      title: 'Discrete Slider with Ticks & Value Balloon',
      description: 'Discrete stepped slider showing tick marks and value indicator labels.',
      html: `<div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px;">
  <md-slider min="0" max="100" step="10" value="40" ticks labeled></md-slider>
  <md-slider min="0" max="5" step="1" value="3" ticks labeled icon="speed"></md-slider>
</div>`
    },
    {
      title: 'Range Slider (Dual Thumbs)',
      description: 'Range slider with start and end thumbs for selecting a bounded value interval.',
      html: `<div style="display: flex; flex-direction: column; gap: 24px; max-width: 480px;">
  <md-slider range value-start="20" value-end="80" labeled></md-slider>
  <md-slider range min="0" max="1000" step="100" value-start="200" value-end="700" ticks labeled icon="payments"></md-slider>
</div>`
    },
    {
      title: 'Disabled State',
      description: 'Disabled slider preventing any user input.',
      html: `<div style="max-width: 480px;">
  <md-slider value="50" disabled icon="lock"></md-slider>
</div>`
    }
  ]
};
