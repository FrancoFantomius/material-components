export default {
  id: 'carousel',
  title: 'Carousel',
  icon: 'view_carousel',
  tag: 'md-carousel',
  category: 'Surfaces & Containment',
  description: 'Carousels present an interactive scrollable collection of items with support for multi-browse, hero, and full-width layouts, smooth scrolling, next/prev navigation buttons, swipe gestures, and item resizing.',
  subpath: '@francofantomius/material-components/carousel',
  interactiveType: 'carousel',
  properties: [
    { name: 'layout', type: "'multi-browse' | 'hero' | 'full-width' | 'uncontained'", default: "'multi-browse'", description: 'Layout arrangement and sizing for carousel items' },
    { name: 'active-index', type: 'number', default: '0', description: '0-based index of the currently active item' },
    { name: 'hide-controls', type: 'boolean', default: 'false', description: 'Hides next and previous navigation arrow buttons' },
    { name: 'hide-indicators', type: 'boolean', default: 'false', description: 'Hides bottom pagination indicator dots' },
    { name: 'loop', type: 'boolean', default: 'false', description: 'Enables continuous infinite wrap-around navigation' },
    { name: 'autoplay', type: 'boolean', default: 'false', description: 'Automatically advances slides periodically' },
    { name: 'autoplay-interval', type: 'number', default: '5000', description: 'Autoplay transition interval in milliseconds' },
    { name: 'item-spacing', type: 'string | number', default: "'8px'", description: 'Gap between carousel items' },
    { name: 'item-width', type: 'string', default: "''", description: 'Custom width applied to each item' },
    { name: 'item-height', type: 'string', default: "''", description: 'Custom height applied to each item' }
  ],
  subComponentProperties: [
    {
      name: 'md-carousel-item',
      properties: [
        { name: 'src', type: 'string', default: "''", description: 'Image source URL for the carousel item media' },
        { name: 'alt', type: 'string', default: "''", description: 'Alt text for image media' },
        { name: 'headline', type: 'string', default: "''", description: 'Title or headline overlay text' },
        { name: 'subhead', type: 'string', default: "''", description: 'Subtitle or description overlay text' },
        { name: 'href', type: 'string', default: "''", description: 'Optional navigation link URL' },
        { name: 'target', type: 'string', default: "''", description: 'Link target when href is set' },
        { name: 'interactive', type: 'boolean', default: 'false', description: 'Enables ripple and hover interactive state' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables item interactions' },
        { name: 'snap-align', type: "'start' | 'center' | 'end'", default: "'start'", description: 'Scroll snap alignment point' }
      ]
    }
  ],
  events: [
    { name: 'change', detail: '{ activeIndex: number, item: MdCarouselItem }', description: 'Fired when the active slide changes' },
    { name: 'carousel-item-click', detail: '{ item: MdCarouselItem }', description: 'Fired when an item is clicked' }
  ],
  examples: [
    {
      title: 'Multi-Browse Carousel (Default)',
      description: 'Shows multiple items with standard peeking edges to invite horizontal exploration.',
      html: `<md-carousel>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80"
    headline="Colorful Gradients"
    subhead="Modern vibrant colors"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80"
    headline="Abstract Waves"
    subhead="Smooth fluid motion"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&auto=format&fit=crop&q=80"
    headline="Dark Aesthetics"
    subhead="Geometric lighting"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
    headline="Sunny Coast"
    subhead="Tropical getaway"
  ></md-carousel-item>
</md-carousel>`
    },
    {
      title: 'Hero Layout',
      description: 'Features a large prominent slide alongside a smaller peeking card to highlight primary content.',
      html: `<md-carousel layout="hero" loop>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80"
    headline="Mountain Exploration"
    subhead="Discover scenic landscapes and trails"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80"
    headline="Forest Pathways"
    subhead="Immerse yourself in lush greenery"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&auto=format&fit=crop&q=80"
    headline="Wilderness Horizons"
    subhead="Breathtaking sunrises and ridges"
  ></md-carousel-item>
</md-carousel>`
    },
    {
      title: 'Full-Width Paging Carousel',
      description: 'Displays single items taking 100% width with pagination dots.',
      html: `<md-carousel layout="full-width">
  <md-carousel-item
    src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1000&auto=format&fit=crop&q=80"
    headline="Circuit Technology"
    subhead="Microchip architecture & silicon"
  ></md-carousel-item>
  <md-carousel-item
    src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80"
    headline="Data Matrix"
    subhead="Cybersecurity and cloud networks"
  ></md-carousel-item>
</md-carousel>`
    }
  ]
};
