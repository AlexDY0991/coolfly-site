// CoolFly site behaviour. No dependencies.

// Where each form posts. Leave empty until a backend or form service exists;
// the form then validates and tells the visitor it is not connected yet.
const FORM_ENDPOINTS = {
  dealer: '',
  contact: '',
};

const header = document.querySelector('.site-header');

// Header turns solid once the page scrolls past the top.
if (header) {
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

// Desktop dropdowns.
const toggles = document.querySelectorAll('.nav__toggle');
const closeMenus = (except) => {
  toggles.forEach((t) => {
    if (t !== except) t.setAttribute('aria-expanded', 'false');
  });
};
toggles.forEach((toggle) => {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = toggle.getAttribute('aria-expanded') === 'true';
    closeMenus(toggle);
    toggle.setAttribute('aria-expanded', String(!open));
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav__group')) closeMenus();
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = document.querySelector('.nav__toggle[aria-expanded="true"]');
  closeMenus();
  if (open) open.focus();
  if (header?.classList.contains('is-open')) setMobile(false, true);
});

// Mobile menu.
const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
function setMobile(open, returnFocus = false) {
  if (!menuButton || !mobileMenu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
  header.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
  if (!open && returnFocus) menuButton.focus();
}
menuButton?.addEventListener('click', () => setMobile(menuButton.getAttribute('aria-expanded') !== 'true'));
mobileMenu?.addEventListener('click', (e) => {
  if (e.target.closest('a')) setMobile(false);
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', (e) => {
  if (e.matches) setMobile(false);
});

// Hero film: respects reduced motion and offers a pause control.
const video = document.querySelector('.hero__video');
const videoToggle = document.querySelector('[data-video-toggle]');
if (video && videoToggle) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const setPaused = (paused) => {
    videoToggle.setAttribute('aria-pressed', String(paused));
    if (paused) video.pause();
    else video.play().catch(() => videoToggle.setAttribute('aria-pressed', 'true'));
  };
  if (reduce.matches) {
    video.removeAttribute('autoplay');
    setPaused(true);
  }
  videoToggle.addEventListener('click', () => setPaused(!video.paused));
  video.addEventListener('error', () => videoToggle.hidden = true, true);
}

// Tabs (applications).
document.querySelectorAll('[data-tabs]').forEach((root) => {
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const select = (tab, focus) => {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute('aria-controls'));
      if (panel) panel.toggleAttribute('data-inactive', !on);
    });
    if (focus) tab.focus();
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      const next = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(tabs[(next + tabs.length) % tabs.length], true);
    });
  });
});

// Contact form: preselect topic and model from the link, e.g.
// contact.html?topic=demo&model=urban#sales
const params = new URLSearchParams(location.search);
for (const [name, id] of [['topic', 'c-topic'], ['model', 'c-model']]) {
  const el = document.getElementById(id);
  const value = params.get(name);
  if (el && value && [...el.options].some((o) => o.value === value)) el.value = value;
}

// Forms: validate on the client, then post as JSON if an endpoint is set.
document.querySelectorAll('form[data-form]').forEach((form) => {
  const status = form.querySelector('.form__status');
  const setStatus = (text, state) => {
    status.textContent = text;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  form.addEventListener('input', (e) => {
    if (e.target.getAttribute('aria-invalid') === 'true' && e.target.checkValidity()) {
      e.target.removeAttribute('aria-invalid');
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const invalid = [...form.elements].filter((el) => el.willValidate && !el.checkValidity());
    form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
    if (invalid.length) {
      invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
      invalid[0].focus();
      const consent = invalid.find((el) => el.name === 'consent');
      setStatus(
        consent && invalid.length === 1
          ? 'Please tick the consent box so we can store your details.'
          : 'Please complete the highlighted fields.',
        'error'
      );
      return;
    }

    const endpoint = FORM_ENDPOINTS[form.dataset.form];
    if (!endpoint) {
      setStatus(
        `This form is not connected yet. Please email ${form.dataset.form === 'dealer' ? 'business@coolflyaircraft.com' : 'support@coolflyaircraft.com'} instead.`,
        'error'
      );
      return;
    }

    const data = {};
    new FormData(form).forEach((value, key) => {
      data[key] = key in data ? [].concat(data[key], value) : value;
    });
    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    setStatus('Sending…');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ form: form.dataset.form, page: location.pathname, ...data }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus('Thank you. Your message has been sent and our team will be in touch.', 'ok');
    } catch {
      setStatus('Sending failed. Please try again, or email us directly.', 'error');
    } finally {
      submit.disabled = false;
    }
  });
});

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});
