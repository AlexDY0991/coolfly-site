// Single source of truth for aircraft content. Product pages, the compare
// page and the home line-up all read from here.
//
// Values come from the current coolflyaircraft.com product pages (Oct 2026).
// Anything marked `confirm` must be checked by CoolFly before launch.

export const flightTimeNote =
  'Flight time is based on piloted flight testing with a 70 kg pilot. Actual flight time varies with payload, operating conditions and flight profile.';

export const aircraft = [
  {
    slug: 'urban',
    name: 'Urban',
    fullName: 'CoolFly Urban',
    stance: 'Standing',
    tagline: 'Fly by instinct.',
    summary:
      'A standing-position aircraft you steer by shifting your weight.',
    lineup: 'Standing. Steer by leaning.',
    cardFacts: '11 min · 90 kg · IP65',
    image: 'assets/img/urban.webp',
    imageAlt: 'CoolFly Urban standing-position aircraft, three-quarter view',
    heroImage: 'assets/img/f-urban-lake.jpg',
    heroAlt: 'A pilot flying CoolFly Urban low over a lake',
    galleryImage: 'assets/img/f-urban-lake-2.jpg',
    galleryAlt: 'Urban hovering over a lake near moored boats',
    keyFigures: [
      { value: '11', unit: 'min', label: 'Flight time*' },
      { value: '90', unit: 'kg', label: 'Pilot capacity' },
      { value: 'IP65', unit: '', label: 'Water & dust' },
    ],
    story: [
      {
        title: 'Steer with your body',
        text: 'Lean to turn. Let go, and NA80 holds a hands-free hover.',
      },
      {
        title: 'Enclosed fans',
        text: 'Every rotor sits inside a guarded housing.',
      },
    ],
    safety: [
      'Race-car-inspired spaceframe safety cell',
      'Continues safe flight after the loss of one motor',
      'Hands-free hover and emergency functions',
      'Redundant battery and propulsion system',
      'Ballistic parachute with rapid deployment',
      'Radar-guided automatic landing',
    ],
    specs: [
      ['Configuration', 'Multi-rotor, enclosed fans'],
      ['Flight time', '11 min*'],
      ['Pilot capacity', '90 kg'],
      // confirm: current site lists "Max takeoff weight 254 kg". With a 90 kg
      // payload that implies ~164 kg empty, well above FAA Part 103 (254 lb).
      // Likely a lb/kg slip. Hidden until CoolFly confirms the figure.
      ['Dimensions (L × W × H)', '2200 × 2200 × 1768 mm'],
      ['Ingress protection', 'IP65'],
      ['Sensors', 'Aviation-grade IMU'],
      ['Flight control', 'NA80, triple redundant'],
      ['Applications', 'Tourism, outdoor recreation, waterfront, emergency response'],
    ],
    certs: [
      { img: 'assets/img/cert-urban-ce.jpg', label: 'CE Declaration of Conformity' },
      { img: 'assets/img/cert-urban-fcc.jpg', label: 'FCC Supplier’s Declaration of Conformity' },
    ],
  },
  {
    slug: 'dream-st',
    name: 'Dream ST',
    fullName: 'CoolFly Dream ST',
    stance: 'Seated',
    tagline: 'Light enough to be simple.',
    summary:
      'The lightest seated CoolFly, in T800 carbon fibre.',
    lineup: 'Seated. The lightest Dream.',
    cardFacts: '100 km/h · 16 min · ≤114 kg',
    image: 'assets/img/dream-st.webp',
    imageAlt: 'CoolFly Dream ST seated aircraft in orange and carbon',
    heroImage: 'assets/img/f-coast.jpg',
    heroAlt: 'CoolFly Dream flying along a rocky coastline at sunset',
    galleryImage: 'assets/img/f-dream-detail.jpg',
    galleryAlt: 'Close-up of the CoolFly Dream cockpit in flight',
    keyFigures: [
      { value: '100', unit: 'km/h', label: 'Top speed (limited)' },
      { value: '16', unit: 'min', label: 'Flight time*' },
      { value: '≤114', unit: 'kg', label: 'Aircraft weight' },
    ],
    story: [
      {
        title: 'Eight rotors, four arms',
        text: 'Lose any one motor and the other seven keep flying.',
      },
      {
        title: 'Automation where it counts',
        text: 'AI-assisted control, radar-guided automatic landing.',
      },
    ],
    safety: [
      'Aviation-grade T800 carbon-fibre structure',
      'Continues safe flight after the loss of one motor',
      'AI-assisted automatic control',
      'Multi-redundant IMU control system',
      'Ballistic parachute with rapid deployment',
      'Radar-guided automatic landing',
    ],
    specs: [
      ['Configuration', 'Multi-rotor, quad-axis, 8 rotors'],
      ['Top speed', '100 km/h (limited)'],
      ['Flight time', '16 min*'],
      ['Max payload', '95 kg'],
      ['Aircraft weight', '≤ 114 kg'],
      ['Dimensions (L × W × H)', '3500 × 3569 × 1182 mm'],
      ['Ingress protection', 'IP65'],
      ['Sensors', 'Aviation-grade IMU'],
      ['Flight control', 'NA80, triple redundant'],
      ['Applications', 'Tourism, outdoor recreation, urban air mobility, emergency response'],
    ],
    certs: [
      { img: 'assets/img/cert-dream-st-ce.jpg', label: 'CE Declaration of Conformity' },
      { img: 'assets/img/cert-dream-st-fcc.jpg', label: 'FCC Supplier’s Declaration of Conformity' },
    ],
  },
  {
    slug: 'dream-pro',
    name: 'Dream PRO',
    fullName: 'CoolFly Dream PRO',
    stance: 'Seated',
    tagline: 'Forty minutes in the air.',
    summary:
      'The long-endurance Dream, for longer routes and commercial flying.',
    lineup: 'Seated. Up to 40 minutes.',
    cardFacts: '40 min · 120 kg · 100 km/h',
    image: 'assets/img/dream-pro.webp',
    imageAlt: 'CoolFly Dream PRO seated aircraft in black',
    heroImage: 'assets/img/f-dream-farm.jpg',
    heroAlt: 'CoolFly Dream flying over green farmland',
    galleryImage: 'assets/img/f-dream-farm-2.jpg',
    galleryAlt: 'CoolFly Dream cruising over a field in evening light',
    keyFigures: [
      { value: '40', unit: 'min', label: 'Flight time*' },
      { value: '120', unit: 'kg', label: 'Max payload' },
      { value: '100', unit: 'km/h', label: 'Top speed (limited)' },
    ],
    story: [
      {
        title: 'Built for longer routes',
        text: 'Scenic loops, ranch patrols, a full operating day.',
      },
      {
        title: 'Same flight brain',
        text: 'Same NA80 flight control and eight-rotor layout as Dream ST.',
      },
    ],
    safety: [
      'Aviation-grade T800 carbon-fibre structure',
      'Continues safe flight after the loss of one motor',
      'AI-assisted automatic control',
      'Multi-redundant IMU control system',
      'Ballistic parachute with rapid deployment',
      'Radar-guided automatic landing',
    ],
    specs: [
      ['Configuration', 'Multi-rotor, quad-axis, 8 rotors'],
      ['Top speed', '100 km/h (limited)'],
      ['Flight time', '40 min*'],
      ['Max payload', '120 kg'],
      // confirm: ≤147 kg exceeds the FAA Part 103 empty-weight limit. State the
      // regulatory category Dream PRO is sold under in each market.
      ['Aircraft weight', '≤ 147 kg'],
      ['Dimensions (L × W × H)', '3850 × 4450 × 1182 mm'],
      ['Ingress protection', 'IP65'],
      ['Sensors', 'Aviation-grade IMU'],
      ['Flight control', 'NA80, triple redundant'],
      ['Applications', 'Tourism, farms & ranches, urban air mobility, emergency response'],
    ],
    certs: [
      { img: 'assets/img/cert-dream-pro-ce.jpg', label: 'CE Declaration of Conformity' },
      { img: 'assets/img/cert-dream-pro-fcc.jpg', label: 'FCC Supplier’s Declaration of Conformity' },
    ],
  },
];

// Rows for the compare table. `get` returns the cell for one aircraft.
export const compareRows = [
  ['Pilot position', (a) => a.stance],
  ['Control', (a) => (a.slug === 'urban' ? 'Gravity sensing (weight shift)' : 'AI-assisted automatic control')],
  ['Top speed', (a) => spec(a, 'Top speed') ?? 'To be published'],
  ['Flight time*', (a) => spec(a, 'Flight time')?.replace('*', '')],
  ['Payload', (a) => spec(a, 'Max payload') ?? spec(a, 'Pilot capacity')],
  ['Aircraft weight', (a) => spec(a, 'Aircraft weight') ?? 'To be published'],
  ['Dimensions', (a) => spec(a, 'Dimensions (L × W × H)')],
  ['Rotors', (a) => (a.slug === 'urban' ? 'Enclosed fans' : '8, coaxial on 4 arms')],
  ['Parachute', () => 'Ballistic, rapid deployment'],
  ['Ingress protection', () => 'IP65'],
  ['Best for', (a) => spec(a, 'Applications')],
];

function spec(a, key) {
  const row = a.specs.find(([k]) => k === key);
  return row ? row[1] : undefined;
}
