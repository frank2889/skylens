import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Ruler,
  Eye,
  FileBadge,
  Cake,
  Radio,
  ScrollText,
  ExternalLink,
  Info,
  AlertTriangle,
  Globe2,
} from "lucide-react";
import { SectionHeading } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { SITE } from "@/lib/site";
import { pick, localized } from "@/lib/i18n/messages";
import { getLocaleConfig, LOCALES } from "@/lib/i18n/config";
import { getJurisdiction } from "@/lib/jurisdictions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const j = getJurisdiction(getLocaleConfig(locale).country);
  const M = pick(locale, {
    nl: {
      title: `Regels & certificering (${j.name}) — ${SITE.name}`,
      description: `Wat heb je nodig om commercieel met een drone te vliegen in ${j.name}? Autoriteit, vliegbewijzen, verzekering en de belangrijkste regels — overzichtelijk op een rij.`,
    },
    en: {
      title: `Rules & certification (${j.name}) — ${SITE.name}`,
      description: `What do you need to fly a drone commercially in ${j.name}? Authority, pilot certificates, insurance and the key rules — clearly set out.`,
    },
    de: {
      title: `Regeln & Zertifizierung (${j.name}) — ${SITE.name}`,
      description: `Was brauchen Sie, um in ${j.name} kommerziell mit einer Drohne zu fliegen? Behörde, Pilotenzeugnisse, Versicherung und die wichtigsten Regeln — übersichtlich.`,
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: Object.fromEntries(
        LOCALES.map((l) => [getLocaleConfig(l).htmlLang, `${SITE.url}/${l}/regels`]),
      ),
    },
  };
}

