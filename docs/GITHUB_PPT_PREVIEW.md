# Preview this deck on GitHub / 在 GitHub 上预览演示文稿

## Important / 重要说明

**GitHub does not render `.pptx` in the browser** (you only get “Download raw file”).  
To preview slides **in a browser**, use one of the options below.

**GitHub 无法在网页里直接预览 PPT**，只能下载。要在浏览器里看，请用下面任一方式。

---

## Option A — Markdown mirror (works on GitHub immediately)

After you push the repo, open this file in GitHub — it renders as formatted text:

**[`slides/SUMMIT_DECK_GITHUB_PREVIEW.md`](../slides/SUMMIT_DECK_GITHUB_PREVIEW.md)**

Keep it in sync when you change the story; regenerate or edit alongside `scripts/build_summit_deck.py`.

---

## Option B — Microsoft Office Online (needs a **public** file URL)

1. Push your repo to **GitHub (public)**.  
2. Build the **raw** file URL (replace `USER`, `REPO`, `BRANCH`):

   `https://raw.githubusercontent.com/USER/REPO/BRANCH/slides/export/Extinction_Archive_Summit_2026.pptx`

3. **URL-encode** that string (e.g. paste into [meyerweb.com/eric/tools/dencoder](https://meyerweb.com/eric/tools/dencoder/) or use encodeURIComponent in browser console).

4. Open (paste **your** encoded URL at the end):

   `https://view.officeapps.live.com/op/embed.aspx?src=PASTE_ENCODED_RAW_URL_HERE`

Example pattern (not a real repo):

```text
https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FUSER%2FREPO%2Fmain%2Fslides%2Fexport%2FExtinction_Archive_Summit_2026.pptx
```

**Private repos:** Office Online cannot fetch the file — use **Option A**, or upload the PPTX to **OneDrive / Google Drive** and use “share → anyone with link,” then embed or open in Slides.

---

## Option C — Your Mac error `kLSApplicationNotFoundError` (-10814)

macOS has **no app registered** for `.pptx`. Fix locally:

1. Install **Microsoft PowerPoint**, **Apple Keynote** (free on Mac App Store), or **LibreOffice**.  
2. Then run:

   ```bash
   open -a Keynote "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Extinction_Archive_Summit_2026.pptx"
   ```

   Or after installing PowerPoint:

   ```bash
   open -a "Microsoft PowerPoint" "/Users/dad71/Desktop/Cursor/Biodesign_Project_2/slides/export/Extinction_Archive_Summit_2026.pptx"
   ```

See also [`slides/export/HOW_TO_OPEN_PPTX.md`](../slides/export/HOW_TO_OPEN_PPTX.md).
