import { aircraft, seo } from '../content.mjs';
import { t } from '../i18n.mjs';
import { flightTimeNote } from './aircraft.mjs';
import { dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'compare',
  title: seo.compare.title,
  description: seo.compare.description,
  image: seo.compare.image,
  header: 'solid',
  nav: 'aircraft',
};

// Specs are looked up by their stable key, so labels can be translated.
const spec = (a, key) => a.specs.find((s) => s.key === key)?.value;

const compareRows = () => [
  [t('compare.row.position'), (a) => a.stance],
  [t('compare.row.control'), (a) => (a.slug === 'urban' ? t('compare.val.controlUrban') : t('compare.val.controlDream'))],
  [t('compare.row.topSpeed'), (a) => spec(a, 'topSpeed') ?? t('common.toBePublished')],
  [t('compare.row.flightTime'), (a) => spec(a, 'flightTime')?.replace('*', '')],
  [t('compare.row.payload'), (a) => spec(a, 'payload')],
  [t('compare.row.weight'), (a) => spec(a, 'weight') ?? t('common.toBePublished')],
  [t('compare.row.dimensions'), (a) => spec(a, 'dimensions')],
  [t('compare.row.propulsion'), (a) => (a.slug === 'urban' ? t('compare.val.propUrban') : t('compare.val.propDream'))],
  [t('compare.row.parachute'), () => t('compare.val.parachute')],
  [t('compare.row.ip'), () => 'IP65'],
  [t('compare.row.bestFor'), (a) => spec(a, 'applications')],
];

export function render() {
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow(t('compare.eyebrow'))}
    <h1>${esc(t('compare.title'))}</h1>
    <p class="lede">${esc(t('compare.lede'))}</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="compare-heads">
      ${aircraft
        .map(
          (a) => `<a class="compare-head" data-reveal href="${a.slug}.html">
          <img src="${esc(a.image)}" alt="${esc(a.imageAlt)}">
          <span class="compare-head__stance">${esc(a.stance)}</span>
          <span class="compare-head__name">${esc(a.name)}</span>
          <span class="text-link">${esc(t('compare.view', { name: a.name }))}${icon('arrow')}</span>
        </a>`
        )
        .join('')}
    </div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="${esc(t('compare.tableLabel'))}">
      <table class="compare-table">
        <thead>
          <tr><th scope="col">${esc(t('compare.spec'))}</th>${aircraft.map((a) => `<th scope="col">${esc(a.name)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${compareRows()
            .map(([label, get]) => `<tr><th scope="row">${esc(label)}</th>${aircraft.map((a) => `<td>${esc(get(a) ?? '—')}</td>`).join('')}</tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
    <p class="footnote">* ${esc(flightTimeNote)}</p>
  </div>
</section>

<section class="section section--mist">
  <div class="container chooser">
    <div class="section-head" data-reveal>
      ${eyebrow(t('compare.chooseEyebrow'))}
      <h2>${esc(t('compare.chooseTitle'))}</h2>
    </div>
    <div class="chooser__grid">
      <article data-reveal><h3>${esc(t('compare.choose1Title'))}</h3><p>${esc(t('compare.choose1Text'))} <a href="urban.html">Urban</a></p></article>
      <article data-reveal><h3>${esc(t('compare.choose2Title'))}</h3><p>${esc(t('compare.choose2Text'))} <a href="dream-st.html">Dream ST</a></p></article>
      <article data-reveal><h3>${esc(t('compare.choose3Title'))}</h3><p>${esc(t('compare.choose3Text'))} <a href="dream-pro.html">Dream PRO</a></p></article>
    </div>
  </div>
</section>

${dealerBand()}`;
}
