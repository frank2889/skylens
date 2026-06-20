import type { Metadata } from "next";
import Link from "next/link";
import { Plus, ArrowRight, Inbox, Info, Mail, MapPin } from "lucide-react";
import { Eyebrow } from "@/components/bits";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";
import { localized, pick } from "@/lib/i18n/messages";
import { segmentText } from "@/lib/i18n/catalog-i18n";
import { getLocaleConfig } from "@/lib/i18n/config";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const meta = pick(locale, {
    nl: {
      title: "Mijn dashboard",
      description:
        "Beheer je drone-aanvragen, bekijk reacties van geverifieerde piloten en plaats een nieuwe aanvraag — in je Skylens-dashboard.",
    },
    en: {
      title: "My dashboard",
      description:
        "Manage your drone requests, review responses from verified pilots and post a new request — in your Skylens dashboard.",
    },
    de: {
      title: "Mein Dashboard",
      description:
        "Verwalte deine Drohnen-Anfragen, sieh dir Antworten geprüfter Piloten an und stelle eine neue Anfrage — in deinem Skylens-Dashboard.",
    },
  });
  return {
    title: meta.title,
    description: meta.description,
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nl: `${SITE.url}/nl/dashboard`,
        "en-GB": `${SITE.url}/en/dashboard`,
        de: `${SITE.url}/de/dashboard`,
      },
    },
  };
}

type RequestStatus = "pending" | "matched" | "done";

const STATUS_STYLE: Record<RequestStatus, string> = {
  pending: "bg-paper-soft text-ink-muted",
  matched: "bg-brand-50 text-brand-700",
  done: "bg-ink text-white",
};

