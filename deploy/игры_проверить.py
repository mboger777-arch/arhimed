"""Проверка игр к урокам: из каждого урока по плашке (в комиксе 314 — по кнопке «🎮 Игра»)
открывается своя игра, на её заставке видна «← В урок», и она возвращает в тот же урок.
Телефон вертикально и горизонтально. Нужен сервер (preview «arhimed» на 8123);
прод: BASE='https://123.teramont.pro/MVP/' PYTHONPATH=.py-libs python3 deploy/игры_проверить.py
Норма: во всех строках «кнопка 1», «видна «В урок»: True», назад — тот же урок; ошибок нет."""
import os
from playwright.sync_api import sync_playwright
br='браузеры/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell'
BASE=os.environ.get('BASE','http://127.0.0.1:8123/')
with sync_playwright() as p:
    b=p.chromium.launch(executable_path=br)
    for (W,H) in [(375,812),(812,375)]:
        ctx=b.new_context(viewport={'width':W,'height':H}, has_touch=True, is_mobile=True, device_scale_factor=2)
        pg=ctx.new_page(); err=[]; pg.on('pageerror', lambda e, pg=pg: err.append(pg.url.split('/')[-2]+': '+str(e)[:90]))
        for id,g in [(253,'desyat-fonarei'),(255,'vesy-znaki'),(60,'chasy'),(30,'sto-monetok'),(314,'sad-umnozheniya'),(71,'tsyplyata-parami'),(73,'igrushki-na-polkah'),(74,'polovina-yabloka'),(81,'gonka-za-sotymi'),(197,'kubicheskiy-mir'),(309,'ostrov-hitryh-igr'),(310,'prostye-kristally'),(638,'yarmarka-podskazok'),(68,'zvezdnaya-pesnya'),(500,'tima-i-glyuk')]:
            pg.goto('about:blank')   # иначе смена одного #хеша оставляет открытым комикс прошлого урока
            pg.goto(BASE+'index.html#lesson-'+str(id), timeout=90000); pg.wait_for_timeout(3500 if '127.0.0.1' in BASE else 8000)
            pg.evaluate("()=>document.getElementById('pinPadOverlay')?.remove()")
            sel = '.игра-чип:visible' if pg.locator('.игра-чип:visible').count() else '.игра-плашка:visible'   # у комиксов — кнопка в шапке
            ok_btn = pg.locator(sel).count()
            pg.locator(sel).first.dispatch_event('click'); pg.wait_for_timeout(6000)
            u1 = pg.url
            back = pg.locator('a[href*="index.html"]')
            vis = back.is_visible()
            back.dispatch_event('click')
            lv = None
            for _ in range(40):          # прод перезагружает страницу с ?b=<версия> — ждём до 20 с
                pg.wait_for_timeout(500)
                try: lv = pg.evaluate("()=>typeof LV!=='undefined'&&LV&&document.querySelector('#screen h2, .comic-ov')?LV.id:null")
                except Exception: lv = None
                if lv: break
            u2 = pg.url
            print(W, id, 'кнопка', ok_btn, '| в игре:', u1.split('8123/')[-1].split('teramont.pro/')[-1], 'видна «В урок»:', vis, '| назад:', u2.split('/')[-1], 'урок', lv)
        print('ошибки', len(err), sorted(set(err))[:6]); ctx.close()
    b.close()
