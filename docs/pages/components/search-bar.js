export default {
  id: 'search-bar',
  title: 'Search Bar',
  icon: 'search',
  tag: 'md-search-bar',
  category: 'Inputs & Controls',
  description: 'Search bars allow users to enter queries and view search suggestions in docked or full-screen responsive views, following Material Design 3 guidelines.',
  subpath: '@francofantomius/material-components/search-bar',
  interactiveType: 'search-bar',
  properties: [
    { name: 'value', type: 'string', default: "''", description: 'Current query value in the search bar' },
    { name: 'placeholder', type: 'string', default: "'Search'", description: 'Placeholder label for the input' },
    { name: 'size', type: "'small' | 'compact' | 'medium' | 'large'", default: "'medium'", description: 'Visual size of the search bar. Use "small" or "compact" (40px height) for navbars, toolbars, and headers' },
    { name: 'compact', type: 'boolean', default: 'false', description: 'Shorthand boolean for compact / small navbar sizing' },
    { name: 'active', type: 'boolean', default: 'false', description: 'Controls whether the search view is expanded and showing suggestions' },
    { name: 'suggestions', type: 'Array<string | SearchSuggestion>', default: '[]', description: 'List of search suggestions with labels, supporting text, and icons' },
    { name: 'leading-icon', type: 'string', default: "'search'", description: 'Leading icon displayed when inactive' },
    { name: 'active-leading-icon', type: 'string', default: "'arrow_back'", description: 'Leading icon displayed when active' },
    { name: 'trailing-icon', type: 'string', default: "''", description: 'Optional trailing action icon' },
    { name: 'show-back-button', type: 'boolean', default: 'true', description: 'Whether to show the back button in active mode' },
    { name: 'responsive', type: 'boolean', default: 'true', description: 'Automatically switches to full-screen view and collapsed search icon on mobile viewports (<= 768px)' },
    { name: 'collapse-on-mobile', type: 'boolean', default: 'true', description: 'Collapses search bar into a compact search icon button on mobile screens when inactive' },
    { name: 'fullscreen', type: 'boolean', default: 'false', description: 'Forces full-screen search view overlay when active' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables user interaction' }
  ],
  slots: [
    { name: 'leading-icon', description: 'Custom leading icon or button element' },
    { name: 'trailing-icon', description: 'Custom trailing action buttons, avatar, or mic' },
    { name: 'suggestions', description: 'Custom slotted suggestions list' },
    { name: '(default)', description: 'Additional content rendered inside active search surface' }
  ],
  events: [
    { name: 'input', detail: '{ value: string }', description: 'Fired as the user types in the search field' },
    { name: 'change', detail: '{ value: string }', description: 'Fired on committed input change' },
    { name: 'search', detail: '{ value: string, suggestion?: object }', description: 'Fired when the user presses Enter or selects a suggestion' },
    { name: 'active-change', detail: '{ active: boolean }', description: 'Fired when the search bar expands or collapses' },
    { name: 'suggestion-select', detail: '{ suggestion: object, value: string, index: number }', description: 'Fired when a suggestion item is selected' },
    { name: 'clear', detail: 'void', description: 'Fired when the search value is cleared' }
  ],
  examples: [
    {
      title: 'Basic Search Bar with Suggestions',
      description: 'Standard Material 3 search bar with interactive suggestions list and active state.',
      html: `<div style="width: 100%;">
  <md-search-bar
    id="demo-search-bar"
    placeholder="Search destinations, hotels, flights..."
    trailing-icon="mic"
  ></md-search-bar>
</div>`
    },
    {
      title: 'Compact Navbar / App Bar Search Bar',
      description: 'Compact 40px search bar ideal for navigation bars, toolbars, and compact headers using size="small" or compact.',
      html: `<div style="width: 100%; display: flex; flex-direction: column; gap: 16px;">
  <md-search-bar
    size="small"
    placeholder="Compact search in navbar..."
    trailing-icon="tune"
  ></md-search-bar>
</div>`
    },
    {
      title: 'Slotted Custom Suggestions',
      description: 'Search bar with custom slotted items, recent search chips, and action buttons.',
      html: `<div style="width: 100%;">
  <md-search-bar placeholder="Search files & documents">
    <div style="padding: 12px 16px;">
      <p style="margin: 0 0 8px 0; font-size: 13px; font-weight: 500; color: var(--md-sys-color-on-surface-variant);">Recent Searches</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <md-chip label="Q4 Financial Report" icon="history"></md-chip>
        <md-chip label="Design System M3" icon="history"></md-chip>
        <md-chip label="Project Roadmap" icon="history"></md-chip>
      </div>
    </div>
  </md-search-bar>
</div>`
    }
  ]
};

