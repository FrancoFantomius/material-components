export default {
  id: 'tooltip',
  title: 'Tooltip',
  icon: 'tooltip',
  tag: 'md-tooltip',
  category: 'Communication & Feedback',
  description: 'Tooltips display informative text when users hover over, focus on, or tap an element. Plain tooltips describe an element briefly, while rich tooltips provide detailed context, headlines, and actions.',
  subpath: '@francofantomius/material-components/tooltip',
  interactiveType: 'tooltip',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Visibility state of the tooltip' },
    { name: 'position', type: "'top' | 'bottom' | 'left' | 'right'", default: "'bottom'", description: 'Preferred placement relative to anchor target' },
    { name: 'rich', type: 'boolean', default: 'false', description: 'Enables rich tooltip styling with headline, supporting text, and actions' },
    { name: 'for', type: 'string', default: "''", description: 'ID of the target anchor element' },
    { name: 'value', type: 'string', default: "''", description: 'Plain tooltip label or rich tooltip supporting text' },
    { name: 'headline', type: 'string', default: "''", description: 'Headline / title for rich tooltips' },
    { name: 'action-text', type: 'string', default: "''", description: 'Action button label for rich tooltips' },
    { name: 'show-delay', type: 'number', default: '500', description: 'Delay in milliseconds before showing tooltip on hover' },
    { name: 'hide-delay', type: 'number', default: '150', description: 'Delay in milliseconds before hiding tooltip after pointer leaves' },
    { name: 'persistent', type: 'boolean', default: 'false', description: 'Keeps rich tooltip open until dismissed explicitly' },
    { name: 'has-caret', type: 'boolean', default: 'false', description: 'Renders a directional pointing caret' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables tooltip triggering' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when tooltip becomes visible' },
    { name: 'close', description: 'Dispatched when tooltip is dismissed' },
    { name: 'action', description: 'Dispatched when rich tooltip action button is clicked' }
  ],
  examples: [
    {
      title: 'Plain Tooltips',
      description: 'Short informative labels on hover or focus attached to icon buttons.',
      html: `<div style="display: flex; gap: 24px; align-items: center;">
  <div>
    <md-icon-button id="btn-fav" icon="favorite" aria-label="Favorite"></md-icon-button>
    <md-tooltip for="btn-fav" value="Add to favorites" position="bottom"></md-tooltip>
  </div>

  <div>
    <md-icon-button id="btn-share" icon="share" aria-label="Share"></md-icon-button>
    <md-tooltip for="btn-share" value="Share link" position="top"></md-tooltip>
  </div>

  <div>
    <md-icon-button id="btn-delete" icon="delete" aria-label="Delete"></md-icon-button>
    <md-tooltip for="btn-delete" value="Delete file" position="right"></md-tooltip>
  </div>
</div>`
    },
    {
      title: 'Rich Tooltips with Actions',
      description: 'Rich tooltips provide headlines, detailed supporting text, and interactive action buttons.',
      html: `<div style="display: flex; gap: 24px; align-items: center;">
  <div>
    <md-button id="btn-rich-demo" variant="tonal" icon="help_outline">Permissions Help</md-button>
    <md-tooltip
      for="btn-rich-demo"
      rich
      has-caret
      position="bottom"
      headline="Access Permissions"
      value="Members with View permissions can read and comment on documents without editing."
      action-text="Learn more"
    ></md-tooltip>
  </div>
</div>`
    }
  ]
};
