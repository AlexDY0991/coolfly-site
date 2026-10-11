import { company, milestones, news, seo, settings } from '../content.mjs';
import { newsCard } from './newsroom.mjs';
import { t } from '../i18n.mjs';
import { dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'company',
  title: seo.company.title,
  description: seo.company.description,
  image: seo.company.image,
  header: 'solid',
  nav: 'company',
};

export function render() {
  return `
<section class="page-head page-head--split">
  <div class="container page-head__grid">
    <div>
      ${eyebrow(t('company.eyebrow'))}
      <h1>${esc(company.title)}</h1>
      <p class="lede">${esc(company.lede)}</p>
    </div>
    <img src="${esc(company.image)}" alt="${esc(t('company.hqAlt'))}" width="1100" height="1467">
  </div>
</section>

<section class="section section--night">
  <div class="container quote">
    <img src="${esc(company.quoteImage)}" alt="${esc(company.quoteAuthor)}" loading="lazy" width="1000" height="1153">
    <blockquote data-reveal>
      <p>“${esc(company.quote)}”</p>
      <footer>${esc(company.quoteAuthor)}</footer>
    </blockquote>
  </div>
</section>

<section class="milestones" id="milestones" data-hscroll>
  <div class="milestones__sticky">
    <div class="container milestones__head">
      ${eyebrow(t('company.milestonesEyebrow'))}
      <h2>${esc(t('company.milestonesTitle'))}</h2>
    </div>
    <div class="milestones__viewport">
      <ol class="milestones__track">
        ${milestones
          .map(
            (m) => `<li class="ms" data-reveal>
            <span class="ms__node" aria-hidden="true"></span>
            <span class="ms__year">${esc(m.year)}</span>
            <ul class="ms__events">${(m.events || []).map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
          </li>`
          )
          .join('')}
      </ol>
      <div class="milestones__rail" aria-hidden="true"><span class="milestones__fill"></span></div>
    </div>
  </div>
</section>

<section class="section section--mist">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow(t('company.officesEyebrow'))}
      <h2>${esc(t('company.officesTitle'))}</h2>
    </div>
    <ul class="offices">
      ${settings.offices.map((o) => `<li data-reveal><h3>${esc(o.city)}</h3><p>${esc(o.country)}</p><p class="offices__role">${esc(o.role)}</p></li>`).join('')}
    </ul>
  </div>
</section>

${
  news.length
    ? `<section class="section news">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>${esc(t('company.recentNews'))}</h2>
      <a class="text-link" href="newsroom.html">${esc(t('common.allNews'))}${icon('arrow')}</a>
    </div>
    <div class="news__grid">
      ${news.slice(0, 3).map(newsCard).join('')}
    </div>
  </div>
</section>`
    : ''
}

${dealerBand()}`;
}
