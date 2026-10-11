// Reads everything editors can change (the content/ folder, edited through
// Pages CMS) and hands it to the page templates.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import YAML from 'yaml';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');

const readJson = (file) => JSON.parse(readFileSync(join(root, file), 'utf8'));

// Markdown file with YAML front matter -> { ...frontMatter, slug, body (HTML) }.
function readMarkdown(folder, file) {
  const raw = readFileSync(join(root, folder, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = match ? YAML.parse(match[1]) || {} : {};
  const markdown = match ? match[2] : raw;
  return {
    ...data,
    slug: data.slug || file.replace(/\.md$/, ''),
    body: marked.parse(markdown.trim()),
  };
}

function readCollection(folder, ext) {
  const dir = join(root, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(ext) && !f.startsWith('_'))
    .map((f) => (ext === '.json' ? readJson(join(folder, f)) : readMarkdown(folder, f)));
}

const isoDate = (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value || '').slice(0, 10));

export const settings = readJson('settings.json');
export const home = readJson('home.json');
export const seo = readJson('seo.json');
export const dealers = readJson('dealers.json');
export const company = readJson('company.json');
export const milestones = readJson('milestones.json');

export const aircraft = readCollection('aircraft', '.json').sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const news = readCollection('news', '.md')
  .filter((n) => n.published !== false)
  // Posts without a cover use the first image in the article.
  .map((n) => ({ ...n, date: isoDate(n.date), cover: n.cover || n.body.match(/<img[^>]+src="([^"]+)"/)?.[1] || '' }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const landingPages = readCollection('landing', '.md').filter((p) => p.published !== false);

export const textPages = readCollection('pages', '.md').filter((p) => p.published !== false);
