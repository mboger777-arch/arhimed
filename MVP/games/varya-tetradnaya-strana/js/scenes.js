'use strict';
// ===== Тетрадное поле: Варя ходит по клеткам, следы раскрашивают клетки; ластик, подсказка Шуршика, секреты Квадратика =====
const LVL=[{n:1,sc:'l1',name:'Луг Полосок',pos:[237,505]},{n:2,sc:'l2',name:'Огород бабушки Линейки',pos:[452,400]},{n:3,sc:'l3',name:'Зебровая река',pos:[684,365]},
 {n:4,sc:'l4',name:'Город Окошек',pos:[862,245]},{n:5,sc:'l5',name:'Замок Кляксы',pos:[1044,175]}];
const STICK=['letter','tulip','sticker','house','key'];
G.prog=()=>SCN&&SCN.prog?SCN.prog():0;G.taps=ok=>SCN&&SCN.taps?SCN.taps(ok):[];
const K=(c,r)=>c+','+r,UK=k=>k.split(',').map(Number);
const HUE=[8,32,50,120,190,215,265,320];
function plaque(t,x,y,w,o){o=o||{};const sp=o.sp||'board';const h=o.h||w/aspect(sp);if(o.h)slice3(sp,x,y,w,h,{cap:1.3,a:o.a});else{X.save();X.translate(x,y);if(o.a!=null)X.globalAlpha=o.a;sprW(sp,0,0,w);X.restore()}
 textIn(t,x,y+(o.dy||0)*h,w*(o.iw||.8),h*(o.ih||.58),o.size||44,o.col||'#fff6dc',{f:o.f||FONT,st:o.st||'#3a1a06',lw:o.lw||6,id:o.id||'plaque',min:o.min||18});return h}
function fitSpr(n,x,y,d,o){const a=aspect(n);return spr(n,x,y,a>1?d/a:d,o)}
function rr(x,y,w,h,r){X.beginPath();X.roundRect(x,y,w,h,r)}
// ---- плитка-ответ: кремовая карточка в клеточку с большой синей цифрой ----
function tile(x,y,d,v,o){o=o||{};const pop=o.pop&&T-o.pop<.45?1+Math.sin((T-o.pop)/.45*Math.PI)*.25:1;const wob=o.wob&&T-o.wob<.6?Math.sin((T-o.wob)*30)*.14*(1-(T-o.wob)/.6):0;
 X.save();X.translate(x,y+Math.sin(T*2.2+x*.01)*3);X.rotate(wob);X.scale(pop,pop);const h=d;X.shadowColor='rgba(30,40,90,.35)';X.shadowBlur=14;X.shadowOffsetY=6;X.fillStyle=o.ok?'#d9ffc8':'#fffaf0';rr(-d/2,-h/2,d,h,d*.2);X.fill();X.shadowColor='transparent';
 X.save();X.clip();X.strokeStyle='rgba(80,130,220,.22)';X.lineWidth=2;for(let i=-3;i<=3;i++){X.beginPath();X.moveTo(i*d/6,-h/2);X.lineTo(i*d/6,h/2);X.stroke();X.beginPath();X.moveTo(-d/2,i*d/6);X.lineTo(d/2,i*d/6);X.stroke()}X.restore();
 X.lineWidth=6;X.strokeStyle=o.ok?'#3aa040':'#2f5fb8';rr(-d/2,-h/2,d,h,d*.2);X.stroke();
 txt(String(v),0,d*.04,String(v).length>1?d*.56:d*.66,'#1d3b8a',{f:NUM,st:'#ffffff',lw:Math.max(6,d*.07),box:[-d/2,-h/2,d/2,h/2],id:'tile'});X.restore()}
function eqBoard(t,x,y,w){const h=w/aspect('board');X.save();X.translate(x,y);sprW('board',0,0,w);X.restore();textIn(t,x,y,w*.8,h*.6,80,'#fffdf2',{f:NUM,st:'#3a1a06',lw:9,id:'eq',min:30});return h}
// ---- рамка уровня ----
function zoneStart(n,o){STF.length=0;for(const k in PDOT)delete PDOT[k];ZS=Object.assign({n,done:false,lock:false,mist:0,fix:0,si:0,t:null,eq:'',hint:null,dots:0,ndots:3},o||{});return ZS}
function HR(n){return cast.find(c=>c.n===n)}
function react(ok,x,y){const v=HR('varya'),k=HR('kv'),s=HR('shur'),kl=HR('klyaksa');
 if(ok){if(v){v.jump=T;pose('varya','cheer',1.5)}if(k){k.jump=T+.1;pose('kv','cheer',1.5)}if(s){s.jump=T+.2;pose('shur','cheer',1.5)}
  if(kl&&!kl.kind){pose('klyaksa','angry',1.6);kl.wob=T;setTimeout(()=>SFX.grumble(),G.fast?0:300)}SFX.yay();if(x!=null)flyStar(x,y)}
 else{if(v)v.wob=T;if(k)pose('kv','sniff',1.2);if(kl&&!kl.kind){pose('klyaksa','wow',1.4);kl.jump=T;SFX.giggle()}}}
function mistake(){ZS.mist++;SFX.bad();react(false)}
const STF=[];function flyStar(x,y){STF.push({x,y,t0:T})}
const PDOT={};
function progDots(n,done){DOTSN=n;const x1=safeR()-14,r=dotR(n);const gr=goalRect();const px=i=>x1-(n-1-i)*(r*2.3)-r,py=()=>gr.top+gr.bh/2;
 {const xa=px(0)-r*1.25,xb=x1+r*.15,yc=py();X.save();X.fillStyle='rgba(30,40,90,.42)';rr(xa,yc-r*1.25,xb-xa,r*2.5,r*1.25);X.fill();X.restore()}
 for(let i=0;i<n;i++){const x=px(i),y=py();const pop=PDOT[i]&&T-PDOT[i]<.5?1+Math.sin((T-PDOT[i])/.5*Math.PI)*.45:1;X.save();X.globalAlpha=i<done?1:.5;spr(i<done?'star':'star_dark',x,y,r*2.2*pop,{rot:i<done?Math.sin(T*2+i)*.1:0});X.restore()}
 for(let j=STF.length-1;j>=0;j--){const s=STF[j],u=clamp((T-s.t0)/(G.fast?.05:.7),0,1),e=ease(u);const i=Math.max(0,Math.min(n-1,done-1));
  const x=lerp(s.x,px(i),e),yy=lerp(s.y,py(),e)-Math.sin(u*Math.PI)*120;spr('star',x,yy,70*(1-u*.4),{rot:u*8});if(Math.random()<.5)burst(x,yy,1,'spark',50,.3);if(u>=1){STF.splice(j,1);PDOT[i]=T;SFX.coin()}}}
