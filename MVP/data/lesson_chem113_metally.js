/* ============ ХИМИЯ · УРОК 113 · «МЕТАЛЛЫ И НЕМЕТАЛЛЫ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–112 (манера NOBOOK). Карточка 113 из банка подменяется этой записью
   (VISKW[113]). Рисунки — MVP/data/ris_lab.js (window.РЛ): образцы простых веществ (Fe, Cu, Al, Au,
   S, графит, I₂), ампулы с ртутью, бромом и хлором, батарейка 4,5 В, лампочка, зажимы «крокодил»,
   наковальня и молоток, таблица Менделеева с границей металлов и неметаллов.

   ОПЫТЫ.
   1) Коллекция простых веществ: десять образцов на полках — металл или неметалл; клетки таблицы
      окрашиваются, в конце появляется граница-«ступенька» от бора к астату.
   2) Электропроводность: цепь «батарейка — лампочка — образец»; медь, железо, алюминий горят,
      сера — нет, графит — да (неметалл-исключение).
   3) Микромир: решётка ионов металла и «электронный газ»; молекулы серы S₈ без свободных электронов.
   4) Теплопроводность: восковые шарики на медном, алюминиевом, железном и стеклянном стержнях.
   5) Ковкость: молоток и наковальня — металлы плющатся, сера и графит крошатся.
   6) Из чего сделать: провод, фольга, гвоздь, грифель, кольцо, спичечная головка. */
