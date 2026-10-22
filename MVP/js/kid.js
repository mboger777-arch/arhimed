/* АРХИМЕД MVP · kid.js — код ребёнка и связь с приложением родителя.
   При первом входе ребёнок получает код вида ARH-XXXX-XX: по нему родитель
   открывает /MVP/родитель/ и видит отчёт. Прогресс уезжает на сервер (шлюз),
   оттуда же приходят лимит времени и заметки родителя. */
'use strict';

const KID_KEY = 'arh_kid_v1';
function kidSaveState(){
  try{
    const k = kidSt();
    localStorage.setItem(KID_KEY, JSON.stringify({code: k.code || '', token: k.token || '',
      dpin: k.dpin || 0, linked: (k.linked == null ? 1 : k.linked),
      catAt: k.catAt || 0, catClass: k.catClass || '',
      created: k.created || 0, introShown: k.introShown || 0, noteSeen: k.noteSeen || 0,
      noteToast: k.noteToast || 0, limitDay: k.limitDay || null,
      limits: k.limits || {}, notes: k.notes || [], assigned: k.assigned || null,
      assignSeen: k.assignSeen || 0, srvUpdated: k.srvUpdated || 0}));
  }catch(e){}
}
function kidLoadState(){
  try{
    const s = JSON.parse(localStorage.getItem(KID_KEY) || 'null');
    if (s && s.code && s.token) DB.kid = Object.assign({}, DB.kid || {}, s);
  }catch(e){}
}
function kidApiUrl(){
  const p = location.pathname || '';
  const i = p.indexOf('/MVP/');
  return (i >= 0 ? p.slice(0, i) : '') + '/api/kid';
}
function kidSt(){ DB.kid = DB.kid || {}; return DB.kid; }
function kidReady(){ const k = kidSt(); return !!(k.code && k.token); }
/* «Гость» — профиль, который приложение само заводит, когда урок открыли по ссылке #lesson-N без входа
   (MVP/index.html). Ему код для родителя не нужен: 22.10.2026 на сервере нашлось 426 пустых кодов —
   от таких ссылок и от прежнего бага знакомства. Старые гостевые профили флага не имеют: имя «Гость» без createdAt. */
function kidGuest(){ const п = DB.profile; return !!(п && (п.guest || (п.name === 'Гость' && !п.createdAt))); }
function kidCode(){ const k = kidSt(); return k.code || ''; }

function kidFetch(payload, timeoutMs){
  const ctl = (typeof AbortController !== 'undefined') ? new AbortController() : null;
  const t = setTimeout(() => { try{ if (ctl) ctl.abort(); }catch(e){} }, timeoutMs || 12000);
  return fetch(kidApiUrl(), {method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload), cache: 'no-store', signal: ctl ? ctl.signal : undefined})
    .then(r => r.json()).finally(() => clearTimeout(t));
}
function kidPost(payload){ return kidFetch(payload, 12000); }

/* --- 1. код создаётся при первом входе --- */
function kidEnsure(){
  const k = kidSt();
  if (kidReady() || k.busy) return Promise.resolve(k);
  /* Пока идёт знакомство, кода нет. Раньше он заводился сразу при открытии и показывался
     на экране знакомства, а после «В путь» сундук нового ученика давал ДРУГОЙ код:
     родитель, записавший первый, входил в пустой кабинет, а на сервере копились пустые записи. */
  if (!DB.profile || kidGuest()) return Promise.resolve(k);
  k.busy = 1;
  return kidPost({act: 'new'}).then(r => {
    delete k.busy;
    if (r && r.ok && r.code && r.token){
      k.code = r.code; k.token = r.token; k.created = Date.now();
      try{ save(); }catch(e){}
      kidSaveState();
      kidRender();
      kidPush(1);
    }
    return k;
  }).catch(() => { delete k.busy; return k; });
}

