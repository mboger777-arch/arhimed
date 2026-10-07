/* ============ ХИМИЯ · УРОК 118 · «ОТНОСИТЕЛЬНАЯ МОЛЕКУЛЯРНАЯ МАССА» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   7 класс, манера NOBOOK (как 39–117). Карточка 118 из банка подменяется этой записью (VISKW[118]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ) и свои: глянцевые модели молекул «шары и стержни»,
   рычажные весы с гирьками-эталонами (1/12 атома углерода), электронные весы, чек, воздушный шарик.

   ШАГИ.
   1) Карточка.
   2) Атомная масса: атом на весах против гирек-эталонов; Ar — красное число в клетке таблицы.
   3) Сумматор: нажимай атомы модели — их массы ложатся на ленту, табло складывает Mr.
   4) Дуэль масс: две молекулы на весах — какая тяжелее? N₂ и CO уравновешиваются.
   5) Чек Mr: H₂SO₄, CaCO₃, Al₂O₃, Fe₂O₃, C₆H₁₂O₆ — строка за строкой «Ar × индекс».
   6) Лёгкий газ, тяжёлый газ: шарик взлетает, если Mr газа меньше 29 (воздух).
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 118;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'молекулы', имя:'Сумматор молекул', итог:'5 из 5'},
    {ключ:'дуэль',    имя:'Дуэль масс',       итог:'6 из 6'},
    {ключ:'чек',      имя:'Чек Mr',           итог:'5 из 5'},
    {ключ:'марафон',  имя:'Проверка: марафон', итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Узнать, что такое относительная атомная и молекулярная масса, научиться вычислять Mr по формуле и сравнивать массы молекул.'],
    ['Принцип','Атомы слишком лёгкие, чтобы взвешивать их в граммах. Их сравнивают с эталоном — <b>1/12 массы атома углерода</b>. <b>Ar</b> — во сколько раз атом тяжелее эталона. <b>Mr</b> молекулы — сумма Ar всех её атомов: Mr(H₂O) = 2 × 1 + 16 = 18.'],
    ['Оборудование','Периодическая система (Ar — число внизу клетки), модели молекул, рычажные весы с гирьками-эталонами, электронные весы, воздушные шарики и баллончики с газами.'],
    ['Ход работы','1. Взвесить атомы против эталона.<br>2. Сложить массы атомов молекулы.<br>3. Сравнить молекулы на весах.<br>4. Посчитать Mr сложных веществ.<br>5. Узнать, какой газ поднимет шарик.'],
    ['Безопасность','Баллончики с газом не нагревать и не бросать. Водород горюч и взрывоопасен — шарики им не наполняют. Углекислый газ тяжелее воздуха и скапливается внизу: в погребах и ямах проверяют воздух, прежде чем спускаться.']
  ];
  const АР = {H:1,He:4,C:12,N:14,O:16,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Fe:56,Cu:64,Zn:65};
  const ч2 = (v) => String(v).replace('.',',');
  const ИНД = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map(c=>ИНД[+c]).join('');
  const формула = (ч) => ч.map(([с,n])=>с+(n>1?sub(n):'')).join('');
  const Mr = (ч) => ч.reduce((a,[e,n])=>a+АР[e]*n,0);
  const расчёт = (ч) => (ч.length===1&&ч[0][1]===1) ? ч2(Mr(ч)) : ч.map(([e,n])=>n>1?n+' × '+ч2(АР[e]):ч2(АР[e])).join(' + ')+' = '+ч2(Mr(ч));

  const ЭЛЕМЕНТЫ = ['H','C','N','O','Na','Mg','S','Ca','Fe','Cu'];
  const РАССКАЗ = {H:'Самый лёгкий атом: его масса почти равна эталону.', C:'Эталон и есть 1/12 атома углерода — поэтому у него ровно 12.', N:'Азот чуть тяжелее углерода: 14 эталонов.',
    O:'Кислород в 16 раз тяжелее водорода.', Na:'Натрий — 23 эталона.', Mg:'Магний — 24: вдвое тяжелее углерода.', S:'Сера вдвое тяжелее кислорода: 32.',
    Ca:'Кальций — 40.', Fe:'Железо — 56: в 56 раз тяжелее водорода.', Cu:'Медь — 64: ровно вчетверо тяжелее кислорода.'};
  /* сумматор: модели */
  const ЦЕЛИ3 = [
    {м:'H2O', ч:[['H',2],['O',1]], имя:'вода'},
    {м:'CO2', ч:[['C',1],['O',2]], имя:'углекислый газ'},
    {м:'NH3', ч:[['N',1],['H',3]], имя:'аммиак'},
    {м:'CH4', ч:[['C',1],['H',4]], имя:'метан'},
    {м:'SO2', ч:[['S',1],['O',2]], имя:'сернистый газ'}
  ];
  /* дуэль масс: левая, правая */
  const ДУЭЛИ = [
    {л:'H2O', п:'NH3', лч:[['H',2],['O',1]], пч:[['N',1],['H',3]]},
    {л:'O2',  п:'CO2', лч:[['O',2]],         пч:[['C',1],['O',2]]},
    {л:'N2',  п:'CO',  лч:[['N',2]],         пч:[['C',1],['O',1]]},
    {л:'CH4', п:'O2',  лч:[['C',1],['H',4]], пч:[['O',2]]},
    {л:'SO2', п:'CO2', лч:[['S',1],['O',2]], пч:[['C',1],['O',2]]},
    {л:'He',  п:'H2',  лч:[['He',1]],        пч:[['H',2]]}
  ];
  /* чек Mr */
  const ЧЕКИ = [
    {ч:[['H',2],['S',1],['O',4]],  имя:'серная кислота'},
    {ч:[['Ca',1],['C',1],['O',3]], имя:'мел и мрамор'},
    {ч:[['Al',2],['O',3]],         имя:'корунд — из него рубин и сапфир'},
    {ч:[['Fe',2],['O',3]],         имя:'гематит — красная руда, как ржавчина'},
    {ч:[['C',6],['H',12],['O',6]], имя:'глюкоза — сахар винограда'}
  ];
  const ВАР5 = (e,n,k) => { const A=АР[e], ок=A*n, набор = n>1 ? [ок, A+n, A] : [ок, A*2, A+1];
    const сдвиг=k%3; return набор.map((_,i)=>набор[(i+сдвиг)%3]); };
  /* шарик */
  const ГАЗЫ = [
    {г:'He',  ч:[['He',1]], имя:'гелий',          цв:'#ff5a7a'},
    {г:'H₂',  ч:[['H',2]],  имя:'водород',        цв:'#5ac8ff'},
    {г:'CH₄', ч:[['C',1],['H',4]], имя:'метан',   цв:'#ffd04a'},
    {г:'N₂',  ч:[['N',2]],  имя:'азот',           цв:'#8ad86a'},
    {г:'O₂',  ч:[['O',2]],  имя:'кислород',       цв:'#ff8a3a'},
    {г:'Ar',  ч:[['Ar',1]], имя:'аргон',          цв:'#c8b4ff'},
    {г:'CO₂', ч:[['C',1],['O',2]], имя:'углекислый газ', цв:'#9aa6b4'}
  ];
  const ВОЗДУХ = 29;
  const МАРАФОН = [
    {q:'Mr показывает, во сколько раз молекула тяжелее…', вар:['1/12 атома углерода','атома водорода','одного грамма'], в:0, р:'Эталон — 1/12 массы атома углерода.'},
    {q:'Ar(O) =', вар:['8','16','32'], в:1, р:'8 — номер кислорода, а масса 16.'},
    {q:'Mr(H₂O) =', вар:['17','18','20'], в:1, р:'2 × 1 + 16 = 18.'},
    {q:'Mr(CO₂) =', вар:['28','32','44'], в:2, р:'12 + 2 × 16 = 44.'},
    {q:'Mr(O₂) =', вар:['16','32','64'], в:1, р:'2 × 16 = 32.'},
    {q:'Mr(CH₄) =', вар:['14','16','17'], в:1, р:'12 + 4 × 1 = 16.'},
    {q:'Mr(H₂SO₄) =', вар:['49','97','98'], в:2, р:'2 + 32 + 64 = 98.'},
    {q:'Mr(CaCO₃) =', вар:['68','88','100'], в:2, р:'40 + 12 + 48 = 100.'},
    {q:'Какой газ легче воздуха (Mr ≈ 29)?', вар:['гелий','углекислый газ','кислород'], в:0, р:'Mr(He) = 4 — меньше 29.'},
    {q:'Mr(N₂) и Mr(CO):', вар:['равны','у N₂ больше','у CO больше'], в:0, р:'2 × 14 = 28 и 12 + 16 = 28.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const НОМЕР = {H:1,He:2,C:6,N:7,O:8,Ne:10,Na:11,Mg:12,Al:13,Si:14,P:15,S:16,K:19,Ca:20,Fe:26,Cu:29,Zn:30};
  const П1 = поМесту(['H','He','C','N','O','Na','Mg','Al','S','Ca','Fe','Cu','Zn','K','P','Si']
    .map(e=>{ const ок=АР[e], нет=e==='H'?2:НОМЕР[e];
      return {q:'Относительная атомная масса: Ar('+e+') = ?', e:e, ок:String(ок), нет:String(нет), раз:'Ar('+e+') = '+ок+' — красное число внизу клетки.'+(e==='H'?'':' '+нет+' — это порядковый номер, а не масса.')}; }));
  const П2 = поМесту([[[['H',2],['O',1]],20],[[['C',1],['O',2]],28],[[['N',1],['H',3]],15],[[['C',1],['H',4]],13],[[['O',2]],16],[[['N',2]],14],[[['H',2]],1],[[['S',1],['O',2]],48],
    [[['C',1],['O',1]],44],[[['H',2],['S',1]],33],[[['Mg',1],['O',1]],24],[[['Ca',1],['O',1]],40],[[['Na',1],['O',1],['H',1]],39],[[['H',2],['S',1],['O',4]],97],[[['Ca',1],['C',1],['O',3]],68],[[['Al',2],['O',3]],43]]
    .map(([ч,нет])=>({q:'Mr('+формула(ч)+') = ?', ч:ч, ок:String(Mr(ч)), нет:String(нет), раз:'Mr('+формула(ч)+') = '+расчёт(ч)+'.'})));
  const П3 = [[['He',1]],[['H',2]],[['C',1],['H',4]],[['N',1],['H',3]],[['N',2]],[['C',1],['O',1]],[['Ne',1]],[['O',2]],[['C',1],['O',2]],[['Ar',1]],[['S',1],['O',2]],[['Cl',2]],[['H',2],['S',1]],[['C',3],['H',8]],[['C',4],['H',10]],[['C',2],['H',2]]]
    .map(ч=>{ const m=Mr(ч), легче=m<ВОЗДУХ;
      return {q:'Шарик наполнили газом '+формула(ч)+'. Он легче или тяжелее воздуха?', ч:ч, m:m, вар:['легче воздуха','тяжелее воздуха'], в:легче?0:1,
        раз:'Mr('+формула(ч)+') = '+ч2(m)+(легче?' < 29 — легче воздуха, шарик тянется вверх.':' > 29 — тяжелее воздуха, шарик опускается.')}; });

  const CSS=`
  #lvis .s6.l118n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l118n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l118n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l118n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l118n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l118n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l118n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l118n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l118n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l118n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l118n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l118n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l118n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l118n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l118n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l118n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l118n table.итоги td{white-space:normal!important}
  #lvis .s6.l118n table.итоги td:first-child{width:46%}
  #lvis .s6.l118n table.итоги{table-layout:fixed}
  #lvis .s6.l118n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l118n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l118n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l118n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l118n .ask button{text-align:left}
  #lvis .s6.l118n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l118n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l118n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l118n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l118n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l118n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l118n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l118n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l118n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l118n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l118n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l118n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l118n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l118n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l118n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l118n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l118n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l118n .плитка span{text-align:center}
  #lvis .s6.l118n .плитка:active{transform:scale(.96)}
  #lvis .s6.l118n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l118n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l118n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l118n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l118n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l118n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l118n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l118n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l118n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l118n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l118n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l118n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l118n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l118n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l118n{gap:14px}
  #lvis .s6.l118n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l118n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l118n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l118n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l118n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l118n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l118n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l118n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l118n .карт .текст b{color:${GOLD}}
  #lvis .s6.l118n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l118n .правило b{color:${GOLD}}
  #lvis .s6.l118n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l118n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l118n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l118n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l118n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l118n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l118n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l118n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l118n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l118n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l118n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l118n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l118n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l118n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l118n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l118n .буйки button.мимо{border-color:${RED};animation:l118nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l118nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l118n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l118n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l118n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l118n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l118n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l118n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l118n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l118n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l118n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l118n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l118n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l118n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l118n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l118n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l118n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l118n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l118n .уровни .точка.сейчас{background:${GOLD};animation:l118ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l118ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l118n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l118n{-webkit-text-size-adjust:100%}
  #lvis .s6.l118n [data-anim]{animation:l118nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l118nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l118n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l118n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l118n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l118n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l118n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l118n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l118n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l118n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l118n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l118n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l118n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l118n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l118n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l118n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l118n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l118n .акт span.до{background:#24402c}
  #lvis .s6.l118n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l118n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l118n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l118n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l118n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l118n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l118n .две-колонки li{margin:2px 0}
  #lvis .s6.l118n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l118n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l118n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l118n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l118n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l118n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l118n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l118n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l118n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l118n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l118n ul.памятка li{margin:3px 0}
  #lvis .s6.l118n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l118n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l118n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l118n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l118n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l118n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l118n table.тепло td,#lvis .s6.l118n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l118n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l118n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l118n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l118n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l118n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l118n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l118n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l118n table.детектив th{width:auto!important}
  #lvis .s6.l118n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l118n table.детектив td{font-size:12.5px}
  #lvis .s6.l118n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l118n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l118n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l118n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l118n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l118n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l118n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l118n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l118n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l118n .ряд.символы button b{font-size:19px}
  #lvis .s6.l118n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l118n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l118n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l118n .коэф-яч b{font-size:26px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l118n [data-anim]{animation:none!important}
    #lvis .s6.l118n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l118n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l118n-style');
      if(!s){ s=document.createElement('style'); s.id='l118n-style'; document.head.appendChild(s); }
      if(s.textContent!==CSS) s.textContent=CSS;
    }catch(e){}
  }
  const S = () => {
    const lk = (typeof lidKey==='function') ? lidKey(ID) : String(ID);
    if(typeof CHS==='undefined') window.CHS={};
    if(!CHS[lk]) CHS[lk]={};
    return CHS[lk];
  };
  const A = (i,cls,html) => `<div data-anim style="--i:${i}" class="${cls||''}">${html}</div>`;
  const BTN = (i,cls,html,on) =>
    `<button type="button" data-anim style="--i:${i}" class="${cls||''}" onclick="${on}">${html}</button>`;
  const ЗАДАЧА = (текст) => A(2,'карт задача','<span class="метка">Задание</span><div class="текст">'+текст+'</div>');
  const РАЗБОР = (верно,текст) =>
    A(9,'карт '+(верно?'верно':'ошибка'),
      '<span class="метка">'+(верно?'Верно':'Разбор')+'</span><div class="текст">'+(верно?'✅ ':'❌ ')+текст+'</div>');
  const СКАЗ = (метка,текст) => A(9,'карт','<span class="метка">'+метка+'</span><div class="текст">'+текст+'</div>');
  const ПРАВИЛО = (текст) => A(40,'правило',текст);
  const ТОЧКИ = (всего,сейчас,пройдено) => A(1,'уровни',
    Array.from({length:всего},(_,к)=>
      `<span class="точка ${к<пройдено?'пройдено':(к===сейчас?'сейчас':'')}"></span>`).join(''));
  const ОТВЕТЫ = (кл,варианты,верный,в,f) => `<div class="ask ${кл}">${варианты.map((v,к)=>
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r118Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Практическая работа</span><b class="${всё?'готово':''}">${
        всё?'опыты выполнены':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из '+ДЕЛА.length}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}<span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const ф2 = (v) => (+v).toFixed(1);
  const рад = (g) => g*Math.PI/180;
  const ШР = "'Helvetica Neue',Arial,sans-serif";
  /* цвета атомов: светлый, тёмный, радиус при м = 1 */
  const ПАЛ = {H:['#ffffff','#8a94a0',15], O:['#ff6a5a','#6a0c06',21], C:['#7a8088','#121416',21], N:['#7a96ff','#101e7a',20], Cl:['#8ae86a','#0e4a08',22],
    S:['#ffe46a','#7a5600',23], Al:['#eef1f5','#56606c',23], Ca:['#b4f4dc','#145a42',24], Na:['#c8a4ff','#3e1480',24], P:['#ffb46a','#7a3000',22],
    Fe:['#e0a888','#4a2010',23], Cu:['#ffbe90','#7a300a',23], K:['#d8bcff','#3e2080',25], Mg:['#d8f4c0','#3e6a2e',23], Zn:['#d4dbe2','#444c54',23], He:['#fff0f8','#9a7aa0',15], Ne:['#ffc0b0','#8a3020',17], Ar:['#e4d4ff','#5a2a9a',20]};
  const СВЕТЛЫЕ = ['H','Al','Ca','S','Mg','Cu','Fe','Zn','He','Ne','Ar'];
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c118-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c118-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c118-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c118-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c118-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c118-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c118-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c118-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c118-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c118-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c118-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c118-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <linearGradient id="c118-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a727c"/><stop offset=".12" stop-color="#3a424c"/><stop offset=".7" stop-color="#22272d"/><stop offset="1" stop-color="#121519"/>
      </linearGradient>
      <radialGradient id="c118-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c118-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c118-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
    </defs>`;
  const L_ = () => window.РЛ;
  const ДВ = () => L_().ДВИЖ;
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return Л.студия(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
  const свгЛ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="${ШР}">${esc(t0)}</text>`; };
  const тА = (x,y,t0,к,цв,якорь) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="${ШР}">${esc(t0)}</text>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');

  /* формула с валентностями над символами: части = [[символ, индекс, римская|null]] */
  const ширС = (с,к) => с.split('').reduce((a,ch)=>a+(ch==='O'?0.78:/[A-Z]/.test(ch)?0.72:/[li]/.test(ch)?0.28:0.58),0)*к;
  const формулаВ = (x,y,части,к,опц) => { const о=опц||{}; let w=0;
    const м=части.map(([с,n])=>{ const ws=ширС(с,к), wi=n>1?String(n).length*к*0.38:0, r={с:с,n:n,x:w,ws:ws}; w+=ws+wi+к*0.05; return r; });
    const x0=x-w/2;
    return м.map((p,i)=>{ const v=части[i][2], цв=(о.цвета&&о.цвета[i])||ИНК;
      return `<text x="${ф2(x0+p.x)}" y="${y}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="${ШР}">${esc(p.с)}</text>` +
        (p.n>1?`<text x="${ф2(x0+p.x+p.ws)}" y="${ф2(y+к*0.2)}" font-size="${ф2(к*0.6)}" font-weight="bold" fill="${BLUE}" font-family="${ШР}">${p.n}</text>`:'') +
        (v!=null&&v!==''?`<text x="${ф2(x0+p.x+p.ws/2)}" y="${ф2(y-к*0.84)}" text-anchor="middle" font-size="${ф2(к*0.44)}" font-weight="bold" fill="${(о.цветаВ&&о.цветаВ[i])||GOLD}" font-family="Georgia,serif">${esc(v)}</text>`:'');
    }).join(''); };

  /* ---------- атомы с крючками ---------- */
  /* глянцевый шар атома: блик, объём, контровой свет */
  const шар = (x,y,r,e) => { const тк=СВЕТЛЫЕ.includes(e)?'#1c1e22':'#fff', к=e.length>1?r*0.7:r*0.84;
    const a1=рад(14), a2=рад(76), rr=r*0.86;
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c118-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c118-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c118-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c118-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c118-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c118-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c118-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(2.6*м)}" fill="#fffbe8"/>`;
  /* свободный крючок из атома (x,y) радиуса r под углом a (математическим) */
  const крюк = (x,y,a,r,дл,м,красный,i) => { const c=Math.cos(рад(a)), s0=-Math.sin(рад(a));
    const x2=x+c*(r+дл), y2=y+s0*(r+дл);
    return стальной(x+c*r*0.5,y+s0*r*0.5,x2,y2,4.6*м) + огонёк(x2,y2,м,красный,i); };
  const БАЗА = {1:[0], 2:[210,330], 3:[90,210,330], 4:[315,45,135,225], 5:[90,162,234,306,18], 6:[330,30,90,150,210,270]};
  /* раскладка связей: каждый присоединённый атом берёт столько крючков подряд, какова его валентность */
  const раскладка = (V,лиг,пов) => { const хуки=(БАЗА[V]||[]).map(a=>a+(пов||0)); let i=0; const связи=[];
    for(const e of лиг){ const k=ВАЛ_ЛИГ[e]||1; if(i+k>хуки.length) return null; const сл=хуки.slice(i,i+k); i+=k;
      const sx=сл.reduce((a,g)=>a+Math.cos(рад(g)),0), sy=сл.reduce((a,g)=>a+Math.sin(рад(g)),0);
      связи.push({e:e, k:k, a:Math.atan2(sy,sx)*180/Math.PI}); }
    return {связи:связи, свободные:хуки.slice(i)}; };
  const значокВ = (x,y,v,м,цв) => { const t0=РИМ[v]||v, ш=(String(t0).length*6.4+12)*м, в=15*м;
    return `<rect x="${ф2(x-ш/2)}" y="${ф2(y-в/2)}" width="${ф2(ш)}" height="${ф2(в)}" rx="${ф2(в/2)}" fill="#14171b" stroke="${цв||GOLD}" stroke-width="${ф2(1.2*м)}"/>
      <text x="${ф2(x)}" y="${ф2(y+в*0.3)}" text-anchor="middle" font-size="${ф2(10.5*м)}" font-weight="bold" fill="${цв||GOLD}" font-family="Georgia,serif">${esc(t0)}</text>`; };
  /* модель: центр с V крючками и присоединёнными атомами */
  const сборка = (x,y,м,ц,V,лиг,опц) => { const о=опц||{}, р=раскладка(V,лиг,о.пов); if(!р) return '';
    const R=(ПАЛ[ц]||ПАЛ.C)[2]*м; let низ='', верх='';
    р.связи.forEach(с=>{ const r=ПАЛ[с.e][2]*м, d=R+r+(с.k>1?20:16)*м, c=Math.cos(рад(с.a)), s0=-Math.sin(рад(с.a)), lx=x+c*d, ly=y+s0*d;
      if(с.k===1) низ+=стержень(x,y,lx,ly,7*м,ц,с.e);
      else (с.k===2?[-1,1]:[-1.6,0,1.6]).forEach(t=>{ const o=t*4.6*м, px=-s0*o, py=c*o; низ+=стержень(x+px,y+py,lx+px,ly+py,5*м,ц,с.e); });
      верх+=шар(lx,ly,r,с.e); });
    р.свободные.forEach((a,i)=>{ низ+=крюк(x,y,a,R,15*м,м,о.красные,i); });
    return низ+верх+шар(x,y,R,ц)+(о.рим?значокВ(x+R*0.86,y-R*0.98,V,м):''); };
  /* голографическая подставка */
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c118-пад)"/>
    <ellipse cx="${x}" cy="${y}" rx="${ф2(ш*0.78)}" ry="${ф2(ш*0.15)}" fill="none" stroke="#7fd1ff" stroke-opacity=".35" stroke-width="1"/>
    <ellipse cx="${x}" cy="${y}" rx="${ф2(ш*0.5)}" ry="${ф2(ш*0.095)}" fill="none" stroke="#7fd1ff" stroke-opacity=".25" stroke-width=".8" stroke-dasharray="3 4">${ДВ()?`<animate attributeName="stroke-dashoffset" values="0;14" dur="2s" repeatCount="indefinite"/>`:''}</ellipse>`;
  /* деревянный ящик молекулярного конструктора с шариками и стержнями; (x,y) — середина переда */
  const ящик = (x,y,ш) => { const в=22, эл=['H','O','C','N','Cl','S','H','O','Al','Ca','H','N','O','C','H'];
    let ш0=''; const n=Math.floor((ш-20)/15);
    for(let i=0;i<n;i++){ const e=эл[i%эл.length]; ш0+=шар(x-ш/2+14+i*15,y-в-3+(i%2)*3,6.4,e).replace(/<text[^]*?<\/text>/,''); }
    return `<ellipse cx="${x}" cy="${y+3}" rx="${ш/2+8}" ry="5" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <rect x="${x-ш/2}" y="${y-в-8}" width="${ш}" height="10" rx="2" fill="#5a3a1c"/>${ш0}
      ${[0,1,2,3,4].map(k=>стальной(x+ш/2-62+k*9,y-в-12,x+ш/2-30+k*9,y-в-1,2.4)).join('')}
      <rect x="${x-ш/2}" y="${y-в+2}" width="${ш}" height="${в-2}" rx="2" fill="url(#рл-древесина)"/>
      <rect x="${x-ш/2}" y="${y-в+2}" width="${ш}" height="2" fill="#fff" opacity=".18"/>
      <rect x="${x-34}" y="${y-в+7}" width="68" height="11" rx="2" fill="#f2ead8"/>
      ${тА(x,y-в+15.5,'КОНСТРУКТОР',7,'#5a3a1c')}`; };
  /* графическая формула той же раскладки: буквы и чёрточки */
  const графФ = (x,y,м,ц,V,лиг,пов) => { const р=раскладка(V,лиг,пов); if(!р) return ''; const d=30*м; let s='';
    р.связи.forEach(с=>{ const c=Math.cos(рад(с.a)), s0=-Math.sin(рад(с.a));
      (с.k===1?[0]:с.k===2?[-1,1]:[-1.6,0,1.6]).forEach(t=>{ const o=t*2.6*м, px=-s0*o, py=c*o;
        s+=`<path d="M${ф2(x+c*9*м+px)} ${ф2(y+s0*9*м+py)} L${ф2(x+c*(d-9*м)+px)} ${ф2(y+s0*(d-9*м)+py)}" stroke="#dfe4ea" stroke-width="${ф2(1.6*м)}" stroke-linecap="round"/>`; });
      s+=тА(ф2(x+c*d),ф2(y+s0*d+5*м),с.e,ф2(14*м),'#eef2f6'); });
    return s+тА(x,ф2(y+5*м),ц,ф2(14*м),GOLD); };

  /* ---------- модели молекул «шары и стержни»: [элемент, к кому, угол, кратность связи] ---------- */
  const МОД = {
    H2O:[['O'],['H',0,210,1],['H',0,330,1]],
    CO2:[['C'],['O',0,180,2],['O',0,0,2]],
    NH3:[['N'],['H',0,90,1],['H',0,210,1],['H',0,330,1]],
    CH4:[['C'],['H',0,90,1],['H',0,180,1],['H',0,0,1],['H',0,270,1]],
    O2:[['O'],['O',0,0,2]], N2:[['N'],['N',0,0,3]], CO:[['C'],['O',0,0,2]], H2:[['H'],['H',0,0,1]],
    He:[['He']], Ar:[['Ar']],
    SO2:[['S'],['O',0,200,2],['O',0,340,2]]
  };
  const раскладкаМ = (имя,м) => { const pts=[];
    (МОД[имя]||[]).forEach((a,i)=>{ const [e,р,уг,пор]=a, r=(ПАЛ[e]||ПАЛ.C)[2]*м;
      if(р==null){ pts.push({e:e,x:0,y:0,r:r}); return; }
      const P=pts[р], d=P.r+r+(пор>1?18:14)*м, c=Math.cos(рад(уг)), s0=-Math.sin(рад(уг));
      pts.push({e:e,x:P.x+c*d,y:P.y+s0*d,r:r,р:р,пор:пор}); });
    const x1=Math.min(...pts.map(p=>p.x-p.r)), x2=Math.max(...pts.map(p=>p.x+p.r)), y1=Math.min(...pts.map(p=>p.y-p.r)), y2=Math.max(...pts.map(p=>p.y+p.r));
    pts.forEach(p=>{ p.x-=(x1+x2)/2; p.y-=(y1+y2)/2; });
    pts.ш=x2-x1; pts.в=y2-y1; return pts; };
  const модель = (x,y,м,имя,опц) => { const о=опц||{}, pts=раскладкаМ(имя,м); let низ='', верх='', пометки='';
    pts.forEach(p=>{ if(p.р==null) return; const P=pts[p.р], ax=x+P.x, ay=y+P.y, bx=x+p.x, by=y+p.y, a=Math.atan2(by-ay,bx-ax), px=-Math.sin(a), py=Math.cos(a);
      (p.пор===1?[0]:p.пор===2?[-1,1]:[-1.6,0,1.6]).forEach(t=>{ const o=t*4.4*м; низ+=стержень(ax+px*o,ay+py*o,bx+px*o,by+py*o,(p.пор>1?5:7)*м,P.e,p.e); }); });
    pts.forEach((p,i)=>{ const отм=о.отм&&о.отм.includes(i), X=x+p.x, Y=y+p.y;
      верх+=отм?`<g opacity=".55">${шар(X,Y,p.r,p.e)}</g><circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+3)}" fill="none" stroke="${GREEN}" stroke-width="2"/>`:шар(X,Y,p.r,p.e);
      if(о.клик&&!отм) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+5)}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r118ат(${i})"/>`;
      if(о.клик&&!отм&&ДВ()) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+3)}" fill="none" stroke="${GOLD}" stroke-width="1.4" opacity=".0" pointer-events="none"><animate attributeName="opacity" values="0;.8;0" dur="1.8s" begin="${(i*0.25).toFixed(2)}s" repeatCount="indefinite"/></circle>`; });
    return низ+верх+пометки; };
  const свгК = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" role="img">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;

  /* ---------- зелёное табло ---------- */
  const табло = (x,y,ш,текст,опц) => { const о=опц||{}, в=о.в||26;
    return `<rect x="${ф2(x-ш/2)}" y="${y}" width="${ш}" height="${в}" rx="5" fill="#06120a" stroke="#2a3a30" stroke-width="1.4"/>
      <rect x="${ф2(x-ш/2+3)}" y="${y+3}" width="${ш-6}" height="${ф2(в*0.3)}" rx="3" fill="#fff" opacity=".05"/>
      <text x="${ф2(x)}" y="${ф2(y+в*0.7)}" text-anchor="middle" font-size="${о.кегль||14}" font-weight="bold" fill="#7dffa0" font-family="'Courier New',monospace" stroke="#7dffa0" stroke-opacity=".25" stroke-width="2.4" paint-order="stroke">${esc(текст)}</text>`; };
  /* ---------- электронные весы: (x,y) — середина низа ---------- */
  const электро = (x,y,ш,показ) => `<ellipse cx="${x}" cy="${y+3}" rx="${ф2(ш*0.56)}" ry="5" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
    <path d="M${ф2(x-ш/2)} ${y} L${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)} L${ф2(x+ш/2)} ${y} Z" fill="url(#c118-корпус)"/>
    <path d="M${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)}" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>
    ${табло(x-ш*0.08,y-25,ф2(ш*0.56),показ,{в:18,кегль:11})}
    <circle cx="${ф2(x+ш*0.3)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/><circle cx="${ф2(x+ш*0.38)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/>
    <rect x="${x-5}" y="${y-38}" width="10" height="8" fill="url(#c118-стальВ)"/>
    <ellipse cx="${x}" cy="${y-39}" rx="${ф2(ш*0.4)}" ry="5.5" fill="url(#c118-сталь)"/><ellipse cx="${x}" cy="${y-40.5}" rx="${ф2(ш*0.36)}" ry="3.6" fill="#dfe4ea" opacity=".55"/>`;

  /* ---------- рычажные весы: содержимое чаш — функции (cx, верх чаши) ---------- */
  const коромысло = (угол,левое,правое,опц) => { const о=опц||{}, px=168, py=о.py||100, h=104;
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t), низ=о.низ||250;
    const чаша=(cx,cy,f)=>{ const yп=cy+62;
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c118-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${f(cx,yп-4)}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c118-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    return `<path d="M${px-48} ${низ} L${px+48} ${низ} L${px+32} ${низ-12} L${px-32} ${низ-12} Z" fill="#2a3038"/><rect x="${px-40}" y="${низ-4}" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="${px-5}" y="${py}" width="10" height="${низ-12-py}" fill="url(#c118-стальВ)"/>
      <rect x="${px-18}" y="${py+44}" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(px+Math.sin(рад(g))*50)} ${ф2(py+Math.cos(рад(g))*50)} L${ф2(px+Math.sin(рад(g))*57)} ${ф2(py+Math.cos(рад(g))*57)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      ${о.замок?`<rect x="${px-74}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/><rect x="${px+68}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/>`:''}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M${px} ${py} L${px} ${py+56}" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c118-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c118-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c118-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,левое)}${чаша(rx,ry,правое)}`; };
  /* золотые гирьки-эталоны: n штук рядами по 10, (cx, y) — опора */
  const эталоны = (cx,y,n) => { let s=''; const целых=Math.floor(n), пол=n-целых>0;
    for(let i=0;i<целых+(пол?1:0);i++){ const ряд=Math.floor(i/10), j=i%10, вРяду=Math.min(10,целых+(пол?1:0)-ряд*10), x=cx+(j-(вРяду-1)/2)*6.2-2.7, yy=y-6-ряд*6.2;
      const ш=(пол&&i===целых)?2.7:5.4;
      s+=`<rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="5.4" rx=".8" fill="url(#c118-латунь)"/><rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="1.2" fill="#fff6d0" opacity=".7"/>`; }
    return s; };
  /* ---------- воздушный шарик ---------- */
  let шкN=0;
  const шарик = (x,y,цв,надпись,м) => { const k=м||1, R=34*k, ид='c118-шк'+(++шкN);
    return `<g>
      <radialGradient id="${ид}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${цв}"/><stop offset=".85" stop-color="${цв}"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#${ид})"/>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#c118-объём)" opacity=".7"/>
      <ellipse cx="${ф2(x-R*0.38)}" cy="${ф2(y-R*0.5)}" rx="${ф2(R*0.2)}" ry="${ф2(R*0.34)}" transform="rotate(25 ${ф2(x-R*0.38)} ${ф2(y-R*0.5)})" fill="url(#c118-блик)"/>
      <path d="M${ф2(x-4*k)} ${ф2(y+R*1.1+6*k)} L${x} ${ф2(y+R*1.1-1)} L${ф2(x+4*k)} ${ф2(y+R*1.1+6*k)} Z" fill="${цв}"/>
      ${надпись?`<text x="${x}" y="${ф2(y+5*k)}" text-anchor="middle" font-size="${ф2(16*k)}" font-weight="bold" fill="#fff" stroke="rgba(0,0,0,.35)" stroke-width="2" paint-order="stroke" font-family="${ШР}">${esc(надпись)}</text>`:''}
    </g>`; };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=250, y0=212, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = электро(112,y0+18,150,'Mr = 18') + Л.таблица(214,y0-6,96) ;
    const поверх = `<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/>`:''}${модель(112,104,1.25,'H2O')}</g>` +
      формулаВ(258,64,[['H',2,''],['O',1,'']],34) + тА(258,92,'2 × 1 + 16 = 18',13,GOLD) + тА(258,112,'относительная',10,'#9aa3ad') + тА(258,125,'молекулярная масса',10,'#9aa3ad');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Относительная молекулярная масса') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r118вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['во сколько раз молекула тяжелее 1/12 атома углерода','массу одной молекулы в граммах'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что показывает Mr?') :
          РАЗБОР(ок,['Верно: Mr — относительная масса, без граммов.','Граммы тут ни при чём: Mr показывает, во сколько раз молекула тяжелее <b>эталона</b> — 1/12 атома углерода.'][в]))) +
      (ок ? ПРАВИЛО('<b>Mr</b> = сумма <b>Ar</b> всех атомов молекулы.') : '');
  }

  /* 2. Атомная масса */
  function F2(s){
    const Н=272, к=s.э2==null?3:s.э2, e=ЭЛЕМЕНТЫ[к], вид=s.вид2||{}, видено=Object.keys(вид).length, в=s.ответ2, ок=в===1, Л=L_(), ar=АР[e];
    const rr=11+Math.sqrt(ar)*1.7;
    const тело = Л.студия(Н,262) + Л.клетка(8,8,70,e) + `<rect x="10" y="64" width="66" height="13" rx="3" fill="none" stroke="${RED}" stroke-width="1.6"/>` +
      тА(212,38,'Ar('+e+') = '+ар(ar),24,GOLD) + тА(212,58,ar===1?'1 эталон':ар(ar)+' эталонов · 1/12 атома C',10,'#c8ced6') +
      коромысло(0,(cx,y)=>шар(cx,y-rr+2,rr,e),(cx,y)=>эталоны(cx,y,ar),{py:108,низ:262}) +
      метка(64,216,'атом '+e,'#6a7480',{кегль:10}) + метка(272,216,ар(ar)+' × эталон',ЗЛ,{кегль:10}) + метка(168,236,'равновесие',ЗЕ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Атомная масса') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      `<div class="ряд символы" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${ЭЛЕМЕНТЫ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}" onclick="r118э(${i})"><b>${x}</b></button>`).join('')}</div>` +
      A(4,'карт','<span class="метка">'+e+' · Ar = '+ар(ar)+'</span><div class="текст">'+РАССКАЗ[e]+' В таблице Менделеева это <b style="color:#ff8a6a">красное число</b> внизу клетки.</div>') +
      (видено<5 ? СКАЗ('Исследуй','Положи на весы хотя бы пять атомов. Справа — гирьки-эталоны, каждая весит 1/12 атома углерода.') :
        ОТВЕТЫ('три',['8','16','32'],1,в,2) + (в==null ? СКАЗ('Вопрос','Во сколько раз атом кислорода тяжелее атома водорода?') :
          РАЗБОР(ок,['8 — номер кислорода в таблице. Массы: 16 и 1, значит, в <b>16</b> раз.','Верно: Ar(O) = 16, Ar(H) = 1.','32 — это молекула O₂. Атом кислорода тяжелее водорода в <b>16</b> раз.'][в]))) +
      (ок ? ТЕОРИЯ('относительная атомная масса','<b>Ar</b> — относительная атомная масса: во сколько раз атом тяжелее 1/12 атома углерода. Единиц у неё нет. В расчётах Ar округляют до целых; только у хлора берут 35,5.') +
        ДИВО('Настоящий атом водорода весит примерно 0,000 000 000 000 000 000 000 001 7 г. Считать такими числами неудобно — поэтому химики сравнивают атомы с эталоном.') : '');
  }
  const ар = ч2;

  /* 3. Сумматор молекул */
  function F3(s){
    const Н=272, y0=240, n=Math.min(s.ц3||0,ЦЕЛИ3.length-1), Ц=ЦЕЛИ3[n], отм=s.отм3||[], ок=!!s.ок3, отз=s.отз3, готовых=n+(ок?1:0), все=готовых>=ЦЕЛИ3.length;
    const pts=раскладкаМ(Ц.м,1.05), сумма=отм.reduce((a,i)=>a+АР[pts[i].e],0), m=Mr(Ц.ч);
    const лента = `<g filter="url(#c118-тень)"><rect x="226" y="30" width="100" height="${24+Math.max(pts.length,3)*17+30}" rx="2" fill="#fbf7ec"/></g>
      <rect x="226" y="22" width="100" height="12" rx="3" fill="#2a3038"/>` + тА(276,48,'ЛЕНТА',9,'#8a7a5a') +
      pts.map((_,k)=>{ const i=отм[k], y=66+k*17; if(i==null) return `<text x="234" y="${y}" font-size="11" fill="#cbbf9e" font-family="'Courier New',monospace">· · · · ·</text>`;
        return `<text x="234" y="${y}" font-size="12" font-weight="bold" fill="#2e2416" font-family="'Courier New',monospace">${pts[i].e}</text><text x="318" y="${y}" text-anchor="end" font-size="12" font-weight="bold" fill="#2e2416" font-family="'Courier New',monospace">+${ч2(АР[pts[i].e])}</text>`; }).join('') +
      `<path d="M232 ${68+pts.length*17-8} H320" stroke="#2e2416" stroke-width="1" stroke-dasharray="2 2"/>` +
      `<text x="234" y="${68+pts.length*17+8}" font-size="12" font-weight="bold" fill="${ок?'#1a7a3a':'#8a2a1a'}" font-family="'Courier New',monospace">Mr</text><text x="318" y="${68+pts.length*17+8}" text-anchor="end" font-size="13" font-weight="bold" fill="${ок?'#1a7a3a':'#8a2a1a'}" font-family="'Courier New',monospace">${ок?ч2(m):ч2(сумма)}</text>`;
    const тело = L_().студия(Н,y0) + подставка(112,200,80) + (ок?`<circle cx="112" cy="118" r="84" fill="url(#c118-зелень)"/>`:'') +
      модель(112,118,1.05,Ц.м,{отм:отм,клик:!ок}) + лента + метка(112,4,(n+1)+' из 5 · '+Ц.имя+' '+формула(Ц.ч),ок?ЗЕ:ЗЛ,{кегль:11}) +
      табло(168,240,300,ок?'Mr('+формула(Ц.ч)+') = '+расчёт(Ц.ч):'Σ = '+ч2(сумма)+'   осталось атомов: '+(pts.length-отм.length),{кегль:ок&&расчёт(Ц.ч).length>16?11:12});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Сумматор молекул') +
      `<div class="pic тёмная">${свгК(тело,Н)}</div>` +
      ТОЧКИ(ЦЕЛИ3.length,все?-1:n,готовых) +
      (ок ? '' : `<div class="ask">${BTN(3,'','Положить на ленту следующий атом',"r118ат(-1)")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Задание','Нажимай на атомы модели: масса каждого ложится на ленту, табло складывает. Не пропусти ни одного атома!')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая молекула →',"r118цдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('относительная молекулярная масса','<b>Mr</b> — сумма относительных атомных масс всех атомов молекулы. Если атомов одного элемента несколько, Ar умножают на индекс: Mr(CH₄) = 12 + 4 × 1 = 16.') : '');
  }

  /* 4. Дуэль масс */
  function F4(s){
    const Н=272, n=Math.min(s.д4||0,ДУЭЛИ.length-1), Д=ДУЭЛИ[n], ок=!!s.ок4, отз=s.отз4, готовых=n+(ок?1:0), все=готовых>=ДУЭЛИ.length;
    const mл=Mr(Д.лч), mп=Mr(Д.пч), разн=mп-mл, угол=ок?(разн===0?0:Math.sign(разн)*Math.min(12,Math.abs(разн)*0.6+4)):0;
    const на=(имя)=>(cx,y)=>{ const pts=раскладкаМ(имя,0.56); return модель(cx,y-pts.в/2-3,0.56,имя); };
    const тело = L_().студия(Н,262) + коромысло(угол,на(Д.л),на(Д.п),{py:108,низ:262,замок:!ок}) +
      метка(64,4,формула(Д.лч),'#6a7480',{кегль:12}) + метка(272,4,формула(Д.пч),'#6a7480',{кегль:12}) +
      (ок ? метка(64,226,'Mr = '+ч2(mл),разн<0?ЗЛ:ЗЕ,{кегль:11}) + метка(272,226,'Mr = '+ч2(mп),разн>0?ЗЛ:ЗЕ,{кегль:11}) + метка(168,30,разн===0?'поровну!':'тяжелее '+(разн>0?'правая →':'← левая'),ЗЕ,{кегль:11})
        : метка(168,30,'арретир закрыт · сделай прогноз',КР,{кегль:10}) + метка(64,226,'Mr = ?','#6a7480',{кегль:11}) + метка(272,226,'Mr = ?','#6a7480',{кегль:11}));
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Дуэль масс') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ДУЭЛИ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Дуэль '+(n+1)+' из 6</span><div class="текст">Слева '+формула(Д.лч)+', справа '+формула(Д.пч)+'. Посчитай Mr в уме — куда качнутся весы?</div>') +
        `<div class="ask три">${['← левая','поровну','правая →'].map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r118д("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая дуэль →',"r118ддальше()")}</div>` : '') +
      (все ? ПРАВИЛО('Тяжелее та молекула, у которой больше <b>Mr</b>. N₂ и CO весят одинаково: 28 = 28.') +
        ДИВО('Азот N₂ и угарный газ CO так похожи по массе, что их не различить взвешиванием. Химики отличают их по свойствам: CO горит синим пламенем, а азот не горит.') : '');
  }

  /* 5. Чек Mr */
  function F5(s){
    const n=Math.min(s.ч5||0,ЧЕКИ.length-1), Ч=ЧЕКИ[n], р=Math.min(s.р5||0,Ч.ч.length), ок=!!s.ок5, отз=s.отз5, готовых=n+(ок?1:0), все=готовых>=ЧЕКИ.length;
    const строк=Ч.ч.length, Н=118+строк*26+60, y0=Н-14, низЧека=96+строк*26+40;
    const мон=(x,y,t0,к,цв,якорь)=>`<text x="${x}" y="${y}" text-anchor="${якорь||'start'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="'Courier New',monospace">${esc(t0)}</text>`;
    let строки='';
    Ч.ч.forEach(([e,k],i)=>{ const y=104+i*26, A0=АР[e], сделан=i<р, сейчас=i===р&&!ок;
      if(сейчас) строки+=`<rect x="80" y="${y-16}" width="176" height="22" rx="3" fill="#ffd76a" opacity=".35"/>`;
      строки+=мон(88,y,e+(k>1?sub(k):''),14,i>р?'#cbbf9e':'#2e2416') + мон(150,y,(k>1?k+'×':'')+ч2(A0),13,i>р?'#cbbf9e':'#5a4a30','middle') + мон(248,y,сделан?ч2(A0*k):'?',14,сделан?'#2e2416':i===р?'#c8402a':'#cbbf9e','end'); });
    const зигзаг = Array.from({length:23},(_,i)=>`L${258-i*8} ${низЧека+(i%2?5:0)}`).join(' ')+` L78 ${низЧека}`;
    const тело = L_().студия(Н,y0) +
      `<rect x="58" y="14" width="220" height="34" rx="8" fill="url(#c118-корпус)"/><rect x="74" y="40" width="188" height="5" rx="2" fill="#0a0c0e"/>${табло(126,20,92,'Mr',{в:16,кегль:10})}<circle cx="232" cy="28" r="5" fill="#c8402a"/><circle cx="252" cy="28" r="5" fill="#3a9a5a"/>` +
      `<g filter="url(#c118-тень)"><path d="M78 44 H258 V${низЧека} ${зигзаг} Z" fill="#fbf7ec"/></g>` +
      мон(168,66,'ЧЕК · Mr('+формула(Ч.ч)+')',12,'#2e2416','middle') + `<path d="M88 76 H248" stroke="#2e2416" stroke-dasharray="3 2"/>` + строки +
      `<path d="M88 ${96+строк*26-6} H248" stroke="#2e2416" stroke-dasharray="3 2"/>` +
      мон(88,96+строк*26+14,'ИТОГО',13,ок?'#1a7a3a':'#cbbf9e') + мон(248,96+строк*26+14,ок?ч2(Mr(Ч.ч)):'…',15,ок?'#1a7a3a':'#cbbf9e','end') +
      (ок?`<g transform="rotate(-14 296 ${низЧека-40})"><rect x="262" y="${низЧека-54}" width="68" height="26" rx="4" fill="rgba(251,247,236,.9)" stroke="#c8402a" stroke-width="2.4"/>${мон(296,низЧека-36,'ВЕРНО',13,'#c8402a','middle')}</g>`:'');
    const ВАР = р<строк&&!ок ? ВАР5(Ч.ч[р][0],Ч.ч[р][1],n+р) : [];
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Чек Mr') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ЧЕКИ.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Чек '+(n+1)+' из 5 · '+Ч.имя+'</span><div class="текст">'+(ок?'Чек пробит: Mr('+формула(Ч.ч)+') = '+расчёт(Ч.ч)+'.':'Строка '+(р+1)+': <b>'+Ч.ч[р][0]+(Ч.ч[р][1]>1?sub(Ч.ч[р][1]):'')+'</b> — '+(Ч.ч[р][1]>1?'атомов '+Ч.ч[р][1]+', у каждого Ar = '+ч2(АР[Ч.ч[р][0]])+'. Сколько они дают вместе?':'атом один. Сколько он даёт в сумму?'))+'</div>') +
      (ок ? '' : `<div class="ask три">${ВАР.map((v,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',ч2(v),"r118р("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий чек →',"r118чдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('как считать Mr','1) Выписать элементы формулы. 2) Для каждого: <b>Ar × индекс</b>. 3) Сложить. Mr(Fe₂O₃) = 2 × 56 + 3 × 16 = 112 + 48 = <b>160</b>.') +
        ДИВО('Глюкоза C₆H₁₂O₆ (Mr = 180) — главное топливо мозга. Её молекула в десять раз тяжелее молекулы воды.') : '');
  }

  /* 6. Лёгкий газ, тяжёлый газ */
  function F6(s){
    const Н=290, y0=258, к=s.г6==null?0:s.г6, Г=ГАЗЫ[к], вид=s.вид6||{}, видено=Object.keys(вид).length, в=s.ответ6, ок=в===0, Л=L_();
    const m=Mr(Г.ч), режим=m<20?'вверх':m<ВОЗДУХ?'парит':'вниз';
    const bx=146, by=режим==='вверх'?78:режим==='парит'?150:y0-40, гx=146, гy=y0-2;
    const старт=режим==='вниз'?-90:(y0-40-by);
    const узел=(yy)=>`M${bx} ${ф2(yy+34*1.1+6)}`;
    const нить=(yy)=> режим==='вниз' ? `${узел(yy)} Q${bx+30} ${y0-4} ${bx+52} ${y0-2}` : `${узел(yy)} Q${bx+6} ${ф2((yy+40+гy)/2)} ${гx} ${гy-8}`;
    const anim = ДВ() ? `<animateTransform attributeName="transform" type="translate" from="0 ${старт}" to="0 0" dur="${режим==='вниз'?0.9:1.8}s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${режим==='вниз'?'0.5 0 0.9 0.6':'0.23 1 0.32 1'}"/>` : '';
    const нитьA = ДВ() ? `<animate attributeName="d" from="${нить(by+старт)}" to="${нить(by)}" dur="${режим==='вниз'?0.9:1.8}s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${режим==='вниз'?'0.5 0 0.9 0.6':'0.23 1 0.32 1'}"/>` : '';
    const гирька = режим==='вниз' ? '' : `<path d="M${гx-9} ${гy} L${гx-6} ${гy-12} H${гx+6} L${гx+9} ${гy} Z" fill="url(#c118-латунь)"/><circle cx="${гx}" cy="${гy-14}" r="3" fill="none" stroke="url(#c118-латунь)" stroke-width="1.6"/>`;
    const Y=(v)=>ф2(234-v*190/70);
    const шкала = `<rect x="292" y="34" width="14" height="206" rx="7" fill="rgba(220,235,245,.12)" stroke="#8fa8b8" stroke-opacity=".5"/>
      <rect x="295" y="${Y(Math.min(m,70))}" width="8" height="${ф2(234-+Y(Math.min(m,70)))}" rx="4" fill="${Г.цв}"/>
      ${[0,10,20,30,40,50,60,70].map(v=>`<path d="M286 ${Y(v)} H292" stroke="#9aa3ad"/>`+тА(282,+Y(v)+3,v,8,'#9aa3ad','end')).join('')}
      <path d="M118 ${Y(ВОЗДУХ)} H312" stroke="${BLUE}" stroke-width="1.2" stroke-dasharray="5 4" opacity=".8"/>${метка(232,+Y(ВОЗДУХ)-24,'воздух · 29',СН,{кегль:9})}
      ${тА(299,26,'Mr',10,'#c8ced6')}`;
    const баллон = ['He','H₂','N₂','O₂','CO₂'].includes(Г.г) ? Л.баллон(44,y0,0.62,{'He':'He','H₂':'H2','N₂':'N2','O₂':'O2','CO₂':'CO2'}[Г.г]) : Л.баллон(44,y0,0.62,'—');
    const пр = баллон + гирька;
    const поверх = шкала + `<path d="${нить(by)}" stroke="#e8ecf0" stroke-width="1" fill="none" opacity=".8">${нитьA}</path>` +
      `<g>${anim}${шарик(bx,by,Г.цв,Г.г)}</g>` + метка(44,y0-104,'Mr = '+ч2(m),ЗЛ,{кегль:10}) +
      метка(146,6,режим==='вверх'?'легче воздуха — взлетает':режим==='парит'?'почти как воздух — еле держится':'тяжелее воздуха — падает',режим==='вниз'?КР:режим==='парит'?'#c87a2a':ЗЕ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Лёгкий газ, тяжёлый газ') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(4,minmax(0,1fr))">${ГАЗЫ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:16px">'+x.г+'</span>','r118г('+i+')')).join('')}</div>` +
      A(5,'карт','<span class="метка">'+Г.имя+' · Mr = '+ч2(m)+'</span><div class="текст">Mr('+формула(Г.ч)+') = '+расчёт(Г.ч)+'. Средняя Mr воздуха — 29. '+(m<ВОЗДУХ?'Газ легче — шарик тянет вверх.':'Газ тяжелее — шарик падает.')+'</div>') +
      (видено<4 ? СКАЗ('Исследуй','Наполни шарик хотя бы четырьмя газами. Сравни Mr газа с 29 — с воздухом.') :
        ОТВЕТЫ('три',['гелий','углекислый газ','аргон'],0,в,6) + (в==null ? СКАЗ('Вопрос','Каким газом наполняют летающие шарики на празднике?') :
          РАЗБОР(ок,['Верно: Mr(He) = 4 — в семь раз легче воздуха, и гелий не горит.','Mr(CO₂) = 44 > 29: такой шарик упадёт.','Mr(Ar) = 40 > 29: шарик ляжет на пол.'][в]))) +
      (ок ? ТЕОРИЯ('легче или тяжелее воздуха','Воздух — смесь газов, его средняя Mr ≈ <b>29</b>. Газ с меньшей Mr легче воздуха (He, H₂, CH₄), с большей — тяжелее (CO₂, Ar, Cl₂). Поэтому утечку метана ищут под потолком, а углекислый газ скапливается в низинах.') +
        ДИВО('В 1937 году огромный дирижабль «Гинденбург», наполненный водородом, вспыхнул при посадке. С тех пор дирижабли и шарики наполняют негорючим гелием.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=240, y0=206;
    const пр = электро(88,y0+18,130,'Mr = 18') + электро(250,y0+18,130,'Mr = 44');
    const поверх = модель(88,120,1,'H2O') + модель(250,120,0.82,'CO2') + формулаВ(88,44,[['H',2,''],['O',1,'']],26) + формулаВ(250,44,[['C',1,''],['O',2,'']],26);
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Относительная молекулярная масса') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Ar</b> — во сколько раз атом тяжелее 1/12 атома углерода; это красное число в клетке таблицы.<br>• <b>Mr</b> — сумма Ar всех атомов молекулы: Ar × индекс для каждого элемента.<br>• Единиц у Ar и Mr нет.<br>• Mr(H₂O) = 18, Mr(CO₂) = 44, Mr(O₂) = 32.<br>• Газ с Mr меньше 29 легче воздуха.</div>') +
      ПРАВИЛО('<b>Mr(Fe₂O₃)</b> = 2 × 56 + 3 × 16 = 160.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=162, м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const жизни = [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${шарик(236+i*36,92,['#ff5a7a','#5ac8ff','#ffd04a'][i],'',0.56)}<path d="M${236+i*36} 120 Q${240+i*36} 140 ${236+i*36} 158" stroke="#e8ecf0" stroke-width=".8" fill="none"/></g>`).join('');
    const поверх = электро(84,y0+12,120,'Mr = '+(все?'✓':'?')) + модель(84,98,0.9,'NH3') + жизни + L_().имяПрибора(272,y0+12,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Mr любой молекулы тебе по силам.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r118заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r118мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Сложи Ar всех атомов.')) : '')) +
      (все ? ПРАВИЛО('Mr = Σ (Ar × индекс).') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Ar(C) =', варианты:[{т:'12',ок:true},{т:'6',ок:false}], разбор:'6 — номер углерода, масса 12.' },
    { вопрос:'Mr(NH₃) =', варианты:[{т:'15',ок:false},{т:'17',ок:true}], разбор:'14 + 3 × 1 = 17.' },
    { вопрос:'Mr(SO₂) =', варианты:[{т:'64',ок:true},{т:'48',ок:false}], разбор:'32 + 2 × 16 = 64.' },
    { вопрос:'Mr(Fe₂O₃) =', варианты:[{т:'72',ок:false},{т:'160',ок:true}], разбор:'2 × 56 + 3 × 16 = 160.' },
    { вопрос:'CO₂ тяжелее воздуха?', варианты:[{т:'да',ок:true},{т:'нет',ок:false}], разбор:'44 > 29.' }
  ];
  function F9(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r118Reset()")}</div>` +
        ПРАВИЛО('Mr = Σ (Ar × индекс).');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r118Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const клеткаЗ = (x,y,ш,e) => { const Л=L_(), цв=Л.клетка(x,y,ш,e);
    /* клетка без массы: закрываем красное число */
    return цв + `<rect x="${ф2(x+ш*0.2)}" y="${ф2(y+ш*0.8)}" width="${ф2(ш*0.6)}" height="${ф2(ш*0.16)}" rx="2" fill="#2a3038"/>` + тА(ф2(x+ш/2),ф2(y+ш*0.93),'?',ф2(ш*0.14),GOLD); };
  const Т = {
    т1:{ имя:'Атомная масса', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=170, y0=160, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+(отв?Л.клетка(118,18,100,з.e):клеткаЗ(118,18,100,з.e))+(отв?метка(168,128,'Ar('+з.e+') = '+з.ок,ЗЕ,{кегль:11}):'')+серия(ст),Н); } },
    т2:{ имя:'Mr молекулы', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=170, y0=160, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+формулаВ(168,80,з.ч.map(([e,n])=>[e,n,ч2(АР[e])]),42)+табло(168,108,250,отв?расчёт(з.ч):'Mr = ?',{кегль:расчёт(з.ч).length>22?10:12})+серия(ст),Н); } },
    т3:{ имя:'Легче или тяжелее воздуха', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=190, y0=180, отв=ст.ответ!=null, вверх=з.m<ВОЗДУХ, y=отв?(вверх?52:y0-28):110;
        return свгЛ(L_().студия(Н,y0)+`<path d="M168 ${y+30} Q172 ${(y+30+y0)/2} 168 ${y0}" stroke="#e8ecf0" stroke-width=".9" fill="none" opacity="${отв&&!вверх?0:.8}"/>`+шарик(168,y,'#ff8a5a',формула(з.ч),0.8)+
          (отв?метка(270,70,'Mr = '+ч2(з.m),вверх?ЗЕ:КР,{кегль:11}):метка(270,70,'Mr = ?','#6a7480',{кегль:11}))+метка(270,100,'воздух · 29',СН,{кегль:10})+серия(ст),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие задания.':'В новом круге задания другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r118Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r118T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r118TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L118 = {
    id: ID, title: 'Относительная молекулярная масса', ico: '⚖️',
    src: 'Химия · 7 класс · Молекулярная масса', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Атомная масса: атом против эталона.',
      'Сумматор: складываем массы атомов.',
      'Дуэль масс: какая молекула тяжелее.',
      'Чек Mr: сложные формулы.',
      'Лёгкий газ, тяжёлый газ: шарик и воздух.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: атомная масса.',
      'Тренажёр 2: Mr молекулы.',
      'Тренажёр 3: легче или тяжелее воздуха.'
    ],
    check: { q: 'Чему равна Mr(CO₂)? (C = 12, O = 16)', choices: ['28','32','44','56'], ans: 2, exp: 'Mr(CO₂) = 12 + 2 · 16 = 12 + 32 = 44.' },
    tasks: [
      { q: 'Чему равна Mr(H₂O)? (H = 1, O = 16)', kind: 'unit', ans: 18, tol: 0, hints: ['2 атома водорода и 1 кислород.', '2 · 1 + 16 = 2 + 16 = 18.'], sol: 'Mr(H₂O) = 2 · 1 + 16 = 18.' },
      { q: 'Чему равна Mr(SO₂)? (S = 32, O = 16)', kind: 'unit', ans: 64, tol: 0, hints: ['Один атом серы и два кислорода.', '32 + 2 · 16 = 32 + 32 = 64.'], sol: 'Mr(SO₂) = 32 + 2 · 16 = 64.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L118.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Атомная масса',3:'Сумматор',4:'Дуэль масс',5:'Чек Mr',6:'Шарик и воздух',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l118n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Молекулярная масса'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r118Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r118вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r118э=(i)=>{ const s=S(); if(!ЭЛЕМЕНТЫ[i]) return; s.э2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; chRender(0); };
  window.r118ат=(i)=>{ const s=S(); if(s.ок3) return; const n=s.ц3||0, Ц=ЦЕЛИ3[n], pts=раскладкаМ(Ц.м,1), отм=(s.отм3||[]).slice();
    if(i===-1){ i=pts.findIndex((_,k)=>!отм.includes(k)); if(i<0) return; }
    if(!pts[i]) return;
    if(отм.includes(i)){ s.отз3={ок:false,т:'Этот атом уже на ленте — дважды его не считают.'}; chRender(0); return; }
    отм.push(i); s.отм3=отм; s.отз3=null;
    if(отм.length===pts.length){ s.ок3=true; if(n>=ЦЕЛИ3.length-1) s.дело_молекулы=true; s.отз3={ок:true,т:'Mr('+формула(Ц.ч)+') = '+расчёт(Ц.ч)+'.'}; }
    chRender(0); };
  window.r118цдальше=()=>{ const s=S(); if(!s.ок3||(s.ц3||0)>=ЦЕЛИ3.length-1) return; s.ц3=(s.ц3||0)+1; s.ок3=false; s.отм3=[]; s.отз3=null; chRender(0); };
  window.r118д=(j)=>{ const s=S(); if(s.ок4) return; const n=s.д4||0, Д=ДУЭЛИ[n], mл=Mr(Д.лч), mп=Mr(Д.пч), нужно=mл>mп?0:mл===mп?1:2;
    const текст='Mr('+формула(Д.лч)+') = '+расчёт(Д.лч)+'; Mr('+формула(Д.пч)+') = '+расчёт(Д.пч)+'.';
    if(j===нужно){ s.ок4=true; if(n>=ДУЭЛИ.length-1) s.дело_дуэль=true; s.отз4={ок:true,т:текст}; }
    else s.отз4={ок:false,j:j,т:'Посчитай ещё раз: '+текст.replace(/= ([\d,]+);/,'= ?;').replace(/= ([\d,]+)\.$/,'= ?.')};
    chRender(0); };
  window.r118ддальше=()=>{ const s=S(); if(!s.ок4||(s.д4||0)>=ДУЭЛИ.length-1) return; s.д4=(s.д4||0)+1; s.ок4=false; s.отз4=null; chRender(0); };
  window.r118р=(j)=>{ const s=S(); if(s.ок5) return; const n=s.ч5||0, Ч=ЧЕКИ[n], р=s.р5||0; if(р>=Ч.ч.length) return;
    const [e,k]=Ч.ч[р], ВАР=ВАР5(e,k,n+р), v=ВАР[j]; if(v==null) return;
    if(v===АР[e]*k){ s.р5=р+1; s.отз5={ок:true,т:e+(k>1?sub(k):'')+': '+(k>1?k+' × '+ч2(АР[e])+' = ':'')+ч2(v)+'.'};
      if(р+1>=Ч.ч.length){ s.ок5=true; if(n>=ЧЕКИ.length-1) s.дело_чек=true; s.отз5={ок:true,т:'Итого: Mr('+формула(Ч.ч)+') = '+расчёт(Ч.ч)+'.'}; } }
    else s.отз5={ок:false,j:j,т:k>1?'Атомов '+e+' — '+k+'. Ar нужно умножить на индекс: '+k+' × '+ч2(АР[e])+'.':'Атом '+e+' один — берём его Ar из таблицы: '+ч2(АР[e])+'.'};
    chRender(0); };
  window.r118чдальше=()=>{ const s=S(); if(!s.ок5||(s.ч5||0)>=ЧЕКИ.length-1) return; s.ч5=(s.ч5||0)+1; s.р5=0; s.ок5=false; s.отз5=null; chRender(0); };
  window.r118г=(i)=>{ const s=S(); if(!ГАЗЫ[i]) return; s.г6=i; const в=Object.assign({},s.вид6||{}); в[i]=true; s.вид6=в; chRender(0); };
  window.r118мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r118заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r118Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r118Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r118T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r118TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r118Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L118,{__планПорядок:arr[м].__планПорядок}); else arr.push(L118); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU118={render:render, L:L118};
})();
