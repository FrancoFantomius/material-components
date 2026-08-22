import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { tooltipStyles } from './tooltip.css.js';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

/**
 * Material Design 3 Tooltip component.
 * Plain and rich tooltips providing contextual descriptions or interactive details.
 *
 * @element md-tooltip
 *
 * @slot - Default slot for tooltip text or supporting content.
 * @slot headline - Custom headline/subhead element for rich tooltips.
 * @slot actions - Custom action buttons for rich tooltips.
 * @slot anchor - Slotted anchor element (optional).
 *
 * @fires open - Dispatched when the tooltip becomes visible.
 * @fires close - Dispatched when the tooltip is hidden.
 * @fires action - Dispatched when the rich tooltip action button is clicked.
 */
@customElement('md-tooltip')
export class MdTooltip extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tooltipStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String, reflect: true })
  position: TooltipPosition = 'bottom';

  @property({ type: Boolean, reflect: true })
  rich = false;

  @property({ type: String, reflect: true })
  for = '';

  @property({ type: String })
  value = '';

  @property({ type: String })
  text = '';

  @property({ type: String })
  headline = '';

  @property({ type: String, attribute: 'action-text' })
  actionText = '';

  @property({ type: Number, attribute: 'show-delay' })
  showDelay = 500;

  @property({ type: Number, attribute: 'hide-delay' })
  hideDelay = 150;

  @property({ type: Number })
  get delay(): number {
    return this.showDelay;
  }

  set delay(val: number) {
    this.showDelay = val;
  }

  @property({ type: Boolean, reflect: true })
  persistent = false;

  @property({ type: Boolean, reflect: true, attribute: 'has-caret' })
  hasCaret = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @query('.tooltip')
  tooltipPanel!: HTMLElement;

  private _anchorElement: HTMLElement | null = null;
  private _boundAnchor: HTMLElement | null = null;
  private _showTimer: ReturnType<typeof setTimeout> | null = null;
  private _hideTimer: ReturnType<typeof setTimeout> | null = null;

  get anchor(): HTMLElement | null {
    return this._anchorElement || this.resolveAnchorElement();
  }

  set anchor(element: HTMLElement | null) {
    this._anchorElement = element;
    this.bindAnchorEvents();
  }

  get target(): HTMLElement | null {
    return this.anchor;
  }

  set target(element: HTMLElement | null) {
    this.anchor = element;
  }

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('resize', this.handleWindowChange);
    window.addEventListener('scroll', this.handleWindowChange, true);
    document.addEventListener('pointerdown', this.handleDocumentClick);
    this.bindAnchorEvents();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('resize', this.handleWindowChange);
    window.removeEventListener('scroll', this.handleWindowChange, true);
    document.removeEventListener('pointerdown', this.handleDocumentClick);
    this.unbindAnchorEvents();
    this.clearTimers();
  }

  override firstUpdated() {
    this.bindAnchorEvents();
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);

    if (changedProperties.has('for')) {
      this.bindAnchorEvents();
    }

    if (changedProperties.has('open')) {
      if (this.open) {
        this.updatePosition();
        this.emitEvent('open', { target: this });
      } else {
        this.emitEvent('close', { target: this });
      }
    }

    if (changedProperties.has('position') && this.open) {
      this.updatePosition();
    }
  }

  private resolveAnchorElement(): HTMLElement | null {
    if (this._anchorElement) {
      return this._anchorElement;
    }

    if (this.for) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const el = root?.getElementById
        ? root.getElementById(this.for)
        : document.getElementById(this.for);
      if (el) return el;
    }

    // Check slotted anchor
    const slottedAnchor = this.querySelector('[slot="anchor"]') as HTMLElement;
    if (slottedAnchor) return slottedAnchor;

    // Check previous sibling
    if (this.previousElementSibling instanceof HTMLElement) {
      return this.previousElementSibling;
    }

    // Check parent element if not body / html
    if (
      this.parentElement &&
      this.parentElement !== document.body &&
      this.parentElement !== document.documentElement
    ) {
      return this.parentElement;
    }

    return null;
  }

  private bindAnchorEvents() {
    const anchor = this.resolveAnchorElement();
    if (anchor === this._boundAnchor) return;

    this.unbindAnchorEvents();
    this._boundAnchor = anchor;

    if (this._boundAnchor) {
      this._boundAnchor.addEventListener('mouseenter', this.handleAnchorMouseEnter);
      this._boundAnchor.addEventListener('mouseleave', this.handleAnchorMouseLeave);
      this._boundAnchor.addEventListener('focusin', this.handleAnchorFocus);
      this._boundAnchor.addEventListener('focusout', this.handleAnchorBlur);
    }
  }

  private unbindAnchorEvents() {
    if (this._boundAnchor) {
      this._boundAnchor.removeEventListener('mouseenter', this.handleAnchorMouseEnter);
      this._boundAnchor.removeEventListener('mouseleave', this.handleAnchorMouseLeave);
      this._boundAnchor.removeEventListener('focusin', this.handleAnchorFocus);
      this._boundAnchor.removeEventListener('focusout', this.handleAnchorBlur);
      this._boundAnchor = null;
    }
  }

  private clearTimers() {
    if (this._showTimer !== null) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
    if (this._hideTimer !== null) {
      clearTimeout(this._hideTimer);
      this._hideTimer = null;
    }
  }

  private handleAnchorMouseEnter = () => {
    if (this.disabled) return;
    this.clearTimers();
    if (this.showDelay > 0) {
      this._showTimer = setTimeout(() => {
        this.show();
      }, this.showDelay);
    } else {
      this.show();
    }
  };

  private handleAnchorMouseLeave = () => {
    if (this.disabled || this.persistent) return;
    if (this._showTimer !== null) {
      clearTimeout(this._showTimer);
      this._showTimer = null;
    }
    if (this.hideDelay > 0) {
      this._hideTimer = setTimeout(() => {
        this.hide();
      }, this.hideDelay);
    } else {
      this.hide();
    }
  };

  private handleAnchorFocus = () => {
    if (this.disabled) return;
    this.clearTimers();
    this.show();
  };

  private handleAnchorBlur = () => {
    if (this.disabled || this.persistent) return;
    this.clearTimers();
    this.hide();
  };

  private handleTooltipMouseEnter = () => {
    if (this.rich && this.open) {
      if (this._hideTimer !== null) {
        clearTimeout(this._hideTimer);
        this._hideTimer = null;
      }
    }
  };

  private handleTooltipMouseLeave = () => {
    if (this.rich && this.open && !this.persistent) {
      this.handleAnchorMouseLeave();
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.open) {
      this.hide();
    }
  };

  private handleWindowChange = () => {
    if (this.open) {
      this.updatePosition();
    }
  };

  private handleDocumentClick = (event: PointerEvent | MouseEvent) => {
    if (!this.open || !this.rich) return;
    const path = event.composedPath();
    const anchor = this.resolveAnchorElement();

    if (!path.includes(this) && (!anchor || !path.includes(anchor))) {
      this.hide();
    }
  };

  private handleActionClick = () => {
    this.emitEvent('action', { target: this });
    if (!this.persistent) {
      this.hide();
    }
  };

  /**
   * Shows the tooltip.
   */
  show() {
    if (this.disabled || this.open) return;
    this.open = true;
    this.updatePosition();
  }

  /**
   * Hides the tooltip.
   */
  hide() {
    if (!this.open) return;
    this.open = false;
  }

  /**
   * Alias for hide().
   */
  close() {
    this.hide();
  }

  /**
   * Toggles visibility of the tooltip.
   */
  toggle() {
    if (this.open) {
      this.hide();
    } else {
      this.show();
    }
  }

  /**
   * Updates coordinates of the floating tooltip relative to the anchor.
   */
  updatePosition() {
    if (!this.tooltipPanel) return;

    const anchor = this.resolveAnchorElement();
    if (!anchor) return;

    const anchorRect = anchor.getBoundingClientRect();
    const tooltipRect = this.tooltipPanel.getBoundingClientRect();

    // If dimensions are not yet available (e.g. initial render / Happy DOM)
    const tWidth = tooltipRect.width || (this.rich ? 220 : 80);
    const tHeight = tooltipRect.height || (this.rich ? 80 : 24);

    const offset = this.rich ? 8 : 4;
    let top = 0;
    let left = 0;

    switch (this.position) {
      case 'top':
        top = anchorRect.top - tHeight - offset;
        left = anchorRect.left + (anchorRect.width - tWidth) / 2;
        break;
      case 'bottom':
        top = anchorRect.bottom + offset;
        left = anchorRect.left + (anchorRect.width - tWidth) / 2;
        break;
      case 'left':
        top = anchorRect.top + (anchorRect.height - tHeight) / 2;
        left = anchorRect.left - tWidth - offset;
        break;
      case 'right':
        top = anchorRect.top + (anchorRect.height - tHeight) / 2;
        left = anchorRect.right + offset;
        break;
    }

    // Viewport boundaries clamping
    const padding = 8;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1024;
    const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 768;

    left = Math.max(padding, Math.min(left, viewportWidth - tWidth - padding));
    top = Math.max(padding, Math.min(top, viewportHeight - tHeight - padding));

    this.tooltipPanel.style.top = `${top}px`;
    this.tooltipPanel.style.left = `${left}px`;
  }

  override render() {
    const displayText = this.value || this.text;

    return html`
      <slot name="anchor"></slot>

      <div
        class="tooltip"
        role="tooltip"
        aria-hidden=${this.open ? 'false' : 'true'}
        @mouseenter=${this.handleTooltipMouseEnter}
        @mouseleave=${this.handleTooltipMouseLeave}
      >
        <span class="caret" aria-hidden="true"></span>

        ${this.rich
          ? html`
              ${this.headline
                ? html`<h3 class="headline"><slot name="headline">${this.headline}</slot></h3>`
                : html`<slot name="headline"></slot>`}
              <div class="supporting-text">
                <slot>${displayText}</slot>
              </div>
              ${this.actionText || this.querySelector('[slot="actions"]')
                ? html`
                    <div class="actions">
                      <slot name="actions">
                        ${this.actionText
                          ? html`
                              <button
                                type="button"
                                class="action-button"
                                @click=${this.handleActionClick}
                              >
                                ${this.actionText}
                              </button>
                            `
                          : nothing}
                      </slot>
                    </div>
                  `
                : nothing}
            `
          : html`
              <span class="content">
                <slot>${displayText}</slot>
              </span>
            `}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tooltip': MdTooltip;
  }
}
