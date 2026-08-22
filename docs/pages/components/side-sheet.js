export default {
  id: 'side-sheet',
  title: 'Side Sheet',
  icon: 'side_navigation',
  tag: 'md-side-sheet',
  category: 'Surfaces & Containment',
  description: 'Side sheets display secondary content anchored to the side of the screen, supporting standard (in-flow) and modal (overlay) modes.',
  subpath: '@francofantomius/material-components/side-sheet',
  interactiveType: 'side-sheet',
  properties: [
    { name: 'open', type: 'boolean', default: 'false', description: 'Reflects open/closed state of the side sheet' },
    { name: 'type', type: "'standard' | 'modal'", default: "'standard'", description: 'Presentation mode: standard in-flow panel or modal overlay' },
    { name: 'modal', type: 'boolean', default: 'false', description: 'Enables modal overlay mode with backdrop scrim' },
    { name: 'side', type: "'start' | 'end' | 'left' | 'right'", default: "'end'", description: 'Screen side placement (start / left or end / right)' },
    { name: 'headline', type: 'string', default: "''", description: 'Header title text' },
    { name: 'subhead', type: 'string', default: "''", description: 'Header subtitle text' },
    { name: 'hide-close-button', type: 'boolean', default: 'false', description: 'Hides the default header close button' },
    { name: 'divider', type: 'boolean', default: 'false', description: 'Displays horizontal divider below header' }
  ],
  slots: [
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
    { name: 'open', description: 'Dispatched when side sheet opens' },
    { name: 'close', description: 'Dispatched when side sheet closes' },
    { name: 'cancel', description: 'Dispatched when dismissed via Escape key in modal mode' },
    { name: 'scrim-click', description: 'Dispatched when modal scrim backdrop is clicked' },
    { name: 'close-click', description: 'Dispatched when header close button is clicked' }
  ],
  examples: [
    {
      title: 'Modal Side Sheet',
      description: 'Modal side sheet overlay anchored to the end (right) edge with backdrop scrim.',
      html: `<md-button variant="filled" id="open-modal-sheet-btn">Open Modal Side Sheet</md-button>

<md-side-sheet id="demo-modal-sheet" type="modal" headline="Filters" subhead="Refine your search">
  <p>Select criteria to filter products:</p>
  <md-checkbox checked>In Stock Only</md-checkbox>
  <md-checkbox>Free Shipping</md-checkbox>
  <md-checkbox>On Sale</md-checkbox>

  <div slot="actions">
    <md-button variant="text" id="reset-sheet-btn">Reset</md-button>
    <md-button variant="filled" id="apply-sheet-btn">Apply Filters</md-button>
  </div>
</md-side-sheet>`
    },
    {
      title: 'Standard In-Flow Side Sheet',
      description: 'Standard side sheet co-existing alongside primary page content.',
      html: `<div style="display: flex; height: 350px; border: 1px solid var(--md-sys-color-outline-variant); border-radius: 12px; overflow: hidden;">
  <div style="flex: 1; padding: 24px;">
    <h3 style="margin-top: 0;">Main Content Area</h3>
    <p>Standard side sheets co-exist with primary content for simultaneous viewing.</p>
    <md-button variant="outlined" id="toggle-standard-sheet-btn">Toggle Standard Sheet</md-button>
  </div>

  <md-side-sheet id="demo-standard-sheet" open headline="Item Details" subhead="Properties & Metadata" divider>
    <div>
      <p style="font-weight: 500; margin-bottom: 4px;">File Name</p>
      <p style="margin-top: 0; color: var(--md-sys-color-on-surface-variant);">presentation_deck_final.pdf</p>

      <p style="font-weight: 500; margin-bottom: 4px;">Size</p>
      <p style="margin-top: 0; color: var(--md-sys-color-on-surface-variant);">4.2 MB</p>

      <p style="font-weight: 500; margin-bottom: 4px;">Modified</p>
      <p style="margin-top: 0; color: var(--md-sys-color-on-surface-variant);">2 hours ago</p>
    </div>
  </md-side-sheet>
</div>`
    }
  ]
};
