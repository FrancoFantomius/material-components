import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSwitch } from '../src/components/switch/switch.js';

describe('md-switch', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should toggle selected state on click', async () => {
    const sw = document.createElement('md-switch') as MdSwitch;
    document.body.appendChild(sw);
    await sw.updateComplete;

    expect(sw.selected).toBe(false);
    sw.click();
    await sw.updateComplete;
    expect(sw.selected).toBe(true);
  });

  it('should render icons when icons property is enabled', async () => {
    const sw = document.createElement('md-switch') as MdSwitch;
    sw.icons = true;
    document.body.appendChild(sw);
    await sw.updateComplete;

    const icons = sw.shadowRoot?.querySelectorAll('md-icon');
    expect(icons?.length).toBe(2);
  });
});
