export default {
  id: 'badge',
  title: 'Badge',
  icon: 'mark_chat_unread',
  tag: 'md-badge',
  category: 'Communication & Feedback',
  description: 'Badges show notification counts, alert statuses, or small indicators anchored to icon buttons or list elements.',
  subpath: '@francofantomius/material-components/badge',
  interactiveType: 'badge',
  properties: [
    { name: 'value', type: 'string', default: "''", description: 'Badge numeric or text value' },
    { name: 'dot', type: 'boolean', default: 'false', description: 'Renders a small 6px dot without text' }
  ],
  examples: [
    {
      title: 'Count and Dot Badges',
      description: 'Badges attached to icon buttons.',
      html: `<div style="display: flex; gap: 24px; align-items: center;">
  <md-badge value="4">
    <md-icon-button icon="mail" aria-label="Mail"></md-icon-button>
  </md-badge>
  <md-badge value="99+">
    <md-icon-button icon="notifications" aria-label="Notifications"></md-icon-button>
  </md-badge>
  <md-badge dot>
    <md-icon-button icon="chat" aria-label="Messages"></md-icon-button>
  </md-badge>
</div>`
    }
  ]
};

