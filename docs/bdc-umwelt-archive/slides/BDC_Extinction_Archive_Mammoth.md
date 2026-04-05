---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  section { font-size: 28px; }
  h1 { font-size: 40px; }
  table { font-size: 22px; }
footer: Extinction Archive · BDC 2026 · Mammoth MVP
---

<!-- _class: lead -->
# Extinction Archive
## *Umwelt* memorial for the woolly mammoth

**Biodesign Challenge 2026** · Biodigital Excellence · *Convergent Life*

Digital Art & AI Technology (MDes) · 2-person team · 2–3 week MVP

---

## What we lose when a species disappears

- Not only **bodies**, but **ways of living in time**
- Seasonal routes · light–dark entrainment · social rhythms · **sensory worlds (*Umwelt*)**
- Science stays in papers; public memory flattens into icons

**Design question:** How do we make rigorous biology **feelable** without lying?

---

## Project thesis

**Extinction Archive** = browser-first experience that builds a **hypothesis-grade** *Umwelt* for ***Mammuthus primigenius***

- **Grounded** in citable research (tusk isotope stratigraphy, Arctic adaptation, extinction context)
- **Expressed** through shaders, controlled generative passes, and **Web Audio**
- **Closed** with **evidence literacy** + **branching ethics** — digital recall must not erase conservation urgency

---

## Why the woolly mammoth (locked scope)

| Pillar | Why it fits the MVP |
|--------|---------------------|
| **Isotope “diaries”** | Published life-history reconstructions → **Dossier foldout + R/ggplot stills** |
| **Photoperiod / season** | Arctic extremes → **lighting + Mixer pulse** |
| **Biodigital story** | Paleogenomics / morphology literature ↔ **parametric scene + labels** |
| **Ethics** | De-extinction & Arctic narratives → **sharp, honest branch cards** |

**Frozen:** single hero species for 2–3 weeks · no parallel dossiers

---

## User journey (three modules)

```
Dossier  →  Mixer  →  Ethics
 (read)     (listen)   (choose)
```

**Group1Slim (locked):** all three ship · Ethics ~**2 min** in live talk

---

## Module A — *Dossier*

- **Anchors:** geography & time (LGM–Early Holocene framing — specific sites **Cited**)
- **Science foldout:** Sr/O (etc.) tusk chemistry · published individual tracks
- **Labels on every block:** **Cited / Modeled / Speculative**
- **360° scene** driven by **season & sun parameters** — not unbounded “text-to-world”

---

## Module B — *Mixer*

- **≥3 audio layers (mammoth-tuned):**
  - Seasonal / **photoperiod pulse**
  - Steppe–tundra **environment bed** (*Speculative* where elephant-relative)
  - **Anthropocene pressure** layer (*Cited/Modeled* where possible)
- **Harmony → conflict:** simple **DSP rules** (e.g. gain competition → ducking / beating)
- **Documented:** rules on a slide + README (judges can interrogate the “black box”)

---

## Module C — *Ethics console*

**C gate (~45 s):** three true/false or sort prompts — *“Is this claim Cited or Speculative?”*

**B branches (~75 s):** 2–3 cards, e.g.
- Conservation funding vs de-extinction hype
- Invasive-species / ecosystem management frame
- Data, land, Indigenous knowledge — **questions + team commitments** (no speaking for others)

**Outcome:** different **finale mix preset** + short caption (≤80 words)

---

## Bio + digital — both load-bearing

| Biology (from literature) | Digital (implementation) |
|----------------------------|-------------------------|
| Isotope profiles, seasonal life | `ggplot` + Dossier charts |
| Light environment, habitat proxies | Three.js / R3F + shaders |
| Uncertainty & debate | **C/M/S** UI + copy |
| Emotional pacing | Mixer + branch endings |

**Remove biology** → fancy demo · **Remove code** → static essay → **both fail** → we pass the biodigital test

---

## Physical + AR (lightweight)

- **3D print:** abstract **tusk “growth core”** or skull token — material witness
- **Mobile WebAR:** same GLB + stems as desktop (`?ar=1` or entry route)
- **Fallback:** QR → same Dossier anchor (MoMA-grade reliability)

---

## Tech stack (suggested)

- **Front:** Vite · React · React Three Fiber / Three.js · Web Audio API  
- **Science viz:** R · ggplot2 → exported PNG/SVG for deck + site  
- **Gen AI:** **Control-first** passes (masks/palette) + **procedural base** · API costs checked  
- **AR:** WebXR-friendly path (A-Frame acceptable if team-standard)

---

## 2–3 week schedule (summary)

| Week | Focus |
|------|--------|
| **1** | Stack · Dossier UI + mammoth JSON · scene · Mixer prototype · evidence audit #1 · ggplot v1 |
| **2** | Ethics UI · GLB · WebAR minimal · print · Methods/Cite/Limits slides · rehearsal · trailer |
| **3*** | Polish · a11y · mock Q&A · P0 bugs only · *optional stretch* |

*Compress weeks 2–3 if only 14 days.*

---

## BDC rubric — how we aim to score

