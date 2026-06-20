# Drone Marketplace — Package & Pricing Tier Design

**Business:** NL-first marketplace. Clients post drone jobs → we match to certified pilots. Pilots **pay per lead (Stripe) + commission per booked job**. Goal: near-zero ops, premium design, EU-ready, footage reuse for marketing.

Two ladders below:
- **(A) Client-facing service packages** — Bronze → Silver → Gold → Platinum. These are *productized, fixed-scope offers* clients buy. They are the demand engine and the thing your design has to sell.
- **(B) Pilot membership tiers** — Free/Listed → Pro → Elite. These set how leads are priced and how commission scales per tier.

A note on the model up front: **packages are priced, leads and commission are how *you* monetize them.** The two ladders are linked — a Bronze job generates a cheap lead and a small commission; a Platinum job generates an expensive, exclusive lead and a large commission. Keep that mapping in your head; the tables make it explicit.

---

## Design philosophy (the two decisions that drive everything)

**1. Productize, don't quote.** The entire NL competitive field ("custom quote", "prijs op maat") is a wall of friction. Your wedge is a **fixed price, a fixed deliverable, a fixed turnaround** — buyable in two clicks. So Bronze/Silver/Gold are *standardized SKUs* with a stated price *range* (final price set by region/travel/add-ons), and only Platinum is genuinely bespoke.

**2. Price the *deliverable*, gate the *pilot*.** The client picks a package by outcome (photos, video, report). The marketplace silently routes it only to pilots whose **gear + certification + insurance** match that tier. The client never sees the complexity; the pilot tiering (Ladder B) enforces it.

---

# (A) Client-Facing Service Packages

Prices are **indicative ranges, ex. 21% BTW**, anchored to verified NL market rates. The platform shows a fixed "from" price per region; the range reflects travel, add-ons, and site size.

## A1. The headline comparison table

| | 🥉 **BRONZE** | 🥈 **SILVER** | 🥇 **GOLD** | 💎 **PLATINUM** |
|---|---|---|---|---|
| **One-liner** | "Get it listed." | "Make it stand out." | "Data & technical." | "Cinema / mission-grade." |
| **Primary use case** | Real-estate listing, quick social proof, basic property/event capture | Premium real estate, hospitality, brand & social content, events | Roof/solar/façade inspection, construction progress, surveying, thermography, mapping | Brand films & commercials, TV/tourism, LiDAR survey, multi-day / specialist (confined-space, large-site) |
| **Who buys it** | Makelaars, SME owners, individuals | Marketing/social agencies, hotels, developers, venues | Property managers, roofers, solar installers, construction, municipalities | Production houses, tourism boards, large enterprise, engineering firms |
| **Typical drone / gear** | DJI Mini 5 Pro (sub-250g, C0) / DJI Air 3S (C1) | DJI Mavic 4 Pro (C2) | DJI Matrice 4E (mapping) / Matrice 4T + Zenmuse H30T (thermal) / Zenmuse L2 (LiDAR) | DJI Inspire 3 (full-frame 8K cinema) / Matrice 400 + L2 LiDAR / specialist rigs |
| **Cert required of pilot** | A1/A3 + operator reg + €1M insurance | A2 (close-to-people) | A2 + (often) Specific-cat / STS for site work | Specific-cat / STS + 2-person crew, frequently SORA/LUC |
| **Photos delivered** | 8–15 edited stills | 20–35 edited stills | 25–60 stills + technical captures | Unlimited project stills, graded |
| **Video** | 30–45 s, 4K/30 | 60–90 s, 4K/60 HDR (+ optional vertical social cut) | Optional 60–90 s site/progress clip, 4K | 1–3 min film, up to 8K RAW, graded to client LUTs |
| **Technical deliverable** | — | — | Orthomosaic / 3D model / **or** radiometric thermal report / DSM (one per job) | Classified LiDAR point cloud + DSM/DTM, multi-deliverable, or full cinema RAW package |
| **Edits / post** | Light colour + crop, web-ready | Full grade, music, titles | Stitched/processed data + PDF report | Full professional grade + colourist, multi-deliverable |
| **Turnaround** | 48 h | 72 h | 3–5 working days | 5–15 working days (multi-day shoots) |
| **Indicative price (ex BTW)** | **€95 – €199** | **€249 – €549** | **€495 – €2,500** | **€2,500 – €15,000+** |
| **Frequency / volume** | Very high | High | Medium | Low (aspirational) |

