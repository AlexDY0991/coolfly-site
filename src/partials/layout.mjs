import { aircraft, settings, textPages } from '../content.mjs';
import { esc, icon } from './ui.mjs';

// Regions where analytics and ad cookies stay off until the visitor accepts
// (EEA, UK, Switzerland). Elsewhere they default to on and can be rejected.
const CONSENT_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH'];

const nav = () => [
  {
    label: 'Aircraft',
    key: 'aircraft',
    href: 'compare.html',
    children: [
      ...aircraft.map((a) => ({ label: a.name, note: a.stance, href: `${a.slug}.html` })),
      { label: 'Compare models', note: '', href: 'compare.html' },
    ],
  },
  { label: 'Safety', key: 'safety', href: 'safety.html' },
  { label: 'Dealers', key: 'dealers', href: 'dealers.html' },
  { label: 'News', key: 'news', href: 'newsroom.html' },
  { label: 'Company', key: 'company', href: 'company.html' },
  { label: 'Contact', key: 'contact', href: 'contact.html' },
];

// meta: { slug, title, description, image, nav, header: 'overlay' | 'solid',
//         popup, noindex, minimalHeader, headerCta, preloadImage, jsonLd, ogType }
export function layout(meta, main) {
  const site = settings;
  const base = site.siteUrl.replace(/\/$/, '');
  const title = meta.title ? `${meta.title} | ${site.siteName}` : `${site.siteName} | Personal electric aircraft`;
  const description = meta.description || site.defaultDescription;
  const canonical = `${base}/${meta.slug === 'index' ? '' : `${meta.slug}.html`}`;
  const image = absolute(base, meta.image || site.defaultShareImage);
  const noindex = meta.noindex || process.env.SITE_PREVIEW;
  const gtmId = (site.tracking?.gtmId || '').trim();
  const consentOn = Boolean(gtmId && site.consent?.enabled);
  const popupOn = meta.popup !== false && site.popup?.enabled;
  const privacy = textPages.find((p) => p.slug === site.consent?.privacyPage);

  const config = {
    gtm: Boolean(gtmId),
    consent: consentOn,
    forms: {
      provider: site.forms?.provider || 'none',
      webhookUrl: site.forms?.webhookUrl || '',
      hubspotPortalId: site.forms?.hubspotPortalId || '',
      hubspotForms: { dealer: site.forms?.hubspotDealerFormId || '', contact: site.forms?.hubspotContactFormId || '' },
      thankYouPage: site.forms?.thankYouPage !== false,
      fallbackEmail: { dealer: site.contacts.business, contact: site.contacts.support },
    },
    popup: {
      delayMs: Math.max(0, Number(site.popup?.delaySeconds ?? 15)) * 1000,
      scrollShare: Math.min(1, Math.max(0, Number(site.popup?.scrollPercent ?? 45) / 100)),
      snoozeDays: Number(site.popup?.snoozeDays ?? 7),
    },
  };

  const jsonLd = [organisationLd(base), ...(meta.jsonLd || [])];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<meta property="og:type" content="${meta.ogType || 'website'}">
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0c1115">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
${meta.preloadImage ? `<link rel="preload" as="image" href="${meta.preloadImage}">\n` : ''}<link rel="preload" href="assets/fonts/archivo-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js');window.COOLFLY=${safeJson(config)};</script>
${gtmId ? gtmHead(gtmId, consentOn) : ''}${jsonLd.map((d) => `<script type="application/ld+json">${safeJson(d)}</script>`).join('\n')}
</head>
<body class="page-${meta.slug.replace(/\//g, '-')}">
${gtmId ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(gtmId)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n` : ''}<a class="skip-link" href="#main">Skip to content</a>
<div class="scroll-progress" aria-hidden="true"></div>
${meta.minimalHeader ? minimalHeader(meta) : header(meta)}
<main id="main" tabindex="-1">
${main}
</main>
${footer(meta, privacy, consentOn)}
<a class="to-top" href="#main" aria-label="Back to top" data-to-top>${icon('arrow', 'icon icon--up')}</a>
${popupOn ? dealerPopup(site.popup) : ''}
${consentOn ? consentBanner(site.consent, privacy) : ''}
<script src="assets/js/site.js" defer></script>
</body>
</html>
`;
}

const safeJson = (value) => JSON.stringify(value).replace(/</g, '\\u003c');
const absolute = (base, path) => (/^https?:/.test(path) ? path : `${base}/${String(path).replace(/^\/+/, '')}`);

function gtmHead(id, consentOn) {
  const denied = "{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'";
  const granted = "{ad_storage:'granted',ad_user_data:'granted',ad_personalization:'granted',analytics_storage:'granted'}";
  return `<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
${
  consentOn
    ? `gtag('consent','default',${denied},region:${JSON.stringify(CONSENT_REGIONS)},wait_for_update:500});
gtag('consent','default',${granted});
try{var c=JSON.parse(localStorage.getItem('coolfly-consent')||'null');if(c){var v=c.accepted?'granted':'denied';gtag('consent','update',{ad_storage:v,ad_user_data:v,ad_personalization:v,analytics_storage:v});}}catch(e){}`
    : `gtag('consent','default',${granted});`
}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(id)});
</script>
`;
}

