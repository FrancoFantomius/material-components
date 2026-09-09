---
title: Side Sheet
category: Surfaces & Containment
icon: view_sidebar
description: Side sheets display secondary content anchored to the left or right side of the screen.
---

## Overview

Side sheets display secondary content anchored to the screen edge, supporting both standard in-flow layouts and modal overlay sheets with backdrop scrim.

### Subpath Import

```javascript
import '@francofantomius/material-components/side-sheet';
```

## Examples

### Standard and Modal Side Sheet

```html
<md-side-sheet id="details-sheet" headline="Order Details" side="right">
  <p>Detailed view of items, delivery addresses, and shipping statuses.</p>
  <div slot="actions">
    <md-button variant="filled" data-sheet-close>Close</md-button>
  </div>
</md-side-sheet>

<md-button variant="outlined" data-dialog-target="details-sheet">View Details</md-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Sheet visibility state |
| `modal` | `boolean` | `false` | Displays modal backdrop scrim overlay |
| `side` | `'left' \| 'right'` | `'right'` | Edge where sheet appears |
| `headline` | `string` | `''` | Header title |
| `close-on-outside-click` | `boolean` | `true` | Closes modal sheet on backdrop click |

### Slots

| Slot Name | Description |
| :--- | :--- |
| *(default)* | Body content |
| `headline` | Custom headline header |
| `actions` | Bottom action buttons |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when side sheet opens |
| `close` | Dispatched when side sheet closes |

