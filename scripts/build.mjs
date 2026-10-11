// Builds the static site into dist/.
// Each file in src/pages exports either `meta` + `render()` or a `pages`
// array of them. The shared layout wraps every page. Everything in public/
// is copied as-is, then oversized images are scaled down.

import { cp, mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { settings } from '../src/content.mjs';
import { layout } from '../src/partials/layout.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'dist');
const preview = Boolean(process.env.SITE_PREVIEW);

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'public'), out, { recursive: true });

const pagesDir = join(root, 'src', 'pages');
const files = (await readdir(pagesDir)).filter((f) => f.endsWith('.mjs'));
const sitemap = [];

for (const file of files) {
  const mod = await import(pathToFileURL(join(pagesDir, file)).href);
  const pages = Array.isArray(mod.pages) ? mod.pages : [{ meta: mod.meta, render: mod.render }];
  for (const { meta, render } of pages) {
    const depth = meta.slug.split('/').length - 1;
    const html = relativise(layout(meta, render()), depth);
    const target = join(out, `${meta.slug}.html`);
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, html);
    if (!meta.noindex && meta.slug !== '404') {
      sitemap.push({ path: meta.slug === 'index' ? '' : `${meta.slug}.html`, lastmod: meta.lastmod });
    }
    console.log(`  ${meta.slug}.html`);
  }
}

const base = settings.siteUrl.replace(/\/$/, '');
await writeFile(
  join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemap
  .sort((a, b) => a.path.localeCompare(b.path))
  .map((p) => `  <url><loc>${base}/${p.path}</loc>${p.lastmod ? `<lastmod>${p.lastmod}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`
);
// Preview builds stay out of search results (pages also carry noindex).
await writeFile(join(out, 'robots.txt'), preview ? 'User-agent: *\nDisallow:\n' : `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`);

// Redirects from old WordPress URLs (used by Cloudflare Pages / Netlify on
// the live domain; GitHub Pages ignores this file).
const { news } = await import('../src/content.mjs');
const legacy = [
  ['/coolfly-urban-evtol/', '/urban.html'],
  ['/evtol-s-aircraft/', '/dream-st.html'],
  ['/dream-pro/', '/dream-pro.html'],
  ['/about-us/', '/company.html'],
  ['/contact-us/', '/contact.html'],
  ['/newsroom/', '/newsroom.html'],
  ...news.filter((n) => n.oldUrl).map((n) => [n.oldUrl, `/news/${n.slug}.html`]),
];
await writeFile(join(out, '_redirects'), legacy.map(([from, to]) => `${from} ${to} 301`).join('\n') + '\n');

await optimiseImages(join(out, 'assets', 'img'));
console.log(`Built ${sitemap.length} indexable pages into dist/${preview ? ' (preview: noindex)' : ''}`);

// Templates write paths relative to the site root ("assets/...", "urban.html")
// or root-absolute ("/assets/...", as Pages CMS stores uploads). Rewrite both
// so every page works from any folder and under any base path.
function relativise(html, depth) {
  const prefix = '../'.repeat(depth);
  return html.replace(/\b(src|href|poster)="([^"]*)"/g, (all, attr, value) => {
    if (!value || /^(?:[a-z][a-z0-9+.-]*:|#|\/\/|\?)/i.test(value)) return all;
    return `${attr}="${prefix}${value.replace(/^\/+/, '')}"`;
  });
}

// Scale down uploads wider than 2000px or heavier than 600 KB. Skipped when
// the optional `sharp` package is unavailable.
async function optimiseImages(dir) {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('  (sharp not installed: images copied unchanged)');
    return;
  }
  const entries = await readdir(dir, { recursive: true });
  let count = 0;
  for (const name of entries) {
    const file = join(dir, name);
    const ext = extname(file).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) continue;
    const { size } = await stat(file);
    const image = sharp(file);
    const { width = 0 } = await image.metadata();
    if (width <= 2000 && size <= 600 * 1024) continue;
    const resized = image.resize({ width: Math.min(width, 2000), withoutEnlargement: true });
    const buffer =
      ext === '.png'
        ? await resized.png({ compressionLevel: 9, palette: true }).toBuffer()
        : ext === '.webp'
          ? await resized.webp({ quality: 82 }).toBuffer()
          : await resized.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    if (buffer.length < size) {
      await writeFile(file, buffer);
      count += 1;
    }
  }
  if (count) console.log(`  optimised ${count} image(s)`);
}
