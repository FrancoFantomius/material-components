import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import '../icon-button/icon-button.js';
import { appDrawerStyles, appDrawerItemStyles } from './app-drawer.css.js';

export type AppDrawerAlignment = 'start' | 'end';
export type AppDrawerPivot = 'left' | 'right';

/**
 * Material Design 3 App Drawer Item component.
 * Represents a single application, shortcut, or destination in the app drawer grid.
 *
 * @slot icon - Custom icon or graphic.
 * @slot - Default slot for app label.
 * @slot badge - Custom badge indicator.
 */
@customElement('md-app-drawer-item')
export class MdAppDrawerItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, appDrawerItemStyles];

  @property({ type: String })
  icon = '';

  @property({ type: String })
  src = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  badge = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  dragging = false;

  @property({ type: Boolean, reflect: true, attribute: 'drag-over' })
  dragOver = false;

  private wasDragging = false;

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('selected') && !changedProperties.has('active')) {
      this.active = this.selected;
    } else if (changedProperties.has('active') && !changedProperties.has('selected')) {
      this.selected = this.active;
    }
  }

  internalSetDragging(isDragging: boolean) {
    this.dragging = isDragging;
    if (isDragging) {
      this.wasDragging = true;
    } else {
      setTimeout(() => {
        this.wasDragging = false;
      }, 100);
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled || this.wasDragging || this.dragging) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const appLabel = this.label || this.headline;
    this.emitEvent('item-click', {
      label: appLabel,
      icon: this.icon,
      src: this.src,
      href: this.href,
      active: this.active,
    });
  };

  override render() {
    const text = this.label || this.headline;

    const iconContent = this.src
      ? html`<img class="icon-image" src=${this.src} alt=${text || 'App icon'} draggable="false" />`
      : this.icon
        ? html`<md-icon name=${this.icon}></md-icon>`
        : nothing;

    const inner = html`
      <md-ripple ?disabled=${this.disabled}></md-ripple>
      <md-focus-ring></md-focus-ring>

      <div class="icon-wrapper">
        <slot name="icon">${iconContent}</slot>
        ${this.badge
          ? html`<div class="badge-container"><slot name="badge"><span class="badge">${this.badge}</span></slot></div>`
          : html`<div class="badge-container"><slot name="badge"></slot></div>`}
      </div>

      <span class="label">
        <slot>${text}</slot>
      </span>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          draggable="false"
          @click=${this.handleClick}
        >
          ${inner}
        </a>
      `;
    }

    return html`
      <button
        class="item"
        type="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        ?disabled=${this.disabled}
        draggable="false"
        @click=${this.handleClick}
      >
        ${inner}
      </button>
    `;
  }
}

/**
 * Material Design 3 App Drawer (Apps Launcher / Waffle Menu) component.
 * Displays a popup grid of applications and services next to account or navigation controls.
 *
 * @slot trigger - Custom trigger button element.
 * @slot header - Optional header content above the apps grid.
 * @slot - Default slot for app drawer items (md-app-drawer-item).
 * @slot footer - Optional footer content (e.g. "More apps" link/button).
 */
