import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import { checkboxStyles } from './checkbox.css.js';

@customElement('md-checkbox')
export class MdCheckbox extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, checkboxStyles];

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  @property({ type: Boolean, reflect: true })
  error = false;

  @property({ type: String })
  value = 'on';

  @query('input')
  private inputElement?: HTMLInputElement;

  override connectedCallback() {
    super.connectedCallback();
    this.tabIndex = this.disabled ? -1 : 0;
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
    this.updateFormValue();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('checked') || changedProperties.has('indeterminate') || changedProperties.has('value')) {
      this.updateFormValue();
    }
  }

  override formResetCallback() {
    this.checked = false;
    this.indeterminate = false;
    this.updateFormValue();
  }

  private updateFormValue() {
    this.setFormValue(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      this.setValidity({ valueMissing: true }, 'Please check this box if you want to proceed');
    } else {
      this.setValidity({});
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return;
    event.preventDefault();
    this.toggle();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  };

  private toggle() {
    if (this.indeterminate) {
      this.indeterminate = false;
      this.checked = true;
    } else {
      this.checked = !this.checked;
    }
    this.updateFormValue();
    this.emitEvent('change', { checked: this.checked, indeterminate: this.indeterminate });
    this.emitEvent('input', { checked: this.checked, indeterminate: this.indeterminate });
  }

  override render() {
    return html`
      <div class="container">
        <div class="box">
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <!-- Checkmark SVG -->
          <svg class="mark check" viewBox="0 0 18 18">
            <polyline points="3.5,9.5 7,13 14.5,5.5"></polyline>
          </svg>
          <!-- Indeterminate Dash SVG -->
          <svg class="mark dash" viewBox="0 0 18 18">
            <line x1="3.5" y1="9" x2="14.5" y2="9"></line>
          </svg>
        </div>
        <input
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          tabindex="-1"
          aria-hidden="true"
        />
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-checkbox': MdCheckbox;
  }
}
