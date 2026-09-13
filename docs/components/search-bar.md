---
title: Search Bar
category: Inputs & Controls
icon: search
description: Search bars provide an input field for search queries with instant suggestions and fullscreen expanding view.
---

## Overview

Search bars provide an accessible input field for querying content, featuring docked pill layouts, dynamic suggestion dropdowns, keyboard shortcuts, and responsive expanding views.

### Subpath Import

```javascript
import '@francofantomius/material-components/search-bar';
```

## Examples

### Docked and Responsive Search Bar

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; max-width: 520px;">
  <md-search-bar
    placeholder="Search documentation..."
    show-back-button
    show-clear-button
    responsive
  ></md-search-bar>
</div>

```html
<md-search-bar
  placeholder="Search documentation..."
  show-back-button
  show-clear-button
  responsive
></md-search-bar>
```

### Search Icon on the Right

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; max-width: 520px;">
  <md-search-bar
    placeholder="Search products..."
    search-icon-position="right"
  ></md-search-bar>
</div>

```html
<md-search-bar
  placeholder="Search products..."
  search-icon-position="right"
></md-search-bar>
```

### Hamburger Menu Button on Left and Search Icon on Right

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; max-width: 520px;">
  <md-search-bar
    placeholder="Search apps and files..."
    leading-icon="menu"
    search-icon-position="right"
  ></md-search-bar>
</div>

```html
<!-- Using attributes -->
<md-search-bar
  placeholder="Search apps and files..."
  leading-icon="menu"
  search-icon-position="right"
></md-search-bar>

<!-- Or using slotted custom icon button -->
<md-search-bar placeholder="Search apps and files..." search-icon-position="right">
  <md-icon-button slot="leading" icon="menu" aria-label="Open menu"></md-icon-button>
</md-search-bar>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Current search query string |
| `placeholder` | `string` | `'Search'` | Input placeholder text |
| `size` | `'small' \| 'compact' \| 'medium' \| 'large'` | `'medium'` | Search bar container height |
| `search-icon-position` | `'leading' \| 'trailing' \| 'left' \| 'right'` | `'leading'` | Position of search icon (`'leading'` / left, or `'trailing'` / right) |
| `leading-icon` | `string` | `'search'` | Leading icon name (e.g. `'search'`, `'menu'`) |
| `trailing-icon` | `string` | `''` | Trailing action icon name (e.g. `'mic'`, `'search'`) |
| `show-back-button` | `boolean` | `true` | Displays leading back arrow button when active |
| `show-clear-button` | `boolean` | `true` | Displays trailing clear button when input has text |
| `responsive` | `boolean` | `true` | Adapts to mobile fullscreen modal search view |
| `collapse-on-mobile` | `boolean` | `true` | Collapses search bar into a compact trigger button on mobile |
| `disabled` | `boolean` | `false` | Disables search interaction |
| `suggestions` | `Array` | `[]` | Array of suggestion objects for the dropdown |

### Slots

| Slot Name | Description |
| :--- | :--- |
| `leading` | Custom leading icon or navigation button element (also aliased as `leading-icon`) |
| `trailing` | Trailing action buttons, avatar, or mic (also aliased as `trailing-icon`) |
| `suggestions` | Custom slotted suggestions list |

### Events

| Name | Description |
| :--- | :--- |
| `input` | Dispatched on query change (`detail: { value: string }`) |
| `change` | Dispatched on query commit (`detail: { value: string }`) |
| `search` | Dispatched on Enter press or clicking search button (`detail: { value: string, suggestion?: any }`) |
| `leading-icon-click` | Dispatched when the custom leading icon button (e.g. menu) is clicked (`detail: { icon: string }`) |
| `trailing-icon-click` | Dispatched when the trailing icon button (e.g. search, mic) is clicked (`detail: { icon: string }`) |
| `suggestion-select` | Dispatched when a suggestion is clicked (`detail: { suggestion: any, value: string, index: number }`) |
| `clear` | Dispatched when the clear button is tapped |
| `active-change` | Dispatched when search bar expands/collapses (`detail: { active: boolean }`) |
