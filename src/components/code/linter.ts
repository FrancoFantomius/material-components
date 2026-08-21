export interface LintDiagnostic {
  line: number; // 1-indexed
  column?: number; // 1-indexed
  message: string;
  severity?: 'error' | 'warning' | 'info';
  rule?: string;
}

/**
 * Lints JSON code and returns diagnostics for syntax errors, trailing commas, unquoted keys, etc.
 */
export function lintJson(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const trimmed = code.trim();
  if (!trimmed) return diagnostics;

  // 1. Try standard JSON.parse first
  try {
    JSON.parse(code);
    return diagnostics;
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    
    // Attempt to extract position from error message (e.g. "at position 42" or "line 3 column 5")
    let line = 1;
    let column = 1;

    const posMatch = errorMsg.match(/at position (\d+)/i);
    const lineColMatch = errorMsg.match(/line (\d+) column (\d+)/i);

    if (lineColMatch && lineColMatch[1] && lineColMatch[2]) {
      line = parseInt(lineColMatch[1], 10);
      column = parseInt(lineColMatch[2], 10);
    } else if (posMatch && posMatch[1]) {
      const pos = parseInt(posMatch[1], 10);
      const lines = code.slice(0, pos).split('\n');
      line = lines.length;
      column = (lines[lines.length - 1]?.length || 0) + 1;
    } else {
      // Heuristic syntax analysis for specific common errors
      const lines = code.split('\n');
      let found = false;

      for (let i = 0; i < lines.length; i++) {
        const lineContent = lines[i]!;
        // Single quotes check
        if (/'[^']*'/.test(lineContent)) {
          diagnostics.push({
            line: i + 1,
            column: lineContent.indexOf("'") + 1,
            message: 'JSON strings must use double quotes, not single quotes',
            severity: 'error',
            rule: 'json-no-single-quotes',
          });
          found = true;
          break;
        }
        // Trailing comma before } or ]
        if (/,\s*([}\]])/.test(lineContent)) {
          diagnostics.push({
            line: i + 1,
            column: lineContent.search(/,\s*([}\]])/) + 1,
            message: 'Trailing comma is not allowed in standard JSON',
            severity: 'error',
            rule: 'json-no-trailing-comma',
          });
          found = true;
          break;
        }
        // Comments in JSON
        if (/\/\//.test(lineContent) || /\/\*/.test(lineContent)) {
          diagnostics.push({
            line: i + 1,
            column: lineContent.search(/\/\/|\/\*/) + 1,
            message: 'Comments are not permitted in standard JSON',
            severity: 'warning',
            rule: 'json-no-comments',
          });
          found = true;
          break;
        }
        // Unquoted key check e.g. { name: "val" }
        const unquotedKey = lineContent.match(/([{,]\s*)([a-zA-Z0-9_$]+)\s*:/);
        if (unquotedKey && unquotedKey[1] && unquotedKey[2]) {
          diagnostics.push({
            line: i + 1,
            column: lineContent.indexOf(unquotedKey[2]) + 1,
            message: `Key "${unquotedKey[2]}" must be enclosed in double quotes`,
            severity: 'error',
            rule: 'json-unquoted-key',
          });
          found = true;
          break;
        }
      }

      if (found) return diagnostics;
    }

    // Format cleaner error message
    let cleanMessage = errorMsg.replace(/^JSON\.parse:\s*/i, '').replace(/in JSON at position \d+/i, '').trim();
    if (!cleanMessage) cleanMessage = 'Invalid JSON syntax';

    diagnostics.push({
      line,
      column,
      message: cleanMessage,
      severity: 'error',
      rule: 'json-syntax-error',
    });
  }

  return diagnostics;
}

/**
 * Lints JavaScript and TypeScript code for common syntax issues.
 */
