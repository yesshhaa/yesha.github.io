/**
 * lab-canvas.js — Animated network topology diagram for Home Lab section
 * Yesha Patel Portfolio
 * Uses Canvas 2D API — no external dependencies
 */

(function () {
  'use strict';

  const canvas = document.getElementById('lab-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // ── Node definitions ──
  const NODES = [
    { label: 'Kali',    x: 0.15, y: 0.20, color: '#ffb7b2' },
    { label: 'Splunk',  x: 0.50, y: 0.12, color: '#ffb7b2' },
    { label: 'pfSense', x: 0.82, y: 0.28, color: '#ffb7b2' },
    { label: 'Win AD',  x: 0.65, y: 0.72, color: '#c7ceea' },
    { label: 'Targets', x: 0.25, y: 0.78, color: '#c7ceea' },
    { label: 'Analyst', x: 0.50, y: 0.50, color: '#ffb7b2' },
  ];

  const EDGES = [
    [0, 5], [1, 5], [2, 5],
    [3, 5], [4, 5], [0, 4],
    [2, 3], [1, 3]
  ];

  // ── Resize canvas to match CSS size ──
  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  let t = 0;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    t += 0.008;

    // Draw edges + traveling packets
    EDGES.forEach(([a, b]) => {
      const na = NODES[a];
      const nb = NODES[b];

      // Static edge line
      ctx.beginPath();
      ctx.moveTo(na.x * W, na.y * H);
      ctx.lineTo(nb.x * W, nb.y * H);
      ctx.strokeStyle = 'rgba(199, 206, 234, 0.2)';
      ctx.lineWidth   = 0.5;
      ctx.stroke();

      // Animated packet traveling along edge
      const progress = ((t * 0.25 + a * 0.6) % 1);
      const px = na.x * W + (nb.x * W - na.x * W) * progress;
      const py = na.y * H + (nb.y * H - na.y * H) * progress;

      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 183, 178, 0.7)';
      ctx.fill();
    });

    // Draw nodes
    NODES.forEach((node, i) => {
      const x     = node.x * W;
      const y     = node.y * H;
      const pulse = Math.sin(t * 2 + i) * 0.3 + 0.7;

      // Outer glow ring
      ctx.beginPath();
      ctx.arc(x, y, 9, 0, Math.PI * 2);
      ctx.strokeStyle = node.color;
      ctx.globalAlpha = pulse * 0.25;
      ctx.lineWidth   = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Node dot
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle   = node.color;
      ctx.globalAlpha = pulse;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Label
      ctx.font      = '9px DM Mono, monospace';
      ctx.fillStyle = 'rgba(74, 68, 77, 0.6)';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, x, y + 20);
    });

    requestAnimationFrame(draw);
  }

  draw();
})();
