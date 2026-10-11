// Generates one page per aircraft from content/aircraft/*.json.

export const flightTimeNote =
  'Flight time is based on piloted flight testing with a 70 kg pilot. Actual flight time varies with payload, operating conditions and flight profile.';

import { aircraft, settings } from '../content.mjs';
import { button, dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const pages = aircraft.map((a) => ({
  meta: {
    slug: a.slug,
    title: a.fullName,
    description: `${a.fullName}. ${a.summary}`,
    header: 'overlay',
    nav: 'aircraft',
    image: a.heroImage,
    jsonLd: [productLd(a)],
  },
  render: () => render(a),
}));

function render(a) {
  const others = aircraft.filter((o) => o.slug !== a.slug);
  const [first, second] = a.story;
  return `
<section class="product-hero">
  <img class="product-hero__img" src="${a.heroImage}" alt="${esc(a.heroAlt)}" width="1920" height="1080" data-parallax>
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow product-hero__eyebrow">${esc(a.stance)} · Single seat · Electric</p>
    <h1 class="product-hero__title"><span class="line"><span>${esc(a.name)}</span></span></h1>
    <p class="product-hero__tagline">${esc(a.tagline)}</p>
    <div class="actions product-hero__actions">
      ${button('Find a dealer', 'dealers.html#regions', 'primary', ' data-track="find_dealer"')}
      ${button('Request a demo flight', `contact.html?topic=demo&model=${a.slug}#sales`, 'ghost-light', ' data-track="request_demo"')}
    </div>
  </div>
</section>

<section class="section product-intro">
  <div class="container">
    <p class="statement__text" data-reveal>${esc(a.summary)}</p>
    <div class="product-intro__media" data-reveal>
      <img src="${a.image}" alt="${esc(a.imageAlt)}" width="1600" height="900">
    </div>
    <dl class="figures figures--center" data-reveal>
      ${a.keyFigures.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${countable(f.value)}<span class="unit">${esc(f.unit)}</span></dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="expand" data-expand>
  <div class="expand__frame">
    <img src="${a.galleryImage}" alt="${esc(a.galleryAlt)}" loading="lazy" data-parallax>
    <div class="expand__copy">
      <h2>${esc(first.title)}</h2>
      <p>${esc(first.text)}</p>
    </div>
  </div>
</section>

<section class="section section--tight point">
  <div class="container point__inner" data-reveal>
    <h2>${esc(second.title)}</h2>
    <p>${esc(second.text)}</p>
  </div>
</section>

<section class="section section--night product-safety">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>Designed so one problem doesn’t become the problem.</h2>
      <a class="text-link" href="safety.html">Safety & technology${icon('arrow')}</a>
    </div>
    <ol class="safety-grid">
      ${a.safety.map((s) => `<li data-reveal><span class="safety-grid__mark">${icon('check')}</span>${esc(s)}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="section specs" id="specs">
  <div class="container specs__grid">
    <div class="specs__head" data-reveal>
      ${eyebrow('Specifications')}
      <h2>${esc(a.name)} at a glance</h2>
      <p class="footnote">* ${esc(flightTimeNote)}</p>
      <a class="text-link" href="compare.html">Compare models${icon('arrow')}</a>
    </div>
    <dl class="spec-table" data-reveal>
      ${a.specs.map((s) => `<div><dt>${esc(s.label)}</dt><dd>${esc(s.value)}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section section--mist conformity">
  <div class="container conformity__grid">
    <div data-reveal>
      ${eyebrow('Product conformity')}
      <h2>CE and FCC declarations</h2>
      <p>Electromagnetic compatibility for Europe and the US. Aviation rules are separate: see <a href="safety.html#rules">flying legally</a>.</p>
    </div>
    <div class="conformity__docs" data-reveal>
      ${a.certs.map((c) => `<figure><img src="${esc(c.image)}" alt="${esc(`${a.name} ${c.label}`)}" loading="lazy" width="640" height="905"><figcaption>${esc(c.label)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section others">
  <div class="container">
    <div class="section-head" data-reveal><h2>Other CoolFly aircraft</h2></div>
    <div class="others__grid">
      ${others
        .map(
          (o) => `<a class="other-card" href="${o.slug}.html" data-reveal>
          <img src="${o.image}" alt="" loading="lazy">
          <span class="other-card__stance">${esc(o.stance)}</span>
          <span class="other-card__name">${esc(o.name)}</span>
          <span class="other-card__line">${esc(o.cardFacts)}</span>
        </a>`
        )
        .join('')}
    </div>
  </div>
</section>

${dealerBand({ title: `Sell ${a.name} in your region.` })}`;
}

// Animate plain numbers; leave values such as "IP65" or "≤114" as text.
function countable(value) {
  return /^\d+$/.test(value) ? `<span data-count="${value}">${value}</span>` : esc(value);
}

function productLd(a) {
  const base = settings.siteUrl.replace(/\/$/, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: a.fullName,
    description: a.summary,
    brand: { '@type': 'Brand', name: settings.siteName },
    image: `${base}/${String(a.image).replace(/^\/+/, '')}`,
    url: `${base}/${a.slug}.html`,
    additionalProperty: a.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label, value: String(s.value).replace('*', '') })),
  };
}
