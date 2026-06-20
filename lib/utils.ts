import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { getLocaleConfig } from "./i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in the currency + number style of the given locale (UK → £/GBP). */
export function formatCurrency(amount: number, locale: string = "nl"): string {
  const cfg = getLocaleConfig(locale);
  return new Intl.NumberFormat(cfg.intlLocale, {
    style: "currency",
    currency: cfg.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Backwards-compatible NL/EUR helper. Prefer formatCurrency(amount, locale). */
export function euro(n: number): string {
  return formatCurrency(n, "nl");
}

export function formatNumber(n: number, locale: string = "nl"): string {
  return new Intl.NumberFormat(getLocaleConfig(locale).intlLocale).format(n);
}

// Deterministic 0..1 hash from a string — used for stable placeholder gradients.
export function seededUnit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

// Generic fallback labels for the capability ladder. For country-correct labels
// (e.g. NL "A2" vs UK "A2 CofC") use capabilityLabel(country, level) from jurisdictions.
export const CERT_LABELS: Record<string, string> = {
  registered: "Geregistreerd",
  basic: "Basis (A1/A3)",
  advanced: "Gevorderd (A2)",
  specific: "Specifiek",
  org: "Organisatie",
};

export const TIER_LABELS: Record<string, string> = {
  bronze: "Brons",
  silver: "Zilver",
  gold: "Goud",
  platinum: "Platinum",
};
