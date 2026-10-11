// Confirmation page after a successful form submission. Ad platforms can
// count a conversion when this page loads (see docs/运营手册.md).

import { t } from '../i18n.mjs';
import { button, esc, eyebrow } from '../partials/ui.mjs';

export const meta = {
  slug: 'thanks',
  title: t('thanks.title'),
  header: 'solid',
  nav: '',
  popup: false,
  noindex: true,
};

export function render() {
  return `
<section class="page-head page-head--center">
  <div class="container">
    ${eyebrow(t('thanks.eyebrow'))}
    <h1 data-thanks-title>${esc(t('thanks.heading'))}</h1>
    <p class="lede" data-thanks-text>${esc(t('thanks.text'))}</p>
    <div class="actions">
      ${button(t('common.seeAircraft'), 'compare.html', 'primary')}
      ${button(t('common.backHome'), 'index.html', 'secondary')}
    </div>
  </div>
</section>`;
}
