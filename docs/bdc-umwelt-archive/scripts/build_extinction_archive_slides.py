#!/usr/bin/env python3
"""
Build Extinction Archive slide PDFs (EN + ZH) — theme: archival biodigital.
Requires: pip install fpdf2
Font: Arial Unicode (macOS) for Latin + CJK.
"""
from __future__ import annotations

import sys
from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parents[1]
EXPORT = ROOT / "slides" / "export"
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
        "Umwelt Archive · Collective memory fracture",
        [
            "Biodesign Challenge 2026 · Convergent Life",
            "Digital Art & AI Technology · MDes",
            "Biodigital memorial — not resurrection.",
        ],
    )
    d.body_slide(
        "The fracture",
        [
            "Extinction removes species and ecological function.",
            "It erodes shared memory: shifting baselines, de-extinction hype.",
            "We lose temporal coexistence: migrations, synchrony, daily & seasonal rhythms.",
            "This project makes absence and evidence discussable.",
        ],
    )
    d.body_slide(
        "Design questions",
        [
            'How do we translate "extinction–absence" into perceivable experience?',
            "How can AI + biological data support disciplined public memory?",
            "How do we land in accountability (conservation tradeoffs), not only immersion?",
        ],
    )
    d.body_slide(
        "Concept",
        [
            "Interactive memorial: peer-reviewed traces become a constrained Umwelt.",
            "Species Dossier + Polyphony Mixer (Web Audio) + Ethics Console.",
            "Citations and confidence on every layer.",
        ],
    )
    d.table_slide(
        "Three modules",
        ("Module", "Role"),
        [
            ("Species Dossier", "Time, movement, sensory proxies — carefully cited"),
            ("Polyphony Mixer", "Seasons, flock sync, migration tempo — consonance / collapse"),
            ("Ethics Console", "Branching cards + evidence gate — different sonic finales"),
        ],
    )
    d.table_slide(
        "Hero species (locked)",
        ("Species", "Anchors", "Metaphor"),
        (
            (
                "Woolly mammoth\nM. primigenius",
                "Tusk isotopes, Arctic photoperiod, genomics",
                "Long cycles, low-frequency tempo",
            ),
            (
                "Passenger pigeon\nE. migratorius",
                "Social synchrony, historic megaflocks",
                "Phase lock to silence as N falls (Modeled)",
            ),
        ),
    )
    d.body_slide(
        "Bio + Digital (both essential)",
        [
            "Biology: paleo-sensory proxies, isotopes, ethology — traceable sources.",
            "Digital: conditional generation (B) + procedural/shader base (A); WebAR + desktop.",
            "Remove either layer and the project collapses.",
        ],
    )
    d.body_slide(
        "Honesty UI: Cited · Modeled · Speculative",
        [
            "Cited — literature / dataset",
            "Modeled — inference with stated limits",
            "Speculative — creative extension; never sold as footage",
            'Motto: "Inferred — not recovered reality."',
        ],
    )
    d.body_slide(
        "Living contrast + Physical AR",
        [
            "Plants + soil moisture / light / temp → live telemetry (index of present life).",
            "Drives one Mixer parameter — one biodigital pipe.",
            "3D print token + mobile WebAR; desktop fallback + recorded demo.",
        ],
    )
    d.body_slide(
        "Ethics console",
        [
            "Gate (C): sort statements into Cited / Modeled / Speculative.",
            "Branches (B): funding, invasion risk, land / knowledge — incompatible choices.",
            "Output: remixed ending mix + short system consequence (rules-first).",
        ],
    )
    d.table_slide(
        "BDC alignment",
        ("Need", "Mapping"),
        [
            ("10 min + Q&A, visuals, physical, 1–5 min trailer, slides on Drive", "All tied to Dossier / Mixer / Ethics"),
            ("Judging 4×4", "Narrative, Concept, Context, Reflection — Platinum ≥2.75 each"),
        ],
        small=True,
    )
    d.body_slide(
        "Prize focus & sprint",
        [
            "Primary: BDC Prize for Biodigital Excellence.",
            "4-week core: W1 evidence + storyboard; W2 mammoth slice; W3 pigeon + ethics + AR; W4 audit + trailer.",
            "Thank you — Q&A.",
        ],
    )
    out = EXPORT / "Extinction_Archive_EN.pdf"
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
        "活体对照 + 实体 AR",
        [
            "植物 + 湿度 / 光 / 温度 — 「仍在场」指数，非生境仿真。",
            "驱动 Mixer 参数 — 同一 biodigital 管道。",
            "3D 打印 + 手机 WebAR；录屏备用。",
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
    EXPORT.mkdir(parents=True, exist_ok=True)
    font = find_font()
    build_en(font)
    build_zh(font)


if __name__ == "__main__":
    main()
