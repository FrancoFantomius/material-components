import { html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../icon/icon.js';
import { dialogStyles } from './dialog.css.js';

@customElement('md-dialog')
export class MdDialog extends MdBaseElement {
  static override styles = [MdBaseElement.styles, dialogStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  headline = '';

  @property({ type: String })
  icon = '';

  @property({ type: String, attribute: 'return-value' })
  returnValue = '';

  @query('dialog')
  private dialogElement?: HTMLDialogElement;

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        if (this.dialogElement && !this.dialogElement.open) {
          this.dialogElement.showModal();
        }
      } else {
        if (this.dialogElement && this.dialogElement.open) {
          this.dialogElement.close();
        }
      }
    }
  }

  showModal() {
    this.open = true;
  }

  show() {
    this.open = true;
  }

  close(returnValue?: string) {
    if (returnValue !== undefined) {
      this.returnValue = returnValue;
    }
    this.open = false;
    this.emitEvent('close', { returnValue: this.returnValue });
  }

  private handleCancel = (event: Event) => {
    event.preventDefault();
    this.close('cancel');
  };

  private handleBackdropClick = (event: MouseEvent) => {
    if (event.target === this.dialogElement) {
      const rect = this.dialogElement.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        this.close('backdrop');
      }
    }
  };

  override render() {
    return html`
      <dialog
        @cancel=${this.handleCancel}
        @click=${this.handleBackdropClick}
      >
        <div class="dialog-container">
          <div class="icon">
            <slot name="icon">
              ${this.icon ? html`<md-icon name=${this.icon} size="32"></md-icon>` : nothing}
            </slot>
          </div>

          <slot name="headline">
            ${this.headline ? html`<h2 class="headline">${this.headline}</h2>` : nothing}
          </slot>

          <div class="content">
            <slot></slot>
          </div>

          <div class="actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-dialog': MdDialog;
  }
}

