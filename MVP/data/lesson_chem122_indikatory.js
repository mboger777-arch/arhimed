/* ============ ХИМИЯ · УРОК 122 · «КИСЛОТЫ И ОСНОВАНИЯ: ИНДИКАТОРЫ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   8–9 класс, манера NOBOOK (как 39–121). Карточка 122 из банка подменяется этой записью (VISKW[122]).
   Урок 54 уже показывает три индикатора в кислоте, воде и щёлочи; здесь — почему они меняют цвет
   (ионы H⁺ и OH⁻), шкала pH, природный индикатор, нейтрализация и классы веществ по формуле.
   Приборы — MVP/data/ris_lab.js (window.РЛ); живые ползунки — как в 119–121.

   ШАГИ.
   1) Карточка: штатив пробирок с капустным соком — радуга от кислоты к щёлочи.
   2) Ионы виноваты: семь растворов в микромире — H⁺, OH⁻, соли и вода; уравнения диссоциации.
   3) Шкала pH: ползунок 0–14 — универсальный индикатор, лакмус, метилоранж, фенолфталеин
      и вещества из жизни с таким pH.
   4) Капустный детектив: шесть неизвестных жидкостей, сок краснокочанной капусты, определить среду.
   5) Титрование: бюретка с кислотой над колбой со щёлочью и фенолфталеином — поймать каплю,
      на которой раствор обесцветится; рядом строится кривая pH. Три задачи.
   6) Кислота, щёлочь или нерастворимое основание — по формуле и по опыту.
   7) Вывод, марафон, практика, три тренажёра.

   Значения pH бытовых жидкостей — приблизительные (≈), как в школьных таблицах. */
