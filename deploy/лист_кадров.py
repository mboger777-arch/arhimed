"""Лист кадров урока: снимает выбранные шаги урока и складывает их в одну картинку.

Зачем. Гейтов в проекте нет (deploy/ИНСТРУКЦИЯ_ДЛЯ_ИИ.md, раздел 7) — урок проверяют
глазами. Лист показывает все шаги рядом, поэтому наложения, обрезанные подписи и пустые
кадры видны сразу. Заодно скрипт замеряет каждый шаг: NaN/undefined в разметке, ширина
страницы (переполнение по горизонтали) и пустой ли кадр.

Запуск (нужен поднятый сервер: preview «arhimed» или `python3 -m http.server 8123 --directory MVP`):

    PYTHONPATH=.py-libs python3 deploy/лист_кадров.py 121 8 1,2,3,4,5,6 /tmp/121.png

Аргументы: id урока, класс профиля, номера шагов через запятую (с 1), путь к картинке.
Переменные окружения:
    ST    — JSON-состояние урока (подставляется в CHS[lidKey(id)] перед каждым шагом),
            например ST='{"ц3":2,"ок3":true}' — так снимают «середину» и «финал» заданий;
    PORT  — порт локального сервера (по умолчанию 8123);
    URL   — открыть другой адрес, например прод: URL='https://123.teramont.pro/MVP/?b=912';
    WAIT  — сколько мс ждать после перерисовки шага (по умолчанию 1200; для анимаций 2600);
    COLS  — сколько кадров в ряд (по умолчанию 4);
    W, H  — размер окна (по умолчанию 375×812, ширина телефона).

Вывод: «ошибки [...]» (ошибки страницы) и список замеров по шагам
[{'nan': False, 'w': 375, 'пусто': False}, ...]. Норма: nan False, w ≤ ширины окна, пусто False.

Локальный сервер иногда отдаёт 230+ скриптов с гонкой («init is not defined», «…reading
'mount'») — скрипт сам перезагружает страницу до четырёх раз. Ошибки, оставшиеся после
этого, — настоящие.
"""
import sys, os, json, glob, io
from playwright.sync_api import sync_playwright
from PIL import Image

урок, класс, шаги, выход = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
ст = json.loads(os.environ.get('ST', '{}'))
ждать = int(os.environ.get('WAIT', '1200'))
порт = os.environ.get('PORT', '8123')
адрес = os.environ.get('URL', f'http://127.0.0.1:{порт}/?b=лист')
колонки = int(os.environ.get('COLS', '4'))
ширина, высота = int(os.environ.get('W', '375')), int(os.environ.get('H', '812'))

корень = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
браузер = os.path.join(корень, 'браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell')
if not os.path.exists(браузер):
    найдено = glob.glob(os.path.expanduser('~/Library/Caches/ms-playwright/chromium*/chrome-*/*/Contents/MacOS/*'))
    браузер = найдено[0] if найдено else None

with sync_playwright() as p:
    b = p.chromium.launch(**({'executable_path': браузер} if браузер else {}))
    pg = b.new_page(viewport={'width': ширина, 'height': высота}, device_scale_factor=1.5)
    ошибки = []
    pg.on('pageerror', lambda e: ошибки.append(str(e)))
    for попытка in range(4):
        ошибки.clear()
        pg.goto(адрес, timeout=90000)
        pg.wait_for_load_state('networkidle')
        pg.wait_for_timeout(1500 if адрес.startswith('http://127') else 4000)
        if pg.evaluate("()=>typeof openLessonView==='function'&&typeof chRender==='function'") and not ошибки:
            break
    кадры, замеры = [], []
    for k in [int(x) for x in шаги.split(',')]:
        pg.evaluate("""([у,кл,k,ст])=>{ document.getElementById('pinPadOverlay')?.remove(); DB.profile={name:'В',klass:кл}; openLessonView(+у);
          const lk=(typeof lidKey==='function')?lidKey(+у):String(у); CHS[lk]=JSON.parse(JSON.stringify(ст)); LV.step=k-1; chRender(0); window.scrollTo(0,0); }""",
                    [урок, класс, k, ст])
        pg.wait_for_timeout(ждать)
        замеры.append(pg.evaluate("""()=>{ const r=document.querySelector('#lvis');
          return {nan:/NaN|undefined/.test(r?r.innerHTML:''), w:document.documentElement.scrollWidth, пусто:!(r&&r.querySelector('.s6'))}; }"""))
        el = pg.query_selector('#lvis .s6') or pg.query_selector('#lvis')
        кадры.append(Image.open(io.BytesIO(el.screenshot())))
    W = max(i.width for i in кадры)
    ряды = [кадры[i:i + колонки] for i in range(0, len(кадры), колонки)]
    Hs = [max(i.height for i in r) for r in ряды]
    лист = Image.new('RGB', (W * колонки + 8 * (колонки - 1), sum(Hs) + 8 * (len(ряды) - 1)), (34, 34, 34))
    y = 0
    for r, h in zip(ряды, Hs):
        for j, i in enumerate(r):
            лист.paste(i, (j * (W + 8), y))
        y += h + 8
    if лист.width > 1600:
        k = 1600 / лист.width
        лист = лист.resize((int(лист.width * k), int(лист.height * k)), Image.LANCZOS)
    лист.save(выход)
    print('ошибки', ошибки)
    print(замеры)
    b.close()
