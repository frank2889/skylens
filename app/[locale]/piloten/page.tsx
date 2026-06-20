import type { Metadata } from "next";
import { PilotFilter } from "@/components/pilot-filter";
import { CTASection } from "@/components/cta";
import { PILOTS } from "@/lib/seed";
import { pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Piloten · Vind een geverifieerde dronepiloot | Skylens",
      description:
        "Blader door geverifieerde, verzekerde en EASA-gecertificeerde dronepiloten in heel Nederland. Filter op toepassing en regio, vergelijk reviews en kies de juiste piloot.",
    },
    en: {
      title: "Pilots · Find a verified drone pilot | Skylens",
      description:
        "Browse verified, insured and CAA-certified drone pilots across the UK. Filter by service and region, compare reviews and choose the right pilot.",
    },
    de: {
      title: "Piloten · Finden Sie einen geprüften Drohnenpiloten | Skylens",
      description:
        "Durchsuchen Sie geprüfte, versicherte und EASA-zertifizierte Drohnenpiloten in ganz Deutschland. Filtern Sie nach Anwendung und Region, vergleichen Sie Bewertungen und wählen Sie den passenden Piloten.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/piloten`,
        "en-GB": `${SITE.url}/en/piloten`,
        de: `${SITE.url}/de/piloten`,
      },
    },
  };
}

export default async function PilotenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const T = pick(locale, {
    nl: {
      eyebrow: "Piloten",
      title: "Vind een geverifieerde dronepiloot",
      intro:
        "Elke piloot in de gids is gecheckt op RDW-registratie, EASA-certificaat en €1M aansprakelijkheidsverzekering. Filter op toepassing en regio, vergelijk reviews en opdrachten, en vraag je favoriet direct aan.",
      ctaTitle: "Niet gevonden wat je zoekt?",
      ctaIntro:
        "Plaats gratis je aanvraag. Wij koppelen je automatisch aan de best passende geverifieerde piloten bij jou in de buurt.",
    },
    en: {
      eyebrow: "Pilots",
      title: "Find a verified drone pilot",
      intro:
        "Every pilot in the directory is checked for CAA registration, certification and £1M public liability insurance. Filter by service and region, compare reviews and jobs, and request your favourite straight away.",
      ctaTitle: "Not finding what you need?",
      ctaIntro:
        "Post your request for free. We'll automatically match you with the best-fitting verified pilots near you.",
    },
    de: {
      eyebrow: "Piloten",
      title: "Finden Sie einen geprüften Drohnenpiloten",
      intro:
        "Jeder Pilot im Verzeichnis ist auf LBA-Registrierung, EASA-Zertifikat und 1 Mio. € Haftpflichtversicherung geprüft. Filtern Sie nach Anwendung und Region, vergleichen Sie Bewertungen und Aufträge und fragen Sie Ihren Favoriten direkt an.",
      ctaTitle: "Nicht das Richtige gefunden?",
      ctaIntro:
        "Stellen Sie Ihre Anfrage kostenlos. Wir vermitteln Sie automatisch an die am besten passenden geprüften Piloten in Ihrer Nähe.",
    },
  });

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-20">
          <span className="eyebrow">{T.eyebrow}</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] sm:text-5xl">
            {T.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted pretty">
            {T.intro}
          </p>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <PilotFilter pilots={PILOTS} />
      </section>

      <CTASection title={T.ctaTitle} intro={T.ctaIntro} />
    </>
  );
}
