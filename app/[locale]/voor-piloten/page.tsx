import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  UserPlus,
  BadgeCheck,
  Inbox,
  CreditCard,
  Lock,
  ShieldCheck,
  FileBadge,
  Wallet,
  Check,
} from "lucide-react";
import { SectionHeading, Eyebrow, Stat, TierBadge } from "@/components/bits";
import { MediaPlaceholder } from "@/components/media";
import { MEMBERSHIPS, LEAD_TIERS } from "@/lib/catalog";
import { STATS } from "@/lib/seed";
import { localized, pick } from "@/lib/i18n/messages";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { getLocaleConfig } from "@/lib/i18n/config";
import { getJurisdiction } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";
import type { MembershipKey, Tier } from "@/lib/types";

const MEMBERSHIP_ICON: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  free: UserPlus,
  pro: BadgeCheck,
  elite: ShieldCheck,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Voor piloten · Krijg betaalde drone-klussen | Skylens",
      description:
        "Krijg betaalde drone-opdrachten in jouw regio. Gratis aanmelden, betaal alleen per lead die je accepteert. Geverifieerd profiel, gematchte leads en heldere lidmaatschappen voor dronepiloten.",
    },
    en: {
      title: "For pilots · Get paid drone jobs | Skylens",
      description:
        "Get paid drone work in your area. Sign up free, pay only per lead you accept. Verified profile, matched leads and clear memberships for drone pilots.",
    },
    de: {
      title: "Für Piloten · Bezahlte Drohnenaufträge erhalten | Skylens",
      description:
        "Erhalten Sie bezahlte Drohnenaufträge in Ihrer Region. Kostenlos registrieren, nur pro angenommenem Lead zahlen. Geprüftes Profil, gematchte Leads und klare Mitgliedschaften für Drohnenpiloten.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/voor-piloten`,
        "en-GB": `${SITE.url}/en/voor-piloten`,
        de: `${SITE.url}/de/voor-piloten`,
      },
    },
  };
}

