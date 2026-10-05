/* ============ ХИМИЯ · УРОК 114 · «ВОЗДУХ: КИСЛОРОД И ДРУГИЕ ГАЗЫ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   По образцу уроков 39–113 (манера NOBOOK). Карточка 114 из банка подменяется этой записью
   (VISKW[114]). Рисунки — MVP/data/ris_lab.js (window.РЛ): молекулы N₂, O₂, Ar, CO₂; перевёрнутый
   мерный цилиндр с железной ватой в кристаллизаторе; газосборники с пластинками; лучинка;
   известковая вода; стеклянный колпак; свеча; груша; веточка мяты.

   ОПЫТЫ.
   1) Воздух под лупой: 100 молекул — 78 N₂, 21 O₂, 1 Ar; сколько литров каждого газа в 100 л.
   2) Сколько в воздухе кислорода: влажная железная вата ржавеет в цилиндре над водой, за неделю
      вода поднимается на 21 мл из 100; остаток гасит горящую лучинку — это азот.
   3) Газовый детектив: три склянки A, B, C — тлеющая и горящая лучинка, известковая вода;
      определить O₂, N₂, CO₂.
   4) Свеча под колпаками 0,5 / 1 / 2 л: чем больше воздуха, тем дольше горит.
   5) Вдох и выдох: воздух из груши не мутит известковую воду, выдох — мутит.
   6) Опыт Пристли (1771): погасшая под колпаком свеча снова горит, если под колпаком
      десять дней на свету росла мята. */