@customElement('md-app-drawer')
export class MdAppDrawer extends MdBaseElement {
  static override styles = [MdBaseElement.styles, appDrawerStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  headline = '';

  @property({ type: String })
  icon = 'apps';

  @property({ type: String, attribute: 'aria-label' })
  ariaLabelText = 'App launcher';

  @property({ type: Boolean, attribute: 'no-trigger' })
  noTrigger = false;

  get trigger(): boolean {
    return !this.noTrigger;
  }

  set trigger(value: boolean) {
    this.noTrigger = !value;
    this.requestUpdate('noTrigger');
  }

  @property({ type: String, reflect: true })
  alignment: AppDrawerAlignment = 'end';

  @property({ type: String, reflect: true })
  pivot: AppDrawerPivot = 'right';

  @property({ type: Boolean, reflect: true })
  modal = false;

  @property({ type: Number })
  columns = 3;

  @property({ type: Boolean, reflect: true })
  reorderable = true;

  @property({ type: Boolean, reflect: true })
  editable = true;

  @property({ type: Boolean, reflect: true })
  editing = false;

  @property({ type: String, attribute: 'storage-key' })
  storageKey = '';

  @property({ type: Boolean, attribute: 'disable-storage' })
  disableStorage = false;

  private isReordering = false;
  private initialOrder: string[] = [];
  private draggedItem: HTMLElement | null = null;
  private dropTargetItem: HTMLElement | null = null;

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    this.addEventListener('dragstart', this.handleDragStart);
    this.addEventListener('dragover', this.handleDragOver);
    this.addEventListener('dragleave', this.handleDragLeave);
    this.addEventListener('drop', this.handleDrop);
    this.addEventListener('dragend', this.handleDragEnd);
    this.addEventListener('keydown', this.handleItemKeyDown);

    // Initial check on next animation frame
    requestAnimationFrame(() => {
      if (this.initialOrder.length === 0) {
        this.initialOrder = this.getOrder();
      }
      this.applySavedOrder();
      this.updateDraggableItems();
    });
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    this.removeEventListener('dragstart', this.handleDragStart);
    this.removeEventListener('dragover', this.handleDragOver);
    this.removeEventListener('dragleave', this.handleDragLeave);
    this.removeEventListener('drop', this.handleDrop);
    this.removeEventListener('dragend', this.handleDragEnd);
    this.removeEventListener('keydown', this.handleItemKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.emitEvent('open');
      } else {
        this.emitEvent('close');
      }
    }
    if (changedProperties.has('columns')) {
      if (this.columns && this.columns !== 3) {
        this.style.setProperty('--md-app-drawer-columns', String(this.columns));
      } else {
        this.style.removeProperty('--md-app-drawer-columns');
      }
    }
    if (changedProperties.has('reorderable') || changedProperties.has('editable')) {
      this.updateDraggableItems();
    }
    if (changedProperties.has('editing')) {
      this.updateDraggableItems();
      this.emitEvent('edit-toggle', { editing: this.editing });
    }
    if (changedProperties.has('storageKey') || changedProperties.has('disableStorage')) {
      this.applySavedOrder();
    }
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.close();
    }
  };

  private handleDocumentClick = (event: MouseEvent | PointerEvent) => {
    if (!this.open) return;
    const path = event.composedPath();
    if (!path.includes(this)) {
      this.close();
    }
  };

  private handleBackdropClick = () => {
    this.close();
  };

  private handleTriggerClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.toggle();
  };

  /**
   * Identifies an app item uniquely for storage and ordering.
   */
  getItemKey(item: Element): string {
    const keyAttr =
      item.getAttribute('key') ||
      item.getAttribute('app-id') ||
      item.getAttribute('data-id');
    if (keyAttr) return keyAttr;
    if (item.id) return item.id;

    const label =
      (item as unknown as { label?: string }).label ||
      item.getAttribute('label') ||
      (item as unknown as { headline?: string }).headline ||
      item.getAttribute('headline');
    if (label) return label;

    const href =
      (item as unknown as { href?: string }).href ||
      item.getAttribute('href');
    if (href) return href;

    const icon =
      (item as unknown as { icon?: string }).icon ||
      item.getAttribute('icon');
    if (icon) return icon;

    return item.textContent?.trim() || '';
  }

  /**
   * Returns the storage key used in localStorage.
   */
  getEffectiveStorageKey(): string {
    if (this.storageKey) {
      return this.storageKey;
    }
    if (this.id) {
      return `md-app-drawer-order-${this.id}`;
    }
    return 'md-app-drawer-order';
  }

  /**
   * Returns all slotted app item elements.
   */
  getItems(): HTMLElement[] {
    const slot = this.shadowRoot?.querySelector<HTMLSlotElement>('.grid slot:not([name])');
    if (slot) {
      const assigned = slot
        .assignedElements()
        .filter(
          (el): el is HTMLElement =>
            el instanceof HTMLElement &&
            (!el.hasAttribute('slot') || el.getAttribute('slot') === '')
        );
      if (assigned.length > 0) return assigned;
    }
    return Array.from(this.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement &&
        (!el.hasAttribute('slot') || el.getAttribute('slot') === '')
    );
  }

  /**
   * Retrieves the saved order array from persistent storage.
   */
  loadOrder(): string[] | null {
    if (this.disableStorage) return null;
    try {
      const key = this.getEffectiveStorageKey();
      const stored = localStorage.getItem(key);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  /**
   * Persists the item order to storage.
   */
  saveOrder(order?: string[]): string[] {
    const currentOrder = order || this.getOrder();
    if (!this.disableStorage) {
      try {
        const key = this.getEffectiveStorageKey();
        localStorage.setItem(key, JSON.stringify(currentOrder));
      } catch {
        // Ignore localStorage quota / access errors
      }
    }
    return currentOrder;
  }

  /**
   * Returns the current array of item keys in DOM order.
   */
  getOrder(): string[] {
    return this.getItems().map((item) => this.getItemKey(item));
  }

  override firstUpdated(changedProperties: Map<string, unknown>) {
    super.firstUpdated(changedProperties);
    if (this.initialOrder.length === 0) {
      this.initialOrder = this.getOrder();
    }
    this.applySavedOrder();
    this.updateDraggableItems();
  }

  /**
   * Sets and applies the order of items in the app drawer.
   */
  setOrder(order: string[]) {
    if (!order || !order.length) return;
    if (this.initialOrder.length === 0) {
      this.initialOrder = this.getOrder();
    }
    const items = this.getItems();
    if (items.length <= 1) return;

    const itemMap = new Map<string, HTMLElement>();
    const unmatched: HTMLElement[] = [];

    for (const item of items) {
      const key = this.getItemKey(item);
      if (key && !itemMap.has(key)) {
        itemMap.set(key, item);
      } else {
        unmatched.push(item);
      }
    }

    const newItemsOrder: HTMLElement[] = [];
    for (const key of order) {
      const item = itemMap.get(key);
      if (item) {
        newItemsOrder.push(item);
        itemMap.delete(key);
      }
    }

    // Append any items that were not part of the saved order
    itemMap.forEach((item) => newItemsOrder.push(item));
    newItemsOrder.push(...unmatched);

    let changed = false;
    for (let i = 0; i < items.length; i++) {
      if (items[i] !== newItemsOrder[i]) {
        changed = true;
        break;
      }
    }

    if (changed) {
      this.isReordering = true;
      for (const item of newItemsOrder) {
        this.appendChild(item);
      }
      this.isReordering = false;
    }
  }

  /**
   * Applies the saved order from localStorage if available.
   */
  applySavedOrder() {
    const savedOrder = this.loadOrder();
    if (savedOrder && savedOrder.length > 0) {
      this.setOrder(savedOrder);
    }
  }

  /**
   * Resets the persistent order and restores the initial layout.
   */
  resetOrder() {
    if (!this.disableStorage) {
      try {
        localStorage.removeItem(this.getEffectiveStorageKey());
      } catch {
        // Ignore storage errors
      }
    }
    if (this.initialOrder.length > 0) {
      this.setOrder(this.initialOrder);
    }
    const currentOrder = this.getOrder();
    this.emitEvent('reorder', {
      order: currentOrder,
      item: null,
      oldIndex: -1,
      newIndex: -1,
    });
    this.emitEvent('reset', { order: currentOrder });
  }

  /**
   * Moves an item from one index position to another.
   */
  reorderItem(fromIndex: number, toIndex: number) {
    if (this.initialOrder.length === 0) {
      this.initialOrder = this.getOrder();
    }
    const items = this.getItems();
    if (
      fromIndex < 0 ||
      fromIndex >= items.length ||
      toIndex < 0 ||
      toIndex >= items.length ||
      fromIndex === toIndex
    ) {
      return;
    }

    const itemToMove = items[fromIndex];
    const targetItem = items[toIndex];

    this.isReordering = true;
    if (fromIndex < toIndex) {
      targetItem.after(itemToMove);
    } else {
      targetItem.before(itemToMove);
    }
    this.isReordering = false;

    const newOrder = this.getOrder();
    this.saveOrder(newOrder);

    this.emitEvent('reorder', {
      order: newOrder,
      item: itemToMove,
      oldIndex: fromIndex,
      newIndex: toIndex,
    });
  }

  /**
   * Returns whether reordering is currently active.
   */
  isReorderActive(): boolean {
    return this.reorderable && (!this.editable || this.editing);
  }

  /**
   * Toggles the reordering editing mode.
   */
  toggleEdit() {
    this.editing = !this.editing;
  }

  /**
   * Enables the reordering editing mode.
   */
  startEditing() {
    this.editing = true;
  }

  /**
   * Disables the reordering editing mode.
   */
  stopEditing() {
    this.editing = false;
  }

  private handleEditToggle = (event: MouseEvent) => {
    event.stopPropagation();
    this.toggleEdit();
  };

  private handleResetClick = (event: MouseEvent) => {
    event.stopPropagation();
    this.resetOrder();
  };

  private updateDraggableItems() {
    const isEnabled = this.isReorderActive();
    const items = this.getItems();
    for (const item of items) {
      const isDisabled = (item as unknown as { disabled?: boolean }).disabled || item.hasAttribute('disabled');
      if (isEnabled && !isDisabled) {
        item.setAttribute('draggable', 'true');
      } else {
        item.removeAttribute('draggable');
      }
    }
  }

  private handleSlotChange = () => {
    if (this.isReordering) return;
    if (this.initialOrder.length === 0) {
      this.initialOrder = this.getOrder();
    }
    this.applySavedOrder();
    this.updateDraggableItems();
  };

  private findDrawerItem(event: Event): HTMLElement | null {
    const path = event.composedPath();
    const items = this.getItems();
    for (const el of path) {
      if (el instanceof HTMLElement && items.includes(el)) {
        return el;
      }
    }
    return null;
  }

  private handleDragStart = (event: DragEvent) => {
    if (!this.isReorderActive()) return;
    const item = this.findDrawerItem(event);
    if (!item) return;
    const isDisabled = (item as unknown as { disabled?: boolean }).disabled || item.hasAttribute('disabled');
    if (isDisabled) return;

    this.draggedItem = item;
    item.classList.add('is-dragging');
    item.setAttribute('dragging', '');
    if (typeof (item as unknown as { internalSetDragging?: (v: boolean) => void }).internalSetDragging === 'function') {
      (item as unknown as { internalSetDragging: (v: boolean) => void }).internalSetDragging(true);
    }

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', this.getItemKey(item));
    }
  };

  private handleDragOver = (event: DragEvent) => {
    if (!this.isReorderActive() || !this.draggedItem) return;
    const targetItem = this.findDrawerItem(event);
    if (!targetItem || targetItem === this.draggedItem) {
      if (this.dropTargetItem && this.dropTargetItem !== this.draggedItem) {
        this.dropTargetItem.classList.remove('drag-over', 'drop-target');
        this.dropTargetItem.removeAttribute('drag-over');
        if ('dragOver' in this.dropTargetItem) {
          (this.dropTargetItem as unknown as { dragOver: boolean }).dragOver = false;
        }
        this.dropTargetItem = null;
      }
      return;
    }

    event.preventDefault();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
    }

    if (this.dropTargetItem !== targetItem) {
      if (this.dropTargetItem) {
        this.dropTargetItem.classList.remove('drag-over', 'drop-target');
        this.dropTargetItem.removeAttribute('drag-over');
        if ('dragOver' in this.dropTargetItem) {
          (this.dropTargetItem as unknown as { dragOver: boolean }).dragOver = false;
        }
      }
      this.dropTargetItem = targetItem;
      targetItem.classList.add('drag-over', 'drop-target');
      targetItem.setAttribute('drag-over', '');
      if ('dragOver' in targetItem) {
        (targetItem as unknown as { dragOver: boolean }).dragOver = true;
      }
    }
  };

  private handleDragLeave = (event: DragEvent) => {
    const relatedTarget = event.relatedTarget as Node | null;
    if (
      this.dropTargetItem &&
      (!relatedTarget || !this.dropTargetItem.contains(relatedTarget))
    ) {
      this.dropTargetItem.classList.remove('drag-over', 'drop-target');
      this.dropTargetItem.removeAttribute('drag-over');
      if ('dragOver' in this.dropTargetItem) {
        (this.dropTargetItem as unknown as { dragOver: boolean }).dragOver = false;
      }
      this.dropTargetItem = null;
    }
  };

  private handleDrop = (event: DragEvent) => {
    if (!this.isReorderActive() || !this.draggedItem) return;
    event.preventDefault();

    const targetItem = this.findDrawerItem(event);
    if (targetItem && targetItem !== this.draggedItem) {
      const items = this.getItems();
      const oldIndex = items.indexOf(this.draggedItem);
      const newIndex = items.indexOf(targetItem);

      if (oldIndex !== -1 && newIndex !== -1) {
        this.reorderItem(oldIndex, newIndex);
      }
    }

    this.cleanupDrag();
  };

  private handleDragEnd = () => {
    this.cleanupDrag();
  };

  private cleanupDrag() {
    if (this.draggedItem) {
      this.draggedItem.classList.remove('is-dragging');
      this.draggedItem.removeAttribute('dragging');
      if (typeof (this.draggedItem as unknown as { internalSetDragging?: (v: boolean) => void }).internalSetDragging === 'function') {
        (this.draggedItem as unknown as { internalSetDragging: (v: boolean) => void }).internalSetDragging(false);
      }
      this.draggedItem = null;
    }
    if (this.dropTargetItem) {
      this.dropTargetItem.classList.remove('drag-over', 'drop-target');
      this.dropTargetItem.removeAttribute('drag-over');
      if ('dragOver' in this.dropTargetItem) {
        (this.dropTargetItem as unknown as { dragOver: boolean }).dragOver = false;
      }
      this.dropTargetItem = null;
    }
    const items = this.getItems();
    for (const item of items) {
      item.classList.remove('is-dragging', 'drag-over', 'drop-target');
      item.removeAttribute('dragging');
      item.removeAttribute('drag-over');
      if (typeof (item as unknown as { internalSetDragging?: (v: boolean) => void }).internalSetDragging === 'function') {
        (item as unknown as { internalSetDragging: (v: boolean) => void }).internalSetDragging(false);
      }
      if ('dragOver' in item) {
        (item as unknown as { dragOver: boolean }).dragOver = false;
      }
    }
  }

  private handleItemKeyDown = (event: KeyboardEvent) => {
    if (!this.isReorderActive() || !event.altKey) return;
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      const item = this.findDrawerItem(event);
      if (!item) return;

      const items = this.getItems();
      const currentIndex = items.indexOf(item);
      if (currentIndex === -1) return;

      let targetIndex = currentIndex;
      const cols = this.columns || 3;

      if (event.key === 'ArrowLeft') {
        targetIndex = currentIndex - 1;
      } else if (event.key === 'ArrowRight') {
        targetIndex = currentIndex + 1;
      } else if (event.key === 'ArrowUp') {
        targetIndex = currentIndex - cols;
      } else if (event.key === 'ArrowDown') {
        targetIndex = currentIndex + cols;
      }

      if (targetIndex >= 0 && targetIndex < items.length && targetIndex !== currentIndex) {
        event.preventDefault();
        event.stopPropagation();
        this.reorderItem(currentIndex, targetIndex);
        item.focus?.();
      }
    }
  };

  /**
   * Opens the app drawer popup.
   */
  show() {
    if (!this.open) {
      this.open = true;
    }
  }

  /**
   * Closes the app drawer popup.
   */
  close() {
    if (this.open) {
      this.open = false;
      if (this.editing) {
        this.editing = false;
      }
    }
  }

  /**
   * Toggles the app drawer open/closed state.
   */
  toggle() {
    this.open = !this.open;
  }

  override render() {
    const headerContent = this.headline
      ? html`<span class="headline">${this.headline}</span>`
      : nothing;

    const editButton = this.reorderable && this.editable
      ? html`
          <div class="header-actions">
            ${this.editing
              ? html`
                  <slot name="reset-button">
                    <md-icon-button
                      class="reset-btn"
                      variant="standard"
                      icon="arrow_back"
                      aria-label="Reset to default order"
                      title="Reset to default order"
                      @click=${this.handleResetClick}
                    ></md-icon-button>
                  </slot>
                `
              : nothing}
            <slot name="edit-button">
              <md-icon-button
                class="edit-btn"
                variant=${this.editing ? 'filled' : 'standard'}
                icon=${this.editing ? 'check' : 'edit'}
                aria-label=${this.editing ? 'Done editing' : 'Edit apps order'}
                title=${this.editing ? 'Done editing' : 'Edit apps order'}
                @click=${this.handleEditToggle}
              ></md-icon-button>
            </slot>
          </div>
        `
      : nothing;

    const triggerContent = !this.noTrigger
      ? html`
          <div class="trigger-container" @click=${this.handleTriggerClick}>
            <slot name="trigger">
              <md-icon-button
                icon=${this.icon}
                aria-label=${this.ariaLabelText}
                aria-expanded=${this.open ? 'true' : 'false'}
                aria-haspopup="dialog"
              ></md-icon-button>
            </slot>
          </div>
        `
      : html`<slot name="trigger" @click=${this.handleTriggerClick}></slot>`;

    return html`
      <div class="backdrop" @click=${this.handleBackdropClick}></div>

      <div class="trigger-wrapper">
        ${triggerContent}
      </div>

      <div
        class="popover"
        role="dialog"
        aria-modal=${this.modal ? 'true' : 'false'}
        aria-label=${this.headline || this.ariaLabelText}
        aria-hidden=${this.open ? 'false' : 'true'}
      >
        <div class="header">
          <slot name="header">
            ${headerContent}
          </slot>
          ${editButton}
        </div>

        <div class="grid" role="group" aria-label="Apps">
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
@customElement('md-app-launcher')
export class MdAppLauncher extends MdAppDrawer {}

@customElement('md-apps-menu')
export class MdAppsMenu extends MdAppDrawer {}

@customElement('md-app-item')
export class MdAppItem extends MdAppDrawerItem {}

@customElement('md-app-launcher-item')
export class MdAppLauncherItem extends MdAppDrawerItem {}

declare global {
  interface HTMLElementTagNameMap {
    'md-app-drawer': MdAppDrawer;
    'md-app-launcher': MdAppLauncher;
    'md-apps-menu': MdAppsMenu;
    'md-app-drawer-item': MdAppDrawerItem;
    'md-app-item': MdAppItem;
    'md-app-launcher-item': MdAppLauncherItem;
  }
}
