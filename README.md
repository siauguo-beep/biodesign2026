# Biodesign-Project

Biodesign Challenge 2026 · **Umwelt Archive** documentation and (future) project code.

## Canonical copy (local + GitHub)

- **This repo** is the single place for BDC planning slides and project docs.  
- **Remote:** [github.com/macaumonsoon/Biodesign-Project](https://github.com/macaumonsoon/Biodesign-Project) · branch **`main`**.  
- **Default clone path on this machine:** `~/Desktop/Cursor/Biodesign-Project`

## Documents

| Path | Purpose |
|------|---------|
| [docs/bdc-umwelt-archive/PROJECT_PLAN.md](docs/bdc-umwelt-archive/PROJECT_PLAN.md) | Full project plan |
| [docs/bdc-umwelt-archive/SLIDE_DECK.md](docs/bdc-umwelt-archive/SLIDE_DECK.md) | Slide outline + demo script |
| [docs/bdc-umwelt-archive/README.md](docs/bdc-umwelt-archive/README.md) | Index inside docs folder |

## Related repo (do not duplicate BDC docs there)

- **Portfolio-ReStyle-AI** is a separate product/repo. Keep its GitHub unchanged unless that project intentionally needs BDC files.  
- **Portfolio worktree (example):** `~/.cursor/worktrees/Portfolio_ReStyle_AI_/yzq` — BDC-only docs were removed from `docs/bdc-umwelt-archive/` here to avoid duplication; edit BDC materials only in **this** clone.

## Open in Cursor

### Dock 只会显示一个 Cursor 图标（正常）

macOS 把**同一款 App 的所有窗口**归在一个 Dock 图标下，**不会出现第二个 Cursor 图标**。请 **按住 Dock 里的 Cursor 图标**（或点开后用菜单 **窗口**），查看是否已有另一个窗口；或用 **⌘\`** 在窗口间切换。

### 不要只在 Cursor「内置终端」里运行 `cursor …`

内置终端里带有 `VSCODE_*` / `CURSOR_*` 环境变量，CLI 往往会**连回当前这个 Cursor**，看起来就像「没打开新东西」。请改用下面任一方式。

1. **Finder：** 双击 **`Open-in-Cursor.command`**（脚本会用干净环境调用 `cursor -n`，避免误连当前实例）。首次若提示安全：右键 → **打开**。
2. **系统「终端」**（Terminal.app，不是 Cursor 底部那个）：  
   ```bash
   cd "$HOME/Desktop/Cursor/Biodesign-Project"   # 按实际路径改
   ./Open-in-Cursor.command
   ```  
   或：  
   `"/Applications/Cursor.app/Contents/Resources/app/bin/cursor" -n "$HOME/Desktop/Cursor/Biodesign-Project"`
3. **LaunchServices：**  
   `open -na "Cursor" --args -n "$HOME/Desktop/Cursor/Biodesign-Project"`

## Sync

```bash
cd ~/Desktop/Cursor/Biodesign-Project
git pull origin main
```
