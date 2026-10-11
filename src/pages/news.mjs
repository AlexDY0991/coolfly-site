// One page per article in content/news/*.md, published at news/<slug>.html.

import { news, settings } from '../content.mjs';
import { newsCard } from './newsroom.mjs';
import { dealerBand, esc, formatDate, icon } from '../partials/ui.mjs';

export const pages = news.map((n) => ({
  meta: {
    slug: `news/${n.slug}`,
    title: n.seoTitle || n.title,
    description: n.seoDescription || n.excerpt || '',
    image: n.cover || '',
    header: 'solid',
    nav: 'news',
    ogType: 'article',
    lastmod: n.date,
    jsonLd: [articleLd(n)],
  },
  render: () => render(n),
}));

function render(n) {
  const related = news.filter((o) => o.slug !== n.slug).slice(0, 3);
  return `
<article class="article">
  <header class="page-head article__head">
    <div class="container article__narrow">
      <a class="text-link article__back" href="newsroom.html">${icon('arrow', 'icon icon--back')}Newsroom</a>
      <p class="news-card__meta"><time datetime="${esc(n.date)}">${formatDate(n.date)}</time>${n.category ? `<span>${esc(n.category)}</span>` : ''}</p>
      <h1>${esc(n.title)}</h1>
      ${n.excerpt ? `<p class="lede">${esc(n.excerpt)}</p>` : ''}
    </div>
  </header>
  ${n.cover ? `<figure class="container article__cover"><img src="${esc(n.cover)}" alt="${esc(n.coverAlt || '')}"></figure>` : ''}
  <div class="container article__narrow prose">
    ${n.body}
  </div>
</article>

${
  related.length
    ? `<section class="section">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>More news</h2>
      <a class="text-link" href="newsroom.html">All news${icon('arrow')}</a>
    </div>
    <div class="news__grid">${related.map(newsCard).join('')}</div>
  </div>
</section>`
    : ''
}

${dealerBand()}`;
}

function articleLd(n) {
  const base = settings.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: n.title,
    datePublished: n.date,
    description: n.excerpt || undefined,
    image: n.cover ? [`${base}/${String(n.cover).replace(/^\/+/, '')}`] : undefined,
    mainEntityOfPage: `${base}/news/${n.slug}.html`,
    publisher: { '@type': 'Organization', name: settings.siteName, logo: { '@type': 'ImageObject', url: `${base}/assets/img/logo-dark.png` } },
  };
}
