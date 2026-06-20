"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, CheckCircle2, Info, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Mode = "login" | "signup";
type Role = "klant" | "piloot";
type Status = "idle" | "loading" | "sent" | "demo" | "error";

export function AuthForm({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("piloot");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const supabase = createClient();

    // Demo mode: no Supabase keys configured.
    if (!supabase) {
      setStatus("demo");
      return;
    }

    setStatus("loading");
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email,
      options: isSignup ? { data: { role } } : undefined,
    });

    if (otpError) {
      setError(otpError.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-700">
          <CheckCircle2 className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h2 className="mt-5 text-xl font-bold">Check je mail</h2>
        <p className="mt-2 text-ink-muted pretty">
          We hebben een inloglink gestuurd naar{" "}
          <span className="font-semibold text-ink">{email}</span>. Open de link op dit
          apparaat om verder te gaan.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm link-underline"
        >
          Ander e-mailadres gebruiken
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {isSignup ? (
        <div>
          <span className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-muted">
            Ik meld me aan als
          </span>
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-paper-soft p-1">
            {(["klant", "piloot"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                aria-pressed={role === r}
                className={cn(
                  "rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                  role === r
                    ? "bg-white text-ink shadow-card"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {r === "klant" ? "Opdrachtgever" : "Piloot"}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-mono text-xs uppercase tracking-wider text-ink-muted"
        >
          E-mailadres
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="naam@bedrijf.nl"
            className="w-full rounded-xl border border-line bg-white py-3 pl-10 pr-4 text-ink placeholder:text-ink-faint focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      {status === "demo" ? (
        <div className="flex gap-3 rounded-xl border border-line bg-paper-soft p-4 text-sm text-ink-soft">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
          <p className="pretty">
            Inloggen wordt actief zodra Supabase is gekoppeld. Voeg je Supabase-keys toe
            om magic-link login en live data in te schakelen.
          </p>
        </div>
      ) : null}

      {status === "error" && error ? (
        <p className="rounded-xl border border-line bg-paper-soft p-4 text-sm text-ink-soft">
          Er ging iets mis: {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-lg btn-primary w-full disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Bezig…
          </>
        ) : (
          <>
            {isSignup ? "Account aanmaken" : "Inloglink versturen"}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <p className="text-center text-sm text-ink-muted">
        {isSignup ? (
          <>
            Heb je al een account?{" "}
            <Link href="/login" className="link-underline">
              Inloggen
            </Link>
          </>
        ) : (
          <>
            Nog geen account?{" "}
            <Link href="/signup" className="link-underline">
              Gratis aanmelden
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
