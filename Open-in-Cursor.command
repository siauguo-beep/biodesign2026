#!/bin/bash
# Double-click in Finder, OR run from macOS Terminal: ./Open-in-Cursor.command
# Uses a minimal environment so the CLI does not attach to an already-running
# Cursor when this script is accidentally run from Cursor's integrated terminal.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
CURSOR_CLI="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
if [[ ! -x "$CURSOR_CLI" ]]; then
  osascript -e 'display dialog "未在 /Applications/Cursor.app 找到 Cursor。请把 Cursor 安装到「应用程序」文件夹。" buttons {"好"} default button 1 with title "Open in Cursor"' >/dev/null 2>&1 || true
  exit 1
fi
exec env -i \
  HOME="$HOME" \
  USER="${USER:-$(id -un)}" \
  LOGNAME="${LOGNAME:-$(id -un)}" \
  SHELL="${SHELL:-/bin/zsh}" \
  TMPDIR="${TMPDIR:-/tmp}" \
  LANG="${LANG:-en_US.UTF-8}" \
  PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin" \
  "$CURSOR_CLI" -n "$ROOT"
