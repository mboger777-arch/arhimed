/* ============ РИСУНКИ ЛАБОРАТОРИИ · ОБЩАЯ БИБЛИОТЕКА ДЛЯ УРОКОВ ХИМИИ ============
   window.РЛ — функции, которые возвращают куски SVG в координатах кадра 336 × Н.
   Первый урок на ней — 110 «Растворы». Подключается ДО уроков, которые её используют.

   МАНЕРА «ФОТО». В отличие от сказочной библиотеки РМ (обводка #33291e, мультяшные
   герои), здесь рисуем как на снимке: без чёрной обводки, объём даёт только свет.
   • Свет — из окна слева-сверху: на стене косой луч, у предметов блик слева,
     вторичный блик справа, тень мягкая и уходит вправо-вниз.
   • Стекло прозрачное: у стакана видна задняя стенка, передняя даёт два блика и
     тёмные края (преломление), толстое дно, кольцо края. Под стаканом на столе —
     каустика: светлое пятно цвета жидкости.
   • Палочка в стакане ниже уровня жидкости сдвинута — преломление, как в жизни.
   • Столешница — тёмный эпоксидный камень с крапом; предметы на ней отражаются
     (РЛ.отражение). Стена — белый кафель с затиркой, мебель — белый ламинат
     и стальные ручки.
   • Надписи на этикетках — бумага, шрифт без засечек, как на настоящих банках.
   Движение только со смыслом и только при разрешённом движении. */
