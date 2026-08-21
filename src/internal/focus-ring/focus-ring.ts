import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../base-component.js';
import { focusRingStyles } from './focus-ring.css.js';

@customElement('md-focus-ring')
export class MdFocusRing extends MdBaseElement {
  static override styles = [MdBaseElement.styles, focusRingStyles];

  @property({ type: Boolean, reflect: true })
  visible = false;

  @property({ type: Boolean, reflect: true })
  inward = false;

  private control: HTMLElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.control = (this.parentElement || (this.getRootNode() as ShadowRoot)?.host) as HTMLElement | null;
    if (this.control) {
      this.control.addEventListener('focusin', this.handleFocusIn);
      this.control.addEventListener('focusout', this.handleFocusOut);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.control) {
      this.control.removeEventListener('focusin', this.handleFocusIn);
      this.control.removeEventListener('focusout', this.handleFocusOut);
    }
  }

  private handleFocusIn = (): void => {
    if (this.control?.matches(':focus-visible') || this.control?.querySelector(':focus-visible')) {
      this.visible = true;
    }
  };

  private handleFocusOut = (): void => {
    this.visible = false;
  };

  override render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-focus-ring': MdFocusRing;
  }
}

