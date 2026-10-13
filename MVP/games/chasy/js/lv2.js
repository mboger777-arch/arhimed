'use strict';
// ---------- Уровень 2: Сад часов — половина. Ответ: крутить минутную стрелку блоками ◀ ▶ и ударить «Готово» ----------
// Шаг стрелки — четверть часа (15 минут); часовая едет сама и плавно (угол по формуле clock.js).
function turnQuestion(S, clock, target, o) {
  const [th, tm] = target;
  const diff = () => { let d = ((th % 12) * 60 + tm) - (((clock.T % 720) + 720) % 720); d = ((d % 720) + 1080) % 720 - 360; return d; };   // ближайший путь по циферблату
  const cols = o.cols;
  S.ask({
    text: o.board, answer: 'Готово', choices: ['◀', '▶', 'Готово'], cols: [cols[0], cols[1], cols[2]], wTs: [1, 1, 2], row: 7, speaker: S.M, say: o.say, eqDone: o.done, eqOk: true,
    hints: o.hints,
    custom(b) {
      if (b.value === '◀') { clock.addMin(-15); Sound.count(3); return false; }
      if (b.value === '▶') { clock.addMin(15); Sound.count(5); return false; }
      return diff() === 0 ? true : 'wrong';
    },
    next() { const d = diff(); return d === 0 ? 'Готово' : d > 0 ? '▶' : '◀'; },
    demo: function* () { while (diff() !== 0) { clock.addMin(Math.sign(diff()) * 15); Sound.count(4); yield 0.45; } clock.minHL = 3; clock.hourHL = 3; say(S.M, o.demo, 5); yield vwait(0.3); },
    onCorrect: o.onCorrect,
  });
}
const LV2 = {
  idx: 1, rngId: 2,
  TASKS: [
    { start: [7, 0], target: [7, 30], board: 'половина восьмого', done: '7:30 — половина восьмого', q: 'l2Q1', hb: 'l2Hb1', ok: 'l2Ok1' },
    { start: [2, 0], target: [2, 30], board: 'половина третьего', done: '2:30 — половина третьего', q: 'l2Q2', hb: 'l2Hb2', ok: 'l2Ok2' },
    { start: [5, 0], target: [4, 30], board: 'половина пятого', done: '4:30 — половина пятого', q: 'l2Q3', hb: 'l2Hb3', ok: 'l2Ok3' },
  ],
  build(S) {
    const L = new Level(150, 12, 'day'); S.L = L; L.song = 'day'; L.tint = ['rgba(160,255,170,0.08)', 'rgba(160,255,170,0.08)'];
    L.ground(0, 36, 10); L.ground(40, 78, 10); L.ground(82, 120, 10); L.ground(124, 150, 10);
    L.plank(36, 38, 8); L.plank(38, 40, 7); L.plank(78, 80, 8); L.plank(80, 82, 7); L.plank(120, 122, 8); L.plank(122, 124, 7);
    L.plank(9, 12, 8); L.plank(50, 53, 8); L.plank(91, 94, 8);
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.T = L.add(new Cub(tx(160), tx(10))); S.T.vis = false;
    L.plank(56, 59, 4); S.bouncers.push(L.add(new Bouncer(tc(55) - 10, tx(10), 'hay'))); S.gold = L.add(new GoldLantern(tx(57) + 32, tx(4)));
    S.stations = [18, 60, 100].map((X0, i) => {
      const t = LV2.TASKS[i];
      const clock = L.add(new ClockPost(tc(X0 + 15), tx(10), 100, t.start[0], t.start[1], { post: 110 }));
      return { i, X0, t, clock, started: false, done: false };
    });
    S.flag = L.add(new Flag(tc(146), tx(10), true)); S.flag.locked = true;
    L.plank(138, 141, 8);
    checkpoint(L, 19, 10, false); checkpoint(L, 41, 10); checkpoint(L, 61, 10, false); checkpoint(L, 83, 10); checkpoint(L, 101, 10, false); checkpoint(L, 125, 10);
    ffArc(S, tx(35) + 30, 590, tx(41) + 30, 590, 160, 4); ffArc(S, tx(77) + 30, 590, tx(83) + 30, 590, 160, 4); ffArc(S, tx(119) + 30, 590, tx(125) + 30, 590, 160, 4);
    [[1, 90], [8, 80], [30, 90], [44, 80], [72, 90], [86, 80], [114, 90], [128, 80], [148, 90]].forEach(([c, w]) => deco(L, 't_bush', tc(c), tx(10), w, 8));
    return L;
  },
  start(S) {
    startHud(S, 1);
    run((function* () {
      G.freeze = true; yield 0.5;
      say(S.M, VL.l2Intro(), 6); yield vwait(0.3);
      say(S.M, VL.l2Rule(), 5); yield vwait(0.3);
      say(S.p, VL.l2Go(), 3); yield vwait(0.2);
      G.freeze = false;
    })());
  },
  goal(S) { return goalOf(S, st => tx(st.X0 + 5), tx(130)); },
  update(S) {
    stationTrigger(S, LV2.station);
    if (!S.endStarted && S.stations[2].done && S.p.x >= tx(129) - 32) { S.endStarted = true; run(cubDrop(S, { lock: { x: tx(138), y: tx(10) - viewH() * 0.62 }, fromX: tx(149), runX: tx(143), line: VL.l2T1(), gx: tx(139) + 32, gy: tx(8), awayX: tx(149), jump: VL.l2Jump() })); }
    gearUpdate(S, VL.l2Got());
  },
  lock(S, st) { return fitLock(tx(st.X0) + 10, tx(st.X0 + 17) + 20, tx(10) - 370); },
  station(S, st) {
    return (function* () {
      const t = st.t, X0 = st.X0; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      S.p.autoX = tx(X0 + 4); S.p.autoFace = 1;
      S.cam.lock = LV2.lock(S, st); yield 0.6;
      G.freeze = false;
      turnQuestion(S, st.clock, t.target, {
        cols: [X0 + 5, X0 + 7, X0 + 10], board: t.board, say: VL[t.q](), done: t.done, hints: [VL.l2Ha(), VL[t.hb]()], demo: VL.l2Demo(),
        onCorrect: function* () { st.clock.minHL = 3; st.clock.hourHL = 3; say(S.M, VL[t.ok](), 6); yield vwait(0.3); S.cam.lock = null; st.done = true; },
      });
    })();
  },
  counted(S) { const st = S.cur; if (!st || st.done) return null; return clockCounted(S, [st.clock]); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, [st.clock]); },
};
