"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLocale } from "./locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

const DEFAULTS: Record<Locale, { title: string; intro: string; primary: string; secondary: string }> = {
  nl: {
    title: "Klaar voor je luchtbeelden?",
    intro: "Plaats gratis je aanvraag. Binnen enkele uren matchen we je met geverifieerde piloten bij jou in de buurt.",
    primary: "Plaats je aanvraag",
    secondary: "Hoe het werkt",
  },
  en: {
    title: "Ready for your aerial footage?",
    intro: "Post your request for free. Within hours we match you with verified pilots near you.",
    primary: "Post your request",
    secondary: "How it works",
  },
  de: {
    title: "Bereit für Ihre Luftaufnahmen?",
    intro: "Stellen Sie kostenlos Ihre Anfrage. Innerhalb von Stunden vermitteln wir geprüfte Piloten in Ihrer Nähe.",
    primary: "Anfrage stellen",
    secondary: "So funktioniert's",
  },
};

export function CTASection({
  title,
  intro,
  primaryHref = "/aanvraag",
  primaryLabel,
  secondaryHref = "/hoe-het-werkt",
  secondaryLabel,
  className,
}: {
  title?: string;
  intro?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  const locale = useLocale();
  const d = pick(locale, DEFAULTS);
  return (
    <section className={cn("container-x py-16 sm:py-24", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-16 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title ?? d.title}</h2>
          <p className="mt-4 text-lg text-white/70 pretty">{intro ?? d.intro}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={localized(locale, primaryHref)} className="btn btn-lg btn-primary">
              {primaryLabel ?? d.primary}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={localized(locale, secondaryHref)} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">
              {secondaryLabel ?? d.secondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
