const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let registered;const c={window:null,ДК:{подключить(x){registered=x;c.WAVE_B[308]=()=>{};}},WAVE_B:{},document:{createElement:()=>({}),head:{appendChild(){}}},addEventListener(){},console};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun308_picnic.js','utf8'),c);
const M=c.PIC308;
function shortest(p){const q=[[p.start]],seen=new Set([p.start]);while(q.length){let a=q.shift(),v=a.at(-1);if(v===p.end)return a;for(let n=0;n<p.rows*p.cols;n++)if(!seen.has(n)&&!p.blocked.includes(n)&&Math.abs(v%p.cols-n%p.cols)+Math.abs(Math.floor(v/p.cols)-Math.floor(n/p.cols))===1){seen.add(n);q.push([...a,n]);}}throw Error('No path');}
function actions(p){let a=[];const push=(k,v)=>a.push([k,v]);
 if(['count','missing'].includes(p.kind))for(let n=0;n<p.target;n++)push('number',1);
 if(p.kind==='pack'){const left={...p.need};p.items.forEach((x,i)=>{if(left[x]>0){push('toggle',i);left[x]--;}});}
 if(p.kind==='race')push('overtake');
 if(p.kind==='reveal'){push('open',0);push('open',1);}
 if(['choose','race','reveal'].includes(p.kind))push('choose',p.answer);
 if(p.kind==='route')shortest(p).slice(1).forEach(v=>push('move',v));
 if(p.kind==='share')for(let n=0;n<Math.abs(p.amounts[0]-p.amounts[1])/2;n++)push('transfer',p.amounts[0]>p.amounts[1]?0:1);
 if(p.kind==='trips')for(let remain=p.total;remain>0;){let n=Math.min(remain,p.capacity);for(let j=0;j<n;j++)push('load',1);push('deliver');remain-=n;}
 if(p.kind==='serve'){for(let n=0;n<p.guests;n++)push('cup',n);for(let n=0;n<p.plates;n++)for(let j=0;j<p.per;j++)push('plate',n);}
 if(!['choose','race','reveal'].includes(p.kind))push('check');return a;
}
for(const [scope,list] of [['story',M.scenes],['practice',M.tasks]])for(const [i,p] of list.entries()){
 const s=M.initial(p);assert(!s.ok);M.apply(p,s,'check');assert(!s.ok,scope+i+' initially solved');
 if(p.kind==='count')assert.equal(p.target,p.groups*p.each);
 if(p.kind==='missing')assert.equal(p.target,p.total-p.visible);
 if(p.kind==='route'){
  assert.equal(shortest(p).length-1,p.limit);let old=JSON.stringify(s.path);M.apply(p,s,'move',p.blocked[0]);assert.equal(JSON.stringify(s.path),old);M.apply(p,s,'move',p.end);assert.equal(JSON.stringify(s.path),old);
  let path=shortest(p);M.apply(p,s,'move',path[1]);M.apply(p,s,'undo');assert.equal(String(s.path),String([p.start]));
 }
 if(['choose','race','reveal'].includes(p.kind)){
  for(let j=0;j<p.opts.length;j++){let w=M.initial(p);if(p.kind==='race'){M.apply(p,w,'choose',p.answer);assert(!w.ok);M.apply(p,w,'overtake');}if(p.kind==='reveal'){M.apply(p,w,'choose',p.answer);assert(!w.ok);M.apply(p,w,'open',0);M.apply(p,w,'open',1);}M.apply(p,w,'choose',j);assert.equal(w.ok,j===p.answer);assert(w.fb.length>15);}
 }
 if(p.kind==='pack')for(let mask=0;mask<1<<p.items.length;mask++){
  let w=M.initial(p),counts={};p.items.forEach((k,j)=>{if(mask>>j&1){M.apply(p,w,'toggle',j);counts[k]=(counts[k]||0)+1;}});M.apply(p,w,'check');const expected=Object.keys({...counts,...p.need}).every(k=>(counts[k]||0)===(p.need[k]||0));assert.equal(w.ok,expected);
 }
 if(['count','missing'].includes(p.kind))for(let n=0;n<=20;n++){let w=M.initial(p);for(let j=0;j<n;j++)M.apply(p,w,'number',1);M.apply(p,w,'check');assert.equal(w.ok,n===p.target);}
 if(p.kind==='share'){let w=M.initial(p),total=p.amounts.reduce((a,b)=>a+b);for(let j=0;j<20;j++){M.apply(p,w,'transfer',0);assert.equal(w.bowls.reduce((a,b)=>a+b),total);assert(w.bowls.every(n=>n>=0));}for(let j=0;j<20;j++){M.apply(p,w,'transfer',1);assert.equal(w.bowls.reduce((a,b)=>a+b),total);assert(w.bowls.every(n=>n>=0));}}
 if(p.kind==='trips'){
  let w=M.initial(p);M.apply(p,w,'deliver');assert.equal(w.trips,0);for(let j=0;j<30;j++)M.apply(p,w,'load',1);assert.equal(w.tray,p.capacity);
  w=M.initial(p);for(let j=0;j<p.total;j++){M.apply(p,w,'load',1);M.apply(p,w,'deliver');}M.apply(p,w,'check');assert(!w.ok);assert.equal(w.delivered,p.total);M.apply(p,w,'reset');assert.equal(w.delivered,0);
 }
 for(const [a,v] of actions(p))M.apply(p,s,a,v);assert(s.ok,scope+' '+i+' cannot finish');const frozen=JSON.stringify(s);for(const [a,v] of [['reset'],['hint'],['number',1],['choose',0],['transfer',0]])M.apply(p,s,a,v);assert.equal(JSON.stringify(s),frozen);
 assert(!M.renderGame(p,s,scope,i).includes('NaN'));let restored=M.initial(p);M.restoreSolved(p,restored);assert(restored.ok);if(p.kind==='route')assert.equal(restored.path.length-1,p.limit);
}
// Native route: once only, stale events cannot finish another lesson or task.
const rec={tasks:[],stars:0};let wins=0;c.LV={id:308,phase:'tasks',task:0};c.lrec=()=>rec;c.save=()=>{};c.renderLessonView=()=>{};c.lvPick=x=>{assert.equal(x,M.tasks[c.LV.task].answer);rec.tasks.push(c.LV.task);wins++;};
for(let i=0;i<12;i++){c.LV.task=i;registered.тренажёр.задачи[i].картинка();for(const [a,v] of actions(M.tasks[i]))M.act('practice',i,a,v);assert(rec.tasks.includes(i));M.act('practice',i,'check');assert.equal(wins,i+1);}
c.LV.id=307;M.act('practice',11,'check');assert.equal(wins,12);
assert.equal(M.frames.length,10);assert.equal(M.tasks.length,12);
const old={id:308,__планПорядок:124,title:'old',comic:{}},neighbor={id:307,title:'unchanged'};let trainer;const a={window:null,ARH_LESSONS:[neighbor,old],ДТ:{подключить:t=>trainer=t},WAVE_B:{},CHS:{},LV:{id:308,phase:'explain',step:0},lidKey:String,DB:{lessons:{308:{tasks:[0],stars:1,picnic:{version:1,frames:{0:{...M.initial(M.scenes[0]),ok:true,fb:'saved'}},practice:{1:{picked:0}}}}}},save(){},addEventListener(){},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(){}}},console};a.window=a;vm.createContext(a);for(const file of ['jun_kit.js','lesson_jun308_picnic.js'])vm.runInContext(fs.readFileSync('MVP/data/'+file,'utf8'),a);assert.equal(old.__планПорядок,124);assert.equal(neighbor.title,'unchanged');assert.match(old.src,/1 класс · Олимп-1:/);assert.equal(old.comic,undefined);assert.equal(trainer.ID,308);a.WAVE_B[308]({innerHTML:'',querySelector:()=>null});assert(a.CHS['308'].п[0].ok);assert.equal(a.DB.lessons[308].stars,1);assert.equal(a.DB.lessons[308].picnic.practice[1].picked,0);
const idx=fs.readFileSync('MVP/index.html','utf8');assert(idx.indexOf('jun_kit.js')<idx.indexOf('lesson_jun308_picnic.js'));assert.match(idx,/lesson_jun308_audio.js\?v=\d+/);assert(!/яблок|корзин/i.test(JSON.stringify([M.scenes,M.tasks])));
if(process.argv.includes('--export'))fs.writeFileSync('/tmp/lesson308-content.json',JSON.stringify({frames:M.frames.map(f=>({say:f.say,hint:f.hint,success:f.success})),tasks:M.tasks,check:registered.запись.check},null,2));
console.log('PASS 308: 10 scenes, 12 games, independent route/count checks, exhaustive choices and packing subsets, conservation, bounds, wrong answers, native awards once, restored progress and isolation.');
