import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { navigationBarItemStyles } from './navigation-bar.css.js';

export type NavigationBarLabelMode = 'alwaysShow' | 'selectedShow' | 'hidden' | 'always' | 'selected' | 'none';

/**
 * Material Design 3 Navigation Bar Item Component.
 *
 * Represents an individual destination in a navigation bar with an icon,
 * active indicator pill, badge, and label.
 *
 * @slot icon - Leading/inactive icon.
 * @slot active-icon - Custom icon shown when the item is active.
 * @slot badge - Custom badge indicator or element.
 * @slot - Default slot for item label text.
 *
 * @fires item-click - Dispatched when the item is clicked.
 */
@customElement('md-navigation-bar-item')
export class MdNavigationBarItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationBarItemStyles];

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'active-icon' })
  activeIcon = '';

  @property({ type: String })
  label = '';

  @property({ type: String, reflect: true })
  badge = '';

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: String, reflect: true, attribute: 'label-mode' })
  labelMode: NavigationBarLabelMode = 'alwaysShow';

  @property({ type: Boolean, reflect: true, attribute: 'hide-inactive-labels' })
  hideInactiveLabels = false;

  @queryAssignedElements({ slot: 'active-icon' })
  private assignedActiveIcons!: HTMLElement[];

  @queryAssignedElements({ slot: 'badge' })
  private assignedBadges!: HTMLElement[];

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('active') && !changedProperties.has('selected')) {
      this.selected = this.active;
    } else if (changedProperties.has('selected') && !changedProperties.has('active')) {
      this.active = this.selected;
    } else if (changedProperties.has('active') && changedProperties.has('selected')) {
      if (this.active) {
        this.selected = true;
      } else if (this.selected) {
        this.active = true;
      }
    }
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.updateAriaAttributes();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('active') || changedProperties.has('selected') || changedProperties.has('disabled')) {
      this.updateAriaAttributes();
    }
  }

  private updateAriaAttributes() {
    const isSelected = this.active || this.selected;
    this.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    if (this.disabled) {
      this.setAttribute('aria-disabled', 'true');
    } else {
      this.removeAttribute('aria-disabled');
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    this.emitEvent('item-click', {
      item: this,
      value: this.value || this.label,
      label: this.label,
      active: this.active,
    });
  };

  private renderBadge() {
    if (this.assignedBadges && this.assignedBadges.length > 0) {
      return html`<span class="badge-slot"><slot name="badge"></slot></span>`;
    }

    if (this.badge === '' || this.badge === null || this.badge === undefined) {
      return html`<slot name="badge"></slot>`;
    }

    const isDot = this.badge === 'dot' || this.badge === 'true' || this.badge === '';
    const badgeText = isDot ? '' : this.badge;

    return html`
      <span class="badge ${isDot ? 'dot' : ''}">
        ${badgeText}
      </span>
      <slot name="badge"></slot>
    `;
  }

  private renderIcon() {
    const hasCustomActiveIconSlot = this.assignedActiveIcons && this.assignedActiveIcons.length > 0;
    const hasActiveIconProp = Boolean(this.activeIcon);

    if (hasActiveIconProp || hasCustomActiveIconSlot) {
      return html`
        <span class="icon inactive-icon">
          <slot name="icon">
            ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
          </slot>
        </span>
        <span class="icon active-icon">
          <slot name="active-icon">
            ${this.activeIcon ? html`<md-icon name=${this.activeIcon}></md-icon>` : nothing}
          </slot>
        </span>
      `;
    }

    return html`
      <span class="icon">
        <slot name="icon">
          ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
        </slot>
      </span>
    `;
  }

  override render() {
    const isSelected = this.active || this.selected;

    const content = html`
      <div class="icon-wrapper">
        <div class="indicator"></div>
        <md-ripple ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring></md-focus-ring>
        ${this.renderIcon()}
        ${this.renderBadge()}
      </div>

      <div class="label-container">
        <span class="label">
          <slot>${this.label}</slot>
        </span>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-selected=${isSelected ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : nothing}
          @click=${this.handleClick}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <div
        class="item"
        tabindex=${this.disabled ? '-1' : nothing}
        @click=${this.handleClick}
      >
        ${content}
      </div>
    `;
  }
}

// Aliases
@customElement('md-nav-bar-item')
export class MdNavBarItem extends MdNavigationBarItem {}

declare global {
  interface HTMLElementTagNameMap {
    'md-navigation-bar-item': MdNavigationBarItem;
    'md-nav-bar-item': MdNavBarItem;
  }
}
