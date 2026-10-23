# Tessiox Vue

Vue 3 components for [Tessiox](https://www.npmjs.com/package/@blcklab/tessiox), the data-driven tile and collection library.

Tessiox Vue is a small wrapper around the published Tessiox engine. It handles Vue props, selection events, reactivity, and component cleanup. The main Tessiox package remains framework-independent.

## Install

```bash
npm install @blcklab/tessiox-vue
```

Your project should already use Vue 3. **You only need to install the Vue adapter directly**—npm installs `@blcklab/tessiox` as its dependency.

## Use just the tiles

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElementTiles } from '@blcklab/tessiox-vue'
import '@blcklab/tessiox-vue/style.css'

const projects = ref([
  { id: 'luna', label: 'Luna', symbol: 'Lu', visual: { accent: '#9175e8' } },
  { id: 'sekai64', label: 'Sekai64', symbol: 'Sk' },
])
const selectedId = ref<string | null>('luna')
const selected = computed(() => projects.value.find(project => project.id === selectedId.value))
</script>

<template>
  <section class="portfolio">
    <article class="featured">{{ selected?.label }}</article>
    <ElementTiles
      v-model:selected-id="selectedId"
      :items="projects"
      :options="{ theme: 'premium-glass', layoutOptions: { columns: 4 } }"
    />
  </section>
</template>
```

Your app owns the featured area. Tessiox renders only the right-side tiles.

## Which component?

| Component | What it renders |
| --- | --- |
| `ElementTiles` | A grid of tiles without a built-in featured panel or toolbar |
| `ElementTile` | One tile, useful for a project badge or icon |
| `ElementGrid` | Full Tessiox collection browser |

The same components are also exported as `TessioxTiles`, `TessioxTile`, and `TessioxGrid` (plus a few compatibility aliases).

## Documentation

Start with [Getting started](docs/getting-started.md), then see [Tiles-only portfolio](docs/tiles-only-portfolio.md), [Components and props](docs/components.md), [Events and selection](docs/events-and-selection.md), [Styling and artwork](docs/styling-and-artwork.md), and [Troubleshooting](docs/troubleshooting.md).

For the underlying data model, layouts, animation capabilities, or themes, see the [main Tessiox project](https://github.com/blcklab/tessiox).

## Contributing and releases

```bash
npm ci
npm run check
```

The adapter is independently versioned and published. CI checks Node 20, 22, and 24. A version tag such as `v0.1.0-alpha.1` starts the release workflow. Historical development notes stay in the ignored `.internal/` folder and are not published to npm.

Licensed under MIT.
