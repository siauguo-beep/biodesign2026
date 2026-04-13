# Extinction Archive — BDC 2026 submission brief (English)

**Project titles:** *Extinction Archive: Umwelt Hypothesis Dossiers* · *Extinction Archive: AI Memorial for Lost Species — “Umwelt Archive”: A Sensory Time Capsule*  
**Competition:** Biodesign Challenge 2026 · **Convergent Life**  
**Purpose:** Written companion for judges — aligns with **Narrative · Concept · Context · Reflection** and links to canonical planning and research in-repo.

**Related PDFs (do not replace legacy backups on GitHub):**

- Compact English deck: `slides/export/Extinction_Archive_Umwelt_Hypothesis_Dossiers_BDC2026_EN.pdf`  
- Stable alias: `slides/export/[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf`  
- **Full judge walkthrough (this brief’s slide twin):** `slides/export/Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf`  
- If your course still references `BDC_Deck_EN.pdf`, keep that file as historical export; add the full deck alongside it.

---

## 1. Executive summary

Extinction removes not only bodies and ecological roles but **how another species lived in time** — circannual rhythms, migration, social synchrony. Public memory often collapses that loss into icons or hype. This project is a **literature-grounded, WebXR-first memorial**: two species receive full interactive depth (woolly mammoth, thylacine); others enrich **dossiers and a repository-scale dataset** (51 taxa, ~349 curated archival URLs). Every experience layer is tagged **Cited**, **Interpolated**, or **Speculative**; the arc ends in an **ethics fork** and **user reflection**, not spectacle.

---

## 2. Narrative (BDC dimension)

**Story rhythm:** immersion in evidence-based scene parameters → **graded uncertainty** (interpolated POV, sparse sound archives) → **ethical fork** (resource allocation, sovereignty, ecological risk) → **reflection** (what AI and archives cannot restore).

**Beats:** mammoth as **long-horizon rhythm + isotope mobility**; passenger pigeon as **synchrony collapse** and honest **acoustic absence**; thylacine as **crepuscular science + colonial entanglement** with **Palawa-first** framing in UI copy.

---

## 3. Concept (BDC dimension)

**Core idea:** merge **palaeo-chronobiology** with **Umwelt** (world-as-sensed) to reconstruct **temporal phenotypes** under explicit epistemic tiers.

**Load-bearing modules:** Species Dossier (scene→citation), Polyphony Mixer (rhythm / density / migration metaphor), Ethics Console (incompatible choices + evidence gate).

**MVP rule:** WebXR depth on **two** species; remaining taxa support **Context** and **systematic research** without implying 49 additional scenes.

---

## 4. Context (BDC dimension)

- **De-extinction and conservation trade-offs** — Sherkow & Greely (2013) hooks in ethics UI.  
- **Colonial archives and specimen economies** — thylacine narrative; Clements (2025) as cross-reference, **not** a substitute for Indigenous authority; Palawa-led bibliography in planning doc.  
- **Pharm / trade** — `pharm_related` column in `animals_full.csv` where relevant to horn/medicine demand narratives.  
- **Licences** — NFSA, SI, museum embeds checked before trailer or public deploy.

---

## 5. Reflection (BDC dimension)

- **AI limits:** fenced generation, human curation, prompt/model logging; conservative claims on mammoth clock genetics until primary PDF verification.  
- **What archives omit:** empty or sparse sound collections as **evidence**, not bugs.  
- **User-facing reflection:** `templates/reflection-log-webxr.html` — short capture + heuristic alignment to ethics themes.

---

## 6. Biodesign + technical delivery

| Layer | Content |
|--------|---------|
| Biological | Published genomics, morphology, isotopes, orbit→diel; citations in UI |
| Digital | A-Frame / Three.js WebXR; Web Audio; constrained generative prompts |
| Data | `archive.json`, `archive_import.sql`, `archival_media_research.csv`; schema in `docs/database/` |
| Physical | Minimum: **one** QR anchor + optional citation sheet |

---

## 7. Deliverables checklist (typical BDC kit)

- [ ] 10′ presentation + 5′ Q&A prep  
- [ ] Live WebXR + **one** ethical choice + reflection path  
- [ ] 1–5′ creative video  
- [ ] Slides: compact + **full judge deck** as needed  
- [ ] Process / honesty documentation (verification log in planning doc)

---

## 8. Canonical references in repository

| Document | Path |
|----------|------|
| Planning dossier | `BDC_2026_Extinction_Archive_Planning_Document.md` |
| Executive plan | `PROJECT_PLAN.md` |
| Chronobiology + Umwelt research | `02_research/biology/biodigital_chronobiology_research.md` |
| Showcase tiers | `docs/research/bdc_showcase_species_shortlist.md` |
| Slide rebuild | `python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py` |

---

*End of submission brief.*
