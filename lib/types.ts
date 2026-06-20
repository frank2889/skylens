// Shared domain types for Skylens.

export type Tier = "bronze" | "silver" | "gold" | "platinum";
export type MembershipKey = "free" | "pro" | "elite";

// ── Internationalisation & jurisdictions ─────────────────────────────────────
export type Locale = "nl" | "en" | "de";
export type CountryCode = "NL" | "GB" | "DE" | "BE" | "FR";
export type Currency = "EUR" | "GBP";

/**
 * Country-agnostic capability ladder. Each jurisdiction maps these ordinal
 * levels onto its own real credentials (EASA for NL/DE, CAA for the UK).
 */
export type CapabilityLevel = "registered" | "basic" | "advanced" | "specific" | "org";

export const CAPABILITY_ORDER: CapabilityLevel[] = [
  "registered",
  "basic",
  "advanced",
  "specific",
  "org",
];

export interface Credential {
  level: CapabilityLevel;
  code: string; // proper-noun code, e.g. "A2", "A2 CofC", "PDRA01"
  name: string; // full credential name
  authority: string; // issuing authority (short)
  note?: string;
}

export interface JurisdictionRules {
  maxAltitude: string;
  vlosRequired: boolean;
  registrationThreshold: string;
  minPilotAge: number;
  distanceRules: string;
  remoteId: string;
}

export interface Jurisdiction {
  code: CountryCode;
  name: string; // English display name
  easaMember: boolean;
  regime: string; // "EASA" | "UK CAA"
  currency: Currency;
  authority: { short: string; full: string; url: string };
  operatorId: { label: string; example: string; note: string };
  insurance: { minMajor: number; currency: Currency; basis: string };
  capabilities: Credential[]; // ordered by CAPABILITY_ORDER
  rules: JurisdictionRules;
  legal: {
    governingLaw: string;
    privacyRegime: string;
    dpa: { name: string; url: string };
    vatRatePct: number;
    recordRetentionYears: number;
  };
}

export interface Segment {
  slug: string;
  name: string; // NL
  tagline: string;
  description: string;
  icon: string; // lucide-react icon name
  deliverables: string[];
  gear: string;
  priceFrom: number; // EUR ex BTW
  tier: Tier; // the typical package tier this maps to
  certHint: string;
}

export interface City {
  slug: string;
  name: string;
  province: string;
  region: string; // e.g. "Randstad"
  country: CountryCode;
  inhabitants: number;
}

export interface Package {
  tier: Tier;
  name: string; // NL
  oneLiner: string;
  priceLabel: string;
  priceFrom: number;
  useCase: string;
  gear: string;
  photos: string;
  video: string;
  technical: string;
  turnaround: string;
  certRequired: string;
  highlight?: boolean;
}

export interface Membership {
  key: MembershipKey;
  name: string;
  price: string;
  priceSub: string;
  forWho: string;
  leadModifier: string;
  commission: string;
  perks: string[];
  highlight?: boolean;
}

export interface LeadTier {
  tier: Tier;
  jobValue: string;
  leadPrice: string;
  exclusivity: string;
}

export interface Review {
  author: string;
  role: string;
  city: string;
  rating: number;
  text: string;
}

export interface Pilot {
  slug: string;
  name: string;
  company: string;
  citySlug: string;
  region: string;
  country: CountryCode;
  tier: Tier;
  membership: MembershipKey;
  verified: boolean;
  certs: CapabilityLevel[];
  insured: boolean;
  operatorId: string; // masked operator id (RDW / CAA / LBA, per country)
  segments: string[]; // segment slugs
  serviceRadiusKm: number;
  rating: number;
  reviewCount: number;
  jobsDone: number;
  responseTime: string;
  gear: string[];
  bio: string;
  reviews: Review[];
}

export interface ShowcaseItem {
  id: string;
  title: string;
  segment: string; // segment slug
  citySlug: string;
  tier: Tier;
  pilotSlug: string;
  isVideo: boolean;
}

export interface RequestInput {
  segment: string;
  citySlug: string;
  date?: string;
  budgetBand?: string;
  details?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  marketingConsent: boolean;
}