## A2. Per-tier detail

### 🥉 Bronze — "Get it listed" (€95–€199)
The volume funnel. This is the SKU that creates marketplace liquidity — high frequency, low friction, near-universal demand from makelaars.
- **Gear:** DJI Mini 5 Pro (€799, sub-250g/C0) or DJI Air 3S (C1). Sub-250g means lightest NL licensing and the ability to fly over uninvolved people (A1) — perfect for residential exteriors.
- **Deliverable:** 8–15 edited stills + a 30–45 s 4K flyover. Web/Funda-ready JPEGs + one MP4.
- **Turnaround:** 48 h. **Anchored to:** Vlieg Kunstenaar €149 photo / DalDrone €199 30-photo pack.
- **Productized SKU name:** *"Funda Aerial Pack."* Sell it as a one-price, one-click, next-2-days product. This is your hero offer.

### 🥈 Silver — "Make it stand out" (€249–€549)
The margin-rich marketing tier. Higher craft, social-native outputs, repeat agency/hotel buyers.
- **Gear:** DJI Mavic 4 Pro (from €2,099, C2, 100MP Hasselblad, 6K/60). Requires A2-certified pilot.
- **Deliverable:** 20–35 edited stills + 60–90 s 4K/60 HDR film, fully graded with music/titles + an optional 9:16 vertical cut for Reels/TikTok.
- **Turnaround:** 72 h. **Anchored to:** Vlieg Kunstenaar combo €249 / premium €349; social clip packs €299; premium video €450–800.
- **Add-ons (upsell engine):** ground/interior shots (+€150), FPV clip (+€250), second location (+€120).

### 🥇 Gold — "Data & technical" (€495–€2,500)
The B2B value engine. Lower frequency, much higher ticket, recurring contracts (construction progress, periodic solar checks). One technical deliverable per job keeps it productized.
- **Gear:** DJI Matrice 4E (mapping, ~$5,189) or Matrice 4T + **Zenmuse H30T** thermal ($11,610-class, 1280×1024, ≤50 mK) or **Zenmuse L2** LiDAR ($12,430, 5 cm/4 cm RTK accuracy).
- **Deliverable (pick one):** orthomosaic + DSM **·** 3D model **·** **radiometric thermal report** (roof/solar) **·** small-area survey.
- **Turnaround:** 3–5 working days. **Anchored to:** certified thermography from €495; roof €149–199; solar field ~€2,000; small mapping €1,500–3,000.
- **Pilot gate:** A2 minimum, Specific-category/STS + RTK for surveying. Insurance certificate mandatory and shown to buyer.

### 💎 Platinum — "Cinema / mission-grade" (€2,500–€15,000+) — *aspirational*
Rare, high-margin, lowest competition. This tier exists to signal capability depth and anchor the brand premium even though it's low volume. **Genuinely bespoke** — "Request a quote", not instant checkout.
- **Gear:** DJI **Inspire 3** full-frame 8K cinema platform (~€12,400 + VAT; Zenmuse X9-8K Air, 8K ProRes RAW, interchangeable DL primes — note: ~28 min flight, not 40; 18/24/35/50/75mm lens lineup) **or** DJI **Matrice 400** (up to 59 min, 6 kg payload) + Zenmuse L2 for large-area LiDAR.
- **Deliverable:** 1–3 min graded brand/cinema film in up to 8K RAW to client LUTs, **or** classified LiDAR point cloud + DTM/DSM survey package. Multi-day shoots supported.
- **Crew:** 2-person (pilot + camera op), Specific-category authorisation, frequently SORA/LUC.
- **Turnaround:** 5–15 working days. **Anchored to:** NL LiDAR projects €2,000–10,000+; full video productions €1,500–5,000.

