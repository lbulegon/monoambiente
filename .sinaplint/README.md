# SinapLint (runner local / CI)

- **`analyze.sh`** — passo de análise leve no repositório (stub).
- **`report.py`** — gera `report.json` com o schema esperado pelo SaaS (`POST …/ci-report/`).

## Local

```bash
chmod +x .sinaplint/analyze.sh
./.sinaplint/analyze.sh
python3 .sinaplint/report.py
cat .sinaplint/report.json
```

`report.json` está no `.gitignore` à raiz do repo.

## GitHub Actions

O workflow `.github/workflows/sinaplint.yml` corre em cada PR e envia o JSON para o SinapLint (secrets `SINAPLINT_CI_URL` e `SINAPLINT_API_KEY`).
