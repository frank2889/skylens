"use client";

import { ShieldCheck, Lock, BadgeCheck, MessagesSquare, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/components/locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/types";

const COPY: Record<Locale, {
  eyebrow: string; title: string; intro: string; cta: string;
  cards: { icon: "shield" | "lock" | "badge" | "chat"; title: string; text: string }[];
}> = {
  nl: {
    eyebrow: "Veilig via één plek",
    title: "Waarom alles via Skylens loopt",
    intro: "Van eerste bericht tot betaling en oplevering — alles binnen het platform. Veiliger voor jou, eerlijker voor de piloot, niets dat buitenom misgaat.",
    cta: "Plaats je aanvraag",
    cards: [
      { icon: "shield", title: "Beveiligde betaling", text: "Je betaalt veilig via het platform; het geld komt pas vrij als de beelden geleverd zijn. Kopersbescherming inbegrepen." },
      { icon: "lock", title: "Contact afgeschermd", text: "Je communiceert in je Skylens-inbox. Geen spam, geen telefoonnummers die rondslingeren — en geen piloot die ineens onbereikbaar is." },
      { icon: "badge", title: "Alleen geverifieerde piloten", text: "Elke piloot is gecheckt op certificering én verzekering vóór je iets afspreekt. Dat kun je zelf niet zien — wij wel." },
      { icon: "chat", title: "Reviews die kloppen", text: "Beoordelingen tellen alleen bij klussen die écht via Skylens zijn afgerond. Zo weet je precies wat je krijgt." },
    ],
  },
  en: {
    eyebrow: "Safe, in one place",
    title: "Why everything runs through Skylens",
    intro: "From first message to payment and delivery — all on the platform. Safer for you, fairer for the pilot, nothing that goes wrong off to the side.",
    cta: "Post your request",
    cards: [
      { icon: "shield", title: "Protected payment", text: "You pay securely through the platform; funds are only released once the footage is delivered. Buyer protection included." },
      { icon: "lock", title: "Contact kept private", text: "You communicate in your Skylens inbox. No spam, no phone numbers floating around — and no pilot who suddenly goes quiet." },
      { icon: "badge", title: "Verified pilots only", text: "Every pilot is checked for certification and insurance before you agree anything. You can't see that yourself — we can." },
      { icon: "chat", title: "Reviews you can trust", text: "Ratings only count for jobs genuinely completed through Skylens. So you know exactly what you're getting." },
    ],
  },
  de: {
    eyebrow: "Sicher, an einem Ort",
    title: "Warum alles über Skylens läuft",
    intro: "Von der ersten Nachricht bis Zahlung und Lieferung — alles auf der Plattform. Sicherer für Sie, fairer für den Piloten, nichts geht außerhalb schief.",
    cta: "Anfrage stellen",
    cards: [
      { icon: "shield", title: "Geschützte Zahlung", text: "Sie zahlen sicher über die Plattform; das Geld wird erst freigegeben, wenn die Aufnahmen geliefert sind. Käuferschutz inklusive." },
      { icon: "lock", title: "Kontakt geschützt", text: "Sie kommunizieren in Ihrem Skylens-Postfach. Kein Spam, keine herumliegenden Telefonnummern — und kein Pilot, der plötzlich nicht erreichbar ist." },
      { icon: "badge", title: "Nur geprüfte Piloten", text: "Jeder Pilot wird auf Zertifizierung und Versicherung geprüft, bevor Sie etwas vereinbaren. Das sehen Sie selbst nicht — wir schon." },
      { icon: "chat", title: "Bewertungen, die stimmen", text: "Bewertungen zählen nur für wirklich über Skylens abgeschlossene Aufträge. So wissen Sie genau, was Sie bekommen." },
    ],
  },
};

const ICONS = { shield: ShieldCheck, lock: Lock, badge: BadgeCheck, chat: MessagesSquare };

export function OnPlatformSection() {
  const locale = useLocale();
  const t = pick(locale, COPY);

  return (
    <section className="border-t border-line bg-paper-soft py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow">{t.eyebrow}</span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{t.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">{t.intro}</p>
            <Link href={localized(locale, "/aanvraag")} className="btn btn-lg btn-primary mt-7">
              {t.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {t.cards.map((c) => {
              const Icon = ICONS[c.icon];
              return (
                <div key={c.title} className="card card-pad">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-600 text-white shadow-card">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-bold">{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{c.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