/* --- 2. снимок прогресса: только то, что нужно отчёту --- */
function kidSnapshot(short){
  const days = {};
  Object.keys(DB.days || {}).sort().slice(short ? -45 : -120).forEach(key => {
    const r = DB.days[key] || {};
    days[key] = {min: r.min || 0, tasks: r.tasks || 0, wrong: r.wrong || 0,
      lessonSteps: r.lessonSteps || 0, lessons: r.lessons || 0};
  });
  const tasks = {};
  let ids = Object.keys(DB.tasks || {});
  ids.sort((a, b) => ((DB.tasks[b] || {}).ts || 0) - ((DB.tasks[a] || {}).ts || 0));
  ids.slice(0, 1500).forEach(id => {
    const t = DB.tasks[id] || {};
    tasks[id] = {done: t.done ? 1 : 0, tries: t.tries || 0, wrong: t.wrong || 0, ts: t.ts || 0};
  });
  const lessons = {};
  Object.keys(DB.lessons || {}).forEach(id => {
    const r = DB.lessons[id] || {};
    lessons[id] = {done: !!r.done, stars: r.stars || 0, tasks: (r.tasks || []).length};
  });
  const events = (DB.events || []).slice(short ? -60 : -300).map(e => ({ts: e.ts, type: e.type, id: e.id, ok: e.ok, stars: e.stars, steps: e.steps}));
  return {profile: DB.profile || {}, points: DB.points || 0, streak: DB.streak || 0, best: DB.best || 0,
    totalMin: DB.totalMin || 0,
    today: {date: (DB.today || {}).date || null, minutes: (DB.today || {}).minutes || 0},
    tours: (DB.tours || []).slice(-5),
    days: days, tasks: tasks, lessons: lessons, events: events,
    sentAt: Date.now(), build: (window.ARH_BUILD || '')};
}

/* --- 2б. каталог класса для кабинета родителя ---
   Родителю незачем грузить весь банк: семикласснику не нужны задачи первого
   класса. Поэтому список того, что открыто ИМЕННО этому ребёнку, считает
   само приложение — его же пулами — и отправляет отдельным полем. Кабинет
   по нему и отчёт строит, и задания выдаёт.
   Поле тяжелее прогресса, поэтому уезжает не при каждой синхронизации. */
function kidCatalog(){
  try{
    /* Отбираем по классу явно, а не через taskPool(): у ребёнка мир открыт
       весь (worldOpen), и это правильно — пусть лезет куда хочет. Но родителю
       семиклассника задачи первого класса ни в отчёте, ни в выдаче заданий
       не нужны, поэтому здесь берём только то, что подходит его классу. */
    const о = (typeof openClassRange === 'function') ? openClassRange() : [1, 9];
    const поКлассу = t => {
      if (typeof taskClassRange !== 'function') return true;
      const r = taskClassRange(t);
      return !(r[1] < о[0] || r[0] > о[1]);
    };
    /* Темы и острова повторяются сотни раз («…словарные слова» у 134 задач),
       поэтому едут словарём, а в задаче остаётся номер. Каталог шестиклассника
       так ужимается со 126 КБ до полутора десятков. */
    const темы = [], тК = new Map(), острова = [], оК = new Map();
    const ном = (массив, карта, знач) => {
      if (!карта.has(знач)){ карта.set(знач, массив.length); массив.push(знач); }
      return карта.get(знач);
    };
    const задачи = (window.ARH_TASKS || []).filter(поКлассу)
      .map(t => ({id: t.id, t: t.title,
                  i: ном(острова, оК, t.island || ''),
                  th: ном(темы, тК, (typeof themeOf === 'function' ? themeOf(t) : (t.theme || ''))),
                  d: t.diff || 1}));
    const уроки = (typeof lessonPool === 'function' ? lessonPool()
        : (window.ARH_LESSONS || []).filter(L => !L.hidden))
      .map(L => ({id: L.id, t: L.title, ic: L.ico || '', s: L.src || '',
                  st: (L.explain || []).length}));
    if (!задачи.length) return null;
    return {class: String((DB.profile || {}).klass || ''),
            themes: темы, islands: острова,
            tasks: задачи, lessons: уроки, at: Date.now()};
  }catch(e){ return null; }
}
/* Каталог меняется только при смене класса или обновлении банков — шлём его
   при первой отправке и раз в сутки, а не каждые пятнадцать секунд. */
