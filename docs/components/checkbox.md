---
title: Checkbox
category: Inputs & Controls
icon: check_box
description: Checkboxes allow users to select one or more items from a set, or toggle between checked, unchecked, and indeterminate states.
---

## Overview

Checkboxes allow users to select one or more items from a set, or toggle between checked, unchecked, and indeterminate states. Fully supports Form-Associated Custom Elements (FACE).

### Subpath Import

```javascript
import '@francofantomius/material-components/checkbox';
```

## Examples

### Checkbox States

```html
<md-checkbox checked>Receive email updates</md-checkbox>
<md-checkbox indeterminate>Select all items</md-checkbox>
<md-checkbox disabled>Disabled option</md-checkbox>
<md-checkbox error>Must agree before proceeding</md-checkbox>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Indeterminate (mixed) state |
| `disabled` | `boolean` | `false` | Disables checkbox interaction |
| `error` | `boolean` | `false` | Error visual state |
| `value` | `string` | `'on'` | Form submission value |
| `name` | `string` | `''` | Form submission field name |
| `required` | `boolean` | `false` | Form validation required constraint |

