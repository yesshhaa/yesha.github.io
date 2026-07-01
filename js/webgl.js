/**
 * webgl.js — Three.js hero background (particles + icosahedra + rings)
 * Yesha Patel Portfolio
 * Requires: three.js r128 (loaded via CDN in index.html)
 */

(function () {
  'use strict';

  // Wait for THREE to be available
  // Wait for THREE to be available
  document.addEventListener('DOMContentLoaded', initWebGL);

  function initWebGL() {
    if (typeof THREE === 'undefined') return;

    const canvas = document.getElementById('webgl-canvas');
    if (!canvas) return;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    // ── Scene & Camera ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // 3D Objects removed per user request to focus on background image theme.

    // ── Mouse tracking ──
    let mX = 0, mY = 0;
    document.addEventListener('mousemove', (e) => {
      mX =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    // ── Animation Loop ──
    function animate() {
      requestAnimationFrame(animate);

      // Camera parallax effect
      camera.position.x += (mX * 0.4 - camera.position.x) * 0.05;
      camera.position.y += (mY * 0.3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    // ── Resize ──
    window.addEventListener('resize', () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }
})();
