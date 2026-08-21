# Theming & Dark Mode

All components are built on Material Design 3 tokens mapped to CSS Custom Properties.

## CSS Variables

You can override colors, typography, shapes, and elevations at the `:root` level or scoped to any container element:

```css
:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
}

[data-theme='dark'] {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-surface: #141218;
  --md-sys-color-on-surface: #E6E0E9;
}
```

## TypeScript Theme Helper

Use `applyTheme` to dynamically update color tokens at runtime:

```typescript
import { applyTheme, darkColorScheme, lightColorScheme } from '@francofantomius/material-components/theme';

// Switch to Dark Mode
applyTheme(darkColorScheme);

// Apply custom brand color
applyTheme({
  primary: '#006A60',
  onPrimary: '#FFFFFF',
  primaryContainer: '#74F8E5',
});
```

