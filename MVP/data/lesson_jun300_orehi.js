/* Урок 300 «Ореховый экспресс». Только этот урок использует собственный документ:
   iframe изолирует его CSS, шрифт и сенсорные обработчики от общей оболочки.
   Прогресс принадлежит DB.lessons[300], сохраняется штатным save()/kidPush().
   Старые done, doneTs, tasks и stars не обнуляются; первые две награды остаются
   зачтёнными. Повторение заново сбрасывает только сцену, но не журнал наград.
   Подключать после js/lessons.js. Остальные уроки передаются прежнему renderer. */
(function () {
  'use strict';
  const ID = 300;
  const questions = [
    ['8 + ? = 10', 2], ['6 + ? = 10', 4], ['9 + ? = 10', 1],
    ['7 + 5: сколько взять из пяти до десятка?', 3],
    ['8 + 6: сколько взять из шести до десятка?', 2],
    ['9 + 7: сколько взять из семи до десятка?', 1],
    ['6 + 5', 11], ['7 + 8', 15], ['9 + 6', 15]
  ];
  const lesson = window.ARH_LESSONS.find(l => l.id === ID);
  Object.assign(lesson, {
    title: 'Сложение с переходом через десяток · Ореховый экспресс',
    src: 'Начальная школа · 1 класс · Сложение в пределах 20', subj: 'jun',
    explain: ['Ореховый экспресс: 8 + 5', 'Собери десяток', 'Прибавь остаток',
      'Собери посылку 7 + 6', 'Реши 9 + 4', 'Раздели 7 на удобные части', 'Три лесных тренажёра'],
    tasks: questions.map(([q, ans]) => ({q, ans, kind:'unit', tol:0,
      hints:['Сначала дополни первое число до десяти.', 'Затем прибавь оставшуюся часть.'], sol:String(ans)}))
  });
  delete lesson.comic; delete lesson.scene; delete lesson.mode;

  function record() {
    DB.lessons = DB.lessons || {};
    return DB.lessons[ID] || (DB.lessons[ID] = {done:false, stars:0, tasks:[]});
  }
  const clone = value => value == null ? null : JSON.parse(JSON.stringify(value));
  function active() { return LV.id === ID && !!document.getElementById('lesson300-frame'); }
  function finish() {
    const r = record();
    if (!questions.every((_, i) => r.tasks.includes(i))) return;
    if (!r.done) {
      r.done = true; r.doneTs = Date.now();
      bumpDay('lessons', 1);
      logEvent('lesson', {id:ID, title:lesson.title, stars:r.stars, src:lesson.src, steps:r.steps || 0});
    }
  }
  window.OREH300 = {
    load() { return active() ? clone(record().nutExpress) : null; },
    save(state) {
      if (!active()) return;
      const r = record(), previous = r.nutExpress;
      r.nutExpress = clone(state);
      r.steps = Math.max(r.steps || 0, state.unlocked || 0);
      LV.step = state.step; LV.phase = state.step === 6 ? 'tasks' : 'explain';
      if (previous && state.unlocked > previous.unlocked) {
        bumpDay('lessonSteps', 1);
        logEvent('step', {id:ID, step:state.step, of:7, title:lesson.title});
      }
      if (state.completed) finish();
      save();
    },
    award(index, answer, hinted) {
      if (!active() || !questions[index] || questions[index][1] !== answer) return;
      const r = record();
      if (r.tasks.includes(index)) return;
      r.tasks.push(index); r.stars = (r.stars || 0) + 1; r.lastTs = Date.now();
      // Та же награда, что lvWin: 18, после первой подсказки — 13.
      DB.points += hinted ? 13 : 18;
      bumpDay('lessonSteps', 1);
      logEvent('lesson-task', {id:ID, title:lesson.title, stars:r.stars});
      finish(); save(); hud();
    },
    exit(continuePath) {
      if (!active()) return;
      if (continuePath && typeof jpВПути === 'function' && jpВПути()) {
        const next = jpСледующийШаг();
        if (next) { jpОткрыть(next.вид, next.id); return; }
      }
      const path = typeof jpВПути === 'function' && jpВПути();
      if (path) jpВышли();
      go(path ? 'path' : 'book');
    }
  };

  /* Шапка — от приложения (владелец 25.10.2026: «шапка не от приложения»). Документ урока встаёт под шапкой
     приложения, его собственная шапка «АРХИМЕД · ← Выйти» прячется, а кнопка выхода переезжает в строку
     с названием урока и подписывается, как в остальных уроках: «← Путь» или «← Книга знаний».
     Сам урок (сцены, кнопки, озвучка, награды) не меняется. */
  const ШАПКА_CSS = '.app-header{display:none!important}.lesson-heading .exit-button{flex-shrink:0;min-width:0;white-space:nowrap}' +
    '.lesson-heading>div:first-of-type{flex:1;min-width:0}';
  function верхРамки() {
    const h = document.querySelector('.wrap > header');
    return h ? Math.max(0, Math.round(h.getBoundingClientRect().bottom)) : 0;
  }
  function поставить(f) {
    const top = верхРамки();
    f.style.top = top + 'px'; f.style.height = 'calc(100dvh - ' + top + 'px)';
  }
  function подготовить(f) {
    try {
      const d = f.contentDocument; if (!d || !d.head || d.getElementById('шапка-приложения')) return;
      const st = d.createElement('style'); st.id = 'шапка-приложения'; st.textContent = ШАПКА_CSS; d.head.appendChild(st);
      const выход = d.getElementById('exit'), строка = d.querySelector('.lesson-heading');
      if (выход && строка) {
        выход.textContent = (typeof jpВПути === 'function' && jpВПути()) ? '← Путь' : '← Книга знаний';
        строка.insertBefore(выход, строка.firstChild);
      }
    } catch (e) {}
  }
  try { window.addEventListener('resize', () => { const f = document.getElementById('lesson300-frame'); if (f) поставить(f); }); } catch (e) {}

  const previous = window.renderLessonView;
  window.renderLessonView = function () {
    if (LV.id !== ID) return previous.apply(this, arguments);
    if (!document.getElementById('lesson300-frame')) {
      window.scrollTo(0, 0);
      document.getElementById('screen').innerHTML =
        '<iframe id="lesson300-frame" title="Урок 300 — Ореховый экспресс" src="lessons/300/index.html?v=964" style="position:fixed;left:0;right:0;top:0;width:100%;height:100dvh;border:0;z-index:9000;background:#0b1712"></iframe>';
      const f = document.getElementById('lesson300-frame');
      поставить(f);
      f.addEventListener('load', () => подготовить(f));
    }
    hud();
  };
})();
