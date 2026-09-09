---
title: Button Group
category: Actions
icon: join_left
description: Button groups organize related action buttons into cohesive sets with standard or connected shape-shifting layouts.
---

## Overview

Button groups organize related action buttons into cohesive sets with standard or connected shape-shifting layouts according to Material Design 3 specifications.

### Subpath Import

```javascript
import '@francofantomius/material-components/button-group';
```

## Examples

### Standard Button Group

```html
<md-button-group>
  <md-button variant="outlined" icon="edit">Edit</md-button>
  <md-button variant="outlined" icon="content_copy">Copy</md-button>
  <md-button variant="filled" icon="share">Share</md-button>
</md-button-group>
```

### Connected Shape-Shifting Group

```html
<md-button-group connected variant="outlined">
  <md-button icon="format_align_left">Left</md-button>
  <md-button icon="format_align_center">Center</md-button>
  <md-button icon="format_align_right">Right</md-button>
</md-button-group>
```

### Vertical Connected Group

```html
<md-button-group connected orientation="vertical" variant="outlined">
  <md-button icon="zoom_in">Zoom In</md-button>
  <md-button icon="zoom_out">Zoom Out</md-button>
  <md-button icon="fit_screen">Reset</md-button>
</md-button-group>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Layout orientation of the button group |
| `connected` | `boolean` | `false` | Connects adjacent buttons with seamless shared borders and shape-shifting corner radii |
| `shape` | `'pill' \| 'rounded' \| 'square'` | `'pill'` | Corner shape morphing style when connected |
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined' \| 'text'` | `''` | Cascades a visual emphasis style to child buttons |
| `full-width` | `boolean` | `false` | Stretches child buttons evenly across the container width |
| `disabled` | `boolean` | `false` | Disables all child buttons in the group |

