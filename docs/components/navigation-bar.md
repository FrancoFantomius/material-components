---
title: Navigation Bar
category: Navigation
icon: view_stream
description: Bottom navigation bars allow users to navigate between three to five top-level destinations on mobile.
---

## Overview

Bottom navigation bars allow users to switch between three to five primary destinations on mobile and tablet screens, featuring active indicator pills and badges.

### Subpath Import

```javascript
import '@francofantomius/material-components/navigation-bar';
import '@francofantomius/material-components/navigation-bar-item';
```

## Examples

### Bottom Navigation Bar

```html
<md-navigation-bar value="home">
  <md-navigation-bar-item value="home" icon="home" label="Home"></md-navigation-bar-item>
  <md-navigation-bar-item value="search" icon="search" label="Search"></md-navigation-bar-item>
  <md-navigation-bar-item value="notifications" icon="notifications" label="Alerts" badge="5"></md-navigation-bar-item>
  <md-navigation-bar-item value="profile" icon="person" label="Profile"></md-navigation-bar-item>
</md-navigation-bar>
```

## API Reference

### Properties & Attributes (`md-navigation-bar`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Value of the actively selected destination item |
| `hide-inactive-labels` | `boolean` | `false` | Hides labels on inactive items until selected |

### `md-navigation-bar-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Item identifier |
| `icon` | `string` | `''` | Inactive icon name |
| `active-icon` | `string` | `''` | Active icon name |
| `label` | `string` | `''` | Destination title label |
| `badge` | `string` | `''` | Badge text or notification count |
| `href` | `string` | `''` | Optional anchor link |

### Events

| Name | Description |
| :--- | :--- |
| `change` | Dispatched when a new destination is selected (`{ value: string }`) |