function kidCatalogDue(){
  const k = kidSt();
  return !k.catAt || (Date.now() - k.catAt > 86400000)
      || k.catClass !== String((DB.profile || {}).klass || '');
}

/* --- 3. отправка на сервер: не чаще раза в 15 секунд --- */
let _kidPushAt = 0, _kidPushBusy = false;
function kidPush(force){
  if (!kidReady()) { kidEnsure(); return; }
  const st = kidSt();
  if (!st.dpin || st.linked === 0) return;      /* до привязки синхронизировать нечего */
  const now = Date.now();
  if (!force && now - _kidPushAt < 15000) return;
  if (_kidPushBusy) return;
  _kidPushAt = now; _kidPushBusy = true;
  const k = kidSt();
  const тело = {act: 'sync', code: k.code, token: k.token, data: kidSnapshot()};
  const кат = kidCatalogDue() ? kidCatalog() : null;
  if (кат) тело.catalog = кат;
  kidPost(тело).then(r => {
    _kidPushBusy = false;
    if (r && r.ok){
      if (кат){ k.catAt = Date.now(); k.catClass = кат.class; kidSaveState(); }
      kidTake(r); return;
    }
    if (r && r.err === 'unlinked'){ kidSt().linked = 0; kidSaveState(); kidUnlinkedScreen(); }
  }).catch(() => { _kidPushBusy = false; });
}

/* --- 4. что прислал родитель: лимит и заметки --- */
function kidTake(r){
  const k = kidSt();
  if (!r) return;
  if (r.limits) k.limits = r.limits;
  if (r.notes) k.notes = r.notes;
  if (r.assigned !== undefined) k.assigned = r.assigned || null;
  if (typeof r.updated === 'number') k.srvUpdated = r.updated;
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
  kidNoteBadge();
  /* новая заметка родителя — показываем во весь экран поверх всего */
  if (typeof noteFullCheck === 'function') setTimeout(noteFullCheck, 400);
}
function kidPull(){
  if (!kidReady()) { kidEnsure(); return; }
  const k = kidSt();
  if (!k.dpin || k.linked === 0) return;
  kidPost({act: 'take', code: k.code, token: k.token}).then(r => {
    if (r && r.ok){ kidTake(r); return; }
    if (r && r.err === 'unlinked'){ kidSt().linked = 0; kidSaveState(); kidUnlinkedScreen(); }
  }).catch(() => {});
}

/* --- 5. лимит времени --- */
function kidLimit(){ const k = kidSt(); return +((k.limits || {}).minutes || 0); }
function kidTodayMin(){ return +((DB.today || {}).minutes || 0); }
function kidLimitOver(){ const lim = kidLimit(); return lim > 0 && kidTodayMin() >= lim; }
function kidLimitCheck(){
  if (!kidLimitOver()) return;
  const day = new Date().toDateString();
  if (kidSt().limitDay === day) return;
  kidSt().limitDay = day;
  try{ save(); }catch(e){}
  kidSaveState();
  try{ toast('На сегодня лимит занятий выполнен — родитель увидит прогресс'); }catch(e){}
}

/* --- 6. заметки родителя --- */
function kidNotes(){ return (kidSt().notes || []).slice(-8).reverse(); }
function kidNoteNew(){
  const seen = kidSt().noteSeen || 0;
  return kidNotes().filter(n => (n.ts || 0) > seen);
}
function kidIntroDone(){
  kidSt().introShown = 1;
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
}
function kidNoteSeen(){
  const n = kidNotes()[0];
  if (n) kidSt().noteSeen = n.ts || Date.now();
  try{ save(); }catch(e){}
  kidSaveState();
  kidRender();
}
function kidNoteBadge(){
  const n = kidNoteNew();
  if (!n.length) return;
  const last = kidSt().noteToast;
  if (last === n[0].ts) return;
  kidSt().noteToast = n[0].ts;
  try{ save(); }catch(e){}
  kidSaveState();
  try{ toast('Заметка от родителя: ' + String(n[0].text).slice(0, 60)); }catch(e){}
}