export default async function RegelsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  const country = cfg.country;
  const j = getJurisdiction(country);

  const insuranceMin = new Intl.NumberFormat(cfg.intlLocale, {
    style: "currency",
    currency: j.insurance.currency,
    maximumFractionDigits: 0,
  }).format(j.insurance.minMajor);

  const T = pick(locale, {
    nl: {
      eyebrow: "Regels & certificering",
      heroTitle: `Drone-regels in ${j.name}`,
      regimeLabel: "Regime",
      authorityLabel: "Toezicht",
      heroIntro: `Dit overzicht laat zien wat je nodig hebt om legaal en commercieel met een drone te vliegen in ${j.name}. Van registratie tot het juiste vliegbewijs, verzekering en de belangrijkste vliegregels.`,
      ladderEyebrow: "Wat je nodig hebt",
      ladderTitle: "De certificeringsladder",
      ladderIntro:
        "Van eenvoudige registratie tot een certificaat op organisatieniveau. Hoe dichter bij mensen en hoe complexer de operatie, hoe hoger op de ladder.",
      colCode: "Code",
      colAuthority: "Autoriteit",
      insuranceEyebrow: "Verzekering",
      insuranceTitle: "Aansprakelijkheid is verplicht",
      insuranceMinLabel: "Minimaal verzekerd bedrag",
      insuranceBasisLabel: "Grondslag",
      rulesEyebrow: "Wat mag wel / niet",
      rulesTitle: "De belangrijkste vliegregels",
      ruleAlt: "Max. vlieghoogte",
      ruleVlos: "Zicht op de drone (VLOS)",
      ruleVlosYes: "Verplicht — altijd binnen zichtafstand vliegen",
      ruleVlosNo: "Niet vereist",
      ruleDist: "Afstandsregels",
      ruleReg: "Registratiedrempel",
      ruleAge: "Minimumleeftijd piloot",
      ruleAgeUnit: "jaar",
      ruleRid: "Remote ID",
      operatorEyebrow: "Operator-ID",
      operatorTitle: j.operatorId.label,
      operatorExampleLabel: "Voorbeeld",
      ukTitle: "Let op voor het VK",
      ukBody:
        "Het Verenigd Koninkrijk is sinds de Brexit geen EASA-lidstaat meer. EU/EASA-certificaten zijn hier NIET geldig — je hebt een aparte CAA Operator ID en Flyer ID nodig, die jaarlijks moeten worden verlengd.",
      euTitle: "EU-uitrol",
      euBody:
        "Hetzelfde EASA-model geldt in alle aangesloten staten. Vlieg je in Nederland of Duitsland, dan gelden vergelijkbare categorieën (A1/A3, A2, specifieke categorie) en is je registratie EU-breed geldig.",
      disclaimer:
        "Dit is informatief en geen juridisch advies. Controleer altijd de actuele eisen bij de bevoegde autoriteit voordat je vliegt.",
      sourceLabel: "Bron",
      yes: "Ja",
      no: "Nee",
    },
    en: {
      eyebrow: "Rules & certification",
      heroTitle: `Drone rules in ${j.name}`,
      regimeLabel: "Regime",
      authorityLabel: "Oversight",
      heroIntro: `This overview sets out what you need to fly a drone legally and commercially in ${j.name}. From registration to the right pilot certificate, insurance and the key flight rules.`,
      ladderEyebrow: "What you need",
      ladderTitle: "The certification ladder",
      ladderIntro:
        "From simple registration to an organisation-level certificate. The closer to people and the more complex the operation, the higher up the ladder.",
      colCode: "Code",
      colAuthority: "Authority",
      insuranceEyebrow: "Insurance",
      insuranceTitle: "Liability cover is mandatory",
      insuranceMinLabel: "Minimum sum insured",
      insuranceBasisLabel: "Basis",
      rulesEyebrow: "What's allowed",
      rulesTitle: "The key flight rules",
      ruleAlt: "Max. altitude",
      ruleVlos: "Line of sight (VLOS)",
      ruleVlosYes: "Required — always fly within visual line of sight",
      ruleVlosNo: "Not required",
      ruleDist: "Distance rules",
      ruleReg: "Registration threshold",
      ruleAge: "Minimum pilot age",
      ruleAgeUnit: "years",
      ruleRid: "Remote ID",
      operatorEyebrow: "Operator ID",
      operatorTitle: j.operatorId.label,
      operatorExampleLabel: "Example",
      ukTitle: "Note for the UK",
      ukBody:
        "Since Brexit the United Kingdom is no longer an EASA member state. EU/EASA certificates are NOT valid here — you need a separate CAA Operator ID and Flyer ID, which must be renewed annually.",
      euTitle: "EU rollout",
      euBody:
        "The same EASA model applies across all member states. If you fly in the Netherlands or Germany, comparable categories apply (A1/A3, A2, specific category) and your registration is valid EU-wide.",
      disclaimer:
        "This is informational and not legal advice. Always check the current requirements with the competent authority before you fly.",
      sourceLabel: "Source",
      yes: "Yes",
      no: "No",
    },
    de: {
      eyebrow: "Regeln & Zertifizierung",
      heroTitle: `Drohnenregeln in ${j.name}`,
      regimeLabel: "Regime",
      authorityLabel: "Aufsicht",
      heroIntro: `Diese Übersicht zeigt, was Sie brauchen, um in ${j.name} legal und kommerziell mit einer Drohne zu fliegen. Von der Registrierung über das richtige Pilotenzeugnis bis zu Versicherung und den wichtigsten Flugregeln.`,
      ladderEyebrow: "Was Sie brauchen",
      ladderTitle: "Die Zertifizierungsleiter",
      ladderIntro:
        "Von der einfachen Registrierung bis zum Zertifikat auf Organisationsebene. Je näher an Menschen und je komplexer der Betrieb, desto höher auf der Leiter.",
      colCode: "Code",
      colAuthority: "Behörde",
      insuranceEyebrow: "Versicherung",
      insuranceTitle: "Haftpflicht ist Pflicht",
      insuranceMinLabel: "Mindestversicherungssumme",
      insuranceBasisLabel: "Grundlage",
      rulesEyebrow: "Was erlaubt ist",
      rulesTitle: "Die wichtigsten Flugregeln",
      ruleAlt: "Max. Flughöhe",
      ruleVlos: "Sichtverbindung (VLOS)",
      ruleVlosYes: "Pflicht — stets in Sichtweite fliegen",
      ruleVlosNo: "Nicht erforderlich",
      ruleDist: "Abstandsregeln",
      ruleReg: "Registrierungsschwelle",
      ruleAge: "Mindestalter Pilot",
      ruleAgeUnit: "Jahre",
      ruleRid: "Remote ID",
      operatorEyebrow: "Betreiber-ID",
      operatorTitle: j.operatorId.label,
      operatorExampleLabel: "Beispiel",
      ukTitle: "Hinweis für das VK",
      ukBody:
        "Seit dem Brexit ist das Vereinigte Königreich kein EASA-Mitgliedstaat mehr. EU/EASA-Zeugnisse sind hier NICHT gültig — Sie benötigen eine separate CAA Operator ID und Flyer ID, die jährlich verlängert werden müssen.",
      euTitle: "EU-Ausrollung",
      euBody:
        "Dasselbe EASA-Modell gilt in allen Mitgliedstaaten. Fliegen Sie in den Niederlanden oder Deutschland, gelten vergleichbare Kategorien (A1/A3, A2, spezielle Kategorie) und Ihre Registrierung ist EU-weit gültig.",
      disclaimer:
        "Dies dient der Information und ist keine Rechtsberatung. Prüfen Sie vor dem Flug stets die aktuellen Anforderungen bei der zuständigen Behörde.",
      sourceLabel: "Quelle",
      yes: "Ja",
      no: "Nein",
    },
  });

  const ruleRows = [
    { icon: Ruler, label: T.ruleAlt, value: j.rules.maxAltitude },
    { icon: Eye, label: T.ruleVlos, value: j.rules.vlosRequired ? T.ruleVlosYes : T.ruleVlosNo },
    { icon: Ruler, label: T.ruleDist, value: j.rules.distanceRules },
    { icon: FileBadge, label: T.ruleReg, value: j.rules.registrationThreshold },
    { icon: Cake, label: T.ruleAge, value: `${j.rules.minPilotAge} ${T.ruleAgeUnit}` },
    { icon: Radio, label: T.ruleRid, value: j.rules.remoteId },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">{T.eyebrow}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.heroTitle}
            </h1>
            <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-ink-faint">{T.regimeLabel}</div>
                <div className="mt-1 font-semibold text-brand-700">{j.regime}</div>
              </div>
              <div>
                <div className="font-mono text-xs uppercase tracking-wider text-ink-faint">{T.authorityLabel}</div>
                <a
                  href={j.authority.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 font-semibold text-ink link-underline"
                >
                  {j.authority.full}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-ink-muted pretty">{T.heroIntro}</p>
          </div>
        </div>
      </section>

      {/* ── Capability ladder ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow={T.ladderEyebrow}
          title={T.ladderTitle}
          intro={T.ladderIntro}
        />
        <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {j.capabilities.map((c, i) => (
            <li key={c.level} className="card card-pad">
              <div className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 font-mono text-sm font-bold text-white shadow-card">
                  {i + 1}
                </span>
                <span className="pill font-mono text-xs">{c.code}</span>
              </div>
              <h3 className="mt-4 font-bold leading-snug">{c.name}</h3>
              <div className="mt-1.5 font-mono text-xs uppercase tracking-wider text-ink-faint">
                {c.authority}
              </div>
              {c.note ? (
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.note}</p>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      {/* ── Insurance ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={T.insuranceEyebrow}
            title={T.insuranceTitle}
          />
          <div className="card card-pad">
            <ShieldCheck className="h-7 w-7 text-brand-600" strokeWidth={1.6} />
            <div className="mt-5">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                {T.insuranceMinLabel}
              </div>
              <div className="mt-1 font-display text-3xl font-bold text-ink sm:text-4xl">
                {insuranceMin}
              </div>
            </div>
            <div className="mt-6 border-t border-line pt-5">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                {T.insuranceBasisLabel}
              </div>
              <p className="mt-1.5 leading-relaxed text-ink-soft">{j.insurance.basis}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Flight rules ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          eyebrow={T.rulesEyebrow}
          title={T.rulesTitle}
        />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {ruleRows.map((r) => (
            <div key={r.label} className="bg-paper p-6">
              <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-faint">
                <r.icon className="h-4 w-4 text-brand-600" strokeWidth={1.7} />
                {r.label}
              </dt>
              <dd className="mt-2 leading-relaxed text-ink-soft">{r.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── Operator ID ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={T.operatorEyebrow}
            title={T.operatorTitle}
          />
          <div className="card card-pad">
            <FileBadge className="h-7 w-7 text-brand-600" strokeWidth={1.6} />
            <div className="mt-5">
              <div className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                {T.operatorExampleLabel}
              </div>
              <div className="mt-1 font-mono text-2xl font-bold tracking-wide text-ink">
                {j.operatorId.example}
              </div>
            </div>
            <p className="mt-5 leading-relaxed text-ink-soft">{j.operatorId.note}</p>
          </div>
        </div>
      </section>

      {/* ── Notes ── */}
      <section className="container-x pb-4">
        <div className="grid gap-5 lg:grid-cols-2">
          {country === "GB" && !j.easaMember ? (
            <div className="card card-pad border-signal/40 bg-signal/5">
              <div className="flex items-center gap-2 font-bold">
                <AlertTriangle className="h-5 w-5 text-signal" strokeWidth={1.8} />
                {T.ukTitle}
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{T.ukBody}</p>
            </div>
          ) : null}
          <div className="card card-pad">
            <div className="flex items-center gap-2 font-bold">
              <Globe2 className="h-5 w-5 text-brand-600" strokeWidth={1.8} />
              {T.euTitle}
            </div>
            <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{T.euBody}</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <Link href={localized("nl", "/regels")} className="link-underline">Nederland (NL)</Link>
              <Link href={localized("de", "/regels")} className="link-underline">Deutschland (DE)</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Disclaimer ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="flex items-start gap-3 rounded-xl border border-line bg-paper-soft p-5 text-sm leading-relaxed text-ink-muted">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink-faint" strokeWidth={1.8} />
          <div>
            <p>{T.disclaimer}</p>
            <p className="mt-2 inline-flex items-center gap-1.5">
              <ScrollText className="h-3.5 w-3.5 text-ink-faint" />
              <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">{T.sourceLabel}:</span>
              <a href={j.authority.url} target="_blank" rel="noreferrer" className="link-underline">
                {j.authority.short}
              </a>
            </p>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
