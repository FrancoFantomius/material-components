---
title: Slider
category: Inputs & Controls
icon: linear_scale
description: Sliders let users make selections from a range of values along a bar, with continuous, discrete, and dual-thumb range options.
---

## Overview

Sliders let users make selections from a range of values along a bar, featuring continuous, discrete, labeled value pins, and dual-thumb range modes.

### Subpath Import

```javascript
import '@francofantomius/material-components/slider';
```

## Examples

### Continuous and Discrete Sliders

```html
<md-slider value="40" min="0" max="100"></md-slider>
<md-slider discrete labeled step="10" value="70" min="0" max="100"></md-slider>
<md-slider range labeled value-start="20" value-end="80" min="0" max="100"></md-slider>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `0` | Single slider value |
| `value-start` | `number` | `0` | Start value for dual-thumb range slider |
| `value-end` | `number` | `100` | End value for dual-thumb range slider |
| `min` | `number` | `0` | Minimum allowable value |
| `max` | `number` | `100` | Maximum allowable value |
| `step` | `number` | `1` | Step increment |
| `discrete` | `boolean` | `false` | Displays discrete tick marks |
| `labeled` | `boolean` | `false` | Displays dynamic value tooltip pin above the thumb |
| `range` | `boolean` | `false` | Enables dual-thumb range selection |
| `disabled` | `boolean` | `false` | Disables slider interaction |
| `name` | `string` | `''` | Form submission field name |
| `name-start` | `string` | `''` | Form submission field name for range start |
| `name-end` | `string` | `''` | Form submission field name for range end |

