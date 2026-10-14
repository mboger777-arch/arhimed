/* АРХИМЕД · lesson_embed.js — урок-документ (iframe) внутри обычного экрана урока.

   Уроки 257 и 300 сделаны отдельными документами (MVP/lessons/<id>/), рассчитанными на весь
   экран: своя шапка «АРХИМЕД · ← Выйти», высота 100svh, липкие кнопки внизу. Раньше адаптеры
   клали такой документ поверх приложения (position:fixed, z-index 9000) — пропадали шапка
   приложения, строка «← Книга знаний» с названием урока и нижнее меню; владелец 14.10.2026:
   «шапка другая, они не встроены в приложение нормально».

   Теперь: приложение рисует свой обычный заголовок урока, а документ идёт в карточке на странице.
   Внутрь документа добавляется стиль встраивания (прячет его шапку и подписи, снимает 100svh
   и липкость кнопок), высота рамки подстраивается под содержимое (ResizeObserver), при переходе
   «Дальше/Назад» страница возвращается к началу урока. Логика, награды и озвучка уроков не меняются.

   Использование в адаптере: ВСТРОЕННЫЙ_УРОК.экран({id, рамка, адрес, название, css}). */
(function(){
  'use strict';
  const ОБЩИЙ_CSS = `
    html,body{min-height:0!important;height:auto!important;overflow:hidden!important;background:transparent!important}
    .lesson-shell,.wrap{min-height:0!important}
    .navigation,.btnrow{position:static!important;background:none!important}
  `;
  function подогнать(f){
    try {
      const d = f.contentDocument; if (!d || !d.body) return;
      const корень = d.querySelector('.lesson-shell, .wrap') || d.body;
      const h = Math.ceil(корень.getBoundingClientRect().height + (parseFloat(d.defaultView.getComputedStyle(корень).marginBottom) || 0));
      if (h > 50 && Math.abs((parseFloat(f.style.height) || 0) - h) > 1) f.style.height = h + 'px';
    } catch(e){}
  }
  function подготовить(f, css){
    const d = f.contentDocument; if (!d || !d.head || d.getElementById('встроенный-урок')) return;
    const s = d.createElement('style'); s.id = 'встроенный-урок'; s.textContent = ОБЩИЙ_CSS + (css || '');
    d.head.appendChild(s);
    подогнать(f);
    try { new (d.defaultView.ResizeObserver || ResizeObserver)(() => подогнать(f)).observe(d.querySelector('.lesson-shell, .wrap') || d.body); } catch(e){}
    d.defaultView.addEventListener('load', () => подогнать(f));
    /* у встроенного документа своей прокрутки нет: урок сам прокручивает себя к сцене (scrollIntoView,
       scrollTo) — сбрасываем в ноль, иначе верх урока (заголовок) уезжает под край карточки */
    const w = d.defaultView;
    w.addEventListener('scroll', () => { if (w.scrollY || w.scrollX) w.scrollTo(0, 0); }, { passive: true });
    /* после «Дальше / Назад / этапа» — к началу урока, а не середине новой сцены */
    d.addEventListener('click', (e) => {
      const к = e.target && e.target.closest && e.target.closest('#next, #back, .chapter, .station, .station-button, #restart');
      if (!к) return;
      setTimeout(() => {
        const r = f.getBoundingClientRect();
        if (r.top < 0 || r.top > window.innerHeight * .5) window.scrollTo({ top: Math.max(0, window.scrollY + r.top - 64), behavior: 'smooth' });
      }, 60);
    }, true);
  }
  window.ВСТРОЕННЫЙ_УРОК = {
    экран(о){
      const scr = document.getElementById('screen'); if (!scr) return;
      const вПути = typeof jpВПути === 'function' && jpВПути();
      const назад = вПути ? `<button class="btn ghost" onclick="jpВышли();go('path')">← Путь</button>`
                          : `<button class="btn ghost" onclick="go('book')">← Книга знаний</button>`;
      const экр = (typeof esc === 'function') ? esc : (x => x);
      const заголовок = (typeof lessonTitle === 'function') ? lessonTitle() : о.название;
      scr.innerHTML = `${назад}
        <h2 style="margin:6px 0 2px">${экр(заголовок)}</h2>
        <div class="small" style="margin-bottom:8px">${экр(о.подпись || '')}</div>
        <div class="card" style="padding:0;overflow:hidden;background:#0b1712">
          <iframe id="${о.рамка}" title="${экр(о.название)}" src="${о.адрес}" scrolling="no"
            style="display:block;width:100%;height:85vh;border:0;background:#0b1712"></iframe>
        </div>`;
      const f = document.getElementById(о.рамка);
      f.addEventListener('load', () => подготовить(f, о.css));
      window.scrollTo(0, 0);
    }
  };
})();
