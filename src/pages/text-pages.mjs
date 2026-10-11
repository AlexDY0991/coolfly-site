// Simple text pages (privacy policy, terms) from content/pages/*.md.

import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { textPages } from '../content.mjs';
import { otherLang, t } from '../i18n.mjs';
import { esc, formatDate } from '../partials/ui.mjs';

// The language switch links to the same page if it exists in the other
// language, otherwise to that language's home page.
const contentDir = join(import.meta.dirname, '..', '..', 'content');
const existsIn = (code, slug) => existsSync(join(contentDir, ...(code === 'en' ? [] : [code]), 'pages', `${slug}.md`));

export const pages = textPages.map((p) => ({
  meta: {
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    header: 'solid',
    nav: '',
    alt: existsIn(otherLang, p.slug) ? p.slug : 'index',
    popup: false,
    noindex: Boolean(p.noindex),
  },
  render: () => `
<section class="page-head">
  <div class="container article__narrow">
    <h1>${esc(p.title)}</h1>
    ${p.updated ? `<p class="news-card__meta">${esc(t('common.lastUpdated'))} <time datetime="${esc(String(p.updated).slice(0, 10))}">${formatDate(String(p.updated).slice(0, 10))}</time></p>` : ''}
  </div>
</section>
<div class="container article__narrow prose">${p.body}</div>`,
}));
