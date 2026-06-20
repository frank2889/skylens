# Tech Architecture Recommendation — NL-First Drone-Pilot Lead Marketplace

**Decision posture:** Decisive. This is a build plan, not a menu.

---

## 0. TL;DR — the stack, confirmed

| Layer | Choice | Why (one line) |
|---|---|---|
| Framework / hosting | **Next.js (App Router) on Vercel** | SSR/ISR for SEO pages, edge perf, zero-ops deploys, native i18n routing |
| DB / auth / storage | **Supabase (Postgres + Auth + Storage), EU region (Frankfurt)** | One managed Postgres with Row-Level Security, built-in auth + roles, S3-compatible storage, EU residency by config |
| Payments | **Stripe — Checkout/Payment Intents for lead fees + Stripe Connect (Express) for commission** | Per-lead day one; commission via Connect when money flows through the platform |
| Email | **Resend** (transactional + light marketing) | React Email templates, EU sending region, strong deliverability |
| CMS / SEO | **MDX (MVP) → Payload CMS (when non-technical editors needed)** | Codeless-cheap MDX in-repo; graduate to Payload self-hosted on the same Postgres. **Not Sanity.** |
| Media | **Supabase Storage (private originals) + consented public showcase gallery** | Cheap, EU-resident, signed-URL access control |

**Single most important call:** booked-job **commission only works if payment flows through the platform**. Pay-per-lead is trivial and enforceable; commission requires Connect KYC onboarding per pilot, which adds friction you don't want before liquidity. So **lead fees = MVP, platform-mediated payment + commission = fast-follow (Phase 2)**.

---

## 1. Why this stack (and what I rejected)

The owner's three constraints — minimal ops, max design quality, EU expansion — point to a serverless, managed, single-EU-region-pinnable stack. Every piece is replaceable without a rewrite.

- **Next.js App Router on Vercel** does both jobs in one codebase: hard-cached SSR/ISR for the SEO traffic engine (per-pilot pages, city×segment pages) and an authenticated app (dashboards, request flow, payments), with built-in `[locale]` routing for EU later. Vercel is zero-ops — directly serves "minimal operational effort."
- **Supabase** because a marketplace is a relational problem (pilots ↔ requests ↔ leads ↔ bookings). Postgres + Auth + Storage + Row-Level Security in one vendor, **pinnable to an EU region** — solving GDPR residency in one setting.
- **Stripe** is non-negotiable: SCA/3DS, SEPA, **iDEAL (critical for NL)**, multi-currency, and **Connect** for pilot payouts + commission splits.
- **Resend** for transactional + basic broadcasts; React Email in-repo, EU sending region.

**Rejected:** a separate backend (Next Route Handlers + Supabase functions suffice — adding a backend adds ops); Firebase (NoSQL is the wrong shape, weaker EU/Postgres story); **Sanity** (puts SEO content in a separate vendor cloud, EU residency becomes a paid concern, fragments data, adds GROQ); Mailchimp as primary (second PII silo, GDPR surface).

---

## 2. Data model

Postgres. All tables: `id uuid pk`, `created_at`, `updated_at`, RLS on. Core entities and the *why*:

**`profiles`** (extends `auth.users`): `role enum('client','pilot','admin')`, locale, country, `marketing_consent` (timestamped), `stripe_customer_id`.

**`pilots`** (1:1 with pilot profiles): `company_name`, `kvk_number`, `eu_operator_number` (RDW exploitantnummer), `slug` (→ `/pilots/[slug]`), `base_lat/lng/postcode`, `service_radius_km`, `segments text[]`, `tier enum('bronze','silver','gold','platinum')`, `insurance_verified`, `insurance_expires_at`, `verification_status`, `rating_avg`/`rating_count` (denormalized for sort), `stripe_connect_account_id`, `lead_credit_balance`, `is_accepting_leads`.

