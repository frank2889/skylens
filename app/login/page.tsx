import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Inloggen",
  description:
    "Log in op je Skylens-account met een veilige inloglink. Voor opdrachtgevers en geverifieerde dronepiloten.",
};

export default function LoginPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative flex min-h-[78vh] items-center justify-center py-16 sm:py-24">
        <div className="w-full max-w-md">
          <div className="mb-7 flex justify-center">
            <Logo />
          </div>

          <div className="card card-pad">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Welkom terug</h1>
              <p className="mt-2 text-ink-muted pretty">
                Voer je e-mailadres in en we sturen je een veilige inloglink — geen
                wachtwoord nodig.
              </p>
            </div>

            <div className="mt-7">
              <AuthForm mode="login" />
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-center font-mono text-xs uppercase tracking-wider text-ink-muted">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            Veilige magic-link login
          </p>
        </div>
      </div>
    </section>
  );
}
