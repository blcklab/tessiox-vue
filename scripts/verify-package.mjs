import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url)));
assert.equal(pkg.name, '@blcklab/tessiox-vue');
assert.ok(!pkg.private);
assert.equal(pkg.dependencies?.['@blcklab/tessiox'], '^0.1.0');
assert.equal(pkg.peerDependencies?.vue, '^3.4.0');
assert.equal(pkg.dependencies?.vue, undefined);
assert.equal(pkg.exports['./style.css'], './dist/style.css');
const result = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json', '--ignore-scripts'], {
  cwd: new URL('..', import.meta.url), encoding: 'utf8',
}))[0];
const paths = result.files.map(file => file.path);
for (const file of ['dist/index.js', 'dist/index.d.ts', 'dist/style.css', 'README.md', 'LICENSE']) {
  assert.ok(paths.includes(file), `Missing npm file: ${file}`);
}
for (const path of paths) {
  assert.ok(!/^(docs|\.internal|examples|tests|scripts|src|\.github|types-test)\//.test(path), `Internal source in npm: ${path}`);
  assert.ok(!path.includes('package-lock.json'), `Lockfile must not ship: ${path}`);
}
const js = readFileSync(new URL('../dist/index.js', import.meta.url), 'utf8');
assert.match(js, /from ['"]vue['"]/);
assert.match(js, /from ['"]@blcklab\/tessiox\/dom['"]/);
assert.doesNotMatch(js, /from ['"]@blcklab\/tessiox\/src\//);
assert.match(readFileSync(new URL('../dist/style.css', import.meta.url), 'utf8'), /@blcklab\/tessiox\/style\.css/);
console.log('Tessiox Vue npm contents verified:', paths.join(', '));
