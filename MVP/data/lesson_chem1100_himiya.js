/* ============ ХИМИЯ · УРОК 1100 · «ЧТО ТАКОЕ ХИМИЯ» · ВВЕДЕНИЕ В ПРЕДМЕТ ============
   Первый урок химии: в плане (MVP/data/plan_order.js) стоит перед «Молекулы и формулы» (38).
   Манера NOBOOK, как уроки 39–115. Рисунки — MVP/data/ris_lab.js (window.РЛ).

   ШАГИ.
   1) Карточка: что изучает химия.
   2) Тела и вещества: гвоздь, стакан, свеча, монета, кольцо, кубик сахара — из какого вещества?
   3) Детектив «соль или сахар»: две банки с белым порошком — лупа, вода, нагревание в ложечке;
      «попробовать на вкус» — запрещено.
   4) Приборы химика: пробирка, колба, стакан, мерный цилиндр, спиртовка, пипетка, штатив, весы.
   5) Лента истории: медь древних мастеров, алхимики, Ломоносов (1756), Лавуазье (1789), Менделеев (1869).
   6) Первый опыт — «вулкан»: сода, краситель, моющее средство, уксус — пена извергается.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 1100;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'детектив', имя:'Детектив: соль или сахар', итог:'раскрыто'},
    {ключ:'приборы',  имя:'Приборы химика',           итог:'8 из 8'},
    {ключ:'марафон',  имя:'Проверка: марафон',        итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Узнать, что изучает химия, чем тело отличается от вещества, познакомиться с приборами химика и поставить первый опыт.'],
    ['Что изучает','<b>Химия</b> — наука о <b>веществах</b>: из чего они состоят, какие у них свойства и как одни вещества <b>превращаются</b> в другие. Сахар, вода, железо, кислород — всё это вещества.'],
    ['Химик','Химик исследует вещества и создаёт новые: лекарства, краски, пластмассы, удобрения, топливо. Он работает в лаборатории — по правилам, с приборами, и записывает каждое наблюдение.'],
    ['Ход урока','1. Тела и вещества.<br>2. Детектив: соль или сахар.<br>3. Приборы химика.<br>4. История химии.<br>5. Первый опыт — «вулкан».'],
    ['Безопасность','Первое правило химика: <b>ничего не пробовать на вкус</b> и не трогать руками без разрешения. Опыты — только с учителем, в очках. Всё, что неясно, — спросить.']
  ];
  const ТЕЛА = [
    {т:'Гвоздь',       вид:'гвоздь',  вар:['железо','стекло','сахар'],     в:0},
    {т:'Стакан',       вид:'стакан',  вар:['парафин','стекло','медь'],     в:1},
    {т:'Свеча',        вид:'свеча',   вар:['золото','железо','парафин'],   в:2},
    {т:'Монета',       вид:'монета',  вар:['медь','стекло','сахар'],       в:0},
    {т:'Кольцо',       вид:'кольцо',  вар:['парафин','золото','стекло'],   в:1},
    {т:'Кубик сахара', вид:'сахар',   вар:['соль','железо','сахар'],       в:2}
  ];
  const БАНКИ = [ {б:'A', что:'соль'}, {б:'B', что:'сахар'} ];
  const ПРОБЫ = [
    {к:'лупа',   имя:'Лупа'},
    {к:'вода',   имя:'Вода'},
    {к:'огонь',  имя:'Нагреть'},
    {к:'вкус',   имя:'На вкус'}
  ];
  const ИТОГ = {
    соль: {лупа:'кристаллы — ровные кубики', вода:'растворилась, раствор прозрачный', огонь:'не плавится, кристаллы потрескивают'},
    сахар:{лупа:'кристаллы неправильной формы', вода:'растворился, раствор прозрачный', огонь:'плавится и темнеет — получилась карамель'}
  };
  const СВЕТОФОР = [
    {имя:'жёлтый',  ц:'hsla(46,95%,55%,.85)',  т:'Раствор жёлтый: в нём почти не осталось кислорода.'},
    {имя:'зелёный', ц:'hsla(135,70%,40%,.85)', т:'Встряхнули — раствор позеленел: в него попал кислород из воздуха над жидкостью.'},
    {имя:'красный', ц:'hsla(350,75%,45%,.85)', т:'Прошло полминуты — раствор покраснел: кислород расходуется.'},
    {имя:'жёлтый',  ц:'hsla(46,95%,55%,.85)',  т:'Ещё через минуту — снова жёлтый. Встряхни — и всё повторится!'}
  ];
  const ДОМ = [
    {к:'соль',     имя:'Соль',         факт:'<b>Хлорид натрия NaCl.</b> Её добывают из морской воды и подземных пластов. Без соли организм не может передавать нервные сигналы.'},
    {к:'сода',     имя:'Сода',         факт:'<b>Гидрокарбонат натрия NaHCO₃.</b> С кислотой выделяет углекислый газ — поэтому тесто с содой становится пышным.'},
    {к:'уксус',    имя:'Уксус',        факт:'<b>Раствор уксусной кислоты.</b> Его получают брожением — та же реакция превращает вино в уксус.'},
    {к:'мыло',     имя:'Мыло',         факт:'Мыло варят из жиров и щёлочи — это химическая реакция <b>омыления</b>. Молекула мыла одним концом цепляется за жир, другим — за воду.'},
    {к:'паста',    имя:'Зубная паста', факт:'В пасте есть <b>соединения фтора</b>: они делают эмаль зубов прочнее, а мел мягко её полирует.'},
    {к:'таблетки', имя:'Лекарства',    факт:'Лекарства создают химики-фармацевты. Аспирин впервые получили в чистом виде в 1897 году — и пьют до сих пор.'},
    {к:'батарейка',имя:'Батарейка',    факт:'Внутри батарейки идёт <b>химическая реакция</b>, и её энергия превращается в электрический ток.'},
    {к:'хлеб',     имя:'Хлеб',         факт:'Дрожжи выделяют <b>углекислый газ</b> — тесто поднимается. А румяная корочка — тоже реакция: сахара и белки темнеют при нагреве.'}
  ];
  const ЕЩЁ = {железо:'рельсы, сковорода, ключ', стекло:'окно, бусы, лампочка', парафин:'восковые мелки, пропитка спичек', медь:'провода, кастрюли, статуя Свободы', золото:'медали, контакты в телефоне', сахар:'конфеты, сироп, карамель'};
  const КОРОТКО = { соль:{лупа:'кубики', вода:'раств.', огонь:'нет'}, сахар:{лупа:'неровные', вода:'раств.', огонь:'карамель'} };
  const ПРИБОРЫ = [
    {к:'пробирка',  имя:'Пробирка',        зачем:'для опытов с малыми количествами веществ'},
    {к:'колба',     имя:'Колба',           зачем:'для нагревания и смешивания жидкостей'},
    {к:'стакан',    имя:'Химический стакан', зачем:'для растворов и опытов побольше'},
    {к:'цилиндр',   имя:'Мерный цилиндр',  зачем:'чтобы точно отмерить объём жидкости'},
    {к:'спиртовка', имя:'Спиртовка',       зачем:'чтобы нагревать'},
    {к:'пипетка',   имя:'Пипетка',         зачем:'чтобы добавлять жидкость по каплям'},
    {к:'штатив',    имя:'Штатив',          зачем:'чтобы закрепить посуду над огнём'},
    {к:'весы',      имя:'Весы',            зачем:'чтобы узнать массу вещества'}
  ];
  const ИСТОРИЯ = [
    {год:'7000 лет назад', кто:'Древние мастера',  что:'научились выплавлять медь из руды, потом — бронзу и железо. Химия началась с ремесла.', вид:'медь'},
    {год:'Средние века',   кто:'Алхимики',          что:'искали «философский камень», который превратит свинец в золото. Не нашли — зато открыли новые вещества и изобрели перегонный куб.', вид:'алхимик'},
    {год:'1756',           кто:'Михаил Ломоносов', что:'прокаливал металлы в запаянных сосудах и взвешивал: масса до и после опыта одинакова.', вид:'весы'},
    {год:'1789',           кто:'Антуан Лавуазье',  что:'объяснил горение соединением с кислородом и сформулировал закон сохранения массы.', вид:'кислород'},
    {год:'1869',           кто:'Дмитрий Менделеев',что:'открыл периодический закон и составил таблицу химических элементов.', вид:'таблица'}
  ];
  const ШАГИ6 = [
    {т:'Поставь химический стакан в поднос.',            что:'стакан'},
    {т:'Насыпь в стакан две ложки питьевой соды.',        что:'сода'},
    {т:'Добавь каплю красного пищевого красителя.',       что:'краситель'},
    {т:'Влей немного средства для мытья посуды.',          что:'моющее'},
    {т:'Влей уксус — и отойди!',                          что:'уксус'}
  ];
  const МАРАФОН = [
    {q:'Химия — наука о…', вар:['движении тел','веществах и их превращениях','живых организмах'], в:1, р:'Химия изучает вещества.'},
    {q:'Что из перечисленного — вещество?', вар:['гвоздь','железо','ложка'], в:1, р:'Гвоздь и ложка — тела, железо — вещество.'},
    {q:'Что из перечисленного — тело?', вар:['стакан','стекло','сахар'], в:0, р:'Стакан — тело, сделанное из стекла.'},
    {q:'Как химик отличает соль от сахара?', вар:['пробует на вкус','нагревает: сахар плавится','нюхает банку'], в:1, р:'На вкус в лаборатории не пробуют.'},
    {q:'Чем отмеряют точный объём жидкости?', вар:['мерным цилиндром','спиртовкой','пробиркой'], в:0, р:'Мерный цилиндр — с делениями.'},
    {q:'Чем добавляют жидкость по каплям?', вар:['штативом','пипеткой','колбой'], в:1, р:'Пипетка.'},
    {q:'Кто составил таблицу химических элементов?', вар:['Ломоносов','Лавуазье','Менделеев'], в:2, р:'Д. И. Менделеев, 1869 год.'},
    {q:'Ломоносов в запаянных сосудах показал, что масса…', вар:['сохраняется','исчезает','удваивается'], в:0, р:'Закон сохранения массы.'},
    {q:'Сода + уксус — пена и пузыри. Это…', вар:['химическая реакция','таяние','растворение'], в:0, р:'Образуется новое вещество — углекислый газ.'},
    {q:'Первое правило в лаборатории:', вар:['ничего не пробовать на вкус','работать быстро','смешивать всё подряд'], в:0, р:'Вещества могут быть ядовиты.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = [['гвоздь',0],['железо',1],['стакан',0],['стекло',1],['сахар',1],['ложка',0],['алюминий',1],['кубик льда',0],['вода',1],['карандаш',0],['графит',1],['монета',0],['медь',1],['свеча',0],['парафин',1],['кислород',1]]
    .map(([ф,в0])=>({q:'«'+ф+'» — тело или вещество?', ф:ф, вар:['тело','вещество'], в:в0, раз:в0?'Вещество — то, из чего сделаны тела.':'Тело — предмет, у которого есть форма и размер.'}));
  const П2 = поМесту([['Отмерить 50 мл воды','мерный цилиндр','пипетка'],['Добавить 3 капли индикатора','пипетка','колба'],['Нагреть жидкость','спиртовка','весы'],['Узнать массу соли','весы','штатив'],
    ['Закрепить колбу над огнём','штатив','пробирка'],['Провести опыт с каплей вещества','пробирка','весы'],['Приготовить раствор соли','химический стакан','спиртовка'],['Смешать и нагреть жидкости','колба','пипетка'],
    ['Взять порошок из банки','шпатель','пипетка'],['Защитить глаза','очки','перчатки'],['Перемешать раствор','стеклянная палочка','термометр'],['Измерить температуру','термометр','цилиндр'],
    ['Погасить спиртовку','колпачок','вода'],['Подержать пробирку над огнём','держатель','пальцы'],['Рассмотреть кристаллы','лупа','колба'],['Перелить жидкость в узкое горлышко','воронка','весы']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Какой прибор нужен?', ф:ф, ок:ок, нет:нет, раз:'Нужен '+ок+'.'})));
  const П3 = [['Как ржавеет железо',1],['Почему падает яблоко',0],['Из чего состоит вода',1],['Как летят птицы',0],['Почему горит свеча',1],['Как работает рычаг',0],['Как сделать лекарство',1],['Какой высоты гора',0],
    ['Почему скисает молоко',1],['Как устроен глаз',0],['Из чего делают пластмассу',1],['Сколько звёзд на небе',0],['Как получить кислород',1],['Почему идёт дождь',0],['Почему темнеет яблоко',1],['Как бьётся сердце',0]]
    .map(([ф,х])=>({q:'«'+ф+'» — это вопрос химии?', ф:ф, вар:['да, химия','нет, другая наука'], в:х?0:1, раз:х?'Да: речь о веществах и их превращениях.':'Нет: это вопрос физики, биологии или географии.'}));

  const CSS=`
  #lvis .s6.l1100n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l1100n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l1100n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l1100n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l1100n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l1100n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l1100n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l1100n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l1100n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l1100n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l1100n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l1100n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l1100n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l1100n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l1100n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l1100n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l1100n table.итоги td{white-space:normal!important}
  #lvis .s6.l1100n table.итоги td:first-child{width:46%}
  #lvis .s6.l1100n table.итоги{table-layout:fixed}
  #lvis .s6.l1100n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l1100n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l1100n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l1100n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l1100n .ask button{text-align:left}
  #lvis .s6.l1100n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l1100n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l1100n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l1100n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l1100n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l1100n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l1100n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l1100n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l1100n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l1100n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l1100n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l1100n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l1100n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l1100n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l1100n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l1100n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l1100n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l1100n .плитка span{text-align:center}
  #lvis .s6.l1100n .плитка:active{transform:scale(.96)}
  #lvis .s6.l1100n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l1100n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l1100n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l1100n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l1100n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l1100n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l1100n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l1100n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l1100n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l1100n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l1100n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l1100n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l1100n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l1100n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l1100n{gap:14px}
  #lvis .s6.l1100n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l1100n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l1100n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l1100n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l1100n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l1100n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l1100n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l1100n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l1100n .карт .текст b{color:${GOLD}}
  #lvis .s6.l1100n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l1100n .правило b{color:${GOLD}}
  #lvis .s6.l1100n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l1100n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l1100n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l1100n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l1100n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l1100n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l1100n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l1100n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l1100n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l1100n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l1100n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l1100n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l1100n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l1100n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l1100n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l1100n .буйки button.мимо{border-color:${RED};animation:l1100nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l1100nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l1100n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l1100n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1100n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l1100n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l1100n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l1100n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l1100n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l1100n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l1100n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l1100n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l1100n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l1100n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l1100n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l1100n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l1100n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l1100n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l1100n .уровни .точка.сейчас{background:${GOLD};animation:l1100ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l1100ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l1100n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l1100n{-webkit-text-size-adjust:100%}
  #lvis .s6.l1100n [data-anim]{animation:l1100nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l1100nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l1100n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l1100n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l1100n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l1100n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l1100n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l1100n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l1100n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l1100n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l1100n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l1100n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l1100n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l1100n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l1100n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l1100n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l1100n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l1100n .акт span.до{background:#24402c}
  #lvis .s6.l1100n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l1100n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l1100n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l1100n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l1100n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l1100n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l1100n .две-колонки li{margin:2px 0}
  #lvis .s6.l1100n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l1100n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l1100n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l1100n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l1100n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l1100n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l1100n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l1100n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l1100n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l1100n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l1100n ul.памятка li{margin:3px 0}
  #lvis .s6.l1100n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l1100n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l1100n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l1100n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l1100n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l1100n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l1100n table.тепло td,#lvis .s6.l1100n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l1100n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l1100n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l1100n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l1100n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l1100n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l1100n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l1100n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l1100n table.детектив th{width:auto!important}
  #lvis .s6.l1100n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l1100n table.детектив td{font-size:12.5px}
  #lvis .s6.l1100n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l1100n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l1100n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l1100n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l1100n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l1100n .коэф-пульт button:active{transform:translateY(2px)}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l1100n [data-anim]{animation:none!important}
    #lvis .s6.l1100n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l1100n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l1100n-style');
      if(!s){ s=document.createElement('style'); s.id='l1100n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r1100Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c1100-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c1100-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c1100-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c1100-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c1100-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c1100-плиты)"/>
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
  const ГР = `<defs>
    <linearGradient id="c1100-золото" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5206"/><stop offset=".22" stop-color="#e8b020"/><stop offset=".42" stop-color="#fff2b0"/><stop offset=".6" stop-color="#f0c030"/><stop offset=".85" stop-color="#a87a10"/><stop offset="1" stop-color="#6a4a06"/></linearGradient>
    <linearGradient id="c1100-золотоВ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6c0"/><stop offset=".5" stop-color="#f4c430"/><stop offset="1" stop-color="#b8860b"/></linearGradient>
    <linearGradient id="c1100-медь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a2a0c"/><stop offset=".28" stop-color="#d8844a"/><stop offset=".45" stop-color="#ffd4a8"/><stop offset=".62" stop-color="#c8743a"/><stop offset="1" stop-color="#6a3010"/></linearGradient>
    <radialGradient id="c1100-монета" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#ffe0c0"/><stop offset=".35" stop-color="#e8945a"/><stop offset=".8" stop-color="#b8642a"/><stop offset="1" stop-color="#7a3a14"/></radialGradient>
    <linearGradient id="c1100-железо" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a3e44"/><stop offset=".3" stop-color="#b8bec6"/><stop offset=".46" stop-color="#f4f6f8"/><stop offset=".62" stop-color="#9aa0a8"/><stop offset="1" stop-color="#3a3e44"/></linearGradient>
    <linearGradient id="c1100-сахарВ" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e6e2d8"/></linearGradient>
    <linearGradient id="c1100-сахарБ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0ece2"/><stop offset="1" stop-color="#d8d2c4"/></linearGradient>
    <linearGradient id="c1100-сахарП" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c8c2b2"/><stop offset="1" stop-color="#aaa494"/></linearGradient>
    <radialGradient id="c1100-пена" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#ffe8ee"/><stop offset=".45" stop-color="#ff8aa0"/><stop offset="1" stop-color="#c8284a"/></radialGradient>
    <linearGradient id="c1100-лава" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff9aac"/><stop offset="1" stop-color="#c82a48"/></linearGradient>
    <radialGradient id="c1100-корка" cx=".4" cy=".25" r=".85"><stop offset="0" stop-color="#f4c070"/><stop offset=".55" stop-color="#c8843a"/><stop offset="1" stop-color="#7a4414"/></radialGradient>
    <radialGradient id="c1100-мыло" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff0f4"/><stop offset=".5" stop-color="#f4b0c4"/><stop offset="1" stop-color="#c87898"/></radialGradient>
    <linearGradient id="c1100-фольга" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".35" stop-color="#a8b0b8"/><stop offset=".6" stop-color="#f8fafc"/><stop offset="1" stop-color="#8a929a"/></linearGradient>
    <radialGradient id="c1100-пилюля" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#eef0f2"/><stop offset="1" stop-color="#b8bec6"/></radialGradient>
    <linearGradient id="c1100-батарея" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#050506"/><stop offset=".32" stop-color="#4a4e56"/><stop offset=".55" stop-color="#16181b"/><stop offset="1" stop-color="#000"/></linearGradient>
    <linearGradient id="c1100-латунь" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a4a08"/><stop offset=".35" stop-color="#ffe08a"/><stop offset=".6" stop-color="#c89a2a"/><stop offset="1" stop-color="#5a3a06"/></linearGradient>
    <linearGradient id="c1100-тюбик" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#e4e8ec"/><stop offset="1" stop-color="#a8b0b8"/></linearGradient>
    <linearGradient id="c1100-шкаф" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a2c"/><stop offset="1" stop-color="#2a2018"/></linearGradient>
  </defs>`;
  const сцена = (Н,y0,предметы,поверх) => { const Л=L_(); return Л.студия(Н,y0)+Л.отражение(предметы,y0,Н-y0)+предметы+(поверх||''); };
  const свгЛ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${ГР}${тело}</svg>`;
  const свгЖ = (тело,высота) => `<svg viewBox="0 0 336 ${высота}" preserveAspectRatio="xMidYMid meet">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${ГР}${тело}</svg>`;
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
  const дым = (x,y,n,ц) => Array.from({length:n||2},(_,k)=>`<path d="M${x-4+k*7} ${y} q-6 -10 0 -20 q6 -10 0 -20" stroke="${ц||'#b8bec4'}" stroke-width="2" fill="none" opacity=".45" filter="url(#рл-дымка)">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 4;0 -8" dur="${1.6+k*0.3}s" repeatCount="indefinite"/>`:''}</path>`).join('');

  /* ---------- рисунки ---------- */
  const тень0 = (x,y,rx) => `<ellipse cx="${x+rx*0.12}" cy="${y+1}" rx="${rx}" ry="${Math.max(2.4,rx*0.12)}" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>`;
  const кольцо = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})">${тень0(0,0,24)}
    <ellipse cx="0" cy="-15" rx="25" ry="11.5" fill="none" stroke="#5a3a04" stroke-width="8.6"/>
    <ellipse cx="0" cy="-16.5" rx="25" ry="11.5" fill="none" stroke="url(#c1100-золото)" stroke-width="7"/>
    <ellipse cx="0" cy="-18" rx="25" ry="11.5" fill="none" stroke="url(#c1100-золотоВ)" stroke-width="2.4" opacity=".8"/>
    <path d="M-20 -24 q10 -6 24 -4" stroke="#fffbe0" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M14 -8 q6 -2 9 -6" stroke="#fff4c0" stroke-width="1.2" fill="none" opacity=".8"/>
    <circle cx="-8" cy="-27" r="1.6" fill="#fff"/></g>`;
  const кубик = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})">${тень0(2,0,20)}
    <path d="M-16 -26 L-6 -34 H18 L8 -26 Z" fill="url(#c1100-сахарВ)"/><path d="M8 -26 L18 -34 V-8 L8 0 Z" fill="url(#c1100-сахарП)"/><rect x="-16" y="-26" width="24" height="26" fill="url(#c1100-сахарБ)"/>
    ${Array.from({length:40},(_,k)=>{ const грань=k%3, xx=грань===0?-15+(k*7)%22:грань===1?-14+(k*5)%20:9+(k*3)%8, yy=грань===0?-25+(k*11)%24:грань===1?-32+(k*3)%6:-30+(k*13)%26;
      return `<rect x="${xx}" y="${yy}" width="${1+(k%2)*0.6}" height="${1+(k%2)*0.6}" fill="${k%4?'#cfcabd':'#ffffff'}" opacity=".85"/>`; }).join('')}
    <path d="M-16 -26 L-6 -34 H18" stroke="#fff" stroke-width=".9" fill="none"/><path d="M8 -26 V0" stroke="#b8b2a2" stroke-width=".6"/>
    ${[[-10,-30],[4,-31],[-12,-12]].map(([a,b])=>`<path d="M${a} ${b-2.4} l.6 1.8 l1.8 .6 l-1.8 .6 l-.6 1.8 l-.6 -1.8 l-1.8 -.6 l1.8 -.6 Z" fill="#fff"/>`).join('')}</g>`;
  const монета = (x,y,м) => `<g transform="translate(${x} ${y}) scale(${м||1})">${тень0(2,0,24)}
    <ellipse cx="0" cy="-3.6" rx="24" ry="8" fill="#6a3010"/><path d="M-24 -4 V-6.4 A24 8 0 0 0 24 -6.4 V-4 A24 8 0 0 1 -24 -4 Z" fill="url(#c1100-медь)"/>
    ${Array.from({length:22},(_,k)=>{ const a=Math.PI*(k/21), xx=-24*Math.cos(a); return `<path d="M${xx.toFixed(1)} ${(-4+8*Math.sin(a)*0.3).toFixed(1)} v-2" stroke="#8a4a1a" stroke-width=".5" opacity=".7"/>`; }).join('')}
    <ellipse cx="0" cy="-6.4" rx="24" ry="8" fill="url(#c1100-монета)"/><ellipse cx="0" cy="-6.4" rx="20" ry="6.4" fill="none" stroke="#9a5222" stroke-width="1.2"/><ellipse cx="0" cy="-6.8" rx="20" ry="6.4" fill="none" stroke="#ffd0a0" stroke-width=".6" opacity=".7"/>
    <text x="0.6" y="-3" text-anchor="middle" font-size="9" font-weight="bold" fill="#6a3010" font-family="Georgia,serif" transform="scale(1 .62) translate(0 -2.6)">10</text><text x="0" y="-3.6" text-anchor="middle" font-size="9" font-weight="bold" fill="#ffd8b0" font-family="Georgia,serif" transform="scale(1 .62) translate(0 -2.6)" opacity=".55">10</text>
    <path d="M-16 -11 q12 -4 24 -3" stroke="#fff4e0" stroke-width="1.6" fill="none" opacity=".85" stroke-linecap="round"/></g>`;
  const тело = (вид,x,у) => { const Л=L_();
    if(вид==='гвоздь') return Л.образец(x,у,'Fe',2.4);
    if(вид==='стакан') return Л.стакан(x,у,70,84,{уровень:0});
    if(вид==='свеча') return Л.свеча(x,у,1.6,true);
    if(вид==='монета') return монета(x,у,1.8);
    if(вид==='кольцо') return кольцо(x,у,1.6);
    return кубик(x,у,2);
  };
  const слиток = (x,у,гр,ц1,ц3,клеймо) => `<g>${тень0(x,у,34)}<ellipse cx="${x+4}" cy="${у+1.6}" rx="30" ry="2.4" fill="${ц1}" opacity=".18" filter="url(#рл-мягко)"/>
    <path d="M${x-31} ${у} L${x-23} ${у-19} H${x+23} L${x+31} ${у} Z" fill="url(#${гр})"/><path d="M${x-31} ${у} L${x-23} ${у-19}" stroke="#fff" stroke-width=".8" opacity=".5"/>
    <path d="M${x-23} ${у-19} H${x+23} L${x+16} ${у-26} H${x-16} Z" fill="${ц1}"/><path d="M${x-16} ${у-26} H${x+16}" stroke="#fff" stroke-width="1.2" opacity=".8"/>
    <path d="M${x+23} ${у-19} L${x+31} ${у} L${x+25} ${у} L${x+16} ${у-26} Z" fill="${ц3}"/>
    <rect x="${x-10}" y="${у-14}" width="20" height="8" rx="1.5" fill="none" stroke="${ц3}" stroke-width=".8" opacity=".8"/><text x="${x}" y="${у-8}" text-anchor="middle" font-size="5.6" font-weight="bold" fill="${ц3}" font-family="Arial">${клеймо||''}</text>
    <path d="M${x-14} ${у-23} H${x+6}" stroke="#fff" stroke-width="1.6" opacity=".55" stroke-linecap="round"/></g>`;
  const ВЕЩ_РИС = {железо:(x,у)=>слиток(x,у,'c1100-железо','#e8ecf0','#4a5058','Fe'), медь:(x,у)=>слиток(x,у,'c1100-медь','#ffc090','#7a3a14','Cu'), золото:(x,у)=>слиток(x,у,'c1100-золото','#fff2a8','#8a6008','Au 999'),
    стекло:(x,у)=>[[-18,0,10],[4,-2,-20],[20,0,30],[-4,4,60]].map(([dx,dy,у0])=>`<path d="M${x+dx} ${у+dy} l12 -16 l8 14 Z" transform="rotate(${у0} ${x+dx} ${у+dy})" fill="url(#рл-стекло)" stroke="#bcd4e2" stroke-width="1"/>`).join(''),
    парафин:(x,у)=>`<path d="M${x-26} ${у} q4 -16 16 -14 q6 -12 18 -2 q12 -4 16 16 Z" fill="url(#рл-воск)"/><path d="M${x-14} ${у-10} q6 -4 12 -2" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>`,
    сахар:(x,у)=>L_().кристаллы(x,у,56,16,'сахар',26,3)};
  /* ложечка с веществом над спиртовкой */
  const ложка = (x,y,вещ,нагрето) => `<g><path d="M${x+14} ${y-4} L${x+96} ${y-34}" stroke="#4a5058" stroke-width="4.4" stroke-linecap="round"/><path d="M${x+14} ${y-4} L${x+96} ${y-34}" stroke="url(#рл-сталь)" stroke-width="3" stroke-linecap="round"/><path d="M${x+20} ${y-7.4} L${x+92} ${y-34}" stroke="#fff" stroke-width=".7" opacity=".7"/>
    <path d="M${x-16} ${y-6} Q${x-16} ${y+6} ${x} ${y+6} Q${x+16} ${y+6} ${x+16} ${y-6} Z" fill="url(#рл-сталь)"/><path d="M${x-12} ${y-2} Q${x-8} ${y+3} ${x} ${y+3}" stroke="#fff" stroke-width="1" fill="none" opacity=".7"/>
    ${нагрето?`<ellipse cx="${x}" cy="${y+8}" rx="18" ry="6" fill="#ffb060" opacity=".25" filter="url(#рл-ореол)"/>`:''}
    ${вещ==='сахар'&&нагрето?`<ellipse cx="${x}" cy="${y-4}" rx="13" ry="4.6" fill="#6a3006"/><ellipse cx="${x}" cy="${y-4.6}" rx="11.5" ry="3.8" fill="#a85a14"/><ellipse cx="${x-3}" cy="${y-5.6}" rx="6" ry="1.4" fill="#f4c070" opacity=".9"/><circle cx="${x+4}" cy="${y-5.4}" r=".9" fill="#fff"/>${[0,1,2].map(k=>`<circle cx="${x-6+k*6}" cy="${y-5}" r="1.2" fill="none" stroke="#f4c890" stroke-width=".6"/>`).join('')}`
      :`<path d="M${x-12} ${y-4} Q${x} ${y-12} ${x+12} ${y-4} Z" fill="#f8f6f0"/>${Array.from({length:7},(_,k)=>`<rect x="${x-9+k*3}" y="${y-8+(k%2)}" width="2" height="2" fill="#e0dcd2"/>`).join('')}`}</g>`;
  const лупаКристаллы = (cx,cy,r,вещ) => L_().лупа(cx,cy,r,null,{внутри:`<rect x="${cx-r}" y="${cy-r}" width="${2*r}" height="${2*r}" fill="#20303c"/>`+
    (вещ==='соль' ? Array.from({length:9},(_,k)=>{ const x=cx-r*0.6+(k%3)*r*0.5, y=cy-r*0.55+Math.floor(k/3)*r*0.5, s=r*0.26; return `<path d="M${x} ${y} h${s} v${s} h${-s} Z" fill="#f4f8fa" stroke="#b8c8d4" stroke-width=".8"/><path d="M${x} ${y} l${s*0.3} ${-s*0.3} h${s} l${-s*0.3} ${s*0.3} Z" fill="#ffffff"/><path d="M${x+s} ${y} l${s*0.3} ${-s*0.3} v${s} l${-s*0.3} ${s*0.3} Z" fill="#d8e4ec"/>`; }).join('')
      : Array.from({length:7},(_,k)=>{ const x=cx-r*0.55+(k*37)%(r*1.1), y=cy-r*0.5+(k*23)%(r*1.0); return `<path d="M${x} ${y} l${r*0.22} ${-r*0.1} l${r*0.12} ${r*0.24} l${-r*0.18} ${r*0.18} l${-r*0.2} ${-r*0.06} Z" fill="#fbfaf4" stroke="#c8c4b4" stroke-width=".8"/>`; }).join('')),подпись:вещ==='соль'?'кубики':'неправильные'});
  /* перегонный куб алхимика */
  const алембик = (x,y) => `<g>${тень0(x,y,30)}<path d="M${x-26} ${y} Q${x-31} ${y-30} ${x} ${y-37} Q${x+31} ${y-30} ${x+26} ${y} Z" fill="url(#c1100-медь)"/>
    ${[-18,-6,6,18].map(d=>`<circle cx="${x+d}" cy="${y-6}" r="1.4" fill="#7a3a14"/><circle cx="${x+d-0.4}" cy="${y-6.4}" r=".5" fill="#ffd0a0"/>`).join('')}<path d="M${x-26} ${y-10} H${x+26}" stroke="#7a3a14" stroke-width="1.2"/>
    <path d="M${x-21} ${y-6} Q${x-24} ${y-26} ${x-6} ${y-33}" stroke="#ffe0c0" stroke-width="2" fill="none" opacity=".7"/>
    <path d="M${x-10} ${y-36} Q${x} ${y-58} ${x+12} ${y-41} L${x+60} ${y-20}" stroke="#7a3a14" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M${x-10} ${y-36} Q${x} ${y-58} ${x+12} ${y-41} L${x+60} ${y-20}" stroke="url(#c1100-медь)" stroke-width="5.6" fill="none" stroke-linecap="round"/>
    <path d="M${x+60} ${y-20} L${x+62} ${y-6}" stroke="#c8843a" stroke-width="4"/><circle cx="${x+62}" cy="${y-2}" r="1.8" fill="hsla(120,40%,60%,.9)">${ДВ()?`<animate attributeName="cy" values="${y-4};${y+16}" dur="1.4s" repeatCount="indefinite"/>`:''}</circle>
    ${L_().колба(x+66,y+30,0.4,{уровень:.3,цвет:'hsla(120,40%,60%,.6)'})}${L_().пламя(16,5,.7).replace('<g>','<g transform="translate('+x+' '+(y+12)+')">')}</g>`;

  /* искры-звёздочки */
  const искры = (n,x0,y0,ш,в) => Array.from({length:n},(_,k)=>{ const x=x0+((k*53)%ш), y=y0+((k*37)%в), r=1.2+(k%3)*0.7;
    return `<path d="M${x} ${y-r*2.4} L${x+r*0.5} ${y-r*0.5} L${x+r*2.4} ${y} L${x+r*0.5} ${y+r*0.5} L${x} ${y+r*2.4} L${x-r*0.5} ${y+r*0.5} L${x-r*2.4} ${y} L${x-r*0.5} ${y-r*0.5} Z" fill="#fff6c8" opacity=".8">${ДВ()?`<animate attributeName="opacity" values="0;.95;0" dur="${(1.6+(k%5)*0.5).toFixed(1)}s" begin="${((k%7)*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}</path>`; }).join('');
  /* бытовые вещи для шага «Химия дома»: (x,y) — низ */
  const ВЕЩЬ_ДОМ = {
    соль:(x,y)=>L_().банка(x,y,34,46,{содержимое:'соль',надпись:['соль']}),
    сода:(x,y)=>L_().банка(x,y,34,46,{содержимое:'соль',надпись:['сода']}),
    уксус:(x,y)=>L_().склянка(x,y,30,62,{уровень:.7,цвет:'hsla(198,40%,88%,.35)',этикетка:['уксус'],полоса:'#c8402a'}),
    мыло:(x,y)=>`<g>${тень0(x,y,26)}<ellipse cx="${x}" cy="${y-3}" rx="27" ry="5.4" fill="url(#рл-сталь)"/><ellipse cx="${x}" cy="${y-4}" rx="23" ry="3.6" fill="#a8b0b8"/><rect x="${x-19}" y="${y-19}" width="38" height="15" rx="7" fill="url(#c1100-мыло)"/><rect x="${x-14}" y="${y-17}" width="20" height="3.6" rx="1.8" fill="#fff" opacity=".7"/><text x="${x}" y="${y-8}" text-anchor="middle" font-size="5" font-weight="bold" fill="#b86a88" font-family="Georgia,serif" opacity=".8">МЫЛО</text>
      ${[0,1,2].map(k=>`<circle cx="${x+8+k*6}" cy="${y-26-k*6}" r="${2.6+k}" fill="url(#рл-стекло)" stroke="#e8f4ff" stroke-width=".7" opacity=".85"/><circle cx="${x+7+k*6}" cy="${y-27-k*6}" r=".8" fill="#fff"/>`).join('')}</g>`,
    паста:(x,y)=>`<g>${тень0(x,y,28)}<path d="M${x-30} ${y-1} L${x-30} ${y-9} L${x+14} ${y-15} Q${x+16} ${y-8} ${x+14} ${y-1} Z" fill="url(#c1100-тюбик)"/><path d="M${x-30} ${y-9} L${x-30} ${y-1}" stroke="#c8ccd0" stroke-width="2.4"/>${[0,1,2].map(k=>`<path d="M${x-29} ${y-8+k*2.6} h2" stroke="#9aa0a8" stroke-width=".6"/>`).join('')}
      <path d="M${x-22} ${y-8.4} L${x+8} ${y-12.6} L${x+8} ${y-7.4} L${x-22} ${y-4} Z" fill="#2a6ab8"/><path d="M${x-22} ${y-6.6} L${x+8} ${y-10}" stroke="#e8402a" stroke-width="1"/><path d="M${x-24} ${y-11} L${x+12} ${y-15.6}" stroke="#fff" stroke-width="1" opacity=".8"/>
      <rect x="${x+14}" y="${y-14}" width="10" height="13" rx="2.4" fill="#e8402a"/>${[0,1,2].map(k=>`<path d="M${x+16+k*3} ${y-13} v11" stroke="#a82a1a" stroke-width=".6"/>`).join('')}<rect x="${x+15}" y="${y-13}" width="2" height="11" fill="#fff" opacity=".35"/></g>`,
    таблетки:(x,y)=>`<g>${тень0(x,y,26)}<rect x="${x-24}" y="${y-30}" width="48" height="30" rx="3" fill="url(#c1100-фольга)"/><path d="M${x-24} ${y-20} H${x+24} M${x-24} ${y-10} H${x+24} M${x-8} ${y-30} V${y} M${x+8} ${y-30} V${y}" stroke="#8a929a" stroke-width=".5" opacity=".7"/>
      ${[0,1,2,3,4,5].map(k=>{ const cx=x-15+(k%3)*15, cy=y-22+Math.floor(k/3)*13, пусто=k===4; return `<ellipse cx="${cx}" cy="${cy}" rx="6.4" ry="4.8" fill="url(#рл-стекло)" stroke="#c8ccd0" stroke-width=".7"/>${пусто?`<path d="M${cx-4} ${cy-2} l3 3 l-2 2 l4 -1" stroke="#7a828a" stroke-width=".7" fill="none"/>`:`<ellipse cx="${cx}" cy="${cy}" rx="5" ry="3.6" fill="url(#c1100-пилюля)"/><path d="M${cx-4.6} ${cy} H${cx+4.6}" stroke="#c8ccd0" stroke-width=".5"/>`}`; }).join('')}</g>`,
    батарейка:(x,y)=>`<g>${тень0(x,y,14)}<rect x="${x-10}" y="${y-46}" width="20" height="46" rx="3" fill="url(#c1100-батарея)"/><rect x="${x-10}" y="${y-46}" width="20" height="17" rx="3" fill="url(#c1100-латунь)"/><rect x="${x-10}" y="${y-30}" width="20" height="1.2" fill="#000" opacity=".5"/>
      <rect x="${x-3.4}" y="${y-50}" width="6.8" height="4.4" rx="1" fill="url(#рл-сталь)"/><ellipse cx="${x}" cy="${y-46}" rx="10" ry="2" fill="#e8d088" opacity=".7"/><rect x="${x-7}" y="${y-44}" width="2.4" height="42" fill="#fff" opacity=".22"/>
      <text x="${x}" y="${y-14}" text-anchor="middle" font-size="7" font-weight="bold" fill="#f4f6f8" font-family="Arial">AA</text><text x="${x}" y="${y-6}" text-anchor="middle" font-size="4.4" fill="#c8ccd0" font-family="Arial">1,5 V</text><text x="${x}" y="${y-35}" text-anchor="middle" font-size="6" font-weight="bold" fill="#5a3a06" font-family="Arial">+</text></g>`,
    хлеб:(x,y)=>`<g>${тень0(x,y,32)}<path d="M${x-32} ${y} Q${x-34} ${y-28} ${x} ${y-30} Q${x+34} ${y-28} ${x+32} ${y} Z" fill="url(#c1100-корка)"/>
      ${[-16,-2,12].map(d=>`<path d="M${x+d-7} ${y-21} q7 -6 15 -1" stroke="#6a3a10" stroke-width="2.4" fill="none" stroke-linecap="round"/><path d="M${x+d-6} ${y-20.4} q6 -4 12 -1" stroke="#f8e0b0" stroke-width="1.2" fill="none" opacity=".8"/>`).join('')}
      ${Array.from({length:14},(_,k)=>`<circle cx="${x-22+(k*13)%44}" cy="${y-24+(k*7)%14}" r=".7" fill="#fff8e8" opacity=".75"/>`).join('')}<path d="M${x-26} ${y-14} Q${x-22} ${y-24} ${x-10} ${y-27}" stroke="#ffe0a0" stroke-width="1.4" fill="none" opacity=".6"/></g>`
  };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=246, y0=196, у=y0+14, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.колба(52,у,0.8,{уровень:.45,цвет:'hsla(320,70%,60%,.7)',пузырьки:true,переливы:['hsla(320,70%,60%,.7)','hsla(200,80%,55%,.7)','hsla(130,70%,45%,.7)','hsla(46,95%,55%,.7)']}) + Л.штативПробирок(140,у,26,[{уровень:.5,цвет:'hsla(200,70%,60%,.7)',пузыри:.5},{уровень:.4,цвет:'hsla(50,90%,60%,.7)',пузыри:.25},{уровень:.6,цвет:'hsla(120,60%,50%,.7)',пузыри:.7}],0.8) + Л.стакан(222,у,56,62,{уровень:.5,цвет:'hsla(28,90%,60%,.7)'}) + Л.очки(296,у-2,0.9);
    const поверх = искры(14,14,24,308,150) + Л.таблица(18,36,150,{}) + метка(256,40,'Что такое химия',ЗЛ,{кегль:12}) + Л.молекула(226,104,1,'H2O',{подписи:true}) + Л.молекула(296,124,0.8,'CO2',{подписи:true});
    return ЖУРНАЛ(s) + ШАПКА('Первый урок','Что такое химия') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r1100вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['вещества и их превращения','движение планет и звёзд'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что изучает химия?') :
          РАЗБОР(ок,['Верно: химия — наука о веществах и их превращениях.','Это астрономия и физика. Химия изучает <b>вещества</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Химия</b> — наука о веществах, их свойствах и превращениях.') : '');
  }

  /* 1а. Химический светофор */
  function FA(s){
    const Н=280, y0=232, у=y0+14, Л=L_(), ф=s.ф0||0, вид=s.видф0||{0:true}, все=[0,1,2,3].every(i=>вид[i]), трясу=!!s.тряс0, в=s.ответ0, ок=в===0;
    const С=СВЕТОФОР[ф];
    const колба = Л.колба(150,у,1.55,{уровень:.55,цвет:С.ц,пробка:true}) + (ф===1?`<g transform="translate(150 ${у-50})">${Array.from({length:10},(_,k)=>`<circle cx="${-28+(k*23)%56}" cy="${-(k*13)%30}" r="${1.4+(k%3)*0.6}" fill="none" stroke="#fff" stroke-width=".8" opacity=".8">${ДВ()?`<animate attributeName="cy" values="0;-36" dur="${(0.9+(k%4)*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>`).join('')}</g>`:'');
    const тряска = трясу&&ДВ() ? `<animateTransform attributeName="transform" type="rotate" values="0 150 ${у};-9 150 ${у};8 150 ${у};-6 150 ${у};4 150 ${у};0 150 ${у}" dur=".8s" repeatCount="1"/>` : '';
    const пр = `<g>${тряска}${колба}</g>`;
    const огни = [2,0,1].map((i,k)=>{ const ц=['#f4c820','#2ab84a','#e8303a'][i], горит=(ф===1&&i===1)||(ф===2&&i===2)||((ф===0||ф===3)&&i===0);
      return `<circle cx="292" cy="${66+k*42}" r="15" fill="${горит?ц:'#2a2e34'}" stroke="#1a1c1f" stroke-width="3"/>${горит?`<circle cx="292" cy="${66+k*42}" r="26" fill="${ц}" opacity=".25" filter="url(#рл-ореол)"/>`:''}`; }).join('');
    const поверх = `<rect x="270" y="40" width="44" height="130" rx="12" fill="#1a1c1f" stroke="#4a525c"/>` + огни + искры(6,40,40,180,80) +
      метка(150,4,'раствор: '+С.имя+(ф===2?' · через 30 с':ф===3?' · через минуту':ф===1?' · встряхнули':''),['#f4c820','#2ab84a','#e8303a','#f4c820'][ф],{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Чудо-опыт','Химический светофор') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ask пара">${BTN(3,'','🫨 Встряхнуть колбу',"r1100ф('тряс')")}${BTN(4,'','⏳ Подождать',"r1100ф('ждать')")}</div>` +
      A(5,'карт','<span class="метка">Что видно</span><div class="текст">'+С.т+'</div>') +
      (!все ? СКАЗ('Опыт','В колбе — раствор глюкозы, щёлочи и красителя индигокармина. Встряхивай колбу и жди: раствор, как светофор, сам меняет цвет.') :
        ОТВЕТЫ('',['в раствор попадает кислород из воздуха над жидкостью','колба нагревается от рук'],0,в,0) +
        (в==null ? СКАЗ('Вопрос','Почему после встряхивания раствор снова зеленеет?') :
          РАЗБОР(ок,['Верно: кислород окрашивает краситель в зелёный, а глюкоза потом снова отнимает его — красный, жёлтый.','Руки здесь ни при чём — колба почти не нагрелась. Дело в кислороде воздуха над раствором.'][в]))) +
      (ок ? ТЕОРИЯ('превращения веществ','Цвет меняется, потому что меняется <b>вещество</b>: молекулы красителя то получают кислород, то отдают его глюкозе. Это и есть химия — наука о превращениях веществ.') +
        ДИВО('«Светофор» можно перезапускать десятки раз — пока в растворе не кончится глюкоза.') : '');
  }

  /* 1б. Химия дома */
  function FB(s){
    const Н=300, Л=L_(), к=s.д0, вид=s.видд0||{}, найдено=ДОМ.filter((x,i)=>вид[i]).length, все=найдено>=ДОМ.length;
    const xs=[50,128,206,284], полки=[124,236];
    const полка=(y)=>`<rect x="8" y="${y}" width="320" height="8" rx="2" fill="url(#рл-доска)"/><path d="M30 ${y+8} v8 h8 Z M306 ${y+8} v8 h-8 Z" fill="#8a5a2a"/>`;
    let тело = L_().студия(Н,Н-4) + `<rect x="4" y="20" width="328" height="${Н-30}" rx="10" fill="url(#c1100-шкаф)" stroke="#6a5240" stroke-width="2"/>${Array.from({length:9},(_,k)=>`<path d="M8 ${40+k*28} Q120 ${36+k*28} 220 ${42+k*28} T328 ${38+k*28}" stroke="#5a4636" stroke-width=".8" fill="none" opacity=".5"/>`).join('')}<rect x="10" y="26" width="316" height="${Н-42}" rx="6" fill="none" stroke="#1a140e" stroke-width="2" opacity=".6"/><ellipse cx="168" cy="40" rx="140" ry="22" fill="#fff4d8" opacity=".06"/>` + полка(полки[0]) + полка(полки[1]);
    ДОМ.forEach((x,i)=>{ const cx=xs[i%4], y=полки[Math.floor(i/4)];
      тело += (к===i?`<ellipse cx="${cx}" cy="${y-1}" rx="34" ry="5" fill="#ffd76a" opacity=".45"/>`:'') + ВЕЩЬ_ДОМ[x.к](cx,y) +
        (вид[i]?`<circle cx="${cx+28}" cy="${y-60}" r="8" fill="#3a9a5a"/><path d="M${cx+24.5} ${y-60} l2.6 2.6 l4.4 -5" stroke="#fff" stroke-width="1.6" fill="none"/>`:'') +
        `<rect x="${cx-38}" y="${y-76}" width="76" height="80" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r1100дом(${i})"/>`; });
    тело = тело.replace('<rect x="4"','<rect x="4"') + метка(168,2,все?'химия — везде!':'найдено: '+найдено+' из 8 — нажимай на вещи',все?ЗЕ:ЗЛ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Химия вокруг нас','Шкафчик дома') +
      `<div class="pic тёмная"><svg viewBox="0 0 336 ${Н}" preserveAspectRatio="xMidYMid meet">${L_().defs()}${ОПРЕДЕЛЕНИЯ}${ГР}${тело}</svg></div>` +
      (к!=null ? A(4,'карт','<span class="метка">'+ДОМ[к].имя+'</span><div class="текст">'+ДОМ[к].факт+'</div>') : СКАЗ('Исследуй','Химия живёт не только в лаборатории. Нажимай на вещи в шкафчике — у каждой своя химия.')) +
      (все ? ПРАВИЛО('Еда, лекарства, мыло, батарейки — всё это <b>вещества</b> и <b>реакции</b>. Химия — везде.') : '');
  }

  /* 2. Тела и вещества */
  function F2(s){
    const Н=236, y0=192, у=y0+14, Л=L_(), n=Math.min(s.тел2||0,ТЕЛА.length-1), ок=!!s.ок2, отз=s.отз2, готовых=n+(ок?1:0), все=готовых>=ТЕЛА.length, Т=ТЕЛА[n], вещ=Т.вар[Т.в];
    const пр = тело(Т.вид,ок?96:168,у) + (ок?ВЕЩ_РИС[вещ](262,у):'');
    const поверх = метка(ок?96:168,6,'тело: '+Т.т.toLowerCase(),ЗЛ,{кегль:11}) + (ок?метка(262,36,'вещество: '+вещ,СН,{кегль:11})+`<path d="M140 ${у-40} H220 M212 ${у-46} L222 ${у-40} L212 ${у-34}" stroke="#8fd1a8" stroke-width="2" fill="none"/>`:'');
    const сп = ТЕЛА.filter((x,k)=>k<готовых).map(x=>'<tr><td>'+x.т+'</td><td>'+x.вар[x.в]+'</td></tr>').join('');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Тела и вещества') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(ТЕЛА.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Тело '+(n+1)+' из 6</span><div class="текст">«'+Т.т+'» — из какого вещества?</div>') +
        `<div class="ask три">${Т.вар.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r1100т("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее тело →',"r1100тдальше()")}</div>` : '') +
      (готовых ? A(8,'карт','<span class="метка">Тело → вещество</span><table class="итоги узкая два"><tr><th>Тело</th><th>вещество</th></tr>'+сп+'</table>') : '') +
      (все ? ТЕОРИЯ('тела и вещества','<b>Тело</b> — любой предмет: гвоздь, стакан, монета. <b>Вещество</b> — то, из чего сделано тело: железо, стекло, медь. Из одного вещества бывает много тел (из стекла — стакан, окно, бусы), а одно тело может состоять из нескольких веществ (карандаш — дерево и графит).') +
        ДИВО('Учёным известно больше ста миллионов разных веществ — и каждый день химики создают новые.') +
        ПРАВИЛО('Физика изучает <b>тела</b>, химия — <b>вещества</b>, из которых они сделаны.') : '');
  }

  /* 3. Детектив: соль или сахар */
  function F3(s){
    const Н=262, y0=214, у=y0+14, Л=L_(), к=s.б3, т=s.т3п||{}, м=s.м3||{}, посл=s.посл3, отз=s.отз3, все=БАНКИ.every((x,j)=>м[j]===x.что);
    const xs=[70,150];
    let пр = БАНКИ.map((x,j)=>Л.банка(xs[j],у,48,62,{содержимое:x.что,надпись:[x.б]})).join('');
    let поверх = БАНКИ.map((x,j)=>(к===j?`<ellipse cx="${xs[j]}" cy="${у+3}" rx="32" ry="5" fill="#ffd76a" opacity=".4"/>`:'')+(м[j]?метка(xs[j],у+8,м[j],м[j]===x.что?ЗЕ:КР,{кегль:10}):'')).join('');
    if(посл){ const В=БАНКИ[посл.j].что;
      if(посл.п==='лупа') поверх += лупаКристаллы(260,100,52,В);
      if(посл.п==='вода') пр += Л.стакан(262,у,66,76,{уровень:.55,объём:250,палочка:true,мешать:true,цвет:'hsla(198,60%,80%,.4)'});
      if(посл.п==='огонь') { пр += Л.спиртовка(250,у,1.2,true); поверх += ложка(250,у-82,В,true) + (В==='сахар'?дым(250,у-96,2,'#a89070'):''); }
      if(посл.п==='вкус') поверх += `<g><circle cx="262" cy="100" r="48" fill="#fff"/><path d="M240 100 Q252 88 262 96 Q272 88 284 100 Q262 116 240 100 Z" fill="#c8504a"/><circle cx="262" cy="100" r="48" fill="none" stroke="#d81e1e" stroke-width="8"/><path d="M228 66 L296 134" stroke="#d81e1e" stroke-width="8"/></g>`;
      поверх += метка(168,4,'банка '+БАНКИ[посл.j].б+': '+(посл.п==='вкус'?'пробовать нельзя!':ИТОГ[В][посл.п]),посл.п==='вкус'?КР:ЗЛ,{кегль:посл.п==='огонь'?9:10}); }
    else поверх += метка(168,4,к==null?'выбери банку':'банка '+БАНКИ[к].б+': выбери пробу',ЗЛ,{кегль:11});
    const плитки=[['лупа','Лупа',Л.лупа(28,28,16,'соль')],['вода','Вода',Л.стакан(32,56,34,40,{уровень:.6})],['огонь','Нагреть',Л.спиртовка(32,58,0.85,true)],['вкус','На вкус',`<path d="M16 34 Q24 24 32 30 Q40 24 48 34 Q32 46 16 34 Z" fill="#c8504a"/>`]];
    const К=к==null?null:БАНКИ[к];
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Детектив: соль или сахар') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))">${БАНКИ.map((x,j)=>BTN(3,(к===j?'вкл':'')+(м[j]===x.что?' был':''),(м[j]===x.что?'✓ ':'')+'Банка '+x.б,'r1100б('+j+')')).join('')}</div>` +
      (К ? ПЛИТКИ(плитки,'r1100п',4,null) : '') +
      (К&&м[к]!==К.что ? A(5,'карт задача','<span class="метка">Банка '+К.б+'</span><div class="текст">Что в этой банке?</div>') +
        `<div class="ask пара">${['соль','сахар'].map((t0,i)=>BTN(6+i,отз&&!отз.ок&&отз.ч===t0?'miss':'',t0,"r1100м('"+t0+"')")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !К ? СКАЗ('Задание','В двух банках — белые порошки: соль и сахар. Этикетки потерялись. Узнай, где что, как настоящий химик — с помощью опытов.') : '') +
      A(8,'карт','<span class="метка">Протокол</span><table class="итоги узкая детектив"><tr><th>Банка</th><th>лупа</th><th>в воде</th><th>нагрев</th></tr>'+
        БАНКИ.map((x,j)=>'<tr><td><b>'+x.б+'</b>'+(м[j]===x.что?' — '+x.что:'')+'</td>'+['лупа','вода','огонь'].map(п=>'<td>'+((т[j]||{})[п]?КОРОТКО[x.что][п]:'—')+'</td>').join('')+'</tr>').join('')+'</table>') +
      (все ? ТЕОРИЯ('свойства веществ','Каждое вещество узнают по его <b>свойствам</b>: цвету, форме кристаллов, растворимости, поведению при нагревании. Соль и сахар похожи, но у соли кристаллы-кубики и она не плавится в ложке, а сахар плавится и превращается в карамель — это уже новое вещество.') +
        ПРАВИЛО('Химик узнаёт вещества <b>опытом</b>, а не на вкус.') : '');
  }

  /* 4. Приборы химика */
  const рисПрибор = (к,x,y,м) => { const Л=L_(), k=м||1;
    if(к==='пробирка') return Л.пробирка(x,y,0.8*k,{уровень:.4,цвет:'hsla(200,70%,60%,.7)'});
    if(к==='колба') return Л.колба(x,y,0.62*k,{уровень:.4,цвет:'hsla(320,70%,60%,.6)'});
    if(к==='стакан') return Л.стакан(x,y,46*k,52*k,{уровень:.5,цвет:'hsla(120,50%,55%,.5)'});
    if(к==='цилиндр') return Л.цилиндр(x,y,14*k,72*k,{мл:60});
    if(к==='спиртовка') return Л.спиртовка(x,y,0.95*k,true);
    if(к==='пипетка') return Л.пипетка(x,y-6,0.9*k,true);
    if(к==='штатив') return Л.штатив(x-18,y,92*k,y-60*k,36*k) + L_().пробирка(x+18,y-40*k,0.55*k,{уровень:.3});
    return Л.весы(x,y,64*k,{показ:'12.5'});
  };
  function F4(s){
    const Н=272, Л=L_(), n=Math.min(s.п4||0,ПРИБОРЫ.length-1), ок=!!s.ок4, отз=s.отз4, готовых=n+(ок?1:0), все=готовых>=ПРИБОРЫ.length, П=ПРИБОРЫ[n];
    const xs=[44,124,204,284], полки=[118,236];
    const полка=(y)=>`<rect x="8" y="${y}" width="320" height="7" rx="2" fill="url(#рл-доска)"/><path d="M30 ${y+7} v8 h8 Z M306 ${y+7} v8 h-8 Z" fill="#8a5a2a"/>`;
    let тело0 = L_().студия(Н,Н-4) + полка(полки[0]) + полка(полки[1]);
    ПРИБОРЫ.forEach((x,i)=>{ const cx=xs[i%4], y=полки[Math.floor(i/4)], сейчас=i===n&&!все;
      тело0 += (сейчас?`<ellipse cx="${cx}" cy="${y-1}" rx="34" ry="5" fill="#ffd76a" opacity=".45"/><path d="M${cx-6} ${y-104} l6 8 l6 -8 Z" fill="#ffd76a"/>`:'') + рисПрибор(x.к,cx,y,1) +
        (i<готовых ? метка(cx,y+10,x.имя.replace('Химический ','').toLowerCase(),ЗЕ,{кегль:8}) : тА(cx,y+22,'?',11,'#6a7480')); });
    тело0 += метка(168,2,все?'все 8 приборов знакомы':'прибор '+(n+1)+' из 8',все?ЗЕ:ЗЛ,{кегль:10});
    const другие = ПРИБОРЫ.filter(x=>x.к!==П.к).map(x=>x.имя), вар = [П.имя, другие[(n*3)%7], другие[(n*3+3)%7]];
    const порядок = [[0,1,2],[1,0,2],[2,1,0],[1,2,0],[0,2,1],[2,0,1],[1,0,2],[0,2,1]][n];
    const кнопки = порядок.map(i=>вар[i]).filter(Boolean);
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Приборы химика') +
      `<div class="pic тёмная">${свгЛ(тело0,Н)}</div>` +
      ТОЧКИ(ПРИБОРЫ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Прибор '+(n+1)+' из 8</span><div class="текст">Как называется прибор, отмеченный на полке?</div>') +
        `<div class="ask">${кнопки.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.ч===t0?'miss':'',t0,"r1100пр('"+t0+"')")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(7,'','Следующий прибор →',"r1100пдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('лабораторная посуда','Посуда химика — из <b>термостойкого стекла</b>: она не лопается от нагревания и не реагирует с веществами. Каждому прибору — своя работа: пробирка для малых опытов, колба для нагревания, цилиндр для точного объёма, пипетка — по каплям.') +
        ПРАВИЛО('Правильный прибор — половина успешного опыта.') : '');
  }

  /* 5. Лента истории */
  const рисИстории = (вид,x,у) => { const Л=L_();
    if(вид==='медь') return `<g>${L_().пламя(40,12,.7).replace('<g>','<g transform="translate('+(x-30)+' '+(у-6)+')">')}</g>` + `<path d="M${x-58} ${у} L${x-2} ${у-8}" stroke="#6a4a2a" stroke-width="7" stroke-linecap="round"/>` + Л.образец(x+40,у,'Cu',1.4);
    if(вид==='алхимик') return алембик(x-20,у);
    if(вид==='весы') return Л.весы(x,у,96,{показ:'50.00'}) + `<g transform="translate(${x} ${у-30})">${Л.колба(0,0,0.5,{уровень:.2,цвет:'#9aa0a8',пробка:true})}</g>`;
    if(вид==='кислород') return Л.колба(x-30,у,0.9,{уровень:.3,цвет:'hsla(198,40%,85%,.4)'}) + Л.молекула(x+46,у-60,1.2,'O2',{подписи:true}) + Л.свеча(x+46,у,1,true);
    return Л.таблица(x-80,у-96,160,{граница:true});
  };
  function F5(s){
    const Н=262, y0=232, у=y0-16, Л=L_(), к=s.и5==null?null:s.и5, вид=s.вид5||{}, все=ИСТОРИЯ.every((x,i)=>вид[i]), в=s.ответ5, ок=в===2;
    const xs=[40,104,168,232,296];
    const лента = `<path d="M20 ${у+4} H316" stroke="#c89a2a" stroke-width="3"/>` + ИСТОРИЯ.map((x,i)=>`<circle cx="${xs[i]}" cy="${у+4}" r="${к===i?9:6}" fill="${вид[i]?'#ffd76a':'#3a4048'}" stroke="#ffd76a" stroke-width="2" style="cursor:pointer" onclick="r1100и(${i})" pointer-events="all"/>` + тА(xs[i],у+24,x.год.replace('7000 лет назад','−5000').replace('Средние века','ср. века'),9,вид[i]?'#ffd76a':'#9aa3ad')).join('');
    const рис = к==null ? тА(168,110,'нажми на точку ленты',13,'#9aa3ad') : рисИстории(ИСТОРИЯ[к].вид,168,у-40) + метка(168,4,ИСТОРИЯ[к].год+' · '+ИСТОРИЯ[к].кто,ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Как появилась химия') +
      `<div class="pic тёмная">${свгЖ(L_().студия(Н,y0)+рис+лента,Н)}</div>` +
      `<div class="ряд мелко" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${ИСТОРИЯ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),x.год.replace('7000 лет назад','−5000').replace('Средние века','ср. века'),'r1100и('+i+')')).join('')}</div>` +
      (к!=null ? A(4,'карт','<span class="метка">'+ИСТОРИЯ[к].кто+'</span><div class="текст">'+ИСТОРИЯ[к].что+'</div>') : СКАЗ('История','Нажимай на точки ленты времени — от древних мастеров до таблицы Менделеева.')) +
      (все ? ОТВЕТЫ('три',['Ломоносов','Лавуазье','Менделеев'],2,в,5) + (в==null ? СКАЗ('Вопрос','Кто открыл периодический закон и составил таблицу элементов?') :
        РАЗБОР(ок,['Ломоносов доказал сохранение массы.','Лавуазье объяснил горение.','Верно: Дмитрий Иванович Менделеев, 1869 год.'][в])) : '') +
      (ок ? ДИВО('Ломоносов писал: «Широко распростирает химия руки свои в дела человеческие». Сегодня без химии нет ни лекарств, ни смартфонов, ни чистой воды в кране.') +
        ПРАВИЛО('От ремесла и алхимии — к науке: опыт, весы, закон.') : '');
  }

  /* 6. Первый опыт — вулкан */
  const пена = (x,y,ш) => [-1,1].map(с=>`<path d="M${x+с*ш*0.42} ${y+4} Q${x+с*(ш*0.64)} ${y+24} ${x+с*(ш*0.58)} ${y+96}" stroke="url(#c1100-лава)" stroke-width="13" fill="none" stroke-linecap="round" opacity=".95"/><path d="M${x+с*ш*0.42-с*3} ${y+6} Q${x+с*(ш*0.62)-с*3} ${y+26} ${x+с*(ш*0.56)-с*3} ${y+90}" stroke="#ffd0da" stroke-width="2" fill="none" opacity=".7"/>`).join('') +
    `<ellipse cx="${x}" cy="${y+100}" rx="${ш*0.8}" ry="6" fill="#d83a58" opacity=".85"/>` +
    Array.from({length:30},(_,k)=>{ const px=x-ш/2+((k*31)%ш), py=y-((k*17)%30), r=4+(k%4)*2.2;
      return `<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 8;0 -4;0 8" dur="${(1.4+(k%5)*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}<circle cx="${px}" cy="${py}" r="${r}" fill="url(#c1100-пена)"/><circle cx="${px-r*0.35}" cy="${py-r*0.35}" r="${r*0.28}" fill="#fff" opacity=".85"/></g>`; }).join('') +
    Array.from({length:8},(_,k)=>`<circle cx="${x-30+k*9}" cy="${y-34-(k%3)*8}" r="${1.6+(k%2)}" fill="#ff8aa0">${ДВ()?`<animate attributeName="cy" values="${y-20};${y-56-(k%3)*10};${y-20}" dur="${(1+(k%3)*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>`).join('');
  function F6(s){
    const Н=272, y0=226, у=y0+14, Л=L_(), ш=Math.min(s.о6||0,ШАГИ6.length), отз=s.отз6, готово=ш>=ШАГИ6.length, в=s.ответ6, ок=в===0;
    const поднос = `<rect x="78" y="${у-6}" width="180" height="6" rx="3" fill="#c8ccd2"/><path d="M78 ${у-6} q-6 0 -6 -6 M258 ${у-6} q6 0 6 -6" stroke="#c8ccd2" stroke-width="3" fill="none"/>`;
    const цв = ш>=3?'hsla(350,80%,60%,.6)':ш>=2?'hsla(350,80%,60%,.5)':'hsla(198,40%,90%,.3)';
    const пр = поднос + (ш>=1 ? Л.стакан(168,у-6,74,96,{уровень:ш>=2?.2:.08,объём:250,цвет:ш>=2?цв:'#f4f2ec',крупинки:ш===1?18:0,вид:'соль'}) : '') ;
    const поверх = (готово ? пена(168,у-104,66) : '') + (ш===4&&!готово?'':'') +
      метка(168,4,готово?'извержение!':ш===0?'начни с химического стакана':'шаг '+(ш+1)+' из 5',готово?КР:ЗЛ,{кегль:11});
    const плитки=[['стакан','Стакан',Л.стакан(32,56,34,40,{уровень:0})],['сода','Сода',L_().банка(32,56,30,42,{содержимое:'соль',надпись:['сода'],мал:true})],['краситель','Краситель',Л.склянка(32,58,24,44,{уровень:.5,цвет:'hsla(350,85%,50%,.9)',этикетка:['кр.']})],
      ['моющее','Моющее',`<path d="M24 58 V26 Q24 20 30 18 V12 H36 V18 Q42 20 42 26 V58 Z" fill="#3ab06a"/><rect x="27" y="30" width="12" height="16" rx="1" fill="#e8f8ec"/>`],['уксус','Уксус',Л.склянка(32,58,26,44,{уровень:.6,цвет:'hsla(198,40%,88%,.35)',этикетка:['уксус'],полоса:'#c8402a'})],
      ['соль','Соль',L_().банка(32,56,30,42,{содержимое:'соль',надпись:['NaCl'],мал:true})],['спиртовка','Спиртовка',Л.спиртовка(32,58,0.85,false)]];
    const отм={}; ШАГИ6.forEach((x,i)=>{ if(i<ш) отм[плитки.findIndex(п=>п[0]===x.что)]=true; });
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Первый опыт — «вулкан»') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (готово ? '' : A(3,'карт задача','<span class="метка">Шаг '+(ш+1)+' из 5</span><div class="текст">'+ШАГИ6[ш].т+'</div>')) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (готово ? '' : ПЛИТКИ(плитки,'r1100в',4,null,отм)) +
      (готово ? ОТВЕТЫ('',['образовался газ — углекислый газ','вода закипела'],0,в,6) + (в==null ? СКАЗ('Вопрос','Откуда взялась пена?') :
        РАЗБОР(ок,['Верно: сода и уксус прореагировали — получилось новое вещество, углекислый газ. Его пузыри вспенили моющее средство.','Ничего не нагревали — вода не кипела. Пузыри — это новый газ.'][в])) +
        `<div class="ask">${BTN(9,'','Повторить опыт',"r1100всброс()")}</div>` : '') +
      (ок ? ТЕОРИЯ('химическая реакция','Сода и уксус — два вещества. Встретившись, они <b>превращаются</b> в новые вещества, одно из которых — газ. Это и есть <b>химическая реакция</b> — главный предмет химии.') +
        ДИВО('Тот же газ поднимает тесто: сода в рецепте реагирует с кислым кефиром или лимонным соком — и пирог становится пышным.') +
        ПРАВИЛО('Превращение одних веществ в другие — <b>химическая реакция</b>.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=226, y0=184, у=y0+14, Л=L_();
    const пр = Л.образец(50,у,'Fe',1.2) + Л.стакан(120,у,48,56,{уровень:.5,цвет:'hsla(350,80%,60%,.5)'}) + Л.колба(190,у,0.62,{уровень:.4,цвет:'hsla(200,70%,60%,.6)'}) + Л.весы(268,у,70,{показ:'25.0'});
    const поверх = метка(168,8,'вещества · свойства · превращения',ЗЕ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что такое химия') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Химия</b> — наука о веществах, их свойствах и превращениях.<br>• Тело — предмет, вещество — то, из чего он сделан.<br>• Вещества узнают по свойствам — опытом, а не на вкус.<br>• У химика свои приборы: пробирка, колба, стакан, цилиндр, спиртовка…<br>• Превращение веществ — химическая реакция.</div>') +
      ПРАВИЛО('Дальше — молекулы, формулы и реакции. Добро пожаловать в химию!');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=200, y0=156, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.штативПробирок(268,y0+14,30,[0,1,2].map(i=>({уровень:.45,цвет:i<3-ош?'hsla(320,70%,60%,.7)':'hsla(0,0%,60%,.2)'})),0.8) + Л.колба(70,y0+14,0.7,{уровень:.4,цвет:'hsla(200,70%,60%,.6)'});
    const поверх = все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(268,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Ты готов к следующим урокам химии.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r1100заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r1100мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни шаги урока.')) : '')) +
      (все ? ПРАВИЛО('Химия — наука о веществах.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Химия изучает…', варианты:[{т:'вещества и их превращения',ок:true},{т:'движение тел',ок:false}], разбор:'Химия — наука о веществах.' },
    { вопрос:'Что из этого — вещество?', варианты:[{т:'ложка',ок:false},{т:'алюминий',ок:true}], разбор:'Ложка — тело, алюминий — вещество.' },
    { вопрос:'Чем отмерить точный объём воды?', варианты:[{т:'мерным цилиндром',ок:true},{т:'спиртовкой',ок:false}], разбор:'У цилиндра есть деления.' },
    { вопрос:'Как узнать, где соль, а где сахар?', варианты:[{т:'попробовать на вкус',ок:false},{т:'нагреть в ложечке',ок:true}], разбор:'Сахар плавится, соль — нет.' },
    { вопрос:'Сода + уксус дают газ. Это…', варианты:[{т:'химическая реакция',ок:true},{т:'растворение',ок:false}], разбор:'Появилось новое вещество.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r1100Reset()")}</div>` +
        ПРАВИЛО('Тело — из вещества. Химия — о веществах.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r1100Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const ПРИБОР_РИС = {'мерный цилиндр':'цилиндр', 'пипетка':'пипетка', 'спиртовка':'спиртовка', 'весы':'весы', 'штатив':'штатив', 'пробирка':'пробирка', 'химический стакан':'стакан', 'колба':'колба'};
  const Т = {
    т1:{ имя:'Тело или вещество', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=160, y0=150, отв=ст.ответ!=null, вещ=з.в===1;
        return свгЛ(L_().студия(Н,y0)+тА(168,74,з.ф,26,'#ffd76a')+(отв?метка(168,96,вещ?'вещество — из него делают тела':'тело — предмет с формой',вещ?СН:ЗЛ,{кегль:10}):тА(168,112,'тело или вещество?',11,'#9aa3ad'))+(ст.серия>=3?метка(168,128,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } },
    т2:{ имя:'Прибор для дела', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=184, y0=160, отв=ст.ответ!=null, к=ПРИБОР_РИС[з.ок];
        return свгЛ(сцена(Н,y0,отв&&к?рисПрибор(к,246,y0+14,1.2):'',метка(отв&&к?110:168,24,з.ф,ЗЛ,{кегль:10})+(отв?метка(отв&&к?110:168,64,з.ок,ЗЕ,{кегль:11}):тА(168,100,'какой прибор?',12,'#9aa3ad'))+(ст.серия>=3?метка(110,104,'серия: '+ст.серия,ЗЕ,{кегль:9}):'')),Н); } },
    т3:{ имя:'Вопрос химии', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=168, y0=156, отв=ст.ответ!=null, хим=з.в===0;
        const плашка=(x,t0,ц,горит)=>`<rect x="${x-64}" y="80" width="128" height="40" rx="20" fill="${горит?ц:'rgba(12,14,18,.7)'}" fill-opacity="${горит?.28:1}" stroke="${ц}" stroke-width="${горит?2.4:1.2}"/>`+тА(x,105,t0,13,горит?'#fff':'#9aa3ad');
        return свгЛ(L_().студия(Н,y0)+метка(168,18,з.ф,ЗЛ,{кегль:з.ф.length>30?10:11})+плашка(92,'химия','#8fd1a8',отв&&хим)+плашка(244,'другая наука','#7fd1ff',отв&&!хим)+(ст.серия>=3?метка(168,132,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r1100Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r1100T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r1100TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L1100 = {
    id: ID, title: 'Что такое химия', ico: '⚗️',
    src: 'Химия · 5–6 класс · Введение', subj: 'chem',
    explain: [
      'Карточка: что изучает химия.',
      'Чудо-опыт: химический светофор.',
      'Химия вокруг нас: шкафчик дома.',
      'Тела и вещества: из чего сделаны предметы.',
      'Детектив: соль или сахар.',
      'Приборы химика.',
      'Как появилась химия: лента истории.',
      'Первый опыт — «вулкан».',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: тело или вещество.',
      'Тренажёр 2: прибор для дела.',
      'Тренажёр 3: вопрос химии или нет.'
    ],
    check: { q: 'Что изучает химия?', choices: ['Движение тел','Вещества и их превращения','Живые организмы','Звёзды и планеты'], ans: 1, exp: 'Химия — наука о веществах, их свойствах и превращениях.' },
    tasks: [
      { q: 'Что из перечисленного — вещество?', kind: 'choice', choices: ['Гвоздь','Ложка','Железо','Стакан'], ans: 2, tol: 0, hints: ['Тело — это предмет.', 'Вещество — то, из чего сделан предмет.'], sol: 'Железо — вещество, а гвоздь, ложка и стакан — тела.' },
      { q: 'Каким прибором отмеряют точный объём жидкости?', kind: 'choice', choices: ['Пробиркой','Мерным цилиндром','Спиртовкой','Штативом'], ans: 1, tol: 0, hints: ['У этого прибора есть деления.', 'Он высокий и узкий.'], sol: 'Объём отмеряют мерным цилиндром.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.пламя){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L1100.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,FA,FB,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=11 ? Ф[f-1](s) : тренажёр(s,'т'+(f-11),f-11);
    const ЗАГОЛОВКИ={1:'Первый урок химии',2:'Чудо-опыт',3:'Химия дома',4:'Тела и вещества',5:'Детектив',6:'Приборы химика',7:'История химии',8:'Первый опыт',9:'Вывод',10:'Проверка',11:'Практика',
      12:'Тренажёр 1',13:'Тренажёр 2',14:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l1100n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Что такое химия'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r1100Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r1100вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r1100ф=(что)=>{ const s=S(); let ф=s.ф0||0;
    if(что==='тряс'){ ф=1; s.тряс0=true; } else { s.тряс0=false; ф = ф===1?2 : ф===2?3 : ф; }
    s.ф0=ф; const в=Object.assign({0:true},s.видф0||{}); в[ф]=true; s.видф0=в; chRender(0); };
  window.r1100дом=(i)=>{ const s=S(); if(!ДОМ[i]) return; s.д0=i; const в=Object.assign({},s.видд0||{}); в[i]=true; s.видд0=в; chRender(0); };
  window.r1100т=(j)=>{ const s=S(); if(s.ок2) return; const n=s.тел2||0, Т=ТЕЛА[n];
    if(j===Т.в){ s.ок2=true; s.отз2={ок:true,т:Т.т+' — тело, '+Т.вар[Т.в]+' — вещество, из которого оно сделано. Ещё из этого вещества: '+ЕЩЁ[Т.вар[Т.в]]+'.'}; }
    else s.отз2={ок:false,j:j,т:'Нет: «'+Т.т.toLowerCase()+'» не делают из вещества «'+Т.вар[j]+'». Присмотрись к рисунку.'};
    chRender(0); };
  window.r1100тдальше=()=>{ const s=S(); if(!s.ок2||(s.тел2||0)>=ТЕЛА.length-1) return; s.тел2=(s.тел2||0)+1; s.ок2=false; s.отз2=null; chRender(0); };
  window.r1100б=(j)=>{ const s=S(); if(!БАНКИ[j]) return; s.б3=j; s.отз3=null; if(s.посл3&&s.посл3.j!==j) s.посл3=null; chRender(0); };
  window.r1100п=(i)=>{ const s=S(); const j=s.б3, П=ПРОБЫ[i]; if(j==null||!П) return;
    if(П.к==='вкус'){ s.посл3={j:j,п:'вкус'}; s.отз3={ок:false,т:'Стоп! В лаборатории ничего не пробуют на вкус — в банке может оказаться яд. Химик узнаёт вещество опытом.'}; chRender(0); return; }
    const т=Object.assign({},s.т3п||{}); т[j]=Object.assign({},т[j]||{}); т[j][П.к]=true; s.т3п=т; s.посл3={j:j,п:П.к};
    s.отз3={ок:true,т:'Банка '+БАНКИ[j].б+': '+ИТОГ[БАНКИ[j].что][П.к]+'.'+(П.к==='вода'?' Растворяются оба — вода их не различает.':'')}; chRender(0); };
  window.r1100м=(ч)=>{ const s=S(); const j=s.б3; if(j==null) return; const Б=БАНКИ[j], т=(s.т3п||{})[j]||{};
    if(!т.лупа&&!т.огонь){ s.отз3={ок:false,ч:null,т:'Пока нет доказательства. Вода растворяет оба порошка — попробуй лупу или нагревание.'}; chRender(0); return; }
    if(ч===Б.что){ const м=Object.assign({},s.м3||{}); м[j]=ч; s.м3=м; const все=БАНКИ.every((x,k)=>м[k]===x.что); if(все) s.дело_детектив=true;
      s.отз3={ок:true,т:'Верно: в банке '+Б.б+' — '+ч+'.'+(все?' Дело раскрыто!':'')}; }
    else s.отз3={ок:false,ч:ч,т:Б.что==='соль'?(т.лупа?'Кристаллы-кубики — это соль. ':'')+(т.огонь?'Порошок не расплавился — сахар бы стал карамелью.':''):(т.лупа?'Кристаллы неправильной формы — это сахар. ':'')+(т.огонь?'Порошок расплавился в карамель — так ведёт себя сахар.':'')};
    chRender(0); };
  window.r1100пр=(ч)=>{ const s=S(); if(s.ок4) return; const n=s.п4||0, П=ПРИБОРЫ[n];
    if(ч===П.имя){ s.ок4=true; if(n>=ПРИБОРЫ.length-1) s.дело_приборы=true; s.отз4={ок:true,т:П.имя+' — '+П.зачем+'.'}; }
    else s.отз4={ок:false,ч:ч,т:'Это не '+ч.toLowerCase()+'. Присмотрись к отмеченному прибору.'};
    chRender(0); };
  window.r1100пдальше=()=>{ const s=S(); if(!s.ок4||(s.п4||0)>=ПРИБОРЫ.length-1) return; s.п4=(s.п4||0)+1; s.ок4=false; s.отз4=null; chRender(0); };
  window.r1100и=(i)=>{ const s=S(); if(!ИСТОРИЯ[i]) return; s.и5=i; const в=Object.assign({},s.вид5||{}); в[i]=true; s.вид5=в; chRender(0); };
  const ИМЯ6 = {стакан:'стакан',сода:'соду',краситель:'краситель',моющее:'моющее средство',уксус:'уксус',соль:'соль',спиртовка:'спиртовку'};
  window.r1100в=(i)=>{ const s=S(); const ш=s.о6||0; if(ш>=ШАГИ6.length) return; const что=['стакан','сода','краситель','моющее','уксус','соль','спиртовка'][i], нужно=ШАГИ6[ш].что;
    if(что===нужно){ s.о6=ш+1; s.отз6={ок:true,т:['Стакан стоит в подносе — пена не убежит на стол.','Сода на дне стакана.','Раствор порозовел — так «лава» будет красной.','Моющее средство превратит газ в пышную пену.','Ш-ш-ш! Пена рвётся из стакана — «вулкан» проснулся!'][ш]}; chRender(0); return; }
    s.отз6={ок:false,т:что==='соль'?'Соль с уксусом не даст газа — нужна сода.':что==='спиртовка'?'Нагревать не нужно — реакция идёт сама.':что==='уксус'&&ш<4?'Уксус — последним, иначе всё начнётся раньше времени.':'Сейчас это не нужно. Шаг '+(ш+1)+': '+ШАГИ6[ш].т}; chRender(0); };
  window.r1100всброс=()=>{ const s=S(); s.о6=0; s.отз6=null; chRender(0); };
  window.r1100мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r1100заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r1100Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r1100Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r1100T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r1100TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r1100Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L1100,{__планПорядок:arr[м].__планПорядок}); else arr.push(L1100); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU1100={render:render, L:L1100};
})();
