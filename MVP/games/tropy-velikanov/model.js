/* Pure progression for the seven-stage 3D expedition. Movement belongs to the renderer. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PALEO314_ACTION_MODEL=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const KEY='paleo314_action';
const definitions=[
 {id:'dig',title:'Секреты раскопа',brief:'Доберись до трёх мест раскопа. В каждом спрятаны две находки.',a:2,b:3,mode:'dig',goalCount:3,options:[5,6,8],explanation:'Три места по две находки: 2 + 2 + 2 = 6. Это 2 · 3.'},
 {id:'bridge',title:'Острова над ущельем',brief:'Пройди по мостам, перепрыгивая каменные пороги. На каждом из трёх островов — три находки.',a:3,b:3,mode:'bridge',goalCount:3,options:[6,9,12],explanation:'Три острова по три находки: 3 + 3 + 3 = 9. Это 3 · 3.'},
 {id:'dodge',title:'Тропа падающих камней',brief:'Обойди камни и найди два тайника. В каждом лежат четыре находки.',a:4,b:2,mode:'dodge',goalCount:2,options:[6,8,12],explanation:'Два тайника по четыре находки: 4 + 4 = 8. Это 4 · 2.'},
 {id:'turn',title:'Поворот древнего круга',brief:'Дойди до древнего круга и поверни раскладку. Четыре тройки станут тремя четвёрками.',a:3,b:4,mode:'turn',goalCount:1,options:[7,12,16],explanation:'Было четыре тройки, стало три четвёрки: 3 · 4 = 4 · 3 = 12. Ни одна находка не пропала.'},
 {id:'rescue',title:'Помощь маленьким великанам',brief:'Открой проход трём динозаврам. У каждого четыре ноги.',a:4,b:3,mode:'rescue',goalCount:3,options:[7,12,16],explanation:'У трёх динозавров по четыре ноги: 4 + 4 + 4 = 12. Это 4 · 3.'},
 {id:'beacons',title:'Огни затерянной долины',brief:'Зажги четыре маяка. На каждом вспыхнут два огня.',a:2,b:4,mode:'beacons',goalCount:4,options:[6,8,10],explanation:'Четыре маяка по два огня: 2 + 2 + 2 + 2 = 8. Это 2 · 4.'},
 {id:'flight',title:'Полёт над долиной',brief:'Пролети через три кольца. В каждом собери пять звёзд.',a:5,b:3,mode:'flight',goalCount:3,options:[8,15,20],explanation:'Три кольца по пять звёзд: 5 + 5 + 5 = 15. Это 5 · 3.'}
];
const stages=Object.freeze(definitions.map(s=>Object.freeze({...s,answer:s.a*s.b,options:Object.freeze(s.options)})));
const clone=value=>JSON.parse(JSON.stringify(value));
const integer=(n,min,max)=>Number.isInteger(n)&&n>=min&&n<=max;
const collectModes=new Set(['dig','bridge','dodge','flight']);
function initial(){return {version:2,stage:0,phase:'intro',collected:[],activated:[],stars:Array(7).fill(0),answer:null,feedback:''};}
function wrongFeedback(p,value){return value===p.a+p.b?`Ты сложил ${p.a} и ${p.b}. Здесь нужно взять по ${p.a} ${p.b} раза. Посмотри на все группы.`:`Считай по ${p.a}: нужно учесть ${p.b} группы.`;}
function validState(s){
 if(!s||typeof s!=='object'||Array.isArray(s)||s.version!==2||!integer(s.stage,0,6)||!['intro','playing','question','won','complete'].includes(s.phase))return false;
 if(!Array.isArray(s.stars)||s.stars.length!==7||Array.from(s.stars).some(n=>n!==0&&n!==1)||typeof s.feedback!=='string'||s.feedback.length>1000||s.answer!==null&&!integer(s.answer,0,81))return false;
 const p=stages[s.stage],isCollect=collectModes.has(p.mode),active=isCollect?s.collected:s.activated,unused=isCollect?s.activated:s.collected;
 if(!Array.isArray(active)||!Array.isArray(unused)||unused.length||new Set(active).size!==active.length||Array.from(active).some(n=>!integer(n,0,p.goalCount-1)))return false;
 const earned=s.stars.reduce((sum,n)=>sum+n,0);if(s.stars.some((n,i)=>n!==(i<earned?1:0)))return false;
 const finished=active.length===p.goalCount;
 if(s.phase==='intro')return s.stage===0&&active.length===0&&earned===0&&s.answer===null&&s.feedback==='';
 if(s.phase==='complete')return s.stage===6&&earned===7&&finished&&s.answer===p.answer&&s.feedback===p.explanation;
 const expected=s.stage+(s.phase==='won'?1:0);if(earned!==expected&&earned!==7)return false;
 if(s.phase==='playing')return !finished&&s.answer===null&&s.feedback==='';
 if(!finished)return false;
 if(s.phase==='won')return s.answer===p.answer&&s.feedback===p.explanation;
 return s.answer===null?s.feedback==='':s.answer!==p.answer&&s.feedback===wrongFeedback(p,s.answer);
}
function restore(raw){if(typeof raw==='string'){try{raw=JSON.parse(raw);}catch(_){return initial();}}return validState(raw)?clone(raw):initial();}
function apply(s,action,value){
 if(!validState(s))return false;
 const none=value===null||value===undefined,p=stages[s.stage];
 if(action==='start'&&s.phase==='intro'&&none){s.phase='playing';return true;}
 if(action==='replay'&&s.phase==='complete'&&none){const stars=s.stars.slice();Object.assign(s,initial(),{phase:'playing',stars});return true;}
 if(action==='next'&&s.phase==='won'&&none){if(s.stage===6){s.phase='complete';return true;}s.stage++;s.phase='playing';s.collected=[];s.activated=[];s.answer=null;s.feedback='';return true;}
 if(s.phase==='playing'&&((action==='collect'&&collectModes.has(p.mode))||(action==='activate'&&!collectModes.has(p.mode)))){
  const target=action==='collect'?s.collected:s.activated;if(!integer(value,0,p.goalCount-1)||target.includes(value))return false;target.push(value);if(target.length===p.goalCount)s.phase='question';return true;
 }
 if(action==='answer'&&s.phase==='question'&&integer(value,0,81)){s.answer=value;if(value!==p.answer){s.feedback=wrongFeedback(p,value);return true;}s.phase='won';s.feedback=p.explanation;s.stars[s.stage]=1;return true;}
 return false;
}
function load(storage){try{return restore(storage.getItem(KEY));}catch(_){return initial();}}
function save(storage,s){if(!validState(s))return false;try{storage.setItem(KEY,JSON.stringify(s));return true;}catch(_){return false;}}
function createModel(){return {KEY,stages,initial,restore,apply,validState,load,save};}
return {KEY,stages,createModel,initial,restore,apply,validState,load,save};
});