(function(){
  'use strict';

  const ID = 114;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';
  const ЦN='#5a7aff', ЦO='#ff5a4a', ЦAr='#c89aff';

  const ДЕЛА = [
    {ключ:'кислород', имя:'Опыт: доля кислорода',  итог:'21 %'},
    {ключ:'детектив', имя:'Газовый детектив',      итог:'3 из 3'},
    {ключ:'марафон',  имя:'Проверка: марафон',     итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Узнать, из чего состоит воздух, измерить долю кислорода и научиться отличать кислород, азот и углекислый газ.'],
    ['Принцип','Воздух — <b>смесь газов</b>: около 78 % азота N₂, 21 % кислорода O₂ и 1 % других газов (аргон, углекислый газ, водяной пар). Каждый газ в смеси сохраняет свои свойства: кислород поддерживает горение, азот и CO₂ — нет, CO₂ мутит известковую воду.'],
    ['Оборудование','<b>Приборы:</b> мерный цилиндр на 100 мл, кристаллизатор, газосборники с пластинками, стеклянные колпаки 0,5, 1 и 2 л, резиновая груша, трубочки, лучинки, спиртовка, секундомер.<br><b>Вещества:</b> железная вата, известковая вода, свечи, веточка мяты.'],
    ['Ход работы','1. Рассмотреть воздух «под лупой».<br>2. Измерить долю кислорода.<br>3. Распознать три газа.<br>4. Засечь время горения свечи под колпаками.<br>5. Сравнить вдыхаемый и выдыхаемый воздух.<br>6. Повторить опыт Пристли.'],
    ['Безопасность','В чистом кислороде всё горит <b>очень бурно</b>: рядом не должно быть масла и жира. Тлеющую лучинку вносят в склянку быстро и вынимают сразу. Колпак над горевшей свечой горячий — снимать прихваткой. Через трубочку <b>только выдыхают</b>, известковую воду не втягивают.']
  ];
  const ГАЗЫ = [
    {к:'N2', имя:'азот N₂',      доля:78, ц:ЦN,  мол:'N2'},
    {к:'O2', имя:'кислород O₂',  доля:21, ц:ЦO,  мол:'O2'},
    {к:'Ar', имя:'аргон и другие', доля:1, ц:ЦAr, мол:'Ar'}
  ];
  const ДНИ3 = [0,1,3,5,7];
  const ГАЗ3 = {0:100,1:92,3:85,5:81,7:79};
  const СКЛЯНКИ = [ {б:'A', газ:'CO2'}, {б:'B', газ:'O2'}, {б:'C', газ:'N2'} ];
  const ИМЯ_ГАЗА = {O2:'кислород O₂', N2:'азот N₂', CO2:'углекислый газ CO₂'};
  const ПРОБЫ = [
    {к:'тлеет', имя:'Тлеющая лучинка'},
    {к:'горит', имя:'Горящая лучинка'},
    {к:'извв',  имя:'Известковая вода'}
  ];
  /* что видно: [газ][проба] */
  const ИТОГ = {
    O2:{тлеет:'вспыхнула ярким пламенем', горит:'горит ещё ярче', извв:'осталась прозрачной'},
    N2:{тлеет:'погасла', горит:'погасла', извв:'осталась прозрачной'},
    CO2:{тлеет:'погасла', горит:'погасла', извв:'помутнела'}
  };
  const КОЛПАКИ = [ {л:0.5, с:8}, {л:1, с:16}, {л:2, с:32} ];
  const СОСТАВ = [ ['азот','78 %','78 %'], ['кислород','21 %','16 %'], ['углекислый газ','0,04 %','4 %'], ['водяной пар','мало','много'] ];
  const ПРИСТЛИ = [ {д:0, имя:'свеча погасла'}, {д:3, имя:'3 дня'}, {д:10, имя:'10 дней'} ];
  const МАРАФОН = [
    {q:'Воздух — это…', вар:['смесь газов','одно вещество','чистый кислород'], в:0, р:'В воздухе азот, кислород, аргон, CO₂ и пар.'},
    {q:'Какого газа в воздухе больше всего?', вар:['кислорода','азота','углекислого газа'], в:1, р:'Азота — около 78 %.'},
    {q:'Сколько литров кислорода в 100 л воздуха?', вар:['78 л','21 л','1 л'], в:1, р:'Кислорода около 21 %.'},
    {q:'В каком газе тлеющая лучинка вспыхивает?', вар:['в азоте','в кислороде','в углекислом газе'], в:1, р:'Кислород поддерживает горение.'},
    {q:'Какой газ мутит известковую воду?', вар:['кислород','азот','углекислый газ'], в:2, р:'CO₂ даёт белый осадок мела.'},
    {q:'Железная вата в цилиндре заржавела, вода поднялась. Какой газ израсходовался?', вар:['азот','кислород','аргон'], в:1, р:'Железо ржавеет, соединяясь с кислородом.'},
    {q:'Под каким колпаком свеча горит дольше?', вар:['под маленьким','под большим','одинаково'], в:1, р:'Под большим колпаком больше кислорода.'},
    {q:'Где больше углекислого газа?', вар:['во вдыхаемом воздухе','в выдыхаемом воздухе','одинаково'], в:1, р:'В выдохе около 4 % CO₂ — в 100 раз больше.'},
    {q:'Почему свеча у Пристли снова загорелась?', вар:['мята выделила кислород','колпак остыл','азот исчез'], в:0, р:'Растения на свету выделяют кислород.'},
    {q:'Сколько литров азота в 200 л воздуха?', вар:['156 л','78 л','42 л'], в:0, р:'78 % от 200 л = 156 л.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const ч = (v) => String(v).replace('.',',');
  const П1 = поМесту([[100,'O2'],[100,'N2'],[200,'O2'],[200,'N2'],[300,'O2'],[300,'N2'],[1000,'O2'],[1000,'N2'],[50,'N2'],[500,'O2'],[400,'O2'],[400,'N2'],[600,'O2'],[10,'N2'],[700,'O2'],[2000,'O2']]
    .map(([V,г])=>{ const д=г==='O2'?21:78, ок=V*д/100, нет=V*(г==='O2'?78:21)/100;
      return {q:'Сколько литров '+(г==='O2'?'кислорода':'азота')+' в '+V+' л воздуха?', V:V, г:г, ок:ч(ок)+' л', нет:ч(нет)+' л', раз:(г==='O2'?'Кислорода 21 %':'Азота 78 %')+': '+V+' × '+д+' : 100 = '+ч(ок)+' л.'}; }));
  const П2 = поМесту([['Тлеющая лучинка в нём вспыхивает','кислород','азот'],['Известковая вода мутнеет','углекислый газ','кислород'],['Его в воздухе больше всего','азот','кислород'],['Им мы дышим','кислород','азот'],
    ['Его больше в выдохе','углекислый газ','кислород'],['Горящая лучинка гаснет, известковая вода чистая','азот','углекислый газ'],['Его выделяют растения на свету','кислород','азот'],['Им наполняют лампы накаливания','аргон','кислород'],
    ['Его используют в огнетушителях','углекислый газ','кислород'],['Без него не горит огонь','кислород','аргон'],['Он остаётся, когда кислород связан ржавчиной','азот','кислород'],['Его около 1 % в воздухе','аргон','азот'],
    ['Газ в газировке','углекислый газ','азот'],['Подушки безопасности в машинах раздуваются им','азот','кислород'],['В нём ржавеет железо','кислород','азот'],['Сухой лёд — это твёрдый…','углекислый газ','кислород']]
    .map(([ф,ок,нет])=>({q:'«'+ф+'». Какой это газ?', ф:ф, ок:ок, нет:нет, раз:'Это '+ок+'.'})));
  const П3 = [['Воздух',0],['Кислород',1],['Азот',1],['Морская вода',0],['Дистиллированная вода',1],['Углекислый газ',1],['Выдыхаемый воздух',0],['Сок',0],
    ['Аргон',1],['Молоко',0],['Медь',1],['Природный газ',0],['Железо',1],['Почва',0],['Сахар',1],['Чай с сахаром',0]]
    .map(([ф,ч0])=>({q:'«'+ф+'» — смесь или чистое вещество?', ф:ф, вар:['смесь','чистое вещество'], в:ч0, раз:ч0?'Чистое вещество: из одного вида частиц.':'Смесь: в ней несколько разных веществ.'}));

  const CSS=`
  #lvis .s6.l114n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l114n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l114n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l114n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l114n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l114n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l114n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l114n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l114n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l114n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l114n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l114n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l114n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l114n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l114n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l114n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l114n table.итоги td{white-space:normal!important}
  #lvis .s6.l114n table.итоги td:first-child{width:46%}
  #lvis .s6.l114n table.итоги{table-layout:fixed}
  #lvis .s6.l114n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l114n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l114n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l114n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l114n .ask button{text-align:left}
  #lvis .s6.l114n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l114n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l114n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l114n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l114n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l114n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l114n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l114n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l114n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l114n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l114n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l114n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l114n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l114n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l114n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l114n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l114n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l114n .плитка span{text-align:center}
  #lvis .s6.l114n .плитка:active{transform:scale(.96)}
  #lvis .s6.l114n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l114n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l114n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l114n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l114n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l114n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l114n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l114n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l114n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l114n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l114n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l114n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l114n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l114n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l114n{gap:14px}
  #lvis .s6.l114n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l114n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l114n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l114n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l114n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l114n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l114n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l114n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l114n .карт .текст b{color:${GOLD}}
  #lvis .s6.l114n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l114n .правило b{color:${GOLD}}
  #lvis .s6.l114n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l114n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l114n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l114n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l114n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l114n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l114n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l114n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l114n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l114n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l114n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l114n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l114n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l114n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l114n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l114n .буйки button.мимо{border-color:${RED};animation:l114nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l114nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l114n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l114n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l114n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l114n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l114n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l114n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l114n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l114n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l114n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l114n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l114n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l114n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l114n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l114n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l114n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l114n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l114n .уровни .точка.сейчас{background:${GOLD};animation:l114ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l114ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l114n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l114n{-webkit-text-size-adjust:100%}
  #lvis .s6.l114n [data-anim]{animation:l114nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l114nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l114n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l114n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l114n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l114n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l114n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l114n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l114n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l114n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l114n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l114n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l114n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l114n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l114n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l114n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l114n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l114n .акт span.до{background:#24402c}
  #lvis .s6.l114n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l114n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l114n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l114n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l114n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l114n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l114n .две-колонки li{margin:2px 0}
  #lvis .s6.l114n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l114n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l114n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l114n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l114n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l114n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l114n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l114n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l114n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l114n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l114n ul.памятка li{margin:3px 0}
  #lvis .s6.l114n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l114n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l114n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l114n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l114n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l114n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l114n table.тепло td,#lvis .s6.l114n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l114n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l114n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l114n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l114n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l114n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l114n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l114n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l114n table.детектив th{width:auto!important}
  #lvis .s6.l114n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l114n table.детектив td{font-size:12.5px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l114n [data-anim]{animation:none!important}
    #lvis .s6.l114n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l114n button{transition:none!important;animation:none!important}
  }`;

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l114n-style');
      if(!s){ s=document.createElement('style'); s.id='l114n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r114Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c114-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <radialGradient id="c114-лампа" cx="0.5" cy="0.5" r="0.5">
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
    return `<g filter="url(#c114-тень)">
      <rect x="${(cx-ш/2).toFixed(1)}" y="${(y-в+4).toFixed(1)}" width="${ш.toFixed(1)}" height="${в}"
        rx="${(в/2).toFixed(1)}" fill="rgba(14,26,20,.92)" stroke="${цвет||GOLD}" stroke-width="1.3"/>
      ${т(cx,y-2,текст,к,цвет||GOLD,true)}
    </g>`;
  };
  /* облачко-реплика */
  const реплика = (x,y,ш,текст,хвост) => `<g filter="url(#c114-тень)">
      <rect x="${x}" y="${y}" width="${ш}" height="30" rx="14" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <path d="M${хвост[0]} ${y+29} l${хвост[1]} 12 l6 -12z" fill="#fffaf0" stroke="${ОБВОД}" stroke-width="1"/>
      <rect x="${хвост[0]-1}" y="${y+26}" width="10" height="5" fill="#fffaf0"/></g>
      ${т(x+ш/2,y+20,текст,14,ЧЕРНИЛА,true)}`;
  /* плиты агоры: перспектива к центру, стыки камня */
  const плиты = (y0,Н) => `<linearGradient id="c114-плиты" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eadfc4"/><stop offset="1" stop-color="#c4ad84"/></linearGradient>
    <rect x="0" y="${y0}" width="336" height="${Н-y0}" fill="url(#c114-плиты)"/>
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
  const ПЛИТКИ = (плитки,обработчик,колонок,выбор) => `<div class="лоток" data-anim style="--i:4${колонок?';grid-template-columns:repeat('+колонок+',minmax(0,1fr))':''}">${плитки.map(([что,имя,тело],i)=>
    `<button type="button" class="плитка${выбор===i?' вкл':''}" onclick="${обработчик}(${i})"><svg viewBox="0 0 64 64" aria-hidden="true">${L_().defs()}<rect width="64" height="64" rx="8" fill="url(#рл-студия)"/>${тело}</svg><span>${имя}</span></button>`).join('')}</div>`;
  const ДВ = () => L_().ДВИЖ;
  const ИЗВВ = 'hsla(198,30%,90%,.45)', МУТЬ = 'hsla(40,15%,95%,.9)';
  const пузыри = (x,yН,yВ,ш,n) => Array.from({length:n},(_,k)=>{ const px=x-ш/2+((k*29)%ш), r=1.2+(k%3)*0.7;
    return `<circle cx="${px}" cy="${yН}" r="${r}" fill="none" stroke="#fff" stroke-width=".8" opacity=".85">${ДВ()?`<animate attributeName="cy" values="${yН};${yВ}" dur="${(0.8+(k%4)*0.25).toFixed(2)}s" begin="${((k%5)*0.15).toFixed(2)}s" repeatCount="indefinite"/>`:''}</circle>`; }).join('');
  const дым = (x,y,n) => Array.from({length:n||2},(_,k)=>`<path d="M${x-3+k*6} ${y} q-5 -8 0 -16 q5 -8 0 -16" stroke="#9aa0a6" stroke-width="1.6" fill="none" opacity=".45">${ДВ()?`<animate attributeName="opacity" values=".15;.5;.15" dur="${1.6+k*0.3}s" repeatCount="indefinite"/>`:''}</path>`).join('');
  /* полоса состава воздуха: x,y — левый верх, ш — ширина */
  const полоса = (x,y,ш,выбор,подписи) => { let s='', x0=x;
    ГАЗЫ.forEach((г,i)=>{ const w=ш*г.доля/100; s+=`<rect x="${x0.toFixed(1)}" y="${y}" width="${Math.max(3,w).toFixed(1)}" height="16" fill="${г.ц}" opacity="${выбор==null||выбор===i?1:.3}"/>`;
      if(подписи!==false) s+=тА((x0+Math.max(w,3)/2).toFixed(1),y+30,г.доля+' %',10,выбор==null||выбор===i?г.ц:'#6a7480'); x0+=w; });
    return `<rect x="${x-1}" y="${y-1}" width="${ш+2}" height="18" rx="3" fill="none" stroke="#6a7480"/>`+s; };

  /* ================= КАДРЫ ================= */

  /* 1. Карточка работы */
  function F1(s){
    const Н=246, y0=196, у=y0+14, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const пр = Л.кристаллизатор(64,у,104,24) + Л.свеча(64,у-6,0.85,false) + Л.колпак(64,у-6,66,92,{туман:true}) +
      Л.газосборник(160,у,38,76,{газ:'O2'}) + Л.стакан(232,у,48,58,{уровень:.55,объём:250,цвет:МУТЬ,муть:30,мутьЦвет:['#ffffff','#f4f2ec','#e8e4da']}) + Л.мята(298,у,0.95,1);
    const поверх = дым(64,у-60,2) + Л.лучинка(166,у-70,-62,'горит') + `<circle cx="166" cy="${у-70}" r="16" fill="url(#рл-огонь)" opacity=".6"/>` + метка(196,8,'Воздух: кислород и другие газы',ЗЛ,{кегль:11}) +
      Л.имяПрибора(64,у+12,'свеча под колпаком')+Л.имяПрибора(160,у+12,'кислород')+Л.имяПрибора(232,у+12,'известковая вода')+Л.имяПрибора(298,у+12,'мята');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Воздух: кислород и другие газы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r114вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('пара',['смесь газов','одно вещество'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Воздух — это…') :
          РАЗБОР(ок,['Верно: в воздухе несколько газов, и каждый сохраняет свои свойства.','Нет: в воздухе есть азот, кислород, аргон, углекислый газ — это <b>смесь</b>.'][в]))) +
      (ок ? ПРАВИЛО('Воздух — <b>смесь газов</b>, а не одно вещество.') : '');
  }

  /* 2. Воздух под лупой */
  function F2(s){
    const Н=292, Л=L_(), к=s.г2, вид=s.вид2||{}, все=ГАЗЫ.every((г,i)=>вид[i]), в=s.ответ2, ок=в===0;
    const мол = Array.from({length:100},(_,i)=>{ const р=(i*37)%100, гi=р<78?0:р<99?1:2, x=30+(i%10)*30.6+((i*29)%17-8)+(Math.floor(i/10)%2?8:0), y=58+Math.floor(i/10)*15.6+((i*11)%9-4), у0=(i*53)%180;
      const г=ГАЗЫ[гi], тус=к!=null&&к!==гi;
      return `<g opacity="${тус?.16:1}">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;${(i%3)-1} ${(i%2)?1.5:-1.5};0 0" dur="${(1.4+(i%5)*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}<g transform="rotate(${у0} ${x} ${y})">${Л.молекула(x,y,0.36,г.мол,{})}</g></g>`; }).join('');
    const окно = `<rect x="12" y="40" width="312" height="178" rx="14" fill="#0e1a24" stroke="url(#рл-сталь)" stroke-width="4"/><rect x="18" y="46" width="300" height="166" rx="10" fill="#2c4058" opacity=".9"/>`;
    const тело = L_().студия(Н,Н-4) + окно + мол + `<path d="M28 58 Q60 46 110 50" stroke="#fff" stroke-width="2" fill="none" opacity=".25"/>` +
      полоса(14,236,308,к) +
      метка(168,6,к==null?'100 молекул воздуха — выбери газ':ГАЗЫ[к].имя+': '+ГАЗЫ[к].доля+' из 100',к==null?ЗЛ:ГАЗЫ[к].ц,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 1','Воздух под лупой') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ГАЗЫ.map((г,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),['азот','кислород','аргон и др.'][i],'r114г('+i+')')).join('')}</div>` +
      A(4,'карт','<span class="метка">Состав воздуха</span><table class="итоги"><tr><th>Газ</th><th>доля</th><th>в 100 л</th></tr>'+
        ГАЗЫ.map((г,i)=>`<tr><td><span class="капля" style="background:${г.ц}"></span>${г.имя}</td><td>${вид[i]?г.доля+' %':'?'}</td><td>${вид[i]?г.доля+' л':'?'}</td></tr>`).join('')+'</table>') +
      (!все ? СКАЗ('Опыт','В окне — 100 молекул воздуха, как будто мы увеличили его в миллиард раз. Выбирай газы по очереди и считай.') :
        ОТВЕТЫ('три',['21 л','78 л','1 л'],0,в,2) +
        (в==null ? СКАЗ('Вопрос','Сколько литров кислорода в 100 л воздуха?') :
          РАЗБОР(ок,['Верно: кислорода 21 %, в 100 л — 21 л.','78 л — это азот. Кислорода — 21 из 100.','1 % — это аргон и другие газы. Кислорода — 21 %.'][в]))) +
      (ок ? ТЕОРИЯ('состав воздуха','В сухом воздухе <b>78 % азота</b>, <b>21 % кислорода</b>, почти <b>1 % аргона</b> и всего <b>0,04 % углекислого газа</b>. Есть и водяной пар — от долей процента до 4 %, смотря какая погода.') +
        ДИВО('Чтобы среди молекул воздуха попалась хотя бы одна молекула CO₂, нужно взять около 2500 молекул — в 25 раз больше, чем в нашем окне. А аргона в воздухе в 20 раз больше, чем углекислого газа.') +
        ПРАВИЛО('В 100 л воздуха — <b>78 л азота</b> и <b>21 л кислорода</b>.') : '');
  }

  /* 3. Сколько в воздухе кислорода (железная вата) */
  function F3(s){
    const Н=284, y0=236, у=y0+14, Л=L_(), д=s.д3==null?0:s.д3, вид=s.вид3||{0:true}, увидел=вид[7], газ=ГАЗ3[д], ржа=(100-газ)/21, в=s.ответ3, ок=в===0, луч=!!s.луч3;
    const верх=у-8-196, в0=196;
    const деления = Array.from({length:9},(_,k)=>{ const v=(k+1)*10, yy=верх+4+(в0-8)*v/100;
      return `<path d="M${150+12} ${yy.toFixed(1)} H${150+20}" stroke="#fff" stroke-width="${v%20?0.6:1}" opacity=".8"/>`+(v%20===0?тА(150+30,(yy+3).toFixed(1),String(v),7,'#fff','start'):''); }).join('');
    const пр = Л.кристаллизатор(150,у,190,44);
    const уровень = верх+4+(в0-8)*газ/100;
    const поверх = Л.цилиндрВверхДном(150,у-8,40,в0,газ,100) + Л.вата(150,верх+24,13,ржа) + деления +
      (д>0?`<path d="M124 ${уровень.toFixed(1)} H176" stroke="#ffd76a" stroke-width="1.2" stroke-dasharray="3 2"/>`+метка(76,уровень-10,'газа: '+газ+' мл',ЗЛ,{кегль:10}):'') +
      метка(250,8,д===0?'день 0: 100 мл воздуха':'прошло дней: '+д,д?КР:ЗЛ,{кегль:11}) +
      (луч&&д===7 ? Л.газосборник(282,у,34,62,{}) + Л.лучинка(288,у-70,-62,'нет') + дым(284,у-76,2) + метка(282,у-112,'погасла!',КР,{кегль:10}) + Л.имяПрибора(282,у+12,'остаток газа') : '');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 2','Сколько в воздухе кислорода') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${ДНИ3.map(дд=>BTN(3,д===дд?'вкл':'',дд===0?'старт':дд+' дн.','r114д('+дд+')')).join('')}</div>` +
      СКАЗ('Опыт','В мерный цилиндр на 100 мл положили влажную железную вату и опустили его горлом в воду. Внутри — 100 мл воздуха. Железо ржавеет и забирает из воздуха один из газов. Листай дни.') +
      A(8,'карт','<span class="метка">Журнал опыта</span><table class="итоги"><tr><th>День</th>'+ДНИ3.map(дд=>'<th>'+дд+'</th>').join('')+'</tr><tr><td>газ, мл</td>'+ДНИ3.map(дд=>'<td>'+(вид[дд]?ГАЗ3[дд]:'—')+'</td>').join('')+'</tr></table>') +
      (!увидел||д!==7 ? (увидел?СКАЗ('Журнал','Вернись к 7-му дню, чтобы ответить на вопрос.'):'') : ОТВЕТЫ('',['около пятой части — 21 мл из 100','половина воздуха','весь воздух'],0,в,3) +
        (в==null ? СКАЗ('Вопрос','Дальше 79 мл газ не убывает. Какая часть воздуха израсходовалась?') :
          РАЗБОР(ок,['Верно: 21 мл из 100 — это 21 %. Железо забрало весь <b>кислород</b>.','Половина — слишком много: газа осталось 79 мл.','Газа осталось 79 мл — израсходовалась только часть.'][в]))) +
      (ок&&!луч&&д===7 ? `<div class="ask">${BTN(9,'','Проверить остаток газа горящей лучинкой',"r114луч()")}</div>` : '') +
      (ок&&луч ? ТЕОРИЯ('кислород','Железо ржавеет, соединяясь с <b>кислородом</b>. Когда кислород кончился, ржавление остановилось: исчез 21 % воздуха. Остаток — в основном <b>азот</b>: горение он не поддерживает, лучинка гаснет.') +
        ДИВО('Похожий опыт поставил Антуан Лавуазье: он 12 дней нагревал ртуть в закрытом сосуде. Воздуха стало меньше на пятую часть, а в остатке гасла свеча. Остаток он назвал «азот» — «безжизненный».') +
        ПРАВИЛО('Кислорода в воздухе — <b>21 %</b>, почти пятая часть.') : '');
  }

  /* 4. Газовый детектив */
  function F4(s){
    const Н=276, y0=226, у=y0+14, Л=L_(), к=s.с4, т=s.т4||{}, м=s.м4||{}, посл=s.посл4, отз=s.отз4, все=СКЛЯНКИ.every((x,j)=>м[j]===x.газ);
    const xs=[70,168,266];
    let пр='', поверх='';
    СКЛЯНКИ.forEach((x,j)=>{ const тест=посл&&посл.j===j?посл.п:null, извв=тест==='извв', открыта=тест==='тлеет'||тест==='горит';
      const муть = (т[j]||{}).извв ? `<rect x="${xs[j]-23}" y="${у-16}" width="46" height="14" fill="${x.газ==='CO2'?МУТЬ:ИЗВВ}"/>` : '';
      пр += Л.газосборник(xs[j],у,50,96,{пластинка:!открыта,внутри:муть});
      поверх += (к===j?`<ellipse cx="${xs[j]}" cy="${у+3}" rx="34" ry="5" fill="#ffd76a" opacity=".4"/>`:'') + тА(xs[j],у-104,x.б,18,'#eef2f6') +
        (м[j] ? метка(xs[j],у+8,м[j]==='O2'?'O₂':м[j]==='N2'?'N₂':'CO₂',м[j]===x.газ?ЗЕ:КР,{кегль:10}) : '');
      if(открыта){ const вид = x.газ==='O2' ? 'горит' : 'нет';
        поверх += Л.лучинка(xs[j]+6,у-70,-62,вид) + (x.газ==='O2' ? `<circle cx="${xs[j]+6}" cy="${у-72}" r="${тест==='горит'?26:20}" fill="url(#рл-вспышка)" opacity=".7"/>` : дым(xs[j]+4,у-76,2)); } });
    поверх += метка(168,4,!посл?(к==null?'выбери склянку и пробу':м[к]===СКЛЯНКИ[к].газ?'склянка '+СКЛЯНКИ[к].б+' — '+ИМЯ_ГАЗА[м[к]]+' ✓':'склянка '+СКЛЯНКИ[к].б+': выбери пробу'):'склянка '+СКЛЯНКИ[посл.j].б+': '+ПРОБЫ.find(п=>п.к===посл.п).имя.toLowerCase()+' — '+ИТОГ[СКЛЯНКИ[посл.j].газ][посл.п],!посл?ЗЛ:ИТОГ[СКЛЯНКИ[посл.j].газ][посл.п].match(/вспыхн|ярче|помутн/)?СН:КР,{кегль:9});
    const плитки = [['тлеет','Тлеющая',Л.лучинка(14,40,-24,'тлеет')],['горит','Горящая',Л.лучинка(14,46,-24,'горит')],['извв','Изв. вода',Л.стакан(32,56,34,38,{уровень:.6,цвет:ИЗВВ})]];
    const К=к==null?null:СКЛЯНКИ[к];
    return ЖУРНАЛ(s) + ШАПКА('Опыт 3','Газовый детектив') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${СКЛЯНКИ.map((x,j)=>BTN(3,(к===j?'вкл':'')+(м[j]===x.газ?' был':''),(м[j]===x.газ?'✓ ':'')+'Склянка '+x.б,'r114с('+j+')')).join('')}</div>` +
      (К ? ПЛИТКИ(плитки,'r114п',3,null) : '') +
      (К&&м[к]!==К.газ ? A(5,'карт задача','<span class="метка">Склянка '+К.б+'</span><div class="текст">Проверь пробами и назови газ.</div>') +
        `<div class="ask три">${['O2','N2','CO2'].map((г,i)=>BTN(6+i,отз&&!отз.ок&&отз.г===г?'miss':'',['O₂','N₂','CO₂'][i],"r114м('"+г+"')")).join('')}</div>` : '') +
      (отз ? РАЗБОР(отз.ок,отз.т) : !К ? СКАЗ('Задание','В трёх склянках — кислород, азот и углекислый газ. Все три бесцветные и без запаха. Выбери склянку, проверь её пробами и назови газ.') : '') +
      A(8,'карт','<span class="метка">Протокол проб</span><table class="итоги узкая детектив"><tr><th>Склянка</th><th>тлеющая</th><th>горящая</th><th>изв. вода</th></tr>'+
        СКЛЯНКИ.map((x,j)=>'<tr><td><b>'+x.б+'</b>'+(м[j]===x.газ?' — '+ИМЯ_ГАЗА[x.газ].split(' ')[1]:'')+'</td>'+ПРОБЫ.map(п=>'<td>'+((т[j]||{})[п.к]?ИТОГ[x.газ][п.к].replace('вспыхнула ярким пламенем','вспыхнула').replace('горит ещё ярче','ярче').replace('осталась прозрачной','чистая'):'—')+'</td>').join('')+'</tr>').join('')+'</table>') +
      (все ? ТЕОРИЯ('распознавание газов','<b>Кислород</b>: тлеющая лучинка вспыхивает. <b>Азот</b> и <b>углекислый газ</b>: лучинка гаснет. Различает их <b>известковая вода</b>: от CO₂ она мутнеет, от азота — нет. Одной пробы мало — нужны две.') +
        ДИВО('Азот и углекислый газ гасят огонь, поэтому ими заполняют огнетушители и защищают от пожара склады и серверные: огонь гаснет без воды и ничего не портит.') +
        ПРАВИЛО('Лучинка вспыхнула — <b>O₂</b>. Погасла и вода мутнеет — <b>CO₂</b>. Погасла, вода чистая — <b>N₂</b>.') : '');
  }

  /* 5. Свеча под колпаками */
  function F5(s){
    const Н=258, y0=214, у=y0+14, Л=L_(), накр=!!s.накр5, в=s.ответ5, ок=в===0, в2=s['ответ5б'], ок2=в2===0;
    const xs=[64,168,276], разм=[[56,66],[72,88],[92,114]];
    let пр='', поверх='';
    КОЛПАКИ.forEach((к0,i)=>{ const [ш,в0]=разм[i];
      пр += Л.свеча(xs[i],у,0.8,!накр);
      поверх += Л.колпак(xs[i],накр?у:у-50,ш,в0,{туман:накр}) + (накр?дым(xs[i],у-40,1):'') +
        метка(xs[i],накр?у-в0-34:у-в0-82,к0.л+' л'+(накр?' · '+к0.с+' с':''),накр?ЗЕ:ЗЛ,{кегль:10}); });
    return ЖУРНАЛ(s) + ШАПКА('Опыт 4','Свеча под колпаками') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ask">${BTN(3,накр?'hit':'',накр?'Колпаки опущены — время записано':'Накрыть три свечи и засечь время',накр?'':"r114накр()")}</div>` +
      (накр ? A(4,'карт','<span class="метка">Секундомер</span><table class="итоги"><tr><th>Колпак</th><th>0,5 л</th><th>1 л</th><th>2 л</th></tr><tr><td>горела</td><td>8 с</td><td>16 с</td><td>32 с</td></tr></table>') +
        ОТВЕТЫ('пара',['там больше кислорода','там теплее'],0,в,5) +
        (в==null ? СКАЗ('Вопрос','Почему под большим колпаком свеча горит дольше?') :
          РАЗБОР(ок,['Верно: воздуха больше — больше и кислорода для горения.','Дело не в тепле: под большим колпаком больше воздуха, а значит, и кислорода.'][в])) : СКАЗ('Опыт','Три одинаковые свечи, три колпака: 0,5 л, 1 л и 2 л. Накрой их одновременно.')) +
      (ок ? ОТВЕТЫ('три',['около 64 с','около 32 с','около 8 с'],0,в2,'5б') + (в2==null ? СКАЗ('Вопрос','Сколько примерно будет гореть свеча под колпаком 4 л?') :
        РАЗБОР(ок2,['Верно: объём вдвое больше, чем 2 л, — и время вдвое больше: 64 с.','32 с — это под колпаком 2 л. Под 4 л — вдвое дольше.','8 с — под самым маленьким. Здесь кислорода в 8 раз больше.'][в2])) : '') +
      (ок&&ок2 ? ТЕОРИЯ('кислород и горение','Свеча горит, пока под колпаком есть кислород. Объём вдвое больше — кислорода вдвое больше — свеча горит вдвое дольше. Когда кислорода становится слишком мало, пламя гаснет, хотя воска ещё много.') +
        ДИВО('Знаменитый опыт «свеча в банке над водой» часто показывают, чтобы измерить кислород: вода поднимается под банку. Но он неточный — газ под банкой ещё и остывает и сжимается. Поэтому учёные мерят кислород опытом с ржавеющим железом.') +
        ПРАВИЛО('Нет кислорода — нет горения.') : '');
  }

  /* 6. Вдох и выдох */
  const лицо = (x,y) => `<g><path d="M${x+10} ${y+34} Q${x+4} ${y+50} ${x+2} ${y+70} H${x+60} V${y+34} Z" fill="#3a8a8a"/>
    <path d="M${x+14} ${y-4} Q${x+14} ${y-34} ${x+40} ${y-36} Q${x+66} ${y-36} ${x+66} ${y-6} Q${x+66} ${y+22} ${x+46} ${y+30} Q${x+24} ${y+34} ${x+18} ${y+20} L${x+14} ${y+14} Q${x+8} ${y+12} ${x+10} ${y+6} L${x+4} ${y+2} Q${x+2} ${y-2} ${x+10} ${y-4} Z" fill="#f2c8a0"/>
    <path d="M${x+14} ${y-8} Q${x+16} ${y-38} ${x+42} ${y-40} Q${x+70} ${y-38} ${x+70} ${y-8} Q${x+70} ${y+12} ${x+62} ${y+20} Q${x+58} ${y-6} ${x+46} ${y-12} Q${x+30} ${y-18} ${x+14} ${y-8} Z" fill="#6a3a1a"/>
    <circle cx="${x+22}" cy="${y-4}" r="2.2" fill="#2a2a2a"/><ellipse cx="${x+50}" cy="${y+4}" rx="4" ry="6" fill="#e8b890"/><circle cx="${x+15}" cy="${y+18}" r="2.6" fill="#9a4a3a"/></g>`;
  function F6(s){
    const Н=262, y0=216, у=y0+14, Л=L_(), г=!!s.г6, д=!!s.в6, в=s.ответ6, ок=в===1;
    const пр = Л.груша(28,у,1.2,г) + Л.колба(110,у,1.05,{уровень:.42,цвет:ИЗВВ,пузырьки:г}) + Л.колба(232,у,1.05,{уровень:.42,цвет:д?МУТЬ:ИЗВВ,пузырьки:д});
    const поверх = Л.трубка(`M28 ${у-46} V${у-130} Q28 ${у-140} 38 ${у-140} H100 Q110 ${у-140} 110 ${у-130} V${у-22}`) +
      Л.трубка(`M232 ${у-22} V${у-128} Q232 ${у-140} 244 ${у-140} H262`) + лицо(258,у-150) +
      (д?`<path d="M266 ${у-136} q-10 -2 -20 0" stroke="#bfe6fa" stroke-width="2" fill="none" opacity=".7"/>`:'') +
      метка(70,4,г?'воздух из груши: вода чистая':'вдыхаемый воздух',г?СН:ЗЛ,{кегль:10}) + метка(210,30,д?'выдох: вода помутнела!':'выдыхаемый воздух',д?КР:ЗЛ,{кегль:10}) +
      Л.имяПрибора(110,у+12,'известковая вода')+Л.имяПрибора(232,у+12,'известковая вода');
    return ЖУРНАЛ(s) + ШАПКА('Опыт 5','Вдох и выдох') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ask пара">${BTN(3,г?'hit':'','Качать воздух грушей',"r114груша()")}${BTN(4,д?'hit':'','Подуть через трубочку',"r114выдох()")}</div>` +
      (г&&д ? A(5,'карт','<span class="метка">Вдыхаемый и выдыхаемый воздух</span><table class="итоги узкая"><tr><th>Газ</th><th>вдох</th><th>выдох</th></tr>'+СОСТАВ.map(([а,б,в0])=>`<tr><td>${а}</td><td>${б}</td><td>${в0}</td></tr>`).join('')+'</table>') +
        ОТВЕТЫ('пара',['во вдыхаемом','в выдыхаемом'],1,в,6) +
        (в==null ? СКАЗ('Вопрос','Где больше углекислого газа?') :
          РАЗБОР(ок,['Нет: известковая вода от вдыхаемого воздуха осталась чистой.','Верно: в выдохе около 4 % CO₂ — в сто раз больше, чем в комнатном воздухе.'][в])) :
        СКАЗ('Опыт','В обеих колбах — прозрачная известковая вода. Через левую прокачай грушей комнатный воздух, в правую подуй через трубочку.')) +
      (ок ? ТЕОРИЯ('дыхание','Мы вдыхаем воздух с 21 % кислорода, а выдыхаем — с 16 %: часть кислорода забирает кровь. Взамен клетки отдают <b>углекислый газ</b> и <b>воду</b>: в выдохе CO₂ около 4 %, и пар оседает на холодном стекле.') +
        ДИВО('В выдохе всё ещё 16 % кислорода — этого хватает, чтобы спасти человека: на этом основано искусственное дыхание «рот в рот».') +
        ПРАВИЛО('Выдох беднее кислородом и богаче <b>углекислым газом</b>.') : '');
  }

  /* 7. Опыт Пристли */
  function F7(s){
    const Н=272, y0=224, у=y0+14, Л=L_(), к=s.п7==null?0:s.п7, П=ПРИСТЛИ[к], зж=s.з7||{}, пробовал=!!зж[к], горит=пробовал&&П.д>=10, в=s.ответ7, ок=в===0;
    const сила = П.д===0?0:П.д<10?0.45:1;
    const пр = `<rect x="70" y="${у-6}" width="196" height="6" rx="2" fill="url(#рл-доска)"/>` + Л.свеча(136,у-6,1,горит) + Л.мята(210,у-6,1.05,сила);
    const луч = пробовал ? `<path d="M40 40 L96 ${у-120}" stroke="#ffe9a0" stroke-width="7" opacity=".18"/><ellipse cx="96" cy="${у-120}" rx="5" ry="14" transform="rotate(-35 96 ${у-120})" fill="url(#рл-стекло)" stroke="#c8ccd0" stroke-width="1.4"/><path d="M96 ${у-120} L136 ${у-52}" stroke="#fff3c0" stroke-width="1.6" opacity=".8" stroke-dasharray="3 3"/>` : '';
    const поверх = луч + Л.колпак(168,у-6,170,176,{туман:!горит}) + (!горит&&пробовал?дым(136,у-62,2):'') +
      (пробовал&&!горит?метка(136,у-200,'не загорелась',КР,{кегль:10}):'') + (горит?метка(136,у-200,'горит!',ЗЕ,{кегль:11}):'') +
      `<circle cx="28" cy="30" r="14" fill="#ffd76a"/>${[0,1,2,3,4,5,6,7].map(k=>`<path d="M${28+Math.cos(k*0.785)*18} ${30+Math.sin(k*0.785)*18} L${28+Math.cos(k*0.785)*24} ${30+Math.sin(k*0.785)*24}" stroke="#ffd76a" stroke-width="2"/>`).join('')}` +
      метка(240,4,П.д===0?'17 августа 1771 года: свеча погасла':П.д===10?'27 августа: прошло 10 дней':'прошло 3 дня',ЗЛ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Опыт 6','Опыт Пристли') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${ПРИСТЛИ.map((x,i)=>BTN(3,к===i?'вкл':'',x.имя,'r114п7('+i+')')).join('')}</div>` +
      `<div class="ask">${BTN(4,горит?'hit':'',пробовал?(горит?'Свеча горит':'Не загорается…'):'Зажечь свечу лупой от солнца',пробовал?'':"r114заж()")}</div>` +
      СКАЗ('История','Джозеф Пристли накрыл свечу колпаком — она погасла. Тогда он поставил под тот же колпак веточку мяты и оставил на свету. Попробуй зажигать свечу (Пристли поджигал её солнечным лучом через линзу).') +
      (горит ? ОТВЕТЫ('пара',['мята выделила кислород','свеча отдохнула'],0,в,7) +
        (в==null ? СКАЗ('Вопрос','Почему через 10 дней свеча снова горит?') :
          РАЗБОР(ок,['Верно: зелёное растение на свету выделяет кислород.','Свеча тут ни при чём: под колпаком снова появился кислород — его выделила мята.'][в])) : '') +
      (ок ? ТЕОРИЯ('растения и кислород','Зелёные растения на свету поглощают углекислый газ и выделяют <b>кислород</b> — это фотосинтез. Почти весь кислород воздуха сделан растениями: лесами, травами и крошечными водорослями океана.') +
        ДИВО('Пристли записал: «17 августа 1771 года я поставил веточку мяты в воздух, где сгорела свеча, а 27-го другая свеча прекрасно в нём горела». Позже Ингенхауз доказал: растениям для этого нужен <b>свет</b>.') +
        ПРАВИЛО('Растения на свету <b>возвращают</b> кислород в воздух.') : '');
  }

  /* 8. Вывод */
  function F8(s){
    const Н=230, y0=190, у=y0+14, Л=L_();
    const пр = Л.газосборник(44,у,34,64,{газ:'O2',пластинка:true}) + Л.газосборник(92,у,34,64,{пластинка:true}) + Л.газосборник(140,у,34,64,{газ:'CO2',пластинка:true}) + Л.свеча(206,у,0.8,true) + Л.мята(286,у,0.9,1);
    const поверх = полоса(24,18,288,null) + тА(44,у-72,'O₂',11,'#ff8a7a') + тА(92,у-72,'N₂',11,'#8aa8ff') + тА(140,у-72,'CO₂',11,'#c8ced6');
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Что показали опыты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Воздух — <b>смесь</b>: 78 % азота, 21 % кислорода, около 1 % аргона и других газов.<br>• Кислород поддерживает горение и дыхание: тлеющая лучинка в нём вспыхивает.<br>• Азот и CO₂ горение гасят; CO₂ мутит известковую воду.<br>• В выдохе меньше кислорода и больше CO₂.<br>• Растения на свету выделяют кислород.</div>') +
      ПРАВИЛО('В 100 л воздуха — 78 л азота и 21 л кислорода.');
  }

  /* 9. Марафон */
  function F9(s){
    const Н=200, y0=156, Л=L_(), м9=s.мар9||{}, n=Math.min(м9.n||0,МАРАФОН.length), ош=Math.min(м9.ош||0,3), отв=s.отв9, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = [0,1,2].map(i=>Л.свеча(244+i*34,y0+14,0.66,i<3-ош)).join('') + Л.газосборник(70,y0+14,34,64,{газ:'O2',пластинка:true});
    const поверх = все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,80,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}) + Л.имяПрибора(278,y0+28,'попытки');
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Состав воздуха и свойства его газов ты знаешь.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r114заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r114мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни опыты урока.')) : '')) +
      (все ? ПРАВИЛО('78 % азота, 21 % кислорода, 1 % остального.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Воздух — это…', варианты:[{т:'смесь газов',ок:true},{т:'простое вещество',ок:false}], разбор:'В воздухе несколько газов.' },
    { вопрос:'Сколько примерно литров азота в 100 л воздуха?', варианты:[{т:'21 л',ок:false},{т:'78 л',ок:true}], разбор:'Азота около 78 %.' },
    { вопрос:'В каком газе тлеющая лучинка вспыхивает ярким пламенем?', варианты:[{т:'в кислороде',ок:true},{т:'в азоте',ок:false}], разбор:'Кислород поддерживает горение.' },
    { вопрос:'Известковая вода помутнела. Это…', варианты:[{т:'азот',ок:false},{т:'углекислый газ',ок:true}], разбор:'CO₂ мутит известковую воду.' },
    { вопрос:'Сколько литров кислорода в 300 л воздуха?', варианты:[{т:'63 л',ок:true},{т:'21 л',ок:false}], разбор:'21 % от 300 = 63 л.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r114Reset()")}</div>` +
        ПРАВИЛО('Кислород — 21 %, азот — 78 %.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r114Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const МОЛ_ГАЗА = {кислород:'O2',азот:'N2','углекислый газ':'CO2',аргон:'Ar'};
  const Т = {
    т1:{ имя:'Литры газов', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=150, y0=132, отв=ст.ответ!=null, ш=300, x=18;
        const ок=з.г==='O2';
        return свгЛ(L_().студия(Н,y0)+метка(168,6,'V = '+з.V+' л воздуха',ЗЛ,{кегль:12})+полоса(x,52,ш,отв?(ок?1:0):null,false)+
          тА(x+ш*0.39,84,'азот 78 %',10,'#8aa8ff')+тА(x+ш*0.885,84,'O₂ 21 %',10,'#ff8a7a')+(отв?метка(x+ш*(ок?0.885:0.39),96,'= '+з.ок,ок?КР:СН,{кегль:12}):тА(168,112,'сколько литров?',11,'#c8ced6'))+(ст.серия>=3?метка(168,104,'серия: '+ст.серия,ЗЕ,{кегль:10}):''),Н); } },
    т2:{ имя:'Какой газ', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=164, отв=ст.ответ!=null, [а,б]=з.вар, хор=з.вар[з.в];
        const мол=(x,имя)=>(отв&&имя===хор?`<circle cx="${x}" cy="92" r="40" fill="#8fd1a8" opacity=".14" stroke="#8fd1a8" stroke-width="2"/>`:'')+Л.молекула(x,92,1.1,МОЛ_ГАЗА[имя]||'N2',{подписи:true})+тА(x,148,имя,11,'#c8ced6');
        return свгЛ(L_().студия(Н,y0)+мол(92,а)+мол(244,б)+метка(168,6,з.ф,ЗЛ,{кегль:з.ф.length>36?9:10})+(ст.серия>=3?метка(168,152,'серия: '+ст.серия,ЗЕ,{кегль:10}):''),Н); } },
    т3:{ имя:'Смесь или вещество', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=160, y0=150, отв=ст.ответ!=null, смесь=з.в===0;
        const ц = (i) => !отв ? '#6a7480' : смесь ? ['#5a7aff','#ff5a4a','#f0d020','#8fd1a8'][i%4] : '#7fd1ff';
        const точки = Array.from({length:24},(_,i)=>`<circle cx="${110+(i%6)*24+((i*7)%5)}" cy="${48+Math.floor(i/6)*22+((i*3)%5)}" r="7" fill="${ц(i*(i%3+1))}"/>`).join('');
        return свгЛ(L_().студия(Н,y0)+`<rect x="96" y="32" width="144" height="98" rx="12" fill="#0e1a24" stroke="#4a525c"/>`+точки+(отв?'':тА(168,90,'?',30,'#eef2f6'))+
          метка(168,4,з.ф,ЗЛ,{кегль:11})+(отв?метка(168,134,смесь?'разные частицы — смесь':'одинаковые частицы — вещество',смесь?ЗЛ:СН,{кегль:9}):'')+(ст.серия>=3?метка(290,60,'серия: '+ст.серия,ЗЕ,{кегль:9}):''),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r114Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:16px">'+в+'</span>', "r114T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r114TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L114 = {
    id: ID, title: 'Воздух: кислород и другие газы', ico: '💨',
    src: 'Химия · 5–6 класс · Воздух', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Опыт 1: воздух под лупой — 100 молекул.',
      'Опыт 2: сколько в воздухе кислорода.',
      'Опыт 3: газовый детектив — O₂, N₂, CO₂.',
      'Опыт 4: свеча под колпаками.',
      'Опыт 5: вдох и выдох.',
      'Опыт 6: опыт Пристли.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: литры газов.',
      'Тренажёр 2: какой газ.',
      'Тренажёр 3: смесь или вещество.'
    ],
    check: { q: 'В каком газе тлеющая лучинка вспыхивает ярким пламенем?', choices: ['В азоте','В кислороде','В углекислом газе','В водяном паре'], ans: 1, exp: 'Кислород поддерживает горение, а азот и CO₂ — нет.' },
    tasks: [
      { q: 'Сколько примерно литров азота в 100 л воздуха?', kind: 'unit', ans: 78, tol: 0, hints: ['Азота в воздухе около 78%.', '78% от 100 л = 78 л.'], sol: '78% от 100 л = 78 л азота.' },
      { q: 'Воздух — это…', kind: 'choice', choices: ['Простое вещество','Смесь газов','Химическое соединение','Жидкость'], ans: 1, tol: 0, hints: ['В нём несколько разных газов.', 'Азот, кислород, углекислый газ…'], sol: 'Воздух — смесь газов.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.колпак){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L114.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9,F10];
    const сцена0 = f<=10 ? Ф[f-1](s) : тренажёр(s,'т'+(f-10),f-10);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Опыт 1',3:'Опыт 2',4:'Опыт 3',5:'Опыт 4',6:'Опыт 5',7:'Опыт 6',8:'Вывод',9:'Проверка',10:'Практика',
      11:'Тренажёр 1',12:'Тренажёр 2',13:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l114n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Воздух'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r114Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r114вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r114г=(i)=>{ const s=S(); if(!ГАЗЫ[i]) return; s.г2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; chRender(0); };
  window.r114д=(д)=>{ const s=S(); if(!ДНИ3.includes(д)) return; s.д3=д; const в=Object.assign({0:true},s.вид3||{}); ДНИ3.forEach(x=>{ if(x<=д) в[x]=true; }); s.вид3=в; chRender(0); };
  window.r114луч=()=>{ const s=S(); if(s.ответ3!==0) return; s.луч3=true; s.дело_кислород=true; chRender(0); };
  window.r114с=(j)=>{ const s=S(); if(!СКЛЯНКИ[j]) return; s.с4=j; s.отз4=null; if(s.посл4&&s.посл4.j!==j) s.посл4=null; chRender(0); };
  window.r114п=(i)=>{ const s=S(); const j=s.с4, П=ПРОБЫ[i]; if(j==null||!П) return; const т=Object.assign({},s.т4||{}); т[j]=Object.assign({},т[j]||{}); т[j][П.к]=true; s.т4=т; s.посл4={j:j,п:П.к};
    const газ=СКЛЯНКИ[j].газ; s.отз4={ок:true,т:'Склянка '+СКЛЯНКИ[j].б+': '+П.имя.toLowerCase()+' — '+ИТОГ[газ][П.к]+'.'}; chRender(0); };
  window.r114м=(г)=>{ const s=S(); const j=s.с4; if(j==null) return; const С=СКЛЯНКИ[j], т=(s.т4||{})[j]||{};
    if(!Object.keys(т).length){ s.отз4={ок:false,г:null,т:'Сначала проверь склянку '+С.б+' хотя бы одной пробой — название газа нужно доказать.'}; chRender(0); return; }
    if(г===С.газ){ const м=Object.assign({},s.м4||{}); м[j]=г; s.м4=м; const все=СКЛЯНКИ.every((x,k)=>м[k]===x.газ); if(все) s.дело_детектив=true;
      s.отз4={ок:true,т:'Верно: в склянке '+С.б+' — '+ИМЯ_ГАЗА[г]+'.'+(все?' Все три газа распознаны!':'')}; chRender(0); return; }
    let т0;
    if(г==='O2') т0 = т.тлеет||т.горит ? 'Лучинка в склянке '+С.б+' погасла — кислородом это быть не может.' : 'Проверь тлеющей лучинкой: в кислороде она вспыхивает.';
    else if(С.газ==='O2') т0 = т.тлеет||т.горит ? 'Лучинка вспыхнула — значит, газ поддерживает горение. Это кислород.' : 'Проверь лучинкой: в азоте и CO₂ она гаснет.';
    else if(г==='N2') т0 = т.извв ? 'Известковая вода помутнела — азот так не умеет.' : 'Лучинка гаснет и в азоте, и в CO₂. Различить их поможет известковая вода.';
    else т0 = т.извв ? 'Известковая вода осталась чистой — углекислого газа здесь нет.' : 'Лучинка гаснет и в азоте, и в CO₂. Различить их поможет известковая вода.';
    s.отз4={ок:false,г:г,т:т0}; chRender(0); };
  window.r114накр=()=>{ const s=S(); s.накр5=true; chRender(0); };
  window.r114груша=()=>{ const s=S(); s.г6=true; chRender(0); };
  window.r114выдох=()=>{ const s=S(); s.в6=true; chRender(0); };
  window.r114п7=(i)=>{ const s=S(); if(!ПРИСТЛИ[i]) return; s.п7=i; chRender(0); };
  window.r114заж=()=>{ const s=S(); const к=s.п7||0; const з=Object.assign({},s.з7||{}); з[к]=true; s.з7=з; chRender(0); };
  window.r114мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар9||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв9={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв9={i:м.n,ок:false,j:j}; }
    s.мар9=м; chRender(0); };
  window.r114заново=()=>{ const s=S(); s.мар9={n:0,ош:0}; s.отв9=null; chRender(0); };
  window.r114Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r114Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r114T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r114TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r114Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L114,{__планПорядок:arr[м].__планПорядок}); else arr.push(L114); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU114={render:render, L:L114};
})();
