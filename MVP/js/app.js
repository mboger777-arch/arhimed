/* АРХИМЕД MVP · app.js — экраны, навигация, онбординг */
'use strict';
const UI = { tab:'path', backTab:'path', islName:null };


/* ---------- свайп-переключение карточек (телефон) ---------- */
let _swipe={x:0,y:0,on:false,just:false,until:0};
function swipeCard(dir){
  try{
    if(typeof COMIC!=='undefined'&&COMIC.isOpen&&COMIC.isOpen()){
      if(dir>0) COMIC.next(); else COMIC.step(-1);
      return;
    }
    const lv=document.getElementById('lvis');
    if(lv&&lv.offsetParent!==null&&typeof LV!=='undefined'&&LV&&LV.id){
      const L=typeof lessonById==='function'?lessonById(LV.id):null;
      if(!L) return;
      if(LV.phase==='explain'){
        const n=(typeof lessonSteps==='function')?lessonSteps(L):L.explain.length;
        if(dir>0){ if(LV.step>=n-1){ if(typeof lvToCheck==='function') lvToCheck(); } else if(typeof lvStep==='function') lvStep(1); }
        else { if(LV.step>0&&typeof lvStep==='function') lvStep(-1); }
      }
    }
  }catch(e){}
}
function initSwipe(){
  document.addEventListener('touchstart',e=>{
    if(e.touches.length!==1){ _swipe.on=false; return; }
    /* ползунки и элементы с data-noswipe тянут пальцем — это не свайп карточки */
    if(e.target&&e.target.closest&&e.target.closest('input[type=range],[data-noswipe]')){ _swipe.on=false; return; }
    const t=e.touches[0]; _swipe.x=t.clientX; _swipe.y=t.clientY; _swipe.on=true; _swipe.just=false;
  },{passive:true});
  document.addEventListener('touchend',e=>{
    if(!_swipe.on) return; _swipe.on=false;
    const t=e.changedTouches[0];
    const dx=t.clientX-_swipe.x, dy=t.clientY-_swipe.y;
    if(Math.abs(dx)<48||Math.abs(dy)>Math.abs(dx)*1.4) return;
    _swipe.just=true; _swipe.until=Date.now()+400;
    try{ e.preventDefault(); }catch(_){}
    swipeCard(dx<0?1:-1);
  },{passive:false});
  // гасим случайный клик сразу после свайпа
  document.addEventListener('click',e=>{
    if(_swipe.just&&Date.now()<_swipe.until){ e.stopPropagation(); e.preventDefault(); _swipe.just=false; }
  },true);
}

function init(){
  initSwipe();
  document.querySelectorAll('#navBar button').forEach(b=>b.addEventListener('click',()=>go(b.dataset.tab)));
  window.addEventListener('beforeunload', save);
  setInterval(()=>{ DB.today.minutes=Math.min(600,Math.max(DB.today.minutes,Math.round((Date.now()-DB.sessionStart)/60000))); save(); hud(); }, 60000);
  if(!DB.profile){ showNav(false); go('onboard'); }
  else { showNav(true); go('path'); }
}
function showNav(on){ document.getElementById('navBar').style.display = on?'flex':'none'; }
function setTab(t){
  document.querySelectorAll('#navBar button').forEach(b=>b.classList.toggle('active', b.dataset.tab===t));
}
function go(target){
  if(target==='onboard'){ setTab(''); renderOnboard(); return; }
  if(target==='path'){ setTab('path'); renderPath(); return; }
  if(target==='library'){ setTab('library'); renderLibrary(); return; }
  if(target==='parent'){ setTab('parent');
    if(typeof parentOk==='function'&&parentOk()) renderDashboard();
    else if(typeof renderParentLock==='function') renderParentLock();
    else renderDashboard();
    return; }
  if(target==='book'){ setTab('book'); renderBookList(); return; }
  if(target==='legend'){ setTab(''); renderLegend(); return; }
  if(target==='tour'){ setTab('tour'); renderTourScreen(); return; }
  if(target==='olymp'){ setTab('tour'); renderOlympScreen(); return; }
  if(target.startsWith('lesson-')){ setTab(''); openLessonView(parseInt(target.slice(7))); return; }
  if(target.startsWith('island-')){ setTab(''); UI.islName=decodeURIComponent(target.slice(7)); renderIsland(UI.islName); return; }
  if(target.startsWith('task-')){ openTask(target.slice(5), UI.islName? 'island-'+UI.islName : 'path'); return; }
}
function hud(){
  const lg=document.getElementById('hLogout');
  if(lg) lg.classList.toggle('hidden', !(DB.profile));
  if(!DB.profile){ return; }
  const col=DB.profile.color||COLORS[0];
  const hEl=document.getElementById('hName');
  hEl.innerHTML=`<i style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${col};margin-right:6px;border:1px solid rgba(255,255,255,.35)"></i>${esc(DB.profile.name||'')}`;
  document.getElementById('hPoints').textContent=DB.points;
  document.getElementById('hStreak').textContent=DB.streak;
  document.getElementById('hRank').textContent=rankName();
  const lim=DB.profile.limitMin||45, now=DB.today.minutes||0;
  document.getElementById('hdrSub').textContent = now>=lim ? `⏰ сегодня лимит (${now}/${lim} мин)` : 'Острова Познания · MVP';
}
/* ---------- ОНБОРДИНГ ---------- */
let chosenCol=COLORS[0], chosenGender='boy';
/* класс заранее не выбран (владелец 21.10.2026): раньше стоял 7 — малыш нажимал «Далее», не заметив */
let chosenKlass=null, chosenLevel='novice';
function figSVG(g){
  return g==='girl' ? girlSVG(chosenCol) : boySVG(chosenCol);
}
function boySVG(c){
  const skin='#f4c9a3', skinD='#d9a87e', hair='#5a4030', hairD='#45301f';
  const sh=shade(c);
  return `<svg width="150" height="205" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
    <!-- тень под фигурой -->
    <ellipse cx="110" cy="288" rx="62" ry="9" fill="rgba(0,0,0,.3)"/>
    <!-- руки (рукава хитона) -->
    <path d="M40 190 C28 200 22 214 20 230 C34 236 50 236 62 230 C58 214 52 200 44 190 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M180 190 C192 200 198 214 200 230 C186 236 170 236 158 230 C162 214 168 200 176 190 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M20 230 C26 244 34 252 44 258 L176 258 C186 252 194 244 200 230 C180 244 160 250 110 250 C60 250 40 244 20 230 Z" fill="${skinD}" opacity=".5"/>
    <!-- хитон -->
    <path d="M48 300 C52 236 76 196 110 196 C144 196 168 236 172 300 Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="2.5"/>
    <path d="M88 205 C96 220 104 230 110 230 C116 230 124 220 132 205 L120 300 L100 300 Z" fill="${sh}" opacity=".85"/>
    <path d="M78 218 C86 240 96 250 110 250 C124 250 134 240 142 218" stroke="rgba(255,255,255,.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M84 200 L76 300" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>
    <path d="M136 200 L144 300" stroke="rgba(0,0,0,.15)" stroke-width="3" fill="none"/>
    <!-- ворот -->
    <path d="M84 200 C94 210 126 210 136 200 L140 212 C128 224 92 224 80 212 Z" fill="${sh}" opacity=".9"/>
    <!-- шея -->
    <rect x="97" y="172" width="26" height="28" rx="10" fill="${skin}"/>
    <!-- голова -->
    <circle cx="110" cy="132" r="52" fill="${skin}"/>
    <!-- уши -->
    <circle cx="56" cy="140" r="12" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="164" cy="140" r="12" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="56" cy="140" r="4" fill="${skinD}"/><circle cx="164" cy="140" r="4" fill="${skinD}"/>
    <!-- волосы мальчика: шапка -->
    <path d="M58 128 L58 118 C58 74 82 54 110 54 C138 54 162 74 162 118 L162 128 L58 128 Z" fill="${hair}"/>
    <path d="M56 128 C78 118 142 118 164 128 L164 118 C162 92 152 74 136 66 C150 74 158 92 160 116 L160 128 Z" fill="${hairD}"/>
    <!-- чёлка -->
    <path d="M64 128 L66 148 L80 126 L90 150 L100 124 L112 150 L122 126 L132 148 L142 124 L154 146 L156 128 Z" fill="${hair}"/>
    <!-- брови -->
    <path d="M78 124 Q92 116 104 122" stroke="${hairD}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M116 122 Q128 116 142 124" stroke="${hairD}" stroke-width="4" fill="none" stroke-linecap="round"/>
    <!-- глаза -->
    <ellipse cx="92" cy="140" rx="8.5" ry="10" fill="#fff"/>
    <ellipse cx="128" cy="140" rx="8.5" ry="10" fill="#fff"/>
    <circle cx="93" cy="142" r="5" fill="#3a2c1e"/>
    <circle cx="127" cy="142" r="5" fill="#3a2c1e"/>
    <circle cx="95" cy="140" r="1.6" fill="#fff"/><circle cx="129" cy="140" r="1.6" fill="#fff"/>
    <!-- нос -->
    <path d="M110 148 C108 154 110 158 113 157" stroke="${skinD}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- рот: лёгкая улыбка -->
    <path d="M100 170 Q110 179 120 170" stroke="#b0635a" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- румянец -->
    <ellipse cx="78" cy="162" rx="9" ry="5.5" fill="rgba(230,120,110,.32)"/>
    <ellipse cx="142" cy="162" rx="9" ry="5.5" fill="rgba(230,120,110,.32)"/>
  </svg>`;
}

