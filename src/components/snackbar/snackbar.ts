import { html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../icon/icon.js';
import { snackbarStyles } from './snackbar.css.js';

@customElement('md-snackbar')
export class MdSnackbar extends MdBaseElement {
  static override styles = [MdBaseElement.styles, snackbarStyles];

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: String })
  message = '';

  @property({ type: String, attribute: 'action-text' })
  actionText = '';

  @property({ type: Boolean, reflect: true })
  closeable = false;

  @property({ type: Number, attribute: 'timeout-ms' })
  timeoutMs = 4000;

  private timerId: number | null = null;

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('open')) {
      if (this.open) {
        this.startTimer();
      } else {
        this.clearTimer();
      }
    }
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
    this.emitEvent('close');
  }

  private startTimer() {
    this.clearTimer();
    if (this.timeoutMs > 0) {
      this.timerId = window.setTimeout(() => {
        this.close();
      }, this.timeoutMs);
    }
  }

  private clearTimer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private handleAction = () => {
    this.emitEvent('action');
    this.close();
  };

  private handleClose = () => {
    this.close();
  };

  override render() {
    return html`
      <div class="snackbar" role="status" aria-live="polite">
        <div class="message">
          <slot>${this.message}</slot>
        </div>

        <div class="actions">
          ${this.actionText
            ? html`
                <button class="action-btn" @click=${this.handleAction}>
                  ${this.actionText}
                </button>
              `
            : nothing}

          ${this.closeable
            ? html`
                <button class="close-btn" aria-label="Dismiss" @click=${this.handleClose}>
                  <md-icon name="close" size="18"></md-icon>
                </button>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-snackbar': MdSnackbar;
  }
}

