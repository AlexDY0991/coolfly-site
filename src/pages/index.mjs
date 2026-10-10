import { aircraft } from '../data/aircraft.mjs';
import { news } from '../data/site.mjs';
import { button, dealerBand, esc, eyebrow, formatDate, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'index',
  title: '',
  header: 'overlay',
  nav: '',
};

const applications = [
  {
    id: 'waterfront',
    label: 'Waterfront & marine',
    image: 'assets/img/f-urban-lake-2.jpg',
    alt: 'Urban flying over a lake near moored boats',
    text: 'Fly from the dock to the island and back. IP65 sealing keeps spray and rain out of the electronics, and enclosed fans on Urban keep the blades guarded near the water.',
    fit: ['urban', 'dream-st'],
  },
  {
    id: 'tourism',
    label: 'Tourism & resorts',
    image: 'assets/img/agibot.jpg',
    alt: 'A humanoid robot riding CoolFly Urban at a theme park demonstration',
    text: 'Give guests a flight they will talk about. CoolFly is working with AGIBOT to bring low-altitude flight to the Zhuhai Chimelong theme park.',
    fit: ['urban', 'dream-pro'],
  },
  {
    id: 'outdoor',
    label: 'Outdoor recreation',
    image: 'assets/img/f-coast.jpg',
    alt: 'Dream flying along a rocky coast at sunset',
    text: 'Coastlines, valleys and open country, seen from a few metres up. Electric propulsion means no fuel to carry and no exhaust at the launch site.',
    fit: ['dream-st', 'dream-pro'],
  },
  {
    id: 'farms',
    label: 'Farms & ranches',
    image: 'assets/img/f-dream-farm-2.jpg',
    alt: 'Dream flying low over farmland',
    text: 'Check fences, water and stock across a large property without a truck. Dream PRO’s 40-minute flight time covers long patrol loops.',
    fit: ['dream-pro'],
  },
];

const byslug = Object.fromEntries(aircraft.map((a) => [a.slug, a]));

