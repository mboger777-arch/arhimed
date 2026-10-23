/* АРХИМЕД MVP · legend.js — экран «Легенда об Архимеде» */
'use strict';

/* Главы легенды: t — заголовок, p — абзацы (можно **жирный**), q — реплика Архимеда (необязательно) */
const ARH_LEGEND = [
  { ico:'🌊', t:'Пролог · Голос из пены',
    p:['Говорят, в год, когда пали Сиракузы, море не забрало великого старца. Оно подхватило его — и превратило в ту самую мысль, которую нельзя утопить: «Дайте мне точку опоры — и я переверну Землю».',
       'С той поры он живёт не в камне, а в знании. Знание это — не пыльная библиотека, а живое Внутреннее море, по которому разбросаны Острова Познания. Каждое поколение море выбирает новых Исследователей.',
       'Ты — один из них.'] },
  { ico:'🏛', t:'Глава I · Сиракузы — остров, где родилась мысль',
    p:['Самый древний остров. Здесь Архимед ещё человек: чертит на песке круги, взвешивает короны и побеждает страх числом.',
       'Остров хранит приёмы, которые старше любых машин: голуби и клетки, инварианты, переливания, остатки — язык, на котором с тобой разговаривает порядок.',
       'Правило Сиракуз: сначала пойми приём — потом решай.'],
    q:'«Здесь я учу думать как я: не быстрее, а честнее»' },
  { ico:'🍎', t:'Глава II · Остров Ньютона — яблоко, которое думает',
    p:['К северу от Сиракуз лежит остров, где вместо деревьев растут законы. Здесь нет магии — есть сила, масса и ускорение, и даже падающее яблоко обязано подчиняться расчёту.',
       'На этом острове Архимед встречает самого себя через две тысячи лет: Исаака Ньютона. Они спорят о рычагах, пускают пушки с кораблей и разгоняют карусели.',
       'Здесь ты узнаешь, почему корабль не тонет, что такое энергия и как Архимед сжёг бы вражеский флот зеркалами — если бы не помешала погода.'],
    q:'«Физика — это математика, которая не умеет ждать»' },
  { ico:'🐻', t:'Глава IV · Мишутка — ученик, который хочет знать всё',
    p:['В шестом классе одной московской школы учится Мишутка. Он не самый быстрый в устном счёте и не самый громкий на уроке, зато у него есть привычка, которая дороже таланта: он не оставляет вопрос без ответа.',
       'Мишутка решил выступать на олимпиадах. Первый раз он вернулся без диплома и понял главное: олимпиада проверяет не память, а умение разобрать незнакомую задачу по частям. Тогда он стал искать того, кто умеет именно это.',
       'Ему рассказали про Внутреннее море и острова. Мишутка собрал рюкзак — тетрадь, карандаш и термос — и пришёл к Архимеду. Старец выслушал его и вместо приветствия задал вопрос: «Сколько учеников писало контрольную, если столбцы показывают 3, 6, 8 и 5?» Мишутка задумался, а Архимед улыбнулся: «Вот с этого и начнём».',
       'Так появился остров Разбор с Мишуткой. Здесь нет готовых формул — здесь учат читать диаграммы и таблицы, оценивать, проверять себя прикидкой и не бояться задачи, которая выглядит незнакомой.',
       'Правило острова: всякая задача — это спрятанный вопрос. Найди, что именно спрашивают, — и половина решена.'],
    q:'«Я хочу знать всё, а Архимед говорит: сначала научись понимать условие»' },
  { ico:'📊', t:'Записка Мишутки · Как считается уровень ФГ',
    p:['В диагностике по функциональной грамотности (МЦКО, 6 класс) 28 заданий и 90 минут. Работа идёт тремя блоками: чтение — 10 заданий и 14 баллов, математика — 6 заданий и 10 баллов, естествознание — 12 заданий и 13 баллов.',
       'Баллы зависят от формы задания: за выбор одного ответа дают 1 балл, за развёрнутый ответ, установление последовательности или выделение фрагмента — 2. В нашей серии вес подобран так, чтобы максимум каждого блока совпал со спецификацией.',
       'Уровень считается по каждому блоку отдельно, от процента набранных баллов: меньше 30 % — недостаточный, от 30 до 50 % — пониженный, от 50 до 80 % — базовый, больше 80 % — повышенный.',
       'Главное, что стоит запомнить: в спецификации прямо написано, что переводить результат в 5-балльную отметку не рекомендуется. Это метапредметный результат — он показывает, умеешь ли ты работать с информацией, а не выучил ли параграф.'],
    q:'«Уровень — это не отметка. Это ответ на вопрос: умею ли я разбираться сам»' },
  { ico:'📓', t:'Записка Мишутки · Как разобрать незнакомую задачу',
    p:['В тетради Мишутки на первой странице написано четыре шага. Он вывел их сам, после первой олимпиады, где не решил ни одной задачи и весь час смотрел в листок.',
       'Шаг 1. Прочитай и назови своими словами, что происходит. Если не можешь рассказать условие младшему брату — ты его ещё не понял.',
       'Шаг 2. Найди, что именно спрашивают. Отдели вопрос от украшений: цифры, картинки и истории — это упаковка, вопрос всегда один.',
       'Шаг 3. Нарисуй. Даже кривой рисунок или таблица «да — нет» превращают незнакомую задачу в знакомую: становится видно, что с чем сравнивать.',
       'Шаг 4. Проверь прикидкой. Ответ 990 для 198 × 5 — правдоподобен, а 99 или 9900 — уже нет. Олимпиада любит ответы, которые можно оценить на глаз.',
       'Архимед, прочитав записку, дописал внизу одну строчку: «Пятый шаг — не бросать задачу на второй минуте. Думай до третьей».'],
    q:'«Всякая задача — это спрятанный вопрос»' },
  { ico:'⚗️', t:'Глава III · Лаборатория Лавуазье — остров, где ничто не исчезает',
    p:['На юге, среди туманов, дымит остров химиков. Здесь правит не меч, а весы точнее любых весов мира: на них Архимед когда-то поймал обманщика-ювелира.',
       'Остров назван в честь Антуана Лавуазье, который доказал: в природе ничто не исчезает и не рождается из ничего — всё лишь меняет обличье.',
       'Пена в колбе, взрыв, блестящий металл — это одно и то же вещество, которое путешествует. Корона, крик «Эврика!» и современная химия — одна история про массу, которая никогда не врёт.'],
    q:'«Эврика! — кричат не от скорости, а от правды»' },
  { ico:'💻', t:'Глава IV · Цитадель Информатики — новый остров',
    p:['Однажды ночью Внутреннее море само вынесло на поверхность новый остров — из света и нулей. Архимед никогда не видел его при жизни, но узнал сразу.',
       'На острове живут не люди, а алгоритмы — точные приказы, которые выполняются без ошибок и без страха. Двоичный код, бинарный поиск, динамика, логика И/ИЛИ/НЕ.',
       'Хранитель сделал этот остров четвёртым: сначала мысль (Сиракузы), затем сила (Ньютон), затем вещество (Лавуазье) — и наконец разум, который строит сам себя.'],
    q:'«Это мой способ думать, записанный так, что его поймёт даже машина»' },
  { ico:'🏁', t:'Глава V · Тур — гонка за факелом',
    p:['Раз в сезон Архимед зажигает на каждом острове факел и объявляет Тур: цепочку задач, где нельзя пропускать шаги — как нельзя перепрыгнуть ступень в доказательстве.',
       'Кто проходит Тур без единой ошибки, получает право назваться Стратегом Внутреннего моря — и следующий сезон Архимед ведёт с ним разговоры, как с равным.'] },
  { ico:'📜', t:'Эпилог · Что знает Архимед',
    p:['«Дайте мне точку опоры» — любая задача становится лёгкой, если найти, за что зацепиться: знакомый приём, рисунок, инвариант.',
       '«Эврика!» — озарение приходит не к тому, кто быстрее, а к тому, кто не сдался на шаг раньше, чем нужно.',
       '«Не трогай мои круги» — уважай чужую мысль: в олимпиаде побеждает не тот, кто перебил, а тот, кто объяснил.',
       'А ещё он всегда рядом — в углу экрана. Спроси его голосом, и он ответит.'],
    q:'«Три правила хранителя. Запомни их — они старше самих островов»' }
];

