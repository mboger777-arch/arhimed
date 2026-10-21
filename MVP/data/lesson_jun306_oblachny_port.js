/* Урок 306 · Облачный порт. Закономерности, таблицы, высказывания.
   10 сцен с разными действиями; 12 задач в трёх сериях. ДК/ДТ и штатные награды.
   Новые оригинальные Нори и Клёпа: image_gen, три позы каждого. PROMPTS.json рядом с рисунками. */
(function(){
 'use strict';
 if(!window.ДК)return;
 const ID=306, A='img/l306/';
 const names={sun:'Солнце',cloud:'Облако',moon:'Луна'};
 const escape=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
 const text=(x,y,t,size=20,color='#253d43')=>`<text x="${x}" y="${y}" text-anchor="middle" font-size="${size}" font-weight="900" fill="${color}">${t}</text>`;
 const defs=`<defs><linearGradient id="port-brass" x2="0" y2="1"><stop stop-color="#ffe8a0"/><stop offset=".5" stop-color="#d8a453"/><stop offset="1" stop-color="#96602c"/></linearGradient><linearGradient id="port-teal" x2="1" y2="1"><stop stop-color="#5abeb9"/><stop offset="1" stop-color="#205963"/></linearGradient><linearGradient id="port-paper" x2="0" y2="1"><stop stop-color="#fffcec"/><stop offset="1" stop-color="#ecd4a5"/></linearGradient></defs>`;
 const panel=(x,y,w,h)=>`<g><rect x="${x}" y="${y+3}" width="${w}" height="${h}" rx="13" fill="#563e29" opacity=".3"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="13" fill="url(#port-brass)" stroke="#795330" stroke-width="1.5"/><rect x="${x+4}" y="${y+4}" width="${w-8}" height="${h-8}" rx="10" fill="url(#port-paper)" stroke="#ffedb8" stroke-width="1.4"/><path d="M${x+13},${y+8} H${x+w-13}" stroke="#fffdf0" opacity=".8"/>${[[x+8,y+9],[x+w-8,y+h-9]].map(([cx,cy])=>`<circle cx="${cx}" cy="${cy}" r="2" fill="#997042"/><circle cx="${cx-.5}" cy="${cy-.6}" r=".8" fill="#ffe3a3"/>`).join('')}</g>`;
 const prop=(name,x,y,w,h)=>`<image href="${A}${name}.webp" x="${x}" y="${y}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" pointer-events="none"/>`;
 function icon(kind,x=0,y=0,r=16){
  let s='';
  if(kind==='sun')s=`<circle r="${r*.62}" fill="url(#port-brass)" stroke="#9a6425" stroke-width="1.5"/>`+Array.from({length:8},(_,i)=>`<path d="M0,${-r*.84} V${-r*1.04}" transform="rotate(${i*45})" stroke="#d79b32" stroke-width="3" stroke-linecap="round"/>`).join('');
  if(kind==='cloud')s=`<path d="M${-r},5 C${-r*1.3},-5 ${-r*.8},${-r*.8} ${-r*.35},${-r*.55} C0,${-r*1.25} ${r*.8},${-r*.9} ${r*.8},-2 C${r*1.4},0 ${r*1.2},${r*.55} ${r*.7},${r*.6} H${-r*.7} Q${-r*1.2},${r*.6} ${-r},5Z" fill="#8fcfdc" stroke="#327b91" stroke-width="1.5"/>`;
  if(kind==='moon')s=`<path d="M8,${-r} A${r},${r} 0 1 0 8,${r} A${r*.84},${r*.84} 0 0 1 8,${-r}Z" fill="#b8a8e4" stroke="#736192" stroke-width="1.5"/>`;
  return `<g transform="translate(${x},${y})" pointer-events="none">${s}</g>`;
 }
 const target=(н,key,label,body,...args)=>`<g role="button" tabindex="0" aria-label="${escape(label)}" data-port-action="${key}" class="port-target" onclick="${н.клик(key,...args)}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick(event)}">${body}</g>`;
 const btn=(н,label,key,args=[],disabled=false)=>`<button type="button" class="port-button" ${disabled?'disabled':''} onclick="${н.клик(key,...args)}">${label}</button>`;
 const row=html=>`<div class="port-controls">${html}</div>`;
 const reply=st=>`<p class="port-feedback ${st.ok?'is-good':''}" role="status" aria-live="polite">${st.fb||'Попробуй. Герой поможет, если нажать на него.'}</p>`;
 const floor=`<path d="M0,265 H360 V300 H0Z" fill="#905d36" opacity=".35"/>`;
 const actor=(н,key,st,x=307,y=291,h=103)=>н.герой(key,x,y,h,st.ok?'happy':st.fb?'action':null,'port-grounded').replace("'_подсказка'","'portHint'").replace('role="button"',`role="button" aria-label="Подсказка: ${key==='nori'?'Нори':'Клёпа'}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick(event)}"`);
 const boat=(x,y,scale=1)=>`<g transform="translate(${x},${y}) scale(${scale})" pointer-events="none">${prop('airship-v2',-120,-55,240,153)}</g>`;
 const chips=(items,known=items.length,y=124)=>items.map((n,i)=>{const x=40+i*56;return panel(x-24,y-27,48,54)+(n===null?text(x,y+8,'?',28):typeof n==='string'?icon(n,x,y,16):text(x,y+8,n,26));}).join('');
 function tell(st,н,t,ok=false){st.fb=t;st.ok=ok;st.рк=null;window.PORT306_AUDIO?.stop();}
 function finish(st,н,t){tell(st,н,t,true);}
 function patternScene(pattern,fill,kind){
  return {
   кто:kind==='sail'?'klepa':'nori',t:kind==='sail'?'Парус из трёх знаков':'Сигналы причала',
   say:kind==='sail'?'Клёпа шьёт парус: солнце, облако, облако. Эта тройка повторяется. Добавь два недостающих знака.':'Я Нори, пилот! Ветер унёс два сигнала. Они чередуются: солнце, облако. Верни знаки — откроем причал!',
   hint:kind==='sail'?'Повторяется целая тройка: солнце, облако, облако. После второго солнца нужны два облака.':'После солнца идёт облако, после облака — солнце. Начни с первого пустого места.',
   success:kind==='sail'?'Парус готов! Повторяется тройка: солнце, облако, облако.':'Сигналы восстановлены! Повторяется пара: солнце, облако.',
   начало(st){st.items=[];},готов:st=>st.items.length===fill.length,
   рисуй(st,н){const vals=pattern.concat(st.items,Array(fill.length-st.items.length).fill(null));
    let body=kind==='sail'?`<path d="M40,67 H300 L280,196 H55Z" fill="#fff8db" stroke="#9d794e" stroke-width="3"/><path d="M35,62 H307" stroke="#754c2c" stroke-width="8"/>`:`<path d="M15,95 Q180,135 345,95" fill="none" stroke="#7b5935" stroke-width="4"/>`;
    const y=kind==='sail'?125:117;
    body+=vals.map((v,i)=>{let x=35+i*57;return `<g>${panel(x-23,y-25,46,50)}${v?icon(v,x,y,16):text(x,y+8,'?',26)}${!v&&i===pattern.length+st.items.length?н.зона('slot',x-26,y-29,52,58):''}</g>`;}).join('');
    if(!st.ok)body+=['sun','cloud','moon'].map((v,i)=>н.тащ(v,64+i*72,225,`<circle r="27" fill="#fff4cf" stroke="#967043" stroke-width="2"/>${icon(v)}`,27)).join('');
    body+=floor+actor(н,kind==='sail'?'klepa':'nori',st,319,294,kind==='sail'?82:99);
    return н.сцена(body,kind==='sail'?'Парус: повтори тройку знаков':'Сигналы: продолжи чередование',!st.ok,kind==='sail'?'workshop':'harbor')+(!st.ok?row(['sun','cloud','moon'].map(v=>btn(н,names[v],'put',[v])).join('')):'')+reply(st);
   },делать:'Перетащи знак в пустое место или нажми его название.',
   подсказка(){return this.hint;},
   бросить(st,v,zone,x,y,н){if(zone!=='slot'||st.ok)return false;this.клики.put(st,v,н);return st.items.at(-1)===v;},
   тап:()=> 'slot',
   клики:{put(st,v,н){if(st.ok)return;if(v===fill[st.items.length]){st.items.push(v);if(st.items.length===fill.length)finish(st,н,kind==='sail'?'Парус готов! Повторяется тройка: солнце, облако, облако.':'Сигналы восстановлены! Повторяется пара: солнце, облако.');else tell(st,н,'Верно. Теперь заполни следующее место.');}else tell(st,н,kind==='sail'?'После солнца нужны два облака. Посмотри на первую тройку.':'Этот знак нарушает чередование. Повторяй: солнце, облако.');}}
  };
 }
 const frames=[patternScene(['sun','cloud','sun','cloud'],['sun','cloud'],'lights'),patternScene(['sun','cloud','cloud','sun'],['cloud','cloud'],'sail'),
 {
  кто:'klepa',t:'Лифт прибавляет поровну',say:'Грузовой лифт останавливался на отметках 2, 4, 6, 8. Какой шаг у лифта? Выбери рычаг и подними груз к следующей отметке.',hint:'От двух до четырёх прибавили два. От четырёх до шести — тоже два. Продолжай тем же шагом.',success:'Десять! На каждом переходе прибавляем два.',
  начало(st){st.value=8;},готов:st=>st.ok,
  рисуй(st,н){return н.сцена(`${prop('lift-v2',18,15,239,235)}${[2,4,6,8,10].map((n,i)=>panel(261,193-i*32,37,28)+text(279,213-i*32,n,17)).join('')}<g class="port-lift" style="transform:translateY(${st.ok?-32:0}px)">${prop('platform-v2',61,82,163,46)}${text(142,115,st.value,22)}</g>${chips([2,4,6,8,st.ok?10:null],5,266)}${actor(н,'klepa',st,322,295,100)}`, 'Лифт: каждое число на два больше',false,'harbor')+row([1,2,3].map(n=>btn(н,`+${n}`,'lever',[n],st.ok)).join(''))+reply(st);},
  делать:'Какое число прибавляется каждый раз?',подсказка(){return this.hint;},
  клики:{lever(st,n,н){if(st.ok)return;if(n===2){st.value=10;finish(st,н,'Десять! На каждом переходе прибавляем два.');}else tell(st,н,`С шагом +${n} после 2 было бы ${2+n}, а в ряду стоит 4. Сравни соседей.`);}}
 },
 {
  кто:'nori',t:'Снижаемся к мастерской',say:'Чтобы пристать к мастерской, снижаемся: 10, 8, 6… На сколько уменьшается число? Опусти корабль ещё на один такой шаг.',hint:'Каждый раз убираем два: десять, восемь, шесть. Что будет после шести?',success:'Четыре! Для снижения каждый раз вычитаем два.',
  начало(st){st.value=6;},готов:st=>st.ok,
  рисуй(st,н){return н.сцена(`<path d="M280,58 V232" stroke="#bc975b" stroke-width="5"/>${[10,8,6,4].map((n,i)=>`<path d="M270,${65+i*45} h20" stroke="#5d684e" stroke-width="3"/>${text(309,71+i*45,n,20)}`).join('')}${boat(133,st.ok?115:70,.88)}${actor(н,'nori',st,318,296,82)}${chips([10,8,6,st.ok?4:null],4,258)}`, 'Снижение корабля: десять, восемь, шесть, четыре',false,'observatory')+row([1,3,2].map(n=>btn(н,`−${n}`,'lower',[n],st.ok)).join(''))+reply(st);},
  делать:'Выбери шаг снижения.',подсказка(){return this.hint;},клики:{lower(st,n,н){if(st.ok)return;if(n===2){st.value=4;finish(st,н,'Четыре! Для снижения каждый раз вычитаем два.');}else tell(st,н,`Если из 10 вычесть ${n}, получится ${10-n}, а следующая отметка — 8.`);}}
 },
 {
  кто:'klepa',t:'Настройка прибора',say:'У прибора стёрлась отметка: 5, 10, пропуск, 20, 25. Поворачивай ручку по пять. Поставь число, которое подходит между 10 и 20.',hint:'От пяти до десяти — плюс пять. Сделай такой же шаг от десяти и проверь следующий: до двадцати.',success:'Пятнадцать подходит с обеих сторон: десять, пятнадцать, двадцать!',
  начало(st){st.value=10;},готов:st=>st.ok,
  рисуй(st,н){return н.сцена(`${chips([5,10,st.ok?15:null,20,25],5,59)}${prop('console-v2',27,101,244,200)}${text(150,214,st.value,36)}${actor(н,'klepa',st,315,296,111)}`, 'Настройка отсутствующей отметки прибора',false,'workshop')+row(btn(н,'−5','dial',[-5],st.ok||st.value===0)+btn(н,'+5','dial',[5],st.ok||st.value===25)+btn(н,'Проверить','check',[],st.ok))+reply(st);},
  делать:'Настрой число ручками −5 и +5, затем проверь.',подсказка(){return this.hint;},клики:{dial(st,d){if(!st.ok){st.value=Math.max(0,Math.min(25,st.value+d));st.fb='Теперь проверь отметку.';}},check(st,н){if(st.ok)return;if(st.value===15)finish(st,н,'Пятнадцать подходит с обеих сторон: десять, пятнадцать, двадцать!');else tell(st,н,`От 10 до ${st.value} шаг ${st.value-10}. Здесь нужен шаг +5 — такой же, как от 5 до 10.`);}}
 },
 {
  кто:'nori',t:'Ошибка на маршруте',say:'Кто-то перепутал табличку на маршруте: 3, 6, 9, 11, 15. Здесь каждый раз прибавляют три. Найди неправильную табличку, затем замени её.',hint:'После девяти прибавь три. А потом ещё три — должно получиться пятнадцать.',success:'Маршрут починен: три, шесть, девять, двенадцать, пятнадцать. Правило работает везде!',
  начало(st){st.found=false;},готов:st=>st.ok,
  рисуй(st,н){let vals=[3,6,9,st.ok?12:11,15];return н.сцена(`<path d="M34,150 Q180,90 320,150" stroke="#be9457" stroke-width="10" fill="none"/>${vals.map((n,i)=>target(н,'find',`Табличка ${n}`,panel(17+i*64,108,56,62)+text(45+i*64,148,n,26),i)).join('')}${actor(н,'nori',st,95,291,108)}${actor(н,'klepa',st,280,293,86)}`, 'Маршрут с одной неверной табличкой',false,'harbor')+(st.found&&!st.ok?row([10,12,14].map(n=>btn(н,String(n),'replace',[n])).join('')):'')+reply(st);},
  делать:st=>st.found?'Выбери число для замены.':'Нажми на табличку, которая нарушает правило +3.',подсказка(){return this.hint;},
  клики:{find(st,i,н){if(st.ok)return;if(i===3){st.found=true;tell(st,н,'Нашёл! От 9 до 11 прибавили только 2. Какое число нужно?');}else tell(st,н,'Эта табличка подходит. Проверь переход после девятки: прибавь три.');},replace(st,n,н){if(!st.found||st.ok)return;if(n===12)finish(st,н,'Маршрут починен: три, шесть, девять, двенадцать, пятнадцать. Правило работает везде!');else tell(st,н,`${n} не подходит: девять плюс три — двенадцать. Проверь шаг до пятнадцати.`);}}
 },
 {
  кто:'klepa',t:'Груз по своим местам',say:'На складе всё разложено по таблице. Строка подсказывает форму, столбец — цвет. Выбери груз, затем его ячейку. Можно перетащить груз прямо в таблицу.',hint:'Найди слева форму груза, сверху — его цвет. Нужная ячейка там, где встретятся строка и столбец.',success:'Порядок! Каждый груз нашёл и свою строку, и свой столбец.',
  начало(st){st.placed=[];st.selected=null;},готов:st=>st.placed.length===4,
  рисуй(st,н){return н.сцена(`${sortGrid(н,st)}${[0,1,2,3].filter(i=>!st.placed.includes(i)).map(i=>н.тащ(String(i),49+i*65,278,cargo(i,0,0,23),26)).join('')}${actor(н,'klepa',st,325,293,79)}`, 'Таблица: строки — форма, столбцы — цвет',true,'workshop')+(!st.ok?'<div class="port-controls port-cargo-controls">'+[0,1,2,3].filter(i=>!st.placed.includes(i)).map(i=>btn(н,cargoName(i),'select',[i])).join('')+'</div>':'')+reply(st);},
  делать:st=>st.selected===null?'Выбери груз или перетащи его в таблицу.':`Выбран ${cargoName(st.selected).toLowerCase()}. Нажми нужную ячейку.`,подсказка(){return this.hint;},
  тап(st,v){if(st.ok)return null;st.selected=Number(v);return null;},бросить(st,v,z,x,y,н){return putCargo(st,Number(v),Number(z),н);},
  клики:{select(st,i,н){if(st.ok||st.placed.includes(i))return;st.selected=i;tell(st,н,`Выбран ${cargoName(i).toLowerCase()}. Сначала найди его строку, затем столбец.`);},cell(st,i,н){if(st.ok)return;if(st.selected===null){tell(st,н,'Сначала выбери груз под таблицей.');return;}putCargo(st,st.selected,i,н);}}
 },
 {
  кто:'nori',t:'Читаем план доставки',say:'Нам нужен вечерний рейс на остров Солнца. Найди строку «Вечер» и столбец «Солнце». Нажми число на их пересечении — столько посылок берём.',hint:'Вечер — нижняя строка. Солнце — левый столбец с числами. Нужна их общая ячейка.',success:'Четыре посылки! Нижняя строка и столбец Солнца встретились в одной ячейке.',
  начало(){},готов:st=>st.ok,
  рисуй(st,н){return н.сцена(`${deliveryGrid(н,st)}${st.ok?[0,1,2,3].map(i=>`<g transform="translate(${65+i*55},253)">${crate()}</g>`).join(''):''}${actor(н,'nori',st,318,294,88)}`, 'План доставки: строки утро и вечер, столбцы Солнце и Облако',false,'observatory')+reply(st);},
  делать:'Найди нужную ячейку таблицы.',подсказка(){return this.hint;},клики:{read(st,i,н){if(st.ok)return;st.picked=i;if(i===2)finish(st,н,'Четыре посылки! Нижняя строка и столбец Солнца встретились в одной ячейке.');else tell(st,н,i===0?'Это Солнце, но утром. Нам нужен вечер — строка ниже.':i===3?'Это вечер, но остров Облака. Нужен соседний столбец Солнца.':'Здесь утро и остров Облака. Ищи вечер и остров Солнца.');}}
 },
 {
  кто:'klepa',t:'Проверяем журнал',say:'Перед полётом проверим записи Клёпы. Сравни каждое утверждение с таблицей. Если запись подходит — «Верно». Если противоречит таблице — «Неверно».',hint:'Смотри именно на указанные строку и столбец. Утром для Солнца две посылки, вечером — четыре.',success:'Все записи проверены. Таблица помогла отделить верные утверждения от неверных!',
  начало(st){st.index=0;},готов:st=>st.index===3,
  рисуй(st,н){return н.сцена(`${deliveryGrid(null,{},'journal')}${[0,1,2].map(i=>`<circle cx="${85+i*49}" cy="274" r="15" fill="${i<st.index?'#47937b':'#e8d7ab'}" stroke="#b28e4f" stroke-width="2"/>${text(85+i*49,280,i<st.index?'✓':i+1,17,i<st.index?'#fff8dc':'#806f4a')}`).join('')}${actor(н,'klepa',st,311,294,94)}`, 'Проверка утверждений по плану доставки',false,'observatory')+(!st.ok?`<div class="port-note"><small>Запись ${st.index+1} из 3</small><strong>${claims[st.index].text}</strong></div>`+row(btn(н,'Верно','truth',[1])+btn(н,'Неверно','truth',[0])):'')+reply(st);},
  делать:'Каждый ответ проверь по таблице.',подсказка(){return this.hint;},клики:{truth(st,v,н){if(st.ok)return;const c=claims[st.index];if(Boolean(v)===c.yes){st.index++;if(st.index===3)finish(st,н,'Все записи проверены. Таблица помогла отделить верные утверждения от неверных!');else tell(st,н,'Проверено! Прочитай следующую запись.');}else tell(st,н,c.why);}}
 },
 {
  кто:'nori',t:'Твой сигнал — в полёт!',say:'Осталось придумать сигнал нашего корабля. Выбери правило, затем заполни три пустых фонаря. Когда правило повторится — взлетаем!',hint:'Если выбрал пару — повторяй солнце, облако. Если тройку — солнце, облако, облако.',success:'Взлетаем! Ты находишь правила, исправляешь ошибки и читаешь таблицы. Впереди — лётная практика!',
  начало(st){st.rule=null;st.items=[];st.launched=false;st.fb='Выбери пару или тройку, затем продолжи свой сигнал.';},готов:st=>st.launched,
  рисуй(st,н){const p=st.rule==='pair'?['sun','cloud','sun']:['sun','cloud','cloud'];const vals=p.concat(st.items,Array(3-st.items.length).fill(null));
   return н.сцена(`<g class="${st.launched?'port-launch':''}">${boat(180,95,1.2)}<defs><clipPath id="port-crew"><rect x="128" y="126" width="104" height="49"/></clipPath></defs><g clip-path="url(#port-crew)">${н.карт(st.launched?'nori-happy':'nori-idle',160,193,58)}${н.карт(st.launched?'klepa-happy':'klepa-idle',205,193,50)}</g>${st.rule?vals.map((v,i)=>`<path d="M${44+i*54},161 V218" stroke="#80643d" stroke-width="2"/>${panel(23+i*54,218,42,44)}${v?icon(v,44+i*54,240,14):text(44+i*54,247,'?',24)}`).join(''):''}</g>`, 'Корабль с твоим сигнальным узором',false,'harbor')+
   (!st.rule?row(btn(н,'Пара: ☀ · ☁','rule',['pair'])+btn(н,'Тройка: ☀ · ☁ · ☁','rule',['triple'])):st.items.length<3?row(['sun','cloud','moon'].map(v=>btn(н,names[v],'signal',[v])).join('')):!st.launched?row(btn(н,'Отправиться в полёт','launch')):'')+reply(st);},
  делать:st=>!st.rule?'Выбери правило сигнала.':st.items.length<3?'Продолжи выбранное правило.':'Корабль готов к полёту.',подсказка(){return this.hint;},
  клики:{rule(st,v){if(st.rule)return;st.rule=v;st.fb=v==='pair'?'Продолжи пару: солнце, облако.':'Продолжи тройку: солнце, облако, облако.';},signal(st,v,н){if(st.items.length>=3||!st.rule)return;const needed=st.rule==='pair'?['cloud','sun','cloud']:['sun','cloud','cloud'];if(v===needed[st.items.length]){st.items.push(v);tell(st,н,st.items.length===3?'Сигнал готов. Теперь можно взлететь!':'Подходит! Продолжай то же правило.');}else tell(st,н,'Этот знак меняет правило. Сравни с началом своего сигнала.');},launch(st,н){if(st.items.length!==3||st.launched)return;st.launched=true;finish(st,н,'Взлетаем! Ты находишь правила, исправляешь ошибки и читаешь таблицы. Впереди — лётная практика!');}}
 }
 ];
 function cargoName(i){return ['Красный круг','Синий круг','Красный квадрат','Синий квадрат'][i];}
 function cargo(i,x,y,r){return prop('cargo-'+i+'-v2',x-r,y-r,r*2,r*2);}
 function sortGrid(н,st){
  const selected=st.selected;
  return prop('cargo-cabinet-v2',52,34,261,209)+`<rect x="66" y="9" width="237" height="23" rx="10" fill="#285c60" stroke="#d4b46b"/>`+text(183,25,'СКЛАД ВОЗДУШНОГО ПОРТА',12,'#fff4d3')+
   [0,1].map(col=>`<rect x="${91+col*104}" y="53" width="90" height="28" rx="9" fill="${selected!==null&&selected%2===col?'#b9e9de':'#fff4db'}" stroke="#b99051" stroke-width="2"/><text x="${136+col*104}" y="68" dominant-baseline="middle" text-anchor="middle" font-size="16" font-weight="800" fill="#294b50">${col?'Синий':'Красный'}</text>`).join('')+
   [0,1].map(row=>`${panel(8,98+row*72,41,41)}${selected!==null&&Math.floor(selected/2)===row?`<rect x="9" y="${99+row*72}" width="39" height="39" rx="10" fill="#a6daca"/>`:''}${row?`<rect x="20" y="${110+row*72}" width="17" height="17" rx="2" fill="none" stroke="#456669" stroke-width="3"/>`:`<circle cx="28.5" cy="118" r="10" fill="none" stroke="#456669" stroke-width="3"/>`}`).join('')+
   [0,1,2,3].map(i=>{const x=78+i%2*116,y=85+Math.floor(i/2)*72;return (!st.placed.includes(i)?н.зона(String(i),x,y,103,63):'')+target(н,'cell',`Ячейка: ${cargoName(i)}`,`<rect x="${x}" y="${y}" width="103" height="63" rx="6" fill="${st.placed.includes(i)?'#a9d7bd':'#fff3d9'}" opacity="${st.placed.includes(i)?'.2':'.04'}"/>${st.placed.includes(i)?cargo(i,x+51,y+34,25):''}`,i);}).join('')+text(148,248,`На месте: ${st.placed.length} из 4`,12,'#fff8df');
 }
 function putCargo(st,i,cell,н){if(!Number.isInteger(i)||i<0||i>3||st.placed.includes(i)||st.ok)return false;if(cell!==i){tell(st,н,Math.floor(i/2)!==Math.floor(cell/2)?'Не та строка: сравни форму груза со значком слева.':'Форма подходит, но нужен другой цвет — соседний столбец.');return false;}st.placed.push(i);st.selected=null;if(st.placed.length===4)finish(st,н,'Порядок! Каждый груз нашёл и свою строку, и свой столбец.');else tell(st,н,'На месте! Найди ячейку для следующего груза.');return true;}
 const crate=()=>'<rect x="-20" y="-19" width="40" height="38" rx="5" fill="#bd8d55" stroke="#694a2d" stroke-width="2"/><path d="M-17,-14 L17,14 M17,-14 L-17,14" stroke="#e8bd7f" stroke-width="4"/>';
 function deliveryGrid(н,st,mode='dispatch'){
  const book=mode==='journal';
  const base=book?prop('journal-v2',4,24,349,227):`<image href="${A}window-v2.webp" x="14" y="24" width="294" height="211" preserveAspectRatio="none" pointer-events="none"/>`;
  return base+text(171,53,book?'БОРТОВОЙ ЖУРНАЛ':'ПЛАН ДОСТАВКИ',12)+`<rect x="109" y="61" width="182" height="34" rx="9" fill="url(#port-teal)"/>`+icon('sun',153,78,13)+icon('cloud',247,78,13)+text(62,133,'Утро',16)+text(62,195,'Вечер',16)+[2,5,4,3].map((v,i)=>{
   const x=109+i%2*94,y=97+Math.floor(i/2)*62;
   const body=`<rect x="${x}" y="${y+2}" width="88" height="58" rx="8" fill="#755a3d" opacity=".18"/><rect x="${x}" y="${y}" width="88" height="58" rx="8" fill="${st.ok&&i===2?'#c2e2c4':'#fff7e3'}" stroke="${st.picked===i?'#3b9f99':'#c9ac70'}" stroke-width="${st.picked===i?3:1.5}"/><path d="M${x+7},${y+5} h74" stroke="#fffdf4" stroke-width="2"/>${text(x+44,y+38,v,27)}`;
   return н?target(н,'read',`${i<2?'Утро':'Вечер'}, ${i%2?'Облако':'Солнце'}: ${v}`,body,i):body;
  }).join('');
 }
 const claims=[{text:'Утром на остров Солнца отправят 2 посылки.',yes:true,why:'Найди строку «Утро» и столбец Солнца. Там 2 — запись верная.'},{text:'Вечером на остров Облака отправят 5 посылок.',yes:false,why:'Пять — утром. В вечерней строке у Облака стоит 3. Запись неверная.'},{text:'Вечером для Солнца посылок больше, чем утром.',yes:true,why:'Вечером 4, утром 2. Четыре больше двух — запись верная.'}];
 const tasks=[
 {series:0,q:'Сигналы повторяются: солнце, облако, солнце, облако. Какой знак дальше?',opts:['Облако','Солнце','Луна'],answer:1,hint:'Повторяется пара. После облака снова солнце.',sol:'После облака — солнце.',view:['sun','cloud','sun','cloud',null]},
 {series:0,q:'На парусе повторяется тройка: луна, солнце, солнце. Продолжи: луна, солнце, солнце, луна, солнце, …',opts:['Луна','Облако','Солнце'],answer:2,hint:'В каждой тройке после луны два солнца.',sol:'Нужно второе солнце.',view:['moon','sun','sun','moon','sun',null]},
 {series:0,q:'Клёпа считает шестерёнки: 2, 4, 6, 8, … Какое число дальше?',opts:['9','10','12'],answer:1,hint:'Каждый раз прибавляй 2. Восемь плюс два.',sol:'8 + 2 = 10.',view:[2,4,6,8,null]},
 {series:0,q:'Высота уменьшается: 12, 10, 8, … Продолжи тем же шагом.',opts:['6','7','4'],answer:0,hint:'Каждый раз вычитай 2. Восемь минус два.',sol:'8 − 2 = 6.',view:[12,10,8,null]},
 {series:1,q:'Ряд прибора: 5, 10, пропуск, 20. Какое число пропало?',opts:['12','25','15'],answer:2,hint:'Прибавляй по 5. Десять плюс пять.',sol:'5, 10, 15, 20.',view:[5,10,null,20]},
 {series:1,q:'Правило +3. Продолжи: 3, 6, 9, …',opts:['11','12','13'],answer:1,hint:'К девяти прибавь три.',sol:'9 + 3 = 12.',view:[3,6,9,null]},
 {series:1,q:'В ряду с правилом +2 ошиблись: 1, 3, 6, 7. Какое число должно стоять вместо 6?',opts:['5','4','8'],answer:0,hint:'После трёх прибавь два. Потом ещё два — получится семь.',sol:'Верный ряд: 1, 3, 5, 7.',view:[1,3,6,7]},
 {series:1,q:'Проверь правило на всех переходах. Как меняются числа: 20, 15, 10, 5?',opts:['Прибавляем 5','Вычитаем 2','Вычитаем 5'],answer:2,hint:'От двадцати до пятнадцати убрали пять. Проверь дальше.',sol:'На каждом шаге вычитаем 5.',view:[20,15,10,5]},
 {series:2,q:'По таблице: сколько посылок утром отправят на остров Облака?',opts:['2','5','3'],answer:1,hint:'Строка «Утро», столбец Облака.',sol:'Утром на остров Облака — 5 посылок.',table:true},
 {series:2,q:'По таблице: сколько посылок вечером отправят на остров Солнца?',opts:['4','2','3'],answer:0,hint:'Строка «Вечер», столбец Солнца.',sol:'Вечером на остров Солнца — 4 посылки.',table:true},
 {series:2,q:'Клёпа записал: «Вечером для Облака три посылки». Эта запись верная?',opts:['Нет','Да'],answer:1,hint:'Найди вечернюю строку и столбец Облака.',sol:'Да. В этой ячейке стоит 3.',table:true},
 {series:2,q:'На какой остров утром отправляют больше посылок?',opts:['Солнца','Поровну','Облака'],answer:2,hint:'В строке «Утро» сравни 2 и 5.',sol:'На остров Облака: 5 больше 2.',table:true}
 ];
 const series=['Сигналы и ряды','Мастерская правил','Таблицы и записи'];
 const trainerPicture=(н,t)=>н.сцена(`${defs}${t.table?deliveryGrid(null,{}):panel(14,70,332,112)+chips(t.view,t.view.length,126)}${н.карт(t.series===1?'klepa-idle':'nori-idle',306,293,100,{тень:true})}`,t.table?'План доставки для самостоятельного чтения':'Самостоятельно продолжи ряд',false,t.table?'observatory':t.series===1?'workshop':'harbor');
 // Small games feed the native answer/reward pipeline. Only lesson-local UI state is added.
 const numericStart={2:8,3:8,4:10};
 function practiceState(i){const rec=lrec();rec.cloudPort||={version:1,frames:{}};rec.cloudPort.practice||={};return rec.cloudPort.practice[i]||=( {value:numericStart[i],found:false,inspected:false,msg:''} );}
 function practiceDone(i){return lrec().tasks.includes(i);}
 function practiceAction(i,action,value){
  if(LV.id!==ID||LV.phase!=='tasks'||LV.task!==i||practiceDone(i))return;
  const st=practiceState(i),t=tasks[i];window.PORT306_AUDIO?.stop();
  if(action==='adjust'){
   if(!Object.hasOwn(numericStart,i)||![-5,-1,1,5].includes(value))return;
   st.value=Math.max(0,Math.min(i===4?25:14,st.value+value));st.msg='Настрой число и нажми «Проверить». ';
  }else if(action==='find'){
   if(i!==6)return;st.found=value===2;st.msg=st.found?'Теперь выбери новую табличку вместо 6.':'Проверь переход от 3: прибавь 2.';
  }else if(action==='inspect'){
   if(i!==10)return;st.inspected=value===3;st.msg=st.inspected?'Вечер, Облако: 3 посылки. Теперь проверь запись.':'Найди вечернюю строку и столбец Облака.';
  }else if(action==='answer'||action==='check'||action==='cell'){
   if(i===6&&!st.found||i===10&&!st.inspected)return;
   const answer=action==='check'?String(st.value):action==='cell'?String([2,5,4,3][value]):String(value);
   if(answer===t.opts[t.answer]){st.msg='';save();lvPick(t.answer);return;}
   st.msg=t.hint;
  }else return;
  save();renderLessonView();
 }
 const practiceClick=(i,action,value)=>`PORT306.practice(${i},'${action}',${JSON.stringify(value)})`;
 function practiceButton(i,label,action,value,disabled=false){return `<button type="button" class="port-button" ${disabled?'disabled':''} onclick="${escape(practiceClick(i,action,value))}">${label}</button>`;}
 function practiceTarget(i,label,body,action,value,disabled=false){return `<g class="port-target" ${disabled?'':`role="button" tabindex="0" aria-label="${escape(label)}" onclick="${escape(practiceClick(i,action,value))}" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();this.onclick(event)}"`}>${body}</g>`;}
 function practicePicture(н,t,i){
  const st=practiceState(i),done=practiceDone(i),answer=t.opts[t.answer];let body='',controls='',instruction='';
  const choices=(labels=t.opts)=>row(labels.map((label,j)=>practiceButton(i,label,'answer',t.opts[j],done)).join(''));
  if(i<2){
   const vals=t.view.map(v=>v===null&&done?'sun':v);
   body=`<path d="M13,83 Q180,121 347,83" fill="none" stroke="#956539" stroke-width="5"/>`+chips(vals,vals.length,104);
   instruction='Нажми на знак, который продолжит сигнал.';
   body+=t.opts.map((label,j)=>{const key=Object.keys(names).find(k=>names[k]===label),x=62+j*105;return practiceTarget(i,label,panel(x-38,172,76,68)+icon(key,x,206,22),'answer',label,done);}).join('');
   if(done)body+=text(180,163,i===0?'ПАРА ПОВТОРЯЕТСЯ':'ТРОЙКА ПОВТОРЯЕТСЯ',14,'#fff9df');
  }else if(i===2||i===3||i===4){
   const n=done?Number(answer):st.value;
   body=chips(t.view.map(v=>v===null&&done?n:v),t.view.length,42);
   if(i===3){
    body+=`<path d="M265,90 V246" stroke="#ba975c" stroke-width="5"/>`+[0,4,8,12].map(v=>text(291,248-v*5,v,17)).join('')+boat(139,192-n*5,.7)+panel(111,239,64,40)+text(143,268,n,27);
    instruction='Опускай корабль до следующего числа. Затем проверь.';
   }else{body+=prop('console-v2',33,92,244,201)+text(155,207,n,36);instruction=i===2?'Добавляй шестерёнки по одной. Собери следующее число.':'Поверни ручку прибора. Восстанови пропущенную отметку.';}
   const step=i===4?5:1;
   controls=row(practiceButton(i,'−'+step,'adjust',-step,done||n===0)+practiceButton(i,'+'+step,'adjust',step,done||n===(i===4?25:14))+practiceButton(i,'Проверить','check',null,done));
  }else if(i===5||i===6){
   const vals=t.view.slice();if(done)vals[i===5?3:2]=Number(answer);
   body=`<path d="M35,131 H320" stroke="#bc9355" stroke-width="12"/>`+vals.map((v,j)=>practiceTarget(i,'Табличка '+(v??'пропуск'),panel(26+j*79,91,65,69)+text(58+j*79,135,v??'?',28),'find',j,done||i!==6)).join('');
   instruction=i===6&&!st.found&&!done?'Сначала найди и нажми неверную табличку.':'Выбери табличку для ремонта маршрута.';
   if(i===5||st.found||done)controls=choices();
   if(done)body+=boat(159,210,.5);
  }else if(i===7){
   body=chips(t.view,t.view.length,77)+[0,1,2].map(j=>`<path d="M${65+j*56},79 h8" stroke="#598f8d" stroke-width="2"/>`).join('');
   if(done)body+=[0,1,2].map(j=>text(68+j*56,124,'−5',16,'#fff9e5')).join('');
   body+=prop('console-v2',76,149,174,143)+text(164,231,done?'−5':'?',28);instruction='Выбери рычаг с одним правилом для всех переходов.';controls=choices(['+5','−2','−5']);
  }else if(i===8||i===9||i===10){
   const adapter={клик:(key,cell)=>practiceClick(i,i===10?'inspect':'cell',cell)};
   body=deliveryGrid(done?null:adapter,{picked:i===10&&st.inspected?3:undefined},i===10?'journal':'dispatch');
   instruction=i===10?(st.inspected||done?'Поставь печать: запись верная или неверная?':'Сначала найди в таблице вечер и остров Облака.'):'Нажми нужную ячейку — посылки отправятся в рейс.';
   if(done){const count=i===10?3:Number(answer);body+=Array.from({length:count},(_,k)=>`<g transform="translate(${36+k*43},268) scale(.75)">${crate()}</g>`).join('');}
   if(i===10)controls=row(practiceButton(i,'Неверно','answer','Нет',done||!st.inspected)+practiceButton(i,'Верно','answer','Да',done||!st.inspected));
  }else{
   body=text(180,32,'УТРЕННИЙ РЕЙС',15,'#fff3d2');
   body+=[{name:'Солнца',kind:'sun',count:2,x:83},{name:'Облака',kind:'cloud',count:5,x:260}].map(o=>practiceTarget(i,'Остров '+o.name,panel(o.x-68,51,136,163)+icon(o.kind,o.x,83,22)+Array.from({length:o.count},(_,k)=>`<g transform="translate(${o.x-38+(k%3)*38},${132+Math.floor(k/3)*39}) scale(.7)">${crate()}</g>`).join(''),'answer',o.name,done)).join('');
   instruction='Сравни посылки и нажми на остров, для которого их больше.';
   if(done)body+=text(180,250,'5 > 2',30,'#fff9df');
   controls=row(practiceButton(i,'Поровну','answer','Поровну',done));
  }
  if(i===2){body+=panel(31,252,187,43)+Array.from({length:done?10:st.value},(_,k)=>`<g transform="translate(${46+(k%7)*25},${264+Math.floor(k/7)*18})"><circle r="7" fill="#d8a85b" stroke="#81582c" stroke-width="2" stroke-dasharray="3 2"/><circle r="2.5" fill="#fff2d2"/></g>`).join('');}
  const who=t.series===1||i===2?'klepa':'nori';
  body+=н.карт(who+(done?'-happy':'-action'),326,297,75,{тень:true});
  return `<div class="port-practice"><div class="port-chapter">${series[t.series]} <span>${i%4+1} / 4</span></div>`+н.сцена(defs+body,'Практика: '+t.q,false,t.table?'observatory':t.series===1?'workshop':'harbor').replace('role="img"','role="group"')+(!done?`<p class="что-делать">${instruction}</p>`:'')+controls+(st.msg&&!done?`<p class="port-feedback" role="status">${escape(st.msg)}</p>`:'')+'</div>';
 }

 frames.forEach((f,i)=>{f.клики.portHint=(st)=>{st.fb=f.hint;st.рк=null;window.PORT306_AUDIO?.playKey('frame-'+i+'-hint');};const draw=f.рисуй;f.рисуй=(st,н)=>{н.сказ=(who,t,pose)=>{st.fb=t;st.рк={кто:who,т:t,поза:pose,t:Date.now()};window.PORT306_AUDIO?.play(t);};const scene=н.сцена;н.сцена=(body,...args)=>scene(defs+body,...args).replace('role="img"','role="group"');return `<div class="port-chapter">ОБЛАЧНЫЙ ПОРТ <span>${i+1} / ${frames.length}</span></div>`+draw(st,н);};});
 window.PORT306={frames,tasks,claims,practice:practiceAction,restart(){if(typeof LV==='undefined'||LV.id!==ID)return;window.PORT306_AUDIO?.stop();CHS[lidKey(ID)]={п:{}};LV.phase='explain';LV.step=0;renderLessonView();}};
 ДК.подключить({ID,ИМГ:A,размеры:{'nori-idle':[321,500],'nori-action':[334,500],'nori-happy':[334,500],'klepa-idle':[290,500],'klepa-action':[346,500],'klepa-happy':[293,500]},
  герои:{nori:{имя:'Нори',ф:'nori-idle',позы:{action:'nori-action',happy:'nori-happy'},позаПодсказки:'action'},klepa:{имя:'Клёпа',ф:'klepa-idle',позы:{action:'klepa-action',happy:'klepa-happy'},позаПодсказки:'action'}},
  фоны:['harbor','workshop','harbor','observatory','workshop','harbor','workshop','observatory','observatory','harbor'],кадры:frames,
  запись:{title:'Закономерности и таблицы · Облачный порт',ico:'🎈',subj:'jun',src:'Начальная школа · 1 класс · Логика: ряды, таблицы, высказывания',
   check:{q:'Что нужно проверить, когда нашёл правило числового ряда?',choices:['Только последнее число','Все соседние числа','Только первое число'],ans:1,exp:'Одно и то же правило должно работать на каждом переходе.'},
   tasks:tasks.map(t=>({q:t.q,kind:'choice',choices:t.opts,ans:t.answer,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
  тренажёр:{герой:'nori',проверка:{картинка:н=>trainerPicture(н,{view:[2,4,6,8],series:0}),разборы:{'Только последнее число':'Правило должно объяснять и начало ряда, и его продолжение.','Только первое число':'По одному числу не видно, как меняются соседи.'},итог:'Проверяем каждый переход — одно правило для всего ряда.'},
   задачи:tasks.map((t,i)=>({кто:t.series===1||i===2||i===10?'klepa':'nori',картинка:н=>practicePicture(н,t,tasks.indexOf(t)),разборы:Object.fromEntries(t.opts.filter((_,i)=>i!==t.answer).map(v=>[v,t.hint])),итог:t.sol})),
   финал:н=>'<div class="port-finale">'+н.сцена(`${defs}${boat(180,82,.9)}${actor(н,'nori',{ok:true},109,292,143)}${actor(н,'klepa',{ok:true},248,292,119)}`,'Нори и Клёпа благодарят помощника',false,'observatory')+'<p class="port-feedback is-good">Облачный порт работает! Все 12 заданий выполнены, награды сохранены в приложении.</p></div>'}
 });
 // Local state and navigation guard; no changes to other lessons or native reward functions.
 let restored=false,lastSaved='';
 const renderer=WAVE_B[ID];
 WAVE_B[ID]=function(el){
  const key=lidKey(ID);CHS[key]||={};
  if(!restored){const old=DB.lessons?.[ID]?.cloudPort;if(old?.version===1&&old.frames&&typeof old.frames==='object')CHS[key].п=JSON.parse(JSON.stringify(old.frames));restored=true;}
  for(const [i,st] of Object.entries(CHS[key].п||{})){const frame=frames[i];if(frame&&frame.готов(st)&&!st.ok){st.ok=true;st.fb=frame.success;}}
  renderer(el);if(LV.phase==='explain'&&LV.step===0&&CHS[key].п?.[0]?.ok)el.querySelector('.дк306')?.insertAdjacentHTML('beforeend','<button type="button" class="port-button" onclick="PORT306.restart()">Повторить приключение</button>');sync();
 };
 function sync(){
  if(typeof LV==='undefined'||LV.id!==ID)return;
  const p=CHS[lidKey(ID)]?.п||{};const s=p[LV.step];
  const can=LV.phase!=='explain'||!!(s&&frames[LV.step]?.готов(s));
  document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;b.title=can?'':'Сначала выполни действие на картинке';});
  const data=JSON.stringify(p);
  if(data!==lastSaved){DB.lessons||={};DB.lessons[ID]||={tasks:[],stars:0,done:false};DB.lessons[ID].cloudPort={...DB.lessons[ID].cloudPort,version:1,frames:JSON.parse(data)};lastSaved=data;save();}
 }
 window.addEventListener('load',()=>{
  for(const name of ['lvStep','lvToCheck']){const original=window[name];window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)){const s=CHS[lidKey(ID)]?.п?.[LV.step];if(!s||!frames[LV.step].готов(s))return;}return original.apply(this,args);};}
 });
 const style=document.createElement('style');style.textContent=`
 #lvis .дк.дк306{width:100%;max-width:640px;margin:0 auto;--контур:#79613e;--чернила:#284249;gap:10px}
 body:has(.дк306) #asst{display:none}
 #screen:has(.дк306)>.card>.arch{display:none}#screen:has(.дк306)>.card{padding:6px;background:transparent;border:0}
 #lvis .дк.дк306 .реплика{padding:18px 20px;min-height:105px}#lvis .дк.дк306 .реплика p{font-size:17px;line-height:1.35}
 #lvis .дк.дк306 .аватар{width:44px}#lvis .дк.дк306 .аватар img{width:43px;height:55px}
 #lvis .дк.дк306 .port-chapter{display:flex;justify-content:space-between;font-size:12px;letter-spacing:.08em;color:#edc980;padding:0 4px}
 #lvis .дк.дк306 .port-controls{display:flex;flex-wrap:wrap;justify-content:center;gap:8px}
 #lvis .дк.дк306 .port-button{min-height:48px;min-width:66px;border:2px solid #8b6839;border-radius:14px;padding:9px 14px;font:900 18px 'NunitoДК',sans-serif;color:#244b51;background:linear-gradient(#fff9e5,#edd6a7);box-shadow:0 3px 0 #71542f;cursor:pointer;touch-action:manipulation}
 #lvis .дк.дк306 .port-button:disabled{opacity:.5;cursor:default}#lvis .дк.дк306 .port-button:active{transform:translateY(2px)}
 #lvis .дк.дк306 .port-feedback{font-size:16px;line-height:1.4;min-height:52px;margin:0;padding:10px 14px;border-radius:12px;background:#fcf0d5;color:#455555;border-left:4px solid #c5a263}
 #lvis .дк.дк306 .port-feedback.is-good{background:#dcebdc;border-color:#4c987a;color:#24583e}
 #lvis .дк.дк306 .port-note{display:grid;gap:6px;background:#fff7df;border-radius:14px;padding:14px;text-align:center;font-size:18px;color:#244b51}
 #lvis .дк.дк306 .port-note small{font-size:13px;color:#846439}#lvis .дк.дк306 .port-target{cursor:pointer}#lvis .дк.дк306 .port-target:focus-visible{outline:3px solid #15a4b2;outline-offset:2px}
 #lvis .дк.дк306 .port-lift{transition:transform .8s cubic-bezier(.25,.6,.3,1)}#lvis .дк.дк306 .port-grounded{animation:none}#lvis .дк.дк306 .port-launch{animation:port-up 1.6s ease-out both;transform-origin:center}
 #lvis .дк.дк306 .сцена{border-color:#917345;background:#d4ece8}#lvis .дк.дк306 .дт-лента{font-size:16px;flex-wrap:wrap;justify-content:center;gap:5px}
 #lvis .дк.дк306 .дт-лента .зв{flex-wrap:wrap;max-width:200px}#lvis .дк.дк306 .число.длин.длин .окно{font-size:18px}
 @keyframes port-up{from{transform:translateY(20px)}to{transform:translateY(-8px)}}
 @media(max-width:600px){#lvis .дк.дк306 .реплика .аватар{display:none}#lvis .дк.дк306 .реплика{padding:22px 21px;min-height:0}#lvis .дк.дк306 .реплика p{font-size:16px}}
 @media(max-width:360px){#lvis .дк.дк306 .реплика{padding:16px 14px;gap:6px}#lvis .дк.дк306 .реплика p{font-size:16px}#lvis .дк.дк306 .аватар{width:34px}#lvis .дк.дк306 .аватар img{width:34px}#lvis .дк.дк306 .port-button{font-size:16px;padding:8px 10px}}
 /* Illustrated port UI: scalable artwork with readable live text. */
 body:has(.дк306){background:radial-gradient(ellipse at 50% 0,#224b4e 0,#102c2e 45%,#0b1d23 100%)}
 #screen:has(.дк306){font-family:'NunitoДК',sans-serif}
 #screen:has(.дк306)>h2{font-family:'NunitoДК',sans-serif;font-size:19px;line-height:1.25;color:#f2d9a6;max-width:640px;margin:12px auto 6px}
 #lvis .дк.дк306 .реплика{display:grid;grid-template-columns:1fr 44px;gap:4px 10px;background:none;filter:drop-shadow(0 5px 5px #071c2360);border:24px solid transparent;border-image:url('img/l306/window-v2.webp') 22% 23% fill / 24px stretch;padding:0 6px 6px;min-height:0}
 #lvis .дк.дк306 .реплика .аватар{display:flex;flex-direction:row;gap:8px;width:auto;grid-column:1;grid-row:1;justify-self:start;align-self:center}
 #lvis .дк.дк306 .реплика .аватар img{display:block;width:28px;height:40px;object-fit:contain}
 #lvis .дк.дк306 .реплика .аватар span{font-size:15px;letter-spacing:.06em;color:#24676b;text-transform:uppercase;font-weight:900}
 #lvis .дк.дк306 .реплика p{grid-column:1/-1;grid-row:2;font-size:17px;line-height:1.38;font-weight:800;color:#29484b}
 #lvis .дк.дк306 .слушать{grid-column:2;grid-row:1;width:44px;height:44px;min-height:44px;background:radial-gradient(circle at 35% 25%,#6bc6c3,#1e646b);border:3px solid #d9b465;color:#fff4d3;box-shadow:inset 0 1px 1px #b8e2d6,0 2px 0 #836038;font-size:20px}
 #lvis .дк.дк306 .port-button,#lvis .дк.дк306 .число,#lvis .дк.дк306 .дт-подск,#lvis .дк.дк306 .дальше-кн,#screen:has(.дк306)>.btnrow>button,#screen:has(.дк306)>button{
  appearance:none;background:none;border:14px solid transparent;border-image:url('img/l306/button-v2.webp') 24% 13% fill / 14px 18px 18px stretch;border-radius:18px;padding:0 8px 3px;min-height:58px;min-width:74px;font:900 17px/1.25 'NunitoДК',sans-serif;color:#24565b;box-shadow:none;filter:drop-shadow(0 3px 2px #061c2166);transition:transform .15s,filter .15s;cursor:pointer;text-shadow:0 1px #fff8e4}
 #lvis .дк.дк306 .число .окно{background:none;border:0;box-shadow:none;min-height:0;height:auto;min-width:0;padding:0!important;color:inherit;font-size:22px;line-height:1.3}
 #lvis .дк.дк306 .число.длин.длин .окно{font-size:17px;min-height:0}
 #lvis .дк.дк306 .число.верно{color:#27653e;filter:drop-shadow(0 0 4px #a6e2b5)}
 #lvis .дк.дк306 .число.мимо{color:#a4443b}
 #lvis .дк.дк306 button:disabled,#screen:has(.дк306)>.btnrow>button:disabled{opacity:.5;cursor:default}
 #lvis .дк.дк306 .число.верно:disabled{opacity:1}
 #lvis .дк.дк306 button:not(:disabled):active,#screen:has(.дк306)>.btnrow>button:not(:disabled):active{transform:translateY(3px);filter:brightness(.96)}
 #lvis .дк.дк306 button:focus-visible,#screen:has(.дк306) button:focus-visible{outline:3px solid #9be7e1;outline-offset:3px}
 #lvis .дк.дк306 .port-controls{gap:7px}
 #lvis .дк.дк306 .port-feedback,#lvis .дк.дк306 .готово,#lvis .дк.дк306 .разбор,#lvis .дк.дк306 .дт-совет{position:relative;min-height:54px;margin:0;border:1px solid #d7bc80;border-left:5px solid #4a9595;border-radius:16px;padding:13px 16px;background:linear-gradient(135deg,#fffbed,#efe3c7);box-shadow:inset 0 0 0 3px #fffae8,0 3px 8px #051b2440;color:#345357;font-size:16px;line-height:1.4;font-weight:800}
 #lvis .дк.дк306 .port-feedback.is-good,#lvis .дк.дк306 .готово{background:linear-gradient(135deg,#eff9e6,#d6ead8);border-left-color:#57956a;color:#305f45}
 #lvis .дк.дк306 .port-note{border:22px solid transparent;border-image:url('img/l306/window-v2.webp') 22% 23% fill / 22px stretch;padding:4px 5px 8px;background:none;font-size:18px}
 #lvis .дк.дк306 .что-делать{background:#183e42;border:1px solid #477474;border-radius:12px;color:#f7e7be;font-size:15px;padding:10px 12px;margin:0}
 #lvis .дк.дк306 .сцена{border:3px solid #bb995c;box-shadow:0 0 0 2px #345e60,0 8px 18px #07171d66;border-radius:22px}
 #lvis .дк.дк306 .дт-лента{border:1px solid #bf9d62;border-radius:14px;background:linear-gradient(#326b6c,#234e54);color:#fff0c9;box-shadow:inset 0 0 0 3px #3f7170;font-size:15px;padding:10px 13px}
 #lvis .дк.дк306 .port-chapter{padding:2px 5px;color:#f0d7a1;font-size:11px;letter-spacing:.1em;font-weight:900}
 #lvis .дк.дк306 .дт-итог{color:#fff0c9}
 @media(max-width:360px){#lvis .дк.дк306 .реплика{border-width:21px;border-image-width:21px;padding:0 1px 4px}#lvis .дк.дк306 .реплика p{font-size:16px}#lvis .дк.дк306 .port-button{font-size:16px;padding-left:5px;padding-right:5px}#screen:has(.дк306)>h2{font-size:17px}}


 #lvis .дк.дк306{font-weight:700}
 #lvis .дк.дк306 .реплика p{font-weight:700;font-size:17px;line-height:1.4}
 #lvis .дк.дк306 .port-button,#lvis .дк.дк306 .число,#lvis .дк.дк306 .дальше-кн,#screen:has(.дк306)>.btnrow>button{font-weight:800}
 #lvis .дк.дк306 .port-feedback,#lvis .дк.дк306 .готово,#lvis .дк.дк306 .разбор{font-weight:700}
 #lvis .дк.дк306 .port-chapter{font-size:12px;letter-spacing:.04em}
 @media(max-width:360px){#lvis .дк.дк306 .реплика p{font-size:16px}}
 #lvis .дк.дк306 .port-cargo-controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));align-items:stretch}
 #lvis .дк.дк306 .port-cargo-controls .port-button{min-width:0;min-height:64px;font-size:16px;line-height:1.25;padding:0 2px 3px}
 @media(max-width:360px){#lvis .дк.дк306 .port-cargo-controls .port-button{font-size:15px}}

 /* Centre live labels on the enamel face, excluding the lower wooden bevel. */
 #lvis .дк.дк306 button.port-button,#lvis .дк.дк306 button.число,#lvis .дк.дк306 button.дальше-кн,#lvis .дк.дк306 button.дт-подск,#screen:has(.дк306)>.btnrow>button,#screen:has(.дк306)>button{
  display:inline-flex;align-items:center;justify-content:center;text-align:center;white-space:normal;line-height:1.2;
  border-width:10px 14px 22px;padding:0 6px 0;vertical-align:middle;box-sizing:border-box;
 }
 #lvis .дк.дк306 button.число .окно{display:block;width:100%;height:auto;min-height:0;line-height:1.2;text-align:center;padding:0!important}
 #lvis .дк.дк306 .port-cargo-controls button.port-button{padding:0 2px;border-width:10px 14px 22px}

 #lvis .дк.дк306:has(.port-practice)>.числа,#lvis .дк.дк306:has(.port-finale)>.готово{display:none}
 #lvis .дк.дк306 .дт-лента .зв{display:grid;grid-template-columns:repeat(6,15px);gap:2px 3px;max-width:none;line-height:1}
 #lvis .дк.дк306 .port-finale{display:grid;gap:12px}
 #lvis .дк.дк306 .port-practice{display:grid;gap:10px;min-width:0}
 #lvis .дк.дк306 .port-practice .port-controls{display:flex;flex-wrap:wrap}
 @media(prefers-reduced-motion:reduce){#lvis .дк.дк306 *{animation:none!important;transition:none!important}}`;
 document.head.appendChild(style);
})();
