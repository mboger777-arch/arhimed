'use strict';
// ===== «Часы»: часы на столбе, двери/фонари-ответы, Тик-Так, шестерёнки, подносы, доски моста =====

// ---------- Часы на столбе (не висят в воздухе: стоят на столбе с основанием) ----------
// стрелки плавно доезжают до заданного времени (в минутах): часовая всегда = (h mod 12)·30 + m·0,5
class ClockPost extends Ent {
  constructor(x, ground, r, h, m, o = {}) {
    super(x, ground); this.r = r; this.z = -1.5; this.ground = ground; this.o = o;
    this.post = o.post !== undefined ? o.post : 150;            // высота столба под часами
    this.T = h * 60 + m; this.shown = this.T;                     // минуты от 0:00 (может идти через сутки)
    this.digital = o.digital || null; this.ticks5 = 0; this.hourHL = 0; this.minHL = 0; this.label = o.label || null; this.dark = !!o.dark;
  }
  get cy() { return this.ground - this.post - this.r * 1.1; }
  setTime(h, m) { this.T = h * 60 + m; }
  addMin(d) { this.T += d; }
  get hm() { const t = ((Math.round(this.T) % 1440) + 1440) % 1440; return [Math.floor(t / 60), t % 60]; }
  get settled() { return Math.abs(this.shown - this.T) < 0.01; }
  update(dt) {
    const d = this.T - this.shown; const sp = Math.max(40, Math.abs(d) * 3.5) * dt;
    this.shown = Math.abs(d) <= sp ? this.T : this.shown + Math.sign(d) * sp;
    this.hourHL = Math.max(0, this.hourHL - dt * 0.6); this.minHL = Math.max(0, this.minHL - dt * 0.6);
  }
  // углы ровно по формуле из clock.js (показываемое время может быть «в пути» между значениями)
  angles() { const t = ((this.shown % 1440) + 1440) % 1440, h = Math.floor(t / 60), m = t - h * 60; return { hour: CLK.hourAng(h, m), min: CLK.minAng(m) }; }
  rect() { const R = this.r * 1.12, top = this.r * (this.ticks5 ? 1.45 : 1.44); return { x: this.x - R - (this.ticks5 ? this.r * 0.27 : 0), y: this.cy - top, w: 2 * R + (this.ticks5 ? this.r * 0.54 : 0), h: top + this.r * 1.2 + (this.digital ? this.r * 0.75 + 8 : 0) }; }
  audit(add) { add('часы на столбе', this.x, this.ground, { feet: 20 }); }
  draw(c) {
    const x = this.x, g = this.ground, top = this.cy + this.r * 1.05;
    // столб: кованая стойка с основанием
    c.fillStyle = 'rgba(30,20,10,0.25)'; c.beginPath(); c.ellipse(x, g, 46, 9, 0, 0, 7); c.fill();
    const pg = c.createLinearGradient(x - 14, 0, x + 14, 0); pg.addColorStop(0, '#4a3020'); pg.addColorStop(0.5, '#8a6040'); pg.addColorStop(1, '#4a3020');
    c.fillStyle = pg; c.fillRect(x - 13, top, 26, g - top - 18);
    c.fillStyle = '#5a3a22'; rr(c, x - 40, g - 22, 80, 22, 8); c.fill(); rr(c, x - 24, top - 4, 48, 16, 6); c.fill();
    if (this.label) { c.save(); c.font = font(28, 900); const tw = c.measureText(this.label).width + 28; woodPanel(c, x - tw / 2, g - 92, tw, 44, 12, 3); txt(c, this.label, x, g - 70, { size: 28, fill: '#fff8e6', stroke: '#5b3313', sw: 6 }); c.restore(); }
    drawClockFace(c, x, this.cy, this.r, 0, 0, { noHands: this.noHands, hands: this.angles(), ticks5: this.ticks5, hourHL: this.hourHL > 0, minHL: this.minHL > 0, dark: this.dark, digital: this.digital === true ? (() => { const [h, m] = this.hm; return CLK.dig(h, m); })() : this.digital });
  }
}

