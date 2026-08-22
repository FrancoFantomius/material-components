# Missing Components

Components defined in the [Material 3 specification](https://m3.material.io/components) that are not yet implemented in this library.

## Actions

### Button groups

> [Spec](https://m3.material.io/components/button-groups/overview)

A new way to organize related buttons (M3 Expressive). Connected, shape-shifting buttons that "bump" and react to each other when pressed. Useful for grouping related actions (e.g., text formatting toolbars) with connected shapes and shared motion.

### Split button

> [Spec](https://m3.material.io/components/split-button/overview)

Pairs a primary action button with a connected trailing menu button that opens a list of related secondary actions. Leverages expressive shape and motion strategies. Example: a "Send" button with a dropdown for "Send later".

### FAB menu

> [Spec](https://m3.material.io/components/fab-menu/overview)

Opens from a Floating Action Button to display multiple related actions as a stack of smaller FABs with labels. Used instead of a single FAB when a screen has several primary actions of equal importance.

## Date & Time

### Date pickers

> [Spec](https://m3.material.io/components/date-pickers/overview)

Let people select a date or a range of dates. Rendered as docked or modal dialogs containing a scrollable calendar grid, with support for date ranges, input fields, and validation.

### Time pickers

> [Spec](https://m3.material.io/components/time-pickers/overview)

Help people select and set a specific time. Available in clock-dial format (12/24 hour) and text input format, presented as docked or modal pickers.

## Loading & Progress

### Loading indicator

> [Spec](https://m3.material.io/components/loading-indicator/overview)

M3 Expressive component showing the progress of a process during a *short* wait time (a few seconds). A contained indicator with animated shapes (e.g., a morphing square) distinct from linear/circular progress indicators, which communicate longer-running processes.

## Navigation

### Navigation bar

> [Spec](https://m3.material.io/components/navigation-bar/overview)

Bottom navigation letting people switch between UI views on smaller devices (compact window widths). Contains 3–5 destinations of equal importance, each with an icon, optional active-indicator pill, and label. Replaces M2's "bottom navigation".

### Navigation rail

> [Spec](https://m3.material.io/components/navigation-rail/overview)

Side navigation for mid-sized devices (medium window widths such as small tablets). A vertical strip of destinations (icon + optional label), typically placed at the start edge; complements navigation drawers on larger screens and navigation bars on compact ones.

## Sheets

### Bottom sheets

> [Spec](https://m3.material.io/components/bottom-sheets/overview)

Show secondary content anchored to the bottom of the screen. Can be standard (part of the layout) or modal (overlaying content with a scrim, dismissible by drag). Commonly used for supplementary tasks like picking an option or showing details without leaving context.

### Side sheets

> [Spec](https://m3.material.io/components/side-sheets/overview)

Show secondary content anchored to the side of the screen (usually the end edge). Standard side sheets sit beside primary content on wide layouts; modal variants overlay with a scrim. Useful for filters, details panes, or settings.

## All other components

### Carousel

> [Spec](https://m3.material.io/components/carousel/overview)

Shows a collection of items that can be scrolled on and off screen. Supports multi-browse (peeking adjacent items), hero (one large item among small ones), and full-width strategies, with item-size motion while scrolling.

### Menus

> [Spec](https://m3.material.io/components/menus/overview)

Display a list of choices on a temporary surface. Appears anchored to a trigger element (button, icon); supports items with icons, trailing icons/shortcuts, dividers, submenus, and keyboard navigation. Distinct from `md-app-drawer` / `md-account-menu`, which are specialized popovers.

### Sliders

> [Spec](https://m3.material.io/components/sliders/overview)

Allow users to make selections from a range of values via a draggable handle along a track. Support continuous and discrete (stepped) values, value labels, icons, and range selection with two handles.

### Toolbars

> [Spec](https://m3.material.io/components/toolbars/overview)

Flexible M3 Expressive component displaying frequently used actions relevant to the current page. Holds controls like buttons and can be floating/docked or paired with a FAB. Differs from top app bars: focused on actions rather than navigation/title.

### Tooltips

> [Spec](https://m3.material.io/components/tooltips/overview)

Display brief labels or messages on hover, focus, or long-press. Plain tooltips show short text labels for icons/buttons; rich tooltips include a title, supporting text, and optional action buttons, and persist until dismissed.
