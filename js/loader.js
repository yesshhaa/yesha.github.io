/**
 * loader.js — Loading screen with counter
 * Yesha Patel Portfolio
 */

(function () {
  'use strict';

  const loader    = document.getElementById('loader');
  const loaderNum = document.getElementById('loader-num');

  if (!loader || !loaderNum) return;

  let count = 0;

  const interval = setInterval(() => {
    count = Math.min(count + Math.floor(Math.random() * 12) + 3, 100);
    loaderNum.textContent = String(count).padStart(3, '0');

    if (count >= 100) {
      finishLoading();
    }
  }, 30);

  function finishLoading() {
    clearInterval(interval);
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'visible'; // Ensure scroll is enabled
    }, 400);
  }

  // Fallback: Force hide loader after 3 seconds in case of issues
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      finishLoading();
    }
  }, 3000);
})();
