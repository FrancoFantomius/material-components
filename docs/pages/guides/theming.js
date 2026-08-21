export default {
  id: 'theming',
  title: 'Theming & Dark Mode',
  icon: 'palette',
  category: 'Guides',
  summary: 'Customize palettes, elevations, and toggle light/dark modes using CSS Custom Properties or TypeScript helpers.',
  contentHtml: `
      <h2>Material Design 3 Token System</h2>
      <p>All components consume standard Material 3 CSS Custom Properties. You can customize them globally on <code>:root</code> or scope them to specific container elements.</p>

      <h2>Global CSS Tokens</h2>
      <pre><code class="language-css">:root {
  --md-sys-color-primary: #6750A4;
  --md-sys-color-on-primary: #FFFFFF;
  --md-sys-color-primary-container: #EADDFF;
  --md-sys-color-on-primary-container: #21005D;
  --md-sys-color-secondary: #625B71;
  --md-sys-color-on-secondary: #FFFFFF;
  --md-sys-color-surface: #FEF7FF;
  --md-sys-color-on-surface: #1D1B20;
  --md-sys-color-outline: #79747E;
  --md-sys-color-error: #B3261E;
}

[data-theme='dark'] {
  --md-sys-color-primary: #D0BCFF;
  --md-sys-color-on-primary: #381E72;
  --md-sys-color-primary-container: #4F378B;
  --md-sys-color-on-primary-container: #EADDFF;
  --md-sys-color-secondary: #CCC2DC;
  --md-sys-color-on-secondary: #332D41;
  --md-sys-color-surface: #141218;
  --md-sys-color-on-surface: #E6E0E9;
  --md-sys-color-outline: #938F99;
  --md-sys-color-error: #F2B8B5;
}</code></pre>

      <h2>TypeScript Theme Helper API</h2>
      <p>The <code>/theme</code> subpath provides helper utilities for dynamic runtime palette assignment:</p>
      <pre><code class="language-typescript">import { applyTheme, darkColorScheme, lightColorScheme } from '@francofantomius/material-components/theme';

// Switch to Dark Color Scheme
applyTheme(darkColorScheme);

// Switch back to Light Color Scheme
applyTheme(lightColorScheme);

// Apply Custom Brand Colors
applyTheme({
  primary: '#006A60',
  onPrimary: '#FFFFFF',
  primaryContainer: '#74F8E5',
  onPrimaryContainer: '#00201C',
});</code></pre>
    `
};

