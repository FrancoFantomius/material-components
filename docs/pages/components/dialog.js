export default {
  id: 'dialog',
  title: 'Dialog',
  icon: 'picture_in_picture',
  tag: 'md-dialog',
  category: 'Surfaces & Containment',
  description: 'Dialogs inform users about a task and can contain critical information, require decisions, or involve multiple tasks.',
  subpath: '@francofantomius/material-components/dialog',
  interactiveType: 'dialog',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Reflects open/closed state of modal' },
    { name: 'headline', type: 'string', default: "''", description: 'Header title text' },
    { name: 'icon', type: 'string', default: "''", description: 'Material Symbols header icon' }
  ],
  slots: [
    { name: 'actions', description: 'Modal action buttons (Cancel, Confirm)' },
    { name: '(default)', description: 'Dialog message body content' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when the dialog modal opens' },
    { name: 'close', detail: '{ returnValue?: string }', description: 'Dispatched when the dialog closes' },
    { name: 'cancel', description: 'Dispatched when the dialog is dismissed via Escape key' }
  ],
  examples: [
    {
      title: 'Modal Confirmation Dialog',
      description: 'Standard Material 3 modal dialog with headline and action buttons.',
      html: `<md-button variant="filled" id="open-demo-dialog-btn">Open Dialog</md-button>

<md-dialog id="demo-doc-dialog" headline="Discard Draft?" icon="warning">
  Are you sure you want to discard your changes? This action cannot be undone.
  <div slot="actions">
    <md-button variant="text" id="cancel-demo-dialog-btn">Cancel</md-button>
    <md-button variant="filled" id="confirm-demo-dialog-btn">Discard</md-button>
  </div>
</md-dialog>`
    }
  ]
};

