---
title: Date Picker
category: Inputs & Controls
icon: calendar_today
description: Date pickers let users select a date or date range through an interactive calendar interface.
---

## Overview

Date pickers let users select a date or date range through an interactive calendar grid, supporting month/year dropdown navigation, min/max constraints, and modal or docked presentations.

### Subpath Import

```javascript
import '@francofantomius/material-components/date-picker';
```

## Examples

### Date Selection

```html
<md-date-picker label="Event Date" value="2026-09-15"></md-date-picker>
<md-date-picker modal label="Scheduled Flight" min="2026-01-01" max="2026-12-31"></md-date-picker>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | ISO date string (`YYYY-MM-DD`) |
| `label` | `string` | `'Select date'` | Header title label |
| `min` | `string` | `''` | Earliest selectable date |
| `max` | `string` | `''` | Latest selectable date |
| `modal` | `boolean` | `false` | Renders inside a modal dialog |
| `disabled` | `boolean` | `false` | Disables date picker interaction |
| `name` | `string` | `''` | Form submission field name |
| `required` | `boolean` | `false` | Form validation required constraint |

### Events

| Name | Description |
| :--- | :--- |
| `change` | Dispatched when a new date is selected (`{ value: string }`) |
| `open` | Dispatched when the modal calendar opens |
| `close` | Dispatched when the modal calendar closes |

