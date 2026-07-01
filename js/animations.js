/**
 * animations.js — Scroll-reveal IntersectionObserver + magnetic button effect
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  // ── Scroll Reveal ──
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, unobserve to save performance
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach((el) => revealObserver.observe(el));

  // ── Magnetic Buttons ──
  // Applies a subtle pull effect when cursor is near
  const magBtns = document.querySelectorAll('.mag-btn');

  magBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect   = btn.getBoundingClientRect();
      const centerX = rect.left + rect.width  / 2;
      const centerY = rect.top  + rect.height / 2;
      const dx      = e.clientX - centerX;
      const dy      = e.clientY - centerY;
      const strength = 0.35;

      btn.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)';
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });

  // ── Service items expand on click ──
  const serviceItems = document.querySelectorAll('.service-item');

  serviceItems.forEach((item) => {
    item.addEventListener('click', () => {
      const desc = item.querySelector('.service-desc');
      if (!desc) return;
      const isOpen = item.dataset.open === 'true';
      if (isOpen) {
        desc.style.maxHeight = '0';
        desc.style.opacity   = '0';
        item.dataset.open    = 'false';
      } else {
        desc.style.maxHeight = desc.scrollHeight + 'px';
        desc.style.opacity   = '1';
        item.dataset.open    = 'true';
      }
    });

    // Set up initial collapsed state
    const desc = item.querySelector('.service-desc');
    if (desc) {
      desc.style.maxHeight  = '0';
      desc.style.opacity    = '0';
      desc.style.overflow   = 'hidden';
      desc.style.transition = 'max-height 0.5s ease, opacity 0.4s ease';
    }
  });

  // ── Page progress bar (thin top line) ──
  const progressBar = document.createElement('div');
  progressBar.id = 'progress-bar';
  Object.assign(progressBar.style, {
    position: 'fixed',
    top: '0', left: '0',
    height: '2px',
    background: 'var(--accent)',
    zIndex: '99999',
    width: '0%',
    transition: 'width 0.1s linear',
    pointerEvents: 'none'
  });
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });
})();
