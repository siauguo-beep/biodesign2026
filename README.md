# Biodesign-Project · BDC 2026 Summit

**Art / design project (final title):** *Extinction Archive: AI Memorial for Lost Species – Umwelt Archive: A Sensory Time Capsule*

Biodesign Challenge 2026 — **Umwelt Archive / Extinction Archive**: documentation, slide exports, build scripts, and (future) prototype code.

## Canonical GitHub copy

- **Remote:** [github.com/macaumonsoon/Biodesign-Project](https://github.com/macaumonsoon/Biodesign-Project) · branch **`main`**
- This folder may live at `~/Desktop/Cursor/Biodesign_Project_2` or `~/Desktop/Cursor/Biodesign-Project` depending on your clone; **pull from the remote above** to stay in sync.

## Quick links (Extinction Archive workspace)

| Document | Description |
|----------|-------------|
| [**PROJECT_PLAN.md**](PROJECT_PLAN.md) | Master project plan (team, milestones, repo map) |
| [**BDC_2026_Extinction_Archive_Planning_Document.md**](BDC_2026_Extinction_Archive_Planning_Document.md) | Citations, storyboard IDs, T5 context, verification notes |
| [**templates/reflection-log-webxr.html**](templates/reflection-log-webxr.html) | End-of-experience reflection UI template |
| [**docs/GITHUB_PDF_PREVIEW.md**](docs/GITHUB_PDF_PREVIEW.md) | **GitHub in-browser PDF preview** URL for the summit deck |

### Summit slide deck (PDF on GitHub)

- **Small export (preview):** `slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf`
- **Full PPTX (optional):** `slides/export/[FINAL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pptx`
- Opening help: [`slides/export/HOW_TO_OPEN_PPTX.md`](slides/export/HOW_TO_OPEN_PPTX.md)
- Build / merge scripts: `scripts/merge_extinction_final_deck.py`, `scripts/build_final_presentation.py`, `scripts/beautify_extinction_summit_visual.py`

## Documents (original Umwelt docs tree)

| Path | Purpose |
|------|---------|
| [docs/bdc-umwelt-archive/PROJECT_PLAN.md](docs/bdc-umwelt-archive/PROJECT_PLAN.md) | Full project plan (duplicate tree) |
| [docs/bdc-umwelt-archive/SLIDE_DECK.md](docs/bdc-umwelt-archive/SLIDE_DECK.md) | Slide outline + demo script |
| [docs/bdc-umwelt-archive/README.md](docs/bdc-umwelt-archive/README.md) | Index inside docs folder |

### BDC 2026 course reference

All competition guides and Cursor context live under **`BDC2026_context-docs/`**.

| Path | Purpose |
|------|---------|
| [BDC2026_context-docs/biodesign_cursor_agent.md](BDC2026_context-docs/biodesign_cursor_agent.md) | Cursor / AI partner context |
| [BDC2026_context-docs/The complete guide to the 2026 Biodesign Challenge.md](BDC2026_context-docs/The%20complete%20guide%20to%20the%202026%20Biodesign%20Challenge.md) | Full 2026 BDC overview |
| Other `BDC2026_context-docs/*.md` | Resource guide, ideas, cheat sheet |
| `BDC2026_context-docs/*.docx` | Word exports where applicable |

### Workspace layout (ideation → deliverables)

| Path | Purpose |
|------|---------|
| `01_ideation/` | BDC ideation workbook steps |
| `02_research/` | Biology, prior art, references |
| `03_prototype/` | Code, assets, physical model notes |
| `04_deliverables/` | Presentation, video, renderings, website |
| `05_sprint_plan/` | Timeline / sprint notes |

## Tech direction (Extinction Archive build)

- **WebXR:** A-Frame / Three.js  
- **Summit / v1:** web-first; minimal physical anchor + QR; no living biosensor demo required for v1

## Related repo

- **Portfolio-ReStyle-AI** is a separate product/repo — do not duplicate BDC docs there.

## Open in Cursor (macOS)

### Dock 只会显示一个 Cursor 图标（正常）

macOS 把**同一款 App 的所有窗口**归在一个 Dock 图标下。请 **按住 Dock 里的 Cursor 图标**（或 **⌘\`** 切换窗口）。

### 不要只在 Cursor「内置终端」里运行 `cursor …`

内置终端带有 `VSCODE_*` / `CURSOR_*` 环境变量，CLI 往往会连回当前 Cursor。

1. **Finder：** 双击 **`Open-in-Cursor.command`**（若存在于本仓库根目录）。  
2. **系统终端（Terminal.app）：** `cd` 到本仓库后 `open -a "Cursor" "$PWD"`。

### 已经开了 Cursor，但左侧没有文件树？

- **⌘B** 显示侧栏 · **⌘⇧E** 资源管理器 · **File → Open Folder…** 重新打开本目录。

## Sync

```bash
cd /path/to/this/repo
git pull origin main
git push origin main
```

First-time setup: **[docs/GITHUB_SYNC.md](docs/GITHUB_SYNC.md)**

---

## 项目简介（中文）

**《灭绝档案》** 参赛方案：以 **古生物钟学** 与 **时间生态位** 为核心，结合 WebXR、不确定度 UI 与伦理分叉，讨论去灭绝与生物多样性记忆。详细文献与分镜见 **`BDC_2026_Extinction_Archive_Planning_Document.md`**。
