# CLAUDE.md — Drone-Piloot Marktplaats

Oriëntatie voor elke Claude Code-sessie in dit project. Lees dit eerst; lees daarna
[README.md](README.md) en de relevante documenten in [`plan/`](plan/).

---

## Wat dit is

Een **two-sided marktplaats** waar klanten een dronevlucht aanvragen en wij ze koppelen
aan een **geverifieerde, gecertificeerde, verzekerde drone-piloot**. Het is een
**lead-marktplaats**, geen bureau: piloten betalen **per lead** (Stripe) + **commissie per
geboekte opdracht**. Doel van de eigenaar: **near-zero operationeel werk**, **maximale
designkwaliteit**, en **EU-uitbreiding** later.

**Status (juni 2026):** strategie + marktonderzoek compleet (zie `plan/`). **Nog geen code.**
Volgende stap is de MVP-codebase of een design-prototype — vraag de eigenaar wat eerst.

---

## Vastgelegde beslissingen — NIET opnieuw bediscussiëren

Deze zijn doordacht en onderbouwd in `plan/`. Wijk er alleen van af als de eigenaar er
expliciet om vraagt.

- **Stack = Next.js (App Router) op Vercel + Supabase (Postgres/Auth/Storage, regio Frankfurt
  `eu-central-1`) + Stripe (iDEAL/SEPA/card + Connect) + Resend.** → **GEEN WordPress.**
  Onderbouwing: [plan/05-techniek.md](plan/05-techniek.md).
- **CMS:** MDX in repo voor de MVP → later Payload op dezelfde Postgres. **Geen Sanity.**
- **Geografie:** **NL-first, geconcentreerd in de Randstad.** Niet meteen heel Europa
  (liquiditeit is lokaal). Uitrol: jr2 België-Vlaanderen + DE NRW/Ruhr → jr3 Nordics → Frankrijk.
  → [plan/06-geo-strategie-en-3jarenplan.md](plan/06-geo-strategie-en-3jarenplan.md).
- **Verdienmodel:** pay-per-lead = de vloer; **10% commissie** = upside; **lead-exclusiviteit**
  is het retentiewapen. Exclusiviteit-cap per aanvraag = **3 / 3 / 2 / 1** (brons/zilver/goud/platinum).
- **Pilotenlidmaatschap:** Free €0 (15% commissie) · Pro €39/mnd (10%) · Elite €129/mnd (7%).
  Leadprijs-modifier: +25% / basis / −25%.
- **Klantpakketten:** Brons €95–199 · Zilver €249–549 · Goud €495–2.500 · Platinum €2.500–15.000+
  (ex BTW). → [plan/03-pakketten.md](plan/03-pakketten.md).
- **Funding:** **bootstrappen, niet ophalen** (piek-cashgat ~€3,4k). → [plan/02-verdienmodel.md](plan/02-verdienmodel.md).
- **Startkapitaal ≈ €0:** build is in-house (eigen bureau, ~€0 cash), infra op free tiers,
  Stripe = 0 vooraf. **Ad spend is de enige variabele cash-out** en is discretionair — start op
  €0 (founder-led verkoop + concierge + SEO + footage-flywheel), schaal het pas ná bewezen
  lead→betaald conversie. Mini-testbudget (~€300–500) mag eerder als validatie. Behandel de
  marketing-regel in de P&L als variabele hendel, niet als vaste kost.
- **Beachhead-segmenten:** (1) vastgoed/makelaars-media, (2) marketing/social/FPV-content.
  Daarna bouw/infra-inspectie als margemotor.

## Anti-patronen — NIET doen

- ❌ WordPress / multisite voor het platform.
- ❌ Kapitaal ophalen vóór de MVP winstgevend is.
- ❌ Eén lead naar 8–15 piloten "hagelschieten" (Bark/Thumbtack-doodspiraal). Respecteer de caps.
- ❌ Verificatie als simpele checkbox behandelen — het is een first-class datamodel (zie hieronder).
- ❌ Geldstromen / escrow zelf bouwen — altijd via Stripe Connect.
- ❌ Een aparte zoekmachine (Algolia/Elastic) in de MVP — Postgres FTS + PostGIS volstaat.

