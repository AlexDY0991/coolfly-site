import { aircraft, settings, textPages } from '../content.mjs';
import { clientStrings, lang, langLabel, otherLang, t } from '../i18n.mjs';
import { esc, icon } from './ui.mjs';

// Regions where analytics and ad cookies stay off until the visitor accepts
// (EEA, UK, Switzerland). Elsewhere they default to on and can be rejected.
const CONSENT_REGIONS = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'GB', 'CH'];

const preview = Boolean(process.env.SITE_PREVIEW);
const pagePath = (slug) => (slug === 'index' ? '' : `${slug}.html`);
const languageUrl = (code) => (settings.languages?.[code]?.url || settings.siteUrl).replace(/\/$/, '');

// Link to the same page in the other language. Previews keep both languages
// on one host (/ and /zh/); live sites use each language's own domain and
// pass ?lang= so the visitor's choice is remembered there.
function switchHref(slug) {
  const path = pagePath(slug);
  if (preview) return lang === 'en' ? `${otherLang}/${path}` : `../${path}`;
  return `${languageUrl(otherLang)}/${path}?lang=${otherLang}`;
}

const nav = () => [
  {
    label: t('nav.aircraft'),
    key: 'aircraft',
    href: 'compare.html',
    children: [
      ...aircraft.map((a) => ({ label: a.name, note: a.stance, href: `${a.slug}.html` })),
      { label: t('nav.compare'), note: '', href: 'compare.html' },
    ],
  },
  { label: t('nav.safety'), key: 'safety', href: 'safety.html' },
  { label: t('nav.dealers'), key: 'dealers', href: 'dealers.html' },
  { label: t('nav.news'), key: 'news', href: 'newsroom.html' },
  { label: t('nav.company'), key: 'company', href: 'company.html' },
  { label: t('nav.contact'), key: 'contact', href: 'contact.html' },
];

