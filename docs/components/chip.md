---
title: Chip
category: Inputs & Controls
icon: label
description: Chips help users enter information, make selections, filter content, or trigger actions.
---

## Overview

Chips help users enter information, make selections, filter content, or trigger actions with assist, filter, input, and suggestion variants.

### Subpath Import

```javascript
import '@francofantomius/material-components/chip';
```

## Examples

### Chip Variants

```html
<md-chip-set>
  <md-chip variant="assist" icon="event" label="Add to calendar"></md-chip>
  <md-chip variant="filter" label="Vegetarian" selected></md-chip>
  <md-chip variant="input" label="user@example.com" removeable></md-chip>
  <md-chip variant="suggestion" label="Directions"></md-chip>
</md-chip-set>
```

## API Reference

### Properties & Attributes (`md-chip`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'assist' \| 'filter' \| 'input' \| 'suggestion'` | `'assist'` | Chip functional style |
| `label` | `string` | `''` | Text label displayed in chip |
| `icon` | `string` | `''` | Leading Material Symbols icon |
| `selected` | `boolean` | `false` | Active state (filter chips) |
| `removeable` | `boolean` | `false` | Displays a trailing remove/delete button |
| `disabled` | `boolean` | `false` | Disables chip interactions |
| `elevated` | `boolean` | `false` | Applies elevated style |

### `md-chip-set` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiselect` | `boolean` | `false` | Allows multiple filter chips to be selected |
| `disabled` | `boolean` | `false` | Disables all child chips in the set |

