import { aircraft, dealers, seo, settings } from '../content.mjs';
import { t } from '../i18n.mjs';
import { button, esc, eyebrow, icon } from '../partials/ui.mjs';

const { contacts, offices } = settings;
const { hero, why, regions, support, process: steps, faqs } = dealers;

export const meta = {
  slug: 'dealers',
  title: seo.dealers.title,
  description: seo.dealers.description,
  image: seo.dealers.image || hero.image,
  header: 'overlay',
  nav: 'dealers',
  popup: false,
  jsonLd: [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    },
  ],
};

export function render() {
  return `
<section class="product-hero product-hero--short">
  <img class="product-hero__img" src="${esc(hero.image)}" alt="${esc(t('dealers.heroAlt'))}" width="1600" height="900" data-parallax>
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow product-hero__eyebrow">${esc(t('dealers.eyebrow'))}</p>
    <h1 class="product-hero__title product-hero__title--md"><span class="line"><span>${esc(hero.titleLine1)}</span></span><span class="line"><span>${esc(hero.titleLine2)}</span></span></h1>
    <p class="product-hero__tagline">${esc(hero.tagline)}</p>
    <div class="actions product-hero__actions">
      ${button(t('dealers.apply'), '#apply', 'primary')}
      ${button(t('dealers.how'), '#process', 'ghost-light')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container why">
    <div class="section-head" data-reveal>
      ${eyebrow(t('dealers.whyEyebrow'))}
      <h2>${esc(t('dealers.whyTitle'))}</h2>
    </div>
    <div class="why__grid">
      ${why.map((w) => `<article data-reveal><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--mist" id="regions">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow(t('dealers.regionsEyebrow'))}
      <h2>${esc(t('dealers.regionsTitle'))}</h2>
      <p class="section-head__note">${esc(t('dealers.regionsNote'))} <a href="mailto:${contacts.business}">${contacts.business}</a>.</p>
    </div>
    <ul class="regions">
      ${regions.map((r) => `<li data-reveal><span class="regions__status">${esc(t('dealers.open'))}</span><h3>${esc(r.name)}</h3><p>${esc(r.note)}</p></li>`).join('')}
    </ul>
    <div class="presence">
      <p class="presence__label">${esc(t('dealers.today'))}</p>
      <ul>
        ${offices.map((o) => `<li><strong>${esc(o.city)}</strong>${esc(o.role)}</li>`).join('')}
        ${dealers.presence ? `<li><strong>${esc(dealers.presence.split(':')[0])}</strong>${esc(dealers.presence.split(':').slice(1).join(':').trim())}</li>` : ''}
      </ul>
    </div>
  </div>
</section>

<section class="section section--night" id="support">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow(t('dealers.supportEyebrow'))}
      <h2>${esc(t('dealers.supportTitle'))}</h2>
    </div>
    <ul class="support-grid">
      ${support.map((x) => `<li data-reveal><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="process">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow(t('dealers.processEyebrow'))}
      <h2>${esc(t('dealers.processTitle'))}</h2>
    </div>
    <ol class="steps">
      ${steps.map((x, i) => `<li data-reveal><span class="steps__num">${esc(t('dealers.step', { n: i + 1 }))}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--mist" id="apply">
  <div class="container apply">
    <div class="apply__intro" data-reveal>
      ${eyebrow(t('dealers.formEyebrow'))}
      <h2>${esc(t('dealers.formTitle'))}</h2>
      <p>${esc(t('dealers.preferEmail'))} <a href="mailto:${contacts.business}">${contacts.business}</a></p>
      <div class="apply__kit">
        <h3>${esc(t('dealers.kit'))}</h3>
        <p>${esc(dealers.kitText)}</p>
      </div>
    </div>
    <form class="form" data-form="dealer" novalidate>
      <div class="form__row">
        <div class="field"><label for="d-company">${esc(t('form.companyName'))}</label><input id="d-company" name="company" required autocomplete="organization"></div>
        <div class="field"><label for="d-website">${esc(t('form.website'))}</label><input id="d-website" name="website" type="url" inputmode="url" placeholder="https://" autocomplete="url"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-name">${esc(t('form.yourName'))}</label><input id="d-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="d-role">${esc(t('form.role'))}</label><input id="d-role" name="role" autocomplete="organization-title"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-email">${esc(t('form.email'))}</label><input id="d-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="d-phone">${esc(t('form.phone'))}</label><input id="d-phone" name="phone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-country">${esc(t('form.country'))}</label><input id="d-country" name="country" required autocomplete="country-name"></div>
        <div class="field"><label for="d-territory">${esc(t('form.territory'))}</label><input id="d-territory" name="territory" placeholder="${esc(t('form.territoryHint'))}"></div>
      </div>
      <div class="form__row">
        <div class="field">
          <label for="d-business">${esc(t('form.business'))}</label>
          <select id="d-business" name="business" required>
            <option value="">${esc(t('form.chooseOne'))}</option>
            ${t('form.businessOptions').map((o) => `<option>${esc(o)}</option>`).join('')}
          </select>
        </div>
        <div class="field">
          <label for="d-volume">${esc(t('form.volume'))}</label>
          <select id="d-volume" name="volume">
            <option value="">${esc(t('form.chooseRange'))}</option>
            ${t('form.volumeOptions').map((o) => `<option>${esc(o)}</option>`).join('')}
          </select>
        </div>
      </div>
      <fieldset class="field field--checks">
        <legend>${esc(t('form.models'))}</legend>
        ${aircraft.map((a) => `<label class="check"><input type="checkbox" name="models" value="${a.slug}"> ${esc(a.name)}</label>`).join('')}
      </fieldset>
      <div class="field"><label for="d-message">${esc(t('form.plans'))}</label><textarea id="d-message" name="message" rows="5" placeholder="${esc(t('form.plansHint'))}"></textarea></div>
      <label class="check check--consent"><input type="checkbox" name="consent" required> ${esc(t('common.consentApplication'))}</label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${esc(t('dealers.send'))}${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>
</section>

<section class="section" id="faq">
  <div class="container faq">
    <div class="section-head" data-reveal>
      ${eyebrow(t('dealers.faqEyebrow'))}
      <h2>${esc(t('dealers.faqTitle'))}</h2>
    </div>
    <div class="faq__list">
      ${faqs.map((f) => `<details><summary>${esc(f.question)}${icon('chevron')}</summary><p>${esc(f.answer)}</p></details>`).join('')}
    </div>
  </div>
</section>`;
}
