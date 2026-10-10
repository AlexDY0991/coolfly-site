import { aircraft } from '../data/aircraft.mjs';
import { button, dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'index',
  title: '',
  header: 'overlay',
  nav: '',
};

const applications = [
  { label: 'Waterfront & marine', image: 'assets/img/f-urban-lake-2.jpg', alt: 'Urban flying over a lake near moored boats', fit: 'Urban · Dream ST' },
  { label: 'Tourism & resorts', image: 'assets/img/agibot.jpg', alt: 'A humanoid robot riding CoolFly Urban at a theme park demonstration', fit: 'Urban · Dream PRO' },
  { label: 'Outdoor recreation', image: 'assets/img/f-coast.jpg', alt: 'Dream flying along a rocky coast at sunset', fit: 'Dream ST · Dream PRO' },
  { label: 'Farms & ranches', image: 'assets/img/f-dream-farm-2.jpg', alt: 'Dream flying low over farmland', fit: 'Dream PRO' },
];

const road = [
  { image: 'assets/img/oshkosh.jpg', caption: 'EAA AirVenture Oshkosh' },
  { image: 'assets/img/launch-event.jpg', caption: 'Urban global launch, Hangzhou' },
  { image: 'assets/img/booth.jpg', caption: 'Global Digital Trade Expo' },
  { image: 'assets/img/ifa.jpg', caption: 'IFA Berlin' },
];

const hudReadouts = ['Top speed 100 km/h', 'Endurance up to 40 min', 'NA80 triple redundant', 'Motor-out capable', 'IP65 sealed'];

