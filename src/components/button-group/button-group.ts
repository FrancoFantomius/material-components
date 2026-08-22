import { html } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import type { ButtonVariant } from '../button/button.js';
import { buttonGroupStyles } from './button-group.css.js';

export type ButtonGroupOrientation = 'horizontal' | 'vertical';
export type ButtonGroupShape = 'pill' | 'rounded' | 'square';

@customElement('md-button-group')
export class MdButtonGroup extends MdBaseElement {
  static override styles = [MdBaseElement.styles, buttonGroupStyles];

  @property({ type: String, reflect: true })
  orientation: ButtonGroupOrientation = 'horizontal';

  @property({ type: Boolean, reflect: true })
  connected = false;

  @property({ type: String, reflect: true })
  shape: ButtonGroupShape = 'pill';

  @property({ type: String, reflect: true })
  variant: ButtonVariant | '' = '';

  @property({ type: Boolean, attribute: 'full-width', reflect: true })
  fullWidth = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ flatten: true })
  private slottedElements!: HTMLElement[];

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (
      changedProperties.has('connected') ||
      changedProperties.has('orientation') ||
      changedProperties.has('shape') ||
      changedProperties.has('variant') ||
      changedProperties.has('disabled')
    ) {
      this.syncChildren();
    }
  }

  private handleSlotChange = () => {
    this.syncChildren();
  };

  private getInteractiveChildren(): HTMLElement[] {
    if (!this.slottedElements) return [];
    return this.slottedElements.filter(
      (el): el is HTMLElement =>
        el.nodeType === Node.ELEMENT_NODE &&
        !el.hasAttribute('slot')
    );
  }

  private syncChildren() {
    const buttons = this.getInteractiveChildren();
    if (buttons.length === 0) return;

    // Sync disabled state
    if (this.disabled) {
      buttons.forEach((btn) => {
        if ('disabled' in btn) {
          (btn as any).disabled = true;
        } else {
          btn.setAttribute('disabled', '');
        }
      });
    }

    // Sync variant if specified
    if (this.variant) {
      buttons.forEach((btn) => {
        if ('variant' in btn) {
          (btn as any).variant = this.variant;
        }
      });
    }

    // Sync shape-shifting border radiuses for connected buttons
    if (this.connected) {
      let outer = 'var(--md-sys-shape-corner-full, 9999px)';
      let inner = 'var(--md-sys-shape-corner-extra-small, 4px)';

      if (this.shape === 'rounded') {
        outer = 'var(--md-sys-shape-corner-medium, 12px)';
        inner = 'var(--md-sys-shape-corner-extra-small, 4px)';
      } else if (this.shape === 'square') {
        outer = 'var(--md-sys-shape-corner-extra-small, 4px)';
        inner = '0px';
      }

      if (buttons.length === 1) {
        buttons[0].style.setProperty('--md-button-border-radius', outer);
        buttons[0].style.borderRadius = outer;
      } else {
        buttons.forEach((btn, index) => {
          let radius = '';
          if (this.orientation === 'vertical') {
            if (index === 0) {
              radius = `${outer} ${outer} ${inner} ${inner}`;
            } else if (index === buttons.length - 1) {
              radius = `${inner} ${inner} ${outer} ${outer}`;
            } else {
              radius = `${inner} ${inner} ${inner} ${inner}`;
            }
          } else {
            // Horizontal
            if (index === 0) {
              radius = `${outer} ${inner} ${inner} ${outer}`;
            } else if (index === buttons.length - 1) {
              radius = `${inner} ${outer} ${outer} ${inner}`;
            } else {
              radius = `${inner} ${inner} ${inner} ${inner}`;
            }
          }
          btn.style.setProperty('--md-button-border-radius', radius);
          btn.style.borderRadius = radius;
        });
      }
    } else {
      buttons.forEach((btn) => {
        btn.style.removeProperty('--md-button-border-radius');
        btn.style.borderRadius = '';
      });
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const buttons = this.getInteractiveChildren().filter((b) => !(b as any).disabled && !b.hasAttribute('disabled'));
    if (buttons.length === 0) return;

    const currentFocus = document.activeElement;
    const currentIndex = buttons.findIndex(
      (b) => b === currentFocus || (b.shadowRoot && b.shadowRoot.activeElement === currentFocus)
    );

    let nextIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = currentIndex >= 0 && currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = buttons.length - 1;
    }

    if (nextIndex !== -1 && buttons[nextIndex]) {
      buttons[nextIndex].focus();
    }
  };

  override render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-button-group': MdButtonGroup;
  }
}
