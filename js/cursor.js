/**
 * cursor.js — Custom magnetic cursor
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  const cursor     = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursor-ring');

  if (!cursor || !cursorRing) return;

  // Only run on non-touch devices
  if ('ontouchstart' in window) {
    cursor.style.display     = 'none';
    cursorRing.style.display = 'none';
    document.body.style.cursor = 'auto';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Dot follows cursor instantly
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';

    // Ring follows with lerp (lag effect)
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';

    requestAnimationFrame(animateCursor);
  }

  animateCursor();
})();
