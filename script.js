// Purposeful motion, navigation, mobile menu, and contact handoff.
const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

document.body.classList.add('is-loading');

// Lightweight page-load choreography. Content remains available without animation.
requestAnimationFrame(() => requestAnimationFrame(() => {
  document.body.classList.remove('is-loading');
  document.body.classList.add('page-ready');
}));

// Progress is transform-only to avoid layout work while scrolling.
const progress = document.createElement('div');
progress.className = 'scroll-progress';
progress.setAttribute('aria-hidden', 'true');
document.body.append(progress);

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
  document.body.classList.toggle('menu-open', !open);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

let lastScrollY = window.scrollY;
let scrollTicking = false;

const updateScrollUI = () => {
  const currentY = Math.max(window.scrollY, 0);
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
  progress.style.transform = `scaleX(${Math.min(currentY / scrollable, 1)})`;
  header.classList.toggle('scrolled', currentY > 24);

  const movingDown = currentY > lastScrollY + 5;
  const movingUp = currentY < lastScrollY - 5;
  if (!document.body.classList.contains('menu-open')) {
    if (movingDown && currentY > 260) header.classList.add('nav-hidden');
    if (movingUp || currentY < 120) header.classList.remove('nav-hidden');
  }

  lastScrollY = currentY;
  scrollTicking = false;
};

window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    requestAnimationFrame(updateScrollUI);
    scrollTicking = true;
  }
}, { passive: true });
updateScrollUI();

// Stagger repeated elements without adding markup or timers.
document.querySelectorAll('.service-row, .impact-card, .project-card, .help-card').forEach((item, index) => {
  item.style.setProperty('--reveal-delay', `${(index % 6) * 45}ms`);
});

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: '0px 0px -6% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}

// Quietly signal the current section in the primary navigation.
if ('IntersectionObserver' in window) {
  const sectionLinks = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map((link) => [link.getAttribute('href').slice(1), link])
  );
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      sectionLinks.forEach((link) => link.removeAttribute('aria-current'));
      sectionLinks.get(entry.target.id)?.setAttribute('aria-current', 'location');
    });
  }, { rootMargin: '-30% 0px -62% 0px' });
  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));
}

// Desktop-only ambient pointer light; native cursor and accessibility stay intact.
if (finePointer && !reduceMotion) {
  const cursorLight = document.createElement('div');
  cursorLight.className = 'cursor-light';
  cursorLight.setAttribute('aria-hidden', 'true');
  document.body.append(cursorLight);

  let pointerX = -300;
  let pointerY = -300;
  let cursorFrame = 0;
  document.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!cursorFrame) {
      cursorFrame = requestAnimationFrame(() => {
        cursorLight.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`;
        cursorFrame = 0;
      });
    }
  }, { passive: true });

  document.querySelectorAll('a, button, input, select, textarea, .project-card, .impact-card, .help-card')
    .forEach((item) => {
      item.addEventListener('pointerenter', () => cursorLight.classList.add('is-active'));
      item.addEventListener('pointerleave', () => cursorLight.classList.remove('is-active'));
    });
}

document.querySelector('[data-year]').textContent = new Date().getFullYear();

document.querySelector('[data-contact-form]').addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const subject = encodeURIComponent(`${data.get('interest')} — inquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nInterest: ${data.get('interest')}\n\nProblem or opportunity:\n${data.get('message')}`);
  window.location.href = `mailto:iniemailnana@gmail.com?subject=${subject}&body=${body}`;
});
