/* АРХИМЕД MVP · assistant.js — всплывающий аватар-помощник «Архимед» (правый нижний угол) */
'use strict';
(function(){
  let open=false, caption='', talking=false, lastAt=0;

  /* ---------- портрет помощника ---------- */
  function avatarHTML(){
    return `<img src="img/archimedes.jpg" width="96" height="96" alt="Архимед" decoding="async">`;
  }

  /* ---------- DOM ---------- */
  function el(html){ const d=document.createElement('div'); d.innerHTML=html.trim(); return d.firstChild; }

  /* Номер сборки берём из реально подключённых скриптов (?v=NNN),
     а не из зашитой строки — иначе счётчик «застывает» и врёт. */
  function buildTag(){
    try{
      let v=null;
      document.querySelectorAll('script[src]').forEach(function(sc){
        const m=/[?&]v=(\d+)/.exec(sc.getAttribute('src')||'');
        if(m){ const n=+m[1]; if(v===null||n>v) v=n; }
      });
      if(v!==null) return 'сборка v'+v;
    }catch(e){}
    try{ const m=/v=(\d+)/.exec(String(window.ARH_BUILD||'')); if(m) return 'сборка v'+m[1]; }catch(e){}
    return 'сборка';
  }
  function syncBuildTag(){ try{ const n=document.getElementById('asstVer'); if(n) n.textContent=buildTag(); }catch(e){} }

  function build(){
    const wrap=el(`<div class="asst" id="asst">
      <div class="abubble" id="asstBub"></div>
      <div class="avatar" id="asstAvatar" title="Архимед — голосовой помощник">${avatarHTML()}</div>
    </div>`);
    document.body.appendChild(wrap);
    // панель
    const panel=el(`<div class="apanel" id="asstPanel">
      <div class="ap-head">
        <img class="ap-ava" src="img/archimedes.jpg" width="44" height="44" alt="" decoding="async">
        <div class="ap-head-txt"><b>◈ Архимед</b><span class="ap-sub">очень умный — говори со мной</span></div>
        <button class="ap-x" onclick="ASSIST.close()">✕</button></div>
      <div class="ap-cap" id="apCap">Я Архимед, очень умный. Ты можешь со мной говорить: я отвечаю голосом и помню твоё имя.</div>
      <button class="btn ok2" id="alBtn" style="width:100%;margin:8px 0;font-size:15px" onclick="AGENTLIVE.toggle()">🗣 Я Архимед — говори со мной</button>
      <div class="ap-hint" id="asstWhere" style="color:var(--glass)">Сейчас на экране: —</div>
      <div class="ap-chips" id="asstChips"></div>
      <div class="ap-hint">💡 Кнопки меню подстраиваются под экран; голосовые — работают, когда разговор включён.</div>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
        <span class="ap-hint" id="asstVer" style="margin:0">сборка</span>
        <button class="asmall" style="width:auto;padding:0 10px" onclick="ASSIST.hardReload()" title="Сбросить кэш и обновить">🔄 Обновить</button>
      </div>
    </div>`)
    document.body.appendChild(panel);
    wrap.querySelector('#asstAvatar').addEventListener('click', toggle);
    return wrap;
  }

  /* ---------- состояние ---------- */
  let wrapEl=null, bubEl=null, panEl=null;
  /* Лист-задание урока (бумажный лист RUPAPER/RU615PAPER .pp, русский тренажёр .s6,
     «Мишутка» .ms, разбор .rl-wrap, скобки .sk6): пока он открыт, помощник не
     показывается — раньше пузырь висел поверх листа и съедал первый тап. */
  function sheetOpen(){
    try{ return !!document.querySelector('#lvis .pp, #lvis .s6, #lvis .ms, #lvis .rl-wrap, #lvis .sk6'); }
    catch(e){ return false; }
  }
  /* Урок открыт (любая фаза: объяснение, проверка, задачи). Пузырь здесь ничего
     не добавляет — текст шага и так стоит в рамке Архимеда, — а на телефоне он
     ложился на нижнюю часть рисунка и закрывал кнопки. Поэтому в уроке молчим.
     Признак берём из разметки урока (пустая #lvis в объяснении и кнопка
     «← Книга знаний» в остальных фазах), а не из LV: после выхода из урока
     LV остаётся заполненным, и по нему стартовый экран считался бы уроком. */
  function lessonOpen(){
    try{
      if(document.getElementById('lvis')) return true;
      const btns=document.querySelectorAll('#screen button');
      for(let i=0;i<btns.length;i++) if(btns[i].textContent.indexOf('Книга знаний')>=0) return true;
      return false;
    }catch(e){ return false; }
  }
  function hushBub(){ if(bubEl) bubEl.classList.remove('show'); }
  function ensure(){ if(!wrapEl){ wrapEl=build(); bubEl=document.getElementById('asstBub'); panEl=document.getElementById('asstPanel'); }
    syncBuildTag();
    watchMenu(); tipLoop(); }
  function sayBub(t,holdMs){ caption=t||''; if(!bubEl) return;
    /* Пока открыт урок или лист-задание, пузырь не показываем: он ложился поверх
       листа/рисунка и перехватывал первый тап (CSS гасит помощника на листах,
       это — страховка, чтобы класс .show не остался «зажжённым»). */
    if(t && (sheetOpen()||lessonOpen())){ hushBub(); return; }
    if(t){ bubEl.innerHTML=esc(t); bubEl.classList.add('show'); lastAt=Date.now(); }
    else if(holdMs){ setTimeout(()=>{ if(Date.now()-lastAt>holdMs-200) bubEl.classList.remove('show'); }, holdMs); }
    else bubEl.classList.remove('show');
  }
  function toggle(){ open=!open; panEl.classList.toggle('open',open);
    if(open) syncBuildTag();
    if(open){ ctxMenu(); watchMenu(); }
  }
  function setTalking(v){ talking=v;
    wrapEl.classList.toggle('talking',v);
    wrapEl.classList.toggle('idle',!v);
    if(!v) sayBub(null, 2600);
  }

  /* ---------- контекст ---------- */
  function ctx(){
    if(document.querySelector('.arh-legend') && typeof ARH_LEGEND!=='undefined' && typeof LG!=='undefined'){
      const chapter=ARH_LEGEND[LG.ch];
      return {kind:'legend', text:()=>[chapter.t,...chapter.p,chapter.q||''].join(' ')};
    }
    const inLesson=!!document.querySelector('.sdot');
    const inTask=!!document.querySelector('.q') && !inLesson;
    if(inTask && typeof CUR!=='undefined'&&CUR&&CUR.task) return {kind:'task', text:()=>VOICE.taskText(CUR.task)};
    if(inLesson && typeof LV!=='undefined'&&LV&&LV.id) return {kind:'lesson', text:()=>VOICE.lessonStepText()};
    return null; }
  function act(what){
    const c=ctx();
    if(c&&c.kind==='legend'){
      if(what==='next'){ lgStep(1); return; }
      if(what==='hint'||what==='sol'){ VOICE.say('Рассмотри рисунки и прочитай историю. В конце шага есть вопрос для размышления — можно обсудить его или просто читать дальше.'); return; }
    }
    if(what==='read'){ if(c){ VOICE.say(c.text()); } else VOICE.say(VOICE.greeting()); }
    else if(what==='hint'){
      if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'){ lvHint(0); const L=lessonById(LV.id); if(L&&L.tasks[LV.task]) VOICE.say(VOICE.hintText(L.tasks[LV.task],0)); }
      else if(c&&c.kind==='task'){ useHint(0); VOICE.say(VOICE.hintText(CUR.task,0)); }
      else VOICE.say('Сейчас нет активной задачи. Открой любую задачу — и я подскажу.');
    }
    else if(what==='next'){
      if(typeof LV!=='undefined'&&LV&&LV.id&&LV.phase==='explain'){ lvStep(1); setTimeout(()=>VOICE.say(VOICE.lessonStepText()),120); }
      else if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks'&&LV.task<lessonById(LV.id).tasks.length-1){ lvNextTask(); }
      else if(c&&c.kind==='task'&&window.afterRow){ afterRow(CUR.task); }
      else VOICE.say('Дальше некуда — задачи пока нет. Выбери задачу на острове.');
    }
    else if(what==='sol'){
      if(c&&c.kind==='task'){ if(!(DB.tasks[CUR.task.id]&&DB.tasks[CUR.task.id].done)) VOICE.say('Сначала реши задачу — потом я объясню решение вслух.'); else VOICE.say(VOICE.solText(CUR.task)); }
      else VOICE.say('Решение показывается после верного ответа на задачу.');
    }
    else VOICE.say(VOICE.greeting());
  }
  function mic(){ VOICE.toggleMic(); }
  const SK_NAMES={alena:'Алёна',filipp:'Филипп',jane:'Джейн',omazh:'Омаж'};
  function test(){
    const muted=DB.profile&&DB.profile.voice&&DB.profile.voice.on===false;
    if(muted){ toast('🔇 Звук выключен — включите кнопкой 🔈'); return; }
    VOICE.testKey();
    sayBub('Проверяю голос ☁ SpeechKit…', 6000);
    setTimeout(syncSound, 3000);   // подпись обновится по итогу проверки
  }
  function skVoice(v){ VOICE.setSkVoice(v); syncSound(); toast('☁ Голос SpeechKit: '+SK_NAMES[v]); VOICE.testKey(); }
  function syncAlBtn(v){ const b=document.getElementById('alBtn');
    if(b) b.textContent = v? '⏹ Замолчать Архимеда' : '🗣 Я Архимед — говори со мной'; }
  function hardReload(){
    const jobs=[];
    if('caches' in window){ jobs.push(caches.keys().then(ks=>Promise.all(ks.map(k=>caches.delete(k))))); }
    if('serviceWorker' in navigator){ jobs.push(navigator.serviceWorker.getRegistrations().then(rs=>Promise.all(rs.map(r=>r.unregister())))); }
    Promise.all(jobs).then(()=>{ location.href=location.href.split('?')[0]+'?fresh='+Date.now(); });
  }

  /* ---------- контекстное меню ---------- */
  function actTab(){ const a=document.querySelector('#navBar button.active'); return a?a.dataset.tab:''; }
  function chip(t,f){ const b=document.createElement('button'); b.className='achip'; b.textContent=t;
    b.onclick=()=>{ try{ f(); }catch(e){} }; return b; }
  function vchip(t,text){ return chip(t,()=>{
      const ok=(typeof AGENTLIVE!=='undefined')&&AGENTLIVE.tell&&AGENTLIVE.tell(text);
      if(!ok) toast('Сначала включи разговор — «🗣 Я Архимед, говори со мной»'); }); }
  function ctxMenu(){
    const where=document.getElementById('asstWhere'); const box=document.getElementById('asstChips');
    if(!where||!box) return;
    const legend=!!document.querySelector('.arh-legend');
    const lesson=!legend&&!!document.querySelector('.sdot');
    const task=!legend&&!!document.querySelector('.q')&&!lesson;
    const tab=actTab(); const out=[];
    let label='—';
    if(legend){ label='Легенда об Архимеде';
      out.push(chip('➡ Дальше',()=>{ try{ lgStep(1); }catch(e){} }));
      out.push(chip('⬅ Назад',()=>{ try{ lgStep(-1); }catch(e){} }));
      out.push(vchip('🗣 Расскажи легенду','Расскажи коротко легенду об Архимеде: Внутреннее море, острова Познания и почему ты учишь ребят.'));
      out.push(chip('📖 К урокам',()=>go('book')));
    } else if(lesson&&typeof LV!=='undefined'&&LV){
      try{ const L=lessonById(LV.id); label=(L?'Урок: '+(L.title):'Урок'); }catch(e){ label='Урок'; }
      if(LV.phase==='tasks'){
        out.push(chip('💡 Подсказка',()=>{ try{ if(typeof lvHint==='function')lvHint(0); }catch(e){} }));
        out.push(chip('➡ Дальше',()=>{ try{ if(typeof lvNextTask==='function'&&LV.task<(lessonById(LV.id).tasks||[]).length-1) lvNextTask(); }catch(e){} }));
      } else {
        out.push(chip('▶ Расскажи урок по шагам',()=>{
          try{
            const on=typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state();
            if(!on){ toast('Сначала включи разговор — «🗣 Я Архимед, говори со мной»'); return; }
            AGENTLIVE.narrate();
          }catch(e){}
        }));
        out.push(vchip('🔊 Читай шаг','Прочитай дословно текущий шаг урока: «'+(lessonById(LV.id).explain[LV.step]||'')+'»'));
        out.push(chip('➡ Дальше',()=>{ try{ lvStep(1); }catch(e){} }));
        out.push(chip('⬅ Назад',()=>{ try{ lvStep(-1); }catch(e){} }));
        out.push(chip('❓ Проверь меня',()=>{ try{ lvToCheck(); }catch(e){} }));
      }
      out.push(chip('📖 К урокам',()=>go('book')));
    } else if(task&&typeof CUR!=='undefined'&&CUR){
      const t=CUR.task; label='Задача: '+t.title;
      const done=!!(DB.tasks&&DB.tasks[t.id]&&DB.tasks[t.id].done);
      out.push(vchip('🔊 Читай условие','Прочитай дословно задачу «'+t.title+'»: '+t.story+' Вопрос: '+t.q));
      out.push(vchip('🗣 Помоги идеей','Дай наводящую идею по задаче «'+t.title+'», не выдавая ответ'));
      out.push(chip('💡 Подсказка',()=>{ try{ if(typeof useHint==='function')useHint(0); }catch(e){} }));
      if(done) out.push(vchip('📜 Объясни решение','Объясни решение задачи «'+t.title+'»: '+t.sol));
      else out.push(vchip('🔍 Проверь меня','Задай ученику наводящий вопрос по задаче «'+t.title+'», чтобы он понял идею'));
    } else if(tab==='book'){ label='Книга знаний';
      out.push(chip('📖 К урокам',()=>go('book')));
      out.push(vchip('🗣 Как готовиться к ВсОШ?','Расскажи ученику, как готовиться к ВсОШ по математике в 6–7 классах, коротко.'));
    } else if(tab==='tour'){ label='Олимпиадный тур';
      out.push(chip('🏁 Начать тур',()=>{ try{ startTour(); }catch(e){} }));
      out.push(vchip('🗣 Правила тура','Объясни правила олимпиадного тура: 8 задач, таймер, без подсказок.'));
    } else if(tab==='parent'){ label='Кабинет родителя';
      out.push(vchip('📊 Прогноз ребёнка','Расскажи родителю прогноз готовности к ВсОШ по данным прогресса, кратко.'));
      out.push(vchip('💡 Что подтянуть','Посоветуй, какие темы стоит подтянуть ребёнку (по его прогрессу).'));
    } else if(tab==='library'){ label='Банк задач';
      out.push(vchip('🗣 Посоветуй задачу','Посоветуй ученику хорошую задачу для разминки.'));
    } else { label='Путь / карта островов';
      /* У младших следующий шаг маршрута — это карточка наверху «Пути»
         (урок или задача), а не первая нерешённая задача банка. */
      const младш=(function(){ try{ return typeof isJunior==='function' && isJunior(); }catch(e){ return false; } })();
      const карточка=младш? document.querySelector('.jp-now') : null;
      if(карточка){
        const имяШага=(карточка.querySelector('.n-t')||{}).textContent||'следующий шаг';
        out.push(chip('🎯 Дальше: '+имяШага,()=>{ try{ карточка.click(); }catch(e){} }));
      } else {
        const nxt=window.ARH_TASKS.find(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done);
        if(nxt) out.push(chip('🎯 Продолжить: '+nxt.title,()=>go('task-'+nxt.id)));
      }
      out.push(chip('📖 Книга знаний',()=>go('book')));
      out.push(vchip('🗣 Что мне делать?','Ученик на карте островов. Посоветуй, что делать дальше, чтобы готовиться к олимпиаде.'));
    }
    where.textContent='Сейчас на экране: '+label;
    box.innerHTML=''; out.forEach(b=>box.appendChild(b));
  }

  /* ---------- всплывающие подсказки по контексту ---------- */
  const TIPS={
    path:['Нажми «🎯 Продолжить» — решим следующую задачу','Загляни в «📖 Книга знаний» — там уроки по задачам ВсОШ','Новый остров — 💻 Информатика: код, алгоритмы и логика','Открой «📜 Легенду об Архимеде» — узнай, кто я и откуда острова','Спроси меня: «Что такое инвариант?» — объясню','Можешь поговорить со мной голосом: «🗣 Я Архимед — говори со мной»'],
    task:['Застрял? Скажи «Подсказка» или нажми её в моём меню','Сначала перескажи условие своими словами','Ищи, что не меняется: чётность, инвариант, остаток','Ответ найди сам — я подведу к идее, но не решу за тебя'],
    taskDone:['Отлично! Нажми «Дальше» — идём дальше','Хочешь, объясню решение ещё раз? Нажми в меню «📜 Объясни решение»'],
    lesson:['Жми «➡ Дальше», чтобы читать шаги по порядку','Понял шаг? Жми «❓ Проверь меня»','Попроси меня голосом: «Прочитай шаг» — объясню'],
    lessonT:['Реши сам — я подскажу, если попросишь','Правильный ответ даст ⭐ и «Решение Архимеда»'],
    book:['Здесь уроки по типам задач ВсОШ: сначала объяснение, потом задачи','Открой урок — например, «Числа-перевёртыши»','Есть и информатика: «Двоичная система», «Логика: И, ИЛИ, НЕ»'],
    tour:['Тур как на олимпиаде: 8 задач на время','Не застревай — пропускай сложное и возвращайся'],
    parent:['Смотрите прогресс и слабые темы ребёнка','Можно поставить лимит времени на день'],
    library:['Выбирай задачи по темам — от простых к сложным'],
    legend:['Листай десять шагов легенды — рисунки помогут познакомиться с островами','Любой шаг можно выбрать в «Оглавлении»'] };
  /* У начальной школы на «Пути» свой маршрут (MVP/js/path_junior.js): там нет
     кнопки «Продолжить», а разговор про ВсОШ и инварианты ребёнку 1–4 класса
     ничего не объясняет. Поэтому для младших — свои подсказки. */
  const TIPS_JUN={
    path:['Верхняя карточка — твой следующий шаг. Нажми её','Участок открывается нажатием: посмотри, что дальше','Сначала урок — потом задачка по нему','Не получилось? Нажми меня, дам подсказку'],
    task:['Прочитай условие вслух — так понятнее','Не бойся ошибиться: я покажу, как правильно','Считать на пальцах можно, это честно'],
    taskDone:['Получилось! Идём дальше','Хочешь, объясню ещё раз? Нажми «📜 Объясни решение»'],
    lesson:['Жми «➡ Дальше» — кадр за кадром','Понял? Проверь себя кнопкой «❓ Проверь меня»'],
    book:['Здесь все уроки твоего класса','Открой урок — Архимед всё покажет по шагам'],
    legend:['Рассматривай рисунки и читай историю — здесь десять шагов','Вопросы в конце шага можно обсудить или просто читать дальше'] };
  function наборПодсказок(){
    try{ if(typeof isJunior==='function' && isJunior()) return TIPS_JUN; }catch(e){}
    return TIPS;
  }
  function tipKind(){
    if(document.querySelector('.arh-legend')) return 'legend';
    const lesson=!!document.querySelector('.sdot');
    const task=!!document.querySelector('.q')&&!lesson;
    const tab=actTab();
    if(lesson){ try{ if(typeof LV!=='undefined'&&LV&&LV.phase==='tasks') return 'lessonT'; }catch(e){} return 'lesson'; }
    if(task&&typeof CUR!=='undefined'&&CUR){ const t=CUR.task; return (DB.tasks&&DB.tasks[t.id]&&DB.tasks[t.id].done)?'taskDone':'task'; }
    if(document.querySelector('.legend-hero')) return 'legend';
    if(tab) return tab;
    return 'path';
  }
  /* Подсказка-«облачко» показывается РОВНО ОДИН РАЗ — при запуске приложения,
     и не более одного раза в день. Больше сама не всплывает. */
  let tipHideTimer=null, tipDone=false;
  const TIP_KEY='arhimed_assist_tip_day';
  /* Подсказка показывается ОДИН РАЗ НА УСТРОЙСТВО, только на стартовом экране,
     и висит ровно 3 секунды. При обновлении страницы больше не выскакивает. */
  function tipDaySeen(){
    try{ if(localStorage.getItem(TIP_KEY)) return true; }catch(e){}
    try{ return !!(DB&&DB.profile&&(DB.profile.tipDone||DB.profile.tipDay)); }catch(e){}
    return false;
  }
  function tipDayMark(){
    try{ localStorage.setItem(TIP_KEY,'1'); }catch(e){}
    try{ if(DB&&DB.profile){ DB.profile.tipDone=1; if(typeof save==='function') save(); } }catch(e){}
  }
  function onStartScreen(){
    try{
      if(typeof LV!=='undefined' && LV && LV.id) return false;               // внутри урока — не показываем
      if(typeof UI!=='undefined' && UI && UI.tab && UI.tab!=='path') return false;
      return true;
    }catch(e){ return false; }
  }
  function tipLoop(){
    if(tipDone) return; tipDone=true;                     // один раз за запуск приложения
    if(tipDaySeen()) return;                              // и только один раз за всё время
    if(!onStartScreen()) return;                          // и только на стартовом экране
    setTimeout(()=>{ try{
      if(!(DB&&DB.profile)) return;                       // не показываем до создания профиля
      /* За 2,5 с ожидания могли открыть урок: проверяем экран ещё раз — иначе
         подсказка «Жми ➡ Дальше» всплывала поверх листа урока. */
      if(!onStartScreen()) return;
      if(sheetOpen()) return;
      if(typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state()) return; // не мешать разговору
      if(bubEl&&bubEl.classList.contains('show')) return;  // не перебивать уже показанное
      const набор=наборПодсказок();
      const pool=набор[tipKind()]||набор.path||TIPS.path; if(!pool.length) return;
      tipDayMark();
      bubEl.innerHTML=esc(pool[0]); bubEl.classList.add('show');
      clearTimeout(tipHideTimer);
      tipHideTimer=setTimeout(()=>{ bubEl.classList.remove('show'); },3000);   // сообщение показывается ровно 3 секунды
    }catch(e){} },2500);
  }
  let menuTimer=null;
  function watchMenu(){
    if(menuTimer) return;
    menuTimer=setInterval(()=>{ if(panEl&&panEl.classList.contains('open')) ctxMenu(); },900);
    try{
      const obs=new MutationObserver(()=>{
        if(panEl&&panEl.classList.contains('open')) setTimeout(ctxMenu,350);
        /* Сменился экран и открылся урок — гасим уже показанный пузырь, чтобы он
           не «прилип» поверх рисунка или листа. */
        if(lessonOpen()) hushBub();
      });
      const sc=document.getElementById('screen'); if(sc) obs.observe(sc,{childList:true,subtree:false});
    }catch(e){}
  }
  function sound(){ VOICE.toggle(); syncSound(); }
  function syncSound(){ VOICE.refreshVoices(); const el=document.getElementById('asstSound'); if(!el) return;
    const on=!(DB.profile&&DB.profile.voice&&DB.profile.voice.on===false);
    el.textContent=on?'🔈':'🔇'; el.classList.toggle('off',!on);
    const v=document.getElementById('asstVoice');
    const st=VOICE.skState(); const vn=SK_NAMES[st.voice]||'Алёна';
    if(v) v.textContent = !on ? '☁ SpeechKit «'+vn+'» · звук выключен'
      : st.status==='nok' ? '☁ SpeechKit «'+vn+'» не настроен — запасной системный голос'
      : 'голос: ☁ SpeechKit «'+vn+'»'+(st.status==='ok'?'':' (проверка…)');
    const sv=document.getElementById('skVoice');
    if(sv) sv.value=(DB.profile&&DB.profile.voice&&DB.profile.voice.skVoice)||'alena'; }

  /* ---------- события VOICE ---------- */
  VOICE.on('onSpeak', v=>setTalking(v));
  VOICE.on('onText', t=>{ if(t) sayBub(t); });
  VOICE.on('onListen', v=>{ sayBub(v?'🎙 Слушаю… скажи команду':'', v?0:1800); });

  /* глобальный доступ */
  window.ASSIST={ toggle, close:()=>{open=false; if(panEl)panEl.classList.remove('open');}, act, mic, sound, test, skVoice, syncSound, syncAlBtn, hardReload,
    state:()=>({open,talking,caption}) };

  try{ AGENTLIVE.on('state', v=>{ if(window.ASSIST) window.ASSIST.syncAlBtn(v); }); }catch(e){}
  document.addEventListener('DOMContentLoaded', ()=>{ ensure(); syncSound(); });
  // если DOM уже готов (скрипты в конце body) — собрать сразу
  if(document.readyState!=='loading'){ ensure(); syncSound(); }
})();
