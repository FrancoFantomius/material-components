# Badge (`md-badge`)

Badges show notifications, counts, or status information on icons or navigation elements.

## Interactive Demo

<div class="demo-box">
  <md-badge value="3">
    <md-icon-button icon="mail"></md-icon-button>
  </md-badge>
  <md-badge value="99+">
    <md-icon-button icon="notifications"></md-icon-button>
  </md-badge>
  <md-badge dot>
    <md-icon-button icon="chat"></md-icon-button>
  </md-badge>
</div>

## Import

```typescript
import '@francofantomius/material-components/badge';
```

## Examples

```html
<!-- Numeric Count Badge -->
<md-badge value="5">
  <md-icon-button icon="shopping_cart"></md-icon-button>
</md-badge>

<!-- Small Dot Badge -->
<md-badge dot>
  <md-icon-button icon="notifications"></md-icon-button>
</md-badge>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `string` | `''` | Value to show in the badge |
| `dot` | `boolean` | `false` | Shows a small 6px dot without text |