/* Scene descriptions archived in MVP/img/legend/storyboard.json; no runtime request. */
const ARH_LEGEND_SCENES = [
  [
    {
      "id": "01a-sea-memory",
      "caption": "Мысль, которую нельзя утопить",
      "description": "Морская пена складывается в светящийся силуэт Архимеда у ночного берега.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "01b-inner-sea",
      "caption": "Море открытий",
      "description": "Архимед показывает острова и золотые пути во Внутреннем море.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "01f-generations",
      "caption": "Каждое поколение задаёт свои вопросы",
      "description": "Исследователи разных поколений вместе рассматривают карту островов.",
      "sourceParagraphIndices": []
    },
    {
      "id": "01c-first-explorer",
      "caption": "Твоё путешествие начинается",
      "description": "Архимед приглашает зрителя на освещённый причал.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "01d-living-book",
      "caption": "Знание оживает",
      "description": "Страницы раскрытой книги превращаются в миниатюрное море с островами.",
      "sourceParagraphIndices": []
    },
    {
      "id": "01e-island-compass",
      "caption": "Любопытство укажет путь",
      "description": "Компас и карта лежат у окна с видом на морской путь.",
      "sourceParagraphIndices": []
    },
    {
      "id": "01g-sea-book-cutout",
      "caption": "Открой своё море",
      "description": "Из раскрытой книги поднимаются острова и маленький парусник.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 800
    }
  ],
  [
    {
      "id": "02a-sand-circles",
      "caption": "Начни с рисунка",
      "description": "Архимед чертит окружность на песке среди колонн Сиракуз.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "02b-order-workshop",
      "caption": "Заметь порядок",
      "description": "Архимед рассматривает сосуды, счётные камешки и рисунок клеток.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "02f-invariants",
      "caption": "Что меняется, а что остаётся?",
      "description": "Архимед группирует камешки на доске, оставляя часть отдельно.",
      "sourceParagraphIndices": []
    },
    {
      "id": "02c-think-first",
      "caption": "Сначала пойми приём",
      "description": "Архимед обдумывает рисунок, отложив инструмент.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "02d-pigeons",
      "caption": "Вместе или по одному?",
      "description": "Два голубя делят одну из открытых ниш голубятни.",
      "sourceParagraphIndices": []
    },
    {
      "id": "02e-pouring",
      "caption": "Форма меняется — вода остаётся",
      "description": "Архимед аккуратно переливает воду из узкого сосуда в широкий.",
      "sourceParagraphIndices": []
    }
  ],
  [
    {
      "id": "03a-physics-island",
      "caption": "У движения есть закономерности",
      "description": "Архимед наблюдает маятник на острове с обсерваторией.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "03b-lever",
      "caption": "Найди точку опоры",
      "description": "Архимед и Ньютон изучают рычаг с одинаковыми грузами.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "03c-floating-ship",
      "caption": "Почему корабль не тонет?",
      "description": "Архимед и Ньютон наблюдают за моделью парусного корабля в прозрачной ёмкости с водой.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "03d-carousel",
      "caption": "Исследуй движение",
      "description": "Ньютон вращает настольную модель карусели, а Архимед наблюдает.",
      "sourceParagraphIndices": []
    },
    {
      "id": "03f-energy",
      "caption": "Движение передаётся дальше",
      "description": "Поток воды вращает водяное колесо, за которым наблюдают Архимед и Ньютон.",
      "sourceParagraphIndices": []
    },
    {
      "id": "03e-mirrors-weather",
      "caption": "Даже опыт зависит от условий",
      "description": "Архимед смотрит на облака над зеркалами, установленными у моря.",
      "sourceParagraphIndices": []
    }
  ],
  [
    {
      "id": "04a-classroom",
      "caption": "Не оставляй вопрос без ответа",
      "description": "Мишутка поднимает лапу, чтобы задать вопрос в школьном классе.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "04b-after-olympiad",
      "caption": "Незнакомую задачу можно разобрать",
      "description": "Вернувшись домой после олимпиады, Мишутка рассматривает задачу и берёт карандаш.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "04f-backpack",
      "caption": "Собираемся за ответами",
      "description": "Мишутка собирает рюкзак с тетрадью, карандашом и термосом.",
      "sourceParagraphIndices": []
    },
    {
      "id": "04g-coastal-path",
      "caption": "За вопросом начинается путь",
      "description": "Мишутка с рюкзаком идёт по прибрежной дороге к наставнику.",
      "sourceParagraphIndices": []
    },
    {
      "id": "04c-meeting",
      "caption": "Встреча с наставником",
      "description": "Мишутка с рюкзаком встречается с Архимедом на причале.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "04d-chart",
      "caption": "За столбцами скрывается история",
      "description": "Мишутка показывает ячейку таблицы Архимеду; точная диаграмма расположена под рисунком.",
      "sourceParagraphIndices": [
        3
      ]
    },
    {
      "id": "04h-check-data",
      "caption": "Сверь запись с наблюдением",
      "description": "Мишутка сравнивает запись на планшете с предметами на полке.",
      "sourceParagraphIndices": []
    },
    {
      "id": "04e-find-question",
      "caption": "Найди, что нужно узнать",
      "description": "Мишутка объясняет часть схемы, а Архимед внимательно слушает.",
      "sourceParagraphIndices": [
        4
      ]
    },
    {
      "id": "04i-dialogue-cutout",
      "caption": "Объясни свою мысль",
      "description": "Мишутка раскрывает тетрадь, а Архимед присел рядом и слушает его объяснение.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 800
    },
    {
      "id": "04j-backpack-cutout",
      "caption": "Что возьмём с собой?",
      "description": "Мишутка кладёт тетрадь в рюкзак; рядом лежат карандаш и термос.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 1200
    }
  ],
  [
    {
      "id": "05a-three-fields",
      "caption": "Читать, считать, исследовать",
      "description": "Книга, счётные предметы и растение обозначают три направления работы с информацией.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "05b-task-forms",
      "caption": "Разные способы ответить",
      "description": "Учебные листы показывают разные формы задания: выбор, последовательность и развёрнутый ответ.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "05c-separate-results",
      "caption": "У каждого умения свой результат",
      "description": "Три отдельные папки лежат рядом с книгой, счётами и растением.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "05f-level-not-grade",
      "caption": "Уровень — не школьная отметка",
      "description": "Три карточки разных умений лежат рядом с тетрадью без отметки.",
      "sourceParagraphIndices": [
        3
      ]
    },
    {
      "id": "05d-information",
      "caption": "Важно разобраться в информации",
      "description": "Настоящий лист под лупой можно сравнить с его рисунком в книге.",
      "sourceParagraphIndices": []
    },
    {
      "id": "05e-reading-tools",
      "caption": "Инструменты исследователя",
      "description": "Книга, карандаш, счёты и лупа освещены настольной лампой.",
      "sourceParagraphIndices": []
    }
  ],
  [
    {
      "id": "06f-past-olympiad",
      "caption": "С трудной задачи начинается опыт",
      "description": "Во время первой олимпиады Мишутка задумался над незнакомой задачей.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "06a-read",
      "caption": "Расскажи условие своими словами",
      "description": "Мишутка читает задачу в своей тетради и объясняет условие.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "06g-retell",
      "caption": "Покажи, что происходит",
      "description": "Мишутка объясняет Архимеду условие с помощью рисунка на доске.",
      "sourceParagraphIndices": []
    },
    {
      "id": "06h-break-apart",
      "caption": "Раздели условие на части",
      "description": "Мишутка разбирает условие на карточки и группирует их на ковре.",
      "sourceParagraphIndices": []
    },
    {
      "id": "06b-question",
      "caption": "Найди, что нужно узнать",
      "description": "Мишутка выделяет карандашом нужную часть схемы в тетради.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "06c-draw-bridge",
      "caption": "Покажи условие рисунком",
      "description": "Мишутка рисует схему моста, который виден из окна.",
      "sourceParagraphIndices": [
        3
      ]
    },
    {
      "id": "06d-estimate",
      "caption": "Проверь ответ прикидкой",
      "description": "Мишутка сравнивает большие и маленькие количества счётных палочек, проверяя свою прикидку.",
      "sourceParagraphIndices": [
        4
      ]
    },
    {
      "id": "06e-keep-thinking",
      "caption": "Дай мысли ещё немного времени",
      "description": "Архимед читает тетрадь Мишутки и дописывает мысль, а ученик наблюдает.",
      "sourceParagraphIndices": [
        5
      ]
    },
    {
      "id": "06i-discover-cutout",
      "caption": "Кажется, я понял!",
      "description": "Мишутка держит тетрадь и радостно поднимает палец, заметив связь в задаче.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 1800
    },
    {
      "id": "06j-model-cutout",
      "caption": "Проверь рисунок на модели",
      "description": "Мишутка сравнивает нарисованную схему с маленькой бумажной моделью моста.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 1106
    }
  ],
  [
    {
      "id": "07a-lab-island",
      "caption": "Здесь начинают с наблюдения",
      "description": "Архимед входит в лабораторию с весами и стеклянной посудой.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "07b-sealed-system",
      "caption": "Следи за тем, что происходит",
      "description": "Архимед и Лавуазье рассматривают закрытую колбу рядом с весами.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "07c-crown",
      "caption": "Задай веществу точный вопрос",
      "description": "Корона, весы и прозрачный сосуд стоят на лабораторном столе.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "07d-ice-water",
      "caption": "Лёд становится водой",
      "description": "В закрытой прозрачной банке лёд постепенно превращается в воду.",
      "sourceParagraphIndices": []
    },
    {
      "id": "07e-careful-weighing",
      "caption": "Проверяй наблюдение измерением",
      "description": "Лавуазье подбирает гири, а Архимед записывает наблюдение.",
      "sourceParagraphIndices": []
    },
    {
      "id": "07f-eureka",
      "caption": "Радость, когда догадка подтверждается",
      "description": "Архимед улыбается, заметив объяснение в результатах наблюдений.",
      "sourceParagraphIndices": []
    }
  ],
  [
    {
      "id": "08a-new-island",
      "caption": "Новый остров на карте",
      "description": "Архимед наблюдает, как из ночного моря возникает светящийся остров.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "08b-machine-commands",
      "caption": "Машине нужны точные команды",
      "description": "Архимед изучает механическое устройство с командными карточками.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "08f-binary",
      "caption": "Два состояния — начало кода",
      "description": "Одинаковые ячейки устройства либо светятся, либо выключены.",
      "sourceParagraphIndices": []
    },
    {
      "id": "08c-four-connections",
      "caption": "Знания соединяются",
      "description": "С балкона видны четыре острова, соединённые светящимися путями.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "08d-maze",
      "caption": "Проложи путь по шагам",
      "description": "На столе лежат механический лабиринт и карточки со стрелками.",
      "sourceParagraphIndices": []
    },
    {
      "id": "08e-mechanism",
      "caption": "Проверь порядок действий",
      "description": "Архимед переставляет командную карточку в медном механизме.",
      "sourceParagraphIndices": []
    },
    {
      "id": "08g-command-boat-cutout",
      "caption": "Путь из команд",
      "description": "Механический кораблик стоит на деревянной дорожке, рядом лежат три плитки со стрелками.",
      "sourceParagraphIndices": [],
      "kind": "cutout",
      "width": 1200,
      "height": 1200
    }
  ],
  [
    {
      "id": "09a-light-torch",
      "caption": "Начало нового пути",
      "description": "Архимед зажигает факел на каменной площадке острова.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "09b-finish",
      "caption": "У финишного огня",
      "description": "Архимед встречает зрителя у факела в конце каменной тропы.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "09f-strategy",
      "caption": "Посмотри на путь целиком",
      "description": "Архимед обсуждает со зрителем карту последовательных этапов маршрута.",
      "sourceParagraphIndices": []
    },
    {
      "id": "09c-task-chain",
      "caption": "Один шаг ведёт к следующему",
      "description": "Непрерывная дорожка соединяет площадки с геометрическими узорами.",
      "sourceParagraphIndices": []
    },
    {
      "id": "09d-island-fires",
      "caption": "У каждого острова свой огонь",
      "description": "Огни факелов отражаются в море возле разных островов.",
      "sourceParagraphIndices": []
    },
    {
      "id": "09e-flame-closeup",
      "caption": "Сохрани интерес к открытиям",
      "description": "Золотистый факел освещает пройденную тропу.",
      "sourceParagraphIndices": []
    }
  ],
  [
    {
      "id": "10a-fulcrum",
      "caption": "Найди, за что зацепиться",
      "description": "Архимед показывает точку опоры небольшого рычага.",
      "sourceParagraphIndices": [
        0
      ]
    },
    {
      "id": "10b-insight",
      "caption": "Открытие начинается с терпения",
      "description": "Архимед замечает связь между частями рисунка и улыбается.",
      "sourceParagraphIndices": [
        1
      ]
    },
    {
      "id": "10c-respect-thought",
      "caption": "Выслушай и объясни",
      "description": "Архимед внимательно слушает зрителя, сохраняя рисунок кругов перед собой.",
      "sourceParagraphIndices": [
        2
      ]
    },
    {
      "id": "10f-three-principles",
      "caption": "Опора, настойчивость, уважение",
      "description": "Рычаг, тетрадь с попытками решения и сохранённый рисунок кругов напоминают о трёх правилах.",
      "sourceParagraphIndices": []
    },
    {
      "id": "10d-nearby",
      "caption": "Наставник рядом",
      "description": "Архимед наклоняется к зрителю и готов выслушать вопрос.",
      "sourceParagraphIndices": [
        3
      ]
    },
    {
      "id": "10e-open-horizon",
      "caption": "Теперь твоя очередь исследовать",
      "description": "Архимед показывает на морскую дорогу под оливковым деревом.",
      "sourceParagraphIndices": []
    }
  ]
];

