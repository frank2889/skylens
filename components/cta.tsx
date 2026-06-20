import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function CTASection({
  title = "Klaar voor je luchtbeelden?",
  intro = "Plaats gratis je aanvraag. Binnen enkele uren matchen we je met geverifieerde piloten bij jou in de buurt.",
  primaryHref = "/aanvraag",
  primaryLabel = "Plaats je aanvraag",
  secondaryHref = "/hoe-het-werkt",
  secondaryLabel = "Hoe het werkt",
  className,
}: {
  title?: string;
  intro?: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <section className={cn("container-x py-16 sm:py-24", className)}>
      <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center sm:px-16 sm:py-20">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden="true" />
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-500/30 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
          <p className="mt-4 text-lg text-white/70 pretty">{intro}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={primaryHref} className="btn btn-lg btn-primary">
              {primaryLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href={secondaryHref} className="btn btn-lg bg-white/10 text-white hover:bg-white/20">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
