"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, Clock, Users, ArrowRight } from "lucide-react";
import { PilotCard } from "@/components/cards";
import { Eyebrow } from "@/components/bits";
import { matchPilots } from "@/lib/matching";
import { getSegment, getCity } from "@/lib/catalog";
import { useLocale } from "@/components/locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import { segmentText } from "@/lib/i18n/catalog-i18n";

export function BedanktContent() {
  const locale = useLocale();
  const sp = useSearchParams();
  const segment = sp.get("segment") ?? undefined;
  const stad = sp.get("stad") ?? undefined;

  const seg = segment ? getSegment(segment) : undefined;
  const city = stad ? getCity(stad) : undefined;
  const matches = seg ? matchPilots(seg.slug, city?.slug).slice(0, 4) : [];
  const segName = seg ? segmentText(seg.slug, locale).name : "";

  const T = pick(locale, {
    nl: {
      eyebrow: "Aanvraag verzonden",
      title: "Aanvraag ontvangen",
      nextSteps: [
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
      ],
      step: "Stap",
      matchesEyebrow: "Jouw matches",
      matchesTitle: "Deze piloten passen bij je aanvraag",
      matchesIntro:
        "Een eerste selectie op basis van toepassing, regio en verificatie. Je hoort van hen zodra je aanvraag is doorgezet.",
      meanTitle: "In de tussentijd",
      meanIntro:
        "Bekijk echt werk van geverifieerde piloten of verken het volledige aanbod terwijl wij je aanvraag matchen.",
      seeShowcase: "Bekijk de showcase",
      allPilots: "Alle piloten",
    },
    en: {
      eyebrow: "Request sent",
      title: "Request received",
      nextSteps: [
        {
          icon: Users,
          title: "We match your request",
          text: "Your request goes straight to verified pilots in your region with the right kit and certification.",
        },
        {
          icon: Mail,
          title: "You receive responses",
          text: "Interested pilots reply with their profile, a fixed price and their availability. Keep an eye on your inbox.",
        },
        {
          icon: Clock,
          title: "Choose & fly",
          text: "Compare profiles and reviews, choose your pilot and schedule the flight. Footage usually within 48–72 hours.",
        },
      ],
      step: "Step",
      matchesEyebrow: "Your matches",
      matchesTitle: "These pilots fit your request",
      matchesIntro:
        "An initial selection based on service, region and verification. You'll hear from them as soon as your request goes out.",
      meanTitle: "In the meantime",
      meanIntro:
        "Browse real work from verified pilots or explore the full range while we match your request.",
      seeShowcase: "View the showcase",
      allPilots: "All pilots",
    },
    de: {
      eyebrow: "Anfrage gesendet",
      title: "Anfrage erhalten",
      nextSteps: [
        {
          icon: Users,
          title: "Wir vermitteln Ihre Anfrage",
          text: "Ihre Anfrage geht direkt an geprüfte Piloten in Ihrer Region mit der passenden Ausrüstung und Zertifizierung.",
        },
        {
          icon: Mail,
          title: "Sie erhalten Rückmeldungen",
          text: "Interessierte Piloten antworten mit Profil, Festpreis und Verfügbarkeit. Behalten Sie Ihr Postfach im Auge.",
        },
        {
          icon: Clock,
          title: "Wählen & fliegen",
          text: "Vergleichen Sie Profile und Bewertungen, wählen Sie Ihren Piloten und planen Sie den Flug. Aufnahmen meist innerhalb von 48–72 Stunden.",
        },
      ],
      step: "Schritt",
      matchesEyebrow: "Ihre Matches",
      matchesTitle: "Diese Piloten passen zu Ihrer Anfrage",
      matchesIntro:
        "Eine erste Auswahl nach Anwendung, Region und Verifizierung. Sie hören von ihnen, sobald Ihre Anfrage verschickt ist.",
      meanTitle: "In der Zwischenzeit",
      meanIntro:
        "Sehen Sie echte Arbeiten geprüfter Piloten oder erkunden Sie das gesamte Angebot, während wir Ihre Anfrage vermitteln.",
      seeShowcase: "Showcase ansehen",
      allPilots: "Alle Piloten",
    },
  });

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
            <Eyebrow className="mt-7">{T.eyebrow}</Eyebrow>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-5xl">
              {T.title}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-muted pretty">
              {seg && city ? (
                <Lead segment={segName} city={city.name} locale={locale} />
              ) : seg ? (
                <Lead segment={segName} locale={locale} />
              ) : (
                <Lead locale={locale} />
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {T.nextSteps.map((s, i) => (
            <div key={s.title} className="card card-pad">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {T.step} {i + 1}
                </span>
              </div>
              <h2 className="mt-5 text-lg font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {matches.length > 0 ? (
        <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
          <div className="container-x">
            <div className="max-w-2xl">
              <Eyebrow>{T.matchesEyebrow}</Eyebrow>
              <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
                {T.matchesTitle}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">
                {T.matchesIntro}
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

      <section className="container-x py-16 sm:py-24">
        <div className="card relative overflow-hidden">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
          <div className="relative grid gap-8 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{T.meanTitle}</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-muted pretty">
                {T.meanIntro}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href={localized(locale, "/showcase")} className="btn btn-lg btn-dark">
                {T.seeShowcase}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localized(locale, "/piloten")} className="btn btn-lg btn-outline">
                {T.allPilots}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Lead({
  segment,
  city,
  locale,
}: {
  segment?: string;
  city?: string;
  locale: string;
}) {
  const seg = segment ? (
    <strong className="font-semibold text-ink">{segment.toLowerCase()}</strong>
  ) : null;
  const cityEl = city ? <strong className="font-semibold text-ink">{city}</strong> : null;

  if (locale === "en") {
    if (seg && cityEl)
      return (
        <>
          Thanks — your request for {seg} in {cityEl} is ready. We're now matching you with
          verified, insured pilots near you.
        </>
      );
    if (seg)
      return (
        <>
          Thanks — your request for {seg} is ready. We're now matching you with verified, insured
          pilots.
        </>
      );
    return (
      <>
        Thanks for your request. We're now matching you with verified, insured pilots near you. Keep
        an eye on your inbox — you'll hear from us soon.
      </>
    );
  }

  if (locale === "de") {
    if (seg && cityEl)
      return (
        <>
          Danke — Ihre Anfrage für {seg} in {cityEl} steht bereit. Wir vermitteln Ihnen jetzt
          geprüfte, versicherte Piloten in Ihrer Nähe.
        </>
      );
    if (seg)
      return (
        <>
          Danke — Ihre Anfrage für {seg} steht bereit. Wir vermitteln Ihnen jetzt geprüfte,
          versicherte Piloten.
        </>
      );
    return (
      <>
        Danke für Ihre Anfrage. Wir vermitteln Ihnen jetzt geprüfte, versicherte Piloten in Ihrer
        Nähe. Behalten Sie Ihr Postfach im Auge — Sie hören bald von uns.
      </>
    );
  }

  // NL (default)
  if (seg && cityEl)
    return (
      <>
        Bedankt — je aanvraag voor {seg} in {cityEl} staat klaar. We koppelen je nu aan
        geverifieerde, verzekerde piloten bij jou in de buurt.
      </>
    );
  if (seg)
    return (
      <>
        Bedankt — je aanvraag voor {seg} staat klaar. We koppelen je nu aan geverifieerde,
        verzekerde piloten.
      </>
    );
  return (
    <>
      Bedankt voor je aanvraag. We koppelen je nu aan geverifieerde, verzekerde piloten bij jou in
      de buurt. Houd je inbox in de gaten — je hoort snel van ons.
    </>
  );
}
