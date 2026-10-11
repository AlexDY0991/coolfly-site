// CoolFly site behaviour. No dependencies.

// Where each form posts. Leave empty until a backend or form service exists;
// the form then validates and tells the visitor it is not connected yet.
const FORM_ENDPOINTS = {
  dealer: '',
  contact: '',
};

// Dealer pop-up: shown once per visitor, after a delay or partway down the page.
const POPUP = { delayMs: 15000, scrollShare: 0.45, snoozeDays: 7, storageKey: 'coolfly-dealer-popup' };

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const header = document.querySelector('.site-header');
const root = document.documentElement;

/* ---------- Start every new page at the top ---------- */

// Browsers (and embedded previews) can restore an old scroll position when a
// page is opened. Only back/forward navigation should do that.
const navType = performance.getEntriesByType('navigation')[0]?.type;
if (!location.hash && navType !== 'back_forward') {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);
  window.addEventListener('load', () => window.scrollTo(0, 0));
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });

// A link to the page you are already on scrolls back to the top instead.
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link || e.metaKey || e.ctrlKey || e.shiftKey || link.target === '_blank') return;
  const url = new URL(link.href, location.href);
  const here = url.pathname === location.pathname || (url.pathname.endsWith('/index.html') && location.pathname.endsWith('/'));
  if (url.origin === location.origin && here && !url.hash && url.search === location.search) {
    e.preventDefault();
    scrollToTop();
  }
});

const toTop = document.querySelector('[data-to-top]');
toTop?.addEventListener('click', (e) => {
  e.preventDefault();
  scrollToTop();
  document.getElementById('main')?.focus({ preventScroll: true });
});

/* ---------- Scroll-driven chrome: header, progress, back to top ---------- */

let lastY = window.scrollY;
function onScrollChrome() {
  const y = window.scrollY;
  const max = root.scrollHeight - window.innerHeight;
  root.style.setProperty('--progress', max > 0 ? (y / max).toFixed(4) : '0');
  if (header) {
    header.classList.toggle('is-scrolled', y > 24);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 320) header.classList.add('is-hidden');
    else if (goingUp || y < 120) header.classList.remove('is-hidden');
  }
  toTop?.classList.toggle('is-visible', y > window.innerHeight * 0.9);
  lastY = y;
}
onScrollChrome();
window.addEventListener('scroll', onScrollChrome, { passive: true });

/* ---------- Navigation ---------- */

const toggles = document.querySelectorAll('.nav__toggle');
const closeMenus = (except) => toggles.forEach((t) => t !== except && t.setAttribute('aria-expanded', 'false'));
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
window.matchMedia('(min-width: 1001px)').addEventListener('change', (e) => e.matches && setMobile(false));

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = document.querySelector('.nav__toggle[aria-expanded="true"]');
  closeMenus();
  if (open) open.focus();
  if (header?.classList.contains('is-open')) setMobile(false, true);
});

/* ---------- Hero film and HUD ---------- */

const video = document.querySelector('.hero__video');
const videoToggle = document.querySelector('[data-video-toggle]');
if (video && videoToggle) {
  const setPaused = (paused) => {
    videoToggle.setAttribute('aria-pressed', String(paused));
    if (paused) video.pause();
    else video.play().catch(() => videoToggle.setAttribute('aria-pressed', 'true'));
  };
  if (reduceMotion) {
    video.removeAttribute('autoplay');
    setPaused(true);
  }
  videoToggle.addEventListener('click', () => setPaused(!video.paused));
}

// HUD readout cycles through real specifications with a brief scramble.
const hud = document.querySelector('[data-hud-cycle]');
if (hud && !reduceMotion) {
  const lines = JSON.parse(hud.dataset.hudCycle);
  const glyphs = '0123456789/-+<>#';
  let index = 0;
  const scrambleTo = (text) => {
    let frame = 0;
    const total = 14;
    const tick = () => {
      frame += 1;
      const settled = Math.floor((frame / total) * text.length);
      hud.textContent = text
        .split('')
        .map((ch, i) => (i < settled || ch === ' ' ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
        .join('');
      if (frame < total) requestAnimationFrame(tick);
      else hud.textContent = text;
    };
    tick();
  };
  setInterval(() => {
    index = (index + 1) % lines.length;
    scrambleTo(lines[index]);
  }, 3200);
}

/* ---------- Reveal on scroll, count-up numbers ---------- */

const countUp = (el) => {
  const target = Number(el.dataset.count);
  if (reduceMotion || !Number.isFinite(target)) return;
  const start = performance.now();
  const duration = 1400;
  const step = (now) => {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 4);
    el.textContent = String(Math.round(target * eased));
    if (t < 1) requestAnimationFrame(step);
  };
  el.textContent = '0';
  requestAnimationFrame(step);
};

const revealables = [...document.querySelectorAll('[data-reveal]')];
// Stagger siblings that reveal together, such as cards in a row.
revealables.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
  const i = siblings.indexOf(el);
  if (siblings.length > 1 && i > 0) el.style.setProperty('--d', `${Math.min(i, 6) * 0.09}s`);
});

const reveal = (el) => {
  el.classList.add('is-in');
  el.querySelectorAll('[data-count]').forEach(countUp);
};

if (reduceMotion || !('IntersectionObserver' in window)) {
  revealables.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
  );
  revealables.forEach((el) => io.observe(el));
}

/* ---------- Scroll-linked effects: statement words, expanding panels, parallax ---------- */

