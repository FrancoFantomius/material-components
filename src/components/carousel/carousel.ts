import { html, nothing, PropertyValues } from 'lit';
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { carouselStyles } from './carousel.css.js';
import { MdCarouselItem } from './carousel-item.js';

export * from './carousel-item.js';

export type CarouselLayout = 'multi-browse' | 'hero' | 'full-width' | 'uncontained';

/**
 * Material Design 3 Carousel Component.
 *
 * Supports multi-browse, hero, full-width, and uncontained layouts,
 * smooth scrolling, next/prev navigation buttons, swipe/drag gestures, and pagination indicators.
 *
 * @slot - Default slot for `md-carousel-item` elements.
 * @slot prev-button - Custom previous navigation button.
 * @slot next-button - Custom next navigation button.
 */
@customElement('md-carousel')
export class MdCarousel extends MdBaseElement {
  static override styles = [MdBaseElement.styles, carouselStyles];

  @property({ type: String, reflect: true })
  layout: CarouselLayout = 'multi-browse';

  @property({ type: Number, reflect: true, attribute: 'active-index' })
  activeIndex = 0;

  @property({ type: Boolean, reflect: true, attribute: 'hide-controls' })
  hideControls = false;

  @property({ type: Boolean, reflect: true, attribute: 'hide-indicators' })
  hideIndicators = false;

  @property({ type: Boolean, reflect: true })
  loop = false;

  @property({ type: Boolean, reflect: true })
  autoplay = false;

  @property({ type: Number, attribute: 'autoplay-interval' })
  autoplayInterval = 5000;

  @property({ type: String, attribute: 'item-spacing' })
  itemSpacing = '';

  @property({ type: String, attribute: 'item-width' })
  itemWidth = '';

  @property({ type: String, attribute: 'item-height' })
  itemHeight = '';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'Carousel';

  @queryAssignedElements({ selector: 'md-carousel-item', flatten: true })
  private assignedItems!: MdCarouselItem[];

  private get items(): MdCarouselItem[] {
    if (this.assignedItems && this.assignedItems.length > 0) {
      return this.assignedItems;
    }
    return Array.from(this.querySelectorAll('md-carousel-item')) as MdCarouselItem[];
  }

  @query('.carousel-scroller')
  private scrollerElement?: HTMLElement;

  @state()
  private isAtStart = true;

  @state()
  private isAtEnd = false;

  @state()
  private itemCount = 0;