function organisationLd(base) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    url: `${base}/`,
    logo: `${base}/assets/img/logo-dark.png`,
    sameAs: (settings.social || []).map((s) => s.url),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', email: settings.contacts.business },
      { '@type': 'ContactPoint', contactType: 'customer support', email: settings.contacts.support },
    ],
  };
}

function header(meta) {
  const items = nav()
    .map((item) => {
      const current = item.key === meta.nav ? ' aria-current="page"' : '';
      if (!item.children) {
        return `<li><a class="nav__link" href="${item.href}"${current}>${esc(item.label)}</a></li>`;
      }
      const links = item.children
        .map((c) => `<li><a href="${c.href}"><span>${esc(c.label)}</span>${c.note ? `<small>${esc(c.note)}</small>` : ''}</a></li>`)
        .join('');
      return `<li class="nav__group">
        <button class="nav__link nav__toggle" type="button" aria-expanded="false" aria-controls="menu-${item.key}"${item.key === meta.nav ? ' data-current' : ''}>${esc(item.label)}${icon('chevron')}</button>
        <ul class="nav__menu" id="menu-${item.key}">${links}</ul>
      </li>`;
    })
    .join('');

  const mobileItems = nav()
    .flatMap((item) => (item.children ? item.children.filter((c) => c.note).map((c) => ({ ...c, sub: true })) : [item]))
    .map((i) => `<li><a href="${i.href}"${i.sub ? ' class="is-sub"' : ''}>${esc(i.label)}${i.note ? `<small>${esc(i.note)}</small>` : ''}</a></li>`)
    .join('');

  return `<header class="site-header" data-variant="${meta.header || 'solid'}">
  <div class="container site-header__bar">
    ${brand()}
    <nav class="nav" aria-label="Main">
      <ul class="nav__list">${items}</ul>
    </nav>
    <div class="site-header__actions">
      <a class="btn btn--primary btn--sm" href="dealers.html" data-track="become_dealer">Become a dealer</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu">
        ${icon('menu', 'icon menu-toggle__open')}${icon('close', 'icon menu-toggle__close')}
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <ul>${mobileItems}</ul>
    <a class="btn btn--primary" href="dealers.html" data-track="become_dealer">Become a dealer${icon('arrow')}</a>
  </div>
</header>`;
}

// Landing pages: logo and one call to action, so visitors stay on the offer.
function minimalHeader(meta) {
  const cta = meta.headerCta || { label: 'Apply now', href: '#form' };
  return `<header class="site-header site-header--minimal" data-variant="${meta.header || 'solid'}">
  <div class="container site-header__bar">
    ${brand()}
    <div class="site-header__actions site-header__actions--always">
      <a class="btn btn--primary btn--sm" href="${cta.href}" data-track="landing_header_cta">${esc(cta.label)}</a>
    </div>
  </div>
</header>`;
}

