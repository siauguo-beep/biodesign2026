#!/usr/bin/env python3
"""Legacy summit deck (two PPTX filenames, same bytes). Prefer build_final_presentation.py for one canonical deck + PDF."""

from pathlib import Path

from pptx import Presentation
from pptx.util import Inches, Pt

OUT = Path(__file__).resolve().parent.parent / "slides" / "export" / "BDC_Summit_Extinction_Archive_2026.pptx"
# Plain-ASCII alias for tools / OS that mishandle long paths
OUT_ALIAS = Path(__file__).resolve().parent.parent / "slides" / "export" / "Extinction_Archive_Summit_2026.pptx"

INSTITUTION = "Macau University"
MENTOR = "Atticus SIMS"
TEAM = [
    ("GUO XIAO YUE", "MC569254"),
    ("LIU JIA QUN", "MC569293"),
]


def add_title_slide(prs, title, subtitle):
    slide = prs.slides.add_slide(prs.slide_layouts[0])
    slide.shapes.title.text = title
    slide.placeholders[1].text = subtitle
    return slide


def add_bullets(prs, title, bullets, size_pt=17):
    slide = prs.slides.add_slide(prs.slide_layouts[1])
    slide.shapes.title.text = title
    tf = slide.placeholders[1].text_frame
    tf.clear()
    for i, b in enumerate(bullets):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = b
        p.level = 0
        p.font.size = Pt(size_pt)
    return slide


def add_two_col(prs, title, left_title, left_bullets, right_title, right_bullets):
    slide = prs.slides.add_slide(prs.slide_layouts[3])  # two content
    slide.shapes.title.text = title
    # placeholders order may vary - typically 1 left body 2 right body
    bodies = [p for p in slide.placeholders if p.placeholder_format.idx > 0]
    if len(bodies) < 2:
        return add_bullets(prs, title, left_bullets + [""] + right_bullets)
    tf_l = bodies[0].text_frame
    tf_l.clear()
    tf_l.text = left_title
    tf_l.paragraphs[0].font.bold = True
    tf_l.paragraphs[0].font.size = Pt(14)
    for b in left_bullets:
        p = tf_l.add_paragraph()
        p.text = b
        p.level = 0
        p.font.size = Pt(15)
    tf_r = bodies[1].text_frame
    tf_r.clear()
    tf_r.text = right_title
    tf_r.paragraphs[0].font.bold = True
    tf_r.paragraphs[0].font.size = Pt(14)
    for b in right_bullets:
        p = tf_r.add_paragraph()
        p.text = b
        p.level = 0
        p.font.size = Pt(15)
    return slide


