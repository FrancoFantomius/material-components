---
title: FAB Menu
category: Actions
icon: menu_open
description: A Floating Action Button Menu (Speed Dial) expands into a stack of contextual sub-actions with labels and modal scrim.
---

## Overview

A Floating Action Button Menu (FAB Menu / Speed Dial) expands a primary FAB into a stack of contextual sub-actions with text labels, animated transitions, and optional modal scrim overlay.

### Subpath Import

```javascript
import '@francofantomius/material-components/fab-menu';
import '@francofantomius/material-components/fab-menu-item';
```

## Examples

### Upward Speed Dial

```html
<md-fab-menu icon="add">
  <md-fab-menu-item icon="edit" label="Create Post" value="post"></md-fab-menu-item>
  <md-fab-menu-item icon="photo_camera" label="Upload Photo" value="photo"></md-fab-menu-item>
  <md-fab-menu-item icon="videocam" label="Go Live" value="live"></md-fab-menu-item>
</md-fab-menu>
```

### Modal FAB Menu with Scrim

```html
<md-fab-menu modal icon="add" label="Actions">
  <md-fab-menu-item icon="mail" label="New Message" value="email"></md-fab-menu-item>
  <md-fab-menu-item icon="event" label="Schedule Event" value="event"></md-fab-menu-item>
</md-fab-menu>
```

## API Reference

### Properties & Attributes (`md-fab-menu`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Whether the menu stack is open |
| `modal` | `boolean` | `false` | Displays a scrim backdrop overlay behind the open menu |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | `'up'` | Direction the sub-action stack expands |
| `icon` | `string` | `'add'` | Material Symbols icon for the trigger FAB |
| `open-icon` | `string` | `''` | Optional distinct icon shown when opened |
| `label` | `string` | `''` | Extended text label for the trigger FAB |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Trigger FAB button size |
| `lowered` | `boolean` | `false` | Applies lower elevation level 1 instead of level 3 |
| `disabled` | `boolean` | `false` | Disables menu trigger and interactions |
| `close-on-item-click` | `boolean` | `true` | Automatically closes menu when a sub-item is clicked |
| `close-on-outside-click` | `boolean` | `true` | Automatically closes menu when clicking outside |

### `md-fab-menu-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `icon` | `string` | `''` | Material Symbols icon name for the sub-action |
| `label` | `string` | `''` | Text label displayed beside the mini-FAB |
| `label-placement` | `'start' \| 'end' \| 'top' \| 'bottom'` | `'start'` | Positioning of the label pill relative to the sub-FAB |
| `disabled` | `boolean` | `false` | Disables sub-action item interactions |
| `value` | `string` | `''` | Value or identifier for the action |
| `size` | `'small' \| 'medium'` | `'small'` | Size of the mini-FAB button |
| `lowered` | `boolean` | `false` | Lower elevation level |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when the FAB menu opens |
| `close` | Dispatched when the FAB menu closes |
| `toggle` | Dispatched when the menu toggles open/close state (`{ open: boolean }`) |
| `action` | Dispatched when a sub-action item is activated (`{ item: MdFabMenuItem, value: string, label: string }`) |
| `scrim-click` | Dispatched when modal scrim backdrop is clicked |

