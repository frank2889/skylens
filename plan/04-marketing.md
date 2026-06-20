# THE MARKETING ENGINE
### NL-first drone-job marketplace — clients post jobs, we match to certified pilots, pilots pay per lead + commission

> **Working name used throughout:** **DroneMatch** (placeholder — swap for the final brand). Reasoning on naming is in §1.
> **Currency:** EUR, ex-BTW unless stated. **Horizon:** Year 1 (12 months from public launch).
> **Operating principle:** every marketing motion must be *automatable* and *self-feeding*. We are not building a content studio; we are building a machine where pilots' own footage becomes our advertising, and our SEO/landing-page surface scales without headcount.

---

## 0. The one-paragraph strategy (so the rest makes sense)

We have a **two-sided liquidity problem** with an unusually friendly structure: supply is abundant (~50,566 active NL operators, 62,661 A2 certificates issued) and demand is high-frequency at the bottom (every real-estate listing, every hotel campaign). The marketing engine's job is therefore **demand generation first** — pilots will come once leads flow, because no scaled NL competitor exists (dronepiloten.nl, DroneMatch.nl et al. are sub-scale agencies/dormant directories). We win demand with three compounding, low-labour assets: **(1) programmatic local+use-case SEO** that owns "drone [stad] [toepassing]" before anyone else; **(2) the Footage Flywheel** — we license the footage we already touch and turn it into organic + paid social + a showcase gallery, so our acquisition cost falls over time; **(3) automated email flows** that nurture both sides with near-zero human input. Paid acquisition (Google high-intent + Meta/TikTok with real footage) buys us liquidity in months 1–6 while SEO and the flywheel mature into the durable, cheap channels for Year 2+.

---

## 1. Brand & positioning (NL market)

### 1.1 The positioning statement

> **For Dutch businesses that need professional aerial footage or inspection, DroneMatch is the marketplace that delivers a vetted, insured, EASA-certified drone pilot at a fixed transparent price within 24 hours — without the agency markup or the gamble of hiring a stranger.**

Three jobs-to-be-done, three buyer fears we neutralise:

| Buyer fear | What kills the sale today | Our answer |
|---|---|---|
| "Is this pilot even legal/insured?" | No buyer can read an RDW exploitantnummer or A2 cert | **Verified badge**: RDW operator ID + A2/STS cert + €1M liability checked on file |
| "Will I overpay / get agency-marked-up?" | Agencies quote opaque day-rates | **Fixed transparent prices** per productized package |
| "Will it be done in time for my listing/campaign?" | Freelancers ghost; slow quotes | **24–72h delivery SLA**, instant match |

### 1.2 Brand pillars (these drive every asset)

1. **Vertrouwen / Trust** — verification is the moat. We surface what buyers *cannot self-assess*: RDW exploitantnummer, A1/A3 vs A2 vs STS tier, €1M insurance, C-class drone, geo-zone compliance. This is the single most important brand differentiator and the headline of the homepage.
2. **Snelheid / Speed** — instant match, fixed price in minutes, footage in 24–72h. Directly attacks the agencies' "transparent price within 30 min" promise and beats it.
3. **Vakmanschap / Craft** — the design quality and the showcase gallery *are* the proof. The site must look better than every competitor (low bar — most are 2018-era). This is also why the owner's "maximum design quality" instinct is commercially correct: in a trust market, polish = credibility.
4. **Lokaal / Local** — NL-language, NL-trust, nearest-pilot-no-travel-costs. "Geen reiskosten" is table stakes (every competitor promises it) — we make it automatic via geo-matching.

### 1.3 Verbal identity / tone

- **Language:** Dutch first, English toggle (for the international agencies, hotels, real-estate developers, and for EU expansion later). All programmatic pages and flows ship NL-first.
- **Tone:** Confident, concrete, no jargon for clients; technical and respectful for pilots (they're professionals — don't talk down). Avoid hobbyist "drone enthusiast" energy; this is a B2B services brand.
- **Tagline candidates (pick one, A/B the rest):**
  - **"De juiste dronepiloot. Vandaag geregeld."** (The right drone pilot. Sorted today.) ← recommended; leads with speed + trust
  - "Vakwerk vanuit de lucht. Gegarandeerd gecertificeerd."
  - "Jouw klus, onze gecertificeerde piloot."

