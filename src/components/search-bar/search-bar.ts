import { html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../icon/icon.js';
import { searchBarStyles } from './search-bar.css.js';

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

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = 'Search';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Array })
  suggestions: Array<string | SearchSuggestion> = [];

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

  @query('input')
  private inputElement?: HTMLInputElement;

  override connectedCallback() {
    super.connectedCallback();
    this.setFormValue(this.value);
    this.toggleAttribute('has-value', Boolean(this.value));
    this.toggleAttribute('active', this.active);
    this.toggleAttribute('collapse-on-mobile', this.collapseOnMobile);
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

  private handleTrailingTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    const customEvt = this.emitEvent('trailing-icon-click', { icon: this.trailingIcon }, true);
    if (!customEvt.defaultPrevented) {
      this.show();
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
    const showBack = this.active && this.showBackButton;
    const hasTrailing = Boolean(this.trailingIcon);

    return html`
      <div
        class="search-trigger-container ${hasTrailing ? 'has-trailing' : ''}"
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
          aria-label=${this.placeholder || 'Search'}
          title=${this.placeholder || 'Search'}
          ?disabled=${this.disabled}
          @click=${this.handleTriggerClick}
        >
          <md-icon name=${this.leadingIcon || 'search'}></md-icon>
        </button>

        ${hasTrailing
          ? html`
              <div class="trigger-divider" aria-hidden="true"></div>
              <button
                class="trigger-btn trigger-trailing-btn"
                type="button"
                aria-label=${this.trailingIcon}
                title=${this.trailingIcon}
                ?disabled=${this.disabled}
                @click=${this.handleTrailingTriggerClick}
              >
                <md-icon name=${this.trailingIcon}></md-icon>
              </button>
            `
          : nothing}
      </div>

      <div class="scrim" @click=${this.handleScrimClick}></div>

      <div class="search-container" role="search">
        <div class="search-bar-header">
          <span class="leading-slot">
            <slot name="leading-icon">
              ${showBack
                ? html`
                    <button
                      class="icon-btn"
                      type="button"
                      aria-label="Back"
                      @click=${this.handleBackClick}
                    >
                      <md-icon name=${this.activeLeadingIcon}></md-icon>
                    </button>
                  `
                : html`
                    <span class="icon-btn" style="cursor: default;">
                      <md-icon name=${this.leadingIcon}></md-icon>
                    </span>
                  `}
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
                    <md-icon name="close"></md-icon>
                  </button>
                `
              : nothing}

            <slot name="trailing-icon">
              ${this.trailingIcon
                ? html`
                    <span class="icon-btn" style="cursor: default;">
                      <md-icon name=${this.trailingIcon}></md-icon>
                    </span>
                  `
                : nothing}
            </slot>
          </span>
        </div>

        <div class="divider"></div>

        <div class="suggestions-container" role="listbox" aria-label="Suggestions">
          <slot name="suggestions">
            ${this.suggestions.map((item, idx) => this.renderSuggestionItem(item, idx))}
          </slot>
          <div class="extra-content">
            <slot></slot>
          </div>
        </div>
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
