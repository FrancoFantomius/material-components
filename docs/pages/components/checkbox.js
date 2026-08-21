export default {
  id: 'checkbox',
  title: 'Checkbox',
  tag: 'md-checkbox',
  category: 'Inputs & Controls',
  description: 'Checkboxes allow users to select one or more items from a set, or toggle between checked, unchecked, and indeterminate states.',
  subpath: '@francofantomius/material-components/checkbox',
  interactiveType: 'checkbox',
  properties: [
    { name: 'checked', type: 'boolean', default: 'false', description: 'Checked state' },
    { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Partially selected state' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Form validation constraint' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Applies error color styling' },
    { name: 'name', type: 'string', default: "''", description: 'HTML form input name' },
    { name: 'value', type: 'string', default: "'on'", description: 'HTML form submitted value' }
  ],
  examples: [
    {
      title: 'Checkbox States',
      description: 'Standard checked, indeterminate, unchecked, and disabled checkboxes.',
      html: `<md-checkbox checked>I agree to terms</md-checkbox>
<md-checkbox indeterminate>Select all children</md-checkbox>
<md-checkbox>Unchecked option</md-checkbox>
<md-checkbox disabled checked>Disabled selection</md-checkbox>`
    }
  ]
};

