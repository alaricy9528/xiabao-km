#!/bin/sh
# 判断卡插图渲染：figs/<name>.html -> <outdir>/<name>-{light,dark}.png
# 用法：sh figs/render.sh <name> [width] [outdir-relative-to-repo]
#   默认输出到 quartz/static/learn-figs
#   判断卡请传卡片目录，例如 content/learn/d3/skills/os-contract-check
# 依赖：本机 Chrome；图源里需有 document.title = 'H=' + 内容高度 这一行
set -e

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
ROOT_WIN="F:/iliby/ai/xiabao-km"
ROOT_POSIX="/f/iliby/ai/xiabao-km"
NAME="$1"
W="${2:-600}"
RELDIR="${3:-quartz/static/learn-figs}"
SRC="file:///$ROOT_WIN/figs/$NAME.html"
OUT="$ROOT_POSIX/$RELDIR"
OUT_WIN="$ROOT_WIN/$RELDIR"
mkdir -p "$OUT"

measure() {
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --window-size="$W",2400 --virtual-time-budget=2500 \
    --dump-dom "$SRC?t=$1" 2>/dev/null \
    | grep -o 'H=[0-9]\+' | head -1 | cut -d= -f2
}

for t in light dark; do
  H=$(measure "$t")
  if [ -z "$H" ]; then echo "measure failed: $NAME ($t)" >&2; exit 1; fi
  "$CHROME" --headless=new --disable-gpu --hide-scrollbars \
    --force-device-scale-factor=2 --window-size="$W","$H" \
    --virtual-time-budget=2500 \
    --screenshot="$OUT_WIN/$NAME-$t.png" "$SRC?t=$t" 2>/dev/null
  echo "$RELDIR/$NAME-$t.png  ${W}x${H} @2x"
done