const SAMPLE_REQUESTS: {
  ref: string;
  segmentSlug: string;
  city: string;
  status: RequestStatus;
  date: string; // ISO date
  responses: number;
}[] = [
  {
    ref: "AANV-2048",
    segmentSlug: "vastgoed",
    city: "Amsterdam",
    status: "matched",
    date: "2026-06-18",
    responses: 4,
  },
  {
    ref: "AANV-2031",
    segmentSlug: "marketing",
    city: "Haarlem",
    status: "pending",
    date: "2026-06-16",
    responses: 2,
  },
  {
    ref: "AANV-1994",
    segmentSlug: "inspectie",
    city: "Rotterdam",
    status: "done",
    date: "2026-05-28",
    responses: 3,
  },
];

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const intlLocale = getLocaleConfig(locale).intlLocale;
  const fmtDate = (iso: string) =>
    new Intl.DateTimeFormat(intlLocale, { day: "numeric", month: "short", year: "numeric" }).format(
      new Date(iso),
    );

  const T = pick(locale, {
    nl: {
      demo:
        "Demo — koppel Supabase voor live login & data. De aanvragen hieronder zijn voorbeelddata.",
      eyebrow: "Opdrachtgever",
      title: "Mijn dashboard",
      welcome: "Welkom terug — hier vind je al je aanvragen.",
      newRequest: "Plaats nieuwe aanvraag",
      myRequests: "Mijn aanvragen",
      colApplication: "Toepassing",
      colCity: "Stad",
      colStatus: "Status",
      colDate: "Datum",
      colResponses: "Reacties",
      responses: "reacties",
      status: { pending: "In behandeling", matched: "Gematcht", done: "Afgerond" },
      emptyHintPre: "Nieuwe aanvraag nodig?",
      emptyHintLink: "Plaats er een",
      emptyHintPost: "— gratis en binnen 60 seconden.",
      profile: "Profiel",
      editProfile: "Profiel bewerken",
      helpTitle: "Hulp nodig bij je aanvraag?",
      helpBody:
        "Weet je niet zeker welk pakket past? Bekijk hoe het werkt of vergelijk de pakketten.",
      howItWorks: "Hoe het werkt",
      packages: "Pakketten",
    },
    en: {
      demo:
        "Demo — connect Supabase for live login & data. The requests below are sample data.",
      eyebrow: "Client",
      title: "My dashboard",
      welcome: "Welcome back — here are all your requests.",
      newRequest: "Post a new request",
      myRequests: "My requests",
      colApplication: "Service",
      colCity: "City",
      colStatus: "Status",
      colDate: "Date",
      colResponses: "Responses",
      responses: "responses",
      status: { pending: "In review", matched: "Matched", done: "Completed" },
      emptyHintPre: "Need a new request?",
      emptyHintLink: "Post one",
      emptyHintPost: "— free and in under 60 seconds.",
      profile: "Profile",
      editProfile: "Edit profile",
      helpTitle: "Need help with your request?",
      helpBody:
        "Not sure which package fits? See how it works or compare the packages.",
      howItWorks: "How it works",
      packages: "Packages",
    },
    de: {
      demo:
        "Demo — verbinde Supabase für Live-Login & -Daten. Die Anfragen unten sind Beispieldaten.",
      eyebrow: "Auftraggeber",
      title: "Mein Dashboard",
      welcome: "Willkommen zurück — hier findest du all deine Anfragen.",
      newRequest: "Neue Anfrage stellen",
      myRequests: "Meine Anfragen",
      colApplication: "Anwendung",
      colCity: "Stadt",
      colStatus: "Status",
      colDate: "Datum",
      colResponses: "Antworten",
      responses: "Antworten",
      status: { pending: "In Bearbeitung", matched: "Vermittelt", done: "Abgeschlossen" },
      emptyHintPre: "Neue Anfrage nötig?",
      emptyHintLink: "Stelle eine",
      emptyHintPost: "— kostenlos und in unter 60 Sekunden.",
      profile: "Profil",
      editProfile: "Profil bearbeiten",
      helpTitle: "Brauchst du Hilfe bei deiner Anfrage?",
      helpBody:
        "Nicht sicher, welches Paket passt? Sieh dir an, wie es funktioniert, oder vergleiche die Pakete.",
      howItWorks: "So funktioniert's",
      packages: "Pakete",
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
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Eyebrow>{T.eyebrow}</Eyebrow>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">{T.title}</h1>
          <p className="mt-2 text-ink-muted">{T.welcome}</p>
        </div>
        <Link href={localized(locale, "/aanvraag")} className="btn btn-lg btn-primary">
          <Plus className="h-4 w-4" />
          {T.newRequest}
        </Link>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Requests */}
        <div>
          <h2 className="text-lg font-bold">{T.myRequests}</h2>

          {/* Table (desktop) */}
          <div className="mt-4 hidden overflow-hidden rounded-2xl border border-line bg-white shadow-card sm:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-line bg-paper-soft">
                <tr className="font-mono text-xs uppercase tracking-wider text-ink-muted">
                  <th className="px-5 py-3 font-medium">{T.colApplication}</th>
                  <th className="px-5 py-3 font-medium">{T.colCity}</th>
                  <th className="px-5 py-3 font-medium">{T.colStatus}</th>
                  <th className="px-5 py-3 font-medium">{T.colDate}</th>
                  <th className="px-5 py-3 text-right font-medium">{T.colResponses}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {SAMPLE_REQUESTS.map((r) => (
                  <tr key={r.ref} className="transition-colors hover:bg-paper-soft">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-ink">
                        {segmentText(r.segmentSlug, locale).name}
                      </div>
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
                        {T.status[r.status]}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-ink-muted">{fmtDate(r.date)}</td>
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
                    <div className="font-semibold">{segmentText(r.segmentSlug, locale).name}</div>
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
                    {T.status[r.status]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm text-ink-muted">
                  <span>{fmtDate(r.date)}</span>
                  <span>
                    <span className="font-semibold text-ink">{r.responses}</span> {T.responses}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Empty-state hint */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-dashed border-line px-4 py-4 text-sm text-ink-muted">
            <Inbox className="h-4 w-4 text-ink-faint" />
            <span>
              {T.emptyHintPre}{" "}
              <Link href={localized(locale, "/aanvraag")} className="link-underline">
                {T.emptyHintLink}
              </Link>{" "}
              {T.emptyHintPost}
            </span>
          </div>
        </div>

        {/* Profile summary */}
        <aside className="space-y-5">
          <div className="card card-pad">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ink-muted">
              {T.profile}
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
              href={localized(locale, "/dashboard")}
              className="mt-5 inline-flex items-center gap-1.5 text-sm link-underline"
            >
              {T.editProfile}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="card card-pad bg-paper-soft">
            <h3 className="font-bold">{T.helpTitle}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{T.helpBody}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={localized(locale, "/hoe-het-werkt")} className="btn btn-sm btn-outline">
                {T.howItWorks}
              </Link>
              <Link href={localized(locale, "/pakketten")} className="btn btn-sm btn-ghost">
                {T.packages}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
