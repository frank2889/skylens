import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Mail, Clock, Users, ArrowRight } from "lucide-react";
import { PilotCard } from "@/components/cards";
import { Eyebrow } from "@/components/bits";
import { matchPilots } from "@/lib/matching";
import { getSegment, getCity } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Aanvraag ontvangen · Skylens",
  description:
    "Bedankt voor je aanvraag. We koppelen je aan geverifieerde dronepiloten bij jou in de buurt.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    icon: Users,
    title: "We matchen je aanvraag",
    text: "Je aanvraag gaat direct naar geverifieerde piloten in jouw regio met de juiste apparatuur en certificering.",
  },
  {
    icon: Mail,
    title: "Je ontvangt reacties",
    text: "Geïnteresseerde piloten reageren met hun profiel, een vaste prijs en hun beschikbaarheid. Houd je inbox in de gaten.",
  },
  {
    icon: Clock,
    title: "Kies & vlieg",
    text: "Vergelijk profielen en reviews, kies je piloot en plan de vlucht. Beelden doorgaans binnen 48–72 uur.",
  },
];

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string; stad?: string }>;
}) {
  const { segment, stad } = await searchParams;

  const seg = segment ? getSegment(segment) : undefined;
  const city = stad ? getCity(stad) : undefined;
  const matches = seg ? matchPilots(seg.slug, city?.slug).slice(0, 4) : [];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 top-0 h-[380px] w-[380px] rounded-full bg-brand-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lift">
              <CheckCircle2 className="h-7 w-7" strokeWidth={1.8} />
            </span>
            <Eyebrow className="mt-7">Aanvraag verzonden</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Aanvraag ontvangen
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {seg && city ? (
                <>
                  Bedankt — je aanvraag voor{" "}
                  <strong className="font-semibold text-ink">{seg.name.toLowerCase()}</strong> in{" "}
                  <strong className="font-semibold text-ink">{city.name}</strong> staat klaar. We
                  koppelen je nu aan geverifieerde, verzekerde piloten bij jou in de buurt.
                </>
              ) : seg ? (
                <>
                  Bedankt — je aanvraag voor{" "}
                  <strong className="font-semibold text-ink">{seg.name.toLowerCase()}</strong> staat
                  klaar. We koppelen je nu aan geverifieerde, verzekerde piloten.
                </>
              ) : (
                <>
                  Bedankt voor je aanvraag. We koppelen je nu aan geverifieerde, verzekerde piloten
                  bij jou in de buurt. Houd je inbox in de gaten — je hoort snel van ons.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Next steps */}
      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <div key={s.title} className="card card-pad">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  Stap {i + 1}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Matched pilots */}
      {matches.length > 0 ? (
        <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <Eyebrow>Jouw matches</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                Deze piloten passen bij je aanvraag
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                Een eerste selectie op basis van toepassing, regio en verificatie. Je hoort van hen
                zodra je aanvraag is doorgezet.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {matches.map((p) => (
                <PilotCard key={p.slug} pilot={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Onward links */}
      <section className="container-x py-16 sm:py-24">
        <div className="card relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">In de tussentijd</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted pretty">
                Bekijk echt werk van geverifieerde piloten of verken het volledige aanbod terwijl
                wij je aanvraag matchen.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/showcase" className="btn btn-lg btn-dark">
                Bekijk de showcase
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/piloten" className="btn btn-lg btn-outline">
                Alle piloten
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