/* ------------------ ДЕВОЧКА ------------------ */
function girlSVG(c){
  const skin='#f6cdad', skinD='#dcaa82', hair='#6b4326', hairD='#54331c', hairL='#8a5a34';
  const sh=shade(c);
  return `<svg width="150" height="205" viewBox="0 0 220 300" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="288" rx="62" ry="9" fill="rgba(0,0,0,.3)"/>
    <!-- длинные волосы (задний слой) -->
    <path d="M58 118 C36 140 32 190 40 236 C52 252 66 256 76 250 C66 210 66 160 78 138 Z" fill="${hairL}"/>
    <path d="M162 118 C184 140 188 190 180 236 C168 252 154 256 144 250 C154 210 154 160 142 138 Z" fill="${hairL}"/>
    <!-- руки -->
    <path d="M40 192 C28 202 22 216 20 232 C34 238 50 238 62 232 C58 216 52 202 44 192 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <path d="M180 192 C192 202 198 216 200 232 C186 238 170 238 158 232 C162 216 168 202 176 192 Z" fill="${c}" stroke="rgba(0,0,0,.22)" stroke-width="2"/>
    <!-- хитон с расширением (платье) -->
    <path d="M52 300 C52 240 76 200 110 200 C144 200 168 240 168 300 Z" fill="${c}" stroke="rgba(0,0,0,.25)" stroke-width="2.5"/>
    <path d="M52 300 C58 262 82 236 110 236 C138 236 162 262 168 300 Z" fill="${sh}" opacity=".55"/>
    <path d="M84 300 C90 268 98 252 110 252 C122 252 130 268 136 300 Z" fill="${sh}" opacity=".8"/>
    <path d="M80 222 C90 242 100 252 110 252 C120 252 130 242 140 222" stroke="rgba(255,255,255,.4)" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M86 208 L80 300" stroke="rgba(0,0,0,.12)" stroke-width="3" fill="none"/>
    <path d="M134 208 L140 300" stroke="rgba(0,0,0,.12)" stroke-width="3" fill="none"/>
    <!-- ворот-оборочка -->
    <path d="M84 204 C96 218 124 218 136 204 L142 216 C128 230 92 230 78 216 Z" fill="#fdf6e8" stroke="rgba(0,0,0,.12)" stroke-width="1.5"/>
    <circle cx="96" cy="210" r="2.4" fill="${c}"/><circle cx="110" cy="213" r="2.4" fill="${c}"/><circle cx="124" cy="210" r="2.4" fill="${c}"/>
    <!-- шея -->
    <rect x="97" y="172" width="26" height="26" rx="10" fill="${skin}"/>
    <!-- голова -->
    <circle cx="110" cy="132" r="52" fill="${skin}"/>
    <!-- уши -->
    <circle cx="58" cy="142" r="11" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <circle cx="162" cy="142" r="11" fill="${skin}" stroke="${skinD}" stroke-width="2"/>
    <!-- волосы сверху -->
    <path d="M58 132 L58 120 C58 74 82 52 110 52 C138 52 162 74 162 120 L162 132 L58 132 Z" fill="${hair}"/>
    <!-- чёлка -->
    <path d="M58 132 C80 116 140 116 162 132 L162 120 C158 100 146 92 130 92 C138 104 140 116 136 126 C128 114 92 114 84 126 C80 116 82 104 90 92 C74 92 62 100 58 120 Z" fill="${hairL}"/>
    <!-- хвостики с бантиками -->
    <circle cx="56" cy="88" r="10" fill="${hair}"/>
    <circle cx="164" cy="88" r="10" fill="${hair}"/>
    <path d="M46 80 L40 62 L58 70 Z" fill="#e86a5a"/><path d="M66 80 L72 62 L54 70 Z" fill="#e86a5a"/>
    <path d="M154 80 L148 62 L166 70 Z" fill="#e86a5a"/><path d="M174 80 L180 62 L162 70 Z" fill="#e86a5a"/>
    <path d="M52 84 L48 106 L60 106 Z" fill="${hairL}"/>
    <path d="M168 84 L172 106 L160 106 Z" fill="${hairL}"/>
    <!-- брови -->
    <path d="M80 126 Q92 120 104 124" stroke="${hairD}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path d="M116 124 Q128 120 140 126" stroke="${hairD}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <!-- глаза с ресницами -->
    <ellipse cx="93" cy="140" rx="8.5" ry="10.5" fill="#fff"/>
    <ellipse cx="127" cy="140" rx="8.5" ry="10.5" fill="#fff"/>
    <circle cx="94" cy="142" r="5.2" fill="#3a2c1e"/><circle cx="126" cy="142" r="5.2" fill="#3a2c1e"/>
    <circle cx="96" cy="139" r="1.7" fill="#fff"/><circle cx="128" cy="139" r="1.7" fill="#fff"/>
    <path d="M83 132 Q86 128 90 130" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M102 131 Q106 128 110 131" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M137 132 Q140 128 144 130" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M118 131 Q122 128 126 131" stroke="${hairD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <!-- нос -->
    <path d="M110 149 C108 154 110 158 113 157" stroke="${skinD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <!-- улыбка -->
    <path d="M98 170 Q110 182 122 170" stroke="#c06a5e" stroke-width="3.6" fill="none" stroke-linecap="round"/>
    <!-- румянец -->
    <ellipse cx="78" cy="162" rx="9.5" ry="6" fill="rgba(235,130,120,.35)"/>
    <ellipse cx="142" cy="162" rx="9.5" ry="6" fill="rgba(235,130,120,.35)"/>
  </svg>`;
}
function renderOnboard(){
  chosenKlass=null;   /* новый ученик выбирает класс сам — не наследует класс того, кто вышел */
  const s=document.getElementById('screen');
  s.innerHTML=`<div class="onboard"><div class="card">
    <div class="ob-top">
      <div style="font-size:36px">🏛</div>
      <div style="text-align:left">
        <h2 style="margin:0">Добро пожаловать в АРХИМЕД!</h2>
        <div class="ob-sub">«Назови себя — и Архимед поведёт тебя по Островам Познания»</div>
      </div>
    </div>
    <div class="ob-steps"><span class="ob-step-dot on" id="d1"></span><span class="ob-step-dot" id="d2"></span></div>

    <div class="ob-page on" id="obPage1">
      <label>Имя героя</label>
      <div class="ob-magic" onclick="focusObName()">
        <div class="ob-ph" id="obPh">✨ напиши своё имя…</div>
        <div class="ob-letters" id="obLetters"></div>
        <input id="obName" maxlength="12" autocomplete="off" oninput="obMagic()">
      </div>
      <div class="ob-cap">🎓 Мой класс</div>
      <div class="obk-grid">${[1,2,3,4,5,6,7,8,9].map(k=>`<button type="button" class="obk ${k===chosenKlass?'sel':''}" data-k="${k}" onclick="pickKlass(this)"><b>${k}</b><span>КЛАСС</span></button>`).join('')}</div>
      <div class="ob-hint" id="klassTip">Нажми на свой класс — уроки и задания будут только для него</div>
      <div class="ob-cta"><button class="btn" onclick="obNext()">Далее →</button></div>
    </div>

    <div class="ob-page" id="obPage2">
      <div class="ob-cap">⚡ Режим занятий</div>
      <button type="button" class="obl ${chosenLevel==='novice'?'sel':''}" data-l="novice" onclick="pickLevel(this)"><span class="ob-ico">🌱</span><span style="flex:1"><span class="ob-t">Новичок</span><span class="ob-d">Только начинаешь? Архимед подробно объяснит каждый приём и подскажет, если трудно.</span></span></button>
      <button type="button" class="obl ${chosenLevel==='pro'?'sel':''}" data-l="pro" onclick="pickLevel(this)"><span class="ob-ico">⚡</span><span style="flex:1"><span class="ob-t">Олимпиец</span><span class="ob-d">Уже решал олимпиадные задачи — объяснения короче, задания смелее.</span></span></button>
      <div class="ob-cap">🦸 Твой герой</div>
      <div class="gender-pick">
        <button type="button" class="gender-btn ${chosenGender==='boy'?'sel':''}" onclick="pickGender('boy')">👦 Мальчик</button>
        <button type="button" class="gender-btn ${chosenGender==='girl'?'sel':''}" onclick="pickGender('girl')">👧 Девочка</button>
      </div>
      <div id="chitPrev" style="display:flex;justify-content:center;margin:2px 0 0">${figSVG(chosenGender)}</div>
      <label>Цвет хитона</label>
      <div class="swatches" style="justify-content:center">${COLORS.map((c,i)=>`<div class="sw ${i===0?'sel':''}" style="background:${c}" data-c="${c}" onclick="pickCol(this)"></div>`).join('')}</div>
      <div class="ob-foot">
        <button class="btn" onclick="obGo(1)">← Назад</button>
        <button class="btn" onclick="finishOnboard()">В путь →</button>
      </div>
      <div class="small" style="text-align:center;margin-top:10px">
        <a href="parent/" style="color:var(--brass);text-decoration:none">🛡 Я родитель — приложение для родителей →</a>
      </div>
    </div>
  </div></div>`;
  obMagic(); hud();
}
let obStep=1;
function obGo(n){
  obStep=n;
  const p1=document.getElementById('obPage1'), p2=document.getElementById('obPage2');
  const d1=document.getElementById('d1'), d2=document.getElementById('d2');
  if(p1) p1.classList.toggle('on', n===1);
  if(p2) p2.classList.toggle('on', n===2);
  if(d1) d1.classList.toggle('on', n===1);
  if(d2) d2.classList.toggle('on', n===2);
}
function obNext(){
  const inp=document.getElementById('obName');
  if(inp && !inp.value.trim()){ toast('Архимед ждёт твоё имя!'); focusObName(); return; }
  if(!chosenKlass){ obKlassNudge(); return; }
  obGo(2);
}
/* класс не выбран: подсказка и встряхнуть сетку классов */
function obKlassNudge(){
  toast('Выбери свой класс!');
  const g=document.querySelector('.obk-grid'); if(!g) return;
  g.scrollIntoView({block:'center', behavior:'smooth'});
  g.classList.remove('obk-ждёт'); void g.offsetWidth; g.classList.add('obk-ждёт');
}
function focusObName(){ try{ const el=document.getElementById('obName'); if(el) el.focus(); }catch(e){} }

/* ================= ВОЛШЕБНОЕ ИМЯ v2: canvas + золотая звезда по контуру букв =================
   Буквы рисуются на canvas-слое .ob-fx; для каждой буквы строим реальный контур глифа
   (растровая трассировка), и звезда обходит контур каждой буквы по очереди, оставляя пыль. */
const _obCache=new Map();   // char -> {adv, contours:[ [ [x,y], ... ], ... ]}  (координаты в css px, y вниз от базовой линии)
let _obRaf=null, _obRun=null, _obCvs=null, _obCtx=null;

function _obFont(px){ return 'bold '+px+'px Georgia, "Times New Roman", serif'; }

/* Растровая трассировка контура буквы (Moore). Возвращает список замкнутых контуров
   в координатах: x от левого края advance-бокса, y вниз от базовой линии (css px). */
