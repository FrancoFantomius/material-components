import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdList, MdListItem } from '../src/components/list/list.js';

describe('md-list & md-list-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render headline, supporting-text, and trailing-supporting-text', async () => {
    const item = document.createElement('md-list-item') as MdListItem;
    item.headline = 'Sarah Connor';
    item.supportingText = 'Uploaded project roadmap';
    item.trailingSupportingText = '10:30 AM';
    document.body.appendChild(item);

    await item.updateComplete;

    const headlineEl = item.shadowRoot?.querySelector('.headline');
    const supportingTextEl = item.shadowRoot?.querySelector('.supporting-text');
    const trailingEl = item.shadowRoot?.querySelector('.trailing-supporting-text');

    expect(headlineEl).not.toBeNull();
    expect(headlineEl?.textContent).toBe('Sarah Connor');
    expect(supportingTextEl).not.toBeNull();
    expect(supportingTextEl?.textContent).toBe('Uploaded project roadmap');
    expect(trailingEl).not.toBeNull();
    expect(trailingEl?.textContent).toBe('10:30 AM');
  });

  it('should emit item-click on interactive list item click', async () => {
    const item = document.createElement('md-list-item') as MdListItem;
    item.interactive = true;
    item.headline = 'Item Title';
    document.body.appendChild(item);
    await item.updateComplete;

    let clicked = false;
    item.addEventListener('item-click', () => {
      clicked = true;
    });

    const inner = item.shadowRoot?.querySelector('.item') as HTMLElement;
    inner.click();
    await item.updateComplete;

    expect(clicked).toBe(true);
  });
});
