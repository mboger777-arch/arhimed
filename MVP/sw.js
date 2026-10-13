/* АРХИМЕД MVP · service worker
   HTML/JS всегда с сети. В Cache API не кладём код — иначе залипает старый урок.
   Картинки можно из кэша. */
const CACHE='arhimed-mvp-v914';
/* В кэш кладём только то, что реально есть в репозитории.
   Раньше здесь был путь вне MVP (../МОБ_ПРИЛОЖЕНИЕ/...), его на сервере нет —
   addAll падал, и service worker вообще не устанавливался. */
const ASSETS=[
  'img/car.png','img/archimedes.jpg','manifest.webmanifest',
  /* вариации Архимеда владельца: пять выражений лица и фигура в рост */
  'img/arch_smile.jpg','img/arch_wow.jpg','img/arch_think.jpg','img/arch_laugh.jpg','img/arch_sad.jpg',
  'img/arch_body.png',
  'img/pykh.png',
  /* спутники «Пути»: Мишутка ведёт 1 класс (path_junior.js), mishutka.png —
     строки уроков в каталоге. Без них портрет спутника каждый раз шёл по сети. */
  'img/mishutka-2.png','img/mishutka.png',
  'img/icons/student-192.png','img/icons/student-512.png','img/icons/student-apple.png',
  'img/icons/parent-192.png','img/icons/parent-512.png','img/icons/parent-apple.png',
  'img/icons/favicon-student.svg','img/icons/favicon-parent.svg'
];
function precache(c){
  return Promise.all(ASSETS.map(function(u){
    return c.add(u).catch(function(){ return null; });   // одна ошибка не ломает установку
  }));
}

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(precache).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});

/* Таймаут ожидания сети. Был 2500 мс на код и на саму страницу — это мало для
   мобильного интернета: оболочка весит 79 КБ, и на слабом сигнале ожидание
   срывалось раньше, чем приходил ответ. Кода в Cache API нет намеренно, поэтому
   после срыва скрипт получал 504 — приложение открывалось наполовину рабочим.
   8 секунд — предел терпения, после которого честнее показать сообщение. */
const ЖДЁМ_СЕТЬ = 8000;
function netFirst(req, ms){
  return new Promise((resolve, reject)=>{
    const t=setTimeout(()=>reject(new Error('timeout')), ms||ЖДЁМ_СЕТЬ);
    fetch(req, {cache:'no-store'}).then(r=>{ clearTimeout(t); resolve(r); }).catch(err=>{ clearTimeout(t); reject(err); });
  });
}
/* Страница без сети: честное сообщение вместо ошибки браузера. */
function безСети(){
  return new Response('<!doctype html><meta charset="utf-8">'+
    '<meta name="viewport" content="width=device-width,initial-scale=1">'+
    '<body style="font-family:Georgia,serif;background:#0b1712;color:#e8e0cc;padding:24px;line-height:1.5">'+
    '<h1 style="color:#ffd76a;font-size:24px;margin:0 0 12px">Нет сети</h1>'+
    '<p style="font-size:16px;margin:0">АРХИМЕД открывается, когда есть интернет. '+
    'Проверь подключение и открой страницу ещё раз.</p></body>',
    {status:200, headers:{'Content-Type':'text/html; charset=utf-8'}});
}
function isCode(url){
  return /\.(js|css|json|webmanifest|html)(\?|$)/.test(url) || /[?&]v=\d+/.test(url) || /[?&]b=\d+/.test(url);
}
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const req=e.request;

  /* КОД (js/css/json) ИДЁТ БЕЗ ТАЙМАУТА — это важно.
     Раньше на него стоял netFirst с обрывом: сначала 2,5 с, потом 8 с. Но у
     кода нет запасного пути (в Cache API его не кладём намеренно), поэтому
     обрыв означал не «возьмём из кэша», а гарантированный 504 и невыполненный
     скрипт. Замер на медленном 3G это показал: 32 файла из 143 получили 504,
     и в приложение попало 632 урока вместо 657 — часть просто исчезала из
     каталога. Браузер дождался бы их сам, это воркер обрывал загрузку.
     Если сети действительно нет, fetch отклонится сам, и мы уйдём в catch. */
  if(isCode(req.url) && req.mode!=='navigate'){
    e.respondWith(
      fetch(req, {cache:'no-store'})
        .catch(()=>caches.match(req).then(hit=>hit || new Response('', {status:504, statusText:'offline'})))
    );
    return;
  }

  if(req.mode==='navigate'){
    e.respondWith(
      netFirst(req).catch(()=>caches.match(req).then(hit=>{
        if(hit) return hit;
        /* Без сети страница отвечает понятным текстом. Раньше здесь стояло
           caches.match('index.html'), но index.html в кэш не кладётся вовсе —
           обещание разрешалось в undefined, respondWith падал, и вместо
           сообщения ребёнок видел ошибку браузера ERR_INTERNET_DISCONNECTED.
           Проверено: офлайн страница не открывалась совсем. */
        return безСети();
      }))
    );
    return;
  }
  /* Всё остальное (картинки, шрифты) — сначала кэш, потом сеть. */
  e.respondWith(
    caches.match(req).then(hit=>hit || netFirst(req).then(res=>{
      const cp=res.clone();
      caches.open(CACHE).then(c=>c.put(req,cp)).catch(()=>{});
      return res;
    }).catch(()=>new Response('', {status:504, statusText:'offline'})))
  );
});