// ---------- Ответ-предмет: дверь (встань и прыгни), фонарь (постой под ним) ----------
// В S.q.blocks наравне с блоками: tx, ty, value, state, hl, dead. Тесты «настоящим вводом» видят их так же.
class ChoiceObj extends Ent {
  constructor(mode, tx, groundRow, value, q, o = {}) {
    super(tx * TILE + TILE / 2, groundRow * TILE); this.mode = mode; this.tx = tx; this.ty = groundRow; this.value = value; this.q = q; this.o = o;
    this.wT = 1; this.state = 'idle'; this.hl = 0; this.shake = 0; this.bump = 0; this.appear = 0; this.charge = 0; this.z = -1.2;
    this.clock = o.clock || null;   // [h, m] — часы над дверью
    this.label = o.label || null;
  }
  get bw() { return this.mode === 'door' ? 150 : 90; }
  update(dt) { this.appear = Math.min(1, this.appear + dt * 2.5); this.hl = Math.max(0, this.hl - dt); this.shake = Math.max(0, this.shake - dt * 2.2); this.bump = Math.max(0, this.bump - dt * 4); }
  clockR() { return this.mode === 'door' ? 62 : 0; }
  rect() {
    if (this.mode === 'door') return { x: this.x - 82, y: this.y - 440, w: 164, h: 440 };
    return { x: this.x - 50, y: this.y - 300, w: 100, h: 300 };
  }
  clockRect() { const r = this.clockR() * 1.1; return { x: this.x - r, y: this.y - 432, w: 2 * r, h: 2 * r }; }
  labelRect() { return this.mode === 'door' ? { x: this.x - 80, y: this.y - 300 - 8, w: 160, h: 64 } : { x: this.x - 72, y: this.y - 202, w: 144, h: 64 }; }
  audit(add) { add(this.mode === 'door' ? 'дверь' : 'фонарь-ответ', this.x, this.y, { feet: 30 }); }
  draw(c) {
    const k = easeOutBack(this.appear), sx = Math.sin(this.shake * 40) * 5 * this.shake;
    c.save(); c.globalAlpha = Math.min(1, this.appear * 1.5); c.translate(this.x + sx, this.y);
    if (this.mode === 'door') {
      // дверь мастерской в каменной арке; над ней — часы
      c.fillStyle = 'rgba(30,20,10,0.25)'; c.beginPath(); c.ellipse(0, 0, 80, 10, 0, 0, 7); c.fill();
      c.fillStyle = '#7d6a5a'; rr(c, -78, -210, 156, 210, [70, 70, 4, 4]); c.fill();
      const open = this.state === 'used' ? 1 : 0;
      const dg = c.createLinearGradient(0, -190, 0, 0); dg.addColorStop(0, this.state === 'wrong' ? '#c0503a' : '#a0622a'); dg.addColorStop(1, this.state === 'wrong' ? '#8a2e20' : '#6e3d16');
      c.fillStyle = open ? '#2a1a10' : dg; rr(c, -60, -192, 120, 192, [60, 60, 2, 2]); c.fill();
      if (open) { glow(c, 0, -90, 120, 'rgba(255,220,120,0.8)', 0.9); }
      else { c.strokeStyle = 'rgba(60,30,10,0.6)'; c.lineWidth = 3; for (const xx of [-30, 0, 30]) { c.beginPath(); c.moveTo(xx, -180); c.lineTo(xx, 0); c.stroke(); } c.fillStyle = '#ffd43b'; c.beginPath(); c.arc(38, -90, 7, 0, 7); c.fill(); }
      if (this.hl > 0) { c.save(); c.globalCompositeOperation = 'lighter'; c.globalAlpha = this.hl * 0.6; c.fillStyle = '#fff6c0'; rr(c, -60, -192, 120, 192, [60, 60, 2, 2]); c.fill(); c.restore(); }
      // кронштейн и часы над аркой (держатся на стене-арке)
      c.fillStyle = '#5a3a22'; c.fillRect(-8, -300, 16, 92);
      if (this.clock) drawClockFace(c, 0, -432 + this.clockR() * 1.1, this.clockR(), this.clock[0], this.clock[1], {});
      if (this.label) { c.font = font(30, 900); const tw = Math.max(110, c.measureText(this.label).width + 30); woodPanel(c, -tw / 2, -300, tw, 50, 14, 4); txt(c, this.label, 0, -274, { size: 30, fill: '#fff8e6', stroke: '#5b3313', sw: 6 }); }
    } else {
      // фонарь на столбе: разгорается, пока Искра стоит под ним
      c.fillStyle = 'rgba(30,20,10,0.25)'; c.beginPath(); c.ellipse(0, 0, 40, 8, 0, 0, 7); c.fill();
      c.fillStyle = '#3e3550'; c.fillRect(-7, -230, 14, 230); rr(c, -26, -14, 52, 14, 5); c.fill();
      const lit = this.state === 'used' ? 1 : this.charge;
      glow(c, 0, -255, 70 + lit * 60, 'rgba(255,220,120,0.9)', 0.25 + lit * 0.75);
      c.fillStyle = this.state === 'wrong' ? '#c05040' : `rgb(${Math.round(120 + 135 * lit)},${Math.round(110 + 110 * lit)},${Math.round(90 + 30 * lit)})`;
      rr(c, -24, -290, 48, 60, 10); c.fill(); c.strokeStyle = '#2a2236'; c.lineWidth = 4; c.stroke();
      if (this.charge > 0 && this.state !== 'used') { c.strokeStyle = '#ffd43b'; c.lineWidth = 6; c.beginPath(); c.arc(0, -260, 40, -Math.PI / 2, -Math.PI / 2 + this.charge * Math.PI * 2); c.stroke(); }
      if (this.label) { c.font = font(32, 900); const tw = Math.max(100, c.measureText(this.label).width + 26); drawDigital(c, 0, -170, 20, this.label); }
    }
    c.restore();
  }
}

