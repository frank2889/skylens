import type { Metadata } from "next";
import Link from "next/link";
import { Check, ShieldCheck, Receipt, Sparkles } from "lucide-react";
import { TierBadge, SectionHeading, Eyebrow } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { PACKAGES, MEMBERSHIPS, LEAD_TIERS } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { packageText, ui } from "@/lib/i18n/catalog-i18n";
import { formatCurrency } from "@/lib/utils";
import { SITE } from "@/lib/site";
import type { MembershipKey, Tier } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Pakketten & prijzen — Van Brons tot Platinum | Skylens",
      description:
        "Transparante drone-pakketten van Brons tot Platinum, geprijsd op uitkomst. Bekijk wat je krijgt per pakket, hoe piloten worden gematcht en de leadprijzen per job-tier. Alle prijzen ex BTW.",
    },
    en: {
      title: "Packages & pricing — From Bronze to Platinum | Skylens",
      description:
        "Transparent drone packages from Bronze to Platinum, priced on outcome. See what each package includes, how pilots are matched and lead prices per job tier. All prices ex VAT.",
    },
    de: {
      title: "Pakete & Preise — Von Bronze bis Platin | Skylens",
      description:
        "Transparente Drohnen-Pakete von Bronze bis Platin, ergebnisorientiert bepreist. Sehen Sie, was jedes Paket umfasst, wie Piloten gematcht werden und die Lead-Preise je Job-Tier. Alle Preise zzgl. MwSt.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/pakketten`,
        "en-GB": `${SITE.url}/en/pakketten`,
        de: `${SITE.url}/de/pakketten`,
      },
    },
  };
}

