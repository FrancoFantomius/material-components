import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    dts({
      include: ['src/**/*.ts'],
      outDir: 'dist',
      rollupTypes: false,
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(import.meta.dirname, 'src/index.ts'),
        'tokens/index': resolve(import.meta.dirname, 'src/tokens/index.ts'),
        'components/button/button': resolve(import.meta.dirname, 'src/components/button/button.ts'),
        'components/icon-button/icon-button': resolve(import.meta.dirname, 'src/components/icon-button/icon-button.ts'),
        'components/fab/fab': resolve(import.meta.dirname, 'src/components/fab/fab.ts'),
        'components/icon/icon': resolve(import.meta.dirname, 'src/components/icon/icon.ts'),
        'components/text-field/text-field': resolve(import.meta.dirname, 'src/components/text-field/text-field.ts'),
        'components/checkbox/checkbox': resolve(import.meta.dirname, 'src/components/checkbox/checkbox.ts'),
        'components/switch/switch': resolve(import.meta.dirname, 'src/components/switch/switch.ts'),
        'components/radio/radio': resolve(import.meta.dirname, 'src/components/radio/radio.ts'),
        'components/card/card': resolve(import.meta.dirname, 'src/components/card/card.ts'),
        'components/dialog/dialog': resolve(import.meta.dirname, 'src/components/dialog/dialog.ts'),
        'components/divider/divider': resolve(import.meta.dirname, 'src/components/divider/divider.ts'),
        'components/progress/progress': resolve(import.meta.dirname, 'src/components/progress/progress.ts'),
        'components/badge/badge': resolve(import.meta.dirname, 'src/components/badge/badge.ts'),
        'components/chip/chip': resolve(import.meta.dirname, 'src/components/chip/chip.ts'),
        'components/tabs/tabs': resolve(import.meta.dirname, 'src/components/tabs/tabs.ts'),
        'components/list/list': resolve(import.meta.dirname, 'src/components/list/list.ts'),
        'components/snackbar/snackbar': resolve(import.meta.dirname, 'src/components/snackbar/snackbar.ts'),
        'components/top-app-bar/top-app-bar': resolve(import.meta.dirname, 'src/components/top-app-bar/top-app-bar.ts'),
        'components/navigation-drawer/navigation-drawer': resolve(import.meta.dirname, 'src/components/navigation-drawer/navigation-drawer.ts'),
        'components/table/table': resolve(import.meta.dirname, 'src/components/table/table.ts'),
        'components/search-bar/search-bar': resolve(import.meta.dirname, 'src/components/search-bar/search-bar.ts'),
        'components/code/code': resolve(import.meta.dirname, 'src/components/code/code.ts'),
        'components/player/player': resolve(import.meta.dirname, 'src/components/player/player.ts'),
        'components/date-picker/date-picker': resolve(import.meta.dirname, 'src/components/date-picker/date-picker.ts'),
        'internal/ripple/ripple': resolve(import.meta.dirname, 'src/internal/ripple/ripple.ts'),
        'internal/focus-ring/focus-ring': resolve(import.meta.dirname, 'src/internal/focus-ring/focus-ring.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        /^lit/,
        /^lit\/.*/,
        /^@lit\/.*/,
      ],
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    sourcemap: true,
    minify: 'esbuild',
    target: 'es2022',
  },
  server: {
    port: 3000,
    open: '/docs/index.html',
  },
});

