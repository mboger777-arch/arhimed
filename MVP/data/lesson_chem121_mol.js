/* ============ ХИМИЯ · УРОК 121 · «КОЛИЧЕСТВО ВЕЩЕСТВА: МОЛЬ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   8 класс, манера NOBOOK (как 39–120). Карточка 121 из банка подменяется этой записью (VISKW[121]).
   Урок 39 («Молярная масса») отвешивает 1 моль; здесь — моль как счётная порция и расчёты n, m, M, N.
   Приборы — MVP/data/ris_lab.js (window.РЛ); модели молекул и рычажные весы — помощники из урока 118.

   ШАГИ.
   1) Карточка: пять порций по 1 моль — разная масса, одинаковое число частиц.
   2) Дюжина химика: живой ползунок n — лотки яиц (12 n) и стакан воды на весах (18 n г, N = n·N<sub>A</sub>).
   3) Моль против моля: выбери вещества на чаши — весы качаются, а счётчики частиц равны.
   4) Отвесь порцию: m = n·M, затем часовое стекло, «Тара», шпатель — пять навесок.
   5) Детектив M: по n и m найти M и опознать вещество на полке.
   6) Счётчик частиц: молекулы и атомы в порции.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 121;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'отвес',    имя:'Отвесь порцию',     итог:'5 из 5'},
    {ключ:'детектив', имя:'Детектив M',        итог:'5 из 5'},
    {ключ:'счёт',     имя:'Счётчик частиц',    итог:'4 из 4'},
    {ключ:'марафон',  имя:'Проверка: марафон', итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Понять, что такое моль, научиться находить количество вещества n, массу m и число частиц N.'],
    ['Принцип','Частицы считают «порциями»: <b>1 моль</b> — это 6,02·10²³ частиц (<b>число Авогадро N<sub>A</sub></b>). Масса 1 моль — <b>молярная масса M</b>, г/моль; численно равна Mr. <b>n = m : M</b>, <b>m = n · M</b>, <b>N = n · N<sub>A</sub></b>.'],
    ['Оборудование','Электронные весы, часовое стекло, шпатель, банки с серой, железом, углём, солью и мелом, периодическая система, модели молекул, лотки яиц для сравнения.'],
    ['Ход работы','1. Сравнить моль с дюжиной.<br>2. Положить на весы по 1 моль разных веществ.<br>3. Рассчитать и отвесить порции.<br>4. Опознать вещество по M.<br>5. Посчитать молекулы и атомы.'],
    ['Безопасность','Вещества берут только шпателем и кладут на часовое стекло, а не на чашу весов. Серу и железо не нагревать без учителя. Просыпанное собрать влажной салфеткой, руки вымыть.']
  ];
  const ч2 = (v) => String(v).replace('.',',');
  const ок1 = (v) => ч2(Math.round(v*10)/10);
  const ок2 = (v) => ч2(Math.round(v*100)/100);
  const NA = 6.02;
  const СТЕП = {20:'²⁰',21:'²¹',22:'²²',23:'²³',24:'²⁴',25:'²⁵',26:'²⁶'};
  /* k порций Авогадро → «a·10ⁿ» */
  const авог = (k) => { if(!k) return '0'; let v=k*NA, e=23; while(v>=10){ v/=10; e++; } while(v<1){ v*=10; e--; } return ок2(v)+'·10'+СТЕП[e]; };
  const ИНД = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map(c=>ИНД[+c]).join('');
  const АР = {H:1,C:12,N:14,O:16,Na:23,Mg:24,Al:27,S:32,Cl:35.5,Ca:40,Fe:56,Cu:64,Zn:65};
  const СОСТАВ = {'H₂O':[['H',2],['O',1]],'CO₂':[['C',1],['O',2]],'O₂':[['O',2]],'H₂':[['H',2]],'N₂':[['N',2]],'NaCl':[['Na',1],['Cl',1]],'CaCO₃':[['Ca',1],['C',1],['O',3]],
    'NH₃':[['N',1],['H',3]],'CH₄':[['C',1],['H',4]],'SO₂':[['S',1],['O',2]],'Fe':[['Fe',1]],'Cu':[['Cu',1]],'S':[['S',1]],'C':[['C',1]],'Al':[['Al',1]],'Mg':[['Mg',1]],'Zn':[['Zn',1]]};
  const M = (ф) => СОСТАВ[ф].reduce((a,[e,n])=>a+АР[e]*n,0);
  const расчётM = (ф) => { const ч=СОСТАВ[ф]; return (ч.length===1&&ч[0][1]===1)?ч2(M(ф)):ч.map(([e,n])=>n>1?n+' × '+ч2(АР[e]):ч2(АР[e])).join(' + ')+' = '+ч2(M(ф)); };
  const атомов = (ф) => СОСТАВ[ф].reduce((a,[e,n])=>a+n,0);
  const атомовЭ = (ф,e) => (СОСТАВ[ф].find(x=>x[0]===e)||[e,0])[1];

  /* порции по 1 моль */
  const ПОРЦИИ = [
    {ф:'H₂O', имя:'вода',    вид:'вода'},
    {ф:'NaCl',имя:'соль',    вид:'соль'},
    {ф:'Cu',  имя:'медь',    вид:'медь'},
    {ф:'S',   имя:'сера',    вид:'сера'},
    {ф:'C',   имя:'уголь',   вид:'уголь'},
    {ф:'Fe',  имя:'железо',  вид:'железо'},
    {ф:'Al',  имя:'алюминий',вид:'песок'}
  ];
  /* отвесь порцию */
  const ОТВЕС = [
    {ф:'S',     n:0.5, вид:'сера',   имя:'серы'},
    {ф:'Fe',    n:0.5, вид:'железо', имя:'железа'},
    {ф:'C',     n:3,   вид:'уголь',  имя:'угля'},
    {ф:'NaCl',  n:0.2, вид:'соль',   имя:'соли'},
    {ф:'CaCO₃', n:0.1, вид:'мел',    имя:'мела'}
  ];
  const СТЕКЛО = 12.4; /* масса часового стекла, г */
  /* детектив M */
  const ДЕЛА5 = [
    {n:2,    m:128,  ответ:'Cu',   полка:['Fe','Cu','S','NaCl']},
    {n:0.25, m:14,   ответ:'Fe',   полка:['Al','C','Fe','Cu']},
    {n:3,    m:54,   ответ:'H₂O',  полка:['H₂O','S','CO₂','C']},
    {n:0.5,  m:22,   ответ:'CO₂',  полка:['O₂','CO₂','NaCl','Fe']},
    {n:0.1,  m:5.85, ответ:'NaCl', полка:['S','Cu','Al','NaCl']}
  ];
  /* счётчик частиц */
  const СЧЁТ = [
    {ф:'H₂O', n:0.5, что:'молекул',      k:1},
    {ф:'H₂O', n:0.5, что:'атомов водорода', k:2},
    {ф:'O₂',  n:2,   что:'атомов кислорода', k:2},
    {ф:'CO₂', n:1,   что:'атомов всего',  k:3}
  ];
  const МАРАФОН = [
    {q:'1 моль — это порция вещества, в которой…', вар:['6,02·10²³ частиц','ровно 1 г вещества','22,4 частицы'], в:0, р:'Число Авогадро N<sub>A</sub> = 6,02·10²³ моль⁻¹.'},
    {q:'M(H₂O) =', вар:['18 г/моль','18 г','10 г/моль'], в:0, р:'2 × 1 + 16 = 18, единица — г/моль.'},
    {q:'Сколько моль в 36 г воды?', вар:['2','0,5','18'], в:0, р:'n = 36 : 18 = 2 моль.'},
    {q:'Масса 0,5 моль серы (M = 32 г/моль):', вар:['64 г','16 г','32 г'], в:1, р:'m = 0,5 × 32 = 16 г.'},
    {q:'Сколько молекул в 2 моль CO₂?', вар:['1,2·10²⁴','3,01·10²³','2·10²³'], в:0, р:'2 × 6,02·10²³ = 12,04·10²³ ≈ 1,2·10²⁴.'},
    {q:'Где больше молекул: в 1 моль H₂ или в 1 моль O₂?', вар:['поровну','в O₂','в H₂'], в:0, р:'В любом моле — 6,02·10²³ частиц.'},
    {q:'Сколько всего атомов в 1 моль H₂O?', вар:['6,02·10²³','1,2·10²⁴','1,8·10²⁴'], в:2, р:'В молекуле 3 атома: 3 × 6,02·10²³ ≈ 1,8·10²⁴.'},
    {q:'0,25 моль вещества весят 16 г. Это…', вар:['медь (64)','сера (32)','кислород O₂ (32)'], в:0, р:'M = 16 : 0,25 = 64 г/моль — медь.'},
    {q:'Масса 3 моль углерода:', вар:['4 г','12 г','36 г'], в:2, р:'3 × 12 = 36 г.'},
    {q:'Количество вещества n =', вар:['m : M','m · M','M : m'], в:0, р:'n = m : M.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['H₂O',36],['H₂O',9],['CO₂',88],['CO₂',11],['O₂',64],['O₂',8],['Fe',112],['Fe',28],['Cu',32],['S',96],['C',6],['NaCl',117],['CaCO₃',25],['H₂',10],['Al',54],['Mg',12]]
    .map(([ф,m])=>{ const Mm=M(ф), n=m/Mm, нет=Mm/m;
      return {q:'Сколько моль в '+ч2(m)+' г '+ф+'?', ф:ф, m:m, n:n, ок:ок2(n)+' моль', нет:ок2(Math.abs(нет-n)<0.01?n*2:нет)+' моль',
        раз:'M('+ф+') = '+расчётM(ф)+' г/моль; n = '+ч2(m)+' : '+ч2(Mm)+' = '+ок2(n)+' моль.'}; }));
  const П2 = поМесту([['H₂O',2],['CO₂',0.5],['O₂',3],['Fe',0.25],['Cu',2],['S',0.5],['C',4],['NaCl',2],['CaCO₃',0.5],['H₂',5],['Al',2],['Mg',0.5],['N₂',2],['CH₄',3],['NH₃',2],['Zn',0.2]]
    .map(([ф,n])=>{ const Mm=M(ф), m=n*Mm;
      return {q:'Какова масса '+ч2(n)+' моль '+ф+'?', ф:ф, n:n, m:m, ок:ок2(m)+' г', нет:ок1(Mm/n)+' г',
        раз:'M('+ф+') = '+ч2(Mm)+' г/моль; m = '+ч2(n)+' × '+ч2(Mm)+' = '+ок2(m)+' г.'}; }));
  const П3 = поМесту([['H₂O',1,'молекул'],['H₂O',1,'H'],['H₂O',0.5,'всего'],['CO₂',2,'молекул'],['CO₂',1,'O'],['O₂',0.5,'O'],['Fe',2,'атомов'],['Cu',0.1,'атомов'],
    ['NH₃',1,'H'],['CH₄',0.5,'H'],['N₂',3,'молекул'],['H₂',1,'H'],['SO₂',0.5,'всего'],['C',0.25,'атомов'],['CO₂',0.5,'всего'],['H₂O',2,'O']]
    .map(([ф,n,что])=>{ const k=что==='молекул'||что==='атомов'?1:что==='всего'?атомов(ф):атомовЭ(ф,что), ок=авог(n*k), нет=k===1?авог(n*2):авог(n);
      const назв=что==='молекул'?'молекул':что==='атомов'?'атомов':что==='всего'?'атомов всего':'атомов '+что;
      return {q:'Сколько '+назв+' в '+ч2(n)+' моль '+ф+'?', ф:ф, n:n, k:k, назв:назв, ок:ок, нет:нет,
        раз:(k>1?'В частице '+ф+' — '+k+' '+(что==='всего'?'атома':'атома '+что)+'. ':'')+'N = '+ч2(n)+(k>1?' × '+k:'')+' × 6,02·10²³ = '+ок+'.'}; }));

  const CSS=`
  #lvis .s6.l121n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l121n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l121n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l121n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l121n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l121n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l121n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l121n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l121n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l121n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l121n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l121n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l121n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l121n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l121n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l121n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l121n table.итоги td{white-space:normal!important}
  #lvis .s6.l121n table.итоги td:first-child{width:46%}
  #lvis .s6.l121n table.итоги{table-layout:fixed}
  #lvis .s6.l121n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l121n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l121n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l121n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l121n .ask button{text-align:left}
  #lvis .s6.l121n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l121n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l121n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l121n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l121n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l121n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l121n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l121n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l121n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l121n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l121n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l121n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l121n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l121n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l121n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l121n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l121n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l121n .плитка span{text-align:center}
  #lvis .s6.l121n .плитка:active{transform:scale(.96)}
  #lvis .s6.l121n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l121n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l121n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l121n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l121n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l121n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l121n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l121n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l121n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l121n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l121n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l121n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l121n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l121n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l121n{gap:14px}
  #lvis .s6.l121n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l121n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l121n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l121n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l121n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l121n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l121n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l121n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l121n .карт .текст b{color:${GOLD}}
  #lvis .s6.l121n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l121n .правило b{color:${GOLD}}
  #lvis .s6.l121n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l121n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l121n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l121n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l121n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l121n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l121n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l121n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l121n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l121n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l121n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l121n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l121n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l121n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l121n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l121n .буйки button.мимо{border-color:${RED};animation:l121nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l121nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l121n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l121n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l121n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l121n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l121n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l121n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l121n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l121n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l121n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l121n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l121n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l121n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l121n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l121n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l121n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l121n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l121n .уровни .точка.сейчас{background:${GOLD};animation:l121ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l121ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l121n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l121n{-webkit-text-size-adjust:100%}
  #lvis .s6.l121n [data-anim]{animation:l121nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l121nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l121n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l121n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l121n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l121n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l121n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l121n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l121n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l121n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l121n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l121n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l121n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l121n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l121n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l121n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l121n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l121n .акт span.до{background:#24402c}
  #lvis .s6.l121n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l121n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l121n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l121n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l121n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l121n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l121n .две-колонки li{margin:2px 0}
  #lvis .s6.l121n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l121n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l121n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l121n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l121n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l121n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l121n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l121n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l121n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l121n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l121n ul.памятка li{margin:3px 0}
  #lvis .s6.l121n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l121n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l121n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l121n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l121n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l121n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l121n table.тепло td,#lvis .s6.l121n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l121n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l121n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l121n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l121n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l121n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l121n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l121n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l121n table.детектив th{width:auto!important}
  #lvis .s6.l121n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l121n table.детектив td{font-size:12.5px}
  #lvis .s6.l121n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l121n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l121n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l121n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l121n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l121n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l121n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l121n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l121n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l121n .ряд.символы button b{font-size:19px}
  #lvis .s6.l121n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l121n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l121n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l121n .коэф-яч b{font-size:26px}
  #lvis .s6.l121n .пульт-ползун{display:grid;grid-template-columns:48px 1fr 48px;gap:8px 10px;align-items:center;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:10px 10px 8px;width:100%;box-sizing:border-box}
  #lvis .s6.l121n .пульт-ползун .шапка-п{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}
  #lvis .s6.l121n .пульт-ползун .шапка-п span{font-size:14px;color:#9aa3ad}
  #lvis .s6.l121n .пульт-ползун .шапка-п b{font-size:26px;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l121n .пульт-ползун button{height:44px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;font-size:22px;font-weight:700;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l121n .пульт-ползун button:active{transform:translateY(2px)}
  #lvis .s6.l121n input[type=range].ползун{width:100%;height:44px;margin:0;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}
  #lvis .s6.l121n input[type=range].ползун::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l121n input[type=range].ползун::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e8e0cc);border:3px solid #ffd76a;margin-top:-10px;box-shadow:0 2px 8px rgba(0,0,0,.6)}
  #lvis .s6.l121n input[type=range].ползун::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l121n input[type=range].ползун::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6efe0;border:3px solid #ffd76a}
  #lvis .s6.l121n .атомы button.вкл{border-color:#ffd76a;color:#ffd76a;background:rgba(255,215,106,.15)}
  #lvis .s6.l121n .атомы button{font-size:16px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l121n [data-anim]{animation:none!important}
    #lvis .s6.l121n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l121n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l121n-style');
      if(!s){ s=document.createElement('style'); s.id='l121n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r121Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c121-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c121-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c121-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c121-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c121-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c121-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c121-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c121-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c121-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c121-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c121-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c121-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <linearGradient id="c121-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a727c"/><stop offset=".12" stop-color="#3a424c"/><stop offset=".7" stop-color="#22272d"/><stop offset="1" stop-color="#121519"/>
      </linearGradient>
      <radialGradient id="c121-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c121-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c121-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c121-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c121-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c121-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c121-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c121-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c121-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c121-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c121-пад)"/>
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
      if(о.клик&&!отм) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+5)}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r121ат(${i})"/>`;
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
    <path d="M${ф2(x-ш/2)} ${y} L${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)} L${ф2(x+ш/2)} ${y} Z" fill="url(#c121-корпус)"/>
    <path d="M${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)}" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>
    ${табло(x-ш*0.08,y-25,ф2(ш*0.56),показ,{в:18,кегль:11})}
    <circle cx="${ф2(x+ш*0.3)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/><circle cx="${ф2(x+ш*0.38)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/>
    <rect x="${x-5}" y="${y-38}" width="10" height="8" fill="url(#c121-стальВ)"/>
    <ellipse cx="${x}" cy="${y-39}" rx="${ф2(ш*0.4)}" ry="5.5" fill="url(#c121-сталь)"/><ellipse cx="${x}" cy="${y-40.5}" rx="${ф2(ш*0.36)}" ry="3.6" fill="#dfe4ea" opacity=".55"/>`;

  /* ---------- рычажные весы: содержимое чаш — функции (cx, верх чаши) ---------- */
  const коромысло = (угол,левое,правое,опц) => { const о=опц||{}, px=168, py=о.py||100, h=104;
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t), низ=о.низ||250;
    const чаша=(cx,cy,f)=>{ const yп=cy+62;
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c121-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${f(cx,yп-4)}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c121-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    return `<path d="M${px-48} ${низ} L${px+48} ${низ} L${px+32} ${низ-12} L${px-32} ${низ-12} Z" fill="#2a3038"/><rect x="${px-40}" y="${низ-4}" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="${px-5}" y="${py}" width="10" height="${низ-12-py}" fill="url(#c121-стальВ)"/>
      <rect x="${px-18}" y="${py+44}" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(px+Math.sin(рад(g))*50)} ${ф2(py+Math.cos(рад(g))*50)} L${ф2(px+Math.sin(рад(g))*57)} ${ф2(py+Math.cos(рад(g))*57)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      ${о.замок?`<rect x="${px-74}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/><rect x="${px+68}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/>`:''}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M${px} ${py} L${px} ${py+56}" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c121-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c121-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c121-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,левое)}${чаша(rx,ry,правое)}`; };
  /* золотые гирьки-эталоны: n штук рядами по 10, (cx, y) — опора */
  const эталоны = (cx,y,n) => { let s=''; const целых=Math.floor(n), пол=n-целых>0;
    for(let i=0;i<целых+(пол?1:0);i++){ const ряд=Math.floor(i/10), j=i%10, вРяду=Math.min(10,целых+(пол?1:0)-ряд*10), x=cx+(j-(вРяду-1)/2)*6.2-2.7, yy=y-6-ряд*6.2;
      const ш=(пол&&i===целых)?2.7:5.4;
      s+=`<rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="5.4" rx=".8" fill="url(#c121-латунь)"/><rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="1.2" fill="#fff6d0" opacity=".7"/>`; }
    return s; };
  /* ---------- воздушный шарик ---------- */
  let шкN=0;
  const шарик = (x,y,цв,надпись,м) => { const k=м||1, R=34*k, ид='c121-шк'+(++шкN);
    return `<g>
      <radialGradient id="${ид}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${цв}"/><stop offset=".85" stop-color="${цв}"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#${ид})"/>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#c121-объём)" opacity=".7"/>
      <ellipse cx="${ф2(x-R*0.38)}" cy="${ф2(y-R*0.5)}" rx="${ф2(R*0.2)}" ry="${ф2(R*0.34)}" transform="rotate(25 ${ф2(x-R*0.38)} ${ф2(y-R*0.5)})" fill="url(#c121-блик)"/>
      <path d="M${ф2(x-4*k)} ${ф2(y+R*1.1+6*k)} L${x} ${ф2(y+R*1.1-1)} L${ф2(x+4*k)} ${ф2(y+R*1.1+6*k)} Z" fill="${цв}"/>
      ${надпись?`<text x="${x}" y="${ф2(y+5*k)}" text-anchor="middle" font-size="${ф2(16*k)}" font-weight="bold" fill="#fff" stroke="rgba(0,0,0,.35)" stroke-width="2" paint-order="stroke" font-family="${ШР}">${esc(надпись)}</text>`:''}
    </g>`; };

  /* ---------- порция вещества на столе: (x,y) — низ середины ---------- */
  const порция = (ф,x,y,м) => { const Л=L_(), к=м||1;
    if(ф==='H₂O') return Л.стакан(x,y,34*к,44*к,{уровень:.5,объём:100,деления:false});
    if(ф==='CO₂') return Л.баллон(x,y,0.42*к,'CO2');
    if(ф==='O₂') return Л.баллон(x,y,0.42*к,'O2');
    if(ф==='Fe'||ф==='Cu'||ф==='Al') return Л.часовое(x,y,46*к,ф==='Fe'?'железо':ф==='Cu'?'медь':'песок',6*к) + Л.образец(x,y-7*к,ф,0.62*к);
    const вид={NaCl:'соль',S:'сера',C:'уголь','CaCO₃':'мел'}[ф]||'соль';
    return Л.часовое(x,y,48*к,вид,(ф==='NaCl'?11:ф==='S'?8:6)*к); };
  /* табличка-счётчик частиц */
  const счётчик = (x,y,текст,цв) => { const ш=Math.max(116,String(текст).length*6.5+14), cx=Math.min(336-ш/2-2,Math.max(ш/2+2,x)); return `<rect x="${ф2(cx-ш/2)}" y="${y}" width="${ф2(ш)}" height="20" rx="4" fill="#06120a" stroke="#2a3a30"/>` +
    `<text x="${ф2(cx)}" y="${y+14}" text-anchor="middle" font-size="10.5" font-weight="bold" fill="${цв||'#7dffa0'}" font-family="'Courier New',monospace">${esc(текст)}</text>`; };
  const записка = (x,y,ш,строки,опц) => { const о=опц||{}, в=16+строки.length*15;
    return `<g filter="url(#c121-тень)" transform="rotate(${о.поворот==null?-2:о.поворот} ${x+ш/2} ${y+в/2})"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="2" fill="#fbf7ec"/>
      <rect x="${x}" y="${y}" width="${ш}" height="5" fill="${о.полоса||'#c8402a'}" opacity=".8"/>
      ${строки.map((t0,i)=>`<text x="${x+8}" y="${y+20+i*15}" font-size="${i===0?11:10.5}" font-weight="${i===0?'bold':'normal'}" fill="#2e2416" font-family="'Courier New',monospace">${esc(t0)}</text>`).join('')}</g>`; };

  /* ---------- живые ползунки ---------- */
  const ПОЛЗУН = (ключ,min,max,шаг,v,подпись,ед) => `<div class="пульт-ползун" data-anim style="--i:3">
      <div class="шапка-п"><span>${подпись}</span><b id="c121-в-${ключ}">${ч2(v)}${ед}</b></div>
      <button type="button" onclick="r121шаг('${ключ}',-1)">−</button>
      <input class="ползун" id="c121-п-${ключ}" type="range" min="${min}" max="${max}" step="${шаг}" value="${v}" oninput="r121пол('${ключ}',this.value)" onchange="r121отпуск(this)" aria-label="${подпись}">
      <button type="button" onclick="r121шаг('${ключ}',1)">+</button></div>`;

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=256, y0=212, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ряд=['H₂O','NaCl','Cu','S','C'], xs=[38,102,168,234,298];
    const пр = ряд.map((ф,i)=>порция(ф,xs[i],y0+10,1.45)).join('');
    const поверх = тА(168,30,'по 1 моль каждого вещества',13,GOLD) + тА(168,48,'в каждой порции — 6,02·10²³ частиц',10.5,'#c8ced6') +
      ряд.map((ф,i)=>метка(xs[i],y0-84,ф,'#6a7480',{кегль:11})+тА(xs[i],y0+30,ч2(M(ф))+' г',11,GOLD)).join('');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Количество вещества: моль') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r121вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('пара',['число частиц','масса'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что одинаково у всех пяти порций на столе?') :
          РАЗБОР(ок,['Верно: в каждой — 6,02·10²³ частиц.','Массы разные: 18 г, 58,5 г, 64 г… Одинаково <b>число частиц</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>1 моль</b> любого вещества — 6,02·10²³ частиц. Масса 1 моль — <b>M</b>, г/моль.') : '');
  }

  /* 2. Дюжина химика — живая сцена */
  function сцена2(s){
    const Н=280, y0=240, Л=L_(), n=s.n2==null?1:s.n2, лотков=Math.ceil(n), пол=n%1!==0;
    let яйца=''; for(let i=0;i<лотков;i++){ const y=y0+10-i*24, неполный=пол&&i===лотков-1;
      яйца+= неполный ? `<g clip-path="url(#c121-пол)">${Л.яйца(78,y,0.95)}</g>` : Л.яйца(78,y,0.95); }
    const верх=Л.весыВерх(y0+16,124);
    const пр = Л.весы(244,y0+16,124,{показ:(18*n).toFixed(1)}) + Л.стакан(244,верх,70,92,{уровень:Math.min(.9,18*n/100*0.95),объём:100,цвет:L_().цвет('вода')});
    const клип = `<clipPath id="c121-пол"><rect x="0" y="0" width="78" height="${Н}"/></clipPath>`;
    const поверх = клип + яйца +
      тА(78,24,'дюжина = 12 штук',11,'#c8ced6') + метка(78,34,'яиц: 12 × '+ч2(n)+' = '+ок1(12*n),ЗЛ,{кегль:11}) +
      тА(244,24,'моль = 6,02·10²³ штук',11,'#c8ced6') + метка(244,34,'воды: '+ч2(n)+' моль',СН,{кегль:11}) +
      счётчик(244,64,'N = '+авог(n)) + тА(244,100,'m = '+ч2(n)+' × 18 = '+ок1(18*n)+' г',11,GOLD) +
      `<path d="M150 60 H170" stroke="#9aa3ad" stroke-dasharray="3 3"/>`;
    return сцена(Н,y0,пр,поверх);
  }
  function F2(s){
    const n=s.n2==null?1:s.n2, видел=s.видел2||{}, в=s.ответ2, ок=в===0, готов=Object.keys(видел).length>=3;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Дюжина химика') +
      `<div class="pic тёмная" id="c121-ж-n2">${свгЛ(сцена2(s),280)}</div>` +
      ПОЛЗУН('n2',0.5,5,0.5,n,'Количество порций n',' ') +
      СКАЗ('Исследуй','Двигай ползунок: слева — лотки по дюжине яиц, справа — стакан воды на весах. Дюжина считает яйца по 12, моль считает молекулы по 6,02·10²³.') +
      (!готов ? СКАЗ('Ещё','Посмотри хотя бы три разных n.') :
        ОТВЕТЫ('три',['1,2·10²⁴','6,02·10²³','2·10²³'],0,в,2) + (в==null ? СКАЗ('Вопрос','Сколько молекул воды в 2 моль?') :
          РАЗБОР(ок,['Верно: 2 × 6,02·10²³ = 12,04·10²³ ≈ 1,2·10²⁴.','Это 1 моль. В 2 моль — вдвое больше: 1,2·10²⁴.','2·10²³ — забыли число Авогадро: 2 × 6,02·10²³ ≈ 1,2·10²⁴.'][в]))) +
      (ок ? ТЕОРИЯ('моль','<b>Моль</b> — единица количества вещества n. В 1 моль — <b>N<sub>A</sub> = 6,02·10²³</b> частиц (число Авогадро). Число частиц <b>N = n · N<sub>A</sub></b>.') +
        ДИВО('Если раздать моль монет всем 8 миллиардам людей на Земле, каждому достанется около 75 триллионов. А моль секунд — это в миллион раз больше возраста Вселенной.') : '');
  }

  /* 3. Моль против моля */
  function F3(s){
    const Н=284, Л=L_(), л=s.л3==null?2:s.л3, п=s.п3==null?6:s.п3, Пл=ПОРЦИИ[л], Пп=ПОРЦИИ[п], ml=M(Пл.ф), mp=M(Пп.ф), разн=mp-ml;
    const угол = разн===0?0:Math.sign(разн)*Math.min(13,Math.abs(разн)*0.25+3), пар=s.пар3||{}, в=s.ответ3, ок=в===0;
    const на=(Пр,m)=>(cx,y)=>{ if(Пр.ф==='H₂O') return Л.стакан(cx,y,30,36,{уровень:.55,объём:100,деления:false});
      if(['Fe','Cu','Al'].includes(Пр.ф)) return Л.образец(cx,y-1,Пр.ф,0.8);
      const h=Math.max(6,Math.sqrt(m)*2.2); return Л.кристаллы(cx,y,Math.min(78,30+m*0.5),h,Пр.вид,Math.round(14+m*0.5),(cx|0)+3); };
    const тело = Л.студия(Н,264) + коромысло(угол,на(Пл,ml),на(Пп,mp),{py:104,низ:264}) +
      метка(64,4,'1 моль '+Пл.ф+' · '+ч2(ml)+' г',разн<0?ЗЛ:'#6a7480',{кегль:11}) + метка(272,4,'1 моль '+Пп.ф+' · '+ч2(mp)+' г',разн>0?ЗЛ:'#6a7480',{кегль:11}) +
      счётчик(64,206,'N = 6,02·10²³') + счётчик(272,206,'N = 6,02·10²³') + тА(168,220,'=',22,GREEN) +
      тА(168,40,разн===0?'массы равны':'тяжелее '+(разн>0?'правая':'левая')+' порция',11,'#c8ced6');
    const кнопки=(сторона,выбор)=>`<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(7,minmax(0,1fr))">${ПОРЦИИ.map((x,i)=>`<button type="button" class="${выбор===i?'вкл':''}" onclick="r121чаша('${сторона}',${i})"><span style="font-size:13px">${x.ф}</span></button>`).join('')}</div>`;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Моль против моля') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      A(3,'карт','<span class="метка">Левая чаша</span>') + кнопки('л',л) + A(3,'карт','<span class="метка">Правая чаша</span>') + кнопки('п',п) +
      (Object.keys(пар).length<3 ? СКАЗ('Исследуй','Сравни хотя бы три пары. Весы показывают разную массу, а счётчики частиц под чашами — одинаковые.') :
        ОТВЕТЫ('три',['поровну','в железе','в алюминии'],0,в,3) + (в==null ? СКАЗ('Вопрос','Где больше атомов: в 1 моль железа (56 г) или в 1 моль алюминия (27 г)?') :
          РАЗБОР(ок,['Верно: в любом моле — 6,02·10²³ частиц. Атомы железа просто тяжелее.','Железо тяжелее, но атомов в моле столько же — <b>поровну</b>.','Алюминий легче, а атомов в моле столько же — <b>поровну</b>.'][в]))) +
      (ок ? ТЕОРИЯ('молярная масса','<b>Молярная масса M</b> — масса 1 моль, г/моль. Численно равна Mr: M(H₂O) = 18 г/моль, M(Cu) = 64 г/моль. Порции по 1 моль весят по-разному, потому что частицы разные по массе.') : '');
  }

  /* 4. Отвесь порцию */
  function F4(s){
    const Н=272, y0=236, Л=L_(), n0=Math.min(s.о4||0,ОТВЕС.length-1), О=ОТВЕС[n0], эт=s.эт4||0, ок=!!s.ок4, отз=s.отз4, готовых=n0+(ок?1:0), все=готовых>=ОТВЕС.length;
    const нужно=+(О.n*M(О.ф)).toFixed(2), вес=Object.assign({тара:false,m:0,стекло:false},s.вес4||{});
    const верх=Л.весыВерх(y0+16,170), показ=(вес.стекло?(вес.тара?вес.m:вес.m+СТЕКЛО):0).toFixed(1);
    const тело = Л.студия(Н,y0) + Л.банка(36,y0+12,48,70,{содержимое:О.вид,надпись:[О.ф]}) + Л.весы(156,y0+16,170,{показ:показ}) +
      (вес.стекло?Л.часовое(156,верх,70,О.вид,Math.min(16,вес.m*0.6)):'') + (эт===1&&!ок?Л.шпатель(122,верх-34,70,-24,{горка:О.вид}):'') +
      записка(240,36,88,['ЗАДАНИЕ',ч2(О.n)+' моль '+О.ф,эт>0||ок?'m = '+ч2(нужно)+' г':'m = ?']) +
      счётчик(156,40,ок?'N = '+авог(О.n):'N = ?') +
      (эт===1&&вес.стекло&&!ок?(вес.тара?метка(156,64,'тара учтена',ЗЕ,{кегль:10}):метка(156,64,'на табло — и стекло ('+ч2(СТЕКЛО)+' г)!',КР,{кегль:10})):'');
    const Mm=M(О.ф), V=[[ч2(нужно)+' г',1],[ок2(Mm/О.n)+' г',0],[ок2(О.n+Mm)+' г',0]], с=(n0)%3, ВАР=V.map((_,i)=>V[(i+с)%3]);
    let пульт='';
    if(!ок){
      if(эт===0) пульт = A(3,'карт задача','<span class="метка">Навеска '+(n0+1)+' из 5</span><div class="текст">Нужно '+ч2(О.n)+' моль '+О.имя+'. M('+О.ф+') = '+расчётM(О.ф)+' г/моль. Какую массу отвесить?</div>') +
        `<div class="ask три">${ВАР.map(([t0],j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r121расч("+j+")")).join('')}</div>`;
      else пульт = `<div class="атомы" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))"><button type="button" onclick="r121вес('стекло')">${вес.стекло?'✓ стекло':'Стекло на весы'}</button><button type="button" onclick="r121вес('тара')">Тара → 0</button><button type="button" onclick="r121вес('10')">+ 10 г</button><button type="button" onclick="r121вес('1')">+ 1 г</button><button type="button" onclick="r121вес('0.1')">+ 0,1 г</button><button type="button" onclick="r121вес('-0.1')">− 0,1 г</button></div>` +
        `<div class="ask">${BTN(5,'','Готово: навеска взята',"r121вес('готово')")}</div>`;
    }
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Отвесь порцию') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ОТВЕС.length,все?-1:n0,готовых) + пульт +
      (отз ? РАЗБОР(отз.ок,отз.т) : эт===1&&!ок ? СКАЗ('Взвешивание','Поставь часовое стекло, нажми «Тара», набери шпателем '+ч2(нужно)+' г '+О.имя+'.') : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая навеска →',"r121одальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('масса порции','<b>m = n · M</b>. 0,5 моль серы: 0,5 × 32 = 16 г; 3 моль угля: 3 × 12 = 36 г. Вещество кладут на часовое стекло и обнуляют его массу кнопкой «Тара».') : '');
  }

  /* 5. Детектив M */
  function F5(s){
    const Н=280, y0=244, Л=L_(), n0=Math.min(s.д5||0,ДЕЛА5.length-1), Д=ДЕЛА5[n0], эт=s.эт5||0, ок=!!s.ок5, отз=s.отз5, готовых=n0+(ок?1:0), все=готовых>=ДЕЛА5.length, Mn=+(Д.m/Д.n).toFixed(2);
    const xs=[46,128,210,292];
    let тело = Л.студия(Н,y0) + `<rect x="8" y="148" width="320" height="7" rx="2" fill="url(#рл-древесина)"/><rect x="8" y="155" width="320" height="3" fill="#000" opacity=".3"/>`;
    Д.полка.forEach((ф,i)=>{ тело += порция(ф,xs[i],148,1.05) + тА(xs[i],170,ф,11,'#eef2f6') + тА(xs[i],183,'M = '+ч2(M(ф)),9,'#9aa3ad'); });
    /* загадочный образец */
    тело += `<ellipse cx="168" cy="${y0-2}" rx="70" ry="10" fill="url(#c121-пад)"/>` +
      (ок ? порция(Д.ответ,168,y0,1.2) + метка(168,y0-74,'это '+Д.ответ+'!',ЗЕ,{кегль:12})
        : `<path d="M140 ${y0} Q138 ${y0-46} 168 ${y0-50} Q198 ${y0-46} 196 ${y0} Z" fill="#4a525c"/><path d="M146 ${y0-6} Q150 ${y0-40} 168 ${y0-44}" stroke="#8a939b" stroke-width="2" fill="none"/>` + тА(168,y0-16,'?',28,GOLD)) +
      записка(214,192,114,['ОБРАЗЕЦ X','n = '+ч2(Д.n)+' моль','m = '+ч2(Д.m)+' г'],{поворот:2}) +
      записка(10,192,104,['M = m : n',эт>0||ок?ч2(Д.m)+' : '+ч2(Д.n):'? : ?',эт>0||ок?'= '+ок2(Mn)+' г/моль':''],{поворот:-2,полоса:'#2a6ab8'}) + тА(168,24,'кто прячется под колпаком?',11,'#c8ced6');
    const V=[[ок2(Mn),1],[ок2(Д.m*Д.n),0],[ок2(Д.n/Д.m*100),0]], с=n0%3, ВАР=V.map((_,i)=>V[(i+с)%3]);
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Детектив M') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ДЕЛА5.length,все?-1:n0,готовых) +
      (ок ? '' : эт===0 ? A(3,'карт задача','<span class="метка">Дело '+(n0+1)+' из 5 · шаг 1</span><div class="текст">'+ч2(Д.n)+' моль образца весят '+ч2(Д.m)+' г. Найди M.</div>') +
          `<div class="ask три">${ВАР.map(([t0],j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0+' г/моль',"r121M("+j+")")).join('')}</div>`
        : A(3,'карт задача','<span class="метка">Дело '+(n0+1)+' из 5 · шаг 2</span><div class="текст">M = '+ок2(Mn)+' г/моль. Какое вещество с полки подходит?</div>') +
          `<div class="ask пара">${Д.полка.map((ф,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',ф,"r121кто("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее дело →',"r121ддальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('найти M по n и m','<b>M = m : n</b>. Зная M, вещество находят по таблице: M = 64 г/моль — медь, 18 — вода, 44 — углекислый газ. Будь внимателен: у S и O₂ одинаковая M = 32 г/моль.') : '');
  }

  /* 6. Счётчик частиц */
  function F6(s){
    const Н=262, n0=Math.min(s.с6||0,СЧЁТ.length-1), С=СЧЁТ[n0], ок=!!s.ок6, отз=s.отз6, готовых=n0+(ок?1:0), все=готовых>=СЧЁТ.length;
    const МОДЕЛЬ={'H₂O':'H2O','O₂':'O2','CO₂':'CO2'}[С.ф], ч=СОСТАВ[С.ф];
    const места=[[56,82],[150,70],[246,86],[96,156],[196,150],[286,150]];
    const тело = L_().студия(Н,262) + места.map(([x,y],i)=>`<g opacity="${i<5?1:.5}">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${i%2?-3:3};0 0" dur="${(2+i*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}${модель(x,y,0.68,МОДЕЛЬ)}</g>`).join('') +
      тА(300,170,'…',30,'#9aa3ad') + метка(168,4,ч2(С.n)+' моль '+С.ф+' = '+авог(С.n)+' молекул',ЗЛ,{кегль:11}) +
      счётчик(84,222,'молекул: '+авог(С.n)) + счётчик(252,222,ок?С.что+': '+авог(С.n*С.k):С.что+': ?',ок?'#ffd76a':'#7dffa0');
    const таблица = '<table class="итоги"><tr><th>Частицы</th><th>в 1 молекуле</th><th>в '+ч2(С.n)+' моль</th></tr><tr><td>молекулы</td><td>1</td><td>'+(ок||С.что!=='молекул'?авог(С.n):'?')+'</td></tr>'+
      ч.map(([e,k])=>'<tr><td>атомы '+e+'</td><td>'+k+'</td><td>'+(ок||e!==(С.что.includes('водород')?'H':С.что.includes('кислород')?'O':'—')?авог(С.n*k):'?')+'</td></tr>').join('')+
      '<tr><td>атомов всего</td><td>'+атомов(С.ф)+'</td><td>'+(ок||!С.что.includes('всего')?авог(С.n*атомов(С.ф)):'?')+'</td></tr></table>';
    const ок_=авог(С.n*С.k), V=[[ок_,1],[авог(С.n*(С.k===1?2:1)),0],[авог(С.n*С.k*2+(С.k===1?1:0)),0]], с=n0%3, ВАР=V.map((_,i)=>V[(i+с)%3]);
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Счётчик частиц') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(СЧЁТ.length,все?-1:n0,готовых) +
      A(3,'карт задача','<span class="метка">Подсчёт '+(n0+1)+' из 4</span><div class="текст">Сколько <b>'+С.что+'</b> в '+ч2(С.n)+' моль '+С.ф+'?</div>') +
      A(4,'карт','<span class="метка">Счётная таблица</span>'+таблица) +
      (ок ? '' : `<div class="ask три">${ВАР.map(([t0],j)=>BTN(5+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r121сч("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий подсчёт →',"r121сдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('молекулы и атомы','Моль H₂O — это 6,02·10²³ <b>молекул</b>. Но атомов водорода в нём вдвое больше, а всего атомов — втрое: каждая молекула несёт 3 атома. <b>N(атомов) = n · N<sub>A</sub> · число атомов в частице</b>.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=246, y0=212, Л=L_();
    const пр = порция('H₂O',52,y0+10,1.2) + порция('Cu',128,y0+10,1.1) + порция('S',204,y0+10,1.1) + Л.баллон(286,y0+10,0.5,'CO2');
    const поверх = тА(168,34,'n = m : M',20,GOLD) + тА(104,60,'m = n · M',13,'#eef2f6') + `<text x="232" y="60" text-anchor="middle" font-size="13" font-weight="bold" fill="#eef2f6" font-family="${ШР}">N = n · N<tspan font-size="9" dy="3">A</tspan></text>` +
      `<text x="168" y="82" text-anchor="middle" font-size="11" font-weight="bold" fill="#c8ced6" font-family="${ШР}">N<tspan font-size="8" dy="2.5">A</tspan><tspan dy="-2.5"> = 6,02·10²³ моль⁻¹</tspan></text>` +
      [['H₂O',52],['Cu',128],['S',204],['CO₂',286]].map(([ф,x])=>тА(x,y0+30,ф+' · '+M(ф)+' г',10,'#c8ced6')).join('');
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Количество вещества') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Моль</b> — порция из 6,02·10²³ частиц (число Авогадро).<br>• <b>M</b> — масса 1 моль, г/моль; численно равна Mr.<br>• n = m : M; m = n · M; N = n · N<sub>A</sub>.<br>• В 1 моль любого вещества частиц поровну, а массы разные.<br>• Атомов в порции = молекулы × атомы в молекуле.</div>') +
      ПРАВИЛО('<b>36 г воды</b> = 2 моль = 1,2·10²⁴ молекул.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=166, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.весы(84,y0+16,120,{показ:все?'18.0':'0.0'}) + Л.стакан(84,Л.весыВерх(y0+16,120),40,46,{уровень:все?.5:0,объём:100,деления:false}) +
      [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${Л.монеты(236+i*30,y0+8,11,6+i*2)}</g>`).join('');
    const поверх = Л.имяПрибора(266,y0+24,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Моли, граммы и частицы — под твоим контролем.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r121заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r121мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. n = m : M, N = n · N<sub>A</sub>.')) : '')) +
      (все ? ПРАВИЛО('n = m : M; N = n · N<sub>A</sub>.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Сколько моль в 88 г CO₂?', варианты:[{т:'2 моль',ок:true},{т:'0,5 моль',ок:false}], разбор:'88 : 44 = 2.' },
    { вопрос:'Масса 0,5 моль NaCl:', варианты:[{т:'117 г',ок:false},{т:'29,25 г',ок:true}], разбор:'0,5 × 58,5 = 29,25 г.' },
    { вопрос:'Сколько атомов в 0,5 моль железа?', варианты:[{т:'3,01·10²³',ок:true},{т:'1,2·10²⁴',ок:false}], разбор:'0,5 × 6,02·10²³.' },
    { вопрос:'2 моль вещества весят 64 г. M =', варианты:[{т:'128 г/моль',ок:false},{т:'32 г/моль',ок:true}], разбор:'64 : 2 = 32.' },
    { вопрос:'Атомов кислорода в 1 моль CO₂:', варианты:[{т:'1,2·10²⁴',ок:true},{т:'6,02·10²³',ок:false}], разбор:'2 атома O в молекуле: 2 × 6,02·10²³.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r121Reset()")}</div>` +
        ПРАВИЛО('n = m : M.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r121Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const Т = {
    т1:{ имя:'n = m : M', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.весы(96,y0+16,124,{показ:з.m.toFixed(1)})+порция(з.ф,96,Л.весыВерх(y0+16,124)+2,0.9),
          тА(252,62,'M('+з.ф+') = '+ч2(M(з.ф)),12,'#eef2f6')+тА(252,92,отв?'n = '+ок2(з.n)+' моль':'n = ?',15,отв?GOLD:'#9aa3ad'))+серия(ст),Н); } },
    т2:{ имя:'m = n · M', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.весы(96,y0+16,124,{показ:отв?з.m.toFixed(1):'?'})+порция(з.ф,96,Л.весыВерх(y0+16,124)+2,0.9),
          тА(252,62,ч2(з.n)+' моль '+з.ф,13,'#eef2f6')+тА(252,86,'M = '+ч2(M(з.ф))+' г/моль',11,'#c8ced6')+тА(252,114,отв?'m = '+ок2(з.m)+' г':'m = ?',15,отв?GOLD:'#9aa3ad'))+серия(ст),Н); } },
    т3:{ имя:'Сколько частиц', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=170, y0=160, отв=ст.ответ!=null, мод={'H₂O':'H2O','CO₂':'CO2','O₂':'O2','N₂':'N2','H₂':'H2','NH₃':'NH3','CH₄':'CH4','SO₂':'SO2'}[з.ф];
        return свгЛ(L_().студия(Н,y0)+(мод?модель(84,86,1.05,мод):порция(з.ф,84,120,1.1))+тА(240,60,ч2(з.n)+' моль '+з.ф,14,'#eef2f6')+тА(240,84,з.назв,11,'#c8ced6')+
          счётчик(240,100,отв?з.ок:'?')+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r121Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r121T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r121TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L121 = {
    id: ID, title: 'Количество вещества: моль', ico: '🧮',
    src: 'Химия · 8–9 класс · Количество вещества', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Дюжина химика: моль как счётная порция.',
      'Моль против моля: масса разная, частиц поровну.',
      'Отвесь порцию: m = n · M.',
      'Детектив M: опознай вещество.',
      'Счётчик частиц: молекулы и атомы.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: n = m : M.',
      'Тренажёр 2: m = n · M.',
      'Тренажёр 3: сколько частиц.'
    ],
    check: { q: 'Сколько моль воды в 36 г H₂O? (M = 18 г/моль)', choices: ['1','2','3','18'], ans: 1, exp: 'n = 36 : 18 = 2 моль.' },
    tasks: [
      { q: 'Сколько моль в 44 г CO₂? (M = 44 г/моль)', kind: 'unit', ans: 1, tol: 0, hints: ['n = m : M.', '44 : 44 = 1.'], sol: 'n = 44 : 44 = 1 моль.' },
      { q: 'Сколько моль водорода в 4 г H₂? (M = 2 г/моль)', kind: 'unit', ans: 2, tol: 0, hints: ['n = m : M.', '4 : 2 = 2.'], sol: 'n = 4 : 2 = 2 моль.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L121.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Дюжина химика',3:'Моль против моля',4:'Отвесь порцию',5:'Детектив M',6:'Счётчик частиц',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l121n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Моль'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  /* перерисовка урока: сначала снимаем фокус с ползунка — иначе wave_guard обновит только рисунок
     (на iPhone кнопка при нажатии фокус не забирает) */
  const ПЕРЕРИС = () => { try{ const a=document.activeElement; if(a&&a.type==='range') a.blur(); }catch(e){} chRender(0); };
  window.r121Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; ПЕРЕРИС(); };
  window.r121вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; ПЕРЕРИС(); };
  const ЖИВЫЕ = { n2:{min:0.5,max:5,шаг:0.5,ед:' ',сцена:сцена2,Н:280} };
  const живо = (ключ) => { const s=S(), Ж=ЖИВЫЕ[ключ]; try{
      const pic=document.getElementById('c121-ж-'+ключ); if(pic) pic.innerHTML=свгЛ(Ж.сцена(s),Ж.Н);
      const в=document.getElementById('c121-в-'+ключ); if(в) в.textContent=ч2(s[ключ])+Ж.ед;
      const п=document.getElementById('c121-п-'+ключ); if(п&&+п.value!==s[ключ]) п.value=s[ключ];
    }catch(e){} };
  window.r121пол=(ключ,v)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return;
    s[ключ]=+(Math.round(Math.max(Ж.min,Math.min(Ж.max,+v))/Ж.шаг)*Ж.шаг).toFixed(1);
    const в=Object.assign({},s.видел2||{}); в[s[ключ]]=true; s.видел2=в;
    живо(ключ); };
  /* отпустили ползунок: снимаем фокус (иначе wave_guard перерисовывает только рисунок) и перерисовываем урок целиком */
  window.r121отпуск=(el)=>{ try{ el.blur(); }catch(e){} ПЕРЕРИС(); };
  window.r121шаг=(ключ,d)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; const v=s[ключ]==null?1:s[ключ]; window.r121пол(ключ,v+d*Ж.шаг); };
  window.r121чаша=(сторона,i)=>{ const s=S(); if(!ПОРЦИИ[i]) return; if(сторона==='л') s.л3=i; else s.п3=i;
    const л=s.л3==null?2:s.л3, п=s.п3==null?6:s.п3; if(л!==п){ const пар=Object.assign({},s.пар3||{}); пар[[л,п].sort().join('-')]=true; s.пар3=пар; } ПЕРЕРИС(); };
  window.r121расч=(j)=>{ const s=S(); if(s.ок4||(s.эт4||0)!==0) return; const n0=s.о4||0, О=ОТВЕС[n0], нужно=+(О.n*M(О.ф)).toFixed(2), Mm=M(О.ф);
    const V=[[нужно,1],[Mm/О.n,0],[О.n+Mm,0]], с=n0%3, ВАР=V.map((_,i)=>V[(i+с)%3]); if(!ВАР[j]) return;
    if(ВАР[j][1]){ s.эт4=1; s.вес4={тара:false,m:0,стекло:false}; s.отз4={ок:true,т:'m = '+ч2(О.n)+' × '+ч2(Mm)+' = '+ч2(нужно)+' г. Теперь — к весам.'}; }
    else s.отз4={ок:false,j:j,т:'m = n · M — умножай количество на молярную массу: '+ч2(О.n)+' × '+ч2(Mm)+'.'};
    ПЕРЕРИС(); };
  window.r121вес=(что)=>{ const s=S(); if(s.ок4||(s.эт4||0)!==1) return; const n0=s.о4||0, О=ОТВЕС[n0], нужно=+(О.n*M(О.ф)).toFixed(2), вес=Object.assign({тара:false,m:0,стекло:false},s.вес4||{});
    if(что==='стекло'){ вес.стекло=true; s.отз4=null; }
    else if(что==='тара'){ if(!вес.стекло){ s.отз4={ок:false,т:'Сначала поставь часовое стекло — тару обнуляют вместе с посудой.'}; } else { вес.тара=true; s.отз4={ок:true,т:'Весы обнулены: стекло не считается.'}; } }
    else if(что==='готово'){
      if(!вес.стекло) s.отз4={ок:false,т:'Вещество кладут на часовое стекло, а не на чашу весов.'};
      else if(!вес.тара&&Math.abs(вес.m+СТЕКЛО-нужно)<0.05) s.отз4={ок:false,т:'На табло '+ч2(нужно)+' г — но вместе со стеклом! Вещества только '+ч2((вес.m).toFixed(1))+' г. Нужна «Тара».'};
      else if(Math.abs(вес.m-нужно)<0.05){ s.ок4=true; if(n0>=ОТВЕС.length-1) s.дело_отвес=true; s.отз4={ок:true,т:'Отвешено '+ч2(нужно)+' г = '+ч2(О.n)+' моль '+О.имя+': это '+авог(О.n)+' частиц.'}; }
      else s.отз4={ок:false,т:'На стекле '+ч2(вес.m.toFixed(1))+' г, а нужно '+ч2(нужно)+' г.'+(вес.тара?'':' И не забудь «Тару».')};
    }
    else { if(!вес.стекло){ s.отз4={ок:false,т:'Поставь на весы часовое стекло.'}; s.вес4=вес; ПЕРЕРИС(); return; } вес.m=Math.max(0,Math.min(80,+(вес.m+ +что).toFixed(1))); s.отз4=null; }
    s.вес4=вес; ПЕРЕРИС(); };
  window.r121одальше=()=>{ const s=S(); if(!s.ок4||(s.о4||0)>=ОТВЕС.length-1) return; s.о4=(s.о4||0)+1; s.ок4=false; s.эт4=0; s.вес4={тара:false,m:0,стекло:false}; s.отз4=null; ПЕРЕРИС(); };
  window.r121M=(j)=>{ const s=S(); if(s.ок5||(s.эт5||0)!==0) return; const n0=s.д5||0, Д=ДЕЛА5[n0], Mn=+(Д.m/Д.n).toFixed(2);
    const V=[[Mn,1],[Д.m*Д.n,0],[Д.n/Д.m*100,0]], с=n0%3, ВАР=V.map((_,i)=>V[(i+с)%3]); if(!ВАР[j]) return;
    if(ВАР[j][1]){ s.эт5=1; s.отз5={ок:true,т:'M = '+ч2(Д.m)+' : '+ч2(Д.n)+' = '+ок2(Mn)+' г/моль. Теперь сравни с полкой.'}; }
    else s.отз5={ок:false,j:j,т:'M = m : n — массу делим на количество: '+ч2(Д.m)+' : '+ч2(Д.n)+'.'};
    ПЕРЕРИС(); };
  window.r121кто=(j)=>{ const s=S(); if(s.ок5||(s.эт5||0)!==1) return; const n0=s.д5||0, Д=ДЕЛА5[n0], ф=Д.полка[j]; if(!ф) return;
    if(ф===Д.ответ){ s.ок5=true; if(n0>=ДЕЛА5.length-1) s.дело_детектив=true; s.отз5={ок:true,т:'Это '+ф+': M('+ф+') = '+расчётM(ф)+' г/моль.'}; }
    else s.отз5={ок:false,j:j,т:'У '+ф+' M = '+ч2(M(ф))+' г/моль, а нужно '+ок2(Д.m/Д.n)+'.'};
    ПЕРЕРИС(); };
  window.r121ддальше=()=>{ const s=S(); if(!s.ок5||(s.д5||0)>=ДЕЛА5.length-1) return; s.д5=(s.д5||0)+1; s.ок5=false; s.эт5=0; s.отз5=null; ПЕРЕРИС(); };
  window.r121сч=(j)=>{ const s=S(); if(s.ок6) return; const n0=s.с6||0, С=СЧЁТ[n0];
    const V=[[1],[0],[0]], с=n0%3, ВАР=V.map((_,i)=>V[(i+с)%3]); if(!ВАР[j]) return;
    if(ВАР[j][0]){ s.ок6=true; if(n0>=СЧЁТ.length-1) s.дело_счёт=true; s.отз6={ок:true,т:'N = '+ч2(С.n)+(С.k>1?' × '+С.k:'')+' × 6,02·10²³ = '+авог(С.n*С.k)+'.'}; }
    else s.отз6={ок:false,j:j,т:С.k>1?'В каждой молекуле '+С.ф+' — '+С.k+' таких атома. Умножь число молекул на '+С.k+'.':'Молекул столько, сколько порций Авогадро: n × 6,02·10²³.'};
    ПЕРЕРИС(); };
  window.r121сдальше=()=>{ const s=S(); if(!s.ок6||(s.с6||0)>=СЧЁТ.length-1) return; s.с6=(s.с6||0)+1; s.ок6=false; s.отз6=null; ПЕРЕРИС(); };
  window.r121мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; ПЕРЕРИС(); };
  window.r121заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; ПЕРЕРИС(); };
  window.r121Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; ПЕРЕРИС(); };
  window.r121Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; ПЕРЕРИС(); };
  window.r121T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; ПЕРЕРИС(); };
  window.r121TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; ПЕРЕРИС(); };
  window.r121Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; ПЕРЕРИС(); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L121,{__планПорядок:arr[м].__планПорядок}); else arr.push(L121); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU121={render:render, L:L121};
})();
