"use client";

import { useState, useMemo } from "react";
import {
  ShieldCheck, Send, Lock, FileText, CreditCard, PackageCheck, CircleDollarSign,
  AlertTriangle, MapPin, ChevronLeft, Info,
} from "lucide-react";
import { useLocale } from "@/components/locale-link";
import { pick } from "@/lib/i18n/messages";
import { getLocaleConfig } from "@/lib/i18n/config";
import { redactContact } from "@/lib/moderation";
import { formatCurrency, cn } from "@/lib/utils";
import type { Locale } from "@/lib/types";

type Sender = "pilot" | "client" | "system";
interface Msg { from: Sender; text: string; flagged?: boolean }
type BookingState = "conversation" | "quoted" | "escrow" | "delivered" | "released";

const STATE_ORDER: BookingState[] = ["conversation", "quoted", "escrow", "delivered", "released"];

export function DemoInbox() {
  const locale = useLocale();
  const cfg = getLocaleConfig(locale);
  const cur = (n: number) => formatCurrency(n, locale);

  const T = pick(locale, COPY);

  // Mock threads (client is always MASKED — no email/phone ever shown).
  const initialThreads = useMemo(() => buildThreads(locale, cur), [locale]);
  const [threads, setThreads] = useState(initialThreads);
  const [activeId, setActiveId] = useState(initialThreads[0].id);
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = threads.find((t) => t.id === activeId)!;
  const preview = redactContact(draft);

  function update(id: string, fn: (t: Thread) => Thread) {
    setThreads((ts) => ts.map((t) => (t.id === id ? fn(t) : t)));
  }

  function send() {
    if (!draft.trim()) return;
    const r = redactContact(draft);
    update(activeId, (t) => ({
      ...t,
      messages: [
        ...t.messages,
        { from: "pilot", text: r.redacted, flagged: r.changed },
        ...(r.changed ? [{ from: "system" as Sender, text: T.redactedNotice }] : []),
      ],
    }));
    setDraft("");
  }

  function advance(id: string) {
    update(id, (t) => {
      const i = STATE_ORDER.indexOf(t.booking.state);
      const next = STATE_ORDER[Math.min(i + 1, STATE_ORDER.length - 1)];
      const sysText = T.stateSystem[next];
      return {
        ...t,
        booking: { ...t.booking, state: next },
        messages: sysText ? [...t.messages, { from: "system", text: sysText }] : t.messages,
      };
    });
  }

  return (
    <div className="container-x py-8 sm:py-12">
      {/* Demo banner */}
      <div className="mb-6 flex items-start gap-3 rounded-xl border border-brand-200 bg-brand-50 p-4 text-sm text-brand-900">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <p>{T.banner}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Thread list */}
        <aside className={cn("card overflow-hidden", mobileOpen ? "hidden lg:block" : "block")}>
          <div className="border-b border-line px-4 py-3 font-mono text-xs uppercase tracking-wider text-ink-muted">
            {T.inbox}
          </div>
          <ul>
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => { setActiveId(t.id); setMobileOpen(true); }}
                  className={cn(
                    "flex w-full flex-col gap-1 border-b border-line px-4 py-3 text-left transition-colors hover:bg-paper-tint",
                    t.id === activeId && "bg-paper-tint",
                  )}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-semibold">{t.clientLabel}</span>
                    <StateChip state={t.booking.state} t={T} />
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <MapPin className="h-3 w-3" /> {t.segment} · {t.city}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Conversation + booking */}
        <section className={cn("card flex min-h-[560px] flex-col", mobileOpen ? "block" : "hidden lg:flex")}>
          {/* header */}
          <div className="flex items-center gap-3 border-b border-line px-5 py-3">
            <button type="button" onClick={() => setMobileOpen(false)} className="lg:hidden" aria-label="Terug">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1">
              <div className="font-semibold">{active.clientLabel}</div>
              <div className="flex items-center gap-1.5 text-xs text-ink-muted">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-600" /> {T.maskedNote}
              </div>
            </div>
            <StateChip state={active.booking.state} t={T} />
          </div>

          {/* booking / escrow card */}
          <div className="border-b border-line bg-paper-soft px-5 py-4">
            <EscrowStepper state={active.booking.state} t={T} />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm">
                <span className="text-ink-muted">{T.jobValue}: </span>
                <span className="font-mono font-semibold">{cur(active.booking.amount)}</span>
                <span className="ml-3 text-ink-muted">{T.commission} (10%): </span>
                <span className="font-mono">{cur(Math.round(active.booking.amount * 0.1))}</span>
                <span className="ml-3 text-ink-muted">{T.payout}: </span>
                <span className="font-mono">{cur(Math.round(active.booking.amount * 0.9))}</span>
              </div>
              {active.booking.state !== "released" ? (
                <button type="button" onClick={() => advance(active.id)} className="btn btn-sm btn-primary">
                  {advanceIcon(active.booking.state)}
                  {T.advanceLabel[active.booking.state]}
                </button>
              ) : (
                <span className="badge-verify"><PackageCheck className="h-3.5 w-3.5" /> {T.done}</span>
              )}
            </div>
          </div>

          {/* messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
            {active.messages.map((m, i) => <Bubble key={i} m={m} t={T} />)}
          </div>

          {/* composer with live redaction */}
          <div className="border-t border-line p-4">
            {draft && preview.changed ? (
              <div className="mb-2 flex items-start gap-2 rounded-lg border border-signal/40 bg-signal/10 p-2.5 text-xs text-ink-soft">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-signal" />
                <span>{T.willRedact} <span className="font-mono text-ink">{preview.redacted}</span></span>
              </div>
            ) : null}
            <div className="flex items-end gap-2">
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={2}
                placeholder={T.composerPlaceholder}
                className="w-full resize-none rounded-xl border border-line bg-paper-soft px-3 py-2.5 text-sm focus:border-brand-400 focus:bg-white"
              />
              <button type="button" onClick={send} className="btn btn-md btn-primary shrink-0">
                <Send className="h-4 w-4" /> <span className="hidden sm:inline">{T.send}</span>
              </button>
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-faint">
              <Lock className="h-3 w-3" /> {T.composerNote}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

