#!/bin/bash
# Double-click in Finder, or run from Terminal: ./Open-in-Cursor.command
# Uses macOS Launch Services (open -a) so Cursor gets a normal environment.
# Avoids "Process completed" with no folder loaded (can happen with env -i + CLI).
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
if ! open -a "Cursor" "$ROOT"; then
  CURSOR_CLI="/Applications/Cursor.app/Contents/Resources/app/bin/cursor"
  if [[ -x "$CURSOR_CLI" ]]; then
    exec "$CURSOR_CLI" -n "$ROOT"
  fi
  osascript -e 'display dialog "无法打开 Cursor。请确认已安装 Cursor 且在「应用程序」中。" buttons {"好"} default button 1 with title "Open in Cursor"' >/dev/null 2>&1 || true
  exit 1
fi
