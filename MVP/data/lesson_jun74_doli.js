/* ============ УРОК 74 · «ПОЛОВИНА ЯБЛОКА» · доли: половина и четверть ============

   История: короткий комикс (MVP/data/lessons.js) → v937 урок в мире игры владельца «Половина яблока»
   (github mboger777-arch/polovina-yabloka) → 21.10.2026 владелец: «давай 74 переделай так же как 71»
   (урок 71 v941 — образец: один сильный образ-предмет, герои в ролях, всё стоит на земле, вывесок нет,
   много своего рисунка и движения).

   ГЛАВНАЯ МЫСЛЬ: ПОЛОВИНА — ЭТО КОГДА ВЕСЫ СТОЯТ РОВНО. У ёжика Тоши есть весы-коромысло и яблокорезка.
   Разрезал яблоко на две части, положил на чаши — весы ровно: части равные, каждая — половина. Кривой
   разрез Хапуна весы сразу выдают. Половина от 8 яблок — разложи по чашам, пока весы не встанут ровно:
   по 4 (8 : 2 = 4). Четверть — одна из четырёх равных частей; две четвертинки весят как половинка.

   ГЕРОИ игры (img/l74/): лисичка Рыжинка, ёжик Тоша — изобретатель, сова Умка, енот Хапун — хитрец.
   Вектор: яблоко и его дольки (мякоть, семечки, кожура), латунные весы с чашами и стрелкой, яблокорезка
   с ножом и шестерёнкой, стол со скатертью, корзины, тележка, мостки с сушилкой для рыбы, постамент
   с золотым блюдом, гирлянда фонариков. Всё стоит на траве, на столе или на мостках.
   Движок — общий набор MVP/data/jun_kit.js (перетаскивание, живые герои, Nunito).

   КАДРЫ (10): разрежь и взвесь половинки · где половинки (тарелка на весы) · Золотое яблоко на четверых ·
   половина от 8 на весах · четверть от 12 на скатерти · Хапун хитрит (весы перекошены) · половина улова ·
   две четвертинки = половинка · загадки Хапуна (тележки приезжают) · собери Золотое яблоко. */