export default async function PakkettenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const u = ui(locale);

  const T = pick(locale, {
    nl: {
      heroEyebrow: "Pakketten",
      heroTitleA: "Van Brons tot ",
      heroTitleHi: "Platinum",
      heroIntro:
        "Geprijsd op uitkomst, gepoort op piloot. Je kiest het resultaat dat je nodig hebt — wij routeren je klus alleen naar piloten met de juiste apparatuur, certificering en verzekering. Vaste, vergelijkbare deliverables per niveau, zonder vage offertes.",
      heroPostRequest: "Plaats je aanvraag",
      heroForPilots: "Voor piloten",
      compEyebrow: "De vier pakketten",
      compTitle: "Kies het niveau dat bij je klus past",
      compIntro:
        "Elk pakket is een vast startpunt. De definitieve prijs hangt af van regio, reistijd en opties — je ziet altijd vooraf wat je betaalt.",
      popular: "Populair",
      choose: "Kies",
      platinumNote: "Platinum is op aanvraag.",
      platinumBody:
        "Cinema- en mission-grade producties — merkfilms, LiDAR-survey, multi-day shoots — stellen we op maat samen. Vertel ons je project en we koppelen je aan een gespecialiseerde, vaak twee-koppige crew met SORA/LUC-autorisatie.",
      specs: {
        useCase: "Toepassing",
        gear: "Apparatuur",
        photos: "Foto's",
        video: "Video",
        technical: "Technisch",
        turnaround: "Levertijd",
        certRequired: "Certificering",
      },
      memEyebrow: "Voor piloten",
      memTitle: "Pilotenlidmaatschappen",
      memIntro:
        "Klanten betalen per pakket — piloten betalen niets om mee te doen. Het model is opgebouwd uit drie delen: een (optioneel) maandlidmaatschap, een leadfee per klus die je accepteert, en een commissie over de jobwaarde. Hoe hoger je lidmaatschap, hoe lager je leadfee én commissie.",
      mostChosen: "Meest gekozen",
      leadPrice: "Leadprijs",
      commission: "Commissie",
      signupFree: "Gratis aanmelden",
      memFootA:
        "Zo word je dus belast als piloot: een maandlidmaatschap (vanaf ",
      memFootB:
        "), een leadfee per geaccepteerde klus en een commissie over de uiteindelijke jobwaarde. Aanmelden is altijd gratis — je betaalt pas zodra je een lead aanneemt. ",
      memFootLink: "Lees hoe leads werken",
      leadEyebrow: "Leadprijzen",
      leadTitle: "Leadprijzen per job-tier",
      leadIntro:
        "De prijs van een lead schaalt mee met de waarde van de klus. Grotere klussen kosten meer per lead, maar gaan naar minder piloten — zodat je investering ook iets waard blijft.",
      thJobTier: "Job-tier",
      thJobValue: "Jobwaarde",
      thLeadPrice: "Leadprijs",
      thExclusivity: "Exclusiviteit",
      exclNote: "Exclusiviteit beschermt je conversie.",
      caveat:
        "Alle prijzen zijn indicatief en exclusief BTW. De definitieve prijs hangt af van regio, reistijd en gekozen opties. Je ontvangt vooraf een vaste prijs per klus — zonder verrassingen achteraf.",
      ctaTitle: "Niet zeker welk pakket je nodig hebt?",
      ctaIntro:
        "Plaats gratis je aanvraag. We adviseren het juiste niveau en matchen je met geverifieerde piloten bij jou in de buurt.",
    },
    en: {
      heroEyebrow: "Packages",
      heroTitleA: "From Bronze to ",
      heroTitleHi: "Platinum",
      heroIntro:
        "Priced on outcome, routed by pilot. You pick the result you need — we route your job only to pilots with the right kit, certification and insurance. Fixed, comparable deliverables at every level, with no vague quotes.",
      heroPostRequest: "Post your request",
      heroForPilots: "For pilots",
      compEyebrow: "The four packages",
      compTitle: "Pick the level that fits your job",
      compIntro:
        "Every package is a fixed starting point. The final price depends on region, travel time and options — you always see what you'll pay up front.",
      popular: "Popular",
      choose: "Choose",
      platinumNote: "Platinum is on request.",
      platinumBody:
        "Cinema- and mission-grade productions — brand films, LiDAR survey, multi-day shoots — are scoped bespoke. Tell us about your project and we'll pair you with a specialist, often two-person crew holding SORA/OA authorisation.",
      specs: {
        useCase: "Use case",
        gear: "Equipment",
        photos: "Photos",
        video: "Video",
        technical: "Technical",
        turnaround: "Turnaround",
        certRequired: "Certification",
      },
      memEyebrow: "For pilots",
      memTitle: "Pilot memberships",
      memIntro:
        "Clients pay per package — pilots pay nothing to take part. The model has three parts: an (optional) monthly membership, a lead fee per job you accept, and a commission on the job value. The higher your membership, the lower your lead fee and commission.",
      mostChosen: "Most popular",
      leadPrice: "Lead price",
      commission: "Commission",
      signupFree: "Sign up free",
      memFootA: "So here's how you're charged as a pilot: a monthly membership (from ",
      memFootB:
        "), a lead fee per accepted job and a commission on the final job value. Signing up is always free — you only pay once you take on a lead. ",
      memFootLink: "Read how leads work",
      leadEyebrow: "Lead pricing",
      leadTitle: "Lead prices per job tier",
      leadIntro:
        "A lead's price scales with the value of the job. Bigger jobs cost more per lead but go to fewer pilots — so your investment stays worth something.",
      thJobTier: "Job tier",
      thJobValue: "Job value",
      thLeadPrice: "Lead price",
      thExclusivity: "Exclusivity",
      exclNote: "Exclusivity protects your conversion.",
      caveat:
        "All prices are indicative and exclude VAT. The final price depends on region, travel time and chosen options. You receive a fixed price per job up front — no surprises afterwards.",
      ctaTitle: "Not sure which package you need?",
      ctaIntro:
        "Post your request for free. We'll advise the right level and match you with verified pilots near you.",
    },
    de: {
      heroEyebrow: "Pakete",
      heroTitleA: "Von Bronze bis ",
      heroTitleHi: "Platin",
      heroIntro:
        "Ergebnisorientiert bepreist, pilotengerecht geroutet. Sie wählen das gewünschte Ergebnis — wir leiten Ihren Auftrag nur an Piloten mit der passenden Ausrüstung, Zertifizierung und Versicherung weiter. Feste, vergleichbare Leistungen je Stufe, ohne vage Angebote.",
      heroPostRequest: "Anfrage stellen",
      heroForPilots: "Für Piloten",
      compEyebrow: "Die vier Pakete",
      compTitle: "Wählen Sie die Stufe, die zu Ihrem Auftrag passt",
      compIntro:
        "Jedes Paket ist ein fester Ausgangspunkt. Der Endpreis hängt von Region, Anfahrt und Optionen ab — Sie sehen immer im Voraus, was Sie zahlen.",
      popular: "Beliebt",
      choose: "Wählen",
      platinumNote: "Platin auf Anfrage.",
      platinumBody:
        "Cinema- und Mission-Grade-Produktionen — Markenfilme, LiDAR-Vermessung, mehrtägige Drehs — stellen wir individuell zusammen. Erzählen Sie uns von Ihrem Projekt und wir vermitteln Ihnen eine spezialisierte, oft zweiköpfige Crew mit SORA/LUC-Genehmigung.",
      specs: {
        useCase: "Anwendung",
        gear: "Ausrüstung",
        photos: "Fotos",
        video: "Video",
        technical: "Technisch",
        turnaround: "Lieferzeit",
        certRequired: "Zertifizierung",
      },
      memEyebrow: "Für Piloten",
      memTitle: "Piloten-Mitgliedschaften",
      memIntro:
        "Kunden zahlen pro Paket — Piloten zahlen nichts für die Teilnahme. Das Modell besteht aus drei Teilen: einer (optionalen) Monatsmitgliedschaft, einer Lead-Gebühr je angenommenem Auftrag und einer Provision auf den Auftragswert. Je höher Ihre Mitgliedschaft, desto niedriger Lead-Gebühr und Provision.",
      mostChosen: "Am häufigsten gewählt",
      leadPrice: "Lead-Preis",
      commission: "Provision",
      signupFree: "Kostenlos registrieren",
      memFootA: "So werden Sie als Pilot belastet: eine Monatsmitgliedschaft (ab ",
      memFootB:
        "), eine Lead-Gebühr je angenommenem Auftrag und eine Provision auf den endgültigen Auftragswert. Die Registrierung ist immer kostenlos — Sie zahlen erst, wenn Sie einen Lead annehmen. ",
      memFootLink: "So funktionieren Leads",
      leadEyebrow: "Lead-Preise",
      leadTitle: "Lead-Preise je Job-Tier",
      leadIntro:
        "Der Preis eines Leads skaliert mit dem Auftragswert. Größere Aufträge kosten mehr pro Lead, gehen aber an weniger Piloten — damit sich Ihre Investition lohnt.",
      thJobTier: "Job-Tier",
      thJobValue: "Auftragswert",
      thLeadPrice: "Lead-Preis",
      thExclusivity: "Exklusivität",
      exclNote: "Exklusivität schützt Ihre Conversion.",
      caveat:
        "Alle Preise sind indikativ und zzgl. MwSt. Der Endpreis hängt von Region, Anfahrt und gewählten Optionen ab. Sie erhalten vorab einen Festpreis je Auftrag — ohne nachträgliche Überraschungen.",
      ctaTitle: "Nicht sicher, welches Paket Sie brauchen?",
      ctaIntro:
        "Stellen Sie kostenlos Ihre Anfrage. Wir empfehlen die richtige Stufe und vermitteln Ihnen geprüfte Piloten in Ihrer Nähe.",
    },
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

  const tierName = pick<Record<Tier, string>>(locale, {
    nl: { bronze: "Brons", silver: "Zilver", gold: "Goud", platinum: "Platinum" },
    en: { bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum" },
    de: { bronze: "Bronze", silver: "Silber", gold: "Gold", platinum: "Platin" },
  });

  const exclBody = pick(locale, {
    nl: (
      <>
        {tierName.bronze}- en {tierName.silver}-leads worden met maximaal 3 piloten gedeeld,{" "}
        {tierName.gold} met maximaal 2, en {tierName.platinum} gaat exclusief naar 1 piloot.
        Minder concurrentie per lead betekent een hogere kans dat je de klus wint — daarom is de
        leadprijs hoger naarmate de exclusiviteit toeneemt.
      </>
    ),
    en: (
      <>
        {tierName.bronze} and {tierName.silver} leads are shared with up to 3 pilots, {tierName.gold}{" "}
        with up to 2, and {tierName.platinum} goes exclusively to 1 pilot. Less competition per lead
        means a higher chance you win the job — which is why the lead price rises as exclusivity
        increases.
      </>
    ),
    de: (
      <>
        {tierName.bronze}- und {tierName.silver}-Leads werden mit bis zu 3 Piloten geteilt,{" "}
        {tierName.gold} mit bis zu 2, und {tierName.platinum} geht exklusiv an 1 Piloten. Weniger
        Konkurrenz pro Lead bedeutet eine höhere Chance, den Auftrag zu gewinnen — deshalb steigt der
        Lead-Preis mit zunehmender Exklusivität.
      </>
    ),
  });

  const PACKAGE_SPECS: { key: keyof typeof PACKAGES[number]; label: string }[] = [
    { key: "useCase", label: T.specs.useCase },
    { key: "gear", label: T.specs.gear },
    { key: "photos", label: T.specs.photos },
    { key: "video", label: T.specs.video },
    { key: "technical", label: T.specs.technical },
    { key: "turnaround", label: T.specs.turnaround },
    { key: "certRequired", label: T.specs.certRequired },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <Eyebrow>{T.heroEyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.heroTitleA}
              <span className="text-brand-600">{T.heroTitleHi}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.heroIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localized(locale, "/aanvraag")} className="btn btn-lg btn-primary">
                {T.heroPostRequest}
              </Link>
              <Link href="#lidmaatschap" className="btn btn-lg btn-outline">
                {T.heroForPilots}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Package comparison cards ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow={T.compEyebrow}
          title={T.compTitle}
          intro={T.compIntro}
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-4">
          {PACKAGES.map((p) => {
            const pt = packageText(p.tier, locale);
            return (
              <div
                key={p.tier}
                className={cn(
                  "card flex flex-col p-6",
                  p.highlight && "relative ring-2 ring-brand-500"
                )}
              >
                {p.highlight ? (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-card">
                    <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                    {T.popular}
                  </span>
                ) : null}

                <TierBadge tier={p.tier} />
                <h3 className="mt-4 font-display text-2xl font-bold">{pt.name}</h3>
                <p className="mt-1 text-sm text-ink-muted">{pt.oneLiner}</p>

                <div className="mt-5">
                  <p className="font-mono text-2xl font-bold text-brand-700">
                    {u.from} {formatCurrency(p.priceFrom, locale)}
                  </p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                    {u.exVat}
                  </p>
                </div>

                <dl className="mt-6 flex-1 space-y-3.5 border-t border-line pt-5 text-sm">
                  {PACKAGE_SPECS.map((spec) => (
                    <div key={spec.key}>
                      <dt className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                        {spec.label}
                      </dt>
                      <dd className="mt-0.5 leading-snug text-ink-soft">
                        {spec.key === "useCase" ? pt.useCase : p[spec.key]}
                      </dd>
                    </div>
                  ))}
                </dl>

                <Link
                  href={localized(locale, `/aanvraag?pakket=${p.tier}`)}
                  className={cn(
                    "btn btn-md mt-6 w-full",
                    p.highlight ? "btn-primary" : "btn-outline"
                  )}
                >
                  {T.choose} {pt.name}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-paper-soft p-5 text-sm text-ink-muted">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
          <p className="pretty">
            <span className="font-semibold text-ink">{T.platinumNote}</span> {T.platinumBody}
          </p>
        </div>
      </section>

      {/* ── Pilot memberships ── */}
      <section id="lidmaatschap" className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={T.memEyebrow}
            title={T.memTitle}
            intro={T.memIntro}
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {MEMBERSHIPS.map((m) => {
              const mt = MEM[m.key];
              return (
                <div
                  key={m.key}
                  className={cn(
                    "card flex flex-col p-7",
                    m.highlight && "relative ring-2 ring-brand-500"
                  )}
                >
                  {m.highlight ? (
                    <span className="absolute -top-3 left-7 inline-flex items-center rounded-full bg-brand-600 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-white shadow-card">
                      {T.mostChosen}
                    </span>
                  ) : null}

                  <h3 className="font-display text-xl font-bold">{mt.name}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{mt.forWho}</p>

                  <div className="mt-5 flex items-baseline gap-1.5">
                    <span className="font-display text-3xl font-bold text-ink">{mt.price}</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                      {mt.priceSub}
                    </span>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 border-y border-line py-4 text-sm">
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                        {T.leadPrice}
                      </div>
                      <div className="mt-0.5 font-semibold text-ink-soft">{mt.leadModifier}</div>
                    </div>
                    <div>
                      <div className="font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                        {T.commission}
                      </div>
                      <div className="mt-0.5 font-semibold text-ink-soft">{mt.commission}</div>
                    </div>
                  </div>

                  <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                    {mt.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                        <span className="text-ink-soft">{perk}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={localized(locale, "/voor-piloten")}
                    className={cn(
                      "btn btn-md mt-7 w-full",
                      m.highlight ? "btn-primary" : "btn-outline"
                    )}
                  >
                    {m.key === "free" ? T.signupFree : `${T.choose} ${mt.name}`}
                  </Link>
                </div>
              );
            })}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted pretty">
            {T.memFootA}
            {formatCurrency(0, locale)}
            {T.memFootB}
            <Link href={localized(locale, "/voor-piloten#leads")} className="link-underline">
              {T.memFootLink}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ── Lead pricing per job-tier ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow={T.leadEyebrow}
          title={T.leadTitle}
          intro={T.leadIntro}
        />

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line">
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {T.thJobTier}
                </th>
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {T.thJobValue}
                </th>
                <th className="pb-3 pr-4 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
                  {T.thLeadPrice}
                </th>
                <th className="pb-3 font-mono text-[11px] uppercase tracking-wider text-ink-faint">
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
                  <td className="py-4 text-sm text-ink-soft">{EXCL[lt.tier]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex items-start gap-3 rounded-2xl border border-line bg-paper-soft p-5 text-sm text-ink-muted">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
          <p className="pretty">
            <span className="font-semibold text-ink">{T.exclNote}</span> {exclBody}
          </p>
        </div>
      </section>

      {/* ── Honest caveat ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="flex items-start gap-3 rounded-2xl border border-line bg-white p-5 text-sm text-ink-muted shadow-card">
          <Receipt className="mt-0.5 h-5 w-5 shrink-0 text-ink-faint" strokeWidth={1.7} />
          <p className="pretty">{T.caveat}</p>
        </div>
      </section>

      <CTASection title={T.ctaTitle} intro={T.ctaIntro} />
    </>
  );
}
