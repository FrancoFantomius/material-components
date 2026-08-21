import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdButton } from '../src/components/button/button.js';

describe('md-button', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default filled button with text', async () => {
    const button = document.createElement('md-button') as MdButton;
    button.textContent = 'Click me';
    document.body.appendChild(button);
    await button.updateComplete;

    expect(button.variant).toBe('filled');
    expect(button.disabled).toBe(false);
    const innerButton = button.shadowRoot?.querySelector('button');
    expect(innerButton).not.toBeNull();
  });

  it('should support link mode when href is provided', async () => {
    const button = document.createElement('md-button') as MdButton;
    button.href = 'https://example.com';
    button.textContent = 'Navigate';
    document.body.appendChild(button);
    await button.updateComplete;

    const innerLink = button.shadowRoot?.querySelector('a');
    expect(innerLink).not.toBeNull();
    expect(innerLink?.getAttribute('href')).toBe('https://example.com');
  });

  it('should reflect disabled state', async () => {
    const button = document.createElement('md-button') as MdButton;
    button.disabled = true;
    document.body.appendChild(button);
    await button.updateComplete;

    const innerButton = button.shadowRoot?.querySelector('button');
    expect(innerButton?.hasAttribute('disabled')).toBe(true);
  });
});
