// Intro film: the generated object animation plays once with no text,
// then it cross-fades into the client's real drone video (full length, looping),
// and the hero (menu, title, buttons) appears over the live footage.
// A click, scroll or key press skips straight to the hero.
window.initStory = function (cfg) {
  var root = document.querySelector('.story');
  var intro = root.querySelector('video.intro');
  var real = root.querySelector('video.real');
  var shown = false;
  [intro, real].forEach(function (v) { v.muted = true; v.playsInline = true; });
  real.load();

  function showHero() {
    if (shown) return; shown = true;
    real.currentTime = 0;
    var p = real.play(); if (p && p.catch) p.catch(function () {});
    root.classList.add('hero-on');
    off();
  }
  function skip() { if (!shown) { intro.pause(); showHero(); } }
  var evs = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  function off() { evs.forEach(function (e) { removeEventListener(e, skip); }); }
  evs.forEach(function (e) { addEventListener(e, skip, { passive: true }); });

  intro.addEventListener('timeupdate', function () { if (intro.currentTime >= cfg.cut) showHero(); });
  intro.addEventListener('ended', showHero);
  var p = intro.play();
  if (p && p.catch) p.catch(function () { showHero(); });
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) skip();
};
