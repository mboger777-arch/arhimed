/* ============ ХИМИЯ · УРОК 39 · «МОЛЯРНАЯ МАССА» · ВИРТУАЛЬНЫЙ ОПЫТ ============
   Вторая переделка по просьбе владельца: «посмотри, как уроки делает NOBOOK».
   Урок устроен как виртуальный опыт: тёмная графитовая сцена без комнаты (всё
   внимание на приборах), карточка опыта (цель · принцип · оборудование · ход),
   лоток приборов и реактивов внизу, список шагов с галочками и подсказками при
   неверном действии, лупа «микромир» (частицы вещества), табло весов, таблица
   результатов и диаграмма, вывод. Рисунки — MVP/data/ris_lab.js (window.РЛ):
   студия, весы, часовое стекло, шпатель, банки, цилиндр, спиртовка, пипетка,
   плакат Периодической системы, модели молекул, лупа с кристаллической решёткой
   NaCl, решётками металлов, кольцами серы и молекулами воды.

   ОПЫТЫ. 1) Отвешиваем 1 моль NaCl: весы → ON → часовое стекло → TARE → расчёт
   M(NaCl) → шпателем до 58,5 г → лупа. 2) Моль шести веществ: для каждого реактива
   сначала считаем M, потом весы показывают массу 1 моль, строка ложится в таблицу.
   3) Сколько моль на весах: 36 г воды, 128 г меди, 16 г серы.

   ТЕОРИЯ (8 класс): масса атома ~10⁻²⁴ г; Ar — во сколько раз атом тяжелее 1/12
   атома углерода-12; Mr — сумма Ar с индексами; n, моль; Nа = 6,02·10²³ моль⁻¹;
   M = m : n, г/моль, численно равна Mr; m = M·n; N = n·Nа. Ar(Cl) = 35,5. */
