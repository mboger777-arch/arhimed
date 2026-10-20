/* ============ КНОПКА «← В УРОК» ДЛЯ ИГР АРХИМЕДА ============
   Игры (MVP/games/<папка>/) — сборки отдельных репозиториев; их код не трогаем,
   только подключаем этот файл последним скриптом в index.html игры.

   Владелец 14.10.2026: «конечно нужно сделать во всех играх возможность выйти». Поэтому кнопка
   видна ВСЕГДА — в любой сцене любой игры, и ставится в свободное от кнопок игры место
   (координаты взяты из кода игр, кнопка масштабируется вместе с игрой):
   • платформеры (G.scene — объект, логический холст G.W×720, экран = G.ox + x·G.scale):
     заставка и финал — слева сверху (18 + G.sl, 18); карта — слева от кнопки звука
     (звук: G.W − 84 − G.sr); уровень — слева от домика 🏠 (домик: G.W − 164 − G.sr);
     мини-игра — слева от её домика (G.W − 160 − G.sr);
   • «Половина яблока» (G.scene — строка, холст 1280×720, экран = (OX + x·SC)/DPR):
     везде слева сверху; в уровнях — под названием уровня (внизу слева портрет в субтитрах);
   • игры с глобальными scene/SCN (октябрь 2026) — всегда слева сверху;
   • телефон вертикально (игра просит повернуть) — слева сверху.
   Урок, из которого пришли, берётся из адреса: ?lesson=<id>; без него кнопка ведёт в каталог. */
(function(){
  const id = (/[?&]lesson=(\d{1,4})/.exec(location.search) || [])[1];
  const куда = '../../index.html' + (id ? '#lesson-' + id : '');
  const b = document.createElement('a');
  b.href = куда;
  b.textContent = id ? '← В урок' : '← В АРХИМЕД';
  b.setAttribute('aria-label', id ? 'Вернуться в урок' : 'Вернуться в приложение');
  b.style.cssText = [
    'position:fixed', 'z-index:5', 'display:none', 'box-sizing:border-box', 'white-space:nowrap',
    'border-radius:999px', 'text-decoration:none', 'line-height:1',
    'font-family:Pangolin, system-ui, sans-serif', 'font-weight:700', 'color:#4a2a0c',
    'background:linear-gradient(180deg,#ffe58a,#f4b73c)', 'border:3px solid #8a4f14',
    'box-shadow:0 3px 0 #8a4f14, 0 6px 14px rgba(0,0,0,.25)', 'touch-action:manipulation',
    '-webkit-user-select:none', 'user-select:none'
  ].join(';');
  /* касание кнопки не должно доходить до холста игры */
  ['pointerdown', 'touchstart'].forEach(t => b.addEventListener(t, e => e.stopPropagation(), { passive: true }));
  document.body.appendChild(b);

  const вертикально = () => innerHeight > innerWidth;
  const УГОЛ = { слева: 12, сверху: 12, h: 44 };          /* в экранных точках, от края окна */

  /* где стоять: {слева|справа, сверху|снизу, h} в CSS-пикселях окна; null — спрятать */
  function место(){
    if (вертикально()) return УГОЛ;
    /* игры октября 2026 («Кубический мир», «Гонка за сотыми», «Ярмарка подсказок», «Пещера простых
       кристаллов», «Остров хитрых игр»): своя сцена — глобальные scene (строка) и SCN; левый верхний
       угол у них свободен во всех сценах — кнопка там всегда */
    if (typeof SCN !== 'undefined' && typeof scene === 'string') return УГОЛ;
    if (typeof G === 'undefined' || !G || !G.scene) return null;
    /* «Половина яблока» */
    if (typeof G.scene === 'string'){
      const s = G.scene;
      if (s === 'title' || s === 'map') return УГОЛ;
      let dpr = 1, sc = 1, ox = 0, oy = 0;
      try { dpr = DPR; sc = SC / DPR; ox = OX / DPR; oy = OY / DPR; } catch (e) { return УГОЛ; }
      if (ox >= 130) return УГОЛ;                       /* широкий экран: в тёмной полосе слева */
      /* в уровнях слева сверху — название уровня («1. Катапульта»), кнопка встаёт под ним;
         внизу слева не ставим: там портрет говорящего в полосе субтитров */
      const h = Math.max(34, 54 * sc), уровень = /^l\d$/.test(s);
      return { слева: ox + 20 * sc, сверху: oy + (уровень ? 66 : 18) * sc, h };
    }
    /* платформеры */
    const n = G.scene.constructor && G.scene.constructor.name;
    const sc = G.scale || 1, ox = G.ox || 0, oy = G.oy || 0, W = G.W || 1280, sl = G.sl || 0, sr = G.sr || 0;
    const h = Math.max(36, 66 * sc), верх = oy + 18 * sc;
    if (n === 'TitleScene' || n === 'FinaleScene') return { слева: ox + (18 + sl) * sc, сверху: верх, h };
    const правый = n === 'MapScene' ? W - 84 - sr - 14 : n === 'MiniScene' ? W - 160 - sr - 14 : W - 164 - sr - 14;
    return { справа: innerWidth - (ox + правый * sc), сверху: верх, h };
  }
  function поставить(){
    const м = место();
    if (!м){ b.style.display = 'none'; return; }
    b.style.display = 'block';
    b.style.height = м.h + 'px';
    b.style.fontSize = Math.round(м.h * .42) + 'px';
    b.style.padding = `${Math.round(м.h * .27)}px ${Math.round(м.h * .36)}px 0`;
    b.style.top = м.сверху != null ? `calc(${Math.round(м.сверху)}px + ${м === УГОЛ ? 'env(safe-area-inset-top)' : '0px'})` : 'auto';
    if (м.справа != null){ b.style.right = Math.round(м.справа) + 'px'; b.style.left = 'auto'; }
    else { b.style.left = м === УГОЛ ? 'calc(12px + env(safe-area-inset-left))' : Math.round(м.слева) + 'px'; b.style.right = 'auto'; }
  }
  setInterval(поставить, 250); поставить();

  /* Вход ученика (MVP/js/kid.js: arh_kid_unlocked) держится 3 минуты паузы, а пока приложение
     на экране — продлевается. Игра — часть приложения: пока она видна, продлеваем так же,
     иначе после долгой игры «← В урок» встречал бы окном PIN. Продлеваем только уже открытый
     вход и только на той же вкладке (sessionStorage) — новый вход здесь не создаётся. */
  const ВХОД = 'arh_kid_unlocked', ДЕРЖИТСЯ = 180000;
  setInterval(() => {
    try {
      if (document.hidden) return;
      const s = JSON.parse(sessionStorage.getItem(ВХОД) || 'null');
      const прошло = s ? Date.now() - (s.ts || 0) : Infinity;
      if (прошло > 20000 && прошло < ДЕРЖИТСЯ) { s.ts = Date.now(); sessionStorage.setItem(ВХОД, JSON.stringify(s)); }
    } catch (e) { }
  }, 10000);
})();
