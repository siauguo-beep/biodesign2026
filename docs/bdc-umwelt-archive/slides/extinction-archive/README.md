# Extinction Archive — slide deck (PDF + preview)

**Visual direction:** archival warm-dark earth tone · burnt-orange accent (#c45c2a) · teal “signal” (#5cb89a), aligned with *Umwelt Archive / 集体记忆断裂* and BDC 2026 *Convergent Life*.

## Download (GitHub raw)

| Language | PDF |
|----------|-----|
| English | [Extinction_Archive_EN.pdf](https://github.com/macaumonsoon/Biodesign-Project/raw/main/docs/bdc-umwelt-archive/slides/extinction-archive/Extinction_Archive_EN.pdf) |
| 中文 | [Extinction_Archive_ZH.pdf](https://github.com/macaumonsoon/Biodesign-Project/raw/main/docs/bdc-umwelt-archive/slides/extinction-archive/Extinction_Archive_ZH.pdf) |

## Preview (HTML)

Open locally after clone (recommended), or paste the raw GitHub URL into a public HTML preview service.

| Language | File in repo |
|----------|----------------|
| English | [`preview/Extinction_Archive_EN.html`](./preview/Extinction_Archive_EN.html) |
| 中文 | [`preview/Extinction_Archive_ZH.html`](./preview/Extinction_Archive_ZH.html) |

**htmlpreview.github.io (example):** prepend  
`https://htmlpreview.github.io/?`  
to the raw HTML URL, e.g.  
`https://htmlpreview.github.io/?https://github.com/macaumonsoon/Biodesign-Project/raw/main/docs/bdc-umwelt-archive/slides/extinction-archive/preview/Extinction_Archive_EN.html`

## Regenerate PDF (macOS + Chrome)

From the repository root:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
BASE="docs/bdc-umwelt-archive/slides/extinction-archive"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/${BASE}/Extinction_Archive_EN.pdf" \
  "file://$PWD/${BASE}/preview/Extinction_Archive_EN.html"
"$CHROME" --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="$PWD/${BASE}/Extinction_Archive_ZH.pdf" \
  "file://$PWD/${BASE}/preview/Extinction_Archive_ZH.html"
```

---

*15 slides · woolly mammoth + passenger pigeon · see also [PROJECT_PLAN.md](../../PROJECT_PLAN.md).*
