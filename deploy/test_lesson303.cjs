/* Isolated VM used by the 303 model and visual catalogue. No app storage or network. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function createEnv(record){
 const styles=[],registrations={},events={},stats={saves:0,renders:0,wins:0};
 const c={window:null,console,ARH_LESSONS:[{id:301,title:'Neighbor unchanged'},{id:303,__планПорядок:118,title:'Legacy 303',comic:{old:true}}],WAVE_B:{},CHS:{},DB:{points:0,lessons:{303:record||{tasks:[],stars:0,done:false}}},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(s){if(s.textContent&&!styles.includes(s.textContent))styles.push(s.textContent);}}},addEventListener(name,fn){(events[name]||=[]).push(fn);},save(){stats.saves++;},bumpDay(){},logEvent(){},toast(){},showConfetti(){},setTimeout(){return 0;},clearTimeout(){}};
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
 vm.runInContext(fs.readFileSync(path.join(root,'MVP/lessons/303/content.js'),'utf8'),c);
 vm.runInContext(fs.readFileSync(path.join(root,'MVP/data/lesson_jun303_uravneniya.js'),'utf8'),c);
 return {c,api:c.RIVER303,styles,registrations,events,stats};
}


// The arithmetic oracle deliberately reads the equation, independently of model fields.
function equationValue(p,x){const [left,op,right,,target]=p.equation; const a=left==='x'?x:Number(left), b=right==='x'?x:Number(right); return {left:op==='+'?a+b:a-b,right:Number(target)};}
function expected(p){const solutions=Array.from({length:31},(_,i)=>i).filter(x=>{const v=equationValue(p,x);return v.left===v.right;});if(solutions.length!==1)throw Error('Expected exactly one solution: '+p.equation.join(' '));return solutions[0];}
const assert=require('assert/strict');
const clone=x=>JSON.parse(JSON.stringify(x));
function unchanged(fn,s,message){const before=JSON.stringify(s);fn();assert.equal(JSON.stringify(s),before,message);}

function reviewContent(M){
 const content=JSON.parse(fs.readFileSync(path.join(root,'MVP/lessons/303/content.json'),'utf8'));
 assert.equal(JSON.stringify(M.scenes),JSON.stringify(content.scenes),'Browser content differs from authored story');
 assert.equal(JSON.stringify(M.tasks),JSON.stringify(content.tasks),'Browser content differs from authored tasks');
 assert.equal(M.scenes.length,12);assert.equal(M.tasks.length,12);assert.equal(M.frames.length,12);
 assert(!/яблок|корзин|кекс|Пых|Хрум/i.test(JSON.stringify(content)),'Old story or excluded props remain');
 const seenModes=new Set(),seenKinds=new Set();
 for(const p of [...M.scenes,...M.tasks,...M.scenes.flatMap(p=>p.rounds||[])]){
  assert.equal(p.total,p.known+p.unknown,'Parts do not form whole: '+p.t);
  assert.equal(p.equation.filter(v=>v==='x').length,1,'Must have one unknown');
  assert.equal(p.equation[3],'=');assert(['+','−'].includes(p.equation[1]));
  const answer=expected(p);assert.equal(M.solution(p),answer,'Model confuses unknown whole/part: '+p.t);
  assert.equal(answer,p.mode==='whole'?p.total:p.unknown,'Role of unknown inconsistent with equation');
  assert(p.q&&p.hint&&p.sol,'Missing child-facing content: '+p.t);
  seenModes.add(p.mode);seenKinds.add(p.kind);
 }
 assert.deepEqual([...seenModes].sort(),['add','take','whole']);
 assert(seenKinds.size>=8,'Too little activity variety');
 assert(M.tasks.some(p=>expected(p)===0),'Missing zero-part exercise');
 const check=content.check;assert.equal(check.choices[check.ans],'5');
}

function reviewShell(){
 const index=fs.readFileSync(path.join(root,'MVP/index.html'),'utf8');
 const hash=x=>require('crypto').createHash('sha256').update(x).digest('hex');
 assert.equal(hash(index.match(/<header>[\s\S]*?<\/header>/)[0]),'384648571f8f871dd08923c102d043ecd35bb67041f8671ea3be653567e775e1','Header changed');
 assert.equal(hash(index.match(/<nav class="nav"[^>]*>[\s\S]*?<\/nav>/)[0]),'6a70aacd084dd2457414dd4fd3ed87138d9ce4a5af7830801984a82c8d4668e1','Footer changed');
 const css=fs.readFileSync(path.join(root,'MVP/css/lesson303.css'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
 assert(!/(?:^|[}\n])[^{}]*\b(?:header|footer|navBar)\b[^{}]*\{/m.test(css),'Lesson CSS alters shared shell');
}

const moving=p=>['build','remove','reunite'].includes(p.kind);
function prerequisites(p){
 if(moving(p))return [...Array.from({length:p.total-p.known},()=>['move',1]),['count',null]];
 if(p.kind==='role')return [['role',p.mode==='whole'?'whole':'part'],['method',p.mode==='whole'?'+':'−']];
 if(p.kind==='method')return [['method',p.mode==='whole'?'+':'−']];
 if(p.kind==='repair')return [['probe',null]];
 if(p.kind==='compose')return p.equation.map(v=>['token',String(v)]);
 return [];
}
function plans(p){return p.kind==='concert'?p.rounds.map((q,i)=>[...(i?[['next',null]]:[]),['answer',expected(q)],['verify',null]]):[[...prerequisites(p),['answer',expected(p)],['verify',null]]];}
function run(M,p,s,steps,send){for(const[a,v]of steps)(send||((a,v)=>M.apply(p,s,a,v)))(a,v);return s;}
function solve(M,p,s,send){for(const group of plans(p))run(M,p,s,group,send);return s;}
function prepareRound(M,p,round=0){const s=M.initial(p);for(let i=0;i<round;i++)run(M,p,s,plans(p)[i]);if(round)M.apply(p,s,'next',null);if(!round)run(M,p,s,prerequisites(p));return s;}
function intermediate(M,p){const s=M.initial(p),g=plans(p)[0];run(M,p,s,g.slice(0,Math.max(1,g.length-2)));return s;}
function wrong(M,p){const s=prepareRound(M,p),q=p.kind==='concert'?p.rounds[0]:p;M.apply(p,s,'answer',(expected(q)+1)%21);M.apply(p,s,'verify',null);return s;}
function states(M,p){const out=[clone(M.initial(p))],s=M.initial(p);M.apply(p,s,'hint',null);out.push(clone(s),clone(wrong(M,p)));for(const group of plans(p))for(const[a,v]of group){M.apply(p,s,a,v);out.push(clone(s));}return out;}

function reviewModel(M){let wrongCount=0,rendered=0,stateCount=0;
 const allActions=['move','count','role','method','probe','token','undo','answer','verify','next','note','hint'];
 for(const[scope,list]of[['story',M.scenes],['practice',M.tasks]])for(const[i,p]of list.entries()){
  const tag=`${scope} ${i+1} ${p.kind}`,original=JSON.stringify(p),s=M.initial(p);assert(!s.ok);
  unchanged(()=>M.apply(p,s,'unsupported',0),s,tag+' unknown action');
  for(const value of [-1,21,NaN,Infinity,1.5,'5',null,undefined,{},[]]){const t=prepareRound(M,p);unchanged(()=>M.apply(p,t,'answer',value),t,tag+' invalid answer');}
  const hinted=M.initial(p);M.apply(p,hinted,'hint',null);assert.equal(hinted.fb,p.hint);assert(!hinted.ok);
  // Reaching an answer is not enough: substitution must be checked explicitly.
  const g=prepareRound(M,p);M.apply(p,g,'answer',expected(p.kind==='concert'?p.rounds[0]:p));assert.equal(g.stage,'check');assert(!g.ok);
  if(prerequisites(p).length){const t=M.initial(p);unchanged(()=>M.apply(p,t,'answer',expected(p)),t,tag+' answer bypassed learning action');unchanged(()=>M.apply(p,t,'verify',null),t,tag+' check bypassed learning action');}
  for(let round=0;round<(p.rounds||[p]).length;round++){
   const q=p.rounds?.[round]||p,correct=expected(q);
   for(let n=0;n<=20;n++)if(n!==correct){
    const t=prepareRound(M,p,round),completed=JSON.stringify(t.completed);M.apply(p,t,'answer',n);assert.equal(t.stage,'check');assert(!t.ok);M.apply(p,t,'verify',null);assert(!t.ok,tag+' accepted '+n);assert.equal(t.stage,'answer');assert.equal(JSON.stringify(t.completed),completed);assert(t.fb&&t.tone==='error');
    const vals=equationValue(q,n);assert(t.fb.includes(String(vals.left))&&t.fb.includes(String(vals.right)),tag+' wrong-answer explanation lacks compared quantities');
    M.apply(p,t,'answer',correct);M.apply(p,t,'verify',null);assert.equal(t.ok,round===(p.rounds||[p]).length-1,tag+' cannot recover after error');wrongCount++;
   }
  }
  if(moving(p)){
   const t=M.initial(p),limit=p.kind==='remove'?p.total:p.kind==='reunite'?p.total-p.known:12-p.known;
   unchanged(()=>M.apply(p,t,'move',-1),t,tag+' negative transfer');
   for(let amount=0;amount<=limit;amount++){
    const trial=M.initial(p);for(let j=0;j<amount;j++)M.apply(p,trial,'move',1);assert.equal(trial.delta,amount);M.apply(p,trial,'count',null);assert.equal(trial.stage,amount===p.total-p.known?'answer':'act',tag+' count accepted wrong group');
    if(amount!==p.total-p.known){assert(trial.fb);assert(!trial.ok);}
   }
   for(let j=0;j<limit;j++)M.apply(p,t,'move',1);unchanged(()=>M.apply(p,t,'move',1),t,tag+' transfer beyond available objects');
   for(let j=0;j<limit;j++)M.apply(p,t,'move',-1);assert.equal(t.delta,0,tag+' transfers not reversible');
  }
  if(p.kind==='role'){
   const t=M.initial(p);M.apply(p,t,'role',p.mode==='whole'?'part':'whole');assert.equal(t.stage,'role');assert(t.fb);assert(!t.ok);M.apply(p,t,'role',p.mode==='whole'?'whole':'part');assert.equal(t.stage,'method');
  }
  if(['role','method'].includes(p.kind)){
   const t=M.initial(p);if(p.kind==='role')M.apply(p,t,'role',p.mode==='whole'?'whole':'part');M.apply(p,t,'method',p.mode==='whole'?'−':'+');assert.equal(t.stage,'method');assert(t.fb);assert(!t.ok);M.apply(p,t,'method',p.mode==='whole'?'+':'−');assert.equal(t.stage,'answer');
  }
  if(p.kind==='compose'){
   const paths=[p.equation.map(String),[String(p.known),'+','x','=',String(p.total)]];
   for(const wanted of paths){const t=M.initial(p);for(let slot=0;slot<5;slot++){
    const before=JSON.stringify(t.tokens),bad=slot===0?'=':slot===1?'−':slot===2?String(p.total):slot===3?'+':'x';M.apply(p,t,'token',bad);assert.equal(JSON.stringify(t.tokens),before,tag+' bad composition accepted');assert(t.fb);M.apply(p,t,'token',wanted[slot]);
   }assert.equal(t.stage,'answer');M.apply(p,t,'undo',null);assert.equal(t.stage,'compose');assert.equal(t.tokens.length,4);M.apply(p,t,'token',wanted[4]);assert.equal(t.stage,'answer');M.apply(p,t,'answer',expected(p));M.apply(p,t,'verify',null);assert(t.ok,tag+' reversed parts rejected');}
  }
  solve(M,p,s);assert(s.ok,tag+' independent solution failed');
  for(const action of allActions.filter(a=>a!=='note'||p.kind!=='concert'))unchanged(()=>M.apply(p,s,action,1),s,tag+' completed state mutated '+action);
  if(p.kind==='concert'){for(let j=0;j<15;j++)M.apply(p,s,'note',j%5);assert.equal(s.notes.length,8);assert(s.ok);for(const n of [-1,5,1.2,'1'])unchanged(()=>M.apply(p,s,'note',n),s,tag+' invalid note');}
  const restored=M.initial(p);M.restoreSolved(p,restored);assert(restored.ok);assert.equal(JSON.stringify(M.validState(p,restored)),JSON.stringify(restored),tag+' restored completed state rejected');
  for(const state of [...states(M,p),restored]){
   const html=M.renderGame(p,state,scope,i);assert(!/undefined|NaN|Infinity/.test(html),tag+' broken HTML');assert(!/\b(?:onerror|onload)=/.test(html));assert(html.includes('<button')||state.ok,tag+' controls missing');
   assert.equal(JSON.stringify(M.validState(p,state)),JSON.stringify(state),tag+' legitimate state lost on reload');rendered++;stateCount++;
   // The physical model must show distinct groups whose amounts remain tied to the story.
   const counts=[...html.matchAll(/data-count="(\d+)"/g)].map(x=>+x[1]);
   if(p.kind==='build')assert.deepEqual(counts,[p.known,state.delta],tag+' added part confused with original');
   if(p.kind==='remove')assert.deepEqual(counts,[p.total-state.delta,state.delta],tag+' raft count inconsistent');
   if(p.kind==='reunite')assert.deepEqual(counts,[p.unknown-state.delta,p.known+state.delta],tag+' original whole lost');
   if(['hidden','compose'].includes(p.kind))assert.deepEqual(counts,state.ok?[p.known,p.unknown]:[p.known],tag+' hidden part exposed before correct answer');
  }
  for(const bad of [null,{},[],{...clone(M.initial(p)),rev:-1},{...clone(M.initial(p)),stage:'done',ok:true,candidate:20},{...clone(M.initial(p)),candidate:NaN},{...clone(M.initial(p)),tokens:['<script>']},{...clone(M.initial(p)),fb:'x'.repeat(2001)}])assert.equal(JSON.stringify(M.validState(p,bad)),JSON.stringify(M.initial(p)),tag+' malformed saved state retained');
  assert.equal(JSON.stringify(p),original,tag+' source numbers mutated');
 }
 return {wrongCount,rendered,stateCount};
}

function reviewIntegration(){
 const reward=createEnv(),r=reward.c,M=reward.api;r.LV={id:303,phase:'tasks',step:11,task:0,hints:0};
 const current=i=>r.lrec().river303.practice[i];
 assert.equal(reward.registrations.lesson.запись.tasks[0].ans,5);assert.equal(reward.registrations.lesson.запись.tasks[1].choices[reward.registrations.lesson.запись.tasks[1].ans],'9');
 for(let i=0;i<M.tasks.length;i++){
  r.LV.task=i;r.LV.hints=0;reward.registrations.lesson.тренажёр.задачи[i].картинка();
  for(const group of plans(M.tasks[i]))for(const[a,v]of group){assert(M.act('practice',i,a,v,current(i).rev),'Practice action rejected '+i+' '+a);assert.equal(reward.stats.wins,i+(current(i).ok?1:0),'Award before verified equation');}
  assert(current(i).ok);assert.equal(reward.stats.wins,i+1);assert.equal(r.lrec().stars,i+1);assert.equal(r.DB.points,(i+1)*18);
  const saved=JSON.stringify(r.DB);M.act('practice',i,'verify',null,current(i).rev);M.act('practice',i,'answer',expected(M.tasks[i]),0);assert.equal(JSON.stringify(r.DB),saved,'Duplicate reward');
 }
 assert(r.lrec().done);assert.equal(new Set(r.lrec().tasks).size,12);
 const stale=createEnv(),sc=stale.c,S=stale.api;sc.LV={id:303,phase:'tasks',task:0,step:0,hints:0};stale.registrations.lesson.тренажёр.задачи[0].картинка();
 const st=()=>sc.lrec().river303.practice[0];const rev=st().rev;assert(S.act('practice',0,'move',1,rev));const saved=JSON.stringify(sc.DB);assert.equal(S.act('practice',0,'move',1,rev),false);assert.equal(JSON.stringify(sc.DB),saved,'Double tap transferred twice');
 for(const[scope,index,id,phase,task]of[['practice',1,303,'tasks',0],['story',0,303,'tasks',0],['practice',0,302,'tasks',0],['practice',0,303,'check',0],['practice',0,303,'tasks',1]]){sc.LV={id,phase,task,step:0};assert.equal(S.act(scope,index,'move',1,1),false);assert.equal(JSON.stringify(sc.DB),saved,'Stale navigation altered records');}
 sc.LV={id:303,phase:'tasks',task:0,step:0,hints:0};
 const resumed=createEnv(clone(sc.lrec())),rc=resumed.c;rc.LV={id:303,phase:'tasks',task:0,step:0,hints:0};resumed.registrations.lesson.тренажёр.задачи[0].картинка();assert.equal(rc.lrec().river303.practice[0].delta,1,'Direct practice resume lost state');
 const legacy={tasks:[0,1],stars:2,done:true,game:{done:2,of:5}};
 const old=createEnv(clone(legacy)),oc=old.c;oc.LV={id:303,phase:'explain',step:0,task:0,hints:0};const el={innerHTML:'',querySelector:()=>null};oc.WAVE_B[303](el);const os=()=>oc.CHS.l303.п[0];old.api.act('story',0,'move',1,os().rev);old.api.act('story',0,'move',1,os().rev);
 const state=clone(os()),record=clone(oc.lrec());assert.deepEqual(record.tasks,[0,1]);assert.equal(record.stars,2);assert.deepEqual(record.game,legacy.game);
 const reloaded=createEnv(record),lc=reloaded.c;lc.LV={id:303,phase:'explain',step:0,task:0,hints:0};lc.WAVE_B[303](el);assert.equal(JSON.stringify(lc.CHS.l303.п[0]),JSON.stringify(state),'Story resume lost state');
 lc.LV.phase='tasks';for(let i=0;i<2;i++){lc.LV.task=i;reloaded.registrations.lesson.тренажёр.задачи[i].картинка();assert(lc.lrec().river303.practice[i].ok);assert.equal(reloaded.api.act('practice',i,'verify',null,lc.lrec().river303.practice[i].rev),false);}
 assert.equal(lc.lrec().stars,2);assert.equal(lc.DB.points,0);assert.equal(reloaded.stats.wins,0);
 const gated=createEnv(),gc=gated.c;let moves=0,checks=0;gc.lvStep=()=>moves++;gc.lvToCheck=()=>checks++;for(const fn of gated.events.load||[])fn();gc.LV={id:303,phase:'explain',step:0};gc.WAVE_B[303](el);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,0);assert.equal(checks,0);gc.lvStep(-1);assert.equal(moves,1);gated.api.restoreSolved(gated.api.scenes[0],gc.CHS.l303.п[0]);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,2);assert.equal(checks,1);gc.LV.id=301;gc.lvStep(1);gc.lvToCheck();assert.equal(moves,3);assert.equal(checks,2);
 assert.equal(r.ARH_LESSONS.find(x=>x.id===301).title,'Neighbor unchanged');assert.equal(r.ARH_LESSONS.find(x=>x.id===303).__планПорядок,118);assert.equal(r.ARH_LESSONS.find(x=>x.id===303).comic,undefined);
 return reward;
}
function reviewStoryReload(){
 const el={innerHTML:'',querySelector:()=>null};let checks=0;
 for(let i=0;i<12;i++){
  let env=createEnv(),c=env.c;c.LV={id:303,phase:'explain',step:i,task:0,hints:0};c.WAVE_B[303](el);
  for(const group of plans(env.api.scenes[i]))for(const[action,value]of group){
   const state=c.CHS.l303.п[i];assert(env.api.act('story',i,action,value,state.rev),'Story integration action rejected');
   const expectedState=JSON.stringify(c.CHS.l303.п[i]);const next=createEnv(clone(c.lrec()));next.c.LV={id:303,phase:'explain',step:i,task:0,hints:0};next.c.WAVE_B[303](el);assert.equal(JSON.stringify(next.c.CHS.l303.п[i]),expectedState,'Reload after every story action lost progress');assert.equal(next.c.lrec().stars,0,'Story action awarded trainer stars');env=next;c=next.c;checks++;
  }
  assert(c.CHS.l303.п[i].ok,'Resumed story could not finish');
 }
 const env=createEnv(),c=env.c,M=env.api;c.LV={id:303,phase:'tasks',step:0,task:3,hints:0};env.registrations.lesson.тренажёр.задачи[3].картинка();const state=()=>c.lrec().river303.practice[3];
 M.act('practice',3,'answer',5,state().rev);assert.equal(env.stats.wins,0);M.act('practice',3,'verify',null,state().rev);assert.equal(env.stats.wins,0);assert.equal(c.lrec().tasks.length,0);assert.equal(c.DB.points,0);assert.equal(state().stage,'answer');
 M.act('practice',3,'answer',4,state().rev);assert.equal(env.stats.wins,0);M.act('practice',3,'verify',null,state().rev);assert.equal(env.stats.wins,1);assert.equal(c.DB.points,18);
 return checks;
}
function review(){const e=createEnv();assert(e.api,'RIVER303 export missing');reviewContent(e.api);const stats=reviewModel(e.api);reviewIntegration();const reloads=reviewStoryReload();reviewShell();console.log(`PASS 303: 24 activities; ${stats.wrongCount} incorrect answers rejected; ${stats.rendered} renders and restored states; unknown-part/whole oracle; reversible transfers and zero; both equation orders; native rewards exactly once; stale actions; ${reloads} per-action story reloads; legacy progress; unchanged header/footer.`);return e;}
module.exports={createEnv,root,equationValue,expected,moving,prerequisites,plans,run,solve,prepareRound,intermediate,wrong,states,review};
if(require.main===module)review();
