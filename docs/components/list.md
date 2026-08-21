# List (`md-list`)

Lists are continuous, vertical indexes of text and images.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; width: 100%; max-width: 400px; padding: 0;">
  <md-list style="width: 100%;">
    <md-list-item headline="John Doe" supporting-text="Senior Developer" trailing-supporting-text="Online" interactive>
      <md-icon slot="start" name="account_circle" size="32"></md-icon>
    </md-list-item>
    <md-divider inset></md-divider>
    <md-list-item headline="Jane Smith" supporting-text="Product Designer" trailing-supporting-text="Away" interactive>
      <md-icon slot="start" name="account_circle" size="32"></md-icon>
    </md-list-item>
  </md-list>
</div>

## Import

```typescript
import '@francofantomius/material-components/list';
```

## Examples

```html
<md-list>
  <md-list-item
    headline="Inbox message"
    supporting-text="Hey, checking in on the project..."
    trailing-supporting-text="10:30 AM"
    interactive
  >
    <md-icon slot="start" name="mail"></md-icon>
  </md-list-item>
</md-list>
```

## Properties

### `md-list-item`
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `headline` | `string` | `''` | Main title text |
| `supporting-text` | `string` | `''` | Subtitle description |
| `trailing-supporting-text` | `string` | `''` | Metadata text at the end |
| `interactive` | `boolean` | `false` | Enables ripple hover & click effects |
| `disabled` | `boolean` | `false` | Disables list item |
| `href` | `string` | `''` | Renders item as a link |