async function winZone(line,kl){const z=ZS;z.lock=true;z.t=null;GOAL='';cheer();burst(640,300,90,'conf',null,1.4);SFX.star();
 const i=z.n-1;SV.stars[i]=1;SV.open=Math.max(SV.open,Math.min(6,z.n+1));SV.at=z.n;save();z.won=1;
 await say(line);if(kl)await say(kl);await wait(400);z.done=true;z.lock=false;go('map')}
// ---- геометрия поля: 4 ряда клеток внизу на «бумажном полу», справа — место для жителя ----
function GR(){const z=ZS||{};const top=Math.max(bgY0()+418*bgScale(),safeT()+252),bot=safeB()-6;let cs=clamp((bot-top)/4,58,112);
 const L=safeL()+4,R=safeR()-(z.rw!=null?z.rw:200);const cols=z.cols||clamp(Math.floor((R-L)/cs),12,13);cs=Math.min(cs,(R-L)/cols);const y0=bot-4*cs,x0=L+(R-L-cols*cs)/2;
 return{x0,y0,cs,cols,rows:4,R,cx:c=>x0+(c+.5)*cs,cy:r=>y0+(r+.5)*cs,mid:x0+cols*cs/2}}
function cellAt(x,y){const g=GR();const c=Math.floor((x-g.x0)/g.cs),r=Math.floor((y-g.y0)/g.cs);if(c<0||r<0||c>=g.cols||r>=4)return null;return[c,r]}
// ---- поле: рисуем клетки ----
function drawPaper(g){X.save();X.fillStyle='rgba(255,252,240,.82)';X.shadowColor='rgba(60,50,30,.25)';X.shadowBlur=18;rr(g.x0-10,g.y0-10,g.cols*g.cs+20,4*g.cs+16,18);X.fill();X.restore();
 X.save();X.strokeStyle='rgba(70,120,210,.45)';X.lineWidth=2;for(let c=0;c<=g.cols;c++){X.beginPath();X.moveTo(g.x0+c*g.cs,g.y0);X.lineTo(g.x0+c*g.cs,g.y0+4*g.cs);X.stroke()}
 for(let r=0;r<=4;r++){X.beginPath();X.moveTo(g.x0,g.y0+r*g.cs);X.lineTo(g.x0+g.cols*g.cs,g.y0+r*g.cs);X.stroke()}X.restore()}
function cellFill(g,c,r,col,a,pad){const p=pad==null?4:pad;X.save();if(a!=null)X.globalAlpha=a;X.fillStyle=col;rr(g.x0+c*g.cs+p,g.y0+r*g.cs+p,g.cs-2*p,g.cs-2*p,g.cs*.14);X.fill();X.restore()}
function cellDash(g,c,r,col){X.save();X.setLineDash([g.cs*.14,g.cs*.1]);X.lineDashOffset=-T*20;X.lineWidth=5;X.strokeStyle=col||'#ff8a1e';rr(g.x0+c*g.cs+6,g.y0+r*g.cs+6,g.cs-12,g.cs-12,g.cs*.14);X.stroke();X.restore()}
function footprints(g,c,r){const x=g.cx(c),y=g.cy(r),s=g.cs;X.save();X.fillStyle='rgba(255,255,255,.75)';for(const[dx,dy,a] of [[-.14,.12,-.3],[.14,-.1,.3]]){X.save();X.translate(x+dx*s,y+dy*s);X.rotate(a);X.beginPath();X.ellipse(0,0,s*.07,s*.12,0,0,7);X.fill();X.restore()}X.restore()}
function drawBoard(g){const z=ZS,t=z.t;drawPaper(g);if(SCN.under)SCN.under(g);if(!t||!t.T)return;
 for(const k of t.N||[]){const[c,r]=UK(k);if(t.skin&&t.skin(g,c,r,'n'))continue;cellFill(g,c,r,'#f1ddb0',1,3)}
 for(const k of t.T){const[c,r]=UK(k);const p=t.P.get(k);if(t.skin&&t.skin(g,c,r,p?'p':'t',p))continue;
  if(p){const u=clamp((T-p.t)/(G.fast?.01:.3),0,1);cellFill(g,c,r,`hsl(${t.hue!=null?t.hue:HUE[(p.n-1)%HUE.length]},80%,${68-u*6}%)`,u,3);footprints(g,c,r)}
  else{cellFill(g,c,r,'#fff3cf',.6+.3*Math.sin(T*3+c),5);cellDash(g,c,r)}}
 if(!t.skin)for(const k of t.A||[]){if(t.T.has(k))continue;const[c,r]=UK(k);cellFill(g,c,r,'#e8f0ff',.55,4)}
 for(const k of t.W){const[c,r]=UK(k);spr('blot',g.cx(c),g.cy(r),g.cs*1.05,{rot:(c*7+r)%3*.6})}
 if(z.hint)drawHint(g,z.hint)}
// большие номера клеток — поверх героев, чтобы всегда было видно
function drawNums(g){const t=ZS.t;if(!t||!t.T||t.noNum)return;for(const[k,p] of t.P){const[c,r]=UK(k);const pop=T-p.t<.4?1+Math.sin((T-p.t)/.4*Math.PI)*.45:1;const s=g.cs*.56*pop;
  txt(String(p.n),g.cx(c),g.cy(r)+2,s,'#ffffff',{f:NUM,st:'#1d2f6a',lw:Math.max(6,s*.17),box:[g.x0+c*g.cs-g.cs*.2,g.y0+r*g.cs-g.cs*.2,g.x0+(c+1)*g.cs+g.cs*.2,g.y0+(r+1)*g.cs+g.cs*.2],id:'cellnum'})}}
