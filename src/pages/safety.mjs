import { seo } from '../content.mjs';
import { t } from '../i18n.mjs';
import { button, dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'safety',
  title: seo.safety.title,
  description: seo.safety.description,
  image: seo.safety.image || 'assets/img/flight-controller.jpg',
  header: 'overlay',
  nav: 'safety',
};

const layers = () =>
  [1, 2, 3, 4].map((n) => ({
    title: t(`safety.layer${n}.title`),
    head: t(`safety.layer${n}.head`),
    text: t(`safety.layer${n}.text`),
    points: t(`safety.layer${n}.points`),
  }));

export function render() {
  return `
<section class="product-hero product-hero--short">
  <img class="product-hero__img" src="assets/img/flight-controller.jpg" alt="${esc(t('safety.heroAlt'))}" width="1100" height="1467" data-parallax>
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow product-hero__eyebrow">${esc(t('safety.eyebrow'))}</p>
    <h1 class="product-hero__title product-hero__title--md"><span class="line"><span>${esc(t('safety.title1'))}</span></span><span class="line"><span>${esc(t('safety.title2'))}</span></span></h1>
    <p class="product-hero__tagline">${esc(t('safety.lede'))}</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <ol class="layers">
      ${layers()
        .map(
          (l, i) => `<li class="layer" data-reveal>
          <p class="layer__index"><span>0${i + 1}</span>${esc(l.title)}</p>
          <h2>${esc(l.head)}</h2>
          <p>${esc(l.text)}</p>
          <ul>${l.points.map((p) => `<li>${icon('check')}${esc(p)}</li>`).join('')}</ul>
        </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section--night" id="rules">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow(t('safety.rulesEyebrow'))}
      <h2>${esc(t('safety.rulesTitle'))}</h2>
      <p class="section-head__note">${esc(t('safety.rulesNote'))}</p>
    </div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="${esc(t('safety.rulesTitle'))}" data-reveal>
      <table class="rules-table">
        <thead><tr><th scope="col">${esc(t('safety.rulesMarket'))}</th><th scope="col">${esc(t('safety.rulesFramework'))}</th><th scope="col">${esc(t('safety.rulesPilots'))}</th></tr></thead>
        <tbody>
          ${t('safety.rules')
            .map(([market, framework, pilots]) => `<tr><th scope="row">${esc(market)}</th><td>${esc(framework)}</td><td>${esc(pilots)}</td></tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container assurance">
    <article data-reveal>
      ${eyebrow(t('safety.insurance'))}
      <h2>${esc(t('safety.insuranceTitle'))}</h2>
      <p>${esc(t('safety.insuranceText'))}</p>
    </article>
    <article data-reveal>
      ${eyebrow(t('safety.conformity'))}
      <h2>${esc(t('safety.conformityTitle'))}</h2>
      <p>${esc(t('safety.conformityText'))}</p>
    </article>
    <article data-reveal>
      ${eyebrow(t('safety.training'))}
      <h2>${esc(t('safety.trainingTitle'))}</h2>
      <p>${esc(t('safety.trainingText'))}</p>
      ${button(t('safety.dealerSupport'), 'dealers.html#support', 'secondary')}
    </article>
  </div>
</section>

${dealerBand()}`;
}
