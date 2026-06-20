import type { Metadata } from "next";
import { ShieldCheck, Check, X, Info, Clock } from "lucide-react";
import { Eyebrow, VerifiedBadge } from "@/components/bits";
import { PILOTS } from "@/lib/seed";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn, CERT_LABELS } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Verificatie-wachtrij",
  description: "Beheer en verifieer pilotenaanmeldingen.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  const total = PILOTS.length;
  const verified = PILOTS.filter((p) => p.verified).length;
  const pending = total - verified;

  return (
    <section className="container-x py-12 sm:py-16">
      {!isSupabaseConfigured ? (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">
            Demo — koppel Supabase voor live login &amp; data. Acties hieronder zijn niet
            functioneel in demomodus.
          </p>
        </div>
      ) : null}

      {/* Header */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-6 w-6 text-brand-600" />
        <Eyebrow>Admin</Eyebrow>
      </div>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">Verificatie-wachtrij</h1>
      <p className="mt-2 text-ink-muted">
        Controleer RDW-registratie, certificaten en verzekering voordat een piloot live gaat.
      </p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold">{total}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            Totaal piloten
          </div>
        </div>
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold text-brand-700">{verified}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            Geverifieerd
          </div>
        </div>
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold text-signal">{pending}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            In behandeling
          </div>
        </div>
      </div>

      {/* Queue table */}
      <h2 className="mt-10 text-lg font-bold">Aanmeldingen</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line bg-paper-soft">
            <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              <th className="px-5 py-3 font-medium">Naam &amp; bedrijf</th>
              <th className="px-5 py-3 font-medium">Exploitant-ID</th>
              <th className="px-5 py-3 font-medium">Certificaten</th>
              <th className="px-5 py-3 font-medium">Verzekerd</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 text-right font-medium">Actie</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {PILOTS.map((p) => (
              <tr
                key={p.slug}
                className={cn(
                  "transition-colors hover:bg-paper-soft",
                  !p.verified && "bg-signal/[0.06]",
                )}
              >
                <td className="px-5 py-4">
                  <div className="font-semibold text-ink">{p.name}</div>
                  <div className="text-xs text-ink-muted">{p.company}</div>
                </td>
                <td className="px-5 py-4 font-mono text-ink-soft">{p.operatorId}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1.5">
                    {p.certs.map((c) => (
                      <span key={c} className="pill">
                        {CERT_LABELS[c]}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-5 py-4">
                  {p.insured ? (
                    <span className="inline-flex items-center gap-1.5 font-medium text-brand-700">
                      <Check className="h-4 w-4" strokeWidth={2.4} />
                      Ja
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-ink-muted">
                      <X className="h-4 w-4" />
                      Nee
                    </span>
                  )}
                </td>
                <td className="px-5 py-4">
                  {p.verified ? (
                    <VerifiedBadge />
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                      <Clock className="h-3.5 w-3.5" />
                      In behandeling
                    </span>
                  )}
                </td>
                <td className="px-5 py-4 text-right">
                  {p.verified ? (
                    <span className="font-mono text-xs text-ink-faint">Afgerond</span>
                  ) : (
                    <div className="inline-flex gap-2">
                      <button
                        type="button"
                        title="Verifieer deze piloot (demo — niet functioneel)"
                        className="btn btn-sm btn-primary"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Verifieer
                      </button>
                      <button
                        type="button"
                        title="Wijs deze aanmelding af (demo — niet functioneel)"
                        className="btn btn-sm btn-outline"
                      >
                        <X className="h-3.5 w-3.5" />
                        Afwijzen
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        Rijen met een gemarkeerde achtergrond wachten op verificatie.
      </p>
    </section>
  );
}
