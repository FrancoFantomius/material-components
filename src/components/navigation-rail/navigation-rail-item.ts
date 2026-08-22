import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { navigationRailItemStyles } from './navigation-rail.css.js';

/**
 * Material Design 3 Navigation Rail Item component.
 *
 * @slot icon - Custom leading icon.
 * @slot - Default slot for destination label.
 * @slot badge - Custom badge element.
 */
@customElement('md-navigation-rail-item')
export class MdNavigationRailItem extends MdBaseElement {
  static override styles = [MdBaseElement.styles, navigationRailItemStyles];

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'active-icon' })
  activeIcon = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  badge = '';

  @property({ type: Boolean, attribute: 'badge-dot' })
  badgeDot = false;

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: String })
  value = '';

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
      value: this.value,
      item: this,
    });
  };

  override render() {
    const text = this.label || this.headline;
    const currentIcon = (this.active && this.activeIcon) ? this.activeIcon : this.icon;

    const renderBadge = () => {
      if (this.badgeDot) {
        return html`<span class="badge dot"></span>`;
      }
      if (this.badge) {
        return html`<span class="badge">${this.badge}</span>`;
      }
      return nothing;
    };

    const inner = html`
      <div class="indicator-wrapper">
        <div class="active-indicator">
          <md-ripple ?disabled=${this.disabled}></md-ripple>
          <md-focus-ring></md-focus-ring>
          <span class="icon-slot">
            <slot name="icon">
              ${currentIcon ? html`<md-icon name=${currentIcon}></md-icon>` : nothing}
            </slot>
          </span>
        </div>

        <div class="badge-slot">
          <slot name="badge">
            ${renderBadge()}
          </slot>
        </div>
      </div>

      <div class="label-container">
        <slot>
          ${text ? html`<span class="label">${text}</span>` : nothing}
        </slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          class="item"
          href=${this.disabled ? nothing : this.href}
          target=${this.target || nothing}
          aria-disabled=${this.disabled ? 'true' : nothing}
          aria-current=${this.active ? 'page' : nothing}
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
        aria-pressed=${this.active ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${inner}
      </div>
    `;
  }
}

// Aliases
@customElement('md-nav-rail-item')
export class MdNavRailItem extends MdNavigationRailItem {}

declare global {
  interface HTMLElementTagNameMap {
    'md-navigation-rail-item': MdNavigationRailItem;
    'md-nav-rail-item': MdNavRailItem;
  }
}
