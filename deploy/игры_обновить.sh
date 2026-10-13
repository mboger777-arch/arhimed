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
# Без аргументов обновляет все пять. После — ритуал версии и выкладка как обычно.
set -e
cd "$(dirname "$0")/.."
ИГРЫ=${*:-"desyat-fonarei vesy-znaki chasy sto-monetok sad-umnozheniya"}
ВРЕМ=$(mktemp -d)
for g in $ИГРЫ; do
  echo "--- $g"
  git clone -q --depth 1 "https://github.com/mboger777-arch/$g.git" "$ВРЕМ/$g"
  echo "    коммит игры: $(git -C "$ВРЕМ/$g" log -1 --format='%h %ad %s' --date=short)"
  rsync -a --delete --exclude .git --exclude .nojekyll "$ВРЕМ/$g/" "MVP/games/$g/"
  f="MVP/games/$g/index.html"
  sed -i '' '/<link rel="manifest"/d' "$f"
  grep -q back_to_lesson "$f" || sed -i '' 's|</body>|<script src="../back_to_lesson.js"></script>\
</body>|' "$f"
  grep -q back_to_lesson "$f" && echo "    кнопка «В урок» подключена"
done
rm -rf "$ВРЕМ"
echo "Готово. Проверь: PYTHONPATH=.py-libs python3 deploy/игры_проверить.py"
