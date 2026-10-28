/* Exercise real child-app events, including reduced motion and the zero-step case. */
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const root=path.join(__dirname,'../MVP/lessons/257');
function app(step,reduced){
 const nodes=new Map(), buttons=[];let saved;
 function node(id){if(!nodes.has(id))nodes.set(id,{innerHTML:'',textContent:'',isConnected:true,getBoundingClientRect:()=>({top:100,bottom:160,height:60}),scrollIntoView(){},style:{},dataset:{},classList:{toggle(){},add(){}},setAttribute(){}});return nodes.get(id);}
 const document={getElementById:node,querySelector:()=>node('scene'),querySelectorAll(selector){
  if(selector!=='[data-move]')return [];
  buttons.length=0;for(const match of node('lesson-body').innerHTML.matchAll(/data-move="(-?\d+)"/g))buttons.push({dataset:{move:match[1]}});
  return buttons;
 }};
 const initial={step,unlocked:step,states:{},completed:false,training:{active:null,stations:[{index:0,states:{}},{index:0,states:{}},{index:0,states:{}}]}};
 const c={window:null,document,parent:{TRAIL257:{load:()=>initial,save:s=>saved=structuredClone(s),award(){}}},matchMedia:()=>({matches:reduced}),location:{},innerHeight:800,requestAnimationFrame:fn=>{fn();return 1;},console};c.window=c;c.addEventListener=()=>{};c.scrollTo=()=>{};vm.createContext(c);
 vm.runInContext(fs.readFileSync(path.join(root,'content.js'),'utf8'),c);vm.runInContext(fs.readFileSync(path.join(root,'app.js'),'utf8'),c);
 return {html:()=>node('lesson-body').innerHTML,get saved(){return saved},move(n){const b=buttons.find(b=>+b.dataset.move===n);assert(b,`move ${n} is available`);b.onclick();}};
}
for(const reduced of [false,true]){
 const jump=app(6,reduced);jump.move(3);assert.equal(jump.saved.states[6].pos,3);assert.equal(jump.saved.states[6].moves,1);
 assert.equal(/<animate(?:Transform)?\b/.test(jump.html()),!reduced);
 if(!reduced){assert(jump.html().includes('pykh-jump.webp'));assert(jump.html().includes('0 -30'));}
 jump.move(3);jump.move(3);assert(jump.saved.states[6].solved);assert(jump.html().includes('pykh-happy.webp'));
 const minus=app(4,reduced);minus.move(1);assert.equal(minus.saved.states[4].pos,8);minus.move(-1);assert.equal(minus.saved.states[4].pos,7);assert(minus.html().includes('pykh-left.webp'));
 const zero=app(5,reduced);assert(zero.html().includes('pykh-stay.webp'));assert(!zero.html().includes('data-move='));assert.equal(zero.saved.states[5].moves,0);
 const missing=app(1,reduced);assert(missing.html().includes('ryzhik-search.webp'));assert(missing.html().includes('data-ask-hero'));
}
console.log('PASS: real movement events, jump/landing, left direction, wrong direction, zero, different actors, and no SMIL with reduced motion.');
