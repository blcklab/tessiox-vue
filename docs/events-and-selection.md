# Selection, events, and reactive data

Use `v-model:selected-id` to keep your Vue UI in sync with the selected tile:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { ElementTiles } from '@blcklab/tessiox-vue'
const selectedId = ref<string | null>(null)
const items = ref([{ id: 'luna', label: 'Luna', symbol: 'Lu' }])
</script>
<template>
  <ElementTiles
    v-model:selected-id="selectedId"
    :items="items"
    @select="(item) => console.log('Selected:', item?.label)"
  />
</template>
```

The collection components emit `update:selectedId`, `select`, `preview`, `query`, `catalog`, and `event`. The last one exposes Tessiox's typed event object when you need more detail.

### Reactive updates

Replace or edit the array normally with Vue. Tessiox Vue watches the `items` prop and updates the underlying engine.

For theme changes, pass a reactive `theme` prop. For layout or tile settings, pass a reactive `options` object. Components manage mounting and teardown automatically.

When using `ElementTile`, `select` and `update:selectedId` are available, too.
