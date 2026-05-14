#!/usr/bin/env bash
# Primeiro núcleo do runner SinapLint — análise leve no checkout (substituir pelo motor real depois).
set -euo pipefail

echo "================================="
echo " SINAPLINT — análise local (stub)"
echo "================================="
echo ""
echo " Diretório:"
pwd
echo ""
echo " Ficheiros (aprox.):"
find . -type f -not -path './.git/*' 2>/dev/null | wc -l || true
echo ""
echo " Estrutura (maxdepth 2, exceto .git):"
find . -maxdepth 2 -not -path './.git' -not -path './.git/*' 2>/dev/null | head -80 || true
echo ""
echo " TODOs (amostra):"
grep -RIn --exclude-dir=.git --exclude-dir=node_modules "TODO" . 2>/dev/null | head -20 || echo " (nenhum encontrado)"
echo ""
echo " console.log (amostra):"
grep -RIn --exclude-dir=.git --exclude-dir=node_modules "console\.log" . 2>/dev/null | head -20 || echo " (nenhum encontrado)"
echo ""
echo " Análise local concluída."
