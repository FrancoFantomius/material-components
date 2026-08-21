import '../src/index.js';
import { applyTheme, darkColorScheme, lightColorScheme } from '../src/tokens/index.js';
import { GUIDES, COMPONENTS, CATEGORIES } from './docs-data.js';

// --- HTML Escaping Helper ---
function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// --- Toast & Notification Helper ---
export function showToast(message) {
  const snackbar = document.getElementById('global-snackbar');
  if (snackbar) {
    snackbar.message = message;
    snackbar.show();
  }
}

// --- Clipboard Copy Helper ---
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showToast('Copied to clipboard!');
  }).catch(() => {
    showToast('Failed to copy to clipboard');
  });
}

// --- Color Palettes & Theming ---
export const PALETTES = [
  { id: 'purple', name: 'Purple (Default)', hex: '#6750A4' },
  { id: 'violet', name: 'Violet', hex: '#7E57C2' },
  { id: 'indigo', name: 'Indigo', hex: '#3F51B5' },
  { id: 'blue', name: 'Blue', hex: '#1976D2' },
  { id: 'sky', name: 'Sky', hex: '#0288D1' },
  { id: 'cyan', name: 'Cyan', hex: '#00838F' },
  { id: 'teal', name: 'Teal', hex: '#00796B' },
  { id: 'green', name: 'Green', hex: '#2E7D32' },
  { id: 'light-green', name: 'Light Green', hex: '#558B2F' },
  { id: 'lime', name: 'Lime', hex: '#827717' },
  { id: 'yellow', name: 'Yellow', hex: '#F57F17' },
  { id: 'orange', name: 'Orange', hex: '#E65100' },
  { id: 'deep-orange', name: 'Deep Orange', hex: '#D84315' },
  { id: 'red', name: 'Red', hex: '#B3261E' },
  { id: 'pink', name: 'Pink', hex: '#C2185B' },
  { id: 'slate', name: 'Slate', hex: '#455A64' },
];