| Dimension | Our hook |
|-----------|----------|
| **Narrative** | Hero specimen arc · live demo · honest labels |
| **Concept** | *Umwelt* + isotope-time · biodigital integration |
| **Context** | De-extinction ethics · moral hazard of “reversible” extinction · conservation framing |
| **Reflection** | Documented iterations · Speculative gates · limits slide |

Target: **Biodigital Excellence** prize narrative

---

## Deliverables checklist (course / BDC-oriented)

- [ ] **Talk** · 8 min + 2 min demo  
- [ ] **Visuals** · UI capture + stills  
- [ ] **Physical** · print + AR footage  
- [ ] **Trailer** · 45–90 s  
- [ ] **Deck** · includes **Methods · Citations · Limitations**

---

## Methods

- **Evidence base:** three peer-reviewed anchors — **tusk isotope life history** (Alaska bull mammoth; Sr/O maps + random-walk model); **comparative genomes** (mammoth vs elephant circadian & thermal pathways); **extinction drivers** (climate × human pressure modeling)
- **Dossier:** claims imported to JSON; every block tagged **Cited / Modeled / Speculative**; `ggplot2` reproduces **public tusk isotope / time** summaries for stills (not a re-identification of the individual)
- **3D scene:** sun height, fog, palette driven by **season & photoperiod** parameters; optional **control-net / masked** image pass logged with **model ID + date + seed**
- **Mixer:** layered stems; DSP rules documented (release **v0.1** in README); elephant-relative beds labeled *Speculative*
- **Process:** ≥2× **30 min evidence audits** (Week 1 & 2) · GEN-AI & prompt changelog for Reflection slide

---

## Citations — core papers (3) + tooling (+1)

**1 — Tusk isotope mobility (Dossier science fold · migration model)**  
Wooller, M. J., Bataille, C., Druckenmiller, P., Erickson, G. M., Groves, P., Haubenstock, N., Howe, T., Irrgeher, J., Mann, D., Moon, K., Potter, B. A., Prohaska, T., Rasic, J., Reuther, J., Shapiro, B., Spaleta, K. J., & Willis, A. D. (2021). Lifetime mobility of an Arctic woolly mammoth. *Science*, *373*(6556), 806–808. https://doi.org/10.1126/science.abg1134

**2 — Genomes & Arctic adaptation (circadian / thermal framing)**  
Lynch, V. J., Bedoya-Reina, O. C., Ratan, A., Sulak, M., Drautz-Moses, D. I., Perry, G. H., Miller, W., & Schuster, S. C. (2015). Elephantid genomes reveal the molecular bases of Woolly Mammoth adaptations to the Arctic. *Cell Reports*, *12*(2), 217–228. https://doi.org/10.1016/j.celrep.2015.06.027

**3 — Extinction context (climate × humans; avoid single-cause)**  
Nogués-Bravo, D., Rodríguez, J., Hortal, J., Batra, P., & Araújo, M. B. (2008). Climate change, humans, and the extinction of the Woolly Mammoth. *PLoS Biology*, *6*(4), e79. https://doi.org/10.1371/journal.pbio.0060079

**+1 — Software & runtime**  
R Core Team (2024). *R: A language and environment for statistical computing.* R Foundation for Statistical Computing. https://www.R-project.org/ · Wickham, H. (2016). *ggplot2: Elegant Graphics for Data Analysis.* Springer. https://ggplot2.tidyverse.org · Three.js r152+ https://threejs.org/ · (Add WebXR / Marp export notes in appendix as needed.)

---

## Limitations (honest — judges reward this)

- No living mammoth — **all sensory reconstruction is partial**; elephant-relative regions are **Modeled/Speculative**
- Generative media can **feel real** — we **design against** deceptive realism
- **2–3 weeks / 2 people** → one species, narrow but deep
- AR hardware variance — **desktop path is canonical**

---

## Team & roles (flat + audits)

- **Cross-functional** both members · daily **15 min** sync  
- **Evidence audits** 2× weekly (30 min) — no unlabeled claims in demo
- Optional split: **viz/code** vs **sound/research/copy** — but both own the rubric

---

## Thank you / Q&A prompts we practice

- Why mammoth and not a “easier” icon species?  
- Where exactly is the **living biology**? (Answer: **from biology** evidence + optional stretch plant; thesis is digital–paleo bridge.)  
- How do you prevent **misinformation**? (**C/M/S** + ethics gate + limitations)  
- What would you do with **4 more months**?

---

## Backup — one-line pitch

> **Extinction Archive** turns tusk-time and Arctic light into a **listenable, clickable memorial** — and forces you to decide what “bringing the mammoth back” should cost.

---

## Deck exports

**English sources:** `slides/BDC_Extinction_Archive_Mammoth.md` · **Chinese:** `slides/BDC_Extinction_Archive_Mammoth_zh.md`  
**Built files:** `slides/export/BDC_Deck_EN.pdf` · `BDC_Deck_ZH.pdf` · `BDC_Deck_EN.pptx` · `BDC_Deck_ZH.pptx`  
**Preview hub:** open `slides/preview.html` in a browser (see `slides/README.md`).
