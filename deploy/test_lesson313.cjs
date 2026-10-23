const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let registered;const c={window:null,ДК:{подключить(x){registered=x;c.WAVE_B[313]=()=>{};}},WAVE_B:{},document:{createElement:()=>({}),head:{appendChild(){}}},addEventListener(){},console};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun313_workshop.js','utf8'),c);const M=c.WORK313;
const type=(send,n)=>{for(const d of String(n))send('digit',+d);send('check');};
function solve(p,send,s){
 if(p.kind==='align')send('place','units');
 if(p.kind==='choose')send('choose',p.answer);
 if(p.kind==='bundle'){for(let i=0;i<10;i++)send('toggle',i);send('exchange');}
 if(p.kind==='split'){send('exchange');type(send,p.n%10+10);}
 if(p.kind==='repair')type(send,Math.floor(p.result/10));
 if(p.kind==='calc'){
  // Independent arithmetic reference: use full number result for digits.
  const result=p.op==='+'?p.a+p.b:p.a-p.b;
  if(s.stage==='borrow')send('exchange');
  type(send,p.op==='+'?p.a%10+p.b%10:result%10);
  if(s.stage==='exchange'){send('exchange');type(send,result%10);}
  type(send,Math.floor(result/10));
 }
}
for(const[scope,list]of [['story',M.scenes],['practice',M.tasks]])for(const[i,p]of list.entries()){
 let s=M.initial(p);M.apply(p,s,'check');assert(!s.ok);s=M.initial(p);
 for(const a of ['digit','choose','toggle','place'])for(const v of [-1,99,NaN,1.5,'1']){let t=M.initial(p),f=JSON.stringify(t);M.apply(p,t,a,v);assert.equal(JSON.stringify(t),f,scope+i+a);}
 if(p.kind==='align'){M.apply(p,s,'place','tens');assert(!s.ok);}
 if(p.kind==='choose'){M.apply(p,s,'choose',(p.answer+1)%p.opts.length);assert(!s.ok);}
 if(p.kind==='bundle'){M.apply(p,s,'toggle',0);M.apply(p,s,'toggle',0);assert.equal(s.selected.length,0);M.apply(p,s,'exchange');assert(!s.ok);}
 if(p.kind==='calc'){let prev=s.stage;type((a,v)=>M.apply(p,s,a,v),99);assert.equal(s.stage,prev);assert(!s.ok);s=M.initial(p);}
 solve(p,(a,v)=>M.apply(p,s,a,v),s);assert(s.ok,scope+i);assert(!M.renderGame(p,s,scope,i).includes('undefined'));
 const frozen=JSON.stringify(s);M.apply(p,s,'digit',1);M.apply(p,s,'hint');assert.equal(JSON.stringify(s),frozen);
 const t=M.initial(p);M.restoreSolved(p,t);assert(t.ok);if(p.kind==='calc'){assert.equal(t.ten,s.ten);assert.equal(t.unit,s.unit);assert.equal(t.exchanged,s.exchanged);}
}
// Every valid two-digit sum/difference, including equal operands, zero units and a one-digit result.
let calculations=0;for(let a=10;a<100;a++)for(let b=10;b<100;b++)for(const op of ['+','−']){
 const result=op==='+'?a+b:a-b;if(result<0||result>99)continue;const p={kind:'calc',a,b,op,sol:'ok'},s=M.initial(p);
 const send=(action,value)=>{let old=s.exchanged;M.apply(p,s,action,value);if(!old&&s.exchanged){if(op==='−')assert.equal((Math.floor(a/10)-1)*10+(a%10+10),a);else assert.equal(Math.floor(a/10)*10+Math.floor(b/10)*10+10+(a%10+b%10-10),a+b);}};
 solve(p,send,s);assert(s.ok);assert.equal(s.ten*10+s.unit,result);calculations++;
}
const rec={tasks:[],stars:0};let wins=0;c.LV={id:313,phase:'tasks',task:0};c.lrec=()=>rec;c.save=()=>{};c.renderLessonView=()=>{};c.lvPick=x=>{assert.equal(x,M.tasks[c.LV.task].answer);rec.tasks.push(c.LV.task);wins++;};
for(let i=0;i<12;i++){c.LV.task=i;registered.тренажёр.задачи[i].картинка();solve(M.tasks[i],(a,v)=>M.act('practice',i,a,v),rec.workshop.practice[i]);assert(rec.tasks.includes(i));M.act('practice',i,'check');assert.equal(wins,i+1);}
c.LV.id=309;M.act('practice',11,'check');assert.equal(wins,12);
assert.equal(M.frames.length,10);assert.equal(M.tasks.length,12);assert(!/яблок|корзин/i.test(JSON.stringify([M.scenes,M.tasks])));
const old={id:313,__планПорядок:129,title:'old',comic:{}},neighbor={id:309,title:'unchanged'};let trainer;const a={window:null,ARH_LESSONS:[neighbor,old],ДТ:{подключить:t=>trainer=t},WAVE_B:{},CHS:{},LV:{id:313,phase:'explain',step:0},lidKey:String,DB:{lessons:{313:{tasks:[0],stars:1,game:{done:2,of:5},workshop:{version:1,frames:{0:{...M.initial(M.scenes[0]),ok:true,fb:'saved'}},practice:{1:{picked:0}}}}}},save(){},addEventListener(){},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(){}}},console};a.window=a;vm.createContext(a);for(const file of ['jun_kit.js','lesson_jun313_workshop.js'])vm.runInContext(fs.readFileSync('MVP/data/'+file,'utf8'),a);assert.equal(old.__планПорядок,129);assert.equal(neighbor.title,'unchanged');assert.match(old.src,/2 класс · Письменные приёмы/);assert.equal(old.comic,undefined);assert.equal(trainer.ID,313);a.WAVE_B[313]({innerHTML:'',querySelector:()=>null});assert(a.CHS['313'].п[0].ok);assert.equal(a.DB.lessons[313].stars,1);assert.equal(a.DB.lessons[313].game.done,2);assert.equal(a.DB.lessons[313].workshop.practice[1].picked,0);
const idx=fs.readFileSync('MVP/index.html','utf8');assert(idx.indexOf('jun_kit.js')<idx.indexOf('lesson_jun313_workshop.js'));assert.match(idx,/lesson_jun313_audio.js\?v=\d+/);
if(process.argv.includes('--export'))fs.writeFileSync('/tmp/lesson313-content.json',JSON.stringify({frames:M.frames.map(f=>({say:f.say,hint:f.hint,success:f.success})),tasks:M.tasks,check:registered.запись.check},null,2));
console.log(`PASS 313: 10 scenes, 12 trainers, ${calculations} independent calculations, exchange conservation, invalid actions, correction, native awards, restore, neighboring lessons preserved.`);