function hexToHsl(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  let r = (num >> 16) / 255;
  let g = ((num >> 8) & 255) / 255;
  let b = (num & 255) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function hslToHex(h, s, l) {
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;
  const a = s * Math.min(l, 1 - l);
  const f = n => {
    const k = (n + (h % 360) / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generateColorScheme(paletteId, isDark) {
  if (paletteId === 'purple') {
    return isDark ? darkColorScheme : lightColorScheme;
  }
  const palette = PALETTES.find(p => p.id === paletteId) || PALETTES[0];
  const [h, s] = hexToHsl(palette.hex);

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
      scrim: '#000000',
      inverseSurface: '#E6E0E9',
      inverseOnSurface: '#313033',
      inversePrimary: palette.hex,
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
    primary: palette.hex,
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
    scrim: '#000000',
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

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToLab(r, g, b) {
  // Convert RGB to sRGB
  r = r / 255;
  g = g / 255;
  b = b / 255;

  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  // Convert sRGB to XYZ (D65 illuminant)
  let x = (r * 0.4124564 + g * 0.3575761 + b * 0.1804375) / 0.95047;
  let y = (r * 0.2126729 + g * 0.7151522 + b * 0.0721750) / 1.00000;
  let z = (r * 0.0193339 + g * 0.1191920 + b * 0.9503041) / 1.08883;

  const f = t => (t > 0.008856 ? Math.cbrt(t) : (7.787 * t) + (16 / 116));
  x = f(x);
  y = f(y);
  z = f(z);

  return [
    (116 * y) - 16,     // L
    500 * (x - y),       // a
    200 * (y - z)        // b
  ];
}

function colorDistance(rgb1, rgb2) {
  const lab1 = rgbToLab(rgb1[0], rgb1[1], rgb1[2]);
  const lab2 = rgbToLab(rgb2[0], rgb2[1], rgb2[2]);
  return Math.sqrt(
    Math.pow(lab1[0] - lab2[0], 2) +
    Math.pow(lab1[1] - lab2[1], 2) +
    Math.pow(lab1[2] - lab2[2], 2)
  );
}

function getSystemAccentColor() {
  if (typeof document === 'undefined') return null;
  try {
    const el = document.createElement('div');
    el.style.color = 'AccentColor';
    el.style.display = 'none';
    document.documentElement.appendChild(el);
    const computed = getComputedStyle(el).color;
    document.documentElement.removeChild(el);

    if (!computed || computed === 'transparent') return null;
    const match = computed.match(/\d+/g);
    if (!match || match.length < 3) return null;

    const r = parseInt(match[0], 10);
    const g = parseInt(match[1], 10);
    const b = parseInt(match[2], 10);

    // Filter out invalid / monochrome defaults
    if ((r === 0 && g === 0 && b === 0) || (r === 255 && g === 255 && b === 255)) {
      return null;
    }

    return [r, g, b];
  } catch (e) {
    return null;
  }
}

function findNearestPalette(rgb) {
  if (!rgb) return 'purple';
  let minDistance = Infinity;
  let nearestId = 'purple';

  for (const palette of PALETTES) {
    const paletteRgb = hexToRgb(palette.hex);
    const dist = colorDistance(rgb, paletteRgb);
    if (dist < minDistance) {
      minDistance = dist;
      nearestId = palette.id;
    }
  }

  return nearestId;
}

function getInitialPalette() {
  const saved = localStorage.getItem('palette');
  if (saved && PALETTES.some(p => p.id === saved)) {
    return saved;
  }

  const systemRgb = getSystemAccentColor();
  if (systemRgb) {
    return findNearestPalette(systemRgb);
  }

  return 'purple';
}

const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIcon = document.getElementById('theme-icon');

function getInitialTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
  return 'system';
}

let currentThemeSetting = getInitialTheme(); // 'system' | 'light' | 'dark'
let currentPalette = getInitialPalette();

function isDarkModeActive() {
  if (currentThemeSetting === 'dark') return true;
  if (currentThemeSetting === 'light') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyCurrentThemeAndPalette() {
  const isDark = isDarkModeActive();
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }

  if (themeIcon) {
    if (currentThemeSetting === 'system') {
      themeIcon.name = 'brightness_auto';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', `Theme: System (${isDark ? 'Dark' : 'Light'}) - Click for Light`);
    } else if (currentThemeSetting === 'light') {
      themeIcon.name = 'light_mode';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Theme: Light - Click for Dark');
    } else {
      themeIcon.name = 'dark_mode';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Theme: Dark - Click for System auto');
    }
  }

  const scheme = generateColorScheme(currentPalette, isDark);
  applyTheme(scheme);
  localStorage.setItem('theme', currentThemeSetting);
  updatePaletteMenuSelection();
}

applyCurrentThemeAndPalette();

// Listen for device / system dark mode changes when in 'system' mode
if (window.matchMedia) {
  const colorSchemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const handleMediaChange = () => {
    if (currentThemeSetting === 'system') {
      applyCurrentThemeAndPalette();
    }
  };
  if (colorSchemeMedia.addEventListener) {
    colorSchemeMedia.addEventListener('change', handleMediaChange);
  } else if (colorSchemeMedia.addListener) {
    colorSchemeMedia.addListener(handleMediaChange);
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    if (currentThemeSetting === 'system') {
      currentThemeSetting = 'light';
      showToast('Theme: Light mode');
    } else if (currentThemeSetting === 'light') {
      currentThemeSetting = 'dark';
      showToast('Theme: Dark mode');
    } else {
      currentThemeSetting = 'system';
      const isDark = isDarkModeActive();
      showToast(`Theme: Synced with device (${isDark ? 'Dark' : 'Light'})`);
    }
    applyCurrentThemeAndPalette();
  });
}

function setupPalettePicker() {
  const pickerBtn = document.getElementById('palette-picker-btn');
  const paletteMenu = document.getElementById('palette-menu');
  const paletteGrid = document.getElementById('palette-grid');
  const resetBtn = document.getElementById('reset-palette-btn');

  if (!pickerBtn || !paletteMenu || !paletteGrid) return;

  paletteGrid.innerHTML = PALETTES.map(p => `
    <button
      type="button"
      class="palette-swatch-btn ${p.id === currentPalette ? 'selected' : ''}"
      data-palette-id="${p.id}"
      style="background-color: ${p.hex};"
      title="${escapeHtml(p.name)}"
      aria-label="${escapeHtml(p.name)}"
    >
      <md-icon name="check" class="swatch-check"></md-icon>
    </button>
  `).join('');

  paletteGrid.querySelectorAll('.palette-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-palette-id');
      if (id) {
        currentPalette = id;
        localStorage.setItem('palette', currentPalette);
        applyCurrentThemeAndPalette();
        const paletteObj = PALETTES.find(p => p.id === id);
        showToast(`Color palette changed to ${paletteObj?.name || id}`);
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem('palette');
      currentPalette = getInitialPalette();
      applyCurrentThemeAndPalette();
      const paletteObj = PALETTES.find(p => p.id === currentPalette);
      showToast(`Color palette reset to auto (${paletteObj?.name || currentPalette})`);
    });
  }

  pickerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isHidden = paletteMenu.hasAttribute('hidden');
    if (isHidden) {
      paletteMenu.removeAttribute('hidden');
    } else {
      paletteMenu.setAttribute('hidden', '');
    }
  });

  document.addEventListener('click', (e) => {
    if (!paletteMenu.hasAttribute('hidden') && !paletteMenu.contains(e.target) && !pickerBtn.contains(e.target)) {
      paletteMenu.setAttribute('hidden', '');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !paletteMenu.hasAttribute('hidden')) {
      paletteMenu.setAttribute('hidden', '');
    }
  });
}

