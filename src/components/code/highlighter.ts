/**
 * Lightweight, robust syntax highlighter for common programming and markup languages.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function span(cls: string, content: string): string {
  return `<span class="token-${cls}">${content}</span>`;
}

/**
 * Tokenize and highlight JavaScript / TypeScript.
 */
function highlightJs(code: string): string {
  const keywords = new Set([
    'abstract', 'any', 'as', 'async', 'await', 'boolean', 'break', 'case', 'catch', 'class',
    'const', 'constructor', 'continue', 'debugger', 'declare', 'default', 'delete', 'do',
    'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
    'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface', 'is',
    'keyof', 'let', 'module', 'namespace', 'never', 'new', 'null', 'number', 'of', 'override',
    'package', 'private', 'protected', 'public', 'readonly', 'require', 'return', 'set',
    'static', 'string', 'super', 'switch', 'symbol', 'this', 'throw', 'true', 'try', 'type',
    'typeof', 'undefined', 'unique', 'unknown', 'var', 'void', 'while', 'with', 'yield'
  ]);

  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Single-line comment
    if (code[i] === '/' && code[i + 1] === '/') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = n;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Multi-line comment
    if (code[i] === '/' && code[i + 1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = n;
      else end += 2;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Template string
    if (code[i] === '`') {
      let end = i + 1;
      while (end < n && code[end] !== '`') {
        if (code[end] === '\\') end++;
        end++;
      }
      if (end < n) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Single/double quote string
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]!;
      let end = i + 1;
      while (end < n && code[end] !== q && code[end] !== '\n') {
        if (code[end] === '\\') end++;
        end++;
      }
      if (end < n && code[end] === q) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]!) || (code[i] === '.' && /[0-9]/.test(code[i + 1] || ''))) {
      let end = i;
      while (end < n && /[0-9a-fA-FxXbBoOeE_.]/.test(code[end]!)) {
        end++;
      }
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_$]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_$]/.test(code[end]!)) {
        end++;
      }
      const word = code.slice(i, end);
      // Check if followed by ( -> function call / definition
      let peek = end;
      while (peek < n && /\s/.test(code[peek]!)) peek++;
      const isFunction = code[peek] === '(';

      if (word === 'true' || word === 'false') {
        result += span('boolean', escapeHtml(word));
      } else if (word === 'null' || word === 'undefined') {
        result += span('constant', escapeHtml(word));
      } else if (keywords.has(word)) {
        result += span('keyword', escapeHtml(word));
      } else if (/^[A-Z][a-zA-Z0-9_$]*$/.test(word) && !isFunction) {
        result += span('type', escapeHtml(word));
      } else if (isFunction) {
        result += span('function', escapeHtml(word));
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Operators
    if (/[+\-*/%=&|<>!^~?:.]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[+\-*/%=&|<>!^~?:.]/.test(code[end]!)) {
        end++;
      }
      result += span('operator', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Punctuation
    if (/[{}()[\];,]/.test(code[i]!)) {
      result += span('punctuation', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight HTML / XML / SVG.
 */
function highlightHtml(code: string): string {
  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Comment <!-- ... -->
    if (code.slice(i, i + 4) === '<!--') {
      let end = code.indexOf('-->', i + 4);
      if (end === -1) end = n;
      else end += 3;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Tag <tag ...> or </tag>
    if (code[i] === '<') {
      let end = code.indexOf('>', i);
      if (end === -1) end = n;
      else end += 1;

      const tagContent = code.slice(i, end);
      // Highlight tag internals
      const tagMatch = tagContent.match(/^<\/?([a-zA-Z0-9\-:]+)/);
      if (tagMatch && tagMatch[1]) {
        let tagRes = span('punctuation', escapeHtml(tagContent.startsWith('</') ? '</' : '<'));
        tagRes += span('tag', escapeHtml(tagMatch[1]));

        let rest = tagContent.slice(tagMatch[0].length);
        // Process attributes in rest
        const attrRegex = /([a-zA-Z0-9\-:@?]+)(\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/g;
        let lastIdx = 0;
        let attrMatch: RegExpExecArray | null;

        while ((attrMatch = attrRegex.exec(rest)) !== null) {
          const matchedAttr = attrMatch[0];
          const attrName = attrMatch[1]!;
          const attrVal = attrMatch[2];

          // Text before attribute
          tagRes += escapeHtml(rest.slice(lastIdx, attrMatch.index));

          tagRes += span('attr-name', escapeHtml(attrName));
          if (attrVal) {
            const eqIdx = attrVal.indexOf('=');
            tagRes += span('operator', '=');
            const valStr = attrVal.slice(eqIdx + 1).trim();
            tagRes += span('string', escapeHtml(valStr));
          }
          lastIdx = attrRegex.lastIndex;
        }

        const trailing = rest.slice(lastIdx);
        if (trailing.endsWith('/>')) {
          tagRes += escapeHtml(trailing.slice(0, -2)) + span('punctuation', '/&gt;');
        } else if (trailing.endsWith('>')) {
          tagRes += escapeHtml(trailing.slice(0, -1)) + span('punctuation', '&gt;');
        } else {
          tagRes += escapeHtml(trailing);
        }
        result += tagRes;
      } else {
        result += escapeHtml(tagContent);
      }
      i = end;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight CSS / SCSS.
 */
function highlightCss(code: string): string {
  let result = '';
  let i = 0;
  const n = code.length;
  let inBlock = false;

  while (i < n) {
    // Comment /* ... */
    if (code[i] === '/' && code[i + 1] === '*') {
      let end = code.indexOf('*/', i + 2);
      if (end === -1) end = n;
      else end += 2;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Strings
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]!;
      let end = i + 1;
      while (end < n && code[end] !== q && code[end] !== '\n') end++;
      if (end < n && code[end] === q) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Braces
    if (code[i] === '{') {
      inBlock = true;
      result += span('punctuation', '{');
      i++;
      continue;
    }
    if (code[i] === '}') {
      inBlock = false;
      result += span('punctuation', '}');
      i++;
      continue;
    }

    // Property name inside block
    if (inBlock && /[a-zA-Z-]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_-]/.test(code[end]!)) end++;
      const name = code.slice(i, end);

      let peek = end;
      while (peek < n && /\s/.test(code[peek]!)) peek++;
      if (code[peek] === ':') {
        result += span('property', escapeHtml(name));
        result += escapeHtml(code.slice(end, peek));
        result += span('punctuation', ':');
        i = peek + 1;
        continue;
      }
    }

    // Numbers & Units
    if (/[0-9]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[0-9a-zA-Z%.]/.test(code[end]!)) end++;
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Color hex #fff
    if (code[i] === '#' && /[0-9a-fA-F]/.test(code[i + 1] || '')) {
      let end = i + 1;
      while (end < n && /[0-9a-fA-F]/.test(code[end]!)) end++;
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Punctuation
    if (/[;:(),]/.test(code[i]!)) {
      result += span('punctuation', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight JSON.
 */
function highlightJson(code: string): string {
  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Strings
    if (code[i] === '"') {
      let end = i + 1;
      while (end < n && code[end] !== '"') {
        if (code[end] === '\\') end++;
        end++;
      }
      if (end < n) end++;
      const str = code.slice(i, end);

      // Check if it's a key (followed by colon)
      let peek = end;
      while (peek < n && /\s/.test(code[peek]!)) peek++;
      if (code[peek] === ':') {
        result += span('property', escapeHtml(str));
      } else {
        result += span('string', escapeHtml(str));
      }
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9-]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[0-9.eE+-]/.test(code[end]!)) end++;
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Keywords / Booleans
    if (/[a-zA-Z]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z]/.test(code[end]!)) end++;
      const word = code.slice(i, end);
      if (word === 'true' || word === 'false') {
        result += span('boolean', escapeHtml(word));
      } else if (word === 'null') {
        result += span('constant', escapeHtml(word));
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Punctuation
    if (/[{}[\]:,]/.test(code[i]!)) {
      result += span('punctuation', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight Python.
 */
function highlightPython(code: string): string {
  const keywords = new Set([
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue', 'def', 'del',
    'elif', 'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import',
    'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'True', 'try', 'while', 'with', 'yield', 'self'
  ]);

  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Comment
    if (code[i] === '#') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = n;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Triple quotes
    if (code.slice(i, i + 3) === '"""' || code.slice(i, i + 3) === "'''") {
      const q = code.slice(i, i + 3);
      let end = code.indexOf(q, i + 3);
      if (end === -1) end = n;
      else end += 3;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Single / Double quotes
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]!;
      let end = i + 1;
      while (end < n && code[end] !== q && code[end] !== '\n') {
        if (code[end] === '\\') end++;
        end++;
      }
      if (end < n && code[end] === q) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[0-9a-fA-FxXbBoOeE_.]/.test(code[end]!)) end++;
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_]/.test(code[end]!)) end++;
      const word = code.slice(i, end);

      let peek = end;
      while (peek < n && /\s/.test(code[peek]!)) peek++;
      const isFunction = code[peek] === '(';

      if (word === 'True' || word === 'False') {
        result += span('boolean', escapeHtml(word));
      } else if (word === 'None') {
        result += span('constant', escapeHtml(word));
      } else if (keywords.has(word)) {
        result += span('keyword', escapeHtml(word));
      } else if (isFunction) {
        result += span('function', escapeHtml(word));
      } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
        result += span('type', escapeHtml(word));
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Operators
    if (/[+\-*/%=&|<>!^~@:]/.test(code[i]!)) {
      result += span('operator', escapeHtml(code[i]!));
      i++;
      continue;
    }

    // Punctuation
    if (/[{}()[\];,.]/.test(code[i]!)) {
      result += span('punctuation', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight Bash / Shell scripts.
 */
function highlightBash(code: string): string {
  const keywords = new Set([
    'case', 'do', 'done', 'elif', 'else', 'esac', 'export', 'fi', 'for', 'function',
    'if', 'in', 'return', 'select', 'then', 'time', 'until', 'while', 'sudo', 'echo',
    'cd', 'mkdir', 'rm', 'cp', 'mv', 'npm', 'npx', 'node', 'git', 'yarn', 'pnpm'
  ]);

  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Comment
    if (code[i] === '#') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = n;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // String
    if (code[i] === '"' || code[i] === "'") {
      const q = code[i]!;
      let end = i + 1;
      while (end < n && code[end] !== q && code[end] !== '\n') {
        if (code[end] === '\\') end++;
        end++;
      }
      if (end < n && code[end] === q) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Variable expansion $VAR, ${VAR}, $(CMD)
    if (code[i] === '$') {
      let end = i + 1;
      if (code[end] === '{') {
        end = code.indexOf('}', end);
        if (end === -1) end = n;
        else end += 1;
      } else if (code[end] === '(') {
        end = code.indexOf(')', end);
        if (end === -1) end = n;
        else end += 1;
      } else {
        while (end < n && /[a-zA-Z0-9_]/.test(code[end]!)) end++;
      }
      result += span('variable', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Flags -f, --flag
    if (code[i] === '-' && /[a-zA-Z-]/.test(code[i + 1] || '')) {
      let end = i + 1;
      while (end < n && /[a-zA-Z0-9_-]/.test(code[end]!)) end++;
      result += span('attr-name', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z0-9_]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_\-./]/.test(code[end]!)) end++;
      const word = code.slice(i, end);
      if (keywords.has(word)) {
        result += span('keyword', escapeHtml(word));
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Operators
    if (/[|&><=;]/.test(code[i]!)) {
      result += span('operator', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Tokenize and highlight SQL.
 */
function highlightSql(code: string): string {
  const keywords = new Set([
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'CREATE', 'TABLE', 'DROP', 'ALTER', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL',
    'ON', 'GROUP', 'BY', 'ORDER', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'ALL', 'AS',
    'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'AND', 'OR', 'NOT', 'IN', 'IS',
    'NULL', 'LIKE', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'PRIMARY',
    'KEY', 'FOREIGN', 'REFERENCES', 'INDEX', 'DEFAULT', 'CHECK', 'CONSTRAINT'
  ]);

  let result = '';
  let i = 0;
  const n = code.length;

  while (i < n) {
    // Comment -- ...
    if (code[i] === '-' && code[i + 1] === '-') {
      let end = code.indexOf('\n', i);
      if (end === -1) end = n;
      result += span('comment', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // String
    if (code[i] === "'" || code[i] === '"') {
      const q = code[i]!;
      let end = i + 1;
      while (end < n && code[end] !== q && code[end] !== '\n') end++;
      if (end < n && code[end] === q) end++;
      result += span('string', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Identifiers & Keywords
    if (/[a-zA-Z_]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[a-zA-Z0-9_]/.test(code[end]!)) end++;
      const word = code.slice(i, end);
      if (keywords.has(word.toUpperCase())) {
        result += span('keyword', escapeHtml(word));
      } else {
        result += escapeHtml(word);
      }
      i = end;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i]!)) {
      let end = i;
      while (end < n && /[0-9.]/.test(code[end]!)) end++;
      result += span('number', escapeHtml(code.slice(i, end)));
      i = end;
      continue;
    }

    // Operators & Punctuation
    if (/[=<>!+*/-]/.test(code[i]!)) {
      result += span('operator', escapeHtml(code[i]!));
      i++;
      continue;
    }

    if (/[(),;]/.test(code[i]!)) {
      result += span('punctuation', escapeHtml(code[i]!));
      i++;
      continue;
    }

    result += escapeHtml(code[i]!);
    i++;
  }

  return result;
}

/**
 * Main syntax highlight dispatcher.
 */
export function highlightCode(code: string, language: string): string {
  if (!code) return '';

  const lang = (language || '').toLowerCase().trim();

  switch (lang) {
    case 'javascript':
    case 'js':
    case 'typescript':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return highlightJs(code);
    case 'html':
    case 'xml':
    case 'svg':
      return highlightHtml(code);
    case 'css':
    case 'scss':
    case 'less':
      return highlightCss(code);
    case 'json':
      return highlightJson(code);
    case 'python':
    case 'py':
      return highlightPython(code);
    case 'bash':
    case 'sh':
    case 'shell':
    case 'zsh':
      return highlightBash(code);
    case 'sql':
      return highlightSql(code);
    default:
      return escapeHtml(code);
  }
}

