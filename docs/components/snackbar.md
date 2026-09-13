---
title: Snackbar
category: Communication & Feedback
icon: announcement
description: Snackbars inform users of a process that an app has performed or will perform, providing brief messages at the bottom.
---

## Overview

Snackbars inform users of a brief process that an application has performed or will perform, providing brief messages with an optional action button.

### Subpath Import

```javascript
import '@francofantomius/material-components/snackbar';
```

## Examples

### Triggering a Toast

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0;">
  <md-snackbar id="demo-snack" message="File archived successfully" action-label="Undo"></md-snackbar>
  <md-button variant="filled" onclick="document.getElementById('demo-snack').show()">Show Toast</md-button>
</div>

```html
<md-snackbar id="demo-snack" message="File archived successfully" action-label="Undo"></md-snackbar>

<md-button variant="filled" onclick="document.getElementById('demo-snack').show()">Show Toast</md-button>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | `''` | Text message displayed in snackbar |
| `action-label` | `string` | `''` | Optional action button label |
| `timeout` | `number` | `5000` | Auto-dismiss duration in milliseconds |
| `closeable` | `boolean` | `false` | Shows a trailing close cross icon |

### Events

| Name | Description |
| :--- | :--- |
| `action` | Dispatched when action button is tapped |
| `close` | Dispatched when snackbar dismisses |

