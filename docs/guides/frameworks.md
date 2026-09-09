---
title: Framework Integration
category: Guides
order: 4
icon: integration_instructions
description: Guidelines and patterns for integrating Material Components with React, Vue, Angular, and Svelte.
---

## React (18 & 19)

React 19 natively passes properties, attributes, and custom events directly to custom elements. In React 18 and earlier, standard properties and events can be assigned as attributes or attached with refs.

```tsx
import React, { useState } from 'react';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';
import '@francofantomius/material-components/switch';

export function UserSettings() {
  const [username, setUsername] = useState('Alice');
  const [notifications, setNotifications] = useState(true);

  return (
    <div>
      <md-text-field
        label="Username"
        value={username}
        onInput={(e: any) => setUsername(e.target.value)}
      />
      <md-switch
        selected={notifications}
        onChange={(e: any) => setNotifications(e.target.selected)}
      >
        Notifications
      </md-switch>
      <md-button variant="filled" onClick={() => console.log('Saved!')}>
        Save Settings
      </md-button>
    </div>
  );
}
```

## Vue 3

Configure Vue's compiler to recognize `md-` tags as custom elements in `vite.config.js`:

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

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
});
```

Then use `v-model` bindings and events seamlessly in Vue Single File Components:

```html
<script setup>
import { ref } from 'vue';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/switch';

const isEnabled = ref(true);
</script>

<template>
  <div>
    <md-switch :selected="isEnabled" @change="isEnabled = !isEnabled">
      Enable Feature
    </md-switch>
    <md-button variant="filled" :disabled="!isEnabled">
      Proceed
    </md-button>
  </div>
</template>
```

## Angular & Svelte

- **Angular**: Include `CUSTOM_ELEMENTS_SCHEMA` in `@NgModule({ schemas: [CUSTOM_ELEMENTS_SCHEMA] })` or in your standalone component's `schemas` array.
- **Svelte**: Custom elements work natively with standard property and event bindings without extra wrappers or compiler flags.

