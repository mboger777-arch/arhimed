/* ============ ХИМИЯ · УРОК 120 · «МАССОВАЯ ДОЛЯ ВЕЩЕСТВА В РАСТВОРЕ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   8 класс, манера NOBOOK (как 39–119). Карточка 120 из банка подменяется этой записью (VISKW[120]).
   Приборы — MVP/data/ris_lab.js (window.РЛ): весы с табло, лодочка, шпатель, банки, мерный цилиндр,
   мениск крупно с глазом, стакан с кристаллами и палочкой, склянки с этикетками, цвет купороса по ω.
   Живые ползунки (как в 119): двигают рисунок без полной перерисовки урока.

   ШАГИ.
   1) Карточка.
   2) Раствор и насыщение: ползунком сыплем соль в 100 г воды — табло весов, микромир ионов,
      полоса состава; после 36 г соль больше не растворяется (насыщенный раствор).
   3) Приготовь раствор: расчёт → взвешивание (тара!) → вода по мениску → перемешать → этикетка.
      Два рецепта: 50 г 10 % NaCl и 40 г 25 % CuSO₄.
   4) Разбавь и упарь: стакан купороса на весах — вода, выпаривание, добавка соли; цвет и ω вживую.
   5) Аптека: физраствор, перекись, уксус, йод — масса вещества в растворе.
   6) Смешай растворы: прогноз ω смеси, затем слить.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 120;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'раствор', имя:'Приготовь раствор', итог:'2 из 2'},
    {ключ:'разбавь', имя:'Разбавь и упарь',   итог:'3 из 3'},
    {ключ:'аптека',  имя:'Аптека',            итог:'4 из 4'},
    {ключ:'смесь',   имя:'Смешай растворы',   итог:'3 из 3'},
    {ключ:'марафон', имя:'Проверка: марафон', итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться вычислять массовую долю вещества в растворе, готовить раствор нужной концентрации, разбавлять и упаривать его.'],
    ['Принцип','<b>Раствор</b> = растворённое вещество + растворитель. <b>ω = m(вещества) : m(раствора) × 100 %</b>, где m(раствора) = m(вещества) + m(воды). Делить надо на массу <b>раствора</b>, а не воды.'],
    ['Оборудование','Электронные весы, лодочка для взвешивания, шпатель, мерный цилиндр на 100 мл, химический стакан, стеклянная палочка, склянки с этикетками, поваренная соль NaCl, медный купорос CuSO₄, дистиллированная вода.'],
    ['Ход работы','1. Рассчитать массы соли и воды.<br>2. Поставить лодочку на весы, нажать «Тара», взвесить соль.<br>3. Отмерить воду цилиндром (1 мл воды = 1 г), глаз — на уровне мениска.<br>4. Высыпать соль в стакан, влить воду, перемешать палочкой.<br>5. Перелить в склянку и подписать.'],
    ['Безопасность','Медный купорос ядовит: не брать руками, не пробовать, после работы вымыть руки. Соль берут шпателем, а не пальцами. Пролитый раствор сразу вытереть. На склянке обязательно этикетка: вещество и ω.']
  ];
  const ч2 = (v) => String(v).replace('.',',');
  const ок1 = (v) => ч2(Math.round(v*10)/10);
  const РАСТВОРИМОСТЬ = 36; /* г NaCl в 100 г воды при 20 °C */
  /* рецепты */
  const РЕЦЕПТЫ = [
    {вещ:'соль', ф:'NaCl', род:'соли', m:50, w:10, вид:'соль', цв:null},
    {вещ:'медный купорос', ф:'CuSO₄', род:'купороса', m:40, w:25, вид:'купорос', цв:'купорос'}
  ];
  const ЛОДОЧКА = 1.8; /* масса лодочки, г */
  /* разбавь и упарь: старт и цель */
  const ЦЕЛИ4 = [
    {m:100, w:20, цель:10, текст:'Разбавь до 10 %'},
    {m:100, w:20, цель:25, текст:'Упарь до 25 %'},
    {m:100, w:10, цель:25, текст:'Доведи до 25 %'}
  ];
  /* аптека */
  const ПОЛКА = [
    {имя:'Физраствор', ф:'NaCl', w:0.9, цв:'hsla(198,60%,82%,.35)', форма:'бутыль', этик:['NaCl','0,9 %']},
    {имя:'Перекись водорода', ф:'H₂O₂', w:3, цв:'hsla(198,40%,85%,.3)', форма:'тёмная', этик:['H₂O₂','3 %']},
    {имя:'Уксус столовый', ф:'CH₃COOH', w:9, цв:'hsla(45,60%,80%,.4)', форма:'бутыль', этик:['УКСУС','9 %']},
    {имя:'Йод спиртовой', ф:'I₂', w:5, цв:'hsla(20,85%,28%,.85)', форма:'малая', этик:['ЙОД','5 %']},
    {имя:'Зелёнка', ф:'краситель', w:1, цв:'hsla(150,70%,28%,.85)', форма:'малая', этик:['ЗЕЛЁНКА','1 %']}
  ];
  const ЗАДАЧИ5 = [
    {п:0, q:'Сколько соли в 500 г физраствора (0,9 %)?',            вар:['4,5 г','45 г','0,9 г'], в:0, р:'500 × 0,009 = 4,5 г — меньше чайной ложки на пол-литра.'},
    {п:1, q:'Сколько пероксида водорода в 100 г 3 %-ного раствора?', вар:['30 г','3 г','0,3 г'], в:1, р:'100 × 0,03 = 3 г. Если масса раствора 100 г, ω в процентах = граммам вещества.'},
    {п:2, q:'Сколько уксусной кислоты в 200 г столового уксуса (9 %)?', вар:['9 г','180 г','18 г'], в:2, р:'200 × 0,09 = 18 г, остальные 182 г — вода.'},
    {п:3, q:'Сколько спирта (растворителя) в 50 г 5 %-ной йодной настойки?', вар:['47,5 г','2,5 г','45 г'], в:0, р:'Йода 50 × 0,05 = 2,5 г, спирта 50 − 2,5 = 47,5 г. Растворитель не всегда вода!'}
  ];
  /* смешивание */
  const СМЕСИ = [
    {a:[100,10], b:[100,30], вар:['20 %','40 %','15 %'], в:0},
    {a:[200,5],  b:[50,30],  вар:['17,5 %','10 %','35 %'], в:1},
    {a:[100,20], b:[100,0],  вар:['20 %','10 %','40 %'], в:1}
  ];
  const МАРАФОН = [
    {q:'Массовая доля вещества в растворе:', вар:['m(вещества) : m(раствора)','m(вещества) : m(воды)','m(воды) : m(раствора)'], в:0, р:'Делим на массу всего раствора.'},
    {q:'10 г соли растворили в 90 г воды. ω =', вар:['10 %','11 %','9 %'], в:0, р:'10 : 100 = 10 %. 11 % — ошибка «делим на воду».'},
    {q:'Масса раствора из 20 г сахара и 180 г воды —', вар:['180 г','200 г','160 г'], в:1, р:'20 + 180 = 200 г.'},
    {q:'Сколько соли в 200 г 5 %-ного раствора?', вар:['10 г','40 г','5 г'], в:0, р:'200 × 0,05 = 10 г.'},
    {q:'Сколько воды нужно для 50 г 10 %-ного раствора?', вар:['45 г','50 г','5 г'], в:0, р:'Соли 5 г, воды 50 − 5 = 45 г.'},
    {q:'К 100 г 20 %-ного раствора добавили 100 г воды. ω =', вар:['10 %','20 %','40 %'], в:0, р:'20 г вещества в 200 г раствора.'},
    {q:'Из 100 г 20 %-ного раствора выпарили 20 г воды. ω =', вар:['16 %','20 %','25 %'], в:2, р:'20 : 80 = 25 %.'},
    {q:'Сколько соли в 1000 г физраствора (0,9 %)?', вар:['0,9 г','9 г','90 г'], в:1, р:'1000 × 0,009 = 9 г.'},
    {q:'Слили 100 г 10 %-ного и 100 г 30 %-ного раствора. ω =', вар:['20 %','40 %','15 %'], в:0, р:'(10 + 30) : 200 = 20 %.'},
    {q:'Раствор, в котором вещество больше не растворяется, —', вар:['насыщенный','разбавленный','концентрированный'], в:0, р:'Насыщенный: в 100 г воды при 20 °C — не больше 36 г NaCl.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([[10,90],[25,75],[5,95],[20,80],[15,135],[30,170],[8,192],[50,150],[12,108],[40,60],[9,291],[18,82],[6,54],[45,255],[60,240],[2,48]]
    .map(([a,в])=>{ const w=a/(a+в)*100, н=a/в*100;
      return {q:a+' г соли растворили в '+в+' г воды. Какова ω соли?', a:a, вода:в, w:w, ок:ок1(w)+' %', нет:ок1(Math.abs(н-w)<0.15?w*2:н)+' %',
        раз:'m(раствора) = '+a+' + '+в+' = '+(a+в)+' г; ω = '+a+' : '+(a+в)+' = '+ок1(w)+' %. Делить на воду ('+в+' г) — ошибка.'}; }));
  const П2 = поМесту([[200,5],[400,25],[150,10],[500,0.9],[80,25],[250,4],[300,3],[120,15],[60,20],[1000,9],[50,10],[90,30],[40,5],[600,2],[350,20],[75,8]]
    .map(([m,w])=>{ const ок=m*w/100, дел=m/w, нет=(Number.isInteger(дел)&&Math.abs(дел-ок)>0.5)?дел:ок*10;
      return {q:'Сколько граммов вещества в '+m+' г '+ч2(w)+' %-ного раствора?', m:m, w:w, ок:ок1(ок)+' г', нет:ок1(нет)+' г',
        раз:m+' × '+ч2(w)+' : 100 = '+ок1(ок)+' г.'}; }));
  const П3 = поМесту([[100,20,'вода',100],[100,20,'выпар',20],[200,10,'вода',50],[50,10,'выпар',25],[100,10,'вещ',20],[150,20,'вода',50],[80,25,'вода',20],[300,10,'выпар',100],
    [90,10,'вещ',10],[100,30,'вода',50],[60,20,'выпар',20],[200,5,'вещ',10],[400,10,'вода',100],[120,25,'выпар',20],[50,20,'вода',150],[100,15,'вещ',25]]
    .map(([m,w,д,x])=>{ const mв=m*w/100, m2=д==='вода'?m+x:д==='выпар'?m-x:m+x, mв2=д==='вещ'?mв+x:mв, w2=mв2/m2*100;
      const нет = д==='вещ' ? w+x/m*100 : w;
      const что = д==='вода'?'добавили '+x+' г воды':д==='выпар'?'выпарили '+x+' г воды':'добавили '+x+' г вещества';
      return {q:'К '+m+' г '+w+' %-ного раствора: '+что+'. Новая ω?', m:m, w:w, д:д, x:x, w2:w2, ок:ок1(w2)+' %', нет:ок1(Math.abs(нет-w2)<0.15?w2*2:нет)+' %',
        раз:'Вещества '+ок1(mв2)+' г, раствора '+m2+' г; ω = '+ок1(mв2)+' : '+m2+' = '+ок1(w2)+' %.'}; }));

  const CSS=`
  #lvis .s6.l120n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l120n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l120n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l120n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l120n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l120n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l120n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l120n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l120n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l120n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l120n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l120n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l120n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l120n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l120n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l120n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l120n table.итоги td{white-space:normal!important}
  #lvis .s6.l120n table.итоги td:first-child{width:46%}
  #lvis .s6.l120n table.итоги{table-layout:fixed}
  #lvis .s6.l120n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l120n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l120n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l120n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l120n .ask button{text-align:left}
  #lvis .s6.l120n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l120n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l120n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l120n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l120n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l120n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l120n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l120n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l120n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l120n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l120n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l120n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l120n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l120n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l120n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l120n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l120n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l120n .плитка span{text-align:center}
  #lvis .s6.l120n .плитка:active{transform:scale(.96)}
  #lvis .s6.l120n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l120n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l120n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l120n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l120n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l120n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l120n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l120n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l120n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l120n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l120n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l120n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l120n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l120n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l120n{gap:14px}
  #lvis .s6.l120n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l120n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l120n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l120n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l120n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l120n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l120n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l120n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l120n .карт .текст b{color:${GOLD}}
  #lvis .s6.l120n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l120n .правило b{color:${GOLD}}
  #lvis .s6.l120n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l120n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l120n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l120n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l120n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l120n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l120n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l120n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l120n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l120n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l120n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l120n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l120n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l120n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l120n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l120n .буйки button.мимо{border-color:${RED};animation:l120nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l120nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l120n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l120n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l120n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l120n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l120n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l120n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l120n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l120n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l120n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l120n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l120n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l120n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l120n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l120n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l120n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l120n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l120n .уровни .точка.сейчас{background:${GOLD};animation:l120ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l120ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l120n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l120n{-webkit-text-size-adjust:100%}
  #lvis .s6.l120n [data-anim]{animation:l120nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l120nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l120n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l120n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l120n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l120n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l120n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l120n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l120n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l120n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l120n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l120n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l120n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l120n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l120n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l120n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l120n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l120n .акт span.до{background:#24402c}
  #lvis .s6.l120n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l120n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l120n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l120n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l120n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l120n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l120n .две-колонки li{margin:2px 0}
  #lvis .s6.l120n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l120n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l120n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l120n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l120n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l120n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l120n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l120n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l120n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l120n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l120n ul.памятка li{margin:3px 0}
  #lvis .s6.l120n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l120n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l120n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l120n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l120n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l120n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l120n table.тепло td,#lvis .s6.l120n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l120n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l120n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l120n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l120n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l120n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l120n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l120n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l120n table.детектив th{width:auto!important}
  #lvis .s6.l120n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l120n table.детектив td{font-size:12.5px}
  #lvis .s6.l120n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l120n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l120n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l120n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l120n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l120n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l120n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l120n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l120n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l120n .ряд.символы button b{font-size:19px}
  #lvis .s6.l120n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l120n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l120n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l120n .коэф-яч b{font-size:26px}
  #lvis .s6.l120n .пульт-ползун{display:grid;grid-template-columns:48px 1fr 48px;gap:8px 10px;align-items:center;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:10px 10px 8px;width:100%;box-sizing:border-box}
  #lvis .s6.l120n .пульт-ползун .шапка-п{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}
  #lvis .s6.l120n .пульт-ползун .шапка-п span{font-size:14px;color:#9aa3ad}
  #lvis .s6.l120n .пульт-ползун .шапка-п b{font-size:26px;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l120n .пульт-ползун button{height:44px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;font-size:22px;font-weight:700;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l120n .пульт-ползун button:active{transform:translateY(2px)}
  #lvis .s6.l120n input[type=range].ползун{width:100%;height:44px;margin:0;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}
  #lvis .s6.l120n input[type=range].ползун::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l120n input[type=range].ползун::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e8e0cc);border:3px solid #ffd76a;margin-top:-10px;box-shadow:0 2px 8px rgba(0,0,0,.6)}
  #lvis .s6.l120n input[type=range].ползун::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l120n input[type=range].ползун::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6efe0;border:3px solid #ffd76a}
  #lvis .s6.l120n .атомы button.вкл{border-color:#ffd76a;color:#ffd76a;background:rgba(255,215,106,.15)}
  #lvis .s6.l120n .атомы button{font-size:16px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l120n [data-anim]{animation:none!important}
    #lvis .s6.l120n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l120n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l120n-style');
      if(!s){ s=document.createElement('style'); s.id='l120n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r120Отв('+f+','+к+')')).join('')}</div>`;
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
    Fe:['#e0a888','#4a2010',23], Cu:['#ffbe90','#7a300a',23], K:['#d8bcff','#3e2080',25], Mg:['#d8f4c0','#3e6a2e',23], Zn:['#d4dbe2','#444c54',23]};
  const СВЕТЛЫЕ = ['H','Al','Ca','S','Mg','Cu','Fe','Zn'];
  const ОПРЕДЕЛЕНИЯ = `
    <defs>
      <filter id="c120-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c120-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c120-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c120-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c120-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c120-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c120-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c120-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c120-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c120-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c120-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c120-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <radialGradient id="c120-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c120-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c120-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
      <linearGradient id="c120-стена" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a3a34"/><stop offset="1" stop-color="#1a2420"/></linearGradient>
      <radialGradient id="c120-свет" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ffd76a" stop-opacity=".45"/><stop offset="1" stop-color="#ffd76a" stop-opacity="0"/></radialGradient>
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c120-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c120-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c120-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c120-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c120-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c120-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c120-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c120-пад)"/>
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

  /* ---------- микромир раствора: молекулы воды и ионы Na⁺ / Cl⁻, избыток — кристаллик на дне ---------- */
  const микро = (cx,cy,r,ионов,избыток,сорт) => { const ид='c120-мик'+(cx|0);
    let s=`<clipPath id="${ид}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath><circle cx="${cx}" cy="${cy}" r="${r}" fill="${сорт==='купорос'?'#0e2a44':'#0c2232'}"/><g clip-path="url(#${ид})">`;
    const сл=(k)=>{ const v=Math.sin(k*12.9898+cx*0.1)*43758.5453; return v-Math.floor(v); };
    for(let k=0;k<26;k++){ const x=cx+(сл(k)-0.5)*r*1.9, y=cy+(сл(k+40)-0.5)*r*1.9, a=сл(k+80)*6.28;
      s+=`<g transform="translate(${ф2(x)} ${ф2(y)}) rotate(${ф2(a*57)})">${ДВ()?`<animateTransform attributeName="transform" type="translate" additive="sum" values="0 0;${ф2((сл(k+7)-0.5)*6)} ${ф2((сл(k+9)-0.5)*6)};0 0" dur="${(1.4+сл(k+3)*1.6).toFixed(1)}s" repeatCount="indefinite"/>`:''}
        <circle r="4.2" fill="#e8463a"/><circle cx="-4" cy="3" r="2.6" fill="#f2f4f6"/><circle cx="4" cy="3" r="2.6" fill="#f2f4f6"/><circle cx="-1.2" cy="-1.4" r="1.3" fill="#fff" opacity=".6"/></g>`; }
    for(let k=0;k<ионов;k++){ const x=cx+(сл(k+200)-0.5)*r*1.6, y=cy+(сл(k+300)-0.5)*r*1.5-(избыток?r*0.15:0), пол=k%2;
      const c=сорт==='купорос'?(пол?['#7fb8ff','#1a4a9a','SO₄']:['#ffb080','#8a3a10','Cu']):(пол?['#8ae86a','#1a6a10','Cl']:['#c8a4ff','#3e1480','Na']);
      s+=`<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;${ф2((сл(k+11)-0.5)*8)} ${ф2((сл(k+13)-0.5)*8)};0 0" dur="${(1.8+сл(k+5)*1.4).toFixed(1)}s" repeatCount="indefinite"/>`:''}
        <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${пол?7:5.6}" fill="${c[0]}" stroke="${c[1]}" stroke-width="1"/><text x="${ф2(x)}" y="${ф2(y+2.6)}" text-anchor="middle" font-size="${c[2].length>2?4.6:6}" font-weight="bold" fill="${c[1]}" font-family="${ШР}">${c[2]}</text></g>`; }
    if(избыток){ const n=Math.min(5,Math.ceil(избыток/3)); for(let i=0;i<n;i++) for(let j=0;j<=i&&j<3;j++){ const x=cx-n*7+i*14+j*4, y=cy+r*0.72-j*9;
      s+=`<rect x="${ф2(x)}" y="${ф2(y)}" width="11" height="9" rx="1" fill="#eef2f6" stroke="#9aa6b4" stroke-width=".8"/><path d="M${ф2(x+1)} ${ф2(y+1.5)} h9" stroke="#fff" stroke-width=".8"/>`; } }
    return s+`</g><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="url(#рл-сталь)" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${r-3}" fill="none" stroke="#fff" stroke-opacity=".15"/>
      <path d="M${ф2(cx+r*0.68)} ${ф2(cy+r*0.68)} L${ф2(cx+r*1.05)} ${ф2(cy+r*1.05)}" stroke="#3a2a1a" stroke-width="8" stroke-linecap="round"/>
      <ellipse cx="${ф2(cx-r*0.35)}" cy="${ф2(cy-r*0.45)}" rx="${ф2(r*0.4)}" ry="${ф2(r*0.16)}" transform="rotate(-30 ${ф2(cx-r*0.35)} ${ф2(cy-r*0.45)})" fill="#fff" opacity=".08"/>`; };
  /* полоса состава раствора */
  const полосаСостава = (x,y,ш,mв,mвода,цвВ) => { const всего=mв+mвода, a=ш*mв/Math.max(1,всего);
    return `<rect x="${x}" y="${y}" width="${ш}" height="18" rx="9" fill="hsla(198,60%,60%,.55)"/><rect x="${x}" y="${y}" width="${ф2(Math.max(0,a))}" height="18" rx="9" fill="${цвВ||'#f2f4f6'}"/>
      <rect x="${x}" y="${y}" width="${ш}" height="18" rx="9" fill="none" stroke="#3a4048"/>
      ${a>34?тА(ф2(x+a/2),y+13,'в-во',9,'#1a1e24'):''}${ш-a>34?тА(ф2(x+a+(ш-a)/2),y+13,'вода '+ок1(mвода)+' г',9,'#0a2a3a'):''}`; };
  /* бумажная записка */
  const записка = (x,y,ш,строки,опц) => { const о=опц||{}, в=16+строки.length*15;
    return `<g filter="url(#c120-тень)" transform="rotate(${о.поворот||-2} ${x+ш/2} ${y+в/2})"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="2" fill="#fbf7ec"/>
      <rect x="${x}" y="${y}" width="${ш}" height="5" fill="${о.полоса||'#c8402a'}" opacity=".8"/>
      ${строки.map((t0,i)=>`<text x="${x+8}" y="${y+20+i*15}" font-size="${i===0?11:10.5}" font-weight="${i===0?'bold':'normal'}" fill="#2e2416" font-family="'Courier New',monospace">${esc(t0)}</text>`).join('')}</g>`; };
  /* этапы процедуры */
  const ЭТАПЫ = ['расчёт','соль','вода','смешать','этикетка'];
  const этапы = (эт) => ЭТАПЫ.map((t0,i)=>{ const x=10+i*64, цв=i<эт?ЗЕ:i===эт?ЗЛ:'#3a4048';
    return `<rect x="${x}" y="6" width="60" height="18" rx="9" fill="${i<эт?'rgba(58,154,90,.25)':i===эт?'rgba(200,154,42,.25)':'rgba(12,14,18,.6)'}" stroke="${цв}" stroke-width="1.2"/>`+тА(x+30,19,(i<эт?'✓ ':'')+t0,9,i<=эт?'#eef2f6':'#6a7480'); }).join('');
  const цвРаствора = (вид,w) => вид==='купорос' ? L_().цвет('купорос',w/100*0.8) : L_().цвет('вода');

  /* ---------- живые ползунки ---------- */
  const ПОЛЗУН = (ключ,min,max,шаг,v,подпись,ед) => `<div class="пульт-ползун" data-anim style="--i:3">
      <div class="шапка-п"><span>${подпись}</span><b id="c120-в-${ключ}">${ч2(v)}${ед}</b></div>
      <button type="button" onclick="r120шаг('${ключ}',-1)">−</button>
      <input class="ползун" id="c120-п-${ключ}" type="range" min="${min}" max="${max}" step="${шаг}" value="${v}" oninput="r120пол('${ключ}',this.value)" aria-label="${подпись}">
      <button type="button" onclick="r120шаг('${ключ}',1)">+</button></div>`;

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=262, y0=222, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const верх=Л.весыВерх(y0+14,112);
    const пр = Л.банка(30,y0+10,46,70,{содержимое:'соль',надпись:['NaCl']}) + Л.весы(104,y0+14,112,{показ:'5.0'}) + Л.лодочка(104,верх,46,{горка:6}) +
      Л.цилиндр(176,y0+12,24,140,{мл:45,объём:100}) + Л.стакан(234,y0+10,64,86,{уровень:.55,цвет:цвРаствора('купорос',10),палочка:true,объём:100}) +
      Л.склянка(304,y0+10,40,84,{уровень:.6,цвет:цвРаствора('купорос',10),этикетка:['CuSO₄','10 %']});
    const поверх = тА(168,34,'ω = m(вещества) : m(раствора) × 100 %',13,GOLD) + тА(168,52,'m(раствора) = m(вещества) + m(воды)',10.5,'#c8ced6') +
      Л.имяПрибора(104,y0+30,'весы') + Л.имяПрибора(176,y0+30,'цилиндр') + Л.имяПрибора(234,y0+30,'стакан');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Массовая доля вещества в растворе') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r120вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('три',['100 г','95 г','5 г'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','5 г соли растворили в 95 г воды. Какова масса раствора?') :
          РАЗБОР(ок,['Верно: 5 + 95 = 100 г.','95 г — это только вода. Раствор = соль + вода = <b>100 г</b>.','5 г — только соль. Раствор = 5 + 95 = <b>100 г</b>.'][в]))) +
      (ок ? ПРАВИЛО('Раствор = вещество + растворитель. ω считают от массы <b>раствора</b>.') : '');
  }

  /* 2. Раствор и насыщение — живая сцена */
  function сцена2(s){
    const Н=292, y0=252, Л=L_(), соль=s.соль2==null?10:s.соль2, раств=Math.min(соль,РАСТВОРИМОСТЬ), избыток=соль-раств, w=раств/(100+раств)*100;
    const верх=Л.весыВерх(y0+16,150);
    const пр = Л.весы(96,y0+16,150,{показ:(100+соль).toFixed(1)}) + Л.стакан(96,верх,84,118,{уровень:.42+раств*0.0016,цвет:'hsla(198,60%,78%,.4)',крупинки:избыток>0?Math.round(6+избыток*2):0,вид:'соль',объём:250,надпись:'100 г H₂O'});
    const поверх = микро(258,98,62,Math.round(раств/2.2)*2,избыток,'соль') + тА(258,24,'микромир раствора',9,'#9aa3ad') +
      полосаСостава(186,176,140,раств,100) + тА(256,212,'ω = '+ок1(раств)+' : '+ок1(100+раств)+' = '+ок1(w)+' %',12,избыток>0?'#ff9a7a':GOLD) +
      (избыток>0 ? метка(256,222,'насыщенный! на дне '+ок1(избыток)+' г',КР,{кегль:10}) : метка(256,222,соль>0?'ненасыщенный: соль ещё растворится':'чистая вода',ЗЕ,{кегль:10})) +
      метка(96,4,'соли: '+соль+' г в 100 г воды',ЗЛ,{кегль:11});
    return сцена(Н,y0,пр,поверх);
  }
  function F2(s){
    const соль=s.соль2==null?10:s.соль2, видел=s.видел2||{}, в=s.ответ2, ок=в===1, готов=видел.мало&&видел.насыщ;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Раствор и насыщение') +
      `<div class="pic тёмная" id="c120-ж-соль2">${свгЛ(сцена2(s),292)}</div>` +
      ПОЛЗУН('соль2',0,50,1,соль,'Соль в стакане','  г') +
      СКАЗ('Исследуй','Сыпь соль ползунком. Следи за табло весов, за ионами в микромире и за полосой состава. Найди момент, когда соль перестаёт растворяться.') +
      (!готов ? СКАЗ('Ещё','Попробуй и немного соли (до 36 г), и много — больше 36 г.') :
        ОТВЕТЫ('три',['31 %','26,5 %','36 %'],1,в,2) + (в==null ? СКАЗ('Вопрос','В 100 г воды насыпали 50 г соли, растворилось 36 г. Какова ω соли в растворе?') :
          РАЗБОР(ок,['31 % = 50 : 160 — но 14 г соли лежат на дне, они не в растворе.','Верно: 36 : 136 ≈ 26,5 %. Нерастворившаяся соль в раствор не входит.','36 — это граммы, а не проценты: 36 : 136 ≈ 26,5 %.'][в]))) +
      (ок ? ТЕОРИЯ('насыщенный раствор','Раствор, в котором вещество при данной температуре больше не растворяется, — <b>насыщенный</b>. В 100 г воды при 20 °C растворяется не больше 36 г NaCl — это <b>растворимость</b>. Больше 26,5 % соли в растворе быть не может.') +
        ДИВО('В Мёртвом море вода почти насыщена солями — около 34 %. Такой раствор плотнее тела человека, поэтому в нём можно лежать на воде и читать газету.') : '');
  }

  /* 3. Приготовь раствор — живая сцена по этапам */
  function сцена3(s){
    const Н=284, y0=246, Л=L_(), n=Math.min(s.р3||0,РЕЦЕПТЫ.length-1), Р=РЕЦЕПТЫ[n], эт=s.эт3||0, mс=Р.m*Р.w/100, mв=Р.m-mс, ок=!!s.ок3;
    const вес=s.вес3||{тара:false,m:0}, мл=s.мл3==null?0:s.мл3, цв=Р.цв?цвРаствора('купорос',Р.w):L_().цвет('вода');
    let тело = Л.студия(Н,y0);
    const рецепт = записка(214,36,112,['РЕЦЕПТ №'+(n+1),Р.ф+': '+Р.m+' г','ω = '+Р.w+' %',эт>0?Р.род+': '+ч2(mс)+' г':'соли: ?',эт>0?'воды: '+ч2(mв)+' г':'воды: ?']);
    if(эт===0){
      const верх=Л.весыВерх(y0+16,104);
      тело += Л.банка(36,y0+12,44,62,{содержимое:Р.вид,надпись:[Р.ф]}) + Л.весы(112,y0+16,104,{показ:'0.0'}) + Л.цилиндр(184,y0+14,22,120,{мл:0,объём:100}) +
        Л.стакан(262,y0+12,56,70,{уровень:0,объём:100}) + рецепт.replace('x="214" y="36"','x="214" y="36"') ;
    } else if(эт===1){
      const верх=Л.весыВерх(y0+16,170), показ=(вес.тара?вес.m:вес.m+ЛОДОЧКА).toFixed(1);
      тело += Л.банка(34,y0+12,48,70,{содержимое:Р.вид,надпись:[Р.ф]}) + Л.весы(150,y0+16,170,{показ:показ}) + Л.лодочка(150,верх,62,{горка:Math.min(14,вес.m*1.3),вид:Р.вид}) +
        Л.шпатель(118,верх-30,70,-24,{горка:Р.вид}) + записка(238,36,90,['НУЖНО',ч2(mс)+' г '+Р.род]) +
        (вес.тара?метка(150,46,'тара учтена: лодочка = 0',ЗЕ,{кегль:10}):метка(150,46,'на табло — и лодочка ('+ч2(ЛОДОЧКА)+' г)!',КР,{кегль:10}));
    } else if(эт===2){
      тело += Л.склянка(36,y0+12,44,92,{уровень:.75,этикетка:['H₂O','дист.']}) + Л.цилиндр(118,y0+14,30,210,{мл:мл,объём:100}) +
        Л.мениск(250,112,64,Math.max(1,мл),{глаз:true}) + тА(250,196,'мениск крупно · '+мл+' мл',10,'#c8ced6') + записка(204,212,124,['НУЖНО '+ч2(mв)+' мл воды'],{поворот:0,полоса:'#2a6ab8'});
    } else if(эт===3){
      const мешал=!!s.мешал3;
      тело += Л.стакан(130,y0+12,110,140,{уровень:.45,цвет:мешал?цв:L_().цвет('вода'),крупинки:мешал?0:16,вид:Р.вид,палочка:true,мешать:мешал,таять:мешал,объём:100}) +
        микро(268,104,54,мешал?10:2,мешал?0:6,Р.вид) + тА(268,30,мешал?'ионы разошлись по воде':'кристаллы ещё на дне',9,'#9aa3ad');
    } else {
      const подписано=ок;
      тело += Л.стакан(84,y0+12,72,90,{уровень:.5,цвет:цв,объём:100}) + Л.склянка(222,y0+12,90,150,{уровень:.62,цвет:цв,этикетка:подписано?[Р.ф,'ω = '+Р.w+' %',Р.m+' г']:['?']}) +
        Л.струя(110,y0-70,206,y0-118,цв) ;
    }
    return тело + этапы(ок?5:эт);
  }
  const ВАР3 = (Р,шаг) => { const v=ВАР3_(Р,шаг), с=(Р.m+шаг.length)%3; return v.map((_,i)=>v[(i+с)%3]); };
  const ВАР3_ = (Р,шаг) => { const mс=Р.m*Р.w/100, mв=Р.m-mс;
    if(шаг==='соль') return [[mс+' г',true],[Р.w+' г',Р.w===mс],[Р.m*Р.w/(100-Р.w) ? ок1(Р.m*Р.w/(100-Р.w))+' г':'?',false]];
    if(шаг==='вода') return [[ч2(Р.m)+' г',false],[ч2(mв)+' г',true],[ч2(Р.m+mс)+' г',false]];
    return [['ω = '+Р.w+' %',true],['ω = '+ок1(mс/mв*100)+' %',false],['ω = '+ок1(mс)+' %',mс===Р.w]]; };
  function F3(s){
    const n=Math.min(s.р3||0,РЕЦЕПТЫ.length-1), Р=РЕЦЕПТЫ[n], эт=s.эт3||0, ок=!!s.ок3, отз=s.отз3, готовых=n+(ок?1:0), все=готовых>=РЕЦЕПТЫ.length, mс=Р.m*Р.w/100, mв=Р.m-mс;
    const вес=s.вес3||{тара:false,m:0}, мл=s.мл3==null?0:s.мл3;
    let пульт='';
    if(!ок){
      if(эт===0){ const шаг=s.рас3?'вода':'соль', V=ВАР3(Р,шаг);
        пульт = A(3,'карт задача','<span class="метка">Расчёт · рецепт '+(n+1)+' из 2</span><div class="текст">Нужно '+Р.m+' г раствора, ω('+Р.ф+') = '+Р.w+' %. '+(шаг==='соль'?'Сколько граммов '+Р.род+' взвесить?':Р.род[0].toUpperCase()+Р.род.slice(1)+' — '+ч2(mс)+' г. Сколько воды отмерить?')+'</div>') +
          `<div class="ask три">${V.map(([t0],j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r120рас("+j+")")).join('')}</div>`; }
      else if(эт===1) пульт = `<div class="атомы" data-anim style="--i:3;grid-template-columns:repeat(2,minmax(0,1fr))"><button type="button" onclick="r120вес('тара')">Тара → 0</button><button type="button" onclick="r120вес('1')">+ шпатель · 1 г</button><button type="button" onclick="r120вес('0.1')">+ щепотка · 0,1 г</button><button type="button" onclick="r120вес('-0.1')">− убрать 0,1 г</button></div>` +
        `<div class="ask">${BTN(5,'','Готово: высыпать в стакан',"r120вес('готово')")}</div>`;
      else if(эт===2) пульт = ПОЛЗУН('мл3',0,100,1,мл,'Вода в цилиндре',' мл') + `<div class="ask">${BTN(5,'','Готово: влить воду в стакан',"r120вода()")}</div>`;
      else if(эт===3) пульт = `<div class="ask">${s.мешал3?BTN(5,'','Перелить в склянку и подписать →',"r120этап(4)"):BTN(5,'','Перемешать палочкой',"r120мешать()")}</div>`;
      else { const V=ВАР3(Р,'этик'); пульт = A(3,'карт задача','<span class="метка">Этикетка</span><div class="текст">Что написать на склянке? В ней '+ч2(mс)+' г '+Р.род+' и '+ч2(mв)+' г воды.</div>') +
        `<div class="ask три">${V.map(([t0],j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r120этик("+j+")")).join('')}</div>`; }
    }
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Приготовь раствор') +
      `<div class="pic тёмная" id="c120-ж-мл3">${свгЛ(сцена3(s),284)}</div>` +
      ТОЧКИ(РЕЦЕПТЫ.length,все?-1:n,готовых) + пульт +
      (отз ? РАЗБОР(отз.ок,отз.т) : эт===1&&!ок ? СКАЗ('Взвешивание','Поставь лодочку, нажми «Тара» — весы обнулятся. Потом набирай '+Р.род+' шпателем до '+ч2(mс)+' г.') : эт===2&&!ок ? СКАЗ('Вода','1 мл воды весит 1 г. Отмерь '+ч2(mв)+' мл: глаз на уровне жидкости, считаем по <b>нижнему</b> краю мениска.') : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий рецепт →',"r120рдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('как приготовить раствор','1) m(вещества) = m(раствора) × ω. 2) m(воды) = m(раствора) − m(вещества). 3) Взвесить вещество с учётом тары. 4) Отмерить воду цилиндром. 5) Растворить, перемешать, подписать склянку.') : '');
  }

  /* 4. Разбавь и упарь */
  function F4(s){
    const Н=284, y0=252, Л=L_(), n=Math.min(s.ц4||0,ЦЕЛИ4.length-1), Ц=ЦЕЛИ4[n], m=s.m4==null?Ц.m:s.m4, mв=s.в4==null?Ц.m*Ц.w/100:s.в4, w=mв/m*100, ок=!!s.ок4, лог=s.лог4||[], пар=!!s.пар4, готовых=n+(ок?1:0), все=готовых>=ЦЕЛИ4.length, отз=s.отз4;
    const верх=Л.весыВерх(y0+16,146);
    const пр = Л.весы(96,y0+16,146,{показ:m.toFixed(1)}) + Л.стакан(96,верх,96,128,{уровень:Math.min(0.95,m/260),цвет:цвРаствора('купорос',w),объём:250,палочка:true,мешать:!!s.мешал4}) +
      (пар?`<g opacity=".8">${[0,1,2].map(k=>`<path d="M${80+k*16} ${верх-130} q-8 -14 0 -26 q8 -12 0 -24" stroke="#e8f0f6" stroke-width="3" fill="none" opacity=".5">${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -14" dur="${1.4+k*0.3}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".6;0" dur="${1.4+k*0.3}s" repeatCount="indefinite"/>`:''}</path>`).join('')}</g>`:'');
    const журнал = записка(184,28,148,['ЖУРНАЛ','старт: '+Ц.m+' г · '+Ц.w+' %'].concat(лог.slice(-5)).concat(['сейчас: '+ок1(m)+' г · '+ок1(w)+' %']),{поворот:1,полоса:'#2a6ab8'});
    const поверх = журнал + метка(96,4,Ц.текст+' · сейчас '+ок1(w)+' %',ок?ЗЕ:ЗЛ,{кегль:11}) + тА(96,36,'вещества '+ок1(mв)+' г',10,'#c8ced6');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Разбавь и упарь') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(ЦЕЛИ4.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Цель '+(n+1)+' из 3</span><div class="текст">В стакане '+Ц.m+' г '+Ц.w+' %-ного раствора медного купороса. <b>'+Ц.текст+'</b>. Чем больше ω — тем синее раствор.</div>') +
      (ок ? '' : `<div class="атомы" data-anim style="--i:4;grid-template-columns:repeat(2,minmax(0,1fr))"><button type="button" onclick="r120д('вода',10)">+ вода 10 г</button><button type="button" onclick="r120д('вода',50)">+ вода 50 г</button><button type="button" onclick="r120д('пар',10)">выпарить 10 г</button><button type="button" onclick="r120д('соль',5)">+ купорос 5 г</button></div>` +
        `<div class="ask">${BTN(5,'','Начать цель заново',"r120д('сброс',0)")}</div>`) +
      (отз ? (отз.инфо ? СКАЗ('Сейчас',отз.т) : РАЗБОР(отз.ок,отз.т)) : СКАЗ('Подсказка','Вода разбавляет: вещества столько же, раствора больше. Выпаривание уносит только воду. Добавка вещества увеличивает и вещество, и раствор.')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая цель →',"r120ддальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('разбавление и упаривание','При разбавлении и упаривании <b>масса вещества не меняется</b> — меняется масса раствора: ω = m(вещества) : m(нового раствора). 20 г в 100 г = 20 %; в 200 г — 10 %; в 80 г — 25 %.') : '');
  }

  /* 5. Аптека */
  const пузырёк = (x,y,П,выд,i) => { const Л=L_();
    if(П.форма==='малая') return Л.склянка(x,y,30,56,{уровень:.7,цвет:П.цв,этикетка:П.этик});
    if(П.форма==='тёмная') return Л.склянка(x,y,38,76,{уровень:.8,цвет:'hsla(28,70%,22%,.85)',этикетка:П.этик});
    return Л.склянка(x,y,44,92,{уровень:.75,цвет:П.цв,этикетка:П.этик}); };
  function F5(s){
    const Н=284, y0=242, Л=L_(), n=Math.min(s.з5||0,ЗАДАЧИ5.length-1), З=ЗАДАЧИ5[n], ок=!!s.ок5, отз=s.отз5, готовых=n+(ок?1:0), все=готовых>=ЗАДАЧИ5.length;
    const xs=[40,104,168,232,292];
    let тело = Л.студия(Н,y0) +
      `<rect x="0" y="0" width="336" height="${y0}" fill="url(#c120-стена)"/>` +
      `<rect x="10" y="118" width="316" height="8" rx="2" fill="url(#рл-древесина)"/><rect x="10" y="126" width="316" height="3" fill="#000" opacity=".35"/>` +
      `<g transform="translate(296 18)"><rect x="-14" y="-4" width="28" height="36" rx="3" fill="#fff"/><rect x="-4" y="0" width="8" height="28" fill="#3a9a5a"/><rect x="-12" y="10" width="24" height="8" fill="#3a9a5a"/></g>` +
      тА(150,30,'АПТЕКА',16,'#3a9a5a') + тА(150,46,'растворы и их ω',9,'#6a7480');
    /* верхняя полка: малые; стол: крупные */
    ПОЛКА.forEach((П,i)=>{ const наСтоле=i<3, x=наСтоле?[70,168,266][i]:[84,214][i-3], y=наСтоле?y0+6:118, выд=З.п===i;
      if(выд) тело+=`<ellipse cx="${x}" cy="${y-(наСтоле?44:28)}" rx="${наСтоле?40:28}" ry="${наСтоле?60:40}" fill="url(#c120-свет)"/>`;
      тело+=пузырёк(x,y,П,выд,i) + Л.имяПрибора(x,y+(наСтоле?14:12),П.имя); });
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Аптека') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ЗАДАЧИ5.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Рецепт '+(n+1)+' из 4 · '+ПОЛКА[З.п].имя+'</span><div class="текст">'+З.q+'</div>') +
      (ок ? '' : `<div class="ask три">${З.вар.map((v,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',v,"r120апт("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий рецепт →',"r120аптдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('масса вещества в растворе','<b>m(вещества) = m(раствора) × ω</b>, а растворителя — m(раствора) − m(вещества). Проценты переводят в доли: 9 % = 0,09; 0,9 % = 0,009.') +
        ДИВО('Физраствор называют так потому, что его концентрация — 0,9 % — та же, что у солей в плазме крови. Поэтому его можно вводить в вену: клетки крови не набухают и не сморщиваются.') : '');
  }

  /* 6. Смешай растворы */
  function F6(s){
    const Н=272, y0=236, Л=L_(), n=Math.min(s.с6||0,СМЕСИ.length-1), С=СМЕСИ[n], ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=СМЕСИ.length;
    const [ma,wa]=С.a, [mb,wb]=С.b, mв=ma*wa/100+mb*wb/100, m=ma+mb, w=mв/m*100;
    const цвA=wa?цвРаствора('купорос',wa):L_().цвет('вода'), цвB=wb?цвРаствора('купорос',wb):L_().цвет('вода');
    const пр = Л.стакан(56,y0+10,62,84,{уровень:ок?0.04:ma/260,цвет:цвA,объём:250}) + Л.стакан(140,y0+10,62,84,{уровень:ок?0.04:mb/260,цвет:цвB,объём:250}) +
      Л.стакан(262,y0+10,96,128,{уровень:ок?m/290:0,цвет:цвРаствора('купорос',w),объём:250,палочка:ок,мешать:ок});
    const поверх = тА(56,y0+30,ma+' г · '+wa+' %',10,'#c8ced6') + тА(140,y0+30,mb+' г · '+wb+' %'+(wb===0?' (вода)':''),10,'#c8ced6') + тА(262,y0+30,ок?m+' г · '+ок1(w)+' %':'смесь: ?',10,ок?GOLD:'#6a7480') +
      (ок?Л.струя(160,y0-74,236,y0-118,цвB):'') + метка(168,4,'смешай: ω смеси = ?',ок?ЗЕ:ЗЛ,{кегль:11}) +
      (ок?записка(18,30,150,['РАСЧЁТ','в-ва: '+ок1(ma*wa/100)+' + '+ок1(mb*wb/100)+' = '+ок1(mв)+' г','р-ра: '+ma+' + '+mb+' = '+m+' г','ω = '+ок1(mв)+' : '+m+' = '+ок1(w)+' %']):'');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Смешай растворы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(СМЕСИ.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Смесь '+(n+1)+' из 3</span><div class="текст">Сливаем '+ma+' г '+wa+' %-ного раствора и '+(wb?mb+' г '+wb+' %-ного':mb+' г чистой воды')+'. Какой будет ω смеси? Сначала прогноз — потом слить.</div>') +
      (ок ? '' : `<div class="ask три">${С.вар.map((v,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',v,"r120смесь("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая смесь →',"r120смдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('смешивание','Проценты <b>не складывают</b> и не усредняют просто так. Складывают массы веществ и массы растворов: ω = (m₁ω₁ + m₂ω₂) : (m₁ + m₂). Среднее арифметическое верно только при равных массах.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=246, y0=210, Л=L_();
    const пр = Л.стакан(60,y0+10,58,74,{уровень:.5,цвет:цвРаствора('купорос',5),объём:100}) + Л.стакан(140,y0+10,58,74,{уровень:.5,цвет:цвРаствора('купорос',12),объём:100}) +
      Л.стакан(220,y0+10,58,74,{уровень:.5,цвет:цвРаствора('купорос',25),объём:100}) + Л.склянка(296,y0+10,40,76,{уровень:.6,цвет:'hsla(198,60%,82%,.35)',этикетка:['NaCl','0,9 %']});
    const поверх = тА(60,y0+28,'5 %',11,'#c8ced6') + тА(140,y0+28,'12 %',11,'#c8ced6') + тА(220,y0+28,'25 %',11,'#c8ced6') +
      тА(168,40,'ω = m(в-ва) : m(р-ра) × 100 %',14,GOLD) + тА(168,62,'m(в-ва) = m(р-ра) × ω',11,'#c8ced6');
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Массовая доля вещества в растворе') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• ω = m(вещества) : m(раствора) × 100 %; m(раствора) = m(вещества) + m(воды).<br>• m(вещества) = m(раствора) × ω; воды — остальное.<br>• Разбавление и упаривание не меняют массу вещества.<br>• При смешивании складывают массы веществ и растворов.<br>• Насыщенный раствор больше вещества не растворяет.</div>') +
      ПРАВИЛО('10 г соли + 90 г воды = 100 г раствора, ω = <b>10 %</b> (а не 11 %).');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=168, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.стакан(70,y0+8,60,80,{уровень:.5,цвет:цвРаствора('купорос',Math.min(25,n*2.5)),объём:100,палочка:true}) +
      [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${Л.пробирка?Л.пробирка(236+i*30,y0+6,0.7,{уровень:.5,цвет:цвРаствора('купорос',15)}):''}</g>`).join('');
    const поверх = Л.имяПрибора(266,y0+20,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Растворы любой концентрации тебе по плечу.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r120заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r120мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вещество делим на весь раствор.')) : '')) +
      (все ? ПРАВИЛО('ω = m(в-ва) : m(р-ра).') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'5 г соли растворили в 45 г воды. ω =', варианты:[{т:'10 %',ок:true},{т:'11 %',ок:false}], разбор:'5 : 50 = 10 %.' },
    { вопрос:'Сколько соли в 300 г 3 %-ного раствора?', варианты:[{т:'3 г',ок:false},{т:'9 г',ок:true}], разбор:'300 × 0,03 = 9 г.' },
    { вопрос:'Сколько воды для 200 г 15 %-ного раствора?', варианты:[{т:'170 г',ок:true},{т:'185 г',ок:false}], разбор:'Вещества 30 г, воды 200 − 30 = 170 г.' },
    { вопрос:'50 г 40 %-ного раствора + 50 г воды. ω =', варианты:[{т:'40 %',ок:false},{т:'20 %',ок:true}], разбор:'20 г в 100 г.' },
    { вопрос:'Предел NaCl в 100 г воды при 20 °C:', варианты:[{т:'36 г',ок:true},{т:'100 г',ок:false}], разбор:'Растворимость NaCl — 36 г на 100 г воды.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r120Reset()")}</div>` +
        ПРАВИЛО('ω = m(в-ва) : m(р-ра) × 100 %.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r120Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const Т = {
    т1:{ имя:'ω по массам', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.банка(60,y0+8,40,56,{содержимое:'соль',надпись:[з.a+' г']})+Л.стакан(168,y0+8,70,92,{уровень:.55,цвет:L_().цвет('вода'),объём:250,надпись:з.вода+' г H₂O'}),
          полосаСостава(214,96,112,з.a,з.вода)+тА(270,134,отв?'ω = '+ок1(з.w)+' %':'ω = ?',13,отв?GOLD:'#9aa3ad'))+серия(ст),Н); } },
    т2:{ имя:'Масса вещества', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null;
        return свгЛ(сцена(Н,y0,Л.весы(100,y0+14,120,{показ:з.m.toFixed(1)})+Л.стакан(100,Л.весыВерх(y0+14,120),70,84,{уровень:.55,цвет:цвРаствора('купорос',Math.min(25,з.w)),объём:250}),
          тА(250,70,'ω = '+ч2(з.w)+' %',14,'#eef2f6')+тА(250,100,отв?'в-ва: '+з.ок:'в-ва: ?',13,отв?GOLD:'#9aa3ad'))+серия(ст),Н); } },
    т3:{ имя:'Разбавь или упарь', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null, m2=з.д==='выпар'?з.m-з.x:з.m+з.x;
        return свгЛ(сцена(Н,y0,Л.стакан(80,y0+8,62,84,{уровень:Math.min(.9,з.m/450),цвет:цвРаствора('купорос',з.w),объём:250})+Л.стакан(250,y0+8,72,100,{уровень:Math.min(.9,m2/450),цвет:отв?цвРаствора('купорос',з.w2):L_().цвет('вода'),объём:250}),
          тА(80,y0+26,з.m+' г · '+з.w+' %',10,'#c8ced6')+тА(250,y0+26,m2+' г · '+(отв?ок1(з.w2)+' %':'?'),10,отв?GOLD:'#c8ced6')+тА(165,90,з.д==='вода'?'+ вода':з.д==='выпар'?'− вода (пар)':'+ вещество',11,'#eef2f6')+`<path d="M130 100 H196" stroke="#eef2f6" stroke-width="2"/><path d="M196 100 l-7 -4 v8 Z" fill="#eef2f6"/>`)+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r120Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r120T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r120TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L120 = {
    id: ID, title: 'Массовая доля вещества в растворе', ico: '🧃',
    src: 'Химия · 8–9 класс · Растворы', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Раствор и насыщение.',
      'Приготовь раствор: расчёт, весы, цилиндр, этикетка.',
      'Разбавь и упарь.',
      'Аптека: масса вещества в растворе.',
      'Смешай растворы.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: ω по массам.',
      'Тренажёр 2: масса вещества.',
      'Тренажёр 3: разбавь или упарь.'
    ],
    check: { q: 'В 90 г воды растворили 10 г соли. Какова массовая доля соли? (в %)', choices: ['1','10','90','100'], ans: 1, exp: '10 : (10 + 90) = 10 : 100 = 0,1 = 10%.' },
    tasks: [
      { q: 'В 75 г воды растворили 25 г соли. Какова массовая доля соли? (в %)', kind: 'unit', ans: 25, tol: 0, hints: ['Масса раствора: 25 + 75 = 100 г.', '25 : 100 = 0,25.', '25%.'], sol: '25 : (25 + 75) = 25 : 100 = 0,25 = 25%.' },
      { q: 'Сколько граммов сахара в 400 г 25%-ного раствора?', kind: 'unit', ans: 100, tol: 0, hints: ['25% = 0,25.', '0,25 · 400 = 100.'], sol: '0,25 · 400 = 100 г сахара.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L120.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Насыщение',3:'Приготовь раствор',4:'Разбавь и упарь',5:'Аптека',6:'Смешай растворы',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l120n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Растворы'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r120Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r120вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  /* живые ползунки */
  const ЖИВЫЕ = { соль2:{min:0,max:50,шаг:1,ед:'  г',сцена:сцена2,Н:292}, мл3:{min:0,max:100,шаг:1,ед:' мл',сцена:сцена3,Н:284} };
  const живо = (ключ) => { const s=S(), Ж=ЖИВЫЕ[ключ]; try{
      const pic=document.getElementById('c120-ж-'+ключ); if(pic) pic.innerHTML=свгЛ(Ж.сцена(s),Ж.Н);
      const в=document.getElementById('c120-в-'+ключ); if(в) в.textContent=ч2(s[ключ])+Ж.ед;
      const п=document.getElementById('c120-п-'+ключ); if(п&&+п.value!==s[ключ]) п.value=s[ключ];
    }catch(e){} };
  window.r120пол=(ключ,v)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; if(ключ==='мл3'&&(s.ок3||(s.эт3||0)!==2)) return;
    const было=s[ключ]; s[ключ]=+(Math.round(Math.max(Ж.min,Math.min(Ж.max,+v))/Ж.шаг)*Ж.шаг).toFixed(1);
    if(ключ==='соль2'){ const в=Object.assign({},s.видел2||{}); if(s.соль2>0&&s.соль2<РАСТВОРИМОСТЬ) в.мало=true; if(s.соль2>РАСТВОРИМОСТЬ) в.насыщ=true;
      const новое=(в.мало&&в.насыщ)&&!((s.видел2||{}).мало&&(s.видел2||{}).насыщ); s.видел2=в; if(новое){ chRender(0); return; } }
    if(ключ==='мл3') s.отз3=null;
    живо(ключ); };
  window.r120шаг=(ключ,d)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; const v=s[ключ]==null?(ключ==='соль2'?10:0):s[ключ]; window.r120пол(ключ,v+d*Ж.шаг); };
  /* приготовление раствора */
  window.r120рас=(j)=>{ const s=S(); if(s.ок3||(s.эт3||0)!==0) return; const n=s.р3||0, Р=РЕЦЕПТЫ[n], шаг=s.рас3?'вода':'соль', V=ВАР3(Р,шаг); if(!V[j]) return; const mс=Р.m*Р.w/100;
    if(V[j][1]){ if(шаг==='соль'){ s.рас3=true; s.отз3={ок:true,т:Р.m+' × '+Р.w+' : 100 = '+ч2(mс)+' г '+Р.род+'.'}; } else { s.рас3=false; s.эт3=1; s.вес3={тара:false,m:0}; s.отз3={ок:true,т:'Воды '+Р.m+' − '+ч2(mс)+' = '+ч2(Р.m-mс)+' г. Расчёт готов — к весам!'}; } }
    else s.отз3={ок:false,j:j,т:шаг==='соль'?'m(вещества) = m(раствора) × ω = '+Р.m+' × '+(Р.w/100).toString().replace('.',',')+'.':'Вода — это раствор минус вещество, а не весь раствор.'};
    chRender(0); };
  window.r120вес=(что)=>{ const s=S(); if(s.ок3||(s.эт3||0)!==1) return; const n=s.р3||0, Р=РЕЦЕПТЫ[n], mс=Р.m*Р.w/100, вес=Object.assign({тара:false,m:0},s.вес3||{});
    if(что==='тара'){ вес.тара=true; s.отз3={ок:true,т:'Весы обнулены: лодочка больше не считается.'}; }
    else if(что==='готово'){
      if(!вес.тара&&Math.abs(вес.m+ЛОДОЧКА-mс)<0.05){ s.отз3={ок:false,т:'На табло '+ч2(mс)+' г, но вместе с лодочкой! '+Р.род[0].toUpperCase()+Р.род.slice(1)+' только '+ч2((вес.m).toFixed(1))+' г. Нужно было нажать «Тара».'}; }
      else if(Math.abs(вес.m-mс)<0.05){ s.эт3=2; s.мл3=0; s.отз3={ок:true,т:'Взвешено '+ч2(mс)+' г '+Р.род+'. Теперь вода.'}; }
      else s.отз3={ок:false,т:'В лодочке '+ч2(вес.m.toFixed(1))+' г, а нужно '+ч2(mс)+' г.'+(вес.тара?'':' И не забудь «Тару».')};
    }
    else { вес.m=Math.max(0,Math.min(30,+(вес.m+ +что).toFixed(1))); s.отз3=null; }
    s.вес3=вес; chRender(0); };
  window.r120вода=()=>{ const s=S(); if(s.ок3||(s.эт3||0)!==2) return; const n=s.р3||0, Р=РЕЦЕПТЫ[n], mв=Р.m-Р.m*Р.w/100, мл=s.мл3||0;
    if(мл===mв){ s.эт3=3; s.мешал3=false; s.отз3={ок:true,т:'Отмерено '+мл+' мл = '+мл+' г воды. Вливаем в стакан с '+Р.род+'.'}; }
    else s.отз3={ок:false,т:'В цилиндре '+мл+' мл, а нужно '+ч2(mв)+'. '+(мл<mв?'Долей воды.':'Отлей лишнее.')};
    chRender(0); };
  window.r120мешать=()=>{ const s=S(); if(s.ок3||(s.эт3||0)!==3) return; s.мешал3=true; s.отз3={ок:true,т:'Кристаллы растворились: ионы разошлись по всему объёму. Раствор однородный.'}; chRender(0); };
  window.r120этап=(k)=>{ const s=S(); if(s.ок3) return; if(k===4&&(s.эт3||0)===3&&s.мешал3){ s.эт3=4; s.отз3=null; chRender(0); } };
  window.r120этик=(j)=>{ const s=S(); if(s.ок3||(s.эт3||0)!==4) return; const n=s.р3||0, Р=РЕЦЕПТЫ[n], V=ВАР3(Р,'этик'), mс=Р.m*Р.w/100; if(!V[j]) return;
    if(V[j][1]){ s.ок3=true; if(n>=РЕЦЕПТЫ.length-1) s.дело_раствор=true; s.отз3={ок:true,т:'Склянка подписана: '+Р.ф+', ω = '+Р.w+' % ('+ч2(mс)+' : '+Р.m+').'}; }
    else s.отз3={ок:false,j:j,т:V[j][0].includes(ок1(mс/(Р.m-mс)*100))?'Это '+ч2(mс)+' : '+ч2(Р.m-mс)+' — делили на воду. Делить надо на весь раствор: '+ч2(mс)+' : '+Р.m+'.':'Граммы не равны процентам: '+ч2(mс)+' г в '+Р.m+' г — это '+Р.w+' %.'};
    chRender(0); };
  window.r120рдальше=()=>{ const s=S(); if(!s.ок3||(s.р3||0)>=РЕЦЕПТЫ.length-1) return; s.р3=(s.р3||0)+1; s.ок3=false; s.эт3=0; s.рас3=false; s.вес3={тара:false,m:0}; s.мл3=0; s.мешал3=false; s.отз3=null; chRender(0); };
  /* разбавь и упарь */
  window.r120д=(что,x)=>{ const s=S(); if(s.ок4) return; const n=s.ц4||0, Ц=ЦЕЛИ4[n];
    let m=s.m4==null?Ц.m:s.m4, mв=s.в4==null?Ц.m*Ц.w/100:s.в4; const лог=(s.лог4||[]).slice(); s.пар4=false; s.мешал4=false;
    if(что==='сброс'){ s.m4=Ц.m; s.в4=Ц.m*Ц.w/100; s.лог4=[]; s.отз4=null; chRender(0); return; }
    if(что==='вода'){ if(m+x>250){ s.отз4={ок:false,т:'Стакан на 250 г переполнится. Начни цель заново.'}; chRender(0); return; } m+=x; s.мешал4=true; лог.push('+ '+x+' г воды'); }
    if(что==='пар'){ if(m-x<=mв+1){ s.отз4={ок:false,т:'Воды почти не осталось — дальше выпаривать нельзя.'}; chRender(0); return; } m-=x; s.пар4=true; лог.push('− '+x+' г воды (пар)'); }
    if(что==='соль'){ if(m+x>250){ s.отз4={ок:false,т:'Стакан переполнится.'}; chRender(0); return; } m+=x; mв+=x; s.мешал4=true; лог.push('+ '+x+' г купороса'); }
    s.m4=m; s.в4=mв; s.лог4=лог; const w=mв/m*100;
    if(Math.abs(w-Ц.цель)<0.05){ s.ок4=true; if(n>=ЦЕЛИ4.length-1) s.дело_разбавь=true; s.отз4={ок:true,т:'Готово: '+ок1(mв)+' г купороса в '+ок1(m)+' г раствора = '+ок1(w)+' %.'}; }
    else s.отз4={инфо:true,т:'Сейчас '+ок1(mв)+' : '+ок1(m)+' = '+ок1(w)+' %. Цель — '+Ц.цель+' %.'};
    chRender(0); };
  window.r120ддальше=()=>{ const s=S(); if(!s.ок4||(s.ц4||0)>=ЦЕЛИ4.length-1) return; s.ц4=(s.ц4||0)+1; const Ц=ЦЕЛИ4[s.ц4]; s.m4=Ц.m; s.в4=Ц.m*Ц.w/100; s.лог4=[]; s.ок4=false; s.отз4=null; s.пар4=false; chRender(0); };
  /* аптека */
  window.r120апт=(j)=>{ const s=S(); if(s.ок5) return; const n=s.з5||0, З=ЗАДАЧИ5[n];
    if(j===З.в){ s.ок5=true; if(n>=ЗАДАЧИ5.length-1) s.дело_аптека=true; s.отз5={ок:true,т:З.р}; } else s.отз5={ок:false,j:j,т:'Не так. m(вещества) = m(раствора) × ω; проценты переведи в доли: '+ч2(ПОЛКА[З.п].w)+' % = '+ч2(+(ПОЛКА[З.п].w/100).toFixed(4))+'.'};
    chRender(0); };
  window.r120аптдальше=()=>{ const s=S(); if(!s.ок5||(s.з5||0)>=ЗАДАЧИ5.length-1) return; s.з5=(s.з5||0)+1; s.ок5=false; s.отз5=null; chRender(0); };
  /* смешивание */
  window.r120смесь=(j)=>{ const s=S(); if(s.ок6) return; const n=s.с6||0, С=СМЕСИ[n], [ma,wa]=С.a, [mb,wb]=С.b, mв=ma*wa/100+mb*wb/100, m=ma+mb;
    const текст='('+ок1(ma*wa/100)+' + '+ок1(mb*wb/100)+') : ('+ma+' + '+mb+') = '+ок1(mв)+' : '+m+' = '+ок1(mв/m*100)+' %.';
    if(j===С.в){ s.ок6=true; if(n>=СМЕСИ.length-1) s.дело_смесь=true; s.отз6={ок:true,т:'Слили! '+текст}; }
    else s.отз6={ок:false,j:j,т:'Проценты не складывают и не усредняют. Сложи граммы вещества и граммы растворов.'};
    chRender(0); };
  window.r120смдальше=()=>{ const s=S(); if(!s.ок6||(s.с6||0)>=СМЕСИ.length-1) return; s.с6=(s.с6||0)+1; s.ок6=false; s.отз6=null; chRender(0); };
  window.r120мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r120заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r120Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r120Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r120T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r120TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r120Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L120,{__планПорядок:arr[м].__планПорядок}); else arr.push(L120); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU120={render:render, L:L120};
})();
