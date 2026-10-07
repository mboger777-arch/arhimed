/* ============ ХИМИЯ · УРОК 119 · «МАССОВАЯ ДОЛЯ ЭЛЕМЕНТА» · ВИРТУАЛЬНАЯ ЛАБОРАТОРИЯ ============
   7 класс, манера NOBOOK (как 39–118). Карточка 119 из банка подменяется этой записью (VISKW[119]).
   Рисунки — MVP/data/ris_lab.js (window.РЛ) и свои: модели молекул, объёмный «пирог масс»,
   мерный цилиндр, руды железа, мешок удобрения на весах, грядка.
   Ползунки обновляют рисунок «вживую» (без полной перерисовки урока), кнопки ± — точная доводка.

   ШАГИ.
   1) Карточка.
   2) Пирог масс: каждый атом — ломтик, пропорциональный Ar; нажми атом или элемент — ломтики выдвинутся.
   3) Прицел ω: на глаз налей в цилиндр долю элемента ползунком (точность ±5 %), затем — точный расчёт.
   4) Калькулятор ω: m(элемента) = Ar × индекс → Mr → ω, дробь собирается по шагам.
   5) Рудник: расставь пять руд железа по богатству (ω(Fe)); ошибка раскрывает анализ руды.
   6) Огород: отмерь удобрение так, чтобы грядке досталось нужное количество азота.
   7) Вывод, марафон, практика, три тренажёра. */
