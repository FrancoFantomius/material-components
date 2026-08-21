# Snackbar (`md-snackbar`)

Snackbars provide brief feedback about an operation through a message at the bottom of the screen.

## Interactive Demo

<div class="demo-box">
  <md-button variant="tonal" onclick="document.getElementById('docs-snackbar').show()">
    Show Snackbar Toast
  </md-button>
</div>

<md-snackbar id="docs-snackbar" message="Email archived successfully." action-text="Undo" closeable></md-snackbar>

## Import

```typescript
import '@francofantomius/material-components/snackbar';
```

## Examples

```html
<md-snackbar
  id="my-snackbar"
  message="Saved to drive."
  action-text="Open"
  timeout-ms="5000"
  closeable
></md-snackbar>
```

```typescript
const snackbar = document.getElementById('my-snackbar') as any;

// Show
snackbar.show();

// Listen to action click
snackbar.addEventListener('action', () => {
  console.log('Action clicked!');
});
```

## Properties & Methods

| Property / Method | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Visibility state of the snackbar |
| `message` | `string` | `''` | Text message to display |
| `action-text` | `string` | `''` | Action button text |
| `closeable` | `boolean` | `false` | Shows a trailing close button |
| `timeout-ms` | `number` | `4000` | Auto-dismiss duration in milliseconds |
| `show()` | `() => void` | - | Shows the snackbar and starts timer |
| `close()` | `() => void` | - | Closes the snackbar |