/* --- 7. полоска над экраном: код, лимит, заметки --- */
function kidCopyCode(){
  const code = kidCode();
  try{
    navigator.clipboard.writeText(code).then(() => toast('Код скопирован: ' + code), () => toast(code));
  }catch(e){ toast(code); }
}
function kidCodeCard(){
  const k = kidSt();
  if (!k.code) return kidGuest() ? `<div class="card"><div class="small">Ты зашёл гостем. Чтобы родитель видел твои занятия, выйди и назови себя — появится код для родителя.</div></div>`
    : `<div class="card"><div class="small">Код для родителя появится, когда устройство будет в сети.</div></div>`;
  const lim = kidLimit(), mins = kidTodayMin();
  return `<div class="card" style="margin-bottom:10px">
    <div class="small" style="color:var(--muted);font-size:11.5px">Код для родителя · приложение «Родитель»</div>
    <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:6px">
      <b style="font-family:Georgia,serif;font-size:22px;color:var(--brass);letter-spacing:.08em">${esc(k.code)}</b>
      <button class="btn ghost" style="min-height:36px;padding:6px 12px" onclick="kidCopyCode()">Скопировать</button>
    </div>
    <div class="small" style="margin-top:8px">Родитель открывает <a href="parent/" style="color:var(--brass)">123.teramont.pro/MVP/parent/</a>,
      вводит этот код, придумывает PIN из 4 цифр и нажимает «Ввод». Тогда ему будет виден отчёт о занятиях.</div>
    <div class="rod-row" style="margin-top:8px">
      <a class="btn ghost" style="text-decoration:none;display:inline-flex;align-items:center;min-height:38px;padding:7px 12px" href="parent/">Открыть приложение родителя →</a>
    </div>
    ${lim ? `<div class="small" style="margin-top:8px">Лимит занятий на день: <b>${lim} мин</b> · сегодня ${mins} мин${mins >= lim ? ' — лимит выполнен' : ''}</div>` : ''}
  </div>`;
}
/* Что сейчас выдано родителем, с отметкой решённых. */
function kidAssigned(){
  try{
    const a = (kidSt().assigned || {}).list;
    if (!Array.isArray(a) || !a.length) return [];
    return a.map(з => ({id: з.id, title: з.title,
      решена: !!(DB.tasks && DB.tasks[з.id] && DB.tasks[з.id].done)}));
  }catch(e){ return []; }
}
function kidOpenAssigned(id){
  try{ if (typeof openTask === 'function') openTask(id, 'path'); }catch(e){}
}
function kidAssignSeen(){
  const k = kidSt();
  k.assignSeen = (k.assigned || {}).ts || Date.now();
  kidSaveState(); kidRender();
}

