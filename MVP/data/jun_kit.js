/* ============ ДЕТСКИЙ НАБОР УРОКА (1–2 класс) · window.ДК ============

   Зачем. Владелец 14.10.2026 принял урок 302 (MVP/data/lesson_jun302_vyrazheniya.js) как образец:
   ребёнок ТАСКАЕТ пальцем, герои ЖИВЫЕ (облачко с репликой, смена позы, нажал — подсказка),
   ответ ДЕЛОМ, а не табличкой, у каждого кадра свой фон, шрифт Nunito. Затем попросил так же
   переделать уроки 71, 73, 74 (к ним — игры). Чтобы не копировать движок трижды, общее вынесено
   сюда; урок 302 остаётся самостоятельным (его не трогаем).

   Как урок подключается:
     ДК.подключить({
       ID, ИМГ:'img/l71/', размеры:{имя:[w,h]…},            ← картинки урока и их пропорции
       герои:{ключ:{имя, ф:'картинка', позы:{поза:'картинка'}}},
       фоны:['fon_…' по кадрам], кадры:[…], запись:{title, ico, src, check, tasks},
       тренажёр:{герой, герои, проверка:{картинка(н), разборы, итог}, задачи:[…], финал(н)} })
   Кадр: { кто, t, say, начало(st), рисуй(st, н, i) → html, готов(st), делать(st), подсказка(st),
           бросить(st, что, зона, x, y, н) → принято?, тап(st, что, н) → зона|null, клики:{имя(st,…арг,н)} }
   н — набор рисования, привязанный к кадру: н.сцена, н.карт, н.тащ, н.герой, н.облачко, н.вывеска,
   н.жетон, н.карточка, н.окошко, н.зона, н.запись, н.готово, н.кнопка, н.таблица, н.сказ, н.клик, н.лёт.

   Перетаскивание: <g class="тащ" data-что> внутри .дк; один обработчик pointer-событий на document;
   отпустили над [data-зона] → кадр.бросить(); не принято — элемент плавно возвращается; касание без
   сдвига → кадр.тап() (запасной путь). На кадрах с перетаскиванием у svg touch-action:none.
   Состояние — CHS[lidKey(ID)].п[кадр]. Логику приложения (LV, lvStep, тренажёр) не трогаем. */
