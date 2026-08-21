# Radio & Radio Group (`md-radio`)

Radio buttons allow users to select one option from a set with mutual exclusion.

## Interactive Demo

<div class="demo-box">
  <md-radio-group row name="demo-radio" value="b">
    <md-radio value="a">Option A</md-radio>
    <md-radio value="b">Option B</md-radio>
    <md-radio value="c" disabled>Option C</md-radio>
  </md-radio-group>
</div>

## Import

```typescript
import '@francofantomius/material-components/radio';
```

## Examples

```html
<md-radio-group name="shipping" value="express">
  <md-radio value="standard">Standard (3-5 days)</md-radio>
  <md-radio value="express">Express (Next day)</md-radio>
  <md-radio value="same-day">Same day delivery</md-radio>
</md-radio-group>
```

## Properties

### `md-radio-group`
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `''` | Group name |
| `value` | `string` | `''` | Currently selected radio value |
| `row` | `boolean` | `false` | Horizontal layout |

### `md-radio`
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `checked` | `boolean` | `false` | Checked state |
| `value` | `string` | `'on'` | Value submitted with form |
| `disabled` | `boolean` | `false` | Disables radio |

