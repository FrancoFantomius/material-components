import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdTextField } from '../src/components/text-field/text-field.js';

describe('md-text-field', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render with label and update value', async () => {
    const textField = document.createElement('md-text-field') as MdTextField;
    textField.label = 'Username';
    textField.value = 'JohnDoe';
    document.body.appendChild(textField);
    await textField.updateComplete;

    const input = textField.shadowRoot?.querySelector('input');
    expect(input?.value).toBe('JohnDoe');
    const label = textField.shadowRoot?.querySelector('.label');
    expect(label?.textContent).toBe('Username');
  });

  it('should participate in form submission and validation', async () => {
    const form = document.createElement('form');
    const textField = document.createElement('md-text-field') as MdTextField;
    textField.name = 'email';
    textField.value = 'test@example.com';
    textField.required = true;
    form.appendChild(textField);
    document.body.appendChild(form);
    await textField.updateComplete;

    expect(textField.checkValidity()).toBe(true);

    textField.value = '';
    await textField.updateComplete;
    expect(textField.checkValidity()).toBe(false);
  });

  it('should reflect has-leading-icon and has-value attributes', async () => {
    const textField = document.createElement('md-text-field') as MdTextField;
    textField.leadingIcon = 'email';
    textField.value = 'user@example.com';
    document.body.appendChild(textField);
    await textField.updateComplete;

    expect(textField.hasAttribute('has-leading-icon')).toBe(true);
    expect(textField.hasAttribute('has-value')).toBe(true);

    textField.value = '';
    await textField.updateComplete;
    expect(textField.hasAttribute('has-value')).toBe(false);
    expect(textField.hasAttribute('has-leading-icon')).toBe(true);
  });
});
