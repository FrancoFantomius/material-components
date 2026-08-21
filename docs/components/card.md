# Card (`md-card`)

Cards contain content and actions about a single subject.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; max-width: 360px;">
  <md-card variant="outlined" interactive>
    <div slot="header">
      <h3 style="margin:0; font-size: 18px;">Outlined Card</h3>
    </div>
    Interactive Material 3 card container with ripple effect.
    <div slot="actions">
      <md-button variant="text">Dismiss</md-button>
      <md-button variant="filled">Open</md-button>
    </div>
  </md-card>
</div>

## Import

```typescript
import '@francofantomius/material-components/card';
```

## Examples

```html
<!-- Elevated (Default) -->
<md-card variant="elevated">
  <div slot="header"><h3>Card Header</h3></div>
  Card body content here.
  <div slot="actions"><md-button variant="filled">Action</md-button></div>
</md-card>

<!-- Outlined Interactive Card -->
<md-card variant="outlined" interactive href="/details">
  Clickable card navigating to details.
</md-card>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'elevated' \| 'filled' \| 'outlined'` | `'elevated'` | Card visual style |
| `interactive` | `boolean` | `false` | Enables ripple and hover elevation |
| `disabled` | `boolean` | `false` | Disables interactive card |
| `href` | `string` | `''` | Renders as anchor link |
| `target` | `string` | `''` | Target attribute when `href` is used |

