# Extinction Archive: Umwelt hypothesis dossiers

## Project Summary

**Project type:** Biodigital memorial / interactive installation  
**Challenge:** Biodesign Challenge 2026  
**Primary prize target:** BDC Prize for Biodigital Excellence  
**Secondary target:** Outstanding Social Critique / Art  
**Theme alignment:** *Convergent Life*

**One-sentence pitch:**  
*Extinction Archive: Umwelt hypothesis dossiers* is a biodigital memorial that lets visitors inhabit, critically and incompletely, the sensory-temporal worlds of vanished species, turning peer-reviewed biological traces into a constrained immersive dossier, a polyphonic ecological mixer, and an ethics console that redirects grief toward present-day biodiversity responsibility.

## Core Proposition

This project begins from two linked absences:

1. Extinction erases bodies, behaviors, rhythms, and ecological relationships.
2. Human societies gradually lose collective memory of what biological abundance once felt like.

The project responds by treating **Umwelt as memory technology**. Rather than claiming full resurrection, it builds a clearly bounded hypothesis space from biological evidence. Visitors move through archival dossiers, sound-based ecological composition, and ethical tradeoff interfaces to experience extinction as both biological loss and cultural amnesia.

## Design Principles

- **Evidence before spectacle:** every strong claim must be classed as `Cited`, `Modeled`, or `Speculative`.
- **From biology, not around biology:** the biological data must be load-bearing, not decorative.
- **Museum sobriety:** the overall tone is quiet, reflective, and archival; awe appears briefly, mainly in the mixer.
- **No false resurrection:** the interface must never imply total scientific certainty.
- **Emotion must return to action:** the experience ends with real tradeoffs, not nostalgia alone.

## Experience Flow

### 1. Memory Sites Map

The MVP opens with **2-5 curated memory sites**, not a full global atlas. Each point corresponds to a last-known habitat, historical coordinate, or ecologically meaningful time-place entry for one hero species.

Each site contains:

- species name
- date / time slice
- habitat framing
- archival entry point into a dossier

### 2. Species Dossier

Each hero species has a dossier that combines evidence cards with a constrained immersive environment.

**Hero species:**

- **Woolly mammoth (*Mammuthus primigenius*)**
- **Passenger pigeon (*Ectopistes migratorius*)**

**Dossier fields:**

- temporal niche: day/night and seasonal patterns
- movement: migration, range, synchrony, density
- sensory proxies: vision, hearing, smell-related narrative cues
- extinction mechanism
- uncertainty and evidence tier

### 3. Polyphony Mixer

The mixer converts ecological variables into layered sound and rhythm.

- Mammoth emphasizes long seasonal movement, Arctic photoperiod, low-frequency pacing, and spatial drift.
- Passenger pigeon emphasizes mass synchrony, density, collapse, and social timing thresholds.

The goal is not “music about animals” but an audible model of ecological co-presence, pressure, and disappearance.

### 4. Ethics Console

The final module interrupts immersion and asks visitors to make constrained decisions.

Interaction types:

- short evidence-tier classification prompts
- branching ethics cards
- forced resource allocation choices
- consequences rendered as text + altered sonic finale

This is where the project addresses:

- de-extinction hype
- conservation resource allocation
- land-use pressures
- moral hazard of “reversible extinction”
- misinformation and emotional overconfidence produced by AI

## Biological Layer

The biological layer is built from traceable evidence, including:

- mammoth tusk isotope studies and movement reconstruction
- comparative genomics and Arctic adaptation literature
- morphology-based sensory proxies
- historical passenger pigeon range, flocking, and collapse literature
- acoustic ecology from relatives or carefully bounded modeled sound
- habitat and vegetation references for narrative smell/touch framing

Important constraint:

- **Smell is always metaphorical / synesthetic in the digital experience and always labeled `Speculative`.**

## Digital Layer

The digital layer translates evidence into interaction without pretending to be complete reconstruction.

**Primary generation strategy:** diffusion + structural conditioning  
**Support layer:** procedural / shader-based atmospheric logic

