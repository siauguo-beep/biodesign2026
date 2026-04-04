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

If **File → Open Folder…** or running `cursor` from **inside Cursor** does nothing, use one of these (they force a **new window** with `-n`):

1. **Finder:** double-click **`Open-in-Cursor.command`** in this folder (first time: right-click → **Open** if macOS warns about downloaded scripts).
2. **Terminal.app / iTerm** (not Cursor’s integrated terminal):  
   `"/Applications/Cursor.app/Contents/Resources/app/bin/cursor" -n "$HOME/Desktop/Cursor/Biodesign-Project"`  
   Adjust the path if your clone is not under `Desktop/Cursor`.
3. **LaunchServices:**  
   `open -na "Cursor" --args -n "$HOME/Desktop/Cursor/Biodesign-Project"`

## Sync

```bash
cd ~/Desktop/Cursor/Biodesign-Project
git pull origin main
```