function _obTrace(ch, fontPx){
  const key=ch+'@'+Math.round(fontPx);
  if(_obCache.has(key)) return _obCache.get(key);
  let res={adv:0, contours:[]};
  try{
    const S=4; // суперсэмплинг для гладкости
    const m=document.createElement('canvas').getContext('2d');
    m.font=_obFont(fontPx);
    const adv=m.measureText(ch).width;
    const asc=m.measureText(ch).actualBoundingBoxAscent||fontPx*0.75;
    const desc=m.measureText(ch).actualBoundingBoxDescent||fontPx*0.2;
    const W=Math.ceil((adv+2)*S)+6, H=Math.ceil((asc+desc+2)*S)+6;
    const c=document.createElement('canvas'); c.width=W; c.height=H;
    const x=c.getContext('2d',{willReadFrequently:true});
    x.font=_obFont(fontPx*S);
    x.textBaseline='alphabetic';
    x.fillStyle='#000';
    const bx=3, by=3+asc*S;
    x.fillText(ch,bx,by);
    const img=x.getImageData(0,0,W,H).data;
    const ink=new Uint8Array(W*H);
    for(let i=0;i<W*H;i++){ ink[i] = img[i*4+3] > 60 ? 1 : 0; }
    const isInk=(px,py)=> px>=0&&py>=0&&px<W&&py<H&&ink[py*W+px]===1;
    const bound=new Uint8Array(W*H);
    for(let y=0;y<H;y++)for(let px=0;px<W;px++){
      if(!ink[y*W+px]) continue;
      if(!isInk(px-1,y)||!isInk(px+1,y)||!isInk(px,y-1)||!isInk(px,y+1)) bound[y*W+px]=1;
    }
    const visited=new Uint8Array(W*H);
    // по часовой, начиная с востока: 0=E 1=SE 2=S 3=SW 4=W 5=NW 6=N 7=NE
    const nbr=[[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
    for(let sy=0;sy<H;sy++)for(let sx=0;sx<W;sx++){
      if(!bound[sy*W+sx]||visited[sy*W+sx]) continue;
      const chain=[]; let cx=sx, cy=sy, prevDir=4; // «пришли» с запада (на старте сверху-слева)
      let guard=0, closed=false;
      while(guard<W*H*2){
        chain.push([cx,cy]);
        visited[cy*W+cx]=1;
        // поиск следующего: против часовой от (prevDir+1) => идём вдоль внешней кромки
        let found=false;
        for(let k=1;k<=8;k++){
          const d=(prevDir+8-k)%8;
          const nx=cx+nbr[d][0], ny=cy+nbr[d][1];
          if(nx<0||ny<0||nx>=W||ny>=H) continue;
          if(!bound[ny*W+nx]) continue;
          if(visited[ny*W+nx]){
            if(nx===sx&&ny===sy){ closed=true; }
            continue;
          }
          // диагональ не должна проходить «сквозь угол» (оба ортогональных соседа пусты)
          if(nbr[d][0]!==0&&nbr[d][1]!==0){
            if(!isInk(cx+nbr[d][0],cy)&&!isInk(cx,cy+nbr[d][1])) continue;
          }
          cx=nx; cy=ny; prevDir=(d+4)%8; found=true; break;
        }
        if(closed) break;
        if(!found) break;
        guard++;
      }
      if(chain.length<12) continue;      // слишком коротко — мусор
      // сглаживание: убираем коллинеарные и почти-коллинеарные, шаг по цепочке
      const pts=[];
      for(let i=0;i<chain.length;i++){
        const q=chain[i];
        const p=chain[(i+chain.length-1)%chain.length];
        const r=chain[(i+1)%chain.length];
        const ax=q[0]-p[0], ay=q[1]-p[1], bx2=r[0]-q[0], by2=r[1]-q[1];
        const cross=ax*by2-ay*bx2;
        const same=Math.abs(ax)+Math.abs(ay);
        if(cross===0 && same<=1) continue;          // строго прямой шаг
        if(same===0) continue;                       // дубль
        pts.push([(q[0]-bx)/S,(by-q[1])/S]);
      }
      // добавляем первую точку в конец, чтобы контур был замкнут
      if(pts.length>4){
        const first=pts[0];
        res.contours.push(pts.concat([first]));
      }
    }
    res.adv=adv;
  }catch(e){ res={adv:0,contours:[]}; }
  _obCache.set(key,res);
  return res;
}

function _obEnsure(){
  const box=document.getElementById('obLetters'); if(!box) return null;
  const magic=box.parentElement;
  let cvs=document.getElementById('obFx');
  if(!cvs){
    cvs=document.createElement('canvas');
    cvs.id='obFx'; cvs.className='ob-fx';
    magic.appendChild(cvs);
  }
  const r=magic.getBoundingClientRect();
  const dpr=Math.min(window.devicePixelRatio||1,2.5);
  cvs.width=Math.round(r.width*dpr); cvs.height=Math.round(r.height*dpr);
  cvs.style.width=r.width+'px'; cvs.style.height=r.height+'px';
  const ctx=cvs.getContext('2d');
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,r.width,r.height);
  _obCvs=cvs; _obCtx=ctx;
  return {ctx, W:r.width, H:r.height};
}

/* Запуск анимации: звезда бежит по контуру каждой буквы слева направо */
function obStarRun(str){
  const st=_obEnsure(); if(!st||!str) return;
  const {ctx,W,H}=st;
  const padX=14;
  const avail=W-padX*2;
  // подбираем размер шрифта, чтобы имя влезало
  let fontPx=36;
  const pm=document.createElement('canvas').getContext('2d');
  for(let k=0;k<8;k++){
    pm.font=_obFont(fontPx);
    const w=pm.measureText(str).width;
    if(w>avail && fontPx>16){ fontPx=Math.max(16,fontPx*avail/w*0.98); } else break;
  }
  pm.font=_obFont(fontPx);
  const totalW=pm.measureText(str).width;
  const asc=pm.measureText(str).actualBoundingBoxAscent||fontPx*0.72;
  const desc=pm.measureText(str).actualBoundingBoxDescent||fontPx*0.2;
  const base=H/2+(asc-desc)/2;   // базовая линия по центру
  const x0=padX+(avail-totalW)/2;
  // буквы: позиции и контуры
  const letters=[]; let cx=x0;
  const traces=[];
  for(const ch of str){
    const adv=pm.measureText(ch).width;
    letters.push({ch, x:cx, adv, base});
    const t=_obTrace(ch,fontPx);
    traces.push(t);
    cx+=adv;
  }
  // внешний контур буквы = самый длинный (периметр больше → это внешняя граница)
  const outerOf=(t)=> t.contours.length? t.contours.reduce((a,b)=> b.length>a.length?b:a) : null;
  const topPoint=(lt,loop)=>{
    let best=0;
    for(let q=1;q<loop.length;q++){
      const yq=loop[q][1];                       // p[1] — вверх от базовой линии
      if(yq>loop[best][1]) best=q;
    }
    return {x:lt.x+loop[best][0], y:lt.base-loop[best][1], idx:best};
  };
  // путь: для каждой буквы — полный обход внешнего контура (от верхней точки),
  // между буквами — короткая дуга-«перелёт» поверх букв
  const path=[]; const dust=[];
  const arc=(a,b)=>{
    if(!a){ path.push({x:b.x,y:b.y}); return; }
    const dx=b.x-a.x, dy=b.y-a.y;
    const steps=Math.max(6,Math.round(Math.hypot(dx,dy)/6));
    for(let i=1;i<=steps;i++){
      const t=i/steps;
      const lift=Math.sin(t*Math.PI)*10;         // дуга вверх
      path.push({x:a.x+dx*t, y:a.y+dy*t-lift});
    }
  };
  let last=null; let idx=0;
  for(const L of traces){
    const lt=letters[idx]; idx++;
    const loop=outerOf(L);
    if(!loop){ // пробел или нет контура — просто перелетаем
      const c={x:lt.x+lt.adv/2, y:lt.base};
      arc(last,c); last=c; continue;
    }
    const tp=topPoint(lt,loop);
    arc(last,tp);
    // обход внешнего контура целиком, по порядку от верхней точки
    const n=loop.length;
    for(let q=0;q<=n;q++){
      const p=loop[(tp.idx+q)%n];
      path.push({x:lt.x+p[0], y:lt.base-p[1]});
    }
    last=path[path.length-1];
  }
  // звезда + пыль
  const total=path.length;
  // скорость постоянна: t растёт так, чтобы весь путь занимал ~3.2 c при 60 fps
  let t=0, speed=1/(3.2*60), dustTimer=0;
  const prevRaf=_obRun; if(prevRaf&&prevRaf.cancel) prevRaf.cancel();
  let cancelled=false;
  const run={cancel:()=>{cancelled=true;}};
  _obRun=run;
  if(_obRaf){ cancelAnimationFrame(_obRaf); _obRaf=null; }
  const starSvg='✦';
  const drawLetterFills=()=>{
    ctx.font=_obFont(fontPx); ctx.textBaseline='alphabetic';
    ctx.shadowColor='rgba(217,164,65,.65)'; ctx.shadowBlur=12;
    ctx.fillStyle='#f3c968';
    ctx.fillText(str,x0,base);
    ctx.shadowBlur=0;
  };
  const frame=()=>{
    if(cancelled||!document.getElementById('obPage1')||!document.getElementById('obPage1').classList.contains('on')){
      _obRaf=null; return;
    }
    ctx.clearRect(0,0,W,H);
    drawLetterFills();
    t+=speed;
    if(t>=1){ // финал: звёздочка-огонёк в конце имени
      const endX=x0+totalW+6;
      const al=0.55+0.45*Math.sin(Date.now()/180);
      ctx.font='10px Georgia'; ctx.textAlign='left';
      ctx.shadowColor='rgba(217,164,65,.9)'; ctx.shadowBlur=6;
      ctx.fillStyle='rgba(255,224,140,'+al+')';
      ctx.fillText(starSvg,endX,base+3);
      ctx.shadowBlur=0;
      // медленно гаснущая пыль
      _obStepDust(ctx,dust,0.02);
      _obRaf=requestAnimationFrame(frame);
      return;
    }
    const idx=Math.min(path.length-1,Math.floor(t*(path.length-1)));
    const p=path[idx];
    // пыль вдоль хвоста
    dustTimer++;
    if(dustTimer%2===0){
      for(let k=1;k<=3;k++){
        const bi=Math.max(0,idx-k*3);
        const bp=path[bi];
        dust.push({x:bp.x+(Math.random()-.5)*3, y:bp.y+(Math.random()-.5)*3,
                   vx:(Math.random()-.5)*0.5, vy:-0.2-Math.random()*0.5,
                   life:1, decay:0.03+Math.random()*0.04, r:0.7+Math.random()*1.1});
      }
    }
    // рисуем лёгкий золотой след
    ctx.lineWidth=1.4; ctx.strokeStyle='rgba(240,200,110,.35)';
    ctx.beginPath();
    for(let k=Math.max(0,idx-14);k<=idx;k++){ const q=path[k]; k===Math.max(0,idx-14)?ctx.moveTo(q.x,q.y):ctx.lineTo(q.x,q.y); }
    ctx.stroke();
    // звезда
    ctx.font='10px Georgia'; ctx.textAlign='left';
    ctx.shadowColor='rgba(255,225,150,1)'; ctx.shadowBlur=6;
    ctx.fillStyle='#fff3c4';
    ctx.fillText(starSvg,p.x-2.5,p.y+3);
    ctx.shadowBlur=0;
    _obStepDust(ctx,dust,1);
    _obRaf=requestAnimationFrame(frame);
  };
  _obRaf=requestAnimationFrame(frame);
}
function _obStepDust(ctx,dust,alphaMul){
  for(let k=dust.length-1;k>=0;k--){
    const d=dust[k];
    d.x+=d.vx; d.y+=d.vy; d.vy+=0.02; d.life-=d.decay;
    if(d.life<=0){ dust.splice(k,1); continue; }
    ctx.fillStyle='rgba(255,215,120,'+(d.life*0.9).toFixed(3)+')';
    ctx.beginPath(); ctx.arc(d.x,d.y,d.r,0,6.283); ctx.fill();
  }
}
function obMagic(){
  try{
    const inp=document.getElementById('obName'); if(!inp) return;
    const ph=document.getElementById('obPh'); const box=document.getElementById('obLetters');
    const val=inp.value;
    if(ph) ph.style.display = val ? 'none' : '';
    if(box) box.innerHTML='';   // буквы рисует canvas
    if(_obRaf){ cancelAnimationFrame(_obRaf); _obRaf=null; }
    if(!val.trim()){ const cvs=document.getElementById('obFx'); if(cvs){ const c2=cvs.getContext('2d'); c2.clearRect(0,0,cvs.width,cvs.height);} return; }
    obStarRun(val);
  }catch(e){}
}


function pickKlass(el){
  chosenKlass=+el.dataset.k;
  const g=document.querySelector('.obk-grid'); if(g) g.classList.remove('obk-ждёт');
  document.querySelectorAll('.obk').forEach(b=>b.classList.toggle('sel', +b.dataset.k===chosenKlass));
  const tip=document.getElementById('klassTip');
  if(tip) tip.textContent = chosenKlass===6 ? '🎁 Для 6 класса открыты задачи 5–8 классов' : 'Уроки и задания — только твоего класса';
}
function pickLevel(el){
  chosenLevel=el.dataset.l;
  document.querySelectorAll('.obl').forEach(b=>b.classList.toggle('sel', b.dataset.l===chosenLevel));
}
function pickGender(g){
  chosenGender=g;
  document.querySelectorAll('.gender-btn').forEach(b=>b.classList.toggle('sel', b.getAttribute('onclick').indexOf("'"+g+"'")>=0));
  const p=document.getElementById('chitPrev'); if(p) p.innerHTML=figSVG(g);
}
function pickCol(el){
  chosenCol=el.dataset.c;
  document.querySelectorAll('.sw').forEach(x=>x.classList.toggle('sel',x===el));
  const p=document.getElementById('chitPrev'); if(p) p.innerHTML=figSVG(chosenGender);
}

/* затемнение цвета для тени хитона */
function shade(hex){
  try{
    const n=parseInt(hex.slice(1),16);
    const f=v=>Math.max(0,Math.round(((n>>v)&255)*0.55));
    return 'rgb('+f(16)+','+f(8)+','+f(0)+')';
  }catch(e){ return 'rgba(0,0,0,.3)'; }
}
function finishOnboard(){
  const name=document.getElementById('obName').value.trim();
  if(!name){ toast('Архимед ждёт твоё имя!'); return; }
  if(!chosenKlass){ obGo(1); obKlassNudge(); return; }
  DB.profile={ name, color:chosenCol, gender:chosenGender,
    klass:String(chosenKlass),
    level:chosenLevel,
    limitMin:45, createdAt:Date.now() };
  /* Свой сундук, если этот Исследователь уже занимался на устройстве,
     иначе чистый лист — чужой прогресс не достаётся никому. */
  const вернулся = сундукДостать(DB.profile);
  DB.sessionStart=Date.now(); save(); showNav(true); go('path');
  toast(вернулся ? ('С возвращением, '+name+'! Твой прогресс на месте.') : ('Добро пожаловать, '+name+'!'));
  /* сразу просим придумать свой PIN — устройство привязывается к ученику */
  try{ if (typeof kidGate === 'function') setTimeout(kidGate, 250); }catch(e){}
}
/* ---------- СУНДУК ИССЛЕДОВАТЕЛЯ ----------------------------------------
   Прогресс хранится ПО ИССЛЕДОВАТЕЛЯМ, а не общей кучей на устройство.
   Раньше выход только обнулял DB.profile, а tasks, lessons, points, streak
   и код родителя оставались общими. Из-за этого следующий ребёнок получал
   чужое: проверка показала, что Петя (2 класс) входил с очками 140, серией 5,
   двумя уроками и семью задачами Вики, а его занятия уезжали родителю Вики.
   Теперь при выходе прогресс складывается в сундук под ключом «имя · класс»,
   а при входе достаётся свой. Ничего не стирается: сундуки лежат рядом. */
const ПОЛЯ_ПРОГРЕССА = ['tasks','lessons','points','streak','best','history','days','events','totalMin','today'];

/* Ключ — только имя. Класс в ключ не входит намеренно: ребёнок переходит в
   следующий класс, и если бы класс был частью ключа, он при этом терял бы
   весь свой прогресс — проверка это и показала. */
function ключИсследователя(п){
  if(!п || !п.name) return '';
  return String(п.name).trim().toLowerCase().replace(/\s+/g,' ');
}
function сундукПоложить(п){
  const к = ключИсследователя(п);
  if(!к) return;
  DB.сундуки = DB.сундуки || {};
  const с = {};
  ПОЛЯ_ПРОГРЕССА.forEach(f=>{ if(DB[f]!==undefined) с[f]=DB[f]; });
  /* код привязки к родителю тоже принадлежит ребёнку, а не устройству:
     иначе отчёт нового ребёнка уходит родителю прежнего */
  if(DB.kid) с.kid = DB.kid;
  с.сохранён = Date.now();
  DB.сундуки[к] = с;
}
function сундукДостать(п){
  const к = ключИсследователя(п);
  const пусто = emptyState();
  const с = (DB.сундуки||{})[к];
  ПОЛЯ_ПРОГРЕССА.forEach(f=>{
    DB[f] = (с && с[f]!==undefined) ? с[f] : (пусто[f]!==undefined ? пусто[f] : (f==='lessons'?{}:DB[f]));
  });
  if(!DB.lessons) DB.lessons={};
  DB.kid = (с && с.kid) ? с.kid : {};
  try{
    if(с && с.kid && typeof kidSaveState==='function') kidSaveState();
    else localStorage.removeItem('arh_kid_v1');
  }catch(e){}
  return !!с;
}

/* ---------- ВЫХОД ИЗ ПРОФИЛЯ ---------- */
function logoutProfile(){
  if(!DB.profile) return;
  if(!confirm('Выйти из профиля «'+DB.profile.name+'»? Прогресс сохранится — вернёмся к начальному экрану.')) return;
  сундукПоложить(DB.profile);
  const пусто = emptyState();
  ПОЛЯ_ПРОГРЕССА.forEach(f=>{ DB[f] = (пусто[f]!==undefined) ? пусто[f] : {}; });
  DB.lessons={};
  DB.kid={};
  try{ localStorage.removeItem('arh_kid_v1'); }catch(e){}
  DB.profile=null;
  DB.sessionStart=Date.now();
  save();
  try{ if(typeof AGENTLIVE!=='undefined'&&AGENTLIVE.state&&AGENTLIVE.state()) AGENTLIVE.stop(); }catch(e){}
  showNav(false);
  go('onboard');
  toast('До встречи! Можно войти другому Исследователю.');
}
/* ---------- ПУТЬ ---------- */
const ISLANDS=[
  {name:'Начальная школа', ico:'🧸', dsc:'1–4 класс · счёт, сложение, умножение, доли'},
  {name:'Сиракузы', ico:'🏛', dsc:'Математика · логика, комбинаторика, инварианты'},
  {name:'Ньютон', ico:'🍎', dsc:'Физика · механика, энергия, электричество'},
  {name:'Лавуазье', ico:'⚗️', dsc:'Химия · молекулы, растворы, газы'},
  {name:'Информатика', ico:'💻', dsc:'Информатика · двоичный код, алгоритмы, логика'},
  {name:'Русский язык', ico:'📖', dsc:'Русский язык · части речи, орфография, пунктуация'},
  {name:'Разбор с Мишуткой', ico:'🐻', img:'img/mishutka.png', dsc:'Олимпиадная смекалка · диаграммы, таблицы, логика'}];
function isJunior(){ try{ return !!DB.profile&&/^[1-4]$/.test(String(DB.profile.klass||'').trim()); }catch(e){ return false; } }
/* ---------- фильтр задач по классу ---------- */
function taskClassRange(t){
  // тема несёт пометку класса («1 класс · …», «5–6 кл · …») — она главнее острова
  const th=String((t&&t.theme)||'');
  const m=/^(\d{1,2})\s*(?:[-–—]\s*(\d{1,2}))?\s*(?:класс|кл)/.exec(th);
  if(m) return [ +m[1], m[2]? +m[2] : +m[1] ];
  // без пометки — островной диапазон (старшая линия: Гл.N, Инф. · …, БОСС)
  const R={'Начальная школа':[1,4],Сиракузы:[5,9],Ньютон:[7,9],Лавуазье:[8,9],Информатика:[7,9],'Русский язык':[5,6],'Разбор с Мишуткой':[5,6]};
  return R[(t&&t.island)||'']||[1,9];
}
/* 🌍 «весь мир»: все острова и задачи доступны независимо от класса (по умолчанию включено) */
function worldOpen(){ try{ return DB.openWorld!==false; }catch(e){ try{ return !(window.DB && window.DB.openWorld===false); }catch(e2){ return true; } } }
function taskFits(t){ if(worldOpen()) return true; const r=taskClassRange(t),o=openClassRange(); return !(r[1]<o[0]||r[0]>o[1]); }
function tasksFit(arr){ return (arr||[]).filter(taskFits); }
function islandHasTasks(name){ return tasksFit(window.ARH_TASKS.filter(t=>t.island===name)).length>0; }

function taskPool(){ if(worldOpen()) return window.ARH_TASKS.slice(); return tasksFit(isJunior()? window.ARH_TASKS.filter(t=>t.island==='Начальная школа') : window.ARH_TASKS.filter(t=>t.island!=='Начальная школа')); }
/* карта путешествий: все острова всегда на месте (младшие — только Начальная школа) */
function islandVisible(I){
  if(worldOpen()) return true;
  if(isJunior()) return I.name==='Начальная школа';
  if(I.name==='Начальная школа') return false;
  return true;
}
/* с какого класса (не раньше класса ученика) на острове появятся задачи — для подписи «откроется в N классе» */
function islandOpenAt(name){
  const ts=window.ARH_TASKS.filter(t=>t.island===name);
  const from=profileClassNum();
  for(let k=Math.max(1,from);k<=9;k++){ if(ts.some(t=>{ const r=taskClassRange(t); return !(r[1]<k||r[0]>k); })) return k; }
  return null;
}
function nextTask(){ return taskPool().filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0] || window.ARH_TASKS.filter(t=>taskFits(t)&&(!DB.tasks[t.id]||!DB.tasks[t.id].done))[0] || null; }
function poolDone(){ const ts=taskPool(); return ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length; }
function islStats(name){
  const ts=tasksFit(window.ARH_TASKS.filter(t=>t.island===name));
  const done=ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  return {total:ts.length, done};
}
function ringHTML(pct, size, label, img){
  // анимированное кольцо прогресса
  const r=(size-10)/2, c=2*Math.PI*r;
  const off=c*(1-Math.min(100,Math.max(0,pct))/100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring" style="--off:${off};--len:${c}">
    <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="rgba(255,255,255,.09)" stroke-width="5"/>
    ${img?`<image href="${img}" x="${size*0.5-size*0.30}" y="${size*0.5-size*0.30}" width="${size*0.60}" height="${size*0.60}" preserveAspectRatio="xMidYMid meet"/>`:''}
    <circle class="ring-fg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--brass)" stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${c}" transform="rotate(-90 ${size/2} ${size/2})"/>
    ${img?'':`<text x="50%" y="53%" text-anchor="middle" dominant-baseline="middle" fill="#e8e0cc" font-size="${size*0.21}" font-family="Georgia,serif">${label}</text>`}
  </svg>`;
}
/* ================= ПУТЬ: план обучения + дашборды ================= */
if(typeof window.PLAN==='undefined') window.PLAN={cls:null,open:[]};
function pdCss(){
  if(document.getElementById('pdCss')) return;
  const st=document.createElement('style'); st.id='pdCss';
  st.textContent=`
  .pd-title{display:flex;align-items:center;gap:8px;margin:16px 2px 6px;flex-wrap:wrap}
  .pd-title .h{font-size:16px;font-weight:bold;color:var(--ivory)}
  .pd-title .s{font-size:11.5px;color:var(--muted)}
  .pd-title .l{flex:1 1 200px;min-width:0;text-align:left}
  /* flex:0 0 auto запрещал сжатие: три длинных чипа давали 506 px при экране
     390 px, страница растягивалась и на телефоне всё уезжало — «Путь», ввод
     кода, списки уроков. Разрешаем сжатие, чипы переносятся внутри блока. */
  .pd-title .btns{flex:0 1 auto;min-width:0;display:flex;gap:6px;flex-wrap:wrap}
  .dash-mini-row{display:flex;gap:10px;overflow-x:auto;padding:4px 2px 10px;scrollbar-width:thin}
  .dash-mini{flex:0 0 148px;background:rgba(255,255,255,.045);border:1.5px solid rgba(127,184,160,.3);border-radius:15px;padding:8px 8px 6px;cursor:pointer;text-align:center;transition:transform .15s ease,border-color .15s}
  .dash-mini:hover{transform:translateY(-2px)}
  .dash-mini.on{border-color:var(--brass,#d9a441);background:rgba(217,164,65,.08)}
  .dash-mini .nm{font-size:12.5px;font-weight:bold;color:#fff;margin-top:2px;line-height:1.25}
  .dash-mini .pc{font-size:11.5px;color:#8fd1a8}
  .expand-hint{font-size:11px;color:var(--muted,#8a94ad);margin-top:2px}
  .fold-top{display:flex;align-items:center;gap:8px;margin-bottom:6px}
  .chip.pd{background:rgba(255,255,255,.05);border:1.5px solid rgba(127,184,160,.4);color:#e8dcc8}
  .chip.pd.on{background:rgba(217,164,65,.2);border-color:var(--brass,#d9a441);color:#ffd76a}
  .plan-arena{position:relative}
  .plan-band{position:relative;border-radius:20px;padding:14px 15px 10px;overflow:hidden;background:linear-gradient(135deg,rgba(52,96,74,.92),rgba(19,39,29,.95));border:1px solid rgba(127,184,160,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.06), 0 8px 18px rgba(0,0,0,.25)}
  .plan-band::before{content:'';position:absolute;left:-40px;top:-60px;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle at center, rgba(127,209,160,.16), transparent 65%)}
  .plan-band::after{content:'';position:absolute;right:-30px;bottom:-50px;width:150px;height:150px;border-radius:50%;background:radial-gradient(circle at center, rgba(217,164,65,.18), transparent 65%)}
  .plan-kicker{font-size:12px;letter-spacing:.18em;color:#8fd1a8;text-transform:uppercase;text-align:left;position:relative}
  .plan-title{font-size:24px;letter-spacing:-.02em;font-weight:bold;color:#fff;font-family:Georgia,serif;text-align:left;margin:2px 0 1px;position:relative}
  .plan-sub{font-size:14px;color:#cfe0cf;text-align:left;margin-bottom:12px;position:relative;line-height:1.5}
  @keyframes pdIn{0%{opacity:0;transform:translateY(8px)}100%{opacity:1;transform:none}}
  .plan-band{animation:pdIn .5s ease both}
  @keyframes stGrow{to{width:var(--w,0%)}}
  .plan-prog{height:8px;border-radius:99px;background:rgba(255,255,255,.08);overflow:hidden;margin:8px 2px 2px;position:relative}
  .plan-prog i{display:block;height:100%;width:0;border-radius:99px;background:linear-gradient(90deg,#d9a441,#8fd1a8);animation:stGrow 1s cubic-bezier(.2,.8,.2,1) forwards}
  .pl-sec{margin:10px 0 2px}
  .pl-sec-h{display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.05);border:1px solid rgba(127,184,160,.28);border-radius:12px;padding:7px 10px;position:relative}
  .pl-sec-h .pl-ico{font-size:16px;line-height:1}
  .pl-sec-h .pl-th{flex:1;text-align:left;font-size:16px;font-weight:bold;color:#fff}
  .pl-sec-h .pl-st{font-size:14px;color:#8fd1a8;font-weight:bold;background:rgba(143,209,168,.12);border-radius:99px;padding:2px 9px}
  .pl-list{margin-top:4px}
  .pl-task{display:flex;align-items:center;gap:10px;min-height:48px;background:rgba(255,255,255,.035);border:1px solid rgba(255,255,255,.06);border-radius:11px;padding:8px 10px;margin:6px 0;cursor:pointer;text-align:left;animation:pdIn .35s ease both}
  .pl-task .pl-ic{flex:0 0 26px;width:26px;height:26px;border-radius:50%;background:rgba(255,255,255,.07);color:#cfe0cf;font-size:14px;font-weight:bold;display:flex;align-items:center;justify-content:center}
  .pl-task .pl-ti{flex:1;min-width:0;text-align:left}
  .pl-task .pl-ti b{font-size:16px;color:#fff;display:block;line-height:1.3}
  .pl-task .pl-meta{font-size:14px;color:#a9b4c6}
  .pl-task.done{opacity:.55}
  .pl-task.done .pl-ic{background:rgba(95,154,106,.3);color:#9fd8ab}
  .pl-task.next{border-color:#d9a441;background:rgba(217,164,65,.12);box-shadow:0 0 0 1px rgba(217,164,65,.35)}
  .pl-task.next .pl-ic{background:#d9a441;color:#0d1a13}
  .pl-flag{flex:0 0 auto;font-size:10px;color:#0d1a13;background:#ffd76a;border-radius:99px;padding:2px 8px;font-weight:bold;letter-spacing:.04em;text-transform:uppercase}
  .dash-mini.locked{opacity:.75;border-style:dashed}
  .dash-mini.locked .nm{color:#b9c4bd}
  `;
  document.head.appendChild(st);
}
window.planToggleAll=function(){ PLAN.all=!PLAN.all; renderPath(); };
function planOpenIsland(name){ var i=PLAN.open.indexOf(name); if(i>=0){PLAN.open.splice(i,1);}else{PLAN.open.push(name);} renderPath(); }
function planOpenAll(){ PLAN.open=ISLANDS.filter(function(I){return islandVisible(I)&&islandHasTasks(I.name);}).map(function(I){return encodeURIComponent(I.name);}); renderPath(); }
function planCloseAll(){ PLAN.open=[]; renderPath(); }
function worldToggle(){
  DB.openWorld = !worldOpen();
  try{ save(); }catch(e){}
  if(!worldOpen()){ PLAN.open=[]; }
  renderPath();
}
/* чистое имя темы: «Гл.2 · Дроби»→«Дроби», «5–6 кл · Дроби»→«Дроби», «Инф. · Кодирование»→«Кодирование» */
function planTheme(t){
  const raw=String((t&&t.theme)||'');
  if(/^БОСС/.test(raw)) return 'Босс-испытание';
  const clean=raw.replace(/^Гл\.\d+\s*·\s*/,'');
  return thClean(clean).replace(/^Инф\.\s*·\s*/,'') || 'Задачи';
}
/* План обучения = выборка задач по методике для класса: темы по порядку островов, внутри — задачи с галочками и подсвеченной следующей */
function planDash(){
  const pool=taskPool();
  if(!pool.length) return '';
  const doneN=pool.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const pct=pool.length? Math.round(doneN/pool.length*100):0;
  const profK=DB.profile&&DB.profile.klass!=null? String(DB.profile.klass):'';
  const islOrd={}; ISLANDS.forEach((I,i)=>islOrd[I.name]=i);
  const ordIdx={}; window.ARH_TASKS.forEach((t,i)=>{ ordIdx[t.id]=i; });
  const ordered=pool.slice().sort((a,b)=>{
    const io=(islOrd[a.island]??99)-(islOrd[b.island]??99);
    if(io) return io;
    return (ordIdx[a.id]??0)-(ordIdx[b.id]??0);
  });
  /* Длинный список из сотен задач открывался целиком — экран превращался в
     стену. Показываем ближайшие, остальное — по кнопке (принцип постепенного
     раскрытия: сначала то, что нужно сейчас). */
  const LIMIT=8;
  const shown = PLAN.all? ordered : ordered.slice(0, LIMIT);
  // секции по (остров, тема) — задачи в методическом порядке файла
  const secs=[]; const secMap={};
  shown.forEach(t=>{
    const th=planTheme(t);
    const key=t.island+'|'+th;
    if(!secMap[key]){ secMap[key]={island:t.island,th,ts:[]}; secs.push(secMap[key]); }
    secMap[key].ts.push(t);
  });
  const nextT=ordered.find(t=>!(DB.tasks[t.id]&&DB.tasks[t.id].done))||null;
  let step=0;
  const blocks=secs.map(s=>{
    const doneS=s.ts.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
    const meta=ISLANDS.find(I=>I.name===s.island);
    const inner=s.ts.map(t=>{
      const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
      const isNext=nextT&&t.id===nextT.id;
      if(!done) step++;
      return `<div class="pl-task ${done?'done':''} ${isNext?'next':''}" style="animation-delay:${Math.min(0.04+step*0.012,0.8).toFixed(2)}s" onclick="go('task-${t.id}')">
        <span class="pl-ic">${done?'✓':(isNext?'▶':step)}</span>
        <span class="pl-ti"><b>${esc(t.title)}</b><span class="pl-meta">${esc(planTheme(t))} · ур. ${t.diff}${isNext?' · следующая':''}</span></span>
        ${isNext?'<span class="pl-flag">дальше</span>':''}
      </div>`;
    }).join('');
    return `<div class="pl-sec">
      <div class="pl-sec-h"><span class="pl-ico">${meta?meta.ico:'🧭'}</span><span class="pl-th">${esc(s.th)}</span><span class="pl-st">${doneS}/${s.ts.length}</span></div>
      <div class="pl-list">${inner}</div>
    </div>`;
  }).join('');
  const restN=ordered.length-shown.length;
  const moreBtn = (restN>0 || PLAN.all)
    ? `<button type="button" class="pt-more" onclick="planToggleAll()">${PLAN.all? 'свернуть план' : ('показать весь план · ещё '+restN+(restN%10===1&&restN%100!==11?' задача':' задач'))}</button>`
    : '';
  const rangeLbl = (function(){
    const o=openClassRange();
    if(isJunior()) return 'класс '+esc(profK)+' · начальная школа';
    return o[0]===o[1]? 'класс '+esc(profK)
      : 'класс '+esc(profK)+' · открыты задачи '+o[0]+'–'+o[1]+' классов';
  })();
  return `<div class="plan-arena">
    <div class="plan-band">
      <div class="plan-kicker">Личный маршрут</div>
      <div class="plan-title">План обучения</div>
      <div class="plan-sub">${pct===100? rangeLbl+' пройден целиком — отличная работа!': rangeLbl+' · выборка задач под тебя: решено '+doneN+' из '+pool.length+' ('+pct+'%)'}</div>
      <div class="plan-prog"><i style="--w:${pct}%"></i></div>
    </div>
    ${blocks}
    ${moreBtn}
  </div>`;
}
function dashMini(I,i){
  const st=islStats(I.name); const pct=st.total? Math.round(st.done/st.total*100):0;
  const on=PLAN.open.indexOf(encodeURIComponent(I.name))>=0;
  const locked=st.total===0;
  const openAt=locked? islandOpenAt(I.name):null;
  const inner = locked
    ? `<div style="display:flex;justify-content:center;opacity:.55">${ringHTML(0,44,I.ico,I.img)}</div>
       <div class="nm">${esc(I.name)}</div>
       <div class="pc">🔒 ${openAt? 'откроется в '+openAt+' классе':'задач пока нет'}</div>
       <div class="expand-hint">остров закрыт — вернёшься позже</div>`
    : `<div style="display:flex;justify-content:center">${ringHTML(pct,44,I.ico,I.img)}</div>
       <div class="nm">${esc(I.name)}</div>
       <div class="pc">${st.done}/${st.total} · ${pct}%</div>
       <div class="expand-hint">${on?'карта развёрнута · нажми, чтобы свернуть':'нажми — развернуть карту'}</div>`;
  return `<div class="dash-mini ${on?'on':''} ${locked?'locked':''}" style="animation-delay:${0.05*i}s" onclick="${locked? '':'planOpenIsland(\''+encodeURIComponent(I.name)+'\')'}">
    ${inner}
  </div>`;
}
function dashExpanded(I){
  const st=islStats(I.name);
  const locked=st.total===0;
  if(locked){
    const openAt=islandOpenAt(I.name);
    return `<div class="island path-island" style="margin-top:8px">
      <div class="fold-top"><button class="chip pd" onclick="planOpenIsland('${encodeURIComponent(I.name)}')">− свернуть</button><span style="font-size:11.5px;color:var(--muted)">остров «${esc(I.name)}»</span></div>
      <div class="pi-head">
        ${ringHTML(0,58,I.ico,I.img)}
        <div style="flex:1;min-width:0">
          <div class="nm">${esc(I.name)}</div>
          <div class="sub">${esc(I.dsc)}</div>
        </div>
      </div>
      <div style="margin-top:8px;font-size:12.5px;color:var(--muted);line-height:1.5">🔒 На этом острове пока нет задач для твоего класса. ${openAt? 'Он откроется, когда дорастёшь до '+openAt+' класса.':''} А пока — решай задачи на доступных островах в плане обучения выше.</div>
    </div>`;
  }
  const pct=st.total? Math.round(st.done/st.total*100):0;
  const islSorted=tasksFit(window.ARH_TASKS.filter(t=>t.island===I.name)).sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id));
  const themes=[...new Set(islSorted.map(t=>themeOf(t)))];
  const themeRows=themes.map(th=>{
    const tt=islSorted.filter(t=>themeOf(t)===th);
    const d=tt.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
    return `<div class="theme-row"><span class="tn">${esc(th)}</span><div class="bar"><i style="width:${d/tt.length*100}%"></i></div><span class="pc">${d}/${tt.length}</span></div>`;
  }).join('');
  return `<div class="island path-island" style="margin-top:8px">
    <div class="fold-top"><button class="chip pd" onclick="planOpenIsland('${encodeURIComponent(I.name)}')">− свернуть</button><span style="font-size:11.5px;color:var(--muted)">остров «${esc(I.name)}» — карта развёрнута</span></div>
    <div class="pi-head">
      ${ringHTML(pct,58,I.ico,I.img)}
      <div style="flex:1;min-width:0">
        <div class="nm">${esc(I.name)}</div>
        <div class="sub">${esc(I.dsc)}</div>
        <div class="small" style="margin-top:5px;color:var(--glass)">${st.done}/${st.total} · <span class="pct">${pct}%</span></div>
      </div>
    </div>
    ${themeRows}
    <div style="margin-top:6px"><button class="btn" style="width:100%" onclick="go('island-${encodeURIComponent(I.name)}')">Открыть полный список задач →</button></div>
  </div>`;
}
/* ---------- ЭКРАН «ПУТЬ»: стили, переделанные по мобильным принципам ----------
   Что меняем и почему (см. .agents/skills/mobile-principles и ui-typography-usability):
   · главное действие закреплено над нижними вкладками — оно в зоне большого
     пальца, а не третьим блоком, который уезжает за экран;
   · острова — вертикальный список: горизонтальная прокрутка прячет половину
     карточки, и на телефоне это выглядит как обрезанная плитка;
   · цели касания не меньше 44 px: прежние чипы были 26 px;
   · шаг отступов — 8 px, кегли по шкале 12/14/16/20. */
function ptCss(){
  if(document.getElementById('ptCss')) return;
  const st=document.createElement('style'); st.id='ptCss';
  st.textContent=`
  .pt-hero{display:flex;align-items:center;gap:14px;background:linear-gradient(170deg,var(--card),var(--card2));
    border:1px solid var(--hairline);border-radius:16px;padding:12px 14px}
  .pt-kick{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--muted)}
  .pt-name{font-size:20px;font-weight:bold;color:var(--ivory);line-height:1.15;margin-top:2px;
    display:flex;align-items:center;gap:8px;flex-wrap:wrap}
  .pt-meta{font-size:14px;color:var(--muted);margin-top:4px}
  .pt-meta b{color:var(--brass);font-variant-numeric:tabular-nums}
  .pt-fire{flex:none;text-align:center;color:var(--brass);line-height:1.1}
  .pt-fire b{display:block;font-size:20px;font-variant-numeric:tabular-nums}
  .pt-fire span{font-size:12px;color:var(--muted)}
  .pt-h{font-size:16px;color:var(--brass);margin:20px 2px 8px;letter-spacing:.02em;font-weight:bold}
  .pt-isl{display:flex;align-items:center;gap:12px;width:100%;min-height:64px;padding:10px 12px;margin-bottom:8px;
    background:linear-gradient(170deg,var(--card),var(--card2));border:1px solid var(--hairline);border-radius:14px;
    color:var(--ivory);font-family:inherit;text-align:left;cursor:pointer;
    transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 160ms}
  .pt-isl:active{transform:translateY(2px)}
  .pt-isl:focus-visible{outline:3px solid var(--brass);outline-offset:2px}
  .pt-isl-ic{flex:none;display:flex;align-items:center}
  .pt-lock{font-size:22px;opacity:.6}
  .pt-isl-b{flex:1;min-width:0}
  .pt-isl-nm{display:block;font-size:16px;font-weight:600;line-height:1.2}
  .pt-isl-meta{display:block;font-size:14px;color:var(--muted);margin-top:2px;font-variant-numeric:tabular-nums}
  .pt-chev{flex:none;color:var(--brass);font-size:16px}
  .pt-bar{display:block;height:6px;border-radius:99px;background:#0d1a13;overflow:hidden;margin-top:6px}
  /* Прогресс анимируем через transform: scaleX, а не через width: смена ширины
     заставляет браузер пересчитывать раскладку в каждом кадре (детектор
     impeccable отмечает это как layout-transition). */
  .pt-bar i{display:block;height:100%;width:100%;transform:scaleX(var(--w,0));transform-origin:left;
    background:linear-gradient(90deg,var(--brass-d),var(--brass));
    transition:transform .5s cubic-bezier(.23,1,.32,1)}
  .pt-more{width:100%;min-height:48px;margin-top:4px;border-radius:12px;border:1px dashed var(--hairline);
    background:rgba(255,255,255,.03);color:var(--ivory);font-family:inherit;font-size:14px;cursor:pointer}
  .pt-more:active{transform:translateY(1px)}
  .pt-tools{display:flex;flex-wrap:wrap;gap:8px;margin:12px 2px 0}
  .pt-tool{min-height:44px;padding:10px 14px;border-radius:12px;border:1px solid var(--hairline);
    background:var(--panel);color:var(--ivory);font-family:inherit;font-size:14px;cursor:pointer}
  .pt-tool:active{transform:translateY(1px)}
  .pt-note{font-size:14px;line-height:1.5;color:var(--muted);margin:8px 2px 0}
  /* Слово Архимеда вверху экрана: послание ученику + ссылка на легенду.
     Раньше легенда стояла в самом низу, под «личным маршрутом», и до неё
     никто не доходил. */
  .pt-arch{margin-top:12px;padding:12px 14px;border-radius:16px;
    background:linear-gradient(135deg,rgba(127,209,255,.07),rgba(217,164,65,.06));
    border:1px solid rgba(127,209,255,.3)}
  .pt-arch-row{display:flex;gap:12px;align-items:flex-start}
  .pt-arch-ava{width:52px;height:52px;border-radius:50%;object-fit:cover;object-position:center 16%;
    border:2px solid var(--brass);flex:none;box-shadow:0 4px 10px rgba(0,0,0,.35)}
  .pt-arch-who{font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--brass)}
  .pt-arch-say{font-size:16px;line-height:1.5;color:#e2e8f4;margin-top:4px}
  .pt-arch-link{display:flex;align-items:center;gap:10px;width:100%;min-height:48px;margin-top:10px;
    padding:8px 10px;border-radius:12px;border:1px solid var(--hairline);background:rgba(255,255,255,.04);
    color:var(--ivory);font-family:inherit;text-align:left;cursor:pointer;
    transition:transform 120ms cubic-bezier(.2,0,0,1),border-color 160ms}
  .pt-arch-link:active{transform:translateY(1px)}
  .pt-arch-link:focus-visible{outline:3px solid var(--brass);outline-offset:2px}
  .pt-arch-ic{font-size:20px;line-height:1}
  .pt-arch-t{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}
  .pt-arch-t b{font-size:14px;color:var(--glow)}
  .pt-arch-t span{font-size:12px;color:var(--muted)}
  .pt-arch-arr{color:var(--brass);font-size:16px}
  .pt-cta{position:fixed;left:0;right:0;bottom:calc(58px + env(safe-area-inset-bottom,0px));z-index:84;
    padding:8px 8px 10px;pointer-events:none;
    background:linear-gradient(180deg,rgba(11,23,18,0) 0%,rgba(11,23,18,.94) 42%)}
  .pt-cta .btn{pointer-events:auto;width:100%;max-width:884px;margin:0 auto;min-height:56px;padding:8px 14px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
  .pt-cta .t1{font-size:16px;font-weight:bold;line-height:1.15}
  .pt-cta .t2{font-size:14px;font-weight:normal;line-height:1.2;max-width:100%;overflow:hidden;
    text-overflow:ellipsis;white-space:nowrap;opacity:.9}
  .pt-cta.go{animation:ptUp .38s cubic-bezier(.23,1,.32,1) both}
  @keyframes ptUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
  .pt-spacer{height:72px}
  @media (prefers-reduced-motion: reduce){ .pt-cta.go{animation:none} .pt-bar i{transition:none} }
  `;
  document.head.appendChild(st);
}
/* ---------- послание ученику ---------- */
/* Склонение: 1 задача, 2 задачи, 5 задач */
function rusPlural(n,one,few,many){
  const m10=Math.abs(n)%10, m100=Math.abs(n)%100;
  if(m10===1 && m100!==11) return one;
  if(m10>=2 && m10<=4 && (m100<10 || m100>=20)) return few;
  return many;
}
/* Архимед говорит с учеником по его настоящим числам, а не по шаблону.
   Числа прогресса и серию не повторяем: они стоят в шапке прямо над этим
   блоком, и второй раз читать их незачем. Выдуманной похвалы нет: не решено
   ни одной задачи — так и говорим, но объясняем, что ошибаться можно. */
function pathSay(doneN,total){
  const nm=String((DB.profile&&DB.profile.name)||'').trim();
  const you=nm? nm+', ':'';
  const left=Math.max(0,(total||0)-doneN);
  const kid=typeof isJunior==='function' && isJunior();
  let s;
  if(!total) s=you+'для твоего класса задач пока нет. Нажми «открыть весь мир» под списком островов.';
  else if(!left) s=you+'вся карта пройдена: '+total+' '+rusPlural(total,'задача','задачи','задач')+'. Теперь бери посложнее — они в банке задач.';
  else if(!doneN) s=you+'начнём с одной '+(kid?'задачки':'задачи')+'. Ошибаться можно: подсказка и разбор — мои.';
  else s=you+'сложное — это просто то, что ещё не решено. Возьмись за одну задачу.';
  /* без имени (профиль ещё не заведён) послание начинается с маленькой буквы — поднимаем её */
  return s.charAt(0).toUpperCase()+s.slice(1);
}
/* Хвост «Пути»: острова и переключатели. Вынесен отдельно, потому что путь
   начальной школы (MVP/js/path_junior.js) рисует свой маршрут, но острова и
   «открыть весь мир» оставляет на месте — иначе ребёнок 1–4 класса потерял бы
   доступ к банку задач и к картам старших островов. */
window.pathTailHTML=function(){
  pdCss(); ptCss();
  const islands=ISLANDS.filter(islandVisible);
  const islRows=islands.map(function(I){
    const st=islStats(I.name), locked=st.total===0;
    const pct=st.total? Math.round(st.done/st.total*100):0;
    const on=PLAN.open.indexOf(encodeURIComponent(I.name))>=0;
    const ic=locked? '<span class="pt-lock">🔒</span>' : ringHTML(pct,44,I.ico,I.img);
    const meta=locked? 'задач для твоего класса пока нет' : (st.done+' из '+st.total+' · '+pct+'%');
    return `<button type="button" class="pt-isl" aria-expanded="${on}" onclick="planOpenIsland('${encodeURIComponent(I.name)}')">
        <span class="pt-isl-ic">${ic}</span>
        <span class="pt-isl-b">
          <span class="pt-isl-nm">${esc(I.name)}</span>
          <span class="pt-isl-meta">${meta}</span>
          ${locked?'':'<span class="pt-bar"><i style="--w:'+(pct/100).toFixed(3)+'"></i></span>'}
        </span>
        <span class="pt-chev">${on?'▾':'▸'}</span>
      </button>` + (on? dashExpanded(I) : '');
  }).join('');
  const tools=`<div class="pt-tools">
      <button type="button" class="pt-tool" onclick="worldToggle()">${worldOpen()?'🌍 вернуть задачи своего класса':'🔒 открыть весь мир'}</button>
      <button type="button" class="pt-tool" onclick="planOpenAll()">развернуть все острова</button>
      ${PLAN.open.length? '<button type="button" class="pt-tool" onclick="planCloseAll()">свернуть</button>':''}
    </div>
    <div class="pt-note">${worldOpen()?'Сейчас открыты задачи всех классов. «Вернуть задачи своего класса» оставит только твои.':'Показаны задачи твоего класса.'}</div>`;
  return `<div class="pt-h">Острова</div>` + islRows + tools + `<div class="pt-spacer"></div>`;
};
function renderPath(){
  /* 1–4 класс идут своим маршрутом: у каждого класса свой мир и своя форма
     пути, шаги собраны из уроков и задач именно его класса. */
  if(typeof isJunior==='function' && isJunior() && typeof window.renderPathJunior==='function'){
    return window.renderPathJunior();
  }
  pdCss(); ptCss();
  const pool=taskPool();
  const doneN=pool.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const pctAll=pool.length? Math.round(doneN/pool.length*100):0;
  const next = pool.filter(t=>!DB.tasks[t.id]||!DB.tasks[t.id].done)[0]
            || window.ARH_TASKS.filter(t=>taskFits(t)&&(!DB.tasks[t.id]||!DB.tasks[t.id].done))[0];
  const s=document.getElementById('screen');
  const rank=rankName();
  const heroName=esc(DB.profile?DB.profile.name:'');

  /* 1. Кто я и сколько сделано — одной строкой, без лишней высоты */
  const hero=`<div class="pt-hero">
      ${ringHTML(pctAll, 76, pctAll+'%')}
      <div style="flex:1;min-width:0">
        <div class="pt-kick">Острова Познания</div>
        <div class="pt-name">${heroName||'Исследователь'} <span class="rank-badge">${esc(rank)}</span></div>
        <div class="pt-meta">Решено <b>${doneN}</b> из ${pool.length}${isJunior()?' в начальной школе':' на карте'}</div>
      </div>
      <div class="pt-fire"><b>${DB.streak||0}</b><span>серия</span></div>
    </div>`;

  /* 2. Острова — вертикальным списком. Раньше это была лента с прокруткой вбок:
     половина карточки уходила за край, и было не понять, что там ещё есть. */
  const islands=ISLANDS.filter(islandVisible);
  const islRows=islands.map(function(I){
    const st=islStats(I.name), locked=st.total===0;
    const pct=st.total? Math.round(st.done/st.total*100):0;
    const on=PLAN.open.indexOf(encodeURIComponent(I.name))>=0;
    const ic=locked? '<span class="pt-lock">🔒</span>' : ringHTML(pct,44,I.ico,I.img);
    const meta=locked? 'задач для твоего класса пока нет' : (st.done+' из '+st.total+' · '+pct+'%');
    return `<button type="button" class="pt-isl" aria-expanded="${on}" onclick="planOpenIsland('${encodeURIComponent(I.name)}')">
        <span class="pt-isl-ic">${ic}</span>
        <span class="pt-isl-b">
          <span class="pt-isl-nm">${esc(I.name)}</span>
          <span class="pt-isl-meta">${meta}</span>
          ${locked?'':'<span class="pt-bar"><i style="--w:'+(pct/100).toFixed(3)+'"></i></span>'}
        </span>
        <span class="pt-chev">${on?'▾':'▸'}</span>
      </button>` + (on? dashExpanded(I) : '');
  }).join('');

  /* 3. Служебные переключатели — вниз, под содержимое. Вверху они сбивали
     ребёнка: он открывал экран и первым делом видел «весь мир открыт». */
  const tools=`<div class="pt-tools">
      <button type="button" class="pt-tool" onclick="worldToggle()">${worldOpen()?'🌍 вернуть задачи своего класса':'🔒 открыть весь мир'}</button>
      <button type="button" class="pt-tool" onclick="planOpenAll()">развернуть все острова</button>
      ${PLAN.open.length? '<button type="button" class="pt-tool" onclick="planCloseAll()">свернуть</button>':''}
    </div>
    <div class="pt-note">${worldOpen()?'Сейчас открыты задачи всех классов. «Вернуть задачи своего класса» оставит только твои.':'Показаны задачи твоего класса.'}</div>`;

  /* 4. Главное действие — закреплено над вкладками, в зоне большого пальца.
     Бесконечная пульсация убрана: движение ради движения. */
  const cta = next
    ? `<div class="pt-cta go"><button class="btn" onclick="go('task-${next.id}')">
         <span class="t1">🎯 Продолжить</span><span class="t2">${esc(next.title)}</span></button></div>`
    : `<div class="pt-cta go"><button class="btn" onclick="go('library')">
         <span class="t1">🏆 Все задачи решены</span><span class="t2">выбрать что-то из банка задач</span></button></div>`;

  const legend=`<div class="pt-arch">
      <div class="pt-arch-row">
        <img class="pt-arch-ava" src="img/archimedes.jpg" width="52" height="52" alt="Архимед" decoding="async">
        <div>
          <div class="pt-arch-who">◈ Архимед</div>
          <div class="pt-arch-say">${esc(pathSay(doneN,pool.length))}</div>
        </div>
      </div>
      <button type="button" class="pt-arch-link" onclick="go('legend')">
        <span class="pt-arch-ic">📜</span>
        <span class="pt-arch-t"><b>Легенда об Архимеде</b><span>кто он и откуда острова</span></span>
        <span class="pt-arch-arr">→</span>
      </button>
    </div>`;

  s.innerHTML=hero
    + legend
    + `<div class="pt-h">Острова</div>` + islRows
    + tools
    + (planDash()? `<div class="pt-h">Личный маршрут</div>` + planDash() : '')
    + `<div class="pt-spacer"></div>`
    + cta;
  requestAnimationFrame(function(){
    document.querySelectorAll('.ring-fg').forEach(function(el){
      el.style.strokeDashoffset=getComputedStyle(el.parentNode).getPropertyValue('--off');
    });
  });
  hud();
}
/* ---------- ОСТРОВ ---------- */
function renderIsland(name){
  const s=document.getElementById('screen');
  const ts=tasksFit(window.ARH_TASKS.filter(t=>t.island===name)).sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id));
  let prevCls=null;
  const rows=ts.map(t=>{
    const cl=clsKey(t);
    let head='';
    if(cl!==prevCls){
      prevCls=cl;
      head=`<div style="margin:14px 2px 4px;color:var(--brass);font-weight:bold;font-size:12.5px;letter-spacing:.05em">${esc(cl? clsFromKey(cl):'Общие задачи')}</div>`;
    }
    const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
    return head+`<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')">
      <span class="st">${done?'✅':'🔒'}</span>
      <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${esc(themeOf(t))}</div></div>
      <span class="lvl">ур. ${t.diff}</span></div>`;
  }).join('');
  const meta=ISLANDS.find(i=>i.name===name)||{ico:'🗺',name:name};
  const tip=name==='Начальная школа' ? 'Выбирай задачу — Архимед поможет, если что-то непонятно 😊'
    : 'выбирай задачу — помни: сначала ищи знакомый приём';
  s.innerHTML=`<button class="btn ghost" onclick="go('path')">← Путь</button>
    <h2>${meta.ico} ${esc(meta.name)}</h2>
    <div class="small" style="margin-bottom:8px">${islStats(name).done}/${islStats(name).total} решено · ${tip}</div>${rows}`;
  hud();
}
/* ---------- БАНК ЗАДАЧ ---------- */
let LB={ island:'all', status:'all', cls:'all', open:{} };
function clsHeadRow(label){ return `<div style="margin:12px 2px 4px;color:var(--brass);font-weight:bold;font-size:12.5px;letter-spacing:.05em">${esc(label)}</div>`; }
function thClean(th){ return th.replace(/^\d{1,2}(?:\s*[-–—]\s*\d{1,2})?\s*кл(?:асс)?\s*·\s*/,''); }
function secRows(items){
  const by={};
  items.forEach(t=>{ const k=clsKey(t)||'__none'; (by[k]=by[k]||[]).push(t); });
  const order=Object.keys(by).sort((a,b)=>(a==='__none'?999:+a)-(b==='__none'?999:+b));
  return order.map(k=>{
    const arr=by[k].slice().sort((a,b)=>a.diff-b.diff||a.id.localeCompare(b.id));
    const label=k==='__none' ? 'Общие задачи' : clsFromKey(k);
    const byTh={};
    arr.forEach(t=>{ const th=thClean(themeOf(t))||themeOf(t); (byTh[th]=byTh[th]||[]).push(t); });
    const rows=Object.keys(byTh).map(th=>`<div class="small" style="margin:7px 4px 4px;color:var(--muted);font-size:11px;letter-spacing:.08em;text-transform:uppercase">${esc(th)}</div>`+
      byTh[th].map(taskRow).join('')).join('');
    return clsHeadRow(label)+rows;
  }).join('');
}
function taskRow(t){
  const done=!!(DB.tasks[t.id]&&DB.tasks[t.id].done);
  return `<div class="task-row ${done?'done':''}" onclick="go('task-${t.id}')"><span class="st">${done?'✅':'🔒'}</span>
    <div class="ti"><div class="tt">${esc(t.title)}</div><div class="td">${esc(themeOf(t))}</div></div>
    <span class="lvl">ур. ${t.diff}</span></div>`;
}
function libIsland(){ try{ if(typeof isJunior==='function'&&isJunior()) return 'Начальная школа'; }catch(e){}
  return LB.island==='all'? 'all' : LB.island; }
function renderLibrary(){
  const s=document.getElementById('screen');
  const junior=typeof isJunior==='function'&&isJunior();
  const islands=ISLANDS.filter(islandVisible);
  const status=LB.status||'all';
  const statFilter=t=> status==='all'? true : status==='todo'? !(DB.tasks[t.id]&&DB.tasks[t.id].done) : !!(DB.tasks[t.id]&&DB.tasks[t.id].done);
  const clsFilter=t=> LB.cls==='all' || clsKey(t)===LB.cls;
  const selIsl=libIsland();
  const allFit = tasksFit(window.ARH_TASKS).filter(t=>islandVisible({name:t.island})).filter(statFilter).filter(clsFilter);
  const doneFit=allFit.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
  const todoFit=allFit.length-doneFit;
  const statBadge = status==='all'? `всего ${allFit.length}` : status==='todo'? `осталось ${todoFit}` : `решено ${doneFit}`;
  // доступные классы для чипов — из задач текущего выбора
  const clsSource = selIsl==='all'
    ? tasksFit(window.ARH_TASKS).filter(t=>islandVisible({name:t.island})).filter(statFilter)
    : tasksFit(window.ARH_TASKS.filter(t=>t.island===selIsl)).filter(statFilter);
  const clsOpts=[...new Set(clsSource.map(clsKey).filter(Boolean))].sort((a,b)=>+a.split('-')[0]-+b.split('-')[0]);
  const clsChips = clsOpts.length
    ? `<div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
        <button class="chip fb ${LB.cls==='all'?'on':''}" onclick="libPick('cls','all')">Все классы</button>
        ${clsOpts.map(c=>`<button class="chip fb ${LB.cls===c?'on':''}" onclick="libPick('cls','${c}')">${clsFromKey(c)}</button>`).join('')}
      </div>` : '';
  const tabAll = junior? [] : [{
    key:'all', ico:'🗺', name:'Все',
    items: allFit,
    done: doneFit, total: allFit.length }];
  const tabIsls = islands.map(I=>{
    const items=tasksFit(window.ARH_TASKS.filter(t=>t.island===I.name&&statFilter(t)));
    return { key:I.name, ico:I.ico, img:I.img, name:I.name, items, done: items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length, total: items.length };
  }).filter(g=>g.total>0);
  const tabs=[...tabAll, ...tabIsls];
  const tabHTML=tabs.map(g=>{
    const on = selIsl===g.key;
    const p=g.total? Math.round(g.done/g.total*100):0;
    return `<button class="btab ${on?'on':''}" onclick="libPick('island','${g.key}')">
      <span class="bt-ico">${g.img?`<img src="${g.img}" alt="" style="width:26px;height:26px;object-fit:contain;border-radius:50%;display:block">`:g.ico}</span>
      <span class="bt-name">${g.key==='all'? 'Все': esc(g.name)}</span>
      <span class="bt-bar"><i style="width:${p}%"></i></span>
    </button>`;}).join('');
  const groups = (selIsl==='all'? islands : islands.filter(I=>I.name===selIsl))
    .map(I=>({ I, items: tasksFit(window.ARH_TASKS.filter(t=>t.island===I.name&&statFilter(t)&&clsFilter(t)))
      .sort((a,b)=>clsSort(a)-clsSort(b)||a.diff-b.diff||a.id.localeCompare(b.id)) }))
    .filter(g=>g.items.length);
  const content = selIsl!=='all'
    ? (()=>{ const g=groups[0]; if(!g) return '';
        const gd=g.items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
        return `<div class="book-subj-head">
            <span class="bsh-ico">${g.I.ico}</span>
            <span><b>${esc(g.I.name)}</b><br>
            <span class="small" style="color:var(--muted)">${esc(g.I.dsc)} · ${gd}/${g.items.length} решено</span></span>
          </div>${secRows(g.items)}`; })()
    : groups.map((g,i)=>{
        const open = LB.open[g.I.name]===true || (LB.open[g.I.name]===undefined && i===0);
        const gd=g.items.filter(t=>DB.tasks[t.id]&&DB.tasks[t.id].done).length;
        return `<div class="book-sec">
          <div class="bs-head" onclick="libToggle('${esc(g.I.name)}')">
            <span class="bs-ico">${g.I.ico}</span>
            <span style="flex:1;text-align:left"><b>${esc(g.I.name)}</b>
              <span class="small" style="color:var(--muted);display:block">${esc(g.I.dsc)}</span></span>
            <span class="pr2">${gd}/${g.items.length} <i class="caret ${open?'down':''}">▸</i></span>
          </div>
          ${open? secRows(g.items) : ''}
        </div>`;}).join('');
  s.innerHTML=`<h2>📚 Банк задач <span class="small">(${statBadge})</span></h2>
    <div class="small" style="margin-bottom:8px">Все задачи по темам и классам — от простых к сложным. Приёмы сначала объясняет Архимед в «Пути».</div>
    <div class="btabs" style="margin-bottom:10px">${tabHTML}</div>
    ${clsChips}
    <div style="display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap">
      ${[['all','Все задачи'],['todo','🔒 Осталось решить'],['done','✅ Решено']].map(([v,lab])=>
        `<button class="chip fb ${status===v?'on':''}" onclick="libPick('status','${v}')">${lab}</button>`).join('')}
    </div>
    ${content}`;
  hud();
}
function libPick(k,v){ LB[k]=v; renderLibrary(); }
function libToggle(isl){
  LB.open[isl]= !(LB.open[isl]===true);
  renderLibrary();
}
/* ---------- вспомогательное ---------- */
function toast(t){ const el=document.getElementById('toast'); el.textContent=t; el.classList.add('show');
  clearTimeout(toast._t); toast._t=setTimeout(()=>el.classList.remove('show'),2000); }
function showConfetti(){ const d=document.createElement('div'); d.className='confetti';
  for(let i=0;i<70;i++){ const p=document.createElement('span'); p.className='confetti-piece';
    p.style.left=Math.random()*100+'%'; p.style.background=COLORS[i%COLORS.length];
    p.style.animationDelay=Math.random()*0.6+'s'; p.style.animationDuration=1.4+Math.random()*1.3+'s'; d.appendChild(p); }
  document.body.appendChild(d); setTimeout(()=>d.remove(),3800); }
