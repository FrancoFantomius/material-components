# Tabs (`md-tabs`)

Tabs organize content across different screens, data sets, and other interactions.

## Interactive Demo

<div class="demo-box" style="flex-direction: column; width: 100%; max-width: 450px;">
  <md-tabs active-index="0">
    <md-tab icon="home" label="Home"></md-tab>
    <md-tab icon="explore" label="Explore"></md-tab>
    <md-tab icon="person" label="Profile"></md-tab>
  </md-tabs>
</div>

## Import

```typescript
import '@francofantomius/material-components/tabs';
```

## Examples

```html
<md-tabs active-index="1">
  <md-tab icon="mail" label="Inbox"></md-tab>
  <md-tab icon="send" label="Sent"></md-tab>
  <md-tab icon="drafts" label="Drafts"></md-tab>
</md-tabs>
```

```typescript
const tabs = document.querySelector('md-tabs') as any;

tabs.addEventListener('change', (e: CustomEvent) => {
  console.log('Active tab index:', e.detail.activeIndex);
});
```

## Properties

### `md-tabs`
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `active-index` | `number` | `0` | Currently active tab index (0-based) |

### `md-tab`
| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `''` | Tab title |
| `icon` | `string` | `''` | Material Symbols icon |
| `active` | `boolean` | `false` | Active state |
| `disabled` | `boolean` | `false` | Disables tab |

