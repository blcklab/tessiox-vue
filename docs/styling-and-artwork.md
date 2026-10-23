# Styling, icons, and artwork

Import one stylesheet from the adapter:

```ts
import '@blcklab/tessiox-vue/style.css'
```

It forwards the main Tessiox styles, keeping the visuals owned by the Tessiox engine. You can override theme and tile settings through the regular Tessiox options and item data.

## Transparent artwork behind an acronym

```ts
const luna = {
  id: 'luna', label: 'Luna', symbol: 'Lu',
  visual: {
    variant: 'illustrated', material: 'glass',
    backgroundImage: {
      src: '/assets/luna.png',
      opacity: 0.12,
      scale: 1.1,
      fit: 'contain',
    },
    typography: {
      symbol: { fontSize: '2rem', fontWeight: 800, opacity: 1 },
      title: { fontSize: '0.75rem', opacity: 0.9 },
    },
  },
}
```

Images may also be embedded as data URLs. For external images, make sure paths resolve in your consuming app. Custom font families must be loaded by that app. Animated GIF artwork and animation settings are features of the main Tessiox engine; use its documentation for advanced playback controls.

Avoid unnecessary heavy effects on large grids, and make sure text remains readable over artwork.
