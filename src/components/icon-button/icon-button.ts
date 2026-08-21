import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { iconButtonStyles } from './icon-button.css.js';

export type IconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined';

@customElement('md-icon-button')
export class MdIconButton extends MdBaseElement {
  static override styles = [MdBaseElement.styles, iconButtonStyles];

  @property({ type: String, reflect: true })
  variant: IconButtonVariant = 'standard';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  toggle = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'selected-icon' })
  selectedIcon = '';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  private handleClick = (event: MouseEvent): void => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    if (this.toggle) {
      this.selected = !this.selected;
      this.emitEvent('change', { selected: this.selected });
    }
  };

  override render() {
    const iconName = (this.selected && this.selectedIcon) ? this.selectedIcon : this.icon;

    const content = html`
      <md-ripple ?disabled=${this.disabled} unbounded></md-ripple>
      <md-focus-ring></md-focus-ring>
      <span class="content">
        <slot>
          ${iconName ? html`<md-icon name=${iconName} ?filled=${this.selected}></md-icon>` : nothing}
        </slot>
      </span>
    `;

    if (this.href) {
      return html`
        <a
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-label=${this.ariaLabelText || nothing}
          aria-pressed=${this.toggle ? (this.selected ? 'true' : 'false') : nothing}
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
        aria-label=${this.ariaLabelText || nothing}
        aria-pressed=${this.toggle ? (this.selected ? 'true' : 'false') : nothing}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${content}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-icon-button': MdIconButton;
  }
}

