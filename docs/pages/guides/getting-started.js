export default {
  id: 'getting-started',
  title: 'Getting Started',
  icon: 'rocket_launch',
  category: 'Guides',
  summary: 'Quick guide to installing and configuring Material Components with Lit, fonts, and icons.',
  contentHtml: `
      <h2>Introduction</h2>
      <p><code>@francofantomius/material-components</code> is a suite of modern, accessible, and lightweight <strong>Material Design 3 (M3)</strong> Web Components built with Lit. They run natively in every modern browser and integrate effortlessly with React, Vue, Angular, Svelte, Solid, or vanilla HTML/JS.</p>

      <h2>Installation</h2>
      <p>Install the library and its peer dependency Lit via your package manager of choice:</p>
      <pre><code class="language-bash">npm install @francofantomius/material-components lit</code></pre>

      <h2>Typography &amp; Icons Setup</h2>
      <p>Material 3 relies on <strong>Roboto</strong> for typography and <strong>Material Symbols</strong> for scalable icons. Place these font stylesheets into your HTML <code>&lt;head&gt;</code>:</p>
      <pre><code class="language-html">&lt;!-- Google Material Symbols Outlined font --&gt;
&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" /&gt;

&lt;!-- Google Roboto font --&gt;
&lt;link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&amp;display=swap" /&gt;</code></pre>

      <h2>Import Strategies</h2>

      <h3>1. Tree-Shakeable Subpath Imports (Recommended)</h3>
      <p>Import only the components your application uses to ensure the smallest possible bundle footprint:</p>
      <pre><code class="language-javascript">import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/card';</code></pre>

      <h3>2. Complete Library Bundle</h3>
      <p>For quick prototypes or sandboxes, import the full component registry at once:</p>
      <pre><code class="language-javascript">import '@francofantomius/material-components';</code></pre>

      <h2>HTML Quick Start</h2>
      <pre><code class="language-html">&lt;md-button variant="filled" icon="rocket_launch"&gt;
  Launch App
&lt;/md-button&gt;

&lt;md-text-field label="Username" variant="outlined" leading-icon="person"&gt;&lt;/md-text-field&gt;

&lt;md-switch selected icons&gt;Enable Feature&lt;/md-switch&gt;</code></pre>
    `
};

