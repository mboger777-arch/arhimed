/* ============ УРОК 71 · «ЦЫПЛЯТА ПАРАМИ» · умножение на 2 ============

   История: короткий комикс (MVP/data/lessons.js) → v937 урок на ферме из игры владельца
   «Цыплята парами» → v940 «как 301, только лучше» (пара — вагончик на двоих, паровозик) →
   14.10.2026 владелец: «ужасно, поезда в воздухе, всё не совпадает, ничего не понятно», «везде
   таблички эти зачем-то» (убрать деревянные вывески сверху и доску с примером под картинкой),
   «никакой анимации нет, простейшие SVG, улучши в 50 раз». Переделано:
   • у каждого кадра земля переднего плана: рельсы лежат на насыпи, перрон стоит на земле,
     жетоны и карточки лежат на столике, на перроне или на билете — ничего не висит в воздухе;
   • паровоз и вагончики нарисованы заново, как иллюстрация: котёл с бликами и заклёпками,
     мордочка с моргающими глазами, труба с клубами дыма, качающийся колокол, светящаяся фара,
     Хрум в окне кабины, колёса со спицами и шатуном, деревянные вагончики из досок с уголками,
     буферами и сцепками; цыплята в вагончиках покачиваются;
   • анимация: поезд приезжает на станцию в начале кадра, трогается после счёта, уезжает в финале,
     колёса крутятся на ходу, дым идёт всегда;
   • вывесок нет: вопрос задаёт герой (реплика сверху и облачко), ответ несут в круглое окошко
     на столбике, запись 4 · 2 собирают на бумажном билете кондуктора.

   ГЛАВНАЯ МЫСЛЬ: ПАРА — ЭТО ВАГОНЧИК НА ДВОИХ. Сколько вагончиков — столько пар; цыплят —
   вагончики · 2. Прицепили вагончик — стало на два больше: 2, 4, 6, 8… Пары бывают и у носочков.
   Герои: Хрум — машинист, Борька — кондуктор, Бублик, Искра, сорока Щёлк (из игры).
   Движок — общий набор MVP/data/jun_kit.js (перетаскивание, живые герои, Nunito). */
