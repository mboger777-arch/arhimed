'use strict';
// ===== Четыре уровня-урока =====
const tx = n => n * TILE;           // колонка -> пиксели (левый край)
const tc = n => n * TILE + TILE / 2; // центр колонки
function deco(L, img, x, y, w, dy = 0) { L.deco.push({ img, x, y, w, dy }); }
function checkpoint(L, col, row, withFlag = true) {
  const f = withFlag ? L.add(new Flag(tc(col), row * TILE, false)) : null;
  L.checkpoints.push({ x: tc(col), y: row * TILE, flag: f });
}
function litCount(arr) { return arr.filter(l => l.lit).length; }
// вопрос задан, прочитан (≥1.2 с) и ещё не решён — значит, ребёнок сейчас считает
function asking(S) { return !!(S.q && !S.q.solved && S.board && !S.board.solved && G.t - (S.qT0 || 0) > 1.2); }
function cnt(list, f) { return list.filter(f).length; }

// ---------- Уровень 1: Зажги 10 фонарей ----------
const L1 = {
  build(S) {
    const L = new Level(96, 12, 'day'); S.L = L;
    L.ground(0, 18, 10); L.plank(12, 16, 8);
    L.ground(20, 26, 10); L.ground(26, 34, 9); L.stone(30, 32, 7, 9);
    L.ground(36, 50, 10); L.plank(43, 46, 8); L.plank(47, 50, 6);
    L.ground(50, 62, 10); L.crate(56, 9); L.crate(57, 9); L.crate(57, 8);
    L.plank(63, 64, 8);
    L.ground(65, 96, 10); L.plank(67, 70, 8); L.plank(71, 74, 7);
    L.spawn = { x: tc(2), y: tx(10) };
    const lamp = (x, row) => L.add(new Lantern(x, row * TILE, false));
    S.lamps = [lamp(tc(8), 10), lamp(tx(14), 8), lamp(tc(23), 10), lamp(tx(31), 7), lamp(tc(40), 10), lamp(tx(48) + 32, 6), lamp(tc(53), 10), lamp(tc(60), 10), lamp(tx(72) + 32, 7), lamp(tc(79), 10)];
    check(S.lamps.length === 10, 'на уровне 1 ровно 10 фонарей');
    S.ded0 = L.add(new NPC('ded', tc(4), tx(10), 1));
    S.ded = L.add(new NPC('ded', tc(83), tx(10), 1));
    S.gate = L.add(new Gate(86, 6, 10)); S.gate.apply(L);
    S.flag = L.add(new Flag(tc(91), tx(10), true)); S.flag.locked = true;
    checkpoint(L, 37, 10); checkpoint(L, 66, 10);
    // секрет: стог сена подбрасывает на высокую доску с золотым фонарём
    L.plank(22, 25, 4);
    S.bouncers.push(L.add(new Bouncer(tc(21), tx(10), 'hay')));
    S.gold = L.add(new GoldLantern(tx(23) + 32, tx(4)));
    S.puddles.push(L.add(new Puddle(tx(76) + 10, tx(78) - 6, tx(10))));
    // светлячки по дугам прыжков (y — уровень груди Искры)
    ffArc(S, tx(17) + 40, 590, tx(20) + 30, 590, 120, 4);
    ffAt(S, [[tc(21), 468], [tc(21) + 10, 378], [tc(21) + 40, 288]]);
    ffArc(S, tx(33) + 50, 526, tx(36) + 40, 590, 110, 3);
    ffArc(S, tx(45) + 40, 462, tx(47) + 20, 334, 80, 3);
    ffArc(S, tx(61) + 40, 590, tx(63) + 20, 462, 90, 3);
    ffArc(S, tx(63) + 56, 462, tx(65) + 40, 590, 80, 3);
    // декор
    [[1, 10, 90], [10, 10, 80], [17, 10, 70], [28, 9, 70], [39, 10, 86], [45, 10, 70], [52, 10, 80], [69, 10, 90], [76, 10, 80], [88, 10, 90], [94, 10, 80]].forEach(([c, r, w]) => deco(L, 't_bush', tc(c), tx(r), w, 8));
    [[5, 10], [33, 9], [50.5, 10], [61, 10], [80.5, 10]].forEach(([c, r]) => deco(L, 't_fence', tx(c) + 20, tx(r), 120, 6));
    return L;
  },
  start(S) {
    S.hud = { icon: 'lamp', text: '0 из 10' };
    S.gateMsgT = 0;
    run((function* () { yield 0.6; say(S.ded0, VL.l1Start(), 6); })());
  },
  selfCheck(S) {
    const n = litCount(S.lamps);
    check(S.hud.text === n + ' из 10', 'табличка = числу горящих фонарей (' + S.hud.text + ' / ' + n + ')');
    check(S.lamps.length === 10, '10 фонарей на уровне');
  },
};
// «не хватает 1 фонаря / 2 фонарей / 5 фонарей» — родительный падеж
function fonarGen(m) { return plural(m, 'фонаря', 'фонарей', 'фонарей'); }
L1.update = (function () {
  return function (S, dt) {
    const p = S.p;
    for (const l of S.lamps) {
      if (!l.lit && !p.hidden && overlap(p, l.x - 26, l.y - l.h, 52, l.h)) {
        l.setLit(true); const n = litCount(S.lamps); Sound.light(n); Sound.sparkle();
        spawn({ type: 'num', text: String(n), x: l.x, y: l.y - l.h - 20, vy: -60, life: 1.1, size: 40 });
        S.hud.text = n + ' из 10';
        if (n === 10) run((function* () { yield 0.4; say(S.ded, VL.l1All(), 4); S.gate.open = true; S.gate.apply(S.L); S.flag.locked = false; Sound.fanfare(); sparkBurst(S.gate.x, tx(8), 30); })());
      }
    }
    S.gateMsgT -= dt;
    const n = litCount(S.lamps);
    if (n < 10 && S.gateMsgT <= 0 && Math.abs(p.x - S.ded.x) < 280) {
      const m = 10 - n;
      check(m + n === 10, 'дед называет точное число недостающих');
      S.gateMsg = say(S.ded, VL.l1Gate(n), 5); S.gateMsgM = m;
      S.gateMsgT = Math.max(6, S.gateMsg.dur + 1.5);
    }
    // пока дед говорит, сколько не хватает, табличка на воротах («10») целиком в кадре
    const talking = S.gateMsg && G.bubbles.includes(S.gateMsg) && S.gateMsg.t < S.gateMsg.dur && Math.abs(p.x - S.ded.x) < 320;
    S.cam.hint = talking ? { x0: S.ded.x - 90, x1: S.gate.x + 60 } : null;
    if (!S.done && !S.flag.locked && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) { S.flag.on = true; S.complete(); }
  };
})();
L1.gateSign = S => ({ x: S.gate.x - 38, y: S.gate.r0 * TILE - 18 - 38, w: 76, h: 76 });
L1.counted = function (S) {
  if (!S.cam.hint || !S.gateMsg || S.gateMsg.t < 0.6) return null;
  return [
    { kind: 'табличка «горит N из 10»', group: 'plaque', screen: true, hud: true, r: { x: 24, y: 18, w: S.hudW || 210, h: 76 }, skip: ['табличка HUD'] },
    { kind: 'знак на воротах «10»', group: 'sign', r: L1.gateSign(S) },
  ];
};
L1.countRule = function (S, ok) {
  const lit = litCount(S.lamps), shown = parseInt(S.hud.text, 10);
  return [
    { name: 'табличка: горит', visible: ok.some(o => o.group === 'plaque') ? shown : -1, expected: lit },
    { name: 'на воротах нужно', visible: ok.some(o => o.group === 'sign') ? 10 : -1, expected: 10 },
    { name: 'дед: не хватает', visible: S.gateMsgM, expected: 10 - lit },
  ];
};

