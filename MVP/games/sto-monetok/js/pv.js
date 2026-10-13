'use strict';
// ===== Десятки и единицы: трубочки по 10 монеток, ящики по 10 яблок, отдельные монетки/яблоки =====
// Всё, что видно, считается кодом: rects() отдаёт прямоугольник КАЖДОГО десятка и КАЖДОЙ единицы (для проверки видимости).
const PV = {
  coin: { tenW: 46, tenH: 132, tenGap: 10, oneW: 38, oneH: 24, tierH: 30, stack: 1 },
  apple: { tenW: 132, tenH: 70, tenGap: 10, oneW: 40, oneH: 40, tierH: 46, stack: 3 },
};
function drawTube(c, x, yb, a = 1) {
  // стеклянная трубочка: ровно 10 монеток стопкой, подставка снизу
  c.save(); c.globalAlpha *= a;
  c.fillStyle = 'rgba(60,30,10,0.3)'; c.beginPath(); c.ellipse(x, yb - 2, 26, 6, 0, 0, 7); c.fill();
  c.fillStyle = '#8a5a2b'; rr(c, x - 24, yb - 14, 48, 14, 5); c.fill(); c.strokeStyle = '#4a2c12'; c.lineWidth = 2.5; c.stroke();
  for (let i = 0; i < 10; i++) {
    const y = yb - 22 - i * 11;
    c.fillStyle = '#9a6400'; c.beginPath(); c.ellipse(x, y + 3, 16, 6, 0, 0, 7); c.fill();
    const g = c.createLinearGradient(x - 16, 0, x + 16, 0); g.addColorStop(0, '#d18b00'); g.addColorStop(0.4, '#fff3a0'); g.addColorStop(1, '#c77d00');
    c.fillStyle = g; c.strokeStyle = '#6b4300'; c.lineWidth = 1.6; c.beginPath(); c.ellipse(x, y, 16, 6, 0, 0, 7); c.fill(); c.stroke();
  }
  c.fillStyle = 'rgba(210,240,255,0.22)'; rr(c, x - 21, yb - 132, 42, 120, 12); c.fill();
  c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 3; rr(c, x - 21, yb - 132, 42, 120, 12); c.stroke();
  c.fillStyle = 'rgba(255,255,255,0.55)'; rr(c, x - 15, yb - 124, 6, 96, 3); c.fill();
  c.restore();
}
function drawCrate10(c, x, yb, a = 1) {
  // ящик-десяток: два ряда по 5 яблок, все видны над низким бортом
  c.save(); c.globalAlpha *= a;
  const w = 132, h = 40;
  c.fillStyle = 'rgba(60,30,10,0.3)'; c.beginPath(); c.ellipse(x, yb - 2, w / 2 + 4, 7, 0, 0, 7); c.fill();
  c.fillStyle = '#7a4a1e'; rr(c, x - w / 2, yb - h - 18, w, 20, 5); c.fill();
  for (let i = 0; i < 5; i++) drawItem(c, 'apple', x - 48 + i * 24, yb - h + 2, 22);
  for (let i = 0; i < 5; i++) drawItem(c, 'apple', x - 52 + i * 26, yb - 16, 24);
  const g = c.createLinearGradient(0, yb - 22, 0, yb); g.addColorStop(0, '#e4a35e'); g.addColorStop(1, '#9a5e2a');
  c.fillStyle = g; c.strokeStyle = '#4e2c10'; c.lineWidth = 2.5; rr(c, x - w / 2, yb - 22, w, 22, 5); c.fill(); c.stroke();
  c.strokeStyle = 'rgba(78,44,16,0.5)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(x - w / 2 + 4, yb - 11); c.lineTo(x + w / 2 - 4, yb - 11); c.stroke();
  c.fillStyle = '#fff3c4'; rr(c, x - 17, yb - 20, 34, 18, 5); c.fill();
  txt(c, '10', x, yb - 11, { size: 16, fill: '#7a3e00' });
  c.restore();
}
function drawTen(c, kind, x, yb, a) { if (kind === 'coin') drawTube(c, x, yb, a); else drawCrate10(c, x, yb, a); }
function drawOne(c, kind, x, yb) { if (kind === 'coin') drawItem(c, 'coin', x, yb, 30); else drawItem(c, 'apple', x, yb, 32); }
class PVGroup extends Ent {
  // x — левый край, y — земля. slots: сколько мест для десятков показывать пунктиром (уровень «ровно 100»)
  constructor(kind, x, y, tens, ones, o = {}) { super(x, y); Object.assign(this, { kind, tens, ones, slots: o.slots || 0, label: o.label || null, noShelf: !!o.noShelf, cap: o.cap || 0, capOnes: o.capOnes || 0 }); this.stk = o.stack || 0; this.z = -0.5; this.hl = 0; this.flash = []; }
  get P() { return PV[this.kind]; }
  tenPos(i) { const P = this.P, K = this.stk || P.stack; if (K > 1) return { x: this.x + P.tenW / 2 + Math.floor(i / K) * (P.tenW + P.tenGap), yb: this.y - (i % K) * (P.tenH - 4) }; return { x: this.x + P.tenW / 2 + i * (P.tenW + P.tenGap), yb: this.y }; }
  tensW(n = Math.max(this.tens, this.slots, this.cap)) { const P = this.P; const cols = Math.ceil(n / (this.stk || P.stack)); return cols ? cols * (P.tenW + P.tenGap) : 0; }
  shelfX() { return this.x + this.tensW() + 22; }
  frameW() { return 2 * this.P.oneW + 16; }
  frames() { return Math.max(1, Math.ceil(Math.max(this.ones, this.capOnes || 0) / 10)); }
  onePos(i) { const P = this.P, f = Math.floor(i / 10), k = i % 10; return { x: this.shelfX() + f * (this.frameW() + 10) + 8 + P.oneW / 2 + (k % 2) * P.oneW, yb: this.y - 10 - Math.floor(k / 2) * P.tierH }; }
  width() { return this.noShelf ? this.tensW() : this.shelfX() - this.x + this.frames() * (this.frameW() + 10); }
  tiers() { return Math.max(1, Math.ceil(this.ones / 5)); }
  value() { return this.tens * 10 + this.ones; }
  rects() {
    const P = this.P, out = [];
    for (let i = 0; i < this.tens; i++) { const p = this.tenPos(i); out.push({ kind: 'ten', r: { x: p.x - P.tenW / 2, y: p.yb - P.tenH, w: P.tenW, h: P.tenH } }); }
    for (let i = 0; i < this.ones; i++) { const p = this.onePos(i); out.push({ kind: 'one', r: { x: p.x - P.oneW / 2 + 3, y: p.yb - P.oneH, w: P.oneW - 6, h: P.oneH } }); }
    return out;
  }
  bounds() { const r = this.rects().map(o => o.r); if (!this.noShelf) for (let f = 0; f < this.frames(); f++) r.push({ x: this.shelfX() + f * (this.frameW() + 10), y: this.y - 14 - 5 * this.P.tierH, w: this.frameW(), h: 5 * this.P.tierH + 14 }); for (let i = 0; i < this.slots; i++) { const p = this.tenPos(i); r.push({ x: p.x - this.P.tenW / 2, y: p.yb - this.P.tenH, w: this.P.tenW, h: this.P.tenH }); } return r; }
  update(dt) { this.hl = Math.max(0, this.hl - dt); }
  draw(c) {
    const P = this.P;
    for (let i = this.tens; i < this.slots; i++) { const p = this.tenPos(i); c.save(); c.setLineDash([8, 7]); c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 3; rr(c, p.x - P.tenW / 2 + 3, p.yb - P.tenH + 4, P.tenW - 6, P.tenH - 8, 12); c.stroke(); c.restore(); }
    for (let i = 0; i < this.tens; i++) { const p = this.tenPos(i); if (this.hl > 0) glow(c, p.x, p.yb - P.tenH / 2, P.tenH * 0.7, 'rgba(255,240,150,0.8)', Math.min(1, this.hl)); drawTen(c, this.kind, p.x, p.yb); }
    // стойка-«десятирамка»: 2 столбика по 5 полочек (10 мест) — видно, сколько до десятка
    if (!this.noShelf) for (let f = 0; f < this.frames(); f++) {
      const fx = this.shelfX() + f * (this.frameW() + 10), fw = this.frameW(), top = this.y - 10 - 5 * P.tierH;
      c.fillStyle = '#6b4220'; c.fillRect(fx, top, 6, this.y - top); c.fillRect(fx + fw - 6, top, 6, this.y - top);
      for (let t = 0; t < 5; t++) { const y = this.y - 10 - t * P.tierH; const g = c.createLinearGradient(0, y, 0, y + 8); g.addColorStop(0, '#e0a868'); g.addColorStop(1, '#8a5a2b'); c.fillStyle = g; c.strokeStyle = '#4a2c12'; c.lineWidth = 1.5; rr(c, fx - 2, y, fw + 4, 8, 3); c.fill(); c.stroke(); }
    }
    for (let i = 0; i < this.ones; i++) { const p = this.onePos(i); drawOne(c, this.kind, p.x, p.yb); }
    if (this.label) { const w = this.width(); txt(c, this.label, this.x + w / 2, this.y + 34, { size: 30, fill: '#fff8e6', stroke: '#5b3313', sw: 7 }); }
  }
}
// летящий десяток (трубочка/ящик) — по дуге
class FlyTen extends Ent {
  constructor(kind, x0, y0, x1, y1, dur, onEnd) { super(x0, y0); Object.assign(this, { kind, x0, y0, x1, y1, dur, onEnd }); this.t = 0; this.z = 4; }
  update(dt) { this.t += dt; if (this.t >= this.dur) { this.dead = true; this.onEnd && this.onEnd(); } }
  draw(c) { const k = Math.min(1, this.t / this.dur); drawTen(c, this.kind, lerp(this.x0, this.x1, k), lerp(this.y0, this.y1, k) - Math.sin(k * Math.PI) * 110); }
}
// табличка со знаком между группами («+», «−»)
class SignPlate extends Ent {
  constructor(x, y, s) { super(x, y); this.s = s; this.z = -0.6; this.vis = true; }
  rect() { return { x: this.x - 30, y: this.y - 150, w: 60, h: 60 }; }
  draw(c) {
    if (!this.vis) return;
    c.fillStyle = '#6b4220'; c.fillRect(this.x - 4, this.y - 96, 8, 96);
    c.fillStyle = '#fff3c4'; c.strokeStyle = '#5b3313'; c.lineWidth = 4; c.beginPath(); c.arc(this.x, this.y - 120, 30, 0, 7); c.fill(); c.stroke();
    txt(c, this.s, this.x, this.y - 122, { size: 50, fill: '#e8590c', stroke: '#5b3313', sw: 4 });
  }
}
// перенос одной группы в другую по одному (видно, что ничего не пропало); в конце — проверка кодом
function* mergeGroups(S, A, B) {
  const want = A.value() + B.value(), k1 = A.kind === 'coin' ? 'coin' : 'apple', sz = A.kind === 'coin' ? 30 : 32; let pend = 0;
  while (B.ones > 0) { const p = B.onePos(B.ones - 1); B.ones--; const q = A.onePos(A.ones + pend); pend++; S.L.add(new FlyItem(k1, sz, p.x, p.yb, q.x, q.yb, 0.4, () => { A.ones++; pend--; Sound.pop(); }, 70)); yield 0.16; }
  yield 0.45;
  while (B.tens > 0) { B.tens--; const p = B.tenPos(B.tens), q = A.tenPos(A.tens + pend); pend++; S.L.add(new FlyTen(A.kind, p.x, p.yb, q.x, q.yb, 0.5, () => { A.tens++; pend--; Sound.pop(); })); yield 0.32; }
  yield 0.6; yield () => pend === 0;
  check(A.value() === want && B.value() === 0, `сложили: стало ${A.value()} = ${want}`);
}
// 10 отдельных → один десяток (обмен)
function* regroupUp(S, A) {
  check(A.ones >= 10, 'обмен: есть 10 отдельных');
  const want = A.value(), q = A.tenPos(A.tens);
  for (let k = 0; k < 10; k++) { const p = A.onePos(A.ones - 1); A.ones--; S.L.add(new FlyItem(A.kind === 'coin' ? 'coin' : 'apple', 30, p.x, p.yb, q.x, q.yb - 40, 0.35, () => Sound.count(k + 1), 60)); yield 0.14; }
  yield 0.4; A.tens++; puff(q.x, q.yb - 60, 12); sparkBurst(q.x, q.yb - 60, 20, '#fff1a0', 260); Sound.sparkle();
  yield 0.5; check(A.value() === want, `обмен: ${want} осталось ${want}`);
}
// один десяток → 10 отдельных (разбить ящик)
function* regroupDown(S, A) {
  check(A.tens >= 1, 'разбить: есть десяток');
  const want = A.value(); A.tens--; const p = A.tenPos(A.tens); puff(p.x, p.yb - 40, 14, '#e0a868'); Sound.bump(); G.shake = 0.12; let pend = 0;
  for (let k = 0; k < 10; k++) { const q = A.onePos(A.ones + pend); pend++; S.L.add(new FlyItem(A.kind === 'coin' ? 'coin' : 'apple', 32, p.x, p.yb - 30, q.x, q.yb, 0.4, () => { A.ones++; pend--; Sound.count(k + 1); }, 80)); yield 0.14; }
  yield 0.6; yield () => pend === 0; check(A.value() === want, `разбили ящик: всё ещё ${want}`);
}
// забрать: сначала n1 отдельных, потом t десятков — летят к Щёлку
function* takeAway(S, A, t, n1, to) {
  const want = A.value() - t * 10 - n1;
  for (let k = 0; k < n1; k++) { const p = A.onePos(A.ones - 1); A.ones--; S.L.add(new FlyItem(A.kind === 'coin' ? 'coin' : 'apple', 32, p.x, p.yb, to.x, to.y, 0.5, null, 90)); Sound.pop(); yield 0.17; }
  for (let k = 0; k < t; k++) { A.tens--; const p = A.tenPos(A.tens); S.L.add(new FlyTen(A.kind, p.x, p.yb, to.x, to.y + 40, 0.55, null)); Sound.pop(); yield 0.3; }
  yield 0.6; check(A.value() === want, `осталось ${A.value()} = ${want}`);
}
// сундук Казны (пролог, карта)
function drawChest(c, x, yb, s = 1, open = 1) {
  c.save(); c.translate(x, yb); c.scale(s, s);
  c.fillStyle = 'rgba(40,20,0,0.3)'; c.beginPath(); c.ellipse(0, -2, 120, 14, 0, 0, 7); c.fill();
  const body = (y, h, c0, c1) => { const g = c.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, c0); g.addColorStop(1, c1); return g; };
  c.fillStyle = body(-110, 110, '#c0703a', '#6e3a14'); c.strokeStyle = '#3e1f08'; c.lineWidth = 5; rr(c, -110, -110, 220, 110, 14); c.fill(); c.stroke();
  c.fillStyle = '#ffcc29'; c.strokeStyle = '#8a5a00'; c.lineWidth = 3;
  for (const bx of [-80, 68]) { rr(c, bx, -110, 14, 110, 4); c.fill(); c.stroke(); }
  rr(c, -20, -80, 40, 44, 8); c.fill(); c.stroke(); c.fillStyle = '#3e1f08'; c.beginPath(); c.arc(0, -64, 6, 0, 7); c.fill(); c.fillRect(-3, -62, 6, 14);
  // крышка
  c.save(); c.translate(0, -110); c.rotate(-0.5 * open);
  c.fillStyle = body(-60, 60, '#d9844a', '#8a4a1c'); c.strokeStyle = '#3e1f08'; c.lineWidth = 5; c.beginPath(); c.moveTo(-110, 0); c.lineTo(-110, -30); c.quadraticCurveTo(0, -80, 110, -30); c.lineTo(110, 0); c.closePath(); c.fill(); c.stroke();
  c.restore();
  c.restore();
}
// воздушный шар (финал)
class Balloon extends Ent {
  constructor(x, y) { super(x, y); this.z = -0.8; this.lift = 0; this.iskra = false; this.arch = false; }
  basketTop() { return this.y - 70 - this.lift; }
  draw(c) {
    const x = this.x, yb = this.y - this.lift, sw = Math.sin(G.t * 1.3) * 4;
    // корзина
    if (this.iskra) drawSprite(c, IMG.iskra_idle, x - 30, yb - 30, 150);
    if (this.arch) drawSprite(c, IMG.arch_cheer, x + 40, yb - 30, 190 * (ARCH_META.cheer.hs || 1));
    const g = c.createLinearGradient(0, yb - 74, 0, yb); g.addColorStop(0, '#d9964f'); g.addColorStop(1, '#7c4a20');
    c.fillStyle = g; c.strokeStyle = '#4e2c10'; c.lineWidth = 4; rr(c, x - 100, yb - 74, 200, 74, 14); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(78,44,16,0.5)'; c.lineWidth = 2; for (let i = 1; i < 6; i++) { c.beginPath(); c.moveTo(x - 100 + i * 33, yb - 72); c.lineTo(x - 100 + i * 33, yb - 2); c.stroke(); }
    // стропы
    const cx = x + sw, R = 150, cy = yb - 74 - 150 - R, neck = yb - 74 - 110;
    c.strokeStyle = '#5a3a18'; c.lineWidth = 3; for (const k of [-1, -0.35, 0.35, 1]) { c.beginPath(); c.moveTo(x + k * 92, yb - 72); c.lineTo(cx + k * 42, neck); c.stroke(); }
    // купол-капля в цветную полоску
    const shape = () => { c.beginPath(); c.moveTo(cx - 40, neck); c.bezierCurveTo(cx - R * 1.25, cy + R * 0.55, cx - R * 1.15, cy - R * 0.9, cx, cy - R); c.bezierCurveTo(cx + R * 1.15, cy - R * 0.9, cx + R * 1.25, cy + R * 0.55, cx + 40, neck); c.closePath(); };
    const cols = ['#ff6b6b', '#ffd43b', '#4dabf7', '#69db7c', '#f783ac', '#ffa94d', '#ff6b6b'];
    c.save(); shape(); c.clip();
    for (let i = 0; i < 7; i++) { c.fillStyle = cols[i]; c.fillRect(cx - R * 1.3 + i * (R * 2.6 / 7), cy - R - 10, R * 2.6 / 7 + 1, R * 2.4); }
    const sh = c.createRadialGradient(cx - R * 0.4, cy - R * 0.5, 10, cx, cy, R * 1.4); sh.addColorStop(0, 'rgba(255,255,255,0.45)'); sh.addColorStop(0.5, 'rgba(255,255,255,0)'); sh.addColorStop(1, 'rgba(60,20,40,0.35)');
    c.fillStyle = sh; c.fillRect(cx - R * 1.4, cy - R * 1.2, R * 2.8, R * 2.6);
    c.restore();
    c.strokeStyle = '#5b3313'; c.lineWidth = 5; shape(); c.stroke();
    c.fillStyle = '#7c4a20'; rr(c, cx - 44, neck - 6, 88, 14, 5); c.fill();
  }
}
