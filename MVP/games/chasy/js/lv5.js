'use strict';
// ---------- Уровень 5: Крыши — сутки, утро и вечер. Механика: встань под фонарь-ответ и подожди, пока разгорится ----------
const LV5 = {
  idx: 4, rngId: 5,
  TASKS: [
    { clock: [7, 0], who: 'B', intro: 'l5A1', lamps: ['19:00', '7:00', '17:00'], answer: '7:00', board: '7 часов утра — это…', done: '7 часов утра = 7:00', q: 'l5Q1', hints: ['l5H1', 'l5H1'], ok: 'l5Ok1', night: 0 },
    { clock: [15, 0], who: 'P', intro: 'l5B1', lamps: ['3:00', '13:00', '15:00'], answer: '15:00', board: '3 часа дня — это…', done: '3 часа дня = 15:00', q: 'l5Q2', hints: ['l5H2', 'l5H2'], ok: 'l5Ok2', night: 0.3 },
    { clock: null, who: 'I', intro: 'l5C1', lamps: ['120', '100', '60'], answer: '120', board: '2 часа = ? минут', done: '2 часа = 120 минут', q: 'l5Q3', hints: ['l5H3a', 'l5H3b'], ok: 'l5Ok3', night: 0.7 },
  ],
  build(S) {
    const L = new Level(150, 12, 'eve'); S.L = L; L.song = 'eve'; L.night = 0;
    L.ground(0, 38, 10); L.ground(42, 80, 10); L.ground(84, 122, 10); L.ground(126, 150, 10);
    L.plank(37, 40, 8); L.plank(40, 43, 8); L.plank(79, 82, 8); L.plank(82, 85, 8); L.plank(121, 124, 8); L.plank(124, 127, 8);
    // трубы на крышах — перепрыгнуть
    for (const c of [12, 36, 54, 96, 117]) L.stone(c, c + 1, 9, 10);
    L.stone(139, 141, 8, 10);
    L.spawn = { x: tc(2), y: tx(10) };
    S.M = L.add(new NPC('minutus', tc(5), tx(10), 1));
    S.B = L.add(new NPC('bublik', tc(8), tx(10), -1)); S.B.alpha = 0;
    S.P = L.add(new NPC('ded', tc(8), tx(10), -1)); S.P.alpha = 0;
    S.T = L.add(new Cub(tx(160), tx(10))); S.T.vis = false;
    L.plank(60, 63, 4); S.bouncers.push(L.add(new Bouncer(tc(59) - 10, tx(10), 'hay'))); S.gold = L.add(new GoldLantern(tx(61) + 32, tx(4)));
    S.stations = [16, 58, 100].map((X0, i) => {
      const t = LV5.TASKS[i];
      const clock = t.clock ? L.add(new ClockPost(tc(X0 + 17), tx(10), 92, t.clock[0], t.clock[1], { post: 110, dark: i > 0 })) : null;
      return { i, X0, t, clock, started: false, done: false };
    });
    S.flag = L.add(new Flag(tc(146), tx(10), true)); S.flag.locked = true;
    checkpoint(L, 17, 10, false); checkpoint(L, 43, 10); checkpoint(L, 59, 10, false); checkpoint(L, 85, 10); checkpoint(L, 101, 10, false); checkpoint(L, 127, 10);
    ffArc(S, tx(36) + 30, 520, tx(43) + 30, 520, 120, 4); ffArc(S, tx(78) + 30, 520, tx(85) + 30, 520, 120, 4); ffArc(S, tx(120) + 30, 520, tx(127) + 30, 520, 120, 4);
    return L;
  },
  start(S) {
    startHud(S, 4);
    run((function* () {
      G.freeze = true; yield 0.5;
      say(S.M, VL.l5Intro(), 7); yield vwait(0.3);
      say(S.M, VL.l5Rule(), 7); yield vwait(0.3);
      say(S.M, VL.l5Lamp(), 5); yield vwait(0.3);
      say(S.p, VL.l5Go(), 2); yield vwait(0.2);
      G.freeze = false;
    })());
  },
  goal(S) { return goalOf(S, st => tx(st.X0 + 4), tx(131)); },
  update(S, dt) {
    stationTrigger(S, LV5.station);
    // вечереет: с каждой станцией небо темнее (плавно)
    const want = S.cur ? S.cur.t.night : 0; S.L.night = lerp(S.L.night, want, 1 - Math.exp(-dt * 0.8));
    if (!S.endStarted && S.stations[2].done && S.p.x >= tx(130) - 32) { S.endStarted = true; run(cubDrop(S, { lock: { x: tx(136), y: tx(10) - viewH() * 0.62 }, fromX: tx(149), runX: tx(144), line: VL.l5T1(), gx: tx(140), gy: tx(8), awayX: tx(149), jump: VL.l5Jump() })); }
    gearUpdate(S, VL.l5Got());
  },
  lock(S, st) { return fitLock(tx(st.X0) + 10, tx(st.X0 + (st.clock ? 19 : 15)), tx(10) - 350); },
  station(S, st) {
    return (function* () {
      const t = st.t, X0 = st.X0, M = S.M; G.freeze = true;
      yield* minutusAt(S, X0 + 1);
      S.p.autoX = tx(X0 + 4); S.p.autoFace = 1;
      S.cam.lock = LV5.lock(S, st); yield 0.6;
      if (t.who === 'B' || t.who === 'P') { const n = t.who === 'B' ? S.B : S.P; n.alpha = 1; yield* puffTo(n, st.clock ? tc(X0 + 14) + 10 : tc(X0 + 15), tx(10), -1); say(n, VL[t.intro](), 4); yield vwait(0.3); }
      else { say(S.p, VL[t.intro](), 4); yield vwait(0.3); }
      const objs = t.lamps.map((v, k) => S.L.add(new ChoiceObj('lamp', X0 + 6 + k * 2 + (k ? k : 0), 10, v, null, { label: v })));
      yield 0.6; G.freeze = false;
      S.ask({
        text: t.board, answer: t.answer, choices: t.lamps.slice(), objs, speaker: M, say: VL[t.q](), eqDone: t.done, eqOk: true,
        hints: t.hints.map(k => VL[k]()),
        demo: function* () { if (st.clock) { st.clock.hourHL = 3; st.clock.minHL = 3; } say(M, VL[t.hints[1]](), 5); yield vwait(0.3); },
        onCorrect: function* () {
          say(M, VL[t.ok](), 5); yield vwait(0.3);
          for (const o of objs) if (o.state !== 'used') { puff(o.x, o.y - 200, 8); o.dead = true; }
          for (const n of [S.B, S.P]) if (n.alpha > 0) { puff(n.x, n.y - 60, 8); n.alpha = 0; }
          S.cam.lock = null; st.done = true;
        },
      });
    })();
  },
  counted(S) { const st = S.cur; if (!st || st.done) return null; return clockCounted(S, st.clock ? [st.clock] : []); },
  countRule() { return []; },
  avoidRects(S) { const st = S.cur; if (!st || st.done) return []; return clockAvoid(S, st.clock ? [st.clock] : []); },
};
