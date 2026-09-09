---
title: Carousel
category: Surfaces & Containment
icon: view_carousel
description: Carousels display a scrollable collection of items in multi-browse, hero, and full-screen image cards.
---

## Overview

Carousels display a scrollable collection of items in multi-browse, uncontained, or hero layouts with responsive snap points and arrow navigation.

### Subpath Import

```javascript
import '@francofantomius/material-components/carousel';
import '@francofantomius/material-components/carousel-item';
```

## Examples

### Multi-Browse Carousel

```html
<md-carousel variant="multi-browse">
  <md-carousel-item>
    <div style="height: 180px; background: var(--md-sys-color-primary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center;">Item 1</div>
  </md-carousel-item>
  <md-carousel-item>
    <div style="height: 180px; background: var(--md-sys-color-secondary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center;">Item 2</div>
  </md-carousel-item>
  <md-carousel-item>
    <div style="height: 180px; background: var(--md-sys-color-tertiary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center;">Item 3</div>
  </md-carousel-item>
</md-carousel>
```

## API Reference

### Properties & Attributes (`md-carousel`)

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `'multi-browse' \| 'hero' \| 'full'` | `'multi-browse'` | Carousel layout presentation |
| `controls` | `boolean` | `true` | Shows left/right scroll arrows |
| `loop` | `boolean` | `false` | Enables infinite looping |

### `md-carousel-item` Properties

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `aria-label` | `string` | `''` | Accessible slide label |

### Events

| Name | Description |
| :--- | :--- |
| `change` | Dispatched when active slide changes (`{ activeIndex: number }`) |

