/**
 * Scene copy aligned with BDC_2026_Extinction_Archive_Planning_Document.md IDs.
 * UI strings only — verify against primary PDFs before marking Cited in production.
 */
window.EXTINCTION_ARCHIVE_SCENES = {
  mammoth: {
    key: "mammoth",
    archiveScientific: "Mammuthus primigenius",
    title: "Woolly mammoth",
    sceneIds: ["Scene_Bio_01", "Scene_Landscape_01"],
    cited:
      "Woolly mammoths carry mammoth-specific amino-acid changes enriched in circadian-related genes among other Arctic adaptations (Lynch et al., 2015). Do not state PER2 variant counts until verified in primary PDF.",
    interpolated:
      "Polar day/night scrub: reindeer molecular clock attenuation (Lu et al., 2010) is analogical support for high-latitude decoupling from strict 24h entrainment — not a mammoth measurement.",
    speculative:
      "Generative steppe moodboard: seasonal productivity priors from Zimov et al. (2012) — creative atmosphere only.",
    xrHint: "Sky colour proxies photoperiod / season (Modeled).",
    /** Floating labels inside A-Frame (procedural scene — add licensed GLTF later per asset ID). */
    aframeLabels: [
      { el: "mammoth-lbl-bio", text: "Scene_Bio_01 — Lynch et al. 2015 (Cited strip)" },
      { el: "mammoth-lbl-land", text: "Scene_Landscape_01 — steppe productivity (Zimov 2012 · env prior)" },
      { el: "mammoth-lbl-env", text: "Scene_Environment_02 — photoperiod proxy (Lu 2010 analogy · Interpolated)" },
    ],
  },
  thylacine: {
    key: "thylacine",
    archiveScientific: "Thylacinus cynocephalus",
    title: "Thylacine",
    sceneIds: ["Scene_Bio_02", "Scene_POV_01", "UI_Indigenous_Context"],
    cited:
      "Skull / orbit evidence supports a crepuscular or nocturnal predation niche (Pozniak et al., 2018).",
    interpolated:
      "POV motion–contrast emphasis draws on Mass & Supin (2020) RGC distribution models (cetacean species); not thylacine retinal measurement.",
    speculative:
      "Atmospheric twilight vignette — evocative only; not recovered vision.",
    indigenous:
      "Thylacine extinction is entangled with colonial violence against Palawa peoples and Country. De-extinction discourse raises questions of cultural sovereignty — who defines life, memory, and responsibility — not genetics alone. (Planning doc T5; see Palawa-led sources in repository.)",
    xrHint: "Twilight gradient proxies diel niche (Cited + Interpolated layers).",
    aframeLabels: [
      { el: "thyla-lbl-bio", text: "Scene_Bio_02 — orbit / diel (Pozniak et al. 2018 · Cited)" },
      { el: "thyla-lbl-pov", text: "Scene_POV_01 — RGC metaphor (Mass & Supin 2020 · Interpolated)" },
      { el: "thyla-lbl-ui", text: "UI_Indigenous_Context — Palawa / Country (planning T5)" },
    ],
  },
  pigeon: {
    key: "pigeon",
    archiveScientific: "Ectopistes migratorius",
    title: "Passenger pigeon",
    sceneIds: ["Polyphony metaphor", "Acoustic absence"],
    cited:
      "Historic megaflocks and extinction chronology — Smithsonian Martha, Birds of the World, Project Passenger Pigeon (URLs in archive.json / archival CSV).",
    interpolated:
      "Social synchrony collapse: sonic metaphor of phase lock breaking as colony effective population N drops — Modeled, not recorded flock audio.",
    speculative:
      "Sparse or empty public sound archives treated as evidence of acoustic loss — honest UI, not bug.",
    xrHint: "Polyphony demo uses Web Audio (Modeled).",
  },
};

window.EXTINCTION_ETHICS_CHOICES = [
  {
    id: "lab",
    label: "Prioritise laboratory de-extinction and genomic revival programmes",
    note: "Sherkow & Greely (2013) — resource allocation as normative choice.",
  },
  {
    id: "field",
    label: "Prioritise in situ conservation of extant species and landscapes",
    note: "Trade-off framing; no single correct answer in this prototype.",
  },
  {
    id: "memorial",
    label: "Prioritise digital memorials, archives, and public literacy over revival",
    note: "Aligns with this submission’s scope: evidence-linked memory, not resurrection.",
  },
];