// подсказка Шуршика «вид сверху»: подписи рядов справа и/или столбиков сверху
function drawHint(g,h){const a=clamp((T-h.t)/(G.fast?.01:.4),0,1);X.save();X.globalAlpha=a;const d=g.cs*.62;
 for(const[r,c1,n,cc] of h.rows||[]){const c0=cc==null?h.c0:cc;X.fillStyle='rgba(255,220,90,.28)';rr(g.x0+c0*g.cs+3,g.y0+r*g.cs+3,(c1-c0+1)*g.cs-6,g.cs-6,10);X.fill();
  const x=g.x0+(c1+1)*g.cs+d*.62,y=g.cy(r);badge(x,y,d,n)}
 for(const[c,r0,n] of h.cols||[]){X.fillStyle='rgba(120,200,255,.28)';rr(g.x0+c*g.cs+3,g.y0+r0*g.cs+3,g.cs-6,(h.r1-r0+1)*g.cs-6,10);X.fill();badge(g.cx(c),g.y0+r0*g.cs-d*.6,d,n,'#3a8ae0')}X.restore()}
function badge(x,y,d,n,col){X.save();X.fillStyle=col||'#ff8a1e';X.strokeStyle='#fff';X.lineWidth=4;X.beginPath();X.arc(x,y,d/2,0,7);X.fill();X.stroke();X.restore();txt(String(n),x,y+2,d*.66,'#fff',{f:NUM,st:'#5a2a00',lw:5,box:[x-d*.6,y-d*.6,x+d*.6,y+d*.6],id:'badge'})}
// ---- герои на поле ----
function fieldCast(npc,o){o=o||{};const g0=GR();cast=[hero('varya',0,{z:1}),hero('kv',0,{z:1}),hero('shur',0,{z:5000})];if(npc)cast.push(hero(npc,0,{z:2,npc:1}));
 ZS.v={c:o.vc||0,r:o.vr==null?3:o.vr,pc:o.vc||0,pr:o.vr==null?3:o.vr,t0:0,t1:0};ZS.k={c:(o.vc||0)-1,r:o.vr==null?3:o.vr,pc:(o.vc||0)-1,pr:o.vr==null?3:o.vr,t0:0,t1:0};ZS.q=[];ZS.good=[ZS.v.c,ZS.v.r];ZS.gp=[ZS.k.c,ZS.k.r]}
function tw(o,g){const u=o.t1>o.t0?clamp((T-o.t0)/(o.t1-o.t0),0,1):1;const e=u<1?u:1;return{x:g.cx(lerp(o.pc,o.c,e)),y:g.cy(lerp(o.pr,o.r,e)),u,moving:u<1}}
function placeCast(g){const z=ZS;const v=HR('varya'),k=HR('kv'),s=HR('shur'),n=cast.find(c=>c.npc);
 const vp=tw(z.v,g);v.h=Math.min(290,g.cs*3.5);v.x=vp.x;v.gy=vp.y+g.cs*.34;v.bob=vp.moving?Math.abs(Math.sin(vp.u*Math.PI))*g.cs*.18:0;v.z=v.gy;
 if(vp.moving&&z.v.c!==z.v.pc)v.flip=z.v.c<z.v.pc;
 if(k){const kp=tw(z.k,g);k.h=g.cs*1.75;k.x=kp.x;k.gy=kp.y+g.cs*.36;k.bob=kp.moving?Math.abs(Math.sin(kp.u*Math.PI*2))*g.cs*.12:0;k.z=k.gy-1;if(kp.moving&&z.k.c!==z.k.pc)k.flip=z.k.c<z.k.pc}
 if(s){s.h=Math.min(250,g.cs*2.3);const sw=heroBW(s);s.x=safeR()-sw/2-10;s.gy=g.y0+2;s.z=5000;s.bob=0;}
 if(n){n.h=Math.min(330,g.cs*3.3);const w=heroBW(n);n.x=Math.max(g.R+w*.42,safeR()-w/2-6);n.gy=g.y0+3.75*g.cs;n.z=n.gy}}
// ---- задания: ходьба / раскраска / выбор ответа / выбор предмета ----
function task(o){const z=ZS;return new Promise(res=>{z.si++;z.hint=null;z.eq='';const t=Object.assign({P:new Map(),W:new Set(),T:new Set(),N:new Set(),res,cnt:0,okd:0},o);
 t.T=new Set(o.T||[]);t.N=new Set(o.N||[]);if(o.A)t.A=new Set(o.A);t.pop={};t.wob={};z.t=t;if(o.goal)GOAL=o.goal;if(o.showHint&&o.hint)z.hint=Object.assign({t:T},o.hint);if(o.q)say(o.q).catch(()=>{})})}
function walkable(t,k){return t.T.has(k)||t.N.has(k)}
function bfs(t,from,to){const g=GR();const s=K(...from),e=K(...to);const prev={[s]:null},Q=[from];while(Q.length){const[c,r]=Q.shift();const k=K(c,r);if(k===e)break;
  for(const[dc,dr] of [[1,0],[-1,0],[0,1],[0,-1]]){const nc=c+dc,nr=r+dr,nk=K(nc,nr);if(nc<0||nr<0||nc>=g.cols||nr>3||nk in prev)continue;if(nk!==e&&!walkable(t,nk))continue;if(nk===e&&!walkable(t,nk))continue;prev[nk]=k;Q.push([nc,nr])}}
 if(!(e in prev))return null;const P=[];let k=e;while(k&&k!==s){P.unshift(UK(k));k=prev[k]}return P}
function walkTo(c,r){const z=ZS,t=z.t;if(z.v.c===c&&z.v.r===r)return;stopTalk();
 let P=bfs(t,[z.v.c,z.v.r],[c,r]);
 if(!P){// клетка не на дорожке: дойти до соседней клетки дорожки и шагнуть на неё (ошибка)
  let best=null;for(const[dc,dr] of [[1,0],[-1,0],[0,1],[0,-1]]){const nk=K(c+dc,r+dr);if(walkable(t,nk)||(c+dc===z.v.c&&r+dr===z.v.r)){const p=(c+dc===z.v.c&&r+dr===z.v.r)?[]:bfs(t,[z.v.c,z.v.r],[c+dc,r+dr]);if(p&&(!best||p.length<best.length))best=p}}
  if(best)P=[...best,[c,r]];else{P=[];let cc=z.v.c,cr=z.v.r;while(cc!==c){cc+=Math.sign(c-cc);P.push([cc,cr])}while(cr!==r){cr+=Math.sign(r-cr);P.push([cc,cr])}}}
 z.q=P}
