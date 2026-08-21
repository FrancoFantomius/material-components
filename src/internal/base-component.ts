import { LitElement, css, CSSResultGroup } from 'lit';

/**
 * Base element class for all Material Web Components.
 * Provides standard reset styles and event dispatch helpers.
 */
export class MdBaseElement extends LitElement {
  static override styles: CSSResultGroup = css`
    :host {
      box-sizing: border-box;
      font-family: var(--md-sys-typescale-font-family, 'Roboto', -apple-system, BlinkMacSystemFont, sans-serif);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *, *::before, *::after {
      box-sizing: inherit;
    }
  `;

  /**
   * Helper to dispatch custom events with standard bubbles/composed defaults.
   */
  protected emitEvent<T = unknown>(
    name: string,
    detail?: T,
    options: CustomEventInit<T> = {}
  ): boolean {
    const event = new CustomEvent<T>(name, {
      bubbles: true,
      composed: true,
      cancelable: true,
      detail,
      ...options,
    });
    return this.dispatchEvent(event);
  }
}

