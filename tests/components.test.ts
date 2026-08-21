import { describe, it, expect, beforeEach } from 'vitest';
import '../src/index.js';
import { MdButton } from '../src/components/button/button.js';
import { MdTextField } from '../src/components/text-field/text-field.js';
import { MdCheckbox } from '../src/components/checkbox/checkbox.js';
import { MdSwitch } from '../src/components/switch/switch.js';
import { MdRadio, MdRadioGroup } from '../src/components/radio/radio.js';
import { MdProgress } from '../src/components/progress/progress.js';
import { MdBadge } from '../src/components/badge/badge.js';
import { MdChip } from '../src/components/chip/chip.js';
import { MdTabs, MdTab } from '../src/components/tabs/tabs.js';
import { MdDialog } from '../src/components/dialog/dialog.js';

describe('Material Design Web Components Suite', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('md-button', () => {
    it('should render default filled button with text', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.textContent = 'Click me';
      document.body.appendChild(button);
      await button.updateComplete;

      expect(button.variant).toBe('filled');
      expect(button.disabled).toBe(false);
      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton).not.toBeNull();
    });

    it('should support link mode when href is provided', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.href = 'https://example.com';
      button.textContent = 'Navigate';
      document.body.appendChild(button);
      await button.updateComplete;

      const innerLink = button.shadowRoot?.querySelector('a');
      expect(innerLink).not.toBeNull();
      expect(innerLink?.getAttribute('href')).toBe('https://example.com');
    });

    it('should reflect disabled state', async () => {
      const button = document.createElement('md-button') as MdButton;
      button.disabled = true;
      document.body.appendChild(button);
      await button.updateComplete;

      const innerButton = button.shadowRoot?.querySelector('button');
      expect(innerButton?.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('md-text-field', () => {
    it('should render with label and update value', async () => {
      const textField = document.createElement('md-text-field') as MdTextField;
      textField.label = 'Username';
      textField.value = 'JohnDoe';
      document.body.appendChild(textField);
      await textField.updateComplete;

      const input = textField.shadowRoot?.querySelector('input');
      expect(input?.value).toBe('JohnDoe');
      const label = textField.shadowRoot?.querySelector('.label');
      expect(label?.textContent).toBe('Username');
    });

    it('should participate in form submission and validation', async () => {
      const form = document.createElement('form');
      const textField = document.createElement('md-text-field') as MdTextField;
      textField.name = 'email';
      textField.value = 'test@example.com';
      textField.required = true;
      form.appendChild(textField);
      document.body.appendChild(form);
      await textField.updateComplete;

      expect(textField.checkValidity()).toBe(true);

      textField.value = '';
      await textField.updateComplete;
      expect(textField.checkValidity()).toBe(false);
    });
  });

  describe('md-checkbox', () => {
    it('should toggle checked state on click', async () => {
      const checkbox = document.createElement('md-checkbox') as MdCheckbox;
      document.body.appendChild(checkbox);
      await checkbox.updateComplete;

      expect(checkbox.checked).toBe(false);
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.checked).toBe(true);
    });

    it('should support indeterminate state', async () => {
      const checkbox = document.createElement('md-checkbox') as MdCheckbox;
      checkbox.indeterminate = true;
      document.body.appendChild(checkbox);
      await checkbox.updateComplete;

      expect(checkbox.indeterminate).toBe(true);
      checkbox.click();
      await checkbox.updateComplete;
      expect(checkbox.indeterminate).toBe(false);
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('md-switch', () => {
    it('should toggle selected state on click', async () => {
      const sw = document.createElement('md-switch') as MdSwitch;
      document.body.appendChild(sw);
      await sw.updateComplete;

      expect(sw.selected).toBe(false);
      sw.click();
      await sw.updateComplete;
      expect(sw.selected).toBe(true);
    });
  });

  describe('md-radio & md-radio-group', () => {
    it('should enforce single selection in radio group', async () => {
      const group = document.createElement('md-radio-group') as MdRadioGroup;
      group.name = 'fruit';

      const r1 = document.createElement('md-radio') as MdRadio;
      r1.value = 'apple';
      const r2 = document.createElement('md-radio') as MdRadio;
      r2.value = 'banana';

      group.appendChild(r1);
      group.appendChild(r2);
      document.body.appendChild(group);

      await group.updateComplete;
      await r1.updateComplete;
      await r2.updateComplete;

      r1.click();
      await r1.updateComplete;
      await r2.updateComplete;
      expect(r1.checked).toBe(true);
      expect(r2.checked).toBe(false);

      r2.click();
      await r1.updateComplete;
      await r2.updateComplete;
      expect(r1.checked).toBe(false);
      expect(r2.checked).toBe(true);
    });
  });

  describe('md-progress', () => {
    it('should render linear progress determinate & indeterminate', async () => {
      const progress = document.createElement('md-progress') as MdProgress;
      progress.type = 'linear';
      document.body.appendChild(progress);
      await progress.updateComplete;

      expect(progress.indeterminate).toBe(true);

      progress.value = 0.5;
      await progress.updateComplete;
      expect(progress.indeterminate).toBe(false);
      expect(progress.getAttribute('aria-valuenow')).toBe('0.5');
    });

    it('should render circular progress', async () => {
      const progress = document.createElement('md-progress') as MdProgress;
      progress.type = 'circular';
      document.body.appendChild(progress);
      await progress.updateComplete;

      const svg = progress.shadowRoot?.querySelector('svg');
      expect(svg).not.toBeNull();
    });
  });

  describe('md-badge', () => {
    it('should render value and dot states', async () => {
      const badge = document.createElement('md-badge') as MdBadge;
      badge.value = '5';
      document.body.appendChild(badge);
      await badge.updateComplete;

      const badgeSpan = badge.shadowRoot?.querySelector('.badge');
      expect(badgeSpan?.textContent?.trim()).toBe('5');
    });
  });

  describe('md-chip', () => {
    it('should trigger change event in filter mode', async () => {
      const chip = document.createElement('md-chip') as MdChip;
      chip.variant = 'filter';
      chip.label = 'Filter Item';
      document.body.appendChild(chip);
      await chip.updateComplete;

      let eventFired = false;
      chip.addEventListener('change', () => {
        eventFired = true;
      });

      chip.click();
      await chip.updateComplete;
      expect(chip.selected).toBe(true);
      expect(eventFired).toBe(true);
    });
  });

  describe('md-tabs', () => {
    it('should switch active tab on click', async () => {
      const tabs = document.createElement('md-tabs') as MdTabs;
      const tab1 = document.createElement('md-tab') as MdTab;
      tab1.label = 'Tab 1';
      const tab2 = document.createElement('md-tab') as MdTab;
      tab2.label = 'Tab 2';

      tabs.appendChild(tab1);
      tabs.appendChild(tab2);
      document.body.appendChild(tabs);

      await tabs.updateComplete;
      await tab1.updateComplete;
      await tab2.updateComplete;

      expect(tabs.activeIndex).toBe(0);
      tab2.click();
      await tabs.updateComplete;
      expect(tabs.activeIndex).toBe(1);
    });
  });
});

