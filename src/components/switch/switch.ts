import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { MdFormAssociatedElement } from '../../internal/form-associated.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { switchStyles } from './switch.css.js';

@customElement('md-switch')
export class MdSwitch extends MdFormAssociatedElement {
  static override styles = [MdFormAssociatedElement.styles, switchStyles];

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  icons = false;

  @property({ type: String })
  value = 'on';

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
    if (changedProperties.has('selected') || changedProperties.has('value')) {
      this.updateFormValue();
    }
  }

  override formResetCallback() {
    this.selected = false;
    this.updateFormValue();
  }

  private updateFormValue() {
    this.setFormValue(this.selected ? this.value : null);
    if (this.required && !this.selected) {
      this.setValidity({ valueMissing: true }, 'Please toggle this switch');
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
    this.selected = !this.selected;
    this.updateFormValue();
    this.emitEvent('change', { selected: this.selected });
    this.emitEvent('input', { selected: this.selected });
  }

  override render() {
    return html`
      <div class="switch">
        <div class="thumb-container">
          <md-ripple ?disabled=${this.disabled} unbounded></md-ripple>
          <md-focus-ring></md-focus-ring>
          <div class="thumb">
            ${this.icons
              ? html`
                  <md-icon class="icon check" size="14">check</md-icon>
                  <md-icon class="icon cross" size="14">close</md-icon>
                `
              : html`<slot name="icon"></slot>`}
          </div>
        </div>
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-switch': MdSwitch;
  }
}
