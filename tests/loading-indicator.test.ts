import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdLoadingIndicator } from '../src/components/loading-indicator/loading-indicator.js';

describe('md-loading-indicator', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render loading indicator with default properties', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.size).toBe('medium');
    expect(indicator.contained).toBe(false);
    expect(indicator.shape).toBe('morph');
    expect(indicator.paused).toBe(false);
    expect(indicator.label).toBe('Loading');

    expect(indicator.getAttribute('role')).toBe('status');
    expect(indicator.getAttribute('aria-live')).toBe('polite');
    expect(indicator.getAttribute('aria-label')).toBe('Loading');

    const container = indicator.shadowRoot?.querySelector('.container');
    expect(container).not.toBeNull();

    const shape = indicator.shadowRoot?.querySelector('.shape');
    expect(shape).not.toBeNull();
  });

  it('should support size attribute', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    indicator.size = 'small';
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.getAttribute('size')).toBe('small');

    indicator.size = 'large';
    await indicator.updateComplete;
    expect(indicator.getAttribute('size')).toBe('large');
  });

  it('should support contained attribute', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    indicator.contained = true;
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.hasAttribute('contained')).toBe(true);

    indicator.contained = false;
    await indicator.updateComplete;
    expect(indicator.hasAttribute('contained')).toBe(false);
  });

  it('should support shape attribute', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    indicator.shape = 'square';
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.getAttribute('shape')).toBe('square');

    indicator.shape = 'circle';
    await indicator.updateComplete;
    expect(indicator.getAttribute('shape')).toBe('circle');

    indicator.shape = 'clover';
    await indicator.updateComplete;
    expect(indicator.getAttribute('shape')).toBe('clover');
  });

  it('should support paused attribute', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    indicator.paused = true;
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.hasAttribute('paused')).toBe(true);
  });

  it('should support custom label and update aria-label', async () => {
    const indicator = document.createElement('md-loading-indicator') as MdLoadingIndicator;
    indicator.label = 'Fetching data...';
    document.body.appendChild(indicator);
    await indicator.updateComplete;

    expect(indicator.getAttribute('aria-label')).toBe('Fetching data...');
  });
});
