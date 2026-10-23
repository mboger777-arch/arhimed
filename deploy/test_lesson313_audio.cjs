const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
(async()=>{
 const pending=[],handlers={},load=[];let audio,observer;
 class Audio{constructor(){audio=this;this.dataset={};this.paused=true;}pause(){this.paused=true;}load(){}removeAttribute(){this.src=null;}play(){this.paused=false;return new Promise((resolve,reject)=>pending.push({resolve,reject}));}}
 const c={window:null,Audio,MutationObserver:class{constructor(f){observer=f;}observe(){}},document:{body:{appendChild(){}},addEventListener:(k,f)=>handlers[k]=f,getElementById:()=>({})},addEventListener:(k,f)=>{handlers[k]=f;if(k==='load')load.push(f);},LV:{id:313,phase:'explain',step:0},WORK313:{frames:[{hint:'Hint',готов:()=>false}]},CHS:{313:{п:{0:{}}}},lidKey:x=>x,toast(){}};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun313_audio.js','utf8'),c);
 const spec=JSON.parse(fs.readFileSync('MVP/lessons/313/narration.json'));
 assert.equal(Object.keys(spec.clips).length,69);
 for(const [key,clip] of Object.entries(spec.clips)){
  assert.equal(c.WORK313_CLIPS[key],'lessons/313/'+clip.file);
  assert.equal(clip.segments.map(x=>x.text).join(' '),clip.text);
  const hash=crypto.createHash('sha256').update(JSON.stringify([spec.voice,clip.segments])).digest('hex').slice(0,12);
  assert.equal(clip.file,`assets/voice/${hash}.mp3`);assert(fs.statSync('MVP/lessons/313/'+clip.file).size>1000);
 }
 const p=c.WORK313_AUDIO;
 p.playKey('frame-0');const end=audio.onended;p.playKey('frame-1');const current=audio.src;
 pending[0].reject(Error('cancelled'));await Promise.resolve();await Promise.resolve();end();assert.equal(audio.src,current);assert(!audio.paused);
 p.playKey('frame-1');assert(audio.paused);assert.equal(audio.src,null);
 p.playKey('frame-2');audio.onerror();assert(audio.paused);assert.equal(audio.dataset.playback,'error');
 p.playKey('frame-2');audio.onended();assert(audio.paused);assert.equal(audio.dataset.playback,'ended');
 load.forEach(f=>f());observer();p.playKey('frame-0');observer();assert(!audio.paused,'rerender on same frame must preserve narration');c.LV.step=1;observer();assert(audio.paused,'navigation stops narration');
 p.playKey('frame-0');c.document.hidden=true;handlers.visibilitychange();assert(audio.paused);
 p.playKey('frame-0');handlers.pagehide();assert(audio.paused);
 p.playKey('frame-0');handlers.hashchange();assert(audio.paused);
 console.log('PASS 313 voice: 69 hashes/files, rapid switches, stale callbacks, replay toggle, audio errors/end, rerenders, navigation and page lifecycle.');
})().catch(e=>{console.error(e);process.exitCode=1});
