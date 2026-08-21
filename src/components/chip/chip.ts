import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { chipStyles, chipSetStyles } from './chip.css.js';

export type ChipVariant = 'assist' | 'filter' | 'input' | 'suggestion';

@customElement('md-chip')
export class MdChip extends MdBaseElement {
  static override styles = [MdBaseElement.styles, chipStyles];

  @property({ type: String, reflect: true })
  variant: ChipVariant = 'assist';

  @property({ type: String })
  label = '';

  @property({ type: String })
  icon = '';

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  removable = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  override connectedCallback() {
    super.connectedCallback();
    this.addEventListener('click', this.handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return;

    if (this.variant === 'filter') {
      this.selected = !this.selected;
      this.emitEvent('change', { selected: this.selected });
    }
  };

  private handleRemove = (event: MouseEvent) => {
    event.stopPropagation();
    this.emitEvent('remove');
  };

  override render() {
    return html`
      <div class="chip" tabindex=${this.disabled ? '-1' : '0'}>
        <md-ripple ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring></md-focus-ring>

        <span class="icon">
          ${this.variant === 'filter' && this.selected
            ? html`<md-icon name="check" size="18"></md-icon>`
            : html`
                <slot name="icon">
                  ${this.icon ? html`<md-icon name=${this.icon} size="18"></md-icon>` : nothing}
                </slot>
              `}
        </span>

        <slot>${this.label}</slot>

        ${this.removable || this.variant === 'input'
          ? html`
              <button
                class="remove-btn"
                aria-label="Remove"
                @click=${this.handleRemove}
                tabindex="-1"
              >
                <md-icon name="close" size="16"></md-icon>
              </button>
            `
          : nothing}
      </div>
    `;
  }
}

@customElement('md-chip-set')
export class MdChipSet extends MdBaseElement {
  static override styles = [MdBaseElement.styles, chipSetStyles];

  override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-chip': MdChip;
    'md-chip-set': MdChipSet;
  }
}

