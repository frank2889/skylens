import type { Metadata } from "next";
import { ShieldCheck, Euro, Clock, Users, BadgeCheck } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { Eyebrow, Stars } from "@/components/bits";
import { STATS } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Plaats je aanvraag · gratis matches met geverifieerde dronepiloten",
  description:
    "Plaats gratis en vrijblijvend je aanvraag. Binnen enkele uren koppelen we je aan geverifieerde, verzekerde dronepiloten bij jou in de buurt.",
};

const REASSURANCE = [
  {
    icon: BadgeCheck,
    title: "Geverifieerd & verzekerd",
    text: "Elke piloot is gecheckt op RDW-registratie, EASA-certificaat en €1M aansprakelijkheidsverzekering.",
  },
  {
    icon: Euro,
    title: "Volledig gratis & vrijblijvend",
    text: "Geen kosten, geen account nodig. Je beslist pas iets als je een piloot kiest.",
  },
  {
    icon: Clock,
    title: "Snel een match",
    text: "Doorgaans binnen enkele uren reactie, beelden geleverd binnen 48–72 uur.",
  },
];

const NEXT_STEPS = [
  "Je aanvraag wordt direct gematcht met passende piloten in jouw regio.",
  "Geïnteresseerde piloten reageren met hun profiel, prijs en beschikbaarheid.",
  "Vergelijk profielen en reviews, kies je piloot en plan de vlucht in.",
];

export default async function AanvraagPage({
  searchParams,
}: {
  searchParams: Promise<{ segment?: string; stad?: string }>;
}) {
  const { segment, stad } = await searchParams;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow>Aanvraag · gratis &amp; vrijblijvend</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Plaats je aanvraag
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              Vertel ons in een paar stappen wat je nodig hebt. Wij koppelen je
              binnen enkele uren aan geverifieerde, verzekerde piloten bij jou in
              de buurt — gratis en zonder verplichtingen.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
          {/* Form */}
          <div className="order-2 lg:order-1">
            <RequestForm initialSegment={segment} initialCity={stad} />
          </div>

          {/* Reassurance panel */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="card card-pad bg-paper-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold">Waarom via Skylens</h2>
              <dl className="mt-6 grid gap-5">
                {REASSURANCE.map((r) => (
                  <div key={r.title} className="flex gap-3.5">
                    <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
                    <div>
                      <dt className="font-semibold">{r.title}</dt>
                      <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{r.text}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              <div className="mt-7 border-t border-line pt-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Users className="h-4 w-4 text-brand-600" />
                  Wat er daarna gebeurt
                </h3>
                <ol className="mt-4 grid gap-3">
                  {NEXT_STEPS.map((s, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-100 font-mono text-xs font-semibold text-brand-700">
                        {i + 1}
                      </span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-7 flex items-center gap-3 border-t border-line pt-6">
                <Stars rating={STATS.avgRating} className="text-lg" />
                <span className="text-sm text-ink-muted">
                  Gemiddelde beoordeling over {STATS.activePilots.toLocaleString("nl-NL")}+ piloten
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
