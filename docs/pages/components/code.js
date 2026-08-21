export default {
  id: 'code',
  title: 'Code Block & Highlighter',
  tag: 'md-code',
  category: 'Utilities & Data',
  description: 'Code component with syntax highlighting for popular languages, real-time multi-language linting diagnostics, line numbers, line highlighting, and one-click copy to clipboard.',
  subpath: '@francofantomius/material-components/code',
  interactiveType: 'code',
  properties: [
    { name: 'code', type: 'string', default: "''", description: 'Source code content string (falls back to slot/textContent)' },
    { name: 'language', type: 'string', default: "'plaintext'", description: 'Language syntax: javascript, typescript, html, css, json, python, bash, sql, yaml, markdown' },
    { name: 'lang', type: 'string', default: "''", description: 'Alias for language' },
    { name: 'label', type: 'string', default: "''", description: 'Header label or filename (e.g. "button.ts", "package.json")' },
    { name: 'filename', type: 'string', default: "''", description: 'Alias for label' },
    { name: 'lint', type: 'boolean', default: 'false', description: 'Enables built-in real-time multi-language syntax linting' },
    { name: 'diagnostics', type: 'LintDiagnostic[]', default: '[]', description: 'Array of custom diagnostic issues to display ({ line, column, message, severity, rule })' },
    { name: 'show-lint-summary', type: 'boolean', default: 'true', description: 'Whether to show the collapsible lint issues summary footer bar' },
    { name: 'line-numbers', type: 'boolean', default: 'false', description: 'Renders line numbers gutter' },
    { name: 'highlight-lines', type: 'string', default: "''", description: 'Comma-separated line numbers or ranges to highlight (e.g. "1, 3-5, 8")' },
    { name: 'copyable', type: 'boolean', default: 'true', description: 'Enables clipboard copying functionality' },
    { name: 'hide-copy-button', type: 'boolean', default: 'false', description: 'Hides the copy button from the header' },
    { name: 'wrap-lines', type: 'boolean', default: 'false', description: 'Wraps long lines instead of horizontal scrolling' },
    { name: 'max-height', type: 'string', default: "''", description: 'Maximum height of the code scroll area (e.g. "300px")' }
  ],
  slots: [
    { name: '(default)', description: 'Source code text when code property is omitted' },
    { name: 'actions', description: 'Additional action buttons placed in the header bar' }
  ],
  events: [
    { name: 'copy', detail: '{ code: string }', description: 'Fired when the user copies the code to clipboard' },
    { name: 'lint-complete', detail: '{ diagnostics: LintDiagnostic[], isValid: boolean }', description: 'Fired after linting finishes with diagnosed errors/warnings' }
  ],
  cssVars: [
    { name: '--md-code-bg', default: 'var(--md-sys-color-surface-container)', description: 'Background color of the code block' },
    { name: '--md-code-header-bg', default: 'var(--md-sys-color-surface-container-high)', description: 'Background color of the header bar' },
    { name: '--md-code-border', default: 'var(--md-sys-color-outline-variant)', description: 'Border color of the code container' },
    { name: '--md-code-color', default: 'var(--md-sys-color-on-surface)', description: 'Default text color of code tokens' },
    { name: '--md-code-gutter-color', default: 'var(--md-sys-color-outline)', description: 'Text color of line numbers' },
    { name: '--md-code-radius', default: 'var(--md-sys-shape-corner-medium, 12px)', description: 'Corner border radius' },
    { name: '--md-code-font-size', default: '13.5px', description: 'Font size of the code' },
    { name: '--md-code-line-height', default: '1.6', description: 'Line height multiplier' }
  ],
  examples: [
    {
      title: 'JavaScript / TypeScript with Line Numbers and Highlighting',
      description: 'Syntax highlighting with line numbers, custom label, and highlighted lines.',
      html: `<md-code
  language="typescript"
  label="src/index.ts"
  line-numbers
  highlight-lines="4, 7-9"
>
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number }) count = 0;

  private increment() {
    this.count += 1;
  }

  render() {
    return html\`&lt;button @click=\${this.increment}&gt;Count: \${this.count}&lt;/button&gt;\`;
  }
}
</md-code>`
    },
    {
      title: 'Real-time JSON Linting with Syntax Diagnostics',
      description: 'Built-in linting detects trailing commas, single quotes, unquoted keys, and missing brackets with interactive issue navigation.',
      html: `<md-code
  language="json"
  label="invalid-config.json"
  line-numbers
  lint
>
{
  'name': '@francofantomius/material-components',
  version: '1.0.0',
  "features": [
    "syntax-highlighting",
    "multi-language-linting",
  ]
}
</md-code>`
    },
    {
      title: 'Python Linting (Indentation & Missing Colons)',
      description: 'Detects mixed indentation, unclosed brackets, and missing colons in Python control blocks.',
      html: `<md-code
  language="python"
  label="calculator.py"
  line-numbers
  lint
>
def calculate_area(width, height)
    if width <= 0 or height <= 0:
      raise ValueError("Dimensions must be positive")
    return width * height
</md-code>`
    },
    {
      title: 'HTML & CSS Highlighting',
      description: 'Highlighting for HTML markup with attribute names, values, and CSS styling.',
      html: `<md-code
  language="html"
  label="card-preview.html"
>
&lt;div class="material-card"&gt;
  &lt;h2 class="title"&gt;Material Design 3&lt;/h2&gt;
  &lt;p class="description"&gt;Accessible, responsive Web Components.&lt;/p&gt;
  &lt;md-button variant="filled"&gt;Explore More&lt;/md-button&gt;
&lt;/div&gt;
</md-code>`
    },
    {
      title: 'Terminal / Bash Command with One-Click Copy',
      description: 'Clean shell command snippet with copy-to-clipboard button and terminal label.',
      html: `<md-code
  language="bash"
  label="Terminal"
  code="npm install @francofantomius/material-components lit"
></md-code>`
    }
  ]
};

