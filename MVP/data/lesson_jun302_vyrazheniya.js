/* Lesson 302: a letter records the original quantity; actions reveal its expression's value.
   Story and practice share a pure, serializable model. Native lesson rewards remain authoritative. */
(function(){
'use strict';
const ID=302,A='img/l302-glow/',keys=['iskra','tish'];
const scenes=[
 {kind:'add',a:3,op:'+',n:2,t:'Огоньки у тропы',who:0,bg:'valley',q:'Я Искра. В долине засыпают огни. У тропы уже 3 светлячка. Позовём ещё 2 — и увидим дорогу!',hint:'Зови по одному светлячку. Когда прилетят двое, пересчитай всех у тропы.',sol:'3 + 2 = 5. Пять светлячков осветили начало пути.'},
 {kind:'identify',a:3,op:'+',n:2,t:'Запись и её значение',who:1,bg:'glade',q:'Я Тиш. Сохраним наш первый опыт: 3 + 2 = 5. Запись 3 + 2 — числовое выражение: в ней числа и знак действия. Число 5 — его значение.',questions:[{q:'Найди выражение: запись действия.',opts:['3 + 2','5'],answer:0},{q:'Найди значение: получившееся число.',opts:['3 + 2','5'],answer:1}],hint:'Выражение показывает, что нужно посчитать. Значение — число, которое получилось.',sol:'3 + 2 — числовое выражение, а 5 — его значение.'},
 {kind:'letter',letter:'a',op:'+',n:2,t:'Буква на листочке',who:0,bg:'glade',q:'В густой траве прячутся светлячки. Их число пока неизвестно — обозначим его буквой a. Ещё 2 прилетят к ним. Как это записать?',opts:['a + 2','a − 2','2'],answer:0,hint:'Буква a обозначает число светлячков вначале. «Прилетят ещё» записываем знаком плюс.',sol:'a + 2 — буквенное выражение: в нём есть буква. Она обозначает начальное число, а + 2 означает, что прилетят ещё двое.'},
 {kind:'substitute',letter:'a',a:4,op:'+',n:2,t:'Приоткроем траву',who:0,bg:'glade',q:'Теперь мы знаем: a = 4. Поставь 4 вместо буквы, позови ещё двух светлячков и узнай значение a + 2.',hint:'Вместо a поставь 4. Было 4, прилетят 2. Буква a по-прежнему означает начальные 4.',sol:'a = 4, поэтому a + 2 = 6. Начальное число — 4, значение выражения — 6.'},
 {kind:'trials',letter:'a',values:[2,5,6],op:'+',n:3,t:'Одна запись — разные огни',who:1,bg:'bridge',q:'У каждой тропы было своё число светлячков. Обозначим его буквой a. Везде зовём ещё 3. Проверь a + 3 для трёх троп и заполни мои заметки.',hint:'Для каждой тропы сначала подставь её начальное число вместо a, потом позови троих и посчитай всех.',sol:'2 + 3 = 5; 5 + 3 = 8; 6 + 3 = 9. Правило одно, значения разные.'},
 {kind:'repair',letter:'x',a:4,op:'+',n:5,t:'Тиш перепутал запись',who:1,bg:'bridge',q:'Я поставил рядом 4 и 5 и написал 45. Но здесь нужно сложить числа! Помоги найти значение x + 5, если x = 4.',hint:'45 — число из двух цифр. А знак плюс просит сложить: к четырём светлячкам позвать пятерых.',sol:'4 + 5 = 9, а не 45. Складываем количества, а не приписываем цифры.'},
 {kind:'remove',letter:'b',a:7,op:'−',n:2,t:'Двое летят отдыхать',who:0,bg:'bridge',q:'У ручья было семь светлячков: b = 7. Двое полетят отдыхать. Найди значение b − 2: отпусти двоих и посчитай оставшихся.',hint:'Подставь 7 вместо b. Отпусти 2 по одному. Буква b обозначает начальные 7, даже когда у ручья останется меньше.',sol:'7 − 2 = 5. У ручья осталось 5 светлячков.'},
 {kind:'compose',t:'Записи для двух троп',who:1,bg:'valley',rounds:[{letter:'a',op:'+',n:3},{letter:'c',op:'−',n:2}],q:'Составим два сообщения. На первой тропе было a светлячков. Прилетят ещё 3. На второй было c светлячков. Двое улетят.',hint:'Сначала поставь букву, которая обозначает начальное число. Затем знак: прилетят — плюс, улетят — минус. В конце — сколько прилетит или улетит.',sol:'Первая тропа: a + 3. Вторая тропа: c − 2. Записи точно передают действия.'},
 {kind:'explore',letter:'a',a:0,op:'+',n:4,t:'Твоя световая лаборатория',who:0,bg:'glade',q:'Выбери, сколько светлячков было вначале. Мы всегда зовём ещё 4. Попробуй хотя бы три разных начальных числа. Посмотри, как меняется результат!',hint:'Меняй a кнопками «меньше» и «больше», затем проверяй a + 4. Можно начать и с нуля: это значит, что пока никого нет.',sol:'Первые три опыта готовы! Каждый раз к начальному числу прибавляется 4. Можно исследовать дальше!'},
 {kind:'compare',letter:'a',a:4,ops:[{op:'+',n:2},{op:'+',n:5}],answer:1,t:'Где больше светлячков?',who:1,bg:'valley',q:'У каждой тропы было по четыре светлячка: a = 4. К первой зовём 2, ко второй — 5. Проверь обе тропы и выбери ту, где светлячков больше.',hint:'Сначала посчитай обе тропы: 4 + 2 и 4 + 5. Вначале было поровну. Куда прилетело больше, там и светлячков больше.',sol:'На второй тропе 9, на первой 6. Вначале было поровну. Куда прилетело больше, там и стало больше.'},
 {kind:'compare',letter:'b',a:7,ops:[{op:'−',n:1},{op:'−',n:3}],answer:0,t:'Кому осталось светить?',who:0,bg:'bridge',q:'У каждой тропы было по семь светлячков: b = 7. С первой улетает один, со второй — трое. Проверь обе и выбери, где осталось больше.',hint:'Посчитай 7 − 1 и 7 − 3. Если из одинаковых количеств убрать меньше, останется больше.',sol:'На первой осталось 6, на второй 4. Убрали меньше — осталось больше.'},
 {kind:'final',letter:'a',a:6,op:'+',n:2,t:'Долина проснулась',who:0,bg:'festival',q:'Последний огонёк пути! Здесь было шесть светлячков: a = 6. Найди значение a + 2 — подставь число, позови светлячков и заверши нашу световую карту.',hint:'Поставь 6 вместо a. Позови ещё 2 и посчитай, сколько стало.',sol:'6 + 2 = 8. Ты умеешь читать выражения, подставлять числа и находить значения. Долина сияет!'}
];
const tasks=[
 {kind:'remove',letter:'b',a:9,op:'−',n:3,t:'Ночной дозор',q:'Найди значение b − 3, если b = 9',nativeKind:'unit',nativeAns:6,hint:'Подставь 9 вместо b. Отпусти троих по одному и посчитай остальных.',sol:'b − 3 = 9 − 3 = 6'},
 {kind:'repair',letter:'x',a:4,op:'+',n:5,t:'Записка Тиша',q:'Чему равно x + 5, если x = 4?',nativeKind:'choice',nativeChoices:['45','9','1','54'],nativeAns:1,hint:'Поставь 4 вместо x. Позови ещё 5: нужно сложить количества, а не приписать цифру.',sol:'4 + 5 = 9.'},
 {kind:'substitute',letter:'c',a:7,op:'+',n:3,t:'Огни над ручьём',q:'Чему равно c + 3, если c = 7?',nativeKind:'unit',nativeAns:10,hint:'Подставь 7 вместо c. Позови троих и пересчитай всех.',sol:'c + 3 = 7 + 3 = 10'},
 {kind:'identify',a:4,op:'+',n:2,t:'Запись на листке',q:'Из четырёх огней и ещё двух получилось шесть. Найди выражение.',questions:[{q:'Что здесь выражение?',opts:['6','4 + 2'],answer:1}],hint:'Выражение — запись действия. Найди числа со знаком плюс.',sol:'4 + 2 — выражение. Оно показывает, что нужно сложить.'},
 {kind:'identify',a:7,op:'−',n:2,t:'Число для карты',q:'7 − 2 = 5. Найди значение выражения.',questions:[{q:'Что здесь значение выражения?',opts:['7 − 2','5'],answer:1}],hint:'Значение — число, которое получилось после вычисления.',sol:'Значение выражения 7 − 2 равно 5.'},
 {kind:'compose',rounds:[{letter:'a',op:'+',n:3}],t:'Приглашение светлячкам',q:'Было a светлячков. Прилетят ещё 3. Собери выражение.',hint:'Сначала a. Светлячков станет больше — нужен плюс. Затем поставь 3.',sol:'a + 3: к начальному числу прибавляем 3.'},
 {kind:'compose',rounds:[{letter:'c',op:'−',n:2}],t:'Время отдыхать',q:'Было c светлячков. Двое улетят. Собери выражение.',hint:'Сначала c. Светлячков останется меньше — нужен минус. Затем поставь 2.',sol:'c − 2: из начального числа вычитаем 2.'},
 {kind:'substitute',letter:'a',a:6,op:'+',n:2,t:'Последние огни тропы',q:'Найди значение a + 2, если a = 6.',hint:'Подставь 6, затем позови ещё двух светлячков.',sol:'a + 2 = 6 + 2 = 8.'},
 {kind:'trials',letter:'a',values:[2,5],op:'+',n:3,t:'Две строки заметок',q:'Найди значение a + 3 сначала при a = 2, а потом при a = 5.',hint:'Для первой строки посчитай 2 + 3, для второй — 5 + 3.',sol:'Если a = 2, значение выражения равно 5. Если a = 5, оно равно 8.'},
 {kind:'substitute',letter:'a',a:0,op:'+',n:4,t:'Пока ни одного',q:'У тропы пока нет светлячков: a = 0. Найди значение a + 4.',hint:'Ноль означает, что светлячков пока нет. Позови четверых. Других светлячков у тропы нет.',sol:'0 + 4 = 4. Никого не было, прилетели четверо — стало четыре.'},
 {kind:'compare',letter:'a',a:3,ops:[{op:'+',n:2},{op:'+',n:5}],answer:1,t:'Две световые дорожки',q:'Вначале у каждой тропы было по три светлячка: a = 3. Где будет больше: a + 2 или a + 5?',hint:'Проверь 3 + 2 и 3 + 5. Вначале было поровну. Где прибавили больше, там и получилось больше.',sol:'3 + 5 = 8, а 3 + 2 = 5. На второй тропе больше.'},
 {kind:'compare',letter:'b',a:8,ops:[{op:'−',n:1},{op:'−',n:3}],answer:0,t:'Последняя развилка',q:'Вначале у каждой тропы было по восемь светлячков: b = 8. Где останется больше: b − 1 или b − 3?',hint:'Проверь 8 − 1 и 8 − 3. Вначале было поровну. Где убрали меньше, там и осталось больше.',sol:'8 − 1 = 7, а 8 − 3 = 5. На первой тропе больше.'}
];
tasks.forEach((t,i)=>{t.who=i%2;t.bg=['valley','glade','bridge','festival'][Math.floor(i/3)];if(t.nativeAns===undefined){t.nativeKind='choice';t.nativeChoices=t.kind==='compare'?['Первая тропа','Вторая тропа']:t.kind==='identify'?t.questions[0].opts:t.kind==='compose'?[t.rounds[0].letter+' + '+t.rounds[0].n,t.rounds[0].letter+' − '+t.rounds[0].n]:t.kind==='trials'?['5 и 8','2 и 5','3 и 3']:[String(t.a+t.n),String(t.a),String(t.n)];t.nativeAns=t.kind==='compare'?t.answer:t.kind==='identify'?t.questions[0].answer:t.kind==='compose'?(t.rounds[0].op==='+'?0:1):0;}});
const count=(a,op,n)=>op==='−'?a-n:a+n;
const start=(c,s)=>c.kind==='trials'?c.values[Math.min(s.round,c.values.length-1)]:c.a;
const result=(c,s)=>count(start(c,s),c.op,c.n);
const isArithmetic=c=>['add','substitute','remove','repair','final','trials'].includes(c.kind);
function initial(c){return {ok:false,fb:'',tone:'',picked:null,substituted:c.kind==='add',delta:0,round:0,rows:[],tokens:[],expressions:[],value:0,visited:[],lit:[false,false],rev:0};}
function finish(c,s){s.ok=true;s.fb=c.sol;s.tone='success';}
function apply(c,s,action,value){
 if(!c||!s||!Number.isInteger(s.rev)||(!(!s.ok||c.kind==='explore'&&['start','test'].includes(action))))return false;
 const accept=()=>{s.rev++;return true;};
 const error=t=>{s.fb=t;s.tone='error';return accept();};
 const clear=()=>{s.fb='';s.tone='';};
 if(action==='hint'){s.fb=c.hint;s.tone='hint';return accept();}
 if(isArithmetic(c)){
  const a=start(c,s);
  if(action==='place'){
   if(s.substituted||!Number.isInteger(value)||value<0||value>12)return false;
   if(value!==a)return error(`В условии ${c.letter} = ${a}. Поставь ${a} вместо буквы.`);
   s.substituted=true;clear();return accept();
  }
  if(action==='move'){
   if(!s.substituted||![1,-1].includes(value)||s.delta+value<0||s.delta+value>c.n)return false;
   s.delta+=value;clear();return accept();
  }
  if(action==='answer'){
   if(!s.substituted||s.delta!==c.n||!Number.isInteger(value)||value<0||value>99)return false;
   if(value!==result(c,s))return error(c.kind==='repair'?'Знак плюс просит сложить количества. Пересчитай светлячков, не соединяй цифры.':'Пересчитай светлячков у тропы по одному. Попробуй ещё.');
   if(c.kind==='trials'){
    s.rows.push([a,value]);
    if(s.round<c.values.length-1){s.round++;s.delta=0;s.substituted=false;s.fb='Записали! Теперь проверь следующую тропу.';s.tone='hint';}
    else finish(c,s);
   }else finish(c,s);
   return accept();
  }
 }else if(c.kind==='identify'||c.kind==='letter'){
  if(action!=='pick'||!Number.isInteger(value))return false;
  const q=c.kind==='identify'?c.questions[s.round]:c;
  if(!q||value<0||value>=q.opts.length)return false;
  s.picked=value;if(value!==q.answer)return error(c.hint);
  if(c.kind==='identify'&&s.round<c.questions.length-1){s.round++;s.picked=null;s.fb='Верно! Теперь найди вторую часть записи.';s.tone='hint';}else finish(c,s);
  return accept();
 }else if(c.kind==='compose'){
  const r=c.rounds[s.round];if(action!=='token'||typeof value!=='string'||!['a','c','+','−','2','3'].includes(value)||!r)return false;
  const want=[r.letter,r.op,String(r.n)];
  if(value!==want[s.tokens.length])return error(s.tokens.length===0?'Начни с буквы: она обозначает число светлячков вначале.':s.tokens.length===1?(r.op==='+'?'Светлячки прилетают. Какой знак показывает, что мы прибавляем?':'Светлячки улетают. Какой знак показывает, что мы вычитаем?'):`В конце нужно число ${r.n}: столько светлячков ${r.op==='+'?'прилетит':'улетит'}.`);
  s.tokens.push(value);clear();
  if(s.tokens.length===3){s.expressions.push(want.join(' '));if(s.round<c.rounds.length-1){s.round++;s.tokens=[];s.fb='Первое сообщение готово. Теперь собери второе.';s.tone='hint';}else finish(c,s);}
  return accept();
 }else if(c.kind==='explore'){
  if(action==='start'){
   if(![1,-1].includes(value)||s.value+value<0||s.value+value>6)return false;
   s.value+=value;clear();return accept();
  }
  if(action==='test'){
   if(value!==null&&value!==undefined||s.visited.includes(s.value))return false;
   s.visited.push(s.value);s.rows.push([s.value,s.value+c.n]);
   if(s.visited.length>=3)finish(c,s);else{s.fb='Опыт записан. Выбери другое число для a.';s.tone='hint';}
   return accept();
  }
 }else if(c.kind==='compare'){
  if(action==='light'){
   if(![0,1].includes(value)||s.lit[value])return false;s.lit[value]=true;clear();return accept();
  }
  if(action==='route'){
   if(![0,1].includes(value)||!s.lit.every(Boolean))return false;
   s.picked=value;if(value!==c.answer)return error('Посмотри на обе тропы и сравни получившиеся числа. Где светлячков больше?');finish(c,s);return accept();
  }
 }
 return false;
}
function restoreSolved(c,s){
 Object.assign(s,initial(c));
 if(isArithmetic(c)){s.substituted=true;s.delta=c.n;if(c.kind==='trials'){s.round=c.values.length-1;s.rows=c.values.map(a=>[a,count(a,c.op,c.n)]);}}
 if(c.kind==='identify'){s.round=c.questions.length-1;s.picked=c.questions[s.round].answer;}
 if(c.kind==='letter')s.picked=c.answer;
 if(c.kind==='compose'){s.round=c.rounds.length-1;s.expressions=c.rounds.map(r=>`${r.letter} ${r.op} ${r.n}`);const r=c.rounds[s.round];s.tokens=[r.letter,r.op,String(r.n)];}
 if(c.kind==='compare'){s.lit=[true,true];s.picked=c.answer;}
 if(c.kind==='explore'){s.value=2;s.visited=[0,1,2];s.rows=s.visited.map(a=>[a,a+c.n]);}
 finish(c,s);return s;
}
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function equation(parts){return `<div class="glow-equation">${parts.map((x,i)=>`<span class="${/^[abcx]$/.test(String(x))?'letter':i===parts.length-1&&parts.includes('=')?'answer':''}">${esc(x)}</span>`).join('')}</div>`;}
function firefly(x,y,i,changed){return `<g class="glow-firefly${changed?' is-new':''}" data-firefly="${i}" transform="translate(${x} ${y})"><image href="${A}firefly-painted.webp" x="-29" y="-34" width="58" height="68" preserveAspectRatio="xMidYMid meet"/></g>`;}
function flock(n,original,label){
 const cols=5,rows=Math.max(1,Math.ceil(n/cols));let items='';
 for(let i=0;i<n;i++){const row=Math.floor(i/cols),k=Math.min(cols,n-row*cols);items+=firefly(150+(i%cols-(k-1)/2)*59,43+row*78,i,i>=original);}
 return `<figure class="glow-counting" data-original="${original}" data-current="${n}"><svg viewBox="0 0 300 ${rows*78+6}" role="img" aria-label="${esc(label)}">${items||'<path d="M75 43Q150 18 225 43M110 49Q150 39 190 49" stroke="#94a380" stroke-width="2" fill="none"/>'}</svg><figcaption class="glow-label">${esc(label)}</figcaption></figure>`;
}
function cast(c,s){const pose=s.ok?'happy':s.delta>0||(s.substituted&&c.kind!=='add')||s.lit.some(Boolean)||s.tokens.length?'action':'idle';return `<div class="glow-stage"><img class="glow-background" src="${A}${c.bg||'glade'}.webp?art=961" alt=""><div class="glow-cast"><img class="iskra" src="${A}iskra-${pose}.webp?art=961" alt="Саламандра Искра"><img class="tish" src="${A}tish-${pose}.webp?art=961" alt="Мотылёк Тиш"></div></div>`;}
function journal(rows,letter,op,n){return `<table class="glow-journal"><caption>Заметки Тиша</caption><thead><tr><th scope="col">${letter}: вначале</th><th scope="col">${letter} ${op} ${n}: значение</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('')}</tbody></table>`;}
function renderGame(c,s,scope,index){
 const click=(a,v)=>`GLOW302.act('${scope}',${index},'${a}',${esc(JSON.stringify(v===undefined?null:v))},${s.rev})`;
 const btn=(label,a,v,mod='primary',disabled=false,selected=false)=>`<button type="button" class="glow-button ${mod}${selected?' chosen':''}" onclick="${click(a,v)}" ${disabled?'disabled':''}>${esc(label)}</button>`;
 const options=(vals,a)=>`<div class="glow-controls">${vals.map(v=>btn(v,a,v,'number')).join('')}</div>`;
 let body='',prompt='';
 if(isArithmetic(c)){
  const a=start(c,s),n=count(a,c.op,s.delta),ready=s.substituted&&s.delta===c.n;
  if(c.letter)body+=`<p class="glow-given">Вначале <strong>${c.letter} = ${a}</strong></p><div class="glow-substitution">${equation([c.letter,c.op,c.n])}${s.substituted?equation([a,c.op,c.n,'=',s.ok?result(c,s):'?']):''}</div>`;
  else body+=equation([a,c.op,c.n,'=',s.ok?result(c,s):'?']);
  if(c.kind==='repair'&&!s.ok)body+='<p class="glow-label">Тиш написал <s>45</s>. Проверим сложением.</p>';
  if(s.substituted)body+=flock(n,a,n===0?'У тропы пока нет светлячков':s.ok?`Сейчас у тропы: ${n}`:'Светлячки у тропы');
  if(!s.ok){
   if(!s.substituted){prompt=`Какое число поставим вместо ${c.letter}?`;body+=options([...new Set([Math.max(0,a-1),a,a+1])],'place');}
   else if(!ready){prompt=c.op==='−'?`Отпусти ${c.n} по одному. Уже улетело: ${s.delta}.`:`Позови ${c.n} по одному. Уже прилетело: ${s.delta}.`;body+=`<div class="glow-controls">${btn(c.op==='−'?'Отпустить одного':'Позвать одного','move',1)}${s.delta?btn('Отменить последнее действие','move',-1,'wing'):''}</div>`;}
   else{prompt='Какое значение получилось?';const r=result(c,s);body+=options([...new Set([Math.max(0,r-1),r,r+1,...(c.kind==='repair'?[45]:[])])],'answer');}
  }
  if(c.kind==='trials'){body+=`<p class="glow-progress">Тропа ${s.round+1} из ${c.values.length}</p>`;if(s.rows.length)body+=journal(s.rows,c.letter,c.op,c.n);}
 }else if(c.kind==='identify'){
  const q=c.questions[s.round];body+=flock(count(c.a,c.op,c.n),c.a,`После действия: ${count(c.a,c.op,c.n)}`)+equation([c.a,c.op,c.n,'=',count(c.a,c.op,c.n)]);prompt=q.q;
  body+=`<div class="glow-controls">${q.opts.map((v,i)=>btn(v,'pick',i,'number',s.ok,s.ok&&i===q.answer)).join('')}</div>`;
 }else if(c.kind==='letter'){
  body+=`<div class="glow-composer">${equation(['a','=','?'])}<p class="glow-label">Число в траве пока неизвестно</p></div>`+flock(2,0,'Ещё двое прилетят');prompt='Как запишем: к a прилетят ещё 2?';body+=`<div class="glow-controls">${c.opts.map((v,i)=>btn(v,'pick',i,'number',s.ok,s.ok&&i===c.answer)).join('')}</div>`;
 }else if(c.kind==='compose'){
  const r=c.rounds[s.round];prompt=`Вначале — ${r.letter}. ${r.op==='+'?'Прилетят':'Улетят'} ${r.n}. Начни с буквы и собери запись слева направо.`;
  body+=`<div class="glow-composer"><div class="glow-equation">${[0,1,2].map(i=>`<span class="glow-slot">${esc(s.tokens[i]||'…')}</span>`).join('')}</div>`;
  if(!s.ok)body+=`<div class="glow-controls">${['a','c','+','−','2','3'].map(v=>btn(v,'token',v,'sign')).join('')}</div>`;body+='</div>';
  if(s.expressions.length)body+=`<div class="glow-progress">${s.expressions.map(x=>`<p>✓ ${esc(x)}</p>`).join('')}</div>`;
 }else if(c.kind==='explore'){
  const tested=s.visited.includes(s.value);prompt='Выбери начальное число, проверь выражение и сравни результаты.';
  body+=`<div class="glow-explorer"><p class="glow-given">Вначале <strong>a = ${s.value}</strong></p><div class="glow-controls">${btn('Меньше','start',-1,'wing',s.value===0)}${btn('Больше','start',1,'wing',s.value===6)}</div>${equation([s.value,'+',c.n,'=',tested?s.value+c.n:'?'])}${flock(tested?s.value+c.n:s.value,s.value,tested?`После опыта: ${s.value+c.n}`:`Вначале: ${s.value}`)}${btn(tested?'Опыт уже записан':'Позвать четверых и проверить','test',null,'primary',tested)}<p class="glow-progress">Разных начальных чисел проверено: ${s.visited.length} из 7. ${s.ok?'Путь открыт. Можно исследовать дальше.':'Чтобы пройти дальше, проверь хотя бы 3.'}</p></div>`;
  if(s.rows.length)body+=journal(s.rows,'a','+',c.n);
 }else if(c.kind==='compare'){
  prompt=s.lit.every(Boolean)?'Где светлячков больше? Выбери тропу.':'Проверь каждую тропу, прежде чем сравнивать.';
  body+=`<p class="glow-given">Вначале у каждой: <strong>${c.letter} = ${c.a}</strong></p><div class="glow-fork">${c.ops.map((o,j)=>{const n=count(c.a,o.op,o.n);return `<section class="glow-route-section"><h4 class="glow-label">${j?'Вторая':'Первая'} тропа</h4>${equation([c.letter,o.op,o.n])}${s.lit[j]?equation([c.a,o.op,o.n,'=',n])+flock(n,c.a,`Здесь ${n} светлячков`):''}${!s.lit[j]?btn('Проверить тропу','light',j):s.lit.every(Boolean)?btn('Здесь больше','route',j,'primary',s.ok,s.ok&&j===c.answer):'<p class="glow-label">Теперь проверь другую тропу.</p>'}</section>`;}).join('')}</div>`;
 }
 return `<div class="glow-game ${s.ok?'is-success':''}" data-kind="${c.kind}">${cast(c,s)}${prompt&&!s.ok?`<p class="glow-instruction">${esc(prompt)}</p>`:''}${body}${s.fb?`<p class="glow-feedback is-${s.tone}" role="status">${esc(s.fb)}</p>`:''}${!s.ok?`<div class="glow-help">${btn('Тиш, подскажи','hint',null,'wing')}</div>`:''}</div>`;
}
function store(){const r=lrec();if(!r.glow302||r.glow302.version!==1)r.glow302={version:1,frames:{},practice:{}};r.glow302.frames||={};r.glow302.practice||={};return r.glow302;}
function validState(c,raw){
 const fresh=initial(c);
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return fresh;
 const s={};for(const key of Object.keys(fresh))s[key]=raw[key];
 const integer=(v,lo,hi)=>Number.isInteger(v)&&v>=lo&&v<=hi;
 const maxRound=(c.values||c.rounds||c.questions||[0]).length-1;
 if(!integer(s.rev,0,1000000)||typeof s.ok!=='boolean'||typeof s.substituted!=='boolean'||!integer(s.delta,0,c.n||0)||!integer(s.round,0,maxRound)||!integer(s.value,0,6)||typeof s.fb!=='string'||s.fb.length>3000||!['','success','error','hint'].includes(s.tone))return fresh;
 if(!Array.isArray(s.lit)||s.lit.length!==2||s.lit.some(v=>typeof v!=='boolean')||!Array.isArray(s.visited)||s.visited.some(v=>!integer(v,0,6))||new Set(s.visited).size!==s.visited.length)return fresh;
 if(!Array.isArray(s.rows)||s.rows.length>7||s.rows.some(r=>!Array.isArray(r)||r.length!==2||!integer(r[0],0,12)||!integer(r[1],0,20)))return fresh;
 if(!Array.isArray(s.tokens)||s.tokens.length>3||s.tokens.some(v=>!['a','c','+','−','2','3'].includes(v))||!Array.isArray(s.expressions)||s.expressions.length>2||s.expressions.some(v=>typeof v!=='string'||!/^([ac]) [＋+−] [23]$/.test(v)))return fresh;
 if(s.picked!==null&&!integer(s.picked,0,10))return fresh;
 if(c.kind==='trials'&&s.rows.some((r,i)=>r[0]!==c.values[i]||r[1]!==count(c.values[i],c.op,c.n)))return fresh;
 if(c.kind==='explore'&&(s.rows.length!==s.visited.length||s.rows.some((r,i)=>r[0]!==s.visited[i]||r[1]!==r[0]+c.n)))return fresh;
 if(s.ok){
  const complete=isArithmetic(c)?s.substituted&&s.delta===c.n&&(c.kind!=='trials'||s.rows.length===c.values.length)
   :c.kind==='identify'?s.round===maxRound&&s.picked===c.questions[s.round].answer
   :c.kind==='letter'?s.picked===c.answer
   :c.kind==='compose'?s.expressions.length===c.rounds.length&&s.expressions.every((x,i)=>x===`${c.rounds[i].letter} ${c.rounds[i].op} ${c.rounds[i].n}`)
   :c.kind==='compare'?s.lit.every(Boolean)&&s.picked===c.answer
   :c.kind==='explore'?s.visited.length>=3:false;
  if(!complete)return fresh;
 }
 return JSON.parse(JSON.stringify(s));
}
function practiceState(i){const p=store().practice;p[i]=validState(tasks[i],p[i]);return p[i];}
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="glow302"><div class="glow-chapter"><span>Долина спящих огней</span><span>${i+1} / 12</span></div><h3 class="glow-heading">${c.t}</h3>${renderGame(c,s,'story',i)}</div>`,делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function act(scope,i,a,v,rev){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i)||!['story','practice'].includes(scope))return false;
 if(scope==='story'&&(LV.phase!=='explain'||LV.step!==i||!scenes[i]))return false;
 if(scope==='practice'&&(LV.phase!=='tasks'||LV.task!==i||!tasks[i]))return false;
 const c=scope==='story'?scenes[i]:tasks[i],s=scope==='story'?CHS[lidKey(ID)]?.п?.[i]:practiceState(i);
 if(!s||(rev!==undefined&&rev!==s.rev))return false;
 if(scope==='practice'&&lrec().tasks.includes(i)&&c.kind!=='explore')return false;
 window.GLOW302_AUDIO?.stop();
 if(!apply(c,s,a,v))return false;
 if(scope==='story'){sync();if(typeof chRender==='function')chRender(0);}
 else{save();if(s.ok&&!lrec().tasks.includes(i))lvPick(c.nativeAns);else if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();}
 if(a==='hint')window.GLOW302_AUDIO?.playKey((scope==='story'?'frame-':'task-')+i+'-hint');
 return true;
}
function practice(c,i){const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(c,s);return `<div class="glow302 glow-practice"><h3 class="glow-heading">${c.t}</h3>${renderGame(c,s,'practice',i)}</div>`;}
window.GLOW302={scenes,tasks,frames,initial,apply,restoreSolved,renderGame,act};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:{iskra:{имя:'Искра',ф:'iskra-idle'},tish:{имя:'Тиш',ф:'tish-idle'}},фоны:['valley'],кадры:frames,
 запись:{title:'Выражения · Долина спящих огней',ico:'✨',src:'Начальная школа · 1 класс · Числовые и буквенные выражения',subj:'jun',check:{q:'Найди значение a + 2, если a = 6',choices:['8','4','62','12'],ans:0,exp:'Подставляем: 6 + 2 = 8.'},tasks:tasks.map(t=>({q:t.q,kind:t.nativeKind,choices:t.nativeChoices,ans:t.nativeAns,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
 тренажёр:{герой:'iskra',проверка:{картинка:()=>`<div class="glow302">${cast(scenes[11],{...initial(scenes[11]),ok:true})}${equation(['a','+',2])}<p class="glow-given">a = 6</p></div>`,итог:'6 + 2 = 8. Сначала подставили число, потом посчитали.'},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),итог:t.sol})),финал:()=>`<div class="glow302 glow-finale">${cast(scenes[11],{...initial(scenes[11]),ok:true})}<h3 class="glow-heading">Все тропы светятся!</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button><p>Благодаря тебе Искра и Тиш прочитали записи, подставили числа и нашли значения выражений.</p><p>У одного буквенного выражения могут быть разные значения. Всё зависит от числа, которое подставили вместо буквы!</p></div>`}
});
let restored=false;
const originalRenderer=WAVE_B[ID];
WAVE_B[ID]=function(el){
 const k=lidKey(ID);CHS[k]||={};
 if(!restored){const data=store();CHS[k].п={};for(const [i,raw] of Object.entries(data.frames)){if(scenes[i])CHS[k].п[i]=validState(scenes[i],raw);}for(const [i,raw] of Object.entries(data.practice)){if(tasks[i])data.practice[i]=validState(tasks[i],raw);}restored=true;}
 originalRenderer(el);sync();
};
function sync(){
 if(typeof LV==='undefined'||LV.id!==ID)return;
 const p=CHS[lidKey(ID)]?.п||{},can=LV.phase!=='explain'||p[LV.step]?.ok===true;
 document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});
 store().frames=JSON.parse(JSON.stringify(p));save();
}
window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];if(typeof old!=='function')continue;window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
})();