### 1.4 Naming guidance

If the brand isn't locked: avoid "dronepiloten.*" / "dronepiloot.*" — that namespace is crowded and conflates us with the agency-resellers we're beating. Pick a name that signals **matching/marketplace + trust**, is `.nl` available, and works across EU TLDs for expansion (so a brandable coined word beats a descriptive Dutch phrase). "DroneMatch.nl" itself is taken by a dormant competitor — consider acquiring it (instant SEO + name) or coining something adjacent. Decide before any paid spend; rebrand mid-Year-1 is the most expensive mistake here.

### 1.5 Visual identity (brief for the designer)

- **Logo/wordmark:** clean geometric sans; a mark that reads as "connection/match" or a stylised flight path, not a literal quadcopter (every competitor uses a quadcopter clip-art).
- **Palette:** one confident primary (deep sky-blue or a distinctive teal — *not* the generic drone-industry orange/black), a near-black for text, generous white space. The footage is the colour; the UI gets out of the way.
- **Hero treatment:** full-bleed real drone footage (from the flywheel) behind a single value prop + one CTA. The site's job is to make the footage the star.
- Build the public pages as **render-verified, self-contained, responsive** artifacts (use the `artifact-design` skill for the marketing landing pages and showcase gallery prototypes).

---

## 2. SEO & content strategy

SEO is our **durable, near-zero-marginal-cost demand channel** and the reason the business can run on "minimal operational effort." The plan has three layers: programmatic local pages, productized use-case hubs, and a thin authority/content layer.

### 2.1 The programmatic SEO core: "drone [stad] [toepassing]"

This is the flagship play. Dutch searchers query in exactly this shape: *"dronepiloot huren Amsterdam"*, *"drone makelaarsfoto Utrecht"*, *"dakinspectie drone Rotterdam"*, *"drone bruiloft Eindhoven"*. No competitor has systematically carpeted this grid.

**The grid = Cities × Use-cases × Intent modifiers.**

| Dimension | Values (launch set) |
|---|---|
| **Cities/regions** | Top 40 NL cities by population + 12 provincial/region pages = **~52 geo nodes** at launch; expand to ~150 (all gemeenten >25k inhabitants) by month 9 |
| **Use-cases (toepassingen)** | makelaarsfotografie/vastgoed, dakinspectie, zonnepaneel-inspectie, bouwvoortgang, bedrijfsvideo/marketing, bruiloft/event, FPV-video, 3D-scan/inspectie/landmeten, thermografie, agrarisch — **~10 use-cases** |
| **Intent modifiers** (in-page + title variants, not separate URLs) | "huren", "kosten/prijs", "laten maken", "bedrijf", "in de buurt" |

- **Page math:** 52 geo × 10 use-case = **520 city+use-case pages** at launch, scaling to ~1,500. Plus 10 national use-case hubs + 52 city hubs. This is a **few-thousand-URL** programmatic surface — large enough to dominate the long tail, small enough to keep quality high and avoid thin-content penalties.

**Page template (city+use-case), generated from a data model — NOT hand-written:**

```
URL: /drone/{toepassing}/{stad}     e.g. /drone/dakinspectie/rotterdam
H1:  Dronepiloot voor {toepassing} in {stad}
- Local hook: 1–2 dynamically-composed sentences referencing the city
  (landmarks/neighbourhoods/known building stock) — templated with a small
  per-city variable bank to avoid duplicate-content
- Fixed transparent price block for THIS use-case (pulls the package price)
- "X gecertificeerde piloten beschikbaar in {stad}" (live count from supply DB)
- 3–6 portfolio clips/stills FILTERED to this use-case (from the gallery)
- What's included / deliverable spec (standardized per use-case)
- Trust block: RDW-verified, A2/STS, €1M insurance, 24–72h
- Local-relevant FAQ (3–5 Q's, varied per city via variable bank)
- Reviews filtered to city/use-case where available
- Primary CTA: "Plaats je aanvraag" → the job-request form, pre-filled
  with {toepassing} + {stad}
- Internal links: this city's other use-cases + this use-case's nearby cities
```

