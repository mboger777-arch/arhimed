/* ============ КНОПКА «← В УРОК» ДЛЯ ИГР АРХИМЕДА ============
   Игры (MVP/games/<папка>/) — сборки отдельных репозиториев; их код не трогаем,
   только подключаем этот файл последним скриптом в index.html игры.

   Кнопка видна на заставке игры (сцена TitleScene): там верхний левый угол
   свободен. Из уровня ребёнок выходит домиком 🏠 на карту, с карты — на заставку.
   Урок, из которого пришли, берётся из адреса: ?lesson=<id>; без него кнопка
   ведёт в каталог приложения. */
(function(){
  const id = (/[?&]lesson=(\d{1,4})/.exec(location.search) || [])[1];
  const куда = '../../index.html' + (id ? '#lesson-' + id : '');
  const b = document.createElement('a');
  b.href = куда;
  b.textContent = id ? '← В урок' : '← В АРХИМЕД';
  b.setAttribute('aria-label', id ? 'Вернуться в урок' : 'Вернуться в приложение');
  b.style.cssText = [
    'position:fixed', 'z-index:5', 'display:none',
    'left:calc(12px + env(safe-area-inset-left))', 'top:calc(12px + env(safe-area-inset-top))',
    'padding:9px 16px 10px', 'border-radius:22px', 'text-decoration:none',
    'font:700 18px Pangolin, system-ui, sans-serif', 'color:#4a2a0c',
    'background:linear-gradient(180deg,#ffe58a,#f4b73c)', 'border:3px solid #8a4f14',
    'box-shadow:0 3px 0 #8a4f14, 0 6px 14px rgba(0,0,0,.25)', 'touch-action:manipulation',
    '-webkit-user-select:none', 'user-select:none'
  ].join(';');
  /* касание кнопки не должно доходить до холста игры */
  ['pointerdown', 'touchstart'].forEach(t => b.addEventListener(t, e => e.stopPropagation(), { passive: true }));
  document.body.appendChild(b);

  function заставка(){
    try { return typeof G !== 'undefined' && G.scene && G.scene.constructor && G.scene.constructor.name === 'TitleScene'; }
    catch (e) { return false; }
  }
  /* в вертикальном положении игра просит повернуть телефон — кнопка нужна и там */
  function вертикально(){ return innerHeight > innerWidth; }
  setInterval(() => { b.style.display = (заставка() || вертикально()) ? 'block' : 'none'; }, 250);
})();
