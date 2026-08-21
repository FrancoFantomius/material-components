# @francofantomius/material-components

A modern, accessible, and lightweight **Material Design 3 (M3)** Web Components library built with [Lit](https://lit.dev/).

Works natively across all modern browsers and seamlessly integrates with **React**, **Vue**, **Angular**, **Svelte**, **Solid**, or plain HTML.

---

## Features

- **Material Design 3**: Fully tokenized CSS design tokens for dynamic theming (Light/Dark mode and custom color palettes).
- **16+ Core Components**: Buttons, Text Fields, Checkboxes, Switches, Radio Groups, Cards, Dialogs, Progress, Badges, Chips, Tabs, Lists, Snackbars, and more.
- **Form-Associated Custom Elements (FACE)**: Inputs directly integrate with native `<form>` elements, form validation, and `FormData`.
- **Lightweight and Tree-Shakeable**: Pure ESM with subpath exports (`@francofantomius/material-components/button`).
- **TypeScript and IDE Autocomplete**: Full TypeScript types and Custom Elements Manifest (`custom-elements.json`).
- **Accessible**: WCAG compliant focus rings, ARIA roles, and keyboard navigation.

---

## Installation

```bash
npm install @francofantomius/material-components lit
```

---

## Quick Start

### 1. Load Fonts and Icons (Optional but recommended)
Add Google Roboto and Material Symbols to your HTML:
```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

### 2. Import and Use Components

#### Global Bundle Import
```typescript
import '@francofantomius/material-components';
```

#### Tree-shakeable Subpath Imports (Recommended)
```typescript
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/card';
```

#### Use in HTML / JSX / Templates
```html
<!-- Buttons & Icons -->
<md-button variant="filled" icon="send">Submit</md-button>
<md-button variant="outlined">Cancel</md-button>
<md-icon-button icon="favorite"></md-icon-button>

<!-- Form Inputs with Native Form Integration -->
<form id="login-form">
  <md-text-field label="Email" name="email" type="email" required></md-text-field>
  <md-checkbox name="remember" checked>Remember me</md-checkbox>
  <md-switch name="notifications" selected icons>Enable Notifications</md-switch>
  <md-button type="submit" variant="filled">Log In</md-button>
</form>

<!-- Card Surface -->
<md-card variant="outlined" interactive>
  <div slot="header">
    <h3>Card Title</h3>
  </div>
  Card body content here.
  <div slot="actions">
    <md-button variant="text">Dismiss</md-button>
    <md-button variant="filled">Open</md-button>
  </div>
</md-card>

<!-- Modal Dialog -->
<md-dialog id="my-dialog" headline="Dialog Title" icon="info">
  Dialog content description.
  <div slot="actions">
    <md-button id="close-btn" variant="text">Close</md-button>
  </div>
</md-dialog>
```

---

## Theming and Dark Mode

### Dynamic Theming via CSS Custom Properties
The library uses standard CSS custom properties adhering to Material 3 specs:

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

| Component | Tag | Key Properties & Variants |
| :--- | :--- | :--- |
| **Button** | `<md-button>` | `variant` (filled, elevated, tonal, outlined, text), `icon`, `loading`, `disabled`, `href` |
| **Icon Button** | `<md-icon-button>` | `variant` (standard, filled, tonal, outlined), `icon`, `toggle`, `selected` |
| **FAB** | `<md-fab>` | `size` (small, medium, large), `label`, `icon`, `lowered` |
| **Text Field** | `<md-text-field>` | `variant` (filled, outlined), `label`, `value`, `prefix-text`, `suffix-text`, `error`, `supporting-text` |
| **Checkbox** | `<md-checkbox>` | `checked`, `indeterminate`, `error`, `disabled`, `name`, `value` |
| **Switch** | `<md-switch>` | `selected`, `icons`, `disabled`, `name`, `value` |
| **Radio** | `<md-radio>`, `<md-radio-group>` | `checked`, `value`, `name`, `row` |
| **Card** | `<md-card>` | `variant` (elevated, filled, outlined), `interactive`, `href` |
| **Dialog** | `<md-dialog>` | `open`, `headline`, `icon`, `showModal()`, `close()` |
| **Divider** | `<md-divider>` | `vertical`, `inset`, `inset-start`, `inset-end` |
| **Progress** | `<md-progress>` | `type` (linear, circular), `value` (0 to 1, or indeterminate), `buffer` |
| **Badge** | `<md-badge>` | `value`, `dot` |
| **Chip** | `<md-chip>`, `<md-chip-set>` | `variant` (assist, filter, input, suggestion), `label`, `selected`, `removable` |
| **Tabs** | `<md-tabs>`, `<md-tab>` | `active-index`, `icon`, `label` |
| **List** | `<md-list>`, `<md-list-item>` | `headline`, `supporting-text`, `interactive`, `href` |
| **Snackbar** | `<md-snackbar>` | `open`, `message`, `action-text`, `closeable`, `timeout-ms` |
| **App Drawer** | `<md-app-drawer>`, `<md-app-drawer-item>` | `open`, `headline`, `icon`, `columns`, `modal`, `alignment` |
| **Account Menu** | `<md-account-menu>`, `<md-account-item>` | `open`, `name`, `email`, `avatar`, `initials`, `storage-used`, `show-tabs`, `modal` |

---

## Development and Testing

```bash
# Start local interactive documentation & playground
npm run dev

# Run unit tests
npm test

# Type check
npm run typecheck

# Build library & custom elements manifest
npm run build
```

---

## Automated Publishing (Trusted Publishing)

This repository is configured for **npm Trusted Publishing** using GitHub Actions OpenID Connect (OIDC). No long-lived static tokens or secrets are required.

### How it works:
1. When changes are pushed to `main`, the workflow (`.github/workflows/publish-npm.yml`) checks the `version` field in `package.json`.
2. It queries npm to verify if this version is already published.
3. If the version is new, it runs typecheck, tests, builds the library, exchanges an OIDC token with npm, and publishes the package with cryptographic provenance (`--provenance`).
4. It automatically creates a Git tag (`v<version>`) and a GitHub Release.

### Configuring Trusted Publishing on npmjs.com:
1. Go to your package on [npmjs.com](https://www.npmjs.com) (or your npm account settings under **Publishing Access**).
2. Click **Trusted Publishers** -> **Add GitHub Actions**.
3. Fill in:
   - **GitHub Organization/User**: `francofantomius` (or your GitHub username)
   - **Repository**: `material-components` (or your repo name)
   - **Workflow name**: `publish-npm.yml`
   - **Branch**: `main`

---

## License

MIT © [francofantomius](https://github.com/francofantomius)
