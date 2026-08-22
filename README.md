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

Runs natively in all modern browsers and integrates seamlessly with **React** (18 & 19), **Vue 3**, **Angular**, **Svelte**, **Solid**, or vanilla HTML/JavaScript without requiring framework-specific wrappers.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [CDN Quick Start](#cdn-quick-start)
- [Quick Start](#quick-start)
  - [1. Load Fonts & Icons](#1-load-fonts-and-icons-recommended)
  - [2. Import Components](#2-import-components)
- [Component Index](#component-index)
- [Usage Examples](#usage-examples)
  - [Buttons, FABs & Icons](#buttons-fabs--icons)
  - [Form Controls & Native Validation (FACE)](#form-controls-native-form-association)
  - [Top App Bar & Navigation Drawer](#navigation--top-app-bar)
  - [App Drawer & Account Menu](#app-drawer--account-menu)
  - [Data Table](#data-table)
  - [Search Bar with Live Suggestions](#search-bar-with-live-suggestions)
  - [Code Block & Syntax Linter](#code-block--syntax-linter)
  - [Media Player (Audio & Video)](#media-player-audio--video)
- [Form-Associated Custom Elements (FACE)](#form-integration-face)
- [Theming & Color Palettes](#theming-and-dark-mode)
  - [CSS Custom Properties](#dynamic-theming-via-css-custom-properties)
  - [TypeScript Theme Helper API](#typescript-theme-helper)
- [Subpath Exports Reference](#subpath-exports-reference)
- [Framework Integration](#framework-integration)
  - [React (18 / 19 / Next.js)](#react)
  - [Vue 3 / Nuxt](#vue)
  - [Angular](#angular)
  - [Svelte](#svelte)
- [LLM & AI Assistant Documentation](#llm--ai-assistant-documentation)
- [Development Scripts](#development-scripts)
- [Automated Publishing](#automated-publishing-trusted-publishing)
- [License](#license)

---

## Features

- 🎨 **Material Design 3**: Fully tokenized CSS design tokens for dynamic theming, tonal color palettes, surface containers, elevations 0–5, and light/dark modes.
- 🧩 **23+ Core Components**: Complete suite including Top App Bars, Navigation Drawers, Data Tables, Media Players, Code Blocks/Linters, Search Bars, Form Elements, Dialogs, Cards, and more.
- 📋 **Form-Associated Custom Elements (FACE)**: Native `<form>` integration, `FormData` compatibility, and standard constraint validation (`required`, `checkValidity()`, `reportValidity()`).
- ⚡ **Lightweight & Tree-Shakeable**: Pure ESM modules with granular subpath exports (e.g. `@francofantomius/material-components/button`).
- 🔷 **TypeScript & Custom Elements Manifest**: First-class TypeScript declarations (`.d.ts`), inline sourcemaps, and standard `custom-elements.json` for IDE autocomplete.
- ♿ **Accessible (a11y)**: WCAG 2.1 AA compliant contrast ratios, high-visibility focus rings (`<md-focus-ring>`), keyboard navigation, and ARIA state handling.
- 🌐 **Framework Agnostic**: Works out of the box with React, Vue, Angular, Svelte, Solid, or vanilla HTML/JS.

---

## Installation

```bash
# npm
npm install @francofantomius/material-components lit

# pnpm
pnpm add @francofantomius/material-components lit

# yarn
yarn add @francofantomius/material-components lit

# bun
bun add @francofantomius/material-components lit
```

---

## CDN Quick Start

For quick prototyping or usage directly in HTML without a bundler, import from an ESM CDN:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Material Components Demo</title>
    <!-- Fonts & Icons -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />

    <!-- Import from CDN (esm.sh / jsdelivr / unpkg) -->
    <script type="module" src="https://esm.sh/@francofantomius/material-components"></script>
  </head>
  <body>
    <md-button variant="filled" icon="send">Get Started</md-button>
  </body>
</html>
```

---

## Quick Start

### 1. Load Fonts and Icons (Recommended)

Add Google Roboto and Material Symbols Outlined to your HTML `<head>`:

```html
<!-- Material Symbols Outlined font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<!-- Roboto font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

### 2. Import Components

#### Granular Subpath Imports (Recommended for production)
Import only the components you use to optimize bundle sizes:

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
Registers all components at once:

```typescript
import '@francofantomius/material-components';
```

---

## Component Index

| Category | Component Tag(s) | Subpath Export | Key Properties & Attributes |
| :--- | :--- | :--- | :--- |
| **Actions** | `<md-button>` | `/button` | `variant` (filled, elevated, tonal, outlined, text), `icon`, `trailing-icon`, `loading`, `disabled`, `href`, `target`, `type` |
| **Actions** | `<md-icon-button>` | `/icon-button` | `variant` (standard, filled, tonal, outlined), `icon`, `selected-icon`, `toggle`, `selected`, `disabled` |
| **Actions** | `<md-fab>` | `/fab` | `size` (small, medium, large), `label`, `icon`, `lowered`, `disabled` |
| **Actions** | `<md-icon>` | `/icon` | `name`, `filled`, `size` |
| **Inputs & Controls** | `<md-text-field>` | `/text-field` | `variant` (filled, outlined), `label`, `value`, `type`, `placeholder`, `prefix-text`, `suffix-text`, `error`, `error-text`, `supporting-text`, `leading-icon`, `trailing-icon`, `maxlength`, `required` |
| **Inputs & Controls** | `<md-checkbox>` | `/checkbox` | `checked`, `indeterminate`, `error`, `disabled`, `required`, `name`, `value` |
| **Inputs & Controls** | `<md-switch>` | `/switch` | `selected`, `icons`, `disabled`, `name`, `value` |
| **Inputs & Controls** | `<md-radio>`, `<md-radio-group>` | `/radio` | `checked`, `value`, `name`, `row`, `disabled` |
| **Inputs & Controls** | `<md-chip>`, `<md-chip-set>` | `/chip` | `variant` (assist, filter, input, suggestion), `label`, `icon`, `selected`, `removable`, `disabled` |
| **Inputs & Controls** | `<md-search-bar>`, `<md-search>` | `/search-bar` | `value`, `placeholder`, `active`, `suggestions`, `leading-icon`, `trailing-icon`, `responsive`, `collapse-on-mobile`, `fullscreen` |
| **Surfaces & Layout** | `<md-card>` | `/card` | `variant` (elevated, filled, outlined), `interactive`, `disabled`, `href`, `target` |
| **Surfaces & Layout** | `<md-dialog>` | `/dialog` | `open`, `headline`, `icon`, `cancelable`, `showModal()`, `close()` |
| **Surfaces & Layout** | `<md-divider>` | `/divider` | `vertical`, `inset`, `inset-start`, `inset-end` |
| **Surfaces & Layout** | `<md-list>`, `<md-list-item>` | `/list` | `headline`, `supporting-text`, `trailing-supporting-text`, `interactive`, `disabled`, `href` |
| **Surfaces & Layout** | `<md-table>`, `<md-data-table>` | `/table` | `columns`, `rows`, `selectable`, `sortable`, `paginated`, `page`, `page-size`, `bordered`, `striped`, `sticky-header`, `loading` |
| **Communication** | `<md-badge>` | `/badge` | `value`, `dot`, `max` |
| **Communication** | `<md-progress>` | `/progress` | `type` (linear, circular), `value` (0 to 1, or indeterminate), `buffer`, `wavy` |
| **Communication** | `<md-snackbar>` | `/snackbar` | `open`, `message`, `action-text`, `closeable`, `timeout-ms`, `stacked` |
| **Navigation** | `<md-top-app-bar>`, `<md-top-bar>` | `/top-app-bar` | `variant` (center-aligned, small, medium, large), `headline`, `subtitle`, `elevated`, `fixed` |
| **Navigation** | `<md-navigation-drawer>`, `<md-drawer>` | `/navigation-drawer` | `open`, `type` (modal, standard, responsive), `pivot` (left, right), `headline`, `responsive` |
| **Navigation** | `<md-tabs>`, `<md-tab>` | `/tabs` | `active-index`, `icon`, `label`, `secondary` |
| **Navigation** | `<md-app-drawer>`, `<md-app-launcher>` | `/app-drawer` | `open`, `headline`, `icon`, `columns`, `reorderable`, `editable`, `modal`, `alignment`, `pivot` |
| **Navigation** | `<md-account-menu>`, `<md-account-drawer>` | `/account-menu` | `open`, `name`, `email`, `avatar`, `initials`, `storage-used`, `storage-total`, `storage-progress`, `show-tabs`, `modal`, `alignment` |
| **Media & Dev Tools** | `<md-code>`, `<md-code-block>` | `/code` | `code`, `language`, `filename`, `line-numbers`, `highlight-lines`, `lint`, `copyable`, `wrap-lines`, `max-height` |
| **Media & Dev Tools** | `<md-player>`, `<md-media-player>` | `/player` | `type` (audio, video), `variant` (elevated, filled, outlined, compact, full), `src`, `track-title`, `artist`, `poster` |
| **Internal Helpers** | `<md-ripple>`, `<md-focus-ring>` | `/ripple`, `/focus-ring` | Interactive ripple effect & accessible WCAG focus indicator |

---

## Usage Examples

### Buttons, FABs & Icons

```html
<!-- Buttons with 5 visual variants -->
<md-button variant="filled" icon="send">Send</md-button>
<md-button variant="elevated">Elevated</md-button>
<md-button variant="tonal">Tonal</md-button>
<md-button variant="outlined">Outlined</md-button>
<md-button variant="text">Text</md-button>

<!-- Loading State -->
<md-button variant="filled" loading>Saving...</md-button>

<!-- Icon Buttons (Standard, Filled, Tonal, Outlined, Toggle) -->
<md-icon-button icon="favorite" aria-label="Favorite"></md-icon-button>
<md-icon-button toggle icon="bookmark_border" selected-icon="bookmark" aria-label="Bookmark"></md-icon-button>

<!-- Floating Action Button -->
<md-fab icon="edit" label="Compose"></md-fab>
<md-fab size="small" icon="add" aria-label="Add"></md-fab>

<!-- Material Symbols Icon -->
<md-icon name="star" filled></md-icon>
```

### Form Controls (Native Form Association)

All input components are **Form-Associated Custom Elements (FACE)** that natively integrate with standard `<form>` submission, reset, and `FormData`.

```html
<form id="login-form">
  <md-text-field
    label="Full Name"
    name="name"
    required
    leading-icon="person"
    supporting-text="Your legal name"
  ></md-text-field>

  <md-text-field
    label="Email"
    name="email"
    type="email"
    required
    leading-icon="email"
  ></md-text-field>

  <md-checkbox name="newsletter" checked>
    Subscribe to newsletter
  </md-checkbox>

  <md-switch name="notifications" selected icons>
    Enable notifications
  </md-switch>

  <md-radio-group name="tier" value="pro">
    <md-radio value="free" label="Free"></md-radio>
    <md-radio value="pro" label="Pro"></md-radio>
  </md-radio-group>

  <div style="display: flex; gap: 8px; margin-top: 16px;">
    <md-button type="reset" variant="outlined">Reset</md-button>
    <md-button type="submit" variant="filled">Log In</md-button>
  </div>
</form>
```

### Navigation & Top App Bar

```html
<!-- Top App Bar -->
<md-top-app-bar variant="center-aligned" headline="My Application">
  <md-icon-button slot="navigation" icon="menu" aria-label="Open menu"></md-icon-button>
  <md-icon-button slot="actions" icon="search" aria-label="Search"></md-icon-button>
  <md-icon-button slot="actions" icon="account_circle" aria-label="Account"></md-icon-button>
</md-top-app-bar>

<!-- Navigation Drawer -->
<md-navigation-drawer headline="Navigation" type="modal" id="nav-drawer">
  <md-navigation-drawer-item icon="inbox" label="Inbox" badge="24" active></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="send" label="Outbox"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="favorite" label="Favorites"></md-navigation-drawer-item>
  <md-navigation-drawer-item icon="settings" label="Settings"></md-navigation-drawer-item>
</md-navigation-drawer>
```

### App Drawer & Account Menu

```html
<!-- Google Apps style Launcher Grid -->
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
<md-search-bar placeholder="Search products..." id="search-bar" responsive></md-search-bar>

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

---

## Form Integration (FACE)

Form elements (`<md-text-field>`, `<md-checkbox>`, `<md-switch>`, `<md-radio>`) use standard browser `ElementInternals`. They participate seamlessly in form life-cycles:

```javascript
const form = document.getElementById('login-form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  console.log('Payload:', Object.fromEntries(formData.entries()));
});
```

---

## Theming and Dark Mode

### Dynamic Theming via CSS Custom Properties

The library uses standard Material Design 3 design tokens. Override them globally on `:root` or scope them to any container:

```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
}

[data-theme='dark'] {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-primary-container: #4F378B;
  --md-sys-color-on-primary-container: #EADDFF;
  --md-sys-color-surface: #141218;
  --md-sys-color-on-surface: #E6E0E9;
}
```

### TypeScript Theme Helper

```typescript
import { applyTheme, darkColorScheme, lightColorScheme } from '@francofantomius/material-components/theme';

// Switch to dark theme
applyTheme(darkColorScheme);

// Switch back to light theme
applyTheme(lightColorScheme);

// Apply custom brand palette
applyTheme({
  primary: '#006A60',
  onPrimary: '#FFFFFF',
  primaryContainer: '#74F8E5',
  onPrimaryContainer: '#00201C',
});
```

---

## Subpath Exports Reference

Each component can be imported individually with full TypeScript type definitions:

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

Because Web Components are standard custom elements, they work natively across all frameworks:

### React

#### React 19
React 19 supports Custom Elements natively (attributes, properties, and custom events):

```tsx
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/switch';

export function SettingsForm() {
  return (
    <div>
      <md-text-field
        label="Username"
        onInput={(e: any) => console.log(e.target.value)}
      />
      <md-switch
        selected
        onChange={(e: any) => console.log(e.target.selected)}
      >
        Enable Notifications
      </md-switch>
      <md-button variant="filled" onClick={() => alert('Saved!')}>
        Save
      </md-button>
    </div>
  );
}
```

#### React 18 / Next.js
In React 18, assign complex object/array properties (such as `table.columns` or `search.suggestions`) via React `ref`:

```tsx
import React, { useRef, useEffect } from 'react';
import '@francofantomius/material-components/table';

export function UserTable({ users }) {
  const tableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.columns = [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'email', label: 'Email' }
      ];
      tableRef.current.rows = users;
    }
  }, [users]);

  return <md-table ref={tableRef} bordered hoverable />;
}
```

### Vue

In Vue 3 / Nuxt, configure compiler options so Vue doesn't treat `md-*` elements as missing components:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('md-')
        }
      }
    })
  ]
});
```

```vue
<script setup>
import { ref } from 'vue';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/switch';

const isEnabled = ref(true);
</script>

<template>
  <div>
    <md-switch :selected="isEnabled" @change="isEnabled = !isEnabled">
      Enable Feature
    </md-switch>
    <md-button variant="filled" :disabled="!isEnabled">
      Proceed
    </md-button>
  </div>
</template>
```

### Angular

Include `CUSTOM_ELEMENTS_SCHEMA` in your standalone component or `@NgModule`:

```typescript
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@francofantomius/material-components/button';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<md-button variant="filled">Click Me</md-button>`,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {}
```

### Svelte

Custom elements work out-of-the-box with standard Svelte bindings:

```svelte
<script>
  import '@francofantomius/material-components/button';
  import '@francofantomius/material-components/text-field';

  let name = '';
</script>

<md-text-field label="Name" value={name} on:input={(e) => name = e.target.value}></md-text-field>
<md-button variant="filled" on:click={() => alert(`Hello ${name}`)}>Submit</md-button>
```

---

## LLM & AI Assistant Documentation

This repository provides an [`llms.txt`](./llms.txt) file structured for AI coding assistants (such as Antigravity, Cursor, GitHub Copilot, ChatGPT, and Claude). It provides complete API specifications, component hierarchies, and ready-to-use code patterns.

---

## Development Scripts

```bash
# Start local development playground & documentation
npm run dev

# Run unit tests with Vitest
npm test

# Type-check TypeScript codebase
npm run typecheck

# Build ESM library, docs & generate Custom Elements Manifest
npm run build

# Preview documentation site build
npm run preview
```

---

## Automated Publishing (Trusted Publishing)

This repository is configured for **npm Trusted Publishing** using GitHub Actions OpenID Connect (OIDC).

### How it works:
1. When changes are merged to `main`, the CI workflow checks the `version` field in `package.json`.
2. It queries npm to verify if this version is already published.
3. If the version is new, it executes type checking, automated tests, builds the library, exchanges an OIDC token with npm, and publishes the package with cryptographic provenance (`--provenance`).
4. It automatically creates a Git release and tag (`v<version>`).

---

## License

MIT © [francofantomius](https://github.com/francofantomius)