(function(){
  'use strict';

  const ID = 119;
  const GOLD='#ffd76a', GREEN='#8fd1a8', BLUE='#7fd1ff', RED='#e86a5a';
  const ИНК='#f6efe0', МУТ='#cbb89a', ЛИНИЯ='#3f7a5f', ОБВОД='#33291e';
  const ЧЕРНИЛА='#2e2416', КАМЕНЬ='#6a5a40';
  const ЗЛ='#c89a2a', СН='#2a6ab8', ЗЕ='#3a9a5a', КР='#c8402a';

  const ДЕЛА = [
    {ключ:'прицел',  имя:'Прицел ω',          итог:'6 из 6'},
    {ключ:'расчёт',  имя:'Калькулятор ω',     итог:'5 из 5'},
    {ключ:'рудник',  имя:'Рудник',            итог:'по порядку'},
    {ключ:'огород',  имя:'Огород',            итог:'3 из 3'},
    {ключ:'марафон', имя:'Проверка: марафон', итог:'10 из 10'}
  ];
  const сделано = (s,к) => !!s['дело_'+к];

  const ВКЛАДКИ = [
    ['Цель','Научиться вычислять массовую долю элемента в веществе и применять её: выбирать богатую руду, отмерять удобрение.'],
    ['Принцип','<b>Массовая доля элемента ω</b> («омега») — какая часть массы вещества приходится на этот элемент: <b>ω = Ar × индекс : Mr × 100 %</b>. Сумма долей всех элементов — 100 %.'],
    ['Оборудование','Модели молекул, периодическая система, мерный цилиндр, образцы руд железа (гематит, магнетит, сидерит, пирит, вюстит), мешки удобрений, весы.'],
    ['Ход работы','1. Разрезать «пирог масс» молекулы.<br>2. Оценить долю на глаз.<br>3. Посчитать ω по шагам.<br>4. Выбрать самую богатую руду.<br>5. Отмерить удобрение для грядки.'],
    ['Безопасность','Удобрения хранят в закрытых мешках, вносят в перчатках и строго по норме: избыток азота сжигает корни и попадает в воду. Образцы руд не пробуют и моют руки после работы.']
  ];
  const АР = {H:1,He:4,C:12,N:14,O:16,Ne:20,Na:23,Mg:24,Al:27,Si:28,P:31,S:32,Cl:35.5,Ar:40,K:39,Ca:40,Fe:56,Cu:64,Zn:65};
  const ч2 = (v) => String(v).replace('.',',');
  const ок1 = (v) => ч2(Math.round(v*10)/10);
  const ИНД = '₀₁₂₃₄₅₆₇₈₉';
  const sub = (n) => String(n).split('').map(c=>ИНД[+c]).join('');
  const формула = (ч) => ч.map(([с,n])=>с+(n>1?sub(n):'')).join('');
  const Mr = (ч) => ч.reduce((a,[e,n])=>a+АР[e]*n,0);
  const кол = (ч,e) => ч.filter(x=>x[0]===e).reduce((a,x)=>a+x[1],0);
  const масЭ = (ч,e) => АР[e]*кол(ч,e);
  const ω = (ч,e) => масЭ(ч,e)/Mr(ч)*100;
  const расчёт = (ч) => (ч.length===1&&ч[0][1]===1) ? ч2(Mr(ч)) : ч.map(([e,n])=>n>1?n+' × '+ч2(АР[e]):ч2(АР[e])).join(' + ')+' = '+ч2(Mr(ч));
  const числитель = (ч,e) => (кол(ч,e)>1?кол(ч,e)+' × '+ч2(АР[e])+' = ':'')+ч2(масЭ(ч,e));

  /* пирог масс */
  const ПИРОГИ = [
    {м:'H2O', ч:[['H',2],['O',1]], имя:'вода'},
    {м:'CO2', ч:[['C',1],['O',2]], имя:'углекислый газ'},
    {м:'CH4', ч:[['C',1],['H',4]], имя:'метан'},
    {м:'NH3', ч:[['N',1],['H',3]], имя:'аммиак'},
    {м:'SO2', ч:[['S',1],['O',2]], имя:'сернистый газ'},
    {м:'MgO', ч:[['Mg',1],['O',1]], имя:'оксид магния'},
    {м:'H2S', ч:[['H',2],['S',1]], имя:'сероводород'}
  ];
  /* прицел: оценить ω на глаз */
  const ПРИЦЕЛ = [
    {м:'H2O', ч:[['H',2],['O',1]], e:'O'},
    {м:'CO2', ч:[['C',1],['O',2]], e:'C'},
    {м:'CH4', ч:[['C',1],['H',4]], e:'H'},
    {м:'SO2', ч:[['S',1],['O',2]], e:'S'},
    {м:'MgO', ч:[['Mg',1],['O',1]], e:'Mg'},
    {м:'NH3', ч:[['N',1],['H',3]], e:'N'}
  ];
  const ДОПУСК = 5;
  /* калькулятор ω */
  const РАСЧЁТЫ = [
    {ч:[['Mg',1],['O',1]],        e:'Mg', имя:'оксид магния — жжёная магнезия'},
    {ч:[['S',1],['O',2]],         e:'O',  имя:'сернистый газ'},
    {ч:[['Fe',2],['O',3]],        e:'Fe', имя:'гематит — красная железная руда'},
    {ч:[['Ca',1],['C',1],['O',3]],e:'Ca', имя:'мел и мрамор'},
    {ч:[['H',2],['S',1],['O',4]], e:'S',  имя:'серная кислота'}
  ];
  /* рудник */
  const РУДЫ = [
    {ч:[['Fe',2],['O',3]],        имя:'гематит',  вид:'гематит'},
    {ч:[['Fe',1],['S',2]],        имя:'пирит',    вид:'пирит'},
    {ч:[['Fe',3],['O',4]],        имя:'магнетит', вид:'магнетит'},
    {ч:[['Fe',1],['C',1],['O',3]],имя:'сидерит',  вид:'сидерит'},
    {ч:[['Fe',1],['O',1]],        имя:'вюстит',   вид:'вюстит'}
  ];
  /* огород */
  const УДОБРЕНИЯ = [
    {ч:[['C',1],['O',1],['N',2],['H',4]], ф:'CO(NH₂)₂', имя:'мочевина',            нужно:1.0, цв:'#f2f2ea'},
    {ч:[['N',2],['H',4],['O',3]],         ф:'NH₄NO₃',   имя:'аммиачная селитра',   нужно:0.7, цв:'#e8eef6'},
    {ч:[['K',1],['N',1],['O',3]],         ф:'KNO₃',     имя:'калийная селитра',    нужно:0.5, цв:'#f6ecdc'}
  ];
  const МАКС_КГ = 8;
  const МАРАФОН = [
    {q:'Массовая доля элемента — это…', вар:['доля его массы в массе вещества','доля его атомов среди всех атомов','масса одного атома'], в:0, р:'ω — доля массы, а не числа атомов.'},
    {q:'ω(Mg) в MgO =', вар:['24 %','40 %','60 %'], в:2, р:'24 : 40 = 0,6 = 60 %.'},
    {q:'ω(O) в SO₂ =', вар:['33 %','50 %','67 %'], в:1, р:'32 : 64 = 0,5.'},
    {q:'ω(H) в H₂O ≈', вар:['11 %','33 %','67 %'], в:0, р:'2 : 18 ≈ 0,11. Атомов H два из трёх, а по массе — всего 11 %.'},
    {q:'Сумма массовых долей всех элементов вещества —', вар:['100 %','50 %','зависит от вещества'], в:0, р:'Вся масса вещества — 100 %.'},
    {q:'В какой руде больше железа?', вар:['FeO','Fe₂O₃','одинаково'], в:0, р:'FeO — 77,8 %, Fe₂O₃ — 70 %.'},
    {q:'ω(C) в CO₂ ≈', вар:['27 %','33 %','50 %'], в:0, р:'12 : 44 ≈ 0,27.'},
    {q:'Сколько магния в 50 г MgO?', вар:['20 г','24 г','30 г'], в:2, р:'50 × 0,6 = 30 г.'},
    {q:'ω(Fe) в Fe₂O₃ =', вар:['56 %','70 %','40 %'], в:1, р:'112 : 160 = 0,7.'},
    {q:'ω(N) в NH₃ ≈', вар:['18 %','25 %','82 %'], в:2, р:'14 : 17 ≈ 0,82.'}
  ];

  /* наборы тренажёров */
  const МЕСТО = (i) => +'0110100110010110'[i%16];
  const поМесту = (сп) => сп.map((x,i)=>{ const м=МЕСТО(i); return Object.assign(x,{вар:м?[x.нет,x.ок]:[x.ок,x.нет], в:м}); });
  const П1 = поМесту([[[['Mg',1],['O',1]],'Mg'],[[['Mg',1],['O',1]],'O'],[[['S',1],['O',2]],'S'],[[['H',2],['O',1]],'H'],[[['H',2],['O',1]],'O'],[[['C',1],['O',2]],'C'],
    [[['C',1],['H',4]],'C'],[[['C',1],['H',4]],'H'],[[['N',1],['H',3]],'N'],[[['Fe',2],['O',3]],'Fe'],[[['Ca',1],['O',1]],'Ca'],[[['Cu',1],['O',1]],'Cu'],
    [[['S',1],['O',3]],'S'],[[['Ca',1],['C',1],['O',3]],'Ca'],[[['Na',1],['Cl',1]],'Na'],[[['Al',2],['O',3]],'Al']]
    .map(([ч,e])=>{ const w=ω(ч,e), нет=ч.length===2&&Math.abs(100-2*w)>3?100-w:w>40?w/1.5:w*2;
      return {q:'Массовая доля '+e+' в '+формула(ч)+' — ?', ч:ч, e:e, ок:ок1(w)+' %', нет:ок1(нет)+' %', w:w,
        раз:'ω('+e+') = '+числитель(ч,e)+' : '+ч2(Mr(ч))+' ≈ '+ок1(w)+' %.'}; }));
  const П2 = поМесту([[[['Fe',1],['O',1]],[['Fe',2],['O',3]],'Fe'],[[['S',1],['O',2]],[['S',1],['O',3]],'S'],[[['C',1],['O',1]],[['C',1],['O',2]],'C'],[[['Cu',2],['O',1]],[['Cu',1],['O',1]],'Cu'],
    [[['N',1],['O',1]],[['N',1],['O',2]],'N'],[[['H',2],['O',1]],[['H',2],['S',1]],'H'],[[['C',1],['H',4]],[['C',2],['H',6]],'H'],[[['Mg',1],['O',1]],[['Ca',1],['O',1]],'O'],
    [[['Na',1],['Cl',1]],[['K',1],['Cl',1]],'Cl'],[[['Fe',3],['O',4]],[['Fe',2],['O',3]],'Fe'],[[['N',2],['O',1]],[['N',1],['O',1]],'N'],[[['S',1],['O',3]],[['H',2],['S',1],['O',4]],'S'],
    [[['C',1],['O',2]],[['S',1],['O',2]],'O'],[[['N',2],['H',4]],[['N',1],['H',3]],'N'],[[['Ca',1],['O',1]],[['Ca',1],['C',1],['O',3]],'Ca'],[[['Al',2],['O',3]],[['Fe',2],['O',3]],'O']]
    .map(([ч1,ч2_,e])=>{ const w1=ω(ч1,e), w2=ω(ч2_,e);
      return {q:'Где массовая доля '+e+' больше?', ч1:ч1, ч2:ч2_, e:e, ок:формула(ч1), нет:формула(ч2_), w1:w1, w2:w2,
        раз:'ω('+e+') в '+формула(ч1)+' ≈ '+ок1(w1)+' %, в '+формула(ч2_)+' ≈ '+ок1(w2)+' %.'}; }));
  const П3 = поМесту([[[['Mg',1],['O',1]],'Mg',50,20],[[['Ca',1],['C',1],['O',3]],'Ca',100,12],[[['H',2],['O',1]],'H',18,16],[[['C',1],['O',2]],'C',44,32],
    [[['S',1],['O',2]],'S',64,16],[[['Fe',2],['O',3]],'Fe',200,60],[[['Cu',1],['O',1]],'Cu',160,32],[[['N',1],['H',3]],'N',34,6],
    [[['S',1],['O',3]],'O',80,32],[[['Mg',1],['O',1]],'O',10,6],[[['Ca',1],['O',1]],'Ca',56,16],[[['Ca',1],['C',1],['O',3]],'C',50,12],
    [[['H',2],['O',1]],'O',90,10],[[['C',1],['O',2]],'O',22,6],[[['Mg',1],['O',1]],'Mg',120,48],[[['C',1],['H',4]],'H',32,24]]
    .map(([ч,e,m,нет])=>{ const ок=m*масЭ(ч,e)/Mr(ч);
      return {q:'Сколько граммов '+e+' в '+m+' г '+формула(ч)+'?', ч:ч, e:e, m:m, ок:ок1(ок)+' г', нет:нет+' г', w:ω(ч,e),
        раз:'ω('+e+') = '+ок1(ω(ч,e))+' %; m('+e+') = '+m+' × '+ч2(масЭ(ч,e))+' : '+ч2(Mr(ч))+' = '+ок1(ок)+' г.'}; }));

  const CSS=`
  #lvis .s6.l119n table.узкая{table-layout:fixed!important;font-size:13px!important}
  #lvis .s6.l119n table.узкая th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l119n table.узкая td{white-space:normal!important;padding:5px 3px!important;vertical-align:top}
  #lvis .s6.l119n table.узкая th:nth-child(1){width:22%}
  #lvis .s6.l119n table.узкая th:nth-child(2){width:26%}
  #lvis .s6.l119n table.узкая th:nth-child(3){width:34%}
  #lvis .s6.l119n .коэф{display:grid;grid-template-columns:repeat(auto-fit,minmax(70px,1fr));gap:8px;width:100%}
  #lvis .s6.l119n .коэф-яч{display:grid;grid-template-columns:30px 1fr 30px;align-items:center;gap:2px;padding:6px 4px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048}
  #lvis .s6.l119n .коэф-яч button{height:36px;border-radius:8px;border:1px solid #4a525c;background:#2d323a;color:#f2f5f8;font:inherit;font-size:20px;font-weight:700;cursor:pointer;padding:0}
  #lvis .s6.l119n .коэф-яч b{text-align:center;font-size:22px;color:#ffd76a}
  #lvis .s6.l119n .коэф-яч span{grid-column:1/-1;text-align:center;font-size:15px;color:#dfe4ea;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l119n table.счётчик tr.ок td{color:#8fd1a8}
  #lvis .s6.l119n table.счётчик tr.нет td{color:#ff9a8a}
  #lvis .s6.l119n .карт.задача.опасно{border-color:#e86a5a}
  #lvis .s6.l119n .вкладки{grid-template-columns:repeat(3,minmax(0,1fr))!important}
  #lvis .s6.l119n .вкладки button{font-size:14px!important;padding:6px 2px!important;min-width:0}
  #lvis .s6.l119n table.итоги td{white-space:normal!important}
  #lvis .s6.l119n table.итоги td:first-child{width:46%}
  #lvis .s6.l119n table.итоги{table-layout:fixed}
  #lvis .s6.l119n .вкладки button.опасно{border-color:#8a3a2a}
  #lvis .s6.l119n .вкладки button.опасно.вкл{border-color:#ff8a6a;color:#ff8a6a}
  #lvis .s6.l119n .карт.теория.опасно{border-color:#c8402a;background:linear-gradient(180deg,#331c18,#241412)}
  #lvis .s6.l119n .карт.теория.опасно .метка{color:#ff9a8a}
  #lvis .s6.l119n .ask button{text-align:left}
  #lvis .s6.l119n .ряд button{padding:8px 4px!important;line-height:1.2}
  #lvis .s6.l119n .pic.тёмная svg{border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35)}
  #lvis .s6.l119n .шапка-опыта{width:100%;display:flex;flex-direction:column;gap:2px;padding:10px 14px;border-radius:14px;background:linear-gradient(90deg,#2a2e34,#1e2126);border:1.5px solid #454b53}
  #lvis .s6.l119n .шапка-опыта span{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#8fb8e0}
  #lvis .s6.l119n .шапка-опыта b{font-size:20px;color:#f2f5f8}
  #lvis .s6.l119n .шаги-опыта{width:100%;padding:12px 14px;border-radius:16px;background:#1b1e22;border:1.5px solid #3c424a}
  #lvis .s6.l119n .шаги-заг{font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#9aa3ad;margin-bottom:8px}
  #lvis .s6.l119n .шаги-опыта ol{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:7px}
  #lvis .s6.l119n .шаги-опыта li{display:flex;gap:10px;align-items:flex-start;font-size:16px;line-height:1.35;color:#8a939d}
  #lvis .s6.l119n .шаги-опыта li i{flex:none;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal;font-size:12px;font-weight:700;background:#2b3038;color:#9aa3ad}
  #lvis .s6.l119n .шаги-опыта li.done{color:#8fd1a8}
  #lvis .s6.l119n .шаги-опыта li.done i{background:#2f5a40;color:#d8f4e4}
  #lvis .s6.l119n .шаги-опыта li.now{color:#f6efe0;font-weight:600}
  #lvis .s6.l119n .шаги-опыта li.now i{background:#ffd76a;color:#1b1e22}
  #lvis .s6.l119n .лоток{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;width:100%;padding:10px;border-radius:16px;background:#15171a;border:1.5px solid #30353c}
  #lvis .s6.l119n .плитка{display:flex;flex-direction:column;align-items:center;gap:3px;padding:6px 2px 7px;min-height:88px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font-size:12.5px;line-height:1.15;cursor:pointer;font-family:inherit}
  #lvis .s6.l119n .плитка svg{width:54px;height:54px;display:block}
  #lvis .s6.l119n .плитка span{text-align:center}
  #lvis .s6.l119n .плитка:active{transform:scale(.96)}
  #lvis .s6.l119n .плитка.done{border-color:#3a9a5a;opacity:.55}
  #lvis .s6.l119n .вкладки{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;width:100%}
  #lvis .s6.l119n .вкладки button{min-height:48px;padding:6px 4px;border-radius:12px;background:#22262b;border:1.5px solid #3a4048;color:#dfe4ea;font:inherit;font-size:14px;font-weight:700;cursor:pointer}
  #lvis .s6.l119n .вкладки button.был{border-color:#4a6a58}
  #lvis .s6.l119n .вкладки button.вкл{border-color:#ffd76a;color:#ffd76a}
  #lvis .s6.l119n .карт.теория{border-color:#5a8ab8;background:linear-gradient(180deg,#1c2833,#151d25)}
  #lvis .s6.l119n .карт.теория .метка{color:#9fd0ff}
  #lvis .s6.l119n .карт.диво{border-color:#ffd76a;background:linear-gradient(180deg,#332a16,#241d0f)}
  #lvis .s6.l119n .карт.диво .метка{color:#ffd76a}
  #lvis .s6.l119n table.итоги{width:100%;border-collapse:collapse;font-size:15px;color:#e8ecf0}
  #lvis .s6.l119n table.итоги th{text-align:left;font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad;padding:4px 6px;border-bottom:1px solid #3a4048}
  #lvis .s6.l119n table.итоги td{padding:6px;border-bottom:1px solid #2a2f35;white-space:nowrap}
  #lvis .s6.l119n table.итоги tr.пусто td{color:#5a636d}
  #lvis .s6.l119n table.итоги .полоса{display:inline-block;height:10px;border-radius:5px;background:linear-gradient(90deg,#3a9a5a,#8fd1a8);vertical-align:middle;max-width:70px}
  #lvis .s6.l119n{gap:14px}
  #lvis .s6.l119n .pic{width:100%;max-width:352px;margin:0 auto}
  #lvis .s6.l119n .pic svg{display:block;width:100%;height:auto;border-radius:14px}
  #lvis .s6.l119n .карт{width:100%;border-radius:16px;padding:14px;display:flex;flex-direction:column;gap:8px;
    background:linear-gradient(180deg,#22362c,#17261e);border:1.5px solid var(--line)}
  #lvis .s6.l119n .карт.задача{border-color:${GOLD}}
  #lvis .s6.l119n .карт.верно{border-color:${GREEN}}
  #lvis .s6.l119n .карт.ошибка{border-color:${RED}}
  #lvis .s6.l119n .карт .метка{font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:var(--mut)}
  #lvis .s6.l119n .карт .текст{font-size:20px;line-height:1.45;color:var(--ink)}
  #lvis .s6.l119n .карт .текст b{color:${GOLD}}
  #lvis .s6.l119n .правило{width:100%;padding:14px;border-radius:14px;border:2px solid ${GOLD};
    background:linear-gradient(180deg,rgba(255,215,106,.14),rgba(255,215,106,.05));font-size:20px;line-height:1.45}
  #lvis .s6.l119n .правило b{color:${GOLD}}
  #lvis .s6.l119n .журнал{width:100%;padding:12px 14px;border-radius:6px 16px 16px 6px;
    background:linear-gradient(90deg,#efe2c0,#dcc79a);border-left:7px solid #7a4a24;display:flex;flex-direction:column;gap:7px;color:${ЧЕРНИЛА}}
  #lvis .s6.l119n .журнал .шапка{display:flex;justify-content:space-between;align-items:baseline;gap:10px;
    font-size:14px;letter-spacing:.08em;text-transform:uppercase;color:#6a4a24}
  #lvis .s6.l119n .журнал .шапка b{font-size:18px;letter-spacing:0;text-transform:none;color:#7a2a10;font-family:Georgia,serif}
  #lvis .s6.l119n .журнал .шапка b.готово{color:#1a6a3a}
  #lvis .s6.l119n .журнал ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:5px}
  #lvis .s6.l119n .журнал li{display:flex;align-items:center;gap:9px;font-size:16px;line-height:1.3;color:#6a5236}
  #lvis .s6.l119n .журнал li i{flex:0 0 22px;width:22px;height:22px;border-radius:50%;font-style:normal;
    display:inline-flex;align-items:center;justify-content:center;font-size:14px;border:1.5px solid #a88a5a;color:#8a6a3a}
  #lvis .s6.l119n .журнал li.есть{color:${ЧЕРНИЛА}}
  #lvis .s6.l119n .журнал li.есть i{border-color:#1a4a6a;background:#2a6a9a;color:#fff}
  #lvis .s6.l119n .журнал li span{margin-left:auto;white-space:nowrap;font-size:14px;color:#8a6a3a;font-family:Georgia,serif}
  #lvis .s6.l119n .журнал li.есть span{color:#1a6a3a;font-weight:700}
  #lvis .s6.l119n .буйки{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;width:100%}
  #lvis .s6.l119n .буйки button{min-height:56px;border-radius:28px;cursor:pointer;font:inherit;font-size:19px;font-weight:700;
    font-family:Georgia,serif;border:2px solid #e86a5a;background:linear-gradient(180deg,#fff6ea,#f0dcc0);color:${ЧЕРНИЛА};
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 140ms cubic-bezier(.23,1,.32,1),opacity 200ms}
  #lvis .s6.l119n .буйки button:active{transform:scale(.96)}
  #lvis .s6.l119n .буйки button.пойман{opacity:.35;border-color:${GREEN};text-decoration:line-through}
  #lvis .s6.l119n .буйки button.мимо{border-color:${RED};animation:l119nнет 360ms cubic-bezier(.23,1,.32,1)}
  @keyframes l119nнет{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
  #lvis .s6.l119n .ряд{display:grid;gap:8px;width:100%}
  #lvis .s6.l119n .ряд button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:18px;font-weight:700;
    border:1.5px solid rgba(127,209,255,.5);background:rgba(127,209,255,.1);color:${ИНК};padding:6px 4px;font-family:Georgia,serif;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l119n .ряд button:active{transform:translateY(2px)}
  #lvis .s6.l119n .ряд button.вкл{border-color:${GOLD};background:rgba(255,215,106,.22);color:${GOLD}}
  #lvis .s6.l119n .случай{width:100%;display:flex;flex-direction:column;gap:6px}
  #lvis .s6.l119n .случай .что{font-size:19px;color:var(--ink);font-family:Georgia,serif}
  #lvis .s6.l119n .ask{display:flex;gap:10px;flex-wrap:wrap;width:100%}
  #lvis .s6.l119n .ask button{flex:1 1 100%;min-height:56px;height:auto;padding:13px 16px;
    overflow-wrap:anywhere;word-break:break-word;font-size:17px;font-weight:600;line-height:1.3;text-align:left;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;
    transition:transform 150ms cubic-bezier(.23,1,.32,1),border-color 150ms cubic-bezier(.23,1,.32,1)}
  #lvis .s6.l119n .ask button:active{transform:translateY(2px)}
  #lvis .s6.l119n .ask button.hit{border-color:var(--ok)}
  #lvis .s6.l119n .ask button.miss{border-color:var(--no)}
  #lvis .s6.l119n .ask.пара button{flex:1 1 calc(50% - 6px);text-align:center;font-size:18px}
  #lvis .s6.l119n .ask.три button{flex:1 1 calc(33% - 8px);text-align:center;font-size:18px;padding:13px 4px;overflow-wrap:normal;word-break:keep-all}
  #lvis .s6.l119n .уровни{display:flex;gap:8px;align-items:center;width:100%}
  #lvis .s6.l119n .уровни .точка{flex:1 1 0;height:10px;border-radius:6px;background:rgba(255,255,255,.09)}
  #lvis .s6.l119n .уровни .точка.пройдено{background:${GREEN}}
  #lvis .s6.l119n .уровни .точка.сейчас{background:${GOLD};animation:l119ndot 1.6s cubic-bezier(.23,1,.32,1) infinite}
  @keyframes l119ndot{0%,100%{opacity:1}50%{opacity:.55}}
  #lvis .s6.l119n .score{font-size:16px;color:var(--mut);text-align:center;font-variant-numeric:tabular-nums}
  #lvis .s6.l119n{-webkit-text-size-adjust:100%}
  #lvis .s6.l119n [data-anim]{animation:l119nrise 280ms cubic-bezier(.23,1,.32,1) both;animation-delay:calc(min(var(--i,0),5)*45ms)}
  @keyframes l119nrise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
  #lvis .s6.l119n .падежи{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%}
  #lvis .s6.l119n .падежи button{min-height:56px;border-radius:14px;cursor:pointer;font:inherit;font-size:16px;font-family:Georgia,serif;
    border:1.5px solid rgba(255,215,106,.45);background:rgba(255,215,106,.08);color:${ИНК};padding:6px 4px;
    touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform 140ms cubic-bezier(.23,1,.32,1),background 160ms}
  #lvis .s6.l119n .падежи button b{color:${GOLD};font-size:18px;margin-right:4px}
  #lvis .s6.l119n .падежи button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l119n .падежи button.вкл{border-color:${GOLD};background:rgba(255,215,106,.24)}
  #lvis .s6.l119n .падежи button:active{transform:translateY(2px)}
  #lvis .s6.l119n .ask.шесть button{flex:1 1 calc(16% - 8px);text-align:center;font-size:17px;padding:13px 2px;min-width:44px;font-family:Georgia,serif}
  #lvis .s6.l119n .капля{display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:4px;vertical-align:-1px;border:1px solid rgba(255,255,255,.35)}
  #lvis .s6.l119n table.цвета{table-layout:fixed!important;font-size:11.5px!important}
  #lvis .s6.l119n table.цвета th{white-space:normal!important;font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important;width:auto!important}
  #lvis .s6.l119n table.цвета th:nth-child(1){width:25%!important}
  #lvis .s6.l119n table.цвета td{white-space:normal!important;padding:5px 3px!important;vertical-align:top;width:auto!important;overflow-wrap:normal;word-break:keep-all;hyphens:none}
  #lvis .s6.l119n table.цвета td:first-child{hyphens:manual!important;-webkit-hyphens:manual!important;word-break:normal!important}
  #lvis .s6.l119n .акт{display:grid;grid-template-columns:repeat(16,minmax(0,1fr));gap:2px;margin-top:6px}
  #lvis .s6.l119n .акт span{display:flex;align-items:center;justify-content:center;height:30px;border-radius:5px;font:700 11px 'Helvetica Neue',Arial,sans-serif;color:#e8ecf0;background:#3a2e2a;border:1px solid #4a525c}
  #lvis .s6.l119n .акт span.до{background:#24402c}
  #lvis .s6.l119n .акт span.вод{background:#1f4a6e;color:#bfe6fa}
  #lvis .s6.l119n .акт span.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l119n .акт-подпись{display:flex;justify-content:space-between;gap:8px;margin-top:6px;font-size:12.5px;color:#9aa3ad}
  #lvis .s6.l119n .две-колонки{display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:15px;color:#e8ecf0}
  #lvis .s6.l119n .две-колонки b{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:#9aa3ad}
  #lvis .s6.l119n .две-колонки ul{margin:4px 0 0;padding-left:18px}
  #lvis .s6.l119n .две-колонки li{margin:2px 0}
  #lvis .s6.l119n .две-колонки li.пусто{color:#5a636d;list-style:none;margin-left:-18px}
  #lvis .s6.l119n .вкладки button{font-size:13px!important;padding-left:1px!important;padding-right:1px!important;letter-spacing:0!important}
  #lvis .s6.l119n .ряд button.был{border-color:rgba(143,209,168,.6)}
  #lvis .s6.l119n .ask.знаки button{display:flex;align-items:center;gap:8px;text-align:left;font-size:16px;padding:8px 10px}
  #lvis .s6.l119n .ask.знаки svg.зн{width:40px;height:40px;flex:0 0 40px}
  #lvis .s6.l119n .зн-мал svg{width:18px;height:18px;vertical-align:-4px;margin-right:4px}
  #lvis .s6.l119n table.два th:nth-child(1){width:40%!important}
  #lvis .s6.l119n table.два th:nth-child(2){width:60%!important}
  #lvis .s6.l119n .ряд.мелко button{font-size:15px!important;padding:8px 2px!important}
  #lvis .s6.l119n ul.памятка{margin:4px 0 0;padding-left:18px;font-size:15px;color:#e8ecf0;line-height:1.4}
  #lvis .s6.l119n ul.памятка li{margin:3px 0}
  #lvis .s6.l119n .pic svg rect[onclick]{cursor:pointer}
  #lvis .s6.l119n .ряд.символы button{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:6px 2px!important;min-height:58px}
  #lvis .s6.l119n .ряд.символы button b{font-size:20px;line-height:1}
  #lvis .s6.l119n .ряд.символы button span{font-size:11px;font-weight:600;opacity:.85;overflow-wrap:anywhere}
  #lvis .s6.l119n table.тепло{table-layout:fixed;font-size:14px}
  #lvis .s6.l119n table.тепло th:nth-child(1){width:34%}
  #lvis .s6.l119n table.тепло td,#lvis .s6.l119n table.тепло th{padding:5px 3px!important}
  #lvis .s6.l119n .лоток .плитка span{font-size:11.5px;letter-spacing:-.01em}
  #lvis .s6.l119n .лоток .плитка svg{width:100%;max-width:54px;height:auto}
  #lvis .s6.l119n table.сравнение th{font-size:10px!important;letter-spacing:0!important;padding:4px 3px!important}
  #lvis .s6.l119n table.сравнение{table-layout:fixed;font-size:14px}
  #lvis .s6.l119n table.сравнение th:nth-child(1){width:26%}
  #lvis .s6.l119n table.сравнение td{white-space:normal!important;vertical-align:top}
  #lvis .s6.l119n .лоток .плитка.вкл{border-color:#ffd76a;box-shadow:0 0 0 1.5px #ffd76a inset}
  #lvis .s6.l119n table.детектив th{width:auto!important}
  #lvis .s6.l119n table.детектив th:nth-child(1){width:28%!important}
  #lvis .s6.l119n table.детектив td{font-size:12.5px}
  #lvis .s6.l119n .коэф-пульт{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
  #lvis .s6.l119n .коэф-пульт>div{display:flex;align-items:center;gap:6px;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:8px 8px}
  #lvis .s6.l119n .коэф-пульт span{flex:1 1 auto;font-size:13px;color:#9aa3ad;line-height:1.15}
  #lvis .s6.l119n .коэф-пульт>div>b{font-size:24px;min-width:18px;text-align:center;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l119n .коэф-пульт button{width:40px;height:44px;flex:0 0 40px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l119n .коэф-пульт button:active{transform:translateY(2px)}
  #lvis .s6.l119n .атомы{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;width:100%}
  #lvis .s6.l119n .атомы button{min-height:52px;border-radius:14px;cursor:pointer;font:inherit;font-size:20px;font-weight:800;border:1.5px solid #4a525c;background:#22262b;color:#eef2f6;touch-action:manipulation;-webkit-tap-highlight-color:transparent;padding:4px;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l119n .атомы button:active{transform:translateY(2px)}
  #lvis .s6.l119n .ряд.символы button b{font-size:19px}
  #lvis .s6.l119n .атомы button small{font-family:Georgia,serif;font-weight:700}
  #lvis .s6.l119n .коэф-яч{grid-template-columns:44px 1fr 44px}
  #lvis .s6.l119n .коэф-яч button{height:44px;touch-action:manipulation}
  #lvis .s6.l119n .коэф-яч b{font-size:26px}
  #lvis .s6.l119n .пульт-ползун{display:grid;grid-template-columns:48px 1fr 48px;gap:8px 10px;align-items:center;background:#15171a;border:1.5px solid #30353c;border-radius:14px;padding:10px 10px 8px;width:100%;box-sizing:border-box}
  #lvis .s6.l119n .пульт-ползун .шапка-п{grid-column:1/-1;display:flex;justify-content:space-between;align-items:baseline}
  #lvis .s6.l119n .пульт-ползун .шапка-п span{font-size:14px;color:#9aa3ad}
  #lvis .s6.l119n .пульт-ползун .шапка-п b{font-size:26px;color:#ffd76a;font-family:'Helvetica Neue',Arial,sans-serif}
  #lvis .s6.l119n .пульт-ползун button{height:44px;border-radius:10px;background:#22262b;border:1.5px solid #4a525c;color:#eef2f6;font-size:22px;font-weight:700;cursor:pointer;padding:0;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
  #lvis .s6.l119n .пульт-ползун button:active{transform:translateY(2px)}
  #lvis .s6.l119n input[type=range].ползун{width:100%;height:44px;margin:0;-webkit-appearance:none;appearance:none;background:transparent;cursor:pointer}
  #lvis .s6.l119n input[type=range].ползун::-webkit-slider-runnable-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l119n input[type=range].ползун::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#e8e0cc);border:3px solid #ffd76a;margin-top:-10px;box-shadow:0 2px 8px rgba(0,0,0,.6)}
  #lvis .s6.l119n input[type=range].ползун::-moz-range-track{height:10px;border-radius:5px;background:linear-gradient(90deg,#2a6ab8,#3a9a5a,#ffd76a)}
  #lvis .s6.l119n input[type=range].ползун::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:#f6efe0;border:3px solid #ffd76a}
  #lvis .s6.l119n .атомы button.вкл{border-color:#ffd76a;color:#ffd76a;background:rgba(255,215,106,.15)}
  #lvis .s6.l119n .атомы button{font-size:16px}
  @media (prefers-reduced-motion: reduce){
    #lvis .s6.l119n [data-anim]{animation:none!important}
    #lvis .s6.l119n .уровни .точка.сейчас{animation:none!important}
    #lvis .s6.l119n button{transition:none!important;animation:none!important}
  }`;

  const ударениеH = (w) => esc(w).replace(/([А-ЯЁ])/g,'<span style="color:#ff8a6a">$1</span>');

  function css(){
    try{
      if(window.RUKIT && RUKIT.frameCss) RUKIT.frameCss();
      let s=document.getElementById('l119n-style');
      if(!s){ s=document.createElement('style'); s.id='l119n-style'; document.head.appendChild(s); }
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
      BTN(5+к, в===к?(к===верный?'hit':'miss'):'', v, 'r119Отв('+f+','+к+')')).join('')}</div>`;
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
      <filter id="c119-тень" x="-30%" y="-30%" width="160%" height="170%">
        <feDropShadow dx="1.5" dy="2" stdDeviation="1.6" flood-color="#0b1c2a" flood-opacity=".45"/>
      </filter>
      <filter id="c119-сияние" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="3"/></filter>
      <radialGradient id="c119-блик" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".5" stop-color="#fff" stop-opacity=".4"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c119-объём" cx=".36" cy=".32" r=".74">
        <stop offset=".52" stop-color="#000" stop-opacity="0"/><stop offset=".86" stop-color="#000" stop-opacity=".26"/><stop offset="1" stop-color="#000" stop-opacity=".5"/>
      </radialGradient>
      <radialGradient id="c119-огонёк" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#fff6d0"/><stop offset=".3" stop-color="#ffc24a" stop-opacity=".95"/><stop offset="1" stop-color="#ff7a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c119-тревога" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe0d8"/><stop offset=".3" stop-color="#ff5a3a" stop-opacity=".95"/><stop offset="1" stop-color="#c81a00" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="c119-зелень" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#8fd1a8" stop-opacity=".55"/><stop offset="1" stop-color="#8fd1a8" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="c119-сталь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#4a525c"/><stop offset=".38" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#b4bcc6"/><stop offset="1" stop-color="#3a424c"/>
      </linearGradient>
      <linearGradient id="c119-стальВ" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#3a424c"/><stop offset=".35" stop-color="#e8ecf0"/><stop offset=".55" stop-color="#9aa3ad"/><stop offset="1" stop-color="#2a3038"/>
      </linearGradient>
      <linearGradient id="c119-латунь" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#7a5a14"/><stop offset=".36" stop-color="#ffe9a8"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#5a3e0a"/>
      </linearGradient>
      <linearGradient id="c119-чаша" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#ffefc0"/><stop offset=".45" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/>
      </linearGradient>
      <radialGradient id="c119-циферблат" cx=".45" cy=".4" r=".7">
        <stop offset="0" stop-color="#2e343c"/><stop offset=".85" stop-color="#14171b"/><stop offset="1" stop-color="#0a0c0e"/>
      </radialGradient>
      <linearGradient id="c119-корпус" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#6a727c"/><stop offset=".12" stop-color="#3a424c"/><stop offset=".7" stop-color="#22272d"/><stop offset="1" stop-color="#121519"/>
      </linearGradient>
      <radialGradient id="c119-пад" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#7fd1ff" stop-opacity=".38"/><stop offset=".6" stop-color="#3a8ac8" stop-opacity=".12"/><stop offset="1" stop-color="#3a8ac8" stop-opacity="0"/>
      </radialGradient>
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<radialGradient id="c119-ш-${e}" cx=".36" cy=".3" r=".78">
        <stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${c1}"/><stop offset=".78" stop-color="${c2}"/><stop offset="1" stop-color="${c2}"/></radialGradient>
        <linearGradient id="c119-ст-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c2}"/><stop offset=".36" stop-color="${c1}"/><stop offset=".48" stop-color="#fff"/><stop offset=".64" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
      ${Object.entries(ПАЛ).map(([e,[c1,c2]])=>`<linearGradient id="c119-пир-${e}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c1}" stop-opacity=".82"/></linearGradient>
        <linearGradient id="c119-бок-${e}" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${c2}"/><stop offset=".4" stop-color="${c1}" stop-opacity=".9"/><stop offset="1" stop-color="${c2}"/></linearGradient>`).join('')}
      <radialGradient id="c119-глянец" cx=".35" cy=".25" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
      <linearGradient id="c119-жидкость" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".3"/><stop offset=".3" stop-color="#fff" stop-opacity=".18"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></linearGradient>
      <linearGradient id="c119-стекло-основа" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#dcebf5" stop-opacity=".55"/><stop offset="1" stop-color="#7a9ab0" stop-opacity=".4"/></linearGradient>
      <linearGradient id="c119-пьедестал" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8a6a2a"/><stop offset=".35" stop-color="#ffe7a0"/><stop offset=".6" stop-color="#d4a844"/><stop offset="1" stop-color="#6a4a10"/></linearGradient>
      <linearGradient id="c119-почва" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a3a22"/><stop offset="1" stop-color="#2a1a0e"/></linearGradient>
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
    return `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c119-ш-${ПАЛ[e]?e:'C'})"/>
      <circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(r)}" fill="url(#c119-объём)"/>
      <path d="M${ф2(x+rr*Math.cos(a1))} ${ф2(y+rr*Math.sin(a1))} A${ф2(rr)} ${ф2(rr)} 0 0 1 ${ф2(x+rr*Math.cos(a2))} ${ф2(y+rr*Math.sin(a2))}" stroke="#fff" stroke-opacity=".3" stroke-width="${ф2(r*0.09)}" fill="none" stroke-linecap="round"/>
      <ellipse cx="${ф2(x-r*0.34)}" cy="${ф2(y-r*0.4)}" rx="${ф2(r*0.36)}" ry="${ф2(r*0.21)}" transform="rotate(-35 ${ф2(x-r*0.34)} ${ф2(y-r*0.4)})" fill="url(#c119-блик)"/>
      <text x="${ф2(x)}" y="${ф2(y+к*0.36)}" text-anchor="middle" font-size="${ф2(к)}" font-weight="bold" fill="${тк}" font-family="${ШР}"${тк==='#fff'?' stroke="rgba(0,0,0,.35)" stroke-width="1.6" paint-order="stroke"':''}>${esc(e)}</text>`; };
  /* стержень-связь: половинки в цвет своих атомов */
  const стержень = (x1,y1,x2,y2,w,e1,e2) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L/2+0.6)}" height="${ф2(w)}" fill="url(#c119-ст-${e1})"/><rect x="${ф2(L/2)}" y="${ф2(-w/2)}" width="${ф2(L/2)}" height="${ф2(w)}" rx="${ф2(w*0.2)}" fill="url(#c119-ст-${e2})"/></g>`; };
  const стальной = (x1,y1,x2,y2,w) => { const L=Math.hypot(x2-x1,y2-y1), a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;
    return `<g transform="translate(${ф2(x1)} ${ф2(y1)}) rotate(${ф2(a)})"><rect x="0" y="${ф2(-w/2)}" width="${ф2(L)}" height="${ф2(w)}" rx="${ф2(w/2)}" fill="url(#c119-сталь)"/></g>`; };
  /* огонёк свободной связи */
  const огонёк = (x,y,м,красный,i) => `<circle cx="${ф2(x)}" cy="${ф2(y)}" r="${ф2(8*м)}" fill="url(#c119-${красный?'тревога':'огонёк'})">${ДВ()?`<animate attributeName="r" values="${ф2(6*м)};${ф2(9.5*м)};${ф2(6*м)}" dur="${(1.3+(i||0)%3*0.2).toFixed(1)}s" repeatCount="indefinite"/>`:''}</circle>
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
  const подставка = (x,y,ш) => `<ellipse cx="${x}" cy="${y}" rx="${ш}" ry="${ш*0.2}" fill="url(#c119-пад)"/>
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
    SO2:[['S'],['O',0,200,2],['O',0,340,2]],
    MgO:[['Mg'],['O',0,0,2]], H2S:[['S'],['H',0,210,1],['H',0,330,1]]
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
      if(о.клик&&!отм) верх+=`<circle cx="${ф2(X)}" cy="${ф2(Y)}" r="${ф2(p.r+5)}" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r119ат(${i})"/>`;
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
    <path d="M${ф2(x-ш/2)} ${y} L${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)} L${ф2(x+ш/2)} ${y} Z" fill="url(#c119-корпус)"/>
    <path d="M${ф2(x-ш/2+6)} ${y-30} H${ф2(x+ш/2-6)}" stroke="#fff" stroke-opacity=".25" stroke-width="1"/>
    ${табло(x-ш*0.08,y-25,ф2(ш*0.56),показ,{в:18,кегль:11})}
    <circle cx="${ф2(x+ш*0.3)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/><circle cx="${ф2(x+ш*0.38)}" cy="${y-16}" r="3.4" fill="#2a3038" stroke="#6a7480" stroke-width=".8"/>
    <rect x="${x-5}" y="${y-38}" width="10" height="8" fill="url(#c119-стальВ)"/>
    <ellipse cx="${x}" cy="${y-39}" rx="${ф2(ш*0.4)}" ry="5.5" fill="url(#c119-сталь)"/><ellipse cx="${x}" cy="${y-40.5}" rx="${ф2(ш*0.36)}" ry="3.6" fill="#dfe4ea" opacity=".55"/>`;

  /* ---------- рычажные весы: содержимое чаш — функции (cx, верх чаши) ---------- */
  const коромысло = (угол,левое,правое,опц) => { const о=опц||{}, px=168, py=о.py||100, h=104;
    const t=рад(угол), lx=px-h*Math.cos(t), ly=py-h*Math.sin(t), rx=px+h*Math.cos(t), ry=py+h*Math.sin(t), низ=о.низ||250;
    const чаша=(cx,cy,f)=>{ const yп=cy+62;
      return `<path d="M${ф2(cx)} ${ф2(cy)} L${ф2(cx-44)} ${ф2(yп-4)} M${ф2(cx)} ${ф2(cy)} L${ф2(cx+44)} ${ф2(yп-4)}" stroke="#c8ced6" stroke-width=".9" opacity=".75"/>
        <circle cx="${ф2(cx)}" cy="${ф2(cy)}" r="3.4" fill="none" stroke="url(#c119-латунь)" stroke-width="1.8"/>
        <ellipse cx="${ф2(cx)}" cy="${ф2(yп-4)}" rx="48" ry="5" fill="#3a2a0a" opacity=".6"/>${f(cx,yп-4)}
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+20)} ${ф2(cx+50)} ${ф2(yп-4)} Z" fill="url(#c119-чаша)"/>
        <path d="M${ф2(cx-50)} ${ф2(yп-4)} Q${ф2(cx)} ${ф2(yп+3)} ${ф2(cx+50)} ${ф2(yп-4)}" stroke="#fff3c8" stroke-width="1.4" fill="none" opacity=".7"/>
        <ellipse cx="${ф2(cx-20)}" cy="${ф2(yп+3)}" rx="16" ry="2.4" fill="#fff" opacity=".22"/>`; };
    return `<path d="M${px-48} ${низ} L${px+48} ${низ} L${px+32} ${низ-12} L${px-32} ${низ-12} Z" fill="#2a3038"/><rect x="${px-40}" y="${низ-4}" width="80" height="6" rx="2" fill="#1a1e24"/>
      <rect x="${px-5}" y="${py}" width="10" height="${низ-12-py}" fill="url(#c119-стальВ)"/>
      <rect x="${px-18}" y="${py+44}" width="36" height="18" rx="3" fill="#f2ead8" stroke="#8a7a5a" stroke-width=".8"/>
      ${[-12,-6,0,6,12].map(g=>`<path d="M${ф2(px+Math.sin(рад(g))*50)} ${ф2(py+Math.cos(рад(g))*50)} L${ф2(px+Math.sin(рад(g))*57)} ${ф2(py+Math.cos(рад(g))*57)}" stroke="${g===0?'#2a8a4a':'#5a4a30'}" stroke-width="${g===0?2:1}"/>`).join('')}
      ${о.замок?`<rect x="${px-74}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/><rect x="${px+68}" y="${py+4}" width="6" height="14" rx="2" fill="#c8402a"/>`:''}
      <g transform="rotate(${ф2(угол)} ${px} ${py})">
        <path d="M${px} ${py} L${px} ${py+56}" stroke="#c8402a" stroke-width="1.8"/>
        <rect x="${px-h}" y="${py-3.5}" width="${2*h}" height="7" rx="3.5" fill="url(#c119-латунь)"/>
        <path d="M${px-14} ${py-3.5} L${px} ${py-12} L${px+14} ${py-3.5} Z" fill="url(#c119-латунь)"/>
      </g>
      <circle cx="${px}" cy="${py}" r="5.5" fill="url(#c119-стальВ)" stroke="#2a3038" stroke-width=".8"/>
      ${чаша(lx,ly,левое)}${чаша(rx,ry,правое)}`; };
  /* золотые гирьки-эталоны: n штук рядами по 10, (cx, y) — опора */
  const эталоны = (cx,y,n) => { let s=''; const целых=Math.floor(n), пол=n-целых>0;
    for(let i=0;i<целых+(пол?1:0);i++){ const ряд=Math.floor(i/10), j=i%10, вРяду=Math.min(10,целых+(пол?1:0)-ряд*10), x=cx+(j-(вРяду-1)/2)*6.2-2.7, yy=y-6-ряд*6.2;
      const ш=(пол&&i===целых)?2.7:5.4;
      s+=`<rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="5.4" rx=".8" fill="url(#c119-латунь)"/><rect x="${ф2(x)}" y="${ф2(yy)}" width="${ш}" height="1.2" fill="#fff6d0" opacity=".7"/>`; }
    return s; };
  /* ---------- воздушный шарик ---------- */
  let шкN=0;
  const шарик = (x,y,цв,надпись,м) => { const k=м||1, R=34*k, ид='c119-шк'+(++шкN);
    return `<g>
      <radialGradient id="${ид}" cx=".34" cy=".28" r=".85"><stop offset="0" stop-color="#fff"/><stop offset=".2" stop-color="${цв}"/><stop offset=".85" stop-color="${цв}"/><stop offset="1" stop-color="#000" stop-opacity=".7"/></radialGradient>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#${ид})"/>
      <path d="M${x} ${ф2(y-R*1.1)} C${ф2(x+R)} ${ф2(y-R*1.1)} ${ф2(x+R)} ${ф2(y+R*0.4)} ${x} ${ф2(y+R*1.1)} C${ф2(x-R)} ${ф2(y+R*0.4)} ${ф2(x-R)} ${ф2(y-R*1.1)} ${x} ${ф2(y-R*1.1)} Z" fill="url(#c119-объём)" opacity=".7"/>
      <ellipse cx="${ф2(x-R*0.38)}" cy="${ф2(y-R*0.5)}" rx="${ф2(R*0.2)}" ry="${ф2(R*0.34)}" transform="rotate(25 ${ф2(x-R*0.38)} ${ф2(y-R*0.5)})" fill="url(#c119-блик)"/>
      <path d="M${ф2(x-4*k)} ${ф2(y+R*1.1+6*k)} L${x} ${ф2(y+R*1.1-1)} L${ф2(x+4*k)} ${ф2(y+R*1.1+6*k)} Z" fill="${цв}"/>
      ${надпись?`<text x="${x}" y="${ф2(y+5*k)}" text-anchor="middle" font-size="${ф2(16*k)}" font-weight="bold" fill="#fff" stroke="rgba(0,0,0,.35)" stroke-width="2" paint-order="stroke" font-family="${ШР}">${esc(надпись)}</text>`:''}
    </g>`; };

  /* ---------- объёмный «пирог масс»: ломтик на каждый атом, ширина ∝ Ar ---------- */
  const пирог = (cx,cy,R,ч,выд,опц) => { const о=опц||{}, ry=R*0.42, h=о.h||16, m=Mr(ч);
    const ломти=[]; ч.forEach(([e,n])=>{ for(let i=0;i<n;i++) ломти.push({e:e, доля:АР[e]/m}); });
    let a=-Math.PI/2; ломти.forEach(л=>{ л.a0=a; a+=л.доля*2*Math.PI; л.a1=a; });
    const P=(t,dx,dy)=>[cx+dx+R*Math.cos(t), cy+dy+ry*Math.sin(t)];
    const pt=(p)=>ф2(p[0])+' '+ф2(p[1]);
    let бока='', верх='', подп='';
    ломти.forEach(л=>{ const вы=л.e===выд, mid=(л.a0+л.a1)/2, dx=вы?Math.cos(mid)*13:0, dy=вы?Math.sin(mid)*13*0.42:0;
      const b0=Math.max(л.a0,0), b1=Math.min(л.a1,Math.PI);
      if(b1>b0){ const p0=P(b0,dx,dy), p1=P(b1,dx,dy);
        бока+=`<path d="M${pt(p0)} A${R} ${ф2(ry)} 0 0 1 ${pt(p1)} L${ф2(p1[0])} ${ф2(p1[1]+h)} A${R} ${ф2(ry)} 0 0 0 ${ф2(p0[0])} ${ф2(p0[1]+h)} Z" fill="url(#c119-бок-${л.e})"/>`; }
      if(вы){ [л.a0,л.a1].forEach(t=>{ if(Math.sin(t)>-0.2){ const p=P(t,dx,dy); бока+=`<path d="M${ф2(cx+dx)} ${ф2(cy+dy)} L${pt(p)} L${ф2(p[0])} ${ф2(p[1]+h)} L${ф2(cx+dx)} ${ф2(cy+dy+h)} Z" fill="url(#c119-бок-${л.e})" opacity=".9"/>`; } }); }
      const q0=P(л.a0,dx,dy), q1=P(л.a1,dx,dy), big=(л.a1-л.a0)>Math.PI?1:0;
      верх+=`<path d="M${ф2(cx+dx)} ${ф2(cy+dy)} L${pt(q0)} A${R} ${ф2(ry)} 0 ${big} 1 ${pt(q1)} Z" fill="url(#c119-пир-${л.e})" stroke="#fff" stroke-opacity="${вы?.9:.45}" stroke-width="${вы?1.4:.8}"/>`; });
    /* подписи по элементам */
    const эл=[...new Set(ломти.map(л=>л.e))];
    эл.forEach(e=>{ const мои=ломти.filter(л=>л.e===e), a0=мои[0].a0, a1=мои[мои.length-1].a1, mid=(a0+a1)/2, вы=e===выд;
      const lx=cx+Math.cos(mid)*(R+(вы?40:30)), ly=cy+Math.sin(mid)*(ry+(вы?30:24))+(Math.sin(mid)>0?h:0);
      подп+=метка(lx,ly-12,e+' · '+ок1(ω(ч,e))+' %',вы?GOLD:'#6a7480',{кегль:вы?12:10}); });
    return `<ellipse cx="${cx}" cy="${ф2(cy+h+6)}" rx="${R+10}" ry="${ф2(ry+8)}" fill="#000" opacity=".45" filter="url(#рл-мягко)"/>` + бока + верх +
      `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="${ф2(ry)}" fill="url(#c119-глянец)" pointer-events="none"/>` + подп; };

  /* ---------- мерный цилиндр с долей ---------- */
  const цилиндрω = (cx,yT,yB,ш,доля,цв,опц) => { const о=опц||{}, H=yB-yT, уровень=yB-H*Math.max(0,Math.min(100,доля))/100, l=cx-ш/2, r=cx+ш/2;
    let шк=''; for(let v=0;v<=100;v+=10){ const y=yB-H*v/100; шк+=`<path d="M${l+2} ${ф2(y)} H${l+(v%50?10:16)}" stroke="#e8ecf0" stroke-width="${v%50?.8:1.3}" opacity=".85"/>`+(v%20===0||v===50?`<text x="${l+19}" y="${ф2(y+3.5)}" font-size="9" font-weight="bold" fill="#e8ecf0" opacity=".9" font-family="${ШР}">${v}</text>`:''); }
    for(let v=5;v<100;v+=10){ const y=yB-H*v/100; шк+=`<path d="M${l+2} ${ф2(y)} H${l+6}" stroke="#e8ecf0" stroke-width=".6" opacity=".6"/>`; }
    return `<ellipse cx="${cx}" cy="${yB+14}" rx="${ш*0.85}" ry="7" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <path d="M${l-14} ${yB+12} Q${cx} ${yB+20} ${r+14} ${yB+12} L${r+10} ${yB+4} H${l-10} Z" fill="url(#c119-стекло-основа)"/>
      <rect x="${l}" y="${yT}" width="${ш}" height="${H+4}" rx="4" fill="rgba(200,225,240,.10)"/>
      <rect x="${l+1.5}" y="${ф2(уровень)}" width="${ш-3}" height="${ф2(yB-уровень+2)}" fill="${цв}" opacity=".88"/>
      <rect x="${l+1.5}" y="${ф2(уровень)}" width="${ш-3}" height="${ф2(yB-уровень+2)}" fill="url(#c119-жидкость)"/>
      ${доля>0.5?`<ellipse cx="${cx}" cy="${ф2(уровень)}" rx="${ф2(ш/2-1.5)}" ry="3.2" fill="${цв}"/><ellipse cx="${cx}" cy="${ф2(уровень)}" rx="${ф2(ш/2-1.5)}" ry="3.2" fill="#fff" opacity=".35"/>`:''}
      ${шк}
      <rect x="${l}" y="${yT}" width="${ш}" height="${H+4}" rx="4" fill="none" stroke="#c8dcea" stroke-opacity=".7" stroke-width="1.4"/>
      <rect x="${r-12}" y="${yT+6}" width="5" height="${H-12}" rx="2.5" fill="#fff" opacity=".22"/>
      <rect x="${l+4}" y="${yT+6}" width="2" height="${H-12}" rx="1" fill="#fff" opacity=".12"/>
      <path d="M${l-4} ${yT} Q${l-6} ${yT-4} ${l} ${yT-4} H${r+3} Q${r+8} ${yT-4} ${r+4} ${yT+2}" stroke="#c8dcea" stroke-opacity=".8" stroke-width="2" fill="none"/>
      ${о.истина!=null?`<path d="M${l-12} ${ф2(yB-H*о.истина/100)} H${r+12}" stroke="${GOLD}" stroke-width="2" stroke-dasharray="5 3"/>`:''}`; };

  /* ---------- руды железа ---------- */
  const РОД = {гематит:['#7a2a20','#2a0e0a','#c8504a'], пирит:['#e8c860','#7a5a10','#fff4b0'], магнетит:['#4a4e56','#0e1014','#c8d0dc'], сидерит:['#b8875a','#5a3a1a','#e8c8a0'], вюстит:['#3a3a3a','#141414','#7a7a7a']};
  const руда = (x,y,ш,вид,i) => { const [c1,c2,c3]=РОД[вид], h=ш*0.62, ид='c119-р'+i;
    const точки=[[-0.5,0],[-0.46,-0.42],[-0.22,-0.8],[0.08,-0.95],[0.36,-0.74],[0.5,-0.36],[0.48,0]].map(([a,b])=>[x+a*ш,y+b*h]);
    let d='M'+точки.map(p=>ф2(p[0])+' '+ф2(p[1])).join(' L')+' Z';
    let деталь='';
    if(вид==='пирит') [[-0.18,-0.42,0.3],[0.12,-0.6,0.24],[0.24,-0.22,0.2]].forEach(([a,b,s0])=>{ const X=x+a*ш, Y=y+b*h, S=s0*ш;
      деталь+=`<path d="M${ф2(X)} ${ф2(Y)} l${ф2(S*0.5)} ${ф2(-S*0.28)} l${ф2(S*0.5)} ${ф2(S*0.28)} l${ф2(-S*0.5)} ${ф2(S*0.28)} Z" fill="#fff6c0"/><path d="M${ф2(X)} ${ф2(Y)} l${ф2(S*0.5)} ${ф2(S*0.28)} v${ф2(S*0.5)} l${ф2(-S*0.5)} ${ф2(-S*0.28)} Z" fill="#c8a030"/><path d="M${ф2(X+S*0.5)} ${ф2(Y+S*0.28)} l${ф2(S*0.5)} ${ф2(-S*0.28)} v${ф2(S*0.5)} l${ф2(-S*0.5)} ${ф2(S*0.28)} Z" fill="#a07a18"/>`; });
    if(вид==='магнетит') [[-0.12,-0.5,0.26],[0.2,-0.66,0.2]].forEach(([a,b,s0])=>{ const X=x+a*ш, Y=y+b*h, S=s0*ш;
      деталь+=`<path d="M${ф2(X)} ${ф2(Y-S*0.6)} L${ф2(X+S*0.5)} ${ф2(Y)} L${ф2(X)} ${ф2(Y+S*0.6)} L${ф2(X-S*0.5)} ${ф2(Y)} Z" fill="#2a2e34"/><path d="M${ф2(X)} ${ф2(Y-S*0.6)} L${ф2(X+S*0.5)} ${ф2(Y)} L${ф2(X)} ${ф2(Y)} Z" fill="#dce4ee" opacity=".7"/><path d="M${ф2(X)} ${ф2(Y-S*0.6)} L${ф2(X-S*0.5)} ${ф2(Y)} L${ф2(X)} ${ф2(Y)} Z" fill="#6a7480"/>`; });
    if(вид==='сидерит') [[-0.25,-0.5],[0.05,-0.7],[0.22,-0.35]].forEach(([a,b])=>{ const X=x+a*ш, Y=y+b*h; деталь+=`<path d="M${ф2(X)} ${ф2(Y)} l7 -5 l6 6 l-7 5 Z" fill="#e8c8a0" opacity=".75"/>`; });
    if(вид==='гематит') деталь+=`<path d="M${ф2(x-ш*0.3)} ${ф2(y-h*0.5)} Q${ф2(x)} ${ф2(y-h*0.9)} ${ф2(x+ш*0.3)} ${ф2(y-h*0.55)}" stroke="#d8d8e0" stroke-width="2" fill="none" opacity=".45"/>`;
    const крап=Array.from({length:10},(_,k)=>{ const a=((k*37+i*11)%100)/100-0.5, b=-((k*53+i*7)%90)/100; return `<circle cx="${ф2(x+a*ш*0.8)}" cy="${ф2(y+b*h*0.9)}" r="${(0.6+(k%3)*0.4).toFixed(1)}" fill="${c3}" opacity=".5"/>`; }).join('');
    return `<ellipse cx="${x}" cy="${y+2}" rx="${ф2(ш*0.56)}" ry="4" fill="#000" opacity=".5" filter="url(#рл-мягко)"/>
      <linearGradient id="${ид}" x1="0" y1="0" x2=".7" y2="1"><stop offset="0" stop-color="${c3}" stop-opacity=".9"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <path d="${d}" fill="url(#${ид})" stroke="${c2}" stroke-width=".8"/>
      <path d="M${ф2(точки[1][0])} ${ф2(точки[1][1])} L${ф2(точки[2][0])} ${ф2(точки[2][1])} L${ф2(точки[3][0])} ${ф2(точки[3][1])}" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" fill="none"/>
      ${крап}${деталь}`; };

  /* ---------- огород ---------- */
  const растение = (x,y,k,сост,i) => { const H=26+34*k, цвЛ=сост==='много'?'#a8862a':сост==='мало'?'#a8c46a':'#2e9a3e', цвС=сост==='много'?'#7a5a1a':'#3a7a2a', наклон=сост==='много'?18:сост==='мало'?6:0;
    const лист=(t,сторона)=>{ const ly=y-H*t, L=(10+12*k)*(сост==='мало'?0.7:1), ug=(сторона>0?-28:28)+(сост==='много'?сторона*40:0);
      return `<path d="M${x} ${ф2(ly)} q${ф2(сторона*L*0.5)} ${ф2(-L*0.5+(сост==='много'?L*0.5:0))} ${ф2(сторона*L)} ${ф2(сост==='много'?L*0.4:-L*0.2)} q${ф2(-сторона*L*0.4)} ${ф2(L*0.3)} ${ф2(-сторона*L)} ${ф2(сост==='много'?-L*0.4:L*0.2)} Z" fill="${цвЛ}" stroke="${цвС}" stroke-width=".6"/>`; };
    return `<g transform="rotate(${(i%2?1:-1)*наклон*0.5} ${x} ${y})"><path d="M${x} ${y} Q${x+(i%2?3:-3)} ${ф2(y-H*0.5)} ${x} ${ф2(y-H)}" stroke="${цвС}" stroke-width="${ф2(1.6+k)}" fill="none"/>
      ${лист(0.35,-1)}${лист(0.55,1)}${лист(0.78,-1)}${k>0.8&&сост==='норма'?`<circle cx="${x}" cy="${ф2(y-H-3)}" r="4" fill="#ffd76a"/><circle cx="${x}" cy="${ф2(y-H-3)}" r="1.8" fill="#c87a1a"/>`:''}</g>`; };
  const грядка = (x0,x1,y,сост,k) => { let s=`<path d="M${x0} ${y} Q${(x0+x1)/2} ${y-12} ${x1} ${y} L${x1+6} ${y+16} H${x0-6} Z" fill="url(#c119-почва)"/>`;
    for(let i=0;i<14;i++) s+=`<circle cx="${ф2(x0+(i*37%(x1-x0)))}" cy="${ф2(y+3+(i*13%10))}" r="${(0.8+i%3*0.5).toFixed(1)}" fill="#8a6a4a" opacity=".6"/>`;
    for(let i=0;i<5;i++) s+=растение(x0+12+i*(x1-x0-24)/4, y-4, k, сост, i);
    return s; };
  const мешок = (x,y,кг,У) => { const k=0.85+0.5*Math.min(1,кг/МАКС_КГ), ш=56*k, h=74*k;
    return `<g><path d="M${ф2(x-ш/2)} ${y} Q${ф2(x-ш/2-6)} ${ф2(y-h*0.5)} ${ф2(x-ш/2+4)} ${ф2(y-h)} L${ф2(x-6)} ${ф2(y-h-8)} L${ф2(x+6)} ${ф2(y-h-8)} L${ф2(x+ш/2-4)} ${ф2(y-h)} Q${ф2(x+ш/2+6)} ${ф2(y-h*0.5)} ${ф2(x+ш/2)} ${y} Z" fill="${У.цв}" stroke="#a8a090" stroke-width="1"/>
      <path d="M${ф2(x-ш/2+4)} ${ф2(y-h)} Q${x} ${ф2(y-h+6)} ${ф2(x+ш/2-4)} ${ф2(y-h)}" stroke="#a8a090" fill="none"/>
      <path d="M${ф2(x-7)} ${ф2(y-h-7)} H${ф2(x+7)}" stroke="#7a6a4a" stroke-width="2.4"/>
      <rect x="${ф2(x-ш/2+5)}" y="${ф2(y-h*0.7)}" width="${ф2(ш-10)}" height="${ф2(h*0.42)}" rx="2" fill="#2e7a3e"/>
      ${тА(x,ф2(y-h*0.5),У.ф,ф2(8.5*k+1),'#fff')}${тА(x,ф2(y-h*0.36),'N '+ок1(ω(У.ч,'N'))+' %',ф2(7.5*k+1),'#ffd76a')}
      <path d="M${ф2(x-ш/2+3)} ${ф2(y-h*0.9)} Q${ф2(x-ш/2+1)} ${ф2(y-h*0.4)} ${ф2(x-ш/2+3)} ${ф2(y-4)}" stroke="#fff" stroke-opacity=".5" stroke-width="2" fill="none"/></g>`; };

  /* ---------- ползунок ---------- */
  const ПОЛЗУН = (ключ,min,max,шаг,v,подпись,ед) => `<div class="пульт-ползун" data-anim style="--i:3">
      <div class="шапка-п"><span>${подпись}</span><b id="c119-в-${ключ}">${ч2(v)}${ед}</b></div>
      <button type="button" onclick="r119шаг('${ключ}',-1)">−</button>
      <input class="ползун" id="c119-п-${ключ}" type="range" min="${min}" max="${max}" step="${шаг}" value="${v}" oninput="r119пол('${ключ}',this.value)" onchange="r119отпуск(this)" aria-label="${подпись}">
      <button type="button" onclick="r119шаг('${ключ}',1)">+</button></div>`;

  /* ================= КАДРЫ ================= */

  /* 1. Карточка */
  function F1(s){
    const Н=250, y0=214, Л=L_(), к=s.вк1==null?0:s.вк1, вид=s.видвк1||{0:true}, все=ВКЛАДКИ.every((x,i)=>вид[i]), в=s.ответ1, ок=в===0;
    const ч=[['Fe',2],['O',3]];
    const пр = руда(52,y0+16,64,'гематит',0) + руда(290,y0+16,58,'пирит',1);
    const поверх = пирог(168,108,96,ч,'Fe',{h:16}) + формулаВ(168,30,[['Fe',2,''],['O',3,'']],24) + тА(168,206,'ω(Fe) = 112 : 160 = 70 %',12,GOLD);
    return ЖУРНАЛ(s) + ШАПКА('Карточка работы','Массовая доля элемента') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,пр,поверх),Н)}</div>` +
      `<div class="вкладки" data-anim style="--i:3">${ВКЛАДКИ.map((x,i)=>`<button type="button" class="${к===i?'вкл':''}${вид[i]?' был':''}${i===4?' опасно':''}" onclick="r119вк(${i})">${x[0]}</button>`).join('')}</div>` +
      A(4,'карт теория'+(к===4?' опасно':''),'<span class="метка">'+ВКЛАДКИ[к][0]+'</span><div class="текст" style="font-size:18px">'+ВКЛАДКИ[к][1]+'</div>') +
      (!все ? СКАЗ('Прочитай','Открой все пять вкладок.') :
        ОТВЕТЫ('',['какая часть массы вещества приходится на элемент','сколько атомов элемента в молекуле'],0,в,1) +
        (в==null ? СКАЗ('Вопрос','Что показывает массовая доля элемента?') :
          РАЗБОР(ок,['Верно: ω — доля массы.','Число атомов показывает индекс. ω — доля <b>массы</b>: тяжёлый атом весит больше лёгкого.'][в]))) +
      (ок ? ПРАВИЛО('<b>ω(Э) = Ar(Э) × индекс : Mr × 100 %</b>') : '');
  }

  /* 2. Пирог масс */
  function F2(s){
    const Н=286, к=s.п2==null?0:s.п2, П=ПИРОГИ[к], вид=s.вид2||{}, видено=Object.keys(вид).length, в=s.ответ2, ок=в===0;
    const эл=П.ч.map(x=>x[0]), выд=эл.includes(s.э2)?s.э2:эл[эл.length-1];
    const тело = L_().студия(Н,280) + подставка(70,120,46) + модель(70,72,0.72,П.м,{клик:true}) +
      формулаВ(250,52,П.ч.map(([e,n])=>[e,n,ч2(АР[e])]),30,{цвета:П.ч.map(([e])=>e===выд?GOLD:ИНК)}) + тА(250,74,'Mr = '+расчёт(П.ч),10,'#c8ced6') +
      пирог(168,190,112,П.ч,выд,{h:18});
    return ЖУРНАЛ(s) + ШАПКА('Шаг 1','Пирог масс') +
      `<div class="pic тёмная">${свгК(тело,Н)}</div>` +
      `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(4,minmax(0,1fr))">${ПИРОГИ.map((x,i)=>BTN(3,(к===i?'вкл':'')+(вид[i]?' был':''),'<span style="font-size:16px">'+формула(x.ч)+'</span>','r119п('+i+')')).join('')}</div>` +
      `<div class="атомы" data-anim style="--i:4;grid-template-columns:repeat(${эл.length},minmax(0,1fr))">${эл.map(e=>`<button type="button" class="${e===выд?'вкл':''}" onclick="r119э('${e}')">${e} · ${ок1(ω(П.ч,e))} %</button>`).join('')}</div>` +
      A(5,'карт','<span class="метка">'+П.имя+' · ω('+выд+')</span><div class="текст">Масса атомов '+выд+': '+числитель(П.ч,выд)+'. Вся молекула: '+ч2(Mr(П.ч))+'. ω('+выд+') = '+ч2(масЭ(П.ч,выд))+' : '+ч2(Mr(П.ч))+' ≈ <b>'+ок1(ω(П.ч,выд))+' %</b>.</div>') +
      (видено<5 ? СКАЗ('Исследуй','Разрежь хотя бы пять «пирогов». Нажми на атом модели или на элемент — его ломтики выдвинутся. Каждый ломтик — один атом, ширина — его Ar.') :
        ОТВЕТЫ('',['атом водорода очень лёгкий: Ar = 1','водород — газ'],0,в,2) + (в==null ? СКАЗ('Вопрос','В воде два атома водорода из трёх, а по массе водорода всего 11 %. Почему?') :
          РАЗБОР(ок,['Верно: 2 × 1 = 2 из 18 — тонкие ломтики.','Агрегатное состояние ни при чём: дело в массе атома — Ar(H) = 1, а Ar(O) = 16.'][в]))) +
      (ок ? ТЕОРИЯ('массовая доля','<b>ω(Э) = Ar(Э) × n : Mr × 100 %</b>, где n — индекс. Доля зависит не от числа атомов, а от их <b>массы</b>. Сумма долей всех элементов — 100 %.') : '');
  }

  /* 3. Прицел ω: сцена живого цилиндра */
  function сцена3(s){
    const Н=272, n=Math.min(s.ц3||0,ПРИЦЕЛ.length-1), Ц=ПРИЦЕЛ[n], ок=!!s.ок3, v=s.пол3==null?50:s.пол3, w=ω(Ц.ч,Ц.e), цв=(ПАЛ[Ц.e]||ПАЛ.C)[0];
    const цвЖ = Ц.e==='H'?'#9ad8ff':цв;
    return L_().студия(Н,256) + подставка(74,206,52) + модель(74,140,0.78,Ц.м) +
      формулаВ(74,56,Ц.ч.map(([e,n0])=>[e,n0,ч2(АР[e])]),30,{цвета:Ц.ч.map(([e])=>e===Ц.e?GOLD:ИНК)}) + тА(74,80,'ω('+Ц.e+') = ?',13,'#c8ced6') +
      цилиндрω(214,26,236,64,v,цвЖ,{истина:ок?w:null}) +
      метка(296,Math.max(4,Math.min(214,236-210*v/100-12)),ч2(v)+' %',ок?ЗЕ:ЗЛ,{кегль:12}) +
      (ок?метка(296,Math.max(4,Math.min(240,236-210*w/100+8)),'точно '+ок1(w)+' %',ЗЛ,{кегль:10}):'') +
      метка(214,250,ок?'в цель!':'налей на глаз',ок?ЗЕ:'#6a7480',{кегль:10});
  }
  function F3(s){
    const n=Math.min(s.ц3||0,ПРИЦЕЛ.length-1), Ц=ПРИЦЕЛ[n], ок=!!s.ок3, отз=s.отз3, готовых=n+(ок?1:0), все=готовых>=ПРИЦЕЛ.length, v=s.пол3==null?50:s.пол3;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 2','Прицел ω') +
      `<div class="pic тёмная" id="c119-ж-пол3">${свгЛ(сцена3(s),272)}</div>` +
      ТОЧКИ(ПРИЦЕЛ.length,все?-1:n,готовых) +
      (ок ? '' : ПОЗУН_ИЛИ(s,'пол3',0,100,1,v,'Доля '+Ц.e,' %') + `<div class="ask">${BTN(5,'','Проверить прицел',"r119пров3()")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Задание','Оцени на глаз, какую часть массы '+формула(Ц.ч)+' составляет '+Ц.e+', и налей ползунком столько в цилиндр. Над символами — Ar. Можно ошибиться не больше чем на '+ДОПУСК+' %.')) +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая цель →',"r119ц3дальше()")}</div>` : '') +
      (все ? ПРАВИЛО('Прикидка: 12 из 44 — чуть больше четверти; 16 из 18 — почти всё.') : '');
  }
  const ПОЗУН_ИЛИ = (s,ключ,min,max,шаг,v,подпись,ед) => ПОЛЗУН(ключ,min,max,шаг,v,подпись,ед);

  /* 4. Калькулятор ω */
  const ВАР4 = (Р,ш,k) => { const ч=Р.ч, e=Р.e, A=АР[e], n=кол(ч,e), m=Mr(ч), w=ω(ч,e);
    const набор = ш===0 ? (n>1?[A*n, A, A+n]:[A, A*2, A+16]) : ш===1 ? [m, m-A*n, m+16] : [w, 100-w, n>1?A/m*100:w/2];
    const сдв=k%3; return набор.map((_,i)=>набор[(i+сдв)%3]); };
  function F4(s){
    const Н=236, n=Math.min(s.к4||0,РАСЧЁТЫ.length-1), Р=РАСЧЁТЫ[n], ш=s.ш4||0, ок=!!s.ок4, отз=s.отз4, готовых=n+(ок?1:0), все=готовых>=РАСЧЁТЫ.length;
    const ч=Р.ч, e=Р.e, w=ω(ч,e), m=Mr(ч), mэ=масЭ(ч,e);
    const ящ=(x,y,ш0,т0,активно,цв)=>`<rect x="${ф2(x-ш0/2)}" y="${y}" width="${ш0}" height="34" rx="8" fill="${активно?'rgba(255,215,106,.18)':'rgba(12,14,18,.7)'}" stroke="${активно?GOLD:цв}" stroke-width="${активно?2:1.2}"/>`+тА(x,y+23,т0,15,активно?GOLD:'#eef2f6');
    const полоса = ок||ш>2 ? w : 0;
    const тело = L_().студия(Н,236) + формулаВ(168,40,ч.map(([el,k])=>[el,k,ч2(АР[el])]),30,{цвета:ч.map(([el])=>el===e?GOLD:ИНК)}) +
      тА(40,104,'ω('+e+') =',15,'#eef2f6') +
      ящ(146,70,128,ш>0||ок?'m('+e+') = '+ч2(mэ):(кол(ч,e)>1?кол(ч,e)+' × '+ч2(АР[e])+' = ?':'Ar('+e+') = ?'),ш===0&&!ок,'#6a7480') +
      `<path d="M80 109 H212" stroke="#eef2f6" stroke-width="2"/>` +
      ящ(146,116,128,ш>1||ок?'Mr = '+ч2(m):'Mr = ?',ш===1&&!ок,'#6a7480') +
      тА(282,80,'× 100 % =',12,'#c8ced6') + ящ(282,90,84,ок?ок1(w)+' %':'?',ш===2&&!ок,'#6a7480') +
      `<rect x="24" y="176" width="288" height="22" rx="11" fill="#14171b" stroke="#3a4048"/>` +
      `<rect x="24" y="176" width="${ф2(288*полоса/100)}" height="22" rx="11" fill="url(#c119-бок-${e})"/>` +
      (ок?тА(ф2(Math.max(60,24+288*полоса/100-34)),192,ок1(w)+' %',12,'#fff'):'') + тА(168,220,ок?'остальное — '+ок1(100-w)+' %: другие элементы':'шкала 100 % — вся масса вещества',10,'#9aa3ad');
    const ВАР = ок?[]:ВАР4(Р,ш,n+ш);
    const фмт=(v)=>ш===2?ок1(v)+' %':ч2(v);
    return ЖУРНАЛ(s) + ШАПКА('Шаг 3','Калькулятор ω') +
      `<div class="pic тёмная">${свгЛ(тело,Н)}</div>` +
      ТОЧКИ(РАСЧЁТЫ.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Расчёт '+(n+1)+' из 5 · '+Р.имя+'</span><div class="текст">'+(ок?'ω('+e+') = '+ч2(mэ)+' : '+ч2(m)+' × 100 % ≈ <b>'+ок1(w)+' %</b>.':['Шаг 1: масса всех атомов '+e+' в молекуле.','Шаг 2: Mr всей молекулы.','Шаг 3: доля — раздели и умножь на 100 %.'][ш])+'</div>') +
      (ок ? '' : `<div class="ask три">${ВАР.map((v,j)=>BTN(4+j,отз&&!отз.ок&&отз.j===j?'miss':'',фмт(v),"r119к("+j+")")).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующий расчёт →',"r119кдальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('алгоритм','1) m(Э) = Ar × индекс. 2) Mr — сумма всех Ar. 3) ω = m(Э) : Mr × 100 %. Проверка: доли всех элементов в сумме дают 100 %.') : '');
  }

  /* 5. Рудник */
  function F5(s){
    const Н=290, y0=262, ряд=s.ряд5||[], раскр=s.раскр5||{}, ок=ряд.length>=РУДЫ.length, отз=s.отз5;
    const xs=[40,104,168,232,296];
    let тело = L_().студия(Н,y0);
    /* пьедестал */
    for(let k=0;k<5;k++){ const x=xs[k], i=ряд[k], hh=[64,54,46,38,30][k];
      тело += `<rect x="${x-28}" y="${150-hh}" width="56" height="${hh}" rx="4" fill="url(#c119-пьедестал)" stroke="#5a4a30" stroke-width=".8"/>` + тА(x,150-hh+18,k+1,15,'#3a2a10');
      if(i!=null){ const Р=РУДЫ[i]; тело += руда(x,150-hh,40,Р.вид,i+10) + тА(x,150-hh-32,Р.имя,9,'#eef2f6') + тА(x,150-hh-20,ок1(ω(Р.ч,'Fe'))+' %',10,GOLD); } }
    тело += тА(168,170,'богаче ← → беднее',10,'#9aa3ad');
    /* руды на столе */
    РУДЫ.forEach((Р,i)=>{ const x=xs[i], на=ряд.includes(i);
      тело += `<g opacity="${на?.25:1}">${руда(x,y0+6,52,Р.вид,i)}</g>` + тА(x,y0+24,формула(Р.ч),10,'#c8ced6') +
        (раскр[i]&&!на?метка(x,y0-48,ок1(ω(Р.ч,'Fe'))+' %',ЗЛ,{кегль:9}):'') +
        (!на&&!ок?`<rect x="${x-30}" y="${y0-40}" width="60" height="70" fill="#fff" fill-opacity="0" pointer-events="all" style="cursor:pointer" onclick="r119руда(${i})"/>`:''); });
    return ЖУРНАЛ(s) + ШАПКА('Шаг 4','Рудник') +
      `<div class="pic тёмная">${свгК(тело,Н)}</div>` +
      (ок ? '' : `<div class="ряд" data-anim style="--i:3;grid-template-columns:repeat(3,minmax(0,1fr))">${РУДЫ.map((Р,i)=>ряд.includes(i)?'':BTN(3,'','<span style="font-size:14px">'+Р.имя+'<br>'+формула(Р.ч)+'</span>','r119руда('+i+')')).join('')}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : СКАЗ('Задание','Металлургам нужна руда, где больше железа. Ставь руды на пьедестал по порядку: сначала самую богатую — с наибольшей ω(Fe). Считай ω по формуле.')) +
      (ок ? ТЕОРИЯ('руды железа','Больше всего железа в вюстите FeO (77,8 %) и магнетите Fe₃O₄ (72,4 %), меньше — в пирите FeS₂ (46,7 %). Но железо выплавляют в основном из <b>магнетита и гематита</b>: их много, а серу из пирита трудно удалить — она портит сталь.') +
        ДИВО('Пирит называют «золотом дураков»: старатели принимали его блестящие кубики за золото. Отличить просто — пирит твёрдый и хрупкий, а золото мягкое.') : '');
  }

  /* 6. Огород: сцена */
  function сцена6(s){
    const Н=286, y0=250, n=Math.min(s.у6||0,УДОБРЕНИЯ.length-1), У=УДОБРЕНИЯ[n], кг=s.кг6==null?1:s.кг6, итог=s.итог6, ок=!!s.ок6;
    const k=итог?Math.min(1.4,Math.max(0.2,итог.N/У.нужно)):0.35, сост=!итог?'мало':итог.N<У.нужно-0.06?'мало':итог.N>У.нужно+0.06?'много':'норма';
    const пр = электро(78,y0+18,118,ч2(кг.toFixed(1))+' кг');
    return L_().студия(Н,y0) + пр + мешок(78,y0-22,кг,У) + грядка(176,320,y0-2,сост,сост==='норма'?1:сост==='мало'?k*0.8:1) +
      метка(168,6,'грядке нужно азота: '+ч2(У.нужно)+' кг',ЗЛ,{кегль:11}) +
      (итог?метка(248,34,'внесено азота: '+ч2(итог.N.toFixed(2))+' кг',сост==='норма'?ЗЕ:КР,{кегль:10}):метка(248,34,'азот: ? кг','#6a7480',{кегль:10})) +
      (итог?метка(248,60,сост==='норма'?'грядка цветёт!':сост==='мало'?'бледная — мало азота':'корни сожжены — перебор',сост==='норма'?ЗЕ:КР,{кегль:10}):'');
  }
  function F6(s){
    const n=Math.min(s.у6||0,УДОБРЕНИЯ.length-1), У=УДОБРЕНИЯ[n], ок=!!s.ок6, отз=s.отз6, готовых=n+(ок?1:0), все=готовых>=УДОБРЕНИЯ.length, кг=s.кг6==null?1:s.кг6;
    return ЖУРНАЛ(s) + ШАПКА('Шаг 5','Огород') +
      `<div class="pic тёмная" id="c119-ж-кг6">${свгЛ(сцена6(s),286)}</div>` +
      ТОЧКИ(УДОБРЕНИЯ.length,все?-1:n,готовых) +
      A(3,'карт задача','<span class="метка">Грядка '+(n+1)+' из 3 · '+У.имя+' '+У.ф+'</span><div class="текст">На мешке: азота '+ок1(ω(У.ч,'N'))+' %. Грядке нужно <b>'+ч2(У.нужно)+' кг азота</b>. Сколько килограммов удобрения отмерить?</div>') +
      (ок ? '' : ПОЛЗУН('кг6',0,МАКС_КГ,0.1,кг,'Удобрение',' кг') + `<div class="ask">${BTN(5,'','Внести удобрение',"r119внести()")}</div>`) +
      (отз ? РАЗБОР(отз.ок,отз.т) : '') +
      (ок&&!все ? `<div class="ask">${BTN(6,'','Следующая грядка →',"r119удальше()")}</div>` : '') +
      (все ? ТЕОРИЯ('масса элемента в веществе','<b>m(Э) = m(вещества) × ω(Э)</b>. И обратно: m(вещества) = m(Э) : ω(Э). Чем меньше доля азота в удобрении, тем больше его нужно: калийной селитры — вдвое-втрое больше, чем мочевины.') : '');
  }

  /* 7. Вывод */
  function F7(s){
    const Н=246, y0=214;
    const поверх = пирог(168,104,98,[['H',2],['O',1]],'O',{h:16}) + формулаВ(168,30,[['H',2,'1'],['O',1,'16']],24);
    return ЖУРНАЛ(s) + ШАПКА('Вывод','Массовая доля элемента') +
      `<div class="pic тёмная">${свгЛ(сцена(Н,y0,руда(56,y0+16,58,'магнетит',3)+руда(286,y0+16,54,'сидерит',4),поверх),Н)}</div>` +
      A(4,'карт теория','<span class="метка">Вывод</span><div class="текст" style="font-size:18px">'+
        '• <b>ω(Э)</b> — доля массы элемента в массе вещества.<br>• ω(Э) = Ar × индекс : Mr × 100 %.<br>• Сумма ω всех элементов — 100 %.<br>• Лёгкие атомы дают малую долю: ω(H) в воде всего 11 %.<br>• m(Э) = m(вещества) × ω: так считают железо в руде и азот в удобрении.</div>') +
      ПРАВИЛО('<b>ω(O) в H₂O</b> = 16 : 18 ≈ 88,9 %.');
  }

  /* 8. Марафон */
  function F8(s){
    const Н=206, y0=162, м8=s.мар8||{}, n=Math.min(м8.n||0,МАРАФОН.length), ош=Math.min(м8.ош||0,3), отв=s.отв8, все=n>=МАРАФОН.length, закрыт=ош>=3&&!все;
    const з=МАРАФОН[Math.min(n,МАРАФОН.length-1)];
    const жизни = [0,1,2].map(i=>`<g opacity="${i<3-ош?1:.22}">${руда(232+i*40,y0+6,34,['пирит','гематит','магнетит'][i],20+i)}</g>`).join('');
    const поверх = пирог(92,96,64,[['C',1],['O',2]],'C',{h:12}) + жизни + L_().имяПрибора(272,y0+22,'попытки') +
      (все?метка(168,8,'марафон пройден: 10 из 10',ЗЕ,{кегль:13}) : закрыт?`<rect width="336" height="${Н}" fill="#0a0c10" opacity=".6"/>${метка(168,86,'ЛАБОРАТОРИЯ ЗАКРЫТА · ПРОВЕТРИВАНИЕ',КР,{кегль:12})}`
      : метка(168,8,'задача '+(n+1)+' из 10',ЗЛ,{кегль:12}));
    return ЖУРНАЛ(s) + ШАПКА('Проверка','Лабораторный марафон') +
      `<div class="pic тёмная">${свгЛ(L_().студия(Н,y0)+поверх,Н)}</div>` +
      (все ? РАЗБОР(true,'Марафон пройден! Доли элементов ты считаешь уверенно.')
        : закрыт ? РАЗБОР(false,'Разбор последней: '+з.р) + `<div class="ask">${BTN(4,'','Открыть лабораторию заново',"r119заново()")}</div>`
        : A(3,'карт задача','<span class="метка">Задача '+(n+1)+'</span><div class="текст">'+з.q+'</div>') +
          `<div class="ask ${з.вар.some(v=>v.length>11)?'':'три'}">${з.вар.map((v,j)=>BTN(4+j,отв&&!отв.ок&&отв.j===j?'miss':'',v,'r119мар('+j+')')).join('')}</div>` +
          (отв ? (отв.ок ? РАЗБОР(true,МАРАФОН[отв.i].р) : РАЗБОР(false,'Не так. Масса элемента : Mr × 100 %.')) : '')) +
      (все ? ПРАВИЛО('ω = Ar × индекс : Mr × 100 %.') : '');
  }

  /* ================= ПРАКТИКА ================= */
  const УРОВНИ = [
    { вопрос:'ω(O) в MgO =', варианты:[{т:'40 %',ок:true},{т:'60 %',ок:false}], разбор:'16 : 40 = 0,4.' },
    { вопрос:'ω(S) в SO₂ =', варианты:[{т:'33 %',ок:false},{т:'50 %',ок:true}], разбор:'32 : 64 = 0,5.' },
    { вопрос:'ω(C) в CH₄ =', варианты:[{т:'75 %',ок:true},{т:'20 %',ок:false}], разбор:'12 : 16 = 0,75.' },
    { вопрос:'Где больше кислорода по массе?', варианты:[{т:'SO₂',ок:false},{т:'SO₃',ок:true}], разбор:'SO₃: 48 : 80 = 60 %; SO₂: 50 %.' },
    { вопрос:'Сколько кальция в 100 г CaCO₃?', варианты:[{т:'40 г',ок:true},{т:'12 г',ок:false}], разбор:'ω(Ca) = 40 : 100 = 40 %.' }
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
        `<div class="ask">${BTN(3,'','Пройти заново',"r119Reset()")}</div>` +
        ПРАВИЛО('ω = Ar × индекс : Mr × 100 %.');
    }
    return ТОЧКИ(УРОВНИ.length,уровень,пройдено) +
      ЗАДАЧА('Уровень '+(уровень+1)+' из '+УРОВНИ.length+'. '+у.вопрос) +
      `<div class="ask пара">` +
      у.варианты.map((в,к)=>BTN(3+к, выбран===к ? (в.ок?'hit':'miss') : '', в.т, "r119Pick("+уровень+","+к+")")).join('') +
      `</div>` +
      (выбран!=null ? РАЗБОР(у.варианты[выбран].ок, у.разбор) : СКАЗ('Ответ','Выбери вариант выше.'));
  }

  /* ================= ТРЕНАЖЁРЫ НОВОГО ВИДА ================= */
  const КРУГ = 8;
  const серия = (ст) => ст.серия>=3?метка(290,6,'серия: '+ст.серия,ЗЕ,{кегль:9}):'';
  const полоса = (x,y,ш,w,e,отв) => `<rect x="${x}" y="${y}" width="${ш}" height="16" rx="8" fill="#14171b" stroke="#3a4048"/>` + (отв?`<rect x="${x}" y="${y}" width="${ф2(ш*w/100)}" height="16" rx="8" fill="url(#c119-бок-${e})"/>`:'');
  const Т = {
    т1:{ имя:'ω по формуле', пул:П1, класс:'пара',
      сцена:(з,ст)=>{ const Н=170, y0=160, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+формулаВ(168,76,з.ч.map(([e,n])=>[e,n,ч2(АР[e])]),40,{цвета:з.ч.map(([e])=>e===з.e?GOLD:ИНК)})+полоса(48,110,240,з.w,з.e,отв)+(отв?тА(168,146,'ω('+з.e+') ≈ '+ок1(з.w)+' %',12,GREEN):тА(168,146,'ω('+з.e+') = ?',12,'#9aa3ad'))+серия(ст),Н); } },
    т2:{ имя:'Где доля больше', пул:П2, класс:'пара',
      сцена:(з,ст)=>{ const Н=180, y0=170, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+тА(168,26,'ω('+з.e+') — где больше?',12,'#c8ced6')+формулаВ(90,72,з.ч1.map(([e,n])=>[e,n,'']),30)+формулаВ(246,72,з.ч2.map(([e,n])=>[e,n,'']),30)+
          полоса(30,100,120,з.w1,з.e,отв)+полоса(186,100,120,з.w2,з.e,отв)+(отв?тА(90,140,ок1(з.w1)+' %',12,GREEN)+тА(246,140,ок1(з.w2)+' %',12,'#c8ced6'):тА(168,140,'?',16,'#6a7480'))+серия(ст),Н); } },
    т3:{ имя:'Масса элемента в образце', пул:П3, класс:'пара',
      сцена:(з,ст)=>{ const Н=180, y0=170, отв=ст.ответ!=null;
        return свгЛ(L_().студия(Н,y0)+электро(100,y0+8,130,з.m+' г')+формулаВ(100,72,з.ч.map(([e,n])=>[e,n,'']),30,{цвета:з.ч.map(([e])=>e===з.e?GOLD:ИНК)})+
          тА(250,70,'ω('+з.e+')',12,'#c8ced6')+тА(250,96,отв?ок1(з.w)+' %':'?',20,отв?GOLD:'#6a7480')+(отв?метка(250,112,з.ок+' '+з.e,ЗЕ,{кегль:11}):'')+серия(ст),Н); } }
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
        `<div class="ask">${BTN(3,'','Новый круг →',"r119Круг('"+ключ+"')")}</div>`;
    }
    const з=задание(ключ,ст);
    return ТОЧКИ(КРУГ,ст.шаг,ст.шаг) +
      A(1,'score','Тренажёр '+номер+' · '+т0.имя+' · круг '+(ст.круг+1)+' · верно '+ст.верно+' · серия '+ст.серия) +
      `<div class="pic тёмная">${т0.сцена(з,ст)}</div>` +
      ЗАДАЧА(з.q) +
      `<div class="ask ${т0.класс}">` +
      з.вар.map((в,к)=>BTN(3+к,
        ст.ответ===к ? (к===з.в?'hit':'miss') : (ст.ответ!=null&&к===з.в?'hit':''),
        '<span style="font-size:17px">'+в+'</span>', "r119T('"+ключ+"',"+к+")")).join('') +
      `</div>` +
      (ст.ответ!=null
        ? РАЗБОР(ст.ответ===з.в, з.раз) + `<div class="ask">${BTN(10,'',ст.шаг+1>=КРУГ?'Итог круга →':'Дальше →',"r119TNext('"+ключ+"')")}</div>`
        : СКАЗ('Ответ','Выбери вариант.'));
  }

  /* ================= СБОРКА ================= */
  const L119 = {
    id: ID, title: 'Массовая доля элемента', ico: '📊',
    src: 'Химия · 7 класс · Массовая доля', subj: 'chem',
    explain: [
      'Карточка работы: цель, принцип, оборудование, ход, безопасность.',
      'Пирог масс: доли атомов.',
      'Прицел ω: оценка на глаз.',
      'Калькулятор ω по шагам.',
      'Рудник: где больше железа.',
      'Огород: азот в удобрении.',
      'Вывод.',
      'Проверка: лабораторный марафон.',
      'Практика: пять уровней подряд.',
      'Тренажёр 1: ω по формуле.',
      'Тренажёр 2: где доля больше.',
      'Тренажёр 3: масса элемента в образце.'
    ],
    check: { q: 'Какова массовая доля магния в оксиде MgO? (в %)', choices: ['40','50','60','24'], ans: 2, exp: 'Mr(MgO) = 24 + 16 = 40; 24 : 40 = 0,6 = 60%.' },
    tasks: [
      { q: 'Какова массовая доля кислорода в MgO? (в %)', kind: 'unit', ans: 40, tol: 0, hints: ['Mr(MgO) = 24 + 16 = 40.', '16 : 40 = 0,4.', '40%.'], sol: '16 : (24 + 16) = 16 : 40 = 0,4 = 40%.' },
      { q: 'Какова массовая доля кислорода в SO₂? (S = 32, O = 16; в %)', kind: 'unit', ans: 50, tol: 0, hints: ['Mr(SO₂) = 32 + 2 · 16 = 64.', 'Масса кислорода: 2 · 16 = 32.', '32 : 64 = 0,5 = 50%.'], sol: '2 · 16 = 32; 32 : 64 = 0,5 = 50%.' }
    ]
  };

  function render(el){
    if(!window.РЛ || !window.РЛ.клетка){ el.innerHTML=''; return; }
    css();
    const s = S();
    const step = Math.max(0, Math.min(L119.explain.length-1, (typeof LV!=='undefined'&&LV.step)||0));
    const f = step+1;
    const Ф=[F1,F2,F3,F4,F5,F6,F7,F8,F9];
    const сцена0 = f<=9 ? Ф[f-1](s) : тренажёр(s,'т'+(f-9),f-9);
    const ЗАГОЛОВКИ={1:'Практическая работа',2:'Пирог масс',3:'Прицел ω',4:'Калькулятор ω',5:'Рудник',6:'Огород',7:'Вывод',8:'Проверка',9:'Практика',
      10:'Тренажёр 1',11:'Тренажёр 2',12:'Тренажёр 3'};
    el.innerHTML = `<div class="s6 l119n" data-frame="${f}"><h2>${ЗАГОЛОВКИ[f]||'Массовая доля'}</h2>${сцена0}</div>`;
  }

  /* ================= ОБРАБОТЧИКИ ================= */
  /* перерисовка урока: сначала снимаем фокус с ползунка — иначе wave_guard обновит только рисунок
     (на iPhone кнопка при нажатии фокус не забирает) */
  const ПЕРЕРИС = () => { try{ const a=document.activeElement; if(a&&a.type==='range') a.blur(); }catch(e){} chRender(0); };
  window.r119Отв=(f,к)=>{ const s=S(); s['ответ'+f]=к; ПЕРЕРИС(); };
  window.r119вк=(i)=>{ const s=S(); s.вк1=i; const в=Object.assign({0:true},s.видвк1||{}); в[i]=true; s.видвк1=в; ПЕРЕРИС(); };
  window.r119п=(i)=>{ const s=S(); if(!ПИРОГИ[i]) return; s.п2=i; const в=Object.assign({},s.вид2||{}); в[i]=true; s.вид2=в; ПЕРЕРИС(); };
  window.r119э=(e)=>{ const s=S(); s.э2=e; const в=Object.assign({},s.вид2||{}); в[s.п2==null?0:s.п2]=true; s.вид2=в; ПЕРЕРИС(); };
  window.r119ат=(i)=>{ const s=S(); const П=ПИРОГИ[s.п2==null?0:s.п2], pts=раскладкаМ(П.м,1); if(pts[i]) window.r119э(pts[i].e); };
  /* живые ползунки: обновляют рисунок и число без полной перерисовки */
  const ЖИВЫЕ = { пол3:{min:0,max:100,шаг:1,ед:' %',сцена:сцена3,Н:272}, кг6:{min:0,max:МАКС_КГ,шаг:0.1,ед:' кг',сцена:сцена6,Н:286} };
  const живо = (ключ) => { const s=S(), Ж=ЖИВЫЕ[ключ]; try{
      const pic=document.getElementById('c119-ж-'+ключ); if(pic) pic.innerHTML=свгЛ(Ж.сцена(s),Ж.Н);
      const в=document.getElementById('c119-в-'+ключ); if(в) в.textContent=ч2(s[ключ])+Ж.ед;
      const п=document.getElementById('c119-п-'+ключ); if(п&&+п.value!==s[ключ]) п.value=s[ключ];
    }catch(e){} };
  window.r119пол=(ключ,v)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; if((ключ==='пол3'&&s.ок3)||(ключ==='кг6'&&s.ок6)) return;
    s[ключ]=Math.round(Math.max(Ж.min,Math.min(Ж.max,+v))/Ж.шаг)*Ж.шаг; s[ключ]=+s[ключ].toFixed(1);
    if(ключ==='кг6') s.итог6=null;
    живо(ключ); };
  /* отпустили ползунок: снимаем фокус (иначе wave_guard перерисовывает только рисунок) и перерисовываем урок целиком */
  window.r119отпуск=(el)=>{ try{ el.blur(); }catch(e){} ПЕРЕРИС(); };
  window.r119шаг=(ключ,d)=>{ const s=S(), Ж=ЖИВЫЕ[ключ]; if(!Ж) return; const v=s[ключ]==null?(ключ==='пол3'?50:1):s[ключ]; window.r119пол(ключ,v+d*Ж.шаг); };
  window.r119пров3=()=>{ const s=S(); if(s.ок3) return; const n=s.ц3||0, Ц=ПРИЦЕЛ[n], v=s.пол3==null?50:s.пол3, w=ω(Ц.ч,Ц.e), d=v-w;
    if(Math.abs(d)<=ДОПУСК){ s.ок3=true; if(n>=ПРИЦЕЛ.length-1) s.дело_прицел=true; s.отз3={ок:true,т:'В цель! ω('+Ц.e+') = '+числитель(Ц.ч,Ц.e)+' : '+ч2(Mr(Ц.ч))+' ≈ '+ок1(w)+' %, ты налил '+ч2(v)+' %.'}; }
    else s.отз3={ок:false,т:(d<0?'Мало — налей больше.':'Много — отлей.')+' Подсказка: '+Ц.e+' даёт '+ч2(масЭ(Ц.ч,Ц.e))+' из '+ч2(Mr(Ц.ч))+'.'+(Math.abs(d)>20?' Это '+(масЭ(Ц.ч,Ц.e)/Mr(Ц.ч)>0.5?'больше':'меньше')+' половины.':'')};
    ПЕРЕРИС(); };
  window.r119ц3дальше=()=>{ const s=S(); if(!s.ок3||(s.ц3||0)>=ПРИЦЕЛ.length-1) return; s.ц3=(s.ц3||0)+1; s.ок3=false; s.пол3=50; s.отз3=null; ПЕРЕРИС(); };
  window.r119к=(j)=>{ const s=S(); if(s.ок4) return; const n=s.к4||0, Р=РАСЧЁТЫ[n], ш=s.ш4||0, ВАР=ВАР4(Р,ш,n+ш), v=ВАР[j]; if(v==null) return;
    const ч=Р.ч, e=Р.e, нужно=[масЭ(ч,e),Mr(ч),ω(ч,e)][ш];
    if(Math.abs(v-нужно)<1e-9){ s.ш4=ш+1; s.отз4={ок:true,т:['m('+e+') = '+числитель(ч,e)+'.','Mr = '+расчёт(ч)+'.',''][ш]};
      if(ш>=2){ s.ок4=true; if(n>=РАСЧЁТЫ.length-1) s.дело_расчёт=true; s.отз4={ок:true,т:'ω('+e+') = '+ч2(масЭ(ч,e))+' : '+ч2(Mr(ч))+' × 100 % ≈ '+ок1(ω(ч,e))+' %.'}; } }
    else s.отз4={ок:false,j:j,т:[кол(ч,e)>1?'Атомов '+e+' — '+кол(ч,e)+': умножь Ar на индекс.':'Атом '+e+' один — его масса равна Ar.','Mr — сумма масс <b>всех</b> атомов: '+ч.map(([el,k])=>(k>1?k+' × ':'')+ч2(АР[el])).join(' + ')+'.','Дели массу элемента на Mr, а не наоборот, и умножь на 100 %.'][ш]};
    ПЕРЕРИС(); };
  window.r119кдальше=()=>{ const s=S(); if(!s.ок4||(s.к4||0)>=РАСЧЁТЫ.length-1) return; s.к4=(s.к4||0)+1; s.ш4=0; s.ок4=false; s.отз4=null; ПЕРЕРИС(); };
  window.r119руда=(i)=>{ const s=S(); const ряд=(s.ряд5||[]).slice(); if(ряд.length>=РУДЫ.length||ряд.includes(i)||!РУДЫ[i]) return;
    const ост=РУДЫ.map((_,k)=>k).filter(k=>!ряд.includes(k)), лучший=ост.reduce((a,k)=>ω(РУДЫ[k].ч,'Fe')>ω(РУДЫ[a].ч,'Fe')?k:a,ост[0]);
    const раскр=Object.assign({},s.раскр5||{}); раскр[i]=true; s.раскр5=раскр; const Р=РУДЫ[i];
    if(i===лучший){ ряд.push(i); s.ряд5=ряд; if(ряд.length>=РУДЫ.length) s.дело_рудник=true;
      s.отз5={ок:true,т:Р.имя+' '+формула(Р.ч)+': ω(Fe) = '+числитель(Р.ч,'Fe')+' : '+ч2(Mr(Р.ч))+' ≈ '+ок1(ω(Р.ч,'Fe'))+' % — место '+ряд.length+'.'+(ряд.length>=РУДЫ.length?' Рудник рассортирован!':'')}; }
    else s.отз5={ок:false,т:'Анализ руды «'+Р.имя+'» '+формула(Р.ч)+': ω(Fe) = '+числитель(Р.ч,'Fe')+' : '+ч2(Mr(Р.ч))+' ≈ '+ок1(ω(Р.ч,'Fe'))+' %. Среди оставшихся есть руда богаче.'};
    ПЕРЕРИС(); };
  window.r119внести=()=>{ const s=S(); if(s.ок6) return; const n=s.у6||0, У=УДОБРЕНИЯ[n], кг=s.кг6==null?1:s.кг6, w=ω(У.ч,'N'), N=кг*w/100, нужно=+(У.нужно/w*100).toFixed(2);
    s.итог6={N:N};
    if(Math.abs(N-У.нужно)<=0.06){ s.ок6=true; if(n>=УДОБРЕНИЯ.length-1) s.дело_огород=true; s.отз6={ок:true,т:ч2(кг)+' кг × '+ок1(w)+' % ≈ '+ч2(N.toFixed(2))+' кг азота. Точно: '+ч2(У.нужно)+' : '+ч2((w/100).toFixed(3))+' ≈ '+ч2(нужно)+' кг удобрения.'}; }
    else s.отз6={ок:false,т:'Внесено '+ч2(кг)+' кг × '+ок1(w)+' % ≈ '+ч2(N.toFixed(2))+' кг азота, а нужно '+ч2(У.нужно)+'. '+(N<У.нужно?'Мало: добавь удобрения.':'Перебор: убавь.')+' Подсказка: m = m(N) : ω.'};
    ПЕРЕРИС(); };
  window.r119удальше=()=>{ const s=S(); if(!s.ок6||(s.у6||0)>=УДОБРЕНИЯ.length-1) return; s.у6=(s.у6||0)+1; s.ок6=false; s.кг6=1; s.итог6=null; s.отз6=null; ПЕРЕРИС(); };
  window.r119мар=(j)=>{ const s=S(); const м=Object.assign({n:0,ош:0},s.мар8||{}); if(м.n>=МАРАФОН.length||м.ош>=3) return;
    if(МАРАФОН[м.n].в===j){ s.отв8={i:м.n,ок:true}; м.n++; if(м.n>=МАРАФОН.length) s.дело_марафон=true; }
    else { м.ош++; s.отв8={i:м.n,ок:false,j:j}; }
    s.мар8=м; ПЕРЕРИС(); };
  window.r119заново=()=>{ const s=S(); s.мар8={n:0,ош:0}; s.отв8=null; ПЕРЕРИС(); };
  window.r119Pick=(уровень,вариант)=>{ const s=S(); s.практикаУровень=уровень; s.практикаВыбор=вариант;
    if(УРОВНИ[уровень].варианты[вариант].ок) s.практика=уровень+1; ПЕРЕРИС(); };
  window.r119Reset=()=>{ const s=S(); s.практика=0; s.практикаВыбор=null; s.практикаУровень=null; ПЕРЕРИС(); };
  window.r119T=(ключ,вариант)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ!=null||ст.шаг>=КРУГ) return;
    const з=задание(ключ,ст); ст.ответ=вариант;
    if(вариант===з.в){ ст.верно++; ст.серия++; ст.лучшая=Math.max(ст.лучшая,ст.серия); } else { ст.ош++; ст.серия=0; }
    s[ключ]=ст; ПЕРЕРИС(); };
  window.r119TNext=(ключ)=>{ const s=S(); const ст=сост(s,ключ); if(ст.ответ==null) return; ст.шаг++; ст.ответ=null; s[ключ]=ст; ПЕРЕРИС(); };
  window.r119Круг=(ключ)=>{ const s=S(); const ст=сост(s,ключ); s[ключ]={круг:ст.круг+1,шаг:0,верно:0,ош:0,серия:0,лучшая:0,ответ:null}; ПЕРЕРИС(); };

  function зарегистрировать(){
    try{
      if(!window.VISKW) window.VISKW={};
      window.VISKW[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      if(window.WAVE_B) window.WAVE_B[ID]=function(el){ try{ render(el); }catch(e){ el.innerHTML=''; } };
      const arr=window.ARH_LESSONS;
      if(arr && arr.length){ const м=arr.findIndex(L=>L && L.id===ID); if(м>=0) arr[м]=Object.assign(L119,{__планПорядок:arr[м].__планПорядок}); else arr.push(L119); }
    }catch(e){}
  }
  зарегистрировать();
  document.addEventListener('DOMContentLoaded', зарегистрировать);
  window.addEventListener('load', зарегистрировать);
  window.RU119={render:render, L:L119};
})();
