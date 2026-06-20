import type { Locale, CountryCode, Currency } from "@/lib/types";

export const LOCALES: Locale[] = ["nl", "en", "de"];
export const DEFAULT_LOCALE: Locale = "nl";

export interface LocaleConfig {
  locale: Locale;
  /** BCP-47 tag for Intl formatting. */
  intlLocale: string;
  label: string; // shown in the language switcher
  currency: Currency;
  /** Primary market/jurisdiction this locale represents. */
  country: CountryCode;
  ogLocale: string;
  htmlLang: string;
}

export const LOCALE_CONFIG: Record<Locale, LocaleConfig> = {
  nl: {
    locale: "nl",
    intlLocale: "nl-NL",
    label: "Nederlands",
    currency: "EUR",
    country: "NL",
    ogLocale: "nl_NL",
    htmlLang: "nl",
  },
  en: {
    locale: "en",
    intlLocale: "en-GB",
    label: "English (UK)",
    currency: "GBP",
    country: "GB",
    ogLocale: "en_GB",
    htmlLang: "en-GB",
  },
  de: {
    locale: "de",
    intlLocale: "de-DE",
    label: "Deutsch",
    currency: "EUR",
    country: "DE",
    ogLocale: "de_DE",
    htmlLang: "de",
  },
};

export function getLocaleConfig(locale: string): LocaleConfig {
  return LOCALE_CONFIG[(locale as Locale)] ?? LOCALE_CONFIG[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as string[]).includes(value);
}
