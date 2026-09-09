---
title: Material Components
category: Overview
order: 0
icon: home
hero:
  badge: "Material Design 3"
  title: "Material Components"
  subtitle: "Reusable, accessible, and lightweight Material Design 3 Web Components built with Lit."
  actions:
    - text: "Getting Started"
      link: "#/guides/getting-started"
      variant: "filled"
      icon: "rocket_launch"
    - text: "GitHub Repository"
      link: "https://github.com/FrancoFantomius/material-components"
      variant: "outlined"
      icon: "code"
---

## Overview

`@francofantomius/material-components` is a comprehensive suite of modern, accessible, and lightweight **Material Design 3 (M3)** Web Components built with [Lit](https://lit.dev/). They run natively in all modern browsers and integrate effortlessly with React, Vue, Angular, Svelte, Solid, or vanilla HTML/JavaScript.

> [!NOTE]
> All components comply with the official Material Design 3 specification, providing dynamic tokenized colors, accessible elevation, focus rings, state layers, and full keyboard navigation.

## Key Features

- **Material Design 3 Specifications**: Adheres to official M3 guidelines for tokenized color systems, dynamic elevation, state layers, rounded shapes, and typography.
- **Form-Associated Custom Elements (FACE)**: Text fields, checkboxes, switches, radios, and sliders utilize browser-native `ElementInternals` to participate in standard `<form>` submission, `FormData`, and native constraint validation (`required`, `checkValidity()`, `reportValidity()`).
- **Tree-Shakeable Subpaths**: Import only the elements you need (e.g., `@francofantomius/material-components/button`) to keep bundle sizes minimal.
- **Accessibility (a11y)**: Built-in WCAG 2.1 AA focus rings, full keyboard interactions, high-contrast support, and ARIA attributes.
- **TypeScript Support**: Full `.d.ts` type declarations and `custom-elements.json` (Custom Elements Manifest) for IDE autocomplete and linting.
- **Framework Agnostic**: Native Custom Elements work across React, Vue, Angular, Svelte, Solid, and vanilla HTML.

## Installation

Install the library and its peer dependency `lit`:

```bash
npm install @francofantomius/material-components lit
```

## Typography & Icons Setup

Material 3 relies on **Roboto** for typography and **Material Symbols Outlined** for scalable vector icons. Include the Google Fonts stylesheets in your HTML `<head>`:

```html
<!-- Google Material Symbols Outlined font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<!-- Google Roboto font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

## Import Strategies

### Subpath Imports (Recommended)

Import individual component modules for optimal tree-shaking and smallest bundle size:

```javascript
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/card';
```

### Full Component Bundle

For quick prototyping or complete component registration:

```javascript
import '@francofantomius/material-components';
```

## Quick Example

```html
<md-button variant="filled" icon="rocket_launch">
  Launch App
</md-button>

<md-text-field label="Username" variant="outlined" leading-icon="person"></md-text-field>

<md-switch selected icons>Enable Feature</md-switch>
```

