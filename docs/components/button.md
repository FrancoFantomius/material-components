---
title: Button
category: Actions
icon: smart_button
description: Buttons help users initiate actions and choices with five distinct levels of visual emphasis.
---

## Overview

Buttons help users initiate actions and choices with five distinct levels of visual emphasis: filled, elevated, tonal, outlined, and text.

### Subpath Import

```javascript
import '@francofantomius/material-components/button';
```

## Examples

### Button Variants

Five distinct emphasis levels for guiding user priority.

```html
<md-button variant="filled">Filled</md-button>
<md-button variant="elevated">Elevated</md-button>
<md-button variant="tonal">Tonal</md-button>
<md-button variant="outlined">Outlined</md-button>
<md-button variant="text">Text</md-button>
```

### Icons and Loading State

Buttons with leading icons, trailing icons, and loading spinners.

```html
<md-button variant="filled" icon="add">Create New</md-button>
<md-button variant="outlined" trailing-icon="arrow_forward">Next Step</md-button>
<md-button variant="tonal" loading>Saving...</md-button>
```

### Link Mode

Renders an accessible hyperlink while maintaining button styling.

```html
<md-button variant="outlined" href="https://material.io" target="_blank" trailing-icon="open_in_new">
  Material Design Docs
</md-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'` | Visual emphasis style of the button |
| `disabled` | `boolean` | `false` | Whether the button is interactive or disabled |
| `loading` | `boolean` | `false` | Displays an internal circular progress spinner and disables click |
| `icon` | `string` | `''` | Leading Material Symbols icon name |
| `trailing-icon` | `string` | `''` | Trailing Material Symbols icon name |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML form button type |
| `href` | `string` | `''` | When provided, renders as an accessible anchor link |
| `target` | `string` | `''` | Link target attribute (e.g., `_blank`) |

