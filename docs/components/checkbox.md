# Checkbox (`md-checkbox`)

Checkboxes allow users to select one or more items from a set.

## Interactive Demo

<div class="demo-box">
  <md-checkbox checked>Checked</md-checkbox>
  <md-checkbox indeterminate>Indeterminate</md-checkbox>
  <md-checkbox>Unchecked</md-checkbox>
  <md-checkbox disabled checked>Disabled</md-checkbox>
</div>

## Import

```typescript
import '@francofantomius/material-components/checkbox';
```

## Examples

```html
<md-checkbox name="subscribe" checked>Subscribe to newsletter</md-checkbox>
<md-checkbox name="all" indeterminate>Select all</md-checkbox>
<md-checkbox name="terms" required error>Accept terms</md-checkbox>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state |
| `indeterminate` | `boolean` | `false` | Partially selected state |
| `disabled` | `boolean` | `false` | Disables checkbox |
| `required` | `boolean` | `false` | Form validation constraint |
| `error` | `boolean` | `false` | Error visual state |
| `name` | `string` | `''` | Form field name |
| `value` | `string` | `'on'` | Form submitted value |