function walkStep(){const z=ZS,t=z.t,v=z.v;if(!v||T<v.t1)return;if(v.arr){v.arr=0;arrive()}
 if(!z.q.length)return;const[c,r]=z.q.shift();v.pc=v.c;v.pr=v.r;v.c=c;v.r=r;v.t0=T;v.t1=T+(G.fast?.03:.36);v.arr=1;
 const k=z.k;if(k){k.pc=lerp(k.pc,k.c,clamp((T-k.t0)/Math.max(.001,k.t1-k.t0),0,1));k.pr=lerp(k.pr,k.r,clamp((T-k.t0)/Math.max(.001,k.t1-k.t0),0,1));k.c=v.pc;k.r=v.pr;k.t0=T;k.t1=T+(G.fast?.03:.42)}
 tone(520+((c+r)%3)*90,.07,'sine',.05)}
function arrive(){const z=ZS,t=z.t;if(!t||t.mode!=='walk')return;const v=z.v,k=K(v.c,v.r);const g=GR();
 if(t.T.has(k)){if(!t.P.has(k)){t.cnt++;t.P.set(k,{n:t.cnt,t:T});sayNow('n'+t.cnt);starNote(60+[0,2,4,5,7,9,11,12,14,16,17,19][(t.cnt-1)%12],acNow(),.11);burst(g.cx(v.c),g.cy(v.r),10,'spark',HUE[(t.cnt-1)%8],.5);if(t.onPaint)t.onPaint(k,t.cnt)}z.gp=z.good;z.good=[v.c,v.r]}
 else if(t.N.has(k)){z.gp=z.good;z.good=[v.c,v.r]}
 else{t.W.add(k);z.q=[];mistake();shake=4;SFX.splash();sayNow('w_off');pose('varya','',0)}
 if(!z.q.length&&!t.W.size&&[...t.T].every(k=>t.P.has(k))&&!t.fin){t.fin=1;run(async()=>{await wait(700);t.res()})}}
function erase(){const z=ZS,t=z.t;if(!t||!t.W.size)return;t.W.clear();z.fix++;SFX.whoosh();const g=GR();
 if(t.mode==='walk'){const v=z.v;z.q=[];v.pc=v.c;v.pr=v.r;v.c=z.good[0];v.r=z.good[1];v.t0=T;v.t1=T+(G.fast?.03:.5);burst(g.cx(v.pc),g.cy(v.pr),24,'spark',210,.7)}
 if(t.mode==='paint')checkPaint();}
// раскраска: Варя показывает карандашом, клетка закрашивается
function paintTap(c,r){const z=ZS,t=z.t,k=K(c,r),g=GR();const v=HR('varya');if(v){pose('varya','point',1.2);v.flip=g.cx(c)<v.x}
 if(t.W.has(k)){t.W.delete(k);z.fix++;SFX.whoosh();burst(g.cx(c),g.cy(r),16,'spark',210,.6);checkPaint();return}
 if(t.T.has(k)){if(t.P.has(k)){if(t.lockPaint)return;const n=t.P.get(k).n;t.P.delete(k);for(const p of t.P.values())if(p.n>n)p.n--;t.cnt--;tone(400,.12,'sine',.06,0,250);z.fix++;return}
  t.cnt++;t.P.set(k,{n:t.cnt,t:T});stopTalk();sayNow('n'+t.cnt);starNote(60+[0,2,4,5,7,9,11,12][(t.cnt-1)%8],acNow(),.11);burst(g.cx(c),g.cy(r),12,'spark',50,.5);trail(g.cx(c),g.cy(r));checkPaint();return}
 if(t.A&&t.A.has(k)){t.W.add(k);mistake();sayNow('p_bad');return}
 tone(300,.06,'sine',.04)}
const TRL=[];function trail(x,y){const v=HR('varya');if(!v||v.dx==null)return;TRL.push({x0:v.dx+(v.flip?-1:1)*v.h*.22,y0:v.y-v.h*.55,x,y,t0:T})}
function drawTrail(){for(let i=TRL.length-1;i>=0;i--){const s=TRL[i],u=(T-s.t0)/.35;if(u>1){TRL.splice(i,1);continue}for(let j=0;j<6;j++){const e=clamp(u-j*.04,0,1);const x=lerp(s.x0,s.x,e),y=lerp(s.y0,s.y,e)-Math.sin(e*Math.PI)*60;X.fillStyle=`hsla(${50+j*30},100%,70%,${1-u})`;X.beginPath();X.arc(x,y,7-j*.8,0,7);X.fill()}}}
function checkPaint(){const z=ZS,t=z.t;if(t.fin||t.W.size)return;if([...t.T].every(k=>t.P.has(k))){t.fin=1;run(async()=>{await wait(600);t.res()})}}
// выбор ответа
function pickAns(v,x,y){const z=ZS,t=z.t;if(!t||t.okd)return;
 if(v===t.ans){t.okd=1;t.pop[v]=T;react(true,x,y);burst(x,y,30,'conf',null,.7);if(t.eq)z.eq=t.eq;run(async()=>{if(t.ok)await sayNow(t.ok);await wait(500);t.res()});return}
 t.wob[v]=T;t.bad=(t.bad||0)+1;mistake();if(t.hint&&t.bad>=1&&!z.hint){z.hint=Object.assign({t:T},t.hint);if(HR('shur')){pose('shur','point',2);HR('shur').jump=T}}sayNow(t.badLine||'q_bad')}
