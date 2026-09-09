---
title: Text Field
category: Inputs & Controls
icon: text_fields
description: Text fields allow users to enter and edit text, supporting filled and outlined variants, floating labels, and validation.
---

## Overview

Text fields allow users to enter and edit text, supporting filled and outlined variants, floating labels, validation states, and prefix/suffix text.

### Subpath Import

```javascript
import '@francofantomius/material-components/text-field';
```

## Examples

### Variants and Affixes

```html
<md-text-field label="Full Name" supporting-text="Your legal name"></md-text-field>
<md-text-field variant="outlined" label="Email Address" type="email" leading-icon="mail"></md-text-field>
<md-text-field variant="outlined" label="Price" prefix-text="$" suffix-text=".00" value="99"></md-text-field>
<md-text-field variant="outlined" label="Bio" maxlength="50" supporting-text="Max 50 characters"></md-text-field>
<md-text-field variant="outlined" label="Password" type="password" error error-text="Password must be at least 8 characters" value="pass"></md-text-field>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'filled' \| 'outlined'` | `'filled'` | Container visual style |
| `label` | `string` | `''` | Floating label text |
| `value` | `string` | `''` | Current input value |
| `type` | `string` | `'text'` | Input type (`text`, `email`, `password`, `number`, etc.) |
| `placeholder` | `string` | `''` | Placeholder displayed when focused |
| `prefix-text` | `string` | `''` | Affix text before the value |
| `suffix-text` | `string` | `''` | Affix text after the value |
| `supporting-text` | `string` | `''` | Helper text below the field |
| `error` | `boolean` | `false` | Forces input into error visual state |
| `error-text` | `string` | `''` | Error message shown when error is true |
| `leading-icon` | `string` | `''` | Material Symbols leading icon |
| `trailing-icon` | `string` | `''` | Material Symbols trailing icon |
| `maxlength` | `number` | `-1` | Maximum character length with visual counter |
| `required` | `boolean` | `false` | Form validation required constraint |
| `disabled` | `boolean` | `false` | Disables user input |
| `readonly` | `boolean` | `false` | Prevents text editing |
| `name` | `string` | `''` | Form submission field name |

