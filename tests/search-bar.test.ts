import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdSearchBar, MdSearch } from '../src/components/search-bar/search-bar.js';

describe('md-search-bar & md-search', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default search bar with placeholder and search icon', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    searchBar.placeholder = 'Search items...';
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    expect(searchBar.active).toBe(false);
    expect(searchBar.value).toBe('');

    const input = searchBar.shadowRoot?.querySelector('input');
    expect(input).not.toBeNull();
    expect(input?.placeholder).toBe('Search items...');

    const leadingIcon = searchBar.shadowRoot?.querySelector('.leading-slot md-icon');
    expect(leadingIcon?.getAttribute('name')).toBe('search');
  });

  it('should manage active state and show/hide suggestions', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    searchBar.suggestions = ['Apple', 'Banana', 'Cherry'];
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    expect(searchBar.active).toBe(false);
    expect(searchBar.hasAttribute('active')).toBe(false);

    // Suggestions container is hidden by CSS when inactive, but let's test show/close APIs
    let activeDetail: any = null;
    searchBar.addEventListener('active-change', (e: any) => {
      activeDetail = e.detail;
    });

    searchBar.show();
    await searchBar.updateComplete;

    expect(searchBar.active).toBe(true);
    expect(searchBar.hasAttribute('active')).toBe(true);
    expect(activeDetail).toEqual({ active: true });

    // Back icon should now be shown in leading slot
    const backBtn = searchBar.shadowRoot?.querySelector('.leading-slot button');
    expect(backBtn).not.toBeNull();

    // Suggestions should be rendered in shadow DOM
    const suggestionItems = searchBar.shadowRoot?.querySelectorAll('.suggestion-item');
    expect(suggestionItems?.length).toBe(3);
    expect(suggestionItems?.[0].textContent).toContain('Apple');

    searchBar.close();
    await searchBar.updateComplete;

    expect(searchBar.active).toBe(false);
    expect(searchBar.hasAttribute('active')).toBe(false);
    expect(activeDetail).toEqual({ active: false });
  });

  it('should handle input, clear button, and events', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;

    let inputDetail: any = null;
    searchBar.addEventListener('input', (e: any) => {
      inputDetail = e.detail;
    });

    input.value = 'Material 3';
    input.dispatchEvent(new Event('input'));
    await searchBar.updateComplete;

    expect(searchBar.value).toBe('Material 3');
    expect(searchBar.hasAttribute('has-value')).toBe(true);
    expect(inputDetail).toEqual({ value: 'Material 3' });

    // Clear button should be visible
    const clearBtn = searchBar.shadowRoot?.querySelector('.clear-btn') as HTMLButtonElement;
    expect(clearBtn).not.toBeNull();

    let clearFired = false;
    searchBar.addEventListener('clear', () => {
      clearFired = true;
    });

    clearBtn.click();
    await searchBar.updateComplete;

    expect(searchBar.value).toBe('');
    expect(searchBar.hasAttribute('has-value')).toBe(false);
    expect(clearFired).toBe(true);
  });

  it('should select suggestion on click, emit events, and update value', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    searchBar.suggestions = [
      { id: '1', label: 'London, UK', supportingText: 'Capital of England' },
      { id: '2', label: 'Tokyo, Japan', supportingText: 'Capital of Japan' },
    ];
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    searchBar.show();
    await searchBar.updateComplete;

    let selectedDetail: any = null;
    let searchDetail: any = null;

    searchBar.addEventListener('suggestion-select', (e: any) => {
      selectedDetail = e.detail;
    });
    searchBar.addEventListener('search', (e: any) => {
      searchDetail = e.detail;
    });

    const suggestionItems = searchBar.shadowRoot?.querySelectorAll('.suggestion-item') as NodeListOf<HTMLElement>;
    expect(suggestionItems.length).toBe(2);

    suggestionItems[1].click();
    await searchBar.updateComplete;

    expect(searchBar.value).toBe('Tokyo, Japan');
    expect(selectedDetail?.label).toBe('Tokyo, Japan');
    expect(selectedDetail?.index).toBe(1);
    expect(searchDetail?.value).toBe('Tokyo, Japan');
    // By default autoDeactivateOnSelect is true, so it should close
    expect(searchBar.active).toBe(false);
  });

  it('should support keyboard navigation across suggestions', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    searchBar.suggestions = ['First', 'Second', 'Third'];
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    searchBar.show();
    await searchBar.updateComplete;

    const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;

    // Press ArrowDown to highlight first suggestion
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await searchBar.updateComplete;

    let highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
    expect(highlighted?.length).toBe(1);
    expect(highlighted?.[0].textContent).toContain('First');

    // Press ArrowDown again for second
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    await searchBar.updateComplete;

    highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
    expect(highlighted?.[0].textContent).toContain('Second');

    // Press ArrowUp to go back to first
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    await searchBar.updateComplete;

    highlighted = searchBar.shadowRoot?.querySelectorAll('.suggestion-item.highlighted');
    expect(highlighted?.[0].textContent).toContain('First');

    // Press Enter to select highlighted
    let selectedDetail: any = null;
    searchBar.addEventListener('suggestion-select', (e: any) => {
      selectedDetail = e.detail;
    });

    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await searchBar.updateComplete;

    expect(searchBar.value).toBe('First');
    expect(selectedDetail?.label).toBe('First');
  });

  it('should close active state on Escape key or Scrim click', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    searchBar.show();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(true);

    const input = searchBar.shadowRoot?.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(false);

    searchBar.show();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(true);

    const scrim = searchBar.shadowRoot?.querySelector('.scrim') as HTMLElement;
    scrim.click();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(false);
  });

  it('should support md-search alias and responsive/fullscreen properties', async () => {
    const search = document.createElement('md-search') as MdSearch;
    search.responsive = true;
    search.fullscreen = true;
    document.body.appendChild(search);
    await search.updateComplete;

    expect(search).toBeInstanceOf(MdSearchBar);
    expect(search.hasAttribute('responsive')).toBe(true);
    expect(search.hasAttribute('fullscreen')).toBe(true);
  });

  it('should toggle active state and emit active-change event via show/close/toggle', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    const activeEvents: boolean[] = [];
    searchBar.addEventListener('active-change', (e: any) => {
      activeEvents.push(e.detail?.active);
    });

    searchBar.show();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(true);

    searchBar.close();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(false);

    searchBar.toggle();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(true);

    searchBar.toggle();
    await searchBar.updateComplete;
    expect(searchBar.active).toBe(false);

    expect(activeEvents).toEqual([true, false, true, false]);
  });

  it('should support collapse-on-mobile, pill trigger container, and middle divider with trailing icon', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    expect(searchBar.collapseOnMobile).toBe(true);
    expect(searchBar.hasAttribute('collapse-on-mobile')).toBe(true);

    // Single icon mode: no .has-trailing class, no divider
    let triggerContainer = searchBar.shadowRoot?.querySelector('.search-trigger-container') as HTMLElement;
    expect(triggerContainer).not.toBeNull();
    expect(triggerContainer.classList.contains('has-trailing')).toBe(false);
    expect(searchBar.shadowRoot?.querySelector('.trigger-divider')).toBeNull();

    // With trailing icon: has-trailing class and middle divider
    searchBar.trailingIcon = 'mic';
    await searchBar.updateComplete;

    triggerContainer = searchBar.shadowRoot?.querySelector('.search-trigger-container') as HTMLElement;
    expect(triggerContainer.classList.contains('has-trailing')).toBe(true);

    const searchBtn = searchBar.shadowRoot?.querySelector('.trigger-btn') as HTMLButtonElement;
    expect(searchBtn).not.toBeNull();

    const divider = searchBar.shadowRoot?.querySelector('.trigger-divider') as HTMLElement;
    expect(divider).not.toBeNull();

    const trailingBtn = searchBar.shadowRoot?.querySelector('.trigger-trailing-btn') as HTMLButtonElement;
    expect(trailingBtn).not.toBeNull();

    searchBtn.click();
    await searchBar.updateComplete;

    expect(searchBar.active).toBe(true);
  });

  it('should support size property (small, compact, medium, large) and compact attribute', async () => {
    const searchBar = document.createElement('md-search-bar') as MdSearchBar;
    document.body.appendChild(searchBar);
    await searchBar.updateComplete;

    expect(searchBar.size).toBe('medium');

    searchBar.size = 'small';
    await searchBar.updateComplete;
    expect(searchBar.getAttribute('size')).toBe('small');

    searchBar.size = 'compact';
    await searchBar.updateComplete;
    expect(searchBar.getAttribute('size')).toBe('compact');

    searchBar.compact = true;
    await searchBar.updateComplete;
    expect(searchBar.hasAttribute('compact')).toBe(true);

    searchBar.size = 'large';
    await searchBar.updateComplete;
    expect(searchBar.getAttribute('size')).toBe('large');
  });
});
