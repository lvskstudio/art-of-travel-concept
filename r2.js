// Auto-playing intro helper: never locks scroll; any wheel/touch/key/click fast-forwards.
window.R2 = {
  run(tl, {startDelay = 300, waitFor = []} = {}) {
    const fast = () => { if (tl.progress() < 1) tl.timeScale(7); };
    ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(e => window.addEventListener(e, fast, {passive: true, once: true}));
    const ready = Promise.race([
      Promise.all(waitFor.map(v => new Promise(r => {
        if (v.readyState >= 3) return r();
        v.addEventListener('canplay', r, {once: true});
      }))),
      new Promise(r => setTimeout(r, 2500))
    ]);
    ready.then(() => setTimeout(() => tl.play(), startDelay));
    const rp = document.querySelector('.replay');
    if (rp) { tl.eventCallback('onComplete', () => rp.classList.add('on')); rp.addEventListener('click', () => location.reload()); }
  }
};