function askGeo(g,n){const d=Math.min(118,(g.y0-safeT()-170)*1.1,120);const cx=g.mid,cy=g.y0-d*.62-14;return{d,cx,cy,gap:d*1.25,x:i=>cx+(i-(n-1)/2)*d*1.25}}
function drawAsk(g){const z=ZS,t=z.t;if(z.eq&&(!t||t.mode!=='ask'||t.okd)){const w=Math.min(520,g.cols*g.cs*.7);eqBoard(z.eq,g.mid,g.y0-w/aspect('board')/2-6,w)}
 if(!t||t.mode!=='ask'||t.okd)return;const a=askGeo(g,t.opts.length);t.opts.forEach((v,i)=>{const x=a.x(i);UI.push({id:'opt'+v,x,y:a.cy,w:a.d,h:a.d,fn:()=>pickAns(v,x,a.cy)});tile(x,a.cy,a.d,v,{wob:t.wob[v],pop:t.pop[v]})})}
// ---- секрет: загнутый уголок страницы — Квадратик учует ----
function secInit(cell){const z=ZS;z.sec={cell,on:0,open:0,got:SV.sec[z.n-1]?1:0,t:T+(G.fast?1:16)}}
function secStep(g){const z=ZS,s=z.sec;if(!s||s.got)return;if(!s.on&&T>s.t&&!talk&&!z.lock&&z.t&&!z.t.okd){s.on=T;const k=HR('kv');if(k){pose('kv','sniff',2.2);k.jump=T}say('sniff').catch(()=>{})}
 if(!s.on)return;const[c,r]=s.cell,x=g.cx(c),y=g.cy(r);X.save();X.globalAlpha=.4+.3*Math.sin(T*5);X.strokeStyle='#ffe066';X.lineWidth=8;X.beginPath();X.arc(x,y,g.cs*.62+Math.sin(T*5)*4,0,7);X.stroke();X.restore();
 spr('corner',x+g.cs*.08,y-g.cs*.05,g.cs*1.05,{rot:Math.sin(T*3)*.06})}
function secTap(x,y){const z=ZS,s=z.sec;if(!s||s.got||!s.on)return false;const g=GR();const[c,r]=s.cell;if(Math.abs(x-g.cx(c))<g.cs*.7&&Math.abs(y-g.cy(r))<g.cs*.7){s.open=T;s.got=1;SV.sec[z.n-1]=1;save();SFX.star();stopTalk();sayNow(SV.sec.every(v=>v)?'sec_all':'sec_ok');return true}return false}
function secOverlay(){const z=ZS,s=z.sec;if(!s||!s.open)return false;const v=vis(),u=clamp((T-s.open)/(G.fast?.01:.5),0,1);X.save();X.globalAlpha=.6*u;X.fillStyle='#10183a';X.fillRect(v.x0,v.y0,v.w,v.h);X.restore();
 const H=Math.min(560,v.h-110),W=Math.min(v.w-120,H*16/9);const cx=(safeL()+safeR())/2,cy=safeT()+100+H/2-10;const b=IM.bg_secret;X.save();X.globalAlpha=u;X.translate(cx,cy);X.scale(.8+.2*ease(u),.8+.2*ease(u));
 rr(-W/2,-H/2,W,H,28);X.save();X.clip();if(okI(b)){const k=Math.max(W/b.naturalWidth,H/b.naturalHeight);X.drawImage(b,-b.naturalWidth*k/2,-b.naturalHeight*k/2,b.naturalWidth*k,b.naturalHeight*k)}X.restore();X.lineWidth=8;X.strokeStyle='#fff3c8';X.stroke();
 const e=clamp((T-s.open-.5)/(G.fast?.01:.8),0,1);spr('chest',0,H*.22,H*.38);const sy=lerp(H*.15,-H*.12,ease(e));X.save();X.globalAlpha=e;X.translate(0,sy);X.rotate(Math.sin(T*2)*.08);X.fillStyle='rgba(255,240,150,.5)';X.beginPath();X.arc(0,0,H*.2,0,7);X.fill();fitSpr(STICK[z.n-1],0,0,H*.3);X.restore();X.restore();
 if(e>.5&&Math.random()<.3)burst(cx+rnd(-80,80),cy-H*.12+rnd(-50,50),1,'spark',50,.4);
 btn('secok','b_ok',cx+W/2-60,cy+H/2-60,100,()=>{s.open=0;burst(cx,cy,40,'conf',null,.8);SFX.coin()},{always:1});return true}
