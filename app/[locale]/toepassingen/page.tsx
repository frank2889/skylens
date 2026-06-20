import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SegmentCard } from "@/components/cards";
import { CTASection } from "@/components/cta";
import { SEGMENTS } from "@/lib/catalog";
import { localized, pick } from "@/lib/i18n/messages";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Toepassingen — voor elke klus de juiste dronepiloot",
      description:
        "Van vastgoedfoto's tot LiDAR-survey: ontdek waar je een geverifieerde, verzekerde dronepiloot voor inhuurt. Vaste prijzen, levering binnen 48–72 uur.",
    },
    en: {
      title: "Services — the right drone pilot for every job",
      description:
        "From property photography to LiDAR surveys: discover what to hire a verified, insured drone pilot for. Fixed prices, delivery within 48–72 hours.",
    },
    de: {
      title: "Anwendungen — der richtige Drohnenpilot für jeden Auftrag",
      description:
        "Von Immobilienfotos bis LiDAR-Vermessung: Entdecken Sie, wofür Sie einen geprüften, versicherten Drohnenpiloten buchen. Festpreise, Lieferung in 48–72 Stunden.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/toepassingen`,
        "en-GB": `${SITE.url}/en/toepassingen`,
        de: `${SITE.url}/de/toepassingen`,
      },
    },
  };
}

export default async function ToepassingenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const T = pick(locale, {
    nl: {
      eyebrow: "Toepassingen",
      titleA: "Voor elke klus de juiste",
      titleB: "piloot & drone",
      intro:
        "Of je nu een woning sneller wilt verkopen, een dak wilt inspecteren zonder steiger of centimeter-nauwkeurige meetdata nodig hebt — wij koppelen je aan een geverifieerde, verzekerde piloot met de juiste apparatuur en certificering.",
      ctaEyebrow: "Niet gevonden?",
      ctaTitle: "Staat jouw toepassing er niet tussen?",
      ctaIntro:
        "Onze piloten vliegen voor veel meer dan deze categorieën. Beschrijf je klus en wij kijken wie er past — gratis en vrijblijvend, geen account nodig.",
      ctaButton: "Plaats toch je aanvraag",
    },
    en: {
      eyebrow: "Services",
      titleA: "The right",
      titleB: "pilot & drone",
      intro:
        "Whether you want to sell a property faster, inspect a roof without scaffolding or need centimetre-accurate survey data — we match you with a verified, insured pilot who has the right kit and certification.",
      ctaEyebrow: "Not listed?",
      ctaTitle: "Don't see your use case here?",
      ctaIntro:
        "Our pilots fly for far more than these categories. Describe your job and we'll find who fits — free, no obligation and no account needed.",
      ctaButton: "Post your request anyway",
    },
    de: {
      eyebrow: "Anwendungen",
      titleA: "Für jeden Auftrag der richtige",
      titleB: "Pilot & Drohne",
      intro:
        "Ob Sie eine Immobilie schneller verkaufen, ein Dach ohne Gerüst inspizieren oder zentimetergenaue Messdaten benötigen — wir vermitteln Ihnen einen geprüften, versicherten Piloten mit der passenden Ausrüstung und Zertifizierung.",
      ctaEyebrow: "Nicht dabei?",
      ctaTitle: "Ihre Anwendung ist nicht aufgeführt?",
      ctaIntro:
        "Unsere Piloten fliegen für weit mehr als diese Kategorien. Beschreiben Sie Ihren Auftrag und wir finden den passenden Piloten — kostenlos, unverbindlich und ohne Konto.",
      ctaButton: "Trotzdem Anfrage stellen",
    },
  });

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-0 h-[400px] w-[400px] rounded-full bg-brand-200/40 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-16 sm:py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">{T.eyebrow}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.titleA}{" "}
              <span className="text-brand-600">{T.titleB}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.intro}
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
              <span className="eyebrow">{T.ctaEyebrow}</span>
              <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                {T.ctaTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                {T.ctaIntro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={localized(locale, "/aanvraag")} className="btn btn-lg btn-primary">
                {T.ctaButton}
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
