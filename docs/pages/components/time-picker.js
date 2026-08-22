export default {
  id: 'time-picker',
  title: 'Time Picker',
  icon: 'schedule',
  tag: 'md-time-picker',
  category: 'Inputs & Controls',
  description: 'Time pickers help users select and set a specific time using an interactive Material Design 3 clock dial or numeric text inputs, in both 12-hour (AM/PM) and 24-hour formats.',
  subpath: '@francofantomius/material-components/time-picker',
  interactiveType: 'time-picker',
  properties: [
    { name: 'value', type: 'string', default: "''", description: 'Current time value string (e.g. "08:30 AM" or "14:30")' },
    { name: 'format', type: "'12h' | '24h'", default: "'12h'", description: 'Time display and selection format' },
    { name: 'view', type: "'dial' | 'input'", default: "'dial'", description: 'Active presentation mode: interactive clock dial or numeric text fields' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Whether the time picker displays as a modal dialog with backdrop scrim' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility when in modal mode' },
    { name: 'headline', type: 'string', default: "'Select time'", description: 'Header headline text' },
    { name: 'auto-switch-to-minute', type: 'boolean', default: 'true', description: 'Automatically switches active selection from hour to minute on dial' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' },
    { name: 'name', type: 'string', default: "''", description: 'Name attribute for HTML form submission' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Form validation required constraint' }
  ],
  examples: [
    {
      title: 'Clock Dial Time Picker (12-hour AM/PM)',
      description: 'Interactive clock dial selector with AM/PM toggle.',
      html: `<md-time-picker format="12h" value="09:30 AM"></md-time-picker>`
    },
    {
      title: '24-Hour Clock Dial',
      description: '24-hour time selector with concentric hour rings.',
      html: `<md-time-picker format="24h" value="14:45"></md-time-picker>`
    },
    {
      title: 'Text Input Mode',
      description: 'Keyboard-friendly numeric input fields for hour and minute.',
      html: `<md-time-picker view="input" format="12h" value="02:15 PM"></md-time-picker>`
    },
    {
      title: 'Modal Time Picker Dialog',
      description: 'Popup dialog overlay with backdrop scrim and confirmation actions.',
      html: `<md-button variant="filled" icon="schedule" onclick="document.getElementById('modal-time-picker').showModal()">
  Open Time Picker
</md-button>

<md-time-picker id="modal-time-picker" modal headline="Set Alarm Time" value="07:00 AM"></md-time-picker>`
    }
  ]
};
