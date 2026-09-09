---
title: Tabs
category: Navigation
icon: tab
description: Tabs organize content across different screens, data sets, and other interactions with a sliding active indicator.
---

## Overview

Tabs organize content across distinct screens, views, or datasets with smooth sliding active indicator animations and primary or secondary styles.

### Subpath Import

```javascript
import '@francofantomius/material-components/tabs';
```

## Examples

### Primary Tabs

```html
<md-tabs value="flights">
  <md-tab value="flights" icon="flight" label="Flights"></md-tab>
  <md-tab value="hotels" icon="hotel" label="Hotels"></md-tab>
  <md-tab value="cars" icon="directions_car" label="Cars"></md-tab>
</md-tabs>
```

## API Reference

### Properties & Attributes (`md-tabs`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Value of the actively selected tab |
| `variant` | `'primary' \| 'secondary'` | `'primary'` | Visual indicator and active tab style |

### `md-tab` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Tab identifier |
| `icon` | `string` | `''` | Material Symbols icon name |
| `label` | `string` | `''` | Text label |
| `badge` | `string` | `''` | Notification count badge |

### Events

| Name | Description |
| :--- | :--- |
| `change` | Dispatched when active tab changes (`{ value: string }`) |

