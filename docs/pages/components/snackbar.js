export default {
  id: 'snackbar',
  title: 'Snackbar',
  icon: 'announcement',
  tag: 'md-snackbar',
  category: 'Communication & Feedback',
  description: 'Snackbars provide brief feedback about an operation through an elevated message toast at the bottom of the viewport.',
  subpath: '@francofantomius/material-components/snackbar',
  interactiveType: 'snackbar',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Visibility state' },
    { name: 'message', type: 'string', default: "''", description: 'Message toast content' },
    { name: 'action-text', type: 'string', default: "''", description: 'Action button label' },
    { name: 'closeable', type: 'boolean', default: 'false', description: 'Renders a close icon button' },
    { name: 'timeout-ms', type: 'number', default: '4000', description: 'Auto-dismiss timeout duration in ms (0 for indefinite)' }
  ],
  events: [
    { name: 'open', description: 'Fired when snackbar appears' },
    { name: 'close', description: 'Fired when snackbar dismisses' },
    { name: 'action', description: 'Fired when the user clicks the action button' }
  ],
  examples: [
    {
      title: 'Toast Notification',
      description: 'Triggering a toast notification with an action button.',
      html: `<md-button variant="tonal" id="show-demo-toast-btn">Show Snackbar</md-button>

<md-snackbar id="demo-doc-toast" message="Email message moved to Trash." action-text="Undo" closeable></md-snackbar>`
    }
  ]
};

