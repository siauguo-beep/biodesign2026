#!/usr/bin/env python3
"""
Build Extinction Archive slide PDFs (EN + ZH) — theme: archival biodigital (dark base, accent rule).
Output: REPO_ROOT/slides/export/ — EN compact + [FINAL-SMALL] alias + ZH + optional full judge deck.
Requires: pip install fpdf2
Font: Arial Unicode (macOS) for Latin + CJK.

Full judge deck (new file; does not overwrite BDC_Deck_EN.pdf or FINAL-SMALL):
  Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf
"""
from __future__ import annotations

import argparse
import shutil
import sys
from pathlib import Path

from fpdf import FPDF

# Repo root: .../Biodesign_Project_2 (scripts live under docs/bdc-umwelt-archive/scripts/)
REPO_ROOT = Path(__file__).resolve().parents[3]
EXPORT = REPO_ROOT / "slides" / "export"
# macOS Arial Unicode paths
FONT_CANDIDATES = [
    Path("/Library/Fonts/Arial Unicode.ttf"),
    Path("/System/Library/Fonts/Supplemental/Arial Unicode.ttf"),
]

BG = (20, 18, 16)
FG = (230, 223, 214)
ACCENT = (196, 92, 42)
SIGNAL = (92, 184, 154)
MUTED = (154, 143, 132)

# Standard widescreen 16:9 — same as PowerPoint / Keynote default (13.333" × 7.5")
INCH_TO_MM = 25.4
SLIDE_W_MM = 13.333 * INCH_TO_MM   # 338.6662 mm
SLIDE_H_MM = 7.5 * INCH_TO_MM      # 190.5 mm
MARGIN_X = 22.0
MARGIN_BULLET_INDENT = 4.0
# Content column width inside horizontal margins
CONTENT_W = SLIDE_W_MM - 2 * MARGIN_X
BOTTOM_SAFE = 16.0  # keep text above bottom crop on projectors


class Deck(FPDF):
    def __init__(self, font_path: Path):
        super().__init__(
            format=(round(SLIDE_W_MM, 2), round(SLIDE_H_MM, 2)),
            orientation="landscape",
            unit="mm",
        )
        self.set_auto_page_break(False)
        self.add_font("Archival", "", str(font_path))
        self._font = "Archival"
        self._w = float(SLIDE_W_MM)
        self._h = float(SLIDE_H_MM)

    def slide_bg(self) -> None:
        self.set_fill_color(*BG)
        self.rect(0, 0, self._w, self._h, "F")
        self.set_draw_color(*ACCENT)
        self.set_line_width(1.2)
        self.line(0, 6, self._w, 6)

    def title_slide(self, title: str, subtitle: str, lines: list[str]) -> None:
        self.add_page()
        self.slide_bg()
        self.set_font(self._font, "", 24)
        self.set_text_color(*FG)
        self.set_xy(MARGIN_X, 38)
        self.multi_cell(CONTENT_W, 13, title, align="L")
        self.set_font(self._font, "", 15)
        self.set_text_color(*ACCENT)
        self.set_xy(MARGIN_X, 64)
        self.multi_cell(CONTENT_W, 9, subtitle, align="L")
        self.set_font(self._font, "", 11.5)
        self.set_text_color(*MUTED)
        y = 94
        for line in lines:
            self.set_xy(MARGIN_X, y)
            self.multi_cell(CONTENT_W, 7.5, line, align="L")
            y += 8.5

    def body_slide(self, title: str, bullets: list[str], small: bool = False) -> None:
        self.add_page()
        self.slide_bg()
        self.set_font(self._font, "", 17)
        self.set_text_color(*ACCENT)
        self.set_xy(MARGIN_X, 24)
        self.multi_cell(CONTENT_W, 10, title, align="L")
        self.set_font(self._font, "" if not small else "", 11.5 if not small else 10)
        self.set_text_color(*FG)
        y = 46
        bullet_x = MARGIN_X + MARGIN_BULLET_INDENT
        bullet_w = CONTENT_W - MARGIN_BULLET_INDENT
        lim = self._h - BOTTOM_SAFE
        for b in bullets:
            self.set_xy(bullet_x, y)
            self.multi_cell(bullet_w, 6.8 if not small else 6.0, f"  •  {b}", align="L")
            y += 7.0 if not small else 6.4
            if y > lim:
                break

    def table_slide(self, title: str, headers: tuple[str, ...], rows: list[tuple[str, ...]], small: bool = True) -> None:
        self.add_page()
        self.slide_bg()
        self.set_font(self._font, "", 17)
        self.set_text_color(*ACCENT)
        self.set_xy(MARGIN_X, 24)
        self.multi_cell(CONTENT_W, 10, title, align="L")
        fs = 8.6 if small else 9.2
        col_w = CONTENT_W / len(headers)
        y = 42
        self.set_font(self._font, "", fs)
        self.set_text_color(*SIGNAL)
        x0 = MARGIN_X
        for i, h in enumerate(headers):
            self.set_xy(x0 + i * col_w, y)
            self.cell(col_w, 7.5, h, align="L")
        y += 10
        self.set_draw_color(80, 72, 65)
        self.line(MARGIN_X, y, MARGIN_X + CONTENT_W, y)
        y += 3.5
        self.set_font(self._font, "", fs - 0.2)
        self.set_text_color(*FG)
        lim = self._h - BOTTOM_SAFE
        for row in rows:
            for i, cell in enumerate(row):
                self.set_xy(x0 + i * col_w, y)
                self.multi_cell(col_w - 2, 4.8, cell, align="L")
            y += max(15, 4.8 * 2)
            if y > lim:
                break


