import { t } from '../i18n.mjs';
import { button, esc, eyebrow } from '../partials/ui.mjs';

export const meta = {
  slug: '404',
  title: t('404.title'),
  header: 'solid',
  nav: '',
  popup: false,
};

export function render() {
  return `
<section class="page-head page-head--center">
  <div class="container">
    ${eyebrow('404')}
    <h1>${esc(t('404.heading'))}</h1>
    <p class="lede">${esc(t('404.text'))}</p>
    <div class="actions">
      ${button(t('common.backHome'), 'index.html', 'primary')}
      ${button(t('common.seeAircraft'), 'compare.html', 'secondary')}
    </div>
  </div>
</section>`;
}
