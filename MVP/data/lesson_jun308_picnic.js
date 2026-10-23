/* 308 · Смекалка · Пикник у Великой груши. Original artwork, native ДК/ДТ. */
(function(){
'use strict';
if(!window.ДК)return;
const ID=308,A='img/l308/',actors=['Бруно','Ирис','Тори'],keys=['bruno','iris','tori'];
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const names={cup:'Чашка',cookie:'Печенье',spoon:'Ложка',ball:'Мяч',ear:'Ухо',pot:'Чайник',key:'Ключ',napkin:'Салфетка'};
function icon(k){const p={cup:'<path d="M40 20h6c16 0 13 22-4 22" fill="none" stroke="#8c9f87" stroke-width="5"/><path d="M11 18h33v22q-2 13-16 13T11 40Z" fill="#fff7dd" stroke="#789681" stroke-width="3"/><path d="M16 25h23" stroke="#d2b36c" stroke-width="3"/><ellipse cx="28" cy="18" rx="16" ry="5" fill="#dce9dc" stroke="#789681" stroke-width="2"/><path d="M9 55h40" stroke="#bca773" stroke-width="4" stroke-linecap="round"/>',cookie:'<path d="M53 27a23 23 0 1 1-18-18q-5 13 7 13q0 7 11 5" fill="#dca766" stroke="#9b6842" stroke-width="3"/><g fill="#7e4e36"><circle cx="20" cy="22" r="3"/><circle cx="17" cy="39" r="3"/><circle cx="31" cy="35" r="3"/><circle cx="39" cy="45" r="3"/></g>',spoon:'<ellipse cx="32" cy="17" rx="12" ry="15" fill="#d7e3d9" stroke="#698979" stroke-width="3"/><path d="M30 31h4l2 25q-4 5-8 0z" fill="#b2c6b6" stroke="#698979" stroke-width="2"/>',ball:'<circle cx="32" cy="32" r="25" fill="#e7b15c" stroke="#ad7845" stroke-width="3"/><path d="M15 14Q45 33 18 51M47 14Q16 32 46 51" fill="none" stroke="#ffebaf" stroke-width="7"/>',ear:'<path d="M25 58C7 27 18-5 31 5C49 16 44 42 35 58Z" fill="#fff5df" stroke="#aa8971" stroke-width="3"/><path d="M30 47C19 25 25 11 31 18" fill="none" stroke="#e8b4a2" stroke-width="6" stroke-linecap="round"/>',pot:'<path d="M17 24Q1 17 4 39l14 6M45 29l14-12-3 28-12 4" fill="#fff1d5" stroke="#6e8b79" stroke-width="3"/><ellipse cx="31" cy="39" rx="19" ry="19" fill="#fff7dd" stroke="#6e8b79" stroke-width="3"/><path d="M14 24h35Q35 10 14 24" fill="#a6bfa4" stroke="#6e8b79" stroke-width="3"/><circle cx="32" cy="14" r="4" fill="#b49454"/><path d="M22 39h18" stroke="#c4a568" stroke-width="3"/>',key:'<circle cx="22" cy="19" r="12" fill="none" stroke="#b3934a" stroke-width="7"/><path d="M29 29l23 25m-8-8 6-7m-14-1 6-7" stroke="#b3934a" stroke-width="7"/>',napkin:'<path d="M9 49L45 9l12 45z" fill="#bed2ba" stroke="#678c76" stroke-width="3"/><path d="M20 44l25-27-5 31" fill="none" stroke="#f9f0cd" stroke-width="3"/>'};return `<svg viewBox="0 0 64 64" aria-hidden="true">${p[k]||p.cookie}</svg>`;}
const portrait=(i,pose='idle')=>`<img src="${A}${keys[i]}-${pose}.webp" alt="" draggable="false">`;
const scenes=[
{t:'Приглашение на пикник',who:1,kind:'count',q:'Привет! Я Ирис. Мы готовим пикник у Великой груши. Придут три зайчонка. У каждого два уха. Нажми на пары ушек, затем набери, сколько ушей у всех.',groups:3,each:2,item:'ear',target:6,hint:'Считай парами: два, ещё два, ещё два. Получится шесть.',sol:'Шесть ушей: 2 + 2 + 2 = 6. Мы посчитали уши, а не зайчат!'},
{t:'Один на всех',who:0,kind:'choose',view:'shared',q:'Я Бруно, готовлю чай! Три друга собрались за одним столом. Перед каждым стоит один и тот же общий чайник. Сколько чайников на столе?',opts:['3 чайника','1 чайник','4 чайника'],answer:1,hint:'Гостей трое, но чайник у них один общий. Не считай его заново для каждого.',sol:'Один чайник на всех! Слова «общий» и «один и тот же» помогают не посчитать предмет несколько раз.'},
{t:'Собери чайный набор',who:0,kind:'pack',q:'Для маленького столика нужны ровно две чашки и одна ложка. Выбери их на полке. Лишнее брать не надо. Повторное нажатие отменяет выбор.',items:['cup','spoon','cup','ball','spoon','cup'],need:{cup:2,spoon:1},hint:'Выбери любые две чашки и только одну ложку. Мяч оставь на полке.',sol:'Две чашки и одна ложка — всё по списку. Ты проверил не только количество, но и сами предметы.',bg:'workshop'},
{t:'Обогнать — не значит победить',who:1,kind:'race',order:[2,0,1],from:2,q:'Мы идём к груше: впереди Тори, за ней Бруно, последней я. Я обгоню только Бруно. Нажми «Обогнать». На каком месте я окажусь?',opts:['На первом','На третьем','На втором'],answer:2,hint:'Тори остаётся впереди. Я занимаю место Бруно — второе.',sol:'Ирис стала второй. Чтобы стать первой, пришлось бы обогнать ещё и Тори.'},
{t:'Дорожка без лишних шагов',who:1,kind:'route',rows:3,cols:4,start:0,end:11,blocked:[5,6],limit:5,q:'На дорожке лужи. Проведи меня от флажка к груше за пять шагов. Нажимай соседний камень: вверх, вниз, вправо или влево. Через угол ходить нельзя.',hint:'Иди три раза вправо по верхнему ряду, затем два раза вниз. Это пять шагов.',sol:'Пять шагов! Ты дошёл до цели, обошёл лужи и не сделал лишнего шага.'},
{t:'Большой мешочек, маленький мешочек',who:2,kind:'reveal',amounts:[3,3],opts:['В большом больше','Поровну','В маленьком больше'],answer:1,q:'Я Тори. Принесла два мешочка с печеньем. Большой мешочек выглядит важнее, но где печенья больше? Открой оба мешочка и сравни.',hint:'Размер мешочка не отвечает за количество. В каждом по три печенья.',sol:'Поровну: три и три. Мы проверили содержимое, а не угадали по размеру.',bg:'workshop'},
{t:'Справедливое угощение',who:2,kind:'share',amounts:[5,1],q:'На одной тарелке пять печений, на другой одно. Сделай поровну. Каждая стрелка переносит одно печенье. Потом проверь.',hint:'Всего шесть печений. Перенеси два с левой тарелки на правую: получится три и три.',sol:'Теперь по три печенья! Из пяти и одного сделали три и три, ничего не добавляя.',bg:'workshop'},
{t:'Поднос с секретом',who:0,kind:'trips',total:5,capacity:2,q:'Нужно отнести пять чашек. На подносе помещаются только две. Загружай чашки и нажимай «Отнести». Постарайся сделать как можно меньше ходок.',hint:'Две чашки, ещё две, последняя одна. Нужно три ходки.',sol:'Три ходки: 2 + 2 + 1. Неполный поднос с последней чашкой тоже нужно отнести.',bg:'workshop'},
{t:'Ключ от беседки',who:2,kind:'choose',view:'boxes',boxes:[['Красная','круглая','#c7816a','round'],['Синяя','круглая','#81a8bd','round'],['Зелёная','квадратная','#99b38b','square']],opts:['Красная круглая','Синяя круглая','Зелёная квадратная'],answer:2,q:'Ключ лежит в одной коробочке. Она не красная и не круглая. Найди коробочку, которая подходит сразу к обеим подсказкам.',hint:'Красная не подходит по цвету. Синяя не подходит по форме. Остаётся зелёная квадратная.',sol:'Ключ найден! Зелёная квадратная подходит и по цвету, и по форме.'},
{t:'Пикник начинается!',who:0,kind:'serve',guests:3,plates:2,per:2,q:'Накрываем стол! Каждому из трёх друзей поставь одну чашку. На каждую из двух тарелок положи по два печенья. Нажимай места для чашек. Печенье добавляй и убирай кнопками под тарелками.',hint:'Всего нужны три чашки и четыре печенья. У каждого своя чашка, на каждой тарелке ровно два печенья.',sol:'Все готовы пить чай! Ты замечаешь важные слова, пробуешь решения и проверяешь условия. А теперь — новые задачки в тренажёрах!'}
];
const tasks=[
{t:'Чашки на четырёх подносах',who:0,kind:'count',groups:4,each:2,item:'cup',target:8,q:'На каждом из четырёх подносов по две чашки. Сколько чашек всего? Нажимай подносы, чтобы считать по два.',hint:'Два плюс два плюс два плюс два — восемь.',sol:'Восемь чашек. Четыре подноса — это четыре пары.',series:0,bg:'workshop'},
{t:'Одна общая сестра',who:1,kind:'choose',view:'family',opts:['6 детей','3 ребёнка','4 ребёнка'],answer:2,q:'В семье три брата. У всех троих одна общая сестра. Других детей в семье нет. Сколько всего детей?',hint:'Нарисуй трёх братьев и только одну сестру: она общая для всех.',sol:'Четверо: три брата и одна общая сестра.',series:0},
{t:'Заказ для двоих',who:0,kind:'pack',items:['cookie','cup','spoon','cookie','cup','cookie'],need:{cup:2,cookie:3},q:'В заказе две чашки и три печенья. Выбери нужное. Ложку в этот заказ не включали.',hint:'Возьми обе чашки и все три печенья. Ложку оставь.',sol:'Заказ собран точно: две чашки и три печенья.',series:0,bg:'workshop'},
{t:'А теперь — первая?',who:1,kind:'race',order:[0,1,2],from:1,opts:['На третьем','На первом','На втором'],answer:1,q:'Теперь Ирис идёт второй, сразу за Бруно. Она обгоняет Бруно. Выполни обгон и выбери её новое место.',hint:'Бруно был первым. Ирис занимает его место.',sol:'Ирис стала первой! Мы посмотрели, кого именно она обогнала.',series:0},
{t:'Запасная тропинка',who:1,kind:'route',rows:4,cols:4,start:0,end:15,blocked:[1,5,9],limit:6,q:'Старая тропинка закрыта. Найди путь к груше за шесть шагов, обходя лужи. Иди только на соседний камень.',hint:'Три шага вниз по левому краю, затем три вправо по нижнему ряду.',sol:'Шесть шагов: три вниз и три вправо. Обход тоже может быть коротким.',series:1},
{t:'Размер обманул',who:2,kind:'reveal',amounts:[2,4],opts:['В большом больше','В маленьком больше','Поровну'],answer:1,q:'В каком мешочке больше печенья на этот раз? Открой оба, посчитай и сравни.',hint:'В большом два, в маленьком четыре. Четыре больше двух.',sol:'В маленьком больше! Количество узнали, когда открыли мешочки.',series:1,bg:'workshop'},
{t:'Раздели восемь',who:2,kind:'share',amounts:[6,2],q:'Теперь на тарелках шесть и два печенья. Перекладывай по одному, чтобы стало поровну.',hint:'Всего восемь. На каждой тарелке должно быть четыре. Перенеси два слева направо.',sol:'Получилось четыре и четыре. Всего осталось восемь.',series:1,bg:'workshop'},
{t:'Поднос побольше',who:0,kind:'trips',total:7,capacity:3,q:'Отнеси семь чашек на новом подносе. Он вмещает три чашки. Найди самое маленькое число ходок.',hint:'Три чашки, ещё три и последняя одна. Снова три ходки.',sol:'Три ходки: 3 + 3 + 1. Двух ходок хватило бы только на шесть чашек.',series:1,bg:'workshop'},
{t:'Где лежат салфетки?',who:2,kind:'choose',view:'boxes',boxes:[['Жёлтая','круглая','#dab66b','round'],['Синяя','круглая','#81a8bd','round'],['Зелёная','квадратная','#99b38b','square']],opts:['Жёлтая круглая','Синяя круглая','Зелёная квадратная'],answer:1,q:'Салфетки в коробке, которая не жёлтая и не квадратная. Открой нужную.',hint:'Жёлтую исключаем по цвету. Зелёную — по квадратной форме. Нужна синяя круглая.',sol:'Синяя круглая! Обе подсказки выполнены.',series:2,prize:'napkin'},
{t:'Секрет под салфеткой',who:0,kind:'missing',total:5,visible:2,target:3,q:'Всего на столе пять печений. Два видно, остальные под салфеткой. Сколько спрятано? Набери ответ — и мы поднимем салфетку.',hint:'Два уже видно. До пяти не хватает трёх: два плюс три равно пять.',sol:'Под салфеткой три печенья. Два видимых и три спрятанных дают пять.',series:2,bg:'workshop'},
{t:'Проверь слова Бруно',who:2,kind:'choose',view:'claim',opts:['Да, поровну','Нет, справа больше','Нет, слева больше'],answer:2,q:'Бруно сказал: «На тарелках поровну». Посмотри: слева четыре печенья, справа два. Он прав?',hint:'Сравни количества: четыре больше двух. Значит, слева больше.',sol:'Слева больше: четыре, а справа два. Даже уверенные слова стоит проверять!',series:2},
{t:'Угощение для всех',who:1,kind:'serve',guests:3,plates:2,per:3,q:'Последний заказ! По одной чашке каждому из трёх друзей. На двух тарелках — по три печенья. Собери всё и проверь.',hint:'Три чашки и шесть печений. На каждой тарелке должно быть ровно три.',sol:'Пикник удался! Ты проверил и чашки, и обе тарелки. Вот что значит решать со смекалкой!',series:2}
];
const series=['Внимательные сборщики','Маленькие изобретатели','Хранители пикника'];
function initial(c){return {ok:false,fb:'',n:0,marked:[],picked:null,selected:[],moved:false,path:[c.start||0],opened:[false,false],bowls:c.amounts?.slice()||[],tray:0,delivered:0,trips:0,cups:Array(c.guests||3).fill(0),plates:Array(c.plates||2).fill(0)};}
const int=(v,max)=>Number.isInteger(v)&&v>=0&&v<max;
function apply(c,s,a,v){
 if(s.ok)return false;
 if(a==='hint'){s.fb=c.hint;return true;}
 if(a==='reset'){Object.assign(s,initial(c));s.fb='Начнём заново. Можно попробовать другой способ.';return true;}
 if(a==='mark'&&c.kind==='count'&&int(v,c.groups)){if(!s.marked.includes(v))s.marked.push(v);s.fb=`Посчитано групп: ${s.marked.length}. В каждой по ${c.each}.`;return true;}
 if(a==='number'&&['count','missing'].includes(c.kind)&&[-1,1].includes(v)){s.n=Math.max(0,Math.min(20,s.n+v));s.fb='Набери ответ и нажми «Проверить». ';return true;}
 if(a==='toggle'&&c.kind==='pack'&&int(v,c.items.length)){s.selected.includes(v)?s.selected=s.selected.filter(x=>x!==v):s.selected.push(v);s.fb=`Выбрано предметов: ${s.selected.length}. Сверься со списком.`;return true;}
 if(a==='overtake'&&c.kind==='race'&&!s.moved){s.moved=true;s.fb='Обгон выполнен. Посмотри на новый порядок и выбери место Ирис.';return true;}
 if(a==='choose'&&['choose','race','reveal'].includes(c.kind)&&int(v,c.opts.length)){
  if(c.kind==='race'&&!s.moved){s.fb='Сначала нажми «Обогнать» и посмотри, как изменится порядок.';return true;}
  if(c.kind==='reveal'&&!s.opened.every(Boolean)){s.fb='Открой оба мешочка — так можно проверить ответ.';return true;}
  s.picked=v;s.ok=v===c.answer;
  s.fb=s.ok?c.sol:c.view==='boxes'?`Коробочка «${c.opts[v]}» не подходит. ${c.hint}`:c.kind==='race'?`Ты выбрал «${c.opts[v]}». Посмотри, кто остался впереди. ${c.hint}`:c.hint;return true;
 }
 if(a==='open'&&c.kind==='reveal'&&int(v,2)){s.opened[v]=true;s.fb=s.opened.every(Boolean)?'Оба мешочка открыты. Теперь можно сравнить.':'Один мешочек открыт. Посмотри и во второй.';return true;}
 if(a==='move'&&c.kind==='route'&&int(v,c.rows*c.cols)){
  const last=s.path.at(-1),d=Math.abs(v%c.cols-last%c.cols)+Math.abs(Math.floor(v/c.cols)-Math.floor(last/c.cols));
  if(c.blocked.includes(v)){s.fb='Здесь лужа. Выбери сухой камень.';return true;}
  if(d!==1){s.fb='Только соседний камень. Через угол и через клетку прыгать нельзя.';return true;}
  if(s.path.length>30){s.fb='Дорожка получилась длинной. Нажми «Сначала» и попробуй короче.';return true;}
  s.path.push(v);s.fb=v===c.end?'Мы у груши! Проверь количество шагов.':`Сделано шагов: ${s.path.length-1}.`;return true;
 }
 if(a==='undo'&&c.kind==='route'&&s.path.length>1){s.path.pop();s.fb='Один шаг отменён.';return true;}
 if(a==='transfer'&&c.kind==='share'&&int(v,2)){
  if(!s.bowls[v]){s.fb='На этой тарелке уже пусто.';return true;}
  s.bowls[v]--;s.bowls[1-v]++;s.fb='Одно печенье переехало. Посмотри, стало ли поровну.';return true;
 }
 if(a==='load'&&c.kind==='trips'&&[-1,1].includes(v)){s.tray=Math.max(0,Math.min(c.capacity,c.total-s.delivered,s.tray+v));s.fb=`На подносе: ${s.tray}. Вместимость: ${c.capacity}.`;return true;}
 if(a==='deliver'&&c.kind==='trips'){
  if(!s.tray){s.fb='Пустой поднос не несём. Сначала поставь чашки.';return true;}
  s.delivered+=s.tray;s.trips++;s.tray=0;s.fb=s.delivered===c.total?'Все чашки на месте. Проверь, сколько было ходок.':`Доставлено ${s.delivered} из ${c.total}. Загрузи следующую порцию.`;return true;
 }
 if(a==='cup'&&c.kind==='serve'&&int(v,c.guests)){s.cups[v]=1-s.cups[v];s.fb='Чашку можно поставить или убрать повторным нажатием.';return true;}
 if(['plate','unplate'].includes(a)&&c.kind==='serve'&&int(v,c.plates)){s.plates[v]=Math.max(0,Math.min(c.per+2,s.plates[v]+(a==='plate'?1:-1)));s.fb=`На тарелке ${v+1}: ${s.plates[v]}. Нужно ${c.per}.`;return true;}
 if(a==='check'){
  if(['count','missing'].includes(c.kind)){s.ok=s.n===c.target;s.fb=s.ok?c.sol:`Сейчас ${s.n}. ${s.n<c.target?'Нужно больше.':'Получилось больше, чем нужно.'} ${c.hint}`;}
  else if(c.kind==='pack'){const counts={};s.selected.forEach(i=>counts[c.items[i]]=(counts[c.items[i]]||0)+1);s.ok=Object.keys({...counts,...c.need}).every(k=>(counts[k]||0)===(c.need[k]||0));s.fb=s.ok?c.sol:'Список пока не совпадает. '+Object.keys({...counts,...c.need}).filter(k=>(counts[k]||0)!==(c.need[k]||0)).map(k=>`${names[k]}: выбрано ${counts[k]||0}, нужно ${c.need[k]||0}.`).join(' ');}
  else if(c.kind==='route'){s.ok=s.path.at(-1)===c.end&&s.path.length-1===c.limit;s.fb=s.ok?c.sol:s.path.at(-1)!==c.end?'Сначала дойди до груши.':`Ты сделал ${s.path.length-1} шагов. Можно за ${c.limit}. Отмени лишние шаги или начни сначала.`;}
  else if(c.kind==='share'){s.ok=s.bowls[0]===s.bowls[1];s.fb=s.ok?c.sol:`Слева ${s.bowls[0]}, справа ${s.bowls[1]}. Переноси с той тарелки, где больше.`;}
  else if(c.kind==='trips'){const min=Math.ceil(c.total/c.capacity);s.ok=s.delivered===c.total&&s.trips===min;s.fb=s.ok?c.sol:s.delivered<c.total?`Осталось доставить ${c.total-s.delivered} чашек.`:`Все доставлены за ${s.trips} ходок. Можно за ${min}. Начни сначала и заполняй поднос.`;}
  else if(c.kind==='serve'){s.ok=s.cups.every(n=>n===1)&&s.plates.every(n=>n===c.per);s.fb=s.ok?c.sol:!s.cups.every(n=>n===1)?'Не у каждого друга есть чашка. Проверь все три места.':`Проверь каждую тарелку: нужно по ${c.per} печенья.`;}
  else return false;
  return true;
 }
 return false;
}
const items=(k,n)=>Array.from({length:n},()=>icon(k)).join('');
function btn(scope,i,label,a,v,disabled=false,cls='',pressed){return `<button type="button" class="pic-button ${cls}" ${disabled?'disabled':''} ${pressed===undefined?'':`aria-pressed="${pressed}"`} onclick="${esc(`PIC308.act('${scope}',${i},'${a}',${JSON.stringify(v)})`)}">${label}</button>`;}
function cast(c,s){return `<div class="pic-cast ${s.ok?'celebrate':''}">${(c.kind==='serve'||c.view==='shared'?[0,1,2]:[c.who]).map(p=>`<div>${portrait(p,s.ok?(c.view==='boxes'&&!c.prize?'action':'happy'):(c.kind==='route'||c.kind==='pack')?'action':'idle')}<span>${actors[p]}</span></div>`).join('')}</div>`;}
function nextAction(c){
 const cues={count:'Посчитай группы. Затем набери общее количество.',missing:'Посмотри, сколько видно. Набери, сколько спрятано.',pack:'Собери только предметы из списка.',race:'Сначала выполни обгон, затем выбери новое место Ирис.',route:'Начни от флажка. Нажимай соседние сухие камни.',reveal:'Открой оба мешочка, затем сравни печенье.',share:'Переложи печенье с полной тарелки на другую.',trips:'Поставь чашки на поднос, затем отнеси их.',serve:'Поставь чашки друзьям и наполни обе тарелки.'};
 return cues[c.kind]||(c.view==='boxes'?'Проверь цвет и форму каждой коробочки.':'Рассмотри предметы и выбери ответ.');
}
function renderGame(c,s,scope,i){
 const b=(text,a,v,cls='',disabled=s.ok,pressed)=>btn(scope,i,text,a,v,disabled,cls,pressed);
 const check=()=>`<div class="pic-controls">${b('Проверить','check',null,'primary')}${b('Сначала','reset',null,'secondary')}</div>`;
 const counter=(action,value,label,max)=>`<div class="pic-counter" role="group" aria-label="${label}">${b('−',action,-1,'stepper',s.ok||value===0)}<output aria-live="polite"><b>${value}</b><small>${label}</small></output>${b('+',action,1,'stepper',s.ok||value>=max)}</div>`;
 let work='';
 if(c.kind==='count')work=`<div class="pic-group-grid">${Array.from({length:c.groups},(_,j)=>b(`<span class="pic-icon-pair">${items(c.item,c.each)}</span><span>${s.marked.includes(j)?'✓ '+c.each:'Посчитать'}</span>`,'mark',j,'group-card',s.ok||s.marked.includes(j))).join('')}</div><div class="pic-equation">${Array.from({length:c.groups},(_,j)=>s.marked.includes(j)?c.each:'?').join(' + ')}</div>${counter('number',s.n,'всего',20)}${check()}`;
 if(c.kind==='missing')work=`<div class="pic-total">Всего печений: ${c.total}</div><div class="pic-two"><div class="pic-dish"><div>${items('cookie',c.visible)}</div><span>Видно: ${c.visible}</span></div><div class="pic-dish covered"><div>${s.ok?items('cookie',c.target):icon('napkin')}</div><span>${s.ok?'Нашли: '+c.target:'Под салфеткой'}</span></div></div>${counter('number',s.n,'спрятано',20)}${check()}`;
 if(c.kind==='choose'){
  if(c.view==='shared')work=`<div class="pic-shared"><div class="pic-single-pot">${icon('pot')}</div><span>Один общий стол</span></div>`;
  if(c.view==='family')work=`<div class="pic-family">${['Брат 1','Брат 2','Брат 3','Сестра'].map((t,j)=>`<div><img src="${A}child-${j}.webp" alt=""><span>${t}</span></div>`).join('')}</div>`;
  if(c.view==='claim')work=`<div class="pic-two"><div class="pic-dish"><div>${items('cookie',4)}</div><span>Левая тарелка</span></div><div class="pic-dish"><div>${items('cookie',2)}</div><span>Правая тарелка</span></div></div>`;
  if(c.view==='boxes')work+=`<div class="pic-boxes">${c.boxes.map((x,j)=>b(`<span class="pic-box ${x[3]}" style="--box:${x[2]}">${s.ok&&j===c.answer?icon(c.prize||'key'):'?'}</span><span class="box-name">${x[0]}<br>${x[1]}</span>`,'choose',j,'box-button '+(s.picked===j?'chosen':''))).join('')}</div>`;
  else work+=`<div class="pic-options">${c.opts.map((x,j)=>b(esc(x),'choose',j,s.picked===j?'chosen':'')).join('')}</div>`;
 }
 if(c.kind==='pack')work=`<div class="pic-list">В набор: ${Object.entries(c.need).map(([k,n])=>`<span>${icon(k)} × ${n}</span>`).join('')}</div><div class="pic-shelf">${c.items.map((k,j)=>b(icon(k)+`<span>${names[k]}<small>№ ${c.items.slice(0,j+1).filter(x=>x===k).length}</small></span>`,'toggle',j,'shelf-item',s.ok,s.selected.includes(j))).join('')}</div>${check()}`;
 if(c.kind==='race'){
  const order=c.order.slice();if(s.moved)[order[c.from-1],order[c.from]]=[order[c.from],order[c.from-1]];
  work=`<div class="pic-race"><div class="pic-finish">Впереди →</div>${order.map((p,j)=>`<div class="pic-runner ${s.moved&&p===1?'overtaken':''}" style="--place:${j}">${portrait(p,s.ok?'happy':'idle')}<span>${j+1}. ${actors[p]}</span></div>`).join('')}</div>${b(s.moved?'Обгон выполнен':'Обогнать','overtake',null,'primary',s.ok||s.moved)}<div class="pic-options">${c.opts.map((x,j)=>b(x,'choose',j,s.picked===j?'chosen':'',s.ok||!s.moved)).join('')}</div>`;
 }
 if(c.kind==='route')work=`<div class="pic-map-label"><span>Шаги: ${s.path.length-1} / ${c.limit}</span><span>⚑ → Груша</span></div><div class="pic-map" style="--cols:${c.cols}">${Array.from({length:c.rows*c.cols},(_,j)=>b(`<span>${j===s.path.at(-1)?portrait(1):j===c.start?'⚑':j===c.end?'🌳':c.blocked.includes(j)?'≈':s.path.includes(j)?'•':''}</span><span class="pic-sr">Камень ${Math.floor(j/c.cols)+1}, ${j%c.cols+1}${c.blocked.includes(j)?', лужа':''}</span>`,'move',j,'map-cell '+(c.blocked.includes(j)?'water':s.path.includes(j)?'trail':''))).join('')}</div><p class="pic-note">Нажимай соседние камни. Без прыжков через угол.</p><div class="pic-controls">${b('Шаг назад','undo',null,'secondary',s.ok||s.path.length===1)}${b('Сначала','reset',null,'secondary')}</div>${b('Проверить путь','check',null,'primary')}`;
 if(c.kind==='reveal')work=`<div class="pic-two pic-bags">${c.amounts.map((n,j)=>b(`<div class="pic-bag ${j?'small':'large'} ${s.opened[j]?'opened':''}">${s.opened[j]?`<div class="pic-loose">${items('cookie',n)}</div>`:'<span>?</span>'}</div><span>${j?'Маленький':'Большой'}</span><small>${s.opened[j]?'Открыт':'Открыть'}</small>`,'open',j,'bag-button',s.ok||s.opened[j])).join('')}</div><div class="pic-options">${c.opts.map((x,j)=>b(x,'choose',j,s.picked===j?'chosen':'',s.ok||!s.opened.every(Boolean))).join('')}</div>`;
 if(c.kind==='share')work=`<div class="pic-total">Всего: ${s.bowls[0]+s.bowls[1]} печений</div><div class="pic-two">${s.bowls.map((n,j)=>`<div class="pic-dish"><div>${items('cookie',n)}</div><span>${j?'Справа':'Слева'}: ${n}</span></div>`).join('')}</div><div class="pic-controls">${b('← Перенести','transfer',1,'',s.ok||!s.bowls[1])}${b('Перенести →','transfer',0,'',s.ok||!s.bowls[0])}</div>${check()}`;
 if(c.kind==='trips')work=`<div class="pic-stats"><span>Нужно: <b>${c.total}</b></span><span>Доставлено: <b>${s.delivered}</b></span><span>Ходок: <b>${s.trips}</b></span></div><div class="pic-tray" aria-label="Чашки на подносе"><div>${items('cup',s.tray)||'<span>Поднос пуст</span>'}</div></div>${counter('load',s.tray,'на подносе',Math.min(c.capacity,c.total-s.delivered))}${b('Отнести','deliver',null,'primary',s.ok||!s.tray)}<div class="pic-arrived">На столе: <span>${items('cup',s.delivered)||'пока пусто'}</span></div>${check()}`;
 if(c.kind==='serve')work=`<div class="pic-tablecloth"><div class="pic-guests">${Array.from({length:c.guests},(_,j)=>b(`<strong>${actors[j]}</strong><span class="pic-place-setting">${s.cups[j]?icon('cup'):'+'}</span><span>${s.cups[j]?'Убрать чашку':'Поставить чашку'}</span>`,'cup',j,'guest-place')).join('')}</div><div class="pic-two">${s.plates.map((n,j)=>`<div class="plate-panel"><strong>Тарелка ${j+1}</strong><div class="pic-dish"><div>${items('cookie',n)||'Пусто'}</div></div><span>${n} из ${c.per}</span><div class="plate-controls">${b(`<span aria-hidden="true">−</span><span class="pic-sr">Убрать печенье с тарелки ${j+1}</span>`,'unplate',j,'plate-step',s.ok||!n)}${b(`<span aria-hidden="true">+</span><span class="pic-sr">Добавить печенье на тарелку ${j+1}</span>`,'plate',j,'plate-step',s.ok||n>=c.per+2)}</div></div>`).join('')}</div></div><p class="pic-note">Чашку можно поставить и убрать. Печенье: «+» добавить, «−» убрать.</p>${check()}`;
 return `<div class="pic-game" data-game="${c.kind}"><div class="pic-world" style="--world:url('${A}${c.bg||'garden'}.webp')">${cast(c,s)}<div class="pic-work">${work}</div></div><p class="pic-feedback ${s.ok?'success':s.fb===c.hint?'hint':''}" role="status" aria-live="polite">${esc(s.fb||nextAction(c))}</p>${s.ok?'':b('Нужна подсказка','hint',null,'pic-help',false)}</div>`;
}
const answer=t=>['choose','race','reveal'].includes(t.kind)?t.answer:1;
tasks.forEach(t=>{t.opts||=['Ещё думаю','Готово','Нужна помощь'];t.answer=answer(t);});
const frames=scenes.map((c,i)=>({кто:keys[c.who],t:c.t,say:c.q,hint:c.hint,success:c.sol,начало:s=>Object.assign(s,initial(c)),готов:s=>s.ok===true,рисуй:s=>`<div class="pic-chapter"><span>Пикник у Великой груши</span><span>${i+1} / ${scenes.length}</span></div><h3 class="pic-heading">${c.t}</h3>`+renderGame(c,s,'story',i),делать:'',подсказка:()=>c.hint,клики:{action(s,a,v){apply(c,s,a,v);}}}));
function practiceState(i){const rec=lrec();rec.picnic||={version:1,frames:{}};rec.picnic.practice||={};return rec.picnic.practice[i]||=initial(tasks[i]);}
function act(scope,i,a,v){
 if(typeof LV==='undefined'||LV.id!==ID||!Number.isInteger(i))return;
 window.PIC308_AUDIO?.stop();
 if(scope==='story'){if(LV.phase!=='explain'||LV.step!==i||!scenes[i])return;ДК.клик(ID,'action',a,v);if(a==='hint')window.PIC308_AUDIO?.playKey('frame-'+i+'-hint');return;}
 if(scope!=='practice'||LV.phase!=='tasks'||LV.task!==i||!tasks[i]||lrec().tasks.includes(i))return;
 const s=practiceState(i);if(!apply(tasks[i],s,a,v))return;save();if(s.ok)lvPick(tasks[i].answer);else{if(a==='hint'&&typeof lvHint==='function'&&!LV.hints)lvHint(0);else renderLessonView();if(a==='hint')window.PIC308_AUDIO?.playKey('task-'+i+'-hint');}
}
function restoreSolved(t,s){s.ok=true;s.fb=t.sol;s.n=t.target||0;if(t.kind==='count')s.marked=Array.from({length:t.groups},(_,i)=>i);s.picked=t.answer??null;s.moved=true;s.opened=[true,true];if(t.kind==='share')s.bowls=[t.amounts.reduce((a,b)=>a+b)/2,t.amounts.reduce((a,b)=>a+b)/2];if(t.kind==='serve'){s.cups.fill(1);s.plates.fill(t.per);}if(t.kind==='trips'){s.delivered=t.total;s.trips=Math.ceil(t.total/t.capacity);s.tray=0;}if(t.kind==='pack'){const left={...t.need};s.selected=[];t.items.forEach((x,j)=>{if(left[x]>0){s.selected.push(j);left[x]--;}});}if(t.kind==='route'){const queue=[[t.start]],seen=new Set([t.start]);while(queue.length){const p=queue.shift(),v=p.at(-1);if(v===t.end){s.path=p;break;}for(let n=0;n<t.rows*t.cols;n++){if(!seen.has(n)&&!t.blocked.includes(n)&&Math.abs(v%t.cols-n%t.cols)+Math.abs(Math.floor(v/t.cols)-Math.floor(n/t.cols))===1){seen.add(n);queue.push([...p,n]);}}}}}
const practice=(t,i)=>{const s=practiceState(i);if(lrec().tasks.includes(i)&&!s.ok)restoreSolved(t,s);return `<div class="pic-practice"><div class="pic-chapter"><span>${series[t.series]}</span><span>${i%4+1} / 4</span></div><h3 class="pic-heading">${t.t}</h3>${renderGame(t,s,'practice',i)}</div>`;};
window.PIC308={scenes,frames,tasks,initial,apply,act,restoreSolved,renderGame,restart(){if(LV.id!==ID)return;CHS[lidKey(ID)]={п:{}};LV.phase='explain';LV.step=0;renderLessonView();}};
ДК.подключить({ID,ИМГ:A,размеры:{},герои:Object.fromEntries(keys.map((k,i)=>[k,{имя:actors[i],ф:k+'-idle',позы:{action:k+'-action',happy:k+'-happy'}}])),фоны:['garden'],кадры:frames,
 запись:{title:'Смекалка · Пикник у Великой груши',ico:'🫖',subj:'jun',src:'Начальная школа · 1 класс · Олимп-1: смекалка',check:{q:'Ирис обогнала только того, кто шёл вторым. Какое место она заняла?',choices:['Первое','Второе','Третье'],ans:1,exp:'Она заняла место второго. Первый остался впереди.'},tasks:tasks.map(t=>({q:t.q,kind:'choice',choices:t.opts,ans:t.answer,tol:0,hints:[t.hint],sol:t.sol,trap:t.hint}))},
 тренажёр:{герой:'iris',проверка:{картинка:()=>`<div class="pic-quiz-art">${portrait(1,'action')}</div>`,итог:'Сначала пойми условие, потом попробуй действие и проверь результат.'},задачи:tasks.map((t,i)=>({кто:keys[t.who],картинка:()=>practice(t,i),разборы:Object.fromEntries(t.opts.map(v=>[v,t.hint])),итог:t.sol})),финал:()=>`<div class="pic-finale"><div class="pic-world" style="--world:url('${A}garden.webp')">${cast({kind:'serve'},{ok:true})}<div class="pic-feast">${icon('pot')}${items('cup',3)}${items('cookie',4)}</div></div><h3>Пикник со смекалкой!</h3><button type="button" class="слушать" aria-label="Послушать итог">🔊</button><p>12 новых задач решены. Награды сохранены.</p><div class="pic-summary"><span>✓ Замечаешь важные слова</span><span>✓ Пробуешь разные способы</span><span>✓ Проверяешь все условия</span></div></div>`}
});
let restored=false,lastSaved='';const renderer=WAVE_B[ID];
WAVE_B[ID]=function(el){const k=lidKey(ID);CHS[k]||={};if(!restored){const old=DB.lessons?.[ID]?.picnic;if(old?.version===1&&old.frames)CHS[k].п=JSON.parse(JSON.stringify(old.frames));restored=true;}renderer(el);if(LV.phase==='explain'&&LV.step===0&&CHS[k].п?.[0]?.ok)el.querySelector('.дк308')?.insertAdjacentHTML('beforeend','<button class="pic-button" onclick="PIC308.restart()">Повторить историю</button>');sync();};
function sync(){if(LV.id!==ID)return;const p=CHS[lidKey(ID)]?.п||{};const can=LV.phase!=='explain'||p[LV.step]?.ok;document.querySelectorAll('#screen button[onclick="lvStep(1)"],#screen button[onclick="lvToCheck()"]').forEach(b=>{b.disabled=!can;});const s=JSON.stringify(p);if(s!==lastSaved){DB.lessons||={};DB.lessons[ID]||={tasks:[],stars:0,done:false};DB.lessons[ID].picnic={...DB.lessons[ID].picnic,version:1,frames:JSON.parse(s)};lastSaved=s;save();}}
window.addEventListener('load',()=>{for(const name of ['lvStep','lvToCheck']){const old=window[name];window[name]=function(...args){if(LV.id===ID&&LV.phase==='explain'&&(name==='lvToCheck'||args[0]>0)&&!CHS[lidKey(ID)]?.п?.[LV.step]?.ok)return;return old.apply(this,args);};}});
const css=document.createElement('style');css.textContent=`
@font-face{font-family:PicHand308;src:url('fonts/Pangolin-ru.woff2') format('woff2');font-display:swap}
@font-face{font-family:PicTitle308;src:url('img/l307/Lobster-Regular.ttf') format('truetype');font-display:swap}
body:has(.дк308) #asst,#screen:has(.дк308)>.card>.arch{display:none}
#screen:has(.дк308)>.card{padding:6px;background:transparent;border:0}
#screen:has(.дк308)>h2{max-width:650px;margin:12px auto;color:#f8e9ba;font:400 25px/1.3 PicTitle308,cursive}
#lvis .дк.дк308{width:100%;max-width:650px;min-width:0;margin:auto;gap:14px;--чернила:#3b4c3f;--контур:#9b8658;font:400 18px/1.5 PicHand308,sans-serif}
#lvis .дк.дк308 *{box-sizing:border-box}#lvis .дк.дк308 p{margin:0}
#lvis .дк.дк308 .реплика{display:grid;grid-template-columns:minmax(0,1fr) 44px;gap:9px;background:none;border:0;border-bottom:1px solid #9b865866;border-image:none;padding:8px 2px 16px;min-height:0;filter:none}
#lvis .дк.дк308 .реплика .аватар{grid-column:1;grid-row:1;display:flex;align-items:center;flex-direction:row;gap:8px;width:auto;justify-content:start}
#lvis .дк.дк308 .реплика .аватар img{height:44px;width:35px;object-fit:contain}#lvis .дк.дк308 .реплика .аватар span{font:400 18px/1.4 PicHand308,sans-serif;color:#d3c490}
#lvis .дк.дк308 .реплика p{grid-column:1/-1;grid-row:2;font:400 19px/1.5 PicHand308,sans-serif;color:#e8e0cc}
#lvis .дк.дк308 .слушать{grid-column:2;grid-row:1;width:44px;height:44px;min-height:44px;padding:0;border:2px solid #b9a363;border-radius:50%;background:linear-gradient(#79977b,#466b56);color:#fff7d7;font-size:20px;box-shadow:0 2px 0 #294c3b}
#lvis .дк.дк308 .pic-chapter{display:flex;justify-content:space-between;gap:12px;color:#d6dfb4;font:400 15px/1.4 PicHand308,sans-serif;letter-spacing:0}
#lvis .дк.дк308 .pic-heading{font:400 27px/1.25 PicTitle308,cursive;color:#fae9ba;text-align:center;margin:0}
#lvis .дк.дк308 .pic-game,#lvis .дк.дк308 .pic-practice{display:grid;gap:12px;min-width:0}
#lvis .дк.дк308 .pic-world{border:0;border-radius:0;padding:0;background:none;overflow:visible;box-shadow:none}
#lvis .дк.дк308 .pic-cast{height:clamp(180px,35vw,260px);display:flex;justify-content:center;gap:16px;align-items:end;margin-bottom:9px;padding:25px 12px 9px;background-image:var(--world);background-size:cover;background-position:center bottom;border-radius:12px;box-shadow:inset 0 -12px 15px #95764c33}
#lvis .дк.дк308 .pic-cast>div{position:relative;height:100%;display:flex;align-items:center;justify-content:end;flex-direction:column;min-width:50px}
#lvis .дк.дк308 .pic-cast>div:before{content:'';position:absolute;bottom:18px;width:65px;height:10px;background:#352c2366;border-radius:50%;filter:blur(3px)}
#lvis .дк.дк308 .pic-cast img{height:calc(100% - 20px);max-width:100%;object-fit:contain;z-index:1}#lvis .дк.дк308 .pic-cast span{font-size:14px;line-height:19px;background:#fff3d2;color:#435a42;border-radius:10px;padding:0 9px;z-index:2}
#lvis .дк.дк308 .pic-work{padding:14px 0 0;background:none;border:0;border-radius:0;display:grid;gap:14px;color:#e8e0cc;min-width:0}
#lvis .дк.дк308 svg{width:45px;height:45px;flex-shrink:0}
#lvis .дк.дк308 button.pic-button,#lvis .дк.дк308 .число,#lvis .дк.дк308 .дальше-кн,#lvis .дк.дк308 .дт-подск,#screen:has(.дк308)>.btnrow>button,#screen:has(.дк308)>button{appearance:none;display:inline-flex;align-items:center;justify-content:center;gap:5px;text-align:center;white-space:normal;min-height:54px;min-width:0;max-width:100%;padding:5px 7px;border:12px solid transparent;border-image:url('img/l308/button.webp') 25% 12% fill / 12px stretch;background:none;box-shadow:none;color:#3e5d48;font:400 18px/1.3 PicHand308,sans-serif;cursor:pointer;touch-action:manipulation;filter:drop-shadow(0 2px 2px #213b302b);transition:transform .12s}
#lvis .дк.дк308 button.chosen:disabled{outline:3px solid #609472;outline-offset:2px;opacity:1}#lvis .дк.дк308 button:focus-visible,#screen:has(.дк308) button:focus-visible{outline:3px solid #2e867b;outline-offset:3px}
#lvis .дк.дк308 button:not(:disabled):active{transform:translateY(2px)}#lvis .дк.дк308 button:disabled{opacity:.65;cursor:default}
#lvis .дк.дк308 button.shelf-item[aria-pressed=true]{outline:3px solid #4d9872;outline-offset:1px;background:#ddeddc}#lvis .дк.дк308 button.shelf-item[aria-pressed=true]:after{content:'✓';position:absolute;right:3px;top:0;color:#285b3f;font-size:20px}
#lvis .дк.дк308 .pic-controls{display:flex;gap:8px;flex-wrap:wrap;justify-content:center}#lvis .дк.дк308 .pic-controls>button{flex:1;min-width:90px}#lvis .дк.дк308 .pic-options{display:grid;gap:8px}
#lvis .дк.дк308 button.primary{font-size:19px;min-width:130px}#lvis .дк.дк308 button.secondary{font-size:16px}
#lvis .дк.дк308 .pic-group-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#lvis .дк.дк308 button.group-card{display:flex;flex-direction:column;gap:6px;min-height:105px}
#lvis .дк.дк308 .pic-icon-pair{display:flex;justify-content:center;gap:0}#lvis .дк.дк308 .pic-icon-pair svg{width:42px;height:48px}#lvis .дк.дк308 .pic-equation{font:400 26px/1.4 PicHand308,sans-serif;text-align:center;color:#e5c580}
#lvis .дк.дк308 .pic-counter{display:flex;justify-content:center;align-items:center;gap:12px}#lvis .дк.дк308 button.stepper{width:54px;height:54px;padding:0;font-size:28px}
#lvis .дк.дк308 output{display:flex;flex-direction:column;min-width:70px;text-align:center}#lvis .дк.дк308 output b{font:32px/1.1 PicHand308}#lvis .дк.дк308 output small{font-size:14px}
#lvis .дк.дк308 .pic-shared{background:repeating-linear-gradient(0deg,#cbb37d,#ead3a0 14px,#cbb37d 16px);border:4px solid #a78352;border-radius:50%;padding:14px;text-align:center;max-width:240px;width:100%;margin:auto;color:#4d5036;box-shadow:0 7px 0 #816345}
#lvis .дк.дк308 .pic-single-pot svg{width:90px;height:90px}#lvis .дк.дк308 .pic-family{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}#lvis .дк.дк308 .pic-family>div{display:flex;flex-direction:column;text-align:center;font-size:13px}#lvis .дк.дк308 .pic-family img{width:100%;height:100px;object-fit:contain}
#lvis .дк.дк308 .pic-list{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;font-size:18px}#lvis .дк.дк308 .pic-list span{display:inline-flex;align-items:center}#lvis .дк.дк308 .pic-list svg{width:30px;height:32px}
#lvis .дк.дк308 .pic-shelf{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}#lvis .дк.дк308 button.shelf-item{flex-direction:column;font-size:15px;padding:5px 0;min-height:105px;position:relative}#lvis .дк.дк308 .shelf-item svg{width:46px;height:46px}
#lvis .дк.дк308 .pic-race{display:flex;flex-direction:row-reverse;gap:8px;padding-top:24px;position:relative;background:linear-gradient(transparent 80%,#ccbea0 80%);border-radius:12px}
#lvis .дк.дк308 .pic-finish{position:absolute;right:5px;top:0;font-size:15px}#lvis .дк.дк308 .pic-runner{flex:1;display:flex;align-items:center;flex-direction:column;min-width:0}#lvis .дк.дк308 .pic-runner img{width:100%;height:108px;object-fit:contain}#lvis .дк.дк308 .pic-runner span{font-size:16px;background:#f9edce;border-radius:7px;padding:3px}
#lvis .дк.дк308 .overtaken{animation:pic-place .45s ease-out both}
#lvis .дк.дк308 .pic-map-label{display:flex;justify-content:space-between;font-size:17px;gap:8px}#lvis .дк.дк308 .pic-map{display:grid;grid-template-columns:repeat(var(--cols),minmax(0,1fr));gap:4px;padding:6px;background:#b7c79c;border:2px solid #82977a;border-radius:16px}
#lvis .дк.дк308 button.map-cell{min-height:52px;height:60px;border:2px solid #bda779;border-image:none;padding:2px;background:linear-gradient(#f6e9c4,#d9c692);border-radius:12px;box-shadow:0 2px 0 #857455;color:#6f704e;font-size:27px;filter:none}
#lvis .дк.дк308 button.map-cell>span:first-child{display:flex;align-items:center;justify-content:center;width:100%;height:100%}#lvis .дк.дк308 .map-cell img{height:50px;max-width:100%;object-fit:contain}#lvis .дк.дк308 button.map-cell.water{background:#91c4c5;color:#3d7e8b;border-color:#66999c}#lvis .дк.дк308 button.map-cell.trail{border-color:#5d8b4f;background:#e4efc7}
#lvis .дк.дк308 .pic-note{font:400 17px/1.45 PicHand308,sans-serif;color:#c9d4b7;text-align:center}
#lvis .дк.дк308 .pic-two{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:stretch}#lvis .дк.дк308 .pic-dish{border:3px solid #9bb8a3;border-radius:24px;background:radial-gradient(ellipse,#fff8de 55%,#d9e7d4 60%,#fff6d6 76%);min-height:126px;display:flex;flex-direction:column;justify-content:center;padding:9px 4px;gap:8px;text-align:center;font-size:16px}
#lvis .дк.дк308 .pic-dish>div{display:flex;flex-wrap:wrap;justify-content:center;align-content:center;gap:0;min-height:76px}#lvis .дк.дк308 .pic-dish svg{width:36px;height:36px}
#lvis .дк.дк308 .pic-total{text-align:center;font-size:19px}#lvis .дк.дк308 .pic-bags{align-items:end}#lvis .дк.дк308 button.bag-button{border:0;filter:none;flex-direction:column;padding:0;gap:7px;background:transparent;min-height:220px;justify-content:end}#lvis .дк.дк308 .bag-button small{font-size:14px}
#lvis .дк.дк308 .pic-bag{width:100%;max-width:145px;height:155px;border:3px solid #9b865e;background:repeating-linear-gradient(80deg,#cab184,#ddc99d 5px,#cab184 10px);border-radius:30% 30% 24% 24%;display:flex;align-items:center;justify-content:center;position:relative;color:#6d563b;font-size:40px;padding:5px}
#lvis .дк.дк308 .pic-bag.small{max-width:112px;height:122px}#lvis .дк.дк308 .pic-bag.opened{background:#f9eed4;border-color:#b5a478}#lvis .дк.дк308 .pic-loose{display:flex;flex-wrap:wrap;justify-content:center}#lvis .дк.дк308 .pic-loose svg{width:36px;height:36px}
#lvis .дк.дк308 .pic-stats{display:flex;justify-content:space-around;flex-wrap:wrap;gap:5px;font-size:15px}#lvis .дк.дк308 .pic-stats b{font-size:20px;font-weight:400}
#lvis .дк.дк308 .pic-tray{border:6px solid #ad8653;border-radius:40px;background:linear-gradient(#e7c995,#c7a675);min-height:90px;padding:8px;box-shadow:0 6px 0 #81613e}#lvis .дк.дк308 .pic-tray>div{display:flex;align-items:center;justify-content:center;min-height:55px;color:#715e3e}
#lvis .дк.дк308 .pic-arrived{font-size:16px;display:flex;flex-direction:column;gap:4px}#lvis .дк.дк308 .pic-arrived>span{display:flex;min-height:36px;flex-wrap:wrap}#lvis .дк.дк308 .pic-arrived svg{width:32px;height:36px}
#lvis .дк.дк308 .pic-boxes{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}#lvis .дк.дк308 button.box-button{border:0;padding:0;flex-direction:column;font-size:16px;gap:10px;background:none;filter:none;justify-content:start}
#lvis .дк.дк308 .pic-box{display:flex;align-items:center;justify-content:center;width:100%;aspect-ratio:1;background:var(--box);border:3px solid #9c8560;box-shadow:inset 0 0 0 4px #fff4c777,0 5px 0 #8d7553;font-size:32px;color:#fff9dc}#lvis .дк.дк308 .pic-box.round{border-radius:50%}#lvis .дк.дк308 .pic-box.square{border-radius:8px}#lvis .дк.дк308 .pic-box svg{width:48px;height:48px}
#lvis .дк.дк308 .pic-tablecloth{background:repeating-conic-gradient(#e9ccab 0% 25%,#fff2d8 0% 50%) 0/28px 28px;padding:9px;border-radius:14px;border:2px solid #b49b75;display:grid;gap:14px}
#lvis .дк.дк308 .pic-guests{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}#lvis .дк.дк308 button.guest-place{border:1px solid #c0b185;filter:none;border-radius:12px;background:#fff8e5e8;padding:7px 2px;flex-direction:column;gap:5px;font-size:13px;min-height:150px}
#lvis .дк.дк308 .guest-place strong{font:17px PicHand308}#lvis .дк.дк308 .pic-place-setting{border:2px dashed #98ad88;width:50px;height:58px;border-radius:14px;font-size:30px;display:flex;align-items:center;justify-content:center}#lvis .дк.дк308 .pic-place-setting svg{width:44px;height:44px}
#lvis .дк.дк308 button.plate-button{border:0;padding:0;flex-direction:column;background:transparent;filter:none;font-size:16px}#lvis .дк.дк308 .plate-button>.pic-dish{width:100%;min-height:120px}#lvis .дк.дк308 .plate-button strong{font-weight:400}
#lvis .дк.дк308 .pic-feedback,#lvis .дк.дк308 .готово,#lvis .дк.дк308 .разбор,#lvis .дк.дк308 .дт-совет{padding:14px 4px 14px 15px;border:0;border-left:3px solid #b89c5d;border-radius:0;background:none;color:#e8e0cc;font:400 19px/1.5 PicHand308,sans-serif;min-height:54px}
#lvis .дк.дк308 .pic-feedback.success{border-left-color:#a6c694;background:none;color:#dcebc9}#lvis .дк.дк308 button.pic-help{justify-self:start;min-height:48px;font-size:19px;border:0;border-bottom:1px solid #b89c5d;border-image:none;border-radius:0;background:none;color:#e5cd96;filter:none;padding:8px 3px}
#lvis .дк.дк308 .число .окно{height:auto;min-height:0;padding:0!important;min-width:0;background:none;box-shadow:none;border:0;font:inherit;color:inherit;white-space:normal;text-shadow:none;overflow-wrap:anywhere}#lvis .дк.дк308 .число.длин.длин .окно{font-size:18px}
#lvis .дк.дк308 .число.верно:after,#lvis .дк.дк308 .число.мимо:after{right:1px;top:1px;width:18px;height:18px;font-size:12px;line-height:18px}
#lvis .дк.дк308 .дт-лента{background:#425e4b;border:1px solid #b2a16c;border-radius:16px;padding:12px;color:#ffedbd;flex-wrap:wrap;gap:8px;font-size:15px}#lvis .дк.дк308 .дт-лента .зв{display:grid;grid-template-columns:repeat(6,15px);gap:3px}
#lvis .дк.дк308:has(.pic-practice)>.числа,#lvis .дк.дк308:has(.pic-practice)>.готово,#lvis .дк.дк308:has(.pic-practice)>.дт-подсказки,#lvis .дк.дк308:has(.pic-practice)>.дт-совет,#lvis .дк.дк308:has(.pic-finale)>.готово{display:none}
#lvis .дк.дк308 .pic-finale{display:grid;gap:15px;color:#f7e7bd;text-align:center}#lvis .дк.дк308 .pic-finale h3{font:28px PicTitle308;margin:0}#lvis .дк.дк308 .pic-finale>.слушать{justify-self:center;grid-column:auto;grid-row:auto}#lvis .дк.дк308 .pic-finale p,#lvis .дк.дк308 .pic-summary{font:19px/1.45 PicHand308}#lvis .дк.дк308 .pic-summary{display:grid;gap:8px;text-align:left;background:#3e5849;padding:18px;border-radius:16px}#lvis .дк.дк308 .дт-итог{color:#f7e7bd}
#lvis .дк.дк308 .pic-feast{display:flex;flex-wrap:wrap;justify-content:center;padding:10px;background:#fff3d5df;border-radius:30px}#lvis .дк.дк308 .pic-quiz-art{height:160px;text-align:center}#lvis .дк.дк308 .pic-quiz-art img{height:100%;max-width:100%;object-fit:contain}
#lvis .дк.дк308 .pic-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
#lvis .дк.дк308 .plate-panel{display:flex;flex-direction:column;align-items:center;gap:7px;font-size:16px;min-width:0}#lvis .дк.дк308 .plate-panel strong{font-weight:400}#lvis .дк.дк308 .plate-panel .pic-dish{width:100%}#lvis .дк.дк308 .plate-controls{display:flex;gap:5px;justify-content:center}#lvis .дк.дк308 button.plate-step{width:44px;min-width:44px;min-height:44px;height:44px;padding:0;border-width:7px;font-size:25px}

/* The picnic is arranged with objects: serving boards, a shelf and a trail.
   Keep the shared app frame intact; type is explicit even in trainer states. */
#lvis .дк.дк308 :is(button,output,small,strong,b){font-family:PicHand308,sans-serif;font-weight:400}
#lvis .дк.дк308 :is(.pic-chapter,.pic-controls,.pic-list,.pic-feedback,.готово,.разбор,.дт-совет){min-width:0;overflow-wrap:break-word}
#lvis .дк.дк308 .pic-chapter>span:last-child{flex-shrink:0}
#lvis .дк.дк308 .pic-heading{hyphens:none;text-wrap:balance}
#lvis .дк.дк308 .pic-group-grid{gap:12px}
#lvis .дк.дк308 button.group-card{position:relative;border:2px solid #a7824f;border-image:none;border-radius:25% 12% 24% 14%;background:#e7cda1;color:#394d38;padding:12px 8px 14px;box-shadow:inset 0 0 0 4px #f4e4c4;filter:none}
#lvis .дк.дк308 .pic-shelf{gap:0 12px;padding:0 6px;background:repeating-linear-gradient(0deg,transparent 0,transparent 114px,#ab8750 114px,#e1c898 120px,transparent 120px,transparent 124px)}
#lvis .дк.дк308 button.shelf-item{min-height:124px;border:0;border-image:none;border-radius:0;background:none;color:#e8e0cc;filter:none;gap:2px;font:400 18px/1.3 PicHand308,sans-serif;padding:8px 2px 12px}
#lvis .дк.дк308 button.shelf-item>span{display:block;max-width:100%;overflow-wrap:anywhere}
#lvis .дк.дк308 button.shelf-item small{display:block;font-size:14px;line-height:1.3;color:#c6cfae}
#lvis .дк.дк308 button.shelf-item[aria-pressed=true]{background:#234d36;color:#f7efcf;outline-color:#bbcf9c}
#lvis .дк.дк308 button.shelf-item[aria-pressed=true]:after{color:#e4d59c}
#lvis .дк.дк308 .pic-dish{color:#3c513b}
#lvis .дк.дк308 .pic-runner span{font-size:17px;color:#3b513c}
#lvis .дк.дк308 .pic-family>div{font-size:16px;line-height:1.4}
#lvis .дк.дк308 .pic-map{background:#294e39;border:0;border-radius:0;padding:8px 0;gap:6px}
#lvis .дк.дк308 button.map-cell{min-width:44px;min-height:52px;border-radius:30% 18% 26% 14%}
#lvis .дк.дк308 .pic-bag{font-weight:400}
#lvis .дк.дк308 .bag-button>span,#lvis .дк.дк308 .bag-button small,#lvis .дк.дк308 .box-name{color:#e8e0cc;font:400 18px/1.4 PicHand308,sans-serif}
#lvis .дк.дк308 .box-name{display:block;width:100%;overflow-wrap:anywhere}
#lvis .дк.дк308 .pic-box{color:#304633}
#lvis .дк.дк308 .pic-boxes{gap:12px}
#lvis .дк.дк308 button.box-button{font:400 18px/1.4 PicHand308,sans-serif}
#lvis .дк.дк308 .pic-tablecloth{padding:12px;background:repeating-conic-gradient(#e0c9a9 0% 25%,#f4e7c8 0% 50%) 0/34px 34px;border:0;border-radius:6px 14px 9px 4px;color:#354d38}
#lvis .дк.дк308 .pic-guests{grid-template-columns:1fr;gap:0}
#lvis .дк.дк308 button.guest-place{display:grid;grid-template-columns:minmax(0,1fr) 54px minmax(0,1fr);align-items:center;min-height:76px;border:0;border-image:none;border-bottom:1px solid #9e865966;border-radius:0;background:none;filter:none;padding:8px 6px;font:400 16px/1.35 PicHand308,sans-serif;color:#354d38}
#lvis .дк.дк308 button.guest-place strong{font:400 18px/1.3 PicHand308,sans-serif;text-align:left}
#lvis .дк.дк308 button.guest-place:disabled{opacity:1}
#lvis .дк.дк308 .pic-place-setting{background:#f7ecd0}
#lvis .дк.дк308 .pic-feedback.hint{border-left-color:#e2c173;color:#f0dba6}
#lvis .дк.дк308 .числа{display:grid;grid-template-columns:1fr;gap:10px;width:100%;min-width:0}
#lvis .дк.дк308 .число.длин.длин{width:100%;max-width:none;min-height:54px}
#lvis .дк.дк308 .число .окно,#lvis .дк.дк308 .число.длин.длин .окно{font:400 19px/1.4 PicHand308,sans-serif;text-shadow:none}
#lvis .дк.дк308 .дт-лента{font:400 17px/1.4 PicHand308,sans-serif;border:0;border-bottom:1px solid #9b865877;border-radius:0;background:none;box-shadow:none;padding:8px 0}
#lvis .дк.дк308 .дт-итог{font:400 20px/1.5 PicHand308,sans-serif}
#lvis .дк.дк308 .pic-summary{background:none;border-radius:0;padding:8px 0;gap:12px}
@media(max-width:360px){#lvis .дк.дк308 .pic-shelf{grid-template-columns:repeat(2,minmax(0,1fr))}#lvis .дк.дк308 .pic-boxes{grid-template-columns:1fr;gap:10px}#lvis .дк.дк308 button.box-button{display:grid;grid-template-columns:76px minmax(0,1fr);align-items:center;gap:18px;text-align:left;min-height:86px}#lvis .дк.дк308 .pic-box{width:76px;height:76px}#lvis .дк.дк308 .pic-guests{gap:0}}

@keyframes pic-place{from{transform:translateY(-8px);opacity:.6}to{transform:translateY(0);opacity:1}}
@media(min-width:520px){#lvis .дк.дк308 .pic-group-grid:has(>button:nth-child(3):last-child){grid-template-columns:repeat(3,minmax(0,1fr))}#screen:has(.дк308)>.btnrow{max-width:650px;width:100%;margin-left:auto;margin-right:auto}}
@media(max-width:360px){#lvis .дк.дк308 .реплика{padding:6px 2px 14px}#lvis .дк.дк308 .реплика p{font-size:18px}#lvis .дк.дк308 .pic-world{padding:0}#lvis .дк.дк308 .pic-work{padding:12px 0 0}#lvis .дк.дк308 .pic-heading{font-size:25px}#lvis .дк.дк308 button.shelf-item{font-size:17px;padding-left:0;padding-right:0}#lvis .дк.дк308 .pic-group-grid{gap:8px}#lvis .дк.дк308 .pic-boxes{gap:7px}#lvis .дк.дк308 button.box-button{font-size:17px;border:0;padding:0}#lvis .дк.дк308 .pic-dish svg{width:30px;height:32px}#lvis .дк.дк308 .pic-tablecloth{padding:7px}#lvis .дк.дк308 button.guest-place{font-size:16px;border:0;padding:8px 6px}#lvis .дк.дк308 button.plate-button{border:0}#lvis .дк.дк308 .pic-family{gap:3px}#lvis .дк.дк308 .pic-family>div{font-size:15px}#lvis .дк.дк308 .pic-family img{height:80px}}
@media(prefers-reduced-motion:reduce){#lvis .дк.дк308 *{animation:none!important;transition:none!important}}
`;document.head.appendChild(css);
})();
