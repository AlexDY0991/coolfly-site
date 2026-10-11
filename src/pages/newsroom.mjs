import { news, seo } from '../content.mjs';
import { dealerBand, esc, eyebrow, formatDate } from '../partials/ui.mjs';

export const meta = {
  slug: 'newsroom',
  title: seo.newsroom?.title || 'Newsroom',
  description: seo.newsroom?.description || '',
  image: seo.newsroom?.image || '',
  header: 'solid',
  nav: 'news',
};

export const categories = ['News', 'Events', 'Insights'];

export function newsCard(n) {
  return `<article class="news-card" data-reveal data-category="${esc(n.category || 'News')}">
    <a href="news/${esc(n.slug)}.html">
      <div class="news-card__img">${n.cover ? `<img src="${esc(n.cover)}" alt="${esc(n.coverAlt || '')}" loading="lazy">` : ''}</div>
      <p class="news-card__meta"><time datetime="${esc(n.date)}">${formatDate(n.date)}</time>${n.category ? `<span>${esc(n.category)}</span>` : ''}</p>
      <h3>${esc(n.title)}</h3>
    </a>
  </article>`;
}

export function render() {
  const [lead, ...rest] = news;
  const used = categories.filter((c) => news.some((n) => (n.category || 'News') === c));
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow('Newsroom')}
    <h1>News and stories</h1>
  </div>
</section>

${
  lead
    ? `<section class="section section--tight">
  <div class="container">
    <a class="news-lead" href="news/${esc(lead.slug)}.html" data-reveal>
      <div class="news-lead__img">${lead.cover ? `<img src="${esc(lead.cover)}" alt="${esc(lead.coverAlt || '')}">` : ''}</div>
      <div class="news-lead__copy">
        <p class="news-card__meta"><time datetime="${esc(lead.date)}">${formatDate(lead.date)}</time>${lead.category ? `<span>${esc(lead.category)}</span>` : ''}</p>
        <h2>${esc(lead.title)}</h2>
        ${lead.excerpt ? `<p>${esc(lead.excerpt)}</p>` : ''}
      </div>
    </a>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    ${
      used.length > 1
        ? `<div class="chips" role="group" aria-label="Filter news" data-filter>
      <button class="chip" type="button" aria-pressed="true" data-filter-value="">All</button>
      ${used.map((c) => `<button class="chip" type="button" aria-pressed="false" data-filter-value="${esc(c)}">${esc(c)}</button>`).join('')}
    </div>`
        : ''
    }
    <div class="news__grid news__grid--archive">
      ${rest.map(newsCard).join('')}
    </div>
  </div>
</section>`
    : `<section class="section"><div class="container"><p class="lede">News will appear here soon.</p></div></section>`
}

${dealerBand()}`;
}
