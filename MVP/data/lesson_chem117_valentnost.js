/* ============ ХИМИЯ · УРОК 117 · «ВАЛЕНТНОСТЬ И СОСТАВЛЕНИЕ ФОРМУЛ» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   7 класс, манера NOBOOK (как 39–116). Карточка 117 из банка подменяется этой записью (VISKW[117]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ) и собственные «атомы с крючками»: у шарика столько
   стержней-крючков, какова валентность атома; свободный крючок светится.

   ШАГИ.
   1) Карточка.
   2) Атомы с крючками: десять элементов, валентность, постоянная или переменная.
   3) Сцепи атомы: HCl, H₂O, NH₃, CH₄, CO₂ — крючки заполняются, модель защёлкивается.
   4) Одна сера — три лица: H₂S, SO₂, SO₃, CO, CO₂ и стрелочный прибор валентности.
   5) Весы связей: валентность по формуле — коромысло наклоняется по выбранному ответу.
   6) Составь формулу: «застёжка-молния» связей, индексы кнопками, НОК.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 117;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'молекулы', имя:'Сцепи молекулы',     итог:'5 из 5'},
    {ключ:'весы',     имя:'Весы связей',        итог:'8 из 8'},
    {ключ:'формулы',  имя:'Составь формулы',    итог:'6 из 6'},
    {ключ:'марафон',  имя:'Проверка: марафон',  итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Узнать, что такое валентность, научиться находить её по формуле и составлять формулы по валентности.'],
    ['Принцип','<b>Валентность</b> — способность атома образовывать определённое число химических связей. У водорода она равна <b>I</b>, у кислорода — <b>II</b>. В молекуле все «руки» атомов заняты: число связей с одной стороны равно числу связей с другой.'],
    ['Оборудование','Молекулярный конструктор: у каждого шарика столько отверстий, какова валентность атома, и стержни-связи. Периодическая система, таблица валентностей.'],
    ['Ход работы','1. Рассмотреть атомы с крючками.<br>2. Собрать модели молекул.<br>3. Сравнить валентность серы в разных веществах.<br>4. Найти валентность по формуле.<br>5. Составить формулы по валентности.'],
    ['Безопасность','Детали конструктора мелкие: не брать в рот, стержни не ломать. Вещества, модели которых собираем, — хлороводород, аммиак, угарный и сернистый газ — ядовиты: в настоящей лаборатории с ними работают только под тягой и с учителем.']
  ];
  const РИМ = ['0','I','II','III','IV','V','VI','VII','VIII'];
  const ЭЛЕМЕНТЫ = [
    {с:'H',  V:[1],     пост:1, т:'Водород всегда одновалентен: у атома одна «рука». Его валентность принята за единицу.'},
    {с:'Na', V:[1],     пост:1, т:'Натрий одновалентен, как и другие металлы первой группы: Na₂O, NaCl.'},
    {с:'Cl', V:[1,3,5,7], пост:0, т:'С водородом и металлами хлор одновалентен: HCl, NaCl. С кислородом бывает III, V и VII.'},
    {с:'O',  V:[2],     пост:1, т:'Кислород в соединениях всегда двухвалентен — это главная «мерка» для оксидов.'},
    {с:'Ca', V:[2],     пост:1, т:'Кальций двухвалентен, как и магний, цинк: CaO, CaCl₂.'},
    {с:'Al', V:[3],     пост:1, т:'Алюминий всегда трёхвалентен: Al₂O₃, AlCl₃.'},
    {с:'N',  V:[3,1,2,4,5], пост:0, т:'С водородом азот трёхвалентен (NH₃). В оксидах — от I до V.'},
    {с:'C',  V:[4,2],   пост:0, т:'Углерод обычно четырёхвалентен (CH₄, CO₂), а в угарном газе CO — двухвалентен.'},
    {с:'S',  V:[2,4,6], пост:0, т:'С водородом сера двухвалентна (H₂S), с кислородом — IV или VI (SO₂, SO₃).'},
    {с:'Fe', V:[2,3],   пост:0, т:'Железо бывает II и III: FeO и Fe₂O₃. В названии пишут: оксид железа(III).'}
  ];
  /* сборка молекул: центр, валентность, что нужно присоединить */
  const ЦЕЛИ3 = [
    {ц:'Cl', V:1, нужно:{H:1}, ф:'HCl', имя:'хлороводород',   пояс:'у хлора одна связь — и у водорода одна.'},
    {ц:'O',  V:2, нужно:{H:2}, ф:'H₂O', имя:'вода',           пояс:'кислороду нужны две связи — два водорода.'},
    {ц:'N',  V:3, нужно:{H:3}, ф:'NH₃', имя:'аммиак',         пояс:'азот трёхвалентен — три водорода.'},
    {ц:'C',  V:4, нужно:{H:4}, ф:'CH₄', имя:'метан',          пояс:'углерод четырёхвалентен — четыре водорода.'},
    {ц:'C',  V:4, нужно:{O:2}, ф:'CO₂', имя:'углекислый газ', пояс:'каждый кислород берёт две связи: 2 × II = IV.'}
  ];
  const ВАЛ_ЛИГ = {H:1, O:2, Cl:1};
  const ИМЯ_ЛИГ = {H:'водород', O:'кислород', Cl:'хлор'};
  /* переменная валентность */
  const ЛИЦА = [
    {ф:'H₂S', ц:'S', V:2, лиг:['H','H'],     имя:'сероводород',    пов:0,  запах:'запах тухлых яиц'},
    {ф:'SO₂', ц:'S', V:4, лиг:['O','O'],     имя:'сернистый газ',  пов:0,  запах:'запах горящей спички'},
    {ф:'SO₃', ц:'S', V:6, лиг:['O','O','O'], имя:'оксид серы(VI)', пов:0,  запах:'дымит во влажном воздухе'},
    {ф:'CO',  ц:'C', V:2, лиг:['O'],         имя:'угарный газ',    пов:90, запах:'без запаха — и очень ядовит'},
    {ф:'CO₂', ц:'C', V:4, лиг:['O','O'],     имя:'углекислый газ', пов:0,  запах:'без запаха, им мы дышим наружу'}
  ];
  /* весы связей: валентность X по формуле XₙOₘ */
  const ВЕСЫ = [
    {ч:[['C',1],['O',2]],  x:'C',  nx:1, no:2, в:4, вар:[2,4,6]},
    {ч:[['Cu',2],['O',1]], x:'Cu', nx:2, no:1, в:1, вар:[1,2,3]},
    {ч:[['Cu',1],['O',1]], x:'Cu', nx:1, no:1, в:2, вар:[1,2,4]},
    {ч:[['Fe',2],['O',3]], x:'Fe', nx:2, no:3, в:3, вар:[2,3,6]},
    {ч:[['S',1],['O',3]],  x:'S',  nx:1, no:3, в:6, вар:[3,4,6]},
    {ч:[['P',2],['O',5]],  x:'P',  nx:2, no:5, в:5, вар:[2,5,10]},
    {ч:[['N',2],['O',1]],  x:'N',  nx:2, no:1, в:1, вар:[1,2,4]},
    {ч:[['Cl',2],['O',7]], x:'Cl', nx:2, no:7, в:7, вар:[1,7,14]}
  ];
  /* составь формулу */
  const ПАРЫ = [
    {a:'Al', va:3, b:'O',  vb:2, имя:'оксид алюминия'},
    {a:'Ca', va:2, b:'Cl', vb:1, имя:'хлорид кальция'},
    {a:'Na', va:1, b:'S',  vb:2, имя:'сульфид натрия'},
    {a:'P',  va:5, b:'O',  vb:2, имя:'оксид фосфора(V)'},
    {a:'Fe', va:3, b:'Cl', vb:1, имя:'хлорид железа(III)'},
    {a:'C',  va:4, b:'O',  vb:2, имя:'углекислый газ'}
  ];
  const МАРАФОН = [
    {q:'Валентность водорода —', вар:['I','II','IV'], в:0, р:'Водород всегда одновалентен.'},
    {q:'Валентность кислорода в соединениях —', вар:['I','II','III'], в:1, р:'Кислород всегда II.'},
    {q:'Валентность углерода в CH₄ —', вар:['II','III','IV'], в:2, р:'Четыре водорода по I: 4 × I = IV.'},
    {q:'Сколько атомов водорода присоединит азот(III)?', вар:['1','2','3'], в:2, р:'NH₃: 3 × I = III.'},
    {q:'Валентность серы в SO₃ —', вар:['II','IV','VI'], в:2, р:'3 × II = 6, сера — VI.'},
    {q:'Формула оксида алюминия (Al — III, O — II):', вар:['AlO','Al₃O₂','Al₂O₃'], в:2, р:'НОК = 6: 6 : 3 = 2, 6 : 2 = 3.'},
    {q:'Кальций(II) с хлором(I):', вар:['CaCl','CaCl₂','Ca₂Cl'], в:1, р:'2 = 2 × 1 — два хлора.'},
    {q:'Валентность железа в Fe₂O₃ —', вар:['II','III','VI'], в:1, р:'3 × II = 6; 6 : 2 = III.'},
    {q:'У какого элемента валентность переменная?', вар:['водород','кислород','сера'], в:2, р:'Сера бывает II, IV и VI.'},
    {q:'НОК валентностей фосфора(V) и кислорода(II):', вар:['7','10','3'], в:1, р:'НОК(5, 2) = 10 → P₂O₅.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const ВП = {O:2, H:1, Cl:1};
  const ИНД = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map(c=>ИНД[+c]).join('');
  const формула = (ч) => ч.map(([с,n])=>с+(n>1?sub(n):'')).join('');
  const НОД = (a,b) => b ? НОД(b,a%b) : a;
  const НОК = (a,b) => a*b/НОД(a,b);
  const П1 = поМесту([
    [[['H',2],['O',1]],'O',2,1], [[['N',1],['H',3]],'N',3,1], [[['C',1],['H',4]],'C',4,2], [[['H',1],['Cl',1]],'Cl',1,2],
    [[['C',1],['O',2]],'C',4,2], [[['C',1],['O',1]],'C',2,4], [[['S',1],['O',2]],'S',4,2], [[['S',1],['O',3]],'S',6,3],
    [[['H',2],['S',1]],'S',2,1], [[['Fe',2],['O',3]],'Fe',3,2], [[['Fe',1],['O',1]],'Fe',2,1], [[['Cu',2],['O',1]],'Cu',1,2],
    [[['Cu',1],['O',1]],'Cu',2,1], [[['P',2],['O',5]],'P',5,2], [[['Fe',1],['Cl',3]],'Fe',3,1], [[['N',2],['O',5]],'N',5,2]]
    .map(([ч,e,ок,нет])=>{ const i=ч.findIndex(x=>x[0]===e), п=ч[1-i], nx=ч[i][1], T=п[1]*ВП[п[0]];
      return {q:'Какова валентность '+e+' в '+формула(ч)+'?', ч:ч, e:e, ок:РИМ[ок], нет:РИМ[нет], vok:ок,
        раз:п[0]+' даёт '+п[1]+' × '+РИМ[ВП[п[0]]]+' = '+T+(T===1?' связь':T<5?' связи':' связей')+'; '+T+' : '+nx+' = '+ок+' → '+e+'('+РИМ[ок]+').'}; }));
  const П2 = поМесту([['Na',1,'O',2,'NaO₂'],['Ca',2,'Cl',1,'Ca₂Cl'],['Al',3,'O',2,'Al₃O₂'],['Mg',2,'O',2,'Mg₂O'],['K',1,'S',2,'KS₂'],['Fe',3,'Cl',1,'Fe₃Cl'],
    ['C',4,'O',2,'C₂O'],['P',5,'O',2,'P₅O₂'],['Cu',2,'O',2,'Cu₂O'],['Cu',1,'O',2,'CuO₂'],['Al',3,'Cl',1,'Al₃Cl'],['S',6,'O',2,'S₃O'],
    ['N',3,'H',1,'N₃H'],['Fe',2,'O',2,'Fe₂O₃'],['Ca',2,'O',2,'Ca₂O'],['Zn',2,'Cl',1,'Zn₂Cl']]
    .map(([a,va,b,vb,нет])=>{ const н=НОК(va,vb), ч=[[a,н/va],[b,н/vb]];
      return {q:a+'('+РИМ[va]+') и '+b+'('+РИМ[vb]+'). Какая формула верна?', a:a, va:va, b:b, vb:vb, ч:ч, ок:формула(ч), нет:нет,
        раз:'НОК('+va+', '+vb+') = '+н+'; '+н+' : '+va+' = '+(н/va)+', '+н+' : '+vb+' = '+(н/vb)+' → '+формула(ч)+'.'}; }));
  const П3 = [['Al',3,1,'O',2,1],['Al',3,2,'O',2,3],['Ca',2,1,'Cl',1,2],['Ca',2,1,'Cl',1,1],['Na',1,2,'O',2,1],['Na',1,1,'O',2,1],['C',4,1,'O',2,2],['C',4,1,'H',1,3],
    ['N',3,1,'H',1,3],['P',5,2,'O',2,5],['P',5,2,'O',2,3],['Fe',3,1,'Cl',1,3],['Fe',3,1,'Cl',1,2],['K',1,2,'S',2,1],['Al',3,1,'Cl',1,2],['S',6,1,'O',2,3]]
    .map(([a,va,na,b,vb,nb])=>{ const L=na*va, R=nb*vb, ок=L===R, ч=[[a,na,РИМ[va]],[b,nb,РИМ[vb]]];
      return {q:'Формула '+формула(ч)+' ('+a+' — '+РИМ[va]+', '+b+' — '+РИМ[vb]+') верна?', ч:ч, L:L, R:R, вар:['верна','неверна'], в:ок?0:1,
        раз:na+' × '+РИМ[va]+' = '+L+(ок?' = ':' ≠ ')+R+' = '+nb+' × '+РИМ[vb]+(ок?': связи сходятся.':': связи не сходятся, верно '+формула([[a,НОК(va,vb)/va],[b,НОК(va,vb)/vb]])+'.')}; });

  const CSS=`
  #lvis .s6.l117n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l117n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l117n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l117n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l117n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l117n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l117n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l117n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l117n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l117n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l117n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l117n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l117n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l117n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l117n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l117n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l117n table.итоги td{white-space:normal!important}
  #lvis .s6.l117n table.итоги td:first-child{width:46%}
  #lvis .s6.l117n table.итоги{table-layout:fixed}
  #lvis .s6.l117n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l117n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l117n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l117n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l117n .ask button{text-align:left}
  #lvis .s6.l117n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l117n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l117n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l117n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l117n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l117n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l117n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l117n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l117n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l117n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l117n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l117n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l117n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l117n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l117n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l117n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l117n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l117n .плитка span{text-align:center}
  #lvis .s6.l117n .плитка:active{transform:scale(.96)}
  #lvis .s6.l117n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l117n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l117n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l117n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l117n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l117n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l117n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l117n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l117n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l117n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l117n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l117n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l117n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l117n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l117n{gap:14px}
  #lvis .s6.l117n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l117n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l117n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l117n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l117n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l117n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l117n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l117n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l117n .карт .текст b{color:${GOLD}}
  #lvis .s6.l117n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l117n .правило b{color:${GOLD}}
  #lvis .s6.l117n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l117n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l117n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l117n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l117n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l117n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l117n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l117n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l117n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l117n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l117n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l117n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l117n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l117n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l117n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l117n .буйки button.мимо{border-color:${RED};animation:l117nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l117nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l117n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l117n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l117n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l117n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l117n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l117n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l117n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l117n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l117n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l117n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l117n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l117n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l117n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l117n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l117n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l117n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l117n .уровни .точка.сейчас{background:${GOLD};animation:l117ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l117ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l117n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l117n{-webkit-text-size-adjust:100%}
  #lvis .s6.l117n [data-anim]{animation:l117nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l117nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l117n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l117n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l117n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l117n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l117n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l117n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l117n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l117n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l117n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l117n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l117n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l117n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l117n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l117n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l117n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l117n .акт span.до{background:#24402c}
  #lvis .s6.l117n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l117n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l117n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l117n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l117n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l117n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l117n .две-колонки li{margin:2px 0}
  #lvis .s6.l117n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l117n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l117n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l117n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l117n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l117n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l117n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l117n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l117n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l117n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l117n ul.памятка li{margin:3px 0}
  #lvis .s6.l117n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l117n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l117n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l117n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l117n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l117n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l117n table.тепло td,#lvis .s6.l117n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l117n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l117n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l117n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l117n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l117n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l117n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l117n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l117n table.детектив th{width:auto!important}
  #lvis .s6.l117n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l117n table.детектив td{font-size:12.5px}
  #lvis .s6.l117n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l117n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l117n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l117n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l117n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l117n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l117n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l117n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l117n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l117n .ряд.символы button b{font-size:19px}
  #lvis .s6.l117n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l117n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l117n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l117n .коэф-яч b{font-size:26px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l117n [data-anim]{animation:none!important}
    #lvis .s6.l117n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l117n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l117n-style');
      if(!s){ s=document.createElement('style'); s.id='l117n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r117Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c117-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c117-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c117-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c117-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c117-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c117-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c117-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c117-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c117-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c117-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c117-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c117-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <radialGradient id="c117-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c117-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c117-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c117-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c117-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c117-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c117-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c117-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c117-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c117-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c117-пад)"/>
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

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=262, y0=218, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ряд = [['H',1,'водород'],['O',2,'кислород'],['N',3,'азот'],['C',4,'углерод']];
    const xs = [46,126,208,290];
    const пр = ящик(168,y0+30,190);
    const поверх = ряд.map(([e,V,имя],i)=>подставка(xs[i],170,36) + `<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${i%2?-3:3};0 0" dur="${(2.4+i*0.3).toFixed(1)}s" repeatCount="indefinite"/>`:''}${сборка(xs[i],106,0.92,e,V,[])}</g>` +
      `<text x="${xs[i]}" y="40" text-anchor="middle" font-size="24" font-weight="bold" fill="${GOLD}" font-family="Georgia,serif">${РИМ[V]}</text>` + тА(xs[i],196,имя,10,'#9aa3ad')).join('');
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Валентность и составление формул') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r117вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['сколько связей образует атом','сколько весит атом'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что показывает валентность?') :
          РАЗБОР(ок,['Верно: валентность — число связей, «рук» атома.','Масса тут ни при чём: валентность — это число <b>связей</b>, которые образует атом.'][в]))) +
      (ок ? ПРАВИЛО('Сколько крючков у атома — такова его <b>валентность</b>: H — I, O — II, N — III, C — IV.') : '');
  }

  /* 2. Атомы с крючками */
  function F2(s){
    const Н=246, y0=214, Л=L_(), к=s.э2==null?3:s.э2, вид=s.вид2||{}, Э=ЭЛЕМЕНТЫ[к], видено=Object.keys(вид).length, в=s.ответ2, ок=в===2;
    const V=Э.V[0], м=Э.с==='H'?1.7:1.35;
    const поверх = подставка(98,196,62) + `<g>${ДВ()?`<animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/>`:''}${сборка(98,112,м,Э.с,V,[])}</g>` +
      Л.клетка(206,22,84,Э.с) +
      метка(248,120,'валентность '+Э.V.map(v=>РИМ[v]).slice(0,4).join(', '),GOLD,{кегль:12}) +
      метка(248,150,Э.пост?'постоянная':'переменная',Э.пост?ЗЕ:'#c87a2a',{кегль:11}) +
      тА(98,30,V+(V===1?' связь':V<5?' связи':' связей'),12,'#c8ced6');
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Атомы с крючками') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд символы" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${ЭЛЕМЕНТЫ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}" onclick="r117э(${i})"><b>${x.с}</b></button>`).join('')}</div>` +
      A(4,'карт','<span class="метка">'+Э.с+' · '+(L_().ЭЛ[Э.с]||['','','',''])[3]+'</span><div class="текст">'+Э.т+'</div>') +
      (видено<6 ? СКАЗ('Исследуй','Открой хотя бы шесть атомов. Сосчитай крючки — светящиеся концы — это свободные связи.') :
        ОТВЕТЫ('три',['1','2','4'],2,в,2) + (в==null ? СКАЗ('Вопрос','Сколько атомов водорода может присоединить атом углерода(IV)?') :
          РАЗБОР(ок,['У углерода четыре крючка, у водорода — один. Значит, водородов <b>4</b>: CH₄.','Посчитай крючки углерода — их четыре, а водород берёт один: <b>4</b>.','Верно: четыре крючка — четыре водорода, CH₄.'][в]))) +
      (ок ? ТЕОРИЯ('валентность','<b>Валентность</b> — способность атома образовывать определённое число химических связей. За единицу принята валентность <b>водорода</b>. Пишут римскими цифрами: O(II), Al(III). У одних элементов она <b>постоянная</b> (H, O, Na, Ca, Al), у других — <b>переменная</b> (S, C, N, Fe, Cl).') +
        ДИВО('Слово «валентность» — от латинского <i>valentia</i>, «сила». Мысль, что у каждого атома есть своя «сила сцепления», высказал англичанин Эдуард Франкланд в 1852 году.') : '');
  }

  /* 3. Сцепи атомы */
  function F3(s){
    const Н=262, y0=262, n=Math.min(s.ц3||0,ЦЕЛИ3.length-1), Ц=ЦЕЛИ3[n], сб=s.сб3||[], ок=!!s.ок3, отз=s.отз3, готовых=n+(ок?1:0), все=готовых>=ЦЕЛИ3.length;
    const р=раскладка(Ц.V,сб), своб=р?р.свободные.length:0, полно=своб===0, неверно=полно&&!ок;
    const м = Ц.V>=4?1.05:1.2;
    const тело = L_().студия(Н,y0) + подставка(168,226,96) +
      (ок?`<circle cx="168" cy="128" r="96" fill="url(#c117-зелень)"/>`:'') +
      `<g>${ДВ()&&ок?`<animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="1.2s" additive="sum" repeatCount="1"/>`:''}${сборка(168,128,м,Ц.ц,Ц.V,сб,{рим:true,красные:false})}</g>` +
      метка(168,4,(n+1)+' из 5 · собери: '+Ц.имя,ок?ЗЕ:ЗЛ,{кегль:11}) +
      (ок ? `<rect x="244" y="36" width="86" height="62" rx="10" fill="rgba(12,14,18,.78)" stroke="#3a4048"/>`+тА(287,50,'графическая',8,'#9aa3ad')+графФ(287,74,0.62,Ц.ц,Ц.V,сб)+
            `<text x="40" y="70" text-anchor="middle" font-size="26" font-weight="bold" fill="${GREEN}" font-family="${ШР}">${esc(Ц.ф)}</text>`
          : метка(168,236,полно?'связи заполнены':'свободных связей: '+своб,неверно?КР:своб?'#c87a2a':ЗЕ,{кегль:11}));
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Сцепи атомы') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(ЦЕЛИ3.length,все?-1:n,готовых) +
      (ок ? '' : `<div class="атомы" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${['H','O','Cl'].map(e=>`<button type="button" onclick="r117сц('${e}')">+ ${e} <small style="font-size:13px;color:#ffd76a">${РИМ[ВАЛ_ЛИГ[e]]}</small></button>`).join('')}</div>` +
        `<div class="атомы" data-anim style="--i:4;grid-template-columns:repeat(2,minmax(0,1fr))"><button type="button" onclick="r117сц('⌫')">⌫ убрать</button><button type="button" onclick="r117сц('0')">Сначала</button></div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Задание','У атома <b>'+Ц.ц+'</b> '+Ц.V+(Ц.V===1?' крючок':' крючка')+'. Присоединяй атомы, пока не погаснут все огоньки: водород и хлор берут по одному крючку, кислород — два.')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая молекула →',"r117цдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('графическая формула','Связи между атомами рисуют чёрточками: H–Cl, H–O–H, O=C=O. Это <b>графическая</b> (структурная) формула. От каждого атома отходит столько чёрточек, какова его валентность.') : '');
  }

  /* 4. Переменная валентность: стрелочный прибор */
  const прибор = (x,y,r,v,эл) => { const угол=(k)=>210-(k-1)*40; /* I…VII по дуге 210°…-30° */
    const ст=угол(v), c=Math.cos(рад(ст)), s0=-Math.sin(рад(ст));
    let ш=''; for(let k=1;k<=7;k++){ const a=угол(k), cc=Math.cos(рад(a)), ss=-Math.sin(рад(a));
      ш+=`<path d="M${ф2(x+cc*r*0.78)} ${ф2(y+ss*r*0.78)} L${ф2(x+cc*r*0.9)} ${ф2(y+ss*r*0.9)}" stroke="${k===v?GOLD:'#8a939b'}" stroke-width="${k===v?2.4:1.4}"/>` +
        `<text x="${ф2(x+cc*r*0.62)}" y="${ф2(y+ss*r*0.62+3.5)}" text-anchor="middle" font-size="${k===v?11:9}" font-weight="bold" fill="${k===v?GOLD:'#9aa3ad'}" font-family="Georgia,serif">${РИМ[k]}</text>`; }
    return `<g filter="url(#c117-тень)"><circle cx="${x}" cy="${y}" r="${r+6}" fill="url(#c117-латунь)"/></g>
      <circle cx="${x}" cy="${y}" r="${r}" fill="url(#c117-циферблат)"/>
      <path d="M${ф2(x+Math.cos(рад(210))*r*0.9)} ${ф2(y-Math.sin(рад(210))*r*0.9)} A${ф2(r*0.9)} ${ф2(r*0.9)} 0 1 1 ${ф2(x+Math.cos(рад(-30))*r*0.9)} ${ф2(y-Math.sin(рад(-30))*r*0.9)}" stroke="#3a4048" stroke-width="1" fill="none"/>
      ${ш}
      <path d="M${ф2(x-s0*2.6)} ${ф2(y+c*2.6)} L${ф2(x+c*r*0.74)} ${ф2(y+s0*r*0.74)} L${ф2(x+s0*2.6)} ${ф2(y-c*2.6)} Z" fill="#ff5a3a"/>
      <circle cx="${x}" cy="${y}" r="5" fill="url(#c117-латунь)"/>
      ${тА(x,y+r*0.5,'валентность '+эл,7.5,'#9aa3ad')}
      <ellipse cx="${ф2(x-r*0.35)}" cy="${ф2(y-r*0.5)}" rx="${ф2(r*0.5)}" ry="${ф2(r*0.18)}" transform="rotate(-25 ${ф2(x-r*0.35)} ${ф2(y-r*0.5)})" fill="#fff" opacity=".08"/>`; };
  function F4(s){
    const Н=250, y0=214, к=s.с4==null?0:s.с4, вид=s.вид4||{}, Л0=ЛИЦА[к], видено=Object.keys(вид).length, в=s.ответ4, ок=в===2;
    const м = Л0.V>=6?0.8:0.92;
    const поверх = подставка(112,200,70) + сборка(112,118,м,Л0.ц,Л0.V,Л0.лиг,{пов:Л0.пов,рим:true}) + прибор(262,104,54,Л0.V,Л0.ц) +
      формулаВ(262,206,Л0.лиг[0]==='H'?[['H',2,'I'],[Л0.ц,1,РИМ[Л0.V]]]:[[Л0.ц,1,РИМ[Л0.V]],['O',Л0.лиг.length,'II']],22) +
      метка(112,4,Л0.имя+' · '+Л0.ф,ЗЛ,{кегль:11});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Одна сера — три лица') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,'',поверх),Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(5,minmax(0,1fr))">${ЛИЦА.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:16px">'+x.ф+'</span>','r117с('+i+')')).join('')}</div>` +
      A(5,'карт','<span class="метка">'+Л0.ф+' · '+Л0.ц+'('+РИМ[Л0.V]+')</span><div class="текст">'+Л0.имя[0].toUpperCase()+Л0.имя.slice(1)+': '+Л0.запах+'. '+(Л0.лиг[0]==='H'?'Два водорода по I: 2 × I = '+РИМ[Л0.V]+'.':Л0.лиг.length+' × II = '+(Л0.лиг.length*2)+' → '+Л0.ц+'('+РИМ[Л0.V]+').')+'</div>') +
      (видено<4 ? СКАЗ('Исследуй','Переключи хотя бы четыре вещества. Следи за стрелкой: один и тот же атом серы или углерода тянет разное число связей.') :
        ОТВЕТЫ('три',['II','IV','VI'],2,в,4) + (в==null ? СКАЗ('Вопрос','Какова валентность серы в SO₃?') :
          РАЗБОР(ок,['II — это сера в H₂S. В SO₃ три кислорода по II: 3 × 2 = <b>6</b>.','IV — в SO₂. Здесь кислородов три: 3 × II = <b>VI</b>.','Верно: 3 × II = 6, сера шестивалентна.'][в]))) +
      (ок ? ТЕОРИЯ('переменная валентность','У серы, углерода, азота, железа валентность <b>переменная</b>: она зависит от того, с чем атом соединён. Поэтому её пишут в названии: оксид серы(IV) — SO₂, оксид серы(VI) — SO₃.') +
        ДИВО('Угарный газ CO смертельно опасен: он прочно связывается с гемоглобином крови и не даёт ему переносить кислород. Поэтому печную заслонку не закрывают, пока в печи тлеют угли.') : '');
  }

  /* 5. Весы связей */
  function весы(Д,выб,ок){
    const R=Д.no*2, L=выб!=null?Д.nx*выб:null, px=168, py=96, h=104;
    const угол = выб==null ? 10 : Math.max(-12,Math.min(12,(R-L)*2.4));
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t);
    const чаша=(cx,cy,эл,n)=>{ const yп=cy+62; let ат='';
      for(let i=0;i<n;i++){ const ряд=Math.floor(i/4), вРяду=Math.min(4,n-ряд*4), j=i-ряд*4; ат+=шар(cx+(j-(вРяду-1)/2)*23,yп-15-ряд*20,11.5,эл); }
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx)} ${ф2(yп-30-Math.floor((n-1)/4)*20)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c117-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${ат}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c117-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    const подпЛ = Д.nx+' × '+(выб!=null?РИМ[выб]:'?')+' = '+(L!=null?L:'?'), подпП = Д.no+' × II = '+R;
    return `<path d="M120 240 L216 240 L200 228 L136 228 Z" fill="#2a3038"/><rect x="128" y="236" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="163" y="${py}" width="10" height="132" fill="url(#c117-стальВ)"/>
      <rect x="150" y="140" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(168+Math.sin(рад(g))*52)} ${ф2(96+Math.cos(рад(g))*52)} L${ф2(168+Math.sin(рад(g))*58)} ${ф2(96+Math.cos(рад(g))*58)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M168 96 L168 152" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c117-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c117-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c117-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,Д.x,Д.nx)}${чаша(rx,ry,'O',Д.no)}
      ${метка(lx,ly+72,подпЛ,ок?ЗЕ:выб!=null?КР:'#6a7480',{кегль:11})}${метка(rx,ry+72,подпП,СН,{кегль:11})}
      ${формулаВ(168,50,[[Д.x,Д.nx,выб!=null?РИМ[выб]:'?'],['O',Д.no,'II']],30,{цветаВ:[ок?GREEN:выб!=null?RED:GOLD,GOLD]})}
      ${ок?метка(290,6,'равновесие',ЗЕ,{кегль:10}):выб!=null?метка(290,6,L<R?'мало связей':'много связей',КР,{кегль:10}):''}`;
  }
  function F5(s){
    const Н=262, y0=242, n=Math.min(s.д5||0,ВЕСЫ.length-1), Д=ВЕСЫ[n], ок=!!s.ок5, отз=s.отз5, выб=s.выб5==null?null:s.выб5, готовых=n+(ок?1:0), все=готовых>=ВЕСЫ.length;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Весы связей') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+весы(Д,выб,ок),Н)}</div>` +
      ТОЧКИ(ВЕСЫ.length,все?-1:n,готовых) +
      (ок ? '' : A(3,'карт задача','<span class="метка">Формула '+(n+1)+' из 8</span><div class="текст">Какова валентность <b>'+Д.x+'</b> в '+формула(Д.ч)+'? Выбери — и посмотри на весы.</div>') +
        `<div class="ask три">${Д.вар.map((v,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',РИМ[v]||String(v),"r117в("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Как взвешивать','Справа — кислород: каждый атом даёт II связи. Слева — атомы '+Д.x+'. Весы уравновесятся, когда связей слева столько же, сколько справа.')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая формула →',"r117вдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('валентность по формуле','1) Над кислородом пишем II. 2) Умножаем на его индекс — получаем число связей. 3) Делим на индекс второго элемента. <b>Fe₂O₃</b>: 3 × II = 6; 6 : 2 = III.') +
        ДИВО('N₂O — «веселящий газ»: в малых дозах он вызывает смех. Когда-то им обезболивали пациентов стоматологи.') : '');
  }

  /* 6. Составь формулу: застёжка-молния */
  function молния(П,na,nb,ок){
    const ya=62, yb=172, r=15, дл=13;
    const xs=(n)=>{ const ш=Math.min(60,250/Math.max(1,n-1)); return Array.from({length:n},(_,i)=>168+(i-(n-1)/2)*ш); };
    const кончики=(xs0,y,v,вниз)=>{ const out=[]; xs0.forEach(x=>{ for(let j=0;j<v;j++){ const off=рад(v===1?0:-52+104*j/(v-1)), dx=Math.sin(off), dy=Math.cos(off)*(вниз?1:-1);
      out.push({x:x+dx*(r+дл), y:y+dy*(r+дл), rx:x+dx*r*0.5, ry:y+dy*r*0.5}); } }); return out; };
    const Aт=кончики(xs(na),ya,П.va,true).sort((p,q)=>p.x-q.x), Bт=кончики(xs(nb),yb,П.vb,false).sort((p,q)=>p.x-q.x);
    const пар=Math.min(Aт.length,Bт.length), La=na*П.va, Lb=nb*П.vb;
    let s='';
    [...Aт,...Bт].forEach(p=>{ s+=стальной(p.rx,p.ry,p.x,p.y,4); });
    for(let i=0;i<пар;i++){ const a=Aт[i], b=Bт[i], d=`M${ф2(a.x)} ${ф2(a.y)} C${ф2(a.x)} ${ф2(a.y+26)} ${ф2(b.x)} ${ф2(b.y-26)} ${ф2(b.x)} ${ф2(b.y)}`;
      s+=`<path d="${d}" stroke="#0e2a1a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${ок?GOLD:GREEN}" stroke-width="2" fill="none" stroke-linecap="round"/>`+
        `<circle cx="${ф2(a.x)}" cy="${ф2(a.y)}" r="2.6" fill="${GREEN}"/><circle cx="${ф2(b.x)}" cy="${ф2(b.y)}" r="2.6" fill="${GREEN}"/>`; }
    Aт.slice(пар).forEach((p,i)=>{ s+=огонёк(p.x,p.y,1,true,i); });
    Bт.slice(пар).forEach((p,i)=>{ s+=огонёк(p.x,p.y,1,true,i+1); });
    xs(na).forEach(x=>{ s+=шар(x,ya,r,П.a); });
    xs(nb).forEach(x=>{ s+=шар(x,yb,r,П.b); });
    const равно=La===Lb;
    return (ок?`<ellipse cx="168" cy="117" rx="150" ry="70" fill="url(#c117-зелень)"/>`:'') + s +
      метка(168,8,П.a+': '+na+' × '+РИМ[П.va]+' = '+La+(La===1?' связь':La<5?' связи':' связей'),ЗЛ,{кегль:11}) +
      метка(168,200,П.b+': '+nb+' × '+РИМ[П.vb]+' = '+Lb+(Lb===1?' связь':Lb<5?' связи':' связей'),СН,{кегль:11}) +
      метка(168,226,равно?La+' = '+Lb+' · все крючки сцеплены':La+' ≠ '+Lb+' · горят свободные крючки',равно?ЗЕ:КР,{кегль:11});
  }
  function F6(s){
    const Н=256, y0=256, n=Math.min(s.п6||0,ПАРЫ.length-1), П=ПАРЫ[n], na=s.na6||1, nb=s.nb6||1, ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=ПАРЫ.length;
    const н=НОК(П.va,П.vb), ч=[[П.a,na],[П.b,nb]];
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Составь формулу') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+молния(П,na,nb,ок),Н)}</div>` +
      ТОЧКИ(ПАРЫ.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Вещество '+(n+1)+' из 6 · '+П.имя+'</span><div class="текст">'+П.a+'('+РИМ[П.va]+') и '+П.b+'('+РИМ[П.vb]+'). Подбери индексы так, чтобы все крючки сцепились. Сейчас: <b style="font-size:22px">'+формула(ч)+'</b></div>') +
      (ок ? '' : `<div class="коэф" data-anim style="--i:4;grid-template-columns:1fr 1fr">${[['a',П.a,na],['b',П.b,nb]].map(([к0,e,v])=>`<div class="коэф-яч"><button type="button" onclick="r117и('${к0}',-1)">−</button><b>${v}</b><button type="button" onclick="r117и('${к0}',1)">+</button><span>атомов ${e}</span></div>`).join('')}</div>` +
        `<div class="ask">${BTN(5,'','Проверить формулу',"r117ипров()")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок ? ПРАВИЛО('НОК('+П.va+', '+П.vb+') = '+н+' → '+н+' : '+П.va+' = '+(н/П.va)+', '+н+' : '+П.vb+' = '+(н/П.vb)+' → <b>'+формула([[П.a,н/П.va],[П.b,н/П.vb]])+'</b>') : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующее вещество →',"r117идальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('как составить формулу','1) Пишем символы и над ними валентности: Al<sup>III</sup> O<sup>II</sup>. 2) Находим <b>наименьшее общее кратное</b>: НОК(3, 2) = 6. 3) Делим НОК на каждую валентность — это индексы: 6 : 3 = 2, 6 : 2 = 3. Получаем <b>Al₂O₃</b>.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=246, y0=208, Л=L_();
    const поверх = подставка(88,186,58) + подставка(250,186,72) + сборка(88,118,0.92,'O',2,['H','H'],{рим:true}) + сборка(250,118,0.82,'C',4,['O','O'],{рим:true}) +
      формулаВ(88,40,[['H',2,'I'],['O',1,'II']],24) + формулаВ(250,40,[['C',1,'IV'],['O',2,'II']],24);
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Валентность и формулы') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,ящик(168,y0+26,150),поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>Валентность</b> — число связей, которые образует атом. H — I, O — II.<br>• У S, C, N, Fe валентность переменная — её пишут в названии: оксид серы(IV).<br>• В формуле связи сходятся: <b>индекс × валентность</b> одного элемента = тому же у другого.<br>• Валентность по формуле: связи кислорода делим на индекс элемента.<br>• Формула по валентностям: НОК делим на каждую валентность.</div>') +
      ПРАВИЛО('<b>Al₂O₃</b>: 2 × III = 3 × II = 6.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=162, м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const жизни = [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${шар(250+i*30,128,11,'O')}</g>`).join('');
    const поверх = подставка(84,150,48) + сборка(84,96,0.78,'N',3,['H','H','H'],{рим:true}) + жизни + L_().имяПрибора(280,152,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Валентность и формулы — твой инструмент.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r117заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r117мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Вспомни крючки и весы связей.')) : '')) +
      (все ? ПРАВИЛО('Индекс × валентность — слева и справа поровну.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'Валентность углерода в CO₂?', варианты:[{т:'IV',ок:true},{т:'II',ок:false}], разбор:'2 × II = 4.' },
    { вопрос:'Валентность меди в Cu₂O?', варианты:[{т:'II',ок:false},{т:'I',ок:true}], разбор:'1 × II = 2; 2 : 2 = I.' },
    { вопрос:'Натрий(I) и кислород(II):', варианты:[{т:'Na₂O',ок:true},{т:'NaO₂',ок:false}], разбор:'НОК = 2: два натрия, один кислород.' },
    { вопрос:'Магний(II) и хлор(I):', варианты:[{т:'Mg₂Cl',ок:false},{т:'MgCl₂',ок:true}], разбор:'1 × II = 2 × I.' },
    { вопрос:'AlCl₃ (Al — III, Cl — I) — формула…', варианты:[{т:'верна',ок:true},{т:'неверна',ок:false}], разбор:'1 × III = 3 × I = 3.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r117Reset()")}</div>` +
        ПРАВИЛО('Индекс × валентность — поровну с обеих сторон.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r117Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const Т = {
    т1:{ имя:'Валентность по формуле', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=150, y0=140, отв=ст.ответ!=null;
        const ч=з.ч.map(([с,n])=>[с,n,с===з.e?(отв?РИМ[з.vok]:'?'):РИМ[ВП[с]]]);
        return свгЛ(L_().студия(Н,y0)+формулаВ(168,96,ч,46,{цветаВ:ч.map(x=>x[0]===з.e?(отв?GREEN:RED):GOLD), цвета:ч.map(x=>x[0]===з.e?'#ffe9a8':ИНК)})+серия(ст),Н); } },
    т2:{ имя:'Составь формулу', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=160, y0=150, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+(отв?формулаВ(168,98,з.ч.map(([с,n],i)=>[с,n,РИМ[i?з.vb:з.va]]),46)
          : формулаВ(168,98,[[з.a,1,РИМ[з.va]],[з.b,1,РИМ[з.vb]]],46,{цвета:[ИНК,ИНК]})+тА(168,130,'индексы — ?',11,'#9aa3ad'))+серия(ст),Н); } },
    т3:{ имя:'Верна ли формула', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=166, y0=156, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+формулаВ(168,90,з.ч,44)+(отв?метка(168,116,з.L+(з.L===з.R?' = ':' ≠ ')+з.R,з.L===з.R?ЗЕ:КР,{кегль:12}):'')+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r117Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r117T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r117TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L117 = {
    id: ID, title: 'Валентность и составление формул', ico: '🔗',
    src: 'Химия · 7 класс · Валентность', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Атомы с крючками: что такое валентность.',
      'Сцепи атомы: модели молекул.',
      'Переменная валентность: одна сера — три лица.',
      'Весы связей: валентность по формуле.',
      'Составь формулу по валентности.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: валентность по формуле.',
      'Тренажёр 2: составь формулу.',
      'Тренажёр 3: верна ли формула.'
    ],
    check: { q: 'Чему равна валентность кислорода в соединениях?', choices: ['1','2','3','4'], ans: 1, exp: 'Кислород в соединениях всегда двухвалентен: O = 2.' },
    tasks: [
      { q: 'Какова валентность углерода в CO₂?', kind: 'choice', choices: ['2','3','4','1'], ans: 2, tol: 0, hints: ['Два кислорода принимают 2 · 2 = 4 связи.', 'Углерод отдаёт все 4 связи.'], sol: 'В CO₂ валентность углерода 4: 1 · 4 = 2 · 2.' },
      { q: 'Азот (валентность 3) соединяется с водородом (валентность 1) в аммиак NHₓ. Сколько атомов водорода x в молекуле?', kind: 'unit', ans: 3, tol: 0, hints: ['Азот тратит все 3 связи.', 'Каждый водород даёт одну связь.', 'x = 3 : 1 = 3.'], sol: 'x = 3 : 1 = 3, формула NH₃.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L117.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Валентность',3:'Конструктор',4:'Переменная валентность',5:'Весы связей',6:'Составь формулу',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l117n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Валентность'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  window.r117Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; chRender(0); };
  window.r117вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; chRender(0); };
  window.r117э=(i)=>{ const s=S(); if(!ЭЛЕМЕНТЫ[i]) return; s.э2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; chRender(0); };
  window.r117сц=(e)=>{ const s=S(); if(s.ок3) return; const n=s.ц3||0, Ц=ЦЕЛИ3[n]; const сб=(s.сб3||[]).slice();
    if(e==='⌫'){ сб.pop(); s.сб3=сб; s.отз3=null; chRender(0); return; }
    if(e==='0'){ s.сб3=[]; s.отз3=null; chRender(0); return; }
    if(!ВАЛ_ЛИГ[e]) return;
    const занято=сб.reduce((a,x)=>a+ВАЛ_ЛИГ[x],0), своб=Ц.V-занято, k=ВАЛ_ЛИГ[e];
    if(своб<=0){ s.отз3={ок:false,т:'Все крючки атома '+Ц.ц+' уже заняты. Убери лишний атом кнопкой «⌫».'}; chRender(0); return; }
    if(k>своб){ s.отз3={ок:false,т:'Кислород двухвалентен — ему нужны два свободных крючка, а у атома '+Ц.ц+' остался один.'}; chRender(0); return; }
    сб.push(e); s.сб3=сб; s.отз3=null;
    if(своб-k===0){ const сост0={}; сб.forEach(x=>сост0[x]=(сост0[x]||0)+1);
      const совп=Object.keys(сост0).length===Object.keys(Ц.нужно).length && Object.keys(Ц.нужно).every(x=>сост0[x]===Ц.нужно[x]);
      if(совп){ s.ок3=true; if(n>=ЦЕЛИ3.length-1) s.дело_молекулы=true; s.отз3={ок:true,т:'Защёлкнулось! '+Ц.ф+' — '+Ц.имя+': '+Ц.пояс}; }
      else s.отз3={ок:false,т:'Все связи заполнены — такая молекула бывает, но это не '+Ц.имя+'. Нужно: '+Object.keys(Ц.нужно).map(x=>ИМЯ_ЛИГ[x]+' × '+Ц.нужно[x]).join(', ')+'. Убери лишнее кнопкой «⌫».'}; }
    chRender(0); };
  window.r117цдальше=()=>{ const s=S(); if(!s.ок3||(s.ц3||0)>=ЦЕЛИ3.length-1) return; s.ц3=(s.ц3||0)+1; s.ок3=false; s.сб3=[]; s.отз3=null; chRender(0); };
  window.r117с=(i)=>{ const s=S(); if(!ЛИЦА[i]) return; s.с4=i; const в=Object.assign({},s.вид4||{}); в[i]=true; s.вид4=в; chRender(0); };
  window.r117в=(j)=>{ const s=S(); if(s.ок5) return; const n=s.д5||0, Д=ВЕСЫ[n], v=Д.вар[j]; if(v==null) return;
    s.выб5=v; const L=Д.nx*v, R=Д.no*2;
    if(v===Д.в){ s.ок5=true; if(n>=ВЕСЫ.length-1) s.дело_весы=true; s.отз5={ок:true,т:'Равновесие: '+Д.nx+' × '+РИМ[v]+' = '+Д.no+' × II = '+R+'. '+Д.x+'('+РИМ[v]+').'}; }
    else s.отз5={ок:false,j:j,т:'Слева '+Д.nx+' × '+(РИМ[v]||v)+' = '+L+', справа '+Д.no+' × II = '+R+' — весы '+(L<R?'тянет вправо: связей '+Д.x+' мало':'тянет влево: связей '+Д.x+' слишком много')+'.'};
    chRender(0); };
  window.r117вдальше=()=>{ const s=S(); if(!s.ок5||(s.д5||0)>=ВЕСЫ.length-1) return; s.д5=(s.д5||0)+1; s.ок5=false; s.выб5=null; s.отз5=null; chRender(0); };
  window.r117и=(сторона,d)=>{ const s=S(); if(s.ок6) return; const к=сторона==='a'?'na6':'nb6'; s[к]=Math.max(1,Math.min(5,(s[к]||1)+d)); s.отз6=null; chRender(0); };
  window.r117ипров=()=>{ const s=S(); if(s.ок6) return; const n=s.п6||0, П=ПАРЫ[n], na=s.na6||1, nb=s.nb6||1, La=na*П.va, Lb=nb*П.vb;
    if(La!==Lb) s.отз6={ок:false,т:'У '+П.a+' '+La+', у '+П.b+' '+Lb+' — связи не сходятся, свободные крючки горят красным. Подбери индексы, чтобы было поровну.'};
    else if(НОД(na,nb)>1) s.отз6={ок:false,т:'Связи сходятся, но индексы можно сократить на '+НОД(na,nb)+'. В формуле пишут наименьшие индексы: '+формула([[П.a,na/НОД(na,nb)],[П.b,nb/НОД(na,nb)]])+'.'};
    else { s.ок6=true; if(n>=ПАРЫ.length-1) s.дело_формулы=true; s.отз6={ок:true,т:'Все крючки сцеплены: '+формула([[П.a,na],[П.b,nb]])+' — '+П.имя+'.'}; }
    chRender(0); };
  window.r117идальше=()=>{ const s=S(); if(!s.ок6||(s.п6||0)>=ПАРЫ.length-1) return; s.п6=(s.п6||0)+1; s.ок6=false; s.na6=1; s.nb6=1; s.отз6=null; chRender(0); };
  window.r117мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; chRender(0); };
  window.r117заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; chRender(0); };
  window.r117Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; chRender(0); };
  window.r117Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; chRender(0); };
  window.r117T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; chRender(0); };
  window.r117TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; chRender(0); };
  window.r117Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; chRender(0); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L117,{__планПорядок:arr[м].__планПорядок}); else arr.push(L117); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU117={render:render, L:L117};
})();
