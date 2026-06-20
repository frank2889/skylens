"use client";

import { useMemo, useState } from "react";
import { Search, MapPin, ArrowUpDown, ShieldCheck } from "lucide-react";
import { PilotCard } from "@/components/cards";
import { SEGMENTS } from "@/lib/catalog";
import type { Pilot } from "@/lib/types";

type SortKey = "rating" | "jobs";

const SELECT_CLASS =
  "w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white";

export function PilotFilter({ pilots }: { pilots: Pilot[] }) {
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
              Toepassing
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={segment}
                onChange={(e) => setSegment(e.target.value)}
                className={SELECT_CLASS}
                aria-label="Filter op toepassing"
              >
                <option value="all">Alle toepassingen</option>
                {SEGMENTS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="block">
            <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              Regio
            </span>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className={SELECT_CLASS}
                aria-label="Filter op regio"
              >
                <option value="all">Heel Nederland</option>
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
              Sorteer op
            </span>
            <div className="relative">
              <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={SELECT_CLASS}
                aria-label="Sorteren"
              >
                <option value="rating">Hoogste beoordeling</option>
                <option value="jobs">Meeste opdrachten</option>
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
              Alleen geverifieerd
            </span>
          </label>
        </div>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink-muted">
        <strong className="font-semibold text-ink">{results.length}</strong>{" "}
        {results.length === 1 ? "piloot" : "piloten"}
      </p>

      {results.length > 0 ? (
        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <PilotCard key={p.slug} pilot={p} />
          ))}
        </div>
      ) : (
        <div className="mt-5 card card-pad text-center">
          <h3 className="text-lg font-bold">Geen piloten gevonden</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
            Geen piloten die aan deze filters voldoen. Verruim je selectie, of
            plaats een aanvraag — we matchen je alsnog met de juiste piloot bij
            jou in de buurt.
          </p>
        </div>
      )}
    </div>
  );
}
