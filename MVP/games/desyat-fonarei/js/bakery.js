'use strict';
// ===== Уровень 4: Пекарня Бублика — состав числа 10 =====
// Тележка-«десятка»: две полки по 5 мест. Булочки лежат на полках, пустые места видны (бумажные салфетки).
const RK = { cell: 54, pad: 20, bw: 44, shT: 128, shB: 64 };
function bunH(w) { return w * IMG.t_bun.height / IMG.t_bun.width; }
// булочка: обычная, с вареньем (красная капля) или с сахаром (белая шапочка)
function drawBunKind(c, kind, x, y, w, sq = 1) {
  const im = IMG.t_bun, h = bunH(w);
  c.save(); c.translate(x, y); c.scale(1 / sq, sq);
  c.drawImage(im, -w / 2, -h, w, h);
  if (kind === 'jam') {
    c.fillStyle = '#d81e3c'; c.strokeStyle = '#6e0a1a'; c.lineWidth = 2;
    c.beginPath(); c.ellipse(0, -h * 0.74, w * 0.25, h * 0.16, 0, 0, 7); c.fill(); c.stroke();
    c.beginPath(); c.ellipse(w * 0.13, -h * 0.6, w * 0.06, h * 0.1, 0.2, 0, 7); c.fill();
    c.fillStyle = 'rgba(255,255,255,0.75)'; c.beginPath(); c.ellipse(-w * 0.08, -h * 0.79, w * 0.08, h * 0.045, -0.3, 0, 7); c.fill();
  } else if (kind === 'sugar') {
    c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(140,110,80,0.7)'; c.lineWidth = 1.6;
    c.beginPath(); c.moveTo(-w * 0.36, -h * 0.66);
    for (let k = 0; k <= 6; k++) { const xx = -w * 0.36 + k * w * 0.12; c.quadraticCurveTo(xx + w * 0.06, -h * (k % 2 ? 0.56 : 0.6), xx + w * 0.12, -h * 0.66); }
    c.quadraticCurveTo(0, -h * 1.02, -w * 0.36, -h * 0.66); c.closePath(); c.fill(); c.stroke();
    c.fillStyle = '#fffbe8'; for (let k = 0; k < 6; k++) { c.beginPath(); c.arc(-w * 0.28 + k * w * 0.11, -h * (0.5 - (k % 2) * 0.06), 1.6, 0, 7); c.fill(); }
  }
  c.restore();
}
class BakeRack extends Ent {
  // cells: 10 мест (0–4 верхняя полка, 5–9 нижняя): null — пусто, 'plain' | 'jam' | 'sugar'
  constructor(xc, yG, cells, opts = {}) { super(xc, yG); this.cells = cells.slice(); this.places = !!opts.places; this.two = !!opts.two; this.z = -1.2; this.labels = null; this.pulse = 0; this.slotPulse = {}; }
  get W() { return RK.pad * 2 + RK.cell * 5; }
  slot(i) { const r = i < 5 ? 0 : 1, k = i % 5; return { x: this.x - this.W / 2 + RK.pad + RK.cell * (k + 0.5), y: this.y - (r === 0 ? RK.shT : RK.shB) }; }
  count(kind) { return this.cells.filter(v => (kind ? v === kind : !!v)).length; }
  firstEmpty() { return this.cells.findIndex(v => !v); }
  bunRect(i) { const s = this.slot(i), h = bunH(RK.bw); return { x: s.x - RK.bw / 2, y: s.y - h, w: RK.bw, h }; }
  placeRect(i) { const s = this.slot(i); return { x: s.x - 21, y: s.y - 32, w: 42, h: 32 }; }
  bounds() { return { x: this.x - this.W / 2 - 6, y: this.y - RK.shT - 64, w: this.W + 12, h: RK.shT + 64 }; }
  update(dt) { this.pulse = Math.max(0, this.pulse - dt * 3); for (const k in this.slotPulse) this.slotPulse[k] = Math.max(0, this.slotPulse[k] - dt * 3); if (this.labels) for (const l of this.labels) l.t += dt; }
  draw(c) {
    const X0 = this.x - this.W / 2, W = this.W, Y = this.y;
    c.save();
    c.fillStyle = 'rgba(30,20,10,0.3)'; c.beginPath(); c.ellipse(this.x + 4, Y + 1, W * 0.55, 9, 0, 0, 7); c.fill();
    // стойки и ручка
    const post = (px, top) => { const g = c.createLinearGradient(px - 6, 0, px + 6, 0); g.addColorStop(0, '#7a4a1e'); g.addColorStop(0.4, '#d99b5c'); g.addColorStop(1, '#6b3f18'); c.fillStyle = g; c.strokeStyle = '#3e2410'; c.lineWidth = 2.5; rr(c, px - 6, top, 12, Y - 20 - top, 4); c.fill(); c.stroke(); };
    post(X0 + 6, Y - RK.shT - 30); post(X0 + W - 6, Y - RK.shT - 58);
    c.strokeStyle = '#3e2410'; c.lineWidth = 9; c.lineCap = 'round'; c.beginPath(); c.moveTo(X0 + W - 6, Y - RK.shT - 54); c.quadraticCurveTo(X0 + W + 22, Y - RK.shT - 62, X0 + W + 26, Y - RK.shT - 34); c.stroke();
    c.strokeStyle = '#e8590c'; c.lineWidth = 5; c.beginPath(); c.moveTo(X0 + W - 6, Y - RK.shT - 54); c.quadraticCurveTo(X0 + W + 22, Y - RK.shT - 62, X0 + W + 26, Y - RK.shT - 34); c.stroke();
    // нижняя рама и колёса — стоят на земле
    c.fillStyle = '#8e5424'; c.strokeStyle = '#3e2410'; c.lineWidth = 3; rr(c, X0, Y - 30, W, 10, 4); c.fill(); c.stroke();
    for (const wx of [X0 + 34, X0 + W - 34]) {
      c.fillStyle = '#3b2412'; c.beginPath(); c.arc(wx, Y - 14, 14, 0, 7); c.fill();
      c.fillStyle = '#e8b04a'; c.beginPath(); c.arc(wx, Y - 14, 8, 0, 7); c.fill();
      c.strokeStyle = '#7a4a10'; c.lineWidth = 2; for (let k = 0; k < 4; k++) { const an = k * Math.PI / 4; c.beginPath(); c.moveTo(wx - Math.cos(an) * 8, Y - 14 - Math.sin(an) * 8); c.lineTo(wx + Math.cos(an) * 8, Y - 14 + Math.sin(an) * 8); c.stroke(); }
      c.fillStyle = '#5b3313'; c.beginPath(); c.arc(wx, Y - 14, 3, 0, 7); c.fill();
    }
    // полки-подносы
    for (let r = 0; r < 2; r++) {
      const sy = Y - (r === 0 ? RK.shT : RK.shB);
      const rim = this.two ? (r === 0 ? '#4dabf7' : '#ff6b6b') : '#c7ccd1';
      c.fillStyle = '#a8652c'; c.strokeStyle = '#4e2c10'; c.lineWidth = 3; rr(c, X0 - 4, sy + 3, W + 8, 9, 4); c.fill(); c.stroke();
      const tg = c.createLinearGradient(0, sy - 2, 0, sy + 4); tg.addColorStop(0, '#f1f3f5'); tg.addColorStop(1, rim);
      c.fillStyle = tg; c.strokeStyle = '#5c636a'; c.lineWidth = 2; rr(c, X0 + 4, sy - 3, W - 8, 7, 3); c.fill(); c.stroke();
      if (this.two) { c.fillStyle = rim; rr(c, X0 + 4, sy + 1, W - 8, 3, 1.5); c.fill(); }
    }
    // места и булочки
    for (let i = 0; i < 10; i++) {
      const s = this.slot(i), v = this.cells[i];
      if (!v) {
        if (!this.places) continue;
        // пустое место: салфетка и пунктирный «силуэт» булочки
        c.fillStyle = '#ffffff'; c.strokeStyle = 'rgba(120,90,60,0.6)'; c.lineWidth = 1.5; c.beginPath(); c.ellipse(s.x, s.y - 3, 21, 5, 0, 0, 7); c.fill(); c.stroke();
        c.setLineDash([5, 4]); c.strokeStyle = 'rgba(110,70,30,0.85)'; c.lineWidth = 2.5;
        c.beginPath(); c.moveTo(s.x - 19, s.y - 4); c.bezierCurveTo(s.x - 21, s.y - 36, s.x + 21, s.y - 36, s.x + 19, s.y - 4); c.stroke(); c.setLineDash([]);
        continue;
      }
      const sq = 1 + Math.sin(G.t * 2.4 + i) * 0.02 + (this.slotPulse[i] || 0) * 0.15;
      c.fillStyle = 'rgba(60,30,10,0.3)'; c.beginPath(); c.ellipse(s.x, s.y - 1, RK.bw * 0.4, 3.5, 0, 0, 7); c.fill();
      drawBunKind(c, v, s.x, s.y + 1, RK.bw, sq);
    }
    // номера при показе «как считать»
    if (this.labels) for (const l of this.labels) {
      const s = this.slot(l.i), k = easeOutBack(Math.min(1, l.t / 0.3)), cy = s.y - 19;
      c.save(); c.translate(s.x, cy); c.scale(k, k);
      c.fillStyle = l.col || '#ffd43b'; c.strokeStyle = '#7a3e00'; c.lineWidth = 2.5; c.beginPath(); c.arc(0, 0, 13, 0, 7); c.fill(); c.stroke();
      txt(c, String(l.n), 0, 1, { size: 19, fill: '#5a2d00' }); c.restore();
    }
    c.restore();
  }
}
// печка у прилавка (фон): из неё выпрыгивают свежие булочки
function drawOven(c, x, yG, t) {
  c.save();
  c.fillStyle = 'rgba(30,20,10,0.3)'; c.beginPath(); c.ellipse(x + 4, yG + 2, 118, 9, 0, 0, 7); c.fill();
  // кирпичное основание
  c.fillStyle = '#b5532c'; c.strokeStyle = '#5a2210'; c.lineWidth = 3; rr(c, x - 105, yG - 74, 210, 74, 8); c.fill(); c.stroke();
  // купол
  const g = c.createLinearGradient(0, yG - 170, 0, yG - 70); g.addColorStop(0, '#e07a4f'); g.addColorStop(1, '#a8452a');
  c.fillStyle = g; c.beginPath(); c.moveTo(x - 100, yG - 72); c.bezierCurveTo(x - 100, yG - 185, x + 100, yG - 185, x + 100, yG - 72); c.closePath(); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(90,30,10,0.45)'; c.lineWidth = 2;
  for (let r = 0; r < 4; r++) for (let k = 0; k < 6; k++) { const bx = x - 100 + k * 36 + (r % 2) * 18, by = yG - 70 + r * 17; if (bx < x + 96) { c.strokeRect(bx, by, 36, 17); } }
  // устье с огнём
  c.fillStyle = '#3b1a0c'; c.beginPath(); c.moveTo(x - 46, yG - 74); c.lineTo(x - 46, yG - 108); c.quadraticCurveTo(x, yG - 150, x + 46, yG - 108); c.lineTo(x + 46, yG - 74); c.closePath(); c.fill();
  glow(c, x, yG - 96, 70 + Math.sin(t * 7) * 6, 'rgba(255,150,40,0.75)', 0.9);
  c.fillStyle = '#ffb02e'; for (let k = 0; k < 4; k++) { const fx2 = x - 30 + k * 20, fh = 18 + Math.sin(t * 9 + k * 2) * 6; c.beginPath(); c.moveTo(fx2 - 9, yG - 76); c.quadraticCurveTo(fx2, yG - 76 - fh * 2, fx2 + 9, yG - 76); c.fill(); }
  c.fillStyle = '#fff3b0'; for (let k = 0; k < 3; k++) { const fx2 = x - 20 + k * 20; c.beginPath(); c.moveTo(fx2 - 5, yG - 76); c.quadraticCurveTo(fx2, yG - 98 - Math.sin(t * 8 + k) * 4, fx2 + 5, yG - 76); c.fill(); }
  c.fillStyle = '#d9d0c0'; c.strokeStyle = '#5a2210'; c.lineWidth = 3; rr(c, x - 56, yG - 80, 112, 10, 4); c.fill(); c.stroke();
  c.restore();
}
function drawSack(c, x, yG, s = 1) {
  c.save(); c.translate(x, yG); c.scale(s, s);
  c.fillStyle = 'rgba(30,20,10,0.28)'; c.beginPath(); c.ellipse(3, 1, 34, 6, 0, 0, 7); c.fill();
  const g = c.createLinearGradient(-30, 0, 30, 0); g.addColorStop(0, '#c9b38a'); g.addColorStop(0.45, '#f3e6c8'); g.addColorStop(1, '#a98f62');
  c.fillStyle = g; c.strokeStyle = '#6b5530'; c.lineWidth = 3;
  c.beginPath(); c.moveTo(-30, 0); c.bezierCurveTo(-38, -40, -24, -62, -12, -66); c.lineTo(12, -66); c.bezierCurveTo(24, -62, 38, -40, 30, 0); c.closePath(); c.fill(); c.stroke();
  c.fillStyle = '#8a6a3a'; rr(c, -14, -72, 28, 9, 4); c.fill();
  txt(c, 'МУКА', 0, -30, { size: 15, fill: '#7a5a2a' });
  c.fillStyle = 'rgba(255,255,255,0.8)'; c.beginPath(); c.ellipse(-4, -70, 10, 4, 0, 0, 7); c.fill();
  c.restore();
}

