'use strict';
// ===== 5. Замок Кляксы: клетки под кляксой. Видно верхний ряд и первый столбик → считаем рядами =====
const L5Q=[[3,2,[5,6,7],6,'e_q1','e_ok1','3 + 3 = 6'],[5,2,[7,10,12],10,'e_q2','e_ok2','5 + 5 = 10'],[4,3,[7,12,14],12,'e_q3','e_ok3','4 + 4 + 4 = 12']];
SC.l5=fieldScene({n:5,bg:'r5',npc:'klyaksa',steps:3,sec:c=>[c-1,0],start(c){const o=Math.max(2,Math.floor((c-7)/2));return{vc:Math.max(1,o-2),vr:3}},
 async play(z,cols){const o=Math.max(2,Math.floor((cols-7)/2));z.o=o;const kl=HR('klyaksa');kl.base='angry';
  await say('e1');await say('e2');
  for(let i=0;i<3;i++){const[w,h,opts,ans,q,ok,eq]=L5Q[i];const r0=4-h-(h<3?1:0);z.ink={c0:o,r0,w,h,t:0};
   await task({mode:'ask',T:RECT(o,r0,w,h),opts,ans,q,eq,goal:'Сколько клеток под кляксой?',badLine:'e_bad',hint:rowHint(o,r0,w,h),skin:inkSkin,
    onOk:null,ok:null});
   // чернила смываются, клетки считаются
   z.ink.t=T;SFX.splash();pose('klyaksa','wow',2.5);const t=z.t;let n=0;for(const k of RECT(o,r0,w,h)){n++;t.P.set(k,{n,t:T});tone(500+n*40,.08,'sine',.05);await wait(G.fast?5:110)}
   if(i===0)await sayNow('e_wash');await sayNow(ok);dot();await wait(400);z.t=null;z.eq='';z.hint=null}
  kl.base='kind';pose('klyaksa','',0);await winZone('e_win')},
 over(z,g){}
});
function inkSkin(g,c,r,st,p){const z=ZS,ink=z.ink;const vis0=r===ink.r0||c===ink.c0;cellFill(g,c,r,p?`hsl(${HUE[(p.n-1)%8]},80%,66%)`:vis0?'#ffe7a8':'#fff3cf',1,3);
 if(!vis0){const a=ink.t?1-clamp((T-ink.t)/(G.fast?.01:1),0,1):1;if(a>0){X.save();X.globalAlpha=a;X.fillStyle='#1e2a6e';rr(g.x0+c*g.cs-1,g.y0+r*g.cs-1,g.cs+2,g.cs+2,4);X.fill();
   if((c+r)%2===0){X.fillStyle='#2c3c90';X.beginPath();X.arc(g.cx(c)-g.cs*.15,g.cy(r)-g.cs*.1,g.cs*.16,0,7);X.fill()}
   if(r===ink.r0+ink.h-1){X.fillStyle='#1e2a6e';X.beginPath();X.ellipse(g.cx(c)+((c*13)%7-3)*3,g.y0+(r+1)*g.cs+6,g.cs*.12,g.cs*.16,0,0,7);X.fill()}X.restore()}}
 return true}
