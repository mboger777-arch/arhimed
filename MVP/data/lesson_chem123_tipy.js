/* ============ ХИМИЯ · УРОК 123 · «ТИПЫ ХИМИЧЕСКИХ РЕАКЦИЙ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   8–9 класс, манера NOBOOK (как 39–122), детализация рисунков — как в 122 и выше.
   Карточка 123 из банка подменяется этой записью (VISKW[123]). Признаки реакций — урок 111,
   уравнения — урок 41; здесь — четыре типа реакций, каждый своим настоящим опытом.
   Рисунки: MVP/data/ris_lab.js (window.РЛ) + собственные подробные рисунки урока
   (ступка с пестиком, подковообразный магнит, раскалённая пробирка, малахит, гвоздь с медью,
   творожистый осадок, ионы с гидратной оболочкой — помощники из урока 122).

   ШАГИ.
   1) Карточка: полка реактивов четырёх опытов.
   2) Соединение: Fe + S → FeS. Растереть смесь, магнит тянет железо из смеси; нагреть —
      по смеси бежит раскалённая волна; после реакции магнит продукт не тянет.
   3) Разложение: (CuOH)₂CO₃ → 2CuO + H₂O + CO₂. Живой ползунок нагрева: зелёный малахит
      чернеет, на холодной части пробирки капли воды, известковая вода мутнеет.
   4) Замещение: Fe + CuSO₄ → FeSO₄ + Cu. Живой ползунок времени: гвоздь покрывается медью,
      голубой раствор зеленеет; микромир — атомы Fe уходят ионами, ионы Cu²⁺ садятся медью.
   5) Обмен: AgNO₃ + NaCl → AgCl↓ + NaNO₃. Капли из пипетки — белый творожистый осадок,
      в микромире ионы меняются партнёрами.
   6) Сортировщик: десять уравнений по четырём типам со схемами «A + B → AB» и т. д.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 123;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'соединение', имя:'Опыт: соединение', итог:'FeS'},
    {ключ:'разложение', имя:'Опыт: разложение', итог:'3 продукта'},
    {ключ:'замещение',  имя:'Опыт: замещение',  итог:'медь на гвозде'},
    {ключ:'обмен',      имя:'Опыт: обмен',      итог:'осадок AgCl'},
    {ключ:'ещё',        имя:'Ещё четыре опыта',  итог:'4 из 4'},
    {ключ:'сортировка', имя:'Сортировщик реакций', итог:'10 из 10'},
    {ключ:'марафон',    имя:'Проверка: марафон', итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Различать четыре типа химических реакций — соединения, разложения, замещения и обмена — по опытам и по уравнениям.'],
    ['Принцип','Тип реакции определяют по тому, <b>сколько веществ вступило и сколько получилось</b> и <b>простые они или сложные</b>. Соединение: A + B → AB. Разложение: AB → A + B. Замещение: A + BC → AC + B (простое + сложное). Обмен: AB + CD → AD + CB (два сложных меняются частями).'],
    ['Оборудование','Ступка с пестиком, магнит, штатив, пробирки, держатель, спиртовка, газоотводная трубка, известковая вода, химический стакан, железный гвоздь, пипетка. Реактивы: железные опилки, сера, малахит, медный купорос CuSO₄, нитрат серебра AgNO₃, поваренная соль NaCl.'],
    ['Ход работы','1. Смешать железо с серой и нагреть.<br>2. Нагреть малахит и поймать все продукты.<br>3. Опустить гвоздь в медный купорос.<br>4. Прилить нитрат серебра к раствору соли.<br>5. Рассортировать уравнения по типам.'],
    ['Безопасность','Смесь железа и серы нагревают под тягой: при реакции может выделиться сернистый газ. Горячую пробирку держат держателем, отверстием от себя. Нитрат серебра оставляет на коже чёрные пятна — работать в перчатках. Газоотводную трубку вынимают из известковой воды <b>до</b> того, как убрать спиртовку, иначе воду затянет в горячую пробирку.']
  ];
  const ч2 = (v) => String(v).replace('.',',');
  const ок1 = (v) => ч2(Math.round(v*10)/10);
  const ТИПЫ = ['соединение','разложение','замещение','обмен'];
  const СХЕМЫ = ['A + B → AB','AB → A + B','A + BC → AC + B','AB + CD → AD + CB'];

  /* ---------- сортировщик ---------- */
  const УРАВНЕНИЯ = [
    {у:'2Mg + O₂ → 2MgO',                 т:0, сл:2, сп:1},
    {у:'2H₂O → 2H₂ + O₂',                 т:1, сл:1, сп:2},
    {у:'Zn + 2HCl → ZnCl₂ + H₂',          т:2, сл:2, сп:2},
    {у:'NaOH + HCl → NaCl + H₂O',         т:3, сл:2, сп:2},
    {у:'CaO + H₂O → Ca(OH)₂',             т:0, сл:2, сп:1},
    {у:'CaCO₃ → CaO + CO₂',               т:1, сл:1, сп:2},
    {у:'Fe + CuSO₄ → FeSO₄ + Cu',         т:2, сл:2, сп:2},
    {у:'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl', т:3, сл:2, сп:2},
    {у:'2KMnO₄ → K₂MnO₄ + MnO₂ + O₂',     т:1, сл:1, сп:3},
    {у:'4P + 5O₂ → 2P₂O₅',                т:0, сл:2, сп:1}
  ];
  const МАРАФОН = [
    {q:'A + B → AB — это реакция…', вар:['соединения','разложения','обмена'], в:0, р:'Из двух веществ — одно.'},
    {q:'CaCO₃ → CaO + CO₂ — тип реакции:', вар:['соединение','разложение','замещение'], в:1, р:'Одно вещество распадается на два.'},
    {q:'В реакции замещения участвуют…', вар:['простое и сложное вещество','два сложных вещества','только простые'], в:0, р:'A + BC → AC + B.'},
    {q:'AgNO₃ + NaCl → AgCl↓ + NaNO₃ — это…', вар:['обмен','замещение','соединение'], в:0, р:'Два сложных вещества меняются частями.'},
    {q:'Почему после реакции магнит не тянет продукт из железа и серы?', вар:['получилось новое вещество FeS','железо испарилось','сера закрыла железо'], в:0, р:'Сульфид железа — новое вещество со своими свойствами.'},
    {q:'Чем доказали, что при разложении малахита выделился CO₂?', вар:['известковая вода помутнела','пробирка нагрелась','порошок почернел'], в:0, р:'Помутнение известковой воды — признак CO₂.'},
    {q:'Чем покрылся железный гвоздь в растворе CuSO₄?', вар:['медью','ржавчиной','серой'], в:0, р:'Железо вытеснило медь: Fe + CuSO₄ → FeSO₄ + Cu.'},
    {q:'Почему голубой раствор CuSO₄ светлеет?', вар:['ионы Cu²⁺ уходят из раствора','вода испаряется','гвоздь растворяет краску'], в:0, р:'Голубой цвет дают ионы меди, а они оседают на гвозде.'},
    {q:'2H₂O → 2H₂ + O₂ — тип реакции:', вар:['соединение','разложение','обмен'], в:1, р:'Из одного вещества — два.'},
    {q:'Что нужно вынуть первым после опыта с газоотводной трубкой?', вар:['трубку из воды','спиртовку из-под пробирки','пробирку из держателя'], в:0, р:'Иначе холодную воду затянет в горячую пробирку.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['S + O₂ → SO₂',0],['2HgO → 2Hg + O₂',1],['Fe + 2HCl → FeCl₂ + H₂',2],['KOH + HNO₃ → KNO₃ + H₂O',3],['2Na + Cl₂ → 2NaCl',0],['Cu(OH)₂ → CuO + H₂O',1],
    ['Mg + CuCl₂ → MgCl₂ + Cu',2],['CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄',3],['C + O₂ → CO₂',0],['2KClO₃ → 2KCl + 3O₂',1],['2Al + 3CuCl₂ → 2AlCl₃ + 3Cu',2],['Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂',3],
    ['SO₃ + H₂O → H₂SO₄',0],['2Fe(OH)₃ → Fe₂O₃ + 3H₂O',1],['Zn + Pb(NO₃)₂ → Zn(NO₃)₂ + Pb',2],['AgNO₃ + KBr → AgBr↓ + KNO₃',3]]
    .map(([у,т])=>{ const соседний = т===0?1:т===1?0:т===2?3:2;
      return {q:'Тип реакции: '+у, у:у, т:т, ок:ТИПЫ[т], нет:ТИПЫ[соседний], раз:'Схема '+СХЕМЫ[т]+': '+['два вещества → одно.','одно вещество → несколько.','простое вещество вытесняет элемент из сложного.','два сложных вещества обмениваются частями.'][т]}; }));
  const П2 = поМесту([['Zn + CuSO₄ →','ZnSO₄ + Cu','ZnCu + SO₄'],['Fe + 2HCl →','FeCl₂ + H₂','FeH₂ + Cl₂'],['NaCl + AgNO₃ →','AgCl↓ + NaNO₃','Na + AgCl + NO₃'],['Mg + 2HCl →','MgCl₂ + H₂','MgH₂ + Cl₂'],
    ['BaCl₂ + Na₂SO₄ →','BaSO₄↓ + 2NaCl','Ba + Na₂ + Cl₂SO₄'],['Cu + 2AgNO₃ →','Cu(NO₃)₂ + 2Ag','CuAg₂ + 2NO₃'],['KOH + HCl →','KCl + H₂O','KH + ClOH'],['Fe + CuCl₂ →','FeCl₂ + Cu','FeCu + Cl₂'],
    ['CuSO₄ + 2NaOH →','Cu(OH)₂↓ + Na₂SO₄','CuNa₂ + SO₄(OH)₂'],['Zn + 2HCl →','ZnCl₂ + H₂','Zn + Cl₂ + H₂'],['NaOH + HNO₃ →','NaNO₃ + H₂O','NaH + NO₃OH'],['Al + 3AgNO₃ →','Al(NO₃)₃ + 3Ag','AlAg₃ + 3NO₃'],
    ['K₂CO₃ + CaCl₂ →','CaCO₃↓ + 2KCl','K₂Ca + CO₃Cl₂'],['Mg + FeSO₄ →','MgSO₄ + Fe','MgFe + SO₄'],['Ba(OH)₂ + H₂SO₄ →','BaSO₄↓ + 2H₂O','BaH₂ + SO₄(OH)₂'],['Zn + 2AgNO₃ →','Zn(NO₃)₂ + 2Ag','ZnAg₂ + 2NO₃']]
    .map(([л,ок,нет])=>({q:'Что получится? '+л, л:л, ок:ок, нет:нет, раз:'Металл и кислотный остаток держатся вместе — меняются партнёры: '+л+' '+ок+'.'})));
  const П3 = поМесту([[0,1],[1,0],[2,3],[3,2],[0,2],[1,3],[2,0],[3,1],[0,3],[1,2],[2,1],[3,0],[0,1],[1,0],[2,3],[3,2]]
    .map(([т,нет])=>({q:'Схема '+СХЕМЫ[т]+' — это…', т:т, ок:ТИПЫ[т], нет:ТИПЫ[нет], раз:СХЕМЫ[т]+' — реакция '+['соединения','разложения','замещения','обмена'][т]+'.'})));

  const CSS=`
  #lvis .s6.l123n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l123n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l123n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l123n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l123n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l123n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l123n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l123n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l123n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l123n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l123n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l123n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l123n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l123n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l123n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l123n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l123n table.итоги td{white-space:normal!important}
  #lvis .s6.l123n table.итоги td:first-child{width:46%}
  #lvis .s6.l123n table.итоги{table-layout:fixed}
  #lvis .s6.l123n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l123n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l123n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l123n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l123n .ask button{text-align:left}
  #lvis .s6.l123n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l123n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l123n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l123n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l123n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l123n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l123n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l123n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l123n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l123n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l123n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l123n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l123n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l123n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l123n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l123n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l123n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l123n .плитка span{text-align:center}
  #lvis .s6.l123n .плитка:active{transform:scale(.96)}
  #lvis .s6.l123n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l123n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l123n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l123n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l123n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l123n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l123n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l123n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l123n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l123n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l123n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l123n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l123n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l123n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l123n{gap:14px}
  #lvis .s6.l123n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l123n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l123n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l123n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l123n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l123n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l123n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l123n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l123n .карт .текст b{color:${GOLD}}
  #lvis .s6.l123n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l123n .правило b{color:${GOLD}}
  #lvis .s6.l123n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l123n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l123n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l123n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l123n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l123n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l123n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l123n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l123n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l123n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l123n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l123n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l123n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l123n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l123n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l123n .буйки button.мимо{border-color:${RED};animation:l123nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l123nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l123n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l123n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l123n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l123n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l123n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l123n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l123n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l123n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l123n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l123n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l123n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l123n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l123n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l123n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l123n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l123n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l123n .уровни .точка.сейчас{background:${GOLD};animation:l123ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l123ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l123n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l123n{-webkit-text-size-adjust:100%}
  #lvis .s6.l123n [data-anim]{animation:l123nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l123nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l123n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l123n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l123n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l123n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l123n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l123n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l123n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l123n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l123n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l123n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l123n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l123n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l123n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l123n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l123n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l123n .акт span.до{background:#24402c}
  #lvis .s6.l123n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l123n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l123n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l123n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l123n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l123n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l123n .две-колонки li{margin:2px 0}
  #lvis .s6.l123n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l123n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l123n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l123n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l123n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l123n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l123n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l123n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l123n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l123n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l123n ul.памятка li{margin:3px 0}
  #lvis .s6.l123n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l123n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l123n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l123n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l123n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l123n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l123n table.тепло td,#lvis .s6.l123n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l123n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l123n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l123n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l123n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l123n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l123n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l123n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l123n table.детектив th{width:auto!important}
  #lvis .s6.l123n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l123n table.детектив td{font-size:12.5px}
  #lvis .s6.l123n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l123n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l123n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l123n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l123n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l123n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l123n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l123n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l123n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l123n .ряд.символы button b{font-size:19px}
  #lvis .s6.l123n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l123n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l123n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l123n .коэф-яч b{font-size:26px}
  #lvis .s6.l123n .пульт-ползун{display:grid;grid-template-columns:48px 1fr 48px;gap:8px 10px;align-items:center;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:10px 10px 8px;width:100%;box-sizing:border-box}
  #lvis .s6.l123n .пульт-ползун .шапка-п{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}
  #lvis .s6.l123n .пульт-ползун .шапка-п span{font-size:14px;color:#9aa3ad}
  #lvis .s6.l123n .пульт-ползун .шапка-п b{font-size:26px;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l123n .пульт-ползун button{height:44px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;font-size:22px;font-weight:700;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l123n .пульт-ползун button:active{transform:translateY(2px)}
  #lvis .s6.l123n input[type=range].ползун{width:100%;height:44px;margin:0;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}
  #lvis .s6.l123n input[type=range].ползун::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l123n input[type=range].ползун::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e8e0cc);border:3px solid #ffd76a;margin-top:-10px;box-shadow:0 2px 8px rgba(0,0,0,.6)}
  #lvis .s6.l123n input[type=range].ползун::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l123n input[type=range].ползун::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6efe0;border:3px solid #ffd76a}
  #lvis .s6.l123n .атомы button.вкл{border-color:#ffd76a;color:#ffd76a;background:rgba(255,215,106,.15)}
  #lvis .s6.l123n .атомы button{font-size:16px}
  #lvis .s6.l123n .тащ{cursor:grab;touch-action:none}
  #lvis .s6.l123n .тащ:hover{filter:drop-shadow(0 0 5px rgba(255,215,106,.85))}
  #lvis .s6.l123n .тащ.тащу{cursor:grabbing;filter:drop-shadow(0 12px 8px rgba(0,0,0,.65))}
  #lvis .s6.l123n .зона.над circle,#lvis .s6.l123n .зона.над rect{fill:#8fd1a8;fill-opacity:.28;stroke:#8fd1a8}
  #lvis .s6.l123n .pic[data-noswipe] svg{touch-action:none;user-select:none;-webkit-user-select:none}
  #lvis .s6.l123n .ask.мелко button{min-height:40px;font-size:14px;opacity:.78}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l123n [data-anim]{animation:none!important}
    #lvis .s6.l123n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l123n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l123n-style');
      if(!s){ s=document.createElement('style'); s.id='l123n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r123Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c123-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c123-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c123-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c123-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c123-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c123-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c123-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c123-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c123-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c123-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c123-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c123-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <linearGradient id="c123-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a727c"/><stop offset=".12" stop-color="#3a424c"/><stop offset=".7" stop-color="#22272d"/><stop offset="1" stop-color="#121519"/>
      </linearGradient>
      <radialGradient id="c123-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c123-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c123-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
      <linearGradient id="c123-чугун" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a727c"/><stop offset=".18" stop-color="#3a4048"/><stop offset="1" stop-color="#121519"/></linearGradient>
      <linearGradient id="c123-хром" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a525c"/><stop offset=".3" stop-color="#f6f9fb"/><stop offset=".45" stop-color="#c8d0d8"/><stop offset=".75" stop-color="#6a737d"/><stop offset="1" stop-color="#2a3038"/></linearGradient>
      <linearGradient id="c123-хромГ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525c"/><stop offset=".35" stop-color="#f6f9fb"/><stop offset=".6" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/></linearGradient>
      <linearGradient id="c123-стеклоВ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".14" stop-color="#fff" stop-opacity=".07"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset=".86" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".34"/></linearGradient>
      <linearGradient id="c123-кафель" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8ea"/></linearGradient>
      <linearGradient id="c123-пластик" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525c"/><stop offset=".2" stop-color="#2e343b"/><stop offset="1" stop-color="#15181c"/></linearGradient>
      <linearGradient id="c123-жк" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8d0b0"/><stop offset="1" stop-color="#8aa884"/></linearGradient>
      <radialGradient id="c123-вО" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#ff7a6a"/><stop offset="1" stop-color="#8a1408"/></radialGradient>
      <radialGradient id="c123-вН" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#eef2f6"/><stop offset="1" stop-color="#8a94a0"/></radialGradient>
      <radialGradient id="c123-кап" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6a3a" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a3a" stop-opacity="0"/></radialGradient>
      <radialGradient id="c123-кочан" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c88ae0"/><stop offset=".45" stop-color="#7a2a9a"/><stop offset="1" stop-color="#2e0840"/></radialGradient>
      <linearGradient id="c123-волокно" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#000"/><stop offset=".5" stop-color="#fff"/><stop offset=".75" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
      <linearGradient id="c123-стена" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#262c33"/><stop offset=".7" stop-color="#1c2127"/><stop offset="1" stop-color="#14181c"/></linearGradient>
      <radialGradient id="c123-виньетка" cx=".5" cy=".42" r=".75"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient>
      <linearGradient id="c123-столешница" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#26302d"/><stop offset=".25" stop-color="#151c1a"/><stop offset="1" stop-color="#0c100f"/></linearGradient>
      <linearGradient id="c123-шкаф" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2f35"/><stop offset="1" stop-color="#15181c"/></linearGradient>
      <linearGradient id="c123-хромГ2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a636d"/><stop offset=".4" stop-color="#e8ecf0"/><stop offset="1" stop-color="#3a424c"/></linearGradient>
      <linearGradient id="c123-тягаФон" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a323a"/><stop offset="1" stop-color="#1a2026"/></linearGradient>
      <linearGradient id="c123-лучЛампы" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8e0" stop-opacity=".35"/><stop offset="1" stop-color="#fff8e0" stop-opacity="0"/></linearGradient>
      <linearGradient id="c123-плитка" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e353d"/><stop offset="1" stop-color="#1a1f24"/></linearGradient>
      <linearGradient id="c123-луч" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6c8" stop-opacity=".8"/><stop offset="1" stop-color="#fff6c8" stop-opacity="0"/></linearGradient>
      <linearGradient id="c123-корпусФ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525c"/><stop offset=".4" stop-color="#2a3038"/><stop offset="1" stop-color="#14171b"/></linearGradient>
      <linearGradient id="c123-фарфор" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8c4b8"/><stop offset=".3" stop-color="#ffffff"/><stop offset=".6" stop-color="#ece9e0"/><stop offset="1" stop-color="#a8a498"/></linearGradient>
      <linearGradient id="c123-фарфорП" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8d4c8"/><stop offset=".4" stop-color="#ffffff"/><stop offset="1" stop-color="#b8b4a8"/></linearGradient>
      <linearGradient id="c123-магнит" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a1408"/><stop offset=".3" stop-color="#ff5a3a"/><stop offset=".55" stop-color="#e8402a"/><stop offset="1" stop-color="#7a1008"/></linearGradient>
      <linearGradient id="c123-хромМ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a737d"/><stop offset=".4" stop-color="#f6f9fb"/><stop offset="1" stop-color="#5a636d"/></linearGradient>
      <linearGradient id="c123-жар" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff6a1a" stop-opacity="0"/><stop offset=".4" stop-color="#ffd27a"/><stop offset=".6" stop-color="#ff8a2a"/><stop offset="1" stop-color="#c83a0a" stop-opacity=".2"/></linearGradient>
      <linearGradient id="c123-смесьFeS" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8a8a5a"/><stop offset=".5" stop-color="#6a6a52"/><stop offset="1" stop-color="#9a9a5a"/></linearGradient>
      <radialGradient id="c123-свечение" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffb84a" stop-opacity=".7"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>
      <linearGradient id="c123-сталь" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f0f3f6"/><stop offset=".5" stop-color="#9aa3ad"/><stop offset="1" stop-color="#4a525c"/></linearGradient>
      <linearGradient id="c123-стальГ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a525c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".6" stop-color="#9aa3ad"/><stop offset="1" stop-color="#3a424c"/></linearGradient>
      <linearGradient id="c123-медь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a2a0a"/><stop offset=".35" stop-color="#e8885a"/><stop offset=".6" stop-color="#c8603a"/><stop offset="1" stop-color="#5a2008"/></linearGradient>
      ${[['атFe','#d8dde2','#6a737d','#2a3038'],['атCu','#ffd0a8','#d8784a','#6a2a0a'],['ионCu','#d8ecff','#3a8ae8','#0a2a6a'],['ионFe','#e8ffe0','#7ac87a','#1e5a24'],['ионSO4','#fff4b0','#e8c02a','#7a5600'],['атAg','#ffffff','#d8dce2','#6a737d'],['атCl','#d8ffc8','#6ad84a','#1a5a10']]
        .map(([и,a,b,c])=>`<radialGradient id="c123-${и}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".22" stop-color="${a}"/><stop offset=".7" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`).join('')}
    </defs>`;
  const L_ = () => window.РЛ;
  const ДВ = () => L_().ДВИЖ;
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return фон(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c123-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c123-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c123-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c123-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c123-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c123-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c123-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c123-пад)"/>
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
      if(о.клик&&!отм) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+5)}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r123ат(${i})"/>`;
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
    <path d="M${ф2(x-ш/2)} ${y} L${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)} L${ф2(x+ш/2)} ${y} Z" fill="url(#c123-корпус)"/>
    <path d="M${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)}" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>
    ${табло(x-ш*0.08,y-25,ф2(ш*0.56),показ,{в:18,кегль:11})}
    <circle cx="${ф2(x+ш*0.3)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/><circle cx="${ф2(x+ш*0.38)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/>
    <rect x="${x-5}" y="${y-38}" width="10" height="8" fill="url(#c123-стальВ)"/>
    <ellipse cx="${x}" cy="${y-39}" rx="${ф2(ш*0.4)}" ry="5.5" fill="url(#c123-сталь)"/><ellipse cx="${x}" cy="${y-40.5}" rx="${ф2(ш*0.36)}" ry="3.6" fill="#dfe4ea" opacity=".55"/>`;

  /* ---------- рычажные весы: содержимое чаш — функции (cx, верх чаши) ---------- */
  const коромысло = (угол,левое,правое,опц) => { const о=опц||{}, px=168, py=о.py||100, h=104;
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t), низ=о.низ||250;
    const чаша=(cx,cy,f)=>{ const yп=cy+62;
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c123-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${f(cx,yп-4)}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c123-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    return `<path d="M${px-48} ${низ} L${px+48} ${низ} L${px+32} ${низ-12} L${px-32} ${низ-12} Z" fill="#2a3038"/><rect x="${px-40}" y="${низ-4}" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="${px-5}" y="${py}" width="10" height="${низ-12-py}" fill="url(#c123-стальВ)"/>
      <rect x="${px-18}" y="${py+44}" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(px+Math.sin(рад(g))*50)} ${ф2(py+Math.cos(рад(g))*50)} L${ф2(px+Math.sin(рад(g))*57)} ${ф2(py+Math.cos(рад(g))*57)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      ${о.замок?`<rect x="${px-74}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/><rect x="${px+68}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/>`:''}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M${px} ${py} L${px} ${py+56}" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c123-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c123-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c123-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,левое)}${чаша(rx,ry,правое)}`; };
  /* золотые гирьки-эталоны: n штук рядами по 10, (cx, y) — опора */
  const эталоны = (cx,y,n) => { let s=''; const целых=Math.floor(n), пол=n-целых>0;
    for(let i=0;i<целых+(пол?1:0);i++){ const ряд=Math.floor(i/10), j=i%10, вРяду=Math.min(10,целых+(пол?1:0)-ряд*10), x=cx+(j-(вРяду-1)/2)*6.2-2.7, yy=y-6-ряд*6.2;
      const ш=(пол&&i===целых)?2.7:5.4;
      s+=`<rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="5.4" rx=".8" fill="url(#c123-латунь)"/><rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="1.2" fill="#fff6d0" opacity=".7"/>`; }
    return s; };
  /* ---------- воздушный шарик ---------- */
  let шкN=0;
  const шарик = (x,y,цв,надпись,м) => { const k=м||1, R=34*k, ид='c123-шк'+(++шкN);
    return `<g>
      <radialGradient id="${ид}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${цв}"/><stop offset=".85" stop-color="${цв}"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#${ид})"/>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#c123-объём)" opacity=".7"/>
      <ellipse cx="${ф2(x-R*0.38)}" cy="${ф2(y-R*0.5)}" rx="${ф2(R*0.2)}" ry="${ф2(R*0.34)}" transform="rotate(25 ${ф2(x-R*0.38)} ${ф2(y-R*0.5)})" fill="url(#c123-блик)"/>
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
    return `<g filter="url(#c123-тень)" transform="rotate(${о.поворот==null?-2:о.поворот} ${x+ш/2} ${y+в/2})"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="2" fill="#fbf7ec"/>
      <rect x="${x}" y="${y}" width="${ш}" height="5" fill="${о.полоса||'#c8402a'}" opacity=".8"/>
      ${строки.map((t0,i)=>`<text x="${x+8}" y="${y+20+i*15}" font-size="${i===0?11:10.5}" font-weight="${i===0?'bold':'normal'}" fill="#2e2416" font-family="'Courier New',monospace">${esc(t0)}</text>`).join('')}</g>`; };

  /* ---------- живые ползунки ---------- */
  const ПОЛЗУН = (ключ,min,max,шаг,v,подпись,ед) => `<div class="пульт-ползун" data-anim style="--i:3">
      <div class="шапка-п"><span>${подпись}</span><b id="c123-в-${ключ}">${ч2(v)}${ед}</b></div>
      <button type="button" onclick="r123шаг('${ключ}',-1)">−</button>
      <input class="ползун" id="c123-п-${ключ}" type="range" min="${min}" max="${max}" step="${шаг}" value="${v}" oninput="r123пол('${ключ}',this.value)" onchange="r123отпуск(this)" aria-label="${подпись}">
      <button type="button" onclick="r123шаг('${ключ}',1)">+</button></div>`;

  /* ================= ДЕТАЛЬНЫЕ РИСУНКИ УРОКА ================= */
  /* градиенты добавлены в ОПРЕДЕЛЕНИЯ: c123-чугун, c123-хром, c123-хромГ, c123-кафель, c123-пластик, c123-жк, c123-вО, c123-вН, c123-кап */
  const ф1 = (v) => (+v).toFixed(1);
  /* сфера с бликом (для ионов и молекул воды) */
  const сфера = (x,y,r,град,опц) => { const о=опц||{};
    return `<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${ф1(r)}" fill="url(#${град})"${о.обвод?` stroke="${о.обвод}" stroke-width="${о.ш||0.8}"`:''}/>` +
      `<ellipse cx="${ф1(x-r*0.32)}" cy="${ф1(y-r*0.38)}" rx="${ф1(r*0.34)}" ry="${ф1(r*0.2)}" transform="rotate(-30 ${ф1(x-r*0.32)} ${ф1(y-r*0.38)})" fill="#fff" opacity=".75"/>`; };
  const вода = (x,y,угол,м) => { const к=м||1; return `<g transform="translate(${ф1(x)} ${ф1(y)}) rotate(${ф1(угол)}) scale(${к})">${сфера(0,0,3.8,'c123-вО')}${сфера(-3.6,2.8,2.3,'c123-вН')}${сфера(3.6,2.8,2.3,'c123-вН')}</g>`; };

  /* ---------- микромир ионов: глянцевые ионы, гидратные оболочки, тепловое движение ---------- */
  const ЦВ_ИОН = {'H⁺':['#ffb09a','#e0402a','#6a1008'],'OH⁻':['#b8d8ff','#3a7ae8','#0e2a6a'],'Na⁺':['#e8d4ff','#9a6ae0','#3e1480'],'K⁺':['#f0e0ff','#b08ae8','#4e2490'],
    'Ca²⁺':['#d8fff0','#4ac898','#145a42'],'Cl⁻':['#c8ffb0','#5ac83a','#1a5a10'],'SO₄²⁻':['#fff4b0','#e8c02a','#7a5600']};
  const микро = (cx,cy,r,ионы,ид) => { const кл='c123-мк'+ид;
    const сл=(k)=>{ const v=Math.sin(k*12.9898+cx*0.37)*43758.5453; return v-Math.floor(v); };
    let гр=''; Object.entries(ЦВ_ИОН).forEach(([ион,[a,b,c]],i)=>{ гр+=`<radialGradient id="${кл}-${i}" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".22" stop-color="${a}"/><stop offset=".7" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></radialGradient>`; });
    const idx=(ион)=>Object.keys(ЦВ_ИОН).indexOf(ион);
    let s=`<defs>${гр}<radialGradient id="${кл}-фон" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#16384c"/><stop offset="1" stop-color="#081822"/></radialGradient></defs>
      <clipPath id="${кл}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${кл}-фон)"/><g clip-path="url(#${кл})">`;
    /* свободные молекулы воды */
    for(let k=0;k<26;k++){ const x=cx+(сл(k)-0.5)*r*1.95, y=cy+(сл(k+40)-0.5)*r*1.95;
      s+=`<g opacity=".7">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;${ф1((сл(k+3)-0.5)*5)} ${ф1((сл(k+4)-0.5)*5)};0 0" dur="${(2+сл(k+6)*2).toFixed(1)}s" repeatCount="indefinite"/>`:''}${вода(x,y,сл(k+80)*360,0.8)}</g>`; }
    /* ионы с гидратной оболочкой: к катиону вода повёрнута кислородом, к аниону — водородами */
    const всего=ионы.reduce((a,x)=>a+x[1],0), очередь=[]; ионы.forEach(([ион,n])=>{ for(let i=0;i<n;i++) очередь.push(ион); });
    for(let i=очередь.length-1;i>0;i--){ const j=Math.floor(сл(i+500)*(i+1)); [очередь[i],очередь[j]]=[очередь[j],очередь[i]]; }
    очередь.forEach((ион,k)=>{ { const a=k*2.399+0.6, dd=r*0.66*Math.sqrt((k+0.5)/всего), x=cx+Math.cos(a)*dd, y=cy+Math.sin(a)*dd, c=ЦВ_ИОН[ион]||['#eee','#aaa','#333'], rr=ион.length>3?9.5:8, кат=/⁺/.test(ион);
      let оболочка=''; for(let j=0;j<4;j++){ const a=j*Math.PI/2+сл(k+j)*0.6, d=rr+6.5, wx=x+Math.cos(a)*d, wy=y+Math.sin(a)*d, угол=a*180/Math.PI+(кат?-90:90);
        оболочка+=вода(wx,wy,угол,0.85); }
      s+=`<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;${ф1((сл(k+11)-0.5)*9)} ${ф1((сл(k+13)-0.5)*9)};0 0" dur="${(2.2+сл(k+5)*1.6).toFixed(1)}s" repeatCount="indefinite"/>`:''}
        ${ион==='H⁺'?`<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${rr+13}" fill="url(#c123-кап)" opacity=".55"/>`:''}${ион==='OH⁻'?`<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${rr+13}" fill="#3a8aff" opacity=".16"/>`:''}
        ${оболочка}${сфера(x,y,rr,кл+'-'+idx(ион),{обвод:c[2],ш:0.6})}
        <text x="${ф1(x)}" y="${ф1(y+2.6)}" text-anchor="middle" font-size="${ион.length>3?5.6:7}" font-weight="bold" fill="${c[2]}" font-family="${ШР}">${esc(ион)}</text></g>`; } });
    /* ручка и оправа лупы с рисками */
    let риски=''; for(let j=0;j<24;j++){ const a=j*Math.PI/12; риски+=`<path d="M${ф1(cx+Math.cos(a)*(r+1))} ${ф1(cy+Math.sin(a)*(r+1))} L${ф1(cx+Math.cos(a)*(r+3.5))} ${ф1(cy+Math.sin(a)*(r+3.5))}" stroke="#2a3038" stroke-width=".8"/>`; }
    return s+`</g><circle cx="${cx}" cy="${cy}" r="${r+2.5}" fill="none" stroke="url(#рл-сталь)" stroke-width="6"/>${риски}
      <circle cx="${cx}" cy="${cy}" r="${r-1}" fill="none" stroke="#fff" stroke-opacity=".18"/>
      <path d="M${ф1(cx-r*0.55)} ${ф1(cy-r*0.62)} A${r*0.85} ${r*0.85} 0 0 1 ${ф1(cx+r*0.2)} ${ф1(cy-r*0.84)}" stroke="#fff" stroke-width="3" fill="none" opacity=".18" stroke-linecap="round"/>
      <g transform="rotate(45 ${ф1(cx+r*0.7)} ${ф1(cy+r*0.7)})"><rect x="${ф1(cx+r*0.7+4)}" y="${ф1(cy+r*0.7-5)}" width="34" height="10" rx="5" fill="#3a2414"/><rect x="${ф1(cx+r*0.7+4)}" y="${ф1(cy+r*0.7-5)}" width="34" height="3" rx="1.5" fill="#8a5a34" opacity=".7"/><rect x="${ф1(cx+r*0.7-2)}" y="${ф1(cy+r*0.7-6)}" width="8" height="12" rx="2" fill="url(#c123-хром)"/></g>`; };

  /* ---------- индикаторная бумага: полоска + шкала-карточка ---------- */
  const полоска = (x,y,ш,в,цв,подпись) => `<g filter="url(#c123-тень)"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="1.5" fill="#f6f0e2"/>
      <rect x="${x}" y="${y+в*0.45}" width="${ш}" height="${в*0.55}" rx="1.5" fill="${цв}"/>
      <rect x="${x}" y="${y+в*0.45}" width="${ш}" height="${в*0.55}" rx="1.5" fill="url(#c123-волокно)" opacity=".35"/>
      <path d="M${x+2} ${y+3} V${y+в-3}" stroke="#fff" stroke-width="1" opacity=".45"/></g>${подпись?тА(x+ш/2,y+в+12,подпись,8.5,'#c8ced6'):''}`;
  const шкалаPH = (x,y,ш,pH,безМарки) => { let s=`<rect x="${x-3}" y="${y-3}" width="${ш+6}" height="22" rx="4" fill="#f6f0e2"/>`;
    for(let i=0;i<15;i++) s+=`<rect x="${ф1(x+i*ш/15+0.6)}" y="${y}" width="${ф1(ш/15-1.2)}" height="16" rx="1.5" fill="${УНИВ[i]}"/>`+тА(ф1(x+(i+0.5)*ш/15),y+30,i,8.5,'#c8ced6');
    const мх=x+(Math.max(0,Math.min(14,pH))+0.5)*ш/15;
    return s+`<rect x="${x-3}" y="${y-3}" width="${ш+6}" height="22" rx="4" fill="none" stroke="#c8b89a"/>
      ${безМарки?'':`<path d="M${ф1(мх)} ${y-3} l-6 -10 h12 Z" fill="#fff" stroke="#14171b" stroke-width="1"/><rect x="${ф1(мх-1)}" y="${y-2}" width="2" height="20" fill="#fff" opacity=".9"/>`}
      ${тА(x+2,y-8,'кислая',8.5,'#ff8a6a','start')}${тА(x+ш-2,y-8,'щелочная',8.5,'#7fb8ff','end')}`; };

  /* ---------- штатив: чугунное основание, хромированный стержень, муфта, лапка с резиновыми губками ---------- */
  const штативД = (x,yB,верх,лапкаY,xб) => `<g>
      <ellipse cx="${x+24}" cy="${yB+2}" rx="54" ry="5" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${x-34} ${yB} L${x-30} ${yB-10} H${x+78} L${x+82} ${yB} Z" fill="url(#c123-чугун)"/>
      <path d="M${x-30} ${yB-10} H${x+78}" stroke="#8a929c" stroke-width="1"/>
      <rect x="${x-28}" y="${yB-1}" width="8" height="2" rx="1" fill="#111"/><rect x="${x+68}" y="${yB-1}" width="8" height="2" rx="1" fill="#111"/>
      <ellipse cx="${x}" cy="${yB-10}" rx="7" ry="2.5" fill="#2a2f35"/>
      <rect x="${x-3}" y="${верх}" width="6" height="${yB-10-верх}" fill="url(#c123-хром)"/>
      <ellipse cx="${x}" cy="${верх}" rx="3" ry="1.4" fill="#e8ecf0"/>
      <rect x="${x-8}" y="${лапкаY-8}" width="16" height="16" rx="2.5" fill="#2a3038" stroke="#5a636d" stroke-width=".8"/>
      <rect x="${x-6}" y="${лапкаY-6}" width="12" height="3" rx="1" fill="#4a525c"/>
      <g><rect x="${x-19}" y="${лапкаY-3}" width="11" height="6" rx="1.5" fill="url(#c123-хромГ)"/><circle cx="${x-21}" cy="${лапкаY}" r="5" fill="#1e2226" stroke="#5a636d" stroke-width=".8"/>
        ${[0,1,2,3,4,5].map(j=>`<path d="M${x-21+Math.cos(j)*5} ${лапкаY+Math.sin(j)*5} L${x-21+Math.cos(j)*3} ${лапкаY+Math.sin(j)*3}" stroke="#6a737d" stroke-width=".7"/>`).join('')}</g>
      <rect x="${x+8}" y="${лапкаY-2}" width="${xб-x-20}" height="4" rx="2" fill="url(#c123-хромГ)"/>
      <path d="M${xб-14} ${лапкаY-9} Q${xб-2} ${лапкаY-12} ${xб+11} ${лапкаY-6} L${xб+11} ${лапкаY-3} Q${xб} ${лапкаY-8} ${xб-12} ${лапкаY-4} Z" fill="#3a4048"/>
      <path d="M${xб-14} ${лапкаY+9} Q${xб-2} ${лапкаY+12} ${xб+11} ${лапкаY+6} L${xб+11} ${лапкаY+3} Q${xб} ${лапкаY+8} ${xб-12} ${лапкаY+4} Z" fill="#3a4048"/>
      <path d="M${xб-8} ${лапкаY-6.5} Q${xб} ${лапкаY-9} ${xб+8} ${лапкаY-5}" stroke="#141414" stroke-width="2.4" fill="none"/>
      <path d="M${xб-8} ${лапкаY+6.5} Q${xб} ${лапкаY+9} ${xб+8} ${лапкаY+5}" stroke="#141414" stroke-width="2.4" fill="none"/>
      <rect x="${xб-17}" y="${лапкаY-7}" width="5" height="14" rx="1.5" fill="#2a3038"/><circle cx="${xб-14.5}" cy="${лапкаY}" r="2" fill="#8a929c"/></g>`;

  /* ---------- бюретка: деления через 1 мл, мениск, кран с поворотной ручкой, капля ---------- */
  const бюреткаД = (x,yT,L,израсх,цв,открыт) => { const низТр=yT+L, мл=(v)=>yT+6+(L-12)*v/50, ур=мл(Math.min(50,израсх));
    let дел=''; for(let v=0;v<=50;v++){ const y=мл(v), д=v%10===0?7:v%5===0?5:3; дел+=`<path d="M${x-6} ${ф1(y)} h${д}" stroke="#f4f7fa" stroke-width="${v%10===0?0.9:0.55}" opacity=".9"/>`;
      if(v%10===0&&v>0) дел+=`<text x="${x-9}" y="${ф1(y+2.6)}" text-anchor="end" font-size="7" font-weight="bold" fill="#e8ecf0" font-family="${ШР}">${v}</text>`; }
    const жидкость = `<clipPath id="c123-бюр"><rect x="${x-5}" y="${yT}" width="10" height="${L}"/></clipPath><g clip-path="url(#c123-бюр)">
        <rect x="${x-5}" y="${ф1(ур)}" width="10" height="${ф1(низТр-ур+2)}" fill="${цв}"/>
        <path d="M${x-5} ${ф1(ур-1.8)} Q${x} ${ф1(ур+2.2)} ${x+5} ${ф1(ур-1.8)} V${ф1(ур+3)} H${x-5} Z" fill="${цв}"/>
        <path d="M${x-5} ${ф1(ур-1.8)} Q${x} ${ф1(ур+2.2)} ${x+5} ${ф1(ур-1.8)}" stroke="#1a2a3a" stroke-width=".9" fill="none" opacity=".75"/></g>`;
    const ручка = открыт ? `<rect x="${x-1.6}" y="${низТр+1}" width="3.2" height="15" rx="1.4" fill="#2a6ab8"/>` : `<rect x="${x-9}" y="${низТр+7}" width="18" height="3.2" rx="1.4" fill="#2a6ab8"/>`;
    return `<g>${жидкость}
      <rect x="${x-6}" y="${yT}" width="12" height="${L}" rx="2" fill="url(#c123-стеклоВ)" stroke="#a8c4d4" stroke-opacity=".75" stroke-width=".9"/>
      <rect x="${x-4.5}" y="${yT+3}" width="1.6" height="${L-6}" rx=".8" fill="#fff" opacity=".7"/>
      <rect x="${x+3}" y="${yT+3}" width="1" height="${L-6}" fill="#fff" opacity=".3"/>
      <ellipse cx="${x}" cy="${yT}" rx="6.5" ry="1.8" fill="none" stroke="#e8f4fa" stroke-width="1.2"/>
      ${дел}
      <path d="M${x-4} ${низТр} L${x-2} ${низТр+6} H${x+2} L${x+4} ${низТр} Z" fill="url(#c123-стеклоВ)" stroke="#a8c4d4" stroke-width=".7"/>
      <ellipse cx="${x}" cy="${низТр+8.6}" rx="7" ry="4" fill="#f0f3f6" stroke="#9aa6b2" stroke-width=".8"/>
      <ellipse cx="${x-2}" cy="${низТр+7.4}" rx="3" ry="1.3" fill="#fff" opacity=".9"/>
      ${ручка}
      <path d="M${x-2} ${низТр+12} L${x-0.8} ${низТр+30} H${x+0.8} L${x+2} ${низТр+12} Z" fill="url(#c123-стеклоВ)" stroke="#a8c4d4" stroke-width=".6"/>
      ${открыт&&ДВ()?`<circle cx="${x}" cy="${низТр+31}" r="2.2" fill="#dceaf4" stroke="#8fa8b8" stroke-width=".5"><animate attributeName="cy" values="${низТр+31};${низТр+31};${низТр+66}" keyTimes="0;.55;1" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.9;1" dur="1.1s" repeatCount="indefinite"/></circle>`:''}
      ${открыт?`<circle cx="${x}" cy="${низТр+30.8}" r="1.6" fill="#dceaf4"/>`:''}</g>`; };

  /* ---------- белая кафельная плитка под колбой: на белом виден переход окраски ---------- */
  const кафель = (x,y,ш) => `<g><ellipse cx="${x}" cy="${y+3}" rx="${ш/2+6}" ry="4" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <path d="M${x-ш/2} ${y} L${x-ш/2+8} ${y-10} H${x+ш/2-8} L${x+ш/2} ${y} Z" fill="url(#c123-кафель)"/>
      <path d="M${x-ш/2} ${y} H${x+ш/2} V${y+3} H${x-ш/2} Z" fill="#c8ced2"/>
      <path d="M${x-ш/2+10} ${y-8} L${x-ш/2+30} ${y-8}" stroke="#fff" stroke-width="1.4" opacity=".9"/>
      <path d="M${x} ${y-10} V${y}" stroke="#dde3e6" stroke-width=".6"/></g>`;

  /* ---------- pH-метр с электродом и кабелем ---------- */
  const pHметр = (x,y,pH,эл) => { const [ex,ey,eНиз]=эл;
    return `<g>
      <path d="M${ф1(x-44)} ${ф1(y-30)} C${ф1(x-90)} ${ф1(y-30)} ${ф1(ex+30)} ${ф1(ey-40)} ${ф1(ex)} ${ф1(ey-6)}" stroke="#0e0f11" stroke-width="3.2" fill="none"/>
      <path d="M${ф1(x-44)} ${ф1(y-31)} C${ф1(x-90)} ${ф1(y-31)} ${ф1(ex+30)} ${ф1(ey-41)} ${ф1(ex)} ${ф1(ey-7)}" stroke="#4a525c" stroke-width=".8" fill="none"/>
      <rect x="${ф1(ex-2.8)}" y="${ф1(ey)}" width="5.6" height="${ф1(eНиз-ey-6)}" rx="2.2" fill="url(#c123-стеклоВ)" stroke="#a8c4d4" stroke-width=".7"/>
      <path d="M${ф1(ex)} ${ф1(ey+4)} V${ф1(eНиз-8)}" stroke="#c8ccd2" stroke-width=".8"/>
      <circle cx="${ф1(ex)}" cy="${ф1(eНиз-4)}" r="4.2" fill="rgba(220,235,245,.55)" stroke="#a8c4d4" stroke-width=".7"/><circle cx="${ф1(ex-1.4)}" cy="${ф1(eНиз-5.4)}" r="1.2" fill="#fff" opacity=".8"/>
      <rect x="${ф1(ex-4)}" y="${ф1(ey-12)}" width="8" height="13" rx="2" fill="#16181b"/><rect x="${ф1(ex-3)}" y="${ф1(ey-11)}" width="2" height="11" fill="#4a525c" opacity=".7"/>
      <ellipse cx="${x}" cy="${y+2}" rx="50" ry="4" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${x-46} ${y} L${x-42} ${y-50} H${x+42} L${x+46} ${y} Z" fill="url(#c123-пластик)"/>
      <path d="M${x-42} ${y-50} H${x+42}" stroke="#8a929c" stroke-width="1"/>
      <rect x="${x-34}" y="${y-44}" width="68" height="24" rx="3" fill="url(#c123-жк)" stroke="#0e1410" stroke-width="1.2"/>
      <text x="${x-30}" y="${y-36}" font-size="6" font-weight="bold" fill="#2a3a2a" font-family="${ШР}">pH</text>
      <text x="${x+30}" y="${y-25}" text-anchor="end" font-size="15" font-weight="bold" fill="#14241a" font-family="'Courier New',monospace">${ок1(pH).padStart(4,' ')}</text>
      <text x="${x-30}" y="${y-24}" font-size="5" fill="#2a3a2a" font-family="${ШР}">25 °C</text>
      ${[0,1,2].map(j=>`<circle cx="${x-18+j*18}" cy="${y-10}" r="3.6" fill="#2a3038" stroke="#6a737d" stroke-width=".7"/><circle cx="${x-19+j*18}" cy="${y-11}" r="1.2" fill="#fff" opacity=".35"/>`).join('')}
      ${тА(x,y-1.5,'pH-МЕТР',5.5,'#8a939b')}</g>`; };

  /* ---------- капельница индикатора: флакон, резиновая груша, этикетка ---------- */
  const капельница = (x,y,м,цв,надпись) => { const к=м||1;
    return `<g transform="translate(${ф1(x)} ${ф1(y)}) scale(${к})">
      <ellipse cx="2" cy="1" rx="13" ry="2.4" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <path d="M-10 0 V-24 Q-10 -30 -4 -31 H4 Q10 -30 10 -24 V0 Z" fill="rgba(120,64,20,.82)" stroke="#5a2e0a" stroke-width=".6"/>
      <path d="M-9 -2 V-18 H9 V-2 Z" fill="${цв}" opacity=".55"/>
      <path d="M-7.5 -26 V-4" stroke="#fff" stroke-width="1.4" opacity=".45"/>
      <rect x="-8" y="-19" width="16" height="11" rx="1" fill="#f6f0e2"/><text x="0" y="-11.8" text-anchor="middle" font-size="4.4" font-weight="bold" fill="#2e2416" font-family="${ШР}"${String(надпись).length>6?' textLength="14" lengthAdjust="spacingAndGlyphs"':''}>${esc(надпись)}</text>
      <rect x="-3.5" y="-35" width="7" height="5" rx="1" fill="#1a1a1a"/>
      <path d="M-4.5 -35 Q-6 -46 0 -47 Q6 -46 4.5 -35 Z" fill="#7a1a10"/><path d="M-2.5 -44 Q-1 -46 1 -45.5" stroke="#fff" stroke-width=".8" opacity=".5" fill="none"/></g>`; };

  /* ---------- краснокочанная капуста: целый кочан и половинка в разрезе ---------- */
  const капуста = (x,y,r) => { const cy=y-r*0.62;
    let складки=''; for(let k=1;k<=6;k++){ const s0=1-k*0.14; let d=''; for(let i=0;i<=48;i++){ const t=i/48*Math.PI*2, вол=1+0.07*Math.sin(t*7+k*1.7);
        const px=x+Math.cos(t)*r*s0*вол, py=cy+Math.sin(t)*r*0.6*s0*вол; d+=(i?'L':'M')+ф1(px)+' '+ф1(py)+' '; }
      складки+=`<path d="${d}Z" fill="none" stroke="${k%2?'#6a1a82':'#8a2aa0'}" stroke-width="${ф1(2.2-k*0.2)}" opacity=".85"/>`; }
    return `<g><ellipse cx="${x+r*0.3}" cy="${y+2}" rx="${r*1.6}" ry="${ф1(r*0.18)}" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <circle cx="${ф1(x+r*0.85)}" cy="${ф1(y-r*0.72)}" r="${ф1(r*0.74)}" fill="url(#c123-кочан)"/>
      ${[0,1,2,3].map(j=>`<path d="M${ф1(x+r*0.85)} ${ф1(y-r*0.12)} Q${ф1(x+r*(0.4+j*0.3))} ${ф1(y-r*0.9)} ${ф1(x+r*(0.3+j*0.4))} ${ф1(y-r*1.38)}" stroke="#c89ad8" stroke-width=".9" fill="none" opacity=".55"/>`).join('')}
      <path d="M${ф1(x+r*0.2)} ${ф1(y-r*1.1)} Q${ф1(x+r*0.85)} ${ф1(y-r*1.62)} ${ф1(x+r*1.5)} ${ф1(y-r*1.0)}" stroke="#3a0a4a" stroke-width="2" fill="none" opacity=".5"/>
      <ellipse cx="${x}" cy="${ф1(cy+r*0.06)}" rx="${r+2}" ry="${ф1(r*0.62+3)}" fill="#3a0a4a"/>
      <ellipse cx="${x}" cy="${ф1(cy)}" rx="${r}" ry="${ф1(r*0.62)}" fill="#efe2f4"/>
      ${складки}
      <path d="M${ф1(x-r*0.12)} ${ф1(cy+r*0.58)} Q${ф1(x-r*0.1)} ${ф1(cy+r*0.1)} ${x} ${ф1(cy-r*0.08)} Q${ф1(x+r*0.1)} ${ф1(cy+r*0.1)} ${ф1(x+r*0.12)} ${ф1(cy+r*0.58)} Z" fill="#f6f0dc" stroke="#d8c8a0" stroke-width=".6"/>
      <ellipse cx="${ф1(x-r*0.35)}" cy="${ф1(cy-r*0.25)}" rx="${ф1(r*0.3)}" ry="${ф1(r*0.1)}" fill="#fff" opacity=".35"/></g>`; };

  /* ---------- кривая титрования: сетка, оси, цветная шкала pH, зона фенолфталеина ---------- */
  const кривая = (x,y,ш,в,Т,V,показатьЭкв) => { const пл=x+24, пв=y+16, пш=ш-32, пвыс=в-36, X=(v)=>пл+пш*v/МАКС_МЛ, Y=(p)=>пв+пвыс-пвыс*p/14;
    let сетка=''; for(let v=0;v<=МАКС_МЛ;v+=5) сетка+=`<path d="M${ф1(X(v))} ${пв} V${пв+пвыс}" stroke="#fff" stroke-width="${v%10?0.3:0.6}" opacity="${v%10?.12:.22}"/>`+(v%10===0?тА(ф1(X(v)),пв+пвыс+10,v,7,'#9aa3ad'):'');
    for(let p=0;p<=14;p+=2) сетка+=`<path d="M${пл} ${ф1(Y(p))} H${пл+пш}" stroke="#fff" stroke-width=".4" opacity=".14"/>`+тА(пл-12,ф1(Y(p)+2.5),p,6.5,'#9aa3ad','end');
    const полоса=Array.from({length:14},(_,i)=>`<rect x="${пл-9}" y="${ф1(Y(i+1))}" width="5" height="${ф1(пвыс/14+0.4)}" fill="${УНИВ[i]}"/>`).join('');
    let d=''; for(let v=0;v<=Math.min(V,МАКС_МЛ)+1e-9;v+=0.25){ const p=pHтитр(Т,v); d+=(d?'L':'M')+ф1(X(v))+' '+ф1(Y(p))+' '; }
    const pV=pHтитр(Т,V), Ve=Vэкв(Т);
    return `<g><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="6" fill="rgba(10,12,16,.86)" stroke="#3a4048"/>
      <rect x="${пл}" y="${ф1(Y(10))}" width="${пш}" height="${ф1(Y(8.2)-Y(10))}" fill="#d8207a" opacity=".16"/>${тА(пл+пш-2,ф1(Y(10)+7),'фенолфталеин',6,'#f08ac0','end')}
      ${сетка}${полоса}
      <path d="M${пл} ${пв} V${пв+пвыс} H${пл+пш}" stroke="#c8ced6" stroke-width=".9" fill="none"/>
      <path d="M${пл} ${ф1(Y(7))} H${пл+пш}" stroke="#7cc23a" stroke-dasharray="3 3" stroke-width=".9"/>${тА(пл+3,ф1(Y(7)-3),'7',6.5,'#7cc23a','start')}
      ${показатьЭкв?`<path d="M${ф1(X(Ve))} ${пв} V${пв+пвыс}" stroke="${GOLD}" stroke-dasharray="4 3"/><circle cx="${ф1(X(Ve))}" cy="${ф1(Y(7))}" r="3.5" fill="none" stroke="${GOLD}" stroke-width="1.4"/>${тА(ф1(Math.min(X(Ve)+3,пл+пш-2)),пв+8,'экв.',7,GOLD,X(Ve)+30>пл+пш?'end':'start')}`:''}
      <path d="${d}" stroke="#2a1a00" stroke-width="3.6" fill="none" opacity=".5"/><path d="${d}" stroke="#ffd76a" stroke-width="1.8" fill="none"/>
      <circle cx="${ф1(X(V))}" cy="${ф1(Y(pV))}" r="7" fill="${униЦвет(pV)}" opacity=".3"/><circle cx="${ф1(X(V))}" cy="${ф1(Y(pV))}" r="3.6" fill="${униЦвет(pV)}" stroke="#fff" stroke-width="1.2"/>
      ${тА(x+6,y+11,'pH',8,'#c8ced6','start')}${тА(x+ш/2+8,y+11,'кривая титрования',8,'#c8ced6')}${тА(пл+пш,пв+пвыс+19,'мл кислоты',7,'#9aa3ad','end')}</g>`; };

  /* ================= ПОДРОБНЫЕ РИСУНКИ УРОКА 123 ================= */
  Object.assign(ЦВ_ИОН, {'Fe²⁺':['#e0ffd8','#7ac87a','#1e5a24'],'Cu²⁺':['#c8e4ff','#2a7ad8','#0a2a6a'],'Ag⁺':['#ffffff','#c8ccd4','#4a525c'],'NO₃⁻':['#ffe0c8','#e8904a','#6a2a08']});
  const слч = (k) => { const v=Math.sin(k*12.9898)*43758.5453; return v-Math.floor(v); };
  const смесьЦв = (a,b,t) => { const p=(h)=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)), A=p(a), B=p(b), т=Math.max(0,Math.min(1,t));
    return '#'+A.map((x,i)=>Math.round(x+(B[i]-x)*т).toString(16).padStart(2,'0')).join(''); };
  const ргба = (hex,a) => { const n=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)); return `rgba(${n[0]},${n[1]},${n[2]},${a})`; };
  /* крупинки порошка в области (эллипс или прямоугольник) */
  const крупинки = (cx,cy,rx,ry,n,цвета,сид) => { let s=''; for(let k=0;k<n;k++){ const a=слч(k+сид)*6.283, d=Math.sqrt(слч(k*3+сид)), x=cx+Math.cos(a)*rx*d, y=cy+Math.sin(a)*ry*d, ц=цвета[k%цвета.length], r=0.6+слч(k+сид*2)*1.1;
      s+=`<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${ф1(r)}" fill="${ц}"/>`; } return s; };

  /* ---------- банка с порошком: стекло, крышка с насечкой, этикетка, крупинки ---------- */
  const банкаП = (x,y,ш,в,цвета,надпись,подпись) => { const л=x-ш/2, ур=y-в*0.55;
    return `<g><ellipse cx="${x+3}" cy="${y+1.5}" rx="${ш*0.62}" ry="3" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${л} ${ф1(y-в*0.8)} V${y-3} Q${л} ${y} ${л+3} ${y} H${л+ш-3} Q${л+ш} ${y} ${л+ш} ${y-3} V${ф1(y-в*0.8)} Z" fill="rgba(220,235,245,.16)"/>
      <path d="M${л+1.5} ${ф1(ур)} V${y-3} Q${л+1.5} ${y-1.5} ${л+4} ${y-1.5} H${л+ш-4} Q${л+ш-1.5} ${y-1.5} ${л+ш-1.5} ${y-3} V${ф1(ур)} Q${x} ${ф1(ур-3)} ${л+1.5} ${ф1(ур)} Z" fill="${цвета[0]}"/>
      ${крупинки(x,(ур+y)/2,ш/2-3,(y-ур)/2-2,Math.round(ш*в/14),цвета.slice(1),x|0)}
      <path d="M${л} ${ф1(y-в*0.8)} V${y-3} Q${л} ${y} ${л+3} ${y} H${л+ш-3} Q${л+ш} ${y} ${л+ш} ${y-3} V${ф1(y-в*0.8)}" fill="none" stroke="#a8c4d4" stroke-opacity=".7" stroke-width=".9"/>
      <rect x="${л+2.5}" y="${ф1(y-в*0.76)}" width="2" height="${ф1(в*0.68)}" rx="1" fill="#fff" opacity=".55"/>
      <rect x="${л-1.5}" y="${ф1(y-в)}" width="${ш+3}" height="${ф1(в*0.2)}" rx="2" fill="#2a3038"/>
      ${Array.from({length:Math.floor(ш/3)},(_,j)=>`<path d="M${л+1+j*3} ${ф1(y-в+1)} V${ф1(y-в*0.82)}" stroke="#4a525c" stroke-width=".7"/>`).join('')}
      <rect x="${л+3}" y="${ф1(y-в*0.62)}" width="${ш-6}" height="${ф1(в*0.3)}" rx="1.5" fill="#f6f0e2"/>
      <rect x="${л+3}" y="${ф1(y-в*0.62)}" width="${ш-6}" height="2.2" fill="#c8402a"/>
      <text x="${x}" y="${ф1(y-в*0.62+в*0.21)}" text-anchor="middle" font-size="${Math.min(7.5,ш*0.22)}" font-weight="bold" fill="#2e2416" font-family="${ШР}">${esc(надпись)}</text></g>
      ${подпись?тА(x,y+12,подпись,7.5,'#c8ced6'):''}`; };

  /* ---------- фарфоровая ступка с пестиком и смесью ---------- */
  const ступка = (x,y,м,перемешано,трёт) => { const к=м||1, Fe=['#4a5058','#6a737d','#2a2f35'], S=['#f2d22a','#ffe86a','#d0a810'];
    const зёрна = перемешано>=3 ? крупинки(x,y-26*к,24*к,4.5*к,90,['#8a8a5a','#5a5f66','#c8b84a','#6a6a52'],7)
      : крупинки(x-9*к,y-26*к,14*к,4*к,45,Fe,3) + крупинки(x+10*к,y-26*к,13*к,4*к,40,S,5) + (перемешано?крупинки(x,y-26*к,20*к,4*к,СМЕСЬ_N(перемешано),['#8a8a5a','#c8b84a'],9):'');
    return `<g><ellipse cx="${x+4*к}" cy="${y+2}" rx="${ф1(36*к)}" ry="${ф1(4*к)}" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${ф1(x-34*к)} ${ф1(y-26*к)} Q${ф1(x-32*к)} ${ф1(y-4*к)} ${ф1(x-14*к)} ${ф1(y-2*к)} L${ф1(x-16*к)} ${y} H${ф1(x+16*к)} L${ф1(x+14*к)} ${ф1(y-2*к)} Q${ф1(x+32*к)} ${ф1(y-4*к)} ${ф1(x+34*к)} ${ф1(y-26*к)} Z" fill="url(#c123-фарфор)"/>
      <ellipse cx="${x}" cy="${ф1(y-26*к)}" rx="${ф1(34*к)}" ry="${ф1(7*к)}" fill="#e8e6e0" stroke="#b8b4a8" stroke-width=".8"/>
      <ellipse cx="${x}" cy="${ф1(y-25.5*к)}" rx="${ф1(29*к)}" ry="${ф1(5.6*к)}" fill="#8a8678"/>
      ${зёрна}
      <path d="M${ф1(x-30*к)} ${ф1(y-22*к)} Q${ф1(x-28*к)} ${ф1(y-8*к)} ${ф1(x-16*к)} ${ф1(y-5*к)}" stroke="#fff" stroke-width="${ф1(2.2*к)}" fill="none" opacity=".7"/>
      <g>${трёт&&ДВ()?`<animateTransform attributeName="transform" type="rotate" values="-14 ${x} ${ф1(y-24*к)};14 ${x} ${ф1(y-24*к)};-14 ${x} ${ф1(y-24*к)}" dur=".7s" repeatCount="indefinite"/>`:''}
        <path d="M${ф1(x+4*к)} ${ф1(y-26*к)} L${ф1(x+22*к)} ${ф1(y-70*к)}" stroke="url(#c123-фарфорП)" stroke-width="${ф1(7*к)}" stroke-linecap="round"/>
        <ellipse cx="${ф1(x+3*к)}" cy="${ф1(y-25*к)}" rx="${ф1(7*к)}" ry="${ф1(4.4*к)}" fill="#efede6" stroke="#b8b4a8" stroke-width=".6"/>
        <path d="M${ф1(x+19*к)} ${ф1(y-64*к)} L${ф1(x+12*к)} ${ф1(y-46*к)}" stroke="#fff" stroke-width="${ф1(1.4*к)}" opacity=".7"/></g></g>`; };
  const СМЕСЬ_N = (n) => 20+n*12;

  /* ---------- подковообразный магнит; тянет — опилки повисли на полюсах ---------- */
  const магнит = (x,y,м,тянет,угол) => { const к=м||1; let опилки='';
    if(тянет) [-1,1].forEach(сторона=>{ for(let j=0;j<26;j++){ const px=x+сторона*13*к+(слч(j+сторона*7)-0.5)*10*к, py=y+16*к+слч(j+3)*14*к, a=(слч(j)-0.5)*1.4;
      опилки+=`<path d="M${ф1(px)} ${ф1(py)} l${ф1(Math.sin(a)*3.4)} ${ф1(Math.cos(a)*4.6)}" stroke="${j%3?'#9aa3ad':'#d8dde2'}" stroke-width="1.4" stroke-linecap="round"/>`; } });
    return `<g transform="rotate(${угол||0} ${x} ${y})">
      ${тянет?[0,1,2].map(j=>`<path d="M${ф1(x-13*к)} ${ф1(y+14*к)} Q${x} ${ф1(y+(30+j*10)*к)} ${ф1(x+13*к)} ${ф1(y+14*к)}" stroke="#9fd0ff" stroke-width=".7" fill="none" stroke-dasharray="2 3" opacity=".6"/>`).join(''):''}
      <path d="M${ф1(x-19*к)} ${ф1(y+14*к)} V${ф1(y-12*к)} A${ф1(19*к)} ${ф1(19*к)} 0 0 1 ${ф1(x+19*к)} ${ф1(y-12*к)} V${ф1(y+14*к)} H${ф1(x+7*к)} V${ф1(y-12*к)} A${ф1(7*к)} ${ф1(7*к)} 0 0 0 ${ф1(x-7*к)} ${ф1(y-12*к)} V${ф1(y+14*к)} Z" fill="url(#c123-магнит)"/>
      <rect x="${ф1(x-19*к)}" y="${ф1(y+6*к)}" width="${ф1(12*к)}" height="${ф1(9*к)}" fill="url(#c123-хромМ)"/><rect x="${ф1(x+7*к)}" y="${ф1(y+6*к)}" width="${ф1(12*к)}" height="${ф1(9*к)}" fill="url(#c123-хромМ)"/>
      ${тА(ф1(x-13*к),ф1(y+2*к),'N',ф1(6.5*к),'#fff')}${тА(ф1(x+13*к),ф1(y+2*к),'S',ф1(6.5*к),'#fff')}
      <path d="M${ф1(x-16*к)} ${ф1(y-12*к)} A${ф1(16*к)} ${ф1(16*к)} 0 0 1 ${ф1(x-4*к)} ${ф1(y-27*к)}" stroke="#fff" stroke-width="${ф1(1.6*к)}" fill="none" opacity=".45"/>
      ${опилки}</g>`; };

  /* ---------- пробирка с веществом (наклонная, в лапке): полоса порошка и «фронт» превращения ---------- */
  const пробиркаН = (x,y,угол,длина,слой,опц) => { const о=опц||{}, д=длина, р=7;
    /* (x,y) — дно; ось пробирки идёт вверх-влево под углом */
    const раскал = о.раскал, фронт = о.фронт==null?0:о.фронт;
    return `<g transform="translate(${ф1(x)} ${ф1(y)}) rotate(${угол})">
      <path d="M${-р} 0 V${-д} H${р} V0 A${р} ${р} 0 0 1 ${-р} 0 Z" fill="rgba(220,235,245,.14)"/>
      ${слой}
      ${раскал?`<rect x="${-р+1}" y="${-12-ф1(слой&&о.длСлоя?о.длСлоя*фронт:0)}" width="${р*2-2}" height="12" fill="url(#c123-жар)" opacity=".95">${ДВ()&&о.бежит?`<animate attributeName="y" values="-4;${-(о.длСлоя||30)}" dur="3.2s" fill="freeze"/>`:''}</rect>`:''}
      ${о.капли?Array.from({length:о.капли},(_,j)=>`<ellipse cx="${ф1((слч(j+4)-0.5)*9)}" cy="${ф1(-д+6+слч(j+8)*(д*0.3))}" rx="${ф1(1+слч(j)*0.8)}" ry="${ф1(1.3+слч(j+2))}" fill="#dceaf4" opacity=".85" stroke="#9fb8c8" stroke-width=".3"/>`).join(''):''}
      <path d="M${-р} 0 V${-д} M${р} ${-д} V0 A${р} ${р} 0 0 1 ${-р} 0" fill="none" stroke="#a8c4d4" stroke-opacity=".8" stroke-width="1"/>
      <rect x="${-р+1.6}" y="${-д+4}" width="1.6" height="${д-6}" fill="#fff" opacity=".6"/>
      <ellipse cx="0" cy="${-д}" rx="${р+0.5}" ry="1.8" fill="none" stroke="#e8f4fa" stroke-width="1.1"/>
      ${о.пробка?`<path d="M${-р+0.5} ${-д+6} L${-р-0.5} ${-д-6} H${р+0.5} L${р-0.5} ${-д+6} Z" fill="#7a3a2a"/><path d="M${-р} ${-д-5} H${р}" stroke="#a85a4a" stroke-width="1"/>`:''}</g>`; };

  /* ---------- гвоздь: шляпка, стержень с насечкой, остриё; медь — слой поверх ---------- */
  const гвоздь = (x,y,дл,медь,угол) => { const m=Math.max(0,Math.min(1,медь||0));
    return `<g transform="rotate(${угол||0} ${x} ${y})">
      <ellipse cx="${x}" cy="${y}" rx="7.5" ry="2.6" fill="url(#c123-сталь)"/><rect x="${x-7.5}" y="${y}" width="15" height="2.2" fill="#5a636d"/>
      <path d="M${x-2.4} ${y+2} V${y+дл-9} L${x} ${y+дл} L${x+2.4} ${y+дл-9} V${y+2} Z" fill="url(#c123-стальГ)"/>
      ${[0,1,2,3].map(j=>`<path d="M${x-2.4} ${y+5+j*2} L${x+2.4} ${y+6+j*2}" stroke="#4a525c" stroke-width=".5"/>`).join('')}
      ${m>0?`<path d="M${x-2.6} ${y+2} V${y+дл-9} L${x} ${y+дл+0.5} L${x+2.6} ${y+дл-9} V${y+2} Z" fill="url(#c123-медь)" opacity="${ф1(m)}"/>
        ${Array.from({length:Math.round(m*14)},(_,j)=>`<circle cx="${ф1(x+(слч(j+11)-0.5)*4.5)}" cy="${ф1(y+6+слч(j+5)*(дл-14))}" r="${ф1(0.5+слч(j)*0.7)}" fill="#ffb07a" opacity=".8"/>`).join('')}`:''}
      <path d="M${x-1.4} ${y+3} V${y+дл-10}" stroke="#fff" stroke-width=".7" opacity=".55"/></g>`; };

  /* ---------- творожистый осадок AgCl ---------- */
  const творог = (x,y,ш,сколько) => { let s=''; const n=Math.round(сколько*26);
    for(let k=0;k<n;k++){ const px=x+(слч(k+21)-0.5)*ш, py=y-слч(k+31)*сколько*14, r=1.6+слч(k+41)*2.6;
      s+=`<circle cx="${ф1(px)}" cy="${ф1(py)}" r="${ф1(r)}" fill="${k%5===0?'#dfe2e6':'#f8f9fa'}" opacity=".95"/><circle cx="${ф1(px-r*0.3)}" cy="${ф1(py-r*0.3)}" r="${ф1(r*0.35)}" fill="#fff"/>`; }
    return s; };

  /* ---------- схема типа реакции: плитки A, B, C, D ---------- */
  const ПЛИТ = {A:['#ffb04a','#8a4a08'],B:['#7fb8ff','#14306a'],C:['#8ae86a','#1a5a10'],D:['#d8a4ff','#3e1480']};
  const плиткиСх = (x,y,слово) => { let s='', dx=0; слово.split('').forEach(ch=>{ const [c1,c2]=ПЛИТ[ch]; s+=`<rect x="${x+dx}" y="${y-11}" width="18" height="18" rx="4" fill="${c1}" stroke="${c2}" stroke-width="1.2"/><rect x="${x+dx+2}" y="${y-9}" width="14" height="4" rx="2" fill="#fff" opacity=".35"/>`+тА(x+dx+9,y+3,ch,10,c2); dx+=17; }); return [s,dx]; };
  const схемаТипа = (cx,y,т) => { const части=[['A','+','B','→','AB'],['AB','→','A','+','B'],['A','+','BC','→','AC','+','B'],['AB','+','CD','→','AD','+','CB']][т];
    const ширины=части.map(p=>/[A-D]/.test(p)?p.length*17+2:16), всего=ширины.reduce((a,b)=>a+b,0); let x=cx-всего/2, s='';
    части.forEach((p,i)=>{ if(/[A-D]/.test(p)){ s+=плиткиСх(x,y,p)[0]; } else s+=тА(x+8,y+4,p,13,'#eef2f6'); x+=ширины[i]; }); return s; };

  /* ---------- микромир замещения: поверхность гвоздя и раствор ---------- */
  const микроЗам = (cx,cy,r,доля) => { const кл='c123-мз';
    let s=`<clipPath id="${кл}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="#0c2232"/><g clip-path="url(#${кл})">`;
    /* решётка железа слева */
    for(let j=0;j<9;j++) for(let i=0;i<3;i++){ const x=cx-r+6+i*11+(j%2?5:0), y=cy-r+6+j*11; s+=сфера(x,y,5.4,'c123-атFe'); }
    /* медь оседает на поверхность */
    const осело=Math.round(доля*9); for(let j=0;j<осело;j++){ const x=cx-r+42, y=cy-r+8+j*11; s+=сфера(x,y,5.4,'c123-атCu'); }
    /* ионы в растворе */
    const сколькоCu=Math.round((1-доля)*6), сколькоFe=Math.round(доля*6);
    for(let k=0;k<6;k++){ const x=cx+6+слч(k+1)*r*0.8, y=cy-r*0.7+слч(k+9)*r*1.4;
      s+= k<сколькоCu ? `<g>${сфера(x,y,6.2,'c123-ионCu')}<text x="${ф1(x)}" y="${ф1(y+2.2)}" text-anchor="middle" font-size="5" font-weight="bold" fill="#0a2a6a" font-family="${ШР}">Cu²⁺</text></g>` : ''; }
    for(let k=0;k<сколькоFe;k++){ const x=cx+2+слч(k+31)*r*0.85, y=cy-r*0.75+слч(k+41)*r*1.5;
      s+=`<g>${сфера(x,y,6,'c123-ионFe')}<text x="${ф1(x)}" y="${ф1(y+2.2)}" text-anchor="middle" font-size="5" font-weight="bold" fill="#1e5a24" font-family="${ШР}">Fe²⁺</text></g>`; }
    for(let k=0;k<5;k++){ const x=cx+10+слч(k+51)*r*0.75, y=cy-r*0.6+слч(k+61)*r*1.3; s+=`<g opacity=".85">${сфера(x,y,7,'c123-ионSO4')}<text x="${ф1(x)}" y="${ф1(y+2)}" text-anchor="middle" font-size="4.2" font-weight="bold" fill="#7a5600" font-family="${ШР}">SO₄²⁻</text></g>`; }
    s+=`<path d="M${cx-r+36} ${cy-r} V${cy+r}" stroke="#9aa3ad" stroke-width=".6" stroke-dasharray="2 3" opacity=".6"/>`;
    return s+`</g><circle cx="${cx}" cy="${cy}" r="${r+2.5}" fill="none" stroke="url(#рл-сталь)" stroke-width="6"/>${тА(cx-r+20,cy+r-6,'Fe',7,'#c8ced6')}${тА(cx+r*0.45,cy+r-6,'раствор',7,'#c8ced6')}`; };

  /* ================= ОКРУЖЕНИЕ И БОГАТЫЕ СЦЕНЫ (вторая прорисовка 123) ================= */
  /* фон лаборатории: стена из тёмной плитки, мягкий свет, столешница с кромкой и шкафами */
  const фон = (Н,y0) => { let плитка=''; for(let y=0,р=0;y<y0;y+=22,р++){ плитка+=`<path d="M0 ${y} H336" stroke="#fff" stroke-opacity=".045"/>`;
      for(let x=(р%2?0:16);x<336;x+=32) плитка+=`<path d="M${x} ${y} V${Math.min(y0,y+22)}" stroke="#fff" stroke-opacity=".035"/>`; }
    const шкафы = Н-y0>34 ? `<rect x="0" y="${y0+18}" width="336" height="${Н-y0-18}" fill="url(#c123-шкаф)"/>${[0,1,2,3].map(i=>`<rect x="${6+i*84}" y="${y0+24}" width="76" height="${Н-y0-28}" rx="3" fill="none" stroke="#fff" stroke-opacity=".06"/><rect x="${38+i*84}" y="${y0+30}" width="12" height="3" rx="1.5" fill="url(#c123-хромМ)" opacity=".7"/>`).join('')}` : '';
    return `<rect width="336" height="${Н}" fill="url(#c123-стена)"/>${плитка}
      <ellipse cx="168" cy="${ф1(y0*0.35)}" rx="230" ry="${ф1(y0*0.75)}" fill="url(#рл-прожектор)"/>
      <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c123-столешница)"/>
      <rect x="0" y="${y0}" width="336" height="1.4" fill="#9aa6a0" opacity=".45"/><rect x="0" y="${y0+16}" width="336" height="2.2" fill="url(#c123-хромГ2)"/>
      ${шкафы}<rect width="336" height="${Н}" fill="url(#c123-виньетка)" pointer-events="none"/>`; };
  /* вытяжной шкаф: рама, задняя стенка, светильник, поднятая стеклянная створка */
  const тяга = (x1,y1,x2,y2) => `<g>
      <rect x="${x1}" y="${y1}" width="${x2-x1}" height="${y2-y1}" rx="4" fill="#161b20" stroke="#4a525c" stroke-width="3"/>
      <rect x="${x1+6}" y="${y1+6}" width="${x2-x1-12}" height="${y2-y1-6}" fill="url(#c123-тягаФон)"/>
      <rect x="${x1+12}" y="${y1+9}" width="${x2-x1-24}" height="5" rx="2.5" fill="#fff8e0" opacity=".9"/><rect x="${x1+12}" y="${y1+9}" width="${x2-x1-24}" height="22" fill="url(#c123-лучЛампы)"/>
      ${Array.from({length:6},(_,i)=>`<rect x="${x1+16+i*((x2-x1-32)/6)}" y="${y1+24}" width="${(x2-x1-32)/6-6}" height="3" rx="1.5" fill="#0a0d10"/>`).join('')}
      <rect x="${x1+4}" y="${y1+34}" width="${x2-x1-8}" height="34" fill="rgba(200,225,240,.10)" stroke="#8fa8b8" stroke-opacity=".5"/>
      <path d="M${x1+20} ${y1+64} L${x1+44} ${y1+38} M${x1+30} ${y1+66} L${x1+56} ${y1+38}" stroke="#fff" stroke-opacity=".22" stroke-width="2"/>
      <rect x="${x1+4}" y="${y1+66}" width="${x2-x1-8}" height="5" rx="2" fill="url(#c123-хромГ2)"/>
      <circle cx="${x2-14}" cy="${y1+48}" r="2.6" fill="#3aff7a"/><circle cx="${x2-14}" cy="${y1+48}" r="5" fill="#3aff7a" opacity=".25"/>${тА(x2-24,y1+51,'ТЯГА',6,'#8fd1a8','end')}</g>`;
  /* лабораторный журнал: лист в клетку с записью */
  const журналЛист = (x,y,ш,строки,опц) => { const о=опц||{}, в=18+строки.length*14; let клетка='';
    for(let i=1;i<в/8;i++) клетка+=`<path d="M${x} ${y+i*8} H${x+ш}" stroke="#7aa0c8" stroke-opacity=".25" stroke-width=".5"/>`;
    for(let i=1;i<ш/8;i++) клетка+=`<path d="M${x+i*8} ${y} V${y+в}" stroke="#7aa0c8" stroke-opacity=".25" stroke-width=".5"/>`;
    return `<g filter="url(#c123-тень)" transform="rotate(${о.поворот==null?-3:о.поворот} ${x+ш/2} ${y+в/2})"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="1.5" fill="#fbfaf4"/>${клетка}
      <path d="M${x+12} ${y} V${y+в}" stroke="#e88a8a" stroke-width=".8"/>
      ${строки.map((t0,i)=>`<text x="${x+16}" y="${y+15+i*14}" font-size="${i?9:10}" font-weight="${i?'normal':'bold'}" fill="${i?'#1a3a7a':'#2e2416'}" font-family="'Segoe Print','Comic Sans MS',cursive">${esc(t0)}</text>`).join('')}</g>`; };
  /* лабораторный таймер со стрелкой */
  const таймер = (x,y,r,мин,макс) => { const a=рад(-90+360*Math.min(1,мин/макс)); let риски='';
    for(let i=0;i<30;i++){ const b=рад(-90+i*12), д=i%5?r*0.12:r*0.22; риски+=`<path d="M${ф1(x+Math.cos(b)*(r-2))} ${ф1(y+Math.sin(b)*(r-2))} L${ф1(x+Math.cos(b)*(r-2-д))} ${ф1(y+Math.sin(b)*(r-2-д))}" stroke="#2a3038" stroke-width="${i%5?0.7:1.3}"/>`; }
    return `<g><ellipse cx="${x+3}" cy="${y+r+3}" rx="${r}" ry="3" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <rect x="${x-4}" y="${y-r-9}" width="8" height="7" rx="1.5" fill="url(#c123-хромМ)"/><rect x="${x+r*0.55}" y="${y-r-3}" width="6" height="6" rx="1.5" fill="#c8402a" transform="rotate(40 ${x+r*0.6} ${y-r})"/>
      <circle cx="${x}" cy="${y}" r="${r+3}" fill="url(#c123-хромМ)"/><circle cx="${x}" cy="${y}" r="${r}" fill="#f8f8f2"/>${риски}
      ${[0,5,10,15,20,25].map(m=>{ const b=рад(-90+m*12); return тА(ф1(x+Math.cos(b)*r*0.62),ф1(y+Math.sin(b)*r*0.62+2.5),m,ф1(r*0.2),'#2a3038'); }).join('')}
      <path d="M${x} ${y} L${ф1(x+Math.cos(a)*r*0.8)} ${ф1(y+Math.sin(a)*r*0.8)}" stroke="#c8402a" stroke-width="1.6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="2.4" fill="#c8402a"/>
      <ellipse cx="${ф1(x-r*0.35)}" cy="${ф1(y-r*0.45)}" rx="${ф1(r*0.4)}" ry="${ф1(r*0.15)}" transform="rotate(-30 ${ф1(x-r*0.35)} ${ф1(y-r*0.45)})" fill="#fff" opacity=".6"/></g>`; };
  /* минерал малахит: полосатый срез с полировкой */
  const малахит = (x,y,r) => { let полосы=''; for(let k=0;k<7;k++){ const s0=1-k*0.13; let d=''; for(let i=0;i<=40;i++){ const t=i/40*Math.PI*2, в=1+0.06*Math.sin(t*5+k);
        d+=(i?'L':'M')+ф1(x-r*0.15+Math.cos(t)*r*s0*в)+' '+ф1(y-r*0.45+Math.sin(t)*r*0.42*s0*в)+' '; }
      полосы+=`<path d="${d}Z" fill="${['#0e4a2a','#1a6a3a','#2a8a4a','#3aa86a','#5ac88a','#2a8a4a','#7ad8a0'][k]}"/>`; }
    return `<g><ellipse cx="${x+3}" cy="${y+1}" rx="${r*1.1}" ry="4" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${x-r*1.05} ${y} Q${x-r*1.1} ${y-r*0.5} ${x-r*0.5} ${y-r*0.62} Q${x+r*0.3} ${y-r*0.8} ${x+r} ${y-r*0.4} Q${x+r*1.1} ${y-r*0.1} ${x+r*0.9} ${y} Z" fill="#0a3a1e"/>
      ${полосы}<ellipse cx="${x-r*0.45}" cy="${y-r*0.62}" rx="${r*0.35}" ry="${r*0.1}" fill="#fff" opacity=".35"/></g>`; };
  /* фонарик и луч (эффект Тиндаля) */
  const фонарик = (x,y,дл,мутно,xL,xR,yy) => `<g>
      <path d="M${x+10} ${y-6} L${xR} ${yy-14} L${xR} ${yy+14} L${x+10} ${y+6} Z" fill="url(#c123-луч)" opacity=".55"/>
      ${мутно>0?`<path d="M${xL} ${yy-9} L${xR-4} ${yy-12} L${xR-4} ${yy+12} L${xL} ${yy+9} Z" fill="#fff6d0" opacity="${ф1(Math.min(.75,мутно*0.7))}"/>`:''}
      <rect x="${x-дл}" y="${y-6}" width="${дл}" height="12" rx="4" fill="url(#c123-корпусФ)"/><rect x="${x-4}" y="${y-8}" width="14" height="16" rx="3" fill="url(#c123-хромМ)"/>
      <ellipse cx="${x+10}" cy="${y}" rx="2" ry="7" fill="#fff8d8"/><rect x="${x-дл+10}" y="${y-8}" width="8" height="3" rx="1" fill="#c8402a"/></g>`;
  /* выноска со стрелкой */
  const выноска = (x1,y1,x2,y2,текст,цв) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${цв||GOLD}" stroke-width="1.1"/><circle cx="${x2}" cy="${y2}" r="2.4" fill="${цв||GOLD}"/>` + метка(x1,y1-10,текст,цв===GREEN?ЗЕ:ЗЛ,{кегль:9});

  /* лист журнала с уравнением: бумага в клетку, поля, крупная запись */
  const карточкаУр = (x,y,ш,в,текст,кегль) => { let кл=''; for(let i=1;i<в/9;i++) кл+=`<path d="M${x} ${y+i*9} H${x+ш}" stroke="#7aa0c8" stroke-opacity=".22" stroke-width=".5"/>`;
    for(let i=1;i<ш/9;i++) кл+=`<path d="M${x+i*9} ${y} V${y+в}" stroke="#7aa0c8" stroke-opacity=".22" stroke-width=".5"/>`;
    return `<g filter="url(#c123-тень)"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="2" fill="#fbfaf4"/></g>${кл}<path d="M${x+16} ${y} V${y+в}" stroke="#e88a8a" stroke-width=".9"/>
      <rect x="${x+ш/2-22}" y="${y-5}" width="44" height="10" rx="2" fill="#e8dcc0" opacity=".85"/>
      <text x="${x+ш/2+8}" y="${y+в/2+кегль*0.36}" text-anchor="middle" font-size="${кегль}" font-weight="bold" fill="#1a2a5a" font-family="${ШР}">${esc(текст)}</text>`; };
  /* миниатюра опыта для плиток карточки и вывода: (x,y) — левый верх, 156 × 118 */
  const миниСцена = (т,x,y,ш,в,и) => { const кл='c123-мини'+и; let s='';
    if(т===0) s = ступка(46,в-12,0.62,3,false) + магнит(116,34,0.62,true,0);
    else if(т===1){ const слой=`<rect x="-6" y="-30" width="12" height="30" fill="#1c1c1e"/>`; s = L_().спиртовка(42,в-6,0.62,true) + пробиркаН(32,в-40,100,72,слой,{капли:4,пробка:true}) +
      `<path d="M108 ${в-50} Q124 ${в-66} 134 ${в-60} V${в-30}" stroke="#8fa8b8" stroke-width="3" fill="none" opacity=".75"/>` + L_().пробирка(134,в-6,0.7,{уровень:.6,цвет:'rgba(225,230,236,.85)'}); }
    else if(т===2) s = L_().стакан(78,в-6,64,84,{уровень:.8,цвет:'rgba(120,190,170,.62)',объём:250,осадок:3}) + `<rect x="40" y="${в-96}" width="76" height="3" rx="1.5" fill="#dceaf4" opacity=".7"/><path d="M78 ${в-94} V${в-76}" stroke="#d8d0b8"/>` + гвоздь(78,в-76,56,0.85,0);
    else s = L_().стакан(78,в-6,64,80,{уровень:.55,цвет:'rgba(236,240,244,.6)',объём:250}) + `<g>${творог(78,в-12,48,1)}</g>` + L_().пипетка(78,в-74,0.8,true) + капельница(130,в-6,0.9,'#f0f0f0','AgNO₃');
    return `<g transform="translate(${x} ${y})"><clipPath id="${кл}"><rect width="${ш}" height="${в}" rx="10"/></clipPath>
      <rect width="${ш}" height="${в}" rx="10" fill="url(#c123-плитка)"/><g clip-path="url(#${кл})">
        ${Array.from({length:6},(_,i)=>`<path d="M0 ${i*18} H${ш}" stroke="#fff" stroke-opacity=".04"/>`).join('')}
        <rect x="0" y="${в-8}" width="${ш}" height="8" fill="#0e1412"/><rect x="0" y="${в-8}" width="${ш}" height="1" fill="#9aa6a0" opacity=".4"/>
        <g transform="scale(${ф1(ш/156)})">${s}</g></g>
      <rect width="${ш}" height="${в}" rx="10" fill="none" stroke="${['#c8a04a','#3aa86a','#e8885a','#c8ccd4'][т]}" stroke-width="1.6" opacity=".9"/></g>`; };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=322, y0=314, к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const тело = фон(Н,y0) + тА(168,22,'четыре опыта — четыре типа реакций',12,GOLD) +
      [0,1,2,3].map(i=>{ const x=10+(i%2)*162, y=34+Math.floor(i/2)*140;
        return миниСцена(i,x,y,154,108,i) + метка(x+77,y-6,ТИПЫ[i],['#c8a04a','#3aa86a','#e8885a','#c8ccd4'][i],{кегль:9}) + `<g transform="translate(${x+77} ${y+122}) scale(.62) translate(${-x-77} ${-y-122})">${схемаТипа(x+77,y+122,i)}</g>`; }).join('');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Типы химических реакций') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r123вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['сколько веществ вступило и сколько получилось','какого цвета продукты'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','По какому признаку делят реакции на четыре типа?') :
          РАЗБОР(ок,['Верно: считаем вещества слева и справа и смотрим, простые они или сложные.','Цвет — признак реакции вообще, а тип определяют по <b>числу и составу</b> веществ.'][в]))) +
      (ок ? ПРАВИЛО('Соединение A+B→AB · разложение AB→A+B · замещение A+BC→AC+B · обмен AB+CD→AD+CB') : '');
  }

  /* ================= ПЕРЕТАСКИВАНИЕ ПО РИСУНКУ =================
     Предмет — <g class="тащ" data-ax data-ay onpointerdown="r123тащ(event,'id')">. Кадр при отрисовке
     кладёт в ЦЕЛИ[id] зоны {x,y,r,что()} (или {далеко:d,что()}) и, если нужно, тереть(путь).
     Во время перетаскивания урок не перерисовывается; после броска — действие и ПЕРЕРИС(). */
  let ЦЕЛИ = {}, тащ = null;
  const точкаSVG = (svg,e) => { const p=svg.createSVGPoint(); p.x=e.clientX; p.y=e.clientY; return p.matrixTransform(svg.getScreenCTM().inverse()); };
  window.r123тащ = (evt,id) => { const g=evt.currentTarget, svg=g.ownerSVGElement; if(!svg||!ЦЕЛИ[id]) return;
    evt.preventDefault(); evt.stopPropagation();
    const p0=точкаSVG(svg,evt); тащ={g:g,id:id,p0:p0,dx:0,dy:0,путь:0,пред:p0};
    try{ g.setPointerCapture(evt.pointerId); }catch(e){}
    g.classList.add('тащу'); g.style.transition='none';
    const ц=ЦЕЛИ[id], подсв=(вкл)=>{ (ц.зоны||[]).forEach((z,i)=>{ const el=svg.querySelector('[data-зона="'+id+'-'+i+'"]'); if(el) el.classList.toggle('над',!!вкл&&вкл===z); }); };
    const ax=+g.dataset.ax, ay=+g.dataset.ay;
    const move=(e)=>{ if(!тащ) return; const p=точкаSVG(svg,e); тащ.dx=p.x-p0.x; тащ.dy=p.y-p0.y;
      const x=ax+тащ.dx, y=ay+тащ.dy, z=(ц.зоны||[]).find(z0=>z0.r&&Math.hypot(x-z0.x,y-z0.y)<=z0.r);
      if(ц.тереть&&z){ тащ.путь+=Math.hypot(p.x-тащ.пред.x,p.y-тащ.пред.y); ц.тереть(тащ.путь,svg); }
      тащ.пред=p; g.style.transform=`translate(${тащ.dx.toFixed(1)}px,${тащ.dy.toFixed(1)}px)`; подсв(z); };
    const up=()=>{ g.removeEventListener('pointermove',move); g.removeEventListener('pointerup',up); g.removeEventListener('pointercancel',up);
      const т=тащ; тащ=null; if(!т) return; g.classList.remove('тащу'); подсв(null);
      const x=ax+т.dx, y=ay+т.dy, z=(ц.зоны||[]).find(z0=>z0.r?Math.hypot(x-z0.x,y-z0.y)<=z0.r:Math.hypot(т.dx,т.dy)>=z0.далеко);
      if(z&&!ц.тереть){ z.что(); return; }
      if(ц.тереть&&ц.отпустить){ ц.отпустить(); }
      g.style.transition='transform .28s cubic-bezier(.2,.9,.3,1.2)'; g.style.transform='translate(0px,0px)'; };
    g.addEventListener('pointermove',move); g.addEventListener('pointerup',up); g.addEventListener('pointercancel',up); };
  /* предмет, который можно тащить; (ax,ay) — точка, по которой ищем зону */
  const тащ_ = (id,ax,ay,внутри,ш,в) => `<g class="тащ" data-ax="${ax}" data-ay="${ay}" onpointerdown="r123тащ(event,'${id}')">${внутри}<rect x="${ax-ш/2}" y="${ay-в/2}" width="${ш}" height="${в}" fill="#fff" fill-opacity="0"/></g>`;
  /* цель: пульсирующее кольцо + подпись; стрелка-подсказка от предмета к цели */
  const цель_ = (id,i,x,y,r,текст) => `<g data-зона="${id}-${i}" class="зона"><circle cx="${x}" cy="${y}" r="${r}" fill="#ffd76a" fill-opacity=".07" stroke="#ffd76a" stroke-width="1.6" stroke-dasharray="5 4">${ДВ()?`<animate attributeName="stroke-dashoffset" values="0;18" dur="1.4s" repeatCount="indefinite"/><animate attributeName="r" values="${r-3};${r+2};${r-3}" dur="1.6s" repeatCount="indefinite"/>`:''}</circle>${текст?метка(x,y-r-24,текст,ЗЛ,{кегль:9}):''}</g>`;
  const стрелка_ = (x1,y1,x2,y2) => { const mx=(x1+x2)/2, my=Math.min(y1,y2)-40;
    return `<path d="M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}" stroke="#ffd76a" stroke-width="2" fill="none" stroke-dasharray="6 5" opacity=".9" pointer-events="none">${ДВ()?`<animate attributeName="stroke-dashoffset" values="22;0" dur="1s" repeatCount="indefinite"/>`:''}</path>
      <circle cx="${x2}" cy="${y2}" r="3.5" fill="#ffd76a" pointer-events="none"/>`; };
  const кнопкаНаРисунке = (x,y,r,on,текст) => `<g style="cursor:pointer" onclick="${on}"><circle cx="${x}" cy="${y}" r="${r+6}" fill="#ffd76a" opacity=".18">${ДВ()?`<animate attributeName="r" values="${r+2};${r+9};${r+2}" dur="1.3s" repeatCount="indefinite"/>`:''}</circle><circle cx="${x}" cy="${y}" r="${r}" fill="#fff" fill-opacity="0" pointer-events="all"/>${текст?метка(x,y+r+4,текст,ЗЛ,{кегль:9}):''}</g>`;

  /* ---------- процессы, которые идут сами (нагрев, время) ---------- */
  let ход = null;
  const стоп = () => { if(ход){ clearInterval(ход.ид); ход=null; } };
  const запустить = (ключ,макс,шаг,мс,шагУрока,обновить,конец) => { стоп();
    ход={ид:setInterval(()=>{ const s=S(); if(typeof LV==='undefined'||LV.id!==ID||LV.step!==шагУрока){ стоп(); return; }
      s[ключ]=Math.min(макс,+((s[ключ]||0)+шаг).toFixed(2)); обновить(s);
      if(s[ключ]>=макс){ стоп(); if(конец) конец(s); ПЕРЕРИС(); } },мс)}; };

  /* ---------- ступка без пестика и пестик отдельно ---------- */
  const ступкаИ = (x,y,м,fe,su,сч) => { const к=м||1, Fe=['#4a5058','#6a737d','#2a2f35'], Sц=['#f2d22a','#ffe86a','#d0a810'];
    const зёрна = сч>=3 ? крупинки(x,y-26*к,24*к,4.5*к,90,['#8a8a5a','#5a5f66','#c8b84a','#6a6a52'],7)
      : (fe?крупинки(x-9*к+сч*3,y-26*к,(14+сч*3)*к,4*к,45,Fe,3):'') + (su?крупинки(x+10*к-сч*3,y-26*к,(13+сч*3)*к,4*к,40,Sц,5):'') + (сч?крупинки(x,y-26*к,20*к,4*к,20+сч*15,['#8a8a5a','#c8b84a'],9):'');
    return `<g><ellipse cx="${x+4*к}" cy="${y+2}" rx="${ф1(36*к)}" ry="${ф1(4*к)}" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${ф1(x-34*к)} ${ф1(y-26*к)} Q${ф1(x-32*к)} ${ф1(y-4*к)} ${ф1(x-14*к)} ${ф1(y-2*к)} L${ф1(x-16*к)} ${y} H${ф1(x+16*к)} L${ф1(x+14*к)} ${ф1(y-2*к)} Q${ф1(x+32*к)} ${ф1(y-4*к)} ${ф1(x+34*к)} ${ф1(y-26*к)} Z" fill="url(#c123-фарфор)"/>
      <ellipse cx="${x}" cy="${ф1(y-26*к)}" rx="${ф1(34*к)}" ry="${ф1(7*к)}" fill="#e8e6e0" stroke="#b8b4a8" stroke-width=".8"/>
      <ellipse cx="${x}" cy="${ф1(y-25.5*к)}" rx="${ф1(29*к)}" ry="${ф1(5.6*к)}" fill="#8a8678"/><g id="c123-зёрна">${зёрна}</g>
      <path d="M${ф1(x-30*к)} ${ф1(y-22*к)} Q${ф1(x-28*к)} ${ф1(y-8*к)} ${ф1(x-16*к)} ${ф1(y-5*к)}" stroke="#fff" stroke-width="${ф1(2.2*к)}" fill="none" opacity=".7"/></g>`; };
  const пестик = (x,y,к) => `<path d="M${x} ${y} L${ф1(x+18*к)} ${ф1(y-44*к)}" stroke="url(#c123-фарфорП)" stroke-width="${ф1(7*к)}" stroke-linecap="round"/>
      <ellipse cx="${x-1}" cy="${y+1}" rx="${ф1(7*к)}" ry="${ф1(4.4*к)}" fill="#efede6" stroke="#b8b4a8" stroke-width=".6"/><path d="M${ф1(x+15*к)} ${ф1(y-38*к)} L${ф1(x+8*к)} ${ф1(y-20*к)}" stroke="#fff" stroke-width="${ф1(1.4*к)}" opacity=".7"/>`;

  /* 2. Соединение: железо + сера — всё руками */
  function F2(s){
    const Н=300, y0=262, Л=L_(), эт=s.эт2||0, fe=!!s.fe2, su=!!s.s2, сч=s.сч2||0, в=s.ответ2, ок=!!s.дело_соединение, отз=s.отз2;
    ЦЕЛИ={}; let пр='', поверх='', текст='', запасная='';
    const мх=168, мy=y0+10, мЗона={x:мх,y:мy-34,r:52};
    if(эт===0){
      пр = ступкаИ(мх,мy,1.35,fe,su,сч) + Л.весы(300,y0+12,64,{показ:fe&&su?'0.0':'11.0'});
      if(!fe){ ЦЕЛИ.fe={зоны:[{...мЗона,что:()=>{ S().fe2=true; S().отз2=null; ПЕРЕРИС(); }}]}; поверх+=тащ_('fe',44,y0-12,банкаП(44,y0+10,32,44,['#4a5058','#6a737d','#2a2f35'],'Fe','железо 7 г'),44,58)+стрелка_(44,y0-40,мх-20,мy-46); }
      else if(!su){ ЦЕЛИ.su={зоны:[{...мЗона,что:()=>{ S().s2=true; ПЕРЕРИС(); }}]}; поверх+=тащ_('su',44,y0-12,банкаП(44,y0+10,32,44,['#e8c020','#f2d22a','#ffe86a'],'S','сера 4 г'),44,58)+стрелка_(44,y0-40,мх-20,мy-46); }
      else if(сч<3){
        ЦЕЛИ.пест={зоны:[мЗона],тереть:(путь,svg)=>{ const n=Math.min(3,Math.floor(путь/110)); if(n!==S().сч2){ S().сч2=n; const t0=svg.querySelector('#c123-тер'); if(t0) t0.textContent='растирание: '+n+' из 3'; } },отпустить:()=>{ ПЕРЕРИС(); }};
        поверх+=тащ_('пест',262,y0-30,пестик(262,y0-10,1.3),56,70)+стрелка_(262,y0-70,мх+6,мy-40)+`<text id="c123-тер" x="168" y="${y0-150}" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffd76a" font-family="${ШР}">растирание: ${сч} из 3</text>`;
      }
      поверх += цель_(fe&&su?'пест':fe?'su':'fe',0,мЗона.x,мЗона.y,30,!fe?'перетащи банку с железом':!su?'теперь банку с серой':сч<3?'три пестиком по ступке':'') + журналЛист(14,34,104,['Опыт 1','Fe — 7 г','S — 4 г','растереть ×3']);
      текст = !fe?'Перетащи <b>банку с железом</b> к ступке — опилки высыплются.':!su?'Теперь перетащи <b>банку с серой</b>.':сч<3?'Возьми <b>пестик</b> и потри им по ступке взад-вперёд, пока смесь не станет однородной.':'Смесь однородная. Это ещё <b>смесь</b>: железо и сера в ней прежние.';
      if(fe&&su&&сч>=3) запасная = `<div class="ask">${BTN(4,'','Проверить смесь магнитом →',"r123эт2(1)")}</div>`;
      else запасная = `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за2()")}</div>`;
    } else if(эт===1){
      пр = ступкаИ(мх,мy,1.35,true,true,3);
      if(!s.магн2){ ЦЕЛИ.маг={зоны:[{...мЗона,что:()=>{ S().магн2=true; ПЕРЕРИС(); }}]}; поверх+=тащ_('маг',292,60,магнит(292,60,1,false,0),52,64)+стрелка_(292,96,мх+10,мy-60)+цель_('маг',0,мЗона.x,мЗона.y,30,'поднеси магнит к смеси'); }
      else поверх+=магнит(мх,мy-96,1.2,true,0)+метка(168,8,'железо в смеси сохранило свойства — его тянет магнит',ЗЕ,{кегль:9});
      текст = s.магн2?'Опилки повисли на магните: в смеси железо осталось железом.':'Перетащи <b>магнит</b> к ступке.';
      запасная = s.магн2 ? `<div class="ask">${BTN(4,'','Пересыпать в пробирку →',"r123эт2(2)")}</div>` : `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за2()")}</div>`;
    } else if(эт===2){
      const вЛапке=!!s.лапка2, лампа=!!s.лампа2, нагрев=!!s.нагр2;
      const слой = `<rect x="-6" y="-34" width="12" height="34" fill="url(#c123-смесьFeS)"/>` + (нагрев?`<rect x="-6" y="-34" width="12" height="34" fill="#1a1a1c" opacity="0">${ДВ()?`<animate attributeName="opacity" values="0;0;1" keyTimes="0;.3;1" dur="3.4s" fill="freeze"/>`:''}</rect>`:'');
      пр = тяга(18,10,322,y0+10) + штативД(56,y0+10,84,138,160) + (лампа?Л.спиртовка(208,y0+10,1.05,нагрев):'');
      if(!вЛапке){ ЦЕЛИ.пр={зоны:[{x:186,y:y0-90,r:42,что:()=>{ S().лапка2=true; ПЕРЕРИС(); }}]};
        поверх += тащ_('пр',262,y0-6,`<g transform="translate(262 ${y0+4}) rotate(-78) translate(-262 ${-y0-4})">${пробиркаН(262,y0+4,0,90,слой,{})}</g>`,96,30) + стрелка_(262,y0-20,186,y0-90) + цель_('пр',0,186,y0-90,30,'вставь пробирку в лапку'); }
      else поверх += пробиркаН(204,y0-50,-25,96,слой,{раскал:нагрев,бежит:true,длСлоя:34,фронт:0}) + (нагрев?`<circle cx="198" cy="${y0-60}" r="22" fill="url(#c123-свечение)">${ДВ()?`<animate attributeName="r" values="14;26;20" dur="1.6s" repeatCount="indefinite"/>`:''}</circle>`:'');
      if(вЛапке&&!лампа){ ЦЕЛИ.лам={зоны:[{x:208,y:y0-14,r:34,что:()=>{ S().лампа2=true; ПЕРЕРИС(); }}]};
        поверх += тащ_('лам',100,y0-14,Л.спиртовка(100,y0+10,1.05,false),46,52) + стрелка_(100,y0-40,208,y0-24) + цель_('лам',0,208,y0-14,26,'спиртовку — под пробирку'); }
      if(лампа&&!нагрев) поверх += кнопкаНаРисунке(208,y0-24,14,'r123нагреть()','нажми — зажечь');
      поверх += метка(250,92,нагрев?'смесь раскалилась и светится сама':'опыт — под тягой',нагрев?ЗЛ:'#6a7480',{кегль:10});
      текст = !вЛапке?'Перетащи <b>пробирку со смесью</b> в лапку штатива.':!лампа?'Подвинь <b>спиртовку</b> под дно пробирки.':!нагрев?'Нажми на фитиль — <b>зажги спиртовку</b>.':'Раскалённая волна сама бежит по смеси: реакция идёт <b>с выделением тепла</b>.';
      запасная = нагрев ? '' : `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за2()")}</div>`;
    } else {
      пр = `<rect x="128" y="${y0-4}" width="80" height="14" rx="2" fill="#f4f2ec"/>` + крупинки(168,y0-1,32,4,90,['#1a1a1c','#2e2e30','#3a3638','#0e0e10'],15) + Л.часовое(168,y0+10,96,'уголь',0) + журналЛист(14,92,100,['Вывод','не тянет магнит','не жёлтая','= новое вещество FeS'],{поворот:2});
      if(!s.магн3){ ЦЕЛИ.маг2={зоны:[{x:168,y:y0-20,r:44,что:()=>{ S().магн3=true; ПЕРЕРИС(); }}]}; поверх+=тащ_('маг2',292,60,магнит(292,60,1,false,0),52,64)+стрелка_(292,96,178,y0-50)+цель_('маг2',0,168,y0-20,30,'поднеси магнит к продукту'); }
      else поверх += `<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;-3 0;3 0;0 0" dur=".35s" repeatCount="3"/>`:''}${магнит(168,y0-92,1.2,false,0)}</g>` + метка(168,8,'магнит больше не тянет — это новое вещество FeS',КР,{кегль:9}) + микро(278,96,50,[['Fe²⁺',3],['S²⁻',3]],3);
      текст = s.магн3?'Чёрная пористая масса — <b>сульфид железа FeS</b>: магнит её не берёт. <b>Fe + S → FeS</b>.':'Смесь остыла. Перетащи <b>магнит</b> к продукту.';
      запасная = s.магн3 ? ОТВЕТЫ('пара',ТИПЫ,0,в,2) : `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за2()")}</div>`;
    }
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Соединение: железо и сера') +
      `<div class="pic тёмная" data-noswipe>${свгК(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(3,'карт задача','<span class="метка">Опыт · этап '+(эт+1)+' из 4</span><div class="текст">'+текст+'</div>') + запасная +
      (эт===3&&s.магн3 ? (в==null ? СКАЗ('Вопрос','Fe + S → FeS. Какой это тип реакции?') : РАЗБОР(в===0,в===0?'Верно: из двух простых веществ получилось одно сложное — <b>соединение</b>.':'Посчитай: слева два вещества, справа одно. Это <b>соединение</b>.')) : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок ? ТЕОРИЯ('реакция соединения','<b>Реакция соединения</b> — из двух или нескольких веществ образуется одно сложное: A + B → AB. Fe + S → FeS, 2Mg + O₂ → 2MgO, CaO + H₂O → Ca(OH)₂.') +
        ДИВО('Смесь железа с серой можно разделить магнитом или водой (сера всплывает), а сульфид железа — уже нет. Так химики отличают смесь от нового вещества.') : '');
  }
  Object.assign(ЦВ_ИОН, {'S²⁻':['#fff6a8','#e8c020','#6a5000']});

  /* 3. Разложение малахита: спиртовку под пробирку — нагрев идёт сам; потом убрать в правильном порядке */
  function сцена3(s){
    const Н=300, y0=258, Л=L_(), t=s.t3||0, лампа=!!s.лампа3, вода=!s.вода3убрана, д=Math.min(1,t/8), Сн=t>0.5?Math.min(9,Math.round(t*1.2)):0, газ=лампа&&t>0.6&&t<10&&вода;
    const цвПорошка = смесьЦв('#2a9a5a','#1c1c1e',д), муть=Math.min(1,Math.max(0,(t-1)/6)), засос=!!s.засос3;
    const слой = `<rect x="-6" y="-30" width="12" height="30" fill="${цвПорошка}"/>` + крупинки(0,-15,5,13,40,[смесьЦв('#5ac88a','#3a3a3c',д),смесьЦв('#1a6a3a','#0e0e10',д)],17) + (засос?`<rect x="-6" y="-60" width="12" height="60" fill="rgba(220,235,245,.6)"/>`:'');
    const безоп = лампа&&t>=10&&!s.безоп3;
    const пр = штативД(30,y0+10,120,214,152) + (лампа&&!безоп?Л.спиртовка(104,y0+10,1,t<10):'') + малахит(206,y0+8,20);
    const трубка = вода ? `M194 ${y0-38} Q228 ${y0-92} 262 ${y0-92} Q290 ${y0-92} 290 ${y0-70} V${y0-30}` : `M194 ${y0-38} Q228 ${y0-92} 262 ${y0-92} Q290 ${y0-92} 290 ${y0-70} V${y0-58}`;
    const известьРис = (x) => Л.пробирка(x,y0+10,1.1,{уровень:.6,цвет:`rgba(${Math.round(230-20*муть)},${Math.round(236-10*муть)},${Math.round(240-6*муть)},${(.35+муть*.55).toFixed(2)})`}) + `<rect x="${x-22}" y="${y0+4}" width="44" height="8" rx="2" fill="url(#рл-древесина)"/>`;
    const известь = безоп ? '' : известьРис(вода?290:318);
    let поверх = пробиркаН(88,y0-58,100,104,слой,{капли:Сн,пробка:true}) +
      `<path d="${трубка}" stroke="#8fa8b8" stroke-width="4.5" fill="none" opacity=".75"/><path d="${трубка}" stroke="#fff" stroke-width="1.2" fill="none" opacity=".55"/>` +
      (газ&&ДВ()?[0,1,2,3,4].map(k=>`<circle cx="${290+(k%3-1)*2.5}" cy="${y0-30}" r="${1.3+(k%3)*0.6}" fill="none" stroke="#fff" stroke-width=".8"><animate attributeName="cy" values="${y0-30};${y0-82}" dur="${(1+k*0.25).toFixed(2)}s" begin="${(k*0.3).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="${(1+k*0.25).toFixed(2)}s" begin="${(k*0.3).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join(''):'') +
      `<g transform="translate(14 16)"><rect width="118" height="78" rx="6" fill="rgba(10,12,16,.84)" stroke="#3a4048"/>${тА(59,13,'продукты',8.5,'#c8ced6')}
        ${[['чёрный CuO',д>0.95],['капли H₂O',Сн>=4],['CO₂: вода мутнеет',муть>0.6]].map(([t0,есть],j)=>`<circle cx="12" cy="${28+j*17}" r="5" fill="${есть?'#3a9a5a':'none'}" stroke="${есть?'#8fd1a8':'#5a636d'}"/>${есть?тА(12,31+j*17,'✓',7,'#fff'):''}`+тА(22,31+j*17,t0,8,есть?'#eef2f6':'#7a838d','start')).join('')}</g>` +
      метка(232,8,'нагрев: '+ок1(t)+' мин',ЗЛ,{кегль:10}) + тА(290,y0+30,'известковая вода',7.5,'#c8ced6') + тА(206,y0+30,'минерал',7.5,'#c8ced6');
    ЦЕЛИ={};
    if(!лампа){ ЦЕЛИ.лам3={зоны:[{x:104,y:y0-16,r:34,что:()=>{ S().лампа3=true; S().засос3=false; S().отз3=null; ПЕРЕРИС(); запустить('t3',10,0.5,350,2,(s0)=>{ const pic=document.getElementById('c123-ж-t3'); if(pic) pic.innerHTML=свгК(сцена3(s0),300); }); }}]};
      поверх += тащ_('лам3',150,y0-16,Л.спиртовка(150,y0+10,1,false),46,52) + стрелка_(150,y0-44,104,y0-26) + цель_('лам3',0,104,y0-16,26,'спиртовку — под малахит'); }
    if(лампа&&t>=10&&!s.безоп3){
      ЦЕЛИ.изв={зоны:[{далеко:44,что:()=>{ const s0=S(); s0.вода3убрана=true; if(s0.лампа3убрана){} s0.отз3=null; ПЕРЕРИС(); }}]};
      ЦЕЛИ.лам3б={зоны:[{далеко:44,что:()=>{ const s0=S(); if(!s0.вода3убрана){ s0.засос3=true; s0.отз3={ок:false,т:'Ой! Спиртовку убрали раньше трубки: пробирка остыла и втянула холодную известковую воду — горячее стекло может лопнуть. Начнём заново: сначала вынимают трубку из воды.'}; s0.лампа3=false; s0.t3=0; s0.вода3убрана=false; }
        else { s0.безоп3=true; s0.отз3={ок:true,т:'Правильно: сначала трубку из воды, потом гасим спиртовку.'}; } ПЕРЕРИС(); }}]};
      поверх += (вода ? тащ_('изв',290,y0-40,известьРис(290),44,110) : известьРис(318));
      поверх += тащ_('лам3б',104,y0-16,Л.спиртовка(104,y0+10,1,true),50,52) +
        метка(168,40,вода?'опыт окончен — что убрать первым? перетащи':'теперь можно убрать спиртовку',КР,{кегль:9});
    }
    return сцена(Н,y0,пр,поверх+известь);
  }
  function F3(s){
    const t=s.t3||0, в=s.ответ3, ок=!!s.дело_разложение, отз=s.отз3;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Разложение: малахит') +
      `<div class="pic тёмная" id="c123-ж-t3" data-noswipe>${свгК(сцена3(s),300)}</div>` +
      A(3,'карт задача','<span class="метка">Опыт</span><div class="текст">'+(!s.лампа3?'Перетащи <b>спиртовку</b> под пробирку с зелёным малахитом. Пробирка закреплена <b>отверстием чуть вниз</b> — чтобы капли воды не стекли на горячее дно.':t<10?'Идёт нагрев: смотри, как порошок чернеет, у отверстия собираются капли, а известковая вода мутнеет.':!s.безоп3?'Опыт окончен. Что убрать первым — <b>стакан с известковой водой</b> (то есть вынуть из неё трубку) или <b>спиртовку</b>? Перетащи.':'Все три продукта на месте.')+'</div>') +
      (!s.безоп3 ? `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за3()")}</div>` : '') +
      (s.безоп3 ? ОТВЕТЫ('три',['1','2','3'],2,в,3) + (в==null ? СКАЗ('Вопрос','Из одного вещества — малахита — сколько веществ получилось?') :
          РАЗБОР(в===2,в===2?'Верно: CuO, вода и углекислый газ. Из одного — три: это <b>разложение</b>.':'Посмотри в табличку: чёрный CuO, капли воды и CO₂ — <b>три</b> продукта.')) : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок ? ТЕОРИЯ('реакция разложения','<b>Реакция разложения</b> — из одного сложного вещества образуется несколько: AB → A + B. (CuOH)₂CO₃ → 2CuO + H₂O + CO₂. Разложение обычно идёт при нагревании или под током.') : '');
  }

  /* 4. Замещение: опусти гвоздь — время идёт само */
  function сцена4(s){
    const Н=292, y0=252, Л=L_(), t=s.t4||0, вСтакане=!!s.гвоздь4, д=Math.min(1,t/20), цв=смесьЦв('#3a8ae0','#8ac8a0',д);
    const пр = Л.стакан(118,y0+10,110,140,{уровень:.8,цвет:ргба(цв,.62+0.1*(1-д)),объём:250,осадок:Math.round(д*4)}) + Л.часовое(32,y0+10,52,'песок',0) + капельница(214,y0+10,1,'#3a7ad8','CuSO₄') + таймер(290,y0-26,24,t,30);
    let поверх = `<rect x="52" y="${y0-150}" width="136" height="5" rx="2.5" fill="url(#рл-стекло)" stroke="#a8c4d4" stroke-width=".6"/>` +
      микроЗам(270,96,56,д) + тА(266,24,'у поверхности гвоздя',8.5,'#9aa3ad') + метка(118,8,'прошло: '+t+' мин',ЗЛ,{кегль:10}) + тА(118,y0+28,'раствор CuSO₄',7.5,'#c8ced6');
    ЦЕЛИ={};
    if(!вСтакане){ ЦЕЛИ.гв={зоны:[{x:118,y:y0-80,r:52,что:()=>{ S().гвоздь4=true; ПЕРЕРИС(); запустить('t4',30,1,330,3,(s0)=>{ const pic=document.getElementById('c123-ж-t4'); if(pic) pic.innerHTML=свгК(сцена4(s0),292); }); }}]};
      поверх += тащ_('гв',32,y0-8,гвоздь(32,y0+4,42,0,-84),60,24) + стрелка_(32,y0-30,118,y0-110) + цель_('гв',0,118,y0-80,34,'опусти гвоздь в раствор') + тА(32,y0+28,'гвоздь',7.5,'#c8ced6'); }
    else поверх += `<path d="M118 ${y0-147} V${y0-94}" stroke="#d8d0b8" stroke-width="1"/>` + гвоздь(118,y0-94,76,д,0) +
      (t>0&&t<30&&ДВ()?[0,1,2].map(k=>`<circle cx="${118+(k-1)*6}" cy="${y0-60}" r="1.2" fill="#ffb07a"><animate attributeName="cy" values="${y0-90+k*14};${y0-6}" dur="${(3+k).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join(''):'');
    return сцена(Н,y0,пр,поверх);
  }
  function F4(s){
    const t=s.t4||0, в=s.ответ4, ок=!!s.дело_замещение;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Замещение: гвоздь в купоросе') +
      `<div class="pic тёмная" id="c123-ж-t4" data-noswipe>${свгК(сцена4(s),292)}</div>` +
      A(3,'карт задача','<span class="метка">Опыт</span><div class="текст">'+(!s.гвоздь4?'Перетащи <b>железный гвоздь</b> в стакан с голубым раствором медного купороса.':t<30?'Таймер пошёл: смотри на гвоздь, на цвет раствора и в микромир.':'Прошло 30 минут.')+'</div>') +
      (!s.гвоздь4 ? `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за4()")}</div>` : '') +
      (t>=20 ? ОТВЕТЫ('',['железо вытеснило медь из раствора','медь вытеснила железо из гвоздя','вода вытеснила медь'],0,в,4) + (в==null ? СКАЗ('Вопрос','Что произошло?') :
          РАЗБОР(в===0,в===0?'Верно: Fe + CuSO₄ → FeSO₄ + Cu. Атомы железа уходят в раствор ионами Fe²⁺, ионы Cu²⁺ садятся на гвоздь медью — раствор бледнеет.':'Посмотри в микромир: на гвозде растёт <b>медь</b>, а в раствор уходят ионы <b>железа</b>. Железо вытеснило медь.')) : '') +
      (ок ? ТЕОРИЯ('реакция замещения','<b>Реакция замещения</b> — простое вещество вытесняет элемент из сложного: A + BC → AC + B. Более активный металл вытесняет менее активный: Fe + CuSO₄ → FeSO₄ + Cu; Zn + 2HCl → ZnCl₂ + H₂.') +
        ДИВО('Так в XVI–XVII веках добывали «цементную медь»: в рудничную воду с медным купоросом бросали железный лом — и через несколько дней снимали с него медь.') : '');
  }

  /* 5. Обмен: пипетку — над стаканом, жми грушу, включай фонарик */
  function F5(s){
    const Н=292, y0=252, Л=L_(), к=Math.min(4,s.кап5||0), в=s.ответ5, ок=!!s.дело_обмен, над=!!s.пип5, свет=!!s.свет5;
    const пр = Л.стакан(118,y0+10,96,124,{уровень:.5,цвет:к?`rgba(236,240,244,${(.35+к*.12).toFixed(2)})`:'rgba(220,235,245,.35)',объём:250,муть:к?к*14:0,мутьЦвет:['#ffffff','#f0f2f4','#dfe2e6']}) +
      капельница(244,y0+10,1.1,'#f0f0f0','AgNO₃') + банкаП(212,y0+10,28,38,['#e8ecf0','#ffffff','#d8dde2'],'NaCl');
    ЦЕЛИ={};
    let поверх = (свет?фонарик(34,y0-30,30,к/4,74,172,y0-30):`<g>${фонарик(34,y0-30,30,0,0,0,0).replace(/<path[^>]*url\(#c123-луч\)[^>]*\/>/,'')}</g>`) +
      кнопкаНаРисунке(22,y0-30,16,'r123свет()',свет?'':'включи фонарик') +
      (к?`<g>${творог(118,y0+4,70,к/4)}</g>`:'') +
      микро(270,98,56,к?[['Na⁺',3],['NO₃⁻',3],['Ag⁺',Math.max(0,3-к)],['Cl⁻',Math.max(0,3-к)]].filter(x=>x[1]>0):[['Na⁺',3],['Cl⁻',3]],5) +
      (к?`<g transform="translate(270 140)">${[0,1,2].slice(0,Math.min(3,к)).map(j=>`<g transform="translate(${(j-1)*16} 0)">${сфера(-4,0,5,'c123-атAg')}${сфера(4,0,5.5,'c123-атCl')}</g>`).join('')}</g>`+тА(270,166,'AgCl — в осадок',8,'#eef2f6'):'') +
      тА(270,22,'микромир раствора',8.5,'#9aa3ad') + метка(118,8,к?'капель AgNO₃: '+к:'раствор NaCl — прозрачный',ЗЛ,{кегль:10}) +
      (свет?(к?метка(118,y0-84,'луч виден — в растворе взвесь',ЗЕ,{кегль:8}):метка(118,y0-84,'луч не виден — раствор прозрачный','#6a7480',{кегль:8})):'');
    if(!над){ ЦЕЛИ.пип={зоны:[{x:118,y:y0-150,r:40,что:()=>{ S().пип5=true; ПЕРЕРИС(); }}]};
      поверх += тащ_('пип',244,y0-60,Л.пипетка(244,y0-34,1,false),26,90) + стрелка_(244,y0-100,118,y0-150) + цель_('пип',0,118,y0-150,28,'пипетку — над стаканом'); }
    else { поверх += Л.пипетка(118,y0-120,1.1,к<4) + (к<4?кнопкаНаРисунке(118,y0-190,12,'r123капля()','жми на грушу'):'') +
      (к&&ДВ()?`<circle cx="118" cy="${y0-118}" r="2.6" fill="#f0f0f0"><animate attributeName="cy" values="${y0-118};${y0-62}" dur=".9s" repeatCount="1" fill="freeze"/><animate attributeName="opacity" values="1;0" dur=".9s" fill="freeze"/></circle>`:''); }
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Обмен: белый осадок') +
      `<div class="pic тёмная" data-noswipe>${свгК(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(3,'карт задача','<span class="метка">Опыт</span><div class="текст">'+(!над?'Перетащи <b>пипетку</b> с раствором нитрата серебра и держи её над стаканом с солью.':к<3?'Нажимай на красную <b>грушу</b> пипетки — капай. Включи <b>фонарик</b> слева и посмотри, виден ли луч.':'В растворе белый творожистый осадок.')+'</div>') +
      (к<3 ? `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за5()")}</div>` : '') +
      (к<3 ? '' : ОТВЕТЫ('три',['Ag⁺ и Cl⁻','Na⁺ и NO₃⁻','Na⁺ и Cl⁻'],0,в,5) + (в==null ? СКАЗ('Вопрос','Какие ионы встретились и выпали в белый творожистый осадок?') :
          РАЗБОР(в===0,в===0?'Верно: Ag⁺ + Cl⁻ → AgCl↓. Ионы Na⁺ и NO₃⁻ остались в растворе. AgNO₃ + NaCl → AgCl↓ + NaNO₃ — два сложных вещества обменялись частями: <b>обмен</b>.':'Посмотри в микромир: в осадке — серебро и хлор, AgCl. Na⁺ и NO₃⁻ так и плавают в растворе.'))) +
      (ок ? ТЕОРИЯ('реакция обмена','<b>Реакция обмена</b> — два сложных вещества обмениваются составными частями: AB + CD → AD + CB. Обмен в растворе идёт до конца, если выпадает осадок, выделяется газ или образуется вода.') +
        ДИВО('Эту реакцию используют, чтобы найти хлор в воде: если от капли нитрата серебра проба мутнеет, в воде есть хлорид-ионы.') : '');
  }

  /* 6. Сортировщик: перетащи карточку уравнения в нужную корзину */
  function F6(s){
    const Н=306, y0=292, n=Math.min(s.у6||0,УРАВНЕНИЯ.length-1), У=УРАВНЕНИЯ[n], ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=УРАВНЕНИЯ.length;
    const ЦВ=['#c8a04a','#3aa86a','#e8885a','#c8ccd4'], кол=(i)=>УРАВНЕНИЯ.filter((x,k)=>k<готовых&&x.т===i).length, xs=[48,128,208,288];
    ЦЕЛИ={};
    let тело = фон(Н,y0) + `<path d="M30 12 H306 L280 112 H56 Z" fill="url(#c123-корпусФ)" stroke="#6a737d" stroke-width="1.2"/><path d="M34 15 H302" stroke="#fff" stroke-opacity=".2"/>` +
      [0,1,2,3,4,5].map(i=>`<circle cx="${46+i*49}" cy="104" r="1.6" fill="#8a929c"/>`).join('') + `<path d="M150 112 H186 L180 140 H156 Z" fill="#2a3038" stroke="#5a636d"/>`;
    xs.forEach((x,i)=>{ const выбор=ок&&У.т===i;
      тело += `<path d="M168 140 Q${(168+x)/2} 150 ${x} 170" stroke="${выбор?ЦВ[i]:'#3a4048'}" stroke-width="${выбор?3:2}" fill="none" stroke-dasharray="${выбор?'':'4 3'}"/>` +
        `<g data-зона="карта-${i}" class="зона"><rect x="${x-30}" y="172" width="60" height="${y0-172}" rx="6" fill="rgba(200,225,240,.08)" stroke="${выбор?ЦВ[i]:'#8fa8b8'}" stroke-opacity="${выбор?1:.5}" stroke-width="${выбор?2:1}"/></g>` +
        `<rect x="${x-27}" y="176" width="3" height="${y0-180}" rx="1.5" fill="#fff" opacity=".35"/>` +
        Array.from({length:кол(i)},(_,k)=>`<g>${выбор&&k===кол(i)-1&&ДВ()?`<animateTransform attributeName="transform" type="translate" from="${168-x} -100" to="0 0" dur=".7s" fill="freeze" calcMode="spline" keyTimes="0;1" keySplines="0.5 0 0.9 0.6"/>`:''}<ellipse cx="${x+(k%2?9:-9)}" cy="${y0-9-Math.floor(k/2)*12}" rx="10" ry="5.5" fill="${ЦВ[i]}" stroke="#14171b" stroke-width=".8"/><ellipse cx="${x+(k%2?9:-9)-3}" cy="${y0-11-Math.floor(k/2)*12}" rx="4" ry="1.6" fill="#fff" opacity=".45"/></g>`).join('') +
        тА(x,188,ТИПЫ[i],8.5,'#eef2f6') + `<g transform="translate(${x} 204) scale(.34) translate(${-x} -204)">${схемаТипа(x,204,i)}</g>` + тА(x,y0-62,кол(i)||'',16,ЦВ[i]); });
    if(!ок){ ЦЕЛИ.карта={зоны:xs.map((x,i)=>({x:x,y:230,r:40,что:()=>window.r123тип(i)}))};
      тело += тащ_('карта',168,55,карточкаУр(44,26,248,58,У.у,У.у.length>26?14:17),248,64) + метка(168,92,'перетащи карточку в корзину · '+(n+1)+' из 10',ЗЛ,{кегль:9}); }
    else тело += карточкаУр(44,26,248,58,У.у,У.у.length>26?14:17) + метка(168,92,'слева '+У.сл+' · справа '+У.сп,ЗЕ,{кегль:9});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Сортировщик реакций') +
      `<div class="pic тёмная" data-noswipe>${свгК(тело,Н)}</div>` +
      ТОЧКИ(УРАВНЕНИЯ.length,все?-1:n,готовых) +
      (ок ? '' : `<div class="ask пара мелко">${ТИПЫ.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r123тип("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее уравнение →',"r123удальше()")}</div>` : '') +
      (все ? ПРАВИЛО('Считай вещества: одно → несколько — разложение; несколько → одно — соединение; простое + сложное — замещение; два сложных — обмен.') : '');
  }

  /* 6½. Ещё четыре опыта — по одному на каждый тип */
  const ОПЫТЫ7 = [
    {т:0, имя:'Горение магния',        ур:'2Mg + O₂ → 2MgO',                  итог:'Ослепительная белая вспышка, остаётся белый порошок — оксид магния MgO. Из двух веществ — одно.'},
    {т:1, имя:'Перекись и MnO₂',        ур:'2H₂O₂ → 2H₂O + O₂↑',               итог:'Бурная пена; тлеющая лучинка вспыхнула — это кислород. Из одного вещества — два; MnO₂ — катализатор, он не расходуется.'},
    {т:2, имя:'Цинк в кислоте',         ур:'Zn + 2HCl → ZnCl₂ + H₂↑',          итог:'Цинк покрылся пузырьками водорода, у горящей лучинки — хлопок. Цинк вытеснил водород из кислоты.'},
    {т:3, имя:'Купорос и щёлочь',       ур:'CuSO₄ + 2NaOH → Cu(OH)₂↓ + Na₂SO₄', итог:'Выпал голубой студенистый осадок Cu(OH)₂. Два сложных вещества обменялись частями.'}
  ];
  function F7о(s){
    const Н=300, y0=258, Л=L_(), к=s.оп7==null?0:s.оп7, О=ОПЫТЫ7[к], ф=(s.ф7||{})[к]||0, гот=s.гот7||{}, отв=s['ответ'+(70+к)];
    const фаза=(n)=>{ const s0=S(), f0=Object.assign({},s0.ф7||{}); f0[к]=n; s0.ф7=f0; };
    ЦЕЛИ={}; let пр='', поверх='', текст='';
    if(к===0){ /* горение магния */
      const горит=ф===1, зола=ф>=2;
      пр = Л.спиртовка(184,y0+10,1.1,true) + `<rect x="236" y="${y0-2}" width="70" height="12" rx="2" fill="#f4f2ec"/>` + (зола?крупинки(270,y0+2,24,3,50,['#ffffff','#e8e8e2','#dcdcd4'],21):'') + Л.очки(60,y0+12,0.9);
      if(ф===0){ ЦЕЛИ.mg={зоны:[{x:184,y:y0-70,r:36,что:()=>{ фаза(1); ПЕРЕРИС(); setTimeout(()=>{ if(LV.id===ID&&LV.step===6&&(S().оп7||0)===0&&((S().ф7||{})[0]||0)===1){ фаза(2); ПЕРЕРИС(); } },2600); }}]};
        поверх += тащ_('mg',66,y0-70,Л.щипцы(40,y0-56,-8,{}),90,40) + стрелка_(90,y0-90,180,y0-80) + цель_('mg',0,184,y0-70,26,'ленту — в пламя'); }
      else поверх += Л.щипцы(150,y0-96,14,{горит:горит,зола:зола}) + (горит?`<circle cx="190" cy="${y0-84}" r="70" fill="#fff" opacity=".35">${ДВ()?`<animate attributeName="opacity" values=".15;.55;.2;.5" dur=".3s" repeatCount="indefinite"/>`:''}</circle>`+метка(168,8,'не смотри прямо на вспышку!',КР,{кегль:10}):'');
      текст = ф===0?'Магниевая лента зажата в тигельных щипцах. Перетащи её <b>в пламя</b> спиртовки.':горит?'Магний горит ослепительно белым пламенем — смотреть прямо нельзя.':О.итог;
    } else if(к===1){ /* перекись + MnO2 */
      const пена=ф>=1, вспых=ф>=2;
      пр = Л.колба(168,y0+10,1.15,{уровень:.32,цвет:пена?'rgba(240,244,248,.75)':'rgba(220,235,245,.4)',пузырьки:пена}) + банкаП(276,y0+10,32,44,['#1c1c1e','#2e2e30','#0e0e10'],'MnO₂');
      if(пена) поверх += Array.from({length:22},(_,i)=>`<circle cx="${ф1(168+(слч(i+3)-0.5)*22)}" cy="${ф1(y0-60-слч(i+7)*(вспых?30:44))}" r="${ф1(2+слч(i)*3)}" fill="#f8fafc" opacity=".9">${ДВ()?`<animate attributeName="cy" values="${ф1(y0-40)};${ф1(y0-70-слч(i+7)*40)}" dur="${(1+слч(i+9)).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>`).join('');
      if(ф===0){ ЦЕЛИ.mn={зоны:[{x:168,y:y0-104,r:34,что:()=>{ фаза(1); ПЕРЕРИС(); }}]};
        поверх += тащ_('mn',60,y0-14,банкаП(60,y0+10,32,44,['#1c1c1e','#2e2e30','#0e0e10'],'MnO₂'),40,56) + стрелка_(60,y0-44,160,y0-110) + цель_('mn',0,168,y0-104,24,'щепотку MnO₂ — в колбу'); }
      else if(ф===1){ ЦЕЛИ.луч={зоны:[{x:168,y:y0-108,r:34,что:()=>{ фаза(2); ПЕРЕРИС(); }}]};
        поверх += тащ_('луч',290,y0-120,Л.лучинка(250,y0-120,0,'тлеет'),90,24) + стрелка_(260,y0-130,176,y0-120) + цель_('луч',0,168,y0-108,24,'тлеющую лучинку — к горлу'); }
      else поверх += Л.лучинка(172,y0-118,-10,'горит') + `<circle cx="172" cy="${y0-122}" r="26" fill="url(#c123-свечение)"/>` + метка(250,8,'лучинка вспыхнула — кислород!',ЗЕ,{кегль:10});
      текст = ф===0?'В колбе — пероксид водорода H₂O₂. Перетащи <b>банку с чёрным MnO₂</b> к горлу колбы.':ф===1?'Бурная пена — выделяется газ. Поднеси <b>тлеющую лучинку</b> к горлу колбы.':О.итог;
    } else if(к===2){ /* цинк в кислоте */
      const внутри=ф>=1, хлоп=ф>=2;
      пр = Л.штативПробирок(168,y0+12,48,[null,{цвет:'rgba(220,235,245,.42)',уровень:.55},null],1.1) + капельница(276,y0+10,1,'#dceaf4','HCl');
      if(внутри) поверх += [0,1,2].map(i=>`<ellipse cx="${164+i*5}" cy="${y0-10-i%2*3}" rx="3.4" ry="2.6" fill="#9aa3ad" stroke="#5a636d" stroke-width=".5"/>`).join('') + (ДВ()?Array.from({length:9},(_,k0)=>`<circle cx="${ф1(164+(k0%3)*5)}" cy="${y0-12}" r="${ф1(1+(k0%3)*0.4)}" fill="none" stroke="#fff" stroke-width=".7"><animate attributeName="cy" values="${y0-12};${y0-66}" dur="${(0.8+k0*0.12).toFixed(2)}s" begin="${(k0*0.15).toFixed(2)}s" repeatCount="indefinite"/></circle>`).join(''):'');
      if(ф===0){ ЦЕЛИ.zn={зоны:[{x:168,y:y0-94,r:32,что:()=>{ фаза(1); ПЕРЕРИС(); }}]};
        поверх += тащ_('zn',56,y0-6,Л.часовое(56,y0+10,44,'железо',0)+[0,1,2,3].map(i=>`<ellipse cx="${46+i*7}" cy="${y0+1-i%2*2}" rx="3.6" ry="2.8" fill="#9aa3ad" stroke="#5a636d" stroke-width=".6"/>`).join(''),50,24) + стрелка_(56,y0-30,160,y0-100) + цель_('zn',0,168,y0-94,22,'гранулы цинка — в пробирку'); }
      else if(ф===1){ ЦЕЛИ.огонь={зоны:[{x:168,y:y0-104,r:30,что:()=>{ фаза(2); ПЕРЕРИС(); }}]};
        поверх += тащ_('огонь',284,y0-130,Л.лучинка(244,y0-130,0,'горит'),90,24) + стрелка_(254,y0-140,176,y0-112) + цель_('огонь',0,168,y0-104,22,'горящую лучинку — к пробирке'); }
      else поверх += Л.лучинка(176,y0-110,-12,'горит') + Л.хлопок(168,y0-104,true) + метка(250,8,'хлопок — горит водород',ЗЕ,{кегль:10});
      текст = ф===0?'В пробирке соляная кислота. Перетащи <b>гранулы цинка</b> в пробирку.':ф===1?'Цинк «закипел» пузырьками газа. Поднеси <b>горящую лучинку</b> к отверстию.':О.итог;
    } else { /* купорос и щёлочь */
      const над=ф>=1, кап=Math.min(3,(s.кап7||0));
      пр = Л.штативПробирок(168,y0+12,48,[null,{цвет:'rgba(60,140,230,.72)',уровень:.55},null],1.1) + капельница(60,y0+10,1,'#f0f0f0','NaOH');
      if(кап) поверх += `<g>${Array.from({length:кап*8},(_,i)=>`<circle cx="${ф1(168+(слч(i+5)-0.5)*9)}" cy="${ф1(y0-8-слч(i+15)*кап*9)}" r="${ф1(1.6+слч(i)*1.6)}" fill="#5aa8f0" stroke="#2a6ab8" stroke-width=".4" opacity=".95"/>`).join('')}</g>`;
      if(ф===0){ ЦЕЛИ.пипN={зоны:[{x:168,y:y0-150,r:34,что:()=>{ фаза(1); ПЕРЕРИС(); }}]};
        поверх += тащ_('пипN',290,y0-56,L_().пипетка(290,y0-30,1,false),26,90) + стрелка_(290,y0-100,170,y0-150) + цель_('пипN',0,168,y0-150,24,'пипетку со щёлочью — над пробиркой'); }
      else { поверх += L_().пипетка(168,y0-112,1,кап<3) + (кап<3?кнопкаНаРисунке(168,y0-182,12,'r123кап7()','жми на грушу'):''); }
      текст = ф===0?'В пробирке голубой раствор медного купороса. Перетащи <b>пипетку со щёлочью</b> NaOH и держи над пробиркой.':кап<3?'Нажимай на <b>грушу</b> — капай щёлочь.':О.итог;
    }
    const готово = (к===0&&ф>=2)||(к===1&&ф>=2)||(к===2&&ф>=2)||(к===3&&(s.кап7||0)>=3);
    поверх += метка(168,30,О.имя+' · '+О.ур,гот[к]?ЗЕ:'#6a7480',{кегль:9});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 6','Ещё четыре опыта') +
      `<div class="ряд" data-anim style="--i:2;grid-template-columns:repeat(2,minmax(0,1fr))">${ОПЫТЫ7.map((x,i)=>BTN(2,(к===i?'вкл':'')+(гот[i]?' был':''),'<span style="font-size:14px">'+(гот[i]?'✓ ':'')+x.имя+'</span>','r123оп('+i+')')).join('')}</div>` +
      `<div class="pic тёмная" data-noswipe>${свгК(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(3,'карт задача','<span class="метка">Опыт '+(к+1)+' из 4 · '+О.имя+'</span><div class="текст">'+текст+'</div>') +
      (!готово ? `<div class="ask мелко">${BTN(5,'','сделать за меня',"r123за7()")}</div>` :
        ОТВЕТЫ('пара',ТИПЫ,О.т,отв,70+к) + (отв==null ? СКАЗ('Вопрос',О.ур+' — какой это тип реакции?') : РАЗБОР(отв===О.т,отв===О.т?'Верно: '+ТИПЫ[О.т]+' ('+СХЕМЫ[О.т]+').':'Посчитай вещества слева и справа и посмотри, простые они или сложные.'))) +
      (Object.keys(гот).length>=4 ? ПРАВИЛО('Четыре новых опыта — четыре типа. Всё сходится со схемами: '+СХЕМЫ.join(' · ')+'.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=352, ЦВ=['#c8a04a','#3aa86a','#e8885a','#c8ccd4'], УР=['Fe + S → FeS','(CuOH)₂CO₃ → 2CuO + H₂O + CO₂','Fe + CuSO₄ → FeSO₄ + Cu','AgNO₃ + NaCl → AgCl↓ + NaNO₃'];
    const тело = фон(Н,344) + [0,1,2,3].map(i=>{ const x=10+(i%2)*162, y=22+Math.floor(i/2)*172;
      return миниСцена(i,x,y,154,104,i+10) + метка(x+77,y-8,ТИПЫ[i],ЦВ[i],{кегль:9}) +
        `<g transform="translate(${x+77} ${y+120}) scale(.6) translate(${-x-77} ${-y-120})">${схемаТипа(x+77,y+120,i)}</g>` +
        `<text x="${x+77}" y="${y+144}" text-anchor="middle" font-size="${УР[i].length>22?7:8.5}" font-weight="bold" fill="#eef2f6" font-family="${ШР}">${esc(УР[i])}</text>`; }).join('');
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Четыре типа реакций') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Соединение</b>: несколько веществ → одно (Fe + S → FeS).<br>• <b>Разложение</b>: одно → несколько ((CuOH)₂CO₃ → 2CuO + H₂O + CO₂).<br>• <b>Замещение</b>: простое + сложное → новое простое + новое сложное (Fe + CuSO₄ → FeSO₄ + Cu).<br>• <b>Обмен</b>: два сложных меняются частями (AgNO₃ + NaCl → AgCl↓ + NaNO₃).</div>') +
      ПРАВИЛО('Тип реакции читают по уравнению: <b>сколько было — сколько стало</b>, простое или сложное.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=166, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = ступка(70,y0+10,0.8,3,false) + [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${гвоздь(232+i*26,y0-36,40,i===1?0.8:0,0)}</g>`).join('');
    const поверх = Л.имяПрибора(258,y0+22,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Типы реакций различаешь с первого взгляда.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r123заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r123мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты и схемы типов.')) : '')) +
      (все ? ПРАВИЛО('A+B→AB · AB→A+B · A+BC→AC+B · AB+CD→AD+CB') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'2Na + Cl₂ → 2NaCl — это…', варианты:[{т:'соединение',ок:true},{т:'разложение',ок:false}], разбор:'Два вещества → одно.' },
    { вопрос:'2HgO → 2Hg + O₂ — это…', варианты:[{т:'обмен',ок:false},{т:'разложение',ок:true}], разбор:'Одно → два.' },
    { вопрос:'Zn + CuCl₂ → ZnCl₂ + Cu — это…', варианты:[{т:'замещение',ок:true},{т:'обмен',ок:false}], разбор:'Простое вещество вытесняет медь.' },
    { вопрос:'KOH + HCl → KCl + H₂O — это…', варианты:[{т:'соединение',ок:false},{т:'обмен',ок:true}], разбор:'Два сложных меняются частями.' },
    { вопрос:'Что получится: Zn + CuSO₄ → ?', варианты:[{т:'ZnSO₄ + Cu',ок:true},{т:'ZnCu + SO₄',ок:false}], разбор:'Цинк вытесняет медь.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r123Reset()")}</div>` +
        ПРАВИЛО('Сколько было — сколько стало.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r123Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const Т = {
    т1:{ имя:'Тип по уравнению', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=150, отв=ст.ответ!=null;
        return свгЛ(фон(Н,150)+карточкаУр(22,18,292,58,з.у,з.у.length>26?13:16)+(отв?схемаТипа(168,108,з.т):тА(168,112,'схема появится после ответа',9,'#6a7480'))+серия(ст),Н); } },
    т2:{ имя:'Что получится', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=130, отв=ст.ответ!=null;
        return свгЛ(фон(Н,130)+карточкаУр(18,24,300,64,з.л+' '+(отв?з.ок:'?'),(з.л+' '+з.ок).length>28?13:16)+серия(ст),Н); } },
    т3:{ имя:'Схема — тип', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=130, отв=ст.ответ!=null;
        return свгЛ(фон(Н,130)+`<g transform="translate(168 58) scale(1.45) translate(-168 -58)">${схемаТипа(168,58,з.т)}</g>`+(отв?тА(168,110,ТИПЫ[з.т],13,GREEN):'')+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r123Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r123T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r123TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L123 = {
    id: ID, title: 'Типы химических реакций', ico: '🔀',
    src: 'Химия · 8–9 класс · Типы реакций', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Соединение: железо и сера.',
      'Разложение: малахит.',
      'Замещение: гвоздь в медном купоросе.',
      'Обмен: белый осадок.',
      'Сортировщик реакций.',
      'Ещё четыре опыта: магний, перекись, цинк, купорос.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: тип по уравнению.',
      'Тренажёр 2: что получится.',
      'Тренажёр 3: схема — тип.'
    ],
    check: { q: 'Какой тип реакции: CaCO₃ → CaO + CO₂?', choices: ['Соединение','Разложение','Замещение','Обмен'], ans: 1, exp: 'Одно вещество распадается на два — это разложение.' },
    tasks: [
      { q: 'Какой тип реакции: 2H₂ + O₂ → 2H₂O?', kind: 'choice', choices: ['Разложение','Соединение','Замещение','Обмен'], ans: 1, tol: 0, hints: ['Слева два вещества, справа одно.', 'Два вещества соединяются в одно.'], sol: 'Из двух веществ образуется одно — соединение.' },
      { q: 'Какой тип реакции: Fe + CuSO₄ → FeSO₄ + Cu?', kind: 'choice', choices: ['Соединение','Разложение','Замещение','Обмен'], ans: 2, tol: 0, hints: ['Железо вытесняет медь из её соли.', 'Один атом заменяет другой.'], sol: 'Железо замещает медь в CuSO₄ — это замещение.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L123.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7о,F7,F8,F9];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Соединение',3:'Разложение',4:'Замещение',5:'Обмен',6:'Сортировщик',7:'Ещё опыты',8:'Вывод',9:'Проверка',10:'Практика',
      11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l123n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Типы реакций'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  const ПЕРЕРИС = () => { try{ const a=document.activeElement; if(a&&a.type==='range') a.blur(); }catch(e){} chRender(0); };
  window.r123Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к;
    if(f===2&&к===0) s.дело_соединение=true;
    if(f===3&&к===2&&s.безоп3) s.дело_разложение=true;
    if(f===4&&к===0) s.дело_замещение=true;
    if(f===5&&к===0) s.дело_обмен=true;
    if(f>=70&&f<=73&&к===ОПЫТЫ7[f-70].т){ const г=Object.assign({},s.гот7||{}); г[f-70]=true; s.гот7=г; if(Object.keys(г).length>=4) s.дело_ещё=true; }
    ПЕРЕРИС(); };
  window.r123вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; ПЕРЕРИС(); };
  window.r123эт2=(k)=>{ const s=S(); const эт=s.эт2||0;
    if(k===1&&эт===0&&s.fe2&&s.s2&&(s.сч2||0)>=3){ s.эт2=1; s.магн2=false; }
    else if(k===2&&эт===1&&s.магн2){ s.эт2=2; s.лапка2=false; s.лампа2=false; s.нагр2=false; }
    else if(k===3&&эт===2&&s.нагр2){ s.эт2=3; s.магн3=false; }
    else return; s.отз2=null; ПЕРЕРИС(); };
  window.r123нагреть=()=>{ const s=S(); if((s.эт2||0)!==2||!s.лапка2||!s.лампа2||s.нагр2) return; s.нагр2=true; ПЕРЕРИС();
    setTimeout(()=>{ if(typeof LV!=='undefined'&&LV.id===ID&&LV.step===1&&S().эт2===2){ window.r123эт2(3); } },3800); };
  /* «сделать за меня»: следующий шаг текущего этапа */
  window.r123за2=()=>{ const s=S(), эт=s.эт2||0;
    if(эт===0){ if(!s.fe2) s.fe2=true; else if(!s.s2) s.s2=true; else if((s.сч2||0)<3) s.сч2=3; }
    else if(эт===1) s.магн2=true;
    else if(эт===2){ if(!s.лапка2) s.лапка2=true; else if(!s.лампа2) s.лампа2=true; else { window.r123нагреть(); return; } }
    else s.магн3=true;
    ПЕРЕРИС(); };
  window.r123за3=()=>{ const s=S(); if(!s.лампа3){ s.лампа3=true; s.засос3=false; s.t3=10; } else if((s.t3||0)<10){ стоп(); s.t3=10; } else if(!s.вода3убрана){ s.вода3убрана=true; } else { s.безоп3=true; s.отз3={ок:true,т:'Правильно: сначала трубку из воды, потом гасим спиртовку.'}; } ПЕРЕРИС(); };
  window.r123за4=()=>{ const s=S(); s.гвоздь4=true; стоп(); s.t4=30; ПЕРЕРИС(); };
  window.r123за5=()=>{ const s=S(); if(!s.пип5) s.пип5=true; else s.кап5=Math.min(4,(s.кап5||0)+1); ПЕРЕРИС(); };
  window.r123капля=()=>{ const s=S(); if(!s.пип5) return; s.кап5=Math.min(4,(s.кап5||0)+1); ПЕРЕРИС(); };
  window.r123свет=()=>{ const s=S(); s.свет5=!s.свет5; ПЕРЕРИС(); };
  window.r123оп=(i)=>{ const s=S(); if(!ОПЫТЫ7[i]) return; s.оп7=i; ПЕРЕРИС(); };
  window.r123кап7=()=>{ const s=S(); if(((s.ф7||{})[3]||0)<1) return; s.кап7=Math.min(3,(s.кап7||0)+1); ПЕРЕРИС(); };
  window.r123за7=()=>{ const s=S(), к=s.оп7||0, f0=Object.assign({},s.ф7||{}), ф=f0[к]||0;
    if(к===3){ if(ф<1) f0[3]=1; else s.кап7=Math.min(3,(s.кап7||0)+1); } else f0[к]=Math.min(2,ф+(к===0&&ф===0?2:1));
    s.ф7=f0; ПЕРЕРИС(); };
  window.r123тип=(j)=>{ const s=S(); if(s.ок6) return; const n=s.у6||0, У=УРАВНЕНИЯ[n];
    if(j===У.т){ s.ок6=true; if(n>=УРАВНЕНИЯ.length-1) s.дело_сортировка=true; s.отз6={ок:true,т:У.у+' — '+ТИПЫ[У.т]+': '+СХЕМЫ[У.т]+'.'}; }
    else s.отз6={ок:false,j:j,т:'Не та корзина. Посчитай: слева '+У.сл+(У.сл===1?' вещество':' вещества')+', справа '+У.сп+'. '+(У.т>=2?'Есть ли слева простое вещество (один элемент)? '+(У.т===2?'Есть — значит, замещение.':'Нет — оба сложные, значит, обмен.'):'')};
    ПЕРЕРИС(); };
  window.r123удальше=()=>{ const s=S(); if(!s.ок6||(s.у6||0)>=УРАВНЕНИЯ.length-1) return; s.у6=(s.у6||0)+1; s.ок6=false; s.отз6=null; ПЕРЕРИС(); };
  window.r123мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; ПЕРЕРИС(); };
  window.r123заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; ПЕРЕРИС(); };
  window.r123Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; ПЕРЕРИС(); };
  window.r123Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; ПЕРЕРИС(); };
  window.r123T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; ПЕРЕРИС(); };
  window.r123TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; ПЕРЕРИС(); };
  window.r123Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; ПЕРЕРИС(); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L123,{__планПорядок:arr[м].__планПорядок}); else arr.push(L123); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU123={render:render, L:L123};
})();
