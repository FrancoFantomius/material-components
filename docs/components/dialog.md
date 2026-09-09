---
title: Dialog
category: Surfaces & Containment
icon: picture_in_picture
description: Modal dialogs provide critical information or prompt users to make a decision with a modal backdrop.
---

## Overview

Modal dialogs provide critical information, alert users, or prompt for decisions with a modal backdrop scrim and accessible focus trapping.

### Subpath Import

```javascript
import '@francofantomius/material-components/dialog';
```

## Examples

### Basic Confirmation Dialog

```html
<md-dialog id="demo-dialog" headline="Discard Draft?">
  <p>Are you sure you want to discard your unsaved draft? This action cannot be undone.</p>
  <div slot="actions">
    <md-button variant="text" data-dialog-close>Cancel</md-button>
    <md-button variant="filled" data-dialog-close>Discard</md-button>
  </div>
</md-dialog>

<md-button variant="filled" data-dialog-target="demo-dialog">Open Dialog</md-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Controls open/closed visibility of the dialog |
| `headline` | `string` | `''` | Title headline of the dialog |
| `icon` | `string` | `''` | Leading decorative Material Symbols icon |
| `close-on-outside-click` | `boolean` | `true` | Closes dialog when clicking on the backdrop |
| `close-on-escape` | `boolean` | `true` | Closes dialog when Escape key is pressed |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Body text and dialog content |
| `headline` | Custom rich headline title |
| `icon` | Custom top icon |
| `actions` | Action buttons bar at the bottom |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when dialog opens |
| `close` | Dispatched when dialog closes (`{ action?: string }`) |

