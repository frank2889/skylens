import { Play } from "lucide-react";
import { cn, seededUnit } from "@/lib/utils";

type Aspect = "video" | "square" | "wide" | "tall";

const ASPECT: Record<Aspect, string> = {
  video: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  tall: "aspect-[3/4]",
};

/**
 * On-brand placeholder for aerial "footage". Deterministic teal/sky gradient from a
 * seed string + faint grid overlay. Offline-safe — no external images needed.
 * Swap for <Image> from Supabase Storage when real footage exists.
 */
export function MediaPlaceholder({
  seed,
  label,
  aspect = "video",
  isVideo = false,
  className,
}: {
  seed: string;
  label?: string;
  aspect?: Aspect;
  isVideo?: boolean;
  className?: string;
}) {
  const u = seededUnit(seed);
  const hue = Math.round(168 + u * 46); // teal → sky-blue band
  const hue2 = hue + 16;
  const bg = `linear-gradient(135deg, hsl(${hue} 52% 30%) 0%, hsl(${hue2} 58% 18%) 65%, hsl(${hue2 + 8} 60% 12%) 100%)`;

  return (
    <div
      className={cn("relative overflow-hidden", ASPECT[aspect], className)}
      style={{ background: bg }}
    >
      {/* topographic grid */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage: "radial-gradient(120% 100% at 30% 0%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(120% 100% at 30% 0%, #000 30%, transparent 80%)",
        }}
      />
      {/* horizon glow */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-3xl" />

      {isVideo ? (
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-brand-700 shadow-lift backdrop-blur">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </div>
      ) : null}

      {label ? (
        <span className="absolute bottom-3 left-3 rounded bg-black/35 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/90 backdrop-blur-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}
