---
title: App Drawer
category: Navigation
icon: apps
description: Popover application grid launcher with drag reordering and category grouping.
---

## Overview

App Drawers provide an accessible application grid launcher with smooth drag-and-drop reordering, badge counters, and category groupings inspired by modern workspace launchers.

### Subpath Import

```javascript
import '@francofantomius/material-components/app-drawer';
import '@francofantomius/material-components/app-drawer-item';
```

## Examples

### Apps Launcher Grid

```html
<div style="position: relative; display: inline-block;">
  <md-icon-button id="app-btn" icon="apps" aria-label="Open App Launcher"></md-icon-button>
  <md-app-drawer anchor="app-btn">
    <md-app-drawer-item icon="mail" label="Mail" badge="12"></md-app-drawer-item>
    <md-app-drawer-item icon="calendar_today" label="Calendar"></md-app-drawer-item>
    <md-app-drawer-item icon="description" label="Docs"></md-app-drawer-item>
    <md-app-drawer-item icon="folder" label="Drive"></md-app-drawer-item>
  </md-app-drawer>
</div>
```

## API Reference

### Properties & Attributes (`md-app-drawer`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Visibility state of launcher popover |
| `anchor` | `string` | `''` | ID of anchor trigger button |
| `headline` | `string` | `'Apps'` | Header title |

### `md-app-drawer-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `string` | `''` | App icon name |
| `label` | `string` | `''` | App name label |
| `badge` | `string` | `''` | Notification count badge |
| `href` | `string` | `''` | Target application URL |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when app drawer opens |
| `close` | Dispatched when app drawer closes |
| `select` | Dispatched when an app icon is clicked |

