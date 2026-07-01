/**
 * project-previews.js — Generative canvas previews on project card hover
 * Yesha Patel Portfolio
 * Uses Canvas 2D API — no external dependencies
 */

(function () {
  'use strict';

  const canvases = document.querySelectorAll('.project-preview-canvas');
  if (!canvases.length) return;

  canvases.forEach((canvas) => {
    const hue = parseInt(canvas.dataset.hue) || 120;
    const ctx  = canvas.getContext('2d');
    let    animId = null;
    let    t      = 0;
    let    running = false;

    const card = canvas.closest('.project-card');
    if (!card) return;

    function resize() {
      canvas.width  = canvas.offsetWidth  || 240;
      canvas.height = canvas.offsetHeight || 160;
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.02;

      // Dark background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, W, H);

      // Animated grid lines
      ctx.strokeStyle = `hsla(${hue}, 100%, 60%, 0.05)`;
      ctx.lineWidth = 0.5;
      const COLS = 8, ROWS = 6;
      for (let c = 0; c <= COLS; c++) {
        const x = (c / COLS) * W;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      for (let r = 0; r <= ROWS; r++) {
        const y = (r / ROWS) * H;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Animated sine wave
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${hue}, 100%, 65%, 0.6)`;
      ctx.lineWidth   = 1.5;
      for (let x = 0; x <= W; x++) {
        const y = H / 2 + Math.sin(x * 0.04 + t) * (H * 0.2) + Math.sin(x * 0.02 - t * 0.5) * (H * 0.1);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Traveling dots along the wave
      for (let i = 0; i < 4; i++) {
        const xPos   = ((t * 30 + i * W / 4) % W);
        const yPos   = H / 2 + Math.sin(xPos * 0.04 + t) * (H * 0.2) + Math.sin(xPos * 0.02 - t * 0.5) * (H * 0.1);
        const alpha  = 0.6 + Math.sin(t * 3 + i) * 0.4;
        ctx.beginPath();
        ctx.arc(xPos, yPos, 3, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${alpha})`;
        ctx.fill();
      }

      // Scanline overlay
      for (let y = 0; y < H; y += 3) {
        ctx.fillStyle = 'rgba(0,0,0,0.07)';
        ctx.fillRect(0, y, W, 1);
      }

      animId = requestAnimationFrame(draw);
    }

    function start() {
      if (running) return;
      running = true;
      resize();
      draw();
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(animId);
    }

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focus',      start);
    card.addEventListener('blur',       stop);
  });
})();