function updatePaletteMenuSelection() {
  const paletteGrid = document.getElementById('palette-grid');
  if (!paletteGrid) return;
  paletteGrid.querySelectorAll('.palette-swatch-btn').forEach(btn => {
    const isSelected = btn.getAttribute('data-palette-id') === currentPalette;
    if (isSelected) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });
}

// --- Navigation Drawer Setup & Helpers ---
const docsDrawer = document.getElementById('docs-drawer');
const menuBtn = document.getElementById('menu-nav-btn');

if (menuBtn && docsDrawer) {
  menuBtn.addEventListener('click', () => {
    docsDrawer.toggle();
  });
}

function renderDrawerItems() {
  if (!docsDrawer) return;

  let html = '';
  CATEGORIES.forEach(cat => {
    if (!cat.items || cat.items.length === 0) return;
    html += `
      <div class="drawer-section-title">${escapeHtml(cat.name)}</div>
      ${cat.items.map(item => {
        const badgeAttr = item.tag ? `badge="&lt;${escapeHtml(item.tag.replace('md-', ''))}&gt;"` : '';
        const iconAttr = item.icon ? `icon="${escapeHtml(item.icon)}"` : '';
        return `
          <md-navigation-drawer-item
            href="${item.path}"
            label="${escapeHtml(item.title)}"
            data-route-id="${item.id}"
            ${iconAttr}
            ${badgeAttr}
          ></md-navigation-drawer-item>
        `;
      }).join('')}
    `;
  });

  docsDrawer.innerHTML = html;

  // Add click listener to close drawer on mobile navigation
  docsDrawer.querySelectorAll('md-navigation-drawer-item').forEach(item => {
    item.addEventListener('click', () => {
      if (window.innerWidth <= 960) {
        docsDrawer.close();
      }
    });
  });
}

function updateActiveDrawerItem(routeId) {
  if (!docsDrawer) return;
  const items = docsDrawer.querySelectorAll('md-navigation-drawer-item');
  items.forEach(item => {
    const itemRouteId = item.getAttribute('data-route-id');
    const isActive = itemRouteId === routeId;
    if (isActive) {
      item.setAttribute('active', '');
    } else {
      item.removeAttribute('active');
    }
  });
}

