# Progress Indicators (`md-progress`)

Progress indicators express an unspecified wait time or display the length of a process.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; width: 100%; max-width: 400px; gap: 20px;">
  <md-progress type="linear" value="0.7"></md-progress>
  <md-progress type="linear"></md-progress>
  <div style="display: flex; gap: 24px;">
    <md-progress type="circular" value="0.65"></md-progress>
    <md-progress type="circular"></md-progress>
  </div>
</div>

## Import

```typescript
import '@francofantomius/material-components/progress';
```

## Examples

```html
<!-- Linear Determinate -->
<md-progress type="linear" value="0.6"></md-progress>

<!-- Linear Indeterminate (value omitted) -->
<md-progress type="linear"></md-progress>

<!-- Circular Determinate -->
<md-progress type="circular" value="0.75"></md-progress>

<!-- Circular Indeterminate -->
<md-progress type="circular"></md-progress>
```

## Properties

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `'linear' \| 'circular'` | `'linear'` | Indicator shape |
| `value` | `number \| null` | `null` | Value between 0 and 1. Null = Indeterminate |
| `max` | `number` | `1` | Maximum progress value |
| `buffer` | `number` | `1` | Buffer value for linear progress |

