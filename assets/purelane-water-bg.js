/**
 * Purelane Background Scene & Water Parallax Engine (Phase 1 Asset)
 * Handles scroll-driven scene depth updates, parallax water drift, and IntersectionObserver reveals.
 */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reveal elements on scroll
  function initReveals() {
    var revs = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window && !reduceMotion) {
      var ro = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            ro.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });

      revs.forEach(function (el) { ro.observe(el); });
    } else {
      revs.forEach(function (el) { el.classList.add('in'); });
    }
  }

  // Scene depth switcher
  function initScenes() {
    var scenes = Array.prototype.slice.call(document.querySelectorAll('.scene'));
    var zones = Array.prototype.slice.call(document.querySelectorAll('[data-scene]'));
    var stage = document.getElementById('scenes');
    var current = 0;

    function setScene(n) {
      if (n === current) return;
      current = n;
      scenes.forEach(function (s, i) { s.classList.toggle('on', i + 1 === n); });
      if (stage) stage.setAttribute('data-d', String(n));
    }

    function pickScene() {
      var focus = window.scrollY + window.innerHeight * 0.5;
      var n = 1;
      for (var i = 0; i < zones.length; i++) {
        var z = zones[i];
        var top = 0;
        var el = z;
        while (el) { top += el.offsetTop; el = el.offsetParent; }
        if (top <= focus) n = parseInt(z.getAttribute('data-scene'), 10) || n;
      }
      setScene(n);
    }

    var raf = null;
    var mx = 0, my = 0;

    function frame() {
      raf = null;
      var y = window.scrollY || window.pageYOffset;
      if (!reduceMotion) {
        var wl = document.querySelectorAll('#water .wl');
        for (var i = 0; i < wl.length; i++) {
          var d = [0.05, 0.09, 0.03, 0.02][i] || 0.05;
          wl[i].style.setProperty('--px', (mx * d * 130).toFixed(1) + 'px');
          wl[i].style.setProperty('--py', (-y * d + my * d * 90).toFixed(1) + 'px');
        }
      }
      pickScene();
    }

    function onScroll() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    if (!reduceMotion && window.matchMedia('(min-width: 1024px)').matches) {
      window.addEventListener('mousemove', function (e) {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
        onScroll();
      }, { passive: true });
    }

    frame();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initReveals();
    initScenes();
  });
})();