// --- Quick Search Setup ---
function setupSearch() {
  const searchBar = document.getElementById('docs-search-bar');
  if (!searchBar) return;

  const allSearchItems = [
    {
      id: 'index',
      label: 'Home',
      value: 'Home',
      supportingText: 'Overview and introduction to Material Components',
      trailingSupportingText: 'Overview',
      icon: 'home',
      path: '#/',
      category: 'Overview'
    },
    ...COMPONENTS.map(c => ({
      id: `components/${c.id}`,
      label: c.title,
      value: c.title,
      supportingText: c.description,
      trailingSupportingText: `<${c.tag}>`,
      icon: 'widgets',
      path: `#/components/${c.id}`,
      category: c.category
    })),
    ...GUIDES.map(g => ({
      id: `guide/${g.id}`,
      label: g.title,
      value: g.title,
      supportingText: g.summary,
      trailingSupportingText: g.category,
      icon: 'menu_book',
      path: `#/guide/${g.id}`,
      category: g.category
    }))
  ];

  function getFilteredSuggestions(query) {
    const q = (query || '').trim().toLowerCase();
    if (!q) {
      return allSearchItems;
    }

    const matched = allSearchItems.filter(item => {
      const label = (item.label || '').toLowerCase();
      const desc = (item.supportingText || '').toLowerCase();
      const tag = (item.trailingSupportingText || '').toLowerCase();
      const cat = (item.category || '').toLowerCase();
      const id = (item.id || '').toLowerCase();

      return label.includes(q) || desc.includes(q) || tag.includes(q) || cat.includes(q) || id.includes(q);
    });

    if (matched.length === 0) {
      return [
        {
          label: 'No results found',
          supportingText: `No documentation matching "${query}"`,
          icon: 'search_off',
          isNoResult: true
        }
      ];
    }

    return matched;
  }

  // Populate initial suggestions
  searchBar.suggestions = allSearchItems;

  function handleNavigate(item) {
    if (!item || item.isNoResult || !item.path) return;
    window.location.hash = item.path;
    searchBar.value = '';
    searchBar.suggestions = allSearchItems;
    searchBar.close();
    if (window.innerWidth <= 960 && docsDrawer) {
      docsDrawer.close();
    }
  }

  // Handle typing in search bar
  searchBar.addEventListener('input', (e) => {
    const query = e.detail?.value ?? searchBar.value ?? '';
    searchBar.suggestions = getFilteredSuggestions(query);
  });

  // Handle suggestion selection
  searchBar.addEventListener('suggestion-select', (e) => {
    const item = e.detail?.suggestion;
    handleNavigate(item);
  });

  // Handle search submission (Enter key)
  searchBar.addEventListener('search', (e) => {
    const item = e.detail?.suggestion;
    if (item && !item.isNoResult && item.path) {
      handleNavigate(item);
    } else {
      const query = (e.detail?.value ?? searchBar.value ?? '').trim().toLowerCase();
      if (query) {
        const matches = getFilteredSuggestions(query).filter(m => !m.isNoResult);
        if (matches.length > 0) {
          handleNavigate(matches[0]);
        }
      }
    }
  });

  // Handle clear button
  searchBar.addEventListener('clear', () => {
    searchBar.suggestions = allSearchItems;
  });

  // Global keyboard shortcut to focus search (Ctrl+K, Cmd+K, /)
  document.addEventListener('keydown', (e) => {
    if (
      (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) &&
      document.activeElement !== searchBar &&
      !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)
    ) {
      e.preventDefault();
      searchBar.show();
    }
  });
}

// --- View Renderers ---