// ---------- Уровень 2: Горело 10, погасло K ----------
const L2 = {
  WT: 342, // верх каменной стены, на которой стоят 10 фонарей
  build(S) {
    const L = new Level(116, 13, 'eve'); S.L = L; L.night = 0.5; L.props = [];
    const rng = S.rng;
    const K1 = rint(rng, 2, 6);
    let n2 = rint(rng, 3, 8); if (10 - n2 === K1) n2 = n2 >= 8 ? n2 - 1 : n2 + 1;
    let K3 = rint(rng, 1, 8); while (K3 === K1 || K3 === 10 - n2) K3 = rint(rng, 1, 8);
    S.math = { K1, n2, K3 };
    L.ground(0, 12, 10);
    L.spawn = { x: tc(2), y: tx(10) };
    // секрет: стог → высокая доска с золотым фонарём
    L.plank(6, 9, 5);
    S.bouncers.push(L.add(new Bouncer(tc(4), tx(10), 'hay')));
    S.gold = L.add(new GoldLantern(tx(7) + 32, tx(5)));
    S.stations = [];
    // площадка: 10 фонарей стоят на каменной стене сзади — высоко, их не закрывают ни герои, ни рама;
    // рама с блоками-ответами — ниже стены, слева дед, между блоками — место Искры
    const st = (x0, kind, k) => {
      const X = tx(x0);
      L.ground(x0, x0 + 15, 10);
      const wall = L.add(new StationWall(X + 150, X + 880, L2.WT, tx(10)));
      L.props.push({ name: 'стена', x0: X + 150, x1: X + 880, y: L2.WT });
      const lamps = []; for (let i = 0; i < 10; i++) { const l = L.add(new Lantern(X + 190 + i * 72, L2.WT, true)); l.z = 1.5; lamps.push(l); }
      const ded = L.add(new NPC('ded', X + 80, tx(10), 1));
      const bridge = L.add(new Bridge(x0 + 15, x0 + 19, 10));
      const s = { x0, kind, k, lamps, ded, bridge, wall, started: false, done: false, cols: [x0 + 4, x0 + 6, x0 + 8], iskraX: X + 352 };
      S.stations.push(s); return s;
    };
    st(12, 'minus', K1);
    // река с плотом: плот держится на воде и перевозит Искру
    L.ground(31, 39, 10); L.ground(39, 40, 11); L.ground(46, 47, 11); L.ground(47, 50, 10);
    S.raft = L.add(new Raft(tx(40) + 70, tx(46) - 70, L)); L.movers.push(S.raft);
    st(50, 'need', 10 - n2);
    // луг: лужа и ветерок порывами (ветровой рукав показывает, когда дует)
    L.ground(69, 88, 10); L.plank(79, 82, 7);
    S.puddles.push(L.add(new Puddle(tx(72) + 8, tx(74) + 40, tx(10))));
    S.gusts.push(L.add(new GustZone(tx(75), tx(86), tx(10))));
    st(88, 'minus', K3);
    L.ground(107, 116, 10);
    S.flag = L.add(new Flag(tc(112), tx(10), true));
    checkpoint(L, 13, 10, false); checkpoint(L, 32, 10); checkpoint(L, 51, 10, false); checkpoint(L, 70, 10); checkpoint(L, 89, 10, false); checkpoint(L, 108, 10);
    ffAt(S, [[tc(4), 468], [tc(4) + 10, 378], [tc(4) + 40, 288]]);
    for (const b0 of [27, 65, 103]) ffArc(S, tx(b0) + 40, 590, tx(b0 + 4) - 40, 590, 100, 3);
    ffAt(S, [[tx(41) + 20, 704], [tx(42) + 30, 704], [tx(43) + 40, 704], [tx(44) + 50, 704]]);
    ffAt(S, [[tx(79) + 40, 398], [tx(80) + 32, 398], [tx(81) + 24, 398]]);
    [[1, 70], [10.6, 70], [34, 80], [37.5, 70], [48.3, 70], [70.6, 70], [77, 80], [109, 80], [114, 70]].forEach(([c, w]) => deco(L, 't_bush', tc(c), tx(10), w, 8));
    return L;
  },
  start(S) {
    S.hud = { icon: 'lamp', text: '10 горят' };
    S.cur = null;
    run((function* () { yield 0.6; say(S.stations[0].ded, VL.l2Start(), 6.5); })());
  },
  update(S, dt) {
    const p = S.p;
    for (const s of S.stations) {
      if (!s.started && p.x > tx(s.x0 + 2) && p.x < tx(s.x0 + 15) && p.onGround && !(S.q && !S.q.solved)) { s.started = true; S.cur = s; run(L2.stationScript(S, s)); }
    }
    // пока ребёнок думает, табличка не подсказывает ответ
    if (S.cur) S.hud.text = (S.board && !S.board.solved) ? '?' : litCount(S.cur.lamps) + ' ' + plural(litCount(S.cur.lamps), 'горит', 'горят', 'горят');
    if (!S.done && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) { S.flag.on = true; S.complete(); }
  },
  *wind(S, s, K) {
    const rng = S.rng;
    const idx = shuffle(rng, [...Array(10).keys()]).slice(0, K).sort((a, b) => a - b);
    s.blownIdx = idx;
    Sound.wind();
    const x0 = S.cam.x - 80, x1 = S.cam.x + viewW() + 80, dur = 2.0;
    for (let i = 0; i < 9; i++) spawn({ type: 'swirl', x: x0 - i * 50, y: L2.WT - 40 - (i % 3) * 40, vx: (x1 - x0) / dur, vy: 0, life: dur + 0.6, size: frand(26, 40), vr: 5 });
    let t = 0; const done = new Set();
    while (t < dur + 0.3) {
      const wx = x0 + (x1 - x0) * (t / dur);
      for (const i of idx) if (!done.has(i) && s.lamps[i].x < wx) { done.add(i); s.lamps[i].setLit(false); Sound.blowout(); }
      t += 1 / 60; yield 1 / 60;
    }
    for (const i of idx) s.lamps[i].setLit(false);
  },
  stationScript(S, s) {
    return (function* () {
      // Искра отходит на своё место между блоками; камера показывает деда, Искру, раму и все 10 фонарей на стене
      S.p.autoX = s.iskraX; S.p.autoFace = 1;
      S.cam.lock = L2.frameLock(S, s);
      G.freeze = true;
      yield vwait(0.6); // дед договаривает вступление
      say(s.ded, VL.wind(), 2);
      yield 0.8;
      const K = s.k;
      yield* L2.wind(S, s, K);
      const lit = litCount(s.lamps);
      check(lit === 10 - K, `видно горящих ${lit} = 10 − ${K}`);
      check(s.lamps.length === 10, 'на площадке 10 фонарей');
      G.freeze = false;
      if (s.kind === 'minus') {
        const ans = 10 - K;
        S.ask({
          text: `10 − ${K} = ?`, answer: ans, choices: makeChoices(S.rng, ans), row: 7, beamOff: 80, cols: s.cols, speaker: s.ded,
          say: VL.l2MinusQ(K), eqDone: `10 − ${K} = ${ans}`,
          hints: [VL.l2MinusH1(), VL.l2MinusH2(K)],
          demo: function* () { yield* countLamps(S, s, s.lamps.filter(l => l.lit), s.ded, VL.countLit()); },
          onCorrect: function* () { for (const l of s.lamps) l.label = null; check(litCount(s.lamps) === ans, 'после ответа горит ровно ' + ans); say(s.ded, VL.l2MinusOk(ans), 3.5); yield 0.6; S.cam.lock = L2.bridgeLock(S, s); s.bridge.build(S.L); yield 1.6; S.cam.lock = null; s.done = true; },
        });
      } else {
        const n = 10 - K, ans = K;
        S.ask({
          text: `${n} + ? = 10`, answer: ans, choices: makeChoices(S.rng, ans), row: 7, beamOff: 80, cols: s.cols, speaker: s.ded,
          say: VL.l2PlusQ(n), eqDone: `${n} + ${ans} = 10`,
          hints: [VL.l2PlusH1(), VL.toTen(n)],
          demo: function* () { yield* countLamps(S, s, s.lamps.filter(l => !l.lit), s.ded, VL.countOut()); },
          onCorrect: function* () {
            for (const l of s.lamps) l.label = null;
            say(s.ded, VL.l2PlusOk(), 2.5);
            let i = 0;
            for (const l of s.lamps) if (!l.lit) { yield 0.3; l.setLit(true); i++; Sound.light(n + i); }
            check(litCount(s.lamps) === 10, `${n} + ${ans} = 10: теперь горят все 10`);
            yield 0.4; S.cam.lock = L2.bridgeLock(S, s); s.bridge.build(S.L); yield 1.6; S.cam.lock = null; s.done = true;
          },
        });
      }
    })();
  },
  // кадр: слева дед, справа конец стены; сверху фонари ниже таблички и доски, снизу — земля с ногами героев
  fit(x0, x1) {
    const rightM = G.touchUI ? 250 : 24; // справа на телефоне — кнопка прыжка
    const Z = Math.min(G.baseZoom, (G.W - 24 - rightM) / (x1 - x0));
    const free = G.W - (x1 - x0) * Z;
    const left = free / 2 >= rightM ? (x0 + x1) / 2 - G.W / Z / 2 : x0 - 24 / Z;
    const top = (L2.WT - 98) - 120 / Z;
    return { x: left + G.W / Z / 2, y: top + G.H / Z / 2, zoom: Z, make: () => L2.fit(x0, x1) };
  },
  frameLock(S, s) { const X = tx(s.x0); return L2.fit(X, X + 892); },
  // пока строится мост, в кадре остаются все 10 фонарей и сам мост
  bridgeLock(S, s) { return L2.fit(s.lamps[0].x - 44, tx(s.x0 + 19) + 40); },
  counted(S) {
    const s = S.cur;
    if (!s || !asking(S)) return null;
    // фонари рисуются поверх Искры (z 1.5), поэтому она их закрыть не может
    return s.lamps.map((l, i) => ({ kind: 'фонарь ' + (i + 1) + (l.lit ? ' (горит)' : ' (погас)'), group: l.lit ? 'lit' : 'out', lit: l.lit, r: l.rect(), skip: ['Искра'] }));
  },
  countRule(S, ok) {
    const K = S.cur.k;
    return [
      { name: 'горящих фонарей', visible: cnt(ok, o => o.lit), expected: 10 - K },
      { name: 'погасших фонарей', visible: cnt(ok, o => !o.lit), expected: K },
      { name: 'всего фонарей', visible: ok.length, expected: 10 },
    ];
  },
  selfCheck(S) {
    for (const s of S.stations) check(s.lamps.length === 10, 'на площадке 10 фонарей');
    if (S.cur && S.board && !S.board.solved) {
      const s = S.cur, lit = litCount(s.lamps);
      if (s.kind === 'minus') check(S.board.text === `10 − ${s.k} = ?` && lit === 10 - s.k, 'вопрос совпадает с фонарями');
      else check(S.board.text === `${10 - s.k} + ? = 10` && lit === 10 - s.k, 'вопрос совпадает с фонарями');
    }
  },
};
function* countLamps(S, s, list, speaker, title) {
  say(speaker, title, 2.5);
  for (const l of s.lamps) l.label = null;
  yield 0.6;
  let i = 0;
  for (const l of list) { i++; l.label = String(i); l.labelT = 0; l.labelCol = l.lit ? '#ffd43b' : '#c5d4ff'; Sound.count(i); yield 0.65; }
  check(i === list.length, 'показ: сосчитано столько, сколько видно');
  say(speaker, VL.tryYou(), 3);
  yield vwait(1.2);
}