  private autoplayTimer: ReturnType<typeof setInterval> | null = null;
  private isDragging = false;
  private dragStartX = 0;
  private dragStartScrollLeft = 0;
  private dragThresholdPassed = false;
  private isUserInteracting = false;
  private isProgrammaticScroll = false;
  private programmaticScrollTimer: ReturnType<typeof setTimeout> | null = null;
  private scrollDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'region');
    this.setAttribute('aria-roledescription', 'carousel');
    if (!this.hasAttribute('aria-label') && this.ariaLabelText) {
      this.setAttribute('aria-label', this.ariaLabelText);
    }
    this.addEventListener('keydown', this.handleKeyDown);
    this.addEventListener('mouseenter', this.handleMouseEnter);
    this.addEventListener('mouseleave', this.handleMouseLeave);
    this.addEventListener('focusin', this.handleFocusIn);
    this.addEventListener('focusout', this.handleFocusOut);

    if (this.autoplay) {
      this.startAutoplay();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoplay();
    this.removeEventListener('keydown', this.handleKeyDown);
    this.removeEventListener('mouseenter', this.handleMouseEnter);
    this.removeEventListener('mouseleave', this.handleMouseLeave);
    this.removeEventListener('focusin', this.handleFocusIn);
    this.removeEventListener('focusout', this.handleFocusOut);
    if (this.scrollDebounceTimer) {
      clearTimeout(this.scrollDebounceTimer);
    }
    if (this.programmaticScrollTimer) {
      clearTimeout(this.programmaticScrollTimer);
    }
  }

  override updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('itemSpacing')) {
      if (this.itemSpacing) {
        const spacingVal = isNaN(Number(this.itemSpacing)) ? this.itemSpacing : `${this.itemSpacing}px`;
        this.style.setProperty('--md-carousel-spacing', spacingVal);
      } else {
        this.style.removeProperty('--md-carousel-spacing');
      }
    }

    if (changedProperties.has('itemWidth')) {
      if (this.itemWidth) {
        const widthVal = isNaN(Number(this.itemWidth)) ? this.itemWidth : `${this.itemWidth}px`;
        this.style.setProperty('--md-carousel-item-width', widthVal);
      } else {
        this.style.removeProperty('--md-carousel-item-width');
      }
    }

    if (changedProperties.has('itemHeight')) {
      if (this.itemHeight) {
        const heightVal = isNaN(Number(this.itemHeight)) ? this.itemHeight : `${this.itemHeight}px`;
        this.style.setProperty('--md-carousel-height', heightVal);
        this.style.setProperty('--md-carousel-item-height', heightVal);
      } else {
        this.style.removeProperty('--md-carousel-height');
        this.style.removeProperty('--md-carousel-item-height');
      }
    }

    if (changedProperties.has('layout')) {
      this.syncItemsLayout();
    }

    if (changedProperties.has('autoplay') || changedProperties.has('autoplayInterval')) {
      if (this.autoplay) {
        this.startAutoplay();
      } else {
        this.stopAutoplay();
      }
    }

    if (changedProperties.has('activeIndex') && !this.isUserInteracting && !this.isProgrammaticScroll) {
      this.scrollToIndex(this.activeIndex, true);
    }

    this.updateControlsState();
  }

  private handleSlotChange = () => {
    this.itemCount = this.items?.length || 0;
    this.syncItemsLayout();
    this.updateControlsState();
  };

  private syncItemsLayout() {
    if (!this.items) return;
    this.items.forEach((item, index) => {
      item.layout = this.layout;
      item.setAttribute('aria-label', `Slide ${index + 1} of ${this.items.length}`);
    });
  }

  private startAutoplay() {
    this.stopAutoplay();
    if (this.autoplay && this.autoplayInterval > 0) {
      this.autoplayTimer = setInterval(() => {
        this.next();
      }, this.autoplayInterval);
    }
  }

  private stopAutoplay() {
    if (this.autoplayTimer) {
      clearInterval(this.autoplayTimer);
      this.autoplayTimer = null;
    }
  }

  private handleMouseEnter = () => {
    this.stopAutoplay();
  };

  private handleMouseLeave = () => {
    if (this.autoplay) {
      this.startAutoplay();
    }
  };

  private handleFocusIn = () => {
    this.stopAutoplay();
  };

  private handleFocusOut = () => {
    if (this.autoplay) {
      this.startAutoplay();
    }
  };

  /**
   * Scrolls to the previous slide in the carousel.
   */
  public previous(): void {
    const count = this.items?.length || 0;
    if (count === 0) return;

    if (this.activeIndex > 0) {
      this.scrollToIndex(this.activeIndex - 1, true);
    } else if (this.loop) {
      this.scrollToIndex(count - 1, true);
    }
  }

  /**
   * Scrolls to the next slide in the carousel.
   */
  public next(): void {
    const count = this.items?.length || 0;
    if (count === 0) return;

    if (this.activeIndex < count - 1) {
      this.scrollToIndex(this.activeIndex + 1, true);
    } else if (this.loop) {
      this.scrollToIndex(0, true);
    }
  }

  /**
   * Smoothly scrolls to a specific item index.
   */
  public scrollToIndex(index: number, smooth: boolean = true): void {
    if (!this.items || this.items.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, this.items.length - 1));
    const targetItem = this.items[clampedIndex];

    this.isProgrammaticScroll = true;
    if (this.programmaticScrollTimer) {
      clearTimeout(this.programmaticScrollTimer);
    }
    this.programmaticScrollTimer = setTimeout(() => {
      this.isProgrammaticScroll = false;
    }, smooth ? 500 : 50);

    if (targetItem && this.scrollerElement) {
      if (clampedIndex === 0) {
        this.scrollerElement.scrollTo({
          left: 0,
          behavior: smooth ? 'smooth' : 'auto',
        });
      } else {
        const scrollerRect = this.scrollerElement.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        const currentScroll = this.scrollerElement.scrollLeft;
        const targetScroll = currentScroll + (itemRect.left - scrollerRect.left);

        this.scrollerElement.scrollTo({
          left: Math.max(0, targetScroll),
          behavior: smooth ? 'smooth' : 'auto',
        });
      }
    }

    if (this.activeIndex !== clampedIndex) {
      this.activeIndex = clampedIndex;
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        item: this.items[this.activeIndex],
      });
    }

    this.updateControlsState();
  }

  private updateControlsState() {
    const count = this.items?.length || 0;
    if (count === 0) {
      this.isAtStart = true;
      this.isAtEnd = true;
      return;
    }

    if (this.loop) {
      this.isAtStart = false;
      this.isAtEnd = false;
      return;
    }

    this.isAtStart = this.activeIndex <= 0;
    this.isAtEnd = this.activeIndex >= count - 1;
  }

  private handleScroll = () => {
    if (this.isProgrammaticScroll || this.isDragging) return;

    if (this.scrollDebounceTimer) {
      clearTimeout(this.scrollDebounceTimer);
    }

    this.scrollDebounceTimer = setTimeout(() => {
      this.determineActiveIndexFromScroll();
    }, 80);
  };

  private determineActiveIndexFromScroll() {
    if (this.isProgrammaticScroll || this.isDragging) return;
    if (!this.scrollerElement || !this.items || this.items.length === 0) return;

    const scrollerRect = this.scrollerElement.getBoundingClientRect();
    const scrollerLeft = scrollerRect.left;

    let closestIndex = 0;
    let minDistance = Infinity;

    this.items.forEach((item, index) => {
      const itemRect = item.getBoundingClientRect();
      const distance = Math.abs(itemRect.left - scrollerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (this.activeIndex !== closestIndex) {
      this.isUserInteracting = true;
      this.activeIndex = closestIndex;
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        item: this.items[this.activeIndex],
      });
      this.isUserInteracting = false;
      this.updateControlsState();
    }
  }

  /* --- Pointer / Mouse Drag & Touch Swipe Support --- */

  private handlePointerDown = (event: PointerEvent) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    if (!this.scrollerElement) return;

    this.isProgrammaticScroll = false;
    this.isDragging = true;
    this.dragThresholdPassed = false;
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = this.scrollerElement.scrollLeft;
    this.scrollerElement.classList.add('is-dragging');
    this.stopAutoplay();

    try {
      (event.currentTarget as HTMLElement)?.setPointerCapture?.(event.pointerId);
    } catch (_) {
      // Ignore if pointer capture is not supported
    }
  };

  private handlePointerMove = (event: PointerEvent) => {
    if (!this.isDragging || !this.scrollerElement) return;

    const deltaX = event.clientX - this.dragStartX;
    if (Math.abs(deltaX) > 5) {
      this.dragThresholdPassed = true;
    }

    if (this.dragThresholdPassed) {
      this.scrollerElement.scrollLeft = this.dragStartScrollLeft - deltaX;
    }
  };

  private handlePointerUp = (event: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;

    try {
      (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);
    } catch (_) {
      // Ignore if pointer release is not supported
    }

    if (this.scrollerElement) {
      this.scrollerElement.classList.remove('is-dragging');
    }

    if (this.dragThresholdPassed && this.scrollerElement) {
      const deltaX = event.clientX - this.dragStartX;
      if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
          this.next();
        } else {
          this.previous();
        }
      } else {
        this.scrollToIndex(this.activeIndex, true);
      }
    }

    if (this.autoplay) {
      this.startAutoplay();
    }
  };

  private handlePointerCancel = (event: PointerEvent) => {
    if (!this.isDragging) return;
    this.isDragging = false;

    try {
      (event.currentTarget as HTMLElement)?.releasePointerCapture?.(event.pointerId);
    } catch (_) {
      // Ignore if pointer release is not supported
    }

    if (this.scrollerElement) {
      this.scrollerElement.classList.remove('is-dragging');
    }
    if (this.autoplay) {
      this.startAutoplay();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.next();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.previous();
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.scrollToIndex(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.scrollToIndex((this.items?.length || 1) - 1);
    }
  };

  override render() {
    const count = this.items?.length ?? this.itemCount;
    const showControls = !this.hideControls && (count > 1 || count === 0);
    const showIndicators = !this.hideIndicators && count > 1;

    return html`
      <div class="carousel-root">
        <div class="carousel-viewport-wrapper">
          ${showControls ? html`
            <slot name="prev-button">
              <button
                class="control-button prev"
                type="button"
                aria-label="Previous slide"
                ?disabled=${!this.loop && this.isAtStart}
                @click=${() => this.previous()}
              >
                <md-icon name="chevron_left"></md-icon>
              </button>
            </slot>
            <slot name="next-button">
              <button
                class="control-button next"
                type="button"
                aria-label="Next slide"
                ?disabled=${!this.loop && this.isAtEnd}
                @click=${() => this.next()}
              >
                <md-icon name="chevron_right"></md-icon>
              </button>
            </slot>
          ` : nothing}

          <div
            class="carousel-scroller"
            id="carousel-scroller"
            tabindex="0"
            aria-label=${this.ariaLabelText}
            @scroll=${this.handleScroll}
            @pointerdown=${this.handlePointerDown}
            @pointermove=${this.handlePointerMove}
            @pointerup=${this.handlePointerUp}
            @pointercancel=${this.handlePointerCancel}
          >
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>

        ${showIndicators ? html`
          <div class="indicators" role="tablist" aria-label="Carousel navigation">
            ${Array.from({ length: count }).map((_, index) => html`
              <button
                class="indicator-dot ${index === this.activeIndex ? 'active' : ''}"
                type="button"
                role="tab"
                aria-selected=${index === this.activeIndex ? 'true' : 'false'}
                aria-label="Go to slide ${index + 1}"
                @click=${() => this.scrollToIndex(index)}
              ></button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-carousel': MdCarousel;
  }
}
