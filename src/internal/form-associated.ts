import { property } from 'lit/decorators.js';
import { MdBaseElement } from './base-component.js';

/**
 * Base element class for Form-Associated Custom Elements (FACE).
 * Provides seamless integration with native HTML <form> elements.
 */
export class MdFormAssociatedElement extends MdBaseElement {
  static formAssociated = true;

  protected internals?: ElementInternals;

  @property({ type: String, reflect: true })
  name = '';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  private _customValidityMessage = '';
  private _valid = true;

  constructor() {
    super();
    if (typeof this.attachInternals === 'function') {
      this.internals = this.attachInternals();
    }
  }

  get form(): HTMLFormElement | null {
    return this.internals?.form ?? (this.closest('form') as HTMLFormElement | null);
  }

  get validity(): ValidityState {
    return this.internals?.validity ?? ({
      valid: this._valid,
      valueMissing: !this._valid,
      customError: Boolean(this._customValidityMessage),
      badInput: false,
      patternMismatch: false,
      rangeOverflow: false,
      rangeUnderflow: false,
      stepMismatch: false,
      tooLong: false,
      tooShort: false,
      typeMismatch: false,
    } as ValidityState);
  }

  get validationMessage(): string {
    return this.internals?.validationMessage ?? this._customValidityMessage;
  }

  get willValidate(): boolean {
    return this.internals?.willValidate ?? !this.disabled;
  }

  checkValidity(): boolean {
    if (this.internals?.checkValidity) {
      return this.internals.checkValidity();
    }
    return this._valid;
  }

  reportValidity(): boolean {
    if (this.internals?.reportValidity) {
      return this.internals.reportValidity();
    }
    return this._valid;
  }

  protected setFormValue(value: string | File | FormData | null): void {
    this.internals?.setFormValue(value);
  }

  protected setValidity(
    flags?: ValidityStateFlags,
    message?: string,
    anchor?: HTMLElement
  ): void {
    if (flags) {
      const hasErrors = Object.values(flags).some(Boolean);
      this._valid = !hasErrors;
      this._customValidityMessage = message || '';
    } else {
      this._valid = true;
      this._customValidityMessage = '';
    }

    if (this.internals?.setValidity) {
      this.internals.setValidity(flags, message, anchor);
    }
  }

  formResetCallback(): void {
    // Override in child class to reset internal values
  }

  formDisabledCallback(disabled: boolean): void {
    this.disabled = disabled;
  }

  formAssociatedCallback?(form: HTMLFormElement | null): void;

  formStateRestoreCallback?(state: unknown, mode: 'restore' | 'autocomplete'): void;
}

