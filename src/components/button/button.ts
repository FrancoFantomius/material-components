import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { buttonStyles } from './button.css.js';

export type ButtonVariant = 'filled' | 'elevated' | 'tonal' | 'outlined' | 'text';

@customElement('md-button')
export class MdButton extends MdBaseElement {
  static override styles = [MdBaseElement.styles, buttonStyles];

  @property({ type: String, reflect: true })
  variant: ButtonVariant = 'filled';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'trailing-icon' })
  trailingIcon = '';

  @queryAssignedElements({ slot: 'icon' })
  private assignedIcons!: HTMLElement[];

  @queryAssignedElements({ slot: 'trailing-icon' })
  private assignedTrailingIcons!: HTMLElement[];

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.type === 'submit' || this.type === 'reset') {
      const form = this.closest('form');
      if (form) {
        if (this.type === 'submit') {
          form.requestSubmit();
        } else {
          form.reset();
        }
      }
    }
  };

  private handleSlotChange(): void {
    const hasLeading = Boolean(this.icon || (this.assignedIcons && this.assignedIcons.length > 0));
    const hasTrailing = Boolean(this.trailingIcon || (this.assignedTrailingIcons && this.assignedTrailingIcons.length > 0));

    this.toggleAttribute('has-icon', hasLeading);
    this.toggleAttribute('has-trailing-icon', hasTrailing);
  }

  override firstUpdated() {
    this.handleSlotChange();
  }

  override render() {
    const content = html`
      <md-ripple ?disabled=${this.disabled || this.loading}></md-ripple>
      <md-focus-ring></md-focus-ring>
      <span class="content">
        ${this.loading
          ? html`<span class="spinner" aria-hidden="true"></span>`
          : html`
              <slot name="icon" @slotchange=${this.handleSlotChange}>
                ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
              </slot>
            `}
        <slot @slotchange=${this.handleSlotChange}></slot>
        ${!this.loading
          ? html`
              <slot name="trailing-icon" @slotchange=${this.handleSlotChange}>
                ${this.trailingIcon ? html`<md-icon name=${this.trailingIcon}></md-icon>` : nothing}
              </slot>
            `
          : nothing}
      </span>
    `;

    if (this.href) {
      return html`
        <a
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        type=${this.type}
        ?disabled=${this.disabled || this.loading}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-button': MdButton;
  }
}

