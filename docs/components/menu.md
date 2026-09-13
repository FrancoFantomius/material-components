---
title: Menu
category: Surfaces & Containment
icon: menu
description: Menus display a list of choices on temporary surfaces anchored to trigger elements.
---

## Overview

Menus display a list of choices on temporary surfaces anchored to interactive trigger elements, supporting icons, keyboard navigation, and checkmarks.

### Subpath Import

```javascript
import '@francofantomius/material-components/menu';
import '@francofantomius/material-components/menu-item';
```

## Examples

### Anchored Menu

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; min-height: 200px;">
  <div style="position: relative; display: inline-block;">
    <md-menu>
      <md-button slot="trigger" variant="tonal">Options</md-button>
      <md-menu-item icon="edit">Edit File</md-menu-item>
      <md-menu-item icon="content_copy">Duplicate</md-menu-item>
      <md-divider></md-divider>
      <md-menu-item icon="delete">Delete</md-menu-item>
    </md-menu>
  </div>
</div>

```html
<div style="position: relative; display: inline-block;">
  <md-menu>
    <md-button slot="trigger" variant="tonal">Options</md-button>
    <md-menu-item icon="edit">Edit File</md-menu-item>
    <md-menu-item icon="content_copy">Duplicate</md-menu-item>
    <md-divider></md-divider>
    <md-menu-item icon="delete">Delete</md-menu-item>
  </md-menu>
</div>
```

## API Reference

### Properties & Attributes (`md-menu`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Menu visibility state |
| `anchor` | `string` | `''` | ID of the anchor button |
| `position` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Positioning relative to anchor |
| `close-on-outside-click` | `boolean` | `true` | Closes on click outside |
| `close-on-escape` | `boolean` | `true` | Closes on Escape key press |

### `md-menu-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `string` | `''` | Leading Material Symbols icon |
| `trailing-icon` | `string` | `''` | Trailing Material Symbols icon |
| `trailing-text` | `string` | `''` | Keyboard shortcut or supporting text |
| `disabled` | `boolean` | `false` | Disables menu item interaction |
| `value` | `string` | `''` | Item identifier value |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when menu opens |
| `close` | Dispatched when menu closes |
| `select` | Dispatched when an item is selected (`{ item: MdMenuItem, value: string }`) |

