import type { Metadata } from "next";
import { Camera, ShieldCheck, Repeat, Sparkles } from "lucide-react";
import { ShowcaseGallery } from "@/components/showcase-gallery";
import { SectionHeading } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { SHOWCASE, STATS } from "@/lib/seed";
import { formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Showcase · Echt werk van geverifieerde dronepiloten",
  description:
    "Bekijk luchtfoto's en -video van geverifieerde, verzekerde dronepiloten in Nederland. Filter op toepassing, pakket en type. Elke opdracht voegt nieuw werk toe aan de showcase.",
};

const FLYWHEEL = [
  {
    icon: Camera,
    title: "Piloten leveren hun beste werk",
    text: "Bij elke opdracht kunnen piloten geselecteerde beelden licentiëren voor de showcase. Zij houden hun rechten; wij krijgen tonen-toestemming.",
  },
  {
    icon: Sparkles,
    title: "Klanten zien echt resultaat",
    text: "Geen stockbeelden of renders. Alleen opgeleverd werk uit echte opdrachten, gekoppeld aan de piloot en de toepassing.",
  },
  {
    icon: Repeat,
    title: "De vliegende start groeit mee",
    text: "Meer opdrachten betekent meer beelden, meer vertrouwen en meer aanvragen. De showcase wordt sterker bij elke vlucht.",
  },
];

export default function ShowcasePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-brand-200/40 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Showcase</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              Echt werk van{" "}
              <span className="text-brand-600">geverifieerde piloten</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              Geen stockbeelden. Elke opdracht voegt nieuw werk toe aan onze showcase — van
              grachtenpanden tot zonneparken. Piloten licentiëren hun beste beelden, klanten
              zien vooraf wat ze kunnen verwachten. Zo versterkt elke vlucht de vliegwiel-werking
              van het platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                {formatNumber(STATS.activePilots)} geverifieerde piloten
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-brand-600" />
                {STATS.citiesCovered} steden gedekt
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Galerij ── */}
      <section className="container-x pb-16 sm:pb-24">
        <ShowcaseGallery items={SHOWCASE} />
      </section>

      {/* ── Footage-vliegwiel ── */}
      <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Het footage-vliegwiel"
            title="Hoe deze showcase blijft groeien"
            intro="Piloten licentiëren hun sterkste beelden aan Skylens. Dat levert hen zichtbaarheid en nieuwe leads op, en geeft klanten een eerlijk beeld van wat geverifieerde piloten leveren."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FLYWHEEL.map((step) => (
              <div key={step.title} className="card card-pad">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                  <step.icon className="h-6 w-6" strokeWidth={1.7} />
                </span>
                <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Wil je dit ook?"
        intro="Plaats gratis je aanvraag. Binnen enkele uren matchen we je met geverifieerde piloten die werk leveren zoals je hierboven ziet."
        primaryHref="/aanvraag"
        primaryLabel="Plaats je aanvraag"
      />
    </>
  );
}
