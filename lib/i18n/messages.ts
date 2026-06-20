import type { Locale } from "@/lib/types";
import { DEFAULT_LOCALE, isLocale } from "./config";

/**
 * Shared "chrome" strings (nav, footer, common actions) in all locales.
 * Page-specific copy lives in each page file as a local {nl,en,de} dictionary,
 * so pages can be authored independently without touching a shared file.
 */
export const CHROME: Record<Locale, {
  nav: { howItWorks: string; segments: string; packages: string; showcase: string; pilots: string; rules: string };
  actions: { login: string; postRequest: string; viewPilots: string; becomePilot: string };
  footer: {
    forClients: string; forPilots: string; segments: string; company: string;
    tagline: string; rights: string; demo: string;
  };
  language: string;
}> = {
  nl: {
    nav: { howItWorks: "Hoe het werkt", segments: "Toepassingen", packages: "Pakketten", showcase: "Showcase", pilots: "Piloten", rules: "Regels & certificering" },
    actions: { login: "Inloggen", postRequest: "Plaats aanvraag", viewPilots: "Bekijk piloten", becomePilot: "Word piloot" },
    footer: {
      forClients: "Voor klanten", forPilots: "Voor piloten", segments: "Toepassingen", company: "Bedrijf",
      tagline: "De juiste dronepiloot. Vandaag geregeld.",
      rights: "Geverifieerde, verzekerde, gecertificeerde dronepiloten",
      demo: "Demo-build · prijzen indicatief, ex BTW",
    },
    language: "Taal",
  },
  en: {
    nav: { howItWorks: "How it works", segments: "Services", packages: "Packages", showcase: "Showcase", pilots: "Pilots", rules: "Rules & certification" },
    actions: { login: "Log in", postRequest: "Post a request", viewPilots: "View pilots", becomePilot: "Become a pilot" },
    footer: {
      forClients: "For clients", forPilots: "For pilots", segments: "Services", company: "Company",
      tagline: "The right drone pilot. Sorted today.",
      rights: "Verified, insured, certified drone pilots",
      demo: "Demo build · prices indicative, ex VAT",
    },
    language: "Language",
  },
  de: {
    nav: { howItWorks: "So funktioniert's", segments: "Anwendungen", packages: "Pakete", showcase: "Showcase", pilots: "Piloten", rules: "Regeln & Zertifizierung" },
    actions: { login: "Anmelden", postRequest: "Anfrage stellen", viewPilots: "Piloten ansehen", becomePilot: "Pilot werden" },
    footer: {
      forClients: "Für Kunden", forPilots: "Für Piloten", segments: "Anwendungen", company: "Unternehmen",
      tagline: "Der richtige Drohnenpilot. Heute geregelt.",
      rights: "Geprüfte, versicherte, zertifizierte Drohnenpiloten",
      demo: "Demo-Build · Preise indikativ, zzgl. MwSt.",
    },
    language: "Sprache",
  },
};

export function chrome(locale: string) {
  return CHROME[isLocale(locale) ? locale : DEFAULT_LOCALE];
}

/** Prefix an internal path with the locale, e.g. ("en","/pilots") → "/en/pilots". */
export function localized(locale: string, path: string): string {
  const l = isLocale(locale) ? locale : DEFAULT_LOCALE;
  if (path === "/") return `/${l}`;
  return `/${l}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Pick a value for the active locale with NL fallback. */
export function pick<T>(locale: string, dict: Record<Locale, T>): T {
  return dict[isLocale(locale) ? locale : DEFAULT_LOCALE];
}
