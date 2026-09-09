---
title: Bottom Sheet
category: Surfaces & Containment
icon: call_to_action
description: Bottom sheets display supplementary content anchored to the bottom edge of the screen with drag handle gestures.
---

## Overview

Bottom sheets display supplementary content anchored to the bottom edge of the screen, supporting standard and modal overlay presentations with drag gestures.

### Subpath Import

```javascript
import '@francofantomius/material-components/bottom-sheet';
```

## Examples

### Modal Bottom Sheet

```html
<md-bottom-sheet id="share-sheet" headline="Share with friends" modal>
  <div style="display: flex; gap: 16px; padding: 16px 0;">
    <md-icon-button icon="link" aria-label="Copy link"></md-icon-button>
    <md-icon-button icon="mail" aria-label="Email"></md-icon-button>
    <md-icon-button icon="chat" aria-label="Message"></md-icon-button>
  </div>
</md-bottom-sheet>

<md-button variant="tonal" data-dialog-target="share-sheet">Share</md-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Sheet open/closed visibility |
| `modal` | `boolean` | `false` | Displays modal scrim backdrop |
| `headline` | `string` | `''` | Header title |
| `drag-handle` | `boolean` | `true` | Shows top drag handle indicator |
| `close-on-outside-click` | `boolean` | `true` | Closes modal sheet on backdrop tap |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Body content |
| `headline` | Custom header title |
| `actions` | Bottom action buttons |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when bottom sheet opens |
| `close` | Dispatched when bottom sheet closes |

