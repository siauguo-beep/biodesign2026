# Biodesign Challenge 2026 — Project plan (master)

**Project name:** Extinction Archive (*Biodigital Chronobiology / Temporal Niche*)  
**Competition:** [Biodesign Challenge 2026](https://biodesignchallenge.org)  
**Exhibition theme:** Convergent Life  
**Target awards:** Biodigital Excellence; strong Narrative, Context, Reflection  

---

## 1. Team & roles

| Member | Role | Focus |
|--------|------|--------|
| A | Experience lead | Narrative, sensory direction, palaeo-chronobiology translation, ethics |
| B | Tech / AI lead | WebXR (A-Frame / Three.js), generative environments, epistemic UI |

**Team size:** 2  
**Build constraint:** Web-only (no living biosensor demo). **Strategy:** 重内容、轻装置 — depth of science, citation discipline, and reflection over hardware.

---

## 2. Concept summary

**Problem:** Extinction removes not only DNA but **temporal niches**—the day/year rhythms of a species. Public memory often flattens into images, not **time-in-the-world**.

**Approach:** A WebXR **memorial** that reconstructs **temporal phenotypes** for two species—**woolly mammoth** (polar / circadian genomics, steppe habitat) and **thylacine** (orbit → diel activity, POV metaphor, colonial context)—with an **epistemic UI** (Cited / Interpolated / Speculative) and an **ethics fork** (Sherkow & Greely–style trade-offs).

**Differentiator:** Chronobiology + **honest limits** of AI and aDNA inference + **Indigenous sovereignty** framing for thylacine (Clements, Schlunke, **Palawa-led**: Rimmer, Lehman).

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
| `slides/` | **`export/Archive_of_Extinction_Final_BDC2026.pptx` + `.pdf`** — canonical BDC deck (`scripts/build_final_presentation.py`) |
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
- [ ] Wire `Scene_*` and `UI_*` IDs in WebXR build  
- [ ] Practice Q&A: biodesign without wet lab, AI transparency, PER2 / preprint boundaries  

---

*Last updated: April 2026. Course: Digital Art & AI Technology (MDes).*
