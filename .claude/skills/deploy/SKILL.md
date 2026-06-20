---
name: deploy
description: Build the static export and deploy the Skylens site to GitHub Pages. Use when asked to deploy, publish, or "push it live" for this drone-marketplace project.
---

# Deploy Skylens → GitHub Pages

This project is hosted as a **static export** on GitHub Pages (the `gh-pages` branch).
GitHub Actions auto-deploy is currently blocked by an account billing lock, so deploys go
out via a branch push instead.

## To deploy

```bash
bash scripts/deploy.sh
```

That script: stashes `app/api` + `middleware.ts` (unsupported on a static host), runs the
`PAGES=true` export build, restores them, pushes `out/` to the `gh-pages` branch, and triggers
the Pages build. It restores the stashed files even if the build fails (trap on EXIT).

## Before deploying
- `npx tsc --noEmit` and `npm run build` should be green.
- Commit the source to `main` first (the gh-pages branch only holds the built `out/`).

## Verify after
- Live at https://frank2889.github.io/skylens/ (redirects to `/nl/`; also `/en/`, `/de/`).
- The Pages build status: `gh api repos/frank2889/skylens/pages/builds/latest -q .status` → `built`.

## Notes
- Server-only features (auth, real messaging/redaction, Stripe escrow) do NOT run on Pages — they
  need a live server (see `plan/07-onplatform.md`). The static site shows the demo-spoor with mock data.
- `next.config.mjs` gates the export on `PAGES=true` (sets `output: export` + `basePath /skylens`);
  local `npm run dev` runs normally without it.
