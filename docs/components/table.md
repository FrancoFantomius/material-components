---
title: Table
category: Surfaces & Containment
icon: table_chart
description: Data tables display sets of data across rows and columns with sorting, selection, and pagination.
---

## Overview

Data tables display structured datasets across rows and columns, featuring interactive column sorting, row selection checkboxes, pagination controls, and horizontal responsiveness.

### Subpath Import

```javascript
import '@francofantomius/material-components/table';
```

## Examples

### Interactive Data Table

<div style="padding: 24px; border: 1px solid var(--md-sys-color-outline-variant, #cac4d0); border-radius: 12px; background: var(--md-sys-color-surface-container-low, #f7f2fa); margin: 16px 0;">
  <md-table>
    <md-table-head>
      <md-table-row>
        <md-table-header-cell>Dessert</md-table-header-cell>
        <md-table-header-cell numeric>Calories</md-table-header-cell>
        <md-table-header-cell numeric>Fat (g)</md-table-header-cell>
      </md-table-row>
    </md-table-head>
    <md-table-body>
      <md-table-row hoverable>
        <md-table-cell>Frozen Yogurt</md-table-cell>
        <md-table-cell numeric>159</md-table-cell>
        <md-table-cell numeric>6.0</md-table-cell>
      </md-table-row>
      <md-table-row hoverable>
        <md-table-cell>Ice Cream Sandwich</md-table-cell>
        <md-table-cell numeric>237</md-table-cell>
        <md-table-cell numeric>9.0</md-table-cell>
      </md-table-row>
      <md-table-row hoverable>
        <md-table-cell>Eclair</md-table-cell>
        <md-table-cell numeric>262</md-table-cell>
        <md-table-cell numeric>16.0</md-table-cell>
      </md-table-row>
    </md-table-body>
  </md-table>
</div>

```html
<md-table>
  <md-table-head>
    <md-table-row>
      <md-table-header-cell>Dessert</md-table-header-cell>
      <md-table-header-cell numeric>Calories</md-table-header-cell>
      <md-table-header-cell numeric>Fat (g)</md-table-header-cell>
    </md-table-row>
  </md-table-head>
  <md-table-body>
    <md-table-row hoverable>
      <md-table-cell>Frozen Yogurt</md-table-cell>
      <md-table-cell numeric>159</md-table-cell>
      <md-table-cell numeric>6.0</md-table-cell>
    </md-table-row>
    <md-table-row hoverable>
      <md-table-cell>Ice Cream Sandwich</md-table-cell>
      <md-table-cell numeric>237</md-table-cell>
      <md-table-cell numeric>9.0</md-table-cell>
    </md-table-row>
    <md-table-row hoverable>
      <md-table-cell>Eclair</md-table-cell>
      <md-table-cell numeric>262</md-table-cell>
      <md-table-cell numeric>16.0</md-table-cell>
    </md-table-row>
  </md-table-body>
</md-table>
```

## API Reference

### Properties & Attributes

| Name | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `columns` | `Array` | `[]` | Array of column definition objects |
| `data` | `Array` | `[]` | Array of row data objects |
| `selectable` | `boolean` | `false` | Enables row selection checkboxes |
| `sortable` | `boolean` | `false` | Enables column sorting |
| `paginated` | `boolean` | `false` | Enables bottom pagination footer |
| `page-size` | `number` | `10` | Number of rows displayed per page |
| `current-page` | `number` | `1` | Active page index (1-indexed) |

### Events

| Name | Description |
| :--- | :--- |
| `sort` | Dispatched on column header sort click (`{ column: string, direction: 'asc' | 'desc' }`) |
| `select` | Dispatched when selection changes (`{ selectedRows: Array }`) |
| `page-change` | Dispatched when page changes (`{ page: number }`) |

