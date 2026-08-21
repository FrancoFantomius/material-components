import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: process.env.BASE_PATH || './',
  root: resolve(__dirname, 'docs'),
  build: {
    outDir: resolve(__dirname, 'dist-docs'),
    emptyOutDir: true,
    target: 'es2022',
  },
});