// ---------- Уровень 3: Булочки Бублика ----------
const L3 = {
  build(S) {
    const L = new Level(90, 12, 'day'); S.L = L;
    const rng = S.rng;
    const a = rint(rng, 2, 5), b = rint(rng, 1, Math.min(4, 8 - a)), sum = a + b;
    const c = rint(rng, 1, Math.min(4, sum - 1));
    S.math = { a, b, sum, c };
    L.ground(0, 23, 10); L.plank(15, 21, 8);
    // секрет: пружинящий каравай подбрасывает на высокую доску с золотым фонарём
    L.plank(11, 14, 4);
    S.bouncers.push(L.add(new Bouncer(tc(9), tx(10), 'loaf')));
    S.gold = L.add(new GoldLantern(tx(12) + 32, tx(4)));
    S.puddles.push(L.add(new Puddle(tx(39) + 10, tx(41) - 10, tx(10))));
    L.ground(25, 44, 10); L.stone(31, 36, 8, 10);
    L.ground(44, 50, 10); L.ground(52, 90, 10);
    L.spawn = { x: tc(2), y: tx(10) };
    S.bublik = L.add(new NPC('bublik', tc(6), tx(10), 1));
    // две группы булочек
    S.buns = [];
    // булочки лежат на противнях: группа A — на мостике, группа B — на каменной плите
    const group = (xs, ySurf, g) => {
      const tray = L.add(new BunTray(xs[0] - 34, xs[xs.length - 1] + 34, ySurf));
      S.trays.push(tray);
      for (const x of xs) S.buns.push(L.add(new Bun(x, tray.top, g)));
    };
    S.trays = [];
    group([...Array(a).keys()].map(i => tx(15) + 40 + i * 62 + (5 - a) * 31 + 32), tx(8), 'a');
    group([...Array(b).keys()].map(i => tx(31) + 40 + i * 62 + (4 - b) * 31 + 20), tx(8), 'b');
    check(S.buns.length === sum && S.buns.filter(x => x.group === 'a').length === a && S.buns.filter(x => x.group === 'b').length === b, 'булочек на уровне ровно a + b');
    S.sh = L.add(new Shchelk(tx(42), tx(9) - 30)); S.sh.range = 190; S.sh.cy = tx(9) - 26; S.sh.cx = tx(42);
    S.stallX = tx(58);
    // корзина стоит на прилавке — выше головы Искры, никогда её не закрывает
    L.props = [{ name: 'прилавок', x0: S.stallX - 18, x1: S.stallX + 268, y: tx(10) - 96 }];
    S.basket = L.add(new Basket(S.stallX + 180, tx(10) - 96)); S.basket.z = 1.5; // корзина всегда поверх Искры
    S.bublikHome = { x: S.stallX - 70, y: tx(10) };
    // Щёлк с украденным зависает слева от Бублика (не над его головой — там место для пузыря):
    // его булочки не пересекаются ни с корзиной, ни с рамой, ни с репликой Бублика
    S.shHover = { x: S.stallX - 215, y: tx(10) - 250 };
    S.qCols = [63, 65, 67]; S.iskraQX = S.stallX + 416;
    S.flag = L.add(new Flag(tc(84), tx(10), true)); S.flag.locked = true;
    checkpoint(L, 26, 10); checkpoint(L, 53, 10);
    [[1, 80], [12, 70], [22, 60], [29, 80], [38, 70], [47, 80], [55, 70], [76, 80], [88, 80]].forEach(([c2, w]) => deco(L, 't_bush', tc(c2), tx(10), w, 8));
    [[26.5, 10], [79, 10]].forEach(([c2, r]) => deco(L, 't_fence', tx(c2) + 20, tx(r), 120, 6));
    ffAt(S, [[tc(9), 480], [tc(9) + 12, 390], [tc(9) + 44, 300]]);
    ffArc(S, tx(22) + 40, 590, tx(25) + 30, 590, 120, 3);
    ffArc(S, tx(29) + 20, 590, tx(30) + 50, 470, 70, 3);
    ffArc(S, tx(49) + 40, 590, tx(52) + 30, 590, 120, 3);
    S.carried = 0; S.stolen = 0; S.phase = 'collect';
    return L;
  },
  start(S) {
    const { a, b } = S.math;
    S.hud = { icon: 'bun', text: '0' };
    run((function* () {
      yield 0.6;
      say(S.bublik, VL.l3Start(a, b), 4.5);
      S.board = { text: `Собери ${a} + ${b}`, solved: false, t: 0 };
      yield vwait(3.6);
      say(S.bublik, VL.l3Wait(), 2.4);
      yield vwait(1.6);
      // Бублик убегает вправо и ждёт у пекарни
      S.bublik.face = 1;
      for (let t = 0; t < 2.2; t += 1 / 60) { S.bublik.x += 380 / 60; if (S.bublik.hop <= 0) S.bublik.hop = 0.5; yield 1 / 60; }
      S.bublik.x = S.bublikHome.x; S.bublik.y = S.bublikHome.y; S.bublik.face = 1;
    })());
  },
  update(S, dt) {
    const p = S.p, sh = S.sh;
    if (S.phase === 'collect') {
      for (const bn of S.buns) {
        if (!bn.taken && !p.hidden && overlap(p, bn.x - 26, bn.y - 44, 52, 44)) {
          bn.taken = true; S.carried++; Sound.sparkle(); sparkBurst(bn.x, bn.y - 20, 12, '#ffe8a0');
          spawn({ type: 'num', text: String(S.carried), x: bn.x, y: bn.y - 60, vy: -60, life: 1, size: 38 });
          S.hud.text = String(S.carried);
        }
      }
      if (!p.hidden && overlap(p, S.basket.x - 90, tx(10) - 100, 180, 100) && Math.abs(S.bublik.x - S.bublikHome.x) < 2) {
        const { a, b, sum } = S.math;
        if (S.carried === sum) { S.phase = 'deliver'; run(L3.deliver(S)); }
        else if (!S.msgT || S.msgT < G.t) { say(S.bublik, VL.l3NotYet(S.carried, a, b), 4); S.msgT = G.t + 5; }
      }
    }
    // Щёлк — помеха (подскок сверху)
    if (sh.vis && (sh.mode === 'patrol' || sh.mode === 'return') && !p.hidden && sh.hitCd <= 0) {
      const bx = sh.box();
      if (overlap(p, bx.x, bx.y, bx.w, bx.h)) {
        if (p.vy > 0 && p.y - p.vy * dt <= bx.y + 14) {
          p.vy = Input.jumpHeld ? -980 : -720; p.jumping = Input.jumpHeld; p.sy = 1.2; p.sx = 0.85; Sound.bounce(); Sound.laugh();
          sh.mode = 'flee'; sh.flee = 0.8; sh.hitCd = 1; sparkBurst(sh.x, sh.y - 10, 8, '#cfe0ff');
        } else if (p.inv <= 0) {
          // мягко: Щёлк лишь отталкивает Искру назад (без потери прогресса)
          p.vx = (p.x < sh.x ? -1 : 1) * 330; p.vy = -420; p.onGround = false; p.inv = 1.1; sh.hitCd = 1; Sound.laugh(); puff(p.x, p.y - 50, 6);
        }
      }
    }
    if (S.phase === 'collect' || S.phase === 'deliver') S.hud.text = String(S.phase === 'collect' ? S.carried : S.basket.count + S.carried);
    else S.hud.text = (S.phase === 'question' && S.board && !S.board.solved) ? '?' : String(S.basket.count);
    if (!S.done && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) {
      if (!S.flag.locked) { S.flag.on = true; S.complete(); }
      else if (!S.msgT || S.msgT < G.t) { say(S.bublik, S.phase === 'collect' ? VL.firstBuns() : VL.firstAnswer(), 2.5); S.msgT = G.t + 4; }
    }
  },
  deliver(S) {
    return (function* () {
      const { a, b, sum, c } = S.math;
      G.freeze = true; S.cam.lock = L3.camLock(S);
      const bk = S.basket;
      for (let i = 0; i < sum; i++) {
        const fb = S.L.add(new FlyBun(S.p.x, S.p.y - 60, bk.x, bk.y - 80, 0.45, () => { bk.count++; S.carried--; bk.pulse = 1; Sound.count(bk.count); spawn({ type: 'num', text: String(bk.count), x: bk.x, y: bk.y - 150, vy: -50, life: 0.9, size: 40 }); }));
        yield 0.5;
      }
      yield 0.5;
      check(bk.count === sum && S.carried === 0, `в корзине ${bk.count} = ${a} + ${b}`);
      S.board = { text: `${a} + ${b} = ${sum}`, solved: true, t: 0 };
      check(a + b === sum, 'равенство сложения верно');
      Sound.correct(); S.bublik.mood = 1;
      say(S.bublik, VL.l3Sum(a, b), 3.5);
      yield vwait(3.6); S.bublik.mood = 0;
      // Щёлк ворует
      const sh = S.sh;
      check(bk.slots(bk.count).length === sum && sh.held === 0, `до кражи в корзине нарисовано ${sum} = ${a} + ${b}`);
      sh.mode = 'goto'; sh.x = S.cam.x + viewW() + 120; sh.y = tx(4); sh.tx = bk.x + 10; sh.ty = bk.y - 120; sh.gotoSpeed = 520;
      say(S.bublik, VL.l3Shchelk(), 2);
      for (let i = 0; i < c; i++) {
        sh.mode = 'goto'; sh.tx = bk.x + 6; sh.ty = bk.y - 110;
        yield () => sh.mode === 'arrived';
        yield 0.2;
        bk.count--; S.stolen++; sh.held++; sh.carry = true; Sound.laugh(); bk.pulse = 1; sparkBurst(bk.x, bk.y - 90, 6, '#ffe8a0');
        spawn({ type: 'num', text: '−1', x: bk.x + 40, y: bk.y - 150, vy: -50, life: 1, size: 40 });
        yield 0.3;
        // уносит булочку к себе и держит её в лапах
        sh.mode = 'goto'; sh.tx = S.shHover.x; sh.ty = S.shHover.y; sh.gotoSpeed = 420;
        yield () => sh.mode === 'arrived';
        sh.face = 1; Sound.laugh();
        yield 0.45;
      }
      const left = sum - c;
      check(bk.count === left, `в корзине осталось ${bk.count} = ${sum} − ${c}`);
      check(bk.slots(bk.count).length === left && sh.drawnBuns() === c, `после кражи: в корзине нарисовано ${left}, у Щёлка в лапах ${c}`);
      // зависает рядом с пекарней, держит украденное и смеётся
      sh.mode = 'perch'; sh.face = 1; sh.cx = S.shHover.x; sh.cy = S.shHover.y; Sound.laugh();
      say(sh, VL.shTook(), 2);
      yield 1.8;
      G.freeze = false; S.phase = 'question';
      // Искра отходит к блокам-ответам: корзина и Щёлк с булочками открыты целиком
      S.p.autoX = S.iskraQX; S.p.autoFace = 1;
      S.ask({
        text: `${sum} − ${c} = ?`, answer: left, choices: makeChoices(S.rng, left), row: 6, cols: S.qCols, speaker: S.bublik,
        say: VL.l3Q(sum, c), eqDone: `${sum} − ${c} = ${left}`,
        hints: [VL.l3H1(), VL.l3H2(sum, c)],
        demo: function* () {
          say(S.bublik, VL.l3Count(), 2.5); yield vwait(0.6);
          for (let i = 1; i <= bk.count; i++) { bk.labels = i; if (i === 1) bk.labelT = 0; Sound.count(i); yield 0.7; }
          check(bk.labels === left, 'показ: подписано столько булочек, сколько в корзине');
          say(S.bublik, VL.tryYou(), 3); yield vwait(1.2);
        },
        onCorrect: function* () {
          bk.labels = null;
          check(bk.count === left, 'после ответа в корзине ' + left);
          S.bublik.mood = 1; say(S.bublik, VL.l3Ok(left), 4);
          S.flag.locked = false; S.cam.lock = null; S.phase = 'done';
          // Щёлк снова летает над дорогой к флагу
          sh.mode = 'return'; sh.cx = tx(77); sh.cy = tx(9) - 26; sh.range = 150;
          yield 3; S.bublik.mood = 0;
        },
      });
    })();
  },
  selfCheck(S) {
    const { a, b, sum, c } = S.math;
    const onLevel = S.buns.filter(x => !x.taken).length;
    check(onLevel + S.carried + S.basket.count + S.stolen === sum && S.stolen <= c, 'булочки не теряются и не появляются из ниоткуда');
    if (S.phase === 'question' && S.board && !S.board.solved) check(S.basket.count === sum - c && S.board.text === `${sum} − ${c} = ?`, 'вопрос совпадает с корзиной');
    if (S.phase !== 'collect') check(S.basket.slots(S.basket.count).length === S.basket.count, 'в корзине нарисовано столько булочек, сколько в счёте');
    check(S.sh.held === S.stolen && S.sh.drawnBuns() === S.stolen, 'у Щёлка в лапах нарисовано ровно столько булочек, сколько он унёс');
    if (S.phase === 'question' || S.phase === 'done') check(S.stolen === c && S.basket.slots(S.basket.count).length === sum - c, 'после кражи: корзина = a + b − c, у Щёлка = c');
    if (!(S.phase === 'question' && S.board && !S.board.solved)) check(S.hud.text === String(S.phase === 'collect' ? S.carried : (S.phase === 'deliver' ? S.basket.count + S.carried : S.basket.count)), 'табличка корзины = числу булочек');
    else check(S.hud.text === '?', 'во время вопроса табличка не подсказывает');
  },
  counted(S) {
    if (S.phase !== 'question' || !asking(S)) return null;
    const ov = (a, b) => Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x)) * Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
    // булочки не должны закрывать друг друга
    const A = S.basket.bunRects(), B = S.sh.bunRects(), all = A.concat(B);
    const mk = (list, group, kind, skip) => list.map((r, i) => ({ kind: kind + ' ' + (i + 1), group, r, skip, okExtra: all.every(o => o === r || ov(r, o) / (r.w * r.h) < 0.05) }));
    return mk(A, 'basket', 'булочка в корзине', ['Искра'])
      .concat(mk(B, 'sh', 'булочка у Щёлка', ['Щёлк', 'Искра']));
  },
  countRule(S, ok) {
    const { sum, c } = S.math;
    return [
      { name: 'булочек в корзине', visible: cnt(ok, o => o.group === 'basket'), expected: sum - c },
      { name: 'булочек у Щёлка', visible: cnt(ok, o => o.group === 'sh'), expected: c },
    ];
  },
  avoidRects(S) { const ay = tx(10) - 336; return [{ x: S.stallX + 30, y: ay - 52, w: 190, h: 60 }]; },
  // кадр вопроса: от Щёлка с булочками (слева) до правого края рамы с блоками
  camLock(S) {
    const x0 = S.shHover.x - 96, x1 = tc(S.qCols[2]) + 80 + 24 + 8;
    const rightM = G.touchUI ? 250 : 24;
    const Z = Math.min(G.baseZoom, (G.W - 24 - rightM) / (x1 - x0)), free = G.W - (x1 - x0) * Z;
    const left = free / 2 >= rightM ? (x0 + x1) / 2 - G.W / Z / 2 : x0 - 24 / Z;
    const top = tx(10) + 40 - G.H / Z;
    return { x: left + G.W / Z / 2, y: top + G.H / Z / 2, zoom: Z, make: () => L3.camLock(S) };
  },
  drawBack(S, c) {
    // пекарня
    const x = S.stallX, y = tx(10);
    c.save();
    // столбы-брёвна
    for (const px of [x + 3, x + 245]) {
      const g = c.createLinearGradient(px - 11, 0, px + 11, 0); g.addColorStop(0, '#6b3f18'); g.addColorStop(0.32, '#d7965a'); g.addColorStop(0.65, '#b07335'); g.addColorStop(1, '#5a3412');
      c.fillStyle = g; c.strokeStyle = '#3e2410'; c.lineWidth = 3; rr(c, px - 11, y - 322, 22, 324, 8); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(70,35,10,0.45)'; c.lineWidth = 1.5; for (let yy = y - 290; yy < y - 110; yy += 46) { c.beginPath(); c.moveTo(px - 5, yy); c.quadraticCurveTo(px, yy + 7, px + 5, yy + 2); c.stroke(); }
    }
    // прилавок: доски с бликом, филёнки, тень на земле
    c.fillStyle = 'rgba(30,20,10,0.3)'; c.beginPath(); c.ellipse(x + 125, y + 2, 150, 9, 0, 0, 7); c.fill();
    const cg = c.createLinearGradient(0, y - 96, 0, y); cg.addColorStop(0, '#e2a565'); cg.addColorStop(1, '#a8682f');
    c.fillStyle = cg; c.strokeStyle = '#4e2c10'; c.lineWidth = 3.5; rr(c, x - 10, y - 88, 270, 88, 10); c.fill(); c.stroke();
    for (let i = 0; i < 5; i++) {
      const pg = c.createLinearGradient(0, y - 78, 0, y - 10); pg.addColorStop(0, '#b97a3d'); pg.addColorStop(1, '#8e5424');
      c.fillStyle = pg; c.strokeStyle = 'rgba(60,30,10,0.6)'; c.lineWidth = 2; rr(c, x + 2 + i * 51, y - 76, 43, 64, 7); c.fill(); c.stroke();
      c.fillStyle = 'rgba(255,235,200,0.3)'; rr(c, x + 6 + i * 51, y - 72, 35, 4, 2); c.fill();
    }
    // столешница
    const tg = c.createLinearGradient(0, y - 97, 0, y - 82); tg.addColorStop(0, '#f6c584'); tg.addColorStop(1, '#b8743a');
    c.fillStyle = tg; c.strokeStyle = '#4e2c10'; c.lineWidth = 3.5; rr(c, x - 18, y - 97, 286, 15, 7); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,250,230,0.55)'; rr(c, x - 10, y - 94, 270, 3, 1.5); c.fill();
    // горшок с цветами на краю прилавка
    const fx0 = x + 30, fy0 = y - 97;
    c.fillStyle = '#d9480f'; c.strokeStyle = '#7a2a05'; c.lineWidth = 2.5; c.beginPath(); c.moveTo(fx0 - 16, fy0 - 30); c.lineTo(fx0 + 16, fy0 - 30); c.lineTo(fx0 + 11, fy0); c.lineTo(fx0 - 11, fy0); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#ff8a5b'; rr(c, fx0 - 18, fy0 - 34, 36, 7, 3); c.fill(); c.stroke();
    c.strokeStyle = '#3f8f2a'; c.lineWidth = 3; for (const [dx, h] of [[-8, 26], [0, 34], [8, 24]]) { c.beginPath(); c.moveTo(fx0 + dx * 0.5, fy0 - 32); c.lineTo(fx0 + dx, fy0 - 32 - h); c.stroke(); }
    flower(c, fx0 - 8, fy0 - 58, '#ff8fab', 6); flower(c, fx0, fy0 - 66, '#ffffff', 6); flower(c, fx0 + 8, fy0 - 56, '#d0bfff', 6);
    // навес
    const aw = 300, ax = x - 26, ay = y - 336;
    for (let i = 0; i < 8; i++) { c.fillStyle = i % 2 ? '#fff4e6' : '#ff6b6b'; c.beginPath(); c.moveTo(ax + i * aw / 8, ay); c.lineTo(ax + (i + 1) * aw / 8, ay); c.lineTo(ax + (i + 1) * aw / 8, ay + 50); c.arc(ax + (i + 0.5) * aw / 8, ay + 50, aw / 16, 0, Math.PI); c.closePath(); c.fill(); }
    c.fillStyle = 'rgba(255,255,255,0.25)'; c.fillRect(ax, ay, aw, 10);
    // вывеска
    woodPanel(c, x + 35, ay - 46, 180, 50, 14, 31);
    txt(c, 'Пекарня', x + 125, ay - 20, { size: 30, fill: '#fff8e6', stroke: '#5b3313', sw: 7 });
    c.restore();
  },
};

