/**
 * scroll.js — Scroll progress counter, parallax text strips, counter numbers
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  // ── Scroll progress % in hero ──
  const scrollPct = document.getElementById('scroll-pct');

  function updateScrollPct() {
    if (!scrollPct) return;
    const max    = document.documentElement.scrollHeight - window.innerHeight;
    const pct    = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
    scrollPct.textContent = pct;
  }

  // ── Parallax text strips ──
  const parallaxEls = [
    { el: document.getElementById('parallax-text'),   speed: 0.3  },
    { el: document.getElementById('parallax-text-2'), speed: -0.2 }
  ];

  function updateParallax() {
    parallaxEls.forEach(({ el, speed }) => {
      if (!el) return;
      const rect   = el.parentElement.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      el.style.transform = `translateX(${center * speed}px)`;
    });
  }

  // ── Navbar scroll behavior ──
  const navbar = document.getElementById('navbar');
  let lastY    = 0;

  function updateNavbar() {
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.style.background = 'rgba(8,8,8,0.92)';
    } else {
      navbar.style.background = 'transparent';
    }
    // Hide on scroll down, show on scroll up
    if (window.scrollY > lastY + 4 && window.scrollY > 200) {
      navbar.style.transform = 'translateY(-100%)';
    } else if (window.scrollY < lastY - 4) {
      navbar.style.transform = 'translateY(0)';
    }
    navbar.style.transition = 'transform 0.4s ease, background 0.4s ease';
    lastY = window.scrollY;
  }

  // ── Animated count-up numbers ──
  const countEls  = document.querySelectorAll('.count-num');
  const observed  = new Set();

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || observed.has(entry.target)) return;
      observed.add(entry.target);

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const dur    = 1400;
      const start  = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / dur, 1);
        // Ease out expo
        const eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }

      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });

  countEls.forEach((el) => countObserver.observe(el));

  // ── Stat bar accent line trigger ──
  const statItems = document.querySelectorAll('.stat-item');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.5 });
  statItems.forEach((el) => statObserver.observe(el));

  // ── Main scroll listener ──
  window.addEventListener('scroll', () => {
    updateScrollPct();
    updateParallax();
    updateNavbar();
  }, { passive: true });

  // Initial paint
  updateScrollPct();
  updateParallax();
})();
