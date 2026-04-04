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

### BDC 2026 course reference (single copy)

All competition guides, Cursor agent context, and Word exports live under **`BDC2026_context-docs/`** (no duplicate copies at repo root).

| Path | Purpose |
|------|---------|
| [BDC2026_context-docs/biodesign_cursor_agent.md](BDC2026_context-docs/biodesign_cursor_agent.md) | Cursor / AI partner context for BDC |
| [BDC2026_context-docs/The complete guide to the 2026 Biodesign Challenge.md](BDC2026_context-docs/The%20complete%20guide%20to%20the%202026%20Biodesign%20Challenge.md) | Full 2026 BDC overview |
| [BDC2026_context-docs/BDC_2026_Comprehensive_Resource_Guide.md](BDC2026_context-docs/BDC_2026_Comprehensive_Resource_Guide.md) | Resource guide |
| [BDC2026_context-docs/BDC_2026_AI_Biodesign_Project_Ideas.md](BDC2026_context-docs/BDC_2026_AI_Biodesign_Project_Ideas.md) | Code-forward project ideas |
| [BDC2026_context-docs/BDC_2026_Quick_Reference_Cheat_Sheet.md](BDC2026_context-docs/BDC_2026_Quick_Reference_Cheat_Sheet.md) | Cheat sheet |
| `BDC2026_context-docs/*.docx` | Same materials in Word where applicable |

### Workspace layout (ideation → deliverables)

| Path | Purpose |
|------|---------|
| `01_ideation/` | Step folders for the BDC ideation workbook |
| `02_research/` | Biology, prior art, references |
| `03_prototype/` | Code, assets, physical model notes |
| `04_deliverables/` | Presentation, video, renderings, website |
| `05_sprint_plan/` | Timeline / sprint notes |

## Related repo (do not duplicate BDC docs there)

- **Portfolio-ReStyle-AI** is a separate product/repo. Keep its GitHub unchanged unless that project intentionally needs BDC files.  
- **Portfolio worktree (example):** `~/.cursor/worktrees/Portfolio_ReStyle_AI_/yzq` — BDC-only docs were removed from `docs/bdc-umwelt-archive/` here to avoid duplication; edit BDC materials only in **this** clone.

## Open in Cursor

### Dock 只会显示一个 Cursor 图标（正常）

macOS 把**同一款 App 的所有窗口**归在一个 Dock 图标下，**不会出现第二个 Cursor 图标**。请 **按住 Dock 里的 Cursor 图标**（或点开后用菜单 **窗口**），查看是否已有另一个窗口；或用 **⌘\`** 在窗口间切换。

### 不要只在 Cursor「内置终端」里运行 `cursor …`

内置终端里带有 `VSCODE_*` / `CURSOR_*` 环境变量，CLI 往往会**连回当前这个 Cursor**，看起来就像「没打开新东西」。请改用下面任一方式。

1. **Finder：** 双击 **`Open-in-Cursor.command`**（用系统 `open -a Cursor` 打开本文件夹）。首次若提示安全：右键 → **打开**。  
   也可双击 **`Biodesign-Project.code-workspace`**（若已关联到 Cursor），效果等同打开整个项目。
2. **系统「终端」**（Terminal.app，不是 Cursor 底部那个）：  
   ```bash
   cd "$HOME/Desktop/Cursor/Biodesign-Project"   # 按实际路径改
   open -a "Cursor" "$PWD"
   ```  
   或：`./Open-in-Cursor.command`  
   仍可用 CLI：`"/Applications/Cursor.app/Contents/Resources/app/bin/cursor" -n "$HOME/Desktop/Cursor/Biodesign-Project"`（**建议加 `-n`**；不要省略。）

### 已经开了 Cursor，但左侧没有文件树？

- **显示主侧栏：** **⌘B**  
- **聚焦资源管理器：** **⌘⇧E**（Explorer）  
- 若曾关掉文件夹：菜单 **File → Open Folder…** 再选本目录。

### 关于终端里「Process completed」

若以前用的脚本立刻结束且界面仍是欢迎页，多半是启动方式异常。当前 **`Open-in-Cursor.command`** 已改为 **`open -a "Cursor"`**，请 **先 `git pull`** 再试一次。

## Sync

```bash
cd ~/Desktop/Cursor/Biodesign-Project
git pull origin main
```
