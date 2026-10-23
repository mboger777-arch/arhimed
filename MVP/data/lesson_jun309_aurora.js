/* 309 · Маяк северного сияния. Native lesson and practice, isolated state. */
(function(){
'use strict';
if(!window.ДК)return;
const ID=309,A='img/l309/',actors=['Финн','Лума','Орин'],keys=['finn','luma','orin'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const portrait=(i,pose='idle')=>`<img src="${A}${keys[i]}-${pose}.webp" alt="" draggable="false">`;
const gem=()=>'<svg viewBox="0 0 48 60" aria-hidden="true"><path d="M24 3 41 19 38 44 24 57 9 44 7 19Z" fill="#6cd9d6" stroke="#287e8d" stroke-width="2"/><path d="m24 3-9 19 9 35 9-35Z" fill="#d0ffff"/><path d="M7 19 15 22 9 44M41 19 33 22 38 44" fill="#45a7be"/><path d="M24 3v54M7 19l17 8 17-8" fill="none" stroke="#fff" stroke-width="1.5"/></svg>';
const scenes=[
{t:'Письмо с северного маяка',who:1,kind:'duel',total:2,first:'you',q:'Я Лума! Помоги зажечь маяк для кораблика. Начнём с игры: берём по очереди один или два кристалла. Кто заберёт последний — победит. Осталось два, твой ход. Забери оба!',hint:'Нажми «Взять 2». Оба кристалла твои, ходить больше нечем — ты победил.',sol:'Последний кристалл у тебя! Главное правило: за ход можно взять один или два. Последний приносит победу.'},
{t:'Ответ на один',who:2,kind:'pair',opponent:1,q:'Я Орин, хранитель маяка. Откроем первый замок! Финн взял один кристалл. Выбери, сколько взять тебе, чтобы за два хода вместе получилось три.',hint:'Один уже есть. До трёх не хватает двух: один плюс два.',sol:'Один и два дают три! Мы связали два хода в одну пару.',bg:'lantern'},
{t:'А если Финн взял два?',who:0,kind:'pair',opponent:2,q:'Я Финн. А теперь беру два! Ответь так, чтобы за наши два хода снова ушло ровно три кристалла.',hint:'После двух не хватает одного. Два плюс один равно три.',sol:'Два и один — тоже три. Ты умеешь отвечать на оба возможных хода!'},
{t:'Тройки для механизма',who:2,kind:'group',total:6,q:'Механизм работает парами ходов. Раздели шесть кристаллов на тройки: выбирай ровно три и нажимай «Соединить тройку». Затем собери следующую.',hint:'Выбери три из шести. Соедини их. Останутся ещё три — это вторая тройка.',sol:'Шесть — это две тройки. Каждая тройка уйдёт за ход Финна и твой ответ.',bg:'lantern'},
{t:'Первая настоящая партия',who:0,kind:'duel',total:6,first:'finn',q:'На столе шесть кристаллов. Я начинаю, ты отвечаешь. Нажми «Ход Финна», затем дополни мой ход до трёх. Повторяй, пока не заберёшь последний.',hint:'Финн берёт один — бери два. Финн берёт два — бери один. После твоих ходов останется три, затем ноль.',sol:'Победа! Финн начал, а ты каждый раз дополнял до трёх и забрал последний.'},
{t:'Кому начать?',who:1,kind:'choose',opts:['Начать самому','Пропустить Финна вперёд'],answer:1,display:6,q:'Снова шесть кристаллов. Финн тоже знает хороший способ игры. Какой порядок ходов позволит тебе выиграть наверняка?',hint:'Шесть делится на тройки. Пусть Финн ходит первым, а ты дополняй каждый его ход до трёх.',sol:'Выгодно отвечать вторым. Но важно и дальше дополнять ходы до трёх: один порядок ещё не приносит победу.'},
{t:'Седьмой кристалл',who:2,kind:'opening',total:7,q:'Теперь кристаллов семь, и начинаешь ты. Выбери первый ход, после которого Финну останется шесть. Дальше ты сможешь отвечать до трёх.',hint:'Из семи убери один — останется шесть. Не нужно каждый раз начинать вторым.',sol:'Первым берём один. Остаётся шесть, и теперь ход Финна. План снова работает!',bg:'lantern'},
{t:'Дверь с восемью огнями',who:0,kind:'duel',total:8,first:'you',q:'Перед дверью восемь кристаллов. Ты начинаешь. Оставь мне шесть, а потом дополняй мои ходы до трёх. Сыграем до конца!',hint:'Сначала возьми два: останется шесть. Затем на один отвечай двумя, а на два — одним.',sol:'Дверь открыта! Сначала ты подготовил удобное число, затем сохранил свой план.',bg:'lantern'},
{t:'Узор отражений',who:2,kind:'mirror',size:3,q:'Линза загорается парами огней. Центр занят звездой. Финн зажигает один огонёк, ты — противоположный через центр. Верхний левый отвечает нижнему правому. Заполни все пары!',hint:'Мысленно поверни квадрат на пол-оборота. Клетка на другом конце линии через центр — твой ответ.',sol:'Каждому ходу нашлась пара! Пока узор симметричен, свободная клетка для твоего ответа всегда есть.',bg:'lantern'},
{t:'Зажги северное сияние!',who:1,kind:'duel',total:9,first:'finn',q:'Остался последний замок: девять кристаллов. Финн начинает. Отвечай до трёх и забери последний — маяк осветит путь кораблику!',hint:'Девять — три тройки. После твоих ответов должно остаться шесть, три и ноль.',sol:'Маяк светит! Ты не угадывал: продумывал ответ на каждый ход. Кораблик нашёл путь. Теперь попробуем новые испытания!',bg:'lantern'}
];
const tasks=[
{t:'Почини первый замок',who:2,kind:'pair',opponent:2,q:'На замке два огонька Финна. Добавь столько, чтобы в паре ходов было три.',hint:'Два плюс один — три.',sol:'Один — верный ответ на два!',series:0,bg:'lantern'},
{t:'Четыре перед стартом',who:1,kind:'opening',total:4,q:'Четыре кристалла, ты начинаешь. Оставь Финну одну полную тройку.',hint:'Четыре минус один — три.',sol:'Возьми один. Финну останется три, а тебе — последний ход.',series:0},
{t:'Пять перед стартом',who:0,kind:'opening',total:5,q:'Теперь кристаллов пять. Найди первый ход, который оставит Финну три.',hint:'Чтобы из пяти осталось три, возьми два.',sol:'Два! После такого начала на любой ответ Финна ты заберёшь остаток.',series:0},
{t:'Отметь удобные числа',who:2,kind:'mark',numbers:[3,4,6,8,9],q:'Отметь все числа, которые можно целиком разделить на тройки. Именно столько выгодно оставлять сопернику. Повторное нажатие снимает отметку.',hint:'Это три, шесть и девять. Четыре и восемь не делятся на полные тройки.',sol:'Три, шесть, девять! Теперь ты узнаёшь удобные позиции.',series:0,bg:'lantern'},
{t:'Партия на четыре',who:0,kind:'duel',total:4,first:'you',q:'Финн не будет поддаваться. На столе четыре. Начни правильно и забери последний кристалл.',hint:'Сначала один. Потом отвечай на ход Финна до трёх.',sol:'Ты выиграл настоящую короткую партию!',series:1},
{t:'Партия на пять',who:1,kind:'duel',total:5,first:'you',q:'На столе пять. Сыграй первым и доведи свой план до победы.',hint:'Сначала два — останется три. Потом забери то, что оставит Финн.',sol:'Пять превратились в три, затем в ноль. План сработал!',series:1},
{t:'Три связки света',who:2,kind:'group',total:9,q:'Подготовь девять кристаллов для маяка. Собирай их в тройки. Проверь, сколько связок получится.',hint:'Три, ещё три и ещё три. Всего три связки.',sol:'Три связки по три. Столько пар ходов будет в партии на девять.',series:1,bg:'lantern'},
{t:'Десять: новый вызов',who:0,kind:'duel',total:10,first:'you',q:'Десять кристаллов. Ты первый. Найди начало, после которого Финн получит девять, и доведи партию до победы.',hint:'Сначала возьми один. После ходов Финна дополняй до трёх.',sol:'Ты выиграл длинную партию! Тот же способ работает и с новым числом.',series:1},
{t:'Большая световая линза',who:2,kind:'mirror',size:4,q:'Теперь линза четыре на четыре. Финн начинает. После каждого его огонька зажигай противоположный через центр квадрата. Заполни восемь пар.',hint:'Верхний левый отвечает нижнему правому. Верхний правый — нижнему левому. Для остальных клеток действует тот же поворот на пол-оборота.',sol:'Восемь пар! Ты отвечал последним, потому что у каждого огонька была свободная пара.',series:2,bg:'lantern'},
{t:'Найди ошибку Финна',who:1,kind:'choose',opts:['Оставить ответ 1','Заменить ответ на 2'],answer:1,display:3,claim:true,q:'В учебном примере соперник взял один, а Финн тоже взял один. Он сказал: «Вместе три!» Исправь его ответ.',hint:'Один плюс один — два. Нужно ответить двумя, чтобы получить три.',sol:'Ответ должен быть два. Мы проверили сумму, а не поверили словам.',series:2},
{t:'Девять: игра вторым',who:0,kind:'duel',total:9,first:'finn',q:'Девять кристаллов, Финн начинает. Теперь сыграй без готового первого хода: следи за каждым его действием.',hint:'На один бери два, на два бери один. После твоих ходов остаются шесть, три и ноль.',sol:'Ты удержал план до самого конца!',series:2},
{t:'Капитан северного сияния',who:1,kind:'duel',total:11,first:'you',q:'Финальное испытание: одиннадцать кристаллов. Ты начинаешь. Подготовь девять и отвечай до трёх. Удачи, хранитель маяка!',hint:'Первый ход — два. Затем дополняй каждый ход Финна до трёх.',sol:'Маяк под твоей защитой! Ты умеешь находить первый ход, предвидеть ответ и сохранять выигрышный план.',series:2,bg:'lantern'}
];
const series=['Открыватели секретов','Игры с Финном','Хранители сияния'];
function initial(c){return {ok:false,fb:'',picked:null,selected:[],groups:[],remaining:c.total||0,turn:c.first||'you',history:[],lost:false,cells:Array((c.size||0)**2).fill(''),pending:null,pairs:0};}
const valid=(v,n)=>Number.isInteger(v)&&v>=0&&v<n;
const finish=(c,s)=>{s.ok=true;s.fb=c.sol;};
function take(c,s,n,who){
 s.remaining-=n;s.history.push({who,n,left:s.remaining});
 if(!s.remaining){s.turn='done';if(who==='you')finish(c,s);else{s.lost=true;s.fb='Последний кристалл у Финна. Ничего страшного! Посмотри на ходы: старайся оставлять ему 3, 6 или 9. Нажми «Сыграть заново».';}}
 else{s.turn=who==='you'?'finn':'you';s.fb=who==='finn'?`Финн взял ${n}. Осталось ${s.remaining}. Теперь твой ход.`:`Ты взял ${n}. Осталось ${s.remaining}. Теперь ход Финна.`;}
}
function apply(c,s,a,v){
 if(s.ok)return false;
 if(a==='hint'){s.fb=c.hint;return true;}
 if(a==='reset'){Object.assign(s,initial(c));s.fb='Новая попытка. Подумай не только о своём ходе, но и об ответе.';return true;}
 if(c.kind==='duel'){
  if(s.lost)return false;
  if(a==='take'&&s.turn==='you'&&[1,2].includes(v)&&v<=s.remaining){take(c,s,v,'you');return true;}
  if(a==='opponent'&&s.turn==='finn'){
   const r=s.remaining%3;const n=r||((s.history.filter(h=>h.who==='finn').length%2)+1);take(c,s,Math.min(s.remaining,n),'finn');return true;
  }
 }
 if(a==='pick'&&['pair','opening'].includes(c.kind)&&[1,2].includes(v)){
  s.picked=v;const good=c.kind==='pair'?c.opponent+v===3:(c.total-v)%3===0;
  if(good)finish(c,s);else s.fb=c.kind==='pair'?`${c.opponent} + ${v} = ${c.opponent+v}. Нам нужно три. Попробуй другой ответ.`:`После хода останется ${c.total-v}. А нужно оставить полные тройки. Попробуй ещё.`;return true;
 }
 if(a==='choose'&&c.kind==='choose'&&valid(v,c.opts.length)){s.picked=v;if(v===c.answer)finish(c,s);else s.fb=c.hint;return true;}
 if(a==='toggle'&&['group','mark'].includes(c.kind)&&valid(v,c.kind==='group'?c.total:c.numbers.length)){
  if(c.kind==='group'&&s.groups.flat().includes(v))return false;
  s.selected.includes(v)?s.selected=s.selected.filter(x=>x!==v):s.selected.push(v);s.fb='Выбор можно изменить повторным нажатием.';return true;
 }
 if(a==='check'&&c.kind==='group'){
  if(s.selected.length!==3){s.fb='В одной связке должно быть ровно три кристалла. Измени выбор.';return true;}
  s.groups.push([...s.selected]);s.selected=[];if(s.groups.length*3===c.total)finish(c,s);else s.fb=`Связок готово: ${s.groups.length}. Собери ещё одну тройку.`;return true;
 }
 if(a==='check'&&c.kind==='mark'){
  const good=c.numbers.every((n,i)=>s.selected.includes(i)===(n%3===0));if(good)finish(c,s);else s.fb='Проверь каждое число: должно получаться несколько полных троек, без остатка.';return true;
 }
 if(c.kind==='mirror'){
  const center=c.size%2?Math.floor(c.size*c.size/2):-1;
  if(a==='opponent'&&s.pending===null){const free=s.cells.map((x,i)=>i).filter(i=>!s.cells[i]&&i!==center);if(!free.length)return false;const i=free[(s.pairs*3)%free.length];s.cells[i]='finn';s.pending=i;s.fb=`Финн зажёг клетку ${i+1}. Найди её пару через центр.`;return true;}
  if(a==='cell'&&valid(v,s.cells.length)&&v!==center&&s.pending!==null&&!s.cells[v]){
   if(v!==s.cells.length-1-s.pending){s.fb='Эта клетка не напротив огонька Финна. Представь поворот квадрата на пол-оборота.';return true;}
   s.cells[v]='you';s.pending=null;s.pairs++;if(s.pairs===Math.floor(s.cells.length/2))finish(c,s);else s.fb='Пара загорелась! Теперь снова ход Финна.';return true;
  }
 }
 return false;
}
function cast(c,s){const members=c.finale?[0,1,2]:c.kind==='duel'?[0,1]:[c.who];return `<div class="aur-cast" style="--world:url('${A}${c.bg||'coast'}.webp')">${members.map(i=>`<div>${portrait(i,s.ok?'happy':(s.history.length||s.picked!==null||s.pending!==null||s.selected.length||s.groups.length)?'action':'idle')}<span>${actors[i]}</span></div>`).join('')}</div>`;}
function renderGame(c,s,scope,i){
 const b=(txt,a,v=null,cls='',disabled=false)=>`<button type="button" class="aur-button ${cls}" onclick="AUR309.act('${scope}',${i},'${a}',${JSON.stringify(v)})"${disabled?' disabled':''}>${txt}</button>`;
 const gems=n=>Array.from({length:n},()=>gem()).join('');
 let work='';
 if(c.kind==='duel')work=`<div class="aur-rules">За ход: 1 или 2 · Последний побеждает</div><div class="aur-turn ${s.ok?'won':''}">${s.ok?'Маяк стал ярче!':s.lost?'Разберём эту партию':s.turn==='you'?'Твой ход':'Ход Финна'}<strong>Осталось: ${s.remaining}</strong></div><div class="aur-crystals" aria-label="Осталось кристаллов: ${s.remaining}">${gems(s.remaining)||'<span class="aur-glow">✦</span>'}</div><div class="aur-actions">${b('Взять 1','take',1,'',s.ok||s.lost||s.turn!=='you'||s.remaining<1)}${b('Взять 2','take',2,'',s.ok||s.lost||s.turn!=='you'||s.remaining<2)}</div>${!s.ok&&!s.lost&&s.turn==='finn'?b('Ход Финна →','opponent',null,'primary'):''}<ol class="aur-log" aria-label="Ходы партии">${s.history.map(h=>`<li><span>${h.who==='you'?'Ты':'Финн'}: ${h.n}</span><span>осталось ${h.left}</span></li>`).join('')}</ol>${s.lost?b('Сыграть заново','reset',null,'primary'):''}`;
 if(c.kind==='pair')work=`<p class="aur-note">Цель: вместе ровно 3</p><div class="aur-pair"><div><span>Финн</span><div>${gems(c.opponent)}</div><b>${c.opponent}</b></div><strong>+</strong><div><span>Ты</span><div>${s.picked?gems(s.picked):'<b>?</b>'}</div><b>${s.picked??'?'}</b></div><strong>=</strong><b>${s.picked?c.opponent+s.picked:"?"}</b></div><div class="aur-actions">${[1,2].map(n=>b(`Взять ${n}`,'pick',n,s.picked===n?'chosen':'',s.ok)).join('')}</div>`;
 if(c.kind==='opening')work=`<p class="aur-note">Оставь Финну полные тройки</p><div class="aur-crystals">${gems(s.ok?c.total-s.picked:c.total)}</div><div class="aur-equation">${c.total} − ${s.picked??'?'} = ${s.picked?c.total-s.picked:'?'}</div><div class="aur-actions">${[1,2].map(n=>b(`Взять ${n}`,'pick',n,s.picked===n?'chosen':'',s.ok)).join('')}</div>`;
 if(c.kind==='group')work=`<p class="aur-note">Выбрано: ${s.selected.length} из 3</p><div class="aur-gem-grid">${Array.from({length:c.total},(_,j)=>b(`${gem()}<span>${j+1}</span>`,'toggle',j,`gem-cell ${s.selected.includes(j)?'chosen':''} ${s.groups.flat().includes(j)?'used':''}`,s.ok||s.groups.flat().includes(j))).join('')}</div>${b('Соединить тройку','check',null,'primary',s.ok)}<div class="aur-bundles">${s.groups.map(()=>`<span>${gems(3)}<b>3</b></span>`).join('')}</div>`;
 if(c.kind==='mark')work=`<div class="aur-number-grid">${c.numbers.map((n,j)=>b(`${n}<small>${s.selected.includes(j)?'✓ выбрано':'выбрать'}</small>`,'toggle',j,s.selected.includes(j)?'chosen':'',s.ok)).join('')}</div>${b('Проверить числа','check',null,'primary',s.ok)}`;
 if(c.kind==='choose')work=`${c.claim?`<div class="aur-equation">${s.ok?'1 + 2 = 3':'1 + 1 = ?'}</div>`:`<div class="aur-crystals">${gems(c.display)}</div>`}<div class="aur-options">${c.opts.map((o,j)=>b(o,'choose',j,s.picked===j?'chosen':'',s.ok)).join('')}</div>`;
 if(c.kind==='mirror')work=`<p class="aur-note">◆ Финн · ✦ Ты · ${s.pairs} / ${Math.floor(c.size*c.size/2)} пар</p><div class="aur-mirror" style="--size:${c.size}">${s.cells.map((v,j)=>{const center=c.size%2&&j===Math.floor(s.cells.length/2);return b(`<span>${center?'★':v==='finn'?'◆':v==='you'?'✦':'·'}</span><small>${j+1}</small><span class="aur-sr">Клетка ${j+1}</span>`,'cell',j,`light-cell ${v} ${j===s.pending?'pending':''}`,s.ok||!!center||!!v||s.pending===null);}).join('')}</div>${!s.ok&&s.pending===null?b('Ход Финна →','opponent',null,'primary'):''}`;
 return `<div class="aur-game" data-game="${c.kind}">${cast(c,s)}<div class="aur-work">${work}</div><p class="aur-feedback ${s.ok?'success':''}" role="status" aria-live="polite">${esc(s.fb||'Не спеши. Попробуй — и посмотри, что изменится.')}</p>${s.ok?'':b('Нужна подсказка','hint',null,'aur-help')}</div>`;
}
function restoreSolved(c,s){
 Object.assign(s,initial(c));
 if(c.kind==='duel')while(!s.ok&&!s.lost){if(s.turn==='finn')apply(c,s,'opponent');else apply(c,s,'take',s.remaining%3||1);}
 if(c.kind==='pair')apply(c,s,'pick',3-c.opponent);
 if(c.kind==='opening')apply(c,s,'pick',c.total%3);
 if(c.kind==='choose')apply(c,s,'choose',c.answer);
 if(c.kind==='group')for(let j=0;j<c.total;j++){apply(c,s,'toggle',j);if(j%3===2)apply(c,s,'check');}
 if(c.kind==='mark'){c.numbers.forEach((n,j)=>{if(n%3===0)apply(c,s,'toggle',j);});apply(c,s,'check');}
 if(c.kind==='mirror')while(!s.ok){apply(c,s,'opponent');apply(c,s,'cell',s.cells.length-1-s.pending);}
}
const answer=t=>t.kind==='choose'?t.answer:1;
tasks.forEach(t=>{t.opts||=['Ещё думаю','Готово','Нужна помощь'];t.answer=answer(t);});
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="aur-chapter"><span>МАЯК СЕВЕРНОГО СИЯНИЯ</span><span>${i+1} / ${scenes.length}</span></div><h3 class="aur-heading">${c.t}</h3>`+renderGame(c,s,'story',i),делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function practiceState(i){const rec=lrec();rec.aurora||={version:1,frames:{}};rec.aurora.practice||={};return rec.aurora.practice[i]||=initial(tasks[i]);}
function act(scope,i,a,v){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i))return;
 window.AUR309_AUDIO?.stop();
 if(scope==='story'){if(LV.phase!=='explain'||LV.step!==i||!scenes[i])return;ДК.клик(ID,'action',a,v);if(a==='hint')window.AUR309_AUDIO?.playKey('frame-'+i+'-hint');return;}
 if(scope!=='practice'||LV.phase!=='tasks'||LV.task!==i||!tasks[i]||lrec().tasks.includes(i))return;
 const s=practiceState(i);if(!apply(tasks[i],s,a,v))return;save();if(s.ok)lvPick(tasks[i].answer);else{if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();if(a==='hint')window.AUR309_AUDIO?.playKey('task-'+i+'-hint');}
}
const practice=(t,i)=>{const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(t,s);return `<div class="aur-practice"><div class="aur-chapter"><span>${series[t.series]}</span><span>${i%4+1} / 4</span></div><h3 class="aur-heading">${t.t}</h3>${renderGame(t,s,'practice',i)}</div>`;};
window.AUR309={scenes,frames,tasks,initial,apply,act,restoreSolved,renderGame,restart(){if(LV.id!==ID)return;CHS[lidKey(ID)]={п:{}};LV.phase='explain';LV.step=0;renderLessonView();}};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:Object.fromEntries(keys.map((k,i)=>[k,{имя:actors[i],ф:k+'-idle',позы:{action:k+'-action',happy:k+'-happy'}}])),фоны:['coast'],кадры:frames,
 запись:{title:'Игры · Маяк северного сияния',ico:'🌌',subj:'jun',src:'Начальная школа · 1 класс · Олимп-1: игры и симметрия',check:{q:'На столе шесть кристаллов. Берут один или два, последний побеждает. Как выиграть при любом ходе Финна?',choices:['Начать первым и всегда брать два','Ходить вторым и дополнять ход Финна до трёх','Брать столько же, сколько Финн'],ans:1,exp:'Пусть Финн начнёт. На один отвечай двумя, на два — одним. После твоих ходов останется три, затем ноль.'},tasks:tasks.map(t=>({q:t.q,kind:'choice',choices:t.opts,ans:t.answer,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
 тренажёр:{герой:'luma',проверка:{картинка:()=>`<div class="aur-quiz-art">${portrait(1,'action')}</div>`,итог:'На один отвечай двумя, на два — одним. После твоих ходов останется три, затем ноль.'},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),разборы:Object.fromEntries(t.opts.map(v=>[v,t.hint])),итог:t.sol})),финал:()=>`<div class="aur-finale">${cast({kind:'duel',bg:'coast',finale:true},{ok:true})}<div class="aur-beacon">✦</div><h3>Маяк северного сияния!</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button><p>12 испытаний пройдены. Кораблик вернулся домой!</p><div class="aur-summary"><span>✓ Продумываешь ответ соперника</span><span>✓ Дополняешь ходы до трёх</span><span>✓ Находишь пары и сохраняешь план</span></div></div>`}
});
let restored=false,lastSaved='';const renderer=WAVE_B[ID];
WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const old=DB.lessons?.[ID]?.aurora;if(old?.version===1&&old.frames)CHS[k].п=JSON.parse(JSON.stringify(old.frames));restored=true;}renderer(el);if(LV.phase==='explain'&&LV.step===0&&CHS[k].п?.[0]?.ok)el.querySelector('.дк309')?.insertAdjacentHTML('beforeend','<button class="aur-button" onclick="AUR309.restart()">Повторить историю</button>');sync();};
function sync(){if(LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{};const can=LV.phase!=='explain'||p[LV.step]?.ok;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});const s=JSON.stringify(p);if(s!==lastSaved){DB.lessons||={};DB.lessons[ID]||={tasks:[],stars:0,done:false};DB.lessons[ID].aurora={...DB.lessons[ID].aurora,version:1,frames:JSON.parse(s)};lastSaved=s;save();}}
window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
const css=document.createElement('style');css.textContent=`
@font-face{font-family:AurHand309;src:url('fonts/Pangolin-ru.woff2') format('woff2');font-display:swap}
@font-face{font-family:AurTitle309;src:url('img/l307/Lobster-Regular.ttf') format('truetype');font-display:swap}
body:has(.дк309) #asst,#screen:has(.дк309)>.card>.arch{display:none}
#screen:has(.дк309)>.card{padding:6px;background:transparent;border:0}
#screen:has(.дк309)>h2{max-width:650px;margin:12px auto;color:#f8e9ba;font:400 25px/1.3 AurTitle309,cursive}
#lvis .дк.дк309{width:100%;max-width:650px;min-width:0;margin:auto;gap:14px;--чернила:#274650;--контур:#9b8658;font-family:AurHand309,sans-serif}
#lvis .дк.дк309 *{box-sizing:border-box}#lvis .дк.дк309 p{margin:0}
#lvis .дк.дк309 .реплика{display:grid;grid-template-columns:1fr 44px;gap:7px;background:none;border:20px solid transparent;border-image:url('img/l309/panel.webp') 14% 9% fill / 20px stretch;padding:4px 5px 7px;min-height:0;filter:drop-shadow(0 3px 4px #1117)}
#lvis .дк.дк309 .реплика .аватар{grid-column:1;grid-row:1;display:flex;align-items:center;flex-direction:row;gap:8px;width:auto;justify-content:start}
#lvis .дк.дк309 .реплика .аватар img{height:44px;width:35px;object-fit:contain}#lvis .дк.дк309 .реплика .аватар span{font:18px AurHand309;color:#557159}
#lvis .дк.дк309 .реплика p{grid-column:1/-1;grid-row:2;font:18px/1.45 AurHand309,sans-serif;color:#284753}
#lvis .дк.дк309 .слушать{grid-column:2;grid-row:1;width:44px;height:44px;min-height:44px;padding:0;border:2px solid #b9a363;border-radius:50%;background:linear-gradient(#5f9aab,#285c6a);color:#fff7d7;font-size:20px;box-shadow:0 2px 0 #294c3b}
#lvis .дк.дк309 .aur-chapter{display:flex;justify-content:space-between;gap:12px;color:#c1e6e4;font:12px/1.4 'NunitoДК',sans-serif;letter-spacing:.03em}
#lvis .дк.дк309 .aur-heading{font:400 27px/1.25 AurTitle309,cursive;color:#fae9ba;text-align:center;margin:0}
#lvis .дк.дк309 .aur-game,#lvis .дк.дк309 .aur-practice{display:grid;gap:12px;min-width:0}
#lvis .дк.дк309 .aur-cast{height:clamp(180px,35vw,260px);display:flex;justify-content:center;gap:16px;align-items:end;margin-bottom:9px;padding:25px 12px 9px;background-image:var(--world);background-size:cover;background-position:center bottom;border-radius:12px;box-shadow:inset 0 -12px 15px #95764c33}
#lvis .дк.дк309 .aur-cast>div{position:relative;height:100%;display:flex;align-items:center;justify-content:end;flex-direction:column;min-width:50px}
#lvis .дк.дк309 .aur-cast>div:before{content:'';position:absolute;bottom:18px;width:65px;height:10px;background:#352c2366;border-radius:50%;filter:blur(3px)}
#lvis .дк.дк309 .aur-cast img{height:calc(100% - 20px);max-width:100%;object-fit:contain;z-index:1}#lvis .дк.дк309 .aur-cast span{font-size:14px;line-height:19px;background:#fff3d2;color:#435a42;border-radius:10px;padding:0 9px;z-index:2}
#lvis .дк.дк309 button.aur-button,#lvis .дк.дк309 .число,#lvis .дк.дк309 .дальше-кн,#lvis .дк.дк309 .дт-подск,#screen:has(.дк309)>.btnrow>button,#screen:has(.дк309)>button{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;text-align:center;white-space:normal;min-height:54px;min-width:0;max-width:100%;padding:5px 7px;border:12px solid transparent;border-image:url('img/l309/button.webp') 25% 12% fill / 12px stretch;background:none;box-shadow:none;color:#234f58;font:400 18px/1.3 AurHand309,sans-serif;cursor:pointer;touch-action:manipulation;filter:drop-shadow(0 2px 2px #213b302b);transition:transform .12s}
#lvis .дк.дк309 button.chosen:disabled{outline:3px solid #609472;outline-offset:2px;opacity:1}#lvis .дк.дк309 button:focus-visible,#screen:has(.дк309) button:focus-visible{outline:3px solid #2e867b;outline-offset:3px}
#lvis .дк.дк309 button:not(:disabled):active{transform:translateY(2px)}#lvis .дк.дк309 button:disabled{opacity:.65;cursor:default}
#lvis .дк.дк309 .aur-feedback,#lvis .дк.дк309 .готово,#lvis .дк.дк309 .разбор,#lvis .дк.дк309 .дт-совет{padding:14px;border:1px solid #bca67c;border-left:5px solid #c0a064;border-radius:15px;background:#fbf3dc;color:#304b58;font:18px/1.45 AurHand309,sans-serif;min-height:54px}
#lvis .дк.дк309 .aur-feedback.success{border-left-color:#6c9775;background:#e6efda}#lvis .дк.дк309 button.aur-help{justify-self:center;min-height:48px;font-size:16px}
#lvis .дк.дк309 .число .окно{height:auto;min-height:0;padding:0!important;min-width:0;background:none;box-shadow:none;border:0;font:inherit;color:inherit;white-space:normal}#lvis .дк.дк309 .число.длин.длин .окно{font-size:18px}
#lvis .дк.дк309 .число.верно:after,#lvis .дк.дк309 .число.мимо:after{right:1px;top:1px;width:18px;height:18px;font-size:12px;line-height:18px}
#lvis .дк.дк309 .дт-лента{background:#425e4b;border:1px solid #b2a16c;border-radius:16px;padding:12px;color:#ffedbd;flex-wrap:wrap;gap:8px;font-size:15px}#lvis .дк.дк309 .дт-лента .зв{display:grid;grid-template-columns:repeat(6,15px);gap:3px}
#lvis .дк.дк309:has(.aur-practice)>.числа,#lvis .дк.дк309:has(.aur-practice)>.готово,#lvis .дк.дк309:has(.aur-practice)>.дт-подсказки,#lvis .дк.дк309:has(.aur-practice)>.дт-совет,#lvis .дк.дк309:has(.aur-finale)>.готово{display:none}
#lvis .дк.дк309 .aur-finale{display:grid;gap:15px;color:#f7e7bd;text-align:center}#lvis .дк.дк309 .aur-finale h3{font:28px AurTitle309;margin:0}#lvis .дк.дк309 .aur-finale>.слушать{justify-self:center;grid-column:auto;grid-row:auto}#lvis .дк.дк309 .aur-finale p,#lvis .дк.дк309 .aur-summary{font:19px/1.45 AurHand309}#lvis .дк.дк309 .aur-summary{display:grid;gap:8px;text-align:left;background:#264b5b;padding:18px;border-radius:16px}#lvis .дк.дк309 .дт-итог{color:#f7e7bd}
#lvis .дк.дк309 .aur-feast{display:flex;flex-wrap:wrap;justify-content:center;padding:10px;background:#fff3d5df;border-radius:30px}#lvis .дк.дк309 .aur-quiz-art{height:160px;text-align:center}#lvis .дк.дк309 .aur-quiz-art img{height:100%;max-width:100%;object-fit:contain}
#lvis .дк.дк309 .aur-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
@media(prefers-reduced-motion:reduce){#lvis .дк.дк309 *{animation:none!important;transition:none!important}}
#screen:has(.дк309)>.игра-плашка{max-width:650px;margin:0 auto 16px}#screen:has(.дк309) .игра-плашка .ип-кадр,#screen:has(.дк309) .игра-плашка .ип-мини{display:none}
#screen:has(.дк309)>.btnrow{max-width:650px;margin-left:auto;margin-right:auto}
#lvis .дк.дк309 .aur-cast{margin:0;height:clamp(180px,40vw,280px);border:2px solid #ba9b68;background-position:center 75%;padding:15px 24px 9px;gap:36px}
#lvis .дк.дк309 .aur-cast>div{width:39%;max-width:170px}#lvis .дк.дк309 .aur-cast img{object-position:center bottom;width:100%}
#lvis .дк.дк309 .aur-work{display:grid;gap:14px;background:linear-gradient(140deg,#f7f4e7,#e3f1ed);border:2px solid #b79b68;border-radius:20px;padding:18px 14px;color:#274b57;box-shadow:0 5px 0 #172e3c}
#lvis .дк.дк309 .aur-rules{font-size:15px;line-height:1.4;text-align:center;background:#d8e9e5;border-radius:10px;padding:8px}
#lvis .дк.дк309 .aur-turn{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;font-size:20px;color:#365b70}#lvis .дк.дк309 .aur-turn strong{font:18px AurHand309;background:#fff5d6;border-radius:10px;padding:8px}#lvis .дк.дк309 .aur-turn.won{color:#367a6c}
#lvis .дк.дк309 .aur-crystals{display:flex;justify-content:center;flex-wrap:wrap;gap:7px;min-height:66px;padding:10px 0;background:radial-gradient(ellipse,#c5e3e1,transparent 72%);border-bottom:2px solid #c8bc98}
#lvis .дк.дк309 svg{width:40px;height:50px;flex-shrink:0;filter:drop-shadow(0 3px 2px #36657233)}
#lvis .дк.дк309 .aur-actions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#lvis .дк.дк309 .aur-options{display:grid;gap:10px}
#lvis .дк.дк309 button.aur-button{border-image-slice:25% 18%;font-size:18px;min-height:56px;line-height:1.35;padding:7px 4px}
#lvis .дк.дк309 button.aur-button,#lvis .дк.дк309 .число,#screen:has(.дк309)>.btnrow>button,#screen:has(.дк309)>button{background-color:#e1efe5;background-clip:padding-box;border-radius:16px}
#lvis .дк.дк309 button.chosen{outline:3px solid #438e9c;outline-offset:1px}#lvis .дк.дк309 button.primary{justify-self:stretch;font-size:19px}
#lvis .дк.дк309 .aur-log{margin:0;padding:0;list-style:none;display:grid;gap:5px;font-size:15px;max-height:160px;overflow:auto;border-radius:10px}#lvis .дк.дк309 .aur-log:empty{display:none}#lvis .дк.дк309 .aur-log li{display:flex;justify-content:space-between;gap:10px;padding:6px 10px;background:#f8f4e6;border-left:3px solid #6ba8b7}#lvis .дк.дк309 .aur-log li:nth-child(even){border-color:#b497c2;background:#eee6ed}
#lvis .дк.дк309 .aur-note{font:17px/1.4 AurHand309;text-align:center}#lvis .дк.дк309 .aur-equation{font:30px/1.4 AurHand309;text-align:center;color:#79547f}
#lvis .дк.дк309 .aur-pair{display:grid;grid-template-columns:1fr 16px 1fr 16px 24px;align-items:center;gap:4px;font-size:23px;text-align:center}#lvis .дк.дк309 .aur-pair>div{display:grid;gap:7px;min-width:0}#lvis .дк.дк309 .aur-pair>div>span{font-size:18px}#lvis .дк.дк309 .aur-pair>div>div{display:flex;justify-content:center;align-items:center;min-height:60px;background:#d5e8e5;border-radius:12px}#lvis .дк.дк309 .aur-pair svg{width:30px;height:45px}
#lvis .дк.дк309 .aur-gem-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}#lvis .дк.дк309 button.gem-cell{flex-direction:column;gap:0;min-height:96px;border:2px solid #b8a675;background:#f5faf0;border-radius:15px;filter:none;padding:8px}#lvis .дк.дк309 button.used{opacity:.35}#lvis .дк.дк309 button.gem-cell span{font-size:14px}
#lvis .дк.дк309 .aur-bundles{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}#lvis .дк.дк309 .aur-bundles>span{display:flex;align-items:center;border:1px solid #ba9d6a;border-radius:12px;padding:4px;background:#e6ebd9}#lvis .дк.дк309 .aur-bundles svg{width:20px;height:30px}
#lvis .дк.дк309 .aur-number-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}#lvis .дк.дк309 .aur-number-grid button{flex-direction:column;font-size:28px}#lvis .дк.дк309 .aur-number-grid small{font-size:14px}
#lvis .дк.дк309 .aur-mirror{display:grid;grid-template-columns:repeat(var(--size),minmax(0,1fr));gap:8px;padding:8px;background:#274b60;border:3px solid #ad945f;border-radius:16px}
#lvis .дк.дк309 button.light-cell{height:64px;min-height:64px;border:1px solid #7296a0;border-radius:10px;background:#d8e8dd;color:#314f5b;filter:none;padding:3px;flex-direction:column;gap:0}#lvis .дк.дк309 .light-cell>span:first-child{font:27px/1 AurHand309}#lvis .дк.дк309 .light-cell small{font:12px/1.2 AurHand309}#lvis .дк.дк309 button.light-cell:disabled{opacity:1}#lvis .дк.дк309 .light-cell.finn{background:#d9b6e5;color:#57366a}#lvis .дк.дк309 .light-cell.you{background:#9ce5d4;color:#265e69}#lvis .дк.дк309 .light-cell.pending{box-shadow:inset 0 0 0 3px #a579ba}
#lvis .дк.дк309 .aur-glow,#lvis .дк.дк309 .aur-beacon{font-size:55px;line-height:1;color:#cc9c45;text-shadow:0 0 20px #ffdb71;animation:aur-shine 1.5s ease-in-out infinite alternate}
#lvis .дк.дк309 .aur-feedback{margin:0}#lvis .дк.дк309 .aur-quiz-art img{height:170px;width:100%;object-fit:contain}
@keyframes aur-shine{to{text-shadow:0 0 35px #ffdb71;color:#e9bb5c}}
@media(max-width:360px){#lvis .дк.дк309 .реплика{border-width:16px;border-image-width:16px;padding:2px}#lvis .дк.дк309 .реплика p{font-size:17px}#lvis .дк.дк309 .aur-work{padding:14px 10px}#lvis .дк.дк309 .aur-heading{font-size:25px}#lvis .дк.дк309 .aur-mirror{gap:5px;padding:6px}#lvis .дк.дк309 button.light-cell{height:55px;min-height:55px}#lvis .дк.дк309 button.aur-button{border-left-width:8px;border-right-width:8px}#lvis .дк.дк309 .aur-pair svg{width:27px}}
`;document.head.appendChild(css);
})();
