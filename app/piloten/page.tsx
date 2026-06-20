import type { Metadata } from "next";
import { PilotFilter } from "@/components/pilot-filter";
import { CTASection } from "@/components/cta";
import { PILOTS } from "@/lib/seed";

export const metadata: Metadata = {
  title: "Piloten · Vind een geverifieerde dronepiloot | Skylens",
  description:
    "Blader door geverifieerde, verzekerde en EASA-gecertificeerde dronepiloten in heel Nederland. Filter op toepassing en regio, vergelijk reviews en kies de juiste piloot.",
};

export default function PilotenPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">Piloten</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            Vind een geverifieerde dronepiloot
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted pretty">
            Elke piloot in de gids is gecheckt op RDW-registratie, EASA-certificaat
            en €1M aansprakelijkheidsverzekering. Filter op toepassing en regio,
            vergelijk reviews en opdrachten, en vraag je favoriet direct aan.
          </p>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <PilotFilter pilots={PILOTS} />
      </section>

      <CTASection
        title="Niet gevonden wat je zoekt?"
        intro="Plaats gratis je aanvraag. Wij koppelen je automatisch aan de best passende geverifieerde piloten bij jou in de buurt."
      />
    </>
  );
}
