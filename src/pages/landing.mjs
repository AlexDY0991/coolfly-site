// Campaign landing pages from content/landing/*.md, published at lp/<slug>.html.
// Built for paid traffic: one offer, one form, optional minimal header.

import { aircraft, home, landingPages } from '../content.mjs';
import { t } from '../i18n.mjs';
import { button, esc, eyebrow, icon } from '../partials/ui.mjs';

export const pages = landingPages.map((p) => ({
  meta: {
    slug: `lp/${p.slug}`,
    title: p.seoTitle || p.headline || p.title,
    description: p.seoDescription || p.subheadline || '',
    image: p.shareImage || p.heroImage || '',
    header: 'overlay',
    nav: '',
    alt: 'index',
    popup: false,
    noindex: p.noindex !== false,
    minimalHeader: p.hideNavigation !== false,
    headerCta: { label: p.ctaLabel || t('dealers.apply'), href: '#form' },
    preloadImage: p.heroImage,
  },
  render: () => render(p),
}));

function render(p) {
  const models = aircraft.filter((a) => (p.aircraft || []).includes(a.slug));
  const photos = home.events?.photos || [];
  const source = `lp:${p.slug}`;
  return `
<section class="product-hero product-hero--short lp-hero">
  ${p.heroImage ? `<img class="product-hero__img" src="${esc(p.heroImage)}" alt="${esc(p.heroImageAlt || '')}" width="1920" height="1080" data-parallax>` : ''}
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    ${p.eyebrow ? `<p class="eyebrow product-hero__eyebrow">${esc(p.eyebrow)}</p>` : ''}
    <h1 class="product-hero__title product-hero__title--md"><span class="line"><span>${esc(p.headline || p.title)}</span></span></h1>
    ${p.subheadline ? `<p class="product-hero__tagline">${esc(p.subheadline)}</p>` : ''}
    <div class="actions product-hero__actions">
      ${button(p.ctaLabel || t('dealers.apply'), '#form', 'primary', ' data-track="landing_cta"')}
    </div>
  </div>
</section>

${
  p.benefits?.length
    ? `<section class="section">
  <div class="container">
    ${p.benefitsTitle ? `<div class="section-head" data-reveal><h2>${esc(p.benefitsTitle)}</h2></div>` : ''}
    <ul class="lp-benefits">
      ${p.benefits.map((b, i) => `<li data-reveal><span class="lp-benefits__num">0${i + 1}</span><h3>${esc(b.title)}</h3>${b.text ? `<p>${esc(b.text)}</p>` : ''}</li>`).join('')}
    </ul>
  </div>
</section>`
    : ''
}

${
  models.length
    ? `<section class="section section--mist">
  <div class="container">
    <div class="section-head" data-reveal><h2>${models.length > 1 ? esc(t('landing.lineup')) : esc(models[0].fullName)}</h2></div>
    <div class="lineup__grid lineup__grid--${models.length}">
      ${models
        .map(
          (a) => `<article class="model-card" data-reveal>
        <a class="model-card__link" href="${a.slug}.html">
          <div class="model-card__media"><img src="${esc(a.image)}" alt="${esc(a.imageAlt)}" loading="lazy"></div>
          <div class="model-card__body">
            <p class="model-card__stance">${esc(a.stance)}</p>
            <h3 class="model-card__name">${esc(a.name)}</h3>
            <p class="model-card__facts">${esc(a.cardFacts)}</p>
            <span class="model-card__go" aria-hidden="true">${icon('arrow')}</span>
          </div>
        </a>
      </article>`
        )
        .join('')}
    </div>
  </div>
</section>`
    : ''
}

${p.body ? `<section class="section"><div class="container article__narrow prose">${p.body}</div></section>` : ''}

${
  p.showEvents !== false && photos.length
    ? `<section class="section section--tight road">
  <div class="container"><div class="section-head" data-reveal><h2>${esc(home.events.title)}</h2></div></div>
  <div class="marquee"><ul class="marquee__track">
    ${[...photos, ...photos].map((r, i) => `<li${i >= photos.length ? ' aria-hidden="true"' : ''}><img src="${esc(r.image)}" alt="${i >= photos.length ? '' : esc(r.caption)}" loading="lazy"><span>${esc(r.caption)}</span></li>`).join('')}
  </ul></div>
</section>`
    : ''
}

<section class="section section--night lp-form" id="form">
  <div class="container apply">
    <div class="apply__intro" data-reveal>
      ${eyebrow(p.formType === 'demo' ? t('landing.demoEyebrow') : t('landing.dealerEyebrow'))}
      <h2>${esc(p.formTitle || t('landing.formTitle'))}</h2>
      ${p.formText ? `<p>${esc(p.formText)}</p>` : ''}
    </div>
    ${p.formType === 'demo' ? demoForm(source, p) : dealerForm(source, p)}
  </div>
</section>`;
}

const consent = () => `<label class="check check--consent"><input type="checkbox" name="consent" required> ${esc(t('common.consent'))}</label>`;

function dealerForm(source, p) {
  return `<form class="form" data-form="dealer" data-source="${esc(source)}" novalidate>
      <div class="form__row">
        <div class="field"><label for="l-first">${esc(t('form.firstName'))}</label><input id="l-first" name="firstName" required autocomplete="given-name"></div>
        <div class="field"><label for="l-last">${esc(t('form.lastName'))}</label><input id="l-last" name="lastName" required autocomplete="family-name"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="l-company">${esc(t('form.company'))}</label><input id="l-company" name="company" required autocomplete="organization"></div>
        <div class="field"><label for="l-website">${esc(t('form.website'))}</label><input id="l-website" name="website" type="url" placeholder="https://" autocomplete="url"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="l-email">${esc(t('form.email'))}</label><input id="l-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="l-phone">${esc(t('form.phone'))}</label><input id="l-phone" name="phone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="field"><label for="l-country">${esc(t('form.country'))}</label><input id="l-country" name="country" required autocomplete="country-name"></div>
      <div class="field"><label for="l-message">${esc(t('form.plansOptional'))}</label><textarea id="l-message" name="message" rows="4"></textarea></div>
      ${consent()}
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${esc(p.submitLabel || t('dealers.send'))}${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>`;
}

function demoForm(source, p) {
  return `<form class="form" data-form="contact" data-source="${esc(source)}" novalidate>
      <input type="hidden" name="topic" value="demo">
      <div class="form__row">
        <div class="field"><label for="l-name">${esc(t('form.name'))}</label><input id="l-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="l-email">${esc(t('form.email'))}</label><input id="l-email" name="email" type="email" required autocomplete="email"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="l-phone">${esc(t('form.phone'))}</label><input id="l-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="l-country">${esc(t('form.country'))}</label><input id="l-country" name="country" required autocomplete="country-name"></div>
      </div>
      <div class="field">
        <label for="l-model">${esc(t('form.aircraft'))}</label>
        <select id="l-model" name="model">
          <option value="">${esc(t('form.notSure'))}</option>
          ${aircraft.map((a) => `<option value="${a.slug}"${(p.aircraft || [])[0] === a.slug ? ' selected' : ''}>${esc(a.name)}</option>`).join('')}
        </select>
      </div>
      <div class="field"><label for="l-message">${esc(t('form.messageOptional'))}</label><textarea id="l-message" name="message" rows="4"></textarea></div>
      ${consent()}
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${esc(p.submitLabel || t('common.requestDemo'))}${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>`;
}
