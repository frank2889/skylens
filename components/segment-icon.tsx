import {
  Home,
  Clapperboard,
  ScanSearch,
  ThermometerSun,
  HardHat,
  Map,
  PartyPopper,
  Sprout,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Home,
  Clapperboard,
  ScanSearch,
  ThermometerSun,
  HardHat,
  Map,
  PartyPopper,
  Sprout,
};

export function SegmentIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? Map;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
