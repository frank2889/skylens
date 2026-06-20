import { PILOTS } from "./seed";
import { getCity } from "./catalog";
import type { Pilot, CountryCode } from "./types";

const MEMBERSHIP_RANK: Record<string, number> = { elite: 3, pro: 2, free: 1 };

/**
 * Deterministic, explainable matching (mirrors the planned MVP engine):
 * scope to the right COUNTRY + segment, then rank by verified → region →
 * rating → membership → jobs. In production this becomes a PostGIS query against
 * Supabase; here it runs on seed data. NL requests match NL pilots, UK→UK, DE→DE.
 */
export function matchPilots(
  segmentSlug: string,
  citySlug?: string,
  country?: CountryCode,
): Pilot[] {
  const city = citySlug ? getCity(citySlug) : undefined;
  const scope = country ?? city?.country;

  return PILOTS.filter(
    (p) => p.segments.includes(segmentSlug) && (!scope || p.country === scope),
  )
    .map((p) => {
      let score = 0;
      if (p.verified) score += 100;
      if (city && p.region === city.region) score += 40;
      if (city && p.citySlug === city.slug) score += 25;
      score += p.rating * 6;
      score += (MEMBERSHIP_RANK[p.membership] ?? 0) * 5;
      score += Math.min(p.jobsDone, 200) / 20;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);
}

export function availablePilots(
  segmentSlug: string,
  citySlug?: string,
  country?: CountryCode,
): number {
  return matchPilots(segmentSlug, citySlug, country).length;
}

export function pilotsByCountry(country: CountryCode): Pilot[] {
  return PILOTS.filter((p) => p.country === country).sort(
    (a, b) => Number(b.verified) - Number(a.verified) || b.rating - a.rating,
  );
}

export function pilotsInCity(citySlug: string): Pilot[] {
  const city = getCity(citySlug);
  if (!city) return [];
  return PILOTS.filter((p) => p.country === city.country && p.region === city.region).sort(
    (a, b) => Number(b.verified) - Number(a.verified) || b.rating - a.rating,
  );
}
