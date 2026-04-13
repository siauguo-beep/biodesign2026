# Biodesign Challenge 2026 — Project plan (master)

**Project name:** Extinction Archive: AI Memorial for Lost Species – Umwelt Archive: A Sensory Time Capsule  
**Planning dossier title:** *Extinction Archive: Umwelt Hypothesis Dossiers* — see [`BDC_2026_Extinction_Archive_Planning_Document.md`](BDC_2026_Extinction_Archive_Planning_Document.md) for full hypothesis, data layer, species tiers, and citations.  
(*Summit shorthand: Extinction Archive / Umwelt Archive*)  
**Competition:** [Biodesign Challenge 2026](https://biodesignchallenge.org)  
**Exhibition theme:** Convergent Life  
**Target awards:** Biodigital Excellence; strong Narrative, Context, Reflection  

---

## 1. Program · team & roles

| Field | Detail |
|--------|--------|
| **Institution** | Macau University |
| **Mentor** | Atticus SIMS |
| **GUO XIAO YUE** | ID MC569254 — experience / narrative / ethics / dossier curation |
| **LIU JIA QUN** | ID MC569293 — tech / WebXR / generative + epistemic UI |

**Team size:** 2  
**BDC alignment:** Idea 3 (Extinction Archive) + Idea 6 (Biorhythm Composer) · theme **Convergent Life** · targets **Biodigital Excellence** + **Outstanding Digital Submission**.  
**Build constraint:** Web-only shipped MVP (no live biosensor demo). **Strategy:** 重内容、轻装置 — depth of science, citation discipline, and reflection over hardware. **Ideation-complete** bio + physical + AR layers documented in [`BDC_2026_Extinction_Archive_Planning_Document.md`](BDC_2026_Extinction_Archive_Planning_Document.md).

---

## 2. Concept summary

**Problem:** Extinction removes not only DNA but **temporal niches**—the day/year rhythms of a species. Public memory often flattens into images, not **time-in-the-world**.

**Approach:** A WebXR **memorial** that reconstructs **temporal phenotypes** for two deep-dossier species—**woolly mammoth** and **thylacine**—with an **epistemic UI** (Cited / Interpolated / Speculative) and an **ethics fork** (resources, ecological risk, Indigenous perspectives, tech boundaries). A **unified high-priority database of 87 species** (sensory + music scores; curated from 900+ documented extinctions incl. Holocene, IUCN, 2025 confirmations) backs the planetary-map narrative; [`data/extinction_archive/animals_full.csv`](data/extinction_archive/animals_full.csv) currently holds **51 taxa** for imports until the full sheet is merged.

**Differentiator:** Chronobiology + **honest limits** of AI and aDNA inference + **Indigenous sovereignty** framing for thylacine (Clements, Schlunke, **Palawa-led**: Rimmer, Lehman) + **sensory time capsule** (rhythm and niche, not only appearance).

---

## 3. Deliverables (BDC)

| Deliverable | Status / owner |
|-------------|----------------|
| 10 min presentation + 5 min Q&A | Week 4 — Member A lead |
| Visuals + storyboard | Ongoing — tied to scene IDs in detailed plan |
| Physical anchor (minimal) | Single object + QR → experience |
| 1–5 min creative video | Week 4 |
| Slides (Drive upload) | Map to Narrative · Concept · Context · Reflection |

**MVP user journey:** Immersion → uncertainty layers → **one ethical choice** → **reflection input** ([`templates/reflection-log-webxr.html`](templates/reflection-log-webxr.html)).

---

## 4. Milestones (4-week spine)

| Week | Phase | Outcomes |
|------|--------|----------|
| 1 | Discovery | Literature locked per slot; storyboard ↔ citation grid; WebXR shell |
| 2 | Prototype | Time scrubber; generative env constraints; epistemic toggles |
| 3 | Integration | Sonification; ethics UI; Indigenous context copy; reflection panel |
| 4 | Polish | Rehearsal, video, deploy, print cheat sheet |

*(Adjust to your course calendar; align with [BDC key dates](https://biodesignchallenge.org).)*

---

## 5. Repository layout

| Path | Purpose |
|------|---------|
| [`BDC_2026_Extinction_Archive_Planning_Document.md`](BDC_2026_Extinction_Archive_Planning_Document.md) | **Canonical detailed plan:** citations M1–T5, storyboard IDs, T5 copy, verification log |
| [`PROJECT_PLAN.md`](PROJECT_PLAN.md) | This executive plan |
| [`templates/reflection-log-webxr.html`](templates/reflection-log-webxr.html) | Reflection + heuristic ethics match (embed in A-Frame overlay) |
| [`web/extinction-archive/index.html`](web/extinction-archive/index.html) | **Web prototype:** species hub, A-Frame shells + **Scene\_\*** floating labels, procedural (CC0) ground textures, mammoth/thylacine **sonification**, pigeon polyphony, ethics fork, **`postMessage` ↔** [`templates/reflection-log-webxr.html`](templates/reflection-log-webxr.html). **Paths:** `js/config.js` resolves `archive.json` from repo root; for GitHub Pages use whole-repo publish or set `<meta name="ea-asset-base" content="https://…/">`. |
| `slides/export/` | **`Extinction_Archive_Umwelt_Hypothesis_Dossiers_BDC2026_EN.pdf`** + **`[FINAL-SMALL] … BDC2026.pdf`** (compact; same bytes). **`Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf`** — full BDC judge walkthrough (new; does not replace legacy `BDC_Deck_EN.pdf`). Build: `docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py`. Optional: `Archive_of_Extinction_Final_BDC2026.*` via `scripts/build_final_presentation.py` |
| `BDC_2026_*.md`, `biodesign_cursor_agent.md`, `The complete guide…` | Course / competition context |
| `docs/` | Optional extended docs |
| [`docs/GITHUB_SYNC.md`](docs/GITHUB_SYNC.md) | How to push this repo to GitHub |

---

## 6. Risks & mitigations

- **“Just VR art”** — Keep scene→citation strip visible; judges can pause on proxies.  
- **Overclaiming genetics** — Mammoth clock copy locked to Lynch (2015) abstract-level unless PDF verifies gene names.  
- **Indigenous tokenism** — Palawa-first sources alongside Clements/Schlunke; label author positionality.  
- **Scope creep** — No sensors; cut stretch before epistemic or ethics UI.

---

## 7. Next actions (checklist)

- [ ] Replace `YOUR_GITHUB_USERNAME` / remote in [`docs/GITHUB_SYNC.md`](docs/GITHUB_SYNC.md) after first push  
- [ ] Complete remaining literature checkboxes in detailed planning doc (M2–M5, T1, T3–T5)  
- [x] Wire `Scene_*` and `UI_*` IDs in WebXR build — see [`web/extinction-archive/`](web/extinction-archive/index.html) (prototype; expand A-Frame scenes as Week 2–3 progress)  
- [ ] Practice Q&A: biodesign without wet lab, AI transparency, PER2 / preprint boundaries  

---

*Last updated: April 2026. Course: Digital Art & AI Technology (MDes).*