**`certifications`** (N per pilot — the verification core): `type enum('a1_a3','a2','sts_01','sts_02','luc','operational_auth')`, `issuing_authority`, `certificate_number`, `document_url` (private, signed-URL only), `issued_at`, **`expires_at`** (the 5-yr clock — the #1 data-quality risk), `verification_status`, `verified_by` (audit), `reject_reason`.

**`drones`** (backs tier + capability claims): `model`, `c_class enum('c0'..'c6','legacy')`, `capabilities text[]` (`thermal`,`lidar`,`rtk`,`multispectral`).

**`requests`**: `client_id` (**nullable** — capture leads pre-signup), `contact_*` fields, `segment`, `location_postcode/lat/lng/country`, `required_cert`, `budget_band`, `desired_date`, `deliverables text[]`, `status`, `lead_price_eur`, **`max_pilots int default 3`** (the exclusivity lever).

**`leads`** (a join with state + money): `request_id`, `pilot_id`, `status enum('offered','purchased','contacted','quoted','won','lost','refunded')`, `price_eur`, `stripe_payment_intent_id`, `unlocked_contact_at`, **`unique(request_id, pilot_id)`** (never double-charge for the same lead).

**`bookings`** (separate from leads — commission attaches here): `agreed_price_eur`, `commission_pct`, `commission_eur`, `payment_status enum('pending','held','released','refunded')`, `stripe_checkout_session_id`, `stripe_transfer_id`.

**`reviews`**: keyed to `booking_id` (unique) — **only people who actually booked can review** = the trust moat. `is_published` moderation gate.

**`media_assets`**: `pilot_id`, `booking_id` (nullable), `storage_path` (private original), `type`, `segment`, **`is_showcase_consented`** (pilot AND client consent for reuse), `is_published`, `alt_text`, `caption`.

**Why these shapes matter:** `leads` separate from `bookings` is what enables the **hybrid model** — lead fees always, commission only on platform-paid jobs. `max_pilots` is the exclusivity lever that beats the Thumbtack/Bark shotgun churn. `reviews` gated on `booking_id` kills fake reviews. `certifications.expires_at` as a first-class field + a nightly cron flipping `verified→expired` handles the 5-yr clock and turns the **NL Q1-2026 expiry wave (12k certs / ~8k pilots)** into a renewal-acquisition hook.

---

## 3. Payments — the crux

### 3a. Pay-per-lead (MVP)
Pilots pay to **unlock a lead's contact details** — charged on contact-reveal, not on win (enforceable because you control the contact data; proven Werkspot/Bark/Thumbtack model).

Pricing by job-value tier (from the digest):

| Segment | Lead price | Job value |
|---|---|---|
| Real estate / residential inspection | **€5–25** | €150–450 |
| Events / commercial video | **€20–60** | €300–650+ |
| Mapping / surveying / large commercial | **€50–150** | €1,500–10,000 |

- **Mechanic: prepaid lead credits** (top-ups via Stripe Checkout, €50/€100/€250 packs) — fewer Stripe round-trips, smoother UX, lower per-lead fees (this is the Bark approach). Reject pay-per-unlock-per-lead as the default.
- **Exclusivity as the quality lever:** shared leads (≤3 pilots) cheap, exclusive (1 pilot) at 2–3× price. Digest: exclusive leads convert 2–3× better — your defensible differentiator vs. shotgun incumbents.
- **Lead-quality guarantee:** auto-refund a credit on bounced phone / spam. Cheap insurance against the #1 marketplace complaint.
- Enable **iDEAL + card + SEPA** (NL-critical).

### 3b. Commission on booked jobs (Phase 2)
Requires money through the platform → **Stripe Connect (Express)**. Client pays full price via Checkout → held → on completion, transfer price minus ~**10%** commission to the pilot's Connect account.

**The leakage problem (be honest):** pilots are incentivized to go off-platform to dodge the 10%. You can't fully prevent it. Mitigate by **carrot not stick**: make platform payment worth >10% (escrow protection, dispute handling, auto VAT invoicing, faster payout, reviews that only count if booked on-platform). The lead fee is already captured regardless — so commission is upside, not survival. **That's why the hybrid model is robust.**

**Decisive call:** Launch on prepaid lead credits + exclusivity tiers. Add Connect commission in Phase 2 once you have pilot density and can sell the escrow/trust value. Don't build escrow before liquidity.

---

## 4. Roles & auth

**Supabase Auth.** Roles: `client`, `pilot`, `admin`. Methods: **email magic-link + Google OAuth** (no password storage). Access control via **Row-Level Security enforced in Postgres**:
- Pilot reads only their own leads/certs/media.
- Client reads only their own requests/bookings.
- **Contact details on a request are readable only by a pilot with a `purchased` lead row for it — the paywall enforced at the database.**
- Private cert PDFs are signed-URL only.
- Published verified pilots + published reviews + showcase media are world-readable (powers SEO pages).

This is a genuine reason to be on Supabase: a frontend bug can't leak paid contact data or private certificates.

---

## 5. Matching algorithm

Filter to eligible → rank. Deterministic and explainable (no ML in MVP). Runs on request creation, produces `leads` rows capped by `max_pilots`.

**Step 1 — hard filters:** active + accepting + `verification_status='verified'`; **segment** ∈ pilot.segments; **region** via PostGIS `ST_DWithin(pilot.base, request.location, service_radius_km)`; **certification** ≥ required level on the ordinal ladder (`a1_a3 < a2 < sts_01 < sts_02 < operational_auth/luc`); insurance verified (commercial); can pay (credit balance > 0).

**Step 2 — availability (soft):** `is_accepting_leads` toggle + recent activity + weekly lead cap. Full calendar availability is Phase 2/3, not MVP.

**Step 3 — ranking:** `score = w1·proximity + w2·Bayesian_rating + w3·tier_fit + w4·responsiveness + w5·freshness_penalty`. The **freshness/round-robin term is essential** — without it your top pilot wins every lead near a city and the rest churn. Hand-tune weights, instrument conversion, tune later. **Don't build ML matching for MVP** — an explainable weighted score builds pilot trust.

**Build it.** ~200 lines of SQL + a scoring function. PostGIS ships with Supabase — enable the extension.

---

## 6. Search & filter

Two surfaces: (1) the **request flow** (primary — client describes job, matching runs, no manual search), and (2) a **public filterable directory + per-segment/city pages** (SEO + trust): filter by segment, region radius, cert level, tier, rating, insurance, equipment capability.

**Implementation:** plain Postgres + indexes for MVP — your dataset is thousands of pilots, not millions. GIN indexes on `segments`/`capabilities` arrays, PostGIS spatial index, Postgres full-text search (`tsvector`) on bios. **Do NOT add Algolia/Elasticsearch for MVP** (second data store to sync, more cost/ops, against the minimal-effort goal). Add a search engine only in Phase 3 if faceted latency on a large multi-country dataset becomes real.

---

## 7. Certification verification workflow

No EU-wide public API exists to confirm a certificate is genuine (digest, high confidence). So: **document + expiry-logic + light human review**, automated as far as honestly possible.

1. **Pilot self-serve submission:** operator number (RDW), KvK, cert type(s)/number(s)/dates, uploads cert + insurance docs to private Storage.
2. **Automated pre-checks (instant):** operator-number regex per country (pluggable adapter), expiry logic (reject already-expired, compute 5-yr clock), insurance cover ≥ €750k SDR / NL ~€1M, duplicate-cert fraud flag. Status → `pending`.
3. **Human review (the only manual step):** admin queue, doc beside entered data, one-click verify/reject-with-reason. Target <2 min/pilot. On verify → matchable + Resend "you're live."
4. **Ongoing automation (zero human):** nightly cron flips `verified→expired`, auto-removes expired pilots from matching, emails at T-60/T-30/T-7 before expiry. The NL Q1-2026 expiry wave becomes a campaign, not a problem.

Public trust signals (the things clients **can't self-assess** — your moat): verified badge, masked operator number, cert level (A2/STS), insurance-verified badge, tier.

**Build it.** ID-verification SaaS (Onfido/Veriff) is for gov-ID liveness, not drone certs — wrong tool. Manual review is cheap at NL scale.

---

## 8. Per-pilot landing pages (dynamic routes)

`/pilots/[slug]` — server-rendered with ISR (`generateStaticParams` over verified pilots + `revalidate`). Each page: bio, segments, service-area map, tier, verified badges, cert levels, equipment, portfolio from `media_assets`, published reviews, a "request a quote" CTA pre-filling the request flow targeting that pilot. SEO: per-page `generateMetadata`, JSON-LD `LocalBusiness`/`Service`, canonical URLs, auto-generated `sitemap.xml`.

**The real traffic engine — programmatic SEO pages:** `/[segment]/[city]` routes (e.g. `/dronefotografie/amsterdam`, `/dakinspectie/rotterdam`), generated from segment × city, each listing matching verified pilots + localized intro copy. This captures the high-intent search traffic the digest names as the volume wedge.

---

## 9. CMS — decision: MDX now, Payload later

Per-pilot pages are DB-driven; the CMS handles **editorial SEO content** (city/segment intros, guides, blog, FAQ, legal).

| | MDX | Payload | Sanity |
|---|---|---|---|
| Cost | Free | Free (self-hosted) | Paid SaaS |
| Data lives | Git repo | **Your Supabase Postgres** | Sanity cloud (EU = paid add-on) |
| Non-tech editing | No | **Yes** | Yes |
| EU residency | Trivial | **Trivial (same EU Postgres)** | Extra cost |

- **MVP: MDX.** Launch SEO content is a finite founder-written set — write it as MDX in the repo, rendered by Next.js. Zero infra, version-controlled, instantly EU-resident. Don't stand up a CMS for 30 pages you write yourself.
- **Phase 2: Payload CMS, self-hosted on the same Postgres** — the moment a non-technical person needs to edit without a deploy. Open-source TypeScript, content stays in your EU Postgres next to your relational data, clean admin UI, integrates into the Next.js app.
- **Reject Sanity** — separate vendor cloud, EU residency becomes paid, adds GROQ, fragments data, offers nothing Payload-on-Postgres doesn't.

---

## 10. Media / footage + showcase gallery

- **Storage:** Supabase Storage (S3-compatible, EU region). Originals **private**, accessed via **signed URLs** only.
- **Delivery:** `next/image` for responsive images; poster frames + compressed web versions for video. If video gets heavy, **buy Mux in Phase 2** — don't self-host transcoding.
- **Consent model (critical for marketing reuse):** an asset is showcase-eligible only when `is_showcase_consented = true`, requiring **both** pilot consent (their work) **and**, where an identifiable property/people appear, client consent. Capture as a timestamped checkbox at upload/booking. Reusing footage without consent is a GDPR/IP landmine.
- **Public gallery:** `/gallery` — curated, admin-published, consented subset, filterable by segment, linking to pilot pages. Doubles as social proof, image-search SEO, and **your own marketing-content pipeline** (auto-tagged by segment/location). The Bronze→Platinum visual escalation (clean consumer media → point clouds/thermal maps) lives here and signals capability depth.

---

## 11. EU scale

| Axis | MVP (NL) | EU expansion (Phase 3) |
|---|---|---|
| **i18n** | NL + EN via App Router `[locale]` + next-intl; all strings externalized | Add DE/FR as locale dirs; URL `/[locale]/[segment]/[city]` |
| **Multi-currency** | EUR only | Stripe native multi-currency; store `currency` on requests/bookings |
| **GDPR/consent** | EU-resident data, timestamped consent flags, cookie banner, data-export + right-to-erasure endpoints, DPAs with Supabase/Stripe/Resend | Same model, localized legal pages |
| **Data residency** | **Pin Supabase to Frankfurt `eu-central-1`; Vercel EU region; Resend EU region** | Single EU region serves all EU markets — no per-country stores |
| **Regulation** | NL: RDW number format, A2/STS ladder, ~€1M insurance | **Country-adapter pattern**: EASA-core verification engine (harmonized EU-wide per digest) + per-country adapter for authority name, number regex, geo-zone source |

**Cheap-now / expensive-to-retrofit decisions to make at MVP:** externalize all UI strings (no hardcoded Dutch); store `country` + `currency` even with one value; build verification as `EASA-core + country-adapter`; locale-prefixed routing (`/nl/...`) from day one. Everything else is additive, not a rewrite.

---

## 12. Build phases

- **Phase 1 — MVP (NL):** full stack; pilot onboarding + manual-review verification + expiry cron; request flow + deterministic matching; **pay-per-lead via prepaid credits + exclusivity tiers**; per-pilot ISR pages + programmatic `/[segment]/[city]` SEO; MDX content; Supabase media + consented showcase gallery; admin console (verify/moderate/refund); NL+EN, EUR, EU-resident, GDPR basics. Beachhead: real estate + marketing/social footage.
- **Phase 2 — Monetization + content depth:** **Stripe Connect + commission on platform-booked jobs**; bookings + reviews-gated-on-booking; **Payload CMS**; calendar availability; Mux video if needed; marketing broadcasts.
- **Phase 3 — EU expansion:** more locales (DE/FR), multi-currency, per-country verification adapters, dedicated search only if Postgres FTS strains. Target Germany/Nordics (highest operator density).

---

## 13. Build-vs-buy

| Capability | Decision |
|---|---|
| Auth | **Buy** (Supabase) |
| Payments / payouts / escrow | **Buy** (Stripe + Connect) — never build money movement |
| Matching algorithm | **Build** — domain-specific, simple, must be explainable |
| Search (MVP) | **Build** (Postgres FTS + PostGIS) — buy an engine only at scale |
| Cert verification | **Build** (regex adapters + manual review + cron) |
| CMS | **Build-light** (MDX) → **OSS self-host** (Payload). Not Sanity SaaS |
| Email | **Buy** (Resend) |
| Media storage | **Buy** (Supabase); **buy** Mux for video later — no self-hosted transcoding |
| Hosting | **Buy** (Vercel) — zero-ops = the minimal-effort goal |

---

## 14. One-paragraph pitch

A single-codebase, serverless, EU-resident stack (Next.js on Vercel + Supabase + Stripe + Resend) that needs almost no operational babysitting: deploys are git pushes, infra is managed, and the only recurring human task is ~2-minute certificate reviews — wrapped so tightly by a nightly cron and email automation that lapsed pilots renew themselves. You monetize from day one on enforceable prepaid lead credits with an exclusivity lever that beats the shotgun incumbents on pilot retention, then layer Stripe-Connect commission once you have density. Per-pilot pages and programmatic city×segment SEO pages turn verified-pilot data into an organic-traffic engine, the consented showcase gallery turns pilots' footage into your marketing pipeline, and every schema and routing decision is built `EASA-core + country-adapter` so Germany and the Nordics are an additive expansion, not a rewrite.
