import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { codeStyles } from './code.css.js';
import { highlightCode } from './highlighter.js';
import { lintCode, LintDiagnostic } from './linter.js';
import '../icon/icon.js';

export type { LintDiagnostic };

@customElement('md-code')
export class MdCode extends MdBaseElement {
  static override styles = [MdBaseElement.styles, codeStyles];

  /**
   * Raw source code string. If not provided, falls back to slot/textContent.
   */
  @property({ type: String })
  code = '';

  /**
   * Language identifier (e.g. 'javascript', 'typescript', 'html', 'css', 'json', 'python', 'bash', 'sql').
   */
  @property({ type: String, reflect: true })
  language = 'plaintext';

  /**
   * Alias for language.
   */
  @property({ type: String })
  lang = '';

  /**
   * Optional filename or label to display in the header bar.
   */
  @property({ type: String })
  label = '';

  /**
   * Alias for label (filename).
   */
  @property({ type: String })
  filename = '';

  /**
   * When true, automatically lints the code for syntax issues and displays diagnostics.
   */
  @property({ type: Boolean, reflect: true })
  lint = false;

  /**
   * Custom / external diagnostic issues to display.
   */
  @property({ type: Array })
  diagnostics: LintDiagnostic[] = [];

  /**
   * Whether to show the lint issues summary bar at the bottom.
   */
  @property({
    type: Boolean,
    attribute: 'show-lint-summary',
    converter: {
      fromAttribute: (value: string | null) => value === null ? true : value !== 'false',
      toAttribute: (value: boolean) => value ? '' : null,
    },
  })
  showLintSummary = true;

  /**
   * Whether to render line numbers in a gutter.
   */
  @property({ type: Boolean, attribute: 'line-numbers', reflect: true })
  lineNumbers = false;

  /**
   * Line numbers to highlight, e.g. "1, 3-5, 8".
   */
  @property({ type: String, attribute: 'highlight-lines' })
  highlightLines = '';

  /**
   * Whether the code is copyable via the copy button.
   */
  @property({
    type: Boolean,
    reflect: true,
    converter: {
      fromAttribute: (value: string | null) => value === null ? true : value !== 'false',
      toAttribute: (value: boolean) => value ? '' : null,
    },
  })
  copyable = true;

  /**
   * When true, hides the copy button.
   */
  @property({ type: Boolean, attribute: 'hide-copy-button' })
  hideCopyButton = false;

  /**
   * When true, wraps long lines instead of scrolling horizontally.
   */
  @property({ type: Boolean, attribute: 'wrap-lines', reflect: true })
  wrapLines = false;

  /**
   * Maximum height for the code scroll container (e.g. "300px").
   */
  @property({ type: String, attribute: 'max-height' })
  maxHeight = '';

  @state()
  private isCopied = false;

  @state()
  private isIssuesExpanded = false;

  @state()
  private internalCode = '';

  @state()
  private activeDiagnostics: LintDiagnostic[] = [];

