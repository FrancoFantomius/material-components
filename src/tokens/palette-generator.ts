import type { M3ColorScheme } from './colors.js';
import { colorSchemeToCssVariables } from './colors.js';


/**
 * Converts a hex color string (#RGB or #RRGGBB) to HSL values [h, s, l].
 * h in [0, 360], s in [0, 100], l in [0, 100].
 */
export function hexToHsl(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) {
    return [0, 0, 0];
  }
  const r = ((num >> 16) & 255) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

/**
 * Converts HSL values to a hex color string (#RRGGBB).
 */
export function hslToHex(h: number, s: number, l: number): string {
  const normS = Math.max(0, Math.min(100, s)) / 100;
  const normL = Math.max(0, Math.min(100, l)) / 100;
  const a = normS * Math.min(normL, 1 - normL);
  const f = (n: number) => {
    const k = (n + (h % 360) / 30) % 12;
    const color = normL - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

/**
 * Converts a hex color string to RGB values [r, g, b].
 */
export function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  const num = parseInt(c, 16);
  if (isNaN(num)) return [0, 0, 0];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Normalizes a hex color string to #RRGGBB uppercase format.
 */
export function normalizeHex(hex: string): string {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) {
    c = c.split('').map(x => x + x).join('');
  }
  return `#${c.padStart(6, '0').slice(0, 6)}`.toUpperCase();
}

/**
 * Automatically derives a full 37-token M3 color scheme (light or dark) from a seed hex color.
 */
export function generateColorScheme(sourceColorHex: string, isDark: boolean): M3ColorScheme {
  const normalizedHex = normalizeHex(sourceColorHex);
  const [h, s] = hexToHsl(normalizedHex);

  if (isDark) {
    return {
      primary: hslToHex(h, Math.max(s, 60), 80),
      onPrimary: hslToHex(h, Math.max(s, 70), 20),
      primaryContainer: hslToHex(h, Math.max(s, 60), 32),
      onPrimaryContainer: hslToHex(h, Math.max(s, 60), 90),
      secondary: hslToHex((h + 10) % 360, 25, 75),
      onSecondary: hslToHex((h + 10) % 360, 30, 20),
      secondaryContainer: hslToHex((h + 10) % 360, 30, 32),
      onSecondaryContainer: hslToHex((h + 10) % 360, 35, 92),
      tertiary: hslToHex((h + 60) % 360, 40, 80),
      onTertiary: hslToHex((h + 60) % 360, 45, 20),
      tertiaryContainer: hslToHex((h + 60) % 360, 45, 32),
      onTertiaryContainer: hslToHex((h + 60) % 360, 50, 92),
      error: '#F2B8B5',
      onError: '#601410',
      errorContainer: '#8C1D18',
      onErrorContainer: '#F9DEDC',
      background: '#141218',
      onBackground: '#E6E0E9',
      surface: '#141218',
      onSurface: '#E6E0E9',
      surfaceVariant: '#49454F',
      onSurfaceVariant: '#CAC4D0',
      outline: '#938F99',
      outlineVariant: '#49454F',
      shadow: '#000000',
      scrim: 'rgba(0, 0, 0, 0.32)',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#313033',
      inversePrimary: normalizedHex,
      surfaceDim: '#141218',
      surfaceBright: '#3B383E',
      surfaceContainerLowest: '#0F0D13',
      surfaceContainerLow: '#1D1B20',
      surfaceContainer: '#211F26',
      surfaceContainerHigh: '#2B2930',
      surfaceContainerHighest: '#36343B',
    };
  }

  return {
    primary: normalizedHex,
    onPrimary: '#FFFFFF',
    primaryContainer: hslToHex(h, Math.max(s, 55), 90),
    onPrimaryContainer: hslToHex(h, Math.max(s, 70), 16),
    secondary: hslToHex((h + 10) % 360, 25, 42),
    onSecondary: '#FFFFFF',
    secondaryContainer: hslToHex((h + 10) % 360, 35, 92),
    onSecondaryContainer: hslToHex((h + 10) % 360, 40, 16),
    tertiary: hslToHex((h + 60) % 360, 40, 42),
    onTertiary: '#FFFFFF',
    tertiaryContainer: hslToHex((h + 60) % 360, 50, 92),
    onTertiaryContainer: hslToHex((h + 60) % 360, 55, 16),
    error: '#B3261E',
    onError: '#FFFFFF',
    errorContainer: '#F9DEDC',
    onErrorContainer: '#410E0B',
    background: hslToHex(h, 15, 99),
    onBackground: '#1D1B20',
    surface: hslToHex(h, 15, 99),
    onSurface: '#1D1B20',
    surfaceVariant: hslToHex(h, 15, 92),
    onSurfaceVariant: '#49454F',
    outline: '#79747E',
    outlineVariant: '#CAC4D0',
    shadow: '#000000',
    scrim: 'rgba(0, 0, 0, 0.32)',
    inverseSurface: '#313033',
    inverseOnSurface: '#F4EFF4',
    inversePrimary: hslToHex(h, Math.max(s, 60), 80),
    surfaceDim: hslToHex(h, 10, 88),
    surfaceBright: hslToHex(h, 15, 99),
    surfaceContainerLowest: '#FFFFFF',
    surfaceContainerLow: hslToHex(h, 12, 97),
    surfaceContainer: hslToHex(h, 12, 95),
    surfaceContainerHigh: hslToHex(h, 12, 92),
    surfaceContainerHighest: hslToHex(h, 12, 90),
  };
}

export interface GeneratedTheme {
  sourceColor: string;
  light: M3ColorScheme;
  dark: M3ColorScheme;
  schemes: {
    light: M3ColorScheme;
    dark: M3ColorScheme;
  };
  cssVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  cssText: string;
  apply: (options?: { dark?: boolean; target?: HTMLElement }) => void;
}

/**
 * Automatically derives full M3 light and dark CSS variable palettes from a single seed color.
 *
 * @param sourceColorHex - Seed hex color (e.g. '#6750A4' or '#006A6A')
 * @returns Complete M3 theme including light/dark color schemes, CSS variable records, and cssText stylesheet.
 */
export function generateTheme(sourceColorHex: string): GeneratedTheme {
  const normalizedSource = normalizeHex(sourceColorHex);
  const lightScheme = generateColorScheme(normalizedSource, false);
  const darkScheme = generateColorScheme(normalizedSource, true);

  const lightVariables = colorSchemeToCssVariables(lightScheme);
  const darkVariables = colorSchemeToCssVariables(darkScheme);

  const formatVariables = (vars: Record<string, string>, indent = '    ') =>
    Object.entries(vars)
      .map(([key, value]) => `${indent}${key}: ${value};`)
      .join('\n');

  const cssText = `:root, :host {\n${formatVariables(lightVariables)}\n}\n\n[data-theme='dark'] {\n${formatVariables(darkVariables)}\n}`;

  return {
    sourceColor: normalizedSource,
    light: lightScheme,
    dark: darkScheme,
    schemes: {
      light: lightScheme,
      dark: darkScheme,
    },
    cssVariables: {
      light: lightVariables,
      dark: darkVariables,
    },
    cssText,
    apply(options?: { dark?: boolean; target?: HTMLElement }) {
      const target = options?.target ?? (typeof document !== 'undefined' ? document.documentElement : undefined);
      if (!target) return;
      const isDark = options?.dark ?? target.getAttribute('data-theme') === 'dark';
      const scheme = isDark ? darkScheme : lightScheme;
      for (const [key, value] of Object.entries(scheme)) {
        if (value) {
          const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
          target.style.setProperty(`--md-sys-color-${kebab}`, value);
        }
      }
    },
  };
}
