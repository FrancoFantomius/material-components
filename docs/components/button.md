# Button (`md-button`)

Buttons help users initiate actions with various levels of emphasis.

## Interactive Demo

<div class="demo-box">
  <md-button variant="filled">Filled</md-button>
  <md-button variant="elevated">Elevated</md-button>
  <md-button variant="tonal">Tonal</md-button>
  <md-button variant="outlined">Outlined</md-button>
  <md-button variant="text">Text</md-button>
  <md-button variant="filled" icon="send">With Icon</md-button>
  <md-button loading>Loading</md-button>
</div>

## Import

```typescript
import '@francofantomius/material-components/button';
```

## Examples

```html
<!-- Variants -->
<md-button variant="filled">Filled</md-button>
<md-button variant="elevated">Elevated</md-button>
<md-button variant="tonal">Tonal</md-button>
<md-button variant="outlined">Outlined</md-button>
<md-button variant="text">Text</md-button>

<!-- With Icon -->
<md-button variant="filled" icon="add">Create</md-button>
<md-button variant="outlined" trailing-icon="arrow_forward">Next</md-button>

<!-- Loading State -->
<md-button loading>Processing</md-button>

<!-- Link Mode -->
<md-button href="https://example.com" target="_blank">External Link</md-button>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'filled' \| 'elevated' \| 'tonal' \| 'outlined' \| 'text'` | `'filled'` | Visual emphasis style |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `icon` | `string` | `''` | Material Symbols leading icon name |
| `trailing-icon` | `string` | `''` | Material Symbols trailing icon name |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type for forms |
| `href` | `string` | `''` | When present, renders as an `<a>` element |
| `target` | `string` | `''` | Target frame for navigation |

