# Dialog (`md-dialog`)

Dialogs inform users about a task and can contain critical information or require decisions.

## Interactive Demo

<div class="demo-box">
  <md-button variant="filled" onclick="document.getElementById('docs-dialog').show()">
    Open Modal Dialog
  </md-button>
</div>

<md-dialog id="docs-dialog" headline="Discard Draft?" icon="warning">
  You have unsaved changes that will be lost permanently.
  <div slot="actions">
    <md-button variant="text" onclick="document.getElementById('docs-dialog').close()">Cancel</md-button>
    <md-button variant="filled" onclick="document.getElementById('docs-dialog').close('discard')">Discard</md-button>
  </div>
</md-dialog>

## Import

```typescript
import '@francofantomius/material-components/dialog';
```

## Examples

```html
<md-dialog id="my-dialog" headline="Confirm Deletion" icon="delete">
  Are you sure you want to delete this item?
  <div slot="actions">
    <md-button variant="text" onclick="myDialog.close()">Cancel</md-button>
    <md-button variant="filled" onclick="myDialog.close('delete')">Delete</md-button>
  </div>
</md-dialog>
```

```typescript
const dialog = document.getElementById('my-dialog') as any;

// Open
dialog.show(); // or dialog.showModal()

// Listen to close
dialog.addEventListener('close', (e: CustomEvent) => {
  console.log('Return value:', e.detail.returnValue);
});
```

## Properties & Methods

| Property / Method | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `open` | `boolean` | `false` | Whether the dialog is open |
| `headline` | `string` | `''` | Title of the dialog |
| `icon` | `string` | `''` | Material Symbols icon |
| `show()` | `() => void` | - | Opens the dialog modal |
| `close(returnValue?)` | `(val?: string) => void` | - | Closes the dialog |

