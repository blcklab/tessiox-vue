# Tiles in your own portfolio

You don't have to use Tessiox's full collection browser. `ElementTiles` renders only the grid, so you can keep complete control of your portfolio's header, featured project, screenshots, links, and surrounding layout.

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { ElementTiles } from '@blcklab/tessiox-vue'
import '@blcklab/tessiox-vue/style.css'

const projects = ref([
  { id: 'anyo', label: 'Anyo', symbol: 'An', category: '3D' },
  { id: 'luna', label: 'Luna', symbol: 'Lu', category: 'Astronomy' },
  { id: 'bridge', label: 'Bridge', symbol: 'Br', category: 'UI' },
])
const selectedId = ref<string | null>('anyo')
const featured = computed(() => projects.value.find(project => project.id === selectedId.value))
</script>

<template>
  <section class="portfolio-layout">
    <aside class="featured">
      <h2>{{ featured?.label || 'Choose a project' }}</h2>
      <p>{{ featured?.category }}</p>
    </aside>
    <ElementTiles
      v-model:selected-id="selectedId"
      :items="projects"
      :options="{
        theme: 'premium-glass',
        layoutOptions: { columns: 4, rows: 3 }
      }"
    />
  </section>
</template>
```

The `selectedId` is stable even if you reorder the list. Change `projects` when data arrives, and Tessiox updates the tiles. Use regular Vue/CSS for your application's own layout.
