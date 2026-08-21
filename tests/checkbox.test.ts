import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdCheckbox } from '../src/components/checkbox/checkbox.js';

describe('md-checkbox', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle checked state on click', async () => {
    const checkbox = document.createElement('md-checkbox') as MdCheckbox;
    document.body.appendChild(checkbox);
    await checkbox.updateComplete;

    expect(checkbox.checked).toBe(false);
    checkbox.click();
    await checkbox.updateComplete;
    expect(checkbox.checked).toBe(true);
  });

  it('should support indeterminate state', async () => {
    const checkbox = document.createElement('md-checkbox') as MdCheckbox;
    checkbox.indeterminate = true;
    document.body.appendChild(checkbox);
    await checkbox.updateComplete;

    expect(checkbox.indeterminate).toBe(true);
    checkbox.click();
    await checkbox.updateComplete;
    expect(checkbox.indeterminate).toBe(false);
    expect(checkbox.checked).toBe(true);
  });
});
