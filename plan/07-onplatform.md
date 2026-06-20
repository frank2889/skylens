# On-platform-only — anti-disintermediatie (piloot & klant kunnen niet om het platform heen)

*Implementatieplan. Vereist een live server (niet de statische Pages-host). Zie ook
[08-concurrentieanalyse](08-concurrentieanalyse.md): de categorieleider Zeitview verliet exact dit
model omdat disintermediatie het sloopte — dit is daarom geen feature maar de bestaansreden.*

## Doel
Piloot en zoeker kunnen elkaar **niet apart bereiken** of de deal **buiten het platform** voortzetten.
Off-platform wordt *standaard onmogelijk* (ruwe contactgegevens worden nooit overhandigd),
*gedetecteerd* bij een poging, en *economisch slechter* (geen bescherming, geen reviews, lagere
ranking). **KPI = on-platform share.** Eerlijk: 100% voorkomen kan niet — je maakt on-platform de
standaard én de voordeligste route.

## Wat er al staat (DB-fundering — een vóórsprong)
- `requests` bewaart contact, maar **piloten hebben géén directe leesrechten** (geen RLS-select).
- `get_request_contact()` geeft contact alléén bij een lead met status `purchased`/`won`.
- `leads`/`bookings`/`reviews` + RLS-helpers `is_admin()`/`current_pilot_id()` bestaan.
- **Ontbreekt:** messaging/threads/inbox, unlock→gesprek-omslag, escrow, oplevering-handoff,
  monitoring, on-platform-gedrag in de ranking.

## Kernprincipe — "unlock = gesprek openen, geen contact vrijgeven"
Vandaag is de bedoeling "betaal lead → zie e-mail/telefoon" — dat is het lek. Omdraaien:
1. Piloot claimt/betaalt lead → er opent een **thread** met de klant. Ruwe e-mail/telefoon nooit
   getoond. `get_request_contact()` wordt **admin-only**.
2. Klant praat, kiest, boekt en betaalt **binnen** het platform; piloot levert **via** het platform op.
3. Contact delen in de chat (telefoon/e-mail/"app me even") wordt **geredigeerd + gelogd**.

## Fasering (elke fase apart deploybaar op de server)
- **Prerequisite** — live server-host (Vercel/Cloudflare/Netlify) + Supabase (EU/Frankfurt) + Stripe.
  *Demo-spoor bestaat al* op de statische preview: `/[locale]/berichten` toont inbox + redactie +
  escrow-stappen met mock-data ([components/demo-inbox.tsx](../components/demo-inbox.tsx)).
- **B0 — Lockdown & fundering** (`supabase/migrations/0003_onplatform.sql`): `get_request_contact` →
  admin-only; `leads.contact_revealed=false` kill-switch; enum `message_channel`; `booking_status`
  uitbreiden (`quoted, escrow_held, disputed, refunded`); tabellen `threads, messages, deliverables,
  events, disputes, payouts`; escrow-kolommen op `bookings`; `pilots` cached on-platform stats; un-stub `middleware.ts`.
- **B1 — In-platform messaging:** `app/api/leads/route.ts` → unlock opent thread; inbox-UI in
  klant/piloot-dashboards; server-side redactie-pijplijn ([lib/moderation.ts](../lib/moderation.ts)
  bestaat al) → `contact_share_detected` events; later gemaskeerde e-mail-relay (Resend inbound).
- **B2 — Booking + Stripe Connect escrow:** offerte → klant betaalt → escrow → vrij bij oplevering →
  commissie als `application_fee`. Piloot-onboarding via Stripe Express. Webhook uitwerken.
- **B3 — Oplevering via platform:** footage → Storage → booking `delivered` → (auto-)release + review
  pas dan mogelijk + footage-flywheel (consent → showcase).
- **B4 — Monitoring + wortel/stok:** `events`-log → admin-dashboard met **on-platform share** KPI +
  dark-pilot-detectie; ranking in [lib/matching.ts](../lib/matching.ts) beloont on-platform gedrag;
  lead-fee gecrediteerd tegen commissie (tol → aanbetaling).

## Risico's
- Vereist live server + Stripe + Supabase (niet op statische Pages).
- Enforcement vs. cold-start: maximale frictie remt eerste adoptie → faseer (zet de stok pas aan bij
  liquiditeit).
- **AVG:** berichten scannen = persoonsgegevens → disclosure in voorwaarden + inbox-banner + DPIA;
  `body_raw` beperkt bewaren, admin-leesacties loggen. Launch-blocker voor B1-scanning.

## Verificatie (op server, test-keys)
Piloot krijgt thread, geen contact; gedeeld telefoonnummer wordt geredigeerd + gelogd; escrow-flow
offerte→betaald→opgeleverd→vrijgegeven met commissie afgevangen; admin-dashboard toont on-platform share.