/* Captions and scene descriptions are additional material; ARH_LEGEND above is unchanged. */
const ARH_LEGEND_QUESTIONS = [
  [
    "Какой остров ты хотел бы исследовать первым?",
    "Можно начать с того, что больше всего удивляет. Любопытство поможет выбрать направление."
  ],
  [
    "Что изменится, если перелить воду в сосуд другой формы?",
    "Уровень может измениться, но самой воды останется столько же, если ничего не пролить."
  ],
  [
    "Что помогает кораблю держаться на воде?",
    "Вода выталкивает корабль вверх. Его большой корпус вытесняет достаточно воды, чтобы корабль мог плавать."
  ],
  [
    "Как узнать общее число учеников по четырём столбцам?",
    "Сложи значения: 3 + 6 + 8 + 5 = 22."
  ],
  [
    "Что общего у чтения, счёта и наблюдения за растением?",
    "Во всех трёх случаях нужно замечать детали, находить нужную информацию и делать выводы."
  ],
  [
    "Зачем Мишутка рисует схему?",
    "На рисунке легче увидеть, что известно и что с чем связано. Важно рисовать понятно, а не идеально."
  ],
  [
    "Куда исчезает лёд, когда тает?",
    "Он становится жидкой водой. Если ничего не вытекло и не испарилось, масса остаётся прежней."
  ],
  [
    "Как объяснить машине путь через лабиринт?",
    "Разбей путь на команды и проверь их порядок. Машина выполнит записанные действия."
  ],
  [
    "Что помогает пройти последовательность задач?",
    "Сначала разберись с текущим шагом, затем переходи дальше. Спешка может помешать заметить важную деталь."
  ],
  [
    "Как показать, что ты понял свою идею?",
    "Попробуй объяснить её своими словами и рисунком. Так легче заметить, всё ли тебе понятно."
  ]
];
const ARH_SAND_CHART = "<svg aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 320 280\" aria-hidden=\"true\" focusable=\"false\">\n<defs>\n  <linearGradient id=\"tale-sand-bed\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#b28a52\" stop-opacity=\".2\"/><stop offset=\".5\" stop-color=\"#c7a065\" stop-opacity=\".38\"/><stop offset=\"1\" stop-color=\"#8e7648\" stop-opacity=\".05\"/></linearGradient>\n  <linearGradient id=\"tale-pebble-face\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#d6cda7\"/><stop offset=\".53\" stop-color=\"#b7aa7c\"/><stop offset=\"1\" stop-color=\"#89794d\"/></linearGradient>\n  <linearGradient id=\"tale-pebble-warm\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop stop-color=\"#c5bd99\"/><stop offset=\".5\" stop-color=\"#aa9e72\"/><stop offset=\"1\" stop-color=\"#7f734a\"/></linearGradient>\n</defs>\n<!-- Only this small sand patch is filled; the page background remains visible. -->\n<path d=\"M7 238C15 226 28 229 40 223C54 219 65 227 79 225C94 219 107 221 121 225C137 221 151 225 166 222C183 217 197 222 212 224C228 218 239 225 254 222C271 219 280 226 293 228C303 229 312 235 311 242C316 249 302 252 286 253C272 260 256 254 242 258C222 263 207 257 188 260C173 265 159 259 141 261C121 265 104 260 85 259C70 261 57 255 44 255C26 257 16 249 9 248C4 245 4 241 7 238Z\" fill=\"url(#tale-sand-bed)\"/>\n<!-- A scratched common baseline, plus restrained sand ripples. -->\n<g fill=\"none\" stroke-linecap=\"round\">\n<path d=\"M17 236C50 234 82 237 113 236C150 234 178 237 211 236C246 234 274 237 303 235\" stroke=\"#e7cc93\" stroke-opacity=\".72\" stroke-width=\"1.4\"/>\n<path d=\"M18 240C43 238 59 241 78 239M90 245C111 242 129 245 145 243M173 241C196 238 210 241 226 239M246 246C263 242 281 245 296 242\" stroke=\"#e6c58b\" stroke-opacity=\".3\" stroke-width=\".9\"/>\n<path d=\"M28 250L40 248M63 246L69 245M151 253L160 251M202 251L210 250M270 253L281 250\" stroke=\"#8f7047\" stroke-opacity=\".6\" stroke-width=\"1\"/>\n</g>\n<g fill=\"#e6c58b\" opacity=\".52\"><circle cx=\"22\" cy=\"245\" r=\".8\"/><circle cx=\"55\" cy=\"250\" r=\".7\"/><circle cx=\"83\" cy=\"248\" r=\".8\"/><circle cx=\"103\" cy=\"252\" r=\".6\"/><circle cx=\"138\" cy=\"248\" r=\".8\"/><circle cx=\"165\" cy=\"245\" r=\".7\"/><circle cx=\"183\" cy=\"253\" r=\".8\"/><circle cx=\"219\" cy=\"249\" r=\".6\"/><circle cx=\"237\" cy=\"252\" r=\".8\"/><circle cx=\"289\" cy=\"249\" r=\".7\"/></g>\n<!-- Faint height guides make the shared unit visible without competing with the stones. -->\n<g fill=\"none\" stroke=\"#d0b783\" stroke-opacity=\".14\" stroke-width=\".7\" stroke-dasharray=\"1 5\">\n<path d=\"M18 214H302\"/>\n<path d=\"M18 192H302\"/>\n<path d=\"M18 170H302\"/>\n<path d=\"M18 148H302\"/>\n<path d=\"M18 126H302\"/>\n<path d=\"M18 104H302\"/>\n<path d=\"M18 82H302\"/>\n<path d=\"M18 60H302\"/>\n</g>\n<g class=\"tale-chart-column\" data-column=\"0\" data-value=\"3\" data-base-y=\"236\" data-center-x=\"49\" style=\"transform-origin:49px 236px\">\n<path d=\"M22 237C32 233 66 233 77 237C67 241 31 242 22 237Z\" fill=\"#122219\" opacity=\".5\"/>\n<g class=\"tale-chart-stone\" data-unit=\"1\" transform=\"translate(49 214)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"2\" transform=\"translate(49 192)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"3\" transform=\"translate(49 170)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<rect class=\"tale-chart-hit\" x=\"21\" y=\"144\" width=\"56\" height=\"96\" fill=\"transparent\"/>\n</g>\n<g class=\"tale-chart-column\" data-column=\"1\" data-value=\"6\" data-base-y=\"236\" data-center-x=\"123\" style=\"transform-origin:123px 236px\">\n<path d=\"M96 237C106 233 140 233 151 237C141 241 105 242 96 237Z\" fill=\"#122219\" opacity=\".5\"/>\n<g class=\"tale-chart-stone\" data-unit=\"1\" transform=\"translate(123 214)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"2\" transform=\"translate(123 192)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"3\" transform=\"translate(123 170)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"4\" transform=\"translate(123 148)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"5\" transform=\"translate(123 126)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"6\" transform=\"translate(123 104)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<rect class=\"tale-chart-hit\" x=\"95\" y=\"78\" width=\"56\" height=\"162\" fill=\"transparent\"/>\n</g>\n<g class=\"tale-chart-column\" data-column=\"2\" data-value=\"8\" data-base-y=\"236\" data-center-x=\"197\" style=\"transform-origin:197px 236px\">\n<path d=\"M170 237C180 233 214 233 225 237C215 241 179 242 170 237Z\" fill=\"#122219\" opacity=\".5\"/>\n<g class=\"tale-chart-stone\" data-unit=\"1\" transform=\"translate(197 214)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"2\" transform=\"translate(197 192)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"3\" transform=\"translate(197 170)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"4\" transform=\"translate(197 148)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"5\" transform=\"translate(197 126)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"6\" transform=\"translate(197 104)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"7\" transform=\"translate(197 82)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"8\" transform=\"translate(197 60)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<rect class=\"tale-chart-hit\" x=\"169\" y=\"34\" width=\"56\" height=\"206\" fill=\"transparent\"/>\n</g>\n<g class=\"tale-chart-column\" data-column=\"3\" data-value=\"5\" data-base-y=\"236\" data-center-x=\"271\" style=\"transform-origin:271px 236px\">\n<path d=\"M244 237C254 233 288 233 299 237C289 241 253 242 244 237Z\" fill=\"#122219\" opacity=\".5\"/>\n<g class=\"tale-chart-stone\" data-unit=\"1\" transform=\"translate(271 214)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"2\" transform=\"translate(271 192)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"3\" transform=\"translate(271 170)\">\n<path d=\"M-25 7C-23 2-15 0-7 0L12 1C21 1 26 5 26 10L25 16C21 21 15 22 7 22L-13 22C-21 21-26 17-26 12Z\" fill=\"url(#tale-pebble-warm)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-17 10L-13 8M-6 16L-2 15M12 13L15 11\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"5\" cy=\"10\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"4\" transform=\"translate(271 148)\">\n<path d=\"M-25 8C-25 4-19 1-12 1L9 0C17 0 25 3 26 8L25 15C23 20 16 22 6 22L-12 22C-20 22-26 19-26 14Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-15 12L-11 10M13 13L18 11M-3 15L1 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"7\" cy=\"9\" r=\".65\" fill=\"#ddd4ad\"/>\n</g>\n<g class=\"tale-chart-stone\" data-unit=\"5\" transform=\"translate(271 126)\">\n<path d=\"M-26 9C-25 3-18 1-10 0L13 1C21 1 26 5 26 10L25 16C23 21 16 22 8 22L-14 21C-21 21-26 18-26 13Z\" fill=\"url(#tale-pebble-face)\" stroke=\"#5d5638\" stroke-width=\"1.05\"/>\n<path d=\"M-22 8C-15 3-4 5 5 4C13 4 18 5 22 8\" fill=\"none\" stroke=\"#eee4be\" stroke-opacity=\".7\" stroke-width=\"1.1\" stroke-linecap=\"round\"/>\n<path d=\"M-24 14L-20 17L-14 17L-8 20L8 20L19 17L24 14L21 19L13 22L-12 21L-22 19Z\" fill=\"#716744\" opacity=\".12\"/>\n<path d=\"M-23 16C-11 20 8 20 23 15\" fill=\"none\" stroke=\"#71633e\" stroke-opacity=\".44\" stroke-width=\"1\" stroke-linecap=\"round\"/>\n<path d=\"M-19 13L-15 12M7 11L11 9M16 16L19 14\" fill=\"none\" stroke=\"#716744\" stroke-opacity=\".5\" stroke-width=\".65\" stroke-linecap=\"round\"/><circle cx=\"-3\" cy=\"9\" r=\".7\" fill=\"#ddd4ad\"/>\n</g>\n<rect class=\"tale-chart-hit\" x=\"243\" y=\"100\" width=\"56\" height=\"140\" fill=\"transparent\"/>\n</g>\n</svg>\n";
let LG = { ch:0, chartTimers:[], chartObserver:null };
function escL(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fmtL(p){ return escL(p).replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>'); }
const ARH_LEGEND_SPOKEN = [
  ['«Дайте мне точку опоры — и я переверну Землю»'], [], [],
  ['«Сколько учеников писало контрольную, если столбцы показывают 3, 6, 8 и 5?»','«Вот с этого и начнём»'], [],
  ['«Пятый шаг — не бросать задачу на второй минуте. Думай до третьей»'],
  ['«Эврика!»'], [], [], ['«Дайте мне точку опоры»','«Эврика!»','«Не трогай мои круги»']
];
function lgInk(name, cls=''){
  return `<img class="tale-ink ${cls}" src="img/legend/ui/${name}.svg" alt="" aria-hidden="true" width="48" height="48">`;
}
function lgQuote(ch){
  if(!ch.q) return '';
  const mishutka=LG.ch>=3&&LG.ch<=5;
  return `<blockquote class="tale-voice ${mishutka?'voice-mishutka':'voice-arch'}">${mishutka?'':`<img class="tale-voice-portrait" src="img/arch_smile.jpg" alt="" width="72" height="72" loading="lazy">`}<cite class="tale-speaker">${lgInk('archimedes-quill')}${mishutka?'Мишутка':'Архимед'}</cite><p>${escL(ch.q)}</p></blockquote>`;
}
function lgChart(){
  const values=[3,6,8,5], x=[49,123,197,271], tops=[170,104,60,126];
  return `<figure class="tale-chart" id="tale-sand-chart"><figcaption>Сосчитаем вместе с Мишуткой</figcaption><p class="sand-instruction">Один камень — один ученик. Нажми на башенку.</p><div class="sand-drawing">${ARH_SAND_CHART}${values.map((n,i)=>`<button type="button" class="sand-column-choice" style="left:${x[i]/3.2}%;top:${(tops[i]-30)/2.8}%;height:${(266-tops[i])/2.8}%" onclick="lgSelectColumn(${i})" aria-label="Столбец ${i+1}: ${n} ${n===3?'ученика':'учеников'}" aria-pressed="false"><span>${n}</span></button>`).join('')}</div><p class="sand-feedback" id="sand-feedback" aria-live="polite">Как собрать все четыре столбца в один ответ?</p><div class="sand-actions"><button type="button" onclick="lgReplayChart()">Построить ещё раз</button><button type="button" onclick="lgCountAll()">Посчитать всех</button></div></figure>`;
}
function lgClearChart(){
  LG.chartTimers.forEach(t=>clearTimeout(t)); LG.chartTimers=[];
  if(LG.chartObserver) LG.chartObserver.disconnect(); LG.chartObserver=null;
}
function lgMarkColumn(i){
  const chart=document.getElementById('tale-sand-chart'); if(!chart)return;
  chart.querySelectorAll('.tale-chart-column').forEach((g,n)=>g.classList.toggle('is-selected',n===i));
  chart.querySelectorAll('.sand-column-choice').forEach((b,n)=>b.setAttribute('aria-pressed',String(n===i)));
}
function lgSelectColumn(i){
  lgClearChart(); lgMarkColumn(i);
  const n=[3,6,8,5][i], feedback=document.getElementById('sand-feedback');
  if(feedback)feedback.textContent=`Здесь ${n} ${n===3?'камня':'камней'} — значит, ${n} ${n===3?'ученика':'учеников'}.`;
}
function lgReplayChart(){
  lgClearChart(); const chart=document.getElementById('tale-sand-chart'); if(!chart)return;
  lgMarkColumn(-1); chart.classList.remove('is-building');
  chart.querySelectorAll('.tale-chart-column').forEach((g,c)=>g.querySelectorAll('.tale-chart-stone').forEach((stone,n)=>stone.style.setProperty('--stone-delay',`${c*180+n*80}ms`)));
  void chart.offsetWidth; chart.classList.add('is-building');
  document.getElementById('sand-feedback').textContent='Каждый столбец растёт от общей линии. Сравни их высоту.';
}
function lgCountAll(){
  lgClearChart(); const values=[3,6,8,5];
  const reduced=typeof matchMedia==='function'&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show=i=>{lgMarkColumn(i);const el=document.getElementById('sand-feedback');if(el)el.textContent=values.slice(0,i+1).join(' + ')+' = '+values.slice(0,i+1).reduce((a,b)=>a+b,0)+(i===3?' ученика. Мы посчитали всех!':'');};
  if(reduced){show(3);return;} show(0);
  for(let i=1;i<4;i++)LG.chartTimers.push(setTimeout(()=>show(i),i*650));
}
function lgWatchChart(){
  const chart=document.getElementById('tale-sand-chart');
  if(!chart||typeof IntersectionObserver!=='function')return;
  LG.chartObserver=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting))lgReplayChart();},{threshold:.3});
  LG.chartObserver.observe(chart);
}
function renderLegend(){
  lgClearChart();
  const screen=document.getElementById('screen');
  const ch=ARH_LEGEND[LG.ch], scenes=ARH_LEGEND_SCENES[LG.ch], question=ARH_LEGEND_QUESTIONS[LG.ch];
  const p=(n,cls='')=>{
    let text=fmtL(ch.p[n]);
    ARH_LEGEND_SPOKEN[LG.ch].forEach(q=>{
      const escaped=escL(q), at=text.indexOf(escaped); if(at<0)return;
      const punctuation=/^[.,;:!]/.test(text.slice(at+escaped.length))?text[at+escaped.length]:'';
      const spoken=escaped+punctuation;
      text=text.replace(spoken,`<span class="tale-inline-quote">${[3,5].includes(LG.ch)?'<img class="tale-inline-portrait" src="img/arch_smile.jpg" alt="" width="48" height="48"><span class="tale-said">':''}${spoken}${[3,5].includes(LG.ch)?'</span>':''}</span>`);
    });
    return `<div class="tale-prose ${cls}"><p data-legend-paragraph="${n}">${text}</p></div>`;
  };
  const pic=(n,cls='',caption=true)=>{
    const s=scenes[n];
    return `<figure class="${n===0?'tale-cover':'tale-picture'} ${cls} ${s.kind==='cutout'?'picture-cutout':''}" data-scene="${s.id}"><img src="img/legend/${s.id}.webp" srcset="img/legend/${s.id}-640.webp 640w, img/legend/${s.id}.webp 1200w" sizes="(max-width:600px) calc(100vw - 24px), (max-width:900px) 85vw, 760px" width="${s.width||1200}" height="${s.height||800}" alt="${escL(s.description)}" loading="${n===0?'eager':'lazy'}" decoding="async" ${n===0?'fetchpriority="high"':''}>${caption?`<figcaption>${escL(s.caption)}</figcaption>`:''}</figure>`;
  };
  const ornament=name=>`<div class="tale-ornament" aria-hidden="true"><img src="img/legend/ui/divider-${name}.svg" alt="" width="180" height="40"></div>`;
  const spread=(variant,content)=>`<section class="tale-spread spread-${variant}">${content}</section>`;
  const pictures=(html,cls='')=>`<div class="tale-pictures ${cls}">${html}</div>`;
  const note=t=>`<p class="tale-note">${escL(t)}</p>`;
  // Each chapter has its own composition. Original paragraphs retain their order.
  const chapters=[
    ()=> spread('sea',p(0,'drop-cap')+pic(6,'picture-wide',false)+pic(4,'picture-memory')+ornament('wave'))+
         spread('observatory',pic(1,'picture-wide')+p(1)+pic(2,'picture-far'))+
         spread('farewell',p(2,'tale-invitation')+pic(3,'picture-wide')+pic(5,'picture-near')),
    ()=> spread('workshop',p(0,'drop-cap')+pic(4,'picture-near')+ornament('thought'))+
         spread('observatory',pic(1,'picture-wide')+p(1)+pic(2,'picture-far'))+
         spread('notebook',pic(3,'picture-wide')+p(2)+pic(5,'picture-near')),
    ()=> spread('observatory',p(0,'drop-cap')+pic(4,'picture-far'))+
         spread('workshop',pic(1,'picture-wide')+p(1)+pic(3,'picture-near')+ornament('thought'))+
         spread('sea',pic(2,'picture-wide')+p(2)+pic(5,'picture-far')),
    ()=> spread('opening',p(0,'drop-cap')+pic(1,'picture-memory')+p(1))+
         spread('journey',note('Тетрадь, карандаш, термос. И большой вопрос.')+pic(9,'picture-inset',false)+pictures(pic(3,'picture-wide')+pic(2,'picture-inset'),'travel-collage')+ornament('wave'))+
         spread('workshop',pic(4,'picture-wide')+pic(8,'picture-wide',false)+p(2)+lgChart()+pic(5,'picture-inset')+p(3))+
         spread('farewell',pic(6,'picture-wide')+p(4)+pic(7,'picture-far')),
    ()=> spread('notebook',p(0,'drop-cap')+pic(1,'picture-near')+p(1))+
         spread('observatory',pictures(pic(2,'picture-wide')+pic(3,'picture-near'))+p(2)+ornament('thought'))+
         spread('notebook',pic(4,'picture-far')+p(3)+pic(5,'picture-wide')),
    ()=> spread('opening',p(0,'drop-cap')+pic(8,'picture-inset',false)+pic(1,'picture-wide')+p(1)+pic(2,'picture-memory'))+
         spread('notebook',pictures(pic(3,'picture-wide')+pic(4,'picture-near'))+p(2)+pic(5,'picture-wide')+p(3)+pic(9,'picture-wide',false)+ornament('thought'))+
         spread('farewell',pic(6,'picture-wide')+p(4)+pic(7,'picture-far')+p(5)),
    ()=> spread('laboratory',p(0,'drop-cap')+pic(2,'picture-near')+ornament('laurel'))+
         spread('workshop',pic(1,'picture-wide')+p(1)+pic(3,'picture-far'))+
         spread('laboratory',pic(4,'picture-wide')+p(2)+pic(5,'picture-near')),
    ()=> spread('citadel',p(0,'drop-cap')+pic(2,'picture-near')+ornament('star'))+
         spread('notebook',pic(1,'picture-wide')+p(1)+pic(6,'picture-wide',false)+pic(4,'picture-inset'))+
         spread('citadel',pic(3,'picture-wide')+p(2)+pic(5,'picture-near')),
    ()=> spread('torch',p(0,'drop-cap')+pic(4,'picture-wide')+ornament('star'))+
         spread('journey',pic(3,'picture-wide')+pic(2,'picture-near')+note('Рассмотри путь от одного открытия к следующему.'))+
         spread('farewell',pic(1,'picture-wide')+p(1)+pic(5,'picture-near')),
    ()=> spread('workshop',p(0)+pic(1,'picture-near')+p(1)+ornament('thought'))+
         spread('notebook',pic(2,'picture-wide')+p(2)+pic(3,'picture-far'))+
         spread('farewell',pic(4,'picture-near')+p(3)+pic(5,'picture-wide'))
  ];
  screen.innerHTML=`<article class="arh-legend legend-tale" data-chapter="${LG.ch+1}" aria-labelledby="legend-title">
    <nav class="tale-tools" aria-label="Навигация по книге"><button type="button" class="tale-return" onclick="go('path')">${lgInk('island-path')}<span>К островам</span></button><details class="tale-contents"><summary>${lgInk('book-contents')}<span>Оглавление</span></summary><nav class="tale-chapters" aria-label="Главы легенды">${ARH_LEGEND.map((item,i)=>`<button type="button" onclick="lgGo(${i})" ${i===LG.ch?'aria-current="step"':''}><span>${i+1}</span>${escL(item.t)}</button>`).join('')}</nav></details></nav>
    <div class="tale-page"><header class="tale-opening ${[0,3,5,7].includes(LG.ch)?'art-first':''}">${[0,3,5,7].includes(LG.ch)?pic(0,'picture-wide',false):''}<h2 class="tale-title" id="legend-title" tabindex="-1">${escL(ch.t)}</h2>${[0,3,5,7].includes(LG.ch)?'':pic(0,'picture-wide',false)}</header>
      ${LG.ch===0?'<p class="tale-intro">Это сказочное путешествие: учёные из разных эпох встречаются здесь, чтобы вместе с тобой исследовать мир.</p>':''}
      ${chapters[LG.ch]()}${lgQuote(ch)}
      <aside class="tale-wonder" aria-label="Твоё открытие"><p class="tale-discovery">${lgInk('archimedes-quill')}<span>${escL(question[0])}</span></p><details class="tale-hint"><summary>Подсказка</summary><p>${escL(question[1])}</p></details></aside>
      <nav class="tale-navigation" aria-label="Переход между главами"><button type="button" class="tale-prev" onclick="lgStep(-1)" ${LG.ch===0?'disabled':''}>${lgInk('page-turn','ink-back')}<span>Назад</span></button><button type="button" class="tale-next" onclick="${LG.ch<ARH_LEGEND.length-1?'lgStep(1)':"go('path')"}"><span>${LG.ch<ARH_LEGEND.length-1?'Следующая глава':'К островам'}</span>${lgInk('page-turn')}</button><span class="tale-page-count">${LG.ch+1} из ${ARH_LEGEND.length}</span></nav>
    </div>
  </article>`;
  hud();
  lgWatchChart();
}
function lgGo(n){
  if(!Number.isInteger(n)) return;
  LG.ch=Math.max(0,Math.min(ARH_LEGEND.length-1,n));
  renderLegend();
  const heading=document.getElementById('legend-title');
  if(heading) heading.focus({preventScroll:true});
  window.scrollTo({top:0,left:0,behavior:'instant'});
}
function lgStep(d){ lgGo(LG.ch+d); }