(function(){
  'use strict';
  if (!window.ДК) return;
  const ID = 74;
  const РАЗМЕРЫ = { fox: [186, 300], hog: [209, 300], owl: [216, 300], villain: [272, 300], apple: [157, 160], apple_gold: [141, 160],
    fish_a: [101, 90], fish_b: [102, 90], fish_c: [101, 90], fish_d: [101, 90], star: [107, 110] };
  const РЫБЫ = ['fish_a', 'fish_b', 'fish_c', 'fish_d'];
  const р = Math.PI / 180, ф2 = (v) => +v.toFixed(2);
  let N = 0;

  /* ═══════════ градиенты ═══════════ */
  const ГРАД = `<defs>
    <radialGradient id="п74-кожа" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#ff9c82"/><stop offset=".42" stop-color="#ee3b34"/><stop offset=".8" stop-color="#bd1a22"/><stop offset="1" stop-color="#7a0e14"/></radialGradient>
    <radialGradient id="п74-золото" cx=".36" cy=".3" r=".78"><stop offset="0" stop-color="#fffbd2"/><stop offset=".4" stop-color="#ffd84a"/><stop offset=".8" stop-color="#e0a020"/><stop offset="1" stop-color="#8a5a08"/></radialGradient>
    <radialGradient id="п74-мякоть" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fffdf2"/><stop offset=".7" stop-color="#fff2cc"/><stop offset="1" stop-color="#f4dc9c"/></radialGradient>
    <radialGradient id="п74-мякотьЗ" cx=".5" cy=".5" r=".6"><stop offset="0" stop-color="#fffde6"/><stop offset=".7" stop-color="#ffefa6"/><stop offset="1" stop-color="#f2c85a"/></radialGradient>
    <linearGradient id="п74-лист" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9be86a"/><stop offset="1" stop-color="#2f8a2a"/></linearGradient>
    <linearGradient id="п74-трава" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6dc6a"/><stop offset=".45" stop-color="#6cb244"/><stop offset="1" stop-color="#3f7f28"/></linearGradient>
    <linearGradient id="п74-пол" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a7a6a"/><stop offset="1" stop-color="#4a3e34"/></linearGradient>
    <linearGradient id="п74-латунь" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b4"/><stop offset=".45" stop-color="#e8b040"/><stop offset="1" stop-color="#8a5a10"/></linearGradient>
    <linearGradient id="п74-латуньВ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a5a10"/><stop offset=".4" stop-color="#ffe9a0"/><stop offset=".6" stop-color="#e8b040"/><stop offset="1" stop-color="#7a4a08"/></linearGradient>
    <linearGradient id="п74-сталь" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3f8"/><stop offset=".5" stop-color="#a8b4c2"/><stop offset="1" stop-color="#5a6676"/></linearGradient>
    <linearGradient id="п74-доска" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2cf98"/><stop offset="1" stop-color="#c4884a"/></linearGradient>
    <linearGradient id="п74-корзина" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2ad5e"/><stop offset="1" stop-color="#8a5622"/></linearGradient>
    <radialGradient id="п74-тарелка" cx=".5" cy=".4" r=".6"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eaf1f6"/><stop offset="1" stop-color="#b6c4d0"/></radialGradient>
    <linearGradient id="п74-вода" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd2ee" stop-opacity=".75"/><stop offset="1" stop-color="#1f6a9a" stop-opacity=".9"/></linearGradient>
    <radialGradient id="п74-фонарь" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff8c0"/><stop offset=".45" stop-color="#ffd860" stop-opacity=".85"/><stop offset="1" stop-color="#ffb030" stop-opacity="0"/></radialGradient>
    <radialGradient id="п74-камень" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#f4efe6"/><stop offset=".6" stop-color="#cfc6b8"/><stop offset="1" stop-color="#8a8072"/></radialGradient>
    <pattern id="п74-клетка" width="16" height="16" patternUnits="userSpaceOnUse"><rect width="16" height="16" fill="#fff6ea"/><rect width="8" height="8" fill="#e8564a"/><rect x="8" y="8" width="8" height="8" fill="#e8564a"/><rect width="16" height="16" fill="#fff" opacity=".08"/></pattern>
  </defs>`;

  /* ═══════════ земля, дымка, стол, столбик с окошком ═══════════ */
  const дымка = `<rect width="360" height="300" fill="#fff8e6" opacity=".2" pointer-events="none"/>`;
  function земля(y, вид){
    const камень = вид === 'камень', h = 300 - y;
    const пучки = Array.from({ length: 16 }, (_, k) => { const x = (k * 53 + 17) % 360, yy = y + 8 + (k * 29) % Math.max(10, h - 12);
      return камень ? `<ellipse cx="${x}" cy="${yy}" rx="${6 + k % 4 * 2}" ry="${3 + k % 3}" fill="url(#п74-камень)" opacity=".7"/>`
        : `<path d="M${x - 4},${yy} q2,-8 4,-10 q0,6 1,10 q2,-7 5,-9 q-1,6 -1,9 Z" fill="#3f8a2a" opacity=".75"/>`; }).join('');
    const цветы = камень ? '' : Array.from({ length: 7 }, (_, k) => { const x = (k * 71 + 40) % 360, yy = y + 14 + (k * 37) % Math.max(10, h - 18);
      return `<g transform="translate(${x},${yy})">${[0, 72, 144, 216, 288].map(a => `<circle cx="${ф2(2.6 * Math.cos(a * р))}" cy="${ф2(2.6 * Math.sin(a * р))}" r="1.9" fill="${['#fff', '#ffe36a', '#ffb8d0'][k % 3]}"/>`).join('')}<circle r="1.4" fill="#f0a020"/></g>`; }).join('');
    return `<g pointer-events="none"><path d="M0,${y + 3} Q60,${y - 4} 120,${y + 1} T240,${y} T360,${y + 2} V300 H0 Z" fill="url(#п74-${камень ? 'пол' : 'трава'})"/>
      <path d="M0,${y + 3} Q60,${y - 4} 120,${y + 1} T240,${y} T360,${y + 2}" stroke="${камень ? '#2a2420' : '#4f9a32'}" stroke-width="2" fill="none" opacity=".6"/>${пучки}${цветы}</g>`;
  }
  /* стол: верх y, ноги — высота ножек, скатерть — клетчатая со складками */
  const стол = (x0, x1, y, ноги, скатерть) => `<g pointer-events="none"><ellipse cx="${(x0 + x1) / 2}" cy="${y + ноги + 3}" rx="${(x1 - x0) * .52}" ry="5" fill="rgba(30,15,5,.3)"/>
    <rect x="${x0 + 8}" y="${y + 6}" width="7" height="${ноги}" fill="#6b4422"/><rect x="${x1 - 15}" y="${y + 6}" width="7" height="${ноги}" fill="#6b4422"/>
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="9" rx="3" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.6"/>
    ${скатерть ? `<path d="M${x0 - 2},${y - 1} H${x1 + 2} V${y + 16} ${Array.from({ length: Math.round((x1 - x0) / 20) }, (_, k) => { const w = (x1 - x0 + 4) / Math.round((x1 - x0) / 20); return `Q${x1 + 2 - (k + .5) * w},${y + 23} ${x1 + 2 - (k + 1) * w},${y + 16}`; }).join(' ')} Z" fill="url(#п74-клетка)" stroke="#a83a30" stroke-width="1.2"/>`
      : `<path d="M${x0 + 4},${y + 2.5} H${x1 - 4}" stroke="#f4cf9a" stroke-width="1.4" opacity=".7"/>`}</g>`;
  /* окошко для ответа на деревянном столбике, вкопанном в землю */
  const столбик = (н, x, yО, yЗ, занято, зона) => `${зона ? н.зона('окно', x - 34, yО - 34, 68, 68) : ''}
    <g pointer-events="none"><ellipse cx="${x}" cy="${yЗ}" rx="13" ry="4" fill="rgba(30,15,5,.35)"/><rect x="${x - 4}" y="${yО + 20}" width="8" height="${yЗ - yО - 20}" fill="url(#дк-полка)" stroke="#5b3416"/>
    <circle cx="${x}" cy="${yО}" r="29" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="2"/>
    ${[0, 1, 2, 3, 4, 5].map(k => `<circle cx="${ф2(x + 25 * Math.cos(k * 60 * р))}" cy="${ф2(yО + 25 * Math.sin(k * 60 * р))}" r="1.6" fill="#5b3416"/>`).join('')}</g>
    ${н.окошко(x, yО, занято, 21)}`;

  /* ═══════════ ЯБЛОКО и его части ═══════════ */
  function яблоко(r, з, лист){
    const к = з ? 'золото' : 'кожа';
    const тело = `M0,${-.7 * r} C${.36 * r},${-1.02 * r} ${1.02 * r},${-.92 * r} ${.99 * r},${-.1 * r} C${.97 * r},${.6 * r} ${.52 * r},${r} ${.14 * r},${.93 * r} C${.06 * r},${.9 * r} ${-.06 * r},${.9 * r} ${-.14 * r},${.93 * r} C${-.52 * r},${r} ${-.97 * r},${.6 * r} ${-.99 * r},${-.1 * r} C${-1.02 * r},${-.92 * r} ${-.36 * r},${-1.02 * r} 0,${-.7 * r} Z`;
    return `<path d="${тело}" fill="url(#п74-${к})" stroke="${з ? '#8a5a08' : '#6a0c10'}" stroke-width="${ф2(Math.max(.8, r * .05))}"/>
      <ellipse cx="${ф2(-.42 * r)}" cy="${ф2(-.3 * r)}" rx="${ф2(.16 * r)}" ry="${ф2(.3 * r)}" transform="rotate(24 ${ф2(-.42 * r)} ${ф2(-.3 * r)})" fill="#fff" opacity=".5"/>
      <circle cx="${ф2(-.2 * r)}" cy="${ф2(-.6 * r)}" r="${ф2(.07 * r)}" fill="#fff" opacity=".75"/>
      <path d="M0,${ф2(-.66 * r)} Q${ф2(-.03 * r)},${ф2(-.9 * r)} ${ф2(.1 * r)},${ф2(-1.12 * r)}" stroke="#5a3418" stroke-width="${ф2(.1 * r)}" fill="none" stroke-linecap="round"/>
      ${лист === false ? '' : `<g transform="translate(${ф2(.06 * r)},${ф2(-.98 * r)})"><g class="п74-лист"><path d="M0,0 C${ф2(.18 * r)},${ф2(-.32 * r)} ${ф2(.6 * r)},${ф2(-.32 * r)} ${ф2(.74 * r)},${ф2(-.12 * r)} C${ф2(.5 * r)},${ф2(.12 * r)} ${ф2(.16 * r)},${ф2(.12 * r)} 0,0 Z" fill="url(#п74-лист)" stroke="#1f5a1a" stroke-width="${ф2(r * .03)}"/>
        <path d="M${ф2(.04 * r)},${ф2(-.02 * r)} Q${ф2(.36 * r)},${ф2(-.14 * r)} ${ф2(.68 * r)},${ф2(-.12 * r)}" stroke="#d8f5b0" stroke-width="${ф2(r * .025)}" fill="none"/></g></g>`}
      ${з ? `<g class="мерцает">${[[-.5, .3, .22], [.5, -.35, .16]].map(([x, y, s]) => `<path d="M${ф2(x * r)},${ф2((y - s) * r)} L${ф2((x + s * .25) * r)},${ф2((y - s * .25) * r)} L${ф2((x + s) * r)},${ф2(y * r)} L${ф2((x + s * .25) * r)},${ф2((y + s * .25) * r)} L${ф2(x * r)},${ф2((y + s) * r)} L${ф2((x - s * .25) * r)},${ф2((y + s * .25) * r)} L${ф2((x - s) * r)},${ф2(y * r)} L${ф2((x - s * .25) * r)},${ф2((y - s * .25) * r)} Z" fill="#fff"/>`).join('')}</g>` : ''}`;
  }
  /* часть яблока «срезом к нам». вид: {c, s} — ломоть по хорде x = c·R (s −1 левый, 1 правый; c = 0 — половинка),
     {a0, a1} — сектор в градусах (четвертинка). Центр целого яблока — (0,0). */
  const ПОЛ = [{ c: 0, s: -1 }, { c: 0, s: 1 }];
  const ЧЕТ = [{ a0: 180, a1: 270 }, { a0: 270, a1: 360 }, { a0: 90, a1: 180 }, { a0: 0, a1: 90 }];   /* ↖ ↗ ↙ ↘ */
  const сектор = (a0, a1, R) => `M0,0 L${ф2(R * Math.cos(a0 * р))},${ф2(R * Math.sin(a0 * р))} A${R},${R} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${ф2(R * Math.cos(a1 * р))},${ф2(R * Math.sin(a1 * р))} Z`;
  const ломоть = (c, s, R) => { const h = Math.sqrt(Math.max(0, R * R - c * c));
    return `M${ф2(c)},${ф2(-h)} A${ф2(R)},${ф2(R)} 0 ${(s < 0) === (c > 0) ? 1 : 0} ${s < 0 ? 0 : 1} ${ф2(c)},${ф2(h)} Z`; };
  function кусок(вид, R, з){
    const id = 'п74-к' + (++N), форма = (Rr) => вид.c == null ? сектор(вид.a0, вид.a1, Rr) : ломоть(вид.c * R, вид.s, Rr);
    const сем = [[.13, .17, 35], [-.13, .17, -35], [.13, -.17, -35], [-.13, -.17, 35]].map(([x, y, a]) =>
      `<ellipse cx="${ф2(x * R)}" cy="${ф2(y * R)}" rx="${ф2(.055 * R)}" ry="${ф2(.1 * R)}" transform="rotate(${a} ${ф2(x * R)} ${ф2(y * R)})" fill="#5a2a10"/>`).join('');
    return `<clipPath id="${id}"><path d="${форма(R * .9)}"/></clipPath>
      <path d="${форма(R)}" fill="url(#п74-${з ? 'золото' : 'кожа'})" stroke="${з ? '#8a5a08' : '#6a0c10'}" stroke-width="${ф2(Math.max(.8, R * .05))}" stroke-linejoin="round"/>
      <path d="${форма(R * .9)}" fill="url(#п74-${з ? 'мякотьЗ' : 'мякоть'})"/>
      <g clip-path="url(#${id})"><ellipse rx="${ф2(R * .3)}" ry="${ф2(R * .4)}" fill="${з ? '#fff6c8' : '#fffaea'}" stroke="${з ? '#e0b040' : '#e6c98a'}" stroke-width="${ф2(R * .04)}"/>${сем}
        ${[20, 70, 110, 160, 200, 250, 290, 340].map(a => `<path d="M${ф2(.42 * R * Math.cos(a * р))},${ф2(.5 * R * Math.sin(a * р))} L${ф2(.8 * R * Math.cos(a * р))},${ф2(.8 * R * Math.sin(a * р))}" stroke="${з ? '#f0c860' : '#f0dca8'}" stroke-width="${ф2(R * .025)}"/>`).join('')}</g>`;
  }
  /* доля части (для весов): половинка 1/2, четвертинка 1/4, кривой ломоть — по площади */
  const доля = (вид) => { if (вид.c == null) return (вид.a1 - вид.a0) / 360;
    const d = Math.abs(вид.c), сег = (Math.acos(d) - d * Math.sqrt(1 - d * d)) / Math.PI;
    return (вид.s < 0) === (вид.c > 0) ? 1 - сег : сег; };
  /* часть, которая «сидит» срезом вниз: низ — на y = 0, по центру x = 0; высота — сколько торчит вверх */
  function сидит(вид, R){
    if (вид.c == null){ const k = ЧЕТ.indexOf(вид), т = [`translate(${R / 2},0)`, `translate(${-R / 2},0)`, `translate(${R / 2},0) rotate(90)`, `translate(${-R / 2},0) rotate(-90)`][k];
      return { т, h: R }; }
    const c = вид.c * R;
    return вид.s < 0 ? { т: `translate(0,${ф2(-c)}) rotate(90)`, h: R + c } : { т: `translate(0,${ф2(c)}) rotate(-90)`, h: R - c };
  }
  const сидячий = (вид, R, з) => { const с = сидит(вид, R); return `<g transform="${с.т}">${кусок(вид, R, з)}</g>`; };
  /* середина рамки части «срезом к нам» — чтобы брать пальцем за середину */
  const середина = (вид) => { if (вид.c != null) return [вид.s < 0 ? (вид.c - 1) / 2 : (вид.c + 1) / 2, 0];
    const x = [0], y = [0]; for (let a = вид.a0; a <= вид.a1; a += 5){ x.push(Math.cos(a * р)); y.push(Math.sin(a * р)); }
    return [(Math.min(...x) + Math.max(...x)) / 2, (Math.min(...y) + Math.max(...y)) / 2]; };

  /* корзина: зад (ручка, тёмное нутро) и перед (плетёный бок); дно в y */
  const корзина = (cx, yД, ш, h, ручка) => ({
    зад: `<g pointer-events="none"><ellipse cx="${cx}" cy="${yД + 2}" rx="${ш * .55}" ry="5" fill="rgba(30,15,5,.3)"/>
      <path d="M${cx - ш * .4},${yД - h} Q${cx},${yД - h - ш * (ручка || .62)} ${cx + ш * .4},${yД - h}" stroke="#8a5622" stroke-width="5" fill="none"/>
      <path d="M${cx - ш * .4},${yД - h} Q${cx},${yД - h - ш * (ручка || .62)} ${cx + ш * .4},${yД - h}" stroke="#e2ad5e" stroke-width="2" fill="none"/>
      <ellipse cx="${cx}" cy="${yД - h}" rx="${ш / 2}" ry="6" fill="#5a3416"/></g>`,
    перед: `<g pointer-events="none"><path d="M${cx - ш / 2},${yД - h} L${cx - ш * .4},${yД} H${cx + ш * .4} L${cx + ш / 2},${yД - h} Q${cx},${yД - h + 8} ${cx - ш / 2},${yД - h} Z" fill="url(#п74-корзина)" stroke="#5a3416" stroke-width="1.4"/>
      ${Array.from({ length: Math.floor(h / 7) }, (_, k) => `<path d="M${cx - ш / 2 + 2 + k * 1.4},${yД - h + 6 + k * 7} Q${cx},${yД - h + 12 + k * 7} ${cx + ш / 2 - 2 - k * 1.4},${yД - h + 6 + k * 7}" stroke="#8a5622" stroke-width="1.6" fill="none"/>`).join('')}
      ${Array.from({ length: 7 }, (_, k) => { const f = (k + .5) / 7 - .5; return `<path d="M${ф2(cx + f * ш * .96)},${yД - h + 4} L${ф2(cx + f * ш * .8)},${yД - 1}" stroke="#6a4018" stroke-width="1.1" opacity=".55"/>`; }).join('')}
      <path d="M${cx - ш / 2},${yД - h} Q${cx},${yД - h + 8} ${cx + ш / 2},${yД - h}" stroke="#f0c070" stroke-width="3.4" fill="none"/></g>`
  });
  /* горка яблок в корзине: ряды по 5, 4, 3… снизу вверх; низ нижнего ряда — у края корзины */
  const горка = (n, cx, yК, r, база) => { const м = []; let ряд = 0, вРяду = база || 5;
    while (м.length < n){ const k = Math.min(вРяду, n - м.length);
      for (let j = 0; j < k; j++) м.push([cx + (j - (k - 1) / 2) * (2 * r + 1), yК - ряд * r * 1.45]);
      ряд++; вРяду = Math.max(1, вРяду - 1); }
    return м; };
  const тарелка = (x, y, rx) => `<g pointer-events="none"><ellipse cx="${x}" cy="${y + 3}" rx="${rx}" ry="${rx * .3}" fill="rgba(30,15,5,.28)"/>
    <ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * .3}" fill="url(#п74-тарелка)" stroke="#8a9aa8" stroke-width="1.2"/>
    <ellipse cx="${x}" cy="${y - 1}" rx="${rx * .66}" ry="${rx * .18}" fill="none" stroke="#c8d4de" stroke-width="1.4"/>
    <path d="M${x - rx * .7},${y - rx * .1} Q${x},${y - rx * .26} ${x + rx * .7},${y - rx * .1}" stroke="#4a90d0" stroke-width="1.2" fill="none" opacity=".6" stroke-dasharray="3 3"/></g>`;
  /* место яблока на тарелке/в чаше: ряды 4, 3, 2, 1 */
  const вРядах = (j, x, y, s, ряды) => { ряды = ряды || [4, 3, 2, 1]; let k = j, row = 0;
    while (row < ряды.length - 1 && k >= ряды[row]){ k -= ряды[row]; row++; }
    const n = ряды[row]; return [x + (k - (n - 1) / 2) * s * .95, y - s * .4 - row * s * .78]; };

  /* ═══════════ ВЕСЫ ТОШИ (главный предмет) ═══════════
     cx — ось, yЗ — земля; о: L (плечо), ш (ширина чаши), H (высота оси), вис (длина подвеса),
     л / п — вес на чашах (в четвертинках или в яблоках), чаша(сторона, x, yОбода) → что лежит в чаше,
     зоны: [имя левой, имя правой] — куда класть, ключ — где помнить прошлый наклон для анимации */
  function весы(н, st, cx, yЗ, о){
    const L = о.L || 64, ш = о.ш || 84, py = yЗ - (о.H || 112), вис = о.вис || 56;
    const Δ = (о.п || 0) - (о.л || 0), θ = Math.abs(Δ) < 1e-6 ? 0 : Math.sign(Δ) * Math.min(18, 6 + 1.5 * Math.abs(Δ));
    const ключ = о.ключ || 'вес', s = st[ключ] || (st[ключ] = { θ, от: θ, t: 0 });
    if (s.θ !== θ){ s.от = s.θ; s.θ = θ; s.t = Date.now(); }
    const идёт = Date.now() - s.t < 1000, от = идёт ? s.от : θ;
    const конец = (z, a) => [cx + z * L * Math.cos(a * р), py + z * L * Math.sin(a * р)];
    const ровно = θ === 0 && (о.л || 0) > 0;
    const стойка = `<g pointer-events="none"><ellipse cx="${cx}" cy="${yЗ + 1}" rx="44" ry="6" fill="rgba(30,15,5,.32)"/>
      <path d="M${cx - 34},${yЗ} L${cx - 27},${yЗ - 13} H${cx + 27} L${cx + 34},${yЗ} Z" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.4"/>
      <path d="M${cx - 30},${yЗ - 4} H${cx + 30}" stroke="#f4cf9a" stroke-width="1.2" opacity=".6"/>
      <rect x="${cx - 21}" y="${yЗ - 19}" width="42" height="7" rx="3" fill="url(#п74-латунь)" stroke="#6a4208"/>
      <rect x="${cx - 4.5}" y="${py}" width="9" height="${yЗ - 19 - py}" fill="url(#п74-латуньВ)" stroke="#6a4208" stroke-width="1"/>
      ${[.3, .62].map(f => `<rect x="${cx - 7}" y="${ф2(py + (yЗ - 19 - py) * f)}" width="14" height="5" rx="2" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width=".8"/>`).join('')}
      <path d="M${cx - 10},${py + 12} Q${cx - 10},${py - 7} ${cx},${py - 7} Q${cx + 10},${py - 7} ${cx + 10},${py + 12}" stroke="#8a5a10" stroke-width="3.4" fill="none"/>
      <path d="M${ф2(cx + 40 * Math.cos(-118 * р))},${ф2(py + 40 * Math.sin(-118 * р))} A40,40 0 0 1 ${ф2(cx + 40 * Math.cos(-62 * р))},${ф2(py + 40 * Math.sin(-62 * р))}" stroke="url(#п74-латунь)" stroke-width="9" fill="none"/>
      ${[-114, -102, -90, -78, -66].map(a => `<path d="M${ф2(cx + 36.5 * Math.cos(a * р))},${ф2(py + 36.5 * Math.sin(a * р))} L${ф2(cx + 43.5 * Math.cos(a * р))},${ф2(py + 43.5 * Math.sin(a * р))}" stroke="${a === -90 ? '#2f9a46' : '#6a4208'}" stroke-width="${a === -90 ? 2.6 : 1.2}"/>`).join('')}
      ${ровно ? `<circle cx="${cx}" cy="${py - 40}" r="9" fill="#8cf0a0" opacity=".7" class="мерцает"/>` : ''}</g>`;
    const чаша = (z) => { const [ex, ey] = конец(z, θ), ey0 = конец(z, от)[1], об = ey + вис;
      return `<g class="${идёт ? 'п74-чаша' : ''}" style="--д:${ф2(ey0 - ey)}px">
        <g pointer-events="none"><path d="M${ф2(ex)},${ф2(ey)} L${ф2(ex - ш / 2 + 4)},${ф2(об)} M${ф2(ex)},${ф2(ey)} L${ф2(ex + ш / 2 - 4)},${ф2(об)}" stroke="#7a6a4a" stroke-width="1.2"/>
        <ellipse cx="${ф2(ex)}" cy="${ф2(об)}" rx="${ш / 2}" ry="5.5" fill="#9a6a18" stroke="#6a4208" stroke-width="1"/></g>
        ${о.чаша ? о.чаша(z < 0 ? 'л' : 'п', ф2(ex), ф2(об)) : ''}
        <g pointer-events="none"><path d="M${ф2(ex - ш / 2)},${ф2(об)} C${ф2(ex - ш / 2 + 8)},${ф2(об + 17)} ${ф2(ex + ш / 2 - 8)},${ф2(об + 17)} ${ф2(ex + ш / 2)},${ф2(об)} Z" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1.2"/>
        <path d="M${ф2(ex - ш / 2 + 7)},${ф2(об + 3)} Q${ф2(ex)},${ф2(об + 10)} ${ф2(ex + ш / 2 - 7)},${ф2(об + 3)}" stroke="#fff6c0" stroke-width="1.3" fill="none" opacity=".7"/></g></g>`; };
    const коромысло = `<g transform="translate(${cx},${py}) rotate(${θ})" pointer-events="none"><g class="${идёт ? 'п74-кор' : ''}" style="--от:${ф2(от - θ)}deg">
      <circle r="${L + 10}" fill="none"/>
      <path d="M0,0 V-31" stroke="#5a3a08" stroke-width="2.4" stroke-linecap="round"/><path d="M-3.4,-27 L0,-37 L3.4,-27 Z" fill="#c8341e"/>
      <path d="M${-L - 3},0 Q0,-9 ${L + 3},0 Q0,5 ${-L - 3},0 Z" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1.2"/>
      <path d="M${-L + 8},-2 Q0,-7 ${L - 8},-2" stroke="#fff6c0" stroke-width="1.2" fill="none" opacity=".8"/>
      ${[-1, 1].map(z => `<circle cx="${z * L}" r="4.2" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1.2"/>`).join('')}
      ${[-.5, .5].map(f => `<circle cx="${f * L}" cy="-2" r="2" fill="#c8341e" stroke="#6a1a10" stroke-width=".6"/>`).join('')}
      <circle r="6" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1.4"/><circle r="2" fill="#6a4208"/></g></g>`;
    const зоны = о.зоны ? [-1, 1].map(z => { const [ex, ey] = конец(z, θ), об = ey + вис;
      return н.зона(о.зоны[z < 0 ? 0 : 1], ф2(ex - ш / 2 - 8), ф2(об - 56), ш + 16, 76); }).join('') : '';
    return стойка + зоны + чаша(-1) + чаша(1) + коромысло;
  }

  /* ═══════════ ЯБЛОКОРЕЗКА ТОШИ ═══════════ cx — середина, yС — верх стола; удар — время, когда нож упал */
  function резка(cx, yС, удар, дважды){
    const yД = yС - 8, верх = yД - 96, идёт = удар && Date.now() - удар < (дважды ? 2000 : 1300);
    const зуб = Array.from({ length: 8 }, (_, k) => { const a = k * 45 * р, b = (k * 45 + 22) * р;
      return `L${ф2(10 * Math.cos(a))},${ф2(10 * Math.sin(a))} L${ф2(10 * Math.cos(a + 9 * р))},${ф2(10 * Math.sin(a + 9 * р))} L${ф2(6.5 * Math.cos(b))},${ф2(6.5 * Math.sin(b))} L${ф2(6.5 * Math.cos(b + 23 * р))},${ф2(6.5 * Math.sin(b + 23 * р))}`; }).join(' ');
    return `<g pointer-events="none">
      <rect x="${cx - 56}" y="${yД}" width="112" height="8" rx="4" fill="url(#п74-доска)" stroke="#7a4a20" stroke-width="1.2"/>
      <circle cx="${cx + 48}" cy="${yД + 4}" r="2" fill="#7a4a20"/>
      ${[-48, 41].map(dx => `<rect x="${cx + dx}" y="${верх}" width="7" height="${yД - верх}" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.1"/>
        <path d="M${cx + dx + (dx < 0 ? 6 : 1)},${верх + 4} V${yД - 2}" stroke="#5b3416" stroke-width="1" opacity=".6"/>`).join('')}
      <rect x="${cx - 54}" y="${верх - 9}" width="108" height="11" rx="3" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.3"/>
      <g class="${идёт ? 'п74-рубит' + (дважды ? '2' : '') : ''}">
        <rect x="${cx - 2}" y="${верх - 32}" width="4" height="48" fill="url(#п74-сталь)" stroke="#3a4250" stroke-width=".6"/>
        <circle cx="${cx}" cy="${верх - 34}" r="6.5" fill="#d8342a" stroke="#6a1a10" stroke-width="1.2"/><circle cx="${cx - 2}" cy="${верх - 36}" r="2" fill="#fff" opacity=".7"/>
        <path d="M${cx - 36},${верх + 14} H${cx + 36} V${верх + 30} L${cx + 30},${верх + 40} H${cx - 30} L${cx - 36},${верх + 30} Z" fill="url(#п74-сталь)" stroke="#3a4250" stroke-width="1.2"/>
        <path d="M${cx - 30},${верх + 37} H${cx + 30}" stroke="#fff" stroke-width="1.4" opacity=".85"/>
        ${[-24, 0, 24].map(dx => `<circle cx="${cx + dx}" cy="${верх + 21}" r="1.8" fill="#5a6676"/>`).join('')}</g>
      <g transform="translate(${cx + 28},${верх - 4})"><g class="${идёт ? 'п74-шест' : ''}"><path d="M10,0 ${зуб} Z" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1"/><circle r="3" fill="#6a4208"/></g></g>
      <g transform="translate(${cx - 30},${верх - 4})"><g class="${идёт ? 'п74-шест2' : ''}"><path d="M10,0 ${зуб} Z" transform="scale(.75)" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1"/><circle r="2.4" fill="#6a4208"/></g></g>
      ${идёт ? `<g class="п74-брызги">${[[-40, -6], [40, -10], [-30, -18], [34, -20]].map(([dx, dy]) => `<circle cx="${cx + dx}" cy="${yД - 18 + dy}" r="2.2" fill="#fff4c0"/>`).join('')}</g>` : ''}</g>`;
  }

  /* ═══════════ тележка (кадр загадок) ═══════════ */
  function тележка(x0, yЗ, n, кл){
    const кол = (x) => `<g transform="translate(${x},${yЗ - 20})"><g class="п74-колесо"><circle r="19" fill="#6b4422" stroke="#3a2010" stroke-width="2"/><circle r="15" fill="none" stroke="#a87444" stroke-width="2"/>
      ${[0, 45, 90, 135].map(a => `<path d="M${ф2(-15 * Math.cos(a * р))},${ф2(-15 * Math.sin(a * р))} L${ф2(15 * Math.cos(a * р))},${ф2(15 * Math.sin(a * р))}" stroke="#a87444" stroke-width="2.4"/>`).join('')}
      <circle r="4.5" fill="url(#п74-латунь)" stroke="#6a4208"/></g></g>`;
    const ябл = горка(n, x0 + 75, yЗ - 70, 9, 7).map(([x, y], k) => `<g transform="translate(${ф2(x)},${ф2(y)})">${яблоко(9, false, k % 3 === 0)}</g>`).join('');
    return `<g class="${кл || ''}" pointer-events="none"><ellipse cx="${x0 + 75}" cy="${yЗ + 1}" rx="86" ry="5" fill="rgba(30,15,5,.3)"/>
      <path d="M${x0 + 4},${yЗ - 44} L${x0 - 30},${yЗ - 30} M${x0 + 4},${yЗ - 38} L${x0 - 30},${yЗ - 26}" stroke="#6b4422" stroke-width="4" stroke-linecap="round"/>
      <rect x="${x0 - 36}" y="${yЗ - 34}" width="8" height="12" rx="2" fill="#5a3418"/><rect x="${x0 - 38}" y="${yЗ - 10}" width="14" height="10" rx="2" fill="#7a5a3a"/>
      <path d="M${x0 - 31},${yЗ - 22} V${yЗ - 10}" stroke="#5a3418" stroke-width="3"/>
      <rect x="${x0}" y="${yЗ - 74}" width="150" height="10" fill="#7a4a24"/>
      ${ябл}
      <rect x="${x0}" y="${yЗ - 66}" width="150" height="34" rx="3" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.6"/>
      ${[0, 1, 2].map(k => `<path d="M${x0 + 2},${yЗ - 55 + k * 11} H${x0 + 148}" stroke="#7a4a20" stroke-width="1.2" opacity=".7"/>`).join('')}
      ${[6, 144].map(dx => `<rect x="${x0 + dx - 4}" y="${yЗ - 70}" width="8" height="40" fill="#8a5a30" stroke="#5b3416"/><circle cx="${x0 + dx}" cy="${yЗ - 62}" r="1.6" fill="#3a2010"/><circle cx="${x0 + dx}" cy="${yЗ - 38}" r="1.6" fill="#3a2010"/>`).join('')}
      ${кол(x0 + 32)}${кол(x0 + 118)}</g>`;
  }

  /* ═══════════ мостки, вода, сушилка для рыбы ═══════════ */
  const вода = (y) => `<g pointer-events="none"><path d="M0,${y} Q45,${y - 4} 90,${y} T180,${y} T270,${y} T360,${y} V300 H0 Z" fill="url(#п74-вода)"/>
    ${Array.from({ length: 9 }, (_, k) => `<path class="п74-волна" style="animation-delay:${-k * .6}s" d="M${(k * 61 + 20) % 330},${y + 16 + (k * 23) % 80} q8,-4 16,0 q8,4 16,0" stroke="#e6f8ff" stroke-width="1.6" fill="none" opacity=".7"/>`).join('')}</g>`;
  const мостки = (x1, y) => `<g pointer-events="none">${[14, 70, x1 - 14].map(x => `<rect x="${x - 4}" y="${y}" width="8" height="64" fill="#6b4422" stroke="#3a2010"/><ellipse cx="${x}" cy="${y + 62}" rx="10" ry="3" fill="none" stroke="#e6f8ff" stroke-width="1.4" opacity=".8" class="п74-круги"/>`).join('')}
    <rect x="-4" y="${y - 2}" width="${x1 + 4}" height="11" rx="2" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.4"/>
    ${Array.from({ length: Math.floor(x1 / 18) }, (_, k) => `<path d="M${k * 18 + 18},${y - 1} V${y + 8}" stroke="#7a4a20" stroke-width="1" opacity=".7"/>`).join('')}</g>`;

  /* перетаскиваемое яблоко (центр — центр яблока) */
  const ябл = (н, что, x, y, r, от) => н.тащ(что, ф2(x), ф2(y), `<g${н.лёт(от, x, y)}>${яблоко(r || 10, false, false)}</g>`, (r || 10) + 2);
  /* часть «сидит» в точке (x, y — низ), за неё можно взять */
  const частьТащ = (н, что, вид, R, з, x, y, от) => { const h = сидит(вид, R).h;
    return н.тащ(что, ф2(x), ф2(y - h / 2), `<g${н.лёт(от, x, y - h / 2)}><g transform="translate(0,${ф2(h / 2)})">${сидячий(вид, R, з)}</g></g>`, Math.max(11, R * .62)); };
  const приезд = (st) => { if (!st.прибыл) st.прибыл = Date.now(); return Date.now() - st.прибыл < 1700 ? 'п74-приезд' : ''; };

  const ВЕС8 = { L: 70, ш: 88, H: 114, вис: 58 };
  const ДОЛЬКИ_НА_ТАРЕЛКАХ = [[{ c: .34, s: -1 }, { c: .34, s: 1 }], [{ c: -.32, s: -1 }, { c: -.32, s: 1 }], [ПОЛ[0], ПОЛ[1]]];
  const ГЕРОИ4 = { р: 'рыжинка', т: 'тоша', у: 'умка', х: 'хапун' };
  const ЗАГАДКИ = [{ ч: 2, n: 6 }, { ч: 4, n: 8 }, { ч: 2, n: 10 }, { ч: 4, n: 12 }, { ч: 2, n: 14 }, { ч: 4, n: 16 }];
  /* жетоны: верный ответ, «не та доля» (если делится), «вычел вместо деления», соседние числа — первые три разных */
  const ЖЕТОНЫ = (З) => { const в = З.n / З.ч;
    return [...new Set([в, З.n / (З.ч === 2 ? 4 : 2), З.n - З.ч, в + 1, в - 1].filter(v => Number.isInteger(v) && v > 0))].slice(0, 3).sort((a, b) => a - b); };
  const ПРУД = [[192, 216], [252, 210], [312, 220], [178, 248], [238, 246], [298, 252], [340, 238], [204, 282], [264, 284], [324, 284]];

  /* общий кадр «на весах поровну»: яблоки из корзины (или уже в чашах) раскладываем, пока весы не встанут ровно */
  function наВесах(н, st, о){
    const В = st.в, вл = В.filter(x => x === 'л').length, вп = В.filter(x => x === 'п').length;
    const cx = о.cx || 180, к = корзина(cx, 296, 112, 26, .3), м = горка(В.length, cx, 270, 10);
    const вКорзине = В.map((x, k) => x ? null : k).filter(k => k != null);
    const чаша = (сторона, x, об) => В.map((s, k) => { if (s !== сторона) return '';
      const j = В.slice(0, k).filter(q => q === сторона).length, [ax, ay] = вРядах(j, x, об, 20);
      return ябл(н, 'я' + k, ax, ay, 10, st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null); }).join('');
    return `${н.герой(о.левый, о.xЛ || 34, 246, о.hЛ || 104, null, о.клЛ)}${н.герой(о.правый, о.xП || 328, 246, о.hП || 104, null, о.клП)}
      ${весы(н, st, cx, 240, Object.assign({ л: вл, п: вп, зоны: ['л', 'п'], чаша }, ВЕС8))}
      ${о.корзина === false ? '' : к.зад + н.зона('корзина', cx - 60, 240, 120, 58) +
        вКорзине.map((k, j) => ябл(н, 'я' + k, м[j][0], м[j][1], 10, st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null)).join('') + к.перед}`;
  }
  const положить = (st, что, зона, x, y) => {
    if (что[0] !== 'я' || !['л', 'п', 'корзина'].includes(зона)) return false;
    const k = +что.slice(1), куда = зона === 'корзина' ? null : зона;
    if (st.в[k] === куда) return false;
    st.в[k] = куда; st.нов = { k, от: x == null ? null : [x, y], t: Date.now() };
    return true;
  };

  const КАДРЫ = [
  /* 0 · ДВЕ РАВНЫЕ ЧАСТИ ──────────────────────────────────── */
  {
    кто: 'тоша', t: 'Две равные части',
    say: 'Я ёжик Тоша, изобретатель! Положи яблоко под нож — разрежу. А кусочки проверим на весах.',
    начало(st){ st.разрезано = false; st.ч = { л: [], п: [] }; },
    рисуй(st, н){
      const всё = st.ч.л.length === 1 && st.ч.п.length === 1, R = 20, ДX = 128, ДY = 180;
      const где = (k) => st.ч.л.includes(k) ? 'л' : st.ч.п.includes(k) ? 'п' : null;
      const чаша = (сторона, x, об) => st.ч[сторона].map((k, j, все) => частьТащ(н, 'п' + k, ПОЛ[k], R, false, x + (все.length > 1 ? (j - .5) * 30 : 0), об + 1,
        st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null)).join('');
      const доска = [0, 1].filter(k => !где(k)).map(k => { const z = k ? 1 : -1, [mx] = середина(ПОЛ[k]), x = ДX + z * 6 + mx * R;
        return н.тащ('п' + k, ф2(x), ДY, `<g class="${н.свежо(st.t) || (st.t && Date.now() - st.t < 1200) ? 'п74-врозь' : ''}" style="--dx:${-z * 6}px"><g transform="translate(${ф2(-mx * R)},0)">${кусок(ПОЛ[k], R, false)}</g></g>`, 14); }).join('');
      const тело = `${дымка}${земля(240)}
        ${н.герой('тоша', 34, 246, 100, null, всё ? 'радуется' : null)}
        ${стол(62, 196, 206, 36)}
        ${н.зона('доска', 62, st.разрезано ? 150 : 86, 136, st.разрезано ? 60 : 128)}
        ${резка(ДX, 206, st.t)}
        ${st.разрезано ? доска : н.тащ('целое', 150, 270, `<g class="п74-кач">${яблоко(18, false)}</g>`, 22)}
        ${весы(н, st, 276, 240, { L: 50, ш: 66, H: 110, вис: 52, л: st.ч.л.length * 2, п: st.ч.п.length * 2, зоны: st.разрезано && !всё ? ['л', 'п'] : null, чаша })}
        ${н.облачко('тоша', 60, 140)}`;
      return н.сцена(тело, 'Яблокорезка Тоши и весы', !всё, 'fon_sad') +
        (всё ? н.готово('Весы стоят ровно — значит, части РАВНЫЕ. Яблоко разрезали на две равные части: каждая — ПОЛОВИНА.') : '');
    },
    готов: st => st.ч.л.length === 1 && st.ч.п.length === 1,
    делать: st => !st.разрезано ? 'Перетащи яблоко под нож яблокорезки' : 'Положи половинки на весы — по одной на каждую чашу',
    подсказка: st => !st.разрезано ? 'Яблоко лежит на траве. Неси его на доску под ножом!' : 'Одну половинку — на левую чашу, другую — на правую.',
    бросить(st, что, зона, x, y, н){
      if (что === 'целое' && зона === 'доска'){ st.разрезано = true; st.t = Date.now(); н.сказ('тоша', 'Вжик! Две части. Равные? Проверим на весах!', 'ура'); return true; }
      if (что[0] !== 'п') return false;
      const k = +что[1];
      if (зона === 'доска'){ st.ч.л = st.ч.л.filter(q => q !== k); st.ч.п = st.ч.п.filter(q => q !== k); return true; }
      if (зона !== 'л' && зона !== 'п') return false;
      if (st.ч[зона].includes(k)) return false;
      st.ч.л = st.ч.л.filter(q => q !== k); st.ч.п = st.ч.п.filter(q => q !== k); st.ч[зона].push(k);
      st.нов = { k, от: x == null ? null : [x, y], t: Date.now() };
      const л = st.ч.л.length, п = st.ч.п.length;
      н.сказ('тоша', л === 1 && п === 1 ? 'Весы стоят ровно! Части равные — каждая половина.' : л + п === 1 ? 'Одна чаша перевесила. Положи вторую половинку на другую!' : 'Обе на одной чаше — тяжело! Переложи одну на другую чашу.');
      return true;
    },
    тап(st, что){ if (что === 'целое') return 'доска'; return st.ч.л.length ? 'п' : 'л'; }
  },
  /* 1 · ГДЕ ПОЛОВИНКИ? ─────────────────────────────────────── */
  {
    кто: 'умка', t: 'Где половинки?',
    say: 'Я сова Умка. Хапун резал яблоки. Где половинки? Ставь тарелку на весы — весы не обманут!',
    начало(st){ st.на = null; st.ок = false; },
    рисуй(st, н){
      const R = 17, П = [[66, 262], [180, 268], [294, 262]];
      const пара = (k, R) => ДОЛЬКИ_НА_ТАРЕЛКАХ[k].map((вид, j) => `<g transform="translate(${(j - .5) * 2 * R * .92},0)">${сидячий(вид, R, false)}</g>`).join('');
      const тарелки = П.map(([x, y], k) => st.на === k ? тарелка(x, y, 38)
        : н.тащ('т' + k, x, y - 12, `<g transform="translate(0,12)">${тарелка(0, 0, 38)}<g transform="translate(0,1)">${пара(k, R)}</g></g>`, 30)).join('');
      const Д = st.на == null ? null : ДОЛЬКИ_НА_ТАРЕЛКАХ[st.на];
      const чаша = (сторона, x, об) => Д ? `<g transform="translate(${x},${об + 1})"><g class="хлоп">${сидячий(Д[сторона === 'л' ? 0 : 1], 20, false)}</g></g>` : '';
      const тело = `${дымка}${земля(214)}
        ${н.герой('умка', 52, 218, 108, null, st.ок ? 'радуется' : null)}
        ${весы(н, st, 238, 214, { L: 58, ш: 72, H: 110, вис: 52, л: Д ? доля(Д[0]) * 4 : 0, п: Д ? доля(Д[1]) * 4 : 0, чаша })}
        ${st.ок ? '' : н.зона('весы', 140, 60, 210, 160)}
        <path d="M14,232 L346,232 L360,298 L0,298 Z" fill="url(#п74-клетка)" stroke="#a83a30" stroke-width="1.4" opacity=".95" pointer-events="none"/>
        ${тарелки}
        ${st.ок ? `<g transform="translate(330,66)"><g class="хлоп">${н.карт('star', 0, 0, 34, { центр: true })}</g></g>` : ''}
        ${н.облачко('умка', 60, 104)}`;
      return н.сцена(тело, 'Весы и три тарелки с кусочками', !st.ок, 'fon_dolina') +
        (st.ок ? н.готово('Половинки — только РАВНЫЕ части: весы стоят ровно. Если одна часть больше — это не половинки, весы перевешивают.') : '');
    },
    готов: st => st.ок,
    делать: () => 'Перетащи тарелку на весы — найди, где половинки',
    подсказка: () => 'Ставь тарелки на весы по очереди. Где весы встанут ровно — там половинки.',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'т' || зона !== 'весы') return false;
      const k = +что[1], Д = ДОЛЬКИ_НА_ТАРЕЛКАХ[k];
      st.на = k;
      if (доля(Д[0]) === доля(Д[1])){ st.ок = true; н.сказ('умка', 'Ух! Весы стоят ровно — вот они, половинки!'); }
      else н.сказ('умка', `Перевесила ${доля(Д[0]) > доля(Д[1]) ? 'левая' : 'правая'} чаша! Кусочки неравные — это не половинки. Попробуй другую тарелку.`);
      return true;
    },
    тап(){ return 'весы'; }
  },
  /* 2 · ЗОЛОТОЕ ЯБЛОКО НА ЧЕТВЕРЫХ ───────────────────────────── */
  {
    кто: 'тоша', t: 'Золотое яблоко на четверых',
    say: 'Золотое яблоко — на всех четверых, и Хапуну тоже! Неси его под нож, а потом дай каждому по кусочку.',
    начало(st){ st.разрезано = false; st.у = [null, null, null, null]; },
    рисуй(st, н){
      const все = st.у.every(Boolean), ХX = { р: 40, т: 112, у: 246, х: 324 }, R = 22, ДX = 180, ДY = 162;
      const кусочки = [0, 1, 2, 3].map(k => { const к = st.у[k]; if (к) return '';
        const [mx, my] = середина(ЧЕТ[k]), x = ДX + mx * R + Math.sign(mx) * 4, y = ДY + my * R + Math.sign(my) * 4;
        return н.тащ('ч' + k, ф2(x), ф2(y), `<g class="${st.t && Date.now() - st.t < 2000 ? 'п74-врозь2' : ''}" style="--dx:${-Math.sign(mx) * 4}px;--dy:${-Math.sign(my) * 4}px"><g transform="translate(${ф2(-mx * R)},${ф2(-my * R)})">${кусок(ЧЕТ[k], R, true)}</g></g>`, 12); }).join('');
      /* у кого кусочек — держит его в руках */
      const в_руках = Object.entries(ХX).map(([г, x]) => { const k = st.у.indexOf(г);
        return k >= 0 ? `<g transform="translate(${x},${г === 'х' ? 262 : 258})"><g class="хлоп">${сидячий(ЧЕТ[k], 17, true)}</g></g>` : ''; }).join('');
      const тело = `${дымка}${земля(232)}
        <g pointer-events="none"><ellipse cx="180" cy="233" rx="62" ry="5" fill="rgba(30,15,5,.3)"/>
          ${[150, 204].map(x => `<rect x="${x}" y="194" width="8" height="38" fill="#6b4422" stroke="#3a2010"/>`).join('')}<path d="M158,220 H204" stroke="#6b4422" stroke-width="5"/></g>
        ${стол(100, 260, 186, 0, true)}
        ${резка(ДX, 186, st.t, true)}
        ${st.разрезано ? Object.entries(ХX).map(([г, x]) => н.зона(г, x - 36, 196, 72, 104)).join('') : н.зона('доска', 100, 70, 160, 124)}
        ${Object.entries(ХX).map(([г, x]) => н.герой(ГЕРОИ4[г], x, 298, г === 'х' ? 84 : 90, null, все ? 'радуется' : г === 'х' && !st.у.includes('х') ? 'п74-хитрит' : null)).join('')}
        ${в_руках}
        ${st.разрезано ? кусочки : н.тащ('целое', 180, 270, `<g class="п74-кач">${яблоко(19, true)}</g>`, 22)}
        ${['рыжинка', 'тоша', 'умка', 'хапун'].map((к, j) => н.облачко(к, [40, 112, 246, 324][j], 128)).join('')}`;
      return н.сцена(тело, 'Золотое яблоко и четверо друзей у стола', !все, 'fon_sad') +
        (все ? н.готово('Золотое яблоко разрезали на ЧЕТЫРЕ РАВНЫЕ части — каждому по ЧЕТВЕРТИ. Четверть — одна из четырёх равных частей.') : '');
    },
    готов: st => st.у.every(Boolean),
    делать: st => !st.разрезано ? 'Перетащи Золотое яблоко под нож' : 'Раздай кусочки — каждому по одному',
    подсказка: st => !st.разрезано ? 'Яблоко на траве перед столом. Неси его под нож яблокорезки!' : 'Четыре кусочка — четыре друга. Тащи кусочек прямо к герою!',
    бросить(st, что, зона, x, y, н){
      if (что === 'целое' && зона === 'доска'){ st.разрезано = true; st.t = Date.now(); н.сказ('тоша', 'Вжик-вжик! Крест-накрест — четыре равных кусочка!', 'ура'); return true; }
      if (что[0] !== 'ч' || !ГЕРОИ4[зона]) return false;
      const k = +что[1], кто = ГЕРОИ4[зона];
      if (st.у.includes(зона)){ н.сказ(кто, кто === 'хапун' ? 'Хе-хе, давай ещё! …Ладно-ладно, у меня уже есть.' : 'У меня уже есть кусочек! Отдай другому.'); return false; }
      st.у[k] = зона;
      н.сказ(кто, st.у.every(Boolean) ? (кто === 'хапун' ? 'Мне тоже досталось?! Спасибо… Делиться — здорово!' : 'Всем поровну — каждому по четверти!') : кто === 'хапун' ? 'Хе-хе! Мне? Мне?!' : 'Спасибо! У меня четвертинка.');
      return true;
    },
    тап(st, что){ if (что === 'целое') return 'доска'; return ['р', 'т', 'у', 'х'].find(г => !st.у.includes(г)); }
  },
  /* 3 · ПОЛОВИНА ОТ 8 ─────────────────────────────────────── */
  {
    кто: 'рыжинка', t: 'Половина от 8',
    say: 'Я лисичка Рыжинка! Делим 8 яблок с Тошей: левая чаша моя, правая — его. Клади, пока весы не встанут ровно!',
    начало(st){ st.в = Array(8).fill(null); },
    рисуй(st, н){
      const В = st.в, л = В.filter(x => x === 'л').length, п = В.filter(x => x === 'п').length, всё = В.every(Boolean) && л === п;
      const тело = `${дымка}${земля(240)}${наВесах(н, st, { cx: 178, левый: 'рыжинка', правый: 'тоша', клЛ: всё ? 'радуется' : null, клП: всё ? 'радуется' : null })}
        ${н.облачко('рыжинка', 60, 120)}${н.облачко('тоша', 300, 120)}`;
      return н.сцена(тело, 'Весы, корзина с восемью яблоками, Рыжинка и Тоша', !всё, 'fon_sad') +
        (всё ? н.готово('Восемь яблок поровну на двоих — по четыре, весы стоят ровно. Половина от 8 — это 4. Пишут: 8 : 2 = 4.') : '');
    },
    готов: st => st.в.every(Boolean) && st.в.filter(x => x === 'л').length === 4,
    делать: st => st.в.every(Boolean) ? 'Весы не ровно — переложи яблоко с тяжёлой чаши на лёгкую' : 'Клади яблоки на чаши весов — поровну',
    подсказка: () => 'Клади по одному: одно — Рыжинке, одно — Тоше… Пока корзина не опустеет.',
    бросить(st, что, зона, x, y, н){
      if (!положить(st, что, зона, x, y)) return false;
      const л = st.в.filter(q => q === 'л').length, п = st.в.filter(q => q === 'п').length;
      if (st.в.every(Boolean)) н.сказ(л === п ? 'рыжинка' : 'тоша', л === п ? 'Весы ровно! По четыре — это половина от восьми.' : `${л} и ${п} — весы перекосило! Переложи, чтобы стало поровну.`);
      else if (л === п) н.сказ('рыжинка', `Ровно: по ${л}. Но в корзине ещё есть — делим все восемь!`);
      return true;
    },
    тап(st){ const л = st.в.filter(q => q === 'л').length, п = st.в.filter(q => q === 'п').length; return л <= п ? 'л' : 'п'; }
  },
  /* 4 · ЧЕТВЕРТЬ ОТ 12 ────────────────────────────────────── */
  {
    кто: 'умка', t: 'Четверть от 12',
    say: 'Пикник! 12 яблок, а нас четверо. Разложи по тарелкам поровну — каждому четверть.',
    начало(st){ st.в = Array(12).fill(null); },
    рисуй(st, н){
      const В = st.в, Т = { р: [44, 248], т: [130, 230], у: [230, 230], х: [316, 248] };
      const счёт = Object.keys(Т).map(г => В.filter(x => x === г).length), всё = В.every(Boolean) && счёт.every(c => c === 3);
      const к = корзина(180, 294, 104, 24), вКорз = В.map((x, k) => x ? null : k).filter(k => k != null), м = горка(вКорз.length, 180, 270, 10);
      const от = (k) => st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null;
      const тело = `${дымка}${земля(196)}
        ${Object.entries(Т).map(([г, [x]], j) => н.герой(ГЕРОИ4[г], x, j === 0 || j === 3 ? 222 : 208, г === 'х' ? 88 : 94, null, всё ? 'радуется' : null)).join('')}
        <ellipse cx="180" cy="258" rx="178" ry="40" fill="url(#п74-клетка)" stroke="#a83a30" stroke-width="1.4" pointer-events="none"/>
        ${Object.entries(Т).map(([г, [x, y]]) => н.зона(г, x - 42, y - 96, 84, 110) + тарелка(x, y, 30)).join('')}
        ${Object.entries(Т).map(([г, [x, y]]) => В.map((s, k) => { if (s !== г) return '';
            const j = В.slice(0, k).filter(q => q === г).length, [ax, ay] = вРядах(j, x, y + 2, 20, [3, 2, 2, 2, 2, 1]);
            return ябл(н, 'я' + k, ax, ay, 10, от(k)); }).join('')).join('')}
        ${к.зад}${н.зона('корзина', 128, 250, 104, 48)}${вКорз.map((k, j) => ябл(н, 'я' + k, м[j][0], м[j][1], 10, от(k))).join('')}${к.перед}
        ${['рыжинка', 'тоша', 'умка', 'хапун'].map((кто, j) => н.облачко(кто, [44, 130, 230, 316][j], 104)).join('')}`;
      return н.сцена(тело, 'Пикник: скатерть, четыре тарелки и корзина', !всё, 'fon_dolina') +
        (всё ? н.готово('Двенадцать яблок поровну на четверых — по три. Четверть от 12 — это 3. Пишут: 12 : 4 = 3.') : '');
    },
    готов: st => st.в.every(Boolean) && ['р', 'т', 'у', 'х'].every(г => st.в.filter(x => x === г).length === 3),
    делать: st => st.в.every(Boolean) ? 'Не поровну! Переложи яблоки, чтобы у всех стало одинаково' : 'Раскладывай яблоки по тарелкам — каждому поровну',
    подсказка: () => 'Давай по кругу: Рыжинке, Тоше, Умке, Хапуну — и снова. Пока корзина не опустеет.',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'я' || !(ГЕРОИ4[зона] || зона === 'корзина')) return false;
      const k = +что.slice(1), куда = зона === 'корзина' ? null : зона;
      if (st.в[k] === куда) return false;
      st.в[k] = куда; st.нов = { k, от: x == null ? null : [x, y], t: Date.now() };
      const с = ['р', 'т', 'у', 'х'].map(г => st.в.filter(q => q === г).length);
      if (st.в.every(Boolean)) н.сказ('умка', с.every(c => c === 3) ? 'Поровну! У каждого по три — это четверть от двенадцати.' : `Нечестно: ${с.join(', ')}. Переложи, чтобы у всех стало одинаково!`);
      else if (куда) н.сказ(ГЕРОИ4[куда], ГЕРОИ4[куда] === 'хапун' ? `Хе-хе, у меня ${с[3]}!` : `У меня ${с['ртух'.indexOf(куда)]}!`);
      return true;
    },
    тап(st){ const с = ['р', 'т', 'у', 'х'].map(г => st.в.filter(q => q === г).length); return 'ртух'[с.indexOf(Math.min(...с))]; }
  },
  /* 5 · ХАПУН ХИТРИТ ──────────────────────────────────────── */
  {
    кто: 'рыжинка', t: 'Хапун хитрит',
    say: 'Хапун «поделил» 8 яблок: себе 6, мне 2! Весы перекосило. Переложи, чтобы стало честно.',
    начало(st){ st.в = ['л', 'л', 'п', 'п', 'п', 'п', 'п', 'п']; },
    рисуй(st, н){
      const л = st.в.filter(x => x === 'л').length, честно = л === 4;
      const тело = `${дымка}${земля(240, 'камень')}${наВесах(н, st, { cx: 172, левый: 'рыжинка', правый: 'хапун', xЛ: 32, xП: 326, hП: 92, корзина: false, клЛ: честно ? 'радуется' : null, клП: честно ? null : 'п74-хитрит' })}
        ${н.облачко('рыжинка', 60, 120)}${н.облачко('хапун', 300, 120)}`;
      return н.сцена(тело, 'Весы перекошены: у Хапуна шесть яблок, у Рыжинки два', !честно, 'fon_peshera') +
        (честно ? н.готово('Половина — это ПОРОВНУ: весы стоят ровно, у каждого по 4. А 6 и 2 — не половины, хоть частей и две.') : '');
    },
    готов: st => st.в.filter(x => x === 'л').length === 4,
    делать: () => 'Переложи яблоки с чаши Хапуна на чашу Рыжинки, чтобы весы встали ровно',
    подсказка: () => 'Перекладывай по одному яблоку с тяжёлой чаши, пока весы не выровняются.',
    бросить(st, что, зона, x, y, н){
      if (зона === 'корзина' || !положить(st, что, зона, x, y)) return false;
      const л = st.в.filter(q => q === 'л').length;
      if (л === 4) н.сказ('хапун', 'Эх… четыре и четыре, весы ровно. Ну ладно, это честно.');
      else if (л > 4) н.сказ('рыжинка', 'Ой, теперь моя чаша тяжелее. Так тоже нечестно!');
      else н.сказ('хапун', 'Не трогай мои яблоки! …Ну, одно можно.', 'хитрит');
      return true;
    },
    тап(st, что){ const k = +что.slice(1); return st.в[k] === 'п' ? 'л' : 'п'; }
  },
  /* 6 · ПОЛОВИНА УЛОВА ────────────────────────────────────── */
  {
    кто: 'умка', t: 'Половина улова',
    say: 'В пруду 10 рыбок. Нажимай на рыбку — она повиснет на сушилке. Поймай половину, остальные пусть плавают!',
    начало(st){ st.сушка = []; },
    рисуй(st, н){
      const n = st.сушка.length, всё = n === 5, шаг = Math.min(17, 68 / Math.max(1, n - 1));
      const рыбы = ПРУД.map(([x, y], k) => st.сушка.includes(k) ? '' : `<g ${всё ? '' : н.цель(н.клик('рыба', k))}><g transform="translate(${x},${y})"><circle r="22" fill="transparent"/>
          <g class="п74-плыть" style="animation-delay:${-k * .5}s">${н.карт(РЫБЫ[k % 4], 0, 0, 28, { центр: true, зерк: k % 2 })}</g></g></g>`).join('');
      const сушка = st.сушка.map((k, j) => `<g ${всё ? '' : н.цель(н.клик('отпусти', k))}><g transform="translate(${ф2(82 + j * шаг)},104)"><rect x="-8" y="0" width="16" height="44" fill="transparent"/>
          <path d="M0,0 V9" stroke="#7a6a4a" stroke-width="1.2"/><circle cy="9" r="1.6" fill="none" stroke="#5a5a5a" stroke-width="1"/>
          <g transform="translate(0,24) rotate(90)"><g class="${н.свежо(st.t) && j === n - 1 ? 'хлоп' : ''}">${н.карт(РЫБЫ[k % 4], 0, 0, 22, { центр: true })}</g></g></g></g>`).join('');
      const тело = `${дымка}${вода(194)}${мостки(160, 182)}
        <g pointer-events="none">${[70, 158].map(x => `<rect x="${x - 3}" y="100" width="6" height="84" fill="#6b4422" stroke="#3a2010"/>`).join('')}
          <rect x="64" y="98" width="100" height="7" rx="2" fill="url(#дк-дерево)" stroke="#5b3416"/>
          ${Array.from({ length: 5 }, (_, j) => `<path d="M${82 + j * 17},105 v5 a2.4,2.4 0 1 1 -2.4,2.4" stroke="#6a6a6a" stroke-width="1.1" fill="none"/>`).join('')}</g>
        ${н.герой('умка', 32, 186, 88, null, всё ? 'радуется' : null)}
        ${сушка}${рыбы}
        ${н.облачко('умка', 60, 96)}`;
      return н.сцена(тело, 'Пруд с рыбками, мостки и сушилка', false, 'fon_ozero') +
        (всё ? н.готово('Пять на сушилке, пять в пруду — поровну. Половина от 10 — это 5. Пишут: 10 : 2 = 5.') : '');
    },
    готов: st => st.сушка.length === 5,
    делать: st => st.сушка.length > 5 ? 'На сушилке больше, чем в пруду. Нажми на рыбку на сушилке — отпусти её' : 'Нажимай на рыбок в пруду — поймай половину',
    подсказка: st => `На сушилке ${st.сушка.length}, в пруду ${10 - st.сушка.length}. Половина — когда поровну.`,
    клики: {
      рыба(st, k, н){ if (st.сушка.includes(k)) return; st.сушка.push(k); st.t = Date.now(); const n = st.сушка.length;
        н.сказ('умка', n === 5 ? 'Пять поймали, пять плавают — поровну! Это половина.' : n > 5 ? `На сушилке ${n}, в пруду ${10 - n} — многовато! Отпусти лишнюю.` : `На сушилке ${n}, в пруду ${10 - n}.`); },
      отпусти(st, k, н){ st.сушка = st.сушка.filter(x => x !== k); const n = st.сушка.length;
        н.сказ('умка', n === 5 ? 'Пять и пять — поровну! Это половина.' : `Плюх! На сушилке ${n}, в пруду ${10 - n}.`); }
    }
  },
  /* 7 · ДВЕ ЧЕТВЕРТИНКИ = ПОЛОВИНКА ─────────────────────────── */
  {
    кто: 'тоша', t: 'Две четвертинки — половинка',
    say: 'Слева — половинка яблока. Сколько четвертинок положить справа, чтобы весы встали ровно?',
    начало(st){ st.в = [false, false, false, false]; },
    рисуй(st, н){
      const n = st.в.filter(Boolean).length, всё = n === 2, R = 17;
      const чаша = (сторона, x, об) => сторона === 'л' ? `<g transform="translate(${x},${об + 1})">${сидячий(ПОЛ[0], 22, false)}</g>`
        : st.в.map((v, k) => { if (!v) return ''; const j = st.в.slice(0, k).filter(Boolean).length;
          return частьТащ(н, 'ч' + k, ЧЕТ[1], R, false, x + (j - (n - 1) / 2) * 19, об + 1, st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null); }).join('');
      const пень = `<g pointer-events="none"><ellipse cx="58" cy="282" rx="40" ry="6" fill="rgba(30,15,5,.3)"/><path d="M24,252 V278 Q58,290 92,278 V252 Z" fill="#8a5a30" stroke="#4a2a10" stroke-width="1.4"/>
        ${[34, 50, 66, 82].map(x => `<path d="M${x},256 V${280 - Math.abs(x - 58) / 6}" stroke="#5a3418" stroke-width="1.2" opacity=".6"/>`).join('')}
        <ellipse cx="58" cy="252" rx="34" ry="9" fill="#e6c08a" stroke="#4a2a10" stroke-width="1.4"/><ellipse cx="58" cy="252" rx="20" ry="5" fill="none" stroke="#b88a50"/><ellipse cx="58" cy="252" rx="9" ry="2.4" fill="none" stroke="#b88a50"/></g>`;
      const на_тарелке = st.в.map((v, k) => v ? '' : частьТащ(н, 'ч' + k, ЧЕТ[1], R, false, 58 + (k - 1.5) * 23, 247, st.нов && st.нов.k === k && н.свежо(st.нов.t) ? st.нов.от : null)).join('');
      const тело = `${дымка}${земля(240)}
        ${н.герой('тоша', 330, 246, 100, null, всё ? 'радуется' : null)}
        ${весы(н, st, 196, 240, { L: 64, ш: 84, H: 114, вис: 56, л: 2, п: n, зоны: всё ? null : ['л', 'п'], чаша })}
        ${пень}${тарелка(58, 248, 48)}${всё ? '' : н.зона('тарелка', 8, 212, 100, 48)}${на_тарелке}
        ${н.облачко('тоша', 300, 120)}`;
      return н.сцена(тело, 'Весы: половинка против четвертинок', !всё, 'fon_sad') +
        (всё ? н.готово('Две четвертинки весят столько же, сколько половинка: ДВЕ ЧЕТВЕРТИ — это ПОЛОВИНА. А четыре четверти — целое яблоко.') : '');
    },
    готов: st => st.в.filter(Boolean).length === 2,
    делать: () => 'Клади четвертинки с тарелки на правую чашу, пока весы не встанут ровно',
    подсказка: st => { const n = st.в.filter(Boolean).length; return n < 2 ? 'Половинка тяжелее. Добавь ещё четвертинку!' : 'Четвертинки перевесили. Сними одну обратно на тарелку.'; },
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ч' || (зона !== 'п' && зона !== 'тарелка')) return false;
      const k = +что[1], v = зона === 'п';
      if (st.в[k] === v) return false;
      st.в[k] = v; st.нов = { k, от: x == null ? null : [x, y], t: Date.now() };
      const n = st.в.filter(Boolean).length;
      н.сказ('тоша', n === 2 ? 'Ровно! Две четвертинки — как одна половинка.' : n < 2 ? (n ? 'Одна четвертинка легче половинки. Ещё!' : 'Пусто — половинка перевешивает.') : `${n} четвертинки — перевесили! Сними лишнюю.`, n === 2 ? 'ура' : null);
      return true;
    },
    тап(st, что){ const k = +что[1]; return st.в[k] ? 'тарелка' : 'п'; }
  },
  /* 8 · ЗАГАДКИ ХАПУНА ────────────────────────────────────── */
  {
    кто: 'хапун', t: 'Загадки Хапуна',
    say: 'Хе-хе! Я енот Хапун, утащил звёзды с неба. Скажи, сколько яблок в одной корзинке, — верну звезду!',
    начало(st){ st.з = 0; st.ответ = null; },
    рисуй(st, н){
      const небо = (n) => Array.from({ length: n }, (_, k) => н.карт('star', 22 + k * 26, 22, 22, { центр: true, класс: k === n - 1 && н.свежо(st.t) ? 'хлоп' : 'мерцает' })).join('');
      if (st.з >= ЗАГАДКИ.length) return н.сцена(`${дымка}${земля(238)}${небо(6)}${н.герой('рыжинка', 120, 292, 130, null, 'радуется')}${н.герой('хапун', 250, 292, 120)}`, 'Звёзды вернулись на небо', false, 'fon_dolina') +
        н.готово('Шесть из шести! Звёзды снова на небе. Половина — делим на 2 равные части, четверть — на 4.');
      const З = ЗАГАДКИ[st.з], верн = З.n / З.ч, верно = st.ответ === верн;
      const КX = З.ч === 2 ? [74, 158] : [32, 86, 140, 194];
      const корзинки = КX.map((x, g) => { const к = корзина(x, 292, 44, 18);
        return к.зад + (верно ? горка(верн, x, 274, 6, 3).map(([ax, ay], j) => `<g transform="translate(${ф2(ax)},${ф2(ay)})"><g class="лёт" style="--dx:${ф2(115 - x)}px;--dy:-90px;animation-delay:${(g * верн + j) * .05}s">${яблоко(6, false, false)}</g></g>`).join('') : '') + к.перед; }).join('');
      const тело = `${дымка}${земля(238)}${небо(st.з + (верно ? 1 : 0))}
        <path d="M0,242 Q180,232 360,244 L360,256 Q180,246 0,256 Z" fill="#c8a070" opacity=".55" pointer-events="none"/>
        ${н.герой('хапун', 326, 240, 96, null, верно ? null : 'п74-хитрит')}
        ${тележка(40, 240, верно ? 0 : З.n, приезд(st))}
        ${столбик(н, 250, 150, 240, верно ? н.жетон(String(верн)) : null, !верно)}
        ${корзинки}
        ${верно ? '' : ЖЕТОНЫ(З).map((т, k) => т === st.ош ? '' : н.тащ('ж' + т, 244 + k * 42, 282, н.жетон(String(т), 17))).join('')}
        ${н.облачко('хапун', 300, 118)}`;
      return н.сцена(тело, `Тележка: ${З.n} яблок и ${З.ч} корзинки`, !верно, 'fon_dolina') +
        (верно ? н.готово(`${З.ч === 2 ? 'Половина' : 'Четверть'} от ${З.n} — это ${верн}: ${З.n} : ${З.ч} = ${верн}. Звезда вернулась на небо!`) + н.кнопка(st.з < ЗАГАДКИ.length - 1 ? 'Следующая тележка →' : 'Готово →', н.клик('дальше')) : '');
    },
    готов: st => st.з >= ЗАГАДКИ.length,
    делать: st => { const З = ЗАГАДКИ[Math.min(st.з, ЗАГАДКИ.length - 1)];
      return `${З.n} яблок разложим поровну в ${З.ч} корзинки — это ${З.ч === 2 ? 'половина' : 'четверть'}. Сколько в одной? Жетон неси в окошко`; },
    подсказка: st => { const З = ЗАГАДКИ[Math.min(st.з, ЗАГАДКИ.length - 1)]; return `Посчитай яблоки в тележке и раздели на ${З.ч} равные части.`; },
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ж' || зона !== 'окно') return false;
      const З = ЗАГАДКИ[st.з], т = +что.slice(1), верн = З.n / З.ч;
      if (т === верн){ st.ответ = т; st.t = Date.now(); н.сказ('хапун', 'Эх, угадал! Забирай звезду.'); return true; }
      st.ош = т; н.сказ('хапун', т === З.n - З.ч ? `Хе-хе, это ${З.n} − ${З.ч}! А надо делить поровну.` : т === З.n / 4 ? 'Хе-хе! Это в четырёх корзинках так. А их две!' : т === З.n / 2 ? 'Хе-хе! Это если в две корзинки. А их четыре!' : `Хе-хе, не так! Разложи ${З.n} поровну в ${З.ч} корзинки.`);
      return false;
    },
    тап(){ return 'окно'; },
    клики: { дальше(st){ st.з++; st.ответ = null; st.ош = null; st.рк = null; st.прибыл = 0; } }
  },
  /* 9 · ЗОЛОТОЕ ЯБЛОКО ─────────────────────────────────────── */
  {
    кто: 'рыжинка', t: 'Собери Золотое яблоко',
    say: 'Праздник! Хапун спрятал четвертинки Золотого яблока. Найди их и неси на золотое блюдо!',
    начало(st){ st.на = [false, false, false, false]; },
    рисуй(st, н){
      const все = st.на.every(Boolean), R = 40, CX = 180, CY = 128;
      const гирлянда = `<path d="M0,16 Q90,40 180,18 Q270,40 360,16" stroke="#5a3418" stroke-width="1.6" fill="none"/>
        ${Array.from({ length: 9 }, (_, k) => { const x = 20 + k * 40, y = 16 + 20 * Math.sin(Math.PI * ((x % 180) / 180)) * .9 + 2;
          return `<g transform="translate(${x},${ф2(y)})"><path d="M0,0 V5" stroke="#5a3418"/>${все ? `<circle cy="13" r="15" fill="url(#п74-фонарь)" class="п74-огонёк" style="animation-delay:${-k * .25}s"/>` : ''}
            <rect x="-6" y="5" width="12" height="15" rx="5" fill="${['#ff6a4a', '#ffd040', '#5ad06a', '#4a9aff'][k % 4]}" stroke="#5a3418" stroke-width="1" opacity="${все ? 1 : .6}"/></g>`; }).join('')}`;
      const постамент = `<g pointer-events="none"><ellipse cx="${CX}" cy="242" rx="38" ry="6" fill="rgba(30,15,5,.3)"/>
        <path d="M${CX - 30},240 L${CX - 24},226 H${CX + 24} L${CX + 30},240 Z" fill="url(#п74-камень)" stroke="#6a6052"/>
        <rect x="${CX - 14}" y="${CY + 50}" width="28" height="${226 - CY - 50}" fill="url(#п74-камень)" stroke="#6a6052"/>
        <path d="M${CX - 22},${CY + 52} H${CX + 22} L${CX + 14},${CY + 60} H${CX - 14} Z" fill="url(#п74-камень)" stroke="#6a6052"/>
        <ellipse cx="${CX}" cy="${CY + 46}" rx="56" ry="11" fill="url(#п74-латунь)" stroke="#6a4208" stroke-width="1.4"/>
        <ellipse cx="${CX}" cy="${CY + 44}" rx="42" ry="6" fill="#ffe9a0" opacity=".6"/></g>`;
      const гнёзда = [0, 1, 2, 3].map(k => { const [mx, my] = середина(ЧЕТ[k]);
        return st.на[k] ? `<g transform="translate(${ф2(CX + Math.sign(mx) * 1)},${ф2(CY + Math.sign(my) * 1)})"><g class="хлоп">${кусок(ЧЕТ[k], R, true)}</g></g>`
          : `<path d="${сектор(ЧЕТ[k].a0, ЧЕТ[k].a1, R)}" transform="translate(${CX},${CY})" fill="rgba(255,250,220,.35)" stroke="#fff" stroke-width="2.2" stroke-dasharray="6 5" pointer-events="none"/>`; }).join('');
      const М = [[58, 262], [128, 276], [240, 278], [302, 264]];
      const тайники = `<g pointer-events="none">
          <ellipse cx="58" cy="288" rx="32" ry="5" fill="rgba(30,15,5,.3)"/><path d="M30,264 V284 Q58,294 86,284 V264 Z" fill="#8a5a30" stroke="#4a2a10"/><ellipse cx="58" cy="264" rx="28" ry="7" fill="#e6c08a" stroke="#4a2a10"/>
          ${корзина(128, 296, 64, 20).зад}
          ${[[226, 290, 26], [252, 284, 24], [240, 270, 22]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#3f8a2a" stroke="#245a18" stroke-width="1.2"/>`).join('')}
          ${[[220, 280], [246, 266], [258, 288]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#ff5a6a"/>`).join('')}
          <path d="M282,292 Q278,262 292,252 L312,252 Q326,262 322,292 Z" fill="#b08a5a" stroke="#5a3a18" stroke-width="1.4"/><path d="M288,256 Q302,262 316,256" stroke="#5a3a18" stroke-width="2" fill="none"/></g>
        ${М.map(([x, y], k) => st.на[k] ? '' : частьТащ(н, 'ч' + k, ЧЕТ[k], 20, true, x, y, null)).join('')}
        <g pointer-events="none">${корзина(128, 296, 64, 20).перед}</g>`;
      const тело = `${дымка}${гирлянда}${земля(240)}
        ${н.герой('рыжинка', 44, 244, 100, null, все ? 'радуется' : null)}${н.герой('хапун', 324, 244, 92, null, все ? null : 'п74-хитрит')}
        ${постамент}${все ? '' : н.зона('блюдо', 118, 70, 124, 120)}
        ${все ? `<circle cx="${CX}" cy="${CY}" r="${R + 14}" fill="url(#п74-фонарь)" class="п74-огонёк"/>` : ''}
        ${все ? `<g transform="translate(${CX},${CY + 4})"><g class="хлоп">${яблоко(44, true)}</g></g>` : гнёзда}${тайники}
        ${все ? [[40, 70], [320, 74], [180, 64]].map(([x, y]) => н.карт('star', x, y, 30, { центр: true, класс: 'хлоп' })).join('') : ''}
        ${н.облачко('рыжинка', 70, 110)}`;
      return н.сцена(тело, 'Праздник: золотое блюдо и спрятанные четвертинки', !все, 'fon_prazdnik') +
        `<div class="памятка">
          <div><b>половина</b><span>одна из двух равных частей — весы ровно</span></div>
          <div><b>четверть</b><span>одна из четырёх равных частей</span></div>
          <div><b>8 : 2 = 4</b><span>половина от восьми</span></div>
          <div><b>¼ + ¼ = ½</b><span>две четвертинки — половинка</span></div>
        </div>` + (все ? н.готово('Ура! Четыре четверти — целое Золотое яблоко. Две половинки — тоже целое. Праздник начинается!') : '');
    },
    готов: st => st.на.every(Boolean),
    делать: () => 'Найди четвертинки и перетащи на золотое блюдо',
    подсказка: () => 'Пенёк слева, корзинка, куст и мешок Хапуна — там блестят золотые кусочки.',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ч' || зона !== 'блюдо') return false;
      const k = +что[1]; if (st.на[k]) return false;
      st.на[k] = true;
      const n = st.на.filter(Boolean).length;
      н.сказ('рыжинка', n === 4 ? 'Четыре четверти — целое яблоко! Ура!' : n === 2 ? 'Две четверти — это уже половина!' : n === 3 ? 'Три четверти. Ещё одна!' : 'Одна четверть на месте!');
      return true;
    },
    тап(){ return 'блюдо'; }
  }
  ];

  /* ═══════════ анимации урока ═══════════ */
  if (!document.getElementById('п74-стиль')){
    const s = document.createElement('style'); s.id = 'п74-стиль';
    const Ф = 'transform-box:fill-box;transform-origin:center';
    s.textContent = `
      #lvis .дк.дк74 g.облачко{animation:дк-хлоп .35s ease-out both,п74-гаснет .6s ease-in 4s forwards}
      #lvis .дк74 .п74-кор{animation:п74-кор .95s cubic-bezier(.3,1.5,.5,1) both;${Ф}}
      #lvis .дк74 .п74-чаша{animation:п74-чаша .95s cubic-bezier(.3,1.5,.5,1) both}
      #lvis .дк74 .п74-рубит{animation:п74-рубит 1.1s ease-in-out both}
      #lvis .дк74 .п74-рубит2{animation:п74-рубит2 1.8s ease-in-out both}
      #lvis .дк74 .п74-шест{animation:п74-круг .6s linear 3;${Ф}}
      #lvis .дк74 .п74-шест2{animation:п74-круг .5s linear reverse 4;${Ф}}
      #lvis .дк74 .п74-брызги{animation:п74-брызги .9s ease-out .35s both;pointer-events:none}
      #lvis .дк74 .п74-врозь{animation:п74-врозь .5s cubic-bezier(.3,1.5,.5,1) .38s both}
      #lvis .дк74 .п74-врозь2{animation:п74-врозь .5s cubic-bezier(.3,1.5,.5,1) 1.25s both}
      #lvis .дк74 .п74-лист{animation:п74-лист 2.8s ease-in-out infinite;transform-box:fill-box;transform-origin:0 50%}
      #lvis .дк74 .п74-кач{animation:п74-кач 2.4s ease-in-out infinite;${Ф}}
      #lvis .дк74 .п74-хитрит{animation:п74-хитрит 1.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
      #lvis .дк74 .п74-плыть{animation:п74-плыть 3s ease-in-out infinite;${Ф}}
      #lvis .дк74 .п74-волна{animation:п74-волна 3.6s ease-in-out infinite}
      #lvis .дк74 .п74-круги{animation:п74-круги 2.4s ease-out infinite;${Ф}}
      #lvis .дк74 .п74-приезд{animation:п74-приезд 1.6s cubic-bezier(.2,.7,.3,1) both}
      #lvis .дк74 .п74-приезд .п74-колесо{animation:п74-круг .5s linear infinite reverse;${Ф}}
      #lvis .дк74 .п74-огонёк{animation:п74-огонёк 1.3s ease-in-out infinite}
      @keyframes п74-гаснет{to{opacity:0}}
      @keyframes п74-кор{from{transform:rotate(var(--от))}to{transform:rotate(0deg)}}
      @keyframes п74-чаша{from{transform:translateY(var(--д))}to{transform:translateY(0)}}
      @keyframes п74-рубит{0%{transform:translateY(0)}32%{transform:translateY(56px)}55%{transform:translateY(56px)}100%{transform:translateY(0)}}
      @keyframes п74-рубит2{0%{transform:translateY(0)}18%{transform:translateY(56px)}30%{transform:translateY(56px)}46%{transform:translateY(0)}64%{transform:translateY(56px)}74%{transform:translateY(56px)}100%{transform:translateY(0)}}
      @keyframes п74-круг{to{transform:rotate(360deg)}}
      @keyframes п74-брызги{0%{opacity:0;transform:translateY(6px) scale(.4)}30%{opacity:1}100%{opacity:0;transform:translateY(-14px) scale(1.4)}}
      @keyframes п74-врозь{from{transform:translate(var(--dx,0),var(--dy,0))}to{transform:translate(0,0)}}
      @keyframes п74-лист{0%,100%{transform:rotate(-8deg)}50%{transform:rotate(8deg)}}
      @keyframes п74-кач{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
      @keyframes п74-хитрит{0%,100%{transform:rotate(-3deg) translateY(0)}50%{transform:rotate(3deg) translateY(-4px)}}
      @keyframes п74-плыть{0%,100%{transform:translate(0,0) rotate(-3deg)}50%{transform:translate(7px,-4px) rotate(4deg)}}
      @keyframes п74-волна{0%,100%{transform:translateX(0)}50%{transform:translateX(10px)}}
      @keyframes п74-круги{0%{transform:scale(.6);opacity:.9}100%{transform:scale(1.6);opacity:0}}
      @keyframes п74-приезд{0%{transform:translateX(400px)}100%{transform:translateX(0)}}
      @keyframes п74-огонёк{0%,100%{opacity:.45}50%{opacity:1}}
      @media (prefers-reduced-motion:reduce){#lvis .дк74 *{animation:none !important;transition:none !important}}`;
    document.head.appendChild(s);
  }

  /* градиенты урока — в каждую сцену */
  КАДРЫ.forEach(к => { const р0 = к.рисуй; к.рисуй = (st, н, i) => { N = 0; const с = н.сцена; н.сцена = (тело, ...а) => с(ГРАД + тело, ...а); return р0(st, н, i); }; });

  /* картинки тренажёра: яблоки в корзине, пустые тарелки по числу частей, герой */
  const картинкаЗадачи = (н, n, ч, кто, фон) => { N = 0; const к = корзина(96, 280, 120, 26), м = горка(n, 96, 254, 10);
    return н.сцена(`${ГРАД}${дымка}${земля(220)}${н.герой(кто, 316, 230, 104)}
      ${к.зад}${м.map(([x, y]) => `<g transform="translate(${ф2(x)},${ф2(y)})">${яблоко(10, false, false)}</g>`).join('')}${к.перед}
      ${Array.from({ length: ч }, (_, g) => тарелка(ч === 2 ? 196 + g * 52 : 184 + (g % 2) * 52, ч === 2 ? 262 : 244 + Math.floor(g / 2) * 34, 22)).join('')}`,
      `${n} яблок и ${ч} тарелки`, false, фон); };
  ДК.подключить({
    ID, ИМГ: 'img/l74/', размеры: РАЗМЕРЫ,
    герои: {
      рыжинка: { имя: 'Рыжинка', ф: 'fox' },
      тоша:    { имя: 'Тоша',    ф: 'hog' },
      умка:    { имя: 'Умка',    ф: 'owl' },
      хапун:   { имя: 'Хапун',   ф: 'villain' }
    },
    фоны: ['fon_sad', 'fon_dolina', 'fon_sad', 'fon_sad', 'fon_dolina', 'fon_peshera', 'fon_ozero', 'fon_sad', 'fon_dolina', 'fon_prazdnik'],
    кадры: КАДРЫ,
    запись: {
      title: 'Половина яблока: доли', ico: '🍎', subj: 'jun',
      src: 'Начальная школа · 2 класс · Доли: половина и четверть',
      check: { q: 'Найди четверть от 12 яблок.', choices: ['2', '3', '4'], ans: 1, exp: '12 : 4 = 3 яблока.' },
      tasks: [
        { q: 'Найди половину от 10 яблок.', kind: 'unit', ans: 5, tol: 0, hints: ['Половина — раздели на 2.', '10 : 2 = 5.'], sol: '10 : 2 = 5 яблок.' },
        { q: 'Найди четверть от 16 яблок.', kind: 'choice', choices: ['3', '4', '5'], ans: 1, tol: 0, hints: ['Четверть — раздели на 4.', '16 : 4 = 4.'], sol: '16 : 4 = 4 яблока.' },
        { q: 'Яблоко разрезали на 2 неравные части. Это половинки?', kind: 'choice', choices: ['Да', 'Нет'], ans: 1, tol: 0, hints: ['Половины — всегда равные.', 'Неравные части — не половины.'], sol: 'Нет: половины должны быть равными.' }
      ]
    },
    тренажёр: {
      герой: 'умка',
      проверка: {
        картинка: (н) => картинкаЗадачи(н, 12, 4, 'умка', 'fon_dolina'),
        разборы: { '2': 'Двенадцать на четыре равные части — по три.', '4': 'Это 12 : 3. А четверть — на ЧЕТЫРЕ части.' },
        итог: '12 : 4 = 3.'
      },
      задачи: [
        { кто: 'рыжинка', картинка: (н) => картинкаЗадачи(н, 10, 2, 'рыжинка', 'fon_sad'),
          разборы: { 2: 'Это пятая часть. Половина — на две части!', 8: 'Это 10 − 2. А нужно поделить пополам.' }, итог: '10 : 2 = 5.' },
        { кто: 'тоша', картинка: (н) => картинкаЗадачи(н, 16, 4, 'тоша', 'fon_sad'),
          разборы: { '3': 'Посчитай ещё: 16 на 4 равные части.', '5': 'Многовато: 4 части по 5 — это 20.' }, итог: '16 : 4 = 4.' },
        { кто: 'хапун', картинка: (н) => { N = 0; const Д = ДОЛЬКИ_НА_ТАРЕЛКАХ[0];
            return н.сцена(`${ГРАД}${дымка}${земля(240)}${н.герой('хапун', 316, 246, 100, null, 'п74-хитрит')}
              ${весы(н, {}, 150, 240, Object.assign({ л: доля(Д[0]) * 4, п: доля(Д[1]) * 4, чаша: (с, x, об) => `<g transform="translate(${x},${об + 1})">${сидячий(Д[с === 'л' ? 0 : 1], 22, false)}</g>` }, ВЕС8))}`,
              'Весы с неравными кусочками', false, 'fon_peshera'); },
          разборы: { 'Да': 'Хе-хе, так думает Хапун! Смотри — весы перекосило. Половины — только РАВНЫЕ части.' }, итог: 'Половины — две РАВНЫЕ части: весы стоят ровно.' }
      ],
      финал: (н) => { N = 0; return н.сцена(`${ГРАД}${дымка}${земля(240)}<g transform="translate(180,140)">${яблоко(56, true)}</g>${н.герой('рыжинка', 56, 246, 100, null, 'радуется')}${н.герой('тоша', 304, 246, 100, null, 'радуется')}
          ${[[60, 50], [300, 50], [180, 26]].map(([x, y]) => н.карт('star', x, y, 36, { центр: true, класс: 'хлоп' })).join('')}`, 'Золотое яблоко', false, 'fon_prazdnik'); }
    }
  });
})();
