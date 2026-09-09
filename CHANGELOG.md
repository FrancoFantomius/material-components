# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-09-09

### Added
- **Dynamic Palette Generator Utility (`generateTheme`, `generateColorScheme`)**:
  - Automatically derives full Material Design 3 (M3) light and dark color palettes, CSS variable records, and complete stylesheets from any single seed color hex string (`#RGB` or `#RRGGBB`).
  - Provides convenience `apply({ dark?: boolean, target?: HTMLElement })` helper to apply dynamic themes at runtime to the document or specific DOM subtrees.
  - Exported from root `@francofantomius/material-components` and `@francofantomius/material-components/theme`.
- **Form-Association (FACE) for Remaining Inputs (`md-slider`, `md-date-picker`, `md-time-picker`)**:
  - **`md-slider`**: Full form participation for single and dual-thumb range sliders with `name-start` and `name-end` (`FormData` support), reactive updates on attribute changes, `min`/`max`/`required` constraint validation, and spec-compliant form reset restoring initial values.
  - **`md-date-picker`**: Form participation for single dates and ranges, adding `name-start` and `name-end` properties (`FormData`), range constraint validation, and form reset restoring configured defaults.
  - **`md-time-picker`**: Added native constraint validation (`required`, `min`, `max`, `error`, `error-text`), 24-hour time range validation, disabled state nullification, and form reset restoring initial values.
  - **`MdFormAssociatedElement`**: Added standard lifecycle hooks `formAssociatedCallback` and `formStateRestoreCallback`.
- **Security Policy (`SECURITY.md`)**:
  - Added repository security policy documenting supported versions and private vulnerability reporting channels.
- **AI Developer Documentation (`llms.txt`)**:
  - Documented the dynamic palette generator API (`generateTheme`, `generateColorScheme`) with TypeScript code examples.
  - Expanded Form Integration (FACE) guide and component reference tables for `md-slider`, `md-date-picker`, and `md-time-picker`.

### Changed
- **Documentation Modernization & Deployment**:
  - Re-architected documentation to Markdown files (`docs/index.md`, `docs/components/`, `docs/guides/`, `docs/docs.config.json`).
  - Streamlined GitHub Pages deployment workflow (`.github/workflows/deploy-docs.yml`) using `FrancoFantomius/docs-gen@v1`.
  - Removed legacy bespoke static site generator scripts (`docs/generate.js`) and bundle configurations (`vite.docs.config.ts`).
- **Build & Tooling Configuration**:
  - Streamlined `package.json` build scripts and removed redundant devDependencies.
  - Configured Dependabot with the `npm` package ecosystem in `.github/dependabot.yml`.

---

## [1.1.2] - 2026-08-22


### Added
- **Search Bar Sizing Variants (`md-search-bar`, `md-search`)**:
  - Added `size` property supporting `'small'`, `'compact'`, `'medium'`, and `'large'` variants (`size="small"` / `size="compact"` provides a 40px height ideal for navbars and compact headers).
  - Added `compact` boolean property/attribute shorthand.
  - Added customizable CSS custom properties: `--md-search-bar-height`, `--md-search-bar-shape`, `--md-search-bar-font-size`, `--md-search-bar-padding`, `--md-search-bar-icon-size`, and `--md-search-bar-icon-button-size`.
- **Top App Bar Integration (`md-top-app-bar`, `md-top-bar`)**: Slotted search bars within top app bars now default to an optimized 44px height (`--md-top-app-bar-search-bar-height`) to align with top app bar rows.

### Changed
- **Documentation Site**: Updated the header search bar in `docs/index.html` to use `size="small"` for a sleek, proportionate navbar presentation.

---

## [1.1.1] - 2026-08-22

### Fixed
- **Search Bar (`md-search-bar`, `md-search`)**: Hidden native browser clear and cancel buttons (`::-webkit-search-cancel-button`, `::-ms-clear`) to prevent duplicate clear icons on Chromium and WebKit browsers.

### Changed
- **Documentation**: Vertically and horizontally centered the search bar within the top header bar and improved active docked transition positioning.

---

## [1.1.0] - 2026-08-22

### Added