def find_font() -> Path:
    for p in FONT_CANDIDATES:
        if p.exists():
            return p
    print("No Arial Unicode.ttf found; install a Unicode TTF and edit FONT_CANDIDATES.", file=sys.stderr)
    sys.exit(1)


def build_en(font: Path) -> None:
    d = Deck(font)
    d.title_slide(
        "Extinction Archive",
        "Umwelt Hypothesis Dossiers — A Sensory Time Capsule",
        [
            "Biodesign Challenge 2026 · Convergent Life",
            "AI memorial for lost species — literature-grounded, not resurrection",
            "WebXR + in-repo data layer · heavy evidence, light hardware",
        ],
    )
    d.body_slide(
        "Repository & research layer (2026 update)",
        [
            "Shipped course build: browser / WebXR — no live biosensor demo; one QR + optional citation sheet.",
            "51 taxa → data/extinction_archive/animals_full.csv; bundle archive.json + archive_import.sql (PostgreSQL).",
            "archival_media_research.csv — ~349 curated rows (IUCN, GBIF, BHL, NFSA, SI, BOW, PMC…).",
            "Planning + tiers: BDC_2026_Extinction_Archive_Planning_Document.md · docs/research/bdc_showcase_species_shortlist.md",
            "Literature spine: 02_research/biology/biodigital_chronobiology_research.md — regenerate via scripts/extinction_archive_db/",
        ],
        small=True,
    )
    d.body_slide(
        "The fracture (Umwelt + time)",
        [
            "Extinction removes DNA and ecological roles — and temporal niches (day, season, social synchrony).",
            "Public memory flattens into icons; we lose how another species lived in time.",
            "Collective amnesia about biodiversity integrity — shifting baselines, de-extinction hype.",
            "This dossier makes absence narratable with structured uncertainty.",
        ],
    )
    d.body_slide(
        "Three guiding questions",
        [
            "How can extinction–absence become perceivable without false precision?",
            "How can AI + biological data evoke memory transparently (no replacement for conservation or Indigenous knowledge)?",
            "How can touch, sight, smell, sound act as gentle cues — optional layers, no sensory overload?",
        ],
    )
    d.body_slide(
        "Experience spine",
        [
            "Planetary map to coordinate to species dossier (vision; WebXR MVP = two deep species).",
            "Bio layer: genomics, morphology, isotopes, museum & GBIF records.",
            "Digital layer: constrained generative scenes + Web Audio sonification / stem metaphor.",
            "Exit: ethics fork + reflection — stewardship of extant life.",
        ],
    )
    d.table_slide(
        "Three load-bearing modules",
        ("Module", "Role"),
        [
            ("Species Dossier", "Evidence cards, sensory proxies, extinction drivers — scene to citation"),
            ("Polyphony Mixer", "Seasonal / diel / migration / density — harmony vs collapse"),
            ("Ethics Console", "Trade-offs (funding, invasion risk, sovereignty) + evidence gate"),
        ],
    )
    d.table_slide(
        "Species tiers (research + build)",
        ("Tier", "Taxa", "Role"),
        [
            (
                "P0 WebXR",
                "Mammuthus primigenius\nThylacinus cynocephalus",
                "Full interactive depth; chronobiology + orbit/POV; citation strip",
            ),
            (
                "P0 dossier",
                "Ectopistes migratorius",
                "Deck / appendix: Martha, synchrony, acoustic absence (xeno-canto may be empty)",
            ),
            (
                "P1 dossier",
                "Dodo · Great auk\n(Raphus · Pinguinus)",
                "14+ curated URLs each — islands, BHL, SI; Context lane, not WebXR v1",
            ),
        ],
        small=True,
    )
    d.body_slide(
        "Bio + Digital (web-only shipped build)",
        [
            "Biology: palaeo-chronobiology, isotope trails (e.g. tusk mobility), orbit to diel activity — papers first.",
            "Digital: A-Frame / Three.js WebXR; generative env with prompt + constraint doc; epistemic UI always on-screen.",
            "No live biosensor demo in course build — optional public daylight API vs paleo-latitude if time.",
        ],
    )
    d.body_slide(
        "Honesty UI: Cited · Interpolated · Speculative",
        [
            "Cited — peer-reviewed paper, museum catalogue, or dataset row.",
            "Interpolated — justified inference (e.g. RGC model not measured on thylacine).",
            "Speculative — creative extension; never sold as recovered reality.",
            "Archival media (NFSA, SI): licence check before trailer or embed.",
        ],
    )
    d.table_slide(
        "Data layer in repository",
        ("Asset", "Purpose"),
        [
            ("animals_full.csv (51 taxa)", "Names, extinction, pharm flags, Umwelt scores, 3D refs"),
            ("archive.json + archive_import.sql", "Frontend bundle + PostgreSQL animals / media / refs"),
            ("archival_media_research.csv", "~349 rows: IUCN, GBIF, BHL, NFSA, BOW, PMC…"),
            ("extinction_archive_schema.*", "Future map sites + reconstruction_layer + scenes"),
        ],
        small=True,
    )
    d.body_slide(
        "Mammoth — cited anchors",
        [
            "Comparative genomics & circadian-related gene enrichment (Lynch et al., 2015) — conservative on PER2 until PDF verified.",
            "Mammoth steppe habitat framing (Zimov et al., 2012).",
            "Lifetime mobility from tusk isotopes (Wooller et al., 2021, Science) — migration as sonification input.",
        ],
    )
    d.body_slide(
        "Thylacine — archives + ethics",
        [
            "Orbit to crepuscular / nocturnal niche (Pozniak et al., 2018); POV filter Interpolated from RGC topology methods.",
            "Moving image: NFSA collection — clearance required; TMAG / NMA for specimen narrative.",
            "Context: Palawa-led sources + Clements / Schlunke on sovereignty vs de-extinction spectacle.",
        ],
    )
    d.body_slide(
        "Passenger pigeon — dossier beat",
        [
            "Smithsonian Martha + Project Passenger Pigeon + Birds of the World account.",
            "Social synchrony collapse: sonic metaphor of phase lock breaking.",
            "Empty or sparse sound archives = evidence of acoustic loss — honest UI copy.",
        ],
    )
    d.table_slide(
        "BDC judging map",
        ("Dimension", "We show"),
        [
            ("Narrative", "Rhythm of immersion then uncertainty then ethical fork"),
            ("Concept", "Umwelt + temporal phenotype + biodigital coupling"),
            ("Context", "De-extinction trade-offs, pharm/trade where relevant, colonial archive politics"),
            ("Reflection", "AI limits, what archives omit, user reflection stub"),
        ],
        small=True,
    )
    d.body_slide(
        "Deliverables & 4-week spine",
        [
            "Live WebXR · citation grid · one ethical choice + reflection · trailer · QR anchor.",
            "EN PDF: slides/export/Extinction_Archive_Umwelt_Hypothesis_Dossiers_BDC2026_EN.pdf",
            "GitHub alias (same file): [FINAL-SMALL] Extinction Archive … Dossiers_BDC2026.pdf in slides/export/",
            "Sprint: W1 literature/URLs → W2 mammoth + UI → W3 thylacine + ethics → W4 polish + Q&A.",
            "Rebuild: python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py · Target: Biodigital Excellence.",
        ],
        small=True,
    )
    out = EXPORT / "Extinction_Archive_Umwelt_Hypothesis_Dossiers_BDC2026_EN.pdf"
    d.output(out)
    print(f"Wrote {out}")
    small_alias = (
        EXPORT / "[FINAL-SMALL] Extinction Archive Umwelt Hypothesis Dossiers_BDC2026.pdf"
    )
    shutil.copy2(out, small_alias)
    print(f"Wrote {small_alias}")


