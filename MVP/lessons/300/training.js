'use strict';
window.LessonTraining={mount(root,state,api){
 const stations=[
  {title:'Собери десяток',subtitle:'Найди недостающую часть',icon:'10',items:[[8,2],[6,4],[9,1]]},
  {title:'Раздели орешки',subtitle:'Найди удобные части числа',icon:'↗',items:[[7,5],[8,6],[9,7]]},
  {title:'Считай сам',subtitle:'Примеры без перекладывания',icon:'+',items:[[6,5],[7,8],[9,6]]}
 ];
 const total=()=>state.stations.reduce((sum,s)=>sum+s.index,0);
 function feedback(text,ok=false){const e=root.querySelector('.trainer-feedback');e.textContent=text;e.className='trainer-feedback'+(ok?' correct':'');}
 function render(){
  const done=total();
  if(done===9){root.innerHTML=`<div class="training-complete"><div class="reward-art"><img src="assets/parcel-ready.webp" alt="Готовая посылка"><img src="assets/medal-ten.webp" alt="Медаль Друг десятка"></div><div class="drawn-sheet"><span class="trainer-eyebrow">ВСЕ ТРИ СТАНЦИИ ПРОЙДЕНЫ</span><h3>Друг десятка</h3><p class="earned-stars">★ ★ ★ ★ ★ ★ ★ ★ ★</p><p>9 из 9 заданий решены</p><p>Посылки собраны. Рыжик и Тоша гордятся тобой!</p></div></div>`;api.complete();return;}
  if(state.active===null){root.innerHTML=`<div class="trainer-hub"><div class="trainer-heading"><span class="trainer-eyebrow">ЛЕСНЫЕ ТРЕНАЖЁРЫ</span><h3>Три станции — одно открытие</h3><p>Твой результат: <strong>${done} / 9 ★</strong></p></div><div class="station-list">${stations.map((t,i)=>`<button class="station-button" data-station="${i}" ${state.stations[i].index===3?'disabled':''}><span class="station-icon">${state.stations[i].index===3?'✓':t.icon}</span><span><b>${t.title}</b><small>${t.subtitle}</small></span><span class="station-score">${state.stations[i].index}/3 ★</span></button>`).join('')}</div><p class="trainer-footnote">Выбери станцию. Можно ошибаться и пробовать снова.</p></div>`;root.querySelectorAll('[data-station]').forEach(b=>b.onclick=()=>{state.active=Number(b.dataset.station);render();api.save();});return;}
  const id=state.active,progress=state.stations[id],t=stations[id],q=t.items[progress.index];
  if(!q){state.active=null;render();return;}
  const [a,b]=q;const need=10-a,remain=b-need;
  let task,body;
  if(id===0){task='Сколько орешков не хватает до 10?';body=`${api.frame(a)}<div class="trainer-equation">${a} + <span>?</span> = 10</div><div class="trainer-options">${[1,2,3,4].map(n=>`<button class="choice" data-value="${n}">${n}</button>`).join('')}</div>`;}
  if(id===1){task=`Решаем ${a} + ${b}. Как разделить ${b}, чтобы первая часть дополнила ${a} до 10?`;let parts=[need,need===1?2:1,need===2?3:2];parts=[...new Set(parts)];if(parts.length<3)parts.push(4);parts.sort((x,y)=>x-y);body=`<div class="trainer-equation">${b} = <span>?</span> + <span>?</span></div><div class="split-map"><span>${a}</span><i>+ первая часть →</i><strong>10</strong><i>+ остаток</i></div><div class="trainer-options split">${parts.map(n=>`<button class="choice" data-value="${n}">${n} + ${b-n}</button>`).join('')}</div>`;}
  if(id===2){task='Сначала собери десяток, потом прибавь остаток.';body=`<div class="trainer-equation">${a} + ${b} = <span>?</span></div><form class="trainer-form"><label for="trainer-answer">Сколько получилось?</label><div class="answer-entry"><input id="trainer-answer" aria-label="Ответ в тренажёре" inputmode="numeric" maxlength="2" autocomplete="off"><button type="submit" class="btn">Проверить</button></div></form>`;}
  root.innerHTML=`<div class="trainer-task drawn-sheet"><div class="trainer-task-top"><button class="trainer-home" aria-label="К станциям">← Станции</button><span>${progress.index+1} / 3 · ${done} ★</span><button class="trainer-audio" aria-label="Послушать задание">♫</button></div><h3>${t.title}</h3><p class="trainer-question">${task}</p>${body}<div class="trainer-feedback" role="status" aria-live="polite"></div><button class="trainer-hint hint-button">✦ Подсказка</button><button class="trainer-continue btn" hidden>Следующее задание →</button></div>`;
  root.querySelector('.trainer-audio').onclick=()=>document.getElementById('sound').click();
  const next=root.querySelector('.trainer-continue');let solved=!!progress.solved;
  function answer(value){if(solved)return;const correct=id===0?b:id===1?need:a+b;
   if(value!==correct){feedback(id===0?`Посчитай пустые ячейки: в полном лотке два ряда по пять.`:id===1?`Первая часть должна дать ровно 10 вместе с ${a}. Попробуй другую пару.`:`Дополни ${a} до десяти. Потом прибавь оставшиеся орешки.`);return;}
   solved=true;progress.solved=true;api.award(id*3+progress.index,value,!!progress.hinted);api.save();showSolved();
  }
  function showSolved(){root.querySelector('.trainer-task-top > span').textContent=`${progress.index+1} / 3 · ${done+1} ★`;feedback(id===0?`Верно! ${a} + ${b} = 10.`:`Верно! ${a} + ${need} = 10, затем 10 + ${remain} = ${a+b}.`,true);
   root.querySelectorAll('[data-value], .trainer-form input, .trainer-form button').forEach(e=>e.disabled=true);root.querySelector('.trainer-hint').hidden=true;next.hidden=false;next.textContent=progress.index===2?'Станция пройдена →':'Следующее задание →';
  }
  if(solved)showSolved();
  root.querySelectorAll('[data-value]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.value)));
  const form=root.querySelector('form');if(form)form.onsubmit=e=>{e.preventDefault();const value=root.querySelector('input').value.trim();if(!/^\d{1,2}$/.test(value)){feedback('Впиши ответ числом.');return;}answer(Number(value));};
  root.querySelector('.trainer-home').onclick=()=>{if(solved){progress.index++;progress.solved=false;progress.hinted=false;}state.active=null;api.save();render();};
  root.querySelector('.trainer-hint').onclick=()=>{progress.hinted=true;api.save();feedback(id===0?`В лотке ${a} орешков. Посчитай пустые места до десяти.`:`До десяти не хватает ${need}. Раздели ${b} на ${need} и ${remain}.`);};
  next.onclick=()=>{if(!solved)return;progress.index++;progress.solved=false;progress.hinted=false;if(progress.index===3)state.active=null;api.save();render();};
 }
 render();
}};
