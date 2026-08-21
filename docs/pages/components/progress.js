export default {
  id: 'progress',
  title: 'Progress Indicators',
  icon: 'progress_activity',
  tag: 'md-progress',
  category: 'Communication & Feedback',
  description: 'Progress indicators express an unspecified wait time or display the length of a process in linear and circular formats.',
  subpath: '@francofantomius/material-components/progress',
  interactiveType: 'progress',
  properties: [
    { name: 'type', type: "'linear' | 'circular'", default: "'linear'", description: 'Indicator shape' },
    { name: 'value', type: 'number | null', default: 'null', description: 'Determinate value between 0 and 1. Null indicates indeterminate.' },
    { name: 'max', type: 'number', default: '1', description: 'Maximum progress value' },
    { name: 'buffer', type: 'number', default: '1', description: 'Buffer value for linear progress indicator' }
  ],
  examples: [
    {
      title: 'Linear & Circular Indicators',
      description: 'Determinate and indeterminate progress indicators.',
      html: `<!-- Linear Progress -->
<md-progress type="linear" value="0.7"></md-progress>
<md-progress type="linear"></md-progress>

<!-- Circular Progress -->
<div style="display: flex; gap: 24px; margin-top: 16px;">
  <md-progress type="circular" value="0.65"></md-progress>
  <md-progress type="circular"></md-progress>
</div>`
    }
  ]
};

