import type { Metadata } from "next";
import { ShieldCheck, Check, X, Info, Clock } from "lucide-react";
import { Eyebrow, VerifiedBadge } from "@/components/bits";
import { PILOTS } from "@/lib/seed";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import { pick } from "@/lib/i18n/messages";
import { capabilityLabel, getJurisdiction } from "@/lib/jurisdictions";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pick(locale, {
    nl: { title: "Verificatie-wachtrij", description: "Beheer en verifieer pilotenaanmeldingen." },
    en: { title: "Verification queue", description: "Manage and verify pilot applications." },
    de: {
      title: "Verifizierungs-Warteschlange",
      description: "Pilotenbewerbungen verwalten und prüfen.",
    },
  });
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/admin`,
        "en-GB": `${SITE.url}/en/admin`,
        de: `${SITE.url}/de/admin`,
      },
    },
  };
}

export default async function AdminPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const total = PILOTS.length;
  const verified = PILOTS.filter((p) => p.verified).length;
  const pending = total - verified;

  const T = pick(locale, {
    nl: {
      demo:
        "Demo — koppel Supabase voor live login & data. Acties hieronder zijn niet functioneel in demomodus.",
      admin: "Admin",
      title: "Verificatie-wachtrij",
      lede:
        "Controleer registratie, certificaten en verzekering voordat een piloot live gaat.",
      totalPilots: "Totaal piloten",
      verified: "Geverifieerd",
      pending: "In behandeling",
      applications: "Aanmeldingen",
      colName: "Naam & bedrijf",
      colOperator: "Exploitant-ID",
      colCerts: "Certificaten",
      colInsured: "Verzekerd",
      colStatus: "Status",
      colAction: "Actie",
      yes: "Ja",
      no: "Nee",
      done: "Afgerond",
      verify: "Verifieer",
      reject: "Afwijzen",
      verifyTitle: "Verifieer deze piloot (demo — niet functioneel)",
      rejectTitle: "Wijs deze aanmelding af (demo — niet functioneel)",
      footnote: "Rijen met een gemarkeerde achtergrond wachten op verificatie.",
    },
    en: {
      demo:
        "Demo — connect Supabase for live login & data. The actions below are not functional in demo mode.",
      admin: "Admin",
      title: "Verification queue",
      lede:
        "Check registration, certificates and insurance before a pilot goes live.",
      totalPilots: "Total pilots",
      verified: "Verified",
      pending: "In review",
      applications: "Applications",
      colName: "Name & company",
      colOperator: "Operator ID",
      colCerts: "Certificates",
      colInsured: "Insured",
      colStatus: "Status",
      colAction: "Action",
      yes: "Yes",
      no: "No",
      done: "Completed",
      verify: "Verify",
      reject: "Reject",
      verifyTitle: "Verify this pilot (demo — not functional)",
      rejectTitle: "Reject this application (demo — not functional)",
      footnote: "Rows with a highlighted background are awaiting verification.",
    },
    de: {
      demo:
        "Demo — verbinde Supabase für Live-Login & -Daten. Die Aktionen unten sind im Demomodus nicht funktional.",
      admin: "Admin",
      title: "Verifizierungs-Warteschlange",
      lede:
        "Prüfe Registrierung, Zertifikate und Versicherung, bevor ein Pilot live geht.",
      totalPilots: "Piloten gesamt",
      verified: "Geprüft",
      pending: "In Bearbeitung",
      applications: "Bewerbungen",
      colName: "Name & Unternehmen",
      colOperator: "Betreiber-ID",
      colCerts: "Zertifikate",
      colInsured: "Versichert",
      colStatus: "Status",
      colAction: "Aktion",
      yes: "Ja",
      no: "Nein",
      done: "Abgeschlossen",
      verify: "Prüfen",
      reject: "Ablehnen",
      verifyTitle: "Diesen Piloten verifizieren (Demo — nicht funktional)",
      rejectTitle: "Diese Bewerbung ablehnen (Demo — nicht funktional)",
      footnote: "Zeilen mit hervorgehobenem Hintergrund warten auf Verifizierung.",
    },
  });

  return (
    <section className="container-x py-12 sm:py-16">
      {!isSupabaseConfigured ? (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">{T.demo}</p>
        </div>
      ) : null}

      {/* Header */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-6 w-6 text-brand-600" />
        <Eyebrow>{T.admin}</Eyebrow>
      </div>
      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{T.title}</h1>
      <p className="mt-2 text-ink-muted">{T.lede}</p>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold">{total}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.totalPilots}
          </div>
        </div>
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold text-brand-700">{verified}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.verified}
          </div>
        </div>
        <div className="card card-pad">
          <div className="font-display text-3xl font-bold text-signal">{pending}</div>
          <div className="mt-1 font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.pending}
          </div>
        </div>
      </div>

      {/* Queue table */}
      <h2 className="mt-10 text-lg font-bold">{T.applications}</h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-white shadow-card">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="border-b border-line bg-paper-soft">
            <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
              <th className="px-5 py-3 font-medium">{T.colName}</th>
              <th className="px-5 py-3 font-medium">{T.colOperator}</th>
              <th className="px-5 py-3 font-medium">{T.colCerts}</th>
              <th className="px-5 py-3 font-medium">{T.colInsured}</th>
              <th className="px-5 py-3 font-medium">{T.colStatus}</th>
              <th className="px-5 py-3 text-right font-medium">{T.colAction}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {PILOTS.map((p) => {
              const jur = getJurisdiction(p.country);
              return (
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
                  <td className="px-5 py-4">
                    <div className="font-mono text-ink-soft">{p.operatorId}</div>
                    <div className="text-xs text-ink-faint">{jur.authority.short}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.certs.map((c) => (
                        <span key={c} className="pill">
                          {capabilityLabel(p.country, c)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    {p.insured ? (
                      <span className="inline-flex items-center gap-1.5 font-medium text-brand-700">
                        <Check className="h-4 w-4" strokeWidth={2.4} />
                        {T.yes}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-ink-muted">
                        <X className="h-4 w-4" />
                        {T.no}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {p.verified ? (
                      <VerifiedBadge />
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-signal/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-signal">
                        <Clock className="h-3.5 w-3.5" />
                        {T.pending}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {p.verified ? (
                      <span className="font-mono text-xs text-ink-faint">{T.done}</span>
                    ) : (
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          title={T.verifyTitle}
                          className="btn btn-sm btn-primary"
                        >
                          <Check className="h-3.5 w-3.5" />
                          {T.verify}
                        </button>
                        <button
                          type="button"
                          title={T.rejectTitle}
                          className="btn btn-sm btn-outline"
                        >
                          <X className="h-3.5 w-3.5" />
                          {T.reject}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-sm text-ink-muted">{T.footnote}</p>
    </section>
  );
}
