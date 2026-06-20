# Business Model & Unit Economics

## 1. Revenue Model: Why Pay-Per-Lead + Commission Wins

The platform runs a **hybrid monetization model** built around one principle: charge the side that captures value (pilots), at the moment value is created (a qualified lead), with a thin upside hook on completed work. This is the locally-proven Werkspot/Bark structure (free for clients, pilots pay), upgraded with lead exclusivity to avoid the Thumbtack "shotgun" churn trap.

| Stream | Mechanic | Price | Who pays | % of Y3 revenue |
|---|---|---|---|---|
| **1. Pay-per-lead (core)** | Pilot pays to *unlock* a matched job request (contact + brief). Capped at **3 pilots per request** (semi-exclusive). | EUR 12–80 by job tier | Pilot | ~70% |
| **2. Commission on booked job** | 10% take rate on jobs **booked & paid through the platform** (Stripe escrow). | 10% of job value | Pilot (auto-deducted from payout) | ~15% |
| **3. Pilot subscription tiers (optional)** | Monthly plan: lead discounts, higher lead caps, priority matching, "verified Pro" badge. | EUR 39/mo (Pro), EUR 99/mo (Studio) | Pilot | ~15% |
| **4. Clients** | **Free** to post and receive matches. | EUR 0 | — | 0% |

### Lead-unlock mechanics (the core engine)
1. Client posts a job request (free, 60-second form: use-case, location, date, budget band).
2. Engine auto-matches by geo + capability + cert tier (RDW operator ID, A1/A3 vs A2 vs STS, EUR 1M liability insurance) and notifies up to **3 eligible pilots**.
3. Pilot pays the **tier-priced lead fee via Stripe to unlock** the client's contact + full brief. First-come unlock; cap at 3 protects conversion.
4. Optional: client pays through platform → 10% commission auto-deducted, footage rights captured in T&Cs.

### Why this mix maximizes revenue with minimal owner effort
- **Pay-per-lead is collected on contact, not on close** — no chasing invoices, no enforcement of off-platform deals. Revenue lands automatically via Stripe the moment a pilot clicks "unlock."
- **Lead exclusivity (cap 3, not 8–15)** keeps pilot conversion at ~18% instead of the single-digit rates that make Bark/Thumbtack pilots churn. Higher conversion → pilots keep buying → retention is the moat.
- **Commission is a bonus, not the foundation.** Commission is hard to enforce off-platform, so it's deliberately a *minority* stream (~15%) layered on top — it grows as the platform earns trust and payment flow, without ever being load-bearing.
- **Subscriptions smooth cash flow** and lock in the ~20% of pilots who are full-time professionals (the high-frequency buyers), converting lumpy lead spend into predictable MRR.
- **Footage reuse is free marketing inventory** — captured in pilot T&Cs at upload, fueling SEO/social demand-gen at near-zero CAC.
- Everything (matching, payment, payout, cert-expiry flagging) is **automatable** — the owner's job is supply onboarding + demand SEO, not operations.

---

## 2. Unit Economics

### Job-value tiers (NL, ex VAT — from research)

| Segment | Lead share | Avg job value | Lead price | Conversion | Pilot cost / won job | % of job |
|---|---|---|---|---|---|---|
| Real estate / marketing | 55% | EUR 250 | **EUR 12** | 18% | EUR 67 | 27% |
| Inspection (roof/solar/facade) | 25% | EUR 275 | **EUR 15** | 18% | EUR 83 | 30% |
| Events / wedding | 10% | EUR 500 | **EUR 25** | 16% | EUR 156 | 31% |
| Survey / mapping / LiDAR | 10% | EUR 3,000 | **EUR 80** | 18% | EUR 444 | 15% |
| **Blended** | 100% | **EUR 556*** | **EUR 21** | **17.8%** | — | — |

*\*Blended avg job value is skewed up by the survey tier; the **volume core (RE + inspection = 80% of leads) sits at EUR 250–275**. Job values, conversion (shared-lead home-services benchmark ~10–20%, base case 18%), and the "acquisition spend should be ~10–25% of job value" rule are all drawn from the verified digest (Werkspot, Bark, Thumbtack, LocaliQ).*