const brand = () => `<a class="brand" href="index.html" aria-label="CoolFly home">
      <img class="brand__light" src="assets/img/logo-light.png" alt="CoolFly" width="160" height="34">
      <img class="brand__dark" src="assets/img/logo-dark.png" alt="" width="160" height="34" aria-hidden="true">
    </a>`;

function footer(meta, privacy, consentOn) {
  const { contacts, offices = [], social = [], tagline } = settings;
  const col = (title, links) => `<div class="footer__col">
      <h2 class="footer__title">${title}</h2>
      <ul>${links.map(([label, href, ext]) => `<li><a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${esc(label)}</a></li>`).join('')}</ul>
    </div>`;

  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <img src="assets/img/logo-light.png" alt="CoolFly" width="150" height="32">
        <p>${esc(tagline)} Personal electric aircraft, designed and built in Hangzhou.</p>
        <ul class="footer__offices">
          ${offices.map((o) => `<li><strong>${esc(o.city)}</strong> ${esc(o.role)}</li>`).join('')}
        </ul>
      </div>
      ${col('Aircraft', [...aircraft.map((a) => [a.name, `${a.slug}.html`]), ['Compare models', 'compare.html'], ['Safety & technology', 'safety.html']])}
      ${col('Partners', [
        ['Become a dealer', 'dealers.html'],
        ['How partnership works', 'dealers.html#process'],
        ['Dealer FAQ', 'dealers.html#faq'],
        ['Contact sales', 'contact.html#sales'],
      ])}
      ${col('Company', [
        ['About CoolFly', 'company.html'],
        ['Milestones', 'company.html#milestones'],
        ['Newsroom', 'newsroom.html'],
        ['Contact', 'contact.html'],
      ])}
      <div class="footer__col">
        <h2 class="footer__title">Contact</h2>
        <ul class="footer__contact">
          <li><span>Dealers &amp; partnerships</span><a href="mailto:${esc(contacts.business)}" data-track="email_click">${esc(contacts.business)}</a></li>
          <li><span>Customer support</span><a href="mailto:${esc(contacts.support)}" data-track="email_click">${esc(contacts.support)}</a></li>
          <li><span>Press</span><a href="mailto:${esc(contacts.press)}" data-track="email_click">${esc(contacts.press)}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> CoolFly. Specifications are subject to change. Local regulations apply to every flight.</p>
      <ul class="footer__social">
        ${privacy ? `<li><a href="${privacy.slug}.html">${esc(privacy.title)}</a></li>` : ''}
        ${consentOn ? '<li><button class="footer__link-button" type="button" data-consent-open>Cookie settings</button></li>' : ''}
        ${social.map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.label)}</a></li>`).join('')}
      </ul>
    </div>
  </div>
</footer>`;
}

// Dealer recruitment pop-up, shown once per visitor (see site.js).
function dealerPopup(popup) {
  return `<dialog class="popup" id="dealer-popup" aria-labelledby="popup-title">
  <div class="popup__media">
    <img src="${esc(popup.image || 'assets/img/f-coast.jpg')}" alt="" loading="lazy">
    <div class="popup__media-copy">
      ${popup.eyebrow ? `<p class="eyebrow">${esc(popup.eyebrow)}</p>` : ''}
      <h2 id="popup-title" tabindex="-1">${esc(popup.title)}</h2>
      ${popup.text ? `<p>${esc(popup.text)}</p>` : ''}
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
      <button class="btn btn--primary" type="submit">${esc(popup.button || 'Get the dealer brief')}${icon('arrow')}</button>
      <a class="popup__more" href="dealers.html">See the programme</a>
    </div>
    <p class="form__status" role="status" aria-live="polite"></p>
  </form>
</dialog>`;
}

function consentBanner(consent, privacy) {
  return `<div class="consent" role="region" aria-label="Cookie choices" data-consent hidden>
  <p>${esc(consent.message)}${privacy ? ` <a href="${privacy.slug}.html">${esc(privacy.title)}</a>` : ''}</p>
  <div class="consent__actions">
    <button class="btn btn--secondary btn--sm" type="button" data-consent-choice="reject">Reject</button>
    <button class="btn btn--primary btn--sm" type="button" data-consent-choice="accept">Accept</button>
  </div>
</div>`;
}
