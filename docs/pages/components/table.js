export default {
  id: 'table',
  title: 'Table & Data Table',
  icon: 'table_chart',
  tag: 'md-table',
  category: 'Surfaces & Containment',
  description: 'Data tables display information in a structured grid of rows and columns, featuring automatic sorting, pagination, zebra striping, loading states, and multi-row selection.',
  subpath: '@francofantomius/material-components/table',
  interactiveType: 'table',
  properties: [
    { name: 'bordered', type: 'boolean', default: 'false', description: 'Adds outer container and cell grid borders' },
    { name: 'elevated', type: 'boolean', default: 'false', description: 'Applies Material elevation shadow' },
    { name: 'striped', type: 'boolean', default: 'false', description: 'Zebra stripes alternating rows' },
    { name: 'hoverable', type: 'boolean', default: 'true', description: 'Highlights rows on mouse hover' },
    { name: 'dense', type: 'boolean', default: 'false', description: 'Compact cell and row padding' },
    { name: 'sticky-header', type: 'boolean', default: 'false', description: 'Pins the table header during scroll' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Displays indeterminate top progress bar' },
    { name: 'selectable', type: 'boolean', default: 'false', description: 'Enables row selection checkboxes' },
    { name: 'columns', type: 'TableColumn[]', default: '[]', description: 'Data-driven column configuration array' },
    { name: 'rows', type: 'Record<string, any>[]', default: '[]', description: 'Data-driven row data array' },
    { name: 'paginated', type: 'boolean', default: 'false', description: 'Renders built-in pagination footer' },
    { name: 'page', type: 'number', default: '1', description: 'Active page index (1-based)' },
    { name: 'page-size', type: 'number', default: '10', description: 'Items per page' },
    { name: 'total', type: 'number', default: '0', description: 'Total row count' }
  ],
  events: [
    { name: 'sort-change', detail: '{ column: string, direction: "asc" | "desc" | "none" }', description: 'Fired when column sorting is toggled' },
    { name: 'row-click', detail: '{ row: any, index: number }', description: 'Fired when a row is clicked' },
    { name: 'selection-change', detail: '{ selectedRows: any[] }', description: 'Fired when row selection changes' },
    { name: 'page-change', detail: '{ page: number, pageSize: number }', description: 'Fired when page changes' }
  ],
  examples: [
    {
      title: 'Data-Driven Data Table',
      description: 'Configured via columns and rows properties with interactive sorting and pagination.',
      html: `<md-table id="demo-docs-table" bordered striped hoverable elevated selectable paginated page-size="4" style="width: 100%;"></md-table>`
    }
  ]
};