**Key pilot-side check:** cost-per-won-job lands at **15–31% of job value** across all tiers — inside the rational acquisition budget for a pilot grossing EUR 200–800/job. The model is *pilot-profitable*, which is what keeps them buying leads.

### Per-client-request economics (the atomic unit)

| Item | Value | Assumption |
|---|---|---|
| Avg pilots unlocking a request | 2.3 | cap 3; not every match unlocks |
| **Lead revenue / request** | **EUR 48** | 2.3 × EUR 20.85 blended |
| P(request → booked job) | 36% | 1−(1−0.178)^2.3 |
| Platform-paid share of jobs | 35% | rest settle off-platform |
| **Commission revenue / request** | **EUR 7** | 36% × 35% × 10% × EUR 556 |
| **Total revenue / request** | **EUR 55** | — |

### Pilot LTV, CAC & contribution margin

| Metric | Value | Note |
|---|---|---|
| Active-pilot ARPU | **EUR 85/mo** | 3.5 leads/mo (EUR 73) + commission (EUR 12) |
| Avg active life | 15 months | conservative for lead-gen |
| **Pilot LTV (transactional)** | **~EUR 1,150** | ARPU × 15 × 90% GM |
| **Subscription-tier LTV** | **~EUR 456** | EUR 39 × 13 mo × 90% |
| **Blended pilot CAC** | **EUR 40** | SEO + direct outreach to the ~50,600 active RDW operators; cert-expiry wave (12k certs, Q1 2026) is a cheap acquisition hook |
| **LTV / CAC** | **~14–29×** | exceptional — supply acquisition is the cheapest part of this business |
| Client CAC | ~EUR 0 (organic) | SEO + reused footage; clients are free, no paid acquisition needed at launch |
| **Contribution margin** | **~96%** | only variable cost is Stripe (~3.5% on small EU card txns) |

The economics are dominated by one fact: **gross margin is ~96%** because the only true COGS is payment processing. This is a software-margin business, not a services business.

---

## 3. Three-Year P&L

**Core driver: avg client requests/month** (realistic cold-start ramp in Y1: ~10/mo → ~310/mo by month 12) and **active subscribers**. All figures EUR, ex VAT.

| | **Year 1** | **Year 2** | **Year 3** |
|---|---:|---:|---:|
| Avg requests / month | 136 | 650 | 1,700 |
| Avg paying subscribers | 23 | 180 | 420 |
| Transactional revenue | 89,650 | 429,000 | 1,122,000 |
| Subscription revenue | 10,725 | 84,000 | 197,000 |
| **Total revenue** | **100,400** | **513,000** | **1,319,000** |
| COGS — Stripe fees (~3.5%) | (3,500) | (18,000) | (46,000) |
| **Gross profit** | **96,900** | **495,000** | **1,273,000** |
| Gross margin | 96% | 96% | 96% |
| Marketing / demand-gen | (15,000) | (55,000) | (120,000) |
| Tooling / infra (Stripe, hosting, matching, KYC) | (8,000) | (18,000) | (34,000) |
| Other opex (contractors, support, legal) | (5,000) | (20,000) | (45,000) |
| **EBITDA / P&L** | **~68,900** | **~402,000** | **~1,074,000** |
| Net margin | 69% | 78% | 81% |

### Explicit assumptions
- **Revenue/request EUR 55** held flat (lead-price increases offset by EU-expansion mix dilution).
- **No owner salary in Y1** (automated, semi-passive; owner reinvests). Other-opex covers part-time contractor + tooling. From Y2 a market-rate owner draw should be carved out of EBITDA (not shown — these are pre-owner-comp).
- **Marketing scales sub-linearly to revenue** because reused pilot footage + SEO does the heavy lifting; paid spend mainly funds EU-market entry (Germany/Belgium) in Y2–Y3.
- **Tooling is lean**: Stripe Connect for split payouts, a no-/low-code matching engine, document-based cert verification (no EU-wide cert API exists yet).
- Y2/Y3 request growth assumes liquidity flywheel (more pilots → faster fills → more clients) plus 1–2 EU markets layered on.

