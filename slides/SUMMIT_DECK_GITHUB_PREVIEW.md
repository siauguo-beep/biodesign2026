# Summit deck — GitHub preview mirror

**Project:** Extinction Archive: Umwelt Hypothesis Dossiers  
**Subtitle framing:** AI memorial for lost species · sensory time capsule · BDC 2026 · Convergent Life  
**Institution:** Macau University  

> This Markdown file is **auto-generated** by `scripts/build_summit_deck.py` so you can **read the full talk on GitHub** without PowerPoint.

## Browser preview of the real `.pptx` (after public push)

GitHub does not render PPTX. After uploading to a **public** repo, use Microsoft’s viewer:

1. Raw file URL pattern:
   `https://raw.githubusercontent.com/YOUR_USER/YOUR_REPO/main/slides/export/Extinction_Archive_Summit_2026.pptx`
2. URL-encode that string, then open:
   `https://view.officeapps.live.com/op/embed.aspx?src=` + encoded URL

See **`docs/GITHUB_PPT_PREVIEW.md`** for step-by-step instructions.

---

## Slide 1: Extinction Archive: Umwelt Hypothesis Dossiers

AI memorial for lost species · sensory time capsule

Biodesign Challenge 2026 · “Convergent Life”

Macau University

## Slide 2: Team & institution

- Institution: Macau University
- Mentor: Atticus SIMS
- Team: GUO XIAO YUE — ID MC569254
- Team: LIU JIA QUN — ID MC569293
- Program: MDes — Digital Art & AI Technology.

## Slide 3: Why this title?

- “Umwelt Hypothesis Dossiers” = each species as a **folder of testable claims** (genes, orbits, climate), not a fantasy safari.
- “AI memorial” = generative media **constrained** by literature — grief and wonder without faking science.
- “Sensory time capsule” = we reconstruct **when** they lived (phase, season), not only **what** they looked like.

## Slide 4: Biodesign Challenge 2026

- Premier student competition: biotechnology × art × design.
- 2026 gallery: “Convergent Life.” Targets: **Biodigital Excellence**; Narrative, Context, Reflection.
- Judging: biodesignchallenge.org/judging

## Slide 5: Roles & build scope

- Experience lead: narrative, ethics, palaeo-chronobiology translation.
- Tech / AI lead: WebXR (A-Frame / Three.js), generative environments, epistemic UI.
- Strategy: 重内容、轻装置 — Web-first; minimal tactile anchor + QR.

## Slide 6: Problem → provocation

- Extinction erases **temporal niches** (daily / seasonal rhythms), not only DNA.
- Public memory = flat images; we lack **felt time** of another species’ world.
- Provocation: can biodigital design surface that loss and force honest **de-extinction** debate?

## Slide 7: Core design question

- “If we use **generative AI + WebXR** to **reconstruct** a **temporal phenotype**, can we repair the human gap in **sensing extinction**?”
- Palaeo-chronobiology + morphology (orbit, clock pathways, TRPV3…) = evidence ladder.
- Umwelt = sensory world as **hypothesis**, disclosed layer-by-layer.

## Slide 8: Bio × digital quadrants (our mapping)

- **SENSE / VISUALIZE:** photoperiod sliders, orbit-informed POV filters, habitat maps from Zimov et al.
- **OPTIMIZE:** prompt + data rules so generative landscapes respect paleo proxies.
- **SIMULATE:** phase / sonification of “a species day” — rhythmic, not decorative.
- Red-flag: if biology OR code is removed and the piece still “works,” we failed the biodigital brief.

## Slide 9: Creative concept — two dossiers only

- **Woolly mammoth:** Arctic circadian genomics (Lynch 2015), reindeer analogy (Lu 2010), mammoth steppe (Zimov 2012), TRPV3 cold (Lynch; Kim preprint optional).
- **Thylacine:** skull / diel activity (Pozniak 2018), RGC metaphor (Mass & Supin 2020), history (Paddle; Sleightholme), sovereignty (Clements + Palawa-led Rimmer, Lehman; Schlunke).
- Journey: discover rhythm → epistemic layers → ethics sliders → reflection log (HTML template in repo).

## Slide 10: Scene IDs → citations

### Mammoth path
- Scene_Bio_01 — Lynch (circadian-related genes)
- Scene_Environment_02 — Lu [Interpolated]
- Scene_Landscape_01 — Zimov
- Scene_Sensory_01 — TRPV3 / cold

### Thylacine path
- Scene_Bio_02 — Pozniak / orbit
- Scene_POV_01 — Mass & Supin [Interpolated]
- Scene_Context_01 — Paddle + Sleightholme
- UI_Indigenous_Context → UI_Ethics_Fork → UI_Reflection_Log

