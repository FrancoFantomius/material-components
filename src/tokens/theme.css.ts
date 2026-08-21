import { css } from 'lit';
import { lightColorScheme, darkColorScheme, M3ColorScheme } from './colors.js';
import { typographyTokens } from './typography.js';
import { elevationTokens } from './elevation.js';
import { shapeTokens } from './shape.js';
import { motionTokens } from './motion.js';

export const themeStyles = css`
  :root, :host {
    /* Color Tokens - Default Light */
    --md-sys-color-primary: ${css([lightColorScheme.primary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-primary: ${css([lightColorScheme.onPrimary] as unknown as TemplateStringsArray)};
    --md-sys-color-primary-container: ${css([lightColorScheme.primaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-primary-container: ${css([lightColorScheme.onPrimaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-secondary: ${css([lightColorScheme.secondary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-secondary: ${css([lightColorScheme.onSecondary] as unknown as TemplateStringsArray)};
    --md-sys-color-secondary-container: ${css([lightColorScheme.secondaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-secondary-container: ${css([lightColorScheme.onSecondaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-tertiary: ${css([lightColorScheme.tertiary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-tertiary: ${css([lightColorScheme.onTertiary] as unknown as TemplateStringsArray)};
    --md-sys-color-tertiary-container: ${css([lightColorScheme.tertiaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-tertiary-container: ${css([lightColorScheme.onTertiaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-error: ${css([lightColorScheme.error] as unknown as TemplateStringsArray)};
    --md-sys-color-on-error: ${css([lightColorScheme.onError] as unknown as TemplateStringsArray)};
    --md-sys-color-error-container: ${css([lightColorScheme.errorContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-error-container: ${css([lightColorScheme.onErrorContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-background: ${css([lightColorScheme.background] as unknown as TemplateStringsArray)};
    --md-sys-color-on-background: ${css([lightColorScheme.onBackground] as unknown as TemplateStringsArray)};
    --md-sys-color-surface: ${css([lightColorScheme.surface] as unknown as TemplateStringsArray)};
    --md-sys-color-on-surface: ${css([lightColorScheme.onSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-variant: ${css([lightColorScheme.surfaceVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-on-surface-variant: ${css([lightColorScheme.onSurfaceVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-outline: ${css([lightColorScheme.outline] as unknown as TemplateStringsArray)};
    --md-sys-color-outline-variant: ${css([lightColorScheme.outlineVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-lowest: ${css([lightColorScheme.surfaceContainerLowest] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-low: ${css([lightColorScheme.surfaceContainerLow] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container: ${css([lightColorScheme.surfaceContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-high: ${css([lightColorScheme.surfaceContainerHigh] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-highest: ${css([lightColorScheme.surfaceContainerHighest] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-surface: ${css([lightColorScheme.inverseSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-on-surface: ${css([lightColorScheme.inverseOnSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-primary: ${css([lightColorScheme.inversePrimary] as unknown as TemplateStringsArray)};

    /* Typography */
    --md-sys-typescale-font-family: ${css([typographyTokens.fontFamily] as unknown as TemplateStringsArray)};
    --md-sys-typescale-body-large-size: ${css([typographyTokens.bodyLarge.size] as unknown as TemplateStringsArray)};
    --md-sys-typescale-body-large-line-height: ${css([typographyTokens.bodyLarge.lineHeight] as unknown as TemplateStringsArray)};
    --md-sys-typescale-body-medium-size: ${css([typographyTokens.bodyMedium.size] as unknown as TemplateStringsArray)};
    --md-sys-typescale-label-large-size: ${css([typographyTokens.labelLarge.size] as unknown as TemplateStringsArray)};
    --md-sys-typescale-title-medium-size: ${css([typographyTokens.titleMedium.size] as unknown as TemplateStringsArray)};

    /* Elevation */
    --md-sys-elevation-level0: ${css([elevationTokens.level0] as unknown as TemplateStringsArray)};
    --md-sys-elevation-level1: ${css([elevationTokens.level1] as unknown as TemplateStringsArray)};
    --md-sys-elevation-level2: ${css([elevationTokens.level2] as unknown as TemplateStringsArray)};
    --md-sys-elevation-level3: ${css([elevationTokens.level3] as unknown as TemplateStringsArray)};
    --md-sys-elevation-level4: ${css([elevationTokens.level4] as unknown as TemplateStringsArray)};
    --md-sys-elevation-level5: ${css([elevationTokens.level5] as unknown as TemplateStringsArray)};

    /* Shape */
    --md-sys-shape-corner-none: ${css([shapeTokens.cornerNone] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-extra-small: ${css([shapeTokens.cornerExtraSmall] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-small: ${css([shapeTokens.cornerSmall] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-medium: ${css([shapeTokens.cornerMedium] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-large: ${css([shapeTokens.cornerLarge] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-extra-large: ${css([shapeTokens.cornerExtraLarge] as unknown as TemplateStringsArray)};
    --md-sys-shape-corner-full: ${css([shapeTokens.cornerFull] as unknown as TemplateStringsArray)};

    /* Motion */
    --md-sys-motion-easing-standard: ${css([motionTokens.easingStandard] as unknown as TemplateStringsArray)};
    --md-sys-motion-duration-short: ${css([motionTokens.durationShort2] as unknown as TemplateStringsArray)};
    --md-sys-motion-duration-medium: ${css([motionTokens.durationMedium2] as unknown as TemplateStringsArray)};
    --md-sys-motion-duration-long: ${css([motionTokens.durationLong2] as unknown as TemplateStringsArray)};

    /* State Layer Opacities */
    --md-sys-state-hover-opacity: 0.08;
    --md-sys-state-focus-opacity: 0.12;
    --md-sys-state-pressed-opacity: 0.12;
    --md-sys-state-dragged-opacity: 0.16;
  }

  [data-theme='dark'] {
    --md-sys-color-primary: ${css([darkColorScheme.primary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-primary: ${css([darkColorScheme.onPrimary] as unknown as TemplateStringsArray)};
    --md-sys-color-primary-container: ${css([darkColorScheme.primaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-primary-container: ${css([darkColorScheme.onPrimaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-secondary: ${css([darkColorScheme.secondary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-secondary: ${css([darkColorScheme.onSecondary] as unknown as TemplateStringsArray)};
    --md-sys-color-secondary-container: ${css([darkColorScheme.secondaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-secondary-container: ${css([darkColorScheme.onSecondaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-tertiary: ${css([darkColorScheme.tertiary] as unknown as TemplateStringsArray)};
    --md-sys-color-on-tertiary: ${css([darkColorScheme.onTertiary] as unknown as TemplateStringsArray)};
    --md-sys-color-tertiary-container: ${css([darkColorScheme.tertiaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-tertiary-container: ${css([darkColorScheme.onTertiaryContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-error: ${css([darkColorScheme.error] as unknown as TemplateStringsArray)};
    --md-sys-color-on-error: ${css([darkColorScheme.onError] as unknown as TemplateStringsArray)};
    --md-sys-color-error-container: ${css([darkColorScheme.errorContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-on-error-container: ${css([darkColorScheme.onErrorContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-background: ${css([darkColorScheme.background] as unknown as TemplateStringsArray)};
    --md-sys-color-on-background: ${css([darkColorScheme.onBackground] as unknown as TemplateStringsArray)};
    --md-sys-color-surface: ${css([darkColorScheme.surface] as unknown as TemplateStringsArray)};
    --md-sys-color-on-surface: ${css([darkColorScheme.onSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-variant: ${css([darkColorScheme.surfaceVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-on-surface-variant: ${css([darkColorScheme.onSurfaceVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-outline: ${css([darkColorScheme.outline] as unknown as TemplateStringsArray)};
    --md-sys-color-outline-variant: ${css([darkColorScheme.outlineVariant] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-lowest: ${css([darkColorScheme.surfaceContainerLowest] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-low: ${css([darkColorScheme.surfaceContainerLow] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container: ${css([darkColorScheme.surfaceContainer] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-high: ${css([darkColorScheme.surfaceContainerHigh] as unknown as TemplateStringsArray)};
    --md-sys-color-surface-container-highest: ${css([darkColorScheme.surfaceContainerHighest] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-surface: ${css([darkColorScheme.inverseSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-on-surface: ${css([darkColorScheme.inverseOnSurface] as unknown as TemplateStringsArray)};
    --md-sys-color-inverse-primary: ${css([darkColorScheme.inversePrimary] as unknown as TemplateStringsArray)};
  }
`;

export function applyTheme(
  theme: Partial<M3ColorScheme>,
  target: HTMLElement = document.documentElement
): void {
  for (const [key, value] of Object.entries(theme)) {
    if (value) {
      const kebab = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      target.style.setProperty(`--md-sys-color-${kebab}`, value);
    }
  }
}