export function render() {
  return `
<section class="hero" aria-label="Introduction">
  <video class="hero__video" autoplay muted loop playsinline preload="metadata" poster="assets/img/hero-poster.jpg" aria-hidden="true">
    <source src="assets/video/hero-1080.mp4" type="video/mp4" media="(min-width: 900px)">
    <source src="assets/video/hero-720.mp4" type="video/mp4">
  </video>
  <div class="hero__shade"></div>
  <div class="hud" aria-hidden="true">
    <span class="hud__corner hud__corner--tl"></span><span class="hud__corner hud__corner--tr"></span>
    <span class="hud__corner hud__corner--bl"></span><span class="hud__corner hud__corner--br"></span>
    <div class="hud__tape"></div>
    <p class="hud__readout"><span class="hud__dot"></span><span data-hud-cycle='${esc(JSON.stringify(hudReadouts))}'>${esc(hudReadouts[0])}</span></p>
  </div>
  <div class="container hero__content">
    <h1 class="hero__title"><span class="line"><span>Your will.</span></span><span class="line"><span>Your altitude.</span></span></h1>
    <p class="hero__lede">Personal electric aircraft, built from the flight controller up.</p>
    <div class="actions hero__actions">
      ${button('Explore the aircraft', '#lineup', 'primary')}
      ${button('Become a dealer', 'dealers.html', 'ghost-light')}
    </div>
  </div>
  <div class="container hero__foot">
    <span class="hero__scroll">Scroll</span>
    <button class="video-toggle" type="button" aria-pressed="false" data-video-toggle>
      <span class="video-toggle__pause">${icon('pause')}Pause film</span>
      <span class="video-toggle__play">${icon('play')}Play film</span>
    </button>
  </div>
</section>

<section class="section statement">
  <div class="container">
    <p class="statement__text" data-reveal>We build aircraft for the places roads can’t reach.</p>
    <dl class="statement__stats" data-reveal>
      <div><dt><span data-count="100">100</span><small>km/h</small></dt><dd>Top speed</dd></div>
      <div><dt><span data-count="40">40</span><small>min</small></dt><dd>Max endurance</dd></div>
      <div><dt><span data-count="70">70</span><small>%</small></dt><dd>Team in R&amp;D</dd></div>
    </dl>
  </div>
</section>

<section class="expand" data-expand>
  <div class="expand__frame">
    <img src="assets/img/f-urban-lake.jpg" alt="A pilot flying CoolFly Urban low over a lake" loading="lazy" data-parallax>
    <div class="expand__copy">
      <h2>Stand up and fly.</h2>
      <a class="text-link text-link--light" href="urban.html">Meet Urban${icon('arrow')}</a>
    </div>
  </div>
</section>

<section class="section section--tight duo">
  <div class="container duo__grid">
    <a class="duo__item" href="dream-st.html" data-reveal="wipe">
      <img src="assets/img/f-coast.jpg" alt="CoolFly Dream flying along a coastline at sunset" loading="lazy">
      <span class="duo__copy"><strong>All electric. Endless horizons.</strong><span class="text-link text-link--light">Dream ST${icon('arrow')}</span></span>
    </a>
    <a class="duo__item" href="dream-pro.html" data-reveal="wipe">
      <img src="assets/img/f-dream-farm.jpg" alt="CoolFly Dream flying over farmland" loading="lazy">
      <span class="duo__copy"><strong>Forty minutes in the air.</strong><span class="text-link text-link--light">Dream PRO${icon('arrow')}</span></span>
    </a>
  </div>
</section>

<section class="section lineup" id="lineup">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>Three aircraft.<br>Different ways to fly.</h2>
      <a class="text-link" href="compare.html">Compare models${icon('arrow')}</a>
    </div>
    <div class="lineup__grid">
      ${aircraft.map(lineupCard).join('')}
    </div>
  </div>
</section>

<section class="section section--night callouts">
  <div class="container">
    <div class="section-head section-head--center" data-reveal>
      ${eyebrow('Safety by architecture')}
      <h2>One failure stays one failure.</h2>
    </div>
    <div class="callouts__stage" data-reveal>
      <img src="assets/img/flight-controller.jpg" alt="The CoolFly NA80 flight control unit with its redundant modules" loading="lazy" width="1100" height="1467">
      <ul class="callouts__list">
        <li class="callout callout--1"><span>NA80 triple-redundant flight control</span></li>
        <li class="callout callout--2"><span>Safe flight after any single motor failure</span></li>
        <li class="callout callout--3"><span>Ballistic parachute</span></li>
        <li class="callout callout--4"><span>Radar-guided auto-landing</span></li>
      </ul>
    </div>
    <div class="callouts__more" data-reveal>${button('Safety & technology', 'safety.html', 'ghost-light')}</div>
  </div>
</section>

<section class="section apps">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2>Built for new ways to move.</h2>
    </div>
    <ul class="apps__grid">
      ${applications
        .map(
          (a) => `<li class="app-tile" data-reveal>
          <img src="${a.image}" alt="${esc(a.alt)}" loading="lazy">
          <div class="app-tile__copy"><h3>${esc(a.label)}</h3><p>${esc(a.fit)}</p></div>
        </li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="licence">
  <div class="container licence__inner" data-reveal>
    <p class="licence__big">No pilot’s licence needed in the US.</p>
    <p class="licence__small">Under FAA Part 103. Rules differ by market. <a href="safety.html#rules">How it works</a></p>
  </div>
</section>

<section class="section road">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>Meet CoolFly in person.</h2>
      <p class="section-head__note">CES · Oshkosh · IFA Berlin · Dubai Airshow</p>
    </div>
  </div>
  <div class="marquee" data-marquee>
    <ul class="marquee__track">
      ${[...road, ...road]
        .map(
          (r, i) => `<li${i >= road.length ? ' aria-hidden="true"' : ''}><img src="${r.image}" alt="${i >= road.length ? '' : esc(r.caption)}" loading="lazy"><span>${esc(r.caption)}</span></li>`
        )
        .join('')}
    </ul>
  </div>
</section>

${dealerBand()}`;
}

function lineupCard(a) {
  return `<article class="model-card" data-reveal>
    <a class="model-card__link" href="${a.slug}.html">
      <div class="model-card__media"><img src="${a.image}" alt="${esc(a.imageAlt)}" loading="lazy"></div>
      <div class="model-card__body">
        <p class="model-card__stance">${esc(a.stance)}</p>
        <h3 class="model-card__name">${esc(a.name)}</h3>
        <p class="model-card__facts">${esc(a.cardFacts)}</p>
        <span class="model-card__go" aria-hidden="true">${icon('arrow')}</span>
      </div>
    </a>
  </article>`;
}
