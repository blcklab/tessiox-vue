import test from 'node:test';
import assert from 'node:assert/strict';

// Exercise actual Vue rendering when the normal npm dependencies are installed.
// An offline maintainer environment may lack Vue; CI installs it via npm ci.
let vue;
let server;
try {
  vue = await import('vue');
  server = await import('vue/server-renderer');
} catch (error) {
  if (error?.code !== 'ERR_MODULE_NOT_FOUND') throw error;
}

test('Vue renders the tiles-only component using Tessiox Vue', { skip: !vue && 'Vue runtime not installed in this offline workspace' }, async () => {
  const { ElementTiles } = await import('../dist/index.js');
  const app = vue.createSSRApp({
    render: () => vue.h(ElementTiles, {
      items: [{ id: 'luna', label: 'Luna', symbol: 'Lu' }],
      options: { theme: 'premium-glass' },
    }),
  });
  const html = await server.renderToString(app);
  assert.match(html, /eg-vue-tiles/);
  assert.match(html, /eg-vue-mount/);
});

test('Vue renders the standalone tile component', { skip: !vue && 'Vue runtime not installed in this offline workspace' }, async () => {
  const { ElementTile } = await import('../dist/index.js');
  const app = vue.createSSRApp({
    render: () => vue.h(ElementTile, { item: { id: 'luna', label: 'Luna', symbol: 'Lu' } }),
  });
  const html = await server.renderToString(app);
  assert.match(html, /eg-vue-tiles/);
});
