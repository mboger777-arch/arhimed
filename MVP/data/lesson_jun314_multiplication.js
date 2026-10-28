/* The Atlas of Stone Giants: a objects in EACH group, b equal groups.
   Grouping, regrouping and a child's multiplication ledger use reversible taps.
   Shared app navigation, rewards and game progress remain native. */
(function(){
'use strict';
const ID=314,A='img/l314-paleo/',C=window.PALEO314_CONTENT;if(!C||!window.ДК)return;
const scenes=C.scenes,tasks=C.tasks,keys=['rum','taya'],clone=x=>JSON.parse(JSON.stringify(x));
const current=(c,s)=>c.kind==='table'&&c.rounds?.length?{...c,...c.rounds[s.round]}:c;
const solution=c=>c.a*c.b;
const plural=(n,one,few,many)=>n%100>=11&&n%100<=14?many:n%10===1?one:n%10>=2&&n%10<=4?few:many;
const rounds=c=>c.kind==='table'&&c.rounds?.length?c.rounds:[c];
const starts={tutorial:'tutorial',groups:'inspect',repeated:'sum',factors:'each',unequal:'judge',array:'inspect',swap:'inspect',extend:'extend',table:'answer',identity:'inspect',zero:'inspect',repair:'inspect',build:'build'};
function initial(c){return {ok:false,fb:'',tone:'',stage:c.kind==='table'&&c.fromB!==undefined?'extend':c.kind==='zero'&&c.b===0?'empty':c.kind==='table'&&c.lookup?'lookup':starts[c.kind],tutorialProgress:0,marked:[],groups:(c.kind==='tutorial'&&c.tutorialType==='place'?Array(c.b).fill(0):(c.groups||Array(c.b).fill(c.a))).slice(),terms:[],tokens:[],each:null,times:null,builtEach:c.kind==='build'?0:c.a,builtGroups:c.kind==='build'?1:(c.kind==='extend'||c.kind==='table'&&c.fromB!==undefined)?(c.fromB??Math.max(0,c.b-1)):c.b,swapped:false,judged:false,probed:false,candidate:null,row:null,round:0,completed:[],rev:0};}
function finish(c,s){s.ok=true;s.stage='done';s.candidate=solution(current(c,s));s.fb=c.sol;s.tone='success';}
function apply(c,s,action,value){
 if(!c||!s||s.ok||!Number.isInteger(s.rev))return false;
 const p=current(c,s),accept=()=>{s.rev++;return true;},clear=()=>{s.fb='';s.tone='';},error=t=>{s.fb=t;s.tone='error';return accept();},none=value===null||value===undefined;
 if(action==='hint'&&none){s.fb=p.hint||c.hint;s.tone='hint';return accept();}
 if(c.kind==='tutorial'&&s.stage==='tutorial'){
  if(action==='countTile'&&c.tutorialType==='count'&&Number.isInteger(value)&&value===s.tutorialProgress&&value<solution(c)){s.tutorialProgress++;clear();if(s.tutorialProgress===solution(c))s.stage='answer';return accept();}
  if(action==='place'&&c.tutorialType==='place'&&Number.isInteger(value)&&value>=0&&value<c.b){if(s.groups[value]>=c.a)return error('На этом коврике уже две плитки. Положи следующую на другой коврик.');s.groups[value]++;clear();if(s.groups.every(n=>n===c.a))s.stage='answer';return accept();}
  if(action==='mark'&&c.tutorialType==='groups'&&Number.isInteger(value)&&value>=0&&value<c.b){s.marked=s.marked.includes(value)?s.marked.filter(n=>n!==value):[...s.marked,value];clear();return accept();}
  if(action==='describe'&&c.tutorialType==='groups'&&none){if(s.marked.length!==c.b)return error('Коснись всех трёх ковриков. Каждый коврик считаем один раз.');s.stage='each';clear();return accept();}
  if(action==='readGroup'&&c.tutorialType==='sum'&&Number.isInteger(value)&&value===s.tutorialProgress&&value<c.b){s.marked.push(value);s.terms.push(c.a);s.tutorialProgress++;clear();if(s.tutorialProgress===c.b)s.stage='answer';return accept();}
  if(action==='showNotation'&&c.tutorialType==='notation'&&none){s.tutorialProgress=1;s.stage='each';clear();return accept();}
 }
 if(action==='mark'&&s.stage==='inspect'&&Number.isInteger(value)&&value>=0&&value<c.b){s.marked=s.marked.includes(value)?s.marked.filter(x=>x!==value):[...s.marked,value];clear();return accept();}
 if(action==='inspect'&&s.stage==='inspect'&&none){if(s.marked.length!==c.b)return error('Обведи каждый набор: так ни один не потеряется и ни один не посчитается дважды.');s.stage=c.kind==='swap'?'flip':c.kind==='repair'?'probe':'answer';clear();return accept();}
 if(action==='term'&&s.stage==='sum'&&Number.isInteger(value)&&value>=0&&value<=9){if(value!==c.a)return error(`В каждом наборе по ${c.a}. Поэтому каждое слагаемое должно быть ${c.a}.`);if(s.terms.length>=c.b)return false;s.terms.push(value);if(s.terms.length===c.b)s.stage='compact';clear();return accept();}
 if(action==='token'&&s.stage==='compact'&&typeof value==='string'){const paths=[[String(c.a),'·',String(c.b)],[String(c.b),'·',String(c.a)]],next=[...s.tokens,value];if(![String(c.a),'·',String(c.b),'+'].includes(value))return false;if(!paths.some(p=>next.every((v,i)=>p[i]===v)))return error(s.tokens.length===1?'Одинаковые слагаемые коротко записывают умножением. Выбери точку.':'Используй числа, которые рассказывают об одинаковых группах.');s.tokens=next;if(next.length===3)s.stage='answer';clear();if(next.length===3&&c.a!==c.b&&next[0]===String(c.b)){s.fb=`Это тоже верное произведение: перестановка чисел не меняет ответ. Наша сумма из ${c.b} одинаковых слагаемых ${c.a} записывается ${c.a} · ${c.b}.`;s.tone='hint';}return accept();}
 if(action==='undoToken'&&s.stage==='compact'&&none&&s.tokens.length){s.tokens.pop();clear();return accept();}
 if(action==='undoTerm'&&s.stage==='sum'&&none&&s.terms.length){s.terms.pop();clear();return accept();}
 if(action==='each'&&s.stage==='each'&&Number.isInteger(value)&&value>=0&&value<=9){if(value!==c.a)return error(`Посмотри на один набор. В нём ${c.a} ${plural(c.a,'предмет','предмета','предметов')}. Мы пока не считаем число наборов.`);s.each=value;s.stage='times';clear();return accept();}
 if(action==='times'&&s.stage==='times'&&Number.isInteger(value)&&value>=0&&value<=9){if(value!==c.b)return error(`Теперь считаем сами наборы. Их ${c.b}. Посчитай рамки, а не плитки внутри них.`);s.times=value;s.stage='answer';clear();return accept();}
 if(action==='judge'&&s.stage==='judge'&&['yes','no'].includes(value)){if(value!=='no')return error('Присмотрись: в наборах разное количество. Запись «одно число взять несколько раз» пока не подходит. Сначала сделаем наборы одинаковыми.');s.judged=true;s.stage='fix';clear();return accept();}
 if(action==='adjust'&&s.stage==='fix'&&Array.isArray(value)&&value.length===2&&Number.isInteger(value[0])&&value[0]>=0&&value[0]<s.groups.length&&[1,-1].includes(value[1])){const n=s.groups[value[0]]+value[1];const reserve=Math.max(c.groups.reduce((a,b)=>a+b,0),solution(c))-s.groups.reduce((a,b)=>a+b,0);if(n<0||n>9||value[1]>0&&reserve===0)return false;s.groups[value[0]]=n;clear();return accept();}
 if(action==='fixed'&&s.stage==='fix'&&none){if(!s.groups.every(n=>n===c.a))return error(`Сделай в каждом наборе ровно ${c.a}. Лишнее можно убрать, недостающее — добавить.`);s.stage='answer';clear();return accept();}
 if(action==='rotate'&&s.stage==='flip'&&none){s.swapped=true;s.stage='answer';clear();return accept();}
 if(action==='moreGroups'&&s.stage==='extend'&&[1,-1].includes(value)){const n=s.builtGroups+value;if(n<0||n>9)return false;s.builtGroups=n;clear();return accept();}
 if(action==='extended'&&s.stage==='extend'&&none){if(s.builtGroups!==c.b)return error(`Нужно ${c.b} одинаковых наборов, а сейчас ${s.builtGroups}. Каждый новый набор добавляет ${c.a} предметов.`);s.stage='answer';clear();return accept();}
 if(action==='empty'&&s.stage==='empty'&&none){s.stage='answer';clear();return accept();}
 if(action==='probe'&&s.stage==='probe'&&none){s.probed=true;s.stage='answer';s.fb=`Считаем все наборы: ${Array(c.b).fill(c.a).join(' + ')} = ${solution(c)}. ${c.mistake} получилось бы при сложении ${c.a} и ${c.b}, но здесь ${c.a} повторяется ${c.b} ${plural(c.b,'раз','раза','раз')}.`;s.tone='error';return accept();}
 if(['buildEach','buildGroups'].includes(action)&&s.stage==='build'&&[1,-1].includes(value)){const key=action==='buildEach'?'builtEach':'builtGroups',n=s[key]+value;if(n<0||n>9)return false;s[key]=n;clear();return accept();}
 if(action==='built'&&s.stage==='build'&&none){if(s.builtEach!==c.a||s.builtGroups!==c.b)return error(`В задании по ${c.a} в каждом наборе и ${c.b} ${plural(c.b,'набор','набора','наборов')}. Сравни оба числа со своей раскладкой.`);s.stage='answer';clear();return accept();}
 if(action==='lookup'&&s.stage==='lookup'&&Number.isInteger(value)&&value>=1&&value<=9){if(value!==c.b)return error(`В этой строке ${value} ${plural(value,'набор','набора','наборов')}. По условию нужны ${c.b}. Найди это число в столбце «Наборов».`);s.row=value;s.stage='answer';clear();return accept();}
 if(action==='answer'&&s.stage==='answer'&&Number.isInteger(value)&&value>=0&&value<=81){s.candidate=value;if(value!==solution(p))return error(value===p.a+p.b&&p.a+p.b!==solution(p)?`Ты сложил ${p.a} и ${p.b}. Но нужно взять по ${p.a} ${p.b} ${plural(p.b,'раз','раза','раз')}. Посчитай предметы во всех равных группах.`:`Считай по ${p.a}, переходя от одного набора к следующему. Всего таких наборов ${p.b}.`);if(c.kind==='table'){s.completed.push(value);if(s.round<rounds(c).length-1){s.stage='next';s.fb=p.sol||`${p.a} · ${p.b} = ${value}.`;s.tone='success';}else finish(c,s);}else finish(c,s);return accept();}
 if(action==='next'&&c.kind==='table'&&s.stage==='next'&&none){s.round++;s.stage='answer';s.candidate=null;clear();return accept();}
 return false;
}
function restoreSolved(c,s){Object.assign(s,initial(c));s.marked=Array.from({length:c.b},(_,i)=>i);s.groups=Array(c.b).fill(c.a);s.terms=Array(c.b).fill(c.a);s.tokens=[String(c.a),'·',String(c.b)];s.each=c.a;s.times=c.b;s.builtEach=c.a;s.builtGroups=c.b;s.swapped=c.kind==='swap';s.judged=c.kind==='unequal';s.probed=c.kind==='repair';s.row=c.lookup?c.b:null;s.tutorialProgress=c.kind==='tutorial'?(c.tutorialType==='count'?solution(c):c.tutorialType==='sum'?c.b:c.tutorialType==='notation'?1:0):0;if(c.kind==='table'){s.round=rounds(c).length-1;s.completed=rounds(c).map(solution);}finish(c,s);return s;}
function validState(c,raw){
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return initial(c);const init=initial(c),s=Object.fromEntries(Object.keys(init).map(k=>[k,raw[k]])),int=(v,a,b)=>Number.isInteger(v)&&v>=a&&v<=b;
 if(!int(s.tutorialProgress,0,solution(c))||typeof s.ok!=='boolean'||!int(s.rev,0,1000000)||typeof s.fb!=='string'||s.fb.length>2000||!['','hint','error','success'].includes(s.tone)||!int(s.round,0,rounds(c).length-1)||!int(s.builtEach,0,9)||!int(s.builtGroups,0,9)||!['swapped','judged','probed'].every(k=>typeof s[k]==='boolean'))return initial(c);
 if(s.row!==null&&!int(s.row,1,9))return initial(c);
 if(s.each!==null&&s.each!==c.a||s.times!==null&&s.times!==c.b||s.candidate!==null&&!int(s.candidate,0,81))return initial(c);
 if(!Array.isArray(s.marked)||new Set(s.marked).size!==s.marked.length||s.marked.some(n=>!int(n,0,c.b-1))||!Array.isArray(s.groups)||s.groups.length!==c.b||s.groups.some(n=>!int(n,0,9))||!Array.isArray(s.terms)||s.terms.length>c.b||s.terms.some(n=>n!==c.a)||!Array.isArray(s.tokens)||s.tokens.length>3||s.tokens.some(t=>typeof t!=='string')||!Array.isArray(s.completed)||s.completed.length>(c.kind==='table'?rounds(c).length:0)||s.completed.some((v,i)=>v!==solution(rounds(c)[i])))return initial(c);
 const allowed={tutorial:['tutorial','each','times','answer','done'],inspect:['inspect','answer','done',...(c.kind==='swap'?['flip']:[]),...(c.kind==='repair'?['probe']:[])],sum:['sum','compact','answer','done'],each:['each','times','answer','done'],judge:['judge','fix','answer','done'],extend:['extend','answer','done'],answer:['answer','next','done'],lookup:['lookup','answer','done'],empty:['empty','answer','done'],build:['build','answer','done']}[init.stage];
 if(!allowed?.includes(s.stage)||s.ok!==(s.stage==='done'))return initial(c);
 if(init.stage==='inspect'&&s.stage!=='inspect'&&s.marked.length!==c.b)return initial(c);
 if(c.kind==='tutorial'){
  const type=c.tutorialType,late=['answer','done'].includes(s.stage);
  if(type==='count'&&(!['tutorial','answer','done'].includes(s.stage)||late&&s.tutorialProgress!==solution(c)||s.stage==='tutorial'&&s.tutorialProgress>=solution(c)))return initial(c);
  if(type==='place'&&(s.groups.some(n=>n>c.a)||s.stage==='tutorial'&&s.groups.every(n=>n===c.a)||!['tutorial','answer','done'].includes(s.stage)||late&&!s.groups.every(n=>n===c.a)))return initial(c);
  if(type==='groups'&&s.stage!=='tutorial'&&s.marked.length!==c.b)return initial(c);
  if(type==='sum'&&(!['tutorial','answer','done'].includes(s.stage)||s.terms.length!==s.tutorialProgress||s.marked.length!==s.tutorialProgress||s.marked.some((n,i)=>n!==i)||s.stage==='tutorial'&&s.tutorialProgress===c.b||late&&s.tutorialProgress!==c.b))return initial(c);
  if(type==='notation'&&(s.tutorialProgress!==(s.stage==='tutorial'?0:1)))return initial(c);
  if(['groups','notation'].includes(type)&&(['times','answer','done'].includes(s.stage)&&s.each!==c.a||late&&s.times!==c.b))return initial(c);
 }
 if(c.kind==='repeated'){if(s.stage!=='sum'&&s.terms.length!==c.b)return initial(c);const paths=[[String(c.a),'·',String(c.b)],[String(c.b),'·',String(c.a)]];if(!paths.some(p=>s.tokens.every((t,i)=>p[i]===t))||['answer','done'].includes(s.stage)&&s.tokens.length!==3)return initial(c);}
 if(c.kind==='factors'&&(s.stage!=='each'&&s.each!==c.a||['answer','done'].includes(s.stage)&&s.times!==c.b))return initial(c);
 if(c.kind==='unequal'&&(s.stage!=='judge'&&!s.judged||['answer','done'].includes(s.stage)&&!s.groups.every(n=>n===c.a)))return initial(c);
 if(c.kind==='unequal'&&s.groups.reduce((a,b)=>a+b,0)>Math.max(c.groups.reduce((a,b)=>a+b,0),solution(c)))return initial(c);
 if(c.kind!=='unequal'&&!(c.kind==='tutorial'&&c.tutorialType==='place')&&s.groups.some((n,i)=>n!==(c.groups||Array(c.b).fill(c.a))[i]))return initial(c);
 if(c.kind==='swap'&&['answer','done'].includes(s.stage)&&!s.swapped||c.kind==='repair'&&['answer','done'].includes(s.stage)&&!s.probed)return initial(c);
 if((['extend','build'].includes(c.kind)||c.kind==='table'&&c.fromB!==undefined)&&['answer','done'].includes(s.stage)&&(s.builtGroups!==c.b||s.builtEach!==c.a))return initial(c);
 if(c.lookup&&s.stage!=='lookup'&&s.row!==c.b)return initial(c);
 if(c.kind==='table'&&(s.completed.length!==s.round+(s.stage==='next'||s.ok?1:0)||s.stage==='next'&&s.round>=rounds(c).length-1))return initial(c);
 if(c.kind!=='table'&&s.stage==='next'||s.ok&&s.candidate!==solution(current(c,s)))return initial(c);
 return clone(s);
}
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const equation=values=>`<div class="paleo-equation">${values.map(v=>`<span>${esc(v)}</span>`).join('')}</div>`;
function fossil(i,type='tile'){
 if(type==='stamp')return `<svg viewBox="0 0 52 58" aria-hidden="true"><path d="M17 26Q8 21 9 14Q11 8 17 15L21 22Q17 10 22 8Q28 7 28 21Q33 9 38 12Q43 15 35 26Q45 23 46 30Q44 36 36 38Q38 49 27 52Q14 52 14 42Q12 33 17 26Z" fill="${i%2?'#b87551':'#c98e63'}" stroke="#754d3e" stroke-width="2"/><path d="M21 32Q28 29 32 35L30 44Q21 45 21 36" fill="#e8b880"/></svg>`;
 return `<svg viewBox="0 0 60 54" aria-hidden="true"><path d="M7 9L39 3L54 12L56 42L39 51L8 45L3 26Z" fill="${i%2?'#d1bb92':'#c2ab86'}" stroke="#80765f" stroke-width="2"/><path d="M25 13Q42 9 45 24Q45 39 31 41Q17 42 16 30Q16 19 28 18Q37 17 38 26Q38 34 29 34Q23 34 24 27Q25 23 30 26" stroke="#776c54" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M9 34L14 40M43 7L48 12" stroke="#edddba" stroke-width="2"/></svg>`;
}
function dinosaur(){return `<svg class="paleo-dinosaur" viewBox="0 0 180 150" role="img" aria-label="Одна игрушечная фигурка динозавра, вид сверху: видны все четыре лапы"><path d="M90 114Q80 138 60 142Q78 130 78 105" fill="#659a83" stroke="#315e53" stroke-width="3"/><g data-unit="0"><path d="M62 45Q25 29 20 49Q21 63 58 63" fill="#73ab91" stroke="#315e53" stroke-width="3"/><path d="M24 44L30 49M22 51L29 55M25 59L32 60" stroke="#e5d7ae" stroke-width="3"/></g><g data-unit="1"><path d="M118 45Q155 29 160 49Q159 63 122 63" fill="#73ab91" stroke="#315e53" stroke-width="3"/><path d="M156 44L150 49M158 51L151 55M155 59L148 60" stroke="#e5d7ae" stroke-width="3"/></g><g data-unit="2"><path d="M62 89Q24 88 22 109Q25 123 65 109" fill="#73ab91" stroke="#315e53" stroke-width="3"/><path d="M27 103L33 106M25 110L33 112M29 117L35 116" stroke="#e5d7ae" stroke-width="3"/></g><g data-unit="3"><path d="M118 89Q156 88 158 109Q155 123 115 109" fill="#73ab91" stroke="#315e53" stroke-width="3"/><path d="M153 103L147 106M155 110L147 112M151 117L145 116" stroke="#e5d7ae" stroke-width="3"/></g><ellipse cx="90" cy="79" rx="36" ry="46" fill="#8cbaa0" stroke="#315e53" stroke-width="3"/><path d="M76 44L77 22Q91 4 105 22L104 44" fill="#8cbaa0" stroke="#315e53" stroke-width="3"/><circle cx="80" cy="24" r="3" fill="#263f39"/><circle cx="100" cy="24" r="3" fill="#263f39"/><path d="M80 61Q90 53 100 61M79 80Q90 72 101 80M80 99Q90 91 100 99" fill="none" stroke="#4f8c75" stroke-width="4"/></svg>`;}
function items(n,type,ids){return type==='dino-foot'&&n===4?dinosaur():`<span class="paleo-fossils">${Array.from({length:n},(_,i)=>`<span class="paleo-fossil" data-unit="${i}" data-find="${ids?.[i]??i}">${fossil(ids?.[i]??i,type)}</span>`).join('')||'<span class="paleo-empty">Пока пусто</span>'}</span>`;}
function picture(c,s){const bg=s.ok&&c.finalBg?c.finalBg:c.bg;return `<figure class="paleo-art"><img src="${A}${esc(bg)}.webp" alt="${esc(c.alt||'Рум и Тая исследуют следы древних животных в каменной долине')}" loading="eager"></figure>`;}
function renderGame(c,s,scope,index){
 const p=current(c,s),type=p.object||'tile',click=(a,v)=>`PALEO314.act('${scope}',${index},'${a}',${esc(JSON.stringify(v===undefined?null:v))},${s.rev})`,button=(text,a,v,kind='primary',disabled=false,label='')=>`<button type="button" class="paleo-button ${kind}" onclick="${click(a,v)}" ${label?`aria-label="${esc(label)}"`:''} ${disabled?'disabled':''}>${esc(text)}</button>`;
 const numberChoices=(action,target,max=81)=>{const numbers=[...new Set([target,Math.max(0,target-1),Math.min(max,target+1),Math.min(max,p.a+p.b),...(['each','times'].includes(action)?[p.a,p.b]:[])])];const shift=(index+p.a+p.b)%numbers.length;numbers.push(...numbers.splice(0,shift));return `<div class="paleo-controls">${numbers.map(n=>button(n,action,n,'number')).join('')}</div>`;};
 const group=(n,i,interactive=false)=>{const tag=interactive?'button':'section',selected=s.marked.includes(i);return `<${tag} ${interactive?`type="button" onclick="${click('mark',i)}" aria-pressed="${selected}" aria-label="${selected?'Снять обводку с набора':'Обвести набор'} ${i+1}"`:''} class="paleo-group ${selected?'is-marked':''}" data-group="${i}" data-count="${n}"><span class="paleo-group-label">${type==='dino-foot'?'Фигурка':'Набор'} ${i+1}${selected?' · обведён':''}</span>${items(n,type)}${selected?`<span class="paleo-group-count">${n} ${type==='dino-foot'?'лапы':'в наборе'}</span>`:''}</${tag}>`;};
 let body='',prompt='';const activeInspect=s.stage==='inspect';
 if(c.kind==='tutorial'){
  const t=c.tutorialType,placed=s.groups.reduce((a,b)=>a+b,0),all=solution(c);
  if(t==='count'){
   prompt=s.stage==='tutorial'?s.tutorialProgress===0?'Коснись первой плитки.':'Одна уже посчитана. Коснись второй.':'Одна и ещё одна — две плитки. Выбери число 2.';
   body+=`<div class="paleo-count-tiles">${Array.from({length:all},(_,i)=>`<button type="button" class="paleo-count-tile ${i<s.tutorialProgress?'is-counted':''}" onclick="${click('countTile',i)}" ${i!==s.tutorialProgress||s.stage!=='tutorial'?'disabled':''} aria-label="Посчитать плитку ${i+1}">${fossil(i)}<span>${i<s.tutorialProgress?i+1:'Коснись'}</span></button>`).join('')}</div><p class="paleo-teaching-line">${s.tutorialProgress?'Посчитали: '+s.tutorialProgress:''}</p>`;
  }else if(t==='place'){
   prompt=s.stage==='tutorial'?'Коснись коврика: на него переедет одна плитка. На каждый положи по две.':'Теперь на каждом коврике по две. Сколько плиток на трёх ковриках вместе?';
   body+=`<div class="paleo-loose"><p>На столе осталось ${all-placed}</p>${items(all-placed,'tile')}</div><div class="paleo-teaching-mats">${s.groups.map((n,i)=>`<button class="paleo-group paleo-place-mat ${n===c.a?'is-marked':''}" type="button" onclick="${click('place',i)}" ${s.stage!=='tutorial'?'disabled':''} aria-label="Положить плитку на коврик ${i+1}"><span class="paleo-group-label">Коврик ${i+1}</span>${items(n,'tile')}<span class="paleo-group-count">${n} из ${c.a}</span></button>`).join('')}</div>`;
  }else{
   const isGroups=t==='groups'&&s.stage==='tutorial',isSum=t==='sum'&&s.stage==='tutorial';
   body+=`<div class="paleo-teaching-mats">${Array.from({length:c.b},(_,i)=>`<${isGroups||isSum?'button':'section'} class="paleo-group ${s.marked.includes(i)?'is-marked':''} ${s.stage==='each'&&i===0?'paleo-focus-group':''}" ${isGroups||isSum?`type="button" onclick="${click(isGroups?'mark':'readGroup',i)}" aria-label="${isGroups?'Обвести':'Прибавить плитки с коврика'} ${i+1}" ${isSum&&i!==s.tutorialProgress?'disabled':''}`:''}><span class="paleo-group-label">Коврик ${i+1}</span>${items(c.a,'tile')}<span class="paleo-group-count">${s.marked.includes(i)||s.stage!=='tutorial'?c.a+' плитки':''}</span></${isGroups||isSum?'button':'section'}>`).join('')}</div>`;
   if(t==='groups'){
    prompt=s.stage==='tutorial'?'Обведём сами коврики. Коснись каждого один раз.':'';
    if(s.stage==='tutorial')body+=`<p class="paleo-teaching-line">Ковриков обведено: ${s.marked.length}</p>${button('Сколько на одном коврике?','describe',null,'primary',s.marked.length!==c.b)}`;
   }
   if(t==='sum'){
    const total=s.terms.reduce((a,b)=>a+b,0);prompt=s.stage==='tutorial'?s.tutorialProgress===0?'На первом коврике две плитки. Коснись его.':`Сейчас посчитали ${total}. На следующем коврике ещё две. Коснись его.`:'Мы прибавили по две три раза. Сколько получилось?';
    body+=`<div class="paleo-counting-trail">${s.terms.length?equation([...s.terms.flatMap((n,i)=>i?['+',n]:[n]),'=',total]):'<p>Начинаем с первого коврика</p>'}<p>${s.tutorialProgress===1?'Первый коврик: 2 плитки.':s.tutorialProgress===2?'Два коврика: 2 + 2 = 4 плитки.':s.tutorialProgress===3?'Три коврика: 2 + 2 + 2 = 6 плиток.':''}</p></div>`;
   }
   if(t==='notation'){
    body+=`<div class="paleo-counting-trail">${equation([2,'+',2,'+',2,'=',6])}<p>Число 2 повторяется три раза. Такой счёт называется <strong>умножением</strong>.</p>${s.tutorialProgress?`<div class="paleo-meaning"><div><b>2</b><span>плитки на каждом коврике</span></div><div><b>·</b><span>знак умножения</span></div><div><b>3</b><span>столько ковриков</span></div></div><p>Читаем: «по две взять три раза».</p><p>Всего плиток 6. Поэтому 2 · 3 = 6, как и 2 + 2 + 2 = 6.</p>`:button('Записать короче: 2 · 3','showNotation')}</div>`;
   }
  }
  if(t==='place'&&s.stage!=='tutorial')body+=`<p class="paleo-teaching-line">На каждом коврике две плитки. Во всех группах поровну.</p>`;
  if(s.ok)body+=`<p class="paleo-teaching-result">${esc(c.sol)}</p>`;
 }

 if(c.kind==='zero'&&c.b===0)body+=`<aside class="paleo-example"><p>Образец: по ${c.a} в одном наборе. Этот набор пока не взяли.</p>${items(c.a,type)}</aside><p class="paleo-taken-label">Взяли: ни одного набора</p>`;
 if(['groups','identity','zero','factors','repair'].includes(c.kind)){body+=`<div class="paleo-dig">${c.b?Array.from({length:c.b},(_,i)=>group(c.a,i,activeInspect)).join(''):'<div class="paleo-no-groups"><span>Нет ни одного набора</span><p>Ни одной плитки: мы ещё не взяли ни одного набора.</p></div>'}</div>`;}
 if(c.kind==='unequal'){body+=`<div class="paleo-dig paleo-repair">${s.groups.map((n,i)=>`<div class="paleo-repair-group">${group(n,i)}${s.stage==='fix'?`<div class="paleo-toolbox">${button('−','adjust',[i,-1],'tool',n===0)}<span>Сделать по ${c.a}</span>${button('+','adjust',[i,1],'tool',n===9||s.groups.reduce((a,b)=>a+b,0)>=Math.max(c.groups.reduce((a,b)=>a+b,0),solution(c)))}</div>`:''}</div>`).join('')}</div>`;}
 if(c.kind==='unequal'){const reserve=Math.max(c.groups.reduce((a,b)=>a+b,0),solution(c))-s.groups.reduce((a,b)=>a+b,0);body+=`<aside class="paleo-reserve" data-reserve="${reserve}"><p>Отдельный столик: ${reserve}. Эти плитки не входят в группы.</p>${items(reserve,type)}</aside>`;}
 if(c.kind==='repeated'){body+=`<div class="paleo-dig">${Array.from({length:c.b},(_,i)=>group(c.a,i)).join('')}</div><div class="paleo-sum">${Array.from({length:c.b},(_,i)=>`<span class="paleo-term">${i?'<b>+</b>':''}${s.terms[i]===undefined?'…':s.terms[i]}</span>`).join('')}</div>`;}
 if(['array','swap'].includes(c.kind)){
  const each=s.swapped?c.b:c.a,count=s.swapped?c.a:c.b;body+=`<div class="paleo-array ${s.swapped?'is-swapped':''}" data-each="${each}" data-groups="${count}"><p class="paleo-array-caption">По ${each} в ряду · ${count} ${plural(count,'ряд','ряда','рядов')}</p>${Array.from({length:count},(_,i)=>`<${activeInspect?'button':'div'} ${activeInspect?`type="button" onclick="${click('mark',i)}" aria-pressed="${s.marked.includes(i)}" aria-label="Обвести ряд ${i+1}"`:''} class="paleo-row ${!s.swapped&&s.marked.includes(i)?'is-marked':''}" data-count="${each}">${items(each,type,Array.from({length:each},(_,j)=>s.swapped?j*c.a+i:i*c.a+j))}</${activeInspect?'button':'div'}>`).join('')}</div>`;
  if(s.swapped)body+=`<p class="paleo-proof">Находки те же: ничего не добавилось и не исчезло. Теперь в каждом ряду по ${c.b}, а рядов ${c.a}.</p>${equation([c.a,'·',c.b,'=',c.b,'·',c.a])}`;
 }
 if(c.kind==='extend'||c.kind==='build'){
  body+=`<div class="paleo-workbench"><p class="paleo-caption">По ${s.builtEach} в наборе · наборов ${s.builtGroups}</p><div class="paleo-dig">${Array.from({length:s.builtGroups},(_,i)=>group(s.builtEach,i)).join('')||'<p class="paleo-empty">Здесь появятся твои наборы</p>'}</div></div>`;
  if(s.stage==='build')body+=`<div class="paleo-constructor"><div class="paleo-toolbox"><span>Предметов в каждом</span>${button('−','buildEach',-1,'tool',s.builtEach===0)}<b>${s.builtEach}</b>${button('+','buildEach',1,'tool',s.builtEach===9)}</div><div class="paleo-toolbox"><span>Сколько наборов</span>${button('−','buildGroups',-1,'tool',s.builtGroups===0)}<b>${s.builtGroups}</b>${button('+','buildGroups',1,'tool',s.builtGroups===9)}</div>${button('Проверить раскладку','built')}</div>`;
 }
 if(c.kind==='repeated'&&s.tokens.length===3)body+=`<div class="paleo-proof"><p>Твоя короткая запись</p>${equation(s.tokens)}</div>`;
 if(c.kind==='table'){
  body+=`${rounds(c).length>1?`<p class="paleo-progress">Запись ${s.round+1} из ${rounds(c).length}</p>`:''}<table class="paleo-ledger"><caption>Дневник одинаковых групп</caption><thead><tr><th scope="col">В каждом</th><th scope="col">Наборов</th><th scope="col">Всего</th></tr></thead><tbody>${(c.rounds?.length?rounds(c).map((r,i)=>`<tr class="${i===s.round?'current':''}"><td>${r.a}</td><td>${r.b}</td><td>${s.completed[i]===undefined?'…':s.completed[i]}</td></tr>`):Array.from({length:c.lookup?Math.min(9,Math.max(5,c.b+1)):c.b},(_,i)=>`<tr class="${c.lookup?s.row===i+1?'current':'':i+1===c.b?'current':''}"><td>${c.a}</td><td>${s.stage==='lookup'?button(i+1,'lookup',i+1,'table-row',false,`Выбрать строку: ${i+1} ${plural(i+1,'группа','группы','групп')}`):i+1}</td><td>${c.lookup||i+1<c.b||s.ok?c.a*(i+1):'…'}</td></tr>`)).join('')}</tbody></table><div class="paleo-dig">${Array.from({length:c.fromB!==undefined?s.builtGroups:p.b},(_,i)=>group(p.a,i)).join('')}</div>`;
 }
 if(s.stage==='inspect'){prompt=c.kind==='array'||c.kind==='swap'?'Обведи каждый ряд одним нажатием.':c.kind==='zero'?'В каждом наборе пусто. Обведи все наборы и посмотри, появились ли предметы.':type==='dino-foot'?'Коснись каждой фигурки.':'Коснись каждого коврика.';body+=button(c.kind==='repair'?'Посмотреть запись Таи':type==='dino-foot'?'Сосчитать лапы':type==='stamp'?'Сосчитать отпечатки':'Сосчитать плитки','inspect',null,'primary',s.marked.length!==c.b);}
 if(s.stage==='sum'){prompt=`Для каждого набора запиши одно слагаемое. Какое число повторяется ${c.b} ${plural(c.b,'раз','раза','раз')}?`;body+=numberChoices('term',c.a,9)+button('Убрать последнее слагаемое','undoTerm',null,'tool',s.terms.length===0);}
 if(s.stage==='compact'){prompt='Собери короткую запись: число в группе, точка умножения, число групп.';body+=`<div class="paleo-slots">${Array.from({length:3},(_,i)=>`<span class="paleo-slot">${esc(s.tokens[i]??'…')}</span>`).join('')}</div><div class="paleo-controls">${[...new Set([String(c.a),'·',String(c.b),'+'])].map(t=>button(t,'token',t,'number')).join('')}</div>${button('Убрать последний знак','undoToken',null,'tool',s.tokens.length===0)}`;}
 if(s.stage==='each'){prompt=c.kind==='tutorial'&&c.tutorialType==='groups'?'Сколько плиток на одном коврике? Посмотри на обведённый коврик.':'Сколько предметов в одном наборе? Это первое число в нашей записи.';body+=numberChoices('each',c.a,9);}
 if(s.stage==='times'){prompt=c.kind==='tutorial'&&c.tutorialType==='groups'?'Теперь считаем коврики. Сколько их?':'Сколько одинаковых наборов? Это второе число — сколько раз берём первый набор.';body+=numberChoices('times',c.b,9);}
 if(s.stage==='judge'){prompt='На всех трёх ковриках плиток поровну?';body+=`<div class="paleo-controls">${button('Да, группы равные','judge','yes')}${button('Нет, сначала сравним','judge','no')}</div>`;}
 if(s.stage==='fix'){prompt=`Исправь раскладку: в каждом наборе должно быть по ${c.a}.`;body+=button('Теперь группы равные','fixed');}
 if(s.stage==='flip'){prompt='А теперь обведём те же находки в другом направлении. Их общее число изменится?';body+=button('Повернуть ряды','rotate');}
 if(s.stage==='extend'){prompt=`Доведи число наборов до ${c.b}. Прибавляется каждый раз целый набор из ${c.a}.`;const controls=`<div class="paleo-controls">${button('Добавить целый набор','moreGroups',1,'primary',s.builtGroups===9)}${button('Убрать последний набор','moreGroups',-1,'tool',s.builtGroups===0)}${button('Сосчитать новую раскладку','extended')}</div>`;body=c.kind==='table'&&c.fromB!==undefined?controls+body:body+controls;}
 if(s.stage==='empty'){prompt='Если нет ни одной группы, ни один предмет не попал в раскладку.';body+=button('Здесь нет ни одной группы','empty');}
 if(s.stage==='probe'){prompt='Все наборы обведены. Сравним идею с настоящим количеством.';body+=`<aside class="paleo-mistake"><p>Тая записала</p>${equation([c.a,'·',c.b,'=',c.mistake])}</aside>${button('Проверить по наборам','probe')}`;}
 if(s.stage==='build')prompt=`Сначала выбери, сколько предметов в каждом, затем — сколько наборов. Построй ${c.b} ${plural(c.b,'набор','набора','наборов')}, в каждом по ${c.a}. Можно добавлять и убирать.`;
 if(s.stage==='lookup')prompt=`Найди в столбце «Наборов» число ${c.b} и нажми на него. Затем прочитай ответ в той же строке.`;
 if(s.stage==='answer'){
  prompt=c.kind==='tutorial'?(c.tutorialType==='count'?'Сколько плиток мы посчитали?':'Сколько плиток на всех трёх ковриках?'):type==='dino-foot'?'Сколько лап у всех трёх игрушечных фигурок?':c.kind==='swap'?'Сколько находок осталось после перегруппировки?':'Сколько предметов во всех одинаковых группах?';
  body+=(c.kind==='tutorial'&&['count','place','groups'].includes(c.tutorialType)?'':c.kind==='tutorial'&&c.tutorialType!=='notation'?equation([...Array.from({length:c.b},(_,i)=>i?['+',c.a]:[c.a]).flat(),'=','?']):equation([p.a,'·',p.b,'=','?']))+numberChoices('answer',solution(p));
 }
 if(s.stage==='next')body+=button('Следующая запись в дневнике','next');
 if(s.ok&&c.kind!=='tutorial'){body+=`<div class="paleo-proof">${equation([p.a,'·',p.b,'=',solution(p)])}<p>По ${p.a} в каждом наборе, ${p.b} ${plural(p.b,'набор','набора','наборов')} — всего ${solution(p)}.</p></div>`;}
 return `<div class="paleo-game ${s.ok?'is-success':''}" data-kind="${c.kind}" data-stage="${s.stage}">${picture(c,s)}<div class="paleo-dialogue реплика"><span class="аватар"><img src="${A}${keys[c.who]}.webp" alt=""><span>${esc(C.characters[c.who].name)}</span></span><p>${esc(c.q)}</p><button type="button" class="слушать" aria-label="Послушать">🔊</button></div>${prompt?`<p class="paleo-instruction">${esc(prompt)}</p>`:''}${body}${c.more?`<details class="paleo-more"><summary>${esc(c.moreLabel||'О плитках на ковриках')}</summary><p>${esc(c.more)}</p></details>`:''}${s.fb&&!(c.kind==='tutorial'&&s.ok)?`<p class="paleo-feedback is-${s.tone}" role="status">${esc(s.fb)}</p>`:''}${!s.ok?`<div class="paleo-help">${button(c.helpLabel||'Показать счёт по коврикам','hint',null,'tool')}</div>`:''}</div>`;
}
function record(){const r=lrec();if(!r.paleo314||r.paleo314.version!==2)r.paleo314={version:2,frames:{},practice:{}};r.paleo314.frames||={};r.paleo314.practice||={};return r.paleo314;}
function practiceState(i){const p=record().practice;p[i]=validState(tasks[i],p[i]);return p[i];}
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="paleo314"><p class="paleo-kicker">${i+1} / ${scenes.length}</p><h3 class="paleo-heading">${esc(c.t)}</h3>${renderGame(c,s,'story',i)}</div>`,делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function nativeAnswer(c){return c.nativeKind==='choice'||c.nativeKind==='unit'?c.ans:solution(c);}
function act(scope,i,action,value,rev){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i)||!['story','practice'].includes(scope))return false;
 if(scope==='story'&&(LV.phase!=='explain'||LV.step!==i||!scenes[i]))return false;
 if(scope==='practice'&&(LV.phase!=='tasks'||LV.task!==i||!tasks[i]))return false;
 const c=scope==='story'?scenes[i]:tasks[i],s=scope==='story'?CHS[lidKey(ID)]?.п?.[i]:practiceState(i);
 if(!s||rev!==s.rev||scope==='practice'&&lrec().tasks.includes(i))return false;
 if(!apply(c,s,action,value))return false;window.PALEO314_AUDIO?.stop();
 if(scope==='story'){sync();if(typeof chRender==='function')chRender(0);}else{save();if(s.ok&&!lrec().tasks.includes(i))lvPick(nativeAnswer(c));else if(action==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();}
 if(action==='hint')window.PALEO314_AUDIO?.playKey((scope==='story'?'frame-':'task-')+i+'-hint');return true;
}
function practice(c,i){const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(c,s);return `<div class="paleo314 paleo-practice"><h3 class="paleo-heading">${esc(c.t)}</h3>${renderGame(c,s,'practice',i)}</div>`;}
// A free exploration desk; it never changes lesson records or awards stars.
let atlasNumber=3,atlasGroups=1,atlasMarks=[],atlasOpen=false;
function referenceRows(n){
 if(!Number.isInteger(n)||n<1||n>9)return '';
 return `<table class="paleo-ledger paleo-reference-table"><caption>Берём по ${n}</caption><thead><tr><th scope="col">Запись</th><th scope="col">Результат</th></tr></thead><tbody>${Array.from({length:9},(_,i)=>`<tr data-multiplier="${i+1}"><th scope="row">${n} · ${i+1}</th><td>= ${n*(i+1)}</td></tr>`).join('')}</tbody></table>`;
}
function atlasWorkspace(){
 const tool=(text,delta,disabled)=>`<button type="button" class="paleo-button tool" aria-label="${delta<0?'Убрать один набор':'Добавить один набор'}" onclick="PALEO314.changeAtlasGroups(${delta})" ${disabled?'disabled':''}>${text}</button>`;
 return `<div class="paleo-atlas-quantity"><label id="paleo314-groups-label" for="paleo314-groups-output">Сколько наборов?</label>${tool('−',-1,atlasGroups===0)}<output id="paleo314-groups-output" aria-labelledby="paleo314-groups-label" aria-live="polite">${atlasGroups}</output>${tool('+',1,atlasGroups===9)}</div><div class="paleo-atlas-result" aria-live="polite">${equation([atlasNumber,'·',atlasGroups,'=',atlasNumber*atlasGroups])}<p>Ещё один набор прибавляет ${atlasNumber}.</p></div><div class="paleo-dig paleo-atlas-groups">${Array.from({length:atlasGroups},(_,i)=>`<button type="button" class="paleo-group paleo-atlas-group ${atlasMarks.includes(i)?'is-marked':''}" data-atlas-group="${i}" data-count="${atlasNumber}" aria-pressed="${atlasMarks.includes(i)}" aria-label="${atlasMarks.includes(i)?'Снять обводку с набора':'Обвести набор'} ${i+1}" onclick="PALEO314.toggleAtlasGroup(${i})"><span class="paleo-group-label">Набор ${i+1}</span>${items(atlasNumber,'tile')}<span class="paleo-group-count">По ${atlasNumber}</span></button>`).join('')||'<div class="paleo-atlas-empty"><span>Ни одного набора — ни одной находки.</span><p>Нажми «+», и появится первый набор.</p></div>'}</div>${atlasMarks.length?`<p class="paleo-atlas-mark-count" role="status">Обведено ${atlasMarks.length} из ${atlasGroups} · находок в обводке ${atlasNumber*atlasMarks.length}.</p>`:''}<details id="paleo314-atlas-answers" class="paleo-atlas-answers" ${atlasOpen?'open':''} ontoggle="PALEO314.setAtlasOpen(this.open)"><summary>${atlasOpen?'Закрыть страницу с ответами':'Открыть страницу с ответами'}</summary><div id="paleo314-reference-rows">${referenceRows(atlasNumber)}</div></details>`;
}
function reference(){return `<section class="paleo-atlas-reference" aria-labelledby="paleo314-reference-title"><h4 id="paleo314-reference-title">Добавляй наборы — считай находки</h4><label for="paleo314-table-number">В каждом наборе</label><select id="paleo314-table-number" onchange="PALEO314.setAtlasNumber(Number(this.value))">${Array.from({length:9},(_,i)=>`<option value="${i+1}"${atlasNumber===i+1?' selected':''}>${i+1}</option>`).join('')}</select><div id="paleo314-atlas-workspace">${atlasWorkspace()}</div></section>`;}
function atlasElement(){return typeof LV!=='undefined'&&LV.id===ID&&LV.phase==='done'?document.getElementById('paleo314-atlas-workspace'):null;}
function redrawAtlas(el){window.PALEO314_AUDIO?.stop();el.innerHTML=atlasWorkspace();return true;}
function setAtlasNumber(n){
 const el=atlasElement();if(!el||!Number.isInteger(n)||n<1||n>9)return false;
 atlasNumber=n;atlasMarks=[];atlasOpen=false;const select=document.getElementById('paleo314-table-number');if(select)select.value=String(n);return redrawAtlas(el);
}
function changeAtlasGroups(delta){
 const el=atlasElement();if(!el||![1,-1].includes(delta)||atlasGroups+delta<0||atlasGroups+delta>9)return false;
 atlasGroups+=delta;atlasMarks=atlasMarks.filter(i=>i<atlasGroups);return redrawAtlas(el);
}
function toggleAtlasGroup(i){
 const el=atlasElement();if(!el||!Number.isInteger(i)||i<0||i>=atlasGroups)return false;
 atlasMarks=atlasMarks.includes(i)?atlasMarks.filter(n=>n!==i):[...atlasMarks,i];return redrawAtlas(el);
}
function setAtlasOpen(open){
 if(!atlasElement()||typeof open!=='boolean')return false;const details=document.getElementById('paleo314-atlas-answers');if(!details)return false;
 atlasOpen=open;if(details.open!==open)details.open=open;const summary=details.querySelector('summary');if(summary)summary.textContent=open?'Закрыть страницу с ответами':'Открыть страницу с ответами';return true;
}
window.PALEO314={scenes,tasks,frames,initial,apply,restoreSolved,validState,renderGame,act,solution,current,referenceRows,reference,atlasWorkspace,setAtlasNumber,changeAtlasGroups,toggleAtlasGroup,setAtlasOpen};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:{rum:{имя:'Рум',ф:'rum'},taya:{имя:'Тая',ф:'taya'}},фоны:['camp'],кадры:frames,запись:{title:C.title,ico:'🦕',src:'Начальная школа · 2 класс · Умножение: смысл, равные группы и таблица',subj:'jun',check:C.check,tasks:tasks.map(t=>({q:t.q,kind:t.nativeKind||'unit',choices:t.choices,ans:nativeAnswer(t),tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},тренажёр:{герой:'rum',проверка:{разборы:{'7':'Получилось 7, если сложить 3 и 4. Но здесь четыре одинаковые тройки. Попробуй сложить их все.','34':'Цифры не нужно ставить рядом. Точка означает: взять по три четыре раза.','9':'Девять получится из трёх троек. А в условии четыре группы. Добавь ещё одну тройку.'},картинка:()=>`<div class="paleo314">${picture(scenes[0],initial(scenes[0]))}<div class="paleo-dig">${Array.from({length:4},(_,i)=>`<section class="paleo-group"><span class="paleo-group-label">Набор ${i+1}</span>${items(3,'tile')}</section>`).join('')}</div>${equation([3,'·',4,'=','?'])}<p class="paleo-instruction">Три предмета в каждом из четырёх одинаковых наборов.</p></div>`,итог:C.check.exp},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),итог:t.sol})),финал:()=>`<div class="paleo314 paleo-finale">${picture(scenes[scenes.length-1],{ok:true})}<h3 class="paleo-heading">Плитки на твоём столе</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button>${C.finale.map(t=>`<p>${esc(t)}</p>`).join('')}${reference()}</div>`}});
let restored=false;const originalRenderer=WAVE_B[ID];WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const data=record();CHS[k].п={};for(const[i,raw]of Object.entries(data.frames))if(scenes[i])CHS[k].п[i]=validState(scenes[i],raw);for(const[i,raw]of Object.entries(data.practice))if(tasks[i])data.practice[i]=validState(tasks[i],raw);restored=true;}originalRenderer(el);sync();};
function sync(){if(typeof LV==='undefined'||LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{},can=LV.phase!=='explain'||p[LV.step]?.ok===true;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});record().frames=clone(p);save();}
window.addEventListener('load',()=>{for(const name of['lvStep','lvToCheck']){const old=window[name];if(typeof old!=='function')continue;window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
})();
