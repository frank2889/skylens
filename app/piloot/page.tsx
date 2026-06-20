import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  Check,
  Wallet,
  Info,
  Lock,
  Unlock,
  Award,
  TrendingUp,
} from "lucide-react";
import { Eyebrow, VerifiedBadge, TierBadge, Stars } from "@/components/bits";
import { getPilot } from "@/lib/seed";
import { MEMBERSHIPS } from "@/lib/catalog";
import { getSegment, getCity } from "@/lib/catalog";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn, euro, CERT_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pilotendashboard",
  description:
    "Beheer je profiel, verificatie, lidmaatschap en inkomende leads als geverifieerde dronepiloot op Skylens.",
  robots: { index: false, follow: false },
};

type LeadStatus = "Nieuw" | "Ontgrendeld";

const LEAD_STATUS_STYLE: Record<LeadStatus, string> = {
  Nieuw: "bg-brand-50 text-brand-700",
  Ontgrendeld: "bg-ink text-white",
};

const SAMPLE_LEADS: {
  ref: string;
  segmentSlug: string;
  citySlug: string;
  budget: string;
  leadPrice: number;
  status: LeadStatus;
}[] = [
  { ref: "LEAD-7741", segmentSlug: "vastgoed", citySlug: "amsterdam", budget: "€250 – €500", leadPrice: 24, status: "Nieuw" },
  { ref: "LEAD-7726", segmentSlug: "marketing", citySlug: "haarlem", budget: "€500 – €1.000", leadPrice: 30, status: "Nieuw" },
  { ref: "LEAD-7710", segmentSlug: "evenementen", citySlug: "amsterdam", budget: "€500 – €1.000", leadPrice: 28, status: "Ontgrendeld" },
  { ref: "LEAD-7689", segmentSlug: "vastgoed", citySlug: "utrecht", budget: "< €250", leadPrice: 12, status: "Ontgrendeld" },
];

// Profile-completeness checklist (demo).
const PROFILE_CHECKS = [
  { label: "Basisgegevens & bio", done: true },
  { label: "RDW-exploitantnummer", done: true },
  { label: "EASA-certificaten", done: true },
  { label: "Verzekeringsbewijs", done: true },
  { label: "Apparatuur toegevoegd", done: true },
  { label: "Portfolio-werk (min. 6 stuks)", done: false },
];

