'use strict';
// ===== Умножение: равные группы предметов. Всё, что видно, считается кодом (rects() — каждый предмет) =====
const _paintItem0 = paintItem;
paintItem = function (c, kind, s) {
  const r = s / 2; c.lineJoin = 'round'; c.lineCap = 'round';
  if (kind === 'berry') {   // малина-ягодка: красная шишечка из зёрнышек
    c.fillStyle = '#5c0e1a'; c.beginPath(); c.ellipse(0, -r, r * 0.92, r, 0, 0, 7); c.fill();
    for (let i = 0; i < 9; i++) { const a = i * 2.4, rr0 = (i % 3) * r * 0.3; const x = Math.cos(a) * rr0 * 0.9, y = -r + Math.sin(a) * rr0; sphere(c, x, y, r * 0.42, '#ffc2cf', '#e8284f', '#8f0f2c'); c.beginPath(); c.arc(x, y, r * 0.42, 0, 7); c.fill(); }
    c.fillStyle = '#4cae3a'; c.strokeStyle = '#256b14'; c.lineWidth = 1.4; for (const a of [-0.6, 0, 0.6]) { c.beginPath(); c.ellipse(Math.sin(a) * 7, -s - 1, 6, 3, a, 0, 7); c.fill(); c.stroke(); }
  } else if (kind === 'plum') {
    sphere(c, 0, -r, r, '#d8b4ff', '#7b3fd1', '#3b1475'); c.strokeStyle = '#26094f'; c.lineWidth = 2.2;
    c.beginPath(); c.ellipse(0, -r, r * 0.86, r, 0, 0, 7); c.fill(); c.stroke();
    c.strokeStyle = 'rgba(40,10,80,0.5)'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(0, -s + 4); c.quadraticCurveTo(r * 0.4, -r, 0, -3); c.stroke();
    c.strokeStyle = '#5b3313'; c.lineWidth = 3; c.beginPath(); c.moveTo(0, -s + 2); c.lineTo(3, -s - 5); c.stroke();
    c.fillStyle = 'rgba(255,255,255,0.7)'; c.beginPath(); c.ellipse(-r * 0.4, -r * 1.35, r * 0.18, r * 0.12, -0.6, 0, 7); c.fill();
  } else if (kind === 'lily') {   // кувшинка: лист + розовый цветок
    c.fillStyle = '#3aa64a'; c.strokeStyle = '#1e5e26'; c.lineWidth = 2; c.beginPath(); c.ellipse(0, -r * 0.45, r * 1.15, r * 0.45, 0, 0.25, Math.PI * 2 - 0.25); c.lineTo(0, -r * 0.45); c.closePath(); c.fill(); c.stroke();
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.42; c.save(); c.translate(0, -r * 0.6); c.rotate(a + Math.PI / 2); c.fillStyle = i % 2 ? '#ff9ec7' : '#ffc4dd'; c.strokeStyle = '#c2255c'; c.lineWidth = 1.3; c.beginPath(); c.ellipse(0, -r * 0.42, r * 0.2, r * 0.46, 0, 0, 7); c.fill(); c.stroke(); c.restore(); }
    c.fillStyle = '#ffd43b'; c.beginPath(); c.arc(0, -r * 0.62, r * 0.18, 0, 7); c.fill();
  } else if (kind === 'bushc') {  // кустик на грядке с тремя ягодками
    c.fillStyle = '#2f8a2a'; c.strokeStyle = '#174d14'; c.lineWidth = 2;
    for (const [x, y, rad] of [[-r * 0.5, -r * 0.7, r * 0.55], [r * 0.5, -r * 0.7, r * 0.55], [0, -r * 1.15, r * 0.62], [0, -r * 0.55, r * 0.6]]) { sphere(c, x, y, rad, '#9be37a', '#3fa337', '#1d5e19'); c.beginPath(); c.arc(x, y, rad, 0, 7); c.fill(); c.stroke(); }
    for (const [x, y] of [[-r * 0.45, -r * 0.6], [r * 0.4, -r * 0.95], [-r * 0.05, -r * 1.35]]) { sphere(c, x, y, r * 0.16, '#ffc2cf', '#e8284f', '#8f0f2c'); c.beginPath(); c.arc(x, y, r * 0.16, 0, 7); c.fill(); }
  } else _paintItem0(c, kind, s);
};
// раскладки: beds — грядки уходят назад; baskets — корзинки в ряд; grid — пруд (ряды ↕ можно повернуть); steps — ступеньки лестницы
const ML = {
  beds: { it: 'bushc', sz: 46, dx: 58, dy: 50 },
  baskets: { it: 'berry', sz: 30, bw: 104, gap: 16 },
  grid: { it: 'lily', sz: 42, dx: 54, dy: 48 },
  plums: { it: 'plum', sz: 38, dx: 50, dy: 46 },
  steps: { it: 'pear', sz: 28, sw: 132, sh: 48 },
};
class MulGroup extends Ent {
  constructor(lay, x, y, rows, cols) { super(x, y); Object.assign(this, { lay, rows, cols }); this.z = -0.5; this.hl = 0; this.lab = 0; this.rot = 0; this.shown = rows * cols; this.dx0 = 0; }
  get P() { return ML[this.lay]; }
  // позиция i-го предмета в группе g (низ предмета)
  pos(g, i) {
    const P = this.P, X = this.x + this.dx0, Y = this.y;
    if (this.lay === 'beds') return { x: X + 30 + i * P.dx + g * 14, y: Y - 14 - g * P.dy };
    if (this.lay === 'baskets') { const bx = X + g * (P.bw + P.gap) + P.bw / 2, k = i % 5, top = k >= 3; return { x: bx + (top ? (k - 3.5) * 30 : (k - 1) * 30), y: Y - 56 - (top ? 26 : 0) }; }
    if (this.lay === 'steps') return { x: X + g * P.sw + 20 + i * 25, y: Y - (g + 1) * P.sh };
    // grid/plums: ряд g, место i; поворот rot∈[0,1] переводит (ряд g, место i) → (ряд i, место g)
    const a = { x: X + 30 + i * P.dx, y: Y - 16 - g * P.dy }, b = { x: X + 30 + g * P.dx, y: Y - 16 - i * P.dy };
    const k = easeInOut(this.rot); return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) };
  }
  dims() { return this.rot >= 0.5 ? [this.cols, this.rows] : [this.rows, this.cols]; }
  width() {
    const P = this.P;
    if (this.lay === 'beds') return 60 + this.cols * P.dx + this.rows * 14;
    if (this.lay === 'baskets') return this.rows * (P.bw + P.gap);
    if (this.lay === 'steps') return this.rows * P.sw + 20;
    return 60 + Math.max(this.rows, this.cols) * P.dx;
  }
  height() { const P = this.P; if (this.lay === 'beds') return this.rows * P.dy + 60; if (this.lay === 'baskets') return 130; if (this.lay === 'steps') return (this.rows + 1) * P.sh + 20; return Math.max(this.rows, this.cols) * P.dy + 40; }
  count() { return Math.min(this.shown, this.rows * this.cols); }
  rects() {
    const P = this.P, out = []; let n = 0;
    for (let g = 0; g < this.rows; g++) for (let i = 0; i < this.cols; i++) { if (n++ >= this.shown) continue; const p = this.pos(g, i), s = P.sz; out.push({ kind: 'it', g, r: { x: p.x - s * 0.45, y: p.y - s * 0.95, w: s * 0.9, h: s * 0.9 } }); }
    return out;
  }
  bounds() { return [{ x: this.x + this.dx0, y: this.y - this.height(), w: this.width(), h: this.height() }]; }
  update(dt) { this.hl = Math.max(0, this.hl - dt); }
  drawBack(c) {
    const P = this.P, X = this.x + this.dx0, Y = this.y;
    if (this.lay === 'beds') for (let g = this.rows - 1; g >= 0; g--) {   // грядка: земляная полоса
      const y = Y - 14 - g * P.dy, x0 = X + 6 + g * 14, w = this.cols * P.dx + 36;
      c.fillStyle = '#5e3a1e'; rr(c, x0, y - 12, w, 20, 9); c.fill(); c.fillStyle = '#8a5a30'; rr(c, x0 + 3, y - 12, w - 6, 8, 5); c.fill();
    }
    if (this.lay === 'grid' || this.lay === 'plums') {   // пруд / скатерть под рядами
      const [R, C] = [Math.max(this.rows, this.cols), Math.max(this.rows, this.cols)];
      const h = this.lay === 'grid' ? (this.rot > 0 && this.rot < 1 ? R : this.dims()[0]) * P.dy + 18 : this.rows * P.dy + 18, w = (this.rot > 0 && this.rot < 1 ? C : this.dims()[1]) * P.dx + 24;
      c.fillStyle = this.lay === 'grid' ? 'rgba(40,140,200,0.78)' : 'rgba(255,240,200,0.92)'; c.strokeStyle = this.lay === 'grid' ? '#155a85' : '#b0682a'; c.lineWidth = 4;
      rr(c, X + 30 - P.dx / 2 - 6, Y - 4 - h, w, h, 18); c.fill(); c.stroke();
    }
    if (this.lay === 'steps') for (let g = 0; g < this.rows; g++) {   // ступеньки (декор, не платформы)
      const x0 = X + g * P.sw, y = Y - (g + 1) * P.sh;
      const gr = c.createLinearGradient(0, y, 0, Y); gr.addColorStop(0, '#d9a066'); gr.addColorStop(1, '#8a5a2b');
      c.fillStyle = gr; c.strokeStyle = '#4a2c12'; c.lineWidth = 3; rr(c, x0, y, P.sw, Y - y, 6); c.fill(); c.stroke();
      c.fillStyle = '#6cc04a'; rr(c, x0, y - 4, P.sw, 10, 5); c.fill();
    }
    if (this.lay === 'baskets') for (let g = 0; g < this.rows; g++) {   // корзинка (задняя стенка)
      const bx = X + g * (P.bw + P.gap); c.fillStyle = '#8a5a2b'; rr(c, bx + 4, Y - 96, P.bw - 8, 50, 10); c.fill();
    }
  }
  drawFrontParts(c) {
    const P = this.P, X = this.x + this.dx0, Y = this.y;
    if (this.lay === 'baskets') for (let g = 0; g < this.rows; g++) {   // корзинка: низкий борт, ягоды над ним
      const bx = X + g * (P.bw + P.gap);
      const gr = c.createLinearGradient(0, Y - 52, 0, Y - 6); gr.addColorStop(0, '#e4a35e'); gr.addColorStop(1, '#9a5e2a');
      c.fillStyle = gr; c.strokeStyle = '#4e2c10'; c.lineWidth = 3; c.beginPath(); c.moveTo(bx, Y - 54); c.lineTo(bx + P.bw, Y - 54); c.lineTo(bx + P.bw - 12, Y - 6); c.lineTo(bx + 12, Y - 6); c.closePath(); c.fill(); c.stroke();
      c.strokeStyle = 'rgba(78,44,16,0.5)'; c.lineWidth = 2; for (const yy of [Y - 40, Y - 24]) { c.beginPath(); c.moveTo(bx + 6, yy); c.lineTo(bx + P.bw - 6, yy); c.stroke(); }
    }
  }
  draw(c) {
    const P = this.P;
    this.drawBack(c);
    let n = 0;
    for (let g = 0; g < this.rows; g++) for (let i = 0; i < this.cols; i++) {
      if (n++ >= this.shown) continue;
      const p = this.pos(g, i);
      if (this.hl > 0) glow(c, p.x, p.y - P.sz / 2, P.sz, 'rgba(255,240,150,0.8)', Math.min(1, this.hl));
      drawItem(c, P.it, p.x, p.y, P.sz);
    }
    this.drawFrontParts(c);
    // подписи «по порядку»: 4, 8, 12 — у каждой группы
    for (let g = 0; g < Math.min(this.lab, this.groupsNow()); g++) { const l = this.labPos(g); bubbleNum(c, l.x, l.y, String((g + 1) * this.perNow())); }
  }
  groupsNow() { return this.dims()[0]; }
  perNow() { return this.dims()[1]; }
  labPos(g) {
    const P = this.P, X = this.x + this.dx0, Y = this.y;
    if (this.lay === 'beds') return { x: X + 30 + this.cols * P.dx + g * 14 + 18, y: Y - 26 - g * P.dy };
    if (this.lay === 'baskets') return { x: X + g * (P.bw + P.gap) + P.bw / 2, y: Y + 26 };
    if (this.lay === 'steps') return { x: X + g * P.sw + 45, y: Y - (g + 1) * P.sh + 28 };
    const [R, C] = this.dims(); return { x: X + 30 + C * P.dx - 4, y: Y - 34 - g * P.dy };
  }
}
function bubbleNum(c, x, y, s) {
  c.save(); c.font = font(26, 900); const w = Math.max(40, c.measureText(s).width + 20);
  c.fillStyle = '#fff8e6'; c.strokeStyle = '#c2410c'; c.lineWidth = 3; rr(c, x - w / 2, y - 18, w, 36, 18); c.fill(); c.stroke();
  txt(c, s, x, y, { size: 26, fill: '#c2410c' }); c.restore();
}
function easeInOut(t) { t = clamp(t, 0, 1); return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }
// подписи групп одна за другой: 4, 8, 12 (тик на каждую), в конце проверка кодом
function* countGroups(S, g) {
  g.lab = 0; const [R, C] = g.dims();
  for (let k = 1; k <= R; k++) { g.lab = k; Sound.count(Math.min(10, k)); yield 0.6; }
  check(g.lab === R && R * C === g.rows * g.cols && g.count() === g.rows * g.cols, `подписи: ${R} групп по ${C} = ${R * C}`);
}
// вагонетка под корзинками (едет по рельсам)
class Cart extends Ent {
  constructor(grp) { super(grp.x, grp.y); this.g = grp; this.z = -0.55; }
  draw(c) {
    const g = this.g, X = g.x + g.dx0 - 14, W = g.width() + 12, Y = g.y;
    c.strokeStyle = '#6b4a2a'; c.lineWidth = 6; c.beginPath(); c.moveTo(g.x - 2000, Y - 4); c.lineTo(g.x + 2400, Y - 4); c.stroke();
    c.fillStyle = '#7a6a5a'; c.strokeStyle = '#2f2a28'; c.lineWidth = 3; rr(c, X, Y - 34, W, 22, 6); c.fill(); c.stroke();
    const spin = g.dx0 / 18;
    for (const wx of [X + 26, X + W - 26]) { c.fillStyle = '#3a3a44'; c.beginPath(); c.arc(wx, Y - 12, 12, 0, 7); c.fill(); c.strokeStyle = '#c9c9d6'; c.lineWidth = 2; c.beginPath(); c.moveTo(wx + Math.cos(spin) * 10, Y - 12 + Math.sin(spin) * 10); c.lineTo(wx - Math.cos(spin) * 10, Y - 12 - Math.sin(spin) * 10); c.stroke(); }
  }
}
// облако босса и перья Щёлка
class BossCloud extends Ent {
  constructor(sh) { super(sh.x, sh.y); this.sh = sh; this.z = -0.2; this.feathers = 3; this.fall = []; }
  update(dt) { this.x = this.sh.x; this.y = this.sh.y; for (const f of this.fall) { f.t += dt; f.x += Math.sin(f.t * 4) * 60 * dt; f.y += 120 * dt; } this.fall = this.fall.filter(f => f.t < 3); }
  knock() { this.feathers--; const p = this.featherPos(this.feathers); this.fall.push({ x: p.x, y: p.y, t: 0 }); Sound.pop(); sparkBurst(p.x, p.y, 16, '#ffffff', 220); }
  featherPos(i) { const sh = this.sh; return { x: sh.x + (i - 1) * 30, y: sh.y - 62 }; }
  draw(c) {
    const sh = this.sh; if (!sh.vis) return;
    cloud(c, sh.x, sh.y + 88, 1.2, 0.96);
    for (let i = 0; i < this.feathers; i++) { const p = this.featherPos(i); drawFeather(c, p.x, p.y, (i - 1) * 0.35); }
    for (const f of this.fall) { c.save(); c.globalAlpha = clamp(3 - f.t, 0, 1); drawFeather(c, f.x, f.y, Math.sin(f.t * 5)); c.restore(); }
  }
}
function drawFeather(c, x, y, a) {
  c.save(); c.translate(x, y); c.rotate(a); c.scale(1.4, 1.4);
  const g = c.createLinearGradient(0, -34, 0, 6); g.addColorStop(0, '#ff6b9d'); g.addColorStop(0.5, '#ffd43b'); g.addColorStop(1, '#4dabf7');
  c.fillStyle = g; c.strokeStyle = '#5b2a50'; c.lineWidth = 2; c.beginPath(); c.moveTo(0, 6); c.quadraticCurveTo(-14, -14, 0, -36); c.quadraticCurveTo(14, -14, 0, 6); c.fill(); c.stroke();
  c.beginPath(); c.moveTo(0, 6); c.lineTo(0, -30); c.stroke(); c.restore();
}
// Жужа летает рядом с Искрой (или в заданной точке)
class Bee extends NPC {
  constructor(x, y, S) { super('zhuzha', x, y, 1); this.S = S; this.fly = true; this.z = 1.5; this.follow = true; this.hx = null; }
  update(dt) {
    super.update(dt);
    const p = this.S.p; let tx, ty;
    if (this.hx != null) { tx = this.hx; ty = this.hy; }
    else { tx = p.x - 110 * (p.face || 1); ty = p.y - 120; }
    ty += Math.sin(G.t * 3 + this.ph) * 10;
    const k = 1 - Math.exp(-dt * 3); this.x += (tx - this.x) * k; this.y += (ty - this.y) * k;
    if (Math.abs(tx - this.x) > 4) this.face = tx > this.x ? 1 : -1;
    if (this.hx == null && Math.abs(p.x - this.x) < 60) this.face = p.face || 1;
  }
  draw(c) {
    // крылышки машут: лёгкое покачивание всей картинки
    c.save(); c.translate(this.x, this.y); c.rotate(Math.sin(G.t * 9) * 0.04); c.translate(-this.x, -this.y); super.draw(c); c.restore();
  }
}
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
