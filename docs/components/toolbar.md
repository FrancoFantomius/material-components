---
title: Toolbar
category: Actions
icon: more_horiz
description: Material Design 3 Expressive Action Toolbar for housing actions, tools, and controls in floating or docked layouts.
---

## Overview

Material Design 3 Expressive Action Toolbar for housing actions, tools, controls, and integrated floating action buttons in floating island or docked edge-to-edge layouts.

### Subpath Import

```javascript
import '@francofantomius/material-components/toolbar';
```

## Examples

### Floating Action Toolbar

```html
<md-toolbar aria-label="Formatting Actions">
  <md-icon-button icon="format_bold" aria-label="Bold"></md-icon-button>
  <md-icon-button icon="format_italic" aria-label="Italic"></md-icon-button>
  <md-divider vertical></md-divider>
  <md-icon-button icon="format_align_left" aria-label="Align left"></md-icon-button>
  <md-fab slot="fab" size="small" icon="edit" aria-label="Edit"></md-fab>
</md-toolbar>
```

### Docked Bottom Toolbar

```html
<md-toolbar mode="docked" aria-label="Document Controls">
  <div slot="leading">
    <md-icon-button icon="attachment" aria-label="Attach"></md-icon-button>
  </div>
  <div slot="trailing">
    <md-button variant="filled" label="Publish"></md-button>
  </div>
</md-toolbar>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `mode` | `'floating' \| 'docked'` | `'floating'` | Layout mode: floating island or docked bar |
| `docked` | `boolean` | `false` | Shorthand boolean to activate docked mode |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Controls layout orientation |
| `elevated` | `boolean` | `false` | Increases elevation shadow depth |
| `fixed` | `boolean` | `false` | Pins position relative to viewport |
| `dock-position` | `'none' \| 'top' \| 'bottom' \| 'left' \| 'right'` | `'none'` | Viewport edge when docked and fixed |
| `aria-label` | `string` | `''` | Accessible label for screen readers |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Primary action buttons, segmented buttons, switches, and dividers |
| `leading` | Leading navigation or anchor icons |
| `trailing` | Trailing action buttons or overflow menus |
| `fab` / `action` | Slotted Primary Action / Floating Action Button (FAB) |