#### Components & Features
- **Button Groups (`md-button-group`)**: Connected button group container supporting horizontal and vertical orientations with interactive shape-shifting motion on press.
- **Split Button (`md-split-button`)**: Composite component pairing a primary action button with a connected dropdown menu button for secondary actions.
- **FAB Menu (`md-fab-menu`, `md-fab-menu-item`)**: Speed-dial Floating Action Button menu with animated expandable actions, custom icons, and labels.
- **Date Picker (`md-date-picker`)**: Accessible calendar date picker modal and docked view with month/year navigation, selection modes, and date formatting.
- **Time Picker (`md-time-picker`)**: Interactive clock dial and text input time picker with 12h/24h formats, AM/PM toggle, and hour/minute selectors.
- **Loading Indicator (`md-loading-indicator`)**: M3 Expressive indeterminate loading animations featuring morphing shapes, dots, and bars.
- **Navigation Bar (`md-navigation-bar`, `md-navigation-bar-item`)**: Bottom navigation bar designed for compact window widths with active-indicator pill, badge counters, and labels.
- **Navigation Rail (`md-navigation-rail`, `md-navigation-rail-item`)**: Vertical side navigation rail for medium screens with header, FAB, and destination slots.
- **Segmented Buttons (`md-segmented-button`, `md-segmented-button-set`)**: Single-selection and multi-selection segmented button groups with checkmark feedback and dense layouts.
- **Side Sheets (`md-side-sheet`)**: Standard and modal side sheet containers for supplementary tasks, filters, and settings.
- **Bottom Sheets (`md-bottom-sheet`)**: Modal bottom sheet drawer with drag handle gestures, scrim dismissal, and action layouts.
- **Carousel (`md-carousel`, `md-carousel-item`)**: Multi-browse, hero, and uncontained carousel layouts with smooth touch scrolling and scroll snapping.
- **Menus (`md-menu`, `md-menu-item`)**: Floating popover menus anchored to trigger elements with full keyboard navigation, icons, shortcuts, and submenus.
- **Sliders (`md-slider`)**: Continuous and discrete sliders supporting single-value and range selection with value indicator popups and tick marks.
- **Toolbars (`md-toolbar`)**: Flexible M3 Expressive action toolbar container for organizing frequent page actions.
- **Tooltips (`md-tooltip`)**: Plain and rich tooltips supporting hover and focus triggers, customizable positioning, and timeout management.

#### Testing & Documentation
- **Unit Test Suites**: Added 16 modular unit test suites covering all newly added components (`bottom-sheet`, `button-group`, `carousel`, `date-picker`, `fab-menu`, `loading-indicator`, `menu`, `navigation-bar`, `navigation-rail`, `segmented-button`, `side-sheet`, `slider`, `split-button`, `time-picker`, `toolbar`, `tooltip`).
- **Interactive Documentation**: Added interactive component demo pages and playgrounds for all 16 new components in the documentation site.
- **LLM Specifications**: Expanded `llms.txt` with full API reference, slots, properties, and usage examples for all new components.

### Fixed
- **Tooltip Theming**: Corrected container and text color token mapping for plain and rich tooltips.

---

## [1.0.2] - 2026-08-22

### Fixed
- **Distribution Package**: Included `llms.txt` in the `files` array in `package.json` to ensure AI documentation is bundled with the npm distribution.

---

## [1.0.1] - 2026-08-22

### Added
- **LLM / AI Developer Specification (`llms.txt`)**: Complete API specifications, component hierarchies, properties, events, slots, and ready-to-use patterns for AI coding assistants.
- **CDN Support & Documentation**: Added CDN quick-start guides and ESM links (`esm.sh`, `jsdelivr`, `unpkg`) in `README.md`.
- **Framework Integration Guides**: Expanded usage examples and recipes for React (18 & 19), Next.js, Vue 3, Nuxt, Angular, and Svelte.
- **Modular Test Suites**: Refactored monolithic component tests into dedicated modular test files covering all 21 core component modules.

### Fixed
- **npm Deployment Configuration**: Configured `allowScripts` in `package.json` to streamline automated npm publishing and package installation.
- **TypeScript Typecheck**: Resolved strict TypeScript type issues across `app-drawer`, `code`, and `search-bar`.
- **Vite & Custom Elements Manifest Build**: Fixed build script pipeline and Custom Elements Manifest generation output.

### Changed
- **Documentation (`README.md`)**: Comprehensive documentation overhaul with structured Table of Contents, full Component Index matrix, FACE form validation examples, and theming guide.

---

## [1.0.0] - 2026-08-21

### Added