export function lintJavaScript(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');

  // Track balanced bracket stacks with line/column
  const stack: { char: string; line: number; col: number }[] = [];
  const matchMap: Record<string, string> = { '}': '{', ')': '(', ']': '[' };
  let inMultiComment = false;
  let inTemplateLiteral = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineNum = lineIdx + 1;
    const line = lines[lineIdx]!;
    let inString: string | null = null;
    let isEscaped = false;

    for (let colIdx = 0; colIdx < line.length; colIdx++) {
      const char = line[colIdx]!;
      const nextChar = line[colIdx + 1] || '';

      // Check multiline comment
      if (inMultiComment) {
        if (char === '*' && nextChar === '/') {
          inMultiComment = false;
          colIdx++;
        }
        continue;
      }

      // Check template literal
      if (inTemplateLiteral) {
        if (char === '\\') {
          colIdx++;
          continue;
        }
        if (char === '`') {
          inTemplateLiteral = false;
        }
        continue;
      }

      // String handling
      if (inString) {
        if (isEscaped) {
          isEscaped = false;
        } else if (char === '\\') {
          isEscaped = true;
        } else if (char === inString) {
          inString = null;
        }
        continue;
      }

      // Single-line comment
      if (char === '/' && nextChar === '/') {
        break;
      }

      // Start multi-line comment
      if (char === '/' && nextChar === '*') {
        inMultiComment = true;
        colIdx++;
        continue;
      }

      // Start template string
      if (char === '`') {
        inTemplateLiteral = true;
        continue;
      }

      // Start single or double quote string
      if (char === '"' || char === "'") {
        inString = char;
        continue;
      }

      // Brackets
      if (char === '{' || char === '(' || char === '[') {
        stack.push({ char, line: lineNum, col: colIdx + 1 });
      } else if (char === '}' || char === ')' || char === ']') {
        const expected = matchMap[char];
        if (stack.length === 0) {
          diagnostics.push({
            line: lineNum,
            column: colIdx + 1,
            message: `Unexpected closing '${char}' with no matching opening bracket`,
            severity: 'error',
            rule: 'js-unmatched-bracket',
          });
        } else {
          const top = stack.pop()!;
          if (top.char !== expected) {
            diagnostics.push({
              line: lineNum,
              column: colIdx + 1,
              message: `Mismatched closing '${char}', expected matching '${top.char === '{' ? '}' : top.char === '(' ? ')' : ']'}' for '${top.char}' from line ${top.line}`,
              severity: 'error',
              rule: 'js-mismatched-bracket',
            });
          }
        }
      }
    }

    if (inString) {
      diagnostics.push({
        line: lineNum,
        column: line.lastIndexOf(inString) + 1,
        message: `Unclosed string literal starting with ${inString}`,
        severity: 'error',
        rule: 'js-unclosed-string',
      });
    }

    // Common JS checks: consecutive comparison operators
    if (/====+/.test(line)) {
      diagnostics.push({
        line: lineNum,
        column: line.indexOf('====') + 1,
        message: 'Invalid equality operator: "===="',
        severity: 'error',
        rule: 'js-invalid-operator',
      });
    }
  }

  if (inMultiComment) {
    diagnostics.push({
      line: lines.length,
      column: 1,
      message: 'Unclosed multi-line comment "/*"',
      severity: 'error',
      rule: 'js-unclosed-comment',
    });
  }

  if (inTemplateLiteral) {
    diagnostics.push({
      line: lines.length,
      column: 1,
      message: 'Unclosed template literal (`...`)',
      severity: 'error',
      rule: 'js-unclosed-template',
    });
  }

  // Check remaining unclosed brackets in stack
  while (stack.length > 0) {
    const unclosed = stack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      column: unclosed.col,
      message: `Unclosed opening bracket '${unclosed.char}'`,
      severity: 'error',
      rule: 'js-unclosed-bracket',
    });
  }

  return diagnostics;
}

/**
 * Lints HTML/XML code for unclosed or mismatched tags and attribute errors.
 */
