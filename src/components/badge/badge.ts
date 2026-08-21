import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import { badgeStyles } from './badge.css.js';

@customElement('md-badge')
export class MdBadge extends MdBaseElement {
  static override styles = [MdBaseElement.styles, badgeStyles];

  @property({ type: String, reflect: true })
  value = '';

  @property({ type: Boolean, reflect: true })
  dot = false;

  @property({ type: Boolean, reflect: true })
  anchored = false;

  @queryAssignedElements()
  private assignedChildren!: HTMLElement[];

  private handleSlotChange = () => {
    this.anchored = this.assignedChildren.length > 0;
  };

  override render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <span class="badge">
        ${!this.dot && this.value ? this.value : nothing}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-badge': MdBadge;
  }
}

