export default {
  id: 'divider',
  title: 'Divider',
  icon: 'horizontal_rule',
  tag: 'md-divider',
  category: 'Surfaces & Containment',
  description: 'A divider is a thin line that groups content in lists and page layouts, supporting inset and vertical orientations.',
  subpath: '@francofantomius/material-components/divider',
  interactiveType: 'divider',
  properties: [
    { name: 'vertical', type: 'boolean', default: 'false', description: 'Renders a vertical divider' },
    { name: 'inset', type: 'boolean', default: 'false', description: 'Adds 16px start and end margins' },
    { name: 'inset-start', type: 'boolean', default: 'false', description: 'Adds 16px margin only to the start' },
    { name: 'inset-end', type: 'boolean', default: 'false', description: 'Adds 16px margin only to the end' }
  ],
  examples: [
    {
      title: 'Horizontal Dividers',
      description: 'Full width dividers separating content sections with uniform length.',
      html: `<div style="display: flex; flex-direction: column; gap: 12px; width: 100%; text-align: center;">
  <div>Section Item Alpha</div>
  <md-divider></md-divider>
  <div>Section Item Beta</div>
  <md-divider></md-divider>
  <div>Section Item Gamma</div>
</div>`
    },
    {
      title: 'Inset Dividers',
      description: 'Indented dividers with consistent 16px start and end margins.',
      html: `<div style="display: flex; flex-direction: column; gap: 12px; width: 100%; text-align: center;">
  <div>Section Item Alpha</div>
  <md-divider inset></md-divider>
  <div>Section Item Beta</div>
  <md-divider inset></md-divider>
  <div>Section Item Gamma</div>
</div>`
    }
  ]
};

