---
title: Top App Bar
category: Navigation
icon: view_stream
description: Top app bars display navigation, screen titles, actions, and overflow menus across the top of screens.
---

## Overview

Top app bars display navigation icons, screen titles, action icons, and overflow menus across the top edge of application screens in small, center-aligned, medium, and large variants.

### Subpath Import

```javascript
import '@francofantomius/material-components/top-app-bar';
```

## Examples

### Variants and Actions

```html
<md-top-app-bar variant="small" headline="Document Title">
  <md-icon-button slot="navigation" icon="arrow_back" aria-label="Back"></md-icon-button>
  <md-icon-button slot="actions" icon="search" aria-label="Search"></md-icon-button>
  <md-icon-button slot="actions" icon="more_vert" aria-label="More options"></md-icon-button>
</md-top-app-bar>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'small' \| 'center' \| 'medium' \| 'large'` | `'small'` | Header typography layout |
| `headline` | `string` | `''` | Screen title text |

### Slots

| Slot Name | Description |
| :--- | :--- |
| `navigation` | Leading navigation icon or back button |
| `headline` | Custom rich headline title |
| `actions` | Trailing action icons and buttons |

