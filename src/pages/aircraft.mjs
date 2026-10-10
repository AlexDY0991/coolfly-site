// Generates one page per aircraft from src/data/aircraft.mjs.

import { aircraft, flightTimeNote } from '../data/aircraft.mjs';
import { button, dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const pages = aircraft.map((a) => ({
  meta: {
    slug: a.slug,
    title: a.fullName,
    description: `${a.fullName}: ${a.summary}`,
    header: 'overlay',
    nav: 'aircraft',
    image: a.heroImage,
  },
  render: () => render(a),
}));

function render(a) {
  const others = aircraft.filter((o) => o.slug !== a.slug);
  return `
<section class="product-hero">
  <img class="product-hero__img" src="${a.heroImage}" alt="${esc(a.heroAlt)}" width="1920" height="1080">
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow">${esc(a.stance)} · Single seat · Electric</p>
    <h1 class="product-hero__title">${esc(a.name)}</h1>
    <p class="product-hero__tagline">${esc(a.tagline)}</p>
    <div class="actions">
      ${button('Find a dealer', 'dealers.html#regions', 'primary')}
      ${button('Request a demo flight', `contact.html?topic=demo&model=${a.slug}#sales`, 'ghost-light')}
    </div>
  </div>
</section>

<section class="section product-intro">
  <div class="container product-intro__grid">
    <div class="product-intro__copy">
      ${eyebrow(a.fullName)}
      <p class="intro__statement">${esc(a.summary)}</p>
      <dl class="figures">
        ${a.keyFigures.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}<span>${esc(f.unit)}</span></dd></div>`).join('')}
      </dl>
    </div>
    <div class="product-intro__media">
      <img src="${a.image}" alt="${esc(a.imageAlt)}" width="1600" height="900">
    </div>
  </div>
</section>

<section class="section section--mist story">
  <div class="container story__grid">
    <figure class="story__media">
      <img src="${a.galleryImage}" alt="${esc(a.galleryAlt)}" loading="lazy">
    </figure>
    <div class="story__items">
      ${a.story.map((s) => `<article><h2>${esc(s.title)}</h2><p>${esc(s.text)}</p></article>`).join('')}
    </div>
  </div>
</section>

<section class="section section--night product-safety">
  <div class="container">
    <div class="section-head">
      ${eyebrow('Safety')}
      <h2>Designed so one problem doesn’t become the problem.</h2>
      <a class="text-link" href="safety.html">How CoolFly approaches safety${icon('arrow')}</a>
    </div>
    <ol class="safety-grid">
      ${a.safety.map((s) => `<li><span class="safety-grid__mark">${icon('check')}</span>${esc(s)}</li>`).join('')}
    </ol>
  </div>
</section>

<section class="section specs" id="specs">
  <div class="container specs__grid">
    <div class="specs__head">
      ${eyebrow('Specifications')}
      <h2>${esc(a.name)} at a glance</h2>
      <p class="footnote">* ${esc(flightTimeNote)}</p>
      <a class="text-link" href="compare.html">Compare with other models${icon('arrow')}</a>
    </div>
    <dl class="spec-table">
      ${a.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('')}
    </dl>
  </div>
</section>

<section class="section section--mist conformity">
  <div class="container conformity__grid">
    <div>
      ${eyebrow('Product conformity')}
      <h2>CE and FCC declarations</h2>
      <p>${esc(a.name)} has CE and FCC declarations of conformity, which cover electromagnetic compatibility for sale in Europe and the United States. These are product marks, not aviation certification. For the aviation rules in your market, see <a href="safety.html#rules">flying legally</a>.</p>
    </div>
    <div class="conformity__docs">
      ${a.certs.map((c) => `<figure><img src="${c.img}" alt="${esc(`${a.name} ${c.label}`)}" loading="lazy" width="640" height="905"><figcaption>${esc(c.label)}</figcaption></figure>`).join('')}
    </div>
  </div>
</section>

<section class="section others">
  <div class="container">
    <div class="section-head">
      ${eyebrow('The line-up')}
      <h2>Other CoolFly aircraft</h2>
    </div>
    <div class="others__grid">
      ${others
        .map(
          (o) => `<a class="other-card" href="${o.slug}.html">
          <img src="${o.image}" alt="" loading="lazy">
          <span class="other-card__stance">${esc(o.stance)}</span>
          <span class="other-card__name">${esc(o.name)}</span>
          <span class="other-card__line">${esc(o.lineup)}</span>
        </a>`
        )
        .join('')}
    </div>
  </div>
</section>

${dealerBand({
  title: `Sell ${a.name} in your region.`,
  text: `Authorised CoolFly dealers sell, deliver and service ${a.name} with factory training and support from Hangzhou.`,
})}`;
}
