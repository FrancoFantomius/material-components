---
title: Badge
category: Communication & Feedback
icon: notification_important
description: Badges show notifications, counts, or status information on icons or navigation elements.
---

## Overview

Badges show notifications, counts, or status information anchored to icons, tabs, or navigation elements in small dot or numeric label formats.

### Subpath Import

```javascript
import '@francofantomius/material-components/badge';
```

## Examples

### Dot and Numeric Badges

```html
<div style="position: relative; display: inline-block;">
  <md-icon name="mail"></md-icon>
  <md-badge value="3"></md-badge>
</div>

<div style="position: relative; display: inline-block; margin-left: 24px;">
  <md-icon name="notifications"></md-icon>
  <md-badge></md-badge>
</div>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string \| number` | `''` | Value displayed inside badge (omitted for small dot badge) |
| `max` | `number` | `999` | Maximum number before truncation (e.g. 99+) |

