---
title: Split Button
category: Actions
icon: call_split
description: Split buttons combine a primary action button with a connected dropdown trigger for related contextual options.
---

## Overview

Split buttons combine a primary action button with a connected dropdown trigger button for related contextual options.

### Subpath Import

```javascript
import '@francofantomius/material-components/split-button';
```

## Examples

### Split Button Variants

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <md-split-button label="Save"></md-split-button>
  <md-split-button variant="tonal" icon="cloud_upload" label="Upload" trailing-icon="expand_more"></md-split-button>
  <md-split-button variant="outlined" label="Export"></md-split-button>
</div>

```html
<!-- Default filled split button -->
<md-split-button label="Save"></md-split-button>

<!-- Split button with icons and tonal variant -->
<md-split-button variant="tonal" icon="cloud_upload" label="Upload" trailing-icon="expand_more"></md-split-button>

<!-- Outlined split button -->
<md-split-button variant="outlined" label="Export"></md-split-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined'` | `'filled'` | Visual emphasis style of the split button |
| `disabled` | `boolean` | `false` | Disables both action and menu trigger buttons |
| `label` | `string` | `''` | Primary action button text label |
| `icon` | `string` | `''` | Leading icon for the primary action button |
| `trailing-icon` | `string` | `'arrow_drop_down'` | Dropdown trigger icon name |
| `open` | `boolean` | `false` | Whether the associated menu / options dropdown is open |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML form button type for the main action |
| `action-aria-label` | `string` | `''` | Accessible label for the main action button |
| `menu-aria-label` | `string` | `'More options'` | Accessible label for the trailing menu trigger button |

### Events

| Name | Description |
| :--- | :--- |
| `action` | Dispatched when the leading primary action button is clicked |
| `trailing-click` | Dispatched when the trailing dropdown menu button is clicked |
| `toggle` | Dispatched when the trailing menu trigger toggles open state |

