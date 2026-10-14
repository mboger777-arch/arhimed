/* Recorded Russian neural narration, shared only by lessons 257 and 300. */
(function () {
  'use strict';
  const audio = document.createElement('audio');
  audio.id = 'lesson-narration-audio';
  audio.hidden = true;
  audio.preload = 'metadata';
  audio.dataset.voice = 'ru-RU-SvetlanaNeural';
  document.body.appendChild(audio);
  let active = null, generation = 0;
  function resetButton(button) {
    if (!button) return;
    button.setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-label', 'Послушать задание');
    button.textContent = '♫';
    button.removeAttribute('aria-busy');
  }
  function stop() {
    generation++;
    audio.onended = audio.onerror = null;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    resetButton(active?.button);
    active = null;
  }
  function toggle(key, button, onError) {
    if (active?.key === key) { stop(); return; }
    stop();
    const file = window.LESSON_NARRATION?.[key];
    if (!file) { onError?.('Для этого задания пока нет записи.'); return; }
    const current = generation;
    active = {key, button};
    button?.setAttribute('aria-pressed', 'true');
    button?.setAttribute('aria-busy', 'true');
    button?.setAttribute('aria-label', 'Остановить озвучку');
    if (button) button.textContent = '■';
    const fail = () => {
      if (current !== generation) return;
      stop();
      onError?.('Не удалось загрузить озвучку. Нажми ещё раз.');
    };
    audio.onended = () => { if (current === generation) stop(); };
    audio.onerror = fail;
    audio.src = file;
    // Called synchronously in the tap handler: compatible with iOS playback policy.
    try {
      const play = audio.play();
      if (play?.then) play.then(() => {
        if (current === generation) button?.removeAttribute('aria-busy');
      }).catch(fail);
    } catch (_) { fail(); }
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  window.addEventListener('pagehide', stop);
  window.LESSON_VOICE = {toggle, stop};
})();
