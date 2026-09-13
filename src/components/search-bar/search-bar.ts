import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { searchBarStyles } from './search-bar.css.js';

export type SearchBarSize = 'small' | 'compact' | 'medium' | 'large';
export type SearchIconPosition = 'leading' | 'trailing' | 'left' | 'right';

export interface SearchSuggestion {
  id?: string;
  label: string;
  value?: string;
  supportingText?: string;
  trailingSupportingText?: string;
  icon?: string;
  [key: string]: unknown;
}

@customElement('md-search-bar')
export class MdSearchBar extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, searchBarStyles];

  @property({ type: String, reflect: true })
  size: SearchBarSize = 'medium';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Search';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Array })
  suggestions: Array<string | SearchSuggestion> = [];

  @property({ type: String, attribute: 'search-icon-position', reflect: true })
  searchIconPosition: SearchIconPosition = 'leading';

  @property({ type: String, attribute: 'leading-icon' })
  leadingIcon = 'search';

  @property({ type: String, attribute: 'active-leading-icon' })
  activeLeadingIcon = 'arrow_back';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @property({ type: Boolean, attribute: 'show-back-button' })
  showBackButton = true;

  @property({ type: Boolean, attribute: 'show-clear-button' })
  showClearButton = true;

  @property({ type: Boolean, reflect: true })
  responsive = true;

  @property({ type: Boolean, attribute: 'collapse-on-mobile', reflect: true })
  collapseOnMobile = true;

  @property({ type: Boolean, reflect: true })
  fullscreen = false;

  @property({ type: Boolean, attribute: 'auto-deactivate-on-select' })
  autoDeactivateOnSelect = true;

  @state()
  private highlightedIndex = -1;

  @state()
  private hasLeadingSlotContent = false;

  @query('input')
  private inputElement?: HTMLInputElement;

  get effectiveSearchIconPosition(): 'leading' | 'trailing' {
    return (this.searchIconPosition === 'trailing' || this.searchIconPosition === 'right' || this.trailingIcon === 'search')
      ? 'trailing'
      : 'leading';
  }

  get effectiveLeadingIcon(): string {
    if (this.effectiveSearchIconPosition === 'trailing') {
      if (this.leadingIcon && this.leadingIcon !== 'search') {
        return this.leadingIcon;
      }
      return '';
    }
    return this.leadingIcon || 'search';
  }

  get effectiveTrailingIcon(): string {
    if (this.effectiveSearchIconPosition === 'trailing') {
      return this.trailingIcon || 'search';
    }
    return this.trailingIcon;
  }

  @state()
  private hasCustomContent = false;

  get hasContent(): boolean {
    return Boolean((this.suggestions && this.suggestions.length > 0) || this.hasCustomContent);
  }

  private handleLeadingSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    const elements = slot.assignedElements({ flatten: true });
    this.hasLeadingSlotContent = elements.length > 0;
    this.requestUpdate();
  };

  private handleContentSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement;
    const elements = slot.assignedElements({ flatten: true });
    this.hasCustomContent = elements.length > 0;
    this.requestUpdate();
  };

  override connectedCallback() {
    super.connectedCallback();
    this.setFormValue(this.value);
    this.toggleAttribute('has-value', Boolean(this.value));
    this.toggleAttribute('active', this.active);
    this.toggleAttribute('collapse-on-mobile', this.collapseOnMobile);
    this.toggleAttribute('has-suggestions', this.hasContent);
    this.toggleAttribute('has-no-leading', !this.effectiveLeadingIcon && (!this.active || !this.showBackButton || !this.hasContent) && !this.hasLeadingSlotContent);
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.setFormValue(this.value);
      this.toggleAttribute('has-value', Boolean(this.value));
    }
    if (changedProperties.has('active')) {
      this.toggleAttribute('active', this.active);
      if (!this.active) {
        this.highlightedIndex = -1;
      }
    }
    if (changedProperties.has('collapseOnMobile')) {
      this.toggleAttribute('collapse-on-mobile', this.collapseOnMobile);
    }
    this.toggleAttribute('has-suggestions', this.hasContent);
    this.toggleAttribute('has-no-leading', !this.effectiveLeadingIcon && (!this.active || !this.showBackButton || !this.hasContent) && !this.hasLeadingSlotContent);
  }

  override formResetCallback() {
    this.value = '';
    this.setFormValue(null);
    this.toggleAttribute('has-value', false);
    this.highlightedIndex = -1;
  }

  /**
   * Focuses the search input field.
   */
  override focus() {
    this.inputElement?.focus();
  }

  /**
   * Opens / activates the search view.
   */
  show() {
    if (!this.active) {
      this.active = true;
      this.emitEvent('active-change', { active: true });
    }
    this.updateComplete.then(() => {
      this.inputElement?.focus();
    });
  }

  /**
   * Alias for show()
   */
  open() {
    this.show();
  }

  /**
   * Closes / deactivates the search view.
   */
  close() {
    if (this.active) {
      this.active = false;
      this.highlightedIndex = -1;
      this.emitEvent('active-change', { active: false });
    }
  }

  /**
   * Alias for close()
   */
  collapse() {
    this.close();
  }

  /**
   * Toggles the active state of the search bar.
   */
  toggle() {
    if (this.active) {
      this.close();
    } else {
      this.show();
    }
  }

  /**
   * Clears the current search input.
   */
  clear() {
    this.value = '';
    this.setFormValue('');
    this.toggleAttribute('has-value', false);
    this.highlightedIndex = -1;
    this.emitEvent('input', { value: '' });
    this.emitEvent('clear');
    this.inputElement?.focus();
  }

  private handleFocus = () => {
    if (!this.active) {
      this.active = true;
      this.emitEvent('active-change', { active: true });
    }
  };

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.setFormValue(this.value);
    this.toggleAttribute('has-value', Boolean(this.value));
    this.highlightedIndex = -1;
    this.emitEvent('input', { value: this.value });
  };

  private handleChange = () => {
    this.emitEvent('change', { value: this.value });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const count = this.suggestions.length;

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      this.inputElement?.blur();
      return;
    }

    if (event.key === 'ArrowDown') {
      if (!this.active) {
        this.show();
        return;
      }
      if (count > 0) {
        event.preventDefault();
        this.highlightedIndex = (this.highlightedIndex + 1) % count;
      }
      return;
    }

    if (event.key === 'ArrowUp') {
      if (count > 0 && this.active) {
        event.preventDefault();
        this.highlightedIndex = this.highlightedIndex <= 0 ? count - 1 : this.highlightedIndex - 1;
      }
      return;
    }

    if (event.key === 'Enter') {
      if (this.active && this.highlightedIndex >= 0 && this.highlightedIndex < count) {
        const item = this.suggestions[this.highlightedIndex];
        if (item !== undefined) {
          event.preventDefault();
          this.selectSuggestion(item, this.highlightedIndex);
        }
      } else {
        this.emitEvent('search', { value: this.value });
      }
    }
  };

  private handleTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.show();
  };

  private handleTriggerKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.show();
    }
  };

  private handleLeadingClick = (event: MouseEvent) => {
    event.stopPropagation();
    const icon = this.effectiveLeadingIcon;
    const allowed = this.emitEvent('leading-icon-click', { icon });
    if (!allowed) return;
    if (icon === 'search') {
      this.show();
    }
  };

  private handleTrailingClick = (event: MouseEvent) => {
    event.stopPropagation();
    const icon = this.effectiveTrailingIcon;
    const allowed = this.emitEvent('trailing-icon-click', { icon });
    if (!allowed) return;
    if (icon === 'search' || this.effectiveSearchIconPosition === 'trailing') {
      if (!this.active) {
        this.show();
      }
      this.emitEvent('search', { value: this.value });
    }
  };

  private handleTrailingTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    const icon = this.effectiveTrailingIcon;
    const allowed = this.emitEvent('trailing-icon-click', { icon });
    if (allowed) {
      this.show();
      if (icon === 'search' || this.effectiveSearchIconPosition === 'trailing') {
        this.emitEvent('search', { value: this.value });
      }
    }
  };

  private handleBackClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.close();
  };

  private handleScrimClick = () => {
    this.close();
  };

  private handleClearClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.clear();
  };

  private selectSuggestion(suggestion: string | SearchSuggestion, index: number) {
    const label = typeof suggestion === 'string' ? suggestion : suggestion.label;
    const value = typeof suggestion === 'string' ? suggestion : (suggestion.value ?? suggestion.label);

    this.value = value;
    this.setFormValue(this.value);
    this.toggleAttribute('has-value', Boolean(this.value));
    this.emitEvent('suggestion-select', { suggestion, label, value, index });
    this.emitEvent('search', { value: this.value, suggestion });

    if (this.autoDeactivateOnSelect) {
      this.close();
    }
  }

  private renderSuggestionItem(suggestion: string | SearchSuggestion, index: number) {
    const isString = typeof suggestion === 'string';
    const label = isString ? suggestion : suggestion.label;
    const supportingText = !isString ? suggestion.supportingText : undefined;
    const trailingSupportingText = !isString ? suggestion.trailingSupportingText : undefined;
    const iconName = !isString && suggestion.icon ? suggestion.icon : 'history';
    const isHighlighted = this.highlightedIndex === index;

    return html`
      <div
        class="suggestion-item ${isHighlighted ? 'highlighted' : ''}"
        role="option"
        aria-selected=${isHighlighted ? 'true' : 'false'}
        @click=${() => this.selectSuggestion(suggestion, index)}
      >
        <span class="suggestion-icon">
          <md-icon name=${iconName}></md-icon>
        </span>
        <div class="suggestion-text">
          <span class="suggestion-label">${label}</span>
          ${supportingText ? html`<span class="suggestion-supporting">${supportingText}</span>` : nothing}
        </div>
        ${trailingSupportingText ? html`<span class="suggestion-trailing">${trailingSupportingText}</span>` : nothing}
      </div>
    `;
  }

  override render() {
    const isFullscreenMode = this.fullscreen || (this.responsive && typeof window !== 'undefined' && window.matchMedia?.('(max-width: 768px)').matches);
    const showBack = this.active && this.showBackButton && (this.hasContent || isFullscreenMode);
    const effSearchPos = this.effectiveSearchIconPosition;
    const effLeading = this.effectiveLeadingIcon;
    const effTrailing = this.effectiveTrailingIcon;

    let triggerLeadingIcon = 'search';
    let triggerTrailingIcon = '';
    let hasTrailingTrigger = false;

    if (effSearchPos === 'trailing') {
      if (effLeading) {
        triggerLeadingIcon = effLeading;
        triggerTrailingIcon = effTrailing || 'search';
        hasTrailingTrigger = true;
      } else {
        triggerLeadingIcon = effTrailing || 'search';
        hasTrailingTrigger = false;
      }
    } else {
      triggerLeadingIcon = effLeading || 'search';
      if (effTrailing) {
        triggerTrailingIcon = effTrailing;
        hasTrailingTrigger = true;
      }
    }

    const hasLeadingHeader = showBack || Boolean(effLeading) || this.hasLeadingSlotContent;

    return html`
      <div
        class="search-trigger-container ${hasTrailingTrigger ? 'has-trailing' : ''}"
        role="button"
        tabindex="0"
        aria-label=${this.placeholder || 'Search'}
        title=${this.placeholder || 'Search'}
        ?disabled=${this.disabled}
        @click=${this.handleTriggerClick}
        @keydown=${this.handleTriggerKeyDown}
      >
        <button
          class="trigger-btn"
          type="button"
          aria-label=${triggerLeadingIcon === 'menu' ? 'Menu' : (this.placeholder || 'Search')}
          title=${triggerLeadingIcon === 'menu' ? 'Menu' : (this.placeholder || 'Search')}
          ?disabled=${this.disabled}
          @click=${(e: MouseEvent) => {
            if (effLeading && effLeading !== 'search') {
              this.handleLeadingClick(e);
            } else {
              this.handleTriggerClick(e);
            }
          }}
        >
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <md-icon name=${triggerLeadingIcon}></md-icon>
        </button>

        ${hasTrailingTrigger
          ? html`
              <div class="trigger-divider" aria-hidden="true"></div>
              <button
                class="trigger-btn trigger-trailing-btn"
                type="button"
                aria-label=${triggerTrailingIcon === 'search' ? 'Search' : triggerTrailingIcon}
                title=${triggerTrailingIcon === 'search' ? 'Search' : triggerTrailingIcon}
                ?disabled=${this.disabled}
                @click=${this.handleTrailingTriggerClick}
              >
                <md-ripple ?disabled=${this.disabled}></md-ripple>
                <md-focus-ring></md-focus-ring>
                <md-icon name=${triggerTrailingIcon}></md-icon>
              </button>
            `
          : nothing}
      </div>

      <div class="scrim" @click=${this.handleScrimClick}></div>

      <div class="search-container" role="search">
        <div class="search-bar-header">
          <span class="leading-slot ${hasLeadingHeader ? '' : 'empty'}">
            <slot name="leading" @slotchange=${this.handleLeadingSlotChange}>
              <slot name="leading-icon" @slotchange=${this.handleLeadingSlotChange}>
                ${showBack
                  ? html`
                      <button
                        class="icon-btn back-btn"
                        type="button"
                        aria-label="Back"
                        @click=${this.handleBackClick}
                      >
                        <md-ripple ?disabled=${this.disabled}></md-ripple>
                        <md-focus-ring></md-focus-ring>
                        <md-icon name=${this.activeLeadingIcon}></md-icon>
                      </button>
                    `
                  : (effLeading
                      ? html`
                          <button
                            class="icon-btn leading-btn"
                            type="button"
                            aria-label=${effLeading === 'menu' ? 'Menu' : effLeading}
                            ?disabled=${this.disabled}
                            @click=${this.handleLeadingClick}
                          >
                            <md-ripple ?disabled=${this.disabled}></md-ripple>
                            <md-focus-ring></md-focus-ring>
                            <md-icon name=${effLeading}></md-icon>
                          </button>
                        `
                      : nothing)}
              </slot>
            </slot>
          </span>

          <div class="input-wrapper">
            <input
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded=${this.active ? 'true' : 'false'}
              aria-label=${this.placeholder}
              placeholder=${this.placeholder}
              .value=${this.value}
              ?disabled=${this.disabled}
              @input=${this.handleInput}
              @change=${this.handleChange}
              @keydown=${this.handleKeyDown}
              @focus=${this.handleFocus}
              @click=${this.handleFocus}
            />
          </div>

          <span class="trailing-slot">
            ${this.showClearButton && this.value
              ? html`
                  <button
                    class="icon-btn clear-btn"
                    type="button"
                    aria-label="Clear search"
                    @click=${this.handleClearClick}
                  >
                    <md-ripple ?disabled=${this.disabled}></md-ripple>
                    <md-focus-ring></md-focus-ring>
                    <md-icon name="close"></md-icon>
                  </button>
                `
              : nothing}

            <slot name="trailing">
              <slot name="trailing-icon">
                ${effTrailing
                  ? html`
                      <button
                        class="icon-btn trailing-btn"
                        type="button"
                        aria-label=${effTrailing === 'search' ? 'Search' : effTrailing}
                        ?disabled=${this.disabled}
                        @click=${this.handleTrailingClick}
                      >
                        <md-ripple ?disabled=${this.disabled}></md-ripple>
                        <md-focus-ring></md-focus-ring>
                        <md-icon name=${effTrailing}></md-icon>
                      </button>
                    `
                  : nothing}
              </slot>
            </slot>
          </span>
        </div>

        ${this.hasContent
          ? html`
              <div class="divider"></div>

              <div class="suggestions-container" role="listbox" aria-label="Suggestions">
                <slot name="suggestions" @slotchange=${this.handleContentSlotChange}>
                  ${this.suggestions.map((item, idx) => this.renderSuggestionItem(item, idx))}
                </slot>
                <div class="extra-content">
                  <slot @slotchange=${this.handleContentSlotChange}></slot>
                </div>
              </div>
            `
          : html`
              <div class="extra-content" style="display: none;">
                <slot name="suggestions" @slotchange=${this.handleContentSlotChange}></slot>
                <slot @slotchange=${this.handleContentSlotChange}></slot>
              </div>
            `}
      </div>
    `;
  }
}

@customElement('md-search')
export class MdSearch extends MdSearchBar {}

declare global {
  interface HTMLElementTagNameMap {
    'md-search-bar': MdSearchBar;
    'md-search': MdSearch;
  }
}
