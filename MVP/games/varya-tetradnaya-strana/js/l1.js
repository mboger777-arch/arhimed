'use strict';
// ===== 1. Луг Полосок: улитка-почтальон. Полоска из 4 клеток до домика; мостик — полоска из 5 =====
SC.l1=fieldScene({n:1,bg:'r1',npc:'snail',steps:3,sec:c=>[c-1,0],start(c){const o=Math.max(2,Math.floor((c-7)/2));return{vc:o,vr:2}},
 async play(z,cols){const o=Math.max(2,Math.floor((cols-7)/2));z.o=o;z.stage=1;
  await say('a1');await task({mode:'walk',T:ROW(o+1,2,4),N:[K(o,2),K(o+5,2)],goal:'Дойди по полоске до домика',q:'a2'});
  goHome(o,2);await task({mode:'ask',T:ROW(o+1,2,4),P:z.t.P,opts:[3,4,5],ans:4,hint:rowHint(o+1,2,4,1),eq:'1 + 1 + 1 + 1 = 4',ok:'a_ok1',goal:'Сколько клеток в полоске?',q:'a_q1'});dot();
  z.stage=2;z.t=null;goHome(o,1);GOAL='';await say('a3');
  const planks=[3,5,4];await task({mode:'pick',goal:'Какая досочка закроет дырку?',badLine:'a_bad2',ok:'a_ok2',
   items:planks.map((n,i)=>({n,ok:n===5,rect:g=>{const ps=Math.min(g.cs*.6,(g.cols*g.cs-80)/13.5);const tot=12*ps+2*ps*1.2;let x=g.mid-tot/2;for(let j=0;j<i;j++)x+=planks[j]*ps+ps*1.2;const w=n*ps;return[x+w/2,g.y0-ps*.9-16,w+20,ps+30]}})),q:'a4'});
  z.bridge=T;dot();
  await task({mode:'walk',T:ROW(o+1,1,5),N:[K(o,1),K(o+6,1)],goal:'Перейди по мостику',skin:bridgeSkin});dot();
  await winZone('a_win','a_kl')},
 under(g){const z=ZS;if(!z||!z.o)return;const o=z.o;
  // домик в конце полоски
  // речка-канавка с дыркой: 5 клеток
  if(z.stage===2){for(let c=o+1;c<=o+5;c++){if(!z.bridge){cellFill(g,c,1,'#6fb6ea',1,1);X.save();X.strokeStyle='rgba(255,255,255,.6)';X.lineWidth=3;X.beginPath();for(let i=0;i<3;i++){const y=g.cy(1)-g.cs*.2+i*g.cs*.2+Math.sin(T*3+c+i)*3;X.moveTo(g.x0+c*g.cs+8,y);X.quadraticCurveTo(g.cx(c),y-6,g.x0+(c+1)*g.cs-8,y)}X.stroke();X.restore()}}
   cellFill(g,o,1,'#9ad06a',1,2);cellFill(g,o+6,1,'#9ad06a',1,2)}},
 draw(z,g){const t=z.t;const o=z.o;if(z.stage===1&&o){spr('house',g.cx(o+5),g.y0+3*g.cs-4,g.cs*1.9,{ay:1})}if(z.stage===2&&t&&t.mode==='pick'){t.items.forEach((it,i)=>{const r=it.rect(g);const wob=t.wob[i]&&T-t.wob[i]<.6?Math.sin((T-t.wob[i])*30)*.12:0;plankDraw(r[0],r[1],it.n,r[2]-20,wob)})}}
});
function plankDraw(x,y,n,w,rot){const ps=w/n;X.save();X.translate(x,y+Math.sin(T*2+x*.01)*3);X.rotate(rot||0);X.shadowColor='rgba(60,30,0,.35)';X.shadowBlur=10;X.shadowOffsetY=5;X.fillStyle='#c98a4b';rr(-w/2,-ps/2,w,ps,ps*.2);X.fill();X.shadowColor='transparent';
 X.strokeStyle='#7a4a1c';X.lineWidth=4;rr(-w/2,-ps/2,w,ps,ps*.2);X.stroke();for(let i=1;i<n;i++){X.beginPath();X.moveTo(-w/2+i*ps,-ps/2+4);X.lineTo(-w/2+i*ps,ps/2-4);X.stroke()}
 X.fillStyle='#7a4a1c';for(let i=0;i<n;i++){X.beginPath();X.arc(-w/2+(i+.5)*ps,0,ps*.07,0,7);X.fill()}X.restore()}
function bridgeSkin(g,c,r,st,p){X.save();X.fillStyle='#c98a4b';rr(g.x0+c*g.cs+2,g.y0+r*g.cs+6,g.cs-4,g.cs-12,8);X.fill();X.strokeStyle='#7a4a1c';X.lineWidth=3;X.stroke();X.restore();
 if(st==='p'){cellFill(g,c,r,`hsl(${HUE[(p.n-1)%8]},80%,62%)`,.55,8);footprints(g,c,r)}else cellDash(g,c,r);return true}
