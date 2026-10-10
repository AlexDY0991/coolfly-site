import { button, eyebrow } from '../partials/ui.mjs';

export const meta = {
  slug: '404',
  title: 'Page not found',
  header: 'solid',
  nav: '',
};

export function render() {
  return `
<section class="page-head page-head--center">
  <div class="container">
    ${eyebrow('404')}
    <h1>This page has flown off.</h1>
    <p class="lede">The page you were looking for has moved or no longer exists.</p>
    <div class="actions">
      ${button('Back to home', 'index.html', 'primary')}
      ${button('See the aircraft', 'compare.html', 'secondary')}
    </div>
  </div>
</section>`;
}
