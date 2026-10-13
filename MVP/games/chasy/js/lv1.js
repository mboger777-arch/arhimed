'use strict';
// ---------- Уровень 1: Мастерская Минутуса — ровно часы. Ответ: встать у двери и прыгнуть ----------
const LV1 = {
  idx: 0, rngId: 1,
  TASKS: [
    { doors: [['5:00', [5, 0]], ['7:00', [7, 0]], ['12:35', [12, 35]]], answer: '7:00', board: 'Где 7 часов?', done: '7:00 — семь часов', q: 'l1Q1', hints: ['l1H1a', 'l1H1b'], demo: 'l1D1', ok: 'l1Ok1' },
    { clock: [3, 0], doors: [['3 часа'], ['12 часов'], ['9 часов']], answer: '3 часа', board: 'Сколько времени?', done: '3:00 — три часа', q: 'l1Q2', hints: ['l1H2a', 'l1H2b'], demo: 'l1D2', ok: 'l1Ok2' },
    { clock: [11, 0], doors: [['12 часов'], ['1 час'], ['11 часов']], answer: '11 часов', board: 'Сколько времени?', done: '11:00 — одиннадцать часов', q: 'l1Q2', hints: ['l1H2a', 'l1H2b'], demo: 'l1D3', ok: 'l1Ok3' },
  ],
  build(S) {
    const L = new Level(150, 12, 'day'); S.L = L; L.song = 'day'; L.bgImg = 'bg_shop'; L.tint = ['rgba(255,200,140,0.10)', 'rgba(255,200,140,0.10)'];
    L.ground(0, 40, 10); L.ground(43, 82, 10); L.ground(85, 124, 10); L.ground(127, 150, 10);
    L.plank(39, 44, 8); L.plank(81, 86, 8); L.plank(123, 128, 8);
    L.plank(10, 13, 8); L.plank(52, 55, 8); L.plank(94, 97, 8);
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.T = L.add(new Cub(tx(160), tx(10))); S.T.vis = false;
    // секрет: мешок-батут на высокую полку, там золотой фонарик
    L.plank(15, 18, 5); S.bouncers.push(L.add(new Bouncer(tc(14) - 10, tx(10), 'sack'))); S.gold = L.add(new GoldLantern(tx(16) + 32, tx(5)));
    S.stations = [22, 62, 102].map((X0, i) => {
      const t = LV1.TASKS[i];
      const clock = t.clock ? L.add(new ClockPost(tc(X0 + 15), tx(10), 92, t.clock[0], t.clock[1], { post: 120 })) : null;
      return { i, X0, t, clock, started: false, done: false };
    });
    S.flag = L.add(new Flag(tc(146), tx(10), true)); S.flag.locked = true;
    L.plank(138, 141, 8);
    checkpoint(L, 23, 10, false); checkpoint(L, 45, 10); checkpoint(L, 63, 10, false); checkpoint(L, 87, 10); checkpoint(L, 103, 10, false); checkpoint(L, 129, 10);
    ffArc(S, tx(38) + 30, 590, tx(45) + 30, 590, 150, 4); ffArc(S, tx(80) + 30, 590, tx(87) + 30, 590, 150, 4); ffArc(S, tx(122) + 30, 590, tx(129) + 30, 590, 150, 4);
    ffAt(S, [[tc(14) - 10, 468], [tc(14), 378], [tc(14) + 30, 288]]);
    [[1, 80], [9.5, 70], [47, 80], [90, 80], [132, 70], [148, 80]].forEach(([c, w]) => deco(L, 't_crate', tc(c), tx(10), w * 0.8, 4));
    return L;
  },
  start(S) {
    startHud(S, 0);
    run((function* () {
      G.freeze = true; yield 0.5;
      say(S.M, VL.l1Intro(), 6); yield vwait(0.3);
      say(S.M, VL.l1Rule(), 7); yield vwait(0.3);
      say(S.p, VL.l1Go(), 3); yield vwait(0.2);
      G.freeze = false;
    })());
  },
  goal(S) { return goalOf(S, st => tx(st.X0 + 5), tx(131)); },
  update(S) {
    stationTrigger(S, LV1.station);
    if (!S.endStarted && S.stations[2].done && S.p.x >= tx(130) - 32) { S.endStarted = true; run(cubDrop(S, { lock: { x: tx(139), y: tx(10) - viewH() * 0.62 }, fromX: tx(149), runX: tx(143), line: VL.l1T1(), gx: tx(139) + 32, gy: tx(8), awayX: tx(149), jump: VL.l1Jump() })); }
    gearUpdate(S, VL.l1Got());
  },
  lock(S, st) { return fitLock(tx(st.X0) + 10, tx(st.X0 + (st.clock ? 17 : 14)), tx(10) - 455); },
  station(S, st) {
    return (function* () {
      const t = st.t, M = S.M, X0 = st.X0; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      S.p.autoX = tx(X0 + 4); S.p.autoFace = 1;
      S.cam.lock = LV1.lock(S, st); yield 0.6;
      const objs = t.doors.map(([v, clk], k) => S.L.add(new ChoiceObj('door', X0 + 6 + k * 3, 10, v, null, clk ? { clock: clk } : { label: v })));
      st.objs = objs; yield vwait(0.6);
      G.freeze = false;
      S.ask({
        text: t.board, answer: t.answer, choices: t.doors.map(d => d[0]), objs, speaker: M, say: VL[t.q](), eqDone: t.done, eqOk: true,
        hints: t.hints.map(k => VL[k]()),
        demo: function* () { const ok = objs.find(o => o.value === t.answer); ok.hl = 2.5; if (st.clock) { st.clock.hourHL = 2.5; st.clock.minHL = 2.5; } say(M, VL[t.demo](), 5); yield vwait(0.4); },
        onCorrect: function* () {
          say(M, VL[t.ok](), 5); yield vwait(0.3);
          if (st.i === 0) { objs[2].hl = 2; say(M, VL.l1Trap(), 6); yield vwait(0.3); }
          for (const o of objs) if (o.state !== 'used') { puff(o.x, o.y - 100, 10); o.dead = true; }
          S.cam.lock = null; st.done = true;
        },
      });
    })();
  },
  counted(S) { const st = S.cur; if (!st || st.done) return null; return clockCounted(S, st.clock ? [st.clock] : []); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, st.clock ? [st.clock] : []); },
};
