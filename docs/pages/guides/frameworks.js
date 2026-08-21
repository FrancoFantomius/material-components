export default {
  id: 'frameworks',
  title: 'Framework Integration',
  category: 'Guides',
  summary: 'Guidelines and patterns for integrating Material Components with React, Vue, Angular, and Svelte.',
  contentHtml: `
      <h2>React 19 &amp; React 18</h2>
      <p>React 19 natively passes properties, attributes, and custom events directly to custom elements. In React 18 and earlier, standard properties and events can be assigned as attributes or attached with refs.</p>

      <pre><code class="language-tsx">import React, { useState } from 'react';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/switch';

export function UserSettings() {
  const [username, setUsername] = useState('Alice');
  const [notifications, setNotifications] = useState(true);

  return (
    &lt;div&gt;
      &lt;md-text-field
        label="Username"
        value={username}
        onInput={(e: any) => setUsername(e.target.value)}
      /&gt;
      &lt;md-switch
        selected={notifications}
        onChange={(e: any) => setNotifications(e.target.selected)}
      &gt;
        Notifications
      &lt;/md-switch&gt;
      &lt;md-button variant="filled" onClick={() => console.log('Saved!')}&gt;
        Save Settings
      &lt;/md-button&gt;
    &lt;/div&gt;
  );
}</code></pre>

      <h2>Vue 3</h2>
      <p>Configure Vue's compiler to recognize <code>md-</code> tags as custom elements in <code>vite.config.js</code>:</p>
      <pre><code class="language-javascript">// vite.config.js
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('md-')
        }
      }
    })
  ]
});</code></pre>

      <p>Then use <code>v-model</code> bindings and events seamlessly in Vue SFC components:</p>
      <pre><code class="language-html">&lt;script setup&gt;
import { ref } from 'vue';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/switch';

const isEnabled = ref(true);
&lt;/script&gt;

&lt;template&gt;
  &lt;div&gt;
    &lt;md-switch :selected="isEnabled" @change="isEnabled = !isEnabled"&gt;
      Enable Feature
    &lt;/md-switch&gt;
    &lt;md-button variant="filled" :disabled="!isEnabled"&gt;
      Proceed
    &lt;/md-button&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>

      <h2>Angular &amp; Svelte</h2>
      <p>Custom elements work natively out of the box in Angular (with <code>CUSTOM_ELEMENTS_SCHEMA</code>) and in Svelte without any extra wrapper libraries.</p>
    `
};