// ---------- Уровень 4: Башня в грозу ----------
const L4 = {
  rngId: 3,
  build(S) {
    const L = new Level(27, 46, 'eve'); S.L = L; L.night = 0.6; L.storm = 0.45; L.water = false;
    const rng = S.rng;
    const ex = [];
    const ops = ['+', '−', '+', '−', '+'];
    for (const op of ops) {
      let a, b, r, key;
      do {
        if (op === '+') { a = rint(rng, 1, 8); b = rint(rng, 1, 9 - a + 1); if (a + b > 10) b = 10 - a; r = a + b; }
        else { a = rint(rng, 3, 10); b = rint(rng, 1, a - 1); r = a - b; }
        key = a + op + b;
      } while (ex.some(e => e.key === key) || b < 1);
      ex.push({ a, b, op, r, key });
    }
    S.math = { ex };
    L.ground(0, 27, 44);
    S.rows = [44, 38, 32, 26, 20]; S.topRow = 14;
    S.ledges = [];
    S.rows.forEach((r, i) => {
      const left = i % 2 === 0;
      if (i > 0) { if (left) L.stone(3, 12, r, r + 1); else L.stone(14, 23, r, r + 1); }
      S.ledges.push({ row: r, left, x0: left ? (i === 0 ? 0 : 3) : 14, x1: left ? 12 : 23, cols: left ? [6, 8, 10] : [15, 17, 19], dedCol: left ? (i === 0 ? 3 : 4) : 21.5, started: false });
    });
    L.stone(14, 23, S.topRow, S.topRow + 1);
    L.spawn = { x: tc(1), y: tx(44) };
    S.ded = L.add(new NPC('ded', tc(3), tx(44), 1));
    S.steps = [];
    S.windows = S.rows.map((r, i) => ({ x: tc(13) - 32, y: tx(r) - 230, lit: false, flare: 0 }));
    S.bigLamp = L.add(new Lantern(tc(18), tx(S.topRow), false, 230)); S.bigLamp.z = -1;
    S.solved = 0;
    // секрет: стог у стены подбрасывает на каменный столб с золотым фонарём
    L.stone(25, 27, 40, 44);
    S.bouncers.push(L.add(new Bouncer(1522, tx(44), 'hay')));
    S.gold = L.add(new GoldLantern(tx(25) + 52, tx(40)));
    ffAt(S, [[tc(15), 2756], [tc(17), 2756], [tc(19), 2756], [tc(21), 2756]]);
    ffAt(S, [[1524, 2634], [1530, 2544], [1570, 2464]]);
    ffAt(S, [[712, tx(32) - 70], [712, tx(20) - 70], [tc(15), tx(14) - 70]]);
    return L;
  },
  start(S) {
    S.hud = { icon: 'windows5', text: '0 из 5' };
    S.lightT = 4;
    run((function* () { yield 0.6; say(S.ded, VL.l5Start(), 5.5); })());
  },
  update(S, dt) {
    const p = S.p, L = S.L;
    // молнии — мягкие вспышки
    S.lightT -= dt;
    if (S.lightT <= 0 && L.storm > 0.2) { S.flash = 1; Sound.thunder(); S.lightT = frand(5, 9); }
    for (const w of S.windows) w.flare = Math.max(0, w.flare - dt);
    Sound.setMode(L.storm > 0.2 ? 'storm' : 'eve');
    // если во время вопроса Искра ушла с уступа — камера идёт за ней, а вернётся — снова покажет вопрос целиком
    const cur = S.ledges[S.solved];
    if (S.q && !S.q.solved && cur) {
      const near = Math.abs(p.y - tx(cur.row)) < 150 && p.x > tx(cur.x0) - 64 && p.x < tx(cur.x1) + 64;
      if (!near && S.cam.lock) { S.lockAway = S.cam.lock; S.cam.lock = null; }
      else if (near && !S.cam.lock && S.lockAway) { S.cam.lock = S.lockAway; S.lockAway = null; }
    }
    S.ledges.forEach((ld, i) => {
      if (!ld.started && i === S.solved && p.onGround && Math.abs(p.y - tx(ld.row)) < 2 && p.x > tx(ld.x0) && p.x < tx(ld.x1)) {
        ld.started = true; S.respawnPt = { x: p.x, y: tx(ld.row) };
        run(L4.stationScript(S, i));
      }
    });
    if (S.solved >= 5 && !S.bigLamp.lit && overlap(p, S.bigLamp.x - 50, S.bigLamp.y - 230, 100, 230)) {
      S.bigLamp.setLit(true); Sound.fanfare(); sparkBurst(S.bigLamp.x, S.bigLamp.y - 170, 40, '#fff1a8', 420); G.shake = 0.3;
      run((function* () {
        G.freeze = true;
        S.cam.lock = { x: tc(13) - 32 + 120, y: tx(S.topRow - 2) - 60 };
        // Искра отходит на шаг от большого фонаря, чтобы её было видно целиком
        const tx0 = S.bigLamp.x - 84; p.face = -1;
        for (let t = 0; t < 0.5 && Math.abs(p.x - tx0) > 2; t += 1 / 60) { p.x += Math.sign(tx0 - p.x) * Math.min(Math.abs(tx0 - p.x), 4); p.anim += 0.25; yield 1 / 60; }
        p.face = 1;
        for (let t = 0; t < 2.5; t += 1 / 60) { L.storm = Math.max(0, 0.95 * (1 - t / 2.5)); L.night = 0.6 * (1 - t / 2.5); yield 1 / 60; }
        L.storm = 0; L.night = 0;
        yield 0.8;
        saveProgress(LEVELS.indexOf(L4) + 1);
        goScene(() => new FinaleScene());
      })());
    }
    S.hud.text = S.windows.filter(w => w.lit).length + ' из 5';
  },
  stationScript(S, i) {
    return (function* () {
      const ld = S.ledges[i], e = S.math.ex[i], L = S.L;
      if (i > 0) { puff(S.ded.x, S.ded.y - 60, 10); S.ded.alpha = 0; yield 0.25; S.ded.x = tc(Math.floor(ld.dedCol)) + (ld.dedCol % 1) * TILE; S.ded.y = tx(ld.row); S.ded.face = ld.left ? 1 : -1; S.ded.alpha = 1; puff(S.ded.x, S.ded.y - 60, 10); Sound.pop(); }
      L.storm = 0.45 + i * 0.12;
      yield 0.4;
      const text = `${e.a} ${e.op} ${e.b} = ?`;
      // камера держит уступ внизу кадра — рама с блоками целиком видна под доской с вопросом
      // уступ у нижнего края кадра: окно этого этажа целиком видно, нижнее (уже горящее) окно — целиком за кадром,
      // а все горящие окна показаны в табличке «N из 5»
      S.cam.lock = { x: ld.left ? (i === 0 ? 540 : 620) : 1000, y: tx(ld.row) - viewH() * 0.35 };
      S.ask({
        text, answer: e.r, choices: makeChoices(S.rng, e.r), row: ld.row - 4, cols: ld.cols, speaker: S.ded,
        say: VL.l5Q(e.a, e.op, e.b), eqDone: `${e.a} ${e.op} ${e.b} = ${e.r}`,
        hints: e.op === '+' ? [VL.addMore(e.a, e.b), VL.l5HPlus2(e.a, e.b)] : [VL.l5HMinus1(e.a, e.b), VL.l5HMinus2(e.a, e.b)],
        demo: function* () { yield* starDemo(S, e); },
        onCorrect: function* () {
          const w = S.windows[i]; w.lit = true; w.flare = 1; S.hud.text = S.windows.filter(x => x.lit).length + ' из 5'; Sound.light(5 + i);
          sparkBurst(w.x - S.cam.x + S.cam.x, w.y, 20, '#fff1a8', 300);
          say(S.ded, VL.l5Ok(i), 3);
          S.solved = i + 1;
          check(S.windows.filter(x => x.lit).length === S.solved, 'горящих окон столько же, сколько решено примеров');
          yield 0.4;
          const r = ld.row;
          if (i === 2) {
            // подъёмник: корзина на верёвках опускается с блока на кронштейне маяка
            const lift = S.L.add(new Lift(tc(13) - 32, tx(S.rows[3]), tx(r), tx(S.rows[3]) - 132, S));
            S.L.movers.push(lift); S.L.add(new LiftFront(lift)); S.lift = lift; Sound.liftCreak();
            yield vwait(1.4);
            say(S.ded, VL.l5Lift(), 3);
            yield 0.4;
          } else {
            // выдвигаем ступеньки из башни
            const stA = ld.left ? { row: r - 2, c0: 12, c1: 15 } : { row: r - 2, c0: 11, c1: 14 }; // первая ступенька шире (3 клетки) — есть куда приземлиться
            // вторая ступенька — по центру башни, вплотную к следующему уступу: прыжок только вверх, без зазора
            const stB = { row: r - 4, c0: 12, c1: 14 };
            for (const st of [stA, stB]) { S.L.add(new Step(st.c0, st.c1, st.row, S)); Sound.whoosh(); yield 0.6; }
          }
          S.cam.lock = null; S.lockAway = null;
        },
      });
    })();
  },
  windowRect(w) { return { x: w.x - 48, y: w.y - 58, w: 96, h: 118 }; },
  counted(S) {
    if (!asking(S) || !S.cam.lock) return null;
    const items = (S.hudIcons || []).map((r, i) => ({ kind: 'окошко ' + (i + 1) + ' в табличке', group: 'hud', screen: true, hud: true, lit: r.lit, r, skip: ['табличка HUD'] }));
    // окна на башне: если окно попало в кадр, то только целиком
    const VW = viewW(), VH = viewH();
    S.windows.forEach((w, i) => {
      const r = L4.windowRect(w);
      if (r.x + r.w > S.cam.x && r.x < S.cam.x + VW && r.y + r.h > S.cam.y && r.y < S.cam.y + VH) items.push({ kind: 'окно башни ' + (i + 1), group: 'tower', idx: i, lit: w.lit, r });
    });
    return items;
  },
  countRule(S, ok, all) {
    const tower = all.filter(o => o.group === 'tower');
    return [
      { name: 'горящих окошек в табличке', visible: cnt(ok, o => o.group === 'hud' && o.lit), expected: S.solved },
      { name: 'окошек в табличке', visible: cnt(ok, o => o.group === 'hud'), expected: 5 },
      { name: 'окон башни в кадре (целиком)', visible: cnt(ok, o => o.group === 'tower'), expected: tower.length },
      { name: 'горящих окон башни в кадре', visible: cnt(ok, o => o.group === 'tower' && o.lit), expected: tower.filter(o => o.idx < S.solved).length },
    ];
  },
  selfCheck(S) {
    check(S.hud.text === S.windows.filter(w => w.lit).length + ' из 5', 'табличка = горящим окнам');
    if (S.q && S.board && !S.board.solved) { const e = S.math.ex[S.solved]; check(S.board.text === `${e.a} ${e.op} ${e.b} = ?`, 'на доске текущий пример'); }
  },
  drawBack(S, c) {
    // маяк: чуть сужается кверху, полосатый, объёмный
    const cx = tc(13) - 32, top = tx(12), bot = tx(44);
    const wb = 230, wt = 180;
    c.save();
    const paintBody = (c) => {
      const body = () => { c.beginPath(); c.moveTo(cx - wb, bot); c.lineTo(cx - wt, top); c.lineTo(cx + wt, top); c.lineTo(cx + wb, bot); c.closePath(); };
      c.fillStyle = 'rgba(20,10,40,0.3)'; c.save(); c.translate(18, 0); body(); c.fill(); c.restore();
      body(); c.fillStyle = '#4d4038'; c.fill();
      c.save(); c.translate(0, 0); c.beginPath(); c.moveTo(cx - wb + 6, bot); c.lineTo(cx - wt + 6, top + 6); c.lineTo(cx + wt - 6, top + 6); c.lineTo(cx + wb - 6, bot); c.closePath(); c.clip();
      c.save(); c.scale(0.4, 0.4); c.fillStyle = PAT.stone || (PAT.stone = c.createPattern(IMG.tex_stone, 'repeat')); c.fillRect((cx - wb) / 0.4, top / 0.4, wb * 2 / 0.4, (bot - top) / 0.4); c.restore();
      // красные полосы
      c.globalCompositeOperation = 'multiply';
      for (let y = top + 180; y < bot; y += 760) { c.fillStyle = '#ff7a6a'; c.fillRect(cx - wb, y, wb * 2, 300); }
      c.globalCompositeOperation = 'source-over';
      const g = c.createLinearGradient(cx - wb, 0, cx + wb, 0);
      g.addColorStop(0, 'rgba(30,10,60,0.55)'); g.addColorStop(0.18, 'rgba(255,240,220,0.18)'); g.addColorStop(0.35, 'rgba(255,255,255,0.05)'); g.addColorStop(0.75, 'rgba(30,10,60,0.35)'); g.addColorStop(1, 'rgba(20,5,40,0.7)');
      c.fillStyle = g; c.fillRect(cx - wb, top, wb * 2, bot - top);
      c.fillStyle = 'rgba(40,20,90,0.22)'; c.fillRect(cx - wb, top, wb * 2, bot - top);
      c.restore();
    };
    // корпус маяка статичен: рисуем один раз в плитки (узор + полосы + градиенты каждый кадр стоили ~10 FPS на телефоне)
    const PR = S.L.PR || 2; // тот же масштаб, что у рельефа (не меняется при наезде камеры)
    if (!S.towerTiles || S.towerTiles.pr !== PR) {
      const bx = cx - wb - 4, bw = wb * 2 + 26, CH = 512, tiles = [];
      for (let ty = top - 4; ty < bot; ty += CH) {
        const th = Math.min(CH, bot - ty), cv = document.createElement('canvas');
        cv.width = Math.ceil(bw * PR); cv.height = Math.ceil(th * PR);
        const g = cv.getContext('2d'); g.scale(PR, PR); g.translate(-bx, -ty); paintBody(g);
        tiles.push({ x: bx, y: ty, w: bw, h: th, cv });
      }
      S.towerTiles = { pr: PR, tiles };
    }
    const cam = S.cam, vy0 = cam.y - 40, vy1 = cam.y + viewH() + 40;
    for (const t of S.towerTiles.tiles) if (t.y + t.h >= vy0 && t.y <= vy1) c.drawImage(t.cv, t.x, t.y, t.w, t.h);
    // окна
    S.windows.forEach((w) => {
      const wx = cx, wy = w.y;
      if (w.lit) glow(c, wx, wy, 120 + w.flare * 90, 'rgba(255,210,90,0.85)', 0.95);
      c.fillStyle = '#3b3029'; rr(c, wx - 40, wy - 58, 80, 110, [40, 40, 10, 10]); c.fill();
      const gg = c.createLinearGradient(0, wy - 50, 0, wy + 44);
      if (w.lit) { gg.addColorStop(0, '#fff7c2'); gg.addColorStop(1, '#ffb22e'); } else { gg.addColorStop(0, '#4a4f86'); gg.addColorStop(1, '#262a52'); }
      c.fillStyle = gg; rr(c, wx - 31, wy - 49, 62, 92, [31, 31, 6, 6]); c.fill();
      c.fillStyle = 'rgba(255,255,255,0.25)'; rr(c, wx - 24, wy - 42, 14, 30, 7); c.fill();
      c.strokeStyle = '#3b3029'; c.lineWidth = 6; c.beginPath(); c.moveTo(wx, wy - 49); c.lineTo(wx, wy + 43); c.moveTo(wx - 31, wy - 4); c.lineTo(wx + 31, wy - 4); c.stroke();
      c.fillStyle = '#8c7a6a'; rr(c, wx - 48, wy + 46, 96, 14, 6); c.fill();
    });
    // верх: галерея, фонарная комната, купол
    c.fillStyle = '#3b3029'; rr(c, cx - wt - 40, top - 22, wt * 2 + 80, 30, 12); c.fill();
    c.fillStyle = '#8c7a6a'; rr(c, cx - wt - 34, top - 18, wt * 2 + 68, 18, 9); c.fill();
    c.lineCap = 'round';
    for (const [w, col] of [[9, '#3b3029'], [4, '#c9a46a']]) {
      c.strokeStyle = col; c.lineWidth = w;
      c.beginPath(); c.moveTo(cx - wt - 30, top - 70); c.lineTo(cx + wt + 30, top - 70); c.stroke();
      for (let x = cx - wt - 26; x <= cx + wt + 30; x += 34) { c.beginPath(); c.moveTo(x, top - 68); c.lineTo(x, top - 22); c.stroke(); }
    }
    const lw = 118, rt = top - 224, rb = top - 70, rh = rb - rt;
    const lit = S.bigLamp.lit;
    if (lit) {
      // вращающиеся лучи маяка
      const a0 = G.t * 0.9;
      c.save(); c.globalCompositeOperation = 'lighter';
      for (const dir of [0, Math.PI]) {
        const a = a0 + dir, len = 1400;
        const gr = c.createRadialGradient(cx, rt + rh / 2, 20, cx, rt + rh / 2, len);
        gr.addColorStop(0, 'rgba(255,236,160,0.55)'); gr.addColorStop(1, 'rgba(255,236,160,0)');
        c.fillStyle = gr; c.beginPath(); c.moveTo(cx, rt + rh / 2);
        c.arc(cx, rt + rh / 2, len, a - 0.16, a + 0.16); c.closePath(); c.fill();
      }
      c.restore();
      glow(c, cx, rt + rh / 2, 340, 'rgba(255,220,120,0.9)', 1);
    }
    // стекло
    const gl = c.createLinearGradient(0, rt, 0, rb);
    if (lit) { gl.addColorStop(0, '#fffbe0'); gl.addColorStop(0.5, '#ffe58a'); gl.addColorStop(1, '#ffb43b'); }
    else { gl.addColorStop(0, '#5b66b8'); gl.addColorStop(1, '#262b5c'); }
    c.fillStyle = gl; rr(c, cx - lw, rt, lw * 2, rh, 18); c.fill();
    if (lit) { const rg = c.createRadialGradient(cx, rt + rh / 2, 4, cx, rt + rh / 2, 70); rg.addColorStop(0, '#ffffff'); rg.addColorStop(0.4, 'rgba(255,250,210,0.95)'); rg.addColorStop(1, 'rgba(255,230,140,0)'); c.fillStyle = rg; c.beginPath(); c.arc(cx, rt + rh / 2, 70, 0, 7); c.fill(); }
    else { c.fillStyle = '#3a3f78'; c.beginPath(); c.arc(cx, rt + rh / 2 + 6, 30, 0, 7); c.fill(); }
    // блики на стекле
    c.save(); rr(c, cx - lw, rt, lw * 2, rh, 18); c.clip();
    c.fillStyle = 'rgba(255,255,255,0.28)';
    for (const ox of [-lw + 20, -lw / 2 + 30]) { c.beginPath(); c.moveTo(cx + ox, rb); c.lineTo(cx + ox + 26, rb); c.lineTo(cx + ox + 86, rt); c.lineTo(cx + ox + 60, rt); c.closePath(); c.fill(); }
    c.restore();
    // латунные рамы
    const brass = c.createLinearGradient(cx - lw, 0, cx + lw, 0);
    brass.addColorStop(0, '#7a5214'); brass.addColorStop(0.3, '#f2c94c'); brass.addColorStop(0.55, '#fff0a8'); brass.addColorStop(1, '#8a5c16');
    c.strokeStyle = '#4a3010'; c.lineWidth = 12; rr(c, cx - lw, rt, lw * 2, rh, 18); c.stroke();
    c.strokeStyle = brass; c.lineWidth = 7; rr(c, cx - lw, rt, lw * 2, rh, 18); c.stroke();
    for (const x of [cx - lw / 3 - 6, cx + lw / 3 + 6]) { c.fillStyle = '#4a3010'; rr(c, x - 6, rt, 12, rh, 5); c.fill(); c.fillStyle = brass; rr(c, x - 3, rt + 2, 6, rh - 4, 3); c.fill(); }
    // купол
    const dome = c.createLinearGradient(cx - lw, 0, cx + lw, 0);
    dome.addColorStop(0, '#a3241c'); dome.addColorStop(0.35, '#ff6b5b'); dome.addColorStop(0.6, '#e8433a'); dome.addColorStop(1, '#8f1f18');
    c.fillStyle = dome; c.strokeStyle = '#5a1410'; c.lineWidth = 6;
    c.beginPath(); c.moveTo(cx - lw - 30, rt + 8); c.bezierCurveTo(cx - lw - 10, rt - 110, cx + lw + 10, rt - 110, cx + lw + 30, rt + 8); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.38)'; c.beginPath(); c.ellipse(cx - 44, rt - 46, 34, 14, -0.35, 0, 7); c.fill();
    c.fillStyle = brass; c.strokeStyle = '#4a3010'; c.lineWidth = 4; rr(c, cx - lw - 34, rt - 2, (lw + 34) * 2, 16, 8); c.fill(); c.stroke();
    c.fillStyle = '#4a3010'; c.fillRect(cx - 4, rt - 112, 8, 30);
    const ball = c.createRadialGradient(cx - 6, rt - 124, 2, cx, rt - 118, 18); ball.addColorStop(0, '#fffbe0'); ball.addColorStop(0.5, '#ffd43b'); ball.addColorStop(1, '#a86b00');
    c.fillStyle = ball; c.beginPath(); c.arc(cx, rt - 118, 16, 0, 7); c.fill(); c.strokeStyle = '#4a3010'; c.lineWidth = 3; c.stroke();
    c.restore();
    // каменные кронштейны-арки: каждый уступ вырастает из стены маяка на изогнутой каменной консоли
    const edgeAt = (yy, side) => cx + side * (wb + (wt - wb) * (bot - yy) / (bot - top));
    const ledgeList = S.ledges.filter((l, i) => i > 0).map(l => ({ x0: l.x0, x1: l.x1, row: l.row, left: l.left })).concat([{ x0: 14, x1: 23, row: S.topRow, left: false }]);
    S.struts = [];
    if (!PAT.stone) PAT.stone = c.createPattern(IMG.tex_stone, 'repeat');
    for (const l of ledgeList) {
      const side = l.left ? -1 : 1, yb = tx(l.row + 1) - 2;
      const xo = l.left ? tx(l.x0) + 34 : tx(l.x1) - 34;
      const span0 = Math.abs(edgeAt(yb, side) - xo), depth = Math.min(210, span0 * 0.5);
      const wall = edgeAt(yb + depth, side) - side * 10, rx = Math.abs(wall - xo), ry = depth;
      const path = () => {
        c.beginPath(); c.moveTo(xo, yb); c.lineTo(edgeAt(yb, side) - side * 10, yb); c.lineTo(wall, yb + depth);
        if (l.left) c.ellipse(xo, yb + depth, rx, ry, 0, 0, -Math.PI / 2, true); else c.ellipse(xo, yb + depth, rx, ry, 0, Math.PI, -Math.PI / 2, false);
        c.closePath();
      };
      c.save(); c.fillStyle = 'rgba(20,10,40,0.3)'; c.translate(8, 8); path(); c.fill(); c.restore();
      c.save(); path(); c.clip();
      c.save(); c.scale(0.36, 0.36); c.fillStyle = PAT.stone; c.fillRect(Math.min(xo, wall) / 0.36 - 8, yb / 0.36 - 8, (rx + 20) / 0.36, (depth + 20) / 0.36); c.restore();
      const gg = c.createLinearGradient(0, yb, 0, yb + depth); gg.addColorStop(0, 'rgba(30,20,40,0.32)'); gg.addColorStop(1, 'rgba(60,40,90,0.12)');
      c.fillStyle = gg; c.fillRect(Math.min(xo, wall) - 4, yb, rx + 30, depth + 4);
      c.restore();
      c.strokeStyle = '#3f3a33'; c.lineWidth = 3.5; path(); c.stroke();
      // клинчатые камни вдоль свода
      c.strokeStyle = 'rgba(50,40,35,0.8)'; c.lineWidth = 2.5;
      for (let k = 1; k < 8; k++) {
        const an = -Math.PI / 2 + (l.left ? 1 : -1) * (Math.PI / 2) * k / 8;
        const ax = xo + Math.cos(an) * rx * (l.left ? 1 : 1), ay = yb + depth + Math.sin(an) * ry;
        const bx2 = xo + Math.cos(an) * (rx + 20), by2 = yb + depth + Math.sin(an) * (ry + 20);
        c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx2, Math.max(yb + 2, by2)); c.stroke();
      }
      c.strokeStyle = 'rgba(255,245,230,0.35)'; c.lineWidth = 2;
      c.beginPath(); if (l.left) c.ellipse(xo, yb + depth, rx - 3, ry - 3, 0, -0.08, -Math.PI / 2 + 0.1, true); else c.ellipse(xo, yb + depth, rx - 3, ry - 3, 0, Math.PI + 0.08, -Math.PI / 2 - 0.1, false); c.stroke();
      S.struts.push({ x: xo, y: tx(l.row + 1), wx: wall, wy: yb + depth, kind: 'arch' });
    }
    // перила балкона у большого фонаря
    for (let x = 14; x < 23; x += 2) c.drawImage(IMG.t_fence, tx(x), tx(S.topRow) - 66, 128, 128 * IMG.t_fence.height / IMG.t_fence.width);
  },
};
class Step extends Ent {
  constructor(c0, c1, row, S) { super(tc(13), row * TILE); this.c0 = c0; this.c1 = c1; this.row = row; this.t = 0; this.S = S; this.z = -1; this.set = false; }
  update(dt) {
    this.t = Math.min(1, this.t + dt * 2);
    if (this.t >= 1 && !this.set) { this.set = true; for (let x = this.c0; x < this.c1; x++) this.level.set(x, this.row, T_ONEWAY_DYN); /* сквозь ступеньку можно запрыгнуть снизу — голова не стукается */ dust(tx(this.c0) + 64, tx(this.row), 6); Sound.bump(); }
  }
  draw(c) {
    const k = easeOutBack(this.t);
    const X = lerp(tc(13) - (this.c1 - this.c0) * 32, tx(this.c0), k), Y = tx(this.row), w = (this.c1 - this.c0) * TILE;
    c.save(); c.globalAlpha = Math.min(1, this.t * 2);
    c.fillStyle = '#5c5446'; rr(c, X - 4, Y - 4, w + 8, TILE * 0.62 + 8, 14); c.fill();
    rr(c, X, Y, w, TILE * 0.62, 11); c.save(); c.clip();
    c.save(); c.scale(0.5, 0.5); c.fillStyle = PAT.stone || (PAT.stone = c.createPattern(IMG.tex_stone, 'repeat')); c.fillRect(X * 2, Y * 2, w * 2, TILE * 2); c.restore();
    c.fillStyle = 'rgba(255,255,240,0.35)'; c.fillRect(X, Y, w, 6);
    c.restore();
    // каменные консоли под ступенькой — она выступает из стены, а не висит
    if (this.t > 0.6) {
      const ca = Math.min(1, (this.t - 0.6) / 0.4);
      c.save(); c.globalAlpha *= ca;
      c.fillStyle = 'rgba(20,10,40,0.3)'; rr(c, X + 6, Y + TILE * 0.62, w - 12, 10, 5); c.fill();
      for (const cx0 of [X + 18, X + w - 18]) {
        const g = c.createLinearGradient(0, Y + 36, 0, Y + 70); g.addColorStop(0, '#b8ad98'); g.addColorStop(1, '#6f675a');
        c.fillStyle = g; c.strokeStyle = '#3f3a33'; c.lineWidth = 2.5;
        c.beginPath(); c.moveTo(cx0 - 14, Y + 38); c.lineTo(cx0 + 14, Y + 38); c.quadraticCurveTo(cx0 + 12, Y + 58, cx0, Y + 70); c.quadraticCurveTo(cx0 - 12, Y + 58, cx0 - 14, Y + 38); c.closePath(); c.fill(); c.stroke();
      }
      c.restore();
    }
    glow(c, X + w / 2, Y + 10, 60, 'rgba(255,220,120,0.5)', (1 - this.t) * 0.9);
    c.restore();
  }
}
// показ на звёздочках для примеров уровня 4
function drawBeam(c, x0, y0, x1, y1) {
  const len = Math.hypot(x1 - x0, y1 - y0), a = Math.atan2(y1 - y0, x1 - x0), w = 18;
  c.save(); c.translate(x0, y0); c.rotate(a);
  const g = c.createLinearGradient(0, -w / 2, 0, w / 2);
  g.addColorStop(0, '#c98a4b'); g.addColorStop(0.5, '#9a6130'); g.addColorStop(1, '#5a3412');
  c.fillStyle = g; c.strokeStyle = '#3e2410'; c.lineWidth = 3; rr(c, 0, -w / 2, len, w, 6); c.fill(); c.stroke();
  c.fillStyle = '#3e2410'; for (const t of [10, len - 10]) { c.beginPath(); c.arc(t, 0, 3, 0, 7); c.fill(); }
  c.restore();
}
function* starDemo(S, e) {
  const d = { e, t: 0, stars: [], phase: 'a' };
  S.demo = d;
  for (const o of G.bubbles) o.t = Math.max(o.t, o.dur - 0.25); // панель не прячет пузыри
  yield 0.6;
  if (e.op === '+') {
    for (let i = 0; i < e.a; i++) { d.stars.push({ col: 'gold', t: 0, gone: false }); Sound.pop(); yield 0.25; }
    yield 0.4; d.phase = 'b';
    for (let i = 0; i < e.b; i++) { d.stars.push({ col: 'blue', t: 0, gone: false }); Sound.pop(); yield 0.25; }
  } else {
    for (let i = 0; i < e.a; i++) { d.stars.push({ col: 'gold', t: 0, gone: false }); Sound.pop(); yield 0.22; }
    yield 0.5; d.phase = 'b';
    for (let i = 0; i < e.b; i++) { const s = d.stars[e.a - 1 - i]; s.gone = true; Sound.puff(); yield 0.35; }
  }
  check(d.stars.length === e.a + (e.op === '+' ? e.b : 0), 'звёздочек показано по числам примера');
  yield 0.5; d.phase = 'count';
  let k = 0;
  for (const s of d.stars) { if (s.gone) continue; k++; s.label = k; Sound.count(k); yield 0.5; }
  check(k === e.r, `показ сосчитал ${k} = ответ ${e.r}`);
  d.phase = 'done';
  yield 1.8;
  S.demo = null;
  say(S.ded, VL.tryYou(), 3);
  yield 0.8;
}
function drawStarDemo(c, S) {
  const d = S.demo; if (!d) { G.panelRect = null; return; }
  d.t += 1 / 60;
  const n = d.stars.length, sw = 58, ss = 50;
  const w = Math.max(500, n * sw + 70), h = 196, y = 116;
  // панель встаёт туда, где не закрывает окна башни и окошки таблички
  const avoid = S.countedScreen ? S.countedScreen() : [];
  let x = G.W / 2 - w / 2, best = 1e18;
  for (const cx of [G.W / 2 - w / 2, 24, G.W - w - 24, G.W * 0.3 - w / 2, G.W * 0.7 - w / 2]) {
    const xx = clamp(cx, 24, G.W - w - 24); let sc = Math.abs(xx - (G.W / 2 - w / 2)) * 0.01;
    for (const r of avoid) sc += Math.max(0, Math.min(xx + w + 10, r.x + r.w) - Math.max(xx - 10, r.x)) * Math.max(0, Math.min(y + h + 10, r.y + r.h) - Math.max(y - 10, r.y));
    if (sc < best) { best = sc; x = xx; }
  }
  G.panelRect = { x, y, w, h: h + 8 };
  const mid = x + w / 2;
  c.save();
  c.fillStyle = 'rgba(40,25,10,0.3)'; rr(c, x + 4, y + 8, w, h, 28); c.fill();
  c.fillStyle = '#fffaf0'; c.strokeStyle = '#3b2412'; c.lineWidth = 5; rr(c, x, y, w, h, 28); c.fill(); c.stroke();
  // заголовок: сам пример, а в конце — ответ, равный числу сосчитанных звёздочек
  const e = d.e, kk = d.stars.filter(st => !st.gone && st.label).length;
  const head = 'Считаем звёздочки:  ' + e.a + ' ' + (e.op === '+' ? '+' : '−') + ' ' + e.b + (d.phase === 'done' ? ' = ' + kk : '');
  txt(c, head, mid, y + 32, { size: 28, fill: '#5b3313' });
  d.stars.forEach((s, i) => {
    s.t = Math.min(1, s.t + 1 / 60 / 0.25);
    const k = easeOutBack(s.t);
    const sx = mid - (n - 1) * sw / 2 + i * sw, sy = y + 96;
    c.save(); c.translate(sx, sy);
    if (s.gone) { s.go = Math.min(1, (s.go || 0) + 1 / 60 / 0.35); c.globalAlpha = 1 - s.go * 0.78; c.translate(0, -s.go * 10); }
    c.scale(k, k);
    const sim = s.col === 'blue' ? filteredImg(IMG.t_star, 'hue-rotate(170deg) saturate(1.3)') : s.gone ? filteredImg(IMG.t_star, 'grayscale(1)') : IMG.t_star;
    c.drawImage(sim, -ss / 2, -ss / 2, ss, ss);
    if (s.gone && s.go >= 0.5) { c.globalAlpha = 1; c.strokeStyle = '#e03131'; c.lineWidth = 5; c.lineCap = 'round'; c.beginPath(); c.moveTo(-17, -17); c.lineTo(17, 17); c.moveTo(17, -17); c.lineTo(-17, 17); c.stroke(); }
    c.restore();
    if (s.label) txt(c, String(s.label), sx, y + 158, { size: 30, fill: '#e8590c', stroke: '#fff', sw: 6 });
  });
  c.restore();
}
const LEVELS = [L1, L2, L3, L4];
