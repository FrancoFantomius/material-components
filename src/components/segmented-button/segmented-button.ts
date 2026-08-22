import { html, nothing } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { segmentedButtonStyles, segmentedButtonSetStyles } from './segmented-button.css.js';

@customElement('md-segmented-button')
export class MdSegmentedButton extends MdBaseElement {
  static override styles = [MdBaseElement.styles, segmentedButtonStyles];

  @property({ type: Boolean, reflect: true })
  selected = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  value = '';

  @property({ type: String })
  label = '';

  @property({ type: String })
  icon = '';

  @property({ type: Boolean, attribute: 'no-checkmark', reflect: true })
  noCheckmark = false;

  @queryAssignedElements({ slot: 'icon' })
  private assignedIcons!: HTMLElement[];

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'button');
    this.updateAriaAttributes();
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('selected') || changedProperties.has('disabled')) {
      this.updateAriaAttributes();
    }
  }

  private updateAriaAttributes() {
    this.setAttribute('aria-pressed', this.selected ? 'true' : 'false');
    this.setAttribute('aria-disabled', this.disabled ? 'true' : 'false');
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    const parentSet = this.closest('md-segmented-button-set');
    if (!parentSet) {
      this.selected = !this.selected;
      this.emitEvent('change', {
        selected: this.selected,
        value: this.value || this.label || this.textContent?.trim() || '',
      });
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled) return;
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.click();
    }
  };

  override render() {
    const showCheckmark = this.selected && !this.noCheckmark;
    const hasIcon = Boolean(this.icon || (this.assignedIcons && this.assignedIcons.length > 0));

    return html`
      <div class="button">
        <md-ripple ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring></md-focus-ring>

        ${showCheckmark
          ? html`
              <span class="icon checkmark-icon" aria-hidden="true">
                <md-icon name="check" size="18"></md-icon>
              </span>
            `
          : hasIcon
          ? html`
              <span class="icon">
                <slot name="icon">
                  ${this.icon ? html`<md-icon name=${this.icon} size="18"></md-icon>` : nothing}
                </slot>
              </span>
            `
          : html`<slot name="icon"></slot>`}

        <span class="label">
          <slot>${this.label}</slot>
        </span>
      </div>
    `;
  }
}

@customElement('md-segmented-button-set')
export class MdSegmentedButtonSet extends MdBaseElement {
  static override styles = [MdBaseElement.styles, segmentedButtonSetStyles];

  @property({ type: Boolean, reflect: true })
  multiselect = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @queryAssignedElements({ selector: 'md-segmented-button' })
  private buttons!: MdSegmentedButton[];

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'group');
    this.addEventListener('click', this.handleClick);
    this.addEventListener('keydown', this.handleKeyDown);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('keydown', this.handleKeyDown);
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('disabled')) {
      this.syncDisabled();
    }
  }

  private handleSlotChange = () => {
    this.syncRovingTabIndex();
    if (this.disabled) {
      this.syncDisabled();
    }
  };

  private syncDisabled() {
    if (!this.buttons) return;
    this.buttons.forEach((btn) => {
      btn.disabled = this.disabled;
    });
  }

  private syncRovingTabIndex() {
    if (!this.buttons || this.buttons.length === 0) return;
    const selectedBtn = this.buttons.find((b) => b.selected && !b.disabled);
    const firstEnabled = this.buttons.find((b) => !b.disabled);
    const focusTarget = selectedBtn || firstEnabled;

    this.buttons.forEach((b) => {
      b.tabIndex = b === focusTarget ? 0 : -1;
    });
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return;
    const target = (event.target as HTMLElement).closest('md-segmented-button') as MdSegmentedButton | null;
    if (!target || target.disabled || !this.buttons.includes(target)) return;

    const index = this.buttons.indexOf(target);

    if (this.multiselect) {
      target.selected = !target.selected;
    } else {
      this.buttons.forEach((btn) => {
        btn.selected = btn === target;
      });
    }

    this.syncRovingTabIndex();

    const selectedButtons = this.buttons.filter((b) => b.selected);
    const values = selectedButtons.map((b) => b.value || b.label || b.textContent?.trim() || '');
    const value = target.value || target.label || target.textContent?.trim() || '';

    this.emitEvent('change', {
      target,
      index,
      selected: target.selected,
      value,
      values,
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const enabledButtons = this.buttons.filter((b) => !b.disabled);
    if (enabledButtons.length === 0) return;

    const currentFocus = document.activeElement;
    const currentIndex = enabledButtons.findIndex(
      (b) => b === currentFocus || (b.shadowRoot && b.shadowRoot.activeElement === currentFocus)
    );

    let nextIndex = -1;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      event.preventDefault();
      nextIndex = currentIndex >= 0 && currentIndex < enabledButtons.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledButtons.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = enabledButtons.length - 1;
    }

    if (nextIndex !== -1 && enabledButtons[nextIndex]) {
      const targetBtn = enabledButtons[nextIndex]!;
      this.buttons.forEach((b) => {
        b.tabIndex = b === targetBtn ? 0 : -1;
      });
      targetBtn.focus();
    }
  };

  override render() {
    return html`<slot @slotchange=${this.handleSlotChange}></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-segmented-button': MdSegmentedButton;
    'md-segmented-button-set': MdSegmentedButtonSet;
  }
}

