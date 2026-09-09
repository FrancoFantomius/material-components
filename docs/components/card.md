---
title: Card
category: Surfaces & Containment
icon: dashboard
description: Cards contain content and actions about a single subject, supporting elevated, filled, and outlined variants.
---

## Overview

Cards contain content and actions about a single subject, supporting elevated, filled, and outlined variants, ripple interaction states, and flexible slot layout.

### Subpath Import

```javascript
import '@francofantomius/material-components/card';
```

## Examples

### Card Variants

```html
<!-- Elevated Card -->
<md-card variant="elevated">
  <h3>Elevated Card</h3>
  <p>Uses depth shadow level 1 for subtle elevation above the background.</p>
  <div slot="actions">
    <md-button variant="filled">Action</md-button>
  </div>
</md-card>

<!-- Filled Card -->
<md-card variant="filled">
  <h3>Filled Card</h3>
  <p>Uses a distinctive surface-container-highest tone.</p>
</md-card>

<!-- Outlined Card -->
<md-card variant="outlined">
  <h3>Outlined Card</h3>
  <p>Clean border outline for high contrast interfaces.</p>
</md-card>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | Card visual container style |
| `interactive` | `boolean` | `false` | Enables click handlers, cursor pointer, and ripple |
| `disabled` | `boolean` | `false` | Disables interactive card states |
| `href` | `string` | `''` | When specified, acts as an anchor link |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Main body content of the card |
| `header` | Card header, title, or avatar bar |
| `media` | Card media, featured image, or video |
| `actions` | Action buttons bar at the bottom of the card |

