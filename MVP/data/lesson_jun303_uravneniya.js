/* River workshop: x always denotes the named missing part or the ORIGINAL whole.
   All counting actions are reversible taps; native lesson rewards stay authoritative. */
(function(){
'use strict';
const ID=303,A='img/l303-river/',C=window.RIVER303_CONTENT;
if(!C||!window.ДК)return;
const scenes=C.scenes,tasks=C.tasks,keys=['lada','flik'];
const clone=x=>JSON.parse(JSON.stringify(x));
const solution=c=>c.mode==='whole'?c.total:c.unknown;
const current=(c,s)=>c.kind==='concert'?c.rounds[Math.min(s.round,c.rounds.length-1)]:c;
const equationValue=(c,n)=>{const p=c.equation.map(v=>v==='x'?n:v);return {left:p[1]==='+'?p[0]+p[2]:p[0]-p[2],right:p[4],parts:p};};
const moving=c=>['build','remove','reunite'].includes(c.kind);
function initial(c){return {ok:false,fb:'',tone:'',delta:0,stage:moving(c)?'act':c.kind==='repair'?'probe':c.kind==='role'?'role':c.kind==='method'?'method':c.kind==='compose'?'compose':'answer',candidate:null,role:null,method:null,tokens:[],tested:false,round:0,completed:[],notes:[],rev:0};}
function finish(c,s){s.ok=true;s.stage='done';s.fb=c.sol;s.tone='success';}
function apply(c,s,action,v){
 if(!c||!s||!Number.isInteger(s.rev))return false;
 const p=current(c,s),accept=()=>{s.rev++;return true;},clear=()=>{s.fb='';s.tone='';},error=t=>{s.fb=t;s.tone='error';return accept();};
 if(action==='note'&&c.kind==='concert'&&s.ok&&Number.isInteger(v)&&v>=0&&v<5){s.notes=[...s.notes.slice(-7),v];return accept();}
 if(s.ok)return false;
 if(action==='hint'&&(v===null||v===undefined)){s.fb=c.hint;s.tone='hint';return accept();}
 if(action==='move'&&moving(c)&&s.stage==='act'&&[1,-1].includes(v)){
  const limit=c.kind==='remove'?c.total:c.kind==='reunite'?c.unknown:12-c.known;
  if(s.delta+v<0||s.delta+v>limit)return false;s.delta+=v;clear();return accept();
 }
 if(action==='count'&&moving(c)&&s.stage==='act'&&(v===null||v===undefined)){
  if(s.delta!==c.unknown)return error(c.kind==='remove'?`На причале сейчас ${c.total-s.delta}. Нужно оставить ${c.known}. Измени груз на плоту.`:c.kind==='reunite'?'Верни все унесённые пластинки. Их нужно соединить с оставшимися.':`Сейчас ${c.known+s.delta} звонков, а нужно ${c.total}. ${c.known+s.delta<c.total?'Добавь недостающие.':'Сними лишние.'}`);
  s.stage='answer';clear();return accept();
 }
 if(action==='role'&&s.stage==='role'&&['part','whole'].includes(v)){
  if(v!==(c.mode==='whole'?'whole':'part'))return error(c.mode==='whole'?'Мы ищем всё, что было до переноса. Это целое.':'Икс обозначает одну группу, а все группы вместе — целое.');s.role=v;s.stage='method';clear();return accept();
 }
 if(action==='method'&&s.stage==='method'&&['+','−'].includes(v)){
  if(v!==(c.mode==='whole'?'+':'−'))return error(c.mode==='whole'?'Чтобы вернуть всё, соедини обе части. Какой знак их соединяет?':'Чтобы найти скрытую часть, убери из целого известную. Какой знак нужен?');s.method=v;s.stage='answer';clear();return accept();
 }
 if(action==='probe'&&s.stage==='probe'&&(v===null||v===undefined)){s.tested=true;s.stage='answer';s.fb=`Проверили: ${c.mistake} + ${c.known} = ${c.mistake+c.known}. Нужно ${c.total}. Найдём другую величину для x.`;s.tone='error';return accept();}
 if(action==='token'&&s.stage==='compose'&&typeof v==='string'){
  const paths=[['x','+',String(c.known),'=',String(c.total)],[String(c.known),'+','x','=',String(c.total)]];
  if(!['x','+','−','=',String(c.known),String(c.total)].includes(v))return false;
  const next=[...s.tokens,v];if(!paths.some(path=>next.every((x,i)=>x===path[i])))return error(s.tokens.length===0?'Начни с одной из частей: x или известного числа.':s.tokens.length===1?'Мы соединяем части. Нужен плюс.':s.tokens.length===2?'Второе слагаемое — другая часть.':s.tokens.length===3?'После двух частей поставь знак равенства.':'После равенства — число всех деталей.');
  s.tokens=next;if(next.length===5)s.stage='answer';clear();return accept();
 }
 if(action==='undo'&&c.kind==='compose'&&['compose','answer'].includes(s.stage)&&s.tokens.length){s.tokens.pop();s.stage='compose';clear();return accept();}
 if(action==='answer'&&s.stage==='answer'&&Number.isInteger(v)&&v>=0&&v<=20){s.candidate=v;s.stage='check';clear();return accept();}
 if(action==='verify'&&s.stage==='check'&&(v===null||v===undefined)){
  const r=equationValue(p,s.candidate);
  if(r.left!==r.right){s.stage='answer';return error(`${r.parts[0]} ${r.parts[1]} ${r.parts[2]} = ${r.left}. А справа ${r.right}. Равенства нет. Попробуй другое число вместо x.`);}
  if(c.kind==='concert'){
   s.completed.push(s.candidate);if(s.round<c.rounds.length-1){s.stage='next';s.fb=p.sol;s.tone='success';}else finish(c,s);
  }else finish(c,s);
  return accept();
 }
 if(action==='next'&&c.kind==='concert'&&s.stage==='next'&&(v===null||v===undefined)){s.round++;s.candidate=null;s.stage='answer';clear();return accept();}
 return false;
}
function restoreSolved(c,s){Object.assign(s,initial(c));s.delta=moving(c)?c.unknown:0;s.candidate=solution(c);s.role=c.mode==='whole'?'whole':'part';s.method=c.mode==='whole'?'+':'−';if(c.kind==='compose')s.tokens=c.equation.map(String);if(c.kind==='repair')s.tested=true;if(c.kind==='concert'){s.round=c.rounds.length-1;s.completed=c.rounds.map(solution);s.candidate=solution(c.rounds[s.round]);}finish(c,s);return s;}
function validState(c,raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return initial(c);
 const s=Object.fromEntries(Object.keys(initial(c)).map(k=>[k,raw[k]])),int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
 if(typeof s.ok!=='boolean'||!int(s.rev,0,1000000)||!int(s.delta,0,12)||!int(s.round,0,(c.rounds||[0]).length-1)||!['act','answer','check','role','method','compose','probe','next','done'].includes(s.stage)||!['','hint','error','success'].includes(s.tone)||typeof s.fb!=='string'||s.fb.length>2000||typeof s.tested!=='boolean')return initial(c);
 if(s.candidate!==null&&!int(s.candidate,0,20)||!['part','whole',null].includes(s.role)||!['+','−',null].includes(s.method))return initial(c);
 if(!Array.isArray(s.tokens)||s.tokens.length>5||s.tokens.some(v=>typeof v!=='string'||!['x','+','−','=',String(c.known),String(c.total)].includes(v))||!Array.isArray(s.notes)||s.notes.length>8||s.notes.some(v=>!int(v,0,4))||!Array.isArray(s.completed)||s.completed.length>(c.rounds||[]).length||s.completed.some((v,i)=>v!==solution(c.rounds[i])))return initial(c);
 const start=initial(c).stage,allowed={act:['act','answer','check','done'],probe:['probe','answer','check','done'],role:['role','method','answer','check','done'],method:['method','answer','check','done'],compose:['compose','answer','check','done'],answer:['answer','check','next','done']}[start];
 if(!allowed.includes(s.stage)||s.ok!==(s.stage==='done')||s.stage==='check'&&s.candidate===null)return initial(c);
 if(moving(c)&&(s.delta>(c.kind==='remove'?c.total:c.kind==='reunite'?c.unknown:12-c.known)||s.stage!=='act'&&s.delta!==c.unknown))return initial(c);
 if(c.kind==='repair'&&s.stage!=='probe'&&!s.tested)return initial(c);
 if(c.kind==='role'&&s.stage!=='role'&&s.role!==(c.mode==='whole'?'whole':'part'))return initial(c);
 if(['role','method'].includes(c.kind)&&['answer','check','done'].includes(s.stage)&&s.method!==(c.mode==='whole'?'+':'−'))return initial(c);
 if(c.kind==='compose'){
  const paths=[c.equation.map(String),[String(c.known),'+','x','=',String(c.total)]];
  if(!paths.some(p=>s.tokens.every((v,i)=>p[i]===v))||s.stage!=='compose'&&s.tokens.length!==5)return initial(c);
 }
 if(c.kind==='concert'&&(s.completed.length!==s.round+(s.stage==='next'||s.ok?1:0)||s.stage==='next'&&s.round>=c.rounds.length-1))return initial(c);
 if(c.kind!=='concert'&&s.stage==='next'||s.ok&&(s.candidate!==solution(current(c,s))||c.kind==='concert'&&s.completed.length!==c.rounds.length))return initial(c);
 return clone(s);
}
const esc=x=>String(x).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const eq=parts=>`<div class="river-equation">${parts.map(x=>`<span class="${x==='x'?'unknown':''}">${esc(x)}</span>`).join('')}</div>`;
function chime(i,type){return type==='plate'?`<svg viewBox="0 0 52 70" aria-hidden="true"><path d="M26 0v12" stroke="#b1a072" stroke-width="2"/><path d="M12 12Q26 6 40 13L38 58Q25 65 13 58Z" fill="${i%2?'#cbae72':'#dcce99'}" stroke="#77643b" stroke-width="2"/><path d="M19 22Q30 18 34 22M18 39L33 37M18 52L31 50" stroke="#9f8a55" fill="none"/><circle cx="26" cy="16" r="3" fill="#4a5945"/></svg>`:`<svg viewBox="0 0 52 70" aria-hidden="true"><path d="M26 0v12" stroke="#b7a67d" stroke-width="2"/><path d="M19 19Q17 10 26 10Q35 10 33 19" fill="none" stroke="#bca468" stroke-width="3"/><path d="M15 22Q26 13 37 22L39 43Q41 49 46 51Q44 58 26 58Q8 58 6 51Q12 46 13 40Z" fill="${i%2?'#dbbd72':'#c7d3a4'}" stroke="#7b703f" stroke-width="2"/><path d="M18 26Q18 39 14 46M14 52Q28 55 38 51" stroke="#fff0bb" stroke-width="2" fill="none"/><ellipse cx="26" cy="59" rx="4" ry="5" fill="#ae8850"/><path d="M23 33L26 29L29 33L26 37Z" fill="#75835e"/></svg>`;}
function group(n,label,cls='',type='bell'){
 return `<section class="river-group ${cls}" data-count="${n}"><p class="river-group-title">${esc(label)}</p><div class="river-items">${Array.from({length:n},(_,i)=>`<span class="river-piece" data-piece="${i}">${chime(i,type)}</span>`).join('')||'<span class="river-empty">Пока ни одной</span>'}</div></section>`;
}
function art(c,s){return `<figure class="river-art"><img src="${A}${s.ok&&c.kind==='concert'?'concert':c.bg}.webp" alt="${({workshop:'Лада показывает Флику инструмент у речной мастерской',jetty:'Лада направляет плот к причалу, Флик наблюдает за переправой',stream:'Лада соединяет части музыкальной рамы, Флик помогает',concert:'Лада играет на речном инструменте, Флик дирижирует'})[c.bg]}" loading="eager"></figure>`;}
function objectType(c){return /пластин/.test(c.q)?'plate':'bell';}
function roleDiagram(c,s){const whole=c.mode==='whole',type=objectType(c);return `<div class="river-instrument merge"><p class="river-given">${whole?'Было всего: x':`Всего: ${c.total}`}</p>${group(c.known,whole?`Осталось: ${c.known}`:`Известная часть: ${c.known}`,'',type)}${whole?group(c.unknown,`Унесли: ${c.unknown}`,'river-boat',type):'<div class="river-curtain"><span>x</span><p>Другая часть</p></div>'}</div>`;}
function renderGame(c,s,scope,index){
 const p=current(c,s),type=objectType(p),click=(a,v)=>`RIVER303.act('${scope}',${index},'${a}',${esc(JSON.stringify(v===undefined?null:v))},${s.rev})`;
 const btn=(text,a,v,mod='primary',disabled=false)=>`<button type="button" class="river-button ${mod}" onclick="${click(a,v)}" ${disabled?'disabled':''}>${esc(text)}</button>`;
 const options=()=>{const n=solution(p),vals=[...new Set([Math.max(0,n-2),n,Math.min(20,n+1),p.kind==='repair'?p.mistake:p.mode==='whole'?Math.abs(p.known-p.unknown):p.total])].sort((a,b)=>a-b);return `<div class="river-controls">${vals.map(v=>btn(String(v),'answer',v,'number')).join('')}</div>`;};
 let body='',prompt='';
 if(c.kind==='concert'){body+=`<p class="river-progress">Голос ${s.round+1} из ${c.rounds.length}: ${esc(p.t)}</p><p class="river-instruction">${esc(p.q)}</p>`;}
 if(c.kind!=='compose'||s.tokens.length===5)body+=eq(c.kind==='compose'?s.tokens:p.equation);
 if(c.kind==='build'){
  body+=`<div class="river-instrument chimes"><p class="river-given">Нужно всего: ${c.total}</p>${group(c.known,`Уже было: ${c.known}`,'',type)}${group(s.delta,'Добавленная часть x','river-added',type)}</div>`;
  if(s.stage==='act'){prompt=c.unknown===0?'Проверь, нужно ли добавлять звонки. Если всё уже на месте, нажми «Подвеска готова».':'Добавляй по одному. Когда подвеска готова, проверь количество.';body+=`<div class="river-controls">${btn('Повесить один звонок','move',1,'primary',s.delta>=12-c.known)}${btn('Снять последний','move',-1,'feather',s.delta===0)}${btn('Подвеска готова','count')}</div>`;}
 }else if(c.kind==='remove'){
  body+=`<div class="river-instrument raft"><p class="river-given">Было всего: ${c.total}. Должно остаться: ${c.known}.</p>${group(c.total-s.delta,'На причале','',type)}${group(s.delta,'Перенесённая часть x','river-boat',type)}</div>`;
  if(s.stage==='act'){prompt=`Переноси по одному. Оставь на причале ${c.known}.`;body+=`<div class="river-controls">${btn('Перенести на плот','move',1,'primary',s.delta>=c.total)}${btn('Вернуть с плота','move',-1,'feather',s.delta===0)}${btn('Груз готов','count')}</div>`;}
 }else if(c.kind==='reunite'){
  body+=`<div class="river-instrument merge">${group(c.unknown-s.delta,'Унесённые пластинки','river-boat',type)}${group(c.known+s.delta,s.delta===c.unknown?'Восстановили всё, что было: x':'Собираем первоначальное количество','river-whole',type)}</div>`;
  if(s.stage==='act'){prompt=`Верни ${c.unknown} унесённые пластинки к ${c.known} оставшимся.`;body+=`<div class="river-controls">${btn('Вернуть одну пластинку','move',1,'primary',s.delta>=c.unknown)}${btn('Отменить перенос','move',-1,'feather',s.delta===0)}${btn('Все части вместе','count')}</div>`;}
 }else if(c.kind==='hidden'||c.kind==='compose'){
  body+=`<div class="river-instrument chimes"><p class="river-given">Всего: ${c.total}</p>${group(c.known,`Видно: ${c.known}`,'',type)}${s.ok?group(c.unknown,`За шторкой было: ${c.unknown}`,'river-added',type):'<div class="river-curtain"><span>x</span><p>За камышовой шторкой</p></div>'}</div>`;
 }else if(['role','method'].includes(c.kind))body+=roleDiagram(c,s);
 else if(c.kind==='repair'){
  body+=`<div class="river-score"><p class="river-label">Идея Флика: x = ${c.mistake}</p>${s.tested?eq([c.mistake,'+',c.known,'=',c.mistake+c.known])+`<p class="river-label">Получилось ${c.mistake+c.known}, а нужно ${c.total}. Это неравные числа.</p>`:''}</div>`;
  if(s.stage==='probe'){prompt='Сначала проверим идею, даже если она кажется неверной.';body+=btn('Проверить идею Флика','probe');}
 }
 if(s.stage==='role'){prompt='Что обозначает x в этой истории?';body+=`<div class="river-controls">${btn('Одну часть','role','part')}${btn('Всё, что было — целое','role','whole')}</div>`;}
 if(s.stage==='method'){prompt=c.mode==='whole'?'Как восстановить целое из двух частей?':'Как найти неизвестную часть?';body+=`<div class="river-controls">${btn(c.mode==='whole'?`${c.known} + ${c.unknown}`:`${c.total} + ${c.known}`,'method','+','number')}${btn(c.mode==='whole'?`${c.known} − ${c.unknown}`:`${c.total} − ${c.known}`,'method','−','number')}</div>`;}
 if(s.stage==='compose'){
  prompt='Собери запись слева направо. Можно начать с любой части.';
  body+=`<div class="river-slots">${Array.from({length:5},(_,i)=>`<span class="river-slot">${esc(s.tokens[i]??'…')}</span>`).join('')}</div><div class="river-controls">${['x','+',String(c.known),'=',String(c.total),'−'].map(v=>btn(v,'token',v,'number')).join('')}</div>${btn('Убрать последний знак','undo',null,'feather',s.tokens.length===0)}`;
 }
 if(s.stage==='answer'){
  prompt=c.mode==='whole'?'Сколько было сначала? Выбери число для x.':moving(c)?`Сколько ${c.kind==='remove'?'перенесли':c.kind==='build'?'добавили':'было сначала'}? Выбери число для x.`:'Какое число подходит вместо x?';
  body+=options();if(c.kind==='compose')body+=btn('Изменить запись','undo',null,'feather');
 }
 if(s.candidate!==null&&['check','answer','done','next'].includes(s.stage)){
  const r=equationValue(p,s.candidate);
  body+=`<div class="river-score"><p class="river-given">Подставляем x = ${s.candidate}</p>${eq([r.parts[0],r.parts[1],r.parts[2],'=',s.stage==='check'?'?':r.left])}<p class="river-label">Справа в условии: ${r.right}</p>${s.stage==='check'?btn(c.kind==='hidden'?'Открыть и проверить':'Проверить равенство','verify'):''}</div>`;
  if(s.stage==='check')prompt='Посчитай слева и сравни с числом справа.';
 }
 if(s.stage==='next')body+=btn('Проверить следующий голос','next');
 if(c.kind==='concert'&&s.ok)body+=`<div class="river-final-instrument"><p>Нажимай клавиши и сочини песенку. Играть можно без спешки.</p><div class="river-controls">${['До','Ре','Ми','Соль','Ля'].map((v,i)=>btn(v,'note',i,'river-key'+(s.notes.at(-1)===i?' chosen':''))).join('')}</div></div>`;
 const showArt=scope==='story'||s.ok||['hidden','repair','reunite'].includes(c.kind);
 return `<div class="river-game ${s.ok?'is-success':''}" data-kind="${c.kind}" data-stage="${s.stage}">${showArt?art(c,s):''}${prompt?`<p class="river-instruction">${esc(prompt)}</p>`:''}${body}${s.fb?`<p class="river-feedback is-${s.tone}" role="status">${esc(s.fb)}</p>`:''}${!s.ok?`<div class="river-help">${btn('Лада, помоги разобраться','hint',null,'feather')}</div>`:''}</div>`;
}
function record(){const r=lrec();if(!r.river303||r.river303.version!==1)r.river303={version:1,frames:{},practice:{}};r.river303.frames||={};r.river303.practice||={};return r.river303;}
function practiceState(i){const p=record().practice;p[i]=validState(tasks[i],p[i]);return p[i];}
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="river303"><p class="river-chapter">${i+1} / ${scenes.length}</p><h3 class="river-heading">${esc(c.t)}</h3>${renderGame(c,s,'story',i)}</div>`,делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function act(scope,i,a,v,rev){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i)||!['story','practice'].includes(scope))return false;
 if(scope==='story'&&(LV.phase!=='explain'||LV.step!==i||!scenes[i]))return false;
 if(scope==='practice'&&(LV.phase!=='tasks'||LV.task!==i||!tasks[i]))return false;
 const c=scope==='story'?scenes[i]:tasks[i],s=scope==='story'?CHS[lidKey(ID)]?.п?.[i]:practiceState(i);
 if(!s||rev!==s.rev||scope==='practice'&&lrec().tasks.includes(i))return false;
 if(!apply(c,s,a,v))return false;
 window.RIVER303_AUDIO?.stop();
 if(a==='note')playNote(v);
 if(scope==='story'){sync();if(typeof chRender==='function')chRender(0);}else{save();if(s.ok&&!lrec().tasks.includes(i))lvPick(nativeAnswer(c));else if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();}
 if(a==='hint')window.RIVER303_AUDIO?.playKey((scope==='story'?'frame-':'task-')+i+'-hint');
 return true;
}
function nativeAnswer(c){return c.nativeKind==='choice'?c.ans:c.nativeKind==='unit'?c.ans:solution(c);}
function practice(c,i){const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(c,s);return `<div class="river303 river-practice"><h3 class="river-heading">${esc(c.t)}</h3>${renderGame(c,s,'practice',i)}</div>`;}
let context;
function playNote(i){
 if(!Number.isInteger(i)||i<0||i>4)return;
 try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;context||=new AC();context.resume();const now=context.currentTime,f=[261.63,293.66,329.63,392,440][i];
 for(const [ratio,amp,decay]of [[1,.12,1.1],[2,.035,.5],[3.01,.012,.25]]){const o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.value=f*ratio;g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(amp,now+.008);g.gain.exponentialRampToValueAtTime(.0001,now+decay);o.connect(g);g.connect(context.destination);o.start(now);o.stop(now+decay+.05);}}
 catch(_){/* The visual keyboard remains usable when audio is unavailable. */}
}
window.RIVER303={scenes,tasks,frames,initial,apply,restoreSolved,validState,renderGame,act,solution,equationValue,note(i){if(typeof LV==='undefined'||LV.id!==ID||LV.phase!=='done')return;window.RIVER303_AUDIO?.stop();playNote(i);}};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:{lada:{имя:'Лада',ф:'lada'},flik:{имя:'Флик',ф:'flik'}},фоны:['workshop'],кадры:frames,
 запись:{title:C.title,ico:'🎐',src:'Начальная школа · 1 класс · Уравнения: неизвестная часть и целое',subj:'jun',check:C.check,tasks:tasks.map(t=>({q:t.q,kind:t.nativeKind||'unit',choices:t.choices,ans:nativeAnswer(t),tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
 тренажёр:{герой:'lada',проверка:{разборы:{'4':'Поставь четыре вместо икса: четыре плюс четыре. Совпало с девятью? Попробуй другое число.','13':'Ты сложил девять и четыре. Но девять — целое, а ищем только одну его часть. Как убрать известную часть?','9':'Девять — это все звонки вместе. Четыре из них уже есть. Найди недостающую часть.'},картинка:()=>`<div class="river303">${art(scenes[8],initial(scenes[8]))}${eq(['x','+',4,'=',9])}</div>`,итог:C.check.exp},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),итог:t.sol})),финал:()=>`<div class="river303 river-finale">${art(scenes[11],{ok:true})}<h3 class="river-heading">Ручей снова поёт!</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button>${C.finale.map(t=>`<p>${esc(t)}</p>`).join('')}<div class="river-controls">${['До','Ре','Ми','Соль','Ля'].map((n,i)=>`<button class="river-button river-key" onclick="RIVER303.note(${i})">${n}</button>`).join('')}</div></div>`}
});
let restored=false;const originalRenderer=WAVE_B[ID];
WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const data=record();CHS[k].п={};for(const[i,raw]of Object.entries(data.frames))if(scenes[i])CHS[k].п[i]=validState(scenes[i],raw);for(const[i,raw]of Object.entries(data.practice))if(tasks[i])data.practice[i]=validState(tasks[i],raw);restored=true;}originalRenderer(el);sync();};
function sync(){if(typeof LV==='undefined'||LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{},can=LV.phase!=='explain'||p[LV.step]?.ok===true;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});record().frames=clone(p);save();}
window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];if(typeof old!=='function')continue;window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
})();
