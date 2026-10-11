// Simple text pages (privacy policy, terms) from content/pages/*.md.

import { textPages } from '../content.mjs';
import { esc, formatDate } from '../partials/ui.mjs';

export const pages = textPages.map((p) => ({
  meta: {
    slug: p.slug,
    title: p.title,
    description: p.description || '',
    header: 'solid',
    nav: '',
    popup: false,
    noindex: Boolean(p.noindex),
  },
  render: () => `
<section class="page-head">
  <div class="container article__narrow">
    <h1>${esc(p.title)}</h1>
    ${p.updated ? `<p class="news-card__meta">Last updated <time datetime="${esc(String(p.updated).slice(0, 10))}">${formatDate(String(p.updated).slice(0, 10))}</time></p>` : ''}
  </div>
</section>
<div class="container article__narrow prose">${p.body}</div>`,
}));
