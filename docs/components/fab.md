---
title: Floating Action Button
category: Actions
icon: add_circle
description: A Floating Action Button (FAB) performs the primary, most common action on a screen.
---

## Overview

A Floating Action Button (FAB) performs the primary, most common action on a screen. Supports small, medium, large, and extended modes.

### Subpath Import

```javascript
import '@francofantomius/material-components/fab';
```

## Examples

### Sizes and Extended FAB

```html
<md-fab size="small" icon="edit" aria-label="Edit"></md-fab>
<md-fab icon="add" label="New Message"></md-fab>
<md-fab size="large" icon="palette" aria-label="Palette"></md-fab>
<md-fab icon="download" lowered aria-label="Download"></md-fab>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Container dimension |
| `icon` | `string` | `''` | Material Symbols icon name |
| `label` | `string` | `''` | Extended text label (renders extended FAB) |
| `lowered` | `boolean` | `false` | Applies lower elevation level 1 instead of level 3 |
| `disabled` | `boolean` | `false` | Disables button interaction |
| `aria-label` | `string` | `''` | Accessible label |

