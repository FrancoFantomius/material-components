import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdBottomSheet } from '../src/components/bottom-sheet/bottom-sheet.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';

describe('md-bottom-sheet', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default bottom sheet with headline and subhead', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.headline = 'Share options';
    sheet.subhead = 'Select a destination';
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    expect(sheet.open).toBe(false);
    expect(sheet.type).toBe('standard');
    expect(sheet.modal).toBe(false);
    expect(sheet.hideDragHandle).toBe(false);
    expect(sheet.hideCloseButton).toBe(false);

    const headline = sheet.shadowRoot?.querySelector('.headline');
    expect(headline?.textContent).toBe('Share options');

    const subhead = sheet.shadowRoot?.querySelector('.subhead');
    expect(subhead?.textContent).toBe('Select a destination');

    const dragHandle = sheet.shadowRoot?.querySelector('.drag-handle');
    expect(dragHandle).not.toBeNull();
  });

  it('should show, close, and toggle open state', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let openEvents = 0;
    let closeEvents = 0;
    sheet.addEventListener('open', () => {
      openEvents++;
    });
    sheet.addEventListener('close', () => {
      closeEvents++;
    });

    sheet.show();
    await sheet.updateComplete;
    expect(sheet.open).toBe(true);
    expect(sheet.hasAttribute('open')).toBe(true);
    expect(openEvents).toBe(1);

    sheet.close();
    await sheet.updateComplete;
    expect(sheet.open).toBe(false);
    expect(sheet.hasAttribute('open')).toBe(false);
    expect(closeEvents).toBe(1);

    sheet.toggle();
    await sheet.updateComplete;
    expect(sheet.open).toBe(true);
    expect(openEvents).toBe(2);

    sheet.toggle();
    await sheet.updateComplete;
    expect(sheet.open).toBe(false);
    expect(closeEvents).toBe(2);
  });

  it('should support modal mode via type="modal" or modal property', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.type = 'modal';
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    expect(sheet.isModalMode()).toBe(true);

    sheet.type = 'standard';
    sheet.modal = true;
    await sheet.updateComplete;
    expect(sheet.isModalMode()).toBe(true);
  });

  it('should close and fire scrim-click event when scrim is clicked in modal mode', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.type = 'modal';
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let scrimClicked = false;
    let closed = false;
    sheet.addEventListener('scrim-click', () => {
      scrimClicked = true;
    });
    sheet.addEventListener('close', () => {
      closed = true;
    });

    const scrim = sheet.shadowRoot?.querySelector('.scrim') as HTMLElement;
    expect(scrim).not.toBeNull();
    scrim.click();
    await sheet.updateComplete;

    expect(sheet.open).toBe(false);
    expect(scrimClicked).toBe(true);
    expect(closed).toBe(true);
  });

  it('should close on Escape key in modal mode and dispatch cancel event', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.modal = true;
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let cancelled = false;
    sheet.addEventListener('cancel', () => {
      cancelled = true;
    });

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await sheet.updateComplete;

    expect(sheet.open).toBe(false);
    expect(cancelled).toBe(true);
  });

  it('should not close on Escape key in standard mode', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.type = 'standard';
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await sheet.updateComplete;

    expect(sheet.open).toBe(true);
  });

  it('should close when the header close button is clicked and fire close-click event', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let closeClicked = false;
    sheet.addEventListener('close-click', () => {
      closeClicked = true;
    });

    const closeBtn = sheet.shadowRoot?.querySelector('.close-button') as MdIconButton;
    expect(closeBtn).not.toBeNull();
    closeBtn.click();
    await sheet.updateComplete;

    expect(sheet.open).toBe(false);
    expect(closeClicked).toBe(true);
  });

  it('should hide close button when hide-close-button is true', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.hideCloseButton = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    const closeBtn = sheet.shadowRoot?.querySelector('.close-button');
    expect(closeBtn).toBeNull();
  });

  it('should hide drag handle when hide-drag-handle is true', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.hideDragHandle = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    const handleContainer = sheet.shadowRoot?.querySelector('.drag-handle-container');
    expect(handleContainer).toBeNull();
  });

  it('should handle drag gesture and dismiss when dragged past threshold', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.type = 'modal';
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let dragStarted = false;
    let dragDismissed = false;
    sheet.addEventListener('drag-start', () => {
      dragStarted = true;
    });
    sheet.addEventListener('drag-dismiss', () => {
      dragDismissed = true;
    });

    const handleContainer = sheet.shadowRoot?.querySelector('.drag-handle-container') as HTMLElement;
    expect(handleContainer).not.toBeNull();

    // Start drag
    handleContainer.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientY: 100, pointerId: 1 }));
    expect(dragStarted).toBe(true);

    // Move drag downward by 150px (exceeding threshold)
    window.dispatchEvent(new PointerEvent('pointermove', { clientY: 250, pointerId: 1 }));

    // Release drag
    window.dispatchEvent(new PointerEvent('pointerup', { clientY: 250, pointerId: 1 }));
    await sheet.updateComplete;

    expect(dragDismissed).toBe(true);
    expect(sheet.open).toBe(false);
  });

  it('should snap back and not close if drag distance is below threshold', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.type = 'modal';
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    let dragDismissed = false;
    sheet.addEventListener('drag-dismiss', () => {
      dragDismissed = true;
    });

    const handleContainer = sheet.shadowRoot?.querySelector('.drag-handle-container') as HTMLElement;

    // Start drag
    handleContainer.dispatchEvent(new PointerEvent('pointerdown', { button: 0, clientY: 100, pointerId: 1 }));

    // Small drag (10px)
    window.dispatchEvent(new PointerEvent('pointermove', { clientY: 110, pointerId: 1 }));

    // Release drag
    window.dispatchEvent(new PointerEvent('pointerup', { clientY: 110, pointerId: 1 }));
    await sheet.updateComplete;

    expect(dragDismissed).toBe(false);
    expect(sheet.open).toBe(true);
  });

  it('should render content and slots correctly', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.innerHTML = `
      <div id="content-body">Main bottom sheet content</div>
      <div slot="actions"><button id="action-btn">Confirm</button></div>
    `;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    const aside = sheet.shadowRoot?.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(sheet.querySelector('#content-body')?.textContent).toBe('Main bottom sheet content');
    expect(sheet.querySelector('#action-btn')?.textContent).toBe('Confirm');
  });

  it('should reflect fullscreen property', async () => {
    const sheet = document.createElement('md-bottom-sheet') as MdBottomSheet;
    sheet.fullscreen = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    expect(sheet.hasAttribute('fullscreen')).toBe(true);
  });
});
