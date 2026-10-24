'use strict';
// ===== Финал: Клякса подобрела — вместе рисуем радугу из клеточек; медаль «Мастер клеточек» =====
const RAIN=[0,28,52,120,195,232,275];
SC.fin={enter(){const z=zoneStart(6,{cols:0,rw:210,k:-1,ph:'intro',col:[],ci:-1});const g0=GR();z.cols=g0.cols;cast=[hero('varya',0,{z:1}),hero('kv',0,{z:1}),hero('shur',0,{fly:1,z:5000}),hero('klyaksa',0,{z:2,npc:1,base:'kind'})];
  const o=Math.max(2,Math.floor((z.cols-7)/2));z.o=o;z.v={c:o-2,r:3,pc:o-2,pr:3,t0:0,t1:0};z.k={c:o-3,r:3,pc:o-3,pr:3,t0:0,t1:0};z.q=[];
  musStart({bpm:120,bar:8,kit:'soft',padVol:.02,chord:i=>['C','C','F','F','G','G','C','C'][i%8],beat(i,w){const m=[72,76,79,76,77,81,79,74][i%8];boxNote(midi(m+12),w,.07,1.2)}});
  run(async()=>{await wait(400);await say('f1');await say('f2');z.ph='play';z.ci=0;GOAL='Нажимай на клеточки, которые светятся'})},
 prog(){return ZS.ci*10+(ZS.ph==='medal'?500:0)},
 tapFirst(x,y){const z=ZS;if(z.ph!=='play')return false;const c=cellAt(x,y);if(!c)return false;if(c[0]===z.o+z.ci){SC.fin.paint();return true}
  if(c[0]>=z.o&&c[0]<z.o+7){z.gw=T;tone(300,.08,'sine',.05)}return true},
 paint(){const z=ZS,g=GR();z.col[z.ci]=T;const c=z.o+z.ci;for(let r=0;r<4;r++)burst(g.cx(c),g.cy(r),6,'spark',RAIN[z.ci],.5);starNote([60,62,64,65,67,69,71][z.ci],acNow(),.15);
  pose('varya','point',1);HR('varya').flip=false;const kl=HR('klyaksa');kl.jump=T;z.ci++;if(z.ci>=7){z.ph='song';GOAL='';SV.fin=1;save();SC.fin.end()}},
 async end(){const z=ZS;run(async()=>{cheer();burst(640,250,120,'conf',null,1.5);z.rb=T;await say('f3');z.ph='medal';z.md=T;SFX.star();await say('f4');await say('f5');z.done=true})},
 draw(){const z=ZS;bgDraw('fin');const g=GR();drawPaper(g);
  for(let i=0;i<7;i++){const c=z.o+i;for(let r=0;r<4;r++){if(z.col[i]){const u=clamp((T-z.col[i]-r*.06)/(G.fast?.01:.3),0,1);cellFill(g,c,r,`hsl(${RAIN[i]},85%,60%)`,u,3)}else if(z.ph==='play'&&i===z.ci){cellFill(g,c,r,'#fff7b0',.5+.4*Math.sin(T*6),4);cellDash(g,c,r,'#ff8a1e')}else cellFill(g,c,r,'#fff3cf',.6,5)}}
  if(z.ph==='play'&&z.ci>=0){const x=g.cx(z.o+z.ci);const wob=z.gw&&T-z.gw<.4?Math.sin((T-z.gw)*30)*8:0;spr('star',x+wob,g.y0-30+Math.sin(T*5)*6,56)}
  placeCast(g);const kl=HR('klyaksa');drawCast();
  if(z.rb){const u=clamp((T-z.rb)/(G.fast?.01:1.2),0,1);const w=Math.min(900,g.cols*g.cs*1.1);X.save();X.globalAlpha=ease(u);sprW('rainbow',g.mid,g.y0-w/aspect('rainbow')*.35,w);X.restore()}},
 ui(){const z=ZS;if(z.ph==='medal'){const v=vis(),u=clamp((T-z.md)/(G.fast?.01:.8),0,1);X.save();X.globalAlpha=.55*u;X.fillStyle='#14184a';X.fillRect(v.x0,v.y0,v.w,v.h);X.restore();
   const top=safeT()+16,bot=safeB()-118,mh=clamp(bot-top-98,150,300),cx=(safeL()+safeR())/2,cy=top+mh/2;X.save();X.translate(cx,cy);X.scale(ease(u),ease(u));X.rotate(Math.sin(T*1.5)*.05);spr('medal',0,0,mh);X.restore();
   plaque('Мастер клеточек',cx,cy+mh/2+46,Math.min(560,v.w*.5),{sp:'lplank',h:90,size:52,id:'medt',iw:.84,ih:.7});
   if(z.done){boardBtn('again',cx-170,safeB()-56,280,'Ещё раз',()=>{SV={stars:[0,0,0,0,0],open:1,intro:1,fin:0,sec:[0,0,0,0,0],at:0};save();go('map')},{size:48});boardBtn('tomap',cx+170,safeB()-56,280,'На карту',()=>go('map'),{size:48})}}},
 taps(ok){const z=ZS;if(z.ph!=='play')return['wait'];if(!ok)return[];const g=GR();return[[g.cx(z.o+z.ci),g.cy(2)]]}};
