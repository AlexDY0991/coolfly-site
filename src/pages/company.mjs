import { news, offices, timeline } from '../data/site.mjs';
import { dealerBand, esc, eyebrow, formatDate, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'company',
  title: 'About CoolFly',
  description: 'CoolFly is a personal aircraft company founded in 2022 in Hangzhou, China, building on flight-control work that began in 2008.',
  header: 'solid',
  nav: 'company',
};

export function render() {
  return `
<section class="page-head page-head--split">
  <div class="container page-head__grid">
    <div>
      ${eyebrow('About CoolFly')}
      <h1>Built to make personal flight possible.</h1>
      <p class="lede">Founded in 2022 in Hangzhou. We build our own avionics, flight control, propulsion and airframes, and around 70% of our team works in R&amp;D.</p>
    </div>
    <img src="assets/img/hq.jpg" alt="CoolFly headquarters building in Hangzhou" width="1100" height="1467">
  </div>
</section>

<section class="section section--night">
  <div class="container quote">
    <img src="assets/img/ceo.jpg" alt="Wayne Lee, CEO of CoolFly" loading="lazy" width="1000" height="1153">
    <blockquote data-reveal>
      <p>“We are not just manufacturing aircraft; we are architecting a new way of life. We aim to make personal eVTOL as ubiquitous as bicycles: affordable and accessible to everyone in the world.”</p>
      <footer>Wayne Lee, CEO</footer>
    </blockquote>
  </div>
</section>

<section class="milestones" id="milestones" data-hscroll>
  <div class="milestones__sticky">
    <div class="container milestones__head">
      ${eyebrow('Milestones')}
      <h2>From flight controllers to aircraft</h2>
    </div>
    <div class="milestones__viewport">
      <ol class="milestones__track">
        ${timeline
          .map(
            (t) => `<li class="ms" data-reveal>
            <span class="ms__node" aria-hidden="true"></span>
            <span class="ms__year">${esc(t.year)}</span>
            <ul class="ms__events">${t.events.map((e) => `<li>${esc(e)}</li>`).join('')}</ul>
          </li>`
          )
          .join('')}
      </ol>
      <div class="milestones__rail" aria-hidden="true"><span class="milestones__fill"></span></div>
    </div>
  </div>
</section>

<section class="section section--mist">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow('Offices')}
      <h2>Where to find us</h2>
    </div>
    <ul class="offices">
      ${offices.map((o) => `<li data-reveal><h3>${esc(o.city)}</h3><p>${esc(o.country)}</p><p class="offices__role">${esc(o.role)}</p></li>`).join('')}
    </ul>
  </div>
</section>

<section class="section news">
  <div class="container">
    <div class="section-head" data-reveal>
      ${eyebrow('Newsroom')}
      <h2>Recent news</h2>
      <a class="text-link" href="https://coolflyaircraft.com/newsroom/" rel="noopener" target="_blank">All news${icon('arrow')}</a>
    </div>
    <div class="news__grid">
      ${news
        .map(
          (n) => `<article class="news-card" data-reveal><a href="${n.href}" rel="noopener" target="_blank"><div class="news-card__img"><img src="${n.image}" alt="" loading="lazy"></div><time datetime="${n.date}">${formatDate(n.date)}</time><h3>${esc(n.title)}</h3></a></article>`
        )
        .join('')}
    </div>
  </div>
</section>

${dealerBand()}`;
}