(function(){
  'use strict';
  if(window.РЛ) return;

  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  let счётчик = 0;
  const ид = (п) => 'рл-'+п+'-'+(++счётчик);
  const f = (v) => (+v).toFixed(1);
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  /* детерминированный «случай»: крап и кристаллы одинаковы при каждой перерисовке */
  const слч = (seed) => { let s=(seed>>>0)||7; return () => ((s=(Math.imul(s,1664525)+1013904223)>>>0)/4294967296); };
  const ШРИФТ = "'Helvetica Neue',Arial,sans-serif";

  /* ---------- определения ---------- */
  const defs = () => `<defs>
    <filter id="рл-мягко" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.4"/></filter>
    <filter id="рл-размыв" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="рл-чуть" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation=".7"/></filter>
    <filter id="рл-свечение" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
    <linearGradient id="рл-стена" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3f5f3"/><stop offset="1" stop-color="#d4dad7"/></linearGradient>
    <pattern id="рл-кафель" width="30" height="15" patternUnits="userSpaceOnUse">
      <rect width="30" height="15" fill="#f7f9f8"/><rect x=".8" y=".8" width="28.4" height="13.4" rx="1.2" fill="url(#рл-плитка)"/>
      <path d="M0 14.6 H30 M29.6 0 V15" stroke="#c6cdca" stroke-width=".9"/></pattern>
    <linearGradient id="рл-плитка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1f4f3"/><stop offset="1" stop-color="#e3e8e6"/></linearGradient>
    <linearGradient id="рл-столешница" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5158"/><stop offset=".35" stop-color="#2c3237"/><stop offset="1" stop-color="#1a1e22"/></linearGradient>
    <linearGradient id="рл-кромка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6168"/><stop offset=".25" stop-color="#23282c"/><stop offset="1" stop-color="#0f1215"/></linearGradient>
    <linearGradient id="рл-ламинат" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9ecea"/><stop offset="1" stop-color="#c9cfcc"/></linearGradient>
    <linearGradient id="рл-сталь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7d848b"/><stop offset=".22" stop-color="#e6eaee"/><stop offset=".4" stop-color="#a7aeb5"/><stop offset=".62" stop-color="#f5f7f9"/><stop offset="1" stop-color="#868d94"/></linearGradient>
    <radialGradient id="рл-чаша" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#cfd5db"/><stop offset="1" stop-color="#7e868e"/></radialGradient>
    <linearGradient id="рл-пластик" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbfbf9"/><stop offset=".6" stop-color="#e6e8e4"/><stop offset="1" stop-color="#c3c7c2"/></linearGradient>
    <linearGradient id="рл-жк" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d1a14"/><stop offset="1" stop-color="#18261e"/></linearGradient>
    <linearGradient id="рл-стекло" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".07" stop-color="#dcebf5" stop-opacity=".22"/>
      <stop offset=".5" stop-color="#dcebf5" stop-opacity=".05"/><stop offset=".9" stop-color="#dcebf5" stop-opacity=".2"/><stop offset="1" stop-color="#ffffff" stop-opacity=".48"/></linearGradient>
    <linearGradient id="рл-жидкость" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset=".18" stop-color="#000" stop-opacity="0"/><stop offset=".8" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>
    <linearGradient id="рл-глубина" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".18"/></linearGradient>
    <linearGradient id="рл-луч" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8e0" stop-opacity=".55"/><stop offset="1" stop-color="#fff8e0" stop-opacity="0"/></linearGradient>
    <radialGradient id="рл-окносвет" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#eaf5ff"/><stop offset="1" stop-color="#b8d8f0"/></radialGradient>
    <linearGradient id="рл-этикетка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fdfbf4"/><stop offset="1" stop-color="#e8e3d4"/></linearGradient>
    <linearGradient id="рл-янтарь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a1a06"/><stop offset=".25" stop-color="#8a4a14"/><stop offset=".5" stop-color="#6a3208"/><stop offset="1" stop-color="#2a1004"/></linearGradient>
    <linearGradient id="рл-крышка" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#101214"/><stop offset=".3" stop-color="#4a5056"/><stop offset=".55" stop-color="#1c2024"/><stop offset="1" stop-color="#08090a"/></linearGradient>
    <linearGradient id="рл-стык" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>
    <radialGradient id="рл-виньетка" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></radialGradient>
    <radialGradient id="рл-яйцо" cx=".38" cy=".3" r=".8"><stop offset="0" stop-color="#fffaf2"/><stop offset=".6" stop-color="#f0dcc0"/><stop offset="1" stop-color="#c8a882"/></radialGradient>
    <filter id="рл-тень" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="1" dy="2" stdDeviation="1.6" flood-color="#000" flood-opacity=".3"/></filter>
    <linearGradient id="рл-студия" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c4046"/><stop offset=".7" stop-color="#2a2d32"/><stop offset="1" stop-color="#1e2024"/></linearGradient>
    <radialGradient id="рл-прожектор" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff" stop-opacity=".09"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/></radialGradient>
    <linearGradient id="рл-студстол" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2f3237"/><stop offset=".2" stop-color="#26292d"/><stop offset="1" stop-color="#16181b"/></linearGradient>
    <radialGradient id="рл-огонь" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd890"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient>
    <radialGradient id="рл-линза" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></radialGradient>
    <radialGradient id="рл-вспышка" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#f4f8ff" stop-opacity=".9"/><stop offset="1" stop-color="#bcd8ff" stop-opacity="0"/></radialGradient>
    <linearGradient id="рл-доска" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8a868"/><stop offset=".5" stop-color="#b88444"/><stop offset="1" stop-color="#8a5a2a"/></linearGradient>
    <linearGradient id="рл-доскатём" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a4a22"/><stop offset=".5" stop-color="#a87038"/><stop offset="1" stop-color="#6a3e1a"/></linearGradient>
    <linearGradient id="рл-перчатка" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8ab8f0"/><stop offset=".5" stop-color="#4a86d8"/><stop offset="1" stop-color="#2a5aa8"/></linearGradient>
  </defs>`;

  /* ---------- цвет раствора: вид 'вода' | 'сахар' | 'соль' | 'купорос'; доля 0..1 ---------- */
  function цвет(вид,доля){
    const д=Math.max(0,Math.min(1,доля||0));
    if(вид==='масло') return 'hsla(45,90%,55%,.75)';
    if(вид==='купорос'){ const a=Math.min(.9,.18+д*3.2), l=Math.round(72-д*140); return `hsla(203,85%,${Math.max(30,l)}%,${a.toFixed(2)})`; }
    if(вид==='чай') return `hsla(28,75%,${Math.round(50-д*60)}%,${Math.min(.9,.35+д*2).toFixed(2)})`;
    return вид==='сахар'||вид==='соль' ? `hsla(${200-д*120},${50+д*40}%,${80-д*20}%,${(.4+д*1.2).toFixed(2)})` : 'hsla(198,60%,74%,.42)';
  }

  /* ---------- кристаллы: горка гранёных зёрен (x — центр, y — низ) ---------- */
  function кристаллы(x,y,ш,в,вид,n,seed){
    const r=слч(seed||11), ц = вид==='купорос'?['#1f6fc8','#4a9ae8','#9fd0ff']: вид==='песок'?['#b8925a','#d8b47a','#8a6a3a']: вид==='сахар'?['#ffffff','#f1f4f7','#d9e0e8']
      : вид==='селитра'?['#ffffff','#e8f0f6','#c8d4de']: вид==='мел'?['#f4f2ec','#e0ddd4','#cfcac0']: вид==='уголь'?['#1a1b1d','#2e3033','#0c0d0e']: вид==='железо'?['#5a5f66','#8a9098','#3a3e44']: вид==='медь'?['#b8622a','#e0884a','#8a4418']: вид==='сера'?['#f2d22a','#ffe86a','#d0a810']:['#ffffff','#eef2f5','#cfd8e0'];
    let s='';
    for(let i=0;i<n;i++){
      const t=r(), u=r(), dx=(t-0.5)*ш*(1-u*0.6), dy=-u*в*(1-Math.abs(t-0.5)*1.4), k=вид==='песок'||вид==='сера'?1.1+r()*0.8:вид==='уголь'?1.8+r()*2:1.1+r()*1.3, a=r()*180;
      const cx=x+dx, cy=y+dy-k*0.5;
      if(вид==='селитра'){ s+=`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><rect x="${f(-k*1.8)}" y="-.6" width="${f(k*3.6)}" height="1.3" fill="${ц[i%3]}"/><rect x="${f(-k*1.8)}" y="-.6" width="${f(k*1.8)}" height=".5" fill="#fff"/></g>`; continue; }
      if(вид==='медь'){ s+=`<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(k*0.9)}" fill="${ц[i%3]}"/><circle cx="${f(cx-k*0.3)}" cy="${f(cy-k*0.3)}" r="${f(k*0.3)}" fill="#ffd0a0" opacity=".85"/>`; continue; }
      if(вид==='железо'){ s+=`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><rect x="${f(-k)}" y="-.5" width="${f(k*2)}" height="1" fill="${ц[i%3]}"/><rect x="${f(-k)}" y="-.5" width="${f(k)}" height=".4" fill="#d8dde2" opacity=".8"/></g>`; continue; }
      if(вид==='уголь'){ s+=`<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><path d="M${f(-k)} ${f(k*0.2)} L${f(-k*0.3)} ${f(-k*0.8)} L${f(k*0.9)} ${f(-k*0.3)} L${f(k*0.6)} ${f(k*0.7)} Z" fill="${ц[i%3]}"/><path d="M${f(-k*0.3)} ${f(-k*0.8)} L${f(k*0.9)} ${f(-k*0.3)} L${f(k*0.1)} 0 Z" fill="#6a7078" opacity=".7"/></g>`; continue; }
      s+= вид==='песок'||вид==='сера'
        ? `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(k*0.7)}" fill="${ц[i%3]}"/>`
        : `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(a)})"><path d="M${f(-k)} 0 L0 ${f(-k*0.8)} L${f(k)} 0 L0 ${f(k*0.8)} Z" fill="${ц[i%3]}"/><path d="M${f(-k)} 0 L0 ${f(-k*0.8)} L0 0 Z" fill="#fff" opacity=".55"/></g>`;
    }
    return s;
  }

  /* ---------- комната: кафельная стена, окно со светом, полка, лабораторный стол ----------
     y0 — задний край столешницы; опц.окно, опц.полка (по умолчанию есть), опц.вечер */
  function комната(Н,y0,опц){
    const о=опц||{}, r=слч(3);
    const крап=Array.from({length:70},()=>`<circle cx="${f(r()*336)}" cy="${f(y0+2+r()*20)}" r="${f(0.3+r()*0.7)}" fill="${r()>0.5?'#8a939b':'#0c0e10'}" opacity="${f(0.3+r()*0.4)}"/>`).join('');
    const окно = о.окно===false?'' : `
      <rect x="14" y="16" width="86" height="${f(y0-60)}" rx="2" fill="url(#рл-окносвет)"/>
      <path d="M14 ${f(y0-80)} Q40 ${f(y0-96)} 70 ${f(y0-86)} Q90 ${f(y0-80)} 100 ${f(y0-88)} V${f(y0-44)} H14 Z" fill="#a8c8a0" opacity=".55"/>
      <rect x="14" y="16" width="86" height="${f(y0-60)}" fill="none" stroke="#e9ecea" stroke-width="5"/>
      <path d="M57 16 V${f(y0-44)} M14 ${f((y0-28)/2)} H100" stroke="#e9ecea" stroke-width="3.4"/>
      <rect x="10" y="${f(y0-46)}" width="94" height="6" fill="#f4f6f5"/><rect x="10" y="${f(y0-40)}" width="94" height="2" fill="#b8bfbb"/>
      <path d="M100 16 L220 ${f(y0)} L130 ${f(y0)} L100 ${f(y0-44)} Z" fill="url(#рл-луч)" opacity=".7"/>`;
    const полка = о.полка===false?'' : `
      <rect x="150" y="${f(y0-104)}" width="176" height="5" fill="#dfe3e1"/><rect x="150" y="${f(y0-99)}" width="176" height="2" fill="#a8b0ac"/>
      <path d="M160 ${f(y0-99)} v10 l6 -10 M316 ${f(y0-99)} v10 l-6 -10" stroke="#9aa2a6" stroke-width="1.6" fill="none"/>
      ${банка(176,y0-104,22,34,{стекло:'янтарь',надпись:['HCl'],мал:true})}${банка(206,y0-104,20,28,{содержимое:'купорос',уровень:.6,надпись:['CuSO₄'],мал:true})}
      ${банка(234,y0-104,22,36,{стекло:'янтарь',надпись:['KMnO₄'],мал:true})}${банка(262,y0-104,20,30,{содержимое:'соль',уровень:.7,надпись:['NaCl'],мал:true})}
      ${банка(290,y0-104,22,34,{стекло:'янтарь',надпись:['H₂SO₄'],мал:true})}
      ${колба(314,y0-104,0.34,{цвет:цвет('купорос',.08),уровень:.4})}`;
    return `<rect width="336" height="${f(y0)}" fill="url(#рл-кафель)"/><rect width="336" height="${f(y0)}" fill="url(#рл-стена)" opacity=".35"/>
      <g filter="url(#рл-чуть)">${окно}${полка}</g>
      ${о.полка===false?'':`<rect x="150" y="${f(y0-97)}" width="176" height="10" fill="#000" opacity=".12" filter="url(#рл-мягко)"/>`}
      <rect x="0" y="${f(y0-10)}" width="336" height="10" fill="url(#рл-стык)"/>
      <rect x="0" y="${f(y0-4)}" width="336" height="5" fill="#b9c0bc" opacity=".6"/>
      <rect x="0" y="${f(y0)}" width="336" height="24" fill="url(#рл-столешница)"/>${крап}
      <rect x="0" y="${f(y0)}" width="336" height="1.2" fill="#8a939b" opacity=".6"/>
      <rect x="0" y="${f(y0+24)}" width="336" height="7" fill="url(#рл-кромка)"/>
      <rect x="0" y="${f(y0+31)}" width="336" height="${f(Н-y0-31)}" fill="url(#рл-ламинат)"/>
      ${[0,1,2].map(k=>`<rect x="${f(6+k*110)}" y="${f(y0+36)}" width="102" height="${f(Н-y0-40)}" rx="2" fill="none" stroke="#b6bdb9" stroke-width="1"/>
        <rect x="${f(37+k*110)}" y="${f(y0+44)}" width="40" height="4" rx="2" fill="url(#рл-сталь)"/><rect x="${f(37+k*110)}" y="${f(y0+48)}" width="40" height="1.4" fill="#000" opacity=".15"/>`).join('')}
      <rect x="0" y="${f(y0+31)}" width="336" height="8" fill="#000" opacity=".12" filter="url(#рл-мягко)"/>
      ${о.вечер?`<rect width="336" height="${f(Н)}" fill="#ffb060" opacity=".08"/>`:''}`;
  }
  /* виньетка «объектива»: края кадра чуть темнее — кладётся последним слоем */
  const виньетка = (Н) => `<rect width="336" height="${f(Н)}" fill="url(#рл-виньетка)" pointer-events="none"/>`;

  /* ---------- отражение предмета в столешнице: кусок SVG зеркалится вниз от линии y ---------- */
  function отражение(svg,y,глубина){
    const кл=ид('отр'), г=глубина||22;
    return `<clipPath id="${кл}"><rect x="0" y="${f(y)}" width="336" height="${f(г)}"/></clipPath>
      <g clip-path="url(#${кл})" opacity=".16"><g transform="translate(0 ${f(2*y)}) scale(1 -1)">${svg}</g></g>`;
  }
  /* мягкая тень предмета на столе */
  const тень = (x,y,ш,сила) => `<ellipse cx="${f(x+ш*0.12)}" cy="${f(y+1)}" rx="${f(ш*0.62)}" ry="${f(Math.max(2.4,ш*0.07))}" fill="#000" opacity="${сила||.45}" filter="url(#рл-мягко)"/>`;

  /* ---------- химический стакан: (x,y) — середина дна; ш×в; опц:
     уровень 0..1, цвет жидкости, крупинки (нерастворённые на дне, число), вид кристаллов,
     муть (взвесь песка), осадок (слой песка на дне, высота), палочка, мешать, деления,
     надпись (на стекле), объём (мл для делений, по умолч. 250) ---------- */
  function стакан(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('стак'), л=x-ш/2, п=x+ш/2, вр=y-в, ст=2.2, дно=4.5;
    const ур=Math.max(0,Math.min(1,о.уровень==null?0:о.уровень)), жв=(в-дно-8)*ур, жверх=y-дно-жв;
    const ц=о.цвет||цвет('вода');
    const жидкость = ур>0 ? `<clipPath id="${кл}"><rect x="${f(л+ст)}" y="${f(жверх)}" width="${f(ш-2*ст)}" height="${f(жв+дно-1)}" rx="2"/></clipPath>
      <g clip-path="url(#${кл})">
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="${ц}"/>
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="url(#рл-жидкость)"/>
        <rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(жв+дно)}" fill="url(#рл-глубина)"/>
        ${о.муть?(()=>{ const r=слч(21); return Array.from({length:о.муть},(_,i)=>{ const cx=л+4+r()*(ш-8), cy=жверх+4+r()*(жв-6), d=(жв*0.6+r()*жв*0.4);
          return `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(0.7+r()*0.9)}" fill="${(о.мутьЦвет||['#b8925a','#d8b47a','#9a7a4a'])[i%3]}" opacity=".85">${ДВИЖ?`<animate attributeName="cy" values="${f(cy)};${f(Math.min(y-дно-2,cy+d))}" dur="${f(3+r()*3)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join(''); })():''}
        ${о.осадок?`<path d="M${f(л)} ${f(y-дно)} V${f(y-дно-о.осадок)} ${Array.from({length:8},(_,k)=>`Q${f(л+ш*(k+0.5)/8)} ${f(y-дно-о.осадок-(k%2?2:-1))} ${f(л+ш*(k+1)/8)} ${f(y-дно-о.осадок)}`).join(' ')} V${f(y-дно)} Z" fill="${(о.мутьЦвет||['#b8925a'])[0]}"/>${кристаллы(x,y-дно,ш-6,о.осадок,о.осадокВид||'песок',40,5)}`:''}
        ${о.слой?`<rect x="${f(л)}" y="${f(жверх)}" width="${f(ш)}" height="${f(о.слой)}" fill="${о.слойЦвет||'hsla(45,90%,55%,.75)'}"/><path d="M${f(л)} ${f(жверх+о.слой)} H${f(л+ш)}" stroke="#ffe08a" stroke-width="1" opacity=".8"/>`:''}
        ${о.крупинки?`<g>${ДВИЖ&&о.таять?`<animate attributeName="opacity" values="1;.6;0" dur="2.6s" fill="freeze"/>`:''}${кристаллы(x,y-дно,ш*0.6,6,о.вид||'соль',о.крупинки,9)}</g>`:''}
        ${ДВИЖ&&о.мешать?`<path d="M${f(л+6)} ${f(жверх+жв*0.5)} q${f(ш*0.4)} -6 ${f(ш-12)} 0" stroke="#fff" stroke-width=".8" fill="none" opacity=".35"><animateTransform attributeName="transform" type="translate" values="0 0;0 ${f(жв*0.3)};0 0" dur="1.2s" repeatCount="indefinite"/></path>`:''}
      </g>
      <ellipse cx="${f(x)}" cy="${f(жверх)}" rx="${f(ш/2-ст)}" ry="3" fill="${ц}"/><ellipse cx="${f(x)}" cy="${f(жверх)}" rx="${f(ш/2-ст)}" ry="3" fill="#fff" opacity=".35"/>
      <path d="M${f(л+ст)} ${f(жверх)} A${f(ш/2-ст)} 3 0 0 0 ${f(п-ст)} ${f(жверх)}" stroke="#5a8aa8" stroke-width=".9" fill="none" opacity=".55"/>
      <path d="M${f(л+ст+2)} ${f(жверх-0.6)} A${f(ш/2-ст-2)} 2.4 0 0 1 ${f(п-ст-2)} ${f(жверх-0.6)}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
      <path d="M${f(л+ст)} ${f(жверх)} q0 -2 2 -3 M${f(п-ст)} ${f(жверх)} q0 -2 -2 -3" stroke="#fff" stroke-width=".9" opacity=".6" fill="none"/>` : '';
    const палочка = о.палочка ? (()=>{ const x1=x+ш*0.28, y1=вр-18, x2=x-ш*0.18, y2=y-дно-3;
        const t=ур>0?Math.max(0,Math.min(1,(жверх-y1)/(y2-y1))):1, xm=x1+(x2-x1)*t, ym=y1+(y2-y1)*t;
        const г=`<path d="M${f(x1)} ${f(y1)} L${f(xm)} ${f(ym)}" stroke="#e8f4fa" stroke-width="3.2" stroke-linecap="round" opacity=".85"/><path d="M${f(x1-0.6)} ${f(y1)} L${f(xm-0.6)} ${f(ym)}" stroke="#fff" stroke-width="1" opacity=".9"/>
          ${ур>0?`<path d="M${f(xm+3)} ${f(ym)} L${f(x2+3)} ${f(y2)}" stroke="#e8f4fa" stroke-width="3.2" stroke-linecap="round" opacity=".6"/>`:''}`;
        return ДВИЖ&&о.мешать ? `<g>${г}<animateTransform attributeName="transform" type="rotate" values="-7 ${f(x1)} ${f(y1)};7 ${f(x1)} ${f(y1)};-7 ${f(x1)} ${f(y1)}" dur="1.1s" repeatCount="indefinite"/></g>` : г; })() : '';
    const деления = о.деления===false ? '' : (()=>{ const V=о.объём||250, шаг=V>=200?50:V>=100?25:10; let s='';
        for(let v=шаг; v<V; v+=шаг){ const yy=y-дно-(в-дно-8)*v/V; s+=`<path d="M${f(п-ш*0.3)} ${f(yy)} H${f(п-4)}" stroke="#fff" stroke-width=".9" opacity=".8"/><text x="${f(п-ш*0.32)}" y="${f(yy+2.2)}" text-anchor="end" font-size="${f(Math.max(5,ш*0.075))}" fill="#fff" opacity=".85" font-family="${ШРИФТ}">${v}</text>`; }
        return s; })();
    const каустика = `<ellipse cx="${f(x+ш*0.2)}" cy="${f(y+2)}" rx="${f(ш*0.5)}" ry="${f(ш*0.07+1)}" fill="${ур>0?ц:'#e8f4ff'}" opacity=".55" filter="url(#рл-мягко)"/>`;
    return `<g>
      ${тень(x,y,ш,.4)}${каустика}
      <path d="M${f(л)} ${f(вр)} V${f(y-3)} Q${f(л)} ${f(y)} ${f(л+3)} ${f(y)} H${f(п-3)} Q${f(п)} ${f(y)} ${f(п)} ${f(y-3)} V${f(вр)}" fill="#dcebf5" fill-opacity=".06"/>
      <ellipse cx="${f(x)}" cy="${f(вр)}" rx="${f(ш/2)}" ry="3.4" fill="none" stroke="#9fb8c8" stroke-width=".8" opacity=".6"/>
      ${жидкость}${палочка}
      <rect x="${f(л+1)}" y="${f(y-дно)}" width="${f(ш-2)}" height="${f(дно)}" rx="2" fill="#dcebf5" opacity=".35"/>
      <path d="M${f(л)} ${f(вр)} V${f(y-3)} Q${f(л)} ${f(y)} ${f(л+3)} ${f(y)} H${f(п-3)} Q${f(п)} ${f(y)} ${f(п)} ${f(y-3)} V${f(вр)}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width=".9"/>
      <rect x="${f(л+3)}" y="${f(вр+6)}" width="${f(Math.max(2,ш*0.05))}" height="${f(в-14)}" rx="1.5" fill="#fff" opacity=".7"/>
      <rect x="${f(л+3+ш*0.09)}" y="${f(вр+10)}" width="1.2" height="${f(в*0.55)}" fill="#fff" opacity=".35"/>
      <rect x="${f(п-6)}" y="${f(вр+8)}" width="2" height="${f(в-18)}" rx="1" fill="#fff" opacity=".32"/>
      <path d="M${f(л-1.5)} ${f(вр+1)} Q${f(л-4)} ${f(вр-2)} ${f(л-5)} ${f(вр-3)}" stroke="#cfe2ee" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/>
      <ellipse cx="${f(x)}" cy="${f(вр)}" rx="${f(ш/2)}" ry="3.4" fill="none" stroke="#fff" stroke-width="1.4" opacity=".75"/>
      ${деления}
      ${о.надпись?`<text x="${f(x-ш*0.12)}" y="${f(y-в*0.25)}" text-anchor="middle" font-size="${f(Math.max(5.5,ш*0.08))}" fill="#fff" opacity=".85" font-family="${ШРИФТ}">${esc(о.надпись)}</text>`:''}
    </g>`;
  }

  /* ---------- коническая колба (Эрленмейера): (x,y) — середина дна, м — масштаб (1 ≈ 60×90) ---------- */
  function колба(x,y,м,опц){
    const о=опц||{}, кл=ид('колб'), ур=Math.max(0,Math.min(1,о.уровень||0)), ц=о.цвет||цвет('вода');
    const форма='M-10 -90 V-58 L-30 -6 Q-32 0 -26 0 H26 Q32 0 30 -6 L10 -58 V-90';
    const yж=-6-(52*ур);
    const шир=(yy)=>10+20*Math.min(1,(-yy-6)/52<0?0:1-(-yy-6)/52);
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м})">
      <ellipse cx="4" cy="1" rx="34" ry="3.6" fill="#000" opacity=".4" filter="url(#рл-мягко)"/>
      ${ур>0?`<ellipse cx="6" cy="2" rx="30" ry="4" fill="${ц}" opacity=".6" filter="url(#рл-мягко)"/>
        <clipPath id="${кл}"><path d="${форма} Z"/></clipPath>
        <g clip-path="url(#${кл})"><rect x="-34" y="${f(yж)}" width="68" height="${f(-yж+2)}" fill="${ц}"/><rect x="-34" y="${f(yж)}" width="68" height="${f(-yж+2)}" fill="url(#рл-жидкость)"/></g>
        <ellipse cx="0" cy="${f(yж)}" rx="${f(шир(yж)-1.5)}" ry="2.4" fill="#fff" opacity=".3"/>`:''}
      ${о.осадок?`<g clip-path="url(#${кл})"><path d="M-30 -4 Q-15 ${f(-6-о.осадок.h)} 0 ${f(-5-о.осадок.h)} Q15 ${f(-6-о.осадок.h)} 30 -4 V2 H-30 Z" fill="${о.осадок.цвет}"/>
        ${Array.from({length:26},(_,k)=>{ const px=-24+((k*37)%48), py=-8-((k*23)%Math.max(8,52*ур-8)); return `<circle cx="${px}" cy="${py}" r="${f(1+(k%3)*0.5)}" fill="${о.осадок.цвет}" opacity=".85">${ДВИЖ&&о.осадок.падает?`<animate attributeName="cy" values="${py};-6" dur="${f(2+(k%5)*0.6)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('')}</g>`:''}
      ${о.пузырьки&&ур>0?`<g clip-path="url(#${кл})">${Array.from({length:14},(_,k)=>{ const px=-20+((k*29)%40), r0=1+(k%3)*0.6; return `<circle cx="${px}" cy="-6" r="${f(r0)}" fill="none" stroke="#fff" stroke-width=".7" opacity=".85">${ДВИЖ?`<animate attributeName="cy" values="-6;${f(yж+2)}" dur="${f(0.9+(k%4)*0.35)}s" begin="${f((k%7)*0.15)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('')}</g>
        <ellipse cx="0" cy="${f(yж-1)}" rx="${f(шир(yж)-3)}" ry="2" fill="#fff" opacity=".45"/>`:''}
      ${о.пробирка?`<g transform="rotate(${о.пробирка.наклон||14} 0 -6)"><rect x="-4" y="-64" width="8" height="58" rx="4" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".6"/><rect x="-3" y="-32" width="6" height="25" rx="3" fill="${о.пробирка.цвет||цвет('вода')}"/><path d="M-2 -60 V-12" stroke="#fff" stroke-width=".8" opacity=".6"/></g>`:''}
      <path d="${форма}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width="1"/>
      <path d="M-8 -86 V-58 L-26 -10" stroke="#fff" stroke-width="2.4" fill="none" opacity=".65" stroke-linecap="round"/>
      <path d="M7 -80 V-60 L22 -22" stroke="#fff" stroke-width="1.2" fill="none" opacity=".35"/>
      <ellipse cx="0" cy="-90" rx="11" ry="2.6" fill="none" stroke="#fff" stroke-width="1.6" opacity=".8"/>
      ${о.пробка?`<path d="M-9 -100 H9 L7.5 -86 H-7.5 Z" fill="#8a3a2a"/><path d="M-9 -100 H9" stroke="#c8705a" stroke-width="1.4"/><path d="M-6 -98 V-88" stroke="#fff" stroke-width="1" opacity=".25"/>`:''}
      ${о.шарик!=null?(()=>{ const k=Math.max(0,Math.min(1,о.шарик)), rx=6+16*k, ry=8+20*k, cy=-96-ry*0.9; const кш=ид('шар');
        return `<radialGradient id="${кш}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ff9a8a"/><stop offset=".5" stop-color="#e0402a"/><stop offset="1" stop-color="#8a1a10"/></radialGradient>
          <path d="M-11 -92 Q-12 -100 -${f(rx*0.4)} ${f(cy+ry*0.8)} Q0 ${f(cy+ry+2)} ${f(rx*0.4)} ${f(cy+ry*0.8)} Q12 -100 11 -92 Z" fill="url(#${кш})" opacity=".92"/>
          <ellipse cx="0" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}" fill="url(#${кш})" opacity=".92">${ДВИЖ&&о.дуется?`<animate attributeName="rx" values="${f(rx*0.9)};${f(rx)}" dur="1.2s" repeatCount="indefinite"/>`:''}</ellipse>
          <ellipse cx="${f(-rx*0.35)}" cy="${f(cy-ry*0.4)}" rx="${f(rx*0.22)}" ry="${f(ry*0.28)}" fill="#fff" opacity=".45"/>
          <rect x="-12" y="-95" width="24" height="5" rx="2" fill="#a82a1a"/>`; })():''}
    </g>`;
  }

  /* ---------- мерный цилиндр: (x,y) — середина подставки; ш×в; опц.уровень (мл), опц.объём, опц.цвет ---------- */
  function цилиндр(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('цил'), V=о.объём||100, мл=Math.max(0,Math.min(V,о.мл||0)), л=x-ш/2, п=x+ш/2, низ=y-6, верх=y-в;
    const h=(в-16)*мл/V, yж=низ-h, ц=о.цвет||цвет('вода');
    let дел=''; for(let v=10; v<V; v+=10){ const yy=низ-(в-16)*v/V; дел+=`<path d="M${f(x-ш*0.1)} ${f(yy)} H${f(п-2)}" stroke="#fff" stroke-width="${v%50?0.6:1}" opacity=".85"/>${v%20===0?`<text x="${f(x-ш*0.14)}" y="${f(yy+2)}" text-anchor="end" font-size="5.4" fill="#fff" font-family="${ШРИФТ}">${v}</text>`:''}`; }
    return `<g>
      ${тень(x,y,ш*1.8,.4)}
      <path d="M${f(x-ш*0.95)} ${f(y)} L${f(x-ш*0.7)} ${f(y-6)} H${f(x+ш*0.7)} L${f(x+ш*0.95)} ${f(y)} Z" fill="#dcebf5" fill-opacity=".35" stroke="#8fa8b8" stroke-opacity=".5" stroke-width=".8"/>
      ${мл>0?`<clipPath id="${кл}"><rect x="${f(л+1.6)}" y="${f(yж)}" width="${f(ш-3.2)}" height="${f(h)}"/></clipPath><g clip-path="url(#${кл})"><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(h)}" fill="${ц}"/><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(h)}" fill="url(#рл-жидкость)"/></g>
        <path d="M${f(л+1.6)} ${f(yж-2)} Q${f(x)} ${f(yж+2.4)} ${f(п-1.6)} ${f(yж-2)}" stroke="#fff" stroke-width="1" fill="none" opacity=".75"/>`:''}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(в-6)}" rx="1.5" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".55" stroke-width=".8"/>
      <rect x="${f(л+2)}" y="${f(верх+4)}" width="2" height="${f(в-14)}" fill="#fff" opacity=".7"/>
      ${дел}
      <path d="M${f(л-2)} ${f(верх)} H${f(п+1)} M${f(л-2)} ${f(верх)} l-3 -3" stroke="#e0eef6" stroke-width="1.6" fill="none"/>
    </g>`;
  }

  /* ---------- электронные весы: (x,y) — середина низа; ш — ширина; опц.показ — строка на табло
     (по умолч. '0.0'), опц.ед ('г'). Верх чаши — весыВерх(y,ш) ---------- */
  const весыВерх = (y,ш) => y-ш*0.3-4;
  function весы(x,y,ш,опц){
    const о=опц||{}, в=ш*0.26, л=x-ш/2, верх=y-в, чаша=весыВерх(y,ш)+4, r=ш*0.36;
    const показ=о.показ==null?'0.0':String(о.показ);
    return `<g>
      ${тень(x,y,ш,.5)}
      <path d="M${f(л+4)} ${f(y)} L${f(л+10)} ${f(верх)} H${f(л+ш-10)} L${f(л+ш-4)} ${f(y)} Z" fill="url(#рл-пластик)"/>
      <path d="M${f(л+10)} ${f(верх)} H${f(л+ш-10)}" stroke="#fff" stroke-width="1.4"/>
      <path d="M${f(л+4)} ${f(y)} H${f(л+ш-4)}" stroke="#9aa09c" stroke-width="1.4"/>
      <rect x="${f(x-ш*0.3)}" y="${f(верх+в*0.2)}" width="${f(ш*0.42)}" height="${f(в*0.56)}" rx="2" fill="url(#рл-жк)"/>
      <text x="${f(x-ш*0.3+ш*0.4)}" y="${f(верх+в*0.2+в*0.46)}" text-anchor="end" font-size="${f(в*0.44)}" font-weight="bold" fill="#7dffb0" font-family="'Courier New',monospace" filter="url(#рл-свечение)">${esc(показ)}</text>
      <text x="${f(x+ш*0.16)}" y="${f(верх+в*0.2+в*0.46)}" font-size="${f(в*0.3)}" fill="#6ad89a" font-family="${ШРИФТ}">${esc(о.ед||'г')}</text>
      ${[0,1].map(k=>`<ellipse cx="${f(x+ш*0.24+k*ш*0.12)}" cy="${f(верх+в*0.5)}" rx="${f(ш*0.04)}" ry="${f(в*0.16)}" fill="${k?'#3a8a5a':'#c8c8c4'}"/><text x="${f(x+ш*0.24+k*ш*0.12)}" y="${f(верх+в*0.9)}" text-anchor="middle" font-size="${f(в*0.16)}" fill="#6a706c" font-family="${ШРИФТ}">${k?'ON':'TARE'}</text>`).join('')}
      <rect x="${f(x-4)}" y="${f(чаша)}" width="8" height="${f(верх-чаша)}" fill="url(#рл-сталь)"/>
      <ellipse cx="${f(x)}" cy="${f(чаша+2)}" rx="${f(r)}" ry="${f(r*0.14+1)}" fill="#6a7178"/>
      <ellipse cx="${f(x)}" cy="${f(чаша)}" rx="${f(r)}" ry="${f(r*0.14+1)}" fill="url(#рл-чаша)"/>
      <ellipse cx="${f(x-r*0.3)}" cy="${f(чаша-0.6)}" rx="${f(r*0.4)}" ry="${f(r*0.05+0.4)}" fill="#fff" opacity=".7"/>
    </g>`;
  }

  /* ---------- банка с реактивом: (x,y) — середина дна; опц.стекло 'прозрачное'|'янтарь',
     опц.содержимое 'соль'|'сахар'|'купорос'|'песок', опц.уровень, опц.надпись — строки этикетки,
     опц.мал — мелкая (на полке) ---------- */
  function банка(x,y,ш,в,опц){
    const о=опц||{}, л=x-ш/2, крв=Math.max(5,в*0.18), тело=в-крв, верх=y-тело, ур=о.уровень==null?0.7:о.уровень;
    const янт=о.стекло==='янтарь';
    const кб=ид('бнк');
    const внутри = !янт&&о.содержимое ? (()=>{ const hh=(тело-4)*ур;
        return `<clipPath id="${кб}"><rect x="${f(л+1.5)}" y="${f(y-2-hh)}" width="${f(ш-3)}" height="${f(hh)}" rx="1.5"/></clipPath>
          <rect x="${f(л+1.5)}" y="${f(y-2-hh)}" width="${f(ш-3)}" height="${f(hh)}" rx="1.5" fill="${о.содержимое==='купорос'?'#2a78d0':о.содержимое==='песок'?'#c8a268':'#e6ebf0'}"/>
          <g clip-path="url(#${кб})">${кристаллы(x,y-2,ш-2,hh+4,о.содержимое,Math.round(ш*hh/(о.мал?12:7)),x|0)}</g>`; })() : '';
    const строк=[].concat(о.надпись||[]), кег=о.мал?5.4:Math.max(6.5,ш*0.14);
    return `<g>
      ${о.мал?'':тень(x,y,ш,.45)}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(тело)}" rx="${f(ш*0.12)}" fill="${янт?'url(#рл-янтарь)':'#dcebf5'}" fill-opacity="${янт?1:.14}"/>
      ${внутри}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(тело)}" rx="${f(ш*0.12)}" fill="url(#рл-стекло)" stroke="#6a7a86" stroke-opacity=".45" stroke-width=".7"/>
      <rect x="${f(л+ш*0.14)}" y="${f(верх-крв*0.3)}" width="${f(ш*0.72)}" height="${f(крв*0.4)}" fill="${янт?'#4a2208':'#dcebf5'}" opacity=".8"/>
      <rect x="${f(л+ш*0.08)}" y="${f(верх-крв)}" width="${f(ш*0.84)}" height="${f(крв*0.8)}" rx="1.5" fill="url(#рл-крышка)"/>
      ${Array.from({length:Math.round(ш/3)},(_,k)=>`<path d="M${f(л+ш*0.1+k*ш*0.8/Math.round(ш/3))} ${f(верх-крв)} v${f(крв*0.8)}" stroke="#000" stroke-width=".5" opacity=".5"/>`).join('')}
      <rect x="${f(л+2)}" y="${f(верх+3)}" width="${f(Math.max(1.4,ш*0.08))}" height="${f(тело-8)}" rx="1" fill="#fff" opacity="${янт?.4:.7}"/>
      ${строк.length?`<rect x="${f(л+ш*0.14)}" y="${f(верх+тело*0.3)}" width="${f(ш*0.72)}" height="${f(тело*0.42)}" rx="1" fill="url(#рл-этикетка)"/>
        <rect x="${f(л+ш*0.14)}" y="${f(верх+тело*0.3)}" width="${f(ш*0.72)}" height="${f(Math.max(1.4,тело*0.05))}" fill="${о.полоса||'#c8402a'}"/>
        ${строк.map((s0,i)=>{ const кк=i?кег*0.8:кег, нужно=String(s0).length*кк*0.56, влез=ш*0.66; return `<text x="${f(x+ш*0.02)}" ${нужно>влез?`textLength="${f(влез)}" lengthAdjust="spacingAndGlyphs"`:''} y="${f(верх+тело*0.3+тело*0.42*(i+1)/(строк.length+1)+кег*0.4+ (строк.length>1?1:0))}" text-anchor="middle" font-size="${f(i?кег*0.8:кег)}" font-weight="${i?'normal':'bold'}" fill="#1a1a1a" font-family="${ШРИФТ}">${esc(s0)}</text>`; }).join('')}`:''}
    </g>`;
  }

  /* ---------- лодочка для взвешивания: белая пластиковая чашечка (x — центр, y — низ), горка кристаллов ---------- */
  function лодочка(x,y,ш,опц){
    const о=опц||{}, в=ш*0.26;
    return `<g>
      <path d="M${f(x-ш/2)} ${f(y-в)} L${f(x-ш*0.38)} ${f(y)} H${f(x+ш*0.38)} L${f(x+ш/2)} ${f(y-в)} Z" fill="url(#рл-пластик)"/>
      <ellipse cx="${f(x)}" cy="${f(y-в)}" rx="${f(ш/2)}" ry="${f(в*0.28)}" fill="#e8ebe7"/>
      ${о.горка?кристаллы(x,y-в*0.6,ш*0.7,о.горка,о.вид||'соль',Math.round(10+о.горка*6),(x*3)|0):''}
      <path d="M${f(x-ш/2)} ${f(y-в)} Q${f(x)} ${f(y-в-в*0.5)} ${f(x+ш/2)} ${f(y-в)}" stroke="#fff" stroke-width="1" fill="none" opacity=".8"/>
    </g>`;
  }
  /* ---------- шпатель: стальная лопатка; (x,y) — кончик, угол в градусах, опц.горка (вид кристаллов на лопатке) ---------- */
  function шпатель(x,y,длина,угол,опц){
    const о=опц||{};
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол)})">
      <path d="M0 -3.4 Q-4 0 0 3.4 H14 L${f(длина)} 1.4 V-1.4 L14 -3.4 Z" fill="url(#рл-сталь)"/>
      <path d="M1 -2 H13" stroke="#fff" stroke-width=".8" opacity=".8"/>
      ${о.горка?`<g transform="rotate(${f(-угол)} 6 0)">${кристаллы(6,-1,12,4,о.горка,10,5)}</g>`:''}
    </g>`;
  }
  /* ---------- защитные очки на столе ---------- */
  function очки(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <ellipse cx="4" cy="1" rx="30" ry="3" fill="#000" opacity=".35" filter="url(#рл-мягко)"/>
      <path d="M-28 -2 Q-30 -16 -14 -17 Q-2 -17 0 -10 Q2 -17 14 -17 Q30 -16 28 -2 Q14 2 0 -4 Q-14 2 -28 -2 Z" fill="#cfe8f4" fill-opacity=".35" stroke="#2a3a4a" stroke-width="1.6"/>
      <path d="M-24 -12 Q-18 -15 -10 -14 M8 -14 Q16 -15 22 -12" stroke="#fff" stroke-width="1.6" fill="none" opacity=".8" stroke-linecap="round"/>
      <path d="M-28 -6 Q-40 -6 -44 0 M28 -6 Q40 -6 44 0" stroke="#2a3a4a" stroke-width="2.4" fill="none"/>
    </g>`;
  }
  /* ---------- струя из стакана/цилиндра в стакан: от (x1,y1) к (x2,y2), цвет ---------- */
  function струя(x1,y1,x2,y2,ц){
    return `<path d="M${f(x1)} ${f(y1)} Q${f(x2+ (x1-x2)*0.15)} ${f(y1)} ${f(x2)} ${f(y2)}" stroke="${ц||цвет('вода')}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
      <path d="M${f(x1)} ${f(y1)} Q${f(x2+(x1-x2)*0.15)} ${f(y1)} ${f(x2)} ${f(y2)}" stroke="#fff" stroke-width="1" fill="none" opacity=".6" stroke-dasharray="4 6">${ДВИЖ?`<animate attributeName="stroke-dashoffset" values="20;0" dur=".5s" repeatCount="indefinite"/>`:''}</path>
      <ellipse cx="${f(x2)}" cy="${f(y2)}" rx="5" ry="1.6" fill="#fff" opacity=".6">${ДВИЖ?`<animate attributeName="rx" values="3;7;3" dur=".6s" repeatCount="indefinite"/>`:''}</ellipse>`;
  }
  /* ---------- рука в синей нитриловой перчатке, держит (x,y) — точка хвата; угол ---------- */
  function рука(x,y,м,угол){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)}) scale(${м||1})">
      <path d="M-6 -8 Q-2 -12 6 -10 L40 -12 Q52 -12 60 -6 L60 10 Q48 14 38 12 L6 10 Q-4 10 -6 4 Z" fill="url(#рл-перчатка)"/>
      <path d="M-6 -6 Q-12 -4 -10 2 Q-8 6 -2 4" fill="url(#рл-перчатка)"/>
      ${[-7,-2,3,8].map((yy,k)=>`<path d="M8 ${yy} Q2 ${yy+1} 0 ${yy+2}" stroke="#2a5aa8" stroke-width="1" fill="none" opacity=".6"/>`).join('')}
      <path d="M10 -9 Q30 -12 50 -8" stroke="#bcdcff" stroke-width="1.6" fill="none" opacity=".7"/>
      <rect x="58" y="-8" width="20" height="20" rx="4" fill="#f4f6f8"/><path d="M58 -8 V12" stroke="#c8ccd0" stroke-width="1.4"/>
    </g>`;
  }


  /* ---------- часовое стекло: плоская стеклянная чашка на столе с навеской вещества ---------- */
  function часовое(x,y,ш,вид,горка){
    const в=ш*0.12;
    return `<g>${тень(x,y,ш,.35)}
      <ellipse cx="${f(x)}" cy="${f(y-в*0.5)}" rx="${f(ш/2)}" ry="${f(в)}" fill="#dcebf5" fill-opacity=".25" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".8"/>
      ${вид==='пусто'?'':вид==='вода'?`<ellipse cx="${f(x)}" cy="${f(y-в*0.6)}" rx="${f(ш*0.36)}" ry="${f(в*0.6)}" fill="${цвет('вода')}"/>`:кристаллы(x,y-в*0.5,ш*0.7,горка||ш*0.22,вид,Math.round(ш*(горка||ш*0.22)/(вид==='уголь'?14:4)),(x*7)|0)}
      <path d="M${f(x-ш/2+3)} ${f(y-в*0.7)} Q${f(x-ш*0.2)} ${f(y-в*1.4)} ${f(x+ш*0.1)} ${f(y-в*1.3)}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".75"/></g>`;
  }
  /* ---------- монеты: стопка (n штук) — (x,y) середина низа, r — радиус ---------- */
  function монеты(x,y,r,n,цв){
    const ц=цв||['#c8962a','#f0c860','#8a6010'];
    let s=тень(x,y,r*2,.4);
    for(let i=0;i<n;i++){ const yy=y-i*2.2, dx=((i*37)%5-2)*0.6;
      s+=`<ellipse cx="${f(x+dx)}" cy="${f(yy)}" rx="${f(r)}" ry="${f(r*0.3)}" fill="${ц[2]}"/><ellipse cx="${f(x+dx)}" cy="${f(yy-1.4)}" rx="${f(r)}" ry="${f(r*0.3)}" fill="${ц[0]}"/>`; }
    const top=y-(n-1)*2.2-1.4;
    return s+`<ellipse cx="${f(x)}" cy="${f(top)}" rx="${f(r*0.72)}" ry="${f(r*0.2)}" fill="none" stroke="${ц[2]}" stroke-width=".7"/><ellipse cx="${f(x-r*0.3)}" cy="${f(top-0.4)}" rx="${f(r*0.35)}" ry="${f(r*0.08)}" fill="${ц[1]}" opacity=".9"/>`;
  }
  /* ---------- лоток с дюжиной яиц: (x,y) — середина низа, м ---------- */
  function яйца(x,y,м){
    let s=`<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,90,.4)}
      <path d="M-46 0 L-42 -14 H42 L46 0 Z" fill="#c8b89a"/><path d="M-42 -14 H42" stroke="#e0d4bc" stroke-width="1.2"/>`;
    for(let r0=0;r0<2;r0++) for(let k=0;k<6;k++){ const ex=-35+k*14+r0*2, ey=-14-r0*6;
      s+=`<ellipse cx="${ex}" cy="${ey-6}" rx="6" ry="7.4" fill="url(#рл-яйцо)"/><ellipse cx="${ex-2}" cy="${ey-9}" rx="1.8" ry="2.4" fill="#fff" opacity=".7"/>`; }
    return s+`</g>`;
  }
  /* ---------- пачка бумаги (500 листов) ---------- */
  function пачка(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,70,.4)}
      <path d="M-34 0 V-16 L-24 -24 H38 V-8 L28 0 Z" fill="#e8ecef"/><path d="M-34 -16 L-24 -24 H38 L28 -16 Z" fill="#fbfcfd"/>
      <path d="M-34 -16 H28 V0 H-34 Z" fill="#2a6ab8"/><path d="M28 -16 L38 -24 V-8 L28 0 Z" fill="#1a4a8a"/>
      <text x="-3" y="-5" text-anchor="middle" font-size="7" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">A4 · 500</text></g>`;
  }
  /* ---------- пара перчаток на столе ---------- */
  function перчатки(x,y,м){
    const одна=(dx,угол)=>`<g transform="translate(${dx} 0) rotate(${угол})"><path d="M-8 0 Q-10 -14 -8 -22 L-8 -34 Q-6 -37 -4 -34 L-4 -24 L-2 -38 Q0 -41 2 -38 L2 -24 L4 -36 Q6 -39 8 -36 L7 -22 L10 -30 Q12 -32 13 -29 L10 -14 Q8 0 6 0 Z" fill="url(#рл-перчатка)"/><path d="M-6 -10 Q0 -12 6 -10" stroke="#bcdcff" stroke-width="1" fill="none" opacity=".6"/></g>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,50,.35)}${одна(-10,-12)}${одна(10,14)}</g>`;
  }
  /* ---------- плакат «Периодическая система»: сетка 18×7 на стене; выдел — {символ:true} ----------
     (x,y) — левый верх, ш — ширина; клетки известных элементов подписаны */
  const ЭЛ = {H:[1,1,1,'водород'],He:[18,1,4,'гелий'],Li:[1,2,7,'литий'],C:[14,2,12,'углерод'],N:[15,2,14,'азот'],O:[16,2,16,'кислород'],F:[17,2,19,'фтор'],Ne:[18,2,20,'неон'],
    Na:[1,3,23,'натрий'],Mg:[2,3,24,'магний'],Al:[13,3,27,'алюминий'],Si:[14,3,28,'кремний'],P:[15,3,31,'фосфор'],S:[16,3,32,'сера'],Cl:[17,3,35.5,'хлор'],Ar:[18,3,40,'аргон'],
    K:[1,4,39,'калий'],Ca:[2,4,40,'кальций'],Fe:[8,4,56,'железо'],Cu:[11,4,64,'медь'],Zn:[12,4,65,'цинк'],Ag:[11,5,108,'серебро'],Au:[11,6,197,'золото'],Hg:[12,6,201,'ртуть'],Br:[17,4,80,'бром'],I:[17,5,127,'йод'],B:[13,2,11,'бор'],Sn:[14,5,119,'олово'],Pb:[14,6,207,'свинец']};
  function таблица(x,y,ш,опц){
    const о=опц||{}, к=ш/18, в=к*7+к*0.6;
    const есть=(g,p)=> p===1?(g===1||g===18): p<=3?(g<=2||g>=13): true;
    const цвет0=(g)=> g<=2?'#f4c8a0': g>=13&&g<=17?'#c8e4b0': g===18?'#c8d8f4':'#f4e4a8';
    let s=`<g>${тень(x+ш/2,y+в+4,ш,.25)}<rect x="${f(x-3)}" y="${f(y-10)}" width="${f(ш+6)}" height="${f(в+14)}" rx="2" fill="#fbfbf7"/>
      <text x="${f(x+ш/2)}" y="${f(y-3)}" text-anchor="middle" font-size="${f(к*0.62)}" textLength="${f(ш-4)}" lengthAdjust="spacingAndGlyphs" font-weight="bold" fill="#2a2a2a" font-family="${ШРИФТ}">ПЕРИОДИЧЕСКАЯ СИСТЕМА ЭЛЕМЕНТОВ Д. И. МЕНДЕЛЕЕВА</text>`;
    for(let p=1;p<=7;p++) for(let g=1;g<=18;g++){ if(!есть(g,p)) continue;
      const sym=Object.keys(ЭЛ).find(k0=>ЭЛ[k0][0]===g&&ЭЛ[k0][1]===p), вык=sym&&о.выдел&&о.выдел[sym];
      const cx=x+(g-1)*к, cy=y+(p-1)*к+(p>5?0:0);
      const кл0=о.классы&&sym?о.классы[sym]:null, фон=вык?'#ffd76a':кл0==='м'?'#8ab8e8':кл0==='н'?'#f0d860':о.классы?'#e8e6de':цвет0(g);
      s+=`<rect x="${f(cx+0.3)}" y="${f(cy+0.3)}" width="${f(к-0.6)}" height="${f(к-0.6)}" fill="${фон}" stroke="${вык?'#c8402a':'#fff'}" stroke-width="${вык?1:0.4}"/>`;
      if(sym) s+=`<text x="${f(cx+к/2)}" y="${f(cy+к*0.68)}" text-anchor="middle" font-size="${f(к*0.5)}" font-weight="bold" fill="#1a1a1a" font-family="${ШРИФТ}">${sym}</text>`;
    }
    if(о.граница){ const X=(g)=>x+(g-1)*к, Y=(p)=>y+(p-1)*к;
      s+=`<path d="M${f(X(13))} ${f(Y(2))} V${f(Y(3))} H${f(X(14))} V${f(Y(4))} H${f(X(15))} V${f(Y(5))} H${f(X(16))} V${f(Y(6))} H${f(X(17))} V${f(Y(7))}" stroke="#c8202a" stroke-width="${f(к*0.14)}" fill="none" stroke-linejoin="round"/>`; }
    return s+`<path d="M${f(x-3)} ${f(y+в+4)} H${f(x+ш+3)}" stroke="#000" stroke-width=".6" opacity=".2"/></g>`;
  }
  /* крупная клетка элемента: (x,y) — левый верх, ш — сторона */
  function клетка(x,y,ш,сим){
    const e=ЭЛ[сим]||[0,0,0,''], цв=e[0]<=2?'#f4c8a0': e[0]>=13&&e[0]<=17?'#c8e4b0': e[0]===18?'#c8d8f4':'#f4e4a8';
    const Z={H:1,He:2,Li:3,C:6,N:7,O:8,F:9,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,S:16,Cl:17,Ar:18,K:19,Ca:20,Fe:26,Cu:29,Zn:30,Ag:47,Au:79}[сим]||'';
    return `<g filter="url(#рл-тень)">${тень(x+ш/2,y+ш,ш,.35)}<rect x="${f(x)}" y="${f(y)}" width="${f(ш)}" height="${f(ш)}" rx="3" fill="${цв}"/></g>
      <rect x="${f(x)}" y="${f(y)}" width="${f(ш)}" height="${f(ш)}" rx="3" fill="none" stroke="#fff" stroke-width="1.4" opacity=".7"/>
      <text x="${f(x+ш*0.1)}" y="${f(y+ш*0.2)}" font-size="${f(ш*0.14)}" font-weight="bold" fill="#333" font-family="${ШРИФТ}">${Z}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.58)}" text-anchor="middle" font-size="${f(ш*0.38)}" font-weight="bold" fill="#111" font-family="${ШРИФТ}">${esc(сим)}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.76)}" text-anchor="middle" font-size="${f(ш*0.13)}" fill="#333" font-family="${ШРИФТ}">${esc(e[3])}</text>
      <text x="${f(x+ш/2)}" y="${f(y+ш*0.93)}" text-anchor="middle" font-size="${f(ш*0.14)}" font-weight="bold" fill="#8a1a1a" font-family="${ШРИФТ}">${String(e[2]).replace('.',',')}</text>`;
  }
  /* ---------- модель молекулы «шары и палочки»: (x,y) — центр, м — масштаб, вид — 'H2O'|'CO2'|'O2'|'CH4'|'NH3'|'N2'|'H2' ---------- */
  const АТОМ = {Ar:['#d8b8ff','#5a2a9a',11.5],Zn:['#b8c0c8','#4a5058',13],Fe:['#c88a6a','#5a2a1a',13],Mg:['#c8e8b0','#4a7a3a',13],H:['#ffffff','#b8c0c8',7],O:['#ff5a4a','#8a1a10',11],C:['#5a5e64','#1a1c1f',11],N:['#5a7aff','#1a2a8a',10.5],Cl:['#6ad84a','#1a6a10',12.5],Na:['#b87aff','#4a1a8a',13],S:['#ffd84a','#8a6a00',12.5]};
  const МОЛ = {
    H2O:[['O',0,0,0],['H',-17,12,4],['H',17,12,4]],
    CO2:[['O',-26,0,0],['C',0,0,0],['O',26,0,0]],
    O2:[['O',-11,0,0],['O',11,0,0]],
    Ar:[['Ar',0,0,0]],
    H2:[['H',-7,0,0],['H',7,0,0]],
    N2:[['N',-10,0,0],['N',10,0,0]],
    CH4:[['C',0,0,0],['H',0,-20,0],['H',-18,8,-6],['H',18,8,-6],['H',4,10,10]],
    NH3:[['N',0,-2,0],['H',-18,8,2],['H',18,8,2],['H',0,14,10]],
    NaCl:[['Na',-14,0,0],['Cl',14,0,0]],
    MgO:[['Mg',-14,0,0],['O',13,0,0]],
    Mg:[['Mg',0,0,0]],
    C:[['C',0,0,0]],
    S:[['S',0,0,0]],
    SO2:[['S',0,0,0],['O',-20,10,2],['O',20,10,2]],
    HCl:[['Cl',0,0,0],['H',19,0,2]],
    ZnCl2:[['Zn',0,0,0],['Cl',-25,0,0],['Cl',25,0,0]],
    Zn:[['Zn',0,0,0]]
  };
  function молекула(x,y,м,вид,опц){
    const о=опц||{}, ат=(МОЛ[вид]||[]).slice().sort((a,b)=>a[3]-b[3]), ц=МОЛ[вид]?МОЛ[вид][0]:null;
    let s=`<g transform="translate(${f(x)} ${f(y)}) scale(${м})">`;
    if(вид!=='NaCl'&&вид!=='MgO'&&вид!=='Mg'&&вид!=='C'&&вид!=='S'&&вид!=='Zn'&&вид!=='Ar'&&ц){ const [e0,x0,y0]=МОЛ[вид][0];
      МОЛ[вид].slice(1).forEach(([e,xx,yy])=>{ s+=`<path d="M${x0} ${y0} L${xx} ${yy}" stroke="#9aa0a6" stroke-width="4.4" stroke-linecap="round"/><path d="M${x0} ${y0} L${xx} ${yy}" stroke="#e8ecef" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`; });
      if(вид==='O2'||вид==='CO2'||вид==='N2'){ s+=МОЛ[вид].slice(1).map(([e,xx,yy])=>`<path d="M${x0} ${y0-3.4} L${xx} ${yy-3.4}" stroke="#9aa0a6" stroke-width="2.6"/>`).join(''); if(вид==='O2') s+=`<path d="M-11 -3.4 L11 -3.4" stroke="#9aa0a6" stroke-width="2.6"/>`; } }
    ат.forEach(([e,xx,yy,zz])=>{ const [c1,c2,r]=АТОМ[e], кл=ид('ат'), rr=r*(1+zz*0.012);
      s+=`<radialGradient id="${кл}" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <circle cx="${xx}" cy="${yy}" r="${f(rr)}" fill="url(#${кл})"/>${о.подписи?`<text x="${xx}" y="${f(yy+rr*0.35)}" text-anchor="middle" font-size="${f(rr*0.9)}" font-weight="bold" fill="${e==='H'?'#333':'#fff'}" font-family="${ШРИФТ}">${e}</text>`:''}`; });
    return s+`</g>`;
  }

  /* ================= СТУДИЯ «КАК В ВИРТУАЛЬНОЙ ЛАБОРАТОРИИ» =================
     Тёмно-графитовый фон без комнаты: всё внимание на приборах (так устроены
     виртуальные опыты). y0 — линия стола; стол глянцевый, с отражениями. */
  function студия(Н,y0,опц){
    const о=опц||{};
    return `<rect width="336" height="${f(Н)}" fill="url(#рл-студия)"/>
      <ellipse cx="168" cy="${f(y0*0.45)}" rx="220" ry="${f(y0*0.7)}" fill="url(#рл-прожектор)"/>
      <rect x="0" y="${f(y0)}" width="336" height="${f(Н-y0)}" fill="url(#рл-студстол)"/>
      <rect x="0" y="${f(y0)}" width="336" height="1" fill="#8a9098" opacity=".35"/>
      ${о.сетка?Array.from({length:12},(_,k)=>`<path d="M${k*30} 0 V${f(y0)}" stroke="#fff" stroke-width=".3" opacity=".04"/>`).join(''):''}`;
  }
  /* подпись прибора в духе виртуальной лаборатории: мелкий светлый текст под предметом */
  const имяПрибора = (x,y,t0) => `<text x="${f(x)}" y="${f(y)}" text-anchor="middle" font-size="7.5" fill="#c8ced6" opacity=".85" font-family="${ШРИФТ}">${esc(t0)}</text>`;

  /* ---------- спиртовка: (x,y) — середина низа, м; горит — пламя ---------- */
  function спиртовка(x,y,м,горит,безКолпачка){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,40,.4)}
      <path d="M-18 0 Q-22 -16 -12 -24 H12 Q22 -16 18 0 Z" fill="#dcebf5" fill-opacity=".22" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".8"/>
      <path d="M-17 -2 Q-20 -12 -14 -16 H14 Q20 -12 17 -2 Z" fill="hsla(200,40%,80%,.35)"/>
      <path d="M-14 -20 Q-16 -10 -15 -2" stroke="#fff" stroke-width="1.8" fill="none" opacity=".6"/>
      <rect x="-5" y="-30" width="10" height="7" rx="1.5" fill="url(#рл-сталь)"/>
      <rect x="-1" y="-36" width="2" height="7" fill="#f4ecd8"/>
      ${горит?`<g><path d="M0 -36 Q-7 -46 0 -62 Q7 -46 0 -36 Z" fill="#ffb640" opacity=".9">${ДВИЖ?`<animate attributeName="d" values="M0 -36 Q-7 -46 0 -62 Q7 -46 0 -36 Z;M0 -36 Q-6 -47 1 -64 Q8 -46 0 -36 Z;M0 -36 Q-7 -46 0 -62 Q7 -46 0 -36 Z" dur=".7s" repeatCount="indefinite"/>`:''}</path><path d="M0 -37 Q-3 -43 0 -50 Q3 -43 0 -37 Z" fill="#7ab8ff" opacity=".8"/><circle cx="0" cy="-48" r="18" fill="url(#рл-огонь)" opacity=".35"/></g>`
        :безКолпачка?'':`<path d="M-7 -30 Q-7 -44 0 -44 Q7 -44 7 -30 Z" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".8"/>`}
    </g>`;
  }
  /* ---------- пипетка с каплей ---------- */
  function пипетка(x,y,м,капля){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <path d="M-5 -60 Q-5 -72 0 -72 Q5 -72 5 -60 V-48 H-5 Z" fill="#c8402a"/><path d="M-3 -68 Q-2 -70 0 -70" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>
      <path d="M-3 -48 H3 L1 -4 H-1 Z" fill="#dcebf5" fill-opacity=".35" stroke="#8fa8b8" stroke-width=".6"/>
      <path d="M-2 -30 H2 L1 -4 H-1 Z" fill="${цвет('вода')}"/>
      ${капля?`<path d="M0 0 Q-4 6 0 9 Q4 6 0 0 Z" fill="${цвет('вода')}" stroke="#bfe6fa" stroke-width=".5">${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;0 3;0 0" dur="1.6s" repeatCount="indefinite"/>`:''}</path>`:''}
    </g>`;
  }
  /* ---------- частицы микромира внутри круга (cx,cy,r): вид 'вода'|'соль'|'сахар'|'железо'|'медь'|'сера'|'уголь' ---------- */
  function частицы(вид,cx,cy,r){
    const r0=слч(вид.length*13+7), шар=(x,y,rr,c1,c2,дрож)=>{ const кл=ид('мч');
      return `<radialGradient id="${кл}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".3" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient><circle cx="${f(x)}" cy="${f(y)}" r="${f(rr)}" fill="url(#${кл})">${дрож&&ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${f(r0()*2-1)} ${f(r0()*2-1)};0 0" dur="${f(0.4+r0()*0.5)}s" repeatCount="indefinite"/>`:''}</circle>`; };
    let s='';
    if(вид==='соль'){ const шаг=r*0.2; for(let i=-6;i<=6;i++) for(let j=-6;j<=6;j++){ const x=cx+i*шаг, y=cy+j*шаг; if((x-cx)**2+(y-cy)**2>(r+шаг)**2) continue; s+=(i+j)%2? шар(x,y,шаг*0.46,'#b87aff','#4a1a8a'):шар(x,y,шаг*0.62,'#6ad84a','#1a6a10'); } }
    else if(вид==='железо'||вид==='медь'){ const шаг=r*0.22, c=вид==='железо'?['#b8c0c8','#4a5058']:['#f0a060','#8a4418'];
      for(let j=-6;j<=6;j++) for(let i=-6;i<=6;i++){ const x=cx+i*шаг+(j%2?шаг/2:0), y=cy+j*шаг*0.87; if((x-cx)**2+(y-cy)**2>(r+шаг)**2) continue; s+=шар(x,y,шаг*0.5,c[0],c[1],true); } }
    else if(вид==='уголь'){ const шаг=r*0.2; for(let j=-5;j<=5;j++) for(let i=-6;i<=6;i++){ const x=cx+i*шаг*0.87+(j%2?шаг*0.43:0), y=cy+j*шаг*0.75; if((x-cx)**2+(y-cy)**2>(r+шаг)**2) continue; s+=шар(x,y,шаг*0.32,'#6a6e74','#1a1c1f'); } }
    else if(вид==='сера'){ for(let k=0;k<7;k++){ const ox=cx+(r0()-0.5)*r*1.5, oy=cy+(r0()-0.5)*r*1.5; for(let a=0;a<8;a++){ const ang=a*Math.PI/4; s+=шар(ox+Math.cos(ang)*r*0.12,oy+Math.sin(ang)*r*0.12,r*0.06,'#ffe24a','#8a6a00'); } } }
    else if(вид==='сахар'){ for(let k=0;k<6;k++){ const ox=cx+(r0()-0.5)*r*1.4, oy=cy+(r0()-0.5)*r*1.4; for(let a=0;a<9;a++){ const ang=a*0.7, rr=r*0.05+r*0.08*(a%3); s+=шар(ox+Math.cos(ang)*rr,oy+Math.sin(ang)*rr,r*0.045,a%3===0?'#ff5a4a':a%3===1?'#5a5e64':'#ffffff',a%3===0?'#8a1a10':a%3===1?'#1a1c1f':'#b8c0c8'); } } }
    else if(вид==='раствор'||вид==='сироп'){
      for(let k=0;k<18;k++){ const ox=cx+(r0()-0.5)*r*1.8, oy=cy+(r0()-0.5)*r*1.8, aa=r0()*6.28, d=r*0.07;
        s+=`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${f((r0()-0.5)*8)} ${f((r0()-0.5)*8)};0 0" dur="${f(1+r0()*1.5)}s" repeatCount="indefinite"/>`:''}${шар(ox,oy,r*0.065,'#ff5a4a','#8a1a10')}${шар(ox+Math.cos(aa)*d,oy+Math.sin(aa)*d,r*0.04,'#fff','#b8c0c8')}${шар(ox+Math.cos(aa+1.8)*d,oy+Math.sin(aa+1.8)*d,r*0.04,'#fff','#b8c0c8')}</g>`; }
      const n=вид==='раствор'?3:3, НА=[[-0.5,-0.25],[0.4,-0.5],[0.15,0.45]], ХЛ=[[0.05,-0.05],[-0.35,0.45],[0.55,0.1]], СХ=[[-0.35,-0.35],[0.35,0.3],[-0.1,0.5]];
      for(let k=0;k<n;k++){ const ox=cx+(вид==='раствор'?НА[k][0]:СХ[k][0])*r, oy=cy+(вид==='раствор'?НА[k][1]:СХ[k][1])*r;
        if(вид==='раствор'){ s+=шар(ox,oy,r*0.1,'#b87aff','#4a1a8a',true)+`<text x="${f(ox)}" y="${f(oy+r*0.035)}" text-anchor="middle" font-size="${f(r*0.09)}" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">Na⁺</text>`;
          const ox2=cx+ХЛ[k][0]*r, oy2=cy+ХЛ[k][1]*r; s+=шар(ox2,oy2,r*0.14,'#6ad84a','#1a6a10',true)+`<text x="${f(ox2)}" y="${f(oy2+r*0.04)}" text-anchor="middle" font-size="${f(r*0.1)}" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">Cl⁻</text>`; }
        else { for(let a2=0;a2<9;a2++){ const ang=a2*0.7, rr=r*0.04+r*0.06*(a2%3); s+=шар(ox+Math.cos(ang)*rr,oy+Math.sin(ang)*rr,r*0.04,a2%3===0?'#ff5a4a':a2%3===1?'#5a5e64':'#ffffff',a2%3===0?'#8a1a10':a2%3===1?'#1a1c1f':'#b8c0c8'); } } } }
    else { for(let k=0;k<22;k++){ const ox=cx+(r0()-0.5)*r*1.8, oy=cy+(r0()-0.5)*r*1.8, a=r0()*6.28, d=r*0.09;
      s+=`<g>${ДВИЖ?`<animateTransform attributeName="transform" type="translate" values="0 0;${f((r0()-0.5)*8)} ${f((r0()-0.5)*8)};0 0" dur="${f(1+r0()*1.5)}s" repeatCount="indefinite"/>`:''}${шар(ox,oy,r*0.08,'#ff5a4a','#8a1a10')}${шар(ox+Math.cos(a)*d,oy+Math.sin(a)*d,r*0.05,'#fff','#b8c0c8')}${шар(ox+Math.cos(a+1.8)*d,oy+Math.sin(a+1.8)*d,r*0.05,'#fff','#b8c0c8')}</g>`; } }
    return s;
  }
  /* ---------- лупа «микромир»: круг с увеличенными частицами; (cx,cy) — центр стекла, r ---------- */
  function лупа(cx,cy,r,вид,опц){
    const о=опц||{}, кл=ид('лупа');
    return `<g>
      <path d="M${f(cx+r*0.72)} ${f(cy+r*0.72)} L${f(cx+r*1.25)} ${f(cy+r*1.25)}" stroke="#1a1c1f" stroke-width="${f(r*0.2)}" stroke-linecap="round"/>
      <path d="M${f(cx+r*0.74)} ${f(cy+r*0.7)} L${f(cx+r*1.2)} ${f(cy+r*1.16)}" stroke="#4a5058" stroke-width="${f(r*0.06)}" stroke-linecap="round"/>
      <clipPath id="${кл}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/></clipPath>
      <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#0e1a24"/>
      <g clip-path="url(#${кл})">${о.внутри!=null?о.внутри:частицы(вид,cx,cy,r)}<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="url(#рл-линза)"/></g>
      <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="url(#рл-сталь)" stroke-width="${f(r*0.1)}"/>
      <path d="M${f(cx-r*0.6)} ${f(cy-r*0.5)} A${f(r*0.8)} ${f(r*0.8)} 0 0 1 ${f(cx+r*0.1)} ${f(cy-r*0.78)}" stroke="#fff" stroke-width="${f(r*0.05)}" fill="none" opacity=".5"/>
      ${о.подпись?`<text x="${f(cx)}" y="${f(cy+r+r*0.28)}" text-anchor="middle" font-size="${f(Math.max(7,r*0.16))}" fill="#9fd0ff" font-family="${ШРИФТ}">${esc(о.подпись)}</text>`:''}
    </g>`;
  }
  /* ---------- значок прибора для лотка: маленький svg с тёмным фоном ---------- */
  function значок(что){
    const тело = что==='весы'?весы(32,52,52,{показ:'0.0'})
      : что==='часовое'?часовое(32,44,44,'пусто')
      : что==='шпатель'?шпатель(10,36,44,-18,{})
      : что==='лупа'?лупа(28,28,16,'соль')
      : что==='спиртовка'?спиртовка(32,54,0.9,false)
      : что==='колба'?колба(32,56,0.52,{уровень:.4})
      : что==='цилиндр'?цилиндр(32,58,12,52,{мл:50})
      : что==='стакан'?стакан(32,54,34,38,{уровень:.5,деления:false})
      : что==='пипетка'?пипетка(32,62,0.75,true)
      : что==='лодочка'?лодочка(32,44,40,{горка:0})
      : что==='Mg'?`<rect x='14' y='30' width='36' height='4' fill='#d8dde2' transform='rotate(-15 32 32)'/><text x='32' y='54' text-anchor='middle' font-size='9' fill='#c8ced6' font-family='Arial'>лента</text>`
      : что==='Zn'?`<circle cx='26' cy='36' r='7' fill='#9aa0a8'/><circle cx='38' cy='38' r='6' fill='#b8bec6'/><circle cx='32' cy='28' r='5' fill='#8a9098'/>`
      : что==='Fe'?`<path d='M18 44 l8 -22 M28 46 l6 -24 M38 44 l2 -22 M46 44 l-4 -20' stroke='#5a5f66' stroke-width='3' stroke-linecap='round'/>`
      : что==='Cu'?`<rect x='16' y='30' width='32' height='10' rx='2' fill='#c87a3a'/><rect x='16' y='30' width='32' height='3' fill='#f0a060'/>`
      : что==='лакмус'?склянка(32,58,24,44,{уровень:.5,цвет:'hsla(280,50%,45%,.85)',этикетка:['лакмус']})
      : что==='метилоранж'?склянка(32,58,24,44,{уровень:.5,цвет:'hsla(28,90%,55%,.85)',этикетка:['м/о']})
      : что==='фенолфталеин'?склянка(32,58,24,44,{уровень:.5,цвет:'hsla(200,20%,90%,.5)',этикетка:['ф/ф']})
      : что==='штативП'?штативПробирок(32,60,12,[{уровень:.3},{уровень:.3},{уровень:.3}],0.6)
      : что==='сода'?банка(32,56,30,42,{содержимое:'соль',надпись:['сода'],мал:true})
      : что==='уксус'?склянка(32,58,26,44,{уровень:.6,цвет:'hsla(198,40%,88%,.35)',этикетка:['уксус'],полоса:'#c8402a'})
      : что==='известковая'?склянка(32,58,26,44,{уровень:.6,цвет:'hsla(198,30%,90%,.45)',этикетка:['Ca(OH)₂']})
      : что==='йод'?склянка(32,58,24,44,{уровень:.5,цвет:'hsla(25,85%,30%,.9)',этикетка:['йод']})
      : что==='крахмал'?банка(32,56,30,42,{содержимое:'мел',надпись:['крахмал'],мал:true})
      : что==='плитка'?плитка(32,52,52,{вкл:false})
      : что==='термометр'?термометр(28,58,52,20)
      : что==='селитра'?банка(32,56,30,42,{содержимое:'селитра',надпись:['KNO₃'],мал:true})
      : что==='мел'?банка(32,56,30,42,{содержимое:'мел',надпись:['CaCO₃'],мал:true})
      : что==='масло'?склянка(32,58,26,44,{уровень:.5,цвет:'hsla(45,90%,55%,.75)',этикетка:['масло']})
      : что==='купорос'?банка(32,56,30,42,{содержимое:'купорос',надпись:['CuSO₄'],мал:true})
      : что==='сахар'?банка(32,56,30,42,{содержимое:'сахар',надпись:['сахар'],мал:true})
      : что==='песок'?банка(32,56,30,42,{содержимое:'песок',надпись:['песок'],мал:true})
      : что==='газосборник'?газосборник(32,58,24,46,{})
      : что==='лучинка'?лучинка(14,40,-20,'тлеет')
      : что==='ложечка'?ложечка(32,58,'уголь',false)
      : что==='свеча'?свеча(32,58,0.8,true)
      : что==='пластинка'?`<rect x='10' y='34' width='44' height='4' rx='1' fill='#dcebf5' fill-opacity='.6' stroke='#a8bccb'/>`
      : что==='вата'?`<path d='M18 40 q-6 -6 2 -12 q4 -8 12 -2 q8 -4 12 4 q6 4 0 10 q-4 6 -12 2 q-8 4 -14 -2 Z' fill='#f4f4f0'/>`
      : что==='kmno4'?банка(32,56,30,42,{стекло:'янтарь',надпись:['KMnO₄'],мал:true})
      : что==='пробиркаП'?пробиркаKMnO4(4,32,8,{})
      : что==='насос'?насос(30,60,0.66)
      : что==='шарКолба'?шарКолба(32,62,0.5,{})
      : что==='анВесы'?анВесы(32,58,50,{показ:'0.000'})
      : что==='балH2'?баллон(32,62,0.38,'H2')
      : что==='балO2'?баллон(32,62,0.38,'O2')
      : что==='балCO2'?баллон(32,62,0.38,'CO2')
      : что==='кристаллизатор'?кристаллизатор(32,52,50,26,{})
      : что==='штатив'?штатив(22,60,52,24,26)
      : что==='цинк'?банка(32,56,30,42,{содержимое:'железо',надпись:['Zn'],мал:true})
      : что==='кислота'?склянка(32,58,26,44,{уровень:.5,этикетка:['HCl']})
      : что==='щипцы'?щипцы(46,40,-28,{})
      : что==='пробирка'?пробирка(32,60,0.6,{уровень:.4})
      : что==='колбаЗ'?колба(32,58,0.46,{уровень:.4,цвет:цвет('купорос',.12),пробка:true,пробирка:{цвет:'hsla(0,0%,95%,.5)'}})
      : что==='палочка'?палочка(10,52,54,12)
      : что==='склянка'?склянка(32,58,28,46,{этикетка:['     ']})
      : что==='очки'?очки(32,40,0.9)
      : ['соль','сахар','железо','медь','сера','уголь','вода'].includes(что)?банка(32,56,30,42,{содержимое:что==='вода'?undefined:что,стекло:что==='вода'?'янтарь':'прозрачное',надпись:[{соль:'NaCl',сахар:'C₁₂H₂₂O₁₁',железо:'Fe',медь:'Cu',сера:'S',уголь:'C',вода:'H₂O'}[что]],мал:true})
      : '';
    return `<svg viewBox="0 0 64 64" aria-hidden="true">${defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${тело}</svg>`;
  }

  /* ---------- стеклянная палочка на столе: от (x1,y1) до (x2,y2) ---------- */
  function палочка(x1,y1,x2,y2){
    return `<g><path d="M${f(x1+2)} ${f(y1+3)} L${f(x2+2)} ${f(y2+3)}" stroke="#000" stroke-width="3" opacity=".35" filter="url(#рл-мягко)"/>
      <path d="M${f(x1)} ${f(y1)} L${f(x2)} ${f(y2)}" stroke="#d8ecf6" stroke-width="3.4" stroke-linecap="round" opacity=".85"/>
      <path d="M${f(x1)} ${f(y1-0.8)} L${f(x2)} ${f(y2-0.8)}" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".9"/></g>`;
  }
  /* ---------- склянка с притёртой пробкой: (x,y) — середина дна; опц.уровень, опц.цвет, опц.этикетка — строки ---------- */
  function склянка(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('скл'), л=x-ш/2, плечо=y-в*0.72, горло=ш*0.34, ур=о.уровень||0, ц=о.цвет||цвет('вода');
    const форма=`M${f(л)} ${f(y-4)} Q${f(л)} ${f(y)} ${f(л+4)} ${f(y)} H${f(л+ш-4)} Q${f(л+ш)} ${f(y)} ${f(л+ш)} ${f(y-4)} V${f(плечо)} Q${f(л+ш)} ${f(плечо-в*0.12)} ${f(x+горло/2)} ${f(плечо-в*0.14)} V${f(y-в)} H${f(x-горло/2)} V${f(плечо-в*0.14)} Q${f(л)} ${f(плечо-в*0.12)} ${f(л)} ${f(плечо)} Z`;
    const yж=y-3-(в*0.7)*ур;
    const строки=[].concat(о.этикетка||[]);
    return `<g>${тень(x,y,ш,.45)}
      ${ур>0?`<clipPath id="${кл}"><path d="${форма}"/></clipPath><g clip-path="url(#${кл})"><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(y-yж)}" fill="${ц}"/><rect x="${f(л)}" y="${f(yж)}" width="${f(ш)}" height="${f(y-yж)}" fill="url(#рл-жидкость)"/></g><ellipse cx="${f(x)}" cy="${f(yж)}" rx="${f(ш/2-1.5)}" ry="2" fill="#fff" opacity=".3"/>`:''}
      <path d="${форма}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".9"/>
      <rect x="${f(л+3)}" y="${f(плечо+4)}" width="${f(Math.max(2,ш*0.06))}" height="${f(y-плечо-10)}" rx="1" fill="#fff" opacity=".65"/>
      <path d="M${f(x-горло/2-1)} ${f(y-в)} h${f(горло+2)} v-3 h${f(-горло-2)} Z" fill="#dcebf5" opacity=".7"/>
      <path d="M${f(x-горло*0.42)} ${f(y-в-3)} L${f(x-горло*0.3)} ${f(y-в-10)} Q${f(x)} ${f(y-в-16)} ${f(x+горло*0.3)} ${f(y-в-10)} L${f(x+горло*0.42)} ${f(y-в-3)} Z" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".8"/>
      ${строки.length?`<rect x="${f(л+ш*0.12)}" y="${f(плечо+в*0.08)}" width="${f(ш*0.76)}" height="${f(в*0.38)}" rx="1.5" fill="url(#рл-этикетка)"/><rect x="${f(л+ш*0.12)}" y="${f(плечо+в*0.08)}" width="${f(ш*0.76)}" height="2" fill="${о.полоса||'#2a6ab8'}"/>
        ${строки.map((s0,i)=>{ const к=i?ш*0.1:ш*0.13, нужно=String(s0).length*к*0.56, влез=ш*0.68; return `<text x="${f(x)}" y="${f(плечо+в*0.08+5+(i+1)*в*0.38/(строки.length+0.6))}" text-anchor="middle" ${нужно>влез?`textLength="${f(влез)}" lengthAdjust="spacingAndGlyphs"`:''} font-size="${f(к)}" font-weight="${i?'normal':'bold'}" fill="#1a1a1a" font-family="${ШРИФТ}">${esc(s0)}</text>`; }).join('')}`:''}
    </g>`;
  }
  /* ---------- вставка «мениск крупно»: круг (cx,cy,r) со шкалой цилиндра около отметки мл;
     жидкость с вогнутым мениском, нижний край на отметке; опц.глаз — линия взгляда ---------- */
  function мениск(cx,cy,r,мл,опц){
    const о=опц||{}, кл=ид('мен'), шаг=r*0.28, y0=cy; /* отметка мл — по центру */
    let дел=''; for(let k=-4;k<=4;k++){ const v=Math.round(мл)+k, yy=y0-(v-мл)*шаг; дел+=`<path d="M${f(cx-r*0.1)} ${f(yy)} H${f(cx+r*(v%5===0?0.55:0.3))}" stroke="#fff" stroke-width="${v%5===0?1.6:1}"/>${v%5===0?`<text x="${f(cx-r*0.16)}" y="${f(yy+r*0.06)}" text-anchor="end" font-size="${f(r*0.18)}" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">${v}</text>`:''}`; }
    const жверх=y0-(0)*шаг;
    return `<g><clipPath id="${кл}"><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}"/></clipPath>
      <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#1a2430"/>
      <g clip-path="url(#${кл})">
        <rect x="${f(cx-r*0.9)}" y="${f(cy-r)}" width="${f(r*1.8)}" height="${f(r*2)}" fill="#dcebf5" opacity=".08"/>
        <path d="M${f(cx-r*0.9)} ${f(жверх-r*0.2)} Q${f(cx)} ${f(жверх+r*0.2)} ${f(cx+r*0.9)} ${f(жверх-r*0.2)} V${f(cy+r)} H${f(cx-r*0.9)} Z" fill="${цвет('вода')}"/>
        <path d="M${f(cx-r*0.9)} ${f(жверх-r*0.2)} Q${f(cx)} ${f(жверх+r*0.2)} ${f(cx+r*0.9)} ${f(жверх-r*0.2)}" stroke="#bfe6fa" stroke-width="2" fill="none"/>
        ${дел}
        ${о.глаз?`<path d="M${f(cx-r)} ${f(жверх)} H${f(cx+r)}" stroke="#ffd76a" stroke-width="1.4" stroke-dasharray="4 3"/>`:''}
      </g>
      <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="url(#рл-сталь)" stroke-width="${f(r*0.08)}"/>
      ${о.глаз?глаз(cx-r-16,жверх,1):''}
    </g>`;
  }
  /* ---------- глаз наблюдателя (для правила чтения мениска) ---------- */
  function глаз(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})"><path d="M-12 0 Q0 -9 12 0 Q0 9 -12 0 Z" fill="#fff" stroke="#c8ced6" stroke-width="1"/><circle cx="2" cy="0" r="4.4" fill="#3a6a9a"/><circle cx="2" cy="0" r="2" fill="#111"/><circle cx="1" cy="-1.2" r=".9" fill="#fff"/></g>`;
  }
  /* ---------- круговая диаграмма состава раствора: доля вещества (0..1) ---------- */
  function диаграмма(cx,cy,r,доля,цв){
    const д=Math.max(0.0001,Math.min(0.9999,доля)), a=д*2*Math.PI, x1=cx+r*Math.sin(a), y1=cy-r*Math.cos(a), big=д>0.5?1:0;
    return `<g><circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="#3a8ac8"/>
      <path d="M${f(cx)} ${f(cy)} L${f(cx)} ${f(cy-r)} A${f(r)} ${f(r)} 0 ${big} 1 ${f(x1)} ${f(y1)} Z" fill="${цв||'#f0f2f4'}"/>
      <circle cx="${f(cx)}" cy="${f(cy)}" r="${f(r)}" fill="none" stroke="#15171a" stroke-width="1.4"/>
      <circle cx="${f(cx-r*0.3)}" cy="${f(cy-r*0.35)}" r="${f(r*0.5)}" fill="#fff" opacity=".08"/></g>`;
  }

  /* ---------- выпаривание: треножник с сеткой, фарфоровая чашка, спиртовка под ней, пар ---------- */
  function выпаривание(x,y,м,горит,ур){
    const уровень=ур==null?0.5:ур;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <path d="M0 -8 L0 -66" stroke="#5a6068" stroke-width="2.2"/>
      ${спиртовка(0,0,0.9,горит)}
      <path d="M-30 0 L-22 -66 M30 0 L22 -66" stroke="url(#рл-сталь)" stroke-width="2.6"/>
      <ellipse cx="0" cy="-66" rx="28" ry="4" fill="none" stroke="url(#рл-сталь)" stroke-width="2.6"/>
      <path d="M-26 -67 H26" stroke="#8a9098" stroke-width="1.2" stroke-dasharray="1.6 1.4"/>
      <path d="M-24 -70 Q-22 -58 0 -56 Q22 -58 24 -70 Z" fill="#f4f2ec" stroke="#b8b4a8" stroke-width=".8"/>
      <ellipse cx="0" cy="-70" rx="24" ry="3.6" fill="#e8e4da" stroke="#b8b4a8" stroke-width=".8"/>
      <ellipse cx="0" cy="-69" rx="${f(20*уровень+2)}" ry="${f(2.6*уровень+0.4)}" fill="${цвет('вода')}"/>
      <path d="M-20 -66 Q-14 -60 -4 -59" stroke="#fff" stroke-width="1.2" fill="none" opacity=".8"/>
      ${горит&&ДВИЖ?[0,1,2].map(k=>`<path d="M${-10+k*10} -76 q-5 -8 0 -16 q5 -8 0 -16" stroke="#e8f0f6" stroke-width="3" fill="none" stroke-linecap="round" opacity="0"><animate attributeName="opacity" values="0;.55;0" dur="2.4s" begin="${k*0.8}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -14" dur="2.4s" begin="${k*0.8}s" repeatCount="indefinite"/></path>`).join(''):''}
    </g>`;
  }

  /* ---------- пробирка: (x,y) — низ; м; опц.уровень, опц.цвет, опц.угол, опц.осадок (цвет) ---------- */
  function пробирка(x,y,м,опц){
    const о=опц||{}, ур=о.уровень||0, h=70*ур;
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${о.угол||0}) scale(${м||1})">
      ${ур>0?`<path d="M-7 ${f(-6-h)} V-6 A7 7 0 0 0 7 -6 V${f(-6-h)} Z" fill="${о.цвет||цвет('вода')}"/>`:''}
      ${о.осадок?`<path d="M-7 -8 A7 7 0 0 0 7 -8 V-14 Q0 -10 -7 -14 Z" fill="${о.осадок}"/>`:''}
      <path d="M-8 -84 V-6 A8 8 0 0 0 8 -6 V-84" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".9"/>
      <path d="M-5 -80 V-10" stroke="#fff" stroke-width="1.6" opacity=".6" stroke-linecap="round"/>
      <ellipse cx="0" cy="-84" rx="9" ry="2" fill="none" stroke="#fff" stroke-width="1.2" opacity=".75"/>
    </g>`;
  }
  /* ---------- тигельные щипцы с магниевой лентой: (x,y) — шарнир; угол; опц.горит — ослепительная вспышка; опц.зола ---------- */
  function щипцы(x,y,угол,опц){
    const о=опц||{};
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)})">
      <path d="M-70 -3 L0 -1 L10 -3 M-70 3 L0 1 L10 3" stroke="url(#рл-сталь)" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="0" r="3" fill="#6a7078"/>
      <path d="M-70 -3 Q-78 0 -70 3" stroke="#6a7078" stroke-width="3" fill="none"/>
      <path d="M10 0 L40 -2" stroke="${о.зола?'#f4f4f0':'#c8ccd0'}" stroke-width="${о.зола?3:2}" stroke-linecap="round"/>
      ${о.зола?`<path d="M14 -2 q4 -4 8 0 q4 4 8 0 q4 -3 8 0" stroke="#fff" stroke-width="2" fill="none" opacity=".9"/>`:''}
      ${о.горит?`<g><circle cx="30" cy="-2" r="26" fill="url(#рл-вспышка)"><animate attributeName="r" values="22;30;24;28;22" dur=".5s" repeatCount="indefinite"/></circle>
        <circle cx="30" cy="-2" r="8" fill="#fff"/>
        ${[0,1,2,3,4,5].map(k=>`<path d="M30 -2 l${f(Math.cos(k)*18)} ${f(Math.sin(k)*18)}" stroke="#fff" stroke-width="1.2" opacity=".8"/>`).join('')}
        ${ДВИЖ?[0,1,2].map(k=>`<circle cx="${30+k*6}" cy="-14" r="6" fill="#f6f6f4" opacity="0" filter="url(#рл-мягко)"><animate attributeName="opacity" values="0;.55;0" dur="1.8s" begin="${k*0.6}s" repeatCount="indefinite"/><animate attributeName="cy" values="-14;-60" dur="1.8s" begin="${k*0.6}s" repeatCount="indefinite"/><animate attributeName="r" values="4;14" dur="1.8s" begin="${k*0.6}s" repeatCount="indefinite"/></circle>`).join(''):''}</g>`:''}
    </g>`;
  }

  /* ================= ГАЗЫ (урок 42) ================= */
  /* ---------- стеклянный шар для взвешивания газа, 1 л, с краном: (x,y) — низ подставки; опц.газ — подсветка, опц.открыт ---------- */
  function шарКолба(x,y,м,опц){
    const о=опц||{}, кл=ид('шар1'), газ=о.газ;
    const цг = газ==='H2'?'#9fe0a0':газ==='O2'?'#9fd0ff':газ==='CO2'?'#d8d8d8':газ==='воздух'?'#e8f0f8':null;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <ellipse cx="4" cy="1" rx="30" ry="3.4" fill="#000" opacity=".4" filter="url(#рл-мягко)"/>
      <path d="M-18 0 L-12 -10 H12 L18 0 Z" fill="#2a2f35"/><path d="M-12 -10 H12" stroke="#5a626b" stroke-width="1.2"/>
      <radialGradient id="${кл}" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="${цг||'#dcebf5'}" stop-opacity="${цг?.45:.1}"/><stop offset="1" stop-color="${цг||'#dcebf5'}" stop-opacity="${цг?.18:.04}"/></radialGradient>
      <circle cx="0" cy="-46" r="36" fill="url(#${кл})"/>
      ${цг&&газ!=='воздух'&&ДВИЖ?Array.from({length:10},(_,k)=>`<circle cx="${-20+(k*13)%40}" cy="${-66+(k*17)%40}" r="1.3" fill="${цг}"><animateTransform attributeName="transform" type="translate" values="0 0;${(k%3)*3-3} ${(k%4)*2-3};0 0" dur="${0.7+(k%5)*0.2}s" repeatCount="indefinite"/></circle>`).join(''):''}
      <circle cx="0" cy="-46" r="36" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width="1"/>
      <path d="M-24 -66 A30 30 0 0 1 -6 -78" stroke="#fff" stroke-width="3" fill="none" opacity=".65" stroke-linecap="round"/>
      <rect x="-5" y="-96" width="10" height="16" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".8"/>
      <rect x="-12" y="-104" width="24" height="9" rx="3" fill="url(#рл-сталь)"/>
      <g transform="rotate(${о.открыт?90:0} 0 -100)"><rect x="-2" y="-118" width="4" height="16" rx="2" fill="#2a2f35"/></g>
      <path d="M-2 -110 H-18 V-114" stroke="#8fa8b8" stroke-width="3" fill="none"/>
    </g>`;
  }
  /* ---------- аналитические весы со стеклянным боксом: (x,y) — середина низа, ш; опц.показ (строка), опц.дверь ---------- */
  function анВесы(x,y,ш,опц){
    const о=опц||{}, в=ш*0.9, л=x-ш/2;
    return `<g>${тень(x,y,ш,.5)}
      <rect x="${f(л)}" y="${f(y-ш*0.16)}" width="${f(ш)}" height="${f(ш*0.16)}" rx="3" fill="url(#рл-пластик)"/>
      <rect x="${f(x-ш*0.36)}" y="${f(y-ш*0.13)}" width="${f(ш*0.44)}" height="${f(ш*0.1)}" rx="2" fill="url(#рл-жк)"/>
      <text x="${f(x+ш*0.06)}" y="${f(y-ш*0.05)}" text-anchor="end" font-size="${f(ш*0.07)}" font-weight="bold" fill="#7dffb0" font-family="'Courier New',monospace" filter="url(#рл-свечение)">${esc(о.показ==null?'0.000':о.показ)}</text>
      <text x="${f(x+ш*0.09)}" y="${f(y-ш*0.05)}" font-size="${f(ш*0.05)}" fill="#6ad89a" font-family="${ШРИФТ}">г</text>
      ${[0,1].map(k=>`<ellipse cx="${f(x+ш*0.28+k*ш*0.1)}" cy="${f(y-ш*0.08)}" rx="${f(ш*0.03)}" ry="${f(ш*0.025)}" fill="${k?'#3a8a5a':'#c8c8c4'}"/>`).join('')}
      <rect x="${f(л+2)}" y="${f(y-ш*0.16-в)}" width="${f(ш-4)}" height="${f(в)}" fill="#dcebf5" fill-opacity=".07" stroke="#a8bccb" stroke-opacity=".7" stroke-width="1.2"/>
      <rect x="${f(л)}" y="${f(y-ш*0.16-в-6)}" width="${f(ш)}" height="7" rx="2" fill="url(#рл-пластик)"/>
      <path d="M${f(л+8)} ${f(y-ш*0.16-в+6)} L${f(л+20)} ${f(y-ш*0.2)} M${f(л+ш-12)} ${f(y-ш*0.16-в+10)} L${f(л+ш-6)} ${f(y-ш*0.4)}" stroke="#fff" stroke-width="2" opacity=".35"/>
      ${о.дверь?`<rect x="${f(л+ш-6)}" y="${f(y-ш*0.16-в)}" width="${f(ш*0.35)}" height="${f(в)}" fill="#dcebf5" fill-opacity=".05" stroke="#a8bccb" stroke-opacity=".5" transform="skewY(-8)"/>`:''}
      <ellipse cx="${f(x)}" cy="${f(y-ш*0.19)}" rx="${f(ш*0.28)}" ry="${f(ш*0.035)}" fill="url(#рл-чаша)"/>
    </g>`;
  }
  /* верх чаши аналитических весов */
  const анВерх = (y,ш) => y-ш*0.19;
  /* ---------- газовый баллон по российской маркировке: газ 'H2' тёмно-зелёный, 'O2' голубой, 'CO2' чёрный, 'N2' чёрный ---------- */
  function баллон(x,y,м,газ){
    const Ц={H2:['#1e5a2e','#e03a2a','ВОДОРОД'],O2:['#4a9ad8','#111','КИСЛОРОД'],CO2:['#1a1c1f','#f0c020','УГЛЕКИСЛОТА'],N2:['#1a1c1f','#f0c020','АЗОТ'],He:['#6a4a2a','#fff','ГЕЛИЙ']}[газ]||['#555','#fff',''];
    const кл=ид('бал');
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <ellipse cx="4" cy="1" rx="22" ry="3" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <linearGradient id="${кл}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".45"/><stop offset=".3" stop-color="#fff" stop-opacity=".25"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></linearGradient>
      <path d="M-18 0 V-110 Q-18 -126 0 -128 Q18 -126 18 -110 V0 Z" fill="${Ц[0]}"/>
      <path d="M-18 0 V-110 Q-18 -126 0 -128 Q18 -126 18 -110 V0 Z" fill="url(#${кл})"/>
      <text x="0" y="-60" text-anchor="middle" font-size="7" font-weight="bold" fill="${Ц[1]}" font-family="${ШРИФТ}" transform="rotate(-90 0 -60)">${Ц[2]}</text>
      <rect x="-6" y="-138" width="12" height="11" fill="url(#рл-сталь)"/><rect x="-10" y="-146" width="20" height="9" rx="2" fill="url(#рл-латунь)"/>
      <circle cx="12" cy="-142" r="7" fill="#f4f4f0" stroke="#8a9098" stroke-width="1.4"/><path d="M12 -142 L15 -146" stroke="#c8402a" stroke-width="1.2"/>
    </g>`;
  }
  /* ---------- ручной вакуумный насос ---------- */
  function насос(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,40,.35)}
      <rect x="-8" y="-60" width="16" height="56" rx="3" fill="url(#рл-сталь)"/><rect x="-14" y="-4" width="28" height="4" rx="2" fill="#2a2f35"/>
      <rect x="-2" y="-78" width="4" height="20" fill="#8a9098"/><rect x="-14" y="-82" width="28" height="6" rx="3" fill="#1a1c1f"/>
      <path d="M8 -20 Q30 -20 34 -40" stroke="#1a1c1f" stroke-width="3" fill="none"/>
    </g>`;
  }
  /* ---------- кристаллизатор с водой: (x,y) — середина низа, ш×в ---------- */
  function кристаллизатор(x,y,ш,в,опц){
    const о=опц||{}, л=x-ш/2, ур=y-в*0.72;
    return `<g>${тень(x,y,ш,.4)}
      <rect x="${f(л+2)}" y="${f(ур)}" width="${f(ш-4)}" height="${f(y-ур-2)}" rx="3" fill="${цвет('вода')}"/>
      <rect x="${f(л+2)}" y="${f(ур)}" width="${f(ш-4)}" height="${f(y-ур-2)}" rx="3" fill="url(#рл-глубина)"/>
      <path d="M${f(л+2)} ${f(ур)} H${f(л+ш-2)}" stroke="#bfe6fa" stroke-width="1.4"/>
      ${о.внутри||''}
      <path d="M${f(л)} ${f(y-в)} V${f(y-3)} Q${f(л)} ${f(y)} ${f(л+3)} ${f(y)} H${f(л+ш-3)} Q${f(л+ш)} ${f(y)} ${f(л+ш)} ${f(y-3)} V${f(y-в)}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width="1"/>
      <rect x="${f(л+3)}" y="${f(y-в+4)}" width="2" height="${f(в-8)}" fill="#fff" opacity=".6"/>
      <ellipse cx="${f(x)}" cy="${f(y-в)}" rx="${f(ш/2)}" ry="3" fill="none" stroke="#fff" stroke-width="1.2" opacity=".7"/>
    </g>`;
  }
  /* ---------- перевёрнутый мерный цилиндр в кристаллизаторе: газ вытесняет воду; (x,yНиз) — край у дна, ш×в, мл газа из объёма ---------- */
  function цилиндрВверхДном(x,yНиз,ш,в,мл,объём){
    const V=объём||250, л=x-ш/2, верх=yНиз-в, газВ=(в-8)*Math.min(1,мл/V);
    let дел=''; for(let v=25; v<V; v+=25){ const yy=верх+4+(в-8)*v/V; дел+=`<path d="M${f(x-ш*0.1)} ${f(yy)} H${f(л+ш-2)}" stroke="#fff" stroke-width="${v%50?0.6:1}" opacity=".85"/>${v%50===0?`<text x="${f(x-ш*0.14)}" y="${f(yy+2)}" text-anchor="end" font-size="5.2" fill="#fff" font-family="${ШРИФТ}">${v}</text>`:''}`; }
    return `<g>
      <rect x="${f(л+1.5)}" y="${f(верх+4+газВ)}" width="${f(ш-3)}" height="${f(в-8-газВ)}" fill="${цвет('вода')}"/>
      ${газВ>0?`<path d="M${f(л+1.5)} ${f(верх+4+газВ)} Q${f(x)} ${f(верх+4+газВ+3)} ${f(л+ш-1.5)} ${f(верх+4+газВ)}" stroke="#bfe6fa" stroke-width="1" fill="none"/>`:''}
      <rect x="${f(л)}" y="${f(верх)}" width="${f(ш)}" height="${f(в)}" rx="2" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".9"/>
      <rect x="${f(л+2)}" y="${f(верх+4)}" width="2" height="${f(в-8)}" fill="#fff" opacity=".6"/>${дел}
    </g>`;
  }
  /* ---------- штатив с лапкой ---------- */
  function штатив(x,y,высота,лапкаY,лапкаДлина){
    return `<g>${тень(x+20,y,70,.4)}<rect x="${f(x-8)}" y="${f(y-6)}" width="60" height="6" rx="2" fill="#2a2f35"/>
      <rect x="${f(x-2)}" y="${f(y-высота)}" width="4" height="${f(высота-6)}" fill="url(#рл-сталь)"/>
      <rect x="${f(x-5)}" y="${f(лапкаY-4)}" width="10" height="8" rx="2" fill="#3a4048"/>
      <rect x="${f(x)}" y="${f(лапкаY-1.6)}" width="${f(лапкаДлина)}" height="3.2" fill="url(#рл-сталь)"/></g>`;
  }
  /* ---------- газоотводная трубка по точкам ---------- */
  const трубка = (d) => `<path d="${d}" stroke="#8fa8b8" stroke-width="4" fill="none" opacity=".75" stroke-linejoin="round"/><path d="${d}" stroke="#fff" stroke-width="1" fill="none" opacity=".6"/>`;
  /* ---------- пузырьки, поднимающиеся от (x,y1) к (x,y2) ---------- */
  const пузыри = (x,y1,y2,n) => ДВИЖ ? Array.from({length:n||6},(_,k)=>`<circle cx="${f(x+(k%3-1)*2)}" cy="${f(y1)}" r="${f(1.4+(k%3)*0.6)}" fill="none" stroke="#fff" stroke-width=".8" opacity=".85"><animate attributeName="cy" values="${f(y1)};${f(y2)}" dur="${f(0.8+(k%4)*0.25)}s" begin="${f(k*0.18)}s" repeatCount="indefinite"/></circle>`).join('') : '';
  /* ---------- прозрачный куб объёмом 22,4 л с размерной линией ---------- */
  function куб(x,y,a,газ,подпись){
    const цг = газ==='H2'?'#9fe0a0':газ==='O2'?'#9fd0ff':газ==='CO2'?'#c8c8c8':газ==='N2'?'#c8b8ff':'#e8f0f8', d=a*0.32;
    return `<g>${тень(x+a/2,y,a*1.2,.35)}
      <path d="M${f(x)} ${f(y)} h${f(a)} l${f(d)} ${f(-d)} v${f(-a)} h${f(-a)} l${f(-d)} ${f(d)} Z" fill="${цг}" fill-opacity=".16"/>
      <path d="M${f(x)} ${f(y-a)} h${f(a)} l${f(d)} ${f(-d)} h${f(-a)} Z" fill="${цг}" fill-opacity=".22" stroke="#cfe2ee" stroke-width="1"/>
      <path d="M${f(x+a)} ${f(y)} l${f(d)} ${f(-d)} v${f(-a)} l${f(-d)} ${f(d)} Z" fill="${цг}" fill-opacity=".12" stroke="#cfe2ee" stroke-width="1"/>
      <rect x="${f(x)}" y="${f(y-a)}" width="${f(a)}" height="${f(a)}" fill="${цг}" fill-opacity=".1" stroke="#e8f4fa" stroke-width="1.4"/>
      <path d="M${f(x)} ${f(y)} l${f(d)} ${f(-d)} v${f(-a)} M${f(x+d)} ${f(y-d)} h${f(a)}" stroke="#cfe2ee" stroke-width=".8" stroke-dasharray="3 2" opacity=".6"/>
      ${ДВИЖ?Array.from({length:14},(_,k)=>`<circle cx="${f(x+8+(k*29)%(a-12))}" cy="${f(y-8-(k*17)%(a-12))}" r="1.6" fill="${цг}"><animateTransform attributeName="transform" type="translate" values="0 0;${(k%3)*4-4} ${(k%4)*3-4};0 0" dur="${0.8+(k%5)*0.2}s" repeatCount="indefinite"/></circle>`).join(''):''}
      <path d="M${f(x)} ${f(y+8)} h${f(a)} M${f(x)} ${f(y+4)} v8 M${f(x+a)} ${f(y+4)} v8" stroke="#ffd76a" stroke-width="1.2"/>
      <text x="${f(x+a/2)}" y="${f(y+20)}" text-anchor="middle" font-size="9" fill="#ffd76a" font-family="${ШРИФТ}">${esc(подпись||'28,2 см')}</text></g>`;
  }
  /* ---------- баскетбольный мяч для масштаба ---------- */
  function мячБ(x,y,r){
    const кл=ид('мяч');
    return `<g>${тень(x,y+r,r*2,.4)}<radialGradient id="${кл}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffb070"/><stop offset=".5" stop-color="#e0702a"/><stop offset="1" stop-color="#8a3a10"/></radialGradient>
      <circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="url(#${кл})"/>
      <path d="M${f(x-r)} ${f(y)} H${f(x+r)} M${f(x)} ${f(y-r)} V${f(y+r)} M${f(x-r*0.7)} ${f(y-r*0.7)} Q${f(x-r*0.2)} ${f(y)} ${f(x-r*0.7)} ${f(y+r*0.7)} M${f(x+r*0.7)} ${f(y-r*0.7)} Q${f(x+r*0.2)} ${f(y)} ${f(x+r*0.7)} ${f(y+r*0.7)}" stroke="#2a1408" stroke-width="1.2" fill="none"/></g>`;
  }
  /* ---------- стрелочный прибор (манометр/термометр-циферблат): значение 0..1 по шкале ---------- */
  function циферблат(x,y,r,доля,подпись,значение){
    const a=(-135+270*Math.max(0,Math.min(1,доля)))*Math.PI/180;
    return `<g>${тень(x,y+r,r*2,.3)}<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="#f4f4f0" stroke="url(#рл-сталь)" stroke-width="${f(r*0.14)}"/>
      ${Array.from({length:11},(_,k)=>{ const b=(-135+27*k)*Math.PI/180; return `<path d="M${f(x+Math.sin(b)*r*0.72)} ${f(y-Math.cos(b)*r*0.72)} L${f(x+Math.sin(b)*r*0.86)} ${f(y-Math.cos(b)*r*0.86)}" stroke="#333" stroke-width="${k%5?0.7:1.4}"/>`; }).join('')}
      <path d="M${f(x)} ${f(y)} L${f(x+Math.sin(a)*r*0.75)} ${f(y-Math.cos(a)*r*0.75)}" stroke="#c8402a" stroke-width="1.6" stroke-linecap="round"/><circle cx="${f(x)}" cy="${f(y)}" r="${f(r*0.08)}" fill="#333"/>
      <text x="${f(x)}" y="${f(y+r*0.45)}" text-anchor="middle" font-size="${f(r*0.28)}" font-weight="bold" fill="#222" font-family="${ШРИФТ}">${esc(значение)}</text>
      <text x="${f(x)}" y="${f(y+r+r*0.55)}" text-anchor="middle" font-size="${f(r*0.3)}" fill="#c8ced6" font-family="${ШРИФТ}">${esc(подпись)}</text></g>`;
  }

  /* ================= ГОРЕНИЕ (урок 52) ================= */
  /* ---------- газосборник (цилиндрическая склянка) с пластинкой: опц.газ ('O2'|'воздух'|'CO2'), опц.вода (доля воды внутри), опц.пластинка, опц.внутри ---------- */
  function газосборник(x,y,ш,в,опц){
    const о=опц||{}, кл=ид('гсб'), л=x-ш/2, вода=о.вода||0, цг=о.газ==='O2'?'#9fd0ff':о.газ==='CO2'?'#c8c8c8':null;
    return `<g>${о.безТени?'':тень(x,y,ш,.4)}
      <clipPath id="${кл}"><rect x="${f(л+2)}" y="${f(y-в+2)}" width="${f(ш-4)}" height="${f(в-4)}" rx="3"/></clipPath>
      <g clip-path="url(#${кл})">
        ${цг?`<rect x="${f(л)}" y="${f(y-в)}" width="${f(ш)}" height="${f(в)}" fill="${цг}" opacity=".12"/>`:''}
        ${вода>0?`<rect x="${f(л)}" y="${f(y-в*вода)}" width="${f(ш)}" height="${f(в*вода)}" fill="${цвет('вода')}"/><rect x="${f(л)}" y="${f(y-в*вода)}" width="${f(ш)}" height="${f(в*вода)}" fill="#6ab0d8" opacity=".22"/><rect x="${f(л)}" y="${f(y-в*вода)}" width="${f(ш)}" height="${f(в*вода)}" fill="url(#рл-жидкость)"/>${вода<1?`<path d="M${f(л)} ${f(y-в*вода)} H${f(л+ш)}" stroke="#bfe6fa" stroke-width="1.4"/>`:''}`:''}
        ${о.внутри||''}
      </g>
      <rect x="${f(л)}" y="${f(y-в)}" width="${f(ш)}" height="${f(в)}" rx="4" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width="1"/>
      <rect x="${f(л+3)}" y="${f(y-в+6)}" width="2.4" height="${f(в-12)}" rx="1" fill="#fff" opacity=".65"/>
      ${о.пластинка?`<rect x="${f(л-6)}" y="${f(о.перевёрнут?y-1:y-в-3)}" width="${f(ш+12)}" height="3.4" rx="1" fill="#dcebf5" fill-opacity=".55" stroke="#a8bccb" stroke-width=".6"/>`:''}
    </g>`;
  }
  /* ---------- лучинка: (x,y) — тлеющий конец, угол; вид 'тлеет'|'горит'|'нет' ---------- */
  function лучинка(x,y,угол,вид){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)})">
      <rect x="0" y="-2" width="70" height="4" rx="1.4" fill="#d8b47a"/><path d="M0 -1 H70" stroke="#a8844a" stroke-width=".6"/>
      <rect x="-3" y="-2.4" width="6" height="4.8" rx="2" fill="${вид==='нет'?'#2a2a2a':'#1a1210'}"/>
      ${вид==='тлеет'?`<circle cx="-2" cy="0" r="2.6" fill="#ff7a2a"><animate attributeName="opacity" values="1;.5;1" dur="1.2s" repeatCount="indefinite"/></circle><circle cx="-2" cy="0" r="7" fill="url(#рл-огонь)" opacity=".7"/>
        <path d="M-3 -4 q-3 -6 0 -12 q3 -6 0 -12" stroke="#9aa0a6" stroke-width="1.6" fill="none" opacity=".45"/>`:''}
      ${вид==='горит'?`<g transform="rotate(${f(-(угол||0))} 0 0)"><path d="M-3 0 Q-12 -14 -4 -30 Q4 -14 3 0 Z" fill="#ffb640">${ДВИЖ?`<animate attributeName="d" values="M-3 0 Q-12 -14 -4 -30 Q4 -14 3 0 Z;M-3 0 Q-10 -15 -2 -33 Q5 -14 3 0 Z;M-3 0 Q-12 -14 -4 -30 Q4 -14 3 0 Z" dur=".6s" repeatCount="indefinite"/>`:''}</path><path d="M-2 0 Q-6 -8 -2 -16 Q2 -8 2 0 Z" fill="#fff4a0"/><circle cx="-3" cy="-12" r="16" fill="url(#рл-огонь)" opacity=".45"/></g>`:''}
    </g>`;
  }
  /* ---------- ложечка для сжигания: (x,y) — чашечка; вещество и вид горения ---------- */
  function ложечка(x,y,вещ,горит,вКислороде){
    const пламя = !горит?'' : вещ==='сера' ? `<path d="M-7 -4 Q-9 ${вКислороде?-26:-14} 0 ${вКислороде?-34:-20} Q9 ${вКислороде?-26:-14} 7 -4 Z" fill="${вКислороде?'#5a7aff':'#8a9aff'}" opacity=".85">${ДВИЖ?`<animate attributeName="opacity" values=".85;.6;.85" dur=".5s" repeatCount="indefinite"/>`:''}</path><path d="M-3 -4 Q-4 -12 0 -18 Q4 -12 3 -4 Z" fill="#c8d8ff"/>`
      : вещ==='уголь' ? `<circle cx="0" cy="-3" r="${вКислороде?9:6}" fill="#ff8a2a" opacity=".9">${ДВИЖ?`<animate attributeName="r" values="${вКислороде?'8;10;8':'5;6;5'}" dur=".7s" repeatCount="indefinite"/>`:''}</circle><circle cx="0" cy="-3" r="${вКислороде?18:10}" fill="url(#рл-огонь)" opacity=".8"/>`
      : вещ==='железо' ? (вКислороде? `<circle cx="0" cy="0" r="14" fill="url(#рл-вспышка)"/>`+Array.from({length:12},(_,k)=>{ const a=k*0.52, d=14+(k%3)*8; return `<path d="M${f(Math.cos(a)*6)} ${f(Math.sin(a)*6)} L${f(Math.cos(a)*d)} ${f(Math.sin(a)*d)}" stroke="#ffe08a" stroke-width="1.4" stroke-linecap="round">${ДВИЖ?`<animate attributeName="opacity" values="1;0;1" dur="${f(0.3+(k%4)*0.1)}s" repeatCount="indefinite"/>`:''}</path>`; }).join('') : `<circle cx="0" cy="0" r="4" fill="#ff8a2a" opacity=".8"/>`)
      : '';
    return `<g transform="translate(${f(x)} ${f(y)})">
      <path d="M0 0 V-70" stroke="url(#рл-сталь)" stroke-width="2.4"/>
      ${вещ==='железо'?`<path d="M0 0 q4 6 0 10 q-4 4 0 8 q4 4 0 8" stroke="#6a7078" stroke-width="1.4" fill="none"/>`
        :`<path d="M-8 -2 Q-8 6 0 6 Q8 6 8 -2 Z" fill="url(#рл-сталь)"/>${вещ==='сера'?`<ellipse cx="0" cy="-2" rx="6" ry="2.4" fill="#f2d22a"/>`:вещ==='уголь'?`<path d="M-5 -2 l3 -4 4 1 3 3 Z" fill="#1a1b1d"/>`:''}`}
      ${пламя}
      <rect x="-12" y="-74" width="24" height="4" rx="2" fill="#dcebf5" fill-opacity=".5" stroke="#a8bccb" stroke-width=".6"/>
    </g>`;
  }
  /* ---------- свеча: (x,y) — низ; горит; опц.колпак — стеклянный стакан сверху (гасит) ---------- */
  function свеча(x,y,м,горит,колпак){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,30,.4)}
      <rect x="-7" y="-40" width="14" height="40" rx="2" fill="#f4ece0"/><rect x="-7" y="-40" width="5" height="40" fill="#fff" opacity=".5"/>
      <path d="M-7 -40 Q0 -36 7 -40" stroke="#e8dcc8" stroke-width="2" fill="none"/>
      <path d="M0 -40 V-46" stroke="#2a2018" stroke-width="1.4"/>
      ${горит?`<path d="M0 -44 Q-6 -54 0 -68 Q6 -54 0 -44 Z" fill="#ffb640">${ДВИЖ?`<animate attributeName="d" values="M0 -44 Q-6 -54 0 -68 Q6 -54 0 -44 Z;M0 -44 Q-5 -55 1 -70 Q6 -54 0 -44 Z;M0 -44 Q-6 -54 0 -68 Q6 -54 0 -44 Z" dur=".8s" repeatCount="indefinite"/>`:''}</path><path d="M0 -45 Q-2 -50 0 -54 Q2 -50 0 -45 Z" fill="#7ab8ff"/><circle cx="0" cy="-56" r="20" fill="url(#рл-огонь)" opacity=".4"/>`
        :`<path d="M0 -46 q-3 -8 0 -14 q3 -8 0 -16" stroke="#9aa0a6" stroke-width="1.6" fill="none" opacity=".5"/>`}
      ${колпак?`<path d="M-22 0 V-86 Q-22 -92 -16 -92 H16 Q22 -92 22 -86 V0" fill="#dcebf5" fill-opacity=".12" stroke="#a8bccb" stroke-opacity=".7" stroke-width="1"/><rect x="-19" y="-88" width="2.4" height="80" fill="#fff" opacity=".5"/>`:''}
    </g>`;
  }
  /* ---------- пробирка с KMnO₄, закреплённая горизонтально: дно слева, горло справа и чуть ниже (угол > 0); вата у горла ---------- */
  function пробиркаKMnO4(x,y,угол,опц){
    const о=опц||{};
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол)})">
      <path d="M88 -8 H8 A8 8 0 0 0 8 8 H88" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".9"/>
      ${о.вещество!==false?`<path d="M2 3 Q2 7 8 7.4 H34 Q30 2 18 2.6 Z" fill="${о.остаток?'#2e2622':'#4a1a5a'}"/>${Array.from({length:9},(_,k)=>`<rect x="${4+k*3.2}" y="${3+(k%3)*0.8}" width="2" height="2" fill="${о.остаток?'#4a3a30':'#8a3a9a'}" transform="rotate(${k*30} ${5+k*3.2} ${4+(k%3)})"/>`).join('')}`:''}
      ${о.вата?`<path d="M78 -6 q-3 3 0 6 q-3 3 0 6 h8 v-12 Z" fill="#f4f4f0"/><path d="M80 -5 q2 2 0 4" stroke="#d8d8d0" stroke-width=".8" fill="none"/>`:''}
      <path d="M10 -5 H86" stroke="#fff" stroke-width="1.2" opacity=".55"/>
      ${о.пробка?`<rect x="86" y="-7" width="10" height="14" rx="2" fill="#8a3a2a"/>`:''}
      ${о.пары?`<path d="M40 -2 q8 -4 16 0 q8 4 16 0" stroke="#d0b0e0" stroke-width="2" fill="none" opacity=".5">${ДВИЖ?`<animate attributeName="opacity" values=".1;.5;.1" dur="1.2s" repeatCount="indefinite"/>`:''}</path>`:''}
    </g>`;
  }
  /* ---------- треугольник огня: три стороны — горючее, кислород, температура; включено — объект {г,к,т} ---------- */
  function треугольникОгня(cx,cy,r,вкл){
    const p=[[cx,cy-r],[cx+r*0.87,cy+r*0.5],[cx-r*0.87,cy+r*0.5]];
    const стор=[[0,1,'к','кислород'],[1,2,'т','температура'],[2,0,'г','горючее']];
    const все=вкл.г&&вкл.к&&вкл.т;
    return `<g>${стор.map(([a,b,к,имя])=>{ const ок=вкл[к], mx=(p[a][0]+p[b][0])/2, my=(p[a][1]+p[b][1])/2, dx=mx-cx, dy=my-cy, dl=Math.hypot(dx,dy);
        return `<path d="M${f(p[a][0])} ${f(p[a][1])} L${f(p[b][0])} ${f(p[b][1])}" stroke="${ок?'#ff9a40':'#4a525c'}" stroke-width="7" stroke-linecap="round" ${ок?'':'stroke-dasharray="6 6"'}/>
          <text x="${f(mx+dx/dl*12)}" y="${f(my+dy/dl*14+4)}" text-anchor="${Math.abs(dx/dl)<0.3?'middle':dx>0?'start':'end'}" font-size="11" font-weight="bold" fill="${ок?'#ffd0a0':'#7a838d'}" font-family="${ШРИФТ}">${имя}</text>`; }).join('')}
      ${все?`<path d="M${f(cx)} ${f(cy+10)} Q${f(cx-12)} ${f(cy-6)} ${f(cx)} ${f(cy-26)} Q${f(cx+12)} ${f(cy-6)} ${f(cx)} ${f(cy+10)} Z" fill="#ff9a40">${ДВИЖ?`<animate attributeName="d" values="M${f(cx)} ${f(cy+10)} Q${f(cx-12)} ${f(cy-6)} ${f(cx)} ${f(cy-26)} Q${f(cx+12)} ${f(cy-6)} ${f(cx)} ${f(cy+10)} Z;M${f(cx)} ${f(cy+10)} Q${f(cx-10)} ${f(cy-8)} ${f(cx+2)} ${f(cy-30)} Q${f(cx+12)} ${f(cy-6)} ${f(cx)} ${f(cy+10)} Z;M${f(cx)} ${f(cy+10)} Q${f(cx-12)} ${f(cy-6)} ${f(cx)} ${f(cy-26)} Q${f(cx+12)} ${f(cy-6)} ${f(cx)} ${f(cy+10)} Z" dur=".7s" repeatCount="indefinite"/>`:''}</path><path d="M${f(cx)} ${f(cy+8)} Q${f(cx-5)} ${f(cy)} ${f(cx)} ${f(cy-10)} Q${f(cx+5)} ${f(cy)} ${f(cx)} ${f(cy+8)} Z" fill="#fff4a0"/>`
        :`<path d="M${f(cx)} ${f(cy+6)} q-4 -8 0 -14 q4 -8 0 -16" stroke="#7a838d" stroke-width="2" fill="none"/>`}</g>`;
  }

  /* ================= РАСТВОРИМОСТЬ (урок 53) ================= */
  /* ---------- электроплитка: (x,y) — низ; ш; опц.вкл (раскалённая спираль), опц.ручка 0..1 ---------- */
  function плитка(x,y,ш,опц){
    const о=опц||{}, в=ш*0.18, л=x-ш/2;
    return `<g>${тень(x,y,ш,.5)}
      <rect x="${f(л)}" y="${f(y-в)}" width="${f(ш)}" height="${f(в)}" rx="4" fill="url(#рл-пластик)"/>
      <rect x="${f(л)}" y="${f(y-в)}" width="${f(ш)}" height="3" rx="1.5" fill="#fff" opacity=".6"/>
      <ellipse cx="${f(x)}" cy="${f(y-в-2)}" rx="${f(ш*0.42)}" ry="${f(ш*0.07)}" fill="#2a2d32"/>
      <ellipse cx="${f(x)}" cy="${f(y-в-2)}" rx="${f(ш*0.34)}" ry="${f(ш*0.055)}" fill="none" stroke="${о.вкл?'#ff6a2a':'#4a4e54'}" stroke-width="2" ${о.вкл&&ДВИЖ?'':''}>${о.вкл&&ДВИЖ?`<animate attributeName="stroke" values="#ff6a2a;#ffaa4a;#ff6a2a" dur="1.4s" repeatCount="indefinite"/>`:''}</ellipse>
      <ellipse cx="${f(x)}" cy="${f(y-в-2)}" rx="${f(ш*0.2)}" ry="${f(ш*0.032)}" fill="none" stroke="${о.вкл?'#ff6a2a':'#4a4e54'}" stroke-width="1.6"/>
      ${о.вкл?`<ellipse cx="${f(x)}" cy="${f(y-в-6)}" rx="${f(ш*0.46)}" ry="${f(ш*0.12)}" fill="url(#рл-огонь)" opacity=".45"/>`:''}
      <circle cx="${f(x+ш*0.36)}" cy="${f(y-в/2)}" r="${f(в*0.3)}" fill="#3a3e44"/><path d="M${f(x+ш*0.36)} ${f(y-в/2)} l${f(Math.cos((о.ручка||0)*4-2)*в*0.26)} ${f(Math.sin((о.ручка||0)*4-2)*в*0.26)}" stroke="#fff" stroke-width="1.4"/>
      <circle cx="${f(x-ш*0.36)}" cy="${f(y-в/2)}" r="2" fill="${о.вкл?'#ff4a2a':'#4a2a2a'}"/>
    </g>`;
  }
  /* ---------- лабораторный термометр, опущенный в сосуд: (x,yниз) — шарик, длина, t °C (0..100) ---------- */
  function термометр(x,yн,дл,t){
    const h=(дл-14)*Math.max(0,Math.min(1,(t+10)/110));
    let дел=''; for(let k=0;k<=100;k+=20){ const yy=yн-8-(дл-14)*(k+10)/110; дел+=`<path d="M${f(x+3)} ${f(yy)} h4" stroke="#333" stroke-width=".7"/><text x="${f(x+8)}" y="${f(yy+2)}" font-size="4.6" fill="#222" font-family="${ШРИФТ}">${k}</text>`; }
    return `<g><rect x="${f(x-4)}" y="${f(yн-дл)}" width="16" height="${f(дл)}" rx="4" fill="#f4f6f8" fill-opacity=".85" stroke="#a8b0b8" stroke-width=".7"/>
      <rect x="${f(x-1)}" y="${f(yн-8-h)}" width="2" height="${f(h)}" fill="#d8302a"/><circle cx="${f(x)}" cy="${f(yн-4)}" r="3.4" fill="#d8302a"/>${дел}</g>`;
  }
  /* ---------- бутылка газировки: (x,y) — низ; опц.пузыри (интенсивность 0..1), опц.тёплая ---------- */
  function газировка(x,y,м,опц){
    const о=опц||{}, кл=ид('газ'), n=Math.round((о.пузыри||0)*16);
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,30,.4)}
      <clipPath id="${кл}"><path d="M-12 0 V-50 Q-12 -62 -5 -70 V-82 H5 V-70 Q12 -62 12 -50 V0 Z"/></clipPath>
      <g clip-path="url(#${кл})"><rect x="-14" y="-64" width="28" height="66" fill="hsla(${о.тёплая?30:200},50%,70%,.35)"/>
        ${ДВИЖ?Array.from({length:n},(_,k)=>`<circle cx="${-8+(k*7)%16}" cy="0" r="${0.8+(k%3)*0.4}" fill="none" stroke="#fff" stroke-width=".6"><animate attributeName="cy" values="0;-64" dur="${f(0.8+(k%5)*0.3)}s" begin="${f((k%7)*0.17)}s" repeatCount="indefinite"/></circle>`).join(''):''}</g>
      <path d="M-12 0 V-50 Q-12 -62 -5 -70 V-82 H5 V-70 Q12 -62 12 -50 V0 Z" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".8"/>
      <rect x="-12" y="-44" width="24" height="16" fill="${о.тёплая?'#c8402a':'#2a6ab8'}"/><text x="0" y="-33" text-anchor="middle" font-size="6.5" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">${о.тёплая?'+30 °C':'+5 °C'}</text>
      <rect x="-6" y="-90" width="12" height="8" rx="2" fill="${о.тёплая?'#c8402a':'#2a6ab8'}"/>
    </g>`;
  }

  /* ================= КИСЛОТЫ (урок 54) ================= */
  /* ---------- штатив для пробирок с пробирками: (x,y) — середина низа; шаг между пробирками; пробирки — массив
     {цвет, уровень, металл:'Mg'|'Zn'|'Fe'|'Cu', пузыри:0..1, подпись} (null — пустое гнездо) ---------- */
  function штативПробирок(x,y,шаг,пробирки,м){
    const n=пробирки.length, ш=n*шаг+16, л=x-ш/2, k=м||1;
    const трубка=(p,cx)=>{ if(!p) return ''; const кл=ид('прб'), h=70*(p.уровень||0.4), низ=y-10, верх=низ-84*k;
      const мет = p.металл==='Mg' ? `<rect x="${f(cx-5)}" y="${f(низ-10)}" width="10" height="2.4" fill="#d8dde2" transform="rotate(-20 ${f(cx)} ${f(низ-9)})"/>`
        : p.металл==='Zn' ? `<circle cx="${f(cx-2)}" cy="${f(низ-5)}" r="3.2" fill="#9aa0a8"/><circle cx="${f(cx+3)}" cy="${f(низ-4)}" r="2.6" fill="#b8bec6"/>`
        : p.металл==='Fe' ? `<path d="M${f(cx-4)} ${f(низ-3)} l3 -8 M${f(cx)} ${f(низ-3)} l2 -9 M${f(cx+3)} ${f(низ-3)} l-1 -7" stroke="#5a5f66" stroke-width="1.6"/>`
        : p.металл==='Cu' ? `<rect x="${f(cx-5)}" y="${f(низ-8)}" width="10" height="4" rx="1" fill="#c87a3a"/>` : '';
      const пуз = p.пузыри&&ДВИЖ ? Array.from({length:Math.round(3+p.пузыри*12)},(_,j)=>`<circle cx="${f(cx-4+(j*5)%8)}" cy="${f(низ-6)}" r="${f(0.8+(j%3)*0.5)}" fill="none" stroke="#fff" stroke-width=".6"><animate attributeName="cy" values="${f(низ-6)};${f(низ-6-h*k+4)}" dur="${f(1.6-p.пузыри*1.1+(j%4)*0.15)}s" begin="${f((j%5)*0.12)}s" repeatCount="indefinite"/></circle>`).join('') : '';
      return `<g><clipPath id="${кл}"><path d="M${f(cx-7)} ${f(верх)} V${f(низ-6)} A7 7 0 0 0 ${f(cx+7)} ${f(низ-6)} V${f(верх)} Z"/></clipPath>
        <g clip-path="url(#${кл})">${h>0?`<rect x="${f(cx-8)}" y="${f(низ-h*k)}" width="16" height="${f(h*k+2)}" fill="${p.цвет||цвет('вода')}"/><rect x="${f(cx-8)}" y="${f(низ-h*k)}" width="16" height="${f(h*k+2)}" fill="url(#рл-жидкость)"/><path d="M${f(cx-7)} ${f(низ-h*k)} H${f(cx+7)}" stroke="#fff" stroke-width=".8" opacity=".6"/>`:''}${мет}${пуз}</g>
        <path d="M${f(cx-7.5)} ${f(верх)} V${f(низ-6)} A7.5 7.5 0 0 0 ${f(cx+7.5)} ${f(низ-6)} V${f(верх)}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".6" stroke-width=".8"/>
        <path d="M${f(cx-4.5)} ${f(верх+4)} V${f(низ-10)}" stroke="#fff" stroke-width="1.4" opacity=".55" stroke-linecap="round"/>
        <ellipse cx="${f(cx)}" cy="${f(верх)}" rx="8" ry="1.8" fill="none" stroke="#fff" stroke-width="1" opacity=".7"/>
        ${p.подпись?`<text x="${f(cx)}" y="${f(y+12)}" text-anchor="middle" font-size="7" fill="#c8ced6" font-family="${ШРИФТ}">${esc(p.подпись)}</text>`:''}</g>`; };
    const xs=пробирки.map((_,i)=>л+8+шаг*(i+0.5));
    return `<g>${тень(x,y,ш,.45)}
      <rect x="${f(л)}" y="${f(y-8)}" width="${f(ш)}" height="8" rx="2" fill="url(#рл-доска)"/>
      <rect x="${f(л+2)}" y="${f(y-8-50*k)}" width="5" height="${f(50*k)}" fill="url(#рл-доскатём)"/><rect x="${f(л+ш-7)}" y="${f(y-8-50*k)}" width="5" height="${f(50*k)}" fill="url(#рл-доскатём)"/>
      ${пробирки.map((p,i)=>трубка(p,xs[i])).join('')}
      <rect x="${f(л)}" y="${f(y-8-50*k)}" width="${f(ш)}" height="9" rx="2" fill="url(#рл-доска)"/>
      ${xs.map(cx=>`<ellipse cx="${f(cx)}" cy="${f(y-4-50*k)}" rx="8.5" ry="2" fill="#3a2410"/>`).join('')}
    </g>`;
  }
  /* ---------- «хлопок» — звуковая вспышка у отверстия: (x,y), чистый — глухой хлопок, иначе лающий ---------- */
  function хлопок(x,y,чистый){
    return `<g><circle cx="${f(x)}" cy="${f(y)}" r="16" fill="url(#рл-вспышка)" opacity=".85">${ДВИЖ?`<animate attributeName="r" values="6;22;6" dur="1s" repeatCount="indefinite"/>`:''}</circle>
      ${[0,1,2].map(k=>`<path d="M${f(x+18+k*8)} ${f(y-10-k*4)} q6 ${f(10+k*4)} 0 ${f(20+k*8)}" stroke="#ffe08a" stroke-width="${2-k*0.4}" fill="none" opacity=".8"/>`).join('')}
      <text x="${f(x+34)}" y="${f(y-16)}" font-size="13" font-weight="bold" fill="#ffd76a" font-family="${ШРИФТ}">${чистый?'пах!':'гав!'}</text></g>`;
  }

  /* ---------- колпачок спиртовки отдельно: (x,y) — низ ---------- */
  function колпачок(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})"><ellipse cx="1" cy="0.5" rx="9" ry="1.6" fill="#000" opacity=".35"/><path d="M-7 0 Q-7 -14 0 -14 Q7 -14 7 0 Z" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-opacity=".7" stroke-width=".8"/><path d="M-4 -3 Q-4 -10 -1 -11" stroke="#fff" stroke-width="1.2" fill="none" opacity=".7"/></g>`;
  }
  /* ---------- спичка: (x,y) — головка; угол; горит ---------- */
  function спичка(x,y,угол,горит){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)})">
      <rect x="0" y="-1.4" width="40" height="2.8" rx="1" fill="#e8c890"/><path d="M2 -0.6 H40" stroke="#c8a060" stroke-width=".6"/>
      <ellipse cx="0" cy="0" rx="3.6" ry="2.6" fill="${горит?'#3a2a20':'#b8302a'}"/>
      ${горит?`<g transform="rotate(${f(-(угол||0))} 0 0)"><path d="M-3 0 Q-9 -10 -1 -22 Q5 -10 3 0 Z" fill="#ffb640">${ДВИЖ?`<animate attributeName="d" values="M-3 0 Q-9 -10 -1 -22 Q5 -10 3 0 Z;M-3 0 Q-8 -11 0 -24 Q6 -10 3 0 Z;M-3 0 Q-9 -10 -1 -22 Q5 -10 3 0 Z" dur=".6s" repeatCount="indefinite"/>`:''}</path><path d="M-1.4 -1 Q-3 -6 0 -10 Q2 -6 1.4 -1 Z" fill="#7ab8ff" opacity=".8"/><circle cx="0" cy="-8" r="12" fill="url(#рл-огонь)" opacity=".4"/></g>`:''}
    </g>`;
  }
  /* ---------- коробок спичек: (x,y) — низ середины ---------- */
  function коробок(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,40,.35)}<rect x="-20" y="-12" width="40" height="12" rx="1.5" fill="#e8dcc0"/><rect x="-20" y="-12" width="40" height="5" fill="#c8402a"/><rect x="-20" y="-3" width="40" height="3" fill="#6a4a3a"/><text x="0" y="-8" text-anchor="middle" font-size="4" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">СПИЧКИ</text></g>`;
  }
  /* ---------- держатель для пробирок: (x,y) — зажим; ручка уходит влево-вниз по углу ---------- */
  function держатель(x,y,угол){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)})">
      <rect x="-76" y="-3" width="58" height="6" rx="2" fill="url(#рл-доска)"/><path d="M-74 -1.5 H-20" stroke="#f0d0a0" stroke-width=".8" opacity=".7"/>
      <path d="M-20 -3 L4 -5 M-20 3 L4 5" stroke="url(#рл-сталь)" stroke-width="2.2" fill="none"/><path d="M-14 -3 Q-10 -9 -6 -4" stroke="#9aa0a8" stroke-width="1.4" fill="none"/>
      <rect x="2" y="-8" width="4" height="16" rx="1" fill="#9aa0a8"/>
    </g>`;
  }
  /* ---------- водопроводный кран: (x,y) — носик; течёт — струя длиной д ---------- */
  function кран(x,y,м,течёт,д){
    const к=м||1, дл=д||70;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${к})">
      <rect x="-64" y="-40" width="14" height="40" rx="3" fill="url(#рл-сталь)"/><rect x="-62" y="-44" width="10" height="6" rx="2" fill="#c8ccd0"/>
      <path d="M-50 -30 H-14 Q0 -30 0 -16 V-4" stroke="url(#рл-сталь)" stroke-width="9" fill="none" stroke-linecap="round"/>
      <path d="M-50 -33 H-14 Q-2 -33 -2 -20" stroke="#fff" stroke-width="1.6" fill="none" opacity=".6"/>
      <rect x="-40" y="-46" width="14" height="10" rx="2" fill="#2a6ab8"/><rect x="-46" y="-50" width="26" height="5" rx="2.5" fill="#3a8ae8"/>
      ${течёт?`<rect x="-3" y="-2" width="6" height="${f(дл/к)}" rx="3" fill="hsla(198,80%,75%,.65)"/><path d="M-1 -2 V${f(дл/к)}" stroke="#fff" stroke-width="1.2" opacity=".7" stroke-dasharray="5 7">${ДВИЖ?`<animate attributeName="stroke-dashoffset" values="24;0" dur=".4s" repeatCount="indefinite"/>`:''}</path>`:''}
    </g>`;
  }
  /* ---------- знак опасности (ромб с красной каймой): (x,y) — центр, р — от центра до вершины;
     вид 'огонь' | 'едкое' | 'череп' | '!' ---------- */
  function знак(x,y,р,вид){
    const к=р/30;
    const рис = вид==='огонь' ? `<path d="M-11 9 Q-15 -2 -7 -9 Q-7 -3 -3 -2 Q-6 -12 3 -18 Q2 -9 8 -5 Q10 -9 9 -12 Q16 -3 11 9 Z" fill="#111"/><rect x="-13" y="10" width="26" height="3" fill="#111"/>`
      : вид==='едкое' ? `<g transform="rotate(-35 -8 -14)"><rect x="-12" y="-20" width="8" height="13" rx="1.5" fill="#111"/></g><g transform="rotate(35 8 -14)"><rect x="4" y="-20" width="8" height="13" rx="1.5" fill="#111"/></g>
          <path d="M-6 -6 v3 M-6 0 v2 M6 -6 v3 M6 0 v2" stroke="#111" stroke-width="2" stroke-linecap="round"/>
          <path d="M-17 13 V8 H-9 L-7 6 L-5 8 H-1 V13 Z" fill="#111"/>
          <path d="M3 13 V7 Q3 5 4.6 5 V1.5 Q5.4 0 6.2 1.5 V5 L7 0.5 Q7.8 -1 8.6 0.5 V5 L9.4 1 Q10.2 -0.5 11 1 V5.5 L11.8 3 Q12.8 2 13.4 3.4 L13 9 Q12 13 9 13 Z" fill="#111"/><path d="M6 5 l1.5 2 l1.5 -2" stroke="#fff" stroke-width=".9" fill="none"/>`
      : вид==='череп' ? `<path d="M-9 -3 Q-10 -16 0 -16 Q10 -16 9 -3 Q9 2 5 3 V7 H-5 V3 Q-9 2 -9 -3 Z" fill="#111"/><circle cx="-4" cy="-6" r="2.8" fill="#fff"/><circle cx="4" cy="-6" r="2.8" fill="#fff"/><path d="M0 -2 L-1.4 1 H1.4 Z" fill="#fff"/>
          <path d="M-14 6 L14 16 M-14 16 L14 6" stroke="#111" stroke-width="3" stroke-linecap="round"/>`
      : `<rect x="-3" y="-17" width="6" height="22" rx="2" fill="#111"/><circle cx="0" cy="11" r="3.4" fill="#111"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${f(к)})"><path d="M0 -30 L30 0 L0 30 L-30 0 Z" fill="#fff" stroke="#d81e1e" stroke-width="4.4" stroke-linejoin="round"/>${рис}</g>`;
  }
  /* ---------- лаборант в полный рост: (x,y) — ступни; э = {халат, очки, перчатки, волосы:'собраны'|'распущены', шарф} ---------- */
  function лаборант(x,y,м,э){
    const о=э||{}, кожа='#f2c8a0', волос='#6a3a1a', свитер='#3a8a8a';
    const рука=(з)=>`<path d="M${30*з} -124 Q${42*з} -120 ${43*з} -100 L${45*з} -72 H${35*з} L${32*з} -100 Z" fill="${о.халат?'#f4f6f8':свитер}" ${о.халат?'stroke="#c8ccd0" stroke-width=".8"':''}/>`;
    const кисть=(з)=>о.перчатки ? `<path d="M${40*з-6} -74 h12 v6 Q${40*з+7} -58 ${40*з} -56 Q${40*з-7} -58 ${40*з-6} -68 Z" fill="url(#рл-перчатка)"/><rect x="${40*з-7}" y="-76" width="14" height="4" rx="1.5" fill="#2a5aa8"/>`
      : `<circle cx="${40*з}" cy="-66" r="6" fill="${кожа}"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">
      <ellipse cx="0" cy="0" rx="34" ry="4" fill="#000" opacity=".35"/>
      <rect x="-17" y="-62" width="14" height="58" rx="3" fill="#34405a"/><rect x="3" y="-62" width="14" height="58" rx="3" fill="#34405a"/>
      <ellipse cx="-11" cy="-3" rx="11" ry="4.4" fill="#22252a"/><ellipse cx="11" cy="-3" rx="11" ry="4.4" fill="#22252a"/>
      <path d="M-26 -128 Q-30 -128 -30 -118 L-28 -58 H28 L30 -118 Q30 -128 26 -128 Z" fill="${свитер}"/>
      ${о.халат?`<path d="M-31 -126 Q-34 -126 -31 -116 L-35 -32 H35 L31 -116 Q34 -126 31 -126 L9 -131 L0 -100 L-9 -131 Z" fill="#f4f6f8" stroke="#c8ccd0" stroke-width=".9"/>
        <path d="M-9 -131 L0 -100 L9 -131" fill="${свитер}"/><path d="M-9 -131 L-2 -96 M9 -131 L2 -96" stroke="#c8ccd0" stroke-width="1.2" fill="none"/><path d="M0 -98 V-34" stroke="#d8dce0" stroke-width="1"/>
        ${[-86,-68,-50].map(yy=>`<circle cx="3" cy="${yy}" r="1.6" fill="#9aa0a8"/>`).join('')}<rect x="12" y="-72" width="13" height="11" rx="1.5" fill="none" stroke="#c8ccd0"/><rect x="-25" y="-108" width="10" height="8" rx="1" fill="none" stroke="#c8ccd0"/><path d="M-22 -110 v-5" stroke="#2a6ab8" stroke-width="1.6"/>`:''}
      ${рука(-1)}${рука(1)}${кисть(-1)}${кисть(1)}
      <rect x="-6" y="-138" width="12" height="11" fill="${кожа}"/>
      ${о.шарф?`<path d="M-15 -137 Q0 -128 15 -137 L15 -127 Q0 -118 -15 -127 Z" fill="#d83a3a"/><path d="M5 -128 L13 -76 L4 -74 L-1 -125 Z" fill="#c82a2a"/>${[0,1,2].map(k=>`<path d="M${5+k*3} -75 v6" stroke="#d83a3a" stroke-width="1.4"/>`).join('')}`:''}
      ${о.волосы==='собраны'?'':`<path d="M-18 -158 Q-27 -130 -23 -106 H-14 Q-18 -128 -13 -150 Z" fill="${волос}"/><path d="M18 -158 Q27 -130 23 -106 H14 Q18 -128 13 -150 Z" fill="${волос}"/>`}
      <circle cx="-18" cy="-152" r="4" fill="${кожа}"/><circle cx="18" cy="-152" r="4" fill="${кожа}"/>
      <circle cx="0" cy="-153" r="18" fill="${кожа}"/>
      <circle cx="-6" cy="-155" r="1.9" fill="#2a2a2a"/><circle cx="6" cy="-155" r="1.9" fill="#2a2a2a"/>
      <path d="M-5 -145 Q0 -141 5 -145" stroke="#9a4a3a" stroke-width="1.4" fill="none" stroke-linecap="round"/><circle cx="-11" cy="-148" r="3" fill="#ff9a9a" opacity=".35"/><circle cx="11" cy="-148" r="3" fill="#ff9a9a" opacity=".35"/>
      <path d="M-19 -154 Q-21 -175 0 -175 Q21 -175 19 -154 Q12 -167 0 -165 Q-12 -167 -19 -154 Z" fill="${волос}"/>
      ${о.волосы==='собраны'?`<circle cx="0" cy="-178" r="7.5" fill="${волос}"/><rect x="-5" y="-173" width="10" height="3" rx="1.5" fill="#e85a9a"/>`:''}
      ${о.очки?`<path d="M-19 -157 H-15 M15 -157 H19" stroke="#2a3a4a" stroke-width="2.4"/><rect x="-15" y="-162" width="30" height="11" rx="5" fill="rgba(200,232,250,.45)" stroke="#2a3a4a" stroke-width="1.5"/><path d="M-11 -160 h6" stroke="#fff" stroke-width="1.2" opacity=".8"/>`:''}
    </g>`;
  }

  /* ---------- плоская батарейка 4,5 В: (x,y) — низ середины ---------- */
  function батарейка(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,52,.45)}
      <rect x="-26" y="-36" width="52" height="36" rx="3" fill="#2a5ab8"/><rect x="-26" y="-36" width="52" height="12" rx="3" fill="#e8402a"/><rect x="-22" y="-32" width="5" height="28" rx="2" fill="#fff" opacity=".2"/>
      <text x="0" y="-12" text-anchor="middle" font-size="9" font-weight="bold" fill="#fff" font-family="${ШРИФТ}">4,5 В</text>
      <path d="M-14 -36 V-48 Q-14 -50 -12 -50 H-8" stroke="#d8b46a" stroke-width="3" fill="none"/><path d="M12 -36 V-44 Q12 -46 14 -46 H18" stroke="#d8b46a" stroke-width="3" fill="none"/>
      <text x="-20" y="-40" font-size="8" font-weight="bold" fill="#e8402a" font-family="${ШРИФТ}">+</text><text x="20" y="-38" font-size="9" font-weight="bold" fill="#8ab8ff" font-family="${ШРИФТ}">−</text>
    </g>`;
  }
  /* ---------- лампочка на подставке: (x,y) — низ середины; горит — свечение ---------- */
  function лампочка(x,y,м,горит){
    const кл=ид('лмп');
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,40,.45)}
      ${горит?`<radialGradient id="${кл}" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset=".4" stop-color="#ffd860" stop-opacity=".35"/><stop offset="1" stop-color="#ffb030" stop-opacity="0"/></radialGradient><circle cx="0" cy="-46" r="48" fill="url(#${кл})">${ДВИЖ?`<animate attributeName="r" values="46;50;46" dur="1.6s" repeatCount="indefinite"/>`:''}</circle>`:''}
      <rect x="-20" y="-8" width="40" height="8" rx="2" fill="url(#рл-доска)"/><rect x="-7" y="-26" width="14" height="18" rx="2" fill="url(#рл-сталь)"/>${[0,1,2].map(k=>`<path d="M-7 ${-24+k*5} H7" stroke="#6a7078" stroke-width="1"/>`).join('')}
      <path d="M-6 -26 Q-16 -36 -16 -48 Q-16 -64 0 -64 Q16 -64 16 -48 Q16 -36 6 -26 Z" fill="${горит?'#fff8d8':'#dcebf5'}" fill-opacity="${горит?.95:.3}" stroke="#8fa8b8" stroke-width=".9"/>
      <path d="M-3 -27 L-4 -44 M3 -27 L4 -44" stroke="#6a6a6a" stroke-width=".8"/><path d="M-4 -44 q2 -4 4 0 q2 4 4 0" stroke="${горит?'#ff8a20':'#5a5a5a'}" stroke-width="${горит?1.6:1}" fill="none"/>
      <path d="M-10 -52 Q-10 -60 -3 -61" stroke="#fff" stroke-width="1.6" fill="none" opacity=".7"/>
      <circle cx="-17" cy="-4" r="2" fill="#d8b46a"/><circle cx="17" cy="-4" r="2" fill="#d8b46a"/>
    </g>`;
  }
  /* ---------- зажим «крокодил»: (x,y) — губки; угол ---------- */
  function крокодил(x,y,угол,цв){
    return `<g transform="translate(${f(x)} ${f(y)}) rotate(${f(угол||0)})"><path d="M0 -3 L14 -4 L22 -2 L22 2 L14 4 L0 3 Z" fill="url(#рл-сталь)"/><path d="M1 -3 l2 2 l2 -2 l2 2 l2 -2 l2 2" stroke="#6a7078" stroke-width=".7" fill="none"/>
      <rect x="20" y="-4" width="12" height="8" rx="3" fill="${цв||'#e8402a'}"/></g>`;
  }
  /* ---------- образцы простых веществ: (x,y) — низ середины; вид — символ; м; плоский — после удара молотком ---------- */
  function образец(x,y,вид,м,плоский){
    const к=м||1;
    let тело='';
    if(вид==='Fe') тело = плоский ? `<path d="M-30 -3 Q-6 -10 26 -6 L30 -2 Q0 2 -30 0 Z" fill="url(#рл-сталь)"/><ellipse cx="-30" cy="-2" rx="3" ry="5" fill="#9aa0a8"/>`
      : `<path d="M-24 -6 H20 L28 -4 L20 -2 H-24 Z" fill="url(#рл-сталь)"/><rect x="-28" y="-10" width="4" height="12" rx="1.4" fill="#9aa0a8"/><path d="M-22 -5.5 H18" stroke="#fff" stroke-width=".8" opacity=".7"/>`;
    else if(вид==='Cu') тело = плоский ? `<path d="M-30 -2 Q-10 -9 10 -6 Q24 -4 30 -1 Q0 2 -30 0 Z" fill="#d8844a"/><path d="M-24 -4 Q0 -8 24 -4" stroke="#ffc090" stroke-width="1.2" fill="none"/>`
      : Array.from({length:6},(_,k)=>`<ellipse cx="${-15+k*6}" cy="-9" rx="4" ry="8" fill="none" stroke="#b8642a" stroke-width="2.6"/><path d="M${-18+k*6} -15 q2 -2 4 0" stroke="#ffc090" stroke-width="1" fill="none"/>`).join('') + `<path d="M-19 -9 H-28 M21 -9 H28" stroke="#b8642a" stroke-width="2.6"/>`;
    else if(вид==='Al') тело = плоский ? `<path d="M-34 -1 L-20 -6 L30 -5 L34 0 Z" fill="#c8ccd2"/><path d="M-18 -4 L26 -4" stroke="#fff" stroke-width="1" opacity=".8"/>`
      : `<path d="M-24 -2 L-18 -12 L24 -12 L18 -2 Z" fill="#c8ccd2"/><path d="M-24 -2 H18 V0 H-24 Z" fill="#8a9098"/><path d="M-14 -10 L16 -10" stroke="#fff" stroke-width="1.4" opacity=".8"/>`;
    else if(вид==='Au') тело = `<path d="M-14 0 Q-18 -8 -10 -14 Q-2 -20 8 -14 Q18 -10 14 -2 Q12 2 -14 0 Z" fill="#e8b020"/><path d="M-8 -12 Q0 -16 6 -12" stroke="#fff4b0" stroke-width="2" fill="none"/><circle cx="4" cy="-8" r="2" fill="#fff8d0" opacity=".8"/>`;
    else if(вид==='S') тело = плоский ? Array.from({length:14},(_,k)=>`<path d="M${-26+(k*29)%52} ${-1-(k%3)} l3 -3 l3 3 Z" fill="${k%2?'#f2d02a':'#c8a010'}"/>`).join('')
      : `<path d="M-18 0 L-20 -10 L-10 -20 L4 -18 L14 -12 L18 0 Z" fill="#f2d02a"/><path d="M-10 -20 L-4 -8 L14 -12 M-4 -8 L-18 0 M-4 -8 L2 0" stroke="#c8a010" stroke-width="1.2" fill="none"/><path d="M-16 -10 L-10 -17" stroke="#fff8a0" stroke-width="1.6"/>`;
    else if(вид==='C') тело = плоский ? Array.from({length:14},(_,k)=>`<path d="M${-26+(k*29)%52} ${-1-(k%3)} l3 -3 l3 3 Z" fill="${k%2?'#2a2c30':'#4a4e54'}"/>`).join('')
      : `<rect x="-26" y="-12" width="52" height="11" rx="4" fill="#4a4e56"/><rect x="-26" y="-12" width="52" height="4" rx="2" fill="#8a9098"/><path d="M-23 -10 H23" stroke="#d8dce0" stroke-width="1" opacity=".8"/><path d="M-26 -3 H26" stroke="#1a1c1f" stroke-width=".8"/>`;
    else if(вид==='Hg') тело = `<ellipse cx="0" cy="-1" rx="22" ry="3.4" fill="#dcebf5" fill-opacity=".25" stroke="#8fa8b8" stroke-width=".7"/><ellipse cx="-2" cy="-4" rx="9" ry="4.4" fill="#c8ccd2"/><ellipse cx="9" cy="-3" rx="4" ry="2.4" fill="#b8bec6"/><ellipse cx="-4" cy="-6" rx="3.4" ry="1.4" fill="#fff"/>`;
    else if(вид==='I2') тело = Array.from({length:9},(_,k)=>`<path d="M${-16+(k*13)%32} ${-1-(k%3)*3} l5 -5 l5 2 l-3 5 Z" fill="${k%2?'#3a2a5a':'#5a3a8a'}" stroke="#8a6ac8" stroke-width=".5"/>`).join('') + `<path d="M-6 -16 q-4 -6 0 -12 q4 -6 0 -12" stroke="#a87ae8" stroke-width="2" fill="none" opacity=".45"/>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${к})">${тень(0,0,48,.35)}${тело}</g>`;
  }
  /* ---------- запаянная ампула с газом или жидкостью: (x,y) — низ; цв — цвет содержимого; жидкость — доля ---------- */
  function ампула(x,y,м,цв,жидкость){
    const кл=ид('амп'), форма='M-12 -4 Q-12 0 -8 0 H8 Q12 0 12 -4 V-40 Q12 -46 3 -50 V-53 Q7 -55 7 -60 Q7 -64 2 -66 L0 -74 L-2 -66 Q-7 -64 -7 -60 Q-7 -55 -3 -53 V-50 Q-12 -46 -12 -40 Z';
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,28,.35)}
      <clipPath id="${кл}"><path d="${форма}"/></clipPath>
      <g clip-path="url(#${кл})"><rect x="-14" y="-76" width="28" height="76" fill="${цв}" opacity="${жидкость?.3:.62}"/>${жидкость?`<rect x="-14" y="${f(-40*жидкость)}" width="28" height="${f(40*жидкость)}" fill="${цв}"/>`:''}</g>
      <path d="${форма}" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".8"/>
      <path d="M-8 -38 V-6" stroke="#fff" stroke-width="1.6" opacity=".6"/><path d="M-4 -61 q0 -2 2 -3" stroke="#fff" stroke-width="1" opacity=".7" fill="none"/></g>`;
  }
  /* ---------- наковальня: (x,y) — низ середины ---------- */
  function наковальня(x,y,м){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,90,.5)}
      <path d="M-26 0 L-20 -16 H20 L26 0 Z" fill="#3a3e44"/><rect x="-14" y="-30" width="28" height="14" fill="#4a4e54"/>
      <path d="M-44 -30 Q-56 -34 -64 -42 Q-46 -44 -34 -44 H40 V-30 Z" fill="#5a6068"/><path d="M-34 -44 H40 V-41 H-34 Z" fill="#c8ccd0"/><path d="M-60 -42 Q-46 -44 -34 -44" stroke="#c8ccd0" stroke-width="1.4" fill="none"/>
    </g>`;
  }
  /* ---------- молоток: (x,y) — центр бойка снизу; угол поворота вокруг конца ручки ---------- */
  function молоток(x,y,угол,удар){
    /* (x,y) — низ бойка; ручка уходит вправо, вращение вокруг её конца */
    return `<g transform="translate(${f(x)} ${f(y-9)})"><g>${ДВИЖ&&удар?`<animateTransform attributeName="transform" type="rotate" values="38 74 0;-3 74 0;0 74 0" keyTimes="0;.65;1" dur=".45s" fill="freeze"/>`:''}<g transform="rotate(${f(угол||0)} 74 0)">
      <rect x="4" y="-3.5" width="72" height="7" rx="3" fill="url(#рл-доска)"/><path d="M8 -2 H72" stroke="#f0d0a0" stroke-width=".8" opacity=".7"/>
      <rect x="-9" y="-20" width="18" height="29" rx="2" fill="url(#рл-сталь)"/><rect x="-9" y="5" width="18" height="4" fill="#5a6068"/><rect x="-6" y="-17" width="3" height="20" fill="#fff" opacity=".35"/></g></g></g>`;
  }

  /* ---------- стеклянный колпак (колокол): (x,y) — середина нижнего края, ш×в; опц.туман — запотел ---------- */
  function колпак(x,y,ш,в,опц){
    const о=опц||{}, р=ш/2, кл=ид('клп');
    const d=`M${f(x-р)} ${f(y)} V${f(y-в*0.55)} Q${f(x-р)} ${f(y-в)} ${f(x)} ${f(y-в)} Q${f(x+р)} ${f(y-в)} ${f(x+р)} ${f(y-в*0.55)} V${f(y)}`;
    return `<g>
      <path d="${d} Z" fill="url(#рл-стекло)" opacity=".55"/>${о.туман?`<path d="${d} Z" fill="#e8f4fa" opacity=".18"/>`:''}
      <path d="${d}" fill="none" stroke="#bcd4e2" stroke-width="1.6" opacity=".85"/>
      <path d="M${f(x-р+5)} ${f(y-6)} V${f(y-в*0.55)} Q${f(x-р+5)} ${f(y-в+8)} ${f(x-р*0.3)} ${f(y-в+4)}" stroke="#fff" stroke-width="2.2" fill="none" opacity=".55" stroke-linecap="round"/>
      <ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(р)}" ry="3" fill="none" stroke="#bcd4e2" stroke-width="1.2" opacity=".7"/>
      <rect x="${f(x-5)}" y="${f(y-в-9)}" width="10" height="9" rx="3" fill="url(#рл-стекло)" stroke="#bcd4e2" stroke-width="1"/><circle cx="${f(x)}" cy="${f(y-в-11)}" r="5.4" fill="url(#рл-стекло)" stroke="#bcd4e2" stroke-width="1"/>
    </g>`;
  }
  /* ---------- веточка мяты в стаканчике с водой: (x,y) — низ; сила 0..1 — сколько листьев выросло ---------- */
  function мята(x,y,м,сила){
    const к=м||1, n=3+Math.round((сила||0)*4);
    const листья = Array.from({length:n},(_,i)=>{ const yy=-34-i*9, сторона=i%2?1:-1, r=7+Math.min(i,3);
      return `<g transform="translate(0 ${yy}) rotate(${сторона*(38-i*3)})"><ellipse cx="${сторона*r*0.95}" cy="0" rx="${r}" ry="${r*0.55}" fill="${i<3?'#3a9a4a':'#5ac06a'}"/><path d="M0 0 L${сторона*r*1.8} 0" stroke="#2a7a3a" stroke-width=".7"/></g>`; }).join('');
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${к})">${тень(0,0,30,.35)}
      <path d="M0 -14 Q-2 ${-30-n*5} 1 ${-40-n*9}" stroke="#4a8a3a" stroke-width="2.2" fill="none"/>${листья}
      <path d="M-11 0 L-13 -26 H13 L11 0 Z" fill="url(#рл-стекло)" stroke="#8fa8b8" stroke-width=".8"/><path d="M-12 -2 L-13 -16 H13 L12 -2 Z" fill="${цвет('вода')}"/><path d="M-9 -22 V-4" stroke="#fff" stroke-width="1.2" opacity=".6"/>
    </g>`;
  }
  /* ---------- резиновая груша с трубкой: (x,y) — низ груши; сжата ---------- */
  function груша(x,y,м,сжата){
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${м||1})">${тень(0,0,30,.35)}
      <ellipse cx="0" cy="-16" rx="${сжата?10:14}" ry="16" fill="#8a2a1a"/><ellipse cx="-5" cy="-21" rx="4" ry="6" fill="#c8604a" opacity=".6"/>
      <rect x="-3" y="-38" width="6" height="8" rx="2" fill="#2a2a2a"/></g>`;
  }
  /* ---------- железная вата (стальная мочалка): (cx,cy) — центр, r; ржа 0..1 ---------- */
  function вата(cx,cy,r,ржа){
    const ц=ржа>0.5?'#a8541e':ржа>0.15?'#8a6a5a':'#a8b0b8';
    return `<g>${Array.from({length:16},(_,k)=>{ const a=k*0.9, rr=r*(0.4+(k%5)*0.13);
      return `<ellipse cx="${f(cx+Math.cos(a)*r*0.25)}" cy="${f(cy+Math.sin(a*1.3)*r*0.2)}" rx="${f(rr)}" ry="${f(rr*0.55)}" transform="rotate(${k*23} ${f(cx)} ${f(cy)})" fill="none" stroke="${k%3?ц:'#d8dce0'}" stroke-width=".8" opacity="${k%3?.9:(ржа>.3?.25:.7)}"/>`; }).join('')}</g>`;
  }
  window.РЛ = {ДВИЖ, defs, виньетка, цвет, кристаллы, комната, отражение, тень, стакан, колба, цилиндр, весы, весыВерх, банка, лодочка, шпатель, очки, струя, рука, часовое, монеты, яйца, пачка, перчатки, ЭЛ, таблица, клетка, молекула, студия, имяПрибора, спиртовка, пипетка, частицы, лупа, значок, палочка, склянка, мениск, глаз, диаграмма, выпаривание, пробирка, щипцы, АТОМ, МОЛ, шарКолба, анВесы, анВерх, баллон, насос, кристаллизатор, цилиндрВверхДном, штатив, трубка, пузыри, куб, мячБ, циферблат, газосборник, лучинка, ложечка, свеча, пробиркаKMnO4, треугольникОгня, плитка, термометр, газировка, штативПробирок, хлопок, колпачок, спичка, коробок, держатель, кран, знак, лаборант, батарейка, лампочка, крокодил, образец, ампула, наковальня, молоток, колпак, мята, груша, вата};
})();