(function(){
  'use strict';

  const ID = 113;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';
  const ЦМ='#8ab8e8', ЦН='#f0d860';

  const ДЕЛА = [
    {ключ:'коллекция', имя:'Коллекция: 10 веществ',  итог:'10 из 10'},
    {ключ:'ток',       имя:'Опыт: электропроводность', итог:'5 из 5'},
    {ключ:'марафон',   имя:'Проверка: марафон',       итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться отличать металлы от неметаллов по свойствам и по месту в таблице Менделеева.'],
    ['Принцип','Простые вещества делят на <b>металлы</b> и <b>неметаллы</b>. Металлы блестят, проводят ток и тепло, куются. Неметаллы бывают газами (O₂, N₂, Cl₂), жидкостью (бром) и твёрдыми (сера, графит, йод); они плохо проводят ток и тепло, хрупкие. В таблице их разделяет «ступенька» от бора к астату.'],
    ['Оборудование','<b>Приборы:</b> батарейка 4,5 В, лампочка, провода с зажимами, спиртовка, стержни с восковыми шариками, наковальня, молоток.<br><b>Образцы:</b> медь, железо, алюминий, золото, ртуть (в ампуле), сера, графит, йод, бром и хлор (в ампулах).'],
    ['Ход работы','1. Разобрать коллекцию простых веществ.<br>2. Проверить электропроводность.<br>3. Заглянуть в микромир.<br>4. Сравнить теплопроводность.<br>5. Ударить молотком.<br>6. Подобрать вещество для вещей.'],
    ['Безопасность','Ртуть, бром и хлор <b>ядовиты</b> — их хранят только в запаянных ампулах, ампулы не вскрывают. Пары йода не нюхают. Батарейка 4,5 В безопасна, но провода к розетке <b>не подключают</b>. По сере и углю бьют молотком только в очках: крошки разлетаются.']
  ];
  const КОЛЛЕКЦИЯ = [
    {с:'Fe', имя:'железо',  кл:'м', факт:'серый металл, блестит на срезе, притягивается магнитом'},
    {с:'Cu', имя:'медь',    кл:'м', факт:'красноватый блестящий металл, отлично проводит ток'},
    {с:'Al', имя:'алюминий',кл:'м', факт:'лёгкий серебристый металл'},
    {с:'Au', имя:'золото',  кл:'м', факт:'жёлтый металл, не тускнеет веками'},
    {с:'Hg', имя:'ртуть',   кл:'м', факт:'единственный жидкий металл, ядовит — только в ампуле'},
    {с:'S',  имя:'сера',    кл:'н', факт:'жёлтая, хрупкая, не блестит, ток не проводит'},
    {с:'C',  имя:'графит',  кл:'н', факт:'углерод: серо-чёрный, мажется, но проводит ток'},
    {с:'I',  имя:'йод',     кл:'н', факт:'фиолетово-чёрные кристаллы, при нагревании — фиолетовые пары'},
    {с:'Br', имя:'бром',    кл:'н', факт:'единственный жидкий неметалл, красно-бурый, ядовит'},
    {с:'Cl', имя:'хлор',    кл:'н', факт:'жёлто-зелёный ядовитый газ'}
  ];
  const ТОК = [
    {с:'Cu', кор:'медь',     имя:'медная проволока',   горит:1, вывод:'металл — проводит'},
    {с:'Fe', кор:'железо',   имя:'железный гвоздь',    горит:1, вывод:'металл — проводит'},
    {с:'Al', кор:'алюминий', имя:'алюминиевая пластинка', горит:1, вывод:'металл — проводит'},
    {с:'S',  кор:'сера',     имя:'кусок серы',         горит:0, вывод:'неметалл — не проводит'},
    {с:'C',  кор:'графит',   имя:'графитовый стержень', горит:1, вывод:'неметалл, но проводит!'}
  ];
  const МИН = ['старт','1 мин','2 мин','3 мин'];
  const СТЕРЖНИ = [
    {имя:'медь',     ц:'#c8743a', упало:[0,3,5,5]},
    {имя:'алюминий', ц:'#c8ccd2', упало:[0,2,4,5]},
    {имя:'железо',   ц:'#7a8088', упало:[0,1,2,3]},
    {имя:'стекло',   ц:'hsla(198,50%,85%,.7)', упало:[0,0,0,0]}
  ];
  const МОЛОТ = [
    {с:'Cu', имя:'медь',     ковкий:1, итог:'расплющилась в пластинку'},
    {с:'Al', имя:'алюминий', ковкий:1, итог:'расплющился в тонкий лист'},
    {с:'Au', имя:'золото',   ковкий:1, итог:'раскаталось тоньше бумаги'},
    {с:'S',  имя:'сера',     ковкий:0, итог:'рассыпалась в жёлтый порошок'},
    {с:'C',  имя:'графит',   ковкий:0, итог:'раскрошился на кусочки'}
  ];
  const ВЕЩИ = [
    {ф:'Электрический провод',   вид:'провод',  вар:['медь','сера','графит'],       в:0, р:'Медь отлично проводит ток и легко вытягивается в проволоку.'},
    {ф:'Фольга для запекания',   вид:'фольга',  вар:['сера','алюминий','графит'],   в:1, р:'Алюминий лёгкий, ковкий и не боится жара духовки.'},
    {ф:'Гвоздь',                 вид:'гвоздь',  вар:['алюминий','сера','железо'],    в:2, р:'Железо (сталь) прочное и твёрдое — гвоздь входит в доску.'},
    {ф:'Грифель карандаша',      вид:'карандаш',вар:['графит','медь','сера'],        в:0, р:'Графит мягкий и оставляет след на бумаге.'},
    {ф:'Обручальное кольцо',     вид:'кольцо',  вар:['железо','золото','алюминий'],  в:1, р:'Золото не ржавеет и не тускнеет — кольцо блестит всю жизнь.'},
    {ф:'Головка спички',         вид:'спичка',  вар:['сера','медь','железо'],        в:0, р:'Сера легко загорается — поэтому она в спичечной головке.'}
  ];
  const МАРАФОН = [
    {q:'Что из перечисленного — металл?', вар:['кислород','сера','железо'], в:2, р:'Железо блестит и проводит ток.'},
    {q:'Какой неметалл проводит ток?', вар:['сера','графит','йод'], в:1, р:'Графит — исключение: проводит ток.'},
    {q:'Единственный жидкий металл —', вар:['ртуть','бром','алюминий'], в:0, р:'Ртуть жидкая при комнатной температуре.'},
    {q:'Единственный жидкий неметалл —', вар:['хлор','бром','йод'], в:1, р:'Бром — красно-бурая жидкость.'},
    {q:'Сера под молотком…', вар:['плющится','крошится','гнётся'], в:1, р:'Неметаллы хрупкие.'},
    {q:'Почему металлы проводят ток?', вар:['в них есть свободные электроны','они блестят','они тяжёлые'], в:0, р:'Свободные электроны движутся к плюсу батарейки.'},
    {q:'Какой стержень прогреется быстрее?', вар:['медный','железный','стеклянный'], в:0, р:'Медь лучше всех проводит тепло.'},
    {q:'Из чего делают провода?', вар:['из меди и алюминия','из серы','из йода'], в:0, р:'Медь и алюминий хорошо проводят ток.'},
    {q:'Кислород и азот — это…', вар:['газообразные неметаллы','металлы','жидкости'], в:0, р:'O₂ и N₂ — газы, неметаллы.'},
    {q:'«Железо, кислород, алюминий, сера». Сколько металлов?', вар:['1','2','3'], в:1, р:'Железо и алюминий.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const ИМЕНА = {Fe:'железо',O:'кислород',Cu:'медь',S:'сера',Al:'алюминий',N:'азот',Na:'натрий',Cl:'хлор',Zn:'цинк',C:'углерод',Ag:'серебро',P:'фосфор',Mg:'магний',Br:'бром',Au:'золото',I:'йод'};
  const П1 = ['Fe','O','Cu','S','Al','N','Na','Cl','Zn','C','Ag','P','Mg','Br','Au','I']
    .map((с,i)=>{ const н=['O','S','N','Cl','C','P','Br','I'].includes(с)?1:0; return {q:'«'+ИМЕНА[с]+'» ('+с+') — металл или неметалл?', с:с, вар:['металл','неметалл'], в:н,
      раз:н?'Неметалл: в таблице правее «ступеньки».':'Металл: в таблице левее «ступеньки».'}; });
  const П2 = поМесту([['Что проводит ток?','медь','сера'],['Что блестит?','алюминий','сера'],['Что крошится под молотком?','сера','медь'],['Что проводит тепло лучше?','медь','стекло'],
    ['Что жидкое при комнатной температуре?','ртуть','железо'],['Какой неметалл проводит ток?','графит','сера'],['Что расплющится молотком?','золото','графит'],['Что притягивает магнит?','железо','алюминий'],
    ['Какой газ — неметалл?','кислород','ртуть'],['Что легче?','алюминий','железо'],['Какой неметалл жидкий?','бром','хлор'],['Что не проводит ток?','сера','железо'],
    ['Какое вещество жёлто-зелёный газ?','хлор','бром'],['Какое вещество фиолетовое?','йод','сера'],['Что ковкое?','медь','йод'],['Что хрупкое?','графит','алюминий']]
    .map(([q,ок,нет])=>({q:q, ок:ок, нет:нет, раз:'Ответ: '+ок+'.'})));
  const П3 = поМесту([['Провод','медь','сера'],['Фольга','алюминий','графит'],['Гвоздь','железо','сера'],['Грифель карандаша','графит','медь'],['Кольцо','золото','железо'],['Головка спички','сера','алюминий'],
    ['Корпус самолёта','алюминий','медь'],['Электроды батарейки','графит','сера'],['Сковорода','железо','сера'],['Ложка','алюминий','графит'],['Лечебная мазь от прыщей','сера','золото'],
    ['Медаль чемпиона','золото','сера'],['Рельсы','железо','алюминий'],['Банка для газировки','алюминий','железо'],['Контакты в телефоне','золото','сера'],['Смазка для замка','графит','медь']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Из чего сделать?', ф:ф, ок:ок, нет:нет, раз:'Подходит '+ок+'.'})));

  const CSS=`
  #lvis .s6.l113n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l113n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l113n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l113n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l113n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l113n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l113n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l113n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l113n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l113n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l113n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l113n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l113n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l113n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l113n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l113n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l113n table.итоги td{white-space:normal!important}
  #lvis .s6.l113n table.итоги td:first-child{width:46%}
  #lvis .s6.l113n table.итоги{table-layout:fixed}
  #lvis .s6.l113n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l113n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l113n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l113n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l113n .ask button{text-align:left}
  #lvis .s6.l113n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l113n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l113n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l113n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l113n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l113n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l113n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l113n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l113n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l113n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l113n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l113n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l113n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l113n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l113n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l113n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l113n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l113n .плитка span{text-align:center}
  #lvis .s6.l113n .плитка:active{transform:scale(.96)}
  #lvis .s6.l113n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l113n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l113n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l113n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l113n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l113n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l113n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l113n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l113n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l113n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l113n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l113n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l113n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l113n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l113n{gap:14px}
  #lvis .s6.l113n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l113n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l113n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l113n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l113n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l113n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l113n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l113n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l113n .карт .текст b{color:${GOLD}}
  #lvis .s6.l113n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l113n .правило b{color:${GOLD}}
  #lvis .s6.l113n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l113n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l113n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l113n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l113n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l113n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l113n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l113n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l113n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l113n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l113n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l113n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l113n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l113n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l113n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l113n .буйки button.мимо{border-color:${RED};animation:l113nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l113nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l113n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l113n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l113n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l113n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l113n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l113n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l113n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l113n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l113n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l113n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l113n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l113n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l113n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l113n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l113n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l113n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l113n .уровни .точка.сейчас{background:${GOLD};animation:l113ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l113ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l113n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l113n{-webkit-text-size-adjust:100%}
  #lvis .s6.l113n [data-anim]{animation:l113nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l113nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l113n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l113n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l113n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l113n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l113n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l113n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l113n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l113n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l113n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l113n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l113n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l113n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l113n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l113n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l113n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l113n .акт span.до{background:#24402c}
  #lvis .s6.l113n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l113n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l113n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l113n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l113n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l113n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l113n .две-колонки li{margin:2px 0}
  #lvis .s6.l113n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l113n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l113n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l113n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l113n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l113n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l113n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l113n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l113n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l113n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l113n ul.памятка li{margin:3px 0}
  #lvis .s6.l113n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l113n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l113n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l113n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l113n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l113n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l113n table.тепло td,#lvis .s6.l113n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l113n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l113n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l113n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l113n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l113n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l113n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l113n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l113n [data-anim]{animation:none!important}
    #lvis .s6.l113n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l113n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l113n-style');
      if(!s){ s=document.createElement('style'); s.id='l113n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r113Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c113-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c113-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c113-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c113-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c113-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c113-плиты)"/>
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
  const ПЛИТКИ = (плитки,обработчик,отметки,колонок,выбор) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя,тело],i)=>
    `<button type="button" class="плитка ${(отметки&&отметки[что])||''}${выбор===i?' вкл':''}" onclick="${обработчик}(${i})"><svg viewBox="0 0 64 64" aria-hidden="true">${L_().defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${тело}</svg><span>${имя}</span></button>`).join('')}</div>`;
  const ДВ = () => L_().ДВИЖ;

  /* образец по символу: металлы и неметаллы коллекции */
  const образецС = (с,x,y,м) => { const Л=L_(), к=м||1;
    if(с==='Hg') return Л.ампула(x,y,к,'#c8ccd2',.35);
    if(с==='Br') return Л.ампула(x,y,к,'#8a2a10',.4);
    if(с==='Cl') return Л.ампула(x,y,к,'hsla(70,80%,55%,1)');
    if(с==='O') return Л.баллон(x,y,0.42*к,'O2');
    if(с==='стекло') return Л.палочка(x-26*к,y-5,x+26*к,y-5);
    return Л.образец(x,y,с==='I'?'I2':с,к);
  };
  const СИМ = {медь:'Cu',сера:'S',алюминий:'Al',железо:'Fe',ртуть:'Hg',графит:'C',золото:'Au',кислород:'O',бром:'Br',хлор:'Cl',йод:'I',стекло:'стекло'};

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=240, y0=196, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.ампула(140,y0-2,0.62,'hsla(70,80%,55%,1)') + Л.ампула(200,y0-2,0.62,'#8a2a10',.4) + Л.ампула(258,y0-2,0.62,'#c8ccd2',.35) + образецС('Cu',44,y0+14,1) + образецС('Al',112,y0+14,0.9) + образецС('Au',170,y0+14,1) + образецС('S',226,y0+14,1) + образецС('C',290,y0+14,0.8) +
      '';
    const поверх = Л.таблица(20,40,130,{граница:true,классы:{Fe:'м',Cu:'м',Al:'м',Na:'м',Mg:'м',K:'м',Ca:'м',Zn:'м',Ag:'м',Au:'м',Hg:'м',Sn:'м',Pb:'м',Li:'м',H:'н',C:'н',N:'н',O:'н',F:'н',P:'н',S:'н',Cl:'н',Br:'н',I:'н',B:'н',Si:'н',He:'н',Ne:'н',Ar:'н'}}) +
      метка(254,40,'металлы',СН,{кегль:11}) + метка(254,70,'неметаллы',ЗЛ,{кегль:11}) +
      Л.имяПрибора(44,y0+30,'медь')+Л.имяПрибора(112,y0+30,'алюминий')+Л.имяПрибора(170,y0+30,'золото')+Л.имяПрибора(226,y0+30,'сера')+Л.имяПрибора(290,y0+30,'графит');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Металлы и неметаллы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r113вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['металлы — слева и внизу, неметаллы — справа вверху','металлы и неметаллы перемешаны'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Как в таблице Менделеева расположены металлы и неметаллы?') :
          РАЗБОР(ок,['Верно: их разделяет «ступенька» от бора к астату. Металлов больше — почти 90 элементов.','Посмотри на таблицу: голубые клетки — слева и внизу, жёлтые — справа вверху, а между ними красная «ступенька».'][в]))) +
      (ок ? ПРАВИЛО('Металлы — <b>левее и ниже</b> «ступеньки» B–At, неметаллы — <b>правее и выше</b>. Водород — неметалл, хоть и стоит слева.') : '');
  }

  /* 2. Коллекция простых веществ */
  function F2(s){
    const Н=382, Л=L_(), к=s.к2, сд=s.сд2||{}, отз=s.отз2, все=КОЛЛЕКЦИЯ.every(x=>сд[x.с]);
    const xs=[40,102,164,226,288], полки=[104,198];
    const классы={}; КОЛЛЕКЦИЯ.forEach(x=>{ if(сд[x.с]) классы[x.с]=x.кл; });
    const полка = (y) => `<rect x="10" y="${y}" width="316" height="7" rx="2" fill="url(#рл-доска)"/><path d="M36 ${y+7} v8 h8 Z M300 ${y+7} v8 h-8 Z" fill="#8a5a2a"/>`;
    let тело = L_().студия(Н,Н-4) + полка(полки[0]) + полка(полки[1]);
    КОЛЛЕКЦИЯ.forEach((x,i)=>{ const cx=xs[i%5], y=полки[Math.floor(i/5)], выб=к===i;
      тело += (выб?`<ellipse cx="${cx}" cy="${y-1}" rx="30" ry="5" fill="#ffd76a" opacity=".45"/><path d="M${cx-6} ${y-86} l6 8 l6 -8 Z" fill="#ffd76a"/>`:'') + образецС(x.с,cx,y,0.86);
      const ц = сд[x.с] ? (x.кл==='м'?ЦМ:ЦН) : '#4a525c';
      тело += `<rect x="${cx-24}" y="${y+10}" width="48" height="15" rx="7.5" fill="${сд[x.с]?ц:'rgba(12,14,18,.7)'}" fill-opacity="${сд[x.с]?.9:1}" stroke="${ц}"/>` + тА(cx,y+21,x.с+' · '+(сд[x.с]?(x.кл==='м'?'металл':'немет.'):'?'),8,сд[x.с]?'#1a1c1f':'#c8ced6'); });
    тело += L_().таблица(20,256,296,{классы:классы,выдел:к!=null?{[КОЛЛЕКЦИЯ[к].с]:true}:{},граница:все}) +
      метка(168,4,все?'граница — «ступенька» от бора к астату':к==null?'коллекция простых веществ':КОЛЛЕКЦИЯ[к].имя+' ('+КОЛЛЕКЦИЯ[к].с+')',все?КР:ЗЛ,{кегль:11});
    const К=к==null?null:КОЛЛЕКЦИЯ[к];
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Коллекция простых веществ') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      `<div class="ряд символы" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${КОЛЛЕКЦИЯ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${сд[x.с]?' был':''}" onclick="r113к(${i})"><b>${x.с}</b><span>${x.имя}</span></button>`).join('')}</div>` +
      (К&&!сд[К.с] ? A(5,'карт задача','<span class="метка">'+К.имя+'</span><div class="текст">'+К.факт[0].toUpperCase()+К.факт.slice(1)+'. Металл или неметалл?</div>') +
        `<div class="ask пара">${['металл','неметалл'].map((t0,j)=>BTN(6+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r113кл("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !К ? СКАЗ('Опыт','Выбирай образцы по одному и определяй: металл или неметалл. Клетка в таблице окрасится.') : '') +
      (все ? ТЕОРИЯ('простые вещества','<b>Металлы</b>: железо, медь, алюминий, золото, ртуть — блестят и проводят ток. <b>Неметаллы</b>: сера, графит, йод — твёрдые; бром — жидкий; хлор, кислород, азот — газы. В таблице Менделеева неметаллы собрались в правом верхнем углу, за «ступенькой» от бора к астату.') +
        ДИВО('Ртуть — единственный металл, жидкий при комнатной температуре, а бром — единственный жидкий неметалл. Галлий плавится прямо в ладони: при 30 °C.') +
        ПРАВИЛО('По виду: <b>блеск</b> — скорее металл. По таблице: <b>правее «ступеньки»</b> — неметалл.') : '');
  }

  /* 3. Опыт 2: электропроводность */
  function F3(s){
    const Н=262, y0=214, у=y0+14, Л=L_(), к=s.обр3, пр3=s.пр3||{}, отз=s.отз3, все=ТОК.every((x,i)=>пр3[i]!=null);
    const Т=к==null?null:ТОК[к], видно=Т&&пр3[к]!=null, горит=видно&&Т.горит;
    const w1=`M38 ${у-50} C38 ${у-120} 133 ${у-92} 133 ${у-4}`, w2=`M167 ${у-4} C190 ${у-4} 190 ${у-12} 212 ${у-12}`, w3=`M328 ${у-12} C333 ${у-12} 333 ${у-150} 220 ${у-150} C110 ${у-150} 64 ${у-122} 64 ${у-46}`;
    const провод=(d,ц)=>`<path d="${d}" stroke="#1a1c1f" stroke-width="4.4" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${ц}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
    const ток=(d)=>горит?`<path d="${d}" stroke="#bfe6ff" stroke-width="1.6" fill="none" stroke-dasharray="2 8" opacity=".95">${ДВ()?`<animate attributeName="stroke-dashoffset" values="20;0" dur=".5s" repeatCount="indefinite"/>`:''}</path>`:'';
    const стойка = `<rect x="226" y="${у-8}" width="88" height="8" rx="2" fill="#dcebf5" fill-opacity=".3" stroke="#8fa8b8" stroke-width=".8"/>`;
    const пр = Л.батарейка(46,у,1) + Л.лампочка(150,у,1,горит) + стойка + (Т?образецС(Т.с,270,у-8,0.92):'');
    const поверх = провод(w1,'#e8402a') + провод(w2,'#e8402a') + провод(w3,'#2a6ab8') + ток(w1)+ток(w2)+ток(w3) +
      Л.крокодил(240,у-14,180,'#e8402a') + Л.крокодил(300,у-14,0,'#2a6ab8') +
      (Т ? метка(200,4,видно?(горит?'лампочка горит — ток идёт':'лампочка не горит'):Т.имя+': загорится ли лампочка?',видно?(горит?ЗЕ:КР):ЗЛ,{кегль:11}) : метка(200,4,'выбери образец на лотке',ЗЛ,{кегль:11}));
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Проводит ли ток?') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ПЛИТКИ(ТОК.map(x=>[x.с,x.кор,Л.образец(32,40,x.с,0.85)]),'r113т',Object.fromEntries(ТОК.map((x,i)=>[x.с,пр3[i]!=null?'done':''])),3,к) +
      (Т&&!видно ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">Образец — '+Т.имя+'. Загорится лампочка?</div>') +
        `<div class="ask пара">${['загорится','не загорится'].map((t0,j)=>BTN(6+j,'',t0,"r113пр("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !Т ? СКАЗ('Опыт','Цепь: батарейка, лампочка и два зажима. Между зажимами кладём образец. Если вещество проводит ток — цепь замкнётся и лампочка загорится.') : '') +
      A(8,'карт','<span class="метка">Таблица наблюдений · '+ТОК.filter((x,i)=>пр3[i]!=null).length+' из 5</span><table class="итоги узкая"><tr><th>Образец</th><th>лампочка</th><th>вывод</th></tr>'+
        ТОК.map((x,i)=>пр3[i]!=null?`<tr><td>${x.кор}</td><td>${x.горит?'💡 горит':'— не горит'}</td><td>${x.вывод}</td></tr>`:`<tr class="пусто"><td>${x.кор}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('электропроводность','Все металлы <b>проводят электрический ток</b>: медь и алюминий — лучше всех, поэтому из них делают провода. Неметаллы ток почти не проводят: сера, сухой йод, фосфор — <b>изоляторы</b>. Исключение — <b>графит</b>: неметалл, а ток проводит.') +
        ДИВО('Грифель простого карандаша — это графит. Нарисуй жирную линию на бумаге, прижми к ней провода от батарейки и светодиода — он загорится! Из графита делают и электроды для батареек.') +
        ПРАВИЛО('Металлы проводят ток. Неметаллы — нет, кроме <b>графита</b>.') : '');
  }

  /* 4. Микромир: свободные электроны */
  function F4(s){
    const Н=236, y0=226, Л=L_(), м=s.м4||0, вкл=!!s.вкл4, вид=s.вид4||{}, обе=вид[0]&&вид[1], в=s.ответ4, ок=в===0;
    let поверх='';
    if(м===0){
      const ионы = Array.from({length:18},(_,i)=>{ const x=48+(i%6)*48, y=72+Math.floor(i/6)*52;
        return `<circle cx="${x}" cy="${y}" r="15" fill="url(#c113-ион)"/><circle cx="${x-5}" cy="${y-5}" r="4" fill="#fff" opacity=".45"/>`+тА(x,y+5,'+',14,'#fff'); }).join('');
      const эл = Array.from({length:22},(_,k)=>{ const x=24+((k*53)%300), y=46+((k*37)%150), dx=вкл?48:((k%3)-1)*6, dy=вкл?0:((k%2)?5:-5);
        return `<circle cx="${x}" cy="${y}" r="3.6" fill="#7fd1ff">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;${dx} ${dy};${вкл?'0 0':'0 0'}" dur="${вкл?1.1+(k%3)*0.15:0.7+(k%4)*0.2}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('');
      поверх = `<radialGradient id="c113-ион" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#ffc090"/><stop offset=".6" stop-color="#d8743a"/><stop offset="1" stop-color="#8a3a10"/></radialGradient>` + ионы + эл +
        (вкл ? метка(30,104,'−',СН,{кегль:14}) + метка(306,104,'+',КР,{кегль:14}) + тА(168,222,'электроны бегут к «+» — это и есть ток',10,'#bfe6ff') : тА(168,222,'ионы меди Cu⁺ и свободные электроны e⁻',10,'#c8ced6')) +
        метка(168,4,'медь: «электронный газ»',ЗЛ,{кегль:11});
    } else {
      const кольцо=(cx,cy)=>{ const т=Array.from({length:8},(_,k)=>[cx+22*Math.cos(k*Math.PI/4),cy+22*Math.sin(k*Math.PI/4)*0.7]);
        return т.map(([x,y],k)=>{ const [x2,y2]=т[(k+1)%8]; return `<path d="M${x.toFixed(1)} ${y.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="#c8a010" stroke-width="3"/>`; }).join('') +
          т.map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="7" fill="url(#c113-сера)"/>`).join(''); };
      поверх = `<radialGradient id="c113-сера" cx=".4" cy=".35" r=".7"><stop offset="0" stop-color="#fff8a0"/><stop offset=".6" stop-color="#f0d020"/><stop offset="1" stop-color="#8a6a00"/></radialGradient>` +
        кольцо(78,110) + кольцо(168,90) + кольцо(258,118) + кольцо(124,176) + кольцо(220,180) +
        (вкл ? метка(30,104,'−',СН,{кегль:14}) + метка(306,104,'+',КР,{кегль:14}) + тА(168,222,'свободных электронов нет — тока нет',10,'#ff9a8a') : тА(168,222,'молекулы серы S₈ — «короны» из восьми атомов',10,'#c8ced6')) +
        метка(168,4,'сера: молекулы S₈',ЗЛ,{кегль:11});
    }
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Почему металлы проводят ток') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))">${['медь','сера'].map((t0,i)=>BTN(3,м===i?'вкл':'',t0,'r113м('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,вкл?'hit':'',вкл?'Отключить батарейку':'Подключить батарейку →',"r113вкл()")}</div>` +
      ТЕОРИЯ('строение',м===0?'В металле атомы отдают часть электронов в «общий котёл». Остаются <b>ионы</b>, а между ними свободно летают <b>электроны</b> — «электронный газ». Подключили батарейку — электроны дружно поплыли к плюсу. Это и есть <b>электрический ток</b>. Те же электроны переносят тепло и отражают свет — отсюда блеск.':'В сере атомы крепко связаны в молекулы S₈. Своих электронов они не отпускают: свободных электронов нет — ток не идёт. Поэтому неметаллы — <b>изоляторы</b>.') +
      (!обе ? СКАЗ('Микромир','Посмотри медь и серу, подключи батарейку в обоих случаях.') :
        ОТВЕТЫ('',['в металлах есть свободные электроны','металлы блестящие'],0,в,4) +
        (в==null ? СКАЗ('Вопрос','Почему металлы проводят ток, а сера — нет?') :
          РАЗБОР(ок,['Верно: ток — это движение свободных электронов, а они есть только в металлах (и в графите).','Блеск — следствие, а не причина. Причина — <b>свободные электроны</b>.'][в]))) +
      (ок ? ПРАВИЛО('Свободные электроны дают металлам <b>ток, тепло и блеск</b>.') : '');
  }

  /* 5. Опыт 3: теплопроводность */
  function F5(s){
    const Н=262, y0=220, у=y0+14, Л=L_(), t=s.t5||0, вид=s.вид5||{0:true}, увидел=вид[3], в=s.ответ5, ок=в===0;
    const cx=70, cy=140, углы=[-28,-12,4,20], L0=200, бусы=[62,96,130,164,196];
    let пр = Л.спиртовка(cx,у,1.5,true);
    let поверх = `<circle cx="${cx}" cy="${cy}" r="9" fill="url(#рл-сталь)"/>`;
    СТЕРЖНИ.forEach((ст,i)=>{ const a=углы[i]*Math.PI/180, ex=cx+L0*Math.cos(a), ey=cy+L0*Math.sin(a), упало=ст.упало[t];
      поверх += `<path d="M${cx} ${cy} L${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${ст.ц}" stroke-width="5" stroke-linecap="round"/><path d="M${cx} ${cy-1.5} L${ex.toFixed(1)} ${(ey-1.5).toFixed(1)}" stroke="#fff" stroke-width="1" opacity=".45"/>` +
        тА((ex+6).toFixed(1),(ey+4).toFixed(1),ст.имя,9,'#c8ced6','start');
      бусы.forEach((d,j)=>{ const px=cx+d*Math.cos(a), py=cy+d*Math.sin(a);
        if(j<упало) пр += `<ellipse cx="${px.toFixed(1)}" cy="${у-3}" rx="4.4" ry="3" fill="#f4e6c0" stroke="#c8b488" stroke-width=".6"/>`;
        else поверх += `<path d="M${px.toFixed(1)} ${py.toFixed(1)} v3" stroke="#e8dcb0" stroke-width="1.4"/><circle cx="${px.toFixed(1)}" cy="${(py+7).toFixed(1)}" r="4.2" fill="#f4e6c0" stroke="#c8b488" stroke-width=".6"/>`; }); });
    поверх += метка(200,4,t===0?'на стержнях — шарики на воске':'прошло: '+МИН[t],t?КР:ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3','Кто лучше проводит тепло') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(4,minmax(0,1fr))">${МИН.map((m,i)=>BTN(3,t===i?'вкл':'',m,'r113t('+i+')')).join('')}</div>` +
      СКАЗ('Опыт','Четыре стержня сходятся над пламенем. К ним воском прилеплены шарики: дойдёт тепло — воск растает, шарик упадёт. Листай время.') +
      A(8,'карт','<span class="метка">Упало шариков (из 5)</span><table class="итоги тепло"><tr><th>Стержень</th>'+МИН.slice(1).map(m=>'<th>'+m+'</th>').join('')+'</tr>'+
        СТЕРЖНИ.map(ст=>'<tr><td>'+ст.имя+'</td>'+[1,2,3].map(k=>'<td>'+(вид[k]?ст.упало[k]:'—')+'</td>').join('')+'</tr>').join('')+'</table>') +
      (!увидел ? '' : ОТВЕТЫ('три',['медь','железо','стекло'],0,в,5) +
        (в==null ? СКАЗ('Вопрос','Какой стержень проводит тепло лучше всех?') :
          РАЗБОР(ок,['Верно: на медном стержне все шарики упали первыми.','Железо прогревается медленнее меди и алюминия.','Стекло почти не проводит тепло — шарики так и висят.'][в]))) +
      (ок ? ТЕОРИЯ('теплопроводность','Металлы хорошо проводят тепло — лучше всех медь, серебро и алюминий. Неметаллы и стекло проводят плохо. Поэтому кастрюли делают из металла, а ручки — из пластмассы или дерева.') +
        ДИВО('Металлическая ложка в горячем чае обжигает пальцы через минуту, а деревянная — никогда. Повара используют медные сковороды: они прогреваются быстро и равномерно.') +
        ПРАВИЛО('Металлы — <b>проводники тепла</b>, неметаллы — <b>теплоизоляторы</b>.') : '');
  }

  /* 6. Опыт 4: молоток и наковальня */
  function F6(s){
    const Н=252, y0=208, у=y0+14, Л=L_(), к=s.м6, уд=s.уд6||{}, отз=s.отз6, все=МОЛОТ.every(x=>уд[x.с]!=null);
    const М=к==null?null:МОЛОТ[к], ударил=М&&уд[М.с]!=null, верх=у-44*1.3;
    const крошки = ударил&&!М.ковкий ? Array.from({length:12},(_,k)=>`<path d="M${120+((k*41)%90)} ${у-2-(k%2)} l3 -3 l3 3 Z" fill="${М.с==='S'?'#f2d02a':'#3a3e44'}"/>`).join('') : '';
    const пр = Л.наковальня(150,у,1.3) + крошки;
    const поверх = (М ? (ударил ? Л.образец(158,верх,М.с,0.95,true) : образецС(М.с,158,верх,0.95)) : '') +
      (М ? Л.молоток(152,верх-(ударил&&М.ковкий?3:6),ударил?0:36,ударил) : '') +
      (ударил&&!М.ковкий ? [0,1,2,3,4].map(k=>`<path d="M${150+k*6} ${верх-6} l${(k-2)*8} ${-10-k*3}" stroke="${М.с==='S'?'#f2d02a':'#9aa0a8'}" stroke-width="1.4" opacity=".7"/>`).join('') : '') +
      метка(168,4,!М?'выбери образец':ударил?М.имя+': '+М.итог:М.имя+' на наковальне',ударил?(М.ковкий?СН:ЗЛ):ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 4','Молоток и наковальня') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ПЛИТКИ(МОЛОТ.map(x=>[x.с,x.имя,Л.образец(32,40,x.с,0.85)]),'r113мв',Object.fromEntries(МОЛОТ.map(x=>[x.с,уд[x.с]!=null?'done':''])),3,к) +
      (М&&!ударил ? A(5,'карт задача','<span class="метка">Предскажи</span><div class="текст">Что будет с образцом «'+М.имя+'» от удара молотком?</div>') +
        `<div class="ask пара">${['расплющится','раскрошится'].map((t0,j)=>BTN(6+j,'',t0,"r113уд("+j+")")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !М ? СКАЗ('Опыт','Кладём образец на наковальню и бьём молотком (в очках!). Сначала предскажи результат.') : '') +
      A(8,'карт','<span class="метка">Таблица · '+МОЛОТ.filter(x=>уд[x.с]!=null).length+' из 5</span><table class="итоги узкая"><tr><th>Образец</th><th>после удара</th><th>свойство</th></tr>'+
        МОЛОТ.map(x=>уд[x.с]!=null?`<tr><td>${x.имя}</td><td>${x.итог}</td><td>${x.ковкий?'ковкий':'хрупкий'}</td></tr>`:`<tr class="пусто"><td>${x.имя}</td><td>—</td><td>—</td></tr>`).join('')+'</table>') +
      (все ? ТЕОРИЯ('ковкость','Металлы <b>ковкие и пластичные</b>: слои ионов скользят друг по другу, а «электронный газ» их склеивает. Поэтому металл плющится, гнётся, вытягивается в проволоку. Неметаллы <b>хрупкие</b>: кристаллы раскалываются на кусочки.') +
        ДИВО('Из одного грамма золота можно раскатать лист площадью почти 1 м² — тоньше 0,0001 мм. Таким «сусальным» золотом покрывают купола храмов.') +
        ПРАВИЛО('Металл под молотком <b>плющится</b>, неметалл — <b>крошится</b>.') : '');
  }

  /* 7. Из чего сделать */
  const вещь = (вид,x,y) => { const Л=L_();
    if(вид==='провод') return `<g><rect x="${x-110}" y="${y-30}" width="170" height="18" rx="9" fill="#2a2c30"/><rect x="${x-106}" y="${y-28}" width="160" height="4" rx="2" fill="#5a5e66"/><rect x="${x+56}" y="${y-27}" width="14" height="12" rx="3" fill="#f4f6f8"/>
      ${Array.from({length:7},(_,k)=>`<path d="M${x+68} ${y-21} q16 ${(k-3)*1.4} 30 ${(k-3)*4}" stroke="#d8844a" stroke-width="2" fill="none"/>`).join('')}</g>`;
    if(вид==='фольга') return `<g><rect x="${x-74}" y="${y-28}" width="96" height="28" rx="4" fill="#d8dce2"/><rect x="${x-74}" y="${y-28}" width="96" height="7" fill="#f4f6f8" opacity=".8"/><rect x="${x-70}" y="${y-20}" width="50" height="11" rx="2" fill="#2a6ab8"/><ellipse cx="${x+22}" cy="${y-14}" rx="7" ry="14" fill="#e8ecf0"/><ellipse cx="${x+22}" cy="${y-14}" rx="3" ry="6" fill="#8a9098"/>
      <path d="M${x+22} ${y} L${x+84} ${y} L${x+80} ${y-5} L${x+22} ${y-3} Z" fill="#c8ccd2"/><path d="M${x+30} ${y-2} l44 0" stroke="#fff" stroke-width=".8"/></g>`;
    if(вид==='гвоздь') return `<g><rect x="${x-100}" y="${y-22}" width="200" height="22" rx="2" fill="url(#рл-доска)"/>${[0,1,2].map(k=>`<path d="M${x-96} ${y-16+k*6} H${x+96}" stroke="#8a5a2a" stroke-width=".6" opacity=".6"/>`).join('')}
      <rect x="${x-3}" y="${y-62}" width="6" height="42" fill="url(#рл-сталь)"/><ellipse cx="${x}" cy="${y-63}" rx="11" ry="3" fill="#9aa0a8"/></g>`;
    if(вид==='карандаш') return `<g><path d="M${x-96} ${y-30} H${x+40} L${x+64} ${y-21} L${x+40} ${y-12} H${x-96} Z" fill="#f2c02a"/><path d="M${x-96} ${y-21} H${x+40}" stroke="#c89a10" stroke-width="1"/>
      <path d="M${x+40} ${y-30} L${x+64} ${y-21} L${x+40} ${y-12} Z" fill="#f0d8b0"/><path d="M${x+56} ${y-24} L${x+64} ${y-21} L${x+56} ${y-18} Z" fill="#3a3e44"/><rect x="${x-104}" y="${y-30}" width="10" height="18" fill="#e86a8a"/>
      <path d="M${x-80} ${y+4} q40 -10 80 0 q30 6 70 -2" stroke="#3a3e44" stroke-width="2.4" fill="none" opacity=".8"/></g>`;
    if(вид==='кольцо') return `<g><ellipse cx="${x}" cy="${y-30}" rx="40" ry="18" fill="none" stroke="#b8860b" stroke-width="10"/><ellipse cx="${x}" cy="${y-32}" rx="40" ry="18" fill="none" stroke="#f4c430" stroke-width="7"/><path d="M${x-30} ${y-44} q20 -6 40 -2" stroke="#fff8c8" stroke-width="2" fill="none"/></g>`;
    return `<g transform="translate(${x-30} ${y}) scale(1.8)">${Л.коробок(0,0,1)}${Л.спичка(-6,-16,-20,true)}</g>`;
  };
  function F7(s){
    const Н=212, y0=170, у=y0+14, Л=L_(), n=Math.min(s.в7||0,ВЕЩИ.length-1), ок=!!s.ок7, отз=s.отз7, готовых=n+(ок?1:0), все=готовых>=ВЕЩИ.length, В=ВЕЩИ[n];
    const xв=ок?122:168, пр = `<g transform="translate(${xв} ${у}) scale(1.2) translate(${-xв} ${-у})">${вещь(В.вид,xв,у)}</g>` + (ок ? образецС(СИМ[В.вар[В.в]],284,у,1.5) : '');
    const поверх = метка(168,4,(n+1)+' из 6 · '+В.ф,ок?ЗЕ:ЗЛ,{кегль:11}) + (ок ? метка(284,40,В.вар[В.в],СН,{кегль:11}) : '');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Из чего сделать?') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(ВЕЩИ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Вещь '+(n+1)+' из 6</span><div class="текст">«'+В.ф+'». Из какого вещества её сделать?</div>') +
        `<div class="ask три">${В.вар.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r113вещ("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая вещь →',"r113вещдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('применение','Свойство подсказывает применение. <b>Проводит ток</b> — провод (медь, алюминий). <b>Ковкий и лёгкий</b> — фольга, самолёты (алюминий). <b>Прочный</b> — гвозди, рельсы (железо). <b>Не тускнеет</b> — украшения, контакты (золото). <b>Мягкий и мажется</b> — грифель (графит). <b>Легко горит</b> — спички (сера).') +
        ПРАВИЛО('Сначала свойство — потом применение.') : '');
  }

  /* 8. Вывод */
  function F8(s){
    const Н=230, y0=184, у=y0+18, Л=L_();
    const пр = Л.ампула(70,у-24,0.8,'#c8ccd2',.35) + Л.ампула(250,у-24,0.8,'#8a2a10',.4) + Л.ампула(296,у-24,0.8,'hsla(70,80%,55%,1)') + Л.ампула(204,у-24,0.8,'hsla(270,40%,40%,.6)') +
      образецС('Cu',34,у,1) + образецС('Fe',96,у,0.9) + образецС('Au',142,у,1) + образецС('S',204,у,1) + образецС('C',258,у,0.75) + образецС('I',306,у,0.9);
    const поверх = метка(90,12,'металлы',СН,{кегль:12}) + метка(250,12,'неметаллы',ЗЛ,{кегль:12}) + `<path d="M173 40 V${у-6}" stroke="#c8202a" stroke-width="2" stroke-dasharray="5 4"/>`;
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Металлы и неметаллы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт','<span class="метка">Сравнение</span><table class="итоги сравнение"><tr><th>Свойство</th><th>металлы</th><th>неметаллы</th></tr>'+
        [['блеск','есть','нет (кроме йода, графита)'],['ток','проводят','нет (кроме графита)'],['тепло','проводят','плохо'],['молоток','плющатся','крошатся'],['при 20 °C','твёрдые (ртуть — жидкая)','газы, жидкий бром, твёрдые']]
          .map(([а,б,в0])=>`<tr><td>${а}</td><td>${б}</td><td>${в0}</td></tr>`).join('')+'</table>') +
      ПРАВИЛО('Металлы: <b>блеск, ток, тепло, ковкость</b>. Неметаллы — наоборот. В таблице их делит «ступенька» B–At.');
  }

  /* 9. Марафон */
  function F9(s){
    const Н=200, y0=156, Л=L_(), м9=s.мар9||{}, n=Math.min(м9.n||0,МАРАФОН.length), ош=Math.min(м9.ош||0,3), отв=s.отв9, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.лампочка(236+i*40,y0+14,0.7,i<3-ош)).join('') + Л.батарейка(70,y0+14,0.9);
    const поверх = все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(276,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Металл от неметалла ты отличишь и по виду, и по таблице.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r113заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r113мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Металлы — ток, тепло, блеск, ковкость.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Что из перечисленного — металл?', варианты:[{т:'сера',ок:false},{т:'железо',ок:true}], разбор:'Железо блестит и проводит ток.' },
    { вопрос:'Какой металл чаще всего используют для проводов?', варианты:[{т:'медь',ок:true},{т:'сера',ок:false}], разбор:'Медь отлично проводит ток.' },
    { вопрос:'«Железо, кислород, алюминий, сера». Сколько металлов?', варианты:[{т:'2',ок:true},{т:'3',ок:false}], разбор:'Железо и алюминий.' },
    { вопрос:'Сера под молотком…', варианты:[{т:'плющится',ок:false},{т:'крошится',ок:true}], разбор:'Неметаллы хрупкие.' },
    { вопрос:'Какой неметалл проводит ток?', варианты:[{т:'графит',ок:true},{т:'йод',ок:false}], разбор:'Графит — исключение.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r113Reset()")}</div>` +
        ПРАВИЛО('Блеск, ток, тепло, ковкость — признаки металла.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r113Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const Т = {
    т1:{ имя:'Металл или неметалл', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=170, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+Л.клетка(26,34,104,з.с)+Л.таблица(150,46,170,{выдел:{[з.с]:true},граница:отв,классы:отв?{[з.с]:з.в?'н':'м'}:null})+
          (отв?метка(234,130,з.в?'неметалл':'металл',з.в?ЗЛ:СН,{кегль:11}):'')+(ст.серия>=3?метка(78,148,'серия: '+ст.серия,ЗЕ,{кегль:10}):''),Н); } },
    т2:{ имя:'Свойства', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=176, y0=144, отв=ст.ответ!=null, [а,б]=з.вар, хор=з.вар[з.в];
        const кольцо=(x,имя)=>отв&&имя===хор?`<ellipse cx="${x}" cy="${y0-12}" rx="48" ry="40" fill="#8fd1a8" opacity=".12" stroke="#8fd1a8" stroke-width="2"/>`:'';
        return свгЛ(сцена(Н,y0,образецС(СИМ[а]||'S',96,y0+14,1.2)+образецС(СИМ[б]||'S',240,y0+14,1.2),кольцо(96,а)+кольцо(240,б)+тА(96,y0+30,а,11,'#c8ced6')+тА(240,y0+30,б,11,'#c8ced6')+
          метка(168,4,з.q,ЗЛ,{кегль:з.q.length>32?10:11})+(ст.серия>=3?метка(168,40,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т3:{ имя:'Применение', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=184, y0=156, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,отв?образецС(СИМ[з.ок]||'S',264,y0+12,1.6):'',
          `<rect x="20" y="24" width="${отв?190:296}" height="90" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/>`+тА(отв?115:168,62,з.ф,15,'#ffd76a')+тА(отв?115:168,92,отв?'→ '+з.ок:'из чего?',13,отв?'#8fe0b0':'#9aa3ad')+
          (ст.серия>=3?метка(168,124,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r113Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r113T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r113TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L113 = {
    id: ID, title: 'Металлы и неметаллы', ico: '🧲',
    src: 'Химия · 5–6 класс · Металлы и неметаллы', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: коллекция простых веществ и таблица Менделеева.',
      'Опыт 2: какие вещества проводят ток.',
      'Микромир: свободные электроны.',
      'Опыт 3: теплопроводность стержней.',
      'Опыт 4: молоток и наковальня.',
      'Из чего сделать: свойства и применение.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: металл или неметалл.',
      'Тренажёр 2: свойства.',
      'Тренажёр 3: применение.'
    ],
    check: { q: 'Что из перечисленного — металл?', choices: ['Кислород','Сера','Железо','Углерод'], ans: 2, exp: 'Железо — металл: блестит и проводит электрический ток.' },
    tasks: [
      { q: 'Какой металл чаще всего используют для электрических проводов?', kind: 'choice', choices: ['Медь','Сера','Кислород','Стекло'], ans: 0, tol: 0, hints: ['Это металл розового цвета.', 'Он отлично проводит ток.'], sol: 'Медные провода хорошо проводят электрический ток.' },
      { q: 'В списке «железо, кислород, алюминий, сера» сколько металлов?', kind: 'unit', ans: 2, tol: 0, hints: ['Железо и алюминий — металлы.', 'Кислород и сера — неметаллы.', '1 + 1 = 2 металла.'], sol: 'Металлов 2: железо и алюминий; 1 + 1 = 2.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.образец){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L113.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Опыт 2',4:'Микромир',5:'Опыт 3',6:'Опыт 4',7:'Применение',8:'Вывод',9:'Проверка',10:'Практика',
      11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l113n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Металлы и неметаллы'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r113Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r113вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r113к=(i)=>{ const s=S(); if(!КОЛЛЕКЦИЯ[i]) return; s.к2=i; s.отз2=null; chRender(0); };
  window.r113кл=(j)=>{ const s=S(); const К=КОЛЛЕКЦИЯ[s.к2]; if(!К) return; const нужно=К.кл==='м'?0:1;
    if(j===нужно){ const с=Object.assign({},s.сд2||{}); с[К.с]=true; s.сд2=с; const все=КОЛЛЕКЦИЯ.every(x=>с[x.с]); if(все) s.дело_коллекция=true;
      s.отз2={ок:true,т:К.имя[0].toUpperCase()+К.имя.slice(1)+' — '+(нужно?'неметалл':'металл')+'. '+(все?'Коллекция разобрана! Посмотри на таблицу: появилась граница.':'Клетка '+К.с+' окрасилась в таблице.')}; }
    else s.отз2={ок:false,j:j,т:нужно?'Посмотри: '+К.факт+'. Это неметалл — в таблице он правее «ступеньки».':'Посмотри: '+К.факт+'. Это металл — в таблице он левее «ступеньки».'};
    chRender(0); };
  window.r113т=(i)=>{ const s=S(); if(!ТОК[i]) return; s.обр3=i; s.отз3=null; chRender(0); };
  window.r113пр=(j)=>{ const s=S(); const i=s.обр3, Т=ТОК[i]; if(!Т) return; const п=Object.assign({},s.пр3||{}); п[i]=j; s.пр3=п;
    const угадал = (j===0)===!!Т.горит; if(ТОК.every((x,k)=>п[k]!=null)) s.дело_ток=true;
    s.отз3={ок:угадал,т:(угадал?'Прогноз верный. ':'Прогноз не сбылся. ')+(Т.горит?'Лампочка горит: '+Т.имя+' проводит ток.':'Лампочка не горит: '+Т.имя+' — изолятор.')+(Т.с==='C'?' Графит — неметалл, но проводит ток!':'')};
    chRender(0); };
  window.r113м=(i)=>{ const s=S(); s.м4=i; s.вкл4=false; chRender(0); };
  window.r113вкл=()=>{ const s=S(); s.вкл4=!s.вкл4; if(s.вкл4){ const в=Object.assign({},s.вид4||{}); в[s.м4||0]=true; s.вид4=в; } chRender(0); };
  window.r113t=(t)=>{ const s=S(); if(t<0||t>3) return; s.t5=t; const в=Object.assign({0:true},s.вид5||{}); for(let k=0;k<=t;k++) в[k]=true; s.вид5=в; chRender(0); };
  window.r113мв=(i)=>{ const s=S(); if(!МОЛОТ[i]) return; s.м6=i; s.отз6=null; chRender(0); };
  window.r113уд=(j)=>{ const s=S(); const М=МОЛОТ[s.м6]; if(!М) return; const у=Object.assign({},s.уд6||{}); у[М.с]=j; s.уд6=у;
    const угадал=(j===0)===!!М.ковкий;
    s.отз6={ок:угадал,т:(угадал?'Прогноз верный: ':'Прогноз не сбылся: ')+М.имя+' '+М.итог+' — '+(М.ковкий?'металл ковкий.':'неметалл хрупкий.')}; chRender(0); };
  window.r113вещ=(j)=>{ const s=S(); if(s.ок7) return; const n=s.в7||0, В=ВЕЩИ[n];
    if(j===В.в){ s.ок7=true; s.отз7={ок:true,т:В.р}; } else s.отз7={ок:false,j:j,т:'«'+В.вар[j]+'» не подойдёт. Подумай, какое свойство нужно этой вещи.'};
    chRender(0); };
  window.r113вещдальше=()=>{ const s=S(); if(!s.ок7||(s.в7||0)>=ВЕЩИ.length-1) return; s.в7=(s.в7||0)+1; s.ок7=false; s.отз7=null; chRender(0); };
  window.r113мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар9||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв9={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв9={i:м.n,ок:false,j:j}; }
    s.мар9=м; chRender(0); };
  window.r113заново=()=>{ const s=S(); s.мар9={n:0,ош:0}; s.отв9=null; chRender(0); };
  window.r113Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r113Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r113T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r113TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r113Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L113,{__планПорядок:arr[м].__планПорядок}); else arr.push(L113); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU113={render:render, L:L113};
})();
