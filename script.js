/* ── Config ── */
const TYPING_PHRASES = [
  'Computer Science Student',
  'ML Researcher',
  'Data Engineer',
  'Deep Learning Enthusiast',
];
const TYPE_SPEED   = 80;
const DELETE_SPEED = 40;
const PAUSE_END    = 1800;
const PAUSE_START  = 400;

/* ── Theme Module ── */
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  applyTheme(saved);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('theme', next);
}

/* ── Typing Animation ── */
function initTyping() {
  const el = document.querySelector('.typed-text');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function tick() {
    const phrase = TYPING_PHRASES[phraseIndex];
    el.textContent = phrase.substring(0, charIndex);

    if (!isDeleting) {
      charIndex++;
      if (charIndex > phrase.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_END);
        return;
      }
    } else {
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % TYPING_PHRASES.length;
        setTimeout(tick, PAUSE_START);
        return;
      }
    }

    setTimeout(tick, isDeleting ? DELETE_SPEED : TYPE_SPEED);
  }

  tick();
}

/* ── Scroll Reveal ── */
function initReveal() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  elements.forEach(el => {
    el.classList.add('reveal-hidden');
    const direction = el.dataset.reveal || 'fade-up';
    if (direction === 'fade-left') el.classList.add('reveal-from-left');
    if (direction === 'fade-down') el.classList.add('reveal-from-down');
    if (el.dataset.revealDelay) {
      el.style.transitionDelay = el.dataset.revealDelay + 'ms';
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

/* ── Active Nav ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const match = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(section => observer.observe(section));
}

/* ── Scrolled Header ── */
function initScrolledHeader() {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ── Mobile Nav ── */
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const header = document.querySelector('header');
  if (!toggle || !header) return;

  toggle.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => header.classList.remove('nav-open'));
  });
}

/* ── Bootstrap ── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTyping();
  initReveal();
  initActiveNav();
  initScrolledHeader();
  initMobileNav();
});
