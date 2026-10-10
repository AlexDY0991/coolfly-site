import { button, dealerBand, eyebrow, icon } from '../partials/ui.mjs';

export const meta = {
  slug: 'safety',
  title: 'Safety & technology',
  description: 'How CoolFly builds safety into every aircraft: NA80 triple-redundant flight control, motor-out capability, ballistic parachute, radar auto-landing and IP65 protection.',
  header: 'overlay',
  nav: 'safety',
  image: 'assets/img/flight-controller.jpg',
};

const layers = [
  {
    title: 'Flight control',
    head: 'NA80, built in-house',
    text: 'Three channels run at once. If one fails, NA80 isolates it in milliseconds.',
    points: ['Triple redundancy', 'Millisecond fault isolation', 'Multi-redundant IMU'],
  },
  {
    title: 'Propulsion',
    head: 'Lose a motor, keep flying',
    text: 'Safe flight continues after any single motor failure.',
    points: ['Eight rotors on Dream', 'Enclosed fans on Urban', 'Redundant battery and propulsion'],
  },
  {
    title: 'Structure',
    head: 'A cell around the pilot',
    text: 'T800 carbon fibre on Dream. A spaceframe safety cell on Urban.',
    points: ['T800 carbon fibre', 'Spaceframe safety cell', 'IP65 water and dust'],
  },
  {
    title: 'Recovery',
    head: 'When something goes wrong',
    text: 'Hover hands-free, land automatically, or deploy the parachute.',
    points: ['Hands-free hover', 'Radar-guided auto-landing', 'Ballistic parachute'],
  },
];

export function render() {
  return `
<section class="product-hero product-hero--short">
  <img class="product-hero__img" src="assets/img/flight-controller.jpg" alt="The CoolFly NA80 flight control unit" width="1100" height="1467" data-parallax>
  <div class="product-hero__shade"></div>
  <div class="container product-hero__content">
    <p class="eyebrow product-hero__eyebrow">Safety & technology</p>
    <h1 class="product-hero__title product-hero__title--md"><span class="line"><span>Safety by</span></span><span class="line"><span>architecture.</span></span></h1>
    <p class="product-hero__tagline">We build the core technology ourselves, so redundancy is designed in from the start.</p>
  </div>
</section>

<section class="section section--tight">
  <div class="container">
    <ol class="layers">
      ${layers
        .map(
          (l, i) => `<li class="layer" data-reveal>
          <p class="layer__index"><span>0${i + 1}</span>${l.title}</p>
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
    <div class="section-head" data-reveal>
      ${eyebrow('Flying legally')}
      <h2>Rules by market</h2>
      <p class="section-head__note">Your dealer confirms current requirements before delivery.</p>
    </div>
    <div class="table-scroll" tabindex="0" role="region" aria-label="Rules by market" data-reveal>
      <table class="rules-table">
        <thead><tr><th scope="col">Market</th><th scope="col">Framework</th><th scope="col">For pilots</th></tr></thead>
        <tbody>
          <tr><th scope="row">United States</th><td>FAA Part 103 ultralight</td><td>No pilot, medical or airworthiness certificate. Daylight, away from crowds and controlled airspace.</td></tr>
          <tr><th scope="row">Europe</th><td>National ultralight rules</td><td>Set by each country. Supported from our Paris office.</td></tr>
          <tr><th scope="row">Australia</th><td>National recreational aviation rules</td><td>Your dealer advises on registration and training.</td></tr>
          <tr><th scope="row">Middle East</th><td>Each country’s aviation authority</td><td>Your dealer advises on private and commercial approvals.</td></tr>
          <tr><th scope="row">China</th><td>Low-altitude economy framework</td><td>Supported directly from Hangzhou.</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section">
  <div class="container assurance">
    <article data-reveal>
      ${eyebrow('Insurance')}
      <h2>Covered for manned flight</h2>
      <p>Insurance for manned operations in China and internationally.</p>
    </article>
    <article data-reveal>
      ${eyebrow('Conformity')}
      <h2>CE and FCC</h2>
      <p>Declarations for every model, on each aircraft page.</p>
    </article>
    <article data-reveal>
      ${eyebrow('Training')}
      <h2>Trained before you fly</h2>
      <p>Pilots train with their dealer. Dealers train with us.</p>
      ${button('Dealer support', 'dealers.html#support', 'secondary')}
    </article>
  </div>
</section>

${dealerBand()}`;
}
