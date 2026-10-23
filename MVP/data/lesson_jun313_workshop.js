/* 313 · Мастерская заводных чудес. Native lesson with explicit place-value exchange. */
(function(){
'use strict';
if(!window.ДК)return;
const ID=313,A='img/l313/',actors=['Тая','Болт'],keys=['taya','bolt'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const portrait=(i,pose='idle')=>`<img src="${A}${keys[i]}-${pose}.webp" alt="" draggable="false">`;
const scenes=[
{t:'Заказ из сада чудес',who:0,kind:'align',a:34,b:5,q:'Я Тая! Мы с Болтом собираем заводные игрушки. На верстаке 34 детали, принесли ещё 5. Поставь пятёрку в нужный разряд: под десятками или под единицами?',hint:'В числе 5 нет десятков. Поставь 5 под цифрой 4, в столбец единиц.',sol:'Верно! Единицы стоят под единицами. Так мы складываем одинаковые разряды.',toy:'bird'},
{t:'Первые крылья',who:1,kind:'calc',op:'+',a:34,b:25,q:'Я Болт! Для крыльев есть 34 золотые и 25 зелёных деталей. Сложим их столбиком. Сначала считаем единицы справа, потом десятки слева.',hint:'Четыре плюс пять — девять единиц. Три плюс два — пять десятков. Получится 59.',sol:'59 деталей! Крылья собраны. Каждый разряд занял своё место.',toy:'bird'},
{t:'Секрет коробочки',who:1,kind:'bundle',n:13,q:'В коробочке 13 маленьких шестерёнок. Выбери ровно десять и собери из них десяток. Повторное нажатие снимает выбор.',hint:'Отметь десять шестерёнок. После обмена получатся один десяток и три отдельные единицы.',sol:'13 единиц — это 1 десяток и 3 единицы. Количество не изменилось!',toy:'bird'},
{t:'Заведи певчую птицу',who:0,kind:'calc',op:'+',a:36,b:27,q:'Теперь соединяем 36 и 27 деталей. В единицах получится больше девяти! Собери из десяти единиц новый десяток и перенеси его к десяткам.',hint:'Шесть плюс семь — 13. Три пишем в единицы, один десяток переносим. Три плюс два плюс один — шесть.',sol:'36 плюс 27 равно 63! Новый десяток не потерялся. Птица готова петь!',toy:'bird'},
{t:'Куда пропал десяток?',who:1,kind:'repair',a:36,b:27,wrong:53,result:63,q:'На чертеже записали 36 + 27 = 53. Единицы верные, а десяток после обмена забыли. Исправь только цифру десятков в ответе.',hint:'К трём и двум десяткам надо прибавить ещё один. В ответе должно быть шесть десятков.',sol:'Получилось 63. Перенесённая единичка означает целый десяток!',toy:'butterfly'},
{t:'Лёгкие крылья бабочки',who:0,kind:'calc',op:'−',a:68,b:24,q:'В механизме бабочки 68 деталей. Уберём 24 лишние, чтобы крылья стали легче. Сначала вычтем единицы, потом десятки.',hint:'Восемь минус четыре — четыре. Шесть минус два — четыре. Останется 44.',sol:'68 минус 24 равно 44. Здесь единиц хватило, размен не понадобился.',toy:'butterfly',bg:'garden'},
{t:'Открой один десяток',who:1,kind:'split',n:52,q:'Есть 5 десятков и 2 единицы. Нам понадобятся отдельные детали. Нажми «Открыть 1 десяток»: он превратится в десять единиц. Затем посчитай все единицы.',hint:'Один десяток разменяли. Осталось четыре десятка, а единиц стало двенадцать: десять и ещё две.',sol:'52 — это и 5 десятков 2 единицы, и 4 десятка 12 единиц. Число осталось тем же!',toy:'butterfly'},
{t:'Освободи крылья',who:0,kind:'calc',op:'−',a:52,b:27,q:'Из 52 деталей нужно убрать 27. Двух единиц не хватает, чтобы убрать семь. Разменяй один десяток и продолжи вычисление.',hint:'Пять десятков превратятся в четыре, две единицы — в двенадцать. Двенадцать минус семь — пять. Четыре минус два — два.',sol:'52 минус 27 равно 25. Мы уменьшили десятки после размена — и всё сошлось!',toy:'butterfly',bg:'garden'},
{t:'Проверка перед полётом',who:1,kind:'choose',opts:['25 + 27 = 52','25 − 27 = 52','52 + 27 = 25'],answer:0,q:'Мы получили 52 − 27 = 25. Выбери проверку: к оставшимся деталям верни те, что убрали. Должно получиться исходное количество.',hint:'К 25 оставшимся прибавь 27 снятых. Получится 52 — столько было сначала.',sol:'25 плюс 27 равно 52! Сложение помогло проверить вычитание.',toy:'butterfly',bg:'garden'},
{t:'Паровозик отправляется!',who:0,kind:'calc',op:'−',a:54,b:28,q:'Последний заказ! Из 54 деталей 28 ушли на паровозик. Узнай, сколько осталось для вагончика. Действуй по разрядам и помни про размен.',hint:'После размена: четыре десятка и четырнадцать единиц. Четырнадцать минус восемь — шесть, четыре минус два — два.',sol:'Осталось 26 деталей. Птица поёт, бабочка летит, паровозик едет! Впереди твои собственные заказы.',toy:'train',bg:'garden'}
];
const tasks=[
{t:'Разложи детали по местам',who:0,kind:'align',a:42,b:7,q:'В мастерской 42 винтика и ещё 7. Найди место для семёрки в столбике.',hint:'Семь — это единицы. Поставь 7 под цифрой 2.',sol:'Единицы под единицами! Столбик готов к работе.',series:0,toy:'bird'},
{t:'Собери певчую птицу',who:1,kind:'calc',op:'+',a:23,b:46,q:'Для новой птицы соединяем 23 и 46 деталей. Вычисли по разрядам.',hint:'Три плюс шесть — девять. Два плюс четыре — шесть. Получится 69.',sol:'69 деталей. Птичка запела!',series:0,toy:'bird'},
{t:'Упакуй шестерёнки',who:1,kind:'bundle',n:16,q:'Из 16 шестерёнок собери ровно один десяток. Сколько останется отдельно?',hint:'Выбери десять. Шесть останутся вне десятка.',sol:'Один десяток и шесть единиц — это 16. Ничего не потерялось.',series:0,toy:'bird'},
{t:'Золотой заводной ключ',who:0,kind:'calc',op:'+',a:45,b:38,q:'Ключ собирается из 45 и 38 деталей. Не забудь перенести новый десяток!',hint:'Пять плюс восемь — 13. Единицы: три. Десятки: четыре плюс три плюс один — восемь.',sol:'83! Ты учёл новый десяток. Ключ готов.',series:0,toy:'bird'},
{t:'Размен для бабочки',who:1,kind:'split',n:61,q:'В ящике 61 деталь. Открой один десяток и посчитай единицы после размена.',hint:'Шесть десятков станут пятью. Одна единица и ещё десять — одиннадцать.',sol:'Пять десятков и одиннадцать единиц — по-прежнему 61.',series:1,toy:'butterfly'},
{t:'Убери лишний груз',who:0,kind:'calc',op:'−',a:76,b:32,q:'Из 76 деталей убери 32. Реши столбиком, чтобы облегчить крылья.',hint:'Шесть минус два — четыре, семь минус три — четыре.',sol:'44 детали! Крылья стали легче.',series:1,toy:'butterfly'},
{t:'Освободи пружинку',who:1,kind:'calc',op:'−',a:63,b:28,q:'Для пружинки надо найти разность 63 и 28. Единиц мало — что поможет?',hint:'Разменяй десяток. Тринадцать минус восемь — пять, пять минус два — три.',sol:'35! Размен помог выполнить вычитание.',series:1,toy:'butterfly'},
{t:'Десяток посчитали дважды',who:0,kind:'repair',a:52,b:27,op:'−',wrong:35,result:25,q:'Болт разменял десяток, но записал 52 − 27 = 35. Он забыл уменьшить число десятков. Исправь цифру десятков в ответе.',hint:'После размена осталось четыре десятка. Четыре минус два — два, а не три.',sol:'Правильный ответ — 25. Разменянный десяток больше нельзя считать в десятках!',series:1,toy:'butterfly'},
{t:'Ноль — тоже цифра',who:1,kind:'calc',op:'+',a:46,b:24,q:'Собери двигатель паровозика: 46 плюс 24. В единицах получится ровно десять. Что запишешь после обмена?',hint:'Десять единиц станут десятком, отдельно останется ноль. Четыре плюс два плюс один — семь.',sol:'70! Ноль в единицах удерживает правильное место семёрки.',series:2,toy:'train',bg:'garden'},
{t:'Размен из круглого числа',who:0,kind:'calc',op:'−',a:70,b:26,q:'Было 70 деталей, 26 поставили на колёса. Узнай остаток. Отдельных единиц пока нет, но есть десятки!',hint:'Разменяй один из семи десятков. Десять минус шесть — четыре, шесть минус два — четыре.',sol:'44! Даже если единиц было ноль, десяток можно разменять.',series:2,toy:'train',bg:'garden'},
{t:'Проверь заказ Болта',who:1,kind:'choose',opts:['35 + 28 = 63','35 + 28 = 53','63 + 28 = 35'],answer:0,q:'Ты нашёл 63 − 28 = 35. Выбери верную проверку сложением.',hint:'Верни 28 снятых деталей к 35 оставшимся. Должно получиться 63.',sol:'Проверка сошлась: 35 плюс 28 равно 63.',series:2,toy:'train',bg:'garden'},
{t:'Большой выезд из мастерской',who:0,kind:'calc',op:'+',a:47,b:36,q:'Финальный заказ: 47 деталей вагончика и 36 деталей мостика. Сосчитай всё и отправь игрушечный поезд в сад!',hint:'Семь плюс шесть — 13. Три пишем, десяток переносим. Четыре плюс три плюс один — восемь.',sol:'83 детали! Ты считаешь по разрядам, умеешь переносить и разменивать десяток. Мастерская гордится тобой!',series:2,toy:'train',bg:'garden'}
];
const series=['Певчие механизмы','Крылатые изобретения','Железная дорога чудес'];
const tens=n=>Math.floor(n/10),ones=n=>n%10;
function initial(c){return {ok:false,fb:'',picked:null,selected:[],stage:c.kind==='calc'&&c.op==='−'&&ones(c.a)<ones(c.b)?'borrow':'units',entry:'',exchanged:false,unit:null,ten:null};}
function finish(c,s){s.ok=true;s.fb=c.sol;}
function expected(c,s){if(c.kind==='split')return ones(c.n)+10;if(c.kind==='repair')return tens(c.result);if(s.stage==='units')return c.op==='+'?ones(c.a)+ones(c.b):ones(c.a)+(s.exchanged?10:0)-ones(c.b);if(s.stage==='write')return ones(c.a+c.b);if(s.stage==='tens')return c.op==='+'?tens(c.a)+tens(c.b)+(s.exchanged?1:0):tens(c.a)-tens(c.b)-(s.exchanged?1:0);return null;}
function apply(c,s,a,v){
 if(s.ok)return false;
 if(a==='hint'){s.fb=c.hint;return true;}
 if(a==='choose'&&c.kind==='choose'&&Number.isInteger(v)&&v>=0&&v<c.opts.length){s.picked=v;if(v===c.answer)finish(c,s);else s.fb=c.hint;return true;}
 if(a==='place'&&c.kind==='align'&&['tens','units'].includes(v)){s.picked=v;if(v==='units')finish(c,s);else s.fb=`${c.b} — единицы. Поставь цифру в правый столбец, под ${ones(c.a)}.`;return true;}
 if(c.kind==='bundle'){
  if(a==='toggle'&&Number.isInteger(v)&&v>=0&&v<c.n){s.selected.includes(v)?s.selected=s.selected.filter(x=>x!==v):s.selected.push(v);s.fb=`Выбрано: ${s.selected.length}. Нужны ровно 10.`;return true;}
  if(a==='exchange'){if(s.selected.length!==10)s.fb='Выбери ровно десять шестерёнок. Лишнюю можно снять повторным нажатием.';else{s.exchanged=true;finish(c,s);}return true;}
 }
 if(a==='exchange'&&!s.exchanged&&(c.kind==='split'||(c.kind==='calc'&&['borrow','exchange'].includes(s.stage)))){s.exchanged=true;s.stage=c.op==='+'?'write':'units';s.entry='';s.fb=c.op==='+'?'Десять единиц ушли в десятки. Запиши, сколько единиц осталось.':`Один десяток стал десятью единицами. Теперь ${tens(c.n??c.a)-1} дес. и ${ones(c.n??c.a)+10} ед.`;return true;}
 const canType=['repair'].includes(c.kind)||(c.kind==='split'&&s.exchanged)||(c.kind==='calc'&&['units','write','tens'].includes(s.stage));
 if(!canType)return false;
 if(a==='digit'&&Number.isInteger(v)&&v>=0&&v<=9){if(s.entry.length<2)s.entry=s.entry==='0'?String(v):s.entry+v;s.fb='Нажми «Проверить». Последнюю цифру можно стереть.';return true;}
 if(a==='erase'){s.entry=s.entry.slice(0,-1);s.fb='Исправь число и проверь ещё раз.';return true;}
 if(a==='check'){
  if(s.entry===''){s.fb='Сначала набери ответ на кнопках с цифрами.';return true;}
  const want=expected(c,s);if(Number(s.entry)!==want){s.fb=c.kind==='repair'?c.hint:'Пока не сходится. Посмотри на выделенный разряд и попробуй ещё. Подсказка поможет.';s.entry='';return true;}
  s.entry='';if(c.kind==='split'||c.kind==='repair'){finish(c,s);return true;}
  if(s.stage==='units'&&c.op==='+'&&want>=10){s.stage='exchange';s.fb=`Получилось ${want} единиц. Собери 10 из них в новый десяток.`;}
  else if(['units','write'].includes(s.stage)){s.unit=want;s.stage='tens';s.fb=`В единицах записали ${want}. Теперь посчитай десятки${s.exchanged?(c.op==='+'?' вместе с перенесённым десятком.':' — после размена их стало на один меньше.'):'.'}`;}
  else{s.ten=want;finish(c,s);}return true;
 }
 return false;
}
function nextAction(c,s){
 if(c.kind==='align')return `Поставь ${c.b} под единицами — в правую ячейку.`;
 if(c.kind==='bundle')return 'Нажимай на шестерёнки, пока не выберешь десять. Затем собери десяток.';
 if(c.kind==='split')return s.exchanged?'Посчитай отдельные шестерёнки и набери ответ.':'Открой один десяток и посмотри, что изменится.';
 if(c.kind==='repair')return 'Набери только исправленную цифру десятков.';
 if(c.kind==='choose')return 'Найди запись, которая вернёт снятые детали на место.';
 return s.stage==='borrow'?'Единиц не хватает. Разменяй один десяток.':s.stage==='exchange'?'Перенеси десять единиц в столбец десятков.':s.stage==='tens'?'Теперь посчитай десятки и набери ответ.':'Сначала посчитай единицы справа и набери ответ.';
}
const gear=()=>'<svg viewBox="0 0 40 40" aria-hidden="true"><path d="m16 2 8 0 1 6 5-3 5 5-3 5 6 1v8l-6 1 3 5-5 5-5-3-1 6h-8l-1-6-5 3-5-5 3-5-6-1v-8l6-1-3-5 5-5 5 3Z" fill="#d7ad54" stroke="#86622c" stroke-width="1.4"/><circle cx="20" cy="20" r="7" fill="#fff1bd" stroke="#86622c" stroke-width="2"/></svg>';
function toy(kind){return `<img class="work-toy" src="${A}${kind}.webp" alt="${kind==='bird'?'Заводная птица':kind==='butterfly'?'Механическая бабочка':'Игрушечный паровоз'}" draggable="false">`;}
function cast(c,s){const members=c.finale?[0,1]:[c.who];return `<div class="work-cast ${s.ok?'is-ready':''}" style="--world:url('${A}${c.bg||'workshop'}.webp')">${members.map(i=>`<div>${portrait(i,s.ok?'happy':s.exchanged||s.picked!==null||s.selected.length||s.unit!==null?'action':'idle')}<span>${actors[i]}</span></div>`).join('')}<div class="work-project">${toy(c.toy||'train')}<span>${s.ok?'Готово!':'Заказ мастерской'}</span></div></div>`;}
function renderGame(c,s,scope,i){
 const b=(txt,a,v=null,cls='',disabled=false)=>`<button type="button" class="work-button ${cls}" onclick="WORK313.act('${scope}',${i},'${a}',${JSON.stringify(v)?.replace(/"/g,'&quot;')})"${a==='toggle'?` aria-pressed="${s.selected.includes(v)}"`:''}${a==='place'?` aria-label="${v==='tens'?'Поставить под десятками':'Поставить под единицами'}"`:''}${disabled?' disabled':''}>${txt}</button>`;
 const units=n=>Array.from({length:n},()=>`<span class="work-unit">${gear()}</span>`).join('');
 const rod=()=>`<span class="work-rod" aria-label="1 десяток">${'<i></i>'.repeat(10)}<small>10</small></span>`;
 const number=(n,split=false)=>`<div class="work-inventory"><div><b>${tens(n)-(split?1:0)} дес.</b><div>${Array.from({length:tens(n)-(split?1:0)},rod).join('')}</div></div><div><b>${ones(n)+(split?10:0)} ед.</b><div>${units(ones(n)+(split?10:0))}</div></div></div>`;
 const cell=(v,cls='')=>`<span class="work-digit ${cls}">${v}</span>`;
 let work='',typing=false;
 if(c.kind==='align')work=`<p class="work-note">${c.a} + ${c.b} · Куда поставить ${c.b}?</p><div class="work-column"><span></span><small>Десятки</small><small>Единицы</small><span></span>${cell(tens(c.a))}${cell(ones(c.a))}<span>+</span>${b(s.ok?'—':'Сюда?','place','tens','slot',s.ok)}${b(s.ok?c.b:'Сюда?','place','units','slot',s.ok)}</div><div class="work-chip">Цифра: ${c.b}</div>`;
 if(c.kind==='calc'){
  const carry=s.exchanged&&c.op==='+';const borrow=s.exchanged&&c.op==='−';const high=s.stage==='tens'?'tens':'units';
  work=`<p class="work-note">${c.a} ${c.op} ${c.b} · ${s.ok?'Механизм готов':high==='tens'?'Считаем десятки':'Начинаем с единиц'}</p><div class="work-column"><span></span><small>Десятки</small><small>Единицы</small><span></span>${cell(carry?'+1 дес.':borrow?`${tens(c.a)-1} дес.`:'','annotation')}${cell(borrow?`${ones(c.a)+10} ед.`:'','annotation')}<span></span>${cell(tens(c.a),borrow?'old':'')}${cell(ones(c.a),borrow?'old':'')}<span>${c.op}</span>${cell(tens(c.b),high==='tens'?'active':'')}${cell(ones(c.b),high==='units'?'active':'')}<div class="work-rule"></div><span>=</span>${cell(s.ten??'?','result '+(high==='tens'&&!s.ok?'active':''))}${cell(s.unit??'?','result '+(high==='units'&&!s.ok?'active':''))}</div>`;
  if(s.stage==='borrow')work+=number(c.a)+b('Разменять 1 десяток','exchange',null,'primary');
  if(s.stage==='exchange')work+=`<div class="work-unit-bank">${units(ones(c.a)+ones(c.b))}</div><p class="work-note">${ones(c.a)+ones(c.b)} единиц → 1 десяток и ${ones(c.a+c.b)} ед.</p>`+b('Перенести 10 единиц в десятки','exchange',null,'primary');
  if(!s.ok&&!['borrow','exchange'].includes(s.stage)){
   const formula=s.stage==='write'?`${ones(c.a)+ones(c.b)} − 10 = ?`:s.stage==='units'?`${ones(c.a)+(borrow?10:0)} ${c.op} ${ones(c.b)} = ?`:`${tens(c.a)-(borrow?1:0)} ${c.op} ${tens(c.b)}${carry?' + 1':''} = ?`;
   work+=`<p class="work-formula">${formula}</p>`;typing=true;
  }
  if(s.ok)work+=`<div class="work-equation">${c.a} ${c.op} ${c.b} = ${s.ten*10+s.unit}</div>`;
 }
 if(c.kind==='bundle')work=s.ok?`<div class="work-exchanged">${rod()}<strong>+</strong>${units(c.n-10)}</div><p class="work-note">1 десяток + ${c.n-10} ед. = ${c.n}</p>`:`<p class="work-note">Выбрано ${s.selected.length} из 10</p><div class="work-gear-grid">${Array.from({length:c.n},(_,j)=>b(`${gear()}<span class="work-sr">Шестерёнка ${j+1}</span>`,'toggle',j,s.selected.includes(j)?'chosen':'')).join('')}</div>`+b('Собрать десяток','exchange',null,'primary');
 if(c.kind==='split'){work=number(c.n,s.exchanged);if(!s.exchanged)work+=b('Открыть 1 десяток','exchange',null,'primary');else if(!s.ok){work+='<p class="work-note">Сколько теперь отдельных единиц?</p>';typing=true;}}
 if(c.kind==='repair'){work=`<p class="work-equation">${c.a} ${c.op||'+'} ${c.b} = <span class="${s.ok?'':'work-error'}">${s.ok?c.result:c.wrong}</span></p><p class="work-note">${s.ok?'Чертёж исправлен':'Какую цифру запишем в десятки ответа?'}</p>`;typing=!s.ok;}
 if(c.kind==='choose')work=`<div class="work-options">${c.opts.map((o,j)=>b(o,'choose',j,s.picked===j?'chosen':'',s.ok)).join('')}</div>`;
 if(typing)work+=`<output class="work-entry" aria-label="Твой ответ">${s.entry||'…'}</output><div class="work-keypad">${[1,2,3,4,5,6,7,8,9].map(n=>b(n,'digit',n)).join('')}${b(0,'digit',0,'zero')}${b('Стереть','erase',null,'erase')}${b('Проверить','check',null,'check')}</div>`;
 return `<div class="work-game" data-game="${c.kind}">${cast(c,s)}<div class="work-work work-surface-${c.kind}">${work}</div><p class="work-feedback ${s.ok?'success':''}" role="status" aria-live="polite">${esc(s.fb||nextAction(c,s))}</p>${s.ok?'':b('Нужна подсказка','hint',null,'work-help')}</div>`;
}
function restoreSolved(c,s){Object.assign(s,initial(c));if(c.kind==='calc'){s.exchanged=c.op==='+'?ones(c.a)+ones(c.b)>=10:ones(c.a)<ones(c.b);const result=c.op==='+'?c.a+c.b:c.a-c.b;s.ten=tens(result);s.unit=ones(result);s.stage='tens';}if(c.kind==='split'||c.kind==='bundle')s.exchanged=true;if(c.kind==='choose')s.picked=c.answer;if(c.kind==='align')s.picked='units';finish(c,s);}
const answer=t=>t.kind==='choose'?t.answer:1;
tasks.forEach(t=>{t.opts||=['Ещё думаю','Готово','Нужна помощь'];t.answer=answer(t);});
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="work-chapter"><span>Заказ ${i+1} из ${scenes.length}</span><span>${c.toy==='bird'?'Певчая птица':c.toy==='butterfly'?'Заводная бабочка':'Паровозик'}</span></div><h3 class="work-heading">${c.t}</h3>`+renderGame(c,s,'story',i),делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function practiceState(i){const rec=lrec();rec.workshop||={version:1,frames:{}};rec.workshop.practice||={};return rec.workshop.practice[i]||=initial(tasks[i]);}
function act(scope,i,a,v){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i))return;
 window.WORK313_AUDIO?.stop();
 if(scope==='story'){if(LV.phase!=='explain'||LV.step!==i||!scenes[i])return;ДК.клик(ID,'action',a,v);if(a==='hint')window.WORK313_AUDIO?.playKey('frame-'+i+'-hint');return;}
 if(scope!=='practice'||LV.phase!=='tasks'||LV.task!==i||!tasks[i]||lrec().tasks.includes(i))return;
 const s=practiceState(i);if(!apply(tasks[i],s,a,v))return;save();if(s.ok)lvPick(tasks[i].answer);else{if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();if(a==='hint')window.WORK313_AUDIO?.playKey('task-'+i+'-hint');}
}
const practice=(t,i)=>{const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(t,s);return `<div class="work-practice"><div class="work-chapter"><span>${series[t.series]}</span><span>${i%4+1} / 4</span></div><h3 class="work-heading">${t.t}</h3>${renderGame(t,s,'practice',i)}</div>`;};
window.WORK313={scenes,frames,tasks,initial,apply,act,restoreSolved,renderGame,restart(){if(LV.id!==ID)return;CHS[lidKey(ID)]={п:{}};LV.phase='explain';LV.step=0;renderLessonView();}};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:Object.fromEntries(keys.map((k,i)=>[k,{имя:actors[i],ф:k+'-idle',позы:{action:k+'-action',happy:k+'-happy'}}])),фоны:['workshop'],кадры:frames,
 запись:{title:'Столбик · Мастерская заводных чудес',ico:'⚙️',subj:'jun',src:'Начальная школа · 2 класс · Письменные приёмы',check:{q:'В примере 36 + 27 получилось 13 единиц. Что делаем дальше?',choices:['Пишем 13 в клетке единиц','Пишем 3 в единицы, 1 десяток переносим к десяткам','Пишем 3, а десяток убираем'],ans:1,exp:'13 единиц — это 1 десяток и 3 единицы. Десяток переносим и учитываем при сложении десятков.'},tasks:tasks.map(t=>({q:t.q,kind:'choice',choices:t.opts,ans:t.answer,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
 тренажёр:{герой:'taya',проверка:{картинка:()=>`<div class="work-quiz-art">${portrait(1,'action')}</div>`,итог:'13 единиц — это 1 десяток и 3 единицы. Новый десяток обязательно учитываем.'},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),разборы:Object.fromEntries(t.opts.map(v=>[v,t.hint])),итог:t.sol})),финал:()=>`<div class="work-finale">${cast({who:0,bg:'garden',finale:true,toy:'train'},{ok:true})}<h3>Мастер заводных чудес!</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button><p>Все 12 заказов готовы. Сад ожил!</p><div class="work-summary"><span>✓ Ставишь единицы под единицами</span><span>✓ Переносишь и размениваешь десяток</span><span>✓ Проверяешь вычитание сложением</span></div></div>`}
});
let restored=false,lastSaved='';const renderer=WAVE_B[ID];
WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const old=DB.lessons?.[ID]?.workshop;if(old?.version===1&&old.frames)CHS[k].п=JSON.parse(JSON.stringify(old.frames));restored=true;}renderer(el);if(LV.phase==='explain'&&LV.step===0&&CHS[k].п?.[0]?.ok)el.querySelector('.дк313')?.insertAdjacentHTML('beforeend','<button class="work-button" onclick="WORK313.restart()">Повторить историю</button>');sync();};
function sync(){if(LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{};const can=LV.phase!=='explain'||p[LV.step]?.ok;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});const s=JSON.stringify(p);if(s!==lastSaved){DB.lessons||={};DB.lessons[ID]||={tasks:[],stars:0,done:false};DB.lessons[ID].workshop={...DB.lessons[ID].workshop,version:1,frames:JSON.parse(s)};lastSaved=s;save();}}
window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
const css=document.createElement('style');css.textContent=`
@font-face{font-family:WorkHand313;src:url('fonts/Pangolin-ru.woff2') format('woff2');font-display:swap}
@font-face{font-family:WorkTitle313;src:url('img/l307/Lobster-Regular.ttf') format('truetype');font-display:swap}
body:has(.дк313) #asst,#screen:has(.дк313)>.card>.arch{display:none}
#screen:has(.дк313)>.card{padding:6px;background:transparent;border:0}
#screen:has(.дк313)>h2{max-width:650px;margin:12px auto;color:#f8e9ba;font:400 25px/1.3 WorkTitle313,cursive}
#lvis .дк.дк313{width:100%;max-width:650px;min-width:0;margin:auto;gap:14px;--чернила:#274650;--контур:#9b8658;font-family:WorkHand313,sans-serif}
#lvis .дк.дк313 *{box-sizing:border-box}#lvis .дк.дк313 p{margin:0}
#lvis .дк.дк313 .реплика{display:grid;grid-template-columns:1fr 44px;gap:7px;background:none;border:20px solid transparent;border-image:url('img/l313/panel.webp') 14% 9% fill / 20px stretch;padding:4px 5px 7px;min-height:0;filter:drop-shadow(0 3px 4px #1117)}
#lvis .дк.дк313 .реплика .аватар{grid-column:1;grid-row:1;display:flex;align-items:center;flex-direction:row;gap:8px;width:auto;justify-content:start}
#lvis .дк.дк313 .реплика .аватар img{height:44px;width:35px;object-fit:contain}#lvis .дк.дк313 .реплика .аватар span{font:18px WorkHand313;color:#557159}
#lvis .дк.дк313 .реплика p{grid-column:1/-1;grid-row:2;font:18px/1.45 WorkHand313,sans-serif;color:#284753}
#lvis .дк.дк313 .слушать{grid-column:2;grid-row:1;width:44px;height:44px;min-height:44px;padding:0;border:2px solid #b9a363;border-radius:50%;background:linear-gradient(#5f9aab,#285c6a);color:#fff7d7;font-size:20px;box-shadow:0 2px 0 #294c3b}
#lvis .дк.дк313 .work-chapter{display:flex;justify-content:space-between;gap:12px;color:#c1e6e4;font:16px/1.4 WorkHand313,sans-serif;letter-spacing:0}
#lvis .дк.дк313 .work-heading{font:400 27px/1.25 WorkTitle313,cursive;color:#fae9ba;text-align:center;margin:0}
#lvis .дк.дк313 .work-game,#lvis .дк.дк313 .work-practice{display:grid;gap:12px;min-width:0}
#lvis .дк.дк313 .work-cast{height:clamp(180px,35vw,260px);display:flex;justify-content:center;gap:16px;align-items:end;margin-bottom:9px;padding:25px 12px 9px;background-image:var(--world);background-size:cover;background-position:center bottom;border-radius:12px;box-shadow:inset 0 -12px 15px #95764c33}
#lvis .дк.дк313 .work-cast>div{position:relative;height:100%;display:flex;align-items:center;justify-content:end;flex-direction:column;min-width:50px}
#lvis .дк.дк313 .work-cast>div:before{content:'';position:absolute;bottom:18px;width:65px;height:10px;background:#352c2366;border-radius:50%;filter:blur(3px)}
#lvis .дк.дк313 .work-cast img{height:calc(100% - 20px);max-width:100%;object-fit:contain;z-index:1}#lvis .дк.дк313 .work-cast span{font-size:14px;line-height:19px;background:#fff3d2;color:#435a42;border-radius:10px;padding:0 9px;z-index:2}
#lvis .дк.дк313 button.work-button,#lvis .дк.дк313 .число,#lvis .дк.дк313 .дальше-кн,#lvis .дк.дк313 .дт-подск,#screen:has(.дк313)>.btnrow>button,#screen:has(.дк313)>button{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;text-align:center;white-space:normal;min-height:54px;min-width:0;max-width:100%;padding:5px 7px;border:12px solid transparent;border-image:url('img/l313/button.webp') 25% 12% fill / 12px stretch;background:none;box-shadow:none;color:#234f58;font:400 18px/1.3 WorkHand313,sans-serif;cursor:pointer;touch-action:manipulation;filter:drop-shadow(0 2px 2px #213b302b);transition:transform .12s}
#lvis .дк.дк313 button.chosen:disabled{outline:3px solid #609472;outline-offset:2px;opacity:1}#lvis .дк.дк313 button:focus-visible,#screen:has(.дк313) button:focus-visible{outline:3px solid #2e867b;outline-offset:3px}
#lvis .дк.дк313 button:not(:disabled):active{transform:translateY(2px)}#lvis .дк.дк313 button:disabled{opacity:.65;cursor:default}
#lvis .дк.дк313 .work-feedback,#lvis .дк.дк313 .готово,#lvis .дк.дк313 .разбор,#lvis .дк.дк313 .дт-совет{padding:14px;border:1px solid #bca67c;border-left:5px solid #c0a064;border-radius:15px;background:#fbf3dc;color:#304b58;font:18px/1.45 WorkHand313,sans-serif;min-height:54px}
#lvis .дк.дк313 .work-feedback.success{border-left-color:#6c9775;background:#e6efda}#lvis .дк.дк313 button.work-help{justify-self:center;min-height:48px;font-size:16px}
#lvis .дк.дк313 .число .окно{height:auto;min-height:0;padding:0!important;min-width:0;background:none;box-shadow:none;border:0;font:inherit;color:inherit;white-space:normal}#lvis .дк.дк313 .число.длин.длин .окно{font-size:18px}
#lvis .дк.дк313 .число.верно:after,#lvis .дк.дк313 .число.мимо:after{right:1px;top:1px;width:18px;height:18px;font-size:12px;line-height:18px}
#lvis .дк.дк313 .дт-лента{background:#425e4b;border:1px solid #b2a16c;border-radius:16px;padding:12px;color:#ffedbd;flex-wrap:wrap;gap:8px;font-size:15px}#lvis .дк.дк313 .дт-лента .зв{display:grid;grid-template-columns:repeat(6,15px);gap:3px}
#lvis .дк.дк313:has(.work-practice)>.числа,#lvis .дк.дк313:has(.work-practice)>.готово,#lvis .дк.дк313:has(.work-practice)>.дт-подсказки,#lvis .дк.дк313:has(.work-practice)>.дт-совет,#lvis .дк.дк313:has(.work-finale)>.готово{display:none}
#lvis .дк.дк313 .work-finale{display:grid;gap:15px;color:#f7e7bd;text-align:center}#lvis .дк.дк313 .work-finale h3{font:28px WorkTitle313;margin:0}#lvis .дк.дк313 .work-finale>.слушать{justify-self:center;grid-column:auto;grid-row:auto}#lvis .дк.дк313 .work-finale p,#lvis .дк.дк313 .work-summary{font:19px/1.45 WorkHand313}#lvis .дк.дк313 .work-summary{display:grid;gap:8px;text-align:left;background:#264b5b;padding:18px;border-radius:16px}#lvis .дк.дк313 .дт-итог{color:#f7e7bd}
#lvis .дк.дк313 .work-feast{display:flex;flex-wrap:wrap;justify-content:center;padding:10px;background:#fff3d5df;border-radius:30px}#lvis .дк.дк313 .work-quiz-art{height:160px;text-align:center}#lvis .дк.дк313 .work-quiz-art img{height:100%;max-width:100%;object-fit:contain}
#lvis .дк.дк313 .work-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@media(prefers-reduced-motion:reduce){#lvis .дк.дк313 *{animation:none!important;transition:none!important}}
#screen:has(.дк313)>.игра-плашка{max-width:650px;margin:0 auto 16px}#screen:has(.дк313) .игра-плашка .ип-кадр,#screen:has(.дк313) .игра-плашка .ип-мини{display:none}
#screen:has(.дк313)>.btnrow{max-width:650px;margin-left:auto;margin-right:auto}
#lvis .дк.дк313 .work-cast{margin:0;height:clamp(180px,40vw,280px);border:2px solid #ba9b68;background-position:center 75%;padding:15px 24px 9px;gap:36px}
#lvis .дк.дк313 .work-cast>div{width:39%;max-width:170px}#lvis .дк.дк313 .work-cast img{object-position:center bottom;width:100%}
#lvis .дк.дк313 .work-work{display:grid;gap:14px;background:linear-gradient(140deg,#f7f4e7,#e3f1ed);border:2px solid #b79b68;border-radius:20px;padding:18px 14px;color:#274b57;box-shadow:0 5px 0 #172e3c}

#lvis .дк.дк313 .work-cast{gap:12px;padding:14px 20px 9px}
#lvis .дк.дк313 .work-cast>div{width:44%;max-width:210px}
#lvis .дк.дк313 .work-cast>.work-project{height:74%;max-width:145px;justify-content:end;padding-bottom:0}
#lvis .дк.дк313 .work-project .work-toy{width:100%;height:calc(100% - 20px);filter:drop-shadow(0 5px 2px #4e452756)}
#lvis .дк.дк313 .work-project span{font-size:12px;white-space:normal;text-align:center}
#lvis .дк.дк313 .is-ready .work-toy{animation:work313-bounce .65s ease-in-out 2 alternate}
#lvis .дк.дк313 button.work-button,#lvis .дк.дк313 .число,#screen:has(.дк313)>.btnrow>button,#screen:has(.дк313)>button{background-color:#edf0db;background-clip:padding-box;border-radius:16px;color:#35503b}
#lvis .дк.дк313 button.work-button{border-image-slice:30% 12%;min-height:56px;font-size:18px;line-height:1.3;padding:7px 4px}
#lvis .дк.дк313 button.chosen{outline:3px solid #4d8261;outline-offset:1px;background-color:#c8dfb9}
#lvis .дк.дк313 button.primary{font-size:18px;justify-self:stretch}
#lvis .дк.дк313 .work-note{font:18px/1.4 WorkHand313;text-align:center}
#lvis .дк.дк313 .work-equation,#lvis .дк.дк313 .work-formula{font:30px/1.4 WorkHand313;text-align:center;color:#5b6941}
#lvis .дк.дк313 .work-error{text-decoration:line-through;text-decoration-color:#b75743;color:#a6584b}
#lvis .дк.дк313 .work-column{display:grid;grid-template-columns:24px repeat(2,minmax(0,1fr));gap:5px 8px;max-width:280px;width:100%;margin:auto;text-align:center;align-items:center;font:30px/1.2 WorkHand313}
#lvis .дк.дк313 .work-column small{font:15px/1.3 WorkHand313;color:#5a6b4c}
#lvis .дк.дк313 .work-digit{display:flex;align-items:center;justify-content:center;min-height:43px;padding:4px;border-radius:9px;font-variant-numeric:tabular-nums}
#lvis .дк.дк313 .work-digit.annotation{min-height:25px;font-size:18px;background:#e6ddba;color:#5b6541}
#lvis .дк.дк313 .work-digit.annotation:empty{background:none}
#lvis .дк.дк313 .work-digit.old{color:#88927f;text-decoration:line-through;text-decoration-color:#a77150}
#lvis .дк.дк313 .work-digit.active{background:#e3edc9;outline:2px solid #98af70}
#lvis .дк.дк313 .work-digit.result{background:#fff9df;border:1px solid #cfbc85}
#lvis .дк.дк313 .work-rule{grid-column:1/-1;border-bottom:3px solid #687958;margin:2px 0}
#lvis .дк.дк313 button.slot{font-size:17px;min-height:56px;padding:3px}
#lvis .дк.дк313 .work-chip{justify-self:center;padding:9px 20px;background:#eee4c3;border:1px solid #b3a26f;border-radius:12px;font-size:21px}
#lvis .дк.дк313 .work-entry{display:grid;place-items:center;min-height:52px;min-width:100px;justify-self:center;padding:3px 20px;font:32px WorkHand313;color:#3e674c;background:#fffdf1;border:2px solid #c4ae77;border-radius:12px;box-shadow:inset 0 2px 4px #69532e14}
#lvis .дк.дк313 .work-keypad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:350px;width:100%;margin:auto}
#lvis .дк.дк313 .work-keypad button{font-size:25px;padding:2px;min-height:56px;border-width:8px}
#lvis .дк.дк313 .work-keypad .erase,#lvis .дк.дк313 .work-keypad .check{font-size:14px;overflow-wrap:anywhere;line-height:1.2}
#lvis .дк.дк313 .work-keypad .check{background-color:#d5e3bf}
#lvis .дк.дк313 .work-options{display:grid;gap:10px}
#lvis .дк.дк313 .work-gear-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
#lvis .дк.дк313 .work-gear-grid button{padding:4px;border:2px solid #c4ae77;min-height:52px;border-radius:12px;background:#fcf6de;filter:none}
#lvis .дк.дк313 .work-gear-grid svg{width:34px;height:34px}
#lvis .дк.дк313 .work-unit{display:inline-flex;width:25px;height:25px}
#lvis .дк.дк313 .work-unit svg{width:100%;height:100%}
#lvis .дк.дк313 .work-unit-bank,#lvis .дк.дк313 .work-exchanged{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:7px;padding:10px;background:#eee8d1;border-radius:14px}
#lvis .дк.дк313 .work-inventory{display:grid;grid-template-columns:1fr 1fr;gap:9px;padding:10px;background:#f1e8cd;border-radius:14px}
#lvis .дк.дк313 .work-inventory>div{min-width:0;text-align:center;font-size:18px}
#lvis .дк.дк313 .work-inventory>div>div{display:flex;gap:5px;justify-content:center;align-items:start;flex-wrap:wrap;margin-top:10px}
#lvis .дк.дк313 .work-rod{display:inline-grid;grid-template-columns:repeat(2,8px);gap:2px;padding:5px;border-radius:6px;background:#c5d8ac;border:1px solid #7e9d66;position:relative}
#lvis .дк.дк313 .work-rod i{width:8px;height:8px;border-radius:50%;background:#dcb45a;border:1px solid #9b783c}
#lvis .дк.дк313 .work-rod small{grid-column:1/-1;font:12px WorkHand313;color:#435f35}
#lvis .дк.дк313 .work-feedback{margin:0}
#lvis .дк.дк313 .work-quiz-art img{height:170px;width:100%;object-fit:contain}
@keyframes work313-bounce{to{transform:translateY(-5px) rotate(3deg)}}
@media(max-width:360px){#lvis .дк.дк313 .реплика{border-width:16px;border-image-width:16px;padding:2px}#lvis .дк.дк313 .реплика p{font-size:17px}#lvis .дк.дк313 .work-work{padding:14px 10px}#lvis .дк.дк313 .work-heading{font-size:25px}#lvis .дк.дк313 button.work-button{border-left-width:8px;border-right-width:8px}#lvis .дк.дк313 .work-keypad{gap:6px}#lvis .дк.дк313 .work-keypad .check{font-size:12px}#lvis .дк.дк313 .work-cast{padding-left:12px;padding-right:12px}}
@media(prefers-reduced-motion:reduce){#lvis .дк.дк313 *{animation:none!important;transition:none!important}}

/* A workshop has a drawing sheet, a sorting tray and a test rail, each for a real action. */
#lvis .дк.дк313 .work-work{border-radius:3px 10px 4px 7px;border:1px solid #c5b382;background:#f2edda;box-shadow:2px 4px 0 #475138;position:relative}
#lvis .дк.дк313 .work-surface-calc,#lvis .дк.дк313 .work-surface-align,#lvis .дк.дк313 .work-surface-repair{background-color:#f3f0df;background-image:linear-gradient(#87987815 1px,transparent 1px),linear-gradient(90deg,#87987815 1px,transparent 1px);background-size:24px 24px}
#lvis .дк.дк313 .work-surface-bundle{background:#425b44;border:7px double #b29962;color:#fff0bc;box-shadow:0 5px 0 #16291f}
#lvis .дк.дк313 .work-surface-bundle .work-note{color:#fff0bc}
#lvis .дк.дк313 .work-surface-choose{background:none;border:0;box-shadow:none;padding:4px 0}
#lvis .дк.дк313 .work-feedback,#lvis .дк.дк313 .готово,#lvis .дк.дк313 .разбор,#lvis .дк.дк313 .дт-совет{border:0;border-left:3px solid #b99c62;border-radius:0;background:none;color:#e9dfbc;padding:9px 12px;font:400 18px/1.5 WorkHand313,sans-serif;box-shadow:none}
#lvis .дк.дк313 .work-feedback.success{background:none;border-left-color:#9bbd7f;color:#dbe9bb}
#lvis .дк.дк313 .work-keypad{grid-template-columns:repeat(6,minmax(0,1fr));gap:8px}
#lvis .дк.дк313 .work-keypad button.work-button{grid-column:span 2;min-height:52px;font:400 26px/1.2 WorkHand313,sans-serif;border:2px solid #9a8855;border-image:none;border-radius:6px;background:#f6e8bc;box-shadow:0 3px 0 #9a8855;padding:6px}
#lvis .дк.дк313 .work-keypad button.zero{grid-column:3/5}
#lvis .дк.дк313 .work-keypad button.erase,#lvis .дк.дк313 .work-keypad button.check{grid-column:span 3;font:400 19px/1.3 WorkHand313,sans-serif;white-space:normal;overflow-wrap:normal;min-height:54px}
#lvis .дк.дк313 .work-keypad button.check{background:#d7e4be;border-color:#708357;box-shadow:0 3px 0 #708357}
#lvis .дк.дк313 .work-gear-grid button.work-button{background:transparent;border:0;border-image:none;border-radius:50%;box-shadow:none;min-height:52px;position:relative}
#lvis .дк.дк313 .work-gear-grid button.chosen{outline:2px solid #fff0ba;background:#ffffff20;outline-offset:-3px}
#lvis .дк.дк313 .work-gear-grid button.chosen::after{content:'✓';position:absolute;right:1px;top:0;color:#fff9d3;font:400 18px/1 WorkHand313}
#lvis .дк.дк313 .work-rod small{font:400 15px/1.3 WorkHand313}
#lvis .дк.дк313 .work-summary{background:none;border:0;border-radius:0;padding:8px 0}
#lvis .дк.дк313 .work-heading{overflow-wrap:normal;hyphens:none;text-wrap:balance}
#lvis .дк.дк313 .work-chapter{font-weight:400;text-transform:none}
#lvis .дк.дк313 button.work-help{font:400 19px/1.4 WorkHand313,sans-serif;border:0;border-image:none;border-bottom:1px solid #bba26d;border-radius:0;background:none;color:#e9d29d;padding:9px;box-shadow:none;filter:none}
@media(max-width:360px){#lvis .дк.дк313 .work-chapter{font-size:15px;gap:8px}#lvis .дк.дк313 .work-keypad button.erase,#lvis .дк.дк313 .work-keypad button.check{font-size:18px}#lvis .дк.дк313 .work-work{padding:14px 10px}}
`;document.head.appendChild(css);
})();