// ── pieces ───────────────────────────────────────────────────────────────────
type T = (typeof COPY)["nl"];

function Bubble({ m, t }: { m: Msg; t: T }) {
  if (m.from === "system") {
    return (
      <div className="mx-auto max-w-md rounded-lg bg-paper-tint px-3 py-2 text-center text-xs text-ink-muted">
        {m.text}
      </div>
    );
  }
  const mine = m.from === "pilot";
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div className={cn("max-w-[78%] rounded-2xl px-4 py-2.5 text-sm",
        mine ? "bg-brand-600 text-white" : "bg-paper-tint text-ink")}>
        {m.text}
      </div>
    </div>
  );
}

function StateChip({ state, t }: { state: BookingState; t: T }) {
  return <span className="pill">{t.stateShort[state]}</span>;
}

function EscrowStepper({ state, t }: { state: BookingState; t: T }) {
  const idx = STATE_ORDER.indexOf(state);
  const icons = [FileText, FileText, CreditCard, PackageCheck, CircleDollarSign];
  return (
    <div className="flex items-center gap-1.5">
      {STATE_ORDER.map((s, i) => {
        const Icon = icons[i];
        const done = i <= idx;
        return (
          <div key={s} className="flex flex-1 items-center gap-1.5">
            <div className={cn("flex items-center gap-1.5", done ? "text-brand-700" : "text-ink-faint")}>
              <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full border",
                done ? "border-brand-600 bg-brand-600 text-white" : "border-line bg-white")}>
                <Icon className="h-3.5 w-3.5" />
              </span>
              <span className="hidden text-xs font-medium sm:inline">{t.stateShort[s]}</span>
            </div>
            {i < STATE_ORDER.length - 1 ? (
              <span className={cn("h-px flex-1", i < idx ? "bg-brand-400" : "bg-line")} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

function advanceIcon(state: BookingState) {
  const map: Record<BookingState, React.ReactNode> = {
    conversation: <FileText className="h-4 w-4" />,
    quoted: <CreditCard className="h-4 w-4" />,
    escrow: <PackageCheck className="h-4 w-4" />,
    delivered: <CircleDollarSign className="h-4 w-4" />,
    released: null,
  };
  return map[state];
}

// ── data ─────────────────────────────────────────────────────────────────────
interface Thread {
  id: string; clientLabel: string; segment: string; city: string;
  booking: { state: BookingState; amount: number };
  messages: Msg[];
}

function buildThreads(locale: string, cur: (n: number) => string): Thread[] {
  const d = pick(locale, THREAD_DATA);
  return d;
}

// ── copy ─────────────────────────────────────────────────────────────────────
const COPY: Record<Locale, {
  banner: string; inbox: string; maskedNote: string; jobValue: string; commission: string;
  payout: string; done: string; send: string; composerPlaceholder: string; composerNote: string;
  willRedact: string; redactedNotice: string;
  stateShort: Record<BookingState, string>;
  advanceLabel: Record<BookingState, string>;
  stateSystem: Record<BookingState, string>;
}> = {
  nl: {
    banner: "Demo: zo houdt Skylens de deal op het platform. Piloot en klant praten hier — contactgegevens worden nooit getoond en in berichten automatisch afgeschermd. Boeking, betaling (escrow) en oplevering lopen via het platform. Echte berichten/betaling activeren op de live server.",
    inbox: "Gesprekken", maskedNote: "Contactgegevens afgeschermd · communicatie via Skylens",
    jobValue: "Kluswaarde", commission: "Commissie", payout: "Uitbetaling piloot", done: "Afgerond & uitbetaald",
    send: "Versturen",
    composerPlaceholder: "Typ een bericht… (probeer een telefoonnummer of e-mail te plakken)",
    composerNote: "Berichten lopen via Skylens en worden gecontroleerd op gedeelde contactgegevens.",
    willRedact: "Wordt verzonden als:", redactedNotice: "⚠ Contactgegevens afgeschermd. Buiten Skylens vervalt de kopersbescherming en geldt geen garantie.",
    stateShort: { conversation: "Gesprek", quoted: "Offerte", escrow: "In escrow", delivered: "Opgeleverd", released: "Vrijgegeven" },
    advanceLabel: { conversation: "Stuur offerte", quoted: "Klant betaalt (demo)", escrow: "Lever beelden op", delivered: "Geef betaling vrij", released: "" },
    stateSystem: {
      conversation: "", quoted: "Offerte verstuurd. De klant betaalt veilig via Skylens.",
      escrow: "Betaling ontvangen en in escrow gehouden. Veilig voor beide partijen.",
      delivered: "Beelden opgeleverd via het platform. De klant kan bevestigen.",
      released: "Betaling vrijgegeven aan de piloot, commissie automatisch ingehouden. Review nu mogelijk.",
    },
  },
  en: {
    banner: "Demo: this is how Skylens keeps the deal on-platform. Pilot and client talk here — contact details are never shown and are auto-redacted in messages. Booking, payment (escrow) and delivery all run through the platform. Real messaging/payment activate on the live server.",
    inbox: "Conversations", maskedNote: "Contact details hidden · communication via Skylens",
    jobValue: "Job value", commission: "Commission", payout: "Pilot payout", done: "Completed & paid out",
    send: "Send",
    composerPlaceholder: "Type a message… (try pasting a phone number or email)",
    composerNote: "Messages run through Skylens and are checked for shared contact details.",
    willRedact: "Will be sent as:", redactedNotice: "⚠ Contact details redacted. Off Skylens there is no buyer protection or guarantee.",
    stateShort: { conversation: "Chat", quoted: "Quote", escrow: "In escrow", delivered: "Delivered", released: "Released" },
    advanceLabel: { conversation: "Send quote", quoted: "Client pays (demo)", escrow: "Deliver footage", delivered: "Release payment", released: "" },
    stateSystem: {
      conversation: "", quoted: "Quote sent. The client pays securely via Skylens.",
      escrow: "Payment received and held in escrow. Safe for both parties.",
      delivered: "Footage delivered via the platform. The client can confirm.",
      released: "Payment released to the pilot, commission auto-deducted. Review now possible.",
    },
  },
  de: {
    banner: "Demo: So hält Skylens den Deal auf der Plattform. Pilot und Kunde sprechen hier — Kontaktdaten werden nie angezeigt und in Nachrichten automatisch geschwärzt. Buchung, Zahlung (Treuhand) und Lieferung laufen über die Plattform. Echte Nachrichten/Zahlung aktivieren auf dem Live-Server.",
    inbox: "Gespräche", maskedNote: "Kontaktdaten verborgen · Kommunikation über Skylens",
    jobValue: "Auftragswert", commission: "Provision", payout: "Auszahlung Pilot", done: "Abgeschlossen & ausgezahlt",
    send: "Senden",
    composerPlaceholder: "Nachricht eingeben… (versuchen Sie, eine Telefonnummer oder E-Mail einzufügen)",
    composerNote: "Nachrichten laufen über Skylens und werden auf geteilte Kontaktdaten geprüft.",
    willRedact: "Wird gesendet als:", redactedNotice: "⚠ Kontaktdaten geschwärzt. Außerhalb von Skylens gibt es keinen Käuferschutz und keine Garantie.",
    stateShort: { conversation: "Chat", quoted: "Angebot", escrow: "Treuhand", delivered: "Geliefert", released: "Freigegeben" },
    advanceLabel: { conversation: "Angebot senden", quoted: "Kunde zahlt (Demo)", escrow: "Aufnahmen liefern", delivered: "Zahlung freigeben", released: "" },
    stateSystem: {
      conversation: "", quoted: "Angebot gesendet. Der Kunde zahlt sicher über Skylens.",
      escrow: "Zahlung erhalten und treuhänderisch verwahrt. Sicher für beide Seiten.",
      delivered: "Aufnahmen über die Plattform geliefert. Der Kunde kann bestätigen.",
      released: "Zahlung an den Piloten freigegeben, Provision automatisch einbehalten. Bewertung jetzt möglich.",
    },
  },
};

const THREAD_DATA: Record<Locale, Thread[]> = {
  nl: [
    { id: "t1", clientLabel: "Klant · Amsterdam", segment: "Vastgoed", city: "Amsterdam", booking: { state: "conversation", amount: 320 },
      messages: [
        { from: "system", text: "Lead ontgrendeld — gesprek geopend. Contactgegevens blijven afgeschermd." },
        { from: "client", text: "Hoi! Ik zoek luchtfoto's van een grachtenpand voor de verkoop. Kan dat deze week?" },
        { from: "pilot", text: "Zeker! Donderdag of vrijdag kan ik langskomen. Ik stuur je zo een offerte." },
      ] },
    { id: "t2", clientLabel: "Klant · Rotterdam", segment: "Inspectie", city: "Rotterdam", booking: { state: "escrow", amount: 495 },
      messages: [
        { from: "system", text: "Lead ontgrendeld — gesprek geopend. Contactgegevens blijven afgeschermd." },
        { from: "client", text: "Daklekkage, graag een thermische inspectie + rapport." },
        { from: "pilot", text: "Helder. Offerte verstuurd voor een thermografische inspectie." },
        { from: "system", text: "Betaling ontvangen en in escrow gehouden. Veilig voor beide partijen." },
      ] },
    { id: "t3", clientLabel: "Klant · Haarlem", segment: "Marketing", city: "Haarlem", booking: { state: "delivered", amount: 549 },
      messages: [
        { from: "client", text: "Top, de social clips zien er goed uit!" },
        { from: "system", text: "Beelden opgeleverd via het platform. De klant kan bevestigen." },
      ] },
  ],
  en: [
    { id: "t1", clientLabel: "Client · London", segment: "Real estate", city: "London", booking: { state: "conversation", amount: 320 },
      messages: [
        { from: "system", text: "Lead unlocked — conversation opened. Contact details stay hidden." },
        { from: "client", text: "Hi! I need aerial shots of a townhouse for the sale. Possible this week?" },
        { from: "pilot", text: "Absolutely — Thursday or Friday works. I'll send you a quote shortly." },
      ] },
    { id: "t2", clientLabel: "Client · Manchester", segment: "Inspection", city: "Manchester", booking: { state: "escrow", amount: 495 },
      messages: [
        { from: "system", text: "Lead unlocked — conversation opened. Contact details stay hidden." },
        { from: "client", text: "Roof leak — I'd like a thermal inspection + report." },
        { from: "pilot", text: "Understood. Quote sent for a thermographic inspection." },
        { from: "system", text: "Payment received and held in escrow. Safe for both parties." },
      ] },
    { id: "t3", clientLabel: "Client · Leeds", segment: "Marketing", city: "Leeds", booking: { state: "delivered", amount: 549 },
      messages: [
        { from: "client", text: "Brilliant, the social clips look great!" },
        { from: "system", text: "Footage delivered via the platform. The client can confirm." },
      ] },
  ],
  de: [
    { id: "t1", clientLabel: "Kunde · Köln", segment: "Immobilien", city: "Köln", booking: { state: "conversation", amount: 320 },
      messages: [
        { from: "system", text: "Lead freigeschaltet — Gespräch geöffnet. Kontaktdaten bleiben verborgen." },
        { from: "client", text: "Hallo! Ich brauche Luftaufnahmen eines Stadthauses für den Verkauf. Diese Woche möglich?" },
        { from: "pilot", text: "Klar — Donnerstag oder Freitag passt. Ich sende Ihnen gleich ein Angebot." },
      ] },
    { id: "t2", clientLabel: "Kunde · Dortmund", segment: "Inspektion", city: "Dortmund", booking: { state: "escrow", amount: 495 },
      messages: [
        { from: "system", text: "Lead freigeschaltet — Gespräch geöffnet. Kontaktdaten bleiben verborgen." },
        { from: "client", text: "Dachleck — ich hätte gerne eine Thermografie-Inspektion + Bericht." },
        { from: "pilot", text: "Verstanden. Angebot für eine thermografische Inspektion gesendet." },
        { from: "system", text: "Zahlung erhalten und treuhänderisch verwahrt. Sicher für beide Seiten." },
      ] },
    { id: "t3", clientLabel: "Kunde · Düsseldorf", segment: "Marketing", city: "Düsseldorf", booking: { state: "delivered", amount: 549 },
      messages: [
        { from: "client", text: "Klasse, die Social Clips sehen super aus!" },
        { from: "system", text: "Aufnahmen über die Plattform geliefert. Der Kunde kann bestätigen." },
      ] },
  ],
};
