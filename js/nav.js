/**
 * nav.js — Mobile menu toggle + active nav link on scroll
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  const toggle   = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // ── Mobile Toggle ──
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      navLinks.classList.toggle('open', !isOpen);
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
        toggle.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
      }
    });
  }

  // ── Active Link Highlight on Scroll ──
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach((s) => sectionObserver.observe(s));

  // Add active link styles inline (avoids needing extra CSS rule)
  const style = document.createElement('style');
  style.textContent = `.nav-links a.active { color: var(--fg); }
  .nav-links a.active::after { transform: scaleX(1); }`;
  document.head.appendChild(style);
})();
