---
title: Icon
category: Utilities & Data
icon: insert_emoticon
description: Material Symbols font icon wrapper with accessible sizing, filling, and styling.
---

## Overview

Icons represent actions, items, and status indicators using Google Material Symbols Outlined font with optical size, fill, and weight configurations.

### Subpath Import

```javascript
import '@francofantomius/material-components/icon';
```

## Examples

### Icon Variants and Sizes

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
  <md-icon name="home"></md-icon>
  <md-icon name="favorite" filled></md-icon>
  <md-icon name="settings" size="36"></md-icon>
</div>

```html
<md-icon name="home"></md-icon>
<md-icon name="favorite" filled></md-icon>
<md-icon name="settings" size="36"></md-icon>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `''` | Material Symbols icon identifier |
| `filled` | `boolean` | `false` | Renders filled variant of symbol |
| `size` | `number \| string` | `'24'` | Icon size in pixels |
| `aria-label` | `string` | `''` | Screen reader description |

