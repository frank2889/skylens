"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck } from "lucide-react";
import { SEGMENTS, citiesByCountry } from "@/lib/catalog";
import { availablePilots } from "@/lib/matching";
import { useLocale } from "./locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import type { Locale } from "@/lib/types";

const COPY: Record<Locale, { need: string; where: string; cta: string; available: string; free: string }> = {
  nl: { need: "Wat heb je nodig?", where: "Waar?", cta: "Bekijk beschikbare piloten", available: "geverifieerde piloten beschikbaar", free: "gratis & vrijblijvend" },
  en: { need: "What do you need?", where: "Where?", cta: "View available pilots", available: "verified pilots available", free: "free & no obligation" },
  de: { need: "Was brauchen Sie?", where: "Wo?", cta: "Verfügbare Piloten ansehen", available: "geprüfte Piloten verfügbar", free: "kostenlos & unverbindlich" },
};

export function HeroSearch() {
  const locale = useLocale();
  const router = useRouter();
  const country = getLocaleConfig(locale).country;
  const cities = citiesByCountry(country);
  const t = pick(locale, COPY);

  const [segment, setSegment] = useState("vastgoed");
  const [city, setCity] = useState(cities[0]?.slug ?? "");
  const count = availablePilots(segment, city, country);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(localized(locale, `/aanvraag?segment=${segment}&stad=${city}`));
  }

  return (
    <form onSubmit={submit} className="card card-pad w-full max-w-xl shadow-lift">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">{t.need}</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <select value={segment} onChange={(e) => setSegment(e.target.value)} className="w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white">
              {SEGMENTS.map((s) => (
                <option key={s.slug} value={s.slug}>{segmentText(s.slug, locale).name}</option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">{t.where}</span>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <select value={city} onChange={(e) => setCity(e.target.value)} className="w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white">
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <button type="submit" className="btn btn-lg btn-primary mt-4 w-full">{t.cta}</button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-ink-muted">
        <ShieldCheck className="h-4 w-4 text-brand-600" />
        <strong className="font-semibold text-ink">{count}</strong> {t.available} · {t.free}
      </p>
    </form>
  );
}
