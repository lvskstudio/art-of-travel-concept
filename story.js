// Intro film: the video plays once on its own with no text on top,
// then the hero (menu, title, buttons) fades in over its last frame.
// A click, scroll or key press skips straight to the hero.
window.initStory = function () {
  var root = document.querySelector('.story');
  var vid = root.querySelector('video');
  var shown = false;
  function showHero() {
    if (shown) return; shown = true;
    root.classList.add('hero-on');
    off();
  }
  function skip() {
    if (shown) return;
    if (vid.duration) { vid.pause(); vid.currentTime = Math.max(0, vid.duration - 0.05); }
    showHero();
  }
  var evs = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  function off() { evs.forEach(function (e) { removeEventListener(e, skip); }); }
  evs.forEach(function (e) { addEventListener(e, skip, { passive: true }); });

  vid.muted = true; vid.playsInline = true;
  vid.addEventListener('ended', showHero);
  // show the hero a moment before the very end so the last second plays under it
  vid.addEventListener('timeupdate', function () { if (vid.duration && vid.currentTime > vid.duration - 1.2) showHero(); });
  var p = vid.play();
  if (p && p.catch) p.catch(function () { showHero(); });
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) skip();
};
