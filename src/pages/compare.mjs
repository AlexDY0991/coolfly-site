import { aircraft, compareRows, flightTimeNote } from '../data/aircraft.mjs';
import { dealerBand, esc, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'compare',
  title: 'Compare aircraft',
  description: 'Compare CoolFly Urban, Dream ST and Dream PRO side by side: speed, flight time, payload, size and safety features.',
  header: 'solid',
  nav: 'aircraft',
};

export function render() {
  return `
<section class="page-head">
  <div class="container">
    ${eyebrow('The aircraft')}
    <h1>Compare the line-up</h1>
    <p class="lede">One standing aircraft and two seated ones, all built on the same NA80 flight controller. Here is how they differ.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <div class="compare-heads">
      ${aircraft
        .map(
          (a) => `<a class="compare-head" href="${a.slug}.html">
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
    <div class="section-head">
      ${eyebrow('Choosing a model')}
      <h2>Which CoolFly suits the job?</h2>
    </div>
    <div class="chooser__grid">
      <article><h3>Short, memorable flights</h3><p>Resort attractions, waterfront hops and event demonstrations. <a href="urban.html">Urban</a> is compact, guarded and instantly recognisable.</p></article>
      <article><h3>Personal recreation</h3><p>Weekend flying over open country and coastline. <a href="dream-st.html">Dream ST</a> is the lightest seated aircraft in the range.</p></article>
      <article><h3>Longer routes and commercial use</h3><p>Sightseeing loops, ranch patrols and full operating days. <a href="dream-pro.html">Dream PRO</a> offers up to 40 minutes and 120 kg payload.</p></article>
    </div>
  </div>
</section>

${dealerBand()}`;
}
