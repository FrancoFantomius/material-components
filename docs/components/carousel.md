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

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0;">
  <md-carousel variant="multi-browse">
    <md-carousel-item>
      <div style="height: 180px; background: var(--md-sys-color-primary-container); color: var(--md-sys-color-on-primary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 500;">Item 1</div>
    </md-carousel-item>
    <md-carousel-item>
      <div style="height: 180px; background: var(--md-sys-color-secondary-container); color: var(--md-sys-color-on-secondary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 500;">Item 2</div>
    </md-carousel-item>
    <md-carousel-item>
      <div style="height: 180px; background: var(--md-sys-color-tertiary-container); color: var(--md-sys-color-on-tertiary-container); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-weight: 500;">Item 3</div>
    </md-carousel-item>
  </md-carousel>
</div>

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

