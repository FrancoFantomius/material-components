---
title: Divider
category: Surfaces & Containment
icon: horizontal_rule
description: Dividers group content in lists and layouts with clean thin horizontal or vertical rule lines.
---

## Overview

Dividers group content in lists and page layouts with clean thin horizontal or vertical rule lines, supporting middle or inset alignments.

### Subpath Import

```javascript
import '@francofantomius/material-components/divider';
```

## Examples

### Horizontal and Vertical Dividers

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; max-width: 480px;">
  <p style="margin: 0 0 12px 0;">Item above divider</p>
  <md-divider></md-divider>
  <p style="margin: 12px 0;">Item below divider</p>
  <md-divider inset></md-divider>
  <p style="margin: 12px 0 0 0;">Item below inset divider</p>
</div>

```html
<p>Item above divider</p>
<md-divider></md-divider>
<p>Item below divider</p>

<!-- Inset Divider -->
<md-divider inset></md-divider>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `vertical` | `boolean` | `false` | Renders as a vertical separator |
| `inset` | `boolean` | `false` | Adds 16px start inset margin |
| `middle-inset` | `boolean` | `false` | Adds 16px inset margin on both sides |

