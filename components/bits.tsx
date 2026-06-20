"use client";

import Link from "next/link";
import { Star, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocale } from "./locale-link";
import { localized, pick } from "@/lib/i18n/messages";
import type { Tier, Locale } from "@/lib/types";

const TIER_DOT: Record<Tier, string> = {
  bronze: "#C77B3C",
  silver: "#9AA7B4",
  gold: "#D8A534",
  platinum: "#9FB6C4",
};

const TIER_TEXT: Record<Locale, Record<Tier, string>> = {
  nl: { bronze: "Brons", silver: "Zilver", gold: "Goud", platinum: "Platinum" },
  en: { bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum" },
  de: { bronze: "Bronze", silver: "Silber", gold: "Gold", platinum: "Platin" },
};

const VERIFIED_TEXT: Record<Locale, string> = { nl: "Geverifieerd", en: "Verified", de: "Geprüft" };

export function TierBadge({ tier, className }: { tier: Tier; className?: string }) {
  const locale = useLocale();
  return (
    <span className={cn("pill", className)}>
      <span className="h-2 w-2 rounded-full" style={{ background: TIER_DOT[tier] }} />
      {pick(locale, TIER_TEXT)[tier]}
    </span>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  const locale = useLocale();
  return (
    <span className={cn("badge-verify", className)}>
      <ShieldCheck className="h-3.5 w-3.5" strokeWidth={2} />
      {pick(locale, VERIFIED_TEXT)}
    </span>
  );
}

export function Stars({ rating, count, className }: { rating: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <Star className="h-4 w-4 fill-signal text-signal" />
      <span className="font-semibold text-ink">{rating.toFixed(1)}</span>
      {count != null ? <span className="text-sm text-ink-muted">({count})</span> : null}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-2xl", className)}>
      {eyebrow ? <Eyebrow className={cn(center && "justify-center")}>{eyebrow}</Eyebrow> : null}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-muted pretty">{intro}</p> : null}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold text-ink sm:text-4xl">{value}</div>
      <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">{label}</div>
    </div>
  );
}

/** Locale-aware text link. `href` is locale-less, e.g. "/toepassingen". */
export function TextLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const locale = useLocale();
  return (
    <Link href={localized(locale, href)} className={cn("group inline-flex items-center gap-1.5 link-underline", className)}>
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
