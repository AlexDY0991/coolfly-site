// Small shared helpers and components used by pages.

import { home } from '../content.mjs';

export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const paths = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  menu: '<path d="M3 7h18M3 17h18"/>',
  close: '<path d="M5 5l14 14M19 5L5 19"/>',
  external: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  play: '<path d="M8 5v14l11-7z"/>',
  pause: '<path d="M7 5h3v14H7zM14 5h3v14h-3z"/>',
};

export const icon = (name, cls = 'icon') =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths[name]}</svg>`;

export const button = (label, href, variant = 'primary', extra = '') =>
  `<a class="btn btn--${variant}" href="${href}"${extra}>${esc(label)}${icon('arrow')}</a>`;

export const eyebrow = (text) => `<p class="eyebrow">${esc(text)}</p>`;

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

// Reusable closing band that sends visitors to the dealer programme.
export const dealerBand = ({ title = home.dealerBand.title, text } = {}) => `
<section class="band band--signal">
  <div class="container band__inner" data-reveal>
    <div class="band__copy">
      <h2 class="band__title">${esc(title)}</h2>
      <p>${esc(text ?? home.dealerBand.text)}</p>
    </div>
    <div class="band__actions">
      ${button('Become a dealer', 'dealers.html', 'dark', ' data-track="become_dealer"')}
      ${button('Talk to sales', 'contact.html#sales', 'ghost-dark')}
    </div>
  </div>
</section>`;
