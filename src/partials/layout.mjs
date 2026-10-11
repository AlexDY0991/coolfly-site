import { contacts, nav, offices, site, social } from '../data/site.mjs';
import { esc, icon } from './ui.mjs';

// meta: { slug, title, description, nav, header: 'overlay' | 'solid', image }
export function layout(meta, main) {
  const title = meta.title ? `${meta.title} | ${site.name}` : `${site.name} | Personal electric aircraft`;
  const description = meta.description || site.description;
  const canonical = `${site.url}/${meta.slug === 'index' ? '' : `${meta.slug}.html`}`;
  const image = `${site.url}/${meta.image || 'assets/img/og.jpg'}`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0c1115">${process.env.SITE_PREVIEW ? '\n<meta name="robots" content="noindex, nofollow">' : ''}
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
${meta.preloadImage ? `<link rel="preload" as="image" href="${meta.preloadImage}">\n` : ''}<link rel="preload" href="assets/fonts/archivo-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js');</script>
</head>
<body class="page-${meta.slug}">
<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
${header(meta)}
<main id="main" tabindex="-1">
${main}
</main>
${footer()}
<a class="to-top" href="#main" aria-label="Back to top" data-to-top>${icon('arrow', 'icon icon--up')}</a>
${meta.popup === false ? '' : dealerPopup()}
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

function header(meta) {
  const items = nav
    .map((item) => {
      const current = item.key === meta.nav ? ' aria-current="page"' : '';
      if (!item.children) {
        return `<li><a class="nav__link" href="${item.href}"${current}>${esc(item.label)}</a></li>`;
      }
      const links = item.children
        .map(
          (c) =>
            `<li><a href="${c.href}"><span>${esc(c.label)}</span>${c.note ? `<small>${esc(c.note)}</small>` : ''}</a></li>`
        )
        .join('');
      return `<li class="nav__group">
        <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="menu-${item.key}"${item.key === meta.nav ? ' data-current' : ''}>${esc(item.label)}${icon('chevron')}</button>
        <ul class="nav__menu" id="menu-${item.key}">${links}</ul>
      </li>`;
    })
    .join('');

  const mobileItems = nav
    .flatMap((item) => (item.children ? item.children.slice(0, 3).map((c) => ({ ...c, sub: true })) : [item]))
    .map(
      (i) =>
        `<li><a href="${i.href}"${i.sub ? ' class="is-sub"' : ''}>${esc(i.label)}${i.note ? `<small>${esc(i.note)}</small>` : ''}</a></li>`
    )
    .join('');

  return `<header class="site-header" data-variant="${meta.header || 'solid'}">
  <div class="container site-header__bar">
    <a class="brand" href="index.html" aria-label="CoolFly home">
      <img class="brand__light" src="assets/img/logo-light.png" alt="CoolFly" width="160" height="34">
      <img class="brand__dark" src="assets/img/logo-dark.png" alt="" width="160" height="34" aria-hidden="true">
    </a>
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">${items}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="btn btn--primary btn--sm" href="dealers.html">Become a dealer</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
        ${icon('menu', 'icon menu-toggle__open')}${icon('close', 'icon menu-toggle__close')}
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <ul>${mobileItems}</ul>
    <a class="btn btn--primary" href="dealers.html">Become a dealer${icon('arrow')}</a>
  </div>
</header>`;
}

function footer() {
  const col = (title, links) => `<div class="footer__col">
      <h2 class="footer__title">${title}</h2>
      <ul>${links.map(([label, href, ext]) => `<li><a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${esc(label)}</a></li>`).join('')}</ul>
    </div>`;

  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <img src="assets/img/logo-light.png" alt="CoolFly" width="150" height="32">
        <p>${esc(site.tagline)} Personal electric aircraft, designed and built in Hangzhou.</p>
        <ul class="footer__offices">
          ${offices.map((o) => `<li><strong>${esc(o.city)}</strong> ${esc(o.role)}</li>`).join('')}
        </ul>
      </div>
      ${col('Aircraft', [
        ['Urban', 'urban.html'],
        ['Dream ST', 'dream-st.html'],
        ['Dream PRO', 'dream-pro.html'],
        ['Compare models', 'compare.html'],
        ['Safety & technology', 'safety.html'],
      ])}
      ${col('Partners', [
        ['Become a dealer', 'dealers.html'],
        ['How partnership works', 'dealers.html#process'],
        ['Dealer FAQ', 'dealers.html#faq'],
        ['Contact sales', 'contact.html#sales'],
      ])}
      ${col('Company', [
        ['About CoolFly', 'company.html'],
        ['Milestones', 'company.html#milestones'],
        ['Newsroom', 'https://coolflyaircraft.com/newsroom/', true],
        ['Contact', 'contact.html'],
      ])}
      <div class="footer__col">
        <h2 class="footer__title">Contact</h2>
        <ul class="footer__contact">
          <li><span>Dealers &amp; partnerships</span><a href="mailto:${contacts.business}">${contacts.business}</a></li>
          <li><span>Customer support</span><a href="mailto:${contacts.support}">${contacts.support}</a></li>
          <li><span>Press</span><a href="mailto:${contacts.press}">${contacts.press}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> CoolFly. Specifications are subject to change. Local regulations apply to every flight.</p>
      <ul class="footer__social">
        ${social.map((s) => `<li><a href="${s.href}" rel="noopener" target="_blank">${esc(s.label)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</footer>`;
}

// Dealer recruitment pop-up, shown once per visitor (see site.js).
function dealerPopup() {
  return `<dialog class="popup" id="dealer-popup" aria-labelledby="popup-title">
  <div class="popup__media">
    <img src="assets/img/f-coast.jpg" alt="" loading="lazy">
    <div class="popup__media-copy">
      <p class="eyebrow">Dealer programme</p>
      <h2 id="popup-title" tabindex="-1">Bring CoolFly to your market</h2>
      <p>We are appointing dealers around the world.</p>
    </div>
    <button class="popup__close" type="button" aria-label="Close" data-popup-close>${icon('close')}</button>
  </div>
  <form class="popup__form" data-form="dealer" data-source="popup" novalidate>
    <div class="form__row">
      <div class="field"><label for="p-first">First name</label><input id="p-first" name="firstName" required autocomplete="given-name"></div>
      <div class="field"><label for="p-last">Last name</label><input id="p-last" name="lastName" required autocomplete="family-name"></div>
    </div>
    <div class="field"><label for="p-company">Company</label><input id="p-company" name="company" required autocomplete="organization"></div>
    <div class="form__row">
      <div class="field"><label for="p-email">Email</label><input id="p-email" name="email" type="email" required autocomplete="email"></div>
      <div class="field"><label for="p-country">Country</label><input id="p-country" name="country" required autocomplete="country-name"></div>
    </div>
    <div class="form__actions">
      <button class="btn btn--primary" type="submit">Get the dealer brief${icon('arrow')}</button>
      <a class="popup__more" href="dealers.html">See the programme</a>
    </div>
    <p class="form__status" role="status" aria-live="polite"></p>
  </form>
</dialog>`;
}
