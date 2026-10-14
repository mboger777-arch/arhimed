/* ============ ИГРЫ К УРОКАМ НАЧАЛЬНОЙ ШКОЛЫ ============
   Восемь игр с озвучкой (репозитории mboger777-arch/<папка> на GitHub; 14.10.2026 добавлены
   «Цыплята парами», «Игрушки на полках», «Половина яблока» к урокам 71, 73, 74)
   лежат копиями в MVP/games/<папка>/ и открываются из своего урока.

   Как работает.
   • В уроке над карточкой шага стоит плашка «Игра к уроку»: имя, сколько уровней
     пройдено и кнопка «Играть». В комиксе (урок 314) — кнопка «🎮 Игра» в шапке.
   • Игра открывается на весь экран: games/<папка>/?lesson=<id>. На заставке игры
     есть кнопка «← В урок» (MVP/games/back_to_lesson.js), она возвращает
     в приложение ссылкой index.html#lesson-<id> — урок открывается сам.
   • Прогресс игра хранит сама в localStorage (<ключ>_plat_progress = номер
     открытого уровня, «уровней + 1» — пройдено всё; у «Половины яблока» — свой ключ pol74,
     поле open, читается функцией «прогресс»). Плашка его читает и
     записывает в журнал урока: DB.lessons[id].game = {done, of}.

   Картинка плашки — вырез заставки игры: MVP/img/games/<папка>.jpg (720×269; значки
   в самих сборках перепутаны — у «Часов» значок «Весов», у «Сада» — «Монеток»).

   Как добавить игру: положить сборку в MVP/games/<папка>/, вписать строку в ИГРЫ,
   положить вырез заставки в MVP/img/games/,
   в index.html игры подключить ../back_to_lesson.js (см. deploy/КАК_ДОБАВИТЬ_УРОК.md).
   ====================================================================== */
