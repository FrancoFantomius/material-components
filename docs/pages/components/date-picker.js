export default {
  id: 'date-picker',
  title: 'Date Picker',
  icon: 'calendar_month',
  tag: 'md-date-picker',
  category: 'Inputs & Controls',
  description: 'Date pickers let people select a date or a range of dates using an interactive calendar grid, month/year navigation, and Material Design 3 styling in docked and modal dialog formats.',
  subpath: '@francofantomius/material-components/date-picker',
  interactiveType: 'date-picker',
  properties: [
    { name: 'variant', type: "'docked' | 'modal'", default: "'docked'", description: 'Presentation variant: inline/docked container or modal dialog overlay' },
    { name: 'range', type: 'boolean', default: 'false', description: 'Enables date range selection mode (start date and end date)' },
    { name: 'value', type: 'string', default: "''", description: 'Selected date string (ISO "YYYY-MM-DD" or "YYYY-MM-DD/YYYY-MM-DD" for range)' },
    { name: 'start-date', type: 'string', default: "''", description: 'Start date in range selection mode' },
    { name: 'end-date', type: 'string', default: "''", description: 'End date in range selection mode' },
    { name: 'min', type: 'string', default: "''", description: 'Minimum selectable date constraint (ISO "YYYY-MM-DD")' },
    { name: 'max', type: 'string', default: "''", description: 'Maximum selectable date constraint (ISO "YYYY-MM-DD")' },
    { name: 'label', type: 'string', default: "''", description: 'Header subhead / supporting label text (e.g. "Select date")' },
    { name: 'headline', type: 'string', default: "''", description: 'Custom header headline text (defaults to formatted date)' },
    { name: 'open', type: 'boolean', default: 'false', description: 'Controls visibility when in modal dialog mode' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction and date selection' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Form validation required constraint' },
    { name: 'first-day-of-week', type: 'number', default: '0', description: 'Starting day of the week: 0 for Sunday, 1 for Monday' },
    { name: 'show-actions', type: 'boolean', default: 'false', description: 'Displays bottom action buttons (Cancel / OK) in docked mode' },
    { name: 'error', type: 'boolean', default: 'false', description: 'Applies error visual styling' },
    { name: 'error-text', type: 'string', default: "''", description: 'Validation error message' },
    { name: 'supporting-text', type: 'string', default: "''", description: 'Helper text below the date picker' },
    { name: 'name', type: 'string', default: "''", description: 'Name attribute for HTML form integration' }
  ],
  events: [
    { name: 'change', detail: '{ value: string, startDate?: string, endDate?: string }', description: 'Dispatched when date selection is committed' },
    { name: 'input', detail: '{ value: string }', description: 'Dispatched whenever date input value updates' },
    { name: 'select', detail: '{ date: string, type: "single" | "start" | "end" }', description: 'Dispatched when an individual date is clicked' },
    { name: 'open', description: 'Dispatched when modal date picker opens' },
    { name: 'close', description: 'Dispatched when modal date picker closes' },
    { name: 'cancel', description: 'Dispatched when modal is dismissed or cancelled' }
  ],
  examples: [
    {
      title: 'Docked Date Picker',
      description: 'Standard Material Design 3 inline date picker with month and year navigation.',
      html: `<md-date-picker value="2026-08-22" label="Select date"></md-date-picker>`
    },
    {
      title: 'Date Range Picker',
      description: 'Select start and end dates with visual range highlight band.',
      html: `<md-date-picker range value="2026-08-10/2026-08-20" label="Select range"></md-date-picker>`
    },
    {
      title: 'Min & Max Date Constraints',
      description: 'Restricts date selection within a predefined date range.',
      html: `<md-date-picker min="2026-08-05" max="2026-08-25" value="2026-08-15" supporting-text="Available dates: Aug 5 - Aug 25"></md-date-picker>`
    },
    {
      title: 'Modal Date Picker Dialog',
      description: 'Modal date picker overlay with backdrop scrim and confirmation actions.',
      html: `<md-button variant="filled" icon="calendar_month" onclick="document.getElementById('demo-modal-datepicker').showModal()">
  Open Date Picker
</md-button>

<md-date-picker id="demo-modal-datepicker" variant="modal" value="2026-08-22"></md-date-picker>`
    }
  ]
};