---

## 4. Break-Even & Funding

### Break-even
- **Y1 fixed cost ~EUR 1,250/month** (tooling + base opex, ex-marketing).
- At **EUR 55 revenue/request → break-even is ~23 requests/month** ex-marketing, or **~50 requests/month** including a EUR 1,500/mo marketing budget.
- The realistic ramp crosses ~50 requests/month around **month 4–5**. The business is **structurally profitable from roughly half a year in.**

### Funding verdict: **Bootstrap. No external capital needed.**
- Modeled **peak cumulative cash low point in Y1 is only ~EUR 3,400** — a trivial gap fully covered by an owner buffer of EUR 10–15k.
- The ~96% contribution margin means revenue self-funds growth almost immediately; there are no inventory, no fixed labor, and no working-capital drag (Stripe collects before payout).
- **Y1 exits at a ~EUR 19k/month run-rate** and the business throws off **~EUR 69k EBITDA in Y1**, self-financing the Y2 marketing step-up.

**Recommendation:** Do **not** raise. A pre-seed round would dilute a business whose entire cost base is a few thousand euros of tooling and whose supply (50k+ NL operators) is acquirable for ~EUR 40 a head. Bootstrap to profitability on NL real-estate + inspection leads, reinvest Y1 EBITDA into the matching/automation polish and the first EU market (Germany — 694k operators), and only consider outside capital if you later choose to *buy* growth to pre-empt a Zeitview/fairfleet NL localization. Optionality, not necessity.

### Startkapitaal: feitelijk €0 — bouw in-house, ad spend is de enige variabele cash-out

De eigenaar runt een webbureau en bouwt het platform zelf → de **build-kosten zijn ~€0 cash**
(wel reële tijd/opportunity-cost). De vaste infra start vrijwel gratis: domein (~€10/jr),
Supabase/Vercel/Resend free tiers (pas $20–25/mnd elk zodra je ze ontgroeit), Stripe = 0 vooraf
(alleen ~% over omzet). Daarmee zakt de echte cash-out tot **~€0–50/mnd infra + ad spend naar keuze**.

**Implicaties — herframe de marketing-regel in de P&L als variabele hendel, geen vaste kost:**

- Ad spend is **de enige betekenisvolle cash-out** en is volledig discretionair. Start op **€0**:
  de cold-start draait op founder-led directe verkoop (makelaars bellen) + concierge-matching +
  organische SEO + de footage-flywheel — allemaal gratis gegeven eigen arbeid.
- **Volgorde:** ad spend is het láátste geld dat je uitgeeft, niet het eerste. Zet het pas aan
  zodra je weet dat een betaalde lead converteert — dan koop je liquiditeit met bewezen unit-economics.
- **Uitzondering:** een mini-testbudget (~€300–500 Google Ads) kan in 2 weken aantonen wat SEO
  pas in ~6 maanden zou bevestigen. Dat is validatie-spend, geen groei-spend — de moeite waard.
- **Eerlijke kanttekening:** "gratis bouwen" ≠ gratis. De agency-tijd is een reële investering
  (opportunity-cost). En €0 ad spend betekent **trager naar liquiditeit** — je ruilt cash in voor
  tijd. Dat is bij bootstrappen de juiste keuze, maar benoem de ruil.

---

*Caveats: NL-specific drone lead prices don't yet exist publicly — the EUR 12–80 tier pricing is extrapolated from adjacent NL/UK/US home-services benchmarks (Werkspot EUR 3–75, Bark ~EUR 16, Thumbtack USD 25–75) and must be validated with a live pilot in the first 60–90 days. Conversion (18%) and platform-payment share (35%) are the two most sensitive levers; the model stays profitable down to ~12% conversion. Market-size figures from the digest are vendor estimates that include delivery/logistics — they justify direction and tailwinds, not the bottom-up revenue here, which is sized from operator counts × job values as recommended.*
