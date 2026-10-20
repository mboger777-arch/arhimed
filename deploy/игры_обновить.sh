#!/bin/bash
# Обновить копии игр начальной школы в MVP/games/ из их репозиториев на GitHub.
#
# Игры живут в отдельных репозиториях github.com/mboger777-arch/<папка> (там их
# собирают и публикуют на GitHub Pages). В приложение кладётся копия сборки и две
# правки к ней:
#   • убрана ссылка на manifest игры — игра открывается внутри АРХИМЕДа и не должна
#     предлагать поставить себя отдельным приложением;
#   • последним скриптом подключён ../back_to_lesson.js — кнопка «← В урок».
# Какая игра к какому уроку — MVP/js/lesson_games.js (таблица ИГРЫ).
#
# Запуск из корня репозитория:  bash deploy/игры_обновить.sh [папка ...]
# Без аргументов обновляет все тринадцать. После — ритуал версии и выкладка как обычно.
set -e
cd "$(dirname "$0")/.."
GAMES=${*:-"desyat-fonarei vesy-znaki chasy sto-monetok sad-umnozheniya tsyplyata-parami igrushki-na-polkah polovina-yabloka kubicheskiy-mir gonka-za-sotymi yarmarka-podskazok prostye-kristally ostrov-hitryh-igr"}
TMPD=$(mktemp -d)
for g in $GAMES; do
  echo "--- $g"
  git clone -q --depth 1 "https://github.com/mboger777-arch/$g.git" "$TMPD/$g"
  echo "    коммит игры: $(git -C "$TMPD/$g" log -1 --format='%h %ad %s' --date=short)"
  # снимки экрана, инструменты и черновики автора игре не нужны — в приложение не копируем
  rsync -a --delete --exclude .git --exclude .nojekyll --exclude shots --exclude tools --exclude refs --exclude probe.txt --exclude PROGRESS.md "$TMPD/$g/" "MVP/games/$g/"
  f="MVP/games/$g/index.html"
  sed -i '' '/<link rel="manifest"/d' "$f"
  grep -q back_to_lesson "$f" || sed -i '' 's|</body>|<script src="../back_to_lesson.js"></script>\
</body>|' "$f"
  grep -q back_to_lesson "$f" && echo "    кнопка «В урок» подключена"
done
rm -rf "$TMPD"
echo "Готово. Проверь: PYTHONPATH=.py-libs python3 deploy/игры_проверить.py"
