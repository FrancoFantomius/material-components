---
title: List
category: Surfaces & Containment
icon: view_list
description: Lists are continuous, vertical indexes of text and images, supporting 1-line, 2-line, and 3-line structured items.
---

## Overview

Lists are continuous, vertical indexes of text and images, supporting single-line, two-line, and three-line structured list items with leading and trailing slots.

### Subpath Import

```javascript
import '@francofantomius/material-components/list';
```

## Examples

### Two-Line List with Icons and Avatars

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; max-width: 480px;">
  <md-list>
    <md-list-item headline="Inbox" supporting-text="3 unread messages" leading-icon="inbox" trailing-icon="chevron_right" interactive></md-list-item>
    <md-list-item headline="Starred" supporting-text="Important conversations" leading-icon="star" trailing-icon="chevron_right" interactive></md-list-item>
    <md-divider></md-divider>
    <md-list-item headline="Trash" leading-icon="delete" interactive></md-list-item>
  </md-list>
</div>

```html
<md-list>
  <md-list-item headline="Inbox" supporting-text="3 unread messages" leading-icon="inbox" trailing-icon="chevron_right"></md-list-item>
  <md-list-item headline="Starred" supporting-text="Important conversations" leading-icon="star" trailing-icon="chevron_right"></md-list-item>
  <md-divider></md-divider>
  <md-list-item headline="Trash" leading-icon="delete"></md-list-item>
</md-list>
```

## API Reference

### Properties & Attributes (`md-list-item`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headline` | `string` | `''` | Primary title text |
| `supporting-text` | `string` | `''` | Secondary description line |
| `leading-icon` | `string` | `''` | Leading Material Symbols icon |
| `trailing-icon` | `string` | `''` | Trailing Material Symbols icon |
| `trailing-supporting-text` | `string` | `''` | Trailing metadata (e.g. timestamp) |
| `interactive` | `boolean` | `false` | Enables click effects and hover layers |
| `disabled` | `boolean` | `false` | Disables list item interaction |
| `href` | `string` | `''` | Hyperlink target |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Body text / custom content |
| `leading` | Custom leading element (avatar, checkbox, thumbnail) |
| `trailing` | Custom trailing element (icon button, badge) |

