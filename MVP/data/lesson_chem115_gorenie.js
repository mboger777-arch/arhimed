/* ============ ХИМИЯ · УРОК 115 · «ГОРЕНИЕ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–114 (манера NOBOOK), «ещё интерактивнее». Карточка 115 из банка подменяется
   этой записью (VISKW[115]). Рисунки — MVP/data/ris_lab.js (window.РЛ): живое пламя, свеча, газовая
   горелка с заслонкой воздуха, фарфоровая чашка, ведро, огнетушитель, табло термопары, треугольник огня.

   ОПЫТЫ.
   1) Свеча Фарадея: зоны пламени нажимаются (тёмная ~600 °C, светящаяся ~1200 °C, внешняя ~1400 °C);
      фарфоровая чашка — сажа, холодный стакан — вода, стакан с известковой водой — CO₂,
      стеклянная трубка из тёмной зоны — на её конце горят пары парафина.
   2) Бумажный стаканчик: пустой загорается при ~233 °C, с водой не нагревается выше 100 °C.
   3) Горелка: заслонка воздуха закрыта / приоткрыта / открыта — жёлтое коптящее пламя или синее.
   4) Микромир: уравнять горение метана CH₄ + 2O₂ → CO₂ + 2H₂O кнопками «+» и «−».
   5) Пожарный тренажёр: масло на сковороде, корзина с бумагой, разлитый спирт, загоревшийся
      удлинитель, костёр — подобрать средство; вода на масло даёт огненный шар. */
