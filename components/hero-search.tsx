"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, ShieldCheck } from "lucide-react";
import { SEGMENTS, CITIES } from "@/lib/catalog";
import { availablePilots } from "@/lib/matching";

export function HeroSearch() {
  const router = useRouter();
  const [segment, setSegment] = useState("vastgoed");
  const [city, setCity] = useState("amsterdam");
  const count = availablePilots(segment, city);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/aanvraag?segment=${segment}&stad=${city}`);
  }

  return (
    <form
      onSubmit={submit}
      className="card card-pad w-full max-w-xl shadow-lift"
      aria-label="Vind een dronepiloot"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
            Wat heb je nodig?
          </span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <select
              value={segment}
              onChange={(e) => setSegment(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white"
            >
              {SEGMENTS.map((s) => (
                <option key={s.slug} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
        </label>
        <label className="block">
          <span className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-muted">
            Waar?
          </span>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full appearance-none rounded-xl border border-line bg-paper-soft py-3 pl-9 pr-8 text-sm font-medium text-ink focus:border-brand-400 focus:bg-white"
            >
              {CITIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
        </label>
      </div>

      <button type="submit" className="btn btn-lg btn-primary mt-4 w-full">
        Bekijk beschikbare piloten
      </button>

      <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-sm text-ink-muted">
        <ShieldCheck className="h-4 w-4 text-brand-600" />
        <strong className="font-semibold text-ink">{count}</strong> geverifieerde piloten beschikbaar · gratis & vrijblijvend
      </p>
    </form>
  );
}
