import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { toolbarStyles } from './toolbar.css.js';

export type ToolbarMode = 'floating' | 'docked';
export type ToolbarOrientation = 'horizontal' | 'vertical';
export type ToolbarDockPosition = 'none' | 'top' | 'bottom' | 'left' | 'right';

/**
 * Material Design 3 Expressive Action Toolbar component.
 *
 * @slot leading - Optional leading action/navigation items.
 * @slot - Default slot for toolbar controls, icon buttons, segmented buttons, switches, dividers.
 * @slot trailing - Optional trailing actions or overflow items.
 * @slot fab - Slotted Primary Action / Floating Action Button.
 * @slot action - Alias for fab slot.
 */
@customElement('md-toolbar')
export class MdToolbar extends MdBaseElement {
  static override styles = [MdBaseElement.styles, toolbarStyles];

  /**
   * Toolbar layout mode: 'floating' (island pill) or 'docked' (edge-to-edge).
   */
  @property({ type: String, reflect: true })
  mode: ToolbarMode = 'floating';

  /**
   * Shorthand boolean to enable docked mode.
   */
  @property({ type: Boolean, reflect: true })
  docked = false;

  /**
   * Layout orientation of the toolbar items: 'horizontal' or 'vertical'.
   */
  @property({ type: String, reflect: true })
  orientation: ToolbarOrientation = 'horizontal';

  /**
   * Increases background elevation shadow.
   */
  @property({ type: Boolean, reflect: true })
  elevated = false;

  /**
   * Fixes toolbar position to the viewport edge.
   */
  @property({ type: Boolean, reflect: true })
  fixed = false;

  /**
   * When docked and fixed, specifies which viewport edge to pin to.
   */
  @property({ type: String, reflect: true, attribute: 'dock-position' })
  dockPosition: ToolbarDockPosition = 'none';

  /**
   * Accessible label describing the toolbar for screen readers.
   */
  @property({ type: String, attribute: 'aria-label' })
  ariaLabel = '';

  override connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'toolbar');
    }
  }

  override updated(changedProperties: Map<string | number | symbol, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('orientation')) {
      this.setAttribute('aria-orientation', this.orientation);
    }
  }

  override render() {
    return html`
      <div
        class="toolbar-container"
        aria-orientation=${this.orientation}
        aria-label=${this.ariaLabel || nothing}
      >
        <div class="leading">
          <slot name="leading"></slot>
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="trailing">
          <slot name="trailing"></slot>
        </div>
        <div class="fab-container">
          <slot name="fab">
            <slot name="action"></slot>
          </slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-toolbar': MdToolbar;
  }
}