// ---------- Тик-Так: озорной медвежонок (арт Пончика из «Весов»). Бегает по земле и прыгает дугой ----------
class Cub extends NPC {
  constructor(x, y, face = 1) { super('tiktak', x, y, face); this.h = 118; this.mode = 'idle'; this.vis = true; this.jt = 0; this.speed = 420; this.key = 0; this.gear = false; }
  runTo(x) { this.mode = 'run'; this.tx = x; }
  jumpTo(x, y, dur = 0.6, hgt = 160) { this.mode = 'jump'; this.j = { x0: this.x, y0: this.y, x1: x, y1: y, t: 0, dur, hgt }; if (x !== this.x) this.face = x > this.x ? 1 : -1; }
  get arrived() { return this.mode === 'idle'; }
  update(dt) {
    super.update(dt); this.key += dt * (this.mode === 'idle' ? 3 : 14);
    if (this.mode === 'run') {
      const d = this.tx - this.x; this.face = d > 0 ? 1 : -1;
      if (Math.abs(d) <= this.speed * dt) { this.x = this.tx; this.mode = 'idle'; } else this.x += Math.sign(d) * this.speed * dt;
      if (this.level) this.y = groundBelow(this.level, this.x, this.y - 40);
    } else if (this.mode === 'jump') {
      const j = this.j; j.t += dt; const k = Math.min(1, j.t / j.dur);
      this.x = lerp(j.x0, j.x1, k); this.y = lerp(j.y0, j.y1, k) - Math.sin(k * Math.PI) * j.hgt;
      if (k >= 1) { this.mode = 'idle'; dust(this.x, this.y, 5); }
    }
  }
  get im() { return IMG.tiktak; }
  bounceY() { return this.mode === 'run' ? -Math.abs(Math.sin(G.t * 18)) * 6 : 0; }
  rect() { return super.rect(); }
  draw(c) {
    if (!this.vis || this.alpha <= 0) return;
    if (this.mode === 'jump') { const gy = this.level ? groundBelow(this.level, this.x, this.y) : this.y; c.fillStyle = 'rgba(30,20,10,0.2)'; c.beginPath(); c.ellipse(this.x, gy, 26, 6, 0, 0, 7); c.fill(); }
    super.draw(c);
    if (this.gear) drawGear(c, this.x - this.face * 10, this.y - this.h - 12 + this.bounceY(), 18, G.t * 3);
    if (this.hands) {   // несёт стрелки над головой
      const hx = this.x - this.face * 6, hy = this.y - this.h - 8 + this.bounceY();
      c.save(); c.translate(hx, hy); c.rotate(-0.5 * this.face); c.lineCap = 'round';
      c.strokeStyle = '#1d1d26'; c.lineWidth = 9; c.beginPath(); c.moveTo(-34, 0); c.lineTo(20, 0); c.stroke();
      c.strokeStyle = '#d23c2a'; c.lineWidth = 5; c.beginPath(); c.moveTo(-40, 12); c.lineTo(46, 12); c.stroke(); c.restore();
    }
  }
}

