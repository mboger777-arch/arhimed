/* Проверки чисел и адаптера, без запуска браузера. UI проверяется живыми нажатиями. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const data=fs.readFileSync(path.join(__dirname,'../MVP/lessons/257/content.js'),'utf8');
const adapter=fs.readFileSync(path.join(__dirname,'../MVP/data/lesson_jun257_tropinka.js'),'utf8');
function setup(record){const events=[];let delegated=0;const c={window:null,ARH_LESSONS:[{id:257,__планПорядок:12}],DB:{points:0,lessons:record?{257:record}:{}},LV:{id:257},document:{getElementById:()=>({})},renderLessonView:()=>delegated++,bumpDay:()=>{},logEvent:(type,d)=>events.push([type,d]),save:()=>{},hud:()=>{},go:()=>{}};c.window=c;vm.createContext(c);vm.runInContext(data,c);vm.runInContext(adapter,c);return {c,events,get delegated(){return delegated}}}
const test=setup(),{frames,stations}=test.c.TRAIL257_CONTENT;
assert.equal(frames.length,10);assert.equal(stations.length,3);
const tasks=stations.flatMap(s=>s.tasks);assert.equal(tasks.length,12);
for(const f of [...frames,...tasks]){
 assert(Number.isInteger(f.start)&&Number.isInteger(f.goal));
 if(f.options){assert(f.options.includes(f.answer));assert.equal(new Set(f.options).size,f.options.length);}
 if(f.mode==='walk'||f.mode==='groups'||f.mode==='distance'||f.mode==='predict'){
  assert((f.goal-f.start)*f.jump>0);assert.equal(Math.abs((f.goal-f.start)%f.jump),0);
 }
 if(f.mode==='missing')assert.equal(f.answer,f.missing);
 if(f.mode==='walk'&&f.answer!==undefined)assert.equal(f.answer,f.goal);
 if(f.equation){const m=/^(\d+) ([+−]) (\d+|\?) = (\d+|\?)$/.exec(f.equation);assert(m);const a=+m[1],b=m[3]==='?'?f.answer:+m[3],n=m[4]==='?'?f.answer:+m[4];assert.equal(m[2]==='+'?a+b:a-b,n);}
}
assert.equal(test.c.ARH_LESSONS[0].__планПорядок,12);assert.equal(test.c.ARH_LESSONS[0].explain.length,11);
test.c.TRAIL257.award(0,999,false);assert.equal(test.c.DB.points,0);
tasks.forEach((q,i)=>{test.c.TRAIL257.award(i,q.answer,i===0);test.c.TRAIL257.award(i,q.answer,false)});
assert.equal(test.c.DB.points,211);assert.equal(test.c.DB.lessons[257].stars,12);assert(test.c.DB.lessons[257].done);assert.equal(test.events.filter(e=>e[0]==='lesson').length,1);
test.c.TRAIL257.save({step:0,unlocked:0,completed:false});assert(test.c.DB.lessons[257].done);assert.equal(test.c.DB.lessons[257].tasks.length,12);
test.c.LV.id=300;test.c.renderLessonView();assert.equal(test.delegated,1);
const legacy=setup({done:true,doneTs:123,stars:3,tasks:[0,1,2]});tasks.forEach((q,i)=>legacy.c.TRAIL257.award(i,q.answer,false));assert.equal(legacy.c.DB.points,162);assert.equal(legacy.c.DB.lessons[257].doneTs,123);assert.equal(legacy.c.DB.lessons[257].stars,12);assert.equal(legacy.events.filter(e=>e[0]==='lesson').length,0);
console.log('PASS: 10 scenes, 12 tasks, arithmetic, direction, choices, rewards, replay, legacy progress and renderer isolation.');
