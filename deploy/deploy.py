#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Выкладка АРХИМЕД MVP на сервер прямо из GitHub.

Пароли и адрес сервера НЕ хранятся в репозитории. Скрипт берёт их по порядку:
  1) переменные окружения: ARH_HOST, ARH_USER, ARH_PASS
  2) файл deploy/deploy.local.env (он в .gitignore) со строками ВИД=значение
  3) файл ~/.arhimed_deploy (тот же формат)

Что делает скрипт:
  * скачивает tar.gz ветки (по умолчанию main) с GitHub;
  * разворачивает новый код в /opt, сохраняя ключ_яндекса.txt и venv;
  * перезапускает systemd-сервис;
  * проверяет, что сайт отвечает 200 и содержит ожидаемую версию (v=NNN),
    сверив её с локальным MVP/index.html.

Запуск:  PYTHONPATH=.py-libs python3 deploy/deploy.py
"""
import os
import re
import sys
import urllib.parse
from pathlib import Path

REPO = os.environ.get('ARH_REPO', 'alenamissia-source/arhimed')
BRANCH = os.environ.get('ARH_BRANCH', 'main')
SITE = os.environ.get('ARH_SITE', 'https://123.teramont.pro/MVP/')
SERVICE = os.environ.get('ARH_SERVICE', 'arhimed')
ROOT = os.environ.get('ARH_ROOT', '/opt')
APP = os.environ.get('ARH_APP', 'arhimed')
KEYFILE = os.environ.get('ARH_KEYFILE', 'ключ_яндекса.txt')
LOCAL_INDEX = Path(os.environ.get('ARH_LOCAL_INDEX', 'MVP/index.html'))
# приложение родителя и API кодов детей
SITE_PARENT = SITE + 'parent/'
SITE_PARENT_OLD = SITE + urllib.parse.quote('родитель') + '/'
SITE_API = SITE.rsplit('/MVP/', 1)[0] + '/api/kid'
DATADIR = f'{ROOT}/{APP}-data'

HERE = Path(__file__).resolve().parent
ENV_FILE = HERE / 'deploy.local.env'
HOME_FILE = Path.home() / '.arhimed_deploy'


def read_env_file(path):
    data = {}
    try:
        for line in path.read_text(encoding='utf-8').splitlines():
            line = line.strip()
            if not line or line.startswith('#') or '=' not in line:
                continue
            k, v = line.split('=', 1)
            data[k.strip()] = v.strip().strip('"').strip("'")
    except FileNotFoundError:
        pass
    return data


def credentials():
    """Возвращает (host, user, password) или объясняет, чего не хватает."""
    file_env = {}
    for src in (ENV_FILE, HOME_FILE):
        for k, v in read_env_file(src).items():
            file_env.setdefault(k, v)

    def get(name):
        return os.environ.get(name) or file_env.get(name)

    host, user, pwd = get('ARH_HOST'), get('ARH_USER'), get('ARH_PASS')
    if not (host and user and pwd):
        print('Нет данных для подключения к серверу.\n'
              'Задай переменные ARH_HOST, ARH_USER, ARH_PASS или создай файл\n'
              f'  {ENV_FILE}\n'
              'со строками:\n'
              '  ARH_HOST=адрес\n  ARH_USER=пользователь\n  ARH_PASS=пароль\n'
              f'Файл {ENV_FILE.name} в .gitignore, в репозиторий он не попадёт.')
        sys.exit(2)
    return host, user, pwd


def expected_version():
    """Версия из локального index.html — чтобы проверить, что доехало именно это."""
    try:
        text = LOCAL_INDEX.read_text(encoding='utf-8', errors='ignore')
    except OSError:
        return None
    marks = re.findall(r'v=(\d+)', text)
    return marks[0] if marks else None


def remote_script():
    """Инкрементальная выкладка: на сервере живёт постоянный git-клон,
    поэтому тянется только то, что изменилось, а не весь архив с видео."""
    return f'''
set -e
cd {ROOT}
START=$(date +%s)

# 1) постоянный клон: забираем только новые объекты
if [ -d {ROOT}/{APP}-src/.git ]; then
  echo "--- обновляю клон (только изменения):"
  git -C {ROOT}/{APP}-src fetch --depth 1 origin {BRANCH} -q
  git -C {ROOT}/{APP}-src reset --hard FETCH_HEAD -q
else
  echo "--- первый раз: делаю клон репозитория"
  rm -rf {ROOT}/{APP}-src
  git clone --depth 1 -q https://github.com/{REPO}.git {ROOT}/{APP}-src
fi
echo "--- коммит на сервере: $(git -C {ROOT}/{APP}-src rev-parse --short HEAD)"

# 2) собираем новую версию из клона: hardlinks, без копирования мегабайтов
rm -rf {ROOT}/{APP}-new
cp -al {ROOT}/{APP}-src {ROOT}/{APP}-new

# 3) ключ и окружение переносим отдельно (они живут только на сервере)
cp {ROOT}/{APP}/{KEYFILE} {ROOT}/{APP}-new/{KEYFILE} 2>/dev/null || true
if [ -d {ROOT}/{APP}/venv ]; then
  cp -a {ROOT}/{APP}/venv {ROOT}/{APP}-new/venv
  {ROOT}/{APP}-new/venv/bin/pip install -q --disable-pip-version-check aiohttp 2>/dev/null || true
else
  python3 -m venv {ROOT}/{APP}-new/venv
  {ROOT}/{APP}-new/venv/bin/pip install -q --disable-pip-version-check aiohttp
fi

# 4) переключаем и перезапускаем
rm -rf {ROOT}/{APP}_old
mv {ROOT}/{APP} {ROOT}/{APP}_old
mv {ROOT}/{APP}-new {ROOT}/{APP}
systemctl restart {SERVICE}
sleep 3

# 5) каталог с кодами детей — ВНЕ папки выкладки, поэтому обновления его не трогают
mkdir -p {DATADIR}/kids
echo "--- коды детей на сервере:"
ls {DATADIR}/kids 2>/dev/null | wc -l

echo "--- версия на сервере:"
grep -o 'v=[0-9]*' {ROOT}/{APP}/MVP/index.html | sort | uniq -c | head
echo "--- ключ на месте:"
test -f {ROOT}/{APP}/{KEYFILE} && echo YES || echo NO
echo "--- ответ сайта:"
curl -s -o /dev/null -w "%{{http_code}}" {SITE} || true
echo ""
echo "--- ответ приложения родителя:"
curl -s -o /dev/null -w "%{{http_code}}" '{SITE_PARENT}' || true
echo ""
echo "--- старый адрес родителя (редирект):"
curl -s -o /dev/null -w "%{{http_code}}" '{SITE_PARENT_OLD}' || true
echo ""
echo "--- ответ API кодов:"
curl -s {SITE_API} | head -c 90 || true
echo ""
echo "--- выкладка заняла: $(( $(date +%s) - START )) c"
'''


def main():
    try:
        import paramiko
    except ImportError:
        print('Нужен paramiko. Запусти так:\n'
              '  PYTHONPATH=.py-libs python3 deploy/deploy.py')
        sys.exit(3)

    host, user, pwd = credentials()
    want = expected_version()
    if want:
        print(f'Ожидаемая версия в index.html: v{want}')

    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=user, password=pwd, timeout=30)
    stdin, stdout, stderr = client.exec_command(remote_script(), timeout=900)
    out = stdout.read().decode('utf-8', 'replace')
    err = stderr.read().decode('utf-8', 'replace')
    code = stdout.channel.recv_exit_status()
    client.close()

    print('EXIT:', code)
    print(out.strip())
    if err.strip():
        print('STDERR:', err[-1200:])

    ok = code == 0
    if want:
        if f'v={want}' in out:
            print(f'ПРОВЕРКА: на сервере развёрнута версия v{want} — совпадает с локальной')
        else:
            print(f'ПРОВЕРКА НЕ ПРОШЛА: ждали v{want}, на сервере его не видно')
            ok = False
    if 'YES' not in out:
        print('ВНИМАНИЕ: ключ_яндекса.txt на сервере не найден')
        ok = False
    # приложение родителя: страница и API кодов должны отвечать
    par = re.search(r'ответ приложения родителя:\s*(\d+)', out)
    if par and par.group(1) == '200':
        print('ПРОВЕРКА: приложение родителя отвечает 200')
    else:
        print('ПРОВЕРКА НЕ ПРОШЛА: приложение родителя не отвечает (ждём 200)')
        ok = False
    if 'arhimed-kid' in out:
        print('ПРОВЕРКА: API кодов детей работает')
    else:
        print('ПРОВЕРКА НЕ ПРОШЛА: API кодов детей не отвечает')
        ok = False
    print('ИТОГ:', 'выложено успешно' if ok else 'есть замечания, смотри вывод выше')
    sys.exit(0 if ok else 1)


if __name__ == '__main__':
    main()
