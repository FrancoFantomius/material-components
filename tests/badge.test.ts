import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdBadge } from '../src/components/badge/badge.js';

describe('md-badge', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render value and dot states', async () => {
    const badge = document.createElement('md-badge') as MdBadge;
    badge.value = '5';
    document.body.appendChild(badge);
    await badge.updateComplete;

    const badgeSpan = badge.shadowRoot?.querySelector('.badge');
    expect(badgeSpan?.textContent?.trim()).toBe('5');
  });
});
