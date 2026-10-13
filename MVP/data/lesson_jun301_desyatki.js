/* ============ УРОК 301 · «ЧИСЛА 11–20: ДЕСЯТКИ И ЕДИНИЦЫ» · десяток — это коробка ============

   Переделан 14.10.2026 по просьбе владельца: «давай 301 ещё лучше и посмотри загрузки, может
   что-то пригодится». Прежний урок — общий комикс (MVP/data/comics_12.js, поезд с вагонами);
   этот файл перерегистрирует урок: WAVE_B[301] и запись в ARH_LESSONS на месте, поле comic
   снимается — иначе openLessonView открыл бы окно комикса.

   ГЛАВНАЯ МЫСЛЬ КАРТИНОК: десяток — это КОРОБКА. Десять орешков заполняют лоток владельца
   (img/l256/lotok.webp), лоток закрывается крышкой — получается коробка (img/l256/podarok.webp)
   с медальоном «10». Число 13 — одна коробка и три орешка россыпью. Так «один десяток» перестаёт
   быть словом: это предмет, который ребёнок сам собрал и закрыл.

   ГЕРОИ: бельчонок Хрум и барсук Борька (картинки владельца из «Загрузок»), в финале — они вдвоём
   с корзиной (img/l301/druzya.webp). Новые доска и пергаментная рамка владельца — фон вывесок
   и реплик (img/l301/doska.webp, ramka.webp).

   КАДРЫ (10): собери десяток и закрой коробку · десяток и ещё (досчитать 11, 12, 13) · собери
   число из коробок и орешков (10 россыпью сами пакуются) · «сем-на-дцать» — название подсказывает ·
   тропинка 10–20 · двадцать — две коробки · разложи число (ловушка 16 ↔ 61) · где больше ·
   тренажёр «что за число?» · итог. Проверь себя и задачи — общий детский тренажёр (jun_trener.js).

   Состояние — CHS['l301'].п[кадр]. Обработчики — window.ДС301. Классы — .дс301. */
