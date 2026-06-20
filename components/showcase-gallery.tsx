"use client";

import { useMemo, useState } from "react";
import { Video, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { ShowcaseCard } from "@/components/cards";
import { SEGMENTS } from "@/lib/catalog";
import { cn, TIER_LABELS, formatNumber } from "@/lib/utils";
import type { ShowcaseItem, Tier } from "@/lib/types";

const TIERS: Tier[] = ["bronze", "silver", "gold", "platinum"];
const TYPES = [
  { key: "all", label: "Alles", icon: LayoutGrid },
  { key: "video", label: "Video", icon: Video },
  { key: "photo", label: "Foto", icon: ImageIcon },
] as const;

type TypeFilter = (typeof TYPES)[number]["key"];

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
            Toepassing
          </span>
          <div className="flex flex-wrap gap-2">
            <FilterButton active={segment === "all"} onClick={() => setSegment("all")}>
              Alle toepassingen
            </FilterButton>
            {SEGMENTS.map((s) => (
              <FilterButton
                key={s.slug}
                active={segment === s.slug}
                onClick={() => setSegment(s.slug)}
              >
                {s.name}
              </FilterButton>
            ))}
          </div>
        </div>

        <div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-2">
          <div>
            <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              Pakket
            </span>
            <div className="flex flex-wrap gap-2">
              <FilterButton active={tier === "all"} onClick={() => setTier("all")}>
                Alle pakketten
              </FilterButton>
              {TIERS.map((t) => (
                <FilterButton key={t} active={tier === t} onClick={() => setTier(t)}>
                  {TIER_LABELS[t]}
                </FilterButton>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-2.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
              Type
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
        {formatNumber(filtered.length)}{" "}
        {filtered.length === 1 ? "project" : "projecten"}
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
          <h3 className="text-lg font-bold">Geen projecten gevonden</h3>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted pretty">
            Geen werk dat aan deze combinatie van filters voldoet. Pas een filter aan om meer
            beelden te zien.
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
            Filters wissen
          </button>
        </div>
      )}
    </div>
  );
}
