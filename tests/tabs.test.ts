import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdTabs, MdTab } from '../src/components/tabs/tabs.js';

describe('md-tabs', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should switch active tab on click', async () => {
    const tabs = document.createElement('md-tabs') as MdTabs;
    const tab1 = document.createElement('md-tab') as MdTab;
    tab1.label = 'Tab 1';
    const tab2 = document.createElement('md-tab') as MdTab;
    tab2.label = 'Tab 2';

    tabs.appendChild(tab1);
    tabs.appendChild(tab2);
    document.body.appendChild(tabs);

    await tabs.updateComplete;
    await tab1.updateComplete;
    await tab2.updateComplete;

    expect(tabs.activeIndex).toBe(0);
    tab2.click();
    await tabs.updateComplete;
    expect(tabs.activeIndex).toBe(1);
  });
});
