import { html } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import { radioStyles, radioGroupStyles } from './radio.css.js';

@customElement('md-radio')
export class MdRadio extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, radioStyles];

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: String })
  value = 'on';

  override connectedCallback() {
    super.connectedCallback();
    this.tabIndex = this.disabled ? -1 : (this.checked ? 0 : -1);
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
    if (changedProperties.has('checked') || changedProperties.has('value')) {
      this.tabIndex = this.disabled ? -1 : (this.checked ? 0 : -1);
      this.updateFormValue();
    }
  }

  override formResetCallback() {
    this.checked = false;
    this.updateFormValue();
  }

  private updateFormValue() {
    this.setFormValue(this.checked ? this.value : null);
    if (this.required && !this.checked) {
      this.setValidity({ valueMissing: true }, 'Please select one of these options');
    } else {
      this.setValidity({});
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.checked) return;
    event.preventDefault();
    this.select();
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.select();
    }
  };

  select() {
    this.checked = true;
    this.updateFormValue();
    this.emitEvent('change', { checked: true, value: this.value });
    this.emitEvent('input', { checked: true, value: this.value });

    // Uncheck siblings with same name
    if (this.name) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const radios = root.querySelectorAll(`md-radio[name="${this.name}"]`) as NodeListOf<MdRadio>;
      radios.forEach((radio) => {
        if (radio !== this && radio.checked) {
          radio.checked = false;
          radio.tabIndex = -1;
        }
      });
    }
  }

  override render() {
    return html`
      <div class="container">
        <md-ripple ?disabled=${this.disabled} unbounded></md-ripple>
        <md-focus-ring></md-focus-ring>
        <div class="outer-circle">
          <div class="inner-circle"></div>
        </div>
      </div>
      <slot></slot>
    `;
  }
}

@customElement('md-radio-group')
export class MdRadioGroup extends MdBaseElement {
  static override styles = [MdBaseElement.styles, radioGroupStyles];

  @property({ type: String })
  name = '';

  @property({ type: String })
  value = '';

  @property({ type: Boolean, reflect: true })
  row = false;

  @queryAssignedElements({ selector: 'md-radio' })
  private radios!: MdRadio[];

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('change', this.handleChange);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('change', this.handleChange);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('name') || changedProperties.has('value')) {
      this.syncRadios();
    }
  }

  private handleSlotChange = () => {
    this.syncRadios();
  };

  private syncRadios() {
    let hasChecked = false;
    this.radios.forEach((radio) => {
      if (this.name && !radio.name) {
        radio.name = this.name;
      }
      if (this.value && radio.value === this.value) {
        radio.checked = true;
        hasChecked = true;
      }
    });

    if (!hasChecked && this.radios.length > 0) {
      const firstEnabled = this.radios.find((r) => !r.disabled);
      if (firstEnabled) firstEnabled.tabIndex = 0;
    }
  }

  private handleChange = (event: Event) => {
    const radio = event.target as MdRadio;
    if (radio && radio.checked) {
      this.value = radio.value;
      this.emitEvent('group-change', { value: this.value });
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const enabledRadios = this.radios.filter((r) => !r.disabled);
    if (enabledRadios.length === 0) return;

    const currentIndex = enabledRadios.findIndex((r) => r === document.activeElement || r.shadowRoot?.activeElement);

    let nextIndex = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < enabledRadios.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledRadios.length - 1;
    }

    if (nextIndex !== -1) {
      const target = enabledRadios[nextIndex];
      if (target) {
        target.select();
        target.focus();
      }
    }
  };

  override render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-radio': MdRadio;
    'md-radio-group': MdRadioGroup;
  }
}
