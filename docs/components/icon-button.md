# Icon Button (`md-icon-button`)

Icon buttons allow users to take actions and make choices with a single tap.

## Interactive Demo

<div class="demo-box">
  <md-icon-button icon="favorite" variant="standard"></md-icon-button>
  <md-icon-button icon="star" variant="filled"></md-icon-button>
  <md-icon-button icon="settings" variant="tonal"></md-icon-button>
  <md-icon-button icon="share" variant="outlined"></md-icon-button>
  <md-icon-button toggle icon="bookmark_border" selected-icon="bookmark"></md-icon-button>
</div>

## Import

```typescript
import '@francofantomius/material-components/icon-button';
```

## Examples

```html
<md-icon-button icon="favorite" variant="standard" aria-label="Favorite"></md-icon-button>
<md-icon-button icon="star" variant="filled" aria-label="Star"></md-icon-button>
<md-icon-button icon="settings" variant="tonal" aria-label="Settings"></md-icon-button>
<md-icon-button icon="share" variant="outlined" aria-label="Share"></md-icon-button>

<!-- Toggle mode -->
<md-icon-button toggle icon="bookmark_border" selected-icon="bookmark"></md-icon-button>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'standard' \| 'filled' \| 'tonal' \| 'outlined'` | `'standard'` | Icon button variant |
| `icon` | `string` | `''` | Material Symbols icon name |
| `selected-icon`| `string` | `''` | Icon to show when toggled / selected |
| `toggle` | `boolean` | `false` | Enables toggleable button behavior |
| `selected` | `boolean` | `false` | Selected state for toggle mode |
| `disabled` | `boolean` | `false` | Disables the button |

