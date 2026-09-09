---
title: Segmented Button
category: Actions
icon: view_week
description: Segmented buttons help users select options, switch views, or sort elements in compact single or multi-select groups.
---

## Overview

Segmented buttons help users select options, switch views, or sort elements in compact single-select or multi-select groups according to Material Design 3 specifications.

### Subpath Import

```javascript
import '@francofantomius/material-components/segmented-button';
```

## Examples

### Single Select View Filter

```html
<md-segmented-button-set>
  <md-segmented-button selected label="Songs"></md-segmented-button>
  <md-segmented-button label="Albums"></md-segmented-button>
  <md-segmented-button label="Podcasts"></md-segmented-button>
</md-segmented-button-set>
```

### Multi-Select Formatting Buttons

```html
<md-segmented-button-set multiselect>
  <md-segmented-button icon="format_bold" label="Bold" selected></md-segmented-button>
  <md-segmented-button icon="format_italic" label="Italic"></md-segmented-button>
  <md-segmented-button icon="format_underlined" label="Underline"></md-segmented-button>
</md-segmented-button-set>
```

## API Reference

### Properties & Attributes (`md-segmented-button-set`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `multiselect` | `boolean` | `false` | Enables multi-selection mode across segments |
| `disabled` | `boolean` | `false` | Disables all child segmented buttons in the set |

### `md-segmented-button` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `boolean` | `false` | Active selection state of the segment |
| `disabled` | `boolean` | `false` | Disables segment interactions |
| `value` | `string` | `''` | Value associated with the segment |
| `label` | `string` | `''` | Label text of the segment |
| `icon` | `string` | `''` | Leading Material Symbols icon name |
| `no-checkmark` | `boolean` | `false` | Hides the automatic checkmark indicator when selected |