(function(){
  'use strict';
  const ДОСКА = 'img/l301/';
  const ЛЁТ = 650;
  const УРОКИ = {};
  let клип = 0;
  const свежо = (t) => t && (Date.now() - t) < ЛЁТ;
  const экр = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

  function пам(ID){
    const к = (typeof lidKey === 'function') ? lidKey(ID) : String(ID);
    if (typeof CHS === 'undefined') window.CHS = {};
    if (!CHS[к]) CHS[к] = {};
    if (!CHS[к].п) CHS[к].п = {};
    return CHS[к].п;
  }
  const шаг = (У) => Math.max(0, Math.min(У.кадры.length - 1, (typeof LV !== 'undefined' && LV.step) || 0));
  function сост(У, i){
    const п = пам(У.ID);
    if (!п[i]){ п[i] = {}; if (У.кадры[i].начало) У.кадры[i].начало(п[i]); }
    return п[i];
  }
  const перерисовать = () => { if (typeof chRender === 'function') chRender(0); };

  const ГРАД = `<defs>
    <radialGradient id="дк-окно" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#fffdf3"/><stop offset=".7" stop-color="#fff0c8"/><stop offset="1" stop-color="#f3d58e"/></radialGradient>
    <radialGradient id="дк-синий" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#9cc0f4"/><stop offset=".6" stop-color="#3a68c0"/><stop offset="1" stop-color="#24489a"/></radialGradient>
    <radialGradient id="дк-монета" cx=".4" cy=".3" r=".8"><stop offset="0" stop-color="#fff3b0"/><stop offset=".55" stop-color="#ffc93a"/><stop offset="1" stop-color="#c9861a"/></radialGradient>
    <radialGradient id="дк-камень" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#f4efe6"/><stop offset=".6" stop-color="#cfc6b8"/><stop offset="1" stop-color="#9a9082"/></radialGradient>
    <linearGradient id="дк-дерево" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b878"/><stop offset=".55" stop-color="#c98d50"/><stop offset="1" stop-color="#9a6230"/></linearGradient>
    <linearGradient id="дк-полка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d79a5a"/><stop offset=".5" stop-color="#b0743a"/><stop offset="1" stop-color="#7a4a20"/></linearGradient>
    <filter id="дк-тень" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="3" stdDeviation="2.4" flood-color="#2a1404" flood-opacity=".38"/></filter>
  </defs>`;

  /* ═══════════ набор рисования для кадра ═══════════ */
  function набор(У, i, st){
    const ID = У.ID;
    const н = {};
    н.свежо = свежо;
    н.клик = (имя, ...арг) => `ДК.клик(${ID},'${экр(имя)}'${арг.map(a => typeof a === 'number' ? ',' + a : `,'${экр(a)}'`).join('')})`;
    н.цель = (клик) => клик ? `class="цель" role="button" tabindex="0" onclick="${клик}"` : '';
    н.лёт = (от, x, y) => от ? ` class="лёт" style="--dx:${(от[0] - x).toFixed(1)}px;--dy:${(от[1] - y).toFixed(1)}px"` : '';
    н.сказ = (кто, т, поза) => {
      st.рк = { кто, т, поза: поза || null, t: Date.now() };
      try { if (window.VOICE && VOICE.say) VOICE.say(т); } catch(e){}
    };
    /* картинка урока: низ по центру в (x,y), высота h. о: центр (якорь — центр), класс, тень, фильтр, откуда (прилёт) */
    н.карт = (имя, x, y, h, о) => {
      о = о || {};
      const [ш, в] = У.размеры[имя] || [1, 1], w = h * ш / в;
      const ax = -w / 2, ay = о.центр ? -h / 2 : -h;
      const тень = о.тень ? `<ellipse cx="0" cy="${о.центр ? h * .45 : -1}" rx="${w * .36}" ry="${Math.max(2, h * .06)}" fill="rgba(30,15,5,.28)"/>` : '';
      return `<g transform="translate(${x},${y})${о.поворот ? ` rotate(${о.поворот})` : ''}"><g${н.лёт(о.откуда, x, y)}><g class="${о.класс || ''}">${тень}
        <image href="${У.ИМГ}${имя}.webp" x="${ax.toFixed(1)}" y="${ay.toFixed(1)}" width="${w.toFixed(1)}" height="${h}"${о.фильтр ? ` style="filter:${о.фильтр}"` : ''}${о.зерк ? ` transform="scale(-1,1)"` : ''}/></g></g></g>`;
    };
    /* перетаскиваемое: локальные (x,y) — в data-x/y, по ним элемент возвращается */
    н.тащ = (что, x, y, тело, r) => `<g class="тащ" data-что="${что}" data-x="${x}" data-y="${y}" transform="translate(${x},${y})"><circle r="${r || 24}" fill="transparent"/>${тело}</g>`;
    н.зона = (имя, x, y, w, h) => `<rect data-зона="${имя}" x="${x}" y="${y}" width="${w}" height="${h}" rx="16" class="зона"/>`;
    н.герой = (кто, x, y, h, поза, класс) => {
      const Г = У.герои[кто], рк = st.рк && st.рк.кто === кто ? st.рк : null;
      const п = (рк && рк.поза) || поза;
      const ф = (п && Г.позы && Г.позы[п]) || Г.ф;
      const [ш, в] = У.размеры[ф] || [1, 1], w = h * ш / в;
      const кл = класс || (рк && свежо(рк.t) ? 'прыжок' : 'дышит');
      return `<g ${н.цель(н.клик('_подсказка', кто))}><g transform="translate(${x},${y})">
        <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="transparent"/>
        <ellipse cx="0" cy="-2" rx="${w * .32}" ry="${Math.max(3, w * .06)}" fill="rgba(30,15,5,.28)"/>
        <image href="${У.ИМГ}${ф}.webp" x="${-w / 2}" y="${-h}" width="${w}" height="${h}" class="${кл}"/></g></g>`;
    };
    н.облачко = (кто, x, yВерх) => {
      const рк = st.рк; if (!рк || рк.кто !== кто) return '';
      const слова = рк.т.split(' '), строки = []; let с = '';
      for (const сл of слова){ if ((с + ' ' + сл).trim().length > 27){ строки.push(с.trim()); с = сл; } else с += ' ' + сл; }
      if (с.trim()) строки.push(с.trim());
      const ш = Math.min(236, Math.max(...строки.map(s => s.length)) * 7.4 + 28), в = строки.length * 17 + 14;
      const bx = Math.max(4, Math.min(356 - ш, x - ш / 2)), by = Math.max(4, yВерх - в - 12);
      const хвост = Math.max(bx + 16, Math.min(bx + ш - 16, x));
      return `<g class="облачко"><g filter="url(#дк-тень)">
        <rect x="${bx}" y="${by}" width="${ш}" height="${в}" rx="14" fill="#fffef6" stroke="#6b3f1e" stroke-width="2"/>
        <path d="M${хвост - 8},${by + в - 1} L${хвост},${by + в + 11} L${хвост + 8},${by + в - 1} Z" fill="#fffef6" stroke="#6b3f1e" stroke-width="2" stroke-linejoin="round"/>
        <path d="M${хвост - 7},${by + в - 1.5} L${хвост + 7},${by + в - 1.5}" stroke="#fffef6" stroke-width="3"/></g>
        ${строки.map((s, k) => `<text x="${bx + ш / 2}" y="${by + 21 + k * 17}" text-anchor="middle" class="облако-т">${s}</text>`).join('')}</g>`;
    };
    н.вывеска = (x, y, текст, w, кл) => {
      const ш = w || Math.min(340, Math.max(150, String(текст).length * 13 + 60)), h = ш * .228;
      return `<g transform="translate(${x},${y})">
        <path d="M${-ш / 2 + 30},${-h / 2 - 14} L${-ш / 2 + 34},${-h / 2 + 4} M${ш / 2 - 30},${-h / 2 - 14} L${ш / 2 - 34},${-h / 2 + 4}" stroke="#8a6a3a" stroke-width="2.4" stroke-dasharray="3 2"/>
        <image href="${ДОСКА}doska.webp" x="${-ш / 2}" y="${-h / 2}" width="${ш}" height="${h}"/>
        <text y="${кл ? 11 : 7}" text-anchor="middle" class="${кл || 'вывеска-т'}">${текст}</text></g>`;
    };
    н.доска = (x, y, w, h) => `<image href="${ДОСКА}doska.webp" x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" preserveAspectRatio="none"/>`;
    н.жетон = (т, r) => { r = r || 21; const б = /^[a-z]$/.test(т);
      return `<g filter="url(#дк-тень)"><circle r="${r}" fill="${б ? 'url(#дк-синий)' : 'url(#дк-монета)'}" stroke="${б ? '#1d3a78' : '#8a5a10'}" stroke-width="2.4"/></g>
        <circle r="${r * .78}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".45"/>
        <ellipse cx="${-r * .3}" cy="${-r * .45}" rx="${r * .4}" ry="${r * .17}" fill="#fff" opacity=".5"/>
        <text y="${r * .36}" text-anchor="middle" class="${б ? 'жетон-б' : 'жетон-ч'}" style="font-size:${(String(т).length > 1 ? r * .9 : r * 1.05).toFixed(1)}px">${т}</text>`; };
    н.карточка = (т) => { const зн = /^[+−·:=]$/.test(т);
      return `<g filter="url(#дк-тень)"><rect x="-21" y="-23" width="42" height="46" rx="10" fill="url(#дк-дерево)" stroke="#5b3416" stroke-width="2.2"/></g>
        <rect x="-15" y="-17" width="30" height="34" rx="7" fill="#fff7e0" stroke="rgba(91,52,22,.35)"/>
        <text y="10" text-anchor="middle" class="карточка-т" style="fill:${зн ? '#2f6ec2' : '#5a2a08'}">${т}</text>`; };
    н.окошко = (x, y, занято, r) => { r = r || 21; return `<g transform="translate(${x},${y})">
      ${занято ? `<g class="хлоп">${занято}</g>` : `<circle r="${r + 6}" fill="none" stroke="#ffd76a" stroke-width="4" class="мерцает"/><g filter="url(#дк-тень)"><circle r="${r}" fill="#fff4cf" stroke="#8a5a10" stroke-width="2.6" stroke-dasharray="5 4"/></g><text y="${r * .43}" text-anchor="middle" class="окно-т">?</text>`}</g>`; };
    н.слот = (x, y) => `<rect x="${x - 21}" y="${y - 23}" width="42" height="46" rx="10" fill="#fff4cf" stroke="#8a5a10" stroke-width="2.6" stroke-dasharray="6 4" class="мерцает"/><text x="${x}" y="${y + 9}" text-anchor="middle" class="окно-т">?</text>`;
    н.камень = (x, y, т, вкл, клик) => `<g transform="translate(${x},${y})" ${н.цель(клик)}>
      ${клик ? '<rect x="-17" y="-22" width="34" height="38" fill="transparent"/>' : ''}
      <ellipse cx="0" cy="6" rx="16" ry="6.5" fill="rgba(40,25,10,.32)"/>
      <path d="M-15,1 C-15,-8 -8,-11 0,-11 C9,-11 15,-8 15,0 C15,6 9,9 0,9 C-9,9 -15,7 -15,1 Z" fill="url(#дк-камень)" stroke="${вкл ? '#d9a441' : '#7a7064'}" stroke-width="${вкл ? 3 : 1.4}"/>
      <text y="5" text-anchor="middle" class="камень-ч${вкл ? ' вкл' : ''}">${т}</text></g>`;
    н.сцена = (тело, подпись, тащатся, ф) => `<div class="сцена${тащатся ? ' с-тащ' : ''}"><svg viewBox="0 0 360 300" role="img" aria-label="${подпись || 'Картинка'}">${ГРАД}
      <image href="${У.ИМГ}${ф || У.фоны[i] || У.фоны[0]}.webp" x="-90" y="0" width="534" height="300" preserveAspectRatio="xMidYMid slice"/>${тело}</svg></div>`;
    /* запись на вывеске: части — числа/буквы (жетоны), знаки + − · : =, null — пустое окошко, {итог:n} — зелёный ответ */
    н.запись = (части) => `<div class="вывеска"><span class="верёвка"></span><span class="верёвка"></span><div class="запись">${части.map(ч => {
      if (ч && typeof ч === 'object') return `<span class="яч итог"><i>${ч.итог}</i></span>`;
      if (ч == null) return `<span class="яч пусто"><i>?</i></span>`;
      if (/^[+−·:=]$/.test(ч)) return `<span class="зн ${ч === '+' ? 'плюс' : ч === '−' ? 'минус' : ч === '=' ? 'равно' : 'умн'}"><i>${ч}</i></span>`;
      return `<span class="яч"><i>${ч}</i></span>`; }).join('')}</div></div>`;
    н.готово = (т) => `<p class="готово"><span aria-hidden="true">★</span>${т}</p>`;
    н.кнопка = (т, клик) => `<div class="ряд-кн"><button type="button" class="дальше-кн" onclick="${клик}">${т}</button></div>`;
    н.сетка = (пары) => `<div class="сетка">${пары.map(([а, б]) => `<span>${а}<b>${б}</b></span>`).join('')}</div>`;
    н.таблица = (шапка, строки) => `<div class="таблица" style="--кол:${шапка.length}"><div class="тр шапка">${шапка.map(s => `<span>${s}</span>`).join('')}</div>${строки.map(r => `<div class="тр">${r.map(s => `<span>${s}</span>`).join('')}</div>`).join('')}</div>`;
    return н;
  }

  /* ═══════════ отрисовка кадра ═══════════ */
  function рисовать(У, el){
    стиль(); клип = 0;
    const i = шаг(У), к = У.кадры[i], st = сост(У, i), н = набор(У, i, st);
    const гот = к.готов(st), Г = У.герои[к.кто];
    const делать = typeof к.делать === 'function' ? к.делать(st) : к.делать;
    el.innerHTML = `<div class="дк дк${У.ID}" data-урок="${У.ID}">
      <div class="реплика"><span class="аватар"><img src="${У.ИМГ}${Г.ф}.webp" alt=""><span>${Г.имя}</span></span><p>${к.say}</p>
        <button type="button" class="слушать" aria-label="Послушать" onclick="ДК.сказать(${У.ID})">🔊</button></div>
      ${к.рисуй(st, н, i)}
      ${гот || !делать ? '' : `<p class="что-делать">${делать}</p>`}
    </div>`;
  }

  /* ═══════════ действия ═══════════ */
  function урокИКадр(ID){ const У = УРОКИ[ID]; if (!У) return null; const i = шаг(У); return { У, i, к: У.кадры[i], st: сост(У, i) }; }
  window.ДК = {
    УРОКИ,
    подключить(У){
      УРОКИ[У.ID] = У;
      window.WAVE_B = window.WAVE_B || {};
      window.WAVE_B[У.ID] = function(el){
        try { рисовать(У, el); }
        catch(e){ el.innerHTML = ''; try { console.error('урок ' + У.ID + ':', e); } catch(_){} }
      };
      const НОВОЕ = Object.assign({}, У.запись, { explain: У.кадры.map((к, i) => (i + 1) + '. ' + к.t) });
      const обновить = () => {
        if (!window.ARH_LESSONS) return;
        const L = window.ARH_LESSONS.find(x => x.id === У.ID);
        if (L){ Object.assign(L, НОВОЕ); delete L.comic; delete L.scene; delete L.mode; }
        else window.ARH_LESSONS.push(Object.assign({ id: У.ID }, НОВОЕ));
      };
      обновить(); window.addEventListener('load', обновить);
      if (window.ДТ && У.тренажёр){
        const Т = У.тренажёр, н0 = () => набор(У, 0, {});
        const вопр = (в) => в ? Object.assign({}, в, { картинка: в.картинка ? () => в.картинка(н0()) : null }) : в;
        const Г = (ключ) => ({ ф: У.ИМГ + У.герои[ключ].ф + '.webp', имя: У.герои[ключ].имя });
        ДТ.подключить({
          ID: У.ID, корень: 'дк дк' + У.ID, стиль,
          герой: Г(Т.герой), герои: Object.fromEntries(Object.keys(У.герои).map(k => [k, Г(k)])),
          вопросы: { проверка: вопр(Т.проверка), задачи: (Т.задачи || []).map(вопр) },
          финал: Т.финал ? () => Т.финал(н0()) : null
        });
      }
    },
    сказать(ID){ const x = урокИКадр(ID); if (!x) return; try { if (window.VOICE && VOICE.say) VOICE.say(x.к.say); } catch(e){} },
    клик(ID, имя, ...арг){
      const x = урокИКадр(ID); if (!x) return;
      const н = набор(x.У, x.i, x.st);
      if (имя === '_подсказка'){
        const кто = арг[0], Г = x.У.герои[кто];
        н.сказ(кто, x.к.подсказка ? x.к.подсказка(x.st) : x.к.say, Г && Г.позаПодсказки);
      } else if (x.к.клики && x.к.клики[имя]) x.к.клики[имя](x.st, ...арг, н);
      перерисовать();
    },
    бросить(ID, что, зона, px, py){
      const x = урокИКадр(ID); if (!x || !x.к.бросить) return false;
      const н = набор(x.У, x.i, x.st);
      const ок = !!x.к.бросить(x.st, что, зона, px, py, н);
      перерисовать();
      return ок;
    },
    тап(ID, что){
      const x = урокИКадр(ID); if (!x) return;
      const н = набор(x.У, x.i, x.st);
      const зона = x.к.тап ? x.к.тап(x.st, что, н) : null;
      if (зона) this.бросить(ID, что, зона, null, null);
      else перерисовать();
    }
  };

  /* ═══════════ перетаскивание: один обработчик на документ ═══════════ */
  let Т = null;
  const точка = (el, e) => { const svg = el.ownerSVGElement || el; const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY; return p.matrixTransform(el.getScreenCTM().inverse()); };
  function над(svg, p){
    let имя = null;
    svg.querySelectorAll('[data-зона]').forEach(z => { const b = z.getBBox(); if (p.x >= b.x && p.x <= b.x + b.width && p.y >= b.y && p.y <= b.y + b.height) имя = z.getAttribute('data-зона'); });
    return имя;
  }
  const подсветить = (svg, имя) => svg.querySelectorAll('[data-зона]').forEach(z => z.classList.toggle('горит', z.getAttribute('data-зона') === имя));
  document.addEventListener('pointerdown', e => {
    const g = e.target && e.target.closest ? e.target.closest('.дк .тащ') : null;
    if (!g || Т) return;
    const корень = g.closest('.дк'), роди = g.parentNode;
    const p = точка(роди, e), x0 = +g.getAttribute('data-x'), y0 = +g.getAttribute('data-y');
    Т = { g, svg: g.ownerSVGElement, роди, ID: +корень.getAttribute('data-урок'), x0, y0, dx: p.x - x0, dy: p.y - y0, сх: e.clientX, су: e.clientY, сдвиг: false, id: e.pointerId };
    g.classList.add('тащится');
    try { g.setPointerCapture(e.pointerId); } catch(_){}
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('pointermove', e => {
    if (!Т || e.pointerId !== Т.id) return;
    if (Math.hypot(e.clientX - Т.сх, e.clientY - Т.су) > 6) Т.сдвиг = true;
    if (!Т.сдвиг) return;
    const p = точка(Т.роди, e);
    Т.g.style.transform = `translate(${(p.x - Т.dx).toFixed(1)}px,${(p.y - Т.dy).toFixed(1)}px)`;
    подсветить(Т.svg, над(Т.svg, точка(Т.svg, e)));
    e.preventDefault();
  }, { passive: false });
  const конец = (e) => {
    if (!Т || e.pointerId !== Т.id) return;
    const t = Т; Т = null;
    t.g.classList.remove('тащится'); подсветить(t.svg, null);
    const что = t.g.getAttribute('data-что');
    if (!t.сдвиг || e.type === 'pointercancel'){ t.g.style.transform = ''; if (e.type !== 'pointercancel') ДК.тап(t.ID, что); return; }
    const pa = точка(t.svg, e), имя = над(t.svg, pa) || 'прочь';
    const ок = ДК.бросить(t.ID, что, имя, pa.x, pa.y);
    if (!ок && t.g.isConnected){
      t.g.classList.add('назад'); t.g.style.transform = `translate(${t.x0}px,${t.y0}px)`;
      setTimeout(() => { if (t.g.isConnected){ t.g.classList.remove('назад'); t.g.style.transform = ''; } }, 380);
    }
  };
  document.addEventListener('pointerup', конец);
  document.addEventListener('pointercancel', конец);

  /* ═══════════ стиль (общий для всех уроков набора) ═══════════ */
  const ШРИФТ = `'NunitoДК','Nunito','Trebuchet MS',system-ui,sans-serif`;
  const К = '#lvis .дк';
  const СТИЛЬ = `
  @font-face{font-family:'NunitoДК';src:url('fonts/Nunito-ru.woff2') format('woff2');font-weight:200 1000;font-display:swap}
  ${К}{--контур:#4a2a10;--лист:#fff6e4;--чернила:#2a1d10;--верно:#2f7a46;--мимо:#c2412b;
    font-family:${ШРИФТ};font-weight:700;color:var(--чернила);display:flex;flex-direction:column;gap:12px;padding:2px}
  ${К} *{box-sizing:border-box}
  ${К} button,${К} .цель,${К} .тащ{-webkit-tap-highlight-color:transparent;-webkit-touch-callout:none;user-select:none;-webkit-user-select:none}
  ${К} .реплика{display:flex;align-items:center;gap:10px;padding:24px 26px 22px 24px;min-height:104px;
    background:url('${ДОСКА}ramka.webp') center/100% 100% no-repeat;filter:drop-shadow(0 4px 3px rgba(40,20,5,.25))}
  ${К} .аватар{flex:none;display:flex;flex-direction:column;align-items:center;gap:2px;width:58px}
  ${К} .аватар img{width:54px;height:62px;object-fit:contain}
  ${К} .аватар span{font-size:13px;font-weight:800;color:#7a4a20;line-height:1}
  ${К} .реплика p{margin:0;font-size:18px;font-weight:700;line-height:1.35;flex:1}
  ${К} .слушать{flex:none;width:44px;height:44px;border-radius:50%;border:2.5px solid var(--контур);
    background:linear-gradient(180deg,#ffe58a,#f4b73c);font-size:19px;cursor:pointer;box-shadow:0 3px 0 #8a4f14}
  ${К} .слушать:active{transform:translateY(3px);box-shadow:none}
  ${К} .сцена{border:3px solid var(--контур);border-radius:20px;overflow:hidden;background:#cfe6b8;box-shadow:0 5px 0 rgba(74,42,16,.25)}
  ${К} .сцена svg{display:block;width:100%;height:auto}
  ${К} .сцена.с-тащ svg{touch-action:none}
  ${К} .цель{cursor:pointer}
  ${К} .цель:focus{outline:none}
  ${К} image{pointer-events:none}
  ${К} .тащ{cursor:grab}
  ${К} .тащ.тащится{cursor:grabbing;filter:drop-shadow(0 8px 6px rgba(30,15,5,.45))}
  ${К} .тащ.назад{transition:transform .36s cubic-bezier(.3,1.4,.5,1)}
  ${К} .зона{fill:transparent;stroke:none}
  ${К} .зона.горит{fill:rgba(255,230,120,.28);stroke:#ffd76a;stroke-width:3;stroke-dasharray:8 6}
  ${К} .облачко{animation:дк-хлоп .35s ease-out both;transform-box:fill-box;transform-origin:50% 100%;pointer-events:none}
  ${К} .лёт{animation:дк-лёт .6s cubic-bezier(.3,.7,.35,1) both}
  ${К} .хлоп{animation:дк-хлоп .45s ease-out both;transform-box:fill-box;transform-origin:center}
  ${К} .качается{animation:дк-качаться 2.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  ${К} .покачивается{animation:дк-покачиваться 2.4s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  ${К} .дышит{animation:дк-дышит 3s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  ${К} .прыжок{animation:дк-прыжок .55s ease-out 2;transform-box:fill-box;transform-origin:50% 100%}
  ${К} .радуется{animation:дк-радость .9s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
  ${К} .мерцает{animation:дк-мерцать 1.2s ease-in-out infinite}
  ${К} .пульс{animation:дк-пульс 1.3s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
  ${К} .плывёт{animation:дк-плыть 3.2s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
  @keyframes дк-лёт{0%{transform:translate(var(--dx),var(--dy)) scale(1.1)}55%{transform:translate(calc(var(--dx) * .4),calc(var(--dy) * .4 - 34px)) scale(1.2)}100%{transform:translate(0,0) scale(1)}}
  @keyframes дк-хлоп{0%{transform:scale(.5)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
  @keyframes дк-качаться{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}
  @keyframes дк-покачиваться{0%,100%{transform:rotate(-1.5deg)}50%{transform:rotate(1.5deg)}}
  @keyframes дк-дышит{0%,100%{transform:scale(1,1)}50%{transform:scale(1.015,.985)}}
  @keyframes дк-прыжок{0%,100%{transform:translateY(0) scale(1,1)}30%{transform:translateY(0) scale(1.06,.92)}60%{transform:translateY(-14px) scale(.97,1.04)}}
  @keyframes дк-радость{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes дк-мерцать{0%,100%{opacity:.55}50%{opacity:1}}
  @keyframes дк-пульс{0%,100%{transform:scale(1) rotate(0)}50%{transform:scale(1.12) rotate(8deg)}}
  @keyframes дк-плыть{0%,100%{transform:translate(0,0) scaleX(1)}50%{transform:translate(8px,-3px) scaleX(1)}}
  ${К} svg text{font-family:${ШРИФТ}}
  ${К} .жетон-ч{font-weight:900;fill:#5a2a08}
  ${К} .жетон-б{font-weight:900;fill:#fff;font-style:italic}
  ${К} .карточка-т{font-size:26px;font-weight:900}
  ${К} .окно-т{font-size:24px;font-weight:900;fill:#b8740a}
  ${К} .камень-ч{font-size:15px;font-weight:900;fill:#4a3a2a;paint-order:stroke;stroke:#fff;stroke-width:2.6px;stroke-linejoin:round}
  ${К} .камень-ч.вкл{fill:#a3600a;font-size:17px}
  ${К} .облако-т{font-size:13.5px;font-weight:800;fill:#3a240e}
  ${К} .знак-б{font-size:40px;font-weight:900;fill:#fff;paint-order:stroke;stroke:#2a5a1e;stroke-width:6px;stroke-linejoin:round}
  ${К} .подпись-б{font-size:16px;font-weight:900;fill:#fff;paint-order:stroke;stroke:#3a200c;stroke-width:4px;stroke-linejoin:round}
  ${К} .метка-ч{font-weight:900;fill:#5a2a08}
  ${К} .вывеска-т{font-size:18px;font-weight:900;fill:#4a2a08;paint-order:stroke;stroke:#ffe9b8;stroke-width:3px;stroke-linejoin:round}
  ${К} .вывеска-ч{font-size:30px;font-weight:900;fill:#4a2a08;paint-order:stroke;stroke:#ffe9b8;stroke-width:3px}
  ${К} .вывеска{position:relative;align-self:center;padding-top:16px}
  ${К} .верёвка{position:absolute;top:0;width:3px;height:22px;background:repeating-linear-gradient(180deg,#c9a46a 0 4px,#8a6a3a 4px 7px);border-radius:2px}
  ${К} .верёвка:first-child{left:22%}
  ${К} .верёвка:nth-child(2){right:22%}
  ${К} .запись{position:relative;display:flex;align-items:center;justify-content:center;gap:6px;
    background:url('${ДОСКА}doska.webp') center/100% 100% no-repeat;padding:16px 26px 18px;filter:drop-shadow(0 5px 3px rgba(40,20,5,.35))}
  ${К} .яч{display:inline-flex;align-items:center;justify-content:center;min-width:54px;height:54px;padding:0 6px;border-radius:27px;
    background:radial-gradient(circle at 50% 30%,#fffdf3 0%,#fff0c8 60%,#f0cf86 100%);
    border:3px solid #6b3f1e;box-shadow:inset 0 -4px 0 rgba(160,100,30,.25),inset 0 3px 6px #fff,0 3px 0 rgba(60,30,5,.35);position:relative}
  ${К} .яч i{font-style:normal;font-size:30px;font-weight:900;line-height:1;color:#5a2a08;text-shadow:0 2px 0 #fff;position:relative;z-index:1}
  ${К} .яч.пусто{background:radial-gradient(circle at 50% 35%,#fffbe0,#ffe27a);border:3px dashed #c98a1a}
  ${К} .яч.пусто i{color:#b8740a}
  ${К} .яч.итог{background:radial-gradient(circle at 50% 30%,#f2fff0,#bdeec6 60%,#7fd08f);border-color:#2f7a46;animation:дк-выпрыг .5s cubic-bezier(.3,1.6,.5,1) both}
  ${К} .яч.итог i{color:#1d6a34}
  ${К} .зн{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:50%;
    border:2.5px solid rgba(0,0,0,.35);box-shadow:inset 0 3px 4px rgba(255,255,255,.55),0 2px 0 rgba(0,0,0,.3)}
  ${К} .зн i{font-style:normal;font-size:26px;font-weight:900;line-height:1;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.3);margin-top:-2px}
  ${К} .зн.плюс{background:radial-gradient(circle at 40% 30%,#9be27a,#3f9a2e)}
  ${К} .зн.минус{background:radial-gradient(circle at 40% 30%,#ff9a7a,#d0432a)}
  ${К} .зн.умн{background:radial-gradient(circle at 40% 30%,#8fb6f0,#2f6ec2)}
  ${К} .зн.равно{background:radial-gradient(circle at 40% 30%,#ffe07a,#d99a1a)}
  ${К} .зн.умн i{font-size:44px;margin-top:-6px}
  ${К} .сетка{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
  ${К} .сетка span{background:var(--лист);border:2.5px solid var(--контур);border-radius:12px;padding:5px 2px;text-align:center;font-size:15px;font-weight:900;color:#5a2a08;box-shadow:0 3px 0 rgba(74,42,16,.2)}
  ${К} .сетка span b{display:block;font-size:20px;color:#2f7a46}
  @keyframes дк-выпрыг{0%{transform:scale(.3)}70%{transform:scale(1.18)}100%{transform:scale(1)}}
  /* ── таблички тренажёра (jun_trener.js) ── */
  ${К} .числа{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;padding-top:4px}
  ${К} .число{appearance:none;position:relative;min-width:76px;min-height:76px;padding:6px;font-family:inherit;cursor:pointer;
    border:3px solid #5b3416;border-radius:20px;
    background:repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 3px,rgba(0,0,0,.05) 3px 8px),linear-gradient(180deg,#dba566,#a8682f);
    box-shadow:0 7px 0 #5b3416,0 10px 14px rgba(30,15,5,.35),inset 0 2px 0 rgba(255,255,255,.4);transition:transform .1s ease,box-shadow .1s ease}
  ${К} .число .окно{display:flex;align-items:center;justify-content:center;min-width:58px;height:58px;padding:0 8px;border-radius:14px;position:relative;
    background:radial-gradient(120% 90% at 50% 15%,#fffdf3 0%,#fff1c9 60%,#f3d58e 100%);
    box-shadow:inset 0 -5px 0 rgba(170,110,30,.22),inset 0 3px 6px #fff,0 0 0 2px rgba(91,52,22,.35);
    font-size:34px;font-weight:900;line-height:1;color:#5a2a08;text-shadow:0 2px 0 #fff;white-space:nowrap}
  ${К} .число:active{transform:translateY(6px);box-shadow:0 1px 0 #5b3416,0 3px 6px rgba(30,15,5,.3),inset 0 2px 0 rgba(255,255,255,.4)}
  ${К} .число.верно{background:linear-gradient(180deg,#8fd46a,#3f8a2e);border-color:#2a5a1e;box-shadow:0 7px 0 #2a5a1e,0 0 0 5px rgba(140,220,110,.45),0 10px 14px rgba(30,15,5,.3)}
  ${К} .число.верно .окно{background:radial-gradient(120% 90% at 50% 15%,#f4fff0,#c7f0cc 65%,#86d49a);color:#1d6a34}
  ${К} .число.верно::after{content:'★';position:absolute;right:-10px;top:-12px;font-size:26px;color:#ffc93a;text-shadow:0 2px 0 #a3762a,0 0 6px #fff}
  ${К} .число.мимо{background:linear-gradient(180deg,#e89a86,#b4553e);border-color:#7a2a18;box-shadow:0 7px 0 #7a2a18,0 10px 14px rgba(30,15,5,.25);animation:дк-дрожь .4s ease-in-out;cursor:default}
  ${К} .число.мимо .окно{background:radial-gradient(120% 90% at 50% 15%,#fff3ef,#f7d3c8);color:#b23a22;opacity:.85}
  ${К} .число.мимо::after{content:'✗';position:absolute;right:-8px;top:-10px;width:24px;height:24px;border-radius:50%;background:#c2412b;color:#fff;font-size:15px;line-height:24px;text-align:center;box-shadow:0 2px 0 #7a2a18}
  ${К} .число:disabled:not(.верно):not(.мимо){opacity:.55}
  @keyframes дк-дрожь{0%,100%{transform:translateX(0)}20%{transform:translateX(-6px)}40%{transform:translateX(6px)}60%{transform:translateX(-4px)}80%{transform:translateX(3px)}}
  ${К} .разбор{margin:0;font-size:17px;font-weight:700;line-height:1.4;background:#fde3d9;border:2.5px solid var(--мимо);border-radius:14px;padding:10px 12px;color:#6a1e10}
  ${К} .готово{display:flex;gap:8px;align-items:center;margin:0;font-size:17px;font-weight:700;line-height:1.4;background:#c4ebcf;
    border:2.5px solid var(--верно);border-radius:16px;padding:10px 14px;color:#1d5a32}
  ${К} .готово span{font-size:24px;color:#f0b23a}
  ${К} .ряд-кн{display:flex;justify-content:center}
  ${К} .дальше-кн{appearance:none;min-height:56px;padding:0 22px;font-family:inherit;font-size:20px;font-weight:900;border:3px solid var(--контур);
    border-radius:16px;background:linear-gradient(180deg,#ffe58a,#f4b73c);color:#4a2a0c;cursor:pointer;box-shadow:0 5px 0 #8a4f14}
  ${К} .дальше-кн:active{transform:translateY(5px);box-shadow:none}
  ${К} .таблица{align-self:center;display:flex;flex-direction:column;border:3px solid #5b3416;border-radius:14px;overflow:hidden;box-shadow:0 5px 0 #5b3416;min-width:200px}
  ${К} .тр{display:grid;grid-template-columns:repeat(var(--кол,2),1fr);background:#fff6e4}
  ${К} .тр+.тр{border-top:2px solid #d9b98a}
  ${К} .тр span{text-align:center;font-size:22px;font-weight:900;padding:4px 10px;color:#5a2a08}
  ${К} .тр span+span{border-left:2px solid #d9b98a}
  ${К} .тр.шапка{background:linear-gradient(180deg,#e8bf86,#c98f52)}
  ${К} .тр.шапка span{font-size:16px;color:#4a2a08}
  ${К} .памятка{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  ${К} .памятка div{background:var(--лист);border:2.5px solid var(--контур);border-radius:14px;padding:8px 10px;display:flex;flex-direction:column;gap:2px;box-shadow:0 3px 0 rgba(74,42,16,.2)}
  ${К} .памятка b{font-size:20px;font-weight:900}
  ${К} .памятка span{font-size:14px;font-weight:700;color:#5a4028;line-height:1.3}
  ${К} .что-делать{margin:0;font-size:17px;font-weight:800;text-align:center;color:#f2ead6;background:rgba(42,29,16,.5);border-radius:12px;padding:8px 12px}
  ${К} .дт-лента{background:url('${ДОСКА}doska.webp') center/100% 100% no-repeat;border:none;box-shadow:none;padding:10px 28px 12px;font-weight:900}
  @media (max-width:370px){
    ${К} .реплика p{font-size:16px}
    ${К} .число{min-width:66px;min-height:66px;padding:5px}
    ${К} .число .окно{min-width:50px;height:50px;font-size:28px}
    ${К} .яч{min-width:46px;height:46px}
    ${К} .яч i{font-size:26px}
    ${К} .памятка{grid-template-columns:1fr}
  }
  @media (prefers-reduced-motion:reduce){${К} *{animation:none !important;transition:none !important}}
  `;
  function стиль(){
    if (document.getElementById('дк-стиль')) return;
    const s = document.createElement('style'); s.id = 'дк-стиль'; s.textContent = СТИЛЬ; document.head.appendChild(s);
  }
})();
