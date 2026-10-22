/* 307 · Кто есть кто · Тайна лунного театра. Native ДК/ДТ integration.
   Original image_gen artwork; live, accessible labels. No shared engine changes. */
(function(){
 'use strict';
 if(!window.ДК)return;
 const ID=307,A='img/l307/',actors=['Руна','Тим','Ли'],keys=['runa','tim','li'];
 const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 const things={lamp:['Фонарь','✦'],drum:['Барабан','♬'],flute:['Флейта','♪'],moon:['Луна','☾'],star:['Звезда','★'],leaf:['Лист','❧'],key:['Ключ','⚿'],book:['Книга','▤'],apple:['Яблоко','●'],pear:['Груша','◆'],berry:['Ягоды','✿']};
 function emblem(k){const shapes={lamp:'<path d="M20 10v-4h16v4M18 14h20l3 29H15z" fill="#ffde83" stroke="#85572d" stroke-width="3"/><path d="M18 24h20M24 15v25m8-25v25" stroke="#a77937" stroke-width="2"/><path d="M14 44h28" stroke="#85572d" stroke-width="4"/>',drum:'<ellipse cx="28" cy="19" rx="20" ry="8" fill="#fff4cf" stroke="#8b513e" stroke-width="3"/><path d="M8 19v23q20 15 40 0V19" fill="#ab5669" stroke="#643b4d" stroke-width="3"/><path d="M9 23l8 21 11-20 11 20 8-21" fill="none" stroke="#f4cf84" stroke-width="2"/><path d="M11 8l28 13M45 6L20 23" stroke="#b88044" stroke-width="4" stroke-linecap="round"/>',flute:'<g transform="rotate(-28 28 28)"><rect x="4" y="22" width="48" height="12" rx="5" fill="#e4ba63" stroke="#8d6836" stroke-width="2"/><path d="M9 22v12m35-12v12" stroke="#fff1bd" stroke-width="2"/><circle cx="20" cy="27" r="2" fill="#775b39"/><circle cx="28" cy="27" r="2" fill="#775b39"/><circle cx="36" cy="27" r="2" fill="#775b39"/></g>',moon:'<path d="M37 5A23 23 0 1 0 40 49A24 24 0 0 1 37 5" fill="#e9c779" stroke="#a27c3e" stroke-width="2"/>',star:'<path d="M28 4l7 16 18 2-14 12 4 18-15-9-16 9 4-18L3 22l18-2z" fill="#e6bc63" stroke="#a27c3e" stroke-width="2"/>',leaf:'<path d="M9 47Q-2 15 48 5Q55 47 9 47Z" fill="#8cad70" stroke="#4d765b" stroke-width="2"/><path d="M8 49L41 14m-19 22-5-14m10 7 12 1" fill="none" stroke="#e1e5a6" stroke-width="2"/>',key:'<circle cx="16" cy="18" r="10" fill="none" stroke="#bd914d" stroke-width="7"/><path d="M23 25l23 23m-8-8 7-7m-14 0 7-7" stroke="#bd914d" stroke-width="7"/>',book:'<path d="M8 9h38v40H8q-8-5 0-10z" fill="#62988e" stroke="#345f5e" stroke-width="3"/><path d="M8 39h38v7H8" fill="#fff4d7"/><path d="M19 18h17m-17 7h17" stroke="#e8ce87" stroke-width="3"/>'};return `<svg viewBox="0 0 56 56" aria-hidden="true">${shapes[k]||`<text x="28" y="39" text-anchor="middle" font-size="37" fill="#aa6d65">${things[k]?.[1]||k}</text>`}</svg>`;}
 const item=k=>things[k]?.[0]||String(k);
 const portrait=(i,pose='idle')=>`<img src="${A}${keys[i]}-${pose}.webp" alt="" draggable="false">`;
 const click=(scope,i,action,value)=>`MOON307.act('${scope}',${i},'${action}',${JSON.stringify(value)})`;
 function button(scope,i,label,action,value,disabled=false,cls='',pressed){return `<button type="button" class="moon-button ${cls}" ${disabled?'disabled':''} ${pressed===undefined?'':`aria-pressed="${pressed}"`} onclick="${esc(click(scope,i,action,value))}">${label}</button>`;}
 const conditions={roles:[{a:2,op:'is',v:2,text:'Ли играет на флейте.'},{a:0,op:'not',v:1,text:'У Руны не барабан.'}],costumes:[{a:1,op:'is',v:2,text:'У Тима костюм Листа.'},{a:2,op:'not',v:0,text:'Ли не играет Луну.'}],rooms:[{a:0,op:'is',v:1,text:'Руна в гримёрке 2.'},{a:2,op:'not',v:0,text:'Ли не в гримёрке 1.'}],order:[{a:0,op:'before',b:1,text:'Руна выходит раньше Тима.'},{a:1,op:'before',b:2,text:'Тим выходит раньше Ли.'}]};
 const scenes=[
 {t:'Письмо перед премьерой',who:0,kind:'choose',q:'Сегодня первый спектакль! Я Руна. С афиши исчезли имена артистов. Восстановим их по подсказкам! Первая: «Ли играет на флейте». Кому вернуть флейту?',clues:[conditions.roles[0]],opts:actors,answer:2,heroChoices:true,show:'flute',hint:'Нам прямо назвали имя: на флейте играет мышка Ли.',sol:'Ли получила флейту! Если имя названо прямо, это уже известный факт.'},
 {t:'Важное слово «не»',who:0,kind:'choose',q:'У каждого артиста одна вещь: фонарь, барабан или флейта. «У Руны не барабан». Какую вещь можно сразу исключить для Руны?',clues:[conditions.roles[1]],opts:['lamp','drum','flute'],answer:1,items:true,show:'lamp',hint:'Слово «не» исключает только барабан. Про остальные вещи пока не знаем.',sol:'Барабан исключён. Но это ещё не значит, что фонарь точно у Руны!'},
 {t:'Записываем факт в таблицу',who:2,kind:'grid',q:'В таблице слева — артисты, сверху — вещи. Найди строку Ли и столбец Флейты. Поставь галочку там, где они встретятся.',clues:[conditions.roles[0]],itemsList:['lamp','drum','flute'],cell:[2,2],hint:'Строка Ли — нижняя, флейта — последний столбец. Нажми их общую клетку.',sol:'Галочка означает «да». Крестики показывают: у Ли нет других вещей, а флейта уже занята.'},
 {t:'Кому достался фонарь?',who:1,kind:'match',q:'Раздадим три разные вещи — каждому по одной. Флейта у Ли. У Руны не барабан. Выбери вещь, потом артиста. Когда всё готово — проверь.',clues:conditions.roles,itemsList:['lamp','drum','flute'],solution:[0,1,2],hint:'Флейта занята Ли. У Руны не барабан, значит, ей остался фонарь. Барабан — Тиму.',sol:'Всё сошлось: Руна с фонарём, Тим с барабаном, Ли с флейтой. Каждая подсказка подходит.'},
 {t:'Костюмы для теней',who:2,kind:'match',q:'Теперь новая загадка! Костюмы Луны, Звезды и Листа — по одному каждому. У Тима Лист. Ли не играет Луну. Раздай костюмы по этим двум подсказкам.',clues:conditions.costumes,itemsList:['moon','star','leaf'],solution:[0,2,1],hint:'Лист у Тима. Ли не Луна, значит, она Звезда. Луной будет Руна.',sol:'Луна — Руна, Лист — Тим, Звезда — Ли! Сначала факт, потом исключение, потом оставшийся вариант.',bg:'backstage'},
 {t:'Три гримёрки',who:0,kind:'doors',q:'Гримёрка — комнатка, где артист готовится. В каждой комнате один герой. Руна в комнате 2. Ли не в комнате 1. Выбери героя и открой его дверь.',clues:conditions.rooms,itemsList:['1','2','3'],solution:[1,0,2],hint:'Комната 2 у Руны. Ли не может в 1 и не может в занятую 2. Значит, Ли в 3, Тим в 1.',sol:'Все на месте: Тим в первой, Руна во второй, Ли в третьей. Две подсказки помогли найти три комнаты.',bg:'backstage'},
 {t:'Кто выйдет первым?',who:1,kind:'order',q:'В спектакле важен порядок. Руна выходит раньше Тима. Тим — раньше Ли. Выбери артиста, затем его место в очереди: первое, второе или третье.',clues:conditions.order,itemsList:['1','2','3'],solution:[0,1,2],hint:'Получается цепочка: Руна, потом Тим, потом Ли. Проверь оба слова «раньше».',sol:'Очередь готова: Руна → Тим → Ли. Обе подсказки верны!'},
 {t:'Можно ли уже ответить?',who:0,kind:'choose',q:'На репетиции появилась новая загадка. У каждого по одной вещи. Известно только: «У Тима не фонарь». Можно ли уже точно сказать, что у Тима барабан?',clues:[{text:'У Тима не фонарь.'}],opts:['Да, точно барабан','Нет, данных мало'],answer:1,hint:'Кроме барабана остаётся флейта. Два варианта — точного ответа пока нет.',sol:'Верно! У Тима может быть барабан ИЛИ флейта. Хороший сыщик ищет ещё подсказку, а не угадывает.',show:'key',bg:'backstage'},
 {t:'Исправляем афишу',who:2,kind:'swap',q:'На афише ошиблись: Руна с барабаном, Тим с фонарём, Ли с флейтой. Подсказки те же. Нажми двух артистов, чтобы обменять их вещи. Затем проверь.',clues:conditions.roles,itemsList:['lamp','drum','flute'],solution:[0,1,2],initial:[1,0,2],hint:'У Руны не должно быть барабана. Флейта Ли верна. Поменяй вещи Руны и Тима.',sol:'Афиша исправлена! Ты нашёл противоречие и исправил именно его.'},
 {t:'Открываем занавес',who:0,kind:'show',q:'Начинаем! Сначала нужен артист с фонарём, затем с барабаном, потом с флейтой. Вспомни подсказки и вызывай артистов на сцену по очереди.',clues:conditions.roles,sequence:[0,1,2],hint:'Фонарь у Руны, барабан у Тима, флейта у Ли. Вызывай их в этом порядке.',sol:'Премьера удалась! Ты узнавал факты, исключал лишнее и проверял все подсказки. Теперь попробуй новые театральные загадки.'}
 ];
 const tasks=[
 {t:'Два секретных подарка',who:2,kind:'match',q:'У Руны и Ли книга и ключ — по одному предмету. У Руны не ключ. Раздай подарки.',people:[0,2],itemsList:['key','book'],clues:[{a:0,op:'not',v:0,text:'У Руны не ключ.'}],solution:[1,0],hint:'Если у Руны не ключ, ей нужна книга. Ключ остаётся Ли.',sol:'Руне — книгу, Ли — ключ.',series:0},
 {t:'Слово с секретом',who:1,kind:'choose',q:'У Тима не Луна. Какой костюм надо исключить для Тима?',opts:['star','leaf','moon'],items:true,clues:[{text:'У Тима не Луна.'}],answer:2,hint:'Исключаем только то, перед чем стоит «не»: Луну.',sol:'Луну исключаем. Звезда и Лист пока возможны.',series:0,show:'moon'},
 {t:'Одна точная отметка',who:0,kind:'grid',q:'На новой репетиции фонарь у Тима. Отметь этот факт в таблице.',itemsList:['lamp','drum','flute'],clues:[{text:'Фонарь у Тима.'}],cell:[1,0],hint:'Строка Тима — средняя. Фонарь — первый столбец с вещами.',sol:'Галочка: Тим и фонарь. Остальные клетки этой строки и столбца исключены.',series:0},
 {t:'Улика или догадка?',who:2,kind:'choose',q:'У Ли не барабан. Других подсказок нет. Что известно точно?',clues:[{text:'У Ли не барабан.'}],opts:['У Ли фонарь','У Ли флейта','Барабан исключён'],answer:2,hint:'Фонарь и флейта пока оба подходят. Точно известно только исключение.',sol:'Барабан исключён. Нельзя выбирать один из оставшихся вариантов без новой подсказки.',series:0,show:'drum'},
 {t:'Новый состав спектакля',who:0,kind:'match',q:'Сегодня костюмы распределили иначе. Каждый получает один. У Руны Звезда. Тим не Лист. Раздай костюмы.',itemsList:['moon','star','leaf'],clues:[{a:0,op:'is',v:1,text:'У Руны Звезда.'},{a:1,op:'not',v:2,text:'Тим не Лист.'}],solution:[1,0,2],hint:'Звезда занята Руной. Тиму остаётся Луна. Лист достаётся Ли.',sol:'Руна — Звезда, Тим — Луна, Ли — Лист.',series:1,bg:'backstage'},
 {t:'Потерянные ключи',who:1,kind:'doors',q:'В каждой комнате один артист. Тим в комнате 3. Руна не в комнате 2. Найди комнаты всех героев.',itemsList:['1','2','3'],clues:[{a:1,op:'is',v:2,text:'Тим в комнате 3.'},{a:0,op:'not',v:1,text:'Руна не в комнате 2.'}],solution:[0,2,1],hint:'Третья занята Тимом. Руне нельзя во вторую, значит, она в первой. Ли во второй.',sol:'Руна в 1, Ли в 2, Тим в 3.',series:1,bg:'backstage'},
 {t:'Очередь к зеркалу',who:2,kind:'order',q:'Ли идёт раньше Руны, а Руна раньше Тима. Расставь всех по порядку.',itemsList:['1','2','3'],clues:[{a:2,op:'before',b:0,text:'Ли раньше Руны.'},{a:0,op:'before',b:1,text:'Руна раньше Тима.'}],solution:[1,2,0],hint:'Начни с Ли. После неё Руна. Последним Тим.',sol:'Ли → Руна → Тим. Обе подсказки выполнены.',series:1,bg:'backstage'},
 {t:'Перепутанные костюмы',who:0,kind:'swap',q:'У Руны должен быть Лист, у Ли — Луна. Каждому нужен свой костюм. Обменяй два перепутанных костюма и проверь.',itemsList:['moon','star','leaf'],clues:[{a:0,op:'is',v:2,text:'У Руны Лист.'},{a:2,op:'is',v:0,text:'У Ли Луна.'}],solution:[2,1,0],initial:[0,1,2],hint:'Костюм Тима подходит. Поменяй костюмы Руны и Ли.',sol:'Теперь Руна — Лист, Тим — Звезда, Ли — Луна.',series:1,bg:'backstage'},
 {t:'Проверка записи',who:1,kind:'verdict',q:'Фонарь у Руны, барабан у Тима, флейта у Ли. Руна записала: «Ли играет на барабане». Поставь правильную печать.',itemsList:['lamp','drum','flute'],solution:[0,1,2],clues:[{text:'Фонарь — Руна. Барабан — Тим. Флейта — Ли.'}],opts:['Верно','Неверно'],answer:1,hint:'Сравни запись с фактами. Барабан у Тима, а у Ли флейта.',sol:'Запись неверна: Ли играет на флейте.',series:2},
 {t:'Какой вопрос поможет?',who:0,kind:'choose',q:'Есть фонарь, барабан и флейта. У каждого героя одна вещь. Известно только: «У Руны не барабан». Какой ответ поможет сразу узнать вещь Руны?',clues:[{text:'У Руны не барабан.'}],opts:['Ли любит театр','Тим сегодня рад','Флейта у Ли'],answer:2,hint:'Нужен факт о вещах. Если флейта у Ли, Руне остаётся фонарь.',sol:'Флейта у Ли. У Руны не барабан — значит, у неё фонарь!',series:2,show:'flute'},
 {t:'Самостоятельное расследование',who:2,kind:'match',q:'Новый спектакль, новые вещи! У каждого одна. У Тима флейта. У Ли не фонарь. Раздай все три вещи и проверь обе подсказки.',itemsList:['lamp','drum','flute'],clues:[{a:1,op:'is',v:2,text:'У Тима флейта.'},{a:2,op:'not',v:0,text:'У Ли не фонарь.'}],solution:[0,2,1],hint:'Флейта занята Тимом. Ли не фонарь, значит, барабан. Фонарь у Руны.',sol:'Руна — фонарь, Тим — флейта, Ли — барабан.',series:2},
 {t:'Секрет хорошего сыщика',who:0,kind:'choose',q:'Ты распределил все вещи. Как убедиться, что загадка решена правильно?',opts:['Проверить все подсказки','Посмотреть одну подсказку','Выбрать красивый вариант'],answer:0,hint:'Верное решение подходит к каждой подсказке. Ни одна не должна противоречить ответу.',sol:'Проверяй все подсказки и правило «каждому своё». Ты настоящий театральный сыщик!',series:2,show:'key'}
 ];
 const series=['Школа сыщика','За кулисами','Секреты премьеры'];
 function initial(c){return {map:c.initial?.slice()||Array((c.people||actors).length).fill(null),selected:null,ok:false,fb:'',count:0};}
 function passes(cl,map){if(cl.op==='is')return map[cl.a]===cl.v;if(cl.op==='not')return map[cl.a]!==cl.v;if(cl.op==='before')return map[cl.a]<map[cl.b];return true;}
 function apply(c,s,action,value){
  if(s.ok)return false;
  const people=c.people||[0,1,2],n=people.length;
  if(action==='hint'){s.fb=c.hint;return true;}
  if(action==='choose'&&(c.kind==='choose'||c.kind==='verdict')){
   if(!Number.isInteger(value)||value<0||value>=c.opts.length)return false;
   s.ok=value===c.answer;s.fb=s.ok?c.sol:c.hint;s.picked=value;return true;
  }
  if(action==='cell'&&c.kind==='grid'){
   if(!Array.isArray(value)||value.length!==2||value.some(v=>!Number.isInteger(v)||v<0||v>2))return false;
   s.ok=value[0]===c.cell[0]&&value[1]===c.cell[1];s.fb=s.ok?c.sol:value[0]!==c.cell[0]?`Это строка «${actors[value[0]]}». Нужна строка «${actors[c.cell[0]]}».`:`Артист найден. Теперь найди столбец «${item(c.itemsList[c.cell[1]])}».`;return true;
  }
  if(action==='select'&&['match','doors','order','swap'].includes(c.kind)){
   if(!Number.isInteger(value)||value<0||value>=n)return false;
   if(c.kind==='swap'&&s.selected!==null&&s.selected!==value){[s.map[s.selected],s.map[value]]=[s.map[value],s.map[s.selected]];s.selected=null;s.fb='Вещи поменялись местами. Проверь обе подсказки.';}
   else{s.selected=s.selected===value?null:value;s.fb=s.selected===null?'Выбор отменён.':c.kind==='match'?`Выбрано: ${item(c.itemsList[value])}. Теперь нажми артиста.`:c.kind==='swap'?'Теперь нажми второго артиста для обмена.':`Выбран ${actors[people[value]]}. Теперь выбери ${c.kind==='doors'?'дверь':'место'}.`;}
   return true;
  }
  if(action==='place'&&['match','doors','order'].includes(c.kind)){
   if(!Number.isInteger(value)||value<0||value>=n)return false;
   if(s.selected===null){s.fb=c.kind==='match'?'Сначала выбери вещь под сценой.':'Сначала выбери артиста.';return true;}
   const who=c.kind==='match'?value:s.selected,what=c.kind==='match'?s.selected:value;
   // Moving an item frees its previous owner; no duplicated belongings or occupied rooms.
   s.map=s.map.map((v,i)=>i!==who&&v===what?null:v);s.map[who]=what;s.selected=null;s.fb=s.map.includes(null)?'На месте. Распредели остальные.':'Всё распределено. Нажми «Проверить». ';return true;
  }
  if(action==='check'&&['match','doors','order','swap'].includes(c.kind)){
   if(s.map.includes(null)){s.fb='Пока есть пустое место. Сначала распредели всё.';return true;}
   const broken=c.clues.find(cl=>!passes(cl,s.map));
   if(broken){s.fb=`Не сходится подсказка: «${broken.text}» ${c.hint}`;s.bad=c.clues.indexOf(broken);return true;}
   s.ok=s.map.every((v,i)=>v===c.solution[i]);s.fb=s.ok?c.sol:c.hint;s.bad=undefined;return true;
  }
  if(action==='call'&&c.kind==='show'){
   if(!Number.isInteger(value)||value<0||value>2)return false;
   if(value===c.sequence[s.count]){s.count++;s.ok=s.count===c.sequence.length;s.fb=s.ok?c.sol:`${actors[value]} на сцене! Теперь нужен артист ${s.count===1?'с барабаном':'с флейтой'}.`;}
   else s.fb=`Сейчас нужен артист ${s.count===0?'с фонарём':s.count===1?'с барабаном':'с флейтой'}. ${c.hint}`;
   return true;
  }
  return false;
 }
 function stage(c,s){
  const ps=c.people||[0,1,2],map=c.kind==='verdict'?c.solution:s.map;
  const bg=c.bg||'stage';
  return `<div class="moon-stage ${c.kind==='show'?'moon-performance':''} ${s.ok?'is-complete':''}" role="img" aria-label="${esc(c.t)}"><div class="moon-stage-title">${c.kind==='show'?(s.ok?'ПРЕМЬЕРА!':'ПРИГЛАШАЕМ АРТИСТОВ'):c.kind==='order'?'ОЧЕРЕДЬ НА СЦЕНУ':c.kind==='doors'?'ТЕАТРАЛЬНЫЕ ГРИМЁРКИ':'ЛУННЫЙ ТЕАТР'}</div><img class="moon-backdrop" src="${A}${bg}.webp" alt="">${c.kind==='show'?'<div class="moon-curtain left"></div><div class="moon-curtain right"></div>':''}<div class="moon-cast">${ps.map((p,j)=>{const present=c.kind!=='show'||j<s.count;const pose=c.kind==='show'&&present?(p===0?'lantern':'action'):s.ok?'happy':p===0&&c.who===p?'action':'idle';return `<div class="moon-actor ${present?'':'waiting'}">${portrait(p,pose)}<span class="moon-name">${actors[p]}</span>${map?.[j]!==null&&map?.[j]!==undefined&&c.itemsList&&!['doors','order'].includes(c.kind)?`<span class="moon-held">${emblem(c.itemsList[map[j]])}</span>`:''}</div>`;}).join('')}</div>${c.show?`<div class="moon-prop">${emblem(c.show)}</div>`:''}</div>`;
 }
 function clues(c,s){return c.clues?.length?`<div class="moon-evidence"><div class="moon-label">ПОДСКАЗКИ СЫЩИКА</div>${c.clues.map((cl,i)=>`<p class="${s.bad===i?'conflict':''}"><span aria-hidden="true">${s.ok?'✓':i+1}</span>${esc(cl.text)}</p>`).join('')}${['match','doors','swap'].includes(c.kind)?'<small>У каждого — своё. Повторов нет.</small>':''}</div>`:'';}
 function renderGame(c,s,scope,i){
  const b=(label,action,value,cls='',pressed)=>button(scope,i,label,action,value,s.ok,cls,pressed);
  const ps=c.people||[0,1,2];let game='';
  if(c.kind==='choose'||c.kind==='verdict')game=`<div class="moon-options ${c.items?'item-options':''}">${c.opts.map((v,j)=>b(c.heroChoices?portrait(j,s.ok&&j===c.answer?'happy':'idle')+`<span>${esc(v)}</span>`:c.items?emblem(v)+`<span>${item(v)}</span>`:esc(v),'choose',j,(s.picked===j?'chosen ':'')+(c.heroChoices?'hero-choice':''))).join('')}</div>`;
  if(c.kind==='grid'){
   game='<div class="moon-table" role="group" aria-label="Артисты и вещи"><div class="moon-corner">Кто?</div>'+c.itemsList.map(k=>`<div class="moon-col">${emblem(k)}<span>${item(k)}</span></div>`).join('');
   for(let r=0;r<3;r++){game+=`<div class="moon-row-label">${actors[r]}</div>`;for(let col=0;col<3;col++){let mark=s.ok?(r===c.cell[0]&&col===c.cell[1]?'✓':r===c.cell[0]||col===c.cell[1]?'×':'?'):'?';game+=button(scope,i,`<span aria-hidden="true">${mark}</span><span class="moon-sr">${actors[r]}, ${item(c.itemsList[col])}${s.ok?', '+(mark==='✓'?'да':mark==='×'?'нет':'неизвестно'):''}</span>`,'cell',[r,col],s.ok,'moon-cell '+(mark==='✓'?'yes':mark==='×'?'no':''));}}
   game+='</div><p class="moon-legend">✓ — точно да · × — точно нет · ? — пока не знаем</p>';
  }
  if(c.kind==='match')game=`<div class="moon-items">${c.itemsList.map((k,j)=>b(emblem(k)+`<span>${item(k)}</span>`,'select',j,'item-choice',s.selected===j)).join('')}</div><div class="moon-destinations">${ps.map((p,j)=>b(`<strong>${actors[p]}</strong><span>${s.map[j]===null?'Отдать сюда':item(c.itemsList[s.map[j]])}</span>`,'place',j,'destination')).join('')}</div>`;
  if(c.kind==='doors'||c.kind==='order'){
   game=`<div class="moon-select-actors">${ps.map((p,j)=>b(actors[p],'select',j,'',s.selected===j)).join('')}</div><div class="moon-places ${c.kind}">${c.itemsList.map((k,j)=>{const owner=s.map.indexOf(j);return b(`<strong>${c.kind==='doors'?'Дверь':'Место'} ${k}</strong><div class="moon-place-portrait">${owner>=0?portrait(ps[owner],s.ok?'happy':'idle'):'<span>?</span>'}</div><span>${owner>=0?actors[ps[owner]]:'Пусто'}</span>`,'place',j,'moon-place');}).join('')}</div>`;
  }
  if(c.kind==='swap')game=`<div class="moon-swap">${ps.map((p,j)=>b(`<strong>${actors[p]}</strong>${emblem(c.itemsList[s.map[j]])}<span>${item(c.itemsList[s.map[j]])}</span>`,'select',j,'swap-card',s.selected===j)).join('')}</div>`;
  if(c.kind==='show')game=`<div class="moon-cues">${['lamp','drum','flute'].map((k,j)=>`<div class="${j<s.count?'played':j===s.count?'current':''}">${emblem(k)}<span>${j<s.count?'✓':j+1}</span></div>`).join('')}</div>`+(s.ok?'':`<div class="moon-select-actors">${ps.map((p,j)=>button(scope,i,actors[p],'call',j,j<s.count)).join('')}</div>`);
  if(['match','doors','order','swap'].includes(c.kind))game+=`<div class="moon-check-row">${button(scope,i,'Проверить','check',null,s.ok||s.map.includes(null),'check-button')}</div>`;
  return `<div class="moon-game" data-game="${c.kind}">${stage(c,s)}${clues(c,s)}${game}<p class="moon-feedback ${s.ok?'success':''}" role="status" aria-live="polite">${esc(s.fb||(['match','doors','order','swap'].includes(c.kind)?'Нажимай, чтобы перемещать. Можно менять решение до проверки.':'Найди ответ по подсказке.'))}</p>${s.ok?'':button(scope,i,'Нужна подсказка','hint',null,false,'moon-help')}</div>`;
 }
 const taskAnswer=t=>t.kind==='choose'||t.kind==='verdict'?t.answer:1;
 tasks.forEach(t=>{t.opts||=['Ещё думаю','Готово','Нужна помощь'];t.answer=taskAnswer(t);});
 const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="moon-chapter"><span>ТАЙНА ЛУННОГО ТЕАТРА</span><span>${i+1} / ${scenes.length}</span></div><h3 class="moon-heading">${c.t}</h3>`+renderGame(c,s,'story',i),делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
 function practiceState(i){const rec=lrec();rec.moonTheatre||={version:1,frames:{}};rec.moonTheatre.practice||={};return rec.moonTheatre.practice[i]||=initial(tasks[i]);}
 function act(scope,i,a,v){
  if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i))return;
  window.MOON307_AUDIO?.stop();
  if(scope==='story'){
   if(LV.phase!=='explain'||LV.step!==i||!scenes[i])return;
   ДК.клик(ID,'action',a,v);if(a==='hint')window.MOON307_AUDIO?.playKey('frame-'+i+'-hint');return;
  }
  if(scope!=='practice'||LV.phase!=='tasks'||LV.task!==i||!tasks[i]||lrec().tasks.includes(i))return;
  const s=practiceState(i);if(!apply(tasks[i],s,a,v))return;
  save();if(s.ok){lvPick(tasks[i].answer);}else{if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();if(a==='hint')window.MOON307_AUDIO?.playKey('task-'+i+'-hint');}
 }
 const practice=(t,i)=>{const s=practiceState(i),done=lrec().tasks.includes(i);if(done&&!s.ok){s.ok=true;s.fb=t.sol;if(t.solution)s.map=t.solution.slice();}return `<div class="moon-practice"><div class="moon-chapter"><span>${series[t.series]}</span><span>${i%4+1} / 4</span></div><h3 class="moon-heading">${t.t}</h3>${renderGame(t,s,'practice',i)}</div>`;};
 window.MOON307={scenes,frames,tasks,apply,initial,passes,act,restart(){if(LV.id!==ID)return;CHS[lidKey(ID)]={п:{}};LV.phase='explain';LV.step=0;renderLessonView();}};
 ДК.подключить({ID,ИМГ:A,размеры:{},герои:Object.fromEntries(keys.map((k,i)=>[k,{имя:actors[i],ф:k+'-idle',позы:{action:k+'-action',happy:k+'-happy'}}])),фоны:['stage'],кадры:frames,
  запись:{title:'Кто есть кто · Тайна лунного театра',ico:'🎭',subj:'jun',src:'Начальная школа · 1 класс · Логика: кто есть кто',check:{q:'Подсказка говорит: «У Руны не барабан». Что мы точно знаем?',choices:['У Руны фонарь','Барабан исключён','У Руны флейта'],ans:1,exp:'«Не барабан» исключает барабан. Для выбора между фонарём и флейтой нужны ещё подсказки.'},tasks:tasks.map(t=>({q:t.q,kind:'choice',choices:t.opts,ans:t.answer,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
  тренажёр:{герой:'runa',проверка:{картинка:()=>stage(scenes[1],initial(scenes[1])),итог:'Сначала факт, потом исключение. Проверяй все подсказки.'},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),разборы:Object.fromEntries(t.opts.map(v=>[v,t.hint])),итог:t.sol})),финал:()=>`<div class="moon-finale">${stage(scenes[9],{...initial(scenes[9]),ok:true,count:3})}<h3>Браво, театральный сыщик!</h3><p>12 загадок решены. Твои награды сохранены в приложении.</p><div class="moon-summary"><span>✓ Находишь факты</span><span>✓ Исключаешь лишнее</span><span>✓ Проверяешь все подсказки</span></div></div>`}
 });
 let restored=false,lastSaved='';const renderer=WAVE_B[ID];
 WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const old=DB.lessons?.[ID]?.moonTheatre;if(old?.version===1&&old.frames)CHS[k].п=JSON.parse(JSON.stringify(old.frames));restored=true;}renderer(el);if(LV.phase==='explain'&&LV.step===0&&CHS[k].п?.[0]?.ok)el.querySelector('.дк307')?.insertAdjacentHTML('beforeend','<button class="moon-button" onclick="MOON307.restart()">Повторить историю</button>');sync();};
 function sync(){if(LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{};const can=LV.phase!=='explain'||p[LV.step]?.ok;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});const s=JSON.stringify(p);if(s!==lastSaved){DB.lessons||={};DB.lessons[ID]||={tasks:[],stars:0,done:false};DB.lessons[ID].moonTheatre={...DB.lessons[ID].moonTheatre,version:1,frames:JSON.parse(s)};lastSaved=s;save();}}
 window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
 const css=document.createElement('style');css.textContent=`
 @font-face{font-family:MoonHand307;src:url('fonts/Pangolin-ru.woff2') format('woff2');font-weight:400;font-display:swap}
 body:has(.дк307) #asst,#screen:has(.дк307)>.card>.arch{display:none}
 #screen:has(.дк307){font-family:'NunitoДК',sans-serif}#screen:has(.дк307)>.card{padding:6px;background:transparent;border:0}
 #screen:has(.дк307)>h2{max-width:640px;margin:12px auto;color:#f3dfb4;font:800 19px/1.3 'NunitoДК',sans-serif}
 #lvis .дк.дк307{width:100%;max-width:640px;margin:auto;gap:12px;--чернила:#443750;--контур:#95744f;min-width:0}
 #lvis .дк.дк307 *{box-sizing:border-box}#lvis .дк.дк307 p{margin:0}
 #lvis .дк.дк307 .реплика{display:grid;grid-template-columns:1fr 44px;gap:8px;background:none;border:20px solid transparent;border-image:url('img/l307/window-v2.webp') 15% 12% fill / 20px stretch;padding:2px 4px 6px;min-height:0;filter:drop-shadow(0 4px 7px #0c071c44)}
 #lvis .дк.дк307 .реплика .аватар{grid-column:1;grid-row:1;display:flex;flex-direction:row;justify-content:start;align-items:center;width:auto;gap:8px}
 #lvis .дк.дк307 .реплика .аватар img{height:42px;width:34px;object-fit:contain}#lvis .дк.дк307 .реплика .аватар span{font-size:16px;color:#705170}
 #lvis .дк.дк307 .реплика p{grid-column:1/-1;grid-row:2;font:600 18px/1.5 'NunitoДК',sans-serif;color:#443750}
 #lvis .дк.дк307 .слушать{grid-column:2;grid-row:1;width:44px;height:44px;min-height:44px;border:2px solid #c4a16b;border-radius:50%;background:linear-gradient(#9473a4,#5b416d);color:#fff3d4;font-size:20px;box-shadow:0 2px 0 #3c2c4b}
 #lvis .дк.дк307 .moon-chapter{display:flex;justify-content:space-between;gap:12px;color:#dec3e3;font-size:12px;letter-spacing:.04em;font-weight:800}
 #lvis .дк.дк307 .moon-heading{font:400 26px/1.25 'MoonHand307','NunitoДК',sans-serif;color:#f8e7c1;text-align:center;margin:0}
 #lvis .дк.дк307 .moon-game,#lvis .дк.дк307 .moon-practice{display:grid;gap:12px;min-width:0}
 #lvis .дк.дк307 .moon-stage{position:relative;aspect-ratio:1.6;overflow:hidden;border:3px solid #b99a69;border-radius:22px;box-shadow:0 4px 0 #3d284a,0 10px 22px #120d2580;isolation:isolate}
 #lvis .дк.дк307 .moon-backdrop{position:absolute;width:100%;height:100%;object-fit:cover;inset:0;z-index:-2}
 #lvis .дк.дк307 .moon-stage-title{position:absolute;top:8px;left:50%;transform:translateX(-50%);max-width:90%;white-space:nowrap;border:1px solid #aa8c66;border-radius:20px;padding:5px 12px;background:#332b43e8;color:#f8e6b7;font-size:10px;letter-spacing:.08em;font-weight:900}
 #lvis .дк.дк307 .moon-cast{position:absolute;inset:20% 5% 4%;display:flex;justify-content:space-around;align-items:end;gap:4px}
 #lvis .дк.дк307 .moon-actor{height:100%;flex:1;min-width:0;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:end}
 #lvis .дк.дк307 .moon-actor:before{content:'';position:absolute;bottom:24px;width:65%;height:9%;border-radius:50%;background:#2d172b66;filter:blur(3px);z-index:-1}
 #lvis .дк.дк307 .moon-actor>img{max-width:100%;width:auto;height:calc(100% - 25px);object-fit:contain;object-position:bottom;filter:drop-shadow(0 3px 2px #2a163966)}
 #lvis .дк.дк307 .moon-actor:nth-child(2)>img{height:calc(88% - 25px)}#lvis .дк.дк307 .moon-actor:nth-child(3)>img{height:calc(80% - 25px)}
 #lvis .дк.дк307 .moon-name{background:#fff0d2;color:#4c3b4b;border:1px solid #b69a6b;border-radius:10px;font-size:13px;line-height:20px;padding:0 10px;font-weight:900;z-index:2}
 #lvis .дк.дк307 .moon-held{position:absolute;left:0;bottom:23%;width:43%;height:36%;padding:2px;border-radius:12px;background:#fff1d9e8;border:1px solid #c9ad7b;animation:moon-place .3s ease-out both}
 #lvis .дк.дк307 .moon-held svg{width:100%;height:100%}#lvis .дк.дк307 .moon-prop{position:absolute;right:6px;top:38px;width:45px;height:45px;background:#fff3d8;border-radius:13px;padding:4px;border:2px solid #c7a879}
 #lvis .дк.дк307 .moon-prop svg{width:100%;height:100%}
 #lvis .дк.дк307 .moon-evidence{padding:15px 16px;background:linear-gradient(115deg,#fff8e8,#eadbc0);border:1px solid #c3a97d;box-shadow:inset 0 0 0 4px #fff8e566,0 3px 0 #574354;border-radius:18px;color:#4a3e50;display:grid;gap:9px}
 #lvis .дк.дк307 .moon-label{font-size:11px;font-weight:900;letter-spacing:.08em;color:#886188}
 #lvis .дк.дк307 .moon-evidence p{display:flex;align-items:center;gap:9px;font-size:17px;line-height:1.4;font-weight:700}
 #lvis .дк.дк307 .moon-evidence p>span{flex:0 0 25px;width:25px;height:25px;text-align:center;border-radius:50%;background:#775880;color:#fff5d8;font-size:14px;line-height:25px}
 #lvis .дк.дк307 .moon-evidence small{font-size:13px;color:#6d6170}#lvis .дк.дк307 .moon-evidence .conflict{color:#994c4c}
 #lvis .дк.дк307 button.moon-button,#lvis .дк.дк307 .число,#lvis .дк.дк307 .дальше-кн,#lvis .дк.дк307 .дт-подск,#screen:has(.дк307)>.btnrow>button,#screen:has(.дк307)>button{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;text-align:center;white-space:normal;min-height:56px;min-width:0;max-width:100%;padding:2px 10px 5px;border:solid transparent;border-width:10px 12px 20px;border-image:url('img/l307/button-v2.webp') 24% 12% 30% 12% fill / 10px 12px 20px stretch;background:none;box-shadow:none;color:#59415d;font:800 17px/1.3 'NunitoДК',sans-serif;cursor:pointer;touch-action:manipulation;filter:drop-shadow(0 3px 2px #150d2655);transition:transform .12s}
 #lvis .дк.дк307 button:focus-visible,#screen:has(.дк307) button:focus-visible{outline:3px solid #a8dbd0;outline-offset:3px}
 #lvis .дк.дк307 button:not(:disabled):active{transform:translateY(2px)}#lvis .дк.дк307 button:disabled{cursor:default;opacity:.65}
 #lvis .дк.дк307 button[aria-pressed=true]{outline:3px solid #e2b9ef;outline-offset:1px;filter:drop-shadow(0 0 6px #d6a1e6)}
 #lvis .дк.дк307 .moon-options{display:grid;gap:9px;grid-template-columns:1fr}
 #lvis .дк.дк307 .moon-options:has(.hero-choice),#lvis .дк.дк307 .item-options,#lvis .дк.дк307 .moon-items,#lvis .дк.дк307 .moon-destinations,#lvis .дк.дк307 .moon-select-actors,#lvis .дк.дк307 .moon-places,#lvis .дк.дк307 .moon-swap{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;min-width:0}
 #lvis .дк.дк307 .moon-items:has(>:last-child:nth-child(2)),#lvis .дк.дк307 .moon-destinations:has(>:last-child:nth-child(2)){grid-template-columns:repeat(2,minmax(0,1fr))}
 #lvis .дк.дк307 button.hero-choice,#lvis .дк.дк307 button.item-choice,#lvis .дк.дк307 .item-options button,#lvis .дк.дк307 button.destination,#lvis .дк.дк307 button.swap-card{flex-direction:column;padding:2px 1px 5px;gap:3px;font-size:16px}
 #lvis .дк.дк307 .hero-choice img{height:78px;width:100%;object-fit:contain}#lvis .дк.дк307 .item-options svg,#lvis .дк.дк307 .item-choice svg,#lvis .дк.дк307 .swap-card svg{height:48px;width:48px}
 #lvis .дк.дк307 .destination{min-height:78px!important}#lvis .дк.дк307 .destination span{font-size:14px}
 #lvis .дк.дк307 .moon-table{display:grid;grid-template-columns:60px repeat(3,minmax(0,1fr));gap:5px;padding:12px 8px;border-radius:20px;background:#ede0c8;border:2px solid #b29670;color:#514155;align-items:stretch}
 #lvis .дк.дк307 .moon-col{display:flex;flex-direction:column;align-items:center;gap:1px;font-size:12px;font-weight:900;justify-content:center}
 #lvis .дк.дк307 .moon-col svg{width:36px;height:36px}#lvis .дк.дк307 .moon-row-label,#lvis .дк.дк307 .moon-corner{display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:900}
 #lvis .дк.дк307 button.moon-cell{min-height:54px;border:1px solid #b9a17d;border-radius:11px;background:linear-gradient(#fffaf0,#f5ead5);padding:5px;font-size:25px;color:#82738a;filter:none}
 #lvis .дк.дк307 button.moon-cell.yes{background:#d9edcf;color:#356b4d;opacity:1}#lvis .дк.дк307 button.moon-cell.no{color:#a15c65;opacity:1}
 #lvis .дк.дк307 .moon-legend{font-size:13px;text-align:center;color:#e0d1e1}
 #lvis .дк.дк307 .moon-feedback,#lvis .дк.дк307 .готово,#lvis .дк.дк307 .разбор,#lvis .дк.дк307 .дт-совет{border:1px solid #bba184;border-left:5px solid #94729d;padding:13px 15px;background:#f9f0df;border-radius:15px;color:#514357;font:600 16px/1.45 'NunitoДК',sans-serif;min-height:52px}
 #lvis .дк.дк307 .moon-feedback.success,#lvis .дк.дк307 .готово{border-left-color:#6d9b80;background:#e9f2df;color:#3c6048}
 #lvis .дк.дк307 .moon-check-row{display:flex;justify-content:center}#lvis .дк.дк307 button.check-button{min-width:180px}
 #lvis .дк.дк307 button.moon-help{justify-self:center;font-size:14px;min-height:48px;color:#5e5a70}
 #lvis .дк.дк307 button.moon-place{flex-direction:column;gap:4px;padding:12px 3px 8px;border:3px solid #ba9a6e;border-radius:45px 45px 10px 10px;background:linear-gradient(90deg,#514052,#765b6c 49%,#4a374b);color:#fff1cf;box-shadow:inset 0 0 0 4px #927680;min-height:174px;font-size:14px}
 #lvis .дк.дк307 .order button.moon-place{border-radius:14px;background:linear-gradient(#638d88,#365957);box-shadow:inset 0 0 0 3px #90a9a0}
 #lvis .дк.дк307 .moon-place-portrait{height:90px;display:flex;align-items:center;justify-content:center;width:100%}#lvis .дк.дк307 .moon-place-portrait img{height:100%;max-width:100%;object-fit:contain;animation:moon-place .3s ease-out both}#lvis .дк.дк307 .moon-place-portrait>span{font-size:37px;opacity:.5}
 #lvis .дк.дк307 .moon-cues{display:flex;justify-content:center;gap:15px}#lvis .дк.дк307 .moon-cues>div{width:68px;display:flex;align-items:center;flex-direction:column;border-radius:14px;border:2px solid #8f7398;color:#ead8b6;padding:5px}#lvis .дк.дк307 .moon-cues svg{width:44px;height:44px}#lvis .дк.дк307 .moon-cues .current{border-color:#f4d382;background:#5f4a66}#lvis .дк.дк307 .moon-cues .played{background:#476961}
 #lvis .дк.дк307 .waiting{opacity:.22;filter:grayscale(1)}#lvis .дк.дк307 .moon-curtain{position:absolute;top:0;bottom:0;width:50%;background:repeating-linear-gradient(90deg,#4b294d,#754a70 14%,#3a223f 25%);z-index:-1;transition:transform 1.2s cubic-bezier(.23,1,.32,1)}#lvis .дк.дк307 .moon-curtain.left{left:0;transform:translateX(-80%)}#lvis .дк.дк307 .moon-curtain.right{right:0;transform:translateX(80%)}#lvis .дк.дк307 .is-complete .moon-curtain.left{transform:translateX(-100%)}#lvis .дк.дк307 .is-complete .moon-curtain.right{transform:translateX(100%)}
 #lvis .дк.дк307 .moon-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
 #lvis .дк.дк307 .число .окно{height:auto;min-height:0;padding:0!important;min-width:0;background:none;box-shadow:none;border:0;font:inherit;color:inherit;white-space:normal}
 #lvis .дк.дк307 .число.длин.длин .окно{font-size:17px}#lvis .дк.дк307 .дт-лента{background:#584160;border:1px solid #b7976f;border-radius:16px;padding:12px;color:#ffedc7;flex-wrap:wrap;gap:8px;font-size:15px}
 #lvis .дк.дк307 .дт-лента .зв{display:grid;grid-template-columns:repeat(6,15px);gap:3px}
 #lvis .дк.дк307:has(.moon-practice)>.числа,#lvis .дк.дк307:has(.moon-practice)>.готово,#lvis .дк.дк307:has(.moon-practice)>.дт-подсказки,#lvis .дк.дк307:has(.moon-practice)>.дт-совет,#lvis .дк.дк307:has(.moon-finale)>.готово{display:none}
 #lvis .дк.дк307 .moon-finale{display:grid;gap:15px;color:#f7e7bd;text-align:center}#lvis .дк.дк307 .moon-summary{display:grid;gap:8px;text-align:left;background:#48364e;padding:18px;border-radius:16px}#lvis .дк.дк307 .дт-итог{color:#f7e7bd}
 @keyframes moon-place{from{opacity:.2;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
 @media(max-width:360px){#lvis .дк.дк307 .реплика{border-width:16px;border-image-width:16px;padding:0 2px 5px}#lvis .дк.дк307 .реплика p{font-size:16px}#lvis .дк.дк307 .moon-heading{font-size:20px}#lvis .дк.дк307 .moon-table{grid-template-columns:48px repeat(3,minmax(0,1fr));gap:4px;padding:10px 6px}#lvis .дк.дк307 .moon-col{font-size:11px}#lvis .дк.дк307 button.moon-button{font-size:15px;padding-left:2px;padding-right:2px;border-width:10px 10px 20px}#lvis .дк.дк307 .moon-evidence{padding:13px 12px}#lvis .дк.дк307 .moon-stage-title{font-size:8px}#lvis .дк.дк307 .moon-name{font-size:12px}}
 @font-face{font-family:MoonTitle307;src:url('img/l307/Lobster-Regular.ttf') format('truetype');font-weight:400;font-display:swap}
 #lvis .дк.дк307 .moon-heading{font-family:MoonTitle307,cursive;font-size:27px;font-weight:400;line-height:1.25}
 #lvis .дк.дк307 .реплика p,#lvis .дк.дк307 .moon-feedback,#lvis .дк.дк307 .moon-evidence p,#lvis .дк.дк307 .готово,#lvis .дк.дк307 .разбор,#lvis .дк.дк307 .дт-совет{font-family:MoonHand307,sans-serif;font-weight:400;font-size:18px;line-height:1.45}
 #lvis .дк.дк307 button.moon-button,#lvis .дк.дк307 .число,#lvis .дк.дк307 .дальше-кн,#lvis .дк.дк307 .дт-подск,#screen:has(.дк307)>.btnrow>button,#screen:has(.дк307)>button{font-family:MoonHand307,sans-serif;font-weight:400;font-size:18px}
 #lvis .дк.дк307 .moon-name,#lvis .дк.дк307 .moon-col,#lvis .дк.дк307 .moon-row-label,#lvis .дк.дк307 .moon-legend{font-family:MoonHand307,sans-serif;font-weight:400}
 #lvis .дк.дк307 .item-options button,#lvis .дк.дк307 button.item-choice,#lvis .дк.дк307 button.swap-card{padding-bottom:7px;min-height:110px}
 #lvis .дк.дк307 button.destination{padding-top:5px;padding-bottom:8px;min-height:88px}
 #lvis .дк.дк307 button strong{font-weight:400}
 @media(max-width:360px){#lvis .дк.дк307 .реплика p,#lvis .дк.дк307 .moon-feedback,#lvis .дк.дк307 .moon-evidence p{font-size:17px}#lvis .дк.дк307 button.item-choice,#lvis .дк.дк307 .item-options button,#lvis .дк.дк307 button.swap-card{font-size:16px}#lvis .дк.дк307 .moon-heading{font-size:25px}}
 #lvis .дк.дк307 button.moon-place{font-size:15px;padding-left:2px;padding-right:2px;border-width:3px;line-height:1.25}
 #lvis .дк.дк307 .число.верно:after,#lvis .дк.дк307 .число.мимо:after{right:1px;top:1px;width:18px;height:18px;font-size:12px;line-height:18px}
 #lvis .дк.дк307 .moon-finale h3{font:400 28px/1.25 MoonTitle307,cursive;margin:0}
 #lvis .дк.дк307 .moon-finale p,#lvis .дк.дк307 .moon-summary{font:400 19px/1.45 MoonHand307,sans-serif}
 #screen:has(.дк307)>h2{font-family:MoonTitle307,cursive;font-size:24px;font-weight:400;line-height:1.3}
 #lvis .дк.дк307 .реплика .аватар span{font-family:MoonHand307,sans-serif;font-weight:400;font-size:18px}
 #lvis .дк.дк307 .is-complete .moon-curtain.left{animation:moon-curtain-left 1.2s ease-out both}
 #lvis .дк.дк307 .is-complete .moon-curtain.right{animation:moon-curtain-right 1.2s ease-out both}
 @keyframes moon-curtain-left{from{transform:translateX(-80%)}to{transform:translateX(-100%)}}
 @keyframes moon-curtain-right{from{transform:translateX(80%)}to{transform:translateX(100%)}}
 @media(prefers-reduced-motion:reduce){#lvis .дк.дк307 *{animation:none!important;transition:none!important}}
 `;document.head.appendChild(css);
})();