  private copyTimeout: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.extractCodeContent();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
      this.copyTimeout = null;
    }
  }

  override willUpdate(changedProperties: PropertyValues) {
    if (changedProperties.has('code') && this.code) {
      this.internalCode = this.code;
    } else if (!this.internalCode && this.textContent && this.textContent.trim()) {
      this.internalCode = this.normalizeIndentation(this.textContent);
    }
    this.runLint();
  }

  private extractCodeContent() {
    if (!this.code && this.textContent && this.textContent.trim()) {
      this.internalCode = this.normalizeIndentation(this.textContent);
      this.runLint();
    }
  }

  /**
   * Strips common leading indentation from multi-line template strings.
   */
  private normalizeIndentation(str: string): string {
    const lines = str.replace(/^\r?\n/, '').replace(/\r?\n\s*$/, '').split('\n');
    if (lines.length === 0) return str;

    let minIndent = Infinity;
    for (const line of lines) {
      if (line.trim().length === 0) continue;
      const indent = line.match(/^[ \t]*/)?.[0]?.length || 0;
      if (indent < minIndent) minIndent = indent;
    }

    if (minIndent === Infinity || minIndent === 0) return lines.join('\n');
    return lines.map(line => line.slice(minIndent)).join('\n');
  }

  /**
   * Performs linting and combines internal and external diagnostics.
   */
  public runLint(): LintDiagnostic[] {
    const activeLang = this.effectiveLanguage;
    let computed: LintDiagnostic[] = [];

    const isLintEnabled = Boolean(this.lint || this.hasAttribute('lint'));
    const source = this.internalCode || this.code || '';
    if (isLintEnabled && source) {
      computed = lintCode(source, activeLang);
    }

    if (this.diagnostics && this.diagnostics.length > 0) {
      computed = [...computed, ...this.diagnostics];
    }

    this.activeDiagnostics = computed;
    this.emitEvent('lint-complete', {
      diagnostics: computed,
      isValid: computed.length === 0,
    });
    return computed;
  }

  /**
   * Active effective language.
   */
  get effectiveLanguage(): string {
    return this.lang || this.language || 'plaintext';
  }

  /**
   * Effective filename / label.
   */
  get effectiveLabel(): string {
    return this.filename || this.label;
  }

  /**
   * Copies the current unhighlighted code to clipboard.
   */
  public async copy(): Promise<boolean> {
    const textToCopy = this.internalCode || this.code || this.textContent || '';
    if (!textToCopy) return false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for environments where clipboard API might be unavailable
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      this.isCopied = true;
      this.emitEvent('copy', { code: textToCopy });

      if (this.copyTimeout) clearTimeout(this.copyTimeout);
      this.copyTimeout = setTimeout(() => {
        this.isCopied = false;
      }, 2000);

      return true;
    } catch {
      return false;
    }
  }

  private parseHighlightedLines(): Set<number> {
    const set = new Set<number>();
    if (!this.highlightLines) return set;

    const parts = this.highlightLines.split(',');
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes('-')) {
        const [startStr, endStr] = trimmed.split('-');
        const start = parseInt(startStr || '', 10);
        const end = parseInt(endStr || '', 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let i = start; i <= end; i++) set.add(i);
        }
      } else {
        const num = parseInt(trimmed, 10);
        if (!isNaN(num)) set.add(num);
      }
    }
    return set;
  }

  private handleSlotChange = () => {
    if (!this.code) {
      this.extractCodeContent();
      this.requestUpdate();
    }
  };

  private toggleIssuesList = () => {
    this.isIssuesExpanded = !this.isIssuesExpanded;
  };

  private scrollToLine(lineNum: number) {
    const lineEl = this.shadowRoot?.querySelector(`[data-line="${lineNum}"]`);
    if (lineEl) {
      lineEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  override render() {
    const rawCode = this.internalCode || this.code || '';
    const activeLang = this.effectiveLanguage;
    const label = this.effectiveLabel;
    const showHeader = Boolean(label || activeLang !== 'plaintext' || this.copyable);
    const highlightedLines = this.parseHighlightedLines();

    // Map diagnostics by line number
    const diagnosticsByLine = new Map<number, LintDiagnostic[]>();
    for (const d of this.activeDiagnostics) {
      const list = diagnosticsByLine.get(d.line) || [];
      list.push(d);
      diagnosticsByLine.set(d.line, list);
    }

    const lines = rawCode.split('\n');
    const totalLines = lines.length;

    // Generate highlighted HTML
    const highlightedHtml = highlightCode(rawCode, activeLang);
    const highlightedLinesHtml = highlightedHtml.split('\n');

    const errorCount = this.activeDiagnostics.filter(d => d.severity === 'error' || !d.severity).length;
    const warningCount = this.activeDiagnostics.filter(d => d.severity === 'warning').length;
    const hasIssues = this.activeDiagnostics.length > 0;

    return html`
      <div class="code-container" style=${this.maxHeight ? `--md-code-max-height: ${this.maxHeight};` : ''}>
        <!-- Hidden Slot for code content fallback -->
        <div style="display: none;">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        <!-- Header -->
        ${showHeader ? html`
          <header class="code-header">
            <div class="code-header-left">
              ${activeLang && activeLang !== 'plaintext' ? html`
                <span class="lang-badge">${activeLang}</span>
              ` : nothing}
              ${label ? html`<span class="code-filename">${label}</span>` : nothing}
            </div>

            <div class="code-header-actions">
              <slot name="actions"></slot>
              ${this.copyable && !this.hideCopyButton ? html`
                <button
                  type="button"
                  class="action-btn ${this.isCopied ? 'copied' : ''}"
                  @click=${this.copy}
                  aria-label=${this.isCopied ? 'Copied to clipboard' : 'Copy code to clipboard'}
                  title=${this.isCopied ? 'Copied!' : 'Copy code'}
                >
                  <md-icon name=${this.isCopied ? 'check' : 'content_copy'}></md-icon>
                  <span>${this.isCopied ? 'Copied!' : 'Copy'}</span>
                </button>
              ` : nothing}
            </div>
          </header>
        ` : (this.copyable && !this.hideCopyButton ? html`
          <div class="floating-copy-btn">
            <button
              type="button"
              class="action-btn ${this.isCopied ? 'copied' : ''}"
              @click=${this.copy}
              aria-label=${this.isCopied ? 'Copied to clipboard' : 'Copy code'}
              title=${this.isCopied ? 'Copied!' : 'Copy code'}
            >
              <md-icon name=${this.isCopied ? 'check' : 'content_copy'}></md-icon>
              <span>${this.isCopied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        ` : nothing)}

        <!-- Body with Gutter and Code Lines -->
        <div class="code-body" style=${this.maxHeight ? `max-height: ${this.maxHeight};` : ''}>
          ${this.lineNumbers || this.hasAttribute('line-numbers') || this.lint || this.hasAttribute('lint') || this.activeDiagnostics.length > 0 ? html`
            <div class="code-gutter" aria-hidden="true">
              ${Array.from({ length: totalLines }, (_, idx) => {
                const lineNum = idx + 1;
                const diags = diagnosticsByLine.get(lineNum);
                const worstDiag = diags?.find(d => d.severity === 'error' || !d.severity) || diags?.[0];

                return html`
                  <div class="gutter-line" @click=${() => this.scrollToLine(lineNum)}>
                    ${worstDiag ? html`
                      <span
                        class="gutter-marker ${worstDiag.severity || 'error'}"
                        title="Line ${lineNum}: ${worstDiag.message}"
                      >
                        <md-icon name=${worstDiag.severity === 'warning' ? 'warning' : 'error'}></md-icon>
                      </span>
                    ` : nothing}
                    ${this.lineNumbers || this.hasAttribute('line-numbers') ? html`<span>${lineNum}</span>` : nothing}
                  </div>
                `;
              })}
            </div>
          ` : nothing}

          <pre><code>${highlightedLinesHtml.map((lineContent, idx) => {
            const lineNum = idx + 1;
            const isHighlighted = highlightedLines.has(lineNum);
            const diags = diagnosticsByLine.get(lineNum);
            const hasError = diags?.some(d => d.severity === 'error' || !d.severity);
            const hasWarning = diags?.some(d => d.severity === 'warning');

            const lineClasses = [
              'code-line',
              isHighlighted ? 'highlighted' : '',
              hasError ? 'has-error' : '',
              hasWarning && !hasError ? 'has-warning' : '',
            ].filter(Boolean).join(' ');

            return html`<div class=${lineClasses} data-line=${lineNum}>${unsafeHTML(lineContent || '&nbsp;')}</div>`;
          })}</code></pre>
        </div>

        <!-- Lint Summary Footer -->
        ${(this.lint || this.hasAttribute('lint') || this.diagnostics.length > 0 || this.activeDiagnostics.length > 0) && this.showLintSummary !== false ? html`
          <footer class="lint-footer">
            <div class="lint-footer-summary" @click=${this.toggleIssuesList} role="button" tabindex="0">
              <div class="lint-counts">
                ${hasIssues && errorCount > 0 ? html`
                  <span class="lint-count-item errors">
                    <md-icon name="error"></md-icon>
                    <span>${errorCount} ${errorCount === 1 ? 'error' : 'errors'}</span>
                  </span>
                ` : nothing}
                ${hasIssues && warningCount > 0 ? html`
                  <span class="lint-count-item warnings">
                    <md-icon name="warning"></md-icon>
                    <span>${warningCount} ${warningCount === 1 ? 'warning' : 'warnings'}</span>
                  </span>
                ` : nothing}
                ${!hasIssues ? html`
                  <span class="lint-count-item valid">
                    <md-icon name="check_circle"></md-icon>
                    <span>No syntax issues detected</span>
                  </span>
                ` : nothing}
              </div>

              ${hasIssues ? html`
                <button type="button" class="action-btn" aria-label="Toggle issues panel">
                  <md-icon name=${this.isIssuesExpanded ? 'expand_less' : 'expand_more'}></md-icon>
                  <span>${this.isIssuesExpanded ? 'Hide issues' : 'View issues'}</span>
                </button>
              ` : nothing}
            </div>

            ${hasIssues && this.isIssuesExpanded ? html`
              <div class="lint-issues-list" role="region" aria-label="Lint diagnostics">
                ${this.activeDiagnostics.map(d => html`
                  <div
                    class="lint-issue-item ${d.severity || 'error'}"
                    @click=${() => this.scrollToLine(d.line)}
                    role="button"
                    tabindex="0"
                  >
                    <md-icon name=${d.severity === 'warning' ? 'warning' : 'error'}></md-icon>
                    <div class="lint-issue-content">
                      <span class="lint-issue-loc">Line ${d.line}${d.column ? `:${d.column}` : ''}${d.rule ? ` • ${d.rule}` : ''}</span>
                      <span class="lint-issue-msg">${d.message}</span>
                    </div>
                  </div>
                `)}
              </div>
            ` : nothing}
          </footer>
        ` : nothing}
      </div>
    `;
  }
}

// Register alias md-code-block
@customElement('md-code-block')
export class MdCodeBlock extends MdCode {}

declare global {
  interface HTMLElementTagNameMap {
    'md-code': MdCode;
    'md-code-block': MdCodeBlock;
  }
}
