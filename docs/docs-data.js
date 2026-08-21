import { GUIDES } from './pages/guides/index.js';
import { COMPONENTS } from './pages/components/index.js';

export { GUIDES } from './pages/guides/index.js';
export { COMPONENTS } from './pages/components/index.js';

export const CATEGORIES = [
  {
    name: 'Overview & Guides',
    items: [
      { title: 'Home', path: '#/', id: 'index', icon: 'home' },
      ...GUIDES.map(g => ({ title: g.title, path: `#/guide/${g.id}`, id: `guide/${g.id}`, icon: 'menu_book' }))
    ]
  },
  {
    name: 'Actions',
    items: COMPONENTS.filter(c => c.category === 'Actions').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  },
  {
    name: 'Inputs & Controls',
    items: COMPONENTS.filter(c => c.category === 'Inputs & Controls').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  },
  {
    name: 'Surfaces & Containment',
    items: COMPONENTS.filter(c => c.category === 'Surfaces & Containment').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  },
  {
    name: 'Communication & Feedback',
    items: COMPONENTS.filter(c => c.category === 'Communication & Feedback').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  },
  {
    name: 'Navigation',
    items: COMPONENTS.filter(c => c.category === 'Navigation').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  },
  {
    name: 'Media & Playback',
    items: COMPONENTS.filter(c => c.category === 'Media & Playback' || c.category === 'Media').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'play_circle'
    }))
  },
  {
    name: 'Utilities & Data',
    items: COMPONENTS.filter(c => c.category === 'Utilities' || c.category === 'Utilities & Data').map(c => ({
      title: c.title,
      path: `#/components/${c.id}`,
      id: `components/${c.id}`,
      tag: c.tag,
      icon: 'widgets'
    }))
  }
];
