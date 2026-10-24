/* Isolated VM used by the 302 visual catalogue. No app storage or network. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function createEnv(record){
 const styles=[],registrations={},events={},stats={saves:0,renders:0,wins:0};
 const c={window:null,console,ARH_LESSONS:[{id:301,title:'Neighbor unchanged'},{id:302,__планПорядок:118,title:'Legacy 302',comic:{old:true}}],WAVE_B:{},CHS:{},DB:{points:0,lessons:{302:record||{tasks:[],stars:0,done:false}}},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(s){if(s.textContent&&!styles.includes(s.textContent))styles.push(s.textContent);}}},addEventListener(name,fn){(events[name]||=[]).push(fn);},save(){stats.saves++;},bumpDay(){},logEvent(){},toast(){},showConfetti(){},setTimeout(){return 0;},clearTimeout(){}};
 c.window=c;vm.createContext(c);
 const core=fs.readFileSync(path.join(root,'MVP/js/lessons.js'),'utf8');
 vm.runInContext(core.slice(0,core.indexOf('/* ---------- виджеты-визуализации ---------- */')),c);
 c.renderLessonView=()=>stats.renders++;c.lidKey=id=>'l'+id;
 const nativeWin=c.lvWin;c.lvWin=()=>{const before=c.lrec().tasks.length;nativeWin();if(c.lrec().tasks.length>before)stats.wins++;};
 c.ДТ={подключить:x=>{registrations.trainer=x;}};
 const kit=fs.readFileSync(path.join(root,'MVP/data/jun_kit.js'),'utf8');
 vm.runInContext(kit.replace(/\}\)\(\);\s*$/, 'window.__qaKitRender=рисовать;window.__qaKitStyle=СТИЛЬ;})();'),c);
 styles.push(c.__qaKitStyle);
 const connect=c.ДК.подключить;c.ДК.подключить=x=>{registrations.lesson=x;connect(x);};
 vm.runInContext(fs.readFileSync(path.join(root,'MVP/data/lesson_jun302_vyrazheniya.js'),'utf8'),c);
 return {c,api:c.GLOW302,styles,registrations,events,stats};
}


/* Independent arithmetic actions, shared by tests and visual fixtures. */
const total=(a,op,n)=>op==='−'?a-n:a+n;
const mathKinds=new Set(['add','remove','substitute','repair','final','trials']);
function plans(p){
 const groups=[];
 if(p.kind==='identify')for(const q of p.questions)groups.push([['pick',q.answer]]);
 else if(p.kind==='letter')groups.push([['pick',p.answer]]);
 else if(mathKinds.has(p.kind))for(const a of p.kind==='trials'?p.values:[p.a])groups.push([['place',a],...Array.from({length:p.n},()=>['move',1]),['answer',total(a,p.op,p.n)]]);
 else if(p.kind==='compose')for(const r of p.rounds||[p])groups.push([r.letter,r.op,String(r.n)].map(v=>['token',v]));
 else if(p.kind==='compare'){const values=p.ops.map(r=>total(p.a,r.op,r.n));groups.push([['light',0],['light',1],['route',values[0]>values[1]?0:1]]);}
 else if(p.kind==='explore')groups.push([['test',null],['start',1],['test',null],['start',1],['test',null]]);
 else throw Error('Unrecognized activity: '+p.kind);
 return groups;
}
function run(M,p,s,steps,send){for(const [a,v]of steps)(send||((a,v)=>M.apply(p,s,a,v)))(a,v);return s;}
function solve(M,p,s,send){for(const g of plans(p))run(M,p,s,g,send);return s;}
function prepareRound(M,p,round){const s=M.initial(p),g=plans(p);for(let r=0;r<round;r++)run(M,p,s,g[r]);return s;}
function intermediate(M,p){const s=M.initial(p),g=plans(p)[0];run(M,p,s,g.slice(0,Math.max(1,g.length-1)));return s;}
function wrong(M,p){const s=M.initial(p),g=plans(p)[0];
 if(p.kind==='identify')M.apply(p,s,'pick',(p.questions[0].answer+1)%p.questions[0].opts.length);
 else if(p.kind==='letter')M.apply(p,s,'pick',(p.answer+1)%p.opts.length);
 else if(mathKinds.has(p.kind)){run(M,p,s,g.slice(0,-1));M.apply(p,s,'answer',g.at(-1)[1]+1);}
 else if(p.kind==='compare'){run(M,p,s,g.slice(0,-1));M.apply(p,s,'route',1-g.at(-1)[1]);}
 else if(p.kind==='compose'){M.apply(p,s,'token',(p.rounds?.[0]||p).op);}
 else if(p.kind==='explore'){M.apply(p,s,'test');M.apply(p,s,'test');}
 return s;
}


