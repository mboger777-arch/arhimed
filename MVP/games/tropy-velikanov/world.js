import * as THREE from '../kubicheskiy-mir/js/vendor/three.module.js';

// All coordinates are metres. Character origins are their feet, facing -Z.
// The controller owns locomotion and collisions; this module owns the pictures.
export function createWorld(canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(61, 1, .1, 125);
  camera.position.set(0, 6.8, 12.5);
  const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:false, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const hemi = new THREE.HemisphereLight(0xc8e2df, 0x493e32, 1.3);
  const sun = new THREE.DirectionalLight(0xffefd2, 2.4);
  sun.position.set(-9, 17, 6); sun.castShadow = true;
  sun.shadow.mapSize.set(1024,1024);
  Object.assign(sun.shadow.camera,{left:-17,right:17,top:24,bottom:-24,near:.5,far:70});
  sun.shadow.bias = -.0005; sun.shadow.normalBias = .025;
  sun.shadow.radius = 3;
  const fill = new THREE.DirectionalLight(0xb2d5d3,.45); fill.position.set(8,6,-25);
  scene.add(hemi,sun,sun.target,fill);
  const stageRoot = new THREE.Group(); scene.add(stageRoot);
  const targets = [], obstacles = [], platforms = [];
  const targetNodes = [], rockNodes = [], ambient = [];
  const heroCache = cache(), stageCache = cache();
  let currentCache=heroCache, stageIndex=0, time=0, disposed=false;
  let targetView=new THREE.Vector3(0,.95,-5), camDesired=new THREE.Vector3();

  function cache(){return {geometries:new Map(),materials:new Map()};}
  function geometry(key,build){if(!currentCache.geometries.has(key))currentCache.geometries.set(key,build());return currentCache.geometries.get(key);}
  function material(color,opts={}){
    const key=JSON.stringify([color,opts]);
    if(!currentCache.materials.has(key))currentCache.materials.set(key,new THREE.MeshStandardMaterial({color,roughness:.82,metalness:0,...opts}));
    return currentCache.materials.get(key);
  }
  function mesh(geo,color,parent,pos=[0,0,0],scale=[1,1,1],opts={}){
    const m=new THREE.Mesh(geo,material(color,opts));m.position.set(...pos);m.scale.set(...scale);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;
  }
  const sphere=()=>geometry('sphere',()=>new THREE.SphereGeometry(1,14,10));
  const rockGeo=()=>geometry('rock',()=>new THREE.DodecahedronGeometry(1,0));
  function ball(parent,color,pos,scale,opts){return mesh(sphere(),color,parent,pos,scale,opts);}
  function rock(parent,color,pos,scale){return mesh(rockGeo(),color,parent,pos,scale);}
  function cylinder(parent,color,pos,r1,r2,h,sides=12,opts={}){return mesh(geometry(`c${r1}/${r2}/${h}/${sides}`,()=>new THREE.CylinderGeometry(r1,r2,h,sides)),color,parent,pos,[1,1,1],opts);}
  function torus(parent,color,pos,r=.5,tube=.05,arc=Math.PI*2,opts={}){return mesh(geometry(`t${r}/${tube}/${arc}`,()=>new THREE.TorusGeometry(r,tube,7,32,arc)),color,parent,pos,[1,1,1],opts);}
  function link(parent,color,a,b,r=.08,r2=r){
    const va=new THREE.Vector3(...a),vb=new THREE.Vector3(...b),delta=vb.clone().sub(va);
    const m=cylinder(parent,color,va.clone().add(vb).multiplyScalar(.5).toArray(),r2,r,delta.length(),8);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());return m;
  }
  function group(parent,pos=[0,0,0]){const g=new THREE.Group();g.position.set(...pos);parent.add(g);return g;}
  function curveTube(parent,color,points,r,key){
    return mesh(geometry(key,()=>new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),18,r,7,false)),color,parent);
  }
  function seeded(n){let a=n>>>0;return ()=>{a=(a*1664525+1013904223)>>>0;return a/4294967296;};}
  function clearCache(c){for(const g of c.geometries.values())g.dispose();for(const m of c.materials.values())m.dispose();c.geometries.clear();c.materials.clear();}
  function clearStage(){stageRoot.traverse(o=>{if(o.isInstancedMesh)o.dispose();});stageRoot.clear();clearCache(stageCache);}

  function eyes(parent,y,z,spread,size=.055){
    for(const side of [-1,1]){
      ball(parent,0xfff4dc,[side*spread,y,z],[size*1.35,size*1.55,size*.65]);
      ball(parent,0x342f2a,[side*spread,y-.005,z-size*.51],[size*.71,size*.98,size*.43]);
      ball(parent,0xffffff,[side*spread-size*.17,y+size*.35,z-size*.88],[size*.23,size*.25,size*.17]);
    }
  }
  function armadillo(parent){
    const root=group(parent),rig={legs:[],arms:[]};
    ball(root,0xbb8473,[0,1.00,.04],[.47,.66,.35]);
    ball(root,0xe0b69a,[0,1.08,-.27],[.32,.46,.14]);
    ball(root,0x7d7776,[0,1.22,.27],[.52,.67,.27]);
    for(let i=0;i<6;i++){
      const w=.42+Math.sin(i/5*Math.PI)*.11;
      ball(root,i%2?0xa39a93:0x8f8885,[0,.73+i*.17,.34],[w,.12,.25]);
    }
    for(const side of [-1,1]){
      ball(root,0x3f546e,[side*.29,1.11,-.23],[.18,.43,.16]);
      const leg=group(root,[side*.23,.57,.04]);rig.legs.push(leg);
      ball(leg,0xb98470,[0,-.18,0],[.17,.29,.18]);
      ball(leg,0x927363,[0,-.43,-.1],[.21,.12,.29]);
      for(let k=0;k<3;k++)ball(leg,0xe5cbaa,[(k-1)*.075,-.445,-.34],[.032,.035,.065]);
      const arm=group(root,[side*.43,1.42,-.05]);rig.arms.push(arm);
      ball(arm,0x40546e,[side*.03,-.11,0],[.17,.22,.18]);
      ball(arm,0xbc8774,[side*.04,-.34,-.025],[.14,.25,.15]);
      ball(arm,0xd8ab90,[side*.04,-.51,-.06],[.145,.13,.16]);
    }
    const scarf=torus(root,0xc99b42,[0,1.59,-.015],.3,.085);scarf.rotation.x=Math.PI/2;
    ball(root,0xd4a54d,[-.16,1.35,-.385],[.1,.26,.045]).rotation.z=-.18;
    const head=group(root,[0,1.87,-.12]);rig.head=head;
    ball(head,0xc28b77,[0,0,0],[.39,.35,.37]);
    ball(head,0xe1b69c,[0,-.13,-.3],[.245,.18,.3]);
    ball(head,0x66514a,[0,-.09,-.58],[.105,.075,.065]);
    eyes(head,.07,-.31,.2,.058);
    for(const side of [-1,1]){
      const ear=ball(head,0xb88374,[side*.26,.32,.025],[.105,.24,.065]);ear.rotation.z=side*-.23;
      const inner=ball(head,0xdca58c,[side*.26,.34,-.035],[.058,.16,.022]);inner.rotation.z=side*-.23;
      ball(head,0x9c9390,[side*.17,.2,.18],[.21,.15,.22]);
    }
    const tail=group(root,[0,.7,.35]);rig.tail=tail;
    curveTube(tail,0xa48b7c,[[0,0,0],[0,-.23,.35],[.07,-.5,.72],[.17,-.57,1.06]],.082,'rum-tail');
    for(let i=0;i<6;i++)ball(tail,0x8b827b,[i*.025,-.07-i*.087,.11+i*.145],[.09,.075,.1]);
    root.userData.rig=rig;return root;
  }
  function foxEar(parent,side){
    const e=group(parent,[side*.245,.24,.02]);e.rotation.z=side*-.18;
    const shape=new THREE.Shape();shape.moveTo(-.18,0);shape.quadraticCurveTo(-.29,.3,0,.82);shape.quadraticCurveTo(.29,.3,.18,0);shape.quadraticCurveTo(0,-.07,-.18,0);
    const geo=geometry('fennec-ear',()=>new THREE.ExtrudeGeometry(shape,{depth:.08,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:9}));
    mesh(geo,0xdfbb80,e,[0,0,0]);mesh(geo,0xe6a695,e,[0,.09,-.035],[.68,.72,.3]);return e;
  }
  function fennec(parent){
    const root=group(parent),rig={legs:[],arms:[],ears:[]};
    ball(root,0xd9b57e,[0,.98,.03],[.35,.56,.3]);
    ball(root,0xf0dfb6,[0,1.03,-.24],[.25,.37,.11]);
    cylinder(root,0x559b93,[0,.83,.025],.36,.36,.12,16).scale.z=.82;
    ball(root,0xd7b466,[.13,.83,-.285],[.065,.075,.045]);
    for(const side of [-1,1]){
      const leg=group(root,[side*.18,.59,.02]);rig.legs.push(leg);
      ball(leg,0xd9b780,[0,-.2,0],[.12,.29,.13]);ball(leg,0xe9cea1,[0,-.46,-.09],[.16,.11,.23]);
      const arm=group(root,[side*.31,1.3,-.02]);rig.arms.push(arm);
      ball(arm,0xd5ae74,[side*.03,-.22,-.015],[.11,.3,.12]);ball(arm,0xf0dab0,[side*.04,-.46,-.06],[.115,.115,.13]);
    }
    const head=group(root,[0,1.69,-.1]);rig.head=head;
    ball(head,0xdfba81,[0,0,0],[.37,.33,.31]);
    ball(head,0xf6e8c9,[0,-.1,-.235],[.29,.19,.2]);
    ball(head,0x51463a,[0,-.055,-.422],[.065,.05,.045]);eyes(head,.055,-.285,.17,.061);
    for(const side of [-1,1]){rig.ears.push(foxEar(head,side));ball(head,0xe1ab87,[side*.27,-.07,-.24],[.06,.04,.025]);}
    const tail=group(root,[0,.72,.23]);rig.tail=tail;
    curveTube(tail,0xc89d63,[[0,0,0],[.2,-.18,.36],[.36,-.22,.72],[.33,-.04,.96]],.145,'fennec-tail');
    ball(tail,0xf4dfb8,[.34,-.06,.92],[.16,.19,.23]);root.userData.rig=rig;root.scale.setScalar(.88);return root;
  }
  const player=armadillo(scene),companion=fennec(scene);
  player.position.set(0,0,2);companion.position.set(1.4,0,3);
  // A soft flying membrane appears only during the final flight stage.
  const glider=group(player,[0,1.35,.18]);glider.visible=false;
  for(const side of [-1,1]){
    const shape=new THREE.Shape();shape.moveTo(0,0);shape.quadraticCurveTo(side*.8,.5,side*1.65,.12);shape.lineTo(side*.95,-.65);shape.quadraticCurveTo(side*.3,-.45,0,-.15);
    const wing=mesh(geometry('glider'+side,()=>new THREE.ShapeGeometry(shape,12)),0xe5d19b,glider,[0,0,0],[1,1,1],{side:THREE.DoubleSide});wing.rotation.x=-.55;
    link(glider,0x9a8c69,[0,0,0],[side*1.6,.12,-.07],.035);
  }

  function plant(parent,x,z,rng,theme='fern'){
    const g=group(parent,[x,0,z]);g.rotation.y=rng()*Math.PI*2;
    if(theme==='cactus'){
      const h=.65+rng()*.7;cylinder(g,0x779174,[0,h*.5,0],.13,.18,h,7);
      const side=rng()>.5?1:-1;link(g,0x779174,[0,h*.55,0],[side*.32,h*.68,0],.1);cylinder(g,0x779174,[side*.32,h*.85,0],.08,.11,h*.4,7);
    }else{
      for(let j=0;j<3;j++){const leaf=ball(g,j%2?0x799765:0x466f54,[Math.cos(j*2.1)*.17,.21,Math.sin(j*2.1)*.17],[.1,.4,.065]);leaf.rotation.z=.65;leaf.rotation.y=j*2.1;}
    }
  }
  function tree(parent,x,z,rng){
    const h=2.4+rng()*2.2,g=group(parent,[x,0,z]);cylinder(g,0x786b4c,[0,h*.38,0],.14,.23,h*.76,7);
    for(let j=0;j<2;j++){const canopy=mesh(geometry('pine',()=>new THREE.ConeGeometry(1,1,9)),j?0x4d7759:0x345e4a,g,[0,h*(.66+j*.19),0],[1.0-j*.22,h*.55,1.0-j*.22]);canopy.rotation.y=j*.3;}
  }
  function arch(parent,x,z,width,height,color){
    const g=group(parent,[x,0,z]);
    for(const side of [-1,1]){
      const pillar=cylinder(g,color,[side*width/2,height*.4,0],.36,.5,height*.8,7);pillar.rotation.z=side*-.06;
      rock(g,color,[side*width/2,.2,0],[.66,.25,.7]);
    }
    const top=torus(g,color,[0,height*.78,0],width/2,.34,Math.PI);top.rotation.z=0;
    return g;
  }
  function fossilTile(parent,x,y,z,angle=0){
    const slab=cylinder(parent,0xd8c49e,[x,y+.07,z],.3,.34,.13,7);slab.rotation.y=angle;
    const spiral=[];for(let i=0;i<24;i++){const t=i/23*Math.PI*3.6,r=.02+i/23*.2;spiral.push([x+Math.cos(t)*r,y+.145,z+Math.sin(t)*r]);}
    curveTube(parent,0x93836b,spiral,.014,`spiral-${x}/${y}/${z}`);
  }
  function ringMarker(parent,color=0xebc46d,r=.85){
    const m=mesh(geometry('marker'+r,()=>new THREE.RingGeometry(r-.045,r,40)),color,parent,[0,.035,0],[1,1,1],{side:THREE.DoubleSide,transparent:true,opacity:.85,emissive:color,emissiveIntensity:.12});m.rotation.x=-Math.PI/2;return m;
  }
  function target(id,x,z,y,label,build){
    const g=group(stageRoot,[x,0,z]);const marker=ringMarker(g);build(g);
    const item={id,x,z,y,label};targets.push(item);targetNodes.push({item,g,marker,baseY:0,spin:null});return targetNodes[targetNodes.length-1];
  }
  function crystal(parent,color,pos,size=1){
    const c=mesh(geometry('crystal',()=>new THREE.OctahedronGeometry(1,0)),color,parent,pos,[.23*size,.7*size,.23*size],{roughness:.22,metalness:.18,emissive:color,emissiveIntensity:.2});c.rotation.y=.4;return c;
  }
  function babyDino(parent,color){
    const g=group(parent),head=group(g,[0,1.08,-.43]);
    ball(g,color,[0,.7,.05],[.47,.43,.7]);ball(g,0xe2d9aa,[0,.58,-.3],[.34,.27,.31]);
    for(const x of [-.32,.32])for(const z of [-.34,.38]){
      ball(g,color,[x,.36,z],[.16,.33,.17]);ball(g,0xbec49c,[x,.11,z-.07],[.19,.12,.23]);
      for(let k=0;k<2;k++)ball(g,0xf1e4bd,[x+(k-.5)*.1,.105,z-.26],[.04,.035,.05]);
    }
    ball(head,color,[0,0,0],[.35,.29,.37]);ball(head,0xe8dfb1,[0,-.1,-.21],[.25,.13,.25]);eyes(head,.055,-.29,.17,.045);
    curveTube(g,color,[[0,.7,.5],[.2,.68,.95],[.4,.56,1.22]],.105,'dino-tail');
    for(let j=0;j<4;j++)mesh(geometry('dino-spike',()=>new THREE.ConeGeometry(.12,.24,4)),0xb9ce97,g,[0,1.11-j*.03,-.2+j*.22]);
    g.userData.head=head;return g;
  }
  function cloud(x,y,z,size=1){
    const g=group(stageRoot,[x,y,z]);for(let i=0;i<3;i++)ball(g,0xffefdf,[(i-1)*.8,Math.sin(i*2)*.15,0],[1.1*size,.43*size,.65*size],{roughness:1});ambient.push({type:'cloud',g,baseX:x,phase:z});return g;
  }
  function star(parent,color,pos,r=.22){
    const shape=new THREE.Shape();for(let i=0;i<10;i++){const a=Math.PI/2+i*Math.PI/5,rr=i%2?r*.46:r,x=Math.cos(a)*rr,y=Math.sin(a)*rr;i?shape.lineTo(x,y):shape.moveTo(x,y);}shape.closePath();
    return mesh(geometry('star'+r,()=>new THREE.ExtrudeGeometry(shape,{depth:.055,bevelEnabled:true,bevelSize:.012,bevelThickness:.012,bevelSegments:1,steps:1})),color,parent,pos,[1,1,1],{emissive:color,emissiveIntensity:.22,roughness:.38});
  }
  function groundDetails(p,rng){
    const terrain=geometry('ground',()=>{
      const geo=new THREE.PlaneGeometry(29,59,18,32),positions=geo.attributes.position,colors=[];
      const base=new THREE.Color(p.ground);
      for(let i=0;i<positions.count;i++){
        const x=positions.getX(i),y=positions.getY(i),shade=.86+.13*Math.sin(x*.69+y*.29)+rng()*.12;
        const c=base.clone().multiplyScalar(shade);colors.push(c.r,c.g,c.b);
      }
      geo.setAttribute('color',new THREE.Float32BufferAttribute(colors,3));return geo;
    });
    const ground=mesh(terrain,0xffffff,stageRoot,[0,-.025,-21],[1,1,1],{vertexColors:true});ground.rotation.x=-Math.PI/2;
    if(stageIndex!==1){
      const routes=[[[0,5],[-3,-7],[3,-15],[0,-24],[0,-43]],[],[[0,5],[-4,-12],[4,-26],[0,-43]],[[0,5],[1,-8],[0,-20],[0,-43]],[[0,5],[-5,-9],[5,-19],[0,-30],[0,-43]],[[0,5],[-4,-7],[4,-15],[-4,-23],[4,-32],[0,-43]]];
      const route=routes[stageIndex],left=[],right=[];
      for(let i=0;i<route.length;i++){
        const prev=route[Math.max(0,i-1)],next=route[Math.min(route.length-1,i+1)],dx=next[0]-prev[0],dz=next[1]-prev[1],length=Math.hypot(dx,dz)||1,w=1.05+(i%2)*.18;
        left.push([route[i][0]-dz/length*w,route[i][1]+dx/length*w]);right.push([route[i][0]+dz/length*w,route[i][1]-dx/length*w]);
      }
      const shape=new THREE.Shape(),polygon=[...left,...right.reverse()];polygon.forEach(([x,z],i)=>i?shape.lineTo(x,-z):shape.moveTo(x,-z));shape.closePath();
      const path=mesh(geometry('winding-trail',()=>new THREE.ShapeGeometry(shape)),stageIndex===4?0xab9d68:stageIndex===5?0x9f9e75:0xbfa779,stageRoot,[0,.004,0]);path.rotation.x=-Math.PI/2;
    }
    const smallRockMaterial=material(stageIndex===4?0x7c8e65:0x877961),pebbles=new THREE.InstancedMesh(rockGeo(),smallRockMaterial,96),matrix=new THREE.Matrix4(),quaternion=new THREE.Quaternion();
    for(let i=0;i<96;i++){
      const side=i%2?1:-1,x=side*(5.9+rng()*5.2),z=4-rng()*47,s=.07+rng()*.15;
      matrix.compose(new THREE.Vector3(x,.035,z),quaternion.setFromAxisAngle(new THREE.Vector3(0,1,0),rng()*6.28),new THREE.Vector3(s*1.6,s*.55,s));pebbles.setMatrixAt(i,matrix);
    }
    pebbles.receiveShadow=true;stageRoot.add(pebbles);
    if([0,4,5].includes(stageIndex)){
      const blades=new THREE.InstancedMesh(geometry('grass-blade',()=>new THREE.ConeGeometry(.055,.5,3)),material(stageIndex===5?0x47694d:0x4b7147),96);
      for(let i=0;i<96;i++){
        const cluster=Math.floor(i/4),side=cluster%2?1:-1,x=side*(6.1+(cluster%3)*.65)+(i%4)*.13,z=3-Math.floor(cluster/2)*3.8+(i%3)*.12;
        matrix.compose(new THREE.Vector3(x,.2,z),quaternion.setFromEuler(new THREE.Euler(0,rng()*6.28,(rng()-.5)*.65)),new THREE.Vector3(1,.65+rng()*.65,1));blades.setMatrixAt(i,matrix);
      }
      blades.castShadow=true;stageRoot.add(blades);
    }
  }
  const palettes=[
    {sky:0xa9cfca,fog:0xb8cfc0,ground:0x9e865e,rock:0x8b6d50,sun:0xffefd2},
    {sky:0x98cad2,fog:0xa1c7bc,ground:0x6f967b,rock:0x577c72,sun:0xffefd7},
    {sky:0xd5b49a,fog:0xd6b092,ground:0xaf7950,rock:0x89533e,sun:0xffddb1},
    {sky:0xb4a5c2,fog:0xb7a3b4,ground:0x8f7c78,rock:0x6f6078,sun:0xffddbf},
    {sky:0x9fc9b5,fog:0xa4c2a2,ground:0x617e47,rock:0x577659,sun:0xffedd2},
    {sky:0x527e8a,fog:0x688e89,ground:0x416650,rock:0x3d5f58,sun:0xf2ddbb},
    {sky:0xc99fb8,fog:0xe2bacb,ground:0x938872,rock:0x766e81,sun:0xffdfbd}
  ];
  function loadStage(index){
    if(disposed)return;
    stageIndex=Math.max(0,Math.min(6,Math.floor(Number(index)||0)));currentCache=stageCache;
    clearStage();targets.length=0;obstacles.length=0;platforms.length=0;targetNodes.length=0;rockNodes.length=0;ambient.length=0;
    const p=palettes[stageIndex],rng=seeded(801+stageIndex*313);
    scene.background=new THREE.Color(p.sky);scene.fog=new THREE.Fog(p.fog,48,103);sun.color.setHex(p.sun);hemi.color.setHex(p.sky);hemi.groundColor.setHex(p.rock);
    hemi.intensity=stageIndex===5?1.0:1.3;sun.intensity=stageIndex===5?1.8:2.4;renderer.toneMappingExposure=stageIndex===5?1.05:1;
    glider.visible=stageIndex===6;
    if(stageIndex!==6){
      groundDetails(p,rng);
      if(stageIndex!==1)platforms.push({x:0,z:-21,y:0,w:29,d:59});
    }
    // The background cliffs frame the corridor without blocking playable space.
    for(let i=0;i<16;i++){
      const side=i%2?1:-1,z=6-Math.floor(i/2)*7.8,x=side*(10.2+rng()*1.4),h=1.7+rng()*3.8;
      const c=rock(stageRoot,p.rock,[x,h*.35-.2,z],[2.25+rng()*.7,h*.65,2.8+rng()]);c.rotation.y=rng()*Math.PI;
      if(stageIndex!==6){
        const ledge=rock(stageRoot,p.rock,[side*(8.1+rng()*.5),.4,z-1],[1.55,.7,2.2]);ledge.rotation.y=side*.3;
        rock(stageRoot,p.ground,[side*8.6,.9,z-.8],[1.55,.3,2]);
      }
    }
    if(stageIndex!==6)for(let i=0;i<20;i++){
      const x=(i%2?1:-1)*(6.6+rng()*1.7),z=3-rng()*47;
      if([0,4,5].includes(stageIndex)&&i%4===0)tree(stageRoot,x,z,rng);else plant(stageRoot,x,z,rng,[2,3].includes(stageIndex)?'cactus':'fern');
    }
    arch(stageRoot,0,-42,4,3.7,p.rock);
    if(stageIndex===0){
      const tent=group(stageRoot,[-6,0,0]);
      for(const side of [-1,1]){link(tent,0x867255,[side*1.6,0,0],[0,2.4,0],.06);link(tent,0x867255,[side*1.6,0,-2.4],[0,2.4,-2.4],.06);}
      const roofGeo=geometry('tent',()=>{const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute([-1.6,0,0,0,2.4,0,0,2.4,-2.4,-1.6,0,0,0,2.4,-2.4,-1.6,0,-2.4,0,2.4,0,1.6,0,0,1.6,0,-2.4,0,2.4,0,1.6,0,-2.4,0,2.4,-2.4],3));geo.computeVertexNormals();return geo;});mesh(roofGeo,0xe4d3a1,tent,[0,0,0],[1,1,1],{side:THREE.DoubleSide});
      [[-3,-7],[3,-15],[0,-24]].forEach(([x,z],i)=>target(`dig-${i}`,x,z,.2,`Раскоп ${i+1}`,g=>{
        const mat=mesh(geometry('dig-mat',()=>new THREE.CircleGeometry(1.05,8)),0xbfa67a,g,[0,.015,0]);mat.rotation.x=-Math.PI/2;
        const covers=[];
        for(let j=0;j<2;j++){
          const x=(j-.5)*.76;fossilTile(g,x,.04,0,j*.4);
          covers.push(rock(g,0xcbb28a,[x,.19,0],[.42,.19,.4]));
        }
        g.userData.covers=covers;
        link(g,0x8e7a54,[-.8,.05,-.8],[-.8,1.35,-.8],.035);const pennant=mesh(geometry('pennant',()=>new THREE.ConeGeometry(.22,.5,3)),0xcaa45c,g,[-.65,1.2,-.8]);pennant.rotation.z=-Math.PI/2;
      }));
    }
    if(stageIndex===1){
      const water=mesh(geometry('water',()=>new THREE.PlaneGeometry(23,49)),0x559d99,stageRoot,[0,.005,-20],[1,1,1],{roughness:.3,metalness:.12});water.rotation.x=-Math.PI/2;
      const stops=[[0,2],[-4,-8],[4,-18],[0,-29],[0,-42]];
      for(let k=0;k<stops.length;k++){const[x,z]=stops[k];cylinder(stageRoot,0x9ba898,[x,-.23,z],2.7,3.15,.48,9);platforms.push({x,z,y:.01,w:5.3,d:5.3});
        if(k){const[a,b]=stops[k-1],steps=Math.ceil(Math.hypot(x-a,z-b)/1.2);for(let j=1;j<steps;j++){const t=j/steps;rock(stageRoot,0xbdc0a6,[a+(x-a)*t,-.11,b+(z-b)*t],[1.65,.16,.76]);}}
      }
      [[-4,-8],[4,-18],[0,-29]].forEach(([x,z],i)=>target(`bridge-${i}`,x,z,.15,`Остров ${i+1}`,g=>{fossilTile(g,-.35,.05,0);fossilTile(g,.35,.05,0);crystal(g,0xc4d6ae,[0,.8,-.4],.6);}));
      [[-2.4,-4],[0,-13],[1.8,-24]].forEach(([x,z],i)=>{
        const barrier=group(stageRoot,[x,0,z]);for(let j=-2;j<=2;j++)rock(barrier,0x78928b,[j*.68,.48,0],[.48,.56,.45]);
        obstacles.push({id:`jump-${i}`,x,z,r:1.8,kind:'jump',width:3.7,y:0});
      });
      for(let i=0;i<7;i++){const ripple=torus(stageRoot,0xb1d0bd,[(i%2?1:-1)*6,.04,-3-i*5],.8,.014,Math.PI*1.4);ripple.rotation.x=-Math.PI/2;ambient.push({type:'ripple',g:ripple,phase:i});}
    }
    if(stageIndex===2){
      [[-4,-12],[4,-26]].forEach(([x,z],i)=>target(`find-${i}`,x,z,.15,`Находка ${i+1}`,g=>{for(let j=0;j<4;j++)fossilTile(g,(j%2-.5)*.7,.03,(Math.floor(j/2)-.5)*.7);rock(g,0x987452,[0,-.13,0],[1.05,.19,.95]);}));
      [-7,-16,-23,-33].forEach((z,i)=>{
        const node=rock(stageRoot,i%2?0x706a62:0x837568,[0,.95,z],[.95,.95,.95]);
        const obstacle={id:`boulder-${i}`,kind:'boulder',x:0,z,r:1,moving:true,baseX:0,speed:.55+i*.11,amplitude:6.8,phase:i*1.7};obstacles.push(obstacle);rockNodes.push({node,obstacle});
      });
      for(let i=0;i<5;i++)arch(stageRoot,(i%2?1:-1)*8,-6-i*8,2.5,2.9,0x9b785f);
    }
    if(stageIndex===3){
      for(let i=0;i<8;i++){const a=i*Math.PI/4;cylinder(stageRoot,0x9d8a88,[Math.cos(a)*6,1.0,-20+Math.sin(a)*6],.3,.55,2+(i%3)*.4,7);}
      const n=target('obelisk',0,-20,.2,'Поворотный обелиск',g=>{
        cylinder(g,0x9c8b80,[0,.15,0],1.4,1.6,.3,12);const spin=group(g,[0,.35,0]);
        cylinder(spin,0x8a858b,[0,1.65,0],.68,.95,3.3,4).rotation.y=Math.PI/4;
        mesh(geometry('obelisk-tip',()=>new THREE.ConeGeometry(.98,1,4)),0xbeb19b,spin,[0,3.75,0]).rotation.y=Math.PI/4;
        const runes=[];
        for(let j=0;j<12;j++)runes.push(crystal(spin,0xd9c588,[(j%3-1)*.33,.62+Math.floor(j/3)*.59,.69],.23));
        g.userData.runes=runes;
        g.userData.spin=spin;
      });n.spin=n.g.userData.spin;
    }
    if(stageIndex===4){
      [[-5,-9],[5,-19],[0,-30]].forEach(([x,z],i)=>target(`dino-${i}`,x,z,.2,`Малыш ${i+1}`,g=>{
        const d=babyDino(g,[0x8cac78,0xb4a47e,0x81a7a0][i]);d.rotation.y=[.35,-.4,0][i];g.userData.baby=d;ringMarker(g,0xc8d9a4,1.5);
        const gate=group(g);g.userData.gate=gate;
        for(const side of [-1,1])rock(gate,0x86937a,[side*1.2,.5,.8],[.33,.65,.38]);
        link(gate,0x987b55,[-1.2,.58,.85],[1.2,.82,.85],.11);
        link(gate,0xaa8c64,[-1.2,1.05,.85],[1.2,1.14,.85],.09);
        for(const x of [-.7,0,.7])link(gate,0x8b7758,[x,.3,.85],[x,1.25,.85],.065);
      }));
      for(let i=0;i<6;i++){const g=group(stageRoot,[(i%2?1:-1)*6,-.08,-6-i*6]);for(let j=0;j<3;j++)rock(g,0xa5ac84,[Math.cos(j*2.1)*.9,0,Math.sin(j*2.1)*.9],[1,.15,.7]);}
    }
    if(stageIndex===5){
      [[-4,-7],[4,-15],[-4,-23],[4,-32]].forEach(([x,z],i)=>target(`beacon-${i}`,x,z,.2,`Маяк ${i+1}`,g=>{
        cylinder(g,0x8e9d8c,[0,.43,0],.5,.8,.85,9);cylinder(g,0xc2b987,[0,.9,0],.75,.65,.12,12);
        const crystals=[crystal(g,0xa9d4bb,[-.3,1.5,0],.85),crystal(g,0xd9be7d,[.3,1.5,0],.85)];
        crystals.forEach((c,j)=>{c.material=c.material.clone();stageCache.materials.set(`beacon-${i}-${j}`,c.material);});
        g.userData.crystals=crystals;
        const light=new THREE.PointLight(0xc8dfb5,.7,4);light.position.set(0,1.7,0);g.add(light);g.userData.light=light;
      }));
      for(let i=0;i<8;i++){const w=ball(stageRoot,0xc1cfb2,[(i%2?1:-1)*(5.4+(i%3)),1+i%3,-4-i*4.7],[.045,.045,.045],{emissive:0xc1cfb2,emissiveIntensity:1.3});ambient.push({type:'mote',g:w,y:w.position.y,phase:i});}
    }
    if(stageIndex===6){
      [[0,2],[-3,-10],[3,-21],[0,-32],[0,-43]].forEach(([x,z],i)=>{cylinder(stageRoot,p.ground,[x,-.3,z],2.6,1.8,.6,10);cylinder(stageRoot,p.rock,[x,-2.3,z],1.8,.1,3.5,8);platforms.push({x,z,y:0,w:5,d:5});if(i<4)cloud((i%2?1:-1)*7,-1.6,-5-i*10,1.5);});
      [[-3,-10],[3,-21],[0,-32]].forEach(([x,z],i)=>{
        const n=target(`ring-${i}`,x,z,1.6,`Кольцо ${i+1}`,g=>{
          const ring=group(g,[0,1.6,0]);torus(ring,0xe7c87f,[0,0,0],1.55,.095,Math.PI*2,{roughness:.45,metalness:.35});
          for(let j=0;j<5;j++){const a=Math.PI/2+j*Math.PI*2/5;star(ring,0xffdea0,[Math.cos(a)*1.55,Math.sin(a)*1.55,.015],.21);}
          g.userData.ring=ring;
        });n.marker.visible=false;
      });
      for(let i=0;i<8;i++)cloud((i%2?1:-1)*(8+i%3),-3-i%2,-i*6,2);
    }
    // Restore the character material cache for any future character-only changes.
    currentCache=heroCache;
    camera.position.set(0,6.8,12.5);targetView.set(0,1,-3.8);
    companion.position.set(1.35,0,3.1);
  }
  function contains(collection,id,index){
    if(!collection)return false;if(collection instanceof Set)return collection.has(id)||collection.has(index);
    if(Array.isArray(collection))return collection.includes(id)||collection.includes(index);
    if(typeof collection==='object')return !!collection[id]||!!collection[index];return collection===id;
  }
  function animateCharacter(root,speed,phase,dt){
    const r=root.userData.rig,walk=Math.sin(phase)*Math.min(1,speed);
    r.legs.forEach((leg,i)=>{leg.rotation.x=(i?1:-1)*walk*.58;});
    r.arms.forEach((arm,i)=>{arm.rotation.x=(i?-1:1)*walk*.44;arm.rotation.z=(i?1:-1)*(.055+Math.sin(phase*.55)*.025);});
    r.tail.rotation.y=Math.sin(phase*.55)*(.12+speed*.12);
    r.head.rotation.y=Math.sin(phase*.18)*.045;r.head.rotation.x=Math.sin(phase*.23)*.025;
    if(r.ears)r.ears.forEach((ear,i)=>{ear.rotation.z=(i?1:-1)*-.18+Math.sin(phase*.4+i)*.035;});
  }
  function update(dt,state={}){
    if(disposed)return;dt=Math.max(0,Math.min(.08,Number(dt)||0));time=Number.isFinite(state.time)?state.time:time+dt;
    const px=Number.isFinite(state.x)?state.x:player.position.x,pz=Number.isFinite(state.z)?state.z:player.position.z,py=Number.isFinite(state.y)?state.y:0;
    player.position.set(px,py,pz);player.rotation.y=Number.isFinite(state.yaw)?state.yaw:0;
    const speed=state.moving?1:0,phase=time*(speed?10:2.1);animateCharacter(player,speed,phase,dt);
    const follow=new THREE.Vector3(px+1.35,Math.max(0,py*.9),pz+1.1);companion.position.lerp(follow,1-Math.exp(-dt*4.4));
    const yawDelta=Math.atan2(Math.sin(player.rotation.y-companion.rotation.y),Math.cos(player.rotation.y-companion.rotation.y));companion.rotation.y+=yawDelta*(1-Math.exp(-dt*5));
    animateCharacter(companion,speed,phase+.9,dt);glider.rotation.z=stageIndex===6?Math.sin(time*1.7)*.06:0;
    targetNodes.forEach((n,i)=>{
      n.g.visible=!contains(state.collected,n.item.id,i);const on=contains(state.activated,n.item.id,i);
      n.marker.scale.setScalar(on?1.06:1+Math.sin(time*2+i)*.025);
      if(n.spin){
        n.spin.rotation.y+=(0-n.spin.rotation.y)*(1-Math.exp(-dt*5));
        n.g.userData.runes.forEach((r,j)=>{
          const cols=on?4:3,gap=on?.27:.33;
          r.position.lerp(new THREE.Vector3((j%cols-(cols-1)/2)*gap,.62+Math.floor(j/cols)*(on?.79:.59),.69),1-Math.exp(-dt*5));
        });
      }
      if(n.g.userData.covers){const brushes=Number(state.brushes?.[i]||0);n.g.userData.covers.forEach((cover,j)=>{cover.visible=brushes<=j;});}
      if(n.g.userData.gate)n.g.userData.gate.visible=!on;
      if(n.g.userData.baby)n.g.userData.baby.userData.head.rotation.z=Math.sin(time*1.8+i)*.07;
      if(n.g.userData.light)n.g.userData.light.intensity=on?2.8:.7+Math.sin(time*1.4+i)*.13;
      if(n.g.userData.crystals){const sparks=on?2:Number(state.sparks?.[i]||0);n.g.userData.crystals.forEach((c,j)=>{c.material.emissiveIntensity=j<sparks?1.4:.03;c.material.color.setHex(j<sparks?(j?0xffd17c:0xb8ead6):0x667b74);});}
      if(n.g.userData.ring)n.g.userData.ring.rotation.z=Math.sin(time*.55+i)*.035;
    });
    for(const {node,obstacle:o} of rockNodes){o.x=o.baseX+Math.sin(time*o.speed+o.phase)*o.amplitude;node.position.x=o.x;node.rotation.z=-o.x/.95;node.rotation.x=time*.6;}
    for(const a of ambient){if(a.type==='cloud')a.g.position.x=a.baseX+Math.sin(time*.035+a.phase)*.7;if(a.type==='mote')a.g.position.y=a.y+Math.sin(time*.8+a.phase)*.2;if(a.type==='ripple')a.g.scale.setScalar(1+Math.sin(time*.6+a.phase)*.08);}
    camDesired.set(px*.72,py+6.8,pz+10.5);camera.position.lerp(camDesired,1-Math.exp(-dt*5));
    targetView.lerp(new THREE.Vector3(px*.85,py+1.0,pz-5.8),1-Math.exp(-dt*7));camera.lookAt(targetView);
    sun.position.set(px-9,17,pz+7);sun.target.position.set(px,0,pz-8);
  }
  function resize(){
    if(disposed)return;const width=Math.max(1,canvas.clientWidth||canvas.parentElement?.clientWidth||window.innerWidth),height=Math.max(1,canvas.clientHeight||canvas.parentElement?.clientHeight||window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();
  }
  function render(){if(!disposed)renderer.render(scene,camera);}
  function dispose(){if(disposed)return;disposed=true;clearStage();scene.remove(player,companion,stageRoot);clearCache(heroCache);sun.shadow.dispose();renderer.dispose();targets.length=obstacles.length=platforms.length=0;}
  loadStage(0);resize();camera.lookAt(0,.9,-4);
  return {scene,camera,renderer,player,companion,loadStage,update,resize,render,dispose,targets,obstacles,platforms};
}
