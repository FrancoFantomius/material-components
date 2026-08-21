# Getting Started

`@francofantomius/material-components` provides modern Web Components adhering to Google's Material Design 3 guidelines.

## Installation

Install via npm:

```bash
npm install @francofantomius/material-components lit
```

## Setup Fonts & Icons

Material 3 uses **Roboto** for typography and **Material Symbols** for icons. Add these to your HTML `<head>`:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" />
```

## Basic Usage

### Option 1: Tree-Shakeable Subpath Imports (Recommended)

Import only the components you need:

```typescript
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
```

### Option 2: Full Library Bundle

Import all components at once:

```typescript
import '@francofantomius/material-components';
```

### In Your HTML

```html
<md-button variant="filled" icon="check">
  Submit
</md-button>

<md-text-field label="Your Name" variant="outlined"></md-text-field>
```

