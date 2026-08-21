import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { topAppBarStyles } from './top-app-bar.css.js';

export type TopAppBarVariant = 'center-aligned' | 'small' | 'medium' | 'large';

/**
 * Material Design 3 Top App Bar component.
 *
 * @slot navigation - Leading navigation icon button (e.g. menu, back arrow). Also aliased as `leading-icon` or `leading`.
 * @slot headline - Primary title text. Also aliased as `title`.
 * @slot subtitle - Secondary subtitle text. Also aliased as `supporting-text`.
 * @slot actions - Trailing action icon buttons or menus. Also aliased as `trailing-icon` or `trailing`.
 * @slot - Default slot for additional bar contents.
 */
@customElement('md-top-app-bar')
export class MdTopAppBar extends MdBaseElement {
  static override styles = [MdBaseElement.styles, topAppBarStyles];

  @property({ type: String, reflect: true })
  variant: TopAppBarVariant = 'center-aligned';

  @property({ type: String })
  headline = '';

  @property({ type: String })
  subtitle = '';

  @property({ type: Boolean, reflect: true })
  elevated = false;

  @property({ type: Boolean, reflect: true })
  fixed = false;

  override render() {
    const isMultiRow = this.variant === 'medium' || this.variant === 'large';

    const navigationSlot = html`
      <div class="leading">
        <slot name="navigation">
          <slot name="leading-icon">
            <slot name="leading"></slot>
          </slot>
        </slot>
      </div>
    `;

    const actionsSlot = html`
      <div class="trailing">
        <slot name="actions">
          <slot name="trailing-icon">
            <slot name="trailing"></slot>
          </slot>
        </slot>
      </div>
    `;

    const headlineSlot = html`
      <slot name="headline">
        <slot name="title">
          ${this.headline ? html`<span class="headline">${this.headline}</span>` : nothing}
        </slot>
      </slot>
    `;

    const subtitleSlot = html`
      <slot name="subtitle">
        <slot name="supporting-text">
          ${this.subtitle ? html`<span class="subtitle">${this.subtitle}</span>` : nothing}
        </slot>
      </slot>
    `;

    if (isMultiRow) {
      return html`
        <header class="top-app-bar" role="banner">
          <div class="row">
            ${navigationSlot}
            <slot></slot>
            ${actionsSlot}
          </div>
          <div class="headline-row">
            <div class="title-container">
              ${headlineSlot}
              ${subtitleSlot}
            </div>
          </div>
        </header>
      `;
    }

    return html`
      <header class="top-app-bar" role="banner">
        <div class="row">
          ${navigationSlot}
          <div class="title-container">
            ${headlineSlot}
            ${subtitleSlot}
          </div>
          <slot></slot>
          ${actionsSlot}
        </div>
      </header>
    `;
  }
}

// Register md-top-bar as an alias
@customElement('md-top-bar')
export class MdTopBar extends MdTopAppBar {}


declare global {
  interface HTMLElementTagNameMap {
    'md-top-app-bar': MdTopAppBar;
    'md-top-bar': MdTopAppBar;
  }
}