function kidRender(){
  const host = document.querySelector('.wrap');
  if (!host) return;
  let el = document.getElementById('kidBanner');
  const k = kidSt();
  const notes = kidNoteNew();
  const parts = [];
  /* при первом входе сразу показываем код: родителю его надо увидеть и записать */
  if (k.code && !k.introShown && DB.profile){
    parts.push(`<div class="card" style="border-color:rgba(255,215,106,.6);margin-bottom:10px">
      <div class="small" style="color:var(--brass);font-size:11.5px">🎁 Твой код для родителя</div>
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:4px">
        <b style="font-family:Georgia,serif;font-size:23px;color:var(--brass);letter-spacing:.08em">${esc(k.code)}</b>
        <button class="btn ghost" style="min-height:36px;padding:6px 12px" onclick="kidCopyCode()">Скопировать</button>
      </div>
      <div class="small" style="margin-top:8px">Покажи код родителю: он откроет
        <a href="parent/" style="color:var(--brass)">123.teramont.pro/MVP/parent/</a>, введёт код,
        придумает свой PIN и нажмёт «Ввод» — увидит отчёт о твоих занятиях.</div>
      <div class="rod-row" style="margin-top:8px">
        <a class="btn ghost" style="text-decoration:none;display:inline-flex;align-items:center;min-height:38px;padding:7px 12px" href="parent/">Я родитель — открыть →</a>
        <button class="btn" style="min-height:38px;padding:7px 14px" onclick="kidIntroDone()">Понятно</button>
      </div>
    </div>`);
  }
  if (notes.length){
    parts.push(`<div class="card" style="border-color:rgba(217,164,65,.55);margin-bottom:10px">
      <div class="small" style="color:var(--brass);font-size:11.5px">📩 От родителя · ${pvDate(notes[0].ts)}</div>
      <div style="font-size:14.5px;line-height:1.5;margin-top:4px">${esc(notes[0].text)}</div>
      <button class="btn ghost" style="margin-top:8px;min-height:36px;padding:6px 12px" onclick="kidNoteSeen()">Понятно</button>
    </div>`);
  }
  /* Родитель может попросить решить конкретные задачи. Показываем их списком
     с отметкой о решённых: ребёнку видно, что осталось, а не просто «есть
     задание». Карточка уходит, когда всё решено или ребёнок её закрыл. */
  const зад = kidAssigned();
  if (зад.length && k.assignSeen !== (k.assigned || {}).ts){
    const осталось = зад.filter(з => !з.решена).length;
    parts.push(`<div class="card" style="border-color:rgba(217,164,65,.55);margin-bottom:10px">
      <div class="small" style="color:var(--brass);font-size:11.5px">🎯 Родитель просит решить · ${pvDate((k.assigned||{}).ts)}</div>
      <div style="margin-top:6px;display:flex;flex-direction:column;gap:6px">
        ${зад.map(з => `<div style="display:flex;align-items:center;gap:8px">
          <span style="color:${з.решена ? 'var(--ok,#7fc4a6)' : 'var(--brass)'};width:16px">${з.решена ? '✓' : '•'}</span>
          <button class="btn ghost" style="flex:1;text-align:left;justify-content:flex-start;min-height:36px;padding:6px 10px;
            ${з.решена ? 'opacity:.6' : ''}" onclick="kidOpenAssigned('${esc(з.id)}')">${esc(з.title || з.id)}</button>
        </div>`).join('')}
      </div>
      <div class="small" style="margin-top:8px">${осталось ? ('Осталось: ' + осталось) : 'Всё решено — молодец!'}</div>
      <button class="btn ghost" style="margin-top:8px;min-height:36px;padding:6px 12px" onclick="kidAssignSeen()">${осталось ? 'Скрыть' : 'Понятно'}</button>
    </div>`);
  }
  if (kidLimitOver()){
    parts.push(`<div class="card" style="border-color:rgba(232,106,90,.5);margin-bottom:10px">
      <div class="small" style="color:var(--danger);font-size:11.5px">⏱ Лимит на сегодня выполнен</div>
      <div style="font-size:14px;margin-top:4px">Занимался ${kidTodayMin()} мин из ${kidLimit()}. Можно отдохнуть — прогресс уже отправлен родителю.</div>
    </div>`);
  } else if (kidLimit()){
    parts.push(`<div class="card" style="margin-bottom:10px">
      <div class="small">⏱ Сегодня ${kidTodayMin()} мин из ${kidLimit()} — идёшь по плану.</div>
    </div>`);
  }
  if (!k.code && !kidGuest()){
    parts.push(`<div class="card" style="margin-bottom:10px"><div class="small">Код для родителя появится, когда устройство будет в сети.</div></div>`);
  }
  if (!parts.length){ if (el) el.remove(); return; }
  if (!el){
    el = document.createElement('div');
    el.id = 'kidBanner';
    const first = host.querySelector('header');
    if (first && first.nextSibling) host.insertBefore(el, first.nextSibling); else host.insertBefore(el, host.firstChild);
  }
  el.innerHTML = parts.join('');
}

/* ================= привязка устройства и вход по своему PIN ================= */
const KID_SESSION = 'arh_kid_unlocked';
const KID_UNLOCK_SEC = 180;             /* три минуты паузы вход держится (случайная перезагрузка, короткий уход), дальше — только PIN */

