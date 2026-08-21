import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdTopAppBar } from '../src/components/top-app-bar/top-app-bar.js';

describe('md-top-app-bar & md-top-bar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default center-aligned top app bar with headline and subtitle', async () => {
    const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
    topBar.headline = 'Page Title';
    topBar.subtitle = 'Page Subtitle';
    document.body.appendChild(topBar);
    await topBar.updateComplete;

    expect(topBar.variant).toBe('center-aligned');
    const headline = topBar.shadowRoot?.querySelector('.headline');
    const subtitle = topBar.shadowRoot?.querySelector('.subtitle');
    expect(headline?.textContent).toBe('Page Title');
    expect(subtitle?.textContent).toBe('Page Subtitle');
  });

  it('should support medium and large multi-row variants', async () => {
    const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
    topBar.variant = 'medium';
    topBar.headline = 'Medium Title';
    document.body.appendChild(topBar);
    await topBar.updateComplete;

    let headlineRow = topBar.shadowRoot?.querySelector('.headline-row');
    expect(headlineRow).not.toBeNull();
    expect(headlineRow?.querySelector('.headline')?.textContent).toBe('Medium Title');

    topBar.variant = 'large';
    await topBar.updateComplete;
    headlineRow = topBar.shadowRoot?.querySelector('.headline-row');
    expect(headlineRow).not.toBeNull();
  });

  it('should reflect elevated and fixed attributes', async () => {
    const topBar = document.createElement('md-top-app-bar') as MdTopAppBar;
    topBar.elevated = true;
    topBar.fixed = true;
    document.body.appendChild(topBar);
    await topBar.updateComplete;

    expect(topBar.hasAttribute('elevated')).toBe(true);
    expect(topBar.hasAttribute('fixed')).toBe(true);
  });

  it('should work with md-top-bar alias element', async () => {
    const topBar = document.createElement('md-top-bar') as MdTopAppBar;
    topBar.headline = 'Alias Bar';
    document.body.appendChild(topBar);
    await topBar.updateComplete;

    const headline = topBar.shadowRoot?.querySelector('.headline');
    expect(headline?.textContent).toBe('Alias Bar');
  });
});
