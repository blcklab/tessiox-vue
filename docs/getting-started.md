# Getting started

Tessiox Vue brings the Tessiox tile engine into a Vue 3 app. You get reactive props and Vue events, while Tessiox handles drawing and arranging the tiles.

## Install

```bash
npm install @blcklab/tessiox-vue
```

If Vue 3 is already part of your app, that's the only Tessiox-related install you need. The adapter brings in `@blcklab/tessiox` automatically.

Import the component and stylesheet:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ElementTiles } from '@blcklab/tessiox-vue'
import '@blcklab/tessiox-vue/style.css'

const items = ref([
  { id: 'anyo', label: 'Anyo', symbol: 'An' },
  { id: 'luna', label: 'Luna', symbol: 'Lu' },
])
</script>

<template>
  <ElementTiles :items="items" />
</template>
```

No separate initialization or manual DOM cleanup is needed. When the Vue component unmounts, its Tessiox instance is disposed automatically.

**What next?** See [Tiles-only portfolio](tiles-only-portfolio.md) if you want to control the featured panel yourself, or [Components](components.md) for the full browser and single-tile options.
