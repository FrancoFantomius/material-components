---
title: Navigation Drawer
category: Navigation
icon: menu_open
description: Navigation drawers provide ergonomic access to destinations in your app in modal or standard presentation.
---

## Overview

Navigation drawers provide ergonomic access to app destinations, supporting standard permanently visible layouts on desktop and modal drawers with backdrop scrim on mobile.

### Subpath Import

```javascript
import '@francofantomius/material-components/navigation-drawer';
```

## Examples

### Navigation Drawer Setup

```html
<md-navigation-drawer id="app-drawer" headline="My Application">
  <md-navigation-drawer-item icon="inbox" label="Inbox" active></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="send" label="Outbox"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="favorite" label="Favorites"></md-navigation-drawer-item>
</md-navigation-drawer>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Drawer visibility state |
| `modal` | `boolean` | `false` | Modal overlay presentation with backdrop scrim |
| `headline` | `string` | `''` | Optional drawer headline |
| `close-on-outside-click` | `boolean` | `true` | Closes modal drawer on backdrop tap |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when drawer opens |
| `close` | Dispatched when drawer closes |

