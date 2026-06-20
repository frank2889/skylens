import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ArrowRight, Inbox, Info, Mail, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/bits";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mijn dashboard",
  description:
    "Beheer je drone-aanvragen, bekijk reacties van geverifieerde piloten en plaats een nieuwe aanvraag — in je Skylens-dashboard.",
  robots: { index: false, follow: false },
};

type RequestStatus = "In behandeling" | "Gematcht" | "Afgerond";

const STATUS_STYLE: Record<RequestStatus, string> = {
  "In behandeling": "bg-paper-soft text-ink-muted",
  Gematcht: "bg-brand-50 text-brand-700",
  Afgerond: "bg-ink text-white",
};

const SAMPLE_REQUESTS: {
  ref: string;
  segment: string;
  city: string;
  status: RequestStatus;
  date: string;
  responses: number;
}[] = [
  {
    ref: "AANV-2048",
    segment: "Vastgoed & makelaars",
    city: "Amsterdam",
    status: "Gematcht",
    date: "18 jun 2026",
    responses: 4,
  },
  {
    ref: "AANV-2031",
    segment: "Marketing & social video",
    city: "Haarlem",
    status: "In behandeling",
    date: "16 jun 2026",
    responses: 2,
  },
  {
    ref: "AANV-1994",
    segment: "Dak- & gevelinspectie",
    city: "Rotterdam",
    status: "Afgerond",
    date: "28 mei 2026",
    responses: 3,
  },
];

export default function DashboardPage() {
  return (
    <section className="container-x py-12 sm:py-16">
      {!isSupabaseConfigured ? (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-line bg-paper-soft px-4 py-3 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">
            Demo — koppel Supabase voor live login &amp; data. De aanvragen hieronder zijn
            voorbeelddata.
          </p>
        </div>
      ) : null}

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>Opdrachtgever</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Mijn dashboard</h1>
          <p className="mt-2 text-ink-muted">Welkom terug — hier vind je al je aanvragen.</p>
        </div>
        <Link href="/aanvraag" className="btn btn-lg btn-primary">
          <Plus className="h-4 w-4" />
          Plaats nieuwe aanvraag
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Requests */}
        <div>
          <h2 className="text-lg font-bold">Mijn aanvragen</h2>

          {/* Table (desktop) */}
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper-soft">
                <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-5 py-3 font-medium">Toepassing</th>
                  <th className="px-5 py-3 font-medium">Stad</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Datum</th>
                  <th className="px-5 py-3 text-right font-medium">Reacties</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SAMPLE_REQUESTS.map((r) => (
                  <tr key={r.ref} className="transition-colors hover:bg-paper-soft">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">{r.segment}</div>
                      <div className="font-mono text-xs text-ink-faint">{r.ref}</div>
                    </td>
                    <td className="px-5 py-4 text-ink-soft">{r.city}</td>
                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
                          STATUS_STYLE[r.status],
                        )}
                      >
                        {r.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{r.date}</td>
                    <td className="px-5 py-4 text-right font-semibold text-ink">
                      {r.responses}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards (mobile) */}
          <div className="mt-4 space-y-3 sm:hidden">
            {SAMPLE_REQUESTS.map((r) => (
              <div key={r.ref} className="card card-pad">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold">{r.segment}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-sm text-ink-muted">
                      <MapPin className="h-3.5 w-3.5" />
                      {r.city}
                    </div>
                  </div>
                  <span
                    className={cn(
                      "inline-flex shrink-0 rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider",
                      STATUS_STYLE[r.status],
                    )}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm text-ink-muted">
                  <span>{r.date}</span>
                  <span>
                    <span className="font-semibold text-ink">{r.responses}</span> reacties
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty-state hint */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-4 text-sm text-ink-muted">
            <Inbox className="h-4 w-4 text-ink-faint" />
            <span>
              Nieuwe aanvraag nodig?{" "}
              <Link href="/aanvraag" className="link-underline">
                Plaats er een
              </Link>{" "}
              — gratis en binnen 60 seconden.
            </span>
          </div>
        </div>

        {/* Profile summary */}
        <aside className="space-y-5">
          <div className="card card-pad">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
              Profiel
            </h2>
            <div className="mt-4 flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 font-display text-base font-bold text-white">
                MK
              </span>
              <div>
                <div className="font-semibold">Marit Kooijman</div>
                <div className="text-sm text-ink-muted">Makelaardij Kooijman</div>
              </div>
            </div>
            <dl className="mt-5 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex items-center gap-2 text-ink-soft">
                <Mail className="h-4 w-4 text-ink-faint" />
                marit@kooijman.nl
              </div>
              <div className="flex items-center gap-2 text-ink-soft">
                <MapPin className="h-4 w-4 text-ink-faint" />
                Amsterdam, Noord-Holland
              </div>
            </dl>
            <Link
              href="/dashboard"
              className="mt-5 inline-flex items-center gap-1.5 text-sm link-underline"
            >
              Profiel bewerken
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card card-pad bg-paper-soft">
            <h3 className="font-bold">Hulp nodig bij je aanvraag?</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Weet je niet zeker welk pakket past? Bekijk hoe het werkt of vergelijk de
              pakketten.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/hoe-het-werkt" className="btn btn-sm btn-outline">
                Hoe het werkt
              </Link>
              <Link href="/pakketten" className="btn btn-sm btn-ghost">
                Pakketten
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