const statements = [...document.querySelectorAll('.statement .statement__text')];
statements.forEach((el) => {
  el.innerHTML = el.textContent
    .trim()
    .split(/\s+/)
    .map((w) => `<span class="word">${w}</span>`)
    .join(' ');
  el.classList.add('is-split');
});

const expands = [...document.querySelectorAll('[data-expand]')];
const parallax = [...document.querySelectorAll('[data-parallax]')];

function onScrollEffects() {
  const vh = window.innerHeight;

  statements.forEach((el) => {
    const r = el.getBoundingClientRect();
    const progress = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5)));
    const words = el.querySelectorAll('.word');
    const lit = Math.round(progress * words.length);
    words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
  });

  expands.forEach((el) => {
    const r = el.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
    el.style.setProperty('--p', p.toFixed(3));
  });

  parallax.forEach((img) => {
    const r = img.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const centre = r.top + r.height / 2 - vh / 2;
    img.style.setProperty('--shift', `${(-centre * 0.08).toFixed(1)}px`);
    if (!img.closest('.expand')) img.style.transform = `translate3d(0, ${(-centre * 0.08).toFixed(1)}px, 0) scale(1.1)`;
  });
}

if (!reduceMotion && (statements.length || expands.length || parallax.length)) {
  let ticking = false;
  const request = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScrollEffects();
      ticking = false;
    });
  };
  onScrollEffects();
  window.addEventListener('scroll', request, { passive: true });
  window.addEventListener('resize', request);
} else {
  statements.forEach((el) => el.querySelectorAll('.word').forEach((w) => w.classList.add('is-lit')));
}

/* ---------- Milestones: pinned horizontal timeline ---------- */

const milestones = document.querySelector('[data-hscroll]');
if (milestones) {
  const track = milestones.querySelector('.milestones__track');
  const items = [...milestones.querySelectorAll('.ms')];
  const wide = window.matchMedia('(min-width: 901px)');
  let distance = 0;

  const layout = () => {
    const pinned = wide.matches && !reduceMotion;
    milestones.classList.toggle('is-pinned', pinned);
    track.style.transform = '';
    if (pinned) {
      distance = Math.max(0, track.scrollWidth - window.innerWidth);
      milestones.style.height = `${window.innerHeight + distance}px`;
    } else {
      milestones.style.height = '';
    }
    update();
  };

  const update = () => {
    const r = milestones.getBoundingClientRect();
    const vh = window.innerHeight;
    let progress;
    if (milestones.classList.contains('is-pinned')) {
      progress = distance ? Math.min(1, Math.max(0, -r.top / distance)) : 1;
      track.style.transform = `translate3d(${(-progress * distance).toFixed(1)}px, 0, 0)`;
      // A year lights up as it moves into the left part of the screen; all are lit at the end.
      items.forEach((item) => item.classList.toggle('is-active', progress > 0.98 || item.getBoundingClientRect().left < window.innerWidth * 0.7));
    } else {
      progress = Math.min(1, Math.max(0, (vh * 0.6 - r.top) / r.height));
      items.forEach((item) => item.classList.toggle('is-active', reduceMotion || item.getBoundingClientRect().top < vh * 0.6));
    }
    milestones.style.setProperty('--ms', progress.toFixed(3));
  };

  layout();
  window.addEventListener('resize', layout);
  wide.addEventListener('change', layout);
  window.addEventListener('load', layout);
  let pending = false;
  window.addEventListener(
    'scroll',
    () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        update();
        pending = false;
      });
    },
    { passive: true }
  );
}

/* ---------- Dealer pop-up ---------- */

const popup = document.getElementById('dealer-popup');
const storage = {
  get() {
    try {
      return Number(localStorage.getItem(POPUP.storageKey)) || 0;
    } catch {
      return 0;
    }
  },
  set() {
    try {
      localStorage.setItem(POPUP.storageKey, String(Date.now()));
    } catch {
      /* Storage unavailable: the pop-up may show again next visit. */
    }
  },
};

if (popup && typeof popup.showModal === 'function') {
  const snoozed = Date.now() - storage.get() < POPUP.snoozeDays * 864e5;
  let shown = false;
  const open = () => {
    if (shown || document.querySelector('dialog[open]') || header?.classList.contains('is-open')) return;
    shown = true;
    storage.set();
    popup.showModal();
    // Focus the heading so the first field does not open a phone keyboard.
    popup.querySelector('#popup-title')?.focus();
    window.removeEventListener('scroll', onScrollPopup);
  };
  const onScrollPopup = () => {
    const max = root.scrollHeight - window.innerHeight;
    if (max > 0 && window.scrollY / max > POPUP.scrollShare) open();
  };
  if (!snoozed) {
    setTimeout(open, POPUP.delayMs);
    window.addEventListener('scroll', onScrollPopup, { passive: true });
  }
  popup.querySelector('[data-popup-close]')?.addEventListener('click', () => popup.close());
  // Clicking the dimmed backdrop closes the pop-up.
  popup.addEventListener('click', (e) => {
    if (e.target === popup) popup.close();
  });
}

/* ---------- Forms ---------- */

// Contact form: preselect topic and model from the link, e.g.
// contact.html?topic=demo&model=urban#sales
const params = new URLSearchParams(location.search);
for (const [name, id] of [['topic', 'c-topic'], ['model', 'c-model']]) {
  const el = document.getElementById(id);
  const value = params.get(name);
  if (el && value && [...el.options].some((o) => o.value === value)) el.value = value;
}

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
        body: JSON.stringify({ form: form.dataset.form, source: form.dataset.source || 'page', page: location.pathname, ...data }),
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
