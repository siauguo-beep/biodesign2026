# How to open the Summit PowerPoint / 如何打开演示文稿

## Why a “link” might not work / 为什么链接打不开

The paths below are **files on your computer**, not a website.  
Clicking a path in **GitHub** or in a **browser** will not open the file unless you download the repo first.

以下路径是**本机文件**，不是网站链接。在浏览器里点 Markdown 里的路径**不会**打开文件；请先下载或克隆整个项目。

---

## Open in Finder (Mac) / 用访达打开

1. Open **Finder** → **Go** → **Go to Folder…** (⇧⌘G)  
2. Paste this path (adjust `dad71` if your username differs):

```
/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export
```

**Preview on GitHub (no PowerPoint needed):** after you push the repo, open  
[`slides/SUMMIT_DECK_GITHUB_PREVIEW.md`](../SUMMIT_DECK_GITHUB_PREVIEW.md)  
on github.com — it renders as Markdown. Full instructions: [`docs/GITHUB_PPT_PREVIEW.md`](../../docs/GITHUB_PPT_PREVIEW.md).

3. Double-click one of these files:

| File | Note |
|------|------|
| `BDC_Summit_Extinction_Archive_2026.pptx` | Full name |
| `Extinction_Archive_Summit_2026.pptx` | **Same deck**, shorter name (easier for some tools) |

Use **Microsoft PowerPoint**, **Apple Keynote** (File → Open), or **Google Drive** (upload, then “Open with Google Slides”).

---

## Error: `kLSApplicationNotFoundError` (-10814) / 未安装能打开 PPT 的应用

macOS 报错 **“No application knows how to open URL … .pptx”** 表示系统里**没有**注册处理 `.pptx` 的应用（未安装或从未打开过 Office）。

**Fix:** 安装以下**任一**软件后重试：

- **Apple Keynote**（Mac App Store，免费）  
- **Microsoft PowerPoint**  
- **LibreOffice**（[libreoffice.org](https://www.libreoffice.org/)）

然后指定应用打开：

```bash
open -a Keynote "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Extinction_Archive_Summit_2026.pptx"
```

```bash
open -a "Microsoft PowerPoint" "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Extinction_Archive_Summit_2026.pptx"
```

---

## Terminal (Mac) / 终端一键打开

（需已安装 Keynote 或 PowerPoint）

```bash
open "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/BDC_Summit_Extinction_Archive_2026.pptx"
```

Or the short filename:

```bash
open "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Extinction_Archive_Summit_2026.pptx"
```

---

## Regenerate from source / 从脚本重新生成

```bash
cd /Users/dad71/Desktop/Cursor/Biodesign_Project_2
.venv/bin/python scripts/build_summit_deck.py
```

---

## If the file still won’t open / 若仍无法打开

1. Confirm the file size is **~50 KB** (not 0 bytes).  
2. Update PowerPoint / Keynote.  
3. Try the **duplicate** `Extinction_Archive_Summit_2026.pptx`.  
4. Re-run `build_summit_deck.py` above.
