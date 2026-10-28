/* Isolated VM used by the 314 model and visual catalogue. No app storage or network. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.resolve(__dirname,'..');
function createEnv(record){
 const styles=[],registrations={},events={},stats={saves:0,renders:0,wins:0};
 const c={window:null,console,ARH_LESSONS:[{id:301,title:'Neighbor unchanged'},{id:314,__планПорядок:118,title:'Legacy 314',comic:{old:true}}],WAVE_B:{},CHS:{},DB:{points:0,lessons:{314:record||{tasks:[],stars:0,done:false}}},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(s){if(s.textContent&&!styles.includes(s.textContent))styles.push(s.textContent);}}},addEventListener(name,fn){(events[name]||=[]).push(fn);},save(){stats.saves++;},bumpDay(){},logEvent(){},toast(){},showConfetti(){},setTimeout(){return 0;},clearTimeout(){}};
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
 vm.runInContext(fs.readFileSync(path.join(root,'MVP/lessons/314/content.js'),'utf8'),c);
 vm.runInContext(fs.readFileSync(path.join(root,'MVP/data/lesson_jun314_multiplication.js'),'utf8'),c);
 return {c,api:c.PALEO314,styles,registrations,events,stats};
}


// Independent oracle: sum the equal groups, rather than call engine.solution.
const assert=require('assert/strict'),clone=x=>JSON.parse(JSON.stringify(x));
const product=p=>Array.from({length:p.b},()=>p.a).reduce((a,b)=>a+b,0);
const tableRounds=p=>p.kind==='table'&&p.rounds?.length?p.rounds:[p];
function prerequisites(p){
 switch(p.kind){
 case 'tutorial':
  if(p.tutorialType==='count')return Array.from({length:product(p)},(_,i)=>['countTile',i]);
  if(p.tutorialType==='place')return Array.from({length:p.b},(_,i)=>Array.from({length:p.a},()=>['place',i])).flat();
  if(p.tutorialType==='groups')return [...Array.from({length:p.b},(_,i)=>['mark',i]),['describe',null],['each',p.a],['times',p.b]];
  if(p.tutorialType==='sum')return Array.from({length:p.b},(_,i)=>['readGroup',i]);
  if(p.tutorialType==='notation')return [['showNotation',null],['each',p.a],['times',p.b]];
  throw Error('Unknown tutorial '+p.tutorialType);

 case 'groups':case 'array':case 'identity':return [...Array.from({length:p.b},(_,i)=>['mark',i]),['inspect',null]];
 case 'zero':return p.b?[...Array.from({length:p.b},(_,i)=>['mark',i]),['inspect',null]]:[['empty',null]];
 case 'swap':return [...Array.from({length:p.b},(_,i)=>['mark',i]),['inspect',null],['rotate',null]];
 case 'repair':return [...Array.from({length:p.b},(_,i)=>['mark',i]),['inspect',null],['probe',null]];
 case 'repeated':return [...Array.from({length:p.b},()=>['term',p.a]),['token',String(p.a)],['token','·'],['token',String(p.b)]];
 case 'factors':return [['each',p.a],['times',p.b]];
 case 'unequal':return [['judge','no'],...p.groups.flatMap((n,i)=>Array.from({length:Math.abs(n-p.a)},()=>['adjust',[i,n<p.a?1:-1]])),['fixed',null]];
 case 'extend':return [...Array.from({length:p.b-p.fromB},()=>['moreGroups',1]),['extended',null]];
 case 'build':return [...Array.from({length:p.a},()=>['buildEach',1]),...Array.from({length:p.b-1},()=>['buildGroups',1]),['built',null]];
 case 'table':return p.fromB!==undefined?[...Array.from({length:p.b-p.fromB},()=>['moreGroups',1]),['extended',null]]:p.lookup?[['lookup',p.b]]:[];
 default:throw Error('Unknown kind '+p.kind);
 }
}
const plans=p=>p.kind==='table'?tableRounds(p).map((r,i)=>[...(i?[['next',null]]:prerequisites(p)),['answer',product(r)]]):[[...prerequisites(p),['answer',product(p)]]];
function run(M,p,s,steps,send){for(const[a,v]of steps)(send||((a,v)=>M.apply(p,s,a,v)))(a,v);return s;}
function solve(M,p,s,send){for(const group of plans(p))run(M,p,s,group,send);return s;}
function ready(M,p,round=0){const s=M.initial(p);if(p.kind==='table'){for(let i=0;i<round;i++)run(M,p,s,plans(p)[i]);if(round)M.apply(p,s,'next',null);else run(M,p,s,prerequisites(p));}else run(M,p,s,prerequisites(p));return s;}
function intermediate(M,p){const s=M.initial(p),g=plans(p)[0];run(M,p,s,g.slice(0,Math.max(1,g.length-1)));return s;}
function wrong(M,p){const s=ready(M,p);M.apply(p,s,'answer',(product(tableRounds(p)[0])+1)%82);return s;}
function states(M,p){const s=M.initial(p),out=[clone(s)];M.apply(p,s,'hint',null);out.push(clone(s),wrong(M,p));for(const group of plans(p))for(const[a,v]of group){M.apply(p,s,a,v);out.push(clone(s));}return out;}
function unchanged(fn,s,msg){const old=JSON.stringify(s);fn();assert.equal(JSON.stringify(s),old,msg);}
function review(){
 const e=createEnv(),M=e.api;assert(M);const source=JSON.parse(fs.readFileSync(path.join(root,'MVP/lessons/314/content.json'),'utf8'));assert.equal(JSON.stringify(M.scenes),JSON.stringify(source.scenes));assert.equal(JSON.stringify(M.tasks),JSON.stringify(source.tasks));assert.equal(M.scenes.length,20);assert.equal(M.tasks.length,12);assert.equal(M.frames.length,20);
 let renders=0,wrongAnswers=0,reloads=0;
 const actions=['countTile','place','describe','readGroup','showNotation','mark','inspect','term','token','undoToken','undoTerm','each','times','judge','adjust','fixed','rotate','moreGroups','extended','empty','probe','buildEach','buildGroups','built','lookup','answer','next','hint'];
 for(const[scope,list]of[['story',M.scenes],['practice',M.tasks]])for(const[index,p]of list.entries()){
  const tag=`${scope} ${index+1} ${p.kind}`,original=JSON.stringify(p);assert.equal(M.solution(p),product(p));assert(p.q&&p.hint&&p.sol);assert(!/яблок|корзин|Лада|Флик|мишутк/i.test(JSON.stringify(p)),tag+' old plot');
  const init=M.initial(p);assert(!init.ok);unchanged(()=>M.apply(p,init,'unexpected',0),init,tag+' unsupported action');
  const h=M.initial(p);M.apply(p,h,'hint',null);assert.equal(h.fb,p.hint);assert(!h.ok);
  if(prerequisites(p).length)unchanged(()=>M.apply(p,init,'answer',product(p)),init,tag+' early answer bypassed activity');
  for(const n of[-1,82,NaN,Infinity,1.5,'12',null,undefined,{},[]]){const s=ready(M,p);unchanged(()=>M.apply(p,s,'answer',n),s,tag+' invalid numeric input');}
  for(let round=0;round<tableRounds(p).length;round++)for(let n=0;n<=81;n++)if(n!==product(tableRounds(p)[round])){const s=ready(M,p,round),done=JSON.stringify(s.completed);M.apply(p,s,'answer',n);assert(!s.ok,tag+' wrong product accepted '+n);assert.equal(s.stage,'answer');assert.equal(JSON.stringify(s.completed),done);assert.equal(s.tone,'error');assert(s.fb);M.apply(p,s,'answer',product(tableRounds(p)[round]));assert.equal(s.ok,round===tableRounds(p).length-1,tag+' cannot recover');wrongAnswers++;}
  if(init.stage==='inspect'){
   const s=M.initial(p);M.apply(p,s,'inspect',null);assert.equal(s.stage,'inspect');assert(s.fb);M.apply(p,s,'mark',0);M.apply(p,s,'mark',0);assert.equal(s.marked.length,0,'Marks not reversible');for(const n of[-1,p.b,NaN,'0',null])unchanged(()=>M.apply(p,s,'mark',n),s,tag+' invalid group');
  }
  if(p.kind==='tutorial'){
   const t=p.tutorialType,x=M.initial(p),initial=clone(x),reset=bad=>assert.equal(JSON.stringify(M.validState(p,bad)),JSON.stringify(initial),tag+' invalid tutorial state retained');
   // Every tutorial has a distinct prerequisite; unrelated interactions cannot skip it.
   for(const action of ['inspect','extended','probe','lookup','token','term','built','rotate','empty','answer','each','times'])unchanged(()=>M.apply(p,x,action,action==='answer'?product(p):p.a),x,tag+' tutorial bypass via '+action);
   const otherActions={count:['readGroup','place','describe','showNotation','mark'],place:['countTile','readGroup','describe','showNotation','mark'],groups:['countTile','place','readGroup','showNotation'],sum:['countTile','place','describe','showNotation','mark'],notation:['countTile','place','readGroup','describe','mark']}[t];
   for(const action of otherActions)unchanged(()=>M.apply(p,x,action,0),x,tag+' wrong tutorial action');
   if(t==='count'||t==='sum'){
    const action=t==='count'?'countTile':'readGroup',limit=t==='count'?product(p):p.b;
    for(const value of[-1,limit,1,'0',null,undefined,NaN,{},[]])unchanged(()=>M.apply(p,x,action,value),x,tag+' out-of-sequence count');
    for(let i=0;i<limit;i++){assert(M.apply(p,x,action,i));assert.equal(x.tutorialProgress,i+1);unchanged(()=>M.apply(p,x,action,i),x,tag+' counted same object twice');assert.equal(x.stage,i+1===limit?'answer':'tutorial');if(t==='sum'){assert.deepEqual(clone(x.marked),Array.from({length:i+1},(_,j)=>j));assert.equal(x.terms.reduce((a,b)=>a+b,0),p.a*(i+1));}}
    const premature={...clone(initial),stage:'answer'};reset(premature);const stuck=clone(x);stuck.stage='tutorial';reset(stuck);
    if(t==='sum'){const scrambled=clone(x);scrambled.marked.reverse();reset(scrambled);const omitted=clone(x);omitted.terms.pop();reset(omitted);}
   }
   if(t==='place'){
    for(const value of[-1,p.b,.5,'0',null,NaN,{},[]])unchanged(()=>M.apply(p,x,'place',value),x,tag+' invalid placement');
    // Fill one mat, try to overfill it, then complete the others in a different order.
    for(let i=0;i<p.a;i++)M.apply(p,x,'place',0);const before=clone(x.groups);M.apply(p,x,'place',0);assert.deepEqual(clone(x.groups),before);assert.equal(x.stage,'tutorial');assert.equal(x.tone,'error');
    for(let i=p.b-1;i>0;i--)for(let n=0;n<p.a;n++){M.apply(p,x,'place',i);assert(x.groups.every(v=>v<=p.a));assert(x.groups.reduce((a,b)=>a+b,0)<=product(p));}
    assert.equal(x.stage,'answer');reset({...clone(initial),stage:'answer'});reset({...clone(x),stage:'tutorial'});const overflow=clone(x);overflow.groups[0]++;reset(overflow);
   }
   if(t==='groups'||t==='notation'){
    if(t==='groups'){M.apply(p,x,'describe',null);assert.equal(x.stage,'tutorial');assert.equal(x.tone,'error');M.apply(p,x,'mark',0);M.apply(p,x,'mark',0);assert.equal(x.marked.length,0);for(let i=0;i<p.b;i++)M.apply(p,x,'mark',i);assert.equal(x.marked.length,p.b);M.apply(p,x,'describe',null);}
    else {M.apply(p,x,'showNotation',null);assert.equal(x.tutorialProgress,1);unchanged(()=>M.apply(p,x,'showNotation',null),x,tag+' notation reopened');}
    assert.equal(x.stage,'each');unchanged(()=>M.apply(p,x,'times',p.b),x,tag+' group count before contents');M.apply(p,x,'each',p.b);assert.equal(x.stage,'each');assert.equal(x.each,null);M.apply(p,x,'each',p.a);assert.equal(x.stage,'times');M.apply(p,x,'times',p.a);assert.equal(x.stage,'times');assert.equal(x.times,null);M.apply(p,x,'times',p.b);assert.equal(x.stage,'answer');
    reset({...clone(x),each:null});reset({...clone(x),times:null});if(t==='groups')reset({...clone(x),marked:[0]});else reset({...clone(x),tutorialProgress:0});
   }
   const savedWithoutTutorialProgress=clone(initial);delete savedWithoutTutorialProgress.tutorialProgress;reset(savedWithoutTutorialProgress);
  }
  if(p.kind==='table'&&p.fromB!==undefined){
   const x=M.initial(p);assert.equal(x.stage,'extend');assert.equal(x.builtGroups,p.fromB);M.apply(p,x,'extended',null);assert.equal(x.stage,'extend');assert.equal(x.tone,'error');
   while(x.builtGroups<p.b-1)M.apply(p,x,'moreGroups',1);M.apply(p,x,'extended',null);assert.equal(x.stage,'extend');M.apply(p,x,'moreGroups',1);M.apply(p,x,'extended',null);assert.equal(x.stage,'answer');
   assert.equal(JSON.stringify(M.validState(p,{...clone(x),builtGroups:p.fromB})),JSON.stringify(M.initial(p)),tag+' table restore skipped building the new group');
   assert.equal(JSON.stringify(M.validState(p,{...clone(x),builtEach:p.a+1})),JSON.stringify(M.initial(p)),tag+' table restore changed objects per group');
  }
  if(p.kind==='unequal'){
   const s=M.initial(p),resources=Math.max(product(p),p.groups.reduce((a,b)=>a+b,0));M.apply(p,s,'judge','yes');assert.equal(s.stage,'judge');M.apply(p,s,'judge','no');M.apply(p,s,'fixed',null);assert.equal(s.stage,'fix');assert(s.fb);
   for(let i=0;i<p.b;i++)for(let j=0;j<12;j++)M.apply(p,s,'adjust',[i,1]);assert(s.groups.reduce((a,b)=>a+b,0)<=resources,'Created extra fossils');for(let i=0;i<p.b;i++)for(let j=0;j<12;j++)M.apply(p,s,'adjust',[i,-1]);assert(s.groups.every(n=>n===0));
   for(const action of[[0,2],[-1,1],[p.b,-1],[0,'1'],null,{},[0,1,2]])unchanged(()=>M.apply(p,s,'adjust',action),s,tag+' invalid adjustment');
  }
  if(p.kind==='repeated'){
   const s=M.initial(p);M.apply(p,s,'term',(p.a+1)%10);assert.equal(s.terms.length,0);assert(s.fb);M.apply(p,s,'term',p.a);M.apply(p,s,'undoTerm',null);assert.equal(s.terms.length,0);for(let j=0;j<p.b;j++)M.apply(p,s,'term',p.a);assert.equal(s.stage,'compact');M.apply(p,s,'token',String(p.b));M.apply(p,s,'token','+');assert.equal(s.tokens.length,1);assert(s.fb);M.apply(p,s,'undoToken',null);assert.equal(s.tokens.length,0);M.apply(p,s,'token',String(p.b));M.apply(p,s,'token','·');M.apply(p,s,'token',String(p.a));assert.equal(s.stage,'answer');M.apply(p,s,'answer',product(p));assert(s.ok,'Reversed multiplication incorrectly rejected');
  }
  if(p.kind==='table'&&p.lookup){const t=M.initial(p);M.apply(p,t,'lookup',p.b===1?2:1);assert.equal(t.stage,'lookup');assert(t.fb);M.apply(p,t,'lookup',p.b);assert.equal(t.stage,'answer');assert.equal(t.row,p.b);}
  if(p.kind==='factors'){
   const s=M.initial(p);M.apply(p,s,'each',(p.a+1)%10);assert.equal(s.stage,'each');M.apply(p,s,'each',p.a);M.apply(p,s,'times',(p.b+1)%10);assert.equal(s.stage,'times');M.apply(p,s,'times',p.b);assert.equal(s.stage,'answer');
  }
  if(['build','extend'].includes(p.kind)||p.kind==='table'&&p.fromB!==undefined){
   const s=M.initial(p),a=p.kind==='build'?'buildGroups':'moreGroups',confirm=p.kind==='build'?'built':'extended';M.apply(p,s,confirm,null);assert.equal(s.stage,init.stage);for(let j=0;j<12;j++)M.apply(p,s,a,-1);assert.equal(s.builtGroups,0);for(let j=0;j<12;j++)M.apply(p,s,a,1);assert.equal(s.builtGroups,9);if(p.kind==='build'){for(let j=0;j<12;j++)M.apply(p,s,'buildEach',1);assert.equal(s.builtEach,9);for(let j=0;j<12;j++)M.apply(p,s,'buildEach',-1);assert.equal(s.builtEach,0);}
  }
  const solved=solve(M,p,M.initial(p));assert(solved.ok,tag+' unsolvable');for(const a of actions)unchanged(()=>M.apply(p,solved,a,1),solved,tag+' completed mutation '+a);
  const restored=M.restoreSolved(p,M.initial(p));assert(restored.ok);assert.equal(JSON.stringify(M.validState(p,restored)),JSON.stringify(restored),tag+' legacy completed state invalid');
  for(const s of[...states(M,p),restored]){
   assert.equal(JSON.stringify(M.validState(p,s)),JSON.stringify(s),tag+' legitimate state lost');const html=M.renderGame(p,s,scope,index);assert(!/undefined|NaN|Infinity/.test(html),tag+' malformed HTML');assert(html.includes('button')||s.ok);renders++;
   const units=[...html.matchAll(/data-unit="\d+"/g)].length,counts=[...html.matchAll(/data-count="(\d+)"/g)].map(x=>+x[1]);
   if(p.kind==='tutorial'){
    if(p.tutorialType==='count')assert.equal([...html.matchAll(/class="paleo-count-tile /g)].length,product(p),'Count tutorial changed number of objects');
    else assert.equal(units,product(p),'Tutorial objects lost or duplicated');
    if(p.tutorialType==='place')assert(s.groups.reduce((a,b)=>a+b,0)<=product(p));
   }
   if(p.kind==='unequal'){assert.equal(units,Math.max(product(p),p.groups.reduce((a,b)=>a+b,0)),tag+' fossils disappeared or multiplied');assert.deepEqual(counts,clone(s.groups));}
   if(['groups','factors','identity','repeated','repair','array','swap'].includes(p.kind))assert.equal(units,product(p),tag+' wrong number of visible objects');
   if(p.kind==='swap'){const ids=[...html.matchAll(/data-find="(\d+)"/g)].map(x=>+x[1]).sort((a,b)=>a-b);assert.deepEqual(ids,Array.from({length:product(p)},(_,i)=>i),tag+' regrouping lost object identities');assert.deepEqual(counts,Array(s.swapped?p.a:p.b).fill(s.swapped?p.b:p.a));}
   if(p.kind==='zero'&&p.b===0){assert.equal(counts.length,0,'Zero groups rendered as one empty group');assert(html.includes('Образец:')&&html.includes('Взяли: ни одного набора'));}
   if(p.kind==='table'){
    assert(html.includes('<table')&&html.includes('<th scope="col">')&&html.includes('Дневник одинаковых групп'));
    if(p.fromB!==undefined){assert.equal(units,p.a*s.builtGroups,'Table did not show the groups actually built');assert.deepEqual(counts,Array(s.builtGroups).fill(p.a),'Table groups changed their size');}
   }
  }
  for(const bad of[null,{},[],{...clone(init),rev:-1},{...clone(init),ok:true,stage:'done',candidate:81},{...clone(init),candidate:NaN},{...clone(init),fb:'x'.repeat(2001)}])assert.equal(JSON.stringify(M.validState(p,bad)),JSON.stringify(init),tag+' corrupted state retained');
  assert.equal(JSON.stringify(p),original,tag+' content mutated');
 }
 // Native lesson records and rewards: use the actual lvPick/lvWin implementation.
 const reward=createEnv(),r=reward.c,R=reward.api;r.LV={id:314,phase:'tasks',step:11,task:0,hints:0};const st=i=>r.lrec().paleo314.practice[i];
 const nat=reward.registrations.lesson.запись;assert.equal(nat.check.choices[nat.check.ans],'12');assert.equal(nat.tasks[0].ans,12);assert.equal(nat.tasks[1].choices[nat.tasks[1].ans],'12');assert.equal(nat.tasks[1].ans,1);
 for(let i=0;i<R.tasks.length;i++){r.LV.task=i;r.LV.hints=0;reward.registrations.lesson.тренажёр.задачи[i].картинка();for(const group of plans(R.tasks[i]))for(const[a,v]of group){assert(R.act('practice',i,a,v,st(i).rev));assert.equal(reward.stats.wins,i+(st(i).ok?1:0));}assert(st(i).ok);assert.equal(r.lrec().stars,i+1);assert.equal(r.DB.points,(i+1)*18);const before=JSON.stringify(r.DB);R.act('practice',i,'answer',product(R.tasks[i]),st(i).rev);assert.equal(JSON.stringify(r.DB),before);}
 assert(r.lrec().done);assert.equal(new Set(r.lrec().tasks).size,12);
 const stale=createEnv(),sc=stale.c,S=stale.api;sc.LV={id:314,phase:'tasks',task:0,step:0,hints:0};stale.registrations.lesson.тренажёр.задачи[0].картинка();assert(S.act('practice',0,'mark',0,0));const saved=JSON.stringify(sc.DB);assert.equal(S.act('practice',0,'mark',0,0),false);assert.equal(JSON.stringify(sc.DB),saved,'Double tap marked twice');
 for(const[scope,index,id,phase,task]of[['practice',1,314,'tasks',0],['story',0,314,'tasks',0],['practice',0,303,'tasks',0],['practice',0,314,'check',0],['practice',0,314,'tasks',1]]){sc.LV={id,phase,task,step:0};assert.equal(S.act(scope,index,'mark',1,1),false);assert.equal(JSON.stringify(sc.DB),saved);}
 sc.LV={id:314,phase:'tasks',task:0,step:0,hints:0};const resumed=createEnv(clone(sc.lrec()));resumed.c.LV={id:314,phase:'tasks',task:0,step:0,hints:0};resumed.registrations.lesson.тренажёр.задачи[0].картинка();assert.deepEqual(clone(resumed.c.lrec().paleo314.practice[0].marked),[0]);
 const legacy={tasks:[0,1],stars:2,done:true,game:{done:2,of:5}},old=createEnv(clone(legacy)),oc=old.c;oc.LV={id:314,phase:'tasks',task:0,step:0,hints:0};for(let i=0;i<2;i++){oc.LV.task=i;old.registrations.lesson.тренажёр.задачи[i].картинка();assert(oc.lrec().paleo314.practice[i].ok);assert.equal(old.api.act('practice',i,'answer',12,0),false);}assert.equal(oc.DB.points,0);assert.equal(oc.lrec().stars,2);assert.deepEqual(clone(oc.lrec().game),legacy.game);
 const el={innerHTML:'',querySelector:()=>null};for(let i=0;i<M.scenes.length;i++){
  let env=createEnv(),c=env.c;c.LV={id:314,phase:'explain',step:i,task:0,hints:0};c.WAVE_B[314](el);
  for(const group of plans(M.scenes[i]))for(const[a,v]of group){assert(env.api.act('story',i,a,v,c.CHS.l314.п[i].rev));const expected=JSON.stringify(c.CHS.l314.п[i]),rec=clone(c.lrec());env=createEnv(rec);c=env.c;c.LV={id:314,phase:'explain',step:i,task:0,hints:0};c.WAVE_B[314](el);assert.equal(JSON.stringify(c.CHS.l314.п[i]),expected,'Per-action story reload');assert.equal(c.lrec().stars,0);reloads++;}assert(c.CHS.l314.п[i].ok);
 }
 const gated=createEnv(),gc=gated.c;let moves=0,checks=0;gc.lvStep=()=>moves++;gc.lvToCheck=()=>checks++;for(const fn of gated.events.load||[])fn();gc.LV={id:314,phase:'explain',step:0};gc.WAVE_B[314](el);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,0);assert.equal(checks,0);gc.lvStep(-1);assert.equal(moves,1);gated.api.restoreSolved(gated.api.scenes[0],gc.CHS.l314.п[0]);gc.lvStep(1);gc.lvToCheck();assert.equal(moves,2);assert.equal(checks,1);gc.LV.id=301;gc.lvStep(1);gc.lvToCheck();assert.equal(moves,3);assert.equal(checks,2);
 // An earlier story record must not mark the new five-step teaching sequence as completed.
 const migrationSource={tasks:[0,1],stars:2,done:true,game:{done:2,of:5},paleo314:{version:1,frames:{},practice:{}}};
 for(let i=0;i<5;i++)migrationSource.paleo314.frames[i]=clone(M.restoreSolved(M.scenes[i],M.initial(M.scenes[i])));
 const migrated=createEnv(migrationSource),mc=migrated.c;let migrationNext=0;mc.lvStep=()=>migrationNext++;mc.lvToCheck=()=>migrationNext++;for(const fn of migrated.events.load||[])fn();mc.LV={id:314,phase:'explain',step:0,task:0,hints:0};mc.CHS.l314={п:clone(migrationSource.paleo314.frames)};mc.WAVE_B[314](el);
 assert.equal(mc.lrec().paleo314.version,2);assert(!mc.CHS.l314.п[0].ok);assert.equal(mc.CHS.l314.п[0].stage,'tutorial');assert.equal(mc.CHS.l314.п[0].tutorialProgress,0);mc.lvStep(1);mc.lvToCheck();assert.equal(migrationNext,0,'Earlier story save bypassed new tutorial');assert.equal(mc.lrec().stars,2);assert.deepEqual(clone(mc.lrec().tasks),[0,1]);assert.deepEqual(clone(mc.lrec().game),{done:2,of:5});assert.equal(mc.DB.points,0);
 // Current version retains a partially counted tutorial and its exact next object.
 const partial=M.initial(M.scenes[0]);M.apply(M.scenes[0],partial,'countTile',0);const ongoing=createEnv({tasks:[],stars:0,done:false,paleo314:{version:2,frames:{0:clone(partial)},practice:{}}});ongoing.c.LV={id:314,phase:'explain',step:0,task:0,hints:0};ongoing.c.WAVE_B[314](el);assert.equal(ongoing.c.CHS.l314.п[0].tutorialProgress,1);assert.equal(ongoing.api.act('story',0,'countTile',0,partial.rev),false);assert(ongoing.api.act('story',0,'countTile',1,partial.rev));assert.equal(ongoing.c.CHS.l314.п[0].stage,'answer');
 // A visual exploration desk, plus an initially closed 1–9 answer reference.
 const atlas=createEnv(),ac=atlas.c,AT=atlas.api,tableEl={innerHTML:''},summaryEl={textContent:''},detailsEl={open:false,querySelector:()=>summaryEl},selectEl={value:'3'};
 ac.document.getElementById=id=>id==='paleo314-atlas-workspace'?tableEl:id==='paleo314-atlas-answers'?detailsEl:id==='paleo314-table-number'?selectEl:null;ac.LV={id:314,phase:'done'};
 const atlasDB=JSON.stringify(ac.DB),atlasStats=JSON.stringify(atlas.stats),initialAtlas=AT.reference();
 assert(initialAtlas.includes('Добавляй наборы — считай находки'));assert.equal([...initialAtlas.matchAll(/data-unit="\d+"/g)].length,3,'Default atlas must show one group of three');assert(!/<details[^>]*\bopen(?:\s|>)/.test(initialAtlas),'Answer page initially expanded');
 let groupCount=1;
 for(let n=1;n<=9;n++){
  assert(AT.setAtlasNumber(n));assert.equal(selectEl.value,String(n));assert.equal([...tableEl.innerHTML.matchAll(/data-unit="\d+"/g)].length,n*groupCount,'Changing group size must retain number of groups');
  const rows=[...AT.referenceRows(n).matchAll(/<tr data-multiplier="(\d+)"><th scope="row">(\d+) · (\d+)<\/th><td>= (\d+)<\/td><\/tr>/g)];assert.equal(rows.length,9);
  rows.forEach((r,i)=>{assert.equal(+r[1],i+1);assert.equal(+r[2],n);assert.equal(+r[3],i+1);assert.equal(+r[4],Array.from({length:i+1},()=>n).reduce((a,b)=>a+b,0));});
  while(groupCount>0){assert(AT.changeAtlasGroups(-1));groupCount--;}
  assert.equal(AT.changeAtlasGroups(-1),false);assert.equal(AT.toggleAtlasGroup(0),false);
  for(let b=0;b<=9;b++){
   if(b){assert(AT.changeAtlasGroups(1));groupCount++;}
   assert.equal([...tableEl.innerHTML.matchAll(/data-atlas-group="\d+"/g)].length,b);assert.equal([...tableEl.innerHTML.matchAll(/data-unit="\d+"/g)].length,n*b,'Incorrect count in atlas groups');
   const formula=tableEl.innerHTML.match(/<div class="paleo-equation">([\s\S]*?)<\/div>/)[1];assert.deepEqual([...formula.matchAll(/<span>(.*?)<\/span>/g)].map(m=>m[1]),[String(n),'·',String(b),'=',String(n*b)]);
   if(b){assert(AT.toggleAtlasGroup(0));assert(tableEl.innerHTML.includes('aria-pressed="true"'));assert(AT.toggleAtlasGroup(0));assert(!tableEl.innerHTML.includes('aria-pressed="true"'));}
   else assert(tableEl.innerHTML.includes('Ни одного набора'));
  }
  assert.equal(AT.changeAtlasGroups(1),false);assert(AT.setAtlasOpen(true));assert(detailsEl.open);assert.equal(summaryEl.textContent,'Закрыть страницу с ответами');assert(AT.changeAtlasGroups(-1));groupCount--;assert(/<details[^>]*\bopen(?:\s|>)/.test(tableEl.innerHTML),'Open answer page lost after group change');assert(AT.setAtlasNumber(n));assert(!/<details[^>]*\bopen(?:\s|>)/.test(tableEl.innerHTML),'Changing N should close answer page');assert(AT.setAtlasOpen(false));assert.equal(summaryEl.textContent,'Открыть страницу с ответами');
 }
 const atlasHTML=atlas.registrations.lesson.тренажёр.финал();assert(atlasHTML.includes('paleo-atlas-reference'));assert.equal([...atlasHTML.matchAll(/<option value="[1-9]"/g)].length,9);
 const lastTable=tableEl.innerHTML;
 for(const n of[0,10,1.5,NaN,'3',null])assert.equal(AT.setAtlasNumber(n),false);
 for(const delta of[0,2,-2,'1',NaN,null])assert.equal(AT.changeAtlasGroups(delta),false);
 for(const i of[-1,9,1.5,'0',null])assert.equal(AT.toggleAtlasGroup(i),false);
 for(const v of[0,1,'true',null])assert.equal(AT.setAtlasOpen(v),false);
 for(const[id,phase]of[[303,'done'],[314,'tasks'],[314,'explain'],[314,'check']]){ac.LV={id,phase};assert.equal(AT.setAtlasNumber(2),false);assert.equal(AT.changeAtlasGroups(-1),false);assert.equal(AT.toggleAtlasGroup(0),false);assert.equal(AT.setAtlasOpen(true),false);}
 assert.equal(tableEl.innerHTML,lastTable);assert.equal(JSON.stringify(ac.DB),atlasDB);assert.equal(JSON.stringify(atlas.stats),atlasStats);
 const index=fs.readFileSync(path.join(root,'MVP/index.html'),'utf8'),hash=x=>require('crypto').createHash('sha256').update(x).digest('hex');assert.equal(hash(index.match(/<header>[\s\S]*?<\/header>/)[0]),'384648571f8f871dd08923c102d043ecd35bb67041f8671ea3be653567e775e1');assert.equal(hash(index.match(/<nav class="nav"[^>]*>[\s\S]*?<\/nav>/)[0]),'6a70aacd084dd2457414dd4fd3ed87138d9ce4a5af7830801984a82c8d4668e1');assert.equal(r.ARH_LESSONS.find(x=>x.id===301).title,'Neighbor unchanged');assert.equal(r.ARH_LESSONS.find(x=>x.id===314).__планПорядок,118);assert.equal(r.ARH_LESSONS.find(x=>x.id===314).comic,undefined);
 console.log(`PASS 314: 20 scenes / 12 tasks; 5 tutorial sequences; ${wrongAnswers} incorrect products; ${renders} renders/restored states; ${reloads} per-action reloads; conserved findings; four visible feet per dinosaur; regrouped identities; a-per-group/b-groups; native rewards once; 90 visual atlas products and 81 hidden reference answers without rewards; legacy/stale/nav/header/footer.`);return e;
}
module.exports={createEnv,root,product,prerequisites,plans,run,solve,ready,intermediate,wrong,states,review};if(require.main===module)review();
