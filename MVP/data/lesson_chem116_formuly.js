/* ============ ХИМИЯ · УРОК 116 · «СИМВОЛЫ ЭЛЕМЕНТОВ И ФОРМУЛЫ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   7 класс, манера NOBOOK (как 39–115). Карточка 116 из банка подменяется этой записью (VISKW[116]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ): клетки таблицы Менделеева, модели молекул, образцы веществ.

   ШАГИ.
   1) Карточка.
   2) Откуда символы: двенадцать элементов, латинское имя (Ferrum → Fe), как читается, образец.
   3) Детектив символов: Na или N, C или Ca, Ag или Au — восемь ловушек.
   4) Формула под микроскопом: H₂O, CO₂, NH₃, CH₄, O₂, SO₂ и коэффициент 1–4 — модели множатся,
      счётчик атомов пересчитывает.
   5) Собери формулу по модели: элементы и индексы кнопками.
   6) Простое или сложное вещество — восемь моделей.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 116;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'символы', имя:'Детектив символов',   итог:'8 из 8'},
    {ключ:'формулы', имя:'Собери формулы',      итог:'5 из 5'},
    {ключ:'марафон', имя:'Проверка: марафон',   итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться читать и записывать символы химических элементов и формулы веществ, считать атомы в молекулах.'],
    ['Принцип','Каждый элемент обозначают <b>символом</b> — одной или двумя буквами его латинского названия. <b>Формула</b> показывает, из каких атомов состоит молекула и сколько их: <b>индекс</b> справа внизу — число атомов, <b>коэффициент</b> перед формулой — число молекул.'],
    ['Оборудование','Плакат «Периодическая система», модели молекул (шарики и стержни), образцы веществ: железо, медь, сера, уголь, золото, ртуть в ампуле.'],
    ['Ход работы','1. Узнать, откуда взялись символы.<br>2. Не перепутать похожие символы.<br>3. Прочитать формулы и посчитать атомы.<br>4. Собрать формулу по модели.<br>5. Отличить простые вещества от сложных.'],
    ['Безопасность','Ртуть — только в запаянной ампуле. Модели молекул — пластиковые, их можно трогать, а образцы веществ берут пинцетом. Ничего не пробовать на вкус.']
  ];
  const ЭЛЕМЕНТЫ = [
    {с:'H',  лат:'Hydrogenium',  выд:1, чит:'«аш»',          рус:'водород',  смысл:'«рождающий воду»'},
    {с:'O',  лат:'Oxygenium',    выд:1, чит:'«о»',           рус:'кислород', смысл:'«рождающий кислоты»'},
    {с:'C',  лат:'Carboneum',    выд:1, чит:'«цэ»',          рус:'углерод',  смысл:'от слова «уголь»'},
    {с:'N',  лат:'Nitrogenium',  выд:1, чит:'«эн»',          рус:'азот',     смысл:'«рождающий селитру»'},
    {с:'S',  лат:'Sulfur',       выд:1, чит:'«эс»',          рус:'сера',     смысл:'«сера»'},
    {с:'Fe', лат:'Ferrum',       выд:2, чит:'«феррум»',      рус:'железо',   смысл:'«железо»'},
    {с:'Cu', лат:'Cuprum',       выд:2, чит:'«купрум»',      рус:'медь',     смысл:'от острова Кипр — там добывали медь'},
    {с:'Ag', лат:'Argentum',     выд:2, чит:'«аргентум»',    рус:'серебро',  смысл:'«белый, блестящий»'},
    {с:'Au', лат:'Aurum',        выд:2, чит:'«аурум»',       рус:'золото',   смысл:'по одной из версий — от слова «заря»'},
    {с:'Hg', лат:'Hydrargyrum',  выд:[0,6], чит:'«гидраргирум»', рус:'ртуть', смысл:'«жидкое серебро»'},
    {с:'Na', лат:'Natrium',      выд:2, чит:'«натрий»',      рус:'натрий',   смысл:'от «натрон» — природная сода'},
    {с:'Pb', лат:'Plumbum',      выд:[0,4], чит:'«плюмбум»', рус:'свинец',   смысл:'отсюда «пломба»: её делали из свинца'}
  ];
  const ДЕТЕКТИВ = [
    {с:'Na', вар:['азот','натрий','никель'],   в:1, р:'Na — натрий (Natrium). Азот — N, одна буква.'},
    {с:'N',  вар:['азот','натрий','неон'],     в:0, р:'N — азот (Nitrogenium).'},
    {с:'C',  вар:['кальций','медь','углерод'], в:2, р:'C — углерод (Carboneum). Кальций — Ca.'},
    {с:'Ca', вар:['углерод','кальций','хлор'], в:1, р:'Ca — кальций. Одна буква C — углерод.'},
    {с:'Cu', вар:['медь','углерод','кобальт'], в:0, р:'Cu — медь (Cuprum), а не «C» и «u».'},
    {с:'S',  вар:['кремний','натрий','сера'],  в:2, р:'S — сера (Sulfur). Кремний — Si.'},
    {с:'Ag', вар:['золото','серебро','алюминий'], в:1, р:'Ag — серебро (Argentum). Золото — Au.'},
    {с:'Au', вар:['серебро','алюминий','золото'], в:2, р:'Au — золото (Aurum). Алюминий — Al.'}
  ];
  const ФОРМУЛЫ = [
    {ф:'H₂O', м:'H2O', имя:'вода',            состав:[['H',2],['O',1]]},
    {ф:'CO₂', м:'CO2', имя:'углекислый газ',  состав:[['C',1],['O',2]]},
    {ф:'NH₃', м:'NH3', имя:'аммиак',          состав:[['N',1],['H',3]]},
    {ф:'CH₄', м:'CH4', имя:'метан',           состав:[['C',1],['H',4]]},
    {ф:'O₂',  м:'O2',  имя:'кислород',        состав:[['O',2]]},
    {ф:'SO₂', м:'SO2', имя:'сернистый газ',   состав:[['S',1],['O',2]]}
  ];
  const ЦЕЛИ5 = [0,1,2,3,5];
  const ПРОСТЫЕ = [
    {ф:'O₂', м:'O2', простое:1}, {ф:'H₂O', м:'H2O', простое:0}, {ф:'Fe', м:'Fe', простое:1}, {ф:'CO₂', м:'CO2', простое:0},
    {ф:'N₂', м:'N2', простое:1}, {ф:'NaCl', м:'NaCl', простое:0}, {ф:'H₂', м:'H2', простое:1}, {ф:'CH₄', м:'CH4', простое:0}
  ];
  const МАРАФОН = [
    {q:'Символ железа —', вар:['F','Fe','Ir'], в:1, р:'Fe — от латинского Ferrum.'},
    {q:'Na — это…', вар:['азот','натрий','никель'], в:1, р:'Азот — N.'},
    {q:'Сколько атомов в молекуле CO₂?', вар:['2','3','4'], в:1, р:'1 углерод + 2 кислорода = 3.'},
    {q:'Что показывает индекс в формуле?', вар:['число атомов в молекуле','число молекул','массу вещества'], в:0, р:'Индекс — сколько атомов этого элемента в одной молекуле.'},
    {q:'Что показывает двойка в записи 2H₂O?', вар:['две молекулы','два атома','двойную массу'], в:0, р:'Коэффициент — число молекул.'},
    {q:'Сколько атомов водорода в 2H₂O?', вар:['2','4','6'], в:1, р:'2 молекулы × 2 атома = 4.'},
    {q:'Какое вещество простое?', вар:['H₂O','O₂','CO₂'], в:1, р:'O₂ — из атомов одного элемента.'},
    {q:'Как читается Cu?', вар:['«купрум»','«цэ-у»','«медь-у»'], в:0, р:'Cu — «купрум», от латинского Cuprum.'},
    {q:'Au — это…', вар:['серебро','золото','алюминий'], в:1, р:'Aurum — золото.'},
    {q:'Буквенные символы элементов ввёл…', вар:['Берцелиус','Менделеев','Ломоносов'], в:0, р:'Йёнс Якоб Берцелиус, 1813–1814 годы.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['H','водород','гелий'],['He','гелий','водород'],['C','углерод','кальций'],['Ca','кальций','углерод'],['N','азот','натрий'],['Na','натрий','азот'],['O','кислород','олово'],['S','сера','кремний'],
    ['Si','кремний','сера'],['Fe','железо','фтор'],['F','фтор','железо'],['Cu','медь','углерод'],['Ag','серебро','золото'],['Au','золото','серебро'],['Hg','ртуть','водород'],['Cl','хлор','углерод']]
    .map(([с,ок,нет])=>({q:'Какой элемент обозначен символом '+с+'?', с:с, ок:ок, нет:нет, раз:с+' — '+ок+'.'})));
  const СОСТ = {H2O:{H:2,O:1}, CO2:{C:1,O:2}, NH3:{N:1,H:3}, CH4:{C:1,H:4}, O2:{O:2}, SO2:{S:1,O:2}};
  const ФИМЯ = {H2O:'H₂O', CO2:'CO₂', NH3:'NH₃', CH4:'CH₄', O2:'O₂', SO2:'SO₂'};
  const П2 = поМесту([[2,'H2O','всего'],[3,'CO2','O'],[2,'NH3','H'],[1,'CH4','всего'],[4,'O2','O'],[2,'SO2','всего'],[3,'H2O','H'],[2,'CH4','H'],
    [1,'NH3','всего'],[2,'CO2','всего'],[3,'O2','всего'],[4,'H2O','O'],[2,'SO2','O'],[3,'NH3','N'],[1,'CO2','всего'],[2,'H2O','O']]
    .map(([k,м,что])=>{ const с=СОСТ[м], в1=что==='всего'?Object.values(с).reduce((a,b)=>a+b,0):с[что], ок=k*в1, нет=k===1?в1+1:в1;
      return {q:'Сколько '+(что==='всего'?'всего атомов':'атомов '+что)+' в записи '+(k>1?k:'')+ФИМЯ[м]+'?', k:k, м:м, ок:String(ок), нет:String(нет===ок?ок+k:нет), раз:(k>1?k+' молекулы × ':'')+в1+(k>1?' = '+ок:'')+'.'}; }));
  const П3 = [['O₂',1],['H₂O',0],['Fe',1],['CO₂',0],['N₂',1],['NaCl',0],['H₂',1],['CH₄',0],['Cu',1],['NH₃',0],['S',1],['SO₂',0],['O₃',1],['HCl',0],['Au',1],['C₁₂H₂₂O₁₁',0]]
    .map(([ф,п])=>({q:'«'+ф+'» — простое или сложное вещество?', ф:ф, вар:['простое','сложное'], в:п?0:1, раз:п?'Простое: только атомы одного элемента.':'Сложное: атомы разных элементов.'}));

  const CSS=`
  #lvis .s6.l116n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l116n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l116n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l116n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l116n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l116n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l116n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l116n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l116n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l116n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l116n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l116n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l116n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l116n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l116n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l116n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l116n table.итоги td{white-space:normal!important}
  #lvis .s6.l116n table.итоги td:first-child{width:46%}
  #lvis .s6.l116n table.итоги{table-layout:fixed}
  #lvis .s6.l116n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l116n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l116n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l116n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l116n .ask button{text-align:left}
  #lvis .s6.l116n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l116n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l116n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l116n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l116n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l116n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l116n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l116n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l116n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l116n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l116n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l116n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l116n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l116n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l116n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l116n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l116n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l116n .плитка span{text-align:center}
  #lvis .s6.l116n .плитка:active{transform:scale(.96)}
  #lvis .s6.l116n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l116n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l116n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l116n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l116n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l116n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l116n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l116n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l116n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l116n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l116n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l116n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l116n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l116n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l116n{gap:14px}
  #lvis .s6.l116n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l116n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l116n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l116n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l116n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l116n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l116n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l116n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l116n .карт .текст b{color:${GOLD}}
  #lvis .s6.l116n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l116n .правило b{color:${GOLD}}
  #lvis .s6.l116n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l116n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l116n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l116n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l116n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l116n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l116n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l116n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l116n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l116n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l116n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l116n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l116n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l116n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l116n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l116n .буйки button.мимо{border-color:${RED};animation:l116nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l116nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l116n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l116n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l116n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l116n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l116n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l116n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l116n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l116n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l116n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l116n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l116n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l116n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l116n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l116n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l116n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l116n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l116n .уровни .точка.сейчас{background:${GOLD};animation:l116ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l116ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l116n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l116n{-webkit-text-size-adjust:100%}
  #lvis .s6.l116n [data-anim]{animation:l116nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l116nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l116n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l116n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l116n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l116n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l116n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l116n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l116n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l116n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l116n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l116n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l116n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l116n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l116n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l116n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l116n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l116n .акт span.до{background:#24402c}
  #lvis .s6.l116n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l116n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l116n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l116n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l116n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l116n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l116n .две-колонки li{margin:2px 0}
  #lvis .s6.l116n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l116n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l116n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l116n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l116n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l116n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l116n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l116n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l116n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l116n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l116n ul.памятка li{margin:3px 0}
  #lvis .s6.l116n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l116n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l116n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l116n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l116n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l116n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l116n table.тепло td,#lvis .s6.l116n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l116n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l116n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l116n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l116n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l116n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l116n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l116n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l116n table.детектив th{width:auto!important}
  #lvis .s6.l116n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l116n table.детектив td{font-size:12.5px}
  #lvis .s6.l116n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l116n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l116n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l116n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l116n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l116n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l116n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l116n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l116n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l116n .ряд.символы button b{font-size:19px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l116n [data-anim]{animation:none!important}
    #lvis .s6.l116n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l116n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l116n-style');
      if(!s){ s=document.createElement('style'); s.id='l116n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r116Отв('+f+','+к+')')).join('')}</div>`;
  const ЖУРНАЛ = (s) => {
    const всё = ДЕЛА.every(д=>сделано(s,д.ключ));
    return A(0,'журнал',
      `<div class="шапка"><span>Практическая работа</span><b class="${всё?'готово':''}">${
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
      <filter id="c116-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c116-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c116-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c116-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c116-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c116-плиты)"/>
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
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return Л.студия(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
  const свгЛ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; };
  const тА = (x,y,t0,к,цв,якорь) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДВ = () => L_().ДВИЖ;
  const ЦВ_ЭЛ = (с) => { const e=(L_().ЭЛ||{})[с]||[0]; return e[0]<=2?'#f4c8a0': e[0]>=13&&e[0]<=17?'#c8e4b0': e[0]===18?'#c8d8f4':'#f4e4a8'; };
  /* плитка символа без названия (для угадывания) */
  const плитка = (x,y,ш,с,бледно) => `<g opacity="${бледно?.4:1}"><ellipse cx="${x+ш/2+4}" cy="${y+ш+3}" rx="${ш*0.55}" ry="4" fill="#000" opacity=".4" filter="url(#рл-мягко)"/>
    <rect x="${x}" y="${y}" width="${ш}" height="${ш}" rx="6" fill="${ЦВ_ЭЛ(с)}"/><rect x="${x}" y="${y}" width="${ш}" height="${ш*0.18}" rx="6" fill="#fff" opacity=".35"/><rect x="${x}" y="${y}" width="${ш}" height="${ш}" rx="6" fill="none" stroke="#fff" stroke-width="1.6" opacity=".7"/>
    <text x="${x+ш/2}" y="${y+ш*0.62}" text-anchor="middle" font-size="${ш*0.46}" font-weight="bold" fill="#111" font-family="'Helvetica Neue',Arial,sans-serif">${esc(с)}</text>
    <text x="${x+ш/2}" y="${y+ш*0.88}" text-anchor="middle" font-size="${ш*0.16}" font-weight="bold" fill="#6a5a40" font-family="'Helvetica Neue',Arial,sans-serif">?</text></g>`;
  /* формула с цветными индексами и коэффициентом */
  const формулаSVG = (x,y,к,ф,кегль) => { const части=String(ф).split('').map(ch=>/[₀-₉]/.test(ch)?`<tspan fill="#7fd1ff">${ch}</tspan>`:`<tspan fill="#f6efe0">${esc(ch)}</tspan>`).join('');
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="${кегль||36}" font-weight="bold" font-family="'Helvetica Neue',Arial,sans-serif">${к>1?`<tspan fill="#ffd76a">${к}</tspan>`:''}${части}</text>`; };
  const образецЭл = (с,x,y) => { const Л=L_();
    if(['Fe','Cu','Au','S','C'].includes(с)) return Л.образец(x,y,с,1.4);
    if(с==='Ag') return Л.образец(x,y,'Al',1.3);
    if(с==='Hg') return Л.ампула(x,y,1,'#c8ccd2',.35);
    if(с==='O') return Л.баллон(x,y,0.5,'O2');
    if(с==='H') return Л.баллон(x,y,0.5,'H2');
    if(с==='N') return Л.баллон(x,y,0.5,'N2');
    if(с==='Na') return Л.банка(x,y,40,54,{содержимое:'железо',надпись:['Na','в масле']});
    return Л.образец(x,y,'Fe',1.3);
  };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=246, y0=196, у=y0+14, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.образец(40,у,'Fe',1) + Л.образец(96,у,'Cu',1) + Л.образец(150,у,'S',1) + Л.ампула(200,у,0.8,'#c8ccd2',.35) + Л.баллон(246,у,0.42,'O2') + Л.колба(300,у,0.6,{уровень:.4});
    const поверх = Л.клетка(18,26,64,'Fe') + Л.клетка(88,26,64,'Cu') + Л.клетка(158,26,64,'O') + формулаSVG(270,72,1,'H₂O',30) + Л.молекула(270,116,0.9,'H2O',{подписи:true});
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Символы элементов и формулы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r116вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['состав: какие атомы и сколько их','цвет и запах вещества'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что показывает химическая формула?') :
          РАЗБОР(ок,['Верно: формула — «паспорт» состава молекулы.','Цвет и запах формула не показывает — только <b>состав</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Символ</b> — элемент. <b>Формула</b> — состав молекулы.') : '');
  }

  /* 2. Откуда символы */
  function F2(s){
    const Н=272, y0=232, у=y0+14, Л=L_(), к=s.э2==null?5:s.э2, вид=s.вид2||{}, Э=ЭЛЕМЕНТЫ[к], видено=Object.keys(вид).length, в=s.ответ2, ок=в===0;
    const выд = Array.isArray(Э.выд) ? Э.выд : Array.from({length:Э.выд},(_,i)=>i);
    const слово = Э.лат.split('').map((ch,i)=>`<tspan fill="${выд.includes(i)?'#ffd76a':'#c8ced6'}"${выд.includes(i)?' text-decoration="underline"':''}>${ch}</tspan>`).join('');
    const кег = Э.лат.length>9?22:26;
    const пр = образецЭл(Э.с,250,у);
    const поверх = Л.клетка(18,30,118,Э.с) + `<text x="238" y="64" text-anchor="middle" font-size="${кег}" font-weight="bold" font-style="italic" font-family="Georgia,serif">${слово}</text>` +
      тА(238,88,'латинское имя',10,'#8a939b') + метка(238,98,'читается '+Э.чит,ЗЛ,{кегль:11}) + тА(238,144,Э.смысл.length>30?Э.смысл.slice(0,30)+'…':Э.смысл,10,'#c8ced6') +
      `<path d="M150 90 Q170 70 190 66" stroke="#ffd76a" stroke-width="1.6" fill="none" stroke-dasharray="3 3"/>`;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Откуда взялись символы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд символы" data-anim style="--i:3;grid-template-columns:repeat(6,minmax(0,1fr))">${ЭЛЕМЕНТЫ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}" onclick="r116э(${i})"><b>${x.с}</b></button>`).join('')}</div>` +
      A(4,'карт','<span class="метка">'+Э.с+' — '+Э.рус+'</span><div class="текст">Латинское название <b>'+Э.лат+'</b> — '+Э.смысл+'. Символ — первые буквы имени'+(Array.isArray(Э.выд)?' (первая и ещё одна характерная буква)':'')+'. Читается '+Э.чит+'.</div>') +
      (видено<6 ? СКАЗ('Исследуй','Открой хотя бы шесть элементов. Посмотри, как из латинского имени получился символ.') :
        ОТВЕТЫ('пара',['«феррум»','«эф-е»'],0,в,2) + (в==null ? СКАЗ('Вопрос','Как химики читают символ Fe?') :
          РАЗБОР(ок,['Верно: по латинскому имени Ferrum.','Символы читают по латинскому названию: Fe — «феррум».'][в]))) +
      (ок ? ТЕОРИЯ('символы','Буквенные символы ввёл шведский химик <b>Йёнс Якоб Берцелиус</b> в 1813–1814 годах: первая буква латинского названия, а если она уже занята — добавляется ещё одна. Поэтому C — углерод, а Ca — кальций, Cu — медь.') +
        ДИВО('До Берцелиуса англичанин Джон Дальтон рисовал элементы кружками: водород — кружок с точкой, кислород — пустой кружок. Попробуй записать так сахар!') : '');
  }

  /* 3. Детектив символов */
  const ЛОВУШКА = {Na:'N', N:'Na', C:'Ca', Ca:'C', Cu:'C', S:'Si', Ag:'Au', Au:'Ag'};
  function F3(s){
    const Н=236, y0=196, у=y0+14, Л=L_(), n=Math.min(s.д3||0,ДЕТЕКТИВ.length-1), ок=!!s.ок3, отз=s.отз3, готовых=n+(ок?1:0), все=готовых>=ДЕТЕКТИВ.length, Д=ДЕТЕКТИВ[n];
    const поверх = (ок ? Л.клетка(54,40,118,Д.с) + `<g opacity=".55">${Л.клетка(200,64,82,ЛОВУШКА[Д.с])}</g>` + метка(241,40,'не путай!',КР,{кегль:10}) : плитка(109,40,118,Д.с)) +
      метка(168,6,(n+1)+' из 8 · что за элемент?',ок?ЗЕ:ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Детектив символов') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      ТОЧКИ(ДЕТЕКТИВ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Символ '+(n+1)+' из 8</span><div class="текст">Какой элемент обозначен символом <b>'+Д.с+'</b>?</div>') +
        `<div class="ask три">${Д.вар.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r116д("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий символ →',"r116ддальше()")}</div>` : '') +
      (все ? ПРАВИЛО('Одна буква или две — это <b>разные</b> элементы: N и Na, C и Ca, Ag и Au.') : '');
  }

  /* 4. Формула под микроскопом */
  function F4(s){
    const Н=262, y0=262, Л=L_(), к=s.ф4==null?0:s.ф4, k=s.к4||1, вид=s.вид4||{}, Ф=ФОРМУЛЫ[к], в=s.ответ4, ок=в===0;
    const видено=Object.keys(вид).length, был_k=!!s.к4был;
    const масш = k===1?1.45:k===2?1.15:k===3?0.98:0.88;
    const мест = k===1?[[168,128]]:k===2?[[100,128],[236,128]]:k===3?[[84,112],[252,112],[168,176]]:[[96,104],[240,104],[96,178],[240,178]];
    const модели = мест.map(([x,y],i)=>`<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${i%2?-3:3};0 0" dur="${2+i*0.3}s" repeatCount="indefinite"/>`:''}${Л.молекула(x,y,масш,Ф.м,{подписи:true})}</g>`).join('');
    const тело = L_().студия(Н,y0) + формулаSVG(168,46,k,Ф.ф,34) + тА(168,66,(k>1?k+' молекулы · ':'1 молекула · ')+Ф.имя,10,'#9aa3ad') + модели;
    const таблица = '<table class="итоги"><tr><th>Атомы</th><th>в 1 молекуле</th><th>в '+(k>1?k+' молекулах':'записи')+'</th></tr>'+
      Ф.состав.map(([e,n0])=>`<tr><td><b>${e}</b></td><td>${n0}</td><td>${n0*k}</td></tr>`).join('')+`<tr><td>всего</td><td>${Ф.состав.reduce((a,x)=>a+x[1],0)}</td><td><b>${Ф.состав.reduce((a,x)=>a+x[1],0)*k}</b></td></tr></table>`;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Формула под микроскопом') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(6,minmax(0,1fr))">${ФОРМУЛЫ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:15px">'+x.ф+'</span>','r116ф('+i+')')).join('')}</div>` +
      `<div class="коэф-пульт" data-anim style="--i:4;grid-template-columns:1fr"><div><span>Коэффициент — сколько молекул</span>${BTN(4,'','<b style="font-size:20px">−</b>',"r116к(-1)")}<b>${k}</b>${BTN(4,'','<b style="font-size:20px">+</b>',"r116к(1)")}</div></div>` +
      A(5,'карт','<span class="метка">Счётчик атомов</span>'+таблица) +
      (видено<3||!был_k ? СКАЗ('Исследуй','Посмотри хотя бы три формулы и поменяй коэффициент — модели размножатся, а счётчик пересчитает атомы.') :
        ОТВЕТЫ('три',['6','3','5'],0,в,4) + (в==null ? СКАЗ('Вопрос','Сколько атомов кислорода в записи 3CO₂?') :
          РАЗБОР(ок,['Верно: 3 молекулы × 2 атома кислорода = 6.','3 — это число молекул. В каждой — по 2 атома O: 3 × 2 = <b>6</b>.','Кислорода в одной CO₂ — два атома. 3 × 2 = <b>6</b>.'][в]))) +
      (ок ? ТЕОРИЯ('индекс и коэффициент','<b>Индекс</b> (маленькая цифра справа внизу) — сколько атомов элемента в <b>одной</b> молекуле. Нет индекса — атом один. <b>Коэффициент</b> (большая цифра впереди) — сколько <b>молекул</b>. Атомов всего = коэффициент × индекс.') +
        ПРАВИЛО('<b>2H₂O</b>: две молекулы, в каждой 2 H и 1 O → всего 4 H и 2 O.') : '');
  }

  /* 5. Собери формулу по модели */
  function F5(s){
    const Н=246, y0=246, Л=L_(), n=Math.min(s.ц5||0,ЦЕЛИ5.length-1), Ф=ФОРМУЛЫ[ЦЕЛИ5[n]], сб=s.сб5||[], ок=!!s.ок5, отз=s.отз5, готовых=n+(ок?1:0), все=готовых>=ЦЕЛИ5.length;
    const sub=(d)=>String(d).split('').map(c=>'₀₁₂₃₄₅₆₇₈₉'[+c]).join('');
    const набрано = сб.map(([e,i])=>e+(i>1?sub(i):'')).join('');
    const доска = `<rect x="40" y="168" width="256" height="58" rx="12" fill="rgba(12,14,18,.75)" stroke="${ок?'#8fd1a8':'#4a525c'}" stroke-width="${ок?2:1.2}"/>` +
      (набрано ? формулаSVG(168,208,1,набрано,32) : тА(168,204,'собери формулу кнопками',12,'#6a7480'));
    const тело2 = L_().студия(Н,y0) + `<circle cx="168" cy="92" r="70" fill="url(#рл-прожектор)"/>` + Л.молекула(168,92,1.7,Ф.м,{подписи:true}) + метка(168,4,(n+1)+' из 5 · '+Ф.имя,ок?ЗЕ:ЗЛ,{кегль:11}) + доска;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Собери формулу по модели') +
      `<div class="pic тёмная">${свгЛ(тело2,Н)}</div>` +
      ТОЧКИ(ЦЕЛИ5.length,все?-1:n,готовых) +
      (ок ? '' : `<div class="атомы" data-anim style="--i:3">${['H','C','N','O','S'].map(e=>`<button type="button" onclick="r116сб('${e}')">${e}</button>`).join('')}</div>` +
        `<div class="атомы" data-anim style="--i:4;grid-template-columns:repeat(3,minmax(0,1fr))"><button type="button" onclick="r116сб('+')">+ индекс</button><button type="button" onclick="r116сб('⌫')">⌫ стереть</button><button type="button" onclick="r116сб('?')">Проверить</button></div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Задание','Посмотри на модель: какие атомы и сколько. Нажми символ элемента, а «+ индекс» — чтобы увеличить число атомов последнего элемента.')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая модель →',"r116сбдальше()")}</div>` : '') +
      (все ? ПРАВИЛО('Формулу пишут так: символ элемента и справа внизу — сколько его атомов. 1 не пишут.') : '');
  }

  /* 6. Простое или сложное */
  function F6(s){
    const Н=226, y0=196, Л=L_(), n=Math.min(s.п6||0,ПРОСТЫЕ.length-1), ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=ПРОСТЫЕ.length, П=ПРОСТЫЕ[n];
    const поверх = `<circle cx="168" cy="104" r="64" fill="url(#рл-прожектор)"/>` + Л.молекула(168,104,1.6,П.м,{подписи:true}) + формулаSVG(168,40,1,П.ф,28) +
      (ок ? метка(168,170,П.простое?'простое: один элемент':'сложное: разные элементы',П.простое?СН:ЗЛ,{кегль:11}) : '');
    const кол = (х) => ПРОСТЫЕ.filter((x,k)=>k<готовых&&x.простое===х).map(x=>'<li>'+x.ф+'</li>').join('')||'<li class="пусто">—</li>';
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Простое или сложное') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      ТОЧКИ(ПРОСТЫЕ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Вещество '+(n+1)+' из 8</span><div class="текст">'+П.ф+' — простое или сложное вещество?</div>') +
        `<div class="ask пара">${['простое','сложное'].map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r116п("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее вещество →',"r116пдальше()")}</div>` : '') +
      A(8,'карт','<span class="метка">Сортировка · '+готовых+' из 8</span><div class="две-колонки"><div><b>Простые</b><ul>'+кол(1)+'</ul></div><div><b>Сложные</b><ul>'+кол(0)+'</ul></div></div>') +
      (все ? ТЕОРИЯ('простые и сложные','<b>Простое вещество</b> состоит из атомов одного элемента: O₂, N₂, Fe, Cu. <b>Сложное</b> — из атомов разных элементов: H₂O, CO₂, NaCl. Кислород — элемент, а O₂ — простое вещество из него.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=226, y0=184, у=y0+14, Л=L_();
    const поверх = Л.клетка(24,30,74,'Fe') + Л.клетка(104,30,74,'O') + формулаSVG(250,64,2,'H₂O',36) + Л.молекула(212,132,1.05,'H2O',{подписи:true}) + Л.молекула(290,132,1.05,'H2O',{подписи:true});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Символы и формулы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,Л.образец(60,у,'Fe',1)+Л.образец(150,у,'S',1),поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Символ</b> — одна-две буквы латинского названия: Fe — Ferrum, Cu — Cuprum.<br>• Похожие символы — разные элементы: N и Na, C и Ca.<br>• <b>Индекс</b> — атомов в одной молекуле; <b>коэффициент</b> — число молекул.<br>• Атомов всего = коэффициент × индекс.<br>• Простое вещество — один элемент, сложное — несколько.</div>') +
      ПРАВИЛО('<b>2H₂O</b> читается «два аш-два-о».');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const поверх = [0,1,2].map(i=>Л.клетка(232+i*32,110,28,['Fe','Cu','O'][i]).replace('<g filter','<g opacity="'+(i<3-ош?1:.25)+'" filter')).join('') + Л.молекула(80,100,1,'CO2',{подписи:true}) +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(276,y0-6,'попытки'));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Язык химии — символы и формулы — ты читаешь свободно.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r116заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r116мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни шаги урока.')) : '')) +
      (все ? ПРАВИЛО('Индекс — атомы, коэффициент — молекулы.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Сколько атомов в одной молекуле CO₂?', варианты:[{т:'3',ок:true},{т:'2',ок:false}], разбор:'1 C + 2 O = 3.' },
    { вопрос:'Сколько атомов в двух молекулах H₂O?', варианты:[{т:'3',ок:false},{т:'6',ок:true}], разбор:'2 × 3 = 6.' },
    { вопрос:'Сколько атомов кислорода в двух молекулах CO₂?', варианты:[{т:'4',ок:true},{т:'2',ок:false}], разбор:'2 × 2 = 4.' },
    { вопрос:'Символ натрия —', варианты:[{т:'N',ок:false},{т:'Na',ок:true}], разбор:'N — азот.' },
    { вопрос:'O₂ — вещество…', варианты:[{т:'простое',ок:true},{т:'сложное',ок:false}], разбор:'Только атомы кислорода.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r116Reset()")}</div>` +
        ПРАВИЛО('Атомов всего = коэффициент × индекс.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r116Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const Т = {
    т1:{ имя:'Символ элемента', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=170, y0=160, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+(отв?Л.клетка(124,20,96,з.с):плитка(124,20,96,з.с))+(ст.серия>=3?метка(270,40,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } },
    т2:{ имя:'Считаем атомы', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=190, y0=180, отв=ст.ответ!=null, k=з.k, м=з.м;
        const xs = Array.from({length:k},(_,i)=>168+(i-(k-1)/2)*(k>2?74:96));
        return свгЛ(L_().студия(Н,y0)+формулаSVG(168,42,k,ФИМЯ[м],30)+xs.map(x=>Л.молекула(x,118,k>2?0.86:1.1,м,{подписи:true})).join('')+(отв?метка(168,160,'ответ: '+з.ок,ЗЕ,{кегль:11}):'')+(ст.серия>=3?метка(290,10,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } },
    т3:{ имя:'Простое или сложное', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=150, y0=140, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+формулаSVG(168,82,1,з.ф,40)+(отв?метка(168,104,з.в===0?'простое':'сложное',з.в===0?СН:ЗЛ,{кегль:11}):'')+(ст.серия>=3?метка(290,10,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r116Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r116T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r116TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L116 = {
    id: ID, title: 'Символы элементов и формулы', ico: '🔠',
    src: 'Химия · 7 класс · Химические формулы', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Откуда взялись символы: латинские имена.',
      'Детектив символов: не перепутай.',
      'Формула под микроскопом: индекс и коэффициент.',
      'Собери формулу по модели.',
      'Простое или сложное вещество.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: символ элемента.',
      'Тренажёр 2: считаем атомы.',
      'Тренажёр 3: простое или сложное.'
    ],
    check: { q: 'Сколько атомов в одной молекуле CO₂?', choices: ['2','3','4','1'], ans: 1, exp: 'C — 1 атом + O₂ — 2 атома = 3 атома.' },
    tasks: [
      { q: 'Сколько атомов в двух молекулах H₂O?', kind: 'unit', ans: 6, tol: 0, hints: ['В одной H₂O — 3 атома (2 + 1).', '3 · 2 = 6.'], sol: 'В H₂O 3 атома; в двух молекулах 3 · 2 = 6 атомов.' },
      { q: 'Сколько атомов кислорода в двух молекулах CO₂?', kind: 'unit', ans: 4, tol: 0, hints: ['В одной молекуле CO₂ два атома кислорода.', '2 · 2 = 4.'], sol: '2 молекулы · 2 атома = 4 атома кислорода.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L116.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Символы',3:'Детектив',4:'Формула',5:'Конструктор',6:'Простые и сложные',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l116n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Символы и формулы'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r116Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r116вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r116э=(i)=>{ const s=S(); if(!ЭЛЕМЕНТЫ[i]) return; s.э2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; chRender(0); };
  window.r116д=(j)=>{ const s=S(); if(s.ок3) return; const n=s.д3||0, Д=ДЕТЕКТИВ[n];
    if(j===Д.в){ s.ок3=true; if(n>=ДЕТЕКТИВ.length-1) s.дело_символы=true; s.отз3={ок:true,т:Д.р}; }
    else s.отз3={ок:false,j:j,т:'Нет. '+Д.р};
    chRender(0); };
  window.r116ддальше=()=>{ const s=S(); if(!s.ок3||(s.д3||0)>=ДЕТЕКТИВ.length-1) return; s.д3=(s.д3||0)+1; s.ок3=false; s.отз3=null; chRender(0); };
  window.r116ф=(i)=>{ const s=S(); if(!ФОРМУЛЫ[i]) return; s.ф4=i; const в=Object.assign({},s.вид4||{}); в[i]=true; s.вид4=в; chRender(0); };
  window.r116к=(d)=>{ const s=S(); s.к4=Math.max(1,Math.min(4,(s.к4||1)+d)); if(s.к4>1) s.к4был=true; const в=Object.assign({},s.вид4||{}); в[s.ф4==null?0:s.ф4]=true; s.вид4=в; chRender(0); };
  window.r116сб=(что)=>{ const s=S(); if(s.ок5) return; const n=s.ц5||0, Ф=ФОРМУЛЫ[ЦЕЛИ5[n]]; let сб=(s.сб5||[]).map(x=>x.slice());
    if(что==='⌫'){ сб.pop(); s.сб5=сб; s.отз5=null; chRender(0); return; }
    if(что==='+'){ if(!сб.length){ s.отз5={ок:false,т:'Сначала выбери элемент.'}; chRender(0); return; } сб[сб.length-1][1]=Math.min(9,сб[сб.length-1][1]+1); s.сб5=сб; s.отз5=null; chRender(0); return; }
    if(что==='?'){ const цель=Ф.состав.map(x=>x[0]+':'+x[1]).sort().join(','), есть=сб.map(x=>x[0]+':'+x[1]).sort().join(','), порядок=сб.map(x=>x[0]).join('')===Ф.состав.map(x=>x[0]).join('');
      const повтор=new Set(сб.map(x=>x[0])).size!==сб.length;
      if(повтор){ s.отз5={ок:false,т:'Один элемент записан дважды. Вместо повтора увеличь индекс.'}; }
      else if(цель===есть){ s.ок5=true; s.сб5=Ф.состав.map(x=>x.slice()); if(n>=ЦЕЛИ5.length-1) s.дело_формулы=true;
        s.отз5={ок:true,т:'Верно: '+Ф.ф+' — '+Ф.имя+'.'+(порядок?'':' Состав верный; принято писать в таком порядке: '+Ф.ф+'.')}; }
      else { const нет=Ф.состав.find(([e,i0])=>!сб.some(x=>x[0]===e)); const не=Ф.состав.find(([e,i0])=>{ const x=сб.find(y=>y[0]===e); return x&&x[1]!==i0; });
        s.отз5={ок:false,т:нет?'Посчитай цвета на модели: не хватает элемента '+нет[0]+'.':не?'Сколько атомов '+не[0]+' на модели? Проверь индекс.':'Лишний элемент — его на модели нет.'}; }
      chRender(0); return; }
    if(сб.length&&сб[сб.length-1][0]===что){ сб[сб.length-1][1]=Math.min(9,сб[сб.length-1][1]+1); } else сб.push([что,1]);
    s.сб5=сб; s.отз5=null; chRender(0); };
  window.r116сбдальше=()=>{ const s=S(); if(!s.ок5||(s.ц5||0)>=ЦЕЛИ5.length-1) return; s.ц5=(s.ц5||0)+1; s.ок5=false; s.сб5=[]; s.отз5=null; chRender(0); };
  window.r116п=(j)=>{ const s=S(); if(s.ок6) return; const n=s.п6||0, П=ПРОСТЫЕ[n], нужно=П.простое?0:1;
    if(j===нужно){ s.ок6=true; s.отз6={ок:true,т:П.ф+' — '+(П.простое?'простое: в нём атомы только одного элемента.':'сложное: в нём атомы разных элементов.')}; }
    else s.отз6={ок:false,j:j,т:П.простое?'Посмотри на модель: все шарики одного цвета — один элемент.':'На модели шарики разного цвета — разные элементы.'};
    chRender(0); };
  window.r116пдальше=()=>{ const s=S(); if(!s.ок6||(s.п6||0)>=ПРОСТЫЕ.length-1) return; s.п6=(s.п6||0)+1; s.ок6=false; s.отз6=null; chRender(0); };
  window.r116мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r116заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r116Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r116Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r116T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r116TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r116Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L116,{__планПорядок:arr[м].__планПорядок}); else arr.push(L116); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU116={render:render, L:L116};
})();
