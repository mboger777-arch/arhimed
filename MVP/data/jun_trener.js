/* ============ ДЕТСКИЙ ТРЕНАЖЁР · «проверь себя» и задачи в стиле урока (1–2 класс) ============

   Зачем. После объяснения приложение показывает «Проверь себя» и задачи общим тёмным видом
   (MVP/js/lessons.js, renderLessonView: фазы check / tasks / done). Для уроков 256 и 29, где
   всё нарисовано сценами с героями, это обрыв стиля. Владелец 14.10.2026: «сделай тренажёры
   тоже в стиле этого урока».

   Как работает. Урок регистрирует себя: ДТ.подключить({ ID, корень, стиль, герой, вопросы }).
   Модуль оборачивает renderLessonView: после обычной отрисовки, если открыт такой урок и фаза
   check/tasks/done, карточки приложения заменяются блоком <div id="lvis"><div class="корень">…
   — тогда работают стили и рисунки самого урока (они заданы как «#lvis .корень …»).
   Логику не трогаем: касания идут в функции приложения lvCheck, lvToTasks, lvPick, lvNum,
   lvHint, lvNextTask, lvFinish — звёзды, «урок пройден» и отчёт родителю считаются как раньше.
   Числовой ответ ребёнок выбирает табличкой 0–10 (не клавиатурой): значение кладётся в скрытое
   поле #lvNum и вызывается lvNum().

   Разбор ошибки — свой для каждого неверного ответа (вопросы[…].разборы), иначе — пояснение урока. */
