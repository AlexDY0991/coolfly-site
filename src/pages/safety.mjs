import { button, dealerBand, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'safety',
  title: 'Safety & technology',
  description: 'How CoolFly builds safety into every aircraft: NA80 triple-redundant flight control, motor-out capability, ballistic parachute, radar auto-landing and IP65 protection.',
  header: 'solid',
  nav: 'safety',
};

const layers = [
  {
    title: 'Flight control',
    head: 'NA80, built in-house',
    text: 'NA80 is CoolFly’s own flight controller, designed for manned eVTOL aircraft. Three redundant channels run simultaneously. When one fails, the system detects it, isolates it and reconfigures within milliseconds, without upsetting the aircraft.',
    points: ['Aviation-grade triple redundancy', 'Millisecond-level fault isolation', 'Multi-redundant IMU sensing'],
  },
  {
    title: 'Propulsion',
    head: 'Lose a motor, keep flying',
    text: 'Dream uses eight high-efficiency power units on four arms. Urban uses enclosed, guarded fans. In both, the aircraft continues safe flight after any single motor failure, and the battery and propulsion system is redundant.',
    points: ['Quad-axis, eight-rotor layout on Dream', 'Enclosed fan design on Urban', 'Redundant battery and propulsion'],
  },
  {
    title: 'Structure',
    head: 'A cell around the pilot',
    text: 'Dream’s frame is aviation-grade T800 carbon fibre. Urban surrounds the pilot with a spaceframe safety cell inspired by race cars.',
    points: ['T800 carbon-fibre structure', 'Spaceframe safety cell on Urban', 'IP65 water and dust protection'],
  },
  {
    title: 'Recovery',
    head: 'When something goes wrong',
    text: 'Hands-free hover lets the pilot stop and reset. A radar sensor guides automatic landing. For the rare case that needs it, a ballistic parachute deploys rapidly and lowers the aircraft to the ground.',
    points: ['Hands-free hover and emergency functions', 'Radar-guided automatic landing', 'Ballistic parachute, rapid deployment'],
  },
];

export function render() {
  return `
<section class="page-head page-head--split">
  <div class="container page-head__grid">
    <div>
      ${eyebrow('Safety & technology')}
      <h1>Safety by architecture.</h1>
      <p class="lede">From flight control to propulsion, CoolFly develops the core technology in its aircraft itself. That lets us design redundancy in from the start instead of adding it later.</p>
    </div>
    <img src="assets/img/flight-controller.jpg" alt="The CoolFly NA80 flight control unit" width="1100" height="1467">
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <ol class="layers">
      ${layers
        .map(
          (l, i) => `<li class="layer">
          <p class="layer__index">Layer ${i + 1} · ${l.title}</p>
          <h2>${l.head}</h2>
          <p>${l.text}</p>
          <ul>${l.points.map((p) => `<li>${icon('check')}${p}</li>`).join('')}</ul>
        </li>`
        )
        .join('')}
    </ol>
  </div>
</section>

<section class="section section--night" id="rules">
  <div class="container">
    <div class="section-head">
      ${eyebrow('Flying legally')}
      <h2>Regulations by market</h2>
      <p class="section-head__note">Rules differ by country and change over time. Your authorised dealer confirms the current requirements for your model and location before delivery.</p>
    </div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Regulations by market">
      <table class="rules-table">
        <thead><tr><th scope="col">Market</th><th scope="col">Framework</th><th scope="col">What it means for pilots</th></tr></thead>
        <tbody>
          <tr><th scope="row">United States</th><td>FAA Part 103, ultralight vehicles</td><td>No pilot certificate, medical certificate or airworthiness certificate. Daylight flying, away from congested areas and controlled airspace. Weight and speed limits apply per model.</td></tr>
          <tr><th scope="row">Europe</th><td>National ultralight rules in each country</td><td>Registration, pilot training and operating areas are set nationally. Our Paris office supports European dealers.</td></tr>
          <tr><th scope="row">Australia</th><td>National rules for ultralight and recreational aircraft</td><td>Your dealer advises on registration and training.</td></tr>
          <tr><th scope="row">Middle East</th><td>Rules set by each country’s aviation authority</td><td>Your dealer advises on approvals for private and commercial use.</td></tr>
          <tr><th scope="row">China</th><td>National low-altitude economy framework</td><td>CoolFly operates from Hangzhou and supports domestic dealers directly.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container assurance">
    <article>
      ${eyebrow('Insurance')}
      <h2>Covered for manned operations</h2>
      <p>CoolFly has secured comprehensive insurance coverage for manned aircraft operations, both in China and internationally.</p>
    </article>
    <article>
      ${eyebrow('Product conformity')}
      <h2>CE and FCC declarations</h2>
      <p>Urban, Dream ST and Dream PRO each hold CE and FCC declarations of conformity for electromagnetic compatibility. The documents are on each aircraft page.</p>
    </article>
    <article>
      ${eyebrow('Training')}
      <h2>Trained before you fly</h2>
      <p>Pilots are trained by their authorised dealer at delivery. Dealers are trained and supported by CoolFly’s team in Hangzhou.</p>
      ${button('How dealers support pilots', 'dealers.html#support', 'secondary')}
    </article>
  </div>
</section>

${dealerBand()}`;
}
