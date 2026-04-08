#!/usr/bin/env bash
# Run once after you create the empty repo on GitHub (same flow as flypay-poc).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
echo "Target: https://github.com/dcx-garvit-chugh/darwin-i18n-lokalise-poc"
echo ""
echo "If you have not created the repo yet, open (while logged into GitHub):"
echo "  https://github.com/new?name=darwin-i18n-lokalise-poc"
echo "Choose Private. Do NOT add a README, .gitignore, or license."
echo ""
git push -u origin main
echo "Done. Repo: https://github.com/dcx-garvit-chugh/darwin-i18n-lokalise-poc"
