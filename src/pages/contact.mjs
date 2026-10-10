import { aircraft } from '../data/aircraft.mjs';
import { contacts, offices } from '../data/site.mjs';
import { esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'contact',
  title: 'Contact',
  description: 'Contact CoolFly about dealerships, demonstration flights, customer support or press enquiries.',
  header: 'solid',
  nav: 'contact',
  popup: false,
};

export function render() {
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow('Contact')}
    <h1>Talk to CoolFly</h1>
    <p class="lede">Choose the team that fits your question, or send a message below and we will route it for you.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <ul class="routes">
      <li id="sales">
        <h2>Dealers &amp; partnerships</h2>
        <p>Becoming a dealer, distribution, demonstration flights and commercial operations.</p>
        <a href="mailto:${contacts.business}">${contacts.business}</a>
      </li>
      <li>
        <h2>Customer support</h2>
        <p>Owners and pilots with questions about their aircraft, service or training.</p>
        <a href="mailto:${contacts.support}">${contacts.support}</a>
      </li>
      <li>
        <h2>Press &amp; media</h2>
        <p>Interviews, images, film and event requests.</p>
        <a href="mailto:${contacts.press}">${contacts.press}</a>
      </li>
    </ul>
  </div>
</section>

<section class="section section--mist">
  <div class="container contact">
    <div class="contact__info">
      ${eyebrow('Headquarters')}
      <h2>Hangzhou, China</h2>
      <p>${esc(contacts.address)}</p>
      <dl class="contact__list">
        <div><dt>Phone</dt><dd>${esc(contacts.phone)}</dd></div>
        <div><dt>Hours</dt><dd>${esc(contacts.hours)}</dd></div>
      </dl>
      <h3 class="contact__sub">Offices</h3>
      <ul class="contact__offices">
        ${offices.map((o) => `<li><strong>${esc(o.city)}</strong> ${esc(o.role)}</li>`).join('')}
      </ul>
    </div>
    <form class="form" data-form="contact" novalidate>
      <div class="field">
        <label for="c-topic">What is this about?</label>
        <select id="c-topic" name="topic" required>
          <option value="">Choose a topic</option>
          <option value="dealer">Becoming a dealer</option>
          <option value="demo">Demonstration flight</option>
          <option value="buy">Buying an aircraft</option>
          <option value="support">Owner support</option>
          <option value="press">Press</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div class="field">
        <label for="c-model">Aircraft (optional)</label>
        <select id="c-model" name="model">
          <option value="">Not sure yet</option>
          ${aircraft.map((a) => `<option value="${a.slug}">${esc(a.name)}</option>`).join('')}
        </select>
      </div>
      <div class="form__row">
        <div class="field"><label for="c-name">Name</label><input id="c-name" name="name" required autocomplete="name"></div>
        <div class="field"><label for="c-email">Email</label><input id="c-email" name="email" type="email" required autocomplete="email"></div>
      </div>
      <div class="form__row">
        <div class="field"><label for="c-phone">Phone</label><input id="c-phone" name="phone" type="tel" autocomplete="tel"></div>
        <div class="field"><label for="c-country">Country</label><input id="c-country" name="country" required autocomplete="country-name"></div>
      </div>
      <div class="field"><label for="c-message">Message</label><textarea id="c-message" name="message" rows="5" required></textarea></div>
      <label class="check check--consent"><input type="checkbox" name="consent" required> I agree that CoolFly may store these details to reply to my enquiry.</label>
      <div class="form__actions">
        <button class="btn btn--primary" type="submit">Send message${icon('arrow')}</button>
        <p class="form__status" role="status" aria-live="polite"></p>
      </div>
    </form>
  </div>
</section>`;
}