**Anti-thin-content rules (critical — Google penalises bulk doorway pages):**
- Every page must carry **genuinely unique value**: real available-pilot count, real filtered portfolio media, real city-specific price/availability, and city-varied copy from a variable bank (each city gets 2–3 unique paragraphs, FAQs vary). The footage gallery is what makes these pages *not* thin — competitors can't replicate hundreds of pages each with real local aerial media.
- **Phased indexing:** publish the top 100 highest-search-volume combos first (big cities × real-estate/inspection/event), verify they index and rank, *then* roll out the long tail. Don't dump 1,500 pages on day one.
- Add `Service` + `LocalBusiness` + `FAQPage` + `AggregateRating` **structured data** to every node.
- One thin page can poison the cluster; gate publication on a minimum-content check in the generator.

**Why this wins:** programmatic SEO compounds — once the template + data model is built (a few weeks of dev), adding cities/use-cases is a data operation, not a content operation. This is the definition of "scales without headcount."

### 2.2 Use-case hub pages (national, conversion-optimised)

Ten money pages, e.g. `/drone-makelaarsfotografie`, `/drone-dakinspectie`, `/drone-bedrijfsvideo`. These rank for high-intent national terms, explain the productized package, show the best footage for that vertical, and feed the city pages via internal links. These get **hand-crafted copy** (they're the conversion workhorses).

### 2.3 The "kosten" play (high-intent, high-conversion)

"Wat kost een drone[X]" is a top Dutch query with commercial intent. Build a **price-transparency cluster**: `/wat-kost-dronefotografie`, per-use-case cost pages with real ranges (from the digest: real-estate €149–349, roof inspection €149–400, thermografie vanaf €495, mapping €1,500–10,000+). Transparency is our brand — lean into it hard. These pages double as link-bait (other sites cite price data) and as a soft pre-qualifier (filters out price-shoppers before they hit the form).

### 2.4 Authority/content layer (thin, deliberate)

Not a content mill. A small set of evergreen, link-worthy pieces that also serve pilots and EEAT:
- "Drone laten vliegen: wat mag wel/niet in NL" (regulation explainer — high search, builds trust/authority)
- "A1/A3 vs A2 vs STS: welke piloot heb je nodig?" (positions our verification)
- "Funda-foto's met drone: de complete gids voor makelaars"
- Annual **NL drone-market data report** (we sit on unique marketplace data → press + backlinks)

**Cadence:** 2–3 authority pieces/month, AI-drafted + human-edited. Don't over-invest here; the programmatic grid and the flywheel are the SEO engine, this is the credibility frosting.

### 2.5 Local SEO / Google Business

Register a Google Business Profile; encourage reviews (automated post-job ask, see §4). Even as a marketplace, a strong GBP captures "drone pilot near me" map-pack traffic.

### 2.6 SEO KPIs (Year 1)

| Metric | M3 | M6 | M12 |
|---|---|---|---|
| Indexed programmatic pages | 100 | 400 | 1,200 |
| Pages ranking top-10 (any kw) | 15 | 120 | 400 |
| Organic sessions/mo | 1.5k | 8k | 30k |
| Organic → job-request conv. | 2.5% | 3% | 3.5% |
| Organic leads/mo | ~40 | ~240 | ~1,000 |

---

## 3. THE FOOTAGE FLYWHEEL

This is the strategic heart and the owner's stated wish ("reuse pilots' footage for marketing"). Done right, it makes our marketing **self-replenishing and cheaper every month** — pilots produce our ad creative for us, for free, as a byproduct of doing jobs.

### 3.1 The flywheel loop

```
        Pilot completes a job through the platform
                        │
        We obtain a MARKETING LICENSE to the footage (opt-in at signup)
                        │
        ┌───────────────┼────────────────┬─────────────────┐
        ▼               ▼                ▼                 ▼
  Showcase gallery  Organic social   Paid social      Email/newsletter
  (SEO + leads)     (IG/TikTok/      creative         (best footage)
                     LI/YT)          (Meta/TikTok)
        │               │                │                 │
        └───────────────┴────────────────┴─────────────────┘
                        │
     More client leads  +  pilots see their work featured (status/credit)
                        │
        More pilots join + more jobs run → MORE FOOTAGE
                        └────────────────► (loop)
```

### 3.2 Getting the rights (the part everyone botches)

**Rule: secure the license at the moment of least friction — pilot signup — and make it the default, with credit as the incentive.**

- **Pilot Terms of Service** (accepted at registration) grant DroneMatch a **non-exclusive, royalty-free, worldwide, perpetual license to use, edit, and sublicense footage from jobs booked through the platform for marketing/promotional purposes, with attribution where feasible.** Pilot retains full ownership and all other rights. This is opt-out-able per job (toggle "exclude this footage") so we stay clean on client-confidential work.
- **Incentive, not coercion:** pilots *want* exposure. Every reuse credits the pilot (@handle on social, name + "Geverifieerde piloot" badge in gallery) and links to their profile → free portfolio promotion + inbound leads for them. Frame it as a perk: *"Wij maken jouw werk groter."*
- **Client consent layer:** the job-request flow includes a checkbox — *"Mag DroneMatch deze beelden gebruiken voor promotie? (Je krijgt korting/feature)"*. Default-on for real-estate/marketing (the footage *is* promotion — agents love the extra exposure of their listing); default-off and explicit-opt-in for inspection/private/wedding (privacy-sensitive). Property addresses/faces handled per AVG/GDPR — blur or get release.
- **Operationally:** a "release this footage to marketing" toggle in the post-job flow + a small monthly **"Footage of the Month" bonus** (e.g. €100 platform credit / lead credits) keeps a steady stream of pilots actively *submitting* their best clips. This converts a passive license into an active funnel.

> **Why this is defensible:** competitors are agencies with a handful of jobs; we aggregate footage across hundreds of pilots and dozens of cities/use-cases. The gallery and social feed become impossible to match — *and* it's the raw material that makes the programmatic SEO pages non-thin (§2.1).

### 3.3 Channel playbook

| Channel | Role | Format | Cadence | Automation |
|---|---|---|---|---|
| **Instagram** (Reels + grid) | Brand/discovery, real-estate & hotel buyers | 15–30s vertical flyovers, before/after listings, "satisfying" cinematic clips | 4–5/wk | Footage queue → batch-edit template → scheduler |
| **TikTok** | Reach/virality, lowest-cost discovery, FPV content (+40% in campaigns per digest) | FPV runs, "POV: your listing on Funda", fast cuts, trending audio | 5–7/wk | Same queue, TikTok-native edit preset |
| **LinkedIn** | B2B: makelaars, developers, construction, hotels, agencies | Case-study clips ("Hoe makelaar X 68% sneller verkocht"), inspection/mapping data-products, market data posts | 3/wk | Repurpose gallery + authority content |
| **YouTube** | SEO + long-form proof, evergreen | Use-case showreels, "how it works", longer cinematic films, embedded on landing pages | 1–2/wk + Shorts daily | Shorts from the same vertical queue |

**Production model (minimal labour):** one part-time editor or freelancer/AI-assisted pipeline builds **branded templates** (intro sting, lower-third pilot credit, end-card CTA). Incoming footage gets dropped into the template → exported in 4 aspect ratios → loaded into a scheduler (Buffer/Later/Metricool) → posts for 2–4 weeks auto-roll. **The pilots make the content; we package and schedule it.** Target: ~1 day/week of human time runs all four channels.

### 3.4 The Showcase Gallery (the conversion + SEO asset)

A filterable, beautiful gallery at `/showcase` (and its media embedded across all landing pages):
- **Filters:** use-case, city/region, drone tier (Bronze→Platinum), pilot.
- Each item: the clip/still, the use-case, the city, **the pilot credit (links to verified profile)**, and a **"Wil je dit ook? → Plaats aanvraag"** CTA pre-filtered to that use-case + city.
- Doubles as: (a) the proof that closes client leads, (b) the unique media that powers programmatic pages, (c) a recruitment magnet for pilots ("your work could be here, seen by thousands").
- This is the single highest-leverage page on the site — it's where trust, design quality, SEO, and lead-gen all converge. Build it first-class (artifact-design skill).

### 3.5 Flywheel KPIs

| Metric | M3 | M6 | M12 |
|---|---|---|---|
| Footage clips licensed | 60 | 250 | 900 |
| Social followers (all 4) | 2k | 10k | 40k |
| Organic social → site sessions/mo | 800 | 4k | 18k |
| Showcase gallery items | 50 | 200 | 700 |
| Best-clip reuse in paid ads | 5 | 20 | 60 |

---

## 4. Email marketing — concrete automated flows

Email is the cheapest, highest-ROI channel and is **fully automatable** — perfect for the "minimal operational effort" mandate. Use one ESP that does behavioural automation + Stripe/webhook triggers (Klaviyo, Customer.io, or Brevo for cost/NL-friendliness). Every flow below is trigger-based and runs without human touch.

### 4.1 CLIENT lead-nurture flow (triggered: job request submitted but not yet booked)

| # | Trigger / timing | Email | Goal |
|---|---|---|---|
| 1 | Immediately | "We zoeken jouw piloot" — confirms request, sets expectation (match in X hrs), shows 3 relevant showcase clips | Reassure, reduce abandonment |
| 2 | On match (auto) | "X gecertificeerde piloten gevonden" — profiles, verified badges, fixed price, big CTA to confirm | Convert to booking |
| 3 | +24h if not booked | "Nog twijfels?" — trust block (insurance/verification), a review, FAQ on pricing | Handle objection |
| 4 | +72h if not booked | Social proof + mild scarcity ("piloten in jouw regio zijn populair") + offer to adjust scope | Re-engage |
| 5 | +7d | Soft close: "Houden we je aanvraag open?" + downsell/alternative use-case | Last touch |

### 4.2 CLIENT post-booking & retention

| Trigger | Email |
|---|---|
| Booking confirmed | Logistics, what to expect, pilot intro, calendar add |
| Footage delivered | Delivery + **review request** (drives gallery social proof + GBP reviews) + **footage-use consent reminder** |
| +14d after delivery | "Tevreden? Hier is 10% op je volgende klus" — drives repeat (real-estate agents = recurring!) |
| +60–90d (real-estate seg) | "Nieuwe listing? Boek in 2 min" — exploits the per-listing frequency that makes real estate the beachhead |
| Quarterly | Segment newsletter (see 4.5) |

### 4.3 PILOT onboarding flow (triggered: pilot signs up)

| # | Timing | Email | Goal |
|---|---|---|---|
| 1 | Immediately | Welcome + complete-your-profile checklist (upload RDW ID, A2/STS cert, €1M insurance proof, portfolio, service area) | Activate |
| 2 | +1d if profile incomplete | "Je profiel is 60% klaar — verified piloten krijgen 3× meer leads" | Push verification |
| 3 | On verification | "Je bent geverifieerd! ✅" + how leads work, Stripe setup, lead-credit top-up | Get payment-ready |
| 4 | +2d | "Hoe je je eerste lead wint" — bidding/response best practices, response-time matters | Improve conversion |
| 5 | +5d | **Footage Flywheel pitch**: "Laat ons je werk uitlichten" — opt into marketing license, submit best clips, get featured + free promo | Feed the flywheel |
| 6 | First lead delivered | Coaching email: respond fast, the pilots who reply <1h win | Quality |

### 4.4 PILOT lead-alert & re-engagement (the operational core — must be instant)

- **Lead-alert email (transactional, instant):** the moment a matching job posts, fire to qualifying nearby verified pilots: *"Nieuwe klus: {toepassing} in {stad}, budget ~€{x}. Eerste reactie wint vaak."* + one-click claim/bid. Pair with push (PWA/app) so speed-to-lead is maximised. **This is the email that makes the marketplace tick — invest in its reliability.**
- **Low-balance nudge:** "Je lead-tegoed is bijna op — top up zodat je geen klus mist." (Stripe auto-recharge option.)
- **Re-engagement (pilot churned — no claim in 30d):** "Je miste X klussen in {stad} deze maand" — show real missed leads in their area (FOMO, factual). Then a win-back offer (free lead credits).
- **Renewal/expiry hook (digest insight):** ~12,085 NL certs expire Q1 2026. Flow: *"Je EU-dronebewijs verloopt binnenkort — verleng en blijf leads ontvangen."* Turns regulatory churn into retention + acquisition (and we can partner a flight school, see §5).

### 4.5 Newsletter (the flywheel's email arm)

- **Client newsletter (monthly):** "De beste beelden van deze maand" — curated best footage (the gallery's greatest hits), one customer story, one seasonal hook ("lente = verkoopseizoen, regel je listing-beelden"), one CTA. The footage *is* the newsletter — low effort, high open rate, and it re-warms past clients into repeat bookings.
- **Pilot newsletter (monthly):** lead-volume by region (so they see opportunity), "Footage of the Month" winner + bonus, regulation updates, tips. Keeps supply engaged and submitting footage.

**Email KPIs:** lead-nurture flow → ≥30% request-to-booking lift; post-delivery review-request → ≥35% review rate; pilot onboarding → ≥70% profile-completion; newsletter ≥35% open / ≥4% CTR.

---

## 5. Paid acquisition & partnerships

Paid spend's role: **buy liquidity in months 1–6** while SEO + flywheel mature, then taper as a % of mix. Lead with high-intent search (cheapest path to a buyer who's already decided), use social for volume + retargeting with the footage we own.

### 5.1 Google Ads — high-intent search (primary paid channel)

- **Target exactly the SEO grid terms** with commercial intent: "dronepiloot huren [stad]", "drone makelaarsfoto [stad]", "dakinspectie drone", "drone bedrijfsvideo", "drone bruiloft", "wat kost dronefotografie". These convert because the searcher wants to *buy now*.
- **Structure:** campaigns by use-case, ad groups by city tier. Tight match types, negative keywords for hobbyist/DIY/cheap-toy queries.
- **Landing pages = the programmatic city+use-case pages** (already conversion-built) → high Quality Score → cheaper clicks. This is the synergy: SEO infra doubles as paid LPs.
- **Economics check (from digest):** real-estate job ≈ €150–450; our revenue/job = lead fee (~€5–25) + commission (~10%, €15–45). High-value mapping/inspection jobs justify higher CPCs. Bid aggressively on construction/inspection/mapping terms (higher ACV); bid conservatively on weddings/events (cheap volume only).
- **Performance Max + brand defence** once data accumulates.

### 5.2 Meta (Instagram/Facebook) & TikTok — footage-driven

- **The whole point:** our ad creative is *free and already produced* by the flywheel. Real cinematic flyovers stop the scroll; this is a massive cost advantage over competitors running stock/clip-art ads.
- **Meta:** prospecting to lookalikes of converters + interest targeting (makelaars, hospitality, marketing managers, construction); **retarget site/gallery visitors** with the showcase clips + "plaats je aanvraag." B2B angle on the real-estate/hotel/agency audiences.
- **TikTok:** top-of-funnel reach, FPV + "POV your listing" content as both organic and Spark Ads (boost the organic posts that already pop). Cheapest CPMs, youngest cost-per-reach.
- **Pilot-acquisition ads** (small budget): target drone-cert holders / drone-interest audiences — "Krijg betaalde drone-klussen in jouw regio." Most pilot supply will actually come *free* from the lead flow + flywheel exposure, so keep this minimal.

### 5.3 Partnerships (high-leverage, low-cash)

| Partner type | Play | Why it works |
|---|---|---|
| **Real-estate portals / makelaar networks** (Funda ecosystem, NVM, brokerage chains) | Embed/affiliate "voeg drone-beelden toe aan je listing" → our flow; co-branded landing pages; bulk deal for agencies | Real estate = the #1 beachhead (every listing, recurring); meets buyers at the moment of need |
| **Real-estate photo studios** | White-label/referral for the aerial portion of shoots | They need aerial on demand; we supply vetted pilots |
| **Event venues, wedding planners, hotels/hospitality** | Referral + "preferred aerial partner" badge; hotel-marketing angle (digest: +47% social engagement) | Recurring event/marketing footage demand |
| **Agri co-ops / loonwerkers (DE/FR-relevant for EU)** | Co-marketed crop-scouting/inspection package | High-CAGR segment; co-op gives instant distribution |
| **Flight schools / EU-dronebewijs providers** | Cross-promo: their graduates get free DroneMatch onboarding + lead credits; we promote their renewal courses (the Q1-2026 expiry wave) | Free, continuous pilot-supply pipeline + ties into the renewal email hook |
| **Insurers / DroneWatch / industry media** | Content partnerships, the annual data report → PR + backlinks | Authority/EEAT + free reach |
| **Construction / facility-management firms** | Direct B2B for recurring inspection/progress (higher ACV margin engine) | Largest revenue pool (31–32% of EU services) |

> **Priority warm channel — drone training academies.** The flight-school partnership is the cheapest, highest-trust *supply* acquisition route: graduates just earned their licence and need paid work. **Concrete warm lead:** an indirect connection via *Restaurant De Cockpit* at **Seppe (Breda International Airport, Noord-Brabant)** → use it to open a partnership with the on-site drone academy. Note this seeds supply in **Brabant**, so pair it with Eindhoven/Breda demand or treat Brabant as a deliberate second liquidity pocket (see [06-geo](06-geo-strategie-en-3jarenplan.md), Part 4). Make "academy partnership" a repeatable playbook per market (NL schools → UK CAA RAEs → German Flugschulen).

---

## 6. Year-1 launch marketing plan

### 6.1 Phases

**Phase 0 — Pre-launch (Months -2 to 0):** Lock brand/domain. Build the programmatic SEO engine (template + data model + top-100 pages) and the showcase gallery. Set up ESP + all automated flows. **Seed supply manually:** recruit 50–150 verified pilots across the top 10 cities (direct outreach, flight-school partners, drone communities) — *so that when demand arrives, leads can be filled.* Get initial footage licensed from these seed pilots to fill the gallery and first social posts. Start IG/TikTok/LinkedIn to build a small following pre-launch.

**Phase 1 — Liquidity ignition (Months 1–3):** Public launch. Heavy Google Ads on top real-estate + inspection terms in the top 10 cities (concentrate, don't spread). Daily social from seed footage. Launch real-estate-portal/makelaar partnership pilots. Goal: prove the loop — a client posts → a pilot wins → footage flows back. **Metric that matters: lead-fill rate (% of job requests matched & responded to). Below ~80% and you over-spend on demand vs. supply — throttle ads, recruit pilots.**

**Phase 2 — Scale the grid (Months 4–6):** Programmatic SEO begins ranking — taper Google spend on terms where we rank organically (redeploy to new cities/use-cases). Roll out city pages 100→400. Footage flywheel now self-sustaining; ramp Meta/TikTok paid with our best clips. Launch construction/inspection B2B track. Newsletter live.

**Phase 3 — Compound & prep EU (Months 7–12):** SEO is now the #1 channel; paid becomes incremental + retargeting. Full programmatic grid (1,200+ pages). Publish the annual NL data report for PR/backlinks. Optimise flows on real data. **Stand up the EU-ready architecture:** country-agnostic verification engine + per-country adapter (digest's recommendation), and translate the page templates for the first expansion market (Germany — 694k operators, largest pool, or Belgium — easy NL-language adjacency). Begin German/Flemish programmatic pages as the Year-2 wedge.

### 6.2 Budget split — Year 1

> **Assumption:** total Year-1 marketing budget = **€120,000** (a realistic bootstrapped figure for a NL-first launch; scale every line proportionally if the owner's number differs). Excludes core product/engineering. Split is weighted to front-load paid (buy liquidity) and to invest in the durable, automatable assets (SEO + flywheel) that carry Year 2.

| Category | Year-1 € | % | What it buys | Front/back-loaded |
|---|---:|---:|---|---|
| **Google Ads (high-intent search)** | €36,000 | 30% | Liquidity engine M1–6, tapering as SEO ranks | Heavy M1–6, taper M7–12 |
| **Meta + TikTok (footage-driven)** | €18,000 | 15% | Volume + retargeting with owned footage; cheap because creative is free | Ramp M4–12 |
| **SEO build + programmatic engine** | €21,000 | 17.5% | Template/data-model dev, top-100 pages, structured data, tooling, ongoing tech SEO | Front-loaded M-2–3 |
| **Footage Flywheel** (editor/freelance, scheduler tools, "Footage of the Month" bonuses, content production) | €18,000 | 15% | Turns pilot footage into organic + paid creative + gallery | Steady, ramps with volume |
| **Email/ESP + automation setup** | €6,000 | 5% | ESP subscription + flow build (one-time + run) | Front-loaded then low run-rate |
| **Brand/design + showcase gallery + creative assets** | €12,000 | 10% | Identity, design-quality site/gallery (the trust moat), templates | Front-loaded M-2–1 |
| **Partnerships, PR & data report** | €6,000 | 5% | Portal/co-op deals, the annual NL drone report, media | M3 onward |
| **Pilot-supply acquisition** | €3,000 | 2.5% | Seed-pilot incentives + targeted recruitment ads | Front-loaded M-2–2 |
| **Total** | **€120,000** | **100%** | | |

**Spend-shape over time (paid vs. owned):**

| | M1–3 | M4–6 | M7–12 |
|---|---|---|---|
| Paid (Google+social) as % of spend | ~60% | ~45% | ~30% |
| Owned/durable (SEO+flywheel+email) | ~40% | ~55% | ~70% |

The whole budget philosophy: **paid front-loads liquidity, owned assets compound** so that by Year 2 customer-acquisition cost is dominated by SEO + the self-feeding footage flywheel — exactly the low-effort, high-margin machine the owner wants.

### 6.3 The five numbers to watch (north-star dashboard)

1. **Lead-fill rate** (matched + responded / requests) — the marketplace health metric; protect it above ~80%.
2. **Blended CAC per booked job** vs. revenue/job (lead fee + commission) — keep CAC < ~50% of LTV.
3. **Organic % of leads** — must climb every month (proof the durable engine is working; target ~50% by M12).
4. **Footage licensed / month** — fuel gauge for the flywheel.
5. **Repeat-client rate** (esp. real-estate agents) — the cheapest revenue; target ≥30% by M12.

---

## 7. Decisive summary — what to do, in order

1. **Lock brand + domain now.** Trust-signalling, marketplace-flavoured, EU-portable. Don't spend a euro on paid until this is fixed.
2. **Build the programmatic SEO engine and the showcase gallery first** — they're the durable, scaling, low-labour core and they double as paid landing pages. Design quality here is a commercial weapon, not a vanity.
3. **Bake the footage marketing license into pilot signup** (default-on, credit-incentivised) and the client consent into the job form. This is the flywheel's ignition — get it legally clean and frictionless from day one.
4. **Seed 50–150 verified pilots in the top 10 cities before public launch** so demand can be filled. Lead-fill rate is the metric that breaks marketplaces.
5. **Launch with concentrated Google Ads on real-estate + inspection terms in top cities**, while the four social channels run on seed footage. Buy liquidity; don't spread thin.
6. **Wire up every email flow before launch** — they run the business with near-zero labour and lift conversion 30%+.
7. **Taper paid into owned as SEO ranks and the flywheel self-feeds** — by M12 organic + social should be ~50%+ of leads.
8. **Prep the EU adapter (Germany/Belgium) in H2** so Year 2 is a data/translation operation, not a rebuild.

**The core bet:** in a fragmented NL market with no scaled incumbent, the winner is whoever combines *verifiable trust* + *the best footage surface* + *programmatic local reach*. All three are automatable and compounding. That's the engine.