export function render() {
  return `
<section class="hero" aria-label="Introduction">
  <video class="hero__video" autoplay muted loop playsinline preload="metadata" poster="assets/img/hero-poster.jpg" aria-hidden="true">
    <source src="assets/video/hero-1080.mp4" type="video/mp4" media="(min-width: 900px)">
    <source src="assets/video/hero-720.mp4" type="video/mp4">
  </video>
  <div class="hero__shade"></div>
  <div class="container hero__content">
    ${eyebrow('Personal electric aircraft')}
    <h1 class="hero__title">Your will.<br>Your altitude.</h1>
    <p class="hero__lede">Single-seat electric aircraft, designed and built by CoolFly from the flight controller up.</p>
    <div class="actions">
      ${button('Explore the aircraft', '#lineup', 'primary')}
      ${button('Become a dealer', 'dealers.html', 'ghost-light')}
    </div>
  </div>
  <div class="container hero__foot">
    <span>Dream and Urban in flight</span>
    <button class="video-toggle" type="button" aria-pressed="false" data-video-toggle>
      <span class="video-toggle__pause">${icon('pause')}Pause film</span>
      <span class="video-toggle__play">${icon('play')}Play film</span>
    </button>
  </div>
</section>

<section class="section intro">
  <div class="container intro__grid">
    <p class="intro__statement">CoolFly has built flight controllers since 2008. Today we design, build and test our aircraft in-house in Hangzhou, from avionics and propulsion to final assembly.</p>
    <dl class="facts">
      <div><dt>2008</dt><dd>Flight-control R&amp;D begins</dd></div>
      <div><dt>~70%</dt><dd>of the team works in R&amp;D</dd></div>
      <div><dt>3</dt><dd>aircraft in the line-up</dd></div>
      <div><dt>4</dt><dd>dealers signed at the Urban launch</dd></div>
    </dl>
  </div>
</section>

<section class="section lineup" id="lineup">
  <div class="container">
    <div class="section-head">
      ${eyebrow('The aircraft')}
      <h2>Three aircraft. Different ways to fly.</h2>
      <a class="text-link" href="compare.html">Compare all models${icon('arrow')}</a>
    </div>
    <div class="lineup__grid">
      ${aircraft.map(lineupCard).join('')}
    </div>
    <p class="footnote">* Flight time based on piloted flight testing with a 70 kg pilot. Actual flight time varies with payload, conditions and flight profile.</p>
  </div>
</section>

<section class="feature">
  <img class="feature__img" src="assets/img/f-dream-detail.jpg" alt="Close-up of a pilot flying CoolFly Dream" loading="lazy" width="1920" height="1080">
  <div class="feature__shade"></div>
  <div class="container feature__content">
    ${eyebrow('Flight-tested')}
    <h2>Real aircraft, flying today.</h2>
    <p>Urban and Dream fly at public events, trade shows and customer sites. CoolFly’s first international deliveries have gone to customers in France and Canada.</p>
  </div>
</section>

<section class="section section--night safety-teaser">
  <div class="container safety-teaser__grid">
    <div class="safety-teaser__copy">
      ${eyebrow('Safety by architecture')}
      <h2>One failure stays one failure.</h2>
      <p class="lede">Every CoolFly aircraft is designed so that a single fault cannot bring it down. Redundancy starts in the flight controller and runs through propulsion, power and recovery.</p>
      <ul class="check-list">
        <li>${icon('check')}<span><strong>NA80 flight control.</strong> Three redundant channels run at once and fail over in milliseconds.</span></li>
        <li>${icon('check')}<span><strong>Motor-out capable.</strong> Safe flight continues after the loss of any single motor.</span></li>
        <li>${icon('check')}<span><strong>Ballistic parachute.</strong> Rapid deployment for the rare case it is needed.</span></li>
        <li>${icon('check')}<span><strong>Radar auto-landing.</strong> A radar sensor guides the aircraft down to the ground.</span></li>
      </ul>
      ${button('Safety & technology', 'safety.html', 'ghost-light')}
    </div>
    <figure class="safety-teaser__media">
      <img src="assets/img/flight-controller.jpg" alt="The CoolFly NA80 flight control unit with its redundant modules" loading="lazy" width="1100" height="1467">
      <figcaption>NA80, CoolFly’s own flight controller for manned eVTOL aircraft.</figcaption>
    </figure>
  </div>
</section>

<section class="section applications">
  <div class="container">
    <div class="section-head">
      ${eyebrow('Where CoolFly flies')}
      <h2>Built for new ways to move.</h2>
    </div>
    <div class="tabs" data-tabs>
      <div class="tabs__list" role="tablist" aria-label="Applications">
        ${applications.map((a, i) => `<button class="tabs__tab" type="button" role="tab" id="tab-${a.id}" aria-controls="panel-${a.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${esc(a.label)}</button>`).join('')}
      </div>
      ${applications.map(applicationPanel).join('')}
    </div>
  </div>
</section>

<section class="section section--mist rules">
  <div class="container">
    <div class="section-head">
      ${eyebrow('Flying legally')}
      <h2>Light enough to fly without a pilot’s licence, where the rules allow.</h2>
    </div>
    <div class="rules__grid">
      <article class="rule">
        <p class="rule__tag">United States</p>
        <h3>Designed to FAA Part 103</h3>
        <p>Ultralight vehicles under FAA Part 103 need no pilot certificate, no medical certificate and no airworthiness certificate. CoolFly designs its aircraft to the Part 103 limits. Your dealer confirms which model qualifies before you buy.</p>
      </article>
      <article class="rule">
        <p class="rule__tag">Other markets</p>
        <h3>Local rules, handled locally</h3>
        <p>Europe, Australia and the Middle East each set their own rules for ultralight and personal aircraft. Your CoolFly dealer works through local registration and operating requirements with you.</p>
      </article>
      <article class="rule">
        <p class="rule__tag">Every pilot</p>
        <h3>Training before you fly</h3>
        <p>Your dealer delivers the aircraft, trains you to fly it and services it afterwards. CoolFly has also secured insurance coverage for manned aircraft operations in China and internationally.</p>
      </article>
    </div>
  </div>
</section>

<section class="section seen">
  <div class="container">
    <div class="section-head">
      ${eyebrow('On the road')}
      <h2>Meet CoolFly in person.</h2>
      <p class="section-head__note">CES Las Vegas · EAA AirVenture Oshkosh · IFA Berlin · Dubai Airshow · Global Digital Trade Expo</p>
    </div>
    <div class="seen__grid">
      <figure><img src="assets/img/oshkosh.jpg" alt="Entrance arch of EAA AirVenture Oshkosh" loading="lazy" width="1600" height="1068"><figcaption>EAA AirVenture Oshkosh, July 2026</figcaption></figure>
      <figure><img src="assets/img/launch-event.jpg" alt="The Urban global launch venue in Hangzhou" loading="lazy" width="1600" height="900"><figcaption>Urban global launch, Hangzhou, August 2026</figcaption></figure>
      <figure><img src="assets/img/booth.jpg" alt="Visitors at the CoolFly stand" loading="lazy" width="1600" height="1066"><figcaption>Global Digital Trade Expo, September 2026</figcaption></figure>
    </div>
  </div>
</section>

${dealerBand()}

<section class="section news">
  <div class="container">
    <div class="section-head">
      ${eyebrow('Newsroom')}
      <h2>Latest news</h2>
      <a class="text-link" href="https://coolflyaircraft.com/newsroom/" rel="noopener" target="_blank">All news${icon('arrow')}</a>
    </div>
    <div class="news__grid">
      ${news.map(newsCard).join('')}
    </div>
  </div>
</section>`;
}

function lineupCard(a) {
  return `<article class="model-card">
    <a class="model-card__link" href="${a.slug}.html" aria-label="${esc(a.fullName)}">
      <div class="model-card__media"><img src="${a.image}" alt="${esc(a.imageAlt)}" loading="lazy"></div>
      <div class="model-card__body">
        <p class="model-card__stance">${esc(a.stance)}</p>
        <h3 class="model-card__name">${esc(a.name)}</h3>
        <p class="model-card__line">${esc(a.lineup)}</p>
        <dl class="figures figures--compact">
          ${a.keyFigures.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}<span>${esc(f.unit)}</span></dd></div>`).join('')}
        </dl>
        <span class="text-link">Explore ${esc(a.name)}${icon('arrow')}</span>
      </div>
    </a>
  </article>`;
}

function applicationPanel(app, i) {
  const fits = app.fit.map((s) => `<a href="${s}.html">${esc(byslug[s].name)}</a>`).join(' · ');
  return `<div class="tabs__panel" role="tabpanel" id="panel-${app.id}" aria-labelledby="tab-${app.id}"${i === 0 ? '' : ' data-inactive'}>
    <img src="${app.image}" alt="${esc(app.alt)}" loading="lazy">
    <div class="tabs__copy">
      <h3>${esc(app.label)}</h3>
      <p>${esc(app.text)}</p>
      <p class="tabs__fit"><span>Suggested</span> ${fits}</p>
    </div>
  </div>`;
}

function newsCard(n) {
  return `<article class="news-card">
    <a href="${n.href}" rel="noopener" target="_blank">
      <img src="${n.image}" alt="" loading="lazy">
      <time datetime="${n.date}">${formatDate(n.date)}</time>
      <h3>${esc(n.title)}</h3>
    </a>
  </article>`;
}
