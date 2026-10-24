const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
(async()=>{
 const pending=[],handlers={},load=[];let audio,observer;
 class Audio{constructor(){audio=this;this.dataset={};this.paused=true;}pause(){this.paused=true;}load(){}removeAttribute(){this.src=null;}play(){this.paused=false;return new Promise((resolve,reject)=>pending.push({resolve,reject}));}}
 const c={window:null,Audio,MutationObserver:class{constructor(f){observer=f;}observe(){}},document:{body:{appendChild(){}},addEventListener:(k,f)=>handlers[k]=f,getElementById:()=>({})},addEventListener:(k,f)=>{handlers[k]=f;if(k==='load')load.push(f);},LV:{id:302,phase:'explain',step:0},GLOW302:{frames:[{hint:'Hint',готов:()=>false}]},CHS:{302:{п:{0:{}}}},lidKey:x=>x,toast(){}};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync('MVP/data/lesson_jun302_audio.js','utf8'),c);
 const spec=JSON.parse(fs.readFileSync('MVP/lessons/302/narration.json'));
 assert.equal(Object.keys(spec.clips).length,75);
 const {createEnv}=require('./test_lesson302.cjs'),actual=createEnv();
 const expected={};
 for(const [prefix,list] of [['frame',actual.api.scenes],['task',actual.api.tasks]])for(const [i,p] of list.entries())for(const [suffix,field] of [['','q'],['-hint','hint'],['-success','sol']])expected[prefix+'-'+i+suffix]=p[field];
 const lesson=actual.registrations.lesson;
 expected.check=lesson.запись.check.q;
 expected['check-success']=lesson.тренажёр.проверка.итог;
 expected.done=[...lesson.тренажёр.финал().matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m=>m[1].replace(/<[^>]+>/g,'')).join(' ');
 assert.equal(Object.keys(expected).length,75);
 assert.deepEqual(Object.keys(spec.clips).sort(),Object.keys(expected).sort());
 for(const [key,text] of Object.entries(expected))assert.equal(spec.clips[key].displayText,text,'Narration displayText differs from current lesson: '+key);

 for(const [key,clip] of Object.entries(spec.clips)){
  assert.equal(c.GLOW302_CLIPS[key],'lessons/302/'+clip.file);
  assert.equal(clip.segments.map(x=>x.text).join(' '),clip.text);
  const hash=crypto.createHash('sha256').update(JSON.stringify([spec.voice,clip.segments])).digest('hex').slice(0,12);
  assert.equal(clip.file,`assets/voice/${hash}.mp3`);assert(fs.statSync('MVP/lessons/302/'+clip.file).size>1000);
 }
 const p=c.GLOW302_AUDIO;
 p.playKey('frame-0');const end=audio.onended;p.playKey('frame-1');const current=audio.src;
 pending[0].reject(Error('cancelled'));await Promise.resolve();await Promise.resolve();end();assert.equal(audio.src,current);assert(!audio.paused);
 p.playKey('frame-1');assert(audio.paused);assert.equal(audio.src,null);
 p.playKey('frame-2');audio.onerror();assert(audio.paused);assert.equal(audio.dataset.playback,'error');
 p.playKey('frame-2');audio.onended();assert(audio.paused);assert.equal(audio.dataset.playback,'ended');
 load.forEach(f=>f());
 // No observer callback is allowed before this first real UI click after load.
 const attrs={},firstButton={isConnected:true,textContent:'🔊',setAttribute(k,v){attrs[k]=v;}};
 handlers.click({target:{closest:selector=>selector==='#lvis .слушать'?firstButton:null},preventDefault(){},stopImmediatePropagation(){}});
 const firstSrc=audio.src;assert.equal(firstSrc,c.GLOW302_CLIPS['frame-0']);assert(!audio.paused);
 observer();assert(!audio.paused,'first click after load must keep playing when MutationObserver first runs');assert.equal(audio.src,firstSrc);assert.equal(attrs['aria-pressed'],'true');
 p.stop();p.playKey('frame-0');observer();assert(!audio.paused,'rerender on same frame must preserve narration');c.LV.step=1;observer();assert(audio.paused,'navigation stops narration');
 p.playKey('frame-0');c.document.hidden=true;handlers.visibilitychange();assert(audio.paused);
 p.playKey('frame-0');handlers.pagehide();assert(audio.paused);
 p.playKey('frame-0');handlers.hashchange();assert(audio.paused);
 console.log('PASS 302 voice: 75 displayText matches and hashes/files, first UI click after load, rapid switches, stale callbacks, replay toggle, audio errors/end, rerenders, navigation and page lifecycle.');
})().catch(e=>{console.error(e);process.exitCode=1});