// ---------- шестерёнка ----------
function drawGear(c, x, y, r, rot = 0, col = '#ffcc33', dark = '#8a5a00') {
  c.save(); c.translate(x, y); c.rotate(rot);
  c.beginPath(); const n = 8;
  for (let i = 0; i < n * 2; i++) { const a0 = i / (n * 2) * Math.PI * 2, R = i % 2 ? r * 0.78 : r; c.lineTo(Math.cos(a0 - 0.12) * R, Math.sin(a0 - 0.12) * R); c.lineTo(Math.cos(a0 + 0.12) * R, Math.sin(a0 + 0.12) * R); }
  c.closePath(); const g = c.createRadialGradient(-r * 0.3, -r * 0.3, 1, 0, 0, r); g.addColorStop(0, '#fff3b0'); g.addColorStop(1, col);
  c.fillStyle = g; c.fill(); c.strokeStyle = dark; c.lineWidth = Math.max(2, r * 0.1); c.stroke();
  c.fillStyle = dark; c.beginPath(); c.arc(0, 0, r * 0.28, 0, 7); c.fill();
  c.restore();
}
class GearPickup extends Ent {
  constructor(x, y) { super(x, y); this.z = 1; this.got = false; this.t = 0; this.vis = true; }
  update(dt) { this.t += dt; }
  audit(add) { if (!this.got) add('шестерёнка', this.x, this.y, { feet: 10 }); }
  draw(c) {
    if (this.got || !this.vis) return;
    glow(c, this.x, this.y - 26, 64, 'rgba(255,214,90,0.8)', 0.9);
    drawGear(c, this.x, this.y - 26, 26, this.t * 1.5);   // стоит на ребре на полке, крутится на месте
    if (Math.floor(this.t * 6) % 5 === 0) sparkBurst(this.x + frand(-20, 20), this.y - 26 + frand(-14, 14), 1, '#fff6b0', 40);
  }
}
// HUD: пять шестерёнок (сколько вернули). Имя оставлено от «гирек» — так табличка движка рисует иконки.
function drawWeightIcon(c, x, y, on, s = 30) {
  c.save();
  if (on) { glow(c, x, y - s * 0.5, s * 1.1, 'rgba(255,214,90,0.85)', 0.9); drawGear(c, x, y - s * 0.55, s * 0.5, 0); }
  else drawGear(c, x, y - s * 0.55, s * 0.5, 0, '#7a7468', '#4a443a');
  c.restore();
}
// Искра нашла шестерёнку
function gearGot(S) {
  S.weightsHave = (S.weightsBase || 0) + 1; Sound.secret(); Sound.ura(); G.shake = 0.15;
  sparkBurst(S.p.x, S.p.y - 60, 30, '#ffe066', 380);
  spawn({ type: 'num', text: 'Шестерёнка!', x: S.p.x, y: S.p.y - 150, vy: -40, life: 1.4, size: 40 });
  if (S.flag) S.flag.locked = false;
}