export function lintHtml(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');

  // Void elements that do not require closing tags in HTML5
  const voidTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'
  ]);

  const tagStack: { name: string; line: number; col: number }[] = [];

  // Match tags like <tag ...>, </tag>, <tag />
  const tagRegex = /<\/?([a-zA-Z0-9\-:]+)(\s+[^>]*?)?(\/?)>/g;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineNum = lineIdx + 1;
    const line = lines[lineIdx]!;

    let match: RegExpExecArray | null;
    tagRegex.lastIndex = 0;
    while ((match = tagRegex.exec(line)) !== null) {
      const fullTag = match[0];
      const tagName = (match[1] || '').toLowerCase();
      const isClosing = fullTag.startsWith('</');
      const isSelfClosing = fullTag.endsWith('/>') || voidTags.has(tagName);
      const col = match.index + 1;

      // Check for comments or doctypes
      if (tagName.startsWith('!--') || tagName.startsWith('!doctype')) {
        continue;
      }

      if (isClosing) {
        if (tagStack.length === 0) {
          diagnostics.push({
            line: lineNum,
            column: col,
            message: `Unexpected closing tag </${tagName}> without matching opening tag`,
            severity: 'error',
            rule: 'html-unmatched-closing-tag',
          });
        } else {
          const last = tagStack.pop()!;
          if (last.name !== tagName) {
            diagnostics.push({
              line: lineNum,
              column: col,
              message: `Mismatched closing tag </${tagName}>, expected </${last.name}> (opened on line ${last.line})`,
              severity: 'error',
              rule: 'html-mismatched-tag',
            });
          }
        }
      } else if (!isSelfClosing) {
        tagStack.push({ name: tagName, line: lineNum, col });
      }
    }
  }

  // Report any remaining unclosed tags
  while (tagStack.length > 0) {
    const unclosed = tagStack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      column: unclosed.col,
      message: `Unclosed tag <${unclosed.name}>`,
      severity: 'error',
      rule: 'html-unclosed-tag',
    });
  }

  return diagnostics;
}

/**
 * Lints CSS code for unclosed braces, missing colons, and malformed declarations.
 */
export function lintCss(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');
  let openBraces = 0;
  const braceStack: { line: number; col: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i]!;
    const trimmed = line.trim();

    // Skip comments and empty lines
    if (!trimmed || trimmed.startsWith('/*') || trimmed.startsWith('//')) {
      continue;
    }

    for (let c = 0; c < line.length; c++) {
      if (line[c] === '{') {
        openBraces++;
        braceStack.push({ line: lineNum, col: c + 1 });
      } else if (line[c] === '}') {
        if (openBraces === 0) {
          diagnostics.push({
            line: lineNum,
            column: c + 1,
            message: 'Unexpected closing brace "}" without opening "{"',
            severity: 'error',
            rule: 'css-unmatched-brace',
          });
        } else {
          openBraces--;
          braceStack.pop();
        }
      }
    }

    // Inside a rule block: check property declaration syntax
    if (openBraces > 0 && trimmed !== '{' && trimmed !== '}' && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
      // Check for missing colon in property: value
      if (!trimmed.includes(':') && !trimmed.startsWith('@') && !trimmed.endsWith(',')) {
        diagnostics.push({
          line: lineNum,
          column: 1,
          message: `Declaration "${trimmed}" is missing a colon ":" between property and value`,
          severity: 'warning',
          rule: 'css-missing-colon',
        });
      }
      // Check for missing semicolon if line looks like a declaration and isn't the last line of a block
      if (trimmed.includes(':') && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}')) {
        const nextLine = lines[i + 1]?.trim() || '';
        if (nextLine && !nextLine.startsWith('}')) {
          diagnostics.push({
            line: lineNum,
            column: line.length,
            message: 'Missing semicolon ";" at the end of CSS declaration',
            severity: 'warning',
            rule: 'css-missing-semicolon',
          });
        }
      }
    }
  }

  while (braceStack.length > 0) {
    const b = braceStack.pop()!;
    diagnostics.push({
      line: b.line,
      column: b.col,
      message: 'Unclosed CSS block "{"',
      severity: 'error',
      rule: 'css-unclosed-brace',
    });
  }

  return diagnostics;
}

