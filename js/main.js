/* Grain — shared site behavior: theme toggle, mobile nav, active-link
   highlighting, scroll reveal, FAQ accordion, contact form placeholder.
   Every feature checks that its markup exists before wiring up, so this
   one file can be included on every page regardless of what's on it. */

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.toggle('reduced-motion', prefersReducedMotion);

/* ---------- Theme toggle ---------- */
function initTheme() {
  const toggle = document.querySelector('.theme-toggle');
  if (!toggle) return;

  const stored = localStorage.getItem('grain-theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  toggle.addEventListener('click', () => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = document.documentElement.getAttribute('data-theme') || (systemDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('grain-theme', next);
  });
}

/* ---------- Mobile nav ---------- */
function initNav() {
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('navList');
  if (!navToggle || !navList) return;

  const closeNav = () => {
    navList.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navList.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNav();
  });

  document.addEventListener('click', (event) => {
    if (!navList.classList.contains('open')) return;
    if (navList.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });
}

/* ---------- Active nav link ---------- */
function markActiveNav() {
  const page = document.body.dataset.page;
  if (!page) return;
  document.querySelectorAll('.nav-link').forEach((link) => {
    if (link.dataset.nav === page) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------- FAQ accordion ---------- */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');
    const inner = item.querySelector('.accordion-panel-inner');
    if (!trigger || !panel || !inner) return;

    trigger.addEventListener('click', () => {
      const willOpen = item.getAttribute('data-open') !== 'true';
      panel.style.setProperty('--panel-height', willOpen ? `${inner.scrollHeight}px` : '0px');
      item.setAttribute('data-open', String(willOpen));
      trigger.setAttribute('aria-expanded', String(willOpen));
    });
  });
}

/* ---------- Contact / booking form ---------- */
function initContactForm() {
  const form = document.getElementById('bookingForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    const name = document.getElementById('name');
    const greeting = name && name.value.trim() ? `Thanks, ${name.value.trim()}` : 'Thanks';
    status.textContent = `${greeting} — this is a placeholder confirmation. Connect this form to a real booking backend (email service, Calendly, Fresha, etc.) to take live requests.`;
    form.reset();
  });
}

initTheme();
initNav();
markActiveNav();
initReveal();
initAccordion();
initContactForm();