**Planned systems:**

- A-Frame-first WebXR experience
- desktop web fallback
- mobile WebAR entry points for physical models
- Web Audio DSP for multi-track ecological mixing
- R / ggplot exports for isotope and scientific visuals
- metadata logging for prompt provenance and source IDs

## Physical + Living Installation

The physical installation anchors the work in gallery space while preserving conceptual clarity.

### Physical objects

- 3D-printed mammoth / pigeon object or abstraction
- AR-triggered deep links to dossiers
- symbolic tactile board using safe, non-food materials

Examples of tactile materials:

- felt
- wood fiber
- steppe / tundra-inspired textures

### Living bench

The living layer uses:

- plants
- soil moisture sensor
- ambient light sensor
- temperature sensor

These signals modulate one audio bus in real time. The purpose is not to simulate extinct life, but to index life that is still present.

Suggested label:

> Not a simulation of extinct habitat - an index of present life.

## BDC Alignment

### Narrative

- clear movement from map to dossier to mixer to ethics
- strong emotional hook without melodrama
- mammoth-first presentation arc for clarity

### Concept

- Umwelt + temporal niche as the conceptual core
- collective memory fracture as the social frame
- code and biology are both essential

### Context

- conservation ethics
- biodiversity loss
- de-extinction critique
- installation sustainability
- explicit anti-misinformation framing

### Reflection

- evidence-tier system built into UI
- prompt iteration log
- discarded approach log
- expert consultant review

## Technical Scope

### Stack

- **Front-end / XR:** A-Frame first
- **3D support:** Three.js inside A-Frame ecosystem as needed
- **Audio:** Web Audio API + custom DSP
- **Data:** R / Python to static figures and structured JSON
- **Physical computing:** micro:bit or ESP32 + WebSocket

### MVP Boundary

The MVP is complete when a user can:

1. open a memory site
2. enter the mammoth dossier
3. view one cited isotope figure
4. experience a day/night scene tied to evidence
5. use a mixer with at least four meaningful parameters
6. complete an ethics interaction that changes the sonic ending
7. scan a physical object into a WebAR entry point
8. hear at least one living-sensor modulation

## Production Plan

### Week 1 — Discovery

- lock dossier fields
- lock 2-5 memory sites
- finalize evidence cards
- define ethics branches
- confirm expert consultant outreach

### Week 2 — Prototype

- mammoth dossier vertical slice
- first mixer layer
- A-Frame scene structure
- begin film track in parallel

### Week 3 — Integration

- passenger pigeon module
- ethics console state logic
- WebAR path
- living bench data pipeline
- tactile table integration

### Week 4 — Polish

- evidence audit
- visual consistency pass
- Q&A appendix
- trailer lock
- physical installation finish

## Risk Register

| Risk | Mitigation |
|------|------------|
| AI output looks like factual reconstruction | Strong tier labels and verbal framing |
| Weak scientific claims in presentation | Appendix citations and consultant review |
| AR failure during presentation | Desktop fallback + recorded demo |
| Tactile material sensitivity | Low-volatility, non-food materials + signage |
| Ethics interface feels shallow | Rule-based consequences grounded in literature |
| Project seen as “not enough biology” | Maintain from-biology framing + living bench contrast |

## Immediate Next Actions

1. Finalize the 2-5 memory site list with coordinates, dates, and citations.
2. Assign owners for Bio, XR, Audio, Fabrication, and Film.
3. Build the mammoth-first vertical slice before expanding pigeon complexity.
4. Schedule one expert review focused on mammoth genomics and pigeon synchrony claims.
5. Prepare a methods appendix in parallel with the main deck rather than after it.

## Repo Assets

- Planning document: `docs/bdc-umwelt-archive/PROJECT_PLAN.md`
- Working brief: `BDC_2026_Extinction_Archive_Planning_Document.md`
- Slide source: `slides/source/BDC_Extinction_Archive_EN.md`
- Slide deck: `slides/export/BDC_Extinction_Archive_EN.pptx`
- Slide preview links: `slides/README.md`
