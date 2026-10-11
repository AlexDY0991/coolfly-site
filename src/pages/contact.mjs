import { aircraft, seo, settings } from '../content.mjs';
import { t } from '../i18n.mjs';
import { esc, eyebrow, icon } from '../partials/ui.mjs';

const { contacts, offices } = settings;

export const meta = {
  slug: 'contact',
  title: seo.contact.title,
  description: seo.contact.description,
  image: seo.contact.image,
  header: 'solid',
  nav: 'contact',
  popup: false,
};

export function render() {
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow(t('contact.eyebrow'))}
    <h1>${esc(t('contact.title'))}</h1>
    <p class="lede">${esc(t('contact.lede'))}</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <ul class="routes">
      <li id="sales">
        <h2>${esc(t('contact.salesTitle'))}</h2>
        <p>${esc(t('contact.salesText'))}</p>
        <a href="mailto:${contacts.business}" data-track="email_click">${contacts.business}</a>
      </li>
      <li>
        <h2>${esc(t('contact.supportTitle'))}</h2>
        <p>${esc(t('contact.supportText'))}</p>
        <a href="mailto:${contacts.support}" data-track="email_click">${contacts.support}</a>
      </li>
      <li>
        <h2>${esc(t('contact.pressTitle'))}</h2>
        <p>${esc(t('contact.pressText'))}</p>
        <a href="mailto:${contacts.press}" data-track="email_click">${contacts.press}</a>
      </li>
    </ul>
  </div>
</section>

<section class="section section--mist">
  <div class="container contact">
    <div class="contact__info">
      ${eyebrow(t('contact.hq'))}
      <h2>${esc(t('contact.hqCity'))}</h2>
      <p>${esc(contacts.address)}</p>
      <dl class="contact__list">
        <div><dt>${esc(t('contact.phone'))}</dt><dd>${esc(contacts.phone)}</dd></div>
        <div><dt>${esc(t('contact.hours'))}</dt><dd>${esc(contacts.hours)}</dd></div>
      </dl>
      <h3 class="contact__sub">${esc(t('contact.offices'))}</h3>
      <ul class="contact__offices">
        ${offices.map((o) => `<li><strong>${esc(o.city)}</strong> ${esc(o.role)}</li>`).join('')}
      </ul>
    </div>
    <form class="form" data-form="contact" novalidate>
      <div class="field">
        <label for="c-topic">${esc(t('form.topic'))}</label>
        <select id="c-topic" name="topic" required>
          <option value="">${esc(t('form.chooseTopic'))}</option>
          ${t('form.topics').map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}
        </select>
      </div>
      <div class="field">
        <label for="c-model">${esc(t('form.aircraftOptional'))}</label>
        <select id="c-model" name="model">
          <option value="">${esc(t('form.notSure'))}</option>
          ${aircraft.map((a) => `<option value="${a.slug}">${esc(a.name)}</option>`).join('')}
        </select>
      </div>
      <div class="form__row">
        <div class="field"><label for="c-name">${esc(t('form.name'))}</label><input id="c-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="c-email">${esc(t('form.email'))}</label><input id="c-email" name="email" type="email" required autocomplete="email"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="c-phone">${esc(t('form.phone'))}</label><input id="c-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="c-country">${esc(t('form.country'))}</label><input id="c-country" name="country" required autocomplete="country-name"></div>
      </div>
      <div class="field"><label for="c-message">${esc(t('form.message'))}</label><textarea id="c-message" name="message" rows="5" required></textarea></div>
      <label class="check check--consent"><input type="checkbox" name="consent" required> ${esc(t('common.consent'))}</label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">${esc(t('form.sendMessage'))}${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>
</section>`;
}
