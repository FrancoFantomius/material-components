# Text Field (`md-text-field`)

Text fields let users enter and edit text. Form-associated and supports validation.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; align-items: stretch; max-width: 400px;">
  <md-text-field label="Filled Field" supporting-text="Enter value"></md-text-field>
  <md-text-field variant="outlined" label="Outlined Field" leading-icon="email" value="user@example.com"></md-text-field>
  <md-text-field variant="outlined" label="With Error" error error-text="Invalid input" value="123"></md-text-field>
</div>

## Import

```typescript
import '@francofantomius/material-components/text-field';
```

## Examples

```html
<!-- Filled (Default) -->
<md-text-field label="Username" name="username" required></md-text-field>

<!-- Outlined -->
<md-text-field variant="outlined" label="Email" type="email" leading-icon="mail"></md-text-field>

<!-- Affixes & Counter -->
<md-text-field
  variant="outlined"
  label="Price"
  prefix-text="$"
  suffix-text=".00"
  maxlength="10"
></md-text-field>

<!-- Error State -->
<md-text-field
  variant="outlined"
  label="Password"
  type="password"
  error
  error-text="Password must be at least 8 characters"
></md-text-field>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Container visual style |
| `label` | `string` | `''` | Floating label text |
| `value` | `string` | `''` | Input current text value |
| `type` | `string` | `'text'` | Input type (text, password, email, number, etc.) |
| `placeholder`| `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Disables input |
| `readonly` | `boolean` | `false` | Read-only mode |
| `required` | `boolean` | `false` | Required constraint for form validation |
| `error` | `boolean` | `false` | Error visual state |
| `error-text` | `string` | `''` | Message to show when in error state |
| `supporting-text` | `string` | `''` | Helper text below input |
| `prefix-text` | `string` | `''` | Text before input value |
| `suffix-text` | `string` | `''` | Text after input value |
| `leading-icon` | `string` | `''` | Material Symbols leading icon |
| `trailing-icon` | `string` | `''` | Material Symbols trailing icon |
| `maxlength` | `number` | `-1` | Maximum character length with counter |

