import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Briefcase,
  ShieldCheck,
  FileBadge,
  Plane,
  ArrowRight,
} from "lucide-react";
import { MediaPlaceholder } from "@/components/media";
import { ShowcaseCard } from "@/components/cards";
import { TierBadge, VerifiedBadge, Stars, SectionHeading } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { getPilot, PILOTS, SHOWCASE } from "@/lib/seed";
import { getCity, getSegment } from "@/lib/catalog";
import { formatNumber } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import { capabilityLabel, getJurisdiction } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return PILOTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) {
    const nf = pick(locale, {
      nl: "Piloot niet gevonden | Skylens",
      en: "Pilot not found | Skylens",
      de: "Pilot nicht gefunden | Skylens",
    });
    return { title: nf };
  }
  const city = getCity(pilot.citySlug);
  const inName = city ? city.name : "";
  const M = pick(locale, {
    nl: {
      title: `${pilot.name} · ${pilot.company}${city ? ` in ${inName}` : ""} | Skylens`,
      description: `${pilot.name} (${pilot.company}) is een geverifieerde dronepiloot${
        city ? ` in ${inName}` : ""
      }. ${pilot.rating.toFixed(1)} sterren uit ${pilot.reviewCount} reviews, ${
        pilot.jobsDone
      } opdrachten. Vraag direct aan via Skylens.`,
    },
    en: {
      title: `${pilot.name} · ${pilot.company}${city ? ` in ${inName}` : ""} | Skylens`,
      description: `${pilot.name} (${pilot.company}) is a verified drone pilot${
        city ? ` in ${inName}` : ""
      }. ${pilot.rating.toFixed(1)} stars from ${pilot.reviewCount} reviews, ${
        pilot.jobsDone
      } jobs completed. Request directly via Skylens.`,
    },
    de: {
      title: `${pilot.name} · ${pilot.company}${city ? ` in ${inName}` : ""} | Skylens`,
      description: `${pilot.name} (${pilot.company}) ist ein geprüfter Drohnenpilot${
        city ? ` in ${inName}` : ""
      }. ${pilot.rating.toFixed(1)} Sterne aus ${pilot.reviewCount} Bewertungen, ${
        pilot.jobsDone
      } Aufträge. Direkt über Skylens anfragen.`,
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/piloten/${slug}`,
        "en-GB": `${SITE.url}/en/piloten/${slug}`,
        de: `${SITE.url}/de/piloten/${slug}`,
      },
    },
  };
}

export default async function PilotProfilePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) notFound();

  const city = getCity(pilot.citySlug);
  const segments = pilot.segments
    .map((s) => getSegment(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));
  const firstSegment = pilot.segments[0] ?? "vastgoed";

  let work = SHOWCASE.filter((item) => item.pilotSlug === pilot.slug);
  if (work.length === 0) work = SHOWCASE.slice(0, 3);

  const requestHref = `/aanvraag?segment=${firstSegment}&stad=${pilot.citySlug}`;

  const jur = getJurisdiction(pilot.country);
  const insuranceAmount = new Intl.NumberFormat(
    locale === "en" ? "en-GB" : locale === "de" ? "de-DE" : "nl-NL",
    { style: "currency", currency: jur.insurance.currency, maximumFractionDigits: 0 },
  ).format(jur.insurance.minMajor);

  const firstName = pilot.name.split(" ")[0];

  const T = pick(locale, {
    nl: {
      allPilots: "Alle piloten",
      respondsIn: (t: string) => `Reageert ${t}`,
      jobs: (n: string) => `${n} opdrachten`,
      about: `Over ${firstName}`,
      specialisations: "Specialisaties",
      gear: "Apparatuur",
      certInsurance: "Certificering & verzekering",
      certLabel: jur.regime === "EASA" ? "EASA-certificering" : "CAA-certificering",
      insurance: "Verzekering",
      insured: `Aansprakelijkheid tot ${insuranceAmount} gedekt`,
      notProvided: "Niet opgegeven",
      operatorIdLabel: jur.operatorId.label,
      status: "Status",
      verifiedStatus: "Door Skylens geverifieerd",
      pendingStatus: "Verificatie in behandeling",
      requestTitle: "Vraag deze piloot aan",
      requestIntro: `Gratis en vrijblijvend. We sturen je aanvraag rechtstreeks naar ${firstName} en andere passende piloten in de buurt.`,
      requestCta: "Plaats je aanvraag",
      rating: "Beoordeling",
      jobsShort: "Opdrachten",
      responseTime: "Reactietijd",
      range: "Bereik",
      trustInsured: "Verzekerd · ",
      trustVerified: "geverifieerd door Skylens",
      trustPending: "verificatie in behandeling",
      portfolioEyebrow: "Portfolio",
      portfolioTitle: "Recent werk",
      portfolioIntro: `Een greep uit recente opdrachten van ${firstName} via Skylens.`,
      reviewsEyebrow: "Reviews",
      reviewsTitle: "Wat opdrachtgevers zeggen",
      reviewsIntro: `${pilot.rating.toFixed(1)} gemiddeld uit ${pilot.reviewCount} beoordelingen.`,
      ctaTitle: `Werk samen met ${firstName}`,
      ctaIntro:
        "Plaats gratis je aanvraag. Binnen enkele uren krijg je een reactie van deze piloot en andere geverifieerde matches in de buurt.",
    },
    en: {
      allPilots: "All pilots",
      respondsIn: (t: string) => `Responds ${t}`,
      jobs: (n: string) => `${n} jobs`,
      about: `About ${firstName}`,
      specialisations: "Specialisms",
      gear: "Equipment",
      certInsurance: "Certification & insurance",
      certLabel: jur.regime === "EASA" ? "EASA certification" : "CAA certification",
      insurance: "Insurance",
      insured: `Public liability covered up to ${insuranceAmount}`,
      notProvided: "Not provided",
      operatorIdLabel: jur.operatorId.label,
      status: "Status",
      verifiedStatus: "Verified by Skylens",
      pendingStatus: "Verification pending",
      requestTitle: "Request this pilot",
      requestIntro: `Free and no obligation. We'll send your request straight to ${firstName} and other suitable pilots nearby.`,
      requestCta: "Post your request",
      rating: "Rating",
      jobsShort: "Jobs",
      responseTime: "Response time",
      range: "Range",
      trustInsured: "Insured · ",
      trustVerified: "verified by Skylens",
      trustPending: "verification pending",
      portfolioEyebrow: "Portfolio",
      portfolioTitle: "Recent work",
      portfolioIntro: `A selection of recent jobs by ${firstName} via Skylens.`,
      reviewsEyebrow: "Reviews",
      reviewsTitle: "What clients say",
      reviewsIntro: `${pilot.rating.toFixed(1)} average from ${pilot.reviewCount} reviews.`,
      ctaTitle: `Work with ${firstName}`,
      ctaIntro:
        "Post your request for free. Within hours you'll hear back from this pilot and other verified matches nearby.",
    },
    de: {
      allPilots: "Alle Piloten",
      respondsIn: (t: string) => `Antwortet ${t}`,
      jobs: (n: string) => `${n} Aufträge`,
      about: `Über ${firstName}`,
      specialisations: "Spezialisierungen",
      gear: "Ausrüstung",
      certInsurance: "Zertifizierung & Versicherung",
      certLabel: jur.regime === "EASA" ? "EASA-Zertifizierung" : "CAA-Zertifizierung",
      insurance: "Versicherung",
      insured: `Haftpflicht bis ${insuranceAmount} abgedeckt`,
      notProvided: "Nicht angegeben",
      operatorIdLabel: jur.operatorId.label,
      status: "Status",
      verifiedStatus: "Von Skylens geprüft",
      pendingStatus: "Prüfung läuft",
      requestTitle: "Diesen Piloten anfragen",
      requestIntro: `Kostenlos und unverbindlich. Wir senden Ihre Anfrage direkt an ${firstName} und weitere passende Piloten in der Nähe.`,
      requestCta: "Anfrage stellen",
      rating: "Bewertung",
      jobsShort: "Aufträge",
      responseTime: "Antwortzeit",
      range: "Radius",
      trustInsured: "Versichert · ",
      trustVerified: "von Skylens geprüft",
      trustPending: "Prüfung läuft",
      portfolioEyebrow: "Portfolio",
      portfolioTitle: "Aktuelle Arbeiten",
      portfolioIntro: `Eine Auswahl aktueller Aufträge von ${firstName} über Skylens.`,
      reviewsEyebrow: "Bewertungen",
      reviewsTitle: "Was Auftraggeber sagen",
      reviewsIntro: `${pilot.rating.toFixed(1)} im Schnitt aus ${pilot.reviewCount} Bewertungen.`,
      ctaTitle: `Mit ${firstName} zusammenarbeiten`,
      ctaIntro:
        "Stellen Sie Ihre Anfrage kostenlos. Innerhalb von Stunden hören Sie von diesem Piloten und weiteren geprüften Matches in der Nähe.",
    },
  });

  return (
    <>
      {/* ── Header ── */}
      <section className="container-x pt-8 sm:pt-12">
        <Link
          href={localized(locale, "/piloten")}
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-brand-700"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          {T.allPilots}
        </Link>

        <div className="mt-5 overflow-hidden rounded-3xl">
          <MediaPlaceholder
            seed={pilot.slug}
            aspect="wide"
            label={`${pilot.company}${city ? ` · ${city.name}` : ""}`}
          />
        </div>

        <div className="mt-7 flex flex-wrap items-start justify-between gap-5">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold sm:text-4xl">{pilot.name}</h1>
              {pilot.verified ? <VerifiedBadge /> : null}
            </div>
            <p className="mt-1.5 text-lg text-ink-muted">{pilot.company}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-muted">
              {city ? (
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-brand-600" />
                  {city.name} · {pilot.serviceRadiusKm} km
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" />
                {T.respondsIn(pilot.responseTime)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-brand-600" />
                {T.jobs(formatNumber(pilot.jobsDone, locale))}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start gap-3">
            <Stars rating={pilot.rating} count={pilot.reviewCount} className="text-lg" />
            <TierBadge tier={pilot.tier} />
          </div>
        </div>
      </section>

      {/* ── Two-column ── */}
      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:items-start">
          {/* Left */}
          <div className="space-y-10">
            <div>
              <h2 className="text-xl font-bold">{T.about}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{pilot.bio}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">{T.specialisations}</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {segments.map((s) => (
                  <Link
                    key={s.slug}
                    href={localized(locale, `/toepassingen/${s.slug}`)}
                    className="pill transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {segmentText(s.slug, locale).name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">{T.gear}</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {pilot.gear.map((g) => (
                  <li
                    key={g}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm font-medium text-ink"
                  >
                    <Plane className="h-4 w-4 shrink-0 text-brand-600" />
                    {g}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold">{T.certInsurance}</h2>
              <div className="mt-4 card card-pad bg-paper-soft">
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <FileBadge className="h-4 w-4 text-brand-600" />
                      {T.certLabel}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {pilot.certs.map((c) => (
                        <span key={c} className="badge-verify">
                          {capabilityLabel(pilot.country, c)}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <ShieldCheck className="h-4 w-4 text-brand-600" />
                      {T.insurance}
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {pilot.insured ? T.insured : T.notProvided}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <FileBadge className="h-4 w-4 text-brand-600" />
                      {T.operatorIdLabel}
                    </dt>
                    <dd className="mt-2 font-mono text-sm text-ink-soft">
                      {pilot.operatorId}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <ShieldCheck className="h-4 w-4 text-brand-600" />
                      {T.status}
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {pilot.verified ? T.verifiedStatus : T.pendingStatus}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right · sticky request card */}
          <aside className="lg:sticky lg:top-24">
            <div className="card card-pad shadow-lift">
              <h2 className="text-xl font-bold">{T.requestTitle}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {T.requestIntro}
              </p>

              <Link
                href={localized(locale, requestHref)}
                className="btn btn-lg btn-primary mt-5 w-full"
              >
                {T.requestCta}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {T.rating}
                  </dt>
                  <dd className="mt-1.5">
                    <Stars rating={pilot.rating} count={pilot.reviewCount} />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {T.jobsShort}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {formatNumber(pilot.jobsDone, locale)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {T.responseTime}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {pilot.responseTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    {T.range}
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {pilot.serviceRadiusKm} km
                  </dd>
                </div>
              </dl>

              <p className="mt-6 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-ink-muted">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                {pilot.insured ? T.trustInsured : ""}
                {pilot.verified ? T.trustVerified : T.trustPending}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Recent werk ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={T.portfolioEyebrow}
            title={T.portfolioTitle}
            intro={T.portfolioIntro}
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
            {work.map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Reviews ── */}
      {pilot.reviews.length > 0 ? (
        <section className="container-x py-16 sm:py-24">
          <SectionHeading
            eyebrow={T.reviewsEyebrow}
            title={T.reviewsTitle}
            intro={T.reviewsIntro}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {pilot.reviews.map((r, i) => (
              <figure key={`${r.author}-${i}`} className="card card-pad flex flex-col">
                <Stars rating={r.rating} />
                <blockquote className="mt-4 flex-1 text-ink-soft pretty">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                  <span className="font-semibold">{r.author}</span>
                  <span className="text-ink-muted">
                    {" "}
                    · {r.role} · {r.city}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <CTASection
        title={T.ctaTitle}
        intro={T.ctaIntro}
        primaryHref={requestHref}
        primaryLabel={T.requestCta}
      />
    </>
  );
}
