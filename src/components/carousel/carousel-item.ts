import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import { carouselItemStyles } from './carousel.css.js';

export type CarouselSnapAlign = 'start' | 'center' | 'end';

/**
 * Material Design 3 Carousel Item component.
 *
 * @slot - Default slot for custom content or media.
 * @slot media - Specific slot for image or video elements.
 * @slot headline - Custom headline content.
 * @slot subhead - Custom subhead or description content.
 */
@customElement('md-carousel-item')
export class MdCarouselItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, carouselItemStyles];

  @property({ type: String })
  src = '';

  @property({ type: String })
  alt = '';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  subhead = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: Boolean, reflect: true })
  interactive = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true, attribute: 'snap-align' })
  snapAlign: CarouselSnapAlign = 'start';

  @property({ type: String, reflect: true })
  layout = '';

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'group');
    }
    if (!this.hasAttribute('aria-roledescription')) {
      this.setAttribute('aria-roledescription', 'slide');
    }
    this.addEventListener('click', this.handleClick);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.emitEvent('carousel-item-click', { item: this });
  };

  override render() {
    const hasMedia = Boolean(this.src);
    const hasScrim = Boolean(this.headline || this.subhead);
    const isClickable = Boolean(this.interactive || this.href);

    const innerContent = html`
      ${isClickable ? html`<md-ripple ?disabled=${this.disabled}></md-ripple><md-focus-ring></md-focus-ring>` : nothing}
      ${hasMedia ? html`
        <div class="media-container">
          <img src=${this.src} alt=${this.alt} loading="lazy" />
        </div>
      ` : html`
        <slot name="media"></slot>
      `}
      <div class="content-slot">
        <slot></slot>
      </div>
      ${hasScrim ? html`
        <div class="scrim">
          ${this.headline ? html`<div class="headline"><slot name="headline">${this.headline}</slot></div>` : nothing}
          ${this.subhead ? html`<div class="subhead"><slot name="subhead">${this.subhead}</slot></div>` : nothing}
        </div>
      ` : nothing}
    `;

    if (this.href) {
      return html`
        <a
          class="item-container"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
        >
          ${innerContent}
        </a>
      `;
    }

    return html`
      <div class="item-container">
        ${innerContent}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-carousel-item': MdCarouselItem;
  }
}
