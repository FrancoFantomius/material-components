# Icon (`md-icon`)

Icons visually communicate meaning, actions, and status.

## Interactive Demo

<div class="demo-box">
  <md-icon name="favorite"></md-icon>
  <md-icon name="favorite" filled></md-icon>
  <md-icon name="settings" size="32"></md-icon>
  <md-icon name="rocket_launch" size="48"></md-icon>
</div>

## Import

```typescript
import '@francofantomius/material-components/icon';
```

## Examples

```html
<!-- Material Symbols by Name -->
<md-icon name="search"></md-icon>

<!-- Filled Variation -->
<md-icon name="star" filled></md-icon>

<!-- Custom Size -->
<md-icon name="check" size="32"></md-icon>

<!-- Slotted SVG -->
<md-icon>
  <svg viewBox="0 0 24 24">
    <path d="M12 2L2 22h20L12 2z"/>
  </svg>
</md-icon>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | `''` | Material Symbols font icon name |
| `filled` | `boolean` | `false` | Enables filled variation in variable font |
| `size` | `string` | `''` | Custom size (e.g., `'32'` or `'2rem'`) |

