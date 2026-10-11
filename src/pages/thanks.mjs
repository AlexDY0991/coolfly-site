// Confirmation page after a successful form submission. Ad platforms can
// count a conversion when this page loads (see docs/运营手册.md).

import { button, eyebrow } from '../partials/ui.mjs';

export const meta = {
  slug: 'thanks',
  title: 'Thank you',
  header: 'solid',
  nav: '',
  popup: false,
  noindex: true,
};

export function render() {
  return `
<section class="page-head page-head--center">
  <div class="container">
    ${eyebrow('Message received')}
    <h1 data-thanks-title>Thank you. We will be in touch.</h1>
    <p class="lede" data-thanks-text>Our team has your details and will reply by email.</p>
    <div class="actions">
      ${button('See the aircraft', 'compare.html', 'primary')}
      ${button('Back to home', 'index.html', 'secondary')}
    </div>
  </div>
</section>`;
}
