import { aircraft, home, seo } from '../content.mjs';
import { button, dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'index',
  title: seo.home?.title || '',
  description: seo.home?.description || '',
  image: seo.home?.image || '',
  header: 'overlay',
  nav: '',
  preloadImage: home.hero.poster,
};

export function render() {
  const { hero, statement, feature, duo, safety, applications, licence, events } = home;
  const photos = events.photos || [];
  return `
<div class="boot" id="boot" aria-hidden="true">
  <div class="boot__half boot__half--top"></div>
  <div class="boot__half boot__half--bottom"></div>
  <div class="boot__core">
    <div class="boot__reticle"><span></span><span></span><span></span><span></span></div>
    <img class="boot__logo" src="assets/img/logo-light.png" alt="" width="200" height="42">
    <div class="boot__bar"><span></span></div>
    <p class="boot__status"><span>NA80 systems check</span><span data-boot-count>000</span></p>
  </div>
</div>
<script>
  // Opening sequence: first visit per session only, skipped for reduced motion.
  (function () {
    var boot = document.getElementById('boot');
    var seen = false;
    try { seen = sessionStorage.getItem('coolfly-boot') === '1'; sessionStorage.setItem('coolfly-boot', '1'); } catch (e) {}
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { boot.remove(); return; }
    document.documentElement.classList.add('has-boot');
    var count = boot.querySelector('[data-boot-count]');
    var start = performance.now();
    (function tick(now) {
      var t = Math.min(1, (now - start) / 900);
      count.textContent = String(Math.round(t * 100)).padStart(3, '0');
      if (t < 1) requestAnimationFrame(tick);
    })(start);
    var done = function () { boot.classList.add('is-done'); setTimeout(function () { boot.remove(); }, 900); };
    setTimeout(done, 1150);
    boot.addEventListener('click', done);
  })();
</script>

<section class="hero" aria-label="Introduction">
  <video class="hero__video" autoplay muted loop playsinline preload="metadata" poster="${esc(hero.poster)}" aria-hidden="true">
    <source src="assets/video/hero-1080.mp4" type="video/mp4" media="(min-width: 900px)">
    <source src="assets/video/hero-720.mp4" type="video/mp4">
  </video>
  <div class="hero__shade"></div>
  <div class="hud" aria-hidden="true">
    <span class="hud__corner hud__corner--tl"></span><span class="hud__corner hud__corner--tr"></span>
    <span class="hud__corner hud__corner--bl"></span><span class="hud__corner hud__corner--br"></span>
    <div class="hud__tape"></div>
    <p class="hud__readout"><span class="hud__dot"></span><span data-hud-cycle='${esc(JSON.stringify(hero.hudReadouts || []))}'>${esc(hero.hudReadouts?.[0] || '')}</span></p>
  </div>
  <div class="container hero__content">
    <h1 class="hero__title"><span class="line"><span>${esc(hero.titleLine1)}</span></span><span class="line"><span>${esc(hero.titleLine2)}</span></span></h1>
    <p class="hero__lede">${esc(hero.lede)}</p>
    <div class="actions hero__actions">
      ${button(hero.primaryButton, '#lineup', 'primary')}
      ${button(hero.secondaryButton, 'dealers.html', 'ghost-light', ' data-track="become_dealer"')}
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
    <p class="statement__text" data-reveal>${esc(statement.text)}</p>
    <dl class="statement__stats" data-reveal>
      ${statement.stats
        .map((s) => {
          const value = s.animate && /^\d+$/.test(String(s.value)) ? `<span data-count="${esc(s.value)}">${esc(s.value)}</span>` : esc(s.value);
          return `<div><dt>${value}${s.unit ? `<small>${esc(s.unit)}</small>` : ''}</dt><dd>${esc(s.label)}</dd></div>`;
        })
        .join('')}
    </dl>
  </div>
</section>

<section class="expand" data-expand>
  <div class="expand__frame">
    <img src="${esc(feature.image)}" alt="${esc(feature.imageAlt)}" loading="lazy" data-parallax>
    <div class="expand__copy">
      <h2>${esc(feature.title)}</h2>
      ${feature.text ? `<p>${esc(feature.text)}</p>` : ''}
      ${feature.link ? `<a class="text-link text-link--light" href="${esc(feature.link)}">${esc(feature.linkLabel)}${icon('arrow')}</a>` : ''}
    </div>
  </div>
</section>

<section class="section section--tight duo">
  <div class="container duo__grid">
    ${duo
      .map(
        (d) => `<a class="duo__item" href="${esc(d.link)}" data-reveal="wipe">
      <img src="${esc(d.image)}" alt="${esc(d.imageAlt)}" loading="lazy">
      <span class="duo__copy"><strong>${esc(d.title)}</strong><span class="text-link text-link--light">${esc(d.linkLabel)}${icon('arrow')}</span></span>
    </a>`
      )
      .join('')}
  </div>
</section>

<section class="section lineup" id="lineup">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>${esc(home.lineupTitle)}</h2>
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
      ${eyebrow(safety.eyebrow)}
      <h2>${esc(safety.title)}</h2>
    </div>
    <div class="fc" data-reveal>
      <div class="fc__frame">
        <img src="assets/img/flight-controller.jpg" alt="Two CoolFly flight controllers installed side by side" loading="lazy" width="1100" height="1467">
        <span class="fc__spot fc__spot--a"><span class="fc__dot"></span><span class="fc__label">Flight controller 1</span></span>
        <span class="fc__spot fc__spot--b"><span class="fc__dot"></span><span class="fc__label">Flight controller 2</span></span>
      </div>
      <ul class="fc__points">
        ${safety.points.map((p, i) => `<li><span>0${i + 1}</span>${esc(p)}</li>`).join('')}
      </ul>
    </div>
    <div class="callouts__more" data-reveal>${button('Safety & technology', 'safety.html', 'ghost-light')}</div>
  </div>
</section>

<section class="section apps">
  <div class="container">
    <div class="section-head" data-reveal>
      <h2>${esc(home.applicationsTitle)}</h2>
    </div>
    <ul class="apps__grid">
      ${applications
        .map(
          (a) => `<li class="app-tile" data-reveal>
          <img src="${esc(a.image)}" alt="${esc(a.imageAlt)}" loading="lazy">
          <div class="app-tile__copy"><h3>${esc(a.label)}</h3><p>${esc(a.models)}</p></div>
        </li>`
        )
        .join('')}
    </ul>
  </div>
</section>

<section class="licence">
  <div class="container licence__inner" data-reveal>
    <p class="licence__big">${esc(licence.title)}</p>
    <p class="licence__small">${esc(licence.text)} <a href="safety.html#rules">${esc(licence.linkLabel)}</a></p>
  </div>
</section>

<section class="section road">
  <div class="container">
    <div class="section-head section-head--row" data-reveal>
      <h2>${esc(events.title)}</h2>
      ${events.note ? `<p class="section-head__note">${esc(events.note)}</p>` : ''}
    </div>
  </div>
  <div class="marquee" data-marquee>
    <ul class="marquee__track">
      ${[...photos, ...photos]
        .map(
          (r, i) => `<li${i >= photos.length ? ' aria-hidden="true"' : ''}><img src="${esc(r.image)}" alt="${i >= photos.length ? '' : esc(r.caption)}" loading="lazy"><span>${esc(r.caption)}</span></li>`
        )
        .join('')}
    </ul>
  </div>
</section>

${dealerBand(home.dealerBand)}`;
}

function lineupCard(a) {
  return `<article class="model-card" data-reveal>
    <a class="model-card__link" href="${a.slug}.html">
      <div class="model-card__media"><img src="${esc(a.image)}" alt="${esc(a.imageAlt)}" loading="lazy"></div>
      <div class="model-card__body">
        <p class="model-card__stance">${esc(a.stance)}</p>
        <h3 class="model-card__name">${esc(a.name)}</h3>
        <p class="model-card__facts">${esc(a.cardFacts)}</p>
        <span class="model-card__go" aria-hidden="true">${icon('arrow')}</span>
      </div>
    </a>
  </article>`;
}
