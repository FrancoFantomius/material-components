---
title: Switch
category: Inputs & Controls
icon: toggle_on
description: Switches toggle the state of a single item on or off with optional thumb icons.
---

## Overview

Switches toggle the state of a single setting on or off, featuring animated track and thumb transitions and optional leading check/cross icons.

### Subpath Import

```javascript
import '@francofantomius/material-components/switch';
```

## Examples

### Switch Configurations

```html
<md-switch selected>Wi-Fi</md-switch>
<md-switch selected icons>Bluetooth with Icons</md-switch>
<md-switch disabled>Airplane Mode (Disabled)</md-switch>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `boolean` | `false` | Active on/off state of the switch |
| `icons` | `boolean` | `false` | Shows check/cross icons inside the thumb |
| `show-only-selected-icon` | `boolean` | `false` | Shows icon only when selected |
| `disabled` | `boolean` | `false` | Disables switch interaction |
| `name` | `string` | `''` | Form submission field name |
| `value` | `string` | `'on'` | Form submission value |

