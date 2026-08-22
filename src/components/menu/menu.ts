import { html, nothing } from 'lit';
import { customElement, property, state, query, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { menuStyles } from './menu.css.js';
import { MdMenuItem } from './menu-item.js';

export type MenuPositioning = 'absolute' | 'fixed';
export type MenuPlacement =
  | 'bottom-start'
  | 'bottom-end'
  | 'bottom'
  | 'top-start'
  | 'top-end'
  | 'top'
  | 'left'
  | 'right';
export type MenuAlignment = 'start' | 'end' | 'center';

/**
 * Material Design 3 Menu component.
 * Menus display a list of choices on temporary surfaces when users interact with a trigger.
 *
 * @element md-menu
 *
 * @slot trigger - Slotted trigger element (e.g. button or icon-button).
 * @slot - Default slot for `md-menu-item` components or dividers.
 *
 * @fires open - Dispatched when the menu opens.
 * @fires close - Dispatched when the menu closes.
 * @fires select - Dispatched when an item inside the menu is selected.
 */
@customElement('md-menu')
export class MdMenu extends MdBaseElement {
  static override styles = [MdBaseElement.styles, menuStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ attribute: false })
  anchor: string | HTMLElement | null = null;

  @property({ type: String, reflect: true })
  positioning: MenuPositioning = 'absolute';

  @property({ type: String, reflect: true })
  placement: MenuPlacement = 'bottom-start';

  @property({ type: String, reflect: true })
  alignment: MenuAlignment = 'start';

  @property({ type: Number, attribute: 'x-offset' })
  xOffset = 0;

  @property({ type: Number, attribute: 'y-offset' })
  yOffset = 4;

  @property({ type: Boolean, reflect: true })
  quick = false;

  @property({ type: Boolean, attribute: 'stay-open-on-focusout' })
  stayOpenOnFocusout = false;

  @property({ type: Boolean, reflect: true })
  dense = false;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'Menu';

  @property({ type: Boolean, attribute: 'no-trigger' })
  noTrigger = false;

  @query('.menu-surface')
  private menuSurfaceElement!: HTMLElement;

  @queryAssignedElements({ slot: 'trigger' })
  private assignedTriggers!: HTMLElement[];

  @queryAssignedElements({ flatten: true })
  private defaultSlotElements!: HTMLElement[];

  private _anchorElement: HTMLElement | null = null;

  get anchorElement(): HTMLElement | null {
    if (this._anchorElement) {
      return this._anchorElement;
    }
    if (this.anchor instanceof HTMLElement) {
      return this.anchor;
    }
    if (typeof this.anchor === 'string' && this.anchor.length > 0) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const el = root.getElementById?.(this.anchor) || document.getElementById(this.anchor);
      if (el) return el;
    }
    if (this.assignedTriggers && this.assignedTriggers.length > 0) {
      return this.assignedTriggers[0] ?? null;
    }
    return null;
  }

  set anchorElement(el: HTMLElement | null) {
    this._anchorElement = el;
    this.requestUpdate();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleWindowKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    window.addEventListener('resize', this.handlePositionUpdate);
    window.addEventListener('scroll', this.handlePositionUpdate, true);
    this.addEventListener('item-click', this.handleItemSelection as EventListener);
    this.addEventListener('menu-item-click', this.handleItemSelection as EventListener);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleWindowKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    window.removeEventListener('resize', this.handlePositionUpdate);
    window.removeEventListener('scroll', this.handlePositionUpdate, true);
    this.removeEventListener('item-click', this.handleItemSelection as EventListener);
    this.removeEventListener('menu-item-click', this.handleItemSelection as EventListener);
  }

  override updated(changedProperties: Map<string, unknown>): void {
    super.updated(changedProperties);

    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
        this.updatePosition();
        // Give time for surface to render and receive focus
        setTimeout(() => {
          this.focusFirstItem();
        }, 16);
      } else {
        this.emitEvent('close');
      }
    }

    if (changedProperties.has('dense')) {
      this.updateDenseProp();
    }
  }

  private updateDenseProp(): void {
    const items = this.getItems(false);
    for (const item of items) {
      if (item instanceof MdMenuItem) {
        item.dense = this.dense;
      }
    }
  }

  private handlePositionUpdate = (): void => {
    if (this.open) {
      this.updatePosition();
    }
  };

  /**
   * Calculates and updates the positioning of the menu surface.
   */
  updatePosition(): void {
    if (!this.menuSurfaceElement) return;

    const anchorEl = this.anchorElement;
    if (!anchorEl) {
      // Default relative placement inside host
      this.applyRelativePlacement();
      return;
    }

    // If anchor is external to the component or positioning is fixed
    const isExternalAnchor = !this.contains(anchorEl);
    if (isExternalAnchor || this.positioning === 'fixed') {
      const rect = anchorEl.getBoundingClientRect();
      const surface = this.menuSurfaceElement;
      surface.classList.add('is-fixed');

      let top = 0;
      let left = 0;

      const placement = this.placement;
      const isTop = placement.startsWith('top');
      const isEnd = placement.endsWith('end') || this.alignment === 'end';

      if (isTop) {
        top = rect.top - this.yOffset - (surface.offsetHeight || 0);
      } else {
        top = rect.bottom + this.yOffset;
      }

      if (isEnd) {
        left = rect.right - (surface.offsetWidth || 0) + this.xOffset;
      } else {
        left = rect.left + this.xOffset;
      }

      // Viewport collision bounds
      const padding = 8;
      const maxLeft = window.innerWidth - (surface.offsetWidth || 112) - padding;
      left = Math.max(padding, Math.min(left, maxLeft));

      surface.style.top = `${top}px`;
      surface.style.left = `${left}px`;
      surface.style.right = 'auto';
      surface.style.bottom = 'auto';
    } else {
      this.applyRelativePlacement();
    }
  }

  private applyRelativePlacement(): void {
    if (!this.menuSurfaceElement) return;
    const surface = this.menuSurfaceElement;
    surface.classList.remove('is-fixed');

    const isTop = this.placement.startsWith('top');
    const isEnd = this.placement.endsWith('end') || this.alignment === 'end';

    if (isTop) {
      surface.style.top = 'auto';
      surface.style.bottom = `calc(100% + ${this.yOffset}px)`;
    } else {
      surface.style.top = `calc(100% + ${this.yOffset}px)`;
      surface.style.bottom = 'auto';
    }

    if (isEnd) {
      surface.style.left = 'auto';
      surface.style.right = `${-this.xOffset}px`;
    } else {
      surface.style.left = `${this.xOffset}px`;
      surface.style.right = 'auto';
    }
  }

  private handleDocumentClick = (event: MouseEvent | PointerEvent): void => {
    if (!this.open) return;
    const path = event.composedPath();

    // If clicked inside this menu or anchor, ignore
    if (path.includes(this)) return;
    if (this._anchorElement && path.includes(this._anchorElement)) return;
    if (typeof this.anchor === 'string' && this.anchorElement && path.includes(this.anchorElement)) return;

    this.close();
  };

  private handleWindowKeyDown = (event: KeyboardEvent): void => {
    if (!this.open) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      this.close();
      this.anchorElement?.focus();
    }
  };

  private handleSurfaceKeyDown = (event: KeyboardEvent): void => {
    const items = this.getItems(true);
    if (items.length === 0) return;

    let activeEl: Element | null = null;
    try {
      activeEl = document.activeElement;
    } catch {
      activeEl = null;
    }

    const currentIndex = items.findIndex(
      (item) => item === activeEl || item.contains(activeEl)
    );

    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault();
        const nextIndex = currentIndex >= 0 && currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        break;
      }
      case 'ArrowUp': {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        break;
      }
      case 'Home': {
        event.preventDefault();
        items[0]?.focus();
        break;
      }
      case 'End': {
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      }
      case 'Tab': {
        if (!this.stayOpenOnFocusout) {
          this.close();
        }
        break;
      }
    }
  };

  private handleItemSelection = (event: CustomEvent): void => {
    const detail = event.detail;
    this.emitEvent('select', detail);

    if (!detail?.keepOpen) {
      this.close();
    }
  };

  private handleTriggerClick = (event: MouseEvent): void => {
    event.stopPropagation();
    this.toggle();
  };

  /**
   * Opens the menu.
   */
  show(): void {
    if (!this.open) {
      this.open = true;
    }
  }

  /**
   * Closes the menu.
   */
  close(): void {
    if (this.open) {
      this.open = false;
    }
  }

  /**
   * Toggles the menu open/closed state.
   */
  toggle(): void {
    this.open = !this.open;
  }

  /**
   * Returns all menu items inside the menu.
   * @param onlyEnabled - If true, filters out disabled items.
   */
  getItems(onlyEnabled = false): MdMenuItem[] {
    const items = Array.from(this.querySelectorAll('md-menu-item')) as MdMenuItem[];
    if (onlyEnabled) {
      return items.filter((item) => !item.disabled && !item.hasAttribute('disabled'));
    }
    return items;
  }

  /**
   * Focuses the first non-disabled menu item.
   */
  focusFirstItem(): void {
    const items = this.getItems(true);
    if (items.length > 0) {
      items[0]!.focus();
    } else if (this.menuSurfaceElement) {
      this.menuSurfaceElement.focus();
    }
  }

  /**
   * Focuses the last non-disabled menu item.
   */
  focusLastItem(): void {
    const items = this.getItems(true);
    if (items.length > 0) {
      items[items.length - 1]!.focus();
    }
  }

  /**
   * Focuses the menu item at the specified index.
   */
  focusItemAtIndex(index: number): void {
    const items = this.getItems(true);
    if (index >= 0 && index < items.length) {
      items[index]!.focus();
    }
  }

  override render() {
    const triggerContent = !this.noTrigger
      ? html`
          <div class="trigger-wrapper" @click=${this.handleTriggerClick}>
            <slot name="trigger"></slot>
          </div>
        `
      : nothing;

    return html`
      <div class="backdrop" @click=${() => this.close()}></div>

      ${triggerContent}

      <div
        class="menu-surface"
        role="menu"
        tabindex="-1"
        aria-label=${this.ariaLabelText}
        aria-hidden=${this.open ? 'false' : 'true'}
        @keydown=${this.handleSurfaceKeyDown}
      >
        <slot @slotchange=${this.updateDenseProp}></slot>
      </div>
    `;
  }
}

export * from './menu-item.js';

declare global {
  interface HTMLElementTagNameMap {
    'md-menu': MdMenu;
  }
}
