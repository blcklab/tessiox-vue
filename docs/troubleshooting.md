# Troubleshooting

**I see tiles without styling.** Import `@blcklab/tessiox-vue/style.css` in your entry point or component.

**Vue says a component is missing.** Import `ElementTiles`, `ElementTile`, or `ElementGrid` by name and confirm Vue 3 is installed.

**I see an npm peer dependency error.** The adapter needs Vue 3.4 or newer and brings in Tessiox 0.1.x as a direct runtime dependency.

**My left-side featured panel changed.** Use `ElementTiles`, not the full `ElementGrid`. Your surrounding HTML and Vue components stay under your control.

**Artwork does not appear.** Check the image URL or use an embedded data URL. Images referenced by `/assets/...` must exist in the consuming project.

**Selection doesn't update my Vue state.** Use `v-model:selected-id` and make sure every item has a stable, unique `id`.

**The editor or Studio is missing.** Tessiox Studio is a separate internal application. It is not included in Tessiox Vue.

**My bundler won't resolve the stylesheet.** Confirm the build supports CSS `@import` from npm dependencies. As a fallback, import `@blcklab/tessiox/style.css` directly from the underlying dependency.