function kidCss(){
  if (document.getElementById('kidGateCss')) return;
  const st = document.createElement('style');
  st.id = 'kidGateCss';
  st.textContent = `
  .kg-bg { position:fixed; inset:0; z-index:148; display:flex; align-items:center; justify-content:center;
    padding:max(12px, env(safe-area-inset-top)) 12px max(12px, env(safe-area-inset-bottom));
    background:radial-gradient(120% 80% at 50% 0%, rgba(26,50,38,.97), rgba(4,9,6,.98) 62%);
    -webkit-backdrop-filter:blur(7px); backdrop-filter:blur(7px); }
  .kg-card { width:100%; max-width:440px; max-height:calc(100vh - 24px); overflow:auto; text-align:center;
    background:linear-gradient(180deg,#1a3226,#101f18); border:1px solid rgba(217,164,65,.5); border-radius:22px;
    padding:22px 18px 18px; box-shadow:0 24px 70px rgba(0,0,0,.7); }
  .kg-ico { font-size:36px; }
  .kg-kick { font-size:12px; letter-spacing:.2em; text-transform:uppercase; color:#d9a441; margin-top:6px; }
  .kg-txt { font-size:16px; line-height:1.55; color:#e8e0cc; margin:12px 0 4px; }
  .kg-row { display:flex; gap:10px; flex-wrap:wrap; margin-top:18px; }
  .kg-row .btn { flex:1 1 46%; min-height:50px; }
  `;
  document.head.appendChild(st);
}
function kidAvatar(){
  const p = DB.profile || {};
  const kind = p.gender === 'girl' ? 'girl' : 'boy';
  return `<img src="img/ava/${kind}.png?v=591" alt="" draggable="false">`;
}
function kidBound(){ const k = kidSt(); return !!(k.code && k.token && k.linked !== 0); }
function kidPinSet(){ return !!kidSt().dpin; }
function kidUnlocked(){
  try{
    const s = JSON.parse(sessionStorage.getItem(KID_SESSION) || 'null');
    return !!(s && s.code === kidCode() && (Date.now() - (s.ts || 0)) < KID_UNLOCK_SEC * 1000);
  }catch(e){ return false; }
}
function kidUnlock(){ try{ sessionStorage.setItem(KID_SESSION, JSON.stringify({code: kidCode(), ts: Date.now()})); }catch(e){} }
/* пока приложение открыто и видно — вход не сбрасываем; при возврате после паузы спросим PIN */
function kidTouch(){
  try{
    if (!kidUnlocked()) return;
    const s = JSON.parse(sessionStorage.getItem(KID_SESSION) || 'null');
    if (s && Date.now() - (s.ts || 0) > 20000) kidUnlock();
  }catch(e){}
}
function kidLock(){ try{ sessionStorage.removeItem(KID_SESSION); }catch(e){} }
function parentNoteAllowed(){ return !kidBound() || kidUnlocked(); }

/* первый вход: ребёнок придумывает свой PIN и привязывает устройство */
let _kidPendingPin = '';              /* PIN, который не успел уехать из-за связи (только в памяти) */
let _kidPendingAt = 0;
function kidBindFlow(){
  const k = kidSt();
  if (k.binding || PinPad.isOpen()) return;
  k.binding = 1;
  PinPad.set({
    avatar: kidAvatar(),
    title: 'Придумай свой PIN',
    subtitle: 'Четыре цифры — ими будешь входить в приложение',
    foot: 'Нажми «Ввод», когда набрал. Запомни PIN.'
  }).then(pin => {
    k.binding = 0;
    if (!pin) return;
    kidSendPin(pin);
  });
}
function kidSendPin(pin){
  const k = kidSt();
  _kidPendingPin = pin; _kidPendingAt = Date.now();
  kidPost({act: 'device', code: k.code, token: k.token, pin: pin}).then(r => {
      if (r && r.ok){
        k.dpin = 1; k.linked = 1; _kidPendingPin = '';
        kidSaveState(); kidUnlock(); kidRender();
        kidPush(1); kidPull();
        try{ toast('PIN создан — запомни его'); }catch(e){}
        if (!k.introShown) setTimeout(() => { try{ kidRender(); }catch(e){} }, 300);
        return;
      }
      if (r && r.err === 'pinset'){ k.dpin = 1; kidSaveState(); kidUnlock(); kidRender(); _kidPendingPin = ''; return; }
      if (r && r.err === 'unlinked'){ kidUnlinkedScreen(); return; }
      try{ toast('Не получилось сохранить PIN — попробуем снова, когда появится связь'); }catch(e){}
    }).catch(() => {
      try{ toast('Нет связи. PIN запомнен — отправим, когда интернет вернётся'); }catch(e){}
    });
}

