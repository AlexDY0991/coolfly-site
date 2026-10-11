import { aircraft, dealers, seo, settings } from '../content.mjs';
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
  <img class="product-hero__img" src="${esc(hero.image)}" alt="The Urban global launch stage in Hangzhou" width="1600" height="900" data-parallax>
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow product-hero__eyebrow">Dealer programme</p>
    <h1 class="product-hero__title product-hero__title--md"><span class="line"><span>${esc(hero.titleLine1)}</span></span><span class="line"><span>${esc(hero.titleLine2)}</span></span></h1>
    <p class="product-hero__tagline">${esc(hero.tagline)}</p>
    <div class="actions product-hero__actions">
      ${button('Apply now', '#apply', 'primary')}
      ${button('How it works', '#process', 'ghost-light')}
    </div>
  </div>
</section>

<section class="section">
  <div class="container why">
    <div class="section-head" data-reveal>
      ${eyebrow('Why CoolFly')}
      <h2>Why partner with CoolFly</h2>
    </div>
    <div class="why__grid">
      ${why.map((w) => `<article data-reveal><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--mist" id="regions">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow('Where we are recruiting')}
      <h2>Priority regions</h2>
      <p class="section-head__note">Looking for a dealer near you? Email <a href="mailto:${contacts.business}">${contacts.business}</a>.</p>
    </div>
    <ul class="regions">
      ${regions.map((r) => `<li data-reveal><span class="regions__status">Open</span><h3>${esc(r.name)}</h3><p>${esc(r.note)}</p></li>`).join('')}
    </ul>
    <div class="presence">
      <p class="presence__label">CoolFly today</p>
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
      ${eyebrow('Support')}
      <h2>What partners receive</h2>
    </div>
    <ul class="support-grid">
      ${support.map((x) => `<li data-reveal><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section" id="process">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow('How partnership works')}
      <h2>From application to first delivery</h2>
    </div>
    <ol class="steps">
      ${steps.map((x, i) => `<li data-reveal><span class="steps__num">Step ${i + 1}</span><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></li>`).join('')}
    </ol>
  </div>
</section>

<section class="section section--mist" id="apply">
  <div class="container apply">
    <div class="apply__intro" data-reveal>
      ${eyebrow('Dealer application')}
      <h2>Apply to become a CoolFly dealer</h2>
      <p>Prefer email? <a href="mailto:${contacts.business}">${contacts.business}</a></p>
      <div class="apply__kit">
        <h3>Dealer kit</h3>
        <p>${esc(dealers.kitText)}</p>
      </div>
    </div>
    <form class="form" data-form="dealer" novalidate>
      <div class="form__row">
        <div class="field"><label for="d-company">Company name</label><input id="d-company" name="company" required autocomplete="organization"></div>
        <div class="field"><label for="d-website">Website</label><input id="d-website" name="website" type="url" inputmode="url" placeholder="https://" autocomplete="url"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-name">Your name</label><input id="d-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="d-role">Role</label><input id="d-role" name="role" autocomplete="organization-title"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-email">Email</label><input id="d-email" name="email" type="email" required autocomplete="email"></div>
        <div class="field"><label for="d-phone">Phone</label><input id="d-phone" name="phone" type="tel" autocomplete="tel"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="d-country">Country</label><input id="d-country" name="country" required autocomplete="country-name"></div>
        <div class="field"><label for="d-territory">Territory you want to cover</label><input id="d-territory" name="territory" placeholder="e.g. Southern France, Ontario"></div>
      </div>
      <div class="form__row">
        <div class="field">
          <label for="d-business">Current business</label>
          <select id="d-business" name="business" required>
            <option value="">Choose one</option>
            <option>Powersports or marine dealer</option>
            <option>Aircraft or drone dealer</option>
            <option>Flight school or aviation services</option>
            <option>Tourism or resort operator</option>
            <option>Premium automotive dealer</option>
            <option>Distributor or importer</option>
            <option>Other</option>
          </select>
        </div>
        <div class="field">
          <label for="d-volume">Expected aircraft in year one</label>
          <select id="d-volume" name="volume">
            <option value="">Choose a range</option>
            <option>1–5</option>
            <option>6–20</option>
            <option>21–50</option>
            <option>More than 50</option>
          </select>
        </div>
      </div>
      <fieldset class="field field--checks">
        <legend>Models of interest</legend>
        ${aircraft.map((a) => `<label class="check"><input type="checkbox" name="models" value="${a.slug}"> ${esc(a.name)}</label>`).join('')}
      </fieldset>
      <div class="field"><label for="d-message">Tell us about your plans</label><textarea id="d-message" name="message" rows="5" placeholder="Your customers, showroom or service facilities, and any aviation experience."></textarea></div>
      <label class="check check--consent"><input type="checkbox" name="consent" required> I agree that CoolFly may store these details to respond to my application.</label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">Send application${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>
</section>

<section class="section" id="faq">
  <div class="container faq">
    <div class="section-head" data-reveal>
      ${eyebrow('Dealer FAQ')}
      <h2>Questions partners ask us</h2>
    </div>
    <div class="faq__list">
      ${faqs.map((f) => `<details><summary>${esc(f.question)}${icon('chevron')}</summary><p>${esc(f.answer)}</p></details>`).join('')}
    </div>
  </div>
</section>`;
}
