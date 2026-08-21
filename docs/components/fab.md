# Floating Action Button (`md-fab`)

A FAB represents the primary action on a screen.

## Interactive Demo

<div class="demo-box">
  <md-fab size="small" icon="edit"></md-fab>
  <md-fab icon="add" label="Create New"></md-fab>
  <md-fab size="large" icon="palette"></md-fab>
  <md-fab icon="download" lowered></md-fab>
</div>

## Import

```typescript
import '@francofantomius/material-components/fab';
```

## Examples

```html
<!-- Standard Medium FAB -->
<md-fab icon="add"></md-fab>

<!-- Small & Large Sizes -->
<md-fab size="small" icon="edit"></md-fab>
<md-fab size="large" icon="palette"></md-fab>

<!-- Extended FAB (Icon + Label) -->
<md-fab icon="add" label="Create Task"></md-fab>

<!-- Lowered Elevation -->
<md-fab icon="share" lowered></md-fab>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | FAB container size |
| `icon` | `string` | `''` | Material Symbols icon name |
| `label` | `string` | `''` | Text label (makes FAB extended) |
| `lowered` | `boolean` | `false` | Uses lower elevation (level 1) |
| `disabled` | `boolean` | `false` | Disables the FAB |

