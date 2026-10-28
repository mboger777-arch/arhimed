'use strict';
// ===== 2. Огород бабушки Линейки: грядка 2×3 (рядами 3+3, столбиками 2+2+2), потом грядка 2×4 =====
SC.l2=fieldScene({n:2,bg:'r2',npc:'granny',steps:3,sec:c=>[c-1,0],start(c){const o=Math.max(2,Math.floor((c-6)/2));return{vc:o,vr:2}},
 async play(z,cols){const o=Math.max(2,Math.floor((cols-6)/2));z.o=o;z.bed=[o+1,1,3,2];
  await say('b1');await task({mode:'walk',T:RECT(o+1,1,3,2),N:[K(o,2)],goal:'Пройди по всем лункам',q:'b2',skin:bedSkin});
  goHome(o,2);await task({mode:'ask',T:RECT(o+1,1,3,2),P:z.t.P,skin:bedSkin,opts:[5,6,8],ans:6,hint:rowHint(o+1,1,3,2),badLine:'b_h1',eq:'3 + 3 = 6',ok:'b_ok1',goal:'Сколько тюльпанов?',q:'b_q1'});dot();
  const P=z.t.P;await say('b3');await task({mode:'ask',T:RECT(o+1,1,3,2),P,skin:bedSkin,opts:[4,6,9],ans:6,hint:colHint(o+1,1,3,2),showHint:1,eq:'2 + 2 + 2 = 6',ok:'b_ok2',goal:'Считаем столбиками',q:'b_q2'});dot();
  z.t=null;z.hint=null;z.eq='';z.bed=[o+1,1,4,2];await say('b4');
  await task({mode:'walk',T:RECT(o+1,1,4,2),N:[K(o,2)],goal:'Пройди по всем лункам',skin:bedSkin});
  goHome(o,2);await task({mode:'ask',T:RECT(o+1,1,4,2),P:z.t.P,skin:bedSkin,opts:[6,8,10],ans:8,hint:rowHint(o+1,1,4,2),eq:'4 + 4 = 8',ok:'b_ok3',goal:'Сколько тюльпанов?',q:'b_q3'});dot();
  await winZone('b_win','b_kl')},
 under(g){const z=ZS;if(!z||!z.bed)return;const[c0,r0,w,h]=z.bed;X.save();X.fillStyle='#a8774a';X.shadowColor='rgba(60,30,0,.3)';X.shadowBlur=10;rr(g.x0+c0*g.cs-6,g.y0+r0*g.cs-6,w*g.cs+12,h*g.cs+12,16);X.fill();X.restore()}
});
// лунка → тюльпан вырастает, когда Варя проходит по клетке
function bedSkin(g,c,r,st,p){const x=g.cx(c),y=g.cy(r);cellFill(g,c,r,'#8a5a32',1,4);
 if(st==='p'){const u=clamp((T-p.t)/(G.fast?.01:.45),0,1);cellFill(g,c,r,`hsl(${HUE[(p.n-1)%8]},70%,72%)`,.5,6);spr((c+r)%2?'tulip2':'tulip',x,y+g.cs*.42,g.cs*1.05*ease(u)+1,{ay:1,rot:Math.sin(T*2+c)*.04})}
 else{spr('hole',x,y+g.cs*.05,g.cs*.62);cellDash(g,c,r,'#ffd36a')}return true}
