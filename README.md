# Strategisch Dossier — NL-First Drone-Piloot Marktplaats

> Een marktplaats waar klanten een dronevlucht aanvragen en wij ze koppelen aan een
> **geverifieerde, gecertificeerde, verzekerde piloot**. Piloten betalen **per lead**
> plus **commissie per opdracht**. Software-marges, near-zero ops, Europa-klaar.
>
> *Gebaseerd op marktonderzoek met 30 onderzoeksagenten; cijfers tegengecheckt op
> primaire bronnen (RDW/Dronewatch, EASA, Mordor, Werkspot/Bark/Thumbtack).*
> *Stand: juni 2026 · v1.0*

---

## Inhoud

| # | Document | Wat erin staat |
|---|---|---|
| 00 | [Executive summary](plan/00-executive-summary.md) | De kans, de wig, top-5 risico's, GO/NO-GO, 90-dagenplan |
| 01 | [Marktonderzoek](plan/01-marktonderzoek.md) | Marktomvang, aanbod, concurrenten, regelgeving, prijzen, apparatuur, segmenten (met bronnen) |
| 02 | [Verdienmodel](plan/02-verdienmodel.md) | Pay-per-lead + commissie, unit economics, 3-jaars P&L, funding |
| 03 | [Pakketten](plan/03-pakketten.md) | Brons→Platinum klantpakketten + pilotenlidmaatschappen + leadprijzen |
| 04 | [Marketing-motor](plan/04-marketing.md) | Footage-flywheel, programmatic SEO, e-mailflows, paid, partnerships, jaar-1 budget |
| 05 | [Techniek](plan/05-techniek.md) | Next.js + Supabase + Stripe + Resend, datamodel, matching, verificatie, EU-schaal, bouwfasen |
| 06 | [Geo-strategie & 3-jarenplan](plan/06-geo-strategie-en-3jarenplan.md) | NL-first, EU-uitrol, jaar-voor-jaar, liquiditeit-playbook |

> **Taalnoot:** dit overzicht is in het Nederlands. De zeven diepte-documenten in [`plan/`](plan/)
> staan grotendeels in het Engels (de bron-analyses). Zeg het als je ze volledig naar het
> Nederlands vertaald wilt hebben.

---

## De weddenschap in één alinea

Nederland heeft **~50.566 actieve drone-operators** die werk zoeken en **geen serieuze
marktplaats** die ze vindt — de "concurrenten" zijn verklede bureautjes en een slapende
directory. De vraag is hoogfrequent aan de onderkant (elke Funda-listing, elke
hotelcampagne, elke dakinspectie) en hoogwaardig aan de top (bouw/infra-inspectie ≈
**31–32%** van de EU-dienstenmarkt). Dezelfde marktplaats wint dus op **volume én marge**.
De motor: **pay-per-lead** (de vloer, volledig geautomatiseerd via Stripe) + **10%
commissie** op geboekte klussen (de upside), met **lead-exclusiviteit (1–3 piloten per
aanvraag)** als retentiewapen tegen de Bark/Thumbtack-uitstroom die elke luie leadmarktplaats
sloopt. De economie is software-grade: **~96% contributiemarge**, **LTV/CAC 14–29×**, en een
gemodelleerd piek-cashgat in jaar 1 van slechts **~€3.400** — dit **bootstrapt**.

---

## Kernbeslissingen

### 1. Next.js, géén WordPress
Voor een two-sided marktplaats met matching, betaalde leads, dashboards en customizable
pilotenpagina's is WordPress (zeker multisite) het verkeerde gereedschap. Stack:
**Next.js (App Router) op Vercel + Supabase (Frankfurt, EU) + Stripe (iDEAL/Connect) +
Resend.** Near-zero ops; EU-klaar vanaf dag 1. Details: [05-techniek](plan/05-techniek.md).

### 2. Nederland eerst, niet meteen Europa
Marktplaats-liquiditeit is **lokaal**, niet nationale-vlaggen-verzamelen. Concentreer op de
**Randstad** → bewijs het model → dan **België-Vlaanderen + een Duits metro-cluster (NRW/Ruhr)**
in jaar 2 → **Nordics + Frankrijk** in jaar 3. Bouw **country-agnostisch** (EASA-core +
per-land-adapter) zodat uitbreiding config + lokalisatie is, geen herbouw. Details:
[06-geo-strategie](plan/06-geo-strategie-en-3jarenplan.md).

### 3. Verdienmodel: lead = vloer, commissie = upside
| Stroom | Mechaniek | Prijs | % omzet jr 3 |
|---|---|---|---|
| **Pay-per-lead** (kern) | Piloot betaalt om gematchte lead te unlocken · max 3 piloten | €12–80 | ~70% |
| Commissie | 10% op via-platform geboekte & betaalde klus (Stripe Connect) | 10% | ~15% |
| Abonnement piloot | Pro / Studio: leadkorting, hogere caps, badge | €39–129/mnd | ~15% |
| Klanten | Gratis aanvragen & matchen | €0 | 0% |

### 4. Footage-flywheel = het echte wapen
Piloten leveren via een opt-in licentie (default-on in de ToS, met credit als prikkel) de
creative voor je **SEO, social én e-mailmarketing**. Eén clip → showcase-gallery + organic
social + paid + nieuwsbrief tegelijk. CAC daalt elke maand. Details:
[04-marketing](plan/04-marketing.md).

---

## Pakketten — Brons → Platinum

Geprijsd op uitkomst, gepoort op piloot (gear + certificering + verzekering). Indicatief, ex 21% BTW.