def main():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    add_title_slide(
        prs,
        "Extinction Archive",
        "Umwelt Hypothesis Dossiers — AI Memorial for Lost Species\n"
        "A Sensory Time Capsule · Biodesign Challenge 2026 · “Convergent Life”\n"
        f"{INSTITUTION}",
    )

    add_bullets(
        prs,
        "Team & institution",
        [
            f"Institution: {INSTITUTION}",
            f"Mentor: {MENTOR}",
            f"Team: {TEAM[0][0]} — ID {TEAM[0][1]}",
            f"Team: {TEAM[1][0]} — ID {TEAM[1][1]}",
            "Program: MDes — Digital Art & AI Technology (roles: experience / narrative + WebXR & epistemic UI).",
        ],
        size_pt=20,
    )

    add_bullets(
        prs,
        "Biodesign Challenge 2026",
        [
            "Premier student competition at the intersection of biotechnology, art, and design.",
            "2026 gallery: “Convergent Life.” Target prizes: Biodigital Excellence; Narrative, Context, Reflection.",
            "No single mandatory theme — our classroom advances chronobiology + extinction + digital memorial.",
            "Full criteria: biodesignchallenge.org/judging",
        ],
    )

    add_bullets(
        prs,
        "Roles & build scope",
        [
            "Experience lead: narrative, ethics, palaeo-chronobiology translation.",
            "Tech / AI lead: WebXR (A-Frame / Three.js), generative environments, epistemic UI.",
            "Build scope: Web-first memorial; minimal physical anchor + QR (content over hardware).",
        ],
    )

    add_bullets(
        prs,
        "The problem we design into",
        [
            "Extinction deletes more than DNA — it deletes a temporal niche: when a species foraged, migrated, synchronized with light and season.",
            "Public memory often reduces loss to images and icons, not lived time.",
            "We ask: can biodigital design help humans feel that loss of rhythm — and face de-extinction ethics honestly?",
        ],
    )

    add_bullets(
        prs,
        "Insight: Palaeo-chronobiology × temporal niche",
        [
            "Clock biology, photoperiod, and morphological proxies (orbit, TRPV3…) constrain how we infer “a day / a year” for extinct taxa.",
            "Generative AI + WebXR visualize those constraints — or violate them on purpose, flagged through an epistemic UI.",
            "Umwelt = sensory world; our dossiers treat sight, sound, thermosensation, and phase as hypothesis, not spectacle.",
        ],
    )

    add_bullets(
        prs,
        "Creative concept: Hypothesis dossiers",
        [
            "Two deep case studies only: Woolly mammoth (Arctic rhythm, mammoth steppe) + Thylacine (crepuscular vision, colonial context).",
            "Each scene maps to a citation slot (Scene_Bio_01 … UI_Reflection_Log).",
            "User journey: discover rhythm → feel uncertainty → ethical fork → reflection log.",
        ],
    )

    add_two_col(
        prs,
        "Two species — two dossiers",
        "Species A: Woolly mammoth",
        [
            "Circadian-related genomic contrasts (Lynch et al., 2015).",
            "Polar photoperiod analogy — reindeer clock attenuation (Lu et al., 2010) [Interpolated].",
            "Mammoth steppe productivity (Zimov et al., 2012).",
            "Cold / TRPV3 — Lynch (2015) primary; Kim bioRxiv optional.",
        ],
        "Species B: Thylacine",
        [
            "Orbit → diel activity (Pozniak et al., 2018).",
            "POV metaphor from RGC topography methods (Mass & Supin, 2020) [Interpolated].",
            "History & extinction drivers (Paddle, 2000; Sleightholme & Campbell, 2016).",
            "Colonial violence, Country, sovereignty (Clements 2025 + Palawa-led: Rimmer, Lehman; Schlunke 2025).",
        ],
    )

    add_bullets(
        prs,
        "Bio + digital stack",
        [
            "Biology as constraint system: every visual beat ties to literature or is labeled Interpolated / Speculative.",
            "Digital: A-Frame / Three.js WebXR; generative landscapes bounded by paleo proxies; optional sonification of phase.",
            "No wet-lab demo — stewardship of extant biodiversity is the moral horizon.",
        ],
    )

    add_bullets(
        prs,
        "Experience architecture (scene IDs)",
        [
            "Mammoth: Scene_Bio_01 → Scene_Environment_02 → Scene_Landscape_01 → Scene_Sensory_01.",
            "Thylacine: Scene_Bio_02 → Scene_POV_01 → Scene_Context_01.",
            "Shared: UI_Indigenous_Context → UI_Ethics_Fork → UI_Reflection_Log.",
            "On-screen short tags (Author, year) mirror the dossier appendix.",
        ],
    )

    add_bullets(
        prs,
        "Epistemic UI — three layers",
        [
            "Cited — direct claims from peer-reviewed (or named) sources.",
            "Interpolated — analogical models (e.g. reindeer clocks; dolphin RGC maps applied as metaphor).",
            "Speculative / generative — always disclosed; never silent AI “realism.”",
            "Judges can pause any scene and read the proxy column.",
        ],
    )

    add_bullets(
        prs,
        "Ethics: resource allocation & law of de-extinction",
        [
            "UI sliders informed by Sherkow & Greely (2013, Science): funding vs. field conservation; legal status; ecosystem risk.",
            "Not sci-fi branching — structured trade-offs grounded in published argument.",
            "Bridge to Indigenous governance: revival discourse vs. obligations to Country (Palawa-first citations).",
        ],
    )

    add_bullets(
        prs,
        "Context: colonial violence & ecological memory",
        [
            "Thylacine extinction is entangled with violence against Palawa peoples and Country (lutruwita / Tasmania).",
            "UI copy pairs Clements (2025) with Palawa-led voices — Rimmer (2020) on palawa kani / museums; Lehman (2013) Tasmanian Gothic.",
            "Schlunke (2025) — poetry, multiple Palawa names for thylacine, colonial temporality.",
            "Protocol: label author positionality; never substitute tourism copy for TEK.",
        ],
    )

    add_bullets(
        prs,
        "Ideation process (8 steps we follow)",
        [
            "1 Map skills · 2 Intersection statements · 3 Rubric stress-test · 4 Biology sprints",
            "5 Bio/digital split · 6 Narrative draft · 7 Prototype + deliverables · 8 Build + polish",
            "Cursor agent context + course workbook aligned to BDC judging dimensions.",
        ],
    )

    add_bullets(
        prs,
        "Design process — four-week spine",
        [
            "Week 1 Discovery — literature grid + storyboard; WebXR shell.",
            "Week 2 Prototype — time scrubber; generative constraints; epistemic toggles.",
            "Week 3 Integration — sonification; ethics + Indigenous UI; reflection template.",
            "Week 4 Polish — rehearsal, 1–5 min creative video, deploy, cheat sheet for judges.",
        ],
    )

    add_bullets(
        prs,
        "Key literature — Mammoth (M1–M5)",
        [
            "M1 Lynch et al., 2015 Cell Reports — DOI 10.1016/j.celrep.2015.06.027",
            "M2 Lu et al., 2010 Current Biology — reindeer DOI 10.1016/j.cub.2010.01.042",
            "M3 Zimov et al., 2012 Quaternary Science Reviews — DOI 10.1016/j.quascirev.2012.08.004",
            "M4 Kim et al., 2017 bioRxiv TRPV3 — 10.1101/151746 (preprint; phenotype anchored to Lynch 2015)",
            "M5 Sherkow & Greely, 2013 Science — DOI 10.1126/science.1236946",
        ],
    )

    add_bullets(
        prs,
        "Key literature — Thylacine & sovereignty (T1–T5 + Palawa)",
        [
            "T1 Pozniak et al., 2018 — DOI 10.1002/ar.23910",
            "T2 Mass & Supin, 2020 — DOI 10.31857/S0002332920060107 (RGC methods)",
            "T3 Paddle, 2000 — Cambridge ISBN 9780521782196",
            "T4 Sleightholme & Campbell, 2016 — DOI 10.1080/00222933.2016.1217037",
            "T5 Clements, 2025 — DOI 10.1177/13534858251272203 (verify access)",
            "Palawa: Rimmer 2020 Artlink; Lehman 2013 Griffith Review; Schlunke 2025 DOI 10.1017/ext.2025.10008 (PMC12722039)",
        ],
    )

    add_bullets(
        prs,
        "BDC rubric — how we score ourselves",
        [
            "Narrative (3/3): beat structure discover rhythm → loss → ethical fork.",
            "Concept (3/3): time as spine; every scene → one biological proxy.",
            "Context (2→3): de-extinction trade-offs + Palawa sovereignty sources expanded.",
            "Reflection (2.5→3): interactive epistemic UI + user reflection + AI limits disclosed.",
        ],
    )

    add_bullets(
        prs,
        "Deliverables checklist (BDC finalist)",
        [
            "10-minute oral + 5-minute Q&A — this deck supports the talk track.",
            "Visual renderings & WebXR build + scene→citation strip.",
            "Physical model: encouraged — we ship minimal tactile anchor + QR.",
            "1–5 minute creative video (trailer, not talk recording).",
            "Slides uploaded to shared Drive; optional site @biodesigned.",
        ],
    )

    add_bullets(
        prs,
        "Reflection & repository",
        [
            "templates/reflection-log-webxr.html — heuristic match to Sherkow/Greely themes + sovereignty keywords.",
            "Full dossier: BDC_2026_Extinction_Archive_Planning_Document.md + PROJECT_PLAN.md in repo.",
            "Next: bind all Scene_* IDs in production WebXR; complete unchecked literature PDF passes.",
        ],
    )

    add_title_slide(
        prs,
        "Thank you",
        "Extinction Archive — Umwelt Hypothesis Dossiers\n"
        "Questions? · biodesignchallenge.org · Biodigital Excellence",
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(str(OUT))
    prs.save(str(OUT_ALIAS))
    print(f"Wrote {OUT}")
    print(f"Wrote {OUT_ALIAS} (identical copy, shorter filename)")


if __name__ == "__main__":
    main()
