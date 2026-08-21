import { css } from 'lit';

export const codeStyles = css`
  :host {
    display: block;
    box-sizing: border-box;
    font-family: 'Fira Code', 'Roboto Mono', Consolas, Monaco, 'Courier New', monospace;
    --md-code-bg: var(--md-sys-color-surface-container, #f3edf7);
    --md-code-header-bg: var(--md-sys-color-surface-container-high, #ece6f0);
    --md-code-border: var(--md-sys-color-outline-variant, #cac4d0);
    --md-code-color: var(--md-sys-color-on-surface, #1d1b20);
    --md-code-gutter-color: var(--md-sys-color-outline, #79747e);
    --md-code-gutter-bg: transparent;
    --md-code-radius: var(--md-sys-shape-corner-medium, 12px);
    --md-code-font-size: 13.5px;
    --md-code-line-height: 1.6;
    margin: 1rem 0;
  }

  .code-container {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: var(--md-code-bg);
    border: 1px solid var(--md-code-border);
    border-radius: var(--md-code-radius);
    overflow: hidden;
    color: var(--md-code-color);
  }

  /* Header Bar */
  .code-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    background-color: var(--md-code-header-bg);
    border-bottom: 1px solid var(--md-code-border);
    min-height: 40px;
    font-size: 12.5px;
    font-weight: 500;
    user-select: none;
  }

  .code-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .lang-badge {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    background-color: var(--md-sys-color-secondary-container, #e8def8);
    color: var(--md-sys-color-on-secondary-container, #1d192b);
    border-radius: var(--md-sys-shape-corner-full, 9999px);
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .code-filename {
    font-weight: 500;
    color: var(--md-sys-color-on-surface, #1d1b20);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .code-header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
  }

  /* Floating Copy Button (when header is hidden) */
  .floating-copy-btn {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 5;
  }

  /* Copy Button inside header or floating */
  .action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    height: 28px;
    padding: 0 10px;
    border: none;
    border-radius: var(--md-sys-shape-corner-small, 8px);
    background-color: transparent;
    color: var(--md-sys-color-on-surface-variant, #49454f);
    font-family: var(--md-sys-typescale-font-family, 'Roboto', sans-serif);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 150ms ease, color 150ms ease;
    outline: none;
  }

  .action-btn:hover {
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
    color: var(--md-sys-color-on-surface, #1d1b20);
  }

  .action-btn:active {
    background-color: var(--md-sys-color-secondary-container, #e8def8);
  }

  .action-btn.copied {
    color: var(--md-sys-color-primary, #6750a4);
    background-color: var(--md-sys-color-primary-container, #eaddff);
  }

  .action-btn md-icon {
    --md-icon-size: 16px;
  }

  /* Code Viewport & Scroll Area */
  .code-body {
    position: relative;
    display: flex;
    overflow-x: auto;
    overflow-y: auto;
    font-size: var(--md-code-font-size);
    line-height: var(--md-code-line-height);
  }

  pre {
    margin: 0;
    padding: 12px 16px;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    tab-size: 2;
    flex-grow: 1;
    overflow: visible;
  }

  code {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    display: block;
  }

  :host([wrap-lines]) pre {
    white-space: pre-wrap;
    word-break: break-word;
  }

  :host(:not([wrap-lines])) pre {
    white-space: pre;
  }

  /* Line Structure */
  .code-line {
    display: block;
    padding: 0 4px;
    border-radius: 2px;
  }

  .code-line.highlighted {
    background-color: rgba(103, 80, 164, 0.12);
  }

  .code-line.has-error {
    background-color: rgba(179, 38, 30, 0.14);
  }

  .code-line.has-warning {
    background-color: rgba(230, 81, 0, 0.12);
  }

  /* Gutter & Line Numbers */
  .code-gutter {
    display: flex;
    flex-direction: column;
    padding: 12px 0 12px 10px;
    user-select: none;
    background-color: var(--md-code-gutter-bg);
    border-right: 1px solid var(--md-code-border);
    flex-shrink: 0;
    min-width: 44px;
    box-sizing: border-box;
  }

  .gutter-line {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    height: calc(var(--md-code-font-size) * var(--md-code-line-height));
    padding-right: 8px;
    color: var(--md-code-gutter-color);
    font-size: 11.5px;
  }

  .gutter-marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  .gutter-marker.error {
    color: var(--md-sys-color-error, #b3261e);
  }

  .gutter-marker.warning {
    color: #e65100;
  }

  .gutter-marker.info {
    color: var(--md-sys-color-primary, #6750a4);
  }

  .gutter-marker md-icon {
    --md-icon-size: 14px;
  }

  /* Lint Status Footer Bar */
  .lint-footer {
    display: flex;
    flex-direction: column;
    background-color: var(--md-code-header-bg);
    border-top: 1px solid var(--md-code-border);
    font-size: 12px;
    font-family: var(--md-sys-typescale-font-family, 'Roboto', sans-serif);
  }

  .lint-footer-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    cursor: pointer;
    user-select: none;
  }

  .lint-footer-summary:hover {
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
  }

  .lint-counts {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .lint-count-item {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
  }

  .lint-count-item.errors {
    color: var(--md-sys-color-error, #b3261e);
  }

  .lint-count-item.warnings {
    color: #e65100;
  }

  .lint-count-item.valid {
    color: #2e7d32;
  }

  .lint-count-item md-icon {
    --md-icon-size: 15px;
  }

  .lint-issues-list {
    display: flex;
    flex-direction: column;
    max-height: 160px;
    overflow-y: auto;
    border-top: 1px solid var(--md-code-border);
    background-color: var(--md-code-bg);
  }

  .lint-issue-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 6px 12px;
    border-bottom: 1px solid var(--md-code-border);
    cursor: pointer;
    transition: background-color 100ms ease;
  }

  .lint-issue-item:last-child {
    border-bottom: none;
  }

  .lint-issue-item:hover {
    background-color: var(--md-sys-color-surface-container-highest, #e6e0e9);
  }

  .lint-issue-item.error md-icon {
    color: var(--md-sys-color-error, #b3261e);
    --md-icon-size: 16px;
  }

  .lint-issue-item.warning md-icon {
    color: #e65100;
    --md-icon-size: 16px;
  }

  .lint-issue-item.info md-icon {
    color: var(--md-sys-color-primary, #6750a4);
    --md-icon-size: 16px;
  }

  .lint-issue-content {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex-grow: 1;
  }

  .lint-issue-loc {
    font-weight: 600;
    font-size: 11px;
    color: var(--md-sys-color-outline, #79747e);
  }

  .lint-issue-msg {
    font-size: 12px;
    color: var(--md-sys-color-on-surface, #1d1b20);
  }

  /* --- Syntax Highlighting Colors (MD3 Color Scheme Aware) --- */
  .token-keyword {
    color: var(--md-code-token-keyword, var(--md-sys-color-primary, #6750a4));
    font-weight: 600;
  }

  .token-string {
    color: var(--md-code-token-string, #198754);
  }

  .token-comment {
    color: var(--md-code-token-comment, var(--md-sys-color-outline, #79747e));
    font-style: italic;
  }

  .token-function {
    color: var(--md-code-token-function, var(--md-sys-color-tertiary, #7d5260));
    font-weight: 500;
  }

  .token-number {
    color: var(--md-code-token-number, #b35900);
  }

  .token-boolean {
    color: var(--md-code-token-boolean, #d9381e);
    font-weight: 600;
  }

  .token-constant {
    color: var(--md-code-token-constant, #b3261e);
    font-weight: 600;
  }

  .token-tag {
    color: var(--md-code-token-tag, var(--md-sys-color-primary, #6750a4));
    font-weight: 600;
  }

  .token-attr-name {
    color: var(--md-code-token-attr-name, var(--md-sys-color-secondary, #625b71));
  }

  .token-property {
    color: var(--md-code-token-property, var(--md-sys-color-primary, #6750a4));
  }

  .token-type {
    color: var(--md-code-token-type, #00838f);
    font-weight: 500;
  }

  .token-variable {
    color: var(--md-code-token-variable, #e65100);
  }

  .token-operator {
    color: var(--md-code-token-operator, var(--md-sys-color-on-surface-variant, #49454f));
  }

  .token-punctuation {
    color: var(--md-code-token-punctuation, var(--md-sys-color-outline, #79747e));
  }

  /* Dark Theme Adjustments */
  :host-context([data-theme='dark']) .token-string,
  :host([data-theme='dark']) .token-string {
    color: #4ade80;
  }

  :host-context([data-theme='dark']) .token-number,
  :host([data-theme='dark']) .token-number {
    color: #fb923c;
  }

  :host-context([data-theme='dark']) .token-type,
  :host([data-theme='dark']) .token-type {
    color: #38bdf8;
  }

  :host-context([data-theme='dark']) .token-boolean,
  :host([data-theme='dark']) .token-boolean {
    color: #f87171;
  }
`;

