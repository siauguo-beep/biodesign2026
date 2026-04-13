---
marp: true
theme: default
paginate: true
footer: Extinction Archive · BDC 2026 Judge Full Deck (EN)
---

<!-- _class: lead -->

# Extinction Archive: Umwelt Hypothesis Dossiers

## AI Memorial for Lost Species — “Umwelt Archive” · A Sensory Time Capsule

Biodesign Challenge 2026 · **Convergent Life**  
Full judge-oriented deck · **Does not replace** compact `FINAL-SMALL` / `…Dossiers_BDC2026_EN.pdf`

---

# Team · build constraint

| Role | Focus |
|------|--------|
| Experience lead | Narrative, chronobiology→Umwelt, ethics, dossiers |
| Tech / AI lead | WebXR, generative env, epistemic + ethics UI |
| Shipped scope | Web-only MVP · QR + citation sheet · **no** live biosensor demo |

---

# Problem

- Extinction removes **temporal niches** — day, season, migration, synchrony  
- Public memory **flattens**; de-extinction hype vs shifting baselines  
- Goal: sense **absence** and **evidence** — structured uncertainty  

---

# Design hypothesis

Reconstruct **temporal phenotypes** + **sensory proxies** under **Cited / Interpolated / Speculative** — chronobiology, isotopes, archives — so absence is **narratable** and reflection returns to **extant** stewardship.

---

# Three guiding questions

1. Perceptible absence **without** false precision?  
2. **Transparent** AI + biology — **not** a substitute for conservation or Indigenous knowledge?  
3. Multisensory cues as **optional**, gentle layers?

---

# Why biodesign

- **Bio:** citations, specimens, isotopes, genomics, orbit→diel  
- **Digital:** constrained generation, Web Audio, inspectable AI  
- Remove either layer → project collapses  

---

# Research spine

- **`02_research/biology/biodigital_chronobiology_research.md`**  
- Mammoth: Lynch 2015 (+ conservative clock copy); Zimov 2012; Wooller 2021  
- Thylacine: Pozniak 2018; Mass & Supin 2020 **Interpolated** POV; T5 + Palawa-led sources  

---

# Experience architecture

Map → dossier → **Polyphony** (rhythm / collapse) → **Ethics fork** → **Reflection** (`templates/reflection-log-webxr.html`)

---

# Three modules

| Module | Role |
|--------|------|
| Species Dossier | Scene → citation |
| Polyphony Mixer | Harmony vs loss of synchrony |
| Ethics Console | Trade-offs + evidence gate |

---

# Species tiers

| Tier | Taxa | Role |
|------|------|------|
| P0 WebXR | Mammoth · Thylacine | Full depth + Indigenous UI |
| P0 dossier | Passenger pigeon | Acoustic absence / Martha |
| P1 | Dodo · Great auk | Archive literacy, Context |
| P2 | 51 taxa CSV | Systematic research, future map |

---

# Honesty UI · AI · Data

- **Cited / Interpolated / Speculative** + planning **verification log**  
- AI: claims discipline, log failures — limits as **Reflection** asset  
- **`animals_full.csv`**, **`archive.json`**, **`archive_import.sql`**, **`archival_media_research.csv`** (~349 rows)  

---

# BDC rubric map

| Dimension | We show |
|-----------|---------|
| **Narrative** | Immersion → uncertainty → fork; pigeon silence |
| **Concept** | Umwelt + temporal phenotype + biodigital |
| **Context** | De-extinction, pharm flags, colonial archives, sovereignty |
| **Reflection** | AI limits, archives’ gaps, user reflection |

---

# Milestones · deliverables

- **W1–W4:** literature → mammoth → thylacine+ethics → polish + video  
- **Kit:** WebXR, trailer, slides, process doc, physical QR  
- **PDFs:** compact decks **unchanged**; **full:** `Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf`  

---

# Thank you

**Extinction Archive / Umwelt Archive** — Q&A  

**Build:** `python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py`  
**Skip full deck:** `--no-full` · **Full only:** `--full-only`
