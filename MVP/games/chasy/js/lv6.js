'use strict';
// ---------- Финал: Башня часов — пять замков (по задаче из каждого уровня) и стрелки на Башенные часы ----------
const LV6 = {
  idx: 5, rngId: 6,
  LOCKS: [
    { clocks: [[9, 0]], choices: ['9 часов', '12 часов', '3 часа'], answer: '9 часов', wT: 3, board: 'Сколько времени?', done: '9:00 — девять часов', q: 'fQ1', h: 'fH1', ok: 'fOk1' },
    { clocks: [[8, 30]], choices: ['половина восьмого', 'половина девятого', 'восемь часов'], answer: 'половина девятого', wT: 3, board: 'Как назвать время?', done: '8:30 — половина девятого', q: 'fQ2', h: 'fH2', ok: 'fOk2' },
    { clocks: [[1, 15]], choices: ['четверть первого', 'без четверти два', 'четверть второго'], answer: 'четверть второго', wT: 3, board: 'Как назвать время?', done: '1:15 — четверть второго', q: 'fQ3', h: 'fH3', ok: 'fOk3' },
    { clocks: [[3, 0], [6, 0]], choices: ['2 часа', '3 часа', '9 часов'], answer: '3 часа', wT: 2, board: 'Сколько прошло?', done: 'с 3:00 до 6:00 — 3 часа', q: 'fQ4', h: 'fH4', ok: 'fOk4' },
    { clocks: [], choices: ['12', '60', '24'], answer: '24', wT: 1, board: 'Часов в сутках?', done: 'в сутках 24 часа', q: 'fQ5', h: 'fH5', ok: 'fOk5' },
  ],
  build(S) {
    const L = new Level(150, 12, 'eve'); S.L = L; L.song = 'eve'; L.night = 0.55; L.tint = ['rgba(120,110,200,0.12)', 'rgba(120,110,200,0.12)'];
    L.ground(0, 150, 10);
    // ступени между замками (лестница башни)
    for (const c of [22, 46, 70, 94]) { L.stone(c, c + 2, 9, 10); L.stone(c + 1, c + 2, 8, 9); }
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.T = L.add(new Cub(tx(160), tx(10))); S.T.vis = false;
    S.stations = [3, 25, 49, 73, 97].map((X0, i) => {
      const t = LV6.LOCKS[i];
      const clocks = t.clocks.map(([h, m], k) => L.add(new ClockPost(tc(X0 + 16 + k * 4), tx(10), t.clocks.length > 1 ? 80 : 92, h, m, { post: 110, label: t.clocks.length > 1 ? (k ? 'конец' : 'начало') : null })));
      return { i, X0, t, clocks, started: false, done: false };
    });
    S.tower = L.add(new ClockPost(tc(136), tx(10), 130, 5, 0, { post: 90, digital: true }));
    S.tower.noHands = true;
    S.stations.push({ i: 5, X0: 120, top: true, clocks: [S.tower], started: false, done: false });
    S.flag = null;
    checkpoint(L, 24, 10, false); checkpoint(L, 48, 10, false); checkpoint(L, 72, 10, false); checkpoint(L, 96, 10, false); checkpoint(L, 121, 10, false);
    return L;
  },
  start(S) {
    startHud(S, 5); S.weightsHave = 5;
    run((function* () { G.freeze = true; yield 0.5; say(S.M, VL.f0(), 5); yield vwait(0.3); G.freeze = false; })());
  },
  goal(S) { return goalOf(S, st => tx(st.X0 + 5), null); },
  update(S) { stationTrigger(S, LV6.station); S.hud.text = '5 из 5'; },
  lock(S, st) { return st.top ? fitLock(tx(st.X0) + 10, tx(st.X0 + 20), tx(10) - 520) : fitLock(tx(st.X0) + 10, tx(st.X0 + (st.t.clocks.length ? 18 + (st.t.clocks.length - 1) * 4 : 16)), tx(10) - 350); },
  station(S, st) {
    return (function* () {
      const X0 = st.X0, M = S.M; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      S.p.autoX = tx(X0 + 4); S.p.autoFace = 1;
      S.cam.lock = LV6.lock(S, st); yield 0.6;
      if (st.top) { yield* LV6.top(S, st); return; }
      const t = st.t; G.freeze = false;
      const cols = t.wT === 3 ? [X0 + 5, X0 + 8, X0 + 11] : t.wT === 2 ? [X0 + 5, X0 + 8, X0 + 11] : [X0 + 6, X0 + 8, X0 + 10];
      S.ask({
        text: t.board, answer: t.answer, choices: t.choices, cols, wT: t.wT, row: 7, speaker: M, say: VL[t.q](), eqDone: t.done, eqOk: true,
        hints: [VL[t.h](), VL[t.h]()],
        demo: function* () { for (const c of st.clocks) { c.hourHL = 3; c.minHL = 3; } say(M, VL[t.h](), 5); yield vwait(0.3); },
        onCorrect: function* () { say(M, VL[t.ok](), 3); yield vwait(0.3); Sound.secret(); S.cam.lock = null; st.done = true; },
      });
    })();
  },
  // вершина: Тик-Так отдаёт стрелки, Искра ставит половину седьмого вечера
  top(S, st) {
    return (function* () {
      const T = S.T, M = S.M, tw = S.tower;
      T.vis = true; T.gear = false; T.x = tx(149); T.y = tx(10); T.runTo(tx(129));
      yield () => T.arrived; T.face = -1;
      say(T, VL.fT1(), 3); yield vwait(0.2);
      say(S.p, VL.fI1(), 3); yield vwait(0.2);
      say(T, VL.fT2(), 5); yield vwait(0.2);
      say(M, VL.fM1(), 5); yield vwait(0.2);
      say(T, VL.fT3(), 3); yield vwait(0.2);
      // стрелки встают на место (сначала на пять часов)
      tw.noHands = false; Sound.sparkle(); sparkBurst(tw.x, tw.cy, 30, '#ffe066', 300);
      tw.digital = null; tw.setTime(17, 0); tw.shown = tw.T;
      yield 0.6; G.freeze = false;
      turnQuestion(S, tw, [6, 30], {
        cols: [st.X0 + 5, st.X0 + 7, st.X0 + 10], board: 'половина седьмого вечера', say: VL.fQ(), done: '18:30 — половина седьмого', hints: [VL.fHa(), VL.fHb()], demo: VL.fDemo(),
        onCorrect: function* () {
          tw.minHL = 3; tw.hourHL = 3; tw.digital = true;
          check(tw.hm[0] === 18 && tw.hm[1] === 30, 'Башенные часы: 18:30');
          say(M, VL.fOk(), 7); yield vwait(0.3);
          Sound.fanfare(); G.shake = 0.2; for (let i = 0; i < 6; i++) { sparkBurst(tw.x + frand(-150, 150), tw.cy + frand(-150, 150), 16, '#ffe066', 300); yield 0.15; }
          say(M, VL.fM2(), 5); yield vwait(0.2);
          say(T, VL.fT4(), 3); yield vwait(0.2);
          say(NARR, VL.fN(), 5); yield vwait(0.2);
          say(S.p, VL.fAll(), 2); yield vwait(0.5);
          st.done = true; S.complete();
        },
      });
    })();
  },
  counted(S) { const st = S.cur; if (!st || st.done) return null; return clockCounted(S, st.clocks); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, st.clocks); },
};