/**
 * Lints Python code for indentation consistency, missing colons, and bracket balance.
 */
export function lintPython(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');
  let hasSpaces = false;
  let hasTabs = false;
  const bracketStack: { char: string; line: number; col: number }[] = [];
  const matchMap: Record<string, string> = { ')': '(', ']': '[', '}': '{' };

  // Keywords that must be followed by a colon
  const colonKeywords = /^\s*(def\s+.*|class\s+.*|if\s+.*|elif\s+.*|else|for\s+.*|while\s+.*|try|except(\s+.*)?|finally|with\s+.*)$/;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i]!;
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check indentation
    const indentMatch = line.match(/^([ \t]+)/);
    if (indentMatch && indentMatch[1]) {
      const indent = indentMatch[1];
      if (indent.includes(' ')) hasSpaces = true;
      if (indent.includes('\t')) hasTabs = true;

      if (hasSpaces && hasTabs) {
        diagnostics.push({
          line: lineNum,
          column: 1,
          message: 'Inconsistent indentation: mixed tabs and spaces',
          severity: 'warning',
          rule: 'python-mixed-indentation',
        });
      }
    }

    // Check missing colon
    if (colonKeywords.test(trimmed) && !trimmed.endsWith(':') && !trimmed.includes('#')) {
      diagnostics.push({
        line: lineNum,
        column: line.length,
        message: 'Expected ":" at the end of statement header',
        severity: 'error',
        rule: 'python-missing-colon',
      });
    }

    // Check bracket balance
    let inString: string | null = null;
    for (let c = 0; c < line.length; c++) {
      const ch = line[c]!;
      if (ch === '#') break; // Comment
      if (inString) {
        if (ch === inString && line[c - 1] !== '\\') inString = null;
        continue;
      }
      if (ch === '"' || ch === "'") {
        inString = ch;
        continue;
      }

      if (ch === '(' || ch === '[' || ch === '{') {
        bracketStack.push({ char: ch, line: lineNum, col: c + 1 });
      } else if (ch === ')' || ch === ']' || ch === '}') {
        const expected = matchMap[ch];
        if (bracketStack.length === 0) {
          diagnostics.push({
            line: lineNum,
            column: c + 1,
            message: `Unmatched closing '${ch}'`,
            severity: 'error',
            rule: 'python-unmatched-bracket',
          });
        } else {
          const top = bracketStack.pop()!;
          if (top.char !== expected) {
            diagnostics.push({
              line: lineNum,
              column: c + 1,
              message: `Mismatched bracket '${ch}', expected closing for '${top.char}' from line ${top.line}`,
              severity: 'error',
              rule: 'python-mismatched-bracket',
            });
          }
        }
      }
    }
  }

  while (bracketStack.length > 0) {
    const unclosed = bracketStack.pop()!;
    diagnostics.push({
      line: unclosed.line,
      column: unclosed.col,
      message: `Unclosed '${unclosed.char}'`,
      severity: 'error',
      rule: 'python-unclosed-bracket',
    });
  }

  return diagnostics;
}

/**
 * Lints Bash/Shell code for unclosed quotes, missing control block terminators (fi, done, esac).
 */
