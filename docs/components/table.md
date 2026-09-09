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

```html
<md-table
  selectable
  sortable
  paginated
  page-size="5"
></md-table>
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

