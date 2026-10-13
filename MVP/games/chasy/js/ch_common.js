'use strict';
// ===== Общее для уровней «Часы» =====
// станция начинается, когда Искра дошла до неё по земле
function stationTrigger(S, run1) {
  const p = S.p;
  for (const st of S.stations) if (!st.started && p.onGround && p.x > tx(st.X0 + 3) && p.x < tx(st.X0 + 12) && !(S.q && !S.q.solved) && S.stations.filter(o => o.started && !o.done).length === 0) {
    st.started = true; S.cur = st; S.respawnPt = { x: tc(st.X0 + 4), y: tx(10) }; run(run1(S, st));
  }
}
// Минутус появляется облачком у станции
function* minutusAt(S, col) { yield* puffTo(S.M, tc(col), tx(10), 1); }
// конец уровня: Тик-Так прибегает, роняет шестерёнку на полку/арку, убегает
function* cubDrop(S, o) {
  const T = S.T; G.freeze = true;
  T.vis = true; T.gear = true; T.x = o.fromX; T.y = groundBelow(S.L, o.runX, tx(4)); T.runTo(o.runX);
  // кадр: Искра, место шестерёнки и Тик-Так — все в кадре (говорящий всегда виден)
  const gy = Math.max(S.p.y, T.y);
  S.cam.lock = fitLock(Math.min(S.p.x, o.gx) - 90, Math.max(o.runX, o.gx) + 110, Math.min(o.gy, gy) - 300, 24);
  yield () => T.arrived;
  say(T, o.line, 4); yield vwait(0.2);
  T.gear = false; const gp = S.L.add(new GearPickup(o.gx, o.gy)); S.wp = gp; puff(gp.x, gp.y - 20, 8); Sound.bump();
  T.runTo(o.awayX);
  say(S.p, o.jump, 3); yield vwait(0.2);   // Искра в кадре (рамка выше)
  S.cam.lock = null; G.freeze = false;
  yield 2.5; T.vis = false;
}
function gearUpdate(S, gotLine) {
  const p = S.p;
  if (S.wp && !S.wp.got && !p.hidden && !G.freeze && Dialog.idle() && overlap(p, S.wp.x - 30, S.wp.y - 60, 60, 60)) { S.wp.got = true; gearGot(S); run((function* () { yield 0.3; say(S.p, gotLine, 3); })()); }
  if (!S.done && S.flag && !S.flag.locked && overlap(p, S.flag.x - 30, S.flag.y - 190, 60, 190)) { S.flag.on = true; S.complete(); }
  S.hud.text = (S.weightsHave || 0) + ' из 5';
}
function startHud(S, base) { S.weightsBase = base; S.weightsHave = base; S.hud = { icon: 'weights', text: base + ' из 5' }; }
// во время вопроса: часы и ответы видны целиком, пузыри их не закрывают
function clockCounted(S, clocks, extra = []) {
  if (!S.q || S.q.solved || !asking(S)) return null;
  const out = clocks.map((cl, i) => ({ kind: 'часы ' + (i + 1), group: 'clock', r: cl.rect() }));
  for (const b of S.q.blocks) if (b instanceof ChoiceObj) { out.push({ kind: 'ответ ' + b.value, group: 'ans', r: b.mode === 'door' && b.clock ? b.clockRect() : b.labelRect ? b.labelRect() : b.rect(), skip: ['табличка ответа'] }); }
  return out.concat(extra);
}
function clockAvoid(S, clocks) {
  const out = clocks.map(cl => Object.assign(cl.rect(), { counted: true }));
  if (S.q && !S.q.solved) for (const b of S.q.blocks) if (b instanceof ChoiceObj) out.push(Object.assign(b.mode === 'door' ? { x: b.x - 80, y: b.y - 340, w: 160, h: 150 } : { x: b.x - 60, y: b.y - 300, w: 120, h: 160 }, { counted: true }));
  return out;
}
// задний план-стена (мастерская, пекарня): кирпич/дерево, стоит на земле
function drawWall(c, x0, x1, top, ground, col, seam) {
  c.fillStyle = col; c.fillRect(x0, top, x1 - x0, ground - top);
  c.strokeStyle = seam; c.lineWidth = 2;
  for (let y = top + 30; y < ground; y += 30) { c.beginPath(); c.moveTo(x0, y); c.lineTo(x1, y); c.stroke(); const off = ((y - top) / 30) % 2 ? 0 : 40; for (let x = x0 + off; x < x1; x += 80) { c.beginPath(); c.moveTo(x, y - 30); c.lineTo(x, y); c.stroke(); } }
  c.fillStyle = 'rgba(0,0,0,0.12)'; c.fillRect(x0, top, x1 - x0, 10);
}
