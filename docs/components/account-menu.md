---
title: Account Menu
category: Navigation
icon: account_circle
description: Account switcher, credentials, security, and storage popover for multi-account web applications.
---

## Overview

Account menus provide a rich popover interface for profile avatars, account switching, credential management, security controls, and storage meters.

### Subpath Import

```javascript
import '@francofantomius/material-components/account-menu';
```

## Examples

### Account Switcher Popover

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0; min-height: 200px;">
  <div style="position: relative; display: inline-block;">
    <md-icon-button id="avatar-btn" icon="account_circle" aria-label="Account Profile" onclick="this.nextElementSibling.open = !this.nextElementSibling.open"></md-icon-button>
    <md-account-menu
      anchor="avatar-btn"
      name="Alice Smith"
      email="alice.smith@example.com"
    ></md-account-menu>
  </div>
</div>

```html
<div style="position: relative; display: inline-block;">
  <md-icon-button id="avatar-btn" icon="account_circle" aria-label="Account Profile"></md-icon-button>
  <md-account-menu
    anchor="avatar-btn"
    name="Alice Smith"
    email="alice.smith@example.com"
  ></md-account-menu>
</div>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Visibility state of popover |
| `anchor` | `string` | `''` | ID of trigger avatar button |
| `name` | `string` | `''` | Primary account user name |
| `email` | `string` | `''` | Primary account email address |
| `avatar` | `string` | `''` | Avatar image URL |

### Events

| Name | Description |
| :--- | :--- |
| `open` | Dispatched when account menu opens |
| `close` | Dispatched when account menu closes |
| `sign-out` | Dispatched when sign out button is clicked |
| `switch-account` | Dispatched when another account profile is selected |

