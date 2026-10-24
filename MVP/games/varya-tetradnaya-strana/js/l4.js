'use strict';
// ===== 4. Город Окошек: где больше окошек (2×3 или 2×4); две полоски по 3; площадь 2×3 =====
SC.l4=fieldScene({n:4,bg:'r4',npc:'cirkul',steps:3,sec:c=>[c-1,0],start(c){const o=Math.max(2,Math.floor((c-9)/2));return{vc:Math.max(1,o-2),vr:3}},
 async play(z,cols){const o=Math.max(2,Math.floor((cols-9)/2));z.o=o;z.stage='houses';
  await say('d1');
  const H=[[o,1,3,2,'#f4a6a6'],[o+4,1,4,2,'#a6c8f4']];z.houses=H;
  await task({mode:'pick',goal:'В каком домике больше окошек?',q:'d2',badLine:'d_bad1',ok:'d_ok1',
   hint:{rows:[[1,o+2,3,o],[2,o+2,3,o],[1,o+7,4,o+4],[2,o+7,4,o+4]]},
   items:H.map((h,i)=>({ok:i===1,rect:g=>[g.x0+(h[0]+h[2]/2)*g.cs,g.y0+(h[1]+h[3]/2)*g.cs-g.cs*.3,h[2]*g.cs+16,(h[3]+.8)*g.cs]})),
   onOk:async()=>{ZS.hint=Object.assign({t:T},ZS.t.hint);await sayNow('d_ok1')}});dot();
  z.t=null;z.hint=null;z.eq='';z.stage='street';goHome(o-1,2);await say('d3');
  await task({mode:'walk',T:[...ROW(o,2,3),...ROW(o+4,2,3)],N:[K(o-1,2),K(o+3,2),K(o+7,2)],goal:'Пройди по двум полоскам',skin:streetSkin});
  goHome(o-1,2);await task({mode:'ask',T:[...ROW(o,2,3),...ROW(o+4,2,3)],N:[K(o+3,2)],P:z.t.P,skin:streetSkin,opts:[5,6,7],ans:6,hint:{rows:[[2,o+2,3,o],[2,o+6,3,o+4]]},eq:'3 + 3 = 6',ok:'d_ok3',goal:'Сколько клеток в двух полосках?',q:'d_q3'});dot();
  z.t=null;z.eq='';z.stage='square';goHome(Math.max(1,o-2),3);await say('d4');
  await task({mode:'paint',T:RECT(o+1,1,3,2),A:RECT(o,0,5,4),goal:'Раскрась площадь: два ряда по три'});
  await task({mode:'ask',T:RECT(o+1,1,3,2),P:z.t.P,opts:[5,6,8],ans:6,hint:rowHint(o+1,1,3,2),eq:'3 + 3 = 6',ok:'d_ok4',goal:'Сколько клеток на площади?',q:'d_q4'});dot();
  await winZone('d_win','d_kl')},
 draw(z,g){if(z.stage!=='houses'||!z.houses)return;const t=z.t;z.houses.forEach((h,i)=>{const[c0,r0,w,hh,col]=h;const x=g.x0+c0*g.cs,y=g.y0+r0*g.cs,W=w*g.cs,Hh=hh*g.cs;const wob=t&&t.wob&&t.wob[i]&&T-t.wob[i]<.6?Math.sin((T-t.wob[i])*30)*.05:0;
  X.save();X.translate(x+W/2,y+Hh);X.rotate(wob);X.translate(-x-W/2,-y-Hh);X.shadowColor='rgba(40,30,20,.35)';X.shadowBlur=12;X.fillStyle=col;rr(x-8,y-8,W+16,Hh+16,10);X.fill();X.shadowColor='transparent';
  X.fillStyle=i?'#3a6ac8':'#c84a4a';X.beginPath();X.moveTo(x-22,y-6);X.lineTo(x+W/2,y-g.cs*.85);X.lineTo(x+W+22,y-6);X.closePath();X.fill();X.strokeStyle='#5a3a1a';X.lineWidth=3;X.stroke();
  for(let r=0;r<hh;r++)for(let c=0;c<w;c++){const wx=x+c*g.cs+g.cs*.16,wy=y+r*g.cs+g.cs*.16,s=g.cs*.68;X.fillStyle='#fff7c0';rr(wx,wy,s,s,6);X.fill();X.strokeStyle='#6a4a2a';X.lineWidth=4;X.stroke();X.beginPath();X.moveTo(wx+s/2,wy);X.lineTo(wx+s/2,wy+s);X.moveTo(wx,wy+s/2);X.lineTo(wx+s,wy+s/2);X.lineWidth=2;X.stroke()}
  X.restore()})}
});
function streetSkin(g,c,r,st,p){X.save();X.fillStyle='#c9c3b8';rr(g.x0+c*g.cs+3,g.y0+r*g.cs+3,g.cs-6,g.cs-6,8);X.fill();X.restore();
 if(st==='n'){X.save();X.fillStyle='#fff';for(let i=0;i<3;i++)X.fillRect(g.x0+c*g.cs+g.cs*.15+i*g.cs*.26,g.cy(r)-g.cs*.3,g.cs*.14,g.cs*.6);X.restore();return true}
 if(st==='p'){cellFill(g,c,r,`hsl(${HUE[(p.n-1)%8]},80%,64%)`,.85,6);footprints(g,c,r)}else cellDash(g,c,r);return true}
