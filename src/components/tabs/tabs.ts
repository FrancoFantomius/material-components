import { html, nothing } from 'lit';
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js';
import { MdBaseElement } from '../../internal/base-component.js';
import '../../internal/ripple/ripple.js';
import '../../internal/focus-ring/focus-ring.js';
import '../icon/icon.js';
import { tabsStyles, tabStyles } from './tabs.css.js';

@customElement('md-tab')
export class MdTab extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tabStyles];

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  icon = '';

  @property({ type: String })
  label = '';

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tab');
    this.setAttribute('aria-selected', this.active ? 'true' : 'false');
    this.tabIndex = this.active ? 0 : -1;
  }

  override updated(changedProperties: Map<string, unknown>) {
    super.updated(changedProperties);
    if (changedProperties.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
      this.tabIndex = this.active ? 0 : -1;
    }
  }

  override render() {
    return html`
      <div class="tab">
        <md-ripple ?disabled=${this.disabled}></md-ripple>
        <md-focus-ring></md-focus-ring>
        <span class="content">
          <slot name="icon">
            ${this.icon ? html`<md-icon name=${this.icon}></md-icon>` : nothing}
          </slot>
          <slot>${this.label}</slot>
        </span>
      </div>
    `;
  }
}

@customElement('md-tabs')
export class MdTabs extends MdBaseElement {
  static override styles = [MdBaseElement.styles, tabsStyles];

  @property({ type: Number, reflect: true, attribute: 'active-index' })
  activeIndex = 0;

  @queryAssignedElements({ selector: 'md-tab' })
  private tabs!: MdTab[];

  @query('.indicator')
  private indicatorElement?: HTMLElement;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'tablist');
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
    if (changedProperties.has('activeIndex')) {
      this.syncActiveTab();
    }
  }

  private handleSlotChange = () => {
    this.syncActiveTab();
  };

  private syncActiveTab() {
    if (!this.tabs || this.tabs.length === 0) return;

    this.tabs.forEach((tab, index) => {
      tab.active = index === this.activeIndex;
    });

    this.updateIndicator();
  }

  private updateIndicator() {
    if (!this.indicatorElement || !this.tabs || this.tabs.length === 0) return;

    const activeTab = this.tabs[this.activeIndex];
    if (activeTab) {
      const parentRect = this.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      const left = tabRect.left - parentRect.left;
      const width = tabRect.width;

      this.indicatorElement.style.transform = `translateX(${left}px)`;
      this.indicatorElement.style.width = `${width}px`;
    }
  }

  private handleClick = (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest('md-tab') as MdTab | null;
    if (target && !target.disabled) {
      const index = this.tabs.indexOf(target);
      if (index !== -1 && index !== this.activeIndex) {
        this.activeIndex = index;
        this.syncActiveTab();
        this.emitEvent('change', { activeIndex: this.activeIndex });
      }
    }
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const enabledTabs = this.tabs.filter((t) => !t.disabled);
    if (enabledTabs.length === 0) return;

    const currentTab = this.tabs[this.activeIndex];
    const currentIndex = enabledTabs.indexOf(currentTab!);

    let nextIndex = -1;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = currentIndex < enabledTabs.length - 1 ? currentIndex + 1 : 0;
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = currentIndex > 0 ? currentIndex - 1 : enabledTabs.length - 1;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = enabledTabs.length - 1;
    }

    if (nextIndex !== -1 && enabledTabs[nextIndex]) {
      const targetTab = enabledTabs[nextIndex]!;
      this.activeIndex = this.tabs.indexOf(targetTab);
      this.syncActiveTab();
      targetTab.focus();
      this.emitEvent('change', { activeIndex: this.activeIndex });
    }
  };

  override render() {
    return html`
      <div class="tabs-container">
        <slot @slotchange=${this.handleSlotChange}></slot>
        <div class="indicator"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'md-tab': MdTab;
    'md-tabs': MdTabs;
  }
}

