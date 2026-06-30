#!/usr/bin/env python3
"""Sync brand assets and course metadata from Desktop IMTAT into GK Lab."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

GK_LAB = Path(__file__).resolve().parents[1]
IMTAT = Path.home() / "Desktop" / "IMTAT"
BRAND_SRC = IMTAT / "Shared Assets" / "Brand"
BRAND_DST = GK_LAB / "public" / "assets" / "brand"
MANIFEST = GK_LAB / "public" / "assets-manifest.json"


def copy_brand() -> list[str]:
    BRAND_DST.mkdir(parents=True, exist_ok=True)
    copied = []
    if BRAND_SRC.exists():
        for src in BRAND_SRC.glob("*.png"):
            dst = BRAND_DST / src.name
            shutil.copy2(src, dst)
            copied.append(str(dst.relative_to(GK_LAB)))
    return copied


def write_manifest(copied: list[str]) -> None:
    manifest = {
        "brand": [Path(p).name for p in copied],
        "digital": ["BTC_DailyTrendSwing_EA.mq5"],
        "courses": "imtat",
        "type": "commerce",
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")


def main() -> None:
    copied = copy_brand()
    write_manifest(copied)
    print(f"Synced {len(copied)} brand asset(s) to GK Lab")
    for p in copied:
        print(f"  {p}")


if __name__ == "__main__":
    main()
