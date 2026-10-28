/* Browser-event adapter checks with an isolated world/DOM double; no hooks in the game. */
const assert=require('assert/strict'),fs=require('fs'),vm=require('vm');
const root=require('node:path').resolve(__dirname,'..'),handlers={},nodes=new Map(),store=new Map();let now=0,frame,world;
class El{constructor(){this.style={};this.dataset={};this.textContent='';this.innerHTML='';this.listeners={};this.disabled=false;this.hidden=false;}addEventListener(n,fn){this.listeners[n]=fn;}setAttribute(){}setPointerCapture(id){this.pointer=id;}releasePointerCapture(){this.pointer=null;}getBoundingClientRect(){return {left:0,top:0,width:116,height:116};}emit(n,e={}){this.listeners[n]?.(e);}}
for(const id of['world','overlay','joystick','stick','action','jump','stage-name','route','mission','progress','toast','pause','back'])nodes.set(id,new El());
const doc={hidden:false,getElementById:id=>nodes.get(id),body:{classList:{toggle(){}}},querySelector:()=>nodes.get('back'),addEventListener:(n,fn)=>handlers['doc:'+n]=fn};
const ctx={console,document:doc,performance:{now:()=>now},localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},sessionStorage:{getItem:()=>null,setItem(){}},location:{reload(){}},requestAnimationFrame:fn=>frame=fn,setInterval:()=>0,clearInterval(){},addEventListener:(n,fn)=>handlers[n]=fn};ctx.window=ctx;ctx.createWorld=()=>world={targets:[],obstacles:[],loadStage(n){this.targets=Array.from({length:ctx.PALEO314_ACTION_MODEL.stages[n].goalCount},(_,id)=>({id:'target-'+id,x:0,z:0,y:1.6}));},update(dt,p){this.pose={...p};},resize(){},render(){},dispose(){}};
vm.createContext(ctx);vm.runInContext(fs.readFileSync(root+'/MVP/games/tropy-velikanov/model.js','utf8'),ctx);
const source=fs.readFileSync(root+'/MVP/games/tropy-velikanov/game.js','utf8').replace(/await import\('\.\/world\.js\?v=314-\d+'\)/,"await Promise.resolve({createWorld:globalThis.createWorld})");
(async()=>{await vm.runInContext('(async()=>{'+source+'})()',ctx);
const tick=(n=1)=>{for(let i=0;i<n;i++){now+=16;frame(now);}},key=(code,repeat=false)=>handlers.keydown({code,repeat,preventDefault(){}}),click=(kind,value)=>nodes.get('overlay').emit('click',{target:{closest:()=>({dataset:{model:kind,value:value===undefined?undefined:String(value)}})}}),state=()=>JSON.parse(store.get('paleo314_action'));
click('start');tick();assert.equal(state().phase,'playing');const startZ=world.pose.z;key('KeyW');tick(10);handlers.keyup({code:'KeyW'});tick();assert(world.pose.z<startZ-.5);assert(Math.abs(world.pose.yaw)<.001);const stationary=world.pose.z;tick(10);assert.equal(world.pose.z,stationary);
key('Space');tick(8);assert(world.pose.y>0.4);tick(80);assert.equal(world.pose.y,0);
nodes.get('joystick').emit('pointerdown',{pointerId:1,clientX:90,clientY:58,preventDefault(){}});tick(4);nodes.get('joystick').emit('pointercancel',{pointerId:1});const stopX=world.pose.x;tick(4);assert.equal(world.pose.x,stopX);assert.equal(nodes.get('stick').style.transform,'');
// Pausing discards held keys and does not lose progress.
key('KeyW');nodes.get('pause').emit('click');const pausedZ=world.pose.z;tick(8);assert.equal(world.pose.z,pausedZ);nodes.get('overlay').emit('click',{target:{closest:()=>({dataset:{ui:'resume'}})}});tick(8);assert.equal(world.pose.z,pausedZ);
for(let i=0;i<9;i++){now+=200;tick();nodes.get('action').emit('click');}assert.equal(state().phase,'question');assert.equal(state().collected.length,3);click('answer',5);assert.equal(state().phase,'question');assert.equal(state().collected.length,3);assert(nodes.get('overlay').innerHTML.includes('2 + 2 + 2'));click('answer',6);assert.equal(state().phase,'won');click('next');assert.equal(state().stage,1);assert.equal(state().phase,'playing');
// A target outside the action radius cannot be collected, even through a direct click event.
world.targets.forEach(t=>t.z=-40);tick();nodes.get('action').emit('click');assert.equal(state().collected.length,0);assert(nodes.get('action').disabled);
world.targets.forEach(t=>t.z=0);
for(let stage=1;stage<7;stage++){
 assert.equal(state().stage,stage);assert.equal(state().phase,'playing');
 if(stage===6){tick(4);}else{const presses=stage===5?2:1;for(let i=0;i<ctx.PALEO314_ACTION_MODEL.stages[stage].goalCount*presses;i++){now+=200;tick();nodes.get('action').emit('click');}}
 assert.equal(state().phase,'question');assert.equal(state().collected.length+state().activated.length,ctx.PALEO314_ACTION_MODEL.stages[stage].goalCount);
 if(stage===3){assert(nodes.get('overlay').innerHTML.includes('3 · 4 = 4 · 3'));assert.equal((nodes.get('overlay').innerHTML.match(/class="proof-group"/g)||[]).length,3);}
 click('answer',ctx.PALEO314_ACTION_MODEL.stages[stage].answer);assert.equal(state().phase,'won');click('next');
}
assert.equal(state().phase,'complete');assert.equal(state().stars.reduce((a,b)=>a+b,0),7);click('replay');assert.equal(state().stage,0);assert.equal(state().phase,'playing');
doc.hidden=true;handlers['doc:visibilitychange']();assert(nodes.get('overlay').innerHTML.includes('Продолжить путь'));assert.equal(state().stage,0);
console.log('PASS controller: keyboard move/stop, jump/landing, pointer cancel, pause/resume resets keys, 3-brush targets, wrong-answer preservation, all 7 stages, indexed world targets, two beacon presses, flight auto-collection, regrouped proof, replay, distance gate, background pause.');
})().catch(e=>{console.error(e);process.exitCode=1;});
