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

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; display: flex; gap: 24px; align-items: center; flex-wrap: wrap;">
  <md-switch selected>Wi-Fi</md-switch>
  <md-switch selected icons>Bluetooth with Icons</md-switch>
  <md-switch disabled>Airplane Mode (Disabled)</md-switch>
</div>

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

