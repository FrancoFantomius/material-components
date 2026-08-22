import { html, PropertyValues } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { navigationBarStyles } from './navigation-bar.css.js';
import { MdNavigationBarItem, NavigationBarLabelMode } from './navigation-bar-item.js';

export * from './navigation-bar-item.js';

/**
 * Material Design 3 Navigation Bar component.
 *
 * Navigation bars let users switch between 3 to 5 top-level destinations.
 * Supports active indicator pill, badge notifications, alwaysShow/selectedShow/hidden label modes,
 * keyboard navigation, and custom change events.
 *
 * @slot - Default slot for `md-navigation-bar-item` destinations.
 *
 * @fires change - Dispatched when the active navigation item changes. Detail: `{ activeIndex, selectedIndex, index, value, item }`
 */
@customElement('md-navigation-bar')
export class MdNavigationBar extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationBarStyles];

  @property({ type: Number, reflect: true, attribute: 'active-index' })
  activeIndex = 0;

  @property({ type: Number, attribute: 'selected-index' })
  get selectedIndex(): number {
    return this.activeIndex;
  }
  set selectedIndex(val: number) {
    this.activeIndex = val;
  }

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String, reflect: true, attribute: 'label-mode' })
  labelMode: NavigationBarLabelMode = 'alwaysShow';

  @property({ type: Boolean, reflect: true, attribute: 'hide-inactive-labels' })
  hideInactiveLabels = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ selector: 'md-navigation-bar-item, md-nav-bar-item', flatten: true })
  private assignedItems!: MdNavigationBarItem[];

  private get items(): MdNavigationBarItem[] {
    if (this.assignedItems && this.assignedItems.length > 0) {
      return this.assignedItems;
    }
    return Array.from(this.querySelectorAll('md-navigation-bar-item, md-nav-bar-item')) as MdNavigationBarItem[];
  }

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'tablist');
    }
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Navigation');
    }
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties);

    if (changedProperties.has('activeIndex') || changedProperties.has('value')) {
      if (changedProperties.has('activeIndex') && !changedProperties.has('value')) {
        const current = this.items[this.activeIndex];
        if (current) {
          this.value = current.value || current.label;
        }
      } else if (changedProperties.has('value') && !changedProperties.has('activeIndex')) {
        const matchingIndex = this.items.findIndex(
          (item) => item.value === this.value || item.label === this.value
        );
        if (matchingIndex !== -1) {
          this.activeIndex = matchingIndex;
        }
      }
      this.syncActiveItem();
    }

    if (changedProperties.has('labelMode') || changedProperties.has('hideInactiveLabels')) {
      this.syncLabelMode();
    }

    if (changedProperties.has('disabled') && this.disabled) {
      this.syncDisabled();
    }
  }

  private handleSlotChange = () => {
    this.syncActiveItem();
    this.syncLabelMode();
    if (this.disabled) {
      this.syncDisabled();
    }
  };

  private syncDisabled() {
    if (!this.items) return;
    if (this.disabled) {
      this.items.forEach((item) => {
        item.disabled = true;
      });
    }
  }

  private syncLabelMode() {
    if (!this.items) return;
    this.items.forEach((item) => {
      if (this.labelMode) {
        item.labelMode = this.labelMode;
      }
      if (this.hideInactiveLabels) {
        item.hideInactiveLabels = this.hideInactiveLabels;
      }
    });
  }

  private syncActiveItem() {
    if (!this.items || this.items.length === 0) return;

    if (this.activeIndex < 0) this.activeIndex = 0;
    if (this.activeIndex >= this.items.length) this.activeIndex = this.items.length - 1;

    this.items.forEach((item, index) => {
      const isActive = index === this.activeIndex;
      item.active = isActive;
      item.selected = isActive;
      item.tabIndex = isActive ? 0 : -1;
    });

    const currentItem = this.items[this.activeIndex];
    if (currentItem && !this.value) {
      this.value = currentItem.value || currentItem.label;
    }
  }

  /**
   * Selects a navigation item by index.
   */
  public select(index: number) {
    if (!this.items || index < 0 || index >= this.items.length) return;
    const target = this.items[index];
    if (target && !target.disabled) {
      this.activeIndex = index;
      this.value = target.value || target.label;
      this.syncActiveItem();
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        selectedIndex: this.activeIndex,
        index: this.activeIndex,
        value: this.value,
        item: target,
      });
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return;

    const target = (event.target as HTMLElement).closest(
      'md-navigation-bar-item, md-nav-bar-item'
    ) as MdNavigationBarItem | null;

    if (!target || target.disabled || !this.items.includes(target)) return;

    const index = this.items.indexOf(target);
    if (index !== -1) {
      this.activeIndex = index;
      this.value = target.value || target.label;
      this.syncActiveItem();
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        selectedIndex: this.activeIndex,
        index: this.activeIndex,
        value: this.value,
        item: target,
      });
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    const enabledItems = this.items.filter((i) => !i.disabled);
    if (enabledItems.length === 0) return;

    const activeItem = this.items[this.activeIndex];
    const currentIndex = enabledItems.indexOf(activeItem!);

    let nextIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = currentIndex < enabledItems.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
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
      this.value = targetItem.value || targetItem.label;
      this.syncActiveItem();
      targetItem.focus();
      this.emitEvent('change', {
        activeIndex: this.activeIndex,
        selectedIndex: this.activeIndex,
        index: this.activeIndex,
        value: this.value,
        item: targetItem,
      });
    }
  };

  override render() {
    return html`
      <div class="nav-bar-container">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `;
  }
}

// Aliases
@customElement('md-nav-bar')
export class MdNavBar extends MdNavigationBar {}

declare global {
  interface HTMLElementTagNameMap {
    'md-navigation-bar': MdNavigationBar;
    'md-nav-bar': MdNavBar;
  }
}
