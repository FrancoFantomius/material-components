# Chip (`md-chip`)

Chips help users enter information, make selections, filter content, or trigger actions.

## Interactive Demo

<div class="demo-box">
  <md-chip-set>
    <md-chip variant="assist" icon="event" label="Add to calendar"></md-chip>
    <md-chip variant="filter" selected label="Filtered"></md-chip>
    <md-chip variant="input" label="Removable Tag" removable></md-chip>
    <md-chip variant="suggestion" label="Suggested action"></md-chip>
  </md-chip-set>
</div>

## Import

```typescript
import '@francofantomius/material-components/chip';
```

## Examples

```html
<md-chip-set>
  <md-chip variant="assist" icon="navigation" label="Get Directions"></md-chip>
  <md-chip variant="filter" label="Electronics"></md-chip>
  <md-chip variant="input" label="Tag 1" removable></md-chip>
</md-chip-set>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'assist' \| 'filter' \| 'input' \| 'suggestion'` | `'assist'` | Chip style behavior |
| `label` | `string` | `''` | Chip text |
| `icon` | `string` | `''` | Leading Material Symbols icon |
| `selected` | `boolean` | `false` | Selected state for filter chips |
| `removable` | `boolean` | `false` | Shows trailing close button |
| `disabled` | `boolean` | `false` | Disables chip |

