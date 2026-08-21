import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.BASE_PATH || './',
  root: resolve(import.meta.dirname, 'docs'),
  build: {
    outDir: resolve(import.meta.dirname, 'dist-docs'),
    emptyOutDir: true,
    target: 'es2022',
  },
});