const assert=require('assert/strict');
const clone=x=>JSON.parse(JSON.stringify(x));
function unchanged(fn,s,message){const before=JSON.stringify(s);fn();assert.equal(JSON.stringify(s),before,message);}
function review(){
 const e=createEnv(),{c,api:M}=e;assert(M,'New GLOW302 export is not ready');
 assert.equal(M.scenes.length,12);assert.equal(M.tasks.length,12);assert.equal(M.frames.length,12);
 const content=JSON.stringify([M.scenes,M.tasks]);assert(!/яблок|корзин/i.test(content),'New story still uses apples/baskets');
 let rendered=0,numericWrong=0;
 for(const [scope,list] of [['story',M.scenes],['practice',M.tasks]])for(const [i,p]of list.entries()){
  const tag=`${scope} ${i+1} ${p.kind}`, original=JSON.stringify(p),s=M.initial(p);assert(!s.ok,tag+' starts solved');
  unchanged(()=>M.apply(p,s,'not-an-action',123),s,tag+' unknown action');
  for(const action of ['place','move','answer','pick','start','light','route'])for(const value of [-999,999,NaN,Infinity,1.5,'1',null,undefined,{},[]]){
   const t=M.initial(p);unchanged(()=>M.apply(p,t,action,value),t,`${tag} ${action} invalid ${String(value)}`);
  }
  const hint=M.initial(p);M.apply(p,hint,'hint');assert(hint.fb,tag+' hint missing');assert(!hint.ok,tag+' hint solved');
  const groups=plans(p);
  if(p.kind==='identify'||p.kind==='letter')for(let round=0;round<groups.length;round++){
   const q=p.kind==='letter'?p:p.questions[round];
   for(let value=0;value<q.opts.length;value++){const t=prepareRound(M,p,round);M.apply(p,t,'pick',value);assert.equal(t.ok,value===q.answer&&round===groups.length-1,tag+' wrong option accepted');if(value!==q.answer){assert(t.fb);assert.equal(t.round,prepareRound(M,p,round).round);}}
  }
  if(mathKinds.has(p.kind))for(let round=0;round<groups.length;round++){
   const g=groups[round],base=p.kind==='trials'?p.values[round]:p.a,result=total(base,p.op,p.n);
   for(let answer=0;answer<=Math.max(30,Number(String(base)+p.n));answer++)if(answer!==result){const t=prepareRound(M,p,round);run(M,p,t,g.slice(0,-1));M.apply(p,t,'answer',answer);assert(!t.ok,tag+' incorrect number accepted '+answer);assert.equal(t.round,round,tag+' wrong number advanced round');assert(t.fb);numericWrong++;}
   const t=prepareRound(M,p,round);M.apply(p,t,'answer',result);assert(!t.ok,tag+' answer bypassed substitution/action');
   for(const [action,value]of g){M.apply(p,t,action,value);assert.equal(JSON.stringify(p),original,tag+' original letter changed');}
  }
  if(p.kind==='compose')for(let round=0;round<p.rounds.length;round++)for(let slot=0;slot<3;slot++)for(const token of ['a','c','+','−','2','3']){
   const want=plans(p)[round];if(token===want[slot][1])continue;const t=prepareRound(M,p,round);run(M,p,t,want.slice(0,slot));const before=JSON.stringify(t.tokens);M.apply(p,t,'token',token);assert(!t.ok,tag+' wrong token solved');assert.equal(JSON.stringify(t.tokens),before,tag+' wrong token entered expression');assert.equal(t.round,round);assert(t.fb);run(M,p,t,want.slice(slot));assert.equal(t.ok,round===p.rounds.length-1,tag+' cannot recover after wrong token');
  }
  if(mathKinds.has(p.kind))for(let round=0;round<groups.length;round++){
   const base=p.kind==='trials'?p.values[round]:p.a;
   if(p.kind!=='add')for(let n=0;n<=12;n++)if(n!==base){const t=prepareRound(M,p,round);M.apply(p,t,'place',n);assert(!t.substituted,tag+' wrong value substituted');assert(!t.ok);}
   const t=prepareRound(M,p,round);M.apply(p,t,'place',base);unchanged(()=>M.apply(p,t,'move',-1),t,tag+' delta below zero');M.apply(p,t,'move',1);assert.equal(t.delta,1);M.apply(p,t,'move',-1);assert.equal(t.delta,0);for(let j=0;j<p.n;j++)M.apply(p,t,'move',1);unchanged(()=>M.apply(p,t,'move',1),t,tag+' delta above target');
  }
  if(p.kind==='compare'){
   const values=p.ops.map(x=>total(p.a,x.op,x.n)),winner=values[0]>values[1]?0:1;
   for(const side of [0,1]){const t=M.initial(p);M.apply(p,t,'route',side);assert(!t.ok,tag+' skipped lighting');M.apply(p,t,'light',0);M.apply(p,t,'route',side);assert(!t.ok,tag+' skipped second route');M.apply(p,t,'light',1);M.apply(p,t,'route',side);assert.equal(t.ok,side===winner,tag+' wrong comparison');}
   for(let base=0;base<=6;base++){if(p.ops.some(o=>o.op==='−'&&base<o.n))continue;const changed={...p,a:base},t=M.initial(changed);solve(M,changed,t);assert(t.ok,tag+' comparison failed equal start '+base);}
  }
  if(p.kind==='explore'){
   const t=M.initial(p);for(let value=0;value<=6;value++){if(value)M.apply(p,t,'start',1);assert.equal(t.value,value,tag+' value range');M.apply(p,t,'test');const count=t.visited.length;M.apply(p,t,'test');assert.equal(t.visited.length,count,tag+' duplicate probe counted');assert.equal(t.ok,value>=2,tag+' completion threshold');}
   assert.equal(new Set(t.visited).size,7,tag+' post-completion exploration blocked');M.apply(p,t,'start',1);assert.equal(t.value,6);for(let j=0;j<8;j++)M.apply(p,t,'start',-1);assert.equal(t.value,0);
  }
  solve(M,p,s);assert(s.ok,tag+' independently unsolvable');
  if(p.kind!=='explore')for(const action of ['hint','place','move','answer','pick','token','start','test','light','route'])unchanged(()=>M.apply(p,s,action,1),s,tag+' solved state mutated '+action);
  const restored=M.initial(p);M.restoreSolved(p,restored);assert(restored.ok,tag+' restoreSolved failed');
  for(const state of [M.initial(p),hint,wrong(M,p),intermediate(M,p),s,restored]){const html=M.renderGame(p,state,scope,i);assert(!/undefined|NaN|Infinity/.test(html),tag+' broken HTML');assert(html.includes('<button')||state.ok,tag+' missing controls');rendered++;}
  assert.equal(JSON.stringify(p),original,tag+' config mutated');
 }
 const registration=e.registrations.lesson;assert(registration,'Missing native junior kit registration');
 const native=registration.запись.tasks;assert.equal(native.length,12);assert.equal(native[0].kind,'unit');assert.equal(native[0].ans,6);assert.equal(native[1].kind,'choice');assert.equal(native[1].choices[native[1].ans],'9');assert.equal(native[2].kind,'unit');assert.equal(native[2].ans,10);
 assert.equal(registration.запись.check.choices[registration.запись.check.ans],'8');
 // Rendered counts must retain the ORIGINAL letter quantity after every object move.
 for(const p of [...M.scenes,...M.tasks].filter(p=>mathKinds.has(p.kind))){
  const s=M.initial(p);for(const group of plans(p)){for(const [a,v]of group){M.apply(p,s,a,v);if(!s.substituted)continue;const base=p.kind==='trials'?p.values[s.round]:p.a;
   const html=M.renderGame(p,s,'story',0),counts=[...html.matchAll(/data-original="(\d+)" data-current="(\d+)"/g)];
   assert(counts.length,'Missing readable count data');for(const m of counts){assert.equal(+m[1],base,'Letter no longer records original quantity');assert.equal(+m[2],total(base,p.op,s.delta),'Visible quantity inconsistent with action');}
   if(p.letter)assert(html.includes(`${p.letter} = ${base}`),'Original letter label is missing');
  }}
 }
 // Native awards, with the real lvPick/lvWin implementation rather than reward mocks.
 const reward=createEnv(),r=reward.c,R=reward.api;r.LV={id:302,phase:'tasks',step:11,task:0,hints:0};
 const current=i=>r.lrec().glow302.practice[i];
 for(let i=0;i<12;i++){
  r.LV.task=i;r.LV.hints=0;reward.registrations.lesson.тренажёр.задачи[i].картинка();
  for(const group of plans(R.tasks[i]))for(const [a,v]of group){const rev=current(i).rev;R.act('practice',i,a,v,rev);}
  assert(current(i).ok,'Practice UI cannot finish '+i);assert.equal(reward.stats.wins,i+1);assert.equal(r.lrec().stars,i+1);assert.equal(r.DB.points,(i+1)*18);
  const saved=JSON.stringify(r.DB);R.act('practice',i,'answer',99,current(i).rev);R.act('practice',i,'answer',99,0);assert.equal(JSON.stringify(r.DB),saved,'Repeated award/completed answer');
 }
 assert(r.lrec().done);assert.equal(new Set(r.lrec().tasks).size,12);
 // A stale revision cannot apply the same move twice or affect another task/lesson.
 const stale=createEnv(),sc=stale.c,S=stale.api;sc.LV={id:302,phase:'tasks',step:0,task:0,hints:0};stale.registrations.lesson.тренажёр.задачи[0].картинка();
 let ps=()=>sc.DB.lessons[302].glow302.practice[0];S.act('practice',0,'place',9,ps().rev);let rev=ps().rev;S.act('practice',0,'move',1,rev);const after=JSON.stringify(sc.DB);assert.equal(S.act('practice',0,'move',1,rev),false);assert.equal(JSON.stringify(sc.DB),after,'Doubletap moved twice');
 for(const [scope,index,id,phase,task]of [['practice',1,302,'tasks',0],['story',0,302,'tasks',0],['practice',0,309,'tasks',0],['practice',0,302,'check',0],['practice',0,302,'tasks',1]]){sc.LV={id,phase,task,step:0};assert.equal(S.act(scope,index,'move',1,ps().rev),false,'Stale navigation accepted');assert.equal(JSON.stringify(sc.DB),after);}
 sc.LV={id:302,phase:'tasks',task:0,step:0,hints:0};
 // Story persistence uses current native frame state; lesson/game/legacy progress survives.
 const legacy={tasks:[0,1,2],stars:3,done:true,game:{done:2,of:5},glow302:{version:1,frames:{},practice:{}}};
 const persisted=createEnv(clone(legacy)),pc=persisted.c,P=persisted.api;pc.LV={id:302,phase:'explain',step:3,task:0,hints:0};const el={innerHTML:'',querySelector:()=>null};pc.WAVE_B[302](el);
 let st=()=>pc.CHS.l302.п[3];P.act('story',3,'place',4,st().rev);P.act('story',3,'move',1,st().rev);const expected=clone(st()),record=clone(pc.lrec());assert.deepEqual(record.tasks,[0,1,2]);assert.equal(record.stars,3);assert.deepEqual(record.game,{done:2,of:5});
 const resumed=createEnv(record),rc=resumed.c;rc.LV={id:302,phase:'explain',step:3,task:0,hints:0};rc.WAVE_B[302](el);assert.equal(JSON.stringify(rc.CHS.l302.п[3]),JSON.stringify(expected),'Story not restored');
 rc.LV.phase='tasks';for(let i=0;i<3;i++){rc.LV.task=i;resumed.registrations.lesson.тренажёр.задачи[i].картинка();assert(rc.lrec().glow302.practice[i].ok);assert.equal(resumed.api.act('practice',i,'answer',[6,9,10][i],rc.lrec().glow302.practice[i].rev),false);}
 assert.equal(rc.lrec().stars,3);assert.equal(rc.DB.points,0);assert.equal(resumed.stats.wins,0);
 // Partial practice is restored even when a user goes directly into the trainer.
 const partial=clone(sc.lrec()),reload=createEnv(partial);reload.c.LV={id:302,phase:'tasks',task:0,step:0,hints:0};reload.registrations.lesson.тренажёр.задачи[0].картинка();assert.equal(reload.c.lrec().glow302.practice[0].delta,1);assert(reload.c.lrec().glow302.practice[0].substituted);
 // Navigation gate checks do not leak to other lessons or block backward navigation.
 const gated=createEnv(),gc=gated.c;let moves=0,checks=0;gc.lvStep=()=>moves++;gc.lvToCheck=()=>checks++;for(const fn of gated.events.load||[])fn();gc.LV={id:302,phase:'explain',step:0};gc.WAVE_B[302](el);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,0);assert.equal(checks,0);gc.lvStep(-1);assert.equal(moves,1);gated.api.restoreSolved(gated.api.scenes[0],gc.CHS.l302.п[0]);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,2);assert.equal(checks,1);gc.LV.id=301;gc.lvStep(1);gc.lvToCheck();assert.equal(moves,3);assert.equal(checks,2);
 // Header/footer markup is the pre-redesign shell; no lesson selector targets either.
 const index=fs.readFileSync(path.join(root,'MVP/index.html'),'utf8'),hash=x=>require('crypto').createHash('sha256').update(x).digest('hex');
 assert.equal(hash(index.match(/<header>[\s\S]*?<\/header>/)[0]),'384648571f8f871dd08923c102d043ecd35bb67041f8671ea3be653567e775e1','Header changed');
 assert.equal(hash(index.match(/<nav class="nav"[^>]*>[\s\S]*?<\/nav>/)[0]),'6a70aacd084dd2457414dd4fd3ed87138d9ce4a5af7830801984a82c8d4668e1','Footer changed');
 const lessonCSS=fs.readFileSync(path.join(root,'MVP/css/lesson302.css'),'utf8');assert(!/(?:^|[}\n])[^{}]*\b(?:header|footer|navBar)\b[^{}]*\{/m.test(lessonCSS),'Lesson CSS alters shared shell');
 assert.equal(r.ARH_LESSONS.find(x=>x.id===301).title,'Neighbor unchanged');assert.equal(r.ARH_LESSONS.find(x=>x.id===302).__планПорядок,118);assert.equal(r.ARH_LESSONS.find(x=>x.id===302).comic,undefined);

 console.log(`PASS 302 core: 24 activities; ${numericWrong} wrong numeric answers; ${rendered} renders; substitution/comparison/exploration invariants; native rewards once; stale actions; persistence; legacy answers; shell isolation.`);
 return e;
}
module.exports={createEnv,root,total,mathKinds,plans,run,solve,prepareRound,intermediate,wrong,review};
if(require.main===module)review();
