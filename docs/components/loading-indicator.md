---
title: Loading Indicator
category: Communication & Feedback
icon: pending
description: Contained and morphing shape loading indicator for short wait times.
---

## Overview

Loading indicators display engaging shape morphing animations or contained badges to indicate short wait times during content fetching or processing.

### Subpath Import

```javascript
import '@francofantomius/material-components/loading-indicator';
```

## Examples

### Morphing Loading Indicator

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 32px; align-items: center; flex-wrap: wrap;">
  <md-loading-indicator></md-loading-indicator>
  <md-loading-indicator contained></md-loading-indicator>
</div>

```html
<md-loading-indicator></md-loading-indicator>
<md-loading-indicator contained></md-loading-indicator>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `contained` | `boolean` | `false` | Renders inside an elevated circular surface container |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Dimension of the indicator |

