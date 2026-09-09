---
title: Progress Indicators
category: Communication & Feedback
icon: autorenew
description: Progress indicators express an unspecified wait time or display the length of a process.
---

## Overview

Progress indicators express an unspecified wait time or display the length of a process with linear and circular variants, indeterminate animations, and M3 wavy shapes.

### Subpath Import

```javascript
import '@francofantomius/material-components/progress';
```

## Examples

### Linear and Circular Progress

```html
<!-- Indeterminate linear progress -->
<md-progress type="linear" indeterminate></md-progress>

<!-- Determinate linear progress -->
<md-progress type="linear" value="0.7"></md-progress>

<!-- Indeterminate circular progress -->
<md-progress type="circular" indeterminate></md-progress>

<!-- Circular with wavy line style -->
<md-progress type="circular" wavy indeterminate></md-progress>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'linear' \| 'circular'` | `'linear'` | Progress indicator geometry |
| `value` | `number` | `0` | Progress value between 0.0 and 1.0 |
| `indeterminate` | `boolean` | `false` | Loops continuous indeterminate animation |
| `wavy` | `boolean` | `false` | Applies M3 Expressive wavy track animation |
| `buffer` | `number` | `1` | Linear secondary buffer value (0.0 to 1.0) |

