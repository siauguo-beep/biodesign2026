# Extinction Archive — Slides

Theme: **archival biodigital** — dark earth background, ochre accent (`#c45c2a`), signal teal (`#5cb89a`), museum-style framing aligned with *Extinction Archive: Umwelt hypothesis dossiers*.

## Official English deck

### Files in repo

- Source markdown: [`BDC_Extinction_Archive_EN.md`](./BDC_Extinction_Archive_EN.md)
- PowerPoint: [`export/BDC_Extinction_Archive_EN.pptx`](./export/BDC_Extinction_Archive_EN.pptx)
- PDF mirror: [`export/BDC_Extinction_Archive_EN.pdf`](./export/BDC_Extinction_Archive_EN.pdf)

### Public links

- GitHub file page (PPTX): [BDC_Extinction_Archive_EN.pptx](https://github.com/macaumonsoon/Biodesign-Project/blob/main/docs/bdc-umwelt-archive/slides/export/BDC_Extinction_Archive_EN.pptx)
- GitHub preview link (PDF): [Preview slide deck in GitHub](https://github.com/macaumonsoon/Biodesign-Project/blob/main/docs/bdc-umwelt-archive/slides/export/BDC_Extinction_Archive_EN.pdf)
- Direct download (PPTX raw): [Download PPTX](https://raw.githubusercontent.com/macaumonsoon/Biodesign-Project/main/docs/bdc-umwelt-archive/slides/export/BDC_Extinction_Archive_EN.pptx)

> GitHub does **not** reliably render `.pptx` inline. The stable GitHub-native preview is the **PDF mirror** of the same slide deck.

## Legacy / alternate slide assets

These remain in the repo for reference:

- [`export/BDC_Deck_EN.pdf`](./export/BDC_Deck_EN.pdf)
- [`export/BDC_Deck_EN.pptx`](./export/BDC_Deck_EN.pptx)
- [`export/BDC_Deck_ZH.pdf`](./export/BDC_Deck_ZH.pdf)
- [`export/BDC_Deck_ZH.pptx`](./export/BDC_Deck_ZH.pptx)
- [`export/Extinction_Archive_EN.pdf`](./export/Extinction_Archive_EN.pdf)
- [`export/Extinction_Archive_ZH.pdf`](./export/Extinction_Archive_ZH.pdf)

## Browser / local preview

Open locally after clone if you want HTML-based browsing:

- [`preview/Extinction_Archive_preview_EN.html`](./preview/Extinction_Archive_preview_EN.html)
- [`preview/Extinction_Archive_preview_ZH.html`](./preview/Extinction_Archive_preview_ZH.html)
- [`preview.html`](./preview.html)

## Regeneration

### PowerPoint

From the repository root:

```bash
.venv/bin/python docs/bdc-umwelt-archive/scripts/generate_extinction_archive_ppt.py
```

### Other PDFs / legacy slide builds

```bash
pip3 install fpdf2
python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py
```

---

*Current public deck: 12 slides · mammoth-first narrative spine · see also [PROJECT_PLAN.md](../PROJECT_PLAN.md).*
