// One-off import of posts from the old WordPress site into content/news.
//
//   node scripts/import-wordpress.mjs [https://coolflyaircraft.com]
//   node scripts/import-wordpress.mjs https://coolflyaircraft.net --lang=zh
//
// --lang=zh writes to content/zh/news. Posts whose slug is not ASCII (Chinese
// titles) are named <date>-<post id>.
// Writes one Markdown file per post, downloads cover and inline images into
// public/assets/img/news (scaled to 1600px), and records each post's old URL
// so redirects can be generated. Existing files are left untouched, so
// re-running only adds posts that are new on the old site.

import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import TurndownService from 'turndown';
import YAML from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const lang = (args.find((a) => a.startsWith('--lang=')) || '--lang=en').slice(7);
const source = (args.find((a) => !a.startsWith('--')) || 'https://coolflyaircraft.com').replace(/\/$/, '');
const newsDir = lang === 'en' ? join(root, 'content', 'news') : join(root, 'content', lang, 'news');
const imgPrefix = lang === 'en' ? '' : `${lang}-`;
const imgDir = join(root, 'public', 'assets', 'img', 'news');
await mkdir(newsDir, { recursive: true });
await mkdir(imgDir, { recursive: true });

let sharp = null;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('sharp not installed: images saved without resizing');
}

const turndown = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
turndown.remove(['script', 'style', 'noscript', 'iframe', 'form']);

const decode = (s = '') =>
  s
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-$/, '');

// Keep URLs readable: at most ~70 characters, cut at a word boundary.
const trimSlug = (s) => (s.length <= 70 ? s : s.slice(0, 70).replace(/-[^-]*$/, ''));

const EVENT_WORDS = /expo|oshkosh|ifa|congress|airshow|umex|launch|ces\b|fair|show|亮相|博览会|展会|大会|发布会|峰会|论坛/i;

const res = await fetchRetry(`${source}/wp-json/wp/v2/posts?per_page=100&_embed=1`);
if (!res.ok) throw new Error(`WordPress API returned ${res.status}`);
const posts = await res.json();
console.log(`Found ${posts.length} posts on ${source}`);

let added = 0;
for (const post of posts) {
  const title = decode(post.title.rendered);
  const rawSlug = decodeURIComponent(post.slug);
  const ascii = /^[a-z0-9-]+$/.test(rawSlug) && !/^\d+(-\d+)?$/.test(rawSlug);
  const slug = ascii ? trimSlug(rawSlug) : lang === 'en' ? trimSlug(slugify(title)) : `${post.date.slice(0, 10)}-${post.id}`;
  const file = join(newsDir, `${slug}.md`);
  if (existsSync(file)) continue;

  const cats = (post._embedded?.['wp:term'] || []).flat().filter((t) => t.taxonomy === 'category').map((t) => t.name);
  const category = cats.some((c) => /Science Popularization|科普/.test(c)) ? 'Insights' : EVENT_WORDS.test(title) ? 'Events' : 'News';

  const coverUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const cover = coverUrl ? await saveImage(coverUrl, `${imgPrefix}${slug}-cover`) : '';

  let html = post.content.rendered;
  let n = 0;
  for (const [, url] of [...html.matchAll(/<img[^>]+src="([^"]+)"/g)]) {
    const local = await saveImage(url, `${imgPrefix}${slug}-${++n}`);
    if (local) html = html.split(url).join(local);
  }
  // Drop srcset attributes that still point at the old site.
  html = html.replace(/\s(srcset|sizes)="[^"]*"/g, '');

  let body = turndown.turndown(html)
    // Nested <strong> tags become ****text****; adjacent ones **a****b**.
    .replace(/(^|\s)\*{4}([^*\n]+?)\*{4}(?=\s|$)/gm, '$1**$2**')
    .replace(/\*{4}/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  // Many posts repeat their title as the first heading or line.
  const lines = body.split('\n');
  if (lines[0] && decode(lines[0].replace(/^#+\s*/, '')) === title) body = lines.slice(1).join('\n').trim();

  let excerpt = decode(post.excerpt.rendered).replace(/\s*\[…\]|\s*\[&hellip;\]$/, '');
  if (excerpt.startsWith(title)) excerpt = excerpt.slice(title.length).trim();
  excerpt = excerpt.slice(0, 220);
  const front = {
    title,
    slug,
    date: post.date.slice(0, 10),
    category,
    excerpt: excerpt.length === 220 ? `${excerpt.replace(/\s+\S*$/, '')}…` : excerpt,
    cover,
    coverAlt: '',
    oldUrl: decodeURI(new URL(post.link).pathname),
    published: true,
  };
  await writeFile(file, `---\n${YAML.stringify(front)}---\n\n${body}\n`);
  added += 1;
  console.log(`  + ${slug} (${category})`);
}
console.log(`Imported ${added} new post(s).`);

async function saveImage(url, name) {
  // Re-running the import reuses images that were already downloaded.
  for (const ext of ['.jpg', '.webp', '.png', '.gif']) {
    if (existsSync(join(imgDir, `${name}${ext}`))) return `/assets/img/news/${name}${ext}`;
  }
  try {
    const r = await fetchRetry(encodeURI(decodeURI(url)));
    if (!r.ok) throw new Error(String(r.status));
    const input = Buffer.from(await r.arrayBuffer());
    let ext = extname(new URL(url).pathname).toLowerCase() || '.jpg';
    let output = input;
    if (sharp) {
      const img = sharp(input, { animated: false });
      const meta = await img.metadata();
      const resized = img.resize({ width: 1600, withoutEnlargement: true });
      if (meta.hasAlpha && ext === '.png') {
        output = await resized.webp({ quality: 82 }).toBuffer();
        ext = '.webp';
      } else {
        output = await resized.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
        ext = '.jpg';
      }
    }
    const filename = `${name}${ext}`;
    await writeFile(join(imgDir, filename), output);
    return `/assets/img/news/${filename}`;
  } catch (err) {
    console.warn(`    image skipped (${err.message}): ${url}`);
    return '';
  }
}

// Cross-border requests drop now and then; retry with back-off.
async function fetchRetry(url, tries = 4) {
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(90000) });
      if (r.ok || i >= tries - 1) return r;
    } catch (err) {
      if (i >= tries - 1) throw err;
    }
    await new Promise((done) => setTimeout(done, 2000 * 2 ** i));
  }
}
