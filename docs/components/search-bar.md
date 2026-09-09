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

```html
<md-search-bar
  placeholder="Search documentation..."
  show-back-button
  show-clear-button
  responsive
></md-search-bar>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Current search query string |
| `placeholder` | `string` | `'Search'` | Input placeholder text |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Search bar container height |
| `show-back-button` | `boolean` | `false` | Displays leading back arrow button |
| `show-clear-button` | `boolean` | `true` | Displays trailing clear button when input has text |
| `responsive` | `boolean` | `false` | Adapts to mobile fullscreen modal search view |
| `disabled` | `boolean` | `false` | Disables search interaction |
| `suggestions` | `Array` | `[]` | Array of suggestion objects for the dropdown |

### Slots

| Slot Name | Description |
| :--- | :--- |
| `leading` | Leading icon or navigation element |
| `trailing` | Trailing action buttons (e.g. voice search, avatar) |

### Events

| Name | Description |
| :--- | :--- |
| `input` | Dispatched on query change (`{ value: string }`) |
| `search` | Dispatched on Enter press (`{ value: string, suggestion?: any }`) |
| `suggestion-select` | Dispatched when a suggestion is clicked (`{ suggestion: any }`) |
| `clear` | Dispatched when the clear button is tapped |

