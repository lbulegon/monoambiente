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

O GitHub Actions em `.github/workflows/workflow.yml` executa os mesmos comandos em `ubuntu-latest` com Node 16.x.
