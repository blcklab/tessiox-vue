import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
test('the adapter depends on Tessiox, not the other way around', () => {
  assert.equal(pkg.dependencies['@blcklab/tessiox'], '^0.1.0');
  assert.equal(pkg.dependencies.vue, undefined);
  assert.ok(pkg.peerDependencies.vue.startsWith('^3'));
});
test('single stylesheet entry can be imported from the Vue package', () => {
  assert.equal(pkg.exports['./style.css'], './dist/style.css');
});
test('Vue source uses public Tessiox entrypoints only', () => {
  const src = readFileSync(new URL('../src/index.ts', import.meta.url), 'utf8');
  assert.match(src, /from '@blcklab\/tessiox\/dom'/);
  assert.doesNotMatch(src, /@blcklab\/tessiox\/src/);
});
