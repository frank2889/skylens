# Roadmap & sprints

*Wat is klaar, en sprint-voor-sprint wat er nog moet. Sprints zijn ~1–2 weken, één doel elk.
Verwijst naar de plannen 00–08. Stand: juni 2026.*

## Status — wat is KLAAR ✅
- **Strategie & onderzoek** (plan 00–06, 08): markt, verdienmodel, pakketten, marketing, techniek,
  geo, concurrentie — met bronnen.
- **Werkende drietalige demo-site** (NL/EN/DE), live op GitHub Pages: marketing-pagina's,
  pakketten, toepassingen + **48+ programmatische stad×toepassing SEO-pagina's**, pilotengids +
  profielen, showcase, aanvraagflow.
- **Per-land juridisch + certificering** (NL=RDW/EASA, UK=CAA, DE=LBA), multi-currency (€/£),
  `/regels` + privacy/voorwaarden per jurisdictie, hreflang/sitemap.
- **On-platform DEMO-spoor**: `/[locale]/berichten` — unlock=gesprek, live contact-redactie,
  escrow-stappen (mock-data, klikbaar).
- **Positioneringsmatrix** (artifact) + "waarom on-platform"-sectie op de homepage.
- **Repo + deploy**: github.com/frank2889/skylens, `scripts/deploy.sh` + `.claude/skills/deploy`.

> **Alles tot hier is een DEMO** (statisch, mock-data). De echte business begint bij Sprint 1.

---

## Sprint 1 — VALIDATIE (geen code) 🎯 *belangrijkste sprint*
**Doel:** bewijzen dat een piloot voor een lead betaalt én een klant een aanvraag plaatst — vóór we
de backend bouwen. Verwijst naar plan 00 (90-dagenplan) + de Seppe-lead (plan 04/06).
- Seppe/De Cockpit-connectie → gesprek met de droneopleiding (warme aanbodlead).
- Bel 10 makelaars in één pocket (Randstad óf Eindhoven/Breda) met de "Funda Aanvraag-pack" + live demo.
- Concierge: match de eerste 3–5 aanvragen met de hand.
- **Acceptatie:** ≥5 geverifieerde piloten zeggen "ja, ik betaal €X/lead"; ≥3 echte klantaanvragen.
- **NO-GO-trigger:** niemand wil betalen → model hersnijden vóór verder bouwen.

## Sprint 2 — LIVE SERVER-FUNDERING
**Doel:** van statisch naar een echte server zodat backend kan draaien (plan 07 prerequisite + B0).
- Hosting kiezen (Vercel/Cloudflare/Netlify) + Supabase-project (EU/Frankfurt) + Stripe test-keys.
- Auth (magic-link), middleware un-stub, env wiring.
- Migratie `0002` (i18n/jurisdictie-velden) + `0003` (threads/messages/events/escrow) draaien.
- **Acceptatie:** ingelogde klant/piloot; aanvraag wordt echt opgeslagen; `get_request_contact` admin-only.

## Sprint 3 — ON-PLATFORM B1 (messaging, écht)
**Doel:** unlock = thread (geen contact); inbox live; redactie server-side (plan 07 B1).
- `app/api/leads/route.ts` → opent thread; inbox in dashboards; `lib/moderation.ts` server-side + events.
- AVG: voorwaarden/disclosure + inbox-banner + DPIA-notitie.
- **Acceptatie:** piloot communiceert zonder ooit e-mail/telefoon te zien; gedeeld nummer wordt geredigeerd + gelogd.

## Sprint 4 — ON-PLATFORM B2 (escrow-betaling)
**Doel:** geld via het platform → commissie automatisch (plan 07 B2).
- Stripe Connect (Express) onboarding; offerte → betaal → escrow → release; webhook events.
- **Acceptatie:** test-booking: betaald → in escrow → vrijgegeven met commissie als `application_fee`.

## Sprint 5 — OPLEVERING + MONITORING (B3 + B4)
**Doel:** oplevering via platform + meten/sturen op on-platform gedrag (plan 07 B3/B4).
- Footage-upload → release + review-eligibility + showcase; `events`-dashboard (on-platform share,
  dark-pilots); ranking in `lib/matching.ts` beloont on-platform; lead-fee gecrediteerd tegen commissie.
- **Acceptatie:** review alleen na on-platform booking; admin ziet on-platform share + dark-pilot-signaal.

## Sprint 6 — GROEI: NL verdiepen → DE → (later) UK
**Doel:** liquiditeit opschalen volgens de markt-hervolgorde (plan 06 + 08).
- NL: programmatische SEO + footage-flywheel aanzetten; tweede pocket (Brabant via Seppe).
- DE: marktdata activeren; **abonnement-geleid prijsmodel** klaarzetten vs. Drohnenauftrag's 0%.
- UK: pas wanneer NL/DE staan (meest entrenched: DSR/HireDronePilot/DRONEWORK).
- **Acceptatie:** fill-rate ≥80% per live metro; eerste betaalde commissie-omzet.

---

## Doorlopend (elke sprint)
- `npx tsc --noEmit` + `npm run build` groen; deploy via `scripts/deploy.sh`.
- KPI-dashboard: fill-rate, on-platform share, lead→won conversie, repeat-rate.
- Validatie boven features: bouw geen nieuwe laag vóór de huidige door echte gebruikers bevestigd is.