(function(){
  'use strict';

  const ID = 122;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'детектив',   имя:'Капустный детектив', итог:'6 из 6'},
    {ключ:'титрование', имя:'Титрование',         итог:'3 из 3'},
    {ключ:'формулы',    имя:'Кислота или основание', итог:'10 из 10'},
    {ключ:'марафон',    имя:'Проверка: марафон',  итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Узнать, почему индикаторы меняют цвет, научиться определять среду по шкале pH, пользоваться природным индикатором и проводить нейтрализацию.'],
    ['Принцип','В воде <b>кислоты</b> дают ионы водорода <b>H⁺</b>, <b>щёлочи</b> — гидроксид-ионы <b>OH⁻</b>. Индикатор — вещество, которое меняет цвет в зависимости от того, каких ионов больше. Это число показывает шкала <b>pH</b>: меньше 7 — кислая среда, 7 — нейтральная, больше 7 — щелочная.'],
    ['Оборудование','Штатив с пробирками, универсальная индикаторная бумага, лакмус, метиловый оранжевый, фенолфталеин, сок краснокочанной капусты, бюретка, коническая колба, растворы HCl и NaOH, пипетки.'],
    ['Ход работы','1. Посмотреть на ионы в растворах.<br>2. Пройти шкалу pH с четырьмя индикаторами.<br>3. Определить среду неизвестных жидкостей капустным соком.<br>4. Нейтрализовать щёлочь кислотой по каплям.<br>5. Распознать кислоты и основания по формулам.'],
    ['Безопасность','Кислоты и щёлочи разъедают кожу и глаза: работать в очках и перчатках. <b>Ничего не пробовать на вкус</b> — для этого и нужны индикаторы. Щёлочь опаснее для глаз, чем кислота. Попало на кожу — смывать большим количеством воды. Разбавляя кислоту, льют кислоту в воду, а не наоборот.']
  ];
  const ч2 = (v) => String(v).replace('.',',');
  const ок1 = (v) => ч2(Math.round(v*10)/10);

  /* ---------- цвета индикаторов по pH ---------- */
  const УНИВ = ['#c81e1e','#e0301e','#f04a1a','#f47a1a','#f4a020','#f2c81e','#d8d81e','#7cc23a','#3aa85a','#2a8a8a','#2a6ac8','#3a4aa8','#4a3a9a','#5a2a8a','#4a1a6a'];
  const смесь = (a,b,t) => { const p=(h)=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)), A=p(a), B=p(b);
    return '#'+A.map((x,i)=>Math.round(x+(B[i]-x)*t).toString(16).padStart(2,'0')).join(''); };
  const униЦвет = (pH) => { const p=Math.max(0,Math.min(14,pH)), i=Math.floor(p); return i>=14?УНИВ[14]:смесь(УНИВ[i],УНИВ[i+1],p-i); };
  const лакмусЦвет = (pH) => pH<5?'#d83a3a':pH<=8?'#8a4aa8':'#3a5ac8';
  const метилоранжЦвет = (pH) => pH<3.1?'#e8402a':pH<=4.4?'#f08a2a':'#f0c82a';
  const фенолЦвет = (pH) => pH<8.2?null:pH<10?смесь('#f6c0dc','#d8207a',(pH-8.2)/1.8):'#d8207a';
  const КАПУСТА = [[0,'#d81e3e'],[2,'#e0284a'],[3.5,'#c83a7a'],[5.5,'#8a3aa0'],[7,'#6a4ab8'],[8,'#3a6ac8'],[9.5,'#2a9ab0'],[11.5,'#3ab06a'],[13,'#c8c83a'],[14,'#d8b82a']];
  const капустаЦвет = (pH) => { for(let i=0;i<КАПУСТА.length-1;i++){ const [a,ca]=КАПУСТА[i], [b,cb]=КАПУСТА[i+1]; if(pH<=b) return смесь(ca,cb,(pH-a)/(b-a)); } return КАПУСТА[КАПУСТА.length-1][1]; };
  const жидк = (hex,a) => { const n=[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)); return `rgba(${n[0]},${n[1]},${n[2]},${a==null?.72:a})`; };
  const среда = (pH) => pH<6.5?'кислая':pH<=7.5?'нейтральная':'щелочная';

  /* ---------- вещества в микромире ---------- */
  const РАСТВОРЫ = [
    {ф:'HCl',     имя:'соляная кислота',      класс:'кислота', ур:'HCl → H⁺ + Cl⁻',          ионы:[['H⁺',4],['Cl⁻',4]], pH:1},
    {ф:'H₂SO₄',   имя:'серная кислота',       класс:'кислота', ур:'H₂SO₄ → 2H⁺ + SO₄²⁻',     ионы:[['H⁺',6],['SO₄²⁻',3]], pH:1},
    {ф:'NaOH',    имя:'гидроксид натрия',     класс:'щёлочь',  ур:'NaOH → Na⁺ + OH⁻',        ионы:[['Na⁺',4],['OH⁻',4]], pH:13},
    {ф:'KOH',     имя:'гидроксид калия',      класс:'щёлочь',  ур:'KOH → K⁺ + OH⁻',          ионы:[['K⁺',4],['OH⁻',4]], pH:13},
    {ф:'Ca(OH)₂', имя:'известковая вода',     класс:'щёлочь',  ур:'Ca(OH)₂ → Ca²⁺ + 2OH⁻',  ионы:[['Ca²⁺',2],['OH⁻',4]], pH:12},
    {ф:'NaCl',    имя:'поваренная соль',      класс:'соль',    ур:'NaCl → Na⁺ + Cl⁻',        ионы:[['Na⁺',4],['Cl⁻',4]], pH:7},
    {ф:'H₂O',     имя:'чистая вода',          класс:'вода',    ур:'H⁺ и OH⁻ — поровну и очень мало', ионы:[['H⁺',1],['OH⁻',1]], pH:7}
  ];
  /* ---------- шкала pH: вещества из жизни ---------- */
  const ЖИЗНЬ = [[1.5,'желудочный сок'],[2,'лимонный сок'],[3,'уксус'],[4,'томатный сок'],[5,'кофе'],[6.5,'молоко'],[7,'дистиллированная вода'],[7.4,'кровь'],[8,'морская вода'],
    [8.5,'раствор соды'],[10,'мыльный раствор'],[11,'нашатырный спирт'],[12.5,'известковая вода'],[13.5,'средство для прочистки труб']];
  const жизньПри = (pH) => ЖИЗНЬ.reduce((a,x)=>Math.abs(x[0]-pH)<Math.abs(a[0]-pH)?x:a,ЖИЗНЬ[0]);
  /* ---------- капустный детектив ---------- */
  const ПРОБЫ4 = [
    {имя:'лимонный сок',          pH:2,  ответ:0},
    {имя:'средство для труб',     pH:13, ответ:2},
    {имя:'дистиллированная вода', pH:7,  ответ:1},
    {имя:'столовый уксус',        pH:3,  ответ:0},
    {имя:'мыльный раствор',       pH:10, ответ:2},
    {имя:'раствор пищевой соды',  pH:8.5,ответ:2}
  ];
  const СРЕДЫ = ['кислая','нейтральная','щелочная'];
  /* ---------- титрование ---------- */
  const ТИТР = [
    {Vb:20, cb:0.1, ca:0.1, текст:'В колбе 20 мл раствора NaOH и две капли фенолфталеина. В бюретке — соляная кислота той же концентрации.'},
    {Vb:20, cb:0.1, ca:0.2, текст:'В колбе снова 20 мл NaOH, но кислота в бюретке вдвое крепче.'},
    {Vb:15, cb:0.2, ca:0.1, текст:'В колбе 15 мл щёлочи вдвое крепче кислоты.'}
  ];
  const Vэкв = (Т) => Т.Vb*Т.cb/Т.ca;
  const pHтитр = (Т,V) => { const nOH=Т.cb*Т.Vb, nH=Т.ca*V, Vt=(Т.Vb+V)/1000;
    if(Math.abs(nOH-nH)<1e-9) return 7;
    if(nOH>nH) return 14+Math.log10((nOH-nH)/1000/Vt);
    return -Math.log10((nH-nOH)/1000/Vt); };
  const МАКС_МЛ = 40;
  /* ---------- кислота или основание ---------- */
  const КЛАССЫ = ['кислота','щёлочь','нерастворимое основание','другое'];
  const ФОРМУЛЫ6 = [
    {ф:'HNO₃',    имя:'азотная кислота',     в:0, вид:'кислота'},
    {ф:'NaOH',    имя:'гидроксид натрия',    в:1, вид:'щёлочь'},
    {ф:'Cu(OH)₂', имя:'гидроксид меди(II)',  в:2, вид:'осадок', цв:'#3a8ad8'},
    {ф:'H₂SO₄',   имя:'серная кислота',      в:0, вид:'кислота'},
    {ф:'KOH',     имя:'гидроксид калия',     в:1, вид:'щёлочь'},
    {ф:'NaCl',    имя:'поваренная соль',     в:3, вид:'нейтрально'},
    {ф:'Fe(OH)₃', имя:'гидроксид железа(III)', в:2, вид:'осадок', цв:'#a8582a'},
    {ф:'H₃PO₄',   имя:'фосфорная кислота',   в:0, вид:'кислота'},
    {ф:'Ca(OH)₂', имя:'гидроксид кальция',   в:1, вид:'щёлочь'},
    {ф:'H₂O',     имя:'вода',                в:3, вид:'нейтрально'}
  ];
  const МАРАФОН = [
    {q:'Какие ионы дают кислоты в воде?', вар:['H⁺','OH⁻','Na⁺'], в:0, р:'Кислоты дают ионы водорода H⁺.'},
    {q:'Какие ионы дают щёлочи в воде?', вар:['H⁺','OH⁻','Cl⁻'], в:1, р:'Щёлочи дают гидроксид-ионы OH⁻.'},
    {q:'pH = 3 — среда…', вар:['кислая','нейтральная','щелочная'], в:0, р:'Меньше 7 — кислая.'},
    {q:'Лакмус в щёлочи —', вар:['красный','синий','фиолетовый'], в:1, р:'Лакмус синеет в щелочной среде.'},
    {q:'Фенолфталеин в кислоте —', вар:['малиновый','бесцветный','жёлтый'], в:1, р:'Он малиновый только в щёлочи.'},
    {q:'Метиловый оранжевый в кислоте —', вар:['розово-красный','жёлтый','синий'], в:0, р:'В кислоте — красный, в щёлочи — жёлтый.'},
    {q:'Сок краснокочанной капусты в уксусе —', вар:['красно-розовый','синий','жёлтый'], в:0, р:'В кислоте капустный сок краснеет.'},
    {q:'NaOH + HCl → NaCl + H₂O — это реакция…', вар:['нейтрализации','горения','разложения'], в:0, р:'Кислота и щёлочь дают соль и воду.'},
    {q:'Cu(OH)₂ — это…', вар:['кислота','щёлочь','нерастворимое основание'], в:2, р:'Голубой осадок, в воде не растворяется — индикатор цвет не меняет.'},
    {q:'Почему вещества в лаборатории не пробуют на вкус?', вар:['опасно — определяют индикатором','это невкусно','вкус всегда одинаковый'], в:0, р:'Кислоты и щёлочи разъедают ткани.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const ИНД_ЦВ = {лакмус:{кислая:'красный',нейтральная:'фиолетовый',щелочная:'синий'}, фенолфталеин:{кислая:'бесцветный',нейтральная:'бесцветный',щелочная:'малиновый'},
    'метиловый оранжевый':{кислая:'розово-красный',нейтральная:'оранжевый',щелочная:'жёлтый'}, 'капустный сок':{кислая:'красный',нейтральная:'фиолетовый',щелочная:'зелёный'}};
  const П1 = поМесту([['лакмус','кислая'],['лакмус','щелочная'],['фенолфталеин','щелочная'],['фенолфталеин','кислая'],['метиловый оранжевый','кислая'],['метиловый оранжевый','щелочная'],
    ['капустный сок','кислая'],['капустный сок','щелочная'],['лакмус','нейтральная'],['метиловый оранжевый','нейтральная'],['фенолфталеин','нейтральная'],['капустный сок','нейтральная'],
    ['лакмус','кислая'],['фенолфталеин','щелочная'],['метиловый оранжевый','щелочная'],['капустный сок','кислая']]
    .map(([инд,ср])=>{ const ок=ИНД_ЦВ[инд][ср], нет=ИНД_ЦВ[инд][ср==='кислая'?'щелочная':'кислая']===ок?ИНД_ЦВ[инд].нейтральная:ИНД_ЦВ[инд][ср==='кислая'?'щелочная':'кислая'];
      return {q:'Какого цвета '+инд+' в '+ср.replace('ая','ой')+' среде?', инд:инд, ср:ср, ок:ок, нет:нет===ок?'жёлтый':нет, раз:инд[0].toUpperCase()+инд.slice(1)+': кислая — '+ИНД_ЦВ[инд].кислая+', нейтральная — '+ИНД_ЦВ[инд].нейтральная+', щелочная — '+ИНД_ЦВ[инд].щелочная+'.'}; }));
  const П2 = поМесту([[1,'желудочный сок'],[13,'средство для труб'],[2,'лимонный сок'],[11,'нашатырный спирт'],[3,'уксус'],[10,'мыльный раствор'],[5,'кофе'],[8.5,'раствор соды'],
    [12.5,'известковая вода'],[4,'томатный сок'],[9,'раствор буры'],[6,'дождевая вода'],[12,'стиральный порошок'],[2.5,'газировка'],[8,'морская вода'],[3.5,'яблочный сок']]
    .map(([pH,что])=>{ const ок=pH<7?'кислая':'щелочная';
      return {q:что[0].toUpperCase()+что.slice(1)+': pH ≈ '+ч2(pH)+'. Какая среда?', pH:pH, ок:ок, нет:ок==='кислая'?'щелочная':'кислая', раз:'pH '+(pH<7?'меньше':'больше')+' 7 — среда '+ок+'.'}; }));
  const П3 = поМесту([['HCl','кислота'],['NaOH','щёлочь'],['H₂SO₄','кислота'],['KOH','щёлочь'],['HNO₃','кислота'],['Ba(OH)₂','щёлочь'],['H₃PO₄','кислота'],['LiOH','щёлочь'],
    ['H₂CO₃','кислота'],['Ca(OH)₂','щёлочь'],['HBr','кислота'],['NaOH','щёлочь'],['H₂S','кислота'],['KOH','щёлочь'],['HF','кислота'],['Ba(OH)₂','щёлочь']]
    .map(([ф,кл])=>({q:ф+' — кислота или щёлочь?', ф:ф, ок:кл, нет:кл==='кислота'?'щёлочь':'кислота',
      раз:кл==='кислота'?'Формула начинается с водорода H, остальное — кислотный остаток: в воде даёт H⁺.':'Металл и группы OH: в воде даёт ионы OH⁻.'})));

  const CSS=`
  #lvis .s6.l122n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l122n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l122n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l122n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l122n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l122n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l122n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l122n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l122n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l122n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l122n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l122n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l122n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l122n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l122n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l122n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l122n table.итоги td{white-space:normal!important}
  #lvis .s6.l122n table.итоги td:first-child{width:46%}
  #lvis .s6.l122n table.итоги{table-layout:fixed}
  #lvis .s6.l122n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l122n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l122n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l122n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l122n .ask button{text-align:left}
  #lvis .s6.l122n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l122n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l122n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l122n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l122n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l122n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l122n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l122n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l122n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l122n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l122n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l122n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l122n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l122n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l122n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l122n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l122n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l122n .плитка span{text-align:center}
  #lvis .s6.l122n .плитка:active{transform:scale(.96)}
  #lvis .s6.l122n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l122n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l122n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l122n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l122n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l122n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l122n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l122n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l122n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l122n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l122n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l122n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l122n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l122n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l122n{gap:14px}
  #lvis .s6.l122n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l122n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l122n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l122n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l122n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l122n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l122n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l122n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l122n .карт .текст b{color:${GOLD}}
  #lvis .s6.l122n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l122n .правило b{color:${GOLD}}
  #lvis .s6.l122n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l122n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l122n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l122n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l122n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l122n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l122n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l122n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l122n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l122n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l122n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l122n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l122n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l122n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l122n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l122n .буйки button.мимо{border-color:${RED};animation:l122nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l122nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l122n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l122n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l122n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l122n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l122n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l122n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l122n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l122n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l122n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l122n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l122n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l122n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l122n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l122n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l122n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l122n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l122n .уровни .точка.сейчас{background:${GOLD};animation:l122ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l122ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l122n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l122n{-webkit-text-size-adjust:100%}
  #lvis .s6.l122n [data-anim]{animation:l122nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l122nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l122n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l122n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l122n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l122n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l122n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l122n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l122n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l122n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l122n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l122n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l122n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l122n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l122n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l122n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l122n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l122n .акт span.до{background:#24402c}
  #lvis .s6.l122n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l122n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l122n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l122n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l122n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l122n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l122n .две-колонки li{margin:2px 0}
  #lvis .s6.l122n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l122n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l122n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l122n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l122n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l122n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l122n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l122n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l122n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l122n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l122n ul.памятка li{margin:3px 0}
  #lvis .s6.l122n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l122n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l122n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l122n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l122n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l122n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l122n table.тепло td,#lvis .s6.l122n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l122n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l122n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l122n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l122n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l122n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l122n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l122n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l122n table.детектив th{width:auto!important}
  #lvis .s6.l122n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l122n table.детектив td{font-size:12.5px}
  #lvis .s6.l122n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l122n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l122n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l122n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l122n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l122n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l122n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l122n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l122n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l122n .ряд.символы button b{font-size:19px}
  #lvis .s6.l122n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l122n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l122n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l122n .коэф-яч b{font-size:26px}
  #lvis .s6.l122n .пульт-ползун{display:grid;grid-template-columns:48px 1fr 48px;gap:8px 10px;align-items:center;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:10px 10px 8px;width:100%;box-sizing:border-box}
  #lvis .s6.l122n .пульт-ползун .шапка-п{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}
  #lvis .s6.l122n .пульт-ползун .шапка-п span{font-size:14px;color:#9aa3ad}
  #lvis .s6.l122n .пульт-ползун .шапка-п b{font-size:26px;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l122n .пульт-ползун button{height:44px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;font-size:22px;font-weight:700;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l122n .пульт-ползун button:active{transform:translateY(2px)}
  #lvis .s6.l122n input[type=range].ползун{width:100%;height:44px;margin:0;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}
  #lvis .s6.l122n input[type=range].ползун::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l122n input[type=range].ползун::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e8e0cc);border:3px solid #ffd76a;margin-top:-10px;box-shadow:0 2px 8px rgba(0,0,0,.6)}
  #lvis .s6.l122n input[type=range].ползун::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l122n input[type=range].ползун::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6efe0;border:3px solid #ffd76a}
  #lvis .s6.l122n .атомы button.вкл{border-color:#ffd76a;color:#ffd76a;background:rgba(255,215,106,.15)}
  #lvis .s6.l122n .атомы button{font-size:16px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l122n [data-anim]{animation:none!important}
    #lvis .s6.l122n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l122n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l122n-style');
      if(!s){ s=document.createElement('style'); s.id='l122n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r122Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c122-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c122-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c122-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c122-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c122-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c122-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c122-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c122-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c122-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c122-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c122-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c122-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <linearGradient id="c122-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a727c"/><stop offset=".12" stop-color="#3a424c"/><stop offset=".7" stop-color="#22272d"/><stop offset="1" stop-color="#121519"/>
      </linearGradient>
      <radialGradient id="c122-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c122-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c122-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
      <linearGradient id="c122-чугун" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a727c"/><stop offset=".18" stop-color="#3a4048"/><stop offset="1" stop-color="#121519"/></linearGradient>
      <linearGradient id="c122-хром" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a525c"/><stop offset=".3" stop-color="#f6f9fb"/><stop offset=".45" stop-color="#c8d0d8"/><stop offset=".75" stop-color="#6a737d"/><stop offset="1" stop-color="#2a3038"/></linearGradient>
      <linearGradient id="c122-хромГ" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525c"/><stop offset=".35" stop-color="#f6f9fb"/><stop offset=".6" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/></linearGradient>
      <linearGradient id="c122-стеклоВ" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".38"/><stop offset=".14" stop-color="#fff" stop-opacity=".07"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset=".86" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#fff" stop-opacity=".34"/></linearGradient>
      <linearGradient id="c122-кафель" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#e2e8ea"/></linearGradient>
      <linearGradient id="c122-пластик" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a525c"/><stop offset=".2" stop-color="#2e343b"/><stop offset="1" stop-color="#15181c"/></linearGradient>
      <linearGradient id="c122-жк" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8d0b0"/><stop offset="1" stop-color="#8aa884"/></linearGradient>
      <radialGradient id="c122-вО" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#ff7a6a"/><stop offset="1" stop-color="#8a1408"/></radialGradient>
      <radialGradient id="c122-вН" cx=".35" cy=".3" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#eef2f6"/><stop offset="1" stop-color="#8a94a0"/></radialGradient>
      <radialGradient id="c122-кап" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff6a3a" stop-opacity=".55"/><stop offset="1" stop-color="#ff6a3a" stop-opacity="0"/></radialGradient>
      <radialGradient id="c122-кочан" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#c88ae0"/><stop offset=".45" stop-color="#7a2a9a"/><stop offset="1" stop-color="#2e0840"/></radialGradient>
      <linearGradient id="c122-волокно" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".25" stop-color="#000"/><stop offset=".5" stop-color="#fff"/><stop offset=".75" stop-color="#000"/><stop offset="1" stop-color="#fff"/></linearGradient>
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c122-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c122-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c122-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c122-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c122-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c122-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c122-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c122-пад)"/>
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
      if(о.клик&&!отм) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+5)}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r122ат(${i})"/>`;
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
    <path d="M${ф2(x-ш/2)} ${y} L${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)} L${ф2(x+ш/2)} ${y} Z" fill="url(#c122-корпус)"/>
    <path d="M${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)}" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>
    ${табло(x-ш*0.08,y-25,ф2(ш*0.56),показ,{в:18,кегль:11})}
    <circle cx="${ф2(x+ш*0.3)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/><circle cx="${ф2(x+ш*0.38)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/>
    <rect x="${x-5}" y="${y-38}" width="10" height="8" fill="url(#c122-стальВ)"/>
    <ellipse cx="${x}" cy="${y-39}" rx="${ф2(ш*0.4)}" ry="5.5" fill="url(#c122-сталь)"/><ellipse cx="${x}" cy="${y-40.5}" rx="${ф2(ш*0.36)}" ry="3.6" fill="#dfe4ea" opacity=".55"/>`;

  /* ---------- рычажные весы: содержимое чаш — функции (cx, верх чаши) ---------- */
  const коромысло = (угол,левое,правое,опц) => { const о=опц||{}, px=168, py=о.py||100, h=104;
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t), низ=о.низ||250;
    const чаша=(cx,cy,f)=>{ const yп=cy+62;
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c122-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${f(cx,yп-4)}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c122-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    return `<path d="M${px-48} ${низ} L${px+48} ${низ} L${px+32} ${низ-12} L${px-32} ${низ-12} Z" fill="#2a3038"/><rect x="${px-40}" y="${низ-4}" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="${px-5}" y="${py}" width="10" height="${низ-12-py}" fill="url(#c122-стальВ)"/>
      <rect x="${px-18}" y="${py+44}" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(px+Math.sin(рад(g))*50)} ${ф2(py+Math.cos(рад(g))*50)} L${ф2(px+Math.sin(рад(g))*57)} ${ф2(py+Math.cos(рад(g))*57)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      ${о.замок?`<rect x="${px-74}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/><rect x="${px+68}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/>`:''}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M${px} ${py} L${px} ${py+56}" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c122-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c122-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c122-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,левое)}${чаша(rx,ry,правое)}`; };
  /* золотые гирьки-эталоны: n штук рядами по 10, (cx, y) — опора */
  const эталоны = (cx,y,n) => { let s=''; const целых=Math.floor(n), пол=n-целых>0;
    for(let i=0;i<целых+(пол?1:0);i++){ const ряд=Math.floor(i/10), j=i%10, вРяду=Math.min(10,целых+(пол?1:0)-ряд*10), x=cx+(j-(вРяду-1)/2)*6.2-2.7, yy=y-6-ряд*6.2;
      const ш=(пол&&i===целых)?2.7:5.4;
      s+=`<rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="5.4" rx=".8" fill="url(#c122-латунь)"/><rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="1.2" fill="#fff6d0" opacity=".7"/>`; }
    return s; };
  /* ---------- воздушный шарик ---------- */
  let шкN=0;
  const шарик = (x,y,цв,надпись,м) => { const k=м||1, R=34*k, ид='c122-шк'+(++шкN);
    return `<g>
      <radialGradient id="${ид}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${цв}"/><stop offset=".85" stop-color="${цв}"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#${ид})"/>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#c122-объём)" opacity=".7"/>
      <ellipse cx="${ф2(x-R*0.38)}" cy="${ф2(y-R*0.5)}" rx="${ф2(R*0.2)}" ry="${ф2(R*0.34)}" transform="rotate(25 ${ф2(x-R*0.38)} ${ф2(y-R*0.5)})" fill="url(#c122-блик)"/>
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
    return `<g filter="url(#c122-тень)" transform="rotate(${о.поворот==null?-2:о.поворот} ${x+ш/2} ${y+в/2})"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="2" fill="#fbf7ec"/>
      <rect x="${x}" y="${y}" width="${ш}" height="5" fill="${о.полоса||'#c8402a'}" opacity=".8"/>
      ${строки.map((t0,i)=>`<text x="${x+8}" y="${y+20+i*15}" font-size="${i===0?11:10.5}" font-weight="${i===0?'bold':'normal'}" fill="#2e2416" font-family="'Courier New',monospace">${esc(t0)}</text>`).join('')}</g>`; };

  /* ---------- живые ползунки ---------- */
  const ПОЛЗУН = (ключ,min,max,шаг,v,подпись,ед) => `<div class="пульт-ползун" data-anim style="--i:3">
      <div class="шапка-п"><span>${подпись}</span><b id="c122-в-${ключ}">${ч2(v)}${ед}</b></div>
      <button type="button" onclick="r122шаг('${ключ}',-1)">−</button>
      <input class="ползун" id="c122-п-${ключ}" type="range" min="${min}" max="${max}" step="${шаг}" value="${v}" oninput="r122пол('${ключ}',this.value)" onchange="r122отпуск(this)" aria-label="${подпись}">
      <button type="button" onclick="r122шаг('${ключ}',1)">+</button></div>`;

  /* ================= ДЕТАЛЬНЫЕ РИСУНКИ УРОКА ================= */
  /* градиенты добавлены в ОПРЕДЕЛЕНИЯ: c122-чугун, c122-хром, c122-хромГ, c122-кафель, c122-пластик, c122-жк, c122-вО, c122-вН, c122-кап */
  const ф1 = (v) => (+v).toFixed(1);
  /* сфера с бликом (для ионов и молекул воды) */
  const сфера = (x,y,r,град,опц) => { const о=опц||{};
    return `<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${ф1(r)}" fill="url(#${град})"${о.обвод?` stroke="${о.обвод}" stroke-width="${о.ш||0.8}"`:''}/>` +
      `<ellipse cx="${ф1(x-r*0.32)}" cy="${ф1(y-r*0.38)}" rx="${ф1(r*0.34)}" ry="${ф1(r*0.2)}" transform="rotate(-30 ${ф1(x-r*0.32)} ${ф1(y-r*0.38)})" fill="#fff" opacity=".75"/>`; };
  const вода = (x,y,угол,м) => { const к=м||1; return `<g transform="translate(${ф1(x)} ${ф1(y)}) rotate(${ф1(угол)}) scale(${к})">${сфера(0,0,3.8,'c122-вО')}${сфера(-3.6,2.8,2.3,'c122-вН')}${сфера(3.6,2.8,2.3,'c122-вН')}</g>`; };

  /* ---------- микромир ионов: глянцевые ионы, гидратные оболочки, тепловое движение ---------- */
  const ЦВ_ИОН = {'H⁺':['#ffb09a','#e0402a','#6a1008'],'OH⁻':['#b8d8ff','#3a7ae8','#0e2a6a'],'Na⁺':['#e8d4ff','#9a6ae0','#3e1480'],'K⁺':['#f0e0ff','#b08ae8','#4e2490'],
    'Ca²⁺':['#d8fff0','#4ac898','#145a42'],'Cl⁻':['#c8ffb0','#5ac83a','#1a5a10'],'SO₄²⁻':['#fff4b0','#e8c02a','#7a5600']};
  const микро = (cx,cy,r,ионы,ид) => { const кл='c122-мк'+ид;
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
        ${ион==='H⁺'?`<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${rr+13}" fill="url(#c122-кап)" opacity=".55"/>`:''}${ион==='OH⁻'?`<circle cx="${ф1(x)}" cy="${ф1(y)}" r="${rr+13}" fill="#3a8aff" opacity=".16"/>`:''}
        ${оболочка}${сфера(x,y,rr,кл+'-'+idx(ион),{обвод:c[2],ш:0.6})}
        <text x="${ф1(x)}" y="${ф1(y+2.6)}" text-anchor="middle" font-size="${ион.length>3?5.6:7}" font-weight="bold" fill="${c[2]}" font-family="${ШР}">${esc(ион)}</text></g>`; } });
    /* ручка и оправа лупы с рисками */
    let риски=''; for(let j=0;j<24;j++){ const a=j*Math.PI/12; риски+=`<path d="M${ф1(cx+Math.cos(a)*(r+1))} ${ф1(cy+Math.sin(a)*(r+1))} L${ф1(cx+Math.cos(a)*(r+3.5))} ${ф1(cy+Math.sin(a)*(r+3.5))}" stroke="#2a3038" stroke-width=".8"/>`; }
    return s+`</g><circle cx="${cx}" cy="${cy}" r="${r+2.5}" fill="none" stroke="url(#рл-сталь)" stroke-width="6"/>${риски}
      <circle cx="${cx}" cy="${cy}" r="${r-1}" fill="none" stroke="#fff" stroke-opacity=".18"/>
      <path d="M${ф1(cx-r*0.55)} ${ф1(cy-r*0.62)} A${r*0.85} ${r*0.85} 0 0 1 ${ф1(cx+r*0.2)} ${ф1(cy-r*0.84)}" stroke="#fff" stroke-width="3" fill="none" opacity=".18" stroke-linecap="round"/>
      <g transform="rotate(45 ${ф1(cx+r*0.7)} ${ф1(cy+r*0.7)})"><rect x="${ф1(cx+r*0.7+4)}" y="${ф1(cy+r*0.7-5)}" width="34" height="10" rx="5" fill="#3a2414"/><rect x="${ф1(cx+r*0.7+4)}" y="${ф1(cy+r*0.7-5)}" width="34" height="3" rx="1.5" fill="#8a5a34" opacity=".7"/><rect x="${ф1(cx+r*0.7-2)}" y="${ф1(cy+r*0.7-6)}" width="8" height="12" rx="2" fill="url(#c122-хром)"/></g>`; };

  /* ---------- индикаторная бумага: полоска + шкала-карточка ---------- */
  const полоска = (x,y,ш,в,цв,подпись) => `<g filter="url(#c122-тень)"><rect x="${x}" y="${y}" width="${ш}" height="${в}" rx="1.5" fill="#f6f0e2"/>
      <rect x="${x}" y="${y+в*0.45}" width="${ш}" height="${в*0.55}" rx="1.5" fill="${цв}"/>
      <rect x="${x}" y="${y+в*0.45}" width="${ш}" height="${в*0.55}" rx="1.5" fill="url(#c122-волокно)" opacity=".35"/>
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
      <path d="M${x-34} ${yB} L${x-30} ${yB-10} H${x+78} L${x+82} ${yB} Z" fill="url(#c122-чугун)"/>
      <path d="M${x-30} ${yB-10} H${x+78}" stroke="#8a929c" stroke-width="1"/>
      <rect x="${x-28}" y="${yB-1}" width="8" height="2" rx="1" fill="#111"/><rect x="${x+68}" y="${yB-1}" width="8" height="2" rx="1" fill="#111"/>
      <ellipse cx="${x}" cy="${yB-10}" rx="7" ry="2.5" fill="#2a2f35"/>
      <rect x="${x-3}" y="${верх}" width="6" height="${yB-10-верх}" fill="url(#c122-хром)"/>
      <ellipse cx="${x}" cy="${верх}" rx="3" ry="1.4" fill="#e8ecf0"/>
      <rect x="${x-8}" y="${лапкаY-8}" width="16" height="16" rx="2.5" fill="#2a3038" stroke="#5a636d" stroke-width=".8"/>
      <rect x="${x-6}" y="${лапкаY-6}" width="12" height="3" rx="1" fill="#4a525c"/>
      <g><rect x="${x-19}" y="${лапкаY-3}" width="11" height="6" rx="1.5" fill="url(#c122-хромГ)"/><circle cx="${x-21}" cy="${лапкаY}" r="5" fill="#1e2226" stroke="#5a636d" stroke-width=".8"/>
        ${[0,1,2,3,4,5].map(j=>`<path d="M${x-21+Math.cos(j)*5} ${лапкаY+Math.sin(j)*5} L${x-21+Math.cos(j)*3} ${лапкаY+Math.sin(j)*3}" stroke="#6a737d" stroke-width=".7"/>`).join('')}</g>
      <rect x="${x+8}" y="${лапкаY-2}" width="${xб-x-20}" height="4" rx="2" fill="url(#c122-хромГ)"/>
      <path d="M${xб-14} ${лапкаY-9} Q${xб-2} ${лапкаY-12} ${xб+11} ${лапкаY-6} L${xб+11} ${лапкаY-3} Q${xб} ${лапкаY-8} ${xб-12} ${лапкаY-4} Z" fill="#3a4048"/>
      <path d="M${xб-14} ${лапкаY+9} Q${xб-2} ${лапкаY+12} ${xб+11} ${лапкаY+6} L${xб+11} ${лапкаY+3} Q${xб} ${лапкаY+8} ${xб-12} ${лапкаY+4} Z" fill="#3a4048"/>
      <path d="M${xб-8} ${лапкаY-6.5} Q${xб} ${лапкаY-9} ${xб+8} ${лапкаY-5}" stroke="#141414" stroke-width="2.4" fill="none"/>
      <path d="M${xб-8} ${лапкаY+6.5} Q${xб} ${лапкаY+9} ${xб+8} ${лапкаY+5}" stroke="#141414" stroke-width="2.4" fill="none"/>
      <rect x="${xб-17}" y="${лапкаY-7}" width="5" height="14" rx="1.5" fill="#2a3038"/><circle cx="${xб-14.5}" cy="${лапкаY}" r="2" fill="#8a929c"/></g>`;

  /* ---------- бюретка: деления через 1 мл, мениск, кран с поворотной ручкой, капля ---------- */
  const бюреткаД = (x,yT,L,израсх,цв,открыт) => { const низТр=yT+L, мл=(v)=>yT+6+(L-12)*v/50, ур=мл(Math.min(50,израсх));
    let дел=''; for(let v=0;v<=50;v++){ const y=мл(v), д=v%10===0?7:v%5===0?5:3; дел+=`<path d="M${x-6} ${ф1(y)} h${д}" stroke="#f4f7fa" stroke-width="${v%10===0?0.9:0.55}" opacity=".9"/>`;
      if(v%10===0&&v>0) дел+=`<text x="${x-9}" y="${ф1(y+2.6)}" text-anchor="end" font-size="7" font-weight="bold" fill="#e8ecf0" font-family="${ШР}">${v}</text>`; }
    const жидкость = `<clipPath id="c122-бюр"><rect x="${x-5}" y="${yT}" width="10" height="${L}"/></clipPath><g clip-path="url(#c122-бюр)">
        <rect x="${x-5}" y="${ф1(ур)}" width="10" height="${ф1(низТр-ур+2)}" fill="${цв}"/>
        <path d="M${x-5} ${ф1(ур-1.8)} Q${x} ${ф1(ур+2.2)} ${x+5} ${ф1(ур-1.8)} V${ф1(ур+3)} H${x-5} Z" fill="${цв}"/>
        <path d="M${x-5} ${ф1(ур-1.8)} Q${x} ${ф1(ур+2.2)} ${x+5} ${ф1(ур-1.8)}" stroke="#1a2a3a" stroke-width=".9" fill="none" opacity=".75"/></g>`;
    const ручка = открыт ? `<rect x="${x-1.6}" y="${низТр+1}" width="3.2" height="15" rx="1.4" fill="#2a6ab8"/>` : `<rect x="${x-9}" y="${низТр+7}" width="18" height="3.2" rx="1.4" fill="#2a6ab8"/>`;
    return `<g>${жидкость}
      <rect x="${x-6}" y="${yT}" width="12" height="${L}" rx="2" fill="url(#c122-стеклоВ)" stroke="#a8c4d4" stroke-opacity=".75" stroke-width=".9"/>
      <rect x="${x-4.5}" y="${yT+3}" width="1.6" height="${L-6}" rx=".8" fill="#fff" opacity=".7"/>
      <rect x="${x+3}" y="${yT+3}" width="1" height="${L-6}" fill="#fff" opacity=".3"/>
      <ellipse cx="${x}" cy="${yT}" rx="6.5" ry="1.8" fill="none" stroke="#e8f4fa" stroke-width="1.2"/>
      ${дел}
      <path d="M${x-4} ${низТр} L${x-2} ${низТр+6} H${x+2} L${x+4} ${низТр} Z" fill="url(#c122-стеклоВ)" stroke="#a8c4d4" stroke-width=".7"/>
      <ellipse cx="${x}" cy="${низТр+8.6}" rx="7" ry="4" fill="#f0f3f6" stroke="#9aa6b2" stroke-width=".8"/>
      <ellipse cx="${x-2}" cy="${низТр+7.4}" rx="3" ry="1.3" fill="#fff" opacity=".9"/>
      ${ручка}
      <path d="M${x-2} ${низТр+12} L${x-0.8} ${низТр+30} H${x+0.8} L${x+2} ${низТр+12} Z" fill="url(#c122-стеклоВ)" stroke="#a8c4d4" stroke-width=".6"/>
      ${открыт&&ДВ()?`<circle cx="${x}" cy="${низТр+31}" r="2.2" fill="#dceaf4" stroke="#8fa8b8" stroke-width=".5"><animate attributeName="cy" values="${низТр+31};${низТр+31};${низТр+66}" keyTimes="0;.55;1" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;1;0" keyTimes="0;.9;1" dur="1.1s" repeatCount="indefinite"/></circle>`:''}
      ${открыт?`<circle cx="${x}" cy="${низТр+30.8}" r="1.6" fill="#dceaf4"/>`:''}</g>`; };

  /* ---------- белая кафельная плитка под колбой: на белом виден переход окраски ---------- */
  const кафель = (x,y,ш) => `<g><ellipse cx="${x}" cy="${y+3}" rx="${ш/2+6}" ry="4" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>
      <path d="M${x-ш/2} ${y} L${x-ш/2+8} ${y-10} H${x+ш/2-8} L${x+ш/2} ${y} Z" fill="url(#c122-кафель)"/>
      <path d="M${x-ш/2} ${y} H${x+ш/2} V${y+3} H${x-ш/2} Z" fill="#c8ced2"/>
      <path d="M${x-ш/2+10} ${y-8} L${x-ш/2+30} ${y-8}" stroke="#fff" stroke-width="1.4" opacity=".9"/>
      <path d="M${x} ${y-10} V${y}" stroke="#dde3e6" stroke-width=".6"/></g>`;

  /* ---------- pH-метр с электродом и кабелем ---------- */
  const pHметр = (x,y,pH,эл) => { const [ex,ey,eНиз]=эл;
    return `<g>
      <path d="M${ф1(x-44)} ${ф1(y-30)} C${ф1(x-90)} ${ф1(y-30)} ${ф1(ex+30)} ${ф1(ey-40)} ${ф1(ex)} ${ф1(ey-6)}" stroke="#0e0f11" stroke-width="3.2" fill="none"/>
      <path d="M${ф1(x-44)} ${ф1(y-31)} C${ф1(x-90)} ${ф1(y-31)} ${ф1(ex+30)} ${ф1(ey-41)} ${ф1(ex)} ${ф1(ey-7)}" stroke="#4a525c" stroke-width=".8" fill="none"/>
      <rect x="${ф1(ex-2.8)}" y="${ф1(ey)}" width="5.6" height="${ф1(eНиз-ey-6)}" rx="2.2" fill="url(#c122-стеклоВ)" stroke="#a8c4d4" stroke-width=".7"/>
      <path d="M${ф1(ex)} ${ф1(ey+4)} V${ф1(eНиз-8)}" stroke="#c8ccd2" stroke-width=".8"/>
      <circle cx="${ф1(ex)}" cy="${ф1(eНиз-4)}" r="4.2" fill="rgba(220,235,245,.55)" stroke="#a8c4d4" stroke-width=".7"/><circle cx="${ф1(ex-1.4)}" cy="${ф1(eНиз-5.4)}" r="1.2" fill="#fff" opacity=".8"/>
      <rect x="${ф1(ex-4)}" y="${ф1(ey-12)}" width="8" height="13" rx="2" fill="#16181b"/><rect x="${ф1(ex-3)}" y="${ф1(ey-11)}" width="2" height="11" fill="#4a525c" opacity=".7"/>
      <ellipse cx="${x}" cy="${y+2}" rx="50" ry="4" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${x-46} ${y} L${x-42} ${y-50} H${x+42} L${x+46} ${y} Z" fill="url(#c122-пластик)"/>
      <path d="M${x-42} ${y-50} H${x+42}" stroke="#8a929c" stroke-width="1"/>
      <rect x="${x-34}" y="${y-44}" width="68" height="24" rx="3" fill="url(#c122-жк)" stroke="#0e1410" stroke-width="1.2"/>
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
      <circle cx="${ф1(x+r*0.85)}" cy="${ф1(y-r*0.72)}" r="${ф1(r*0.74)}" fill="url(#c122-кочан)"/>
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

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=258, y0=222, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const pHs=[1,3,5,7,9,11,13];
    const пр = Л.штативПробирок(168,y0+12,34,pHs.map(p=>({цвет:жидк(капустаЦвет(p),.82),уровень:.62})),1.05) + капельница(22,y0+12,1,'#8a4aa8','лакмус') + капельница(314,y0+12,1,'#f6c0dc','фенолфт.');
    const поверх = тА(168,30,'сок краснокочанной капусты',13,GOLD) + тА(168,48,'один индикатор — семь цветов',10.5,'#c8ced6') +
      pHs.map((p,i)=>тА(168+(i-3)*34,y0+34,'pH '+p,8,'#c8ced6')).join('') + шкалаPH(48,64,240,7).replace(/<path d="M[^"]*l-6 -9 h12 Z" fill="#fff"\/>/,'');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Кислоты и основания: индикаторы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r122вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('пара',['по цвету индикатора','на вкус'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Как химик узнаёт, кислота в пробирке или щёлочь?') :
          РАЗБОР(ок,['Верно: индикатор меняет цвет в кислой и щелочной среде.','Никогда! Кислоты и щёлочи разъедают рот. Для этого и придуманы <b>индикаторы</b>.'][в]))) +
      (ок ? ПРАВИЛО('<b>Индикатор</b> — вещество, которое меняет цвет в кислой и щелочной среде.') : '');
  }

  /* 2. Ионы виноваты */
  function F2(s){
    const Н=262, y0=230, Л=L_(), к=s.р2==null?0:s.р2, Р=РАСТВОРЫ[к], вид=s.вид2||{}, видено=Object.keys(вид).length, в=s.ответ2, ок=в===1;
    const пр = Л.стакан(70,y0+12,64,86,{уровень:.6,цвет:жидк(униЦвет(Р.pH),.5),объём:100,надпись:Р.ф}) + полоска(130,y0-60,14,52,униЦвет(Р.pH),'pH ≈ '+Р.pH);
    const поверх = микро(250,108,74,Р.ионы,2) + тА(250,22,'микромир раствора',9,'#9aa3ad') +
      метка(250,194,Р.ур,Р.класс==='кислота'?КР:Р.класс==='щёлочь'?СН:'#6a7480',{кегль:11}) + метка(84,8,Р.ф+' · '+Р.имя,ЗЛ,{кегль:11}) +
      метка(84,34,Р.класс==='кислота'?'много H⁺ — кислая':Р.класс==='щёлочь'?'много OH⁻ — щелочная':'нейтральная',Р.класс==='кислота'?КР:Р.класс==='щёлочь'?СН:ЗЕ,{кегль:10});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Ионы виноваты') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(4,minmax(0,1fr))">${РАСТВОРЫ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:14px">'+x.ф+'</span>','r122р('+i+')')).join('')}</div>` +
      A(4,'карт','<span class="метка">'+Р.имя+'</span><div class="текст">В воде '+Р.ф+(Р.класс==='вода'?' почти не распадается на ионы: H⁺ и OH⁻ немного и поровну.':' распадается на ионы: <b>'+Р.ур+'</b>.')+' '+(Р.класс==='кислота'?'Ионы H⁺ и делают среду кислой.':Р.класс==='щёлочь'?'Ионы OH⁻ делают среду щелочной.':'Ни H⁺, ни OH⁻ не в избытке — среда нейтральная.')+'</div>') +
      (видено<5 ? СКАЗ('Исследуй','Загляни в микромир хотя бы пяти растворов. Красное свечение — ионы H⁺, синее — OH⁻.') :
        ОТВЕТЫ('три',['ионы Cl⁻','ионы H⁺','ионы OH⁻'],1,в,2) + (в==null ? СКАЗ('Вопрос','Что общего у всех кислот в растворе?') :
          РАЗБОР(ок,['Cl⁻ есть только у соляной кислоты. Общее у всех кислот — ионы <b>H⁺</b>.','Верно: все кислоты дают ионы водорода H⁺.','OH⁻ дают щёлочи. У кислот — <b>H⁺</b>.'][в]))) +
      (ок ? ТЕОРИЯ('кислоты и щёлочи','<b>Кислоты</b> — сложные вещества из атомов водорода и кислотного остатка; в воде дают ионы <b>H⁺</b>. <b>Щёлочи</b> — растворимые основания (NaOH, KOH, Ca(OH)₂); в воде дают ионы <b>OH⁻</b>. Индикатор «чувствует», каких ионов больше.') : '');
  }

  /* 3. Шкала pH — живая сцена */
  function сцена3(s){
    const Н=290, y0=214, Л=L_(), pH=s.pH3==null?7:s.pH3, [пж,что]=жизньПри(pH), ф=фенолЦвет(pH);
    const пробирки=[{цвет:жидк(униЦвет(pH),.85),уровень:.6},{цвет:жидк(лакмусЦвет(pH),.8),уровень:.6},{цвет:жидк(метилоранжЦвет(pH),.8),уровень:.6},{цвет:ф?жидк(ф,.82):'rgba(220,235,245,.35)',уровень:.6}];
    const пр = Л.штативПробирок(168,y0+12,58,пробирки,1.1) + капельница(16,y0+12,0.8,'#7cc23a','универс.') + капельница(38,y0+12,0.8,'#8a4aa8','лакмус') +
      капельница(298,y0+12,0.8,'#f08a2a','метилор.') + капельница(320,y0+12,0.8,'#f6c0dc','фенолфт.');
    const поверх = шкалаPH(28,36,280,pH) + тА(168,84,'pH = '+ок1(pH)+' · среда '+среда(pH),14,pH<6.5?'#ff8a6a':pH>7.5?'#7fb8ff':GREEN) +
      тА(168,104,'≈ '+что+(Math.abs(пж-pH)>0.6?' (ближайшее)':''),10.5,'#c8ced6') +
      ['универс.','лакмус','метилоранж','фенолфт.'].map((t0,i)=>тА(168+(i-1.5)*58,y0+34,t0,8.5,'#c8ced6')).join('');
    return сцена(Н,y0,пр,поверх);
  }
  function F3(s){
    const pH=s.pH3==null?7:s.pH3, видел=s.видел3||{}, в=s.ответ3, ок=в===2, готов=видел.к&&видел.щ;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Шкала pH') +
      `<div class="pic тёмная" id="c122-ж-pH3">${свгЛ(сцена3(s),290)}</div>` +
      ПОЛЗУН('pH3',0,14,0.5,pH,'pH раствора','') +
      СКАЗ('Исследуй','Двигай pH от 0 до 14. Смотри на четыре индикатора: универсальный проходит всю радугу, лакмус меняет цвет около 5 и 8, метилоранж — в кислой области, фенолфталеин краснеет только после 8,2.') +
      (!готов ? СКАЗ('Ещё','Побывай и в сильно кислой среде (pH меньше 3), и в сильно щелочной (больше 11).') :
        ОТВЕТЫ('три',['метилоранж','лакмус','фенолфталеин'],2,в,3) + (в==null ? СКАЗ('Вопрос','Какой индикатор не отличит кислоту от чистой воды?') :
          РАЗБОР(ок,['Метилоранж в кислоте розовый, в воде — жёлтый: отличит.','Лакмус в кислоте красный, в воде фиолетовый: отличит.','Верно: фенолфталеин бесцветен и в кислоте, и в воде — он «видит» только щёлочь.'][в]))) +
      (ок ? ТЕОРИЯ('шкала pH','<b>pH</b> — число от 0 до 14: <b>меньше 7</b> — кислая среда, <b>7</b> — нейтральная, <b>больше 7</b> — щелочная. Чем дальше от 7, тем сильнее кислота или щёлочь. Универсальный индикатор показывает pH цветом, остальные — только «кислая или щелочная».') +
        ДИВО('pH крови человека держится около 7,4. Если он сдвигается хотя бы на 0,3 — это опасно для жизни, поэтому организм постоянно поддерживает его почками и дыханием.') : '');
  }

  /* 4. Капустный детектив */
  function F4(s){
    const Н=272, y0=226, Л=L_(), капнуто=s.кап4||{}, ответы=s.ср4||{}, n=Math.min(s.д4||0,ПРОБЫ4.length-1), ок=!!s.ок4, отз=s.отз4, все=Object.keys(ответы).filter(i=>ответы[i]===ПРОБЫ4[i].ответ).length>=ПРОБЫ4.length;
    const пробирки = ПРОБЫ4.map((П,i)=>({цвет:капнуто[i]?жидк(капустаЦвет(П.pH),.85):'rgba(225,235,240,.4)',уровень:.58}));
    const пр = Л.штативПробирок(140,y0+12,40,пробирки,1.05) + Л.стакан(298,y0+12,48,60,{уровень:.62,цвет:жидк('#6a4ab8',.85),объём:100,деления:false}) + Л.пипетка(298,y0-62,0.8,true);
    let поверх = `<ellipse cx="270" cy="114" rx="60" ry="6" fill="#000" opacity=".45" filter="url(#рл-мягко)"/><path d="M214 104 L220 96 H322 L328 104 V110 H214 Z" fill="url(#рл-древесина)"/><path d="M214 104 H328" stroke="#fff" stroke-opacity=".25"/><circle cx="320" cy="103" r="2.4" fill="#3a2414"/>` + капуста(262,100,27) + тА(298,y0+30,'капустный сок',8.5,'#c8ced6') + тА(168,22,'шесть неизвестных жидкостей',11,'#c8ced6');
    ПРОБЫ4.forEach((П,i)=>{ const x=140+(i-2.5)*40;
      поверх += тА(x,y0+30,String.fromCharCode(1040+i),11,i===n&&!все?GOLD:'#eef2f6') + (ответы[i]===П.ответ?метка(x,y0-118,['кисл.','нейтр.','щел.'][П.ответ],П.ответ===0?КР:П.ответ===2?СН:ЗЕ,{кегль:8}):'') +
        (!капнуто[i]&&!все?`<rect x="${x-19}" y="${y0-110}" width="38" height="122" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r122кап(${i})"/>`:''); });
    поверх += `<g transform="translate(14 36)"><rect width="88" height="52" rx="6" fill="rgba(12,14,18,.8)" stroke="#3a4048"/>${тА(44,12,'ключ капусты',8,'#9aa3ad')}${[[1,'кисл.'],[7,'нейтр.'],[12,'щел.']].map(([p,t0],j)=>`<rect x="${8+j*26}" y="18" width="20" height="14" rx="3" fill="${капустаЦвет(p)}"/>`+тА(18+j*26,44,t0,7,'#c8ced6')).join('')}</g>`;
    const текущая = ПРОБЫ4[n], буква=String.fromCharCode(1040+n);
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Капустный детектив') +
      `<div class="pic тёмная">${свгК(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(ПРОБЫ4.length,все?-1:n,Object.keys(ответы).filter(i=>ответы[i]===ПРОБЫ4[i].ответ).length) +
      (все ? '' : !капнуто[n] ? A(3,'карт задача','<span class="метка">Пробирка '+буква+'</span><div class="текст">Капни в пробирку '+буква+' сок краснокочанной капусты — нажми на неё или на кнопку.</div>') + `<div class="ask">${BTN(4,'','Капнуть капустный сок в '+буква,"r122кап("+n+")")}</div>`
        : A(3,'карт задача','<span class="метка">Пробирка '+буква+'</span><div class="текст">Сок стал такого цвета. Какая среда в пробирке '+буква+'? Сверься с ключом в углу.</div>') +
          `<div class="ask три">${СРЕДЫ.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',t0,"r122ср("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая пробирка →',"r122ддальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('природные индикаторы','Сок краснокочанной капусты, черники, свёклы, чай с лимоном — природные индикаторы. Капустный сок в кислоте красный, в нейтральной среде фиолетовый, в щёлочи синий, зелёный и даже жёлтый.') +
        ДИВО('Чай светлеет, если в него положить лимон: кислота меняет цвет его красящих веществ. Это тоже индикатор — прямо на кухне.') : '');
  }

  /* 5. Титрование — живая сцена */
  function сцена5(s){
    const Н=304, y0=262, Л=L_(), n=Math.min(s.т5||0,ТИТР.length-1), Т=ТИТР[n], V=s.мл5==null?0:s.мл5, ок=!!s.ок5, pH=pHтитр(Т,V), ф=фенолЦвет(pH);
    const цвКолбы = ф ? жидк(ф,.8) : 'rgba(220,235,245,.42)', xf=112, fy=y0+8, м=1.05, ур=Math.min(.9,.35+V/120), жидВерх=fy+м*(-6-52*ур);
    const открыт = !ок && V>0 && V<Vэкв(Т)+0.01;
    const облако = (ф && pH<11.6 && V>0 && !ок) ? `<ellipse cx="${xf-2}" cy="${ф1(жидВерх+5)}" rx="9" ry="2.6" fill="rgba(244,246,250,.9)">${ДВ()?`<animate attributeName="rx" values="4;17" dur="1.1s" repeatCount="indefinite"/><animate attributeName="opacity" values=".95;0" dur="1.1s" repeatCount="indefinite"/>`:''}</ellipse>` : '';
    const пр = штативД(46,y0+10,16,36,106) + кафель(xf,fy+3,126) + Л.колба(xf,fy,м,{уровень:ур,цвет:цвКолбы}) +
      капельница(194,y0+10,1,'#f6c0dc','фенолфт.') + Л.склянка(226,y0+10,26,48,{уровень:.6,этикетка:['HCl']}) + pHметр(286,y0+12,pH,[119,150,жидВерх+18]);
    const поверх = бюреткаД(106,30,122,V,'rgba(225,238,248,.55)',открыт) + облако +
      кривая(178,16,154,140,Т,V,ок) + тА(106,22,'бюретка · HCl',7.5,'#c8ced6') +
      метка(256,162,'прилито: '+ч2(V)+' мл',ЗЛ,{кегль:10}) + метка(256,188,ф?'малиновый — ещё щёлочь':Math.abs(pH-7)<0.5?'бесцветный — нейтрально!':'бесцветный — уже кислота',ф?'#d8207a':Math.abs(pH-7)<0.5?ЗЕ:КР,{кегль:9}) +
      (ок?метка(112,62,'NaOH + HCl → NaCl + H₂O',ЗЕ,{кегль:9}):'');
    return сцена(Н,y0,пр,поверх);
  }
  function F5(s){
    const n=Math.min(s.т5||0,ТИТР.length-1), Т=ТИТР[n], V=s.мл5==null?0:s.мл5, ок=!!s.ок5, отз=s.отз5, готовых=n+(ок?1:0), все=готовых>=ТИТР.length;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Титрование') +
      `<div class="pic тёмная" id="c122-ж-мл5">${свгЛ(сцена5(s),304)}</div>` +
      ТОЧКИ(ТИТР.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Нейтрализация '+(n+1)+' из 3</span><div class="текст">'+Т.текст+' Открывай кран: лови ту каплю, на которой малиновый цвет исчезнет. Перельёшь — раствор станет кислым, а фенолфталеин этого не покажет.</div>') +
      (ок ? '' : ПОЛЗУН('мл5',0,МАКС_МЛ,0.5,V,'Кислоты из бюретки',' мл') + `<div class="ask">${BTN(5,'','Закрыть кран и проверить',"r122титр()")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая колба →',"r122тдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('нейтрализация','Кислота и щёлочь уничтожают друг друга: <b>H⁺ + OH⁻ → H₂O</b>. Получаются соль и вода: NaOH + HCl → NaCl + H₂O — это <b>реакция нейтрализации</b>. Момент, когда кислоты ровно столько, сколько нужно, — <b>точка эквивалентности</b>: на кривой pH резко падает через 7. Крепкой кислоты нужно меньше.') : '');
  }

  /* 6. Кислота или основание */
  function F6(s){
    const Н=246, y0=208, Л=L_(), n=Math.min(s.ф6||0,ФОРМУЛЫ6.length-1), Ф=ФОРМУЛЫ6[n], ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=ФОРМУЛЫ6.length;
    const цв = ок ? (Ф.вид==='щёлочь'?жидк('#d8207a',.8):'rgba(220,235,245,.4)') : 'rgba(220,235,245,.4)';
    const пр = Л.стакан(100,y0+12,76,96,{уровень:.55,цвет:цв,объём:100,осадок:Ф.вид==='осадок'?10:0,муть:Ф.вид==='осадок'&&!ок?20:0,мутьЦвет:Ф.вид==='осадок'?[Ф.цв,Ф.цв,Ф.цв]:undefined}) + (ок?Л.пипетка(126,y0-96,0.8,true):'') + капельница(34,y0+12,1.1,'#f6c0dc','фенолфт.');
    const части = Ф.ф.replace(/^(H[₀-₉]?)/,'<tspan fill="#ff8a6a">$1</tspan>').replace(/(\(OH\)[₀-₉]?|OH)$/,'<tspan fill="#7fb8ff">$1</tspan>');
    const поверх = `<text x="244" y="96" text-anchor="middle" font-size="38" font-weight="bold" fill="#eef2f6" font-family="${ШР}">${части}</text>` + тА(244,120,Ф.имя,11,'#c8ced6') +
      (ок ? метка(244,140,Ф.вид==='щёлочь'?'фенолфталеин: малиновый':Ф.вид==='кислота'?'метилоранж: розовый':Ф.вид==='осадок'?'индикатор: цвет не меняет':'индикатор: нейтрально',ЗЕ,{кегль:10}) : '') +
      (Ф.вид==='осадок'?тА(100,y0+30,'осадок',9,'#c8ced6'):'');
    const кол=(i)=>ФОРМУЛЫ6.filter((x,k)=>k<готовых&&x.в===i).map(x=>x.ф).join(', ')||'—';
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Кислота или основание') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      ТОЧКИ(ФОРМУЛЫ6.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Вещество '+(n+1)+' из 10</span><div class="текст">К какому классу относится <b>'+Ф.ф+'</b>?</div>') +
        `<div class="ask пара">${КЛАССЫ.map((t0,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'','<span style="font-size:15px;line-height:1.2">'+t0+'</span>',"r122кл("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее вещество →',"r122кдальше()")}</div>` : '') +
      A(8,'карт','<span class="метка">Картотека · '+готовых+' из 10</span><table class="итоги"><tr><td>кислоты</td><td>'+кол(0)+'</td></tr><tr><td>щёлочи</td><td>'+кол(1)+'</td></tr><tr><td>нераствор. основания</td><td>'+кол(2)+'</td></tr><tr><td>другое</td><td>'+кол(3)+'</td></tr></table>') +
      (все ? ТЕОРИЯ('как узнать по формуле','<b>Кислота</b>: формула начинается с водорода H (HCl, H₂SO₄, HNO₃). <b>Основание</b>: металл и группы OH (NaOH, Cu(OH)₂). Растворимые основания — <b>щёлочи</b> — меняют цвет индикаторов. Нерастворимые (Cu(OH)₂, Fe(OH)₃) лежат осадком и индикатор не меняют.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=246, y0=210, Л=L_();
    const пр = Л.штативПробирок(110,y0+12,40,[{цвет:жидк(лакмусЦвет(2),.8),уровень:.6},{цвет:жидк(лакмусЦвет(7),.8),уровень:.6},{цвет:жидк(лакмусЦвет(12),.8),уровень:.6},{цвет:'rgba(220,235,245,.35)',уровень:.6},{цвет:жидк('#d8207a',.8),уровень:.6}],1) +
      Л.колба(284,y0+10,0.8,{уровень:.4,цвет:'rgba(220,235,245,.4)'});
    const поверх = шкалаPH(28,30,280,7).replace(/<path d="M[^"]*l-6 -9 h12 Z" fill="#fff"\/>/,'') + тА(110,y0+30,'лакмус · · фенолфталеин',8.5,'#c8ced6') + тА(284,y0+30,'NaCl + H₂O',8.5,'#c8ced6') + тА(168,82,'H⁺ + OH⁻ → H₂O',14,GOLD);
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Кислоты, основания, индикаторы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• Кислоты дают ионы <b>H⁺</b>, щёлочи — <b>OH⁻</b>.<br>• pH &lt; 7 — кислая среда, 7 — нейтральная, &gt; 7 — щелочная.<br>• Лакмус: красный — фиолетовый — синий. Метилоранж: розовый — оранжевый — жёлтый. Фенолфталеин малиновый только в щёлочи.<br>• Кислота + щёлочь → соль + вода (нейтрализация).<br>• Нерастворимые основания индикатор не меняют.</div>') +
      ПРАВИЛО('Вкус — не способ анализа. Среду определяют <b>индикатором</b>.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=166, Л=L_(), м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const пр = Л.штативПробирок(110,y0+10,34,[1,4,7,10,13].map(p=>({цвет:жидк(униЦвет(p),.82),уровень:.6})),0.95) +
      [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${Л.пробирка(244+i*26,y0+6,0.72,{уровень:.55,цвет:жидк('#d8207a',.8)})}</g>`).join('');
    const поверх = Л.имяПрибора(270,y0+22,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Индикаторы тебя не обманут.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r122заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r122мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни ионы и цвета индикаторов.')) : '')) +
      (все ? ПРАВИЛО('H⁺ — кислота, OH⁻ — щёлочь, pH 7 — нейтрально.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Лакмус покраснел. Среда —', варианты:[{т:'кислая',ок:true},{т:'щелочная',ок:false}], разбор:'Красный лакмус — кислота.' },
    { вопрос:'pH = 12 — это…', варианты:[{т:'кислота',ок:false},{т:'щёлочь',ок:true}], разбор:'Больше 7 — щелочная среда.' },
    { вопрос:'Фенолфталеин стал малиновым в растворе…', варианты:[{т:'NaOH',ок:true},{т:'HCl',ок:false}], разбор:'Малиновый — только в щёлочи.' },
    { вопрос:'Кислота + щёлочь →', варианты:[{т:'кислота + вода',ок:false},{т:'соль + вода',ок:true}], разбор:'Реакция нейтрализации.' },
    { вопрос:'Fe(OH)₃ с фенолфталеином:', варианты:[{т:'цвет не меняется',ок:true},{т:'малиновый',ок:false}], разбор:'Нерастворимое основание — ионов OH⁻ в растворе почти нет.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r122Reset()")}</div>` +
        ПРАВИЛО('pH &lt; 7 — кислая, pH &gt; 7 — щелочная.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r122Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const ЦВЕТ_ИМЯ = {'красный':'#d83a3a','фиолетовый':'#8a4aa8','синий':'#3a5ac8','бесцветный':'rgba(220,235,245,.35)','малиновый':'#d8207a','розово-красный':'#e8402a','оранжевый':'#f08a2a','жёлтый':'#f0c82a','зелёный':'#3ab06a'};
  const Т = {
    т1:{ имя:'Цвет индикатора', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Л=L_(), Н=176, y0=150, отв=ст.ответ!=null, ц=ЦВЕТ_ИМЯ[з.ок];
        return свгЛ(сцена(Н,y0,Л.пробирка(110,y0+6,1.15,{уровень:.6,цвет:отв?(ц.startsWith('#')?жидк(ц,.82):ц):'rgba(220,235,245,.35)'})+Л.пипетка(110,y0-74,0.7,true),
          тА(232,64,з.инд,12,'#eef2f6')+тА(232,86,'среда: '+з.ср,11,'#c8ced6')+тА(232,112,отв?з.ок:'цвет — ?',14,отв?GOLD:'#9aa3ad'))+серия(ст),Н); } },
    т2:{ имя:'Среда по pH', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=130, y0=120, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+шкалаPH(28,52,280,отв?з.pH:7).replace(отв?/^$/:/<path d="M[^"]*l-6 -9 h12 Z" fill="#fff"\/>/,'')+тА(168,30,'pH ≈ '+ч2(з.pH),16,'#eef2f6')+серия(ст),Н); } },
    т3:{ имя:'Кислота или щёлочь', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=140, y0=130, отв=ст.ответ!=null;
        const части = отв ? з.ф.replace(/^(H[₀-₉]?)/,'<tspan fill="#ff8a6a">$1</tspan>').replace(/(\(OH\)[₀-₉]?|OH)$/,'<tspan fill="#7fb8ff">$1</tspan>') : esc(з.ф);
        return свгЛ(L_().студия(Н,y0)+`<text x="168" y="84" text-anchor="middle" font-size="42" font-weight="bold" fill="#eef2f6" font-family="${ШР}">${части}</text>`+(отв?метка(168,96,з.ок==='кислота'?'даёт H⁺':'даёт OH⁻',з.ок==='кислота'?КР:СН,{кегль:11}):'')+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r122Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r122T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r122TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L122 = {
    id: ID, title: 'Кислоты и основания: индикаторы', ico: '🌈',
    src: 'Химия · 8–9 класс · Кислоты и основания', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Ионы виноваты: H⁺ и OH⁻ в растворах.',
      'Шкала pH и четыре индикатора.',
      'Капустный детектив: природный индикатор.',
      'Титрование: нейтрализация по каплям.',
      'Кислота или основание по формуле.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: цвет индикатора.',
      'Тренажёр 2: среда по pH.',
      'Тренажёр 3: кислота или щёлочь.'
    ],
    check: { q: 'Какой цвет имеет лакмус в кислоте?', choices: ['Синий','Красный','Зелёный','Оранжевый'], ans: 1, exp: 'В кислой среде лакмус краснеет.' },
    tasks: [
      { q: 'В раствор капнули лакмус — он стал синим. Какова среда раствора?', kind: 'choice', choices: ['Кислая','Щелочная','Нейтральная','Газовая'], ans: 1, tol: 0, hints: ['В кислоте лакмус красный.', 'Синий цвет — признак щёлочи.'], sol: 'Синий лакмус — признак щелочной среды.' },
      { q: 'Какая из формул обозначает кислоту?', kind: 'choice', choices: ['NaOH','HCl','NaCl','H₂O'], ans: 1, tol: 0, hints: ['NaOH — основание (щёлочь).', 'NaCl — соль, H₂O — вода.'], sol: 'HCl — соляная кислота.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L122.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Ионы виноваты',3:'Шкала pH',4:'Капустный детектив',5:'Титрование',6:'Кислота или основание',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l122n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Индикаторы'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  /* перерисовка: сначала снимаем фокус с ползунка — иначе wave_guard обновит только рисунок */
  const ПЕРЕРИС = () => { try{ const a=document.activeElement; if(a&&a.type==='range') a.blur(); }catch(e){} chRender(0); };
  window.r122Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; ПЕРЕРИС(); };
  window.r122вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; ПЕРЕРИС(); };
  window.r122р=(i)=>{ const s=S(); if(!РАСТВОРЫ[i]) return; s.р2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; ПЕРЕРИС(); };
  const ЖИВЫЕ = { pH3:{min:0,max:14,шаг:0.5,ед:'',сцена:сцена3,Н:290}, мл5:{min:0,max:МАКС_МЛ,шаг:0.5,ед:' мл',сцена:сцена5,Н:304} };
  const живо = (ключ) => { const s=S(), Ж=ЖИВЫЕ[ключ]; try{
      const pic=document.getElementById('c122-ж-'+ключ); if(pic) pic.innerHTML=свгЛ(Ж.сцена(s),Ж.Н);
      const в=document.getElementById('c122-в-'+ключ); if(в) в.textContent=ч2(s[ключ])+Ж.ед;
      const п=document.getElementById('c122-п-'+ключ); if(п&&+п.value!==s[ключ]) п.value=s[ключ];
    }catch(e){} };
  window.r122пол=(ключ,v)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; if(ключ==='мл5'&&s.ок5) return;
    s[ключ]=+(Math.round(Math.max(Ж.min,Math.min(Ж.max,+v))/Ж.шаг)*Ж.шаг).toFixed(1);
    if(ключ==='pH3'){ const в=Object.assign({},s.видел3||{}); if(s.pH3<3) в.к=true; if(s.pH3>11) в.щ=true; s.видел3=в; }
    if(ключ==='мл5') s.отз5=null;
    живо(ключ); };
  /* отпустили ползунок: снимаем фокус и перерисовываем урок целиком */
  window.r122отпуск=(el)=>{ try{ el.blur(); }catch(e){} chRender(0); };
  window.r122шаг=(ключ,d)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; const v=s[ключ]==null?(ключ==='pH3'?7:0):s[ключ]; window.r122пол(ключ,v+d*Ж.шаг); };
  /* капустный детектив */
  window.r122кап=(i)=>{ const s=S(); const n=s.д4||0; if(i!==n||s.ок4) { if(i!==n&&!(s.кап4||{})[i]){ s.отз4={ок:false,т:'По порядку: сначала пробирка '+String.fromCharCode(1040+n)+'.'}; ПЕРЕРИС(); } return; }
    const к=Object.assign({},s.кап4||{}); к[i]=true; s.кап4=к; s.отз4=null; ПЕРЕРИС(); };
  window.r122ср=(j)=>{ const s=S(); const n=s.д4||0, П=ПРОБЫ4[n]; if(s.ок4||!(s.кап4||{})[n]) return;
    if(j===П.ответ){ s.ок4=true; const о=Object.assign({},s.ср4||{}); о[n]=j; s.ср4=о; if(n>=ПРОБЫ4.length-1) s.дело_детектив=true;
      s.отз4={ок:true,т:'Пробирка '+String.fromCharCode(1040+n)+' — '+П.имя+', pH ≈ '+ч2(П.pH)+': среда '+СРЕДЫ[П.ответ]+'.'}; }
    else s.отз4={ок:false,j:j,т:'Сравни цвет с ключом: красный и розовый — кислота, фиолетовый — нейтрально, синий, зелёный и жёлтый — щёлочь.'};
    ПЕРЕРИС(); };
  window.r122ддальше=()=>{ const s=S(); if(!s.ок4||(s.д4||0)>=ПРОБЫ4.length-1) return; s.д4=(s.д4||0)+1; s.ок4=false; s.отз4=null; ПЕРЕРИС(); };
  /* титрование */
  window.r122титр=()=>{ const s=S(); if(s.ок5) return; const n=s.т5||0, Т=ТИТР[n], V=s.мл5==null?0:s.мл5, Ve=Vэкв(Т), pH=pHтитр(Т,V);
    if(Math.abs(V-Ve)<0.01){ s.ок5=true; if(n>=ТИТР.length-1) s.дело_титрование=true;
      s.отз5={ок:true,т:'Точно в точку: '+ч2(V)+' мл. Кислоты пришло ровно столько, сколько было щёлочи: '+ок1(Т.ca*V)+' ммоль H⁺ на '+ок1(Т.cb*Т.Vb)+' ммоль OH⁻ (концентрация × объём). pH = 7.'}; }
    else if(V<Ve) s.отз5={ок:false,т:'Раствор ещё малиновый: щёлочь не кончилась (pH ≈ '+ок1(pH)+'). Добавляй по капле.'};
    else s.отз5={ок:false,т:'Перелил: раствор бесцветный, но уже кислый (pH ≈ '+ок1(pH)+'). Фенолфталеин перелива не показывает — убавь до первой капли, на которой цвет пропал.'};
    ПЕРЕРИС(); };
  window.r122тдальше=()=>{ const s=S(); if(!s.ок5||(s.т5||0)>=ТИТР.length-1) return; s.т5=(s.т5||0)+1; s.ок5=false; s.мл5=0; s.отз5=null; ПЕРЕРИС(); };
  /* классы веществ */
  window.r122кл=(j)=>{ const s=S(); if(s.ок6) return; const n=s.ф6||0, Ф=ФОРМУЛЫ6[n];
    if(j===Ф.в){ s.ок6=true; if(n>=ФОРМУЛЫ6.length-1) s.дело_формулы=true; s.отз6={ок:true,т:Ф.ф+' — '+КЛАССЫ[Ф.в]+' ('+Ф.имя+').'}; }
    else s.отз6={ок:false,j:j,т:Ф.в===0?'Формула начинается с водорода — это кислота.':Ф.в===1?'Металл и OH, вещество растворимо — это щёлочь.':Ф.в===2?'Металл и OH, но вещество лежит осадком — нерастворимое основание.':Ф.ф==='NaCl'?'Ни H в начале, ни OH — это соль.':'Вода нейтральна: H⁺ и OH⁻ поровну.'};
    ПЕРЕРИС(); };
  window.r122кдальше=()=>{ const s=S(); if(!s.ок6||(s.ф6||0)>=ФОРМУЛЫ6.length-1) return; s.ф6=(s.ф6||0)+1; s.ок6=false; s.отз6=null; ПЕРЕРИС(); };
  window.r122мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; ПЕРЕРИС(); };
  window.r122заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; ПЕРЕРИС(); };
  window.r122Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; ПЕРЕРИС(); };
  window.r122Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; ПЕРЕРИС(); };
  window.r122T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; ПЕРЕРИС(); };
  window.r122TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; ПЕРЕРИС(); };
  window.r122Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; ПЕРЕРИС(); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L122,{__планПорядок:arr[м].__планПорядок}); else arr.push(L122); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU122={render:render, L:L122};
})();
