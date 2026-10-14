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
  if (!lesson) return;   /* урок не догрузился (обрыв сети) — не роняем остальное приложение */
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

  const previous = window.renderLessonView;
  window.renderLessonView = function () {
    if (LV.id !== ID) return previous.apply(this, arguments);
    if (!document.getElementById('lesson300-frame')) {
      /* Урок встроен в обычный экран: шапка приложения, «← Книга знаний», название урока и нижнее
         меню на месте; документ урока — в карточке, его шапка и 100svh сняты (js/lesson_embed.js). */
      ВСТРОЕННЫЙ_УРОК.экран({ рамка: 'lesson300-frame', адрес: 'lessons/300/index.html?v=931', название: 'Урок 300 — Ореховый экспресс',
        подпись: lesson.src, css: '.app-header{display:none!important}.book-label{display:none!important}.wrap{padding-top:10px!important}footer{display:none!important}' });
    }
    hud();
  };
})();
