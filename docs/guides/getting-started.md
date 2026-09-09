---
title: Getting Started
category: Guides
order: 1
icon: rocket_launch
description: Quick guide to installing and configuring Material Components with Lit, fonts, and icons.
---

## Introduction

`@francofantomius/material-components` is a suite of modern, accessible, and lightweight **Material Design 3 (M3)** Web Components built with Lit. They run natively in every modern browser and integrate effortlessly with React, Vue, Angular, Svelte, Solid, or vanilla HTML/JS.

## Installation

Install the library and its peer dependency `lit` via your package manager of choice:

```bash
npm install @francofantomius/material-components lit
```

## Typography & Icons Setup

Material 3 relies on **Roboto** for typography and **Material Symbols** for scalable icons. Place these font stylesheets into your HTML `<head>`:

```html
<!-- Google Material Symbols Outlined font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />

<!-- Google Roboto font -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

## Import Strategies

### 1. Tree-Shakeable Subpath Imports (Recommended)

Import only the components your application uses to ensure the smallest possible bundle footprint:

```javascript
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/card';
```

### 2. Complete Library Bundle

For quick prototypes or sandboxes, import the full component registry at once:

```javascript
import '@francofantomius/material-components';
```

## HTML Quick Start

```html
<md-button variant="filled" icon="rocket_launch">
  Launch App
</md-button>

<md-text-field label="Username" variant="outlined" leading-icon="person"></md-text-field>

<md-switch selected icons>Enable Feature</md-switch>
```

