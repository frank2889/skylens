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
import { euro } from "@/lib/utils";

export function generateStaticParams() {
  // Volledig kruisproduct (alle toepassingen × alle steden) zodat elke gelinkte
  // SEO-pagina bestaat — vereist voor statische export (GitHub Pages).
  return SEGMENTS.flatMap((s) =>
    CITIES.map((c) => ({ segment: s.slug, stad: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string; stad: string }>;
}): Promise<Metadata> {
  const { segment, stad } = await params;
  const seg = getSegment(segment);
  const city = getCity(stad);
  if (!seg || !city) return { title: "Pagina niet gevonden" };
  return {
    title: `Dronepiloot ${seg.name} ${city.name} – vanaf ${euro(seg.priceFrom)}`,
    description: `${seg.name} in ${city.name} (${city.province}) door een geverifieerde, verzekerde dronepiloot. Vaste prijzen vanaf ${euro(seg.priceFrom)} ex BTW, levering binnen 48–72 uur.`,
  };
}

export default async function SegmentCityPage({
  params,
}: {
  params: Promise<{ segment: string; stad: string }>;
}) {
  const { segment, stad } = await params;
  const seg = getSegment(segment);
  const city = getCity(stad);
  if (!seg || !city) notFound();

  const pilots = matchPilots(seg.slug, city.slug).slice(0, 4);
  const count = availablePilots(seg.slug, city.slug);

  // Andere toepassingen in deze stad (interne links).
  const otherSegments = SEGMENTS.filter((s) => s.slug !== seg.slug).slice(0, 6);

  // Dezelfde toepassing in nabije steden (zelfde regio eerst).
  const nearbyCities = [
    ...CITIES.filter((c) => c.slug !== city.slug && c.region === city.region),
    ...CITIES.filter((c) => c.slug !== city.slug && c.region !== city.region),
  ].slice(0, 6);

  const firstWord = seg.name.split(" ")[0];

  const TRUST = [
    { icon: ShieldCheck, label: "RDW-geregistreerd" },
    { icon: Award, label: "A2 / STS-gecertificeerd" },
    { icon: Euro, label: "€1M verzekerd" },
    { icon: Clock, label: "Levering 48–72u" },
  ];

  const FAQ = [
    {
      q: `Wat kost een dronepiloot voor ${seg.name.toLowerCase()} in ${city.name}?`,
      a: `Een opdracht voor ${seg.name.toLowerCase()} in ${city.name} start vanaf ${euro(seg.priceFrom)} ex BTW. De exacte prijs hangt af van de omvang van de klus en het gewenste pakket. Je ziet vooraf wat je betaalt — geen verrassingen achteraf.`,
    },
    {
      q: `Hoe snel kan een piloot in ${city.name} ter plaatse zijn?`,
      a: `We matchen je doorgaans binnen enkele uren met een geverifieerde piloot in ${city.region} en rond ${city.name}. Omdat we altijd de dichtstbijzijnde geschikte piloot koppelen, betaal je geen reiskosten en zijn beelden meestal binnen 48–72 uur geleverd.`,
    },
    {
      q: `Mag een drone in ${city.name} (${city.province}) zomaar vliegen?`,
      a: `Niet overal — afhankelijk van luchtruim, bebouwing en eventuele no-fly zones gelden regels. Alle piloten op Skylens zijn EASA-gecertificeerd (${seg.certHint}) en regelen de benodigde toestemmingen en risicoanalyse, zodat er in ${city.name} altijd legaal en verzekerd wordt gevlogen.`,
    },
  ];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <nav className="flex flex-wrap items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-faint">
              <Link href="/toepassingen" className="hover:text-brand-600">Toepassingen</Link>
              <span>/</span>
              <Link href={`/toepassingen/${seg.slug}`} className="hover:text-brand-600">{seg.name}</Link>
              <span>/</span>
              <span className="text-ink-muted">{city.name}</span>
            </nav>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 shadow-card mt-6">
              <SegmentIcon name={seg.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Dronepiloot voor {seg.name} in{" "}
              <span className="text-brand-600">{city.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {seg.tagline} — geregeld in {city.name} en omgeving. Wij koppelen je aan een
              geverifieerde, verzekerde piloot in {city.region} ({city.province}) met de juiste
              apparatuur. Geen reiskosten, vaste prijzen en snelle oplevering.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-lg font-semibold text-brand-700">
                vanaf {euro(seg.priceFrom)}
                <span className="ml-2 text-xs uppercase tracking-wider text-ink-faint">ex BTW</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {count} {count === 1 ? "piloot" : "piloten"} in/rond {city.name}
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/aanvraag?segment=${seg.slug}&stad=${city.slug}`}
                className="btn btn-lg btn-primary"
              >
                Plaats je aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={`/toepassingen/${seg.slug}`} className="btn btn-lg btn-outline">
                Meer over {firstWord.toLowerCase()}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust block ── */}
      <section className="border-b border-line bg-paper-soft">
        <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-card">
                <t.icon className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <span className="text-sm font-semibold leading-tight">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Deliverables + prijs ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Wat je krijgt"
              title={`${seg.name} in ${city.name}, helder geleverd`}
              intro="Per toepassing leveren we standaard wat je nodig hebt — vooraf afgesproken, vergelijkbaar tussen piloten."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {seg.deliverables.map((d) => (
                <li key={d} className="card card-pad flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <aside className="card card-pad">
            <span className="eyebrow">Vaste prijs</span>
            <p className="mt-4 font-mono text-3xl font-bold text-brand-700">
              vanaf {euro(seg.priceFrom)}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-ink-faint">ex BTW</p>
            <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">Pakket</dt>
                <dd><TierBadge tier={seg.tier} /></dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">Apparatuur</dt>
                <dd className="text-right font-medium">{seg.gear}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">Certificering</dt>
                <dd className="text-right font-medium">{seg.certHint}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink-muted">Regio</dt>
                <dd className="text-right font-medium">{city.region}</dd>
              </div>
            </dl>
            <Link
              href={`/aanvraag?segment=${seg.slug}&stad=${city.slug}`}
              className="btn btn-md btn-primary mt-6 w-full"
            >
              Plaats je aanvraag
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
              eyebrow="Beschikbare piloten"
              title={`Piloten in en rond ${city.name}`}
              intro={`Geverifieerde, verzekerde piloten met ervaring in ${seg.name.toLowerCase()} — actief in ${city.region}.`}
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
          eyebrow="Veelgestelde vragen"
          title={`${seg.name} in ${city.name}`}
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
            <span className="eyebrow">Meer in {city.name}</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              Andere toepassingen in {city.name}
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {otherSegments.map((s) => (
                <Link
                  key={s.slug}
                  href={`/toepassingen/${s.slug}/${city.slug}`}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-all hover:border-brand-300 hover:text-brand-700"
                >
                  <span className="inline-flex items-center gap-2 truncate">
                    <SegmentIcon name={s.icon} className="h-4 w-4 shrink-0 text-brand-500" />
                    <span className="truncate">{s.name}</span>
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <span className="eyebrow">{firstWord} elders</span>
            <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
              {seg.name} in nabije steden
            </h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {nearbyCities.map((c) => (
                <Link
                  key={c.slug}
                  href={`/toepassingen/${seg.slug}/${c.slug}`}
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
        title={`Dronepiloot nodig in ${city.name}?`}
        intro={`Plaats gratis je aanvraag voor ${seg.name.toLowerCase()}. Binnen enkele uren matchen we je met geverifieerde piloten in en rond ${city.name}.`}
        primaryHref={`/aanvraag?segment=${seg.slug}&stad=${city.slug}`}
      />
    </>
  );
}
