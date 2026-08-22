import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { navigationRailStyles } from './navigation-rail.css.js';
import { MdNavigationRailItem } from './navigation-rail-item.js';

export * from './navigation-rail-item.js';

export type NavigationRailAlignment = 'top' | 'center' | 'bottom';

/**
 * Material Design 3 Navigation Rail component.
 *
 * Provides vertical side navigation for medium to large screen layouts.
 * Supports leading header/menu/fab slots, active indicator pill destinations,
 * badges, alignment, and optional label suppression.
 *
 * @slot - Default slot for `md-navigation-rail-item` destinations.
 * @slot header - Top header section for logo or title.
 * @slot menu - Top leading menu icon button.
 * @slot fab - Floating Action Button (FAB) below menu/header.
 * @slot footer - Bottom section for settings, avatar, or actions.
 */
@customElement('md-navigation-rail')
export class MdNavigationRail extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationRailStyles];

  @property({ type: String, reflect: true })
  alignment: NavigationRailAlignment = 'top';

  @property({ type: Boolean, reflect: true, attribute: 'hide-labels' })
  hideLabels = false;

  @property({ type: Number, reflect: true, attribute: 'active-index' })
  activeIndex = -1;

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'Navigation rail';

  @queryAssignedElements({ selector: 'md-navigation-rail-item, md-nav-rail-item', flatten: true })
  private assignedItems!: MdNavigationRailItem[];

  private get items(): MdNavigationRailItem[] {
    if (this.assignedItems && this.assignedItems.length > 0) {
      return this.assignedItems;
    }
    return Array.from(this.querySelectorAll('md-navigation-rail-item, md-nav-rail-item')) as MdNavigationRailItem[];
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'navigation');
    if (!this.hasAttribute('aria-label') && this.ariaLabelText) {
      this.setAttribute('aria-label', this.ariaLabelText);
    }
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('activeIndex')) {
      this.syncActiveItem();
    }
    if (changedProperties.has('hideLabels')) {
      this.syncHideLabels();
    }
  }

  private handleSlotChange = () => {
    this.syncHideLabels();
    if (this.activeIndex >= 0) {
      this.syncActiveItem();
    } else {
      // Find if any item is already active
      const activeIdx = this.items.findIndex((item) => item.active || item.selected);
      if (activeIdx !== -1) {
        this.activeIndex = activeIdx;
      }
    }
  };

  private syncHideLabels() {
    if (!this.items) return;
    this.items.forEach((item) => {
      if (this.hideLabels) {
        item.setAttribute('hide-label', '');
      } else {
        item.removeAttribute('hide-label');
      }
    });
  }

  private syncActiveItem() {
    if (!this.items || this.items.length === 0) return;

    this.items.forEach((item, index) => {
      const isActive = index === this.activeIndex;
      item.active = isActive;
      item.selected = isActive;
    });
  }

  private handleClick = (event: MouseEvent) => {
    const path = event.composedPath();
    const target = (path.find(
      (el) => el instanceof HTMLElement && (el.tagName.toLowerCase() === 'md-navigation-rail-item' || el.tagName.toLowerCase() === 'md-nav-rail-item')
    ) || (event.target as HTMLElement)?.closest?.('md-navigation-rail-item, md-nav-rail-item')) as MdNavigationRailItem | null;

    if (target && !target.disabled && this.items) {
      const index = this.items.indexOf(target);
      if (index !== -1) {
        this.activeIndex = index;
        this.syncActiveItem();
        this.emitEvent('change', {
          activeIndex: this.activeIndex,
          item: target,
          value: target.value,
        });
      }
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (!this.items || this.items.length === 0) return;
    const enabledItems = this.items.filter((item) => !item.disabled);
    if (enabledItems.length === 0) return;

    const currentActiveItem = this.items[this.activeIndex] || enabledItems[0];
    const currentIndex = enabledItems.indexOf(currentActiveItem!);

    let nextIndex = -1;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledItems.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex !== -1 && enabledItems[nextIndex]) {
      const targetItem = enabledItems[nextIndex]!;
      this.activeIndex = this.items.indexOf(targetItem);
      this.syncActiveItem();
      targetItem.focus();
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        item: targetItem,
        value: targetItem.value,
      });
    }
  };

  override render() {
    return html`
      <div class="rail">
        <div class="header">
          <slot name="menu"></slot>
          <slot name="header"></slot>
          <slot name="fab"></slot>
        </div>

        <div class="destinations">
          <slot @slotchange=${this.handleSlotChange}></slot>
        </div>

        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `;
  }
}

// Aliases
@customElement('md-nav-rail')
export class MdNavRail extends MdNavigationRail {}

declare global {
  interface HTMLElementTagNameMap {
    'md-navigation-rail': MdNavigationRail;
    'md-nav-rail': MdNavRail;
  }
}