// meta: { slug, title, description, image, nav, header: 'overlay' | 'solid',
//         popup, noindex, minimalHeader, headerCta, preloadImage, jsonLd,
//         ogType, alt (slug of the matching page in the other language, or
//         null when there is none) }
export function layout(meta, main) {
  const site = settings;
  const base = languageUrl(lang);
  const title = meta.title ? `${meta.title} | ${site.siteName}` : `${site.siteName} | ${t('siteSuffix')}`;
  const description = meta.description || site.defaultDescription;
  const canonical = `${base}/${pagePath(meta.slug)}`;
  const image = absolute(base, meta.image || site.defaultShareImage);
  const noindex = meta.noindex || preview;
  const gtmId = (site.tracking?.gtmId || '').trim();
  const baiduId = (site.tracking?.baiduId || '').trim();
  const consentOn = Boolean(gtmId && site.consent?.enabled);
  const popupOn = meta.popup !== false && site.popup?.enabled;
  const privacy = textPages.find((p) => p.slug === site.consent?.privacyPage);
  const alt = meta.alt === undefined ? meta.slug : meta.alt;
  const hreflang = alt === meta.slug && !meta.noindex;

  const config = {
    lang,
    otherLang,
    switchHref: switchHref(alt || 'index'),
    gtm: Boolean(gtmId),
    consent: consentOn,
    t: clientStrings(),
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
<html lang="${t('htmlLang')}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
${
  hreflang
    ? `<link rel="alternate" hreflang="${t('htmlLang')}" href="${canonical}">
<link rel="alternate" hreflang="${otherLang === 'zh' ? 'zh-Hans' : 'en'}" href="${languageUrl(otherLang)}/${pagePath(meta.slug)}">
<link rel="alternate" hreflang="x-default" href="${languageUrl('en')}/${pagePath(meta.slug)}">
`
    : ''
}${noindex ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<meta property="og:type" content="${meta.ogType || 'website'}">
<meta property="og:site_name" content="${esc(site.siteName)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${image}">
<meta property="og:locale" content="${lang === 'zh' ? 'zh_CN' : 'en_GB'}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0c1115">
<link rel="icon" href="favicon.png" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
${meta.preloadImage ? `<link rel="preload" as="image" href="${meta.preloadImage}">\n` : ''}<link rel="preload" href="assets/fonts/archivo-wdth.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/instrument-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/site.css">
<script>document.documentElement.classList.add('js');window.COOLFLY=${safeJson(config)};</script>
${gtmId ? gtmHead(gtmId, consentOn) : ''}${baiduId ? baiduHead(baiduId) : ''}${jsonLd.map((d) => `<script type="application/ld+json">${safeJson(d)}</script>`).join('\n')}
</head>
<body class="page-${meta.slug.replace(/\//g, '-')}">
${gtmId ? `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${esc(gtmId)}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>\n` : ''}<a class="skip-link" href="#main">${t('nav.skip')}</a>
<div class="scroll-progress" aria-hidden="true"></div>
${meta.minimalHeader ? minimalHeader(meta) : header(meta, alt)}
<main id="main" tabindex="-1">
${main}
</main>
${footer(privacy, consentOn)}
<a class="to-top" href="#main" aria-label="${t('nav.toTop')}" data-to-top>${icon('arrow', 'icon icon--up')}</a>
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

// Baidu Tongji (百度统计) for the Chinese site, where Google tools are blocked.
function baiduHead(id) {
  return `<script>
var _hmt=_hmt||[];(function(){var hm=document.createElement('script');hm.src='https://hm.baidu.com/hm.js?'+${JSON.stringify(id)};var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(hm,s);})();
</script>
`;
}

function organisationLd(base) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.siteName,
    ...(settings.legalName ? { legalName: settings.legalName } : {}),
    url: `${base}/`,
    logo: `${base}/assets/img/logo-dark.png`,
    sameAs: (settings.social || []).map((s) => s.url),
    contactPoint: [
      { '@type': 'ContactPoint', contactType: 'sales', email: settings.contacts.business },
      { '@type': 'ContactPoint', contactType: 'customer support', email: settings.contacts.support },
    ],
  };
}

const langSwitch = (alt, cls = '') =>
  `<a class="lang-switch ${cls}" href="${switchHref(alt || 'index')}" hreflang="${otherLang === 'zh' ? 'zh-Hans' : 'en'}" lang="${otherLang === 'zh' ? 'zh-Hans' : 'en'}" data-lang-switch="${otherLang}" aria-label="${esc(t('nav.language'))}: ${esc(langLabel(otherLang))}"><span class="lang-switch__current">${esc(langLabel(lang))}</span><span class="lang-switch__sep" aria-hidden="true">/</span><span class="lang-switch__other">${esc(langLabel(otherLang))}</span></a>`;

function header(meta, alt) {
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
    <nav class="nav" aria-label="${esc(t('nav.main'))}">
      <ul class="nav__list">${items}</ul>
    </nav>
    <div class="site-header__actions">
      ${langSwitch(alt)}
      <a class="btn btn--primary btn--sm" href="dealers.html" data-track="become_dealer">${esc(t('nav.becomeDealer'))}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="${esc(t('nav.menuOpen'))}" data-label-open="${esc(t('nav.menuOpen'))}" data-label-close="${esc(t('nav.menuClose'))}">
        ${icon('menu', 'icon menu-toggle__open')}${icon('close', 'icon menu-toggle__close')}
      </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" hidden>
    <ul>${mobileItems}</ul>
    <div class="mobile-menu__foot">
      <a class="btn btn--primary" href="dealers.html" data-track="become_dealer">${esc(t('nav.becomeDealer'))}${icon('arrow')}</a>
      ${langSwitch(alt, 'lang-switch--menu')}
    </div>
  </div>
</header>`;
}

// Landing pages: logo and one call to action, so visitors stay on the offer.
function minimalHeader(meta) {
  const cta = meta.headerCta || { label: t('dealers.apply'), href: '#form' };
  return `<header class="site-header site-header--minimal" data-variant="${meta.header || 'solid'}">
  <div class="container site-header__bar">
    ${brand()}
    <div class="site-header__actions site-header__actions--always">
      <a class="btn btn--primary btn--sm" href="${cta.href}" data-track="landing_header_cta">${esc(cta.label)}</a>
    </div>
  </div>
</header>`;
}

const brand = () => `<a class="brand" href="index.html" aria-label="${esc(t('nav.home'))}">
      <img class="brand__light" src="assets/img/logo-light.png" alt="CoolFly" width="160" height="34">
      <img class="brand__dark" src="assets/img/logo-dark.png" alt="" width="160" height="34" aria-hidden="true">
    </a>`;

function footer(privacy, consentOn) {
  const { contacts, offices = [], social = [], tagline, beian } = settings;
  const col = (title, links) => `<div class="footer__col">
      <h2 class="footer__title">${esc(title)}</h2>
      <ul>${links.map(([label, href, ext]) => `<li><a href="${href}"${ext ? ' rel="noopener" target="_blank"' : ''}>${esc(label)}</a></li>`).join('')}</ul>
    </div>`;

  return `<footer class="site-footer">
  <div class="container">
    <div class="footer__top">
      <div class="footer__brand">
        <img src="assets/img/logo-light.png" alt="CoolFly" width="150" height="32">
        <p>${esc(tagline)} ${esc(t('footer.blurb'))}</p>
        <ul class="footer__offices">
          ${offices.map((o) => `<li><strong>${esc(o.city)}</strong> ${esc(o.role)}</li>`).join('')}
        </ul>
      </div>
      ${col(t('footer.aircraft'), [...aircraft.map((a) => [a.name, `${a.slug}.html`]), [t('nav.compare'), 'compare.html'], [t('footer.safety'), 'safety.html']])}
      ${col(t('footer.partners'), [
        [t('nav.becomeDealer'), 'dealers.html'],
        [t('footer.howItWorks'), 'dealers.html#process'],
        [t('footer.faq'), 'dealers.html#faq'],
        [t('footer.contactSales'), 'contact.html#sales'],
      ])}
      ${col(t('footer.company'), [
        [t('footer.about'), 'company.html'],
        [t('footer.milestones'), 'company.html#milestones'],
        [t('footer.newsroom'), 'newsroom.html'],
        [t('footer.contact'), 'contact.html'],
      ])}
      <div class="footer__col">
        <h2 class="footer__title">${esc(t('footer.contact'))}</h2>
        <ul class="footer__contact">
          <li><span>${esc(t('footer.dealersEmail'))}</span><a href="mailto:${esc(contacts.business)}" data-track="email_click">${esc(contacts.business)}</a></li>
          <li><span>${esc(t('footer.supportEmail'))}</span><a href="mailto:${esc(contacts.support)}" data-track="email_click">${esc(contacts.support)}</a></li>
          <li><span>${esc(t('footer.pressEmail'))}</span><a href="mailto:${esc(contacts.press)}" data-track="email_click">${esc(contacts.press)}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year>2026</span> ${esc(settings.legalName || 'CoolFly')}. ${esc(t('footer.legal'))}${beian ? ` <a href="https://beian.miit.gov.cn/" rel="noopener" target="_blank">${esc(beian)}</a>` : ''}</p>
      <ul class="footer__social">
        ${privacy ? `<li><a href="${privacy.slug}.html">${esc(privacy.title)}</a></li>` : ''}
        ${consentOn ? `<li><button class="footer__link-button" type="button" data-consent-open>${esc(t('footer.cookies'))}</button></li>` : ''}
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
    <button class="popup__close" type="button" aria-label="${esc(t('popup.close'))}" data-popup-close>${icon('close')}</button>
  </div>
  <form class="popup__form" data-form="dealer" data-source="popup" novalidate>
    <div class="form__row">
      <div class="field"><label for="p-first">${esc(t('popup.firstName'))}</label><input id="p-first" name="firstName" required autocomplete="given-name"></div>
      <div class="field"><label for="p-last">${esc(t('popup.lastName'))}</label><input id="p-last" name="lastName" required autocomplete="family-name"></div>
    </div>
    <div class="field"><label for="p-company">${esc(t('popup.company'))}</label><input id="p-company" name="company" required autocomplete="organization"></div>
    <div class="form__row">
      <div class="field"><label for="p-email">${esc(t('popup.email'))}</label><input id="p-email" name="email" type="email" required autocomplete="email"></div>
      <div class="field"><label for="p-country">${esc(t('popup.country'))}</label><input id="p-country" name="country" required autocomplete="country-name"></div>
    </div>
    <div class="form__actions">
      <button class="btn btn--primary" type="submit">${esc(popup.button || t('nav.becomeDealer'))}${icon('arrow')}</button>
      <a class="popup__more" href="dealers.html">${esc(t('popup.more'))}</a>
    </div>
    <p class="form__status" role="status" aria-live="polite"></p>
  </form>
</dialog>`;
}

function consentBanner(consent, privacy) {
  return `<div class="consent" role="region" aria-label="${esc(t('consent.region'))}" data-consent hidden>
  <p>${esc(consent.message)}${privacy ? ` <a href="${privacy.slug}.html">${esc(privacy.title)}</a>` : ''}</p>
  <div class="consent__actions">
    <button class="btn btn--secondary btn--sm" type="button" data-consent-choice="reject">${esc(t('consent.reject'))}</button>
    <button class="btn btn--primary btn--sm" type="button" data-consent-choice="accept">${esc(t('consent.accept'))}</button>
  </div>
</div>`;
}
