import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdCode, MdCodeBlock } from '../src/components/code/code.js';

describe('md-code', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render code block from code property and language badge', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'javascript';
    codeEl.label = 'app.js';
    codeEl.code = 'const greeting = "Hello world";';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    expect(codeEl.effectiveLanguage).toBe('javascript');
    expect(codeEl.effectiveLabel).toBe('app.js');

    const badge = codeEl.shadowRoot?.querySelector('.lang-badge');
    expect(badge?.textContent?.trim().toLowerCase()).toBe('javascript');

    const filename = codeEl.shadowRoot?.querySelector('.code-filename');
    expect(filename?.textContent?.trim()).toBe('app.js');

    const codeContent = codeEl.shadowRoot?.querySelector('code');
    expect(codeContent?.textContent).toContain('const greeting = "Hello world";');
  });

  it('should highlight syntax tokens for common languages', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'typescript';
    codeEl.code = 'const count: number = 42;\nfunction run() { return true; }';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const keywords = codeEl.shadowRoot?.querySelectorAll('.token-keyword');
    expect(keywords?.length).toBeGreaterThan(0);

    const functions = codeEl.shadowRoot?.querySelectorAll('.token-function');
    expect(functions?.length).toBeGreaterThan(0);

    const numbers = codeEl.shadowRoot?.querySelectorAll('.token-number');
    expect(numbers?.length).toBeGreaterThan(0);
  });

  it('should perform built-in linting for JSON with syntax errors', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'json';
    codeEl.lint = true;
    codeEl.code = '{\n  \'name\': "test",\n  "trailing": true,\n}';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.length).toBeGreaterThan(0);
    await codeEl.updateComplete;

    const errorMarkers = codeEl.shadowRoot?.querySelectorAll('.gutter-marker.error');
    expect(errorMarkers?.length).toBeGreaterThan(0);

    const summary = codeEl.shadowRoot?.querySelector('.lint-count-item.errors');
    expect(summary).not.toBeNull();
  });

  it('should perform built-in linting for JavaScript unmatched brackets', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'javascript';
    codeEl.lint = true;
    codeEl.code = 'function test() {\n  const x = [1, 2, 3;\n}';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.message.includes('Mismatched closing') || d.message.includes('Unclosed'))).toBe(true);
  });

  it('should perform built-in linting for HTML unclosed tags', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'html';
    codeEl.lint = true;
    codeEl.code = '<div><span>Hello</div>';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.rule === 'html-mismatched-tag' || d.message.includes('Mismatched'))).toBe(true);
  });

  it('should perform built-in linting for Python indentation and missing colons', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'python';
    codeEl.lint = true;
    codeEl.code = 'def greet(name)\n\tprint("Hello")\n    print("World")';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.rule === 'python-missing-colon')).toBe(true);
    expect(diags.some(d => d.rule === 'python-mixed-indentation')).toBe(true);
  });

  it('should support custom external diagnostics', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.code = 'const unused = 1;';
    codeEl.diagnostics = [
      { line: 1, column: 7, message: '"unused" is defined but never used', severity: 'warning', rule: 'no-unused-vars' }
    ];
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.length).toBe(1);
    expect(diags[0]?.rule).toBe('no-unused-vars');
    await codeEl.updateComplete;

    const warnMarker = codeEl.shadowRoot?.querySelector('.gutter-marker.warning');
    expect(warnMarker).not.toBeNull();
  });

  it('should render line numbers and highlight designated lines', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.lineNumbers = true;
    codeEl.highlightLines = '2, 4-5';
    codeEl.code = 'line 1\nline 2\nline 3\nline 4\nline 5';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const gutter = codeEl.shadowRoot?.querySelector('.code-gutter');
    expect(gutter).not.toBeNull();

    const line2 = codeEl.shadowRoot?.querySelector('[data-line="2"]');
    expect(line2?.classList.contains('highlighted')).toBe(true);

    const line3 = codeEl.shadowRoot?.querySelector('[data-line="3"]');
    expect(line3?.classList.contains('highlighted')).toBe(false);

    const line4 = codeEl.shadowRoot?.querySelector('[data-line="4"]');
    expect(line4?.classList.contains('highlighted')).toBe(true);
  });

  it('should support copy button and emit copy event', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.code = 'console.log("copy test");';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    let copiedText = '';
    codeEl.addEventListener('copy', (e: any) => {
      copiedText = e.detail.code;
    });

    const success = await codeEl.copy();
    expect(success).toBe(true);
    expect(copiedText).toBe('console.log("copy test");');
  });

  it('should support md-code-block alias', async () => {
    const codeBlock = document.createElement('md-code-block') as MdCodeBlock;
    codeBlock.code = 'test alias';
    codeBlock.wrapLines = true;
    document.body.appendChild(codeBlock);
    await codeBlock.updateComplete;

    expect(codeBlock).toBeInstanceOf(MdCode);
    expect(codeBlock.hasAttribute('wrap-lines')).toBe(true);
  });

  it('should perform built-in linting for CSS syntax errors', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'css';
    codeEl.lint = true;
    codeEl.code = '.container {\n  color: red\n  background: blue;\n';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.rule === 'css-missing-semicolon' || d.rule === 'css-unclosed-brace')).toBe(true);
  });

  it('should perform built-in linting for Bash unclosed control blocks', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'bash';
    codeEl.lint = true;
    codeEl.code = 'if [ "$1" = "test" ]; then\n  echo "hello"\n';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.rule === 'bash-unclosed-block')).toBe(true);
  });

  it('should perform built-in linting for YAML tab indentation', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'yaml';
    codeEl.lint = true;
    codeEl.code = 'server:\n\tport: 8080';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const diags = codeEl.runLint();
    expect(diags.some(d => d.rule === 'yaml-no-tabs')).toBe(true);
  });

  it('should read code from textContent/slot when code property is omitted', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'javascript';
    codeEl.textContent = '  const a = 10;\n  const b = 20;';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const codeContent = codeEl.shadowRoot?.querySelector('code');
    expect(codeContent?.textContent).toContain('const a = 10;');
  });

  it('should hide copy button when hide-copy-button is set', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.code = 'const hidden = true;';
    codeEl.hideCopyButton = true;
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const copyBtn = codeEl.shadowRoot?.querySelector('.action-btn');
    expect(copyBtn).toBeNull();
  });

  it('should preserve spaces between HTML tags and attribute names', async () => {
    const codeEl = document.createElement('md-code') as MdCode;
    codeEl.language = 'html';
    codeEl.code = '<md-button variant="filled">Filled</md-button>';
    document.body.appendChild(codeEl);
    await codeEl.updateComplete;

    const codeContent = codeEl.shadowRoot?.querySelector('code');
    expect(codeContent?.textContent).toContain('<md-button variant="filled">Filled</md-button>');

    const tag = codeEl.shadowRoot?.querySelector('.token-tag');
    const attr = codeEl.shadowRoot?.querySelector('.token-attr-name');
    expect(tag?.textContent).toBe('md-button');
    expect(attr?.textContent).toBe('variant');
  });
});
