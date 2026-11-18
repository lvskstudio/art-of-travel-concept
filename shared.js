(function () {
  var v = document.body.dataset.variant;
  var items = [['a', 'A'], ['b', 'B'], ['c1', 'C1'], ['c2', 'C2'], ['d', 'D']];
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