export default async function VoorPilotenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  const jur = getJurisdiction(cfg.country);
  const insured = formatCurrency(jur.insurance.minMajor, locale);
  // Authority + credential labels for the active market.
  const authShort = jur.authority.short;
  const operatorLabel = jur.operatorId.label;
  const advancedCred = jur.capabilities.find((c) => c.level === "advanced")?.name ?? "A2";
  const specificCred = jur.capabilities.find((c) => c.level === "specific")?.name ?? "STS";

  const T = pick(locale, {
    nl: {
      heroEyebrow: "Voor piloten",
      heroTitleA: "Krijg betaalde drone-klussen ",
      heroTitleHi: "in jouw regio",
      heroIntro:
        "Gratis aanmelden, betaal per lead. Geen abonnement nodig om te starten, geen koude acquisitie. Wij brengen geverifieerde opdrachten naar jou — jij kiest wat je oppakt.",
      heroSignup: "Meld je gratis aan",
      heroHowLeads: "Hoe leads werken",
      statSignup: "Aanmelden",
      statMoreLeads: "Meer leads als verified",
      statCities: "Steden met vraag",
      proofPilots: `Piloten in ${cfg.country === "GB" ? "het VK" : cfg.country === "DE" ? "Duitsland" : "NL"}`,
      proofCities: "Steden gedekt",
      proofResponse: "Reactietijd toppers",
      proofTiers: "Lidmaatschappen",
      tiersValue: "3 tiers",
      responseValue: "< 1u",
      moreLeadsValue: "3,5×",
      leadsEyebrow: "Hoe leads werken",
      leadsTitle: "Van aanmelding tot betaalde opdracht",
      leadsIntro:
        "Een eerlijk model zonder verrassingen: gratis starten, alleen betalen voor leads die je zelf accepteert en altijd exclusiviteit naar jobwaarde.",
      memEyebrow: "Lidmaatschap",
      memTitle: "Kies wat bij je past — start gratis",
      memIntro:
        "Begin kosteloos op Free en stap over zodra je meer leads wilt. Elk niveau verlaagt je leadprijs en commissie en geeft je meer zichtbaarheid.",
      mostChosen: "Meest gekozen",
      leadPrice: "Leadprijs",
      commission: "Commissie",
      memStartFree: "Gratis starten",
      choose: "Kies",
      memFootnote: "Alle prijzen exclusief BTW · maandelijks opzegbaar",
      leadEyebrow: "Leadprijzen",
      leadTitle: "Wat kost een lead?",
      leadIntro:
        "Je betaalt alleen voor leads die je accepteert. De leadprijs is afgestemd op de jobwaarde — hoe groter de klus, hoe exclusiever de lead.",
      thJobTier: "Job-tier",
      thJobValue: "Jobwaarde",
      thLeadPrice: "Leadprijs",
      thExclusivity: "Exclusiviteit",
      leadFootnote: "Leadprijzen exclusief BTW · Elite-leden krijgen 25% korting op elke lead",
      verifyEyebrow: "Verificatie",
      verifyTitle: "Geverifieerd zijn loont",
      verifyIntro:
        "Klanten kiezen voor zekerheid. Een geverifieerd profiel met de juiste papieren staat hoger in de matches en levert aantoonbaar meer en betere leads op. De drempel is laag, het rendement hoog.",
      verifyStart: "Start je verificatie",
      ctaEyebrow: "Klaar om te vliegen?",
      ctaTitle: "Meld je gratis aan en ontvang je eerste leads",
      ctaIntro:
        "Geen kosten om te starten. Bouw je profiel, laat je verifiëren en kies zelf welke opdrachten je oppakt.",
      ctaSignup: "Meld je gratis aan",
      ctaMemberships: "Bekijk de lidmaatschappen",
      newLead: "Nieuwe lead",
      newLeadMeta: "Vastgoed · 6 km · Zilver",
      mediaA: "Inspectie · Rotterdam",
      mediaB: "Marketing · reel",
      mediaC: "Vastgoed · Utrecht",
    },
    en: {
      heroEyebrow: "For pilots",
      heroTitleA: "Get paid drone jobs ",
      heroTitleHi: "in your area",
      heroIntro:
        "Sign up free, pay per lead. No subscription needed to start, no cold outreach. We bring verified jobs to you — you choose what to take on.",
      heroSignup: "Sign up free",
      heroHowLeads: "How leads work",
      statSignup: "Sign-up",
      statMoreLeads: "More leads when verified",
      statCities: "Cities with demand",
      proofPilots: "Pilots in the UK",
      proofCities: "Cities covered",
      proofResponse: "Top responder time",
      proofTiers: "Memberships",
      tiersValue: "3 tiers",
      responseValue: "< 1h",
      moreLeadsValue: "3.5×",
      leadsEyebrow: "How leads work",
      leadsTitle: "From sign-up to paid job",
      leadsIntro:
        "An honest model with no surprises: start free, pay only for leads you accept yourself, and always exclusivity by job value.",
      memEyebrow: "Membership",
      memTitle: "Pick what fits — start free",
      memIntro:
        "Start at no cost on Free and move up once you want more leads. Each level lowers your lead price and commission and gives you more visibility.",
      mostChosen: "Most popular",
      leadPrice: "Lead price",
      commission: "Commission",
      memStartFree: "Start free",
      choose: "Choose",
      memFootnote: "All prices exclude VAT · cancel monthly",
      leadEyebrow: "Lead pricing",
      leadTitle: "What does a lead cost?",
      leadIntro:
        "You only pay for leads you accept. The lead price is set by the job value — the bigger the job, the more exclusive the lead.",
      thJobTier: "Job tier",
      thJobValue: "Job value",
      thLeadPrice: "Lead price",
      thExclusivity: "Exclusivity",
      leadFootnote: "Lead prices exclude VAT · Elite members get 25% off every lead",
      verifyEyebrow: "Verification",
      verifyTitle: "Being verified pays off",
      verifyIntro:
        "Clients choose certainty. A verified profile with the right paperwork ranks higher in matches and demonstrably brings more and better leads. Low barrier, high return.",
      verifyStart: "Start your verification",
      ctaEyebrow: "Ready to fly?",
      ctaTitle: "Sign up free and receive your first leads",
      ctaIntro:
        "No cost to start. Build your profile, get verified and choose which jobs you take on.",
      ctaSignup: "Sign up free",
      ctaMemberships: "View the memberships",
      newLead: "New lead",
      newLeadMeta: "Real estate · 6 km · Silver",
      mediaA: "Inspection · London",
      mediaB: "Marketing · reel",
      mediaC: "Real estate · Manchester",
    },
    de: {
      heroEyebrow: "Für Piloten",
      heroTitleA: "Bezahlte Drohnenaufträge ",
      heroTitleHi: "in Ihrer Region",
      heroIntro:
        "Kostenlos registrieren, pro Lead zahlen. Kein Abo zum Start nötig, keine Kaltakquise. Wir bringen geprüfte Aufträge zu Ihnen — Sie wählen, was Sie übernehmen.",
      heroSignup: "Kostenlos registrieren",
      heroHowLeads: "So funktionieren Leads",
      statSignup: "Registrierung",
      statMoreLeads: "Mehr Leads als verifiziert",
      statCities: "Städte mit Nachfrage",
      proofPilots: "Piloten in Deutschland",
      proofCities: "Abgedeckte Städte",
      proofResponse: "Reaktionszeit Top-Piloten",
      proofTiers: "Mitgliedschaften",
      tiersValue: "3 Stufen",
      responseValue: "< 1 Std.",
      moreLeadsValue: "3,5×",
      leadsEyebrow: "So funktionieren Leads",
      leadsTitle: "Von der Registrierung zum bezahlten Auftrag",
      leadsIntro:
        "Ein faires Modell ohne Überraschungen: kostenlos starten, nur für selbst angenommene Leads zahlen und immer Exklusivität nach Auftragswert.",
      memEyebrow: "Mitgliedschaft",
      memTitle: "Wählen Sie, was passt — kostenlos starten",
      memIntro:
        "Starten Sie kostenlos auf Free und steigen Sie auf, sobald Sie mehr Leads wollen. Jede Stufe senkt Lead-Preis und Provision und erhöht Ihre Sichtbarkeit.",
      mostChosen: "Am häufigsten gewählt",
      leadPrice: "Lead-Preis",
      commission: "Provision",
      memStartFree: "Kostenlos starten",
      choose: "Wählen",
      memFootnote: "Alle Preise zzgl. MwSt. · monatlich kündbar",
      leadEyebrow: "Lead-Preise",
      leadTitle: "Was kostet ein Lead?",
      leadIntro:
        "Sie zahlen nur für Leads, die Sie annehmen. Der Lead-Preis richtet sich nach dem Auftragswert — je größer der Auftrag, desto exklusiver der Lead.",
      thJobTier: "Job-Tier",
      thJobValue: "Auftragswert",
      thLeadPrice: "Lead-Preis",
      thExclusivity: "Exklusivität",
      leadFootnote: "Lead-Preise zzgl. MwSt. · Elite-Mitglieder erhalten 25% Rabatt auf jeden Lead",
      verifyEyebrow: "Verifizierung",
      verifyTitle: "Verifiziert zu sein lohnt sich",
      verifyIntro:
        "Kunden setzen auf Sicherheit. Ein geprüftes Profil mit den richtigen Unterlagen rankt höher in den Matches und bringt nachweislich mehr und bessere Leads. Niedrige Hürde, hoher Ertrag.",
      verifyStart: "Verifizierung starten",
      ctaEyebrow: "Bereit zum Fliegen?",
      ctaTitle: "Kostenlos registrieren und erste Leads erhalten",
      ctaIntro:
        "Kostenfreier Start. Bauen Sie Ihr Profil auf, lassen Sie sich verifizieren und wählen Sie selbst, welche Aufträge Sie übernehmen.",
      ctaSignup: "Kostenlos registrieren",
      ctaMemberships: "Mitgliedschaften ansehen",
      newLead: "Neuer Lead",
      newLeadMeta: "Immobilien · 6 km · Silber",
      mediaA: "Inspektion · Köln",
      mediaB: "Marketing · Reel",
      mediaC: "Immobilien · München",
    },
  });

  const LEAD_FLOW = pick(locale, {
    nl: [
      { icon: UserPlus, title: "Meld je gratis aan", text: "Maak in een paar minuten een account aan. Geen abonnement, geen verplichtingen — je begint kosteloos en bepaalt zelf wanneer je opschaalt." },
      { icon: BadgeCheck, title: "Profiel + verificatie", text: `Vul je profiel, portfolio en werkgebied in. Wij verifiëren je ${authShort}-registratie, je certificaat (${advancedCred} of ${specificCred}) en je verzekering van minimaal ${insured}. Geverifieerde piloten ontvangen aantoonbaar meer en betere leads.` },
      { icon: Inbox, title: "Ontvang gematchte leads", text: "Zodra een klant een aanvraag plaatst die binnen jouw werkgebied, apparatuur en certificering valt, ontvang je een lead met alle details. Geen koud bellen, geen offertes najagen." },
      { icon: CreditCard, title: "Betaal alleen wat je accepteert", text: "Een lead bekijken is gratis. Pas wanneer je een lead accepteert, betaal je de leadprijs. Past de klus je niet, dan sla je hem zonder kosten over." },
      { icon: Lock, title: "Exclusiviteit per lead", text: "Wij verkopen een lead nooit eindeloos door. Afhankelijk van de jobwaarde gaat elke lead naar maximaal 1 tot 3 piloten — bij Platinum-klussen ben jij de enige die hem krijgt." },
    ],
    en: [
      { icon: UserPlus, title: "Sign up free", text: "Create an account in a few minutes. No subscription, no commitments — you start at no cost and decide when to scale up." },
      { icon: BadgeCheck, title: "Profile + verification", text: `Fill in your profile, portfolio and service area. We verify your ${authShort} registration, your certificate (${advancedCred} or ${specificCred}) and your insurance of at least ${insured}. Verified pilots demonstrably receive more and better leads.` },
      { icon: Inbox, title: "Receive matched leads", text: "As soon as a client posts a request that fits your service area, equipment and certification, you receive a lead with all the details. No cold calling, no chasing quotes." },
      { icon: CreditCard, title: "Pay only for what you accept", text: "Viewing a lead is free. Only when you accept a lead do you pay the lead price. If the job isn't for you, skip it at no cost." },
      { icon: Lock, title: "Exclusivity per lead", text: "We never resell a lead endlessly. Depending on job value, each lead goes to at most 1 to 3 pilots — on Platinum jobs you're the only one who gets it." },
    ],
    de: [
      { icon: UserPlus, title: "Kostenlos registrieren", text: "Erstellen Sie in wenigen Minuten ein Konto. Kein Abo, keine Verpflichtungen — Sie starten kostenfrei und entscheiden selbst, wann Sie aufstocken." },
      { icon: BadgeCheck, title: "Profil + Verifizierung", text: `Füllen Sie Profil, Portfolio und Einsatzgebiet aus. Wir verifizieren Ihre ${authShort}-Registrierung, Ihr Zertifikat (${advancedCred} oder ${specificCred}) und Ihre Versicherung von mindestens ${insured}. Verifizierte Piloten erhalten nachweislich mehr und bessere Leads.` },
      { icon: Inbox, title: "Gematchte Leads erhalten", text: "Sobald ein Kunde eine Anfrage stellt, die zu Ihrem Einsatzgebiet, Ihrer Ausrüstung und Zertifizierung passt, erhalten Sie einen Lead mit allen Details. Keine Kaltakquise, kein Hinterherjagen von Angeboten." },
      { icon: CreditCard, title: "Nur zahlen, was Sie annehmen", text: "Einen Lead anzusehen ist kostenlos. Erst wenn Sie einen Lead annehmen, zahlen Sie den Lead-Preis. Passt der Auftrag nicht, überspringen Sie ihn kostenfrei." },
      { icon: Lock, title: "Exklusivität pro Lead", text: "Wir verkaufen einen Lead nie endlos weiter. Je nach Auftragswert geht jeder Lead an höchstens 1 bis 3 Piloten — bei Platin-Aufträgen erhalten nur Sie ihn." },
    ],
  });

  const VERIFY = pick(locale, {
    nl: [
      { icon: ShieldCheck, title: `${authShort}-registratie`, text: `We controleren je ${operatorLabel.toLowerCase()} en registratie bij de ${authShort}. Klanten zien een geverifieerde badge, jij vliegt aantoonbaar legaal.` },
      { icon: FileBadge, title: `Certificering ${advancedCred} / ${specificCred}`, text: "Je EASA-certificaat bepaalt welke leads je ontvangt. Hoe hoger je bevoegdheid, hoe meer en hoe waardevollere klussen je matcht." },
      { icon: Wallet, title: `${insured} verzekering`, text: `Een geldige aansprakelijkheidsverzekering van minimaal ${insured} is verplicht om leads te ontvangen. Zo bouwen we vertrouwen bij de klant — en bescherm jij jezelf.` },
    ],
    en: [
      { icon: ShieldCheck, title: `${authShort} registration`, text: `We check your ${operatorLabel.toLowerCase()} and registration with the ${authShort}. Clients see a verified badge, you fly demonstrably legally.` },
      { icon: FileBadge, title: `${advancedCred} / ${specificCred} certification`, text: "Your certificate determines which leads you receive. The higher your qualification, the more and the more valuable the jobs you match." },
      { icon: Wallet, title: `${insured} insurance`, text: `Valid liability insurance of at least ${insured} is required to receive leads. This builds client trust — and protects you.` },
    ],
    de: [
      { icon: ShieldCheck, title: `${authShort}-Registrierung`, text: `Wir prüfen Ihre ${operatorLabel} und Registrierung bei der ${authShort}. Kunden sehen ein Prüf-Badge, Sie fliegen nachweislich legal.` },
      { icon: FileBadge, title: `Zertifizierung ${advancedCred} / ${specificCred}`, text: "Ihr Zertifikat bestimmt, welche Leads Sie erhalten. Je höher Ihre Berechtigung, desto mehr und desto wertvollere Aufträge matchen Sie." },
      { icon: Wallet, title: `${insured} Versicherung`, text: `Eine gültige Haftpflichtversicherung von mindestens ${insured} ist Voraussetzung, um Leads zu erhalten. So schaffen wir Vertrauen beim Kunden — und Sie schützen sich selbst.` },
    ],
  });

  // Membership content per locale, keyed by membership.key.
  const MEM = pick<Record<MembershipKey, { name: string; forWho: string; price: string; priceSub: string; leadModifier: string; commission: string; perks: string[] }>>(locale, {
    nl: {
      free: { name: "Free", forWho: "Nieuwe & parttime piloten", price: formatCurrency(0, locale), priceSub: "altijd gratis", leadModifier: "basisprijs +25%", commission: "15% commissie", perks: ["Basisprofiel in de gids", "Brons + Zilver leads (2u vertraagd)", "Max 5 leads per maand", "Badge 'Geregistreerd'"] },
      pro: { name: "Pro", forWho: "Actieve fulltime piloten — de kern", price: formatCurrency(39, locale), priceSub: "per maand", leadModifier: "basisprijs", commission: "10% commissie", perks: ["Uitgebreid profiel + portfolio", "Alle leads, real-time, ongelimiteerd", "Badge 'Geverifieerd Pro'", `${formatCurrency(25, locale)} leadtegoed per maand`] },
      elite: { name: "Elite", forWho: "High-volume & B2B-specialisten", price: formatCurrency(129, locale), priceSub: "per maand", leadModifier: "basisprijs −25%", commission: "7% commissie", perks: ["Uitgelicht, bovenaan gerankt", "15 min voorsprong op nieuwe leads", "Eerste keus op exclusieve Goud/Platinum leads", "Footage-bonus + snellere uitbetaling"] },
    },
    en: {
      free: { name: "Free", forWho: "New & part-time pilots", price: formatCurrency(0, locale), priceSub: "always free", leadModifier: "base price +25%", commission: "15% commission", perks: ["Basic listing in the directory", "Bronze + Silver leads (2h delayed)", "Max 5 leads per month", "'Registered' badge"] },
      pro: { name: "Pro", forWho: "Active full-time pilots — the core", price: formatCurrency(39, locale), priceSub: "per month", leadModifier: "base price", commission: "10% commission", perks: ["Extended profile + portfolio", "All leads, real-time, unlimited", "'Verified Pro' badge", `${formatCurrency(25, locale)} lead credit per month`] },
      elite: { name: "Elite", forWho: "High-volume & B2B specialists", price: formatCurrency(129, locale), priceSub: "per month", leadModifier: "base price −25%", commission: "7% commission", perks: ["Featured, ranked at the top", "15 min head start on new leads", "First pick of exclusive Gold/Platinum leads", "Footage bonus + faster payouts"] },
    },
    de: {
      free: { name: "Free", forWho: "Neue & Teilzeit-Piloten", price: formatCurrency(0, locale), priceSub: "immer kostenlos", leadModifier: "Basispreis +25%", commission: "15% Provision", perks: ["Basisprofil im Verzeichnis", "Bronze- + Silber-Leads (2h verzögert)", "Max. 5 Leads pro Monat", "Badge 'Registriert'"] },
      pro: { name: "Pro", forWho: "Aktive Vollzeit-Piloten — der Kern", price: formatCurrency(39, locale), priceSub: "pro Monat", leadModifier: "Basispreis", commission: "10% Provision", perks: ["Erweitertes Profil + Portfolio", "Alle Leads, in Echtzeit, unbegrenzt", "Badge 'Geprüfter Pro'", `${formatCurrency(25, locale)} Lead-Guthaben pro Monat`] },
      elite: { name: "Elite", forWho: "High-Volume- & B2B-Spezialisten", price: formatCurrency(129, locale), priceSub: "pro Monat", leadModifier: "Basispreis −25%", commission: "7% Provision", perks: ["Hervorgehoben, oben gerankt", "15 Min. Vorsprung bei neuen Leads", "Erste Wahl bei exklusiven Gold-/Platin-Leads", "Footage-Bonus + schnellere Auszahlung"] },
    },
  });

  // Lead-tier numeric ranges (EUR source) -> formatted in the active currency.
  const LEAD_NUM: Record<Tier, { from: number; to?: number }> = {
    bronze: { from: 6, to: 12 },
    silver: { from: 18, to: 30 },
    gold: { from: 45, to: 90 },
    platinum: { from: 120, to: 250 },
  };
  const JOB_NUM: Record<Tier, { from: number; to?: number; plus?: boolean }> = {
    bronze: { from: 95, to: 199 },
    silver: { from: 249, to: 549 },
    gold: { from: 495, to: 2500 },
    platinum: { from: 2500, plus: true },
  };
  const fmtRange = (r: { from: number; to?: number; plus?: boolean }) =>
    r.plus
      ? `${formatCurrency(r.from, locale)}+`
      : r.to != null
        ? `${formatCurrency(r.from, locale)} – ${formatCurrency(r.to, locale)}`
        : formatCurrency(r.from, locale);
  const EXCL = pick<Record<Tier, string>>(locale, {
    nl: { bronze: "Gedeeld (max 3)", silver: "Gedeeld (max 3)", gold: "Semi-exclusief (max 2)", platinum: "Exclusief (1 piloot)" },
    en: { bronze: "Shared (max 3)", silver: "Shared (max 3)", gold: "Semi-exclusive (max 2)", platinum: "Exclusive (1 pilot)" },
    de: { bronze: "Geteilt (max. 3)", silver: "Geteilt (max. 3)", gold: "Semi-exklusiv (max. 2)", platinum: "Exklusiv (1 Pilot)" },
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[460px] w-[460px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <div>
            <Eyebrow>{T.heroEyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.04] sm:text-5xl lg:text-6xl">
              {T.heroTitleA}
              <span className="text-brand-600">{T.heroTitleHi}</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-muted pretty">
              {T.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localized(locale, "/signup")} className="btn btn-lg btn-primary">
                {T.heroSignup}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#leads" className="btn btn-lg btn-outline">
                {T.heroHowLeads}
              </Link>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              <Stat value={formatCurrency(0, locale)} label={T.statSignup} />
              <Stat value={T.moreLeadsValue} label={T.statMoreLeads} />
              <Stat value={`${STATS.citiesCovered}+`} label={T.statCities} />
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <MediaPlaceholder seed="pilot-hero-a" aspect="tall" label={T.mediaA} className="rounded-2xl shadow-card" />
              <div className="mt-10 grid gap-4">
                <MediaPlaceholder seed="pilot-hero-b" aspect="square" isVideo label={T.mediaB} className="rounded-2xl shadow-card" />
                <MediaPlaceholder seed="pilot-hero-c" aspect="video" label={T.mediaC} className="rounded-2xl shadow-card" />
              </div>
            </div>
            <div className="card absolute -bottom-5 left-6 flex items-center gap-3 px-4 py-3 shadow-lift">
              <Inbox className="h-5 w-5 text-brand-600" />
              <div className="text-sm">
                <div className="font-semibold leading-tight">{T.newLead}</div>
                <div className="font-mono text-xs text-ink-muted">{T.newLeadMeta}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Proof bar ── */}
      <section className="border-b border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          <Stat value={formatNumber(STATS.activePilots, locale)} label={T.proofPilots} />
          <Stat value={`${STATS.citiesCovered}+`} label={T.proofCities} />
          <Stat value={T.responseValue} label={T.proofResponse} />
          <Stat value={T.tiersValue} label={T.proofTiers} />
        </div>
      </section>

      {/* ── How leads work ── */}
      <section id="leads" className="scroll-mt-24 container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.leadsEyebrow}
          title={T.leadsTitle}
          intro={T.leadsIntro}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {LEAD_FLOW.map((step, i) => (
            <div key={step.title} className="card card-pad flex flex-col">
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                  <step.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Memberships ── */}
      <section id="lidmaatschap" className="scroll-mt-24 border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow={T.memEyebrow}
            title={T.memTitle}
            intro={T.memIntro}
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {MEMBERSHIPS.map((m) => {
              const Icon = MEMBERSHIP_ICON[m.key] ?? BadgeCheck;
              const mt = MEM[m.key];
              return (
                <div
                  key={m.key}
                  className={
                    m.highlight
                      ? "card card-pad relative flex flex-col ring-2 ring-brand-500"
                      : "card card-pad flex flex-col"
                  }
                >
                  {m.highlight ? (
                    <span className="badge-verify absolute -top-3 left-6">{T.mostChosen}</span>
                  ) : null}
                  <div className="flex items-center gap-3">
                    <span
                      className={
                        m.highlight
                          ? "grid h-10 w-10 place-items-center rounded-xl bg-brand-600 text-white shadow-card"
                          : "grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-700"
                      }
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <h3 className="font-display text-xl font-bold">{mt.name}</h3>
                  </div>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-4xl font-bold text-ink">{mt.price}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                      {mt.priceSub}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-ink-muted">{mt.forWho}</p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-line bg-paper-soft px-3 py-2.5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                        {T.leadPrice}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">{mt.leadModifier}</div>
                    </div>
                    <div className="rounded-xl border border-line bg-paper-soft px-3 py-2.5">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                        {T.commission}
                      </div>
                      <div className="mt-0.5 text-sm font-semibold text-ink">{mt.commission}</div>
                    </div>
                  </div>

                  <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                    {mt.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                        <span className="leading-relaxed">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={localized(locale, "/signup")}
                    className={
                      m.highlight
                        ? "btn btn-md btn-primary mt-7 w-full"
                        : "btn btn-md btn-outline mt-7 w-full"
                    }
                  >
                    {m.key === "free" ? T.memStartFree : `${T.choose} ${mt.name}`}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-center font-mono text-xs uppercase tracking-wider text-ink-faint">
            {T.memFootnote}
          </p>
        </div>
      </section>

      {/* ── Lead tiers table ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow={T.leadEyebrow}
          title={T.leadTitle}
          intro={T.leadIntro}
        />
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {T.thJobTier}
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {T.thJobValue}
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {T.thLeadPrice}
                </th>
                <th className="py-4 pr-4 font-mono text-xs uppercase tracking-wider text-ink-muted">
                  {T.thExclusivity}
                </th>
              </tr>
            </thead>
            <tbody>
              {LEAD_TIERS.map((lt) => (
                <tr key={lt.tier} className="border-b border-line">
                  <td className="py-4 pr-4">
                    <TierBadge tier={lt.tier} />
                  </td>
                  <td className="py-4 pr-4 font-mono text-sm text-ink-soft">
                    {fmtRange(JOB_NUM[lt.tier])}
                  </td>
                  <td className="py-4 pr-4 font-mono text-sm font-semibold text-brand-700">
                    {fmtRange(LEAD_NUM[lt.tier])}
                  </td>
                  <td className="py-4 pr-4 text-sm text-ink-soft">{EXCL[lt.tier]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 font-mono text-xs uppercase tracking-wider text-ink-faint">
          {T.leadFootnote}
        </p>
      </section>

      {/* ── Verification / trust block ── */}
      <section className="border-t border-line bg-ink py-16 text-white sm:py-24">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-xl">
              <span className="eyebrow text-brand-300">{T.verifyEyebrow}</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
                {T.verifyTitle}
              </h2>
              <p className="mt-4 text-lg text-white/70 pretty">
                {T.verifyIntro}
              </p>
              <Link href={localized(locale, "/signup")} className="btn btn-lg btn-primary mt-8">
                {T.verifyStart}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-1">
              {VERIFY.map((v) => (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-500/20 text-brand-300">
                    <v.icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{v.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/70">{v.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white px-6 py-14 text-center shadow-card sm:px-16 sm:py-20">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-200/50 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <Eyebrow className="justify-center">{T.ctaEyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              {T.ctaTitle}
            </h2>
            <p className="mt-4 text-lg text-ink-muted pretty">
              {T.ctaIntro}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href={localized(locale, "/signup")} className="btn btn-lg btn-primary">
                {T.ctaSignup}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#lidmaatschap" className="btn btn-lg btn-outline">
                {T.ctaMemberships}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
