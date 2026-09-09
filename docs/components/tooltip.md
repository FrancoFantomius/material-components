---
title: Tooltip
category: Communication & Feedback
icon: info
description: Plain and rich tooltips provide informative text when users hover, focus, or tap an element.
---

## Overview

Tooltips display informative, contextual labels or rich cards when users hover, focus, or long-press an element, supporting directional positioning and delay controls.

### Subpath Import

```javascript
import '@francofantomius/material-components/tooltip';
```

## Examples

### Plain and Rich Tooltips

```html
<div style="display: flex; gap: 24px; align-items: center;">
  <span id="target-icon">
    <md-icon-button icon="help_outline" aria-label="Help"></md-icon-button>
  </span>
  <md-tooltip anchor="target-icon" position="top">Need help? Click to open guide.</md-tooltip>
</div>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `anchor` | `string` | `''` | ID of the anchor target element |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | Directional placement relative to anchor |
| `delay` | `number` | `300` | Show delay in milliseconds |
| `rich` | `boolean` | `false` | Enables rich card presentation with actions |

### Events

| Name | Description |
| :--- | :--- |
| `show` | Dispatched when tooltip becomes visible |
| `hide` | Dispatched when tooltip hides |

