export default {
  id: 'radio',
  title: 'Radio & Radio Group',
  tag: 'md-radio',
  category: 'Inputs & Controls',
  description: 'Radio buttons allow users to select exactly one option from a set of mutually exclusive choices, organized within an md-radio-group.',
  subpath: '@francofantomius/material-components/radio',
  interactiveType: 'radio',
  properties: [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state of md-radio' },
    { name: 'value', type: 'string', default: "'on'", description: 'Value associated with md-radio' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables this radio button' }
  ],
  subComponentProperties: [
    {
      name: 'md-radio-group',
      properties: [
        { name: 'name', type: 'string', default: "''", description: 'Group name shared across radio buttons' },
        { name: 'value', type: 'string', default: "''", description: 'Currently selected radio value' },
        { name: 'row', type: 'boolean', default: 'false', description: 'Arranges radio items horizontally' }
      ]
    }
  ],
  examples: [
    {
      title: 'Radio Group Layouts',
      description: 'Vertical and horizontal radio groups.',
      html: `<md-radio-group name="shipping" value="express">
  <md-radio value="standard">Standard Shipping (3-5 days)</md-radio>
  <md-radio value="express">Express Delivery (1-2 days)</md-radio>
  <md-radio value="overnight" disabled>Overnight Priority (Unavailable)</md-radio>
</md-radio-group>

<md-radio-group row name="size" value="m" style="margin-top: 16px;">
  <md-radio value="s">Small</md-radio>
  <md-radio value="m">Medium</md-radio>
  <md-radio value="l">Large</md-radio>
</md-radio-group>`
    }
  ]
};

