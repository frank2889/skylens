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
import { CERT_LABELS, formatNumber } from "@/lib/utils";

export function generateStaticParams() {
  return PILOTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pilot = getPilot(slug);
  if (!pilot) return { title: "Piloot niet gevonden | Skylens" };
  const city = getCity(pilot.citySlug);
  return {
    title: `${pilot.name} · ${pilot.company}${city ? ` in ${city.name}` : ""} | Skylens`,
    description: `${pilot.name} (${pilot.company}) is een geverifieerde dronepiloot${
      city ? ` in ${city.name}` : ""
    }. ${pilot.rating.toFixed(1)} sterren uit ${pilot.reviewCount} reviews, ${
      pilot.jobsDone
    } opdrachten. Vraag direct aan via Skylens.`,
  };
}

export default async function PilotProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
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

  return (
    <>
      {/* ── Header ── */}
      <section className="container-x pt-8 sm:pt-12">
        <Link
          href="/piloten"
          className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-ink-muted transition-colors hover:text-brand-700"
        >
          <ArrowRight className="h-3.5 w-3.5 rotate-180 transition-transform group-hover:-translate-x-0.5" />
          Alle piloten
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
                  {city.name} · {pilot.serviceRadiusKm} km bereik
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" />
                Reageert {pilot.responseTime}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-brand-600" />
                {formatNumber(pilot.jobsDone)} opdrachten
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
              <h2 className="text-xl font-bold">Over {pilot.name.split(" ")[0]}</h2>
              <p className="mt-3 leading-relaxed text-ink-soft pretty">{pilot.bio}</p>
            </div>

            <div>
              <h2 className="text-xl font-bold">Specialisaties</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {segments.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/toepassingen/${s.slug}`}
                    className="pill transition-colors hover:border-brand-300 hover:text-brand-700"
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold">Apparatuur</h2>
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
              <h2 className="text-xl font-bold">Certificering & verzekering</h2>
              <div className="mt-4 card card-pad bg-paper-soft">
                <dl className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <FileBadge className="h-4 w-4 text-brand-600" />
                      EASA-certificering
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {pilot.certs.map((c) => (
                        <span key={c} className="badge-verify">
                          {CERT_LABELS[c]}
                        </span>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <ShieldCheck className="h-4 w-4 text-brand-600" />
                      Verzekering
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {pilot.insured
                        ? "Aansprakelijkheid tot €1M gedekt"
                        : "Niet opgegeven"}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <FileBadge className="h-4 w-4 text-brand-600" />
                      RDW-exploitantnummer
                    </dt>
                    <dd className="mt-2 font-mono text-sm text-ink-soft">
                      {pilot.operatorId}
                    </dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink-muted">
                      <ShieldCheck className="h-4 w-4 text-brand-600" />
                      Status
                    </dt>
                    <dd className="mt-2 text-sm text-ink-soft">
                      {pilot.verified
                        ? "Door Skylens geverifieerd"
                        : "Verificatie in behandeling"}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right · sticky request card */}
          <aside className="lg:sticky lg:top-24">
            <div className="card card-pad shadow-lift">
              <h2 className="text-xl font-bold">Vraag deze piloot aan</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                Gratis en vrijblijvend. We sturen je aanvraag rechtstreeks naar{" "}
                {pilot.name.split(" ")[0]} en andere passende piloten in de buurt.
              </p>

              <Link href={requestHref} className="btn btn-lg btn-primary mt-5 w-full">
                Plaats je aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>

              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line pt-6">
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Beoordeling
                  </dt>
                  <dd className="mt-1.5">
                    <Stars rating={pilot.rating} count={pilot.reviewCount} />
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Opdrachten
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {formatNumber(pilot.jobsDone)}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Reactietijd
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {pilot.responseTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                    Bereik
                  </dt>
                  <dd className="mt-1.5 font-display text-lg font-bold">
                    {pilot.serviceRadiusKm} km
                  </dd>
                </div>
              </dl>

              <p className="mt-6 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-ink-muted">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-600" />
                {pilot.insured ? "Verzekerd · " : ""}
                {pilot.verified ? "geverifieerd door Skylens" : "verificatie in behandeling"}
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Recent werk ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Portfolio"
            title="Recent werk"
            intro={`Een greep uit recente opdrachten van ${pilot.name.split(" ")[0]} via Skylens.`}
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
            eyebrow="Reviews"
            title={`Wat opdrachtgevers zeggen`}
            intro={`${pilot.rating.toFixed(1)} gemiddeld uit ${pilot.reviewCount} beoordelingen.`}
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
        title={`Werk samen met ${pilot.name.split(" ")[0]}`}
        intro="Plaats gratis je aanvraag. Binnen enkele uren krijg je een reactie van deze piloot en andere geverifieerde matches in de buurt."
        primaryHref={requestHref}
        primaryLabel="Plaats je aanvraag"
      />
    </>
  );
}