// ---- общий каркас уровня-поля ----
function fieldScene(def){return Object.assign({under:def.under,
 enter(){const z=zoneStart(def.n,{cols:0,rw:def.rw});const g0=GR();z.cols=g0.cols;fieldCast(def.npc,def.start&&def.start(z.cols));secInit(def.sec(z.cols));def.music&&def.music();if(!def.music)regionMus(def.n);
  run(async()=>{await wait(350);await def.play(z,z.cols)})},
 prog(){const z=ZS,t=z.t;return z.si*10000+(t?t.P.size*100+(t.okd?50:0):0)+z.fix},
 tapFirst(x,y){const z=ZS;if(z.sec&&z.sec.open)return true;if(secTap(x,y))return true;const t=z.t;if(!t)return false;const c=cellAt(x,y);if(!c)return false;
  if(t.mode==='walk'){if(z.q.length||T<z.v.t1)return true;if(t.W.size){sayNow('w_first');z.ewob=T;SFX.bad();return true}walkTo(c[0],c[1]);return true}
  if(t.mode==='paint'){if(t.fin)return true;paintTap(c[0],c[1]);return true}
  return false},
 onHero(n){const z=ZS;if(n==='kv'&&z.sec&&!z.sec.got){if(!z.sec.on){z.sec.on=T;pose('kv','sniff',2);sayNow('sniff')}else sayNow('sniff2');return false}
  if(n==='shur'&&z.t&&z.t.hint&&!z.hint){z.hint=Object.assign({t:T},z.t.hint);pose('shur','point',2);sayNow('hint');return false}return false},
 draw(){const z=ZS;bgDraw(def.bg);const g=GR();walkStep();drawBoard(g);secStep(g);placeCast(g);if(def.draw)def.draw(z,g);drawCast();drawTrail()},
 ui(){const z=ZS,g=GR();if(def.over)def.over(z,g);drawNums(g);drawAsk(g);const t=z.t;
  if(t&&(t.mode==='walk'||t.mode==='paint')){const w=t.W.size>0;const ew=z.ewob&&T-z.ewob<.6?Math.sin((T-z.ewob)*30)*.2:0;btn('erase','b_erase',safeL()+46,safeT()+150,100,erase,{dis:!w,pulse:w,rot:ew})}
  if(t&&t.mode==='pick'&&!t.okd)t.items.forEach((it,i)=>{const r=it.rect(g);UI.push({id:'pick'+i,x:r[0],y:r[1],w:r[2],h:r[3],fn:()=>pickItem(i)})});
  progDots(def.steps,z.dots);secOverlay()},
 taps(ok){const z=ZS,t=z.t;if(!t||z.lock||t.okd||t.fin||(z.sec&&z.sec.open))return['wait'];const g=GR();
  if(t.mode==='walk'){if(z.q.length||T<z.v.t1)return['wait'];if(ok){if(t.W.size)return[[safeL()+46,safeT()+150]];const L=[...t.T].filter(k=>!t.P.has(k));let best=null,bl=1e9;for(const k of L){const p=bfs(t,[z.v.c,z.v.r],UK(k));if(p&&p.length<bl){bl=p.length;best=UK(k)}}return best?[[g.cx(best[0]),g.cy(best[1])]]:['wait']}
   for(const[dc,dr] of [[0,-1],[1,0],[-1,0],[0,1]]){const c=z.v.c+dc,r=z.v.r+dr;if(c<0||r<0||c>=g.cols||r>3)continue;const k=K(c,r);if(!walkable(t,k)&&!(z.sec&&K(...z.sec.cell)===k))return[[g.cx(c),g.cy(r)]]}return[]}
  if(t.mode==='paint'){if(ok){if(t.W.size){const[c,r]=UK([...t.W][0]);return[[g.cx(c),g.cy(r)]]}const k=[...t.T].find(k=>!t.P.has(k));if(!k)return['wait'];const[c,r]=UK(k);return[[g.cx(c),g.cy(r)]]}
   const k=[...(t.A||[])].find(k=>!t.T.has(k)&&!t.W.has(k));if(!k)return[];const[c,r]=UK(k);return[[g.cx(c),g.cy(r)]]}
  if(t.mode==='ask'){const a=askGeo(g,t.opts.length);const i=ok?t.opts.indexOf(t.ans):t.opts.findIndex(v=>v!==t.ans);return[[a.x(i),a.cy]]}
  if(t.mode==='pick'){const i=t.items.findIndex(it=>!!it.ok===ok);if(i<0)return[];const r=t.items[i].rect(g);return[[r[0],r[1]]]}
  return['wait']}},def.extra||{})}
function pickItem(i){const z=ZS,t=z.t;if(!t||t.okd)return;const it=t.items[i];const g=GR();const r=it.rect(g);
 if(it.ok){t.okd=1;t.pop[i]=T;react(true,r[0],r[1]);burst(r[0],r[1],30,'conf',null,.7);if(t.eq)z.eq=t.eq;run(async()=>{if(t.onOk)await t.onOk();else if(t.ok)await sayNow(t.ok);await wait(400);t.res()});return}
 t.wob[i]=T;mistake();if(t.hint&&!z.hint)z.hint=Object.assign({t:T},t.hint);sayNow(t.badLine||'q_bad')}
// Варя возвращается на старт, чтобы не закрывать клетки
function goHome(c,r){const z=ZS,v=z.v;v.pc=v.c;v.pr=v.r;v.c=c;v.r=r;v.t0=T;v.t1=T+(G.fast?.03:.6);const k=z.k;k.pc=k.c;k.pr=k.r;k.c=c-1;k.r=r;k.t0=T;k.t1=T+(G.fast?.03:.7);z.good=[c,r]}
function dot(){const z=ZS;z.dots++;flyStar(640,300)}
// ---- музыка уровней: весёлая прогулочная песенка (шкатулка + щипки), у каждого места свой лад ----
const WALK=[[64,67,72,67, 65,69,72,69, 64,67,72,76, 74,72,67,0],[60,64,67,64, 62,65,69,65, 64,67,71,67, 72,0,67,0],[67,71,74,71, 69,72,76,72, 67,71,74,79, 76,74,71,0],
 [72,67,64,67, 69,65,60,65, 71,67,62,67, 72,76,72,0],[57,60,64,60, 62,65,69,65, 64,68,71,68, 69,0,64,0]];
const WALKCH=[['C','C','C','C','F','F','F','F','C','C','C','C','G','G','G','G'],['C','C','C','C','Dm','Dm','Dm','Dm','C','C','G','G','C','C','G','G'],['G','G','G','G','C','C','C','C','G','G','G','G','C','C','G','G'],
 ['C','C','C','C','F','F','F','F','G','G','G','G','C','C','C','C'],['Am','Am','Am','Am','Dm','Dm','Dm','Dm','E','E','E','E','Am','Am','E','E']];
function regionMus(n){const M=WALK[(n-1)%5],CH=WALKCH[(n-1)%5];musStart({bpm:[112,104,116,108,96][(n-1)%5],bar:16,kit:'soft',padVol:.016,chord:i=>CH[i%16],
 beat(i,w){const m=M[i%16];if(m)boxNote(midi(m+12),w,.06,1.1);if(i%2===0)pluck(midi(CHORDS[CH[i%16]][0]+12),0,.035)}})}
