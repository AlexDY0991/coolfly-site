// Builds the static site into dist/.
// Each file in src/pages exports `meta` and `render()`; the shared layout
// wraps the result. Everything in public/ is copied as-is.

import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { layout } from '../src/partials/layout.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'public'), out, { recursive: true });

const pagesDir = join(root, 'src', 'pages');
const files = (await readdir(pagesDir)).filter((f) => f.endsWith('.mjs'));

for (const file of files) {
  const mod = await import(pathToFileURL(join(pagesDir, file)).href);
  const pages = Array.isArray(mod.pages) ? mod.pages : [{ meta: mod.meta, render: mod.render }];
  for (const { meta, render } of pages) {
    const html = layout(meta, render());
    await writeFile(join(out, `${meta.slug}.html`), html);
    console.log(`  ${meta.slug}.html`);
  }
}

console.log(`Built ${files.length} page modules into dist/`);
