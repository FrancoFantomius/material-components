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
        index: resolve(__dirname, 'src/index.ts'),
        'tokens/index': resolve(__dirname, 'src/tokens/index.ts'),
        'components/button/button': resolve(__dirname, 'src/components/button/button.ts'),
        'components/icon-button/icon-button': resolve(__dirname, 'src/components/icon-button/icon-button.ts'),
        'components/fab/fab': resolve(__dirname, 'src/components/fab/fab.ts'),
        'components/icon/icon': resolve(__dirname, 'src/components/icon/icon.ts'),
        'components/text-field/text-field': resolve(__dirname, 'src/components/text-field/text-field.ts'),
        'components/checkbox/checkbox': resolve(__dirname, 'src/components/checkbox/checkbox.ts'),
        'components/switch/switch': resolve(__dirname, 'src/components/switch/switch.ts'),
        'components/radio/radio': resolve(__dirname, 'src/components/radio/radio.ts'),
        'components/card/card': resolve(__dirname, 'src/components/card/card.ts'),
        'components/dialog/dialog': resolve(__dirname, 'src/components/dialog/dialog.ts'),
        'components/divider/divider': resolve(__dirname, 'src/components/divider/divider.ts'),
        'components/progress/progress': resolve(__dirname, 'src/components/progress/progress.ts'),
        'components/badge/badge': resolve(__dirname, 'src/components/badge/badge.ts'),
        'components/chip/chip': resolve(__dirname, 'src/components/chip/chip.ts'),
        'components/tabs/tabs': resolve(__dirname, 'src/components/tabs/tabs.ts'),
        'components/list/list': resolve(__dirname, 'src/components/list/list.ts'),
        'components/snackbar/snackbar': resolve(__dirname, 'src/components/snackbar/snackbar.ts'),
        'internal/ripple/ripple': resolve(__dirname, 'src/internal/ripple/ripple.ts'),
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

