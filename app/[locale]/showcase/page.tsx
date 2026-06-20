import type { Metadata } from "next";
import { Camera, ShieldCheck, Repeat, Sparkles } from "lucide-react";
import { ShowcaseGallery } from "@/components/showcase-gallery";
import { SectionHeading } from "@/components/bits";
import { CTASection } from "@/components/cta";
import { SHOWCASE, STATS } from "@/lib/seed";
import { formatNumber } from "@/lib/utils";
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
      title: "Showcase · Echt werk van geverifieerde dronepiloten",
      description:
        "Bekijk luchtfoto's en -video van geverifieerde, verzekerde dronepiloten. Filter op toepassing, pakket en type. Elke opdracht voegt nieuw werk toe aan de showcase.",
    },
    en: {
      title: "Showcase · Real work from verified drone pilots",
      description:
        "Browse aerial photos and video from verified, insured drone pilots. Filter by service, package and type. Every job adds new work to the showcase.",
    },
    de: {
      title: "Showcase · Echte Arbeiten geprüfter Drohnenpiloten",
      description:
        "Sehen Sie Luftbilder und -videos geprüfter, versicherter Drohnenpiloten. Filtern Sie nach Anwendung, Paket und Typ. Jeder Auftrag erweitert die Showcase.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/showcase`,
        "en-GB": `${SITE.url}/en/showcase`,
        de: `${SITE.url}/de/showcase`,
      },
    },
  };
}

export default async function ShowcasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const T = pick(locale, {
    nl: {
      eyebrow: "Showcase",
      titleA: "Echt werk van ",
      titleB: "geverifieerde piloten",
      lead: "Geen stockbeelden. Elke opdracht voegt nieuw werk toe aan onze showcase — van grachtenpanden tot zonneparken. Piloten licentiëren hun beste beelden, klanten zien vooraf wat ze kunnen verwachten. Zo versterkt elke vlucht de vliegwiel-werking van het platform.",
      statPilots: "geverifieerde piloten",
      statCities: "steden gedekt",
      flywheelEyebrow: "Het footage-vliegwiel",
      flywheelTitle: "Hoe deze showcase blijft groeien",
      flywheelIntro:
        "Piloten licentiëren hun sterkste beelden aan Skylens. Dat levert hen zichtbaarheid en nieuwe leads op, en geeft klanten een eerlijk beeld van wat geverifieerde piloten leveren.",
      flywheel: [
        {
          title: "Piloten leveren hun beste werk",
          text: "Bij elke opdracht kunnen piloten geselecteerde beelden licentiëren voor de showcase. Zij houden hun rechten; wij krijgen tonen-toestemming.",
        },
        {
          title: "Klanten zien echt resultaat",
          text: "Geen stockbeelden of renders. Alleen opgeleverd werk uit echte opdrachten, gekoppeld aan de piloot en de toepassing.",
        },
        {
          title: "De vliegende start groeit mee",
          text: "Meer opdrachten betekent meer beelden, meer vertrouwen en meer aanvragen. De showcase wordt sterker bij elke vlucht.",
        },
      ],
      ctaTitle: "Wil je dit ook?",
      ctaIntro:
        "Plaats gratis je aanvraag. Binnen enkele uren matchen we je met geverifieerde piloten die werk leveren zoals je hierboven ziet.",
      ctaPrimary: "Plaats je aanvraag",
    },
    en: {
      eyebrow: "Showcase",
      titleA: "Real work from ",
      titleB: "verified pilots",
      lead: "No stock footage. Every job adds new work to our showcase — from canal houses to solar farms. Pilots licence their best imagery, clients see exactly what to expect. That's how every flight strengthens the platform's flywheel.",
      statPilots: "verified pilots",
      statCities: "cities covered",
      flywheelEyebrow: "The footage flywheel",
      flywheelTitle: "How this showcase keeps growing",
      flywheelIntro:
        "Pilots licence their strongest imagery to Skylens. It earns them visibility and new leads, and gives clients an honest picture of what verified pilots deliver.",
      flywheel: [
        {
          title: "Pilots submit their best work",
          text: "On every job, pilots can licence selected imagery for the showcase. They keep their rights; we get permission to display.",
        },
        {
          title: "Clients see real results",
          text: "No stock footage or renders. Only delivered work from real jobs, linked to the pilot and the service.",
        },
        {
          title: "The flying start compounds",
          text: "More jobs means more imagery, more trust and more requests. The showcase gets stronger with every flight.",
        },
      ],
      ctaTitle: "Want this too?",
      ctaIntro:
        "Post your request for free. Within hours we match you with verified pilots who deliver work like you see above.",
      ctaPrimary: "Post your request",
    },
    de: {
      eyebrow: "Showcase",
      titleA: "Echte Arbeiten ",
      titleB: "geprüfter Piloten",
      lead: "Keine Stockaufnahmen. Jeder Auftrag erweitert unsere Showcase — von Grachtenhäusern bis zu Solarparks. Piloten lizenzieren ihre besten Aufnahmen, Kunden sehen vorab, was sie erwartet. So stärkt jeder Flug den Schwungrad-Effekt der Plattform.",
      statPilots: "geprüfte Piloten",
      statCities: "Städte abgedeckt",
      flywheelEyebrow: "Das Footage-Schwungrad",
      flywheelTitle: "Wie diese Showcase weiter wächst",
      flywheelIntro:
        "Piloten lizenzieren ihre stärksten Aufnahmen an Skylens. Das verschafft ihnen Sichtbarkeit und neue Leads und gibt Kunden ein ehrliches Bild davon, was geprüfte Piloten liefern.",
      flywheel: [
        {
          title: "Piloten reichen ihre besten Arbeiten ein",
          text: "Bei jedem Auftrag können Piloten ausgewählte Aufnahmen für die Showcase lizenzieren. Sie behalten ihre Rechte; wir erhalten die Erlaubnis zur Anzeige.",
        },
        {
          title: "Kunden sehen echte Ergebnisse",
          text: "Keine Stockaufnahmen oder Renderings. Nur gelieferte Arbeiten aus echten Aufträgen, verknüpft mit Pilot und Anwendung.",
        },
        {
          title: "Der fliegende Start verstärkt sich",
          text: "Mehr Aufträge bedeuten mehr Aufnahmen, mehr Vertrauen und mehr Anfragen. Die Showcase wird mit jedem Flug stärker.",
        },
      ],
      ctaTitle: "Wollen Sie das auch?",
      ctaIntro:
        "Stellen Sie kostenlos Ihre Anfrage. Innerhalb von Stunden vermitteln wir geprüfte Piloten, die Arbeiten liefern wie oben zu sehen.",
      ctaPrimary: "Anfrage stellen",
    },
  });

  const FLYWHEEL_ICONS = [Camera, Sparkles, Repeat];

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
            <span className="eyebrow">{T.eyebrow}</span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
              {T.titleA}
              <span className="text-brand-600">{T.titleB}</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.lead}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-600" />
                {formatNumber(STATS.activePilots, locale)} {T.statPilots}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Camera className="h-4 w-4 text-brand-600" />
                {STATS.citiesCovered} {T.statCities}
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
            eyebrow={T.flywheelEyebrow}
            title={T.flywheelTitle}
            intro={T.flywheelIntro}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {T.flywheel.map((step, i) => {
              const Icon = FLYWHEEL_ICONS[i];
              return (
                <div key={step.title} className="card card-pad">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                    <Icon className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title={T.ctaTitle}
        intro={T.ctaIntro}
        primaryHref="/aanvraag"
        primaryLabel={T.ctaPrimary}
      />
    </>
  );
}