def build_en_full_judge(font: Path) -> None:
    """BDC judge-oriented full deck: ideation + research + planning + rubric (new filename)."""
    d = Deck(font)
    d.title_slide(
        "Extinction Archive: Umwelt Hypothesis Dossiers",
        "Extinction Archive: AI Memorial for Lost Species — “Umwelt Archive” · A Sensory Time Capsule",
        [
            "Biodesign Challenge 2026 · Exhibition: Convergent Life",
            "Literature-grounded biodigital memorial — not resurrection · WebXR + repository-backed evidence",
            "Full judge deck (EN) — does not replace compact PDFs on GitHub",
        ],
    )
    d.table_slide(
        "Team · build constraint",
        ("Role", "Focus"),
        [
            ("Experience lead", "Narrative, chronobiology→Umwelt translation, ethics, dossier curation"),
            ("Tech / AI lead", "WebXR (A-Frame / Three.js), generative env, epistemic + ethics UI"),
            ("Shipped scope", "Web-only MVP — no live biosensor demo; QR + optional citation sheet"),
        ],
        small=True,
    )
    d.body_slide(
        "Problem (ideation + ecology)",
        [
            "Extinction removes genomes, roles, and temporal niches — day, season, migration, social synchrony.",
            "Public memory flattens into icons; shifting baselines and de-extinction hype hide the texture of loss.",
            "We address the human gap in sensing extinction: another species’ time and Umwelt, not only its image.",
        ],
    )
    d.body_slide(
        "Design hypothesis",
        [
            "If temporal phenotypes + sensory proxies are reconstructed under Cited / Interpolated / Speculative labels,",
            "using chronobiology, morphology, isotopes, and curated archival media,",
            "absence becomes narratable without false certainty — steering reflection toward extant biodiversity stewardship.",
        ],
        small=True,
    )
    d.body_slide(
        "Three guiding questions (research + exhibit)",
        [
            "How can extinction–absence be perceptible as structured uncertainty, not fake precision?",
            "How can AI + biological data transparently evoke memory — without replacing conservation or Indigenous knowledge?",
            "How can multisensory cues stay optional and gentle — intensity caps, clear tiers?",
        ],
    )
    d.body_slide(
        "Why biodesign (bio + digital load-bearing)",
        [
            "Biological layer: papers, specimens, isotopes, clock-related genomics, orbit→diel proxies — scene→citation.",
            "Digital layer: constrained generative visuals/audio, Web Audio sonification, inspectable AI use.",
            "Removing either layer collapses the proposition; course build stays browser-first / WebXR.",
        ],
        small=True,
    )
    d.body_slide(
        "Research spine (canonical doc)",
        [
            "02_research/biology/biodigital_chronobiology_research.md — palaeo-chronobiology, Umwelt frame, ethics hooks.",
            "Flagship science: Lynch et al. 2015 (mammoth; conservative clock copy), Pozniak et al. 2018 (thylacine orbit).",
            "Mobility narrative: Wooller et al. 2021 (tusk isotopes); ethics framing: Sherkow & Greely 2013; Clements 2025 + Palawa-led sources.",
        ],
        small=True,
    )
    d.body_slide(
        "Experience architecture",
        [
            "Planetary map → coordinate → species dossier (full vision); WebXR MVP = depth on two species.",
            "Polyphony: season, diel rhythm, migration, density — harmony vs collapse (e.g. passenger pigeon synchrony).",
            "Exit: ethics fork + reflection — resource trade-offs, sovereignty, technological fixism (templates/reflection-log-webxr.html).",
        ],
        small=True,
    )
    d.table_slide(
        "Three modules",
        ("Module", "Role"),
        [
            ("Species Dossier", "Evidence cards, sensory proxies, drivers — every scene ties to citation or tier"),
            ("Polyphony Mixer", "Rhythm / density / migration — user hears loss of synchrony"),
            ("Ethics Console", "Incompatible choices + evidence gate — no single “win” ending"),
        ],
    )
    d.table_slide(
        "Species tiers (planning + dataset)",
        ("Tier", "Taxa / scope", "Role"),
        [
            ("P0 WebXR", "Mammuthus primigenius · Thylacinus cynocephalus", "Full interactives; citation strip; Indigenous context UI"),
            ("P0 dossier", "Ectopistes migratorius", "Martha, BOW, acoustic absence; may sit outside WebXR v1"),
            ("P1 dossier", "Raphus · Pinguinus", "14+ URLs each — Context lane; museum/archive literacy"),
            ("P2 catalogue", "51 taxa CSV + schema", "Systematic research; future map — not 49 extra scenes"),
        ],
        small=True,
    )
    d.body_slide(
        "Species A — Woolly mammoth (cited beats)",
        [
            "Circadian-related gene category enrichment vs extant elephants — careful PER2 wording until PDF verified (planning log).",
            "Mammoth steppe / productivity priors (Zimov et al., 2012); cold / TRPV3 — prefer Lynch 2015 over preprint-only claims.",
            "Tusk isotope mobility (Wooller et al., 2021) as honest input to sonification — label Interpolated if not raw-data-mapped.",
        ],
        small=True,
    )
    d.body_slide(
        "Species B — Thylacine (science + context)",
        [
            "Orbit → crepuscular/nocturnal niche (Pozniak et al., 2018); POV metaphor Interpolated from Mass & Supin (2020) dolphin RGC methods.",
            "Colonial entanglement: bounty, habitat (Paddle; Sleightholme & Campbell) — UI_Indigenous_Context + Palawa-first bibliography.",
            "NFSA / museum moving image: licence gate — never assume public domain.",
        ],
        small=True,
    )
    d.body_slide(
        "Passenger pigeon + P1 island dossiers",
        [
            "Pigeon: Smithsonian Martha, Project Passenger Pigeon, BOW — social synchrony collapse as sonic metaphor.",
            "Sparse xeno-canto / sound archives as evidence of acoustic loss — honest UI, not filler ambience.",
            "Dodo + great auk: curated archival rows in archival_media_research.csv for Context slides or film — not WebXR v1 unless surplus.",
        ],
        small=True,
    )
    d.body_slide(
        "Honesty UI · literature verification",
        [
            "Cited — paper, catalogue, dataset row. Interpolated — justified model (e.g. POV not measured on thylacine).",
            "Speculative — creative; never sold as recovered reality. Archival licences checked before trailer/embed.",
            "Planning doc holds verification log (M1 PER2, M4 preprint, T2 RGC DOI) — mirror short tags in WebXR comments.",
        ],
        small=True,
    )
    d.body_slide(
        "AI in biodesign (Reflection lane)",
        [
            "Roles: fenced scene synthesis, human-edited curation, parametric audio — not black-box truth.",
            "Aim: CLAIMS_REGISTER-style discipline: claim ↔ source or explicit Speculative; log models, prompts, failures.",
            "Judges see limits as feature — e.g. conservative mammoth genetics copy, failed renders documented.",
        ],
        small=True,
    )
    d.table_slide(
        "Repository · data layer",
        ("Asset", "Purpose"),
        [
            ("animals_full.csv (51 taxa)", "Names, extinction, pharm flags, Umwelt scores, 3D refs"),
            ("archive.json · archive_import.sql", "Static bundle + PostgreSQL animals / media / literature_references"),
            ("archival_media_research.csv", "~349 curated portal rows — regenerate via generate_archival_media_research.py"),
            ("extinction_archive_schema.*", "Future map sites, reconstruction_layer, scenes — PostGIS deferred"),
        ],
        small=True,
    )
    d.body_slide(
        "Physical presence · minimum viable",
        [
            "One tactile anchor + QR → WebXR (or static citation page). Optional A3 scene→citation sheet.",
            "Aligns with “heavy evidence, light hardware” — full ideation plant/sensor strand stays documentation-only for course build.",
        ],
    )
    d.table_slide(
        "BDC rubric — how we score ourselves",
        ("Dimension", "Evidence in submission"),
        [
            ("Narrative", "Rhythm: immersion → graded uncertainty → ethical fork; pigeon “silence” beat; thylacine care"),
            ("Concept", "Umwelt + temporal phenotype + biodigital coupling; two-layer honesty UI; two-species depth rule"),
            ("Context", "De-extinction trade-offs, pharm_related flags, colonial archives, Palawa-led sourcing for lutruwita"),
            ("Reflection", "AI limits, verification log, user reflection UI, what archives omit"),
        ],
        small=True,
    )
    d.body_slide(
        "Risks · mitigations (from project plan)",
        [
            "“Just VR art” — persistent scene→citation strip; judges can freeze on proxies.",
            "Overclaiming aDNA — mammoth clock language locked to abstract-level until gene-level PDF pass.",
            "Indigenous tokenism — Palawa-first texts alongside academic cross-cites; label positionality.",
            "Scope creep — cut stretch before epistemic or ethics UI breaks.",
        ],
        small=True,
    )
    d.table_slide(
        "Milestones (4-week spine)",
        ("Week", "Outcomes"),
        [
            ("1", "Literature + archival URLs; storyboard ↔ citation grid; WebXR shell"),
            ("2", "Time scrubber; generative constraints; epistemic toggles (mammoth)"),
            ("3", "Sonification; ethics + Indigenous copy; reflection panel (thylacine)"),
            ("4", "Rehearsal, 1–5 min video, deploy, cheat sheet, Q&A drill"),
        ],
        small=True,
    )
    d.body_slide(
        "Deliverables · documentation index",
        [
            "Live: WebXR + one ethical choice + reflection · trailer · images · process doc.",
            "Canonical plan: BDC_2026_Extinction_Archive_Planning_Document.md · Executive: PROJECT_PLAN.md.",
            "Compact decks (unchanged on GitHub): Extinction_Archive_Umwelt_Hypothesis_Dossiers_BDC2026_EN.pdf + [FINAL-SMALL] alias.",
            "This file: full judge walkthrough — add alongside legacy BDC_Deck_EN.pdf if present; do not overwrite backups.",
        ],
        small=True,
    )
    d.body_slide(
        "Thank you",
        [
            "Extinction Archive / Umwelt Archive — questions on evidence, sovereignty, and scope welcome.",
            "Rebuild all PDFs: python3 docs/bdc-umwelt-archive/scripts/build_extinction_archive_slides.py",
        ],
    )
    out = EXPORT / "Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf"
    d.output(out)
    print(f"Wrote {out}")


