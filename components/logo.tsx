import Link from "next/link";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

/** Wordmark + a flight-path mark (ascending node-line), not a quadcopter cliché. */
export function Logo({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${SITE.name} home`}
    >
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true" className="shrink-0">
        <path
          d="M3 20 L10 12 L15 16 L23 5"
          stroke={light ? "#ECFBFB" : "#0D7E8C"}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="5" r="3" fill="#F4A23B" />
        <circle cx="10" cy="12" r="1.7" fill={light ? "#ECFBFB" : "#0D7E8C"} />
        <circle cx="15" cy="16" r="1.7" fill={light ? "#ECFBFB" : "#0D7E8C"} />
      </svg>
      <span
        className={cn(
          "font-display text-lg font-bold tracking-tight",
          light ? "text-white" : "text-ink",
        )}
      >
        {SITE.name}
      </span>
    </Link>
  );
}
