---
title: Navigation Rail
category: Navigation
icon: view_sidebar
description: Navigation rails provide access to primary destinations on mid-sized to large screens.
---

## Overview

Navigation rails provide access to primary destinations on medium to large screens (tablets and desktops), maintaining vertical compact navigation alongside page content.

### Subpath Import

```javascript
import '@francofantomius/material-components/navigation-rail';
import '@francofantomius/material-components/navigation-rail-item';
```

## Examples

### Vertical Navigation Rail

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; min-height: 280px; display: inline-flex;">
  <md-navigation-rail value="starred">
    <md-fab slot="fab" size="small" icon="edit" aria-label="Compose"></md-fab>
    <md-navigation-rail-item value="inbox" icon="inbox" label="Inbox"></md-navigation-rail-item>
    <md-navigation-rail-item value="starred" icon="star" label="Starred"></md-navigation-rail-item>
    <md-navigation-rail-item value="history" icon="history" label="History"></md-navigation-rail-item>
  </md-navigation-rail>
</div>

```html
<md-navigation-rail value="starred">
  <md-fab slot="fab" size="small" icon="edit" aria-label="Compose"></md-fab>
  <md-navigation-rail-item value="inbox" icon="inbox" label="Inbox"></md-navigation-rail-item>
  <md-navigation-rail-item value="starred" icon="star" label="Starred"></md-navigation-rail-item>
  <md-navigation-rail-item value="history" icon="history" label="History"></md-navigation-rail-item>
</md-navigation-rail>
```

## API Reference

### Properties & Attributes (`md-navigation-rail`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Value of the selected destination |

### `md-navigation-rail-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Destination value |
| `icon` | `string` | `''` | Inactive icon |
| `active-icon` | `string` | `''` | Active icon |
| `label` | `string` | `''` | Destination text |
| `badge` | `string` | `''` | Badge text |

### Events

| Name | Description |
| :--- | :--- |
| `change` | Dispatched when a new rail destination is selected (`{ value: string }`) |