(function(){
  const ИГРЫ = {
    253: { папка:'desyat-fonarei',  имя:'Десять фонарей', ключ:'df', уровней:5, про:'состав числа 10' },
    255: { папка:'vesy-znaki',      имя:'Весы и знаки',   ключ:'vz', уровней:5, про:'больше, меньше, столько же' },
    60:  { папка:'chasy',           имя:'Часы',           ключ:'ch', уровней:6, про:'учимся понимать время' },
    30:  { папка:'sto-monetok',     имя:'Сто монеток',    ключ:'sl', уровней:5, про:'сложение и вычитание до 100' },
    314: { папка:'sad-umnozheniya', имя:'Сад умножения',  ключ:'um', уровней:5, про:'умножение и таблица' },
    71:  { папка:'tsyplyata-parami',   имя:'Цыплята парами',     ключ:'ts', уровней:5, про:'умножение на 2' },
    73:  { папка:'igrushki-na-polkah', имя:'Игрушки на полках',  ключ:'ig', уровней:5, про:'умножение на 3' },
    74:  { папка:'polovina-yabloka',   имя:'Половина яблока',    уровней:5, про:'половина и четверть',
           прогресс(){ try { return +(JSON.parse(localStorage.getItem('pol74') || '{}').open || 1); } catch(e){ return 1; } } }
  };
  window.ИГРЫ_УРОКОВ = ИГРЫ;

  function пройдено(g){
    let n = 1;
    try { n = g.прогресс ? g.прогресс() : Math.round(+(localStorage.getItem(g.ключ+'_plat_progress') || 1)); } catch(e){}
    return Math.max(0, Math.min(g.уровней, (n||1) - 1));
  }
  /* в журнал урока: сколько уровней игры пройдено (родитель видит вместе с уроком) */
  function вЖурнал(id, g){
    try{
      if(typeof DB==='undefined' || !DB.profile) return;
      const n = пройдено(g);
      DB.lessons = DB.lessons || {};
      const rec = DB.lessons[id] || (DB.lessons[id] = {done:false, stars:0, tasks:[]});
      if(rec.game && rec.game.done === n) return;
      rec.game = { done:n, of:g.уровней };
      if(typeof save==='function') save();
    }catch(e){}
  }
  window.играУрока = function(id){
    const g = ИГРЫ[id]; if(!g) return;
    location.href = 'games/' + g.папка + '/?lesson=' + id;
  };

  const CSS = `
    .игра-плашка{margin:2px 0 12px;border-radius:18px;overflow:hidden;cursor:pointer;color:var(--ivory,#e8e0cc);
      background:linear-gradient(180deg,#1f3a27,#152a1d);border:1.5px solid var(--brass,#d9a441);
      box-shadow:0 6px 18px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.06)}
    .игра-плашка .ип-кадр{position:relative;display:block;aspect-ratio:720/269;background:#2b4a33}
    .игра-плашка .ип-кадр img{display:block;width:100%;height:100%;object-fit:cover}
    .игра-плашка .ип-метка{font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--brass,#d9a441)}
    .игра-плашка.мини .ип-низ{padding:8px 10px}
    .игра-плашка.мини .ип-мини{width:64px;height:40px;border-radius:9px;object-fit:cover;flex-shrink:0}
    .игра-плашка.мини .ип-имя{font-size:15px}
    .игра-плашка.мини .ип-кнопка{padding:8px 12px;font-size:14px}
    .игра-плашка .ип-низ{display:flex;align-items:center;gap:12px;padding:10px 12px 12px}
    .игра-плашка .ип-текст{flex:1;min-width:0;line-height:1.25}
    .игра-плашка .ип-имя{font-size:17px;font-weight:700}
    .игра-плашка .ип-про{font-size:13px;color:var(--muted,#8fa08f)}
    .игра-плашка .ип-шкала{display:flex;gap:4px;margin-top:6px}
    .игра-плашка .ип-шкала i{flex:0 0 18px;height:6px;border-radius:3px;background:rgba(232,224,204,.18)}
    .игра-плашка .ип-шкала i.да{background:var(--brass,#d9a441)}
    .игра-плашка .ип-кнопка{flex-shrink:0;padding:11px 16px;border-radius:12px;border:0;font:inherit;font-size:16px;font-weight:700;
      background:linear-gradient(180deg,#f0c35a,#d9a441);color:#2b1d08;box-shadow:0 2px 0 #a3762a;cursor:pointer}
    .игра-чип{flex-shrink:0;border:2px solid #33291e;border-radius:16px;background:#f0c35a;color:#2b1d08;font:inherit;
      font-size:13px;font-weight:700;padding:4px 10px;cursor:pointer}
  `;
  function стиль(){
    if(document.getElementById('игра-стиль')) return;
    const st = document.createElement('style'); st.id = 'игра-стиль'; st.textContent = CSS;
    document.head.appendChild(st);
  }
  /* на первом шаге урока — афиша с заставкой игры, дальше — компактная строка */
  function плашка(id, g, мини){
    const n = пройдено(g), все = n >= g.уровней;
    const шкала = Array.from({length:g.уровней}, (_,i)=>`<i class="${i<n?'да':''}"></i>`).join('');
    const el = document.createElement('div');
    el.className = 'игра-плашка' + (мини ? ' мини' : ''); el.setAttribute('role','button');
    el.setAttribute('aria-label', 'Игра к уроку: ' + g.имя);
    el.onclick = ()=>играУрока(id);
    const картинка = `img/games/${g.папка}.jpg`;
    el.innerHTML = (мини ? '' : `<span class="ип-кадр"><img src="${картинка}" alt=""></span>`) +
      `<div class="ип-низ">${мини ? `<img class="ип-мини" src="${картинка}" alt="">` : ''}<div class="ип-текст">
        <div class="ип-метка">🎮 Игра к уроку</div>
        <div class="ип-имя">${g.имя}</div>
        ${мини ? '' : `<div class="ип-про">${все ? 'пройдена вся — можно сыграть ещё' : n ? 'пройдено уровней: '+n+' из '+g.уровней : g.про}</div>`}
        <div class="ип-шкала">${шкала}</div></div>
      <button class="ип-кнопка" type="button">${n && !все ? 'Дальше' : 'Играть'}</button></div>`;
    return el;
  }

  /* экран урока: плашка над карточкой шага (перерисовка урока её стирает — ставим снова) */
  function вУрок(){
    try{
      if(typeof LV==='undefined' || !LV || !ИГРЫ[LV.id]) return;
      const scr = document.getElementById('screen'); if(!scr) return;
      if(scr.querySelector(':scope > .игра-плашка')) return;
      const card = scr.querySelector(':scope > .card'); if(!card) return;
      стиль(); вЖурнал(LV.id, ИГРЫ[LV.id]);
      const мини = !(LV.phase==='explain' && LV.step===0);
      scr.insertBefore(плашка(LV.id, ИГРЫ[LV.id], мини), card);
    }catch(e){}
  }
  if(typeof window.renderLessonView === 'function'){
    const исходная = window.renderLessonView;
    window.renderLessonView = function(){ const r = исходная.apply(this, arguments); вУрок(); return r; };
  }

  /* комикс: кнопка в шапке (комикс перерисовывает себя целиком на каждой странице) */
  function вКомикс(ov){
    try{
      if(typeof LV==='undefined' || !LV || !ИГРЫ[LV.id] || ov.style.display==='none') return;
      const top = ov.querySelector('.comic-top'); if(!top || top.querySelector('.игра-чип')) return;
      стиль(); вЖурнал(LV.id, ИГРЫ[LV.id]);
      const b = document.createElement('button');
      b.className = 'игра-чип'; b.type = 'button'; b.textContent = '🎮 Игра';
      b.setAttribute('aria-label', 'Игра к уроку: ' + ИГРЫ[LV.id].имя);
      const id = LV.id; b.onclick = ()=>играУрока(id);
      top.insertBefore(b, top.querySelector('.ct-x'));
    }catch(e){}
  }
  const следим = new WeakSet();
  new MutationObserver(()=>{
    document.querySelectorAll('body > .comic-ov').forEach(ov=>{
      if(!следим.has(ov)){ следим.add(ov); new MutationObserver(()=>вКомикс(ov)).observe(ov, {childList:true, attributes:true, attributeFilter:['style']}); }
      вКомикс(ov);
    });
  }).observe(document.body || document.documentElement, {childList:true});
})();
