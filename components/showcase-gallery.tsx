"use client";

import { useMemo, useState } from "react";
import { Video, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { ShowcaseCard } from "@/components/cards";
import { SEGMENTS } from "@/lib/catalog";
import { cn, formatNumber } from "@/lib/utils";
import { useLocale } from "@/components/locale-link";
import { pick } from "@/lib/i18n/messages";
import { segmentText, packageText } from "@/lib/i18n/catalog-i18n";
import type { ShowcaseItem, Tier } from "@/lib/types";

const TIERS: Tier[] = ["bronze", "silver", "gold", "platinum"];

type TypeFilter = "all" | "video" | "photo";

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "btn btn-sm",
        active ? "btn-primary" : "btn-outline",
      )}
    >
      {children}
    </button>
  );
}

export function ShowcaseGallery({ items }: { items: ShowcaseItem[] }) {
  const locale = useLocale();
  const T = pick(locale, {
    nl: {
      application: "Toepassing",
      allApplications: "Alle toepassingen",
      package: "Pakket",
      allPackages: "Alle pakketten",
      type: "Type",
      all: "Alles",
      video: "Video",
      photo: "Foto",
      project: "project",
      projects: "projecten",
      emptyTitle: "Geen projecten gevonden",
      emptyBody:
        "Geen werk dat aan deze combinatie van filters voldoet. Pas een filter aan om meer beelden te zien.",
      clearFilters: "Filters wissen",
    },
    en: {
      application: "Service",
      allApplications: "All services",
      package: "Package",
      allPackages: "All packages",
      type: "Type",
      all: "All",
      video: "Video",
      photo: "Photo",
      project: "project",
      projects: "projects",
      emptyTitle: "No projects found",
      emptyBody:
        "Nothing matches this combination of filters. Adjust a filter to see more work.",
      clearFilters: "Clear filters",
    },
    de: {
      application: "Anwendung",
      allApplications: "Alle Anwendungen",
      package: "Paket",
      allPackages: "Alle Pakete",
      type: "Typ",
      all: "Alles",
      video: "Video",
      photo: "Foto",
      project: "Projekt",
      projects: "Projekte",
      emptyTitle: "Keine Projekte gefunden",
      emptyBody:
        "Nichts entspricht dieser Filterkombination. Passen Sie einen Filter an, um mehr Arbeiten zu sehen.",
      clearFilters: "Filter zurücksetzen",
    },
  });

  const TYPES = [
    { key: "all" as const, label: T.all, icon: LayoutGrid },
    { key: "video" as const, label: T.video, icon: Video },
    { key: "photo" as const, label: T.photo, icon: ImageIcon },
  ];

  const [segment, setSegment] = useState<string>("all");
  const [tier, setTier] = useState<string>("all");
  const [type, setType] = useState<TypeFilter>("all");

  const filtered = useMemo(
    () =>
      items.filter((i) => {
        if (segment !== "all" && i.segment !== segment) return false;
        if (tier !== "all" && i.tier !== tier) return false;
        if (type === "video" && !i.isVideo) return false;
        if (type === "photo" && i.isVideo) return false;
        return true;
      }),
    [items, segment, tier, type],
  );

  return (
    <div>
      {/* ── Filterbalk ── */}
      <div className="card card-pad flex flex-col gap-5">
        <div>
          <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.application}
          </span>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={segment === "all"} onClick={() => setSegment("all")}>
              {T.allApplications}
            </FilterButton>
            {SEGMENTS.map((s) => (
              <FilterButton
                key={s.slug}
                active={segment === s.slug}
                onClick={() => setSegment(s.slug)}
              >
                {segmentText(s.slug, locale).name}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
          <div>
            <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.package}
            </span>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={tier === "all"} onClick={() => setTier("all")}>
                {T.allPackages}
              </FilterButton>
              {TIERS.map((t) => (
                <FilterButton key={t} active={tier === t} onClick={() => setTier(t)}>
                  {packageText(t, locale).name}
                </FilterButton>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              {T.type}
            </span>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <FilterButton key={t.key} active={type === t.key} onClick={() => setType(t.key)}>
                  <t.icon className="h-4 w-4" strokeWidth={1.8} />
                  {t.label}
                </FilterButton>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Resultaattelling ── */}
      <p className="mt-6 font-mono text-xs uppercase tracking-wider text-ink-muted">
        {formatNumber(filtered.length, locale)}{" "}
        {filtered.length === 1 ? T.project : T.projects}
      </p>

      {/* ── Galerij ── */}
      {filtered.length > 0 ? (
        <div className="mt-4 columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
          {filtered.map((item) => (
            <div key={item.id} className="mb-4 break-inside-avoid">
              <ShowcaseCard item={item} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 card card-pad flex flex-col items-center gap-3 py-16 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <LayoutGrid className="h-6 w-6" strokeWidth={1.7} />
          </span>
          <h3 className="text-lg font-bold">{T.emptyTitle}</h3>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted pretty">
            {T.emptyBody}
          </p>
          <button
            type="button"
            onClick={() => {
              setSegment("all");
              setTier("all");
              setType("all");
            }}
            className="btn btn-sm btn-ghost mt-1"
          >
            {T.clearFilters}
          </button>
        </div>
      )}
    </div>
  );
}
