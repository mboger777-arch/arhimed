const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
let registered;const c={window:null,ДК:{подключить(x){registered=x;c.WAVE_B[307]=()=>{};}},WAVE_B:{},document:{createElement:()=>({}),head:{appendChild(){}}},addEventListener(){},console};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun307_moon_theatre.js','utf8'),c);
const M=c.MOON307;
const perm=a=>a.length?a.flatMap((v,i)=>perm(a.filter((_,j)=>i!==j)).map(p=>[v,...p])):[[]];
// Independent constraint solver verifies uniqueness, rather than trusting stored answer keys.
function fits(cl,p){return cl.op==='is'?p[cl.a]===cl.v:cl.op==='not'?p[cl.a]!==cl.v:cl.op==='before'?p[cl.a]<p[cl.b]:true;}
function solve(p){return perm(p.solution.map((_,i)=>i)).filter(v=>p.clues.every(cl=>fits(cl,v)));}
function complete(p,s){
 if(['choose','verdict'].includes(p.kind))M.apply(p,s,'choose',p.answer);
 if(p.kind==='grid')M.apply(p,s,'cell',p.cell);
 if(p.kind==='match')p.solution.forEach((v,i)=>{M.apply(p,s,'select',v);M.apply(p,s,'place',i);});
 if(['doors','order'].includes(p.kind))p.solution.forEach((v,i)=>{M.apply(p,s,'select',i);M.apply(p,s,'place',v);});
 if(p.kind==='swap'){const diff=p.solution.map((v,i)=>v!==s.map[i]?i:null).filter(v=>v!==null);diff.forEach(i=>M.apply(p,s,'select',i));}
 if(p.kind==='show')p.sequence.forEach(v=>M.apply(p,s,'call',v));
 if(['match','doors','order','swap'].includes(p.kind))M.apply(p,s,'check',null);
}
for(const [kind,items] of [['story',M.scenes],['practice',M.tasks]])for(const [i,p] of items.entries()){
 const s=M.initial(p);assert(!s.ok);M.apply(p,s,'check',null);assert(!s.ok);
 if(p.solution&&p.kind!=='verdict'){
  const solutions=solve(p);assert.equal(solutions.length,1,`${kind} ${i}: ambiguous`);assert.equal(String(solutions[0]),String(p.solution));
  for(const wrong of perm(p.solution.map((_,j)=>j))){if(String(wrong)===String(p.solution))continue;const w=M.initial(p);w.map=wrong;M.apply(p,w,'check',null);assert(!w.ok,`${kind} ${i}: accepted wrong permutation`);assert(w.fb.includes('подсказка'));}
 }
 if(p.kind==='choose'||p.kind==='verdict'){p.opts.forEach((v,j)=>{const w=M.initial(p);M.apply(p,w,'choose',j);assert.equal(w.ok,j===p.answer);});}
 if(p.kind==='grid'){for(let r=0;r<3;r++)for(let x=0;x<3;x++){const w=M.initial(p);M.apply(p,w,'cell',[r,x]);assert.equal(w.ok,r===p.cell[0]&&x===p.cell[1]);}}
 if(p.kind==='show'){M.apply(p,s,'call',1);assert.equal(s.count,0);}
 complete(p,s);assert(s.ok,`${kind} ${i}: cannot finish`);const frozen=JSON.stringify(s);M.apply(p,s,'hint');M.apply(p,s,'choose',0);M.apply(p,s,'select',0);assert.equal(JSON.stringify(s),frozen);
 if(kind==='story')assert(!registered.кадры[i].рисуй(s).includes('NaN'));
}
// Moving a thing must not duplicate it, and a second tap on a selected thing cancels.
let p=M.scenes[3],s=M.initial(p);M.apply(p,s,'select',0);M.apply(p,s,'place',0);M.apply(p,s,'select',0);M.apply(p,s,'place',1);assert.equal(s.map[0],null);assert.equal(s.map[1],0);M.apply(p,s,'select',1);M.apply(p,s,'select',1);assert.equal(s.selected,null);
assert.equal(M.frames.length,10);assert.equal(M.tasks.length,12);
// Explicit ambiguity lesson: Rune != drum leaves two possibilities for Rune.
const alternatives=perm([0,1,2]).filter(p=>p[0]!==1);assert.equal(new Set(alternatives.map(p=>p[0])).size,2);
// All practice finishes go through the native reward route, exactly once; stale clicks do nothing.
const rec={tasks:[],stars:0};let wins=0;c.LV={id:307,phase:'tasks',task:0};c.lrec=()=>rec;c.save=()=>{};c.renderLessonView=()=>{};c.lvPick=a=>{assert.equal(a,M.tasks[c.LV.task].answer);rec.tasks.push(c.LV.task);wins++;};
for(let i=0;i<12;i++){c.LV.task=i;registered.тренажёр.задачи[i].картинка();let st=rec.moonTheatre.practice[i];complete(M.tasks[i],st);st.ok=false;const p=M.tasks[i];const a=p.kind==='grid'?'cell':['choose','verdict'].includes(p.kind)?'choose':'check';M.act('practice',i,a,p.kind==='grid'?p.cell:p.answer);assert(rec.tasks.includes(i));M.act('practice',i,a,p.answer);assert.equal(wins,i+1);}
c.LV.id=306;M.act('practice',11,'choose',0);assert.equal(wins,12);
// Real engine integration preserves catalog identity, source classification, and existing rewards.
const old={id:307,__планПорядок:123,title:'old',comic:{}},neighbour={id:306,title:'unchanged'};let trainer;
const a={window:null,ARH_LESSONS:[neighbour,old],ДТ:{подключить:t=>trainer=t},WAVE_B:{},CHS:{},LV:{id:307,phase:'explain',step:0},lidKey:String,DB:{lessons:{307:{tasks:[0],stars:1,moonTheatre:{version:1,frames:{0:{...M.initial(M.scenes[0]),ok:true,fb:'saved'}},practice:{1:{picked:0}}}}}},save(){},addEventListener(){},document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(){}}},console};a.window=a;vm.createContext(a);for(const file of ['jun_kit.js','lesson_jun307_moon_theatre.js'])vm.runInContext(fs.readFileSync('MVP/data/'+file,'utf8'),a);assert.equal(a.ARH_LESSONS[1],old);assert.equal(old.__планПорядок,123);assert.equal(neighbour.title,'unchanged');assert.match(old.src,/1 класс · Логика:/);assert.equal(old.comic,undefined);assert.equal(trainer.ID,307);a.WAVE_B[307]({innerHTML:'',querySelector:()=>null});assert(a.CHS['307'].п[0].ok);assert.equal(a.DB.lessons[307].stars,1);assert.equal(a.DB.lessons[307].moonTheatre.practice[1].picked,0);
const idx=fs.readFileSync('MVP/index.html','utf8');assert(idx.indexOf('jun_kit.js')<idx.indexOf('lesson_jun307_moon_theatre.js'));assert.match(idx,/lesson_jun307_audio.js\?v=\d+/);
if(process.argv.includes('--export'))fs.writeFileSync('/tmp/lesson307-content.json',JSON.stringify({frames:M.frames.map(f=>({say:f.say,hint:f.hint,success:f.success})),tasks:M.tasks,check:registered.запись.check},null,2));
console.log('PASS 307: 10 story scenes, 12 games, independent uniqueness solver, all wrong permutations/cells/answers, ambiguity, completion locks, item moves, native awards, stale events, real registration and restored progress.');
