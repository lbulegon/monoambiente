#!/usr/bin/env python3
"""
Gera `.sinaplint/report.json` para ingestão no SinapLint SaaS.

No GitHub Actions, define as variáveis de ambiente (o workflow já faz).
Localmente, usa valores por omissão para lbulegon/monoambiente.
"""
from __future__ import annotations

import json
import os
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "report.json"


def _int(name: str, default: int = 0) -> int:
    raw = os.environ.get(name)
    if raw in (None, ""):
        return default
    try:
        return int(raw)
    except ValueError:
        return default


def main() -> None:
    repo = os.environ.get("REPO") or os.environ.get("GITHUB_REPOSITORY") or "lbulegon/monoambiente"
    pr = _int("PR", 0)
    run_id = _int("RUN_ID", 0)
    sha = os.environ.get("SHA") or os.environ.get("GITHUB_SHA") or ""
    ref = os.environ.get("REF") or os.environ.get("GITHUB_REF") or ""
    branch = os.environ.get("BRANCH") or os.environ.get("GITHUB_HEAD_REF") or ""

    report = {
        "repo": repo,
        "score": 82,
        "drift_score": 0.31,
        "daa": 0.74,
        "github_run_id": run_id if run_id > 0 else None,
        "sha": sha[:64],
        "ref": ref[:256],
        "pr_number": pr if pr > 0 else None,
        "branch": branch[:256],
        "warnings": ["Possível crescimento de acoplamento (stub SinapLint)"],
        "errors": [],
        "timestamp": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    }
    # Remover chaves None para o JSON ficar limpo
    report = {k: v for k, v in report.items() if v is not None}

    OUT.write_text(json.dumps(report, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"OK → {OUT}")


if __name__ == "__main__":
    main()
