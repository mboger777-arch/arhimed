'use strict';
// ---------- Уровень 4: Мост Деда Моста — сколько прошло времени. Механика: клади доски (1 доска = 1 час) и «Готово» ----------
const PW = 3;   // доска длиной 3 клетки: пролёт в 6 клеток не перепрыгнуть — нужен мост
const LV4 = {
  idx: 3, rngId: 4,
  build(S) {
    const L = new Level(150, 12, 'day'); S.L = L; L.song = 'day'; L.tint = ['rgba(140,200,255,0.10)', 'rgba(140,200,255,0.10)'];
    // станция 1: пролёт 33..39; станция 2: пролёт 83..89
    L.ground(0, 34, 10); L.ground(40, 84, 10); L.ground(90, 150, 10);
    L.plank(10, 13, 8); L.plank(60, 63, 8); L.plank(108, 111, 8);
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.D = L.add(new NPC('ded', tc(8), tx(10), -1));
    S.P = L.add(new NPC('bublik', tc(79) + 20, tx(10), -1)); S.P.alpha = 0;
    S.T = L.add(new Cub(tx(160), tx(10))); S.T.vis = false;
    L.plank(65, 68, 4); S.bouncers.push(L.add(new Bouncer(tc(64) - 10, tx(10), 'hay'))); S.gold = L.add(new GoldLantern(tx(66) + 32, tx(4)));
    const gap1 = L.add(new BridgeGap(34, 2, 10)), gap2 = L.add(new BridgeGap(84, 2, 10)); gap1.pw = gap2.pw = PW;
    S.stations = [
      { i: 0, X0: 16, gap: gap1, c1: L.add(new ClockPost(tc(32), tx(10), 122, 2, 30, { post: 90, label: 'вышел' })), c2: L.add(new ClockPost(tc(41), tx(10), 122, 4, 30, { post: 90, label: 'дошёл' })) },
      { i: 1, X0: 66, gap: gap2, c1: L.add(new ClockPost(tc(82), tx(10), 122, 10, 15, { post: 90, label: 'отправился' })), c2: L.add(new ClockPost(tc(91), tx(10), 122, 10, 15, { post: 90, label: 'приехал' })) },
      { i: 2, X0: 112, c1: L.add(new ClockPost(tc(131), tx(10), 120, 9, 0, { post: 100, label: 'начало', digital: true })) },
    ].map(o => Object.assign(o, { started: false, done: false }));
    S.flag = L.add(new Flag(tc(146), tx(10), true)); S.flag.locked = true;
    L.crate(140, 9); L.crate(141, 9); L.crate(141, 8);
    checkpoint(L, 17, 10, false); checkpoint(L, 41, 10); checkpoint(L, 67, 10, false); checkpoint(L, 91, 10); checkpoint(L, 113, 10, false); checkpoint(L, 135, 10);
    [[1, 80], [26, 70], [50, 80], [100, 80], [120, 70], [148, 80]].forEach(([c, w]) => deco(L, 't_bush', tc(c), tx(10), w, 8));
    return L;
  },
  start(S) {
    startHud(S, 3);
    run((function* () {
      G.freeze = true; yield 0.5;
      say(S.D, VL.l4Intro(), 6); yield vwait(0.3);
      say(S.M, VL.l4Rule(), 5); yield vwait(0.3);
      say(S.p, VL.l4Go(), 3); yield vwait(0.2);
      G.freeze = false;
    })());
  },
  goal(S) { return goalOf(S, st => tx(st.X0 + 5), tx(136)); },
  update(S) {
    stationTrigger(S, LV4.station);
    if (!S.endStarted && S.stations[2].done && S.p.x >= tx(135) - 32) { S.endStarted = true; run(cubDrop(S, { lock: { x: tx(137), y: tx(10) - viewH() * 0.62 }, fromX: tx(149), runX: tx(144), line: VL.l4T1(), gx: tx(141) + 32, gy: tx(8), awayX: tx(149), jump: VL.l4Jump() })); }
    gearUpdate(S, VL.l4Got());
  },
  lock(S, st) { return st.i < 2 ? fitLock(tx(st.X0) + 10, tx(st.X0 + (st.i ? 31 : 27)) + 40, tx(10) - 490) : fitLock(tx(st.X0) + 10, tx(st.X0 + 23), tx(10) - 390); },
  // «+ доска» / «Готово»: доски ложатся в пролёт; «Готово» сверяет число досок с нужным
  plankQ(S, st, need, o) {
    const g = st.gap, X0 = st.X0;
    S.ask({
      text: o.board, answer: 'Готово', choices: ['+ доска', 'Готово'], cols: [X0 + 6, X0 + 9], wT: 2, row: 7, speaker: S.M, say: o.say, eqDone: o.done, eqOk: true,
      hints: o.hints,
      custom(b) {
        if (b.value === '+ доска') { if (g.laid < 5) { g.lay(); if (o.onLay) o.onLay(g.laid); } return false; }
        if (g.laid === need) return true;
        const many = g.laid > need; run((function* () { yield 0.2; say(S.D, many ? VL.l4Many() : VL.l4Few(), 3, { drop: true }); yield 1.2; g.clear(); if (o.onLay) o.onLay(0); })());
        return 'wrong';
      },
      next() { return g.laid < need ? '+ доска' : 'Готово'; },
      demo: function* () { g.clear(); if (o.onLay) o.onLay(0); yield 0.4; say(S.M, o.hints[1], 5); yield vwait(0.2); },
      onCorrect: o.onCorrect,
    });
  },
  station(S, st) {
    return (function* () {
      const X0 = st.X0, M = S.M, D = S.D; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      if (st.i < 2) yield* puffTo(D, tc(X0 + 11), tx(10), -1);
      S.p.autoX = tx(X0 + 4); S.p.autoFace = 1;
      S.cam.lock = LV4.lock(S, st); yield 0.6;
      if (st.i === 0) {
        say(D, VL.l4A1(), 5); yield vwait(0.3); G.freeze = false;
        LV4.plankQ(S, st, 2, {
          board: 'Сколько часов прошло?', say: VL.l4Q1(), done: 'с 2:30 до 4:30 — 2 часа', hints: [VL.l4H1(), VL.l4H2()],
          onCorrect: function* () { st.gap.fix(); st.c1.minHL = st.c2.minHL = 3; say(D, VL.l4Ok1(), 5); yield vwait(0.3); S.cam.lock = null; st.done = true; },
        });
      } else if (st.i === 1) {
        yield* puffTo(S.P, tc(79) + 20, tx(10), -1);
        say(S.P, VL.l4B1(), 5); yield vwait(0.3); G.freeze = false;
        // каждая доска — час пути: правые часы идут вперёд на час
        LV4.plankQ(S, st, 2, {
          board: 'Ехал 2 часа: клади доски', say: VL.l4Q2a(), done: '10:15 + 2 часа', hints: [VL.l4Q2a(), VL.l4H2a()],
          onLay: n => st.c2.setTime(10 + n, 15),
          onCorrect: function* () {
            st.gap.fix(); yield vwait(0.6);
            S.ask({
              text: 'Во сколько приехал?', answer: '12:15', choices: ['11:15', '12:15', '12:45'], cols: [X0 + 4, X0 + 7, X0 + 10], wT: 2, row: 7, speaker: M, say: VL.l4Q2b(), eqDone: '10:15 + 2 ч = 12:15', eqOk: true,
              hints: [VL.l4H2a(), VL.l4H2b()],
              demo: function* () { st.c2.minHL = st.c2.hourHL = 3; say(M, VL.l4H2b(), 4); yield vwait(0.3); },
              onCorrect: function* () { st.c2.minHL = st.c2.hourHL = 3; say(M, VL.l4Ok2(), 6); yield vwait(0.3); S.cam.lock = null; st.done = true; },
            });
          },
        });
      } else {
        say(M, VL.l4C1(), 5); yield vwait(0.3); G.freeze = false;
        S.ask({
          text: 'Когда закончился урок?', answer: '9:45', choices: ['9:15', '10:45', '9:45'], cols: [X0 + 5, X0 + 8, X0 + 11], wT: 2, row: 7, speaker: M, say: VL.l4Q3(), eqDone: '9:00 + 45 мин = 9:45', eqOk: true,
          hints: [VL.l4H3a(), VL.l4H3b()],
          demo: function* () { st.c1.setTime(9, 45); say(M, VL.l4H3b(), 4); yield vwait(0.3); yield 1; st.c1.setTime(9, 0); },
          onCorrect: function* () { st.c1.setTime(9, 45); st.c1.label = 'конец'; say(M, VL.l4Ok3(), 5); yield vwait(0.3); yield* puffTo(D, tc(X0 + 15), tx(10), -1); say(D, VL.l4Trap(), 4); yield vwait(0.3); S.cam.lock = null; st.done = true; },
        });
      }
    })();
  },
  clocks(st) { return [st.c1, st.c2].filter(Boolean); },
  counted(S) { const st = S.cur; if (!st || st.done) return null; return clockCounted(S, LV4.clocks(st)); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, LV4.clocks(st)); },
};
