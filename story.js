// "One object" story slider (refs: Maison Cacao / Rosso).
// One video holds the whole transformation; each chapter is a time in it.
// Next = play forward to the next chapter and hold; Prev / dots = jump.
// Chapters also advance on their own; nothing depends on scrolling.
window.initStory = function (cfg) {
  var root = document.querySelector('.story');
  var vid = root.querySelector('video');
  var title = root.querySelector('.ch-title'), sub = root.querySelector('.ch-sub'), num = root.querySelector('.ch-num');
  var cta = root.querySelector('.ch-cta');
  var dots = [].slice.call(root.querySelectorAll('.dots button'));
  var cur = 0, target = null, autoTimer = null, userTouched = false;

  function setText(i) {
    var c = cfg.chapters[i];
    root.classList.add('swap');
    setTimeout(function () {
      title.innerHTML = c.title; sub.textContent = c.sub;
      num.textContent = String(i + 1).padStart(2, '0') + ' / ' + String(cfg.chapters.length).padStart(2, '0');
      root.dataset.tone = c.tone || cfg.tone;
      cta.classList.toggle('show', i === cfg.chapters.length - 1);
      root.classList.remove('swap');
    }, 380);
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
  }
  function hold(i) { vid.pause(); vid.currentTime = cfg.chapters[i].t; }
  function go(i, animate) {
    if (i < 0 || i >= cfg.chapters.length || i === cur && target === null) return;
    clearTimeout(autoTimer);
    var forward = i === cur + 1 && animate;
    cur = i;
    dots.forEach(function (d, k) { d.classList.toggle('on', k === i); });
    if (forward) { root.classList.add('swap'); target = cfg.chapters[i].t; vid.play().catch(function () { hold(i); }); watch(); }
    else { target = null; hold(i); setText(i); schedule(); }
  }
  function watch() {
    if (target === null) return;
    if (vid.currentTime >= target - 0.04 || vid.ended) { vid.pause(); vid.currentTime = target; target = null; setText(cur); schedule(); return; }
    requestAnimationFrame(watch);
  }
  function schedule() {
    clearTimeout(autoTimer);
    if (userTouched || cur >= cfg.chapters.length - 1) return;
    autoTimer = setTimeout(function () { go(cur + 1, true); }, cfg.hold * 1000);
  }
  root.querySelector('.go-next').addEventListener('click', function () { userTouched = true; go(cur + 1, true); });
  root.querySelector('.go-prev').addEventListener('click', function () { userTouched = true; go(cur - 1, false); });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { userTouched = true; go(k, k === cur + 1); }); });
  addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { userTouched = true; go(cur + 1, true); }
    if (e.key === 'ArrowLeft') { userTouched = true; go(cur - 1, false); }
  });

  vid.muted = true; vid.playsInline = true;
  function start() { hold(0); setText(0); schedule(); }
  if (vid.readyState >= 1) start(); else vid.addEventListener('loadedmetadata', start, { once: true });
};
