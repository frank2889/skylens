"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, ArrowUpDown, ShieldCheck } from "lucide-react";
import { PilotCard } from "@/components/cards";
import { SEGMENTS } from "@/lib/catalog";
import { useLocale } from "@/components/locale-link";
import { pick } from "@/lib/i18n/messages";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import type { Pilot } from "@/lib/types";

type SortKey = "rating" | "jobs";

const SELECT_CLASS =
  "w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white";

export function PilotFilter({ pilots }: { pilots: Pilot[] }) {
  const locale = useLocale();
  const T = pick(locale, {
    nl: {
      segment: "Toepassing",
      filterSegment: "Filter op toepassing",
      allSegments: "Alle toepassingen",
      region: "Regio",
      filterRegion: "Filter op regio",
      allRegions: "Heel Nederland",
      sortBy: "Sorteer op",
      sort: "Sorteren",
      sortRating: "Hoogste beoordeling",
      sortJobs: "Meeste opdrachten",
      verifiedOnly: "Alleen geverifieerd",
      pilotSingular: "piloot",
      pilotPlural: "piloten",
      emptyTitle: "Geen piloten gevonden",
      emptyBody:
        "Geen piloten die aan deze filters voldoen. Verruim je selectie, of plaats een aanvraag — we matchen je alsnog met de juiste piloot bij jou in de buurt.",
    },
    en: {
      segment: "Service",
      filterSegment: "Filter by service",
      allSegments: "All services",
      region: "Region",
      filterRegion: "Filter by region",
      allRegions: "All regions",
      sortBy: "Sort by",
      sort: "Sort",
      sortRating: "Highest rated",
      sortJobs: "Most jobs",
      verifiedOnly: "Verified only",
      pilotSingular: "pilot",
      pilotPlural: "pilots",
      emptyTitle: "No pilots found",
      emptyBody:
        "No pilots match these filters. Widen your selection, or post a request — we'll still match you with the right pilot near you.",
    },
    de: {
      segment: "Anwendung",
      filterSegment: "Nach Anwendung filtern",
      allSegments: "Alle Anwendungen",
      region: "Region",
      filterRegion: "Nach Region filtern",
      allRegions: "Alle Regionen",
      sortBy: "Sortieren nach",
      sort: "Sortieren",
      sortRating: "Beste Bewertung",
      sortJobs: "Meiste Aufträge",
      verifiedOnly: "Nur geprüft",
      pilotSingular: "Pilot",
      pilotPlural: "Piloten",
      emptyTitle: "Keine Piloten gefunden",
      emptyBody:
        "Keine Piloten entsprechen diesen Filtern. Erweitern Sie Ihre Auswahl oder stellen Sie eine Anfrage — wir vermitteln Sie dennoch an den passenden Piloten in Ihrer Nähe.",
    },
  });
  const [segment, setSegment] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("rating");

  const regions = useMemo(
    () => Array.from(new Set(pilots.map((p) => p.region))).sort(),
    [pilots],
  );

  const results = useMemo(() => {
    const filtered = pilots.filter((p) => {
      if (segment !== "all" && !p.segments.includes(segment)) return false;
      if (region !== "all" && p.region !== region) return false;
      if (verifiedOnly && !p.verified) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sort === "jobs") return b.jobsDone - a.jobsDone;
      return b.rating - a.rating || b.reviewCount - a.reviewCount;
    });
  }, [pilots, segment, region, verifiedOnly, sort]);

  return (
    <div>
      <div className="card card-pad">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.segment}
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className={SELECT_CLASS}
                aria-label={T.filterSegment}
              >
                <option value="all">{T.allSegments}</option>
                {SEGMENTS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {segmentText(s.slug, locale).name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.region}
            </span>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={SELECT_CLASS}
                aria-label={T.filterRegion}
              >
                <option value="all">{T.allRegions}</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.sortBy}
            </span>
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={SELECT_CLASS}
                aria-label={T.sort}
              >
                <option value="rating">{T.sortRating}</option>
                <option value="jobs">{T.sortJobs}</option>
              </select>
            </div>
          </label>

          <label className="flex cursor-pointer select-none items-center gap-2.5 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm font-medium text-ink lg:py-[0.86rem]">
            <input
              type="checkbox"
              checked={verifiedOnly}
              onChange={(e) => setVerifiedOnly(e.target.checked)}
              className="h-4 w-4 rounded border-line text-brand-600 focus:ring-brand-400"
            />
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <ShieldCheck className="h-4 w-4 text-brand-600" />
              {T.verifiedOnly}
            </span>
          </label>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink-muted">
        <strong className="font-semibold text-ink">{results.length}</strong>{" "}
        {results.length === 1 ? T.pilotSingular : T.pilotPlural}
      </p>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PilotCard key={p.slug} pilot={p} />
          ))}
        </div>
      ) : (
        <div className="mt-5 card card-pad text-center">
          <h3 className="text-lg font-bold">{T.emptyTitle}</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            {T.emptyBody}
          </p>
        </div>
      )}
    </div>
  );
}
