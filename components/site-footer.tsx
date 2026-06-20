import Link from "next/link";
import { Logo } from "./logo";
import { SITE } from "@/lib/site";
import { chrome, localized, pick } from "@/lib/i18n/messages";
import type { Locale } from "@/lib/types";

const LINKS: Record<Locale, { title: string; links: { label: string; href: string }[] }[]> = {
  nl: [
    { title: "Voor klanten", links: [
      { label: "Hoe het werkt", href: "/hoe-het-werkt" }, { label: "Pakketten", href: "/pakketten" },
      { label: "Plaats een aanvraag", href: "/aanvraag" }, { label: "Showcase", href: "/showcase" } ] },
    { title: "Voor piloten", links: [
      { label: "Word piloot", href: "/voor-piloten" }, { label: "Regels & certificering", href: "/regels" },
      { label: "Inloggen", href: "/login" } ] },
    { title: "Bedrijf", links: [
      { label: "Over ons", href: "/over-ons" }, { label: "Privacy & AVG", href: "/privacy" },
      { label: "Voorwaarden", href: "/voorwaarden" } ] },
  ],
  en: [
    { title: "For clients", links: [
      { label: "How it works", href: "/hoe-het-werkt" }, { label: "Packages", href: "/pakketten" },
      { label: "Post a request", href: "/aanvraag" }, { label: "Showcase", href: "/showcase" } ] },
    { title: "For pilots", links: [
      { label: "Become a pilot", href: "/voor-piloten" }, { label: "Rules & certification", href: "/regels" },
      { label: "Log in", href: "/login" } ] },
    { title: "Company", links: [
      { label: "About us", href: "/over-ons" }, { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/voorwaarden" } ] },
  ],
  de: [
    { title: "Für Kunden", links: [
      { label: "So funktioniert's", href: "/hoe-het-werkt" }, { label: "Pakete", href: "/pakketten" },
      { label: "Anfrage stellen", href: "/aanvraag" }, { label: "Showcase", href: "/showcase" } ] },
    { title: "Für Piloten", links: [
      { label: "Pilot werden", href: "/voor-piloten" }, { label: "Regeln & Zertifizierung", href: "/regels" },
      { label: "Anmelden", href: "/login" } ] },
    { title: "Unternehmen", links: [
      { label: "Über uns", href: "/over-ons" }, { label: "Datenschutz", href: "/privacy" },
      { label: "AGB", href: "/voorwaarden" } ] },
  ],
};

export function SiteFooter({ locale }: { locale: string }) {
  const t = chrome(locale).footer;
  const columns = pick(locale, LINKS);

  return (
    <footer className="border-t border-line bg-paper-soft">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo locale={locale} />
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">{t.tagline}</p>
            <p className="mt-4 font-mono text-xs uppercase tracking-wider text-ink-faint">
              {SITE.coords} · NL · UK · DE
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localized(locale, link.href)} className="text-sm text-ink-muted transition-colors hover:text-brand-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>© {SITE.name} · {t.rights}</p>
          <p className="font-mono uppercase tracking-wider">{t.demo}</p>
        </div>
      </div>
    </footer>
  );
}
