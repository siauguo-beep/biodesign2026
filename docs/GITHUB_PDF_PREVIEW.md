# View the deck on GitHub (in-browser preview)

**GitHub cannot preview `.pptx` files** in the web interface. It will only offer **Download**.

To preview in the browser on GitHub, use the **PDF** export (same content as the final deck):

## After you push to GitHub

Replace `YOUR_USER` and `YOUR_REPO` with your GitHub username and repository name.

**View PDF in browser (recommended):**

```
https://github.com/YOUR_USER/YOUR_REPO/blob/main/slides/export/Archive_of_Extinction_Final_BDC2026.pdf
```

GitHub will show an **embedded PDF viewer** for public repositories (and for private repos when you are logged in with access).

**Raw file (download only):**

```
https://github.com/YOUR_USER/YOUR_REPO/raw/main/slides/export/Archive_of_Extinction_Final_BDC2026.pdf
```

## Regenerate PDF + PowerPoint locally

```bash
cd /path/to/Biodesign_Project_2
.venv/bin/python scripts/build_final_presentation.py
```

Outputs:

- `slides/export/Archive_of_Extinction_Final_BDC2026.pptx`
- `slides/export/Archive_of_Extinction_Final_BDC2026.pdf`  ← use this for GitHub preview

## If you have no PowerPoint / Keynote

Use **Preview** on Mac:

```bash
open "/path/to/Biodesign_Project_2/slides/export/Archive_of_Extinction_Final_BDC2026.pdf"
```

PDF opens without needing Microsoft Office.
