# Prompt — CI GitHub Actions na VPS Ubuntu (self-hosted runner)

Copia o bloco abaixo para uma ferramenta de IA ou usa como checklist manual.

---

**Atua como Engenheiro de DevOps.** Preciso de CI no GitHub Actions a correr **na minha VPS Ubuntu** (não nas VMs geridas pelo GitHub), com observação prévia de **`/opt/sinaplint`** sem o workflow alterar esse diretório.

## Contexto

- Repositório de exemplo: `monoambiente` em `/root/Source/monoambiente`.
- Já existe stack ou dados em **`/opt/sinaplint`**: antes de qualquer build, o workflow deve **apenas listar** (`ls -la`) esse caminho para registo no log do Actions.
- O job deve usar **`runs-on: self-hosted`** (obrigatório: runner GitHub instalado na VPS via *Settings → Actions → Runners*).

## Ficheiros

- Criar ou manter **`.github/workflows/workflow-self-hosted.yml`** na raiz do repo.

## YAML desejado (resumo)

- **Nome do workflow:** por exemplo `Continuous Integration (VPS self-hosted)`.
- **Gatilhos:** `push` e `pull_request`.
- **Job:** `runs-on: self-hosted`, `working-directory: web` (app React com `react-scripts`).
- **Passos:**
  1. `actions/checkout@v3`
  2. Passo **"Verificar Sinaplint"**: `run: ls -la /opt/sinaplint`
  3. `actions/setup-node@v2` com `node-version` acordada (ex.: `24.x` na VPS com nvm/nodejs instalado).
  4. Um passo com `run: |` a executar `npm install`, `npm run build`, `npm run test`.

## `package.json` (pasta `web/`)

- **`test`:** `react-scripts test --watchAll=false` (CI).
- **`build`:** usar **`CI=false react-scripts build`** (avisos do React não falham o build).  
  **Não** uses `CI=false npm run build` (referência circular ao script `build`).

## VPS Ubuntu (fora do YAML)

1. Instalar **Node.js + npm** (versão alinhada ao `node-version` do workflow).
2. Em **GitHub → Settings → Actions → Runners → New self-hosted runner**, escolher Linux e seguir os comandos na VPS (download, `config.sh`, `./run.sh` ou serviço `svc.sh install`).
3. Garantir que o utilizador do runner tem permissão de leitura a `/opt/sinaplint` e de escrita ao checkout do job (workspace do Actions).

## Coexistência com CI hosted

Se existir também **`workflow.yml`** com `runs-on: ubuntu-latest`, cada `push` dispara **dois** workflows (hosted + self-hosted). Desactiva um em **Settings → Actions** ou remove um dos ficheiros se quiseres só um tipo de execução.

---

Fim do prompt.
