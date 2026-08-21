import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { navigationDrawerStyles, navigationDrawerItemStyles } from './navigation-drawer.css.js';

export type NavigationDrawerType = 'modal' | 'standard' | 'responsive';
export type NavigationDrawerPivot = 'left' | 'right';

/**
 * Material Design 3 Navigation Drawer Item component.
 *
 * @slot icon - Custom leading icon.
 * @slot - Default slot for item label / headline.
 * @slot badge - Custom trailing badge or indicator.
 */
@customElement('md-navigation-drawer-item')
export class MdNavigationDrawerItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationDrawerItemStyles];

  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  badge = '';

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  override willUpdate(changedProperties: Map<string, unknown>) {
    super.willUpdate(changedProperties);
    if (changedProperties.has('selected') && !changedProperties.has('active')) {
      this.active = this.selected;
    } else if (changedProperties.has('active') && !changedProperties.has('selected')) {
      this.selected = this.active;
    }
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    this.emitEvent('item-click', {
      label: this.label || this.headline,
      icon: this.icon,
      active: this.active,
    });
  };

  override render() {
    const text = this.label || this.headline;

    const inner = html`
      <md-ripple ?disabled=${this.disabled}></md-ripple>
      <md-focus-ring></md-focus-ring>

      <div class="start">
        ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
        <slot name="icon"></slot>
      </div>

      <div class="label-container">
        ${text ? html`<span class="label">${text}</span>` : nothing}
        <slot></slot>
      </div>

      <div class="end">
        ${this.badge ? html`<span class="badge">${this.badge}</span>` : nothing}
        <slot name="badge"></slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          @click=${this.handleClick}
        >
          ${inner}
        </a>
      `;
    }

    return html`
      <div
        class="item"
        role="button"
        tabindex=${this.disabled ? '-1' : '0'}
        aria-disabled=${this.disabled ? 'true' : nothing}
        @click=${this.handleClick}
      >
        ${inner}
      </div>
    `;
  }
}

/**
 * Material Design 3 Navigation Drawer (Side Menu / Menu Bar) component.
 *
 * @slot header - Top drawer header area (profile, app title, etc.).
 * @slot - Default slot for drawer navigation items.
 * @slot footer - Bottom drawer section.
 */
@customElement('md-navigation-drawer')
export class MdNavigationDrawer extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationDrawerStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  type: NavigationDrawerType = 'modal';

  @property({ type: Boolean, reflect: true })
  responsive = false;

  @property({ type: Boolean, reflect: true })
  closed = false;

  @property({ type: String, reflect: true })
  pivot: NavigationDrawerPivot = 'left';

  @property({ type: String })
  headline = '';

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
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
    if (changedProperties.has('closed') && !changedProperties.has('open')) {
      if (this.closed) {
        this.emitEvent('close');
      } else {
        this.emitEvent('open');
      }
    }
  }

  private isModalMode(): boolean {
    if (this.responsive || this.type === 'responsive') {
      return typeof window !== 'undefined' && window.innerWidth <= 960;
    }
    if (this.type === 'standard') return false;
    return true;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open && this.isModalMode()) {
      this.close();
    }
  };

  private handleScrimClick = () => {
    this.close();
    this.emitEvent('scrim-click');
  };

  /**
   * Opens the navigation drawer.
   */
  show() {
    if (this.isModalMode()) {
      this.open = true;
    } else {
      this.closed = false;
      this.open = true;
    }
  }

  /**
   * Closes the navigation drawer.
   */
  close() {
    if (this.isModalMode()) {
      this.open = false;
    } else {
      this.closed = true;
      this.open = false;
    }
  }

  /**
   * Toggles open / closed state of the navigation drawer.
   */
  toggle() {
    if (this.isModalMode()) {
      this.open = !this.open;
    } else {
      this.closed = !this.closed;
    }
  }

  override render() {
    const headlineContent = this.headline
      ? html`<h2 class="headline">${this.headline}</h2>`
      : nothing;

    return html`
      <div class="scrim" @click=${this.handleScrimClick}></div>

      <aside
        class="drawer"
        role="navigation"
        aria-hidden=${this.open ? 'false' : 'true'}
        aria-label=${this.headline || 'Navigation menu'}
      >
        <div class="header">
          <slot name="header">
            ${headlineContent}
          </slot>
        </div>

        <div class="content">
          <slot></slot>
        </div>

        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </aside>
    `;
  }
}

// Aliases
@customElement('md-drawer')
export class MdDrawer extends MdNavigationDrawer {}

@customElement('md-menu-bar')
export class MdMenuBar extends MdNavigationDrawer {}

@customElement('md-drawer-item')
export class MdDrawerItem extends MdNavigationDrawerItem {}

declare global {
  interface HTMLElementTagNameMap {
    'md-navigation-drawer': MdNavigationDrawer;
    'md-drawer': MdDrawer;
    'md-menu-bar': MdMenuBar;
    'md-navigation-drawer-item': MdNavigationDrawerItem;
    'md-drawer-item': MdDrawerItem;
  }
}
