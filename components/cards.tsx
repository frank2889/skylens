"use client";

import Link from "next/link";
import { MapPin, ArrowUpRight } from "lucide-react";
import { MediaPlaceholder } from "./media";
import { SegmentIcon } from "./segment-icon";
import { TierBadge, VerifiedBadge, Stars } from "./bits";
import { useLocale } from "./locale-link";
import { getCity, getSegment } from "@/lib/catalog";
import { localized } from "@/lib/i18n/messages";
import { segmentText, ui } from "@/lib/i18n/catalog-i18n";
import { capabilityLabel } from "@/lib/jurisdictions";
import { formatCurrency, cn } from "@/lib/utils";
import type { Segment, Pilot, ShowcaseItem } from "@/lib/types";

export function SegmentCard({ segment }: { segment: Segment }) {
  const locale = useLocale();
  const t = segmentText(segment.slug, locale);
  const u = ui(locale);
  return (
    <Link
      href={localized(locale, `/toepassingen/${segment.slug}`)}
      className="card card-pad group flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
        <SegmentIcon name={segment.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-5 text-lg font-bold">{t.name}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{t.tagline}</p>
      <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
        <span className="font-mono text-xs uppercase tracking-wider text-ink-muted">
          {u.from} {formatCurrency(segment.priceFrom, locale)}
        </span>
        <ArrowUpRight className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}

export function PilotCard({ pilot }: { pilot: Pilot }) {
  const locale = useLocale();
  const u = ui(locale);
  const city = getCity(pilot.citySlug);
  return (
    <Link
      href={localized(locale, `/piloten/${pilot.slug}`)}
      className="card group overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <div className="relative">
        <MediaPlaceholder seed={pilot.slug} aspect="video" label={city?.name} />
        <div className="absolute left-3 top-3 flex gap-2">{pilot.verified ? <VerifiedBadge /> : null}</div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-bold leading-tight">{pilot.name}</h3>
            <p className="text-sm text-ink-muted">{pilot.company}</p>
          </div>
          <Stars rating={pilot.rating} count={pilot.reviewCount} />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm text-ink-muted">
          <MapPin className="h-3.5 w-3.5" />
          {city?.name} · {pilot.serviceRadiusKm} {u.radius}
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          <TierBadge tier={pilot.tier} />
          {pilot.certs.slice(0, 2).map((c) => (
            <span key={c} className="pill">{capabilityLabel(pilot.country, c)}</span>
          ))}
          {pilot.insured ? <span className="pill">{u.insured}</span> : null}
        </div>
      </div>
    </Link>
  );
}

export function ShowcaseCard({ item, className }: { item: ShowcaseItem; className?: string }) {
  const locale = useLocale();
  const seg = getSegment(item.segment);
  const segName = seg ? segmentText(seg.slug, locale).name : "";
  const city = getCity(item.citySlug);
  return (
    <div className={cn("card group overflow-hidden", className)}>
      <MediaPlaceholder
        seed={item.id + item.title}
        aspect="square"
        isVideo={item.isVideo}
        label={`${segName.split(" ")[0] ?? ""} · ${city?.name ?? ""}`}
      />
      <div className="flex items-center justify-between gap-2 p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{item.title}</p>
          <p className="truncate text-xs text-ink-muted">{segName}</p>
        </div>
        <TierBadge tier={item.tier} />
      </div>
    </div>
  );
}
