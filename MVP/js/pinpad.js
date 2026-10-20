/* АРХИМЕД · pinpad.js — экран ввода PIN для обоих приложений.
   Один и тот же вид: у ученика — свой PIN при входе, у родителя — свой.
   Цифры видны в клетках, пока не нажмут «Ввод» — можно поправить последнюю.
   Использование:
     PinPad.ask({title, subtitle, avatar, verify: async (pin)=> true | 'текст ошибки'}).then(pin=>…)
     PinPad.set({title:'Придумай PIN'}).then(pin=>…)      // с повтором
*/
'use strict';

(function(){
  const ID = 'pinPadOverlay';
  const S = {pin: '', resolve: null, opts: {}, busy: false, trap: null};

  function css(){
    let st = document.getElementById('pinPadCss');
    if (!st){
      st = document.createElement('style');
      st.id = 'pinPadCss';
      document.head.appendChild(st);
    }
    st.textContent = `
    @keyframes ppIn { from { opacity:0; transform:scale(.97) translateY(8px) } to { opacity:1; transform:none } }
    @keyframes ppShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(7px)} 60%{transform:translateX(-5px)} 80%{transform:translateX(3px)} }
    @keyframes ppBlink { 0%,100%{opacity:.35} 50%{opacity:1} }
    @keyframes ppPulse { 0%,100%{box-shadow:0 0 0 0 rgba(217,164,65,.0)} 50%{box-shadow:0 0 0 4px rgba(217,164,65,.28)} }
    .pp-bg { position:fixed; inset:0; z-index:150; display:flex; align-items:center; justify-content:center;
      padding:max(10px, env(safe-area-inset-top)) 12px max(12px, env(safe-area-inset-bottom));
      background:radial-gradient(120% 80% at 50% 0%, rgba(26,50,38,.97) 0%, rgba(4,9,6,.98) 62%);
      -webkit-backdrop-filter:blur(7px); backdrop-filter:blur(7px);
      touch-action:none; overscroll-behavior:contain; -webkit-user-select:none; user-select:none; }
    .pp-card { width:100%; max-width:400px; max-height:calc(100vh - 20px); max-height:calc(100dvh - 20px); overflow:auto; position:relative;
      background:linear-gradient(180deg,#1a3226,#101f18); border:1px solid rgba(217,164,65,.5); border-radius:22px;
      padding:20px 16px 14px; box-shadow:0 24px 70px rgba(0,0,0,.7); animation:ppIn .28s cubic-bezier(.2,.9,.25,1) both;
      touch-action:manipulation; overscroll-behavior:contain; -webkit-overflow-scrolling:touch; outline:none; }
    .pp-card::before { content:''; position:absolute; left:20px; right:20px; top:0; height:3px; border-radius:0 0 4px 4px;
      background:linear-gradient(90deg,rgba(255,215,106,0),#ffd76a,rgba(255,215,106,0)); }
    .pp-ava { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center;
      font-size:30px; margin:2px auto 10px; border:2px solid rgba(217,164,65,.6); box-shadow:0 0 22px -8px rgba(255,196,90,.8); overflow:hidden;
      background:#0d1a13; }
    .pp-ava > * { width:100% !important; height:100% !important; border:none !important; box-shadow:none !important; }
    .pp-ava img { width:100%; height:100%; object-fit:cover; object-position:center 18%; display:block; }
    .pp-ttl { text-align:center; font-size:19px; color:#d9a441; line-height:1.25; }
    .pp-sub { text-align:center; font-size:13px; color:#8fa08f; margin-top:4px; line-height:1.5; }
    .pp-slots { display:flex; gap:10px; justify-content:center; margin:16px 0 8px; }
    .pp-slot { width:56px; height:64px; border-radius:14px; border:2px solid rgba(217,164,65,.4);
      background:rgba(8,18,13,.85); display:flex; align-items:center; justify-content:center;
      font-family:Georgia,'Times New Roman',serif; font-size:28px; color:#ffd76a; letter-spacing:0;
      transition:border-color .14s, box-shadow .14s, background .14s; }
    .pp-slot.on { border-color:#d9a441; background:rgba(217,164,65,.12); }
    .pp-slot.cur { border-color:rgba(255,215,106,.85); animation:ppBlink 1.2s ease-in-out infinite; }
    .pp-slot.full { border-color:#ffd76a; box-shadow:0 0 0 1px rgba(255,215,106,.25); }
    .pp-err { text-align:center; color:#e86a5a; font-size:13px; min-height:20px; margin-bottom:4px; line-height:1.35; }
    .pp-hint { text-align:center; color:#8fa08f; font-size:12px; min-height:16px; margin-bottom:6px; }
    .pp-hint.ready { color:#d9a441; }
    .pp-shake { animation:ppShake .42s ease; }
    .pp-pad { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:4px; }
    .pp-pad.busy { pointer-events:none; opacity:.72; }
    .pp-key { font-family:Georgia,'Times New Roman',serif; font-size:24px; color:#e8e0cc;
      background:linear-gradient(180deg,#22402f,#16291f);
      border:1px solid #3d5c49; border-radius:16px; min-height:56px; min-width:0; cursor:pointer; transition:.12s;
      display:flex; align-items:center; justify-content:center; -webkit-tap-highlight-color:transparent;
      touch-action:manipulation; -webkit-user-select:none; user-select:none; -webkit-touch-callout:none; outline:none; }
    @media (hover:hover) and (pointer:fine){ .pp-key:hover { border-color:rgba(255,215,106,.7); background:linear-gradient(180deg,#2a4c39,#1a3125); } }
    .pp-key:active { transform:scale(.96); }
    .pp-key:focus-visible { outline:2px solid #ffd76a; outline-offset:2px; }
    .pp-key.act { color:#d9a441; font-size:22px; }
    .pp-key.go { color:#20180a; font-size:16px; letter-spacing:.04em;
      background:linear-gradient(180deg,#f3d58a,#d9a441 55%,#b9852c);
      border-color:rgba(255,240,200,.55); }
    .pp-key.go.ready { animation:ppPulse 1.6s ease-in-out infinite; }
    .pp-key.go:disabled { opacity:.38; cursor:default; animation:none; filter:grayscale(.25); }
    .pp-key.go:disabled, .pp-key.go:disabled:hover { border-color:rgba(255,240,200,.55); background:linear-gradient(180deg,#f3d58a,#d9a441 55%,#b9852c); }
    .pp-cancel { display:block; width:100%; margin-top:10px; background:none; border:0; cursor:pointer;
      color:#8fa08f; font-family:inherit; font-size:13px; min-height:40px; text-align:center; }
    .pp-cancel:hover { color:#d9a441; }
    .pp-foot { margin-top:10px; padding-top:10px; border-top:1px solid rgba(217,164,65,.22); text-align:center;
      font-size:12.5px; color:#8fa08f; line-height:1.55; }
    .pp-foot b { color:#d9a441; font-weight:normal; }
    .pp-link { color:#d9a441; text-decoration:none; cursor:pointer; background:none; border:0; font-family:inherit; font-size:inherit; }
    @media (max-width:360px){
      .pp-slot { width:48px; height:56px; font-size:24px; border-radius:12px; }
      .pp-key { min-height:52px; font-size:22px; border-radius:14px; }
      .pp-card { padding:16px 12px 12px; border-radius:18px; }
    }
    @media (max-height:700px){
      .pp-ava { width:52px; height:52px; font-size:25px; margin-bottom:6px; }
      .pp-ttl { font-size:17px; }
      .pp-slots { margin:12px 0 6px; }
      .pp-slot { width:48px; height:54px; font-size:24px; }
      .pp-key { min-height:48px; font-size:22px; }
    }
    @media (max-height:560px){
      .pp-ava { display:none; }
      .pp-card { padding:12px 12px 10px; }
      .pp-slots { margin:8px 0 4px; gap:8px; }
      .pp-slot { width:40px; height:44px; font-size:20px; border-radius:10px; }
      .pp-key { min-height:42px; font-size:20px; border-radius:12px; }
      .pp-pad { gap:6px; }
      .pp-foot { margin-top:8px; padding-top:8px; }
      .pp-hint { display:none; }
    }
    @media (max-height:420px) and (orientation:landscape){
      .pp-card { display:grid; grid-template-columns:minmax(150px,1fr) minmax(210px,1.25fr);
        gap:6px 16px; max-width:640px; align-items:center; padding:12px 14px; }
      .pp-head { grid-column:1; }
      .pp-slots { grid-column:1; margin:8px 0 0; }
      .pp-err, .pp-hint { grid-column:1; }
      .pp-pad { grid-column:2; grid-row:1 / span 5; margin:0; }
      .pp-cancel, .pp-foot { grid-column:1 / -1; }
      .pp-ava { display:none; }
    }
    @media (prefers-reduced-motion: reduce){
      .pp-card { animation:none }
      .pp-shake { animation:none }
      .pp-slot.cur { animation:none; border-color:#ffd76a; }
      .pp-key.go.ready { animation:none }
    }
    `;
  }

  function slotHtml(){
    const full = S.pin.length === 4;
    return [0,1,2,3].map(i => {
      const ch = S.pin[i] || '';
      let cls = 'pp-slot';
      if (ch) cls += ' on';
      if (full) cls += ' full';
      else if (i === S.pin.length) cls += ' cur';
      return `<span class="${cls}" aria-hidden="true">${ch}</span>`;
    }).join('');
  }

  function hintText(){
    if (S.busy) return 'Проверяем…';
    if (S.pin.length === 4) return 'Нажми <b>Ввод</b> — или клавишу Enter';
    if (S.pin.length === 0) return 'Четыре цифры, потом «Ввод»';
    return 'Ещё ' + (4 - S.pin.length) + (S.pin.length === 3 ? ' цифра' : ' цифры');
  }

  function paint(){
    const slots = document.getElementById('ppSlots');
    if (slots) slots.innerHTML = slotHtml();
    const go = document.getElementById('ppGo');
    if (go){
      const ready = S.pin.length === 4 && !S.busy;
      go.disabled = !ready;
      go.classList.toggle('ready', ready);
      go.textContent = S.busy ? '…' : 'Ввод';
      go.setAttribute('aria-label', S.busy ? 'Проверяем PIN' : 'Ввод');
    }
    const pad = document.querySelector('#' + ID + ' .pp-pad');
    if (pad) pad.classList.toggle('busy', !!S.busy);
    const hint = document.getElementById('ppHint');
    if (hint){
      hint.className = 'pp-hint' + (S.pin.length === 4 && !S.busy ? ' ready' : '');
      hint.innerHTML = hintText();
    }
    const card = document.querySelector('#' + ID + ' .pp-card');
    if (card) card.setAttribute('aria-label', (S.opts.title || 'PIN') + '. Введено ' + S.pin.length + ' из 4');
  }

  function render(){
    const o = S.opts;
    const keys = ['1','2','3','4','5','6','7','8','9'];
    const pad = keys.map(k => `<button type="button" class="pp-key" data-k="${k}" aria-label="${k}">${k}</button>`).join('')
      + `<button type="button" class="pp-key act" data-act="back" aria-label="Стереть">⌫</button>`
      + `<button type="button" class="pp-key" data-k="0" aria-label="0">0</button>`
      + `<button type="button" class="pp-key go" id="ppGo" data-act="go" disabled aria-label="Ввод">Ввод</button>`;
    const cancelLabel = o.cancel === true ? 'Отмена' : (typeof o.cancel === 'string' ? o.cancel : '');
    let el = document.getElementById(ID);
    if (!el){
      el = document.createElement('div');
      el.id = ID; el.className = 'pp-bg';
      el.setAttribute('role', 'dialog');
      el.setAttribute('aria-modal', 'true');
      document.body.appendChild(el);
      el.addEventListener('click', e => { if (e.target === el && S.opts.cancel) cancel(); });
      el.addEventListener('click', e => {
        const b = e.target.closest ? e.target.closest('.pp-key, .pp-cancel') : null;
        if (!b || b.disabled) return;
        if (b.dataset.k != null) return press(b.dataset.k);
        if (b.dataset.act === 'back') return back();
        if (b.dataset.act === 'go') return submit();
        if (b.dataset.act === 'cancel') return cancel();
      });
    }
    el.innerHTML = `<div class="pp-card">
      <div class="pp-head">
        ${o.avatar ? `<div class="pp-ava">${o.avatar}</div>` : ''}
        <div class="pp-ttl" id="ppTitle">${o.title || 'Введи PIN'}</div>
        ${o.subtitle ? `<div class="pp-sub">${o.subtitle}</div>` : ''}
      </div>
      <div class="pp-slots" id="ppSlots">${slotHtml()}</div>
      <div class="pp-err" id="ppErr" role="alert"></div>
      <div class="pp-hint" id="ppHint">${hintText()}</div>
      <div class="pp-pad">${pad}</div>
      ${cancelLabel ? `<button type="button" class="pp-cancel" data-act="cancel">${cancelLabel}</button>` : ''}
      <div class="pp-foot" id="ppFoot">${o.foot || 'Клавиатура тоже работает · Enter = Ввод'}</div>
    </div>`;
    paint();
    /* Раньше фокус ставился на кнопку «5» — на телефоне она при открытии выглядела нажатой.
       Ввод с клавиатуры ловит обработчик на document, фокус кнопке не нужен: фокусируем саму
       карточку (без прокрутки), чтобы ни одна цифра не выглядела активной. */
    try{
      const card = el.querySelector('.pp-card');
      if (card){ card.setAttribute('tabindex', '-1'); card.focus({ preventScroll: true }); }
    }catch(e){}
  }

  function buzz(){
    try{ if (navigator.vibrate) navigator.vibrate(8); }catch(e){}
  }

  function press(d){
    if (S.busy || S.pin.length >= 4) return;
    S.pin += d;
    docs();
    paint();
    buzz();
  }
  function back(){
    if (S.busy || !S.pin.length) return;
    S.pin = S.pin.slice(0, -1);
    docs();
    paint();
  }
  function docs(){ const e = document.getElementById('ppErr'); if (e) e.textContent = ''; }
  function fail(msg){
    const card = document.querySelector('#pinPadOverlay .pp-card');
    const err = document.getElementById('ppErr');
    if (err) err.textContent = msg || 'Не подошёл';
    if (card){ card.classList.remove('pp-shake'); void card.offsetWidth; card.classList.add('pp-shake'); }
    S.pin = '';
    S.busy = false;
    paint();
  }

  function submit(){
    if (S.busy) return;
    if (S.pin.length !== 4){
      fail(S.pin.length ? ('Нужны четыре цифры · сейчас ' + S.pin.length) : 'Сначала набери четыре цифры');
      return;
    }
    finish();
  }

  function finish(){
    const pin = S.pin;
    const o = S.opts;
    if (!o.verify){ done(pin); return; }
    S.busy = true;
    paint();
    const r = o.verify(pin);
    Promise.resolve(r).then(res => {
      if (res === true || res == null) { S.busy = false; done(pin); return; }
      fail(typeof res === 'string' ? res : 'Не подошёл');
    }).catch(() => { fail('Нет связи, попробуй ещё'); });
  }

  function done(pin){
    const o = S.opts, res = S.resolve;
    if (o.onDone) { try{ o.onDone(pin); }catch(e){} }
    hide();
    if (res) res(pin);
  }
  function cancel(){
    if (S.busy) return;
    const o = S.opts, res = S.resolve;
    hide();
    if (o.onCancel){ try{ o.onCancel(); }catch(e){} }
    if (res) res(null);
  }

  function key(e){
    if (!document.getElementById(ID)) return;
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (/^[0-9]$/.test(e.key)){ e.preventDefault(); press(e.key); }
    else if (e.key === 'Backspace'){ e.preventDefault(); back(); }
    else if (e.key === 'Enter'){ e.preventDefault(); submit(); }
    else if (e.key === 'Escape'){ if (S.opts.cancel){ e.preventDefault(); cancel(); } }
    else if (e.key === 'Tab'){
      const b = [...document.querySelectorAll('#' + ID + ' .pp-key:not([disabled]), #' + ID + ' .pp-cancel')];
      if (!b.length) return;
      const i = b.indexOf(document.activeElement);
      const nxt = e.shiftKey ? (i <= 0 ? b.length - 1 : i - 1) : (i === b.length - 1 ? 0 : i + 1);
      e.preventDefault(); b[nxt].focus();
    }
  }

  /* Окно PIN не должно «уезжать» на телефоне: страница под ним замораживается (position:fixed
     со сдвигом на текущую прокрутку — iOS не слушается overflow:hidden), а протягивание пальцем
     по фону и по карточке, которой некуда прокручиваться, гасится. */
  function lockPage(){
    const b = document.body, y = window.scrollY || window.pageYOffset || 0;
    S.lock = { y, pos: b.style.position, top: b.style.top, left: b.style.left, right: b.style.right, width: b.style.width, ov: b.style.overflow };
    b.style.position = 'fixed'; b.style.top = (-y) + 'px'; b.style.left = '0'; b.style.right = '0'; b.style.width = '100%'; b.style.overflow = 'hidden';
  }
  function unlockPage(){
    const L = S.lock; if (!L) return; S.lock = null;
    const b = document.body;
    b.style.position = L.pos; b.style.top = L.top; b.style.left = L.left; b.style.right = L.right; b.style.width = L.width; b.style.overflow = L.ov;
    try{ window.scrollTo(0, L.y); }catch(e){}
  }
  function noMove(e){
    const card = e.target && e.target.closest ? e.target.closest('.pp-card') : null;
    if (card && card.scrollHeight > card.clientHeight + 1) return;   /* длинной карточке прокрутка нужна */
    e.preventDefault();
  }

  function hide(){
    const el = document.getElementById(ID);
    if (el) el.remove();
    document.removeEventListener('keydown', key, true);
    try{ unlockPage(); }catch(e){}
    S.busy = false; S.pin = ''; S.resolve = null;
  }

  function open(opts){
    css();
    hide();
    S.opts = opts || {}; S.pin = ''; S.busy = false;
    try{ lockPage(); }catch(e){}
    document.addEventListener('keydown', key, true);
    return new Promise(res => { S.resolve = res; render();
      const el = document.getElementById(ID);
      if (el) el.addEventListener('touchmove', noMove, { passive: false }); });
  }

  window.PinPad = {
    isOpen(){ return !!document.getElementById(ID); },
    hide,
    /* один ввод PIN — закрывается только по «Ввод» */
    ask(opts){ return open(opts); },
    /* придумать PIN и повторить: возвращает подтверждённый PIN */
    set(opts){
      const base = Object.assign({}, opts);
      const once = () => open(Object.assign({}, base, {
        title: base.title || 'Придумай свой PIN',
        subtitle: base.subtitle || 'Четыре цифры — их будешь вводить при каждом входе',
        foot: base.foot || 'Запомни PIN: восстановить его можно только через родителя'
      })).then(pin => {
        if (pin === null) return null;
        return open(Object.assign({}, base, {
          title: 'Повтори PIN',
          subtitle: 'Проверим, что ты его не перепутал',
          foot: 'Должно совпасть с тем, что ввёл только что'
        })).then(pin2 => {
          if (pin2 === null) return null;
          if (pin2 === pin) return pin;
          try{ if (typeof toast === 'function') toast('PIN не совпал — давай ещё раз'); }catch(e){}
          return once();
        });
      });
      return once();
    }
  };
})();
