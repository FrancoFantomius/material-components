import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdChip } from '../src/components/chip/chip.js';

describe('md-chip', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should trigger change event in filter mode', async () => {
    const chip = document.createElement('md-chip') as MdChip;
    chip.variant = 'filter';
    chip.label = 'Filter Item';
    document.body.appendChild(chip);
    await chip.updateComplete;

    let eventFired = false;
    chip.addEventListener('change', () => {
      eventFired = true;
    });

    chip.click();
    await chip.updateComplete;
    expect(chip.selected).toBe(true);
    expect(eventFired).toBe(true);
  });
});