// ---- титул ----
SC.title={enter(){cast=[];musMenu()},
 draw(){bgDraw('title');const[lx0,ly0]=bgXY(640,118);const lw=Math.min(860,(safeR()-safeL())*.7);const lh=130;const lx=clamp(lx0,safeL()+lw/2,safeR()-lw/2),ly=Math.max(safeT()+lh/2+6,ly0);
  X.save();X.translate(lx,ly);X.rotate(Math.sin(T*1.1)*.012);slice3('lplank',0,0,lw,lh,{cap:1.3});X.restore();
  textIn('Варя и Тетрадная страна',lx,ly-2,lw*.82,lh*.62,76,'#fff6dc',{f:FONT,st:'#3a1a06',lw:9,id:'logo'});
  textIn('игра про клеточки',lx+lw*.2,ly+lh/2+30,lw*.6,52,46,'#fff36a',{f:FONT,st:'#1d3b8a',lw:8,id:'logo2'});
  // клеточки-светлячки вокруг названия
  for(let i=0;i<7;i++){const a=T*.6+i*0.9;const x=lx+Math.cos(a)*lw*.56,y=ly+Math.sin(a*1.3)*lh*.9;X.save();X.globalAlpha=.6+.4*Math.sin(T*3+i);X.fillStyle=`hsl(${HUE[i]},85%,65%)`;X.strokeStyle='#fff';X.lineWidth=3;rr(x-11,y-11,22,22,5);X.fill();X.stroke();X.restore()}},
 ui(){const[bx,by]=bgXY(1115,470);boardBtn('play',clamp(bx,safeL()+200,safeR()-180),clamp(by,safeT()+260,safeB()-80),340,'Играть',()=>{ac();if(!SV.intro)go('intro');else go('map')},{pulse:1,size:72});
  btn('sound','b_sound',safeR()-44,safeT()+42,84,()=>{G.mute=!G.mute;if(G.mute)stopTalk()},{always:1});if(G.mute){X.save();X.strokeStyle='#d0202a';X.lineWidth=9;X.lineCap='round';const x=safeR()-44,y=safeT()+42;X.beginPath();X.moveTo(x-30,y-30);X.lineTo(x+30,y+30);X.stroke();X.restore()}}};
// ---- вступление: Клякса заливает страну чернилами ----
function mapRect(){const v=vis(),k=Math.min(v.w/1280,v.h/720);const w=1280*k,h=720*k;return{x:640-w/2,y:v.y0+v.h-h,k,w,h}}
function drawMapBg(){const v=vis(),m=mapRect();const b=IM.bg_map;if(okI(b)){X.save();X.filter='blur(14px) brightness(.85)';const s=Math.max(v.w/1280,v.h/720)*1.1;X.drawImage(b,640-640*s,v.y0+v.h/2-360*s,1280*s,720*s);X.restore();X.drawImage(b,m.x,m.y,m.w,m.h)}BGN='map';return m}
SC.intro={enter(){cast=[hero('varya',0,{hide:1}),hero('kv',0,{hide:1}),hero('shur',0,{hide:1,fly:1}),hero('klyaksa',0,{hide:1})];const z=zoneStart(0,{blots:[],kl:0});musMenu();
  const kl=HR('klyaksa');
  run(async()=>{await wait(500);await say('i1');kl.hide=0;z.kl=T;SFX.whoosh();await wait(G.fast?20:700);
   const m=mapRect();for(const L of LVL){z.blots.push({x:L.pos[0],y:L.pos[1]+20,t:T});SFX.splash();shake=3;await wait(G.fast?10:260)}
   await say('i2');pose('klyaksa','',0);SFX.giggle();await say('i3');
   HR('varya').hide=0;HR('varya').jump=T;await say('i4');HR('kv').hide=0;HR('kv').jump=T;SFX.thump();await say('i5');HR('shur').hide=0;HR('shur').jump=T;SFX.bell();await say('i6');
   pose('varya','point',2.5);await say('i7');cheer();SV.intro=1;save();await wait(500);go('map')})},
 draw(){const z=ZS;const m=drawMapBg();for(const b of z.blots){const u=clamp((T-b.t)/(G.fast?.01:.3),0,1);spr('blot',m.x+b.x*m.k,m.y+b.y*m.k,170*m.k*(u<1?u*1.2:1),{a:.92,rot:b.x%3})}
  const g=safeB()-4,v=HR('varya'),k=HR('kv'),s=HR('shur'),kl=HR('klyaksa');v.h=Math.min(300,vis().h*.48);v.x=safeL()+v.h*.32;v.gy=g;k.h=v.h*.52;k.x=v.x+v.h*.42;k.gy=g;s.h=v.h*.5;s.x=v.x+v.h*.25;s.gy=g-v.h*.85+Math.sin(T*2.4)*8;
  kl.h=Math.min(260,vis().h*.42);const u=z.kl?clamp((T-z.kl)/(G.fast?.01:.8),0,1):0;kl.x=safeR()-kl.h*.4+(1-ease(u))*500;kl.gy=g-60+Math.sin(T*2)*14-(1-ease(u))*200;kl.fly=1;drawCast()},
 ui(){boardBtn('skip',640,safeB()-44,220,'Дальше',()=>{if(skipTalk)skipTalk()},{size:44});boardBtn('skipall',safeR()-125,safeB()-40,220,'Пропустить',()=>{SV.intro=1;save();go('map')},{size:34})}};
