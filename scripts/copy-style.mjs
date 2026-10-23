import { mkdir, writeFile } from 'node:fs/promises';
// The Vue package provides a single CSS entry that delegates to Tessiox.
// This keeps rendering styles owned and updated by the engine package.
await mkdir('dist', { recursive: true });
await writeFile('dist/style.css', '@import "@blcklab/tessiox/style.css";\n');