(function(){
  'use strict';
  const ID = 301;
  const К = 'дс301';
  const ИМГ = 'img/l301/';
  const ОБЩ = 'img/l256/';              /* орешек, лоток, коробка, полянка, медаль, Хрум, Борька — общие с уроком 256 */
  const ЛЁТ = 700;

  const ГЕРОИ = {
    хрум:   { имя: 'Хрум',   ф: ОБЩ + 'hrum.webp',  w: 203, h: 300 },
    борька: { имя: 'Борька', ф: ОБЩ + 'borka.webp', w: 196, h: 300 }
  };

  /* ─────────────────── состояние ─────────────────── */
  function пам(){
    const к = (typeof lidKey === 'function') ? lidKey(ID) : String(ID);
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[к]) CHS[к] = {};
    if (!CHS[к].п) CHS[к].п = {};
    return CHS[к].п;
  }
  function шаг(){ return Math.max(0, Math.min(КАДРЫ.length - 1, (typeof LV !== 'undefined' && LV.step) || 0)); }
  function сост(i){
    const п = пам();
    if (!п[i]){ п[i] = { о: {}, м: {} }; if (КАДРЫ[i].начало) КАДРЫ[i].начало(п[i]); }
    return п[i];
  }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };
  const свежо = (н) => н && (Date.now() - н.t) < ЛЁТ;
  const лётСтиль = (от, x, y) => от ? ` class="лёт" style="--dx:${(от[0] - x).toFixed(1)}px;--dy:${(от[1] - y).toFixed(1)}px"` : '';

  /* ═══════════════════ РИСУНКИ ═══════════════════ */
  const ГРАД = `<defs>
    <linearGradient id="дс-кольцо" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e0a464"/><stop offset=".5" stop-color="#b9783f"/><stop offset="1" stop-color="#7f4a20"/></linearGradient>
    <radialGradient id="дс-окно" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#fffdf3"/><stop offset=".7" stop-color="#fff0c8"/><stop offset="1" stop-color="#f3d58e"/></radialGradient>
    <linearGradient id="дс-лист" x1="0" x2="1"><stop offset="0" stop-color="#7bc95b"/><stop offset="1" stop-color="#3f8a2e"/></linearGradient>
    <radialGradient id="дс-камень" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f4efe6"/><stop offset=".6" stop-color="#cfc6b8"/><stop offset="1" stop-color="#9a9082"/></radialGradient>
    <radialGradient id="дс-жёлудь" cx=".35" cy=".35" r=".8"><stop offset="0" stop-color="#f3c66a"/><stop offset="1" stop-color="#8a5617"/></radialGradient>
  </defs>`;

  /* орешек вокруг (0,0); можно касанием; свежий — прилетает дугой */
  function орех(x, y, о){
    о = о || {};
    const м = о.м || 1;
    return `<g transform="translate(${x},${y})" ${о.клик ? `class="цель" role="button" tabindex="0" onclick="${о.клик}"` : ''} opacity="${о.прозр || 1}">
      ${о.клик ? '<circle r="21" fill="transparent"/>' : ''}<g${лётСтиль(о.откуда, x, y)}><g class="${о.класс || ''}">
      <ellipse cx="0" cy="${13 * м}" rx="${10 * м}" ry="${2.6 * м}" fill="rgba(40,20,5,.28)"/>
      <image href="${ОБЩ}oreh.webp" x="${-13.5 * м}" y="${-13 * м}" width="${27 * м}" height="${28.5 * м}"/></g></g></g>`;
  }
  /* лоток на 10 ячеек (картинка владельца 236×82, центры ячеек замерены по перегородкам) */
  const ЛТ = { ш: 236, в: 82 }, ЯЧ_X = [.117, .309, .495, .681, .868], ЯЧ_Y = [.241, .650];
  const ячейка = (k) => [ЯЧ_X[k % 5] * ЛТ.ш, ЯЧ_Y[Math.floor(k / 5)] * ЛТ.в];
  function лоток(x0, y0, n, о){
    о = о || {};
    let вещи = '';
    for (let k = 0; k < n; k++){
      const [cx, cy] = ячейка(k);
      const н = о.нов && о.нов.k === k && свежо(о.нов) ? [о.нов.x - x0, о.нов.y - y0] : null;
      вещи += орех(cx, cy - 2, { м: .8, откуда: н });
    }
    return `<g transform="translate(${x0},${y0})" ${о.клик ? `class="цель" role="button" tabindex="0" onclick="${о.клик}"` : ''}>
      <ellipse cx="${ЛТ.ш / 2}" cy="${ЛТ.в - 2}" rx="${ЛТ.ш * .5}" ry="9" fill="rgba(30,15,5,.3)"/>
      <image href="${ОБЩ}lotok.webp" x="0" y="0" width="${ЛТ.ш}" height="${ЛТ.в}"/>
      ${о.свет ? `<rect x="-6" y="-6" width="${ЛТ.ш + 12}" height="${ЛТ.в + 12}" rx="16" fill="rgba(255,215,106,.15)" stroke="#ffd76a" stroke-width="3.4" stroke-dasharray="8 6" class="мерцает"/>` : ''}
      ${вещи}</g>`;
  }
  /* коробка-десяток: деревянная коробка с бантом и медальоном «10» */
  function коробка(x, y, w, о){
    о = о || {};
    const h = w * .861;
    return `<g transform="translate(${x},${y})" ${о.клик ? `class="цель" role="button" tabindex="0" onclick="${о.клик}"` : ''} opacity="${о.прозр || 1}">
      ${о.клик ? `<rect x="-4" y="-4" width="${w + 8}" height="${h + 8}" fill="transparent"/>` : ''}
      <g${лётСтиль(о.откуда, x, y)}><g class="${о.хлоп ? 'хлоп' : ''}">
        <ellipse cx="${w / 2}" cy="${h - 3}" rx="${w * .46}" ry="${w * .06}" fill="rgba(30,15,5,.3)"/>
        <image href="${ОБЩ}podarok.webp" x="0" y="0" width="${w}" height="${h}"/>
        <g transform="translate(${w * .82},${h * .2})">
          <circle r="${w * .17}" fill="url(#дс-кольцо)" stroke="#5b3416" stroke-width="1.6"/>
          <circle r="${w * .125}" fill="url(#дс-окно)" stroke="#8a5a2a" stroke-width="1.2"/>
          <text y="${w * .06}" text-anchor="middle" class="медаль-ч" style="font-size:${(w * .16).toFixed(1)}px">10</text></g>
      </g></g></g>`;
  }
  const россыпь = (x0, y0, k, шаг) => [x0 + (k % 5) * (шаг || 26), y0 + Math.floor(k / 5) * (шаг || 26) * 1.08];
  function герой(кто, x, y, h, класс){
    const Г = ГЕРОИ[кто], w = h * Г.w / Г.h;
    return `<g transform="translate(${x},${y})"><ellipse cx="0" cy="-2" rx="${w * .36}" ry="${Math.max(3, w * .07)}" fill="rgba(30,15,5,.25)"/>
      <image href="${Г.ф}" x="${-w / 2}" y="${-h}" width="${w}" height="${h}" class="${класс || ''}"/></g>`;
  }
  function табло(x, y, n, хлоп, подпись){
    return `<g transform="translate(${x},${y})"><g class="${хлоп ? 'хлоп' : ''}">
      <circle r="31" cy="4" fill="rgba(60,30,5,.32)"/><circle r="30" fill="url(#дс-кольцо)" stroke="#5b3416" stroke-width="2"/>
      <circle r="22" fill="url(#дс-окно)" stroke="#8a5a2a" stroke-width="1.6"/><ellipse cx="-7" cy="-11" rx="10" ry="4.5" fill="#fff" opacity=".7"/>
      <path d="M-4,-29 C-14,-40 -24,-34 -20,-26 C-14,-24 -8,-25 -4,-29 Z M4,-29 C14,-40 24,-34 20,-26 C14,-24 8,-25 4,-29 Z" fill="url(#дс-лист)" stroke="#2f6a20" stroke-width=".9"/>
      <circle cy="-29" r="4.4" fill="url(#дс-жёлудь)" stroke="#6b3f10" stroke-width=".8"/>
      <text y="10" text-anchor="middle" class="табло-ч">${n}</text></g>
      ${подпись ? `<text y="48" text-anchor="middle" class="подпись-б">${подпись}</text>` : ''}</g>`;
  }
  /* вывеска на рисунке — доска владельца с верёвочками */
  const вывеска = (x, y, текст, w, кл) => { const ш = w || Math.min(340, Math.max(150, текст.length * 13 + 60)), h = ш * .228;
    return `<g transform="translate(${x},${y})"><g class="хлоп">
      <path d="M${-ш / 2 + 30},${-h / 2 - 14} L${-ш / 2 + 34},${-h / 2 + 4} M${ш / 2 - 30},${-h / 2 - 14} L${ш / 2 - 34},${-h / 2 + 4}" stroke="#8a6a3a" stroke-width="2.4" stroke-dasharray="3 2"/>
      <image href="${ИМГ}doska.webp" x="${-ш / 2}" y="${-h / 2}" width="${ш}" height="${h}"/>
      <text y="${кл ? 13 : 9}" text-anchor="middle" class="${кл || 'вывеска-т'}">${текст}</text></g></g>`; };
  function камень(x, y, n, вкл, клик){
    return `<g transform="translate(${x},${y})" ${клик ? `class="цель" role="button" tabindex="0" onclick="${клик}"` : ''}>
      ${клик ? '<rect x="-16" y="-30" width="32" height="44" fill="transparent"/>' : ''}
      <ellipse cx="0" cy="5" rx="16" ry="7.5" fill="rgba(40,25,10,.32)"/>
      <path d="M-15,1 C-15,-7 -8,-10 0,-10 C9,-10 15,-7 15,0 C15,6 9,9 0,9 C-9,9 -15,7 -15,1 Z" fill="url(#дс-камень)" stroke="${вкл ? '#d9a441' : '#7a7064'}" stroke-width="${вкл ? 3 : 1.4}"/>
      <path d="M-9,-6 C-4,-8 4,-8 8,-6" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>
      <text y="5" text-anchor="middle" class="камень-ч ${вкл ? 'вкл' : ''}">${n}</text></g>`;
  }
  const фон = () => `<image href="${ОБЩ}polyana.webp" x="-45" y="0" width="450" height="300" preserveAspectRatio="xMidYMid slice"/>`;
  const сцена = (тело, подпись) => `<div class="сцена"><svg viewBox="0 0 360 300" role="img" aria-label="${подпись || 'Картинка'}">${ГРАД}${фон()}${тело}</svg></div>`;
  /* число орешков: коробки и россыпь в заданном месте */
  function число(x0, y0, n, о){
    о = о || {};
    const к = Math.floor(n / 10), е = n % 10, w = о.w || 70;
    let h = '';
    for (let j = 0; j < к; j++) h += коробка(x0, y0 + j * (w * .861 + 6), w, {});
    for (let j = 0; j < е; j++){ const [x, y] = россыпь(x0 + w + 22, y0 + 16, j, о.шаг || 22); h += орех(x, y, { м: о.м || .78 }); }
    return h;
  }

  /* ═══════════════════ ОБЩИЕ ЧАСТИ ═══════════════════ */
  function запись(а, знак, б, итог){
    const яч = (v, кл) => `<span class="яч ${кл || ''}"><i>${v == null ? '?' : v}</i></span>`;
    const зн = (z) => `<span class="зн ${z === '+' ? 'плюс' : z === '=' ? 'равно' : 'минус'}"><i>${z}</i></span>`;
    return `<div class="вывеска"><span class="верёвка"></span><span class="верёвка"></span>
      <div class="запись">${яч(а)}${зн(знак)}${яч(б)}${зн('=')}${яч(итог, итог == null ? 'пусто' : 'итог')}</div></div>`;
  }
  function ответы(i, ключ, варианты, верный, st, разборы){
    const отв = st.о[ключ], мимо = st.м[ключ] || [];
    const кн = варианты.map(n => {
      const кл = отв === n ? ' верно' : (мимо.includes(n) ? ' мимо' : '');
      const арг = typeof n === 'string' ? `'${n}'` : n, вер = typeof верный === 'string' ? `'${верный}'` : верный;
      return `<button type="button" class="число${кл}" ${отв != null || мимо.includes(n) ? 'disabled' : ''} onclick="ДС301.ответ(${i},'${ключ}',${арг},${вер})"><span class="окно">${n}</span></button>`;
    }).join('');
    const посл = мимо[мимо.length - 1];
    return `<div class="числа">${кн}</div>` + (отв == null && мимо.length ? `<p class="разбор">${(разборы && разборы[посл]) || 'Посмотри на коробки и орешки ещё раз.'}</p>` : '');
  }
  const готово = (т) => `<p class="готово"><span aria-hidden="true">★</span>${т}</p>`;
  const кнопка = (т, клик) => `<div class="ряд-кн"><button type="button" class="дальше-кн" onclick="${клик}">${т}</button></div>`;
  const разряды = (д, е, итог) => `<div class="разряды"><div><span>десятков</span><b>${д}</b></div><div><span>единиц</span><b>${е}</b></div>${итог != null ? `<div class="итог-р"><span>число</span><b>${итог}</b></div>` : ''}</div>`;

  /* ═══════════════════ КАДРЫ ═══════════════════ */
  const ПОЛЯНА = [[40,160],[80,146],[118,168],[156,150],[194,166],[232,146],[268,168],[306,150],[336,172],[100,192]];
  const ЗАГАДКИ = [{ к: 1, е: 2 }, { к: 1, е: 8 }, { к: 2, е: 0 }, { к: 1, е: 5 }, { к: 1, е: 0 }, { к: 1, е: 9 }];

  const КАДРЫ = [
  /* 0 · СОБЕРИ ДЕСЯТОК ─────────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Десять орешков — в коробку',
    say: 'Я бельчонок Хрум! Собери орешки в лоток и закрой его.',
    начало(st){ st.взят = []; st.закрыт = false; },
    рисуй(i, st){
      const n = st.взят.length;
      const тело = `${герой('хрум', 300, 130, 104, 'дышит')}
        ${ПОЛЯНА.map(([x, y], k) => st.взят.includes(k) ? '' : орех(x, y, { клик: `ДС301.собрать(${i},${k})`, класс: 'качается' })).join('')}
        ${st.закрыт ? коробка(125, 196, 110, { хлоп: true }) + вывеска(180, 46, '10 орешков = 1 десяток')
          : лоток(62, 206, n, { нов: st.нов, свет: n === 10, клик: n === 10 ? `ДС301.закрыть(${i})` : '' })}
        ${табло(32, 262, n, свежо(st.нов))}`;
      return сцена(тело, 'Полянка с орешками и лоток на десять ячеек') +
        (st.закрыт ? готово('Десять орешков закрыли в коробку — это один ДЕСЯТОК. Теперь не надо считать по одному: коробка — сразу десять!') : '');
    },
    готов: st => st.закрыт,
    делать: st => st.взят.length < 10 ? 'Нажимай на орешки — они прыгнут в лоток' : 'Нажми на лоток — закроем крышкой!'
  },
  /* 1 · ДЕСЯТОК И ЕЩЁ ───────────────────────────────────────────── */
  {
    кто: 'борька', t: 'Десяток и ещё',
    say: 'Я барсук Борька! В коробке десять. Считай дальше: одиннадцать…',
    начало(st){ st.сч = []; },
    рисуй(i, st){
      const ВОЗЛЕ = [[200, 236], [244, 236], [288, 236]];
      const тело = `${коробка(30, 168, 120)}${герой('борька', 318, 196, 112, 'дышит')}
        ${ВОЗЛЕ.map(([x, y], k) => { const j = st.сч.indexOf(k);
          return орех(x, y, { м: 1.15, клик: j < 0 ? `ДС301.досчитать(${i},${k})` : '', класс: j < 0 ? 'качается' : '' }) +
            (j >= 0 ? `<g transform="translate(${x},${y - 34})"><g class="хлоп"><circle r="16" fill="url(#дс-окно)" stroke="#d9a441" stroke-width="2.4"/><text y="7" text-anchor="middle" class="метка-ч">${11 + j}</text></g></g>` : ''); }).join('')}
        ${вывеска(160, 48, 'В коробке — 10', 200)}`;
      const все = st.сч.length === 3;
      return сцена(тело, 'Коробка-десяток и три орешка рядом') +
        (все ? `<p class="задание">Сколько всего орешков?</p>` + ответы(i, 'ч', [3, 13, 31], 13, st, {
          3: 'Ты посчитал только орешки рядом. А в коробке ещё десять!',
          31: 'Сначала пишем десяток — 1, потом единицы — 3. Получается 13.' }) : '') +
        (st.о.ч === 13 ? готово('13 = 10 + 3: одна коробка-десяток и три единицы. Тринадцать!') : '');
    },
    готов: st => st.о.ч === 13,
    делать: st => st.сч.length < 3 ? 'Нажимай на орешки возле коробки — считай дальше' : 'Сколько всего?'
  },
  /* 2 · СОБЕРИ ЧИСЛО ────────────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Собери число',
    say: 'Собери число! Десять орешков я сам закрою в коробку.',
    начало(st){ st.р = 0; st.кор = 0; st.ед = 0; },
    рисуй(i, st){
      const ЦЕЛИ = [15, 12, 19];
      if (st.р >= ЦЕЛИ.length) return сцена(`${вывеска(180, 60, 'Все три числа собраны!')}${герой('хрум', 180, 286, 150, 'радуется')}`, 'Хрум') +
        готово('15, 12, 19 — в каждом одна коробка-десяток и несколько орешков россыпью.');
      const цель = ЦЕЛИ[st.р], всего = st.кор * 10 + st.ед, есть = всего === цель;
      const упак = st.упак && (Date.now() - st.упак) < 1600;
      const тело = `${вывеска(180, 34, 'Собери ' + цель, 170)}
        ${Array.from({length: st.кор}, (_, j) => коробка(18 + j * 92, 70, 84, { хлоп: упак && j === st.кор - 1, клик: есть ? '' : `ДС301.убрать(${i},'к')` })).join('')}
        ${Array.from({length: st.ед}, (_, j) => { const [x, y] = россыпь(218, 90, j, 26); return орех(x, y, { м: .9, клик: есть ? '' : `ДС301.убрать(${i},'е')` }); }).join('')}
        <path d="M14,190 H346" stroke="#fff" stroke-width="2" stroke-dasharray="6 6" opacity=".6"/>
        ${коробка(26, 210, 78, { клик: есть ? '' : `ДС301.добавить(${i},'к')` })}<text x="65" y="296" text-anchor="middle" class="подпись-б">+10</text>
        ${герой('хрум', 180, 296, 96, 'дышит')}
        <g class="цель" role="button" tabindex="0" onclick="${есть ? '' : `ДС301.добавить(${i},'е')`}">
          <rect x="236" y="196" width="104" height="100" fill="transparent"/>
          <image href="${ОБЩ}basket.webp" x="240" y="206" width="94" height="97"/>
          ${[[262,214],[286,208],[310,214],[274,198],[298,196]].map(([x, y]) => орех(x, y, { м: .8 })).join('')}
        </g><text x="288" y="296" text-anchor="middle" class="подпись-б">+1</text>
        ${упак ? вывеска(180, 162, 'Десять орешков → коробка!', 240) : ''}`;
      const подсказка = !есть && всего > цель ? `<p class="разбор">Многовато: у тебя ${всего}, а нужно ${цель}. Нажми на лишнее — оно уберётся.</p>` : '';
      return сцена(тело, 'Собираем число из коробок и орешков') + разряды(st.кор, st.ед, всего) + подсказка +
        (есть ? готово(`${цель} = 10 + ${цель - 10}: одна коробка и ${цель - 10} россыпью.`) + кнопка(st.р < 2 ? 'Следующее число →' : 'Готово →', `ДС301.раунд(${i})`) : '');
    },
    готов: st => st.р >= 3,
    делать: () => 'Нажимай на коробку (+10) и на корзинку (+1). Лишнее — нажми, и оно уберётся'
  },
  /* 3 · НАЗВАНИЕ ПОДСКАЗЫВАЕТ ───────────────────────────────────── */
  {
    кто: 'борька', t: 'Сем-на-дцать',
    say: 'В названии числа спрятано, сколько орешков НА десятке!',
    начало(st){ st.р = 0; st.нажато = []; },
    рисуй(i, st){
      const СЛОВА = [{ ч: ['семь', 'на', 'дцать'], е: 7, n: 17 }, { ч: ['четыр', 'на', 'дцать'], е: 4, n: 14 }];
      if (st.р >= СЛОВА.length) return сцена(`${вывеска(180, 56, '…надцать = … на десять', 300)}${число(60, 140, 17, { w: 92 })}${герой('борька', 318, 292, 120, 'радуется')}`, 'Семнадцать') +
        готово('Семнадцать = семь на десять, четырнадцать = четыре на десять. Название само говорит, сколько единиц!');
      const С = СЛОВА[st.р], н = st.нажато;
      const ПЛ = [[66, 60], [168, 60], [272, 60]];
      const плитки = С.ч.map((слог, k) => `<g transform="translate(${ПЛ[k][0]},${ПЛ[k][1]})" class="цель" role="button" tabindex="0" onclick="ДС301.слог(${i},${k})">
          <rect x="-48" y="-24" width="96" height="48" rx="14" fill="${н.includes(k) ? '#c7f0cc' : 'url(#дс-окно)'}" stroke="${н.includes(k) ? '#2f7a46' : '#5b3416'}" stroke-width="3"/>
          <rect x="-40" y="-20" width="80" height="9" rx="4" fill="#fff" opacity=".6"/>
          <text y="9" text-anchor="middle" class="слог-т">${слог}</text></g>`).join('');
      const тело = `${плитки}
        ${н.includes(2) ? коробка(30, 150, 104, { хлоп: true }) + `<text x="82" y="258" text-anchor="middle" class="подпись-б">дцать = десять</text>` : ''}
        ${н.includes(0) ? Array.from({length: С.е}, (_, j) => { const [x, y] = россыпь(178, 166, j, 30); return орех(x, y, { класс: 'хлоп' }); }).join('') + `<text x="238" y="258" text-anchor="middle" class="подпись-б">${С.ч[0]} = ${С.е}</text>` : ''}
        ${н.includes(1) ? `<text x="150" y="148" text-anchor="middle" class="на-т">на</text>` : ''}`;
      const все = н.length === 3;
      return сцена(тело, 'Слово по частям') +
        (все ? запись(10, '+', С.е, С.n) + готово(`${С.ч.join('')}: ${С.ч[0]} на десять → 10 + ${С.е} = ${С.n}.`) + кнопка(st.р < 1 ? 'Следующее слово →' : 'Готово →', `ДС301.раунд(${i})`) : '');
    },
    готов: st => st.р >= 2,
    делать: () => 'Нажми на каждую часть слова'
  },
  /* 4 · ТРОПИНКА 10–20 ─────────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Тропинка от 10 до 20',
    say: 'Тропинка от 10 до 20! Нажми на камень — я прыгну.',
    начало(st){ st.в = 0; st.где = 10; },
    рисуй(i, st){
      const ВОПР = [{ т: 'Найди камень 14', о: 14 }, { т: 'Какое число после 17?', о: 18 }, { т: 'Какое число перед 13?', о: 12 }];
      const X = (n) => 20 + (n - 10) * 32, Y = (n) => 242 - Math.sin((n - 10) / 10 * Math.PI) * 26;
      const свеж = st.t && (Date.now() - st.t) < ЛЁТ ? st.откуда : null;
      const В = ВОПР[Math.min(st.в, 2)];
      const тело = `${Array.from({length: 11}, (_, k) => камень(X(10 + k), Y(10 + k), 10 + k, 10 + k === st.где, st.в < 3 ? `ДС301.камень(${i},${10 + k})` : '')).join('')}
        <g transform="translate(${X(st.где)},${Y(st.где) - 4})">${свеж != null ? `<g class="лёт" style="--dx:${(X(свеж) - X(st.где)).toFixed(1)}px;--dy:${(Y(свеж) - Y(st.где)).toFixed(1)}px">` : '<g>'}
          <image href="${ГЕРОИ.хрум.ф}" x="-26" y="-76" width="52" height="77"/></g></g>
        ${вывеска(180, 50, st.в < 3 ? В.т : 'Тропинка пройдена!', 260)}`;
      return сцена(тело, 'Камни от 10 до 20') +
        (st.подсказка ? `<p class="разбор">${st.подсказка}</p>` : '') +
        (st.в >= 3 ? готово('После числа — следующий камень, справа; перед числом — слева. От 10 до 20 — как от 0 до 10, только с десятком!') : '');
    },
    готов: st => st.в >= 3,
    делать: st => ['Найди камень 14', 'Какое число идёт после 17?', 'Какое число стоит перед 13?'][st.в] || ''
  },
  /* 5 · ДВАДЦАТЬ ───────────────────────────────────────────────── */
  {
    кто: 'борька', t: 'Двадцать — две коробки',
    say: 'Одна коробка есть. Добавь орешки и закрой вторую!',
    начало(st){ st.взят = []; st.закрыт = false; },
    рисуй(i, st){
      const ТРИ = [[176, 160], [224, 150], [272, 166]];
      const n = 7 + st.взят.length;
      const тело = `${коробка(14, 150, 96)}
        ${st.закрыт ? коробка(118, 150, 96, { хлоп: true }) + вывеска(180, 50, '20 = 10 + 10', 200)
          : лоток(112, 206, n, { нов: st.нов, свет: n === 10, клик: n === 10 ? `ДС301.закрыть(${i})` : '' }) +
            ТРИ.map(([x, y], k) => st.взят.includes(k) ? '' : орех(x, y, { клик: `ДС301.собрать(${i},${k})`, класс: 'качается' })).join('')}
        ${герой('борька', 318, 196, 112, 'дышит')}`;
      return сцена(тело, 'Две коробки — двадцать') +
        (st.закрыт ? `<p class="задание">Сколько десятков в числе 20?</p>` + ответы(i, 'ч', [1, 2, 20], 2, st, {
          1: 'Посмотри — коробок две! Каждая — десяток.', 20: 'Двадцать — это сколько всего орешков. А коробок-десятков?' }) : '') +
        (st.о.ч === 2 ? готово('20 = 10 + 10: два десятка, единиц россыпью нет. Поэтому в числе 20 справа ноль!') : '');
    },
    готов: st => st.о.ч === 2,
    делать: st => !st.закрыт ? (7 + st.взят.length < 10 ? 'Нажимай на орешки — добавь в лоток' : 'Нажми на лоток — закрой вторую коробку') : 'Сколько десятков в 20?'
  },
  /* 6 · РАЗЛОЖИ ЧИСЛО ──────────────────────────────────────────── */
  {
    кто: 'хрум', t: 'Разложи число',
    say: 'Слева в числе — коробки, справа — орешки россыпью.',
    начало(st){ st.р = 0; },
    рисуй(i, st){
      const ЧИС = [16, 19];
      if (st.р >= ЧИС.length) return сцена(`${вывеска(180, 50, '16 = 10 + 6 · 19 = 10 + 9', 300)}${число(30, 110, 16, { w: 80 })}${герой('хрум', 312, 292, 120, 'радуется')}`, 'Числа разложены') +
        готово('Левая цифра — сколько коробок-десятков, правая — сколько орешков россыпью.');
      const n = ЧИС[st.р], е = n % 10, кд = 'д' + st.р, ке = 'е' + st.р;
      const ок = st.о[кд] === 1 && st.о[ке] === е;
      const тело = `${вывеска(180, 56, String(n), 170, 'вывеска-ч')}
        <g transform="translate(180,96)"><text x="-30" y="0" text-anchor="middle" class="цифра-подп">${st.о[кд] === 1 ? '↑ десятки' : ''}</text><text x="34" y="0" text-anchor="middle" class="цифра-подп">${st.о[ке] === е ? 'единицы ↑' : ''}</text></g>
        ${st.о[кд] === 1 ? коробка(30, 140, 100, { хлоп: true }) : `<rect x="30" y="140" width="100" height="86" rx="12" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2.4" stroke-dasharray="7 6"/><text x="80" y="192" text-anchor="middle" class="подпись-б">?</text>`}
        ${st.о[ке] === е ? Array.from({length: е}, (_, j) => { const [x, y] = россыпь(170, 160, j, 30); return орех(x, y, { класс: 'хлоп' }); }).join('')
          : `<rect x="160" y="140" width="170" height="86" rx="12" fill="rgba(255,255,255,.25)" stroke="#fff" stroke-width="2.4" stroke-dasharray="7 6"/><text x="245" y="192" text-anchor="middle" class="подпись-б">?</text>`}`;
      return сцена(тело, 'Число ' + n) +
        `<p class="задание">Сколько коробок-десятков?</p>` + ответы(i, кд, [1, е], 1, st, {
          [е]: `Наоборот! Слева в числе ${n} стоит 1 — это десятки, коробка одна. ${е} справа — это единицы.` }) +
        `<p class="задание">Сколько орешков россыпью?</p>` + ответы(i, ке, [1, е, n], е, st, {
          [n]: `${n} — это всё число. Россыпью — только то, что не в коробке: ${е}.`,
          1: `Единица слева — это коробка-десяток. Россыпью — цифра справа: ${е}.` }) +
        (ок ? готово(`${n} = 10 + ${е}: одна коробка и ${е} орешков.`) + кнопка(st.р < 1 ? 'Следующее число →' : 'Готово →', `ДС301.раунд(${i})`) : '');
    },
    готов: st => st.р >= 2,
    делать: () => 'Выбери ответы на оба вопроса'
  },
  /* 7 · ГДЕ БОЛЬШЕ ─────────────────────────────────────────────── */
  {
    кто: 'борька', t: 'У кого больше?',
    say: 'У кого больше орешков? Нажми на кучку побольше!',
    начало(st){ st.р = 0; },
    рисуй(i, st){
      const ПАРЫ = [{ а: 14, б: 17 }, { а: 20, б: 19 }];
      if (st.р >= ПАРЫ.length) return сцена(`${вывеска(180, 50, '17 > 14 · 20 > 19', 240)}${герой('хрум', 100, 280, 140, 'радуется')}${герой('борька', 260, 280, 140, 'радуется')}`, 'Хрум и Борька') +
        готово('Сначала сравниваем коробки-десятки. Если их поровну — сравниваем орешки россыпью.');
      const П = ПАРЫ[st.р], ключ = 'п' + st.р, отв = st.о[ключ], больше = П.а > П.б ? 'а' : 'б';
      const мимо = (st.м[ключ] || []);
      const группа = (x0, n, кто, сторона) => `<g class="цель" role="button" tabindex="0" onclick="ДС301.больше(${i},'${сторона}','${больше}')">
          <rect x="${x0 - 6}" y="70" width="172" height="226" rx="16" fill="${отв === сторона ? 'rgba(140,220,110,.3)' : мимо.includes(сторона) ? 'rgba(232,120,100,.25)' : 'rgba(255,255,255,.12)'}" stroke="${отв === сторона ? '#2f7a46' : '#fff'}" stroke-width="2.4" stroke-dasharray="${отв === сторона ? '0' : '7 6'}"/>
          ${герой(кто, x0 + 80, 160, 86, 'дышит')}${число(x0, 172, n, { w: 56, шаг: 20 })}
          ${отв != null ? `<text x="${x0 + 80}" y="292" text-anchor="middle" class="крупно-б">${n}</text>` : ''}</g>`;
      return сцена(группа(14, П.а, 'хрум', 'а') + группа(192, П.б, 'борька', 'б'), 'Две кучки орешков') +
        (мимо.length && отв == null ? `<p class="разбор">${st.р === 0 ? 'Сравни коробки: их поровну, по одной. Тогда смотрим на орешки россыпью — у кого их больше?' : 'У Хрума две коробки — это 20. У Борьки одна коробка и 9 орешков — 19. Две коробки больше!'}</p>` : '') +
        (отв != null ? готово(st.р === 0 ? '17 больше 14: десятков поровну, а единиц у Борьки больше.' : '20 больше 19: две коробки-десятка больше, чем одна, сколько бы ни было россыпью.') +
          кнопка(st.р < 1 ? 'Следующая пара →' : 'Готово →', `ДС301.раунд(${i})`) : '');
    },
    готов: st => st.р >= 2,
    делать: () => 'Нажми на кучку, где орешков больше'
  },
  /* 8 · ЧТО ЗА ЧИСЛО? — тренажёр ───────────────────────────────── */
  {
    кто: 'хрум', t: 'Что за число?',
    say: 'Шесть загадок! Какое число в коробках и орешках?',
    начало(st){ st.з = 0; st.звёзд = 0; },
    рисуй(i, st){
      const банка = `<g transform="translate(306,96) scale(.8)">
        <path d="M-34,0 L-38,150 Q0,166 38,150 L34,0 Z" fill="rgba(220,240,255,.45)" stroke="#e8f4ff" stroke-width="3"/>
        <rect x="-38" y="-14" width="76" height="16" rx="5" fill="#c98d56" stroke="#6b3f1e" stroke-width="2"/>
        ${Array.from({length: st.звёзд}, (_, k) => `<image href="${ОБЩ}star.webp" x="${-30 + (k % 3) * 20}" y="${120 - Math.floor(k / 3) * 22}" width="26" height="26"/>`).join('')}
        <text y="190" text-anchor="middle" class="подпись-б">${st.звёзд} из 6</text></g>`;
      if (st.з >= ЗАГАДКИ.length) return сцена(`${банка}${герой('хрум', 130, 280, 170, 'радуется')}`, 'Банка со звёздами') + готово('Шесть из шести! Ты узнаёшь числа второго десятка с первого взгляда.');
      const З = ЗАГАДКИ[st.з], n = З.к * 10 + З.е, ключ = 'з' + st.з;
      const наоборот = З.е > 0 ? З.е * 10 + З.к : null, сумма = З.к + З.е;
      const вар = [...new Set([n, наоборот, сумма, n + 1].filter(v => v != null))].slice(0, 3);
      if (вар.length < 3) вар.push(n - 1);
      const разб = {}; if (наоборот != null) разб[наоборот] = 'Наоборот! Сначала пишем десятки — коробки, потом единицы — орешки россыпью.';
      разб[сумма] = 'Коробка — это не один орешек, а сразу десять!'; разб[n + 1] = 'Пересчитай орешки россыпью ещё раз.'; разб[n - 1] = 'Пересчитай орешки россыпью ещё раз.';
      const тело = `<rect x="10" y="40" width="250" height="210" rx="16" fill="rgba(255,250,235,.85)" stroke="#7a4a20" stroke-width="3"/>
        ${число(30, n >= 20 ? 70 : 104, n, { w: 104, шаг: 30 })}${банка}`;
      return сцена(тело, 'Загадка: коробки и орешки') +
        (st.о[ключ] == null ? ответы(i, ключ, вар.sort((a, b) => a - b), n, st, разб)
          : готово(`${n} = ${З.к === 2 ? '10 + 10' : '10 + ' + З.е}. Звёздочка летит в банку!`) + кнопка(st.з < 5 ? 'Следующая загадка →' : 'Готово →', `ДС301.загадка(${i})`));
    },
    готов: st => st.з >= ЗАГАДКИ.length,
    делать: () => 'Какое это число?'
  },
  /* 9 · ИТОГ ───────────────────────────────────────────────────── */
  {
    кто: 'борька', t: 'Полная корзина',
    say: 'Мы несём корзину! Нажми — положим туда коробки.',
    начало(st){ st.полна = false; },
    рисуй(i, st){
      const тело = `<g class="цель" role="button" tabindex="0" onclick="ДС301.корзина(${i})">
          <rect x="40" y="80" width="280" height="200" fill="transparent"/>
          <image href="${ИМГ}druzya.webp" x="30" y="100" width="300" height="190" class="${st.полна ? 'радуется' : 'дышит'}"/>
          ${st.полна ? коробка(132, 140, 54, { хлоп: true }) + коробка(176, 136, 54, { хлоп: true }) : `<g transform="translate(180,150)"><circle r="14" fill="#ffd76a" stroke="#a3762a" stroke-width="2" class="мерцает"/><text y="6" text-anchor="middle" class="метка-ч">!</text></g>`}
        </g>
        ${st.полна ? `<g class="хлоп"><image href="${ОБЩ}medal.webp" x="152" y="6" width="56" height="74"/></g>` : ''}`;
      return сцена(тело, 'Хрум и Борька с корзиной') +
        `<div class="памятка">
          <div><b>10 = коробка</b><span>десять единиц — один десяток</span></div>
          <div><b>13 = 10 + 3</b><span>коробка и три россыпью</span></div>
          <div><b>сем-на-дцать</b><span>семь на десять — 17</span></div>
          <div><b>20 = 10 + 10</b><span>два десятка, единиц нет</span></div>
        </div>` + (st.полна ? готово('Две коробки — двадцать! Медаль «10» твоя: ты знаешь числа второго десятка!') : '');
    },
    готов: st => st.полна,
    делать: () => 'Нажми на корзину'
  }
  ];

  /* ═══════════════════ ДЕЙСТВИЯ ═══════════════════ */
  window.ДС301 = {
    сказать(){ try { if (window.VOICE && VOICE.say) VOICE.say(КАДРЫ[шаг()].say); } catch(e){} },
    собрать(i, k){
      const st = сост(i); if (st.взят.includes(k) || st.закрыт) return;
      const нач = i === 5 ? 7 : 0; if (нач + st.взят.length >= 10) return;
      const клетка = нач + st.взят.length;
      const [x, y] = i === 5 ? [[176, 160], [224, 150], [272, 166]][k] : ПОЛЯНА[k];
      st.взят.push(k); st.нов = { k: клетка, x, y, t: Date.now() };
      перерисовать();
    },
    закрыть(i){ const st = сост(i); st.закрыт = true; перерисовать(); },
    досчитать(i, k){ const st = сост(i); if (st.сч.includes(k)) return; st.сч.push(k); перерисовать(); },
    добавить(i, что){
      const st = сост(i);
      if (что === 'к'){ if (st.кор >= 2) return; st.кор++; }
      else {
        if (st.кор * 10 + st.ед >= 20) return;
        st.ед++;
        if (st.ед === 10 && st.кор < 2){ st.ед = 0; st.кор++; st.упак = Date.now(); }
      }
      перерисовать();
    },
    убрать(i, что){ const st = сост(i); if (что === 'к' && st.кор > 0) st.кор--; else if (что === 'е' && st.ед > 0) st.ед--; перерисовать(); },
    раунд(i){ const st = сост(i); st.р++; st.кор = 0; st.ед = 0; st.нажато = []; перерисовать(); },
    слог(i, k){ const st = сост(i); if (!st.нажато.includes(k)) st.нажато.push(k); перерисовать(); },
    камень(i, n){
      const st = сост(i); if (st.в >= 3) return;
      const ВОПР = [14, 18, 12], надо = ВОПР[st.в];
      if (n === надо){ st.откуда = st.где; st.где = n; st.t = Date.now(); st.в++; st.подсказка = ''; }
      else st.подсказка = st.в === 0 ? `Это ${n}. Четырнадцать — десяток и четыре: 11, 12, 13, 14.`
        : st.в === 1 ? (n === 17 ? 'Это само 17. После — следующий камень, справа.' : n === 16 ? 'Это перед 17. А после — справа от него.' : 'После 17 идёт следующее число: семнадцать, восемнадцать.')
        : (n === 13 ? 'Это само 13. Перед — камень слева.' : n === 14 ? 'Это после 13. А перед — слева.' : 'Перед 13 стоит предыдущее число: двенадцать, тринадцать.');
      перерисовать();
    },
    больше(i, сторона, верная){
      const st = сост(i), ключ = 'п' + st.р; if (st.о[ключ] != null) return;
      if (сторона === верная) st.о[ключ] = сторона; else { st.м[ключ] = st.м[ключ] || []; if (!st.м[ключ].includes(сторона)) st.м[ключ].push(сторона); }
      перерисовать();
    },
    ответ(i, ключ, n, верный){
      const st = сост(i); if (st.о[ключ] != null) return;
      if (n === верный){ st.о[ключ] = n; if (i === 8) st.звёзд++; }
      else { st.м[ключ] = st.м[ключ] || []; if (!st.м[ключ].includes(n)) st.м[ключ].push(n); }
      перерисовать();
    },
    загадка(i){ const st = сост(i); st.з++; перерисовать(); },
    корзина(i){ const st = сост(i); st.полна = true; перерисовать(); }
  };

  /* ═══════════════════ СТИЛЬ ═══════════════════ */
  const СТИЛЬ = `
  @font-face{font-family:'Pangolin301';src:url('fonts/Pangolin-ru.woff2') format('woff2');font-display:swap}
  #lvis .${К}{--контур:#4a2a10;--лист:#fff6e4;--чернила:#2a1d10;--верно:#2f7a46;--мимо:#c2412b;
    font-family:'Pangolin301','Comic Sans MS',Georgia,serif;color:var(--чернила);display:flex;flex-direction:column;gap:12px;padding:2px}
  #lvis .${К} *{box-sizing:border-box}
  #lvis .${К} button,#lvis .${К} .цель{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none;touch-action:manipulation}
  /* реплика — в пергаментной рамке владельца */
  #lvis .${К} .реплика{display:flex;align-items:center;gap:10px;padding:24px 26px 22px 24px;min-height:104px;
    background:url('${ИМГ}ramka.webp') center/100% 100% no-repeat;filter:drop-shadow(0 4px 3px rgba(40,20,5,.25))}
  #lvis .${К} .аватар{flex:none;display:flex;flex-direction:column;align-items:center;gap:2px;width:58px}
  #lvis .${К} .аватар img{width:54px;height:62px;object-fit:contain}
  #lvis .${К} .аватар span{font-size:13px;color:#7a4a20;line-height:1}
  #lvis .${К} .реплика p{margin:0;font-size:18px;line-height:1.3;flex:1}
  #lvis .${К} .слушать{flex:none;width:44px;height:44px;border-radius:50%;border:2.5px solid var(--контур);
    background:linear-gradient(180deg,#ffe58a,#f4b73c);font-size:19px;cursor:pointer;box-shadow:0 3px 0 #8a4f14}
  #lvis .${К} .слушать:active{transform:translateY(3px);box-shadow:none}
  #lvis .${К} .сцена{border:3px solid var(--контур);border-radius:20px;overflow:hidden;background:#cfe6b8;box-shadow:0 5px 0 rgba(74,42,16,.25)}
  #lvis .${К} .сцена svg{display:block;width:100%;height:auto}
  #lvis .${К} .цель{cursor:pointer}
  #lvis .${К} .цель:focus{outline:none}
  #lvis .${К} image{pointer-events:none}
  #lvis .${К} .лёт{animation:дс-лёт .62s cubic-bezier(.3,.7,.35,1) both}
  #lvis .${К} .хлоп{animation:дс-хлоп .45s ease-out both;transform-box:fill-box;transform-origin:center}
  #lvis .${К} .качается{animation:дс-качаться 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  #lvis .${К} .дышит{animation:дс-дышит 3s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  #lvis .${К} .радуется{animation:дс-радость .9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  #lvis .${К} .мерцает{animation:дс-мерцать 1.2s ease-in-out infinite}
  @keyframes дс-лёт{0%{transform:translate(var(--dx),var(--dy)) scale(1.15)}50%{transform:translate(calc(var(--dx) * .45),calc(var(--dy) * .45 - 46px)) scale(1.25)}100%{transform:translate(0,0) scale(1)}}
  @keyframes дс-хлоп{0%{transform:scale(.5)}60%{transform:scale(1.18)}100%{transform:scale(1)}}
  @keyframes дс-качаться{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
  @keyframes дс-дышит{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,.985)}}
  @keyframes дс-радость{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes дс-мерцать{0%,100%{opacity:.5}50%{opacity:1}}
  #lvis .${К} svg text{font-family:'Pangolin301','Comic Sans MS',Georgia,serif}
  #lvis .${К} .табло-ч{font-size:30px;fill:#5a2a08;paint-order:stroke;stroke:#fff;stroke-width:4px;stroke-linejoin:round}
  #lvis .${К} .медаль-ч{fill:#5a2a08}
  #lvis .${К} .метка-ч{font-size:19px;fill:#5a2a08}
  #lvis .${К} .камень-ч{font-size:15px;fill:#4a3a2a;paint-order:stroke;stroke:#fff;stroke-width:2.6px;stroke-linejoin:round}
  #lvis .${К} .камень-ч.вкл{fill:#a3600a;font-size:17px}
  #lvis .${К} .подпись-б{font-size:17px;fill:#fff;paint-order:stroke;stroke:#3a200c;stroke-width:4px;stroke-linejoin:round}
  #lvis .${К} .вывеска-т{font-size:24px;fill:#4a2a08;paint-order:stroke;stroke:#ffe9b8;stroke-width:3px;stroke-linejoin:round}
  #lvis .${К} .вывеска-ч{font-size:38px;fill:#4a2a08;paint-order:stroke;stroke:#ffe9b8;stroke-width:3px}
  #lvis .${К} .слог-т{font-size:24px;fill:#5a2a08}
  #lvis .${К} .на-т{font-size:30px;fill:#ffd76a;paint-order:stroke;stroke:#3a200c;stroke-width:5px}
  #lvis .${К} .цифра-подп{font-size:13px;fill:#fff;paint-order:stroke;stroke:#3a200c;stroke-width:3px}
  #lvis .${К} .крупно-б{font-size:30px;fill:#fff;paint-order:stroke;stroke:#3a200c;stroke-width:5px;stroke-linejoin:round}
  /* ── вывеска с примером ── */
  #lvis .${К} .вывеска{position:relative;align-self:center;padding-top:16px}
  #lvis .${К} .верёвка{position:absolute;top:0;width:3px;height:22px;background:repeating-linear-gradient(180deg,#c9a46a 0 4px,#8a6a3a 4px 7px);border-radius:2px}
  #lvis .${К} .верёвка:first-child{left:22%}
  #lvis .${К} .верёвка:nth-child(2){right:22%}
  #lvis .${К} .запись{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;
    padding:10px 14px;border-radius:18px;border:3px solid #5b3416;
    background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 3px,rgba(0,0,0,.05) 3px 9px),
      linear-gradient(180deg,#dba566 0%,#bd7d42 55%,#94582a 100%);
    box-shadow:0 6px 0 #5b3416,0 10px 16px rgba(30,15,5,.35),inset 0 2px 0 rgba(255,255,255,.35)}
  #lvis .${К} .запись::before,#lvis .${К} .запись::after{content:'';position:absolute;top:8px;width:7px;height:7px;border-radius:50%;
    background:radial-gradient(circle at 35% 35%,#f3e2c4,#6b4a2a 70%);box-shadow:0 1px 0 rgba(0,0,0,.4)}
  #lvis .${К} .запись::before{left:8px}
  #lvis .${К} .запись::after{right:8px}
  #lvis .${К} .яч{display:inline-flex;align-items:center;justify-content:center;width:56px;height:56px;border-radius:50%;
    background:radial-gradient(circle at 50% 30%,#fffdf3 0%,#fff0c8 60%,#f0cf86 100%);
    border:3px solid #6b3f1e;box-shadow:inset 0 -4px 0 rgba(160,100,30,.25),inset 0 3px 6px #fff,0 3px 0 rgba(60,30,5,.35);position:relative}
  #lvis .${К} .яч::after{content:'';position:absolute;left:12px;top:7px;width:22px;height:9px;border-radius:50%;background:rgba(255,255,255,.75)}
  #lvis .${К} .яч i{font-style:normal;font-size:32px;line-height:1;color:#5a2a08;text-shadow:0 2px 0 #fff,0 3px 5px rgba(90,42,8,.25);position:relative;z-index:1}
  #lvis .${К} .яч.пусто{background:radial-gradient(circle at 50% 35%,#fffbe0,#ffe27a);border:3px dashed #c98a1a;
    animation:дс-окно-кн 1.4s ease-in-out infinite}
  #lvis .${К} .яч.пусто i{color:#b8740a}
  #lvis .${К} .яч.итог{background:radial-gradient(circle at 50% 30%,#f2fff0,#bdeec6 60%,#7fd08f);border-color:#2f7a46;
    animation:дс-выпрыг .5s cubic-bezier(.3,1.6,.5,1) both}
  #lvis .${К} .яч.итог i{color:#1d6a34}
  #lvis .${К} .зн{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;
    border:2.5px solid rgba(0,0,0,.35);box-shadow:inset 0 3px 4px rgba(255,255,255,.55),0 2px 0 rgba(0,0,0,.3)}
  #lvis .${К} .зн i{font-style:normal;font-size:28px;line-height:1;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);margin-top:-2px}
  #lvis .${К} .зн.плюс{background:radial-gradient(circle at 40% 30%,#9be27a,#3f9a2e)}
  #lvis .${К} .зн.минус{background:radial-gradient(circle at 40% 30%,#ff9a7a,#d0432a)}
  #lvis .${К} .зн.равно{background:radial-gradient(circle at 40% 30%,#ffe07a,#d99a1a)}
  @keyframes дс-окно-кн{0%,100%{box-shadow:0 0 0 0 rgba(255,215,90,.0),inset 0 3px 6px #fff}50%{box-shadow:0 0 0 7px rgba(255,215,90,.45),inset 0 3px 6px #fff}}
  @keyframes дс-выпрыг{0%{transform:scale(.3)}70%{transform:scale(1.18)}100%{transform:scale(1)}}
  /* ── кнопки-ответы: деревянная табличка, кремовое окошко, объёмная цифра, блик ── */
  #lvis .${К} .числа{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding-top:4px}
  #lvis .${К} .число{appearance:none;position:relative;min-width:76px;min-height:76px;padding:6px;font-family:inherit;cursor:pointer;
    border:3px solid #5b3416;border-radius:20px;
    background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 3px,rgba(0,0,0,.05) 3px 8px),linear-gradient(180deg,#dba566,#a8682f);
    box-shadow:0 7px 0 #5b3416,0 10px 14px rgba(30,15,5,.35),inset 0 2px 0 rgba(255,255,255,.4);
    transition:transform .1s ease,box-shadow .1s ease}
  #lvis .${К} .число .окно{display:flex;align-items:center;justify-content:center;min-width:58px;height:58px;padding:0 8px;border-radius:14px;position:relative;
    background:radial-gradient(120% 90% at 50% 15%,#fffdf3 0%,#fff1c9 60%,#f3d58e 100%);
    box-shadow:inset 0 -5px 0 rgba(170,110,30,.22),inset 0 3px 6px #fff,0 0 0 2px rgba(91,52,22,.35);
    font-size:36px;line-height:1;color:#5a2a08;text-shadow:0 2px 0 #fff,0 4px 6px rgba(90,42,8,.25)}
  #lvis .${К} .число .окно::after{content:'';position:absolute;left:9px;right:9px;top:5px;height:12px;border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.85),rgba(255,255,255,0))}
  #lvis .${К} .число:active{transform:translateY(6px);box-shadow:0 1px 0 #5b3416,0 3px 6px rgba(30,15,5,.3),inset 0 2px 0 rgba(255,255,255,.4)}
  #lvis .${К} .число.верно{background:linear-gradient(180deg,#8fd46a,#3f8a2e);border-color:#2a5a1e;box-shadow:0 7px 0 #2a5a1e,0 0 0 5px rgba(140,220,110,.45),0 10px 14px rgba(30,15,5,.3);
    animation:дс-радость-кн .6s ease-out}
  #lvis .${К} .число.верно .окно{background:radial-gradient(120% 90% at 50% 15%,#f4fff0,#c7f0cc 65%,#86d49a);color:#1d6a34}
  #lvis .${К} .число.верно::after{content:'★';position:absolute;right:-10px;top:-12px;font-size:26px;color:#ffc93a;text-shadow:0 2px 0 #a3762a,0 0 6px #fff}
  #lvis .${К} .число.мимо{background:linear-gradient(180deg,#e89a86,#b4553e);border-color:#7a2a18;box-shadow:0 7px 0 #7a2a18,0 10px 14px rgba(30,15,5,.25);
    animation:дс-дрожь .4s ease-in-out;cursor:default}
  #lvis .${К} .число.мимо .окно{background:radial-gradient(120% 90% at 50% 15%,#fff3ef,#f7d3c8);color:#b23a22;opacity:.85}
  #lvis .${К} .число.мимо::after{content:'✗';position:absolute;right:-8px;top:-10px;width:24px;height:24px;border-radius:50%;background:#c2412b;color:#fff;
    font-size:15px;line-height:24px;text-align:center;box-shadow:0 2px 0 #7a2a18}
  #lvis .${К} .число:disabled:not(.верно):not(.мимо){opacity:.55}
  @keyframes дс-радость-кн{0%{transform:scale(1)}35%{transform:scale(1.15) translateY(-6px)}100%{transform:scale(1)}}
  @keyframes дс-дрожь{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}
  #lvis .${К} .запись{background:url('${ИМГ}doska.webp') center/100% 100% no-repeat;border:none;box-shadow:none;padding:16px 26px 18px;filter:drop-shadow(0 5px 3px rgba(40,20,5,.35))}
  #lvis .${К} .запись::before,#lvis .${К} .запись::after{display:none}
  #lvis .${К} .разбор{margin:0;font-size:18px;line-height:1.35;background:#fde3d9;border:2.5px solid var(--мимо);border-radius:14px;padding:10px 12px;color:#6a1e10}
  #lvis .${К} .задание{margin:0;font-size:19px;line-height:1.3;text-align:center;color:#f2ead6}
  #lvis .${К} .готово{display:flex;gap:8px;align-items:center;margin:0;font-size:19px;line-height:1.3;background:#c4ebcf;
    border:2.5px solid var(--верно);border-radius:16px;padding:10px 14px;color:#1d5a32}
  #lvis .${К} .готово span{font-size:24px;color:#f0b23a}
  #lvis .${К} .ряд-кн{display:flex;justify-content:center}
  #lvis .${К} .дальше-кн{appearance:none;min-height:56px;padding:0 20px;font-family:inherit;font-size:21px;border:3px solid var(--контур);
    border-radius:16px;background:linear-gradient(180deg,#ffe58a,#f4b73c);color:#4a2a0c;cursor:pointer;box-shadow:0 5px 0 #8a4f14}
  #lvis .${К} .дальше-кн:active{transform:translateY(5px);box-shadow:none}
  #lvis .${К} .разряды{display:flex;gap:10px;justify-content:center}
  #lvis .${К} .разряды div{display:flex;flex-direction:column;align-items:center;min-width:92px;padding:8px 10px 10px;border-radius:16px;border:3px solid #5b3416;
    background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 3px,rgba(0,0,0,.05) 3px 8px),linear-gradient(180deg,#e8bf86,#c98f52);box-shadow:0 5px 0 #5b3416}
  #lvis .${К} .разряды span{font-size:14px;color:#4a2a0c}
  #lvis .${К} .разряды b{font-weight:normal;font-size:34px;line-height:1;color:#5a2a08;background:radial-gradient(circle at 50% 30%,#fffdf3,#f3d58e);
    border:2.5px solid #6b3f1e;border-radius:12px;min-width:52px;text-align:center;padding:4px 6px;margin-top:3px}
  #lvis .${К} .разряды .итог-р{background:linear-gradient(180deg,#8fd46a,#3f8a2e);border-color:#2a5a1e;box-shadow:0 5px 0 #2a5a1e}
  #lvis .${К} .разряды .итог-р span{color:#fff}
  #lvis .${К} .памятка{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  #lvis .${К} .памятка div{background:var(--лист);border:2.5px solid var(--контур);border-radius:14px;padding:8px 10px;display:flex;flex-direction:column;gap:2px;box-shadow:0 3px 0 rgba(74,42,16,.2)}
  #lvis .${К} .памятка b{font-size:21px;font-weight:normal}
  #lvis .${К} .памятка span{font-size:15px;color:#5a4028;line-height:1.25}
  #lvis .${К} .что-делать{margin:0;font-size:18px;text-align:center;color:#f2ead6;background:rgba(42,29,16,.5);border-radius:12px;padding:8px 12px}
  #lvis .${К} .дт-лента{background:url('${ИМГ}doska.webp') center/100% 100% no-repeat;border:none;box-shadow:none;padding:10px 28px 12px}
  @media (max-width:370px){
    #lvis .${К} .реплика p{font-size:16px}
    #lvis .${К} .число{min-width:66px;min-height:66px;padding:5px}
    #lvis .${К} .число .окно{min-width:50px;height:50px;font-size:30px}
    #lvis .${К} .яч{width:48px;height:48px}
    #lvis .${К} .яч i{font-size:28px}
    #lvis .${К} .памятка{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion:reduce){#lvis .${К} *{animation:none !important;transition:none !important}}
  `;
  function стиль(){
    if (document.getElementById(К + '-стиль')) return;
    const s = document.createElement('style'); s.id = К + '-стиль'; s.textContent = СТИЛЬ; document.head.appendChild(s);
  }

  /* ═══════════════════ ОТРИСОВКА ═══════════════════ */
  function рисовать(el){
    стиль();
    const i = шаг(), к = КАДРЫ[i], st = сост(i), гот = к.готов(st), Г = ГЕРОИ[к.кто];
    const делать = typeof к.делать === 'function' ? к.делать(st) : к.делать;
    el.innerHTML = `<div class="${К}">
      <div class="реплика"><span class="аватар"><img src="${Г.ф}" alt=""><span>${Г.имя}</span></span><p>${к.say}</p>
        <button type="button" class="слушать" aria-label="Послушать" onclick="ДС301.сказать()">🔊</button></div>
      ${к.рисуй(i, st)}
      ${гот || !делать ? '' : `<p class="что-делать">${делать}</p>`}
    </div>`;
  }

  /* ═══════════════════ ТРЕНАЖЁР В СТИЛЕ УРОКА ═══════════════════ */
  if (window.ДТ) ДТ.подключить({
    ID, корень: К, стиль,
    герой: { ф: ГЕРОИ.хрум.ф, имя: 'Хрум' }, герои: { борька: { ф: ГЕРОИ.борька.ф, имя: 'Борька' } },
    вопросы: {
      проверка: {
        картинка: () => сцена(`${вывеска(180, 46, 'Число 16', 150)}${число(30, 120, 16, { w: 104, шаг: 36, м: 1.15 })}${герой('хрум', 320, 292, 110, 'дышит')}`, 'Коробка и шесть орешков'),
        разборы: { '6 десятков и 1 единица': 'Наоборот! Слева в числе 16 стоит 1 — это десяток. 6 справа — единицы.',
                   '16 десятков': 'Шестнадцать коробок — это очень много! В числе 16 одна коробка-десяток и 6 орешков.',
                   '1 десяток и 16 единиц': 'Россыпью меньше десяти: 16 = 10 + 6.' },
        итог: '16 = 10 + 6: один десяток и шесть единиц.'
      },
      задачи: [
        { от: 10, до: 20, кто: 'борька', картинка: () => сцена(`${вывеска(180, 46, '10 + 7', 150)}${число(30, 120, 17, { w: 104, шаг: 36, м: 1.15 })}${герой('борька', 320, 292, 110, 'дышит')}`, 'Коробка и семь орешков'),
          разборы: { 7: 'Семь — только орешки россыпью. А ещё коробка-десяток!', 16: 'Пересчитай россыпь: их семь. Десять и семь — семнадцать.', 18: 'Пересчитай россыпь: их семь.' },
          итог: '10 + 7 = 17. Сем-на-дцать — семь на десять!' },
        { картинка: () => сцена(`${вывеска(180, 46, '1 коробка и 4', 190)}${число(30, 120, 14, { w: 104, шаг: 36, м: 1.15 })}${герой('хрум', 320, 292, 110, 'дышит')}`, 'Коробка и четыре орешка'),
          разборы: { '41': 'Наоборот! Сначала десятки — 1, потом единицы — 4.', '40': 'Сорок — это четыре коробки. А у нас одна.', '4': 'Четыре — только россыпь. Не забудь коробку-десяток!' },
          итог: '1 десяток и 4 единицы — это 14.' },
        { от: 10, до: 20, кто: 'борька', картинка: () => сцена(`${Array.from({length: 4}, (_, k) => `<g transform="translate(${50 + k * 82},214) scale(1.8)">${камень(0, 0, 17 + k, k === 3, '')}</g>`).join('').replace('>20<', '>?<')}
              ${вывеска(180, 60, 'Что идёт после 19?', 250)}${герой('борька', 320, 170, 90, 'дышит')}`, 'Камни 17, 18, 19 и ?'),
          разборы: { 19: 'Это само 19. После — на шаг дальше.', 18: 'Это перед 19. А нам нужно после.', 10: 'После 19 идёт двадцать — две коробки-десятка.' },
          итог: 'После 19 идёт 20 — два десятка!' }
      ]
    },
    финал: () => сцена(`<image href="${ИМГ}druzya.webp" x="30" y="100" width="300" height="190" class="радуется"/>
        ${коробка(132, 140, 54, {})}${коробка(176, 136, 54, {})}<g class="хлоп"><image href="${ОБЩ}medal.webp" x="152" y="6" width="56" height="74"/></g>`, 'Хрум и Борька празднуют')
  });

  /* ═══════════════════ РЕГИСТРАЦИЯ ═══════════════════ */
  window.WAVE_B = window.WAVE_B || {};
  window.WAVE_B[ID] = function(el){
    try { рисовать(el); }
    catch(e){ el.innerHTML = ''; try { console.error('урок ' + ID + ':', e); } catch(_){} }
  };
  const НОВОЕ = {
    title: 'Числа 11–20: десятки и единицы', ico: '🔟',
    src: 'Начальная школа · 1 класс · Нумерация чисел второго десятка',
    subj: 'jun',
    explain: КАДРЫ.map((к, i) => (i + 1) + '. ' + к.t),
    check: {
      q: 'Сколько десятков и единиц в числе 16?',
      choices: ['1 десяток и 6 единиц', '6 десятков и 1 единица', '16 десятков', '1 десяток и 16 единиц'], ans: 0,
      exp: '16 = 10 + 6: один десяток и шесть единиц.'
    },
    tasks: [
      {q:'Чему равно 10 + 7?', kind:'unit', ans:17, tol:0, hints:['Одна коробка-десяток и семь орешков.','Сем-на-дцать: 10 + 7 = 17.'], sol:'10 + 7 = 17'},
      {q:'Какое число состоит из 1 десятка и 4 единиц?', kind:'choice', choices:['14','41','40','4'], ans:0, tol:0,
       hints:['Слева пишем десятки, справа — единицы.','10 + 4 = 14.'], sol:'14'},
      {q:'Какое число идёт после 19?', kind:'unit', ans:20, tol:0, hints:['Следующее число — на один больше.','19 + 1 = 20: два десятка.'], sol:'20'}
    ]
  };
  /* урок 301 лежит в lessons_draft.js, а comics_12.js подменяет его комиксом — правим запись на месте
     и снимаем comic/scene, иначе openLessonView откроет окно комикса */
  function обновить(){
    if (!window.ARH_LESSONS) return;
    const L = window.ARH_LESSONS.find(x => x.id === ID);
    if (L){ Object.assign(L, НОВОЕ); delete L.comic; delete L.scene; delete L.mode; }
    else window.ARH_LESSONS.push(Object.assign({ id: ID }, НОВОЕ));
  }
  обновить();
  window.addEventListener('load', обновить);
})();
