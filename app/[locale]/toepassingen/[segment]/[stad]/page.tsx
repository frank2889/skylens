import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, MapPin, ShieldCheck, Euro, Clock, Award } from "lucide-react";
import { PilotCard } from "@/components/cards";
import { SectionHeading, TierBadge } from "@/components/bits";
import { SegmentIcon } from "@/components/segment-icon";
import { CTASection } from "@/components/cta";
import { SEGMENTS, CITIES, getSegment, getCity } from "@/lib/catalog";
import { matchPilots, availablePilots } from "@/lib/matching";
import { formatCurrency } from "@/lib/utils";
import { LOCALES, getLocaleConfig } from "@/lib/i18n/config";
import { localized, pick } from "@/lib/i18n/messages";
import { segmentText, ui } from "@/lib/i18n/catalog-i18n";
import { getJurisdiction, capabilityLabel } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  // Per-markt SEO-grid: elke taal bouwt alleen de steden van zijn eigen land.
  return LOCALES.flatMap((locale) => {
    const country = getLocaleConfig(locale).country;
    const cities = CITIES.filter((c) => c.country === country);
    return SEGMENTS.flatMap((s) => cities.map((c) => ({ locale, segment: s.slug, stad: c.slug })));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; segment: string; stad: string }>;
}): Promise<Metadata> {
  const { locale, segment, stad } = await params;
  const seg = getSegment(segment);
  const city = getCity(stad);
  if (!seg || !city) {
    return {
      title: pick(locale, {
        nl: "Pagina niet gevonden",
        en: "Page not found",
        de: "Seite nicht gefunden",
      }),
    };
  }
  const t = segmentText(seg.slug, locale);
  const price = formatCurrency(seg.priceFrom, locale);
  const exVat = ui(locale).exVat;
  const M = pick(locale, {
    nl: {
      title: `Dronepiloot ${t.name} ${city.name} – ${ui("nl").from} ${price}`,
      description: `${t.name} in ${city.name} (${city.province}) door een geverifieerde, verzekerde dronepiloot. Vaste prijzen vanaf ${price} ${exVat}, levering binnen 48–72 uur.`,
    },
    en: {
      title: `Drone pilot ${t.name} ${city.name} – from ${price}`,
      description: `${t.name} in ${city.name} (${city.province}) by a verified, insured drone pilot. Fixed prices from ${price} ${exVat}, delivery within 48–72 hours.`,
    },
    de: {
      title: `Drohnenpilot ${t.name} ${city.name} – ab ${price}`,
      description: `${t.name} in ${city.name} (${city.province}) durch einen geprüften, versicherten Drohnenpiloten. Festpreise ab ${price} ${exVat}, Lieferung in 48–72 Stunden.`,
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/toepassingen/${seg.slug}/${city.slug}`,
        "en-GB": `${SITE.url}/en/toepassingen/${seg.slug}/${city.slug}`,
        de: `${SITE.url}/de/toepassingen/${seg.slug}/${city.slug}`,
      },
    },
  };
}

export default async function SegmentCityPage({
  params,
}: {
  params: Promise<{ locale: string; segment: string; stad: string }>;
}) {
  const { locale, segment, stad } = await params;
  const seg = getSegment(segment);
  const city = getCity(stad);
  if (!seg || !city) notFound();

  const t = segmentText(seg.slug, locale);
  const u = ui(locale);
  const jur = getJurisdiction(city.country);
  const price = formatCurrency(seg.priceFrom, locale);
  const insured = formatCurrency(jur.insurance.minMajor, locale);

  const pilots = matchPilots(seg.slug, city.slug).slice(0, 4);
  const count = availablePilots(seg.slug, city.slug);

  // Andere toepassingen in deze stad (interne links).
  const otherSegments = SEGMENTS.filter((s) => s.slug !== seg.slug).slice(0, 6);

  // Dezelfde toepassing in nabije steden (zelfde regio eerst), beperkt tot dezelfde markt.
  const sameMarket = CITIES.filter((c) => c.country === city.country && c.slug !== city.slug);
  const nearbyCities = [
    ...sameMarket.filter((c) => c.region === city.region),
    ...sameMarket.filter((c) => c.region !== city.region),
  ].slice(0, 6);

  const firstWord = t.name.split(" ")[0];

  const TRUST = [
    { icon: ShieldCheck, label: pick(locale, {
      nl: `${jur.authority.short}-geregistreerd`,
      en: `${jur.authority.short}-registered`,
      de: `${jur.authority.short}-registriert`,
    }) },
    { icon: Award, label: pick(locale, {
      nl: `${capabilityLabel(city.country, "advanced")} / ${capabilityLabel(city.country, "specific")}`,
      en: `${capabilityLabel(city.country, "advanced")} / ${capabilityLabel(city.country, "specific")}`,
      de: `${capabilityLabel(city.country, "advanced")} / ${capabilityLabel(city.country, "specific")}`,
    }) },
    { icon: Euro, label: pick(locale, {
      nl: `${insured} verzekerd`,
      en: `${insured} insured`,
      de: `${insured} versichert`,
    }) },
    { icon: Clock, label: pick(locale, {
      nl: "Levering 48–72u",
      en: "Delivery 48–72h",
      de: "Lieferung 48–72h",
    }) },
  ];

  const certHint = pick(locale, {
    nl: `o.a. ${capabilityLabel(city.country, "advanced")} via ${jur.authority.short}`,
    en: `incl. ${capabilityLabel(city.country, "advanced")} via ${jur.authority.short}`,
    de: `u.a. ${capabilityLabel(city.country, "advanced")} über ${jur.authority.short}`,
  });

  const FAQ = pick(locale, {
    nl: [
      {
        q: `Wat kost een dronepiloot voor ${t.name.toLowerCase()} in ${city.name}?`,
        a: `Een opdracht voor ${t.name.toLowerCase()} in ${city.name} start ${u.from} ${price} ${u.exVat}. De exacte prijs hangt af van de omvang van de klus en het gewenste pakket. Je ziet vooraf wat je betaalt — geen verrassingen achteraf.`,
      },
      {
        q: `Hoe snel kan een piloot in ${city.name} ter plaatse zijn?`,
        a: `We matchen je doorgaans binnen enkele uren met een geverifieerde piloot in ${city.region} en rond ${city.name}. Omdat we altijd de dichtstbijzijnde geschikte piloot koppelen, betaal je geen reiskosten en zijn beelden meestal binnen 48–72 uur geleverd.`,
      },
      {
        q: `Mag een drone in ${city.name} (${city.province}) zomaar vliegen?`,
        a: `Niet overal — afhankelijk van luchtruim, bebouwing en eventuele no-fly zones gelden regels. Alle piloten op Skylens zijn gecertificeerd (${certHint}) en regelen de benodigde toestemmingen en risicoanalyse, zodat er in ${city.name} altijd legaal en verzekerd wordt gevlogen.`,
      },
    ],
    en: [
      {
        q: `What does a drone pilot for ${t.name.toLowerCase()} in ${city.name} cost?`,
        a: `A job for ${t.name.toLowerCase()} in ${city.name} starts from ${price} ${u.exVat}. The exact price depends on the scope of the work and the package you choose. You see what you pay up front — no surprises afterwards.`,
      },
      {
        q: `How quickly can a pilot be on site in ${city.name}?`,
        a: `We typically match you within hours with a verified pilot in ${city.region} and around ${city.name}. Because we always assign the nearest suitable pilot, you pay no travel costs and footage is usually delivered within 48–72 hours.`,
      },
      {
        q: `Are drones allowed to fly freely in ${city.name} (${city.province})?`,
        a: `Not everywhere — rules apply depending on airspace, built-up areas and any no-fly zones. Every pilot on Skylens is certified (${certHint}) and arranges the required permissions and risk assessment, so flights in ${city.name} are always legal and insured.`,
      },
    ],
    de: [
      {
        q: `Was kostet ein Drohnenpilot für ${t.name.toLowerCase()} in ${city.name}?`,
        a: `Ein Auftrag für ${t.name.toLowerCase()} in ${city.name} beginnt ab ${price} ${u.exVat}. Der genaue Preis hängt vom Umfang des Auftrags und dem gewählten Paket ab. Sie sehen vorab, was Sie zahlen — keine Überraschungen im Nachhinein.`,
      },
      {
        q: `Wie schnell kann ein Pilot in ${city.name} vor Ort sein?`,
        a: `In der Regel vermitteln wir Sie innerhalb von Stunden an einen geprüften Piloten in ${city.region} und rund um ${city.name}. Da wir immer den nächstgelegenen geeigneten Piloten zuweisen, zahlen Sie keine Anfahrtskosten und die Aufnahmen werden meist innerhalb von 48–72 Stunden geliefert.`,
      },
      {
        q: `Darf eine Drohne in ${city.name} (${city.province}) einfach fliegen?`,
        a: `Nicht überall — je nach Luftraum, Bebauung und etwaigen Flugverbotszonen gelten Regeln. Alle Piloten auf Skylens sind zertifiziert (${certHint}) und kümmern sich um die erforderlichen Genehmigungen und die Risikoanalyse, sodass in ${city.name} stets legal und versichert geflogen wird.`,
      },
    ],
  });

  const T = pick(locale, {
    nl: {
      breadcrumb: "Toepassingen",
      heroLeadA: "Dronepiloot voor",
      heroIn: "in",
      heroIntro: `${t.tagline} — geregeld in ${city.name} en omgeving. Wij koppelen je aan een geverifieerde, verzekerde piloot in ${city.region} (${city.province}) met de juiste apparatuur. Geen reiskosten, vaste prijzen en snelle oplevering.`,
      pilot: "piloot",
      pilots: "piloten",
      inAround: `in/rond ${city.name}`,
      postRequest: "Plaats je aanvraag",
      moreAbout: `Meer over ${firstWord.toLowerCase()}`,
      deliverEyebrow: "Wat je krijgt",
      deliverTitle: `${t.name} in ${city.name}, helder geleverd`,
      deliverIntro:
        "Per toepassing leveren we standaard wat je nodig hebt — vooraf afgesproken, vergelijkbaar tussen piloten.",
      fixedPrice: "Vaste prijs",
      pkg: "Pakket",
      gear: "Apparatuur",
      cert: "Certificering",
      region: "Regio",
      pilotsTitle: `Piloten in en rond ${city.name}`,
      pilotsIntro: `Geverifieerde, verzekerde piloten met ervaring in ${t.name.toLowerCase()} — actief in ${city.region}.`,
      faqEyebrow: "Veelgestelde vragen",
      faqTitle: `${t.name} in ${city.name}`,
      moreInCity: `Meer in ${city.name}`,
      otherSegTitle: `Andere toepassingen in ${city.name}`,
      elsewhereEyebrow: `${firstWord} elders`,
      elsewhereTitle: `${t.name} in nabije steden`,
      ctaTitle: `Dronepiloot nodig in ${city.name}?`,
      ctaIntro: `Plaats gratis je aanvraag voor ${t.name.toLowerCase()}. Binnen enkele uren matchen we je met geverifieerde piloten in en rond ${city.name}.`,
    },
    en: {
      breadcrumb: "Services",
      heroLeadA: "Drone pilot for",
      heroIn: "in",
      heroIntro: `${t.tagline} — sorted in ${city.name} and the surrounding area. We match you with a verified, insured pilot in ${city.region} (${city.province}) with the right kit. No travel costs, fixed prices and fast delivery.`,
      pilot: "pilot",
      pilots: "pilots",
      inAround: `in/around ${city.name}`,
      postRequest: "Post your request",
      moreAbout: `More on ${firstWord.toLowerCase()}`,
      deliverEyebrow: "What you get",
      deliverTitle: `${t.name} in ${city.name}, clearly delivered`,
      deliverIntro:
        "For every service we deliver what you need as standard — agreed up front, comparable across pilots.",
      fixedPrice: "Fixed price",
      pkg: "Package",
      gear: "Equipment",
      cert: "Certification",
      region: "Region",
      pilotsTitle: `Pilots in and around ${city.name}`,
      pilotsIntro: `Verified, insured pilots with experience in ${t.name.toLowerCase()} — active in ${city.region}.`,
      faqEyebrow: "Frequently asked questions",
      faqTitle: `${t.name} in ${city.name}`,
      moreInCity: `More in ${city.name}`,
      otherSegTitle: `Other services in ${city.name}`,
      elsewhereEyebrow: `${firstWord} elsewhere`,
      elsewhereTitle: `${t.name} in nearby cities`,
      ctaTitle: `Need a drone pilot in ${city.name}?`,
      ctaIntro: `Post your request for ${t.name.toLowerCase()} for free. Within hours we match you with verified pilots in and around ${city.name}.`,
    },
    de: {
      breadcrumb: "Anwendungen",
      heroLeadA: "Drohnenpilot für",
      heroIn: "in",
      heroIntro: `${t.tagline} — geregelt in ${city.name} und Umgebung. Wir vermitteln Ihnen einen geprüften, versicherten Piloten in ${city.region} (${city.province}) mit der passenden Ausrüstung. Keine Anfahrtskosten, Festpreise und schnelle Lieferung.`,
      pilot: "Pilot",
      pilots: "Piloten",
      inAround: `in/um ${city.name}`,
      postRequest: "Anfrage stellen",
      moreAbout: `Mehr zu ${firstWord.toLowerCase()}`,
      deliverEyebrow: "Was Sie bekommen",
      deliverTitle: `${t.name} in ${city.name}, klar geliefert`,
      deliverIntro:
        "Pro Anwendung liefern wir standardmäßig, was Sie brauchen — vorab vereinbart, vergleichbar zwischen Piloten.",
      fixedPrice: "Festpreis",
      pkg: "Paket",
      gear: "Ausrüstung",
      cert: "Zertifizierung",
      region: "Region",
      pilotsTitle: `Piloten in und um ${city.name}`,
      pilotsIntro: `Geprüfte, versicherte Piloten mit Erfahrung in ${t.name.toLowerCase()} — aktiv in ${city.region}.`,
      faqEyebrow: "Häufig gestellte Fragen",
      faqTitle: `${t.name} in ${city.name}`,
      moreInCity: `Mehr in ${city.name}`,
      otherSegTitle: `Weitere Anwendungen in ${city.name}`,
      elsewhereEyebrow: `${firstWord} anderswo`,
      elsewhereTitle: `${t.name} in nahegelegenen Städten`,
      ctaTitle: `Drohnenpilot in ${city.name} gesucht?`,
      ctaIntro: `Stellen Sie kostenlos Ihre Anfrage für ${t.name.toLowerCase()}. Innerhalb von Stunden vermitteln wir Ihnen geprüfte Piloten in und um ${city.name}.`,
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
            <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-faint">
              <Link href={localized(locale, "/toepassingen")} className="hover:text-brand-600">{T.breadcrumb}</Link>
              <span>/</span>
              <Link href={localized(locale, `/toepassingen/${seg.slug}`)} className="hover:text-brand-600">{t.name}</Link>
              <span>/</span>
              <span className="text-ink-muted">{city.name}</span>
            </nav>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 shadow-card mt-6">
              <SegmentIcon name={seg.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.heroLeadA} {t.name} {T.heroIn}{" "}
              <span className="text-brand-600">{city.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.heroIntro}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-lg font-semibold text-brand-700">
                {u.from} {price}
                <span className="ml-2 text-xs uppercase tracking-wider text-ink-faint">{u.exVat}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {count} {count === 1 ? T.pilot : T.pilots} {T.inAround}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={localized(locale, `/aanvraag?segment=${seg.slug}&stad=${city.slug}`)}
                className="btn btn-lg btn-primary"
              >
                {T.postRequest}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localized(locale, `/toepassingen/${seg.slug}`)} className="btn btn-lg btn-outline">
                {T.moreAbout}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust block ── */}
      <section className="border-b border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {TRUST.map((trust) => (
            <div key={trust.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                <trust.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="text-sm font-semibold leading-tight">{trust.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deliverables + prijs ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow={T.deliverEyebrow}
              title={T.deliverTitle}
              intro={T.deliverIntro}
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {t.deliverables.map((d) => (
                <li key={d} className="card card-pad flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <aside className="card card-pad">
            <span className="eyebrow">{T.fixedPrice}</span>
            <p className="mt-4 font-mono text-3xl font-bold text-brand-700">
              {u.from} {price}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">{u.exVat}</p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">{T.pkg}</dt>
                <dd><TierBadge tier={seg.tier} /></dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">{T.gear}</dt>
                <dd className="text-right font-medium">{seg.gear}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">{T.cert}</dt>
                <dd className="text-right font-medium">{certHint}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">{T.region}</dt>
                <dd className="text-right font-medium">{city.region}</dd>
              </div>
            </dl>
            <Link
              href={localized(locale, `/aanvraag?segment=${seg.slug}&stad=${city.slug}`)}
              className="btn btn-md btn-primary mt-6 w-full"
            >
              {T.postRequest}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>

      {/* ── Beschikbare piloten ── */}
      {pilots.length ? (
        <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
          <div className="container-x">
            <SectionHeading
              eyebrow={pick(locale, { nl: "Beschikbare piloten", en: "Available pilots", de: "Verfügbare Piloten" })}
              title={T.pilotsTitle}
              intro={T.pilotsIntro}
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pilots.map((p) => (
                <PilotCard key={p.slug} pilot={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── FAQ ── */}
      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          center
          eyebrow={T.faqEyebrow}
          title={T.faqTitle}
        />
        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line">
          {FAQ.map((f) => (
            <div key={f.q} className="py-6">
              <h3 className="font-bold">{f.q}</h3>
              <p className="mt-2 leading-relaxed text-ink-muted pretty">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Interne links ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <span className="eyebrow">{T.moreInCity}</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {T.otherSegTitle}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {otherSegments.map((s) => (
                <Link
                  key={s.slug}
                  href={localized(locale, `/toepassingen/${s.slug}/${city.slug}`)}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-all hover:border-brand-300 hover:text-brand-700"
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <SegmentIcon name={s.icon} className="h-4 w-4 shrink-0 text-brand-500" />
                    <span className="truncate">{segmentText(s.slug, locale).name}</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">{T.elsewhereEyebrow}</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {T.elsewhereTitle}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {nearbyCities.map((c) => (
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
        </div>
      </section>

      <CTASection
        title={T.ctaTitle}
        intro={T.ctaIntro}
        primaryHref={`/aanvraag?segment=${seg.slug}&stad=${city.slug}`}
      />
    </>
  );
}
