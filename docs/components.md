# Components and props

Tessiox Vue gives you three components with different levels of control.

## `ElementTiles`

Use when your app owns the layout and surrounding UI. It renders only the tiles—no toolbar or built-in featured preview.

## `ElementTile`

Use when you want one identity tile. Pass a single `item` and, optionally, `options` or `selectedId`.

```vue
<script setup lang="ts">
import { ElementTile } from '@blcklab/tessiox-vue'
import '@blcklab/tessiox-vue/style.css'
const luna = { id: 'luna', label: 'Luna', symbol: 'Lu' }
</script>
<template>
  <ElementTile :item="luna" />
</template>
```

## `ElementGrid`

Use when you want the full collection browsing interface, including Tessiox's built-in search, filtering and preview behavior as enabled by options.

### Props

| Prop | Applies to | What it does |
| --- | --- | --- |
| `items` | Grid, Tiles | Reactive collection array |
| `item` | Tile | One Tessiox item |
| `options` | All | Layout, theme, tile, browser, and other Tessiox options |
| `selectedId` | All | Optional controlled selection; works with `v-model:selected-id` |
| `theme` | Grid, Tiles | Optional theme override |
| `colorMode` | Grid, Tiles | `light`, `dark`, or `auto` |

`ElementGrid` and `ElementTiles` also have `#before`, `#preview` and `#after` slots. The `#preview` slot belongs to your Vue app; when provided, the built-in featured preview is disabled.

Aliases such as `TessioxGrid`, `TessioxTiles`, and `TessioxTile` are also available. The shorter `Element*` names are retained for compatibility.
