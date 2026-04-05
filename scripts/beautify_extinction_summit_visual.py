#!/usr/bin/env python3
"""
Visual-only refresh for Extinction_Archive_Summit_2026.pptx.

- Does NOT modify slide order, layouts, or any <a:t> text.
- Patches theme colors + fonts and slide master background (gradient).

Run from repo root:
  .venv/bin/python scripts/beautify_extinction_summit_visual.py
"""

from __future__ import annotations

import re
import zipfile
from io import BytesIO
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
EXPORT = ROOT / "slides" / "export"
PPTX = EXPORT / "Extinction_Archive_Summit_2026.pptx"

# --- Theme: refined archive palette (still light-on-dark text via dk1 on light gradient) ---
_THEME_PATCHES: list[tuple[str, str]] = [
    # Primary text (was windowText / black)
    (
        '<a:dk1><a:sysClr val="windowText" lastClr="000000"/></a:dk1>',
        '<a:dk1><a:srgbClr val="1C2834"/></a:dk1>',
    ),
    (
        '<a:lt1><a:sysClr val="window" lastClr="FFFFFF"/></a:lt1>',
        '<a:lt1><a:srgbClr val="F6F9FB"/></a:lt1>',
    ),
    ("<a:dk2><a:srgbClr val=\"1F497D\"/></a:dk2>", "<a:dk2><a:srgbClr val=\"2C4A48\"/></a:dk2>"),
    ("<a:lt2><a:srgbClr val=\"EEECE1\"/></a:lt2>", "<a:lt2><a:srgbClr val=\"E4EBEF\"/></a:lt2>"),
    ("<a:accent1><a:srgbClr val=\"4F81BD\"/></a:accent1>", "<a:accent1><a:srgbClr val=\"2A6F6B\"/></a:accent1>"),
    ("<a:accent2><a:srgbClr val=\"C0504D\"/></a:accent2>", "<a:accent2><a:srgbClr val=\"B8653C\"/></a:accent2>"),
    ("<a:accent3><a:srgbClr val=\"9BBB59\"/></a:accent3>", "<a:accent3><a:srgbClr val=\"5E7D7A\"/></a:accent3>"),
    ("<a:accent4><a:srgbClr val=\"8064A2\"/></a:accent4>", "<a:accent4><a:srgbClr val=\"5C6B88\"/></a:accent4>"),
    ("<a:accent5><a:srgbClr val=\"4BACC6\"/></a:accent5>", "<a:accent5><a:srgbClr val=\"3F86A1\"/></a:accent5>"),
    ("<a:accent6><a:srgbClr val=\"F79646\"/></a:accent6>", "<a:accent6><a:srgbClr val=\"C9925A\"/></a:accent6>"),
    ("<a:hlink><a:srgbClr val=\"0000FF\"/></a:hlink>", "<a:hlink><a:srgbClr val=\"205A7A\"/></a:hlink>"),
    ("<a:folHlink><a:srgbClr val=\"800080\"/></a:folHlink>", "<a:folHlink><a:srgbClr val=\"4A3566\"/></a:folHlink>"),
]

_MASTER_BG_OLD = re.compile(
    r"<p:bg>\s*<p:bgRef idx=\"1001\">\s*<a:schemeClr val=\"bg1\"/>\s*</p:bgRef>\s*</p:bg>",
    re.DOTALL,
)

_MASTER_BG_NEW = """<p:bg>
  <p:bgPr>
    <a:gradFill rotWithShape="1">
      <a:gsLst>
        <a:gs pos="0"><a:srgbClr val="FAFCFE"/></a:gs>
        <a:gs pos="40000"><a:srgbClr val="F1F5F8"/></a:gs>
        <a:gs pos="100000"><a:srgbClr val="E2EBF1"/></a:gs>
      </a:gsLst>
      <a:lin ang="5400000" scaled="1"/>
    </a:gradFill>
  </p:bgPr>
</p:bg>"""


def _patch_theme(xml: str) -> str:
    for old, new in _THEME_PATCHES:
        if old not in xml:
            # Idempotent re-run: already patched or different export
            continue
        xml = xml.replace(old, new, 1)
    xml = xml.replace('name="Office Theme"', 'name="Extinction Archive — visual theme"', 1)
    # Title / body: editorial serif for major, neutral sans for minor
    xml = xml.replace(
        "<a:majorFont><a:latin typeface=\"Calibri\"/>",
        "<a:majorFont><a:latin typeface=\"Georgia\"/>",
        1,
    )
    xml = xml.replace(
        "<a:minorFont><a:latin typeface=\"Calibri\"/>",
        "<a:minorFont><a:latin typeface=\"Segoe UI\"/>",
        1,
    )
    return xml


def _patch_slide_master(xml: str) -> str:
    head = xml.split("<p:spTree>", 1)[0]
    if "<p:bgPr>" in head:
        return xml
    m = _MASTER_BG_OLD.search(xml)
    if not m:
        raise RuntimeError("Could not find expected slide master background block to replace.")
    return xml[: m.start()] + _MASTER_BG_NEW + xml[m.end() :]


def beautify(path: Path) -> None:
    if not path.is_file():
        raise FileNotFoundError(path)

    buf = BytesIO()
    with zipfile.ZipFile(path, "r") as zin:
        with zipfile.ZipFile(buf, "w", compression=zipfile.ZIP_DEFLATED) as zout:
            for info in zin.infolist():
                data = zin.read(info.filename)
                if info.filename == "ppt/theme/theme1.xml":
                    data = _patch_theme(data.decode("utf-8")).encode("utf-8")
                elif info.filename == "ppt/slideMasters/slideMaster1.xml":
                    data = _patch_slide_master(data.decode("utf-8")).encode("utf-8")
                ni = zipfile.ZipInfo(filename=info.filename, date_time=info.date_time)
                ni.compress_type = zipfile.ZIP_DEFLATED
                zout.writestr(ni, data)

    buf.seek(0)
    path.write_bytes(buf.read())


def main() -> None:
    beautify(PPTX)
    print(f"Visual theme + master background updated (text untouched): {PPTX}")


if __name__ == "__main__":
    main()
