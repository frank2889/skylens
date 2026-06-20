import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, Wrench, ShieldCheck } from "lucide-react";
import { PilotCard, ShowcaseCard } from "@/components/cards";
import { SectionHeading, TierBadge } from "@/components/bits";
import { SegmentIcon } from "@/components/segment-icon";
import { CTASection } from "@/components/cta";
import { SEGMENTS, CITIES, getSegment } from "@/lib/catalog";
import { matchPilots, availablePilots } from "@/lib/matching";
import { SHOWCASE } from "@/lib/seed";
import { formatCurrency } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { segmentText, packageText, ui } from "@/lib/i18n/catalog-i18n";
import { getJurisdiction, capabilityLabel } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}): Promise<Metadata> {
  const { locale, segment } = await params;
  const seg = getSegment(segment);
  if (!seg) {
    return {
      title: pick(locale, {
        nl: "Toepassing niet gevonden",
        en: "Service not found",
        de: "Anwendung nicht gefunden",
      }),
    };
  }
  const t = segmentText(seg.slug, locale);
  const price = formatCurrency(seg.priceFrom, locale);
  const exVat = ui(locale).exVat;
  const M = pick(locale, {
    nl: {
      title: `Dronepiloot voor ${t.name} | prijzen & piloten`,
      description: `${t.tagline}. ${t.description} Vanaf ${price} ${exVat}, geleverd door geverifieerde piloten.`,
    },
    en: {
      title: `Drone pilot for ${t.name} | prices & pilots`,
      description: `${t.tagline}. ${t.description} From ${price} ${exVat}, delivered by verified pilots.`,
    },
    de: {
      title: `Drohnenpilot für ${t.name} | Preise & Piloten`,
      description: `${t.tagline}. ${t.description} Ab ${price} ${exVat}, geliefert von geprüften Piloten.`,
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/toepassingen/${seg.slug}`,
        "en-GB": `${SITE.url}/en/toepassingen/${seg.slug}`,
        de: `${SITE.url}/de/toepassingen/${seg.slug}`,
      },
    },
  };
}

export default async function SegmentHubPage({
  params,
}: {
  params: Promise<{ locale: string; segment: string }>;
}) {
  const { locale, segment } = await params;
  const seg = getSegment(segment);
  if (!seg) notFound();

  const country = getLocaleConfig(locale).country;
  const t = segmentText(seg.slug, locale);
  const pkg = packageText(seg.tier, locale);
  const u = ui(locale);
  const jur = getJurisdiction(country);

  const pilots = matchPilots(seg.slug, undefined, country).slice(0, 6);
  const count = availablePilots(seg.slug);

  const segShowcase = SHOWCASE.filter((i) => i.segment === seg.slug);
  const showcase = (segShowcase.length ? segShowcase : SHOWCASE).slice(0, 4);

  // Steden uit de markt van de actieve taal.
  const cities = CITIES.filter((c) => c.country === country).slice(0, 12);

  const firstWord = t.name.split(" ")[0];

  // Land-correcte certificeringshint (advanced-niveau + verzekerde dekking).
  const insured = formatCurrency(jur.insurance.minMajor, locale);
  const certHint = pick(locale, {
    nl: `${capabilityLabel(country, "advanced")} + ${insured} verzekerd`,
    en: `${capabilityLabel(country, "advanced")} + ${insured} insured`,
    de: `${capabilityLabel(country, "advanced")} + ${insured} versichert`,
  });

  const T = pick(locale, {
    nl: {
      pilot: "piloot",
      pilots: "piloten",
      availableSuffix: "beschikbaar",
      postRequest: "Plaats je aanvraag",
      viewPackages: "Bekijk pakketten",
      whatYouGetEyebrow: "Wat je krijgt",
      whatYouGetTitle: "Heldere deliverables, vooraf afgesproken",
      whatYouGetIntro:
        "Geen vage offertes. Per toepassing leveren we standaard wat je nodig hebt — zodat je appels met appels vergelijkt.",
      included: "Inbegrepen",
      gear: "Apparatuur",
      cert: "Certificering",
      pkgTitle: "Bijbehorend pakket",
      pkgLeadA: "Deze toepassing valt doorgaans onder ons",
      pkgLeadLink: "pakketniveau",
      pilotsEyebrow: "Beschikbare piloten",
      pilotsTitle: `Piloten voor ${t.name.toLowerCase()}`,
      pilotsIntro: "Geverifieerd, verzekerd en met aantoonbare ervaring in deze toepassing.",
      allPilots: "Alle piloten",
      examplesEyebrow: "Voorbeelden",
      examplesTitle: "Echt werk uit deze categorie",
      examplesIntro: "Een greep uit opgeleverde opdrachten van geverifieerde piloten.",
      citiesEyebrow: "Populaire steden",
      citiesTitle: `${t.name} bij jou in de buurt`,
      citiesIntro:
        "Bekijk beschikbaarheid en prijzen per stad. Altijd de dichtstbijzijnde piloot — geen reiskosten.",
      ctaTitle: `Klaar voor ${t.name.toLowerCase()}?`,
    },
    en: {
      pilot: "pilot",
      pilots: "pilots",
      availableSuffix: "available",
      postRequest: "Post your request",
      viewPackages: "View packages",
      whatYouGetEyebrow: "What you get",
      whatYouGetTitle: "Clear deliverables, agreed up front",
      whatYouGetIntro:
        "No vague quotes. For every service we deliver what you need as standard — so you compare like with like.",
      included: "Included",
      gear: "Equipment",
      cert: "Certification",
      pkgTitle: "Matching package",
      pkgLeadA: "This service typically falls under our",
      pkgLeadLink: "package tier",
      pilotsEyebrow: "Available pilots",
      pilotsTitle: `Pilots for ${t.name.toLowerCase()}`,
      pilotsIntro: "Verified, insured and with proven experience in this service.",
      allPilots: "All pilots",
      examplesEyebrow: "Examples",
      examplesTitle: "Real work from this category",
      examplesIntro: "A selection of completed jobs by verified pilots.",
      citiesEyebrow: "Popular cities",
      citiesTitle: `${t.name} near you`,
      citiesIntro:
        "Check availability and prices by city. Always the nearest pilot — no travel costs.",
      ctaTitle: `Ready for ${t.name.toLowerCase()}?`,
    },
    de: {
      pilot: "Pilot",
      pilots: "Piloten",
      availableSuffix: "verfügbar",
      postRequest: "Anfrage stellen",
      viewPackages: "Pakete ansehen",
      whatYouGetEyebrow: "Was Sie bekommen",
      whatYouGetTitle: "Klare Leistungen, vorab vereinbart",
      whatYouGetIntro:
        "Keine vagen Angebote. Pro Anwendung liefern wir standardmäßig, was Sie brauchen — damit Sie Vergleichbares vergleichen.",
      included: "Inklusive",
      gear: "Ausrüstung",
      cert: "Zertifizierung",
      pkgTitle: "Passendes Paket",
      pkgLeadA: "Diese Anwendung fällt in der Regel unter unsere",
      pkgLeadLink: "Paketstufe",
      pilotsEyebrow: "Verfügbare Piloten",
      pilotsTitle: `Piloten für ${t.name.toLowerCase()}`,
      pilotsIntro: "Geprüft, versichert und mit nachweislicher Erfahrung in dieser Anwendung.",
      allPilots: "Alle Piloten",
      examplesEyebrow: "Beispiele",
      examplesTitle: "Echte Arbeiten aus dieser Kategorie",
      examplesIntro: "Eine Auswahl abgeschlossener Aufträge geprüfter Piloten.",
      citiesEyebrow: "Beliebte Städte",
      citiesTitle: `${t.name} in Ihrer Nähe`,
      citiesIntro:
        "Verfügbarkeit und Preise je Stadt ansehen. Immer der nächstgelegene Pilot — keine Anfahrtskosten.",
      ctaTitle: `Bereit für ${t.name.toLowerCase()}?`,
    },
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 shadow-card">
              <SegmentIcon name={seg.icon} className="h-7 w-7" />
            </span>
            <span className="eyebrow mt-6">{t.name}</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {pick(locale, { nl: "Dronepiloot voor", en: "Drone pilot for", de: "Drohnenpilot für" })}{" "}
              <span className="text-brand-600">{t.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">{t.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-lg font-semibold text-brand-700">
                {u.from} {formatCurrency(seg.priceFrom, locale)}
                <span className="ml-2 text-xs uppercase tracking-wider text-ink-faint">{u.exVat}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {count} {count === 1 ? T.pilot : T.pilots} {T.availableSuffix}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localized(locale, `/aanvraag?segment=${seg.slug}`)} className="btn btn-lg btn-primary">
                {T.postRequest}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localized(locale, "/pakketten")} className="btn btn-lg btn-outline">
                {T.viewPackages}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat je krijgt ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow={T.whatYouGetEyebrow}
            title={T.whatYouGetTitle}
            intro={T.whatYouGetIntro}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card card-pad sm:col-span-2">
              <h3 className="font-bold">{T.included}</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {t.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card card-pad">
              <Wrench className="h-5 w-5 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-3 font-bold">{T.gear}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{seg.gear}</p>
            </div>
            <div className="card card-pad">
              <ShieldCheck className="h-5 w-5 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-3 font-bold">{T.cert}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{certHint}</p>
            </div>
            <div className="card card-pad sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">{T.pkgTitle}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  {T.pkgLeadA}{" "}
                  <Link href={localized(locale, "/pakketten")} className="link-underline">
                    {T.pkgLeadLink}
                  </Link>
                  {" "}({pkg.name}).
                </p>
              </div>
              <TierBadge tier={seg.tier} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Beschikbare piloten ── */}
      {pilots.length ? (
        <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading
                eyebrow={T.pilotsEyebrow}
                title={T.pilotsTitle}
                intro={T.pilotsIntro}
              />
              <Link href={localized(locale, "/piloten")} className="btn btn-md btn-outline">
                {T.allPilots}
              </Link>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {pilots.map((p) => (
                <PilotCard key={p.slug} pilot={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Voorbeelden ── */}
      {showcase.length ? (
        <section className="container-x py-16 sm:py-24">
          <SectionHeading
            eyebrow={T.examplesEyebrow}
            title={T.examplesTitle}
            intro={T.examplesIntro}
          />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {showcase.map((item) => (
              <ShowcaseCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Populaire steden ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow={T.citiesEyebrow}
            title={T.citiesTitle}
            intro={T.citiesIntro}
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={localized(locale, `/toepassingen/${seg.slug}/${c.slug}`)}
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-all hover:border-brand-300 hover:text-brand-700"
              >
                <span className="inline-flex items-center gap-2 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                  <span className="truncate">{firstWord} in {c.name}</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={T.ctaTitle}
        primaryHref={`/aanvraag?segment=${seg.slug}`}
      />
    </>
  );
}
