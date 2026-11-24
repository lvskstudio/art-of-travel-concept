// The Art of Travel — one menu for every page: the round burger opens a navy screen in the site's style.
(() => {
  const onHome = /(^|\/)v1\.html$/.test(location.pathname) || /\/$/.test(location.pathname) && document.getElementById('hero');
  const H = onHome ? '' : 'v1.html';
  const V = 'r28a';
  const items = [
    ['Тури', H + '#tours', 'assets/tours/dolomites.jpg', 'Доломіти'],
    ['Календар 2027', H + '#tours', 'assets/tours/iceland-summer.jpg', 'Ісландія'],
    ['Про нас', H + '#about', 'assets/artem-front.jpg', 'Артем'],
    ['Відгуки', 'reviews.html', 'assets/reviews/madeira.jpg', 'Мадейра'],
    ['Контакти', H + '#contacts', 'assets/faq-mug.jpg', 'до зустрічі!'],
  ];
  const css = `
  .mnu{position:fixed;inset:0;z-index:600;background:var(--navy);color:var(--cream);display:flex;flex-direction:column;opacity:0;visibility:hidden;transition:opacity .45s ease,visibility 0s .45s}
  .mnu.on{opacity:1;visibility:visible;transition:opacity .45s ease}
  .mnu-bg{position:absolute;left:0;right:0;bottom:0;width:100%;opacity:.16;filter:grayscale(1) contrast(1.1);mix-blend-mode:screen;pointer-events:none;transform:translateY(4%);transition:transform 1.2s cubic-bezier(.2,.8,.2,1)}
  .mnu.on .mnu-bg{transform:none}
  .mnu-top,.mnu-foot{position:relative;z-index:1}
  .mnu-top{display:flex;align-items:center;justify-content:space-between;padding:20px 28px 0}
  .mnu-top img{height:54px}
  .mnu-x{width:42px;height:42px;border-radius:50%;background:var(--bone);position:relative;cursor:pointer;border:0}
  .mnu-x::before,.mnu-x::after{content:"";position:absolute;left:13px;top:20px;width:16px;height:1.5px;background:var(--navy);transform:rotate(45deg)}
  .mnu-x::after{transform:rotate(-45deg)}
  .mnu-body{flex:1;position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,820px);align-items:center;max-width:1440px;width:100%;margin:0 auto;padding:0 80px}
  .mnu-list{list-style:none;margin:0;padding:0}
  .mnu-list li{overflow:hidden;border-bottom:1px solid rgba(203,152,70,.3)}
  .mnu-list li:first-child{border-top:1px solid rgba(203,152,70,.3)}
  .mnu-list a{display:flex;align-items:baseline;gap:28px;padding:16px 0;color:var(--cream);text-decoration:none;transform:translateY(105%);transition:transform .7s cubic-bezier(.2,.8,.2,1),color .3s}
  .mnu.on .mnu-list a{transform:none}
  .mnu-list li:nth-child(2) a{transition-delay:.06s}.mnu-list li:nth-child(3) a{transition-delay:.12s}.mnu-list li:nth-child(4) a{transition-delay:.18s}.mnu-list li:nth-child(5) a{transition-delay:.24s}
  .mnu-list i{font:500 14px/1 var(--sans);font-style:normal;letter-spacing:.06em;color:var(--gold);width:28px}
  .mnu-list b{font:400 clamp(42px,5vw,72px)/1.05 var(--serif)}
  .mnu-list a:hover,.mnu-list a.hl{color:var(--gold)}
  .mnu-foot{display:flex;align-items:center;justify-content:space-between;gap:30px;max-width:1440px;width:100%;margin:0 auto;padding:26px 80px 34px;border-top:1px solid rgba(203,152,70,.3)}
  .mnu-foot nav{display:flex;gap:30px;font:500 13px/1 var(--sans)}
  .mnu-foot nav a,.mnu-foot .lng a{color:var(--cream);opacity:.8;text-decoration:none}.mnu-foot nav a:hover{opacity:1;color:var(--gold)}
  .mnu-foot .lng{font:500 12px/1 var(--sans);letter-spacing:.14em}
  .mnu-cta{background:var(--bone);color:var(--navy);font:600 13px/1 var(--sans);letter-spacing:.08em;text-transform:uppercase;padding:18px 28px;border-radius:40px;text-decoration:none;transition:background .3s}
  .mnu-cta:hover{background:var(--gold)}
  body.mnu-lock{overflow:hidden}
  @media (max-width:860px){
    .mnu-bg{width:280%;left:-90%;right:auto;bottom:150px;opacity:.2}
    .mnu-top{padding:18px 20px 0}.mnu-top img{height:44px}
    .mnu-body{grid-template-columns:1fr;padding:0 24px;align-content:center}
      .mnu-list a{gap:16px;padding:14px 0}.mnu-list b{font-size:40px}
    .mnu-foot{flex-direction:column;align-items:stretch;gap:20px;padding:22px 24px 28px}
    .mnu-foot nav{justify-content:space-between}
    .mnu-cta{text-align:center}
  }`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  const el = document.createElement('div'); el.className = 'mnu'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', 'Меню');
  el.innerHTML = `
    <img class="mnu-bg" src="assets/ridge-fade.png?v=${V}" alt="">
    <div class="mnu-top"><a href="${H || 'v1.html'}"><img src="assets/logo-gold.png?v=${V}" alt="The Art of Travel"></a><button class="mnu-x" aria-label="Закрити меню"></button></div>
    <div class="mnu-body">
      <ul class="mnu-list">${items.map((it, i) => `<li><a href="${it[1]}" data-i="${i}"><i>0${i + 1}</i><b>${it[0]}</b></a></li>`).join('')}</ul>
    </div>
    <div class="mnu-foot">
      <nav><a href="https://t.me/ArtemPoliakov15" target="_blank" rel="noopener">Telegram</a><a href="https://www.instagram.com/_the_art.of_travel_/" target="_blank" rel="noopener">Instagram</a><a href="mailto:biuro.theartoftravel@gmail.com">Email</a></nav>
      <div class="lng"><a href="#">UA · EN</a></div>
      <a class="mnu-cta" href="https://t.me/ArtemPoliakov15" target="_blank" rel="noopener">Написати Артему →</a>
    </div>`;
  document.body.appendChild(el);
  const links = [...el.querySelectorAll('.mnu-list a')];
  const pick = i => { links.forEach(a => a.classList.toggle('hl', a.dataset.i == i)); };
  links.forEach(a => { a.addEventListener('mouseenter', () => pick(a.dataset.i)); a.addEventListener('focus', () => pick(a.dataset.i)); a.addEventListener('click', () => close()); });
  const open = () => { el.classList.add('on'); document.body.classList.add('mnu-lock'); pick(0); links.forEach(x => x.classList.remove('hl')); el.querySelector('.mnu-x').focus({preventScroll: true}); };
  const close = () => { el.classList.remove('on'); document.body.classList.remove('mnu-lock'); };
  el.querySelector('.mnu-x').addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && el.classList.contains('on')) close(); });
  document.querySelectorAll('.burger').forEach(b => b.addEventListener('click', e => { e.preventDefault(); open(); }));
})();