def build_zh(font: Path) -> None:
    d = Deck(font)
    d.title_slide(
        "灭绝档案 · Extinction Archive",
        "Umwelt Archive · 集体记忆断裂",
        [
            "Biodesign Challenge 2026 · 展览主题 Convergent Life",
            "数字艺术与 AI 技术 · MDes",
            "生物—数字纪念装置 — 非「复活」。",
        ],
    )
    d.body_slide(
        "断裂是什么",
        [
            "物种灭绝带走的不仅是身体，还有生态功能。",
            "共同记忆被磨损：基线漂移、复活叙事过热与奇观化。",
            "失去的是时间中的共存：迁徙、同步、昼夜与季节节律。",
            "本项目让缺席与证据变得可感知、可争论。",
        ],
    )
    d.body_slide(
        "设计问题",
        [
            "如何把「灭绝—缺席」转译为可感知、可讨论的体验？",
            "如何用 AI + 生物数据支撑有纪律的公共记忆？",
            "如何从沉浸回落到责任：保护、风险与正义的真实权衡？",
        ],
    )
    d.body_slide(
        "一句话概念",
        [
            "将可引用的科学痕迹转化为受约束的 Umwelt 假设空间。",
            "物种档案 + 多声部混音台 + 伦理控制台。",
            "每一层都带引用与置信度。",
        ],
    )
    d.table_slide(
        "三大模块",
        ("模块", "作用"),
        [
            ("Species Dossier", "时间、运动、感官代理 — 谨慎引用"),
            ("Polyphony Mixer", "季节、群体同步、迁徙 — 和谐或崩塌"),
            ("Ethics Console", "分支卡片 + 证据门禁 — 不同声景终曲"),
        ],
    )
    d.table_slide(
        "英雄物种（已定）",
        ("物种", "锚点", "隐喻"),
        (
            ("真猛犸 M. primigenius", "象牙同位素、光周期、基因组", "长周期、低频律动"),
            ("旅鸽 E. migratorius", "社会同步、历史大群", "相位锁定→寂静（Modeled）"),
        ),
    )
    d.body_slide(
        "生物层 + 数字层（缺一不可）",
        [
            "生物层：古代理、同位素、行为与灭绝机制 — 可追溯。",
            "数字层：条件生成（B 主）+ 程序化 / shader（A 辅）；WebAR + 桌面兜底。",
            "去掉任一层，项目即不成立。",
        ],
    )
    d.body_slide(
        "诚实界面：三档标签",
        [
            "Cited 已引用 — 文献或数据集",
            "Modeled 建模 — 推断与局限",
            "Speculative 推测 — 绝不冒充实拍",
            "提示：推断 — 非复原的真实",
        ],
    )
    d.body_slide(
        "实体入口（轻装置）",
        [
            "课程构建：Web-only，无活体生物传感器演示。",
            "一件 3D 打印或卡片 + QR → WebXR；可选一页 scene→citation 备忘。",
            "完整 ideation 中的植物/传感层可作为展陈愿景，不进入 MVP 范围。",
        ],
    )
    d.body_slide(
        "伦理控制台",
        [
            "门禁 C：陈述归入 Cited / Modeled / Speculative。",
            "分支 B：资金、入侵种、土地与知识 — 不可兼得。",
            "输出：终曲混音 + 系统后果（规则优先）。",
        ],
    )
    d.table_slide(
        "与 BDC 对齐",
        ("交付 / 评审", "说明"),
        [
            ("五件套", "陈述、视觉、实体、短片、幻灯片 — 与三模块绑定"),
            ("四维 ×4 分", "铂金须四维均 ≥2.75"),
        ],
        small=True,
    )
    d.body_slide(
        "奖项与冲刺",
        [
            "主攻：Biodigital Excellence。",
            "四周：证据与故事板 → 猛犸切片 → 旅鸽与伦理与 AR → 稽核与预告片。",
            "谢谢 — 欢迎提问。",
        ],
    )
    out = EXPORT / "Extinction_Archive_ZH.pdf"
    d.output(out)
    print(f"Wrote {out}")


def main() -> None:
    ap = argparse.ArgumentParser(description="Build Extinction Archive slide PDFs.")
    ap.add_argument(
        "--full-only",
        action="store_true",
        help="Only build Extinction_Archive_Umwelt_BDC_Judge_Full_Deck_EN_2026.pdf",
    )
    ap.add_argument(
        "--no-full",
        action="store_true",
        help="Skip full judge deck (compact EN + FINAL-SMALL alias + ZH only)",
    )
    args = ap.parse_args()

    EXPORT.mkdir(parents=True, exist_ok=True)
    font = find_font()
    if args.full_only:
        build_en_full_judge(font)
        return
    build_en(font)
    build_zh(font)
    if not args.no_full:
        build_en_full_judge(font)


if __name__ == "__main__":
    main()
