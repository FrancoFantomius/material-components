import { html, nothing } from 'lit';
import { customElement, property, state, query, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../icon/icon.js';
import { textFieldStyles } from './text-field.css.js';

export type TextFieldVariant = 'filled' | 'outlined';

@customElement('md-text-field')
export class MdTextField extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, textFieldStyles];

  @property({ type: String, reflect: true })
  variant: TextFieldVariant = 'filled';

  @property({ type: String })
  label = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  placeholder = '';

  @property({ type: String })
  type = 'text';

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String, attribute: 'error-text' })
  errorText = '';

  @property({ type: String, attribute: 'supporting-text' })
  supportingText = '';

  @property({ type: String, attribute: 'prefix-text' })
  prefixText = '';

  @property({ type: String, attribute: 'suffix-text' })
  suffixText = '';

  @property({ type: Number, attribute: 'maxlength' })
  maxLength = -1;

  @property({ type: String })
  pattern = '';

  @property({ type: String, attribute: 'leading-icon' })
  leadingIcon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @state()
  private focused = false;

  @query('input')
  private inputElement?: HTMLInputElement;

  @queryAssignedElements({ slot: 'leading-icon' })
  private assignedLeadingIcons!: HTMLElement[];

  override connectedCallback() {
    super.connectedCallback();
    this.setFormValue(this.value);
    this.toggleAttribute('has-value', Boolean(this.value));
    this.toggleAttribute('has-placeholder', Boolean(this.placeholder));
    this.toggleAttribute('has-leading-icon', Boolean(this.leadingIcon));
  }

  override firstUpdated(changedProperties: Map<string, unknown>) {
    super.firstUpdated(changedProperties);
    this.handleSlotChange();
  }

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('value')) {
      this.setFormValue(this.value);
      this.toggleAttribute('has-value', Boolean(this.value));
      this.validateInput();
    }
    if (changedProperties.has('placeholder')) {
      this.toggleAttribute('has-placeholder', Boolean(this.placeholder));
    }
    if (changedProperties.has('leadingIcon')) {
      this.toggleAttribute('has-leading-icon', Boolean(this.leadingIcon));
    }
  }

  override formResetCallback() {
    this.value = '';
    this.error = false;
    this.toggleAttribute('has-value', false);
    this.setFormValue(null);
  }

  private handleFocus = () => {
    this.focused = true;
    this.toggleAttribute('focused', true);
  };

  private handleBlur = () => {
    this.focused = false;
    this.toggleAttribute('focused', false);
    this.validateInput();
  };

  private handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.setFormValue(this.value);
    this.emitEvent('input', { value: this.value });
  };

  private handleChange = () => {
    this.emitEvent('change', { value: this.value });
  };

  private validateInput() {
    if (!this.inputElement) return;

    if (this.required && !this.value) {
      this.setValidity({ valueMissing: true }, this.errorText || 'This field is required');
      this.error = true;
    } else if (this.pattern && !new RegExp(this.pattern).test(this.value)) {
      this.setValidity({ patternMismatch: true }, this.errorText || 'Invalid format');
      this.error = true;
    } else {
      this.setValidity({});
      if (!this.errorText) {
        this.error = false;
      }
    }
  }

  private handleSlotChange() {
    const hasLeading = Boolean(this.leadingIcon || (this.assignedLeadingIcons && this.assignedLeadingIcons.length > 0));
    this.toggleAttribute('has-leading-icon', hasLeading);
  }

  override render() {
    const displayText = this.error ? (this.errorText || this.supportingText) : this.supportingText;

    return html`
      <div class="container" @click=${() => this.inputElement?.focus()}>
        ${this.variant === 'filled' ? html`<md-ripple ?disabled=${this.disabled}></md-ripple>` : nothing}

        <span class="icon-slot leading-icon">
          <slot name="leading-icon" @slotchange=${this.handleSlotChange}>
            ${this.leadingIcon ? html`<md-icon name=${this.leadingIcon}></md-icon>` : nothing}
          </slot>
        </span>

        <div class="input-wrapper">
          ${this.label ? html`<label class="label">${this.label}</label>` : nothing}
          ${this.prefixText ? html`<span class="affix prefix">${this.prefixText}</span>` : nothing}
          <input
            type=${this.type}
            .value=${this.value}
            placeholder=${this.focused || !this.label ? this.placeholder : ''}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            maxlength=${this.maxLength > 0 ? this.maxLength : nothing}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
            @input=${this.handleInput}
            @change=${this.handleChange}
          />
          ${this.suffixText ? html`<span class="affix suffix">${this.suffixText}</span>` : nothing}
        </div>

        <span class="icon-slot trailing-icon">
          <slot name="trailing-icon">
            ${this.error ? html`<md-icon name="error" filled></md-icon>` : (this.trailingIcon ? html`<md-icon name=${this.trailingIcon}></md-icon>` : nothing)}
          </slot>
        </span>
      </div>

      ${displayText || (this.maxLength > 0)
        ? html`
            <div class="supporting-text">
              <span>${displayText}</span>
              ${this.maxLength > 0 ? html`<span>${this.value.length} / ${this.maxLength}</span>` : nothing}
            </div>
          `
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-text-field': MdTextField;
  }
}