export function lintBash(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');

  const controlStack: { keyword: string; line: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i]!;
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith('#')) continue;

    // Tokens on line
    const words = trimmed.split(/\s+/);
    for (const word of words) {
      if (word === 'if') controlStack.push({ keyword: 'if', line: lineNum });
      else if (word === 'fi') {
        const last = controlStack.pop();
        if (!last || last.keyword !== 'if') {
          diagnostics.push({
            line: lineNum,
            column: line.indexOf('fi') + 1,
            message: 'Unexpected "fi" with no preceding "if"',
            severity: 'error',
            rule: 'bash-unmatched-fi',
          });
        }
      } else if (word === 'case') controlStack.push({ keyword: 'case', line: lineNum });
      else if (word === 'esac') {
        const last = controlStack.pop();
        if (!last || last.keyword !== 'case') {
          diagnostics.push({
            line: lineNum,
            column: line.indexOf('esac') + 1,
            message: 'Unexpected "esac" with no preceding "case"',
            severity: 'error',
            rule: 'bash-unmatched-esac',
          });
        }
      } else if (word === 'do') controlStack.push({ keyword: 'do', line: lineNum });
      else if (word === 'done') {
        const last = controlStack.pop();
        if (!last || last.keyword !== 'do') {
          diagnostics.push({
            line: lineNum,
            column: line.indexOf('done') + 1,
            message: 'Unexpected "done" with no preceding "do" / loop',
            severity: 'error',
            rule: 'bash-unmatched-done',
          });
        }
      }
    }
  }

  while (controlStack.length > 0) {
    const unclosed = controlStack.pop()!;
    const expected = unclosed.keyword === 'if' ? 'fi' : unclosed.keyword === 'case' ? 'esac' : 'done';
    diagnostics.push({
      line: unclosed.line,
      column: 1,
      message: `Unclosed "${unclosed.keyword}" block, missing "${expected}"`,
      severity: 'error',
      rule: 'bash-unclosed-block',
    });
  }

  return diagnostics;
}

/**
 * Lints YAML code for tab indentation and syntax anomalies.
 */
export function lintYaml(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i]!;

    // Check tabs in indentation
    if (/^\t+/.test(line) || /^ +\t+/.test(line)) {
      diagnostics.push({
        line: lineNum,
        column: 1,
        message: 'YAML forbids tab characters for indentation; use spaces instead',
        severity: 'error',
        rule: 'yaml-no-tabs',
      });
    }

    // Key-value without space after colon (e.g. key:value instead of key: value)
    const trimmed = line.trim();
    if (/^[a-zA-Z0-9_-]+:[^ \t\n\r/#]/.test(trimmed) && !trimmed.startsWith('http:') && !trimmed.startsWith('https:')) {
      diagnostics.push({
        line: lineNum,
        column: line.indexOf(':') + 1,
        message: 'YAML mappings require a space after the colon ":" (e.g. "key: value")',
        severity: 'warning',
        rule: 'yaml-missing-space',
      });
    }
  }

  return diagnostics;
}

/**
 * Lints Markdown code for broken links and unclosed code blocks.
 */
export function lintMarkdown(code: string): LintDiagnostic[] {
  const diagnostics: LintDiagnostic[] = [];
  const lines = code.split('\n');
  let openCodeFences = 0;
  let fenceStartLine = 1;

  for (let i = 0; i < lines.length; i++) {
    const lineNum = i + 1;
    const line = lines[i]!;
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      if (openCodeFences === 0) {
        openCodeFences++;
        fenceStartLine = lineNum;
      } else {
        openCodeFences--;
      }
    }
  }

  if (openCodeFences > 0) {
    diagnostics.push({
      line: fenceStartLine,
      column: 1,
      message: 'Unclosed Markdown code fence (```)',
      severity: 'error',
      rule: 'md-unclosed-fence',
    });
  }

  return diagnostics;
}

/**
 * Master lint function for any supported language.
 */
export function lintCode(code: string, language: string): LintDiagnostic[] {
  if (!code || !code.trim()) return [];

  const lang = (language || '').toLowerCase().trim();

  switch (lang) {
    case 'json':
      return lintJson(code);
    case 'javascript':
    case 'js':
    case 'typescript':
    case 'ts':
    case 'jsx':
    case 'tsx':
      return lintJavaScript(code);
    case 'html':
    case 'xml':
    case 'svg':
      return lintHtml(code);
    case 'css':
    case 'scss':
    case 'less':
      return lintCss(code);
    case 'python':
    case 'py':
      return lintPython(code);
    case 'bash':
    case 'sh':
    case 'shell':
    case 'zsh':
      return lintBash(code);
    case 'yaml':
    case 'yml':
      return lintYaml(code);
    case 'markdown':
    case 'md':
      return lintMarkdown(code);
    default:
      return [];
  }
}

