import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdToolbar } from '../src/components/toolbar/toolbar.js';

describe('md-toolbar', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should create and render with default properties', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    expect(toolbar.mode).toBe('floating');
    expect(toolbar.orientation).toBe('horizontal');
    expect(toolbar.elevated).toBe(false);
    expect(toolbar.fixed).toBe(false);
    expect(toolbar.docked).toBe(false);
    expect(toolbar.getAttribute('role')).toBe('toolbar');
    expect(toolbar.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('should support floating and docked modes', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    toolbar.mode = 'docked';
    await toolbar.updateComplete;
    expect(toolbar.getAttribute('mode')).toBe('docked');

    toolbar.docked = true;
    await toolbar.updateComplete;
    expect(toolbar.hasAttribute('docked')).toBe(true);
  });

  it('should support orientation changes and reflect aria-orientation', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    toolbar.orientation = 'vertical';
    await toolbar.updateComplete;

    expect(toolbar.getAttribute('orientation')).toBe('vertical');
    expect(toolbar.getAttribute('aria-orientation')).toBe('vertical');
  });

  it('should support elevated and fixed properties', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    toolbar.elevated = true;
    toolbar.fixed = true;
    toolbar.dockPosition = 'bottom';
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    expect(toolbar.hasAttribute('elevated')).toBe(true);
    expect(toolbar.hasAttribute('fixed')).toBe(true);
    expect(toolbar.getAttribute('dock-position')).toBe('bottom');
  });

  it('should pass aria-label to inner container and support accessible labelling', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    toolbar.ariaLabel = 'Formatting Actions';
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    const container = toolbar.shadowRoot?.querySelector('.toolbar-container');
    expect(container?.getAttribute('aria-label')).toBe('Formatting Actions');
  });

  it('should render slots for leading, content, trailing, and fab', async () => {
    const toolbar = document.createElement('md-toolbar') as MdToolbar;
    toolbar.innerHTML = `
      <span slot="leading">Leading Item</span>
      <button>Action 1</button>
      <button>Action 2</button>
      <span slot="trailing">Trailing Item</span>
      <button slot="fab">FAB</button>
    `;
    document.body.appendChild(toolbar);
    await toolbar.updateComplete;

    const leadingSlot = toolbar.shadowRoot?.querySelector('slot[name="leading"]') as HTMLSlotElement;
    const defaultSlot = toolbar.shadowRoot?.querySelector('.content slot:not([name])') as HTMLSlotElement;
    const trailingSlot = toolbar.shadowRoot?.querySelector('slot[name="trailing"]') as HTMLSlotElement;
    const fabSlot = toolbar.shadowRoot?.querySelector('slot[name="fab"]') as HTMLSlotElement;

    expect(leadingSlot).toBeTruthy();
    expect(defaultSlot).toBeTruthy();
    expect(trailingSlot).toBeTruthy();
    expect(fabSlot).toBeTruthy();

    const assignedLeading = leadingSlot.assignedElements();
    expect(assignedLeading.length).toBe(1);
    expect(assignedLeading[0].textContent).toBe('Leading Item');

    const assignedDefault = defaultSlot.assignedElements();
    expect(assignedDefault.length).toBe(2);

    const assignedTrailing = trailingSlot.assignedElements();
    expect(assignedTrailing.length).toBe(1);
    expect(assignedTrailing[0].textContent).toBe('Trailing Item');

    const assignedFab = fabSlot.assignedElements();
    expect(assignedFab.length).toBe(1);
    expect(assignedFab[0].textContent).toBe('FAB');
  });
});
