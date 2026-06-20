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
import { euro } from "@/lib/utils";

export function generateStaticParams() {
  return SEGMENTS.map((s) => ({ segment: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const seg = getSegment(segment);
  if (!seg) return { title: "Toepassing niet gevonden" };
  return {
    title: `Dronepiloot voor ${seg.name} | prijzen & piloten`,
    description: `${seg.tagline}. ${seg.description} Vanaf ${euro(seg.priceFrom)} ex BTW, geleverd door geverifieerde piloten.`,
  };
}

export default async function SegmentHubPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const seg = getSegment(segment);
  if (!seg) notFound();

  const pilots = matchPilots(seg.slug).slice(0, 6);
  const count = availablePilots(seg.slug);

  const segShowcase = SHOWCASE.filter((i) => i.segment === seg.slug);
  const showcase = (segShowcase.length ? segShowcase : SHOWCASE).slice(0, 4);

  const cities = CITIES.slice(0, 12);

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
            <span className="eyebrow mt-6">{seg.name}</span>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Dronepiloot voor <span className="text-brand-600">{seg.name}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">{seg.description}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="font-mono text-lg font-semibold text-brand-700">
                vanaf {euro(seg.priceFrom)}
                <span className="ml-2 text-xs uppercase tracking-wider text-ink-faint">ex BTW</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-sm text-ink-muted">
                <span className="h-2 w-2 rounded-full bg-brand-500" />
                {count} {count === 1 ? "piloot" : "piloten"} beschikbaar
              </span>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/aanvraag?segment=${seg.slug}`} className="btn btn-lg btn-primary">
                Plaats je aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pakketten" className="btn btn-lg btn-outline">
                Bekijk pakketten
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Wat je krijgt ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Wat je krijgt"
            title="Heldere deliverables, vooraf afgesproken"
            intro="Geen vage offertes. Per toepassing leveren we standaard wat je nodig hebt — zodat je appels met appels vergelijkt."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="card card-pad sm:col-span-2">
              <h3 className="font-bold">Inbegrepen</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {seg.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.2} />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card card-pad">
              <Wrench className="h-5 w-5 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-3 font-bold">Apparatuur</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{seg.gear}</p>
            </div>
            <div className="card card-pad">
              <ShieldCheck className="h-5 w-5 text-brand-600" strokeWidth={1.7} />
              <h3 className="mt-3 font-bold">Certificering</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{seg.certHint}</p>
            </div>
            <div className="card card-pad sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold">Bijbehorend pakket</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                  Deze toepassing valt doorgaans onder ons {" "}
                  <Link href="/pakketten" className="link-underline">
                    pakketniveau
                  </Link>
                  .
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
                eyebrow="Beschikbare piloten"
                title={`Piloten voor ${seg.name.toLowerCase()}`}
                intro="Geverifieerd, verzekerd en met aantoonbare ervaring in deze toepassing."
              />
              <Link href="/piloten" className="btn btn-md btn-outline">
                Alle piloten
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
            eyebrow="Voorbeelden"
            title="Echt werk uit deze categorie"
            intro="Een greep uit opgeleverde opdrachten van geverifieerde piloten."
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
            eyebrow="Populaire steden"
            title={`${seg.name} bij jou in de buurt`}
            intro="Bekijk beschikbaarheid en prijzen per stad. Altijd de dichtstbijzijnde piloot — geen reiskosten."
          />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {cities.map((c) => (
              <Link
                key={c.slug}
                href={`/toepassingen/${seg.slug}/${c.slug}`}
                className="group flex items-center justify-between gap-2 rounded-xl border border-line bg-white px-4 py-3 text-sm font-medium transition-all hover:border-brand-300 hover:text-brand-700"
              >
                <span className="inline-flex items-center gap-2 truncate">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                  <span className="truncate">{seg.name.split(" ")[0]} in {c.name}</span>
                </span>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Klaar voor ${seg.name.toLowerCase()}?`}
        primaryHref={`/aanvraag?segment=${seg.slug}`}
      />
    </>
  );
}
