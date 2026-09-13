---
title: Code
category: Utilities & Data
icon: terminal
description: Syntax highlighting code container with line numbers, language labels, and one-click clipboard copy.
---

## Overview

Code container providing syntax highlighting, optional line numbering, language badges, and built-in clipboard copying.

### Subpath Import

```javascript
import '@francofantomius/material-components/code';
```

## Examples

### Syntax Highlighted Code

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0;">
  <md-code
    language="javascript"
    label="JavaScript"
    code="const greeting = 'Hello, Material Design 3!';
console.log(greeting);"
  ></md-code>
</div>

```html
<md-code
  language="javascript"
  label="JavaScript"
  code="const greeting = 'Hello, Material Design 3!';
console.log(greeting);"
></md-code>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `code` | `string` | `''` | Source code string to highlight and display |
| `language` | `string` | `'plaintext'` | Syntax highlighting language |
| `label` | `string` | `''` | Header label text |
| `copyable` | `boolean` | `true` | Displays copy-to-clipboard button |
| `line-numbers` | `boolean` | `false` | Displays left line number gutter |

### Events

| Name | Description |
| :--- | :--- |
| `copy` | Dispatched when code is copied to clipboard (`{ code: string }`) |

