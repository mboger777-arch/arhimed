'use strict';
(() => {
  const bridge = parent !== window ? parent.OREH300 : null;
  const $ = id => document.getElementById(id);
  const labels = ['Знакомство','Собери 10','Остаток','Твой ход','Без подсказки','Секрет','Тренажёры'];
  const fresh = () => ({step:0,unlocked:0,states:{},completed:false});
  let state = fresh();
  const stepState = () => state.states[state.step] ||= {moved:0,used:[],answer:false,miss:[],hint:false,split:false};
  let moving = false;
  let animationVersion = 0;
  const lesson = [
    {label:'НАША ИСТОРИЯ',title:'Поможем Рыжику?',copy:'В лотке <strong>8 орехов</strong>, а в корзинке ещё <strong>5</strong>. Как быстро узнать, сколько их вместе?',speech:'Помоги нам сосчитать все орешки для посылки!',mentor:'Удобнее считать, когда сначала собираешь полный десяток.',next:'Начать приключение →'},
    {label:'СОБИРАЕМ ДЕСЯТОК',title:'Два места ждут орешки',copy:'Нажимай на Рыжика. Он подаст один орешек за раз. Заполни пустые места, чтобы получилось <strong>10</strong>.',speech:'Нажимай на Рыжика, пока в лотке не станет 10 орешков.',mentor:'В лотке два ряда по пять мест. Полный лоток — это 10.',next:'Посчитать остаток →'},
    {label:'НАШЕ ОТКРЫТИЕ',title:'Десяток и ещё…',copy:'В лотке теперь <strong>10</strong>, а в корзинке осталось <strong>3</strong>. Сколько орехов всего?',speech:'Два орешка дополнили десяток. А ещё три остались в корзинке!',mentor:'Мы ничего не добавляли и не убирали. Только переложили.',next:'Попробовать самому →'},
    {label:'ТЕПЕРЬ ТВОЯ ОЧЕРЕДЬ',title:'Новая посылка: 7 + 6',copy:'Сначала дополни лоток до десяти. Нажимай на Рыжика: одно нажатие — один орешек.',speech:'А эту посылку соберёшь сам? Здесь 7 орешков, в корзинке — 6.',mentor:'Сколько пустых мест в лотке? Столько орехов и переложи.',next:'Я готов к следующему →'},
    {label:'ЧУТЬ БОЛЬШЕ САМОСТОЯТЕЛЬНОСТИ',title:'Справишься в уме?',copy:'Тоша принёс <strong>9 орехов и ещё 4</strong>. Сколько получится? Вспомни секрет десятка.',speech:'Теперь попробуем без перекладывания. Если трудно — Тоша поможет!',mentor:'До десяти девятке не хватает всего одного.',next:'Открыть главный секрет →'},
    {label:'ГЛАВНЫЙ СЕКРЕТ',title:'Как разделить семёрку?',copy:'Нужно решить <strong>8 + 7</strong>. Как разделить 7, чтобы первой частью дополнить 8 до 10?',speech:'Последняя посылка! Выбери удобные части — и всё получится.',mentor:'Первая часть заполняет пустые места. Вторую прибавляем к десяти.',next:'Перейти к тренажёрам →'},
    {label:'ПРИКЛЮЧЕНИЕ ПРОЙДЕНО',title:'Ты подружился с десятком!',copy:'Теперь ты умеешь складывать через десяток. Рыжик отправит посылки друзьям!',speech:'Спасибо! Теперь большие примеры мне не страшны. Ты настоящий помощник!',mentor:'Объясни кому-нибудь свой секрет: сначала до 10, потом остаток.',next:'Пройти ещё раз ↻'}
  ];
  function save(){if(bridge) bridge.save(state);}
  try{const saved=bridge?.load();if(saved&&Number.isInteger(saved.step)&&saved.step>=0&&saved.step<7&&saved.states&&typeof saved.states==='object'&&Number.isInteger(saved.unlocked)&&saved.unlocked>=saved.step&&saved.unlocked<7)state=saved;}catch{}
  function nut(cls=''){return `<span class="nut ${cls}" aria-hidden="true"></span>`;}
  function frame(count,added=0){return `<div class="ten-frame" aria-label="В лотке ${count} орехов из 10">${Array.from({length:10},(_,i)=>`<div class="slot ${i>=count?'empty':''} ${i>=count-added&&i<count?'new':''}">${i<count?nut(i>=count-added?'new-nut':''):''}</div>`).join('')}</div>`;}
  function actorCard(pose,text,action='hint') {
    return `<button class="actor-card" data-actor="${action}" aria-label="${text}"><img src="assets/${pose}.webp" alt=""><span>${text}</span></button>`;
  }
  function tray(a,b,s,interactive=false){
    const n=a+s.moved,full=n===10,remaining=b-s.moved,k=Array.from({length:b},(_,i)=>i).find(i=>!s.used.includes(i));
    const board=`<div class="tableau tray-tableau"><div class="tableau-header"><h3>Лоток на 10</h3><span class="tiny-pill">${full?'Собран!':`${n} из 10`}</span></div>${frame(n,s.moved)}${full?'<div class="pack-label">✓ Один целый десяток <b>10</b></div>':''}</div>`;
    if(interactive&&!full) return board+`<div class="handoff-scene"><div class="reserve"><b>В корзинке: ${remaining-1}</b><div class="reserve-basket">${Array.from({length:remaining-1},()=>nut()).join('')}</div></div><button class="giving-hero" data-nut="${k}" aria-label="Рыжик: переложить один орешек в лоток"><img src="assets/ryzhik-give.webp" alt="Рыжик протягивает один орешек"><span class="paw-origin" aria-hidden="true"></span><span>В лапке: 1</span></button></div><p class="reserve-total">Осталось: ${remaining-1} + 1 = ${remaining}</p>`;
    if([1,3].includes(state.step)&&full) return board+`<div class="arrival-scene"><img src="assets/ryzhik-happy.webp" alt="Рыжик радуется полному десятку"><div><b>Осталось ${remaining}</b><div class="remaining-nuts">${Array.from({length:remaining},()=>nut()).join('')}</div><span>10 и ещё ${remaining}</span></div></div>`;
    return board+`<div class="duet-tableau"><div class="basket-caption">В корзинке: <b>${remaining} ${word(remaining)}</b></div><div class="duet-group"><img class="duet-art" src="assets/friends-with-basket.webp" alt="Рыжик и Тоша стоят рядом и вместе держат корзинку"><div class="held-nuts" data-count="${remaining}" aria-label="В корзинке ${remaining} ${word(remaining)}">${Array.from({length:remaining},()=>nut()).join('')}</div></div></div>`;
  }
  function reactHero(success=false){
    const img=document.querySelector('.dialogue>img');img.src=`assets/${success?'ryzhik-happy':'tosha-point'}.webp`;
    document.querySelector('.speaker').textContent=success?'РЫЖИК РАДУЕТСЯ':'ТОША ПОМОГАЕТ';
    document.querySelectorAll('.actor-card img').forEach(e=>e.src=`assets/${success?'ryzhik-happy':state.step===5?'ryzhik-search':'tosha-point'}.webp`);
  }
  function word(n){return n===1?'орех':n>1&&n<5?'ореха':'орехов';}
  function equation(a,b,result=false){return `<div class="equation"><span>${a}</span><span class="sign">+</span><span class="part">${b}</span><span class="sign">=</span>${result!==false?`<span class="result">${result}</span>`:'<span class="answer">?</span>'}</div>`;}
  function answers(values,type='total'){return `<div class="choices ${type==='split'?'split':''}" role="group" aria-label="${type==='split'?'Выбери две части числа':'Выбери общее количество'}">${values.map(n=>`<button type="button" class="choice" data-${type}="${n}">${n}</button>`).join('')}</div>`;}
  function revealFeedback(element) {
    if (!element?.textContent.trim()) return;
    requestAnimationFrame(() => {
      if (!element.isConnected) return;
      const navigation = document.querySelector('.btnrow');
      const safeBottom = innerHeight - (navigation?.getBoundingClientRect().height || 0) - 20;
      const box = element.getBoundingClientRect();
      if (box.top < 16 || box.bottom > safeBottom) element.scrollIntoView({block:'center',behavior:'instant'});
    });
  }
  function setFeedback(text,success=false){$('feedback').textContent=text;$('feedback').className='feedback'+(success?' success':'');revealFeedback($('feedback'));}
  // Trainer state stays in training.js; reveal the feedback after its real UI handlers.
  document.addEventListener('click', event => {
    if (event.target.closest?.('.trainer-hint,.trainer-friend,[data-value]')) revealFeedback(document.querySelector('.trainer-feedback'));
  });
  document.addEventListener('submit', event => {
    if (event.target.matches?.('.trainer-form')) revealFeedback(document.querySelector('.trainer-feedback'));
  });

  function ready(){const s=stepState();return state.step===0||state.step===6||state.step===1&&s.moved===2||s.answer;}
  function render(){
    cancelSpeech();
    animationVersion++;moving=false;document.querySelectorAll('.celebrate').forEach(e=>e.remove());
    const i=state.step,s=stepState(),d=lesson[i];
    const speaker=i===4||s.hint?'tosha-point':i===5?'ryzhik-search':s.answer?'ryzhik-happy':'ryzhik-squirrel';
    document.querySelector('.dialogue>img').src=`assets/${speaker}.webp`;document.querySelector('.speaker').textContent=speaker.startsWith('tosha')?'ТОША':'РЫЖИК';
    $('footer-note').textContent='Сначала соберём десяток. Затем прибавим остаток.';
    document.querySelector('.scene').dataset.step=i;
    document.querySelector('.adventure').dataset.stage=['meeting','fill','remainder','delivery','mental','split','training'][i];
    document.querySelector('.scene').classList.toggle('training-scene',i===6);
    $('next').hidden=i===6;
    $('mentor').hidden=!s.hint;
    $('chapters').innerHTML=labels.map((name,j)=>`<button class="chapter ${j===i?'current':''} ${j<i?'complete':''}" ${j>state.unlocked?'disabled':''} data-step="${j}" ${j===i?'aria-current="step"':''} aria-label="Этап ${j+1}: ${name}"><span class="step-dot">${j<i?'✓':j+1}</span><span class="step-name">${name}</span></button>`).join('');
    $('speech').textContent=d.speech;$('step-label').textContent=d.label;$('step-count').textContent=`0${i+1} / 07`;$('guide-title').textContent=d.title;$('guide-copy').innerHTML=d.copy;$('mentor-copy').textContent=d.mentor;
    $('next').textContent=d.next;$('next').disabled=!ready();$('back').disabled=i===0;$('back').textContent=i===6?'К уроку':'← Назад';$('hint').hidden=i===0||i===6||s.answer;$('hint').setAttribute('aria-expanded',String(s.hint));$('hint').setAttribute('aria-controls','mentor');
    $('interaction').innerHTML='';setFeedback('');
    let game='';
    if(i===0){game=`<div class="math-card">${equation(8,5)}<p class="math-caption">Одна корзинка. Один маленький секрет.</p></div>${tray(8,5,{moved:0,used:[]})}`;$('interaction').innerHTML='<div class="quest-list"><div class="quest-item"><span class="quest-icon">10</span>Соберём полный десяток</div><div class="quest-item"><span class="quest-icon">+</span>Прибавим то, что осталось</div><div class="quest-item"><span class="quest-icon">✓</span>Научимся решать новые примеры</div></div>';$('footer-note').textContent='Сначала соберём десяток. Остальное — легко.';}
    if(i===1){game=tray(8,5,s,true)+`<div class="math-card">${s.moved===2?equation(8,2,10):'<div class="equation"><span>8</span><span class="sign">+</span><span class="answer">?</span><span class="sign">=</span><span>10</span></div>'}<p class="math-caption">${s.moved===2?'Готово! Десяток собран.':'Собери десяток из восьми и ещё нескольких орехов.'}</p></div>`;if(s.moved===2){$('guide-title').textContent='Десяток готов!';$('guide-copy').textContent='В лотке 10 орешков. В корзинке остались 3. Теперь узнаем, сколько их вместе.';$('hint').hidden=true;setFeedback('Отлично! Переложили 2 ореха: 8 + 2 = 10.',true);$('speech').textContent='Лоток полный! А что осталось в корзинке?';}$('interaction').innerHTML=`<div class="map-steps"><span>8</span><i>→</i><span>${s.moved===2?'10':'?'}</span></div>`;}
    if(i===2){game=tray(8,5,{moved:2,used:[0,1]})+`<div class="math-card">${equation(10,3,s.answer?13:false)}</div>`;$('interaction').innerHTML=s.answer?'<div class="finished-equations">8 + 5 = 10 + 3 = 13</div>':answers([12,13,14]);if(s.answer)setFeedback('Да, 13! Пятёрку разделили на 2 и 3.',true);}
    if(i===3){const full=s.moved===3;game=tray(7,6,s,!full)+`<div class="math-card">${equation(full?10:7,full?3:6,s.answer?13:false)}<p class="math-caption">${full?'6 разделили на 3 и 3.':'Сначала собери полный десяток.'}</p></div>`;if(full){$('guide-title').textContent='Сколько получилось?';$('guide-copy').innerHTML='В лотке <strong>10</strong>, в корзинке ещё <strong>3</strong>. Выбери общее количество.';$('interaction').innerHTML=s.answer?'<div class="finished-equations">7 + 6 = 10 + 3 = 13</div>':answers([11,13,14]);}if(s.answer)setFeedback('Верно! До десятка не хватало 3. Ещё 3 остались.',true);}
    if(i===4){game=`<div class="tableau"><div class="tableau-header"><h3>Пример Тоши</h3><span class="tiny-pill">Твой ход</span></div><div style="padding:20px 0">${equation(9,4,s.answer?13:false)}</div>${s.hint||s.answer?`${frame(10,1)}<div class="split-visual">4 = <span class="to-ten"><b>1</b><small>до 10</small></span> + <span>3</span></div>`:'<div class="map-steps"><span>9</span><i>→</i><span>10</span><i>→</i><span>?</span></div>'}</div><div class="math-card"><p class="gate-note">${s.hint||s.answer?'9 + 1 = 10. Осталось прибавить 3.':'Вспомни: сначала до десяти,<br>потом прибавь остаток.'}</p></div>`;$('interaction').innerHTML=s.answer?'<div class="finished-equations">9 + 4 = 13</div>':'<form id="answer-form"><label for="answer-input" class="input-label">Сколько орехов всего?</label><div class="answer-entry"><input id="answer-input" inputmode="numeric" type="text" pattern="[0-9]*" maxlength="2" autocomplete="off" aria-label="Твой ответ"><button type="submit">Проверить</button></div></form>';if(s.answer)setFeedback('Получилось! 4 — это 1 и 3. Значит, 10 + 3 = 13.',true);}
    if(i===5){game=`<div class="tableau"><div class="tableau-header"><h3>Последний пример</h3><span class="tiny-pill">8 + 7</span></div>${frame(s.split?10:8,s.split?2:0)}<div class="split-visual">7 = ${s.split?'<span class="to-ten"><b>2</b><small>до 10</small></span> + <span>5</span>':'<span>?</span> + <span>?</span>'}</div></div><div class="math-card">${equation(s.split?10:8,s.split?5:7,s.answer?15:false)}<p class="math-caption">${s.split?'Первую часть уже положили в лоток.':'Первая часть дополнит 8 до 10.'}</p></div>`;if(!s.split){$('interaction').innerHTML=answers(['2 + 5','3 + 4','1 + 6'],'split');}else{$('guide-title').textContent='Десять и ещё пять';$('guide-copy').innerHTML='Семёрку разделили на <strong>2 и 5</strong>. Два ореха дополнили десяток. Сколько всего?';$('interaction').innerHTML=s.answer?'<div class="finished-equations">8 + 7 = 10 + 5 = 15</div>':answers([13,14,15]);}if(s.answer)setFeedback('Пятнадцать! Ты сам выбрал удобные части.',true);}
    if(i===6){
      $('step-label').textContent='ЗАКРЕПЛЯЕМ ОТКРЫТИЕ';
      $('speech').textContent='Теперь потренируемся! Три задания на каждой лесной станции — и посылки готовы к отправке.';
      $('guide-title').textContent='У каждого приёма — своя тренировка';
      $('guide-copy').textContent='Можно выбрать любую станцию. За каждое решённое задание получишь звёздочку.';
      $('footer-note').textContent='Не торопись. Ошибки помогают понять приём.';
      $('mentor').hidden=true;
      $('game-area').innerHTML='';
      $('mobile-instruction').textContent='Выбери тренажёр. На каждой станции — три задания.';
      state.training ||= {active:null,stations:[{index:0},{index:0},{index:0}]};
      window.LessonTraining.mount($('game-area'),state.training,{
        frame,save,stopAudio:cancelSpeech,playAudio:(key,button,onError)=>window.LESSON_VOICE.toggle(key,button,onError),award:(index,value,hinted)=>bridge?.award(index,value,hinted),
        complete:()=>{const first=!state.completed;state.completed=true;if(first)celebrate();save();$('guide-title').textContent='Все тренажёры пройдены!';$('guide-copy').textContent='Ты умеешь дополнять до десяти, делить число на удобные части и складывать в уме.';$('next').hidden=false;$('next').textContent='Готово! Дальше →';$('speech').textContent='Девять заданий позади! Теперь все посылки отправятся к друзьям.';}
      });
      bindGame();save();return;
    }
    if(i===4||i===5)game+=actorCard(s.answer?'ryzhik-happy':i===4?'tosha-point':'ryzhik-search',s.answer?'Ура! Ответ найден':i===4?'Тоша, покажи секрет десятка':'Рыжик, помоги разделить число',s.answer?'cheer':'hint');
    $('game-area').innerHTML=game;
    $('mobile-instruction').textContent=$('guide-copy').textContent;
    bindGame();save();
  }
  function bindGame(){
    document.querySelectorAll('[data-actor]').forEach(b=>b.onclick=()=>{if(b.dataset.actor==='hint')$('hint').click();else celebrate();});
    document.querySelectorAll('#chapters [data-step]').forEach(b=>b.onclick=()=>go(Number(b.dataset.step)));
    document.querySelectorAll('[data-nut]').forEach(b=>b.onclick=()=>transfer(Number(b.dataset.nut),b));
    document.querySelectorAll('[data-total]').forEach(b=>b.onclick=()=>answer(Number(b.dataset.total),b));
    document.querySelectorAll('[data-split]').forEach(b=>b.onclick=()=>split(b.dataset.split,b));
    const form=$('answer-form');if(form)form.onsubmit=e=>{e.preventDefault();cancelSpeech();const val=$('answer-input').value.trim();if(!/^\d{1,2}$/.test(val)){setFeedback('Введи число — сколько орехов получилось.');return;}answer(Number(val));};
  }
  function go(i){if(i<0||i>state.unlocked||i>6)return;cancelSpeech();state.step=i;render();}
  function transfer(k,button){
    if(moving)return;
    const s=stepState(),a=state.step===1?8:7,b=state.step===1?5:6;
    if(![1,3].includes(state.step)||s.moved>=10-a||s.used.includes(k)||k<0||k>=b)return;
    cancelSpeech();moving=true;
    const start=(button.querySelector('.paw-origin')||button).getBoundingClientRect(),target=document.querySelector('.slot.empty')?.getBoundingClientRect();
    s.used.push(k);s.moved++;save();
    const token=animationVersion;
    if(target&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      const flyer=document.createElement('div');flyer.className='flying-nut';flyer.innerHTML=nut();flyer.style.left=`${start.x+start.width/2-15}px`;flyer.style.top=`${start.y+start.height/2-18}px`;document.body.appendChild(flyer);button.disabled=true;button.classList.add('passing');const hand=button.querySelector('img');if(hand)hand.src='assets/ryzhik-happy.webp';
      const dx=target.x+target.width/2-(start.x+start.width/2),dy=target.y+target.height/2-(start.y+start.height/2);
      const anim=flyer.animate([{transform:'translate(0,0) rotate(0)'},{transform:`translate(${dx*.5}px,${dy*.5-55}px) rotate(20deg)`},{transform:`translate(${dx}px,${dy}px) rotate(-7deg)`}],{duration:480,easing:'ease-in-out'});
      anim.finished.then(()=>{flyer.remove();if(token===animationVersion)render();}).catch(()=>flyer.remove());
    }else render();
  }
  function answer(n,button){
    cancelSpeech();
    const s=stepState(),i=state.step;if(s.answer||![2,3,4,5].includes(i)||i===3&&s.moved!==3||i===5&&!s.split)return;
    const correct=i===5?15:13;
    if(n===correct){s.answer=true;render();celebrate();return;}
    if(button){button.classList.remove('wrong');void button.offsetWidth;button.classList.add('wrong');}
    s.miss.push(n);save();
    let message='Посмотри: сначала 10, затем прибавь оставшиеся орехи.';
    if(n===3||n===5)message='Это только орехи в корзинке. Прибавь к ним весь десяток в лотке.';
    else if(n===10)message=i===4?'К девяти добавили один и получили 10. Из четырёх осталось ещё 3. Их тоже нужно прибавить.':'Десяток собран! Но в корзинке ещё остались орехи — их тоже нужно посчитать.';
    else if(n===correct-1)message=`Начни после десяти: 11, 12, 13${correct===15?', 14, 15':''}. Сам десяток второй раз не считаем.`;
    else if(n===correct+1)message='Кажется, один орешек посчитали дважды. Начни с 10 и добавляй по одному.';
    else if(i===4)message='Девятке нужен 1 орех до десяти. Из четырёх останутся 3. Сколько будет 10 + 3?';
    reactHero(false);setFeedback(message);
  }
  function split(value,button){cancelSpeech();const s=stepState();if(state.step!==5||s.split)return;if(value==='2 + 5'){s.split=true;render();setFeedback('Да! Именно 2 не хватает восьмёрке до десяти.',true);}else{button.classList.add('wrong');setFeedback(value==='3 + 4'?'3 + 4 — тоже 7. Но 8 + 3 = 11. Чтобы получить ровно 10, нужна другая первая часть.':'1 + 6 — тоже 7. Но 8 + 1 = 9. До десятка пока не хватает ещё одного.');}}
  function celebrate(){reactHero(true);if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const wrap=document.createElement('div');wrap.className='celebrate';wrap.innerHTML=Array.from({length:20},(_,i)=>`<span class="confetti" style="left:${i*5}%;background:${['#e1b74e','#72995b','#f7df97','#cb8352'][i%4]};animation-delay:${(i%5)*.08}s;transform:rotate(${i*17}deg)"></span>`).join('');document.querySelector('.scene').appendChild(wrap);setTimeout(()=>wrap.remove(),2800);}
  function cancelSpeech(){window.LESSON_VOICE?.stop();$('sound').setAttribute('aria-pressed','false');}
  function reset(){cancelSpeech();state=fresh();render();}
  $('next').onclick=()=>{if(!ready())return;if(state.step===6){bridge?.exit(true);return;}cancelSpeech();state.step++;state.unlocked=Math.max(state.unlocked,state.step);render();if(innerWidth<960)document.querySelector('.adventure').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});};
  $('exit').onclick=()=>{cancelSpeech();bridge?.exit(false);};
  $('back').onclick=()=>go(state.step-1);$('restart').onclick=reset;
  $('hint').onclick=()=>{cancelSpeech();$('hint').setAttribute('aria-expanded','true');reactHero(false);const s=stepState();s.hint=true;$('mentor').hidden=false;if(state.step===4){render();setFeedback('Возьми из четырёх один: 9 + 1 = 10. Сколько осталось прибавить?');}else{setFeedback(lesson[state.step].mentor);}save();};
  $('sound').onclick=()=>{
    const s=stepState(),i=state.step;
    let key=`frame-${i}`;
    if(i===6&&state.completed)key='complete';
    else if(s.answer)key+='-success';
    else if(i===1&&s.moved===2||i===3&&s.moved===3)key+='-full';
    else if(i===5&&s.split)key+='-split';
    else if(s.hint)key+='-hint';
    window.LESSON_VOICE.toggle(key,$('sound'),setFeedback);
  };
  window.addEventListener('pagehide',cancelSpeech);
  if(!bridge){location.replace('../../index.html#lesson-300');return;}
  render();
})();
