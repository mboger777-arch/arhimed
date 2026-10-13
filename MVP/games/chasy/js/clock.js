'use strict';
// ===== Часы: точные углы стрелок и русские названия времени (проверено tools/clocktest.js) =====
// Углы от «12» по часовой стрелке, в градусах:
//   минутная = m·6°,  часовая = (h mod 12)·30° + m·0,5°  → в 7:30 часовая ровно посередине между 7 и 8.
const CLK = (function () {
  const minAng = m => m * 6;
  const hourAng = (h, m) => (h % 12) * 30 + m * 0.5;
  const pl = (n, a, b, c) => { const n10 = n % 10, n100 = n % 100; if (n10 === 1 && n100 !== 11) return a; if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return b; return c; };
  // количественные: часы (м.р.) и минуты (ж.р.)
  const NUM = ['ноль', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять', 'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать', 'двадцать'];
  const TENS = { 20: 'двадцать', 30: 'тридцать', 40: 'сорок', 50: 'пятьдесят', 60: 'шестьдесят', 90: 'девяносто', 100: 'сто', 120: 'сто двадцать', 180: 'сто восемьдесят' };
  const numM = n => { if (n <= 20) return NUM[n]; if (TENS[n]) return TENS[n]; const t = Math.floor(n / 10) * 10; return TENS[t] + ' ' + NUM[n % 10]; };
  const numF = n => numM(n).replace(/(^| )один$/, '$1одна').replace(/(^| )два$/, '$1две');
  const hoursW = n => pl(n, 'час', 'часа', 'часов');
  const minW = n => pl(n, 'минута', 'минуты', 'минут');
  const hoursT = n => `${n === 1 ? 'один' : numM(n)} ${hoursW(n)}`;          // «один час», «два часа», «пять часов», «двадцать один час»
  const minT = n => `${numF(n)} ${minW(n)}`;                                    // «одна минута», «две минуты», «пятнадцать минут»
  // порядковые в род. падеже: «половина ВОСЬМОГО»
  const ORD = ['', 'первого', 'второго', 'третьего', 'четвёртого', 'пятого', 'шестого', 'седьмого', 'восьмого', 'девятого', 'десятого', 'одиннадцатого', 'двенадцатого'];
  const h12 = h => { const r = h % 12; return r === 0 ? 12 : r; };
  const next = h => h12(h) % 12 + 1;
  // как называем время на циферблате (h 0..23, m из 0,15,30,45; остальное — «N минут такого-то»)
  function say(h, m) {
    const H = h12(h);
    if (m === 0) return H === 1 ? 'час' : `${numM(H)} ${hoursW(H)}`;
    if (m === 30) return `половина ${ORD[next(h)]}`;
    if (m === 15) return `четверть ${ORD[next(h)]}`;
    if (m === 45) { const N = next(h); return `без четверти ${N === 1 ? 'час' : numM(N)}`; }
    if (m < 30) return `${minT(m)} ${ORD[next(h)]}`;
    const r = 60 - m; return `без ${['', 'одной', 'двух', 'трёх', 'четырёх', 'пяти', 'шести', 'семи', 'восьми', 'девяти', 'десяти', 'одиннадцати', 'двенадцати', 'тринадцати', 'четырнадцати', 'пятнадцати', 'шестнадцати', 'семнадцати', 'восемнадцати', 'девятнадцати', 'двадцати'][r] || r} ${r === 1 ? 'минуты' : 'минут'} ${next(h) === 1 ? 'час' : numM(next(h))}`;
  }
  const dig = (h, m) => `${h}:${String(m).padStart(2, '0')}`;
  // длительность: «2 часа», «45 минут», «1 час 30 минут»
  function durT(min) { const h = Math.floor(min / 60), m = min % 60; return [h ? hoursT(h) : '', m ? minT(m) : ''].filter(Boolean).join(' '); }
  function durD(min) { const h = Math.floor(min / 60), m = min % 60; return [h ? `${h} ${hoursW(h)}` : '', m ? `${m} мин` : ''].filter(Boolean).join(' '); }
  const add = (h, m, d) => { const t = ((h * 60 + m + d) % 1440 + 1440) % 1440; return [Math.floor(t / 60), t % 60]; };
  return { minAng, hourAng, pl, hoursW, minW, hoursT, minT, say, dig, durT, durD, add, numM, numF, h12, ORD };
})();

// ---------- рисуем циферблат ----------
// c — контекст, (x,y) — центр, r — радиус. o: {h, m, digital, glow, hourHL, minHL, ticks5, dark, noHands, faceOnly (без звонков и ножек), hands:{hour, min} (углы вручную)}
function drawClockFace(c, x, y, r, h, m, o = {}) {
  c.save(); c.translate(x, y);
  // стиль «А»: красный будильник с двумя золотыми звонками и ножками
  const R6 = Math.PI / 180, lw = k => Math.max(1.5, r * k);
  if (!o.faceOnly) {
  c.fillStyle = 'rgba(30,15,0,0.22)'; c.beginPath(); c.ellipse(0, r * 1.2, r * 1.0, r * 0.12, 0, 0, 7); c.fill();
  c.strokeStyle = '#b0161b'; c.lineWidth = lw(0.097); c.lineCap = 'round';
  c.beginPath(); c.moveTo(-r * 0.7, r * 0.8); c.lineTo(-r * 0.95, r * 1.18); c.moveTo(r * 0.7, r * 0.8); c.lineTo(r * 0.95, r * 1.18); c.stroke();
  for (const sd of [-1, 1]) {
    c.save(); c.rotate(sd * 38 * R6); c.translate(0, -r * 1.08);
    const bg = c.createRadialGradient(-r * 0.06, -r * 0.09, r * 0.03, 0, 0, r * 0.42); bg.addColorStop(0, '#ffe066'); bg.addColorStop(1, '#e8a400');
    c.fillStyle = bg; c.beginPath(); c.arc(0, 0, r * 0.36, Math.PI, 0); c.closePath(); c.fill();
    c.strokeStyle = '#8a5a00'; c.lineWidth = lw(0.024); c.stroke(); c.restore();
  }
  c.strokeStyle = '#8a5a00'; c.lineWidth = lw(0.06); c.beginPath(); c.moveTo(0, -r * 1.05); c.lineTo(0, -r * 1.25); c.stroke();
  }
  const g = c.createRadialGradient(-r * 0.4, -r * 0.4, r * 0.1, 0, 0, r * 1.15); g.addColorStop(0, '#ff6b6b'); g.addColorStop(1, '#c1121f');
  c.fillStyle = g; c.beginPath(); c.arc(0, 0, r * 1.12, 0, 7); c.fill();
  c.strokeStyle = '#7a0a10'; c.lineWidth = lw(0.03); c.stroke();
  const fg = c.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
  fg.addColorStop(0, o.dark ? '#e2e6f6' : '#fffdf6'); fg.addColorStop(1, o.dark ? '#b4bad8' : '#fff4e0');
  c.fillStyle = fg; c.beginPath(); c.arc(0, 0, r, 0, 7); c.fill();
  // 60 делений, через 5 — длинные
  c.strokeStyle = '#3b2412'; c.lineCap = 'round';
  for (let i = 0; i < 60; i++) {
    const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r0 = r * (big ? 0.84 : 0.9), r1 = r * 0.96;
    c.lineWidth = big ? Math.max(2.5, r * 0.035) : Math.max(1, r * 0.012);
    c.beginPath(); c.moveTo(Math.sin(a) * r0, -Math.cos(a) * r0); c.lineTo(Math.sin(a) * r1, -Math.cos(a) * r1); c.stroke();
  }
  // подсветка делений-пятёрок (уровень 3: считаем по 5)
  if (o.ticks5) for (let i = 1; i <= o.ticks5; i++) {
    const a = i * 30 * Math.PI / 180, R = r * 0.73;
    c.fillStyle = 'rgba(255,190,40,0.9)'; c.beginPath(); c.arc(Math.sin(a) * r * 1.0, -Math.cos(a) * r * 1.0, r * 0.075, 0, 7); c.fill();
    c.font = font(Math.round(r * 0.15), 900); c.textAlign = 'center'; c.textBaseline = 'middle';
    const tx = Math.sin(a) * r * 1.27, ty = -Math.cos(a) * r * 1.27; c.fillStyle = '#fffdf6'; c.beginPath(); c.arc(tx, ty, r * 0.12, 0, 7); c.fill(); c.strokeStyle = '#c2410c'; c.lineWidth = lw(0.015); c.stroke(); c.fillStyle = '#c2410c'; c.fillText(String(i * 5), tx, ty + r * 0.01);
  }
  // цифры
  c.font = font(Math.round(r * 0.24), 900); c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#1f2a44';
  for (let n = 1; n <= 12; n++) { const a = n * 30 * Math.PI / 180, R = r * 0.68; c.fillText(String(n), Math.sin(a) * R, -Math.cos(a) * R + r * 0.015); }
  if (!o.noHands) {
    const ha = (o.hands ? o.hands.hour : CLK.hourAng(h, m)) * Math.PI / 180, ma = (o.hands ? o.hands.min : CLK.minAng(m)) * Math.PI / 180;
    const hand = (a, len, wid, col, hl) => {
      c.save(); c.rotate(a);
      if (hl) { c.strokeStyle = 'rgba(255,230,90,0.85)'; c.lineWidth = wid + r * 0.07; c.beginPath(); c.moveTo(0, r * 0.12); c.lineTo(0, -len); c.stroke(); }
      c.strokeStyle = col; c.lineWidth = wid; c.beginPath(); c.moveTo(0, r * 0.12); c.lineTo(0, -len); c.stroke();
      c.fillStyle = col; c.beginPath(); c.moveTo(-wid * 0.9, -len + wid * 0.4); c.lineTo(0, -len - wid * 1.3); c.lineTo(wid * 0.9, -len + wid * 0.4); c.fill();
      c.restore();
    };
    hand(ha, r * 0.5, Math.max(5, r * 0.085), '#1d4ed8', o.hourHL);   // часовая — короткая, толстая, синяя
    hand(ma, r * 0.8, Math.max(3, r * 0.04), '#e11d48', o.minHL);     // минутная — длинная, тонкая, красная
    c.fillStyle = '#ffd43b'; c.beginPath(); c.arc(0, 0, r * 0.09, 0, 7); c.fill(); c.strokeStyle = '#8a5a00'; c.lineWidth = lw(0.018); c.stroke();
  }
  c.restore();
  if (o.digital) drawDigital(c, x, y + r * 1.25 + r * 0.32 + 6, r * 0.3, o.digital);
}
// электронное табло «7:30»
function drawDigital(c, x, y, s, text) {
  c.save(); c.font = font(Math.round(s * 1.5), 900);
  const w = c.measureText(text).width + s * 1.4, h = s * 2.1;
  c.fillStyle = '#1b2433'; rr(c, x - w / 2, y - h / 2, w, h, s * 0.4); c.fill();
  c.strokeStyle = '#6b7a99'; c.lineWidth = 3; c.stroke();
  c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = '#7dffb0'; c.shadowColor = '#3cff8a'; c.shadowBlur = 10;
  c.fillText(text, x, y + s * 0.08); c.restore();
}
if (typeof module !== 'undefined') module.exports = { CLK };
