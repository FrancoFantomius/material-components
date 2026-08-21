# Divider (`md-divider`)

A divider is a thin line that groups content in lists and layouts.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; width: 100%; max-width: 400px; gap: 12px;">
  <div>Item Above</div>
  <md-divider></md-divider>
  <div>Item Below</div>
  <md-divider inset></md-divider>
  <div>Inset Item Below</div>
</div>

## Import

```typescript
import '@francofantomius/material-components/divider';
```

## Examples

```html
<!-- Full Width -->
<md-divider></md-divider>

<!-- Inset (Margins on both sides) -->
<md-divider inset></md-divider>

<!-- Inset Start only -->
<md-divider inset-start></md-divider>

<!-- Vertical Divider -->
<div style="display: flex; height: 32px;">
  <span>Left</span>
  <md-divider vertical></md-divider>
  <span>Right</span>
</div>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `vertical` | `boolean` | `false` | Renders a vertical divider |
| `inset` | `boolean` | `false` | Adds 16px inset margins |
| `inset-start` | `boolean` | `false` | Adds margin to the start |
| `inset-end` | `boolean` | `false` | Adds margin to the end |

