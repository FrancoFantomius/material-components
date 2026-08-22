import { describe, it, expect, beforeEach, vi } from 'vitest';
import '../src/index.js';
import { MdCarousel, MdCarouselItem } from '../src/components/carousel/carousel.js';

describe('md-carousel & md-carousel-item', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('should render default carousel with items', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    item1.headline = 'Slide 1';
    item1.subhead = 'Description 1';
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;
    item2.headline = 'Slide 2';
    item2.subhead = 'Description 2';

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    document.body.appendChild(carousel);

    await carousel.updateComplete;
    await item1.updateComplete;
    await item2.updateComplete;

    expect(carousel.layout).toBe('multi-browse');
    expect(carousel.activeIndex).toBe(0);
    expect(carousel.getAttribute('role')).toBe('region');
    expect(carousel.getAttribute('aria-roledescription')).toBe('carousel');

    const scroller = carousel.shadowRoot?.querySelector('.carousel-scroller');
    expect(scroller).not.toBeNull();
  });

  it('should support different layouts (multi-browse, hero, full-width, uncontained)', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    carousel.layout = 'hero';
    document.body.appendChild(carousel);
    await carousel.updateComplete;

    expect(carousel.getAttribute('layout')).toBe('hero');

    carousel.layout = 'full-width';
    await carousel.updateComplete;
    expect(carousel.getAttribute('layout')).toBe('full-width');

    carousel.layout = 'uncontained';
    await carousel.updateComplete;
    expect(carousel.getAttribute('layout')).toBe('uncontained');
  });

  it('should navigate with next() and previous()', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item3 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    carousel.appendChild(item3);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    const changeSpy = vi.fn();
    carousel.addEventListener('change', changeSpy);

    carousel.next();
    await carousel.updateComplete;

    expect(carousel.activeIndex).toBe(1);
    expect(changeSpy).toHaveBeenCalledTimes(1);
    expect(changeSpy.mock.calls[0][0].detail.activeIndex).toBe(1);

    carousel.next();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(2);

    // At end without loop, next() stays at last index
    carousel.next();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(2);

    carousel.previous();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);

    carousel.previous();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(0);

    // At start without loop, previous() stays at 0
    carousel.previous();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(0);
  });

  it('should wrap around when loop is enabled', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    carousel.loop = true;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    carousel.previous(); // from 0 wraps to 1
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);

    carousel.next(); // from 1 wraps to 0
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(0);
  });

  it('should navigate via scrollToIndex', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item3 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    carousel.appendChild(item3);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    carousel.scrollToIndex(2);
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(2);
  });

  it('should handle keyboard navigation (ArrowRight, ArrowLeft, Home, End)', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item3 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    carousel.appendChild(item3);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(2);

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);

    carousel.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(0);
  });

  it('should render control buttons and indicators', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    // Trigger slotchange manually or after tick
    const slot = carousel.shadowRoot?.querySelector('slot');
    slot?.dispatchEvent(new Event('slotchange'));
    await carousel.updateComplete;

    const prevBtn = carousel.shadowRoot?.querySelector('.control-button.prev') as HTMLButtonElement | null;
    const nextBtn = carousel.shadowRoot?.querySelector('.control-button.next') as HTMLButtonElement | null;
    expect(prevBtn).not.toBeNull();
    expect(nextBtn).not.toBeNull();

    const indicators = carousel.shadowRoot?.querySelectorAll('.indicator-dot');
    expect(indicators?.length).toBe(2);

    // Clicking next button
    nextBtn?.click();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);

    // Clicking indicator dot 0
    (indicators?.[0] as HTMLButtonElement)?.click();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(0);
  });

  it('should hide controls and indicators when properties are set', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    carousel.hideControls = true;
    carousel.hideIndicators = true;
    const item1 = document.createElement('md-carousel-item') as MdCarouselItem;
    const item2 = document.createElement('md-carousel-item') as MdCarouselItem;

    carousel.appendChild(item1);
    carousel.appendChild(item2);
    document.body.appendChild(carousel);

    await carousel.updateComplete;

    const slot = carousel.shadowRoot?.querySelector('slot');
    slot?.dispatchEvent(new Event('slotchange'));
    await carousel.updateComplete;

    const prevBtn = carousel.shadowRoot?.querySelector('.control-button.prev');
    const indicators = carousel.shadowRoot?.querySelector('.indicators');
    expect(prevBtn).toBeNull();
    expect(indicators).toBeNull();
  });

  it('should handle item click and href link mode in md-carousel-item', async () => {
    const item = document.createElement('md-carousel-item') as MdCarouselItem;
    item.headline = 'Clickable Slide';
    item.src = 'https://picsum.photos/400/300';
    item.interactive = true;
    document.body.appendChild(item);

    await item.updateComplete;

    const clickSpy = vi.fn();
    item.addEventListener('carousel-item-click', clickSpy);

    item.click();
    expect(clickSpy).toHaveBeenCalledTimes(1);

    // Link mode
    item.href = 'https://example.com';
    await item.updateComplete;

    const link = item.shadowRoot?.querySelector('a.item-container');
    expect(link).not.toBeNull();
    expect(link?.getAttribute('href')).toBe('https://example.com');
  });

  it('should accurately update button disabled states and indicators across multiple slides', async () => {
    const carousel = document.createElement('md-carousel') as MdCarousel;
    for (let i = 0; i < 4; i++) {
      const item = document.createElement('md-carousel-item') as MdCarouselItem;
      item.headline = `Slide ${i + 1}`;
      carousel.appendChild(item);
    }
    document.body.appendChild(carousel);

    await carousel.updateComplete;
    const slot = carousel.shadowRoot?.querySelector('slot');
    slot?.dispatchEvent(new Event('slotchange'));
    await carousel.updateComplete;

    const prevBtn = carousel.shadowRoot?.querySelector('.control-button.prev') as HTMLButtonElement;
    const nextBtn = carousel.shadowRoot?.querySelector('.control-button.next') as HTMLButtonElement;
    const indicators = carousel.shadowRoot?.querySelectorAll('.indicator-dot') as NodeListOf<HTMLButtonElement>;

    expect(indicators.length).toBe(4);
    // At start: prev is disabled, next is enabled
    expect(prevBtn.hasAttribute('disabled')).toBe(true);
    expect(nextBtn.hasAttribute('disabled')).toBe(false);
    expect(indicators[0].classList.contains('active')).toBe(true);

    // Click next -> slide 1
    nextBtn.click();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(1);
    expect(prevBtn.hasAttribute('disabled')).toBe(false);
    expect(nextBtn.hasAttribute('disabled')).toBe(false);
    expect(indicators[1].classList.contains('active')).toBe(true);

    // Click indicator 3 -> slide 3 (last slide)
    indicators[3].click();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(3);
    expect(prevBtn.hasAttribute('disabled')).toBe(false);
    expect(nextBtn.hasAttribute('disabled')).toBe(true);
    expect(indicators[3].classList.contains('active')).toBe(true);

    // Click prev -> slide 2
    prevBtn.click();
    await carousel.updateComplete;
    expect(carousel.activeIndex).toBe(2);
    expect(prevBtn.hasAttribute('disabled')).toBe(false);
    expect(nextBtn.hasAttribute('disabled')).toBe(false);
    expect(indicators[2].classList.contains('active')).toBe(true);
  });
});
