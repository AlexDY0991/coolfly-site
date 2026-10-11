import { news, seo } from '../content.mjs';
import { t } from '../i18n.mjs';
import { dealerBand, esc, eyebrow, formatDate } from '../partials/ui.mjs';

export const meta = {
  slug: 'newsroom',
  title: seo.newsroom?.title || t('news.eyebrow'),
  description: seo.newsroom?.description || '',
  image: seo.newsroom?.image || '',
  header: 'solid',
  nav: 'news',
};

export const categories = ['News', 'Events', 'Insights'];

// Categories are stored in English in front matter and shown translated.
export const categoryLabel = (c) => (categories.includes(c) ? t(`cat.${c}`) : c);

export function newsCard(n) {
  return `<article class="news-card" data-reveal data-category="${esc(n.category || 'News')}">
    <a href="news/${esc(n.slug)}.html">
      <div class="news-card__img">${n.cover ? `<img src="${esc(n.cover)}" alt="${esc(n.coverAlt || '')}" loading="lazy">` : ''}</div>
      <p class="news-card__meta"><time datetime="${esc(n.date)}">${formatDate(n.date)}</time>${n.category ? `<span>${esc(categoryLabel(n.category))}</span>` : ''}</p>
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
    ${eyebrow(t('news.eyebrow'))}
    <h1>${esc(t('news.title'))}</h1>
  </div>
</section>

${
  lead
    ? `<section class="section section--tight">
  <div class="container">
    <a class="news-lead" href="news/${esc(lead.slug)}.html" data-reveal>
      <div class="news-lead__img">${lead.cover ? `<img src="${esc(lead.cover)}" alt="${esc(lead.coverAlt || '')}">` : ''}</div>
      <div class="news-lead__copy">
        <p class="news-card__meta"><time datetime="${esc(lead.date)}">${formatDate(lead.date)}</time>${lead.category ? `<span>${esc(categoryLabel(lead.category))}</span>` : ''}</p>
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
        ? `<div class="chips" role="group" aria-label="${esc(t('news.filter'))}" data-filter>
      <button class="chip" type="button" aria-pressed="true" data-filter-value="">${esc(t('news.all'))}</button>
      ${used.map((c) => `<button class="chip" type="button" aria-pressed="false" data-filter-value="${esc(c)}">${esc(categoryLabel(c))}</button>`).join('')}
    </div>`
        : ''
    }
    <div class="news__grid news__grid--archive">
      ${rest.map(newsCard).join('')}
    </div>
  </div>
</section>`
    : `<section class="section"><div class="container"><p class="lede">${esc(t('news.empty'))}</p></div></section>`
}

${dealerBand()}`;
}