export default function PilotDashboardPage() {
  const pilot = getPilot("lars-de-vries");
  if (!pilot) notFound();

  const membership = MEMBERSHIPS.find((m) => m.key === pilot.membership);
  const leadCredit = 25; // demo leadtegoed (€)

  const doneCount = PROFILE_CHECKS.filter((c) => c.done).length;
  const completeness = Math.round((doneCount / PROFILE_CHECKS.length) * 100);

  return (
    <section className="container-x py-12 sm:py-16">
      {!isSupabaseConfigured ? (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">
            Demo — koppel Supabase voor live login &amp; data. Profiel en leads hieronder
            zijn voorbeelddata.
          </p>
        </div>
      ) : null}

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Pilotendashboard</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Hallo, {pilot.name.split(" ")[0]}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-ink-muted">{pilot.company}</span>
            {pilot.verified ? <VerifiedBadge /> : null}
            <TierBadge tier={pilot.tier} />
          </div>
        </div>
        <Link href={`/piloten/${pilot.slug}`} className="btn btn-md btn-outline">
          Bekijk openbaar profiel
        </Link>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {/* Profile completeness */}
        <div className="card card-pad lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Profiel-compleetheid</h2>
            <span className="font-mono text-2xl font-bold text-brand-700">{completeness}%</span>
          </div>
          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-paper-soft">
            <div
              className="h-full rounded-full bg-brand-600 transition-all"
              style={{ width: `${completeness}%` }}
            />
          </div>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {PROFILE_CHECKS.map((c) => (
              <li key={c.label} className="flex items-center gap-2.5 text-sm">
                <span
                  className={cn(
                    "grid h-5 w-5 shrink-0 place-items-center rounded-full",
                    c.done ? "bg-brand-50 text-brand-700" : "border border-dashed border-line text-ink-faint",
                  )}
                >
                  {c.done ? <Check className="h-3.5 w-3.5" strokeWidth={2.4} /> : null}
                </span>
                <span className={cn(c.done ? "text-ink-soft" : "text-ink-muted")}>{c.label}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-ink-muted">
            Maak je profiel compleet om hoger te ranken en meer leads te ontvangen.{" "}
            <Link href="/piloot" className="link-underline">
              Portfolio toevoegen
            </Link>
          </p>
        </div>

        {/* Lead credit */}
        <div className="card card-pad flex flex-col">
          <div className="flex items-center gap-2 text-ink-muted">
            <Wallet className="h-4 w-4" />
            <h2 className="text-sm font-bold uppercase tracking-wider">Leadtegoed</h2>
          </div>
          <div className="mt-4 font-display text-4xl font-bold text-ink">{euro(leadCredit)}</div>
          <p className="mt-1 text-sm text-ink-muted">
            Beschikbaar om leads te ontgrendelen.
          </p>
          {membership ? (
            <p className="mt-4 rounded-lg bg-paper-soft px-3 py-2 text-xs text-ink-muted">
              Je {membership.name}-lidmaatschap geeft maandelijks {euro(25)} leadtegoed.
            </p>
          ) : null}
          <Link href="/piloot" className="btn btn-sm btn-outline mt-auto">
            Tegoed opwaarderen
          </Link>
        </div>
      </div>

      {/* Verification + membership row */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Verification status */}
        <div className="card card-pad">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold">Verificatiestatus</h2>
          </div>
          <p className="mt-2 text-sm text-ink-muted">
            {pilot.verified
              ? "Je profiel is volledig geverifieerd. Klanten zien je geverifieerd-badge."
              : "Je verificatie is in behandeling."}
          </p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">RDW-exploitantnummer</dt>
              <dd className="font-mono text-ink">{pilot.operatorId}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">Certificaten</dt>
              <dd className="flex flex-wrap justify-end gap-1.5">
                {pilot.certs.map((c) => (
                  <span key={c} className="pill">
                    {CERT_LABELS[c]}
                  </span>
                ))}
              </dd>
            </div>
            <div className="flex items-center justify-between border-b border-line pb-3">
              <dt className="text-ink-muted">Aansprakelijkheidsverzekering</dt>
              <dd className="flex items-center gap-1.5 font-medium text-brand-700">
                <Check className="h-4 w-4" strokeWidth={2.4} />
                {pilot.insured ? "Actief (€1M+)" : "Ontbreekt"}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-ink-muted">Status</dt>
              <dd>{pilot.verified ? <VerifiedBadge /> : <span className="pill">In behandeling</span>}</dd>
            </div>
          </dl>
        </div>

        {/* Membership */}
        {membership ? (
          <div className="card card-pad flex flex-col">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-brand-600" />
              <h2 className="text-lg font-bold">Lidmaatschap</h2>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-2xl font-bold">{membership.name}</span>
              <span className="font-mono text-sm text-ink-muted">
                {membership.price} {membership.priceSub}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-ink-muted">
              <span className="pill">{membership.commission}</span>
              <span className="pill">Leads tegen {membership.leadModifier}</span>
            </div>
            <h3 className="mt-5 text-sm font-bold uppercase tracking-wider text-ink-muted">
              Inbegrepen
            </h3>
            <ul className="mt-3 flex-1 space-y-2 text-sm">
              {membership.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                    <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                  </span>
                  <span className="text-ink-soft">{perk}</span>
                </li>
              ))}
            </ul>
            <Link href="/voor-piloten#lidmaatschap" className="btn btn-sm btn-outline mt-5">
              Upgrade lidmaatschap
            </Link>
          </div>
        ) : null}
      </div>

      {/* Incoming leads */}
      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-brand-600" />
            <h2 className="text-lg font-bold">Inkomende leads</h2>
          </div>
          <p className="text-sm text-ink-muted">
            Ontgrendel een lead om de contactgegevens van de opdrachtgever te zien.
          </p>
        </div>

        {/* Table (desktop) */}
        <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card md:block">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-paper-soft">
              <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                <th className="px-5 py-3 font-medium">Toepassing</th>
                <th className="px-5 py-3 font-medium">Stad</th>
                <th className="px-5 py-3 font-medium">Budget</th>
                <th className="px-5 py-3 font-medium">Leadprijs</th>
                <th className="px-5 py-3 text-right font-medium">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SAMPLE_LEADS.map((lead) => {
                const seg = getSegment(lead.segmentSlug);
                const city = getCity(lead.citySlug);
                const unlocked = lead.status === "Ontgrendeld";
                return (
                  <tr key={lead.ref} className="transition-colors hover:bg-paper-soft">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">{seg?.name ?? lead.segmentSlug}</div>
                      <div className="font-mono text-xs text-ink-faint">{lead.ref}</div>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{city?.name ?? lead.citySlug}</td>
                    <td className="px-5 py-4 text-ink-soft">{lead.budget}</td>
                    <td className="px-5 py-4 font-mono font-semibold text-ink">{euro(lead.leadPrice)}</td>
                    <td className="px-5 py-4 text-right">
                      {unlocked ? (
                        <span
                          className={cn(
                            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider",
                            LEAD_STATUS_STYLE[lead.status],
                          )}
                        >
                          <Unlock className="h-3.5 w-3.5" />
                          Ontgrendeld
                        </span>
                      ) : (
                        <button
                          type="button"
                          title={`Ontgrendel deze lead voor ${euro(lead.leadPrice)} — de contactgegevens van de opdrachtgever worden zichtbaar (demo).`}
                          className="btn btn-sm btn-primary"
                        >
                          <Lock className="h-3.5 w-3.5" />
                          Ontgrendel lead
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Cards (mobile) */}
        <div className="mt-4 space-y-3 md:hidden">
          {SAMPLE_LEADS.map((lead) => {
            const seg = getSegment(lead.segmentSlug);
            const city = getCity(lead.citySlug);
            const unlocked = lead.status === "Ontgrendeld";
            return (
              <div key={lead.ref} className="card card-pad">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{seg?.name ?? lead.segmentSlug}</div>
                    <div className="mt-1 text-sm text-ink-muted">
                      {city?.name ?? lead.citySlug} · {lead.budget}
                    </div>
                  </div>
                  <span className="font-mono font-semibold text-ink">{euro(lead.leadPrice)}</span>
                </div>
                <div className="mt-4">
                  {unlocked ? (
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider",
                        LEAD_STATUS_STYLE[lead.status],
                      )}
                    >
                      <Unlock className="h-3.5 w-3.5" />
                      Ontgrendeld
                    </span>
                  ) : (
                    <button
                      type="button"
                      title={`Ontgrendel deze lead voor ${euro(lead.leadPrice)} — de contactgegevens van de opdrachtgever worden zichtbaar (demo).`}
                      className="btn btn-sm btn-primary w-full"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Ontgrendel lead
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reputation strip */}
      <div className="mt-10 grid grid-cols-2 gap-4 rounded-2xl border border-line bg-paper-soft p-6 sm:grid-cols-4">
        <div>
          <Stars rating={pilot.rating} count={pilot.reviewCount} />
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">Beoordeling</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.jobsDone}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">Klussen gedaan</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.responseTime}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">Reactietijd</div>
        </div>
        <div>
          <div className="font-display text-2xl font-bold">{pilot.serviceRadiusKm} km</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">Werkgebied</div>
        </div>
      </div>
    </section>
  );
}
