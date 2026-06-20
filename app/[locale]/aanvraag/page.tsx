import type { Metadata } from "next";
import { Suspense } from "react";
import { ShieldCheck, Euro, Clock, Users, BadgeCheck } from "lucide-react";
import { RequestForm } from "@/components/request-form";
import { Eyebrow, Stars } from "@/components/bits";
import { STATS } from "@/lib/seed";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { pick } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { getJurisdiction } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const M = pick(locale, {
    nl: {
      title: "Plaats je aanvraag · gratis matches met geverifieerde dronepiloten",
      description:
        "Plaats gratis en vrijblijvend je aanvraag. Binnen enkele uren koppelen we je aan geverifieerde, verzekerde dronepiloten bij jou in de buurt.",
    },
    en: {
      title: "Post your request · free matches with verified drone pilots",
      description:
        "Post your request free and with no obligation. Within hours we connect you with verified, insured drone pilots near you.",
    },
    de: {
      title: "Anfrage stellen · kostenlose Vermittlung geprüfter Drohnenpiloten",
      description:
        "Stellen Sie Ihre Anfrage kostenlos und unverbindlich. Innerhalb von Stunden verbinden wir Sie mit geprüften, versicherten Drohnenpiloten in Ihrer Nähe.",
    },
  });
  return {
    title: M.title,
    description: M.description,
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/aanvraag`,
        "en-GB": `${SITE.url}/en/aanvraag`,
        de: `${SITE.url}/de/aanvraag`,
      },
    },
  };
}

export default async function AanvraagPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const cfg = getLocaleConfig(locale);
  const jur = getJurisdiction(cfg.country);
  const insurance = formatCurrency(jur.insurance.minMajor, locale);
  const authority = jur.authority.short;

  const T = pick(locale, {
    nl: {
      eyebrow: "Aanvraag · gratis & vrijblijvend",
      title: "Plaats je aanvraag",
      lead: "Vertel ons in een paar stappen wat je nodig hebt. Wij koppelen je binnen enkele uren aan geverifieerde, verzekerde piloten bij jou in de buurt — gratis en zonder verplichtingen.",
      formLoading: "Formulier laden…",
      whyTitle: "Waarom via Skylens",
      reassurance: [
        {
          title: "Geverifieerd & verzekerd",
          text: `Elke piloot is gecheckt op ${authority}-registratie, EASA-certificaat en ${insurance} aansprakelijkheidsverzekering.`,
        },
        {
          title: "Volledig gratis & vrijblijvend",
          text: "Geen kosten, geen account nodig. Je beslist pas iets als je een piloot kiest.",
        },
        {
          title: "Snel een match",
          text: "Doorgaans binnen enkele uren reactie, beelden geleverd binnen 48–72 uur.",
        },
      ],
      nextTitle: "Wat er daarna gebeurt",
      nextSteps: [
        "Je aanvraag wordt direct gematcht met passende piloten in jouw regio.",
        "Geïnteresseerde piloten reageren met hun profiel, prijs en beschikbaarheid.",
        "Vergelijk profielen en reviews, kies je piloot en plan de vlucht in.",
      ],
      ratingNote: (n: string) => `Gemiddelde beoordeling over ${n}+ piloten`,
    },
    en: {
      eyebrow: "Request · free & no obligation",
      title: "Post your request",
      lead: "Tell us in a few steps what you need. Within hours we connect you with verified, insured pilots near you — free and with no obligations.",
      formLoading: "Loading form…",
      whyTitle: "Why use Skylens",
      reassurance: [
        {
          title: "Verified & insured",
          text: `Every pilot is checked for ${authority} registration, EASA certification and ${insurance} liability insurance.`,
        },
        {
          title: "Completely free & no obligation",
          text: "No cost, no account needed. You only decide once you choose a pilot.",
        },
        {
          title: "A quick match",
          text: "Typically a reply within hours, footage delivered within 48–72 hours.",
        },
      ],
      nextTitle: "What happens next",
      nextSteps: [
        "Your request is matched straight away with suitable pilots in your region.",
        "Interested pilots respond with their profile, price and availability.",
        "Compare profiles and reviews, choose your pilot and schedule the flight.",
      ],
      ratingNote: (n: string) => `Average rating across ${n}+ pilots`,
    },
    de: {
      eyebrow: "Anfrage · kostenlos & unverbindlich",
      title: "Anfrage stellen",
      lead: "Sagen Sie uns in wenigen Schritten, was Sie brauchen. Innerhalb von Stunden verbinden wir Sie mit geprüften, versicherten Piloten in Ihrer Nähe — kostenlos und unverbindlich.",
      formLoading: "Formular wird geladen…",
      whyTitle: "Warum über Skylens",
      reassurance: [
        {
          title: "Geprüft & versichert",
          text: `Jeder Pilot ist auf ${authority}-Registrierung, EASA-Zertifikat und ${insurance} Haftpflichtversicherung geprüft.`,
        },
        {
          title: "Völlig kostenlos & unverbindlich",
          text: "Keine Kosten, kein Konto nötig. Sie entscheiden erst, wenn Sie einen Piloten wählen.",
        },
        {
          title: "Schnell vermittelt",
          text: "In der Regel Antwort innerhalb von Stunden, Aufnahmen innerhalb von 48–72 Stunden.",
        },
      ],
      nextTitle: "Was danach passiert",
      nextSteps: [
        "Ihre Anfrage wird sofort mit passenden Piloten in Ihrer Region abgeglichen.",
        "Interessierte Piloten antworten mit Profil, Preis und Verfügbarkeit.",
        "Vergleichen Sie Profile und Bewertungen, wählen Sie Ihren Piloten und planen Sie den Flug.",
      ],
      ratingNote: (n: string) => `Durchschnittsbewertung über ${n}+ Piloten`,
    },
  });

  const REASSURANCE_ICONS = [BadgeCheck, Euro, Clock];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
        <div className="container-x relative py-14 sm:py-20">
          <div className="max-w-2xl">
            <Eyebrow>{T.eyebrow}</Eyebrow>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {T.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
          {/* Form */}
          <div className="order-2 lg:order-1">
            <Suspense fallback={<div className="card card-pad text-ink-muted">{T.formLoading}</div>}>
              <RequestForm />
            </Suspense>
          </div>

          {/* Reassurance panel */}
          <aside className="order-1 lg:order-2 lg:sticky lg:top-28">
            <div className="card card-pad bg-paper-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                <ShieldCheck className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <h2 className="mt-5 font-display text-xl font-bold">{T.whyTitle}</h2>
              <dl className="mt-6 grid gap-5">
                {T.reassurance.map((r, i) => {
                  const Icon = REASSURANCE_ICONS[i];
                  return (
                    <div key={r.title} className="flex gap-3.5">
                      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.7} />
                      <div>
                        <dt className="font-semibold">{r.title}</dt>
                        <dd className="mt-1 text-sm leading-relaxed text-ink-muted">{r.text}</dd>
                      </div>
                    </div>
                  );
                })}
              </dl>

              <div className="mt-7 border-t border-line pt-6">
                <h3 className="flex items-center gap-2 font-semibold">
                  <Users className="h-4 w-4 text-brand-600" />
                  {T.nextTitle}
                </h3>
                <ol className="mt-4 grid gap-3">
                  {T.nextSteps.map((s, i) => (
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
                  {T.ratingNote(formatNumber(STATS.activePilots, locale))}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