function renderHomePage() {
  const allComponentsCount = COMPONENTS.length;

  return `
    <div class="hero-section">
      <div class="hero-badge">Material Design 3 &bull; Web Components</div>
      <h1 class="hero-title">Material Components</h1>
      <p class="hero-subtitle">
        A modern, accessible, and lightweight Web Component library built with <strong>Lit</strong> and <strong>Material Design 3</strong> specifications.
      </p>
      
      <div class="hero-actions">
        <md-button variant="filled" icon="rocket_launch" href="#/guide/getting-started">
          Get Started
        </md-button>
        <md-button variant="outlined" icon="widgets" href="#/components/button">
          Browse Components (${allComponentsCount})
        </md-button>
      </div>
    </div>

    <section class="docs-section">
      <h2>Quick Install</h2>
      <md-code language="bash" label="Terminal" code="npm install @francofantomius/material-components lit"></md-code>
    </section>

    <section class="docs-section">
      <h2>Why Material Components?</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon"><md-icon name="palette"></md-icon></div>
          <h3>Material Design 3 Tokens</h3>
          <p>Full design tokens for colors, elevation, state layers, shape, and typography. Instant Dark & Light mode toggle.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><md-icon name="dynamic_form"></md-icon></div>
          <h3>Form-Associated Elements (FACE)</h3>
          <p>Text fields, checkboxes, radios, and switches integrate natively with HTML5 &lt;form&gt;, validation, and FormData.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><md-icon name="speed"></md-icon></div>
          <h3>Tree-Shakeable & Lightweight</h3>
          <p>Import subpaths like <code>@francofantomius/material-components/button</code> to load only what you use.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><md-icon name="accessibility_new"></md-icon></div>
          <h3>Accessible by Design</h3>
          <p>Engineered with WCAG 2.1 AA focus rings, full keyboard navigation, and proper ARIA semantics.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><md-icon name="integration_instructions"></md-icon></div>
          <h3>Framework Agnostic</h3>
          <p>Runs seamlessly across React, Vue, Angular, Svelte, Solid, or vanilla HTML/JavaScript.</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon"><md-icon name="code"></md-icon></div>
          <h3>Type Safe & Custom Elements Manifest</h3>
          <p>Complete TypeScript declarations and <code>custom-elements.json</code> for IDE autocomplete.</p>
        </div>
      </div>
    </section>

    <section class="docs-section">
      <h2>Component Showcase</h2>
      <div class="components-grid">
        ${COMPONENTS.map(c => `
          <a href="#/components/${c.id}" class="component-card">
            <div class="component-card-header">
              <span class="component-card-title">${escapeHtml(c.title)}</span>
              <span class="component-card-category">${escapeHtml(c.category)}</span>
            </div>
            <div class="component-card-tag">&lt;${escapeHtml(c.tag)}&gt;</div>
            <p class="component-card-desc">${escapeHtml(c.description)}</p>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function renderGuidePage(guide) {
  return `
    <nav class="docs-breadcrumb" aria-label="Breadcrumb">
      <a href="#/">Docs</a>
      <span>/</span>
      <span>Guides</span>
      <span>/</span>
      <span>${escapeHtml(guide.title)}</span>
    </nav>

    <header class="doc-header">
      <span class="category-chip">${escapeHtml(guide.category)}</span>
      <h1>${escapeHtml(guide.title)}</h1>
      <p class="doc-lead">${escapeHtml(guide.summary)}</p>
    </header>

    <article class="doc-article">
      ${guide.contentHtml}
    </article>
  `;
}

function renderComponentPage(comp) {
  // Properties Table
  let propsHtml = '';
  if (comp.properties && comp.properties.length > 0) {
    propsHtml += `
    <section class="docs-section">
      <h2>Properties &amp; Attributes</h2>
      <div class="table-container">
        <table class="api-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${comp.properties.map(p => `
              <tr>
                <td><code>${escapeHtml(p.name)}</code></td>
                <td><code class="type-code">${escapeHtml(p.type)}</code></td>
                <td><code>${escapeHtml(p.default)}</code></td>
                <td>${escapeHtml(p.description)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
  }

  // Sub-component Properties Table
  if (comp.subComponentProperties && comp.subComponentProperties.length > 0) {
    comp.subComponentProperties.forEach(sub => {
      propsHtml += `
      <section class="docs-section">
        <h2>&lt;${escapeHtml(sub.name)}&gt; Properties</h2>
        <div class="table-container">
          <table class="api-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${sub.properties.map(p => `
                <tr>
                  <td><code>${escapeHtml(p.name)}</code></td>
                  <td><code class="type-code">${escapeHtml(p.type)}</code></td>
                  <td><code>${escapeHtml(p.default)}</code></td>
                  <td>${escapeHtml(p.description)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>`;
    });
  }

  // Slots Table
  let slotsHtml = '';
  if (comp.slots && comp.slots.length > 0) {
    slotsHtml = `
    <section class="docs-section">
      <h2>Slots</h2>
      <div class="table-container">
        <table class="api-table">
          <thead>
            <tr>
              <th>Slot Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${comp.slots.map(s => `
              <tr>
                <td><code>${escapeHtml(s.name || '(default)')}</code></td>
                <td>${escapeHtml(s.description)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
  }

  // Events Table
  let eventsHtml = '';
  if (comp.events && comp.events.length > 0) {
    eventsHtml = `
    <section class="docs-section">
      <h2>Events</h2>
      <div class="table-container">
        <table class="api-table">
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Detail</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${comp.events.map(e => `
              <tr>
                <td><code>${escapeHtml(e.name)}</code></td>
                <td><code>${escapeHtml(e.detail || 'Event')}</code></td>
                <td>${escapeHtml(e.description)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
  }

  // CSS Custom Properties Table
  let cssVarsHtml = '';
  if (comp.cssVars && comp.cssVars.length > 0) {
    cssVarsHtml = `
    <section class="docs-section">
      <h2>CSS Custom Properties</h2>
      <div class="table-container">
        <table class="api-table">
          <thead>
            <tr>
              <th>Variable</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            ${comp.cssVars.map(v => `
              <tr>
                <td><code>${escapeHtml(v.name)}</code></td>
                <td><code>${escapeHtml(v.default)}</code></td>
                <td>${escapeHtml(v.description)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </section>`;
  }

  // Examples Section
  let examplesHtml = '';
  if (comp.examples && comp.examples.length > 0) {
    examplesHtml = `
    <section class="docs-section">
      <h2>Examples</h2>
      ${comp.examples.map(ex => `
        <div class="example-box">
          <h3>${escapeHtml(ex.title)}</h3>
          ${ex.description ? `<p class="example-desc">${escapeHtml(ex.description)}</p>` : ''}
          <div class="demo-preview">
            ${ex.html}
          </div>
          <md-code language="html" label="HTML Example" code="${escapeHtml(ex.html)}"></md-code>
        </div>
      `).join('\n')}
    </section>`;
  }

  return `
    <nav class="docs-breadcrumb" aria-label="Breadcrumb">
      <a href="#/">Docs</a>
      <span>/</span>
      <span>Components</span>
      <span>/</span>
      <span>${escapeHtml(comp.title)}</span>
    </nav>

    <header class="doc-header">
      <div class="doc-header-top">
        <span class="category-chip">${escapeHtml(comp.category)}</span>
        <span class="tag-chip">&lt;${escapeHtml(comp.tag)}&gt;</span>
      </div>
      <h1>${escapeHtml(comp.title)}</h1>
      <p class="doc-lead">${escapeHtml(comp.description)}</p>
    </header>

    <section class="docs-section">
      <h2>Import</h2>
      <md-code language="javascript" label="Import" code="import '${escapeHtml(comp.subpath)}';"></md-code>
    </section>

    ${examplesHtml}
    ${propsHtml}
    ${slotsHtml}
    ${eventsHtml}
    ${cssVarsHtml}
  `;
}

function renderNotFoundPage() {
  return `
    <div class="not-found-box">
      <h1 class="not-found-title">404</h1>
      <p class="not-found-desc">The requested documentation page could not be found.</p>
      <md-button variant="filled" icon="home" href="#/">Return Home</md-button>
    </div>
  `;
}

// --- Post-Render Setup (Copy Buttons & Dynamic Component Demos) ---
function attachPostRenderHandlers() {
  // Convert any static pre/code elements (e.g. from guides) to md-code web components
  document.querySelectorAll('.docs-content pre').forEach(pre => {
    if (pre.closest('md-code') || pre.closest('.code-container')) return;
    const codeEl = pre.querySelector('code');
    const codeText = codeEl ? (codeEl.textContent || '') : (pre.textContent || '');
    const langClass = Array.from(codeEl?.classList || []).find(c => c.startsWith('language-'));
    const lang = langClass ? langClass.replace('language-', '') : 'plaintext';

    const mdCode = document.createElement('md-code');
    mdCode.language = lang;
    mdCode.code = codeText;
    pre.parentNode.replaceChild(mdCode, pre);
  });

  // Setup copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-copy-id');
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) copyToClipboard(el.textContent || '');
      } else {
        const pre = btn.closest('.code-wrapper')?.querySelector('pre') || btn.parentElement?.querySelector('pre') || btn.parentElement?.querySelector('code');
        if (pre) copyToClipboard(pre.textContent || '');
      }
    });
  });

  // Demo: Table Component
  const demoTable = document.getElementById('demo-docs-table') || document.getElementById('demo-table');
  if (demoTable) {
    demoTable.columns = [
      { key: 'name', label: 'Dessert (100g serving)', sortable: true },
      { key: 'calories', label: 'Calories', numeric: true, sortable: true },
      { key: 'fat', label: 'Fat (g)', numeric: true, sortable: true },
      { key: 'carbs', label: 'Carbs (g)', numeric: true, sortable: true },
      { key: 'protein', label: 'Protein (g)', numeric: true, sortable: true },
    ];
    demoTable.rows = [
      { name: 'Frozen yogurt', calories: 159, fat: 6.0, carbs: 24, protein: 4.0 },
      { name: 'Ice cream sandwich', calories: 237, fat: 9.0, carbs: 37, protein: 4.3 },
      { name: 'Eclair', calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
      { name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
      { name: 'Gingerbread', calories: 356, fat: 16.0, carbs: 49, protein: 3.9 },
    ];
    demoTable.selectedRows = [demoTable.rows[1]];
  }

  // Demo: Dialog Component
  const demoDialog = document.getElementById('demo-doc-dialog') || document.getElementById('demo-dialog');
  const openDialogBtn = document.getElementById('open-demo-dialog-btn') || document.getElementById('open-dialog-btn');
  const cancelDialogBtn = document.getElementById('cancel-demo-dialog-btn') || document.getElementById('close-dialog-btn');
  const confirmDialogBtn = document.getElementById('confirm-demo-dialog-btn');

  openDialogBtn?.addEventListener('click', () => {
    demoDialog?.show();
  });
  cancelDialogBtn?.addEventListener('click', () => {
    demoDialog?.close('cancel');
  });
  confirmDialogBtn?.addEventListener('click', () => {
    demoDialog?.close('confirm');
  });

  // Demo: Snackbar Component
  const demoSnackbar = document.getElementById('demo-doc-toast') || document.getElementById('demo-snackbar');
  const openSnackbarBtn = document.getElementById('show-demo-toast-btn') || document.getElementById('open-snackbar-btn');
  openSnackbarBtn?.addEventListener('click', () => {
    demoSnackbar?.show();
  });

  // Demo: Navigation Drawer Component
  const demoNavDrawer = document.getElementById('demo-doc-drawer') || document.getElementById('demo-nav-drawer');
  document.getElementById('open-demo-drawer-btn')?.addEventListener('click', () => {
    demoNavDrawer?.toggle();
  });
  document.getElementById('open-nav-drawer-btn')?.addEventListener('click', () => {
    demoNavDrawer?.toggle();
  });

  // Demo: Search Bar Component
  const demoSearchBar = document.getElementById('demo-search-bar');
  if (demoSearchBar) {
    demoSearchBar.suggestions = [
      { id: '1', label: 'Paris, France', supportingText: 'City of lights & romance', icon: 'location_on' },
      { id: '2', label: 'Tokyo, Japan', supportingText: 'Vibrant metropolis & cuisine', icon: 'location_on' },
      { id: '3', label: 'New York City, USA', supportingText: 'The city that never sleeps', icon: 'location_on' },
      { id: '4', label: 'Rome, Italy', supportingText: 'Ancient architecture & history', icon: 'location_on' },
      { id: '5', label: 'Sydney, Australia', supportingText: 'Harbor, beaches & opera', icon: 'location_on' }
    ];
    demoSearchBar.addEventListener('search', (e) => {
      showToast(`Searching for: ${e.detail.value}`);
    });
    demoSearchBar.addEventListener('suggestion-select', (e) => {
      showToast(`Selected: ${e.detail.label || e.detail.value}`);
    });
  }

  // Demo: Account Menu Component
  const demoAccountMenu = document.getElementById('demo-account-menu');
  if (demoAccountMenu) {
    demoAccountMenu.addEventListener('account-select', (e) => {
      showToast(`Selected account: ${e.detail.name || e.detail.email}`);
    });
    demoAccountMenu.addEventListener('manage-click', () => {
      showToast('Manage Account clicked');
    });
    demoAccountMenu.addEventListener('sign-out', () => {
      showToast('Sign out clicked');
    });
  }

  // Demo: App Drawer Component
  const demoAppDrawer = document.getElementById('demo-app-drawer');
  if (demoAppDrawer) {
    demoAppDrawer.addEventListener('item-click', (e) => {
      showToast(`Selected app: ${e.detail.label}`);
    });
  }
}

// --- SPA Router ---
function navigate() {
  const contentEl = document.getElementById('docs-content');
  if (!contentEl) return;

  let hash = window.location.hash || '#/';

  // Normalize path (strip leading '#', trim slashes, strip .html extension if present)
  let cleanRoute = hash.replace(/^#\/?/, '').replace(/\.html$/, '');

  let routeId = 'index';
  let renderedHtml = '';
  let pageTitle = 'Material Components';

  if (!cleanRoute || cleanRoute === 'index') {
    routeId = 'index';
    renderedHtml = renderHomePage();
    pageTitle = 'Home - Material Components';
  } else if (cleanRoute.startsWith('guide/')) {
    const guideId = cleanRoute.replace('guide/', '');
    const guide = GUIDES.find(g => g.id === guideId);
    if (guide) {
      routeId = `guide/${guide.id}`;
      renderedHtml = renderGuidePage(guide);
      pageTitle = `${guide.title} - Material Components`;
    } else {
      routeId = '404';
      renderedHtml = renderNotFoundPage();
      pageTitle = 'Page Not Found - Material Components';
    }
  } else if (cleanRoute.startsWith('components/')) {
    const compId = cleanRoute.replace('components/', '');
    const comp = COMPONENTS.find(c => c.id === compId);
    if (comp) {
      routeId = `components/${comp.id}`;
      renderedHtml = renderComponentPage(comp);
      pageTitle = `${comp.title} - Material Components`;
    } else {
      routeId = '404';
      renderedHtml = renderNotFoundPage();
      pageTitle = 'Page Not Found - Material Components';
    }
  } else {
    routeId = '404';
    renderedHtml = renderNotFoundPage();
    pageTitle = 'Page Not Found - Material Components';
  }

  contentEl.innerHTML = renderedHtml;
  document.title = pageTitle;
  updateActiveDrawerItem(routeId);

  // Reset scroll
  contentEl.scrollTop = 0;
  window.scrollTo(0, 0);

  // Re-attach interactive event listeners
  attachPostRenderHandlers();
}

// --- App Initialization ---
function init() {
  renderDrawerItems();
  setupSearch();
  setupPalettePicker();
  navigate();

  window.addEventListener('hashchange', navigate);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}


