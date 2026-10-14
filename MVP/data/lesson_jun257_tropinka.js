/* Урок 257: отдельный документ с точной числовой моделью. Оформление изолировано.
   Прогресс — DB.lessons[257].trailJourney, награды — штатные tasks/stars/done.
   Прежние три зачтённые награды и дата завершения сохраняются; повторение их не удваивает.
   Данные заданий — lessons/257/content.js, подключить до этого адаптера и после lessons.js. */
(function () {
  'use strict';
  const ID = 257;
  const {frames, stations} = window.TRAIL257_CONTENT;
  const questions = stations.flatMap(s => s.tasks).map(t => [t.q, t.answer]);
  const lesson = window.ARH_LESSONS.find(l => l.id === ID);
  Object.assign(lesson, {
    title: 'Тропинка чисел: луч, сложение и вычитание',
    src: 'Начальная школа · 1 класс · Числовой луч: сложение и вычитание', subj: 'jun',
    explain: [...frames.map(f => f.title), 'Три лесных тренажёра'],
    tasks: questions.map(([q, ans]) => ({q, ans, kind:'unit', tol:0,
      hints:['Вправо — прибавляем, влево — вычитаем.', 'Считай переходы, начальный камень не считается за шаг.'], sol:String(ans)}))
  });
  delete lesson.comic; delete lesson.scene; delete lesson.mode;

  function record() {
    DB.lessons = DB.lessons || {};
    return DB.lessons[ID] || (DB.lessons[ID] = {done:false, stars:0, tasks:[]});
  }
  const clone = value => value == null ? null : JSON.parse(JSON.stringify(value));
  function active() { return LV.id === ID && !!document.getElementById('lesson257-frame'); }
  function finish() {
    const r = record();
    if (!questions.every((_, i) => r.tasks.includes(i))) return;
    if (!r.done) {
      r.done = true; r.doneTs = Date.now();
      bumpDay('lessons', 1);
      logEvent('lesson', {id:ID, title:lesson.title, stars:r.stars, src:lesson.src, steps:r.steps || 0});
    }
  }
  window.TRAIL257 = {
    load() { return active() ? clone(record().trailJourney) : null; },
    save(state) {
      if (!active()) return;
      const r = record(), previous = r.trailJourney;
      r.trailJourney = clone(state);
      r.steps = Math.max(r.steps || 0, state.unlocked || 0);
      LV.step = state.step; LV.phase = state.step === frames.length ? 'tasks' : 'explain';
      if (previous && state.unlocked > previous.unlocked) {
        bumpDay('lessonSteps', 1);
        logEvent('step', {id:ID, step:state.step, of:frames.length+1, title:lesson.title});
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
    if (!document.getElementById('lesson257-frame')) {
      document.getElementById('screen').innerHTML =
        '<iframe id="lesson257-frame" title="Урок 257 — Тропинка к дому" src="lessons/257/index.html?v=929" style="position:fixed;inset:0;width:100%;height:100%;height:100dvh;border:0;z-index:9000;background:#0b1712"></iframe>';
    }
    hud();
  };
})();