(function(){
  'use strict';

  const ID = 115;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'свеча',    имя:'Опыты Фарадея со свечой', итог:'4 из 4'},
    {ключ:'пожарный', имя:'Пожарный тренажёр',       итог:'5 из 5'},
    {ключ:'марафон',  имя:'Проверка: марафон',       итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Разобраться, что такое горение, из чего состоит пламя, что получается при горении и как правильно тушить огонь.'],
    ['Принцип','<b>Горение</b> — реакция вещества с кислородом, при которой выделяются тепло и свет. Нужны три условия — <b>горючее</b>, <b>кислород</b> и <b>температура воспламенения</b> («треугольник огня»). Убери любое — огонь погаснет.'],
    ['Оборудование','<b>Приборы:</b> свеча, фарфоровая чашка, химические стаканы, стеклянная трубка, газовая горелка, спиртовки, штатив, термопара.<br><b>Вещества:</b> парафин, известковая вода, бумажные стаканчики, вода.<br><b>Средства тушения:</b> крышка, покрывало, песок, вода, огнетушитель.'],
    ['Ход работы','1. Исследовать пламя свечи.<br>2. Нагреть бумажные стаканчики — пустой и с водой.<br>3. Поработать заслонкой горелки.<br>4. Уравнять горение метана.<br>5. Потушить пять пожаров.'],
    ['Безопасность','Длинные волосы собрать, рукава подвернуть. Над пламенем работать только инструментами: чашку — держателем, трубку — пинцетом. Горелку зажигают при <b>закрытой</b> заслонке, потом открывают. Горящее масло и электроприборы <b>водой не тушат</b>.']
  ];
  const ЗОНЫ = [
    {к:'тёмная',     t:'около 600 °C',  что:'пары парафина ещё не горят — у фитиля мало кислорода', ц:'#6a7aff'},
    {к:'светящаяся', t:'около 1200 °C', что:'раскалённые частицы сажи — углерода — светятся жёлтым', ц:'#ffd25a'},
    {к:'внешняя',    t:'около 1400 °C', что:'кислорода вдоволь, всё сгорает полностью — самая горячая зона', ц:'#ff8a5a'}
  ];
  const ФАРАДЕЙ = [
    {к:'чашка',  имя:'Чашка',        дей:'Подержать фарфоровую чашку в пламени', итог:'на дне чашки — чёрная сажа: в пламени есть несгоревший углерод', прод:'сажа C'},
    {к:'холод',  имя:'Холодный стакан', дей:'Подержать холодный сухой стакан над пламенем', итог:'стенки запотели, появились капли — при горении образуется вода', прод:'вода H₂O'},
    {к:'известь',имя:'Изв. вода',    дей:'Подержать стакан, смоченный известковой водой', итог:'плёнка известковой воды помутнела — образуется углекислый газ', прод:'CO₂'},
    {к:'трубка', имя:'Трубка',       дей:'Ввести стеклянную трубку в тёмную зону', итог:'на конце трубки загорелся огонёк — в тёмной зоне горючие пары парафина', прод:'пары парафина'}
  ];
  const СЕК = ['старт','10 с','30 с','2 мин'];
  const ПУСТОЙ = [20,150,233,null];
  const ВОДА3 = [20,45,80,100];
  const ЗАСЛОНКА = [
    {имя:'закрыта',    пламя:'жёлтое, коптящее',   t:900,  прод:'сажа C и угарный газ CO', ц:'#ffb43a'},
    {имя:'приоткрыта', пламя:'синее с жёлтым концом', t:1150, прод:'немного сажи', ц:'#c8a0ff'},
    {имя:'открыта',    пламя:'синее, ровное',      t:1500, прод:'CO₂ и H₂O', ц:'#7fd1ff'}
  ];
  const ИНСТР = [
    {к:'вода',         имя:'Ведро воды'},
    {к:'крышка',       имя:'Крышка'},
    {к:'покрывало',    имя:'Покрывало'},
    {к:'песок',        имя:'Песок'},
    {к:'огнетушитель', имя:'Огнетушитель'},
    {к:'ток',          имя:'Обесточить'}
  ];
  const УБРАЛИ = {вода:'т', крышка:'к', покрывало:'к', песок:'к', огнетушитель:'к', ток:'т'};
  const ПОЖАРЫ = [
    {к:'масло',  ф:'Вспыхнуло масло на сковороде', ок:['крышка','покрывало','песок'],
      плохо:{вода:'Огненный шар! Вода тонет в масле, мгновенно вскипает и выбрасывает горящие брызги под потолок.', огнетушитель:'Струя из огнетушителя может расплескать горящее масло. Надёжнее всего — накрыть.', ток:'Плиту выключить полезно, но масло уже горит само. Его нужно накрыть.'},
      р:'Крышка перекрыла кислород — масло погасло. Плиту выключить и крышку не снимать, пока сковорода не остынет.'},
    {к:'корзина',ф:'Загорелась бумага в мусорной корзине', ок:['вода','огнетушитель'],
      плохо:{крышка:'Крышка от кастрюли мала для корзины — пламя выбьется по краям.', ток:'Электричество тут ни при чём — горит бумага.'},
      р:'Вода остудила бумагу ниже температуры воспламенения — огонь погас.'},
    {к:'спирт',  ф:'На столе горит разлитый спирт', ок:['покрывало','песок','огнетушитель'],
      плохо:{вода:'Спирт смешивается с водой и растекается — горящая лужа станет больше.', крышка:'Крышка не закроет всю лужу.', ток:'Ток здесь ни при чём.'},
      р:'Покрывало или песок перекрыли доступ воздуха — спирт погас.'},
    {к:'удлинитель', ф:'Задымился и загорелся удлинитель', ок:['ток'],
      плохо:{вода:'Удар током! Вода проводит ток. Сначала обесточь.', огнетушитель:'Пока ток идёт, провод снова разогреется и вспыхнет. Сначала обесточь.', покрывало:'Под напряжением трогать нельзя. Сначала обесточь.', песок:'Сначала обесточь — иначе провод продолжит греться.'},
      р:'Вилку выдернули — провод больше не нагревается, огонь погас. Остатки тлеющей изоляции тушат огнетушителем.'},
    {к:'костёр', ф:'Уходим из похода — костёр ещё горит', ок:['вода','песок'],
      плохо:{крышка:'Костёр крышкой не накрыть.', ток:'В лесу нет розетки.', огнетушитель:'Можно, но в походе его нет. Заливают водой и засыпают землёй или песком.'},
      р:'Залили водой и засыпали песком: угли остыли и больше не получают воздуха.'}
  ];
  const МАРАФОН = [
    {q:'Горение — это…', вар:['испарение вещества','реакция с кислородом с выделением тепла и света','таяние вещества'], в:1, р:'Горение — реакция с кислородом: тепло и свет.'},
    {q:'Что нужно для горения?', вар:['только кислород','вода и воздух','горючее, кислород и тепло'], в:2, р:'Треугольник огня.'},
    {q:'Почему одеяло гасит огонь?', вар:['перекрывает кислород','охлаждает','убирает горючее'], в:0, р:'Без кислорода горение прекращается.'},
    {q:'Горящее масло тушат…', вар:['водой','крышкой','вентилятором'], в:1, р:'Вода на масле даёт огненный шар.'},
    {q:'Самая горячая зона пламени свечи —', вар:['тёмная','светящаяся','внешняя'], в:2, р:'Во внешней зоне кислорода больше всего.'},
    {q:'На холодном стакане над свечой — капли. Это…', вар:['парафин','вода','кислород'], в:1, р:'При горении образуется вода.'},
    {q:'C + O₂ → ?', вар:['CO₂','CH₄','H₂O'], в:0, р:'Углерод сгорает в углекислый газ.'},
    {q:'Почему бумажный стаканчик с водой не горит?', вар:['вода не даёт нагреться выше 100 °C','вода не пускает кислород','бумага мокрая снаружи'], в:0, р:'Бумага воспламеняется около 233 °C.'},
    {q:'Жёлтое коптящее пламя горелки значит…', вар:['слишком много воздуха','не хватает воздуха','газ кончился'], в:1, р:'Без воздуха газ сгорает не полностью — сажа и угарный газ.'},
    {q:'CH₄ + 2O₂ → CO₂ + ?', вар:['H₂O','2H₂','2H₂O'], в:2, р:'Четыре атома водорода — две молекулы воды.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([['Горит масло на сковороде','накрыть крышкой','залить водой'],['Горит бумага в корзине','залить водой','помахать полотенцем'],['Горит разлитый спирт','накрыть покрывалом','залить водой'],
    ['Загорелся удлинитель','обесточить','залить водой'],['Костёр после похода','залить водой и засыпать','оставить догорать'],['Загорелась одежда на человеке','накрыть плотной тканью и катать по земле','бежать'],
    ['Горит телевизор','обесточить, огнетушитель','облить водой'],['Вспыхнул бензин','песок или пенный огнетушитель','вода из ведра'],['Загорелись шторы','вода или огнетушитель','открыть окно для проветривания'],
    ['Горят угли в мангале — пора домой','залить водой','накрыть газетой'],['Загорелся фритюр в кафе','крышка или огнетушитель','вода'],['Тлеет окурок в траве','затоптать и залить','оставить'],
    ['Загорелась сухая трава','сбить ветками, засыпать землёй','раздувать'],['Горит свеча — уходим из дома','погасить колпачком','оставить гореть'],['Горит мусор в баке','вода или огнетушитель','бросить туда бумагу'],['Задымилась розетка','обесточить в щитке','лить воду']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Что делать?', ф:ф, ок:ок, нет:нет, раз:'Правильно: '+ок+'.'})));
  const П2 = поМесту([['Накрыли костёр одеялом','кислород','горючее'],['Залили костёр водой','температуру','кислород'],['Перекрыли газовый кран','горючее','кислород'],['Сделали просеку при лесном пожаре','горючее','кислород'],
    ['Засыпали огонь песком','кислород','температуру'],['Накрыли спиртовку колпачком','кислород','горючее'],['Пена из огнетушителя','кислород','горючее'],['Унесли дрова от костра','горючее','температуру'],
    ['Опустили спичку в воду','температуру','горючее'],['Накрыли сковороду крышкой','кислород','температуру'],['Выключили газ под чайником','горючее','кислород'],['Облили водой горящую бумагу','температуру','горючее'],
    ['Окопали костёр и убрали сухие листья','горючее','кислород'],['Накрыли свечу стаканом','кислород','горючее'],['Засыпали угли землёй','кислород','горючее'],['Перекрыли вентиль горелки','горючее','температуру']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Какое условие горения убрали?', ф:ф, ок:ок, нет:нет, раз:'Убрали '+ок+' — одну сторону треугольника огня.'})));
  const П3 = поМесту([['Уголь C','CO₂','H₂O'],['Водород H₂','H₂O','CO₂'],['Метан CH₄','CO₂ и H₂O','только CO₂'],['Сера S','SO₂','H₂S'],
    ['Магний Mg','MgO','MgCO₃'],['Свеча (парафин)','CO₂ и H₂O','только сажа'],['Дрова','CO₂, H₂O и зола','только кислород'],['Спирт','CO₂ и H₂O','водород'],
    ['Бензин','CO₂ и H₂O','азот'],['Железо в кислороде','Fe₃O₄','FeCl₂'],['Газ без воздуха','сажа и угарный газ CO','чистый кислород'],['Медь при нагреве','CuO','CuSO₄'],
    ['Сахар','CO₂ и H₂O','поваренная соль'],['Бумага','CO₂, H₂O и зола','азот'],['Углерод без кислорода (мало O₂)','угарный газ CO','кислород O₂'],['Пропан в походной горелке','CO₂ и H₂O','водород']]
    .map(([ф,ок,нет])=>({q:'Что получится при горении: «'+ф+'»?', ф:ф, ок:ок, нет:нет, раз:'Ответ: '+ок+'. Вещество соединяется с кислородом.'})));

  const CSS=`
  #lvis .s6.l115n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l115n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l115n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l115n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l115n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l115n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l115n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l115n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l115n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l115n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l115n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l115n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l115n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l115n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l115n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l115n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l115n table.итоги td{white-space:normal!important}
  #lvis .s6.l115n table.итоги td:first-child{width:46%}
  #lvis .s6.l115n table.итоги{table-layout:fixed}
  #lvis .s6.l115n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l115n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l115n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l115n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l115n .ask button{text-align:left}
  #lvis .s6.l115n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l115n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l115n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l115n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l115n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l115n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l115n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l115n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l115n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l115n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l115n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l115n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l115n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l115n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l115n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l115n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l115n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l115n .плитка span{text-align:center}
  #lvis .s6.l115n .плитка:active{transform:scale(.96)}
  #lvis .s6.l115n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l115n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l115n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l115n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l115n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l115n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l115n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l115n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l115n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l115n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l115n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l115n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l115n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l115n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l115n{gap:14px}
  #lvis .s6.l115n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l115n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l115n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l115n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l115n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l115n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l115n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l115n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l115n .карт .текст b{color:${GOLD}}
  #lvis .s6.l115n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l115n .правило b{color:${GOLD}}
  #lvis .s6.l115n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l115n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l115n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l115n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l115n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l115n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l115n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l115n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l115n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l115n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l115n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l115n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l115n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l115n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l115n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l115n .буйки button.мимо{border-color:${RED};animation:l115nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l115nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l115n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l115n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l115n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l115n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l115n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l115n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l115n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l115n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l115n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l115n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l115n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l115n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l115n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l115n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l115n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l115n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l115n .уровни .точка.сейчас{background:${GOLD};animation:l115ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l115ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l115n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l115n{-webkit-text-size-adjust:100%}
  #lvis .s6.l115n [data-anim]{animation:l115nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l115nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l115n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l115n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l115n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l115n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l115n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l115n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l115n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l115n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l115n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l115n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l115n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l115n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l115n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l115n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l115n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l115n .акт span.до{background:#24402c}
  #lvis .s6.l115n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l115n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l115n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l115n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l115n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l115n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l115n .две-колонки li{margin:2px 0}
  #lvis .s6.l115n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l115n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l115n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l115n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l115n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l115n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l115n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l115n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l115n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l115n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l115n ul.памятка li{margin:3px 0}
  #lvis .s6.l115n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l115n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l115n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l115n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l115n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l115n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l115n table.тепло td,#lvis .s6.l115n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l115n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l115n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l115n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l115n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l115n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l115n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l115n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l115n table.детектив th{width:auto!important}
  #lvis .s6.l115n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l115n table.детектив td{font-size:12.5px}
  #lvis .s6.l115n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l115n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l115n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l115n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l115n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l115n .коэф-пульт button:active{transform:translateY(2px)}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l115n [data-anim]{animation:none!important}
    #lvis .s6.l115n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l115n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l115n-style');
      if(!s){ s=document.createElement('style'); s.id='l115n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r115Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c115-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c115-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c115-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c115-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c115-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c115-плиты)"/>
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
  const свгЖ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${тело}</svg>`;
  const метка = (cx,y,t0,цвет,опц) => { const о=опц||{}, к=о.кегль||12, ш=String(t0).length*к*0.58+20, в=к+11;
    const x=Math.min(336-ш/2-4, Math.max(ш/2+4, cx));
    return `<rect x="${(x-ш/2).toFixed(1)}" y="${y}" width="${ш.toFixed(1)}" height="${в}" rx="${(в/2).toFixed(1)}" fill="rgba(12,14,18,.82)" stroke="${цвет||'#6a7480'}" stroke-width="1.2"/>
      <text x="${x.toFixed(1)}" y="${(y+в/2+к*0.36).toFixed(1)}" text-anchor="middle" font-size="${к}" font-weight="bold" fill="${о.цветТ||'#eef2f6'}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`; };
  const тА = (x,y,t0,к,цв,якорь) => `<text x="${x}" y="${y}" text-anchor="${якорь||'middle'}" font-size="${к}" font-weight="bold" fill="${цв}" font-family="'Helvetica Neue',Arial,sans-serif">${esc(t0)}</text>`;
  const ШАПКА = (номер,название) => A(1,'шапка-опыта','<span>'+номер+'</span><b>'+название+'</b>');
  const ТЕОРИЯ = (заголовок,html) => A(6,'карт теория','<span class="метка">Теория · '+заголовок+'</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ДИВО = (html) => A(7,'карт диво','<span class="метка">Интересно</span><div class="текст" style="font-size:18px">'+html+'</div>');
  const ПЛИТКИ = (плитки,обработчик,колонок,выбор,отметки) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя,тело],i)=>
    `<button type="button" class="плитка${выбор===i?' вкл':''}${отметки&&отметки[i]?' done':''}" onclick="${обработчик}(${i})"><svg viewBox="0 0 64 64" aria-hidden="true">${L_().defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${тело}</svg><span>${имя}</span></button>`).join('')}</div>`;
  const ДВ = () => L_().ДВИЖ;
  const огонь = (x,y,h,ш,dur) => `<g transform="translate(${x} ${y})">${L_().пламя(h,ш,dur)}</g>`;
  const дым = (x,y,n,ц) => Array.from({length:n||2},(_,k)=>`<path d="M${x-4+k*7} ${y} q-6 -10 0 -20 q6 -10 0 -20" stroke="${ц||'#b8bec4'}" stroke-width="2" fill="none" opacity=".45" filter="url(#рл-дымка)">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 4;0 -8" dur="${1.6+k*0.3}s" repeatCount="indefinite"/>`:''}</path>`).join('');
  const пар = (x,y,n) => дым(x,y,n,'#e8f4fa');

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=246, y0=196, у=y0+14, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.свеча(58,у,1.5,true) + Л.горелка(140,у,0.9,2,true) + Л.ведро(214,у,1,'песок') + Л.огнетушитель(258,у,0.9) + `<path d="M284 ${у-6} h40 v-18 h-40 Z" fill="#7a6a5a"/><path d="M284 ${у-24} q20 -8 40 0" fill="#8a7a6a"/>`;
    const поверх = Л.треугольникОгня(238,78,34,{г:1,к:1,т:1}) + метка(90,8,'Горение',ЗЛ,{кегль:12}) +
      Л.имяПрибора(58,у+12,'свеча')+Л.имяПрибора(140,у+12,'горелка')+Л.имяПрибора(214,у+12,'песок')+Л.имяПрибора(304,у+12,'покрывало');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Горение') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r115вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['горючее, кислород и тепло','только кислород'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что необходимо для горения свечи?') :
          РАЗБОР(ок,['Верно: горючее (парафин), кислород воздуха и тепло спички.','Кислорода мало: нужны ещё горючее (парафин) и тепло, чтобы поджечь.'][в]))) +
      (ок ? ПРАВИЛО('Треугольник огня: <b>горючее + кислород + тепло</b>.') : '');
  }

  /* 2. Свеча Фарадея */
  const ЗОНЫ_Г = [ [100,152,6,10], [100,126,11,25], [100,130,17,37] ];
  function F2(s){
    const Н=300, y0=250, у=y0+14, Л=L_(), з=s.з2, сд=s.сд2||{}, инстр=s.и2, видЗ=s.видЗ2||{}, всеИ=ФАРАДЕЙ.every(x=>сд[x.к]), всеЗ=ЗОНЫ.every((x,i)=>видЗ[i]), в=s.ответ2, ок=в===0, в2=s['ответ2б'], ок2=в2===2;
    const И=инстр==null?null:ФАРАДЕЙ[инстр];
    let инстрРис='';
    if(И&&И.к==='чашка') инстрРис = Л.чашка(100,126,40,true) + `<path d="M120 116 L206 92" stroke="url(#рл-сталь)" stroke-width="3"/><path d="M204 88 h24 v8 h-24 Z" fill="url(#рл-доска)"/>`;
    if(И&&(И.к==='холод'||И.к==='известь')){ const мутн=И.к==='известь';
      инстрРис = `<rect x="70" y="30" width="60" height="64" rx="3" fill="url(#рл-стекло)" stroke="#bcd4e2" stroke-width="1.2"/><rect x="70" y="30" width="60" height="5" rx="2" fill="url(#рл-толща)"/>
        ${мутн?`<rect x="72" y="36" width="56" height="56" fill="#f4f2ec" opacity=".42"/>${Array.from({length:30},(_,k)=>`<circle cx="${74+(k*37)%52}" cy="${40+(k*23)%50}" r="${0.8+(k%3)*0.4}" fill="#fff" opacity=".8"/>`).join('')}`
          :Array.from({length:26},(_,k)=>`<circle cx="${74+(k*37)%52}" cy="${42+(k*29)%48}" r="${0.9+(k%3)*0.6}" fill="#e8f6ff" opacity=".85"/>`).join('')+`<rect x="72" y="36" width="56" height="56" fill="#e8f4fa" opacity=".16"/>`}
        <path d="M74 36 V88" stroke="#fff" stroke-width="1.6" opacity=".6"/>`; }
    if(И&&И.к==='трубка') инстрРис = Л.трубка('M102 150 L204 96') + огонь(206,94,16,4,.6);
    const зоныРис = ЗОНЫ_Г.map(([cx,cy,rx,ry],i)=>з===i?`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="${ЗОНЫ[i].ц}" stroke-width="1.6" stroke-dasharray="3 2"/>`:'').join('');
    const зоныНаж = [2,1,0].map(i=>{ const [cx,cy,rx,ry]=ЗОНЫ_Г[i]; return `<ellipse cx="${cx}" cy="${cy}" rx="${rx+3}" ry="${ry+3}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r115з(${i})"/>`; }).join('');
    const пр = Л.свеча(100,у,2.4,true) + (И&&И.к==='чашка'?'':'');
    const поверх = инстрРис + зоныРис +
      (з!=null ? метка(238,40,ЗОНЫ[з].к+' зона · '+ЗОНЫ[з].t,ЗОНЫ[з].ц,{кегль:10}) : метка(238,40,'нажми на зону пламени',ЗЛ,{кегль:10})) +
      (И ? метка(238,70,'продукт: '+И.прод,ЗЕ,{кегль:10}) : '') +
      [0,1,2].map(i=>`<path d="M${ЗОНЫ_Г[i][0]-ЗОНЫ_Г[i][2]-2} ${ЗОНЫ_Г[i][1]-[0,6,24][i]} L${68} ${[176,146,108][i]}" stroke="${видЗ[i]?ЗОНЫ[i].ц:'#4a525c'}" stroke-width=".8"/>`+тА(64,[179,149,111][i],ЗОНЫ[i].к,9,видЗ[i]?ЗОНЫ[i].ц:'#6a7480','end')).join('') +
      зоныНаж;
    const плитки = [['чашка','Чашка',Л.чашка(32,48,40,false)],['холод','Холодный стакан',Л.стакан(32,56,34,40,{уровень:0})],['известь','Изв. вода',Л.стакан(32,56,34,40,{уровень:.4,цвет:'hsla(40,15%,94%,.85)'})],['трубка','Трубка',Л.трубка('M12 50 L52 18')]];
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Свеча Фарадея') +
      `<div class="pic тёмная">${свгЖ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ЗОНЫ.map((x,i)=>BTN(3,(з===i?'вкл':'')+(видЗ[i]?' был':''),x.к,'r115з('+i+')')).join('')}</div>` +
      (з!=null ? A(4,'карт','<span class="метка">'+ЗОНЫ[з].к+' зона · '+ЗОНЫ[з].t+'</span><div class="текст">'+ЗОНЫ[з].что[0].toUpperCase()+ЗОНЫ[з].что.slice(1)+'.</div>') : СКАЗ('Пламя','Нажимай на зоны пламени прямо на рисунке или кнопками. Потом исследуй пламя четырьмя инструментами.')) +
      ПЛИТКИ(плитки,'r115и',4,инстр,ФАРАДЕЙ.map(x=>сд[x.к])) +
      (И ? РАЗБОР(true,И.итог[0].toUpperCase()+И.итог.slice(1)+'.') : '') +
      A(8,'карт','<span class="метка">Что нашли · '+ФАРАДЕЙ.filter(x=>сд[x.к]).length+' из 4</span><table class="итоги узкая два"><tr><th>Инструмент</th><th>что узнали</th></tr>'+
        ФАРАДЕЙ.map(x=>сд[x.к]?`<tr><td>${x.имя}</td><td>${x.прод}</td></tr>`:`<tr class="пусто"><td>${x.имя}</td><td>—</td></tr>`).join('')+'</table>') +
      (всеИ ? ОТВЕТЫ('',['углекислый газ и вода','только дым','кислород'],0,в,2) + (в==null ? СКАЗ('Вопрос','Что образуется при горении свечи?') :
        РАЗБОР(ок,['Верно: CO₂ и H₂O. Сажа — то, что не успело сгореть.','Дым — это сажа, но главное, что получается, — <b>углекислый газ и вода</b>.','Кислород не образуется — он расходуется.'][в])) : '') +
      (всеЗ&&ок ? ОТВЕТЫ('три',['тёмная','светящаяся','внешняя'],2,в2,'2б') + (в2==null ? СКАЗ('Вопрос','Какая зона пламени самая горячая?') :
        РАЗБОР(ок2,['В тёмной зоне холоднее всего — там пары ещё не горят.','Светящаяся — горячая, но во внешней кислорода больше и сгорание полное.','Верно: во внешней зоне около 1400 °C.'][в2])) : '') +
      (ок&&ок2 ? ТЕОРИЯ('пламя свечи','Фитиль впитывает расплавленный парафин, тот испаряется — горит не воск, а его <b>пары</b>. У фитиля — тёмная зона: пары ещё не горят. Выше — светящаяся: частицы <b>сажи</b> раскаляются и светятся. Снаружи — тонкая внешняя зона, где всё сгорает до <b>CO₂ и H₂O</b>.') +
        ДИВО('В 1848 году Майкл Фарадей прочитал детям шесть рождественских лекций об одной свече — «Химическая история свечи». Почти все опыты этого шага — оттуда.') +
        ПРАВИЛО('Свеча + кислород → <b>углекислый газ + вода</b> + тепло и свет.') : '');
  }

  /* 3. Бумажный стаканчик */
  const стаканчик = (x,низ,сгорел,вода,гореть) => { if(сгорел) return `<path d="M${x-14} ${низ+2} q6 -10 14 -4 q8 -8 14 4 q-6 6 -14 2 q-8 4 -14 -2 Z" fill="#1a1614"/><path d="M${x-8} ${низ-2} q4 -4 8 0" stroke="#5a4a40" stroke-width="1" fill="none"/>`;
    const верх=низ-50, ц=гореть?'#c8a070':'#f4f0e6';
    return `<g><path d="M${x-25} ${верх} L${x-17} ${низ} H${x+17} L${x+25} ${верх} Z" fill="${ц}"/><path d="M${x-25} ${верх} L${x-17} ${низ} H${x-11} L${x-18} ${верх} Z" fill="#fff" opacity=".3"/>
      ${вода?`<path d="M${x-21.5} ${верх+12} L${x-17} ${низ-1} H${x+17} L${x+21.5} ${верх+12} Z" fill="hsla(198,60%,72%,.55)"/>`:''}
      <path d="M${x-25} ${верх} L${x-17} ${низ} H${x+17} L${x+25} ${верх}" fill="none" stroke="#c8bca8" stroke-width=".8"/><ellipse cx="${x}" cy="${верх}" rx="25" ry="3" fill="${вода?'hsla(198,60%,78%,.7)':'#e8e0d0'}" stroke="#c8bca8" stroke-width=".8"/>
      ${гореть?`<path d="M${x-17} ${низ} H${x+17}" stroke="#2a1a10" stroke-width="3"/>`:''}</g>`; };
  function F3(s){
    const Н=280, y0=236, у=y0+14, Л=L_(), т=s.сек3||0, вид=s.вид3||{0:true}, все=вид[3], в=s.ответ3, ок=в===0;
    const xs=[96,240], низ=у-82;
    const tп=ПУСТОЙ[т], tв=ВОДА3[т], сгорел=tп==null, горит=т===2;
    const стойка = (x) => `<rect x="${x-56}" y="${у-6}" width="40" height="6" rx="2" fill="#2a2f35"/><rect x="${x-46}" y="${низ-60}" width="4" height="${у-низ+54}" fill="url(#рл-сталь)"/><path d="M${x-44} ${низ-36} H${x-24}" stroke="url(#рл-сталь)" stroke-width="3"/><ellipse cx="${x}" cy="${низ-36}" rx="24" ry="4" fill="none" stroke="#9aa0a8" stroke-width="2.4"/>`;
    const пр = стойка(xs[0]) + стойка(xs[1]) + Л.спиртовка(xs[0],у,1.3,true) + Л.спиртовка(xs[1],у,1.3,true);
    const поверх = стаканчик(xs[0],низ,сгорел,false,т>=1&&!сгорел) + (горит?огонь(xs[0],низ-6,46,13,.7)+огонь(xs[0]-12,низ-24,28,7,.55)+огонь(xs[0]+12,низ-30,30,7,.65):'') + (сгорел?дым(xs[0],низ-20,3,'#8a8e94'):'') +
      стаканчик(xs[1],низ,false,true,false) + (т===3?Array.from({length:10},(_,k)=>`<circle cx="${xs[1]-14+(k*29)%28}" cy="${низ-6}" r="${1+(k%3)*0.6}" fill="none" stroke="#fff" stroke-width=".8">${ДВ()?`<animate attributeName="cy" values="${низ-6};${низ-36}" dur="${(0.7+(k%4)*0.2).toFixed(2)}s" repeatCount="indefinite"/>`:''}</circle>`).join('')+пар(xs[1],низ-56,3):'') +
      (сгорел?метка(xs[0],34,'стаканчик сгорел',КР,{кегль:10}):Л.термопара(xs[0],28,tп)) + Л.термопара(xs[1],28,tв) + тА(xs[0],у+12,'пустой',10,'#c8ced6') + тА(xs[1],у+12,'с водой',10,'#c8ced6') +
      метка(168,4,СЕК[т],т?КР:ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Бумажный стаканчик на огне') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(4,minmax(0,1fr))">${СЕК.map((m,i)=>BTN(3,т===i?'вкл':'',m,'r115т('+i+')')).join('')}</div>` +
      A(4,'карт','<span class="метка">Термопары</span><table class="итоги"><tr><th>Стакан</th>'+СЕК.map(m=>'<th>'+m+'</th>').join('')+'</tr>'+
        '<tr><td>пустой</td>'+ПУСТОЙ.map((v,i)=>'<td>'+(вид[i]?(v==null?'сгорел':v+'°'):'—')+'</td>').join('')+'</tr><tr><td>с водой</td>'+ВОДА3.map((v,i)=>'<td>'+(вид[i]?v+'°':'—')+'</td>').join('')+'</tr></table>') +
      (!все ? СКАЗ('Опыт','Два одинаковых бумажных стаканчика над одинаковыми спиртовками. В правом — вода. Листай время и следи за термопарами.') :
        ОТВЕТЫ('',['вода забирает тепло и держится на 100 °C, а бумага загорается при 233 °C','вода не пускает кислород к бумаге'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Почему стаканчик с водой не сгорел?') :
          РАЗБОР(ок,['Верно: пока есть вода, бумага не нагреется выше 100 °C — до её температуры воспламенения не дойдёт.','Снаружи стаканчик окружён воздухом — кислород есть. Дело в температуре: вода не даёт бумаге нагреться выше 100 °C.'][в]))) +
      (ок ? ТЕОРИЯ('температура воспламенения','Каждое горючее вспыхивает, только нагревшись до своей <b>температуры воспламенения</b>: спичечная головка — около 200 °C, бумага — около 233 °C, дерево — около 300 °C, каменный уголь — около 400 °C. Вода тушит огонь именно так: забирает тепло.') +
        ДИВО('Роман Рэя Брэдбери «451 градус по Фаренгейту» назван по температуре, при которой загорается бумага: 451 °F — это примерно 233 °C.') +
        ПРАВИЛО('Нет нужной температуры — нет горения.') : '');
  }

  /* 4. Горелка: полное и неполное горение */
  function F4(s){
    const Н=272, y0=230, у=y0+14, Л=L_(), в=s.в4==null?2:s.в4, вид=s.вид4||{}, ч=s.ч4||{}, все=[0,1,2].every(i=>вид[i]), о=s.ответ4, ок=о===0, З=ЗАСЛОНКА[в];
    const чашкаТут=!!ч[в];
    const пр = Л.горелка(110,у,1.15,в,true);
    const поверх = (чашкаТут ? Л.чашка(110,у-88*1.15-(в===0?56:в===1?44:30),46,в<2) + `<path d="M133 ${у-88*1.15-(в===0?60:в===1?48:34)} L180 ${у-88*1.15-(в===0?84:в===1?72:58)}" stroke="url(#рл-сталь)" stroke-width="3"/>` : '') +
      Л.термопара(258,58,З.t) + метка(258,82,'пламя: '+З.пламя,З.ц,{кегль:9}) + метка(258,112,'продукты: '+З.прод,в===2?ЗЕ:КР,{кегль:9}) +
      (чашкаТут ? метка(258,142,в<2?'на чашке сажа!':'чашка чистая',в<2?КР:ЗЕ,{кегль:9}) : '') + метка(110,4,'заслонка '+З.имя,З.ц,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3','Горелка: полное и неполное горение') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ЗАСЛОНКА.map((x,i)=>BTN(3,в===i?'вкл':'',x.имя,'r115в('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,чашкаТут?'hit':'',чашкаТут?'Чашка в пламени':'Подержать фарфоровую чашку над пламенем',чашкаТут?'':"r115ч()")}</div>` +
      СКАЗ('Опыт','В горелку идёт газ метан. Снизу трубки — заслонка: она впускает воздух. Поверни её во все три положения и проверь каждое пламя чашкой.') +
      (все ? ОТВЕТЫ('пара',['синее — горячее и чище','жёлтое — горячее и чище'],0,о,4) + (о==null ? СКАЗ('Вопрос','Какое пламя горячее и чище?') :
        РАЗБОР(ок,['Верно: с воздухом газ сгорает полностью — 1500 °C, без сажи.','Жёлтое пламя светится сажей — газ сгорает не полностью, и оно холоднее.'][о])) : '') +
      (ок ? ТЕОРИЯ('полное и неполное горение','Если кислорода хватает, метан сгорает <b>полностью</b>: CH₄ + 2O₂ → CO₂ + 2H₂O — пламя синее и горячее. Если не хватает — горение <b>неполное</b>: получаются сажа (C) и ядовитый <b>угарный газ CO</b>, пламя жёлтое и коптит.') +
        ДИВО('Пламя газовой плиты дома должно быть голубым. Жёлтые языки и копоть на дне кастрюли — сигнал вызвать мастера: газ сгорает не полностью и может выделяться угарный газ. У него нет ни цвета, ни запаха — его ловят специальные датчики.') +
        ПРАВИЛО('Много кислорода — <b>синее</b> пламя и CO₂. Мало — <b>жёлтое</b>, сажа и угарный газ.') : '');
  }

  /* 5. Микромир: уравняем горение метана */
  function F5(s){
    const Н=262, y0=262, Л=L_(), o=s.o5||1, w=s.w5||1, рав=o===2&&w===2, сж=!!s.сж5&&рав, в=s.ответ5, ок=в===0;
    const лево = Л.молекула(48,120,0.95,'CH4',{подписи:true}) + Array.from({length:o},(_,i)=>Л.молекула(118,64+i*48,0.95,'O2',{подписи:true})).join('');
    const право = Л.молекула(226,70,0.85,'CO2',{подписи:true}) + Array.from({length:w},(_,i)=>Л.молекула(292,64+i*50,0.9,'H2O',{подписи:true})).join('');
    const сч = (сторона) => { const C=1, H=сторона?2*w:4, O=сторона?2+w:2*o; return {C,H,O}; };
    const Л0=сч(false), П0=сч(true);
    const поверх = (сж?`<circle cx="168" cy="110" r="70" fill="url(#рл-жар)" filter="url(#рл-ореол)"/>`:'') + `<g opacity="${сж?.35:1}">${лево}</g>` + `<g opacity="${сж||рав?1:.9}">${право}</g>` +
      `<path d="M150 112 H186 M178 105 L188 112 L178 119" stroke="${рав?'#8fd1a8':'#6a7480'}" stroke-width="2.6" fill="none"/>` +
      метка(168,4,'CH₄ + '+(o>1?o:'')+'O₂ → CO₂ + '+(w>1?w:'')+'H₂O',рав?ЗЕ:ЗЛ,{кегль:13}) +
      ['C','H','O'].map((а,i)=>{ const x=60+i*108, ok=Л0[а]===П0[а]; return `<rect x="${x-46}" y="216" width="92" height="30" rx="8" fill="${ok?'rgba(58,154,90,.25)':'rgba(200,64,42,.22)'}" stroke="${ok?'#8fd1a8':'#e86a5a'}"/>`+тА(x,236,а+': '+Л0[а]+' → '+П0[а]+(ok?' ✓':' ✗'),12,ok?'#c8f0d4':'#ffc8c0'); }).join('');
    const кн = (что,зн,подп) => BTN(3,'',`<b style="font-size:20px">${зн}</b>`,"r115к('"+что+"',"+(зн==='+'?1:-1)+")");
    return ЖУРНАЛ(s) + ШАПКА('Микромир','Уравняй горение метана') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      `<div class="коэф-пульт" data-anim style="--i:3"><div><span>O₂ слева</span>${кн('o','−')}<b>${o}</b>${кн('o','+')}</div><div><span>H₂O справа</span>${кн('w','−')}<b>${w}</b>${кн('w','+')}</div></div>` +
      (рав ? (сж ? '' : `<div class="ask">${BTN(5,'hit','Поджечь метан →',"r115сж()")}</div>`) : СКАЗ('Задание','Атомы не исчезают и не появляются. Подбери число молекул кислорода и воды, чтобы слева и справа стало поровну атомов C, H и O.')) +
      (рав ? РАЗБОР(true,'Уравнено: 1 C, 4 H и 4 O с каждой стороны.') : '') +
      (сж ? ОТВЕТЫ('',['углекислый газ и вода','только углекислый газ','сажа и кислород'],0,в,5) + (в==null ? СКАЗ('Вопрос','Что получается при полном сгорании природного газа?') :
        РАЗБОР(ок,['Верно: CO₂ и H₂O — два продукта.','Водород метана тоже сгорает — получается ещё и вода.','Сажа бывает только при нехватке кислорода, а кислород расходуется.'][в])) : '') +
      (ок ? ТЕОРИЯ('уравнение горения','При горении атомы перестраиваются: углерод соединяется с кислородом в CO₂, водород — в H₂O. Число атомов каждого вида до и после реакции одинаково: CH₄ + 2O₂ → CO₂ + 2H₂O. А уголь горит проще: C + O₂ → CO₂.') +
        ПРАВИЛО('Сколько атомов было — столько и осталось. Поэтому перед O₂ и H₂O стоят <b>двойки</b>.') : '');
  }

  /* 6. Пожарный тренажёр */
  const ПОЖАР_РИС = (к,погашен,у) => { const Л=L_();
    if(к==='масло') return `<rect x="80" y="${у-20}" width="176" height="20" rx="3" fill="#2a2e34"/><ellipse cx="168" cy="${у-20}" rx="40" ry="5" fill="#ff5a2a" opacity="${погашен?0:.6}"/>
      <ellipse cx="168" cy="${у-26}" rx="44" ry="9" fill="#3a3e44"/><ellipse cx="168" cy="${у-28}" rx="38" ry="6.5" fill="#1a1c1f"/><path d="M212 ${у-28} L262 ${у-38}" stroke="#2a2a2a" stroke-width="6" stroke-linecap="round"/>
      ${погашен?`<ellipse cx="168" cy="${у-32}" rx="42" ry="8" fill="url(#рл-сталь)"/><circle cx="168" cy="${у-40}" r="5" fill="#2a2a2a"/>${дым(168,у-46,2)}`:огонь(150,у-30,60,13,.6)+огонь(178,у-30,74,15,.7)+огонь(194,у-30,48,10,.5)}`;
    if(к==='корзина') return `<path d="M136 ${у} L128 ${у-56} H208 L200 ${у} Z" fill="#3a4048"/>${Array.from({length:7},(_,k)=>`<path d="M${132+k*12} ${у-56} L${138+k*10} ${у}" stroke="#5a626c" stroke-width="1"/>`).join('')}
      <path d="M134 ${у-56} q10 -12 20 0 q8 -10 18 -2 q10 -10 22 2" fill="#f4f0e6"/>${погашен?дым(168,у-60,3)+`<ellipse cx="168" cy="${у-56}" rx="36" ry="4" fill="hsla(198,60%,75%,.6)"/>`:огонь(156,у-58,56,12,.6)+огонь(182,у-58,44,10,.5)}`;
    if(к==='спирт') return `<rect x="40" y="${у-6}" width="256" height="6" fill="url(#рл-доска)"/>${погашен?`<path d="M90 ${у-6} Q100 ${у-36} 168 ${у-38} Q236 ${у-36} 246 ${у-6} Z" fill="#7a6a5a"/>${дым(168,у-44,3)}`:`<ellipse cx="168" cy="${у-7}" rx="70" ry="5" fill="hsla(198,40%,80%,.4)"/>`+огонь(118,у-8,30,8,.5)+огонь(150,у-8,40,10,.6)+огонь(186,у-8,36,9,.55)+огонь(218,у-8,28,8,.5)}`;
    if(к==='удлинитель') return `<rect x="96" y="${у-14}" width="120" height="14" rx="4" fill="#f0f0ec"/>${[0,1,2].map(k=>`<circle cx="${120+k*36}" cy="${у-7}" r="3.4" fill="#2a2a2a"/>`).join('')}<path d="M216 ${у-7} Q270 ${у-7} 282 ${у-36}" stroke="#f0f0ec" stroke-width="4" fill="none"/>
      <rect x="290" y="${у-82}" width="30" height="40" rx="4" fill="#e8e8e4"/><circle cx="305" cy="${у-62}" r="9" fill="#d8d8d4"/><circle cx="302" cy="${у-62}" r="1.4" fill="#5a5a5a"/><circle cx="308" cy="${у-62}" r="1.4" fill="#5a5a5a"/>
      ${погашен?`<rect x="270" y="${у-40}" width="10" height="16" rx="2" fill="#2a2a2a"/>${дым(140,у-20,2)}`:`<rect x="298" y="${у-56}" width="14" height="16" rx="2" fill="#2a2a2a"/>`+огонь(128,у-14,40,10,.5)+огонь(150,у-14,30,8,.6)+`<path d="M170 ${у-30} l6 -10 l-4 0 l6 -10" stroke="#ffe86a" stroke-width="2" fill="none"/>`}`;
    return `<ellipse cx="168" cy="${у-4}" rx="70" ry="8" fill="#3a3430"/>${[0,1,2,3,4,5,6].map(k=>`<ellipse cx="${108+k*20}" cy="${у-4}" rx="9" ry="6" fill="#7a7470"/>`).join('')}
      <path d="M130 ${у-6} L206 ${у-30} M206 ${у-6} L130 ${у-30}" stroke="#6a4a2a" stroke-width="9" stroke-linecap="round"/><path d="M150 ${у-6} L186 ${у-36}" stroke="#7a5a32" stroke-width="8" stroke-linecap="round"/>
      ${погашен?`<ellipse cx="168" cy="${у-12}" rx="40" ry="6" fill="#d8b878" opacity=".9"/>${пар(168,у-20,3)}`:огонь(156,у-18,56,13,.6)+огонь(178,у-18,64,14,.7)+`<circle cx="168" cy="${у-12}" r="10" fill="#ff7a2a" opacity=".8"/>`}`;
  };
  const ЗНАЧОК_И = { вода: () => L_().ведро(32,58,1,'вода'), крышка: () => `<ellipse cx="32" cy="38" rx="24" ry="7" fill="url(#рл-сталь)"/><circle cx="32" cy="30" r="4" fill="#2a2a2a"/>`,
    покрывало: () => `<path d="M10 48 Q14 22 34 22 Q54 22 54 46 Z" fill="#8a7a6a"/><path d="M14 44 Q30 36 50 44" stroke="#6a5a4a" stroke-width="1.4" fill="none"/>`, песок: () => L_().ведро(32,58,1,'песок'),
    огнетушитель: () => L_().огнетушитель(30,62,0.7), ток: () => `<rect x="18" y="14" width="28" height="38" rx="5" fill="#e8e8e4"/><rect x="26" y="22" width="12" height="20" rx="3" fill="#2a2a2a"/><path d="M34 24 l-6 9 h5 l-4 8" stroke="#ffd700" stroke-width="2" fill="none"/>` };
  function F6(s){
    const Н=250, y0=206, у=y0+14, Л=L_(), n=Math.min(s.п6||0,ПОЖАРЫ.length-1), ок=!!s.ок6, отз=s.отз6, вспышка=s.всп6, готовых=n+(ок?1:0), все=готовых>=ПОЖАРЫ.length, П=ПОЖАРЫ[n];
    const стор=ок?УБРАЛИ[s.инстр6]:null;
    const вкл = {г:1,к:стор==='к'?0:1,т:стор==='т'?0:1};
    const поверх = (вспышка==='шар' ? `<ellipse cx="168" cy="${у-110}" rx="110" ry="70" fill="url(#рл-жар)" filter="url(#рл-ореол)"/>`+огонь(168,у-30,150,40,.4) : '') +
      (вспышка==='ток' ? [0,1,2,3].map(k=>`<path d="M${140+k*14} ${у-40} l8 -14 l-6 0 l8 -14" stroke="#fff6a0" stroke-width="2.4" fill="none"/>`).join('')+`<circle cx="160" cy="${у-60}" r="30" fill="#fff6a0" opacity=".2" filter="url(#рл-ореол)"/>` : '') +
      Л.треугольникОгня(250,76,26,вкл) + метка(150,4,(n+1)+' из 5 · '+П.ф,ок?ЗЕ:КР,{кегль:10});
    const сп = ПОЖАРЫ.filter((x,k)=>k<готовых).map(x=>'<li><b>'+x.ф+'</b> — '+x.ок.map(к=>ИНСТР.find(и=>и.к===к).имя.toLowerCase()).join(' или ')+'</li>').join('');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 4','Пожарный тренажёр') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,ПОЖАР_РИС(П.к,ок,у),поверх),Н)}</div>` +
      ТОЧКИ(ПОЖАРЫ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Пожар '+(n+1)+' из 5</span><div class="текст">'+П.ф+'. Чем тушить?</div>') + ПЛИТКИ(ИНСТР.map(x=>[x.к,x.имя,ЗНАЧОК_И[x.к]()]),'r115п',3,null)) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий пожар →',"r115пдальше()")}</div>` : '') +
      (готовых ? A(8,'карт','<span class="метка">Памятка пожарного · '+готовых+' из 5</span><ul class="памятка">'+сп+'</ul>') : '') +
      (все ? ТЕОРИЯ('тушение','Тушить — значит убрать одну сторону треугольника огня. <b>Крышка, покрывало, песок, пена</b> перекрывают кислород. <b>Вода</b> охлаждает ниже температуры воспламенения. <b>Перекрыть газ, обесточить, убрать дрова</b> — убрать горючее и источник нагрева. Горящее масло и электроприборы водой не тушат.') +
        ДИВО('Огненный шар от стакана воды в кастрюлю с горящим маслом — один из самых опасных кухонных пожаров: литр масла превращается в огненное облако размером с комнату.') +
        ПРАВИЛО('Сначала безопасность: позвать взрослых, при пожаре звонить <b>101</b> или <b>112</b>.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=226, y0=184, у=y0+14, Л=L_();
    const пр = Л.свеча(50,у,1.2,true) + Л.горелка(116,у,0.85,2,true);
    const поверх = Л.треугольникОгня(246,100,36,{г:1,к:1,т:1}) + метка(168,6,'горючее + кислород + тепло',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Горение</b> — реакция с кислородом с выделением тепла и света.<br>• Нужны горючее, кислород и температура воспламенения.<br>• Свеча и газ сгорают в <b>CO₂ и H₂O</b>; при нехватке кислорода — сажа и угарный газ.<br>• Самая горячая зона пламени — внешняя.<br>• Тушат, убирая одно из условий: крышка и песок — кислород, вода — температуру.</div>') +
      ПРАВИЛО('Масло и электроприборы водой <b>не тушат</b>.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.свеча(244+i*34,y0+14,0.66,i<3-ош)).join('') + Л.огнетушитель(70,y0+14,0.9);
    const поверх = все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(278,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Огонь ты понимаешь — и знаешь, как его остановить.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r115заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r115мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('Горючее + кислород + тепло = огонь.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Почему одеяло гасит огонь?', варианты:[{т:'перекрывает доступ кислорода',ок:true},{т:'охлаждает пламя',ок:false}], разбор:'Без кислорода горение прекращается.' },
    { вопрос:'Что необходимо для горения свечи?', варианты:[{т:'только тепло',ок:false},{т:'горючее, кислород и тепло',ок:true}], разбор:'Все три условия.' },
    { вопрос:'C + O₂ → CO₂. Сколько атомов в молекуле CO₂?', варианты:[{т:'3',ок:true},{т:'2',ок:false}], разбор:'1 углерод + 2 кислорода.' },
    { вопрос:'Горящее масло на сковороде…', варианты:[{т:'заливают водой',ок:false},{т:'накрывают крышкой',ок:true}], разбор:'Вода даст огненный шар.' },
    { вопрос:'Продукты горения метана —', варианты:[{т:'CO₂ и H₂O',ок:true},{т:'только сажа',ок:false}], разбор:'CH₄ + 2O₂ → CO₂ + 2H₂O.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r115Reset()")}</div>` +
        ПРАВИЛО('Горючее, кислород, тепло.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r115Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const строки = (t0,макс) => String(t0).split(' ').reduce((a,w)=>{ const п=a[a.length-1]; if(п!=null&&(п+' '+w).length<=макс) a[a.length-1]=п+' '+w; else a.push(w); return a; },[]);
  const Т = {
    т1:{ имя:'Чем тушить', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.ведро(40,y0+14,0.9,'вода')+Л.ведро(78,y0+14,0.9,'песок')+Л.огнетушитель(300,y0+14,0.8)+(отв?'':огонь(190,y0+12,56,13,.6)+огонь(214,y0+12,42,10,.5)),
          строки(з.ф,26).map((t0,i)=>тА(168,26+i*16,t0,13,'#ffd76a')).join('')+(отв?метка(200,96,з.ок,ЗЕ,{кегль:з.ок.length>26?9:11})+дым(200,y0,2):'')+(ст.серия>=3?метка(168,60,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } },
    т2:{ имя:'Треугольник огня', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=184, y0=172, отв=ст.ответ!=null, к0={кислород:'к',температуру:'т',горючее:'г'}[з.ок];
        return свгЛ(L_().студия(Н,y0)+Л.треугольникОгня(168,104,52,отв?{г:к0!=='г',к:к0!=='к',т:к0!=='т'}:{г:1,к:1,т:1})+метка(168,6,з.ф,ЗЛ,{кегль:з.ф.length>34?9:10})+(ст.серия>=3?метка(292,150,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } },
    т3:{ имя:'Продукты горения', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=172, y0=148, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.горелка(56,y0+14,0.7,2,true),
          `<rect x="112" y="26" width="208" height="92" rx="10" fill="rgba(12,14,18,.72)" stroke="#4a525c"/>`+строки(з.ф,24).map((t0,i)=>тА(216,52+i*16,t0,13,'#ffd76a')).join('')+тА(216,96,отв?'→ '+з.ок:'+ O₂ → ?',12,отв?'#8fe0b0':'#9aa3ad')+
          (ст.серия>=3?метка(216,124,'серия: '+ст.серия,ЗЕ,{кегль:10}):'')),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r115Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r115T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r115TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L115 = {
    id: ID, title: 'Горение', ico: '🔥',
    src: 'Химия · 5–6 класс · Горение', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: свеча Фарадея — зоны пламени и продукты горения.',
      'Опыт 2: бумажный стаканчик на огне.',
      'Опыт 3: горелка — полное и неполное горение.',
      'Микромир: уравняй горение метана.',
      'Опыт 4: пожарный тренажёр.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: чем тушить.',
      'Тренажёр 2: треугольник огня.',
      'Тренажёр 3: продукты горения.'
    ],
    check: { q: 'Почему одеяло гасит огонь?', choices: ['Оно охлаждает пламя','Перекрывает доступ кислорода','Убирает горючее','Создаёт ветер'], ans: 1, exp: 'Одеяло не пропускает кислород, а без кислорода горение прекращается.' },
    tasks: [
      { q: 'Что необходимо для горения свечи?', kind: 'choice', choices: ['Только тепло','Горючее, кислород и тепло','Только кислород','Вода и воздух'], ans: 1, tol: 0, hints: ['Топливо свечи — парафин.', 'Нужны все три условия: топливо, кислород, тепло.'], sol: 'Горению нужны горючее, кислород и тепло.' },
      { q: 'В реакции горения углерода C + O₂ → CO₂: сколько атомов в молекуле продукта CO₂?', kind: 'unit', ans: 3, tol: 0, hints: ['В CO₂ один углерод и два кислорода.', '1 + 2 = 3.'], sol: '1 + 2 = 3 атома в молекуле CO₂.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.горелка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L115.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Опыт 2',4:'Опыт 3',5:'Микромир',6:'Опыт 4',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l115n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Горение'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r115Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r115вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r115з=(i)=>{ const s=S(); if(!ЗОНЫ[i]) return; s.з2=i; const в=Object.assign({},s.видЗ2||{}); в[i]=true; s.видЗ2=в; chRender(0); };
  window.r115и=(i)=>{ const s=S(); const И=ФАРАДЕЙ[i]; if(!И) return; s.и2=i; const с=Object.assign({},s.сд2||{}); с[И.к]=true; s.сд2=с; if(ФАРАДЕЙ.every(x=>с[x.к])) s.дело_свеча=true; chRender(0); };
  window.r115т=(i)=>{ const s=S(); if(i<0||i>3) return; s.сек3=i; const в=Object.assign({0:true},s.вид3||{}); for(let k=0;k<=i;k++) в[k]=true; s.вид3=в; chRender(0); };
  window.r115в=(i)=>{ const s=S(); if(!ЗАСЛОНКА[i]) return; s.в4=i; const в=Object.assign({},s.вид4||{}); в[i]=true; s.вид4=в; chRender(0); };
  window.r115ч=()=>{ const s=S(); const в=s.в4==null?2:s.в4; const ч=Object.assign({},s.ч4||{}); ч[в]=true; s.ч4=ч; const ви=Object.assign({},s.вид4||{}); ви[в]=true; s.вид4=ви; chRender(0); };
  window.r115к=(что,d)=>{ const s=S(); if(что==='o') s.o5=Math.max(1,Math.min(3,(s.o5||1)+d)); else s.w5=Math.max(1,Math.min(3,(s.w5||1)+d)); if(!(s.o5===2&&s.w5===2)) s.сж5=false; chRender(0); };
  window.r115сж=()=>{ const s=S(); if((s.o5||1)===2&&(s.w5||1)===2) s.сж5=true; chRender(0); };
  window.r115п=(i)=>{ const s=S(); const n=s.п6||0, П=ПОЖАРЫ[n], И=ИНСТР[i]; if(!П||!И||s.ок6) return;
    if(П.ок.includes(И.к)){ s.ок6=true; s.инстр6=И.к; s.всп6=null; if(n>=ПОЖАРЫ.length-1) s.дело_пожарный=true;
      s.отз6={ок:true,т:П.р+' Убрали: '+({к:'кислород',т:'тепло (температуру)'}[УБРАЛИ[И.к]])+'.'}; }
    else { s.всп6 = П.к==='масло'&&И.к==='вода' ? 'шар' : П.к==='удлинитель'&&И.к==='вода' ? 'ток' : null;
      s.отз6={ок:false,т:(П.плохо&&П.плохо[И.к])||'Это не поможет. Подумай, какую сторону треугольника огня можно убрать.'}; }
    chRender(0); };
  window.r115пдальше=()=>{ const s=S(); if(!s.ок6||(s.п6||0)>=ПОЖАРЫ.length-1) return; s.п6=(s.п6||0)+1; s.ок6=false; s.отз6=null; s.всп6=null; s.инстр6=null; chRender(0); };
  window.r115мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r115заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r115Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r115Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r115T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r115TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r115Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L115,{__планПорядок:arr[м].__планПорядок}); else arr.push(L115); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU115={render:render, L:L115};
})();