## Slide 11: Design techniques & stack

- **WebXR:** A-Frame / Three.js; browser-based Summit demo.
- **Generative AI:** 360° / environment art **bounded** by citation-backed parameters (no silent photoreal “truth”).
- **Epistemic UI:** toggles for Cited / Interpolated / Speculative; on-screen (Author, year) tags.
- **Sonification (optional):** tie audio to phase / season from literature.
- **Reflection:** `templates/reflection-log-webxr.html` — keyword → ethics cards (Sherkow & Greely themes).

## Slide 12: Ideation method (8 steps)

- 1 Map interests & skills · 2 Intersection statements (“code × bio × problem”)
- 3 Stress-test vs BDC rubric (Narrative, Concept, Context, Reflection)
- 4 Biology sprint per species (30–45 min lit passes)
- 5 Bio / digital split + red-flag test
- 6 200-word narrative (Problem → Insight → Solution → Impact)
- 7 Prototype + deliverable owners · 8 Build sprint: Discovery → Prototype → Integration → Polish
- Guided by `biodesign_cursor_agent.md` + course workbook.

## Slide 13: Four-week production spine

- W1 Discovery — literature grid, storyboard ↔ DOI table, WebXR shell.
- W2 Prototype — time scrubber, generative constraint doc, epistemic toggles.
- W3 Integration — sonification, Indigenous + ethics UI, reflection panel.
- W4 Polish — 10′ talk, 5′ Q&A drill, 1–5′ video, deploy, judge cheat sheet.

## Slide 14: Context — colonial violence & Country

- Thylacine loss tied to colonial harm to Palawa peoples and lutruwita (Tasmania).
- Sources: Clements (2025); Schlunke (2025) poetry / Palawa names; **Palawa-led** Rimmer (2020), Lehman (2013).
- UI protocol: author positionality; no tourism copy as TEK.

## Slide 15: Ethics layer — Sherkow & Greely (2013)

- Sliders: lab de-extinction vs **in situ** conservation funding.
- Legal novelty of revived lineages → liability / ecosystem risk.
- Grounded in Science DOI 10.1126/science.1236946 — not generic sci-fi branches.

## Slide 16: Key literature — Mammoth (DOIs)

- M1 Lynch et al., 2015 — 10.1016/j.celrep.2015.06.027
- M2 Lu et al., 2010 — 10.1016/j.cub.2010.01.042
- M3 Zimov et al., 2012 — 10.1016/j.quascirev.2012.08.004
- M4 Kim bioRxiv — 10.1101/151746 (TRPV3 structure; phenotype cite Lynch 2015)
- M5 Sherkow & Greely — 10.1126/science.1236946

## Slide 17: Key literature — Thylacine & sovereignty

- T1 Pozniak 2018 — 10.1002/ar.23910
- T2 Mass & Supin 2020 — 10.31857/S0002332920060107
- T3 Paddle 2000 — ISBN 9780521782196
- T4 Sleightholme & Campbell 2016 — 10.1080/00222933.2016.1217037
- T5 Clements 2025 — 10.1177/13534858251272203
- Schlunke 2025 — 10.1017/ext.2025.10008 · Rimmer 2020 Artlink · Lehman 2013 Griffith Review

## Slide 18: Rubric self-check

- Narrative: rhythm → loss → fork.
- Concept: **time** as spine; one proxy per scene.
- Context: trade-offs + sovereignty sources.
- Reflection: epistemic UI + user reflection + AI limits.

## Slide 19: BDC deliverables

- 10′ oral + 5′ Q&A · visuals / WebXR · minimal physical + QR
- 1–5′ creative video · slides on Drive · optional @biodesigned

## Slide 20: Repository pointers

- Canonical plan: BDC_2026_Extinction_Archive_Planning_Document.md
- Executive: PROJECT_PLAN.md · Reflection template: templates/reflection-log-webxr.html
- GitHub preview this talk: slides/SUMMIT_DECK_GITHUB_PREVIEW.md (this file is auto-generated).

## Slide 21: Thank you

Extinction Archive: Umwelt Hypothesis Dossiers

Macau University · Biodigital Excellence · biodesignchallenge.org

---

### One-line Office viewer (replace USER/REPO after you push)

```
https://view.officeapps.live.com/op/embed.aspx?src=https%3A%2F%2Fraw.githubusercontent.com%2FYOUR_USER%2FYOUR_REPO%2Fmain%2Fslides%2Fexport%2FExtinction_Archive_Summit_2026.pptx
```
