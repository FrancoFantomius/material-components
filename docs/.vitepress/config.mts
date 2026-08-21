import { defineConfig } from 'vitepress';

export default defineConfig({
  base: process.env.BASE_PATH || '/material-components/',
  title: 'Material Web Components',
  description: 'Material Design 3 Web Components built with Lit',
  head: [
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap' }],
  ],
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('md-'),
      },
    },
  },
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Components', link: '/components/button' },
      { text: 'Theming', link: '/guide/theming' },
      { text: 'GitHub', link: 'https://github.com/francofantomius/material-components' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Theming & Dark Mode', link: '/guide/theming' },
            { text: 'Form Integration', link: '/guide/form-integration' },
            { text: 'Framework Usage', link: '/guide/frameworks' },
          ],
        },
      ],
      '/components/': [
        {
          text: 'Actions',
          items: [
            { text: 'Button', link: '/components/button' },
            { text: 'Icon Button', link: '/components/icon-button' },
            { text: 'FAB', link: '/components/fab' },
            { text: 'Icon', link: '/components/icon' },
          ],
        },
        {
          text: 'Inputs & Selection',
          items: [
            { text: 'Text Field', link: '/components/text-field' },
            { text: 'Checkbox', link: '/components/checkbox' },
            { text: 'Switch', link: '/components/switch' },
            { text: 'Radio', link: '/components/radio' },
          ],
        },
        {
          text: 'Surfaces & Containment',
          items: [
            { text: 'Card', link: '/components/card' },
            { text: 'Dialog', link: '/components/dialog' },
            { text: 'Divider', link: '/components/divider' },
          ],
        },
        {
          text: 'Feedback',
          items: [
            { text: 'Progress Indicators', link: '/components/progress' },
            { text: 'Badge', link: '/components/badge' },
            { text: 'Snackbar', link: '/components/snackbar' },
          ],
        },
        {
          text: 'Navigation',
          items: [
            { text: 'Chip & Chip Set', link: '/components/chip' },
            { text: 'Tabs', link: '/components/tabs' },
            { text: 'List', link: '/components/list' },
          ],
        },
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/francofantomius/material-components' },
    ],
    search: {
      provider: 'local',
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 francofantomius',
    },
  },
});

