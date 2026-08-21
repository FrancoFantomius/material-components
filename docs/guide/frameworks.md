# Framework Usage

Web Components are natively supported across all frontend frameworks.

## React 19+ / React 18

In React 19+, custom elements have full native property and event support:

```tsx
import React, { useState } from 'react';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/text-field';

export function MyComponent() {
  const [name, setName] = useState('');

  return (
    <div>
      <md-text-field
        label="Name"
        value={name}
        onInput={(e: any) => setName(e.target.value)}
      />
      <md-button variant="filled" onClick={() => alert(`Hello ${name}`)}>
        Greet
      </md-button>
    </div>
  );
}
```

## Vue 3

```vue
<script setup>
import { ref } from 'vue';
import '@francofantomius/material-components/button';
import '@francofantomius/material-components/switch';

const enabled = ref(true);
</script>

<template>
  <div>
    <md-switch :selected="enabled" @change="enabled = !enabled">
      Enable Feature
    </md-switch>
    <md-button variant="filled" :disabled="!enabled">
      Proceed
    </md-button>
  </div>
</template>
```

## Angular / Svelte / Plain HTML

Works directly without any special bindings or wrappers.

