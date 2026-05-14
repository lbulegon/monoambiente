# Frontend React (CI)

Scripts alinhados ao fluxo de integração contínua:

- `npm run test` — `react-scripts test --watchAll=false` (adequado a CI).
- `npm run build` — `CI=false react-scripts build` (avisos do React não falham o build na esteira).

Validação local antes de push:

```bash
cd web
npm install
npm run build
npm run test
```

O GitHub Actions em `.github/workflows/workflow.yml` executa os mesmos comandos em `ubuntu-latest` com Node 24.x (VM gerida pelo GitHub).

Para **CI na tua VPS** (self-hosted runner), existe **`.github/workflows/workflow-self-hosted.yml`**: `runs-on: self-hosted`, passo **Verificar Sinaplint** (`ls -la /opt/sinaplint`) antes do build, e os mesmos comandos npm em `web/`. Pré-requisito: [adicionar self-hosted runner](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners) ao repositório. Prompt reutilizável: `.github/PROMPT-runner-self-hosted-vps.md`.


