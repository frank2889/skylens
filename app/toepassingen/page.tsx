import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SegmentCard } from "@/components/cards";
import { SectionHeading } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { SEGMENTS } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Toepassingen — voor elke klus de juiste dronepiloot",
  description:
    "Van vastgoedfoto's tot LiDAR-survey: ontdek waar je een geverifieerde, verzekerde dronepiloot voor inhuurt. Vaste prijzen, levering binnen 48–72 uur.",
};

export default function ToepassingenPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Toepassingen</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              Voor elke klus de juiste{" "}
              <span className="text-brand-600">piloot &amp; drone</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              Of je nu een woning sneller wilt verkopen, een dak wilt inspecteren zonder steiger
              of centimeter-nauwkeurige meetdata nodig hebt — wij koppelen je aan een
              geverifieerde, verzekerde piloot met de juiste apparatuur en certificering.
            </p>
          </div>
        </div>
      </section>

      {/* ── Segments grid ── */}
      <section className="container-x py-16 sm:py-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SEGMENTS.map((s) => (
            <SegmentCard key={s.slug} segment={s} />
          ))}
        </div>
      </section>

      {/* ── Niet gevonden? CTA ── */}
      <section className="container-x pb-16 sm:pb-24">
        <div className="card relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <span className="eyebrow">Niet gevonden?</span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                Staat jouw toepassing er niet tussen?
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                Onze piloten vliegen voor veel meer dan deze categorieën. Beschrijf je klus en wij
                kijken wie er past — gratis en vrijblijvend, geen account nodig.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/aanvraag" className="btn btn-lg btn-primary">
                Plaats toch je aanvraag
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