| Tier | Prijs | Eén-regel | Gear |
|---|---|---|---|
| 🥉 **Brons** | €95–199 | "Op de markt" — volumewig | DJI Mini 5 Pro / Air 3S |
| 🥈 **Zilver** | €249–549 | "Val op" — marge-rijke marketing | DJI Mavic 4 Pro |
| 🥇 **Goud** | €495–2.500 | "Data & techniek" — B2B-motor | Matrice 4E/4T · Zenmuse L2/H30T |
| 💎 **Platinum** | €2.500–15.000+ | "Cinema / mission-grade" | Inspire 3 8K · Matrice 400 + LiDAR |

**Pilotenlidmaatschap:** Free €0 (15% commissie) · Pro €39 (10%) · Elite €129 (7%).
Exclusiviteit-cap per aanvraag: **3 / 3 / 2 / 1**. Volledige tabellen:
[03-pakketten](plan/03-pakketten.md).

---

## 3-jaars P&L (vereenvoudigd, EUR ex BTW, vóór ondernemersloon)

| | Jaar 1 | Jaar 2 | Jaar 3 |
|---|---:|---:|---:|
| Aanvragen / maand (gem.) | 136 | 650 | 1.700 |
| **Totale omzet** | **€100.400** | **€513.000** | **€1.319.000** |
| **EBITDA** | **~€69.000** | **~€402.000** | **~€1.074.000** |
| Nettomarge | 69% | 78% | 81% |

**Funding-advies: bootstrappen, niet ophalen.** Piek-cashgat ~€3,4k, ruim gedekt door een
buffer van €10–15k. Details: [02-verdienmodel](plan/02-verdienmodel.md).

**Startkapitaal ≈ €0.** De build is in-house (eigen bureau) → ~€0 cash, wel reële tijd. Infra
start op free tiers (~€0–50/mnd); Stripe = 0 vooraf. **Ad spend is de enige variabele cash-out**
en is discretionair: start op €0 (founder-led verkoop + concierge + SEO + footage-flywheel), en
zet het pas aan zodra een betaalde lead bewezen converteert. Een mini-testbudget (~€300–500) mag
eerder, puur als validatie. De ruil: €0 ad spend = trager naar liquiditeit (cash ingeruild voor tijd).

---

## Het 3-jarenplan in het kort

- **Jaar 1 — Liquiditeit in 2 metro's, 2 segmenten.** Randstad · vastgoed + marketing/FPV ·
  50 → 250–350 piloten · SEO-landgrab · KPI: fill-rate ≥85%.
- **Jaar 2 — Heel NL + 1e cross-border + margemotor.** Nationaal NL · bouw/infra-inspectie
  erbij · België-Vlaanderen + DE NRW/Ruhr · ~1.200 piloten.
- **Jaar 3 — Schaal de motor.** Nordics → Frankrijk · end-to-end geautomatiseerde ops ·
  ~3.500–5.000 piloten in 6+ landen.

---

## Go-to-market: aanbod via droneopleidingen (warm kanaal)

De goedkoopste, meest vertrouwde manier om de **aanbodkant** (piloten) te vullen is een
partnerschap met **droneopleidingen** — afgestudeerden hebben net hun bewijs gehaald en zoeken
betaald werk. Win-win: hun afgestudeerden krijgen gratis betaalde klussen via Skylens (betalen
alleen per lead), wat de opleiding een sterker verkoopargument + co-branding geeft.

- **Warme lead:** indirecte connectie via *Restaurant De Cockpit* op **Seppe (Breda
  International Airport, Noord-Brabant)** → benut die om een gesprek met de droneopleiding ter
  plaatse te openen (het restaurant is de deur, niet de deal).
- **Let op:** dit zaait aanbod in **Brabant**, niet de Randstad. Koppel er vraag in
  Eindhoven/Breda aan, óf maak Brabant bewust een **tweede liquiditeitspocket**. Niet onboarden
  in een vraag-vacuüm. Details: [plan/06](plan/06-geo-strategie-en-3jarenplan.md) (Part 4) en
  [plan/04](plan/04-marketing.md) (§5). Maak "opleiding-partnerschap" een herhaalbaar
  draaiboek per markt (NL-scholen → UK CAA-RAE's → Duitse Flugschulen).

---

## Eerlijke kanttekeningen

- **Leadprijzen (€6–80) zijn geëxtrapoleerd** uit Werkspot/Bark/Thumbtack — er bestaat nog
  geen publieke NL drone-leadprijs. **Valideren in de eerste 60–90 dagen.** Model blijft
  winstgevend tot ~12% conversie.
- **Marktcijfers (€10,9 mrd EU)** zijn vendor-schattingen inclusief logistiek — gebruik voor
  richting, niet voor bottom-up omzet. Maatvoer de kans bottom-up: ~50k actieve operators ×
  realistische kluswaarde.
- Het hele plan staat of valt bij **fill-rate** en het **kip-ei probleem** — daar is het
  90-dagenplan keihard op gericht.

## Eindoordeel

**GO — voorwaardelijk, en de voorwaarden zijn binnen 90 dagen toetsbaar.**
NO-GO-trigger: als na 90 dagen de fill-rate onder ~50% blijft in een geconcentreerde metro,
of piloten weigeren te betalen voor exclusieve leads — stop en hersnijd het model vóór je
verder uitgeeft. Volledige redenering + 90-dagenplan: [00-executive-summary](plan/00-executive-summary.md).

---

## Volgende stap

1. **MVP-codebase opzetten** in deze map (Next.js + Supabase + Stripe-fundering), of
2. **Klikbaar design-prototype** van de echte website (homepage + showcase-gallery +
   een programmatic stad×use-case pagina).

*(Het oorspronkelijke vormgegeven dossier als webpagina:
https://claude.ai/code/artifact/5272d706-28a2-4893-a878-937cd38ccaaa)*
