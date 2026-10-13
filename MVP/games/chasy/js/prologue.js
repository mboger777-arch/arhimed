'use strict';
// ---------- Пролог: Башенные часы на площади, Тик-Так уносит стрелки, шестерёнки разлетаются ----------
const PROLOGUE = {
  idx: -1, rngId: 99, cutscene: true,
  build(S) {
    const L = new Level(34, 12, 'day'); S.L = L; L.song = 'day'; L.bgImg = 'bg_shop';
    L.ground(0, 34, 10);
    L.plank(20, 22, 6);   // карниз башни рядом с часами: сюда запрыгивает Тик-Так
    L.spawn = { x: tc(8), y: tx(10) };
    S.tower = L.add(new ClockPost(tc(17), tx(10), 110, 8, 0, { post: 150 }));
    S.M = L.add(new NPC('minutus', tc(12) - 10, tx(10), 1));
    S.arch = L.add(new NPC('arch', tc(4), tx(10), 1));
    S.bub = L.add(new NPC('bublik', tc(25), tx(10), -1));
    S.T = L.add(new Cub(tx(36), tx(10))); S.T.vis = false;
    [[2, 90], [29, 90], [32, 80]].forEach(([c, w]) => deco(L, 't_bush', tc(c), tx(10), w, 8));
    return L;
  },
  start(S) {
    startHud(S, 5); S.p.face = 1;
    S.cam.lock = fitLock(tc(3), tc(28), tx(10) - 470, 24);
    run(PROLOGUE.script(S));
  },
  script(S) {
    return (function* () {
      const M = S.M, tw = S.tower, T = S.T, p = S.p;
      G.freeze = true; yield 0.8;
      say(NARR, VL.pr1(), 6); yield vwait(0.3);
      say(M, VL.pr2(), 6); yield vwait(0.3);
      say(S.bub, VL.pr3(), 4); yield vwait(0.3);
      // Тик-Так прибегает, запрыгивает на карниз, снимает стрелки — шестерёнки разлетаются
      T.vis = true; T.x = tx(34); T.y = tx(10); T.speed = 520; T.runTo(tx(23)); Sound.laugh();
      yield () => T.arrived;
      T.jumpTo(tx(21), tx(6), 0.55, 120); yield () => T.arrived; T.face = -1;
      say(T, VL.pr4(), 4); yield 0.6;
      tw.noHands = true; Sound.pop(); sparkBurst(tw.x, tw.cy, 20, '#ffe066', 260); T.hands = true;
      for (let k = 0; k < 5; k++) {
        S.weightsHave = 4 - k; Sound.bump();

        S.L.add(new FlyGear(tw.x, tw.cy, tw.x + (k - 2) * 160 + frand(-30, 30), S.L.pxH + 80));
        yield 0.25;
      }
      yield vwait(0);
      T.jumpTo(tx(24), tx(10), 0.5, 80); yield () => T.arrived;
      T.runTo(tx(36)); yield 1.2;
      check(tw.noHands && S.weightsHave === 0, 'стрелки сняты, шестерёнок на часах 0');
      archSay(S.arch, 'worried', VL.pr5(), 5); yield vwait(0.3); S.arch.pose = 'idle';
      say(p, VL.pr6(), 3); yield vwait(0.3);
      say(M, VL.pr7(), 6); yield vwait(0.3);
      say(NARR, VL.pr8(), 4); yield vwait(0.5);
      PROLOGUE.finish(S);
    })();
  },
  finish(S) {
    if (S.leaving) return; S.leaving = true;
    try { localStorage.setItem('ch_plat_prologue', '1'); } catch (_) { }
    goScene(() => new MapScene());
  },
  onEnter(S) { PROLOGUE.finish(S); },
  drawHud(S, c) {
    const w = 250, h = 70, x = G.W - 84 - G.sr - 80 - 24 - w, y = 16;
    goldButton(c, x, y, w, h, 'Пропустить', 32, 0, 'green');
    addButton(x, y, w, h, () => PROLOGUE.finish(S), 'skip');
  },
  update(S) { S.hud.text = S.weightsHave + ' из 5'; },
  counted() { return null; },
  avoidRects(S) { return [Object.assign(S.tower.rect(), { counted: true })]; },
};
// шестерёнка летит дугой и падает за край площади (её найдут на уровнях)
class FlyGear extends Ent {
  constructor(x0, y0, x1, y1) { super(x0, y0); this.x0 = x0; this.y0 = y0; this.vx = (x1 - x0) / 1.1; this.vy = -620; this.t = 0; this.z = 2; }
  update(dt) { this.t += dt; this.x += this.vx * dt; this.vy += 1300 * dt; this.y += this.vy * dt; if (this.y > this.level.pxH + 60) this.dead = true; }
  draw(c) { drawGear(c, this.x, this.y, 22, this.t * 8); }
}
function prologueSeen() { try { return localStorage.getItem('ch_plat_prologue') === '1'; } catch (_) { return true; } }
