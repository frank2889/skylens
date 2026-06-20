import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function euro(n: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("nl-NL").format(n);
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

export const CERT_LABELS: Record<string, string> = {
  a1_a3: "A1/A3",
  a2: "A2",
  sts_01: "STS-01",
  sts_02: "STS-02",
  operational_auth: "Operationele autorisatie",
};

export const TIER_LABELS: Record<string, string> = {
  bronze: "Brons",
  silver: "Zilver",
  gold: "Goud",
  platinum: "Platinum",
};