// ---- карта: Варя прыгает по дорожке из клеточек к выбранному месту ----
const MAPN=[[110,640],...LVL.map(L=>[L.pos[0],L.pos[1]+70])];
SC.map={enter(){cast=[hero('varya',0,{h:170})];GOAL='';musMenu();ZS=null;SC.map.mv=null;SC.map.at=clamp(SV.at||0,0,5);
  run(async()=>{await wait(300);if(SV.stars.every(v=>!v))await say('m1');else if(SV.stars.every(v=>v)&&!SV.fin)await say('m_fin')})},
 pt(i){const m=mapRect();return[m.x+MAPN[i][0]*m.k,m.y+MAPN[i][1]*m.k]},
 draw(){const m=drawMapBg();const M=SC.map;
  // дорожка из клеточек между островами
  for(let i=0;i<5;i++){const[a,b]=[M.pt(i),M.pt(i+1)];const L=Math.hypot(b[0]-a[0],b[1]-a[1]),n=Math.floor(L/(34*m.k+8));for(let j=1;j<n;j++){const x=lerp(a[0],b[0],j/n),y=lerp(a[1],b[1],j/n);const done=SV.stars[i];X.save();X.fillStyle=done?`hsl(${HUE[(i+j)%8]},80%,66%)`:'rgba(255,250,235,.9)';X.strokeStyle='#5a7fc8';X.lineWidth=3;const d=24*m.k+4;rr(x-d/2,y-d/2,d,d,4);X.fill();X.stroke();X.restore()}}
  const v=cast[0];v.h=clamp(300*m.k+50,200,330);let p=M.pt(M.at),bob=0;
  if(M.mv){const mv=M.mv,u=clamp((T-mv.t0)/mv.d,0,1);const seg=Math.min(mv.path.length-2,Math.floor(u*(mv.path.length-1))),f=u*(mv.path.length-1)-seg;const a=M.pt(mv.path[seg]),b=M.pt(mv.path[seg+1]);p=[lerp(a[0],b[0],f),lerp(a[1],b[1],f)];bob=Math.abs(Math.sin(f*Math.PI*3))*24;v.flip=b[0]<a[0];
   if(u>=1&&!mv.gone){mv.gone=1;SV.at=mv.path[mv.path.length-1];save();go(mv.sc)}}
  v.x=p[0];v.gy=p[1];v.bob=bob;drawCast()},
 ui(){const m=mapRect(),M=SC.map;
  LVL.forEach((z,i)=>{const x=m.x+z.pos[0]*m.k,y=m.y+z.pos[1]*m.k,open=SV.open>=z.n,done=SV.stars[i];const w=200*m.k+40,h=170*m.k+30;
   UI.push({id:'zone'+z.n,x,y,w,h,fn:()=>{if(M.mv)return;if(!open){sayNow('m_lock');SFX.bad();return}M.go(z.n,z.sc)}});
   if(open&&!done){X.save();X.globalAlpha=.35+.25*Math.sin(T*4);X.strokeStyle='#fff36a';X.lineWidth=7;X.beginPath();X.ellipse(x,y+20*m.k,w*.5,h*.42,0,0,7);X.stroke();X.restore()}
   if(!open)spr('lock',x,y,74);if(done)spr('star',x+w*.36,y-h*.3,66,{rot:Math.sin(T*2)*.1});if(SV.sec[i])fitSpr(STICK[i],x-w*.38,y-h*.3,54);
   plaque(z.name,x,Math.min(y+h*.5+30,safeB()-110),Math.max(200,230*m.k+40),{size:34,id:'zname',sp:'lplank',h:74,iw:.86,ih:.8,min:20})});
  {const w=5*50+30,y=safeB()-38;X.save();X.fillStyle='rgba(30,40,90,.55)';rr(640-w/2,y-30,w,60,30);X.fill();X.restore();for(let i=0;i<5;i++)spr(SV.stars[i]?'star':'star_dark',640-100+i*50,y,46)}
  if(SV.stars.every(v=>v)){const[fx,fy]=[m.x+1090*m.k,Math.min(m.y+640*m.k,safeB()-60)];boardBtn('fin',Math.min(fx,safeR()-262),fy,240,'Праздник',()=>go('fin'),{pulse:!SV.fin,size:44});if(SV.fin)spr('medal',Math.min(fx,safeR()-262)+100,fy-40,70)}
  btn('album','album',safeR()-66,safeB()-70,120,()=>go('album'),{pulse:SV.sec.some(v=>v)&&!SV.albumSeen})},
 go(n,sc){const M=SC.map;if(M.mv)return;const a=M.at,path=[];if(a===n){go(sc);return}const s=Math.sign(n-a);for(let i=a;i!==n+s;i+=s)path.push(i);
  M.mv={path,t0:T,d:G.fast?.05:.55*(path.length-1),sc};SFX.zip()}};
// ---- альбом наклеек ----
SC.album={enter(){cast=[hero('shur',0,{fly:1})];zoneStart(0);SV.albumSeen=1;save();musMenu();run(async()=>{await wait(300);await say('m_album')})},
 draw(){drawMapBg();const v=vis();X.fillStyle='rgba(20,24,60,.45)';X.fillRect(v.x0,v.y0,v.w,v.h);
  const W=Math.min(v.w-240,1000),H=Math.min(v.h-210,470),cx=(safeL()+safeR())/2,cy=safeT()+190+H/2-20;
  X.save();X.shadowColor='rgba(0,0,0,.4)';X.shadowBlur=24;X.fillStyle='#fff9ea';rr(cx-W/2,cy-H/2,W,H,24);X.fill();X.restore();X.fillStyle='#e8d6b0';X.fillRect(cx-4,cy-H/2,8,H);
  X.save();X.strokeStyle='rgba(80,130,220,.25)';X.lineWidth=2;for(let x=cx-W/2+30;x<cx+W/2;x+=30){X.beginPath();X.moveTo(x,cy-H/2+8);X.lineTo(x,cy+H/2-8);X.stroke()}for(let y=cy-H/2+30;y<cy+H/2;y+=30){X.beginPath();X.moveTo(cx-W/2+8,y);X.lineTo(cx+W/2-8,y);X.stroke()}X.restore();
  const d=Math.min(W/5.6,H*.55);for(let i=0;i<5;i++){const x=cx+(i-2)*W/5.2,y=cy+12;X.save();X.setLineDash([10,8]);X.strokeStyle='#8aa0d0';X.lineWidth=4;rr(x-d/2,y-d/2,d,d,16);X.stroke();X.restore();
   if(SV.sec[i])fitSpr(STICK[i],x,y+Math.sin(T*2+i)*4,d*.9);else txt('?',x,y,d*.5,'#b8c4e4',{f:NUM,st:0,box:[x-d/2,y-d/2,x+d/2,y+d/2],id:'q'});
   textIn(LVL[i].name,x,y+d/2+32,W/5.4,56,30,'#2b2440',{f:BODY,st:0,id:'alb',min:16})}
  const s=cast[0];s.h=150;s.x=safeL()+90;s.gy=safeB()-20+Math.sin(T*2)*8;drawCast();
  textIn('Альбом наклеек',cx,cy-H/2+48,Math.min(560,W*.7),64,52,'#1d3b8a',{f:FONT,st:'#fff',lw:6,id:'albt'})},
 ui(){}};
function RECT(c0,r0,w,h){const o=[];for(let r=r0;r<r0+h;r++)for(let c=c0;c<c0+w;c++)o.push(K(c,r));return o}
function ROW(c0,r,w){return RECT(c0,r,w,1)}
function rowHint(c0,r0,w,h){const rows=[];for(let r=r0;r<r0+h;r++)rows.push([r,c0+w-1,w,c0]);return{c0,rows}}
function colHint(c0,r0,w,h){const cols=[];for(let c=c0;c<c0+w;c++)cols.push([c,r0,h]);return{r1:r0+h-1,cols}}