(function(){
  'use strict';

  const ID = 39;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'опыт1',   имя:'Опыт 1: 1 моль NaCl',     итог:'58,5 г'},
    {ключ:'таблица', имя:'Опыт 2: моль шести веществ', итог:'6 из 6'},
    {ключ:'марафон', имя:'Проверка: марафон',       итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться отмерять заданное <b>количество вещества</b> — 1 моль — и выяснить, почему моли разных веществ весят по-разному.'],
    ['Принцип','Атомы нельзя пересчитать поштучно: их слишком много, а каждый слишком лёгкий (атом водорода — 1,66·10⁻²⁴ г). Поэтому частицы <b>считают взвешиванием</b>, порциями. Порция химиков — <b>1 моль = 6,02·10²³ частиц</b>. Масса 1 моль — <b>молярная масса M</b> (г/моль); она численно равна Mr — сумме Ar атомов формулы. <b>m = M · n</b>.'],
    ['Оборудование','<b>Приборы:</b> электронные весы (0,1 г), часовое стекло, шпатель, мерный цилиндр, лупа «микромир».<br><b>Реактивы:</b> хлорид натрия NaCl, сахароза C₁₂H₂₂O₁₁, железо Fe, медь Cu, сера S, уголь C, вода H₂O.'],
    ['Ход опыта','1. Отвесить 1 моль NaCl.<br>2. Отвесить по 1 моль шести веществ, заполнить таблицу.<br>3. По массе навески найти количество вещества.<br>4. Сделать вывод.'],
    ['Безопасность','Работаем в очках. Реактивы <b>не пробуют на вкус</b> и не берут руками — только шпателем, и сразу закрывают банку. На весы не ставят горячее и мокрое, не насыпают вещество прямо на чашку — только на часовое стекло. Рассыпанное убирает учитель.']
  ];
  const ЭЛЕМЕНТЫ = ['H','C','O','Na','S','Cl','Fe','Cu'];
  const ЛУПА_ЭЛ = {H:'вода',O:'вода',C:'уголь',Na:'соль',Cl:'соль',S:'сера',Fe:'железо',Cu:'медь'};
  const АТОМЫ_К = {C:{Ar:12,ц:['#8a9098','#2a2e34'],т:'#fff',r:12}, H:{Ar:1,ц:['#ffffff','#a8b0b8'],т:'#333',r:8}, O:{Ar:16,ц:['#ff7a6a','#9a1a10'],т:'#fff',r:11}, N:{Ar:14,ц:['#8aa8ff','#1a2a8a'],т:'#fff',r:10.5}, S:{Ar:32,ц:['#fff07a','#a88a00'],т:'#5a4a00',r:13}};
  const МОЛЕКУЛЫ = [
    {ф:'H₂O', м:'H2O', счёт:'2·Ar(H) + Ar(O) = 2·1 + 16', Mr:18, имя:'вода', состав:{H:2,O:1}},
    {ф:'CO₂', м:'CO2', счёт:'Ar(C) + 2·Ar(O) = 12 + 2·16', Mr:44, имя:'углекислый газ', состав:{C:1,O:2}},
    {ф:'O₂',  м:'O2',  счёт:'2·Ar(O) = 2·16', Mr:32, имя:'кислород', состав:{O:2}},
    {ф:'CH₄', м:'CH4', счёт:'Ar(C) + 4·Ar(H) = 12 + 4·1', Mr:16, имя:'метан', состав:{C:1,H:4}},
    {ф:'NH₃', м:'NH3', счёт:'Ar(N) + 3·Ar(H) = 14 + 3·1', Mr:17, имя:'аммиак', состав:{N:1,H:3}}
  ];
  /* опыт 1: шаги; что — плитка лотка или действие */
  const ШАГИ1 = [
    {т:'Поставь на стол электронные весы.',             что:'весы'},
    {т:'Включи весы кнопкой ON.',                       что:'ON'},
    {т:'Поставь на чашу весов часовое стекло.',         что:'часовое'},
    {т:'Нажми TARE — весы вычтут массу стекла.',        что:'TARE'},
    {т:'Рассчитай молярную массу NaCl.',                что:'расчёт'},
    {т:'Шпателем насыпь NaCl ровно до 58,5 г.',         что:'насыпать'},
    {т:'Рассмотри навеску в лупу «микромир».',          что:'лупа'}
  ];
  const ЛОТОК1 = [['весы','Весы'],['часовое','Часовое стекло'],['шпатель','Шпатель'],['соль','NaCl'],['лупа','Лупа'],['спиртовка','Спиртовка'],['колба','Колба'],['цилиндр','Цилиндр']];
  /* опыт 2: реактивы и варианты молярной массы (верный — первый) */
  const РЕАКТИВЫ = [
    {вид:'вода',   ф:'H₂O',       M:18,  имя:'вода',    вар:[18,17,10],   счёт:'2·1 + 16'},
    {вид:'сахар',  ф:'C₁₂H₂₂O₁₁', M:342, имя:'сахароза', вар:[342,29,180], счёт:'12·12 + 22·1 + 11·16'},
    {вид:'железо', ф:'Fe',        M:56,  имя:'железо',  вар:[56,26,28],   счёт:'Ar(Fe) = 56'},
    {вид:'медь',   ф:'Cu',        M:64,  имя:'медь',    вар:[64,29,32],   счёт:'Ar(Cu) = 64'},
    {вид:'сера',   ф:'S',         M:32,  имя:'сера',    вар:[32,16,64],   счёт:'Ar(S) = 32'},
    {вид:'уголь',  ф:'C',         M:12,  имя:'уголь',   вар:[12,6,24],    счёт:'Ar(C) = 12'}
  ];
  const ПОРЯДОК_ВАР = [[1,0,2],[0,2,1],[2,1,0],[1,2,0],[0,1,2],[2,0,1]];
  /* опыт 3: навески — найти количество вещества */
  const НАВЕСКИ = [
    {вид:'вода', ф:'H₂O', m:36,  M:18, n:'2',   вар:['0,5','2','648'], в:1, N:'2 · 6,02·10²³ = 12,04·10²³ молекул'},
    {вид:'медь', ф:'Cu',  m:128, M:64, n:'2',   вар:['2','0,5','192'], в:0, N:'2 · 6,02·10²³ = 12,04·10²³ атомов'},
    {вид:'сера', ф:'S',   m:16,  M:32, n:'0,5', вар:['2','16','0,5'],  в:2, N:'0,5 · 6,02·10²³ = 3,01·10²³ атомов'}
  ];
  const МАРАФОН = [
    {q:'Молярная масса кислорода O₂?', вар:['16 г/моль','32 г/моль','64 г/моль'], в:1, р:'M(O₂) = 2·16 = 32 г/моль.'},
    {q:'Молярная масса поваренной соли NaCl?', вар:['58,5 г/моль','23 г/моль','35,5 г/моль'], в:0, р:'23 + 35,5 = 58,5 г/моль.'},
    {q:'Масса 3 моль воды?', вар:['18 г','6 г','54 г'], в:2, р:'m = M·n = 18 · 3 = 54 г.'},
    {q:'Сколько моль в 128 г меди (Ar = 64)?', вар:['2 моль','64 моль','0,5 моль'], в:0, р:'n = m : M = 128 : 64 = 2 моль.'},
    {q:'Сколько молекул в 2 моль воды?', вар:['6,02·10²³','12,04·10²³','2'], в:1, р:'N = n·N<sub>A</sub> = 2 · 6,02·10²³ = 12,04·10²³.'},
    {q:'Молярная масса углекислого газа CO₂?', вар:['28 г/моль','32 г/моль','44 г/моль'], в:2, р:'12 + 2·16 = 44 г/моль.'},
    {q:'Масса 0,5 моль сахара (M = 342 г/моль)?', вар:['171 г','342 г','684 г'], в:0, р:'342 · 0,5 = 171 г.'},
    {q:'Молярная масса серной кислоты H₂SO₄ (H 1, S 32, O 16)?', вар:['49 г/моль','98 г/моль','96 г/моль'], в:1, р:'2·1 + 32 + 4·16 = 98 г/моль.'},
    {q:'Сколько моль в 11,2 г железа (Ar = 56)?', вар:['5 моль','0,5 моль','0,2 моль'], в:2, р:'11,2 : 56 = 0,2 моль.'},
    {q:'У 1 моль воды и 1 моль железа одинаковы…', вар:['число частиц','масса','объём'], в:0, р:'В любом моле 6,02·10²³ частиц, а массы разные: 18 г и 56 г.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['H₂O',18,17,'2·1 + 16'],['CO₂',44,28,'12 + 2·16'],['O₂',32,16,'2·16'],['H₂',2,1,'2·1'],['N₂',28,14,'2·14'],['CH₄',16,13,'12 + 4·1'],
    ['NH₃',17,15,'14 + 3·1'],['HCl',36.5,35.5,'1 + 35,5'],['H₂SO₄',98,49,'2·1 + 32 + 4·16'],['CaCO₃',100,68,'40 + 12 + 3·16'],['NaOH',40,24,'23 + 16 + 1'],
    ['SO₂',64,48,'32 + 2·16'],['Fe₂O₃',160,72,'2·56 + 3·16'],['CuO',80,64,'64 + 16'],['MgO',40,24,'24 + 16'],['NaCl',58.5,23,'23 + 35,5']]
    .map(([ф,M,н,сч])=>({q:'Молярная масса '+ф+'?', ф:ф, M:M, ок:String(M).replace('.',',')+' г/моль', нет:String(н).replace('.',',')+' г/моль', раз:'M('+ф+') = '+сч+' = '+String(M).replace('.',',')+' г/моль. Индекс показывает, сколько таких атомов.'})));
  const П2 = поМесту([['вода','H₂O',18,3,'вода'],['углекислый газ','CO₂',44,2,'вода'],['кислород','O₂',32,0.5,'вода'],['железо','Fe',56,2,'железо'],['медь','Cu',64,0.25,'медь'],
    ['сера','S',32,4,'сера'],['метан','CH₄',16,5,'вода'],['соль','NaCl',58.5,2,'соль'],['уголь','C',12,10,'уголь'],['сахар','C₁₂H₂₂O₁₁',342,0.5,'сахар'],
    ['аммиак','NH₃',17,2,'вода'],['мел','CaCO₃',100,0.3,'соль'],['железо','Fe',56,0.5,'железо'],['вода','H₂O',18,10,'вода'],['медь','Cu',64,3,'медь'],['кислород','O₂',32,4,'вода']]
    .map(([имя,ф,M,n,вид])=>{ const m=Math.round(M*n*100)/100, н=Math.round(M/n*100)/100, чис=(v)=>String(v).replace('.',',');
      return {q:'Какова масса '+чис(n)+' моль '+(имя==='вода'?'воды':имя==='соль'?'соли':имя==='медь'?'меди':имя==='сера'?'серы':имя==='мел'?'мела':имя==='сахар'?'сахара':имя==='уголь'?'угля':имя==='железо'?'железа':имя==='кислород'?'кислорода':имя==='метан'?'метана':имя==='аммиак'?'аммиака':'углекислого газа')+' ('+ф+', M = '+чис(M)+' г/моль)?', ф:ф, M:M, n:n, m:m, вид:вид, ок:чис(m)+' г', нет:чис(н===m?M+n:н)+' г', раз:'m = M · n = '+чис(M)+' · '+чис(n)+' = '+чис(m)+' г. Молярную массу умножают на количество.'}; }));
  const П3 = поМесту([['H₂O',18,36,'вода'],['O₂',32,16,'вода'],['Fe',56,112,'железо'],['Cu',64,16,'медь'],['CO₂',44,132,'вода'],['NaCl',58.5,117,'соль'],['C',12,6,'уголь'],['S',32,96,'сера'],
    ['H₂O',18,9,'вода'],['Fe',56,28,'железо'],['CH₄',16,64,'вода'],['Cu',64,320,'медь'],['H₂',2,10,'вода'],['C₁₂H₂₂O₁₁',342,684,'сахар'],['NaOH',40,10,'соль'],['CaCO₃',100,250,'соль']]
    .map(([ф,M,m,вид])=>{ const n=Math.round(m/M*1000)/1000, н=Math.round(M/m*1000)/1000, чис=(v)=>String(v).replace('.',',');
      return {q:'Сколько моль в '+чис(m)+' г '+ф+' (M = '+чис(M)+' г/моль)?', ф:ф, M:M, m:m, n:n, вид:вид, ок:чис(n)+' моль', нет:чис(н===n?n*2:н)+' моль', раз:'n = m : M = '+чис(m)+' : '+чис(M)+' = '+чис(n)+' моль. Делим массу на молярную массу, не наоборот.'}; }));

  const CSS=`
  #lvis .s6.l39n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l39n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l39n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l39n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l39n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l39n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l39n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l39n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l39n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l39n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l39n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l39n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l39n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l39n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l39n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l39n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l39n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l39n .плитка span{text-align:center}
  #lvis .s6.l39n .плитка:active{transform:scale(.96)}
  #lvis .s6.l39n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l39n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l39n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l39n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l39n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l39n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l39n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l39n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l39n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l39n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l39n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l39n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l39n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l39n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l39n{gap:14px}
  #lvis .s6.l39n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l39n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l39n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l39n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l39n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l39n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l39n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l39n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l39n .карт .текст b{color:${GOLD}}
  #lvis .s6.l39n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l39n .правило b{color:${GOLD}}
  #lvis .s6.l39n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l39n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l39n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l39n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l39n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l39n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l39n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l39n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l39n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l39n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l39n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l39n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l39n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l39n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l39n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l39n .буйки button.мимо{border-color:${RED};animation:l39nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l39nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l39n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l39n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l39n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l39n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l39n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l39n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l39n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l39n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l39n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l39n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l39n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l39n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l39n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l39n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l39n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l39n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l39n .уровни .точка.сейчас{background:${GOLD};animation:l39ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l39ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l39n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l39n{-webkit-text-size-adjust:100%}
  #lvis .s6.l39n [data-anim]{animation:l39nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l39nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l39n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l39n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l39n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l39n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l39n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l39n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l39n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l39n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l39n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l39n .вкладки button.опасно{border-color:rgba(232,106,90,.55)}
  #lvis .s6.l39n .вкладки button.опасно.вкл{border-color:#e86a5a;color:#ff9a8a}
  #lvis .s6.l39n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l39n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px}
  #lvis .s6.l39n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l39n .атомы button small{display:block;font-size:11px;font-weight:600;color:#9aa3ad}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l39n [data-anim]{animation:none!important}
    #lvis .s6.l39n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l39n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l39n-style');
      if(!s){ s=document.createElement('style'); s.id='l39n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r39Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Виртуальная лаборатория</span><b class="${всё?'готово':''}">${
        всё?'опыты выполнены':ДЕЛА.filter(д=>сделано(s,д.ключ)).length+' из 3'}</b></div>
       <ul>${ДЕЛА.map(д=>{
         const есть = сделано(s,д.ключ);
         return `<li class="${есть?'есть':''}"><i>${есть?'✓':'·'}</i>${д.имя}<span>${есть?д.итог:'—'}</span></li>`;
       }).join('')}</ul>`);
  };

  /* ================= АНИМАЦИЯ ================= */
  const ДВИЖ = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const КРИВАЯ = '0.23 1 0.32 1';
  const сплайны = (n) => Array.from({length:n},()=>КРИВАЯ).join(';');
  const анК = (имя,значения,длит,keyTimes,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite"
              calcMode="spline" keyTimes="${keyTimes}" keySplines="${сплайны(keyTimes.split(';').length-1)}" ${доп||''}/>` : '';
  const анЛин = (имя,значения,длит,доп) =>
    ДВИЖ ? `<animate attributeName="${имя}" values="${значения}" dur="${длит}" repeatCount="indefinite" ${доп||''}/>` : '';
  const ЗАВОД = `<rect width="0" height="0" fill="none"><animate attributeName="x" values="0;0" dur="1s" repeatCount="indefinite"/></rect>`;
  const кт = (v) => Math.min(0.95, Math.max(0.03, v)).toFixed(2);
  const проявить = (длит,доля,конец) => анК('opacity','0.45;0.45;1;1',длит,'0;'+кт(доля)+';'+кт(конец)+';1');
  const сдвигРаз = (из,в,длит,задержка) => ДВИЖ ?
    `<animateTransform attributeName="transform" type="translate" from="${из}" to="${в}" dur="${длит}" begin="${(задержка||0).toFixed(2)}s"
       fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="${КРИВАЯ}"/>` : '';

  /* ================= РИСУНОК ================= */
  const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const т = (x,y,текст,кегль,цвет,жирный,якорь,ореол) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль||14}"
       ${жирный?'font-weight="bold"':''} fill="${цвет||ИНК}"
       ${ореол?`stroke="${ореол}" stroke-width="3" paint-order="stroke" stroke-linejoin="round"`:''}
       font-family="Georgia,'Times New Roman',serif">${esc(текст)}</text>`;
  /* слово с выделенным окончанием */
  const тОк = (x,y,осн,ок,кегль,цвет,цветОк,якорь) =>
    `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${кегль}" font-weight="bold" fill="${цвет}" font-family="Georgia,'Times New Roman',serif">${esc(осн)}<tspan fill="${цветОк}">${esc(ок)}</tspan></text>`;
  const Р = () => window.РМ;
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c39-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c39-лампа" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stop-color="#ffd890" stop-opacity=".5"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/>
      </radialGradient>
    </defs>`;
  const свг = (тело, высота) =>
    `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
       ${Р().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const рамка = (в) => `<rect x="0.8" y="0.8" width="334.4" height="${в-1.6}" rx="14" fill="none" stroke="${ЛИНИЯ}" stroke-width="1.6"/>`;
  const подпись = (x,y,текст,цвет,кегль) => {
    const к=кегль||14, ш=String(текст).length*к*0.64+20, в=к+11;
    const cx = Math.min(336-ш/2-6, Math.max(ш/2+6, x));
    return `<g filter="url(#c39-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c39-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c39-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c39-плиты)"/>
    <g data-декор="1" stroke="#a8926a" stroke-width=".7" opacity=".55">
      ${[0.08,0.2,0.36,0.56,0.8].map(t=>`<line x1="0" y1="${(y0+(Н-y0)*t).toFixed(1)}" x2="336" y2="${(y0+(Н-y0)*t).toFixed(1)}"/>`).join('')}
      ${[-3,-2,-1,0,1,2,3,4].map(k=>`<line x1="${168+k*30}" y1="${y0}" x2="${168+k*110}" y2="${Н}"/>`).join('')}
    </g>`;
  /* мраморная табличка со словом; (0,0) — низ */
  const табличка = (текст,цвет,кегль) => `<g><rect x="-31" y="-24" width="62" height="24" rx="3" fill="url(#рм-мрамор)" stroke="${ОБВОД}" stroke-width=".9"/>
    <text x="0" y="-7.5" text-anchor="middle" font-size="${кегль||11}" font-weight="bold" fill="${цвет||КАМЕНЬ}" font-family="Georgia,serif">${esc(текст)}</text></g>`;
  const ударение = (w) => esc(w).replace(/([А-ЯЁ])/g,'<tspan fill="#b8321e">$1</tspan>');
  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  const L_ = () => window.РЛ;
  const чис = (v) => String(v).replace('.',',');
  const тА = (x,y,t0,к,цв,якорь) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`;
  const ДВ = () => L_().ДВИЖ;
  const свгЖ39 = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  /* сцена опыта: графитовая студия, отражения в столе, предметы, надписи */
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return Л.студия(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
  const свгЛ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  /* табличка на тёмной сцене: полупрозрачная тёмная плашка, светлый текст */
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; };
  const подставка = (x,yм,yст) => `<ellipse cx="${x+4}" cy="${yст+1}" rx="22" ry="3" fill="#000" opacity=".5" filter="url(#рл-мягко)"/><rect x="${x-1.6}" y="${yм}" width="3.2" height="${yст-yм-4}" fill="url(#рл-сталь)"/><ellipse cx="${x}" cy="${yст-3}" rx="18" ry="4" fill="#15171a"/><ellipse cx="${x}" cy="${yст-4.4}" rx="18" ry="4" fill="url(#рл-сталь)"/>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Удивительно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ФОРМ = (html,метка0) => A(5,'карт','<span class="метка">'+(метка0||'Формула')+'</span><div class="текст" style="font-size:22px;text-align:center;font-family:Georgia,serif">'+html+'</div>');
  /* список шагов опыта с галочками */
  const ШАГИ = (список,текущий) => A(4,'шаги-опыта','<div class="шаги-заг">Ход опыта</div><ol>'+список.map((ш0,i)=>
    '<li class="'+(i<текущий?'done':i===текущий?'now':'')+'"><i>'+(i<текущий?'✓':(i+1))+'</i><span>'+ш0+'</span></li>').join('')+'</ol>');
  /* лоток приборов и реактивов */
  const ЛОТОК = (плитки,обработчик,отметки) => `<div class="лоток" data-anim style="--i:3">${плитки.map(([что,имя],i)=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}" onclick="${обработчик}('${что}')">${L_().значок(что)}<span>${имя}</span></button>`).join('')}</div>`;

  /* ================= КАДРЫ ================= */

  /* 1. Карточка опыта */
  function F1(s){
    const Н=230, y0=172, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ч=Л.весыВерх(y0+14,100);
    const пр = Л.весы(70,y0+14,100,{показ:''}) + Л.часовое(70,ч,44,'пусто') + Л.шпатель(128,y0+12,36,-8,{}) +
      [['соль','NaCl'],['сахар','C₁₂H₂₂O₁₁'],['железо','Fe'],['медь','Cu'],['сера','S']].map(([v,ф],i)=>Л.банка(160+i*26,y0+12,22,34,{содержимое:v,надпись:[ф],мал:true})).join('') +
      Л.цилиндр(306,y0+14,14,90,{мл:40});
    const поверх = Л.имяПрибора(70,y0+30,'электронные весы')+Л.имяПрибора(212,y0+30,'реактивы')+Л.имяПрибора(306,y0+30,'цилиндр') +
      Л.лупа(206,74,40,'соль',{подпись:'NaCl под лупой'}) + метка(96,20,'Опыт: 1 моль разных веществ',ЗЛ,{кегль:12});
    return ЖУРНАЛ(s) + ШАПКА('Карточка опыта','Молярная масса') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r39вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок карточки — как перед настоящим опытом.') :
        ОТВЕТЫ('пара',['6,02·10²³ частиц','1 грамм вещества'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что такое 1 моль?') :
          РАЗБОР(ок,['Верно: моль — это порция из 6,02·10²³ частиц. Масса у разных веществ разная.',
            'Грамм — это масса. Моль — <b>количество</b>: 6,02·10²³ частиц, как «дюжина» — 12 штук.'][в]))) +
      (ок ? ПРАВИЛО('<b>Количество вещества n</b> измеряют в молях. 1 моль = <b>6,02·10²³</b> частиц (постоянная Авогадро N<sub>A</sub>).') : '');
  }

  /* 2. Справочник: относительная атомная масса */
  function F2(s){
    const Н=250, y0=206, Л=L_(), к=s.э2==null?2:s.э2, вид=s.види2||{}, все=Object.keys(вид).length>=4, в=s.ответ2, ок=в===0;
    const сим=ЭЛЕМЕНТЫ[к], e=Л.ЭЛ[сим];
    const пр = Л.банка(168,y0+12,32,46,{содержимое:ЛУПА_ЭЛ[сим]==='вода'?undefined:ЛУПА_ЭЛ[сим],стекло:ЛУПА_ЭЛ[сим]==='вода'?'янтарь':'прозрачное',надпись:[сим]});
    const поверх = Л.таблица(14,24,196,{выдел:{[сим]:true}}) + Л.клетка(228,20,92,сим) + Л.лупа(60,160,34,ЛУПА_ЭЛ[сим],{}) +
      метка(262,126,'Ar('+сим+') = '+чис(e[2]),ЗЛ,{кегль:12});
    return ЖУРНАЛ(s) + ШАПКА('Справочник','Относительная атомная масса') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${ЭЛЕМЕНТЫ.map((x,i)=>BTN(3,к===i?'вкл':'',x,'r39э('+i+')')).join('')}</div>` +
      ТЕОРИЯ('Ar','Атомы сравнивают с эталоном — <b>1/12 массы атома углерода</b>. <b>Ar</b> показывает, во сколько раз атом тяжелее этой доли; единиц у Ar нет. Ar берут из таблицы и округляют до целых, кроме хлора: <b>35,5</b>.') +
      (!все ? СКАЗ('Справочник','Открой хотя бы четыре элемента. В лупе — как выглядят частицы вещества.') :
        ОТВЕТЫ('пара',['16','8'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','Какова относительная атомная масса кислорода?') :
          РАЗБОР(ок,['Верно: Ar(O) = 16. Число 8 в углу клетки — порядковый номер.',
            '8 — <b>порядковый номер</b> в углу клетки. Масса — внизу: Ar(O) = <b>16</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Ar</b> — число внизу клетки таблицы Менделеева; не путай с порядковым номером в углу.') : '');
  }

  /* 3. Микромир: сколько частиц в моле */
  function F3(s){
    const Н=262, y0=206, Л=L_(), ур=Math.min(s.ув3||0,4), в=s.ответ3, ок=в===0;
    const ч=Л.весыВерх(y0+14,112);
    const пр = Л.весы(84,y0+14,112,{показ:'18.0'}) + Л.стакан(84,ч,52,62,{уровень:.55,объём:100}) + (ур>=1&&ур<4?Л.пипетка(150,y0-62,0.9,true):'');
    const капля = (cx,cy,r) => `<rect x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" fill="#0e1a24"/><path d="M${cx} ${cy-r*0.7} Q${cx-r*0.55} ${cy} ${cx-r*0.45} ${cy+r*0.25} Q${cx-r*0.35} ${cy+r*0.62} ${cx} ${cy+r*0.62} Q${cx+r*0.35} ${cy+r*0.62} ${cx+r*0.45} ${cy+r*0.25} Q${cx+r*0.55} ${cy} ${cx} ${cy-r*0.7} Z" fill="hsla(198,70%,70%,.75)" stroke="#bfe6fa" stroke-width="1.2"/><ellipse cx="${cx-r*0.18}" cy="${cy+r*0.05}" rx="${r*0.1}" ry="${r*0.2}" fill="#fff" opacity=".8"/>`;
    const табло = `<g><rect x="16" y="22" width="304" height="86" rx="12" fill="#0c1016" stroke="#3a4a5a" stroke-width="2"/><rect x="24" y="30" width="288" height="44" rx="6" fill="#0a1a12"/>
      <text x="168" y="59" text-anchor="middle" font-size="15" font-weight="bold" fill="#7aff9a" font-family="'Courier New',monospace" textLength="272" lengthAdjust="spacingAndGlyphs">602 214 076 000 000 000 000 000</text>
      ${ДВ()?`<rect x="24" y="30" width="288" height="44" rx="6" fill="#7aff9a" opacity="0"><animate attributeName="opacity" values="0;.08;0" dur="1.2s" repeatCount="indefinite"/></rect>`:''}
      <text x="168" y="96" text-anchor="middle" font-size="12" font-weight="bold" fill="#c8ced6" font-family="'Helvetica Neue',Arial,sans-serif">молекул в 18 г воды · N(A) = 6,02·10²³</text></g>`;
    const поверх = (ур<4 ? метка(84,10,'18 г воды = 1 моль',СН,{кегль:11}) : '') +
      (ур===1 ? Л.лупа(250,104,52,null,{внутри:капля(250,104,52),подпись:'капля ≈ 0,05 г'}) : '') +
      (ур===2 ? Л.лупа(250,104,56,'вода',{подпись:'×100 000 000'}) : '') +
      (ур===3 ? `<circle cx="250" cy="104" r="62" fill="url(#рл-прожектор)"/><circle cx="250" cy="104" r="58" fill="none" stroke="#3a4a5a" stroke-dasharray="3 4"/>` + Л.молекула(250,104,2.1,'H2O',{подписи:true}) + метка(250,174,'одна молекула ≈ 0,3 нм',ЗЛ,{кегль:10}) : '') +
      (ур===4 ? табло + метка(206,232,'по одной в секунду — 19 квадриллионов лет',КР,{кегль:9}) : '');
    const ТЕКСТ=['В стакане 18 мл воды. Весы показывают 18,0 г — это ровно 1 моль воды.','Одна капля — примерно 0,05 г. Но и в ней уже около <b>1,7·10²¹</b> молекул.',
      'Увеличим в сто миллионов раз: видны молекулы H₂O. Они всё время движутся и толкаются.','Вот одна молекула: атом кислорода и два атома водорода. Её размер — около 0,3 нанометра.',
      'Во всём стакане — <b>6,02·10²³</b> молекул: шестьсот тысяч миллиардов миллиардов. Это и есть 1 моль.'];
    const КНОПКА=['Взять каплю пипеткой →','Увеличить ×100 000 000 →','Рассмотреть одну молекулу →','Сосчитать весь стакан →'];
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Сколько частиц в 1 моль') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(5,ур,ур) +
      A(4,'карт','<span class="метка">Увеличение · '+(ур+1)+' из 5</span><div class="текст">'+ТЕКСТ[ур]+'</div>') +
      (ур<4 ? `<div class="ask">${BTN(5,'',КНОПКА[ур],"r39ув()")}</div>` :
        `<div class="ask">${BTN(5,'','↺ Сначала',"r39ув(0)")}</div>` +
        ТЕОРИЯ('моль и постоянная Авогадро','<b>Моль</b> — единица количества вещества n. В 1 моль любого вещества <b>N<sub>A</sub> = 6,02·10²³</b> частиц. Число частиц: <b>N = n · N<sub>A</sub></b>.') +
        ДИВО('Если считать молекулы одного моля по одной в секунду, понадобится около 19 квадриллионов лет — в <b>миллион с лишним раз</b> больше, чем существует Вселенная. А весит этот моль всего 18 граммов — глоток воды.') +
        ОТВЕТЫ('пара',['12,04·10²³','36'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Сколько молекул в 2 моль воды?') :
          РАЗБОР(ок,['Верно: N = 2 · 6,02·10²³ = 12,04·10²³.','36 — это граммы (масса 2 моль). Молекул: N = n · N<sub>A</sub> = <b>12,04·10²³</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>N = n · N<sub>A</sub></b>, где N<sub>A</sub> = 6,02·10²³ моль⁻¹ — постоянная Авогадро.') : '');
  }

  /* 4. Модель молекулы: Mr */
  function F4(s){
    const Н=256, y0=200, Л=L_(), к=s.м4==null?0:s.м4, вид=s.видм4||{}, все=Object.keys(вид).length>=3, в=s.ответ4, ок=в===0;
    const М=МОЛЕКУЛЫ[к], сб=s.сб4||{}, элементы=['C','H','O','N'];
    const Mr = элементы.reduce((a,e)=>a+(сб[e]||0)*АТОМЫ_К[e].Ar,0), всего=элементы.reduce((a,e)=>a+(сб[e]||0),0);
    const готово = элементы.every(e=>(сб[e]||0)===(М.состав[e]||0));
    const шар = (x,y,e) => { const A0=АТОМЫ_К[e], id='c39-ат-'+e; return `<radialGradient id="${id}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="${A0.ц[0]}"/><stop offset="1" stop-color="${A0.ц[1]}"/></radialGradient>
      <ellipse cx="${x+2}" cy="${y+A0.r+2}" rx="${A0.r*0.8}" ry="2" fill="#000" opacity=".35" filter="url(#рл-мягко)"/><circle cx="${x}" cy="${y}" r="${A0.r}" fill="url(#${id})"/>${тА(x,y+A0.r*0.36,e,A0.r*0.95,A0.т)}`; };
    let x0=40, атомы='';
    элементы.forEach(e=>{ for(let i=0;i<(сб[e]||0);i++){ атомы+=шар(x0,174,e); x0+=АТОМЫ_К[e].r*2+6; } });
    const лоток = `<rect x="16" y="150" width="${Math.max(120,x0-8)}" height="48" rx="12" fill="rgba(12,14,18,.6)" stroke="#4a525c" stroke-dasharray="4 4"/>`;
    const поверх = (готово ? `<circle cx="168" cy="84" r="64" fill="url(#рл-прожектор)"/>` + Л.молекула(168,84,1.9,М.м,{подписи:true}) + метка(168,6,М.ф+' — '+М.имя+' ✓',ЗЕ,{кегль:12})
        : метка(168,6,'собери: '+М.ф+' — '+М.имя,ЗЛ,{кегль:12}) + тА(168,86,всего?'добавляй атомы…':'нажимай на атомы внизу',12,'#6a7480')) +
      лоток + атомы + метка(250,154,'Mr = '+Mr,готово?ЗЕ:СН,{кегль:13}) + (готово?метка(168,118,М.счёт+' = '+М.Mr,ЗЛ,{кегль:10}):'');
    return ЖУРНАЛ(s) + ШАПКА('Конструктор','Собери молекулу — посчитай Mr') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      `<div class="ряд" style="grid-template-columns:repeat(5,minmax(0,1fr))">${МОЛЕКУЛЫ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:17px">'+(вид[i]?'✓':'')+x.ф+'</span>','r39мол('+i+')')).join('')}</div>` +
      `<div class="атомы" data-anim style="--i:4">${элементы.map(e=>`<button type="button" onclick="r39ат('${e}')">+${e}<small>Ar = ${АТОМЫ_К[e].Ar}</small></button>`).join('')}<button type="button" onclick="r39ат('')">↺<small>сброс</small></button></div>` +
      (s.отз4 ? РАЗБОР(s.отз4.ок,s.отз4.т) : '') +
      ТЕОРИЯ('Mr','<b>Относительная молекулярная масса Mr</b> — сумма Ar всех атомов формулы. Индекс умножает: в H₂O два атома водорода — 2·1. Молярная масса <b>M</b> численно равна Mr, только в г/моль: M(H₂O) = 18 г/моль.') +
      (!все ? СКАЗ('Конструктор','Собери хотя бы три молекулы — Mr считается сам, атом за атомом.') :
        ОТВЕТЫ('пара',['44','28'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Mr(CO₂) = ?') :
          РАЗБОР(ок,['Верно: 12 + 2·16 = 44.','28 = 12 + 16 — забыт индекс. Кислорода два: 12 + 2·16 = <b>44</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Mr = сумма Ar с учётом индексов. M (г/моль) = Mr.</b>') : '');
  }

  /* 5. Опыт 1: отвешиваем 1 моль NaCl */
  function F5(s){
    const Н=220, y0=168, Л=L_(), ш=Math.min(s.о1||0,ШАГИ1.length), м=s.о1м||0, отз=s.о1отз, готово=ш>=ШАГИ1.length;
    const ч=Л.весыВерх(y0+14,160);
    const табло = ш<2?'':ш===2?'0.0':ш===3?'21.4':м.toFixed(1);
    const пр = (ш>=1?Л.весы(146,y0+14,160,{показ:табло}):'') + (ш>=3?Л.часовое(146,ч,70,ш>=5&&м>0?'соль':'пусто',Math.min(12,2+м/6)):'') +
      Л.банка(294,y0+12,44,66,{содержимое:'соль',надпись:['NaCl','натрия хлорид']}) + (ш>=5?Л.шпатель(252,y0+12,40,-10,{горка:ш===5?'соль':null}):'');
    const поверх = (ш===0?метка(150,Н/2-40,'стол пуст — начни с лотка приборов',null,{кегль:11}):'') +
      (ш>=5?метка(готово?210:146,16,'на весах: '+чис(м.toFixed(1))+' г из 58,5 г',м===58.5?ЗЕ:ЗЛ,{кегль:12}):'') +
      (готово?Л.лупа(56,70,42,'соль',{подпись:'6,02·10²³ пар Na⁺ Cl⁻'}):'');
    const ДЕЙСТВИЕ = ШАГИ1[Math.min(ш,ШАГИ1.length-1)].что;
    let кнопки='';
    if(!готово){
      if(ДЕЙСТВИЕ==='ON') кнопки=`<div class="ask">${BTN(5,'','Нажать ON',"r39о1('ON')")}</div>`;
      if(ДЕЙСТВИЕ==='TARE') кнопки=`<div class="ask">${BTN(5,'','Нажать TARE',"r39о1('TARE')")}</div>`;
      if(ДЕЙСТВИЕ==='расчёт') кнопки=`<div class="ask три">${['23 г/моль','58,5 г/моль','35,5 г/моль'].map((t0,j)=>BTN(5+j,'',t0,"r39о1('M"+j+"')")).join('')}</div>`;
      if(ДЕЙСТВИЕ==='насыпать') кнопки=`<div class="ряд" style="grid-template-columns:repeat(4,minmax(0,1fr))">${[[10,'+10 г'],[1,'+1 г'],[0.5,'+0,5 г'],[-1,'−1 г']].map(([d,t0],j)=>BTN(5+j,'',t0,'r39о1(\'+'+d+'\')')).join('')}</div>`;
    }
    const отм={}; ЛОТОК1.forEach(([что])=>{ const idx=ШАГИ1.findIndex(x=>x.что===что); if(idx>=0&&idx<ш) отм[что]='done'; else if(idx===ш) отм[что]='now'; });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1 из 3','Отвешиваем 1 моль NaCl') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+' из '+ШАГИ1.length+'</span><div class="текст">'+ШАГИ1[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      кнопки +
      (готово ? '' : ЛОТОК(ЛОТОК1,'r39о1',отм)) +
      ШАГИ(ШАГИ1.map(x=>x.т),ш) +
      (готово ? ТЕОРИЯ('вывод опыта 1','Мы отвесили <b>58,5 г</b> хлорида натрия — это <b>1 моль</b>: в навеске 6,02·10²³ пар ионов Na⁺ и Cl⁻. Масса 1 моль вещества — его <b>молярная масса</b>: M(NaCl) = 23 + 35,5 = 58,5 г/моль.') +
        `<div class="ask">${BTN(8,'','Повторить опыт',"r39о1сброс()")}</div>` : '');
  }

  /* 6. Опыт 2: моль шести веществ */
  function F6(s){
    const Н=240, y0=184, Л=L_(), выб=s.р6, таб=s.таб6||{}, шаг=s.шр6||0, отз=s.о2отз, все=РЕАКТИВЫ.every(р=>таб[р.вид]), в=s.ответ6, ок=в===0;
    const р=выб==null?null:РЕАКТИВЫ[выб];
    const ч=Л.весыВерх(y0+14,120);
    const пр = Л.весы(150,y0+14,120,{показ:р&&шаг>=1?р.M.toFixed(1):'0.0'}) + (р&&шаг>=1?Л.часовое(150,ч,54,р.вид,р.вид==='сахар'?16:р.вид==='уголь'?7:10):Л.часовое(150,ч,54,'пусто')) +
      (р?Л.банка(284,y0+12,36,54,{содержимое:р.вид==='вода'?undefined:р.вид,стекло:р.вид==='вода'?'янтарь':'прозрачное',надпись:[р.ф,р.имя]}):'');
    const поверх = (р&&шаг>=1?Л.лупа(60,84,46,р.вид,{подпись:'6,02·10²³ частиц'})+метка(168,18,'1 моль '+р.ф+' = '+чис(р.M)+' г',ЗЕ,{кегль:12}):метка(168,18,р?'сначала рассчитай M('+р.ф+')':'выбери реактив в лотке',ЗЛ,{кегль:12}));
    const отм={}; РЕАКТИВЫ.forEach(x=>{ отм[x.вид]=таб[x.вид]?'done':(р&&р.вид===x.вид?'now':''); });
    const макс=342;
    const таблица = `<table class="итоги"><tr><th>Вещество</th><th>M, г/моль</th><th>1 моль</th></tr>${РЕАКТИВЫ.map(x=>таб[x.вид]?`<tr><td>${x.ф}</td><td>${чис(x.M)}</td><td><span class="полоса" style="width:${Math.max(6,Math.round(x.M/макс*100))}%"></span> ${чис(x.M)} г</td></tr>`:`<tr class="пусто"><td>${x.ф}</td><td>—</td><td>—</td></tr>`).join('')}</table>`;
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2 из 3','Моль шести веществ') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ЛОТОК(РЕАКТИВЫ.map(x=>[x.вид,x.ф]),'r39р',отм) +
      (р&&шаг===0 ? A(5,'карт задача','<span class="метка">Расчёт</span><div class="текст">M('+р.ф+') = ?</div>')+`<div class="ask три">${ПОРЯДОК_ВАР[выб].map(j=>BTN(6+j,'',р.вар[j]+' г/моль',"r39M("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      A(8,'карт','<span class="метка">Таблица результатов · '+РЕАКТИВЫ.filter(x=>таб[x.вид]).length+' из 6</span>'+таблица) +
      (!все ? '' :
        ОТВЕТЫ('',['молекула сахара тяжелее молекулы воды','в моле сахара больше молекул'],0,в,6) +
        (в==null ? СКАЗ('Вопрос','Почему 1 моль сахара (342 г) тяжелее 1 моль воды (18 г)?') :
          РАЗБОР(ок,['Верно: молекул в обоих молях поровну — 6,02·10²³, но каждая молекула сахара в 19 раз тяжелее.',
            'Молекул поровну — в любом моле 6,02·10²³. Тяжелее <b>каждая молекула</b> сахара: C₁₂H₂₂O₁₁ против H₂O.'][в]))) +
      (ок ? ПРАВИЛО('1 моль любого вещества — одно и то же число частиц. Массы разные, потому что разные частицы: <b>M численно равна Mr</b>.') : '');
  }

  /* 7. Опыт 3: сколько моль на весах */
  function F7(s){
    const Н=240, y0=184, Л=L_(), n=Math.min(s.о3||0,НАВЕСКИ.length), отз=s.о3отз, все=n>=НАВЕСКИ.length, в=s.ответ7, ок=в===0;
    const н=НАВЕСКИ[Math.min(n,НАВЕСКИ.length-1)], ждёт=!!s.о3ждёт, пок=ждёт&&отз&&отз.ок?НАВЕСКИ[отз.i]:все?НАВЕСКИ[НАВЕСКИ.length-1]:н;
    const ч=Л.весыВерх(y0+14,130);
    const пр = Л.весы(150,y0+14,130,{показ:пок.m.toFixed(1)}) + (пок.вид==='вода'?Л.стакан(150,ч,50,52,{уровень:.55,объём:100}):Л.часовое(150,ч,58,пок.вид,12)) +
      Л.банка(290,y0+12,34,50,{содержимое:пок.вид==='вода'?undefined:пок.вид,стекло:пок.вид==='вода'?'янтарь':'прозрачное',надпись:[пок.ф]});
    const поверх = метка(150,18,пок.ф+': '+пок.m+' г · M = '+пок.M+' г/моль',ЗЛ,{кегль:12}) + (ждёт&&отз&&отз.ок?Л.лупа(60,90,44,НАВЕСКИ[отз.i].вид,{подпись:НАВЕСКИ[отз.i].n+' моль'}):'');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3 из 3','Сколько моль на весах') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ШАГИ(НАВЕСКИ.map(x=>x.m+' г '+x.ф+' — сколько моль?'),n) +
      ФОРМ('n = m : M') +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ждёт ? `<div class="ask">${BTN(6,'',все?'К вопросу →':'Следующая навеска →',"r39о3дальше()")}</div>` : все ? '' : A(5,'карт задача','<span class="метка">Навеска '+(n+1)+' из 3</span><div class="текст">На весах '+н.m+' г '+н.ф+'. Сколько это моль?</div>')+`<div class="ask три">${н.вар.map((v,j)=>BTN(6+j,'',v+' моль','r39о3('+j+')')).join('')}</div>`) +
      (!все||ждёт ? '' :
        ОТВЕТЫ('пара',['0,25 моль','4 моль'],0,в,7) +
        (в==null ? СКАЗ('Вопрос','Сколько моль в 16 г меди (M = 64 г/моль)?') :
          РАЗБОР(ок,['Верно: 16 : 64 = 0,25 моль.','4 = 64 : 16 — делили наоборот. n = m : M = 16 : 64 = <b>0,25 моль</b>.'][в]))) +
      (ок ? ПРАВИЛО('Количество вещества по массе: <b>n = m : M</b>. Масса по количеству: <b>m = M · n</b>.') : '');
  }

  /* 8. Наблюдения и вывод */
  function F8(s){
    const Н=230, y0=176, Л=L_(), таб=s.таб6||{};
    const пр = РЕАКТИВЫ.map((x,i)=>Л.часовое(32+i*54,y0+14,42,x.вид,x.вид==='сахар'?14:x.вид==='уголь'?6:9)).join('');
    const тр = `<path d="M168 22 L236 132 H100 Z" fill="rgba(12,14,18,.85)" stroke="#6a7480" stroke-width="1.2"/><path d="M128 88 H208 M168 88 V132" stroke="#8a939b" stroke-width="1.6"/>
      <text x="168" y="74" text-anchor="middle" font-size="28" font-weight="bold" font-style="italic" fill="#ff8a6a" font-family="Georgia,serif">m</text>
      <text x="138" y="122" text-anchor="middle" font-size="26" font-weight="bold" font-style="italic" fill="#7fb8ff" font-family="Georgia,serif">M</text>
      <text x="198" y="122" text-anchor="middle" font-size="26" font-weight="bold" font-style="italic" fill="#8fe0b0" font-family="Georgia,serif">n</text>`;
    const закр=s.тр8, видТ=s.видТ8||{};
    const ФОРМ={m:'m = M · n',M:'M = m : n',n:'n = m : M'};
    const зоны=[['m',168,64,30,26],['M',138,112,28,20],['n',198,112,28,20]];
    const крышка = закр ? (()=>{ const [,cx,cy,rx,ry]=зоны.find(z=>z[0]===закр); return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="#ffd76a" stroke="#c89a2a" stroke-width="1.6"/><ellipse cx="${cx-rx*0.3}" cy="${cy-ry*0.4}" rx="${rx*0.35}" ry="${ry*0.22}" fill="#fff6c8" opacity=".7"/>`+тА(cx,cy+7,'?',20,'#5a4a10'); })() : '';
    const поверх = тр + крышка + зоны.map(([б,cx,cy,rx,ry])=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx+4}" ry="${ry+4}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r39тр('${б}')"/>`).join('') +
      (закр ? метка(276,40,ФОРМ[закр],ЗЛ,{кегль:13}) : метка(276,40,'закрой букву',null,{кегль:10})) + РЕАКТИВЫ.map((x,i)=>Л.имяПрибора(32+i*54,y0+32,чис(x.M)+' г')).join('');
    const заполнено=РЕАКТИВЫ.filter(x=>таб[x.вид]).length;
    return ЖУРНАЛ(s) + ШАПКА('Наблюдения и вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЖ39(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:2;grid-template-columns:repeat(3,minmax(0,1fr))">${['m','M','n'].map(б=>BTN(2,(закр===б?'вкл':'')+(видТ[б]?' был':''),'закрыть <i>'+б+'</i>',"r39тр('"+б+"')")).join('')}</div>` +
      (закр ? A(3,'карт','<span class="метка">Волшебный треугольник</span><div class="текст">Закрыли <b><i>'+закр+'</i></b> — остальные буквы подсказывают формулу: <b>'+{m:'m = M · n (буквы рядом — умножаем)',M:'M = m : n (одна над другой — делим)',n:'n = m : M (одна над другой — делим)'}[закр]+'</b>.</div>') : '') +
      A(3,'карт','<span class="метка">Наблюдения</span><div class="текст" style="font-size:18px">'+(заполнено<6?'Таблица опыта 2 заполнена на '+заполнено+' из 6 — вернись к опыту, чтобы увидеть всё. ':'')+'1 моль воды — 18 г, соли — 58,5 г, сахара — 342 г, железа — 56 г, меди — 64 г, серы — 32 г, угля — 12 г. Частиц в каждой порции поровну — 6,02·10²³.</div>') +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Ar</b> — из таблицы Менделеева (Cl = 35,5).<br>• <b>Mr</b> — сумма Ar с индексами.<br>• <b>n</b> — количество вещества, моль; 1 моль = 6,02·10²³ частиц.<br>• <b>M</b> — масса 1 моль, г/моль; численно равна Mr.<br>• <b>m = M·n</b> · <b>n = m : M</b> · <b>N = n·N<sub>A</sub></b>.</div>') +
      ПРАВИЛО('<b>Моль — «дюжина химиков»: число частиц одинаковое, а масса зависит от того, какие это частицы.</b>');
  }

  /* 9. Проверка: марафон */
  function F9(s){
    const Н=220, y0=170, Л=L_(), м9=s.мар9||{}, n=Math.min(м9.n||0,МАРАФОН.length), ош=Math.min(м9.ош||0,3), отв=s.отв9, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.колба(214+i*44,y0+14,0.52,{уровень:.6,цвет:i<3-ош?Л.цвет('купорос',.1):'hsla(0,0%,60%,.2)'})).join('') + Л.весы(84,y0+14,110,{показ:'0.0'}) + Л.часовое(84,Л.весыВерх(y0+14,110),50,'медь',8);
    const поверх = все?метка(168,16,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,90,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(84,16,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(258,y0+32,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Молярную массу, массу порции и количество вещества ты считаешь уверенно.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r39заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask три">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r39мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Проверь индексы и формулу: m = M·n, n = m : M.')) : '')) +
      (все ? ПРАВИЛО('<b>M = сумма Ar</b> (г/моль) · <b>m = M · n</b> · <b>n = m : M</b> · <b>N = n · 6,02·10²³</b>.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Молярная масса воды H₂O?', варианты:[{т:'18 г/моль',ок:true},{т:'17 г/моль',ок:false}], разбор:'2·1 + 16 = 18.' },
    { вопрос:'Сколько частиц в 1 моль вещества?', варианты:[{т:'1000',ок:false},{т:'6,02·10²³',ок:true}], разбор:'Это число Авогадро.' },
    { вопрос:'Масса 2 моль воды?', варианты:[{т:'36 г',ок:true},{т:'9 г',ок:false}], разбор:'m = 18 · 2 = 36 г.' },
    { вопрос:'Молярная масса CO₂?', варианты:[{т:'28 г/моль',ок:false},{т:'44 г/моль',ок:true}], разбор:'12 + 2·16 = 44.' },
    { вопрос:'Сколько моль в 64 г кислорода O₂?', варианты:[{т:'2 моль',ок:true},{т:'4 моль',ок:false}], разбор:'M(O₂) = 32; 64 : 32 = 2.' }
  ];
  function F10(s){
    const пройдено = s.практика||0;
    const уровень = Math.min(пройдено, УРОВНИ.length-1);
    const всё = пройдено>=УРОВНИ.length;
    const выбран = s.практикаУровень===уровень ? s.практикаВыбор : null;
    const у = УРОВНИ[уровень];
    if(всё){
      return ТОЧКИ(УРОВНИ.length,-1,УРОВНИ.length) +
        A(2,'карт верно','<span class="метка">Пять из пяти</span><div class="текст">✅ Все пять уровней пройдены. Дальше — три тренажёра.</div>') +
        `<div class="ask">${BTN(3,'','Пройти заново',"r39Reset()")}</div>` +
        ПРАВИЛО('<b>m = M · n</b>');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r39Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const МОЛ3D = {'H₂O':'H2O','CO₂':'CO2','O₂':'O2','H₂':'H2','N₂':'N2','CH₄':'CH4','NH₃':'NH3','NaCl':'NaCl'};
  const Т = {
    т1:{ имя:'Молярная масса', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=148, отв=ст.ответ!=null;
        const пр = МОЛ3D[з.ф] ? подставка(168,76,y0+14) : Л.банка(168,y0+12,40,56,{стекло:'янтарь',надпись:[з.ф]});
        const пов = (МОЛ3D[з.ф]?Л.молекула(168,62,1.6,МОЛ3D[з.ф],{подписи:true}):'') + метка(60,14,з.ф,СН,{кегль:14}) + (отв?метка(260,14,'M = '+чис(з.M)+' г/моль',ЗЛ,{кегль:12}):'') + (ст.серия>=3?метка(270,y0-20,'серия: '+ст.серия,ЗЕ,{кегль:10}):'');
        return свгЛ(сцена(Н,y0,пр,пов),Н); } },
    т2:{ имя:'Масса порции', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=140, отв=ст.ответ!=null, ч=Л.весыВерх(y0+14,120);
        const пр=Л.весы(130,y0+14,120,{показ:отв?з.m.toFixed(1):'0.0'})+(отв?Л.часовое(130,ч,50,з.вид,9):'')+Л.банка(272,y0+12,34,50,{содержимое:['соль','сахар','медь','железо','сера','уголь'].includes(з.вид)?з.вид:undefined,стекло:['соль','сахар','медь','железо','сера','уголь'].includes(з.вид)?'прозрачное':'янтарь',надпись:[з.ф]});
        return свгЛ(сцена(Н,y0,пр,метка(168,12,'n = '+чис(з.n)+' моль · M = '+чис(з.M)+' г/моль',СН,{кегль:12})+(ст.серия>=3?метка(290,44,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Количество вещества', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=180, y0=140, отв=ст.ответ!=null, ч=Л.весыВерх(y0+14,120);
        const пр=Л.весы(130,y0+14,120,{показ:з.m.toFixed(1)})+Л.часовое(130,ч,50,з.вид,9);
        const пов=метка(168,12,з.ф+': '+чис(з.m)+' г'+(отв?' → '+чис(з.n)+' моль':''),КР,{кегль:12})+(отв?Л.лупа(272,82,40,з.вид,{}):'')+(ст.серия>=3?метка(60,44,'серия: '+ст.серия,ЗЕ,{кегль:10}):'');
        return свгЛ(сцена(Н,y0,пр,пов),Н); } }
  };
  const сост = (s,ключ) => Object.assign({круг:0,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}, s[ключ]||{});
  const задание = (ключ,ст) => { const пул=Т[ключ].пул; return пул[(ст.круг*КРУГ+ст.шаг)%пул.length]; };
  function тренажёр(s,ключ,номер){
    const т0=Т[ключ], ст=сост(s,ключ);
    if(ст.шаг>=КРУГ){
      const звёзд = ст.ош===0?3:ст.ош<=2?2:1;
      return ТОЧКИ(КРУГ,-1,КРУГ) +
        A(2,'карт верно','<span class="метка">Круг '+(ст.круг+1)+' пройден</span><div class="текст"><span style="font-size:30px;letter-spacing:4px">'+'★'.repeat(звёзд)+'<span style="opacity:.25">'+'★'.repeat(3-звёзд)+'</span></span><br>Верно с первого раза: <b>'+ст.верно+' из '+КРУГ+'</b>. Лучшая серия: <b>'+ст.лучшая+'</b>.</div>') +
        СКАЗ('Дальше',звёзд===3?'Три звезды! В новом круге — другие вещества.':'В новом круге вещества другие. Попробуй взять все три звезды.') +
        `<div class="ask">${BTN(3,'','Новый круг →',"r39Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px;font-family:Georgia,serif">'+в+'</span>', "r39T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r39TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L39 = {
    id: ID, title: 'Молярная масса', ico: '⚖️',
    src: 'Химия · 5–6 класс · Масса веществ', subj: 'chem',
    explain: [
      'Карточка опыта: цель, принцип, оборудование, ход.',
      'Справочник: относительная атомная масса.',
      'Микромир: сколько частиц в 1 моль.',
      'Модель молекулы: Mr.',
      'Опыт 1: отвешиваем 1 моль NaCl.',
      'Опыт 2: моль шести веществ, таблица.',
      'Опыт 3: сколько моль на весах.',
      'Наблюдения и вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: молярная масса.',
      'Тренажёр 2: масса порции.',
      'Тренажёр 3: количество вещества.'
    ],
    check: { q: 'Какова молярная масса воды H₂O? (в г/моль)', choices: ['16','18','20','10'], ans: 1, exp: 'M = 2·1 + 16 = 18 г/моль.' },
    tasks: [
      { q: 'Молярная масса CO₂? (в г/моль, C=12, O=16)', kind: 'unit', ans: 44, tol: 0, hints: ['12 + 2·16.', '12 + 32 = 44.'], sol: 'M = 12 + 2·16 = 44 г/моль.' },
      { q: 'Масса 2 моль воды? (в г, M = 18 г/моль)', kind: 'unit', ans: 36, tol: 0, hints: ['m = M · n.', '18 · 2 = 36.'], sol: 'm = 18 · 2 = 36 г.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.студия){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L39.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Виртуальный опыт',2:'Справочник',3:'Микромир',4:'Модель молекулы',5:'Опыт 1',6:'Опыт 2',7:'Опыт 3',
      8:'Вывод',9:'Проверка',10:'Практика',11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l39n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Молярная масса'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  const отметить = (s,поле,i) => { const в=Object.assign({},s[поле]||{}); в[i]=true; s[поле]=в; return в; };
  window.r39Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r39вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r39э=(i)=>{ const s=S(); s.э2=i; отметить(s,'види2',i); chRender(0); };
  window.r39тр=(б)=>{ const s=S(); s.тр8=б; отметить(s,'видТ8',б); chRender(0); };
  window.r39ув=(к)=>{ const s=S(); s.ув3 = к===0 ? 0 : Math.min(4,(s.ув3||0)+1); chRender(0); };
  window.r39мол=(i)=>{ const s=S(); if(!МОЛЕКУЛЫ[i]) return; s.м4=i; s.сб4={}; s.отз4=null; chRender(0); };
  window.r39ат=(e)=>{ const s=S(); const М=МОЛЕКУЛЫ[s.м4==null?0:s.м4]; const сб=Object.assign({},s.сб4||{});
    if(!e){ s.сб4={}; s.отз4=null; chRender(0); return; }
    if(Object.values(сб).reduce((a,b)=>a+b,0)>=8){ s.отз4={ок:false,т:'Хватит атомов — сбрось и собери заново.'}; chRender(0); return; }
    сб[e]=(сб[e]||0)+1; s.сб4=сб;
    const нужно=М.состав[e]||0;
    if(сб[e]>нужно) s.отз4={ок:false,т:нужно?'В '+М.ф+' только '+нужно+' атом(а) '+e+' — лишний. Нажми «сброс».':'В '+М.ф+' нет атомов '+e+'. Нажми «сброс».'};
    else if(['C','H','O','N'].every(x=>(сб[x]||0)===(М.состав[x]||0))){ отметить(s,'видм4',s.м4==null?0:s.м4); s.отз4={ок:true,т:'Собрано: '+М.ф+'. Mr = '+М.счёт+' = '+М.Mr+'.'}; }
    else s.отз4=null;
    chRender(0); };
  /* опыт 1: плитки лотка и действия */
  const ИМЯ = {весы:'весы',часовое:'часовое стекло',шпатель:'шпатель',соль:'банку NaCl',лупа:'лупу',спиртовка:'спиртовку',колба:'колбу',цилиндр:'цилиндр'};
  window.r39о1=(что)=>{ const s=S(); const ш=s.о1||0; if(ш>=ШАГИ1.length) return; const нужно=ШАГИ1[ш].что;
    if(что===нужно){ s.о1=ш+1; s.о1отз={ок:true,т:['Весы стоят на столе.','Весы включены: 0.0 г.','Стекло на чаше: весы показывают его массу 21,4 г.','TARE: масса стекла вычтена, снова 0.0.','',
      '','Под лупой — кристаллическая решётка: ионы Na⁺ и Cl⁻ чередуются.'][ш]}; if(s.о1>=ШАГИ1.length){ s.дело_опыт1=true; s.о1отз={ок:true,т:'Опыт 1 выполнен: на весах ровно 1 моль NaCl.'}; } chRender(0); return; }
    if(нужно==='расчёт'&&/^M\d$/.test(что)){ const j=+что[1]; if(j===1){ s.о1=ш+1; s.о1отз={ok:true,ок:true,т:'M(NaCl) = Ar(Na) + Ar(Cl) = 23 + 35,5 = 58,5 г/моль. Значит, 1 моль — это 58,5 г.'}; }
      else s.о1отз={ок:false,т:j===0?'23 — это только натрий. В формуле NaCl два элемента: 23 + 35,5.':'35,5 — это только хлор. Сложи оба: 23 + 35,5.'}; chRender(0); return; }
    if(нужно==='насыпать'&&/^\+/.test(что)){ const d=+что.slice(1); const м=Math.round(((s.о1м||0)+d)*10)/10; s.о1м=Math.max(0,м);
      if(s.о1м===58.5){ s.о1=ш+1; s.о1отз={ок:true,т:'Ровно 58,5 г — это 1 моль хлорида натрия.'}; }
      else if(s.о1м>58.5) s.о1отз={ок:false,т:'Перебор: '+чис(s.о1м)+' г. Убери лишнее кнопкой −1 г.'};
      else s.о1отз=null;
      chRender(0); return; }
    if(нужно==='насыпать'&&(что==='шпатель'||что==='соль')){ s.о1отз={ок:false,т:'Шпатель уже в руке — насыпай соль кнопками +10 / +1 / +0,5 г ниже.'}; chRender(0); return; }
    s.о1отз={ок:false,т:'Сейчас это не нужно. '+(ИМЯ[что]?'Не бери '+ИМЯ[что]+'. ':'')+'Шаг '+(ш+1)+': '+ШАГИ1[ш].т}; chRender(0); };
  window.r39о1сброс=()=>{ const s=S(); s.о1=0; s.о1м=0; s.о1отз=null; chRender(0); };
  /* опыт 2 */
  window.r39р=(вид)=>{ const s=S(); const i=РЕАКТИВЫ.findIndex(x=>x.вид===вид); s.р6=i; s.шр6=(s.таб6||{})[вид]?1:0; s.о2отз=null; chRender(0); };
  window.r39M=(j)=>{ const s=S(); const р=РЕАКТИВЫ[s.р6]; if(!р) return;
    if(j===0){ s.шр6=1; const т=Object.assign({},s.таб6||{}); т[р.вид]=true; s.таб6=т; s.о2отз={ок:true,т:'M('+р.ф+') = '+р.счёт+' = '+чис(р.M)+' г/моль. Весы показывают массу 1 моль: '+чис(р.M)+' г.'};
      if(РЕАКТИВЫ.every(x=>т[x.вид])) s.дело_таблица=true; }
    else s.о2отз={ок:false,т:'Не так. Возьми Ar из таблицы и учти индексы: '+р.ф+'.'};
    chRender(0); };
  /* опыт 3 */
  window.r39о3=(j)=>{ const s=S(); const n=s.о3||0; if(n>=НАВЕСКИ.length) return; const н=НАВЕСКИ[n];
    if(j===н.в){ s.о3=n+1; s.о3ждёт=true; s.о3отз={ок:true,i:n,т:'n = '+н.m+' : '+н.M+' = '+н.n+' моль. Частиц: '+н.N+'.'}; }
    else s.о3отз={ок:false,т:'Проверь: n = m : M = '+н.m+' : '+н.M+'. Массу делят на молярную массу.'};
    chRender(0); };
  window.r39о3дальше=()=>{ const s=S(); s.о3ждёт=false; s.о3отз=null; chRender(0); };
  window.r39мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар9||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв9={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв9={i:м.n,ок:false,j:j}; }
    s.мар9=м; chRender(0); };
  window.r39заново=()=>{ const s=S(); s.мар9={n:0,ош:0}; s.отв9=null; chRender(0); };
  window.r39Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r39Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r39T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r39TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r39Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L39,{__планПорядок:arr[м].__планПорядок}); else arr.push(L39); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU39={render:render, L:L39};
})();
