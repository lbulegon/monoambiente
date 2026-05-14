# SinapLint (runner local / CI)

- **`analyze.sh`** — passo de análise leve no repositório (stub).
- **`report.py`** — gera `report.json` com o schema esperado pelo SaaS (`POST …/ci-report/`).

## Monitorização em cada PR

O SinapLint **não faz polling** ao GitHub: o repositório é analisado quando o **CI envia o JSON** para `ci-report`. Este repositório usa o workflow em `.github/workflows/sinaplint.yml`, disparado em **`pull_request`** (opened, synchronize, reopened).

Para o ingest casar com o projeto certo no dashboard:

- O campo **`repo`** no JSON tem de ser **`lbulegon/monoambiente`** (o mesmo que `github.repository` no Actions).
- Inclui sempre **`pr_number`** (número do PR no GitHub) para o painel **agrupar execuções** no registo por pull request.

### Secrets no GitHub (Settings → Secrets and variables → Actions)

| Secret | Valor |
|--------|--------|
| `SINAPLINT_CI_URL` | URL completa do endpoint (ex.: `https://…railway.app/api/sinaplint/saas/v1/ci-report/` ou `…/api/ci-report/`) |
| `SINAPLINT_API_KEY` | O teu **X-API-KEY** (UUID do tenant no SinapLint) |

Na **landing** SinapLint: define `NEXT_PUBLIC_SINAPLINT_API_URL` com o URL público do backend (ex. Railway) para o painel do projeto mostrar a URL de ingestão pronta a copiar.

## Local

```bash
chmod +x .sinaplint/analyze.sh
./.sinaplint/analyze.sh
python3 .sinaplint/report.py
cat .sinaplint/report.json
```

`report.json` está no `.gitignore` à raiz do repo.

## GitHub Actions

O workflow `.github/workflows/sinaplint.yml` corre em cada PR: gera `.sinaplint/report.json` **inline** (Python no próprio job), envia para o SinapLint e comenta no PR.

Para desenvolvimento local podes continuar a usar **`analyze.sh`** + **`report.py`** (ver secção Local).

O workflow **`.github/workflows/workflow.yml`** corre **Continuous Integration** em **`web/`** em `ubuntu-latest` (React com `react-scripts`). Ver `web/README.md`.

O **`.github/workflows/workflow-self-hosted.yml`** corre o mesmo npm em **`web/`** na **tua VPS** (`runs-on: self-hosted`), com passo `ls -la /opt/sinaplint` antes do build. Prompt: `.github/PROMPT-runner-self-hosted-vps.md`.
