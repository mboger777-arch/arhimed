'use strict';
// ===== 3. Зебровая река: раскрась клетки через одну (из 5 — 3, из 7 — 4) =====
function zebraTask(o,n,q){const T=[],A=ROW(o,1,n);for(let i=0;i<n;i+=2)T.push(K(o+i,1));return task({mode:'paint',T,A,goal:'Раскрась клетки через одну',q,skin:zebraSkin})}
SC.l3=fieldScene({n:3,bg:'r3',npc:'zebra',steps:2,sec:c=>[c-1,0],start(c){const o=Math.max(2,Math.floor((c-7)/2));return{vc:Math.max(1,o-2),vr:3}},
 async play(z,cols){const o=Math.max(2,Math.floor((cols-7)/2));z.o=o;z.n0=5;
  await say('c1');await zebraTask(o,5,'c2');
  await task({mode:'ask',T:[...z.t.T],A:[...z.t.A],P:z.t.P,skin:zebraSkin,opts:[2,3,4],ans:3,badLine:'c_h',eq:'1, 3, 5 — три клетки',ok:'c_ok1',goal:'Сколько клеток раскрашено?',q:'c_q1'});dot();
  z.t=null;z.eq='';z.n0=7;await say('c3');await zebraTask(o,7);
  await task({mode:'ask',T:[...z.t.T],A:[...z.t.A],P:z.t.P,skin:zebraSkin,opts:[3,4,5],ans:4,badLine:'c_h',eq:'1, 3, 5, 7 — четыре',ok:'c_ok2',goal:'Сколько клеток раскрашено?',q:'c_q2'});dot();
  await winZone('c_win','c_kl')},
 under(g){const z=ZS;if(!z||!z.o)return;// речка поперёк поля, мостки — полоска клеток
  X.save();X.fillStyle='#78bde8';rr(g.x0-6,g.y0+g.cs*.72,g.cols*g.cs+12,g.cs*1.56,14);X.fill();X.strokeStyle='rgba(255,255,255,.55)';X.lineWidth=3;
  for(let i=0;i<g.cols*2;i++){const x=g.x0+i*g.cs*.5+((T*30)%(g.cs*.5)),y=g.y0+g.cs*(i%2?.9:2.1);X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+g.cs*.12,y-5,x+g.cs*.24,y);X.stroke()}X.restore();
  for(let i=0;i<z.n0;i++){const c=z.o+i;X.save();X.fillStyle='#d9a066';rr(g.x0+c*g.cs+2,g.y0+g.cs+4,g.cs-4,g.cs-8,8);X.fill();X.strokeStyle='#7a4a1c';X.lineWidth=3;X.stroke();X.restore()}}
});
function zebraSkin(g,c,r,st,p){const x0=g.x0+c*g.cs+4,y0=g.y0+r*g.cs+6,s=g.cs-8;
 if(st==='p'){const u=clamp((T-p.t)/(G.fast?.01:.3),0,1);X.save();X.globalAlpha=u;X.fillStyle='#fff';rr(x0,y0,s,s-4,8);X.fill();X.clip();X.fillStyle='#1d1d2a';for(let i=-3;i<6;i++){X.beginPath();X.moveTo(x0+i*s/4,y0);X.lineTo(x0+i*s/4+s/8,y0);X.lineTo(x0+i*s/4+s/8+s*.5,y0+s);X.lineTo(x0+i*s/4+s*.5,y0+s);X.fill()}X.restore();
  X.save();X.strokeStyle='#ff8a1e';X.lineWidth=4;rr(x0,y0,s,s-4,8);X.stroke();X.restore()}
 else if(st==='t'&&ZS.mist>0){cellDash(g,c,r,'#5a3a9a')}return true}