> One honest caveat baked into the gear claims: where the source research was over-optimistic (Inspire 3 flight time, lens list; Air 3S weight), I've used the corrected verified figures above.

---

# (B) Pilot Membership Tiers

This is where you actually make money. Three tiers. The free tier seeds supply; Pro and Elite monetize it. **Two levers move per tier: (1) lead price, (2) commission rate.** A higher membership buys *cheaper, more exclusive, higher-quality* leads and a *lower* commission — that's the upgrade incentive.

## B1. Lead pricing logic (the core mechanic)

Leads are priced **per job-value tier**, not flat — a €150 Bronze lead can't cost the same as a €5,000 Platinum lead. Benchmarks: Werkspot €3–75, Bark ~€16, exclusive leads command 2–3× and convert 2–3× better. Drone jobs clear the profitability bar easily (most exceed the €250–400 break-even), so we can price confidently.

**Base lead price by job tier (what a Pro member pays per lead):**

| Job tier | Indicative job value | **Base lead price** | Exclusivity (default) |
|---|---|---|---|
| Bronze | €95–199 | **€6–12** | Shared (max 3 pilots) |
| Silver | €249–549 | **€18–30** | Shared (max 3 pilots) |
| Gold | €495–2,500 | **€45–90** | Semi-exclusive (max 2) |
| Platinum | €2,500–15,000+ | **€120–250** | **Exclusive (1 pilot)** |

> Rationale: at ~15% shared-lead conversion, a Pro paying €25 for a Silver lead effectively pays ~€165 per won €400 job — comfortably under the ~10–20% acquisition budget a pilot can afford. Exclusive Platinum leads convert 30–50%, justifying the high price.

## B2. The membership comparison table

| | **FREE / LISTED** | **PRO** | **ELITE** |
|---|---|---|---|
| **Monthly fee (ex BTW)** | €0 | **€39/mo** (or €390/yr) | **€129/mo** (or €1,290/yr) |
| **Who it's for** | New/part-time pilots, top-of-funnel supply | Active full-time pilots, the core | High-volume / B2B specialists, agencies |
| **Profile listing** | Basic, ranked below paid | Enhanced, portfolio, badge | Featured / top-ranked, full portfolio + case studies |
| **Lead price** | **Base price + 25% surcharge** | **Base price** (table above) | **Base price − 25%** |
| **Commission on booked job** | **15%** | **10%** | **7%** |
| **Lead access** | Bronze + Silver only; delayed 2 h | All tiers, real-time | All tiers, **early access** (15-min head start) |
| **Lead exclusivity** | Shared only | Shared + semi-exclusive | First refusal on exclusive Gold/Platinum |
| **Monthly lead cap** | 5 leads/mo | Unlimited | Unlimited |
| **Included lead credits** | — | €25 credit/mo | €100 credit/mo |
| **Verification badge** | "Registered" | "Verified Pro" (cert + insurance checked) | "Elite — Specific-cat / insured" |
| **Payouts** | Stripe, standard | Stripe, standard | Stripe, **priority (faster)** |
| **Footage-reuse rev-share** | — | — | Eligible for marketing-footage bonus (see below) |

## B3. How lead pricing & commission differ per tier — worked example

A **Silver job (€400 booked)**:

| | Free/Listed | Pro | Elite |
|---|---|---|---|
| Lead price paid | €30 + 25% = **€37.50** | **€24** (mid-base) | €24 − 25% = **€18** |
| Commission (15/10/7%) | **€60** | **€40** | **€28** |
| **Total platform take per won job** | **€97.50** | **€64** | **€46** |
| Pilot net (of €400) | €302.50 | €336 | €354 |

A **Gold job (€1,500 booked)**:

| | Free/Listed | Pro | Elite |
|---|---|---|---|
| Lead price paid | €90 + 25% = **€112.50** | **€70** | €70 − 25% = **€52.50** |
| Commission | **€225** | **€150** | **€105** |
| **Total platform take** | **€337.50** | **€220** | **€157.50** |

> The pattern is deliberate: Free pilots pay the *most* per job (lead surcharge + high commission) — that's the upgrade pressure. Elite pilots pay the *least* but pay you €129/mo up front and bring the volume + B2B quality you want. Pro is the profitable middle that most pilots live in.

## B4. Why this structure (entrepreneur's logic)

- **Free tier ≠ charity — it's supply liquidity.** You need a deep pilot pool fast (NL has ~50k active operators, but only ~300 Specific-cat). Free + 5 leads/mo gets them on, then the surcharge + 15% commission + lead cap make upgrading obvious within a month or two of real work.
- **Commission only on platform-booked jobs.** Like Droners.io (10%+10%), but you take commission *from the pilot only* and keep the client price clean. Commission is enforceable only when booking/payment flows through Stripe — so make on-platform booking the default and the lead fee the fallback for off-platform leakage. The per-lead fee is your guaranteed revenue floor; commission is the upside.
- **Dual revenue de-risks both sides.** Pay-per-lead earns even on jobs that don't close on-platform; commission earns the big tickets. You're not betting the business on one mechanic.
- **Exclusivity is your retention weapon.** The #1 marketplace killer (Bark/Thumbtack) is shotgunning one lead to 10 pros. Cap at 3 (Bronze/Silver), 2 (Gold), 1 (Platinum). Higher conversion → happier pilots → lower churn → better margins than a higher take-rate would buy.

---

## Footage reuse — turn it into a tier perk (and a content engine)

The owner wants to reuse pilot footage for marketing. Make it **opt-in and incentivized**, not a grab:
- **Elite perk:** pilots license selected clips to the platform's marketing for a **€25–75 credit per accepted clip** (offset against lead fees). Low cash cost, builds your content library, and gives Elite a reason to feed you their best work.
- Bronze/Silver/Gold: optional checkbox at upload ("allow platform to feature this work, credited") — most will say yes for the portfolio exposure. This populates your homepage and social with zero production cost — the cheapest premium-design content you'll ever get.

---

## Automation & low-ops notes (so this actually runs itself)

- **Stripe** handles: membership subscriptions (Pro/Elite), per-lead charges (charge-on-claim), commission capture (application fee on Stripe Connect transfers to pilots), and credits/refunds.
- **Routing is rules-based, not manual:** job tier + region + required cert/insurance → eligible pilot pool → notify by membership rank (Elite early-access → Pro → Free delayed). No human in the loop.
- **Lead-quality guarantee** (auto-refund as Stripe credit if a lead is junk — bad number, out of area) protects pilot trust at near-zero ops cost and is your anti-Bark differentiator.
- **EU expansion:** the tier structure is country-agnostic. Reuse the same Bronze→Platinum SKUs and Free/Pro/Elite memberships; only swap the per-country **verification adapter** (RDW in NL; the local NAA elsewhere — EASA certs are portable) and re-localize the price ranges. Roll into Germany (694k operators) and the Nordics next, where operator density and inspection demand are highest.

---

## Bottom-line recommendations (decisive)

1. **Launch with Bronze + Silver only** (real-estate & marketing footage). Fastest liquidity, abundant A2 supply, lowest friction. Add Gold once you've vetted an insured Specific-cat supply tier; keep Platinum as a "request a quote" prestige showcase from day one for brand halo.
2. **Lead fee is the floor, commission is the upside.** Run both. Default everything to on-platform booking so commission actually lands.
3. **Memberships: €0 / €39 / €129.** Commission 15% / 10% / 7%. Lead price surcharge/base/discount of +25% / base / −25%. This makes the upgrade math sell itself.
4. **Cap leads per request (3/2/1 by tier).** This is the single most important retention decision — don't copy Bark's shotgun.
5. **Make footage reuse an Elite perk with a small credit.** Free marketing content, happy top pilots, zero ops.