// ---------- поднос на стойке (уровень 3): одна клетка-доска, стоит на ножке ----------
class Tray extends Ent {
  constructor(col, row, ground, n) { super(tc(col), row * TILE); this.col = col; this.row = row; this.ground = ground; this.n = n; this.z = -1; this.lit = false; this.t = 0; }
  update(dt) { this.t += dt; }
  audit(add) { add('поднос (ножка)', this.x, this.ground, { feet: 10 }); }
  draw(c) {
    const x = this.x, y = this.y;
    c.fillStyle = '#6b4a2a'; c.fillRect(x - 6, y + 14, 12, this.ground - y - 14);
    c.fillStyle = '#5a3a22'; rr(c, x - 22, this.ground - 12, 44, 12, 5); c.fill();
    const g = c.createLinearGradient(0, y, 0, y + 16); g.addColorStop(0, this.lit ? '#fff2a0' : '#d9d2c4'); g.addColorStop(1, this.lit ? '#f0b400' : '#9c958a');
    c.fillStyle = g; rr(c, x - 34, y, 68, 16, 7); c.fill(); c.strokeStyle = '#5b4a3a'; c.lineWidth = 3; c.stroke();
    if (this.lit) { glow(c, x, y, 50, 'rgba(255,220,120,0.6)', 0.7); }
  }
}

// ---------- доски моста (уровень 4): ложатся в пролёт по одной ----------
class BridgeGap extends Ent {
  constructor(c0, n, row, pw = 3) { super(tx(c0), row * TILE); this.c0 = c0; this.n = n; this.pw = pw; this.row = row; this.laid = 0; this.solid = false; this.z = -1; this.anim = []; }
  lay() { if (this.laid >= 6) return; this.anim.push({ i: this.laid, t: 0 }); this.laid++; Sound.bump(); dust(tx(this.c0 + (this.laid - 1) * this.pw) + this.pw * 32, this.y, 6); }
  clear() { for (let i = 0; i < this.laid; i++) puff(tx(this.c0 + i * this.pw) + this.pw * 32, this.y, 6); this.laid = 0; this.anim = []; }
  fix() { this.solid = true; for (let i = 0; i < this.n * this.pw; i++) this.level.set(this.c0 + i, this.row, T_ONEWAY_DYN); }
  update(dt) { for (const a of this.anim) a.t = Math.min(1, a.t + dt * 3); }
  draw(c) {
    // сваи по краям пролёта
    for (let i = 0; i <= this.n; i++) { const xx = tx(this.c0 + i * this.pw) + (i === 0 ? -6 : i === this.n ? 6 : 0); c.fillStyle = '#5a3a22'; c.fillRect(xx - 8, this.y - 6, 16, this.level.pxH - this.y + 20); }   // сваи уходят в воду до дна
    for (let i = 0; i < this.laid; i++) {
      const a = this.anim.find(o => o.i === i), k = a ? easeOutBack(a.t) : 1, X = tx(this.c0 + i * this.pw) + 2, Y = this.y - (1 - k) * 60, PWp = this.pw * TILE - 4;
      const over = i >= this.n;   // лишняя доска торчит за край
      c.save(); if (over) { c.translate(X, Y); c.rotate(0.25); c.translate(-X, -Y); }
      const g = c.createLinearGradient(0, Y, 0, Y + 22); g.addColorStop(0, '#d9a066'); g.addColorStop(1, '#8a5a2b');
      c.fillStyle = g; rr(c, X, Y, PWp, 22, 5); c.fill(); c.strokeStyle = '#5a3a1a'; c.lineWidth = 2.5; c.stroke();
      txt(c, '1 час', X + PWp / 2, Y + 11, { size: 18, fill: '#fff8e6', stroke: '#5b3313', sw: 4 });
      c.restore();
    }
  }
}

// ---------- кнопки-блоки «назад / вперёд / готово» (крутим стрелку): ответ — по q.custom ----------
// уровень сам решает, что делает удар по блоку (S.q.custom(b) → true, если вопрос решён)