/* вход: только свой PIN */
function kidLockScreen(){
  if (PinPad.isOpen()) return;
  const p = DB.profile || {};
  PinPad.ask({
    avatar: kidAvatar(),
    title: 'Привет, ' + (p.name || 'друг') + '!',
    subtitle: 'Свой PIN — четыре цифры, потом «Ввод»',
    foot: 'Забыл PIN? <span class="pp-link" onclick="kidForgotPin()">Создать новый код</span>',
    verify: pin => kidPost({act: 'enter', code: kidCode(), pin: pin}).then(r => {
      if (r && r.ok){ kidUnlock(); kidTake(r); kidPush(1); return true; }
      if (r && r.err === 'pin') return 'Не подошёл. Попробуй ещё';
      if (r && r.err === 'blocked') return 'Слишком много попыток. Подожди ' + Math.ceil((r.wait || 600) / 60) + ' мин.';
      if (r && r.err === 'unlinked'){ setTimeout(kidUnlinkedScreen, 60); return 'Устройство отвязано родителем'; }
      return 'Нет связи с сервером';
    })
  }).then(pin => { if (pin) kidRender(); });
}

/* устройство отвязали из приложения родителя */
function kidUnlinkedScreen(){
  kidCss();
  if (document.getElementById('kidUnlinked')) return;
  kidLock();
  const el = document.createElement('div');
  el.id = 'kidUnlinked'; el.className = 'kg-bg';
  el.innerHTML = `<div class="kg-card">
    <div class="kg-ico">🔓</div>
    <div class="kg-kick">Устройство отвязано</div>
    <div class="kg-txt">Родитель отвязал это устройство. Прогресс на нём сохранён.
      Привяжись заново своим PIN или создай новый код.</div>
    <div class="kg-row">
      <button type="button" class="btn" onclick="kidRebind()">Привязать заново</button>
      <button type="button" class="btn ghost" onclick="kidNewCode()">Создать новый код</button>
    </div>
  </div>`;
  document.body.appendChild(el);
}
function kidUnlinkedDone(){ const el = document.getElementById('kidUnlinked'); if (el) el.remove(); }

/* привязка заново тем же PIN (код и заметки родителя сохраняются) */
function kidRebind(){
  PinPad.ask({
    avatar: kidAvatar(),
    title: 'Привязка заново',
    subtitle: 'Свой PIN — четыре цифры, потом «Ввод»',
    cancel: true,
    foot: 'Код и заметки родителя останутся прежними',
    verify: pin => kidPost({act: 'rebind', code: kidCode(), pin: pin}).then(r => {
      if (r && r.ok){
        kidSt().token = r.token; kidSt().linked = 1; kidSt().dpin = 1;
        kidSaveState(); kidUnlock(); kidUnlinkedDone(); kidRender(); kidPush(1); kidPull();
        return true;
      }
      if (r && r.err === 'pin') return 'Не подошёл. Попробуй ещё';
      if (r && r.err === 'blocked') return 'Слишком много попыток. Подожди ' + Math.ceil((r.wait || 600) / 60) + ' мин.';
      return 'Нет связи с сервером';
    })
  });
}