(function(){
  'use strict';
  const реестр = {};
  const мимо = {};            /* ключ «урок:фаза:задача» → неверные выборы, чтобы их было видно */
  const ключ = () => LV.id + ':' + LV.phase + ':' + (LV.phase === 'tasks' ? LV.task : 0);
  const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const СТИЛЬ = `
  #lvis .число.мал.мал{min-width:56px;min-height:58px;padding:4px;border-radius:16px}
  #lvis .число.мал.мал .окно{min-width:42px;height:44px;font-size:26px;border-radius:11px}
  #lvis .число.длин.длин{width:100%;max-width:340px;min-height:0}
  #lvis .число.длин.длин .окно{font-size:21px;height:auto;min-height:46px;padding:8px 14px;line-height:1.2;text-align:center}
  #lvis .дт-ряд{display:flex;flex-wrap:wrap;gap:9px;justify-content:center}
  #lvis .дт-лента{align-self:center;display:inline-flex;gap:10px;align-items:center;padding:6px 16px;border-radius:14px;
    border:3px solid #5b3416;color:#4a2a0c;font-size:19px;
    background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 3px,rgba(0,0,0,.05) 3px 8px),linear-gradient(180deg,#e8bf86,#c98f52);
    box-shadow:0 4px 0 #5b3416,inset 0 2px 0 rgba(255,255,255,.4)}
  #lvis .дт-лента .зв{display:inline-flex;gap:2px}
  #lvis .дт-лента .зв i{font-style:normal;color:#ffc93a;text-shadow:0 1px 0 #a3762a}
  #lvis .дт-лента .зв i.нет{color:rgba(90,42,8,.25);text-shadow:none}
  #lvis .дт-подсказки{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
  #lvis .дт-подск{appearance:none;font-family:inherit;font-size:16px;min-height:44px;padding:0 14px;border-radius:14px;cursor:pointer;
    border:2.5px solid #5b3416;color:#4a2a0c;background:linear-gradient(180deg,#fff6e4,#f3dcae);box-shadow:0 3px 0 #5b3416}
  #lvis .дт-подск:disabled{opacity:.45;cursor:default}
  #lvis .дт-совет{display:flex;gap:8px;align-items:flex-start;margin:0;font-size:18px;line-height:1.35;background:#fff6e4;
    border:2.5px dashed #d9a441;border-radius:14px;padding:9px 12px;color:#4a2a0c}
  #lvis .дт-совет b{font-weight:normal;color:#a3762a}
  #lvis .дт-итог{text-align:center;font-size:22px;color:#4a2a0c;margin:0}
  `;
  function стиль(){
    if (document.getElementById('дт-стиль')) return;
    const s = document.createElement('style'); s.id = 'дт-стиль'; s.textContent = СТИЛЬ; document.head.appendChild(s);
  }

  /* табличка-ответ в стиле урока (.число с окошком — стили урока) */
  function табличка(текст, клик, сост, мал){
    const кл = сост === 'верно' ? ' верно' : сост === 'мимо' ? ' мимо' : '';
    const закр = сост ? 'disabled' : '';
    const длин = String(текст).length > 4;      /* ответ словами («1 десяток и 6 единиц») — широкая табличка, кегль меньше */
    return `<button type="button" class="число${кл}${мал ? ' мал мал' : ''}${длин ? ' длин длин' : ''}" ${закр} onclick="${клик}"><span class="окно">${esc(текст)}</span></button>`;
  }
  function реплика(к, вопрос, кто){
    const Г = (кто && к.герои && к.герои[кто]) || к.герой;
    return `<div class="реплика">${Г.имя ? `<span class="аватар"><img src="${Г.ф}" alt=""><span>${esc(Г.имя)}</span></span>` : `<img src="${Г.ф}" alt="">`}
      <p>${esc(вопрос)}</p><button type="button" class="слушать" aria-label="Послушать" onclick="ДТ.сказать()">🔊</button></div>`;
  }
  const готово = (т) => `<p class="готово"><span aria-hidden="true">★</span>${esc(т)}</p>`;
  const разбор = (т) => `<p class="разбор">${esc(т)}</p>`;
  const кнопка = (т, клик) => `<div class="ряд-кн"><button type="button" class="дальше-кн" onclick="${клик}">${esc(т)}</button></div>`;

  function фазаПроверки(к, L){
    const c = L.check, В = (к.вопросы && к.вопросы.проверка) || {};
    const ош = мимо[ключ()] || [];
    if (LV.ch != null && LV.ch !== c.ans && !ош.includes(LV.ch)) ош.push(LV.ch);
    мимо[ключ()] = ош;
    const верно = LV.ch === c.ans;
    const плитки = c.choices.map((x, i) => табличка(x, `lvCheck(${i})`, верно && i === c.ans ? 'верно' : (ош.includes(i) ? 'мимо' : (верно ? 'закрыто' : '')))).join('');
    const последний = ош[ош.length - 1];
    return `<div class="дт-лента">Проверь себя</div>` + реплика(к, c.q, В.кто) + (В.картинка ? В.картинка() : '') +
      `<div class="числа">${плитки}</div>` +
      (верно ? готово(В.итог || c.exp) + кнопка('К задачам →', 'lvToTasks()')
             : (последний != null ? разбор((В.разборы && В.разборы[c.choices[последний]]) || c.exp) : ''));
  }

  function фазаЗадачи(к, L){
    const T = L.tasks[LV.task], В = (к.вопросы && к.вопросы.задачи && к.вопросы.задачи[LV.task]) || {};
    const rec = (typeof lrec === 'function') ? lrec() : { tasks: [], stars: 0 };
    const решена = rec.tasks.indexOf(LV.task) >= 0;
    const ош = мимо[ключ()] || []; мимо[ключ()] = ош;
    if (T.kind !== 'unit' && LV.sel != null && LV.sel >= 0 && !ош.includes(LV.sel)) ош.push(LV.sel);
    const зв = L.tasks.map((_, i) => `<i class="${rec.tasks.indexOf(i) >= 0 ? '' : 'нет'}">★</i>`).join('');
    let ответы = '';
    if (T.kind === 'unit'){
      const от = В.от || 0, до = В.до || 10;     /* ряд табличек: по умолчанию 0–10, у урока 301 — 10–20 */
      ответы = `<input type="hidden" id="lvNum"><div class="дт-ряд">${Array.from({length: до - от + 1}, (_, k) => от + k).map(n =>
        табличка(n, `ДТ.число(${n})`, решена && n === T.ans ? 'верно' : (ош.includes(n) ? 'мимо' : (решена ? 'закрыто' : '')), true)).join('')}</div>`;
    } else {
      ответы = `<div class="числа">${T.choices.map((x, i) =>
        табличка(x, `lvPick(${i})`, решена && i === T.ans ? 'верно' : (ош.includes(i) ? 'мимо' : (решена ? 'закрыто' : '')))).join('')}</div>`;
    }
    const последний = ош[ош.length - 1];
    const текстРазбора = последний == null ? '' :
      (T.kind === 'unit' ? (В.разборы && В.разборы[последний]) : (В.разборы && В.разборы[T.choices[последний]])) || T.trap || 'Посмотри на картинку и посчитай ещё раз — по одному.';
    const цены = ['бесплатно', '5 ⭐', '10 ⭐'];
    const подсказки = решена ? '' : `<div class="дт-подсказки">${T.hints.map((_, i) =>
        `<button type="button" class="дт-подск" ${LV.hints > i ? 'disabled' : ''} onclick="lvHint(${i})">💡 Подсказка ${i + 1} · ${цены[i] || ''}</button>`).join('')}</div>` +
      T.hints.filter((_, i) => LV.hints > i).map(h => `<p class="дт-совет"><span>💡</span><span><b>Подсказка:</b> ${esc(h)}</span></p>`).join('');
    const последняя = LV.task >= L.tasks.length - 1;
    return `<div class="дт-лента">Задача ${LV.task + 1} из ${L.tasks.length} <span class="зв">${зв}</span></div>` +
      реплика(к, T.q, В.кто) + (В.картинка ? В.картинка() : '') + ответы +
      (решена ? готово(В.итог || ('Верно! ' + (T.sol || ''))) + кнопка(последняя ? 'Забрать награду ⭐' : 'Следующая задача →', последняя ? 'lvFinish()' : 'lvNextTask()')
              : (текстРазбора ? разбор(текстРазбора) : '') + подсказки);
  }

  function фазаФинала(к){
    return (к.финал ? к.финал() : '') + готово('Урок пройден! +2 ⭐ к прогрессу');
  }

  function нарисовать(){
    if (typeof LV === 'undefined' || !LV) return;
    const к = реестр[LV.id]; if (!к) return;
    if (!['check', 'tasks', 'done'].includes(LV.phase)) return;
    const scr = document.getElementById('screen'); if (!scr) return;
    const ряд = scr.querySelector(':scope > .btnrow'); if (!ряд) return;
    const L = (typeof lessonById === 'function') ? lessonById(LV.id) : null; if (!L) return;
    стиль(); if (к.стиль) к.стиль();
    scr.querySelectorAll(':scope > .card').forEach(c => c.remove());
    const тело = LV.phase === 'check' ? фазаПроверки(к, L) : LV.phase === 'tasks' ? фазаЗадачи(к, L) : фазаФинала(к);
    const box = document.createElement('div'); box.id = 'lvis';
    box.innerHTML = `<div class="${к.корень}">${тело}</div>`;
    scr.insertBefore(box, ряд);
  }

  function обернуть(){
    if (typeof window.renderLessonView !== 'function' || window.renderLessonView.__дт) return;
    const исх = window.renderLessonView;
    const нов = function(){ const r = исх.apply(this, arguments); try { нарисовать(); } catch(e){ try { console.error('ДТ:', e); } catch(_){} } return r; };
    нов.__дт = true; window.renderLessonView = нов;
  }

  window.ДТ = {
    подключить(к){ реестр[к.ID] = к; обернуть(); },
    число(n){
      const п = document.getElementById('lvNum'); if (!п) return;
      const L = lessonById(LV.id), T = L.tasks[LV.task];
      if (n !== T.ans){ const ош = мимо[ключ()] || (мимо[ключ()] = []); if (!ош.includes(n)) ош.push(n); }
      п.value = String(n); lvNum();
    },
    сказать(){
      try {
        const L = lessonById(LV.id);
        const т = LV.phase === 'check' ? L.check.q : LV.phase === 'tasks' ? L.tasks[LV.task].q : 'Урок пройден! Молодец!';
        if (window.VOICE && VOICE.say) VOICE.say(т);
      } catch(e){}
    }
  };
  /* renderLessonView объявлен в MVP/js/lessons.js, который грузится позже уроков, — оборачиваем на load */
  window.addEventListener('load', обернуть);
})();
