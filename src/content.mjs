// Reads everything editors can change (the content/ folder, edited through
// Pages CMS) and hands it to the page templates.
//
// English lives in content/. Other languages live in content/<lang>/ with the
// same layout; any file or key not yet translated falls back to English, so
// a missing translation never breaks a page. News, landing pages and text
// pages are per language and do not fall back.

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import YAML from 'yaml';
import { lang } from './i18n.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'content');
const langRoot = lang === 'en' ? root : join(root, lang);

const parseJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

// Objects merge key by key. Lists of objects merge item by item, so a
// translation only needs the text and keeps the English images and numbers.
// Empty values in a translation fall back to English.
function merge(base, over) {
  if (over === undefined || over === null || over === '') return base;
  if (Array.isArray(over)) {
    if (!over.length) return base;
    return Array.isArray(base) ? over.map((v, i) => (isObject(v) ? merge(base[i], v) : v)) : over;
  }
  if (!isObject(over) || !isObject(base)) return over;
  const out = { ...base };
  for (const [k, v] of Object.entries(over)) out[k] = merge(base[k], v);
  return out;
}
const isObject = (v) => typeof v === 'object' && v !== null && !Array.isArray(v);

function readJson(file, overrideFile = file) {
  const base = parseJson(join(root, file));
  const local = join(langRoot, overrideFile);
  return lang !== 'en' && existsSync(local) ? merge(base, parseJson(local)) : base;
}

// Markdown file with YAML front matter -> { ...frontMatter, slug, body (HTML) }.
function readMarkdown(dir, file) {
  const raw = readFileSync(join(dir, file), 'utf8');
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  const data = match ? YAML.parse(match[1]) || {} : {};
  const markdown = match ? match[2] : raw;
  return {
    ...data,
    slug: data.slug || file.replace(/\.md$/, ''),
    body: marked.parse(markdown.trim()),
  };
}

function readMarkdownCollection(folder) {
  const dir = join(langRoot, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => readMarkdown(dir, f));
}

const isoDate = (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : String(value || '').slice(0, 10));

// Site-wide settings: shared values from content/settings.json, with
// language-specific text (popup, consent, offices, ICP number ...) from
// content/<lang>/site.json.
export const settings = readJson('settings.json', 'site.json');
export const home = readJson('home.json');
export const seo = readJson('seo.json');
export const dealers = readJson('dealers.json');
export const company = readJson('company.json');
export const milestones = readJson('milestones.json');

export const aircraft = readdirSync(join(root, 'aircraft'))
  .filter((f) => f.endsWith('.json'))
  .map((f) => readJson(join('aircraft', f)))
  .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

export const news = readMarkdownCollection('news')
  .filter((n) => n.published !== false)
  // Posts without a cover use the first image in the article.
  .map((n) => ({ ...n, date: isoDate(n.date), cover: n.cover || n.body.match(/<img[^>]+src="([^"]+)"/)?.[1] || '' }))
  .sort((a, b) => b.date.localeCompare(a.date));

export const landingPages = readMarkdownCollection('landing').filter((p) => p.published !== false);

export const textPages = readMarkdownCollection('pages').filter((p) => p.published !== false);
