(function () {
  var v = document.body.dataset.variant;
  var items = [['a', 'A'], ['b', 'B'], ['c1', 'C1'], ['d', 'D']];
  var nav = document.createElement('nav');
  nav.className = 'switcher';
  var home = location.protocol === 'file:' || /localhost|127\.0\.0\.1/.test(location.host) ? 'index.html' : './';
  nav.innerHTML = '<span class="tag">Дизайн-концепт · LVSKSTUDIO</span><a class="all" href="' + home + '">Усі варіанти</a>' +
    items.map(function (it) { return '<a href="' + it[0] + '.html" class="' + (it[0] === v ? 'on' : '') + '">' + it[1] + '</a>'; }).join('');
  document.body.appendChild(nav);

  var next = document.createElement('section');
  next.className = 'next';
  next.innerHTML = '<div class="eyebrow">Далі на сайті</div><h2>Найближчі подорожі</h2>' +
    '<p>Решту сторінки (тури, календар 2027, про мене, відгуки, заявка) робимо після того, як клієнт обере варіант першого екрану.</p>' +
    '<div class="cards"><div class="card">Тур · дати · місця</div><div class="card">Тур · дати · місця</div><div class="card">Тур · дати · місця</div></div>';
  document.body.appendChild(next);
})();

// Plays a paused GSAP intro timeline on its own after `delay` seconds.
// The page is never locked: the first scroll / touch / key / click jumps the intro
// almost instantly to the hero, so scrolling always works right away.
window.autoIntro = function (tl, delay) {
  var done = false;
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  var timer = setTimeout(function () { tl.play(); }, delay * 1000);
  function finish() { if (done) return; done = true; off(); }
  function skip() { clearTimeout(timer); tl.timeScale(8).play(); off(); }
  var evs = ['wheel', 'touchstart', 'keydown', 'mousedown'];
  function off() { evs.forEach(function (e) { removeEventListener(e, skip); }); }
  evs.forEach(function (e) { addEventListener(e, skip, { passive: true }); });
  var prev = tl.eventCallback('onComplete');
  tl.eventCallback('onComplete', function () { finish(); if (prev) prev(); });
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { clearTimeout(timer); tl.progress(1); finish(); }
};
