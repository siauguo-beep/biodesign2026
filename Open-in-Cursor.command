#!/bin/bash
# Double-click this file in Finder to open this repo in a new Cursor window.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
CURSOR_CLI="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
if [[ ! -x "$CURSOR_CLI" ]]; then
  osascript -e 'display dialog "未在 /Applications/Cursor.app 找到 Cursor。请把 Cursor 安装到「应用程序」文件夹。" buttons {"好"} default button 1 with title "Open in Cursor"' >/dev/null 2>&1 || true
  exit 1
fi
exec "$CURSOR_CLI" -n "$ROOT"
