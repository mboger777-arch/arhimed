const assert=require('assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path'),crypto=require('crypto');
const root=path.join(__dirname,'../MVP/lessons');
for(const lesson of [257,300]){
 const spec=JSON.parse(fs.readFileSync(path.join(root,String(lesson),'narration.json')));
 const c={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,String(lesson),'narration-manifest.js'),'utf8'),c);
 assert.equal(spec.voice,'ru-RU-SvetlanaNeural');
 for(const [key,clip]of Object.entries(spec.clips)){
  assert.equal(c.window.LESSON_NARRATION[key],clip.file);
  assert(clip.segments.length>0);
  assert.equal(clip.segments.map(p=>p.text).join(' '),clip.text);
  clip.segments.forEach(p=>{assert(/^[+-]\d+%$/.test(p.rate));assert(/^[+-]\d+Hz$/.test(p.pitch));assert(p.pauseMs>=0&&p.pauseMs<=250);});
  const hash=crypto.createHash('sha256').update(JSON.stringify([spec.voice,clip.segments])).digest('hex').slice(0,12);
  assert.equal(clip.file,`assets/voice/${hash}.mp3`);
  assert(fs.statSync(path.join(root,String(lesson),clip.file)).size>1000);
 }
 const keys=[];
 for(let i=0;i<(lesson===257?10:7);i++)for(const suffix of ['', '-hint'])keys.push(`frame-${i}${suffix}`);
 for(let i=0;i<3;i++)for(let j=0;j<(lesson===257?4:3);j++)for(const suffix of ['', '-hint','-success'])keys.push(`task-${i}-${j}${suffix}`);
 if(lesson===257){for(let i=0;i<10;i++)keys.push(`frame-${i}-success`);keys.push('frame-7-arrived','frame-8-predicted');}
 else{keys.push('frame-1-full','frame-3-full','frame-5-split','complete');for(let i=2;i<=5;i++)keys.push(`frame-${i}-success`);}
 keys.forEach(k=>assert(spec.clips[k],`missing ${lesson}/${k}`));
 assert(!fs.readFileSync(path.join(root,String(lesson),'app.js'),'utf8').includes('SpeechSynthesisUtterance'));
}
(async()=>{
 const pending=[],handlers={};
 const audio={dataset:{},paused:true,src:null,pause(){this.paused=true},load(){},removeAttribute(){this.src=null},play(){this.paused=false;return new Promise((resolve,reject)=>pending.push({resolve,reject}));}};
 const button=()=>({attrs:{},setAttribute(k,v){this.attrs[k]=v},removeAttribute(k){delete this.attrs[k]}});
 const document={body:{appendChild(){}},hidden:false,createElement:()=>audio,addEventListener:(k,v)=>handlers[k]=v};
 const c={window:null,document,LESSON_NARRATION:{a:'a.mp3',b:'b.mp3'},addEventListener:(k,v)=>handlers[k]=v};c.window=c;vm.createContext(c);vm.runInContext(fs.readFileSync(path.join(root,'shared/narration.js'),'utf8'),c);
 const player=c.LESSON_VOICE,a=button(),b=button();let errors=0;
 player.toggle('a',a,()=>errors++);assert(!audio.paused);assert.equal(a.attrs['aria-pressed'],'true');
 const staleEnd=audio.onended;
 player.toggle('b',b,()=>errors++);assert.equal(a.attrs['aria-pressed'],'false');
 pending[0].reject(new Error('old request cancelled'));await Promise.resolve();await Promise.resolve();
 staleEnd();assert.equal(audio.src,'b.mp3');assert.equal(errors,0);
 pending[1].resolve();await Promise.resolve();assert(!b.attrs['aria-busy']);
 player.toggle('b',b);assert(audio.paused);assert.equal(audio.src,null);assert.equal(b.attrs['aria-pressed'],'false');
 player.toggle('missing',a,()=>errors++);assert.equal(errors,1);
 player.toggle('a',a,()=>errors++);audio.onerror();assert(audio.paused);assert.equal(errors,2);
 player.toggle('a',a);document.hidden=true;handlers.visibilitychange();assert(audio.paused);
 player.toggle('a',a);handlers.pagehide();assert(audio.paused);
 console.log('PASS: all narration keys/files/hashes, recorded voice only, start/stop, rapid switches, stale callbacks, errors and page lifecycle.');
})().catch(e=>{console.error(e);process.exitCode=1});
