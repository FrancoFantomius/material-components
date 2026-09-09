---
title: Time Picker
category: Inputs & Controls
icon: schedule
description: Time pickers help users select and set a specific time using a 12h or 24h clock dial or direct text inputs.
---

## Overview

Time pickers help users select and set a specific time using a clock dial or direct text inputs, supporting both 12-hour AM/PM and 24-hour formats in modal or docked presentations.

### Subpath Import

```javascript
import '@francofantomius/material-components/time-picker';
```

## Examples

### 24h and 12h Pickers

```html
<md-time-picker format="24h" value="14:30" label="Select Departure Time"></md-time-picker>
<md-time-picker format="12h" value="09:15 AM" label="Meeting Start"></md-time-picker>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Selected time string |
| `format` | `'12h' \| '24h'` | `'12h'` | Time display and selection format |
| `label` | `string` | `'Select time'` | Picker title label |
| `modal` | `boolean` | `false` | Displays in modal dialog presentation |
| `disabled` | `boolean` | `false` | Disables time picker interaction |
| `name` | `string` | `''` | Form submission field name |
| `required` | `boolean` | `false` | Form validation required constraint |

