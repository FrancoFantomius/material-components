import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MdBaseElement } from '../base-component.js';
import { rippleStyles } from './ripple.css.js';

@customElement('md-ripple')
export class MdRipple extends MdBaseElement {
  static override styles = [MdBaseElement.styles, rippleStyles];

  @property({ type: Boolean, reflect: true })
  unbounded = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private isFocused = false;

  private ripples: HTMLElement[] = [];
  private control: HTMLElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setupControl();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.cleanupControl();
  }

  private setupControl(): void {
    const parent = this.parentElement;
    const host = (this.getRootNode() as ShadowRoot)?.host as HTMLElement | null;
    this.control = parent || host;
    if (!this.control) return;

    this.control.addEventListener('pointerdown', this.handlePointerDown);
    this.control.addEventListener('focusin', this.handleFocusIn);
    this.control.addEventListener('focusout', this.handleFocusOut);
  }

  private cleanupControl(): void {
    if (!this.control) return;
    this.control.removeEventListener('pointerdown', this.handlePointerDown);
    this.control.removeEventListener('focusin', this.handleFocusIn);
    this.control.removeEventListener('focusout', this.handleFocusOut);
  }

  private handleFocusIn = (): void => {
    if (this.disabled) return;
    this.isFocused = true;
  };

  private handleFocusOut = (): void => {
    this.isFocused = false;
  };

  private handlePointerDown = (event: PointerEvent): void => {
    if (this.disabled || event.button !== 0) return;

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const radius = size / 2;

    const x = rect.width / 2;
    const y = rect.height / 2;

    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x - radius}px`;
    ripple.style.top = `${y - radius}px`;

    const container = this.shadowRoot?.querySelector('.surface-container');
    if (container) {
      container.appendChild(ripple);
      this.ripples.push(ripple);
    }

    const removeRipple = () => {
      ripple.classList.add('fading');
      setTimeout(() => {
        ripple.remove();
        this.ripples = this.ripples.filter((r) => r !== ripple);
      }, 250);
      window.removeEventListener('pointerup', removeRipple);
      window.removeEventListener('pointercancel', removeRipple);
    };

    window.addEventListener('pointerup', removeRipple);
    window.addEventListener('pointercancel', removeRipple);
  };

  override render() {
    return html`
      <div class="surface-container">
        <div class="surface ${this.isFocused ? 'focused' : ''}"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-ripple': MdRipple;
  }
}
