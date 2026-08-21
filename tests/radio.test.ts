import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdRadio, MdRadioGroup } from '../src/components/radio/radio.js';

describe('md-radio & md-radio-group', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should enforce single selection in radio group', async () => {
    const group = document.createElement('md-radio-group') as MdRadioGroup;
    group.name = 'fruit';

    const r1 = document.createElement('md-radio') as MdRadio;
    r1.value = 'apple';
    const r2 = document.createElement('md-radio') as MdRadio;
    r2.value = 'banana';

    group.appendChild(r1);
    group.appendChild(r2);
    document.body.appendChild(group);

    await group.updateComplete;
    await r1.updateComplete;
    await r2.updateComplete;

    r1.click();
    await r1.updateComplete;
    await r2.updateComplete;
    expect(r1.checked).toBe(true);
    expect(r2.checked).toBe(false);

    r2.click();
    await r1.updateComplete;
    await r2.updateComplete;
    expect(r1.checked).toBe(false);
    expect(r2.checked).toBe(true);
  });
});
