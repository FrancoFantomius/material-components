import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { loadingIndicatorStyles } from './loading-indicator.css.js';

export type LoadingIndicatorSize = 'small' | 'medium' | 'large';
export type LoadingIndicatorShape = 'morph' | 'square' | 'circle' | 'clover' | 'star';

/**
 * Material Design 3 Expressive Loading Indicator Component.
 * 
 * Contained or uncontained loading indicator with animated morphing shape for short wait times.
 *
 * @element md-loading-indicator
 */
@customElement('md-loading-indicator')
export class MdLoadingIndicator extends MdBaseElement {
  static override styles = [MdBaseElement.styles, loadingIndicatorStyles];

  /**
   * Visual size of the loading indicator.
   * @attr size
   */
  @property({ type: String, reflect: true })
  size: LoadingIndicatorSize = 'medium';

  /**
   * Whether the loading indicator is enclosed in a contained surface container.
   * @attr contained
   */
  @property({ type: Boolean, reflect: true })
  contained = false;

  /**
   * The shape animation style.
   * @attr shape
   */
  @property({ type: String, reflect: true })
  shape: LoadingIndicatorShape = 'morph';

  /**
   * Whether the animation is paused.
   * @attr paused
   */
  @property({ type: Boolean, reflect: true })
  paused = false;

  /**
   * Accessible label for the loading indicator.
   * @attr label
   */
  @property({ type: String })
  label = 'Loading';

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'status');
    }
    if (!this.hasAttribute('aria-live')) {
      this.setAttribute('aria-live', 'polite');
    }
    this.updateAriaLabel();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('label')) {
      this.updateAriaLabel();
    }
  }

  private updateAriaLabel() {
    if (this.label && !this.getAttribute('aria-label')) {
      this.setAttribute('aria-label', this.label);
    }
  }

  override render() {
    return html`
      <div class="container" part="container">
        <div class="shape" part="shape"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-loading-indicator': MdLoadingIndicator;
  }
}