/* начать с чистого листа: новый код и новый PIN (прогресс на устройстве остаётся) */
/* свой диалог вместо системного confirm — он выглядит чужеродно на планшете */
function kidAskNewCode(){
  kidCss();
  if (document.getElementById('kidAsk')) return;
  const el = document.createElement('div');
  el.id = 'kidAsk'; el.className = 'kg-bg';
  el.innerHTML = `<div class="kg-card">
    <div class="kg-ico">🔑</div>
    <div class="kg-kick">Новый код</div>
    <div class="kg-txt">Создаём новый код и новый PIN? Родителю нужно будет привязаться к нему заново.
      Прогресс на этом устройстве останется.</div>
    <div class="kg-row">
      <button type="button" class="btn" onclick="kidNewCode(1)">Да, создать</button>
      <button type="button" class="btn ghost" onclick="kidAskClose()">Отмена</button>
    </div>
  </div>`;
  document.body.appendChild(el);
}
function kidAskClose(){ const el = document.getElementById('kidAsk'); if (el) el.remove(); }
function kidNewCode(confirmed){
  if (!confirmed && typeof kidAskNewCode === 'function'){ kidAskNewCode(); return; }
  kidAskClose();
  const k = kidSt();
  k.code = ''; k.token = ''; k.dpin = 0; k.linked = 0; k.introShown = 0; k.notes = []; k.limits = {};
  k.noteSeen = 0; k.noteToast = 0; k.binding = 0; _kidPendingPin = '';
  kidSaveState(); kidLock(); kidUnlinkedDone();
  try{ localStorage.removeItem(KID_KEY); }catch(e){}
  kidEnsure().then(() => kidBindFlow());
}
function kidForgotPin(){
  if (PinPad.isOpen()) PinPad.hide();
  setTimeout(kidAskNewCode, 80);
}

/* что показать при входе: знакомство, создание PIN, замок или приложение */
function kidGate(){
  try{
    if (PinPad.isOpen()) return;
    const k = kidSt();
    if (!DB.profile) return;                      /* идёт знакомство */
    /* код ещё не пришёл (медленная сеть) — сначала дождёмся его, потом просим PIN */
    if (!k.code || !k.token){ kidEnsure(); return; }
    /* PIN был, а устройство отвязали родителем — предлагаем привязаться заново */
    if (k.dpin && k.linked === 0){ kidUnlinkedScreen(); return; }
    if (!k.dpin){
      /* PIN уже придуман, но не уехал из-за связи — повторяем сами */
      if (_kidPendingPin){
        if (Date.now() - _kidPendingAt > 8000){ _kidPendingAt = Date.now(); kidSendPin(_kidPendingPin); }
        return;
      }
      kidBindFlow();
      return;
    }
    if (!kidUnlocked()) kidLockScreen();
  }catch(e){}
}

function kidBoot(){
  kidLoadState();
  kidGate();
  kidEnsure().then(() => { kidGate(); kidPush(1); kidPull(); });
  kidRender();
  setInterval(kidPull, 60000);
  /* проверяем заметки и сами: если ребёнок только что закончил знакомство */
  setInterval(() => { kidGate(); }, 4000);
  setInterval(() => { if (document.visibilityState === 'visible') kidTouch(); }, 30000);
  ['click','keydown','touchstart','pointerdown'].forEach(ev => {
    try{ document.addEventListener(ev, kidTouch, {passive: true, capture: true}); }catch(e){}
  });
  try{
    let hiddenAt = 0;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') hiddenAt = Date.now();
      else if (hiddenAt && Date.now() - hiddenAt > KID_UNLOCK_SEC * 1000){ kidLock(); kidGate(); }
    });
  }catch(e){}
  setInterval(() => { if (typeof noteFullCheck === 'function') noteFullCheck(); }, 20000);
  setTimeout(() => { if (typeof noteFullCheck === 'function') noteFullCheck(); }, 3000);
  try{
    window.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') kidPull(); else kidPush(1);
    });
  }catch(e){}
  /* уход со страницы: обычный fetch может не успеть, отправляем маячок */
  try{
    window.addEventListener('pagehide', () => {
      if (!kidReady()) return;
      const k = kidSt();
      if (!k.dpin || k.linked === 0) return;
      let body = JSON.stringify({act: 'sync', code: k.code, token: k.token, data: kidSnapshot()});
      /* у sendBeacon лимит около 64 КБ: если снимок больше — отправляем обрезанный */
      if (body.length > 60000) body = JSON.stringify({act: 'sync', code: k.code, token: k.token, data: kidSnapshot(true)});
      let sent = false;
      try{ sent = navigator.sendBeacon(kidApiUrl(), new Blob([body], {type: 'application/json'})); }catch(e){ sent = false; }
      if (!sent){
        try{
          fetch(kidApiUrl(), {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: body, cache: 'no-store', keepalive: true}).catch(() => {});
        }catch(e){}
      }
    });
  }catch(e){}
}
