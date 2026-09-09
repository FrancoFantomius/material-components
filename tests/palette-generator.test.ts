import { describe, it, expect } from 'vitest';
import {
  generateTheme,
  generateColorScheme,
  hexToHsl,
  hslToHex,
  hexToRgb,
  normalizeHex,
} from '../src/tokens/palette-generator.js';

describe('Dynamic Palette Generator Utility', () => {
  it('should convert hex to HSL correctly', () => {
    const [h, s, l] = hexToHsl('#6750A4');
    expect(h).toBeGreaterThanOrEqual(250);
    expect(h).toBeLessThanOrEqual(270);
    expect(s).toBeGreaterThan(30);
    expect(l).toBeGreaterThan(40);

    // 3-digit hex
    const [h3, s3, l3] = hexToHsl('#FFF');
    expect(l3).toBe(100);

    // Invalid hex fallback
    const [hInv, sInv, lInv] = hexToHsl('invalid');
    expect(hInv).toBe(0);
    expect(sInv).toBe(0);
    expect(lInv).toBe(0);
  });

  it('should convert HSL to hex correctly', () => {
    const hex = hslToHex(0, 100, 50);
    expect(hex.toUpperCase()).toBe('#FF0000');
  });

  it('should convert hex to RGB correctly', () => {
    const rgb = hexToRgb('#6750A4');
    expect(rgb).toEqual([103, 80, 164]);
  });

  it('should normalize hex strings', () => {
    expect(normalizeHex('#fff')).toBe('#FFFFFF');
    expect(normalizeHex('6750a4')).toBe('#6750A4');
  });

  it('should generate all 37 tokens for light and dark color schemes', () => {
    const light = generateColorScheme('#6750A4', false);
    const dark = generateColorScheme('#6750A4', true);

    const expectedTokens = [
      'primary',
      'onPrimary',
      'primaryContainer',
      'onPrimaryContainer',
      'secondary',
      'onSecondary',
      'secondaryContainer',
      'onSecondaryContainer',
      'tertiary',
      'onTertiary',
      'tertiaryContainer',
      'onTertiaryContainer',
      'error',
      'onError',
      'errorContainer',
      'onErrorContainer',
      'background',
      'onBackground',
      'surface',
      'onSurface',
      'surfaceVariant',
      'onSurfaceVariant',
      'outline',
      'outlineVariant',
      'shadow',
      'scrim',
      'inverseSurface',
      'inverseOnSurface',
      'inversePrimary',
      'surfaceDim',
      'surfaceBright',
      'surfaceContainerLowest',
      'surfaceContainerLow',
      'surfaceContainer',
      'surfaceContainerHigh',
      'surfaceContainerHighest',
    ];

    for (const token of expectedTokens) {
      expect((light as any)[token], `light.${token} should be defined`).toBeTruthy();
      expect((dark as any)[token], `dark.${token} should be defined`).toBeTruthy();
    }

    // Check light and dark primary colors
    expect(light.primary).toBe('#6750A4');
    expect(dark.inversePrimary).toBe('#6750A4');
  });

  it('should generate full theme with CSS variables and stylesheet', () => {
    const theme = generateTheme('#006A6A');

    expect(theme.sourceColor).toBe('#006A6A');
    expect(theme.light).toBeDefined();
    expect(theme.dark).toBeDefined();
    expect(theme.schemes.light).toBe(theme.light);
    expect(theme.schemes.dark).toBe(theme.dark);

    // CSS variables
    expect(theme.cssVariables.light['--md-sys-color-primary']).toBe('#006A6A');
    expect(theme.cssVariables.dark['--md-sys-color-inverse-primary']).toBe('#006A6A');

    // CSS Text
    expect(theme.cssText).toContain(':root, :host {');
    expect(theme.cssText).toContain('--md-sys-color-primary: #006A6A;');
    expect(theme.cssText).toContain("[data-theme='dark'] {");

    // apply() method
    const target = document.createElement('div');
    theme.apply({ target, dark: false });
    expect(target.style.getPropertyValue('--md-sys-color-primary')).toBe('#006A6A');

    theme.apply({ target, dark: true });
    expect(target.style.getPropertyValue('--md-sys-color-inverse-primary')).toBe('#006A6A');
  });
});