const LB = {
  rngId: 4,
  build(S) {
    const L = new Level(106, 12, 'day'); S.L = L; L.style = 'market';
    const rng = S.rng;
    const N = rint(rng, 3, 7), m = 10 - N;
    const a = rint(rng, 2, 5), b = rint(rng, 1, Math.min(4, 9 - a));
    let x = rint(rng, 2, 8); while (x === N || 10 - x === a + b) x = rint(rng, 2, 8);
    S.math = { N, m, a, b, sum: a + b, x, y: 10 - x };
    L.ground(0, 50, 10); L.ground(52, 106, 10); // канавка 2 клетки (было 3 — прыжок 192 px почти на пределе, ребёнку трудно)
    L.spawn = { x: tc(2), y: tx(10) };
    // секрет: мешок с мукой пружинит — с него долетаешь до высокого навеса с золотым фонарём
    S.bouncers.push(L.add(new Bouncer(tc(10), tx(10), 'sack')));
    L.plank(12, 16, 4);
    S.gold = L.add(new GoldLantern(tx(14) + 32, tx(4)));
    S.bublik = L.add(new NPC('bublik', tc(6), tx(10), 1));
    // три тележки-«десятки»
    const cells = (list) => { const o = Array(10).fill(null); list.forEach((v, i) => { o[i] = v; }); return o; };
    const st = (x0, kind, cl, opts) => {
      const X = tx(x0);
      const rack = L.add(new BakeRack(X + 255, tx(10), cl, opts));
      return { x0, X, kind, home: X + 40, rack, cols: [x0 + 8, x0 + 10, x0 + 12], iskraX: X + 736, started: false, done: false };
    };
    const c2 = Array(10).fill(null); for (let i = 0; i < a; i++) c2[i] = 'plain'; for (let i = 0; i < b; i++) c2[5 + i] = 'plain';
    const c3 = Array(10).fill('sugar'); for (let i = 0; i < x; i++) c3[i] = 'jam';
    S.stations = [
      st(20, 'fill', cells(Array(N).fill('plain')), { places: true }),
      st(56, 'sum', c2, { two: true }),
      st(84, 'split', c3, {}),
    ];
    // у первой тележки: ящики, навесы и печка
    L.crate(36, 9); L.crate(37, 9); L.crate(37, 8);
    L.plank(38, 43, 6); L.plank(44, 48, 8);
    S.ovenX = tc(40) + 8;
    S.spots = [[tc(36), tx(9)], [tc(37), tx(8)], [tc(39), tx(6)], [tc(41), tx(6)], [tc(43), tx(10)], [tc(45), tx(8)], [tc(47), tx(8)]].map(([x1, y1]) => ({ x: x1, y: y1 }));
    S.pops = []; S.flying = 0;
    // середина: ящики, навес, под навесом летает Щёлк
    L.crate(72, 9); L.crate(73, 9); L.crate(73, 8);
    L.plank(74, 79, 7);
    S.sh = L.add(new Shchelk(tc(77), tx(9) - 30)); S.sh.range = 140; S.sh.cy = tx(9) - 26; S.sh.cx = tc(77);
    S.flag = L.add(new Flag(tc(103), tx(10), true)); S.flag.locked = true;
    checkpoint(L, 18, 10); checkpoint(L, 49, 10, false); checkpoint(L, 54, 10); checkpoint(L, 71, 10, false); checkpoint(L, 82, 10, false);
    [[1, 70], [16, 60], [33, 70], [52.5, 60], [70, 70], [82, 60], [100, 70], [105, 60]].forEach(([c2_, w]) => deco(L, 't_bush', tc(c2_), tx(10), w, 8));
    [[49.6, 10], [53.4, 10]].forEach(([c2_, r]) => deco(L, 't_fence', tx(c2_) + 20, tx(r), 100, 6));
    // светлячки
    ffArc(S, tc(8), 560, tc(9) + 30, 400, 40, 2);
    ffAt(S, [[tx(12) + 40, 200], [tx(13) + 40, 190]]);
    ffArc(S, tx(49) + 20, 590, tx(53) + 20, 590, 140, 4);
    ffAt(S, [[tc(75), 400], [tc(76), 400], [tc(77), 400], [tc(78), 400]]);
    ffArc(S, tc(99), 590, tc(101), 590, 90, 3);
    S.phase = 'intro'; S.cur = null; S.msgT = 0; S.teaseT = 0;
    return L;
  },
  start(S) {
    S.hud = { icon: 'bun', text: '0 из 3' };
    run((function* () {
      yield 0.6;
      say(S.bublik, VL.bkStart(), 5);
      yield vwait(1.2);
      yield* LB.bublikTo(S, S.stations[0].home);
      S.phase = 'go';
    })());
  },
  // Бублик бежит к своей тележке; за кадром — сразу на месте (не заставляем ждать)
  *bublikTo(S, X) {
    const bk = S.bublik; bk.face = X > bk.x ? 1 : -1;
    const onCam = x => x > S.cam.x - 80 && x < S.cam.x + viewW() + 80;
    while (Math.abs(bk.x - X) > 2) {
      if (!onCam(bk.x) && !onCam(X)) { bk.x = X; break; }
      bk.x += Math.sign(X - bk.x) * Math.min(Math.abs(X - bk.x), 420 / 60); if (bk.hop <= 0) bk.hop = 0.5;
      yield 1 / 60;
    }
    bk.x = X; bk.face = 1; bk.hop = 0;
  },
  readyCount(S) { return S.stations.filter(s => s.done).length; },
  update(S, dt) {
    const p = S.p, sh = S.sh, st = S.stations;
    st.forEach((s, i) => {
      const prevOk = i === 0 || st[i - 1].done;
      if (!s.started && prevOk && S.phase !== 'intro' && Math.abs(S.bublik.x - s.home) < 2 && p.onGround && p.x > tx(s.x0 + 2) && p.x < tx(s.x0 + 15) && !(S.q && !S.q.solved)) {
        s.started = true; S.cur = s; run(LB.stationScript(S, s));
      }
    });
    // сбор булочек для первой тележки: каждая сама летит на свободное место
    if (S.phase === 'collect') {
      const s = st[0], rk = s.rack;
      for (const bn of S.pops) {
        if (bn.taken || p.hidden || !overlap(p, bn.x - 26, bn.y - 44, 52, 44)) continue;
        bn.taken = true; S.flying++; Sound.sparkle(); sparkBurst(bn.x, bn.y - 20, 12, '#ffe8a0');
        const idx = rk.cells.findIndex((v, k) => !v && !rk.reserved?.[k]);
        rk.reserved = rk.reserved || {}; rk.reserved[idx] = true;
        const to = rk.slot(idx);
        S.L.add(new FlyBun(bn.x, bn.y - 20, to.x, to.y - 20, 0.6, () => {
          rk.cells[idx] = 'plain'; delete rk.reserved[idx]; S.flying--; rk.slotPulse[idx] = 1; Sound.count(rk.count());
          spawn({ type: 'num', text: String(rk.count()), x: to.x, y: to.y - 60, vy: -50, life: 0.9, size: 36 });
          if (rk.count() === 10 && !s.done) {
            check(rk.count('plain') === 10 && S.pops.every(q => q.taken) && S.flying === 0, `тележка 1: ${S.math.N} + ${S.math.m} = 10, полная`);
            s.done = true; S.phase = 'go'; Sound.correct(); S.bublik.mood = 1;
            say(S.bublik, VL.bkFull(), 3);
            run((function* () { yield vwait(1.0); S.bublik.mood = 0; yield* LB.bublikTo(S, st[1].home); })());
          }
        }));
      }
      const left = S.pops.filter(q => !q.taken).length;
      if (left > 0 && p.x > tx(49) && (!S.msgT || S.msgT < G.t)) { say(S.bublik, VL.bkCollect(left), 3); S.msgT = G.t + 7; }
    }
    // Щёлк — мягкая помеха (как на рынке: толкается и хихикает)
    if (sh.vis && sh.mode === 'patrol' && !p.hidden && sh.hitCd <= 0) {
      const bx = sh.box();
      if (overlap(p, bx.x, bx.y, bx.w, bx.h)) {
        if (p.vy > 0 && p.y - p.vy * dt <= bx.y + 14) {
          p.vy = Input.jumpHeld ? -980 : -720; p.jumping = Input.jumpHeld; p.sy = 1.2; p.sx = 0.85; Sound.bounce(); Sound.laugh();
          sh.mode = 'flee'; sh.flee = 0.8; sh.hitCd = 1; sparkBurst(sh.x, sh.y - 10, 8, '#cfe0ff');
        } else if (p.inv <= 0) {
          p.vx = (p.x < sh.x ? -1 : 1) * 330; p.vy = -420; p.onGround = false; p.inv = 1.1; sh.hitCd = 1; Sound.laugh(); puff(p.x, p.y - 50, 6);
          if (S.teaseT < G.t) { say(sh, VL.shTease(), 2); S.teaseT = G.t + 9; }
        }
      }
    }
    if (sh.mode === 'flee' || sh.mode === 'return') { /* Щёлк сам возвращается к своему навесу */ }
    // табличка: во время вопроса — «?», при сборе — сколько на тележке, иначе — сколько тележек готово
    if (S.q && !S.q.solved && S.board && !S.board.solved) S.hud.text = '?';
    else if (S.phase === 'collect') S.hud.text = st[0].rack.count() + ' из 10';
    else S.hud.text = LB.readyCount(S) + ' из 3';
    if (!S.done && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) {
      if (!S.flag.locked) { S.flag.on = true; S.complete(); }
      else if (!S.msgT || S.msgT < G.t) { say(S.bublik, VL.bkFlag(), 2.5); S.msgT = G.t + 4; }
    }
  },
  stationScript(S, s) {
    return (function* () {
      const { N, m, a, b, sum, x, y } = S.math, bk = S.bublik, rk = s.rack;
      S.p.autoX = s.iskraX; S.p.autoFace = -1;
      S.cam.lock = LB.camLock(S, s);
      bk.face = 1;
      yield vwait(0.4);
      const labelDemo = function* (title, idxs, col) {
        say(bk, title, 2.5); yield vwait(0.6);
        rk.labels = []; let k = 0;
        for (const i of idxs) { k++; rk.labels.push({ i, n: k, t: 0, col }); Sound.count(k); yield 0.65; }
        yield 0.3;
        say(bk, VL.tryYou(), 3); yield vwait(1.2);
        return k;
      };
      if (s.kind === 'fill') {
        check(rk.count('plain') === N && rk.count() === N, `на тележке ${N} булочек`);
        S.ask({
          text: `${N} + ? = 10`, answer: m, choices: makeChoices(S.rng, m), row: 6, cols: s.cols, speaker: bk,
          say: VL.bkQ1(N), eqDone: `${N} + ${m} = 10`, hints: [VL.bkH1(), VL.toTen(N)],
          demo: function* () { const idx = []; rk.cells.forEach((v, i) => { if (!v) idx.push(i); }); const k = yield* labelDemo(VL.bkCountEmpty(), idx, '#c5d4ff'); check(k === m, 'показ: пустых мест ' + k + ' = ' + m); },
          onCorrect: function* () {
            rk.labels = null;
            say(bk, VL.bkOk1(N), 4);
            yield 0.6;
            // печка выпекает ровно m булочек — они выпрыгивают на ящики и навесы
            S.phase = 'pop'; G.freeze = true;
            S.cam.lock = LB.fitX(tx(34), tx(48) + 20);
            yield 0.7;
            const spots = S.spots.slice(0, m);
            for (const sp of spots) {
              S.flying++;
              S.L.add(new FlyBun(S.ovenX, tx(10) - 100, sp.x, sp.y, 0.75, () => { S.flying--; const bn = S.L.add(new Bun(sp.x, sp.y, 'pop')); S.pops.push(bn); puff(sp.x, sp.y - 10, 5); Sound.pop(); }));
              Sound.whoosh(); yield 0.32;
            }
            yield 1.2;
            check(S.pops.length === m && rk.count() + S.pops.length === 10, `испечено ${S.pops.length} = ${m}, всего будет 10`);
            S.cam.lock = null; G.freeze = false; S.phase = 'collect';
          },
        });
      } else if (s.kind === 'sum') {
        check(rk.cells.slice(0, 5).filter(Boolean).length === a && rk.cells.slice(5).filter(Boolean).length === b, `подносы ${a} и ${b}`);
        S.ask({
          text: `${a} + ${b} = ?`, answer: sum, choices: makeChoices(S.rng, sum), row: 6, cols: s.cols, speaker: bk,
          say: VL.bkQ2(a, b), eqDone: `${a} + ${b} = ${sum}`, hints: [VL.bkH2a(), VL.addMore(a, b)],
          demo: function* () { const idx = []; rk.cells.forEach((v, i) => { if (v) idx.push(i); }); const k = yield* labelDemo(VL.bkCountAll(), idx); check(k === sum, 'показ: всего ' + k + ' = ' + sum); },
          onCorrect: function* () {
            rk.labels = null; bk.mood = 1; say(bk, VL.bkOk2(a, b), 4);
            s.done = true; S.cam.lock = null;
            yield vwait(1.2); bk.mood = 0;
            yield* LB.bublikTo(S, S.stations[2].home);
          },
        });
      } else {
        check(rk.count('jam') === x && rk.count('sugar') === y && rk.count() === 10, `варенье ${x}, сахар ${y}`);
        S.ask({
          text: `${x} + ? = 10`, answer: y, choices: makeChoices(S.rng, y), row: 6, cols: s.cols, speaker: bk,
          say: VL.bkQ3(x), eqDone: `${x} + ${y} = 10`, hints: [VL.bkH3a(), VL.bkH3b(x)],
          demo: function* () { const idx = []; rk.cells.forEach((v, i) => { if (v === 'sugar') idx.push(i); }); const k = yield* labelDemo(VL.bkCountSugar(), idx); check(k === y, 'показ: с сахаром ' + k + ' = ' + y); },
          onCorrect: function* () {
            rk.labels = null; bk.mood = 1; say(bk, VL.bkOk3(x), 4);
            s.done = true; S.flag.locked = false; S.cam.lock = null; S.phase = 'done';
            yield vwait(2); bk.mood = 0;
          },
        });
      }
    })();
  },
  fitX(x0, x1) {
    const rightM = G.touchUI ? 250 : 24;
    const Z = Math.min(G.baseZoom, (G.W - 24 - rightM) / (x1 - x0)), free = G.W - (x1 - x0) * Z;
    const left = free / 2 >= rightM ? (x0 + x1) / 2 - G.W / Z / 2 : x0 - 24 / Z;
    const top = tx(10) + 40 - G.H / Z;
    return { x: left + G.W / Z / 2, y: top + G.H / Z / 2, zoom: Z, make: () => LB.fitX(x0, x1) };
  },
  // кадр вопроса: Бублик, тележка, рама с блоками и Искра
  camLock(S, s) { return LB.fitX(s.X - 40, tc(s.cols[2]) + 80 + 24 + 8); },
  counted(S) {
    const s = S.cur;
    if (!s || !asking(S)) return null;
    const rk = s.rack, out = [];
    rk.cells.forEach((v, i) => {
      if (s.kind === 'fill') out.push(v ? { kind: 'булочка ' + (i + 1), group: 'bun', r: rk.bunRect(i) } : { kind: 'пустое место ' + (i + 1), group: 'empty', r: rk.placeRect(i) });
      else if (s.kind === 'sum') { if (v) out.push({ kind: (i < 5 ? 'верхний' : 'нижний') + ' поднос, булочка', group: i < 5 ? 'a' : 'b', r: rk.bunRect(i) }); }
      else out.push({ kind: (v === 'jam' ? 'с вареньем ' : 'с сахаром ') + (i + 1), group: v, r: rk.bunRect(i) });
    });
    return out.map(o => Object.assign(o, { skip: ['Искра'] }));
  },
  countRule(S, ok) {
    const s = S.cur, M = S.math;
    if (s.kind === 'fill') return [
      { name: 'булочек на тележке', visible: cnt(ok, o => o.group === 'bun'), expected: M.N },
      { name: 'пустых мест', visible: cnt(ok, o => o.group === 'empty'), expected: M.m },
    ];
    if (s.kind === 'sum') return [
      { name: 'на верхнем подносе', visible: cnt(ok, o => o.group === 'a'), expected: M.a },
      { name: 'на нижнем подносе', visible: cnt(ok, o => o.group === 'b'), expected: M.b },
    ];
    return [
      { name: 'с вареньем', visible: cnt(ok, o => o.group === 'jam'), expected: M.x },
      { name: 'с сахаром', visible: cnt(ok, o => o.group === 'sugar'), expected: M.y },
      { name: 'всего булочек', visible: ok.length, expected: 10 },
    ];
  },
  // пузыри не ложатся на тележки (даже до начала вопроса)
  avoidRects(S) { return S.stations.map(s => s.rack.bounds()); },
  selfCheck(S) {
    const M = S.math, [s1, s2, s3] = S.stations;
    const r1 = s1.rack.count(), loose = S.pops.filter(q => !q.taken).length;
    if (S.phase === 'collect' || s1.done) check(r1 + loose + S.flying === 10, `тележка 1: на полках ${r1} + на ящиках ${loose} + в полёте ${S.flying} = 10`);
    else if (S.phase !== 'pop') check(r1 === M.N, `тележка 1: ${r1} = ${M.N}`);
    check(s2.rack.cells.slice(0, 5).filter(Boolean).length === M.a && s2.rack.cells.slice(5).filter(Boolean).length === M.b, 'тележка 2: подносы a и b');
    check(s3.rack.count('jam') === M.x && s3.rack.count('sugar') === M.y, 'тележка 3: варенье x и сахар 10 − x');
    if (S.q && !S.q.solved && S.board && !S.board.solved) check(S.hud.text === '?', 'во время вопроса табличка не подсказывает');
  },
  drawBack(S, c) {
    // прилавки-палатки рынка на заднем плане (стоят на земле), печка, мешки с мукой
    const yG = tx(10);
    const tent = (x, w, col) => {
      c.save();
      c.fillStyle = 'rgba(30,20,10,0.22)'; c.beginPath(); c.ellipse(x + w / 2, yG + 1, w * 0.55, 7, 0, 0, 7); c.fill();
      for (const px of [x + 8, x + w - 8]) { c.fillStyle = '#8e5424'; c.strokeStyle = '#3e2410'; c.lineWidth = 2.5; rr(c, px - 5, yG - 200, 10, 200, 3); c.fill(); c.stroke(); }
      c.fillStyle = '#d8a066'; c.strokeStyle = '#4e2c10'; c.lineWidth = 3; rr(c, x - 4, yG - 70, w + 8, 70, 6); c.fill(); c.stroke();
      const n = Math.max(4, Math.round(w / 34));
      for (let i = 0; i < n; i++) { c.fillStyle = i % 2 ? '#fff4e6' : col; c.beginPath(); c.moveTo(x - 10 + i * (w + 20) / n, yG - 230); c.lineTo(x - 10 + (i + 1) * (w + 20) / n, yG - 230); c.lineTo(x - 10 + (i + 1) * (w + 20) / n, yG - 192); c.arc(x - 10 + (i + 0.5) * (w + 20) / n, yG - 192, (w + 20) / n / 2, 0, Math.PI); c.closePath(); c.fill(); }
      c.strokeStyle = '#4e2c10'; c.lineWidth = 2.5; c.strokeRect(x - 10, yG - 236, w + 20, 8);
      c.restore();
    };
    tent(tx(4) - 20, 150, '#74c0fc');
    tent(tx(62) + 300, 0, '#ffd43b');
    tent(tx(88) + 200, 0, '#8ce99a');
    drawOven(c, S.ovenX, yG, G.t);
    drawSack(c, tx(16) + 30, yG, 0.9); drawSack(c, tx(16) + 76, yG, 0.75);
    drawSack(c, tx(54) + 30, yG, 0.85); drawSack(c, tx(81) + 20, yG, 0.9); drawSack(c, tx(101) + 40, yG, 0.8);
  },
};
LEVELS.splice(3, 0, LB);