#### Core & Architecture
- **Lit 3 Foundation**: Built natively with Lit 3, TypeScript, and modern standard Web Components.
- **Granular Subpath Exports**: Support for tree-shakeable individual component imports (e.g. `@francofantomius/material-components/button`) alongside full bundle imports.
- **Form-Associated Custom Elements (FACE)**: Seamless form participation, validation constraint handling, and FormData support for all input components (`md-text-field`, `md-checkbox`, `md-radio`, `md-switch`).
- **Internal State & Interaction Mixins**:
  - `MdRipple`: Material Design 3 interactive ripple state layer.
  - `MdFocusRing`: Accessible high-contrast focus rings for keyboard navigation.
  - `MdBaseComponent`: Unified base class with token inheritance and theming utilities.
- **Custom Elements Manifest**: Generated `custom-elements.json` for IDE autocomplete and documentation tooling.

#### Design Tokens & Theming
- **Material Design 3 (M3) Color System**: Full tokenized color system with tonal palettes, surface tints, containers, and contrast-compliant roles.
- **Dynamic Theming**: Support for light, dark, and custom theme overrides via CSS custom properties and `data-theme` attribute.
- **Elevation Tokens**: Elevation levels 0 through 5 with corresponding box shadows and surface tint opacities.
- **Motion & Typography**: M3 standard easing curves, durations, and typography type scales (Display, Headline, Title, Body, Label).
- **Shape Tokens**: Corner radius scales from `none` (0px) to `full` (9999px).

#### Components
- **Buttons & FABs**:
  - `md-button`: Filled, elevated, tonal, outlined, and text button variants with leading and trailing icon slots.
  - `md-icon-button`: Standard, filled, tonal, and outlined icon buttons with toggle support.
  - `md-fab`: Floating action buttons with small, regular, and large sizes, plus extended FAB styling.
- **Form & Input Controls**:
  - `md-text-field`: Filled and outlined variants, label animations, helper text, error text, prefix/suffix icons, character counters, and native form integration.
  - `md-checkbox`: Controlled and uncontrolled states, indeterminate state, and custom touch targets.
  - `md-switch`: Material 3 toggle switch with icon customization for checked and unchecked states.
  - `md-radio` & `md-radio-group`: Accessible radio buttons with grouped keyboard arrow navigation.
- **Navigation & App Bars**:
  - `md-top-app-bar`: Small, center-aligned, medium, and large variants with navigation slots, action item slots, and scroll-elevation behaviors.
  - `md-navigation-drawer`: Standard and modal navigation drawers with `md-navigation-drawer-item` sub-components, active indicator pill styles, and badge indicators.
  - `md-app-drawer`: Google Apps style grid launcher with customizable apps, drag-and-drop reordering, edit mode, search filter, fullscreen display, and back button support.
  - `md-account-menu`: Profile switcher drawer and menu supporting multiple user accounts, account switching, sign-out actions, management links, fullscreen mode, and back navigation.
  - `md-tabs` & `md-tab`: Primary and secondary tab bars with animated active indicator lines.
- **Data Display & Feedback**:
  - `md-card`: Elevated, filled, and outlined card containers with header, media, content, and action sections.
  - `md-dialog`: Accessible modal dialogs with customizable headline, body, and action buttons.
  - `md-table`: Feature-packed data table with sortable columns, row selection checkboxes, pagination controls, sticky headers, and dense mode.
  - `md-list` & `md-list-item`: Single-line, two-line, and three-line list items supporting leading icons/avatars, headline/supporting text, trailing metadata, and interactive states.
  - `md-progress`: Linear and circular progress indicators supporting determinate, indeterminate, and M3 Expressive wavy indicator modes.
  - `md-badge`: Small dot badges, numeric count badges, and maximum threshold capping (e.g. `99+`).
  - `md-chip`: Assist, filter, input, and suggestion chips with selectable and removable capabilities.
  - `md-snackbar`: Toast notification system with custom duration, action triggers, and dismiss options.
  - `md-search-bar`: Expandable search bar and search view with suggestion slots, trailing icons, clear button, and mobile full-screen transitions.
- **Media & Developer Tools**:
  - `md-player`: Media player supporting video and audio playback (`md-video-player`, `md-audio-player`), custom play/pause/seek controls, volume slider, fullscreen toggle, time displays, and keyboard accessibility.
  - `md-code`: Code block viewer with built-in syntax highlighting, copy-to-clipboard button, line numbers, and error / lint annotation support.
  - `md-icon`: Material Symbols icon renderer supporting font-based and custom SVG icons.

#### Documentation & Testing
- Comprehensive documentation site with live interactive code examples, component playgrounds, and guides for framework integration (React, Vue, Angular, Svelte, Solid), form handling, and theming.
- Automated unit and integration test suite powered by Vitest and Happy-DOM.
