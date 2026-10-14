(function () {
  'use strict';
  const bridge = parent !== window ? parent.TRAIL257 : null;
  if (!bridge) { location.replace('../../index.html#lesson-257'); return; }
  const {frames, stations} = window.TRAIL257_CONTENT;
  const $ = id => document.getElementById(id);
  const fresh = () => ({step:0, unlocked:0, states:{}, completed:false,
    training:{active:null, stations:[{index:0, states:{}},{index:0, states:{}},{index:0, states:{}}]}});
  let state = bridge.load() || fresh();
  if (!Number.isInteger(state.step) || state.step < 0 || state.step > frames.length || !state.training) state = fresh();
  let feedback = '', good = false, lastPosition = null;
  const esc = t => String(t).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const save = () => bridge.save(state);
  const isTraining = () => state.step === frames.length;
  const progress = () => state.training.stations[state.training.active];
  function context() {
    if (isTraining()) {
      const station = state.training.active, p = progress();
      if (station == null || !p || p.index >= 4) return null;
      const frame = stations[station].tasks[p.index];
      return {frame, st:p.states[p.index] ||= {pos:frame.start, moves:0, solved:false, hinted:false}, station, index:p.index};
    }
    const frame = frames[state.step];
    return {frame, st:state.states[state.step] ||= {pos:frame.start, moves:0, solved:false, hinted:false}};
  }
  const earned = () => state.training.stations.reduce((n, p) => n + p.index + (p.states[p.index]?.solved ? 1 : 0), 0);
  function equation(f, s) {
    if (f.equation) return f.equation.replace('?', s.solved ? String(f.answer) : '?');
    if (f.mode === 'missing') return `${f.missing-1} · ${s.solved ? f.missing : '?'} · ${f.missing+1}`;
    if (f.mode === 'groups') return [0,3,6,9].filter(n => n <= s.pos).join(' → ');
    if (f.mode === 'explore') return `Сейчас на числе ${s.pos}`;
    const delta = f.goal-f.start, sign = delta < 0 ? '−' : '+';
    if (f.mode === 'distance') return `${f.start} + ${s.solved ? f.answer : '?'} = ${f.goal}`;
    return `${f.start} ${sign} ${Math.abs(delta)} = ${s.solved ? f.goal : '?'}`;
  }
  // Poses describe the current mathematical action; the shared lesson-256 art stays intact.
  const heroNames = {right:'Пых шагает вправо',left:'Пых шагает влево',jump:'Пых прыгает через три деления',think:'Пых размышляет',stay:'Пых остаётся на месте',happy:'Пых радуется'};
  function heroPose(f,s) {
    if(s.solved)return f.start===f.goal?'stay':'happy';
    if(f.start===f.goal)return 'stay';
    if(['missing','choice'].includes(f.mode)||(f.mode==='predict'&&!s.predicted)||(f.mode==='distance'&&s.pos===f.goal))return 'think';
    return (f.goal<s.pos || f.jump<0)?'left':'right';
  }
  function companion(f,s) {
    const search=f.mode==='missing'||(f.mode==='predict'&&!s.predicted);
    const delivery=f.mode==='free';
    const name=search?'Рыжик':'Тоша';
    const art=s.solved?(delivery?'tosha-parcel':'ryzhik-happy'):(search?'ryzhik-search':'tosha-point');
    const task=s.solved?'Получилось! Идём дальше.':search?'Помогу найти число.':delivery?'Жду письмо у флажка!':f.mode==='groups'?'Один прыжок — три деления.':f.start===f.goal?'Ноль: лапки остаются на месте.':f.goal<f.start?'Покажу, как идти влево.':'Покажу, как считать шаги.';
    return `<button class="friend-help" id="friend-help" ${s.solved?'disabled':''} aria-label="${s.solved?'Задание выполнено':`Подсказка героя: ${name}`}"><img src="../300/assets/${art}.webp" alt=""><span><b>${s.solved?(delivery?'ТОША':'РЫЖИК'):name.toUpperCase()}</b>${task}${s.solved?'':'<small>Нажми на героя — получишь подсказку</small>'}</span></button>`;
  }
  function line(f, s) {
    let min = f.min ?? Math.max(0, Math.min(f.start, f.goal)-1);
    if (f.mode === 'free') min = Math.max(0, Math.min(s.pos, Math.max(s.pos,f.goal)-5));
    if (f.mode === 'groups') min = Math.max(0, s.pos-3);
    if (f.mode === 'explore') min = s.pos<=5?0:Math.max(0,Math.min(15,s.pos-3));
    if (Math.max(f.start, f.goal)-min > 5 && !['explore','groups','free'].includes(f.mode)) min = Math.min(f.start, f.goal);
    const x = n => 44 + (n-min)*54;
    const visible = n => n >= min && n <= min+5;
    const hidden = f.mode === 'missing' && !s.solved ? f.missing : null;
    const animated = lastPosition !== null && visible(lastPosition) && !matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pose=heroPose(f,s);
    const actor=f.mode==='missing'?'Рыжик':f.mode==='choice'&&f.start!==f.goal?'Тоша':'Пых';
    const art=actor==='Рыжик'?`../300/assets/ryzhik-${s.solved?'happy':'search'}.webp`:actor==='Тоша'?`../300/assets/tosha-${s.solved?'parcel':'point'}.webp`:`assets/pykh-${pose}.webp`;
    const travel=lastPosition!==null && Math.abs(s.pos-lastPosition)>1?'jump':lastPosition>s.pos?'left':'right';
    const duration=travel==='jump'?'.62s':'.42s';
    // Alpha bounds keep the feet on y=155 in every independently drawn pose.
    const groundY={right:62.9,left:64.1,jump:68,think:67.1,stay:65.9,happy:63.5};
    const restingY=actor==='Рыжик'?(s.solved?61.16:62.12):actor==='Тоша'?(s.solved?61.4:62.6):groundY[pose];
    const showGoal = !['explore','missing'].includes(f.mode) && !(f.mode==='predict'&&!s.predicted) && !(f.mode==='choice'&&!/\?\s*=/.test(f.equation||''));
    const goalFlag = showGoal && f.goal !== f.start && visible(f.goal);
    const canMove=!s.solved&&!['choice','missing'].includes(f.mode)&&!(f.mode==='predict'&&!s.predicted)&&!(f.mode==='distance'&&s.pos===f.goal);
    const heroDelta=f.jump||(f.goal<s.pos?-1:1);
    const steps = Math.abs(s.pos-f.start);
    const arcs = [];
    if (['walk','distance','predict'].includes(f.mode)) {
      const sign = f.goal >= f.start ? 1 : -1;
      for (let n=0;n<steps;n++) {
        const a=f.start+n*sign,b=a+sign;
        if (visible(a)&&visible(b)) arcs.push(`<path marker-end="url(#step-arrow)" class="trail-arc" d="M${x(a)} 151 Q${(x(a)+x(b))/2} 106 ${x(b)} 151"/><circle cx="${(x(a)+x(b))/2}" cy="206" r="10" fill="#fff1d5"/><text x="${(x(a)+x(b))/2}" y="211" text-anchor="middle" fill="#49311a" font-size="14" font-weight="900">${n+1}</text>`);
      }
    }
    if(f.mode==='groups'&&s.pos>0){const a=x(s.pos-3),b=x(s.pos);arcs.push(`<path marker-end="url(#step-arrow)" class="trail-arc" d="M${a} 151 Q${(a+b)/2} 64 ${b} 151"/><rect x="${(a+b)/2-15}" y="194" width="30" height="22" rx="8" fill="#fff1d5"/><text x="${(a+b)/2}" y="211" text-anchor="middle" fill="#49311a" font-size="14" font-weight="900">+3</text>`);}
    return `<div class="forest-scene scene-${f.mode}" data-pose="${pose}"><span class="line-label">${f.mode==='missing'?'Найди соседа':`Старт: ${f.start}`}</span>${goalFlag?`<span class="line-label target">Флажок: ${f.goal}</span>`:''}
      <svg viewBox="0 0 360 220" role="img" aria-label="Числовой луч от ${min} до ${min+5}. ${actor==='Пых'?heroNames[pose]:actor+' помогает решить задачу'}. ${actor} на числе ${s.pos}.${goalFlag?` Флажок на ${f.goal}.`:''}">
        <defs><linearGradient id="stone" x2="0" y2="1"><stop stop-color="#fff0c9"/><stop offset=".5" stop-color="#dcba7c"/><stop offset="1" stop-color="#a67c45"/></linearGradient><marker id="step-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10" fill="none" stroke="#985d20" stroke-width="2"/></marker></defs>
        <path d="M2 175 H358 l-7 -6 m7 6 l-7 6" class="trail-arrow"/>
        ${Array.from({length:6},(_,i)=>{const n=min+i;return `<ellipse cx="${x(n)}" cy="188" rx="25" ry="7" fill="#4c402a30"/><rect class="stone ${n===s.pos?'current':''} ${showGoal&&n===f.goal?'goal':''}" x="${x(n)-24}" y="155" width="48" height="37" rx="13"/><text class="number" x="${x(n)}" y="182">${n===hidden?'?':n}</text>`;}).join('')}
        ${arcs.join('')}
        ${goalFlag?`<path d="M${x(f.goal)+19} 153 V92 l22 7 -22 9" fill="#719d58" stroke="#3f6340" stroke-width="2"/>`:''}
        <g transform="translate(${x(s.pos)} 0)">
          ${animated?`<animateTransform attributeName="transform" type="translate" from="${x(lastPosition)} 0" to="${x(s.pos)} 0" dur="${duration}" fill="freeze"/>`:''}
          <ellipse cx="0" cy="155" rx="21" ry="4" fill="#44381f42"/>
          <g>${animated?`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${travel==='jump'?-30:-10};0 0" keyTimes="0;.5;1" dur="${duration}"/>`:''}
            <image id="pykh-pose" data-character="${actor}" transform="scale(${actor==='Тоша'&&f.goal>f.start?-1:1} 1)" href="${art}" x="-48" y="${restingY}" width="96" height="96">${animated?`<animate attributeName="opacity" values="0;0;1" keyTimes="0;.99;1" dur="${duration}"/>`:''}</image>
            ${animated?`<image href="assets/pykh-${travel}.webp" x="-48" y="${groundY[travel]}" width="96" height="96" opacity="0"><animate attributeName="opacity" values="1;1;0" keyTimes="0;.99;1" dur="${duration}"/></image>`:''}
          </g>
          ${f.mode==='free'&&!s.solved?'<g aria-label="Письмо"><rect x="13" y="117" width="23" height="16" rx="2" fill="#fff1ca" stroke="#8c6134"/><path d="m13 117 11 9 12-9" fill="none" stroke="#8c6134"/></g>':''}
        </g>
      </svg>${!s.solved?`<button class="hero-touch" style="left:${x(s.pos)/360*100}%" ${canMove?`data-move="${heroDelta}"`:'data-ask-hero'} aria-label="${canMove?`Пых: ${heroDelta===3?'прыгнуть на три':heroDelta<0?'шаг влево':'шаг вправо'}`:`${actor}: помоги решить`}"></button>`:''}${arcs.length?'':`<span class="trail-tail">дальше →</span>`}</div>`;
  }
  function say(text, success=false) { const c=context();if(c&&!c.st.solved&&c.frame.start!==c.frame.goal){const hero=$('pykh-pose');if(hero?.dataset.character==='Пых'){hero.setAttribute('href','assets/pykh-think.webp');hero.setAttribute('y','67.1');}} feedback=text;good=success;const e=$('feedback');if(e){e.textContent=text;e.classList.toggle('success',success);} }
  function win(c) {
    if (c.st.solved) return;
    c.st.solved=true;
    if (isTraining()) bridge.award(c.station*4+c.index, c.frame.answer, c.st.hinted);
    save();
  }
  function controls(f, s) {
    if (s.solved && f.mode !== 'explore') return '';
    const choosing = ['missing','choice'].includes(f.mode) || (f.mode==='predict'&&!s.predicted) || (f.mode==='distance'&&s.pos===f.goal);
    if (choosing) return `<div class="controls">${f.options.map(n=>`<button class="choice" data-answer="${n}">${n}</button>`).join('')}</div>`;
    if (f.mode === 'groups') return '<div class="controls"><button class="step-button primary" data-move="3">Прыгнуть на 3 →</button></div>';
    return `<div class="controls"><button class="step-button" data-move="-1" ${s.pos===0?'disabled':''}>← −1</button><button class="step-button primary" data-move="1" ${s.pos===20?'disabled':''}>+1 →</button>${f.mode==='free'?`<button class="step-button primary" data-move="3" ${s.pos>17?'disabled':''}>+3 →</button>`:''}</div>`;
  }
  function render() {
    const training=isTraining(), c=context(), done=earned();
    $('stage-label').textContent=training?'ЛЕСНЫЕ ТРЕНАЖЁРЫ':'ПРИКЛЮЧЕНИЕ ПЫХА';
    $('progress-label').textContent=training?`${done} из 12 ★`:`${state.step+1} из ${frames.length}`;
    $('progress-fill').style.width=`${training?100:(state.step+1)/frames.length*100}%`;
    $('back').hidden=false;$('back').disabled=state.step===0;$('back').textContent=training?'← К уроку':'← Назад';
    $('next').hidden=false;
    if (training && state.training.stations.every(p=>p.index===4)) {
      state.completed=true;save();
      $('lesson-body').innerHTML=`<div class="finish"><img src="assets/pykh-happy.webp" alt="Радостный Пых"><img src="../300/assets/parcel-ready.webp" alt="Доставленная посылка"><div class="paper"><p class="eyebrow">ВСЕ МАРШРУТЫ ПРОЙДЕНЫ</p><h2>Знаток тропинок!</h2><p class="stars" aria-label="12 звёзд">★ ★ ★ ★ ★ ★<br>★ ★ ★ ★ ★ ★</p><p><strong>12 из 12 заданий решены.</strong></p><p>Вправо — прибавляем.<br>Влево — вычитаем.<br>Считаем шаги между числами.</p></div></div>`;
      $('next').disabled=false;$('next').textContent='Готово! Дальше →';return;
    }
    if (training && !c) {
      state.training.active=null;
      $('lesson-body').innerHTML=`<div class="trainer-title"><p class="eyebrow">ПЫХ УЖЕ ДОМА. А ТЫ УМЕЕШЬ САМ?</p><h2>Три лесных испытания</h2><p>Решено ${done} из 12 заданий</p></div><div class="stations">${stations.map((station,i)=>`<button class="station" data-station="${i}" ${state.training.stations[i].index===4?'disabled':''}><span class="station-icon">${state.training.stations[i].index===4?'✓':station.icon}</span><span><strong>${station.title}</strong><small>${station.subtitle}</small></span><span class="score">${state.training.stations[i].index}/4</span></button>`).join('')}</div><p class="desktop-note">Выбери станцию. Ошибки можно исправлять.</p>`;
      $('next').hidden=true;bind();return;
    }
    const {frame:f,st:s}=c;
    let text=feedback || (s.solved ? (f.success || `Верно! ${equation(f,s)}.`) : '');
    let counter = '';
    if (['walk','distance','predict'].includes(f.mode)) counter=`Шагов: ${s.moves} из ${Math.abs(f.goal-f.start)}`;
    if (f.mode==='groups') counter=`Больших прыжков: ${s.moves} из 3`;
    if (f.mode==='explore') counter=`Шагов от нуля: ${s.pos}`;
    if (f.mode==='free') counter=s.pos===f.goal?'Пых дома!':`До флажка: ${Math.abs(f.goal-s.pos)} ${f.goal>s.pos?'вправо':'влево'}`;
    $('lesson-body').innerHTML=`${training?`<div class="trainer-top"><button id="stations-back">← Станции</button><span>${stations[c.station].title} · ${c.index+1}/4</span></div>`:''}<div class="instruction paper"><div><h2>${esc(f.title||stations[c.station].title)}</h2><p id="instruction-text">${esc(f.say||f.q)}</p></div><button class="speak" id="speak" aria-label="Послушать задание">♫</button></div>${line(f,s)}<div class="readout"><span class="equation">${esc(equation(f,s))}</span>${counter?`<span class="counter">${counter}</span>`:''}</div>${controls(f,s)}<p id="feedback" class="feedback ${good||s.solved?'success':''}" role="status" aria-live="polite">${esc(text)}</p>${companion(f,s)}`;
    $('next').disabled=!s.solved;
    $('next').textContent=training?(c.index===3?'Станция пройдена →':'Следующее задание →'):(state.step===frames.length-1?'К тренажёрам →':'Дальше →');
    lastPosition=null;bind();save();
  }
  function move(delta) {
    const c=context();if(!c)return;const {frame:f,st:s}=c;
    if (s.solved&&f.mode!=='explore')return;
    if (['choice','missing'].includes(f.mode)||(f.mode==='predict'&&!s.predicted))return;
    if (f.mode!=='free'&&f.mode!=='explore'&&delta!==f.jump) {
      say(f.jump<0?'Здесь вычитаем: выбери шаг влево, −1.':'Здесь прибавляем: выбери шаг вправо.');return;
    }
    if(f.mode==='distance'&&s.pos===f.goal)return;
    const n=s.pos+delta;if(n<0||n>20)return;
    lastPosition=s.pos;s.pos=n;s.moves++;feedback='';good=false;
    if(f.mode==='distance'&&n===f.goal)feedback='Дошли! Теперь выбери, сколько шагов сделали.';
    else if((f.mode==='explore'&&n>=f.goal)||n===f.goal)win(c);
    else if(f.mode==='free'&&n>f.goal)feedback=`Перепрыгнули дом. Нужно ${n-f.goal} ${n-f.goal===1?'шаг':'шага'} влево. Нажимай −1.`;
    render();
  }
  function answer(n) {
    const c=context();if(!c||c.st.solved)return;const {frame:f,st:s}=c;
    if (f.mode==='distance'&&s.pos!==f.goal)return;
    if(n!==f.answer){
      s.misses=(s.misses||0)+1;save();
      if(f.mode==='predict')say(n===6?'Ты тоже посчитал начальный камень. Первый шаг с 4 заканчивается на 5. Попробуй ещё.':'Это на один шаг дальше. Сделай мысленно три перехода: 4 → 5 → 6 → …');
      else if(f.goal===f.start)say(f.hint);
      else if(f.mode==='distance'||f.equation?.includes('?'))say(n===f.goal?'Это номер камня, где закончили. Нужен ответ: сколько шагов прошли.':'Считай переходы между числами. Начальный камень — ещё ноль шагов.');
      else if(f.mode==='missing')say(`${n} не подходит. Прочитай соседей: ${f.missing-1}, …, ${f.missing+1}. Нужное число на один больше левого.`);
      else say(f.hint);
      return;
    }
    feedback='';good=false;
    if(f.mode==='predict'){s.predicted=true;feedback='Верно, 7! Теперь проверь тремя шагами вправо.';good=true;}
    else win(c);
    render();
  }
  function bind() {
    document.querySelectorAll('[data-ask-hero]').forEach(b=>b.onclick=()=>$('friend-help')?.click());
    document.querySelectorAll('[data-move]').forEach(b=>b.onclick=()=>move(+b.dataset.move));
    document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(+b.dataset.answer));
    document.querySelectorAll('[data-station]').forEach(b=>b.onclick=()=>{silence();state.training.active=+b.dataset.station;feedback='';render();});
    if($('stations-back'))$('stations-back').onclick=()=>{silence();const c=context();if(c?.st.solved)progress().index++;state.training.active=null;feedback='';save();render();};
    if($('friend-help'))$('friend-help').onclick=()=>{const c=context();c.st.hinted=true;save();say(c.frame.hint);document.querySelector('.forest-scene').classList.add('show-route');};
    if($('speak'))$('speak').onclick=()=>{
      if(!('speechSynthesis'in window)){say('Задание написано на пергаменте. Озвучка недоступна в этом браузере.');return;}
      if(speechSynthesis.speaking){silence();return;}
      const c=context(),u=new SpeechSynthesisUtterance((c.frame.say||c.frame.q)+' '+(feedback||''));u.lang='ru-RU';u.rate=.85;speechSynthesis.speak(u);
    };
  }
  function silence(){if('speechSynthesis'in window)speechSynthesis.cancel();}
  $('next').onclick=()=>{
    if(state.completed&&isTraining()){silence();bridge.exit(true);return;}
    const c=context();if(!c?.st.solved)return;silence();feedback='';good=false;
    if(isTraining()){const p=progress();p.index++;if(p.index===4)state.training.active=null;}
    else{state.step++;state.unlocked=Math.max(state.unlocked,state.step);}
    save();render();window.scrollTo({top:0,behavior:'instant'});
  };
  $('back').onclick=()=>{if(state.step===0)return;silence();state.step--;feedback='';good=false;render();window.scrollTo({top:0,behavior:'instant'});};
  $('restart').onclick=()=>{silence();state=fresh();feedback='';good=false;render();};
  $('exit').onclick=()=>{silence();bridge.exit(false);};
  window.addEventListener('pagehide',silence);
  render();
})();
