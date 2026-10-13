'use strict';
// Мешочки по десять монет и монеты россыпью: числа 10–20, «десяток и ещё…». Вагонетки над пропастью.
let CAVE_BG = null;
function drawCaveBg(c, L, cam) {
  const W = Math.ceil(G.W), H = Math.ceil(G.H + 120);
  if (!CAVE_BG || CAVE_BG.w !== W) {
    const cv = document.createElement('canvas'); cv.width = W * 2; cv.height = H; const g = cv.getContext('2d');
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#1a0f33'); bg.addColorStop(0.6, '#2c1a52'); bg.addColorStop(1, '#3a2266'); g.fillStyle = bg; g.fillRect(0, 0, W * 2, H);
    const rnd = mulberry32(77);
    // дальние стены-скалы
    for (let layer = 0; layer < 2; layer++) {
      g.fillStyle = layer ? '#241544' : '#1d1238';
      g.beginPath(); g.moveTo(0, H); for (let x = 0; x <= W * 2; x += 60) g.lineTo(x, H * (0.55 + layer * 0.12) + Math.sin(x * 0.01 + layer) * 40 + rnd() * 30); g.lineTo(W * 2, H); g.fill();
    }
    // сталактиты
    for (let i = 0; i < 40; i++) { const x = rnd() * W * 2, w = 20 + rnd() * 50, h = 60 + rnd() * 170; const gg = g.createLinearGradient(x - w / 2, 0, x + w / 2, 0); gg.addColorStop(0, '#2a1a4a'); gg.addColorStop(0.5, '#4a3576'); gg.addColorStop(1, '#22143e'); g.fillStyle = gg; g.beginPath(); g.moveTo(x - w / 2, -5); g.quadraticCurveTo(x - w * 0.2, h * 0.6, x, h); g.quadraticCurveTo(x + w * 0.2, h * 0.6, x + w / 2, -5); g.fill(); }
    // светящиеся кристаллы
    for (let i = 0; i < 26; i++) {
      const x = rnd() * W * 2, y = H * (0.5 + rnd() * 0.4), s = 14 + rnd() * 30, hue = rnd() < 0.5 ? [120, 220, 255] : [255, 120, 220];
      const gl = g.createRadialGradient(x, y, 2, x, y, s * 3); gl.addColorStop(0, `rgba(${hue},0.45)`); gl.addColorStop(1, `rgba(${hue},0)`); g.fillStyle = gl; g.fillRect(x - s * 3, y - s * 3, s * 6, s * 6);
      g.fillStyle = `rgba(${hue},0.9)`; g.strokeStyle = 'rgba(255,255,255,0.6)'; g.lineWidth = 1.5;
      for (const [dx, a, k] of [[0, 0, 1], [-s * 0.5, -0.4, 0.7], [s * 0.5, 0.35, 0.75]]) { g.save(); g.translate(x + dx, y); g.rotate(a); g.beginPath(); g.moveTo(-s * 0.22 * k, 0); g.lineTo(0, -s * 1.4 * k); g.lineTo(s * 0.22 * k, 0); g.closePath(); g.fill(); g.stroke(); g.restore(); }
    }
    CAVE_BG = { w: W, cv };
  }
  const off = ((cam.x * 0.25 * G.zoom) % (W * 2) + W * 2) % (W * 2), py = -((cam.y / Math.max(1, L.pxH - viewH())) * 60);
  c.drawImage(CAVE_BG.cv, off, 0, Math.min(W, W * 2 - off), H, 0, py, Math.min(W, W * 2 - off), H);
  if (W * 2 - off < W) c.drawImage(CAVE_BG.cv, 0, 0, W - (W * 2 - off), H, W * 2 - off, py, W - (W * 2 - off), H);
  // мерцающие пылинки
  for (let i = 0; i < 14; i++) { const x = (i * 211 + G.t * 12) % G.W, y = (i * 97) % G.H; c.fillStyle = `rgba(200,220,255,${0.25 + 0.25 * Math.sin(G.t * 2 + i)})`; c.beginPath(); c.arc(x, y, 2, 0, 7); c.fill(); }
}
// сундук: мешочки «10» + монеты россыпью сверху
