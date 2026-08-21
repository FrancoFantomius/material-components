# Switch (`md-switch`)

Switches toggle the state of a single setting on or off.

## Interactive Demo

<div class="demo-box">
  <md-switch selected icons>WiFi</md-switch>
  <md-switch>Bluetooth</md-switch>
  <md-switch disabled>Airplane Mode</md-switch>
</div>

## Import

```typescript
import '@francofantomius/material-components/switch';
```

## Examples

```html
<md-switch name="notifications" selected>Notifications</md-switch>
<md-switch name="darkmode" icons>Theme</md-switch>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `selected` | `boolean` | `false` | On/Off toggle state |
| `icons` | `boolean` | `false` | Displays check/cross icon inside thumb |
| `disabled` | `boolean` | `false` | Disables the switch |
| `name` | `string` | `''` | Form field name |
| `value` | `string` | `'on'` | Form submitted value |

