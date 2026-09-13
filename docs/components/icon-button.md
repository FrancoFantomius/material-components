---
title: Icon Button
category: Actions
icon: mood
description: Icon buttons allow users to take compact actions and toggle choices with a single tap.
---

## Overview

Icon buttons allow users to take compact actions and toggle choices with a single tap, supporting standard, filled, tonal, and outlined variants.

### Subpath Import

```javascript
import '@francofantomius/material-components/icon-button';
```

## Examples

### Variants

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <md-icon-button icon="favorite" variant="standard" aria-label="Favorite"></md-icon-button>
  <md-icon-button icon="star" variant="filled" aria-label="Bookmark"></md-icon-button>
  <md-icon-button icon="settings" variant="tonal" aria-label="Settings"></md-icon-button>
  <md-icon-button icon="share" variant="outlined" aria-label="Share"></md-icon-button>
</div>

```html
<md-icon-button icon="favorite" variant="standard" aria-label="Favorite"></md-icon-button>
<md-icon-button icon="star" variant="filled" aria-label="Bookmark"></md-icon-button>
<md-icon-button icon="settings" variant="tonal" aria-label="Settings"></md-icon-button>
<md-icon-button icon="share" variant="outlined" aria-label="Share"></md-icon-button>
```

### Toggle Mode

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
  <md-icon-button toggle icon="bookmark_border" selected-icon="bookmark" aria-label="Bookmark"></md-icon-button>
  <md-icon-button toggle variant="tonal" icon="notifications_none" selected-icon="notifications" aria-label="Alerts"></md-icon-button>
</div>

```html
<md-icon-button toggle icon="bookmark_border" selected-icon="bookmark" aria-label="Bookmark"></md-icon-button>
<md-icon-button toggle variant="tonal" icon="notifications_none" selected-icon="notifications" aria-label="Alerts"></md-icon-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'standard' \| 'filled' \| 'tonal' \| 'outlined'` | `'standard'` | Visual container style |
| `icon` | `string` | `''` | Material Symbols icon name |
| `selected-icon` | `string` | `''` | Icon displayed when toggle button is active |
| `toggle` | `boolean` | `false` | Enables two-state toggle behavior |
| `selected` | `boolean` | `false` | Active selection state for toggle buttons |
| `disabled` | `boolean` | `false` | Disables button interactions |
| `href` | `string` | `''` | Renders as hyperlink when present |
| `target` | `string` | `''` | Anchor target attribute |
| `aria-label` | `string` | `''` | Accessible label for screen readers |