---

## Bouwconventies (future-proof vanaf dag 1)

Goedkoop nu, duur om achteraf te retrofitten — doe dit meteen, ook al lanceren we NL-only:

- **i18n:** externaliseer ALLE UI-strings (geen hardcoded Nederlands). Locale-geprefixte
  routing (`/nl/...`) met `next-intl`. NL + EN bij start; DE/FR zijn later additief.
- **Multi-currency/BTW:** sla `country` + `currency` op records op, ook al is de waarde nu één.
- **Verificatie = `EASA-core + per-land-adapter`.** De kern werkt op geharmoniseerde EASA-velden;
  per land plug je een adapter in voor autoriteit, nummerformaat-regex (NL = RDW exploitantnummer)
  en geo-zone-bron.
- **GDPR/EU-residency:** alle data in de EU-regio (Supabase Frankfurt, Vercel EU, Resend EU);
  getimestampte consent-vlaggen; data-export + recht-op-vergetelheid; DPA's met leveranciers.
- **Row-Level Security in Postgres** is de beveiligingsgrens: betaalde contactdata en privé-
  certificaten mogen nooit lekken via een front-end bug. Contactgegevens van een aanvraag zijn
  alleen leesbaar voor een piloot met een `purchased` lead-rij.
- **Taal:** code/commentaar/identifiers in het Engels; alle gebruiker-gerichte tekst (UI, e-mail,
  SEO-content) in het Nederlands.

## Kernconcepten in het datamodel

`leads` staat **los van** `bookings` — dat maakt het hybride model mogelijk (leadfee altijd,
commissie alleen op via-platform betaalde klussen). `requests.max_pilots` is de exclusiviteit-
hendel. `reviews` zijn gekoppeld aan `booking_id` (alleen wie boekte mag reviewen = trust-moat).
`certifications.expires_at` (5-jaarsklok) + een nachtelijke cron die `verified→expired` flipt is
het #1 data-kwaliteitsrisico — bouw dit goed. Volledig model: [plan/05-techniek.md](plan/05-techniek.md).

---

## Open validaties (aannames, nog niet bewezen)

Behandel deze als hypotheses, niet als feiten:

- **Leadprijzen (€6–80)** zijn geëxtrapoleerd uit Werkspot/Bark/Thumbtack — er is geen publieke
  NL drone-leadprijs. Valideren in de eerste 60–90 dagen met echte transacties.
- **Conversie 18%** en **platform-betaalaandeel 35%** zijn de gevoeligste hendels. Model blijft
  winstgevend tot ~12% conversie.
- **Fill-rate** (% aanvragen dat ≥1 gekwalificeerde piloot binnen 24u krijgt) is de make-or-break
  marktplaats-metric. Doel ≥80–85% per metro.
- Marktomvang-cijfers zijn vendor-schattingen incl. logistiek — richting, geen bottom-up omzet.

---

## Werken met de eigenaar (Frank, WebElephant)

- **Communiceer in het Nederlands.** Frank is technisch (eigenaar webbureau) — geen versimpeling.
- **Designkwaliteit is heilig.** Niets dat "templated" aanvoelt; opzettelijke, eigen keuzes.
  Gebruik de `artifact-design`-skill voor publieke pagina's/prototypes.
- **Hij vraagt om een eerlijke mening** ("wat vind je er zelf van?"). Geef een echte
  sparringpartner-analyse: voors én tegens, geen hype.

## Volgende stappen

1. MVP-codebase (Next.js + Supabase + Stripe-fundering), of
2. Klikbaar design-prototype (homepage + showcase-gallery + één programmatic stad×use-case pagina).

Het 90-dagen-vluchtplan staat in [plan/00-executive-summary.md](plan/00-executive-summary.md).
