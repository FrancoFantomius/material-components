export default {
  id: 'bottom-sheet',
  title: 'Bottom Sheet',
  icon: 'vertical_align_bottom',
  tag: 'md-bottom-sheet',
  category: 'Surfaces & Containment',
  description: 'Bottom sheets display supplementary content anchored to the bottom of the screen, supporting standard (docked) and modal (overlay) modes with drag gesture dismissal.',
  subpath: '@francofantomius/material-components/bottom-sheet',
  interactiveType: 'bottom-sheet',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Reflects open/closed state of the bottom sheet' },
    { name: 'type', type: "'standard' | 'modal'", default: "'standard'", description: 'Presentation mode: standard in-flow panel or modal overlay' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Enables modal overlay mode with backdrop scrim' },
    { name: 'headline', type: 'string', default: "''", description: 'Header title text' },
    { name: 'subhead', type: 'string', default: "''", description: 'Header subtitle text' },
    { name: 'hide-drag-handle', type: 'boolean', default: 'false', description: 'Hides the top drag handle bar' },
    { name: 'hide-close-button', type: 'boolean', default: 'false', description: 'Hides the default header close button' },
    { name: 'divider', type: 'boolean', default: 'false', description: 'Displays horizontal divider below header' },
    { name: 'fullscreen', type: 'boolean', default: 'false', description: 'Expands bottom sheet to full viewport height' }
  ],
  slots: [
    { name: 'drag-handle', description: 'Custom drag handle slot' },
    { name: 'header', description: 'Full custom header container' },
    { name: 'headline', description: 'Custom title / headline slot' },
    { name: 'subhead', description: 'Custom subtitle / subhead slot' },
    { name: 'header-actions', description: 'Actions next to close button in header' },
    { name: 'close-button', description: 'Custom close button slot' },
    { name: '(default)', description: 'Main scrollable body content' },
    { name: 'footer', description: 'Bottom actions or footer area' },
    { name: 'actions', description: 'Action buttons inside default footer' }
  ],
  events: [
    { name: 'open', description: 'Dispatched when bottom sheet opens' },
    { name: 'close', description: 'Dispatched when bottom sheet closes' },
    { name: 'cancel', description: 'Dispatched when dismissed via Escape key in modal mode' },
    { name: 'scrim-click', description: 'Dispatched when modal scrim backdrop is clicked' },
    { name: 'close-click', description: 'Dispatched when header close button is clicked' },
    { name: 'drag-start', description: 'Dispatched when user starts dragging the drag handle or sheet' },
    { name: 'drag-end', description: 'Dispatched when user stops dragging' },
    { name: 'drag-dismiss', description: 'Dispatched when bottom sheet is dismissed by drag gesture' }
  ],
  examples: [
    {
      title: 'Modal Bottom Sheet',
      description: 'Modal bottom sheet with drag handle, title, actions, and backdrop scrim overlay.',
      html: `<md-button variant="filled" id="open-modal-bottom-sheet-btn">Open Modal Bottom Sheet</md-button>

<md-bottom-sheet id="demo-modal-bottom-sheet" type="modal" headline="Share" subhead="Select a sharing option">
  <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: center; padding: 8px 0;">
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <md-icon-button variant="tonal" icon="link" aria-label="Copy link"></md-icon-button>
      <span style="font-size: 12px;">Copy link</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <md-icon-button variant="tonal" icon="mail" aria-label="Email"></md-icon-button>
      <span style="font-size: 12px;">Email</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <md-icon-button variant="tonal" icon="chat" aria-label="Messages"></md-icon-button>
      <span style="font-size: 12px;">Messages</span>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
      <md-icon-button variant="tonal" icon="share" aria-label="More"></md-icon-button>
      <span style="font-size: 12px;">More</span>
    </div>
  </div>

  <div slot="actions">
    <md-button variant="text" id="cancel-sheet-btn">Cancel</md-button>
  </div>
</md-bottom-sheet>`
    },
    {
      title: 'Standard Bottom Sheet',
      description: 'Docked standard bottom sheet embedded in page layout.',
      html: `<div style="border: 1px solid var(--md-sys-color-outline-variant); border-radius: 16px; overflow: hidden; height: 380px; display: flex; flex-direction: column; justify-content: space-between;">
  <div style="padding: 24px;">
    <h3 style="margin-top: 0;">Main View Content</h3>
    <p>Standard bottom sheets remain visible at the bottom of the screen or parent container without blocking page interactions.</p>
    <md-button variant="outlined" id="toggle-standard-bottom-sheet-btn">Toggle Standard Sheet</md-button>
  </div>

  <md-bottom-sheet id="demo-standard-bottom-sheet" open headline="Now Playing" subhead="Song information and queue" divider>
    <div>
      <p style="font-weight: 500; margin: 0 0 4px 0;">Cosmic Journey - Stellar Odyssey</p>
      <p style="margin: 0; color: var(--md-sys-color-on-surface-variant); font-size: 14px;">Next in queue: Lunar Echoes (3:45)</p>
    </div>
  </md-bottom-sheet>
</div>`
    }
  ]
};
