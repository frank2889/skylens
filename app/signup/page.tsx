import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Logo } from "@/components/logo";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = {
  title: "Aanmelden",
  description:
    "Meld je gratis aan als dronepiloot op Skylens. Betaal alleen voor leads die je accepteert, bouw je profiel en ontvang betaalde klussen in jouw regio.",
};

const PERKS = [
  "Gratis aanmelden, geen abonnement verplicht",
  "Betaal alleen voor leads die je accepteert",
  "Geverifieerd profiel = tot 3,5× meer leads",
  "Wij lichten je beste werk uit in de showcase",
];

export default function SignupPage() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-x relative grid min-h-[78vh] items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
        {/* Sales side */}
        <div className="order-2 lg:order-1">
          <span className="eyebrow">Voor piloten</span>
          <h1 className="mt-5 text-4xl font-bold leading-[1.06] sm:text-5xl">
            Meld je gratis aan als piloot
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-muted pretty">
            Krijg betaalde drone-klussen bij jou in de buurt. Bouw je profiel, verzamel
            reviews en kies zelf welke leads je oppakt.
          </p>
          <ul className="mt-8 space-y-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-700">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.4} />
                </span>
                <span className="text-ink-soft">{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Form side */}
        <div className="order-1 lg:order-2">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-7 flex justify-center lg:hidden">
              <Logo />
            </div>
            <div className="card card-pad">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Maak je account aan</h2>
                <p className="mt-2 text-ink-muted pretty">
                  We sturen je een veilige inloglink — geen wachtwoord nodig.
                </p>
              </div>
              <div className="mt-7">
                <AuthForm mode="signup" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
