export default {
  id: 'switch',
  title: 'Switch',
  tag: 'md-switch',
  category: 'Inputs & Controls',
  description: 'Switches toggle the state of a single setting on or off, with optional check and cross icons inside the thumb.',
  subpath: '@francofantomius/material-components/switch',
  interactiveType: 'switch',
  properties: [
    { name: 'selected', type: 'boolean', default: 'false', description: 'On/Off toggle state' },
    { name: 'icons', type: 'boolean', default: 'false', description: 'Displays check and cross icons inside thumb' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' },
    { name: 'name', type: 'string', default: "''", description: 'HTML form input name' },
    { name: 'value', type: 'string', default: "'on'", description: 'HTML form submitted value' }
  ],
  examples: [
    {
      title: 'Switch Examples',
      description: 'Toggle switches with icons and disabled states.',
      html: `<div style="display: flex; flex-direction: column; gap: 16px;">
  <md-switch selected icons>Wi-Fi</md-switch>
  <md-switch selected>Bluetooth</md-switch>
  <md-switch disabled>Airplane Mode</md-switch>
</div>`
    }
  ]
};