(function(){
  'use strict';
  if (!window.ДК) return;
  const ID = 71;
  const РАЗМЕРЫ = { bublik: [230, 300], iskra_hero: [181, 300], iskra_jump: [226, 300], shchelk_front: [381, 260], shchelk_laugh: [280, 260],
    shchelk_carry: [303, 220], h_chick: [153, 260], it_chick: [83, 120], it_gegg: [91, 110], it_nest: [239, 140], t_star: [109, 110], basket: [174, 180],
    hrum: [203, 300], hrum_ura: [230, 300], hrum_lupa: [269, 300], hrum_daet: [265, 300], borka: [196, 300], borka_pokaz: [267, 300] };
  /* цвет вагончика: светлый, основной, тень */
  const ЦВЕТ = [['#ff8a6a', '#e0503a', '#8a2414'], ['#7fb6ff', '#3f7ad8', '#1c3c80'], ['#9be27a', '#4fa83a', '#25601a'],
                ['#ffd86a', '#eba21c', '#8a5a08'], ['#d29af2', '#9356cc', '#4e2478'], ['#ffa6cf', '#de5c98', '#7a2450']];
  let N = 0;                                        /* счётчик уникальных id внутри одной отрисовки */

  /* ═══════════ градиенты ═══════════ */
  const ГРАД = `<defs>
    ${ЦВЕТ.map((ц, k) => `<linearGradient id="п71-в${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${ц[0]}"/><stop offset=".55" stop-color="${ц[1]}"/><stop offset="1" stop-color="${ц[2]}"/></linearGradient>`).join('')}
    <linearGradient id="п71-доски" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2b07a"/><stop offset=".5" stop-color="#c48a52"/><stop offset="1" stop-color="#8f5a2c"/></linearGradient>
    <linearGradient id="п71-котёл" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f8fc4"/><stop offset=".22" stop-color="#9fbbe6"/><stop offset=".45" stop-color="#3d5f9e"/><stop offset="1" stop-color="#1a2d55"/></linearGradient>
    <linearGradient id="п71-кабина" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8341f"/><stop offset=".35" stop-color="#ef6a4c"/><stop offset="1" stop-color="#9c2a18"/></linearGradient>
    <linearGradient id="п71-труба" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2a2f3a"/><stop offset=".4" stop-color="#6a7488"/><stop offset="1" stop-color="#1c2028"/></linearGradient>
    <linearGradient id="п71-латунь" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff3b4"/><stop offset=".45" stop-color="#e8b040"/><stop offset="1" stop-color="#8a5a10"/></linearGradient>
    <radialGradient id="п71-колесо" cx=".42" cy=".38" r=".75"><stop offset="0" stop-color="#ff7a5c"/><stop offset=".7" stop-color="#c8341e"/><stop offset="1" stop-color="#6a160a"/></radialGradient>
    <radialGradient id="п71-шина" cx=".5" cy=".5" r=".5"><stop offset=".78" stop-color="#3a3f48"/><stop offset=".92" stop-color="#9aa2ae"/><stop offset="1" stop-color="#2a2e36"/></radialGradient>
    <radialGradient id="п71-дым" cx=".4" cy=".35" r=".65"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eef1f6"/><stop offset="1" stop-color="#cfd6e0" stop-opacity="0"/></radialGradient>
    <radialGradient id="п71-свет" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fffbd0"/><stop offset=".35" stop-color="#ffe680" stop-opacity=".8"/><stop offset="1" stop-color="#ffd040" stop-opacity="0"/></radialGradient>
    <radialGradient id="п71-окно" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#e8f6ff"/><stop offset="1" stop-color="#8cc4ee"/></radialGradient>
    <linearGradient id="п71-рельс" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f5f8"/><stop offset=".5" stop-color="#a9b2bc"/><stop offset="1" stop-color="#5d6670"/></linearGradient>
    <linearGradient id="п71-насыпь" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8bfae"/><stop offset="1" stop-color="#857a68"/></linearGradient>
    <linearGradient id="п71-трава" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a6d86c"/><stop offset=".3" stop-color="#7cb84c"/><stop offset="1" stop-color="#4a8230"/></linearGradient>
    <linearGradient id="п71-пол" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcb27c"/><stop offset="1" stop-color="#94643a"/></linearGradient>
    <linearGradient id="п71-перрон" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6c08a"/><stop offset=".4" stop-color="#c99a5e"/><stop offset="1" stop-color="#8a5e30"/></linearGradient>
    <linearGradient id="п71-бумага" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#f3e2bc"/></linearGradient>
    <pattern id="п71-щебень" width="8" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.3" fill="#9a907e"/><circle cx="6" cy="4" r="1.1" fill="#6f6656"/></pattern>
  </defs>`;

  /* ═══════════ колесо со спицами (центр 0,0, радиус r) ═══════════ */
  function колесо(x, y, r){
    const спицы = Array.from({ length: 8 }, (_, k) => { const a = k * Math.PI / 4; return `M0,0 L${(Math.cos(a) * r * .78).toFixed(2)},${(Math.sin(a) * r * .78).toFixed(2)}`; }).join(' ');
    return `<g transform="translate(${x},${y})"><g class="п71-колесо">
      <circle r="${r}" fill="url(#п71-шина)"/>
      <circle r="${r * .84}" fill="url(#п71-колесо)" stroke="#5a1408" stroke-width="${r * .06}"/>
      <path d="${спицы}" stroke="#ffd2b0" stroke-width="${r * .11}" stroke-linecap="round" opacity=".9"/>
      <circle r="${r * .28}" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width="${r * .05}"/>
      <circle cx="${r * .5}" cy="0" r="${r * .1}" fill="#3a2a10"/></g>
      <ellipse cx="${-r * .3}" cy="${-r * .45}" rx="${r * .35}" ry="${r * .14}" fill="#fff" opacity=".25" transform="rotate(-30 ${-r * .3} ${-r * .45})"/></g>`;
  }

  /* ═══════════ вагончик (местные единицы: ширина 100, низ колёс — 62) ═══════════
     x — левый край, yз — рельс, ш — ширина; n цыплят; k — цвет; о: метка, билет, клик, нов {j, от:[X,Y], t} */
  function вагон(н, x, yз, ш, n, k, о){
    о = о || {};
    const s = ш / 100, ц = k % ЦВЕТ.length, верх = yз - 62 * s;
    const места = [30, 70];
    const цыплята = Array.from({ length: Math.min(2, n) }, (_, j) => {
      const от = о.нов && о.нов.j === j && н.свежо(о.нов.t) ? [(о.нов.от[0] - x) / s, (о.нов.от[1] - верх) / s] : null;
      return `<g class="п71-цып" style="animation-delay:${-(j * .7 + k * .3)}s">${н.карт('it_chick', места[j], 30, 62, { откуда: от })}</g>`;
    }).join('');
    const доски = [19, 27, 35].map(y => `<path d="M5,${y} H95" stroke="#7a4a22" stroke-width="1" opacity=".55"/>`).join('');
    const заклёпки = [[6, 14], [6, 38], [94, 14], [94, 38], [50, 14], [50, 38]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="1.5" fill="#f4e2b8" stroke="#5a3a18" stroke-width=".5"/>`).join('');
    return `<g ${о.клик ? н.цель(о.клик) : ''}><g transform="translate(${x},${верх}) scale(${s})">
      ${о.клик ? `<rect x="-6" y="-26" width="112" height="92" fill="transparent"/>` : ''}
      <ellipse cx="50" cy="63" rx="52" ry="4" fill="rgba(30,15,5,.35)"/>
      <rect x="4" y="2" width="92" height="9" rx="3" fill="${ЦВЕТ[ц][2]}"/>
      ${цыплята}
      <rect x="-5" y="40" width="9" height="6" rx="2" fill="#3a3f48"/><circle cx="-6" cy="43" r="3.4" fill="#9aa2ae" stroke="#3a3f48" stroke-width="1"/>
      <rect x="96" y="40" width="9" height="6" rx="2" fill="#3a3f48"/><circle cx="106" cy="43" r="3.4" fill="#9aa2ae" stroke="#3a3f48" stroke-width="1"/>
      <rect x="2" y="42" width="96" height="7" rx="2" fill="#2e2620"/>
      <rect x="2" y="10" width="96" height="33" rx="4" fill="url(#п71-доски)" stroke="#5a3418" stroke-width="1.6"/>
      ${доски}
      <rect x="0" y="5" width="100" height="8" rx="3.5" fill="url(#п71-в${ц})" stroke="${ЦВЕТ[ц][2]}" stroke-width="1.2"/>
      <path d="M3,7 H97" stroke="#fff" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>
      <path d="M2,14 h8 v-4 M98,14 h-8 v-4 M2,40 h8 v3 M98,40 h-8 v3" stroke="#3a3f48" stroke-width="2.4" fill="none"/>
      <rect x="47" y="10" width="6" height="33" fill="#7a4a22" opacity=".45"/>
      ${заклёпки}
      <path d="M8,13 Q30,11 46,13" stroke="#fff" stroke-width="1.4" opacity=".25" fill="none"/>
      ${о.метка != null ? `<g transform="translate(50,27)"><g class="хлоп"><circle r="11" fill="url(#дк-окно)" stroke="#6b3f1e" stroke-width="1.6"/>
        <text y="4.6" text-anchor="middle" class="метка-ч" style="font-size:13px">${о.метка}</text></g></g>` : ''}
      ${колесо(24, 51, 11)}${колесо(76, 51, 11)}
      ${о.билет ? `<g transform="translate(50,-30) rotate(-8)"><g class="хлоп"><rect x="-17" y="-11" width="34" height="22" rx="3" fill="url(#п71-бумага)" stroke="#a3762a" stroke-width="1.4" stroke-dasharray="3 2"/>
        <text y="6" text-anchor="middle" class="метка-ч" style="font-size:15px">${о.билет}</text></g></g>` : ''}
    </g></g>`;
  }

  /* ═══════════ паровоз (местные единицы: ширина 100, низ колёс — 84), смотрит влево ═══════════ */
  function паровоз(н, x, yз, ш, о){
    о = о || {};
    const s = ш / 100, id = 'п71-каб' + (++N);
    const дым = [[0, 0, 7], [6, -12, 9], [-2, -26, 11], [8, -42, 13]].map(([dx, dy, r], q) =>
      `<circle cx="${24 + dx}" cy="${-2 + dy}" r="${r}" fill="url(#п71-дым)" style="animation-delay:${-q * .55}s"/>`).join('');
    const заклёпки = [16, 24, 32, 40, 48, 56].map(a => `<circle cx="${a}" cy="34" r="1.1" fill="#c9d8f2"/><circle cx="${a}" cy="58" r="1.1" fill="#0e1a36"/>`).join('');
    return `<g transform="translate(${x},${yз - 84 * s}) scale(${s})">
      <ellipse cx="50" cy="85" rx="56" ry="4.5" fill="rgba(30,15,5,.38)"/>
      <g class="п71-дым">${дым}</g>
      <path d="M18,12 L30,12 L28,28 L20,28 Z" fill="url(#п71-труба)" stroke="#111" stroke-width="1.2"/>
      <path d="M13,4 Q24,-2 35,4 L32,12 L16,12 Z" fill="#c8341e" stroke="#5a1408" stroke-width="1.2"/>
      <rect x="15" y="10" width="18" height="3.5" rx="1.5" fill="url(#п71-латунь)"/>
      <path d="M36,30 Q42,18 48,30 Z" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width="1"/>
      <g transform="translate(55,22)"><g class="п71-колокол"><path d="M-5,8 Q-5,0 0,-1 Q5,0 5,8 Z" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width=".9"/><circle cy="9" r="1.4" fill="#6a4208"/></g>
        <path d="M-1,-4 h2 v4 h-2 Z" fill="#6a4208"/></g>
      <rect x="64" y="12" width="36" height="52" rx="4" fill="url(#п71-кабина)" stroke="#5a1408" stroke-width="1.6"/>
      <path d="M58,12 Q82,0 104,10 L104,15 L58,15 Z" fill="#6a1a10" stroke="#3a0c06" stroke-width="1.2"/>
      <path d="M60,13 Q82,4 102,11" stroke="#ff9a80" stroke-width="1.2" fill="none" opacity=".6"/>
      <clipPath id="${id}"><rect x="70" y="20" width="24" height="22" rx="4"/></clipPath>
      <rect x="70" y="20" width="24" height="22" rx="4" fill="url(#п71-окно)"/>
      ${о.машинист !== false ? `<g clip-path="url(#${id})"><image href="img/l71/hrum.webp" x="70" y="18" width="24" height="36"/></g>` : ''}
      <path d="M72,22 L80,22 L72,32 Z" fill="#fff" opacity=".45"/>
      <rect x="70" y="20" width="24" height="22" rx="4" fill="none" stroke="url(#п71-латунь)" stroke-width="2.4"/>
      <rect x="66" y="48" width="32" height="4" rx="2" fill="#ffd86a" opacity=".85"/>
      <rect x="8" y="30" width="60" height="30" rx="14" fill="url(#п71-котёл)" stroke="#0e1a36" stroke-width="1.6"/>
      <path d="M16,35 Q38,31 64,35" stroke="#e6f0ff" stroke-width="2.4" fill="none" opacity=".55" stroke-linecap="round"/>
      ${[30, 48].map(a => `<rect x="${a}" y="30" width="4" height="30" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width=".5"/>`).join('')}
      ${заклёпки}
      <circle cx="12" cy="45" r="15" fill="#22345e" stroke="#0e1a36" stroke-width="1.6"/>
      <circle cx="12" cy="45" r="12.5" fill="#2e4478"/>
      <g class="п71-глаза"><ellipse cx="7" cy="41" rx="3.4" ry="4" fill="#fff"/><ellipse cx="17" cy="41" rx="3.4" ry="4" fill="#fff"/>
        <circle cx="6.2" cy="41.8" r="1.9" fill="#1a1a2e"/><circle cx="16.2" cy="41.8" r="1.9" fill="#1a1a2e"/>
        <circle cx="5.6" cy="40.8" r=".7" fill="#fff"/><circle cx="15.6" cy="40.8" r=".7" fill="#fff"/></g>
      <circle cx="4.5" cy="48" r="2.3" fill="#ff8a9a" opacity=".7"/><circle cx="19.5" cy="48" r="2.3" fill="#ff8a9a" opacity=".7"/>
      <path d="M7.5,49 Q12,54 16.5,49" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>
      <circle class="п71-фара" cx="5" cy="27" r="14" fill="url(#п71-свет)"/>
      <rect x="1" y="23" width="9" height="8" rx="2.5" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width=".9"/>
      <circle cx="4" cy="27" r="2.6" fill="#fffbd0"/>
      <rect x="4" y="59" width="96" height="7" rx="2" fill="#2e2620"/>
      <path d="M-6,84 L6,62 L14,62 L14,84 Z" fill="#d8402a" stroke="#6a160a" stroke-width="1.2"/>
      <path d="M-2,80 L8,63 M3,82 L10,64 M8,84 L12,65" stroke="#ffb0a0" stroke-width="1.1" opacity=".8"/>
      <rect x="22" y="62" width="14" height="7" rx="2" fill="#4a5262" stroke="#1c2028" stroke-width=".8"/>
      ${колесо(18, 75, 9)}${колесо(50, 70, 14)}${колесо(82, 70, 14)}
      <g class="п71-шатун"><rect x="48" y="${о.шатун ? 70 : 74}" width="36" height="3.4" rx="1.7" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width=".6"/></g>
      <g class="п71-пар"><circle cx="26" cy="72" r="5" fill="url(#п71-дым)"/><circle cx="20" cy="70" r="4" fill="url(#п71-дым)"/></g>
    </g>`;
  }

  /* ═══════════ рельсы, земля, перрон, столик, окошко на столбике ═══════════ */
  const рельсы = (y, x0, x1) => { x0 = x0 || 0; x1 = x1 == null ? 360 : x1;
    return `<g><path d="M${x0 - 4},${y + 13} L${x0 + 4},${y - 3} H${x1 - 4} L${x1 + 4},${y + 13} Z" fill="url(#п71-насыпь)"/>
      <path d="M${x0 - 4},${y + 13} L${x0 + 4},${y - 3} H${x1 - 4} L${x1 + 4},${y + 13} Z" fill="url(#п71-щебень)" opacity=".8"/>
      ${Array.from({ length: Math.ceil((x1 - x0) / 16) }, (_, k) => `<rect x="${x0 + k * 16 + 2}" y="${y + 1}" width="11" height="6" rx="1.5" fill="#6a4426" stroke="#3a2412" stroke-width=".8"/>`).join('')}
      <rect x="${x0}" y="${y - 2.5}" width="${x1 - x0}" height="4" rx="1" fill="url(#п71-рельс)" stroke="#4a525c" stroke-width=".6"/></g>`; };
  const земля = (y, вид) => { let d = `M0,${y}`; for (let x = 0; x < 360; x += 20) d += ` Q${x + 10},${y - 4 - (x / 20 % 2) * 3} ${x + 20},${y}`;
    const пол = вид === 'пол';
    return `<path d="M0,300 V${y} ${d.slice(d.indexOf(' '))} V300 Z" fill="url(#п71-${пол ? 'пол' : 'трава'})"/>
      <path d="${d}" stroke="${пол ? '#7a5030' : '#3f7a28'}" stroke-width="2" fill="none" opacity=".55"/>
      ${пол ? Array.from({ length: 6 }, (_, k) => `<path d="M0,${y + 16 + k * 18} H360" stroke="#7a5030" stroke-width="1" opacity=".45"/>`).join('')
        : Array.from({ length: 16 }, (_, k) => { const x = 10 + k * 23, yy = y + 9 + (k * 37) % 46; return `<path d="M${x},${yy} l-3,-7 M${x},${yy} l1,-8 M${x},${yy} l4,-6" stroke="#3f7a28" stroke-width="1.4" stroke-linecap="round" opacity=".7"/>` +
          (k % 4 === 1 ? `<g transform="translate(${x + 8},${yy - 2})"><circle r="2.4" fill="#fff"/><circle r="1" fill="#ffd040"/></g>` : ''); }).join('')}`; };
  const дымка = `<rect width="360" height="300" fill="#fff8e6" opacity=".2"/>`;
  /* перрон на земле: доски сверху, жёлтая кромка, столбики спереди */
  const перрон = (y, x0, x1) => { x0 = x0 || 0; x1 = x1 == null ? 360 : x1;
    return `<g><rect x="${x0}" y="${y}" width="${x1 - x0}" height="10" fill="url(#п71-перрон)" stroke="#6b4422" stroke-width="1.2"/>
      ${Array.from({ length: Math.ceil((x1 - x0) / 30) }, (_, k) => `<path d="M${x0 + k * 30},${y} V${y + 10}" stroke="#8a5e30" stroke-width="1"/>`).join('')}
      <rect x="${x0}" y="${y + 1}" width="${x1 - x0}" height="2.4" fill="#ffd040" opacity=".9"/>
      <rect x="${x0}" y="${y + 10}" width="${x1 - x0}" height="12" fill="#8a5e30" stroke="#5a3418" stroke-width="1"/>
      ${Array.from({ length: Math.ceil((x1 - x0) / 40) }, (_, k) => `<rect x="${x0 + 6 + k * 40}" y="${y + 10}" width="6" height="12" fill="#5a3418" opacity=".6"/>`).join('')}
      <rect x="${x0}" y="${y + 22}" width="${x1 - x0}" height="4" fill="rgba(30,15,5,.3)"/></g>`; };
  const столик = (x0, x1, y, ноги) => `<g><ellipse cx="${(x0 + x1) / 2}" cy="${y + (ноги || 0) + 6}" rx="${(x1 - x0) * .5}" ry="5" fill="rgba(30,15,5,.3)"/>
    ${ноги ? `<rect x="${x0 + 8}" y="${y + 6}" width="6" height="${ноги}" fill="#6b4422"/><rect x="${x1 - 14}" y="${y + 6}" width="6" height="${ноги}" fill="#6b4422"/>` : ''}
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="9" rx="3" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="1.6"/>
    <path d="M${x0 + 4},${y + 2.5} H${x1 - 4}" stroke="#f4cf9a" stroke-width="1.4" opacity=".7"/></g>`;
  /* окошко для ответа — на столбике, вкопанном в землю (как станционные часы) */
  const столбик = (н, x, yОкна, yЗемли, занято, зона) => `${зона ? н.зона('окно', x - 34, yОкна - 34, 68, 68) : ''}
    <rect x="${x - 3}" y="${yОкна + 22}" width="6" height="${yЗемли - yОкна - 22}" fill="url(#п71-труба)"/>
    <ellipse cx="${x}" cy="${yЗемли}" rx="10" ry="3" fill="rgba(30,15,5,.35)"/>
    <circle cx="${x}" cy="${yОкна}" r="28" fill="url(#п71-латунь)" stroke="#6a4208" stroke-width="2"/>
    ${н.окошко(x, yОкна, занято, 21)}`;
  /* поезд */
  const xВагона = (k, шВ, x0) => (x0 != null ? x0 : 8) + шВ * 1.3 + 8 + k * (шВ + 9);
  function поезд(н, вагоны, о){
    о = о || {};
    const шВ = о.шВ || 70, x0 = о.x0 != null ? о.x0 : 8, y = о.y || 270, s = шВ / 100;
    const сцепки = вагоны.map((_, k) => { const xa = xВагона(k, шВ, x0); return `<path d="M${xa - 10},${y - 18 * s} q4,4 10,0" stroke="#3a3f48" stroke-width="${2.4 * s + 1}" fill="none"/>`; }).join('');
    return `<g class="п71-поезд ${о.класс || ''}">${сцепки}${паровоз(н, x0, y, шВ * 1.3, { машинист: о.машинист, шатун: о.класс && /едет|уезжает|приезжает/.test(о.класс) })}
      ${вагоны.map((n, k) => вагон(н, xВагона(k, шВ, x0), y, шВ, n, k, { метка: о.метки ? о.метки[k] : null, билет: о.билеты ? о.билеты[k] : null,
        клик: о.клик ? о.клик(k) : '', нов: о.нов && о.нов.k === k ? о.нов : null })).join('')}</g>
      ${о.зоны ? вагоны.map((_, k) => н.зона(о.зоны + k, xВагона(k, шВ, x0) - 4, y - шВ * 1.05, шВ + 8, шВ * 1.05)).join('') : ''}`;
  }
  /* приезд поезда в начале кадра: класс держится 1.8 с от первой отрисовки кадра */
  const приезд = (st) => { if (!st.прибыл) st.прибыл = Date.now(); return Date.now() - st.прибыл < 1800 ? 'приезжает' : ''; };
  /* цыплёнок на перроне, которого можно взять (ноги в y) */
  const цып = (н, что, x, y, h, k) => н.тащ(что, x, y - (h || 40) / 2, `<g transform="translate(0,${(h || 40) / 2})"><g class="п71-цып" style="animation-delay:${-(k || 0) * .4}s">${н.карт('it_chick', 0, 0, h || 40, { тень: true })}</g></g>`, (h || 40) * .5);
  /* медальон-табло на столбе */
  const табло = (x, y, yЗемли, n, хлоп) => `<g><rect x="${x - 3}" y="${y + 28}" width="6" height="${yЗемли - y - 28}" fill="url(#п71-труба)"/>
      <ellipse cx="${x}" cy="${yЗемли}" rx="10" ry="3" fill="rgba(30,15,5,.35)"/>
      <g transform="translate(${x},${y})"><g class="${хлоп ? 'хлоп' : ''}">
      <circle r="31" cy="3" fill="rgba(60,30,5,.32)"/><circle r="30" fill="url(#п71-латунь)" stroke="#5b3416" stroke-width="2"/>
      <circle r="22" fill="url(#дк-окно)" stroke="#8a5a2a" stroke-width="1.6"/><ellipse cx="-7" cy="-11" rx="10" ry="4.5" fill="#fff" opacity=".7"/>
      <text y="9" text-anchor="middle" class="метка-ч" style="font-size:24px">${n}</text></g></g></g>`;
  /* носочек: верх в (0,0), висит вниз; цвет k */
  const НОСКИ = ['#e5533d', '#3f7fd8', '#4caf50', '#f2b33d', '#9b5bd6'];
  const носок = (k, м) => { м = м || 1; const ц = НОСКИ[k];
    return `<g transform="scale(${м})"><path d="M-7,0 H7 V20 Q7,25 12,25 H15 Q21,25 21,31 Q21,37 15,37 H-1 Q-7,37 -7,30 Z" fill="${ц}" stroke="#3a2010" stroke-width="1.4" stroke-linejoin="round"/>
      <rect x="-7" y="0" width="14" height="6" fill="#fff" opacity=".85"/><path d="M-7,11 H7 M-7,15 H7" stroke="#fff" stroke-width="1.6" opacity=".7"/>
      <path d="M-4,3 V27" stroke="#fff" stroke-width="1.6" opacity=".25"/><path d="M9,30 Q15,29 18,32" stroke="#fff" stroke-width="1.4" fill="none" opacity=".6"/></g>`; };
  const прищепка = `<rect x="-3" y="-6" width="6" height="11" rx="2" fill="#d7a35c" stroke="#6b4422" stroke-width="1"/>`;
  /* маленький поезд-значок: вагончики с цыплятами на рельсах (для загадок и сравнения) */
  const составчик = (н, x, y, n, ш) => { ш = ш || 34; const шаг = ш + 5;
    return рельсы(y, x - 4, x + n * шаг + 2) + Array.from({ length: n }, (_, k) => вагон(н, x + k * шаг, y, ш, 2, k)).join('') +
      Array.from({ length: n - 1 }, (_, k) => `<path d="M${x + k * шаг + ш},${y - 7} h5" stroke="#3a3f48" stroke-width="2"/>`).join(''); };

  /* бумажный билет кондуктора: корешок с перфорацией, красная шапка, узорная рамка, водяной знак,
     окошки для карточек, штамп «ОПЛАЧЕНО» после верной записи */
  function билетКондуктора(н, st){
    const X0 = 10, X1 = 290, Y0 = 6, Y1 = 108, К = 54;              /* К — линия отрыва корешка */
    let край = `M${X0 + 8},${Y0}`;
    for (let y = Y0; y < Y1; y += 8) край += ` L${X0},${y + 4} L${X0 + 8},${y + 8}`;
    const рамка = `<rect x="${К + 6}" y="${Y0 + 26}" width="${X1 - К - 12}" height="${Y1 - Y0 - 32}" rx="6" fill="none" stroke="#c99a5a" stroke-width="1.2"/>
      <rect x="${К + 9}" y="${Y0 + 29}" width="${X1 - К - 18}" height="${Y1 - Y0 - 38}" rx="4" fill="none" stroke="#c99a5a" stroke-width=".7" stroke-dasharray="2 2"/>
      ${[[К + 6, Y0 + 26], [X1 - 6, Y0 + 26], [К + 6, Y1 - 6], [X1 - 6, Y1 - 6]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.4" fill="#f3e2bc" stroke="#c99a5a" stroke-width="1"/><circle cx="${x}" cy="${y}" r="1.2" fill="#c8341e"/>`).join('')}`;
    const узор = Array.from({ length: 13 }, (_, k) => `<path d="M${К + 14 + k * 17},${Y0 + 22} q4,-5 8,0 q4,5 8,0" stroke="#fff" stroke-width=".9" fill="none" opacity=".55"/>`).join('');
    const паровозик = `<g transform="translate(${X0 + 14},${Y0 + 16}) scale(.24)" opacity=".85"><rect x="0" y="20" width="60" height="26" rx="10" fill="#c8341e"/><rect x="44" y="4" width="26" height="42" rx="3" fill="#c8341e"/>
      <rect x="10" y="4" width="10" height="18" fill="#c8341e"/><circle cx="16" cy="52" r="8" fill="#5a3418"/><circle cx="50" cy="52" r="8" fill="#5a3418"/></g>`;
    return `<g filter="url(#дк-тень)"><path d="${край} L${X0 + 8},${Y1} H${X1} V${Y0} Z" fill="url(#п71-бумага)" stroke="#a3762a" stroke-width="1.6" stroke-linejoin="round"/></g>
      <g opacity=".07"><image href="img/l71/it_chick.webp" x="${К + 70}" y="${Y0 + 22}" width="62" height="90"/></g>
      <rect x="${К}" y="${Y0}" width="${X1 - К}" height="22" fill="#c8341e"/><rect x="${К}" y="${Y0 + 20}" width="${X1 - К}" height="3" fill="#8a2414"/>
      ${узор}
      <text x="${(К + X1) / 2}" y="${Y0 + 15}" text-anchor="middle" style="font-size:9.5px;font-weight:900;fill:#fff8e0;letter-spacing:.05em">ПАРОВОЗИК «СОЛНЕЧНАЯ ФЕРМА»</text>
      ${рамка}
      <path d="M${К},${Y0} V${Y1}" stroke="#a3762a" stroke-width="1.2" stroke-dasharray="3 3"/>
      ${Array.from({ length: 9 }, (_, k) => `<circle cx="${К}" cy="${Y0 + 10 + k * 11}" r="1.8" fill="#cfe6b8"/>`).join('')}
      ${паровозик}
      <text x="${(X0 + К) / 2 + 3}" y="${Y0 + 62}" text-anchor="middle" class="метка-ч" style="font-size:11px;letter-spacing:.12em" transform="rotate(-90 ${(X0 + К) / 2 + 3} ${Y0 + 62})">БИЛЕТ</text>
      <text x="${(X0 + К) / 2 + 3}" y="${Y1 - 8}" text-anchor="middle" class="метка-ч" style="font-size:8.5px;fill:#8a5a2a">№ 071</text>
      <text x="164" y="76" text-anchor="middle" class="метка-ч" style="font-size:30px">·</text>
      <text x="252" y="77" text-anchor="middle" class="метка-ч" style="font-size:28px">= 8</text>
      <text x="118" y="102" text-anchor="middle" class="метка-ч" style="font-size:10.5px;fill:#8a5a2a">вагончиков</text>
      <text x="208" y="102" text-anchor="middle" class="метка-ч" style="font-size:10.5px;fill:#8a5a2a">по сколько</text>
      ${[0, 1].map(k => { const x = 118 + k * 90, т = st.слоты[k];
        return т ? `<g transform="translate(${x},66)"><g class="хлоп">${н.карточка(т)}</g></g>` : н.зона('слот' + k, x - 30, 36, 60, 62) + н.слот(x, 66); }).join('')}
      ${st.ок ? `<g transform="translate(266,96) rotate(-16) scale(.62)"><g class="хлоп" opacity=".9"><circle r="22" fill="rgba(200,52,30,.08)" stroke="#c8341e" stroke-width="2.6"/><circle r="17" fill="none" stroke="#c8341e" stroke-width="1"/>
        <text y="-3" text-anchor="middle" style="font-size:8px;font-weight:900;fill:#c8341e">ОПЛАЧЕНО</text><text y="8" text-anchor="middle" style="font-size:7px;font-weight:800;fill:#c8341e">кондуктор</text>
        <text y="16" text-anchor="middle" style="font-size:7px;font-weight:800;fill:#c8341e">Борька</text></g></g>` : ''}`;
  }

  const ЗАГАДКИ = [3, 5, 2, 6, 4, 7];
  const ЖЕТОНЫ = (n) => [...new Set([n * 2, n + 2, Number(String(n) + '2')])].sort((a, b) => a - b);

  const КАДРЫ = [
  /* 0 · ВАГОНЧИК НА ДВОИХ ─────────────────────────────────────── */
  {
    кто: 'бублик', t: 'Вагончик на двоих',
    say: 'Мур! Я Бублик. На станцию пришёл паровозик, а в каждом вагончике ровно два места. Посади цыплят — по двое!',
    начало(st){ st.в = [[], [], []]; st.сч = []; },
    рисуй(st, н){
      const сидят = st.в.flat(), всё = сидят.length === 6, посчитал = st.сч.length === 3;
      const НА = [34, 72, 110, 148, 186, 224];
      const кл = приезд(st) || (посчитал && st.т && Date.now() - st.т < 2400 ? 'едет' : '');
      const тело = `${дымка}${земля(150)}${перрон(150, 0, 270)}${н.герой('бублик', 312, 168, 98)}${рельсы(272)}
        ${НА.map((x, k) => сидят.includes(k) ? '' : цып(н, 'ц' + k, x, 152, 40, k)).join('')}
        ${поезд(н, st.в.map(a => a.length), { зоны: всё ? null : 'в', нов: st.нов, класс: кл,
            метки: st.в.map((_, k) => st.сч.includes(k) ? (st.сч.indexOf(k) + 1) * 2 : null), клик: всё && !посчитал ? (k => st.сч.includes(k) ? '' : н.клик('вагон', k)) : null })}
        ${н.облачко('бублик', 300, 66)}`;
      return н.сцена(тело, 'Станция: перрон с цыплятами и паровозик с тремя вагончиками', !всё) +
        (посчитал ? н.готово('Три вагончика по два цыплёнка: 2 + 2 + 2 = 6. Короче: 3 · 2 = 6 — сколько вагончиков · по сколько в каждом.') : '');
    },
    готов: st => st.сч.length === 3,
    делать: st => st.в.flat().length < 6 ? 'Тащи цыплят в вагончики — по двое в каждый' : 'Посчитай пассажиров — нажимай на вагончики',
    подсказка: st => st.в.flat().length < 6 ? 'Прижми цыплёнка пальцем и неси в вагончик. Мест в вагончике — два!' : 'Нажимай на вагончики по одному — считаем двойками.',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ц' || !/^в\d$/.test(зона)) return false;
      const k = +что.slice(1), g = +зона[1];
      if (st.в.flat().includes(k)) return false;
      if (st.в[g].length >= 2){ н.сказ('бублик', 'Тут оба места заняты — это уже пара! Сажай в другой вагончик.'); return false; }
      st.в[g].push(k); st.нов = { k: g, j: st.в[g].length - 1, от: [x == null ? 34 + k * 38 : x, y == null ? 132 : y], t: Date.now() };
      const пар = st.в.filter(a => a.length === 2).length;
      н.сказ('бублик', st.в.flat().length === 6 ? 'Все сели! Три вагончика — три пары. Сколько пассажиров? Нажимай на вагончики!'
        : st.в[g].length === 2 ? `Вагончик полный — пара! Пар: ${пар}.` : 'Одно место занято. Ещё одного — и будет пара!');
      return true;
    },
    тап(st){ const g = st.в.findIndex(a => a.length < 2); return g < 0 ? null : 'в' + g; },
    клики: { вагон(st, k, н){ if (st.сч.includes(k)) return; st.сч.push(k); if (st.сч.length === 3) st.т = Date.now();
      н.сказ('бублик', ['Два!', 'Четыре!', 'Шесть! 3 · 2 = 6. Ту-ту — поехали!'][st.сч.length - 1]); } }
  },
  /* 1 · БИЛЕТ У КОНДУКТОРА ─────────────────────────────────── */
  {
    кто: 'борька', t: 'Билет у кондуктора',
    say: 'Я барсук Борька, кондуктор! Заполни билет: сколько вагончиков и по сколько в каждом цыплят. Карточки — на столике.',
    начало(st){ st.слоты = [null, null]; st.ок = false; },
    рисуй(st, н){
      const билет = билетКондуктора(н, st);
      const тело = `${дымка}${земля(192)}${н.герой('борька', 318, 232, 112, st.ок ? null : 'показ')}${рельсы(276)}
        ${столик(36, 236, 180, 14)}
        ${билет}
        ${поезд(н, [2, 2, 2, 2], { шВ: 54, y: 276, билеты: st.ок ? [2, 2, 2, 2] : null, класс: приезд(st) })}
        ${st.ок ? '' : ['2', '4', '8'].map((т, k) => st.слоты.includes(т) ? '' : н.тащ('к' + т, 80 + k * 62, 156, н.карточка(т), 26)).join('')}
        ${н.облачко('борька', 300, 118)}`;
      return н.сцена(тело, 'Билет кондуктора, карточки на столике и поезд', !st.ок) +
        (st.ок ? н.готово('4 · 2 = 8 — «четыре умножить на два». Первое число — сколько вагончиков (пар), второе — по сколько в каждом. Борька пробил каждому вагончику билет «2».') : '');
    },
    готов: st => st.ок,
    делать: () => 'Перетащи карточки на билет: сначала сколько вагончиков, потом по сколько цыплят',
    подсказка: () => 'Посчитай вагончики за паровозом. А в каждом вагончике по сколько цыплят?',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'к' || !/^слот\d$/.test(зона)) return false;
      const k = +зона.slice(4); if (st.слоты[k]) return false;
      st.слоты[k] = что.slice(1);
      if (st.слоты.every(Boolean)){
        if (st.слоты[0] === '4' && st.слоты[1] === '2'){ st.ок = true; н.сказ('борька', 'Чик-чик! Четыре вагончика по два — восемь пассажиров. Билеты готовы!'); }
        else { н.сказ('борька', st.слоты.includes('8') ? 'Восемь — это ответ, он уже после «=». А нужно: сколько вагончиков и по сколько.' : 'Наоборот! Сначала сколько вагончиков — их четыре. Потом по сколько в каждом.', 'показ'); st.слоты = [null, null]; }
      }
      return true;
    },
    тап(st){ const k = st.слоты.indexOf(null); return k < 0 ? null : 'слот' + k; }
  },
  /* 2 · ПРИЦЕПИ ВАГОНЧИК ──────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Прицепи вагончик',
    say: 'Я Хрум, машинист! На запасном пути стоят вагончики. Прицепляй их к поезду — каждый новый вагончик везёт ещё пару пассажиров. Смотри на табло!',
    начало(st){ st.n = 1; st.ответ = null; },
    рисуй(st, н){
      const ш = 48, x0 = 6, всё = st.n === 5, верно = st.ответ === 12, свеж = st.t && Date.now() - st.t < 1400;
      const запас = [0, 1, 2, 3].filter(k => k >= st.n - 1).map(k => н.тащ('д' + k, 192 + k * 44, 170, вагон(н, -20, 18, 40, 2, k + 1), 22)).join('');
      const строки = Array.from({ length: st.n + (верно ? 1 : 0) }, (_, k) => [`${k + 1} · 2`, `${(k + 1) * 2}`]);
      const хвост = xВагона(st.n, ш, x0);
      const тело = `${дымка}${земля(148)}${н.герой('хрум', 40, 176, 92, верно ? 'ура' : 'даёт')}
        ${табло(120, 90, 176, верно ? 12 : st.n * 2, свеж)}
        ${рельсы(188, 168, 360)}${рельсы(274)}
        ${!всё ? запас : ''}
        ${поезд(н, Array(st.n).fill(2), { шВ: ш, x0, y: 274, класс: приезд(st) || (свеж ? 'едет' : '') })}
        ${!всё ? н.зона('хвост', хвост - 12, 200, 64, 84) + `<rect x="${хвост - 2}" y="236" width="${ш + 4}" height="36" rx="8" fill="rgba(255,240,190,.45)" stroke="#ffd76a" stroke-width="2.6" stroke-dasharray="6 5" class="мерцает"/>` : ''}
        ${всё ? столбик(н, 318, 110, 188, верно ? н.жетон('12') : null, !верно) + (верно ? '' : столик(178, 280, 170, 0) + ['10', '12', '62'].map((т, k) => т === String(st.ош) ? '' : н.тащ('ж' + т, 196 + k * 34, 152, н.жетон(т, 16))).join('')) : ''}
        ${н.облачко('хрум', 60, 74)}`;
      return н.сцена(тело, 'Паровоз, вагончики, запасной путь и табло', !верно) + н.сетка(строки) +
        (верно ? н.готово('Каждый вагончик — плюс два: 2, 4, 6, 8, 10, 12. Шесть вагончиков по два — двенадцать: 6 · 2 = 12.') : '');
    },
    готов: st => st.ответ === 12,
    делать: st => st.n < 5 ? 'Тащи вагончик с запасного пути к хвосту поезда' : 'А если прицепить шестой? Принеси жетон в окошко на столбике',
    подсказка: st => st.n < 5 ? 'Вагончик с запасного пути — к мерцающему месту за последним вагончиком.' : 'Сейчас 10. Ещё один вагончик — ещё два пассажира.',
    бросить(st, что, зона, x, y, н){
      if (что[0] === 'д' && зона === 'хвост' && st.n < 5){
        st.n++; st.t = Date.now();
        н.сказ('хрум', `Прицепили! Было ${(st.n - 1) * 2}, ещё пара — стало ${st.n * 2}.` + (st.n === 5 ? ' А если прицепить шестой?' : ''), st.n === 5 ? 'лупа' : 'даёт');
        return true;
      }
      if (что[0] === 'ж' && зона === 'окно'){
        const n = +что.slice(1);
        if (n === 12){ st.ответ = 12; н.сказ('хрум', 'Двенадцать! 6 · 2 = 12. Ту-ту!', 'ура'); return true; }
        st.ош = n; н.сказ('хрум', n === 10 ? 'Десять — это пять вагончиков. А шестой добавит ещё два!' : 'Шестьдесят два — это 6 и 2 рядом. Считай двойками: десять, двенадцать…', 'лупа');
      }
      return false;
    },
    тап(st, что){ return что[0] === 'ж' ? 'окно' : 'хвост'; }
  },
  /* 3 · ЩЁЛК ПУТАЕТ ─────────────────────────────────────────── */
  {
    кто: 'искра', t: 'Щёлк путает',
    say: 'Сорока Щёлк кричит: «Четыре вагончика по два — это 4 + 2 = 6!» Посчитай пассажиров и докажи, сколько их на самом деле!',
    начало(st){ st.сч = []; st.ответ = null; },
    рисуй(st, н){
      const верно = st.ответ === 8, все = st.сч.length === 4;
      const тело = `${дымка}${земля(196)}${н.герой('искра', 40, 220, 100, верно ? 'прыг' : null)}
        ${все ? столбик(н, 262, 140, 214, верно ? н.жетон('8') : null, !верно) : ''}
        ${все && !верно ? столик(92, 206, 190, 14) + ['6', '8', '42'].map((т, k) => т === String(st.ош) ? '' : н.тащ('ж' + т, 112 + k * 37, 172, н.жетон(т, 17))).join('') : ''}
        <g class="п71-летит">${н.карт(верно ? 'shchelk_front' : 'shchelk_laugh', 300, 112, 76)}</g>
        ${рельсы(276)}
        ${поезд(н, [2, 2, 2, 2], { шВ: 60, y: 276, класс: приезд(st), метки: [0, 1, 2, 3].map(k => st.сч.includes(k) ? (st.сч.indexOf(k) + 1) * 2 : null), клик: !все ? (k => st.сч.includes(k) ? '' : н.клик('вагон', k)) : null })}
        ${н.облачко('искра', 70, 110)}`;
      return н.сцена(тело, 'Четыре вагончика и сорока Щёлк', !верно) +
        (верно ? н.готово('4 · 2 — это четыре раза по два: 2 + 2 + 2 + 2 = 8. А 4 + 2 = 6 — это четыре и ещё два, совсем другое.') : '');
    },
    готов: st => st.ответ === 8,
    делать: st => st.сч.length < 4 ? 'Нажимай на вагончики — считай двойками' : 'Принеси жетон с ответом в окошко на столбике',
    подсказка: () => 'В каждом вагончике пара. Нажимай по порядку: два, четыре…',
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ж' || зона !== 'окно') return false;
      const n = +что.slice(1);
      if (n === 8){ st.ответ = 8; н.сказ('искра', 'Восемь! Щёлк, ты сложил, а надо было умножить!', 'прыг'); return true; }
      st.ош = n; н.сказ('искра', n === 6 ? 'Это Щёлк так сложил: 4 + 2. А у нас четыре раза по два!' : 'Числа не ставят рядом. Посчитай пассажиров!');
      return false;
    },
    тап(){ return 'окно'; },
    клики: { вагон(st, k, н){ if (st.сч.includes(k)) return; st.сч.push(k); н.сказ('искра', ['Два!', 'Четыре!', 'Шесть!', 'Восемь! Не шесть, а восемь!'][st.сч.length - 1]); } }
  },
  /* 4 · СКОЛЬКО ВАГОНЧИКОВ? ───────────────────────────────────── */
  {
    кто: 'бублик', t: 'Сколько вагончиков нужно?',
    say: 'На перроне у пруда десять цыплят. Рассади их по двое — и узнай, сколько вагончиков понадобилось.',
    начало(st){ st.в = [[], [], [], [], [], []]; st.ответ = null; },
    рисуй(st, н){
      const ш = 38, сидят = st.в.flat(), всё = сидят.length === 10, верно = st.ответ === 5;
      const тело = `${дымка}${земля(168)}${перрон(160, 0, 290)}${н.герой('бублик', 326, 178, 86)}
        ${Array.from({ length: 10 }, (_, k) => сидят.includes(k) ? '' : цып(н, 'ц' + k, 18 + k * 28, 162, 32, k)).join('')}
        ${всё ? столбик(н, 250, 104, 162, верно ? н.жетон('5') : null, !верно) : ''}
        ${всё && !верно ? ['5', '6', '10'].map((т, k) => т === String(st.ош) ? '' : н.тащ('ж' + т, 60 + k * 44, 143, н.жетон(т, 17))).join('') : ''}
        ${рельсы(276)}
        ${поезд(н, st.в.map(a => a.length), { шВ: ш, x0: 4, y: 276, зоны: всё ? null : 'в', нов: st.нов, класс: приезд(st),
            метки: всё ? st.в.map((a, k) => a.length ? k + 1 : null) : null })}
        ${н.облачко('бублик', 300, 86)}`;
      return н.сцена(тело, 'Перрон у пруда: десять цыплят и шесть вагончиков', !верно) +
        (верно ? н.готово('Десять цыплят — это пять пар, пять вагончиков: 5 · 2 = 10. Шестой вагончик поедет пустым.') : '');
    },
    готов: st => st.ответ === 5,
    делать: st => st.в.flat().length < 10 ? 'Рассади цыплят по двое в вагончик' : 'Сколько вагончиков занято? Принеси жетон в окошко',
    подсказка: st => st.в.flat().length < 10 ? 'В каждый вагончик — двое, пока цыплята не кончатся.' : 'Посчитай вагончики с пассажирами — это и есть пары.',
    бросить(st, что, зона, x, y, н){
      if (что[0] === 'ц' && /^в\d$/.test(зона)){
        const k = +что.slice(1), g = +зона[1];
        if (st.в.flat().includes(k)) return false;
        if (st.в[g].length >= 2){ н.сказ('бублик', 'Тут уже пара!'); return false; }
        st.в[g].push(k); st.нов = { k: g, j: st.в[g].length - 1, от: [x == null ? 18 + k * 28 : x, y == null ? 146 : y], t: Date.now() };
        if (st.в.flat().length === 10) н.сказ('бублик', 'Все сели! Сколько вагончиков заняли?');
        return true;
      }
      if (что[0] === 'ж' && зона === 'окно'){
        const n = +что.slice(1);
        if (n === 5){ st.ответ = 5; н.сказ('бублик', 'Пять вагончиков! 5 · 2 = 10. Мур-р!'); return true; }
        st.ош = n; н.сказ('бублик', n === 10 ? 'Десять — это цыплят. А вагончиков — посчитай!' : 'Шестой вагончик пустой — он не считается.');
      }
      return false;
    },
    тап(st, что){ if (что[0] === 'ж') return 'окно'; const g = st.в.findIndex(a => a.length < 2); return g < 0 ? null : 'в' + g; }
  },
  /* 5 · НОСОЧКИ ПАРАМИ ──────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Носочки парами',
    say: 'Пары бывают не только у цыплят! Помоги развесить мои носочки: на каждое место — пару одинаковых.',
    начало(st){ st.п = [[], [], [], [], []]; st.ответ = null; },
    рисуй(st, н){
      const ПОРЯДОК = [3, 7, 0, 9, 5, 2, 8, 1, 6, 4];               /* носок k — цвета floor(k/2) */
      const висят = st.п.flat(), всё = висят.length === 10, верно = st.ответ === 10;
      const верёвка = `<rect x="11" y="58" width="6" height="186" rx="2" fill="#7a4a20"/><rect x="343" y="58" width="6" height="186" rx="2" fill="#7a4a20"/>
        <ellipse cx="14" cy="244" rx="9" ry="3" fill="rgba(30,15,5,.35)"/><ellipse cx="346" cy="244" rx="9" ry="3" fill="rgba(30,15,5,.35)"/>
        <path d="M14,72 Q180,96 346,72" stroke="#f4ead2" stroke-width="2.4" fill="none"/>`;
      const пары = [0, 1, 2, 3, 4].map(g => { const cx = 50 + g * 65, yy = 72 + 21.6 * Math.sin(Math.PI * (cx - 14) / 332);
        return н.зона('п' + g, cx - 30, 60, 60, 80) + st.п[g].map((k, j) => `<g transform="translate(${cx + (j ? 11 : -11)},${yy})"><g class="${н.свежо(st.t) && g === st.пг && j === st.п[g].length - 1 ? 'хлоп' : 'п71-ветер'}" style="animation-delay:${-(g + j) * .5}s">${носок(Math.floor(k / 2), .9)}${прищепка}</g></g>`).join('') +
          (st.п[g].length < 2 ? `<circle cx="${cx}" cy="${yy + 4}" r="5" fill="#ffd76a" stroke="#a3762a" class="мерцает"/>` : '') +
          (всё ? `<text x="${cx}" y="${yy + 56}" text-anchor="middle" class="подпись-б">${(g + 1) * 2}</text>` : ''); }).join('');
      const лежат = ПОРЯДОК.map((k, p) => висят.includes(k) ? '' : н.тащ('н' + k, 26 + p * 27, 254 + (p % 2) * 18, `<g transform="translate(-14,6) rotate(-78)">${носок(Math.floor(k / 2), .8)}</g>`, 18)).join('');
      const тело = `${дымка}${земля(236)}${верёвка}${н.карт('basket', 300, 236, 52)}${н.герой('хрум', 312, 292, 100, верно ? 'ура' : null)}${пары}${лежат}
        ${всё ? столбик(н, 182, 182, 236, верно ? н.жетон('10') : null, !верно) : ''}
        ${всё && !верно ? ['7', '10', '52'].map((т, k) => т === String(st.ош) ? '' : н.тащ('ж' + т, 60 + k * 50, 268, н.жетон(т, 17))).join('') : ''}
        ${н.облачко('хрум', 300, 188)}`;
      return н.сцена(тело, 'Верёвка для белья и носочки', !верно) +
        (верно ? н.готово('Пять пар носочков — 5 · 2 = 10. Пара — это всегда два ОДИНАКОВЫХ: красный с красным, синий с синим.') : '');
    },
    готов: st => st.ответ === 10,
    делать: st => st.п.flat().length < 10 ? 'Вешай носочки на верёвку — пару одинаковых на одно место' : 'Сколько всего носочков? Принеси жетон в окошко',
    подсказка: st => st.п.flat().length < 10 ? 'Найди два носочка одного цвета — это пара. Вешай их на одно место.' : 'Пар пять, в каждой два носочка.',
    бросить(st, что, зона, x, y, н){
      if (что[0] === 'н' && /^п\d$/.test(зона)){
        const k = +что.slice(1), g = +зона[1], цвет = Math.floor(k / 2);
        if (st.п.flat().includes(k)) return false;
        if (st.п[g].length >= 2){ н.сказ('хрум', 'Тут уже висит пара! Вешай на свободное место.'); return false; }
        if (st.п[g].length === 1 && Math.floor(st.п[g][0] / 2) !== цвет){ н.сказ('хрум', 'Это не пара — носочки разные! Найди такой же.', 'лупа'); return false; }
        st.п[g].push(k); st.пг = g; st.t = Date.now();
        н.сказ('хрум', st.п.flat().length === 10 ? 'Все пары висят! Сколько носочков всего?' : st.п[g].length === 2 ? 'Пара! Два одинаковых носочка.' : 'Один есть. Теперь найди ему пару!');
        return true;
      }
      if (что[0] === 'ж' && зона === 'окно'){
        const n = +что.slice(1);
        if (n === 10){ st.ответ = 10; н.сказ('хрум', 'Десять! Пять пар по два.', 'ура'); return true; }
        st.ош = n; н.сказ('хрум', n === 7 ? 'Это 5 + 2. А у нас пять раз по два!' : 'Числа не ставят рядом. Посчитай двойками!', 'лупа');
      }
      return false;
    },
    тап(st, что){
      if (что[0] === 'ж') return 'окно';
      const цвет = Math.floor(+что.slice(1) / 2);
      const g = st.п.findIndex(a => a.length === 1 && Math.floor(a[0] / 2) === цвет);
      const h = g >= 0 ? g : st.п.findIndex(a => a.length === 0);
      return h < 0 ? null : 'п' + h;
    }
  },
  /* 6 · ПО ШПАЛАМ ДВОЙКАМИ ─────────────────────────────────── */
  {
    кто: 'искра', t: 'По шпалам двойками',
    say: 'Железная дорога делает петлю! Цыплёнок скачет по шпалам через одну — двойками. Нажимай на шпалу, куда он прыгнет, и доведи его до флажка!',
    начало(st){ st.где = 0; },
    рисуй(st, н){
      /* петля: низ y=252 (x 34→296), полукруг вокруг (296,202) r=50, верх y=152 (x 296→34); шпалы через равные шаги */
      const L1 = 248, L2 = Math.PI * 50, ВСЕГО = L1 * 2 + L2, ШАГ = ВСЕГО / 20;
      const место = (n) => { const d = n * ШАГ;
        if (d <= L1) return [30 + d, 252, 0];
        if (d <= L1 + L2){ const t = (d - L1) / 50, θ = Math.PI / 2 - t; return [278 + 50 * Math.cos(θ), 202 + 50 * Math.sin(θ), -t * 180 / Math.PI]; }
        return [278 - (d - L1 - L2), 152, 180]; };
      const путь = (r) => `M30,${202 + r} H278 A${r},${r} 0 0 0 278,${202 - r} H30`;
      /* кружок с числом — снаружи петли: под нижним путём, над верхним, сбоку на повороте */
      const метка = (n) => { const d = n * ШАГ;
        if (d <= L1) return `${30 + d},${252 + 22}`;
        if (d <= L1 + L2){ const θ = Math.PI / 2 - (d - L1) / 50; return `${(278 + 72 * Math.cos(θ)).toFixed(1)},${(202 + 72 * Math.sin(θ)).toFixed(1)}`; }
        return `${278 - (d - L1 - L2)},${152 - 22}`; };
      const насыпь = `<g pointer-events="none"><path d="${путь(50)}" stroke="url(#п71-насыпь)" stroke-width="34" fill="none" stroke-linecap="round"/>
        <path d="${путь(50)}" stroke="url(#п71-щебень)" stroke-width="34" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
      const рельс = (r) => `<g pointer-events="none"><path d="${путь(r)}" stroke="#4a525c" stroke-width="4.6" fill="none"/><path d="${путь(r)}" stroke="url(#п71-рельс)" stroke-width="3" fill="none"/>
        <path d="${путь(r)}" stroke="#fff" stroke-width=".8" fill="none" opacity=".7" transform="translate(0,-.8)"/></g>`;
      const шпала = (n) => { const [x, y, a] = место(n), вкл = n % 2 === 0 && n <= st.где, можно = st.где < 20, тут = n === st.где;
        return `<g ${можно ? н.цель(н.клик('шпала', n)) : ''}><circle cx="${x}" cy="${y}" r="17" fill="transparent"/>
          <g transform="translate(${x},${y}) rotate(${a + 90})"><rect x="-17" y="-6" width="34" height="12" rx="2.5" fill="${вкл ? '#ffd76a' : 'url(#дк-дерево)'}" stroke="${вкл ? '#a3600a' : '#4a2a12'}" stroke-width="1.4"/>
            <path d="M-14,-2 H14 M-12,2.5 H10" stroke="${вкл ? '#fff' : '#6a4426'}" stroke-width=".8" opacity=".6"/></g>
          ${вкл && !тут ? `<circle cx="${x}" cy="${y}" r="15" fill="none" stroke="#ffd76a" stroke-width="2" opacity=".7"/>` : ''}
          <g transform="translate(${метка(n)})">
            <circle r="9" fill="${вкл ? 'url(#дк-монета)' : '#fffaf0'}" stroke="${вкл ? '#8a5a10' : '#8a6a4a'}" stroke-width="1.2"/>
            <text y="4" text-anchor="middle" class="метка-ч" style="font-size:${n > 9 ? 9.5 : 11}px">${n}</text></g></g>`; };
      const [cx, cy] = место(st.где), свеж = st.t && н.свежо(st.t), [ox, oy] = свеж ? место(st.от) : [cx, cy];
      const флаг = `<g transform="translate(10,152)" pointer-events="none"><rect x="-1.5" y="-46" width="3" height="48" fill="#5a3418"/>
        <g class="п71-флаг"><path d="M1.5,-46 h22 v15 h-22 Z" fill="#fff" stroke="#3a2010" stroke-width="1"/>
        ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => (r + c) % 2 ? `<rect x="${1.5 + c * 5.5}" y="${-46 + r * 5}" width="5.5" height="5" fill="#2a2d33"/>` : '').join('')).join('')}</g>
        ${st.где === 20 ? `<g class="хлоп">${н.карт('t_star', 12, -60, 26, { центр: true })}</g>` : ''}</g>`;
      const пыль = свеж ? `<g transform="translate(${cx},${cy + 6})" class="п71-пыль"><circle cx="-8" r="4" fill="#fff" opacity=".8"/><circle cx="8" r="4" fill="#fff" opacity=".8"/><circle cy="3" r="3" fill="#fff" opacity=".6"/></g>` : '';
      const тело = `${дымка}${земля(118)}${н.герой('искра', 170, 232, 72, st.где === 20 ? 'прыг' : null)}
        ${насыпь}${Array.from({ length: 21 }, (_, n) => шпала(n)).join('')}${рельс(41)}${рельс(59)}${флаг}
        <g transform="translate(${cx},${cy - 4})"><g${свеж ? ` class="лёт" style="--dx:${(ox - cx).toFixed(1)}px;--dy:${(oy - cy).toFixed(1)}px"` : ''}><g class="п71-цып">${н.карт('h_chick', 0, 0, 46, { тень: true })}</g></g></g>
        ${пыль}${н.облачко('искра', 170, 108)}`;
      const строки = Array.from({ length: st.где / 2 }, (_, k) => [`${k + 1} · 2`, `${(k + 1) * 2}`]);
      return н.сцена(тело, 'Железная дорога петлёй, шпалы от 0 до 20') + (строки.length ? н.сетка(строки) : '') +
        (st.где === 20 ? н.готово('Двойками: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 — цыплёнок у флажка! Это таблица умножения на 2: её можно не зубрить, а «прошагать».') : '');
    },
    готов: st => st.где === 20,
    делать: () => 'Нажми на шпалу, куда цыплёнок прыгнет: через одну',
    подсказка: st => `Цыплёнок на ${st.где}. Прибавь два: ${st.где} + 2 = ${st.где + 2}.`,
    клики: { шпала(st, n, н){
      if (n === st.где + 2){ st.от = st.где; st.где = n; st.t = Date.now(); н.сказ('искра', st.где === 20 ? 'Двадцать! Десять прыжков по два — мы у флажка!' : `${st.где}!`, st.где === 20 ? 'прыг' : null); }
      else н.сказ('искра', n === st.где + 1 ? 'Это соседняя шпала. А цыплёнок прыгает через одну — на два!' : n <= st.где ? 'Туда он уже прыгал. Вперёд, на два!' : 'Далековато! Только на две шпалы вперёд.');
    } }
  },
  /* 7 · ГДЕ БОЛЬШЕ? ────────────────────────────────────────── */
  {
    кто: 'борька', t: 'Где больше?',
    say: 'Где больше? Сначала узнай, сколько в парах, а потом отнеси звезду туда, где больше!',
    начало(st){ st.р = 0; st.выбор = null; },
    рисуй(st, н){
      const П = [{ т: ['4 вагончика', '7 цыплят'] }, { т: ['3 пары носочков', '5 носочков'], носки: true }];
      if (st.р >= П.length) return н.сцена(`${дымка}${земля(250, 'пол')}${н.герой('борька', 120, 290, 140)}${н.герой('хрум', 250, 290, 136, 'ура')}`, 'Борька и Хрум') +
        н.готово('Сначала узнай, сколько в парах: 4 · 2 = 8 — больше, чем 7; 3 · 2 = 6 — больше, чем 5.');
      const Р = П[st.р], верно = st.выбор === 'л';
      const верёвочка = (x0, y) => `<path d="M${x0 + 8},${y} Q${x0 + 84},${y + 8} ${x0 + 160},${y}" stroke="#f4ead2" stroke-width="2" fill="none"/>`;
      const лево = Р.носки ? верёвочка(6, 128) + [0, 1, 2].map(g => `<g transform="translate(${36 + g * 46},131)">${[0, 1].map(j => `<g transform="translate(${j * 18 - 9},0)">${носок(g, .7)}${прищепка}</g>`).join('')}</g>`).join('')
        : составчик(н, 20, 190, 2, 58) + составчик(н, 20, 262, 2, 58);
      const право = Р.носки ? верёвочка(186, 128) + [0, 1, 2, 3, 4].map(k => `<g transform="translate(${206 + k * 30},${131 + 4 * Math.sin(k)})">${носок(k, .7)}${прищепка}</g>`).join('')
        : Array.from({ length: 7 }, (_, k) => `<g class="п71-цып" style="animation-delay:${-k * .3}s">${н.карт('it_chick', 212 + (k % 4) * 36, 190 + Math.floor(k / 4) * 70, 46, { тень: true })}</g>`).join('');
      const рамка = (x0, сторона, текст) => `${н.зона(сторона, x0, 64, 168, 232)}<rect x="${x0}" y="64" width="168" height="232" rx="18" fill="${верно && сторона === 'л' ? 'rgba(140,220,110,.35)' : 'rgba(255,250,235,.32)'}" stroke="${верно && сторона === 'л' ? '#2f7a46' : '#fff'}" stroke-width="2.6" stroke-dasharray="${верно && сторона === 'л' ? '0' : '7 6'}" pointer-events="none"/>
        <text x="${x0 + 84}" y="90" text-anchor="middle" class="подпись-б">${текст}</text>
        ${верно && сторона === 'л' ? `<g transform="translate(${x0 + 146},88)"><g class="хлоп">${н.карт('t_star', 0, 0, 40, { центр: true })}</g></g>` : ''}`;
      const тело = `${дымка}${земля(250, 'пол')}${рамка(6, 'л', Р.т[0])}${рамка(186, 'п', Р.т[1])}${лево}${право}
        ${верно ? '' : н.тащ('звезда', 180, 36, `<g class="пульс">${н.карт('t_star', 0, 0, 46, { центр: true })}</g>`, 26)}
        ${н.облачко('борька', 180, 70)}`;
      return н.сцена(тело, 'Две группы', !верно) +
        (верно ? н.готово(st.р === 0 ? '4 вагончика по два — это 8. Восемь больше семи!' : '3 пары носочков — это 6. Шесть больше пяти!') + н.кнопка(st.р < 1 ? 'Следующая пара →' : 'Готово →', н.клик('раунд')) : '');
    },
    готов: st => st.р >= 2,
    делать: () => 'Перетащи звезду туда, где больше',
    подсказка: st => st.р === 0 ? 'Четыре вагончика по два — сколько это? Сравни с семью.' : 'Три пары — это три раза по два. Сравни с пятью.',
    бросить(st, что, зона, x, y, н){
      if (что !== 'звезда' || (зона !== 'л' && зона !== 'п')) return false;
      if (зона === 'л'){ st.выбор = 'л'; н.сказ('борька', st.р === 0 ? 'Да! 4 · 2 = 8, а восемь больше семи.' : 'Да! 3 · 2 = 6, а шесть больше пяти.'); return true; }
      н.сказ('борька', st.р === 0 ? 'Цыплят тут семь. А в четырёх вагончиках по два — посчитай двойками!' : 'Тут пять носочков. А три пары — это сколько?', 'показ');
      return false;
    },
    тап(){ return 'л'; },
    клики: { раунд(st){ st.р++; st.выбор = null; st.рк = null; } }
  },
  /* 8 · ЗАГАДКИ ЩЁЛКА ─────────────────────────────────────── */
  {
    кто: 'щёлк', t: 'Загадки Щёлка',
    say: 'Хе-хе! Я Щёлк. На станцию приходят поезда. Скажи, сколько в поезде пассажиров, — и я верну золотое яйцо! Всего шесть загадок.',
    начало(st){ st.з = 0; st.ответ = null; st.сч = []; },
    рисуй(st, н){
      const гнездо = (n, новое) => `<g transform="translate(46,192)"><ellipse cx="0" cy="2" rx="34" ry="6" fill="rgba(30,15,5,.3)"/>
        <ellipse cx="0" cy="-2" rx="32" ry="9" fill="#e8c46a"/><path d="M-30,-4 q8,-6 16,0 q8,-6 16,0 q8,-6 16,0 q8,-6 14,0" stroke="#b8902a" stroke-width="1.6" fill="none"/>
        ${н.карт('it_nest', 0, 2, 30)}
        ${Array.from({ length: n }, (_, k) => н.карт('it_gegg', (k % 3 - 1) * 13, -6 - Math.floor(k / 3) * 12, 21,
            { откуда: новое && k === n - 1 && н.свежо(st.t) ? [70 - 46, 90 - 192] : null })).join('')}</g>`;
      if (st.з >= ЗАГАДКИ.length) return н.сцена(`${дымка}${земля(196)}${гнездо(6)}${н.герой('искра', 170, 270, 130, 'прыг')}
          <g class="п71-летит">${н.карт('shchelk_front', 280, 140, 80)}</g>
          ${[[110, 50], [200, 30], [300, 60]].map(([x, y]) => н.карт('t_star', x, y, 34, { центр: true, класс: 'хлоп' })).join('')}${н.облачко('щёлк', 280, 56)}`, 'Золотые яйца вернулись') +
        н.готово('Шесть из шести! Щёлк вернул все золотые яйца. Сколько вагончиков — столько раз по два.');
      const n = ЗАГАДКИ[st.з], верно = st.ответ === n * 2;
      const ш = Math.min(56, Math.floor((346 - 10) / (n + 1.3)) - 9);
      const тело = `${дымка}${земля(196)}${гнездо(st.з + (верно ? 1 : 0), верно)}
        <g class="п71-летит">${н.карт(верно ? 'shchelk_front' : 'shchelk_carry', 92, верно ? 110 : 96, верно ? 64 : 58)}</g>
        ${столбик(н, 304, 116, 200, верно ? н.жетон(String(n * 2)) : null, !верно)}
        ${верно ? '' : столик(118, 246, 180, 12) + ЖЕТОНЫ(n).map((т, k) => т === st.ош ? '' : н.тащ('ж' + т, 140 + k * 42, 162, н.жетон(String(т), 17))).join('')}
        ${рельсы(276)}
        ${поезд(н, Array(n).fill(2), { шВ: ш, x0: 8, y: 276, класс: приезд(st),
            метки: Array.from({ length: n }, (_, k) => st.сч.includes(k) ? (st.сч.indexOf(k) + 1) * 2 : null),
            клик: верно ? null : (k => st.сч.includes(k) ? '' : н.клик('вагон', k)) })}
        ${н.облачко('щёлк', 110, 52)}
        <g transform="translate(340,24)">${Array.from({ length: ЗАГАДКИ.length }, (_, k) => `<circle cy="${k * 14}" r="5" fill="${k < st.з + (верно ? 1 : 0) ? '#ffd040' : 'rgba(255,255,255,.55)'}" stroke="#8a5a10" stroke-width="1"/>`).join('')}</g>`;
      return н.сцена(тело, `Поезд из ${n} вагончиков`, !верно, 'fon_melnica') +
        (верно ? н.готово(`${n} вагончиков по два — ${n} · 2 = ${n * 2}. Золотое яйцо прилетело в гнездо!`) + н.кнопка(st.з < ЗАГАДКИ.length - 1 ? 'Следующий поезд →' : 'Готово →', н.клик('дальше')) : '');
    },
    готов: st => st.з >= ЗАГАДКИ.length,
    делать: () => 'Сколько пассажиров? Можно нажимать на вагончики — считать двойками. Жетон с ответом неси в окошко',
    подсказка: st => `Вагончиков ${ЗАГАДКИ[Math.min(st.з, ЗАГАДКИ.length - 1)]}, в каждом по два. Нажимай на вагончики — я посчитаю двойками!`,
    бросить(st, что, зона, x, y, н){
      if (что[0] !== 'ж' || зона !== 'окно') return false;
      const n = ЗАГАДКИ[st.з], т = +что.slice(1);
      if (т === n * 2){ st.ответ = т; st.t = Date.now(); н.сказ('щёлк', 'Эх, угадал! Лови яйцо.', 'смех'); return true; }
      st.ош = т; н.сказ('щёлк', т === n + 2 ? `Хе-хе, это ${n} + 2! А надо ${n} раз по два.` : 'Хе-хе! Числа рядом не ставят. Считай двойками!', 'смех');
      return false;
    },
    тап(){ return 'окно'; },
    клики: {
      вагон(st, k, н){ if (st.сч.includes(k)) return; st.сч.push(k); н.сказ('щёлк', `${st.сч.length * 2}!`); },
      дальше(st){ st.з++; st.ответ = null; st.ош = null; st.рк = null; st.сч = []; st.прибыл = 0; }
    }
  },
  /* 9 · ПАРОВОЗ ОТПРАВЛЯЕТСЯ ──────────────────────────────── */
  {
    кто: 'хрум', t: 'Паровоз отправляется',
    say: 'Все пары на месте! Я в кабине. Нажми на семафор — и паровозик повезёт цыплят на праздник.',
    начало(st){ st.поехал = false; },
    рисуй(st, н){
      const п = st.поехал;
      const семафор = `<g ${п ? '' : н.цель(н.клик('семафор'))}><rect x="312" y="96" width="48" height="182" fill="transparent"/>
        <rect x="334" y="112" width="6" height="164" fill="url(#п71-труба)"/><ellipse cx="337" cy="276" rx="10" ry="3" fill="rgba(30,15,5,.35)"/>
        <g transform="translate(337,120)"><g class="п71-крыло" style="transform:rotate(${п ? -40 : 0}deg)"><rect x="-32" y="-6" width="36" height="12" rx="3" fill="#e5533d" stroke="#7e2214" stroke-width="1.4"/>
          <rect x="-24" y="-6" width="6" height="12" fill="#fff"/></g></g>
        <rect x="326" y="140" width="22" height="22" rx="5" fill="#2a2d33"/>
        <circle cx="337" cy="151" r="7.5" fill="${п ? '#5be07a' : '#e5533d'}" class="${п ? '' : 'мерцает'}"/><circle cx="335" cy="149" r="2.4" fill="#fff" opacity=".6"/></g>`;
      const тело = `${дымка}${земля(152)}${перрон(150, 0, 300)}
        ${н.герой('борька', 52, 152, 82)}${н.герой('бублик', 128, 152, 82)}${н.герой('искра', 204, 152, 82, п ? 'прыг' : null)}
        ${рельсы(276)}
        ${поезд(н, [2, 2, 2, 2], { шВ: 50, y: 276, класс: п ? 'уезжает' : приезд(st) })}
        ${семафор}
        ${п ? [[40, 40], [180, 26], [300, 44]].map(([x, y]) => н.карт('t_star', x, y, 36, { центр: true, класс: 'хлоп' })).join('') : ''}
        ${н.облачко('хрум', 240, 60)}`;
      return н.сцена(тело, 'Паровозик на станции, друзья на перроне') +
        `<div class="памятка">
          <div><b>пара = 2</b><span>вагончик на двоих</span></div>
          <div><b>3 · 2 = 6</b><span>сколько вагончиков · по сколько</span></div>
          <div><b>2, 4, 6, 8, 10</b><span>каждый вагончик — плюс два</span></div>
          <div><b>4 · 2 ≠ 4 + 2</b><span>умножить — не сложить</span></div>
        </div>` + (п ? н.готово('Ту-ту! Четыре вагончика по два — восемь цыплят едут на праздник. Ты знаешь, как умножать на 2!') : '');
    },
    готов: st => st.поехал,
    делать: () => 'Нажми на семафор',
    подсказка: () => 'Семафор справа — красный огонёк. Нажми на него!',
    клики: { семафор(st, н){ st.поехал = true; н.сказ('хрум', 'Зелёный! Ту-ту! Четыре вагончика по два — восемь пассажиров. Поехали!', 'ура'); } }
  }
  ];

  /* ═══════════ анимации урока ═══════════ */
  if (!document.getElementById('п71-стиль')){
    const s = document.createElement('style'); s.id = 'п71-стиль';
    const Ф = 'transform-box:fill-box;transform-origin:center';
    s.textContent = `
      #lvis .дк71 .п71-дым,#lvis .дк71 .п71-пар{pointer-events:none}
      #lvis .дк.дк71 g.облачко{animation:дк-хлоп .35s ease-out both,п71-гаснет .6s ease-in 4s forwards}
      #lvis .дк71 .п71-дым circle{animation:п71-дым 2.4s ease-out infinite;${Ф}}
      #lvis .дк71 .п71-пар{opacity:0}
      #lvis .дк71 .п71-глаза{animation:п71-морг 4.2s infinite;transform-box:fill-box;transform-origin:50% 60%}
      #lvis .дк71 .п71-колокол{animation:п71-качель 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}
      #lvis .дк71 .п71-фара{animation:п71-свет 2s ease-in-out infinite}
      #lvis .дк71 .п71-цып{animation:п71-кивок 1.8s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
      #lvis .дк71 .п71-ветер{animation:п71-ветер 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 0}
      #lvis .дк71 .п71-летит{animation:п71-летит 3s ease-in-out infinite}
      #lvis .дк71 .п71-флаг{animation:п71-флаг 1.6s ease-in-out infinite;transform-box:fill-box;transform-origin:0 50%}
      #lvis .дк71 .п71-пыль{animation:п71-пыль .6s ease-out both;pointer-events:none}
      #lvis .дк71 .п71-поезд{animation:п71-дышит 2.2s ease-in-out infinite}
      #lvis .дк71 .п71-крыло{transition:transform .5s cubic-bezier(.3,1.6,.5,1);${Ф};transform-origin:100% 50%}
      #lvis .дк71 .приезжает{animation:п71-приезд 1.7s cubic-bezier(.2,.7,.3,1) both}
      #lvis .дк71 .едет{animation:п71-тряска .3s linear 6}
      #lvis .дк71 .уезжает{animation:п71-уезд 3.4s cubic-bezier(.55,0,.8,.45) .4s forwards}
      #lvis .дк71 .приезжает .п71-колесо,#lvis .дк71 .едет .п71-колесо,#lvis .дк71 .уезжает .п71-колесо{animation:п71-круг .45s linear infinite;${Ф}}
      #lvis .дк71 .приезжает .п71-шатун,#lvis .дк71 .едет .п71-шатун,#lvis .дк71 .уезжает .п71-шатун{animation:п71-шатун .45s linear infinite}
      #lvis .дк71 .приезжает .п71-пар,#lvis .дк71 .едет .п71-пар,#lvis .дк71 .уезжает .п71-пар{animation:п71-пар .45s ease-out infinite}
      #lvis .дк71 .уезжает .п71-дым circle,#lvis .дк71 .едет .п71-дым circle{animation-duration:1.1s}
      @keyframes п71-дым{0%{transform:translate(0,8px) scale(.4);opacity:0}25%{opacity:.95}100%{transform:translate(10px,-22px) scale(1.5);opacity:0}}
      @keyframes п71-морг{0%,92%,100%{transform:scaleY(1)}95%{transform:scaleY(.1)}}
      @keyframes п71-качель{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
      @keyframes п71-свет{0%,100%{opacity:.55}50%{opacity:1}}
      @keyframes п71-кивок{0%,100%{transform:translateY(0) rotate(0)}30%{transform:translateY(-2px) rotate(-3deg)}60%{transform:translateY(0) rotate(3deg)}}
      @keyframes п71-ветер{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(5deg)}}
      @keyframes п71-флаг{0%,100%{transform:skewY(0) scaleX(1)}50%{transform:skewY(-6deg) scaleX(.94)}}
      @keyframes п71-пыль{0%{opacity:0;transform:scale(.4)}30%{opacity:1}100%{opacity:0;transform:scale(1.6) translateY(-4px)}}
      @keyframes п71-гаснет{to{opacity:0}}
      @keyframes п71-летит{0%,100%{transform:translate(0,0)}50%{transform:translate(-6px,-8px)}}
      @keyframes п71-дышит{0%,100%{transform:translateY(0)}50%{transform:translateY(-.6px)}}
      @keyframes п71-приезд{0%{transform:translateX(380px)}100%{transform:translateX(0)}}
      @keyframes п71-тряска{0%,100%{transform:translate(0,0)}25%{transform:translate(-1.5px,-.8px)}75%{transform:translate(1.5px,.8px)}}
      @keyframes п71-уезд{to{transform:translateX(-440px)}}
      @keyframes п71-круг{to{transform:rotate(-360deg)}}
      @keyframes п71-шатун{0%{transform:translate(0,0)}25%{transform:translate(-3px,-3px)}50%{transform:translate(0,-6px)}75%{transform:translate(3px,-3px)}100%{transform:translate(0,0)}}
      @keyframes п71-пар{0%{opacity:.9;transform:translate(0,0) scale(.6)}100%{opacity:0;transform:translate(-14px,-6px) scale(1.6)}}
      @media (prefers-reduced-motion:reduce){#lvis .дк71 *{animation:none !important}}`;
    document.head.appendChild(s);
  }

  /* градиенты урока — в каждую сцену; сброс счётчика id */
  КАДРЫ.forEach(к => { const р = к.рисуй; к.рисуй = (st, н, i) => { N = 0; const с = н.сцена; н.сцена = (тело, ...а) => с(ГРАД + тело, ...а); return р(st, н, i); }; });

  const картинкаЗадачи = (н, n, кто, фон, носки) => н.сцена(`${ГРАД}${дымка}${земля(244)}
      ${носки ? `<rect x="40" y="96" width="5" height="148" fill="#7a4a20"/><rect x="236" y="96" width="5" height="148" fill="#7a4a20"/><path d="M42,104 Q140,116 238,104" stroke="#f4ead2" stroke-width="2.2" fill="none"/>` +
          [0, 1].map(g => `<g transform="translate(${100 + g * 80},110)">${[0, 1].map(j => `<g transform="translate(${j * 22 - 11},0)">${носок(g)}${прищепка}</g>`).join('')}</g>`).join('')
        : (n > 5 ? составчик(н, 14, 196, Math.ceil(n / 2), 44) + составчик(н, 14, 262, n - Math.ceil(n / 2), 44) : составчик(н, 14, 262, n, 44))}
      ${н.герой(кто, 320, 296, 104)}`, `${n}`, false, фон);
  ДК.подключить({
    ID, ИМГ: 'img/l71/', размеры: РАЗМЕРЫ,
    герои: {
      бублик: { имя: 'Бублик', ф: 'bublik' },
      искра:  { имя: 'Искра',  ф: 'iskra_hero', позы: { прыг: 'iskra_jump' } },
      хрум:   { имя: 'Хрум',   ф: 'hrum', позы: { ура: 'hrum_ura', лупа: 'hrum_lupa', даёт: 'hrum_daet' }, позаПодсказки: 'лупа' },
      борька: { имя: 'Борька', ф: 'borka', позы: { показ: 'borka_pokaz' }, позаПодсказки: 'показ' },
      щёлк:   { имя: 'Щёлк',   ф: 'shchelk_front', позы: { смех: 'shchelk_laugh' } }
    },
    фоны: ['fon_dvor', 'fon_dvor', 'fon_melnica', 'fon_ogorod', 'fon_prud', 'fon_dvor', 'fon_ogorod', 'fon_kuryatnik', 'fon_melnica', 'fon_dvor'],
    кадры: КАДРЫ,
    запись: {
      title: 'Цыплята парами: умножение на 2', ico: '🐥', subj: 'jun',
      src: 'Начальная школа · 2 класс · Умножение на 2',
      check: { q: 'Паровозик везёт 4 вагончика, в каждом по 2 цыплёнка. Сколько всего цыплят?', choices: ['6', '8', '10'], ans: 1, exp: '4 · 2 = 8 цыплят.' },
      tasks: [
        { q: 'В поезде 5 вагончиков по 2 цыплёнка. Сколько цыплят?', kind: 'unit', ans: 10, tol: 0, hints: ['5 вагончиков по 2.', '5 · 2 = 10.'], sol: '5 · 2 = 10 цыплят.' },
        { q: 'Сколько носочков в 2 парах?', kind: 'choice', choices: ['3', '4', '6'], ans: 1, tol: 0, hints: ['Пара — это два.', '2 · 2 = 4.'], sol: '2 · 2 = 4 носочка.' },
        { q: 'В поезде 7 вагончиков по 2 цыплёнка. Сколько будет 7 · 2?', kind: 'choice', choices: ['9', '14', '72'], ans: 1, tol: 0, hints: ['Семь вагончиков по два.', 'Считай двойками: 2, 4, 6, 8, 10, 12, 14.'], sol: '7 · 2 = 14.' }
      ]
    },
    тренажёр: {
      герой: 'хрум',
      проверка: { картинка: (н) => картинкаЗадачи(н, 4, 'хрум', 'fon_dvor'),
        разборы: { '6': 'Это 4 + 2. А у нас четыре вагончика по два!', '10': 'Десять — это пять вагончиков. А их четыре.' }, итог: '4 · 2 = 8: два, четыре, шесть, восемь.' },
      задачи: [
        { от: 0, до: 20, картинка: (н) => картинкаЗадачи(н, 5, 'хрум', 'fon_melnica'),
          разборы: { 7: 'Это 5 + 2. А у нас пять раз по два!', 8: 'Это четыре вагончика. А их пять.' }, итог: '5 · 2 = 10.' },
        { кто: 'борька', картинка: (н) => картинкаЗадачи(н, 2, 'борька', 'fon_dvor', true),
          разборы: { '3': 'Это 2 + 1. А у нас две пары по два.', '6': 'Шесть — это три пары.' }, итог: '2 · 2 = 4.' },
        { кто: 'борька', картинка: (н) => картинкаЗадачи(н, 7, 'борька', 'fon_ogorod'),
          разборы: { '9': 'Это 7 + 2. А нужно семь раз по два!', '72': 'Числа не ставят рядом: 7 · 2 — семь вагончиков по два.' }, итог: '7 · 2 = 14.' }
      ],
      финал: (н) => н.сцена(`${ГРАД}${дымка}${земля(200)}${рельсы(276)}${поезд(н, [2, 2, 2], { шВ: 62, y: 276 })}${[[60, 60], [180, 40], [300, 60]].map(([x, y]) => н.карт('t_star', x, y, 40, { центр: true, класс: 'хлоп' })).join('')}`, 'Паровозик с цыплятами', false, 'fon_dvor')
    }
  });
})();
