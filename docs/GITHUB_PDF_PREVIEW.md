# View the deck on GitHub (in-browser preview)

**GitHub cannot preview `.pptx` files** in the web interface. It will only offer **Download**.

To preview in the browser on GitHub, open the **PDF** in `slides/export/` (same content as your exported slide deck).

**Final project title:** *Extinction Archive: AI Memorial for Lost Species – Umwelt Archive: A Sensory Time Capsule*

## Canonical PDF for GitHub preview (small export)

File in the repo:

`slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf`

Replace `YOUR_USER` and `YOUR_REPO` with your GitHub username and repository name.

**View PDF in browser (embedded viewer on `blob`):**

```
https://github.com/YOUR_USER/YOUR_REPO/blob/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf
```

The path uses **URL encoding** because the filename contains `[`, `]`, and spaces. You can paste the same path in the GitHub UI after `blob/main/`; GitHub will normalize it when you navigate from the file tree.

**Raw file (download only):**

```
https://github.com/YOUR_USER/YOUR_REPO/raw/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf
```

## Older / alternate exports

- Larger PDF / PPTX with similar naming may also live in `slides/export/` (e.g. `[FINAL] …`). Use **`[FINAL-SMALL]`** for faster loads in the browser.

## Regenerate locally

Export PDF from PowerPoint / Keynote from your working `.pptx`, then replace the file above (keep the same filename if you want stable GitHub URLs).

## If you have no PowerPoint / Keynote

On Mac, open the PDF with Preview:

```bash
open "/path/to/Biodesign_Project_2/slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf"
```

## Push this PDF to GitHub

From the repo root:

```bash
git add "slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf"
git commit -m "Add final small PDF deck for GitHub preview"
git push origin main
```

If you have not added a remote yet, see **[GITHUB_SYNC.md](GITHUB_SYNC.md)**.
