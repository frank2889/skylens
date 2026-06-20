import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Euro,
  Clock,
  FileText,
  ArrowRight,
  ClipboardList,
  Users,
  PlaneTakeoff,
} from "lucide-react";
import { HeroSearch } from "@/components/hero-search";
import { SegmentCard, ShowcaseCard } from "@/components/cards";
import { SectionHeading, Stat, TextLink, Stars } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { MediaPlaceholder } from "@/components/media";
import { SEGMENTS, PACKAGES } from "@/lib/catalog";
import { SHOWCASE, PILOTS, STATS } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { packageText, ui } from "@/lib/i18n/catalog-i18n";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Skylens · De juiste dronepiloot. Vandaag geregeld.",
      description:
        "Plaats je gratis aanvraag en wij koppelen je aan een geverifieerde, verzekerde, EASA-gecertificeerde dronepiloot bij jou in de buurt. Vaste prijzen, beelden binnen 48–72 uur.",
    },
    en: {
      title: "Skylens · The right drone pilot. Sorted today.",
      description:
        "Post your free request and we'll match you with a verified, insured, EASA-certified drone pilot near you. Fixed prices, footage within 48–72 hours.",
    },
    de: {
      title: "Skylens · Der richtige Drohnenpilot. Heute geregelt.",
      description:
        "Stellen Sie Ihre kostenlose Anfrage und wir vermitteln Ihnen einen geprüften, versicherten, EASA-zertifizierten Drohnenpiloten in Ihrer Nähe. Feste Preise, Aufnahmen in 48–72 Stunden.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl`,
        "en-GB": `${SITE.url}/en`,
        de: `${SITE.url}/de`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const u = ui(locale);
  const featuredPilots = PILOTS.filter((p) => p.verified).slice(0, 3);

  const T = pick(locale, {
    nl: {
      eyebrowHero: "Drone-piloot marktplaats · NL",
      heroTitle1: "De juiste dronepiloot. ",
      heroTitle2: "Vandaag geregeld.",
      heroLead:
        "Plaats je aanvraag en wij koppelen je aan een geverifieerde, verzekerde, EASA-gecertificeerde piloot bij jou in de buurt. Vaste prijzen, beelden binnen 48–72 uur.",
      mediaRealEstate: "Vastgoed · Amsterdam",
      mediaMarketing: "Marketing · Reel",
      mediaInspection: "Inspectie · thermisch",
      badgeTitle: "Geverifieerd aanbod",
      badgeSub: "RDW · A2/STS · €1M verzekerd",
      statPilots: "Actieve piloten in NL",
      statCities: "Steden gedekt",
      statDelivery: "Gem. levertijd",
      statRating: "Gem. beoordeling",
      hiwEyebrow: "Hoe het werkt",
      hiwTitle: "Van aanvraag tot luchtbeeld in drie stappen",
      hiwIntro:
        "Geen gedoe met offertes najagen of onbekende freelancers. Eén aanvraag, geverifieerde matches, vaste prijzen.",
      steps: [
        {
          title: "1 · Plaats je aanvraag",
          text: "Vertel in 60 seconden wat je nodig hebt, waar en wanneer. Gratis en vrijblijvend — geen account nodig.",
        },
        {
          title: "2 · Ontvang je matches",
          text: "Wij koppelen je automatisch aan geverifieerde, verzekerde piloten bij jou in de buurt met de juiste apparatuur.",
        },
        {
          title: "3 · Kies & vlieg",
          text: "Vergelijk profielen, prijzen en reviews. Kies je piloot — beelden geleverd binnen 48–72 uur.",
        },
      ],
      segEyebrow: "Toepassingen",
      segTitle: "Voor elke klus de juiste piloot & drone",
      segIntro: "Van een snelle makelaarsfoto tot een centimeter-nauwkeurige LiDAR-scan.",
      segAll: "Alle toepassingen",
      whyEyebrow: "Waarom Skylens",
      whyTitle: "Het verschil zit in vertrouwen",
      whyIntro:
        "Je kunt zelf niet zien of een piloot legaal vliegt, verzekerd is en het juiste certificaat heeft. Wij checken het — zodat jij dat niet hoeft.",
      trust: [
        { title: "Geverifieerd & verzekerd", text: "Elke piloot is gecheckt op RDW-registratie, EASA-certificaat (A1/A3, A2, STS) en €1M aansprakelijkheidsverzekering." },
        { title: "Vaste, transparante prijzen", text: "Geen vage offertes of bureaumarges. Je ziet vooraf wat je betaalt, per pakket." },
        { title: "Snel geleverd", text: "Match binnen enkele uren, beelden doorgaans binnen 48–72 uur. Geen reiskosten — altijd de dichtstbijzijnde piloot." },
        { title: "Eén aanspreekpunt", text: "Van aanvraag tot oplevering: standaard deliverables per toepassing zodat je appels met appels vergelijkt." },
      ],
      showcaseEyebrow: "Showcase",
      showcaseTitle: "Echt werk van geverifieerde piloten",
      showcaseIntro:
        "Elke opdracht voegt nieuwe beelden toe aan onze showcase — van grachtenpanden tot zonneparken.",
      showcaseCta: "Bekijk de showcase",
      pkgEyebrow: "Pakketten",
      pkgTitle: "Van Brons tot Platinum",
      pkgIntro:
        "Geprijsd op uitkomst. Wij routeren je klus alleen naar piloten met de juiste apparatuur, certificering en verzekering.",
      pkgFrom: "vanaf",
      pkgCompare: "Vergelijk alle pakketten",
      pilotsEyebrow: "Voor piloten",
      pilotsTitle: "Krijg betaalde drone-klussen in jouw regio",
      pilotsText:
        "Gratis aanmelden, betaal alleen voor leads die je accepteert. Bouw je profiel, verzamel reviews en laat ons je werk uitlichten.",
      pilotsCta: "Word piloot",
      pilotsLeads: "Hoe leads werken",
      pilotsStat1: "Aanmelden",
      pilotsStat2: "Meer leads als verified",
      pilotsStat3: "Reactietijd toppers",
      testEyebrow: "Reviews",
      testTitle: "Wat klanten zeggen",
    },
    en: {
      eyebrowHero: "Drone pilot marketplace · UK",
      heroTitle1: "The right drone pilot. ",
      heroTitle2: "Sorted today.",
      heroLead:
        "Post your request and we'll match you with a verified, insured, EASA-certified pilot near you. Fixed prices, footage within 48–72 hours.",
      mediaRealEstate: "Real estate · Amsterdam",
      mediaMarketing: "Marketing · Reel",
      mediaInspection: "Inspection · thermal",
      badgeTitle: "Verified pilots",
      badgeSub: "CAA · A2/GVC · £1M insured",
      statPilots: "Active pilots in the UK",
      statCities: "Cities covered",
      statDelivery: "Avg. delivery time",
      statRating: "Avg. rating",
      hiwEyebrow: "How it works",
      hiwTitle: "From request to aerial footage in three steps",
      hiwIntro:
        "No chasing quotes or vetting unknown freelancers. One request, verified matches, fixed prices.",
      steps: [
        {
          title: "1 · Post your request",
          text: "Tell us what you need, where and when, in 60 seconds. Free and no obligation — no account required.",
        },
        {
          title: "2 · Get your matches",
          text: "We automatically match you with verified, insured pilots near you who have the right kit.",
        },
        {
          title: "3 · Choose & fly",
          text: "Compare profiles, prices and reviews. Pick your pilot — footage delivered within 48–72 hours.",
        },
      ],
      segEyebrow: "Services",
      segTitle: "The right pilot & drone for every job",
      segIntro: "From a quick estate-agent photo to a centimetre-accurate LiDAR scan.",
      segAll: "All services",
      whyEyebrow: "Why Skylens",
      whyTitle: "The difference is trust",
      whyIntro:
        "You can't tell on your own whether a pilot flies legally, is insured and holds the right certificate. We check it — so you don't have to.",
      trust: [
        { title: "Verified & insured", text: "Every pilot is checked for CAA registration, EASA/CAA certification (A1/A3, A2, GVC) and £1M public liability cover." },
        { title: "Fixed, transparent prices", text: "No vague quotes or agency markups. You see what you'll pay up front, per package." },
        { title: "Delivered fast", text: "Matched within hours, footage usually within 48–72 hours. No travel costs — always the nearest pilot." },
        { title: "One point of contact", text: "From request to delivery: standard deliverables per use case so you compare like for like." },
      ],
      showcaseEyebrow: "Showcase",
      showcaseTitle: "Real work from verified pilots",
      showcaseIntro:
        "Every job adds new footage to our showcase — from period buildings to solar farms.",
      showcaseCta: "View the showcase",
      pkgEyebrow: "Packages",
      pkgTitle: "From Bronze to Platinum",
      pkgIntro:
        "Priced on outcome. We route your job only to pilots with the right kit, certification and insurance.",
      pkgFrom: "from",
      pkgCompare: "Compare all packages",
      pilotsEyebrow: "For pilots",
      pilotsTitle: "Get paid drone jobs in your area",
      pilotsText:
        "Sign up for free, pay only for the leads you accept. Build your profile, collect reviews and let us feature your work.",
      pilotsCta: "Become a pilot",
      pilotsLeads: "How leads work",
      pilotsStat1: "To sign up",
      pilotsStat2: "More leads when verified",
      pilotsStat3: "Top pilots' response time",
      testEyebrow: "Reviews",
      testTitle: "What clients say",
    },
    de: {
      eyebrowHero: "Drohnenpiloten-Marktplatz · DE",
      heroTitle1: "Der richtige Drohnenpilot. ",
      heroTitle2: "Heute geregelt.",
      heroLead:
        "Stellen Sie Ihre Anfrage und wir vermitteln Ihnen einen geprüften, versicherten, EASA-zertifizierten Piloten in Ihrer Nähe. Feste Preise, Aufnahmen in 48–72 Stunden.",
      mediaRealEstate: "Immobilien · Amsterdam",
      mediaMarketing: "Marketing · Reel",
      mediaInspection: "Inspektion · thermisch",
      badgeTitle: "Geprüfte Piloten",
      badgeSub: "LBA · A2/STS · 1 Mio. € versichert",
      statPilots: "Aktive Piloten in DE",
      statCities: "Abgedeckte Städte",
      statDelivery: "Ø Lieferzeit",
      statRating: "Ø Bewertung",
      hiwEyebrow: "So funktioniert's",
      hiwTitle: "Von der Anfrage zur Luftaufnahme in drei Schritten",
      hiwIntro:
        "Kein Jagen nach Angeboten oder Prüfen unbekannter Freelancer. Eine Anfrage, geprüfte Matches, feste Preise.",
      steps: [
        {
          title: "1 · Anfrage stellen",
          text: "Sagen Sie uns in 60 Sekunden, was Sie brauchen, wo und wann. Kostenlos und unverbindlich — kein Konto nötig.",
        },
        {
          title: "2 · Matches erhalten",
          text: "Wir vermitteln Sie automatisch an geprüfte, versicherte Piloten in Ihrer Nähe mit der passenden Ausrüstung.",
        },
        {
          title: "3 · Auswählen & fliegen",
          text: "Vergleichen Sie Profile, Preise und Bewertungen. Wählen Sie Ihren Piloten — Aufnahmen in 48–72 Stunden.",
        },
      ],
      segEyebrow: "Anwendungen",
      segTitle: "Für jeden Auftrag der richtige Pilot & die richtige Drohne",
      segIntro: "Vom schnellen Maklerfoto bis zum zentimetergenauen LiDAR-Scan.",
      segAll: "Alle Anwendungen",
      whyEyebrow: "Warum Skylens",
      whyTitle: "Der Unterschied liegt im Vertrauen",
      whyIntro:
        "Sie können selbst nicht erkennen, ob ein Pilot legal fliegt, versichert ist und das richtige Zertifikat hat. Wir prüfen es — damit Sie es nicht müssen.",
      trust: [
        { title: "Geprüft & versichert", text: "Jeder Pilot wird auf LBA-Registrierung, EASA-Zertifizierung (A1/A3, A2, STS) und 1 Mio. € Haftpflichtversicherung geprüft." },
        { title: "Feste, transparente Preise", text: "Keine vagen Angebote oder Agenturaufschläge. Sie sehen vorab pro Paket, was Sie zahlen." },
        { title: "Schnell geliefert", text: "Match innerhalb weniger Stunden, Aufnahmen meist in 48–72 Stunden. Keine Anfahrtskosten — immer der nächstgelegene Pilot." },
        { title: "Ein Ansprechpartner", text: "Von der Anfrage bis zur Lieferung: standardisierte Leistungen je Anwendung, damit Sie Äpfel mit Äpfeln vergleichen." },
      ],
      showcaseEyebrow: "Showcase",
      showcaseTitle: "Echte Arbeiten von geprüften Piloten",
      showcaseIntro:
        "Jeder Auftrag ergänzt unseren Showcase um neue Aufnahmen — von Altbauten bis zu Solarparks.",
      showcaseCta: "Showcase ansehen",
      pkgEyebrow: "Pakete",
      pkgTitle: "Von Bronze bis Platin",
      pkgIntro:
        "Preise nach Ergebnis. Wir leiten Ihren Auftrag nur an Piloten mit der richtigen Ausrüstung, Zertifizierung und Versicherung.",
      pkgFrom: "ab",
      pkgCompare: "Alle Pakete vergleichen",
      pilotsEyebrow: "Für Piloten",
      pilotsTitle: "Erhalten Sie bezahlte Drohnenaufträge in Ihrer Region",
      pilotsText:
        "Kostenlos anmelden, nur für angenommene Leads zahlen. Bauen Sie Ihr Profil auf, sammeln Sie Bewertungen und lassen Sie uns Ihre Arbeit präsentieren.",
      pilotsCta: "Pilot werden",
      pilotsLeads: "Wie Leads funktionieren",
      pilotsStat1: "Anmeldung",
      pilotsStat2: "Mehr Leads als verifiziert",
      pilotsStat3: "Reaktionszeit Top-Piloten",
      testEyebrow: "Bewertungen",
      testTitle: "Was Kunden sagen",
    },
  });

  const stepIcons = [ClipboardList, Users, PlaneTakeoff];
  const trustIcons = [ShieldCheck, Euro, Clock, FileText];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{T.eyebrowHero}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              {T.heroTitle1}
              <span className="text-brand-600">{T.heroTitle2}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              {T.heroLead}
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="hero-a" aspect="tall" label={T.mediaRealEstate} className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="hero-b" aspect="square" isVideo label={T.mediaMarketing} className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="hero-c" aspect="video" label={T.mediaInspection} className="rounded-2xl shadow-card" />
              </div>
            </div>
            <div className="card absolute -bottom-5 left-6 flex items-center gap-3 px-4 py-3 shadow-lift">
              <ShieldCheck className="h-5 w-5 text-brand-600" />
              <div className="text-sm">
                <div className="font-semibold leading-tight">{T.badgeTitle}</div>
                <div className="font-mono text-xs text-ink-muted">{T.badgeSub}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className="border-y border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value={formatNumber(STATS.activePilots, locale)} label={T.statPilots} />
          <Stat value={`${STATS.citiesCovered}+`} label={T.statCities} />
          <Stat value="48–72u" label={T.statDelivery} />
          <div className="flex flex-col">
            <Stars rating={STATS.avgRating} className="text-3xl" />
            <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{T.statRating}</div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.hiwEyebrow}
          title={T.hiwTitle}
          intro={T.hiwIntro}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {T.steps.map((s, i) => {
            const Icon = stepIcons[i];
            return (
              <div key={s.title} className="relative">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                  <Icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{s.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Segments ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={T.segEyebrow}
              title={T.segTitle}
              intro={T.segIntro}
            />
            <TextLink href="/toepassingen">{T.segAll}</TextLink>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SEGMENTS.map((s) => (
              <SegmentCard key={s.slug} segment={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why us / trust moat ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <SectionHeading
            eyebrow={T.whyEyebrow}
            title={T.whyTitle}
            intro={T.whyIntro}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {T.trust.map((t, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={t.title} className="card card-pad">
                  <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.7} />
                  <h3 className="mt-4 font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Showcase teaser ── */}
      <section className="border-t border-line bg-ink py-16 text-white sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="eyebrow text-brand-300">{T.showcaseEyebrow}</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {T.showcaseTitle}
              </h2>
              <p className="mt-4 text-lg text-white/70 pretty">
                {T.showcaseIntro}
              </p>
            </div>
            <Link href={localized(locale, "/showcase")} className="btn btn-md bg-white/10 text-white hover:bg-white/20">
              {T.showcaseCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {SHOWCASE.slice(0, 8).map((item) => (
              <ShowcaseCard key={item.id} item={item} className="border-white/10 bg-white/5" />
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages teaser ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.pkgEyebrow}
          title={T.pkgTitle}
          intro={T.pkgIntro}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PACKAGES.map((p) => {
            const pt = packageText(p.tier, locale);
            return (
              <div key={p.tier} className="card card-pad flex flex-col">
                <h3 className="font-display text-xl font-bold">{pt.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{pt.oneLiner}</p>
                <p className="mt-4 font-mono text-lg font-semibold text-brand-700">
                  {T.pkgFrom} {formatCurrency(p.priceFrom, locale)}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{u.exVat}</p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink-muted">{pt.useCase}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <Link href={localized(locale, "/pakketten")} className="btn btn-lg btn-outline">
            {T.pkgCompare}
          </Link>
        </div>
      </section>

      {/* ── For pilots band ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="card relative overflow-hidden">
          <div className="grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">{T.pilotsEyebrow}</span>
              <h2 className="mt-4 text-3xl font-bold">{T.pilotsTitle}</h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                {T.pilotsText}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href={localized(locale, "/voor-piloten")} className="btn btn-lg btn-dark">
                  {T.pilotsCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href={localized(locale, "/voor-piloten#leads")} className="btn btn-lg btn-ghost">
                  {T.pilotsLeads}
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Stat value={formatCurrency(0, locale)} label={T.pilotsStat1} />
              <Stat value="3.5×" label={T.pilotsStat2} />
              <Stat value="< 1u" label={T.pilotsStat3} />
            </div>
          </div>
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading center eyebrow={T.testEyebrow} title={T.testTitle} />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {featuredPilots.map((p) => {
              const r = p.reviews[0];
              return (
                <figure key={p.slug} className="card card-pad flex flex-col">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-4 flex-1 text-ink-soft pretty">“{r.text}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                    <MediaPlaceholder seed={p.slug + "av"} aspect="square" className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="text-sm">
                      <div className="font-semibold">{r.author}</div>
                      <div className="text-ink-muted">{r.role} · {r.city}</div>
                    </div>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
