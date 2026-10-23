const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let registered;const c={window:null,ДК:{подключить(x){registered=x;c.WAVE_B[309]=()=>{};}},WAVE_B:{},document:{createElement:()=>({}),head:{appendChild(){}}},addEventListener(){},console};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun309_aurora.js','utf8'),c);
const M=c.AUR309,win=[false];for(let n=1;n<=20;n++)win[n]=[1,2].some(k=>k<=n&&!win[n-k]);
const move=n=>[1,2].find(k=>k<=n&&!win[n-k])||1;
function solve(p,send,s){
 if(p.kind==='duel')while(!s.ok&&!s.lost){send(s.turn==='finn'?'opponent':'take',s.turn==='you'?move(s.remaining):null);}
 if(p.kind==='pair')send('pick',3-p.opponent);
 if(p.kind==='opening')send('pick',[1,2].find(k=>!win[p.total-k]));
 if(p.kind==='choose')send('choose',p.answer);
 if(p.kind==='group')for(let i=0;i<p.total;i++){send('toggle',i);if(i%3===2)send('check');}
 if(p.kind==='mark'){p.numbers.forEach((n,i)=>{if(!win[n])send('toggle',i);});send('check');}
 if(p.kind==='mirror')while(!s.ok){send('opponent');const r=Math.floor(s.pending/p.size),col=s.pending%p.size;send('cell',(p.size-1-r)*p.size+p.size-1-col);}
}
for(const [scope,list]of [['story',M.scenes],['practice',M.tasks]])for(const[i,p]of list.entries()){
 let s=M.initial(p);assert(!s.ok);M.apply(p,s,'check');assert(!s.ok);
 for(const a of ['take','cell','pick','choose','toggle'])for(const bad of [-1,999,NaN,1.5,'1']){let t=M.initial(p),prev=JSON.stringify(t);M.apply(p,t,a,bad);assert.equal(JSON.stringify(t),prev,scope+i+a);}
 if(p.kind==='duel'){
  // Enumerate every legal child branch against actual opponent, verify inventory/turns and wins.
  const explore=t=>{assert.equal(t.remaining+t.history.reduce((a,h)=>a+h.n,0),p.total);assert(t.remaining>=0);if(t.ok||t.lost){assert.equal(t.remaining,0);assert.equal(t.ok,t.history.at(-1).who==='you');return;}
   const wrong=t.turn==='you'?'opponent':'take';const frozen=JSON.stringify(t);M.apply(p,t,wrong,1);assert.equal(JSON.stringify(t),frozen);
   if(t.turn==='finn'){const n=t.remaining,was=win[n];M.apply(p,t,'opponent');if(was)assert(!win[t.remaining],'AI missed winning move');explore(t);}else for(let k=1;k<=Math.min(2,t.remaining);k++){let next=JSON.parse(JSON.stringify(t));M.apply(p,next,'take',k);explore(next);}
  };explore(M.initial(p));
  let loss=M.initial(p);while(!loss.ok&&!loss.lost){if(loss.turn==='finn')M.apply(p,loss,'opponent');else M.apply(p,loss,'take',1);}if(loss.lost){M.apply(p,loss,'reset');assert.equal(loss.remaining,p.total);assert(!loss.lost);}
 }
 if(p.kind==='mirror'){
  let t=M.initial(p);M.apply(p,t,'cell',0);assert.equal(t.pairs,0);M.apply(p,t,'opponent');let pending=t.pending;M.apply(p,t,'opponent');assert.equal(t.pending,pending);
  const wrong=t.cells.findIndex((v,j)=>!v&&j!==t.cells.length-1-pending&&!(p.size%2&&j===Math.floor(t.cells.length/2)));M.apply(p,t,'cell',wrong);assert.equal(t.pairs,0);assert.equal(t.pending,pending);
 }
 if(p.kind==='group'){let t=M.initial(p);for(let j=0;j<4;j++)M.apply(p,t,'toggle',j);M.apply(p,t,'check');assert.equal(t.groups.length,0);M.apply(p,t,'toggle',3);M.apply(p,t,'check');assert.equal(t.groups.length,1);M.apply(p,t,'toggle',0);assert.equal(t.selected.length,0);}
 if(p.kind==='mark')for(let mask=0;mask<32;mask++){let t=M.initial(p);p.numbers.forEach((_,j)=>{if(mask>>j&1)M.apply(p,t,'toggle',j);});M.apply(p,t,'check');assert.equal(t.ok,p.numbers.every((n,j)=>Boolean(mask>>j&1)===!win[n]));}
 if(p.kind==='opening'||p.kind==='pair')for(let k=1;k<=2;k++){let t=M.initial(p);M.apply(p,t,'pick',k);assert.equal(t.ok,p.kind==='pair'?p.opponent+k===3:!win[p.total-k]);}
 solve(p,(a,v)=>M.apply(p,s,a,v),s);assert(s.ok,scope+i+' unresolved');let frozen=JSON.stringify(s);M.apply(p,s,'reset');M.apply(p,s,'hint');assert.equal(JSON.stringify(s),frozen);assert(!M.renderGame(p,s,scope,i).includes('undefined'));
 let t=M.initial(p);M.restoreSolved(p,t);assert(t.ok);if(p.kind==='mirror')for(let j=0;j<t.cells.length;j++)assert.equal(!!t.cells[j],!!t.cells[t.cells.length-1-j]);
}
const rec={tasks:[],stars:0};let wins=0;c.LV={id:309,phase:'tasks',task:0};c.lrec=()=>rec;c.save=()=>{};c.renderLessonView=()=>{};c.lvPick=x=>{assert.equal(x,M.tasks[c.LV.task].answer);rec.tasks.push(c.LV.task);wins++;};
for(let i=0;i<12;i++){c.LV.task=i;registered.тренажёр.задачи[i].картинка();solve(M.tasks[i],(a,v)=>M.act('practice',i,a,v),rec.aurora.practice[i]);assert(rec.tasks.includes(i));M.act('practice',i,'check');assert.equal(wins,i+1);}
c.LV.id=308;M.act('practice',11,'check');assert.equal(wins,12);
assert.equal(M.frames.length,10);assert.equal(M.tasks.length,12);assert(!/яблок|корзин/i.test(JSON.stringify([M.scenes,M.tasks])));
const old={id:309,__планПорядок:125,title:'old',comic:{}},neighbor={id:308,title:'unchanged'};let trainer;const a={window:null,ARH_LESSONS:[neighbor,old],ДТ:{подключить:t=>trainer=t},WAVE_B:{},CHS:{},LV:{id:309,phase:'explain',step:0},lidKey:String,DB:{lessons:{309:{tasks:[0],stars:1,game:{done:2,of:5},aurora:{version:1,frames:{0:{...M.initial(M.scenes[0]),ok:true,fb:'saved'}},practice:{1:{picked:0}}}}}},save(){},addEventListener(){},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(){}}},console};a.window=a;vm.createContext(a);for(const file of ['jun_kit.js','lesson_jun309_aurora.js'])vm.runInContext(fs.readFileSync('MVP/data/'+file,'utf8'),a);assert.equal(old.__планПорядок,125);assert.equal(neighbor.title,'unchanged');assert.match(old.src,/1 класс · Олимп-1: игры и симметрия/);assert.equal(old.comic,undefined);assert.equal(trainer.ID,309);a.WAVE_B[309]({innerHTML:'',querySelector:()=>null});assert(a.CHS['309'].п[0].ok);assert.equal(a.DB.lessons[309].stars,1);assert.equal(a.DB.lessons[309].game.done,2);assert.equal(a.DB.lessons[309].aurora.practice[1].picked,0);
const idx=fs.readFileSync('MVP/index.html','utf8');assert(idx.indexOf('jun_kit.js')<idx.indexOf('lesson_jun309_aurora.js'));assert.match(idx,/lesson_jun309_audio.js\?v=\d+/);
if(process.argv.includes('--export'))fs.writeFileSync('/tmp/lesson309-content.json',JSON.stringify({frames:M.frames.map(f=>({say:f.say,hint:f.hint,success:f.success})),tasks:M.tasks,check:registered.запись.check},null,2));
console.log('PASS 309: all scenes/trainers, independent game solver, every child branch, fair opponent, mirror pairs, invalid turns, retries, native awards, persistence, existing game preserved.');
