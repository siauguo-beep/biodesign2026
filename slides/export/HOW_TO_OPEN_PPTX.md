# How to open the deck / 如何打开演示文稿

## GitHub: use PDF for in-browser preview / 在 GitHub 网页里预览

**GitHub does not preview `.pptx`.** Use the **small PDF** export in this folder:

- File: **`[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf`**
- After push (URL-encoded — copy from here or from [`docs/GITHUB_PDF_PREVIEW.md`](../../docs/GITHUB_PDF_PREVIEW.md)):  
  `https://github.com/YOUR_USER/YOUR_REPO/blob/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf`

See **[docs/GITHUB_PDF_PREVIEW.md](../../docs/GITHUB_PDF_PREVIEW.md)** for the exact URL pattern.

**中文：** 想在 GitHub 网页里直接看幻灯片内容，请打开仓库里的 **PDF** 版本；`.pptx` 只能下载后用 Office 打开。

---

## Why a local “link” might not work / 为什么本机链接打不开

The paths below are **files on your computer**, not a website.  
Clicking a path in **GitHub Markdown** without cloning will not open a local file.

以下路径是**本机文件**。未克隆仓库时，浏览器无法打开你电脑上的路径。

---

## Open in Finder (Mac) / 用访达打开

1. Open **Finder** → **Go** → **Go to Folder…** (⇧⌘G)  
2. Paste this path (adjust `dad71` if your username differs):

```
/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export
```

3. **Recommended (works without PowerPoint):** double-click  
   **`Archive_of_Extinction_Final_BDC2026.pdf`** — opens in **Preview**.

4. For editing: **`Archive_of_Extinction_Final_BDC2026.pptx`** — single **canonical** final deck (synthesized research + process).  
   Use PowerPoint / Keynote / Google Slides if installed.

| File | Note |
|------|------|
| `Archive_of_Extinction_Final_BDC2026.pptx` | **Final** deck (use for BDC) |
| `Archive_of_Extinction_Final_BDC2026.pdf` | Same content, **GitHub preview** + Preview.app |
| `BDC_Summit_Extinction_Archive_2026.pptx` | Older generator; prefer **Final** above |
| `Extinction_Archive_Summit_2026.pptx` | Duplicate of older summit file (short name only) |

---

## Terminal (Mac) / 终端一键打开

```bash
# PDF (no Office required)
open "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Archive_of_Extinction_Final_BDC2026.pdf"
```

If `open file.pptx` fails with **kLSApplicationNotFoundErr**, you have no app registered for `.pptx` — use the **PDF** line above or install **Keynote** (free) / **PowerPoint**.

---

## Regenerate from source / 从脚本重新生成

**Final deck (PPTX + PDF):**

```bash
cd /Users/dad71/Desktop/Cursor/Biodesign_Project_2
.venv/bin/python scripts/build_final_presentation.py
```

Legacy summit-only PPTX (no PDF):

```bash
.venv/bin/python scripts/build_summit_deck.py
```

---

## If the file still won’t open / 若仍无法打开

1. Confirm the file size is **~50 KB** (not 0 bytes).  
2. Update PowerPoint / Keynote.  
3. Try the **duplicate** `Extinction_Archive_Summit_2026.pptx`.  
4. Re-run `build_summit_deck.py` above.
