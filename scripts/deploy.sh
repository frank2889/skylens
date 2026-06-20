#!/usr/bin/env bash
# Build the static export and deploy Skylens to GitHub Pages (gh-pages branch).
# GitHub Pages is static-only, so app/api + middleware.ts are temporarily moved
# aside for the export build and restored afterwards (also on failure, via trap).
# Usage: bash scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

REPO_SSH="git@github.com:frank2889/skylens.git"
PAGES_REPO="frank2889/skylens"
BASE_PATH="/skylens"
SITE_URL="https://frank2889.github.io/skylens"

STASH="$(mktemp -d)"
restore() {
  [ -d "$STASH/api" ] && rm -rf app/api && cp -r "$STASH/api" app/api || true
  [ -f "$STASH/middleware.ts" ] && cp "$STASH/middleware.ts" middleware.ts || true
}
trap restore EXIT

echo "→ Stashing server-only bits (api + middleware) for the static export…"
[ -d app/api ] && cp -r app/api "$STASH/api"
[ -f middleware.ts ] && cp middleware.ts "$STASH/middleware.ts"
rm -rf app/api middleware.ts .next out

echo "→ Building static export…"
PAGES=true PAGES_BASE_PATH="$BASE_PATH" NEXT_PUBLIC_SITE_URL="$SITE_URL" npm run build

restore; trap - EXIT
echo "→ Restored server-only bits."

echo "→ Publishing out/ to the gh-pages branch…"
( cd out
  touch .nojekyll
  rm -rf .git
  git init -q -b gh-pages
  git config user.email "frank@webelephant.nl"
  git config user.name "Frank"
  git add -A
  git commit -q -m "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
  git remote add origin "$REPO_SSH"
  git push -f -q origin gh-pages )

echo "→ Triggering the GitHub Pages build…"
gh api -X POST "repos/$PAGES_REPO/pages/builds" >/dev/null 2>&1 || true

echo "✓ Deployed. Live shortly at $SITE_URL/ (Pages build runs in ~30s)."
echo "  Note: GitHub Actions is billing-locked on this account, so this branch"
echo "  deploy is the workaround; fix billing to get auto-deploy on push."
