---
title: Radio
category: Inputs & Controls
icon: radio_button_checked
description: Radio buttons allow users to select one option from a set of mutually exclusive choices.
---

## Overview

Radio buttons allow users to select one option from a set of mutually exclusive choices. Use individually or grouped within `<md-radio-group>`.

### Subpath Import

```javascript
import '@francofantomius/material-components/radio';
```

## Examples

### Radio Group

```html
<md-radio-group name="shipping" value="express">
  <md-radio value="standard">Standard Shipping (3-5 days)</md-radio>
  <md-radio value="express">Express Shipping (1-2 days)</md-radio>
  <md-radio value="overnight">Overnight Delivery</md-radio>
</md-radio-group>
```

## API Reference

### Properties & Attributes (`md-radio`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state |
| `disabled` | `boolean` | `false` | Disables radio interaction |
| `value` | `string` | `'on'` | Form submission value |
| `name` | `string` | `''` | Form submission field name |

### `md-radio-group` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `''` | Common name cascaded to all child radio buttons |
| `value` | `string` | `''` | Value of the currently selected radio button |
| `disabled` | `boolean` | `false` | Disables all radio buttons in the group |
| `required` | `boolean` | `false` | Form validation required constraint |

