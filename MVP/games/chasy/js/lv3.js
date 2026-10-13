'use strict';
// ---------- Уровень 3: Пекарня Бублика — пятёрки и четверти. Механика: прыгай на подносе — каждый прыжок = 5 минут ----------
const LV3 = {
  idx: 2, rngId: 3,
  TASKS: [
    { clock: [3, 20], hops: 4, choices: ['4', '20', '40'], answer: '20', wT: 1, board: 'Сколько минут?', done: '3:20 — 20 минут', q: 'l3Q1', hb: 'l3H2a', demo: 'l3D1', ok: 'l3Ok1' },
    { clock: [2, 15], hops: 3, choices: ['четверть второго', 'четверть третьего', 'без четверти три'], answer: 'четверть третьего', wT: 3, board: 'Как назвать время?', done: '2:15 — четверть третьего', q: 'l3Q2', hb: 'l3H2b', demo: 'l3D2', ok: 'l3Ok2' },
    { clock: [4, 45], hops: 9, choices: ['четверть пятого', 'без четверти четыре', 'без четверти пять'], answer: 'без четверти пять', wT: 3, board: 'Как назвать время?', done: '4:45 — без четверти пять', q: 'l3Q2', hb: 'l3H2c', demo: 'l3D3', ok: 'l3Ok3' },
  ],
  build(S) {
    const L = new Level(170, 12, 'day'); S.L = L; L.song = 'day'; L.tint = ['rgba(255,170,90,0.12)', 'rgba(255,170,90,0.12)'];
    L.ground(0, 42, 10); L.ground(46, 94, 10); L.ground(98, 146, 10); L.ground(150, 170, 10);
    L.plank(42, 44, 8); L.plank(44, 46, 8); L.plank(94, 96, 8); L.plank(96, 98, 8); L.plank(146, 148, 8); L.plank(148, 150, 8);
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.B = L.add(new NPC('bublik', tc(8), tx(10), -1));
    S.T = L.add(new Cub(tx(180), tx(10))); S.T.vis = false;
    L.plank(12, 15, 5); S.bouncers.push(L.add(new Bouncer(tc(11) - 10, tx(10), 'loaf'))); S.gold = L.add(new GoldLantern(tx(13) + 32, tx(5)));
    S.stations = [18, 70, 122].map((X0, i) => {
      const t = LV3.TASKS[i];
      const clock = L.add(new ClockPost(tc(X0 + 19), tx(10), 100, t.clock[0], t.clock[1], { post: 110 }));
      L.plank(X0 + 4, X0 + 5, 8); const tray = L.add(new Tray(X0 + 4, 8, tx(10), 0));
      return { i, X0, t, clock, tray, hops: 0, started: false, done: false };
    });
    S.flag = L.add(new Flag(tc(166), tx(10), true)); S.flag.locked = true;
    L.plank(158, 161, 8);
    checkpoint(L, 19, 10, false); checkpoint(L, 47, 10); checkpoint(L, 71, 10, false); checkpoint(L, 99, 10); checkpoint(L, 123, 10, false); checkpoint(L, 151, 10);
    ffArc(S, tx(41) + 30, 590, tx(47) + 30, 590, 160, 4); ffArc(S, tx(93) + 30, 590, tx(99) + 30, 590, 160, 4); ffArc(S, tx(145) + 30, 590, tx(151) + 30, 590, 160, 4);
    [[1, 80], [52, 80], [104, 80], [156, 80]].forEach(([c, w]) => deco(L, 't_basket', tc(c), tx(10), w, 4));
    return L;
  },
  start(S) {
    startHud(S, 2);
    run((function* () {
      G.freeze = true; yield 0.5;
      say(S.B, VL.l3Intro(), 6); yield vwait(0.3);
      say(S.M, VL.l3Rule(), 5); yield vwait(0.3);
      say(S.p, VL.l3Go(), 3); yield vwait(0.2);
      G.freeze = false;
    })());
  },
  goal(S) {
    const st = S.cur;
    if (st && st.hopping) return { x: st.tray.x, y: st.tray.y, kind: 'hop', x0: tx(st.X0 + 4), x1: tx(st.X0 + 5), top: tx(8), left: st.t.hops - st.hops };
    return goalOf(S, st => tx(st.X0 + 5), tx(152));
  },
  update(S, dt) {
    stationTrigger(S, LV3.station);
    const p = S.p, st = S.cur;
    // прыжки на подносе: каждое приземление — следующее деление (5 минут), до длинной стрелки
    if (st && st.hopping) {
      const on = p.onGround && Math.abs(p.y - tx(8)) < 2 && p.x > tx(st.X0 + 4) - 20 && p.x < tx(st.X0 + 5) + 20;
      if (on && !st.wasOn && st.hops < st.t.hops) {
        st.hops++; st.clock.ticks5 = st.hops; st.tray.lit = true; Sound.count(Math.min(10, st.hops));
        spawn({ type: 'num', text: String(st.hops * 5), x: p.x, y: p.y - 150, vy: -60, life: 0.9, size: 40 });
        if (st.hops === st.t.hops) { st.hopping = false; st.clock.minHL = 3; run(LV3.ask(S, st)); }
      }
      st.wasOn = on;
    }
    if (!S.endStarted && S.stations[2].done && p.x >= tx(152) - 32) { S.endStarted = true; run(cubDrop(S, { lock: { x: tx(158), y: tx(10) - viewH() * 0.62 }, fromX: tx(169), runX: tx(164), line: VL.l3T1(), gx: tx(159) + 32, gy: tx(8), awayX: tx(169), jump: VL.l3Jump() })); }
    gearUpdate(S, VL.l3Got());
  },
  lock(S, st) { return fitLock(tx(st.X0) + 10, tx(st.X0 + 22) + 30, tx(10) - 380); },
  station(S, st) {
    return (function* () {
      const X0 = st.X0; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      yield* puffTo(S.B, tc(X0 + 16), tx(10), -1);
      S.p.autoX = tx(X0 + 3) + 10; S.p.autoFace = 1;
      S.cam.lock = LV3.lock(S, st); yield 0.6;
      say(S.M, VL.l3Hop(), 5); yield vwait(0.2);
      G.freeze = false; st.hopping = true; st.wasOn = false;
    })();
  },
  ask(S, st) {
    return (function* () {
      const t = st.t, X0 = st.X0;
      yield vwait(0.5);
      const cols = t.wT === 1 ? [X0 + 8, X0 + 10, X0 + 12] : [X0 + 7, X0 + 10, X0 + 13];
      S.ask({
        text: t.board, answer: t.answer, choices: t.choices, cols, wT: t.wT, row: 7, speaker: S.M, say: VL[t.q](), eqDone: t.done, eqOk: true,
        hints: [VL.l3H1(), VL[t.hb]()],
        demo: function* () { st.clock.ticks5 = 0; say(S.M, VL[t.demo](), 6); for (let k = 1; k <= t.hops; k++) { yield 0.5; st.clock.ticks5 = k; Sound.count(Math.min(10, k)); } st.clock.minHL = 3; st.clock.hourHL = 3; yield vwait(0.3); },
        onCorrect: function* () {
          st.clock.minHL = 3; st.clock.hourHL = 3; say(S.M, VL[t.ok](), 6); yield vwait(0.3);
          if (st.i === 2) { say(S.B, VL.l3Bub(), 3); yield vwait(0.2); }
          st.clock.ticks5 = 0; S.cam.lock = null; st.done = true;
        },
      });
    })();
  },
  counted(S) { const st = S.cur; if (!st || st.done) return null; if (!S.q) return null; return clockCounted(S, [st.clock]); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, [st.clock]); },
};
