# @francofantomius/material-components

<p align="left">
  <a href="https://www.npmjs.com/package/@francofantomius/material-components"><img src="https://img.shields.io/npm/v/@francofantomius/material-components?color=6750A4&label=npm&logo=npm" alt="npm version" /></a>
  <a href="https://lit.dev/"><img src="https://img.shields.io/badge/Lit-3.x-324FFF?logo=lit&logoColor=white" alt="Lit 3" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white" alt="Vite 8" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript" /></a>
  <a href="https://m3.material.io/"><img src="https://img.shields.io/badge/Material%20Design-3-6750A4?logo=materialdesign&logoColor=white" alt="Material Design 3" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License: MIT" /></a>
  <a href="https://bundlephobia.com/package/@francofantomius/material-components"><img src="https://img.shields.io/badge/ESM-tree--shakeable-success" alt="Tree Shakeable ESM" /></a>
</p>

A modern, accessible, and lightweight **Material Design 3 (M3)** Web Components library built with [Lit](https://lit.dev/), [Vite](https://vite.dev/), and [TypeScript](https://www.typescriptlang.org/).

Works natively across all modern browsers and seamlessly integrates with **React**, **Vue**, **Angular**, **Svelte**, **Solid**, or plain HTML/JavaScript.

---

## Features

- **Material Design 3**: Fully tokenized CSS design tokens for dynamic theming (Light/Dark mode and custom color palettes).
- **23+ Core Components**: Complete suite of components including Top App Bars, Navigation Drawers, Data Tables, Media Players, Code Blocks/Linters, Search Bars, Form Elements, Dialogs, Cards, and more.
- **Form-Associated Custom Elements (FACE)**: Native form participation, constraint validation, and `FormData` compatibility.
- **Lightweight and Tree-Shakeable**: Pure ESM with granular subpath exports (`@francofantomius/material-components/button`).
- **TypeScript & Custom Elements Manifest**: First-class type definitions (`.d.ts`), source maps, and standard `custom-elements.json` for IDE autocomplete.
- **Accessible (a11y)**: WCAG-compliant contrast ratios, high-visibility focus rings, ARIA roles, and full keyboard navigation.

---

## Installation

```bash
npm install @francofantomius/material-components lit
```

---

## Quick Start

### 1. Load Fonts and Icons (Recommended)
Add Google Roboto and Material Symbols to your HTML:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

### 2. Import Components

#### Granular Subpath Imports (Recommended for production)
```typescript
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/top-app-bar';
import '@francofantomius/material-components/navigation-drawer';
import '@francofantomius/material-components/table';
import '@francofantomius/material-components/search-bar';
import '@francofantomius/material-components/app-drawer';
import '@francofantomius/material-components/account-menu';
import '@francofantomius/material-components/code';
import '@francofantomius/material-components/player';
```

#### Global Bundle Import (Ideal for prototyping)
```typescript
import '@francofantomius/material-components';
```

---

## Usage Examples

### Navigation & Top App Bar
```html
<!-- Top App Bar -->
<md-top-app-bar variant="center-aligned" headline="My Application">
  <md-icon-button slot="navigation" icon="menu" aria-label="Open menu"></md-icon-button>
  <md-icon-button slot="actions" icon="search" aria-label="Search"></md-icon-button>
  <md-icon-button slot="actions" icon="account_circle" aria-label="Account"></md-icon-button>
</md-top-app-bar>

<!-- Navigation Drawer -->
<md-navigation-drawer headline="Navigation" type="modal">
  <md-navigation-drawer-item icon="inbox" label="Inbox" badge="24" active></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="send" label="Outbox"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="favorite" label="Favorites"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="settings" label="Settings"></md-navigation-drawer-item>
</md-navigation-drawer>
```

### Buttons, FABs & Icons
```html
<md-button variant="filled" icon="send">Send</md-button>
<md-button variant="elevated">Elevated</md-button>
<md-button variant="tonal">Tonal</md-button>
<md-button variant="outlined">Outlined</md-button>
<md-button variant="text">Text</md-button>

<md-icon-button icon="favorite" aria-label="Favorite"></md-icon-button>
<md-fab icon="edit" label="Compose"></md-fab>
<md-icon name="star" filled></md-icon>
```

### Form Controls (Native Form Association)
```html
<form id="login-form">
  <md-text-field label="Full Name" name="name" required leading-icon="person"></md-text-field>
  <md-text-field label="Email" name="email" type="email" required leading-icon="email"></md-text-field>
  
  <md-checkbox name="newsletter" checked>Subscribe to newsletter</md-checkbox>
  <md-switch name="notifications" selected icons>Enable notifications</md-switch>

  <md-radio-group name="tier">
    <md-radio value="free" label="Free" checked></md-radio>
    <md-radio value="pro" label="Pro"></md-radio>
  </md-radio-group>

  <md-button type="submit" variant="filled">Log In</md-button>
</form>
```

### Data Table
```html
<md-table bordered striped hoverable id="my-table"></md-table>

<script>
  const table = document.getElementById('my-table');
  table.columns = [
    { key: 'name', label: 'User', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'score', label: 'Score', numeric: true, sortable: true }
  ];
  table.rows = [
    { name: 'Alice Smith', role: 'Admin', score: 98 },
    { name: 'Bob Jones', role: 'Developer', score: 85 }
  ];
  table.selectable = true;
  table.paginated = true;
</script>
```

### Search Bar with Live Suggestions
```html
<md-search-bar placeholder="Search products..." id="search-bar"></md-search-bar>

<script>
  const search = document.getElementById('search-bar');
  search.suggestions = [
    { label: 'Documentation', icon: 'description', supportingText: 'Getting started guide' },
    { label: 'Component Gallery', icon: 'widgets', supportingText: 'Explore all 23 components' }
  ];
  search.addEventListener('search', (e) => console.log('Query:', e.detail.value));
</script>
```

### Code Block & Syntax Linter
```html
<md-code
  language="typescript"
  filename="example.ts"
  line-numbers
  highlight-lines="2, 4-5"
  lint
  copyable
  code="const greeting: string = 'Hello, world!';\nconsole.log(greeting);"
></md-code>
```

### Media Player (Audio & Video)
```html
<!-- Audio Player -->
<md-player
  type="audio"
  src="https://example.com/audio.mp3"
  track-title="Ambient Soundscape"
  artist="Sound Design"
></md-player>

<!-- Video Player -->
<md-player
  type="video"
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  track-title="Product Demo"
></md-player>
```

### App Drawer & Account Menu
```html
<!-- App Launcher Grid -->
<md-app-drawer headline="Apps">
  <md-app-drawer-item icon="mail" label="Mail" badge="3"></md-app-drawer-item>
  <md-app-drawer-item icon="calendar_today" label="Calendar"></md-app-drawer-item>
  <md-app-drawer-item icon="folder" label="Drive"></md-app-drawer-item>
</md-app-drawer>

<!-- Account Menu & Switcher -->
<md-account-menu
  name="Franco Fantomius"
  email="franco.fantomius@example.com"
  initials="F"
  role-title="Lead Architect"
  organization="Material Components Team"
  storage-used="10.4 GB"
  storage-total="15 GB"
  storage-progress="0.69"
>
  <md-account-item slot="accounts" name="Franco Fantomius" email="franco.fantomius@example.com" initials="F" active></md-account-item>
  <md-account-item slot="accounts" name="Work Profile" email="franco@company.com" initials="W"></md-account-item>
</md-account-menu>
```

---

## Theming and Dark Mode

### Dynamic Theming via CSS Custom Properties
The library uses standard CSS custom properties adhering to Material Design 3 specifications:

```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
}

[data-theme='dark'] {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-surface: #141218;
  --md-sys-color-on-surface: #E6E0E9;
}
```

### TypeScript Theme Helper
```typescript
import { applyTheme, darkColorScheme } from '@francofantomius/material-components/theme';

// Apply dark theme
applyTheme(darkColorScheme);

// Apply custom brand colors
applyTheme({
  primary: '#006A60',
  onPrimary: '#FFFFFF',
});
```

---

## Component List

| Component | Tag(s) | Subpath Export | Key Properties & Attributes |
| :--- | :--- | :--- | :--- |
| **Button** | `<md-button>` | `/button` | `variant` (filled, elevated, tonal, outlined, text), `icon`, `loading`, `disabled`, `href`, `type` |
| **Icon Button** | `<md-icon-button>` | `/icon-button` | `variant` (standard, filled, tonal, outlined), `icon`, `toggle`, `selected`, `disabled` |
| **FAB** | `<md-fab>` | `/fab` | `size` (small, medium, large), `label`, `icon`, `lowered` |
| **Icon** | `<md-icon>` | `/icon` | `name`, `filled`, `size` |
| **Text Field** | `<md-text-field>` | `/text-field` | `variant` (filled, outlined), `label`, `value`, `prefix-text`, `suffix-text`, `error`, `supporting-text`, `leading-icon`, `trailing-icon` |
| **Checkbox** | `<md-checkbox>` | `/checkbox` | `checked`, `indeterminate`, `error`, `disabled`, `name`, `value` |
| **Switch** | `<md-switch>` | `/switch` | `selected`, `icons`, `disabled`, `name`, `value` |
| **Radio** | `<md-radio>`, `<md-radio-group>` | `/radio` | `checked`, `value`, `name`, `row`, `disabled` |
| **Card** | `<md-card>` | `/card` | `variant` (elevated, filled, outlined), `interactive`, `href` |
| **Dialog** | `<md-dialog>` | `/dialog` | `open`, `headline`, `icon`, `showModal()`, `close()`, `cancelable` |
| **Divider** | `<md-divider>` | `/divider` | `vertical`, `inset`, `inset-start`, `inset-end` |
| **Progress** | `<md-progress>` | `/progress` | `type` (linear, circular), `value` (0 to 1, or indeterminate), `buffer` |
| **Badge** | `<md-badge>` | `/badge` | `value`, `dot`, `max` |
| **Chip** | `<md-chip>`, `<md-chip-set>` | `/chip` | `variant` (assist, filter, input, suggestion), `label`, `selected`, `removable`, `elevated` |
| **Tabs** | `<md-tabs>`, `<md-tab>` | `/tabs` | `active-index`, `icon`, `label`, `secondary` |
| **List** | `<md-list>`, `<md-list-item>` | `/list` | `headline`, `supporting-text`, `trailing-supporting-text`, `interactive`, `href`, `lines` |
| **Snackbar** | `<md-snackbar>` | `/snackbar` | `open`, `message`, `action-text`, `closeable`, `timeout-ms`, `stacked` |
| **Top App Bar** | `<md-top-app-bar>`, `<md-top-bar>` | `/top-app-bar` | `variant` (center-aligned, small, medium, large), `headline`, `subtitle`, `elevated`, `fixed` |
| **Navigation Drawer** | `<md-navigation-drawer>`, `<md-drawer>`, `<md-menu-bar>`, `<md-navigation-drawer-item>` | `/navigation-drawer` | `open`, `type` (modal, standard, responsive), `pivot` (left, right), `headline`, `responsive`, `closed` |
| **App Drawer** | `<md-app-drawer>`, `<md-app-launcher>`, `<md-apps-menu>`, `<md-app-drawer-item>`, `<md-app-item>` | `/app-drawer` | `open`, `headline`, `icon`, `columns`, `reorderable`, `editable`, `modal`, `alignment`, `pivot` |
| **Account Menu** | `<md-account-menu>`, `<md-account-drawer>`, `<md-account-profile>`, `<md-account-item>` | `/account-menu` | `open`, `name`, `email`, `avatar`, `initials`, `storage-used`, `storage-total`, `show-tabs`, `modal`, `alignment` |
| **Table / Data Table** | `<md-table>`, `<md-data-table>`, `<md-table-head>`, `<md-table-body>`, `<md-table-row>`, `<md-table-cell>`, `<md-table-header-cell>`, `<md-table-pagination>` | `/table` | `columns`, `rows`, `selectable`, `sortable`, `paginated`, `page`, `page-size`, `bordered`, `striped`, `sticky-header`, `loading` |
| **Search Bar** | `<md-search-bar>`, `<md-search>` | `/search-bar` | `value`, `placeholder`, `active`, `suggestions`, `leading-icon`, `trailing-icon`, `responsive`, `fullscreen` |
| **Code Block & Linter** | `<md-code>`, `<md-code-block>` | `/code` | `code`, `language`, `label` / `filename`, `line-numbers`, `highlight-lines`, `lint`, `copyable`, `wrap-lines`, `max-height` |
| **Media Player** | `<md-player>`, `<md-media-player>`, `<md-audio-player>`, `<md-video-player>` | `/player` | `type` (audio, video), `variant` (elevated, filled, outlined, compact, full), `src`, `track-title`, `artist`, `poster`, `currentTime`, `duration`, `volume`, `playback-rate` |
| **Internal Helpers** | `<md-ripple>`, `<md-focus-ring>` | `/ripple`, `/focus-ring` | Interactive ripple effect & WCAG focus indicators |

---

## Subpath Exports Reference

```typescript
import { applyTheme } from '@francofantomius/material-components/theme';
import { MdButton } from '@francofantomius/material-components/button';
import { MdIconButton } from '@francofantomius/material-components/icon-button';
import { MdFab } from '@francofantomius/material-components/fab';
import { MdIcon } from '@francofantomius/material-components/icon';
import { MdTextField } from '@francofantomius/material-components/text-field';
import { MdCheckbox } from '@francofantomius/material-components/checkbox';
import { MdSwitch } from '@francofantomius/material-components/switch';
import { MdRadio, MdRadioGroup } from '@francofantomius/material-components/radio';
import { MdCard } from '@francofantomius/material-components/card';
import { MdDialog } from '@francofantomius/material-components/dialog';
import { MdDivider } from '@francofantomius/material-components/divider';
import { MdProgress } from '@francofantomius/material-components/progress';
import { MdBadge } from '@francofantomius/material-components/badge';
import { MdChip, MdChipSet } from '@francofantomius/material-components/chip';
import { MdTabs, MdTab } from '@francofantomius/material-components/tabs';
import { MdList, MdListItem } from '@francofantomius/material-components/list';
import { MdSnackbar } from '@francofantomius/material-components/snackbar';
import { MdTopAppBar, MdTopBar } from '@francofantomius/material-components/top-app-bar';
import { MdNavigationDrawer, MdDrawer, MdMenuBar, MdNavigationDrawerItem } from '@francofantomius/material-components/navigation-drawer';
import { MdAppDrawer, MdAppDrawerItem, MdAppLauncher, MdAppsMenu } from '@francofantomius/material-components/app-drawer';
import { MdAccountMenu, MdAccountItem, MdAccountDrawer, MdAccountProfile } from '@francofantomius/material-components/account-menu';
import { MdTable, MdDataTable, MdTableHeaderCell, MdTableCell, MdTableRow } from '@francofantomius/material-components/table';
import { MdSearchBar, MdSearch } from '@francofantomius/material-components/search-bar';
import { MdCode, MdCodeBlock } from '@francofantomius/material-components/code';
import { MdPlayer, MdMediaPlayer, MdAudioPlayer, MdVideoPlayer } from '@francofantomius/material-components/player';
```

---

## Framework Integration

Because Web Components are browser standards, they work seamlessly with any framework:

### React
```tsx
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';

export function LoginForm() {
  return (
    <div>
      <md-text-field label="Username" onInput={(e: any) => console.log(e.target.value)}></md-text-field>
      <md-button variant="filled" onClick={() => alert('Clicked')}>Submit</md-button>
    </div>
  );
}
```

### Vue
```vue
<script setup>
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/switch';
</script>

<template>
  <md-switch selected icons>Notifications</md-switch>
  <md-button variant="tonal">Save</md-button>
</template>
```

---

## Development Scripts

```bash
# Start local development playground & documentation
npm run dev

# Run unit tests with Vitest
npm test

# Type check TypeScript codebase
npm run typecheck

# Build ESM library & generate Custom Elements Manifest
npm run build

# Generate Custom Elements Manifest
npm run analyze

# Generate static documentation
npm run docs:build
```

---

## Automated Publishing (Trusted Publishing)

This repository is configured for **npm Trusted Publishing** using GitHub Actions OpenID Connect (OIDC). No long-lived static tokens or secrets are required.

### How it works:
1. When changes are pushed to `main`, the workflow checks the `version` field in `package.json`.
2. It queries npm to verify if this version is already published.
3. If the version is new, it runs typecheck, tests, builds the library, exchanges an OIDC token with npm, and publishes the package with cryptographic provenance (`--provenance`).
4. It automatically creates a Git tag (`v<version>`) and a GitHub Release.

---

## License

MIT © [francofantomius](https://github.com/francofantomius)
