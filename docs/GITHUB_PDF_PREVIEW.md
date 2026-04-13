# View the deck on GitHub (in-browser preview)

**GitHub cannot preview `.pptx` files** in the web interface. It will only offer **Download**.

To preview in the browser on GitHub, open the **PDF** in `slides/export/` (same content as your exported slide deck).

**Final project title:** *Extinction Archive: AI Memorial for Lost Species – Umwelt Archive: A Sensory Time Capsule*

**Canonical repo:** [macaumonsoon/Biodesign-Project](https://github.com/macaumonsoon/Biodesign-Project) · branch **`main`**

## Canonical PDF for GitHub preview (small export)

File in the repo:

`slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf`

**View PDF in browser (embedded viewer on `blob`):**

[Open PDF on GitHub (blob)](https://github.com/macaumonsoon/Biodesign-Project/blob/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf)

```
https://github.com/macaumonsoon/Biodesign-Project/blob/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf
```

The path uses **URL encoding** because the filename contains `[`, `]`, and spaces.

**Raw file (download only):**

```
https://github.com/macaumonsoon/Biodesign-Project/raw/main/slides/export/%5BFINAL-SMALL%5D%20Extinction%20Archive%20Umwelt%20Hypothesis%20Dossiers_BDC2026.pdf
```

## Full BDC judge deck (additional export)

**Does not replace** `[FINAL-SMALL]` or legacy `BDC_Deck_EN.pdf`. Regenerate with  
`python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py --full-only`.

- File: `slides/export/Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf`  
- [Open on GitHub (blob)](https://github.com/macaumonsoon/Biodesign-Project/blob/main/slides/export/Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf) *(after push)*

## Older / alternate exports

- Larger PDF / PPTX with similar naming may also live in `slides/export/` (e.g. `[FINAL] …`). Use **`[FINAL-SMALL]`** for faster loads in the browser.

## Regenerate locally

Export PDF from PowerPoint / Keynote from your working `.pptx`, then replace the file above (keep the same filename if you want stable GitHub URLs).

## If you have no PowerPoint / Keynote

On Mac, open the PDF with Preview:

```bash
open "/path/to/repo/slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf"
```

## Push updates

```bash
git add "slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf"
git commit -m "Update summit PDF export"
git push origin main
```

See also **[GITHUB_SYNC.md](GITHUB_SYNC.md)**.
