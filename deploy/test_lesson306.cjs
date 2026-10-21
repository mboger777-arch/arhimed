const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
let lesson;const listeners=[];
const c={window:null,ДК:{подключить(o){lesson=o;c.WAVE_B[306]=()=>{};}},WAVE_B:{},document:{createElement:()=>({}),head:{appendChild(){}}},addEventListener:(e,f)=>listeners.push(f),Date,console};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun306_oblachny_port.js','utf8'),c);
const kit={клик:(k,...a)=>`act:${k}:${a}`,сцена:(b)=>b,герой:()=>'',карт:()=>'',зона:()=>'',тащ:(v,x,y,b)=>b,сказ:()=>{}};
function begin(i){const s={};lesson.кадры[i].начало(s);assert(!lesson.кадры[i].готов(s));return s;}
function call(i,s,key,...args){lesson.кадры[i].клики[key](s,...args,kit);const html=lesson.кадры[i].рисуй(s,{...kit});assert(!html.includes('NaN'));return html;}
for(let i=0;i<10;i++)lesson.кадры[i].рисуй(begin(i),{...kit});
for(const [i,answers] of [[0,['sun','cloud']],[1,['cloud','cloud']]]){const s=begin(i);call(i,s,'put','moon');assert.equal(s.items.length,0);answers.forEach(v=>call(i,s,'put',v));assert(lesson.кадры[i].готов(s));call(i,s,'put','sun');assert.equal(s.items.length,2);}
for(const [i,key] of [[2,'lever'],[3,'lower']]){let s=begin(i);call(i,s,key,1);assert(!s.ok);call(i,s,key,2);assert(s.ok);assert.equal(s.value,i===2?10:4);}
let s=begin(4);call(4,s,'check');assert(!s.ok);call(4,s,'dial',5);call(4,s,'check');assert(s.ok);call(4,s,'dial',5);assert.equal(s.value,15);
s=begin(5);call(5,s,'replace',12);assert(!s.ok);call(5,s,'find',1);assert(!s.found);call(5,s,'find',3);call(5,s,'replace',10);assert(!s.ok);call(5,s,'replace',12);assert(s.ok);
s=begin(6);call(6,s,'cell',0);assert.equal(s.placed.length,0);call(6,s,'select',0);call(6,s,'cell',1);assert.equal(s.placed.length,0);for(let i=0;i<4;i++){call(6,s,'select',i);call(6,s,'cell',i);}assert(s.ok);call(6,s,'cell',3);assert.equal(s.placed.length,4);
s=begin(7);for(const i of [0,1,3]){call(7,s,'read',i);assert(!s.ok);}call(7,s,'read',2);assert(s.ok);
s=begin(8);call(8,s,'truth',0);assert.equal(s.index,0);for(const a of [1,0,1])call(8,s,'truth',a);assert(s.ok);call(8,s,'truth',1);assert.equal(s.index,3);
for(const [rule,seq] of [['pair',['cloud','sun','cloud']],['triple',['sun','cloud','cloud']]]){s=begin(9);call(9,s,'launch');assert(!s.launched);call(9,s,'rule',rule);call(9,s,'signal','moon');assert.equal(s.items.length,0);seq.forEach(v=>call(9,s,'signal',v));assert(!lesson.кадры[9].готов(s));call(9,s,'launch');assert(lesson.кадры[9].готов(s));}
assert.equal(lesson.запись.tasks.length,12);assert.equal(lesson.тренажёр.задачи.length,12);assert.equal(lesson.запись.explain,undefined);
const expected=['Солнце','Солнце','10','6','15','12','5','Вычитаем 5','5','4','Да','Облака'];
lesson.запись.tasks.forEach((t,i)=>{assert.equal(t.choices[t.ans],expected[i]);assert.equal(t.hints.length,1);});
assert.equal(new Set(lesson.запись.tasks.map(t=>t.ans)).size,3);
console.log('PASS 306: ten scene state machines, wrong answers, completion locks, double taps, two final patterns, table coordinates, 12 trainer answers and varied correct positions.');
if(process.argv.includes('--export'))fs.writeFileSync('/tmp/lesson306-content.json',JSON.stringify({frames:lesson.кадры.map(f=>({say:f.say,hint:f.hint,success:f.success})),tasks:c.PORT306.tasks,check:lesson.запись.check},null,2));
// Practice widgets use native wins, keep intermediate actions local, and reject stale taps.
const rec={tasks:[],stars:0};let wins=0,renders=0,saves=0;
c.LV={id:306,phase:'tasks',task:0};c.lrec=()=>rec;c.save=()=>saves++;c.renderLessonView=()=>renders++;
c.lvPick=i=>{assert.equal(i,lesson.запись.tasks[c.LV.task].ans);if(!rec.tasks.includes(c.LV.task)){rec.tasks.push(c.LV.task);wins++;}};
const action=(i,k,v)=>c.PORT306.practice(i,k,v);
for(let i=0;i<12;i++){
 c.LV.task=i;
 const draw=()=>lesson.тренажёр.задачи[i].картинка({...kit});
 assert(draw().includes('port-practice'));
 action(i,'answer','wrong');assert(!rec.tasks.includes(i));
 if(i===6){action(i,'answer','5');assert(!rec.tasks.includes(i));action(i,'find',0);assert(!rec.cloudPort.practice[i].found);action(i,'find',2);}
 if(i===10){action(i,'answer','Да');assert(!rec.tasks.includes(i));action(i,'inspect',0);assert(!rec.cloudPort.practice[i].inspected);action(i,'inspect',3);}
 if([2,3,4].includes(i)){
  action(i,'check',null);assert(!rec.tasks.includes(i));
  const d=i===2?1:i===3?-1:5;for(let k=0;k<(i===4?1:2);k++)action(i,'adjust',d);
  action(i,'check',null);
 }else if(i===8||i===9){action(i,'cell',0);assert(!rec.tasks.includes(i));action(i,'cell',i===8?1:2);}
 else action(i,'answer',expected[i]);
 assert(rec.tasks.includes(i));assert(!draw().includes('NaN'));
 const snapshot=JSON.stringify(rec);action(i,'adjust',1);action(i,'answer',expected[i]);assert.equal(JSON.stringify(rec),snapshot);
}
assert.equal(wins,12);action(0,'answer','Солнце');assert.equal(wins,12);c.LV.id=300;action(11,'answer','Облака');assert.equal(wins,12);
const cargoComplete=begin(6);for(let i=0;i<4;i++){call(6,cargoComplete,'select',i);call(6,cargoComplete,'cell',i);}const cargoSnapshot=JSON.stringify(cargoComplete);call(6,cargoComplete,'cell',0);call(6,cargoComplete,'select',0);assert.equal(JSON.stringify(cargoComplete),cargoSnapshot);
console.log('PASS 306 practice: 12 interactive games, staged repair/journal, wrong answers, number controls, native award routing, completion and stale-event guards.');
// Real registration replaces the old lesson in place, preserving catalog identity and neighbours.
const old306={id:306,title:'old',comic:{},scene:{},mode:'old'},neighbour={id:305,title:'unchanged'};
const appListeners=[];let registeredTrainer;
const app={window:null,ARH_LESSONS:[neighbour,old306],ДТ:{подключить:t=>registeredTrainer=t},WAVE_B:{},CHS:{},LV:{id:306,phase:'explain',step:6},lidKey:String,DB:{lessons:{306:{tasks:[0],stars:1,done:false,cloudPort:{version:1,frames:{6:{placed:[0,1,2,3],selected:null,ok:false,fb:'old error'}},practice:{2:{value:9}}}}}},save(){},addEventListener:(name,fn)=>appListeners.push({name,fn}),document:{addEventListener(){},querySelectorAll:()=>[],getElementById:()=>null,createElement:()=>({}),head:{appendChild(){}}},console,Date};app.window=app;vm.createContext(app);
for(const f of ['MVP/data/jun_kit.js','MVP/data/lesson_jun306_oblachny_port.js'])vm.runInContext(fs.readFileSync(f,'utf8'),app);
assert.equal(app.ARH_LESSONS.length,2);assert.equal(app.ARH_LESSONS[1],old306);assert.equal(neighbour.title,'unchanged');assert.equal(old306.explain.length,10);assert.equal(old306.tasks.length,12);assert.match(old306.src,/1 класс · Логика:/);assert.equal(old306.comic,undefined);assert.equal(registeredTrainer.ID,306);
const el={innerHTML:'',querySelector:()=>null};app.WAVE_B[306](el);
assert.match(el.innerHTML,/Порядок!/);assert.equal(app.DB.lessons[306].cloudPort.practice[2].value,9);assert.equal(app.DB.lessons[306].stars,1);assert.deepEqual(app.DB.lessons[306].tasks,[0]);
const index=fs.readFileSync('MVP/index.html','utf8');assert(index.indexOf('jun_kit.js')<index.indexOf('lesson_jun306_oblachny_port.js'));assert(index.includes('lesson_jun306_audio.js?v='));
console.log('PASS 306 integration: real engine registration, catalog identity, junior path metadata, preserved rewards/practice, repaired restored completion.');
