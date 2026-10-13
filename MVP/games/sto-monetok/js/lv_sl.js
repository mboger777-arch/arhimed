'use strict';
// ===== Уровни «Сто монеток»: станции «посмотри → посчитай → ударь блок с ответом → вырастает мост» =====
// Все числа — из TASKS (lines.js). Каждая сумма/разность, каждая группа предметов и каждая надпись проверяются check().
const ST_X = [8, 52, 96], ST_GAP = [30, 36];   // станции; яма за станцией: колонки X0+30 … X0+36
function slMath(n, i) {
  const [a, b] = TASKS[n][i];
  if (n === 5) return { a, b, r: 100, board: `${a} + ? = 100`, done: `${a} + ${b} = 100`, ans: b };
  if (n === 4) return { a, b, r: a - b, board: `${a} − ${b} = ?`, done: `${a} − ${b} = ${a - b}`, ans: a - b };
  return { a, b, r: a + b, board: `${a} + ${b} = ?`, done: `${a} + ${b} = ${a + b}`, ans: a + b };
}
// кадр, в который целиком входит прямоугольник мира (и по ширине, и по высоте)
function lockBox(x0, x1, y0, y1) {
  const Z = Math.min(G.baseZoom, (G.W - 48) / (x1 - x0), (G.H - 40) / (y1 - y0));
  return { x: (x0 + x1) / 2, y: (y0 + y1) / 2, zoom: Z, make: () => lockBox(x0, x1, y0, y1) };
}
function makeSL(n, cfg) {
  const D = {
    idx: n - 1, rngId: n,
    build(S) {
      const L = new Level(176, 12, cfg.bg); S.L = L; L.song = cfg.song; if (cfg.tint) L.tint = cfg.tint; if (cfg.style) L.style = cfg.style;
      if (cfg.bg === 'cave') { L.water = false; L.terrainTint = 'rgba(70,40,130,0.42)'; }
      if (cfg.night) L.night = cfg.night; if (cfg.island) L.bgImg = 'island';
      L.ground(0, ST_X[0] + ST_GAP[0], 10);
      for (let i = 0; i < 3; i++) { const e = ST_X[i] + ST_GAP[1], to = i < 2 ? ST_X[i + 1] + ST_GAP[0] : 176; L.ground(e, to, 10); }
      L.spawn = { x: tc(2), y: tx(10) };
      S.arch = L.add(new NPC('arch', tc(5), tx(10), 1));
      S.shch = L.add(new Shchelk(tx(180), tx(3))); S.shch.vis = false; S.shch.mode = 'arrived';
      // секрет: стог подбрасывает на высокий навес — там золотой фонарик
      L.plank(ST_X[1] + 40, ST_X[1] + 43, 5); S.bouncers.push(L.add(new Bouncer(tc(ST_X[1] + 39) - 10, tx(10), cfg.bg === 'cave' ? 'sack' : 'hay'))); S.gold = L.add(new GoldLantern(tx(ST_X[1] + 41) + 32, tx(5)));
      S.stations = ST_X.map((X0, i) => {
        const m = slMath(n, i), st = { i, X0, m, started: false, done: false, groups: [] };
        const gx = tx(X0 + 10), y = tx(10), kind = cfg.kind;
        if (n === 5) { st.groups.push(L.add(new PVGroup(kind, gx, y, Math.floor(m.a / 10), m.a % 10, { slots: 10, capOnes: m.a % 10 + m.b % 10 }))); }
        else if (n === 4) { st.groups.push(L.add(new PVGroup(kind, gx, y, Math.floor(m.a / 10), m.a % 10, { capOnes: m.a % 10 + 10, stack: 2 }))); }
        else {
          const A = L.add(new PVGroup(kind, gx, y, Math.floor(m.a / 10), m.a % 10, { noShelf: n === 1, cap: Math.floor(m.r / 10), capOnes: m.a % 10 + m.b % 10 }));
          const px = gx + A.width() + 40; st.plate = L.add(new SignPlate(px, y, '+'));
          const B = L.add(new PVGroup(kind, px + 40, y, Math.floor(m.b / 10), m.b % 10, { noShelf: n === 1, cap: Math.floor(m.b / 10) }));
          st.groups.push(A, B);
        }
        if (cfg.npc) { const gl = st.groups[st.groups.length - 1]; st.npc = L.add(new NPC(cfg.npc, gl.x + gl.width() + 110, tx(10), -1)); check(st.npc.x < tx(X0 + ST_GAP[0]) - 40, 'Бублик стоит на берегу'); }
        for (const g of st.groups) check(g.x + g.width() < tx(X0 + ST_GAP[0]) - 60, 'предметы на берегу, не над рекой');
        st.bridge = L.add(new Bridge(X0 + ST_GAP[0], X0 + ST_GAP[1], 10));
        return st;
      });
      // конец: навес над Щёлком, флаг
      const E = ST_X[2] + ST_GAP[1];
      L.plank(E + 8, E + 11, 8);
      if (n < 5) { S.flag = L.add(new Flag(tc(E + 30), tx(10), true)); S.flag.locked = true; }
      else S.balloon = L.add(new Balloon(tx(E + 22), tx(10)));
      ST_X.forEach((X0, i) => { checkpoint(L, X0 + 2, 10, i > 0); checkpoint(L, X0 + ST_GAP[1] + 1, 10); });
      ST_X.forEach(X0 => ffArc(S, tx(X0 + 26) + 30, 590, tx(X0 + 37) + 30, 590, 160, 5));
      ffAt(S, [[tc(ST_X[1] + 39) - 10, 468], [tc(ST_X[1] + 39), 378], [tc(ST_X[1] + 39) + 30, 288]]);
      const decoK = cfg.bg === 'cave' ? null : 't_bush';
      if (decoK) [[1, 80], [ST_X[0] + 28, 70], [ST_X[1] + 1, 70], [ST_X[1] + 28, 80], [ST_X[2] - 4, 80], [ST_X[2] + 28, 70], [E + 3, 80], [E + 36, 80]].forEach(([c, w]) => deco(L, decoK, tc(c), tx(10), w, 8));
      if (cfg.style === 'orchard') [[ST_X[0] - 4, 3], [ST_X[1] - 4, 3], [ST_X[2] - 4, 3]].forEach(([c, r]) => deco(L, 't_basket', tc(c), tx(10), 90, 4));
      return L;
    },
    start(S) {
      S.weightsBase = n - 1; S.weightsHave = n - 1;
      S.hud = { icon: 'weights', text: S.weightsHave + ' из 5' };
      run((function* () {
        G.freeze = true; yield 0.5;
        archSay(S.arch, 'point', VL[`l${n}Intro`](), 6); yield vwait(0.3);
        say(S.p, VL[`l${n}Go`](), 3); yield vwait(0.2);
        S.arch.pose = 'idle'; G.freeze = false;
      })());
    },
    goal(S) { return goalOf(S, st => tx(st.X0 + 5), tx(ST_X[2] + ST_GAP[1] + 4)); },
    update(S) {
      const p = S.p;
      for (const st of S.stations) if (!st.started && p.onGround && p.x > tx(st.X0 + 3) && p.x < tx(st.X0 + 14) && !(S.q && !S.q.solved) && S.stations.every(o => !o.started || o.done)) {
        st.started = true; S.cur = st; S.respawnPt = { x: tc(st.X0 + 4), y: tx(10) }; run(D.station(S, st));
      }
      S.hud.text = (S.weightsHave || 0) + ' из 5';
      const E = ST_X[2] + ST_GAP[1];
      if (!S.endStarted && S.stations[2].done && p.x >= tx(E + 4) - 32 && p.onGround) { S.endStarted = true; run(n === 5 ? D.finale(S) : D.ending(S)); }
      if (S.wp && !S.wp.got && !p.hidden && !G.freeze && Dialog.idle() && overlap(p, S.wp.x - 30, S.wp.y - 60, 60, 60)) { S.wp.got = true; weightGot(S); run((function* () { yield 0.3; say(S.p, VL[`l${n}Got`](), 3); })()); }
      if (S.flag && !S.done && !S.flag.locked && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) { S.flag.on = true; S.complete(); }
    },
    lock(S, st) { const g = st.groups[st.groups.length - 1]; return fitLock(tx(st.X0) + 10, Math.max(g.x + g.width(), st.npc ? st.npc.x + 70 : 0, n === 4 ? tx(st.X0 + 29) : 0) + 20, tx(10) - (n === 4 ? 420 : 330)); },
    station(S, st) {
      return (function* () {
        const A = S.arch, m = st.m, [g0, g1] = st.groups; G.freeze = true;
        yield* puffTo(A, tc(st.X0 + 1) + 6, tx(10), 1);
        S.p.autoX = tx(st.X0 + 5); S.p.autoFace = 1;
        S.cam.lock = D.lock(S, st); yield 0.5;
        if (cfg.pre) yield* cfg.pre(S, st);
        yield 0.9;   // камера доехала: говорящий в кадре
        check(D.shown(st) === true, 'на станции видно ровно то, что в задаче');
        G.freeze = false;
        S.ask({
          text: m.board, answer: m.ans, choices: CHOICES[n][st.i].slice().sort((x, y) => (st.i % 2 ? y - x : x - y)), row: cfg.plates ? 8 : 7, plates: !!cfg.plates, cols: [st.X0 + 3, st.X0 + 5, st.X0 + 7], speaker: A,
          say: cfg.q(st), eqDone: m.done, hints: cfg.hints(st),
          demo: function* () { for (const g of st.groups) g.hl = 3; archSay(A, 'point', cfg.demo(st), 6); yield vwait(0.5); A.pose = 'idle'; },
          onCorrect: function* () {
            A.pose = 'cheer'; say(A, cfg.ok(st), 5); yield vwait(0.3); A.pose = 'idle';
            if (cfg.after) yield* cfg.after(S, st);
            // мост через реку: камера показывает, как он растёт
            S.cam.lock = fitLock(tx(st.X0 + ST_GAP[0] - 6), tx(st.X0 + ST_GAP[1] + 4), tx(10) - 330);
            st.bridge.build(S.L); yield 1.4;
            if (st.i === 0) { yield* puffTo(A, tc(st.X0 + ST_GAP[0] - 3), tx(10), 1); say(A, VL.bridge(), 3); yield vwait(0.2); }
            S.cam.lock = null; st.done = true;
          },
        });
      })();
    },
    // то, что видно на станции, совпадает с задачей
    shown(st) {
      const m = st.m, [g0, g1] = st.groups;
      if (n === 5) return g0.value() === m.a && g0.slots === 10;
      if (n === 4) return g0.value() === m.a;
      return g0.value() === m.a && g1.value() === m.b;
    },
    ending(S) {
      return (function* () {
        const sh = S.shch, E = ST_X[2] + ST_GAP[1]; G.freeze = true;
        S.cam.lock = fitLock(tx(E + 2), tx(E + 16), tx(8) - 330);
        sh.vis = true; sh.weight = true; sh.x = tx(E + 20); sh.y = tx(3); sh.mode = 'goto'; sh.tx = tx(E + 11); sh.ty = tx(6); sh.gotoSpeed = 380;
        yield () => sh.mode === 'arrived';
        Sound.laugh(); say(sh, VL[cfg.sh1](), 3); yield vwait(0.2);
        sh.weight = false; const wp = S.L.add(new WeightPickup(tx(E + 9) + 32, tx(8))); S.wp = wp; puff(wp.x, wp.y - 20, 8); Sound.bump();
        if (cfg.sh2) { say(sh, VL[cfg.sh2](), 3); yield vwait(0.2); }
        sh.mode = 'goto'; sh.tx = tx(E + 30); sh.ty = tx(0);
        say(S.p, VL.l1Jump(), 3); yield vwait(0.2);
        S.cam.lock = null; G.freeze = false;
        yield 2; sh.vis = false;
      })();
    },
    finale(S) {
      return (function* () {
        const sh = S.shch, p = S.p, A = S.arch, B = S.balloon; G.freeze = true;
        S.cam.lock = lockBox(B.x - 520, B.x + 520, B.y - 820, B.y + 30);
        yield* puffTo(A, B.x - 300, tx(10), 1);
        p.autoX = B.x - 170; p.autoFace = 1; yield () => p.autoX == null;
        // Щёлк сам прилетает к шару и возвращает последнюю монету
        sh.vis = true; sh.weight = true; sh.x = B.x + 700; sh.y = B.y - 700; sh.mode = 'goto'; sh.tx = B.x + 230; sh.ty = B.y - 330; sh.gotoSpeed = 380;
        yield () => sh.mode === 'arrived'; sh.face = -1;
        say(sh, VL.l5Sh1(), 3); yield vwait(0.2);
        say(sh, VL.l5Sh2(), 5); yield vwait(0.2);
        sh.weight = false; S.L.add(new FlyItem('weight', 40, sh.x, sh.y + 40, p.x, p.y - 130, 0.6, null, 60)); yield 0.7;
        S.weightsHave = 5; Sound.secret(); Sound.ura(); sparkBurst(p.x, p.y - 130, 30, '#ffe066', 380);
        check(S.weightsHave === 5, 'все пять звёздных монет вернулись');
        archSay(A, 'idle', VL.l5Forgive(), 6); yield vwait(0.2);
        S.medal = { t: 0 }; Sound.sparkle(); sparkBurst(sh.x, sh.y + 10, 24, '#ffd43b', 260);
        Sound.laugh(); say(sh, VL.l5Medal(), 3); yield vwait(0.2);
        say(p, VL.l5Fly(), 3); yield vwait(0.2);
        // Искра и Архимед садятся в корзину; шар поднимается, остров зажигает огни
        puff(p.x, p.y - 60, 12); p.hidden = true; B.iskra = true; puff(A.x, A.y - 70, 12); A.alpha = 0; B.arch = true; Sound.pop();
        sh.mode = 'goto'; sh.tx = B.x + 260; sh.ty = B.y - 520;
        S.lit = true;
        for (let t = 0; t < 2.4; t += 1 / 60) { B.lift = Math.min(220, B.lift + 1.6); yield 1 / 60; }
        say(NARR, VL.l5Lights(), 5); yield vwait(0.6);
        G.freeze = false; S.complete();
      })();
    },
    avoidRects(S) {
      const out = [];
      for (const st of S.stations) { if (st.done) continue; for (const g of st.groups) out.push(...g.bounds()); if (st.plate) out.push(st.plate.rect()); }
      return out.map(r => ({ x: r.x - 6, y: r.y - 6, w: r.w + 12, h: r.h + 12, counted: true }));
    },
    counted(S) {
      const st = S.cur; if (!st || st.done || !asking(S)) return null;
      const out = [];
      st.groups.forEach((g, gi) => g.rects().forEach((o, i) => out.push({ kind: (gi ? 'B ' : 'A ') + o.kind + ' ' + (i + 1), group: (gi ? 'B' : 'A') + o.kind, r: o.r })));
      return out;
    },
    countRule(S, ok) {
      const st = S.cur, out = [];
      st.groups.forEach((g, gi) => { const k = gi ? 'B' : 'A'; out.push({ name: k + ' десятки', visible: cnt(ok, o => o.group === k + 'ten'), expected: g.tens }, { name: k + ' единицы', visible: cnt(ok, o => o.group === k + 'one'), expected: g.ones }); });
      return out;
    },
    selfCheck(S) {
      const st = S.cur;
      if (st && S.board && !S.board.solved && S.q) {
        check(S.board.text === st.m.board, 'на доске — задача станции');
        check(D.shown(st), 'предметы = числам на доске');
        check(S.q.choices.includes(st.m.ans) && new Set(S.q.choices).size === S.q.choices.length, 'ответ среди блоков, блоки разные');
      }
      check(S.weightsHave >= n - 1 && S.weightsHave <= n, 'табличка монет');
    },
    drawFront(S, c) {
      if (S.medal) {
        const sh = S.shch; S.medal.t = Math.min(1, S.medal.t + 1 / 60); const k = easeOutBack(S.medal.t);
        c.save(); c.translate(sh.x + 4, sh.y + 22); c.scale(k, k);
        c.strokeStyle = '#c92a2a'; c.lineWidth = 5; c.beginPath(); c.moveTo(-12, -16); c.lineTo(0, 0); c.lineTo(12, -16); c.stroke();
        glow(c, 0, 8, 30, 'rgba(255,214,90,0.8)', 0.9);
        const g = c.createRadialGradient(-3, 5, 1, 0, 8, 12); g.addColorStop(0, '#fffbe0'); g.addColorStop(0.5, '#ffd43b'); g.addColorStop(1, '#a86b00');
        c.fillStyle = g; c.strokeStyle = '#5e3c00'; c.lineWidth = 2; c.beginPath(); c.arc(0, 8, 11, 0, 7); c.fill(); c.stroke(); c.restore();
      }
      if (S.lit) for (let i = 0; i < 18; i++) { const x = S.balloon.x - 600 + i * 70, y = S.balloon.y - 620 + Math.sin(i * 0.7) * 20; glow(c, x, y, 26, ['rgba(255,214,90,0.9)', 'rgba(255,135,135,0.9)', 'rgba(116,192,252,0.9)'][i % 3], 0.8 + 0.2 * Math.sin(G.t * 4 + i)); }
    },
  };
  return D;
}
// ---------- уровень 1: Мост из десятков ----------
const LV1 = makeSL(1, {
  bg: 'day', island: 1, song: 'day', kind: 'coin', sh1: 'l1Sh1', sh2: 'l1Sh2',
  pre: function* (S, st) { if (st.i === 0) { archSay(S.arch, 'point', VL.l1Rule(), 6); yield vwait(0.3); archSay(S.arch, 'point', VL.l1Plate(), 6); yield vwait(0.3); S.arch.pose = 'idle'; } },
  plates: 1, q: st => VL.l1Q(), hints: st => [VL.l1Sink(), VL.l1H1(), VL.l1H2()],
  demo: st => VL.l1D(st.m.a, st.m.b), ok: st => VL.l1Ok(st.m.a, st.m.b),
  after: function* (S, st) { yield* mergeGroups(S, st.groups[0], st.groups[1]); st.plate.vis = false; check(st.groups[0].value() === st.m.r, 'на берегу ровно ответ'); },
});
// ---------- уровень 2: Корзины с яблоками (сад Бублика, без перехода через десяток) ----------
const LV2 = makeSL(2, {
  bg: 'day', island: 1, song: 'day', kind: 'apple', style: 'orchard', npc: 'bublik', tint: ['rgba(255,240,180,0.10)', 'rgba(255,220,150,0.08)'], sh1: 'l2Sh1', sh2: 'l1Sh2',
  pre: function* (S, st) { say(st.npc, VL[['l2B1', 'l2B2', 'l2B3'][st.i]](), 4); yield vwait(0.3); if (st.i === 0) { archSay(S.arch, 'point', VL.l2Rule(), 6); yield vwait(0.3); S.arch.pose = 'idle'; } },
  q: st => VL.qSum(), hints: st => [VL.l2H1(), VL.l2H2()],
  demo: st => VL.l2D(st.m.a, st.m.b), ok: st => VL.l2Ok(st.m.a, st.m.b),
  after: function* (S, st) { check(st.m.a % 10 + st.m.b % 10 < 10, 'урок 2: без перехода через десяток'); yield* mergeGroups(S, st.groups[0], st.groups[1]); st.plate.vis = false; check(st.groups[0].value() === st.m.r, 'в ящиках ровно ответ'); if (st.i === 2) { say(st.npc, VL.l2Th(), 3); yield vwait(0.2); } },
});
// ---------- уровень 3: Водопад обмена (с переходом через десяток) ----------
const LV3 = makeSL(3, {
  bg: 'day', island: 1, song: 'river', kind: 'coin', tint: ['rgba(120,200,255,0.10)', 'rgba(255,170,120,0.08)'], sh1: 'l3Sh1',
  pre: function* (S, st) { if (st.i === 0) { archSay(S.arch, 'point', VL.l3Rule(), 7); yield vwait(0.3); S.arch.pose = 'idle'; } },
  q: st => VL.qSumC(), hints: st => [VL.l3H1(), VL.l3H2()],
  demo: st => VL.l3D(st.m.a, st.m.b), ok: st => VL.l3Ok(st.m.a, st.m.b),
  after: function* (S, st) {
    const A = st.groups[0]; check(st.m.a % 10 + st.m.b % 10 >= 10, 'урок 3: переход через десяток');
    yield* mergeGroups(S, A, st.groups[1]); st.plate.vis = false; yield 0.3;
    yield* regroupUp(S, A); check(A.tens === Math.floor(st.m.r / 10) && A.ones === st.m.r % 10, 'после обмена: десятки и единицы ответа');
    if (st.i === 0) { say(S.arch, VL.l3Swap(), 5); yield vwait(0.2); say(S.p, VL.l3Wow(), 2); yield vwait(0.2); }
  },
});
// ---------- уровень 4: Пещера вычитания (разбить ящик-десяток) ----------
const LV4 = makeSL(4, {
  bg: 'cave', song: 'cave', kind: 'apple', sh1: 'l4Sh2',
  pre: function* (S, st) {
    const sh = S.shch; sh.vis = true; sh.weight = false; sh.x = tx(st.X0 + 34); sh.y = tx(3); sh.mode = 'goto'; sh.tx = tx(st.X0 + 27); sh.ty = tx(6); sh.gotoSpeed = 420;
    yield () => sh.mode === 'arrived'; sh.face = -1; Sound.laugh();
    say(sh, VL.l4Sh(st.m.b), 3); yield vwait(0.2);
  },
  q: st => VL.l4Q(st.m.a, st.m.b), hints: st => [VL.l4H1(st.m.a, st.m.b), VL.l4H2()],
  demo: st => VL.l4D(st.m.a, st.m.b), ok: st => VL.l4Ok(st.m.a, st.m.b),
  after: function* (S, st) {
    const A = st.groups[0], m = st.m, sh = S.shch; check(m.a % 10 < m.b % 10, 'урок 4: единиц не хватает — разбиваем десяток');
    yield* regroupDown(S, A);
    yield* takeAway(S, A, Math.floor(m.b / 10), m.b % 10, { x: sh.x, y: sh.y + 20 });
    check(A.value() === m.r && A.tens === Math.floor(m.r / 10) && A.ones === m.r % 10, 'осталось ровно ответ');
    say(S.arch, VL.l4Left(m.r), 4); yield vwait(0.2);
    sh.mode = 'goto'; sh.tx = tx(st.X0 + 50); sh.ty = tx(-2); yield 1; sh.vis = false;
  },
});
// ---------- уровень 5: Воздушный шар — ровно 100 ----------
const LV5 = makeSL(5, {
  bg: 'eve', song: 'sunset', kind: 'coin', night: 0.1, tint: ['rgba(255,150,70,0.16)', 'rgba(255,90,40,0.10)'],
  pre: function* (S, st) { if (st.i === 0) { archSay(S.arch, 'point', VL.l5Rule(), 6); yield vwait(0.3); S.arch.pose = 'idle'; } },
  q: st => VL.l5Q(st.m.a), hints: st => [VL.l5H1(), VL.l5H2()],
  demo: st => VL.l5D(st.m.a), ok: st => VL.l5Ok(st.m.a),
  after: function* (S, st) {
    const A = st.groups[0], m = st.m, B = new PVGroup('coin', A.x, A.y, 0, 0);
    // добавляем ответ: сначала монетки до десятка, потом трубочки
    let pend = 0;
    for (let k = 0; k < m.b % 10; k++) { const q = A.onePos(A.ones + pend); pend++; S.L.add(new FlyItem('coin', 30, S.p.x, S.p.y - 80, q.x, q.yb, 0.45, () => { A.ones++; pend--; Sound.pop(); }, 120)); yield 0.18; }
    yield () => pend === 0;
    if (A.ones >= 10) yield* regroupUp(S, A);
    for (let k = 0; k < Math.floor(m.b / 10); k++) { const q = A.tenPos(A.tens + pend); pend++; S.L.add(new FlyTen('coin', S.p.x, S.p.y - 80, q.x, q.yb, 0.5, () => { A.tens++; pend--; Sound.pop(); })); yield 0.3; }
    yield () => pend === 0; yield 0.3;
    check(A.value() === 100 && A.tens === 10 && A.ones === 0, 'ровно 100: десять трубочек');
    A.hl = 1.5; Sound.sparkle();
  },
});
