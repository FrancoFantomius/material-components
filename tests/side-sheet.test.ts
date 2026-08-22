import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSideSheet } from '../src/components/side-sheet/side-sheet.js';
import { MdIconButton } from '../src/components/icon-button/icon-button.js';

describe('md-side-sheet', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default side sheet with headline and subhead', async () => {
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
    sheet.headline = 'Filters';
    sheet.subhead = 'Refine search results';
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    expect(sheet.open).toBe(false);
    expect(sheet.type).toBe('standard');
    expect(sheet.modal).toBe(false);
    expect(sheet.side).toBe('end');

    const headline = sheet.shadowRoot?.querySelector('.headline');
    expect(headline?.textContent).toBe('Filters');

    const subhead = sheet.shadowRoot?.querySelector('.subhead');
    expect(subhead?.textContent).toBe('Refine search results');
  });

  it('should show, close, and toggle open state', async () => {
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
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
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
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
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
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
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
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
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
    sheet.type = 'standard';
    sheet.open = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await sheet.updateComplete;

    expect(sheet.open).toBe(true);
  });

  it('should close when the header close button is clicked and fire close-click event', async () => {
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
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
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
    sheet.hideCloseButton = true;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    const closeBtn = sheet.shadowRoot?.querySelector('.close-button');
    expect(closeBtn).toBeNull();
  });

  it('should support start and end side placement', async () => {
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
    sheet.side = 'start';
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    expect(sheet.getAttribute('side')).toBe('start');

    sheet.side = 'end';
    await sheet.updateComplete;
    expect(sheet.getAttribute('side')).toBe('end');
  });

  it('should render content and slots correctly', async () => {
    const sheet = document.createElement('md-side-sheet') as MdSideSheet;
    sheet.innerHTML = `
      <div id="content-body">Main sheet content</div>
      <div slot="actions"><button id="action-btn">Apply</button></div>
    `;
    document.body.appendChild(sheet);
    await sheet.updateComplete;

    const aside = sheet.shadowRoot?.querySelector('aside');
    expect(aside).not.toBeNull();
    expect(sheet.querySelector('#content-body')?.textContent).toBe('Main sheet content');
    expect(sheet.querySelector('#action-btn')?.textContent).toBe('Apply');
  });
});
