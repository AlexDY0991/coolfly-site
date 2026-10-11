import { aircraft, seo } from '../content.mjs';
import { flightTimeNote } from './aircraft.mjs';
import { dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'compare',
  title: seo.compare.title,
  description: seo.compare.description,
  image: seo.compare.image,
  header: 'solid',
  nav: 'aircraft',
};

export function render() {
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow('The aircraft')}
    <h1>Compare the line-up</h1>
    <p class="lede">One standing, two seated. All on NA80 flight control.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="compare-heads">
      ${aircraft
        .map(
          (a) => `<a class="compare-head" data-reveal href="${a.slug}.html">
          <img src="${a.image}" alt="${esc(a.imageAlt)}">
          <span class="compare-head__stance">${esc(a.stance)}</span>
          <span class="compare-head__name">${esc(a.name)}</span>
          <span class="text-link">View ${esc(a.name)}${icon('arrow')}</span>
        </a>`
        )
        .join('')}
    </div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Specification comparison">
      <table class="compare-table">
        <thead>
          <tr><th scope="col">Specification</th>${aircraft.map((a) => `<th scope="col">${esc(a.name)}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${compareRows
            .map(([label, get]) => `<tr><th scope="row">${esc(label)}</th>${aircraft.map((a) => `<td>${esc(get(a) ?? '—')}</td>`).join('')}</tr>`)
            .join('')}
        </tbody>
      </table>
    </div>
    <p class="footnote">* ${esc(flightTimeNote)}</p>
  </div>
</section>

<section class="section section--mist">
  <div class="container chooser">
    <div class="section-head" data-reveal>
      ${eyebrow('Choosing a model')}
      <h2>Which CoolFly suits the job?</h2>
    </div>
    <div class="chooser__grid">
      <article data-reveal><h3>Short, memorable flights</h3><p>Resorts, waterfronts, events. <a href="urban.html">Urban</a></p></article>
      <article data-reveal><h3>Personal recreation</h3><p>Weekends over open country. <a href="dream-st.html">Dream ST</a></p></article>
      <article data-reveal><h3>Longer routes, commercial use</h3><p>Sightseeing loops, ranch patrols. <a href="dream-pro.html">Dream PRO</a></p></article>
    </div>
  </div>
</section>

${dealerBand()}`;
}

const spec = (a, key) => a.specs.find((s) => s.label === key)?.value;

// Rows for the comparison table; each returns the cell for one aircraft.
const compareRows = [
  ['Pilot position', (a) => a.stance],
  ['Control', (a) => (a.slug === 'urban' ? 'Gravity sensing (weight shift)' : 'AI-assisted automatic control')],
  ['Top speed', (a) => spec(a, 'Top speed') ?? 'To be published'],
  ['Flight time*', (a) => spec(a, 'Flight time')?.replace('*', '')],
  ['Payload', (a) => spec(a, 'Max payload') ?? spec(a, 'Pilot capacity')],
  ['Aircraft weight', (a) => spec(a, 'Aircraft weight') ?? 'To be published'],
  ['Dimensions', (a) => spec(a, 'Dimensions (L × W × H)')],
  ['Propulsion', (a) => (a.slug === 'urban' ? 'Enclosed propeller propulsion' : '8 rotors, coaxial on 4 arms')],
  ['Parachute', () => 'Ballistic, rapid deployment'],
  ['Ingress protection', () => 'IP65'],
  ['Best for', (a) => spec(a, 'Applications')],
];
