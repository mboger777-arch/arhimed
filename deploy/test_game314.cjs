/* Independent state-machine checks for the seven-stage 3D expedition. */
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),modelPath=path.join(root,'MVP/games/tropy-velikanov/model.js');
const API=require(modelPath),M=API.createModel(),clone=s=>JSON.parse(JSON.stringify(s));
const expected=[['dig',2,3,3],['bridge',3,3,3],['dodge',4,2,2],['turn',3,4,1],['rescue',4,3,3],['beacons',2,4,4],['flight',5,3,3]];
const actionFor=p=>['dig','bridge','dodge','flight'].includes(p.mode)?'collect':'activate';
const product=p=>Array.from({length:p.b},()=>p.a).reduce((n,v)=>n+v,0);
function unchanged(s,action,value){const before=JSON.stringify(s);assert.equal(M.apply(s,action,value),false,`${action} should be rejected`);assert.equal(JSON.stringify(s),before,'Rejected action changed state');}
function review(){
 assert.equal(M.KEY,'paleo314_action');assert.equal(M.stages.length,7);assert.equal(new Set(M.stages.map(p=>p.id)).size,7);
 const fixtures=[];let reloads=0,wrong=0,events=0,s=M.initial();
 function inspect(){assert(M.validState(s),'Current state invalid');const restored=M.restore(clone(s));assert.deepEqual(restored,s);assert.notEqual(restored,s);assert.deepEqual(M.restore(JSON.stringify(s)),s);fixtures.push(clone(s));reloads++;}
 function send(action,value){assert(M.apply(s,action,value),`Rejected ${action}`);events++;inspect();s=M.restore(s);}
 function malformedIndices(state,action,p){for(const value of[-1,p.goalCount,1.5,NaN,Infinity,'0',null,undefined,{},[],[0]])unchanged(clone(state),action,value);}
 M.stages.forEach((p,i)=>{assert.deepEqual([p.mode,p.a,p.b,p.goalCount],expected[i]);assert.equal(p.answer,product(p));assert.equal(new Set(p.options).size,p.options.length);assert(p.options.includes(p.answer));assert(p.options.every(n=>Number.isInteger(n)&&n>=0&&n<=81));assert(p.title&&p.brief&&p.explanation);});
 inspect();assert.equal(s.phase,'intro');for(const action of['collect','activate','answer','next','replay'])unchanged(s,action,0);unchanged(s,'start',1);send('start');unchanged(s,'start');
 for(let stage=0;stage<7;stage++){
  const p=M.stages[stage],action=actionFor(p),other=action==='collect'?'activate':'collect';assert.equal(s.stage,stage);assert.equal(s.phase,'playing');assert.equal(s.stars.reduce((a,b)=>a+b,0),stage);
  unchanged(s,'answer',p.answer);unchanged(s,'next');unchanged(s,'replay');unchanged(s,other,0);malformedIndices(s,action,p);
  // Visit targets in reverse order, proving that completion depends on all distinct targets.
  for(let index=p.goalCount-1;index>=0;index--){send(action,index);unchanged(s,action,index);assert.equal(s.phase,index===0?'question':'playing');if(index>0)unchanged(s,'answer',p.answer);}
  assert.equal(s[action==='collect'?'collected':'activated'].length,p.goalCount);assert.deepEqual(s[action==='collect'?'activated':'collected'],[]);
  unchanged(s,other,0);unchanged(s,action,0);unchanged(s,'next');unchanged(s,'replay');
  const ready=clone(s);
  for(const answer of[-1,82,1.5,NaN,Infinity,'12',null,undefined,{},[]])unchanged(clone(s),'answer',answer);
  for(let answer=0;answer<=81;answer++)if(answer!==product(p)){
   const q=clone(ready),collected=clone(q.collected),activated=clone(q.activated),stars=clone(q.stars);assert(M.apply(q,'answer',answer));assert.equal(q.phase,'question');assert.equal(q.answer,answer);assert(q.feedback);assert.deepEqual(q.collected,collected);assert.deepEqual(q.activated,activated);assert.deepEqual(q.stars,stars);assert.deepEqual(M.restore(q),q);assert(M.apply(q,'answer',product(p)));assert.equal(q.phase,'won');wrong++;
  }
  send('answer',p.options.find(n=>n!==p.answer));assert.equal(s.phase,'question');send('answer',product(p));assert.equal(s.phase,'won');assert.equal(s.stars.reduce((a,b)=>a+b,0),stage+1);assert.equal(s.feedback,p.explanation);
  unchanged(s,'answer',product(p));unchanged(s,action,0);unchanged(s,'replay');unchanged(s,'start');send('next');
 }
 assert.equal(s.phase,'complete');assert.equal(s.stage,6);assert.deepEqual(s.stars,[1,1,1,1,1,1,1]);for(const action of['next','start','answer','collect','activate'])unchanged(s,action,0);
 const store=new Map([['paleo314_game',JSON.stringify({stars:[1,1,1]})],['um_plat_progress','5'],['another_game','keep']]),storage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
 assert.deepEqual(M.load(storage),M.initial(),'Old game achievements leaked into new game');assert(M.save(storage,s));assert.deepEqual(M.load(storage),s);assert.equal(store.get('paleo314_game'),JSON.stringify({stars:[1,1,1]}));assert.equal(store.get('um_plat_progress'),'5');assert.equal(store.get('another_game'),'keep');assert.equal(M.save({setItem(){throw Error('blocked');}},s),false);assert.deepEqual(M.load({getItem(){throw Error('blocked');}}),M.initial());
 // Replay retains the same seven achievements; new targets still must be visited.
 send('replay');assert.equal(s.stage,0);assert.equal(s.phase,'playing');assert.deepEqual(s.collected,[]);assert.deepEqual(s.activated,[]);unchanged(s,'answer',6);
 while(s.phase!=='complete'){const p=M.stages[s.stage];for(let i=0;i<p.goalCount;i++)send(actionFor(p),i);send('answer',product(p));send('next');assert.deepEqual(s.stars,[1,1,1,1,1,1,1]);}
 // Corrupted states, old saved games and inconsistent rewards reset completely.
 const ready=fixtures.find(x=>x.phase==='question'),playing=fixtures.find(x=>x.phase==='playing'),won=fixtures.find(x=>x.phase==='won');
 const invalid=[{...clone(ready),stars:Array(7)},{...clone(ready),collected:Array(3)},null,undefined,{},[],0,'not JSON','null',JSON.stringify({version:1,stars:[1,1,1]}),{...clone(ready),version:1},{...clone(ready),stage:7},{...clone(ready),stage:.5},{...clone(ready),phase:'bad'},{...clone(ready),collected:[0,0,1]},{...clone(ready),collected:[0,1,99]},{...clone(ready),collected:[0,1]},{...clone(ready),activated:[0]},{...clone(ready),stars:[0,1,0,0,0,0,0]},{...clone(ready),stars:[2,0,0,0,0,0,0]},{...clone(ready),stars:[1,0,0,0,0,0,0]},{...clone(ready),answer:6},{...clone(ready),answer:NaN},{...clone(ready),feedback:'unearned success'},{...clone(playing),phase:'complete'},{...clone(won),stars:Array(7).fill(0)},{...clone(won),answer:5},{...clone(won),phase:'intro'}];
 for(const bad of invalid){assert.deepEqual(M.restore(bad),M.initial(),'Invalid state accepted');const saved=JSON.stringify(bad);assert.equal(M.apply(bad,'start'),false);assert.equal(JSON.stringify(bad),saved);assert.equal(M.save(storage,bad),false);}
 const fresh=M.initial(),other=M.initial();fresh.collected.push(0);fresh.stars[0]=1;assert.deepEqual(other,M.initial(),'State arrays shared');
 // Exercise the actual application launcher and parent journal at all eight progress values.
 const banners=[],screen={querySelector:q=>q.includes('игра-плашка')?null:{},insertBefore:el=>banners.push(el)};let journalSaves=0;
 const journalStore=new Map([['um_plat_progress','5'],['paleo314_game',JSON.stringify({stars:[1,1,1]})]]),journalStorage={getItem:k=>journalStore.get(k)||null,setItem:(k,v)=>journalStore.set(k,v)};
 const ctx={window:null,console,LV:{id:314,phase:'explain',step:0},DB:{profile:{},points:77,lessons:{314:{done:true,stars:2,tasks:[0,1],game:{done:4,of:5}}}},save(){journalSaves++;},renderLessonView(){},location:{href:''},localStorage:journalStorage,document:{getElementById:id=>id==='screen'?screen:null,createElement:()=>({setAttribute(){},innerHTML:''}),head:{appendChild(){}},querySelectorAll:()=>[],body:{}},MutationObserver:function(){this.observe=()=>{};}};ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync(path.join(root,'MVP/js/lesson_games.js'),'utf8'),ctx);
 assert.equal(ctx.ИГРЫ_УРОКОВ[314].уровней,7);assert.equal(ctx.ИГРЫ_УРОКОВ[314].папка,'tropy-velikanov');ctx.renderLessonView();assert.deepEqual(clone(ctx.DB.lessons[314].game),{done:0,of:7},'Old 2D/garden stars leaked into 3D journal');assert.deepEqual(clone(ctx.DB.lessons[314].gameLegacyUm),{done:4,of:5});
 for(let earned=0;earned<=7;earned++){
  const saved=fixtures.find(f=>f.stars.reduce((a,b)=>a+b,0)===earned);assert(saved);journalStorage.setItem(M.KEY,JSON.stringify(saved));ctx.renderLessonView();const rec=ctx.DB.lessons[314];assert.deepEqual(clone(rec.game),{done:earned,of:7});assert.deepEqual(clone(rec.gameLegacyUm),{done:4,of:5});assert.equal(rec.stars,2);assert.deepEqual(clone(rec.tasks),[0,1]);assert(rec.done);assert.equal(ctx.DB.points,77);const saves=journalSaves;ctx.renderLessonView();assert.equal(journalSaves,saves,'Unchanged journal saved again');const banner=banners.at(-1).innerHTML;assert.equal((banner.match(/<i class=/g)||[]).length,7);assert.equal((banner.match(/<i class="да"/g)||[]).length,earned);
 }
 assert.equal(journalStore.get('um_plat_progress'),'5');assert.equal(journalStore.get('paleo314_game'),JSON.stringify({stars:[1,1,1]}));ctx.играУрока(314);assert.equal(ctx.location.href,'games/tropy-velikanov/?lesson=314');assert(banners[0].innerHTML.includes('img/games/tropy-velikanov.jpg'));assert.equal(ctx.ИГРЫ_УРОКОВ[309].папка,'ostrov-hitryh-igr');assert.equal(ctx.ИГРЫ_УРОКОВ[71].ключ,'ts');assert(fs.existsSync(path.join(root,'MVP/games/sad-umnozheniya/index.html')));
 const index=fs.readFileSync(path.join(root,'MVP/games/tropy-velikanov/index.html'),'utf8');assert(index.includes('../../index.html#lesson-314'));const versions=['model.js','game.js','game.css'].map(asset=>index.match(new RegExp(asset.replace('.','\\.')+'\\?v=(314-\\d+)'))?.[1]);assert(versions.every(Boolean),'Missing versioned game dependency');assert.equal(new Set(versions).size,1,'Mixed game dependency versions');assert(/type="module" src="game\.js\?v=/.test(index));const controller=fs.readFileSync(path.join(root,'MVP/games/tropy-velikanov/game.js'),'utf8');assert(controller.includes('world.js?v='+versions[0]),'World module version differs from controller');assert(!index.includes('user-scalable=no'));assert(!index.includes('maximum-scale=1'));
 // UMD works in the browser without Node globals or storage side effects.
 const browser={};vm.createContext(browser);vm.runInContext(fs.readFileSync(modelPath,'utf8'),browser);assert.equal(browser.PALEO314_ACTION_MODEL.KEY,M.KEY);assert.deepEqual(JSON.parse(JSON.stringify(browser.PALEO314_ACTION_MODEL.initial())),M.initial());
 console.log(`PASS game314 3D: 7 distinct stages; ${wrong} incorrect answers preserve targets; ${events} actions; ${reloads} restored states; duplicate and wrong-phase gates; exactly 7 stars; replay; corrupted/legacy saves; isolated storage; native journal 0–7 with legacy preservation; return link; browser UMD.`);
 return fixtures;
}
module.exports={M,root,review};if(require.main===module)review();
